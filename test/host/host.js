// A stand-in for the Forsion desktop host: the same plugin contract (ctx), an in-memory vault, and the
// desktop app's CSP (see host.html). Drives main.js the way pluginStore does: new Function('ctx', src).
window.HOST = (() => {
  const files = new Map();           // vault path → string | Uint8Array
  const watchers = new Map();
  const calls = { notify: [], startChat: [], openFile: [], complete: [] };
  const reg = { fileTypes: [], creators: [], commands: [], slash: [], embeds: [], views: [], lists: [] };
  const enc = new TextEncoder(), dec = new TextDecoder();
  let data = {};
  let locale = 'zh';
  let mounted = null;
  const app = {
    readFile: async p => { const v = files.get(p); return v === undefined ? null : typeof v === 'string' ? v : dec.decode(v); },
    writeFile: async (p, t) => { files.set(p, String(t)); },
    readBytes: async p => { const v = files.get(p); return v === undefined ? null : typeof v === 'string' ? enc.encode(v) : v; },
    writeBytes: async (p, b) => { files.set(p, b instanceof Uint8Array ? b : new Uint8Array(b)); },
    listFiles: async () => [...files.keys()],
    assetUrl: p => `${location.origin}/vault/${encodeURIComponent(p)}`,
    hostPath: p => `/home/me/Vault/${p}`,
    vaultRoot: () => '/home/me/Vault',
    workFolder: () => 'Forsion Video Studio',
    watchFile: (p, cb) => { watchers.set(p, cb); return () => watchers.delete(p); },
    openFile: p => { calls.openFile.push(p); open(p); },
    notify: m => calls.notify.push(m),
    prompt: async (title, initial) => initial,
  };
  const ctx = {
    app,
    getLocale: () => locale,
    notify: m => calls.notify.push(m),
    loadData: async () => data,
    saveData: async d => { data = JSON.parse(JSON.stringify(d)); },
    registerFileType: d => { reg.fileTypes.push(d); return true; },
    registerFileCreator: d => reg.creators.push(d),
    registerCommand: d => reg.commands.push(d),
    registerSlashItem: d => reg.slash.push(d),
    registerEmbedRenderer: d => reg.embeds.push(d),
    registerView: d => reg.views.push(d),
    registerListSource: d => reg.lists.push(d),
    tangu: {
      startChat: async o => { calls.startChat.push(o); return { ok: true, sessionId: 's1' }; },
      complete: async o => { calls.complete.push(o); return { text: `${o.selection}！` }; },
    },
  };
  function open(p) {
    const ft = reg.fileTypes.find(f => f.extensions.some(e => p.toLowerCase().endsWith(e)));
    if (!ft) throw new Error(`no file type for ${p}`);
    if (mounted) mounted();
    const el = document.getElementById('view');
    el.replaceChildren();
    mounted = ft.mount(el, { filePath: p }) || null;
  }
  /*
   * A Space: the plugin's studio view in the main area and Extend View panels beside it, with the host's rules
   * (lcl/engine/extendView.ts + ExtendViewHost.tsx): one extension per owner (another id replaces it, reason
   * 'replace'), the same id refocuses it, × and Escape dismiss, a hidden owner closes it ('owner') and refuses
   * to open one, and a freshly shown panel focuses its first control once rendering settles.
   * With a recipe (the plugin's space.json `layout`) it is a newer host: the main view gets the recipe's params,
   * `layout.left` mounts in the left side, `layout.bottom` in a bottom panel under the main area (closing it
   * unmounts the view, as the host's collapse does), ctx.viewLocations includes 'bottom', ctx.openView docks there,
   * and ctx.replaceView / ctx.closeView swap or close the plugin's own views in place (one view per side here).
   * `oldHost` is a host from before that: it passes the main params and mounts layout.left, but ignores
   * layout.bottom and has none of the rest. `file` null: the Space opens with no project in its params.
   */
  let space = null;
  function openSpace(file, recipe = null, { oldHost = false } = {}) {
    document.getElementById('view').style.display = 'none';
    const shell = document.createElement('div');
    shell.className = 'host-space';
    shell.style.cssText = 'position:fixed;inset:0;display:grid;grid-template-columns:220px minmax(0,1fr) auto;grid-template-rows:minmax(0,1fr) auto;gap:6px;padding:6px;background:var(--bg)';
    shell.innerHTML = '<section class="host-left" style="grid-area:1/1/3/2;display:grid;grid-template-rows:auto minmax(0,1fr);border-radius:var(--radius-lg,12px);background:var(--sidebar-bg,var(--bg));overflow:hidden"><div style="padding:8px 14px 0;font:12px var(--font-ui,sans-serif);color:var(--text-muted)"><button class="host-list-row" style="all:unset;cursor:pointer">侧栏</button></div><div class="host-left-body" style="min-height:0;overflow:hidden"></div></section><main style="grid-area:1/2/2/3;position:relative;border-radius:var(--radius-lg,12px);background:var(--bg-card);box-shadow:var(--card-shadow);overflow:hidden"></main><aside class="host-extend" style="grid-area:1/3/3/4;display:none;width:340px;border-radius:var(--radius-lg,12px);background:var(--bg-card);box-shadow:var(--card-shadow);overflow:hidden;grid-template-rows:auto minmax(0,1fr)"></aside>'
      + '<section class="host-bottom" style="grid-area:2/2/3/3;display:none;height:290px;border-radius:var(--radius-lg,12px);background:var(--bg-card);box-shadow:var(--card-shadow);overflow:hidden;grid-template-rows:auto minmax(0,1fr)"><div style="display:flex;align-items:center;gap:8px;padding:6px 10px 2px 14px;font:500 12px var(--font-ui,sans-serif);color:var(--text)"><span class="host-bottom-tab"></span><span style="flex:1"></span><button class="host-bottom-close" aria-label="收起底部面板" style="border:0;background:none;color:var(--text-muted);font-size:15px">×</button></div><div class="host-bottom-body" style="min-height:0;overflow:hidden"></div></section>';
    document.body.append(shell);
    const main = shell.querySelector('main'), side = shell.querySelector('aside'), bottom = shell.querySelector('.host-bottom'), left = shell.querySelector('.host-left-body');
    let entry = null, visible = true;
    const log = [];
    const close = reason => {
      const prev = entry; if (!prev) return;
      entry = null;
      const restore = side.contains(document.activeElement);
      try { prev.cleanup?.(); } catch (e) { console.error(e); }
      side.style.display = 'none'; side.replaceChildren();
      log.push(`${prev.options.id}:${reason}`);
      prev.options.onClose?.(reason);
      if (restore && prev.opener?.isConnected) queueMicrotask(() => { if (document.activeElement === document.body) prev.opener.focus(); });
    };
    // like the host: the first control of the panel's body (not its header), after rendering settles
    const focusFirst = () => setTimeout(() => { const x = side.querySelector('.host-extend-body')?.querySelector('input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'); x?.focus({ preventScroll: true }); });
    const extendView = {
      open(options) {
        if (!visible) throw new Error('Extend view owner is not visible');
        if (entry?.options.id === options.id) { focusFirst(); return entry.handle; }
        close('replace');
        const opener = document.activeElement !== document.body ? document.activeElement : null;
        side.style.display = 'grid';
        const head = document.createElement('div');
        head.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:10px 12px 6px 16px;font:600 14px var(--font-ui,sans-serif);color:var(--text)';
        head.innerHTML = '<span></span><button class="host-extend-close" aria-label="关闭" style="border:0;background:none;color:var(--text-muted);font-size:16px">×</button>';
        head.firstChild.textContent = options.title;
        const body = document.createElement('div'); body.className = 'host-extend-body'; body.style.cssText = 'min-height:0;overflow:hidden';
        side.append(head, body);
        const handle = { id: options.id, get isOpen() { return entry?.handle === handle; }, close: () => { if (entry?.handle === handle) close('close'); } };
        entry = { options, handle, opener };
        head.querySelector('button').onclick = () => close('dismiss');
        entry.cleanup = options.mount(body, handle);
        log.push(`${options.id}:open`);
        focusFirst();
        return handle;
      },
      close: () => close('close'),
    };
    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape' || !entry || e.defaultPrevented || !(main.contains(document.activeElement) || side.contains(document.activeElement))) return;
      e.preventDefault(); close('dismiss');
    });
    // the bottom panel: one view at a time here; collapsing it unmounts the view (the host stashes and re-creates)
    let docked = null;
    const viewId = type => type.split(':').pop();
    const closeBottom = () => {
      const d = docked; if (!d) return;
      docked = null;
      try { d.cleanup?.(); } catch (e) { console.error(e); }
      bottom.querySelector('.host-bottom-body').replaceChildren(); bottom.style.display = 'none';
      log.push(`bottom:${d.id}:close`);
    };
    const openBottom = id => {
      if (docked?.id === id) return;
      closeBottom();
      const v = reg.views.find(x => x.id === id); if (!v) return;
      bottom.style.display = 'grid'; bottom.querySelector('.host-bottom-tab').textContent = v.title;
      docked = { id, cleanup: v.mount(bottom.querySelector('.host-bottom-body'), { surface: 'main', getParams: () => ({}), setParams() {}, onParamsChanged: () => () => {} }) || null };
      log.push(`bottom:${id}:open`);
    };
    bottom.querySelector('.host-bottom-close').onclick = closeBottom;
    // the left side: one plugin view at a time (enough for the Space's navigation ⇄ media bin)
    let leftView = null;
    const closeLeft = () => {
      const d = leftView; if (!d) return;
      leftView = null;
      try { d.cleanup?.(); } catch (e) { console.error(e); }
      left.replaceChildren(); log.push(`left:${d.id}:close`);
    };
    const openLeft = id => {
      if (leftView?.id === id) return;
      closeLeft();
      const v = reg.views.find(x => x.id === id); if (!v) return;
      leftView = { id, cleanup: v.mount(left, { surface: 'main', getParams: () => ({}), setParams() {}, onParamsChanged: () => () => {} }) || null };
      log.push(`left:${id}:open`);
    };
    const bottomPanel = !!recipe && !oldHost;
    ctx.viewLocations = bottomPanel ? ['main', 'left', 'right', 'bottom'] : undefined;
    ctx.openView = (id, o) => { if (o?.location === 'bottom' && bottomPanel) openBottom(id); else if (o?.location === 'left') openLeft(id); };
    if (bottomPanel) {
      ctx.replaceView = (from, to) => {
        let n = 0;
        if (leftView?.id === from) { openLeft(to); n++; }
        if (docked?.id === from) { openBottom(to); n++; }
        return n;
      };
      ctx.closeView = id => { if (docked?.id === id) closeBottom(); if (leftView?.id === id) closeLeft(); };
    } else { delete ctx.replaceView; delete ctx.closeView; }
    let params = { ...(recipe?.main?.[0]?.params || {}), ...(file ? { filePath: file } : {}) };
    const view = reg.views.find(v => v.id === 'studio');
    const props = { surface: 'main', extendView, getParams: () => params, setParams: p => { params = { ...params, ...p }; }, onParamsChanged: () => () => {}, showInMainPanel() {} };
    let unmountMain = view.mount(main, props);
    // the host builds main first, then the panels
    for (const item of recipe?.left || []) openLeft(viewId(item.type));
    if (bottomPanel) for (const item of recipe.bottom || []) openBottom(viewId(item.type));
    space = {
      log, main, side, bottom, left, current: () => entry?.options.id || null, get params() { return params; },
      openBottom, closeBottom, get docked() { return docked?.id || null; },
      openLeft, closeLeft, get leftView() { return leftView?.id || null; },
      // keepSize: hidden without a size change (visibility), so only an interaction shows the editor is back
      hide({ keepSize = false } = {}) { visible = false; if (keepSize) main.style.visibility = 'hidden'; else main.style.display = 'none'; close('owner'); },
      show() { visible = true; main.style.display = ''; main.style.visibility = ''; },
      // the host rebuilds the main column around layout jumps: the view is cleaned up and mounted again, same params
      remount() { if (typeof unmountMain === 'function') unmountMain(); main.replaceChildren(); unmountMain = view.mount(main, props); },
    };
    return space;
  }
  return {
    files, calls, reg, ctx, open, get data() { return data; }, space: openSpace, get spaceState() { return space; },
    get locale() { return locale; }, set locale(value) { locale = value; },
    load(src) { new Function('ctx', src)(ctx); },
    external(p, text) { files.set(p, text); const cb = watchers.get(p); if (cb) cb(); },
    text: p => { const v = files.get(p); return typeof v === 'string' ? v : v ? dec.decode(v) : null; },
  };
})();
