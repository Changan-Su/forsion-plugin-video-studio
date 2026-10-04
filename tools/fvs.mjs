#!/usr/bin/env node
/* Forsion Video Studio 0.8.2 — built from src/ by build.mjs; edit the sources, not this file. */

// src/cli/fvs.js
import { readFileSync as readFileSync2, writeFileSync as writeFileSync2, mkdirSync as mkdirSync2, existsSync as existsSync2, rmSync as rmSync2, mkdtempSync as mkdtempSync2, readdirSync, statSync as statSync2 } from "node:fs";
import { dirname as dirname2, join as join2, resolve as resolve2, relative, basename, extname, sep, posix } from "node:path";
import { pathToFileURL } from "node:url";
import { tmpdir as tmpdir2, homedir, platform } from "node:os";
import { spawnSync as spawnSync2, spawn as spawn2 } from "node:child_process";
import { createRequire } from "node:module";

// src/lib/project.js
var FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})(.*)$/;
var HEADING = /^ {0,3}(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/;
var SCENE_HEAD = /^([A-Za-z][\w-]*)(?:\s*(?:·|—|–|-|:|：|\|)\s*(.*))?$/;
var DEFAULTS = { width: 1920, height: 1080, fps: 30 };
var TRANSITIONS = ["fade", "dip", "slide-left", "slide-up", "push-left", "wipe-left", "zoom", "blur"];
function tokenize(src) {
  const eol = /\r\n/.test(src) ? "\r\n" : "\n";
  const text = src.replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const endsWithNl = text.endsWith("\n");
  if (endsWithNl) lines.pop();
  const toks = [];
  let buf = [], bufLine = 1;
  const flush = () => {
    if (buf.length) {
      toks.push({ kind: "text", raw: buf.join(""), line: bufLine });
      buf = [];
    }
  };
  for (let i = 0; i < lines.length; i++) {
    const nl = i < lines.length - 1 || endsWithNl ? "\n" : "";
    const line = lines[i];
    const f = line.match(FENCE_OPEN);
    if (f && !(f[2][0] === "`" && f[3].includes("`"))) {
      flush();
      const fence = f[2], info = f[3].trim();
      const close = new RegExp(`^ {0,3}${fence[0] === "`" ? "`" : "~"}{${fence.length},}[ \\t]*$`);
      const body = [];
      let j = i + 1, closed = false;
      for (; j < lines.length; j++) {
        if (close.test(lines[j])) {
          closed = true;
          break;
        }
        body.push(lines[j]);
      }
      const last = closed ? j : lines.length - 1;
      const rawLines = lines.slice(i, last + 1);
      const rawNl = last < lines.length - 1 || endsWithNl ? "\n" : "";
      const [lang = "", ...tags] = info.split(/\s+/).filter(Boolean);
      toks.push({ kind: "fence", raw: rawLines.join("\n") + rawNl, line: i + 1, fence, info, lang: lang.toLowerCase(), tags: tags.map((t) => t.toLowerCase()), body: body.join("\n"), closed, indent: f[1] });
      i = last;
      continue;
    }
    const h = line.match(HEADING);
    if (h) {
      flush();
      toks.push({ kind: "heading", raw: line + nl, line: i + 1, level: h[1].length, text: h[2] });
      continue;
    }
    if (!buf.length) bufLine = i + 1;
    buf.push(line + nl);
  }
  flush();
  return { toks, eol };
}
var UNIT = /^\s*(-?\d+(?:\.\d+)?)\s*(bars?|beats?|b|s|sec|secs|seconds?|ms|小节|拍|秒)?\s*$/i;
function tempoOf(meta) {
  const t = meta && meta.tempo;
  if (!t || !(+t.bpm > 0)) return null;
  const beatsPerBar = +t.beatsPerBar > 0 ? +t.beatsPerBar : 4;
  const beat = 60 / +t.bpm;
  return { bpm: +t.bpm, beatsPerBar, beat, bar: beat * beatsPerBar };
}
function parseLength(v, tempo) {
  if (typeof v === "number" && isFinite(v)) return v;
  const m = typeof v === "string" && v.match(UNIT);
  if (!m) throw new Error(`cannot read length ${JSON.stringify(v)} (use "4 bars", "6 beats" or "2.5s")`);
  const x = +m[1], u = (m[2] || "s").toLowerCase();
  if (/^(bars?|小节)$/.test(u)) {
    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);
    return x * tempo.bar;
  }
  if (/^(beats?|b|拍)$/.test(u)) {
    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);
    return x * tempo.beat;
  }
  if (u === "ms") return x / 1e3;
  return x;
}
var round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;
var hitUnit = (tempo) => tempo ? tempo.beat : 1;
function readJSON(tok, where, errors) {
  if (!tok.body.trim()) return {};
  try {
    const v = JSON.parse(tok.body);
    if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("settings must be a JSON object");
    return v;
  } catch (e) {
    errors.push({ level: "error", line: tok.line, scene: where, message: `invalid JSON in settings: ${e.message}` });
    return null;
  }
}
var isFvs = (t) => t.kind === "fence" && (t.lang === "fvs" || t.lang === "json" && t.tags.includes("fvs"));
var isLang = (t, ...langs) => t.kind === "fence" && langs.includes(t.lang) && !isFvs(t);
var LANG = { html: ["html", "htm"], js: ["js", "javascript", "mjs"], css: ["css"], captions: ["srt", "vtt"] };
var CUE_TIME = /^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/;
var cueTime = (s) => {
  const m = String(s).trim().match(CUE_TIME);
  return m ? +(m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + (m[4] ? +m[4].padEnd(3, "0") / 1e3 : 0) : NaN;
};
function parseSrt(text) {
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
  const cues = [], errors = [];
  for (let i = 0; i < lines.length; ) {
    if (!lines[i].trim()) {
      i++;
      continue;
    }
    const from = i;
    while (i < lines.length && lines[i].trim()) i++;
    const block = lines.slice(from, i);
    if (/^(WEBVTT|NOTE|STYLE|REGION)\b/.test(block[0])) continue;
    const k = block.findIndex((l) => l.includes("-->"));
    if (k < 0) {
      errors.push({ line: from + 1, message: 'caption without a time line ("00:00:01,000 --> 00:00:03,000")' });
      continue;
    }
    const [a, rest] = block[k].split("-->"), start = cueTime(a), end = cueTime(rest.trim().split(/\s+/)[0]);
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      errors.push({ line: from + k + 1, message: `cannot read caption times "${block[k].trim()}" (use 00:00:01,000 --> 00:00:03,000)` });
      continue;
    }
    if (!(end > start)) {
      errors.push({ line: from + k + 1, message: `caption ends before it starts (${block[k].trim()})` });
      continue;
    }
    cues.push({ start, end, text: block.slice(k + 1).join("\n").trim(), line: from + k + 1 });
  }
  return { cues, errors };
}
var srtTime = (sec) => {
  const ms = Math.max(0, Math.round(sec * 1e3)), p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 36e5))}:${p(Math.floor(ms / 6e4) % 60)}:${p(Math.floor(ms / 1e3) % 60)},${p(ms % 1e3, 3)}`;
};
function formatSrt(cues) {
  return [...cues].sort((a, b) => a.start - b.start).map((c, i) => `${i + 1}
${srtTime(c.start)} --> ${srtTime(c.end)}
${String(c.text ?? "").replace(/\r\n?/g, "\n").replace(/\n\s*\n/g, "\n").trim()}`).join("\n\n");
}
function parseProject(src) {
  const { toks, eol } = tokenize(String(src ?? ""));
  const errors = [];
  const p = { eol, toks, meta: { ...DEFAULTS }, metaTok: -1, rawMeta: null, css: [], stageHtml: -1, stageJs: -1, captionsTok: -1, captionsIgnored: 0, captions: [], scenes: [], errors };
  let i = 0;
  for (; i < toks.length; i++) {
    const t = toks[i];
    if (t.kind === "heading" && t.level === 2) break;
    if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, message: "code block is never closed" });
    if (isFvs(t)) {
      if (p.metaTok >= 0) {
        errors.push({ level: "warning", line: t.line, message: "second project settings block ignored" });
        continue;
      }
      p.metaTok = i;
      const m = readJSON(t, null, errors);
      if (m) {
        p.rawMeta = m;
        p.meta = { ...DEFAULTS, ...m };
      }
    } else if (isLang(t, ...LANG.css)) p.css.push(i);
    else if (isLang(t, ...LANG.captions)) {
      if (p.captionsTok < 0) p.captionsTok = i;
      else {
        p.captionsIgnored++;
        errors.push({ level: "warning", line: t.line, captions: true, message: "second captions block ignored (one ```srt track per project)" });
      }
    } else if (isLang(t, ...LANG.html) && (t.tags.includes("stage") || p.stageHtml < 0)) {
      if (p.stageHtml < 0) p.stageHtml = i;
    } else if (isLang(t, ...LANG.js) && (t.tags.includes("stage") || p.stageJs < 0)) {
      if (p.stageJs < 0) p.stageJs = i;
    }
  }
  if (p.metaTok < 0) errors.push({ level: "warning", line: 1, message: "no ```fvs project settings block; using 1920\xD71080 at 30 fps" });
  while (i < toks.length) {
    const head = toks[i];
    const s = { head: i, first: i, last: i, metaTok: -1, htmlTok: -1, jsTok: -1, cssTok: -1, meta: {}, title: "", id: "" };
    const hm = head.text.match(SCENE_HEAD);
    if (hm) {
      s.id = hm[1];
      s.title = (hm[2] || "").trim();
    } else {
      s.id = "";
      s.title = head.text;
      errors.push({ level: "error", line: head.line, message: `scene heading "${head.text}" must start with an id (letters, digits, - or _), e.g. "## intro \xB7 \u5F00\u573A"` });
    }
    for (i++; i < toks.length; i++) {
      const t = toks[i];
      if (t.kind === "heading" && t.level <= 2) break;
      s.last = i;
      if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, scene: s.id, message: "code block is never closed" });
      if (isFvs(t)) {
        if (s.metaTok < 0) {
          s.metaTok = i;
          s.meta = readJSON(t, s.id, errors) || {};
        }
      } else if (isLang(t, ...LANG.captions)) errors.push({ level: "warning", line: t.line, scene: s.id, captions: true, message: "a captions block inside a scene is ignored; move it before the first scene" });
      else for (const k of ["html", "js", "css"]) if (isLang(t, ...LANG[k])) {
        if (s[`${k}Tok`] < 0) s[`${k}Tok`] = i;
        else errors.push({ level: "warning", line: t.line, scene: s.id, message: `second \`${k}\` block in scene "${s.id}" is ignored` });
      }
    }
    if (head.level === 1) continue;
    p.scenes.push(s);
  }
  computeTimeline(p);
  return p;
}
function inPoint(meta, tempo) {
  if (meta.in === void 0 || meta.in === null) return 0;
  const v = parseLength(meta.in, tempo);
  if (!(v >= 0)) throw new Error(`"in" must not be negative, got ${JSON.stringify(meta.in)}`);
  return v;
}
function readTransition(v, tempo) {
  const type = typeof v === "string" ? v : v && typeof v === "object" && !Array.isArray(v) ? v.type : void 0;
  if (typeof type !== "string") throw new Error('"transition" must be a type such as "fade", or { "type": "fade", "dur": "1 beat" }');
  if (!TRANSITIONS.includes(type)) throw new Error(`unknown transition "${type}" (use ${TRANSITIONS.join(", ")})`);
  const raw = typeof v === "object" ? v.dur : void 0;
  const dur = raw === void 0 || raw === null ? tempo ? tempo.beat : 0.5 : parseLength(raw, tempo);
  if (!(dur > 0)) throw new Error(`transition "dur" must be positive, got ${JSON.stringify(raw)}`);
  return { type, dur };
}
function computeTimeline(p) {
  const tempo = tempoOf(p.meta);
  p.tempo = tempo;
  const seen = /* @__PURE__ */ new Set();
  const body = (s, k) => s[`${k}Tok`] >= 0 ? p.toks[s[`${k}Tok`]].body : "";
  let t = 0;
  for (const [k, s] of p.scenes.entries()) {
    s.index = k;
    s.html = body(s, "html");
    s.js = body(s, "js");
    s.css = body(s, "css");
    s.line = p.toks[s.head].line;
    const metaLine2 = s.metaTok >= 0 ? p.toks[s.metaTok].line : s.line;
    if (s.id && seen.has(s.id)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: `duplicate scene id "${s.id}"` });
    seen.add(s.id);
    let len = 0;
    try {
      if (s.meta.length === void 0) throw new Error('scene has no "length" (e.g. "length": "2 bars")');
      len = parseLength(s.meta.length, tempo);
      if (!(len > 0)) throw new Error(`length must be positive, got ${JSON.stringify(s.meta.length)}`);
    } catch (e) {
      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });
      len = len > 0 ? len : tempo ? tempo.bar : 2;
    }
    s.t0 = t;
    s.dur = len;
    s.t1 = t + len;
    t = s.t1;
    s.in = 0;
    try {
      s.in = inPoint(s.meta, tempo);
    } catch (e) {
      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message.startsWith('"in"') ? e.message : `"in": ${e.message}` });
    }
    s.t0v = s.t0 - s.in;
    s.transition = null;
    if (s.meta.transition !== void 0 && s.meta.transition !== null) {
      try {
        const tr = readTransition(s.meta.transition, tempo);
        if (k === 0) p.errors.push({ level: "warning", line: metaLine2, scene: s.id, message: 'the first scene has nothing to transition from; its "transition" is ignored' });
        else s.transition = { type: tr.type, dur: Math.min(tr.dur, len) };
      } catch (e) {
        p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });
      }
    }
    const u = hitUnit(tempo);
    const hits = Array.isArray(s.meta.hits) ? s.meta.hits : [];
    if (s.meta.hits !== void 0 && !Array.isArray(s.meta.hits)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: '"hits" must be an array of numbers' });
    s.hits = hits.filter((h) => typeof h === "number" && isFinite(h));
    if (s.hits.length !== hits.length) p.errors.push({ level: "error", line: s.line, scene: s.id, message: '"hits" must contain numbers only' });
    for (let j = 1; j < s.hits.length; j++) if (s.hits[j] < s.hits[j - 1]) {
      p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "hits are not in ascending order" });
      break;
    }
    const end = s.in + len, next = p.scenes[k + 1];
    let continued = false;
    if (next) {
      try {
        continued = inPoint(next.meta, tempo) > 0 && body(next, "html") === s.html && body(next, "css") === s.css && body(next, "js") === s.js;
      } catch {
        continued = false;
      }
    }
    s.continued = continued;
    if (s.hits.some((h) => h < 0 || h * u > end + 1e-6 && !continued)) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: `a hit falls outside the scene (0\u2013${round(end / u, 3)} ${tempo ? "beats" : "s"})` });
    s.hitTimes = s.hits.map((h) => t0Round(s.t0v + h * u));
    if (!s.html.trim() && !s.js.trim()) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "scene has no html or js block" });
  }
  p.length = t;
  const m = p.meta;
  const metaLine = p.metaTok >= 0 ? p.toks[p.metaTok].line : 1;
  for (const k of ["width", "height", "fps"]) if (!(+m[k] > 0)) p.errors.push({ level: "error", line: metaLine, message: `"${k}" must be a positive number` });
  checkAudio(p, metaLine);
  readCaptions(p, metaLine);
  if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, message: 'the project has no scenes yet (add a "## id \xB7 Title" section)' });
}
function checkAudio(p, line) {
  const raw = p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio];
  raw.forEach((a, i) => {
    if (!a || typeof a !== "object") return;
    const name = `audio track ${i + 1}${a.src ? ` (${a.src})` : ""}`;
    for (const [k, min] of [["in", 0], ["dur", 1e-9]]) {
      if (a[k] === void 0 || a[k] === null) continue;
      try {
        const v = parseLength(a[k], p.tempo);
        if (!(v >= min)) throw new Error(k === "in" ? "must not be negative" : "must be positive");
      } catch (e) {
        p.errors.push({ level: "error", line, message: `${name} "${k}": ${e.message}` });
      }
    }
  });
}
var CAPTION_POSITIONS = ["bottom", "top"];
var CAPTION_SIZES = ["small", "medium", "large"];
function captionStyle(meta) {
  const c = meta && meta.captions && typeof meta.captions === "object" ? meta.captions : {};
  return { position: CAPTION_POSITIONS.includes(c.position) ? c.position : "bottom", size: CAPTION_SIZES.includes(c.size) ? c.size : "medium" };
}
function readCaptions(p, metaLine) {
  const c = p.meta.captions;
  if (c !== void 0 && c !== null && (typeof c !== "object" || Array.isArray(c) || c.position !== void 0 && !CAPTION_POSITIONS.includes(c.position) || c.size !== void 0 && !CAPTION_SIZES.includes(c.size))) {
    p.errors.push({ level: "warning", line: metaLine, captions: true, message: `"captions" settings: use { "position": "${CAPTION_POSITIONS.join('" | "')}", "size": "${CAPTION_SIZES.join('" | "')}" }` });
  }
  if (p.captionsTok < 0) return;
  const tok = p.toks[p.captionsTok], base = tok.line;
  const { cues, errors } = parseSrt(tok.body);
  for (const e of errors) p.errors.push({ level: "error", line: base + e.line, captions: true, message: e.message });
  p.captions = cues.map((x) => ({ ...x, line: base + x.line }));
  const late = p.scenes.length ? p.captions.find((x) => x.start >= p.length - 1e-6) : null;
  if (late) p.errors.push({ level: "warning", line: late.line, captions: true, message: `a caption starts at ${round(late.start, 3)} s, after the end of the video (${round(p.length, 3)} s)` });
}
var t0Round = (x) => Math.round(x * 1e9) / 1e9;
var cssBlocks = (p) => p.css.map((k) => p.toks[k].body);
var stageHtml = (p) => p.stageHtml >= 0 ? p.toks[p.stageHtml].body : "";
var stageJs = (p) => p.stageJs >= 0 ? p.toks[p.stageJs].body : "";
var sceneById = (p, id) => p.scenes.find((s) => s.id === id) || null;
var visibleHits = (s) => (s.hitTimes || []).map((t, index) => ({ index, t })).filter((h) => h.t >= s.t0 - 1e-6 && (s.continued ? h.t < s.t1 - 1e-6 : h.t <= s.t1 + 1e-6));
function cueSheet(p) {
  const tempo = p.tempo;
  return {
    title: p.meta.title || "",
    bpm: tempo ? tempo.bpm : null,
    beatsPerBar: tempo ? tempo.beatsPerBar : null,
    length: round(p.length, 6),
    fps: +p.meta.fps,
    scenes: p.scenes.map((s) => {
      const vis = visibleHits(s);
      return {
        id: s.id,
        title: s.title,
        t0: round(s.t0, 6),
        t1: round(s.t1, 6),
        ...tempo ? { bar: round(s.t0 / tempo.bar, 6), bars: round(s.dur / tempo.bar, 6), beat: round(s.t0 / tempo.beat, 6) } : {},
        ...s.in ? { in: round(s.in, 6) } : {},
        ...s.transition ? { transition: { type: s.transition.type, dur: round(s.transition.dur, 6) } } : {},
        hits: vis.map((h) => s.hits[h.index]),
        hitTimes: vis.map((h) => round(h.t, 6))
      };
    }),
    audio: (p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio]).map((a) => typeof a === "string" ? { src: a } : a)
  };
}

// src/lib/html.js
var RAW = /^(script|style|textarea|title)$/i;
var VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
var ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\xA0", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", middot: "\xB7", copy: "\xA9", reg: "\xAE", trade: "\u2122", laquo: "\xAB", raquo: "\xBB", ldquo: "\u201C", rdquo: "\u201D", lsquo: "\u2018", rsquo: "\u2019", times: "\xD7", larr: "\u2190", rarr: "\u2192", uarr: "\u2191", darr: "\u2193", bull: "\u2022" };
var decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, k) => {
  if (k[0] === "#") {
    const c = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : +k.slice(1);
    try {
      return String.fromCodePoint(c);
    } catch {
      return m;
    }
  }
  return ENT[k.toLowerCase()] ?? m;
});
function tagEnd(html, i) {
  let q = null;
  for (let k = i + 1; k < html.length; k++) {
    const c = html[k];
    if (q) {
      if (c === q) q = null;
    } else if (c === '"' || c === "'") q = c;
    else if (c === ">") return k + 1;
  }
  return html.length;
}
var ATTR = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
function scan(html) {
  const texts = [], tags = [];
  const stack = [];
  let i = 0, textStart = 0;
  const n = html.length;
  const pushText = (a, b) => {
    if (b <= a) return;
    const raw = html.slice(a, b), text = decode(raw);
    if (/\S/.test(text)) texts.push({ index: texts.length, start: a, end: b, raw, text, tag: stack.length ? stack[stack.length - 1] : -1 });
  };
  while (i < n) {
    if (html[i] !== "<") {
      i++;
      continue;
    }
    if (html.startsWith("<!--", i)) {
      pushText(textStart, i);
      const e = html.indexOf("-->", i + 4);
      i = e < 0 ? n : e + 3;
      textStart = i;
      continue;
    }
    const m = /^<(\/?)([A-Za-z][\w:-]*)/.exec(html.slice(i, i + 80));
    if (!m) {
      if (html[i + 1] === "!" || html[i + 1] === "?") {
        pushText(textStart, i);
        i = tagEnd(html, i);
        textStart = i;
      } else i++;
      continue;
    }
    pushText(textStart, i);
    const end = tagEnd(html, i), name = m[2].toLowerCase();
    if (m[1]) {
      for (let k = stack.length - 1; k >= 0; k--) if (tags[stack[k]].name === name) {
        stack.length = k;
        break;
      }
      i = end;
      textStart = i;
      continue;
    }
    const body = html.slice(i + 1 + m[2].length, end - 1);
    const attrs = [];
    const selfClose = /\/\s*$/.test(body);
    ATTR.lastIndex = 0;
    let a;
    while (a = ATTR.exec(body)) {
      if (a[1] === "/") continue;
      const off = i + 1 + m[2].length + a.index;
      const v = a[2] ?? a[3] ?? a[4];
      attrs.push({ name: a[1].toLowerCase(), value: v === void 0 ? "" : decode(v), start: off, end: off + a[0].length });
    }
    const tag = { index: tags.length, name, start: i, end, attrs, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };
    tags.push(tag);
    i = end;
    textStart = i;
    if (RAW.test(name) && !selfClose) {
      const close = html.toLowerCase().indexOf(`</${name}`, i);
      i = close < 0 ? n : close;
      textStart = i;
      continue;
    }
    if (!VOID.test(name) && !selfClose) stack.push(tag.index);
  }
  pushText(textStart, n);
  return { texts, tags };
}
var num = (v, d) => {
  const x = parseFloat(v);
  return Number.isFinite(x) ? x : d;
};
function videos(html) {
  const { tags } = scan(html);
  const lower = html.toLowerCase();
  return tags.filter((t) => t.name === "video").map((t) => {
    const selfClosed = html[t.end - 2] === "/";
    const close = selfClosed ? -1 : lower.indexOf("</video", t.end);
    const end = close < 0 ? t.end : close;
    const source = tags.find((x) => x.name === "source" && x.start >= t.end && x.start < end && x.attr("src"));
    const has = (k) => t.attrs.some((a) => a.name === k);
    return {
      tag: t.index,
      src: t.attr("src") || (source ? source.attr("src") : "") || "",
      clipIn: Math.max(0, num(t.attr("data-clip-in"), 0)),
      gain: num(t.attr("data-gain"), 0),
      muted: has("muted"),
      loop: has("loop")
    };
  });
}

// src/lib/compile.js
var ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i;
var isRelativeUrl = (u) => !!u && !ABSOLUTE.test(u.trim()) && !/^\$\{/.test(u) && !/^%%/.test(u);
var ATTR2 = /(\s(?:src|href|poster|xlink:href)\s*=\s*)(["'])([^"']*)\2/gi;
var CSS_URL = /url\(\s*(["']?)([^"')]+)\1\s*\)/gi;
function assetRefs(html = "", css = "") {
  const out = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(ATTR2)) if (isRelativeUrl(m[3])) out.add(clean(m[3]));
  for (const m of (html + "\n" + css).matchAll(CSS_URL)) if (isRelativeUrl(m[2])) out.add(clean(m[2]));
  return [...out];
}
var clean = (u) => u.trim().replace(/^\.\//, "");
var rewriteHtml = (html, map) => html.replace(ATTR2, (m, pre, q, u) => isRelativeUrl(u) && map[clean(u)] ? `${pre}${q}${map[clean(u)]}${q}` : m);
var rewriteCss = (css, map) => css.replace(CSS_URL, (m, q, u) => isRelativeUrl(u) && map[clean(u)] ? `url(${q}${map[clean(u)]}${q})` : m);
var list = (v) => v == null ? [] : Array.isArray(v) ? v : [v];
function audioTracks(meta) {
  const tempo = tempoOf(meta);
  const seconds = (v) => {
    if (v === void 0 || v === null || v === "") return null;
    try {
      const x = parseLength(v, tempo);
      return Number.isFinite(x) ? x : null;
    } catch {
      return null;
    }
  };
  return list(meta.audio).map((a, i) => typeof a === "string" ? { src: a } : a).filter((a) => a && a.src).map((a, i) => {
    const from = seconds(a.in), dur = seconds(a.dur);
    return { id: a.id || `a${i}`, src: String(a.src), at: +a.at || 0, gain: +a.gain || 0, role: a.role || (i ? "track" : "score"), in: from > 0 ? from : 0, dur: dur > 0 ? dur : null, mute: !!a.mute };
  });
}
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
function compile(p, { resolve: resolve3 = (u) => u } = {}) {
  const css = cssBlocks(p).join("\n\n");
  const refs = /* @__PURE__ */ new Set([...assetRefs(stageHtml(p), css), ...list(p.meta.assets).map(clean)]);
  for (const s of p.scenes) for (const r of assetRefs(s.html, s.css)) refs.add(r);
  const audio = audioTracks(p.meta);
  const map = {};
  for (const r of refs) map[r] = resolve3(r);
  const url = (src) => isRelativeUrl(src) ? map[clean(src)] ?? resolve3(clean(src)) : src;
  const jsLine = (k) => k >= 0 ? p.toks[k].line + 1 : 0;
  return {
    v: 1,
    title: p.meta.title || "",
    lang: p.meta.lang || "zh-CN",
    width: +p.meta.width,
    height: +p.meta.height,
    fps: +p.meta.fps,
    length: p.length,
    tempo: p.tempo ? { bpm: p.tempo.bpm, beatsPerBar: p.tempo.beatsPerBar } : null,
    background: p.meta.background || "#000",
    className: p.meta.class || "",
    fonts: list(p.meta.fonts),
    css: rewriteCss(css, map),
    stage: { html: rewriteHtml(stageHtml(p), map), js: stageJs(p), line: jsLine(p.stageJs) },
    scenes: p.scenes.map((s) => ({
      id: s.id,
      title: s.title,
      t0: s.t0,
      t1: s.t1,
      t0v: s.t0v,
      in: s.in,
      transition: s.transition,
      hits: s.hitTimes,
      beats: s.hits,
      cls: s.meta.class || "",
      html: rewriteHtml(s.html, map),
      css: rewriteCss(s.css, map),
      js: s.js,
      line: jsLine(s.jsTok),
      htmlLine: jsLine(s.htmlTok)
    })),
    captions: (p.captions || []).map((c) => ({ t0: c.start, t1: c.end, text: c.text })),
    captionStyle: captionStyle(p.meta),
    audio: audio.map((a) => ({ ...a, url: resolve3(a.src) })),
    media: sceneMedia(p).map((m) => ({ ...m, url: url(m.src) })),
    assets: map
  };
}
var track = (a) => ({ id: a.id, kind: "track", src: a.src, url: a.url ?? a.src, at: +a.at || 0, in: +a.in || 0, dur: a.dur > 0 ? +a.dur : null, gain: +a.gain || 0, mute: !!a.mute, role: a.role });
var video = (m, assets = {}) => ({ id: m.id, kind: "video", scene: m.scene, src: m.src, url: m.url ?? assets[clean(m.src)] ?? m.src, at: +m.at || 0, in: +m.in || 0, dur: m.dur > 0 ? +m.dur : null, gain: +m.gain || 0, mute: false, loop: !!m.loop });
function audioSegments(x) {
  if (x && Array.isArray(x.toks)) return [...audioTracks(x.meta).map(track), ...sceneMedia(x).map((m) => video(m))];
  return payloadSegments(x);
}
var payloadSegments = (P) => P ? [...(P.audio || []).map(track), ...(P.media || []).map((m) => video(m, P.assets))] : [];
var esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
var scriptJSON = (v) => JSON.stringify(v).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
function buildHtml(payload, runtimeSource, { mode = "player", extraHead = "" } = {}) {
  const fonts = payload.fonts.map((u) => `<link rel="stylesheet" href="${esc(u)}">`).join("\n");
  const assets = payload.assets || {};
  if ((payload.media || []).some((m) => m.url && assets[clean(m.src)] === m.url)) {
    payload = { ...payload, media: payload.media.map((m) => m.url && assets[clean(m.src)] === m.url ? { ...m, url: null } : m) };
  }
  return `<!doctype html>
<html lang="${esc(payload.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(payload.title || "Forsion Video Studio")}</title>
<meta name="generator" content="Forsion Video Studio">
${fonts}
${extraHead}
</head>
<body>
<script type="application/json" id="fvs-data">${scriptJSON(payload)}</script>
<script>${runtimeSource.replace(/<\/script/gi, "<\\/script")}</script>
<script>FVS.boot(${JSON.stringify(mode)});</script>
</body>
</html>
`;
}

// src/lib/onsets.js
var ONSET_SR = 22050;
var N = 1024;
var HOP = 128;
var BLOCK = 110;
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
        const nr = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = nr;
      }
    }
  }
}
function downsample(x, sr) {
  if (sr === ONSET_SR) return x;
  const r = sr / ONSET_SR, out = new Float32Array(Math.floor(x.length / r));
  for (let i = 0; i < out.length; i++) {
    const a = Math.floor(i * r), b = Math.max(a + 1, Math.floor((i + 1) * r));
    let s = 0;
    for (let k = a; k < b; k++) s += x[k];
    out[i] = s / (b - a);
  }
  return out;
}
var MELS = 64;
var hz2mel = (f) => 2595 * Math.log10(1 + f / 700);
var mel2hz = (m) => 700 * (10 ** (m / 2595) - 1);
var bank = null;
function melBank() {
  if (bank) return bank;
  const bins = N / 2 + 1, top = hz2mel(ONSET_SR / 2), pts = [];
  for (let i = 0; i < MELS + 2; i++) pts.push(mel2hz(top * i / (MELS + 1)) / (ONSET_SR / 2) * (bins - 1));
  bank = [];
  for (let m = 0; m < MELS; m++) {
    const [l, c, r] = [pts[m], pts[m + 1], pts[m + 2]], w = [];
    for (let k = Math.floor(l); k <= Math.ceil(r) && k < bins; k++) {
      const v = k < c ? (k - l) / Math.max(1e-9, c - l) : (r - k) / Math.max(1e-9, r - c);
      if (v > 0) w.push([k, v]);
    }
    bank.push(w);
  }
  return bank;
}
function onsetEnvelope(mono, sr = ONSET_SR) {
  const x = downsample(mono, sr);
  const frames = Math.max(0, Math.floor((x.length - N) / HOP) + 1);
  const env = new Float32Array(frames), level = new Float32Array(frames);
  const rms = new Float32Array(Math.floor(x.length / BLOCK));
  for (let b = 0; b < rms.length; b++) {
    let e = 0;
    for (let i = b * BLOCK; i < (b + 1) * BLOCK; i++) e += x[i] * x[i];
    rms[b] = e / BLOCK;
  }
  const win = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));
  const B = melBank();
  const mel = new Float32Array(frames * MELS);
  const re = new Float32Array(N), im = new Float32Array(N);
  let top = -Infinity;
  for (let f = 0; f < frames; f++) {
    const o = f * HOP;
    let ss = 0;
    for (let i = 0; i < N; i++) {
      const v = x[o + i];
      re[i] = v * win[i];
      im[i] = 0;
      ss += v * v;
    }
    level[f] = 10 * Math.log10(ss / N + 1e-12);
    fft(re, im);
    for (let m = 0; m < MELS; m++) {
      let e = 0;
      for (const [k, w] of B[m]) e += w * (re[k] * re[k] + im[k] * im[k]);
      const db = 10 * Math.log10(Math.max(e, 1e-10));
      mel[f * MELS + m] = db;
      if (db > top) top = db;
    }
  }
  const floor = top - 80;
  for (let i = 0; i < mel.length; i++) if (mel[i] < floor) mel[i] = floor;
  for (let f = 1; f < frames; f++) {
    let s = 0;
    for (let m = 0; m < MELS; m++) {
      const d = mel[f * MELS + m] - mel[(f - 1) * MELS + m];
      if (d > 0) s += d;
    }
    env[f] = s / MELS;
  }
  const sorted = [...env].sort((a, b) => a - b);
  const p95 = sorted[Math.floor(sorted.length * 0.95)] || 1;
  for (let f = 0; f < frames; f++) env[f] /= p95;
  return { env, level, rms, block: BLOCK / ONSET_SR, hop: HOP / ONSET_SR, offset: N / 2 / ONSET_SR };
}
var pct = (arr, q) => {
  const s = [...arr].sort((a, b) => a - b);
  return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * q))] : 0;
};
var hitsOf = (s) => s.hitTimes && s.t0 !== void 0 && s.t1 !== void 0 ? visibleHits(s) : (s.hitTimes || s.hits || []).map((t, index) => ({ index, t }));
function syncReport(scenes, { env, rms, block, hop, offset }, { before = 0.065, after = 0.03, weak = 0.6 } = {}) {
  const at = (t) => Math.round((t - offset) / hop);
  const rows = [];
  for (const s of scenes) {
    hitsOf(s).forEach(({ index: i, t }) => {
      const a = Math.max(0, at(t - before)), b = Math.min(env.length - 1, at(t + after));
      let best = -1, bi = a;
      for (let k = a; k <= b; k++) if (env[k] > best) {
        best = env[k];
        bi = k;
      }
      const la = Math.max(0, at(t - 1)), lb = Math.min(env.length, at(t + 1));
      const local = pct(env.subarray(la, lb), 0.99) || 1;
      const strength = best < 0 ? 0 : best / local;
      const lvl = (p, q) => {
        const x = rms.subarray(Math.max(0, Math.ceil(p / block)), Math.max(0, Math.floor(q / block)));
        let s2 = 0;
        for (const v of x) s2 += v;
        return x.length ? 10 * Math.log10(s2 / x.length + 1e-12) : -120;
      };
      const drop = lvl(t, t + 0.07) - lvl(t - 0.08, t - 0.01) <= -6;
      const off = best < 0 ? null : bi * hop + offset - t;
      rows.push({ scene: s.id, hit: i, t, offset: off, strength: +strength.toFixed(2), quiet: drop, ok: drop || strength >= weak });
    });
  }
  return rows;
}

// src/lib/templates.js
var FONTS = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&display=swap";
var HEAD = (title, zh) => `# ${title}

${zh ? "\u8FD9\u662F\u4E00\u4E2A Forsion Video Studio \u5DE5\u7A0B\u6587\u4EF6\u3002\u573A\u666F\u6309\u987A\u5E8F\u9996\u5C3E\u76F8\u63A5\u5730\u64AD\u653E\uFF1B\u6BCF\u4E2A\u573A\u666F\u7684 `hits` \u662F\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u62CD\u70B9\uFF0C\u753B\u9762\u7684\u5207\u70B9\u548C\u914D\u4E50\u7684\u91CD\u97F3\u90FD\u4ECE\u8FD9\u91CC\u8BFB\u3002\u7528 Video Studio \u6253\u5F00\u53EF\u4EE5\u76F4\u63A5\u6539\u6587\u5B57\u3001\u62D6\u65F6\u95F4\u7EBF\uFF1B\u4E5F\u53EF\u4EE5\u8BA9 AI \u6309\u8FD9\u4EFD\u6587\u4EF6\u7684\u5199\u6CD5\u7EE7\u7EED\u5199\u3002" : "A Forsion Video Studio project. Scenes play back to back in document order; each scene's `hits` are beats from its start, and both the picture cuts and the score's accents read them. Open it in Video Studio to edit the text and the timeline, or ask the AI to keep writing it."}
`;
var EVA_CSS = `/* Title cards in the manner of an EVA intertitle: black, heavy serif, hard cuts on the beat. */
.fvs-eva { --ink: #f2f0ea; --red: #e3161b; --orange: #ff6a13; --green: #38ff8b; color: var(--ink); font-family: 'Noto Serif SC', 'Songti SC', serif; }
.fvs-eva .card { position: absolute; inset: 0; background: #000; }
.fvs-eva .card.inv { background: var(--ink); color: #000; }
.fvs-eva .k { position: absolute; font-weight: 900; line-height: 1; white-space: nowrap; transform: scaleX(.8); transform-origin: 0 0; }
.fvs-eva .k.mid { left: 0; right: 0; text-align: center; transform-origin: 50% 0; }
.fvs-eva .e { position: absolute; font: 700 44px/1.3 'Barlow Condensed', sans-serif; letter-spacing: .22em; white-space: nowrap; }
.fvs-eva .e.mid { left: 0; right: 0; text-align: center; }
.fvs-eva .red { color: var(--red); }
.fvs-eva .hud { position: absolute; inset: 0; background: #000; color: var(--orange); font-family: 'Barlow Condensed', sans-serif; }
.fvs-eva .top { position: absolute; left: 90px; right: 90px; top: 60px; height: 70px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--orange); font: 700 38px 'Barlow Condensed', sans-serif; letter-spacing: .16em; }
.fvs-eva .term { position: absolute; left: 90px; top: 220px; display: grid; gap: 14px; }
.fvs-eva .term p { margin: 0; font: 500 44px/1.4 'JetBrains Mono', monospace; color: var(--green); white-space: pre; }
.fvs-eva .grain { position: absolute; inset: 0; pointer-events: none; background-size: 200px 200px; opacity: .06; mix-blend-mode: screen; }`;
function evaTemplate({ title = "\u65B0\u89C6\u9891", zh = true } = {}) {
  return `${HEAD(title, zh)}
\`\`\`fvs
{
  "fvs": 1,
  "title": ${JSON.stringify(title)},
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "class": "fvs-eva",
  "fonts": [${JSON.stringify(FONTS)}],
  "audio": []
}
\`\`\`

\`\`\`css
${EVA_CSS}
\`\`\`

\`\`\`html stage
<div data-fvs-scenes></div>
<div class="grain"></div>
<div data-fvs-flash></div>
\`\`\`

\`\`\`js stage
grain('.grain')
\`\`\`

## boot \xB7 \u542F\u52A8

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 1, 2, 3, 4, 6] }
\`\`\`

\`\`\`html
<div class="hud">
  <div class="top"><span>FORSION VIDEO STUDIO</span><span class="red">\u25CF REC</span></div>
  <div class="term">
    <p data-in="h1" data-fx="type">SCENES ........ OK</p>
    <p data-in="h2" data-fx="type">TIMELINE ...... OK</p>
    <p data-in="h3" data-fx="type">SCORE ......... OK</p>
    <p data-in="h4" data-fx="type" class="red">HUMAN ......... ??</p>
  </div>
</div>
\`\`\`

## cards \xB7 \u6807\u9898\u5361

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 2, 4, 6] }
\`\`\`

\`\`\`html
<div data-seq="h0">
  <div class="card"><span class="k" style="left:150px;top:260px;font-size:380px">\u7B2C\u4E00\u8BDD</span><span class="e" style="left:160px;top:760px">EPISODE ONE</span></div>
  <div class="card"><span class="k" style="left:1500px;top:90px;font-size:300px;writing-mode:vertical-rl;transform:scaleY(.86)">\u5F00\u59CB</span><span class="e" style="left:150px;top:920px">BEGIN</span></div>
  <div class="card inv"><span class="k mid" style="top:330px;font-size:360px">\u6539\u6587\u5B57</span></div>
  <div class="card"><span class="e mid" style="top:380px;font-size:64px">EDIT THE TEXT, DRAG THE TIMELINE.</span><span class="k mid red" style="top:520px;font-size:120px">\u7136\u540E\u5BFC\u51FA\u3002</span></div>
</div>
\`\`\`

\`\`\`js
// a flash on the first cut; everything else in this scene is declarative (data-seq)
flash(hits[0], .6)
\`\`\`

## title \xB7 \u7247\u540D

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 4] }
\`\`\`

\`\`\`html
<div class="card">
  <span class="e" style="left:160px;top:150px;font-size:60px" data-in="h0">EPISODE 01</span>
  <span class="k" style="left:140px;top:280px;font-size:420px" data-in="h1">${title}</span>
</div>
\`\`\`

\`\`\`js
flash(hits[1], .85)
\`\`\`
`;
}
function blankTemplate({ title = "\u65B0\u89C6\u9891", zh = true } = {}) {
  return `${HEAD(title, zh)}
\`\`\`fvs
{
  "fvs": 1,
  "title": ${JSON.stringify(title)},
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "background": "#101010",
  "audio": []
}
\`\`\`

\`\`\`css
.fvs-stage { color: #f5f3ef; font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
.fvs-stage h1 { position: absolute; left: 160px; top: 380px; margin: 0; font-size: 150px; font-weight: 700; }
.fvs-stage p { position: absolute; left: 164px; top: 600px; margin: 0; font-size: 48px; color: #a39d96; }
\`\`\`

## intro \xB7 \u5F00\u573A

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 2] }
\`\`\`

\`\`\`html
<h1 data-in="h0" data-fx="up">${title}</h1>
<p data-in="h1" data-fx="fade">${zh ? "\u7B2C\u4E00\u53E5\u526F\u6807\u9898" : "A subtitle"}</p>
\`\`\`
`;
}
var TEMPLATES = { eva: evaTemplate, blank: blankTemplate };

// src/generated/runtime-src.js
var runtime_src_default = '/* Forsion Video Studio 0.8.2 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\nvar FVS=(()=>{var nt=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ht=Object.prototype.hasOwnProperty;var gt=(t,e)=>{for(var i in e)nt(t,i,{get:e[i],enumerable:!0})},bt=(t,e,i,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of mt(e))!ht.call(t,o)&&o!==i&&nt(t,o,{get:()=>e[o],enumerable:!(p=pt(e,o))||p.enumerable});return t};var yt=t=>bt(nt({},"__esModule",{value:!0}),t);var Ht={};gt(Ht,{EASE:()=>V,boot:()=>It,createStage:()=>et,mount:()=>tt,prog:()=>Z,rng:()=>Q,timeExpr:()=>ot});var V={lin:t=>t,in:t=>t*t*t,out:t=>1-(1-t)**3,io:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,expo:t=>t>=1?1:1-2**(-10*t),back:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,step:t=>t<1?0:1},G=(t,e=0,i=1)=>Math.min(i,Math.max(e,t)),rt=(t,e,i)=>t+(e-t)*i,Z=(t,e,i,p="io")=>(V[p]||V.io)(G((t-e)/(i-e))),Q=t=>()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=["x","y","z","s","sx","sy","r","rx","ry"];function wt(t,e){if(e<=t[0].t)return t[0].v;for(let i=1;i<t.length;i++){let p=t[i];if(e<p.t){let o=t[i-1],h=(V[p.e]||V.io)((e-o.t)/(p.t-o.t)),l={};for(let w in p.v){let $=w in o.v?o.v[w]:p.v[w],y=p.v[w];l[w]=typeof y=="number"&&typeof $=="number"?$+(y-$)*h:h<1?$:y}return l}}return t[t.length-1].v}function $t(t,e,i){let p=t.style;if(i){let o=`translate3d(${e.x||0}px,${e.y||0}px,${e.z||0}px)`;e.rx&&(o+=` rotateX(${e.rx}deg)`),e.ry&&(o+=` rotateY(${e.ry}deg)`),e.r&&(o+=` rotate(${e.r}deg)`),(e.s??1)!==1&&(o+=` scale(${e.s})`),((e.sx??1)!==1||(e.sy??1)!==1)&&(o+=` scale(${e.sx??1},${e.sy??1})`),p.transform=o}"o"in e&&(p.opacity=e.o,p.visibility=e.o<.002?"hidden":""),("b"in e||"br"in e)&&(p.filter=`blur(${e.b||0}px) brightness(${e.br??1})`),("ct"in e||"cr"in e||"cb"in e||"cl"in e)&&(p.clipPath=`inset(${e.ct||0}% ${e.cr||0}% ${e.cb||0}% ${e.cl||0}%)`);for(let o in e)o[0]==="-"&&p.setProperty(o,e[o])}function et(t){let e=[],i=[],p=o=>typeof o=="string"?[...t.querySelectorAll(o)]:o==null?[]:o instanceof Element?[o]:[...o];return{root:t,q:p,tracks:e,hooks:i,K(o,h,l={}){let w={},$=h.map(([M,k={},L="io"])=>(w={...w,...k},{t:M,v:w,e:L}));if(!$.length)return;let y=$.some(M=>Object.keys(M.v).some(k=>xt.includes(k)));p(o).forEach((M,k)=>e.push({el:M,kf:$,hasTf:y,off:(l.stagger||0)*k}))},S(o,h,l){let w=p(o);i.push($=>{for(let y of w)y.style.display=$>=h&&$<l?"":"none"})},H(o){i.push(o)},type(o,h,l=30,w=0){p(o).forEach(($,y)=>{let M=[...$.textContent],k=h+w*y;i.push(L=>{let S=G(Math.floor((L-k)*l),0,M.length),q=M.slice(0,S).join("");$.textContent!==q&&($.textContent=q)})})},render(o){for(let h of i)h(o);for(let h of e)$t(h.el,wt(h.kf,o-h.off),h.hasTf)}}}var K=null;function kt(){if(K)return K;let t=Q(7);K=[];for(let e=0;e<4;e++){let i=document.createElement("canvas");i.width=i.height=200;let p=i.getContext("2d"),o=p.createImageData(200,200);for(let h=0;h<o.data.length;h+=4){let l=t()*255;o.data[h]=o.data[h+1]=o.data[h+2]=l,o.data[h+3]=255}p.putImageData(o,0,0),K.push(`url(${i.toDataURL()})`)}return K}function it(t,e=".grain"){let i=t.q(e),p=kt();t.H(o=>{let h=p[Math.floor(o*24)%4];for(let l of i)l.style.backgroundImage=h})}var vt=["","aborted","network error","decode error","format not supported or file missing"];function at(t,{mode:e="live",assets:i={},errors:p=[],onError:o=null}={}){let h={};for(let[s,c]of Object.entries(i||{}))typeof c=="string"&&!(c in h)&&(h[c]=s);let l=[],w=[],$=s=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(s||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let m=atob(s.slice(c[0].length).replace(/\\s+/g,"")),g=new Uint8Array(m.length);for(let I=0;I<m.length;I++)g[I]=m.charCodeAt(I);let b=URL.createObjectURL(new Blob([g],{type:c[1]||"video/mp4"}));return w.push(b),b}catch{return null}};for(let s of t)for(let c of s.el.querySelectorAll("video")){let m=c.querySelector("source[src]"),g=c.getAttribute("src")||(m?m.getAttribute("src"):"")||"";for(let I of[c,...c.querySelectorAll("source[src]")]){let n=$(I.getAttribute("src"));n&&I.setAttribute("src",n)}let b={el:c,scene:s.id,src:h[g]||g,from:s.from,to:s.to,base:s.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=b.loop,c.addEventListener("error",()=>{b.failed=!0,S(b,y(b))},!0),c.addEventListener("loadedmetadata",()=>{M(b)||S(b,k(b))}),c.addEventListener("seeked",()=>{let I=b.want;b.want=null,I!==null&&Math.abs(c.currentTime-I)>.05&&S(b,k(b))});try{c.pause(),c.load()}catch{}l.push(b)}if(!l.length)return null;function y(s){let c=s.el.error,m=c?c.code:0,g=c?` (${vt[m]||`error ${m}`}${c.message?`: ${c.message}`:""})`:"",b=m===3||m===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${s.src}" cannot be played${g}${b}`}function M(s){let c=s.el,m=c.duration,g=c.seekable;return!(Number.isFinite(m)&&m>.5&&(!g||!g.length||g.end(g.length-1)<.01))}let k=s=>`video "${s.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function L(s,c){s.want=c,s.el.currentTime=c}function S(s,c){if(!s.reported&&(s.reported=!0,p.push({scene:s.scene,message:c,line:0}),o))try{o(s.scene,s.src)}catch{}}function q(s,c){let m=s.el.duration,g=m>0&&Number.isFinite(m),b=s.clipIn+(c-s.base);return s.loop&&g&&(b=(b%m+m)%m),b<0&&(b=0),g&&b>m-.001&&(b=Math.max(0,m-.001)),b}let F=(s,c)=>c>=s.from&&c<s.to;function N(s,c){return s.chain=s.chain.then(()=>new Promise(m=>{let g=s.el;if(s.failed){m();return}let b=!1,I=null,n=null,a=()=>u(null),u=E=>{b||(b=!0,clearTimeout(f),g.removeEventListener("error",a,!0),I&&g.removeEventListener("loadedmetadata",I),n&&g.removeEventListener("seeked",n),E?(S(s,E),(g.readyState===0||++s.misses>=3)&&(s.failed=!0)):s.misses=0,m())},f=setTimeout(()=>u(s.failed||g.error?null:`video "${s.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);g.addEventListener("error",a,!0);let T=()=>{if(I=null,s.failed||g.error){u(null);return}let E=q(s,c);if(s.at===E&&!g.seeking){u(null);return}let B=!1,H=!g.requestVideoFrameCallback,C=()=>{if(!(!B||!H)){if(Math.abs(g.currentTime-E)>.05){u(k(s));return}s.at=E,u(null)}};g.requestVideoFrameCallback&&g.requestVideoFrameCallback(()=>{H=!0,C()}),n=()=>{B=!0,g.requestVideoFrameCallback?C():requestAnimationFrame(()=>requestAnimationFrame(C))},g.addEventListener("seeked",n,{once:!0}),s.at=null,L(s,E)};g.readyState>=1?T():(I=T,g.addEventListener("loadedmetadata",I,{once:!0}))})),s.chain}let d=null,r=0,v=null,O=0,j=(s,c,m)=>{let g=Math.abs(c-m),b=s.el.duration;return s.loop&&b>0&&Number.isFinite(b)?Math.min(g,b-g):g},_=s=>{try{let c=s.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},U=(s,c)=>{let m=s.el;m.paused||m.pause(),Math.abs(m.currentTime-c)>.001&&L(s,c)};function P(s){!o||s.reported||s.stall||s.el.readyState>0||(s.stall=setTimeout(()=>{s.stall=0,s.el.readyState===0&&S(s,`video "${s.src}" did not load within ${8e3/1e3} s`)},8e3))}function D(){for(let s of l)s.failed||(d!==null&&F(s,d)?U(s,q(s,d)):s.el.paused||s.el.pause())}function Y(s){let c=d===null?NaN:s-d,m=performance.now(),g=(m-r)/1e3;d=s,r=m;let b=c>0&&c<=.3,I=v===!0?b:v===null&&b&&Math.abs(c-g)<.1;for(let n of l){if(n.failed)continue;let a=n.el;if(!F(n,s)){a.paused||a.pause(),s<n.from&&n.from-s<=1&&U(n,q(n,n.from));continue}P(n);let u=q(n,s),f=a.duration,T=!n.loop&&f>0&&Number.isFinite(f)&&u>=f-.001-.001;I&&!T?a.paused?(j(n,a.currentTime,u)>.001&&L(n,u),_(n)):j(n,a.currentTime,u)>.15&&L(n,u):U(n,u)}clearTimeout(O),O=setTimeout(D,150)}return{clips:l,seek(s){if(e!=="capture"){Y(s);return}let c=[];for(let m of l)F(m,s)?c.push(m):m.el.paused||m.el.pause();return Promise.all(c.map(m=>N(m,s))).then(()=>{})},transport(s){v=!!s,v||(clearTimeout(O),D())},ready(){return Promise.all(l.map(s=>new Promise(c=>{let m=s.el;if(s.failed||m.error||m.readyState>=2){c();return}let g=()=>{clearTimeout(b),m.removeEventListener("loadeddata",g),m.removeEventListener("error",g,!0),c()},b=setTimeout(()=>{m.readyState===0&&!s.failed&&(s.failed=!0,S(s,`video "${s.src}" did not load within ${1e4/1e3} s`)),g()},1e4);m.addEventListener("loadeddata",g),m.addEventListener("error",g,!0)})))},destroy(){clearTimeout(O);for(let s of l){clearTimeout(s.stall);try{s.el.pause()}catch{}}for(let s of w)URL.revokeObjectURL(s)}}}var St=`\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\n.fvs-scenes{position:absolute;inset:0}\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\n.fvs-transition{position:absolute;inset:0}\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\n`,st={fade:t=>({b:{opacity:t}}),dip:t=>({a:{opacity:G(1-2*t)},b:{opacity:G(2*t-1)}}),"slide-left":(t,e)=>({b:{transform:`translateX(${(1-t)*e}px)`}}),"slide-up":(t,e,i)=>({b:{transform:`translateY(${(1-t)*i}px)`}}),"push-left":(t,e)=>({a:{transform:`translateX(${-t*e}px)`},b:{transform:`translateX(${(1-t)*e}px)`}}),"wipe-left":t=>({b:{clipPath:`inset(0 0 0 ${(1-t)*100}%)`}}),zoom:t=>({b:{opacity:t,transform:`scale(${1.08-.08*t})`}}),blur:t=>({b:{opacity:t,filter:`blur(${12*(1-t)}px)`}})},ct=1e-4,lt=new Set(["dip","push-left"]),Et=["opacity","transform","clipPath","filter"],Wt=Object.keys(st),Tt=/^\\s*(?:(h)(\\d+)|(end|start))?\\s*(?:([+-])?\\s*(\\d*\\.?\\d+)\\s*(b|beats?|s|secs?)?)?\\s*$/i;function ot(t,e,i,p){let o=String(t).match(Tt);if(!o||!o[1]&&!o[3]&&!o[5])throw new Error(`cannot read time "${t}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let h=e.t0;if(o[1]){let l=+o[2];if(!(l<e.hits.length))throw new Error(`"${t}": this scene has ${e.hits.length} hits (h0\\u2013h${e.hits.length-1})`);h=e.hits[l]}if(o[3]==="end"&&(h=e.t1),o[5]){let l=+o[5]*(o[4]==="-"?-1:1),w=(o[6]||"").toLowerCase();h+=l*(w.startsWith("b")?p:w.startsWith("s")?1:i)}return h}function tt(t,e,{doc:i=document,onScene:p=null,media:o="live",onMediaError:h=null}={}){let l=t,w=[],$=l.tempo,y=$?60/$.bpm:.5,M=y*($?$.beatsPerBar:4),k=$?y:1,L=i.createElement("style");L.setAttribute("data-fvs",""),L.textContent=St+`\n`+(l.css||"")+`\n`+l.scenes.filter(n=>n.css&&n.css.trim()).map(n=>`[data-scene="${n.id}"]{\n${n.css}\n}`).join(`\n`),i.head.append(L);let S=i.createElement("div");S.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(S.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),S.innerHTML=l.stage.html||"";let q=S.querySelector("[data-fvs-scenes], fvs-scenes"),F=i.createElement("div");F.className="fvs-scenes",q?q.replaceWith(F):S.prepend(F),q=F,e.append(S);let N=et(S),d=[],r={},v=l.assets||{},O=n=>v[String(n).replace(/^\\.\\//,"")]||n,j=l.scenes,_=n=>n&&n.transition&&st[n.transition.type]&&n.transition.dur>0?n.transition:null,U=j.map((n,a)=>{let u=_(j[a+1]);return u?u.dur:0}),P=[],D=[];for(let[n,a]of j.entries()){let u=i.createElement("div");u.className=`fvs-scene scene ${a.cls||""}`.trim(),u.dataset.scene=a.id,u.innerHTML=a.html||"";let f=_(j[n+1]),T=u;(_(a)||f&&lt.has(f.type))&&(T=i.createElement("div"),T.className="fvs-transition",T.append(u),D.push(T)),P.push(T),q.append(T),N.S(T===u?u:[u,T],a.t0,a.t1+U[n]);let E=typeof a.t0v=="number"?a.t0v:a.t0;r[a.id]={id:a.id,title:a.title,t0:a.t0,t1:a.t1,dur:a.t1-a.t0,t0v:E,in:typeof a.in=="number"?a.in:a.t0-E,hits:a.hits,beats:a.beats,el:u,transition:_(a)},p&&p(r[a.id])}let Y=[];j.forEach((n,a)=>{let u=_(n);u&&a>0&&Y.push({t0:n.t0,d:u.dur,fx:st[u.type],a:lt.has(u.type)?P[a-1]:null,b:P[a]})}),Y.length&&N.H(n=>{let a=Y.find(f=>n>=f.t0&&n<f.t0+f.d),u=new Map;if(a){let f=a.fx(Z(n,a.t0,a.t0+a.d,"io"),l.width,l.height);f.a&&a.a&&u.set(a.a,f.a),f.b&&u.set(a.b,f.b)}for(let f of D){let T=u.get(f);for(let E of Et)f.style[E]=T&&T[E]!==void 0?String(T[E]):""}});function s(n,a){let u=x=>typeof x=="string"?[...a.querySelectorAll(x)]:x==null?[]:x instanceof Element?[x]:[...x],f=(x,A,z)=>N.K(u(x),A,z),T=(x,A,z)=>N.S(u(x),A,z),E=x=>n.t0+x*k,B=(x,A=0)=>x<n.hits.length?n.hits[x]+A*k:NaN,H=(x,A,z)=>f(x,[[A-.01,{o:0}],[A,{o:1},"step"]],z),C=(x,A,z={y:20},R)=>f(x,[[A-.01,{o:0,...z}],[A,{o:1},"step"],[A+.18,{x:0,y:0},"out"]],R),W=(x,A,z=y/2,R)=>f(x,[[A,{o:0}],[A+z,{o:1},"out"]],R),X=(x,A,z=n.t1+(n.tail||0))=>u(x).forEach((R,J)=>J<A.length&&N.S(R,A[J],A[J+1]??z));return{t0:n.t0,t1:n.t1,dur:n.t1-n.t0,hits:n.hits||[],beat:y,bar:M,unit:k,at:E,hit:B,root:a,stage:S,$:x=>a.querySelector(x),$$:x=>[...a.querySelectorAll(x)],K:f,S:T,H:x=>N.H(x),on:x=>N.H(x),type:(x,A,z,R)=>N.type(u(x),A,z,R),cut:H,slide:C,fade:W,seq:X,flash:(x,A=.85)=>d.push([x,A]),grain:(x=".grain")=>it({q:u,H:N.H},x),prog:Z,ease:V,clamp:G,lerp:rt,rng:Q,scenes:r,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:$},width:l.width,height:l.height,fps:l.fps,length:l.length,during:x=>x.map(A=>Array.isArray(A)?A:r[A]?[r[A].t0,r[A].t1]:[0,0]),inside:(x,A)=>A.some(([z,R])=>x>=z&&x<R)}}function c(n,a,u,f){if(!n||!n.trim())return;let T=Object.keys(a);try{new Function(...T,`${n}\n//# sourceURL=fvs://${u}.js`)(...T.map(E=>a[E]))}catch(E){let B=String(E&&E.stack||"").match(new RegExp(`fvs://${u.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")}\\\\.js:(\\\\d+)`));w.push({scene:u.replace(/^scene\\//,""),message:String(E&&E.message||E),line:B&&f?f+ +B[1]-3:f||0})}}function m(n,a){let u=(f,T)=>{try{return ot(f,n,k,y)}catch(E){return w.push({scene:n.id,message:E.message,line:0,el:T.tagName}),NaN}};for(let f of n.el.querySelectorAll("[data-seq]")){let T=String(f.dataset.seq).match(/^\\s*h(\\d+)\\s*$/);if(!T){w.push({scene:n.id,message:`data-seq="${f.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let E=[...f.children],B=+T[1],H=E.map((C,W)=>n.hits[B+W]).filter(C=>C!==void 0);H.length<E.length&&w.push({scene:n.id,message:`data-seq has ${E.length} items but only ${H.length} hits from h${B}`}),a.seq(E,H,f.dataset.seqEnd?u(f.dataset.seqEnd,f):n.t1+(n.tail||0))}for(let f of n.el.querySelectorAll("[data-in], [data-out]")){let T=f.dataset.each!==void 0?+f.dataset.each*k:null,E=T!==null?[...f.children]:[f],B=f.dataset.in!==void 0?u(f.dataset.in,f):null,H=f.dataset.out!==void 0?u(f.dataset.out,f):null,C=(f.dataset.fx||"cut").toLowerCase(),W=(f.dataset.fxOut||"cut").toLowerCase(),X=+f.dataset.dist||24,x=f.dataset.dur!==void 0?+f.dataset.dur*k:y/2;E.forEach((A,z)=>{let R=B===null?null:B+(T||0)*z,J=[];if(R!==null&&!isNaN(R))if(C==="type")N.type([A],R,+f.dataset.cps||30);else if(C==="fade")J.push([R,{o:0}],[R+x,{o:1},"out"]);else if(C==="pop")J.push([R-.01,{o:0,s:.92}],[R,{o:1},"step"],[R+.25,{s:1},"back"]);else if(/^(up|down|left|right)$/.test(C)){let dt={up:{y:X},down:{y:-X},left:{x:X},right:{x:-X}}[C];J.push([R-.01,{o:0,...dt}],[R,{o:1},"step"],[R+.18,{x:0,y:0},"out"])}else J.push([R-.01,{o:0}],[R,{o:1},"step"]);H!==null&&!isNaN(H)&&(W==="fade"?(J.length||J.push([n.t0,{o:1}]),J.push([H,{o:1}],[H+x,{o:0},"in"])):N.S([A],-1e9,H)),J.length&&N.K([A],J)})}}if(j.forEach((n,a)=>{let u=r[n.id],f={...u,t0:u.t0v,dur:u.t1-u.t0v,tail:U[a]},T=s(f,u.el);m(f,T),c(n.js,T,`scene/${n.id}`,n.line)}),c(l.stage.js,s({id:"stage",t0:0,t1:l.length,hits:[],el:S},S),"stage",l.stage.line),l.captions&&l.captions.length){let n=i.createElement("div"),a=l.captionStyle||{};n.className="fvs-captions",n.dataset.position=a.position==="top"?"top":"bottom",n.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[a.size]||.045))}px`,S.append(n);let u=/<\\/?[a-z][^>]*>/gi,f="";N.H(T=>{let E=T-ct,B=l.captions.filter(C=>E>=C.t0-1e-6&&E<C.t1-1e-6&&C.text),H=B.map(C=>`${C.t0}\\0${C.text}`).join("");H!==f&&(f=H,n.replaceChildren(...B.map(C=>{let W=i.createElement("div");return W.className="fvs-caption",W.textContent=C.text.replace(u,""),W})))})}let g=[...S.querySelectorAll("[data-fvs-flash]")];g.length&&(d.sort((n,a)=>n[0]-a[0]),N.H(n=>{let a=0;for(let[u,f]of d)n>=u&&n<u+.18&&(a=Math.max(a,f*(1-(n-u)/.18)**2));for(let u of g)u.style.opacity=a}));let b=at([...j.map((n,a)=>({id:n.id,el:r[n.id].el,from:n.t0,to:n.t1+U[a],base:r[n.id].t0v})),{id:"stage",el:{querySelectorAll:n=>[...S.querySelectorAll(n)].filter(a=>!q.contains(a))},from:-1/0,to:1/0,base:0}],{mode:o,assets:l.assets,errors:w,onError:h});return{root:S,errors:w,scenes:r,seek:n=>{let a=n+ct;return N.render(a),b?b.seek(a):void 0},payload:l,videos:b,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:n=>{b&&b.transport(n)},ready:()=>b?b.ready():Promise.resolve(),destroy(){b&&b.destroy(),S.remove(),L.remove()}}}var At=t=>t.trim().replace(/^\\.\\//,"");var Lt=t=>({id:t.id,kind:"track",src:t.src,url:t.url??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!!t.mute,role:t.role}),jt=(t,e={})=>({id:t.id,kind:"video",scene:t.scene,src:t.src,url:t.url??e[At(t.src)]??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!1,loop:!!t.loop});var ut=t=>t?[...(t.audio||[]).map(Lt),...(t.media||[]).map(e=>jt(e,t.assets))]:[];var Nt=`\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\n.fvs-bar{display:flex;gap:10px;align-items:center}\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\n`,ft=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;function Mt(){let t=document.getElementById("fvs-data");return JSON.parse(t.textContent)}function Ot(t,e,i,p){let o=!1,h=0,l=0,w=()=>o?Math.min(i,h+(performance.now()-l)/1e3):h,$=y=>{let M=w();for(let k of e){let{el:L}=k,S=L.duration,q=k.loop&&S>0&&Number.isFinite(S),F=M-k.at+k.in;q&&(F=(F%S+S)%S);let N=k.dur!=null&&M>=k.at+k.dur;if(!o||M<k.at||N||F>(S||1/0)){L.paused||L.pause(),M<k.at&&L.currentTime!==k.in&&(L.currentTime=k.in);continue}let d=Math.abs(L.currentTime-F);(y||(q?Math.min(d,S-d):d)>.08)&&(L.currentTime=F),L.paused&&L.play().catch(()=>{})}};return{now:w,sync:$,get playing(){return o},play(){h>=i&&(h=0),o=!0,l=performance.now(),$(!0)},pause(){h=w(),o=!1,$()},seek(y){h=Math.max(0,Math.min(i,y)),l=performance.now(),$(!0)},tick(){o&&w()>=i?(h=i,o=!1,$(),p&&p()):o&&$()}}}function Ct(t,e,i){let p=()=>{t.root.style.transform=`scale(${e.clientWidth/i.width})`};new ResizeObserver(p).observe(e),p()}function Rt(t){let e=document.createElement("style");e.textContent=Nt,document.head.append(e);let i=document.createElement("main");i.className="fvs-app",i.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\u25B6 \\u64AD\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\u8FDB\\u5EA6"><output></output></div>\n    <ol class="fvs-chapters" aria-label="\\u7AE0\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(i),i.querySelector("h1").textContent=t.title||"";let p=i.querySelector(".fvs-frame");p.style.aspectRatio=`${t.width} / ${t.height}`,p.style.maxWidth=`calc((100vh - 200px) * ${t.width/t.height})`,p.style.margin="0 auto",p.setAttribute("aria-label",t.title||"video");let o=tt(t,p);Ct(o,p,t);let h=ut(t).filter(r=>!r.mute).map(r=>{let v=new Audio(r.url);return v.preload="auto",v.loop=!!r.loop,v.volume=Math.min(1,10**((r.gain||0)/20)),{el:v,at:r.at,in:r.in,dur:r.dur,loop:!!r.loop}}),l=i.querySelector(".fvs-play"),w=i.querySelector("input"),$=i.querySelector("output");w.max=t.length;let y=Ot(t,h,t.length),M=i.querySelector(".fvs-chapters");M.innerHTML=t.scenes.map(r=>`<li><button type="button" data-t="${r.t0}"><b>${r.t0.toFixed(1)}</b></button></li>`).join(""),[...M.querySelectorAll("button")].forEach((r,v)=>r.append(t.scenes[v].title||t.scenes[v].id));let k=[...M.querySelectorAll("button")];if(o.errors.length){let r=i.querySelector(".fvs-err");r.hidden=!1,r.textContent=o.errors.map(v=>`${v.scene}${v.line?`:${v.line}`:""} ${v.message}`).join(`\n`)}let L=()=>y.playing?y.pause():y.play();l.addEventListener("click",L),p.addEventListener("click",L),w.addEventListener("input",()=>y.seek(+w.value)),k.forEach(r=>r.addEventListener("click",()=>{y.seek(+r.dataset.t),y.playing||y.play()})),document.addEventListener("keydown",r=>{r.target.closest&&r.target.closest("input,button,textarea")||(r.code==="Space"&&(r.preventDefault(),L()),r.code==="ArrowRight"&&y.seek(y.now()+2),r.code==="ArrowLeft"&&y.seek(y.now()-2))});let S=-1,q=null,F=t.scenes.length?Math.min(t.length,t.scenes[Math.min(1,t.scenes.length-1)].t0+.8):0,N=!1,d=()=>{y.tick();let r=N||y.playing?y.now():F;y.playing&&(N=!0),y.playing!==q&&(q=y.playing,o.transport(q)),r!==S&&(o.seek(r),S=r),w.value=r,$.textContent=`${ft(r)} / ${ft(t.length)}`,l.textContent=y.playing?"\\u275A\\u275A \\u6682\\u505C":"\\u25B6 \\u64AD\\u653E",k.forEach((v,O)=>v.classList.toggle("on",r>=t.scenes[O].t0&&r<t.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{N=!0}),requestAnimationFrame(d),window.__fvs={stage:o,clock:y}}function qt(t){document.documentElement.style.background="#000",document.body.style.margin="0";let e=tt(t,document.body,{media:"capture"});e.root.style.transform="none",e.seek(0),window.__stage={w:t.width,h:t.height,dur:t.length,fps:t.fps,errors:e.errors,audio:t.audio,media:t.media||[],seek:i=>e.seek(i),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(i=>i.complete?0:i.decode().catch(()=>0)),e.ready()]))}}var Ft=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _t(t){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let e=document.createElement("div");e.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${t.width}/${t.height};width:min(100vw, calc(100vh * ${t.width/t.height}))`,document.body.append(e);let i={},p=new WeakMap,o=new WeakMap,h=new WeakMap,l=d=>{let r=[],v=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let j;j=O.nextNode();){if(!/\\S/.test(j.data)||j.parentElement&&Ft.test(j.parentElement.tagName))continue;p.set(j,r.length);let _=j.parentElement;o.has(_)||o.set(_,[]),o.get(_).push(r.length),r.push({node:j,el:_})}v.forEach((j,_)=>h.set(j,_)),i[d.id]={texts:r,imgs:v}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),$=tt(t,e,{onScene:l,onMediaError:(d,r)=>w({type:"media-error",scene:d,src:r})}),y=()=>{$.root.style.transform=`scale(${e.clientWidth/t.width})`};new ResizeObserver(y).observe(e),y();let M=0;$.seek(0);let k=document.createElement("div");k.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",e.append(k);let L=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),S=d=>{if(!d){k.style.display="none";return}let r=e.getBoundingClientRect();Object.assign(k.style,{display:"",left:`${d.x-r.left-3}px`,top:`${d.y-r.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},q=d=>{let r=d&&d.closest&&d.closest("[data-scene]");return r?r.dataset.scene:null};function F(d,r){let v=document.elementFromPoint(d.clientX,d.clientY),O=q(v);if(!O||!i[O]){w({type:"pick",scene:null,dbl:r});return}if(v.tagName==="IMG"&&h.has(v)){w({type:"pick",scene:O,img:h.get(v),rect:L(v.getBoundingClientRect()),dbl:r});return}let j=null,_=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);_&&_.startContainer.nodeType===3&&p.has(_.startContainer)&&(j=p.get(_.startContainer));for(let D=v;j===null&&D&&D!==e;D=D.parentElement)o.has(D)&&(j=o.get(D)[0]);if(j===null){w({type:"pick",scene:O,dbl:r});return}let U=i[O].texts[j],P=U.node.isConnected?(()=>{let D=document.createRange();return D.selectNodeContents(U.node),D.getBoundingClientRect()})():U.el.getBoundingClientRect();w({type:"pick",scene:O,text:j,rect:L(P.width?P:U.el.getBoundingClientRect()),dbl:r})}e.addEventListener("click",d=>F(d,!1)),e.addEventListener("dblclick",d=>{d.preventDefault(),F(d,!0)}),window.addEventListener("message",d=>{let r=d.data||{};if(r.fvs==="seek")M=r.t,$.seek(r.t);else if(r.fvs==="transport")$.transport(!!r.playing);else if(r.fvs==="outline"){let v=i[r.scene],O=v?r.img!=null?v.imgs[r.img]:r.text!=null&&v.texts[r.text]?v.texts[r.text].el:null:null;S(O&&O.isConnected&&O.getClientRects().length?L(O.getBoundingClientRect()):null)}});let N=d=>Object.fromEntries(Object.entries(i).map(([r,v])=>[r,v[d].length]));w({type:"ready",length:t.length,errors:$.errors,texts:N("texts"),imgs:N("imgs")}),window.__fvs={stage:$,seek:d=>$.seek(d)}}function It(t){let e=Mt(),i=typeof window<"u"&&window.FVS_MODE||t||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");i==="capture"?qt(e):i==="embed"?_t(e):Rt(e)}return yt(Ht);})();\n';

// src/cli/render.js
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync, mkdtempSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawn, spawnSync } from "node:child_process";
var num2 = (x) => +(+x).toFixed(6);
function audioGraph(segments, from, file) {
  const args = [], parts = [];
  segments.forEach((a, i) => {
    if (a.loop) args.push("-stream_loop", "-1");
    args.push("-i", file(a));
    const trim = a.in > 0 || a.dur != null ? `atrim=start=${num2(a.in)}${a.dur != null ? `:duration=${num2(a.dur)}` : ""},asetpts=PTS-STARTPTS,` : "";
    const shift = a.at - from;
    parts.push(`[${i + 1}:a]${trim}${shift < 0 ? `atrim=start=${-shift},asetpts=PTS-STARTPTS,` : ""}${shift > 0 ? `adelay=${Math.round(shift * 1e3)}:all=1,` : ""}volume=${a.gain || 0}dB[a${i}]`);
  });
  const mix = segments.length > 1 ? `;${segments.map((_, i) => `[a${i}]`).join("")}amix=inputs=${segments.length}:normalize=0[aout]` : "";
  return { args, filter: parts.join(";") + mix, out: segments.length > 1 ? "[aout]" : "[a0]" };
}
var hasAudio = (ff, path) => /: Audio:/.test(spawnSync(ff, ["-hide_banner", "-i", path], { encoding: "utf8" }).stderr || "");
function renderJob(file) {
  if (!file) return { write() {
  }, cancelled: () => false };
  const path = resolve(file), cancel = path + ".cancel";
  let value = JSON.parse(readFileSync(path, "utf8"));
  return {
    write(patch) {
      value = { ...value, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      const tmp = path + ".tmp";
      writeFileSync(tmp, JSON.stringify(value, null, 2) + "\n");
      renameSync(tmp, path);
    },
    cancelled: () => existsSync(cancel)
  };
}
async function renderVideo(ctx, flags2, api) {
  const job = renderJob(flags2.job);
  let browser, frames, partial, cancelTimer;
  const checkCancel = () => {
    if (job.cancelled()) {
      const e = new Error("Render cancelled");
      e.cancelled = true;
      throw e;
    }
  };
  try {
    checkCancel();
    job.write({ status: "preparing", progress: 0, error: null });
    const { p, dir } = ctx, fps = Number(flags2.fps || p.meta.fps), scale = Number(flags2.scale || 1), crf = Number(flags2.crf ?? 18);
    const from = api.timeArg(p, flags2.from) ?? 0, to = Math.min(p.length, api.timeArg(p, flags2.to) ?? p.length);
    if (!Number.isFinite(fps) || fps < 1 || fps > 120 || !Number.isFinite(scale) || scale <= 0 || scale > 4 || !Number.isFinite(crf) || crf < 0 || crf > 51 || from < 0 || !(to > from)) throw new Error("Invalid export range, frame rate, scale or quality");
    const out = resolve(flags2.out || ctx.path.replace(/\.fvs\.md$/i, "") + ".mp4");
    if (flags2.job && existsSync(out)) throw new Error("Output already exists; choose another file");
    const ff = api.ffmpegBin();
    browser = await api.chromium();
    checkCancel();
    frames = flags2["keep-frames"] ? resolve(flags2["keep-frames"]) : mkdtempSync(join(tmpdir(), "fvs-frames-"));
    mkdirSync(frames, { recursive: true });
    const workers = Math.max(1, Math.min(8, Number(flags2.workers) || 3));
    const stages = [];
    try {
      for (let n = 0; n < workers; n++) {
        checkCancel();
        stages.push(await api.openStage(ctx, browser, { captions: !flags2["no-captions"] }));
      }
      if (api.runtimeErrors(stages[0].st, stages[0].logs) && !flags2.force) throw new Error("Scene scripts failed");
      const f0 = Math.round(from * fps), f1 = Math.max(f0, Math.round(to * fps) - 1), total = f1 - f0 + 1;
      let done = 0, lastPct = -1;
      job.write({ status: "frames", progress: 0, totalFrames: total, completedFrames: 0 });
      await Promise.all(stages.map(async ({ pg }, k) => {
        for (let f = f0 + k; f <= f1; f += workers) {
          checkCancel();
          await pg.evaluate((t) => __stage.seek(t), f / fps);
          await pg.screenshot({ path: join(frames, `${String(f - f0).padStart(6, "0")}.png`) });
          const pct2 = Math.floor(++done / total * 80);
          if (pct2 !== lastPct) {
            lastPct = pct2;
            job.write({ progress: pct2, completedFrames: done });
            api.log(`frames ${done}/${total}`);
          }
        }
      }));
      checkCancel();
      await browser.close();
      browser = null;
      const args = ["-y", "-loglevel", "error", "-progress", "pipe:1", "-framerate", String(fps), "-i", join(frames, "%06d.png")];
      const segments = [];
      for (const a of flags2["no-audio"] ? [] : audioSegments(p)) {
        if (a.mute) continue;
        if (a.kind === "video" && !isRelativeUrl(a.src)) {
          api.log(`skipping the sound of ${a.src} (not a project file)`);
          continue;
        }
        if (!existsSync(join(dir, a.src))) throw new Error(`${a.kind === "video" ? "Video" : "Audio"} file not found: ${a.src}`);
        if (a.kind === "video" && !hasAudio(ff, join(dir, a.src))) continue;
        segments.push(a);
      }
      if (segments.length) {
        const g = audioGraph(segments, from, (a) => join(dir, a.src));
        args.push(...g.args, "-filter_complex", g.filter, "-map", "0:v", "-map", g.out, "-c:a", "aac", "-b:a", flags2.abr || "256k");
      }
      args.push("-vf", `scale=trunc(iw*${scale}/2)*2:trunc(ih*${scale}/2)*2:flags=lanczos`, "-c:v", "libx264", "-preset", flags2.preset || "medium", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", String(total / fps));
      mkdirSync(dirname(out), { recursive: true });
      partial = out + `.partial-${process.pid}.mp4`;
      args.push(partial);
      job.write({ status: "encoding", progress: 80 });
      await new Promise((ok, fail) => {
        const child = spawn(ff, args, { stdio: ["ignore", "pipe", "pipe"] });
        let errors = "", pending = "", killing = false;
        const finish = (err) => {
          clearInterval(cancelTimer);
          cancelTimer = null;
          err ? fail(err) : ok();
        };
        child.on("error", finish);
        child.stderr.on("data", (b) => {
          errors = (errors + b.toString()).slice(-4e3);
        });
        child.stdout.on("data", (b) => {
          pending += b.toString();
          const lines = pending.split("\n");
          pending = lines.pop();
          for (const line of lines) if (line.startsWith("out_time_us=")) {
            const sec = Number(line.slice(12)) / 1e6;
            job.write({ progress: Math.min(99, 80 + Math.floor(sec / (total / fps) * 19)) });
          }
        });
        cancelTimer = setInterval(() => {
          if (job.cancelled() && !killing) {
            killing = true;
            child.kill("SIGKILL");
          }
        }, 150);
        child.on("close", (code) => {
          if (job.cancelled()) {
            const e = new Error("Render cancelled");
            e.cancelled = true;
            finish(e);
          } else finish(code === 0 ? null : new Error(`Encoding failed: ${errors || code}`));
        });
      });
      checkCancel();
      if (flags2.job && existsSync(out)) throw new Error("Output was created by another render");
      renameSync(partial, out);
      partial = null;
      job.write({ status: "done", progress: 100, bytes: statSync(out).size, duration: total / fps, output: out });
      api.log(out);
    } finally {
      for (const stage of stages) rmSync(stage.tmp, { recursive: true, force: true });
    }
  } catch (e) {
    job.write({ status: e.cancelled ? "cancelled" : "failed", error: String(e.message || e) });
    throw e;
  } finally {
    clearInterval(cancelTimer);
    await browser?.close().catch(() => {
    });
    if (partial) rmSync(partial, { force: true });
    if (frames && !flags2["keep-frames"]) rmSync(frames, { recursive: true, force: true });
  }
}

// src/cli/fvs.js
var VERSION = "0.7.0";
var HELP = `fvs ${VERSION} \u2014 Forsion Video Studio

  fvs new <file.fvs.md> [--template eva|blank] [--title T]   start a project
  fvs info <file>                      scenes, times, hits (read this before editing)
  fvs check <file> [--runtime]         parse errors; --runtime also runs every scene script in a browser
  fvs cues <file> [--out cues.json]    the cue sheet a score is written against (JSON)
  fvs captions <file> [--out f.srt]    the captions track as a SubRip file
  fvs html <file> [--out f.html] [--inline]   standalone web video (player page)
  fvs still <file> --at <t|scene[:hit]> [--out f.png] [--scale 0.5]   one frame as PNG
  fvs sheet <file> [--scenes | --every <sec>] [--out sheet.png]       contact sheet of frames
  fvs render <file> [--out f.mp4] [--from s] [--to s] [--scale 0.5] [--workers 3] [--crf 18]
                    [--keep-frames dir] [--no-audio] [--no-captions] MP4 with the project's audio and captions
  fvs render-job <job.json>            export with real progress and a .cancel marker
  fvs sync <file> [--audio a.mp3]      do the hits land on accents of the score?

  Times: 12.5 (seconds), scene id (its start), scene:3 (its hit 3).
  Browser: playwright-core (npm i -g playwright-core) + Chrome/Edge, or FVS_CHROMIUM=/path/to/chrome.
  ffmpeg: on PATH, or FFMPEG=/path/to/ffmpeg.`;
var argv = process.argv.slice(2);
var cmd = argv.shift();
var flags = {};
var pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const [k, v] = a.slice(2).split("=");
    if (v !== void 0) flags[k] = v;
    else if (argv[i + 1] !== void 0 && !argv[i + 1].startsWith("--")) flags[k] = argv[++i];
    else flags[k] = true;
  } else pos.push(a);
}
var die = (msg, code = 1) => {
  const error = new Error(msg);
  error.exitCode = code;
  throw error;
};
var log = (...a) => console.log(...a);
function load(file) {
  if (!file) die("which project? (fvs <command> <file.fvs.md>)");
  const path = resolve2(file);
  if (!existsSync2(path)) die(`no such file: ${path}`);
  const text = readFileSync2(path, "utf8");
  return { path, dir: dirname2(path), text, p: parseProject(text) };
}
function report(p, { fail = true } = {}) {
  const errs = p.errors.filter((e) => e.level === "error"), warns = p.errors.filter((e) => e.level !== "error");
  for (const e of [...errs, ...warns]) console.error(`${e.level === "error" ? "error" : "warn "} line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);
  if (errs.length && fail && !flags.force) die(`${errs.length} error(s); fix them or pass --force`);
}
var fileUrl = (dir, rel) => pathToFileURL(join2(dir, rel)).href;
function timeArg(p, v) {
  if (v === void 0 || v === true) return null;
  if (/^-?\d+(\.\d+)?$/.test(String(v))) return +v;
  const [id, h] = String(v).split(":");
  const s = sceneById(p, id);
  if (!s) die(`no scene "${id}" (scenes: ${p.scenes.map((x) => x.id).join(", ")})`);
  if (h === void 0) return s.t0;
  if (!(+h < s.hitTimes.length)) die(`scene "${id}" has ${s.hitTimes.length} hits`);
  return s.hitTimes[+h];
}
async function chromium() {
  const req = createRequire(join2(process.cwd(), "x.js"));
  const tries = ["playwright-core", "playwright"];
  let pw = null;
  for (const m of tries) {
    for (const load2 of [() => import(m), () => req(m), () => createRequire(import.meta.url)(m), () => globalRequire(m)]) {
      try {
        pw = await load2();
        if (pw && (pw.chromium || pw.default && pw.default.chromium)) break;
        pw = null;
      } catch {
      }
    }
    if (pw) break;
  }
  if (!pw) die("This command needs a browser driver. Install one:  npm i -g playwright-core   (or run inside a folder with playwright installed)");
  const { chromium: C } = pw.chromium ? pw : pw.default;
  const exe = process.env.FVS_CHROMIUM || flags.browser;
  const attempts = [];
  if (exe) attempts.push({ executablePath: exe });
  attempts.push({}, { channel: "chrome" }, { channel: "msedge" }, { channel: "chromium" });
  for (const p of knownBrowsers()) attempts.push({ executablePath: p });
  let lastErr;
  for (const opt of attempts) {
    try {
      return await C.launch({ ...opt, args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--hide-scrollbars"] });
    } catch (e) {
      lastErr = e;
    }
  }
  die(`Could not start a Chromium-based browser (${String(lastErr && lastErr.message || lastErr).split("\n")[0]}).
Install Google Chrome or Microsoft Edge, or run: npx playwright install chromium, or set FVS_CHROMIUM=/path/to/chrome`);
}
function globalRequire(m) {
  const root = spawnSync2(platform() === "win32" ? "npm.cmd" : "npm", ["root", "-g"], { encoding: "utf8", shell: platform() === "win32" }).stdout.trim();
  return createRequire(join2(root, "x.js"))(m);
}
function knownBrowsers() {
  const P = platform(), h = homedir();
  const list2 = P === "darwin" ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Chromium.app/Contents/MacOS/Chromium", `${h}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`] : P === "win32" ? [`${process.env["PROGRAMFILES"] || "C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)"}\\Microsoft\\Edge\\Application\\msedge.exe`, `${process.env.LOCALAPPDATA || ""}\\Google\\Chrome\\Application\\chrome.exe`] : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/opt/pw-browsers/chromium/chrome-linux/chrome", "/snap/bin/chromium"];
  return list2.filter((p) => {
    try {
      return existsSync2(p);
    } catch {
      return false;
    }
  });
}
function ffmpegBin() {
  const cands = [flags.ffmpeg, process.env.FFMPEG, "ffmpeg"].filter(Boolean);
  for (const c of cands) if (spawnSync2(c, ["-version"], { stdio: "ignore" }).status === 0) return c;
  for (const py of ["python3", "python"]) {
    const r = spawnSync2(py, ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"], { encoding: "utf8" });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  die("ffmpeg not found. Install it (macOS: brew install ffmpeg \xB7 Windows: winget install ffmpeg \xB7 Linux: apt install ffmpeg) or set FFMPEG=/path/to/ffmpeg");
}
async function openStage(ctx, browser, { scale = 1, captions = true } = {}) {
  const tmp = mkdtempSync2(join2(tmpdir2(), "fvs-"));
  const payload = compile(ctx.p, { resolve: (rel) => fileUrl(ctx.dir, rel) });
  if (!captions) payload.captions = [];
  const html = buildHtml(payload, runtime_src_default, { mode: "capture" });
  const page = join2(tmp, "capture.html");
  writeFileSync2(page, html);
  const pg = await browser.newPage({ viewport: { width: payload.width, height: payload.height }, deviceScaleFactor: scale });
  const logs = [];
  pg.on("pageerror", (e) => logs.push(String(e.message || e)));
  if (flags["no-remote-fonts"]) await pg.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await pg.route(/\.(mp3|wav|m4a|ogg|aac|flac)(\?|$)/i, (r) => r.abort());
  await pg.goto(pathToFileURL(page).href);
  const st = await pg.evaluate(async () => {
    await Promise.race([window.__stage.ready(), new Promise((r) => setTimeout(r, 15e3))]);
    return { w: __stage.w, h: __stage.h, dur: __stage.dur, fps: __stage.fps, errors: __stage.errors };
  });
  return { pg, st, tmp, payload, logs };
}
function runtimeErrors(st, logs) {
  for (const e of st.errors) console.error(`error line ${e.line || "?"} [${e.scene}]: ${e.message}`);
  for (const l of logs) console.error(`page error: ${l}`);
  return st.errors.length + logs.length;
}
function missingMedia({ p, dir }) {
  const out = [];
  const gone = (rel) => isRelativeUrl(rel) && !existsSync2(join2(dir, rel.trim()));
  for (const a of audioTracks(p.meta)) if (gone(a.src)) out.push({ level: "error", line: p.metaTok >= 0 ? p.toks[p.metaTok].line : 1, message: `audio file not found: ${a.src}` });
  const inHtml = (html, line, scene) => {
    for (const t of scan(html).tags) {
      const refs = t.name === "video" ? [t.attr("src"), t.attr("poster")] : t.name === "source" ? [t.attr("src")] : [];
      for (const r of refs) if (r && gone(r)) out.push({ level: "error", line, scene, message: `${t.name === "video" && r === t.attr("poster") ? "poster image" : "video file"} not found: ${r}` });
    }
  };
  if (p.stageHtml >= 0) inHtml(stageHtml(p), p.toks[p.stageHtml].line, void 0);
  for (const s of p.scenes) inHtml(s.html, s.htmlTok >= 0 ? p.toks[s.htmlTok].line : s.line, s.id);
  return out;
}
var commands = {
  async new() {
    const file = pos[0] || die("fvs new <file.fvs.md>");
    const path = resolve2(file.endsWith(".fvs.md") ? file : `${file}.fvs.md`);
    if (existsSync2(path) && !flags.force) die(`${path} exists (pass --force to overwrite)`);
    const tpl = TEMPLATES[flags.template || "eva"] || die(`templates: ${Object.keys(TEMPLATES).join(", ")}`);
    mkdirSync2(dirname2(path), { recursive: true });
    writeFileSync2(path, tpl({ title: flags.title || basename(path, ".fvs.md"), zh: flags.lang !== "en" }));
    log(path);
  },
  async info() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const tp = p.tempo;
    const sec = (x) => `${+x.toFixed(3)} s`;
    log(`${p.meta.title || "(untitled)"} \xB7 ${p.meta.width}\xD7${p.meta.height} @ ${p.meta.fps} fps \xB7 ${p.length.toFixed(2)} s${tp ? ` \xB7 ${tp.bpm} BPM ${tp.beatsPerBar}/4 (beat ${tp.beat.toFixed(3)} s, bar ${tp.bar.toFixed(3)} s)` : ""}`);
    for (const a of audioTracks(p.meta)) log(`audio ${a.role}: ${a.src}${a.at ? ` at ${a.at}s` : ""}${a.gain ? ` ${a.gain} dB` : ""}${a.in ? ` from ${sec(a.in)} into the file` : ""}${a.dur != null ? ` for ${sec(a.dur)}` : ""}${a.mute ? " (muted)" : ""}`);
    log("");
    log(`${"#".padStart(3)}  ${"id".padEnd(14)} ${"start".padStart(7)} ${"end".padStart(7)}  ${"length".padEnd(10)} hits (${tp ? "beats" : "s"} from scene start \u2192 absolute s)`);
    if (p.scenes.some((s) => s.in)) log(`     with "in", hits count from the content start (start \u2212 in); (h\u2192t) = trimmed away, not on screen`);
    for (const s of p.scenes) {
      const shown = new Set(visibleHits(s).map((h) => h.index));
      const hits = s.hits.map((h, i) => shown.has(i) ? `${h}\u2192${s.hitTimes[i].toFixed(2)}` : `(${h}\u2192${s.hitTimes[i].toFixed(2)})`).join("  ");
      log(`${String(s.index + 1).padStart(3)}  ${s.id.padEnd(14)} ${s.t0.toFixed(2).padStart(7)} ${s.t1.toFixed(2).padStart(7)}  ${String(s.meta.length ?? "?").padEnd(10)} ${hits}${s.title ? `   # ${s.title}` : ""}`);
      const extra = [];
      if (s.in) extra.push(`in ${s.meta.in} (${sec(s.in)}; content starts at ${s.t0v.toFixed(2)})`);
      if (s.transition) extra.push(`transition ${s.transition.type} ${sec(s.transition.dur)} (with ${p.scenes[s.index - 1].id} on screen underneath)`);
      if (extra.length) log(`${" ".repeat(5)}${extra.join(" \xB7 ")}`);
      for (const v of videos(s.html)) log(`${" ".repeat(5)}video ${v.src || "(no src)"}${v.clipIn ? ` \xB7 from ${sec(v.clipIn)} into the file` : ""}${v.gain ? ` \xB7 ${v.gain} dB` : ""}${v.muted ? " \xB7 muted" : ""}${v.loop ? " \xB7 loop" : ""}`);
    }
    if (p.captions.length) log(`
captions: ${p.captions.length} cues, ${Math.min(...p.captions.map((c) => c.start)).toFixed(2)}\u2013${Math.max(...p.captions.map((c) => c.end)).toFixed(2)} s on project time (scene edits do not move them; fvs captions lists them)`);
  },
  async check() {
    const ctx = load(pos[0]);
    report(ctx.p, { fail: false });
    let n = ctx.p.errors.filter((e) => e.level === "error").length;
    for (const e of missingMedia(ctx)) {
      console.error(`error line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);
      n++;
    }
    if (flags.runtime) {
      const browser = await chromium();
      const { pg, st, logs } = await openStage(ctx, browser);
      const withVideo = ctx.p.scenes.filter((s) => videos(s.html).length);
      for (const s of withVideo) await pg.evaluate((x) => __stage.seek(x), s.t0);
      if (withVideo.length) st.errors = await pg.evaluate(() => __stage.errors);
      n += runtimeErrors(st, logs);
      await browser.close();
    }
    if (n) die(`${n} error(s)`);
    log(`ok \xB7 ${ctx.p.scenes.length} scenes \xB7 ${ctx.p.length.toFixed(2)} s${flags.runtime ? " \xB7 scripts ran clean" : ""}`);
  },
  async cues() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const out = JSON.stringify(cueSheet(p), null, 2);
    if (flags.out) {
      writeFileSync2(resolve2(flags.out), out + "\n");
      log(resolve2(flags.out));
    } else log(out);
  },
  async captions() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const bad = p.errors.filter((e) => e.captions && e.level === "error").length;
    if (bad && !flags.force) die(`${bad} caption error(s) above; the SRT would leave those cues out (fix them or pass --force)`);
    const out = formatSrt(p.captions);
    if (flags.out) {
      writeFileSync2(resolve2(flags.out), out ? out + "\n" : "");
      log(resolve2(flags.out));
    } else if (out) log(out);
  },
  async html() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const out = resolve2(flags.out || ctx.path.replace(/\.fvs\.md$/i, "") + ".html");
    const outDir = dirname2(out);
    const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4", ".ogg": "audio/ogg", ".mp4": "video/mp4", ".m4v": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };
    const resolveUrl = (rel) => {
      const abs = join2(ctx.dir, rel);
      if (flags.inline && existsSync2(abs)) return `data:${mime[extname(abs).toLowerCase()] || "application/octet-stream"};base64,${readFileSync2(abs).toString("base64")}`;
      return relative(outDir, abs).split(sep).join("/");
    };
    const payload = compile(ctx.p, { resolve: resolveUrl });
    writeFileSync2(out, buildHtml(payload, runtime_src_default, { mode: "player" }));
    log(`${out} (${(statSync2(out).size / 1024).toFixed(0)} KB)`);
  },
  async still() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const t = timeArg(ctx.p, flags.at) ?? 0;
    const browser = await chromium();
    const { pg, st, logs } = await openStage(ctx, browser, { scale: +flags.scale || 1 });
    runtimeErrors(st, logs);
    await pg.evaluate((x) => __stage.seek(x), t);
    const out = resolve2(flags.out || `${ctx.path.replace(/\.fvs\.md$/i, "")}-${t.toFixed(2)}s.png`);
    await pg.screenshot({ path: out });
    await browser.close();
    log(out);
  },
  async sheet() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const p = ctx.p;
    let times;
    if (flags.every) {
      const d = +flags.every;
      times = [];
      for (let t = 0; t < p.length; t += d) times.push(t);
    } else times = p.scenes.map((s) => {
      const vis = visibleHits(s);
      return Math.max(s.t0, Math.min(s.t1 - Math.min(0.05, s.dur / 2), (vis.length ? vis[vis.length - 1].t : s.t0) + 0.5));
    });
    const labels = flags.every ? times.map((t) => `${t.toFixed(1)}s`) : p.scenes.map((s) => `${s.id} \xB7 ${s.t0.toFixed(1)}s`);
    const browser = await chromium();
    const scale = 320 / p.meta.width;
    const { pg, st, logs } = await openStage(ctx, browser, { scale });
    runtimeErrors(st, logs);
    const shots = [];
    for (const t of times) {
      await pg.evaluate((x) => __stage.seek(x), t);
      shots.push((await pg.screenshot({ type: "jpeg", quality: 80 })).toString("base64"));
    }
    const cols = Math.min(6, Math.ceil(Math.sqrt(shots.length * 1.4)));
    const sheet = await browser.newPage({ viewport: { width: cols * 332 + 12, height: 400 } });
    await sheet.setContent(`<body style="margin:0;background:#111;color:#bbb;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},320px);gap:12px;padding:12px">${shots.map((b, i) => `<figure style="margin:0"><img style="display:block;width:320px" src="data:image/jpeg;base64,${b}"><figcaption style="padding-top:4px">${labels[i]}</figcaption></figure>`).join("")}</div></body>`);
    const out = resolve2(flags.out || `${ctx.path.replace(/\.fvs\.md$/i, "")}-sheet.png`);
    await sheet.screenshot({ path: out, fullPage: true });
    await browser.close();
    log(out);
  },
  async render() {
    const ctx = load(pos[0]);
    report(ctx.p);
    return renderVideo(ctx, flags, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });
  },
  async "render-job"() {
    const jobPath = resolve2(pos[0] || die("render-job requires a job JSON file"));
    const job = renderJob(jobPath);
    try {
      const spec = JSON.parse(readFileSync2(jobPath, "utf8"));
      if (spec.v !== 1 || !spec.project || !spec.out || !spec.options) die("Invalid render job");
      if (["done", "failed", "cancelled"].includes(spec.status)) {
        log(`Job already ${spec.status}`);
        return;
      }
      const ctx = load(spec.project);
      if (spec.sourceSnapshot) {
        ctx.text = readFileSync2(spec.sourceSnapshot, "utf8");
        ctx.p = parseProject(ctx.text);
      }
      report(ctx.p);
      return await renderVideo(ctx, { ...spec.options, out: spec.out, job: jobPath }, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });
    } catch (e) {
      job.write({ status: job.cancelled() ? "cancelled" : "failed", error: String(e.message || e) });
      throw e;
    }
  },
  async sync() {
    const { p, dir } = load(pos[0]);
    report(p, { fail: false });
    const tracks = audioTracks(p.meta), track2 = tracks.find((a) => !a.mute) || tracks[0];
    const src = flags.audio ? resolve2(flags.audio) : track2 && join2(dir, track2.src);
    if (!src || !existsSync2(src)) die(`no audio to check against (add one to the project's "audio" or pass --audio)`);
    const at = flags.audio ? 0 : track2.at || 0;
    const ff = ffmpegBin();
    const r = spawnSync2(ff, ["-v", "error", "-i", src, "-ac", "1", "-ar", String(ONSET_SR), "-f", "f32le", "-"], { maxBuffer: 1 << 30 });
    if (r.status !== 0) die(`ffmpeg could not decode ${src}`);
    const buf = r.stdout;
    let pcm = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4));
    if (!flags.audio && (track2.in > 0 || track2.dur != null)) {
      const a = Math.min(pcm.length, Math.round(track2.in * ONSET_SR));
      pcm = pcm.subarray(a, track2.dur != null ? Math.min(pcm.length, a + Math.round(track2.dur * ONSET_SR)) : pcm.length);
    }
    const lead = new Float32Array(Math.round(at * ONSET_SR));
    const mono = at > 0 ? Float32Array.from([...lead, ...pcm]) : pcm;
    const rows = syncReport(p.scenes, onsetEnvelope(mono, ONSET_SR));
    let bad = 0;
    for (const x of rows) {
      const flag = x.ok ? x.quiet ? "cut to quiet" : "" : "<< weak accent";
      if (!x.ok) bad++;
      if (!x.ok || flags.all) log(`${x.t.toFixed(2).padStart(7)}s  ${x.scene}:h${x.hit}  accent ${x.strength.toFixed(2)}  ${x.offset == null ? "" : `${x.offset >= 0 ? "+" : ""}${Math.round(x.offset * 1e3)} ms`}  ${flag}`);
    }
    log(`${rows.length} hits, ${rows.length - bad} land on an accent${bad ? `, ${bad} do not (listed above)` : ""}`);
  }
};
if (!cmd || cmd === "help" || flags.help || !commands[cmd]) {
  log(HELP);
  process.exit(cmd && !commands[cmd] && cmd !== "help" ? 1 : 0);
}
commands[cmd]().catch((e) => {
  console.error(e && e.stack || String(e));
  process.exitCode = e.exitCode || 1;
});
