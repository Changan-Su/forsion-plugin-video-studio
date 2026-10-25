// `fvs track`: follow one thing through a clip, for a graphic that has to stay on it (a ring on a surfer, a label on
// a car). Pure: grey frames in, positions out; the CLI decodes the frames with ffmpeg and maps them to the stage.

const patchAt = (f, w, half, cx, cy) => {
  const n = 2 * half + 1, p = new Float32Array(n * n);
  let k = 0;
  for (let dy = -half; dy <= half; dy++) for (let dx = -half; dx <= half; dx++) p[k++] = f[(cy + dy) * w + cx + dx];
  return p;
};
const spread = p => { let m = 0; for (const v of p) m += v; m /= p.length; let s = 0; for (const v of p) s += (v - m) ** 2; return Math.sqrt(s / p.length); };

/**
 * Follow a point through grey frames (`w`×`h` bytes each, in time order). The start point first snaps to the most
 * textured patch within `snap` px (a guess read off a contact sheet lands near the thing, rarely on it); then in each
 * frame the patch that differs least (mean absolute difference) from the template within `search` px of the last
 * position is the new one, each pixel of distance from the last position costing `pull` (a near look-alike, foam beside
 * a surfer, does not win over the thing itself). The template is half the first patch and half the last match, so a
 * turning subject is followed and the drift stays bounded. Returns [{ x, y, err }] per frame in frame pixels; `err` is the match's mean
 * difference per pixel (0–255): a jump means the thing was lost (covered, out of frame, a cut).
 * ponytail: one fixed-size patch, whole-pixel steps, no scale change; a subject that grows or shrinks a lot (coming at
 * the camera) is held by its middle at best. Add a scale search if that is ever needed.
 */
export function trackPoint(frames, w, h, [x0, y0], { half = 12, search = 40, snap = 14, pull = .15 } = {}) {
  const cx = v => Math.max(half, Math.min(w - 1 - half, Math.round(v))), cy = v => Math.max(half, Math.min(h - 1 - half, Math.round(v)));
  let x = cx(x0), y = cy(y0), most = -1;
  for (let yy = cy(y0 - snap); yy <= cy(y0 + snap); yy += 2) for (let xx = cx(x0 - snap); xx <= cx(x0 + snap); xx += 2) {
    const s = spread(patchAt(frames[0], w, half, xx, yy));
    if (s > most) { most = s; x = xx; y = yy; }
  }
  const first = patchAt(frames[0], w, half, x, y), n = first.length;
  let tpl = first;
  const out = [{ x, y, err: 0 }];
  for (let i = 1; i < frames.length; i++) {
    const f = frames[i];
    let bx = x, by = y, best = Infinity, bestErr = 0;
    for (let yy = cy(y - search); yy <= cy(y + search); yy++) for (let xx = cx(x - search); xx <= cx(x + search); xx++) {
      const away = pull * Math.hypot(xx - x, yy - y), stop = (best - away) * n;
      let s = 0, k = 0;
      for (let dy = -half; dy <= half && s < stop; dy++) {
        const row = (yy + dy) * w + xx;
        for (let dx = -half; dx <= half; dx++) s += Math.abs(f[row + dx] - tpl[k++]);
      }
      if (s / n + away < best) { best = s / n + away; bestErr = s / n; bx = xx; by = yy; }
    }
    x = bx; y = by;
    const cur = patchAt(f, w, half, x, y);
    tpl = first.map((v, k) => (v + cur[k]) / 2);
    out.push({ x, y, err: bestErr });
  }
  return out;
}

/** Where a point of the clip lands on a `W`×`H` stage when the clip fills it with object-fit: cover, centred. */
export function coverPoint(x, y, vw, vh, W, H) {
  const s = Math.max(W / vw, H / vh);
  return [Math.round((W - vw * s) / 2 + x * s), Math.round((H - vh * s) / 2 + y * s)];
}
