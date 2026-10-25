// `fvs review` against HyperFrames for real: npx, its headless Chrome, the pinned release (the first run downloads
// ~330 MB). No model. What has to hold:
//   defects   test/fixtures/review: the three planted mistakes are found in their scene (a headline running into the
//             line below, that line at 1.2:1, a panel over it), and the caption over a video clip is looked at with
//             the clip's frame on screen (its contrast is measured against the footage)
//   marked    data-layout-allow-occlusion on the covered line takes that finding away (what the skill tells the
//             Director to do with a deliberate choice)
//   corner    a clip left at a quarter of the frame is reported as footage_not_filling (our own check, a browser of
//             ours: HyperFrames does not look for it); data-layout-ignore on it takes that away
//   example   the bundled example passes HyperFrames' lint (the runtime is loaded from a file, not inline) so the
//             browser pass runs, its scripts run clean, and the project's asset folders are untouched afterwards
//   advice    findings never fail the command
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(repo, 'tools/fvs.mjs');
const review = (file, ...args) => {
  const r = spawnSync(process.execPath, [cli, 'review', file, '--json', ...args], { encoding: 'utf8', maxBuffer: 64 << 20 });
  assert.equal(r.status, 0, `fvs review ${file} exited ${r.status}\n${r.stderr}`);
  return { ...JSON.parse(r.stdout), stderr: r.stderr };
};
const codes = (res, scene) => (res.scenes.find(s => s.id === scene)?.findings || []).map(f => `${f.code}:${f.text}`);
const ok = msg => console.log(`✓ ${msg}`);

// defects
const fixtures = join(repo, 'test/fixtures/review');
const defects = review(join(fixtures, 'defects.fvs.md'));
const intro = codes(defects, 'intro');
for (const want of ['text_occluded:A subtitle nobody can read', 'content_overlap:', 'contrast_aa_failure:A subtitle nobody can read']) {
  assert.ok(intro.some(c => c.startsWith(want)), `intro should report ${want}: ${JSON.stringify(intro)}`);
}
assert.ok(codes(defects, 'clip').some(c => c.startsWith('contrast_aa_failure:A caption over the footage')), `the caption over the clip is measured against the footage: ${JSON.stringify(codes(defects, 'clip'))}`);
assert.deepEqual(defects.scenes.flatMap(s => s.findings.filter(f => f.code === 'footage_not_filling').map(f => `${s.id}:${f.severity}`)), ['corner:error'], 'the clip left in a corner is reported; the ones that fill the frame are not, also one placed on the frame from inside an unpositioned overflow: hidden wrapper that does not clip it');
assert.ok(existsSync(join(fixtures, 'media/clip.webm')), 'the fixture\'s media survived the review');
ok(`defects: ${defects.counts.error} errors, in their scenes (${intro.length} in intro)`);

// marked
const tmp = mkdtempSync(join(tmpdir(), 'fvs-verify-review-'));
try {
  cpSync(fixtures, tmp, { recursive: true });
  const marked = join(tmp, 'defects.fvs.md');
  writeFileSync(marked, readFileSync(marked, 'utf8').replace('<p data-in="h1" data-fx="fade">', '<p data-in="h1" data-fx="fade" data-layout-allow-occlusion>'));
  const after = codes(review(marked), 'intro');
  assert.ok(!after.includes('text_occluded:A subtitle nobody can read'), `the marked line is no longer reported as covered: ${JSON.stringify(after)}`);
  writeFileSync(marked, readFileSync(marked, 'utf8').replace('<video class="thumb"', '<video class="thumb" data-layout-ignore'));
  assert.deepEqual(codes(review(marked), 'corner').filter(c => c.startsWith('footage_not_filling')), [], 'a deliberate inset marked data-layout-ignore is not reported');
  ok('marked: data-layout-allow-occlusion and data-layout-ignore take their findings away');
  // the picture, not the box: object-fit none leaves the 320×180 clip small in a full-frame box; a clipping parent
  // cuts a full-frame clip down to its own 854×480; will-change: transform makes the zero-height wrapper the one the
  // pinned clip is placed in, so its overflow does cut it
  cpSync(fixtures, tmp, { recursive: true });
  writeFileSync(marked, readFileSync(marked, 'utf8')
    .replace('<video class="thumb" src="media/clip.webm"></video>', '<div class="win"><video src="media/clip.webm"></video></div>')
    .replace('.fvs-stage .caption {', '.fvs-stage .win { position: absolute; left: 0; top: 0; width: 854px; height: 480px; overflow: hidden; }\n.fvs-stage .win video { width: 1920px; height: 1080px; }\n.fvs-stage .caption {')
    .replace('<video src="media/clip.webm"></video>\n<div class="caption"', '<video src="media/clip.webm" style="object-fit: none"></video>\n<div class="caption"')
    .replace('.fvs-stage .pin { overflow: hidden; height: 0; }', '.fvs-stage .pin { overflow: hidden; height: 0; will-change: transform; }\n.fvs-stage .pin video { height: 1080px; }'));
  const fit = review(marked), small = id => codes(fit, id).filter(c => c.startsWith('footage_not_filling')).length;
  assert.deepEqual([small('clip'), small('corner'), small('pinned')], [1, 1, 1], `object-fit none, a positioned clipping parent and one that holds its clip with will-change are measured by what shows: ${JSON.stringify(fit.scenes.map(s => [s.id, s.findings.map(f => f.code)]))}`);
  ok('fit: object-fit none, a clipping parent and a will-change wrapper are measured by the picture that shows');
} finally { rmSync(tmp, { recursive: true, force: true }); }

// example
const example = join(repo, 'examples/episode-2.12/episode-2.12.fvs.md'), assets = join(dirname(example), 'assets');
const before = readdirSync(assets).sort();
const ex = review(example);
assert.ok(!/page source only/.test(ex.stderr), `HyperFrames' lint stopped the browser pass: ${ex.stderr}`);
const bad = ex.scenes.flatMap(s => s.findings).filter(f => f.section === 'lint' || f.section === 'runtime');
assert.deepEqual(bad, [], 'no lint or runtime findings on the example');
assert.ok(ex.times.length >= 20, `sampled every scene (${ex.times.length} moments)`);
assert.deepEqual(readdirSync(assets).sort(), before, 'the example\'s assets are untouched');
ok(`example: ${ex.times.length} moments, browser pass ran, scripts clean, assets untouched (${ex.counts.error} errors, ${ex.counts.warning} warnings are advice)`);

// the project's own files are never written: a top-level file named like the page, referenced as a folder
const odd = mkdtempSync(join(tmpdir(), 'fvs-verify-review-'));
try {
  cpSync(fixtures, odd, { recursive: true });
  writeFileSync(join(odd, 'index.html'), 'the project\'s own page\n');
  writeFileSync(join(odd, 'fvs-runtime.js'), '// the project\'s own script\n');
  const f = join(odd, 'defects.fvs.md');
  writeFileSync(f, readFileSync(f, 'utf8').replace('<div class="panel" data-in="h1"></div>', '<div class="panel" data-in="h1"></div><img src="index.html/cover.png" alt=""><img src="fvs-runtime.js" alt="">'));
  review(f);
  assert.equal(readFileSync(join(odd, 'index.html'), 'utf8'), 'the project\'s own page\n');
  assert.equal(readFileSync(join(odd, 'fvs-runtime.js'), 'utf8'), '// the project\'s own script\n');
  // HyperFrames failing to look is an error, not a clean film
  const boom = join(odd, 'boom.mjs');
  writeFileSync(boom, 'console.log(JSON.stringify({ ok: false, error: "Chrome did not start" })); process.exit(1);\n');
  const r = spawnSync(process.execPath, [cli, 'review', f], { encoding: 'utf8', env: { ...process.env, FVS_HYPERFRAMES: boom } });
  assert.notEqual(r.status, 0, 'a failed HyperFrames run fails the command');
  assert.match(r.stderr, /HyperFrames did not run \(Chrome did not start\)/);
  ok('the project\'s files are never written; a failed HyperFrames run is reported as one');
} finally { rmSync(odd, { recursive: true, force: true }); }

// the text report is what the Director reads
const text = execFileSync(process.execPath, [cli, 'review', join(fixtures, 'defects.fvs.md')], { encoding: 'utf8' });
assert.match(text, /^intro · 开场 · 0\.00–4\.00 s$/m);
assert.match(text, /Advice, not a gate/);
ok('text report: grouped by scene');
console.log('verify-review passed');
