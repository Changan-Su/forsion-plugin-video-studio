#!/usr/bin/env node
/* Forsion Video Studio 0.13.0 — built from src/ by build.mjs; edit the sources, not this file. */

// src/cli/fvs.js
import { readFileSync as readFileSync2, writeFileSync as writeFileSync2, mkdirSync as mkdirSync2, existsSync as existsSync2, rmSync as rmSync2, mkdtempSync as mkdtempSync2, readdirSync, statSync as statSync2, copyFileSync, symlinkSync, lstatSync, unlinkSync } from "node:fs";
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
    cues.push({ start, end, text: block.slice(k + 1).join("\n").trim(), line: from + k + 1, raw: block[k].trim() });
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
  if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, code: "no-scenes", message: 'the project has no scenes yet (add a "## id \xB7 Title" section)' });
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
    const tag = { index: tags.length, name, start: i, end, attrs, parent: stack.length ? stack[stack.length - 1] : -1, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };
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
var hfRoot = (P) => {
  const timed = `data-start="0" data-duration="${+P.length}" data-no-timeline`;
  return `<div id="fvs-hf-root" data-composition-id="fvs" data-width="${+P.width}" data-height="${+P.height}" data-fps="${+P.fps}" ${timed} style="position:relative;width:${+P.width}px;height:${+P.height}px;overflow:hidden"><div id="fvs-hf-host" data-composition-id="fvs-stage" data-track-index="0" ${timed} style="position:absolute;inset:0"></div></div>`;
};
var HF_SOURCE = `
<script>(()=>{const host=document.getElementById('fvs-hf-host'),stage=document.querySelector('.fvs-stage'),s=window.__stage;if(stage)host.append(stage);
if(window.__hyperframes&&window.__hyperframes.registerFrameSource)window.__hyperframes.registerFrameSource({element:host,ready:s.ready(),render:t=>s.seek(t)});})();</script>`;
function buildHtml(payload, runtimeSource, { mode = "player", extraHead = "", runtimeUrl = "" } = {}) {
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
<body>${mode === "hf" ? hfRoot(payload) : ""}
<script type="application/json" id="fvs-data">${scriptJSON(payload)}</script>
${runtimeUrl ? `<script src="${esc(runtimeUrl)}"></script>` : `<script>${runtimeSource.replace(/<\/script/gi, "<\\/script")}</script>`}
<script>FVS.boot(${JSON.stringify(mode === "hf" ? "capture" : mode)});</script>${mode === "hf" ? HF_SOURCE : ""}
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
var runtime_src_default = '/* Forsion Video Studio 0.13.0 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\nvar FVS=(()=>{var ne=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var he=Object.getOwnPropertyNames;var me=Object.prototype.hasOwnProperty;var ge=(e,t)=>{for(var a in t)ne(e,a,{get:t[a],enumerable:!0})},be=(e,t,a,g)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of he(t))!me.call(e,r)&&r!==a&&ne(e,r,{get:()=>t[r],enumerable:!(g=pe(t,r))||g.enumerable});return e};var ye=e=>be(ne({},"__esModule",{value:!0}),e);var He={};ge(He,{EASE:()=>X,boot:()=>Ie,createStage:()=>te,mount:()=>ee,prog:()=>Z,rng:()=>Q,timeExpr:()=>oe});var X={lin:e=>e,in:e=>e*e*e,out:e=>1-(1-e)**3,io:e=>e<.5?4*e**3:1-(-2*e+2)**3/2,expo:e=>e>=1?1:1-2**(-10*e),back:e=>1+2.70158*(e-1)**3+1.70158*(e-1)**2,step:e=>e<1?0:1},Y=(e,t=0,a=1)=>Math.min(a,Math.max(t,e)),re=(e,t,a)=>e+(t-e)*a,Z=(e,t,a,g="io")=>(X[g]||X.io)(Y((e-t)/(a-t))),Q=e=>()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},we=["x","y","z","s","sx","sy","r","rx","ry"];function xe(e,t){if(t<=e[0].t)return e[0].v;for(let a=1;a<e.length;a++){let g=e[a];if(t<g.t){let r=e[a-1],b=(X[g.e]||X.io)((t-r.t)/(g.t-r.t)),l={};for(let w in g.v){let v=w in r.v?r.v[w]:g.v[w],x=g.v[w];l[w]=typeof x=="number"&&typeof v=="number"?v+(x-v)*b:b<1?v:x}return l}}return e[e.length-1].v}function $e(e,t,a){let g=e.style;if(a){let r=`translate3d(${t.x||0}px,${t.y||0}px,${t.z||0}px)`;t.rx&&(r+=` rotateX(${t.rx}deg)`),t.ry&&(r+=` rotateY(${t.ry}deg)`),t.r&&(r+=` rotate(${t.r}deg)`),(t.s??1)!==1&&(r+=` scale(${t.s})`),((t.sx??1)!==1||(t.sy??1)!==1)&&(r+=` scale(${t.sx??1},${t.sy??1})`),g.transform=r}"o"in t&&(g.opacity=t.o,g.visibility=t.o<.002?"hidden":""),("b"in t||"br"in t)&&(g.filter=`blur(${t.b||0}px) brightness(${t.br??1})`),("ct"in t||"cr"in t||"cb"in t||"cl"in t)&&(g.clipPath=`inset(${t.ct||0}% ${t.cr||0}% ${t.cb||0}% ${t.cl||0}%)`);for(let r in t)r[0]==="-"&&g.setProperty(r,t[r])}function te(e){let t=[],a=[],g=r=>typeof r=="string"?[...e.querySelectorAll(r)]:r==null?[]:r instanceof Element?[r]:[...r];return{root:e,q:g,tracks:t,hooks:a,K(r,b,l={}){let w={},v=b.map(([M,L={},C="io"])=>(w={...w,...L},{t:M,v:w,e:C}));if(!v.length)return;let x=v.some(M=>Object.keys(M.v).some(L=>we.includes(L)));g(r).forEach((M,L)=>t.push({el:M,kf:v,hasTf:x,off:(l.stagger||0)*L}))},S(r,b,l){let w=g(r);a.push(v=>{for(let x of w)x.style.display=v>=b&&v<l?"":"none"})},H(r){a.push(r)},type(r,b,l=30,w=0){g(r).forEach((v,x)=>{let M=[...v.textContent],L=b+w*x;a.push(C=>{let j=Y(Math.floor((C-L)*l),0,M.length),H=M.slice(0,j).join("");v.textContent!==H&&(v.textContent=H)})})},render(r){for(let b of a)b(r);for(let b of t)$e(b.el,xe(b.kf,r-b.off),b.hasTf)}}}var K=null;function ke(){if(K)return K;let e=Q(7);K=[];for(let t=0;t<4;t++){let a=document.createElement("canvas");a.width=a.height=200;let g=a.getContext("2d"),r=g.createImageData(200,200);for(let b=0;b<r.data.length;b+=4){let l=e()*255;r.data[b]=r.data[b+1]=r.data[b+2]=l,r.data[b+3]=255}g.putImageData(r,0,0),K.push(`url(${a.toDataURL()})`)}return K}function ie(e,t=".grain"){let a=e.q(t),g=ke();e.H(r=>{let b=g[Math.floor(r*24)%4];for(let l of a)l.style.backgroundImage=b})}var ve=["","aborted","network error","decode error","format not supported or file missing"];function ae(e,{mode:t="live",assets:a={},errors:g=[],onError:r=null}={}){let b={};for(let[n,c]of Object.entries(a||{}))typeof c=="string"&&!(c in b)&&(b[c]=n);let l=[],w=[],v=n=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(n||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let h=atob(n.slice(c[0].length).replace(/\\s+/g,"")),m=new Uint8Array(h.length);for(let s=0;s<h.length;s++)m[s]=h.charCodeAt(s);let k=URL.createObjectURL(new Blob([m],{type:c[1]||"video/mp4"}));return w.push(k),k}catch{return null}};for(let n of e)for(let c of n.el.querySelectorAll("video")){let h=c.querySelector("source[src]"),m=c.getAttribute("src")||(h?h.getAttribute("src"):"")||"";for(let s of[c,...c.querySelectorAll("source[src]")]){let o=v(s.getAttribute("src"));o&&s.setAttribute("src",o)}let k={el:c,scene:n.id,src:b[m]||m,from:n.from,to:n.to,base:n.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0,left:0,trip:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=k.loop,c.addEventListener("error",()=>{k.failed=!0,j(k,x(k))},!0),c.addEventListener("loadedmetadata",()=>{M(k)||j(k,L(k))}),c.addEventListener("seeked",()=>{let s=k.want;k.want=null,s!==null&&(k.trip=(performance.now()-k.left)/1e3,Math.abs(c.currentTime-s)>.05&&j(k,L(k)))});try{c.pause(),c.load()}catch{}l.push(k)}if(!l.length)return null;function x(n){let c=n.el.error,h=c?c.code:0,m=c?` (${ve[h]||`error ${h}`}${c.message?`: ${c.message}`:""})`:"",k=h===3||h===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${n.src}" cannot be played${m}${k}`}function M(n){let c=n.el,h=c.duration,m=c.seekable;return!(Number.isFinite(h)&&h>.5&&(!m||!m.length||m.end(m.length-1)<.01))}let L=n=>`video "${n.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function C(n,c){n.want=c,n.left=performance.now(),n.el.currentTime=c}function j(n,c){if(!n.reported&&(n.reported=!0,g.push({scene:n.scene,message:c,line:0}),r))try{r(n.scene,n.src)}catch{}}function H(n,c){let h=n.el.duration,m=h>0&&Number.isFinite(h),k=n.clipIn+(c-n.base);return n.loop&&m&&(k=(k%h+h)%h),k<0&&(k=0),m&&k>h-.001&&(k=Math.max(0,h-.001)),k}let U=(n,c)=>c>=n.from&&c<n.to;function q(n,c){return n.chain=n.chain.then(()=>new Promise(h=>{let m=n.el;if(n.failed){h();return}let k=!1,s=null,o=null,f=()=>u(null),u=I=>{k||(k=!0,clearTimeout(S),m.removeEventListener("error",f,!0),s&&m.removeEventListener("loadedmetadata",s),o&&m.removeEventListener("seeked",o),I?(j(n,I),(m.readyState===0||++n.misses>=3)&&(n.failed=!0)):n.misses=0,h())},S=setTimeout(()=>u(n.failed||m.error?null:`video "${n.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);m.addEventListener("error",f,!0);let A=()=>{if(s=null,n.failed||m.error){u(null);return}let I=H(n,c);if(n.at===I&&!m.seeking){u(null);return}let D=!1,F=!m.requestVideoFrameCallback,W=()=>{if(!(!D||!F)){if(Math.abs(m.currentTime-I)>.05){u(L(n));return}n.at=I,u(null)}};m.requestVideoFrameCallback&&m.requestVideoFrameCallback(()=>{F=!0,W()}),o=()=>{D=!0,m.requestVideoFrameCallback?W():requestAnimationFrame(()=>requestAnimationFrame(W))},m.addEventListener("seeked",o,{once:!0}),n.at=null,C(n,I)};m.readyState>=1?A():(s=A,m.addEventListener("loadedmetadata",s,{once:!0}))})),n.chain}let d=null,i=0,p=null,O=0,$=(n,c,h)=>{let m=h-c,k=n.el.duration;return n.loop&&k>0&&Number.isFinite(k)&&(m-=k*Math.round(m/k)),m},T=(n,c,h)=>Math.abs($(n,c,h)),R=n=>{try{let c=n.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},z=(n,c)=>{let h=n.el;h.paused||h.pause(),Math.abs(h.currentTime-c)>.001&&C(n,c)};function _(n){!r||n.reported||n.stall||n.el.readyState>0||(n.stall=setTimeout(()=>{n.stall=0,n.el.readyState===0&&j(n,`video "${n.src}" did not load within ${8e3/1e3} s`)},8e3))}function P(){for(let n of l)n.failed||(d!==null&&U(n,d)?z(n,H(n,d)):n.el.paused||n.el.pause())}function V(n){let c=d===null?NaN:n-d,h=performance.now(),m=(h-i)/1e3;d=n,i=h;let k=c>0&&c<=.3,s=p===!0?k:p===null&&k&&Math.abs(c-m)<.1;for(let o of l){if(o.failed)continue;let f=o.el;if(!U(o,n)){f.paused||f.pause(),n<o.from&&o.from-n<=1&&z(o,H(o,o.from));continue}_(o);let u=H(o,n),S=f.duration,A=!o.loop&&S>0&&Number.isFinite(S)&&u>=S-.001-.001;if(s&&!A){let I=$(o,f.currentTime,u),D=Math.abs(I);if(f.paused)(D>.15||f.ended)&&C(o,u),R(o);else if(f.seeking)o.want!==null&&h-o.left>8e3&&C(o,H(o,n+o.trip));else if(D>.15)C(o,H(o,n+o.trip));else{let F=D>(f.playbackRate===1?.02:.01)?1+Math.sign(I)*.1:1;f.playbackRate!==F&&(f.playbackRate=F)}}else z(o,u)}clearTimeout(O),O=setTimeout(P,150)}return{clips:l,seek(n){if(t!=="capture"){V(n);return}let c=[];for(let h of l)U(h,n)?c.push(h):h.el.paused||h.el.pause();return Promise.all(c.map(h=>q(h,n))).then(()=>{})},transport(n){p=!!n,p||(clearTimeout(O),P())},ready(){return Promise.all(l.map(n=>new Promise(c=>{let h=n.el;if(n.failed||h.error||h.readyState>=2){c();return}let m=()=>{clearTimeout(k),h.removeEventListener("loadeddata",m),h.removeEventListener("error",m,!0),c()},k=setTimeout(()=>{h.readyState===0&&!n.failed&&(n.failed=!0,j(n,`video "${n.src}" did not load within ${1e4/1e3} s`)),m()},1e4);h.addEventListener("loadeddata",m),h.addEventListener("error",m,!0)})))},destroy(){clearTimeout(O);for(let n of l){clearTimeout(n.stall);try{n.el.pause()}catch{}}for(let n of w)URL.revokeObjectURL(n)}}}var Se=`\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\n.fvs-scenes{position:absolute;inset:0}\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\n.fvs-transition{position:absolute;inset:0}\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\n`,se={fade:e=>({b:{opacity:e}}),dip:e=>({a:{opacity:Y(1-2*e)},b:{opacity:Y(2*e-1)}}),"slide-left":(e,t)=>({b:{transform:`translateX(${(1-e)*t}px)`}}),"slide-up":(e,t,a)=>({b:{transform:`translateY(${(1-e)*a}px)`}}),"push-left":(e,t)=>({a:{transform:`translateX(${-e*t}px)`},b:{transform:`translateX(${(1-e)*t}px)`}}),"wipe-left":e=>({b:{clipPath:`inset(0 0 0 ${(1-e)*100}%)`}}),zoom:e=>({b:{opacity:e,transform:`scale(${1.08-.08*e})`}}),blur:e=>({b:{opacity:e,filter:`blur(${12*(1-e)}px)`}})},le=1e-4,ce=new Set(["dip","push-left"]),Ee=["opacity","transform","clipPath","filter"],We=Object.keys(se),Te=/^\\s*(?:(h)(\\d+)|(end|start))?\\s*(?:([+-])?\\s*(\\d*\\.?\\d+)\\s*(b|beats?|s|secs?)?)?\\s*$/i;function oe(e,t,a,g){let r=String(e).match(Te);if(!r||!r[1]&&!r[3]&&!r[5])throw new Error(`cannot read time "${e}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let b=t.t0;if(r[1]){let l=+r[2];if(!(l<t.hits.length))throw new Error(`"${e}": this scene has ${t.hits.length} hits (h0\\u2013h${t.hits.length-1})`);b=t.hits[l]}if(r[3]==="end"&&(b=t.t1),r[5]){let l=+r[5]*(r[4]==="-"?-1:1),w=(r[6]||"").toLowerCase();b+=l*(w.startsWith("b")?g:w.startsWith("s")?1:a)}return b}function ee(e,t,{doc:a=document,onScene:g=null,media:r="live",onMediaError:b=null}={}){let l=e,w=[],v=l.tempo,x=v?60/v.bpm:.5,M=x*(v?v.beatsPerBar:4),L=v?x:1,C=a.createElement("style");C.setAttribute("data-fvs",""),C.textContent=Se+`\n`+(l.css||"")+`\n`+l.scenes.filter(s=>s.css&&s.css.trim()).map(s=>`[data-scene="${s.id}"]{\n${s.css}\n}`).join(`\n`),a.head.append(C);let j=a.createElement("div");j.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(j.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),j.innerHTML=l.stage.html||"";let H=j.querySelector("[data-fvs-scenes], fvs-scenes"),U=a.createElement("div");U.className="fvs-scenes",H?H.replaceWith(U):j.prepend(U),H=U,t.append(j);let q=te(j),d=[],i={},p=l.assets||{},O=s=>p[String(s).replace(/^\\.\\//,"")]||s,$=l.scenes,T=s=>s&&s.transition&&se[s.transition.type]&&s.transition.dur>0?s.transition:null,R=$.map((s,o)=>{let f=T($[o+1]);return f?f.dur:0}),z=[],_=[];for(let[s,o]of $.entries()){let f=a.createElement("div");f.className=`fvs-scene scene ${o.cls||""}`.trim(),f.dataset.scene=o.id,f.innerHTML=o.html||"";let u=T($[s+1]),S=f;(T(o)||u&&ce.has(u.type))&&(S=a.createElement("div"),S.className="fvs-transition",S.append(f),_.push(S)),z.push(S),H.append(S),q.S(S===f?f:[f,S],o.t0,o.t1+R[s]);let A=typeof o.t0v=="number"?o.t0v:o.t0;i[o.id]={id:o.id,title:o.title,t0:o.t0,t1:o.t1,dur:o.t1-o.t0,t0v:A,in:typeof o.in=="number"?o.in:o.t0-A,hits:o.hits,beats:o.beats,el:f,transition:T(o)},g&&g(i[o.id])}let P=[];$.forEach((s,o)=>{let f=T(s);f&&o>0&&P.push({t0:s.t0,d:f.dur,fx:se[f.type],a:ce.has(f.type)?z[o-1]:null,b:z[o]})}),P.length&&q.H(s=>{let o=P.find(u=>s>=u.t0&&s<u.t0+u.d),f=new Map;if(o){let u=o.fx(Z(s,o.t0,o.t0+o.d,"io"),l.width,l.height);u.a&&o.a&&f.set(o.a,u.a),u.b&&f.set(o.b,u.b)}for(let u of _){let S=f.get(u);for(let A of Ee)u.style[A]=S&&S[A]!==void 0?String(S[A]):""}});function V(s,o){let f=y=>typeof y=="string"?[...o.querySelectorAll(y)]:y==null?[]:y instanceof Element?[y]:[...y],u=(y,E,B)=>q.K(f(y),E,B),S=(y,E,B)=>q.S(f(y),E,B),A=y=>s.t0+y*L,I=(y,E=0)=>y<s.hits.length?s.hits[y]+E*L:NaN,D=(y,E,B)=>u(y,[[E-.01,{o:0}],[E,{o:1},"step"]],B),F=(y,E,B={y:20},N)=>u(y,[[E-.01,{o:0,...B}],[E,{o:1},"step"],[E+.18,{x:0,y:0},"out"]],N),W=(y,E,B=x/2,N)=>u(y,[[E,{o:0}],[E+B,{o:1},"out"]],N),G=(y,E,B=s.t1+(s.tail||0))=>f(y).forEach((N,J)=>J<E.length&&q.S(N,E[J],E[J+1]??B));return{t0:s.t0,t1:s.t1,dur:s.t1-s.t0,hits:s.hits||[],beat:x,bar:M,unit:L,at:A,hit:I,root:o,stage:j,$:y=>o.querySelector(y),$$:y=>[...o.querySelectorAll(y)],K:u,S,H:y=>q.H(y),on:y=>q.H(y),type:(y,E,B,N)=>q.type(f(y),E,B,N),cut:D,slide:F,fade:W,seq:G,flash:(y,E=.85)=>d.push([y,E]),grain:(y=".grain")=>ie({q:f,H:q.H},y),prog:Z,ease:X,clamp:Y,lerp:re,rng:Q,scenes:i,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:v},width:l.width,height:l.height,fps:l.fps,length:l.length,during:y=>y.map(E=>Array.isArray(E)?E:i[E]?[i[E].t0,i[E].t1]:[0,0]),inside:(y,E)=>E.some(([B,N])=>y>=B&&y<N)}}function n(s,o,f,u){if(!s||!s.trim())return;let S=Object.keys(o);try{new Function(...S,`${s}\n//# sourceURL=fvs://${f}.js`)(...S.map(A=>o[A]))}catch(A){let I=String(A&&A.stack||"").match(new RegExp(`fvs://${f.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")}\\\\.js:(\\\\d+)`));w.push({scene:f.replace(/^scene\\//,""),message:String(A&&A.message||A),line:I&&u?u+ +I[1]-3:u||0})}}function c(s,o){let f=(u,S)=>{try{return oe(u,s,L,x)}catch(A){return w.push({scene:s.id,message:A.message,line:0,el:S.tagName}),NaN}};for(let u of s.el.querySelectorAll("[data-seq]")){let S=String(u.dataset.seq).match(/^\\s*h(\\d+)\\s*$/);if(!S){w.push({scene:s.id,message:`data-seq="${u.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let A=[...u.children],I=+S[1],D=A.map((F,W)=>s.hits[I+W]).filter(F=>F!==void 0);D.length<A.length&&w.push({scene:s.id,message:`data-seq has ${A.length} items but only ${D.length} hits from h${I}`}),o.seq(A,D,u.dataset.seqEnd?f(u.dataset.seqEnd,u):s.t1+(s.tail||0))}for(let u of s.el.querySelectorAll("[data-in], [data-out]")){let S=u.dataset.each!==void 0?+u.dataset.each*L:null,A=S!==null?[...u.children]:[u],I=u.dataset.in!==void 0?f(u.dataset.in,u):null,D=u.dataset.out!==void 0?f(u.dataset.out,u):null,F=(u.dataset.fx||"cut").toLowerCase(),W=(u.dataset.fxOut||"cut").toLowerCase(),G=+u.dataset.dist||24,y=u.dataset.dur!==void 0?+u.dataset.dur*L:x/2;A.forEach((E,B)=>{let N=I===null?null:I+(S||0)*B,J=[];if(N!==null&&!isNaN(N))if(F==="type")q.type([E],N,+u.dataset.cps||30);else if(F==="fade")J.push([N,{o:0}],[N+y,{o:1},"out"]);else if(F==="pop")J.push([N-.01,{o:0,s:.92}],[N,{o:1},"step"],[N+.25,{s:1},"back"]);else if(F==="zoom")J.push([N-.01,{o:0,s:1.35}],[N,{o:1},"step"],[N+y,{s:1},"expo"]);else if(F==="blur")J.push([N,{o:0,b:16}],[N+y,{o:1,b:0},"out"]);else if(F==="wipe")J.push([N-.01,{o:0,ct:-50,cr:100,cb:-50,cl:-50}],[N,{o:1},"step"],[N+y,{cr:0},"expo"],[N+y+.001,{cr:-50},"step"]);else if(/^(up|down|left|right)$/.test(F)){let de={up:{y:G},down:{y:-G},left:{x:G},right:{x:-G}}[F];J.push([N-.01,{o:0,...de}],[N,{o:1},"step"],[N+.18,{x:0,y:0},"out"])}else J.push([N-.01,{o:0}],[N,{o:1},"step"]);D!==null&&!isNaN(D)&&(W==="fade"?(J.length||J.push([s.t0,{o:1}]),J.push([D,{o:1}],[D+y,{o:0},"in"])):q.S([E],-1e9,D)),J.length&&q.K([E],J)})}}if($.forEach((s,o)=>{let f=i[s.id],u={...f,t0:f.t0v,dur:f.t1-f.t0v,tail:R[o]},S=V(u,f.el);c(u,S),n(s.js,S,`scene/${s.id}`,s.line)}),n(l.stage.js,V({id:"stage",t0:0,t1:l.length,hits:[],el:j},j),"stage",l.stage.line),l.captions&&l.captions.length){let s=a.createElement("div"),o=l.captionStyle||{};s.className="fvs-captions",s.dataset.position=o.position==="top"?"top":"bottom",s.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[o.size]||.045))}px`,j.append(s);let f=/<\\/?[a-z][^>]*>/gi,u="";q.H(S=>{let A=S-le,I=l.captions.filter(F=>A>=F.t0-1e-6&&A<F.t1-1e-6&&F.text),D=I.map(F=>`${F.t0}\\0${F.text}`).join("");D!==u&&(u=D,s.replaceChildren(...I.map(F=>{let W=a.createElement("div");return W.className="fvs-caption",W.textContent=F.text.replace(f,""),W})))})}let h=[...j.querySelectorAll("[data-fvs-flash]")];h.length&&(d.sort((s,o)=>s[0]-o[0]),q.H(s=>{let o=0;for(let[f,u]of d)s>=f&&s<f+.18&&(o=Math.max(o,u*(1-(s-f)/.18)**2));for(let f of h)f.style.opacity=o}));let m=ae([...$.map((s,o)=>({id:s.id,el:i[s.id].el,from:s.t0,to:s.t1+R[o],base:i[s.id].t0v})),{id:"stage",el:{querySelectorAll:s=>[...j.querySelectorAll(s)].filter(o=>!H.contains(o))},from:-1/0,to:1/0,base:0}],{mode:r,assets:l.assets,errors:w,onError:b});return{root:j,errors:w,scenes:i,seek:s=>{let o=s+le;return q.render(o),m?m.seek(o):void 0},payload:l,videos:m,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:s=>{m&&m.transport(s)},ready:()=>m?m.ready():Promise.resolve(),destroy(){m&&m.destroy(),j.remove(),C.remove()}}}var Ae=e=>e.trim().replace(/^\\.\\//,"");var Me=e=>({id:e.id,kind:"track",src:e.src,url:e.url??e.src,at:+e.at||0,in:+e.in||0,dur:e.dur>0?+e.dur:null,gain:+e.gain||0,mute:!!e.mute,role:e.role}),Le=(e,t={})=>({id:e.id,kind:"video",scene:e.scene,src:e.src,url:e.url??t[Ae(e.src)]??e.src,at:+e.at||0,in:+e.in||0,dur:e.dur>0?+e.dur:null,gain:+e.gain||0,mute:!1,loop:!!e.loop});var ue=e=>e?[...(e.audio||[]).map(Me),...(e.media||[]).map(t=>Le(t,e.assets))]:[];var Ne=`\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\n.fvs-bar{display:flex;gap:10px;align-items:center}\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\n`,fe=e=>`${Math.floor(e/60)}:${(e%60).toFixed(1).padStart(4,"0")}`;function je(){let e=document.getElementById("fvs-data");return JSON.parse(e.textContent)}function Oe(e,t,a,g){let r=!1,b=0,l=0,w=0,v=null,x=null,M=null,L=()=>r&&!w?Math.min(a,b+(performance.now()-l)/1e3):b,C=p=>{let O=L();for(let $ of t){let{el:T}=$,R=T.duration,z=$.loop&&R>0&&Number.isFinite(R);if($.loop&&!z)continue;let _=O-$.at+$.in;z&&(_=(_%R+R)%R);let P=$.dur!=null&&O>=$.at+$.dur;if(!r||O<$.at||P||_>(R||1/0)){T.paused||T.pause(),O<$.at&&!T.seeking&&Math.abs(T.currentTime-$.in)>.08&&(T.currentTime=$.in);continue}let V=Math.abs(T.currentTime-_);(p||T.paused&&(z?Math.min(V,R-V):V)>.08)&&(T.currentTime=_),T.paused&&T.play().catch(()=>{})}},j=.05,H=.1,U=.5,q=p=>!p.loop&&!p.el.paused&&!p.el.seeking&&!p.el.ended&&p.el.readyState>2,d=p=>p.at+p.el.currentTime-p.in,i=()=>{let p=performance.now();if(w){let R=t.find(P=>!P.loop&&!P.el.paused&&!P.el.error),z=R&&q(R)?R.el.currentTime:null;(z===null||v===null||z<=v)&&(x=z),v=z;let _=z!==null&&x!==null&&z-x>j;if(R&&!_&&p<w)return;w=0,_&&(b=d(R)),l=p,M=_?{a:R,at:z,off:0}:null;return}if(!M||!q(M.a)){let R=t.find(q);M=R?{a:R,at:R.el.currentTime,off:null}:null;return}let O=M.a.el.currentTime,$=O>M.at;if(M.at=O,!$)return;let T=d(M.a)-L();M.off===null&&(M.off=Math.abs(T)<U?T:0),Math.abs(T-M.off)>H&&(b=d(M.a)-M.off,l=p)};return{now:L,sync:C,get playing(){return r},play(){b>=a&&(b=0),r=!0,l=performance.now(),w=l+1e3,v=null,C(!0)},pause(){b=L(),r=!1,C()},seek(p){b=Math.max(0,Math.min(a,p)),l=performance.now(),w=r?l+1e3:0,v=null,C(!0)},tick(){r&&i(),r&&L()>=a?(b=a,r=!1,C(),g&&g()):r&&C()}}}function Ce(e,t,a){let g=()=>{e.root.style.transform=`scale(${t.clientWidth/a.width})`};new ResizeObserver(g).observe(t),g()}function Re(e){let t=document.createElement("style");t.textContent=Ne,document.head.append(t);let a=document.createElement("main");a.className="fvs-app",a.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\u25B6 \\u64AD\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\u8FDB\\u5EA6"><output></output></div>\n    <ol class="fvs-chapters" aria-label="\\u7AE0\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(a),a.querySelector("h1").textContent=e.title||"";let g=a.querySelector(".fvs-frame");g.style.aspectRatio=`${e.width} / ${e.height}`,g.style.maxWidth=`calc((100vh - 200px) * ${e.width/e.height})`,g.style.margin="0 auto",g.setAttribute("aria-label",e.title||"video");let r=ee(e,g);Ce(r,g,e);let b=ue(e).filter(i=>!i.mute).map(i=>{let p=new Audio(i.url);return p.preload="auto",p.loop=!!i.loop,p.volume=Math.min(1,10**((i.gain||0)/20)),{el:p,at:i.at,in:i.in,dur:i.dur,loop:!!i.loop}}),l=a.querySelector(".fvs-play"),w=a.querySelector("input"),v=a.querySelector("output");w.max=e.length;let x=Oe(e,b,e.length),M=a.querySelector(".fvs-chapters");M.innerHTML=e.scenes.map(i=>`<li><button type="button" data-t="${i.t0}"><b>${i.t0.toFixed(1)}</b></button></li>`).join(""),[...M.querySelectorAll("button")].forEach((i,p)=>i.append(e.scenes[p].title||e.scenes[p].id));let L=[...M.querySelectorAll("button")];if(r.errors.length){let i=a.querySelector(".fvs-err");i.hidden=!1,i.textContent=r.errors.map(p=>`${p.scene}${p.line?`:${p.line}`:""} ${p.message}`).join(`\n`)}let C=()=>x.playing?x.pause():x.play();l.addEventListener("click",C),g.addEventListener("click",C),w.addEventListener("input",()=>x.seek(+w.value)),L.forEach(i=>i.addEventListener("click",()=>{x.seek(+i.dataset.t),x.playing||x.play()})),document.addEventListener("keydown",i=>{i.target.closest&&i.target.closest("input,button,textarea")||(i.code==="Space"&&(i.preventDefault(),C()),i.code==="ArrowRight"&&x.seek(x.now()+2),i.code==="ArrowLeft"&&x.seek(x.now()-2))});let j=-1,H=null,U=e.scenes.length?Math.min(e.length,e.scenes[Math.min(1,e.scenes.length-1)].t0+.8):0,q=!1,d=()=>{x.tick();let i=q||x.playing?x.now():U;x.playing&&(q=!0),x.playing!==H&&(H=x.playing,r.transport(H)),i!==j&&(r.seek(i),j=i),w.value=i,v.textContent=`${fe(i)} / ${fe(e.length)}`,l.textContent=x.playing?"\\u275A\\u275A \\u6682\\u505C":"\\u25B6 \\u64AD\\u653E",L.forEach((p,O)=>p.classList.toggle("on",i>=e.scenes[O].t0&&i<e.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{q=!0}),requestAnimationFrame(d),window.__fvs={stage:r,clock:x}}function qe(e){document.documentElement.style.background="#000",document.body.style.margin="0";let t=ee(e,document.body,{media:"capture"});t.root.style.transform="none",t.seek(0),window.__stage={w:e.width,h:e.height,dur:e.length,fps:e.fps,errors:t.errors,audio:e.audio,media:e.media||[],seek:a=>t.seek(a),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(a=>a.complete?0:a.decode().catch(()=>0)),t.ready()]))}}var Fe=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _e(e){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let t=document.createElement("div");t.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${e.width}/${e.height};width:min(100vw, calc(100vh * ${e.width/e.height}))`,document.body.append(t);let a={},g=new WeakMap,r=new WeakMap,b=new WeakMap,l=d=>{let i=[],p=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let $;$=O.nextNode();){if(!/\\S/.test($.data)||$.parentElement&&Fe.test($.parentElement.tagName))continue;g.set($,i.length);let T=$.parentElement;r.has(T)||r.set(T,[]),r.get(T).push(i.length),i.push({node:$,el:T})}p.forEach(($,T)=>b.set($,T)),a[d.id]={texts:i,imgs:p}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),v=ee(e,t,{onScene:l,onMediaError:(d,i)=>w({type:"media-error",scene:d,src:i})}),x=()=>{v.root.style.transform=`scale(${t.clientWidth/e.width})`};new ResizeObserver(x).observe(t),x();let M=0;v.seek(0);let L=document.createElement("div");L.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",t.append(L);let C=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),j=d=>{if(!d){L.style.display="none";return}let i=t.getBoundingClientRect();Object.assign(L.style,{display:"",left:`${d.x-i.left-3}px`,top:`${d.y-i.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},H=d=>{let i=d&&d.closest&&d.closest("[data-scene]");return i?i.dataset.scene:null};function U(d,i){let p=document.elementFromPoint(d.clientX,d.clientY),O=H(p);if(!O||!a[O]){w({type:"pick",scene:null,dbl:i});return}if(p.tagName==="IMG"&&b.has(p)){w({type:"pick",scene:O,img:b.get(p),rect:C(p.getBoundingClientRect()),dbl:i});return}let $=null,T=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);T&&T.startContainer.nodeType===3&&g.has(T.startContainer)&&($=g.get(T.startContainer));for(let _=p;$===null&&_&&_!==t;_=_.parentElement)r.has(_)&&($=r.get(_)[0]);if($===null){w({type:"pick",scene:O,dbl:i});return}let R=a[O].texts[$],z=R.node.isConnected?(()=>{let _=document.createRange();return _.selectNodeContents(R.node),_.getBoundingClientRect()})():R.el.getBoundingClientRect();w({type:"pick",scene:O,text:$,rect:C(z.width?z:R.el.getBoundingClientRect()),dbl:i})}t.addEventListener("click",d=>U(d,!1)),t.addEventListener("dblclick",d=>{d.preventDefault(),U(d,!0)}),window.addEventListener("message",d=>{let i=d.data||{};if(i.fvs==="seek")M=i.t,v.seek(i.t);else if(i.fvs==="transport")v.transport(!!i.playing);else if(i.fvs==="outline"){let p=a[i.scene],O=p?i.img!=null?p.imgs[i.img]:i.text!=null&&p.texts[i.text]?p.texts[i.text].el:null:null;j(O&&O.isConnected&&O.getClientRects().length?C(O.getBoundingClientRect()):null)}});let q=d=>Object.fromEntries(Object.entries(a).map(([i,p])=>[i,p[d].length]));w({type:"ready",length:e.length,errors:v.errors,texts:q("texts"),imgs:q("imgs")}),window.__fvs={stage:v,seek:d=>v.seek(d)}}function Ie(e){let t=je(),a=typeof window<"u"&&window.FVS_MODE||e||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");a==="capture"?qe(t):a==="embed"?_e(t):Re(t)}return ye(He);})();\n';

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

// src/lib/review.js
var HYPERFRAMES_VERSION = "0.8.190";
var NOT_OURS = /* @__PURE__ */ new Set(["film_silent"]);
var MAX_TIMES = 60;
function reviewTimes(p) {
  const mids = p.scenes.map((s) => (s.t0 + s.t1) / 2);
  const hits = p.scenes.flatMap((s) => visibleHits(s).map((h) => Math.min(h.t + 0.3, s.t1 - 0.05)).filter((t) => t > s.t0));
  const keep = Math.max(0, MAX_TIMES - mids.length);
  const picked = hits.length <= keep ? hits : Array.from({ length: keep }, (_, i) => hits[Math.floor(i * hits.length / keep)]);
  const out = mids.filter((t) => t >= 0 && t < p.length);
  for (const t of picked) if (t >= 0 && t < p.length && out.every((u) => Math.abs(t - u) >= 0.2)) out.push(t);
  return [...new Set(out.map((t) => +t.toFixed(3)))].sort((a, b) => a - b);
}
var FILL = 0.9;
function footageTimes(p) {
  return p.scenes.filter((s) => videos(s.html).some((v) => v.src)).map((s) => +((s.t0 + s.t1) / 2).toFixed(3));
}
function footageOnScreen(width) {
  const stage = document.querySelector(".fvs-stage")?.getBoundingClientRect();
  if (!stage || !stage.width) return null;
  const shown = [...document.querySelectorAll(".fvs-stage video")].filter((v) => !v.closest("[data-layout-ignore]") && v.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }));
  if (!shown.length) return null;
  const k = width / stage.width, root = document.querySelector(".fvs-stage");
  const pics = shown.map((v) => {
    let { left: l, top: t, width: w, height: h } = v.getBoundingClientRect();
    const fit = getComputedStyle(v).objectFit, vw = v.videoWidth, vh = v.videoHeight;
    if (fit !== "fill" && fit !== "cover" && vw && vh) {
      const contain = Math.min(w / vw, h / vh), own = v.offsetWidth ? w / v.offsetWidth : 1;
      const s = fit === "none" ? own : fit === "scale-down" ? Math.min(contain, own) : contain;
      l += (w - vw * s) / 2;
      t += (h - vh * s) / 2;
      w = vw * s;
      h = vh * s;
    }
    let r = l + w, b = t + h;
    for (let a = v.parentElement; a && a !== root; a = a.parentElement) {
      if (getComputedStyle(a).overflow === "visible") continue;
      const c = a.getBoundingClientRect();
      l = Math.max(l, c.left);
      t = Math.max(t, c.top);
      r = Math.min(r, c.right);
      b = Math.min(b, c.bottom);
    }
    return { src: v.getAttribute("src") || "", l, t, r, b, w: Math.max(0, Math.round((r - l) * k)), h: Math.max(0, Math.round((b - t) * k)) };
  });
  let hit = 0;
  for (let i = 0; i < 64; i++) for (let j = 0; j < 36; j++) {
    const x = stage.left + (i + 0.5) * stage.width / 64, y = stage.top + (j + 0.5) * stage.height / 36;
    if (pics.some((q) => x >= q.l && x < q.r && y >= q.t && y < q.b)) hit++;
  }
  return { share: hit / (64 * 36), frame: [Math.round(stage.width * k), Math.round(stage.height * k)], shots: pics.map(({ src, w, h }) => ({ src, w, h })) };
}
function footageFindings(seen) {
  return seen.filter((m) => m && m.share < FILL).map((m) => ({
    code: "footage_not_filling",
    severity: m.share < 0.5 ? "error" : "warning",
    time: m.t,
    selector: m.shots.map((s) => `video[src="${s.src}"]`).join(", "),
    message: `The footage covers ${Math.round(m.share * 100)}% of the frame: ${m.shots.map((s) => `${s.src || "a video"} at ${s.w}\xD7${s.h}`).join(", ")} in ${m.frame[0]}\xD7${m.frame[1]}; the rest is the stage background.`,
    fixHint: "size every shot to the frame in the project css, before the first scene (a scene's own css block applies inside that scene only): video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }. A deliberate inset (picture in picture, a framed screen recording): data-layout-ignore on the video."
  }));
}
function flatten(report2) {
  const out = [];
  for (const section of ["lint", "runtime", "layout", "motion", "contrast", "craft", "footage"]) {
    for (const f of report2?.[section]?.findings || []) out.push({ ...f, section });
  }
  return out;
}
function groupFindings(p, report2, { all = false } = {}) {
  const film = { id: "film", title: "", t0: 0, t1: p.length, findings: [] };
  const scenes = p.scenes.map((s) => ({ id: s.id, title: s.title || "", t0: s.t0, t1: s.t1, findings: [] }));
  const counts = { error: 0, warning: 0, info: 0 };
  for (const f of flatten(report2)) {
    if (NOT_OURS.has(f.code)) continue;
    const severity = f.severity === "error" ? "error" : f.severity === "warning" ? "warning" : "info";
    counts[severity]++;
    if (severity === "info" && !all) continue;
    const t = Number.isFinite(f.time) && f.section !== "lint" ? f.time : null;
    const home = t == null ? film : scenes.find((s) => t >= s.t0 && t < s.t1) || scenes[scenes.length - 1] || film;
    home.findings.push({ t, severity, code: f.code, section: f.section, selector: (f.selector || "").replace(/^div\.fvs-scenes > div:nth-of-type\(\d+\) > /, ""), text: f.text || "", message: f.message || "", fix: f.fixHint || "" });
  }
  for (const s of [film, ...scenes]) s.findings.sort((a, b) => (a.t ?? -1) - (b.t ?? -1));
  return { scenes: [film, ...scenes].filter((s) => s.findings.length), counts };
}
function formatReview({ scenes, counts }, { times = 0 } = {}) {
  const lines = [];
  for (const s of scenes) {
    lines.push(s.id === "film" ? "whole film" : `${s.id}${s.title ? ` \xB7 ${s.title}` : ""} \xB7 ${s.t0.toFixed(2)}\u2013${s.t1.toFixed(2)} s`);
    for (const f of s.findings) {
      const what = [f.selector, f.text && !f.message.includes(f.text) ? `"${f.text.slice(0, 60)}"` : ""].filter(Boolean).join(" ");
      lines.push(`  ${f.severity.padEnd(7)} ${f.t == null ? "" : `${f.t.toFixed(2)} s `}${f.code}${what ? ` \xB7 ${what}` : ""}`);
      lines.push(`          ${f.message}`);
      if (f.fix && f.severity !== "info") lines.push(`          fix: ${f.fix}`);
    }
  }
  lines.push(`${counts.error} error(s), ${counts.warning} warning(s), ${counts.info} note(s) at ${times} moments. Advice, not a gate: a finding can be a deliberate choice (mark it, see the skill).`);
  return lines.join("\n");
}

// src/cli/fvs.js
var VERSION = "0.7.0";
var HELP = `fvs ${VERSION} \u2014 Forsion Video Studio

  fvs new <file.fvs.md> [--template eva|blank] [--title T]   start a project
  fvs info <file>                      scenes, times, hits (read this before editing)
  fvs check <file> [--runtime]         parse errors; --runtime also runs every scene script in a browser
  fvs review <file> [--at t,t\u2026] [--all] [--json]   what the frames look like: text hidden, overlapping, off frame,
                                       low contrast, too short to read (HyperFrames checks, via npx; advice, not a gate)
  fvs cues <file> [--out cues.json]    the cue sheet a score is written against (JSON)
  fvs captions <file> [--out f.srt]    the captions track as a SubRip file
  fvs html <file> [--out f.html] [--inline]   standalone web video (player page)
  fvs still <file> --at <t|scene[:hit]> [--out f.png] [--scale 0.5]   one frame as PNG
  fvs sheet <file> [--scenes | --every <sec>] [--out sheet.png]       contact sheet of frames
  fvs frames <media\u2026> [--every 2] [--from s] [--to s] [--out dir]    a contact sheet per footage file, each
                                       frame labelled with its time in the file (pick in-points from it)
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
async function chromium({ need = true } = {}) {
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
  if (!pw) {
    if (!need) return null;
    die("This command needs a browser driver. Install one:  npm i -g playwright-core   (or run inside a folder with playwright installed)");
  }
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
  if (!need) return null;
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
async function contactSheet(browser, shots, labels, out) {
  const cols = Math.min(6, Math.ceil(Math.sqrt(shots.length * 1.4)));
  const sheet = await browser.newPage({ viewport: { width: cols * 332 + 12, height: 400 } });
  await sheet.setContent(`<body style="margin:0;background:#111;color:#bbb;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},320px);gap:12px;padding:12px">${shots.map((b, i) => `<figure style="margin:0"><img style="display:block;width:320px" src="data:image/jpeg;base64,${b}"><figcaption style="padding-top:4px">${labels[i]}</figcaption></figure>`).join("")}</div></body>`);
  await sheet.screenshot({ path: out, fullPage: true });
  await sheet.close();
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
async function footageCheck(ctx, times) {
  if (!times.length) return [];
  const browser = await chromium({ need: false });
  if (!browser) {
    console.error("warn  not checked whether the footage fills the frame: that needs playwright-core and a Chromium, like `sheet`");
    return [];
  }
  let stage = null;
  try {
    stage = await openStage(ctx, browser, { scale: 0.25, captions: false });
    const named = Object.fromEntries(Object.entries(stage.payload.assets).map(([rel, url]) => [url, rel]));
    const seen = [];
    for (const t of times) {
      await stage.pg.evaluate((x) => __stage.seek(x), t);
      const m = await stage.pg.evaluate(footageOnScreen, ctx.p.meta.width);
      if (m) seen.push({ ...m, t, shots: m.shots.map((s) => ({ ...s, src: named[s.src] || s.src })) });
    }
    return footageFindings(seen);
  } catch (e) {
    console.error(`warn  not checked whether the footage fills the frame: ${String(e?.message || e).split("\n")[0]}`);
    return [];
  } finally {
    await browser.close();
    if (stage) rmSync2(stage.tmp, { recursive: true, force: true });
  }
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
  async review() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const { p, dir } = ctx;
    const times = flags.at ? String(flags.at).split(",").map((v) => timeArg(p, v.trim())).filter((t) => t != null && t >= 0 && t < p.length) : reviewTimes(p);
    if (!times.length) die("nothing to look at (no scenes, or --at is outside the film)");
    const tmp = mkdtempSync2(join2(tmpdir2(), "fvs-review-"));
    try {
      const payload = compile(p);
      const outside = [], linked = /* @__PURE__ */ new Set(), OWN = /* @__PURE__ */ new Set(["index.html", "fvs-runtime.js", ".hyperframes"]);
      for (const ref of Object.keys(payload.assets)) {
        const rel = ref.replace(/\\/g, "/"), parts = rel.split("/"), top = parts[0];
        if (parts.includes("..") || /^[a-z]:$/i.test(top) || !top || OWN.has(top)) {
          outside.push(ref);
          continue;
        }
        const from = join2(dir, top), to = join2(tmp, top);
        if (linked.has(top) || !existsSync2(from)) continue;
        linked.add(top);
        const folder = statSync2(from).isDirectory();
        if (folder && parts.length > 1) symlinkSync(from, to, "junction");
        else if (!folder && parts.length === 1) copyFileSync(from, to);
      }
      writeFileSync2(join2(tmp, "fvs-runtime.js"), runtime_src_default, { flag: "wx" });
      writeFileSync2(join2(tmp, "index.html"), buildHtml(payload, runtime_src_default, { mode: "hf", runtimeUrl: "fvs-runtime.js" }), { flag: "wx" });
      const own = process.env.FVS_HYPERFRAMES;
      const npxCli = [join2(dirname2(process.execPath), "node_modules/npm/bin/npx-cli.js"), join2(dirname2(process.execPath), "../lib/node_modules/npm/bin/npx-cli.js")].find((f) => existsSync2(f));
      const args = [...own ? [own] : npxCli ? [npxCli, "--yes", `hyperframes@${HYPERFRAMES_VERSION}`] : ["--yes", `hyperframes@${HYPERFRAMES_VERSION}`], "check", tmp, "--json", "--at", times.join(",")];
      if (!own && !npxCli && platform() === "win32") die("npx was not found next to this Node; set FVS_HYPERFRAMES to the hyperframes CLI script");
      const r = spawnSync2(own || npxCli ? process.execPath : "npx", args, { encoding: "utf8", maxBuffer: 256 << 20, env: { ...process.env, DO_NOT_TRACK: "1", HYPERFRAMES_NO_TELEMETRY: "1" } });
      let hf = null;
      try {
        hf = JSON.parse(r.stdout);
      } catch {
      }
      if (!hf || hf.error || !["lint", "layout"].every((k) => hf[k])) die(`HyperFrames did not run (${hf?.error || (r.error ? r.error.message : `exit ${r.status}`)}). It needs Node with npx and, the first time, the network (~330 MB: the package and a Chrome).
${String(r.stderr || "").trim().split("\n").slice(-6).join("\n")}`);
      if (hf.browserSkipped) console.error("warn  HyperFrames looked at the page source only (its lint stopped the browser pass); the findings below are not about frames");
      const footage = await footageCheck(ctx, flags.at ? times : footageTimes(p));
      const grouped = groupFindings(p, { ...hf, footage: { findings: footage } }, { all: !!flags.all });
      if (outside.length) console.error(`warn  not reviewed with their assets (outside the project folder): ${outside.join(", ")}`);
      if (flags.json) log(JSON.stringify({ hyperframes: HYPERFRAMES_VERSION, times, ...grouped }, null, 2));
      else log(formatReview(grouped, { times: times.length }));
    } finally {
      for (const name of readdirSync(tmp)) {
        const at = join2(tmp, name);
        try {
          if (lstatSync(at).isSymbolicLink()) unlinkSync(at);
        } catch {
        }
      }
      rmSync2(tmp, { recursive: true, force: true });
    }
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
    const out = resolve2(flags.out || `${ctx.path.replace(/\.fvs\.md$/i, "")}-sheet.png`);
    await contactSheet(browser, shots, labels, out);
    await browser.close();
    log(out);
  },
  async frames() {
    if (!pos.length) die("which footage? (fvs frames <media\u2026> [--every 2])");
    const ff = ffmpegBin(), every = flags.every === void 0 ? 2 : +flags.every, dir = resolve2(flags.out || join2(tmpdir2(), "fvs-frames"));
    if (!(every > 0)) die("--every takes a number of seconds above 0");
    mkdirSync2(dir, { recursive: true });
    const browser = await chromium();
    try {
      for (const file of pos) {
        const src = resolve2(file);
        if (!existsSync2(src)) die(`no such file: ${src}`);
        const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(spawnSync2(ff, ["-hide_banner", "-i", src], { encoding: "utf8" }).stderr || "");
        const length = m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : +flags.to;
        if (!(length > 0)) die(`ffmpeg reads no duration from ${src}; pass --to <seconds>`);
        const from = flags.from === void 0 ? 0 : +flags.from, to = Math.min(length, flags.to === void 0 ? length : +flags.to);
        if (!(from >= 0 && to > from)) die(`nothing to show between ${flags.from ?? 0} and ${flags.to ?? "the end"} s of ${basename(src)} (${length.toFixed(1)} s long)`);
        const step = (to - from) / every > 24 ? Math.ceil((to - from) / 12) / 2 : every;
        const times = [], shots = [];
        for (let t = from; t < to - 0.04 || !shots.length && t < to + step; t += step) {
          const r = spawnSync2(ff, ["-v", "error", "-ss", String(+t.toFixed(2)), "-i", src, "-frames:v", "1", "-vf", "scale=320:-2", "-q:v", "4", "-f", "image2pipe", "-c:v", "mjpeg", "-"], { maxBuffer: 16 << 20 });
          if (r.status === 0 && r.stdout.length) {
            times.push(+t.toFixed(2));
            shots.push(r.stdout.toString("base64"));
          }
        }
        if (!shots.length) die(`ffmpeg could not read a frame of ${src} between ${from} and ${to} s`);
        const out = join2(dir, `${basename(src).replace(/\./g, "-")}-frames.png`);
        await contactSheet(browser, shots, times.map((t) => `${basename(src)} \xB7 ${t} s`), out);
        log(`${out}
  ${basename(src)} \xB7 ${length.toFixed(1)} s \xB7 a frame every ${+step.toFixed(2)} s at: ${times.join(" ")}`);
      }
    } finally {
      await browser.close();
    }
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
