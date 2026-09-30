// Real Space/Extend View/Mini/Floating lifecycle checks on the existing dev, with no model calls.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const spaceModule = '/@fs' + resolve(process.env.FVS_DESKTOP_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '../../../Forsion-Genesis/desktop'), '../lcl/engine/spaceRegistry.ts');

const shots = 'artifacts/space'; await mkdir(shots, { recursive: true });
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const context = browser.contexts()[0];
const page = context.pages().find(p => p.url() === 'http://localhost:5273/');
assert.ok(page, 'only operate the development app');
const windows = [], errors = [];
page.on('pageerror', e => errors.push(String(e)));
let project, probeProject;
try {
  const state = await page.evaluate(async spaceModule => {
    await (await import('/src/amadeus/store/pageStore.ts')).usePageStore.getState().restoreVault();
    await (await import('/src/userSpaces.tsx')).loadUserSpaces();
    const space = await import(spaceModule);
    space.setActiveSpace('forsion-video-studio');
    const { usePluginStore } = await import('/src/amadeus/plugins/pluginStore.ts');
    const s = usePluginStore.getState();
    await s.commands.find(c => c.pluginId === 'forsion-video-studio' && c.item.id === 'fvs-open-example').item.run();
    return { active: space.useSpaceStore.getState().activeSpaceId, plugin: s.plugins.find(p => p.id === 'forsion-video-studio').version,
      list: s.listSources.find(x => x.pluginId === 'forsion-video-studio')?.item.id,
      root: (await import('/src/amadeus/store/pageStore.ts')).usePageStore.getState().vaultRoot };
  }, spaceModule);
  assert.equal(state.active, 'forsion-video-studio'); assert.equal(state.plugin, '0.3.0'); assert.equal(state.list, 'projects');
  project = join(state.root, 'Forsion Video Studio/第 2.12 话/episode-2.12.fvs.md'); const before = await readFile(project);
  await page.waitForSelector('.fvs-studio .fvs-clip');
  await page.waitForFunction(() => !!document.querySelector('.fvs-view iframe:not(.fvs-pending)'));
  await page.locator('.fvs-clip[data-id="cards"] .nm').click({ force: true });
  await page.waitForFunction(() => /85/.test(document.querySelector('.fvs-sync-sum')?.textContent || ''), null, { timeout: 30000 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(shots, '01-space.png') });

  const properties = page.getByRole('button', { name: '显示属性面板', exact: true });
  if (await properties.getAttribute('aria-pressed') === 'true') await properties.click();
  await properties.click();
  await page.waitForSelector('.fvs-native-properties .fvs-tabs');
  assert.equal(await page.locator('.fvs-native-properties').evaluate(e => !!e.closest('.fvs-studio')), false, 'properties live in the native host panel');
  assert.equal(await page.locator('.fvs-native-properties .fvs-tabs').isVisible(), true);
  await page.screenshot({ path: join(shots, '02-extend-properties.png') });
  await properties.click();
  await page.waitForSelector('.fvs-native-properties', { state: 'detached' });

  await page.locator('.fvs-name').click();
  await page.waitForSelector('.fvs-library');
  await page.fill('.fvs-library input', 'episode');
  // Opening the same extension again focuses it and retains the search draft.
  await page.locator('.fvs-name').click();
  assert.equal(await page.inputValue('.fvs-library input'), 'episode');
  await page.screenshot({ path: join(shots, '03-extend-projects.png') });
  await page.locator('.fvs-project-item').first().click();
  await page.waitForSelector('.fvs-library', { state: 'detached' });

  await page.getByRole('button', { name: '问 AI', exact: true }).click();
  await page.waitForSelector('.fvs-ai-panel');
  await page.fill('.fvs-ai-panel textarea', '验收草稿：不发送');
  await page.screenshot({ path: join(shots, '04-extend-director.png') });
  await page.getByRole('button', { name: '问 AI', exact: true }).click();
  await page.waitForSelector('.fvs-ai-panel', { state: 'detached' });

  const miniEvent = context.waitForEvent('page');
  await page.locator('.fvs-mini-action').click();
  const mini = await miniEvent; windows.push(mini);
  mini.on('pageerror', e => errors.push(String(e)));
  await mini.waitForSelector('.fvs-studio.compact', { timeout: 30000 });
  assert.equal(await mini.locator('.fvs-tl').isVisible(), false, 'Mini uses the compact adapter');
  await mini.waitForFunction(() => !!document.querySelector('.fvs-view iframe:not(.fvs-pending)'));
  await mini.getByRole('button', { name: '下一个场景', exact: true }).click();
  const miniTime = await mini.textContent('.fvs-time');
  await mini.locator('.fvs-play').click(); await mini.waitForTimeout(700); await mini.locator('.fvs-play').click();
  assert.notEqual(await mini.textContent('.fvs-time'), miniTime, 'Mini really plays the engineering project');
  await mini.screenshot({ path: join(shots, '05-mini.png') });
  await mini.getByRole('button', { name: '完整工作台', exact: true }).click();
  await page.waitForSelector('.fvs-studio:not(.compact)');
  assert.match(await page.textContent('.fvs-name'), /2\.12/);
  await mini.close();

  const floatEvent = context.waitForEvent('page');
  await page.locator('.fvs-floating-action').click();
  const floating = await floatEvent; windows.push(floating);
  floating.on('pageerror', e => errors.push(String(e)));
  await floating.waitForSelector('.fvs-studio:not(.compact)', { timeout: 30000 });
  await floating.waitForFunction(() => !!document.querySelector('.fvs-view iframe:not(.fvs-pending)'));
  await floating.getByRole('button', { name: '下一个场景', exact: true }).click();
  await floating.locator('.fvs-play').click(); await floating.waitForTimeout(700); await floating.locator('.fvs-play').click();
  await floating.screenshot({ path: join(shots, '06-floating.png') });
  // Floating uses the inline picker; reopening the same project must restore the editor.
  await floating.locator('.fvs-name').click();
  await floating.waitForSelector('.fvs-library');
  await floating.locator('.fvs-project-item').filter({ hasText: 'episode-2.12.fvs.md' }).first().click();
  await floating.waitForSelector('.fvs-studio:not(.compact)');
  assert.equal(await floating.locator('.fvs-clip').count(), 20);
  await floating.close();

  // Edit a disposable copy, then switch before the 600ms autosave timer fires.
  const probePath = `Forsion Video Studio/第 2.12 话/.native-save-${Date.now()}.fvs.md`;
  probeProject = join(state.root, probePath);
  await writeFile(probeProject, before.toString().replaceAll('第 2.12 话 · 人类补完计划', 'FVS 原生保存验收'));
  await page.evaluate(async path => {
    const s = (await import('/src/amadeus/plugins/pluginStore.ts')).usePluginStore.getState();
    await s.commands.find(c => c.pluginId === 'forsion-video-studio' && c.item.id === 'fvs-open-project').item.invoke.run({ path });
  }, probePath);
  await page.waitForFunction(() => document.querySelector('.fvs-name')?.textContent === 'FVS 原生保存验收');
  const props = page.getByRole('button', { name: '显示属性面板', exact: true });
  if (await props.getAttribute('aria-pressed') !== 'true') await props.click();
  await page.waitForSelector('.fvs-native-properties [data-key="stitle"]');
  await page.evaluate(async () => {
    const input = document.querySelector('.fvs-native-properties [data-key="stitle"]');
    input.value = '原生切换保存验收'; input.dispatchEvent(new Event('change', { bubbles: true }));
    const s = (await import('/src/amadeus/plugins/pluginStore.ts')).usePluginStore.getState();
    await s.commands.find(c => c.pluginId === 'forsion-video-studio' && c.item.id === 'fvs-open-example').item.run();
  });
  await page.waitForFunction(() => /2\.12/.test(document.querySelector('.fvs-name')?.textContent || ''));
  assert.match(await readFile(probeProject, 'utf8'), /原生切换保存验收/, 'switching projects flushes the pending edit');
  await rm(probeProject); probeProject = null;

  await page.getByRole('button', { name: '问 AI', exact: true }).click();
  await page.waitForSelector('.fvs-ai-panel');
  await page.evaluate(async spaceModule => {
    const { setActiveSpace } = await import(spaceModule);
    setActiveSpace('home');
  }, spaceModule);
  await page.waitForSelector('.fvs-ai-panel', { state: 'detached' });
  await page.evaluate(async spaceModule => { (await import(spaceModule)).setActiveSpace('forsion-video-studio'); }, spaceModule);
  await page.waitForSelector('.fvs-studio .fvs-clip');
  assert.equal(await page.locator('.fvs-clip').count(), 20, 'Space round-trip restores its engineering entity');
  assert.deepEqual(await readFile(project), before, 'native lifecycle checks preserve the engineering file');
  assert.deepEqual(errors, []);
  const result = { state, passed: ['Space activation', 'native project list', 'Extend properties', 'Extend picker draft', 'Extend Director draft', 'Mini adapter and playback', 'Mini-to-main entity', 'native Floating playback', 'Floating picker reopens same project', 'pending save on project switch', 'Space round-trip and Extend cleanup', 'unchanged project'], errors };
  await writeFile(join(shots, 'results.json'), JSON.stringify(result, null, 2) + '\n'); console.log(JSON.stringify(result));
} finally {
  if (probeProject) {
    await page.evaluate(async () => {
      const s = (await import('/src/amadeus/plugins/pluginStore.ts')).usePluginStore.getState();
      await s.commands.find(c => c.pluginId === 'forsion-video-studio' && c.item.id === 'fvs-open-example').item.run();
    }).catch(() => {});
    await page.waitForFunction(() => /2\.12/.test(document.querySelector('.fvs-name')?.textContent || ''), null, { timeout: 5000 }).catch(() => {});
    await rm(probeProject, { force: true });
  }
 for (const win of windows) if (!win.isClosed()) await win.close().catch(() => {}); await browser.close(); }
