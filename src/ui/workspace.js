import { mountStudio, trust, KIND, BIN_MIME } from './studio.js';
import { h, dirOf, joinPath } from './util.js';
import { icon } from './icons.js';
import { CSS } from './styles.js';
import { parseProject, setProjectMeta } from '../lib/project.js';
import { evaTemplate } from '../lib/templates.js';
import { openMenu, closeLayer } from './menu.js';
import { AGENT } from './ai.js';

// the create page's frames (the project page offers these and 4K)
const ASPECTS = [[1920, 1080, 'frame-landscape'], [1080, 1920, 'frame-portrait'], [1080, 1080, 'frame-square'], [1440, 1080, 'frame-classic']];
// folder names that break on some system: separators, reserved characters, a leading or trailing dot
const badName = name => /[\/\\:*?"<>|\u0000-\u001f]/.test(name) || /^\.|\.$/.test(name);
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// Only public plugin contracts cross the host boundary. No host stores or second React runtime.
export function registerWorkspace(ctx, t, { createProject, exampleProject, remember }) {
  const app = ctx.app || {}, listeners = new Set(), mounts = new Set();
  let selected = null, paths = [], generation = 0, loaded = false;
  // The host restores the notes library lazily (a plugin view wakes it, but the restore is async): reading before it
  // lands gives nothing, so wait for it. Hosts without vaultRoot() cannot tell; go ahead. Older hosts never wake it
  // for a plugin view (the wake-up came with replaceView), so there is nothing to wait for: answer at once.
  async function libraryReady(ms = 15000) {
    if (typeof app.vaultRoot !== 'function') return true;
    if (typeof ctx.replaceView !== 'function') return !!app.vaultRoot();
    for (const end = Date.now() + ms; !app.vaultRoot() && Date.now() < end;) await new Promise(r => setTimeout(r, 150));
    return !!app.vaultRoot();
  }
  const emit = () => listeners.forEach(fn => fn());
  const valid = path => typeof path === 'string' && path.toLowerCase().endsWith('.fvs.md');
  // render jobs, Director snapshots and other dot-folders hold temporary copies, not projects
  const listed = path => valid(path) && !path.split('/').some(part => part.startsWith('.'));
  const titles = new Map(); // path → the project's own title, frame and length, read once per path
  const stemOf = p => p.split('/').pop().replace(/\.fvs\.md$/i, '');
  const rows = query => paths.map(p => { const m = titles.get(p) || {}; return { key: p, title: m.title || stemOf(p), hint: p.slice(0, p.lastIndexOf('/')), icon: 'layout', frame: m.frame || '', length: m.length || '' }; })
    .filter(r => `${r.title} ${r.key}`.toLocaleLowerCase().includes((query || '').toLocaleLowerCase()));
  async function readTitles(list) {
    let changed = false;
    for (const p of list) {
      if (titles.has(p)) continue;
      let m = {};
      try {
        const text = await app.readFile(p), q = text ? parseProject(text) : null;
        if (q) m = { title: String(q.meta.title || '').trim(), frame: q.meta.width && q.meta.height ? `${q.meta.width} × ${q.meta.height}` : '', length: mmss(q.length || 0) };
      } catch { m = {}; }
      titles.set(p, m); changed = true;
    }
    if (changed) emit();
  }
  async function refresh() {
    if (selected) titles.delete(selected); // ponytail: only the open project re-reads its title; others refresh when opened
    // waits overlap instead of superseding each other: the list source polls every 8 s, longer waits never ended
    await libraryReady();
    const gen = ++generation, root = app.vaultRoot?.();
    let found = [];
    try { found = await app.listFiles?.() || []; } catch { /* no vault */ }
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    const next = [...new Set(found.filter(listed))].sort((a, b) => a.localeCompare(b)), active = selected;
    if (active && !next.includes(active) && await app.readFile(active).catch(() => null) !== null) next.push(active);
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    paths = next; loaded = true;
    emit();
    void readTitles(next);
  }
  function open(path) {
    if (!valid(path)) return;
    titles.delete(path);
    selected = path; remember(path); emit();
    for (const mount of mounts) if (!mount.compact) mount.show(path);
    if (ctx.openView) ctx.openView('studio'); else app.openFile?.(path);
    void refresh();
  }
  const safe = fn => async () => { try { await fn(); } catch (e) { ctx.notify?.(String(e.message || e), { level: 'warning' }); } };
  const newProject = () => go('create'); // as in Coding Studio: a page with a name, a frame and an idea
  const example = safe(async () => open(await exampleProject(false)));
  const nav = { page: 'projects' }; // the launchpad's page ('projects' | 'create'), picked in the left navigation
  // the idea typed on the create page, as edited in the Director, until it is sent: the host remounts the studio
  // around layout jumps (before or after the first mount reached the Director), and each mount seeds it again
  let pendingIdea = null;
  /** Show the launchpad's `page` in the main studio here, closing its project first; open one when there is none. */
  async function go(page) {
    nav.page = page; emit();
    const here = [...mounts].filter(m => m.launcher);
    for (const m of here) void m.leave();
    if (!here.length) { selected = null; await remember(null); ctx.openView?.('studio'); }
  }

  /** The main area while no project is open: the project list or the create page (Coding Studio's launchpad). */
  function launchpad(el, onOpen) {
    const inner = h('div', { class: 'fvs-launch-inner' });
    const shell = h('div', { class: 'fvs-extension fvs-launch' }, h('style', { text: CSS }), inner);
    el.append(shell);
    let page = null, stop = null;
    const paint = () => {
      if (page === nav.page) return;
      const turned = page !== null; // a turn of the page moves the keyboard to it; the first paint leaves it alone
      page = nav.page; stop?.(); inner.replaceChildren();
      stop = (page === 'create' ? createPage : projectsPage)(inner, onOpen);
      if (turned) (inner.querySelector('textarea') || inner.querySelector('input'))?.focus({ preventScroll: true });
    };
    listeners.add(paint); paint();
    return () => { listeners.delete(paint); stop?.(); shell.remove(); };
  }
  function projectsPage(box, onOpen) {
    const search = h('input', { type: 'search', placeholder: t('project-search'), 'aria-label': t('project-search') });
    const count = h('span'), list = h('div', { class: 'fvs-launch-list' });
    const render = () => {
      const found = rows(search.value);
      count.textContent = t('launch-count', { n: found.length });
      list.replaceChildren(...found.map(r => h('button', { type: 'button', class: 'fvs-launch-row', 'data-project-path': r.key, onclick: () => onOpen(r.key) },
        h('span', { class: 'fvs-launch-icon' }, icon('FileVideo')),
        h('span', { class: 'fvs-launch-info' }, h('strong', { text: r.title }), h('small', { text: r.key })),
        h('span', { class: 'fvs-launch-meta' }, h('span', { text: r.frame }), h('small', { text: r.length })),
        h('span', { class: 'fvs-launch-arrow' }, icon('ArrowRight')))));
      if (!found.length && (loaded || search.value)) list.append(h('div', { class: 'fvs-launch-empty' }, h('strong', { text: t(search.value ? 'launch-no-match' : 'launch-empty') }), search.value ? null : h('p', { text: t('launch-empty-hint') })));
    };
    search.oninput = render;
    box.append(
      h('header', { class: 'fvs-launch-header' },
        h('div', {}, h('h1', { text: t('launch-projects') }), h('p', { text: t('launch-projects-sub') })),
        h('div', { class: 'fvs-launch-actions' },
          h('button', { type: 'button', class: 'fvs-btn', onclick: example }, icon('Film'), h('span', { text: t('open-example') })),
          h('button', { type: 'button', class: 'fvs-btn primary', 'data-launch': 'new', onclick: () => void go('create') }, icon('Plus'), h('span', { text: t('new-video') })))),
      h('div', { class: 'fvs-launch-toolbar' },
        h('label', { class: 'fvs-launch-search' }, icon('Search'), search),
        h('button', { type: 'button', class: 'fvs-btn icon', title: t('refresh-projects'), 'aria-label': t('refresh-projects'), onclick: () => void refresh() }, icon('RefreshCw'))),
      h('div', { class: 'fvs-launch-head' }, h('span'), count, h('span', { text: t('launch-col-meta') })),
      list);
    listeners.add(render); render(); void refresh();
    return () => listeners.delete(render);
  }
  /** A new project in its own folder of the work folder: <work>/<name>/<name>.fvs.md, its media beside it. */
  function createPage(box, onOpen) {
    const folder = app.workFolder?.() || 'Forsion Video Studio';
    const inUse = (list, name) => list.some(p => p.toLowerCase().startsWith(`${folder}/${name}/`.toLowerCase()));
    const freeName = list => { const base = t('default-name'); let name = base; for (let k = 2; inUse(list, name); k++) name = `${base} ${k}`; return name; };
    let busy = false;
    const idea = h('textarea', { class: 'fvs-input fvs-launch-idea', rows: '4', placeholder: t('launch-idea-placeholder'), 'aria-label': t('launch-idea') });
    const aspects = ASPECTS.map(([w, hh, key], i) => h('label', { class: 'fvs-launch-aspect' },
      h('input', { type: 'radio', name: 'fvs-aspect', value: String(i), checked: i === 0 }),
      h('span', { class: 'fvs-launch-frame', style: { aspectRatio: `${w} / ${hh}` } }), h('span', { text: t(key) })));
    const name = h('input', { class: 'fvs-input', 'aria-label': t('launch-name'), placeholder: freeName(paths), maxlength: '80', autocomplete: 'off', spellcheck: 'false' });
    const error = h('p', { class: 'fvs-launch-error', role: 'alert', hidden: true });
    const where = h('p', { class: 'fvs-launch-note' });
    const submit = h('button', { type: 'submit', class: 'fvs-btn primary fvs-launch-create' }, icon('ArrowRight'), h('span', { text: t('launch-create') }));
    const paintWhere = () => { where.textContent = t('launch-where', { path: `${folder}/${name.value.trim() || name.placeholder}` }); };
    const fail = message => { error.textContent = message; error.hidden = false; name.setAttribute('aria-invalid', 'true'); name.focus(); };
    name.oninput = () => { error.hidden = true; name.removeAttribute('aria-invalid'); paintWhere(); };
    const form = h('form', { class: 'fvs-launch-card', novalidate: true, onsubmit: e => { e.preventDefault(); void create(); } },
      h('label', { class: 'fvs-launch-label' }, h('span', {}, t('launch-idea'), h('small', { text: t('optional') })), idea),
      h('div', { class: 'fvs-launch-field' }, h('span', { text: t('launch-frame') }), h('div', { class: 'fvs-launch-aspects', role: 'radiogroup', 'aria-label': t('launch-frame') }, ...aspects)),
      h('div', { class: 'fvs-launch-submit' }, h('label', { class: 'fvs-launch-field fvs-launch-name' }, h('span', { text: t('launch-name') }), name), submit),
      error);
    async function create() {
      if (busy) return;
      const typed = name.value.trim();
      if (typed && badName(typed)) return fail(t('launch-name-invalid'));
      busy = true; submit.disabled = true;
      try {
        if (!await libraryReady(5000)) return fail(t('launch-no-library'));
        let list = paths;
        try { list = await app.listFiles?.() || paths; } catch { /* the folder check falls back to the project list */ }
        if (typed && inUse(list, typed)) return fail(t('launch-name-taken'));
        const title = typed || freeName(list);
        const [width, height] = ASPECTS[+form.querySelector('input[name="fvs-aspect"]:checked').value];
        const path = joinPath(folder, `${title}/${title}.fvs.md`);
        await app.writeFile(path, setProjectMeta(evaTemplate({ title, zh: !t.en() }), { width, height }));
        await trust(ctx, path);
        nav.page = 'projects'; // closing this project later comes back to the list
        void refresh();
        await onOpen(path, idea.value.trim());
      } catch (e) { fail(String(e?.message || e)); }
      finally { busy = false; submit.disabled = false; }
    }
    paintWhere();
    box.append(h('div', { class: 'fvs-launch-create-page' },
      h('button', { type: 'button', class: 'fvs-launch-back', onclick: () => void go('projects') }, icon('ArrowLeft'), h('span', { text: t('launch-back') })),
      h('header', { class: 'fvs-launch-create-head' }, h('h1', { text: t('launch-create-title') }), h('p', { text: t('launch-create-sub') })),
      form, where, h('p', { class: 'fvs-launch-note', text: t('launch-idea-note') })));
    return () => {};
  }

  function library(el, onOpen, empty = false) {
    const shell = h('div', { class: 'fvs-extension fvs-library' }, h('style', { text: CSS }));
    const search = h('input', { class: 'fvs-input', type: 'search', placeholder: t('project-search'), 'aria-label': t('project-search') });
    const list = h('div', { class: 'fvs-project-list' });
    const render = () => {
      list.replaceChildren();
      for (const row of rows(search.value)) list.append(h('button', { class: 'fvs-project-item', 'data-project-path': row.key, onclick: () => onOpen(row.key) },
        icon('FileVideo'), h('span', {}, h('strong', { text: row.title }), h('small', { text: row.key }))));
      if (!list.children.length) list.append(h('p', { class: 'fvs-hint', text: t('projects-empty') }));
    };
    search.oninput = render;
    shell.append(h('div', { class: 'fvs-library-heading' }, icon('Film'), h('h2', { text: t(empty ? 'workspace-welcome' : 'projects') })),
      h('p', { class: 'fvs-hint', text: t('workspace-intro') }),
      h('div', { class: 'fvs-row' }, h('button', { class: 'fvs-btn primary', onclick: newProject }, icon('Plus'), t('new-project')),
        h('button', { class: 'fvs-btn', onclick: example }, t('open-example'))), search, list);
    el.append(shell); listeners.add(render); render(); void refresh();
    return () => { listeners.delete(render); shell.remove(); };
  }

  // One bottom-panel timeline per window shows the newest docked studio's timeline; when that studio closes, the
  // one opened before it (another tab) gets the panel back.
  // The media bin follows the same studio (watch).
  const dock = (() => {
    const studios = [], watchers = new Set(); let host = null;
    const top = () => studios.at(-1) ?? null;
    const link = () => { const s = top(); host?.show(s ? s.timeline : null); s?.attach(host ? host.shell : null); watchers.forEach(fn => fn()); };
    return {
      top, size: () => studios.length,
      watch(fn) { watchers.add(fn); return () => watchers.delete(fn); },
      studio(client) {
        top()?.attach(null); studios.push(client); link();
        return () => {
          const i = studios.indexOf(client); if (i < 0) return;
          const owned = i === studios.length - 1;
          studios.splice(i, 1);
          if (owned) { client.attach(null); link(); }
        };
      },
      host(panel) {
        host = panel; link();
        return () => { if (host !== panel) return; host = null; top()?.attach(null); };
      },
    };
  })();

  // The conversation with the Director, on the Space's right side while a project is open (hosts with
  // ctx.tangu.mountChat). One conversation per project folder, working in that folder: what the agent generates
  // lands in the project's files (generate_image writes generated/, which the bin lists). It follows the newest
  // docked studio, like the bin. A project file that sits directly in the library root has no folder to work in and
  // keeps the Director panel.
  const canChat = typeof ctx.tangu?.mountChat === 'function';
  // (no app.hostPath check here: at startup the host is not ready to answer, and it resolves the folder itself later)
  const chatFolder = path => (canChat && dirOf(path)) || null;
  const chat = (() => {
    let handle = null, waiting = []; // what the editor sent before the view was up: [method, text]
    const send = (method, text) => { if (!text) return; if (handle) handle[method](text); else waiting.push([method, text]); };
    return {
      reveal: () => ctx.openView?.('chat', { location: 'right' }),
      quote: text => send('quote', text),
      prefill: text => send('prefill', text),
      bind(next) { handle = next; if (next) for (const [method, text] of waiting.splice(0)) next[method](text); },
    };
  })();
  function mountChat(el) {
    // The conversation is the host's own interface: it mounts beside the plugin's styled box, not inside it (the
    // plugin's rules for buttons, inputs and focus rings would restyle the host's input otherwise).
    const empty = h('div', { class: 'fvs-extension fvs-chat-empty' }, h('style', { text: CSS }), h('p', { class: 'fvs-hint fvs-dock-empty', text: t('chat-no-project') }));
    const body = h('div', { class: 'fvs-chat-body' });
    const shell = h('div', { class: 'fvs-chat' }, empty, body);
    el.append(shell);
    let folder = null, handle = null;
    const sync = () => {
      // An empty dock is the editor between two mounts (the host rebuilds it around layout jumps): the conversation
      // stays, and with it the text waiting in its input. Closing the project closes this view.
      const studio = dock.top(); if (!studio) return;
      const next = chatFolder(studio.path);
      if (next === folder) return;
      folder = next; handle?.dispose(); body.replaceChildren();
      handle = next ? ctx.tangu.mountChat(body, { agent: AGENT, folder: next, title: titles.get(studio.path)?.title || stemOf(studio.path) }) : null;
      empty.hidden = !!handle; chat.bind(handle);
    };
    const off = dock.watch(sync); sync();
    return () => { off(); chat.bind(null); handle?.dispose(); shell.remove(); };
  }

  function mountTimeline(el) {
    const empty = h('p', { class: 'fvs-hint fvs-dock-empty', text: t('timeline-no-project') });
    const shell = h('div', { class: 'fvs-extension fvs-dock-timeline', tabindex: '-1' }, h('style', { text: CSS }), empty);
    el.append(shell);
    // the timeline's toolbar follows the panel's width, as it does in the editor
    const ro = new ResizeObserver(() => { const w = shell.clientWidth; shell.classList.toggle('narrow', w > 0 && w < 760); shell.classList.toggle('medium', w > 0 && w < 1100); });
    ro.observe(shell);
    const off = dock.host({ shell, show(timeline) { shell.querySelector(':scope > .fvs-tl')?.remove(); if (timeline) shell.append(timeline); empty.hidden = !!timeline; } });
    return () => { off(); ro.disconnect(); shell.remove(); };
  }

  function mountWorkspace(el, view = {}, compact = false) {
    let disposed = false, disposeContent = null, path = null, request = 0;
    // The timeline docks in the native bottom panel wherever the host has one for this view; hosts without it (older,
    // mobile, Mini, floating) keep it inside the editor. It once also needed the recipe's `timeline: 'bottom'` main
    // param, but restored layouts lose view params (2026-10-03, a real dev: only filePath left) and the whole project
    // layout then silently never came. Notes' .fvs.md file tabs mount the studio directly and never get here.
    const docked = !compact && view.surface !== 'floating' && !!ctx.viewLocations?.includes('bottom');
    // Like Coding Studio, the layout follows the state: no project → navigation on the left and no timeline;
    // a project → its media bin on the left and its timeline at the bottom. Hosts without replaceView keep the
    // navigation and have no bin.
    const jump = docked && typeof ctx.replaceView === 'function';
    const launcher = !compact && view.surface !== 'floating'; // shows the launchpad when no project is open
    const holder = h('div', { class: 'fvs-workspace-host' }); el.append(holder);
    const picker = async () => {
      // the host shows one panel at a time: the picker takes the properties panel's place until it closes
      let switching = false;
      if (view.extendView) view.extendView.open({ id: 'fvs-projects', title: t('projects'), side: 'left',
        mount(body, handle) { return library(body, p => { switching = p !== path; handle.close(); void show(p).then(done => { if (switching && !done) disposeContent?.restoreSide?.(); }); }); },
        onClose(reason) { if (!switching && (reason === 'close' || reason === 'dismiss')) disposeContent?.restoreSide?.(); } });
      else {
        if (await disposeContent?.flush?.() === false || disposed) return;
        disposeContent?.(); holder.replaceChildren(); path = null; disposeContent = library(holder, show);
      }
    };
    /** Mount `next`; true when it is now the open project. */
    async function show(next, { initial = false, idea = '' } = {}) {
      if (!valid(next)) return false;
      if (next === path) return true;
      const gen = ++request;
      if (await app.readFile(next).catch(() => null) === null || disposed || gen !== request) return false;
      if (await disposeContent?.flush?.() === false || disposed || gen !== request) return false;
      view.extendView?.close(); disposeContent?.(); holder.replaceChildren();
      const fromLaunch = !path; path = next;
      if (!compact) { selected = next; remember(next); emit(); }
      if (view.getParams?.().filePath !== next) view.setParams?.({ filePath: next });
      if (idea) pendingIdea = { path: next, text: idea };
      disposeContent = mountStudio(ctx, holder, next, t, {
        view, compact, chooseProject: picker, openWorkspace: () => open(next),
        idea: !compact && pendingIdea?.path === next ? pendingIdea.text : '', ideaDraft: text => { if (pendingIdea?.path === next) pendingIdea = text ? { path: next, text } : null; },
        closeProject: launcher ? closeProject : null,
        dock: docked ? dock : null, showTimeline: () => ctx.openView?.('timeline', { location: 'bottom' }),
        chat: docked && chatFolder(next) ? chat : null,
        showInMain: () => { view.setParams?.({ filePath: next }); view.showInMainPanel?.(); },
        openMini: ctx.openMiniPanel ? () => ctx.openMiniPanel('preview', { title: t('mini-preview'), params: { filePath: next }, mainViewId: 'studio', mainViewParams: { filePath: next } }) : null,
        openFloating: ctx.openFloatingPanel ? () => ctx.openFloatingPanel('studio', { title: t('app'), params: { filePath: next }, width: 1120, height: 820, minWidth: 480, minHeight: 580 }) : null,
      });
      if (jump) {
        // 0 swapped: the bin is already there (a switch, a restored layout) — then leave the bottom panel as the
        // person left it (⌘J). Never fall back to openView for the bin: that would expand a collapsed side.
        const swapped = ctx.replaceView('nav', 'media');
        if (swapped || (fromLaunch && !initial)) {
          // the conversation first: the properties open after it (when the file is read) and stay in front
          if (chatFolder(next)) chat.reveal();
          ctx.openView?.('timeline', { location: 'bottom' });
        }
      }
      return true;
    }
    /** Back to the launchpad: save, unmount, forget the project as the one to reopen. */
    async function closeProject() {
      if (!path) return;
      const gen = ++request, closing = path;
      if (await disposeContent?.flush?.() === false || disposed || gen !== request) return;
      // Tearing down remounts this view (the host rebuilds the column as its panels change), and a new mount opens
      // filePath || selected || the remembered project: all three have to be clear before anything below runs.
      await remember(null);
      if (disposed || gen !== request) return;
      if (selected === closing) selected = null;
      view.setParams?.({ filePath: '' });
      view.extendView?.close(); disposeContent?.(); holder.replaceChildren(); path = null;
      emit();
      launch();
    }
    function launch() {
      // another studio tab may still hold a project: the bin and the timeline stay with it
      if (jump && !dock.size()) { ctx.replaceView('media', 'nav'); ctx.closeView?.('timeline'); if (canChat) ctx.closeView?.('chat'); }
      disposeContent = launcher ? launchpad(holder, (p, idea) => show(p, { idea })) : library(holder, show, true);
    }
    const record = { show, compact, launcher, leave: closeProject }; mounts.add(record);
    const unsubscribe = view.onParamsChanged?.(params => { if (valid(params.filePath)) void show(params.filePath); });
    (async () => {
      let last = null; try { last = (await ctx.loadData?.())?.last; } catch { /* no data */ }
      const initial = () => view.getParams?.().filePath || selected || last;
      // the project to reopen is a file in the library; with nothing to reopen the launchpad shows at once
      if (valid(initial())) await libraryReady();
      if (disposed || path) return;
      if (valid(initial())) await show(initial(), { initial: true });
      if (!disposed && !path) launch();
    })();
    return () => { disposed = true; request++; mounts.delete(record); unsubscribe?.(); view.extendView?.close(); disposeContent?.(); holder.remove(); };
  }

  /** The Space's left side while no project is open (Coding Studio's launch navigation). */
  function mountNav(el) {
    const item = (page, glyph, key, run) => h('button', { type: 'button', class: 'fvs-nav-item', 'data-nav': page, onclick: run }, icon(glyph), h('span', { text: t(key) }));
    const pages = [item('create', 'Plus', 'new-video', () => void go('create')), item('projects', 'LayoutGrid', 'launch-projects', () => void go('projects'))];
    const shell = h('nav', { class: 'fvs-extension fvs-nav', 'aria-label': t('workspace-welcome') }, h('style', { text: CSS }),
      h('div', { class: 'fvs-nav-brand' }, h('span', { class: 'fvs-nav-mark' }, icon('Clapperboard')), h('strong', { text: t('workspace-welcome') })),
      h('div', { class: 'fvs-nav-section' }, h('span', { class: 'fvs-nav-heading', text: t('nav-create') }), ...pages),
      h('div', { class: 'fvs-nav-section' }, h('span', { class: 'fvs-nav-heading', text: t('nav-examples') }), item('example', 'Film', 'nav-example', example)));
    const paint = () => { for (const b of pages) if (!selected && b.dataset.nav === nav.page) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); };
    el.append(shell); listeners.add(paint); paint();
    return () => { listeners.delete(paint); shell.remove(); };
  }

  /** The open project's media (its media/, audio/ and assets/ folders, and generated/, where the host's image tool
   *  writes) on the Space's left side: import into it, drag a file to a cut on the timeline,
   *  or double-click it to add it at the playhead. */
  function mountBin(el) {
    const input = h('input', { type: 'file', multiple: true, hidden: true, accept: 'image/*,video/*,audio/*' });
    const importBtn = h('button', { type: 'button', class: 'fvs-btn ghost', 'data-bin': 'import', title: t('bin-import-hint'), onclick: () => input.click() }, icon('Upload'), h('span', { text: t('bin-import') }));
    // one filter at a time: a kind, the files no scene uses yet, or the generated ones
    const FILTERS = ['all', 'image', 'video', 'audio', '-', 'unused', 'ai'];
    let filter = 'all';
    const filterName = h('span'), count = h('span', { class: 'fvs-bin-count' });
    const filterBtn = h('button', { type: 'button', class: 'fvs-btn ghost', 'data-bin': 'filter', 'aria-haspopup': 'menu', title: t('bin-filter'),
      onclick: () => openMenu(filterBtn, FILTERS.map(f => (f === '-' ? f : { label: t(`bin-filter-${f}`), checked: filter === f, run: () => { filter = f; show(); } })), { label: t('bin-filter') }) }, icon('ListFilter'), filterName, icon('ChevronDown'));
    const grid = h('div', { class: 'fvs-bin-grid' }), empty = h('p', { class: 'fvs-hint fvs-bin-empty' });
    const shell = h('div', { class: 'fvs-extension fvs-bin' }, h('style', { text: CSS }),
      h('div', { class: 'fvs-bin-head' }, h('strong', { text: t('bin') }), h('span', { class: 'fvs-grow' }), importBtn),
      h('div', { class: 'fvs-bin-tools' }, filterBtn, h('span', { class: 'fvs-grow' }), count), input, empty, grid);
    el.append(shell);
    let studio = null, items = [], gen = 0, disposed = false, shown = null;
    const store = async files => { if (studio && files.length) { await studio.store(files); void scan(); } };
    input.onchange = () => { const files = [...input.files]; input.value = ''; void store(files); };
    // files from the computer dropped here are stored in the project, not placed
    const fromDisk = e => !!studio && [...(e.dataTransfer?.types || [])].includes('Files');
    shell.addEventListener('dragover', e => { if (!fromDisk(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; shell.classList.add('dropping'); });
    shell.addEventListener('dragleave', e => { if (!shell.contains(e.relatedTarget)) shell.classList.remove('dropping'); });
    shell.addEventListener('drop', e => { shell.classList.remove('dropping'); if (!fromDisk(e)) return; e.preventDefault(); void store([...e.dataTransfer.files]); });
    async function scan() {
      const g = ++gen; studio = dock.top();
      let all = [];
      if (studio) try { all = await app.listFiles?.() || []; } catch { all = []; }
      if (g !== gen || disposed) return;
      const dir = studio ? dirOf(studio.path) : '';
      items = all.map(p => ({ path: p, rel: !dir ? p : p.startsWith(`${dir}/`) ? p.slice(dir.length + 1) : '' }))
        .filter(x => /^(media|audio|assets|generated)\//.test(x.rel) && !x.rel.split('/').some(part => part.startsWith('.')) && ['image', 'video', 'audio'].includes(KIND(x.rel)))
        .sort((a, b) => a.rel.localeCompare(b.rel));
      // the same files for the same studio keep their tiles: a repaint would reload every thumbnail
      const key = `${studio?.path}\n${items.map(x => x.path).join('\n')}`;
      if (key === shown) badges(); else { shown = key; paint(); }
    }
    /** What a file can do besides being dragged. Renaming and deleting wait for the host: ctx.app has no seam for
     *  either (2026-10-04), so they show what is missing instead of pretending. */
    const menu = (anchor, x) => openMenu(anchor, [
      { label: t('bin-place'), icon: 'Plus', run: () => void studio?.place(x.path) },
      app.reveal ? { label: t('bin-reveal'), icon: 'FolderOpen', run: () => app.reveal(x.path) } : null,
      '-', { heading: t('bin-needs-host') },
      { label: t('bin-rename'), icon: 'Pencil', disabled: true, run() {} },
      { label: t('bin-delete'), icon: 'Trash2', danger: true, disabled: true, run() {} },
    ], { label: x.rel });
    function tile(x) {
      const kind = KIND(x.rel), url = app.assetUrl?.(x.path), thumb = h('span', { class: 'fvs-bin-thumb' });
      if (url && kind === 'image') thumb.append(h('img', { src: url, alt: '', loading: 'lazy', draggable: 'false' }));
      else if (url && kind === 'video') thumb.append(h('video', { src: `${url}#t=0.1`, preload: 'metadata', muted: true, playsinline: true, tabindex: '-1' }));
      else thumb.append(icon(kind === 'audio' ? 'Music2' : 'Film'));
      const ai = x.rel.startsWith('generated/');
      return h('button', { type: 'button', class: 'fvs-bin-item', draggable: 'true', 'data-rel': x.rel, 'data-kind': kind, 'data-ai': ai ? '' : null,
        title: `${x.rel}\n${t('bin-hint')}`,
        ondragstart: e => { e.dataTransfer.setData(BIN_MIME, JSON.stringify({ path: x.path })); e.dataTransfer.effectAllowed = 'copy'; },
        ondblclick: () => void studio?.place(x.path),
        onclick: e => { if (e.detail === 0) void studio?.place(x.path); }, // Enter or Space
        oncontextmenu: e => { e.preventDefault(); menu(e.currentTarget, x); },
      }, thumb, h('span', { class: 'fvs-bin-name', text: x.rel.split('/').pop() }), h('span', { class: 'fvs-bin-used', text: t('bin-used'), hidden: true }),
      ai ? h('span', { class: 'fvs-bin-ai', text: t('bin-ai') }) : null);
    }
    /** Apply the filter. Tiles stay mounted (their thumbnails are loaded); the ones outside it hide. */
    function show() {
      let on = 0;
      for (const b of grid.children) {
        const match = filter === 'all' || (filter === 'unused' ? b.querySelector('.fvs-bin-used').hidden : filter === 'ai' ? 'ai' in b.dataset : b.dataset.kind === filter);
        b.hidden = !match; if (match) on++;
      }
      filterName.textContent = t(`bin-filter-${filter}`);
      filterBtn.setAttribute('aria-pressed', String(filter !== 'all'));
      count.textContent = items.length ? (filter === 'all' ? String(items.length) : `${on} / ${items.length}`) : '';
      empty.textContent = !studio ? t('bin-no-project') : !items.length ? t('bin-empty') : on ? '' : t('bin-filter-none');
      empty.hidden = !empty.textContent;
    }
    let seen = null;
    // ponytail: "used" = the project text mentions the path; a file named in a comment counts too
    const badges = () => { seen = studio?.text() ?? null; for (const b of grid.children) b.querySelector('.fvs-bin-used').hidden = !seen?.includes(b.dataset.rel); show(); };
    function paint() {
      importBtn.disabled = filterBtn.disabled = !studio;
      grid.replaceChildren(...items.map(tile));
      badges();
    }
    // edits change the badges; imports, the timeline's drops and the Director add files
    const timer = setInterval(() => { if (studio && studio.text() !== seen) badges(); }, 1000);
    const poll = setInterval(() => { if (shell.isConnected) void scan(); }, 6000);
    const off = dock.watch(() => void scan()); void scan();
    // (a menu of the bin hangs on the page, not in the bin: it goes with it)
    return () => { disposed = true; clearInterval(timer); clearInterval(poll); off(); closeLayer(); shell.remove(); };
  }

  ctx.registerView?.({ id: 'studio', title: t('app'), icon: 'embed', workspaceSource: 'projects', singleton: true, mount: (el, view) => mountWorkspace(el, view) });
  ctx.registerView?.({ id: 'preview', title: t('mini-preview'), icon: 'embed', singleton: true, mount: (el, view) => mountWorkspace(el, view, true) });
  ctx.registerView?.({ id: 'timeline', title: t('timeline'), icon: 'layout', singleton: true, mount: el => mountTimeline(el) });
  ctx.registerView?.({ id: 'nav', title: t('workspace-welcome'), icon: 'list-view', singleton: true, mount: el => mountNav(el) });
  ctx.registerView?.({ id: 'media', title: t('bin'), icon: 'image', singleton: true, mount: el => mountBin(el) });
  if (canChat) ctx.registerView?.({ id: 'chat', title: t('chat'), icon: 'quote', singleton: true, mount: el => mountChat(el) });
  ctx.registerListSource?.({
    id: 'projects', title: t('projects'), items: filter => rows(filter?.query), search: true, activeKey: () => selected,
    subscribe(fn) { listeners.add(fn); void refresh(); const poll = setInterval(refresh, 8000); return () => { listeners.delete(fn); clearInterval(poll); }; },
    open: row => open(row.key),
    actions: [{ id: 'new', label: t('new-project-short'), primary: true, run: newProject }, { id: 'example', label: t('open-example'), run: example }, { id: 'refresh', label: t('refresh-projects'), run: refresh }],
  });
  ctx.registerCommand({ id: 'fvs-open-studio', title: t('open-workspace'), keywords: 'video studio space 视频工作室 空间', run: () => ctx.openView?.('studio') });
  return { open, newProject, example };
}
