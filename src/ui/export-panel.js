import { h, dirOf, joinPath, randomId } from './util.js';
import { handOff, ensureTools } from './ai.js';
import { exportHtml } from './exporter.js';
import { CSS } from './styles.js';

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
        if (status?.phase === 'error' || status?.phase === 'done') { job = { ...job, status: 'failed', error: t('export-agent-ended') }; await app.writeFile(job.record, JSON.stringify(job)); }
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
      const from = Number(options.from), to = Number(options.to);
      if (!Number.isFinite(from) || !Number.isFinite(to) || from < 0 || to <= from || to > s.p.length) throw new Error(t('export-range-invalid'));
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
    const s = state(), root = h('section', { class: 'fvs-extension fvs-export-panel' }, h('style', { text: CSS }));
    const field = (key, input) => h('label', { class: 'fvs-field' }, h('span', { text: t(key) }), input);
    const select = (key, values) => h('select', { class: 'fvs-input', 'data-export': key }, ...values.map(([value, text]) => h('option', { value, text })));
    const scale = select('scale', [[1, t('export-original')], [.5, '50%'], [.25, '25%']]);
    const fps = select('fps', [[s.p.meta.fps, `${s.p.meta.fps} fps`], ...[24, 30, 60].filter(v => v !== s.p.meta.fps).map(v => [v, `${v} fps`])]);
    const quality = select('crf', [[18, t('export-quality-high')], [23, t('export-quality-balanced')], [28, t('export-quality-small')]]);
    const from = h('input', { class: 'fvs-input', 'data-export': 'from', type: 'number', min: 0, max: s.p.length, step: .01, value: 0 });
    const to = h('input', { class: 'fvs-input', 'data-export': 'to', type: 'number', min: 0, max: s.p.length, step: .01, value: +s.p.length.toFixed(3) });
    const audio = h('input', { type: 'checkbox', checked: true, 'data-export': 'audio' });
    const dimensions = h('p', { class: 'fvs-hint' });
    const status = h('div', { class: 'fvs-export-status', role: 'status', 'aria-live': 'polite' });
    const go = h('button', { class: 'fvs-btn primary', 'data-export': 'start', text: t('export-start'), onclick: async () => {
      go.disabled = true;
      try { await start({ scale: +scale.value, fps: +fps.value, crf: +quality.value, from: +from.value, to: +to.value, workers: 3, 'no-audio': !audio.checked }); }
      catch (e) { status.textContent = String(e.message || e); }
      finally { if (!disposed) go.disabled = !!active(); }
    } });
    let hydrated = false, edited = false;
    const render = () => {
      if (job?.options && !hydrated) {
        if (!edited) { const o = job.options; scale.value = o.scale; fps.value = o.fps; quality.value = o.crf; from.value = +Number(o.from).toFixed(3); to.value = +Number(o.to).toFixed(3); audio.checked = !o['no-audio']; }
        hydrated = true;
      }
      dimensions.textContent = `${Math.floor(s.p.meta.width * +scale.value / 2) * 2} × ${Math.floor(s.p.meta.height * +scale.value / 2) * 2} · ${Math.max(0, +to.value - +from.value).toFixed(2)} s`;
      go.disabled = !!active(); status.replaceChildren();
      if (!job) return;
      status.append(h('strong', { text: t(`export-status-${job.status}`) }), h('progress', { max: 100, value: job.progress || 0, 'aria-label': t('export-progress') }), h('small', { text: `${job.progress || 0}%${job.completedFrames ? ` · ${job.completedFrames}/${job.totalFrames}` : ''}` }));
      if (job.error) status.append(h('p', { class: 'fvs-hint', text: job.error }));
      if (active()) status.append(h('button', { class: 'fvs-btn', 'data-export': 'cancel', onclick: cancel, text: t('export-cancel') }));
      if (job.status === 'failed' || job.status === 'cancelled') status.append(h('button', { class: 'fvs-btn', 'data-export': 'retry', onclick: async () => { try { await start(job.options); } catch (e) { status.textContent = String(e.message || e); } }, text: t('export-retry') }));
      if (job.status === 'done') status.append(h('p', { class: 'fvs-hint', text: `${job.outPath} · ${(job.bytes / 1048576).toFixed(1)} MB` }), h('button', { class: 'fvs-btn primary', onclick: () => app.openFile(job.outPath), text: t('export-preview') }));
    };
    const scene = h('button', { class: 'fvs-btn', text: t('export-selected'), onclick: () => { const sc = state().p.scenes.find(x => x.id === state().sel); if (sc) { from.value = sc.t0; to.value = sc.t1; render(); } } });
    root.append(h('h3', { text: t('export-mp4') }), h('p', { class: 'fvs-hint', text: t('export-intro') }),
      field('export-size', scale), field('project-fps', fps), field('export-quality', quality),
      h('div', { class: 'fvs-row' }, field('export-from', from), field('export-to', to)), scene,
      h('label', { class: 'fvs-row' }, audio, t('export-audio')), dimensions, status,
      h('div', { class: 'fvs-form-actions', 'data-hook': 'form-actions' }, go,
        h('button', { class: 'fvs-btn', text: t('export-html'), onclick: async () => { try { if (!await flush()) throw new Error(t('export-save-first')); const out = await exportHtml(ctx, state().p, path, assets); ctx.notify?.(t('exported', { path: out })); } catch (e) { status.textContent = String(e.message || e); } } })));
    for (const input of [scale, fps, quality, from, to, audio]) input.addEventListener('input', () => { edited = true; render(); });
    listeners.add(render); body.append(root); render();
    return () => { listeners.delete(render); root.remove(); };
  }
  return { mount, refresh, dispose() { disposed = true; clearInterval(timer); listeners.clear(); } };
}
