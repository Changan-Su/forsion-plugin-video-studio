// End-to-end test of the Studio in Chromium against the mock host (test/host): open the bundled example,
// edit text in the picture, drag a cut, undo, export HTML, hand off to the agent, reload an external edit.
//   NODE_PATH=$(npm root -g) node test/studio.e2e.mjs [--shots dir]
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { checkWorkspace } from './workspace.mjs';
import { serveVault } from './vault-route.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
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
await page.evaluate(src => HOST.load(src), readFileSync(join(root, 'main.js'), 'utf8'));
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
assert.equal(await page.locator('.fvs-clip').count(), 3);
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
async function spacePage() {
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
  await sp.evaluate(src => HOST.load(src), readFileSync(join(root, 'main.js'), 'utf8'));
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
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip');
  await sp.waitForSelector('.host-extend .fvs-director-panel textarea', { timeout: 5000 });
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
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip');
  await sp.waitForTimeout(400);
  assert.ok(!/新品预告/.test(await sp.locator(director).inputValue().catch(() => '')), 'a sent idea does not come back');
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

assert.deepEqual(errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e)), []);
console.log('studio e2e ok');
await browser.close();
