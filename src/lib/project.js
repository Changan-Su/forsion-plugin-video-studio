// Forsion Video Studio project files (`*.fvs.md`): parse, edit and serialize.
//
// A project is a Markdown document. Fenced blocks carry the parts the Studio understands:
//
//   ```fvs          project settings (JSON), before the first scene
//   ```css          global stylesheet (one or more blocks, before the first scene)
//   ```html stage   persistent layers around the scenes (backdrops, grain, flash)
//   ```js stage     script run after every scene is built (backdrops, global hooks)
//   ## id · Title   one scene; scenes play in document order, back to back
//   ```fvs          scene settings (JSON): length, hits, class, in, transition
//   ```html         scene markup; its text is what the Studio lets people edit
//   ```css          scene styles, scoped to the scene by the runtime
//   ```js           scene script (keyframes); runs with the scene API in scope
//
// Everything else (prose, other fences) is kept byte for byte. Edits rewrite only the tokens they touch,
// so a hand-written or AI-written project survives a round trip through the Studio.
// No DOM here: the same module runs in the plugin, in the runtime page and in the node CLI.

const FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})(.*)$/;
const HEADING = /^ {0,3}(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/;
const SCENE_HEAD = /^([A-Za-z][\w-]*)(?:\s*(?:·|—|–|-|:|：|\|)\s*(.*))?$/;
export const ID_RE = /^[A-Za-z][\w-]*$/;

export const DEFAULTS = { width: 1920, height: 1080, fps: 30 };

/** Transition ids (stable; the UI translates them). A transition plays at the start of the scene that names it. */
export const TRANSITIONS = ['fade', 'dip', 'slide-left', 'slide-up', 'push-left', 'wipe-left', 'zoom', 'blur'];

/* ───────── tokens ───────── */

export function tokenize(src) {
  const eol = /\r\n/.test(src) ? '\r\n' : '\n';
  const text = src.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const endsWithNl = text.endsWith('\n');
  if (endsWithNl) lines.pop();
  const toks = [];
  let buf = [], bufLine = 1;
  const flush = () => { if (buf.length) { toks.push({ kind: 'text', raw: buf.join(''), line: bufLine }); buf = []; } };
  for (let i = 0; i < lines.length; i++) {
    const nl = i < lines.length - 1 || endsWithNl ? '\n' : '';
    const line = lines[i];
    const f = line.match(FENCE_OPEN);
    if (f && !(f[2][0] === '`' && f[3].includes('`'))) {
      flush();
      const fence = f[2], info = f[3].trim();
      const close = new RegExp(`^ {0,3}${fence[0] === '`' ? '`' : '~'}{${fence.length},}[ \\t]*$`);
      const body = [];
      let j = i + 1, closed = false;
      for (; j < lines.length; j++) {
        if (close.test(lines[j])) { closed = true; break; }
        body.push(lines[j]);
      }
      const last = closed ? j : lines.length - 1;
      const rawLines = lines.slice(i, last + 1);
      const rawNl = last < lines.length - 1 || endsWithNl ? '\n' : '';
      const [lang = '', ...tags] = info.split(/\s+/).filter(Boolean);
      toks.push({ kind: 'fence', raw: rawLines.join('\n') + rawNl, line: i + 1, fence, info, lang: lang.toLowerCase(), tags: tags.map(t => t.toLowerCase()), body: body.join('\n'), closed, indent: f[1] });
      i = last;
      continue;
    }
    const h = line.match(HEADING);
    if (h) {
      flush();
      toks.push({ kind: 'heading', raw: line + nl, line: i + 1, level: h[1].length, text: h[2] });
      continue;
    }
    if (!buf.length) bufLine = i + 1;
    buf.push(line + nl);
  }
  flush();
  return { toks, eol };
}

function fenceRaw(tok) {
  let fence = tok.fence || '```';
  const ch = fence[0];
  const runs = tok.body.match(new RegExp(`^ {0,3}\\${ch}{3,}`, 'gm')) || [];
  const longest = Math.max(0, ...runs.map(r => r.trim().length));
  if (longest >= fence.length) fence = ch.repeat(longest + 1);
  const info = tok.info ? tok.info : '';
  return `${fence}${info}\n${tok.body ? tok.body + '\n' : ''}${fence}\n`;
}

export function serializeTokens(toks, eol = '\n') {
  let out = '';
  for (const t of toks) {
    let raw = t.raw;
    if (t.dirty) raw = t.kind === 'fence' ? fenceRaw(t) : t.kind === 'heading' ? `${'#'.repeat(t.level)} ${t.text}\n` : raw;
    if (out && !out.endsWith('\n')) out += '\n';
    out += raw;
  }
  return eol === '\n' ? out : out.replace(/\n/g, eol);
}

/* ───────── time ───────── */

const UNIT = /^\s*(-?\d+(?:\.\d+)?)\s*(bars?|beats?|b|s|sec|secs|seconds?|ms|小节|拍|秒)?\s*$/i;

/** Seconds per beat and bar, or null without a tempo. */
export function tempoOf(meta) {
  const t = meta && meta.tempo;
  if (!t || !(+t.bpm > 0)) return null;
  const beatsPerBar = +t.beatsPerBar > 0 ? +t.beatsPerBar : 4;
  const beat = 60 / +t.bpm;
  return { bpm: +t.bpm, beatsPerBar, beat, bar: beat * beatsPerBar };
}

/** A length is "4 bars", "6 beats", "2.5s" or a number of seconds. Returns seconds, or throws. */
export function parseLength(v, tempo) {
  if (typeof v === 'number' && isFinite(v)) return v;
  const m = typeof v === 'string' && v.match(UNIT);
  if (!m) throw new Error(`cannot read length ${JSON.stringify(v)} (use "4 bars", "6 beats" or "2.5s")`);
  const x = +m[1], u = (m[2] || 's').toLowerCase();
  if (/^(bars?|小节)$/.test(u)) { if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`); return x * tempo.bar; }
  if (/^(beats?|b|拍)$/.test(u)) { if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`); return x * tempo.beat; }
  if (u === 'ms') return x / 1000;
  return x;
}

const round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;

/** The canonical way the Studio writes a length back. */
export function formatLength(sec, tempo) {
  if (!tempo) return `${round(sec, 3)}s`;
  const beats = round(sec / tempo.beat, 4);
  const bars = beats / tempo.beatsPerBar;
  if (Math.abs(bars - Math.round(bars)) < 1e-6) return `${Math.round(bars)} ${Math.round(bars) === 1 ? 'bar' : 'bars'}`;
  return `${beats} ${beats === 1 ? 'beat' : 'beats'}`;
}

/** Hits are beats from the scene start with a tempo, seconds without one. */
export const hitUnit = tempo => (tempo ? tempo.beat : 1);

/* ───────── parse ───────── */

function readJSON(tok, where, errors) {
  if (!tok.body.trim()) return {};
  try {
    const v = JSON.parse(tok.body);
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('settings must be a JSON object');
    return v;
  } catch (e) {
    errors.push({ level: 'error', line: tok.line, scene: where, message: `invalid JSON in settings: ${e.message}` });
    return null;
  }
}

const isFvs = t => t.kind === 'fence' && (t.lang === 'fvs' || (t.lang === 'json' && t.tags.includes('fvs')));
const isLang = (t, ...langs) => t.kind === 'fence' && langs.includes(t.lang) && !isFvs(t);
const LANG = { html: ['html', 'htm'], js: ['js', 'javascript', 'mjs'], css: ['css'] };

/** Parse a project. Never throws: problems land in `errors` (level error | warning) with line numbers. */
export function parseProject(src) {
  const { toks, eol } = tokenize(String(src ?? ''));
  const errors = [];
  const p = { eol, toks, meta: { ...DEFAULTS }, metaTok: -1, rawMeta: null, css: [], stageHtml: -1, stageJs: -1, scenes: [], errors };
  let i = 0;
  // preamble
  for (; i < toks.length; i++) {
    const t = toks[i];
    if (t.kind === 'heading' && t.level === 2) break;
    if (t.kind === 'fence' && !t.closed) errors.push({ level: 'error', line: t.line, message: 'code block is never closed' });
    if (isFvs(t)) {
      if (p.metaTok >= 0) { errors.push({ level: 'warning', line: t.line, message: 'second project settings block ignored' }); continue; }
      p.metaTok = i;
      const m = readJSON(t, null, errors);
      if (m) { p.rawMeta = m; p.meta = { ...DEFAULTS, ...m }; }
    } else if (isLang(t, ...LANG.css)) p.css.push(i);
    else if (isLang(t, ...LANG.html) && (t.tags.includes('stage') || p.stageHtml < 0)) { if (p.stageHtml < 0) p.stageHtml = i; }
    else if (isLang(t, ...LANG.js) && (t.tags.includes('stage') || p.stageJs < 0)) { if (p.stageJs < 0) p.stageJs = i; }
  }
  if (p.metaTok < 0) errors.push({ level: 'warning', line: 1, message: 'no ```fvs project settings block; using 1920×1080 at 30 fps' });
  // scenes
  while (i < toks.length) {
    const head = toks[i];
    const s = { head: i, first: i, last: i, metaTok: -1, htmlTok: -1, jsTok: -1, cssTok: -1, meta: {}, title: '', id: '' };
    const hm = head.text.match(SCENE_HEAD);
    if (hm) { s.id = hm[1]; s.title = (hm[2] || '').trim(); }
    else { s.id = ''; s.title = head.text; errors.push({ level: 'error', line: head.line, message: `scene heading "${head.text}" must start with an id (letters, digits, - or _), e.g. "## intro · 开场"` }); }
    for (i++; i < toks.length; i++) {
      const t = toks[i];
      if (t.kind === 'heading' && t.level <= 2) break;
      s.last = i;
      if (t.kind === 'fence' && !t.closed) errors.push({ level: 'error', line: t.line, scene: s.id, message: 'code block is never closed' });
      if (isFvs(t)) { if (s.metaTok < 0) { s.metaTok = i; s.meta = readJSON(t, s.id, errors) || {}; } }
      else for (const k of ['html', 'js', 'css']) if (isLang(t, ...LANG[k])) {
        if (s[`${k}Tok`] < 0) s[`${k}Tok`] = i;
        else errors.push({ level: 'warning', line: t.line, scene: s.id, message: `second \`${k}\` block in scene "${s.id}" is ignored` });
      }
    }
    if (head.level === 1) continue; // a level-1 heading ends the scene list's current scene but is not a scene
    p.scenes.push(s);
  }
  // drop "scenes" that came from level-1 headings (the loop above only enters on level-2 headings)
  computeTimeline(p);
  return p;
}

/* ───────── derived views ───────── */

/** A scene's in-point in seconds: how far into its own content timeline the visible part starts. */
function inPoint(meta, tempo) {
  if (meta.in === undefined || meta.in === null) return 0;
  const v = parseLength(meta.in, tempo);
  if (!(v >= 0)) throw new Error(`"in" must not be negative, got ${JSON.stringify(meta.in)}`);
  return v;
}

/** { type, dur } from a scene's "transition" setting (dur unclamped), or throws. */
function readTransition(v, tempo) {
  const type = typeof v === 'string' ? v : v && typeof v === 'object' && !Array.isArray(v) ? v.type : undefined;
  if (typeof type !== 'string') throw new Error('"transition" must be a type such as "fade", or { "type": "fade", "dur": "1 beat" }');
  if (!TRANSITIONS.includes(type)) throw new Error(`unknown transition "${type}" (use ${TRANSITIONS.join(', ')})`);
  const raw = typeof v === 'object' ? v.dur : undefined;
  const dur = raw === undefined || raw === null ? (tempo ? tempo.beat : .5) : parseLength(raw, tempo);
  if (!(dur > 0)) throw new Error(`transition "dur" must be positive, got ${JSON.stringify(raw)}`);
  return { type, dur };
}

function computeTimeline(p) {
  const tempo = tempoOf(p.meta);
  p.tempo = tempo;
  const seen = new Set();
  const body = (s, k) => (s[`${k}Tok`] >= 0 ? p.toks[s[`${k}Tok`]].body : '');
  let t = 0;
  for (const [k, s] of p.scenes.entries()) {
    s.index = k;
    s.html = body(s, 'html');
    s.js = body(s, 'js');
    s.css = body(s, 'css');
    s.line = p.toks[s.head].line;
    const metaLine = s.metaTok >= 0 ? p.toks[s.metaTok].line : s.line;
    if (s.id && seen.has(s.id)) p.errors.push({ level: 'error', line: s.line, scene: s.id, message: `duplicate scene id "${s.id}"` });
    seen.add(s.id);
    let len = 0;
    try {
      if (s.meta.length === undefined) throw new Error('scene has no "length" (e.g. "length": "2 bars")');
      len = parseLength(s.meta.length, tempo);
      if (!(len > 0)) throw new Error(`length must be positive, got ${JSON.stringify(s.meta.length)}`);
    } catch (e) {
      p.errors.push({ level: 'error', line: metaLine, scene: s.id, message: e.message });
      len = len > 0 ? len : (tempo ? tempo.bar : 2);
    }
    // t0 / t1 / dur are the visible window; the content timeline starts `in` earlier, at t0v
    s.t0 = t; s.dur = len; s.t1 = t + len; t = s.t1;
    s.in = 0;
    try { s.in = inPoint(s.meta, tempo); } catch (e) { p.errors.push({ level: 'error', line: metaLine, scene: s.id, message: e.message.startsWith('"in"') ? e.message : `"in": ${e.message}` }); }
    s.t0v = s.t0 - s.in;
    s.transition = null;
    if (s.meta.transition !== undefined && s.meta.transition !== null) {
      try {
        const tr = readTransition(s.meta.transition, tempo);
        if (k === 0) p.errors.push({ level: 'warning', line: metaLine, scene: s.id, message: 'the first scene has nothing to transition from; its "transition" is ignored' });
        else s.transition = { type: tr.type, dur: Math.min(tr.dur, len) };
      } catch (e) { p.errors.push({ level: 'error', line: metaLine, scene: s.id, message: e.message }); }
    }
    const u = hitUnit(tempo);
    const hits = Array.isArray(s.meta.hits) ? s.meta.hits : [];
    if (s.meta.hits !== undefined && !Array.isArray(s.meta.hits)) p.errors.push({ level: 'error', line: s.line, scene: s.id, message: '"hits" must be an array of numbers' });
    s.hits = hits.filter(h => typeof h === 'number' && isFinite(h));
    if (s.hits.length !== hits.length) p.errors.push({ level: 'error', line: s.line, scene: s.id, message: '"hits" must contain numbers only' });
    for (let j = 1; j < s.hits.length; j++) if (s.hits[j] < s.hits[j - 1]) { p.errors.push({ level: 'warning', line: s.line, scene: s.id, message: 'hits are not in ascending order' }); break; }
    // hits count from the content start; the ones trimmed away by `in` are fine, and so are the ones past the
    // end when the next scene continues this one (a split)
    const end = s.in + len, next = p.scenes[k + 1];
    let continued = false;
    if (next) { try { continued = inPoint(next.meta, tempo) > 0 && body(next, 'html') === s.html && body(next, 'css') === s.css && body(next, 'js') === s.js; } catch { continued = false; } }
    s.continued = continued;
    if (s.hits.some(h => h < 0 || (h * u > end + 1e-6 && !continued))) p.errors.push({ level: 'warning', line: s.line, scene: s.id, message: `a hit falls outside the scene (0–${round(end / u, 3)} ${tempo ? 'beats' : 's'})` });
    s.hitTimes = s.hits.map(h => t0Round(s.t0v + h * u));
    if (!s.html.trim() && !s.js.trim()) p.errors.push({ level: 'warning', line: s.line, scene: s.id, message: 'scene has no html or js block' });
  }
  p.length = t;
  const m = p.meta;
  const metaLine = p.metaTok >= 0 ? p.toks[p.metaTok].line : 1;
  for (const k of ['width', 'height', 'fps']) if (!(+m[k] > 0)) p.errors.push({ level: 'error', line: metaLine, message: `"${k}" must be a positive number` });
  checkAudio(p, metaLine);
  if (!p.scenes.length) p.errors.push({ level: 'warning', line: 1, message: 'the project has no scenes yet (add a "## id · Title" section)' });
}

/** The audio tracks' trim settings: "in" (into the file) and "dur" take seconds or a length string. */
function checkAudio(p, line) {
  const raw = p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio];
  raw.forEach((a, i) => {
    if (!a || typeof a !== 'object') return;
    const name = `audio track ${i + 1}${a.src ? ` (${a.src})` : ''}`;
    for (const [k, min] of [['in', 0], ['dur', 1e-9]]) {
      if (a[k] === undefined || a[k] === null) continue;
      try {
        const v = parseLength(a[k], p.tempo);
        if (!(v >= min)) throw new Error(k === 'in' ? 'must not be negative' : 'must be positive');
      } catch (e) { p.errors.push({ level: 'error', line, message: `${name} "${k}": ${e.message}` }); }
    }
  });
}

// times sit exactly on the beat grid; keep float dust out of them
const t0Round = x => Math.round(x * 1e9) / 1e9;

export const cssBlocks = p => p.css.map(k => p.toks[k].body);
export const stageHtml = p => (p.stageHtml >= 0 ? p.toks[p.stageHtml].body : '');
export const stageJs = p => (p.stageJs >= 0 ? p.toks[p.stageJs].body : '');
export const sceneById = (p, id) => p.scenes.find(s => s.id === id) || null;
export const sceneAt = (p, t) => p.scenes.find(s => t >= s.t0 && t < s.t1) || (t >= p.length ? p.scenes[p.scenes.length - 1] : null) || null;

/**
 * The hits that are on screen: [{ index, t }] with t in [t0, t1]. `index` is the hit's position in `hits`
 * (what h3 / hits[3] name); hits before the in-point or past the visible end are left out.
 */
export const visibleHits = s => (s.hitTimes || []).map((t, index) => ({ index, t }))
  .filter(h => h.t >= s.t0 - 1e-6 && (s.continued ? h.t < s.t1 - 1e-6 : h.t <= s.t1 + 1e-6));

/** The cue sheet a score is written against: every scene with its bars and its visible hits. */
export function cueSheet(p) {
  const tempo = p.tempo;
  return {
    title: p.meta.title || '',
    bpm: tempo ? tempo.bpm : null,
    beatsPerBar: tempo ? tempo.beatsPerBar : null,
    length: round(p.length, 6),
    fps: +p.meta.fps,
    scenes: p.scenes.map(s => {
      const vis = visibleHits(s);
      return {
        id: s.id, title: s.title, t0: round(s.t0, 6), t1: round(s.t1, 6),
        ...(tempo ? { bar: round(s.t0 / tempo.bar, 6), bars: round(s.dur / tempo.bar, 6), beat: round(s.t0 / tempo.beat, 6) } : {}),
        ...(s.in ? { in: round(s.in, 6) } : {}),
        ...(s.transition ? { transition: { type: s.transition.type, dur: round(s.transition.dur, 6) } } : {}),
        hits: vis.map(h => s.hits[h.index]), hitTimes: vis.map(h => round(h.t, 6)),
      };
    }),
    audio: (p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio]).map(a => (typeof a === 'string' ? { src: a } : a)),
  };
}

/* ───────── JSON formatting ───────── */

/** JSON that stays on one line when short, like people write settings by hand. */
export function formatJSON(v, width = 88, indent = '') {
  const one = oneLine(v);
  if (one.length + indent.length <= width || v === null || typeof v !== 'object') return one;
  const ind = indent + '  ';
  if (Array.isArray(v)) return `[\n${v.map(x => ind + formatJSON(x, width, ind)).join(',\n')}\n${indent}]`;
  return `{\n${Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => `${ind}${JSON.stringify(k)}: ${formatJSON(x, width, ind)}`).join(',\n')}\n${indent}}`;
}
function oneLine(v) {
  if (Array.isArray(v)) return `[${v.map(oneLine).join(', ')}]`;
  if (v && typeof v === 'object') {
    const e = Object.entries(v).filter(([, x]) => x !== undefined);
    return e.length ? `{ ${e.map(([k, x]) => `${JSON.stringify(k)}: ${oneLine(x)}`).join(', ')} }` : '{}';
  }
  return JSON.stringify(v);
}

/* ───────── edits: text in, text out ───────── */

function edit(src, fn) {
  const p = parseProject(src);
  fn(p);
  return serializeTokens(p.toks, p.eol);
}
const fence = (info, body) => ({ kind: 'fence', info, lang: info.split(/\s+/)[0], tags: info.split(/\s+/).slice(1), body, fence: '```', dirty: true, raw: '', closed: true });
const textTok = raw => ({ kind: 'text', raw });

function merge(obj, patch) {
  const out = { ...obj };
  for (const [k, v] of Object.entries(patch)) { if (v === undefined || v === null) delete out[k]; else out[k] = v; }
  return out;
}

function need(p, id) {
  const s = sceneById(p, id);
  if (!s) throw new Error(`no scene "${id}"`);
  return s;
}

/** Merge settings into the project block (null deletes a key). */
export function setProjectMeta(src, patch) {
  return edit(src, p => {
    const next = merge(p.rawMeta || {}, patch);
    if (p.metaTok >= 0) Object.assign(p.toks[p.metaTok], { body: formatJSON(next, 60), dirty: true });
    else {
      // insert after a leading title/prose, before any other block
      let at = 0;
      while (at < p.toks.length && p.toks[at].kind !== 'fence' && !(p.toks[at].kind === 'heading' && p.toks[at].level === 2)) at++;
      p.toks.splice(at, 0, fence('fvs', formatJSON(next, 60)), textTok('\n'));
    }
  });
}

/** Replace the global css (index into the css blocks), the stage html or the stage js. */
export function setProjectBlock(src, which, body, index = 0) {
  return edit(src, p => {
    const k = which === 'css' ? p.css[index] ?? -1 : which === 'html' ? p.stageHtml : p.stageJs;
    if (k >= 0) { Object.assign(p.toks[k], { body, dirty: true }); return; }
    const info = which === 'css' ? 'css' : `${which} stage`;
    let at = p.scenes.length ? p.scenes[0].first : p.toks.length;
    p.toks.splice(at, 0, fence(info, body), textTok('\n'));
  });
}

/** Merge settings into a scene (null deletes a key). */
export function setSceneMeta(src, id, patch) {
  return edit(src, p => {
    const s = need(p, id);
    const next = merge(s.meta, patch);
    if (s.metaTok >= 0) Object.assign(p.toks[s.metaTok], { body: formatJSON(next), dirty: true });
    else p.toks.splice(s.head + 1, 0, textTok('\n'), fence('fvs', formatJSON(next)));
  });
}

/** Replace a scene's html / js / css block, creating it when missing. */
export function setSceneBlock(src, id, kind, body) {
  return edit(src, p => {
    const s = need(p, id);
    const k = s[`${kind}Tok`];
    if (k >= 0) { Object.assign(p.toks[k], { body, dirty: true }); return; }
    // keep the canonical order: fvs, html, css, js
    const after = kind === 'html' ? [s.metaTok] : kind === 'css' ? [s.htmlTok, s.metaTok] : [s.cssTok, s.htmlTok, s.metaTok];
    const at = (after.find(x => x >= 0) ?? s.head) + 1;
    p.toks.splice(at, 0, textTok('\n'), fence(kind, body));
  });
}

export function renameScene(src, id, nextId, title) {
  if (nextId !== undefined && !ID_RE.test(nextId)) throw new Error(`scene id "${nextId}" must start with a letter and use letters, digits, - or _`);
  return edit(src, p => {
    const s = need(p, id);
    if (nextId && nextId !== id && sceneById(p, nextId)) throw new Error(`scene id "${nextId}" is taken`);
    const h = p.toks[s.head];
    const t = title === undefined ? s.title : title;
    Object.assign(h, { text: `${nextId || id}${t ? ` · ${t}` : ''}`, level: 2, dirty: true });
  });
}

/** Scene text for a new scene section. */
export function sceneSection({ id, title = '', meta = {}, html = '', css = '', js = '' }) {
  if (!ID_RE.test(id)) throw new Error(`scene id "${id}" must start with a letter and use letters, digits, - or _`);
  let out = `## ${id}${title ? ` · ${title}` : ''}\n\n\`\`\`fvs\n${formatJSON(meta)}\n\`\`\`\n`;
  if (html) out += `\n\`\`\`html\n${html.replace(/\n$/, '')}\n\`\`\`\n`;
  if (css) out += `\n\`\`\`css\n${css.replace(/\n$/, '')}\n\`\`\`\n`;
  if (js) out += `\n\`\`\`js\n${js.replace(/\n$/, '')}\n\`\`\`\n`;
  return out;
}

/** Insert a scene after `afterId` (null = at the end, '' = first). */
export function insertScene(src, afterId, scene) {
  return edit(src, p => {
    if (sceneById(p, scene.id)) throw new Error(`scene id "${scene.id}" is taken`);
    const tok = textTok(sceneSection(scene));
    let at;
    if (afterId === '') at = p.scenes.length ? p.scenes[0].first : p.toks.length;
    else if (afterId == null) at = p.scenes.length ? p.scenes[p.scenes.length - 1].last + 1 : p.toks.length;
    else at = need(p, afterId).last + 1;
    // a blank line before the new heading, unless the text before it already ends with one
    const before = serializeTokens(p.toks.slice(0, at));
    const lead = before && !/\n\n$/.test(before) ? '\n' : '';
    p.toks.splice(at, 0, textTok(lead + tok.raw + (at < p.toks.length ? '\n' : '')));
  });
}

export function deleteScene(src, id) {
  return edit(src, p => {
    const s = need(p, id);
    p.toks.splice(s.first, s.last - s.first + 1);
  });
}

/** Move a scene to position `to` in the scene order. */
export function moveScene(src, id, to) {
  return edit(src, p => {
    const s = need(p, id);
    const n = p.scenes.length;
    to = Math.max(0, Math.min(n - 1, to));
    if (to === s.index) return;
    let chunk = p.toks.slice(s.first, s.last + 1);
    const rest = p.scenes.filter(x => x !== s);
    // make sure the moved chunk ends with a blank line so headings stay separated
    const tail = chunk[chunk.length - 1];
    const raw = tail.dirty ? serializeTokens([tail]) : tail.raw;
    if (!/\n\n$/.test(raw)) chunk = [...chunk, textTok(raw.endsWith('\n') ? '\n' : '\n\n')];
    p.toks.splice(s.first, s.last - s.first + 1);
    const shift = x => (x > s.last ? x - (s.last - s.first + 1) : x);
    const at = to >= rest.length ? shift(rest[rest.length - 1].last) + 1 : shift(rest[to].first);
    p.toks.splice(at, 0, ...chunk);
  });
}

/** Copy a scene right after itself. `title` (optional) is the copy's exact title, e.g. a localized "X (copy)". */
export function duplicateScene(src, id, nextId, title) {
  const p = parseProject(src);
  const s = need(p, id);
  const t = typeof title === 'string' ? title : s.title ? `${s.title}（副本）` : '';
  return insertScene(src, id, { id: nextId, title: t, meta: s.meta, html: s.html, css: s.css, js: s.js });
}

/** A scene id that is not taken yet: base, base-2, base-3 … */
export function freeId(p, base = 'scene') {
  const ids = new Set(p.scenes.map(s => s.id));
  base = (base.match(/[A-Za-z][\w-]*/) || ['scene'])[0];
  if (!ids.has(base)) return base;
  for (let k = 2; ; k++) if (!ids.has(`${base}-${k}`)) return `${base}-${k}`;
}

/* ───────── timeline edits ───────── */

/** Set a scene's length in seconds (snapped by the caller). Later scenes move with it (ripple). */
export function setSceneLength(src, id, sec) {
  const p = parseProject(src);
  return setSceneMeta(src, id, { length: formatLength(Math.max(1e-3, sec), p.tempo) });
}

/**
 * Move the cut between scene `id` and the next one; the total length stays (a roll edit).
 * A next scene with an in-point (e.g. the second half of a split) moves its in-point with the cut, so its
 * content stays where it is; past in = 0, and for scenes without an in-point, its content moves with the cut
 * and its hits are rebased so they keep their absolute times.
 */
export function rollCut(src, id, sec) {
  const p = parseProject(src);
  const s = need(p, id);
  const next = p.scenes[s.index + 1];
  if (!next) return setSceneLength(src, id, sec);
  const total = s.dur + next.dur;
  const a = Math.max(1e-3, Math.min(total - 1e-3, sec));
  let out = setSceneMeta(src, id, { length: formatLength(a, p.tempo) });
  out = setSceneMeta(out, next.id, { length: formatLength(total - a, p.tempo) });
  let moved = a - s.dur;
  if (next.in > 0) {
    const nextIn = next.in + moved;
    out = setSceneIn(out, next.id, Math.max(0, nextIn));
    moved = Math.min(0, nextIn); // what the in-point could not absorb moves the content
  }
  // hits of the next scene keep their absolute times
  const u = hitUnit(p.tempo), shift = moved / u;
  if (next.hits.length && shift) out = setSceneMeta(out, next.id, { hits: next.hits.map(h => round(h - shift, 4)).filter(h => h >= 0) });
  return out;
}

/** A length setting for `sec` seconds, or null when it would read as zero. */
function lengthSetting(sec, tempo) {
  const v = formatLength(sec, tempo);
  return parseLength(v, tempo) > 1e-9 ? v : null;
}

/** Settings with `key` set to `value` (null removes it); a new key goes right after `after` when that exists. */
function placeKey(meta, key, value, after = 'length') {
  if (value === null || value === undefined) return merge(meta, { [key]: null });
  if (key in meta || !(after in meta)) return merge(meta, { [key]: value });
  const out = {};
  for (const [k, v] of Object.entries(meta)) { out[k] = v; if (k === after) out[key] = value; }
  return out;
}

/** Set a scene's in-point (seconds into its own content). Negative values clamp to 0; ~0 removes the key. */
export function setSceneIn(src, id, sec) {
  if (typeof sec !== 'number' || !Number.isFinite(sec)) throw new Error(`in-point must be a number of seconds, got ${JSON.stringify(sec)}`);
  return edit(src, p => {
    const s = need(p, id);
    const next = placeKey(s.meta, 'in', lengthSetting(Math.max(0, sec), p.tempo));
    if (s.metaTok >= 0) Object.assign(p.toks[s.metaTok], { body: formatJSON(next), dirty: true });
    else p.toks.splice(s.head + 1, 0, textTok('\n'), fence('fvs', formatJSON(next)));
  });
}

/** Set the transition at the start of scene `id`: a type from TRANSITIONS, or null to remove it. */
export function setTransition(src, id, type, dur) {
  if (type === null || type === undefined) return setSceneMeta(src, id, { transition: null });
  if (!TRANSITIONS.includes(type)) throw new Error(`unknown transition "${type}" (use ${TRANSITIONS.join(', ')})`);
  if (dur === undefined || dur === null) return setSceneMeta(src, id, { transition: type });
  if (typeof dur !== 'number' || !(dur > 0)) throw new Error(`transition duration must be a positive number of seconds, got ${JSON.stringify(dur)}`);
  const p = parseProject(src);
  return setSceneMeta(src, id, { transition: { type, dur: formatLength(dur, p.tempo) } });
}

/**
 * Split scene `id` at absolute time `atSec` (at least one frame inside it). The scene keeps its start and ends
 * at the split; a copy `newId` (same title, html, css, js, hits and class, no transition) follows with its
 * in-point moved by the same amount, so the content plays on uninterrupted. Later scenes do not move.
 */
export function splitScene(src, id, atSec, newId) {
  const p = parseProject(src);
  const s = need(p, id);
  if (newId === undefined || newId === null || newId === '') newId = freeId(p, id);
  if (!ID_RE.test(newId)) throw new Error(`scene id "${newId}" must start with a letter and use letters, digits, - or _`);
  if (sceneById(p, newId)) throw new Error(`scene id "${newId}" is taken`);
  const frame = 1 / (+p.meta.fps > 0 ? +p.meta.fps : DEFAULTS.fps);
  const lo = s.t0 + frame, hi = s.t1 - frame, f3 = x => round(x, 3);
  if (typeof atSec !== 'number' || !Number.isFinite(atSec) || atSec < lo - 1e-6 || atSec > hi + 1e-6) {
    throw new Error(hi < lo ? `scene "${id}" is too short to split (${f3(s.dur)} s)` : `cannot split scene "${id}" at ${typeof atSec === 'number' ? f3(atSec) : atSec} s: pick a time between ${f3(lo)} and ${f3(hi)} s (at least one frame from either edge)`);
  }
  const tempo = p.tempo;
  const first = formatLength(atSec - s.t0, tempo), len = parseLength(first, tempo);
  if (!(len > 0 && len < s.dur)) throw new Error(`cannot split scene "${id}" at ${f3(atSec)} s: too close to an edge`);
  const second = formatLength(s.dur - len, tempo);
  const nextIn = lengthSetting(s.in + len, tempo);
  // the copy keeps the settings in their order, with its own length and in-point and without a transition
  let meta = {};
  for (const [k, v] of Object.entries(s.meta)) if (k !== 'transition' && k !== 'in') meta[k] = k === 'length' ? second : v;
  if (!('length' in meta)) meta = { length: second, ...meta };
  meta = placeKey(meta, 'in', nextIn);
  const out = setSceneMeta(src, id, { length: first });
  return insertScene(out, id, { id: newId, title: s.title, meta, html: s.html, css: s.css, js: s.js });
}

export function setHits(src, id, hits) {
  const clean = [...new Set(hits.map(h => round(h, 4)))].sort((a, b) => a - b);
  return setSceneMeta(src, id, { hits: clean });
}
