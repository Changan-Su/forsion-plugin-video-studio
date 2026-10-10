// Real Electron, isolated: how the preview plays. Opens the repository's 2.12 film (a heavy one: 1440×1080, canvases,
// blend modes, a score) from a throwaway library, plays it and counts what a person hears and sees:
//   · how often a sound that is playing is moved (currentTime written after the first half second of play): every
//     move is a gap in the sound, so the number that passes is 0
//   · how much of the sound was played, and in how many pieces
//   · whether the picture's time ever steps back (the clock waits for the sound to start, then goes with it)
//   · the page's frame times, and what one frame of the stage costs inside the preview
// then the same score over a film of two lines of text (is the sound's trouble the picture's weight?), and a film of
// footage made on the spot with ffmpeg (skipped without it): a line of text, then two H.264 clips entered far from a
// key frame, where a clip is slowest to get anywhere: 1080p and 4K, 30 frames a second, a key frame every 250, both
// entered 135 frames after one. Counted inside the preview:
//   · how often a clip that is playing is moved (a move restarts it: the picture stands until it has decoded its
//     way from the key frame again), played through and again with a jump into each clip while the film plays
//     (1.5 s into it, then three seconds of play):
//     the number that passes is 0 (a clip may be sent ahead once when it arrives late; these arrive in time)
//   · how far behind the film each clip's picture runs (it starts a frame or four behind and closes that by
//     running a tenth faster: within 40 ms at the end of its scene), the frames it showed and the frames it
//     dropped; and how long after its turn came each clip's sound was really running
// Same harness as verify-docked.mjs (stub engine, throwaway home and library; nothing of yours is touched).
//   FVS_MAIN=<file>  run another build's main.js (the negative control)
//   FVS_CPU=<n>      slow the page n times (a machine under load); the released 0.10.1 fails from about 4
//   FVS_PLAY=<s>     seconds to play each film (12)
//   FVS_BIG=1        the window fills the screen (more pixels to paint)
//   FVS_FFMPEG=<bin> the ffmpeg that makes the footage (ffmpeg); the clips are kept in artifacts/playback/
//   FVS_ONLY=clips   the film of footage alone
//   FVS_HARD=1       the 4K clip at 60 frames a second with key frames ten seconds apart, entered 390 frames after
//                    one: over a second to get anywhere. Nothing is asserted about how soon it catches up, only that
//                    it is not chased (at most two moves a pass, where up to 0.10.2 it was moved every 150 ms)
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blankTemplate } from '../src/lib/templates.js';
import { insertScene, setProjectMeta } from '../src/lib/project.js';
import { mediaScene } from '../src/lib/scene-templates.js';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const H = createRequire(import.meta.url)(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const skip = new Set(['.git', 'node_modules', 'artifacts']);
const CPU = +process.env.FVS_CPU || 1, PLAY = (+process.env.FVS_PLAY || 12) * 1000, HARD = !!process.env.FVS_HARD;
const SCORE = 'audio/episode-2.12-score.mp3';

// Footage for the third film, kept between runs: H.264 with key frames far apart, as long clips off a phone or a
// screen recorder have, and AAC. Returns null where there is no ffmpeg.
function footage() {
  const dir = join(repo, 'artifacts/playback'), ffmpeg = process.env.FVS_FFMPEG || 'ffmpeg';
  mkdirSync(dir, { recursive: true });
  const make = (name, size, rate, seconds, gop, codec) => {
    const out = join(dir, name);
    if (existsSync(out)) return out;
    const r = spawnSync(ffmpeg, ['-y', '-v', 'error', '-f', 'lavfi', '-i', `testsrc2=size=${size}:rate=${rate}`, '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000',
      '-t', String(seconds), '-vf', 'noise=alls=10:allf=t', ...codec, '-pix_fmt', 'yuv420p', '-g', String(gop), '-keyint_min', String(gop), '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { stdio: ['ignore', 'ignore', 'pipe'] });
    return r.status === 0 ? out : null;
  };
  const x264 = ['-c:v', 'libx264', '-preset', 'veryfast', '-sc_threshold', '0'];
  const hd = make('clip-1080p30.mp4', '1920x1080', 30, 10, 250, [...x264, '-b:v', '8M']);
  const [name, rate, seconds, gop] = HARD ? ['clip-2160p60.mp4', 60, 12, 600] : ['clip-2160p30.mp4', 30, 10, 250];
  const uhd = hd && (make(name, '3840x2160', rate, seconds, gop, ['-c:v', 'h264_videotoolbox', '-b:v', '45M']) || make(name, '3840x2160', rate, seconds, gop, [...x264, '-b:v', '45M']));
  return hd && uhd ? { hd, uhd } : null;
}
const made = footage(); // before the application is up: the first time takes a while

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
  // how long after it is told to play each sound is really running (its time has gone on for 50 ms without standing)
  P.starts = [];
  const seen = new Map();
  let last = 0;
  const tick = () => {
    const t = now(); if (last) P.frames.push(t - last); last = t;
    for (const el of P.els) {
      if (el.paused) { seen.delete(el); continue; }
      const at = el.currentTime, s = seen.get(el) || { told: t, at, from: at, done: false };
      if (at <= s.at) s.from = at;
      s.at = at;
      if (!s.done && at - s.from > .05) { s.done = true; P.starts.push(Math.round(t - s.told)); }
      seen.set(el, s);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
// counted in the preview's frame: every write to a clip's time, what each clip did, and how far its picture is from
// the film's time on every frame drawn
const clipProbe = () => {
  const V = window.__clips = { moves: [], events: [], skew: [], since: 0 }, clips = window.__fvs.stage.videos ? window.__fvs.stage.videos.clips : [];
  const d = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');
  Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', { ...d, set(v) { if (this.tagName === 'VIDEO') V.moves.push({ at: performance.now(), to: v, from: d.get.call(this), paused: this.paused }); d.set.call(this, v); } });
  for (const c of clips) for (const n of ['seeking', 'waiting', 'stalled', 'pause']) c.el.addEventListener(n, () => V.events.push([n, c.scene, performance.now()]));
  V.sample = t => { for (const c of clips) if (t >= c.from && t < c.to) V.skew.push([c.scene, c.el.currentTime - (c.clipIn + t - c.base), c.el.paused]); };
  V.shown = () => clips.map(c => { const q = c.el.getVideoPlaybackQuality(); return { scene: c.scene, shown: q.totalVideoFrames, dropped: q.droppedVideoFrames }; });
};
const clipStats = (c, before) => {
  const per = {};
  for (const [scene, skew, paused] of c.skew) { const p = per[scene] ||= { drawn: 0, standing: 0, behind: [] }; p.drawn++; if (paused) p.standing++; else p.behind.push(-skew * 1000); }
  const after = n => c.events.filter(e => e[0] === n && e[2] - c.since > 500).length;
  return {
    clipMoved: c.moves.filter(m => !m.paused && m.at - c.since > 500).length, clipPlaced: c.moves.length, seeking: after('seeking'), waiting: after('waiting'), pauses: after('pause'),
    scenes: Object.fromEntries(Object.entries(per).map(([k, p]) => [k, { drawn: p.drawn, standing: p.standing, msBehind: stats(p.behind), atLast: stats(p.behind.slice(-40)).p50 }])),
    frames: c.shown.map((q, i) => ({ scene: q.scene, shown: q.shown - before[i].shown, dropped: q.dropped - before[i].dropped })),
  };
};
const stats = xs => { const s = [...xs].sort((a, b) => a - b), q = p => +(s[Math.min(s.length - 1, Math.floor(s.length * p))] || 0).toFixed(1); return { n: s.length, p50: q(.5), p95: q(.95), max: q(1) }; };

async function play(title, { jumps = null } = {}) {
  await win.evaluate(() => window.__play.els.clear()); // this film's sounds only: the one before must not answer for it
  const row = win.locator('.fvs-launch-row', { hasText: title }).first();
  for (let k = 0; k < 15 && !(await row.count()); k++) { await win.locator('.fvs-launch-toolbar button[aria-label="刷新工程"]').click(); await win.waitForTimeout(1500); }
  await row.click({ timeout: 5000 });
  await win.locator('.fvs-gate .fvs-btn.primary').click({ timeout: 15000 });
  await win.waitForSelector('.fvs-view iframe:not(.fvs-pending)', { timeout: 30000 });
  // the sound is loaded and the picture is up before anybody presses play
  await win.waitForFunction(() => { const e = [...window.__play.els].filter(el => !el.paused || el.readyState > 0 || el.networkState === 2); return e.length && e.every(el => el.readyState >= 3); }, null, { timeout: 30000 })
    .catch(() => assert.fail(`${title}: its sound loads`));
  await win.waitForTimeout(jumps ? 5000 : 2500); // (footage: the preview may be built again once its clips' lengths are known)
  let stage = null;
  for (const f of win.frames()) {
    const el = await f.frameElement().catch(() => null);
    if (el && await el.evaluate(x => !!x.closest('.fvs-view') && !x.classList.contains('fvs-pending')) && await f.evaluate(() => !!window.__fvs).catch(() => false)) stage = f;
  }
  assert.ok(stage, `${title}: the preview is a frame of the editor`);
  await stage.evaluate(() => {
    const S = window.__seeks = { cost: [], frames: [], at: [] }, st = window.__fvs.stage, seek = st.seek;
    st.seek = t => { const a = performance.now(), r = seek(t); S.cost.push(performance.now() - a); S.at.push(t); if (window.__clips) window.__clips.sample(t); return r; };
    let last = 0;
    const tick = () => { const t = performance.now(); if (last) S.frames.push(t - last); last = t; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  const clips = await stage.evaluate(() => (window.__fvs.stage.videos ? window.__fvs.stage.videos.clips.length : 0));
  if (clips) await stage.evaluate(clipProbe);
  const keys = async () => {
    await win.locator('.fvs-studio .fvs-time').click();
    await win.waitForFunction(() => document.activeElement === document.querySelector('.fvs-studio'), null, { timeout: 3000 });
  };
  // the ruler above the middle of a scene: a click there puts the playhead in it
  const ruler = async (id, k = .5) => { const r = await win.locator('.fvs-tl-ruler').boundingBox(), c = await win.locator(`.fvs-clip[data-id="${id}"]`).first().boundingBox(); await win.mouse.click(c.x + c.width * k, r.y + r.height / 2); };
  const start = async () => {
    await keys();
    await win.evaluate(() => { const P = window.__play; P.moves = []; P.events = []; P.frames = []; P.starts = []; P.long = 0; P.since = performance.now(); });
    await stage.evaluate(() => { const S = window.__seeks, V = window.__clips; S.cost = []; S.frames = []; S.at = []; if (V) { V.moves = []; V.events = []; V.skew = []; V.since = performance.now(); } });
    const before = clips ? await stage.evaluate(() => window.__clips.shown()) : null;
    await win.keyboard.press('Space');
    await win.waitForFunction(() => document.querySelector('.fvs-play')?.dataset.playing === 'true', null, { timeout: 3000 })
      .catch(() => assert.fail(`${title}: the space bar plays`));
    return before;
  };
  if (jumps) { await ruler('intro'); await win.waitForTimeout(600); } // the film of footage from its first scene (an editor opens a little way into the second)
  const shown = await start();
  await win.waitForTimeout(jumps ? Math.min(PLAY, 10500) : PLAY); // (from the middle of the text, over both cuts, and not to the end)
  const page = await win.evaluate(() => {
    const P = window.__play, el = [...P.els].filter(e => e.played.length).pop();
    let played = 0; for (let i = 0; el && i < el.played.length; i++) played += el.played.end(i) - el.played.start(i);
    return {
      wall: (performance.now() - P.since) / 1000, played, pieces: el ? el.played.length : 0,
      moved: P.moves.filter(m => m.at - P.since > 500 && !m.paused), events: P.events.filter(e => e[1] - P.since > 500).length,
      frames: P.frames, long: P.long, starts: P.starts,
    };
  });
  const inside = await stage.evaluate(() => window.__seeks);
  const seen = clips ? clipStats(await stage.evaluate(() => { const V = window.__clips; return { moves: V.moves, events: V.events, skew: V.skew, since: V.since, shown: V.shown() }; }), shown) : null;
  await win.keyboard.press('Space');
  const backs = inside.at.map((t, i) => (i && t < inside.at[i - 1] - 1e-6 ? [+inside.at[i - 1].toFixed(3), +t.toFixed(3)] : null)).filter(Boolean), back = backs.length;
  const out = {
    film: title, back, backs: backs.slice(0, 4), soundsStartMs: page.starts, from: inside.at.length ? +(inside.at[1] ?? inside.at[0]).toFixed(3) : null, played: `${page.played.toFixed(2)} of ${page.wall.toFixed(2)} s`, pieces: page.pieces,
    moved: page.moved.length, seeking: page.events, by: stats(page.moved.map(m => (m.to - m.from) * 1000)),
    pageFrame: stats(page.frames), stageFrame: stats(inside.frames), stageSeek: stats(inside.cost), longTasks: `${Math.round(page.long)} ms`,
  };
  console.log(JSON.stringify(out));
  if (seen) console.log(JSON.stringify({ film: title, clips: seen }));
  // again from the first scene, with a jump into each of these scenes while it plays
  let jumped = null;
  if (jumps) {
    await win.waitForFunction(() => document.querySelector('.fvs-play')?.dataset.playing === 'false', null, { timeout: 3000 }).catch(() => assert.fail(`${title}: the space bar pauses`));
    await win.waitForTimeout(400);
    await ruler('intro');
    await win.waitForTimeout(600);
    const before = await start();
    await win.waitForTimeout(1200);
    for (const id of jumps) { await ruler(id, .3); await win.waitForTimeout(3000); } // 1.5 s into a clip of 5: room to arrive and to close what is left
    jumped = clipStats(await stage.evaluate(() => { const V = window.__clips; return { moves: V.moves, events: V.events, skew: V.skew, since: V.since, shown: V.shown() }; }), before);
    await keys();
    await win.keyboard.press('Space');
    console.log(JSON.stringify({ film: title, jumps, clips: jumped }));
  }
  // back to the list for the next film
  await win.locator('.fvs-bar button[aria-label="更多"]').click();
  await win.getByRole('menuitem', { name: '关闭工程' }).click();
  await win.waitForSelector('.fvs-launch', { timeout: 10000 });
  return { ...out, lost: page.wall - page.played, clips: seen, jumped };
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
  if (made) {
    mkdirSync(join(lib, '带视频/media'), { recursive: true });
    let film = blankTemplate({ title: '带视频' }), after = 'intro';
    for (const [id, file, clipIn] of [['hd', made.hd, 4.5], ['uhd', made.uhd, HARD ? 6.5 : 4.5]]) {
      cpSync(file, join(lib, '带视频/media', basename(file)));
      const scene = mediaScene({ id, title: id, src: `media/${basename(file)}`, kind: 'video', seconds: 5 });
      film = insertScene(film, after, { ...scene, html: scene.html.replace('data-clip-in="0"', `data-clip-in="${clipIn}"`) });
      after = id;
    }
    writeFileSync(join(lib, '带视频/带视频.fvs.md'), film);
  } else console.log('no footage (ffmpeg is not here, or could not make it): the film with clips is skipped');

  await H.boot(app, win, { space: 'forsion-video-studio' });
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.waitForSelector('#tangu-splash', { state: 'detached', timeout: 15000 }).catch(() => {});
  await win.waitForSelector('.fvs-launch', { timeout: 20000 });
  await win.evaluate(probe);
  if (process.env.FVS_BIG) await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].maximize());
  console.log('window:', JSON.stringify(await app.evaluate(({ BrowserWindow, screen }) => ({ ...BrowserWindow.getAllWindows()[0].getBounds(), scale: screen.getPrimaryDisplay().scaleFactor, hz: screen.getPrimaryDisplay().displayFrequency }))));
  if (CPU > 1) { await (await win.context().newCDPSession(win)).send('Emulation.setCPUThrottlingRate', { rate: CPU }); console.log(`the page runs ${CPU}× slower`); }

  const only = process.env.FVS_ONLY; // 'clips': the film of footage alone
  const heavy = only ? null : await play('第 2.12 话');
  const light = only ? null : await play('只有配乐');
  const clips = made ? await play('带视频', { jumps: ['hd', 'uhd'] }) : null;
  if (clips) {
    for (const [how, c] of [['played through', clips.clips], ['jumped into', clips.jumped]]) {
      assert.ok(c.clipMoved <= (HARD ? 2 : 0), `带视频, ${how}: a clip that is playing is not chased (clips were moved ${c.clipMoved} times)`);
      for (const f of c.frames) assert.ok(f.shown > 30, `带视频, ${how}: the ${f.scene} clip shows its picture (${f.shown} frames)`);
      if (!HARD) for (const [id, sc] of Object.entries(c.scenes)) assert.ok(Math.abs(sc.atLast) < 40, `带视频, ${how}: the ${id} clip's picture is with the film (${sc.atLast} ms behind at the end of its scene)`);
    }
    if (!HARD) for (const ms of clips.soundsStartMs) assert.ok(ms < 300, `带视频: a clip's sound is running soon after its turn comes (${ms} ms)`);
    assert.equal(clips.moved, 0, `带视频: a sound that is playing is never moved (it was, ${clips.moved} times)`);
    assert.equal(clips.back, 0, "带视频: the picture's time never steps back while it plays");
  }
  for (const r of [heavy, light].filter(Boolean)) {
    assert.equal(r.moved, 0, `${r.film}: a sound that is playing is never moved (it was, ${r.moved} times)`);
    assert.ok(r.lost < .5, `${r.film}: the sound plays through (${r.played})`);
    assert.equal(r.back, 0, `${r.film}: the picture's time never steps back while it plays`);
  }
  assert.deepEqual(errors.filter(e => !/fonts\.|ERR_FAILED|net::/.test(e)), [], 'no page errors');
  console.log('playback ok');
} finally {
  await close();
}
