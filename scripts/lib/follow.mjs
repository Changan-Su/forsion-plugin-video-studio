// Does a pasted path (step 5b, B) stay on what it names? The harness tracks the clip itself from the path's first
// point and compares: the Director may read the positions off a contact sheet instead of running `fvs track`
// (10-25: by eye, and on the surfer the whole way), and the picture is what counts, not the tool.
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { videos } from '../../src/lib/html.js';

const literal = s => (/^[\s\d.,\-[\]]+$/.test(s) ? Function(`return ${s}`)() : null); // numbers and brackets only

/**
 * Scene `id`'s first clip, its pasted path ([[d, x, y], …] in stage pixels, d from the scene's start) against the
 * tracker's own path from the same start. Returns { ok, max, median, n, until } in stage pixels, or { ok: false, why }.
 * `tol` is about the ring's radius on a 1080 frame: further than that, the graphic is beside the thing, not on it.
 * ponytail: the first clip of the scene, no rotation metadata; the camera move on the wrapper carries both alike
 */
export function follows({ cli, dir, p, id, tol = 90 }) {
  const s = p.scenes.find(x => x.id === id), v = s && videos(s.html).find(x => x.src);
  if (!v) return { ok: false, why: `no clip in ${id}` };
  const m = /\w+\s*=\s*(\[\s*\[\s*0(?:\.0+)?\s*,[^;]*?\]\s*\])\s*;/.exec(s.js || ''), path = m && literal(m[1]);
  if (!path?.length) return { ok: false, why: `no path in ${id}` };
  const W = p.meta.width, H = p.meta.height;
  const [vw, vh] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', join(dir, v.src)], { encoding: 'utf8' }).trim().split(',').map(Number);
  const k = Math.max(W / vw, H / vh), ox = (W - vw * k) / 2, oy = (H - vh * k) / 2;
  const [, x0, y0] = path[0], at = (v.clipIn || 0) + (s.in || 0);
  const out = execFileSync(process.execPath, [cli, 'track', join(dir, v.src), '--at', String(at), '--to', String(+(at + path.at(-1)[0]).toFixed(3)),
    '--point', `${((x0 - ox) / k / vw * 100).toFixed(1)},${((y0 - oy) / k / vh * 100).toFixed(1)}`, '--frame', `${W}x${H}`, '--out', mkdtempSync(join(tmpdir(), 'fvs-follow-'))], { cwd: dir, encoding: 'utf8' });
  const ref = literal(/const path = (\[.*\]);/.exec(out)?.[1] || '');
  if (!ref?.length) return { ok: false, why: 'the tracker lost it at once' };
  // the pasted path at the tracker's times (linear between its keyframes, held past its ends)
  const on = d => {
    const j = path.findIndex(q => q[0] >= d);
    if (j <= 0) return path[j < 0 ? path.length - 1 : 0].slice(1);
    const [a, b] = [path[j - 1], path[j]], f = (d - a[0]) / (b[0] - a[0] || 1);
    return [a[1] + f * (b[1] - a[1]), a[2] + f * (b[2] - a[2])];
  };
  const off = ref.map(([d, x, y]) => { const [qx, qy] = on(d); return Math.hypot(qx - x, qy - y); }).sort((a, b) => a - b);
  const max = Math.round(off.at(-1)), median = Math.round(off[off.length >> 1]);
  return { ok: max <= tol, max, median, n: ref.length, until: ref.at(-1)[0] };
}
