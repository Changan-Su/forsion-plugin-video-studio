import { h } from './util.js';

// Real sandboxed scene renders, used as poster frames on the timeline clips. Only clips in view run one,
// at most MAX at a time, and a scene re-renders only when its own source or the shared layers change
// (moving an iframe in the DOM reloads it, so each scene keeps one element for its whole life).
// ponytail: fixed cap of live iframes; switch to one renderer + cached bitmaps if projects grow past ~50 scenes.
const MAX = 24;

export function sceneThumbnails(scrollRoot, htmlFor, state, { onMediaError } = {}) {
  const records = new Map(), queue = new Set();
  let disposed = false, active = 0, shared = '';
  const poster = s => s.t0 + Math.min(s.dur * .5, Math.max(.8, s.dur * .3));
  const seek = (r, time) => r.frame?.contentWindow?.postMessage({ fvs: 'seek', t: time }, '*');
  const stop = r => {
    queue.delete(r);
    if (r.frame) { r.frame.remove(); r.frame = null; active--; }
    r.ready = false; delete r.el.dataset.rendered; r.gen++;
  };
  async function start(r) {
    if (disposed || r.frame || !state().trusted) return;
    const gen = ++r.gen;
    active++;
    let html = null;
    try { html = await htmlFor(r.scene); } catch { html = null; }
    if (disposed || gen !== r.gen || !html || !r.visible || !r.el.isConnected) { active--; pump(); return; }
    r.frame = h('iframe', { sandbox: 'allow-scripts', title: r.scene.title || r.scene.id, tabindex: '-1', 'aria-hidden': 'true' });
    r.frame.srcdoc = html; r.el.append(r.frame);
  }
  function pump() { for (const r of [...queue]) { if (active >= MAX) break; queue.delete(r); void start(r); } }
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      const r = records.get(e.target.dataset.scene);
      if (!r) continue;
      r.visible = e.isIntersecting;
      if (r.visible) { if (!r.frame) queue.add(r); } else stop(r);
    }
    pump();
  }, { root: scrollRoot, rootMargin: '0px 160px' });
  const message = e => {
    const m = e.data || {};
    if (m.fvs !== 'ready' && m.fvs !== 'media-error') return;
    for (const r of records.values()) if (r.frame?.contentWindow === e.source) {
      if (m.fvs === 'ready') { r.ready = true; r.el.dataset.rendered = 'true'; seek(r, poster(r.scene)); }
      // the host swapped an unseekable stream for an inline copy: render this scene again with it
      else if (m.src && onMediaError?.(m.src)) { stop(r); if (r.visible) queue.add(r); pump(); }
      break;
    }
  };
  window.addEventListener('message', message);
  const sceneSig = s => JSON.stringify([s.html, s.css, s.js, s.meta, s.t0, s.dur, s.in || 0]);
  return {
    /** Re-render only what changed. `globals` is everything every scene shares (css, stage, settings). */
    sync(p, globals) {
      const wipe = globals !== shared; shared = globals;
      const ids = new Set(p.scenes.map(s => s.id));
      for (const [id, r] of records) if (!ids.has(id)) { stop(r); observer.unobserve(r.el); records.delete(id); }
      for (const s of p.scenes) {
        const r = records.get(s.id); if (!r) continue;
        const sig = sceneSig(s);
        r.scene = s;
        if (wipe || sig !== r.sig) { r.sig = sig; stop(r); if (r.visible) queue.add(r); }
      }
      pump();
    },
    get(scene) {
      const old = records.get(scene.id); if (old) return old.el;
      const el = h('span', { class: 'fvs-scene-thumb', 'data-scene': scene.id, 'aria-hidden': 'true' });
      const r = { el, scene, sig: sceneSig(scene), gen: 0, frame: null, visible: false, ready: false };
      records.set(scene.id, r); observer.observe(el);
      return el;
    },
    refresh() { for (const r of records.values()) if (r.visible && !r.frame) queue.add(r); pump(); },
    dispose() { disposed = true; observer.disconnect(); window.removeEventListener('message', message); for (const r of records.values()) stop(r); records.clear(); },
  };
}
