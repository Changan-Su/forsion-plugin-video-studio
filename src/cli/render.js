import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync, mkdtempSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { audioTracks } from '../lib/compile.js';

export function renderJob(file) {
  if (!file) return { write() {}, cancelled: () => false };
  const path = resolve(file), cancel = path + '.cancel';
  let value = JSON.parse(readFileSync(path, 'utf8'));
  return {
    write(patch) { value = { ...value, ...patch, updatedAt: new Date().toISOString() }; const tmp = path + '.tmp'; writeFileSync(tmp, JSON.stringify(value, null, 2) + '\n'); renameSync(tmp, path); },
    cancelled: () => existsSync(cancel),
  };
}

export async function renderVideo(ctx, flags, api) {
  const job = renderJob(flags.job);
  let browser, frames, partial, cancelTimer;
  const checkCancel = () => { if (job.cancelled()) { const e = new Error('Render cancelled'); e.cancelled = true; throw e; } };
  try {
    checkCancel(); job.write({ status: 'preparing', progress: 0, error: null });
    const { p, dir } = ctx, fps = Number(flags.fps || p.meta.fps), scale = Number(flags.scale || 1), crf = Number(flags.crf ?? 18);
    const from = api.timeArg(p, flags.from) ?? 0, to = Math.min(p.length, api.timeArg(p, flags.to) ?? p.length);
    if (!Number.isFinite(fps) || fps < 1 || fps > 120 || !Number.isFinite(scale) || scale <= 0 || scale > 4 || !Number.isFinite(crf) || crf < 0 || crf > 51 || from < 0 || !(to > from)) throw new Error('Invalid export range, frame rate, scale or quality');
    const out = resolve(flags.out || ctx.path.replace(/\.fvs\.md$/i, '') + '.mp4');
    if (flags.job && existsSync(out)) throw new Error('Output already exists; choose another file');
    const ff = api.ffmpegBin();
    browser = await api.chromium(); checkCancel();
    frames = flags['keep-frames'] ? resolve(flags['keep-frames']) : mkdtempSync(join(tmpdir(), 'fvs-frames-'));
    // Never delete a caller's existing directory to start a render.
    mkdirSync(frames, { recursive: true });
    const workers = Math.max(1, Math.min(8, Number(flags.workers) || 3));
    const stages = [];
    try {
      for (let n = 0; n < workers; n++) { checkCancel(); stages.push(await api.openStage(ctx, browser)); }
      if (api.runtimeErrors(stages[0].st, stages[0].logs) && !flags.force) throw new Error('Scene scripts failed');
      const f0 = Math.round(from * fps), f1 = Math.max(f0, Math.round(to * fps) - 1), total = f1 - f0 + 1;
      let done = 0, lastPct = -1;
      job.write({ status: 'frames', progress: 0, totalFrames: total, completedFrames: 0 });
      await Promise.all(stages.map(async ({ pg }, k) => {
        for (let f = f0 + k; f <= f1; f += workers) {
          checkCancel(); await pg.evaluate(t => __stage.seek(t), f / fps);
          await pg.screenshot({ path: join(frames, `${String(f - f0).padStart(6, '0')}.png`) });
          const pct = Math.floor(++done / total * 80);
          if (pct !== lastPct) { lastPct = pct; job.write({ progress: pct, completedFrames: done }); api.log(`frames ${done}/${total}`); }
        }
      }));
      checkCancel(); await browser.close(); browser = null;
      const args = ['-y', '-loglevel', 'error', '-progress', 'pipe:1', '-framerate', String(fps), '-i', join(frames, '%06d.png')];
      const tracks = flags['no-audio'] ? [] : audioTracks(p.meta);
      for (const a of tracks) if (!existsSync(join(dir, a.src))) throw new Error(`Audio file not found: ${a.src}`);
      tracks.forEach(a => args.push('-i', join(dir, a.src)));
      if (tracks.length) {
        const parts = tracks.map((a, i) => {
          const shift = a.at - from;
          return `[${i + 1}:a]${shift < 0 ? `atrim=start=${-shift},asetpts=PTS-STARTPTS,` : ''}${shift > 0 ? `adelay=${Math.round(shift * 1000)}:all=1,` : ''}volume=${a.gain || 0}dB[a${i}]`;
        });
        const mix = tracks.length > 1 ? `;${tracks.map((_, i) => `[a${i}]`).join('')}amix=inputs=${tracks.length}:normalize=0[aout]` : '';
        args.push('-filter_complex', parts.join(';') + mix, '-map', '0:v', '-map', tracks.length > 1 ? '[aout]' : '[a0]', '-c:a', 'aac', '-b:a', flags.abr || '256k');
      }
      args.push('-vf', `scale=trunc(iw*${scale}/2)*2:trunc(ih*${scale}/2)*2:flags=lanczos`, '-c:v', 'libx264', '-preset', flags.preset || 'medium', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', String(total / fps));
      mkdirSync(dirname(out), { recursive: true }); partial = out + `.partial-${process.pid}.mp4`; args.push(partial);
      job.write({ status: 'encoding', progress: 80 });
      await new Promise((ok, fail) => {
        const child = spawn(ff, args, { stdio: ['ignore', 'pipe', 'pipe'] }); let errors = '', pending = '', killing = false;
        const finish = err => { clearInterval(cancelTimer); cancelTimer = null; err ? fail(err) : ok(); };
        child.on('error', finish);
        child.stderr.on('data', b => { errors = (errors + b.toString()).slice(-4000); });
        child.stdout.on('data', b => { pending += b.toString(); const lines = pending.split('\n'); pending = lines.pop(); for (const line of lines) if (line.startsWith('out_time_us=')) { const sec = Number(line.slice(12)) / 1e6; job.write({ progress: Math.min(99, 80 + Math.floor(sec / (total / fps) * 19)) }); } });
        cancelTimer = setInterval(() => { if (job.cancelled() && !killing) { killing = true; child.kill('SIGKILL'); } }, 150);
        child.on('close', code => { if (job.cancelled()) { const e = new Error('Render cancelled'); e.cancelled = true; finish(e); } else finish(code === 0 ? null : new Error(`Encoding failed: ${errors || code}`)); });
      });
      checkCancel();
      // Publish only a completed MP4. Failed/cancelled work never replaces the last good export.
      if (flags.job && existsSync(out)) throw new Error('Output was created by another render');
      renameSync(partial, out); partial = null;
      job.write({ status: 'done', progress: 100, bytes: statSync(out).size, duration: total / fps, output: out }); api.log(out);
    } finally { for (const stage of stages) rmSync(stage.tmp, { recursive: true, force: true }); }
  } catch (e) { job.write({ status: e.cancelled ? 'cancelled' : 'failed', error: String(e.message || e) }); throw e; }
  finally { clearInterval(cancelTimer); await browser?.close().catch(() => {}); if (partial) rmSync(partial, { force: true }); if (frames && !flags['keep-frames']) rmSync(frames, { recursive: true, force: true }); }
}
