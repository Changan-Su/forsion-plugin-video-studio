// What moves in a cut, read from the page the renderer captures (the runtime's own geometry and styles at each time),
// not from the project's text: a K() on a wrapper, a CSS-variable scale, a clip reveal and a data-fx entrance all show
// up the same way, and a title that sits outside the frame does not count as on screen (10-24's false green).
// Sampled a little before and after every eighth note (beat / 2) of the project's tempo.
//
//   camera   a shot (a scene with a <video>) whose picture moves: the video's box scales (> 1.5 %) or travels (> 8 px),
//            or its clip changes, between the end of its transition and its last frame
//   accents  eighth-note times inside a shot (not its first frame) where something changes at once: an element (not the
//            captions track) appears or leaves, jumps (> 30 px) or resizes (> 8 %), the picture jumps (> 3 % or 40 px) or
//            changes its clip or filter, or the flash layer fires; and was not already changing just before
//   graphic  a shot with an element that has no text and no video, is not a full-width band (a scrim), and changes
//   multi    a shot with two pictures on screen at once (split screen, picture in picture)
//   opener   time before the first shot, and whether its words arrive in steps or move
//   kinetic  a line (the title, the closing line) that arrives in steps (word by word, typed) or travels, resizes or is
//            revealed by a clip, rather than only fading or cutting in; and whether it was ever on screen at all
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
  const els = [];
  for (const sc of stage.querySelectorAll('.fvs-scene')) {
    if (!opacity(sc)) continue;
    const all = [...sc.querySelectorAll('*')], index = new Map(all.map((el, i) => [el, i]));
    all.forEach((el, i) => {
      const r = el.getBoundingClientRect(), o = opacity(el), cs = getComputedStyle(el);
      const on = o > .5 && r.width > 0 && r.height > 0 && r.right > S.left && r.left < S.right && r.bottom > S.top && r.top < S.bottom;
      els.push({
        scene: sc.dataset.scene, i, parent: index.get(el.parentElement) ?? -1, video: el.tagName === 'VIDEO', src: el.getAttribute('src') || '', withVideo: !!el.querySelector('video'),
        own: [...el.childNodes].some(n => n.nodeType === 3 && /\S/.test(n.data)), text: el.textContent.replace(/\s+/g, ''),
        on, x: Math.round((r.left - S.left) * k), y: Math.round((r.top - S.top) * k), w: Math.round(r.width * k), h: Math.round(r.height * k),
        clip: cs.clipPath, filter: cs.filter, dash: cs.strokeDashoffset,
      });
    });
  }
  const flash = Math.max(0, ...[...stage.querySelectorAll('[data-fvs-flash]')].map(f => +getComputedStyle(f).opacity));
  return { els, flash };
}

const moved = (a, b, px, share) => Math.abs(a.x + a.w / 2 - b.x - b.w / 2) > px || Math.abs(a.y + a.h / 2 - b.y - b.h / 2) > px || Math.abs(a.w - b.w) > share * Math.max(a.w, 1) || Math.abs(a.h - b.h) > share * Math.max(a.h, 1);

/**
 * Motion in the project `file` (parsed as `p`), run through the CLI `cli`. `lines`: { title: '…', closing: '…' }, the
 * on-screen lines to judge as kinetic. Returns the facts above, per shot and for the film.
 */
export async function motionOf({ cli, file, dir, p, lines = {} }) {
  const W = p.meta.width, H = p.meta.height, beat = p.meta.tempo?.bpm ? 60 / p.meta.tempo.bpm : .5, step = beat / 2, d = .06;
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
    for (let g = 0; g < p.length + 1e-6; g += step) for (const t of [g - d, g + d]) if (t >= 0 && t < p.length) times.push(+t.toFixed(4));
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
    const v0 = win.length ? vids(win[0]) : [];
    const camera = win.some(x => vids(x).some((v, j) => v0[j] && (moved(v, v0[j], 8, .015) || v.clip !== v0[j].clip)));
    const accents = [];
    for (let g = Math.ceil((from + d) / step) * step; g < to - d; g += step) {
      const a = at.get(+(g - d).toFixed(4)), b = at.get(+(g + d).toFixed(4)), before = at.get(+(g - step + d).toFixed(4));
      if (!a || !b) continue;
      // a change across g that was not already under way just before it (a long wipe counts once, where it starts)
      const change = (o, e) => (e.video ? moved(e, o, 40, .03) || e.clip !== o.clip || e.filter !== o.filter : e.on !== o.on || (e.on && moved(e, o, 30, .08)));
      const A = new Map(inScene(a, s.id).map(e => [key(e), e])), B = new Map(before ? inScene(before, s.id).map(e => [key(e), e]) : []);
      const hit = (b.flash > .1 && !(a.flash > .1)) || inScene(b, s.id).some(e => {
        const o = A.get(key(e)), q = B.get(key(e));
        return o && change(o, e) && !(q && change(q, o));
      });
      if (hit) accents.push(+g.toFixed(3));
    }
    const graphic = (() => {
      const seen = new Map();
      for (const x of win) for (const e of inScene(x, s.id)) {
        if (e.video || e.withVideo || e.text || (e.w >= .9 * W && e.h >= .15 * H) || e.w * e.h > .25 * W * H) continue;
        const o = seen.get(key(e));
        if (!o) { seen.set(key(e), e); continue; }
        if (e.on !== o.on || moved(e, o, 4, .04) || e.clip !== o.clip || e.dash !== o.dash) return true;
      }
      return false;
    })();
    const multi = win.some(x => new Set(vids(x).filter(v => v.on && v.w * v.h >= .05 * W * H && !/inset\(100%/.test(v.clip)).map(v => v.src)).size >= 2);
    return { id: s.id, t0: s.t0, t1: s.t1, camera, accents, graphic, multi };
  });

  const first = shots.length ? shots[0].t0 : p.length;
  const steps = els => new Set(els.filter(e => e.own && e.on).map(e => key(e))).size;
  const pre = samples.filter(x => x.t < first);
  // words that arrive in steps: the number of own-text elements on screen grows more than once
  const growth = xs => { let n = 0, last = 0; for (const x of xs) { const k = steps(x.els); if (k > last) n++; last = k; } return n; };
  const travels = xs => xs.some((x, j) => j > 0 && x.els.some(e => { const o = xs[j - 1].els.find(q => key(q) === key(e)); return o && e.on && o.on && moved(e, o, 30, .05); }));
  const opener = { seconds: +first.toFixed(2), steps: growth(pre), moving: travels(pre) };

  const kinetic = line => {
    const want = String(line || '').replace(/\s+/g, '');
    if (!want) return null;
    // the smallest element that ever holds the whole line (one on screen if there is one), then it and the parts of it
    // that carry text in every sample: a typed line holds only part of the words for a while
    let hk = null;
    for (const x of samples) {
      const h = x.els.filter(e => e.text.includes(want)).sort((a, b) => a.text.length - b.text.length)[0];
      if (h && (!hk || h.on)) hk = key(h);
      if (h?.on) break;
    }
    if (!hk) return { found: false, onScreen: false, kinetic: false };
    const scene = hk.split('#')[0], root = +hk.split('#')[1];
    const parts = x => {
      const els = x.els.filter(e => e.scene === scene), by = new Map(els.map(e => [e.i, e]));
      const under = e => { for (let q = e; q; q = by.get(q.parent)) if (q.i === root) return true; return false; };
      return els.filter(e => (e.own || e.i === root) && under(e));
    };
    const xs = samples.map(x => ({ t: x.t, parts: parts(x) }));
    const shown = xs.filter(r => r.parts.some(e => e.on));
    if (!shown.length) return { found: true, onScreen: false, kinetic: false };
    const span = xs.filter(r => r.t >= shown[0].t - step && r.t <= shown[shown.length - 1].t + step);
    let why = growth(span.map(r => ({ els: r.parts.filter(e => e.own) }))) >= 2 ? 'in steps' : null;
    for (let j = 1; !why && j < span.length; j++) {
      for (const e of span[j].parts) {
        const o = span[j - 1].parts.find(q => q.i === e.i);
        if (o && e.on && o.on && (moved(e, o, 30, .05) || e.clip !== o.clip || e.text !== o.text)) { why = 'moves'; break; }
      }
    }
    return { found: true, onScreen: true, kinetic: !!why, why };
  };
  return { step, shots, opener, title: kinetic(lines.title), closing: kinetic(lines.closing) };
}
