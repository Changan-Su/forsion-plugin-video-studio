import test from 'node:test';
import assert from 'node:assert/strict';
import { trackPoint, coverPoint } from '../src/lib/track.js';

// a dark 8×12 figure crossing a noisy bright band, with a brighter look-alike texture beside its path
const W = 240, H = 135;
const frame = (fx, fy, seed) => {
  let r = seed;
  const rnd = () => ((r = (r * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const f = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) f[y * W + x] = (y > 50 && y < 85 ? 200 : 110) + Math.round(rnd() * 30);
  for (let y = fy - 6; y < fy + 6; y++) for (let x = fx - 4; x < fx + 4; x++) f[y * W + x] = 30;
  return f;
};

test('track: follows a figure across frames within 2 px, starting from a guess a few pixels off', () => {
  const path = Array.from({ length: 16 }, (_, i) => [60 + i * 6, 68 + Math.round(4 * Math.sin(i / 2))]);
  const frames = path.map(([x, y], i) => frame(x, y, i + 1));
  const got = trackPoint(frames, W, H, [path[0][0] + 5, path[0][1] - 4], { half: 6, search: 20, snap: 8 });
  got.forEach((g, i) => assert.ok(Math.abs(g.x - path[i][0]) <= 2 && Math.abs(g.y - path[i][1]) <= 2, `frame ${i}: ${g.x},${g.y} vs ${path[i]}`));
});

test('track: a clip filling a stage with object-fit cover maps its points with the crop', () => {
  assert.deepEqual(coverPoint(427, 240, 854, 480, 1920, 1080), [960, 540]); // 854 → 1920 is ×2.25, cropped 0.75 px a side
  assert.deepEqual(coverPoint(540, 960, 1080, 1920, 1920, 1080), [960, 540]); // a portrait clip on a landscape stage: scaled to the width, centred
  assert.deepEqual(coverPoint(0, 0, 1080, 1920, 1920, 1080), [0, -1167]);
});
