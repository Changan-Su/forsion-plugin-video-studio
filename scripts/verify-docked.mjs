// Real Electron, isolated: in the Video Studio Space the timeline docks in the native bottom panel.
// Launches the desktop's built out/ through its uiux-electron harness (stub engine, throwaway home, user data and
// vault — nothing of yours is read, touched or killed), seeds this bundle into <home>/plugins, opens the example and
// checks the dock, the keys, zoom, ⌘J and a reload. Needs a host with ctx.viewLocations: point FVS_DESKTOP_ROOT at
// that checkout's desktop/ and run `npx electron-vite build` there first. No model calls.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const H = createRequire(import.meta.url)(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const shots = join(repo, 'artifacts/docked'); mkdirSync(shots, { recursive: true });
const skip = new Set(['.git', 'node_modules', 'artifacts']);
const errors = [];

const { app, win, home, close } = await H.launch({ tag: 'fvs-docked' });
win.on('pageerror', e => errors.push(String(e)));
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
try {
  cpSync(repo, join(home, 'plugins/forsion-video-studio'), { recursive: true, filter: p => !skip.has(basename(p)) });
  await H.boot(app, win, { space: 'forsion-video-studio' }); // boot reloads, which picks up the seeded plugin
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.locator('.fvs-library button', { hasText: '打开示例' }).first().click({ timeout: 30000 });
  const clip = '.fvs-dock-timeline .fvs-clip[data-id="cards"]';
  await win.waitForSelector(clip, { timeout: 30000 });

  // docked: the editor has no timeline of its own, the bottom panel is open and sits under the editor
  assert.equal(await win.locator('.fvs-studio .fvs-tl').count(), 0, 'the editor keeps no timeline of its own');
  assert.equal(await win.locator('.dv-edge-bottom.is-on').count(), 1, 'the native bottom panel is open');
  const geo = await win.evaluate(() => {
    const r = e => document.querySelector(e).getBoundingClientRect();
    return { stage: r('.fvs-studio'), dock: r('.fvs-dock-timeline'), docked: !document.querySelector('.fvs-dock-timeline').closest('.fvs-studio') };
  });
  assert.ok(geo.docked && geo.dock.top >= geo.stage.bottom - 2 && geo.dock.height > 120, `the timeline sits in its own panel under the editor (${JSON.stringify(geo)})`);
  assert.equal(await win.locator('.fvs-dock-strip').isVisible(), false);
  await settle();
  await win.waitForTimeout(600);
  await H.captureWindow(app, join(shots, '01-docked.png'));

  // one state, the editor's keys: pick a clip in the panel, step the playhead from there
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
  for (let i = 0; i < 6; i++) await win.keyboard.press('=');
  await win.waitForTimeout(300);
  await H.captureWindow(app, join(shots, '02-zoomed.png'));
  await win.keyboard.press('Shift+Z');
  assert.ok(Math.abs(await width() - fit) < 1, '⇧Z fits the film again');

  // ⌘J closes the native panel: the editor shows a strip that brings the timeline back, and the stage that grows
  // into the room repaints the same frame
  await win.waitForTimeout(400);
  const lit = await stageLuma();
  await win.keyboard.press('Meta+j');
  await win.waitForSelector('.fvs-dock-strip', { state: 'visible', timeout: 5000 });
  assert.equal(await win.locator('.dv-edge-bottom.is-on').count(), 0, '⌘J collapses the native bottom panel');
  const repainted = async when => {
    const lumas = [];
    for (let i = 0; i < 20; i++) { lumas.push(Math.round(await stageLuma())); if (lumas.at(-1) > lit * .6) break; await win.waitForTimeout(150); }
    console.log(`stage brightness ${Math.round(lit)} → ${when}: ${lumas.join(' ')}`);
    assert.ok(lit > 40 && lumas.at(-1) > lit * .6, `the stage repaints ${when}`);
  };
  await repainted('after the panel collapses');
  await H.captureWindow(app, join(shots, '03-collapsed.png'));
  await win.getByRole('button', { name: '显示时间线', exact: true }).click();
  await win.waitForSelector(clip, { timeout: 5000 });
  assert.equal(await win.locator('.fvs-dock-strip').isVisible(), false);
  await win.waitForFunction(([s, w]) => Math.abs(document.querySelector(s).getBoundingClientRect().width - w) < 2, [clip, fit], { timeout: 3000 });
  await repainted('after the panel opens again');

  // a reload restores the Space with the timeline still in the bottom panel
  await win.reload({ waitUntil: 'domcontentloaded' });
  await win.waitForSelector('.dv-groupview', { timeout: 30000 });
  await win.waitForSelector('.fvs-dock-timeline', { timeout: 30000 });
  const reopened = await win.waitForSelector(clip, { timeout: 15000 }).then(() => true, () => false);
  assert.equal(await win.locator('.fvs-studio .fvs-tl').count(), 0, 'after a reload the timeline is still docked');
  await settle();
  await win.waitForTimeout(600);
  await H.captureWindow(app, join(shots, '04-reloaded.png'));

  const real = errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e));
  assert.deepEqual(real, [], 'no page errors');
  console.log(`docked ok · project reopened after reload: ${reopened} · shots → ${shots}`);
} finally {
  await close();
}
