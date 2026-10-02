import { mountStudio } from './studio.js';
import { h } from './util.js';
import { icon } from './icons.js';
import { CSS } from './styles.js';
import { parseProject } from '../lib/project.js';

// Only public plugin contracts cross the host boundary. No host stores or second React runtime.
export function registerWorkspace(ctx, t, { createProject, exampleProject, remember }) {
  const app = ctx.app || {}, listeners = new Set(), mounts = new Set();
  let selected = null, paths = [], generation = 0;
  const emit = () => listeners.forEach(fn => fn());
  const valid = path => typeof path === 'string' && path.toLowerCase().endsWith('.fvs.md');
  // render jobs, Director snapshots and other dot-folders hold temporary copies, not projects
  const listed = path => valid(path) && !path.split('/').some(part => part.startsWith('.'));
  const titles = new Map(); // path → the project's own title, read once per path
  const stemOf = p => p.split('/').pop().replace(/\.fvs\.md$/i, '');
  const rows = query => paths.map(p => ({ key: p, title: titles.get(p) || stemOf(p), hint: p.slice(0, p.lastIndexOf('/')), icon: 'layout' }))
    .filter(r => `${r.title} ${r.key}`.toLocaleLowerCase().includes((query || '').toLocaleLowerCase()));
  async function readTitles(list) {
    let changed = false;
    for (const p of list) {
      if (titles.has(p)) continue;
      let title = '';
      try { const text = await app.readFile(p); title = (text && parseProject(text).meta.title) || ''; } catch { title = ''; }
      titles.set(p, String(title).trim()); changed = true;
    }
    if (changed) emit();
  }
  async function refresh() {
    if (selected) titles.delete(selected); // ponytail: only the open project re-reads its title; others refresh when opened
    const gen = ++generation, root = app.vaultRoot?.();
    let found = [];
    try { found = await app.listFiles?.() || []; } catch { /* no vault */ }
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    const next = [...new Set(found.filter(listed))].sort((a, b) => a.localeCompare(b)), active = selected;
    if (active && !next.includes(active) && await app.readFile(active).catch(() => null) !== null) next.push(active);
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    paths = next;
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
  const newProject = safe(async () => open(await createProject(app.workFolder?.() || 'Forsion Video Studio', false)));
  const example = safe(async () => open(await exampleProject(false)));

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

  // One docked studio and one bottom-panel timeline per window: the timeline view shows that studio's timeline.
  const dock = (() => {
    let studio = null, host = null;
    const link = () => { host?.show(studio ? studio.timeline : null); studio?.attach(host ? host.shell : null); };
    return {
      studio(client) {
        studio?.attach(null); studio = client; link();
        return () => { if (studio !== client) return; studio = null; client.attach(null); host?.show(null); };
      },
      host(panel) {
        host = panel; link();
        return () => { if (host !== panel) return; host = null; studio?.attach(null); };
      },
    };
  })();
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
    // The Space recipe docks the timeline in the native bottom panel and says so in the studio's params; hosts
    // without a bottom panel for plugins (older, mobile) keep it inside the editor.
    const docked = !compact && view.surface !== 'floating' && view.getParams?.().timeline === 'bottom' && !!ctx.viewLocations?.includes('bottom');
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
    async function show(next) {
      if (!valid(next)) return false;
      if (next === path) return true;
      const gen = ++request;
      if (await app.readFile(next).catch(() => null) === null || disposed || gen !== request) return false;
      if (await disposeContent?.flush?.() === false || disposed || gen !== request) return false;
      view.extendView?.close(); disposeContent?.(); holder.replaceChildren(); path = next;
      if (!compact) { selected = next; remember(next); emit(); }
      if (view.getParams?.().filePath !== next) view.setParams?.({ filePath: next });
      disposeContent = mountStudio(ctx, holder, next, t, {
        view, compact, chooseProject: picker, openWorkspace: () => open(next),
        dock: docked ? dock : null, showTimeline: () => ctx.openView?.('timeline', { location: 'bottom' }),
        showInMain: () => { view.setParams?.({ filePath: next }); view.showInMainPanel?.(); },
        openMini: ctx.openMiniPanel ? () => ctx.openMiniPanel('preview', { title: t('mini-preview'), params: { filePath: next }, mainViewId: 'studio', mainViewParams: { filePath: next } }) : null,
        openFloating: ctx.openFloatingPanel ? () => ctx.openFloatingPanel('studio', { title: t('app'), params: { filePath: next }, width: 1120, height: 820, minWidth: 480, minHeight: 580 }) : null,
      });
      return true;
    }
    const record = { show, compact }; mounts.add(record);
    const unsubscribe = view.onParamsChanged?.(params => { if (valid(params.filePath)) void show(params.filePath); });
    (async () => {
      let last = null; try { last = (await ctx.loadData?.())?.last; } catch { /* no data */ }
      if (disposed || path) return;
      const initial = view.getParams?.().filePath || selected || last;
      if (valid(initial)) await show(initial);
      if (!disposed && !path) disposeContent = library(holder, show, true);
    })();
    return () => { disposed = true; request++; mounts.delete(record); unsubscribe?.(); view.extendView?.close(); disposeContent?.(); holder.remove(); };
  }

  ctx.registerView?.({ id: 'studio', title: t('app'), workspaceSource: 'projects', singleton: true, mount: (el, view) => mountWorkspace(el, view) });
  ctx.registerView?.({ id: 'preview', title: t('mini-preview'), singleton: true, mount: (el, view) => mountWorkspace(el, view, true) });
  ctx.registerView?.({ id: 'timeline', title: t('timeline'), singleton: true, mount: el => mountTimeline(el) });
  ctx.registerListSource?.({
    id: 'projects', title: t('projects'), items: filter => rows(filter?.query), search: true, activeKey: () => selected,
    subscribe(fn) { listeners.add(fn); void refresh(); const poll = setInterval(refresh, 8000); return () => { listeners.delete(fn); clearInterval(poll); }; },
    open: row => open(row.key),
    actions: [{ id: 'new', label: t('new-project-short'), primary: true, run: newProject }, { id: 'example', label: t('open-example'), run: example }, { id: 'refresh', label: t('refresh-projects'), run: refresh }],
  });
  ctx.registerCommand({ id: 'fvs-open-studio', title: t('open-workspace'), keywords: 'video studio space 视频工作室 空间', run: () => ctx.openView?.('studio') });
  return { open, newProject, example };
}
