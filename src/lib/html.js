// Surgical edits to a scene's HTML without a DOM: find its text runs and start tags with their offsets,
// then change only those characters. The runtime numbers text nodes the same way (non-blank text,
// document order, nothing inside script/style/textarea/title), so a click in the preview maps to a run here.

const RAW = /^(script|style|textarea|title)$/i;
const VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', hellip: '…', middot: '·', copy: '©', reg: '®', trade: '™', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', times: '×', larr: '←', rarr: '→', uarr: '↑', darr: '↓', bull: '•' };

export const decode = s => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, k) => {
  if (k[0] === '#') { const c = k[1] === 'x' || k[1] === 'X' ? parseInt(k.slice(2), 16) : +k.slice(1); try { return String.fromCodePoint(c); } catch { return m; } }
  return ENT[k.toLowerCase()] ?? m;
});
export const escapeText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const escapeAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** End of the tag that starts at `i` (index just past '>'), honouring quoted attribute values. */
function tagEnd(html, i) {
  let q = null;
  for (let k = i + 1; k < html.length; k++) {
    const c = html[k];
    if (q) { if (c === q) q = null; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '>') return k + 1;
  }
  return html.length;
}

const ATTR = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

/** Walk the markup once: text runs (non-blank) and start tags, both with offsets. */
export function scan(html) {
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
    if (html[i] !== '<') { i++; continue; }
    if (html.startsWith('<!--', i)) { pushText(textStart, i); const e = html.indexOf('-->', i + 4); i = e < 0 ? n : e + 3; textStart = i; continue; }
    const m = /^<(\/?)([A-Za-z][\w:-]*)/.exec(html.slice(i, i + 80));
    if (!m) { if (html[i + 1] === '!' || html[i + 1] === '?') { pushText(textStart, i); i = tagEnd(html, i); textStart = i; } else i++; continue; }
    pushText(textStart, i);
    const end = tagEnd(html, i), name = m[2].toLowerCase();
    if (m[1]) {
      for (let k = stack.length - 1; k >= 0; k--) if (tags[stack[k]].name === name) { stack.length = k; break; }
      i = end; textStart = i; continue;
    }
    const body = html.slice(i + 1 + m[2].length, end - 1);
    const attrs = [];
    const selfClose = /\/\s*$/.test(body);
    ATTR.lastIndex = 0;
    let a;
    while ((a = ATTR.exec(body))) {
      if (a[1] === '/') continue;
      const off = i + 1 + m[2].length + a.index;
      const v = a[2] ?? a[3] ?? a[4];
      attrs.push({ name: a[1].toLowerCase(), value: v === undefined ? '' : decode(v), start: off, end: off + a[0].length });
    }
    const tag = { index: tags.length, name, start: i, end, attrs, parent: stack.length ? stack[stack.length - 1] : -1, attr: k => (attrs.find(x => x.name === k) || {}).value };
    tags.push(tag);
    i = end; textStart = i;
    if (RAW.test(name) && !selfClose) {
      const close = html.toLowerCase().indexOf(`</${name}`, i);
      i = close < 0 ? n : close; textStart = i;
      continue;
    }
    if (!VOID.test(name) && !selfClose) stack.push(tag.index);
  }
  pushText(textStart, n);
  return { texts, tags };
}

export const textRuns = html => scan(html).texts;

/** Replace text run `index`, keeping the whitespace around it. */
export function replaceText(html, index, value) {
  const t = scan(html).texts[index];
  if (!t) throw new Error(`no text #${index}`);
  const lead = t.raw.match(/^\s*/)[0], trail = t.raw.match(/\s*$/)[0];
  return html.slice(0, t.start) + lead + escapeText(String(value).trim()) + trail + html.slice(t.end);
}

/** Set (or with null remove) an attribute on start tag `index`. */
export function setAttr(html, index, name, value) {
  const tag = scan(html).tags[index];
  if (!tag) throw new Error(`no tag #${index}`);
  const a = tag.attrs.find(x => x.name === name.toLowerCase());
  if (value === null || value === undefined) {
    if (!a) return html;
    let s = a.start; while (s > tag.start && /\s/.test(html[s - 1])) s--;
    return html.slice(0, s) + html.slice(a.end);
  }
  const piece = `${name}="${escapeAttr(value)}"`;
  if (a) return html.slice(0, a.start) + piece + html.slice(a.end);
  let at = tag.end - 1; if (html[at - 1] === '/') at--;
  while (at > tag.start && /\s/.test(html[at - 1])) at--;
  return html.slice(0, at) + ' ' + piece + html.slice(at);
}

/** Images in source order: { tag, src }. */
export const images = html => scan(html).tags.filter(t => t.name === 'img').map(t => ({ tag: t.index, src: t.attr('src') || '' }));

const num = (v, d) => { const x = parseFloat(v); return Number.isFinite(x) ? x : d; };

/**
 * Videos in source order, numbered like images() so setAttr(html, tag, …) edits them:
 * { tag, src, clipIn, gain, muted, loop }. `src` falls back to the first <source src> inside the element;
 * clipIn (data-clip-in, s) is the file time at the scene's content start, gain (data-gain) is in dB,
 * muted means the clip adds nothing to the mix, loop wraps the file time.
 */
export function videos(html) {
  const { tags } = scan(html);
  const lower = html.toLowerCase();
  return tags.filter(t => t.name === 'video').map(t => {
    const selfClosed = html[t.end - 2] === '/';
    const close = selfClosed ? -1 : lower.indexOf('</video', t.end);
    const end = close < 0 ? t.end : close;
    const source = tags.find(x => x.name === 'source' && x.start >= t.end && x.start < end && x.attr('src'));
    const has = k => t.attrs.some(a => a.name === k);
    return {
      tag: t.index, src: t.attr('src') || (source ? source.attr('src') : '') || '',
      clipIn: Math.max(0, num(t.attr('data-clip-in'), 0)), gain: num(t.attr('data-gain'), 0), muted: has('muted'), loop: has('loop'),
    };
  });
}

/**
 * Elements with declarative timing. `text` is the first text inside the element ('' when it has none), `label` a
 * short name for it: that text, else the file of a picture or a clip, else the tag.
 * A data-seq container also lists its children as `items` ({ tag, name, label, text }): what it shows one after another.
 */
export function timedElements(html) {
  const { texts, tags } = scan(html);
  const within = (i, root) => { for (; i >= 0; i = tags[i].parent) if (i === root) return true; return false; };
  const named = t => {
    const x = texts.find(r => r.start > t.start && within(r.tag, t.index)), text = x ? x.text.trim() : '', src = t.attr('src');
    return { tag: t.index, name: t.name, text, label: text ? text.slice(0, 40).trim() : src ? src.split('/').pop() : `<${t.name}>` };
  };
  return tags.filter(t => ['data-in', 'data-out', 'data-seq'].some(k => t.attr(k) !== undefined)).map(t => ({
    ...named(t), in: t.attr('data-in'), out: t.attr('data-out'), fx: t.attr('data-fx'), seq: t.attr('data-seq'), each: t.attr('data-each'),
    fxOut: t.attr('data-fx-out'), dur: t.attr('data-dur'), seqEnd: t.attr('data-seq-end'),
    // the children a data-seq or a data-each times one by one
    ...(t.attr('data-seq') !== undefined || t.attr('data-each') !== undefined ? { items: tags.filter(c => c.parent === t.index).map(named) } : {}),
  }));
}

/**
 * When each timed element of a scene is on screen, the way the runtime plays it (player.js, declarative()): one
 * entry per element that gets a block on the timeline, [{ tag, name, text, label, a, b, of?, n?, error? }], in
 * document order.
 *   - a data-seq container is its children, one per hit from hK, the last one to data-seq-end or the scene's end.
 *     A child past the last hit is never scheduled: it stays on screen, and is an error;
 *   - data-in with data-each is the children too, each one `each` after the one before;
 *   - an element is on screen only while everything around it is: its own times, its turn in a sequence and those
 *     of its ancestors all hold at once. What is left may be nothing: then it has no entry.
 * sc = { s0, t1, hits }: the scene's visible start, its end and its hit times. at(expr) reads a time expression (the
 * runtime's timeExpr: it throws on one it cannot read, and the runtime then leaves that side open).
 */
export function timedSpans(html, sc, at, { unit, beat }) {
  const { tags } = scan(html);
  const win = new Map(), blocks = new Map(); // tag → the [from, to] it is limited to; tag → its entry
  const limit = (tag, a, b) => { const w = win.get(tag); win.set(tag, w ? [Math.max(w[0], a), Math.min(w[1], b)] : [a, b]); };
  const block = (c, more) => blocks.set(c.tag, { ...blocks.get(c.tag), ...c, ...more });
  for (const x of timedElements(html)) {
    let error = '';
    const read = expr => { if (expr === undefined) return null; try { return at(expr); } catch (e) { error = String(e && e.message || e); return null; } };
    if (x.seq !== undefined) {
      const m = String(x.seq).match(/^\s*h(\d+)\s*$/);
      if (!m) block(x, { error: `data-seq="${x.seq}" must name the first hit, e.g. data-seq="h0"` });
      else {
        const times = x.items.map((_, i) => sc.hits[+m[1] + i]).filter(v => v !== undefined), end = read(x.seqEnd) ?? sc.t1;
        x.items.forEach((c, i) => {
          if (i < times.length) limit(c.tag, times[i], times[i + 1] ?? end);
          block(c, { of: x, n: i + 1, ...(i < times.length ? {} : { error: `data-seq has ${x.items.length} items but only ${times.length} hits from h${+m[1]}` }) });
        });
        error = ''; // a data-seq-end that cannot be read: the sequence ends with the scene
      }
    }
    if (x.in === undefined && x.out === undefined) continue;
    const tin = read(x.in), tout = read(x.out), step = +x.each * unit;
    const gone = tout === null ? Infinity : tout + (String(x.fxOut || '').toLowerCase() === 'fade' ? (x.dur !== undefined ? +x.dur * unit : beat / 2) : 0);
    if (x.each !== undefined && tin !== null && Number.isFinite(step)) x.items.forEach((c, i) => { limit(c.tag, tin + step * i, gone); block(c, { of: x, n: i + 1 }); });
    else limit(x.tag, tin ?? -Infinity, gone);
    // the container of a sequence or of staggered children is those children; anything else is its own block
    if (error || (x.seq === undefined && !(x.each !== undefined && tin !== null && Number.isFinite(step)))) block(x, error ? { error } : {});
  }
  const out = [];
  for (const e of blocks.values()) {
    let a = sc.s0, b = sc.t1;
    for (let k = e.tag; k >= 0; k = tags[k].parent) { const w = win.get(k); if (w) { a = Math.max(a, w[0]); b = Math.min(b, w[1]); } }
    if (b > a + 1e-6) out.push({ ...e, a, b });
  }
  return out.sort((p, q) => p.tag - q.tag);
}
