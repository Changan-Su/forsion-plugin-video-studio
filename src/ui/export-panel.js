import { h, dirOf, joinPath, randomId } from './util.js';
import { handOff, ensureTools } from './ai.js';
import { exportHtml } from './exporter.js';
import { CSS } from './styles.js';

const clock = t => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;

export function exportController(ctx, state, assets, t, flush) {
  const app = ctx.app, path = state().path, dir = dirOf(path);
  const stem = path.split('/').pop().replace(/\.fvs\.md$/i, '');
  const index = joinPath(dir, `.fvs-jobs/${stem}.latest.json`);
  const listeners = new Set(); let job = null, disposed = false, reading = false, starting = false;
  const emit = () => listeners.forEach(fn => fn());
  const active = () => job && !['done', 'failed', 'cancelled'].includes(job.status);
  async function refresh() {
    if (reading || disposed) return; reading = true;
    try {
      const latest = JSON.parse(await app.readFile(index) || 'null');
      if (latest?.record) { const next = JSON.parse(await app.readFile(latest.record) || 'null'); if (next?.id === latest.id) job = { ...next, sessionId: latest.sessionId || next.sessionId }; }
      if (job?.sessionId && job.status === 'queued') {
        const status = ctx.tangu?.agentStatus?.(job.sessionId);
        if (status?.phase === 'error' || status?.phase === 'done') {
          const fresh = JSON.parse(await app.readFile(job.record) || 'null');
          if (fresh?.status === 'queued') { job = { ...job, status: 'failed', error: t('export-agent-ended') }; await app.writeFile(job.record, JSON.stringify(job)); }
          else if (fresh) job = { ...fresh, sessionId: job.sessionId };
        }
      }
      emit();
    } catch { /* Missing/partial status is retried; it is never treated as success. */ }
    finally { reading = false; }
  }
  const timer = setInterval(refresh, 1000); void refresh();
  async function cancel() { if (!active()) return; await app.writeFile(job.record + '.cancel', 'cancel\n'); if (job.status === 'queued') { job = { ...job, status: 'cancelled' }; await app.writeFile(job.record, JSON.stringify(job)); } emit(); }
  async function start(options) {
    if (starting || active()) return; starting = true;
    try {
      if (!await flush()) throw new Error(t('export-save-first'));
      const s = state();
      if (!s.trusted || s.p.errors.some(e => e.level === 'error')) throw new Error(t('export-invalid'));
      if (!app.hostPath?.(path)) throw new Error(t('export-host-only'));
      // the fields show three decimals: allow that much rounding past either end, then clamp
      const from = Math.max(0, Number(options.from)), to = Math.min(s.p.length, Number(options.to));
      if (!Number.isFinite(from) || !Number.isFinite(to) || Number(options.from) < -1e-3 || Number(options.to) > s.p.length + 1e-3 || to <= from) throw new Error(t('export-range-invalid'));
      options = { ...options, from, to };
      const id = randomId(), record = joinPath(dir, `.fvs-jobs/${id}.json`);
      const out = joinPath(dir, `${stem}-${Date.now()}.mp4`);
      const snapshot = joinPath(dir, `.fvs-jobs/${id}.source.txt`); await app.writeFile(snapshot, s.text);
      const tools = await ensureTools(ctx);
      job = { v: 1, id, status: 'queued', progress: 0, record, outPath: out, project: app.hostPath(path), sourceSnapshot: app.hostPath(snapshot), out: app.hostPath(out), options, createdAt: new Date().toISOString() };
      await app.writeFile(record, JSON.stringify(job, null, 2));
      await app.writeFile(index, JSON.stringify({ id, record })); emit();
      const quote = value => "'" + String(value).replaceAll("'", "'\\''") + "'";
      const command = `node ${quote(tools.cliAbs || tools.cli)} render-job ${quote(app.hostPath(record))}`;
      const task = `Task: execute this Video Studio export job.\nRun this exact command in the project directory:\n${command}\nThe CLI performs environment checks and writes real status/progress to the job JSON. It honours the adjacent .cancel file. Do not edit the project or job options. If dependencies are missing, locate or install the browser driver/ffmpeg, then rerun the command only if the job is still active (otherwise create a fresh retry from the UI). If you cannot run it, write status="failed" and a short error into ${JSON.stringify(app.hostPath(record))}, preserving other fields. After success, verify the MP4 duration and a few frames and report its path. Never claim success unless the job JSON status is done.`;
      const ok = await handOff(ctx, s, task, t, { onStarted(r) { job.sessionId = r.sessionId; } });
      if (!ok) { job.status = 'failed'; job.error = t('ai-no-host'); }
      // Session identity belongs to the UI index. The CLI is the sole progress writer once started.
      await app.writeFile(index, JSON.stringify({ id, record, sessionId: job.sessionId }));
      if (!ok) await app.writeFile(record, JSON.stringify(job, null, 2));
      await refresh(); emit();
    } finally { starting = false; }
  }
  function mount(body) {
    const s = state();
    const root = h('section', { class: 'fvs-extension fvs-export-panel' }, h('style', { text: CSS }));
    const field = (key, control) => h('div', { class: 'fvs-field' }, h('span', { text: t(key) }), control);
    /* a segmented control backed by a value; `data-export` keeps the old hooks for tests and the agent */
    function segmented(key, hook, options, value) {
      const group = h('div', { class: 'fvs-segmented', role: 'radiogroup', 'aria-label': t(key), 'data-export': hook });
      group.value = String(value);
      const paint = () => { for (const b of group.children) b.setAttribute('aria-checked', String(b.dataset.value === group.value)); };
      for (const [v, label] of options) group.append(h('button', { type: 'button', role: 'radio', 'data-value': String(v), onclick: () => { group.value = String(v); paint(); edited = true; render(); } }, label));
      group.set = v => { group.value = String(v); paint(); };
      paint();
      return group;
    }
    const W = +s.p.meta.width, H = +s.p.meta.height, even = x => Math.floor(x / 2) * 2;
    const scale = segmented('export-size', 'scale', [[1, `${W} × ${H}`], [.5, `${even(W / 2)} × ${even(H / 2)}`], [.25, `${even(W / 4)} × ${even(H / 4)}`]], 1);
    const fps = h('select', { class: 'fvs-input', 'data-export': 'fps' }, ...[s.p.meta.fps, ...[24, 30, 60].filter(v => v !== s.p.meta.fps)].map(v => h('option', { value: v, text: `${v} fps` })));
    const quality = segmented('export-quality', 'crf', [[18, t('export-quality-high')], [23, t('export-quality-balanced')], [28, t('export-quality-small')]], 18);
    const range = segmented('export-range', 'range', [['all', t('export-range-all')], ['scene', t('export-range-scene')], ['custom', t('export-range-custom')]], 'all');
    const from = h('input', { class: 'fvs-input', 'data-export': 'from', type: 'number', min: 0, max: s.p.length, step: .01, value: 0, 'aria-label': t('export-from') });
    const to = h('input', { class: 'fvs-input', 'data-export': 'to', type: 'number', min: 0, max: s.p.length, step: .01, value: +s.p.length.toFixed(3), 'aria-label': t('export-to') });
    const custom = h('div', { class: 'fvs-row' }, field('export-from', from), field('export-to', to));
    const audio = h('input', { type: 'checkbox', checked: true, 'data-export': 'audio' });
    const captions = h('input', { type: 'checkbox', checked: true, 'data-export': 'captions' });
    const captionsRow = h('label', { class: 'fvs-check' }, captions, t('export-captions'));
    const summary = h('div', { class: 'fvs-summary' }, h('span'), h('span'));
    const status = h('div', { class: 'fvs-export-status', role: 'status', 'aria-live': 'polite', hidden: true });
    const message = h('p', { class: 'fvs-hint', role: 'alert' });
    // the range buttons write real seconds into from/to, so a job always records what it rendered
    const applyRange = () => {
      const sc = state().p.scenes.find(x => x.id === state().sel);
      if (range.value === 'all') { from.value = 0; to.value = +state().p.length.toFixed(3); }
      if (range.value === 'scene' && sc) { from.value = +sc.t0.toFixed(3); to.value = +sc.t1.toFixed(3); }
    };
    const go = h('button', { type: 'button', class: 'fvs-btn primary', 'data-export': 'start', onclick: async () => {
      go.disabled = true; message.textContent = '';
      try { applyRange(); await start({ scale: +scale.value, fps: +fps.value, crf: +quality.value, from: +from.value, to: +to.value, workers: 3, 'no-audio': !audio.checked, ...(captions.checked ? {} : { 'no-captions': true }) }); }
      catch (e) { message.textContent = String(e.message || e); }
      finally { if (!disposed) go.disabled = !!active(); }
    } }, t('export-start'));
    let hydrated = false, edited = false;
    const render = () => {
      if (job?.options && !hydrated) {
        if (!edited) {
          const o = job.options; scale.set(o.scale); fps.value = o.fps; quality.set(o.crf); from.value = +Number(o.from).toFixed(3); to.value = +Number(o.to).toFixed(3); audio.checked = !o['no-audio']; captions.checked = !o['no-captions'];
          range.set(Math.abs(o.from) < 1e-3 && Math.abs(o.to - state().p.length) < 1e-3 ? 'all' : 'custom');
        }
        hydrated = true;
      }
      const sc = state().p.scenes.find(x => x.id === state().sel);
      range.querySelector('[data-value="scene"]').disabled = !sc;
      if (range.value === 'scene' && !sc) range.set('all');
      applyRange();
      custom.hidden = range.value !== 'custom';
      captionsRow.hidden = !(state().p.captions || []).length;
      const k = +scale.value;
      summary.children[0].textContent = `${even(W * k)} × ${even(H * k)} · ${fps.value} fps`;
      summary.children[1].textContent = `${clock(Math.max(0, +to.value - +from.value))}`;
      go.disabled = !!active();
      status.replaceChildren(); status.hidden = !job;
      if (!job) return;
      status.append(h('strong', { text: t(`export-status-${job.status}`) }), h('progress', { max: 100, value: job.progress || 0, 'aria-label': t('export-progress') }),
        h('small', { text: `${job.progress || 0}%${job.completedFrames ? ` · ${job.completedFrames}/${job.totalFrames}` : ''}` }));
      if (job.error) status.append(h('p', { class: 'fvs-hint', text: job.error }));
      const actions = h('div', { class: 'fvs-row' });
      if (active()) actions.append(h('button', { type: 'button', class: 'fvs-btn', 'data-export': 'cancel', onclick: cancel }, t('export-cancel')));
      if (job.status === 'failed' || job.status === 'cancelled') actions.append(h('button', { type: 'button', class: 'fvs-btn', 'data-export': 'retry', onclick: async () => { try { await start(job.options); } catch (e) { message.textContent = String(e.message || e); } } }, t('export-retry')));
      if (job.status === 'done') {
        status.append(h('small', { text: `${job.outPath.split('/').pop()} · ${(job.bytes / 1048576).toFixed(1)} MB`, title: job.outPath }));
        actions.append(h('button', { type: 'button', class: 'fvs-btn', onclick: () => app.openFile(job.outPath) }, t('export-preview')));
      }
      if (actions.children.length) status.append(actions);
    };
    const web = h('button', { type: 'button', class: 'fvs-btn', onclick: async () => {
      message.textContent = '';
      try { if (!await flush()) throw new Error(t('export-save-first')); const out = await exportHtml(ctx, state().p, path, assets); ctx.notify?.(t('exported', { path: out })); }
      catch (e) { message.textContent = String(e.message || e); }
    } }, t('export-html'));
    root.append(h('div', { class: 'fvs-panel-shell' },
      h('div', { class: 'fvs-panel-scroll' },
        h('p', { class: 'fvs-hint', text: t('export-intro') }),
        field('export-size', scale), field('project-fps', fps), field('export-quality', quality),
        field('export-range', range), custom,
        h('label', { class: 'fvs-check' }, audio, t('export-audio')), captionsRow,
        summary, status, message),
      h('div', { class: 'fvs-form-actions', 'data-hook': 'form-actions' }, go, web)));
    for (const control of [fps, from, to, audio, captions]) control.addEventListener('input', () => { edited = true; render(); });
    listeners.add(render); body.append(root); render();
    return () => { listeners.delete(render); root.remove(); };
  }
  return { mount, refresh, dispose() { disposed = true; clearInterval(timer); listeners.clear(); } };
}
