// Runtime-owned <video>: the runtime decides which frame a clip shows, so a scene with footage is still a
// pure function of t. The element itself is always muted; its sound is mixed outside the page (payload.media).
//   capture  seek(t) resolves once every on-screen clip shows its exact frame (the renderer awaits it)
//   live     (preview, player page) small forward steps play natively and only drift is corrected; any other
//            seek, a paused transport or 150 ms without a seek holds the exact frame
// A clip that fails never throws or stalls a seek: it is recorded in `errors` (and reported through
// `onError(scene, src)` once) and skipped from then on. A source that cannot seek (an HTTP stream without
// range requests: `seekable` is [0, 0]) is reported the same way, so the host can hand over another URL.
// Inlined clips (base64 data: URLs) are handed to the element as blob: URLs made in this page: a page that
// inherits a media-src policy without data: (the Studio's sandboxed preview) can still play them.

const SETTLE_MS = 2000, LOAD_MS = 10000, STALL_MS = 8000, IDLE_MS = 150;
const ROLL_MAX = .3, DRIFT = .15, PREROLL = 1, EPS = 1e-3, END = 1e-3;
const REASON = ['', 'aborted', 'network error', 'decode error', 'format not supported or file missing'];

/**
 * Take over every <video> inside `scenes` ([{ id, el, from, to, base }]: element, visible window [from, to)
 * and content start). Returns null when there is none.
 */
export function ownVideos(scenes, { mode = 'live', assets = {}, errors = [], onError = null } = {}) {
  const reverse = {};
  for (const [rel, url] of Object.entries(assets || {})) if (typeof url === 'string' && !(url in reverse)) reverse[url] = rel;
  const clips = [], blobs = [];
  /** A base64 data: URL as a blob: URL of this document (synchronous, so the element never fetches the data: URL). */
  const unData = url => {
    const m = /^data:([^,;]*)[^,]*;base64,/i.exec(url || '');
    if (!m || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return null;
    try {
      const bin = atob(url.slice(m[0].length).replace(/\s+/g, '')), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const u = URL.createObjectURL(new Blob([bytes], { type: m[1] || 'video/mp4' }));
      blobs.push(u);
      return u;
    } catch { return null; } // not base64 after all: leave it to the element
  };
  for (const sc of scenes) for (const el of sc.el.querySelectorAll('video')) {
    const source = el.querySelector('source[src]');
    const attr = el.getAttribute('src') || (source ? source.getAttribute('src') : '') || '';
    for (const n of [el, ...el.querySelectorAll('source[src]')]) { const u = unData(n.getAttribute('src')); if (u) n.setAttribute('src', u); }
    const c = {
      el, scene: sc.id, src: reverse[attr] || attr, from: sc.from, to: sc.to, base: sc.base,
      clipIn: Math.max(0, parseFloat(el.getAttribute('data-clip-in')) || 0), loop: el.hasAttribute('loop'),
      at: null, want: null, chain: Promise.resolve(), failed: false, reported: false, misses: 0, stall: 0,
    };
    el.muted = true; el.playsInline = true; el.setAttribute('playsinline', ''); el.preload = 'auto';
    el.autoplay = false; el.removeAttribute('autoplay'); el.controls = false; el.removeAttribute('controls');
    el.loop = c.loop;
    el.addEventListener('error', () => { c.failed = true; report(c, describe(c)); }, true); // capture: <source> errors too
    el.addEventListener('loadedmetadata', () => { if (!canSeek(c)) report(c, stuck(c)); });
    // one of our seeks that lands elsewhere (a native loop wrap is not ours: `want` is cleared on arrival)
    el.addEventListener('seeked', () => { const w = c.want; c.want = null; if (w !== null && Math.abs(el.currentTime - w) > .05) report(c, stuck(c)); });
    try { el.pause(); el.load(); } catch { /* reported by the error event */ }
    clips.push(c);
  }
  if (!clips.length) return null;

  function describe(c) {
    const e = c.el.error, code = e ? e.code : 0;
    const why = e ? ` (${REASON[code] || `error ${code}`}${e.message ? `: ${e.message}` : ''})` : '';
    const hint = code === 3 || code === 4 ? '. Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)' : '';
    return `video "${c.src}" cannot be played${why}${hint}`;
  }
  /** A finite clip whose seekable range ends at 0 can only play from its start. */
  function canSeek(c) {
    const v = c.el, d = v.duration, s = v.seekable;
    return !(Number.isFinite(d) && d > .5 && (!s || !s.length || s.end(s.length - 1) < .01));
  }
  const stuck = c => `video "${c.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;
  /** Every time the runtime moves a clip goes through here, so 'seeked' can check where it landed. */
  function place(c, m) { c.want = m; c.el.currentTime = m; }
  function report(c, message) {
    if (c.reported) return;
    c.reported = true;
    errors.push({ scene: c.scene, message, line: 0 });
    if (onError) { try { onError(c.scene, c.src); } catch { /* the host's problem */ } }
  }
  /** File time for project time t: clipIn + (t - content start), wrapped when looping, kept inside the file. */
  function target(c, t) {
    const d = c.el.duration, known = d > 0 && Number.isFinite(d);
    let m = c.clipIn + (t - c.base);
    if (c.loop && known) m = ((m % d) + d) % d;
    if (m < 0) m = 0;
    if (known && m > d - END) m = Math.max(0, d - END);
    return m;
  }
  const visible = (c, t) => t >= c.from && t < c.to;

  /* ───────── capture ───────── */
  function settle(c, t) {
    c.chain = c.chain.then(() => new Promise(resolve => {
      const v = c.el;
      if (c.failed) { resolve(); return; }
      let done = false, onMeta = null, onSeeked = null;
      const onErr = () => finish(null);
      const finish = message => {
        if (done) return;
        done = true; clearTimeout(timer);
        v.removeEventListener('error', onErr, true);
        if (onMeta) v.removeEventListener('loadedmetadata', onMeta);
        if (onSeeked) v.removeEventListener('seeked', onSeeked);
        if (message) { report(c, message); if (v.readyState === 0 || ++c.misses >= 3) c.failed = true; } else c.misses = 0;
        resolve();
      };
      const timer = setTimeout(() => finish(c.failed || v.error ? null : `video "${c.src}" did not show its frame for ${t.toFixed(3)} s within ${SETTLE_MS / 1000} s`), SETTLE_MS);
      v.addEventListener('error', onErr, true);
      const go = () => {
        onMeta = null;
        if (c.failed || v.error) { finish(null); return; }
        const m = target(c, t);
        if (c.at === m && !v.seeking) { finish(null); return; } // this frame is already on screen
        // register for the presented frame before seeking: it can arrive before 'seeked' fires
        let seeked = false, shown = !v.requestVideoFrameCallback;
        const check = () => {
          if (!seeked || !shown) return;
          if (Math.abs(v.currentTime - m) > .05) { finish(stuck(c)); return; } // the source cannot seek there
          c.at = m; finish(null);
        };
        if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(() => { shown = true; check(); });
        onSeeked = () => { seeked = true; if (v.requestVideoFrameCallback) check(); else requestAnimationFrame(() => requestAnimationFrame(check)); };
        v.addEventListener('seeked', onSeeked, { once: true });
        c.at = null;
        place(c, m);
      };
      if (v.readyState >= 1) go(); else { onMeta = go; v.addEventListener('loadedmetadata', onMeta, { once: true }); }
    }));
    return c.chain;
  }

  /* ───────── live ───────── */
  let last = null, lastWall = 0, transport = null, idle = 0;
  const drift = (c, a, b) => { const d = Math.abs(a - b), D = c.el.duration; return c.loop && D > 0 && Number.isFinite(D) ? Math.min(d, D - d) : d; };
  const play = c => { try { const r = c.el.play(); if (r && r.catch) r.catch(() => {}); } catch { /* not playable yet */ } };
  // before metadata, currentTime becomes the start position the element seeks to once it can
  const park = (c, m) => { const v = c.el; if (!v.paused) v.pause(); if (Math.abs(v.currentTime - m) > EPS) place(c, m); };
  function watch(c) {
    if (!onError || c.reported || c.stall || c.el.readyState > 0) return;
    c.stall = setTimeout(() => { c.stall = 0; if (c.el.readyState === 0) report(c, `video "${c.src}" did not load within ${STALL_MS / 1000} s`); }, STALL_MS);
  }
  function hold() {
    for (const c of clips) {
      if (c.failed) continue;
      if (last !== null && visible(c, last)) park(c, target(c, last)); else if (!c.el.paused) c.el.pause();
    }
  }
  function live(t) {
    const step = last === null ? NaN : t - last, now = performance.now(), wall = (now - lastWall) / 1000;
    last = t; lastWall = now;
    const forward = step > 0 && step <= ROLL_MAX;
    const rolling = transport === true ? forward : transport === null && forward && Math.abs(step - wall) < .1;
    for (const c of clips) {
      if (c.failed) continue;
      const v = c.el;
      if (!visible(c, t)) {
        if (!v.paused) v.pause();
        if (t < c.from && c.from - t <= PREROLL) park(c, target(c, c.from)); // the next clip waits on its first frame
        continue;
      }
      watch(c);
      const m = target(c, t), D = v.duration;
      const atEnd = !c.loop && D > 0 && Number.isFinite(D) && m >= D - END - EPS;
      if (rolling && !atEnd) {
        if (v.paused) { if (drift(c, v.currentTime, m) > EPS) place(c, m); play(c); }
        else if (drift(c, v.currentTime, m) > DRIFT) place(c, m);
      } else park(c, m);
    }
    clearTimeout(idle);
    idle = setTimeout(hold, IDLE_MS);
  }

  return {
    clips,
    /** Show time t (already nudged like the stage). Capture mode returns a promise. */
    seek(t) {
      if (mode !== 'capture') { live(t); return undefined; }
      const on = [];
      for (const c of clips) if (visible(c, t)) on.push(c); else if (!c.el.paused) c.el.pause();
      return Promise.all(on.map(c => settle(c, t))).then(() => undefined);
    },
    /** The host's transport: playing false pauses every clip on its exact frame right away. */
    transport(playing) { transport = !!playing; if (!transport) { clearTimeout(idle); hold(); } },
    /** Resolves when every clip has its first frame (or failed; failures are in `errors`). */
    ready() {
      return Promise.all(clips.map(c => new Promise(resolve => {
        const v = c.el;
        if (c.failed || v.error || v.readyState >= 2) { resolve(); return; }
        const done = () => { clearTimeout(timer); v.removeEventListener('loadeddata', done); v.removeEventListener('error', done, true); resolve(); };
        const timer = setTimeout(() => { if (v.readyState === 0 && !c.failed) { c.failed = true; report(c, `video "${c.src}" did not load within ${LOAD_MS / 1000} s`); } done(); }, LOAD_MS);
        v.addEventListener('loadeddata', done); v.addEventListener('error', done, true);
      })));
    },
    destroy() {
      clearTimeout(idle);
      for (const c of clips) { clearTimeout(c.stall); try { c.el.pause(); } catch { /* gone */ } }
      for (const u of blobs) URL.revokeObjectURL(u);
    },
  };
}
