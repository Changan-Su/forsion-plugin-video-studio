// The runtime in a real Chromium: transitions, in-points and runtime-owned video in capture mode, the
// sandboxed preview (embed) over postMessage, and the CLI rendering a project with video sound.
// Needs playwright-core + a Chromium (and ffmpeg for the video parts); prints SKIP and passes without them.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import * as P from '../src/lib/project.js';
import { compile, buildHtml } from '../src/lib/compile.js';
import { EASE } from '../src/runtime/engine.js';
import { timeExpr } from '../src/runtime/player.js';
import { scan, timedSpans } from '../src/lib/html.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const require = createRequire(import.meta.url);
const load = m => { try { return require(m); } catch { return null; } };
const pw = load('playwright-core') || load('playwright');
const esbuild = load('esbuild');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const hasFfmpeg = spawnSync(FFMPEG, ['-version'], { stdio: 'ignore' }).status === 0;

let browser = null, why = !pw ? 'playwright-core is not installed' : !esbuild ? 'esbuild is not installed' : '';
if (pw && esbuild) {
  for (const opt of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try { browser = await pw.chromium.launch(opt); break; } catch (e) { why = `no Chromium to run (${String(e.message || e).split('\n')[0]})`; }
  }
}
if (!browser) console.log(`SKIP runtime tests: ${why}`);
if (browser && !hasFfmpeg) console.log('SKIP video parts of the runtime tests: ffmpeg not found');
const RUNTIME = browser ? (await esbuild.build({ entryPoints: [join(root, 'src/runtime/index.js')], bundle: true, format: 'iife', globalName: 'FVS', write: false, target: 'es2020' })).outputFiles[0].text : '';
const dir = mkdtempSync(join(tmpdir(), 'fvs-runtime-'));
test.after(async () => { await browser?.close(); rmSync(dir, { recursive: true, force: true }); });

const ff = (...args) => { const r = spawnSync(FFMPEG, ['-y', '-v', 'error', ...args], { cwd: dir }); assert.equal(r.status, 0, String(r.stderr)); };
let clips = null;
/** A 2 s test pattern at 25 fps with a 660 Hz tone, the same without sound, and a 220 Hz tone. */
function media() {
  if (clips) return clips;
  ff('-f', 'lavfi', '-i', 'testsrc=size=160x120:rate=25:duration=2', '-f', 'lavfi', '-i', 'sine=frequency=660:duration=2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', 'clip.mp4');
  ff('-f', 'lavfi', '-i', 'testsrc2=size=160x120:rate=25:duration=2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', 'silent.mp4');
  ff('-f', 'lavfi', '-i', 'sine=frequency=220:duration=6', 'tone.wav');
  ff('-f', 'lavfi', '-i', 'anoisesrc=duration=6:amplitude=.5', 'noise.wav');
  return (clips = true);
}

async function capture(text, name) {
  const p = P.parseProject(text);
  assert.deepEqual(p.errors.filter(e => e.level === 'error'), []);
  const payload = compile(p, { resolve: rel => pathToFileURL(join(dir, rel)).href });
  const file = join(dir, `${name}.html`);
  writeFileSync(file, buildHtml(payload, RUNTIME, { mode: 'capture' }));
  const page = await browser.newPage({ viewport: { width: payload.width, height: payload.height } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => window.__stage.ready());
  return { page, errors, p };
}
const nums = s => (String(s).match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/g) || []).map(Number);
const close = (a, b, eps, msg) => { assert.equal(a.length, b.length, `${msg}: ${a} vs ${b}`); a.forEach((x, i) => assert.ok(Math.abs(x - b[i]) < eps, `${msg}: ${a} vs ${b}`)); };

/* ───────── transitions ───────── */

const TYPES = P.TRANSITIONS;
const W = 640, H = 360;
const transitionsDoc = () => `# Transitions

\`\`\`fvs
{ "fvs": 1, "width": ${W}, "height": ${H}, "fps": 30, "tempo": { "bpm": 120, "beatsPerBar": 4 }, "background": "#203040" }
\`\`\`

${['none', ...TYPES].map((type, i) => `## s${i} · ${type}

\`\`\`fvs
{ "length": "2 beats", "hits": [0, 1]${i ? `, "transition": { "type": "${type}", "dur": "1 beat" }` : ''} }
\`\`\`

\`\`\`html
<div class="c" style="position:absolute;inset:0;background:hsl(${i * 40},60%,40%)"></div>
<div data-seq="h0"><b>first</b><b class="last">last</b></div>
\`\`\`
${i === 1 ? '\n```js\nK(root, [[t0, { o: .8 }]])\n```\n' : ''}`).join('\n')}`;

// what a wrapper should carry at progress p; a = outgoing scene, b = incoming
const expected = (type, p) => ({
  fade: { b: { opacity: [p] } },
  dip: { a: { opacity: [Math.max(0, 1 - 2 * p)] }, b: { opacity: [Math.max(0, 2 * p - 1)] } },
  'slide-left': { b: { transform: [(1 - p) * W] } },
  'slide-up': { b: { transform: [(1 - p) * H] } },
  'push-left': { a: { transform: [-p * W] }, b: { transform: [(1 - p) * W] } },
  'wipe-left': { b: { clipPath: [0, 0, 0, (1 - p) * 100] } },
  zoom: { b: { opacity: [p], transform: [1.08 - .08 * p] } },
  blur: { b: { opacity: [p], filter: [12 * (1 - p)] } },
})[type];

const snapshot = page => page.evaluate(() => [...document.querySelectorAll('.fvs-scene')].map(el => {
  const w = el.parentElement.classList.contains('fvs-transition') ? el.parentElement : null;
  return {
    id: el.dataset.scene, shown: el.style.display !== 'none' && (!w || w.style.display !== 'none'),
    wrap: w && { opacity: w.style.opacity, transform: w.style.transform, clipPath: w.style.clipPath, filter: w.style.filter },
    rootOpacity: el.style.opacity, lastShown: el.querySelector('.last') ? el.querySelector('.last').style.display !== 'none' : null,
  };
}));

test('transitions: both scenes on screen, styles follow p, scrubbing back leaves nothing behind', { skip: !browser }, async () => {
  const { page, errors } = await capture(transitionsDoc(), 'transitions');
  for (const [k, type] of TYPES.entries()) {
    const i = k + 1, t = i + .15; // 30 % into the 0.5 s transition at the start of scene i
    await page.evaluate(x => window.__stage.seek(x), t);
    const s = await snapshot(page);
    assert.deepEqual(s.filter(x => x.shown).map(x => x.id), [`s${i - 1}`, `s${i}`], `${type}: the outgoing scene stays on screen underneath`);
    assert.equal(s[i - 1].lastShown, true, `${type}: the outgoing scene's last data-seq item stays through its tail`);
    const p = EASE.io((t + 1e-4 - i) / .5);
    const want = expected(type, p);
    for (const side of ['a', 'b']) {
      const w = (side === 'a' ? s[i - 1] : s[i]).wrap;
      const props = want[side] || {};
      if (!w) { assert.ok(!want[side], `${type}: scene ${side} needs a wrapper`); continue; }
      for (const k2 of ['opacity', 'transform', 'clipPath', 'filter']) {
        if (props[k2]) close(nums(w[k2]), props[k2], 1e-3, `${type} ${side}.${k2} = ${w[k2]}`);
        else assert.equal(w[k2], '', `${type} ${side}.${k2} must be empty, got ${w[k2]}`);
      }
    }
    // no other scene carries anything
    for (const x of s) if (x.wrap && x.id !== `s${i - 1}` && x.id !== `s${i}`) assert.deepEqual(x.wrap, { opacity: '', transform: '', clipPath: '', filter: '' });
    // the transition never touches the scene root a script animates
    if (type === 'fade') assert.equal(s[1].rootOpacity, '0.8');
    // after the transition: the outgoing scene is gone and nothing remains on any wrapper
    await page.evaluate(x => window.__stage.seek(x), i + .75);
    const after = await snapshot(page);
    assert.deepEqual(after.filter(x => x.shown).map(x => x.id), [`s${i}`]);
    for (const x of after) if (x.wrap) assert.deepEqual(x.wrap, { opacity: '', transform: '', clipPath: '', filter: '' }, `${type}: residue on ${x.id}`);
    // scrub back to before the transition: same
    await page.evaluate(x => window.__stage.seek(x), i - .3);
    const back = await snapshot(page);
    assert.deepEqual(back.filter(x => x.shown).map(x => x.id), [`s${i - 1}`]);
    for (const x of back) if (x.wrap) assert.deepEqual(x.wrap, { opacity: '', transform: '', clipPath: '', filter: '' }, `${type}: residue on ${x.id} after scrubbing back`);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('in-point: the scene API and declarative timing count from the content start', { skip: !browser }, async () => {
  const { page, errors } = await capture(`# In

\`\`\`fvs
{ "fvs": 1, "width": 320, "height": 180, "fps": 30, "tempo": { "bpm": 120, "beatsPerBar": 4 } }
\`\`\`

\`\`\`js stage
root.dataset.b = JSON.stringify({ t0: scenes.b.t0, t1: scenes.b.t1, t0v: scenes.b.t0v, dur: scenes.b.dur, in: scenes.b.in, during: during(['b']) })
\`\`\`

## a · A

\`\`\`fvs
{ "length": "2 beats" }
\`\`\`

\`\`\`html
<p>A</p>
\`\`\`

## b · B

\`\`\`fvs
{ "length": "4 beats", "in": "2 beats", "hits": [0, 2, 3, 5] }
\`\`\`

\`\`\`html
<p class="x" data-in="3b">X</p><p class="y" data-in="h2">Y</p>
<ol data-seq="h0"><li>0</li><li>1</li><li>2</li><li>3</li></ol>
\`\`\`

\`\`\`js
root.dataset.api = JSON.stringify({ t0, t1, dur, at1: at(1), hits, h2: hit(2) })
\`\`\`
`, 'in');
  const api = JSON.parse(await page.evaluate(() => document.querySelector('[data-scene="b"]').dataset.api));
  assert.deepEqual(api, { t0: 0, t1: 3, dur: 3, at1: .5, hits: [0, 1, 1.5, 2.5], h2: 1.5 });
  const sc = JSON.parse(await page.evaluate(() => document.querySelector('.fvs-stage').dataset.b));
  assert.deepEqual(sc, { t0: 1, t1: 3, t0v: 0, dur: 2, in: 1, during: [[1, 3]] });
  const at = async t => { await page.evaluate(x => window.__stage.seek(x), t); return page.evaluate(() => {
    const b = document.querySelector('[data-scene="b"]'), vis = el => el.style.display !== 'none' && el.style.visibility !== 'hidden' && el.style.opacity !== '0';
    return { b: b.style.display !== 'none', x: vis(b.querySelector('.x')), y: vis(b.querySelector('.y')), li: [...b.querySelectorAll('li')].map(li => li.style.display !== 'none') };
  }); };
  assert.equal((await at(.9)).b, false, 'hidden before its visible start');
  assert.deepEqual(await at(1.2), { b: true, x: false, y: false, li: [false, true, false, false] });
  assert.deepEqual(await at(1.6), { b: true, x: true, y: true, li: [false, false, true, false] });
  assert.deepEqual(await at(2.9), { b: true, x: true, y: true, li: [false, false, false, true] });
  assert.deepEqual(errors, []);
  await page.close();
});

/* ───────── the Elements lane: what the editor's timeline says is what the picture does ───────── */

test('elements lane: the spans the editor draws are when each element is on screen', { skip: !browser }, async () => {
  const { page, errors, p } = await capture(`# Lane

\`\`\`fvs
{ "fvs": 1, "width": 320, "height": 180, "fps": 30, "tempo": { "bpm": 120, "beatsPerBar": 4 } }
\`\`\`

## a · A

\`\`\`fvs
{ "length": "2 beats" }
\`\`\`

\`\`\`html
<p>A</p>
\`\`\`

## z · Z

\`\`\`fvs
{ "length": "10 beats", "hits": [0, 2, 4] }
\`\`\`

\`\`\`html
<div data-in="2s" data-out="3s"><span data-in="1s">nested</span></div>
<div data-in="1s" data-each="1"><span>each a</span><span>each b</span></div>
<div data-seq="h0"><span class="never" data-in="h1">seq with its own in</span><span>seq b</span></div>
<p data-out="3s" data-fx-out="fade" data-dur="2">fades out</p>
<div data-seq="h0" data-seq-end="3s"><b>x</b><b>y</b></div>
<div data-seq="h1"><i>1</i><i>2</i><i>3</i></div>
<p class="never" data-in="3s" data-out="1s">out before in</p>
<p data-in="nonsense">cannot be read</p>
<p data-in="h1" data-fx="fade">fades in</p>
<p data-in="h2" data-fx="up" data-out="end-1">up, then out</p>
<div data-seq="h0"><div><b data-in="h0+1">inside an item</b></div><div>two</div></div>
\`\`\`

## y · Y

\`\`\`fvs
{ "length": "4 beats", "in": "2 beats", "hits": [0, 2, 3, 5] }
\`\`\`

\`\`\`html
<p data-in="h0">from before the visible start</p><p data-in="3b">X</p>
<ol data-seq="h0"><li class="never">0</li><li>1</li><li>2</li><li>3</li></ol>
\`\`\`
`, 'lane');
  const unit = P.hitUnit(p.tempo), beat = p.tempo.beat;
  for (const id of ['z', 'y']) {
    const s = P.sceneById(p, id), tags = scan(s.html).tags;
    const content = { t0: s.t0v ?? s.t0, t1: s.t1, hits: s.hitTimes };
    const spans = timedSpans(s.html, { s0: s.t0, t1: s.t1, hits: s.hitTimes }, expr => timeExpr(expr, content, unit, beat), { unit, beat });
    assert.equal(new Set(spans.map(x => x.tag)).size, spans.length, 'one block per element');
    const never = tags.filter(t => /\bnever\b/.test(t.attr('class') || '')).map(t => t.index);
    assert.ok(never.length && never.every(k => !spans.some(x => x.tag === k)), `${id}: what is never on screen has no block`);
    const names = await page.evaluate(i => [...document.querySelector(`[data-scene="${i}"]`).querySelectorAll('*')].map(el => el.tagName.toLowerCase()), id);
    assert.deepEqual(names, tags.map(t => t.name), `${id}: the page's elements are the scanned tags, in order`);
    const wrong = [];
    for (let t = s.t0 + .025; t < s.t1; t += .05) {
      const seen = await page.evaluate(async ([i, at]) => {
        await window.__stage.seek(at);
        const root = document.querySelector(`[data-scene="${i}"]`), on = el => el.style.display !== 'none' && el.style.visibility !== 'hidden' && el.style.opacity !== '0';
        return [...root.querySelectorAll('*')].map(el => { for (let n = el; n !== root.parentElement; n = n.parentElement) if (!on(n)) return false; return true; });
      }, [id, t]);
      for (const x of spans) if (seen[x.tag] !== (t >= x.a && t < x.b)) wrong.push(`${x.label} at ${t.toFixed(3)}: on screen ${seen[x.tag]}, block ${x.a}–${x.b}`);
      for (const k of never) if (seen[k]) wrong.push(`<${tags[k].name} class="never"> is on screen at ${t.toFixed(3)}`);
    }
    assert.deepEqual(wrong, [], `${id}: lane and picture agree`);
  }
  // the blocks, as the editor draws them (z starts at 1 s; a beat is half a second)
  const z = P.sceneById(p, 'z'), content = { t0: z.t0v ?? z.t0, t1: z.t1, hits: z.hitTimes };
  assert.deepEqual(timedSpans(z.html, { s0: z.t0, t1: z.t1, hits: z.hitTimes }, expr => timeExpr(expr, content, unit, beat), { unit, beat }).map(x => [x.label, x.a, x.b, x.of ? `${x.n}/${x.of.items.length}` : '', x.error ? 'error' : '']), [
    ['nested', 3, 4, '', ''], ['nested', 3, 4, '', ''],
    ['each a', 2, 6, '1/2', ''], ['each b', 2.5, 6, '2/2', ''],
    ['seq b', 2, 6, '2/2', ''],
    ['fades out', 1, 5, '', ''],
    ['x', 1, 2, '1/2', ''], ['y', 2, 4, '2/2', ''],
    ['1', 2, 3, '1/3', ''], ['2', 3, 6, '2/3', ''], ['3', 1, 6, '3/3', 'error'],
    ['cannot be read', 1, 6, '', 'error'],
    ['fades in', 2, 6, '', ''],
    ['up, then out', 3, 5.5, '', ''], // end-1: one beat before the end
    ['inside an item', 1, 2, '1/2', ''], ['inside an item', 1.5, 2, '', ''], ['two', 2, 6, '2/2', ''],
  ]);
  assert.deepEqual(errors, []);
  await page.close();
});

/* ───────── video ───────── */

const videoDoc = `# Video

\`\`\`fvs
{ "fvs": 1, "width": 320, "height": 240, "fps": 30 }
\`\`\`

## v · trimmed

\`\`\`fvs
{ "length": 2, "in": 0.5 }
\`\`\`

\`\`\`html
<video src="clip.mp4" data-clip-in="0.2" autoplay controls style="width:160px"></video>
\`\`\`

## w · looping

\`\`\`fvs
{ "length": 1 }
\`\`\`

\`\`\`html
<video src="silent.mp4" data-clip-in="1.8" loop muted></video>
\`\`\`

## bad · missing

\`\`\`fvs
{ "length": 1 }
\`\`\`

\`\`\`html
<video src="missing.mp4"></video>
\`\`\`
`;

test('video in capture mode: seek resolves on the exact frame; failures resolve and are reported', { skip: !browser || !hasFfmpeg }, async () => {
  media();
  const { page, errors } = await capture(videoDoc, 'video');
  const state = await page.evaluate(() => [...document.querySelectorAll('video')].map(v => ({ muted: v.muted, autoplay: v.hasAttribute('autoplay'), controls: v.hasAttribute('controls'), playsinline: v.hasAttribute('playsinline'), preload: v.preload })));
  assert.deepEqual(state[0], { muted: true, autoplay: false, controls: false, playsinline: true, preload: 'auto' });
  const seek = (t, id) => page.evaluate(async ([x, sel]) => {
    const v = document.querySelector(`[data-scene="${sel}"] video`), shown = [];
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback((now, md) => shown.push(md.mediaTime));
    const t0 = performance.now();
    await window.__stage.seek(x);
    return { ct: v.currentTime, shown, paused: v.paused, ms: performance.now() - t0 };
  }, [t, id]);
  // v: content starts at -0.5; file time = 0.2 + (t + 0.5)
  let r = await seek(.3, 'v');
  assert.ok(Math.abs(r.ct - 1.0001) < 1e-3, `currentTime ${r.ct}`);
  assert.equal(r.paused, true);
  assert.ok(r.shown.length && Math.abs(r.shown[0] - 1.0) < 1e-3, `presented frame ${r.shown}`);
  r = await seek(.3 + 1 / 30, 'v');
  assert.ok(Math.abs(r.ct - (1.0001 + 1 / 30)) < 1e-3 && r.shown.length, JSON.stringify(r));
  r = await seek(.3 + 1 / 30, 'v');
  assert.ok(r.ms < 200, `the same frame again resolves at once (${r.ms} ms)`);
  r = await seek(1.9, 'v'); // 2.6 s into a 2 s file: held on its last frame
  const dur = await page.evaluate(() => document.querySelector('[data-scene="v"] video').duration);
  assert.ok(r.ct > dur - .002 && r.ct < dur, `clamped ${r.ct} (duration ${dur})`);
  // w loops: 1.8 + 0.5 = 2.3 → 0.3
  r = await seek(2.5, 'w');
  assert.ok(Math.abs(r.ct - .3001) < 1e-3, `looped ${r.ct}`);
  // a clip that cannot load neither throws nor stalls
  r = await seek(3.5, 'bad');
  assert.ok(r.ms < 2500, `failed video stalled ${r.ms} ms`);
  const errs = await page.evaluate(() => window.__stage.errors);
  assert.ok(errs.some(e => e.scene === 'bad' && /video "missing\.mp4" cannot be played/.test(e.message)), JSON.stringify(errs));
  assert.equal(errs.length, 1, JSON.stringify(errs));
  assert.deepEqual(errors, []);
  await page.close();
});

test('video in the sandboxed preview: plays on small steps, holds on transport stop, reports broken and unseekable clips', { skip: !browser || !hasFfmpeg }, async () => {
  media();
  // `stream` comes from an HTTP source without range requests (seekable [0, 0]): it would only ever show 0
  const p = P.parseProject(`${videoDoc.replace('missing.mp4', 'broken.mp4')}
## stream · stream

\`\`\`fvs
{ "length": 1 }
\`\`\`

\`\`\`html
<video src="media/stream.mp4"></video>
\`\`\`
`);
  const data = f => `data:video/mp4;base64,${readFileSync(join(dir, f)).toString('base64')}`;
  const urls = { 'clip.mp4': data('clip.mp4'), 'silent.mp4': data('silent.mp4'), 'broken.mp4': 'data:video/mp4;base64,AAAAAAAA', 'media/stream.mp4': 'http://fvs.test/stream/clip.mp4' };
  const html = buildHtml(compile(p, { resolve: rel => urls[rel] || rel }), RUNTIME, { mode: 'embed' });
  const page = await browser.newPage({ viewport: { width: 640, height: 480 } });
  // the Studio's host: media-src allows blob: but not data: (srcdoc frames inherit it), and its stream
  // URLs answer 200 without range requests
  const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:";
  const host = `<!doctype html><meta http-equiv="Content-Security-Policy" content="${CSP}"><iframe sandbox="allow-scripts" style="width:320px;height:240px;border:0"></iframe><script>window.msgs = []; addEventListener("message", e => msgs.push(e.data));</script>`;
  await page.route('http://fvs.test/**', r => (r.request().url().endsWith('/host.html')
    ? r.fulfill({ body: host, contentType: 'text/html' }) : r.fulfill({ body: readFileSync(join(dir, 'clip.mp4')), contentType: 'video/mp4' })));
  await page.goto('http://fvs.test/host.html');
  await page.evaluate(h => { document.querySelector('iframe').srcdoc = h; }, html);
  await page.waitForFunction(() => msgs.some(m => m.fvs === 'ready'));
  await page.waitForFunction(() => msgs.filter(m => m.fvs === 'media-error').length >= 2, null, { timeout: 10000 });
  await page.waitForTimeout(200);
  const errs = await page.evaluate(() => msgs.filter(m => m.fvs === 'media-error').map(({ fvs, scene, src }) => ({ fvs, scene, src })));
  // inlined clips play although the policy refuses data: media (the runtime hands them over as blob: URLs)
  assert.deepEqual(errs.sort((a, b) => a.scene.localeCompare(b.scene)), [{ fvs: 'media-error', scene: 'bad', src: 'broken.mp4' }, { fvs: 'media-error', scene: 'stream', src: 'media/stream.mp4' }]);
  const frame = page.frames().find(f => f !== page.mainFrame());
  const video = () => frame.evaluate(() => { const v = document.querySelector('[data-scene="v"] video'); return { paused: v.paused, ct: v.currentTime }; });
  const post = m => page.evaluate(x => document.querySelector('iframe').contentWindow.postMessage(x, '*'), m);
  // a jump holds the exact frame
  await post({ fvs: 'seek', t: .5 });
  await page.waitForTimeout(150);
  let v = await video();
  assert.equal(v.paused, true); assert.ok(Math.abs(v.ct - 1.2001) < 1e-3, `held at ${v.ct}`);
  // playback: steps of a frame play the clip natively
  await post({ fvs: 'transport', playing: true });
  let t = .5; // the file time is 0.7 + t; the clip is 2 s long, so stay below t = 1.2
  for (let k = 0; k < 15; k++) { t += 1 / 60; await post({ fvs: 'seek', t }); await page.waitForTimeout(16); }
  v = await video();
  assert.equal(v.paused, false, 'plays while seeks step forward');
  // stop: paused at once, on the frame of the last seek
  await post({ fvs: 'transport', playing: false });
  await page.waitForTimeout(40);
  v = await video();
  assert.equal(v.paused, true, 'transport stop pauses');
  assert.ok(Math.abs(v.ct - (.2 + t + 1e-4 + .5)) < .02, `held at ${v.ct}, want ${.2 + t + .5}`);
  // stepping a frame while stopped seeks exactly, without playing
  await post({ fvs: 'seek', t: t + 1 / 30 });
  await page.waitForTimeout(60);
  v = await video();
  assert.equal(v.paused, true); assert.ok(Math.abs(v.ct - (.2 + t + 1 / 30 + 1e-4 + .5)) < 1e-3, `stepped to ${v.ct}`);
  // without transport messages: forward steps play, and 150 ms without a seek pauses
  await post({ fvs: 'transport', playing: true });
  for (let k = 0; k < 12; k++) { t += 1 / 60; await post({ fvs: 'seek', t }); await page.waitForTimeout(16); }
  assert.ok(t < 1.2);
  assert.equal((await video()).paused, false);
  await page.waitForTimeout(300);
  assert.equal((await video()).paused, true, 'the idle watchdog pauses');
  await page.close();
});

/* ───────── the CLI ───────── */

test('CLI: info, check and render mix the score, a trimmed track and video sound', { skip: !browser || !hasFfmpeg }, async () => {
  media();
  const cli = process.env.FVS_CLI || join(root, 'tools/fvs.mjs');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  const doc = join(dir, 'mix.fvs.md');
  // score (220 Hz) 0–1 s; the clip's 660 Hz while scene two is on (1–3 s); noise is muted; silent.mp4 has no sound
  writeFileSync(doc, `# Mix

\`\`\`fvs
{ "fvs": 1, "width": 320, "height": 180, "fps": 10, "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "audio": [{ "src": "tone.wav", "in": "1 beat", "dur": "2 beats" }, { "src": "noise.wav", "mute": true }] }
\`\`\`

## one · One

\`\`\`fvs
{ "length": "2 beats" }
\`\`\`

\`\`\`html
<p>one</p>
\`\`\`

## two · Two

\`\`\`fvs
{ "length": "4 beats", "in": "1 beat", "transition": "fade" }
\`\`\`

\`\`\`html
<video src="clip.mp4" data-clip-in="0.1"></video>
\`\`\`

## three · Three

\`\`\`fvs
{ "length": "2 beats", "transition": { "type": "push-left", "dur": "1 beat" } }
\`\`\`

\`\`\`html
<video src="silent.mp4" loop></video>
\`\`\`
`);
  const info = run('info', doc);
  assert.equal(info.status, 0, info.stderr);
  assert.match(info.stdout, /in 1 beat \(0\.5 s; content starts at 0\.50\) · transition fade 0\.5 s/);
  assert.match(info.stdout, /video clip\.mp4 · from 0\.1 s into the file/);
  assert.match(info.stdout, /audio track: noise\.wav \(muted\)/);
  const check = run('check', doc, '--runtime');
  assert.equal(check.status, 0, check.stderr + check.stdout);
  const out = join(dir, 'mix.mp4');
  const render = run('render', doc, '--out', out, '--workers', '1');
  assert.equal(render.status, 0, render.stderr + render.stdout);
  const probe = spawnSync(FFMPEG, ['-hide_banner', '-i', out], { encoding: 'utf8' }).stderr;
  assert.match(probe, /Video: h264/); assert.match(probe, /Audio: aac/);
  // decode the mix and count zero crossings: 220 Hz ≈ 440/s, 660 Hz ≈ 1320/s, noise far more
  const pcm = spawnSync(FFMPEG, ['-v', 'error', '-i', out, '-vn', '-ac', '1', '-ar', '22050', '-f', 'f32le', '-'], { maxBuffer: 1 << 28 }).stdout;
  const x = new Float32Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 4));
  const zcr = (a, b) => { let n = 0, e = 0; const i0 = Math.round(a * 22050), i1 = Math.round(b * 22050); for (let i = i0 + 1; i < i1; i++) { if ((x[i] >= 0) !== (x[i - 1] >= 0)) n++; e += x[i] * x[i]; } return { hz: n / (b - a) / 2, rms: Math.sqrt(e / (i1 - i0)) }; };
  const score = zcr(.2, .8), clip = zcr(1.2, 2.2); // the clip's sound runs from file time 0.6 to its end (~2 s)
  assert.ok(score.rms > .05 && Math.abs(score.hz - 220) < 30, `score ${JSON.stringify(score)}`);
  assert.ok(clip.rms > .05 && Math.abs(clip.hz - 660) < 60, `clip ${JSON.stringify(clip)}`);
  // a project that names a file that is not there fails its check, readably
  writeFileSync(doc, readFileSync(doc, 'utf8').replace('silent.mp4', 'gone.mp4'));
  const bad = run('check', doc);
  assert.notEqual(bad.status, 0);
  assert.match(bad.stderr, /error line \d+ \[three\]: video file not found: gone\.mp4/);
});

/* ───────── captions ───────── */

const captionsDoc = (extra = '') => `# Captions

\`\`\`fvs
{ "fvs": 1, "width": 320, "height": 180, "fps": 10, "background": "#000"${extra} }
\`\`\`

\`\`\`srt
1
00:00:00,500 --> 00:00:01,500
<i>第一行</i>
second line

2
00:00:01,000 --> 00:00:02,000
overlap
\`\`\`

## one · One

\`\`\`fvs
{ "length": "3s" }
\`\`\`

\`\`\`html
<p style="margin:0;color:#000">pick me</p>
\`\`\`
`;

test('captions: drawn over the picture on project time, under no pointer, styled by the project setting', { skip: !browser }, async () => {
  const { page, errors } = await capture(captionsDoc(), 'captions');
  const at = async t => { await page.evaluate(x => __stage.seek(x), t); return page.evaluate(() => [...document.querySelectorAll('.fvs-caption')].map(e => e.textContent)); };
  assert.deepEqual(await at(.2), []);
  assert.deepEqual(await at(.6), ['第一行\nsecond line']);
  assert.deepEqual(await at(1.2), ['第一行\nsecond line', 'overlap']);
  assert.deepEqual(await at(1.5), ['overlap']);
  assert.deepEqual(await at(2), []);
  await at(.6);
  const look = await page.evaluate(() => {
    const layer = document.querySelector('.fvs-captions'), c = layer.firstChild.getBoundingClientRect();
    return { last: layer === document.querySelector('.fvs-stage').lastElementChild, pe: getComputedStyle(layer).pointerEvents, ws: getComputedStyle(layer.firstChild).whiteSpace, size: layer.style.fontSize, bottom: c.bottom, pos: layer.dataset.position };
  });
  assert.deepEqual({ ...look, bottom: look.bottom > 150 && look.bottom < 180 }, { last: true, pe: 'none', ws: 'pre-line', size: '8px', bottom: true, pos: 'bottom' });
  assert.deepEqual(errors, []);
  await page.close();
  // a cue's edges are the frame's own time (not the seek nudge), and nothing in the project draws over it
  const edge = await capture(captionsDoc().replace('"fps": 10', '"fps": 59').replace('00:00:00,500 --> 00:00:01,500', '00:00:00,000 --> 00:00:00,017')
    .replace('<p style="margin:0;color:#000">pick me</p>', '<div style="position:absolute;inset:0;z-index:99999;background:#000"></div>'), 'captions-edge');
  // (hit-testing skips pointer-events:none, so lift that for the probe)
  const shownAt = t => edge.page.evaluate(x => {
    __stage.seek(x);
    const c = document.querySelector('.fvs-caption'); if (!c) return null;
    c.parentElement.style.pointerEvents = 'auto';
    const r = c.getBoundingClientRect(), top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    c.parentElement.style.pointerEvents = '';
    return top === c || c.contains(top);
  }, t);
  assert.equal(await shownAt(1 / 59), true, 'frame 1 at 59 fps (0.01695 s) is inside a cue ending at 0.017 s, on top of a z-index 99999 layer');
  assert.equal(await shownAt(2 / 59), null);
  await edge.page.close();
  const top = await capture(captionsDoc(', "captions": { "position": "top", "size": "large" }'), 'captions-top');
  await top.page.evaluate(() => __stage.seek(.6));
  const r = await top.page.evaluate(() => { const l = document.querySelector('.fvs-captions'); return { pos: l.dataset.position, size: l.style.fontSize, top: l.firstChild.getBoundingClientRect().top }; });
  assert.equal(r.pos, 'top'); assert.equal(r.size, '10px'); assert.ok(r.top < 40, `top ${r.top}`);
  await top.page.close();
});

test('CLI: captions command, info line, still burns captions in, render --no-captions leaves them out', { skip: !browser || !hasFfmpeg }, async () => {
  const cli = process.env.FVS_CLI || join(root, 'tools/fvs.mjs');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' });
  const doc = join(dir, 'caps.fvs.md');
  writeFileSync(doc, captionsDoc().replace('"background": "#000"', '"background": "#000000"'));
  const srt = run('captions', doc);
  assert.equal(srt.status, 0, srt.stderr);
  assert.equal(srt.stdout, '1\n00:00:00,500 --> 00:00:01,500\n<i>第一行</i>\nsecond line\n\n2\n00:00:01,000 --> 00:00:02,000\noverlap\n');
  assert.match(run('info', doc).stdout, /captions: 2 cues, 0\.50–2\.00 s on project time/);
  // a block with an unreadable cue is not exported as if it were complete
  const broken = join(dir, 'caps-broken.fvs.md');
  writeFileSync(broken, captionsDoc().replace('00:00:01,000 --> 00:00:02,000', '00:00:01,000 -> 00:00:02,000'));
  const refused = run('captions', broken, '--out', join(dir, 'broken.srt'));
  assert.notEqual(refused.status, 0); assert.match(refused.stderr, /1 caption error/);
  assert.equal(run('captions', broken, '--force').stdout, '1\n00:00:00,500 --> 00:00:01,500\n<i>第一行</i>\nsecond line\n');
  // brightness of the lower middle of a frame: the white caption text against a black stage
  const light = png => { const r = spawnSync(FFMPEG, ['-v', 'error', '-i', png, '-vf', 'crop=200:40:60:130,format=gray', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 24 }).stdout; return r.reduce((m, v) => Math.max(m, v), 0); };
  const still = join(dir, 'caps.png');
  assert.equal(run('still', doc, '--at', '0.6', '--out', still).status, 0);
  assert.ok(light(still) > 200, 'the caption is in the still');
  for (const [flag, lit] of [[[], true], [['--no-captions'], false]]) {
    const out = join(dir, `caps${flag.length}.mp4`), frame = join(dir, `caps${flag.length}.png`);
    const r = run('render', doc, '--out', out, '--from', '0.6', '--to', '0.8', '--workers', '1', ...flag);
    assert.equal(r.status, 0, r.stderr + r.stdout);
    ff('-i', out, '-frames:v', '1', frame);
    assert.equal(light(frame) > 200, lit, `render ${flag.join(' ') || '(captions on)'}`);
  }
});
