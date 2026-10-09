// Real Electron, isolated: how the preview plays. Opens the repository's 2.12 film (a heavy one: 1440×1080, canvases,
// blend modes, a score) from a throwaway library, plays it and counts what a person hears and sees:
//   · how often a sound that is playing is moved (currentTime written after the first half second of play): every
//     move is a gap in the sound, so the number that passes is 0
//   · how much of the sound was played, and in how many pieces
//   · whether the picture's time ever steps back (the clock waits for the sound to start, then goes with it)
//   · the page's frame times, and what one frame of the stage costs inside the preview
// then the same score over a film of two lines of text (is the sound's trouble the picture's weight?).
// Same harness as verify-docked.mjs (stub engine, throwaway home and library; nothing of yours is touched).
//   FVS_MAIN=<file>  run another build's main.js (the negative control)
//   FVS_CPU=<n>      slow the page n times (a machine under load); the released 0.10.1 fails from about 4
//   FVS_PLAY=<s>     seconds to play each film (12)
//   FVS_BIG=1        the window fills the screen (more pixels to paint)
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blankTemplate } from '../src/lib/templates.js';
import { setProjectMeta } from '../src/lib/project.js';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const H = createRequire(import.meta.url)(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const skip = new Set(['.git', 'node_modules', 'artifacts']);
const CPU = +process.env.FVS_CPU || 1, PLAY = (+process.env.FVS_PLAY || 12) * 1000;
const SCORE = 'audio/episode-2.12-score.mp3';

const { app, win, home, close } = await H.launch({ tag: 'fvs-playback' });
const errors = [];
win.on('pageerror', e => { errors.push(String(e)); console.log(`[pageerror] ${e.stack || e}`); });

// counted in the page, before the plugin makes its first sound
const probe = () => {
  const now = () => performance.now();
  const P = window.__play = { els: new Set(), moves: [], events: [], frames: [], long: 0, since: 0 };
  const A = window.Audio;
  window.Audio = function Audio(...a) { const el = new A(...a); P.els.add(el); for (const n of ['seeking', 'waiting', 'stalled']) el.addEventListener(n, () => P.events.push([n, now()])); return el; };
  window.Audio.prototype = A.prototype;
  const d = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');
  Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', { ...d, set(v) { if (P.els.has(this)) P.moves.push({ at: now(), to: v, from: d.get.call(this), paused: this.paused }); d.set.call(this, v); } });
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) P.long += e.duration; }).observe({ type: 'longtask' }); } catch { /* not measured */ }
  let last = 0;
  const tick = () => { const t = now(); if (last) P.frames.push(t - last); last = t; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
};
const stats = xs => { const s = [...xs].sort((a, b) => a - b), q = p => +(s[Math.min(s.length - 1, Math.floor(s.length * p))] || 0).toFixed(1); return { n: s.length, p50: q(.5), p95: q(.95), max: q(1) }; };

async function play(title) {
  await win.evaluate(() => window.__play.els.clear()); // this film's sounds only: the one before must not answer for it
  const row = win.locator('.fvs-launch-row', { hasText: title }).first();
  for (let k = 0; k < 15 && !(await row.count()); k++) { await win.locator('.fvs-launch-toolbar button[aria-label="刷新工程"]').click(); await win.waitForTimeout(1500); }
  await row.click({ timeout: 5000 });
  await win.locator('.fvs-gate .fvs-btn.primary').click({ timeout: 15000 });
  await win.waitForSelector('.fvs-view iframe:not(.fvs-pending)', { timeout: 30000 });
  // the sound is loaded and the picture is up before anybody presses play
  await win.waitForFunction(() => { const e = [...window.__play.els].filter(el => !el.paused || el.readyState > 0 || el.networkState === 2); return e.length && e.every(el => el.readyState >= 3); }, null, { timeout: 30000 })
    .catch(() => assert.fail(`${title}: its score loads`));
  await win.waitForTimeout(2500);
  let stage = null;
  for (const f of win.frames()) {
    const el = await f.frameElement().catch(() => null);
    if (el && await el.evaluate(x => !!x.closest('.fvs-view') && !x.classList.contains('fvs-pending')) && await f.evaluate(() => !!window.__fvs).catch(() => false)) stage = f;
  }
  assert.ok(stage, `${title}: the preview is a frame of the editor`);
  await stage.evaluate(() => {
    const S = window.__seeks = { cost: [], frames: [], at: [] }, st = window.__fvs.stage, seek = st.seek;
    st.seek = t => { const a = performance.now(), r = seek(t); S.cost.push(performance.now() - a); S.at.push(t); return r; };
    let last = 0;
    const tick = () => { const t = performance.now(); if (last) S.frames.push(t - last); last = t; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  await win.locator('.fvs-studio .fvs-time').click();
  await win.waitForFunction(() => document.activeElement === document.querySelector('.fvs-studio'), null, { timeout: 3000 });
  await win.evaluate(() => { const P = window.__play; P.moves = []; P.events = []; P.frames = []; P.long = 0; P.since = performance.now(); });
  await stage.evaluate(() => { window.__seeks.cost = []; window.__seeks.frames = []; window.__seeks.at = []; });
  await win.keyboard.press('Space');
  await win.waitForFunction(() => document.querySelector('.fvs-play')?.dataset.playing === 'true', null, { timeout: 3000 })
    .catch(() => assert.fail(`${title}: the space bar plays`));
  await win.waitForTimeout(PLAY);
  const page = await win.evaluate(() => {
    const P = window.__play, el = [...P.els].filter(e => e.played.length).pop();
    let played = 0; for (let i = 0; el && i < el.played.length; i++) played += el.played.end(i) - el.played.start(i);
    return {
      wall: (performance.now() - P.since) / 1000, played, pieces: el ? el.played.length : 0,
      moved: P.moves.filter(m => m.at - P.since > 500 && !m.paused), events: P.events.filter(e => e[1] - P.since > 500).length,
      frames: P.frames, long: P.long,
    };
  });
  const inside = await stage.evaluate(() => window.__seeks);
  await win.keyboard.press('Space');
  const back = inside.at.filter((t, i) => i && t < inside.at[i - 1] - 1e-6).length;
  const out = {
    film: title, back, from: inside.at.length ? +(inside.at[1] ?? inside.at[0]).toFixed(3) : null, played: `${page.played.toFixed(2)} of ${page.wall.toFixed(2)} s`, pieces: page.pieces,
    moved: page.moved.length, seeking: page.events, by: stats(page.moved.map(m => (m.to - m.from) * 1000)),
    pageFrame: stats(page.frames), stageFrame: stats(inside.frames), stageSeek: stats(inside.cost), longTasks: `${Math.round(page.long)} ms`,
  };
  console.log(JSON.stringify(out));
  // back to the list for the next film
  await win.locator('.fvs-bar button[aria-label="更多"]').click();
  await win.getByRole('menuitem', { name: '关闭工程' }).click();
  await win.waitForSelector('.fvs-launch', { timeout: 10000 });
  return { ...out, lost: page.wall - page.played };
}

try {
  const installed = join(home, 'plugins/forsion-video-studio');
  cpSync(repo, installed, { recursive: true, filter: p => !skip.has(basename(p)) });
  if (process.env.FVS_MAIN) { cpSync(resolve(process.env.FVS_MAIN), join(installed, 'main.js')); console.log(`running ${process.env.FVS_MAIN} as main.js`); }
  const lib = join(home, 'vault/Forsion Video Studio');
  cpSync(join(repo, 'examples/episode-2.12'), join(lib, '第 2.12 话'), { recursive: true });
  mkdirSync(join(lib, '只有配乐/audio'), { recursive: true });
  cpSync(join(repo, 'examples/episode-2.12', SCORE), join(lib, '只有配乐', SCORE));
  writeFileSync(join(lib, '只有配乐/只有配乐.fvs.md'), setProjectMeta(blankTemplate({ title: '只有配乐' }).replace('"2 bars"', '"16 bars"'), { audio: [{ src: SCORE, role: 'score' }] }));

  await H.boot(app, win, { space: 'forsion-video-studio' });
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.waitForSelector('#tangu-splash', { state: 'detached', timeout: 15000 }).catch(() => {});
  await win.waitForSelector('.fvs-launch', { timeout: 20000 });
  await win.evaluate(probe);
  if (process.env.FVS_BIG) await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].maximize());
  console.log('window:', JSON.stringify(await app.evaluate(({ BrowserWindow, screen }) => ({ ...BrowserWindow.getAllWindows()[0].getBounds(), scale: screen.getPrimaryDisplay().scaleFactor, hz: screen.getPrimaryDisplay().displayFrequency }))));
  if (CPU > 1) { await (await win.context().newCDPSession(win)).send('Emulation.setCPUThrottlingRate', { rate: CPU }); console.log(`the page runs ${CPU}× slower`); }

  const heavy = await play('第 2.12 话');
  const light = await play('只有配乐');
  for (const r of [heavy, light]) {
    assert.equal(r.moved, 0, `${r.film}: a sound that is playing is never moved (it was, ${r.moved} times)`);
    assert.ok(r.lost < .5, `${r.film}: the sound plays through (${r.played})`);
    assert.equal(r.back, 0, `${r.film}: the picture's time never steps back while it plays`);
  }
  assert.deepEqual(errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e)), [], 'no page errors');
  console.log('playback ok');
} finally {
  await close();
}
