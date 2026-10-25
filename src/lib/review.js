// `fvs review`: the project looked at by HyperFrames' checks (layout, contrast, readability, runtime), plus one of
// ours (footage that does not fill the frame). The page is buildHtml(mode 'hf'); these are the parts that need no
// browser (where to look, how to report), and footageOnScreen, which the CLI hands to its own capture page.
import { visibleHits } from './project.js';
import { videos } from './html.js';

/** The HyperFrames CLI release `fvs review` runs (npx). Pinned: its checks and their codes change between releases. */
export const HYPERFRAMES_VERSION = '0.8.190';

/** Codes that misread a Video Studio page: the score lives in the payload, not in an <audio> element. */
const NOT_OURS = new Set(['film_silent']);
const MAX_TIMES = 60;

/**
 * Where to look: each scene's middle, and a moment after each hit on screen (what a cut or an entrance just put
 * there). A hit moment within 0.2 s of another moment is dropped; past MAX_TIMES the hits are thinned evenly. The
 * middles all stay.
 */
export function reviewTimes(p) {
  const mids = p.scenes.map(s => (s.t0 + s.t1) / 2);
  const hits = p.scenes.flatMap(s => visibleHits(s).map(h => Math.min(h.t + 0.3, s.t1 - 0.05)).filter(t => t > s.t0));
  const keep = Math.max(0, MAX_TIMES - mids.length);
  const picked = hits.length <= keep ? hits : Array.from({ length: keep }, (_, i) => hits[Math.floor(i * hits.length / keep)]);
  // every scene's middle is looked at, however short the scene; a hit moment only where nothing else is looked at nearby
  const out = mids.filter(t => t >= 0 && t < p.length);
  for (const t of picked) if (t >= 0 && t < p.length && out.every(u => Math.abs(t - u) >= 0.2)) out.push(t);
  return [...new Set(out.map(t => +t.toFixed(3)))].sort((a, b) => a - b);
}

/** Below this share of the frame the footage on screen is reported (`footage_not_filling`); under half, as an error. */
const FILL = 0.9;

/** Where to look for footage that does not fill the frame (HyperFrames does not): the middle of every scene with a clip. */
export function footageTimes(p) {
  return p.scenes.filter(s => videos(s.html).some(v => v.src)).map(s => +((s.t0 + s.t1) / 2).toFixed(3));
}

/**
 * Runs in the capture page after `__stage.seek(t)`, with the project's width: how much of the stage the footage on
 * screen covers. Each visible <video>'s picture (its box; with object-fit contain, the default, none or scale-down, the
 * picture inside it), cut to the parents whose overflow clips it, sampled on a 64×36 grid over the stage. A video marked
 * `data-layout-ignore` (or inside one) is left out. null: no footage on screen. ponytail: transforms count as their
 * bounding box, clip-path and object-position are ignored; measure the picture's pixels if a wipe or an off-centre crop
 * is ever misreported.
 */
export function footageOnScreen(width) {
  const stage = document.querySelector('.fvs-stage')?.getBoundingClientRect();
  if (!stage || !stage.width) return null;
  const shown = [...document.querySelectorAll('.fvs-stage video')].filter(v => !v.closest('[data-layout-ignore]') && v.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }));
  if (!shown.length) return null;
  const k = width / stage.width, root = document.querySelector('.fvs-stage');
  const pics = shown.map(v => {
    let { left: l, top: t, width: w, height: h } = v.getBoundingClientRect();
    const fit = getComputedStyle(v).objectFit, vw = v.videoWidth, vh = v.videoHeight;
    if (fit !== 'fill' && fit !== 'cover' && vw && vh) { // the picture inside the box, centred
      const contain = Math.min(w / vw, h / vh), own = v.offsetWidth ? w / v.offsetWidth : 1; // own: its pixels at 1:1, transforms applied
      const s = fit === 'none' ? own : fit === 'scale-down' ? Math.min(contain, own) : contain;
      l += (w - vw * s) / 2; t += (h - vh * s) / 2; w = vw * s; h = vh * s;
    }
    let r = l + w, b = t + h;
    // what a parent's overflow cuts away is not on screen, but it cuts only what it contains as a block: an absolutely
    // placed element skips the unpositioned parents between it and the one it is placed in, a fixed one every parent
    // that does not hold fixed boxes (a transform of any kind, a filter, perspective, layout or paint containment, or
    // the will-change of one). ponytail: clip-path and the scrolled offset of a scrolling parent are not counted.
    const holdsFixed = ac => ['transform', 'translate', 'rotate', 'scale', 'perspective', 'filter', 'backdropFilter'].some(k => ac[k] && ac[k] !== 'none')
      || /layout|paint|strict|content/.test(ac.contain) || (ac.containerType && ac.containerType !== 'normal')
      || (ac.contentVisibility && ac.contentVisibility !== 'visible') || /transform|translate|rotate|scale|perspective|filter/.test(ac.willChange);
    let placed = getComputedStyle(v).position;
    for (let a = v.parentElement; a && a !== root; a = a.parentElement) {
      const ac = getComputedStyle(a), boxed = holdsFixed(ac);
      if (placed === 'fixed' ? !boxed : placed === 'absolute' ? ac.position === 'static' && !boxed : false) continue;
      placed = ac.position;
      if (ac.overflow === 'visible') continue;
      const c = a.getBoundingClientRect();
      l = Math.max(l, c.left); t = Math.max(t, c.top); r = Math.min(r, c.right); b = Math.min(b, c.bottom);
    }
    return { src: v.getAttribute('src') || '', l, t, r, b, w: Math.max(0, Math.round((r - l) * k)), h: Math.max(0, Math.round((b - t) * k)) };
  });
  let hit = 0;
  for (let i = 0; i < 64; i++) for (let j = 0; j < 36; j++) {
    const x = stage.left + (i + 0.5) * stage.width / 64, y = stage.top + (j + 0.5) * stage.height / 36;
    if (pics.some(q => x >= q.l && x < q.r && y >= q.t && y < q.b)) hit++;
  }
  return { share: hit / (64 * 36), frame: [Math.round(stage.width * k), Math.round(stage.height * k)], shots: pics.map(({ src, w, h }) => ({ src, w, h })) };
}

/** footageOnScreen() results ({ t, share, frame, shots }) as findings for groupFindings' `footage` section. */
export function footageFindings(seen) {
  return seen.filter(m => m && m.share < FILL).map(m => ({
    code: 'footage_not_filling', severity: m.share < 0.5 ? 'error' : 'warning', time: m.t,
    selector: m.shots.map(s => `video[src="${s.src}"]`).join(', '),
    message: `The footage covers ${Math.round(m.share * 100)}% of the frame: ${m.shots.map(s => `${s.src || 'a video'} at ${s.w}×${s.h}`).join(', ')} in ${m.frame[0]}×${m.frame[1]}; the rest is the stage background.`,
    fixHint: 'size every shot to the frame in the project css, before the first scene (a scene\'s own css block applies inside that scene only): video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }. A deliberate inset (picture in picture, a framed screen recording): data-layout-ignore on the video.',
  }));
}

/**
 * Runs in the capture page after `__stage.seek(t)`: dark gradients (or a see-through dark fill) over a third of the
 * stage or more, in a scene with no words anywhere in it (its text, timed or not, counted whatever is on screen now).
 * A scrim is there for text; on a bare shot it only darkens the footage (the title's scrim copied onto every shot).
 * Inside `data-layout-ignore` is left out. ponytail: colours computed as rgb()/rgba() only (an oklch or color-mix
 * stop is not read), the box's share of the stage stands for the gradient's (a gradient fading out halfway still
 * counts its whole box), and an overlay in the stage's html outside every scene is not looked at.
 */
export function scrimsOnScreen() {
  const root = document.querySelector('.fvs-stage'), stage = root?.getBoundingClientRect();
  if (!stage || !stage.width) return [];
  const dark = c => { const n = c.match(/[\d.]+/g); return !!n && +(n[3] ?? 1) >= 0.3 && Math.max(+n[0], +n[1], +n[2]) < 80; };
  const words = sc => { const w = document.createTreeWalker(sc, NodeFilter.SHOW_TEXT); for (let n; (n = w.nextNode());) if (n.data.trim() && !n.parentElement.closest('script, style')) return true; return false; };
  const bare = new Map();
  return [...root.querySelectorAll('[data-scene] *')].flatMap(el => {
    if (el.tagName === 'VIDEO' || el.closest('[data-layout-ignore]') || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return [];
    const cs = getComputedStyle(el), fill = cs.backgroundColor.match(/rgba?\([^)]*\)/)?.[0] || '';
    const tint = dark(fill) && +(fill.match(/[\d.]+/g)[3] ?? 1) < 1;
    if (!tint && !(cs.backgroundImage.includes('gradient(') && (cs.backgroundImage.match(/rgba?\([^)]*\)/g) || []).some(dark))) return [];
    const r = el.getBoundingClientRect();
    const share = Math.max(0, Math.min(r.right, stage.right) - Math.max(r.left, stage.left)) * Math.max(0, Math.min(r.bottom, stage.bottom) - Math.max(r.top, stage.top)) / (stage.width * stage.height);
    if (share < 1 / 3) return [];
    const sc = el.closest('[data-scene]');
    if (!bare.has(sc)) bare.set(sc, !words(sc));
    return bare.get(sc) ? [{ scene: sc.dataset.scene, selector: el.tagName.toLowerCase() + [...el.classList].map(c => `.${c}`).join(''), share }] : [];
  });
}

/** scrimsOnScreen() results ({ t, scene, selector, share }) as findings for the `footage` section. */
export function scrimFindings(seen) {
  return seen.map(m => ({
    code: 'scrim_without_text', severity: 'warning', time: m.t, selector: m.selector,
    message: `A dark scrim covers ${Math.round(m.share * 100)}% of the frame in "${m.scene}", a shot with no words: it only darkens the footage.`,
    fixHint: 'a scrim is for text: keep it only in the scenes with a title, caption or closing line, as a band behind the part of the frame the text sits in, and take it out of this scene. A deliberate grade or vignette: data-layout-ignore on it.',
  }));
}

/** Every finding of a `hyperframes check --json` report (and our `footage` section), flattened, with its section. */
function flatten(report) {
  const out = [];
  for (const section of ['lint', 'runtime', 'layout', 'motion', 'contrast', 'craft', 'footage']) {
    for (const f of report?.[section]?.findings || []) out.push({ ...f, section });
  }
  return out;
}

/**
 * The report by scene: [{ id, title, t0, t1, findings }] in film order, then `counts`. A finding goes to the scene on
 * screen at its time (one without a time, e.g. lint, to `film`). Info-level findings only with `all`.
 */
export function groupFindings(p, report, { all = false } = {}) {
  const film = { id: 'film', title: '', t0: 0, t1: p.length, findings: [] };
  const scenes = p.scenes.map(s => ({ id: s.id, title: s.title || '', t0: s.t0, t1: s.t1, findings: [] }));
  const counts = { error: 0, warning: 0, info: 0 };
  for (const f of flatten(report)) {
    if (NOT_OURS.has(f.code)) continue;
    const severity = f.severity === 'error' ? 'error' : f.severity === 'warning' ? 'warning' : 'info';
    counts[severity]++;
    if (severity === 'info' && !all) continue;
    const t = Number.isFinite(f.time) && f.section !== 'lint' ? f.time : null;
    const home = t == null ? film : scenes.find(s => t >= s.t0 && t < s.t1) || scenes[scenes.length - 1] || film;
    home.findings.push({ t, severity, code: f.code, section: f.section, selector: (f.selector || '').replace(/^div\.fvs-scenes > div:nth-of-type\(\d+\) > /, ''), text: f.text || '', message: f.message || '', fix: f.fixHint || '' });
  }
  for (const s of [film, ...scenes]) s.findings.sort((a, b) => (a.t ?? -1) - (b.t ?? -1));
  return { scenes: [film, ...scenes].filter(s => s.findings.length), counts };
}

/** The grouped report as text for the person or the Director. */
export function formatReview({ scenes, counts }, { times = 0 } = {}) {
  const lines = [];
  for (const s of scenes) {
    lines.push(s.id === 'film' ? 'whole film' : `${s.id}${s.title ? ` · ${s.title}` : ''} · ${s.t0.toFixed(2)}–${s.t1.toFixed(2)} s`);
    for (const f of s.findings) {
      const what = [f.selector, f.text && !f.message.includes(f.text) ? `"${f.text.slice(0, 60)}"` : ''].filter(Boolean).join(' ');
      lines.push(`  ${f.severity.padEnd(7)} ${f.t == null ? '' : `${f.t.toFixed(2)} s `}${f.code}${what ? ` · ${what}` : ''}`);
      lines.push(`          ${f.message}`);
      if (f.fix && f.severity !== 'info') lines.push(`          fix: ${f.fix}`);
    }
  }
  lines.push(`${counts.error} error(s), ${counts.warning} warning(s), ${counts.info} note(s) at ${times} moments. Advice, not a gate: a finding can be a deliberate choice (mark it, see the skill).`);
  return lines.join('\n');
}
