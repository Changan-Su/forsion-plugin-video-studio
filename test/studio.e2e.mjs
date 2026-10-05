// End-to-end test of the Studio in Chromium against the mock host (test/host): open the bundled example,
// edit text in the picture, drag a cut, undo, export HTML, hand off to the agent, reload an external edit.
//   NODE_PATH=$(npm root -g) node test/studio.e2e.mjs [--shots dir]
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { checkWorkspace } from './workspace.mjs';
import { serveVault } from './vault-route.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const MAIN = process.env.FVS_MAIN ? resolve(process.env.FVS_MAIN) : join(root, 'main.js'); // FVS_MAIN: another build (a negative control)
const require = createRequire(join(process.cwd(), 'x.js'));
const { chromium } = (() => { for (const m of ['playwright', 'playwright-core']) { try { return require(m); } catch { /* next */ } } throw new Error('needs playwright'); })();
const shotsAt = process.argv.indexOf('--shots');
const shots = shotsAt > 0 ? process.argv[shotsAt + 1] : null;
if (shots) mkdirSync(shots, { recursive: true });
const shot = async (page, name) => { if (shots) await page.screenshot({ path: join(shots, `${name}.png`) }); };

const ORIGIN = 'http://fvs.test';
const EX = join(root, 'examples/episode-2.12');
const DIR = 'Videos/第 2.12 话';
const FILE = `${DIR}/episode-2.12.fvs.md`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 920 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
await page.route(`${ORIGIN}/**`, async r => {
  const u = new URL(r.request().url());
  if (u.pathname === '/host.html' || u.pathname === '/host.js') return r.fulfill({ path: join(here, 'host', u.pathname.slice(1)) });
  if (u.pathname.startsWith('/vault/')) return serveVault(page, r, decodeURIComponent(u.pathname.slice(7)));
  return r.fulfill({ status: 404 });
});
await page.goto(`${ORIGIN}/host.html`);

// the vault: the example project, its images and its score
const put = async (p, bytes) => page.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [p, Array.from(bytes)]);
await page.evaluate(([p, t]) => HOST.files.set(p, t), [FILE, readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8')]);
for (const f of readdirSync(join(EX, 'assets'))) await put(`${DIR}/assets/${f}`, readFileSync(join(EX, 'assets', f)));
await put(`${DIR}/audio/episode-2.12-score.mp3`, readFileSync(join(EX, 'audio/episode-2.12-score.mp3')));
await page.evaluate(src => HOST.load(src), readFileSync(MAIN, 'utf8'));
const reg = await page.evaluate(() => Object.fromEntries(Object.entries(HOST.reg).map(([k, v]) => [k, v.map(x => x.id)])));
assert.deepEqual(reg.fileTypes, ['project']);

// 1. an untrusted project shows the gate, not a preview
await page.evaluate(p => HOST.open(p), FILE);
await page.waitForSelector('.fvs-gate');
assert.equal(await page.locator('.fvs-view iframe').count(), 0, 'no preview before trust');
await shot(page, '01-gate');
await page.click('.fvs-gate button');
const ready = async () => page.waitForFunction(() => { const f = document.querySelector('.fvs-view iframe'); return f && !f.classList.contains('fvs-pending') && !document.querySelector('.fvs-view iframe.fvs-pending'); }, null, { timeout: 20000 });
await ready();
assert.ok((await page.evaluate(() => HOST.data.trusted)).includes(FILE), 'trust remembered');
assert.equal(await page.locator('.fvs-clip').count(), 20, '20 scenes on the timeline');
await page.waitForFunction(() => /拍点/.test(document.querySelector('.fvs-sync-sum')?.textContent || ''), null, { timeout: 30000 });
const syncSum = await page.textContent('.fvs-sync-sum');
console.log('sync summary:', syncSum);
await shot(page, '02-open');
await checkWorkspace(page, FILE, shot);

// 2. select the cards scene and seek into its fourth card
await page.click('.fvs-clip[data-id="cards"]', { position: { x: 14, y: 24 } });
assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'cards');
await page.locator('.fvs-studio').focus();
const cards = await page.evaluate(() => { const c = document.querySelector('.fvs-clip[data-id="cards"]').getBoundingClientRect(); return c; });
const hits = page.locator('.fvs-clip[data-id="cards"] .fvs-hitm');
assert.equal(await hits.count(), 8);
await hits.nth(3).click();
await page.waitForTimeout(300);
await shot(page, '03-card4');

// 3. double-click the big word in the picture and change it
const view = await page.locator('.fvs-view').boundingBox();
const before = await page.evaluate(p => HOST.text(p), FILE);
// card 4 (工具) sits right-aligned at the top; its glyphs cover the frame's upper right
const fr = { x: view.x + (view.width - view.height * 4 / 3) / 2, w: view.height * 4 / 3, y: view.y, h: view.height };
await page.mouse.dblclick(fr.x + fr.w * .72, fr.y + fr.h * .33);
await page.waitForSelector('.fvs-inline textarea', { timeout: 5000 });
assert.equal(await page.inputValue('.fvs-inline textarea'), '工具');
await page.fill('.fvs-inline textarea', '工具箱');
await page.keyboard.press('Enter');
await page.waitForTimeout(900);
const after = await page.evaluate(p => HOST.text(p), FILE);
assert.notEqual(after, before);
assert.equal(after.replace('>工具箱<', '>工具<'), before, 'only that text changed, byte for byte elsewhere');
await ready();
await shot(page, '04-edited');

// 4. undo restores the file
await page.locator('.fvs-studio').focus();
await page.keyboard.press('Control+z');
await page.waitForTimeout(900);
assert.equal(await page.evaluate(p => HOST.text(p), FILE), before, 'undo restores the file');

// 5. drag the end of "years" one bar left: a roll edit (half grows, later cuts stay)
await page.selectOption('.fvs-tl-bar select', 'bar');
const edge = await page.locator('.fvs-clip[data-id="years"] .fvs-edge.end').boundingBox();
const zoom = await page.evaluate(() => { const c = document.querySelector('.fvs-clip[data-id="cards"]'); return c.getBoundingClientRect().width / 6.4; });
const ex = edge.x + edge.width / 2; // the handle narrows on short clips
await page.mouse.move(ex, edge.y + 20);
await page.mouse.down();
await page.mouse.move(ex - 1.6 * zoom, edge.y + 20, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(900);
const rolled = await page.evaluate(p => HOST.text(p), FILE);
assert.match(rolled, /## years · 多年来\n\n```fvs\n\{ "length": "1 bar"/, 'years is one bar');
assert.ok(rolled.includes('{ "length": "3 bars", "hits": [4, 7], "class": "hud" }'), `half grew and kept its hit times: ${rolled.match(/## half[\s\S]*?```fvs\n(.*)\n/)[1]}`);
await page.keyboard.press('Control+z');
await page.waitForTimeout(700);
assert.equal(await page.evaluate(p => HOST.text(p), FILE), before);

// 6. the text panel edits the same runs; AI rewrite goes through ctx.tangu.complete
await page.click('[data-tab="text"]');
await page.click('.fvs-clip[data-id="years"]', { position: { x: 14, y: 24 } });
const first = page.locator('.fvs-text-item textarea').first();
assert.equal(await first.inputValue(), '多年来，');
await page.locator('.fvs-text-item .fvs-link').first().click();
await page.waitForSelector('.fvs-suggest .fvs-btn.primary');
await page.click('.fvs-suggest .fvs-btn.primary');
await page.waitForTimeout(900);
assert.ok((await page.evaluate(p => HOST.text(p), FILE)).includes('data-in="h0">多年来，！</span>'));
await shot(page, '05-text-tab');
await page.locator('.fvs-studio').focus();
await page.keyboard.press('Control+z');
await page.waitForTimeout(600);

// 7. export a web video; it plays on its own without errors
await page.click('.fvs-bar button:has-text("导出")');
await page.click('.fvs-menu button:has-text("导出网页视频")');
await page.waitForFunction(p => HOST.files.has(p), `${DIR}/episode-2.12.html`, { timeout: 20000 });
const html = await page.evaluate(p => HOST.text(p), `${DIR}/episode-2.12.html`);
assert.ok(html.length > 2e6, 'assets and score are inlined');
if (shots) writeFileSync(join(shots, 'export.html'), html);
const player = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const perr = [];
player.on('pageerror', e => perr.push(String(e)));
await player.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
await player.setContent(html, { waitUntil: 'load' });
await player.waitForSelector('.fvs-chapters button');
await player.click('.fvs-chapters button:has-text("MAGI")');
await player.waitForTimeout(1500);
await player.click('.fvs-play');
assert.equal(perr.length, 0, perr.join('\n'));
if (shots) await player.screenshot({ path: join(shots, '06-export-player.png') });
await player.close();

// 8. hand-offs start a visible conversation with the bundled agent
await page.click('.fvs-ai-action');
await page.fill('.fvs-sheet textarea', '把「标题卡」的最后一张改成三行');
await shot(page, '07-ask');
await page.click('.fvs-sheet .fvs-btn.primary');
await page.waitForFunction(() => HOST.calls.startChat.length === 1);
const chat = await page.evaluate(() => HOST.calls.startChat[0]);
assert.equal(chat.agent, 'fvs-director');
assert.equal(chat.send, true);
assert.ok(chat.prompt.includes('/home/me/Vault/Videos/第 2.12 话/episode-2.12.fvs.md'));
assert.ok(chat.prompt.includes('把「标题卡」的最后一张改成三行'));
assert.ok(chat.prompt.includes('/home/me/Vault/Forsion Video Studio/.fvs-tools/fvs.mjs'));
assert.ok(await page.evaluate(() => HOST.files.has('Forsion Video Studio/.fvs-tools/fvs.mjs')), 'tools materialised in the vault');
assert.ok(await page.evaluate(() => HOST.files.has('Forsion Video Studio/.fvs-tools/music/README.md')));
await page.waitForSelector('.fvs-sheet .fvs-phase');
await page.locator('.fvs-sheet textarea').focus();
await page.keyboard.press('Escape');
assert.equal(await page.locator('.fvs-sheet').count(), 0, 'Escape closes the Director sheet');

// 9. an external edit (the agent) reloads, and undo can take it back
const ext = before.replace('>人格<', '>灵魂<');
await page.evaluate(([p, t]) => HOST.external(p, t), [FILE, ext]);
await page.waitForFunction(() => HOST.calls.notify.some(m => /已载入/.test(m)));
await page.click('[data-tab="text"]');
await page.click('.fvs-clip[data-id="cards"]', { position: { x: 14, y: 24 } });
assert.equal(await page.locator('.fvs-text-item textarea').first().inputValue(), '灵魂');
await page.locator('.fvs-studio').focus();
await page.keyboard.press('Control+z');
await page.waitForTimeout(900);
assert.equal(await page.evaluate(p => HOST.text(p), FILE), before, 'undo takes back the external edit');

// 10. the project tab lists the sync check
await page.click('[data-tab="project"]');
await shot(page, '08-project');
const code = page.locator('[data-tab="code"]');
await code.click();
await shot(page, '09-code');

// 11. a brand new project from the file creator opens trusted and previews
await page.evaluate(() => HOST.reg.creators[0].run('Videos'));
await ready();
assert.equal(await page.locator('.fvs-clip').count(), 0, 'a new project starts without scenes');
await page.waitForSelector('.fvs-studio .fvs-blank:not([hidden])').catch(() => assert.fail('and its stage says how to start'));
assert.ok(!/^## /m.test(await page.evaluate(() => HOST.text(HOST.calls.openFile.at(-1)))), 'nothing ready-made in the file');
await shot(page, '10-new');

// 12. A new English workspace localizes both controls and project filename.
await page.evaluate(() => { HOST.locale = 'en'; return HOST.reg.creators[0].run('Videos'); });
await ready();
assert.match(await page.evaluate(() => HOST.calls.openFile.at(-1)), /\/New video(?: \d+)?\.fvs\.md$/, 'the default name follows the interface language');
const chromeText = await page.locator('.fvs-bar').innerText();
assert.doesNotMatch(chromeText, /[\u4e00-\u9fff]/);
assert.equal(await page.getByRole('button', { name: 'Next scene', exact: true }).count(), 1);
await shot(page, '13-english');

/** A fresh host page with the example project trusted and the plugin loaded (for the Space sections). */
async function spacePage({ chat = false } = {}) {
  const sp = await browser.newPage({ viewport: { width: 1600, height: 960 } });
  const serr = [];
  sp.on('pageerror', e => serr.push(String(e)));
  await sp.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await sp.route(`${ORIGIN}/**`, async r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/host.html' || u.pathname === '/host.js') return r.fulfill({ path: join(here, 'host', u.pathname.slice(1)) });
    if (u.pathname.startsWith('/vault/')) return serveVault(sp, r, decodeURIComponent(u.pathname.slice(7)));
    return r.fulfill({ status: 404 });
  });
  await sp.goto(`${ORIGIN}/host.html`);
  await sp.evaluate(([p, t]) => { HOST.files.set(p, t); HOST.ctx.saveData({ trusted: [p], last: p }); }, [FILE, readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8')]);
  for (const f of readdirSync(join(EX, 'assets'))) await sp.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [`${DIR}/assets/${f}`, Array.from(readFileSync(join(EX, 'assets', f)))]);
  if (chat) await sp.evaluate(() => HOST.enableChat()); // a host with ctx.tangu.mountChat
  await sp.evaluate(src => HOST.load(src), readFileSync(MAIN, 'utf8'));
  return { sp, serr };
}

// 13. In a Space the properties panel is the right side's resting state: it opens with the project without
// taking the keyboard, gives way to the Director, comes back after it, stays closed once the person closes it,
// and returns when a hidden Space shows again (host rules mirrored in test/host/host.js). This host is an older
// one: it passes the recipe's main params but ignores layout.bottom, so the editor keeps its own timeline.
const RECIPE = JSON.parse(readFileSync(join(root, 'spaces/forsion-video-studio/space.json'), 'utf8')).layout;
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(([p, r]) => { HOST.space(p, r, { oldHost: true }); document.querySelector('.host-list-row').focus(); }, [FILE, RECIPE]);
  const props = () => sp.locator('.host-extend .fvs-native-properties').count();
  const settled = () => sp.waitForTimeout(150);
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 10000 });
  assert.equal(await sp.locator('.fvs-studio .fvs-tl').count(), 1, 'without a bottom panel the editor keeps its timeline');
  assert.equal(await sp.locator('.fvs-dock-strip').count(), 0);
  assert.equal(await sp.locator('.host-left .fvs-nav').count(), 1, 'an older host keeps the navigation on the left (no replaceView, no bin)');
  await settled();
  assert.equal(await sp.evaluate(() => document.activeElement?.className), 'host-list-row', 'opening by itself leaves the keyboard where it was');
  const toggle = sp.getByRole('button', { name: '属性面板', exact: true });
  assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
  // the Director takes the side, and the properties come back when it closes
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await sp.waitForSelector('.host-extend .fvs-director-panel');
  assert.equal(await props(), 0);
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await sp.waitForSelector('.host-extend .fvs-native-properties');
  await settled();
  assert.ok(await sp.evaluate(() => !document.querySelector('.host-extend').contains(document.activeElement)), 'coming back does not take the keyboard either');
  // the project picker borrows the side too; dismissing it brings the properties back
  await sp.locator('.fvs-project').click();
  await sp.waitForSelector('.host-extend .fvs-library');
  await sp.click('.host-extend-close');
  await sp.waitForSelector('.host-extend .fvs-native-properties');
  // focus mode hides it; Escape leaves focus mode without the host also dismissing the panel
  await sp.getByRole('button', { name: '专注预览', exact: true }).click();
  assert.equal(await props(), 0);
  await sp.locator('.fvs-studio').focus();
  await sp.keyboard.press('Escape');
  await sp.waitForSelector('.host-extend .fvs-native-properties');
  // a hidden Space loses the panel; showing it again brings it back
  await sp.evaluate(() => HOST.spaceState.hide());
  assert.equal(await props(), 0);
  await sp.evaluate(() => HOST.spaceState.show());
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 5000 });
  // hidden and shown again without a resize: the first interaction with the editor brings it back
  await sp.evaluate(() => HOST.spaceState.hide({ keepSize: true }));
  await sp.waitForTimeout(300); // the closed panel widened the editor: let that resize pass while hidden
  assert.equal(await props(), 0);
  await sp.evaluate(() => HOST.spaceState.show());
  await sp.waitForTimeout(300);
  assert.equal(await props(), 0, 'nothing resized, so nothing has told the editor yet');
  await sp.locator('.fvs-tl-scroll').click({ position: { x: 300, y: 10 } });
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 5000 });
  // closed by the person (toggle): the Director no longer brings it back
  await toggle.click();
  assert.equal(await props(), 0);
  assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await sp.waitForSelector('.host-extend .fvs-director-panel');
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await sp.waitForSelector('.host-extend .fvs-director-panel', { state: 'detached' });
  await settled();
  assert.equal(await props(), 0, 'closed stays closed');
  // the host's × counts as closing it too; the toggle reopens it and takes the keyboard there (asked for)
  await toggle.click();
  await sp.waitForSelector('.host-extend .fvs-native-properties');
  await settled();
  assert.ok(await sp.evaluate(() => document.querySelector('.host-extend').contains(document.activeElement)), 'an asked-for panel takes the keyboard');
  await sp.click('.host-extend-close');
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await sp.waitForSelector('.host-extend .fvs-director-panel');
  await sp.getByRole('button', { name: 'AI 导演', exact: true }).click();
  await settled();
  assert.equal(await props(), 0, 'dismissed stays closed');
  // double-clicking a caption opens the panel on that caption's text
  const lane = await sp.locator('.fvs-cap-lane').boundingBox();
  await sp.mouse.dblclick(lane.x + 200, lane.y + lane.height / 2);
  await sp.waitForFunction(() => document.querySelector('.host-extend')?.contains(document.activeElement) && /^cap:\d+:text$/.test(document.activeElement.dataset.key || ''), null, { timeout: 5000 });
  assert.equal(await sp.locator('.host-extend [data-tab="captions"]').getAttribute('aria-selected'), 'true');
  await shot(sp, '18-space-captions');
  console.log('space log:', (await sp.evaluate(() => HOST.spaceState.log)).join(' '));
  assert.deepEqual(serr, []);
  await sp.close();
}

// 14. A newer host docks the timeline in the native bottom panel (layout.bottom in the plugin's space.json):
// the editor keeps the stage, the bottom panel shows the same timeline (one state, the editor's keys), closing
// the panel leaves a strip that brings it back, a project switch hands the panel the new timeline, and zoom
// follows the pointer (⌘/Ctrl + wheel, pinch) and the keys (= - ⇧Z).
{
  const recipe = RECIPE;
  assert.deepEqual(recipe.bottom.map(v => v.type), ['plugin:forsion-video-studio:timeline']);
  const { sp, serr } = await spacePage();
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, recipe]);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 10000 });
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 5000 }).catch(() => assert.fail('the left side shows the media bin'));
  assert.equal(await sp.locator('.host-left .fvs-nav').count(), 0, 'with a project open the navigation gave way to the media bin');
  assert.equal(await sp.locator('.host-space main .fvs-tl').count(), 0, 'the editor keeps no timeline of its own');
  assert.equal(await sp.locator('.fvs-dock-strip').isVisible(), false);
  assert.equal(await sp.locator('.fvs-dock-empty').isVisible(), false);
  // one state: a clip picked in the bottom panel is the scene in the properties, and the keys work from there
  await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
  await sp.waitForFunction(() => document.querySelector('.host-extend [data-key="stitle"]')?.value === '标题卡');
  await sp.waitForTimeout(50);
  assert.ok(await sp.evaluate(() => document.querySelector('.fvs-dock-timeline').contains(document.activeElement)), 'a click keeps the keyboard in the timeline');
  const timeAt = () => sp.locator('.fvs-time').textContent();
  const t0 = await timeAt();
  await sp.keyboard.press('ArrowRight');
  assert.notEqual(await timeAt(), t0, 'arrow keys step the playhead from the bottom panel');
  // the host moves views in the DOM (dockview re-hangs the main column when the bottom panel opens or closes);
  // a moved iframe reloads its srcdoc and boots at 0, so the stage must be told the time again, not stay black
  const luma = async () => sp.evaluate(async b64 => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const g = new OffscreenCanvas(img.width, img.height).getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, img.width, img.height).data; let s = 0;
    for (let i = 0; i < d.length; i += 4) s += d[i] + d[i + 1] + d[i + 2];
    return s / (d.length / 4) / 3;
  }, (await sp.locator('.fvs-view').screenshot()).toString('base64'));
  await sp.waitForTimeout(300);
  const lit = await luma();
  await sp.evaluate(() => { const el = document.querySelector('.fvs-studio'), at = el.parentElement, next = el.nextSibling; el.remove(); at.insertBefore(el, next); });
  let relit = 0;
  for (let i = 0; i < 20 && !(relit > lit * .6); i++) { await sp.waitForTimeout(150); relit = await luma(); }
  assert.ok(lit > 40 && relit > lit * .6, `a moved stage repaints the same frame (brightness ${Math.round(lit)} → ${Math.round(relit)})`);
  const width = () => sp.locator('.host-bottom .fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width);
  const fitWidth = await width();
  await sp.keyboard.press('=');
  assert.ok(Math.abs(await width() / fitWidth - 1.5) < .02, '= zooms in');
  await sp.keyboard.press('-');
  assert.ok(Math.abs(await width() - fitWidth) < 1, '- zooms out');
  // ⌘/Ctrl + wheel zooms around the pointer: the point under it stays under it
  const box = await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').boundingBox();
  const mx = box.x + 40, my = box.y + 20;
  await sp.mouse.move(mx, my);
  await sp.keyboard.down('Control'); await sp.mouse.wheel(0, -100); await sp.keyboard.up('Control');
  await sp.waitForFunction(w => document.querySelector('.host-bottom .fvs-clip[data-id="cards"]').getBoundingClientRect().width > w * 1.1, fitWidth);
  const after = await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').boundingBox();
  const f = after.width / box.width;
  assert.ok(Math.abs(after.x - (mx - (mx - box.x) * f)) < 1.5, `wheel zoom keeps the point under the pointer (${after.x} vs ${mx - (mx - box.x) * f})`);
  // a trackpad pinch arrives as small wheel deltas with ctrlKey: many of them zoom smoothly, and nothing scrolls the page
  const pinch = await sp.evaluate(() => {
    const sc = document.querySelector('.host-bottom .fvs-tl-scroll'), r = sc.getBoundingClientRect();
    const before = document.querySelector('.host-bottom .fvs-clip[data-id="cards"]').getBoundingClientRect().width;
    let prevented = 0;
    for (let i = 0; i < 10; i++) {
      const ev = new WheelEvent('wheel', { deltaY: -4, ctrlKey: true, clientX: r.left + 200, clientY: r.top + 40, bubbles: true, cancelable: true });
      sc.dispatchEvent(ev); prevented += ev.defaultPrevented ? 1 : 0;
    }
    return { prevented, ratio: document.querySelector('.host-bottom .fvs-clip[data-id="cards"]').getBoundingClientRect().width / before };
  });
  assert.equal(pinch.prevented, 10);
  assert.ok(pinch.ratio > 1.3 && pinch.ratio < 1.6, `pinch zooms smoothly (×${pinch.ratio.toFixed(2)})`);
  // zoomed all the way in: about 24 px a frame, and the ruler stays as wide as the view (a canvas as wide as the film would break)
  for (let i = 0; i < 20; i++) await sp.keyboard.press('=');
  const deep = await sp.evaluate(() => {
    const sc = document.querySelector('.host-bottom .fvs-tl-scroll'), ruler = sc.querySelector('.fvs-tl-ruler');
    return { view: sc.clientWidth, ruler: ruler.getBoundingClientRect().width, px: ruler.width, inner: sc.querySelector('.fvs-tl-inner').getBoundingClientRect().width,
      left: ruler.getBoundingClientRect().left - sc.getBoundingClientRect().left };
  });
  assert.ok(deep.inner > 40000, `zooms in far enough for frames (${deep.inner}px)`);
  assert.ok(Math.abs(deep.ruler - deep.view) < 1 && deep.px <= 32000 && Math.abs(deep.left) < 1, `the ruler covers the view only (${JSON.stringify(deep)})`);
  await sp.locator('.host-bottom .fvs-tl-scroll').evaluate(e => { e.scrollLeft = 20000; });
  await sp.waitForTimeout(80);
  assert.ok(Math.abs(await sp.locator('.host-bottom .fvs-tl-ruler').evaluate(r => r.getBoundingClientRect().left - r.parentElement.parentElement.getBoundingClientRect().left)) < 1, 'the ruler follows the scroll');
  await sp.keyboard.press('Shift+Z');
  assert.ok(Math.abs(await width() - fitWidth) < 1, '⇧Z fits the film again');
  assert.ok(await sp.locator('.host-bottom .fvs-zoom-controls input').isVisible(), 'the zoom slider is always there');
  await shot(sp, '19-space-docked');
  // closing the bottom panel leaves a strip in the editor that brings the timeline back
  await sp.click('.host-bottom-close');
  await sp.waitForSelector('.fvs-dock-strip', { state: 'visible' });
  assert.equal(await sp.locator('.fvs-tl').count(), 0);
  await sp.getByRole('button', { name: '显示时间线', exact: true }).click();
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]');
  assert.equal(await sp.locator('.fvs-dock-strip').isVisible(), false);
  // (it was measured detached while the panel was closed: the fit is redone on the next frame once it is back)
  await sp.waitForFunction(w => Math.abs(document.querySelector('.host-bottom .fvs-clip[data-id="cards"]').getBoundingClientRect().width - w) < 2, fitWidth, { timeout: 3000 })
    .catch(async () => assert.fail(`the timeline comes back fitted to the panel (${await width()} vs ${fitWidth})`));
  // picking another hit marker in the panel leaves one highlighted (the markers are not under the editor's root)
  const dockHits = sp.locator('.host-bottom .fvs-clip[data-id="cards"] .fvs-hitm');
  await dockHits.nth(2).click(); await dockHits.nth(4).click();
  assert.equal(await sp.locator('.host-bottom .fvs-hitm.on').count(), 1, 'one highlighted hit marker');
  // the panel closing with the keyboard in it hands the keys back to the editor, not to the page
  await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
  await sp.evaluate(() => HOST.spaceState.closeBottom());
  await sp.waitForFunction(() => !!document.activeElement?.closest('.fvs-studio'), null, { timeout: 2000 })
    .catch(async () => assert.fail(`keys go back to the editor (focus on ${await sp.evaluate(() => document.activeElement?.className || document.activeElement?.tagName)})`));
  const t1 = await timeAt();
  await sp.keyboard.press('ArrowRight');
  assert.notEqual(await timeAt(), t1, 'arrow keys still step once the panel is gone');
  await sp.getByRole('button', { name: '显示时间线', exact: true }).click();
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]');
  // a picture dropped on the docked timeline is imported at the nearest cut
  await sp.evaluate(async () => {
    const png = await new Promise(r => { const c = document.createElement('canvas'); c.width = c.height = 4; c.toBlob(r, 'image/png'); });
    const dt = new DataTransfer(); dt.items.add(new File([png], 'dropped.png', { type: 'image/png' }));
    const sc = document.querySelector('.host-bottom .fvs-tl-scroll'), r = sc.getBoundingClientRect();
    const at = { clientX: r.left + 6, clientY: r.top + 70, bubbles: true, cancelable: true, dataTransfer: dt };
    sc.dispatchEvent(new DragEvent('dragover', at)); sc.dispatchEvent(new DragEvent('drop', at));
  });
  await sp.waitForFunction(p => /^## picture · dropped$/m.test(HOST.text(p)), FILE, { timeout: 5000 })
    .catch(() => assert.fail('a file dropped on the docked timeline is imported'));
  await sp.waitForSelector('.host-bottom .fvs-clip[data-id="picture"]');
  // a second studio tab takes the panel; closing it gives the panel back to the first
  const other = `${DIR}/second.fvs.md`;
  await sp.evaluate(([p, q]) => { HOST.files.set(q, HOST.text(p).replace('"title": "第 2.12 话 · 人类补完计划"', '"title": "第二个工程"')); HOST.ctx.saveData({ ...HOST.data, trusted: [p, q] }); }, [FILE, other]);
  await sp.evaluate(() => { document.querySelector('.fvs-dock-timeline .fvs-tl').dataset.first = '1'; });
  await sp.evaluate(q => {
    const box = document.createElement('div'); box.id = 'second-tab'; box.style.cssText = 'position:fixed;left:0;top:0;width:900px;height:500px;visibility:hidden';
    document.body.append(box);
    window.__closeSecond = HOST.reg.views.find(v => v.id === 'studio').mount(box, { surface: 'main', getParams: () => ({ filePath: q }), setParams() {}, onParamsChanged: () => () => {}, showInMainPanel() {} });
  }, other);
  await sp.waitForFunction(() => { const tl = document.querySelector('.fvs-dock-timeline .fvs-tl'); return tl && !tl.dataset.first && tl.querySelector('.fvs-clip'); }, null, { timeout: 10000 });
  await sp.evaluate(async () => { (await window.__closeSecond)?.(); document.getElementById('second-tab').remove(); });
  await sp.waitForFunction(() => document.querySelector('.fvs-dock-timeline .fvs-tl')?.dataset.first === '1', null, { timeout: 3000 })
    .catch(() => assert.fail('closing the newer studio gives the panel back to the first'));
  // another project: the panel gets the new editor's timeline, not two
  await sp.evaluate(([p, q]) => { HOST.files.set(q, HOST.text(p).replace('"title": "第 2.12 话 · 人类补完计划"', '"title": "第二个工程"')); HOST.ctx.saveData({ ...HOST.data, trusted: [p, q] }); }, [FILE, other]);
  await sp.evaluate(() => { document.querySelector('.fvs-dock-timeline .fvs-tl').dataset.old = '1'; });
  await sp.evaluate(q => HOST.reg.lists.find(l => l.id === 'projects').open({ key: q }), other);
  await sp.waitForFunction(() => document.querySelector('.fvs-project-name')?.textContent === '第二个工程');
  await sp.waitForFunction(() => { const tl = document.querySelectorAll('.fvs-dock-timeline .fvs-tl'); return tl.length === 1 && !tl[0].dataset.old && tl[0].querySelector('.fvs-clip'); });
  console.log('docked log:', (await sp.evaluate(() => HOST.spaceState.log)).join(' '));
  assert.deepEqual(serr, []);
  await sp.close();
}

// 15. A video embedded in a note keeps its poster when the host moves the note in the DOM (⌘J re-hangs the main
// column): the moved iframe reloads at 0 and must be told the time again, not left on the first scene.
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(p => { const d = document.createElement('div'); d.id = 'note'; document.body.append(d); HOST.reg.embeds[0].mount(d, { target: p, pagePath: '' }); }, FILE);
  await sp.waitForSelector('#note .fvs-embed button:not([disabled])', { timeout: 15000 });
  const onScreen = async () => {
    try { return await (await (await sp.$('#note iframe')).contentFrame()).evaluate(() => [...document.querySelectorAll('.fvs-scene')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.dataset.scene)); }
    catch { return []; } // between unload and the reloaded document
  };
  const poster = async () => { let s = []; for (let i = 0; i < 40 && !s.includes('boot'); i++) { await sp.waitForTimeout(75); s = await onScreen(); } return s; };
  assert.ok((await poster()).includes('boot'), 'the embed shows its poster (the second scene)');
  await sp.evaluate(() => { const el = document.querySelector('#note .fvs-embed'), at = el.parentElement; el.remove(); at.append(el); });
  const after = await poster();
  assert.ok(after.includes('boot'), `a moved embed shows its poster again (on screen: ${after.join() || 'nothing'})`);
  assert.deepEqual(serr, []);
  await sp.close();
}

// 16. Like Coding Studio: with no project the Space shows its navigation on the left and the launchpad in the main
// area, and no timeline; creating (or opening) a project jumps to the project layout — the media bin on the left,
// the timeline at the bottom — and closing the project jumps back.
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(() => HOST.ctx.saveData({ ...HOST.data, last: null }));
  await sp.evaluate(r => HOST.space(null, r), RECIPE);
  await sp.waitForSelector('.host-left .fvs-nav');
  await sp.waitForSelector(`.fvs-launch .fvs-launch-row[data-project-path="${FILE}"]`, { timeout: 10000 });
  assert.equal(await sp.evaluate(() => HOST.spaceState.docked), null, 'no project, no timeline at the bottom');
  assert.equal(await sp.getAttribute('.fvs-nav [data-nav="projects"]', 'aria-current'), 'page');
  assert.equal(await sp.locator('.fvs-studio').count(), 0);
  assert.match(await sp.locator(`.fvs-launch-row[data-project-path="${FILE}"]`).innerText(), /1440 × 1080[\s\S]*1:34/, 'a row shows the frame and the length');
  await shot(sp, '19-launch');
  // the navigation turns the page, and the keyboard goes with it
  await sp.click('.fvs-nav [data-nav="create"]');
  await sp.waitForSelector('.fvs-launch-card');
  assert.equal(await sp.getAttribute('.fvs-nav [data-nav="create"]', 'aria-current'), 'page');
  assert.ok(await sp.evaluate(() => document.activeElement?.classList.contains('fvs-launch-idea')), 'turning the page moves the keyboard to it');
  // names that break a folder, and a folder that exists, are refused before anything is written
  const count = () => sp.evaluate(() => HOST.files.size);
  await sp.evaluate(() => HOST.files.set('Forsion Video Studio/宣传片/notes.md', '# notes'));
  const files0 = await count();
  await sp.fill('.fvs-launch-name input', 'a/b');
  await sp.click('.fvs-launch-create');
  await sp.waitForSelector('.fvs-launch-error:not([hidden])');
  assert.equal(await sp.getAttribute('.fvs-launch-name input', 'aria-invalid'), 'true');
  await sp.fill('.fvs-launch-name input', '宣传片');
  assert.equal(await sp.locator('.fvs-launch-error').isVisible(), false, 'typing clears the error');
  await sp.click('.fvs-launch-create');
  await sp.waitForFunction(() => /同名/.test(document.querySelector('.fvs-launch-error:not([hidden])')?.textContent || ''));
  assert.equal(await count(), files0, 'nothing written');
  // a portrait project with an idea: its own folder, the frame picked, the idea waiting in the Director
  await sp.fill('.fvs-launch-name input', '新品发布');
  await sp.click('.fvs-launch-aspect:has-text("竖屏")');
  await sp.fill('.fvs-launch-idea', '一支 15 秒的竖屏新品预告');
  assert.match(await sp.locator('.fvs-launch-note').first().innerText(), /Forsion Video Studio\/新品发布\//, 'the page says where it goes');
  await shot(sp, '20-create');
  await sp.click('.fvs-launch-create');
  const made = 'Forsion Video Studio/新品发布/新品发布.fvs.md';
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 10000 }).catch(() => assert.fail('creating a project jumps to the media bin'));
  const madeText = await sp.evaluate(p => HOST.text(p), made);
  assert.match(madeText, /"title": "新品发布"/);
  assert.match(madeText, /"width": 1080/); assert.match(madeText, /"height": 1920/);
  assert.ok((await sp.evaluate(() => HOST.data.trusted)).includes(made), 'its preview may run');
  assert.equal(await sp.evaluate(() => HOST.data.last), made);
  assert.equal(await sp.locator('.host-left .fvs-nav').count(), 0, 'the navigation gave way to the media bin');
  assert.equal(await sp.evaluate(() => HOST.spaceState.docked), 'timeline', 'the timeline came to the bottom');
  // a new project has no scenes: the stage says how to start, the timeline says so in one line, nothing to export
  assert.ok(!/^## /m.test(madeText), 'a new project has no scenes');
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-tl-empty');
  await sp.waitForSelector('.fvs-studio .fvs-blank:not([hidden])').catch(() => assert.fail('an empty project shows how to start'));
  assert.equal(await sp.locator('.host-bottom .fvs-dock-timeline .fvs-clip').count(), 0);
  assert.ok(await sp.locator('.host-bottom .fvs-tl-empty').evaluate(e => e.getBoundingClientRect().height < 30), 'the timeline\'s hint stays on one line (its lane is 0 px wide while the project is empty)');
  assert.equal(await sp.locator('.fvs-bar .fvs-export-action').isDisabled(), true, 'nothing to export from an empty project');
  await sp.waitForSelector('.host-extend .fvs-director-panel textarea', { timeout: 5000 }).catch(() => assert.fail('the idea reaches the Director although the project is empty'));
  assert.equal(await sp.inputValue('.host-extend .fvs-director-panel textarea'), '一支 15 秒的竖屏新品预告', 'the Director holds the idea');
  assert.equal(await sp.evaluate(() => HOST.calls.startChat.length), 0, 'nothing is sent by itself');
  await shot(sp, '21-created');
  // the real host remounts the editor around layout jumps, sometimes after the idea reached the Director: the idea
  // (as edited) waits until it is sent, and not after
  const director = '.host-extend .fvs-director-panel textarea';
  const draftAfterRemount = async (want, label) => {
    await sp.evaluate(() => HOST.spaceState.remount());
    await sp.waitForFunction(([s, w]) => document.querySelector(s)?.value === w, [director, want], { timeout: 5000 }).catch(() => assert.fail(label));
  };
  await draftAfterRemount('一支 15 秒的竖屏新品预告', 'a remount keeps the idea');
  await sp.fill(director, '一支 15 秒的竖屏新品预告，最后停在 Logo');
  await draftAfterRemount('一支 15 秒的竖屏新品预告，最后停在 Logo', 'a remount keeps the edited idea');
  assert.equal(await sp.evaluate(() => HOST.calls.startChat.length), 0, 'still nothing sent');
  await sp.click('.host-extend .fvs-director-panel .fvs-send-row .fvs-btn.primary');
  await sp.waitForFunction(() => HOST.calls.startChat.length === 1);
  assert.match((await sp.evaluate(() => HOST.calls.startChat[0])).prompt, /最后停在 Logo/, 'the edited idea is what goes');
  await sp.evaluate(() => HOST.spaceState.remount());
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-tl-empty');
  await sp.waitForTimeout(400);
  assert.ok(!/新品预告/.test(await sp.locator(director).inputValue().catch(() => '')), 'a sent idea does not come back');
  // the stage's "New scene" opens the timeline's templates; the first scene ends the start state
  await sp.click('.fvs-studio .fvs-blank [data-blank="scene"]');
  await sp.locator('.fvs-template').first().click();
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip').catch(() => assert.fail('the start state adds the first scene'));
  await sp.waitForFunction(() => document.querySelector('.fvs-studio .fvs-blank').hidden);
  assert.equal(await sp.locator('.fvs-bar .fvs-export-action').isDisabled(), false);
  // closing the project jumps back: navigation, launchpad, no timeline, nothing to reopen next time
  await sp.locator('.fvs-bar button[aria-label="更多"]').click();
  await sp.getByRole('menuitem', { name: '关闭工程' }).click();
  await sp.waitForSelector('.host-left .fvs-nav');
  await sp.waitForSelector(`.fvs-launch-row[data-project-path="${made}"]`);
  assert.equal(await sp.evaluate(() => HOST.spaceState.docked), null, 'closing the project closes its timeline');
  assert.equal(await sp.evaluate(() => HOST.data.last), null);
  assert.equal(await sp.locator('.host-left .fvs-bin').count(), 0);
  assert.equal(await sp.getAttribute('.fvs-nav [data-nav="projects"]', 'aria-current'), 'page', 'back on the list');
  await shot(sp, '22-closed');
  // a row of the list jumps again
  await sp.click(`.fvs-launch-row[data-project-path="${FILE}"]`);
  await sp.waitForSelector('.host-left .fvs-bin');
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]');
  console.log('launch log:', (await sp.evaluate(() => HOST.spaceState.log)).join(' '));
  assert.deepEqual(serr, []);
  await sp.close();
}

// 17. The media bin: the project's pictures, clips and sounds; importing into it copies without placing; a
// double-click adds a file after the scene at the playhead (a sound: a track from the playhead), a drag drops it at
// a cut on the timeline; "used" follows the project text.
{
  const { sp, serr } = await spacePage();
  // a short sound the project does not use yet (the 2 MB score would be analysed on load, which only slows this down)
  const n = 800, wav = Buffer.alloc(44 + n, 128);
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + n, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(8000, 24); wav.writeUInt32LE(8000, 28); wav.writeUInt16LE(1, 32); wav.writeUInt16LE(8, 34); wav.write('data', 36); wav.writeUInt32LE(n, 40);
  await sp.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [`${DIR}/audio/tick.wav`, Array.from(wav)]);
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector('.host-left .fvs-bin .fvs-bin-item', { timeout: 10000 })
    .catch(async () => assert.fail(`the bin lists the project's media: ${JSON.stringify(await sp.evaluate(() => ({ left: document.querySelector('.host-left-body')?.innerText, log: HOST.spaceState.log })))} ${serr}`));
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  const text = () => sp.evaluate(p => HOST.text(p), FILE);
  const before = await text();
  const tiles = await sp.$$eval('.fvs-bin-item', els => els.map(e => [e.dataset.rel, e.dataset.kind, !e.querySelector('.fvs-bin-used').hidden]));
  assert.deepEqual(tiles.map(x => x[0]), ['assets/aria.jpg', 'assets/arioso.jpg', 'assets/recita.jpg', 'audio/tick.wav']);
  assert.deepEqual(tiles.map(x => x[1]), ['image', 'image', 'image', 'audio']);
  // the badges follow the editor's text, which loads a moment after the bin has listed the files
  await sp.waitForFunction(text => [...document.querySelectorAll('.fvs-bin-item')].every(e => e.querySelector('.fvs-bin-used').hidden === !text.includes(e.dataset.rel)), before, { timeout: 3000 })
    .catch(() => assert.fail(`"used" follows the project text: ${JSON.stringify(tiles)}`));
  await sp.waitForFunction(() => [...document.querySelectorAll('.fvs-bin-thumb img')].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 5000 })
    .catch(() => assert.fail('the pictures show thumbnails'));
  await shot(sp, '23-bin');
  // importing into the bin copies the file under media/ and leaves the cut alone
  const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  await sp.setInputFiles('.fvs-bin input[type=file]', { name: 'logo.png', mimeType: 'image/png', buffer: PNG });
  const logo = '.fvs-bin-item[data-rel="media/logo.png"]';
  await sp.waitForSelector(logo, { timeout: 5000 });
  assert.ok(await sp.evaluate(p => HOST.files.has(p), `${DIR}/media/logo.png`));
  assert.equal(await text(), before, 'importing into the bin does not touch the cut');
  assert.equal(await sp.locator(`${logo} .fvs-bin-used`).isVisible(), false);
  // (no focus first: the key is pressed where the bin left the keyboard — see 17a)
  const undo = async label => {
    await sp.keyboard.press('Control+z');
    await sp.waitForFunction(([p, b]) => HOST.text(p) === b, [FILE, before], { timeout: 4000 }).catch(() => assert.fail(`undo restores the file after ${label}`));
  };
  // clips sit at their times: the DOM order is the order they were drawn in
  const order = () => sp.$$eval('.host-bottom .fvs-clip', els => els.sort((a, b) => a.offsetLeft - b.offsetLeft).map(e => e.dataset.id));
  // double-click: after the scene under the playhead
  await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
  await sp.dblclick(logo);
  await sp.waitForFunction(p => /^## picture · logo$/m.test(HOST.text(p)), FILE, { timeout: 5000 });
  let ids = await order();
  assert.equal(ids[ids.indexOf('cards') + 1], 'picture', `added after the scene at the playhead (${ids.join(' ')} · ${await sp.textContent('.fvs-time')})`);
  assert.equal(await sp.getAttribute('.host-bottom .fvs-clip.on', 'data-id'), 'picture', 'and selected');
  await sp.waitForFunction(s => !document.querySelector(s).hidden, `${logo} .fvs-bin-used`, { timeout: 3000 }).catch(() => assert.fail('"used" shows once the project uses it'));
  await undo('a double-click');
  // a drag onto the timeline: placed at the cut the insert line showed
  ids = await order();
  const at = ids[3], clip = await sp.locator(`.host-bottom .fvs-clip[data-id="${at}"]`).boundingBox(), lane = await sp.locator('.host-bottom .fvs-tl-scroll').boundingBox();
  await sp.dragAndDrop(logo, '.host-bottom .fvs-tl-scroll', { targetPosition: { x: clip.x - lane.x + 4, y: clip.y - lane.y + 12 } });
  await sp.waitForFunction(p => /^## picture · logo$/m.test(HOST.text(p)), FILE, { timeout: 5000 }).catch(() => assert.fail('a file dragged from the bin onto the timeline is placed'));
  ids = await order();
  assert.equal(ids[ids.indexOf(at) - 1], 'picture', `placed at the cut before ${at}`);
  assert.equal(await sp.locator('.fvs-tl-insert').count(), 0, 'the insert line is gone');
  await undo('a drag from the bin');
  // a sound: one more track, starting at the playhead
  await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
  await sp.dblclick('.fvs-bin-item[data-rel="audio/tick.wav"]');
  await sp.waitForFunction(p => /"role": "track",\s*"at": [\d.]+/.test(HOST.text(p)), FILE, { timeout: 5000 }).catch(async () => assert.fail(`a sound becomes a track from the playhead: ${(await text()).match(/"audio"[\s\S]*?\]/)?.[0]}`));
  await undo('a sound from the bin');
  console.log('bin log:', (await sp.evaluate(() => HOST.spaceState.log)).join(' '));
  assert.deepEqual(serr, []);
  await sp.close();
}

// 17a. The keyboard stays with the project. Its panels sit in the host's areas, outside the editor, and a redraw that
// removes the focused control drops the focus to the page: an edit made in the properties or from the bin is undone
// with the key from where the person is (2026-10-04: after either, only the undo button worked). A press elsewhere
// in the host gives the keyboard up, and the bin passes nothing but undo and redo.
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector('.host-left .fvs-bin .fvs-bin-item', { timeout: 10000 });
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  const side = sp.locator('.host-extend'), text = () => sp.evaluate(p => HOST.text(p), FILE);
  const is = (want, label) => sp.waitForFunction(([p, b]) => HOST.text(p) === b, [FILE, want], { timeout: 3000 }).catch(() => assert.fail(label));
  const changes = (from, label) => sp.waitForFunction(([p, b]) => HOST.text(p) !== b, [FILE, from], { timeout: 4000 }).catch(() => assert.fail(label));
  const keyboard = () => sp.evaluate(() => { const a = document.activeElement; return !a || a === document.body ? 'page' : a.closest('.fvs-bin') ? 'bin' : a.closest('.fvs-native-properties') ? 'properties' : 'other'; });
  // "the key did nothing" is read from the editor, not from the file: a save lands 600 ms after an edit, so the file
  // alone would still look untouched right after a key that did change the project
  const saved = () => sp.waitForFunction(() => document.querySelector('.fvs-status')?.dataset.state === 'saved', null, { timeout: 4000 });
  const untouched = async (keys, label) => {
    await saved();
    for (const k of keys) await sp.keyboard.press(k);
    await sp.waitForTimeout(150);
    assert.equal(await sp.getAttribute('.fvs-status', 'data-state'), 'saved', label);
  };
  const pick = async () => {
    await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
    await sp.waitForFunction(() => document.querySelector('.host-extend [data-key="stitle"]')?.value === '标题卡');
  };
  await pick();
  const before = await text();
  // a field of the properties, committed with Enter: the focus is on the page
  await side.locator('[data-key="stitle"]').fill('改过的标题'); await sp.keyboard.press('Enter');
  await changes(before, 'the title field commits');
  const renamed = await text();
  assert.equal(await keyboard(), 'page');
  await sp.keyboard.press('Control+z'); await is(before, 'undo after an edit in the properties, the focus on the page');
  await sp.keyboard.press('Control+Shift+z'); await is(renamed, 'and redo');
  await sp.keyboard.press('Control+z'); await is(before, 'and undo again');
  // a button of the properties: the redraw takes it away
  await side.getByRole('button', { name: '后移', exact: true }).click();
  await changes(before, 'the scene moves');
  await sp.keyboard.press('Control+z'); await is(before, 'undo after a button of the properties');
  // a file added from the bin: the focus is on its tile
  await sp.dblclick('.fvs-bin-item[data-rel="assets/aria.jpg"]');
  await changes(before, 'a double-click adds the picture');
  assert.equal(await keyboard(), 'bin');
  await untouched(['Delete'], 'Delete on a file in the bin does not delete a scene');
  await sp.keyboard.press('Control+z'); await is(before, 'undo from the bin');
  // a press elsewhere gives the keyboard up (another part of the host, or the page itself); one in the editor takes
  // it back. Delete is the key that would hurt: it deletes the selected scene.
  const elsewhere = [
    ['in the host', async () => { await sp.locator('.host-list-row').click(); await sp.evaluate(() => document.activeElement.blur()); }],
    ['on the page', () => sp.evaluate(() => { document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); })],
  ];
  for (const [where, leave] of elsewhere) {
    await pick();
    await side.getByRole('button', { name: '后移', exact: true }).click();
    await changes(before, 'the scene moves again');
    await leave();
    assert.equal(await keyboard(), 'page');
    await untouched(['Delete', 'Control+z'], `after a press elsewhere (${where}) the keys are not ours`);
    await sp.locator('.fvs-studio .fvs-time').click();
    await sp.keyboard.press('Control+z'); await is(before, 'and a press in the editor takes them back');
  }
  // the editor behind another main tab: the bin still adds to the project, and undo works from it
  await sp.evaluate(() => HOST.spaceState.hide());
  await sp.dblclick('.fvs-bin-item[data-rel="assets/aria.jpg"]');
  await changes(before, 'the bin adds to the project while its editor is hidden');
  await sp.keyboard.press('Control+z'); await is(before, 'undo from the bin while the editor is hidden');
  await sp.evaluate(() => HOST.spaceState.show());
  assert.deepEqual(serr, []);
  await sp.close();
}

// 17b. Generated media and the bin's tools. A file under generated/ (where the host's image tool writes when the
// Director is asked for a picture) is listed with an AI mark, also when it arrives while the bin is open; the filter
// narrows the bin without touching the files; a tile's menu places it and reveals it.
{
  const { sp, serr } = await spacePage();
  const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  const old = 'generated/1700000000000.png', made = `.fvs-bin-item[data-rel="${old}"]`;
  await sp.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [`${DIR}/${old}`, Array.from(PNG)]);
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector(`.host-left .fvs-bin ${made}`, { timeout: 10000 }).catch(() => assert.fail('the bin lists the files under generated/'));
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  const text = () => sp.evaluate(p => HOST.text(p), FILE);
  const is = (want, label) => sp.waitForFunction(([p, b]) => HOST.text(p) === b, [FILE, want], { timeout: 4000 }).catch(() => assert.fail(label));
  const changes = (from, label) => sp.waitForFunction(([p, b]) => HOST.text(p) !== b, [FILE, from], { timeout: 4000 }).catch(() => assert.fail(label));
  assert.equal(await sp.locator(`${made} .fvs-bin-ai`).count(), 1, 'a generated file carries the AI mark');
  assert.equal(await sp.locator('.fvs-bin-item[data-rel="assets/aria.jpg"] .fvs-bin-ai').count(), 0, 'an imported one does not');
  // the filter: one at a time, the tiles outside it hide
  // (what is on screen, not the hidden property: a tile the style sheet still shows would count)
  const visible = () => sp.$$eval('.fvs-bin-item', els => els.filter(e => e.getClientRects().length).map(e => e.dataset.rel));
  const filter = async name => { await sp.click('.fvs-bin [data-bin="filter"]'); await sp.getByRole('menuitemradio', { name, exact: true }).click(); };
  await sp.waitForFunction(() => !document.querySelector('.fvs-bin-item[data-rel="assets/aria.jpg"] .fvs-bin-used').hidden, null, { timeout: 3000 });
  assert.equal(await sp.textContent('.fvs-bin-count'), '4');
  await filter('AI 生成');
  assert.deepEqual(await visible(), [old]);
  assert.equal(await sp.textContent('.fvs-bin-count'), '1 / 4');
  assert.equal(await sp.getAttribute('.fvs-bin [data-bin="filter"]', 'aria-pressed'), 'true');
  await filter('图片');
  assert.deepEqual(await visible(), ['assets/aria.jpg', 'assets/arioso.jpg', 'assets/recita.jpg', old]);
  await filter('声音');
  assert.deepEqual(await visible(), []);
  assert.equal(await sp.textContent('.fvs-bin-empty'), '没有符合筛选的素材。');
  await filter('未使用');
  assert.deepEqual(await visible(), [old], 'the pictures the project uses are outside "unused"');
  // the file leaves "unused" once a scene uses it, and comes back with the undo
  const before = await text();
  await sp.locator('.host-bottom .fvs-clip[data-id="cards"]').click({ position: { x: 14, y: 24 } });
  await sp.dblclick(made);
  await changes(before, 'a generated file is placed like any other');
  await sp.waitForFunction(s => document.querySelector(s).hidden, made, { timeout: 4000 }).catch(() => assert.fail('a file that got used leaves the "unused" filter'));
  await sp.locator('.fvs-studio .fvs-time').click();
  await sp.keyboard.press('Control+z'); await is(before, 'undo');
  await sp.waitForFunction(s => !document.querySelector(s).hidden, made, { timeout: 4000 }).catch(() => assert.fail('and it is back among the unused'));
  await filter('全部');
  assert.equal((await visible()).length, 4);
  // the tile's menu: no entry that does nothing; a file no scene uses can go to the recycle bin
  await sp.click(made, { button: 'right' });
  assert.deepEqual(await sp.$$eval('.fvs-menu button', els => els.map(e => [e.textContent.trim(), e.disabled])),
    [['放到播放头之后', false], ['在文件夹中显示', false], ['删除', false]]);
  await shot(sp, '24-bin-menu');
  await sp.getByRole('menuitem', { name: '在文件夹中显示' }).click();
  assert.deepEqual(await sp.evaluate(() => HOST.calls.reveal), [`${DIR}/${old}`]);
  // a picture the Director makes while the bin is open arrives on its own (the bin looks again every few seconds)
  await sp.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [`${DIR}/generated/1700000000001.png`, Array.from(PNG)]);
  await sp.waitForFunction(() => document.querySelectorAll('.fvs-bin-item[data-ai]').length === 2, null, { timeout: 9000 }).catch(() => assert.fail('the bin lists a picture generated while it is open'));
  assert.equal(await sp.textContent('.fvs-bin-count'), '5');
  // a file a scene uses stays: its "Delete" says why and does nothing
  await sp.click('.fvs-bin-item[data-rel="assets/aria.jpg"]', { button: 'right' });
  assert.deepEqual(await sp.$$eval('.fvs-menu button', els => els.filter(e => /删除/.test(e.textContent)).map(e => [e.querySelector('.fvs-menu-text span').textContent, e.querySelector('small')?.textContent, e.disabled])), [['删除', '场景里还在用', true]]);
  await sp.keyboard.press('Escape');
  // an unused one goes to the recycle bin and leaves the bin
  await sp.click(made, { button: 'right' });
  await sp.getByRole('menuitem', { name: '删除' }).click();
  await sp.waitForSelector(made, { state: 'detached', timeout: 4000 }).catch(() => assert.fail('a deleted file leaves the bin'));
  assert.deepEqual(await sp.evaluate(() => HOST.calls.trash), [`${DIR}/${old}`]);
  assert.equal(await sp.textContent('.fvs-bin-count'), '4');
  assert.deepEqual(serr, []);
  await sp.close();
}

// 18a. A saved layout whose main view lost the recipe's params (seen 2026-10-03 in a real dev: the restored studio
// carried only filePath). The project layout still comes: it follows the host's bottom panel, not a view param.
{
  const { sp, serr } = await spacePage();
  const lost = { ...RECIPE, main: RECIPE.main.map(({ type }) => ({ type })) };
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, lost]);
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 10000 }).catch(() => assert.fail('without the main view params the media bin still replaces the navigation'));
  await sp.waitForSelector('.host-bottom .fvs-clip', { timeout: 10000 }).catch(() => assert.fail('without the main view params the timeline still docks at the bottom'));
  assert.equal(await sp.locator('.fvs-studio .fvs-tl').count(), 0, 'and the editor keeps no timeline of its own');
  assert.deepEqual(serr, []);
  await sp.close();
}

// 18. No notes library (someone who never opened one: the host's vaultRoot() stays null). With nothing to reopen
// the launchpad shows at once rather than after the library wait; creating says why it cannot instead of the
// host's raw error; and the list still finishes loading while the host polls it (every 8 s, inside the 15 s wait).
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(() => {
    const none = async () => { throw new Error('No vault is open'); };
    Object.assign(HOST.ctx.app, { vaultRoot: () => null, listFiles: none, writeFile: none });
    return HOST.ctx.saveData({ ...HOST.data, last: null });
  });
  const t0 = Date.now();
  await sp.evaluate(r => { HOST.space(null, r); HOST.reg.lists.find(l => l.id === 'projects').subscribe(() => {}); }, RECIPE);
  await sp.waitForSelector('.fvs-launch', { timeout: 3000 }).catch(() => assert.fail('with nothing to reopen the launchpad does not wait for a library'));
  await sp.click('.fvs-nav [data-nav="create"]');
  await sp.click('.fvs-launch-create');
  await sp.waitForFunction(() => /笔记库还没打开/.test(document.querySelector('.fvs-launch-error:not([hidden])')?.textContent || ''), null, { timeout: 8000 });
  await sp.click('.fvs-nav [data-nav="projects"]');
  await sp.waitForSelector('.fvs-launch-empty', { timeout: 25000 }).catch(() => assert.fail('the list finishes loading while the host keeps polling it'));
  console.log(`no library: the empty list after ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  assert.deepEqual(serr, []);
  await sp.close();
}
// 19. On a host that can mount the native conversation in a plugin view (ctx.tangu.mountChat), the Director is a
// conversation on the Space's right side: it comes with the project, works in the project's folder, takes the idea
// from the create page once, takes the one-click tasks as text for the person to send, follows the project, and
// goes when the project closes. Nothing is sent for the person, and the Director panel is not used.
{
  const { sp, serr } = await spacePage({ chat: true });
  await sp.evaluate(() => HOST.ctx.saveData({ ...HOST.data, last: null }));
  await sp.evaluate(r => HOST.space(null, r), RECIPE);
  await sp.waitForSelector('.fvs-launch', { timeout: 10000 });
  assert.equal(await sp.evaluate(() => HOST.spaceState.rightView), null, 'no conversation while no project is open');
  await sp.click('.fvs-nav [data-nav="create"]');
  await sp.fill('.fvs-launch-name input', '对话测试');
  await sp.fill('.fvs-launch-idea', '一支 10 秒的开场');
  await sp.click('.fvs-launch-create');
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 10000 });
  await sp.waitForFunction(() => HOST.calls.chatPrefill.length === 1, null, { timeout: 5000 }).catch(() => assert.fail('the idea goes to the conversation'));
  assert.equal(await sp.evaluate(() => HOST.spaceState.rightView), 'chat', 'the conversation came to the right side');
  assert.deepEqual(await sp.evaluate(() => HOST.calls.mountChat), [{ agent: 'fvs-director', folder: 'Forsion Video Studio/对话测试', title: '对话测试' }], 'it works in the project folder, with the Director');
  assert.deepEqual(await sp.evaluate(() => HOST.calls.chatPrefill), ['一支 10 秒的开场']);
  assert.equal(await sp.locator('.host-right .host-chat').count(), 1);
  // the Director's command line is beside the project, where its skill looks (no hand-off message says where)
  await sp.waitForFunction(() => HOST.files.has('Forsion Video Studio/.fvs-tools/fvs.mjs'), null, { timeout: 5000 }).catch(() => assert.fail('the tools are in the vault for the conversation'));
  assert.equal(await sp.locator('.fvs-director-panel').count(), 0, 'no Director panel');
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 5000 }).catch(() => assert.fail('the properties still open with the project'));
  // the host remounts the editor around layout jumps: the idea was handed over once
  await sp.evaluate(() => HOST.spaceState.remount());
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-tl-empty');
  await sp.waitForTimeout(400);
  assert.deepEqual(await sp.evaluate(() => HOST.calls.chatPrefill), ['一支 10 秒的开场'], 'a remount does not hand the idea over again');
  assert.equal(await sp.evaluate(() => HOST.calls.mountChat.length), 1, 'the conversation stays mounted through it');
  // the AI button lists what the Director can be asked; its first entry brings the conversation forward, and the
  // properties keep the side's Extend View
  const reveals = () => sp.evaluate(() => HOST.spaceState.log.filter(x => x === 'right:chat:reveal').length);
  const ask = async item => { await sp.locator('.fvs-bar .fvs-ai-action').click(); await sp.getByRole('menuitem', { name: item }).click(); };
  const before = await reveals();
  await sp.locator('.fvs-bar .fvs-ai-action').click();
  assert.deepEqual((await sp.getByRole('menuitem').allTextContents()).map(x => x.trim()), ['打开对话', '写一个新场景', '节奏再紧一点', '润色全部文案', '为这个视频配乐', '检查并修正卡点', '看一遍成片提意见']);
  await sp.getByRole('menuitem', { name: '打开对话' }).click();
  assert.equal(await reveals(), before + 1, 'the AI button reveals the conversation');
  assert.equal(await sp.evaluate(() => HOST.spaceState.current()), 'fvs-properties');
  // "more" keeps the window and the project
  await sp.locator('.fvs-bar button[aria-label="更多"]').click();
  assert.ok(!(await sp.getByRole('menuitem').allTextContents()).some(x => /配乐|成片/.test(x)), 'the Director\'s tasks are not under "more"');
  await sp.keyboard.press('Escape');
  // a one-click task: its request waits in the input, in the person's words, and a notice says so
  const notices = await sp.evaluate(() => HOST.calls.notify.length);
  await ask('为这个视频配乐');
  assert.deepEqual(await sp.evaluate(() => HOST.calls.chatPrefill.slice(1)), ['为这个视频写一段原创配乐：重音落在各场景的拍点上，写完加进工程，再做一次卡点检查。']);
  assert.match(String(await sp.evaluate(n => HOST.calls.notify.slice(n).join('\n'), notices)), /已写进右侧对话/);
  // a start the person finishes
  await ask('写一个新场景');
  assert.equal(await sp.evaluate(() => HOST.calls.chatPrefill.at(-1)), '写一个新场景：');
  assert.equal(await sp.evaluate(() => HOST.calls.startChat.length), 0, 'nothing is sent for the person');
  // The person closed the conversation's tab, then asked for a task: the request waits for the view to come up (the
  // real host mounts it a moment after openView). If the project changes in that moment, the request was for the
  // other project: it does not land in this one's conversation.
  await sp.evaluate(() => { HOST.spaceState.closeRight(); HOST.spaceState.holdRight(); });
  assert.equal(await sp.evaluate(() => HOST.calls.chatDisposed), 1, 'closing the tab lets the conversation go');
  await ask('看一遍成片提意见');
  // another project, another folder: its own conversation
  await sp.evaluate(p => HOST.reg.lists.find(l => l.id === 'projects').open({ key: p }), FILE);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await sp.evaluate(() => HOST.spaceState.releaseRight());
  await sp.waitForFunction(() => HOST.calls.mountChat.length === 2, null, { timeout: 10000 }).catch(() => assert.fail('switching the project switches the conversation'));
  assert.equal((await sp.evaluate(() => HOST.calls.mountChat[1])).folder, DIR);
  assert.deepEqual(await sp.evaluate(() => HOST.calls.chatInto.map(x => x[0])), ['Forsion Video Studio/对话测试', 'Forsion Video Studio/对话测试', 'Forsion Video Studio/对话测试'], 'a request written for the other project is not handed to this one');
  assert.equal(await sp.locator('.host-right .host-chat').count(), 1);
  // …and one made here, while the view is still coming up, does arrive
  await sp.evaluate(() => { HOST.spaceState.closeRight(); HOST.spaceState.holdRight(); });
  await ask('看一遍成片提意见');
  await sp.evaluate(() => HOST.spaceState.releaseRight());
  await sp.waitForFunction(() => HOST.calls.mountChat.length === 3, null, { timeout: 5000 }).catch(() => assert.fail('the conversation came back'));
  assert.deepEqual(await sp.evaluate(d => HOST.calls.chatInto.filter(x => x[0] === d).map(x => x[1]), DIR), ['看一遍成片（抽帧看画面），给我一份具体的修改建议；我同意之前先不要改。'], 'a request waits for its own conversation');
  // closing the project takes the conversation with it
  await sp.locator('.fvs-bar button[aria-label="更多"]').click();
  await sp.getByRole('menuitem', { name: '关闭工程' }).click();
  await sp.waitForSelector('.fvs-launch', { timeout: 10000 });
  assert.equal(await sp.evaluate(() => HOST.spaceState.rightView), null, 'the conversation closed with the project');
  assert.equal(await sp.evaluate(() => HOST.calls.chatDisposed), 3);
  // a project file directly in the library root has no folder to work in: the Director panel, as before
  await sp.evaluate(t => { HOST.files.set('根目录.fvs.md', t); return HOST.ctx.saveData({ ...HOST.data, trusted: [...HOST.data.trusted, '根目录.fvs.md'] }); }, readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8'));
  await sp.evaluate(() => HOST.reg.lists.find(l => l.id === 'projects').open({ key: '根目录.fvs.md' }));
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 10000 });
  assert.equal(await sp.evaluate(() => HOST.spaceState.rightView), null, 'no conversation for a project without a folder');
  await sp.locator('.fvs-bar .fvs-ai-action').click();
  await sp.waitForSelector('.host-extend .fvs-director-panel', { timeout: 5000 }).catch(() => assert.fail('…it keeps the Director panel'));
  assert.equal(await sp.evaluate(() => HOST.calls.mountChat.length), 3);
  // The editor's tab closed (a Space where it is not pinned) is not a project closed from the menu, and it is not
  // the host rebuilding the editor either: after a moment the conversation of a project nobody has open is let go.
  await sp.evaluate(p => HOST.reg.lists.find(l => l.id === 'projects').open({ key: p }), FILE);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await ask('打开对话');
  await sp.waitForFunction(() => HOST.calls.mountChat.length === 4, null, { timeout: 10000 }).catch(() => assert.fail('the project is back with its conversation'));
  assert.equal(await sp.locator('.host-right .host-chat').count(), 1);
  const lettingGo = await sp.evaluate(() => HOST.calls.chatDisposed);
  await sp.evaluate(() => HOST.spaceState.closeMain());
  await sp.waitForTimeout(600);
  assert.equal(await sp.locator('.host-right .host-chat').count(), 1, 'it waits: the host may only be rebuilding the editor');
  await sp.waitForFunction(n => HOST.calls.chatDisposed === n + 1 && !document.querySelector('.host-right .host-chat'), lettingGo, { timeout: 5000 }).catch(() => assert.fail('an editor that does not come back takes its conversation with it'));
  assert.equal(await sp.locator('.host-right .fvs-chat-empty:not([hidden])').count(), 1, 'the view says to open a project');
  assert.deepEqual(serr, []);
  await sp.close();
}
// 20. Elements on the timeline. What a scene times declaratively (data-in, the items of a data-seq) sits in a lane
// under the scenes, on project time: it starts under the hit it enters on. A click selects one (the properties mark
// its row), a double-click goes to its "in" time, Delete leaves the scene alone. "Quote in chat" (the toolbar, a
// right-click) hands the conversation where the selection is in the file, in the file's own words: the scene's
// heading, the tag as written, its text; scenes, hits and captions quote the same way. A scene animated from its
// script has nothing in the lane, and the selection does not outlive an edit that moves the tags.
{
  const { sp, serr } = await spacePage({ chat: true });
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 10000 });
  const tl = sp.locator('.host-bottom .fvs-dock-timeline'), side = sp.locator('.host-extend');
  const text = () => sp.evaluate(p => HOST.text(p), FILE), original = await text();
  const quotes = () => sp.evaluate(() => HOST.calls.chatQuote.slice());
  const el = (scene, n) => tl.locator(`.fvs-el[data-scene="${scene}"]`).nth(n);
  // the rail names the lane, between the scenes and the score
  assert.deepEqual(await tl.locator('.fvs-track-rail > button, .fvs-rail-audio > button').evaluateAll(xs => xs.map(x => x.textContent.trim())), ['字幕', '场景', '元素', '配乐']);
  // zoom in around the scene so the blocks are wide enough to read
  await tl.locator('.fvs-clip[data-id="years"]').click({ position: { x: 6, y: 24 } });
  for (let i = 0; i < 4; i++) await sp.keyboard.press('=');
  await sp.waitForTimeout(100);
  // "years": four lines, each entering on its hit and staying to the end of the scene
  assert.equal(await tl.locator('.fvs-el[data-scene="years"]').count(), 4);
  assert.deepEqual(await tl.locator('.fvs-el[data-scene="years"]').evaluateAll(xs => xs.map(x => x.textContent)), ['多年来，', '我们一直在建造', '更好的 Agent。', 'FOR YEARS, WE HAVE BEEN BUILDING BETTER']);
  const geo = await sp.evaluate(() => {
    const clip = document.querySelector('.host-bottom .fvs-clip[data-id="years"]'), c = clip.getBoundingClientRect();
    const hits = [...clip.querySelectorAll('.fvs-hitm')].map(m => { const r = m.getBoundingClientRect(); return r.left + r.width / 2; });
    const els = [...document.querySelectorAll('.host-bottom .fvs-el[data-scene="years"]')].map(x => { const r = x.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, own: document.elementFromPoint(r.left + 3, r.top + 6) === x || x.contains(document.elementFromPoint(r.left + 3, r.top + 6)) }; });
    const lane = document.querySelector('.host-bottom .fvs-el-lane').getBoundingClientRect(), audio = document.querySelector('.host-bottom .fvs-lane').getBoundingClientRect();
    return { clip: { left: c.left, right: c.right, bottom: c.bottom }, hits, els, lane: { top: lane.top, bottom: lane.bottom }, audioTop: audio.top };
  });
  geo.els.forEach((e, i) => {
    assert.ok(Math.abs(e.left - geo.hits[i]) <= 1.5, `element ${i} starts under hit ${i}: ${e.left} vs ${geo.hits[i]}`);
    assert.ok(e.own, `element ${i} can be reached with the pointer`);
  });
  assert.equal(new Set(geo.els.slice(0, 3).map(e => Math.round(e.top))).size, 3, 'three on screen at once take three rows');
  geo.els.slice(1).forEach((e, i) => assert.ok(Math.abs(e.right - geo.clip.right) <= 3, `element ${i + 1} stays to the end of the scene: ${e.right} vs ${geo.clip.right}`));
  // the fourth takes the row of the first, which is drawn up to it: no block lies under another
  assert.equal(Math.round(geo.els[3].top), Math.round(geo.els[0].top));
  assert.ok(geo.els[0].right <= geo.els[3].left && geo.els[3].left - geo.els[0].right <= 2.5, `the first block ends where the fourth begins: ${geo.els[0].right} vs ${geo.els[3].left}`);
  assert.ok(geo.lane.top >= geo.clip.bottom && Math.abs(geo.lane.bottom - geo.audioTop) <= 1, `the lane sits between the scenes and the score: ${JSON.stringify(geo)}`);
  // "cards": a data-seq shows as its items, one hit each
  assert.deepEqual(await tl.locator('.fvs-el[data-scene="cards"]').evaluateAll(xs => xs.map(x => x.textContent)), ['人格', '记忆', 'SKILLS', '工具', 'HARNESS', '团队', 'PROJECTS', '更强的模型']);
  const seq = await sp.evaluate(() => {
    const hits = [...document.querySelectorAll('.host-bottom .fvs-clip[data-id="cards"] .fvs-hitm')].map(m => { const r = m.getBoundingClientRect(); return r.left + r.width / 2; });
    const els = [...document.querySelectorAll('.host-bottom .fvs-el[data-scene="cards"]')].map(x => { const r = x.getBoundingClientRect(); return [r.left, r.right, r.top]; });
    return { hits, els };
  });
  seq.els.slice(0, 7).forEach(([left, right], i) => assert.ok(Math.abs(left - seq.hits[i]) <= 1.5 && Math.abs(right - seq.hits[i + 1]) <= 2.5, `item ${i} runs from hit ${i} to hit ${i + 1}: ${left}–${right} vs ${seq.hits[i]}–${seq.hits[i + 1]}`));
  assert.equal(new Set(seq.els.map(e => Math.round(e[2]))).size, 1, 'one after another: a single row');
  // a scene driven by its script has nothing here
  assert.equal(await tl.locator('.fvs-el[data-scene="boot"]').count(), 0);
  // a click selects the element: its block, its scene, its row in the properties; the playhead goes inside it
  await el('years', 1).click({ position: { x: 4, y: 6 } });
  assert.deepEqual(await tl.locator('.fvs-el.on').evaluateAll(xs => xs.map(x => `${x.dataset.scene}:${x.dataset.tag}`)), ['years:2']);
  assert.ok(await tl.locator('.fvs-clip[data-id="years"]').evaluate(x => x.classList.contains('on')));
  await sp.waitForFunction(() => document.querySelector('.host-extend .fvs-timed.on .lbl')?.textContent === '我们一直在建造', null, { timeout: 3000 }).catch(() => assert.fail('the properties mark the element\'s row'));
  // (the playhead is drawn on the next frame)
  await sp.waitForFunction(() => { const h = document.querySelector('.host-bottom .fvs-tl-head').getBoundingClientRect().left, r = document.querySelector('.host-bottom .fvs-el.on').getBoundingClientRect(); return h > r.left && h < r.right; }, null, { timeout: 3000 }).catch(() => assert.fail('the playhead is inside the element'));
  assert.ok(await sp.evaluate(() => document.querySelector('.fvs-dock-timeline').contains(document.activeElement)), 'a click keeps the keyboard in the timeline');
  // Delete has nothing to delete: the scene stays
  assert.equal(await tl.locator('button[aria-label="删除场景"]').isDisabled(), true);
  await sp.keyboard.press('Delete');
  await sp.waitForTimeout(200);
  assert.equal(await tl.locator('.fvs-clip').count(), 20, 'Delete with an element selected leaves the scene');
  assert.equal(await sp.getAttribute('.fvs-status', 'data-state'), 'saved');
  // quote it: the toolbar button
  const reveals = () => sp.evaluate(() => HOST.spaceState.log.filter(x => x === 'right:chat:reveal').length);
  const shown = await reveals();
  await tl.locator('button[aria-label="引用到对话"]').click();
  assert.deepEqual(await quotes(), ['episode-2.12.fvs.md › ## years · 多年来 › 15.20–17.60s\n<span class="fk" style="left:112px;top:470px;font-size:130px" data-in="h1">\n我们一直在建造']);
  assert.equal(await reveals(), shown + 1, 'quoting brings the conversation forward');
  // …and a right-click, on an item of a sequence: the container, which child, its own tag, its text
  // (brought into view first: the timeline scrolling under an open menu closes it, as it should, and the scroll a
  // click starts would land after the menu opened)
  await el('cards', 2).scrollIntoViewIfNeeded();
  await sp.waitForTimeout(150);
  await el('cards', 2).click({ button: 'right', position: { x: 4, y: 6 } });
  assert.deepEqual(await tl.locator('.fvs-el.on').evaluateAll(xs => xs.map(x => `${x.dataset.scene}:${x.dataset.tag}`)), ['cards:7'], 'a right-click selects what it is on');
  await sp.getByRole('menuitem', { name: '引用到对话' }).click();
  assert.equal((await quotes())[1], 'episode-2.12.fvs.md › ## cards · 标题卡 › 9.60–10.40s\n<div data-seq="h0"> › 3/8 › <div class="fb-card solid">\nSKILLS');
  await sp.waitForFunction(() => /sequence|seq/.test(document.querySelector('.host-extend .fvs-timed.on .lbl')?.textContent || ''), null, { timeout: 3000 }).catch(() => assert.fail('an item marks its sequence\'s row'));
  // a hit, a scene
  await tl.locator('.fvs-clip[data-id="cards"] .fvs-hitm').nth(2).click({ button: 'right' });
  await sp.getByRole('menuitem', { name: '引用到对话' }).click();
  assert.equal((await quotes())[2], 'episode-2.12.fvs.md › ## cards · 标题卡 › h2 = 9.60s');
  await tl.locator('.fvs-clip[data-id="years"]').click({ button: 'right', position: { x: 30, y: 10 } });
  await sp.getByRole('menuitem', { name: '引用到对话' }).click();
  assert.equal((await quotes())[3], 'episode-2.12.fvs.md › ## years · 多年来 › 14.40–17.60s');
  assert.equal(await tl.locator('.fvs-el.on').count(), 0, 'selecting the scene lets the element go');
  // in a short window the properties have to scroll to show the element's row: that is not the timeline moving,
  // and the menu stays
  await sp.setViewportSize({ width: 1600, height: 560 });
  await sp.waitForTimeout(200);
  await sp.evaluate(() => { document.querySelector('.host-extend .fvs-panel').scrollTop = 0; });
  await el('twosides', 1).scrollIntoViewIfNeeded();
  await sp.waitForTimeout(150);
  const scrolledBefore = await sp.evaluate(() => document.querySelector('.host-extend .fvs-panel').scrollTop);
  await el('twosides', 1).click({ button: 'right', position: { x: 4, y: 6 } });
  await sp.waitForFunction(top => document.querySelector('.host-extend .fvs-panel').scrollTop > top, scrolledBefore, { timeout: 3000 }).catch(() => assert.fail('the properties scrolled to the element\'s row (else this case tests nothing)'));
  await sp.waitForTimeout(150);
  assert.equal(await sp.locator('.fvs-menu').count(), 1, 'the menu outlives a scroll in another panel');
  await sp.getByRole('menuitem', { name: '引用到对话' }).click();
  assert.equal((await quotes())[4], 'episode-2.12.fvs.md › ## twosides · 两面 › 26.20–27.20s\n<span class="fk" style="left:110px;top:520px;font-size:240px" data-in="h1">\n有两面。');
  await sp.setViewportSize({ width: 1600, height: 960 });
  await sp.waitForTimeout(200);
  // a caption: its time line as the file has it
  await tl.locator('button[aria-label="添加字幕"]').click();
  await sp.waitForFunction(p => /-->/.test(HOST.text(p)), FILE, { timeout: 4000 }).catch(() => assert.fail('a caption was added'));
  const cue = (await text()).match(/^(\d\d:\d\d:\d\d,\d{3} --> \d\d:\d\d:\d\d,\d{3})\n(.+)$/m);
  await sp.locator('.fvs-dock-timeline').focus();
  await tl.locator('.fvs-cap').first().click({ button: 'right' });
  await sp.getByRole('menuitem', { name: '引用到对话' }).click();
  assert.equal((await quotes())[5], `episode-2.12.fvs.md › srt › ${cue[1]}\n${cue[2]}`);
  // …also when the block is ```vtt and the time is written the WebVTT way: the agent searches for what is quoted
  {
    const held = await text(), vtt = held.replace('```srt', '```vtt').replace(cue[1], '00:01.000 --> 00:03.500');
    assert.notEqual(vtt, held);
    await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, vtt]);
    await sp.waitForFunction(() => { const c = document.querySelector('.host-bottom .fvs-cap'), s = document.querySelector('.host-bottom .fvs-clip'); return c && s && Math.abs(c.getBoundingClientRect().left - s.getBoundingClientRect().left) > 4; }, null, { timeout: 5000 }).catch(() => assert.fail('the caption moved to 1 s'));
    // (in view first: the caption is now at 1 s, and the scroll a click starts would land after the menu opened)
    await tl.locator('.fvs-cap').first().scrollIntoViewIfNeeded();
    await sp.waitForTimeout(150);
    await tl.locator('.fvs-cap').first().click({ button: 'right' });
    await sp.getByRole('menuitem', { name: '引用到对话' }).click();
    assert.equal((await quotes())[6], `episode-2.12.fvs.md › vtt › 00:01.000 --> 00:03.500\n${cue[2]}`);
    // an open menu whose block was redrawn away (an outside edit) does not hang on: the next scroll takes it
    await el('years', 1).scrollIntoViewIfNeeded();
    await sp.waitForTimeout(150);
    const block = await el('years', 1).elementHandle();
    await el('years', 1).click({ button: 'right', position: { x: 4, y: 6 } });
    assert.equal(await sp.locator('.fvs-menu').count(), 1);
    await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, vtt.replace('00:01.000 --> 00:03.500', '00:01.000 --> 00:03.000')]);
    await sp.waitForFunction(b => !b.isConnected, block, { timeout: 5000 }).catch(() => assert.fail('the timeline was redrawn by the outside edit'));
    assert.equal(await sp.locator('.fvs-menu').count(), 1, 'the redraw itself leaves the menu');
    await sp.evaluate(() => { document.querySelector('.host-extend .fvs-panel').scrollTop += 1; document.querySelector('.host-extend .fvs-panel').dispatchEvent(new Event('scroll')); });
    await sp.waitForFunction(() => !document.querySelector('.fvs-menu'), null, { timeout: 3000 }).catch(() => assert.fail('a menu whose anchor is gone closes on the next scroll, wherever it is'));
  }
  assert.equal(await sp.evaluate(() => HOST.calls.startChat.length), 0, 'nothing is sent for the person');
  // a double-click goes to the element's "in" time
  // (held for a moment, as a hand does: the timeline takes the keyboard back right after a press, see keepKeys)
  await el('years', 2).dblclick({ position: { x: 4, y: 6 }, delay: 40 });
  await sp.waitForFunction(() => document.activeElement?.dataset.key === 'tin:years:3', null, { timeout: 3000 }).catch(() => assert.fail('a double-click puts the caret in the element\'s "in" time'));
  await sp.waitForTimeout(200); // the host puts its own focus on the panel's first control a moment after it was asked for again
  assert.equal(await sp.evaluate(() => document.activeElement?.dataset.key), 'tin:years:3', 'and the caret stays there');
  // its own attribute keeps it selected, and the block follows: half a beat (0.2 s at 150 bpm) later
  const x0 = (await el('years', 2).boundingBox()).x, pps = await sp.evaluate(() => document.querySelector('.host-bottom .fvs-clip[data-id="years"]').getBoundingClientRect().width / 3.2);
  await sp.keyboard.type('h2+0.5');
  await sp.keyboard.press('Enter');
  await sp.waitForFunction(p => HOST.text(p).includes('data-in="h2+0.5"'), FILE, { timeout: 4000 }).catch(() => assert.fail('the "in" time was written'));
  assert.deepEqual(await tl.locator('.fvs-el.on').evaluateAll(xs => xs.map(x => `${x.dataset.scene}:${x.dataset.tag}`)), ['years:3'], 'an edit to its own attribute keeps the selection');
  assert.ok(Math.abs((await el('years', 2).boundingBox()).x - x0 - .2 * pps) <= 1.5, 'the block moved half a beat');
  // Edits from outside (the Director, a hand in the code) can put another element at the selected one's place.
  // The selection stays on the element, wherever it went…
  const selected = () => tl.locator('.fvs-el.on').evaluateAll(xs => xs.map(x => `${x.dataset.tag}:${x.textContent}`));
  // (the editor takes an outside edit a moment later: wait for the selection it should end up with)
  const outside = async (change, want, why) => {
    const held = await text(), next = change(held);
    assert.notEqual(next, held, `the edit this case makes (${why})`);
    await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, next]);
    await sp.waitForFunction(w => JSON.stringify([...document.querySelectorAll('.host-bottom .fvs-el.on')].map(x => `${x.dataset.tag}:${x.textContent}`)) === w, JSON.stringify(want), { timeout: 5000 })
      .catch(async () => assert.fail(`${why}: ${JSON.stringify(await selected())} instead of ${JSON.stringify(want)}`));
  };
  const A = '  <span class="fk" style="left:112px;top:470px;font-size:130px" data-in="h1">我们一直在建造</span>', B = '  <span class="fk" style="left:112px;top:640px;font-size:130px" data-in="h2+0.5">更好的 Agent。</span>';
  assert.deepEqual(await selected(), ['3:更好的 Agent。']);
  // …two lines of the same kind changing places
  await outside(x => x.replace(`${A}\n${B}`, `${B}\n${A}`), ['2:更好的 Agent。'], 'two same-named elements swapped: the selection goes with its element');
  // …a tag added above it
  await outside(x => x.replace('<span class="fk" style="left:110px;top:200px;font-size:210px" data-in="h0">', '<i></i><span class="fk" style="left:110px;top:200px;font-size:210px" data-in="h0">'), ['3:更好的 Agent。'], 'a tag added above: the selection goes with its element');
  // an element rewritten, tag and words, is not the one that was selected: nothing takes its place
  await outside(x => x.replace(A.trim(), '<span class="fk" data-in="h1">甲</span>').replace(B.trim(), '<span class="fk" data-in="h1">乙</span>'), [], 'the element was rewritten: nothing is selected in its place');
  // two that are written the same and differ only in their words: the words say which one it is
  await tl.locator('.fvs-el[data-scene="years"]', { hasText: '甲' }).click({ position: { x: 2, y: 6 } });
  assert.deepEqual(await selected(), ['4:甲']);
  await outside(x => x.replace('<span class="fk" data-in="h1">乙</span>\n  <span class="fk" data-in="h1">甲</span>', '<span class="fk" data-in="h1">甲</span>\n  <span class="fk" data-in="h1">乙</span>'), ['3:甲'], 'two elements written the same swapped: the selection goes with its words');
  assert.equal(await tl.locator('.fvs-el[data-scene="years"]').count(), 4);
  // rows: three lines hold the three rows to the end; a fourth takes the first one's row for a beat; a fifth, later,
  // finds that row free and takes it — it does not cut a second line short
  {
    const scene = original.match(/## years · 多年来[\s\S]*?```html\n([\s\S]*?)```/)[1];
    const packed = '<div>\n  <p data-in="h0">A</p><p data-in="h0">B</p><p data-in="h0">C</p>\n  <p data-in="h1" data-out="h2">D</p><p data-in="h3">E</p>\n</div>\n';
    await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, original.replace(scene, packed)]);
    await sp.waitForFunction(() => document.querySelectorAll('.host-bottom .fvs-el[data-scene="years"]').length === 5, null, { timeout: 5000 }).catch(() => assert.fail('the five lines are on the lane'));
    const rows = await sp.evaluate(() => {
      const end = document.querySelector('.host-bottom .fvs-clip[data-id="years"]').getBoundingClientRect().right;
      return Object.fromEntries([...document.querySelectorAll('.host-bottom .fvs-el[data-scene="years"]')].map(x => { const r = x.getBoundingClientRect(); return [x.textContent, { top: Math.round(r.top), toEnd: Math.abs(r.right - end) <= 3 }]; }));
    });
    assert.equal(new Set([rows.A.top, rows.B.top, rows.C.top]).size, 3);
    assert.deepEqual([rows.D.top, rows.E.top], [rows.A.top, rows.A.top], `D takes A's row, and E the same row once D is over: ${JSON.stringify(rows)}`);
    assert.deepEqual([rows.B.toEnd, rows.C.toEnd, rows.E.toEnd], [true, true, true], `nothing else is cut short: ${JSON.stringify(rows)}`);
  }
  // data-seq-end: the last item of a sequence ends there, not at the end of the scene (as the picture does)
  {
    const open = '<div data-seq="h0">\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:250px;font-size:340px">人格';
    assert.ok(original.includes(open));
    await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, original.replace(open, open.replace('data-seq="h0"', 'data-seq="h0" data-seq-end="h7+1"'))]);
    await sp.waitForFunction(p => HOST.text(p).includes('data-seq-end="h7+1"') && document.querySelectorAll('.host-bottom .fvs-el[data-scene="cards"]').length === 8, FILE, { timeout: 5000 }).catch(() => assert.fail('the sequence is back with its end'));
    const widths = await tl.locator('.fvs-el[data-scene="cards"]').evaluateAll(xs => xs.map(x => x.getBoundingClientRect().width));
    assert.ok(Math.abs(widths[7] - widths[0] / 2) <= 2, `the last item ends one beat after its hit, half of the two beats the others take: ${widths[7]} vs ${widths[0]}`);
  }
  // a project with no declarative timing: the lane says what would show up in it
  await sp.evaluate(([p, t]) => HOST.external(p, t), [FILE, original.replace(/ data-(in|seq)="/g, ' data-x-$1="')]);
  await sp.waitForFunction(() => !document.querySelector('.host-bottom .fvs-el'), null, { timeout: 5000 }).catch(() => assert.fail('no timed elements, no blocks'));
  assert.match(await tl.locator('.fvs-el-lane.empty').getAttribute('data-hint'), /出现时间/);
  // An import that is still writing when the host rebuilds the editor (a layout reset): the editor that was closed
  // must not come back and save its text over the project. The file itself is stored.
  {
    const WAV = (() => { const n = 2400, b = Buffer.alloc(44 + n * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40); return b; })();
    await sp.waitForFunction(() => document.querySelector('.fvs-status')?.dataset.state === 'saved', null, { timeout: 5000 });
    const held = await text();
    await sp.evaluate(() => {
      const app = HOST.ctx.app, write = app.writeBytes;
      window.__late = new Promise(go => { window.__lateGo = go; });
      app.writeBytes = async (p, b) => { if (!p.endsWith('/audio/late.wav')) return write(p, b); app.writeBytes = write; window.__lateAt = true; await window.__late; return write(p, b); };
    });
    await sp.setInputFiles('.host-bottom .fvs-tl-body > input[type="file"]', { name: 'late.wav', mimeType: 'audio/wav', buffer: WAV });
    await sp.waitForFunction(() => window.__lateAt === true, null, { timeout: 5000 }).catch(() => assert.fail('the import reached its write'));
    await sp.evaluate(() => HOST.spaceState.remount());
    await sp.waitForSelector('.host-bottom .fvs-clip', { timeout: 8000 });
    await sp.evaluate(() => window.__lateGo());
    await sp.waitForFunction(p => HOST.files.has(p), `${DIR}/audio/late.wav`, { timeout: 5000 }).catch(() => assert.fail('the file is stored'));
    await sp.waitForTimeout(1200); // past the save debounce of an editor that should not be saving
    assert.equal(await text(), held, 'an editor that was closed does not write the project');
    // …nor does its file land on one the new editor stored under the same name meanwhile: a file still being read
    // when the editor was rebuilt, and the same file name imported again in its successor
    await sp.evaluate(() => {
      const read = File.prototype.arrayBuffer;
      window.__slow = new Promise(go => { window.__slowGo = go; });
      File.prototype.arrayBuffer = async function () {
        if (this.name !== 'twice.wav' || window.__slowAt) return read.call(this);
        window.__slowAt = true; const bytes = await read.call(this); await window.__slow; return bytes;
      };
    });
    const later = Buffer.concat([WAV, Buffer.from([1, 2, 3, 4])]);
    await sp.setInputFiles('.host-bottom .fvs-tl-body > input[type="file"]', { name: 'twice.wav', mimeType: 'audio/wav', buffer: WAV });
    await sp.waitForFunction(() => window.__slowAt === true, null, { timeout: 5000 }).catch(() => assert.fail('the first import is reading its file'));
    await sp.evaluate(() => HOST.spaceState.remount());
    await sp.waitForSelector('.host-bottom .fvs-clip', { timeout: 8000 });
    await sp.setInputFiles('.host-bottom .fvs-tl-body > input[type="file"]', { name: 'twice.wav', mimeType: 'audio/wav', buffer: later });
    await sp.waitForFunction(p => HOST.files.has(p), `${DIR}/audio/twice.wav`, { timeout: 5000 }).catch(() => assert.fail('the new editor stored its file'));
    await sp.evaluate(() => window.__slowGo());
    await sp.waitForFunction(p => HOST.files.has(p), `${DIR}/audio/twice-2.wav`, { timeout: 5000 }).catch(() => assert.fail('the closed editor\'s file is stored under a name of its own'));
    assert.deepEqual(await sp.evaluate(d => [HOST.files.get(`${d}/audio/twice.wav`).length, HOST.files.get(`${d}/audio/twice-2.wav`).length], DIR), [later.length, WAV.length], 'the file the new editor stored is not written over');
  }
  assert.deepEqual(serr, []);
  await sp.close();
}
// …and without the conversation (an older host) the lane and the selection are there, the quote is not offered
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-el[data-scene="cards"]', { timeout: 10000 });
  assert.equal(await sp.locator('button[aria-label="引用到对话"]').count(), 0);
  await sp.locator('.host-bottom .fvs-el[data-scene="cards"]').first().click({ button: 'right', position: { x: 2, y: 6 } });
  await sp.waitForTimeout(150);
  assert.equal(await sp.locator('.fvs-menu').count(), 0, 'no menu with nothing to offer');
  assert.deepEqual(serr, []);
  await sp.close();
}
// …and on an older host (no replaceView), which never wakes the library for a plugin view: nothing to wait for, so
// a remembered project does not hold the launchpad back, and creating says why at once.
{
  const { sp, serr } = await spacePage(); // remembers the example as the last project
  await sp.evaluate(() => {
    const none = async () => { throw new Error('No vault is open'); };
    Object.assign(HOST.ctx.app, { vaultRoot: () => null, listFiles: none, writeFile: none, readFile: async () => null });
  });
  await sp.evaluate(r => HOST.space(null, r, { oldHost: true }), RECIPE);
  await sp.waitForSelector('.fvs-launch-empty', { timeout: 3000 }).catch(() => assert.fail('an older host: the launchpad and its list do not wait for a library that never comes'));
  await sp.click('.fvs-nav [data-nav="create"]');
  const t1 = Date.now();
  await sp.click('.fvs-launch-create');
  await sp.waitForFunction(() => /笔记库还没打开/.test(document.querySelector('.fvs-launch-error:not([hidden])')?.textContent || ''), null, { timeout: 2000 })
    .catch(() => assert.fail('an older host: creating says at once that no library is open'));
  assert.ok(Date.now() - t1 < 2000);
  assert.deepEqual(serr, []);
  await sp.close();
}
// 21. A host that says "layout" when it takes a panel away with its place (after 2.12.2), and keeps "dismiss" for the
// person closing that panel. A fold is then not the person turning the properties off, with the conversation in the
// side or without it; nothing of ours opens into a side that is folded or on its way out; when the side is back
// (its conversation mounts again) the properties are too.
{
  const { sp, serr } = await spacePage({ chat: true });
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 10000 });
  await sp.waitForFunction(() => HOST.spaceState.rightView === 'chat', null, { timeout: 5000 });
  const current = () => sp.evaluate(() => HOST.spaceState.current());
  const clip = n => sp.locator('.host-bottom .fvs-dock-timeline .fvs-clip').nth(n).click({ position: { x: 30, y: 12 } });
  const back = why => sp.waitForFunction(() => HOST.spaceState.current() === 'fvs-properties', null, { timeout: 5000 }).catch(() => assert.fail(why));
  // with the conversation: the click lands while the conversation is still on the page
  await sp.evaluate(() => HOST.spaceState.foldRight());
  await clip(1);
  await sp.waitForTimeout(600);
  assert.equal(await current(), null, 'a click opens nothing into a side that is folding');
  assert.equal(await sp.evaluate(() => HOST.spaceState.rightView), null);
  await sp.evaluate(() => HOST.spaceState.unfoldRight('chat'));
  await back('the properties come back with the side');
  // the person closed the conversation's tab: the properties are all the side holds, and the host's word is all
  // there is to tell a fold by
  await sp.evaluate(() => HOST.spaceState.closeRight());
  await sp.waitForTimeout(400);
  assert.equal(await current(), 'fvs-properties', 'closing the conversation leaves the properties');
  await sp.evaluate(() => HOST.spaceState.foldRight());
  await clip(2);
  await sp.waitForTimeout(600);
  assert.equal(await current(), null, 'folded with nothing else in it: a click still opens nothing');
  await sp.evaluate(() => HOST.spaceState.unfoldRight('chat')); // the host puts the side's default back
  await back('a fold the host told us about is not the person turning the properties off');
  // the export panel in the side when it folds: the properties do not take its place in a folded side
  await sp.evaluate(() => HOST.spaceState.closeRight());
  await sp.getByRole('button', { name: '导出', exact: true }).click();
  await sp.getByRole('menuitem', { name: /导出 MP4/ }).click();
  await sp.waitForFunction(() => HOST.spaceState.current() === 'fvs-export', null, { timeout: 5000 }).catch(() => assert.fail('the export panel opened'));
  await sp.evaluate(() => HOST.spaceState.foldRight());
  await sp.waitForTimeout(600);
  assert.equal(await current(), null, 'a fold that takes the export panel does not bring the properties into the folded side');
  // the properties button always opens them
  await sp.getByRole('button', { name: '属性面板', exact: true }).click();
  await back('the properties button opens a folded side');
  assert.deepEqual(serr, []);
  await sp.close();
}

// 22. Managing projects (0.10.0). The create page takes another folder of the library and offers it again. The
// launchpad's rows, the host's workspace list (itemMenu) and the in-project picker offer the same actions: a rename
// changes the title, through the open editor when there is one (its unsaved work stays); deleting moves the
// project's own folder to the recycle bin, or only its file when the folder holds other things; the open project
// closes first, and an editor that is still up writes nothing back. A host without ctx.app.trash offers no delete.
{
  const { sp, serr } = await spacePage();
  await sp.evaluate(() => HOST.ctx.saveData({ ...HOST.data, last: null }));
  await sp.evaluate(r => HOST.space(null, r), RECIPE);
  await sp.waitForSelector(`.fvs-launch-row[data-project-path="${FILE}"]`, { timeout: 10000 });
  const source = 'HOST.reg.lists.find(l => l.id === "projects")';
  const hostMenu = path => sp.evaluate(([src, k]) => (0, eval)(src).itemMenu({ key: k, title: '' }).map(a => [a.id, a.label, !!a.danger]), [source, path]);
  const run = (path, id) => sp.evaluate(([src, k, i]) => { (0, eval)(src).itemMenu({ key: k, title: '' }).find(a => a.id === i).run(); }, [source, path, id]);
  const rowMenu = async path => {
    await sp.hover(`.fvs-launch-row[data-project-path="${path}"]`);
    await sp.click(`.fvs-launch-row[data-project-path="${path}"] .fvs-launch-more`);
    return (await sp.getByRole('menuitem').allTextContents()).map(x => x.trim());
  };
  const has = path => sp.evaluate(k => HOST.files.has(k), path);

  // the create page: a path on the computer is refused before anything is written; a folder of the library is taken
  await sp.click('.fvs-nav [data-nav="create"]');
  await sp.waitForSelector('.fvs-launch-card');
  assert.equal(await sp.getAttribute('.fvs-launch-folder input', 'placeholder'), 'Forsion Video Studio', 'left empty, the work folder');
  await sp.fill('.fvs-launch-name input', '片头');
  await sp.fill('.fvs-launch-folder input', '/Users/me/Movies');
  assert.match(await sp.locator('.fvs-launch-note').first().innerText(), /笔记库里的文件夹/);
  const size0 = await sp.evaluate(() => HOST.files.size);
  await sp.click('.fvs-launch-create');
  await sp.waitForSelector('.fvs-launch-error:not([hidden])');
  assert.equal(await sp.getAttribute('.fvs-launch-folder input', 'aria-invalid'), 'true');
  assert.equal(await sp.evaluate(() => HOST.files.size), size0, 'nothing written');
  await sp.fill('.fvs-launch-folder input', '视频\\2026/');
  assert.equal(await sp.locator('.fvs-launch-error').isVisible(), false, 'typing clears the error');
  assert.match(await sp.locator('.fvs-launch-note').first().innerText(), /视频\/2026\/片头\//, 'the page says where it goes');
  await shot(sp, '25-create-folder');
  await sp.click('.fvs-launch-create');
  const made = '视频/2026/片头/片头.fvs.md';
  await sp.waitForSelector('.host-left .fvs-bin', { timeout: 10000 });
  assert.ok(await has(made), 'the project is in the folder that was typed');
  assert.equal(await sp.evaluate(() => HOST.data.folder), '视频/2026', 'and the folder is remembered');
  assert.equal(await sp.evaluate(() => HOST.data.last), made, 'remembering the folder did not lose the project to reopen');

  // the host's workspace list: a menu per row
  assert.deepEqual(await hostMenu(made), [['rename', '重命名…', false], ['reveal', '在文件夹中显示', false], ['delete', '删除', true]]);
  // rename the open project while it has unsaved work: the editor makes the change, and both reach the file
  await sp.waitForSelector('.fvs-studio .fvs-blank:not([hidden])');
  await sp.click('.fvs-studio .fvs-blank [data-blank="scene"]');
  await sp.locator('.fvs-template').first().click();
  await sp.evaluate(() => HOST.answers.push('  片头 v2 '));
  await run(made, 'rename');
  await sp.waitForFunction(k => /"title": "片头 v2"/.test(HOST.text(k)) && /^## /m.test(HOST.text(k)), made, { timeout: 4000 })
    .catch(async () => assert.fail(`a rename and the unsaved scene both reach the file: ${(await sp.evaluate(k => HOST.text(k), made)).slice(0, 400)}`));
  await sp.waitForTimeout(900); // (a later save of the editor must not put the old title back)
  assert.match(await sp.evaluate(k => HOST.text(k), made), /"title": "片头 v2"/);
  assert.equal(await sp.textContent('.fvs-studio .fvs-project-name'), '片头 v2', 'the open editor shows the new name');
  assert.deepEqual(await sp.evaluate(() => HOST.calls.prompt.at(-1)), { title: '工程名称', initial: '片头' });
  assert.equal(await sp.evaluate(([src, k]) => (0, eval)(src).items({}).find(r => r.key === k).title, [source, made]), '片头 v2', 'the list has the new name at once');
  // the picker inside a project: the same menu on a right-click
  await sp.click('.fvs-studio .fvs-project');
  await sp.waitForSelector(`.fvs-library .fvs-project-item[data-project-path="${FILE}"]`);
  await sp.click(`.fvs-library .fvs-project-item[data-project-path="${FILE}"]`, { button: 'right' });
  assert.deepEqual((await sp.getByRole('menuitem').allTextContents()).map(x => x.trim()), ['重命名…', '在文件夹中显示', '删除']);
  await sp.keyboard.press('Escape');
  // and on the row's own "⋯": a menu that is only behind a right click is not found
  await sp.hover(`.fvs-library .fvs-project-item[data-project-path="${FILE}"]`);
  await sp.click(`.fvs-library .fvs-project-row:has([data-project-path="${FILE}"]) .fvs-launch-more`);
  assert.deepEqual((await sp.getByRole('menuitem').allTextContents()).map(x => x.trim()), ['重命名…', '在文件夹中显示', '删除'], 'the picker\'s "⋯" opens the same menu');
  await sp.keyboard.press('Escape');
  assert.equal(await sp.textContent('.fvs-studio .fvs-project-name'), '片头 v2', 'the "⋯" opened the menu, not the project its row is for');
  // delete the open project: it closes, its own folder goes (media and all), nothing writes it back
  await sp.evaluate(k => HOST.files.set(k.replace(/[^/]+$/, 'media/shot.png'), new Uint8Array([1])), made);
  await run(made, 'delete');
  await sp.waitForSelector('.host-left .fvs-nav', { timeout: 5000 }).catch(() => assert.fail('deleting the open project goes back to the launchpad'));
  assert.deepEqual(await sp.evaluate(() => HOST.calls.trash), ['视频/2026/片头'], 'its own folder goes to the recycle bin');
  await sp.waitForTimeout(900);
  assert.deepEqual(await sp.evaluate(() => [...HOST.files.keys()].filter(k => k.startsWith('视频/'))), [], 'and nothing writes it back');
  assert.equal(await sp.locator(`.fvs-launch-row[data-project-path="${made}"]`).count(), 0, 'the list forgets it at once');
  assert.equal(await sp.evaluate(() => HOST.data.last), null);
  assert.equal(await sp.evaluate(() => HOST.spaceState.docked), null, 'its timeline closed with it');

  // a project that shares its folder (made from the notes tree, beside other files): only its file goes
  await sp.evaluate(([from]) => { HOST.files.set('资料/计划.fvs.md', HOST.text(from)); HOST.files.set('资料/会议记录.md', '# notes'); }, [FILE]);
  await sp.click('.fvs-launch-toolbar .fvs-btn');
  await sp.waitForSelector('.fvs-launch-row[data-project-path="资料/计划.fvs.md"]', { timeout: 5000 });
  assert.deepEqual(await rowMenu('资料/计划.fvs.md'), ['重命名…', '在文件夹中显示', '删除']);
  await shot(sp, '26-row-menu');
  const notices = await sp.evaluate(() => HOST.calls.notify.length);
  await sp.getByRole('menuitem', { name: '删除' }).click();
  await sp.waitForSelector('.fvs-launch-row[data-project-path="资料/计划.fvs.md"]', { state: 'detached', timeout: 4000 });
  assert.equal(await sp.evaluate(() => HOST.calls.trash.at(-1)), '资料/计划.fvs.md', 'only the project file');
  assert.ok(await has('资料/会议记录.md'), 'the other file of that folder stays');
  assert.match(String(await sp.evaluate(n => HOST.calls.notify.slice(n).join('\n'), notices)), /只把「.*」的工程文件移到了回收站/);

  // What counts as the project's own: its media folders and what it wrote beside itself (the web export, a render,
  // exported captions). A note or a second project whose name merely starts with its name does not (review, 10-05).
  await sp.evaluate(([from]) => {
    const set = (k, v) => HOST.files.set(k, v);
    set('甲/甲.fvs.md', HOST.text(from)); set('甲/甲.html', '<html>'); set('甲/甲-1696500000000.mp4', new Uint8Array([1])); set('甲/甲-2.srt', '1'); set('甲/media/a.png', new Uint8Array([1]));
    set('乙/乙.fvs.md', HOST.text(from)); set('乙/乙2.fvs.md', HOST.text(from));
    set('丙/丙.fvs.md', HOST.text(from)); set('丙/丙-备忘.md', '# memo');
  }, [FILE]);
  await sp.click('.fvs-launch-toolbar .fvs-btn');
  const remove = async (key, went, why) => {
    await sp.waitForSelector(`.fvs-launch-row[data-project-path="${key}"]`, { timeout: 5000 });
    await rowMenu(key);
    await sp.getByRole('menuitem', { name: '删除' }).click();
    await sp.waitForSelector(`.fvs-launch-row[data-project-path="${key}"]`, { state: 'detached', timeout: 4000 });
    assert.equal(await sp.evaluate(() => HOST.calls.trash.at(-1)), went, why);
  };
  await remove('甲/甲.fvs.md', '甲', 'a folder with only the project, its media and its own exports goes whole');
  await remove('乙/乙.fvs.md', '乙/乙.fvs.md', 'another project in the folder: only this project\'s file goes');
  assert.ok(await has('乙/乙2.fvs.md'), 'the other project stays');
  await remove('丙/丙.fvs.md', '丙/丙.fvs.md', 'a note that starts with the project\'s name is not its export');
  assert.ok(await has('丙/丙-备忘.md'), 'the note stays');
  await remove('乙/乙2.fvs.md', '乙', 'alone in its folder now, the second project takes the folder');

  // a closed project: the rename is written to its file; the row shows it; the file manager is asked for the file
  await sp.evaluate(() => HOST.answers.push('第 2.12 话（改）'));
  assert.deepEqual(await rowMenu(FILE), ['重命名…', '在文件夹中显示', '删除']);
  await sp.getByRole('menuitem', { name: '重命名…' }).click();
  await sp.waitForFunction(k => /"title": "第 2\.12 话（改）"/.test(HOST.text(k)), FILE, { timeout: 4000 }).catch(() => assert.fail('a closed project is renamed in its file'));
  await sp.waitForFunction(k => document.querySelector(`.fvs-launch-row[data-project-path="${k}"] strong`)?.textContent === '第 2.12 话（改）', FILE, { timeout: 4000 });
  await rowMenu(FILE);
  await sp.getByRole('menuitem', { name: '在文件夹中显示' }).click();
  assert.equal(await sp.evaluate(() => HOST.calls.reveal.at(-1)), FILE);
  // the example's own folder (assets and audio only) goes whole
  await rowMenu(FILE);
  await sp.getByRole('menuitem', { name: '删除' }).click();
  await sp.waitForSelector('.fvs-launch-empty', { timeout: 4000 }).catch(() => assert.fail('the last project gone, the list is empty'));
  assert.equal(await sp.evaluate(() => HOST.calls.trash.at(-1)), DIR);
  assert.deepEqual(serr, []);
  await sp.close();
}
// 22b. An editor that is not the Space's (a file tab of the notes) is still up after its project went to the recycle
// bin: it writes nothing back. And a host without ctx.app.trash (2.12.2 and before) shows no "Delete" anywhere.
{
  const { sp, serr } = await spacePage();
  const source = 'HOST.reg.lists.find(l => l.id === "projects")';
  await sp.evaluate(p => HOST.open(p), FILE);
  await sp.waitForSelector('.fvs-studio .fvs-clip[data-id="cards"]', { timeout: 10000 });
  const scenes = () => sp.evaluate(k => (HOST.text(k).match(/^## /gm) || []).length, FILE);
  const addScene = async () => { await sp.click('.fvs-studio .fvs-tl-add'); await sp.locator('.fvs-template').first().click(); };

  // The editor reads the disk on a timer (the host does not report outside changes of a .md file). A read that was
  // under way while the editor itself saved is older than what the editor holds: it must not put that text back.
  const n0 = await scenes(), clips0 = await sp.locator('.fvs-studio .fvs-clip').count();
  await sp.evaluate(k => new Promise(taken => { HOST.test.holdRead = { path: k, taken, until: new Promise(go => { HOST.test.letGo = go; }) }; }), FILE); // (resolves when the timer's read has taken the old text)
  await addScene();
  await sp.waitForFunction(([k, n]) => (HOST.text(k).match(/^## /gm) || []).length === n + 1, [FILE, n0], { timeout: 5000 }).catch(() => assert.fail('the new scene is saved'));
  await sp.evaluate(() => HOST.test.letGo());
  await sp.waitForTimeout(500);
  assert.equal(await sp.locator('.fvs-studio .fvs-clip').count(), clips0 + 1, 'a read older than the editor\'s own save does not take the scene back out of the editor');
  await addScene();
  await sp.waitForFunction(([k, n]) => (HOST.text(k).match(/^## /gm) || []).length === n + 2, [FILE, n0], { timeout: 5000 }).catch(() => assert.fail('the next save keeps both scenes: nothing older went over the file'));

  // a delete that does not happen (the recycle bin refused) gives the editor its pen back
  const del = () => sp.evaluate(([src, k]) => { (0, eval)(src).itemMenu({ key: k, title: '' }).find(a => a.id === 'delete').run(); }, [source, FILE]);
  await sp.evaluate(() => { HOST.test.trashFails = true; });
  const warned = await sp.evaluate(() => HOST.calls.notify.length);
  await del();
  await sp.waitForFunction(n => HOST.calls.notify.length > n, warned, { timeout: 4000 }).catch(() => assert.fail('a failed delete is reported'));
  assert.ok(await sp.evaluate(k => HOST.files.has(k), FILE), 'the project is still there');
  await sp.evaluate(() => { HOST.test.trashFails = false; });
  await addScene();
  await sp.waitForFunction(([k, n]) => (HOST.text(k).match(/^## /gm) || []).length === n + 3, [FILE, n0], { timeout: 5000 }).catch(() => assert.fail('after a delete that failed the editor saves again'));

  await del();
  await sp.waitForFunction(k => !HOST.files.has(k), FILE, { timeout: 4000 }).catch(() => assert.fail('the project went to the recycle bin'));
  await sp.click('.fvs-studio .fvs-tl-add');
  await sp.locator('.fvs-template').first().click();
  await sp.waitForTimeout(1200);
  assert.equal(await sp.evaluate(k => HOST.files.has(k), FILE), false, 'an editor still open on a deleted project writes nothing back');
  assert.deepEqual(serr, []);
  await sp.close();
}
{
  const sp = await browser.newPage({ viewport: { width: 1600, height: 960 } });
  await sp.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await sp.route(`${ORIGIN}/**`, async r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/host.html' || u.pathname === '/host.js') return r.fulfill({ path: join(here, 'host', u.pathname.slice(1)) });
    if (u.pathname.startsWith('/vault/')) return serveVault(sp, r, decodeURIComponent(u.pathname.slice(7)));
    return r.fulfill({ status: 404 });
  });
  await sp.goto(`${ORIGIN}/host.html`);
  await sp.evaluate(([p, t]) => { HOST.files.set(p, t); HOST.ctx.saveData({ trusted: [p], last: null }); delete HOST.ctx.app.trash; }, [FILE, readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8')]);
  for (const f of readdirSync(join(EX, 'assets'))) await sp.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [`${DIR}/assets/${f}`, Array.from(readFileSync(join(EX, 'assets', f)))]);
  await sp.evaluate(src => HOST.load(src), readFileSync(MAIN, 'utf8'));
  await sp.evaluate(r => HOST.space(null, r), RECIPE);
  await sp.waitForSelector(`.fvs-launch-row[data-project-path="${FILE}"]`, { timeout: 10000 });
  await sp.hover(`.fvs-launch-row[data-project-path="${FILE}"]`);
  await sp.click(`.fvs-launch-row[data-project-path="${FILE}"] .fvs-launch-more`);
  assert.deepEqual((await sp.getByRole('menuitem').allTextContents()).map(x => x.trim()), ['重命名…', '在文件夹中显示'], 'no "Delete" on a host that cannot do it');
  await sp.keyboard.press('Escape');
  assert.deepEqual(await sp.evaluate(() => HOST.reg.lists.find(l => l.id === 'projects').itemMenu({ key: 'x.fvs.md', title: '' }).map(a => a.id)), ['rename', 'reveal']);
  await sp.click(`.fvs-launch-row[data-project-path="${FILE}"]`);
  await sp.waitForSelector('.host-left .fvs-bin .fvs-bin-item', { timeout: 10000 });
  await sp.locator('.host-left .fvs-bin .fvs-bin-item').first().click({ button: 'right' });
  assert.ok(!(await sp.getByRole('menuitem').allTextContents()).some(x => /删除/.test(x)), 'nor in the bin');
  await sp.close();
}

assert.deepEqual(errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e)), []);
console.log('studio e2e ok');
await browser.close();
