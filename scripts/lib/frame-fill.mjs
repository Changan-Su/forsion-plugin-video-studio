// Does the footage fill the rendered frame? Read from the pixels of the render, not from the project: footage that does
// not fill the frame leaves the stage background showing, and the background is flat. flatShare = the share of 6×6
// blocks of the frame (scaled to 192×108, grey) whose darkest and brightest pixels are at most 2 levels apart.
// Calibrated 10-24 on the four city montages: the run whose clips sat at 854×480 in the top-left corner of 1920×1080
// read 0.73–0.79 in every shot; shots that filled the frame read 0.00–0.33 (0.33: the Ljubljana night market's black
// sky), screen recordings 0.02–0.22.
// ponytail: flatness, not the background colour; match the flat blocks against the project's background if a dark or
// graded shot ever crosses FLAT_LIMIT.
import { execFileSync } from 'node:child_process';

export const FLAT_LIMIT = 0.5;

export function flatShare(video, t) {
  const W = 192, H = 108, B = 6;
  const px = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', video, '-frames:v', '1', '-vf', `scale=${W}:${H}`, '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { maxBuffer: 1 << 24 });
  if (px.length < W * H) throw new Error(`no frame at ${t} s in ${video}`);
  let flat = 0, n = 0;
  for (let by = 0; by < H; by += B) for (let bx = 0; bx < W; bx += B) {
    let lo = 255, hi = 0;
    for (let y = by; y < by + B; y++) for (let x = bx; x < bx + B; x++) { const v = px[y * W + x]; if (v < lo) lo = v; if (v > hi) hi = v; }
    n++; if (hi - lo <= 2) flat++;
  }
  return flat / n;
}

/** Each scene with footage at its middle: [{ id, share }], and those over FLAT_LIMIT. */
export function unfilled(video, scenes) {
  const read = scenes.map(s => ({ id: s.id, share: flatShare(video, (s.t0 + s.t1) / 2) }));
  const shown = r => ({ ...r, share: +r.share.toFixed(2) }); // rounded for the report only, after the comparison
  return { read: read.map(shown), over: read.filter(r => r.share > FLAT_LIMIT).map(shown) };
}
