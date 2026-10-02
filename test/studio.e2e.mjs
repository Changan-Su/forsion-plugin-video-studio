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
assert.match(await page.evaluate(() => HOST.calls.openFile.at(-1)), /新视频(?: \d+)?\.fvs\.md$/);
const chromeText = await page.locator('.fvs-bar').innerText();
assert.doesNotMatch(chromeText.replace(/新视频(?: \d+)?/g, ''), /[\u4e00-\u9fff]/);
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
  assert.equal(recipe.main[0].params.timeline, 'bottom');
  assert.deepEqual(recipe.bottom.map(v => v.type), ['plugin:forsion-video-studio:timeline']);
  const { sp, serr } = await spacePage();
  await sp.evaluate(([p, r]) => HOST.space(p, r), [FILE, recipe]);
  await sp.waitForSelector('.host-bottom .fvs-dock-timeline .fvs-clip[data-id="cards"]', { timeout: 10000 });
  await sp.waitForSelector('.host-extend .fvs-native-properties', { timeout: 10000 });
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
  // another project: the panel gets the new editor's timeline, not two
  const other = `${DIR}/second.fvs.md`;
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

assert.deepEqual(errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e)), []);
console.log('studio e2e ok');
await browser.close();
