import { h, dirOf, joinPath, randomId } from './util.js';
import { handOff, TASKS, AGENT } from './ai.js';
import { parseProject, cssBlocks, stageHtml, stageJs } from '../lib/project.js';
import { CSS } from './styles.js';

export function sceneChanges(before, after) {
  const a = parseProject(before), b = parseProject(after), changes = [];
  const left = new Map(a.scenes.map(s => [s.id, s])), right = new Map(b.scenes.map(s => [s.id, s]));
  const source = s => s ? JSON.stringify([s.title, s.meta, s.html, s.css, s.js]) : '';
  for (const id of new Set([...left.keys(), ...right.keys()])) {
    const x = left.get(id), y = right.get(id);
    if (source(x) !== source(y)) changes.push({ id, title: y?.title || x?.title || id, kind: !x ? 'added' : !y ? 'removed' : 'changed', before: source(x), after: source(y) });
  }
  const project = p => JSON.stringify({ meta: p.meta, order: p.scenes.map(s => s.id), css: cssBlocks(p), html: stageHtml(p), js: stageJs(p) }, null, 2);
  if (project(a) !== project(b)) changes.push({ id: 'project', title: '', kind: 'changed', before: project(a), after: project(b) });
  if (before !== after && !changes.length) changes.push({ id: 'source', title: '', kind: 'changed', before, after });
  return changes;
}

export function directorController(ctx, state, t, flush) {
  const app = ctx.app, path = state().path;
  const base = joinPath(dirOf(path), `.fvs-history/${path.split('/').pop().replace(/\.fvs\.md$/i, '')}`);
  const record = base + '.director.json';
  let task = null, before = '', after = '', disposed = false, reading = false, submitting = false;
  // Let the native picker resolve Agent/global defaults until the user makes a selection.
  let draft = { text: '', thinkingLevel: 'medium' };
  const listeners = new Set(), emit = () => listeners.forEach(fn => fn());
  async function refresh() {
    if (reading || disposed) return; reading = true;
    try {
      const data = JSON.parse(await app.readFile(record) || 'null');
      if (data) {
        task = data; before = await app.readFile(task.beforePath) || ''; after = await app.readFile(path) || '';
        task.phase = task.sessionId ? ctx.tangu?.agentStatus?.(task.sessionId)?.phase || 'idle' : 'waiting';
        task.changes = sceneChanges(before, after); emit();
      }
    } catch { /* No previous Director task. */ }
    finally { reading = false; }
  }
  const timer = setInterval(refresh, 1000); void refresh();
  async function submit(selection, specific) {
    if (submitting || !selection.text.trim()) return false;
    submitting = true;
    try {
      if (!await flush()) throw new Error(t('export-save-first'));
      const snapshot = state().text, id = randomId(), beforePath = base + `.${id}.before.txt`;
      await app.writeFile(beforePath, snapshot);
      const next = { id, beforePath, phase: 'waiting', scene: state().sel, time: state().time, createdAt: new Date().toISOString() };
      const ok = await handOff(ctx, state(), specific || TASKS.ask(selection.text.trim()), t, { ...selection, onStarted(r) { next.sessionId = r.sessionId; } });
      if (!ok) return false;
      await app.writeFile(record, JSON.stringify(next)); task = next; before = snapshot; draft.text = ''; emit(); return true;
    } catch (e) { ctx.notify?.(String(e.message || e), { level: 'warning' }); return false; }
    finally { submitting = false; }
  }
  function mount(body) {
    const root = h('section', { class: 'fvs-extension fvs-ai-panel fvs-director-panel' }, h('style', { text: CSS }));
    const summary = h('div', { class: 'fvs-director-summary', role: 'status', 'aria-live': 'polite' });
    const changes = h('div', { class: 'fvs-director-changes' });
    const input = h('div', { class: 'fvs-native-chatbox' });
    const context = h('p', { class: 'fvs-hint', text: `${state().p.scenes.find(s => s.id === state().sel)?.title || ''} · ${state().time.toFixed(2)} s` });
    let chat, textarea;
    const render = () => {
      summary.textContent = task ? t(`director-${task.phase}`) : t('director-intro'); changes.replaceChildren();
      if (!task?.changes?.length) return;
      changes.append(h('h4', { text: t('director-changes', { n: task.changes.length }) }));
      for (const row of task.changes) changes.append(h('details', {}, h('summary', { text: `${row.title || row.id} · ${t('director-' + row.kind)}` }),
        h('div', { class: 'fvs-change-columns' }, h('pre', { text: row.before.slice(0, 8000) || '—' }), h('pre', { text: row.after.slice(0, 8000) || '—' }))));
      const reviewed = after;
      changes.append(h('button', { class: 'fvs-btn', 'data-director': 'restore', text: t('director-restore'), disabled: !['idle', 'done', 'error'].includes(task.phase), onclick: async () => {
        try {
          if (!await flush() || await app.readFile(path) !== reviewed) throw new Error(t('director-stale'));
          const snapshot = await app.readFile(task.beforePath); if (snapshot === null) throw new Error(t('director-no-snapshot'));
          await app.writeFile(base + `.${randomId()}.reverted.txt`, reviewed);
          await app.writeFile(path, snapshot); await refresh();
        } catch (e) { ctx.notify?.(String(e.message || e), { level: 'warning' }); }
      } }));
    };
    const chips = [['ai-chip-scene'], ['ai-chip-pace'], ['ai-chip-copy'], ['ai-chip-score', TASKS.score], ['ai-chip-sync', TASKS.sync], ['ai-chip-review', TASKS.review]];
    const choose = (key, taskFn) => {
      if (taskFn) void submit({ ...draft, text: t(key) }, taskFn());
      else { draft.text = t(key) + (t.en() ? ': ' : '：'); if (chat) { chat.update({ value: draft.text }); chat.focus(); } else { textarea.value = draft.text; textarea.focus(); } }
    };
    root.append(h('h3', { text: t('ai-title') }), context, summary, changes,
      h('div', { class: 'fvs-chips' }, ...chips.map(([key, fn]) => h('button', { text: t(key), onclick: () => choose(key, fn) }))), input);
    body.append(root);
    // Older startChat hosts cannot honour the native model picker. Keep their plain prompt adapter.
    if (ctx.ui?.mountChatBox && ctx.tangu?.chatSelection) {
      chat = ctx.ui.mountChatBox(input, { ...draft, value: draft.text, agentSlug: AGENT, placeholder: t('ai-placeholder'), label: t('ai-title'), submitLabel: t('ai-send'), submitOn: 'modifier-enter', onChange(value) { draft = { ...value }; }, onSubmit: selection => submit(selection) });
      chat.focus();
    } else {
      textarea = h('textarea', { class: 'fvs-input', 'aria-label': t('ai-title'), placeholder: t('ai-placeholder') }); textarea.value = draft.text;
      textarea.oninput = () => { draft.text = textarea.value; };
      const send = async () => { if (await submit({ ...draft, text: textarea.value })) textarea.value = ''; };
      textarea.onkeydown = e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); void send(); } };
      input.append(textarea, h('button', { class: 'fvs-btn primary', text: t('ai-send'), onclick: send })); textarea.focus();
    }
    listeners.add(render); render(); void refresh();
    return () => { listeners.delete(render); chat?.dispose(); root.remove(); };
  }
  return { mount, dispose() { disposed = true; clearInterval(timer); listeners.clear(); } };
}
