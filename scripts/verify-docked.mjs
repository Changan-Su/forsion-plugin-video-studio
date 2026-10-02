// Real Electron, isolated: the Video Studio Space jumps between its launch layout and its project layout (as
// Coding Studio does), and the timeline docks in the native bottom panel.
// Launches the desktop's built out/ through its uiux-electron harness (stub engine, throwaway home, user data and
// vault — nothing of yours is read, touched or killed), seeds this bundle into <home>/plugins and checks:
//   launch layout (navigation, launchpad, no timeline) → a project made on the create page (its folder, its frame,
//   the idea waiting in the Director) → the project layout (media bin, docked timeline) → closing it → the person's
//   ⌘J surviving a project switch → the bin (double-click, drag to a cut) → keys, zoom, ⌘J repaint → a reload.
// Needs a host with ctx.viewLocations and ctx.replaceView: point FVS_DESKTOP_ROOT at that checkout's desktop/ and
// run `npx electron-vite build` there first. No model calls.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const H = createRequire(import.meta.url)(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const shots = join(repo, 'artifacts/docked'); mkdirSync(shots, { recursive: true });
const skip = new Set(['.git', 'node_modules', 'artifacts']);
const errors = [];
const find = (dir, name) => { for (const e of readdirSync(dir)) { const p = join(dir, e); if (e === name) return p; if (statSync(p).isDirectory()) { const q = find(p, name); if (q) return q; } } return null; };

const { app, win, home, close } = await H.launch({ tag: 'fvs-docked' });
win.on('pageerror', e => errors.push(String(e)));
const logs = []; win.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type()}: ${m.text()}`); });
// mean brightness (0–255) of the middle of the stage, from a real window capture: the DOM can't tell a painted
// scene from a black frame
const stageLuma = async () => {
  const r = await win.evaluate(() => { const b = document.querySelector('.fvs-view').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
  return app.evaluate(async ({ BrowserWindow }, r) => {
    const img = await BrowserWindow.getAllWindows()[0].capturePage({ x: Math.round(r.x + r.w * .2), y: Math.round(r.y + r.h * .2), width: Math.round(r.w * .6), height: Math.round(r.h * .6) });
    const px = img.toBitmap(); let sum = 0;
    for (let i = 0; i < px.length; i += 4) sum += px[i] + px[i + 1] + px[i + 2];
    return sum / (px.length / 4) / 3;
  }, r);
};
const settle = () => win.waitForSelector('#tangu-splash', { state: 'detached', timeout: 15000 }).catch(() => {});
const bottomOn = () => win.locator('.dv-edge-bottom.is-on').count();
// The host remounts the editor once after a layout jump (until fix/bottom-toggle-park-group lands): a key pressed
// before that lands is lost. Steady = the same editor element for half a second.
const steady = () => win.evaluate(() => new Promise(done => {
  let el = null, quiet = 0, n = 0;
  const tick = () => { const now = document.querySelector('.fvs-studio'); quiet = now && now === el ? quiet + 1 : 0; el = now; if (quiet >= 5 || ++n > 80) done(); else setTimeout(tick, 100); };
  tick();
}));
const launchLayout = async when => {
  await win.waitForSelector('.fvs-nav', { timeout: 10000 });
  await win.waitForSelector('.fvs-launch', { timeout: 10000 });
  await win.waitForFunction(() => !document.querySelector('.dv-edge-bottom.is-on'), null, { timeout: 5000 })
    .catch(() => assert.fail(`${when}: no timeline at the bottom`));
  assert.equal(await win.locator('.fvs-bin').count(), 0, `${when}: no media bin`);
};
const projectLayout = async when => {
  await win.waitForSelector('.fvs-bin', { timeout: 15000 }).catch(() => assert.fail(`${when}: the media bin on the left`));
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip', { timeout: 30000 });
  assert.equal(await win.locator('.fvs-nav').count(), 0, `${when}: the navigation gave way`);
  assert.equal(await win.locator('.fvs-studio .fvs-tl').count(), 0, `${when}: the editor keeps no timeline of its own`);
};
const more = async item => { await win.locator('.fvs-bar button[aria-label="更多"]').click(); await win.getByRole('menuitem', { name: item }).click(); };
try {
  cpSync(repo, join(home, 'plugins/forsion-video-studio'), { recursive: true, filter: p => !skip.has(basename(p)) });
  await H.boot(app, win, { space: 'forsion-video-studio' }); // boot reloads, which picks up the seeded plugin
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');

  // 1. launch layout: navigation, the project list, nothing at the bottom
  await launchLayout('first open');
  await settle(); await win.waitForTimeout(500);
  await H.captureWindow(app, join(shots, '00-launch.png'));

  // 2. the create page: a portrait project with an idea → its own folder, the project layout, the idea in the Director
  await win.locator('.fvs-nav [data-nav="create"]').click();
  await win.waitForSelector('.fvs-launch-card');
  await win.locator('.fvs-launch-name input').fill('宣传片');
  await win.locator('.fvs-launch-aspect', { hasText: '竖屏' }).click();
  await win.locator('.fvs-launch-idea').fill('一支 15 秒的新品预告');
  await win.waitForTimeout(300);
  await H.captureWindow(app, join(shots, '01-create.png'));
  await win.locator('.fvs-launch-create').click();
  await projectLayout('a new project');
  const made = find(join(home, 'vault'), '宣传片.fvs.md');
  assert.ok(made && basename(dirname(made)) === '宣传片', `the project has its own folder (${made})`);
  const madeText = readFileSync(made, 'utf8');
  assert.match(madeText, /"width": 1080/); assert.match(madeText, /"height": 1920/);
  assert.equal(await bottomOn(), 1, 'the timeline came to the bottom');
  // the host remounts the studio when the bottom panel first appears: the idea has to survive that
  await win.waitForFunction(() => /15 秒的新品预告/.test(document.querySelector('.fvs-director-panel')?.innerText + (document.querySelector('.fvs-director-panel textarea, .fvs-director-panel [contenteditable]')?.value || document.querySelector('.fvs-director-panel [contenteditable]')?.textContent || '')), null, { timeout: 10000 })
    .catch(() => assert.fail('the Director holds the idea'));
  await settle(); await win.waitForTimeout(800);
  await H.captureWindow(app, join(shots, '02-created.png'));

  // 3. closing the project jumps back
  await more('关闭工程');
  await launchLayout('closed');
  await win.waitForTimeout(400);
  await H.captureWindow(app, join(shots, '03-closed.png'));

  // 4. the person's ⌘J wins over a project switch: open the bottom in the launch layout, open a project, collapse
  //    it, switch projects from the title — it stays collapsed
  await win.locator('.fvs-launch-search input').click();
  await win.keyboard.press('Meta+j');
  await win.waitForFunction(() => !!document.querySelector('.dv-edge-bottom.is-on'), null, { timeout: 5000 });
  await win.locator('.fvs-nav [data-nav="example"]').click();
  const clip = '.fvs-dock-timeline .fvs-clip[data-id="cards"]';
  await win.waitForSelector(clip, { timeout: 30000 });
  await projectLayout('the example');
  await steady();
  await win.locator('.fvs-view').click({ position: { x: 20, y: 20 } });
  await win.keyboard.press('Meta+j');
  await win.waitForSelector('.fvs-dock-strip', { state: 'visible', timeout: 5000 });
  await win.locator('.fvs-project').click();
  await win.locator('.fvs-project-item', { hasText: '宣传片' }).first().click({ timeout: 10000 });
  await win.waitForFunction(() => document.querySelector('.fvs-project-name')?.textContent === '宣传片', null, { timeout: 10000 });
  await win.waitForTimeout(600);
  assert.equal(await bottomOn(), 0, 'a project switch keeps the bottom panel collapsed');
  assert.equal(await win.locator('.fvs-dock-strip').isVisible(), true);
  await win.locator('.fvs-project').click();
  await win.locator('.fvs-project-item', { hasText: '第 2.12 话' }).first().click({ timeout: 10000 });
  await win.getByRole('button', { name: '显示时间线', exact: true }).click();
  await win.waitForSelector(clip, { timeout: 10000 });
  await steady();

  // 5. the media bin: the example's pictures with thumbnails; a double-click adds one after the scene at the
  //    playhead, a drag drops one at a cut
  await win.waitForFunction(() => document.querySelectorAll('.fvs-bin-item').length >= 3, null, { timeout: 15000 });
  await win.waitForFunction(() => [...document.querySelectorAll('.fvs-bin-thumb img')].length >= 3 && [...document.querySelectorAll('.fvs-bin-thumb img')].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 10000 })
    .catch(() => assert.fail('the bin shows picture thumbnails (amadeus-asset: in img-src)'));
  const order = () => win.$$eval('.fvs-dock-timeline .fvs-clip', els => els.sort((a, b) => a.offsetLeft - b.offsetLeft).map(e => e.dataset.id));
  await win.locator(clip).click({ position: { x: 14, y: 24 } });
  await win.locator('.fvs-bin-item[data-rel="assets/aria.jpg"]').dblclick();
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip[data-id="picture"]', { timeout: 5000 });
  let ids = await order();
  assert.equal(ids[ids.indexOf('cards') + 1], 'picture', 'a double-click adds after the scene at the playhead');
  await settle(); await win.waitForTimeout(400);
  await H.captureWindow(app, join(shots, '04-bin.png'));
  await win.locator('.fvs-view').click({ position: { x: 20, y: 20 } });
  await win.keyboard.press('Meta+z');
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip[data-id="picture"]', { state: 'detached', timeout: 5000 });
  ids = await order();
  const at = ids[4], target = await win.locator(`.fvs-dock-timeline .fvs-clip[data-id="${at}"]`).boundingBox();
  const lane = await win.locator('.fvs-dock-timeline .fvs-tl-scroll').boundingBox();
  await win.locator('.fvs-bin-item[data-rel="assets/arioso.jpg"]').dragTo(win.locator('.fvs-dock-timeline .fvs-tl-scroll'), { targetPosition: { x: target.x - lane.x + 4, y: target.y - lane.y + 12 } });
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip[data-id="picture"]', { timeout: 5000 }).catch(() => assert.fail('a drag from the bin to the timeline places the picture'));
  ids = await order();
  assert.equal(ids[ids.indexOf(at) - 1], 'picture', `dropped at the cut before ${at}`);
  await win.locator('.fvs-view').click({ position: { x: 20, y: 20 } });
  await win.keyboard.press('Meta+z');
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip[data-id="picture"]', { state: 'detached', timeout: 5000 });

  // 6. one state, the editor's keys: pick a clip in the panel, step the playhead from there
  await win.locator(clip).click({ position: { x: 14, y: 24 } });
  await win.waitForTimeout(80);
  assert.ok(await win.evaluate(() => document.querySelector('.fvs-dock-timeline').contains(document.activeElement)), 'a click keeps the keyboard in the timeline');
  const timeAt = () => win.locator('.fvs-time').textContent();
  const t0 = await timeAt();
  await win.keyboard.press('ArrowRight');
  assert.notEqual(await timeAt(), t0, 'arrow keys step the playhead from the bottom panel');

  // zoom: = and -, ⌘/Ctrl + wheel around the pointer, ⇧Z
  const width = () => win.locator(clip).evaluate(e => e.getBoundingClientRect().width);
  const fit = await width();
  await win.keyboard.press('=');
  assert.ok(Math.abs(await width() / fit - 1.5) < .02, '= zooms in');
  await win.keyboard.press('-');
  assert.ok(Math.abs(await width() - fit) < 1, '- zooms out');
  const box = await win.locator(clip).boundingBox();
  const mx = box.x + 40, my = box.y + 20;
  await win.mouse.move(mx, my);
  await win.keyboard.down('Control'); await win.mouse.wheel(0, -100); await win.keyboard.up('Control');
  await win.waitForFunction(([s, w]) => document.querySelector(s).getBoundingClientRect().width > w * 1.1, [clip, fit]);
  const after = await win.locator(clip).boundingBox();
  assert.ok(Math.abs(after.x - (mx - (mx - box.x) * after.width / box.width)) < 1.5, 'wheel zoom keeps the point under the pointer');
  assert.equal(await win.evaluate(() => window.visualViewport.scale), 1, 'the page itself does not zoom');
  await win.keyboard.press('Shift+Z');
  assert.ok(Math.abs(await width() - fit) < 1, '⇧Z fits the film again');

  // ⌘J closes the native panel: the editor shows a strip that brings the timeline back, and the stage that grows
  // into the room repaints the same frame
  // the baseline is a painted frame: the music analysis started by the bin edits rebuilds the preview when it ends
  let lit = 0;
  for (let i = 0; i < 30 && lit <= 40; i++) { await win.waitForTimeout(150); lit = await stageLuma(); }
  const editor = () => win.evaluate(() => { const s = document.querySelector('.fvs-studio'); s.dataset.seen ||= String(Math.random()); return s.dataset.seen; });
  const before = await editor();
  await win.keyboard.press('Meta+j');
  await win.waitForSelector('.fvs-dock-strip', { state: 'visible', timeout: 5000 });
  assert.equal(await bottomOn(), 0, '⌘J collapses the native bottom panel');
  const repainted = async when => {
    const lumas = [];
    for (let i = 0; i < 20; i++) { lumas.push(Math.round(await stageLuma())); if (lumas.at(-1) > lit * .6) break; await win.waitForTimeout(150); }
    console.log(`stage brightness ${Math.round(lit)} → ${when}: ${lumas.join(' ')}`);
    assert.ok(lit > 40 && lumas.at(-1) > lit * .6, `the stage repaints ${when}`);
  };
  await repainted('after the panel collapses');
  await steady();
  console.log(`⌘J ${before === await editor() ? 'kept' : 'remounted'} the editor`);
  const t1 = await timeAt();
  await win.keyboard.press('ArrowRight');
  assert.notEqual(await timeAt(), t1, 'arrow keys still step after ⌘J');
  await win.getByRole('button', { name: '显示时间线', exact: true }).click();
  await win.waitForSelector(clip, { timeout: 5000 });
  await win.waitForFunction(([s, w]) => Math.abs(document.querySelector(s).getBoundingClientRect().width - w) < 2, [clip, fit], { timeout: 3000 });
  await repainted('after the panel opens again');
  await steady();
  console.log(`reopening the timeline ${before === await editor() ? 'kept' : 'remounted'} the editor`);

  // 7. a reload restores the project layout
  await win.reload({ waitUntil: 'domcontentloaded' });
  await win.waitForSelector('.dv-groupview', { timeout: 30000 });
  await projectLayout('after a reload');
  await settle(); await win.waitForTimeout(600);
  await H.captureWindow(app, join(shots, '05-reloaded.png'));

  const real = errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e));
  assert.deepEqual(real, [], 'no page errors');
  console.log(`docked ok · shots → ${shots}`);
} catch (e) {
  // what the window looked like when it failed: a capture and the layout in words
  await H.captureWindow(app, join(shots, '99-failed.png')).catch(() => {});
  console.log('at failure:', await win.evaluate(() => ({
    left: [...document.querySelectorAll('.fvs-nav, .fvs-bin')].map(e => e.className),
    main: [...document.querySelectorAll('.fvs-launch, .fvs-studio')].map(e => e.className),
    bottom: !!document.querySelector('.dv-edge-bottom.is-on'),
  })).catch(err => String(err)));
  if (logs.length) console.log(logs.join('\n'));
  throw e;
} finally {
  await close();
}
