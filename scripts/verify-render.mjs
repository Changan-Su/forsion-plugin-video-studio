// Real Chromium + ffmpeg, isolated output files. No model and no changes to the source engineering file.
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const dir = resolve('artifacts/render'); await mkdir(dir, { recursive: true });
const project = resolve('examples/episode-2.12/episode-2.12.fvs.md'), source = await readFile(project);
const cli = resolve('tools/fvs.mjs'), results = [];
async function run(name, overrides = {}, cancelAfterFrames = false) {
  const file = join(dir, `${name}-${Date.now()}.json`), out = file.replace(/\.json$/, '.mp4');
  const spec = { v: 1, id: name, status: 'queued', progress: 0, project, out, options: { from: 4.8, to: 14.4, scale: .5, fps: 24, crf: 23, workers: 3, ...overrides } };
  if (name === 'preserve-output') await writeFile(out, 'previous completed export');
  await writeFile(file, JSON.stringify(spec));
  const child = spawn(process.execPath, [cli, 'render-job', file], { stdio: ['ignore', 'pipe', 'pipe'] }); let output = '', ended = false, cancelled = false;
  child.stdout.on('data', b => { output = (output + b).slice(-4000); }); child.stderr.on('data', b => { output = (output + b).slice(-4000); });
  const completion = new Promise(ok => child.on('close', code => { ended = true; ok(code); }));
  const stages = new Set(), progress = [];
  while (!ended) {
    const value = JSON.parse(await readFile(file, 'utf8')); stages.add(value.status);
    if (value.progress !== progress.at(-1)) progress.push(value.progress);
    if (cancelAfterFrames && !cancelled && value.completedFrames >= 4) { await writeFile(file + '.cancel', 'cancel\n'); cancelled = true; }
    await new Promise(r => setTimeout(r, 100));
  }
  const code = await completion, value = JSON.parse(await readFile(file, 'utf8')); stages.add(value.status);
  if (name === 'success') {
    assert.equal(code, 0, output); assert.equal(value.status, 'done'); assert.equal(value.progress, 100);
    assert.ok(stages.has('frames') && stages.has('encoding')); assert.ok(progress.every((v, i) => i === 0 || v >= progress[i - 1]));
    const probe = spawnSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', out], { encoding: 'utf8' }); assert.equal(probe.status, 0, probe.stderr);
    const media = JSON.parse(probe.stdout), video = media.streams.find(s => s.codec_type === 'video');
    assert.equal(video.width, 720); assert.equal(video.height, 540); assert.equal(video.avg_frame_rate, '24/1');
    assert.ok(media.streams.some(s => s.codec_type === 'audio')); assert.ok(Math.abs(Number(media.format.duration) - 9.6) < .1);
    const shot = spawnSync('ffmpeg', ['-y', '-v', 'error', '-ss', '4', '-i', out, '-frames:v', '1', join(dir, 'verified-frame.png')], { encoding: 'utf8' }); assert.equal(shot.status, 0, shot.stderr);
  } else if (name === 'cancel') { assert.equal(value.status, 'cancelled', output); assert.ok(cancelled); }
  else if (name === 'invalid-range') assert.equal(value.status, 'failed');
  else { assert.equal(value.status, 'failed'); assert.equal(await readFile(out, 'utf8'), 'previous completed export'); }
  assert.ok(!(await readdir(dir)).some(f => f.includes('.partial-')));
  results.push({ name, code, status: value.status, stages: [...stages], progress, output: name === 'success' ? out : null });
  console.log(`${name}: ${value.status}`);
}
await run('success'); await run('cancel', { from: 0, to: 30, fps: 60 }, true);
await run('invalid-range', { from: 20, to: 10 }); await run('preserve-output');
assert.deepEqual(await readFile(project), source);
await writeFile(join(dir, 'results.json'), JSON.stringify({ results, sourceUnchanged: true }, null, 2) + '\n');
