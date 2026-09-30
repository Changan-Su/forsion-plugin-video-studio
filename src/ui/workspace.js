import { mountStudio } from './studio.js';
import { h } from './util.js';
import { icon } from './icons.js';
import { CSS } from './styles.js';

// Only public plugin contracts cross the host boundary. No host stores or second React runtime.
export function registerWorkspace(ctx, t, { createProject, exampleProject, remember }) {
  const app = ctx.app || {}, listeners = new Set(), mounts = new Set();
  let selected = null, paths = [], generation = 0;
  const emit = () => listeners.forEach(fn => fn());
  const valid = path => typeof path === 'string' && path.toLowerCase().endsWith('.fvs.md');
  const rows = query => paths.filter(p => p.toLocaleLowerCase().includes((query || '').toLocaleLowerCase()))
    .map(p => ({ key: p, title: p.split('/').pop().replace(/\.fvs\.md$/i, ''), hint: p.slice(0, p.lastIndexOf('/')), icon: 'layout' }));
  async function refresh() {
    const gen = ++generation, root = app.vaultRoot?.();
    let found = [];
    try { found = await app.listFiles?.() || []; } catch { /* no vault */ }
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    const next = [...new Set(found.filter(valid))].sort((a, b) => a.localeCompare(b)), active = selected;
    if (active && !next.includes(active) && await app.readFile(active).catch(() => null) !== null) next.push(active);
    if (gen !== generation || root !== app.vaultRoot?.()) return;
    paths = next;
    emit();
  }
  function open(path) {
    if (!valid(path)) return;
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

  function mountWorkspace(el, view = {}, compact = false) {
    let disposed = false, disposeContent = null, path = null, request = 0;
    const holder = h('div', { class: 'fvs-workspace-host' }); el.append(holder);
    const picker = async () => {
      if (view.extendView) view.extendView.open({ id: 'fvs-projects', title: t('projects'), side: 'left',
        mount(body, handle) { return library(body, p => { handle.close(); show(p); }); } });
      else {
        if (await disposeContent?.flush?.() === false || disposed) return;
        disposeContent?.(); holder.replaceChildren(); path = null; disposeContent = library(holder, show);
      }
    };
    async function show(next) {
      if (!valid(next)) return;
      if (next === path) return;
      const gen = ++request;
      if (await app.readFile(next).catch(() => null) === null || disposed || gen !== request) return;
      if (await disposeContent?.flush?.() === false || disposed || gen !== request) return;
      view.extendView?.close(); disposeContent?.(); holder.replaceChildren(); path = next;
      if (!compact) { selected = next; remember(next); emit(); }
      if (view.getParams?.().filePath !== next) view.setParams?.({ filePath: next });
      disposeContent = mountStudio(ctx, holder, next, t, {
        view, compact, chooseProject: picker, openWorkspace: () => open(next),
        showInMain: () => { view.setParams?.({ filePath: next }); view.showInMainPanel?.(); },
        openMini: ctx.openMiniPanel ? () => ctx.openMiniPanel('preview', { title: t('mini-preview'), params: { filePath: next }, mainViewId: 'studio', mainViewParams: { filePath: next } }) : null,
        openFloating: ctx.openFloatingPanel ? () => ctx.openFloatingPanel('studio', { title: t('app'), params: { filePath: next }, width: 1120, height: 820, minWidth: 480, minHeight: 580 }) : null,
      });
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
  ctx.registerListSource?.({
    id: 'projects', title: t('projects'), items: filter => rows(filter?.query), search: true, activeKey: () => selected,
    subscribe(fn) { listeners.add(fn); void refresh(); const poll = setInterval(refresh, 8000); return () => { listeners.delete(fn); clearInterval(poll); }; },
    open: row => open(row.key),
    actions: [{ id: 'new', label: t('new-project'), primary: true, run: newProject }, { id: 'example', label: t('open-example'), run: example }, { id: 'refresh', label: t('refresh-projects'), run: refresh }],
  });
  ctx.registerCommand({ id: 'fvs-open-studio', title: t('open-workspace'), keywords: 'video studio space 视频工作室 空间', run: () => ctx.openView?.('studio') });
  return { open, newProject, example };
}
