// Attach to the live development Electron through CDP. No model calls and no project edits.
// Start desktop: npm run dev -- -- --remote-debugging-port=9333
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const spaceModule = '/@fs' + resolve(process.env.FVS_DESKTOP_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '../../../Forsion-Genesis/desktop'), '../lcl/engine/spaceRegistry.ts');

const port = process.argv.find(a => a.startsWith('--cdp='))?.split('=')[1] || '9333';
const shots = 'artifacts/native';
await mkdir(shots, { recursive: true });
const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
const page = browser.contexts().flatMap(c => c.pages()).find(p => /^http:\/\/localhost:5273\/$/.test(p.url()));
assert.ok(page, 'attach only to Forsion development renderer on localhost:5273');
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
let originalTheme;
try {
  await page.reload();
  await page.waitForFunction(() => !!window.amadeus);
  const plugin = await page.evaluate(async spaceModule => {
    const { usePageStore } = await import('/src/amadeus/store/pageStore.ts');
    await usePageStore.getState().restoreVault();
    const { usePluginStore } = await import('/src/amadeus/plugins/pluginStore.ts');
    await usePluginStore.getState().reloadOne('forsion-video-studio', { force: true, strict: true });
    await (await import('/src/userSpaces.tsx')).loadUserSpaces();
    // The Vite dev host resolves @lcl to this source directory; verification only, never in main.js.
    const { setActiveSpace } = await import(spaceModule);
    setActiveSpace('forsion-video-studio');
    const s = usePluginStore.getState();
    const p = s.plugins.find(p => p.id === 'forsion-video-studio');
    const c = s.commands.find(c => c.pluginId === p.id && c.item.id === 'fvs-open-example');
    await c.item.run();
    return { id: p.id, version: p.version, vault: usePageStore.getState().vaultRoot };
  }, spaceModule);
  assert.equal(plugin.version, JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8')).version);
  await page.waitForSelector('.fvs-clip');
  const gate = page.locator('.fvs-gate button');
  if (await gate.count()) await gate.click();
  await page.waitForFunction(() => !!document.querySelector('.fvs-view iframe:not(.fvs-pending)'));
  assert.equal(await page.locator('.fvs-clip').count(), 20);
  const project = join(plugin.vault, 'Forsion Video Studio/第 2.12 话/episode-2.12.fvs.md');
  const before = await readFile(project);
  originalTheme = await page.evaluate(async () => {
    const s = (await import('/src/stores/themeStore.ts')).useTheme.getState();
    return s.modePref;
  });
  // Keep actual host theme axes; change only the native light/dark preference, then restore it.
  for (const mode of ['light', 'dark']) {
    await page.evaluate(async mode => { await (await import('/src/stores/themeStore.ts')).useTheme.getState().setModePref(mode); }, mode);
    await page.waitForTimeout(400);
    await page.locator('.fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
    assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'cards');
    await page.waitForFunction(() => !!document.querySelector('.fvs-view iframe:not(.fvs-pending)') && document.querySelectorAll('.fvs-scene-thumb[data-rendered]').length >= 10, null, { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(shots, `studio-${mode}.png`) });
  }
  const time = await page.textContent('.fvs-time');
  await page.locator('.fvs-play').click();
  await page.waitForTimeout(700);
  await page.locator('.fvs-play').click();
  assert.notEqual(await page.textContent('.fvs-time'), time, 'real Electron preview advances');
  await page.getByRole('button', { name: '专注预览', exact: true }).click();
  assert.equal(await page.locator('.fvs-side').isVisible(), false);
  await page.getByRole('button', { name: '返回编辑', exact: true }).click();
  const size = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  // every toolbar control stays inside the editor at the widths the workbench can give it
  const inside = () => page.evaluate(() => {
    const r = document.querySelector('.fvs-studio').getBoundingClientRect();
    return [...document.querySelectorAll('.fvs-bar button,.fvs-transport button,.fvs-tl-bar button,.fvs-tl-bar select')]
      .filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden')
      .filter(e => { const b = e.getBoundingClientRect(); return b.left < r.left - .5 || b.right > r.right + .5; })
      .map(e => e.title || e.textContent);
  });
  try {
    for (const [width, name] of [[1180, 'studio-medium'], [780, 'studio-narrow']]) {
      await page.setViewportSize({ width, height: 860 });
      await page.waitForTimeout(600); // the stage refits on the frame after the resize
      assert.deepEqual(await inside(), [], `controls stay inside the editor at ${width}px`);
      await page.screenshot({ path: join(shots, `${name}.png`) });
    }
    assert.equal(await page.locator('.fvs-side').isVisible(), false, 'Space keeps properties in the native Extend View');
  } finally { await page.setViewportSize(size); }
  assert.deepEqual(await readFile(project), before, 'live checks preserve project bytes');
  assert.deepEqual(errors, [], 'no renderer exceptions during live checks');
  await writeFile(join(shots, 'results.json'), JSON.stringify({ plugin, tests: ['disk discovery', '20 scenes', 'scene navigation', 'native light/dark', 'playback', 'focus', 'medium and narrow windows keep controls inside', 'unchanged project'], errors }, null, 2) + '\n');
  console.log(JSON.stringify({ plugin, screenshots: shots, errors }));
} finally {
  if (originalTheme) await page.evaluate(async pref => { await (await import('/src/stores/themeStore.ts')).useTheme.getState().setModePref(pref); }, originalTheme).catch(() => {});
  await browser.close(); // disconnect; the user's dev app stays open
}
