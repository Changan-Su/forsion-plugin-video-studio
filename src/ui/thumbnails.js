import { h } from './util.js';

// Real sandboxed scene renders. Only visible rows run; no second renderer or same-origin access.
export function sceneThumbnails(container, htmlFor, state) {
  const records = new Map();
  let revision = '', disposed = false;
  const stop = r => { cancelAnimationFrame(r.raf); r.raf = 0; r.frame?.remove(); r.frame = null; r.ready = false; delete r.el.dataset.rendered; r.gen++; };
  const seek = (r, time) => r.frame?.contentWindow?.postMessage({ fvs: 'seek', t: time }, '*');
  const poster = r => r.scene.t0 + Math.min(r.scene.dur * .5, Math.max(.8, r.scene.dur * .3));
  async function start(r) {
    if (disposed || r.frame || !state().trusted) return;
    const gen = ++r.gen;
    let html; try { html = await htmlFor(r.scene); } catch { return; }
    if (disposed || gen !== r.gen || !r.visible || !r.el.isConnected) return;
    r.frame = h('iframe', { sandbox: 'allow-scripts', title: r.scene.title || r.scene.id, tabindex: '-1', 'aria-hidden': 'true' });
    r.frame.srcdoc = html; r.el.append(r.frame);
  }
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      const r = records.get(e.target.dataset.scene);
      if (!r) continue;
      r.visible = e.isIntersecting;
      if (r.visible) void start(r); else stop(r);
    }
  }, { root: container, rootMargin: '40px' });
  const message = e => {
    if (e.data?.fvs !== 'ready') return;
    for (const r of records.values()) if (r.frame?.contentWindow === e.source) {
      r.ready = true; r.el.dataset.rendered = 'true'; seek(r, poster(r)); break;
    }
  };
  window.addEventListener('message', message);
  return {
    update(text) { if (text === revision) return; revision = text; for (const r of records.values()) { stop(r); observer.unobserve(r.el); } records.clear(); },
    get(scene, fallback) {
      const old = records.get(scene.id); if (old) return old.el;
      const el = h('span', { class: 'fvs-scene-thumb', 'data-scene': scene.id, 'aria-hidden': 'true' }, h('span', { text: fallback }));
      const r = { el, scene, gen: 0, frame: null, raf: 0, visible: false }; records.set(scene.id, r); observer.observe(el);
      el.addEventListener('pointerenter', () => {
        if (!r.ready || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const begin = performance.now();
        const loop = () => { if (!r.frame || disposed) return; seek(r, scene.t0 + ((performance.now() - begin) / 1000) % scene.dur); r.raf = requestAnimationFrame(loop); };
        r.raf = requestAnimationFrame(loop);
      });
      el.addEventListener('pointerleave', () => { cancelAnimationFrame(r.raf); r.raf = 0; if (r.ready) seek(r, poster(r)); });
      return el;
    },
    refresh() { for (const r of records.values()) if (r.visible) void start(r); },
    dispose() { disposed = true; observer.disconnect(); window.removeEventListener('message', message); for (const r of records.values()) stop(r); records.clear(); },
  };
}
