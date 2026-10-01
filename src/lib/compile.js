// Project → runtime payload → standalone HTML. DOM-free: used by the plugin, the CLI and tests.
import { cssBlocks, stageHtml, stageJs, tempoOf, parseLength } from './project.js';
import { videos } from './html.js';

const ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i;
export const isRelativeUrl = u => !!u && !ABSOLUTE.test(u.trim()) && !/^\$\{/.test(u) && !/^%%/.test(u);

const ATTR = /(\s(?:src|href|poster|xlink:href)\s*=\s*)(["'])([^"']*)\2/gi;
const CSS_URL = /url\(\s*(["']?)([^"')]+)\1\s*\)/gi;

/** Every relative asset reference in a chunk of html / css (for listing and resolving). */
export function assetRefs(html = '', css = '') {
  const out = new Set();
  for (const m of html.matchAll(ATTR)) if (isRelativeUrl(m[3])) out.add(clean(m[3]));
  for (const m of (html + '\n' + css).matchAll(CSS_URL)) if (isRelativeUrl(m[2])) out.add(clean(m[2]));
  return [...out];
}
const clean = u => u.trim().replace(/^\.\//, '');

export const rewriteHtml = (html, map) => html.replace(ATTR, (m, pre, q, u) => (isRelativeUrl(u) && map[clean(u)] ? `${pre}${q}${map[clean(u)]}${q}` : m));
export const rewriteCss = (css, map) => css.replace(CSS_URL, (m, q, u) => (isRelativeUrl(u) && map[clean(u)] ? `url(${q}${map[clean(u)]}${q})` : m));

/** Settings lists that may be written as one string or an array. */
const list = v => (v == null ? [] : Array.isArray(v) ? v : [v]);

/**
 * Audio tracks: "a.mp3" or { "src": "a.mp3", "at": 0, "gain": -3, "role": "score", "in": 0, "dur": null, "mute": false }.
 * `at` is the project time where the track starts playing, from `in` seconds into the file, for `dur` seconds
 * (null = to the end of the file). `in` / `dur` also take length strings ("2 bars"). Never throws: values that
 * do not read fall back to the defaults (parseProject reports them).
 */
export function audioTracks(meta) {
  const tempo = tempoOf(meta);
  const seconds = v => { if (v === undefined || v === null || v === '') return null; try { const x = parseLength(v, tempo); return Number.isFinite(x) ? x : null; } catch { return null; } };
  return list(meta.audio).map((a, i) => (typeof a === 'string' ? { src: a } : a)).filter(a => a && a.src)
    .map((a, i) => {
      const from = seconds(a.in), dur = seconds(a.dur);
      return { id: a.id || `a${i}`, src: String(a.src), at: +a.at || 0, gain: +a.gain || 0, role: a.role || (i ? 'track' : 'score'), in: from > 0 ? from : 0, dur: dur > 0 ? dur : null, mute: !!a.mute };
    });
}

/**
 * The sound of the scene videos: one segment per <video> without `muted`, playing while its scene is on
 * screen. at = the scene's visible start, in = data-clip-in + the scene's in-point, dur = the visible length.
 */
function sceneMedia(p) {
  const out = [];
  for (const s of p.scenes) {
    videos(s.html).forEach((v, k) => {
      if (v.muted || !v.src) return;
      out.push({ id: `${s.id}/video-${k}`, scene: s.id, src: v.src, at: s.t0, in: v.clipIn + s.in, dur: s.dur, gain: v.gain, loop: v.loop });
    });
  }
  return out;
}

/**
 * The payload the runtime mounts. `resolve(relPath)` turns a project-relative asset path into a URL the
 * page can load (the Studio uses vault asset URLs; the HTML export keeps them relative or inlines them).
 */
export function compile(p, { resolve = u => u } = {}) {
  const css = cssBlocks(p).join('\n\n');
  const refs = new Set([...assetRefs(stageHtml(p), css), ...list(p.meta.assets).map(clean)]);
  for (const s of p.scenes) for (const r of assetRefs(s.html, s.css)) refs.add(r);
  const audio = audioTracks(p.meta);
  const map = {};
  for (const r of refs) map[r] = resolve(r);
  const url = src => (isRelativeUrl(src) ? map[clean(src)] ?? resolve(clean(src)) : src);
  const jsLine = k => (k >= 0 ? p.toks[k].line + 1 : 0);
  return {
    v: 1,
    title: p.meta.title || '',
    lang: p.meta.lang || 'zh-CN',
    width: +p.meta.width, height: +p.meta.height, fps: +p.meta.fps,
    length: p.length,
    tempo: p.tempo ? { bpm: p.tempo.bpm, beatsPerBar: p.tempo.beatsPerBar } : null,
    background: p.meta.background || '#000',
    className: p.meta.class || '',
    fonts: list(p.meta.fonts),
    css: rewriteCss(css, map),
    stage: { html: rewriteHtml(stageHtml(p), map), js: stageJs(p), line: jsLine(p.stageJs) },
    scenes: p.scenes.map(s => ({
      id: s.id, title: s.title, t0: s.t0, t1: s.t1, t0v: s.t0v, in: s.in, transition: s.transition, hits: s.hitTimes, beats: s.hits,
      cls: s.meta.class || '', html: rewriteHtml(s.html, map), css: rewriteCss(s.css, map), js: s.js,
      line: jsLine(s.jsTok), htmlLine: jsLine(s.htmlTok),
    })),
    audio: audio.map(a => ({ ...a, url: resolve(a.src) })),
    media: sceneMedia(p).map(m => ({ ...m, url: url(m.src) })),
    assets: map,
  };
}

const track = a => ({ id: a.id, kind: 'track', src: a.src, url: a.url ?? a.src, at: +a.at || 0, in: +a.in || 0, dur: a.dur > 0 ? +a.dur : null, gain: +a.gain || 0, mute: !!a.mute, role: a.role });
const video = (m, assets = {}) => ({ id: m.id, kind: 'video', scene: m.scene, src: m.src, url: m.url ?? assets[clean(m.src)] ?? m.src, at: +m.at || 0, in: +m.in || 0, dur: m.dur > 0 ? +m.dur : null, gain: +m.gain || 0, mute: false, loop: !!m.loop });

/**
 * Everything audible, as one list: [{ id, kind: 'track' | 'video', src, url, at, in, dur, gain, mute }]
 * (+ role on tracks, scene and loop on videos). A segment plays file time `in + (t - at)` while
 * at ≤ t < at + dur (dur null = to the end of the file). Takes a compiled payload (urls resolved) or a
 * parsed project (url = src, project-relative).
 */
export function audioSegments(x) {
  if (x && Array.isArray(x.toks)) return [...audioTracks(x.meta).map(track), ...sceneMedia(x).map(m => video(m))];
  return payloadSegments(x);
}

/** audioSegments() of a compiled payload; the page runtime imports only this half. */
export const payloadSegments = P => (P ? [...(P.audio || []).map(track), ...(P.media || []).map(m => video(m, P.assets))] : []);

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/** JSON that is safe inside a <script> element. */
export const scriptJSON = v => JSON.stringify(v).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

/**
 * A standalone page: the payload, the runtime and a mode.
 *   mode 'player'  – a page with a transport and chapter list (what "Export HTML" writes)
 *   mode 'capture' – the bare stage at 1:1 with window.__stage.seek(t) (what the renderer drives)
 *   mode 'embed'   – the stage fitted to the window, driven by the Studio through window.__fvs
 */
export function buildHtml(payload, runtimeSource, { mode = 'player', extraHead = '' } = {}) {
  const fonts = payload.fonts.map(u => `<link rel="stylesheet" href="${esc(u)}">`).join('\n');
  // a video's sound has the same url as the video asset: write it once (an inlined clip would double the page)
  const assets = payload.assets || {};
  if ((payload.media || []).some(m => m.url && assets[clean(m.src)] === m.url)) {
    payload = { ...payload, media: payload.media.map(m => (m.url && assets[clean(m.src)] === m.url ? { ...m, url: null } : m)) };
  }
  return `<!doctype html>
<html lang="${esc(payload.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(payload.title || 'Forsion Video Studio')}</title>
<meta name="generator" content="Forsion Video Studio">
${fonts}
${extraHead}
</head>
<body>
<script type="application/json" id="fvs-data">${scriptJSON(payload)}</script>
<script>${runtimeSource.replace(/<\/script/gi, '<\\/script')}</script>
<script>FVS.boot(${JSON.stringify(mode)});</script>
</body>
</html>
`;
}
