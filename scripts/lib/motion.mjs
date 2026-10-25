// What moves in a cut, read from the page the renderer captures (the runtime's own geometry and styles at each time),
// not from the project's text: a K() on a wrapper, a CSS-variable scale, a clip reveal and a data-fx entrance all show
// up the same way, and a title that sits outside the frame does not count as on screen (10-24's false green).
// Sampled a little before and after every eighth note (beat / 2) of the project's tempo. Only what is visible counts:
// an element is on screen when its opacity (with its parents') is over .5 and some of its box is left after the clips
// of it and its parents and the frame's edge.
//
//   camera   a shot (a scene with a <video>) whose picture moves while it is on screen: the video's box scales
//            (> 1.5 %) or travels (> 8 px), or its visible part changes, between the end of its transition and its end
//   accents  eighth-note times inside a shot (not its first frame) where something visible changes at once: an element
//            (not the captions track) appears or leaves, jumps (> 30 px) or resizes (> 8 %), the picture jumps (> 3 %
//            or 40 px) or changes its filter, or the flash layer fires; and was not already changing just before
//   graphic  a shot with an element that has no text and no video, is not a full-width band (a scrim), and changes
//            while on screen
//   multi    a shot with two pictures on screen at once (split screen, picture in picture): two <video>s each with 5 %
//            of the frame not covered by a later one
//   opener   time before the first shot, and whether its words arrive in steps (new words on screen more than once)
//            or move
//   kinetic  a line (the title, the closing line) that arrives in steps (word by word) or travels, resizes, is
//            revealed by a clip or typed, rather than only fading or cutting in; whether it was ever on screen, and
//            whether all of its words were inside the frame at once (where the text is drawn, overflow included)
// ponytail: z-index, transforms of the clip box and non-inset clip shapes are ignored; measure pixels if a layered
// composite is ever misread.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

/** In the capture page after __stage.seek(t): every element of every scene on screen, the flash layer. */
function snapshot() {
  const stage = document.querySelector('.fvs-stage'), S = stage.getBoundingClientRect(), k = __stage.w / S.width;
  const opacity = el => { let o = 1; for (let a = el; a && a !== stage; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= +cs.opacity; } return o; };
  const edges = r => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });
  // the box left by an inset() clip (other shapes: the whole box); percentages of the box, px in the element's own units
  const clipped = (el, r) => {
    const m = /^inset\(([^)]*)\)/.exec(getComputedStyle(el).clipPath);
    if (!m) return edges(r);
    const v = m[1].split(' round ')[0].trim().split(/\s+/), [T, R, B, L] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
    const len = (x, size, own) => (x.endsWith('%') ? parseFloat(x) / 100 * size : parseFloat(x) * (own ? size / own : 1)) || 0;
    return { l: r.left + len(L, r.width, el.offsetWidth), r: r.right - len(R, r.width, el.offsetWidth), t: r.top + len(T, r.height, el.offsetHeight), b: r.bottom - len(B, r.height, el.offsetHeight) };
  };
  const cut = (a, c) => ({ l: Math.max(a.l, c.l), t: Math.max(a.t, c.t), r: Math.min(a.r, c.r), b: Math.min(a.b, c.b) });
  const els = [];
  // the scenes, and the native captions layer the runtime mounts beside them (a line may be a caption cue)
  for (const sc of stage.querySelectorAll('.fvs-scene, .fvs-captions')) {
    if (!opacity(sc)) continue;
    const all = [...sc.querySelectorAll('*')], index = new Map(all.map((el, i) => [el, i]));
    all.forEach((el, i) => {
      const r = el.getBoundingClientRect(), o = opacity(el), cs = getComputedStyle(el);
      // a parent's clip-path cuts everything inside it; its overflow only what it contains as a block: an absolutely
      // placed element skips the unpositioned parents between it and the one it is placed in (10-24: words placed in
      // the scene from inside a zero-height `overflow: hidden` wrapper are on screen)
      let box = clipped(el, r), placed = /absolute|fixed/.test(cs.position);
      for (let a = el.parentElement; a && a !== stage; a = a.parentElement) {
        const ac = getComputedStyle(a), positioned = ac.position !== 'static' || ac.transform !== 'none';
        if (ac.clipPath !== 'none') box = cut(box, clipped(a, a.getBoundingClientRect()));
        if (ac.overflow !== 'visible' && (!placed || positioned)) box = cut(box, edges(a.getBoundingClientRect()));
        if (positioned) placed = /absolute|fixed/.test(ac.position);
      }
      box = cut(box, edges(S));
      const vw = Math.max(0, box.r - box.l), vh = Math.max(0, box.b - box.t), own = [...el.childNodes].some(n => n.nodeType === 3 && /\S/.test(n.data));
      // where its words are drawn, overflow included (a block's own box keeps the stage's width while its text runs past)
      let tb = null;
      if (own) { const rg = document.createRange(); rg.selectNodeContents(el); const q = rg.getBoundingClientRect(); tb = { x: Math.round((q.left - S.left) * k), y: Math.round((q.top - S.top) * k), w: Math.round(q.width * k), h: Math.round(q.height * k), lh: Math.round(Math.max(0, ...[...rg.getClientRects()].map(r => r.height)) * k) }; }
      els.push({
        scene: sc.dataset.scene || 'captions', i, parent: index.get(el.parentElement) ?? -1, video: el.tagName === 'VIDEO', src: el.getAttribute('src') || '', withVideo: !!el.querySelector('video'),
        own, tb, text: el.textContent.replace(/\s+/g, ''),
        on: o > .5 && vw > 0 && vh > 0, x: Math.round((r.left - S.left) * k), y: Math.round((r.top - S.top) * k), w: Math.round(r.width * k), h: Math.round(r.height * k),
        v: { x: Math.round((box.l - S.left) * k), y: Math.round((box.t - S.top) * k), w: Math.round(vw * k), h: Math.round(vh * k) },
        filter: cs.filter, dash: cs.strokeDashoffset,
      });
    });
  }
  const flash = Math.max(0, ...[...stage.querySelectorAll('[data-fvs-flash]')].map(f => +getComputedStyle(f).opacity));
  return { els, flash };
}

const moved = (a, b, px, share) => Math.abs(a.x + a.w / 2 - b.x - b.w / 2) > px || Math.abs(a.y + a.h / 2 - b.y - b.h / 2) > px || Math.abs(a.w - b.w) > share * Math.max(a.w, 1) || Math.abs(a.h - b.h) > share * Math.max(a.h, 1);
/** Its box or its visible part moved, while on screen in both. */
const shifted = (a, b, px, share) => a.on && b.on && (moved(a, b, px, share) || moved(a.v, b.v, px, share));
const area = r => r.w * r.h;
const overlap = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

/**
 * Motion in the project `file` (parsed as `p`), run through the CLI `cli`. `lines`: { title: '…', closing: '…' }, the
 * on-screen lines to judge as kinetic. Returns the facts above, per shot and for the film.
 */
export async function motionOf({ cli, file, dir, p, lines = {} }) {
  const W = p.meta.width, H = p.meta.height, beat = p.meta.tempo?.bpm ? 60 / p.meta.tempo.bpm : .5, step = beat / 2, d = .06;
  // sample times, one way everywhere so they find each other in the map: just before / after the k-th eighth note
  const T = (k, side) => +(k * step + side * d).toFixed(4);
  const tmp = mkdtempSync(join(tmpdir(), 'fvs-motion-'));
  const page = join(tmp, 'motion.html');
  execFileSync(process.execPath, [cli, 'html', file, '--out', page], { cwd: dir, stdio: 'ignore' });
  let browser = null;
  for (const opt of [process.env.FVS_CHROMIUM ? { executablePath: process.env.FVS_CHROMIUM } : null, { channel: 'chrome' }, {}].filter(Boolean)) {
    try { browser = await chromium.launch(opt); break; } catch { /* next */ }
  }
  if (!browser) throw new Error('no Chromium for the motion probe (set FVS_CHROMIUM)');
  const at = new Map();
  try {
    const pg = await browser.newPage({ viewport: { width: W, height: H } });
    await pg.addInitScript(() => { window.FVS_MODE = 'capture'; });
    await pg.route(/\.(mp3|wav|m4a|ogg|aac|flac)(\?|$)/i, r => r.abort());
    await pg.goto(pathToFileURL(page).href);
    await pg.evaluate(() => Promise.race([window.__stage.ready(), new Promise(r => setTimeout(r, 15000))]));
    const times = [];
    for (let k = 0; k * step < p.length + 1e-6; k++) for (const t of [T(k, -1), T(k, 1)]) if (t >= 0 && t < p.length) times.push(t);
    for (const t of times) {
      await pg.evaluate(x => Promise.race([__stage.seek(x), new Promise(r => setTimeout(r, 400))]), t);
      at.set(t, await pg.evaluate(snapshot));
    }
  } finally { await browser.close(); rmSync(tmp, { recursive: true, force: true }); }

  const samples = [...at.entries()].map(([t, s]) => ({ t, ...s }));
  const inScene = (s, id) => s.els.filter(e => e.scene === id);
  const key = e => `${e.scene}#${e.i}`;
  const shots = p.scenes.filter(s => /<video\b/i.test(s.html)).map(s => {
    const from = s.t0 + (s.transition?.dur || 0) + .02, to = s.t1 - .02;
    const win = samples.filter(x => x.t >= from && x.t <= to);
    const vids = x => inScene(x, s.id).filter(e => e.video);
    // the picture moves: two on-screen states of the same clip differ
    const firstSeen = new Map();
    const camera = win.some(x => vids(x).some(v => { if (!v.on) return false; const f = firstSeen.get(v.i); if (!f) { firstSeen.set(v.i, v); return false; } return shifted(v, f, 8, .015); }));
    const change = (o, e) => e.on !== o.on || (e.video ? shifted(e, o, 40, .03) || (e.on && o.on && e.filter !== o.filter) : shifted(e, o, 30, .08));
    const accents = [];
    for (let k = Math.ceil((from + d) / step - 1e-9); k * step < to - d; k++) {
      const g = k * step, a = at.get(T(k, -1)), b = at.get(T(k, 1)), before = at.get(T(k - 1, 1));
      if (!a || !b) continue;
      // a change across g that was not already under way just before it (a long wipe counts once, where it starts)
      const A = new Map(inScene(a, s.id).map(e => [key(e), e])), B = new Map(before ? inScene(before, s.id).map(e => [key(e), e]) : []);
      const hit = (b.flash > .1 && !(a.flash > .1)) || inScene(b, s.id).some(e => {
        const o = A.get(key(e)), q = B.get(key(e));
        return o && change(o, e) && !(q && change(q, o));
      });
      if (hit) accents.push(+g.toFixed(3));
    }
    const graphic = (() => {
      const last = new Map();
      for (const x of win) for (const e of inScene(x, s.id)) {
        if (e.video || e.withVideo || e.text || (e.w >= .9 * W && e.h >= .15 * H) || e.w * e.h > .25 * W * H) continue;
        const o = last.get(key(e)); last.set(key(e), e);
        if (o && (e.on !== o.on || shifted(e, o, 4, .04) || (e.on && o.on && e.dash !== o.dash))) return true;
      }
      return false;
    })();
    // two pictures: on-screen clips, each with 5 % of the frame not covered by a clip after it in the page
    const multi = win.some(x => {
      const on = vids(x).filter(v => v.on);
      return on.filter((v, j) => area(v.v) - on.slice(j + 1).reduce((n, u) => n + overlap(v.v, u.v), 0) >= .05 * W * H).length >= 2;
    });
    return { id: s.id, t0: s.t0, t1: s.t1, camera, accents, graphic, multi };
  });

  // new text on screen, counted once: a line that cuts out and back in again has not arrived in steps
  const growth = xs => { let n = 0; const seen = new Set(); for (const x of xs) { let grew = false; for (const e of x.els) if (e.own && e.on && !seen.has(key(e))) { seen.add(key(e)); grew = true; } if (grew) n++; } return n; };
  // words that travel, resize, are wiped in or typed while on screen
  const travels = xs => xs.some((x, j) => j > 0 && x.els.some(e => { if (!e.own) return false; const o = xs[j - 1].els.find(q => key(q) === key(e)); return o && (shifted(e, o, 30, .05) || (e.on && o.on && e.text !== o.text)); }));
  const first = shots.length ? shots[0].t0 : p.length;
  const pre = samples.filter(x => x.t < first);
  const opener = { seconds: +first.toFixed(2), steps: growth(pre), moving: travels(pre) };

  const kinetic = line => {
    const want = String(line || '').replace(/\s+/g, '');
    if (!want) return null;
    // every element that is the smallest holder of the whole line somewhere (an opener and a shot may both carry it),
    // each judged with itself and its parts that carry text (a typed line holds only some of the words for a while)
    const holders = new Set();
    for (const x of samples) { const h = x.els.filter(e => e.text.includes(want)).sort((a, b) => a.text.length - b.text.length)[0]; if (h) holders.add(key(h)); }
    if (!holders.size) return { found: false, onScreen: false, kinetic: false };
    const judge = hk => {
      const scene = hk.split('#')[0], root = +hk.split('#')[1];
      const parts = x => {
        const els = x.els.filter(e => e.scene === scene), by = new Map(els.map(e => [e.i, e]));
        const under = e => { for (let q = e; q; q = by.get(q.parent)) if (q.i === root) return true; return false; };
        return els.filter(e => (e.own || e.i === root) && under(e));
      };
      const xs = samples.map(x => ({ t: x.t, els: parts(x) }));
      const shown = xs.filter(r => r.els.some(e => e.on));
      if (!shown.length) return { found: true, onScreen: false, kinetic: false };
      const span = xs.filter(r => r.t >= shown[0].t - step && r.t <= shown[shown.length - 1].t + step);
      const boxMoves = span.some((r, j) => j > 0 && r.els.some(e => { const o = span[j - 1].els.find(q => q.i === e.i); return o && shifted(e, o, 30, .05); }));
      const why = growth(span) >= 2 ? 'in steps' : travels(span) || boxMoves ? 'moves' : null;
      // all of its words inside the frame at once, at a moment when as much of it is on screen as ever is (a line too
      // wide for a portrait frame runs off its sides, onScreen only needs some of it showing, and a typed line grows)
      const words = r => r.els.filter(e => e.on && e.own), cover = r => words(r).reduce((n, e) => n + e.text.length, 0), full = Math.max(...xs.map(cover));
      const inFrame = full > 0 && xs.some(r => cover(r) === full && words(r).every(e => e.tb && e.tb.x >= -2 && e.tb.y >= -2 && e.tb.x + e.tb.w <= W + 2 && e.tb.y + e.tb.h <= H + 2));
      // how tall its words get on screen, one line at a time (a block of small lines is not a big title), as on a 1080 short side
      const tall = Math.round(Math.max(0, ...xs.flatMap(r => words(r).filter(e => e.tb).map(e => e.tb.lh ?? e.tb.h))) * 1080 / Math.min(W, H));
      return { found: true, onScreen: true, kinetic: !!why, why, inFrame, tall };
    };
    const all = [...holders].map(judge);
    return all.find(r => r.kinetic && r.inFrame) || all.find(r => r.kinetic) || all.find(r => r.onScreen && r.inFrame) || all.find(r => r.onScreen) || all[0];
  };
  return { step, shots, opener, title: kinetic(lines.title), closing: kinetic(lines.closing) };
}
