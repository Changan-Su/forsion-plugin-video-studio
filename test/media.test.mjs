// In-points, splits, transitions, runtime-owned video and audio segments: the DOM-free half.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as P from '../src/lib/project.js';
import { compile, buildHtml, audioTracks, audioSegments, assetRefs } from '../src/lib/compile.js';
import { videos, images, setAttr } from '../src/lib/html.js';
import { syncReport } from '../src/lib/onsets.js';
import { audioGraph } from '../src/cli/render.js';
import { TRANSITION_TYPES } from '../src/runtime/player.js';

const here = dirname(fileURLToPath(import.meta.url));
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9, `${msg || ''} ${a} ≠ ${b}`);

// 150 BPM: a beat is 0.4 s, a bar 1.6 s
const DOC = `# Media

\`\`\`fvs
{ "fvs": 1, "width": 1280, "height": 720, "fps": 30, "tempo": { "bpm": 150, "beatsPerBar": 4 },
  "audio": [{ "src": "audio/score.mp3", "in": "1 bar", "dur": 20, "gain": -2 }, { "src": "audio/room.wav", "mute": true }, "audio/plain.mp3"] }
\`\`\`

## open · 开场

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 4] }
\`\`\`

\`\`\`html
<h1 data-in="h0">Open</h1>
\`\`\`

A note that must survive.

## clip · 素材

\`\`\`fvs
{ "length": "1 bar", "in": "2 beats", "hits": [0, 1, 2, 4, 6], "transition": "fade", "class": "full" }
\`\`\`

\`\`\`html
<video src="assets/a.mp4" data-clip-in="1.5" data-gain="-6" poster="assets/a.jpg"></video>
<p>caption</p><img src="assets/still.png">
<video muted loop><source src="./assets/b.webm" type="video/webm"><source src="assets/b.mp4"></video>
\`\`\`

\`\`\`css
video { width: 100% }
\`\`\`

\`\`\`js
K('p', [[t0, { o: 0 }], [hits[2], { o: 1 }]])
\`\`\`

## end · 结尾

\`\`\`fvs
{ "length": "2 bars", "hits": [0], "transition": { "type": "push-left", "dur": "1 bar" } }
\`\`\`

\`\`\`html
<p>End</p>
\`\`\`
`;

test('in-point: content start, hit times and visible hits', () => {
  const p = P.parseProject(DOC);
  assert.deepEqual(p.errors, [], JSON.stringify(p.errors));
  const [open, clip, end] = p.scenes;
  assert.equal(open.in, 0); assert.equal(open.t0v, open.t0);
  near(clip.t0, 3.2); near(clip.in, .8); near(clip.t0v, 2.4); near(clip.t1, 4.8); near(clip.dur, 1.6);
  // every hit counts from the content start, visible or not; indices stay stable
  assert.deepEqual(clip.hitTimes, [2.4, 2.8, 3.2, 4.0, 4.8]);
  assert.deepEqual(P.visibleHits(clip), [{ index: 2, t: 3.2 }, { index: 3, t: 4.0 }, { index: 4, t: 4.8 }]);
  near(end.t0, 4.8); near(p.length, 8);
  // the cue sheet only lists what is on screen, and says where the content starts
  const cue = P.cueSheet(p).scenes[1];
  assert.deepEqual(cue.hits, [2, 4, 6]); assert.deepEqual(cue.hitTimes, [3.2, 4, 4.8]);
  assert.equal(cue.in, .8); assert.deepEqual(cue.transition, { type: 'fade', dur: .4 });
  assert.equal('in' in P.cueSheet(p).scenes[0], false);
  // sync checks only the visible hits and keeps their indices
  const rows = syncReport(p.scenes, { env: new Float32Array(2000), rms: new Float32Array(2000), block: .005, hop: .0058, offset: .023 });
  assert.deepEqual(rows.filter(r => r.scene === 'clip').map(r => r.hit), [2, 3, 4]);
  // length strings, seconds, negative and garbage
  assert.equal(P.parseProject(DOC.replace('"in": "2 beats"', '"in": 1.25')).scenes[1].in, 1.25);
  const neg = P.parseProject(DOC.replace('"in": "2 beats"', '"in": "-1 beat"'));
  assert.ok(neg.errors.some(e => e.level === 'error' && e.scene === 'clip' && /"in" must not be negative/.test(e.message)), JSON.stringify(neg.errors));
  assert.equal(neg.scenes[1].in, 0);
  const bad = P.parseProject(DOC.replace('"in": "2 beats"', '"in": "soon"'));
  assert.ok(bad.errors.some(e => e.level === 'error' && /^"in": cannot read length/.test(e.message)));
});

test('hit warnings: trimmed hits are fine, a split continuation is fine, a stray hit is not', () => {
  // clip shows beats 2–6 of its content; 9 lies past the end and nothing continues it
  const p = P.parseProject(DOC.replace('[0, 1, 2, 4, 6]', '[0, 1, 2, 4, 6, 9]'));
  assert.ok(p.errors.some(e => e.scene === 'clip' && /a hit falls outside the scene \(0–6 beats\)/.test(e.message)), JSON.stringify(p.errors));
  // the old message for scenes without an in-point is unchanged
  const q = P.parseProject(DOC.replace('"hits": [0, 4] }', '"hits": [0, 9] }'));
  assert.ok(q.errors.some(e => e.scene === 'open' && e.message === 'a hit falls outside the scene (0–8 beats)'));
});

test('transitions: parse, default length, clamping, first scene, unknown type', () => {
  assert.deepEqual(P.TRANSITIONS, ['fade', 'dip', 'slide-left', 'slide-up', 'push-left', 'wipe-left', 'zoom', 'blur']);
  assert.deepEqual(TRANSITION_TYPES, P.TRANSITIONS, 'the runtime implements exactly these');
  const p = P.parseProject(DOC);
  assert.equal(p.scenes[0].transition, null);
  assert.deepEqual(p.scenes[1].transition, { type: 'fade', dur: .4 }); // default: one beat
  // "1 bar" (1.6 s) is clamped to the shorter neighbour: clip is 1.6 s, end 3.2 s
  near(p.scenes[2].transition.dur, 1.6); assert.equal(p.scenes[2].transition.type, 'push-left');
  const long = P.parseProject(DOC.replace('"transition": "fade"', '"transition": { "type": "zoom", "dur": "4 bars" }'));
  near(long.scenes[1].transition.dur, 1.6, 'clamped to its own length');
  // splitting the scene before a transition must not change it (the transition plays after the cut)
  const before = P.parseProject(DOC).scenes[2].transition;
  const cut = P.parseProject(P.splitScene(DOC, 'clip', P.parseProject(DOC).scenes[1].t0 + .4, 'clip-b'));
  assert.deepEqual(cut.scenes.find(s => s.id === 'end').transition, before, 'a split before a transition leaves it alone');
  const ids = s => P.visibleHits(s).map(h => h.index);
  const halves = P.parseProject(P.splitScene(DOC, 'open', 1.6, 'open-b'));
  assert.ok(!ids(halves.scenes[0]).some(i => ids(halves.scenes[1]).includes(i)), 'a hit on the split point is counted once');
  const noTempo = P.parseProject(DOC.replace(', "tempo": { "bpm": 150, "beatsPerBar": 4 }', '').replace(/"(\d) bars?"/g, '$1').replace(/"(\d) beats?"/g, '$1'));
  assert.deepEqual(noTempo.scenes[1].transition, { type: 'fade', dur: .5 }); // default without a tempo: 0.5 s
  const first = P.parseProject(DOC.replace('{ "length": "2 bars", "hits": [0, 4] }', '{ "length": "2 bars", "hits": [0, 4], "transition": "blur" }'));
  assert.equal(first.scenes[0].transition, null);
  assert.ok(first.errors.some(e => e.level === 'warning' && e.scene === 'open' && /first scene/.test(e.message)));
  const unknown = P.parseProject(DOC.replace('"transition": "fade"', '"transition": "spin"'));
  assert.ok(unknown.errors.some(e => e.level === 'error' && /unknown transition "spin" \(use fade, dip/.test(e.message)));
  assert.equal(unknown.scenes[1].transition, null);
  const odd = P.parseProject(DOC.replace('"transition": "fade"', '"transition": { "dur": 1 }'));
  assert.ok(odd.errors.some(e => e.level === 'error' && /"transition" must be a type/.test(e.message)));
});

test('setSceneIn and setTransition round trip and touch only the settings block', () => {
  let s = P.setSceneIn(DOC, 'open', 0.8);
  assert.ok(s.includes('{ "length": "2 bars", "in": "2 beats", "hits": [0, 4] }'), 'a new in goes right after length');
  assert.equal(s.replace('"in": "2 beats", ', ''), DOC, 'nothing else changed');
  near(P.sceneById(P.parseProject(s), 'open').in, .8);
  s = P.setSceneIn(s, 'open', 1.6);
  assert.ok(s.includes('{ "length": "2 bars", "in": "1 bar", "hits": [0, 4] }'));
  assert.equal(P.setSceneIn(s, 'open', 0), DOC, '0 removes the key');
  assert.equal(P.setSceneIn(s, 'open', -3), DOC, 'negative clamps to 0');
  assert.equal(P.setSceneIn(s, 'open', 1e-9), DOC, '~0 removes the key');
  assert.throws(() => P.setSceneIn(DOC, 'open', NaN), /in-point must be a number/);
  assert.throws(() => P.setSceneIn(DOC, 'nope', 1), /no scene "nope"/);
  const noTempo = DOC.replace(', "tempo": { "bpm": 150, "beatsPerBar": 4 }', '');
  assert.ok(P.setSceneIn(noTempo, 'open', 1.25).includes('"in": "1.25s"'));

  let t = P.setTransition(DOC, 'end', 'wipe-left');
  assert.ok(t.includes('{ "length": "2 bars", "hits": [0], "transition": "wipe-left" }'));
  assert.equal(P.parseProject(t).scenes[2].transition.type, 'wipe-left');
  t = P.setTransition(t, 'end', 'dip', 0.8);
  assert.ok(t.includes('"transition": { "type": "dip", "dur": "2 beats" }'));
  near(P.parseProject(t).scenes[2].transition.dur, .8);
  t = P.setTransition(t, 'end', null);
  assert.ok(t.includes('{ "length": "2 bars", "hits": [0] }'));
  assert.equal(t.replace('{ "length": "2 bars", "hits": [0] }', '{ "length": "2 bars", "hits": [0], "transition": { "type": "push-left", "dur": "1 bar" } }'), DOC);
  assert.throws(() => P.setTransition(DOC, 'end', 'spin'), /unknown transition "spin"/);
  assert.throws(() => P.setTransition(DOC, 'end', 'fade', 0), /positive/);
});

test('splitScene: two halves that play on as one, later scenes unchanged', () => {
  const before = P.parseProject(DOC);
  const at = 3.2 + 0.6; // 1.5 beats into clip's visible part
  const out = P.splitScene(DOC, 'clip', at, 'clip-b');
  const p = P.parseProject(out);
  assert.deepEqual(p.errors, [], JSON.stringify(p.errors));
  assert.deepEqual(p.scenes.map(s => s.id), ['open', 'clip', 'clip-b', 'end']);
  const [, a, b, end] = p.scenes;
  near(a.t0, 3.2); near(a.t1, at); near(a.in, .8);
  near(b.t0, at); near(b.t1, 4.8); near(b.in, .8 + .6); near(b.t0v, a.t0v, 'same content start');
  assert.equal(a.meta.length, '1.5 beats'); assert.equal(b.meta.length, '2.5 beats'); assert.equal(b.meta.in, '3.5 beats');
  // same everything except length, in and the transition
  assert.equal(b.title, a.title); assert.equal(b.html, a.html); assert.equal(b.css, a.css); assert.equal(b.js, a.js);
  assert.deepEqual(b.hits, a.hits); assert.equal(b.meta.class, 'full');
  assert.deepEqual(Object.keys(b.meta), ['length', 'in', 'hits', 'class']);
  assert.deepEqual(a.transition, before.scenes[1].transition); assert.equal(b.transition, null);
  // the hits are where they were; each half shows its own
  assert.deepEqual(a.hitTimes, before.scenes[1].hitTimes); assert.deepEqual(b.hitTimes, before.scenes[1].hitTimes);
  assert.deepEqual(P.visibleHits(a).map(h => h.index), [2]);
  assert.deepEqual(P.visibleHits(b).map(h => h.index), [3, 4]);
  // later scenes do not move
  near(end.t0, before.scenes[2].t0); assert.deepEqual(end.hitTimes, before.scenes[2].hitTimes); near(p.length, before.length);
  // byte-surgical: the first half's settings block and one new section, nothing else
  // (longer than a line, so the settings formatter wraps it, as every settings edit does)
  const firstHalf = '{\n  "length": "1.5 beats",\n  "in": "2 beats",\n  "hits": [0, 1, 2, 4, 6],\n  "transition": "fade",\n  "class": "full"\n}';
  const section = `## clip-b · 素材\n\n\`\`\`fvs\n{ "length": "2.5 beats", "in": "3.5 beats", "hits": [0, 1, 2, 4, 6], "class": "full" }\n\`\`\`\n\n\`\`\`html\n${a.html}\n\`\`\`\n\n\`\`\`css\n${a.css}\n\`\`\`\n\n\`\`\`js\n${a.js}\n\`\`\`\n\n`;
  const expected = DOC.replace('{ "length": "1 bar", "in": "2 beats", "hits": [0, 1, 2, 4, 6], "transition": "fade", "class": "full" }', firstHalf).replace('## end · 结尾', `${section}## end · 结尾`);
  assert.equal(out, expected);
  // a scene without an in-point gets one in its second half; the copy keeps its notes out
  const o = P.parseProject(P.splitScene(DOC, 'open', 1.0, 'open-2'));
  assert.equal(o.scenes[0].meta.length, '2.5 beats'); assert.equal('in' in o.scenes[0].meta, false);
  assert.equal(o.scenes[1].meta.in, '2.5 beats'); near(o.scenes[1].t0v, 0);
  assert.equal(o.errors.length, 0, 'hits past the first half are not flagged: the next scene continues it');
  // a missing id is made up; bad ids and times are refused before anything changes
  assert.equal(P.parseProject(P.splitScene(DOC, 'clip', at)).scenes[2].id, 'clip-2');
  assert.throws(() => P.splitScene(DOC, 'clip', at, 'end'), /scene id "end" is taken/);
  assert.throws(() => P.splitScene(DOC, 'clip', at, '9x'), /must start with a letter/);
  assert.throws(() => P.splitScene(DOC, 'clip', 3.2, 'x'), /cannot split scene "clip" at 3.2 s: pick a time between 3.233 and 4.767 s/);
  assert.throws(() => P.splitScene(DOC, 'clip', 4.8 - 1 / 60, 'x'), /at least one frame/);
  assert.throws(() => P.splitScene(DOC, 'clip', 10, 'x'), /pick a time between/);
  assert.doesNotThrow(() => P.splitScene(DOC, 'clip', 3.2 + 1 / 30, 'x'));
});

test('rollCut moves a trimmed next scene\'s in-point; untrimmed scenes keep the old roll', () => {
  const split = P.splitScene(DOC, 'clip', 3.8, 'clip-b');
  // the cut between the halves moves 1 beat later: clip-b's content stays put, its hits too
  const later = P.parseProject(P.rollCut(split, 'clip', 1.0));
  const [, a, b] = later.scenes;
  near(a.dur, 1.0); near(b.t0, 4.2); near(b.dur, .6); near(b.in, 1.8); near(b.t0v, 2.4);
  assert.deepEqual(b.hits, [0, 1, 2, 4, 6]);
  // earlier: the in-point absorbs it while it can
  const earlier = P.parseProject(P.rollCut(split, 'clip', .2));
  near(earlier.scenes[2].in, 1.0); near(earlier.scenes[2].t0v, 2.4); assert.deepEqual(earlier.scenes[2].hits, [0, 1, 2, 4, 6]);
  // past in = 0 the rest moves the content, and the hits are rebased so they keep their absolute times
  const far = P.parseProject(P.rollCut(P.setSceneIn(split, 'clip-b', .2), 'clip', .2));
  const fb = far.scenes[2];
  assert.equal(fb.in, 0); assert.equal('in' in fb.meta, false); near(fb.t0, 3.4);
  assert.deepEqual(fb.hits, [0.5, 1.5, 2.5, 4.5, 6.5]); // content start 3.6 → 3.4
  assert.deepEqual(fb.hitTimes, P.parseProject(P.setSceneIn(split, 'clip-b', .2)).scenes[2].hitTimes);
  // a next scene without an in-point: the 0.4 roll, content and hits rebased
  const plain = P.parseProject(P.rollCut(DOC, 'clip', 1.2)).scenes[2];
  assert.equal(plain.meta.length, '9 beats'); assert.deepEqual(plain.meta.hits, [1]); assert.equal('in' in plain.meta, false);
  near(plain.hitTimes[0], 4.8);
});

test('duplicateScene takes an optional exact title; insertScene writes css and js blocks', () => {
  let s = P.duplicateScene(DOC, 'open', 'open-copy', 'Open (copy)');
  assert.equal(P.sceneById(P.parseProject(s), 'open-copy').title, 'Open (copy)');
  s = P.duplicateScene(DOC, 'open', 'open-copy');
  assert.equal(P.sceneById(P.parseProject(s), 'open-copy').title, '开场（副本）');
  s = P.duplicateScene(DOC, 'open', 'open-copy', '');
  assert.equal(P.sceneById(P.parseProject(s), 'open-copy').title, '');
  s = P.insertScene(DOC, 'open', { id: 'media', title: 'Media', meta: { length: '1 bar' }, html: '<video src="assets/c.mp4"></video>', css: 'video{width:100%}', js: 'fade(\'video\', t0)' });
  const m = P.sceneById(P.parseProject(s), 'media');
  assert.equal(m.html, '<video src="assets/c.mp4"></video>'); assert.equal(m.css, 'video{width:100%}'); assert.equal(m.js, 'fade(\'video\', t0)');
  assert.deepEqual(P.parseProject(s).scenes.map(x => x.id), ['open', 'media', 'clip', 'end']);
});

test('videos(): attributes, <source> fallback, numbering shared with images() and setAttr', () => {
  const s = P.sceneById(P.parseProject(DOC), 'clip');
  const v = videos(s.html);
  assert.deepEqual(v.map(({ tag, ...x }) => x), [
    { src: 'assets/a.mp4', clipIn: 1.5, gain: -6, muted: false, loop: false },
    { src: './assets/b.webm', clipIn: 0, gain: 0, muted: true, loop: true },
  ]);
  assert.equal(images(s.html)[0].tag, 2, 'one tag index space for every element');
  let html = setAttr(s.html, v[0].tag, 'data-clip-in', '3');
  html = setAttr(html, v[1].tag, 'muted', null);
  const w = videos(html);
  assert.equal(w[0].clipIn, 3); assert.equal(w[1].muted, false); assert.equal(w[1].loop, true);
  assert.deepEqual(videos('<video src="x.mp4"/><p>a</p><video><source src="y.mp4"></video>').map(x => x.src), ['x.mp4', 'y.mp4']);
  assert.deepEqual(videos('<video src=x.mp4 data-clip-in=-2 data-gain=oops></video>')[0], { tag: 0, src: 'x.mp4', clipIn: 0, gain: 0, muted: false, loop: false });
});

test('audio tracks: in, dur and mute', () => {
  const p = P.parseProject(DOC);
  const [score, room, plain] = audioTracks(p.meta);
  assert.deepEqual(score, { id: 'a0', src: 'audio/score.mp3', at: 0, gain: -2, role: 'score', in: 1.6, dur: 20, mute: false });
  assert.deepEqual(room, { id: 'a1', src: 'audio/room.wav', at: 0, gain: 0, role: 'track', in: 0, dur: null, mute: true });
  assert.deepEqual(plain, { id: 'a2', src: 'audio/plain.mp3', at: 0, gain: 0, role: 'track', in: 0, dur: null, mute: false });
  // bad values never throw here; parseProject reports them
  const bad = DOC.replace('"in": "1 bar", "dur": 20', '"in": -1, "dur": "forever"');
  assert.deepEqual(audioTracks(P.parseProject(bad).meta)[0].in, 0);
  assert.equal(audioTracks(P.parseProject(bad).meta)[0].dur, null);
  const msgs = P.parseProject(bad).errors.map(e => e.message);
  assert.ok(msgs.includes('audio track 1 (audio/score.mp3) "in": must not be negative'), msgs.join('\n'));
  assert.ok(msgs.some(m => /audio track 1 \(audio\/score\.mp3\) "dur": cannot read length "forever"/.test(m)), msgs.join('\n'));
});

test('compile: video assets, media segments and audioSegments', () => {
  const p = P.parseProject(DOC);
  const s = P.sceneById(p, 'clip');
  assert.deepEqual(assetRefs(s.html, s.css).sort(), ['assets/a.jpg', 'assets/a.mp4', 'assets/b.mp4', 'assets/b.webm', 'assets/still.png']);
  const payload = compile(p, { resolve: u => `asset://${u}` });
  const sc = payload.scenes[1];
  assert.ok(sc.html.includes('src="asset://assets/a.mp4"') && sc.html.includes('poster="asset://assets/a.jpg"') && sc.html.includes('src="asset://assets/b.webm"'));
  near(sc.t0v, 2.4); near(sc.in, .8); assert.deepEqual(sc.transition, { type: 'fade', dur: .4 });
  // the muted clip adds no sound; the other plays from data-clip-in + the scene's in-point while the scene is on
  assert.equal(payload.media.length, 1);
  const m = payload.media[0];
  assert.deepEqual({ ...m, at: +m.at.toFixed(9), in: +m.in.toFixed(9), dur: +m.dur.toFixed(9) }, { id: 'clip/video-0', scene: 'clip', src: 'assets/a.mp4', at: 3.2, in: 2.3, dur: 1.6, gain: -6, loop: false, url: 'asset://assets/a.mp4' });
  assert.equal(payload.audio[0].in, 1.6); assert.equal(payload.audio[1].mute, true);
  const segs = audioSegments(payload);
  assert.deepEqual(segs.map(x => [x.id, x.kind, x.url, x.mute]), [
    ['a0', 'track', 'asset://audio/score.mp3', false], ['a1', 'track', 'asset://audio/room.wav', true],
    ['a2', 'track', 'asset://audio/plain.mp3', false], ['clip/video-0', 'video', 'asset://assets/a.mp4', false],
  ]);
  const v = segs[3];
  assert.deepEqual([v.src, +v.at.toFixed(9), +v.in.toFixed(9), +v.dur.toFixed(9), v.gain, v.scene, v.loop], ['assets/a.mp4', 3.2, 2.3, 1.6, -6, 'clip', false]);
  assert.deepEqual(Object.keys(segs[0]).slice(0, 9), ['id', 'kind', 'src', 'url', 'at', 'in', 'dur', 'gain', 'mute']);
  // a parsed project gives the same list with project-relative urls
  assert.deepEqual(audioSegments(p).map(x => [x.id, x.url]), [['a0', 'audio/score.mp3'], ['a1', 'audio/room.wav'], ['a2', 'audio/plain.mp3'], ['clip/video-0', 'assets/a.mp4']]);
  // the page carries an inlined clip once: the sound reuses the asset url
  const html = buildHtml(compile(p, { resolve: u => `data:x;base64,${u.length}${'A'.repeat(500)}` }), 'var FVS={boot(){}}', { mode: 'player' });
  const data = JSON.parse(html.match(/<script type="application\/json" id="fvs-data">(.*)<\/script>/)[1]);
  assert.equal(data.media[0].url, null);
  assert.equal(audioSegments(data)[3].url, data.assets['assets/a.mp4']);
});

test('ffmpeg graph: a plain track is unchanged, segments trim, delay and loop', () => {
  const file = a => `/p/${a.src}`;
  // the 0.4 graphs, byte for byte
  assert.deepEqual(audioGraph([{ src: 's.mp3', at: 0, gain: 0, in: 0, dur: null }], 0, file), { args: ['-i', '/p/s.mp3'], filter: '[1:a]volume=0dB[a0]', out: '[a0]' });
  assert.equal(audioGraph([{ src: 's.mp3', at: 0, gain: -3, in: 0, dur: null }, { src: 't.wav', at: 2.5, gain: 0, in: 0, dur: null }], 1, file).filter,
    '[1:a]atrim=start=1,asetpts=PTS-STARTPTS,volume=-3dB[a0];[2:a]adelay=1500:all=1,volume=0dB[a1];[a0][a1]amix=inputs=2:normalize=0[aout]');
  const g = audioGraph([{ src: 's.mp3', at: 0, gain: 0, in: 1.6, dur: 20 }, { src: 'v.mp4', at: 3.2, gain: -6, in: 2.3, dur: 1.6, loop: true }], 0, file);
  assert.deepEqual(g.args, ['-i', '/p/s.mp3', '-stream_loop', '-1', '-i', '/p/v.mp4']);
  assert.equal(g.filter, '[1:a]atrim=start=1.6:duration=20,asetpts=PTS-STARTPTS,volume=0dB[a0];[2:a]atrim=start=2.3:duration=1.6,asetpts=PTS-STARTPTS,adelay=3200:all=1,volume=-6dB[a1];[a0][a1]amix=inputs=2:normalize=0[aout]');
  assert.equal(g.out, '[aout]');
});

test('the bundled example is untouched by all of this', () => {
  const src = readFileSync(join(here, '../examples/episode-2.12/episode-2.12.fvs.md'), 'utf8');
  const p = P.parseProject(src);
  assert.equal(P.serializeTokens(p.toks, p.eol), src);
  assert.deepEqual(p.errors, []);
  for (const s of p.scenes) { assert.equal(s.in, 0); assert.equal(s.t0v, s.t0); assert.equal(s.transition, null); assert.equal(P.visibleHits(s).length, s.hits.length); }
  const payload = compile(p);
  assert.deepEqual(payload.media, []);
  assert.deepEqual(audioSegments(payload).map(a => [a.kind, a.in, a.dur, a.mute]), [['track', 0, null, false]]);
});
