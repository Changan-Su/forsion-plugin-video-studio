// The Video Studio editor for one .fvs.md file: stage, transport, timeline, inspector.
// The file text is the only state that matters: every edit is text → text through lib/project.js,
// undo is a stack of texts, and a change on disk (the AI editing the file) is just another text.
import * as P from '../lib/project.js';
import * as C from '../lib/compile.js';
import * as HT from '../lib/html.js';
import { onsetEnvelope, syncReport } from '../lib/onsets.js';
import { SCENE_TEMPLATES, sceneFromTemplate, mediaScene } from '../lib/scene-templates.js';
import RUNTIME from '../generated/runtime-src.js';
import { CSS as STUDIO_CSS } from './styles.js';
import { handOff, TASKS, rewrite, notify, ensureTools } from './ai.js';
import { exportHtml } from './exporter.js';
import { sceneThumbnails } from './thumbnails.js';
import { exportController } from './export-panel.js';
import { directorController } from './director-panel.js';
import { openMenu, openPopover, closeLayer } from './menu.js';
import { h, dirOf, joinPath, mimeOf, b64 } from './util.js';
import { icon } from './icons.js';
export { h, dirOf, joinPath, mimeOf, b64 };

const fmtTime = t => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
const typing = e => { const x = e.target; return x && (x.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(x.tagName)); };
const STREAM = /\.(mp4|m4v|webm|mov|ogv)$/i;
// a file dragged out of the media bin (the Space's left side): { path } in the vault
export const BIN_MIME = 'application/x-fvs-media';
export const KIND = name => (/\.(mp4|m4v|webm|mov)$/i.test(name) ? 'video' : /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(name) ? 'image' : /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(name) ? 'audio' : /\.(srt|vtt)$/i.test(name) ? 'captions' : null);
const MOD = /Mac|iPhone|iPad/.test(globalThis.navigator?.userAgent || '') ? '⌘' : 'Ctrl+';
const RULER_H = 24, CAPTION_H = 32, VIDEO_H = 64, AUDIO_H = 44; // track order: what sits on the picture is drawn above it
// In a Space the properties panel opens with each project until the person closes it (for this session).
let inspectorPref = true;

/** Shared per-plugin trust list: paths whose scripts the user agreed to run. */
export async function trustList(ctx) {
  try { const d = (await ctx.loadData?.()) || {}; return Array.isArray(d.trusted) ? d.trusted : []; } catch { return []; }
}
export async function trust(ctx, path) {
  let d = {};
  try { d = (await ctx.loadData?.()) || {}; } catch { d = {}; }
  const list = new Set(Array.isArray(d.trusted) ? d.trusted : []);
  list.add(path);
  try { await ctx.saveData?.({ ...d, trusted: [...list].slice(-500) }); } catch { /* best effort */ }
}

/**
 * Asset URLs for the sandboxed preview. Pictures and fonts are inlined as data URLs (cheap, always load);
 * videos stream from the vault protocol, and fall back to a data URL when the preview reports that the
 * stream failed to load (`fallback`).
 */
export function assetLoader(ctx) {
  const cache = new Map(), inline = new Set();
  const dataUrl = async vp => {
    if (!ctx.app.readBytes) return null;
    const b = await ctx.app.readBytes(vp);
    return b ? `data:${mimeOf(vp)};base64,${b64(b instanceof Uint8Array ? b : new Uint8Array(b))}` : null;
  };
  return {
    cache,
    async get(vp) {
      if (cache.has(vp)) return cache.get(vp);
      let url = null;
      if (STREAM.test(vp) && !inline.has(vp) && ctx.app.assetUrl) { try { url = ctx.app.assetUrl(vp); } catch { url = null; } }
      if (!url) { try { url = await dataUrl(vp); } catch { url = null; } }
      if (!url && ctx.app.assetUrl) { try { url = ctx.app.assetUrl(vp); } catch { url = null; } }
      cache.set(vp, url);
      return url;
    },
    fallback(vp) { if (inline.has(vp)) return false; inline.add(vp); cache.delete(vp); return true; },
  };
}

/** Compile a project into the sandboxed preview page. */
export async function previewHtml(p, path, assets, mode = 'embed') {
  const dir = dirOf(path);
  const probe = C.compile(p);
  await Promise.all(Object.keys(probe.assets).map(rel => assets.get(joinPath(dir, rel))));
  const payload = C.compile(p, { resolve: rel => assets.cache.get(joinPath(dir, rel)) || rel });
  // the editor plays every sound itself, in step with its own clock
  payload.audio = []; if (payload.media) payload.media = [];
  return C.buildHtml(payload, RUNTIME, { mode });
}

/** Every sound the editor plays: audio tracks plus the sound of video clips (newer compile.js). */
function soundSegments(p) {
  if (typeof C.audioSegments === 'function') return C.audioSegments(p);
  return C.audioTracks(p.meta).map(a => ({ ...a, kind: 'track', in: 0, dur: null, mute: false }));
}
const visibleHits = s => (typeof P.visibleHits === 'function' ? P.visibleHits(s) : s.hitTimes.map((t, index) => ({ index, t })));

/* ───────── the editor ───────── */
export function mountStudio(ctx, el, path, t, opts = {}) {
  const app = ctx.app;
  const nativeInspector = !!opts.view?.extendView && !opts.compact;
  let inspectorHandle = null, askHandle = null, exportHandle = null;
  const S = {
    path, text: '', saved: '', p: P.parseProject(''), time: 0, playing: false,
    sel: null, selText: null, selHit: null, selCap: null, tab: 'scene', codeScope: 'scene', allTexts: false,
    zoom: 0, snap: 'half', undo: [], redo: [], trusted: false, gen: 0,
    runtimeErrors: [], counts: null, sync: null, audioKey: '', disposed: false, status: 'saved',
    focus: false, inspectorOpen: false, muted: false, zoomFit: true, timelineHeight: 0, advancedOpen: false,
    lengthUnit: null,
  };
  const assets = assetLoader(ctx);
  const root = h('div', { class: 'fvs-studio', tabindex: '-1' });
  root.classList.toggle('compact', !!opts.compact);
  root.append(h('style', { text: STUDIO_CSS }));
  el.append(root);

  const tool = (glyph, key, fn, { cls = 'icon', kbd = '', label = true } = {}) => {
    const name = t(key) + (kbd ? ` (${kbd})` : '');
    return h('button', { type: 'button', class: `fvs-btn ${cls}`, title: name, 'aria-label': t(key), onclick: fn },
      icon(glyph), cls.includes('icon') || !label ? null : h('span', { text: t(key) }));
  };

  /* ───────── top bar ───────── */
  const nameText = h('span', { class: 'fvs-project-name' });
  const nameEl = opts.chooseProject
    ? h('button', { type: 'button', class: 'fvs-project', title: t('choose-project'), 'aria-haspopup': 'dialog', onclick: () => opts.chooseProject() }, nameText, icon('ChevronDown'))
    : h('span', { class: 'fvs-project', title: path }, nameText);
  const statusEl = h('span', { class: 'fvs-status', role: 'status' });
  const undoBtn = tool('Undo2', 'undo', () => undo(), { kbd: `${MOD}Z` });
  const redoBtn = tool('Redo2', 'redo', () => redo(), { kbd: `⇧${MOD}Z` });
  const aiBtn = tool('Sparkles', 'ask-ai', () => openAsk(), { cls: 'fvs-ai-action' });
  const exportBtn = tool('Download', 'export', e => openExportMenu(e.currentTarget), { cls: 'primary fvs-export-action' });
  exportBtn.setAttribute('aria-haspopup', 'menu'); exportBtn.append(icon('ChevronDown'));
  const moreBtn = tool('MoreHorizontal', 'more', e => openMoreMenu(e.currentTarget));
  moreBtn.setAttribute('aria-haspopup', 'menu');
  root.append(h('header', { class: 'fvs-bar' },
    h('div', { class: 'fvs-title-group' }, nameEl, statusEl),
    h('span', { class: 'fvs-grow' }),
    h('div', { class: 'fvs-bar-actions' }, h('div', { class: 'fvs-history' }, undoBtn, redoBtn), aiBtn, exportBtn, moreBtn)));

  /* ───────── stage + transport ───────── */
  const view = h('div', { class: 'fvs-view' });
  const viewport = h('div', { class: 'fvs-viewport' }, view);
  const sceneNow = h('span', { class: 'fvs-current-scene' });
  const timeEl = h('span', { class: 'fvs-time', 'aria-live': 'off' });
  const playBtn = h('button', { type: 'button', class: 'fvs-btn fvs-play', onclick: () => toggle() });
  const prevBtn = tool('SkipBack', 'previous-scene', () => stepScene(-1), { kbd: '↑' });
  const nextBtn = tool('SkipForward', 'next-scene', () => stepScene(1), { kbd: '↓' });
  const frameBack = tool('ChevronLeft', 'frame-back', () => seek(S.time - 1 / fps()), { kbd: '←' });
  const frameFwd = tool('ChevronRight', 'frame-forward', () => seek(S.time + 1 / fps()), { kbd: '→' });
  frameBack.classList.add('fvs-frame-step'); frameFwd.classList.add('fvs-frame-step');
  const muteBtn = tool('Volume2', 'mute', () => { S.muted = !S.muted; applyVolumes(); renderTransport(); });
  const focusBtn = tool('Maximize2', 'focus-preview', () => setFocus(!S.focus));
  const inspectorToggle = tool('PanelRight', 'toggle-properties', () => toggleInspector());
  const preview = h('section', { class: 'fvs-preview', 'aria-label': t('preview') }, viewport,
    h('div', { class: 'fvs-transport' },
      h('div', { class: 'fvs-transport-info' }, sceneNow, timeEl),
      h('div', { class: 'fvs-playback-actions' }, prevBtn, frameBack, playBtn, frameFwd, nextBtn),
      h('div', { class: 'fvs-preview-options' }, muteBtn, focusBtn, inspectorToggle)));
  const errBox = h('div', { class: 'fvs-errs', hidden: true, role: 'status' });
  view.append(errBox);

  /* ───────── inspector ───────── */
  const tabs = h('div', { class: 'fvs-tabs', role: 'tablist', 'aria-label': t('properties') });
  const panel = h('div', { class: 'fvs-panel', role: 'tabpanel' });
  for (const k of ['scene', 'text', 'captions', 'code', 'project']) {
    tabs.append(h('button', { type: 'button', role: 'tab', 'data-tab': k, 'aria-selected': String(S.tab === k), onclick: () => { S.tab = k; renderSide(); } }, t(`tab-${k}`)));
  }
  tabs.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault(); e.stopPropagation();
    const buttons = [...tabs.children], i = buttons.indexOf(document.activeElement);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].click(); buttons[next].focus();
  });
  const sideClose = tool('X', 'close', () => { S.inspectorOpen = false; layout(); });
  sideClose.classList.add('fvs-side-close');
  const side = h('aside', { class: 'fvs-side', 'aria-label': t('properties') }, h('div', { class: 'fvs-side-top' }, tabs, sideClose), panel);
  root.append(h('div', { class: 'fvs-main' }, preview, side));

  /* ───────── timeline ───────── */
  const snapSel = h('select', { 'aria-label': t('snap'), onchange: e => { S.snap = e.target.value; } },
    ...['bar', 'beat', 'half', 'quarter', 'off'].map(k => h('option', { value: k, selected: S.snap === k }, t(`snap-${k}`))));
  // the slider is logarithmic: every step multiplies the zoom by the same amount, from half the fit to a frame per ~24 px
  const ZOOM_STEPS = 1000;
  const zoomInput = h('input', { type: 'range', min: '0', max: String(ZOOM_STEPS), step: '1', 'aria-label': t('zoom-level'),
    oninput: e => { const [lo, hi] = zoomRange(); setZoom(lo * Math.pow(hi / lo, +e.target.value / ZOOM_STEPS)); } });
  const syncButton = h('button', { type: 'button', class: 'fvs-sync-chip', hidden: true, 'aria-haspopup': 'dialog', title: t('sync'), onclick: e => openSync(e.currentTarget) }, h('i'), h('span', { class: 'fvs-sync-sum' }));
  const splitBtn = tool('Scissors', 'split', () => splitAtPlayhead(), { kbd: 'S' });
  const dupBtn = tool('Copy', 'duplicate', () => duplicateSelected(), { kbd: `${MOD}D` });
  const delBtn = tool('Trash2', 'delete', () => deleteSelected(), { kbd: '⌫' });
  const addBtn = tool('Plus', 'add-scene', e => openTemplates(e.currentTarget), { cls: 'fvs-tl-add' });
  addBtn.setAttribute('aria-haspopup', 'dialog');
  const fileInput = h('input', { type: 'file', multiple: true, accept: 'image/*,video/*,audio/*,.srt,.vtt', hidden: true, onchange: e => { const files = [...e.target.files]; e.target.value = ''; void importFiles(files); } });
  const capBtn = tool('Captions', 'captions-add', () => addCaption());
  const importBtn = tool('Upload', 'import-media', () => fileInput.click(), { cls: 'fvs-tl-import' });
  const keysBtn = tool('Keyboard', 'shortcuts', e => openShortcuts(e.currentTarget));
  const durationEl = h('span', { class: 'fvs-timeline-duration' });
  const tlBar = h('div', { class: 'fvs-tl-bar', role: 'toolbar', 'aria-label': t('timeline') },
    h('div', { class: 'fvs-tl-tools' }, splitBtn, dupBtn, delBtn, h('span', { class: 'fvs-tl-sep' }), addBtn, capBtn, importBtn, fileInput),
    syncButton, durationEl, h('span', { class: 'fvs-grow' }),
    h('label', { class: 'fvs-snap-control' }, h('span', { text: t('snap') }), snapSel),
    h('div', { class: 'fvs-zoom-controls' }, tool('ZoomOut', 'zoom-out', () => zoomBy(1 / 1.5), { kbd: '-' }), zoomInput,
      tool('ZoomIn', 'zoom-in', () => zoomBy(1.5), { kbd: '=' }),
      h('button', { type: 'button', class: 'fvs-btn ghost', title: `${t('zoom-fit-hint')} (⇧Z)`, onclick: () => setZoom(0) }, t('zoom-fit'))),
    keysBtn);
  const scroller = h('div', { class: 'fvs-tl-scroll' });
  const inner = h('div', { class: 'fvs-tl-inner' });
  const ruler = h('canvas', { class: 'fvs-tl-ruler' });
  const capLane = h('div', { class: 'fvs-cap-lane' });
  const clips = h('div', { class: 'fvs-tl-scenes' });
  const lanes = h('div', { class: 'fvs-tl-lanes' });
  const head = h('div', { class: 'fvs-tl-head' });
  inner.append(ruler, capLane, clips, lanes, head);
  scroller.append(inner);
  const rulerLabel = h('span', { class: 'fvs-rail-ruler' });
  const audioRail = h('div', { class: 'fvs-rail-audio' });
  const trackRail = h('div', { class: 'fvs-track-rail' }, rulerLabel,
    h('div', { class: 'fvs-rail-captions' }, icon('Captions'), h('span', { text: t('captions-track') })),
    h('div', { class: 'fvs-rail-video' }, icon('Film'), h('span', { text: t('video-track') })), audioRail);
  const resizeHandle = h('div', { class: 'fvs-tl-resize', role: 'separator', tabindex: '0', 'aria-orientation': 'horizontal', 'aria-label': t('resize-timeline'), 'aria-valuemin': '150' });
  resizeHandle.addEventListener('pointerdown', e => {
    e.preventDefault();
    const y = e.clientY, height = timelineHeight();
    listenDrag(ev => resizeTimeline(height + y - ev.clientY), () => {});
  });
  resizeHandle.addEventListener('keydown', e => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault(); e.stopPropagation(); resizeTimeline(timelineHeight() + (e.key === 'ArrowUp' ? 20 : -20));
  });
  const tlBody = h('div', { class: 'fvs-tl-body' }, trackRail, scroller);
  const timeline = h('section', { class: 'fvs-tl', 'aria-label': t('timeline') }, resizeHandle, tlBar, tlBody);
  // In the Space the timeline lives in the native bottom panel (opts.dock); this strip stands in for it while that panel is closed.
  const dockStrip = h('div', { class: 'fvs-dock-strip', hidden: true }, icon('PanelBottom'), h('span', { text: t('timeline-docked') }),
    h('button', { type: 'button', class: 'fvs-btn ghost', onclick: () => opts.showTimeline?.() }, t('timeline-show')));
  root.append(opts.dock ? dockStrip : timeline);
  // ⌘/Ctrl + wheel and a trackpad pinch (a wheel event with ctrlKey) zoom around the pointer, as in other editors; so does Alt + wheel
  tlBody.addEventListener('wheel', e => {
    if (!(e.ctrlKey || e.metaKey || e.altKey)) return;
    e.preventDefault();
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY; // lines → pixels
    const x = Math.max(0, Math.min(scroller.clientWidth, e.clientX - scroller.getBoundingClientRect().left));
    zoomBy(Math.exp(-dy * (Math.abs(dy) < 30 ? .01 : .0025)), x); // pinch sends many small deltas, a wheel notch one large one
  }, { passive: false });
  let rulerFrame = 0;
  scroller.addEventListener('scroll', () => { cancelAnimationFrame(rulerFrame); rulerFrame = requestAnimationFrame(drawRuler); });

  let current = null, pending = null, pendingTimer = 0, inline = null;
  const drags = new Set();
  const fps = () => +S.p.meta.fps || 30;
  function listenDrag(move, end) {
    const clear = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); drags.delete(clear); };
    const up = e => { clear(); if (!S.disposed) end(e); };
    drags.add(clear);
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }
  /* lane geometry: the body grows with the number of audio lanes unless the user sized it */
  const lanesHeight = () => RULER_H + CAPTION_H + VIDEO_H + AUDIO_H * Math.max(1, laneTracks().length) + 10;
  const timelineHeight = () => S.timelineHeight || lanesHeight();
  function resizeTimeline(height) {
    S.timelineHeight = Math.max(150, Math.min(Math.max(150, root.clientHeight * .6), height));
    applyTimelineHeight();
  }
  function applyTimelineHeight() {
    const hgt = timelineHeight();
    root.style.setProperty('--fv-timeline-height', `${hgt}px`);
    resizeHandle.setAttribute('aria-valuenow', String(Math.round(hgt)));
    fitPreview();
  }

  /* ───────── layout ───────── */
  // ponytail: docked, focus mode hides only what is the editor's; the bottom panel is the host's (⌘J). Collapsing it
  // here needs a host seam to close a view (a `view.close()` on the plugin view context).
  function setFocus(on) {
    S.focus = on;
    if (on) { inspectorHandle?.close(); closeLayer(); } else restoreInspector();
    layout();
  }
  function toggleInspector(force) {
    const open = force ?? !(nativeInspector ? inspectorHandle?.isOpen : S.inspectorOpen);
    if (nativeInspector) { inspectorPref = open; if (open) openInspector(); else inspectorHandle?.close(); return; }
    S.inspectorOpen = open; if (open) S.focus = false;
    layout();
  }
  /*
   * The native panel shares the right side with the Director and the export panel (the host shows one at a
   * time). It is the side's resting state: it opens with the project and comes back when they close, unless
   * the person closed it (our toggle, the host's × or Escape). A hidden view loses it; it returns on show.
   */
  let reopenOnShow = false;
  function openInspector({ quiet = false, focusKey = null } = {}) {
    if (!nativeInspector || S.disposed) return;
    if (inspectorHandle?.isOpen) { if (focusKey) panel.querySelector(`[data-key="${CSS.escape(focusKey)}"]`)?.focus(); return; }
    S.focus = false;
    const before = document.activeElement;
    try {
      inspectorHandle = opts.view.extendView.open({ id: 'fvs-properties', title: t('properties'), side: 'right',
        mount(body) {
          const shell = h('div', { class: 'fvs-extension fvs-native-properties' }, h('style', { text: STUDIO_CSS }), side);
          body.append(shell); return () => shell.remove();
        },
        onClose(reason) {
          inspectorHandle = null;
          if (reason === 'dismiss') inspectorPref = false;
          if (reason === 'owner') reopenOnShow = inspectorPref;
          if (!S.disposed) { root.querySelector('.fvs-main').append(side); layout(); }
        },
      });
    } catch { reopenOnShow = inspectorPref; return; } // the view is hidden right now
    // the host focuses the first control of a panel it opens; send the keyboard where it belongs instead
    if (quiet || focusKey) {
      const target = () => (focusKey ? panel.querySelector(`[data-key="${CSS.escape(focusKey)}"]`) : before && before !== document.body && before.isConnected ? before : root);
      const off = () => { clearTimeout(timer); side.removeEventListener('focusin', back); side.removeEventListener('pointerdown', off); };
      const back = () => { off(); const x = target(); if (x && x !== document.activeElement) { x.focus({ preventScroll: true }); if (focusKey) x.select?.(); } };
      const timer = setTimeout(off, 1500);
      side.addEventListener('focusin', back); side.addEventListener('pointerdown', off);
    }
    layout();
  }
  /** Bring the panel back after another panel or focus mode had the side, if the person wants it. */
  function restoreInspector() {
    setTimeout(() => { if (!S.disposed && nativeInspector && inspectorPref && !S.focus && !inspectorHandle?.isOpen) openInspector({ quiet: true }); });
  }
  const sidePanelClosed = reason => { if (reason === 'close' || reason === 'dismiss') restoreInspector(); else if (reason === 'owner') reopenOnShow = inspectorPref; };
  function layout() {
    const inspectorShown = nativeInspector ? !!inspectorHandle?.isOpen : S.inspectorOpen;
    root.classList.toggle('inspector-hidden', nativeInspector || !S.inspectorOpen || !!opts.compact);
    root.classList.toggle('focus-preview', S.focus);
    inspectorToggle.setAttribute('aria-pressed', String(inspectorShown && !S.focus));
    focusBtn.replaceChildren(icon(S.focus ? 'Minimize2' : 'Maximize2'));
    focusBtn.title = t(S.focus ? 'exit-focus' : 'focus-preview');
    focusBtn.setAttribute('aria-label', focusBtn.title); focusBtn.setAttribute('aria-pressed', String(S.focus));
    requestAnimationFrame(() => { if (S.disposed) return; fitPreview(); S.zoomFit ? setZoom(0) : renderTimeline(); });
  }
  function fitPreview() {
    const style = getComputedStyle(viewport);
    const w = Math.max(1, viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    const height = Math.max(1, viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom));
    const ratio = (+S.p.meta.width || 1920) / (+S.p.meta.height || 1080);
    const width = Math.min(w, height * ratio);
    view.style.width = `${width}px`; view.style.height = `${width / ratio}px`;
  }

  /* ───────── selection ───────── */
  const selScene = () => (S.sel ? P.sceneById(S.p, S.sel) : null);
  const sceneUnderPlayhead = () => S.p.scenes.find(s => S.time >= s.t0 && S.time < s.t1) || S.p.scenes.at(-1) || null;
  function selectScene(id, { seekTo = true, reveal = true } = {}) {
    const s = P.sceneById(S.p, id); if (!s) return;
    S.sel = id; S.selHit = null; S.selText = null; S.selCap = null;
    if (seekTo) seek(s.t0);
    renderTimeline(); renderSide(); renderToolbar();
    if (reveal) {
      const x = s.t0 * S.zoom;
      if (x < scroller.scrollLeft || x + Math.min(s.dur * S.zoom, 140) > scroller.scrollLeft + scroller.clientWidth) scroller.scrollLeft = Math.max(0, x - 30);
    }
  }
  function stepScene(direction) {
    const cur = sceneUnderPlayhead();
    if (!cur) return;
    const next = S.p.scenes[Math.max(0, Math.min(S.p.scenes.length - 1, cur.index + direction))];
    selectScene(next.id);
  }

  /* ───────── load, save, watch ───────── */
  async function load() {
    setStatus('loading');
    let text = null;
    try { text = await app.readFile(path); } catch { text = null; }
    if (S.disposed) return;
    if (text === null) {
      const noVault = app.vaultRoot && !app.vaultRoot();
      view.append(h('div', { class: 'fvs-gate' }, h('div', {}, h('p', { text: noVault ? t('no-vault') : t('cannot-read', { path }) }))));
      statusEl.textContent = '';
      return;
    }
    S.trusted = opts.trusted || (await trustList(ctx)).includes(path);
    S.text = S.saved = text;
    setStatus('saved');
    reparse();
    S.time = Math.min(S.p.length, S.p.scenes[1] ? S.p.scenes[1].t0 + .5 : 0);
    S.sel = sceneUnderPlayhead()?.id || null;
    // the inline inspector starts open where there is room for it; the native one opens with the project
    if (!nativeInspector && !opts.compact && root.clientWidth >= 1100) S.inspectorOpen = true;
    applyTimelineHeight();
    layout();
    renderAll();
    if (nativeInspector && inspectorPref) openInspector({ quiet: true });
    requestAnimationFrame(() => setZoom(0));
    if (S.trusted) buildPreview(); else showGate();
    loadAudio();
    watch();
  }
  function reparse() {
    S.p = P.parseProject(S.text);
    if (S.sel && !P.sceneById(S.p, S.sel)) S.sel = S.p.scenes[0] ? S.p.scenes[0].id : null;
    if (S.selCap !== null && !S.p.captions[S.selCap]) S.selCap = null;
  }

  let saveTimer = 0, saving = null, writes = Promise.resolve();
  function setStatus(k, vars) { S.status = k; statusEl.textContent = t(k, vars); statusEl.dataset.state = k; statusEl.title = t(k, vars); }
  function scheduleSave() { setStatus('unsaved'); clearTimeout(saveTimer); saveTimer = setTimeout(save, 600); }
  // Writes are chained: each one starts after the previous finished, so the disk never ends on an older text.
  function save() {
    clearTimeout(saveTimer);
    const job = writes.then(writeNow);
    writes = job.catch(() => {});
    saving = job;
    job.finally(() => { if (saving === job) saving = null; }).catch(() => {});
    return job;
  }
  async function writeNow() {
    if (S.text === S.saved) { if (S.status !== 'loading' && !S.disposed) setStatus('saved'); return; }
    const text = S.text;
    setStatus('saving');
    try {
      await app.writeFile(path, text);
      S.saved = text;
      if (!S.disposed) setStatus(S.text === S.saved ? 'saved' : 'unsaved');
    } catch (e) { if (!S.disposed) setStatus('save-failed', { msg: e && e.message || e }); }
  }
  /** Fields apply on blur or change: blurring the focused one first puts its draft into the text. */
  function commitFocusedField() {
    const a = document.activeElement;
    if (a && a !== document.body && (root.contains(a) || side.contains(a) || timeline.contains(a)) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) a.blur();
  }

  let unwatch = null, poll = 0, banner = null;
  function watch() {
    if (app.watchFile) unwatch = app.watchFile(path, () => external());
    else poll = setInterval(external, 2000);
  }
  async function external() {
    if (saving) { try { await saving; } catch { /* reported by save */ } }
    let disk = null;
    try { disk = await app.readFile(path); } catch { disk = null; }
    if (S.disposed || disk === null || disk === S.saved || disk === S.text) { if (disk === S.text) S.saved = disk; return; }
    if (S.text === S.saved) {
      S.undo.push(S.text); S.redo = [];
      S.text = S.saved = disk;
      afterChange(false);
      notify(ctx, t('external'));
    } else showConflict(disk);
  }
  function showConflict(disk) {
    if (banner) banner.remove();
    banner = h('div', { class: 'fvs-banner', role: 'alert' }, h('span', { text: t('conflict') }),
      h('button', { type: 'button', class: 'fvs-btn', onclick: () => { banner.remove(); banner = null; S.undo.push(S.text); S.text = S.saved = disk; afterChange(false); } }, t('conflict-load')),
      h('button', { type: 'button', class: 'fvs-btn primary', onclick: () => { banner.remove(); banner = null; S.saved = disk; save(); } }, t('conflict-keep')));
    root.append(banner);
  }

  /* ───────── edits ───────── */
  function commit(next) {
    if (typeof next !== 'string' || next === S.text) return;
    S.undo.push(S.text); if (S.undo.length > 200) S.undo.shift();
    S.redo = [];
    S.text = next;
    afterChange(true);
  }
  function tryCommit(fn) {
    try { commit(fn(S.text)); return true; } catch (e) { notify(ctx, String(e && e.message || e), 'warn'); return false; }
  }
  function afterChange(save_) {
    reparse();
    if (save_) scheduleSave(); else setStatus(S.text === S.saved ? 'saved' : 'unsaved');
    renderAll();
    schedulePreview();
    const key = JSON.stringify(soundSegments(S.p));
    if (key !== S.audioKey) loadAudio(); else computeSync();
  }
  function undo() { if (!S.undo.length) return; S.redo.push(S.text); S.text = S.undo.pop(); afterChange(true); }
  function redo() { if (!S.redo.length) return; S.undo.push(S.text); S.text = S.redo.pop(); afterChange(true); }

  /* ───────── preview ───────── */
  function showGate() {
    view.querySelectorAll('.fvs-gate').forEach(x => x.remove());
    view.append(h('div', { class: 'fvs-gate' }, h('div', {},
      icon('ShieldAlert'), h('h3', { text: t('trust-title') }), h('p', { text: t('trust-body') }),
      h('button', { type: 'button', class: 'fvs-btn primary', onclick: async () => { S.trusted = true; await trust(ctx, path); view.querySelectorAll('.fvs-gate').forEach(x => x.remove()); renderTimeline(); thumbs.refresh(); buildPreview(); } }, t('trust-run')))));
  }
  let previewTimer = 0;
  function schedulePreview() { clearTimeout(previewTimer); previewTimer = setTimeout(buildPreview, 220); }
  async function buildPreview() {
    if (!S.trusted || S.disposed) return;
    const gen = ++S.gen;
    const html = await previewHtml(S.p, path, assets);
    if (gen !== S.gen || S.disposed) return;
    if (pending) pending.remove();
    pending = h('iframe', { sandbox: 'allow-scripts', title: t('app'), class: current ? 'fvs-pending' : '' });
    pending.srcdoc = html;
    view.prepend(pending);
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => swap({ errors: [{ scene: '', message: 'preview did not start (see the console)' }] }), 10000);
  }
  function swap(m) {
    clearTimeout(pendingTimer);
    if (!pending) return;
    if (current) current.remove();
    current = pending; pending = null;
    current.classList.remove('fvs-pending');
    S.runtimeErrors = (Array.isArray(m.errors) ? m.errors : []).slice(0, 50).filter(x => x && typeof x === 'object')
      .map(x => ({ scene: String(x.scene ?? ''), line: Number.isFinite(+x.line) ? +x.line : 0, message: String(x.message ?? '') }));
    const counts = v => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).filter(([, n]) => Number.isInteger(n))) : null);
    S.counts = counts(m.texts) ? { texts: counts(m.texts), imgs: counts(m.imgs) || {} } : null;
    lastPosted = -1;
    post({ fvs: 'seek', t: S.time });
    post({ fvs: 'transport', playing: S.playing });
    renderErrors();
    if (S.tab === 'project') renderSide();
  }
  let lastPosted = -1;
  const post = m => { if (current && current.contentWindow) current.contentWindow.postMessage(m, '*'); };
  function onMessage(e) {
    const m = e.data || {};
    if (pending && e.source === pending.contentWindow && m.fvs === 'ready') return swap(m);
    if (!current || e.source !== current.contentWindow) return;
    // the host moved this view in the DOM (⌘J, a tab dragged to another group): a moved iframe reloads its srcdoc
    // and boots again at 0, black until it is told where we are
    if (m.fvs === 'ready') { lastPosted = -1; post({ fvs: 'seek', t: S.time }); post({ fvs: 'transport', playing: S.playing }); return; }
    if (m.fvs === 'pick') onPick(m);
    if (m.fvs === 'media-error' && fallbackMedia(m.src)) schedulePreview();
  }
  window.addEventListener('message', onMessage);

  function renderErrors() {
    const errs = S.runtimeErrors;
    errBox.hidden = !errs.length;
    errBox.textContent = errs.length ? `${t('errors-runtime')}\n${errs.map(x => `${x.scene ? `[${x.scene}]` : ''}${x.line ? ` line ${x.line}` : ''} ${x.message}`).join('\n')}` : '';
    for (const c of clipEls.values()) c.el.classList.toggle('err', errs.some(x => x.scene === c.id) || S.p.errors.some(x => x.level === 'error' && x.scene === c.id));
  }

  /* click in the picture: select the scene and the text; double-click: edit in place */
  function textsMatch(id) {
    const s = P.sceneById(S.p, id);
    return s && S.counts && S.counts.texts[id] === HT.scan(s.html).texts.length;
  }
  function onPick(m) {
    // a click in the preview leaves the keyboard in its frame, where no key reaches the editor: take it back, also
    // when there was nothing to pick or the second click of a double-click put it there again (the in-place text
    // box takes it for itself)
    const edit = !opts.compact && !!m.scene && m.dbl && m.text != null && textsMatch(m.scene);
    if (!edit) root.focus({ preventScroll: true });
    if (!m.scene) return;
    S.sel = m.scene; S.selCap = null; S.selHit = null; // Delete now means this scene
    if (m.text != null) S.selText = { scene: m.scene, index: m.text };
    renderTimeline(); renderToolbar();
    if (edit) openInline(m);
    else if (!opts.compact && m.dbl && m.img != null) { S.tab = 'scene'; toggleInspector(true); renderSide(); }
    else if (S.tab === 'text' || S.tab === 'scene') renderSide();
  }
  function openInline(m) {
    closeInline();
    const s = P.sceneById(S.p, m.scene);
    const run = HT.scan(s.html).texts[m.text];
    if (!run) return;
    const vr = view.getBoundingClientRect();
    const ta = h('textarea', { rows: Math.min(6, Math.max(1, Math.ceil(run.text.trim().length / 28))), 'aria-label': t('texts') });
    ta.value = run.text.trim();
    const box = h('div', { class: 'fvs-inline', style: { left: `${Math.max(4, Math.min(m.rect.x, vr.width - 260))}px`, top: `${Math.max(4, Math.min(m.rect.y + m.rect.h + 6, vr.height - 90))}px`, width: `${Math.max(220, Math.min(m.rect.w, 520))}px` } }, ta, h('small', { text: t('inline-hint') }));
    let done = false;
    const finish = ok => {
      if (done) return; done = true;
      const v = ta.value; closeInline();
      if (ok && v.trim() !== run.text.trim()) tryCommit(x => P.setSceneBlock(x, m.scene, 'html', HT.replaceText(P.sceneById(P.parseProject(x), m.scene).html, m.text, v)));
      root.focus();
    };
    ta.addEventListener('keydown', e => {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); finish(true); }
      if (e.key === 'Escape') { e.preventDefault(); finish(false); }
    });
    ta.addEventListener('blur', () => finish(true));
    view.append(box);
    inline = box;
    ta.focus(); ta.select();
  }
  function closeInline() { if (inline) { const x = inline; inline = null; x.remove(); } }

  /* ───────── transport ───────── */
  let audios = [];
  let clockBase = 0, clockStart = 0;
  const now = () => (S.playing ? Math.min(S.p.length, clockBase + (performance.now() - clockStart) / 1000) : S.time);
  function applyVolumes() { for (const a of audios) a.el.muted = S.muted || a.mute; }
  function syncAudio(force) {
    for (const a of audios) {
      const local = S.time - a.at;
      const end = a.dur != null ? a.dur : (a.el.duration ? a.el.duration - a.in : Infinity);
      if (!S.playing || local < 0 || local >= end) { if (!a.el.paused) a.el.pause(); continue; }
      const want = a.in + local;
      if (force || Math.abs(a.el.currentTime - want) > .08) a.el.currentTime = want;
      if (a.el.paused) a.el.play().catch(() => {});
    }
  }
  function toggle() {
    if (S.playing) { S.time = now(); S.playing = false; syncAudio(); }
    else { if (S.time >= S.p.length - .01) S.time = 0; S.playing = true; clockBase = S.time; clockStart = performance.now(); syncAudio(true); }
    post({ fvs: 'transport', playing: S.playing });
    renderTransport();
  }
  function seek(x) {
    S.time = Math.max(0, Math.min(S.p.length, x));
    clockBase = S.time; clockStart = performance.now();
    syncAudio(true);
    renderTransport();
  }
  function renderTransport() {
    if (playBtn.dataset.playing !== String(S.playing)) {
      playBtn.replaceChildren(icon(S.playing ? 'Pause' : 'Play'));
      playBtn.dataset.playing = String(S.playing);
      playBtn.setAttribute('aria-label', t(S.playing ? 'pause' : 'play'));
      playBtn.title = `${t(S.playing ? 'pause' : 'play')} (${t('key-space')})`;
    }
    timeEl.textContent = `${fmtTime(S.time)} / ${fmtTime(S.p.length)}`;
    timeEl.title = t('frame-at', { n: Math.round(S.time * fps()) });
    undoBtn.disabled = !S.undo.length; redoBtn.disabled = !S.redo.length;
    const scene = sceneUnderPlayhead();
    sceneNow.textContent = scene ? `${String(scene.index + 1).padStart(2, '0')} · ${scene.title || scene.id}` : '';
    prevBtn.disabled = !scene || scene.index === 0; nextBtn.disabled = !scene || scene.index === S.p.scenes.length - 1;
    if (muteBtn.dataset.muted !== String(S.muted)) {
      muteBtn.replaceChildren(icon(S.muted ? 'VolumeX' : 'Volume2'));
      muteBtn.title = t(S.muted ? 'unmute' : 'mute'); muteBtn.setAttribute('aria-label', muteBtn.title);
      muteBtn.setAttribute('aria-pressed', String(S.muted)); muteBtn.dataset.muted = String(S.muted);
    }
  }
  let raf = 0;
  function loop() {
    if (S.disposed) return;
    if (S.playing) {
      S.time = now();
      if (S.time >= S.p.length) { S.playing = false; syncAudio(); post({ fvs: 'transport', playing: false }); }
      else syncAudio(false);
      renderTransport();
      const x = S.time * S.zoom;
      if (x < scroller.scrollLeft + 40 || x > scroller.scrollLeft + scroller.clientWidth - 40) scroller.scrollLeft = x - 60;
    }
    if (S.time !== lastPosted) { post({ fvs: 'seek', t: S.time }); lastPosted = S.time; head.style.left = `${S.time * S.zoom}px`; }
    raf = requestAnimationFrame(loop);
  }

  /* ───────── sound: playback, waveforms, accent analysis ───────── */
  const decoded = new Map(), ready = new Map(); // vault path → Promise / result { mono, sr, peaks, duration }
  const laneTracks = () => soundSegments(S.p).filter(a => a.kind !== 'video');
  const scoreIndex = tracks => Math.max(0, tracks.findIndex(a => a.role === 'score'));
  const decodedNow = vp => ready.get(vp) || null;
  function decode(vp) {
    if (decoded.has(vp)) return decoded.get(vp);
    const job = (async () => {
      let bytes = null;
      if (app.readBytes) bytes = await app.readBytes(vp).catch(() => null);
      if (!bytes && app.assetUrl) bytes = new Uint8Array(await (await fetch(app.assetUrl(vp))).arrayBuffer());
      if (!bytes) return null;
      const Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      const ac = new Ctx(1, 22050, 22050);
      const buf = await ac.decodeAudioData(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
      const sr = buf.sampleRate, mono = new Float32Array(buf.length);
      for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i++) mono[i] += d[i] / buf.numberOfChannels; }
      const bins = Math.ceil(mono.length / sr * 100), peaks = new Float32Array(bins), per = sr / 100;
      for (let b = 0; b < bins; b++) { let m = 0; const a = Math.floor(b * per), e = Math.min(mono.length, Math.floor((b + 1) * per)); for (let i = a; i < e; i++) { const v = Math.abs(mono[i]); if (v > m) m = v; } peaks[b] = m; }
      const result = { mono, sr, peaks, duration: mono.length / sr };
      ready.set(vp, result);
      return result;
    })().catch(() => null);
    decoded.set(vp, job);
    return job;
  }
  let analysis = null; // { env } for the score track
  let audioGen = 0;
  async function loadAudio() {
    const gen = ++audioGen;
    const segments = soundSegments(S.p);
    S.audioKey = JSON.stringify(segments);
    for (const a of audios) { a.el.pause(); if (a.blob) URL.revokeObjectURL(a.url); }
    audios = [];
    analysis = null; S.sync = null;
    const dir = dirOf(path);
    for (const seg of segments) {
      const vp = joinPath(dir, seg.src);
      let url = null, blob = false;
      try { url = app.assetUrl ? app.assetUrl(vp) : null; } catch { url = null; }
      if (!url && app.readBytes) {
        const b = await app.readBytes(vp).catch(() => null);
        if (S.disposed || gen !== audioGen) return;
        if (b) { url = URL.createObjectURL(new Blob([b], { type: mimeOf(vp) })); blob = true; }
      }
      if (!url) continue;
      const a = new Audio(url); a.preload = 'auto'; a.volume = Math.min(1, 10 ** ((seg.gain || 0) / 20));
      audios.push({ el: a, at: seg.at || 0, in: seg.in || 0, dur: seg.dur ?? null, mute: !!seg.mute, url, blob, vp });
    }
    applyVolumes();
    renderLanes(); drawWaves();
    const tracks = laneTracks();
    for (const tr of tracks) void decode(joinPath(dir, tr.src)).then(() => { if (!S.disposed) { renderLanes(); drawWaves(); } });
    if (tracks.length) analyse(tracks[scoreIndex(tracks)]);
    else computeSync();
  }
  async function analyse(track) {
    const key = S.audioKey;
    const d = await decode(joinPath(dirOf(path), track.src));
    if (!d || S.disposed || key !== S.audioKey) return;
    const at = track.at || 0, from = Math.round((track.in || 0) * d.sr);
    const to = track.dur != null ? Math.min(d.mono.length, from + Math.round(track.dur * d.sr)) : d.mono.length;
    const off = Math.max(0, Math.round(at * d.sr));
    const mono = new Float32Array(off + Math.max(0, to - from));
    mono.set(d.mono.subarray(from, to), off);
    analysis = { env: onsetEnvelope(mono, d.sr) };
    computeSync(); drawWaves(); renderTimeline();
  }
  function computeSync() {
    S.sync = analysis ? syncReport(S.p.scenes, analysis.env) : null;
    const sum = syncButton.querySelector('.fvs-sync-sum');
    syncButton.hidden = !laneTracks().length;
    if (!S.sync) { sum.textContent = laneTracks().length ? t('sync-analyzing') : ''; syncButton.dataset.state = 'pending'; return; }
    const bad = S.sync.filter(r => !r.ok).length;
    sum.textContent = t(bad ? 'sync-short' : 'sync-short-ok', { n: S.sync.length, bad });
    syncButton.dataset.state = bad ? 'warn' : 'ok';
  }

  /* ───────── timeline ───────── */
  const grid = () => {
    const tp = S.p.tempo;
    if (!tp) return S.snap === 'off' ? 1 / fps() : { bar: 1, beat: .5, half: .25, quarter: .1 }[S.snap] || .1;
    return { bar: tp.bar, beat: tp.beat, half: tp.beat / 2, quarter: tp.beat / 4, off: 1 / fps() }[S.snap];
  };
  const snapT = x => { const g = grid(); return Math.round(x / g) * g; };
  const fitZoom = () => Math.max(2, (scroller.clientWidth - 24) / Math.max(1, S.p.length));
  /** px per second: from half the fit (the whole film with room around it) to about 24 px per frame */
  const zoomRange = () => { const fit = fitZoom(); return [fit / 2, Math.max(400, fps() * 24, fit)]; };
  const zoomBy = (f, at) => setZoom((S.zoom || fitZoom()) * f, at);
  /**
   * z px per second (0 = fit the film). The time under viewport x `at` stays put; without one, the playhead
   * when it is in view, else the middle of the view.
   */
  function setZoom(z, at) {
    const [lo, hi] = zoomRange(), old = S.zoom || fitZoom(), w = scroller.clientWidth;
    const headX = S.time * old - scroller.scrollLeft;
    const x = at ?? (headX >= 0 && headX <= w ? headX : w / 2);
    const tx = (scroller.scrollLeft + x) / old;
    S.zoomFit = !(z > 0);
    S.zoom = z > 0 ? Math.min(hi, Math.max(lo, z)) : fitZoom();
    zoomInput.value = String(Math.round(Math.log(S.zoom / lo) / Math.log(hi / lo) * ZOOM_STEPS));
    renderTimeline();
    scroller.scrollLeft = Math.max(0, tx * S.zoom - x); // after the render, so the content already has its new width
    drawRuler();
  }
  // a stream that cannot seek is swapped for an inline copy, in the thumbnails and the main preview alike
  // A stream that cannot seek is swapped for an inline copy, in the thumbnails and the main preview alike.
  // The message comes from a page running the project's scripts: accept only clips the project really uses.
  function fallbackMedia(src) {
    if (typeof src !== 'string' || !S.p.scenes.some(s => (typeof HT.videos === 'function' ? HT.videos(s.html) : []).some(v => v.src === src))) return false;
    return assets.fallback(joinPath(dirOf(path), src));
  }
  const thumbs = sceneThumbnails(scroller, scene => previewHtml({ ...S.p, scenes: [scene], captions: [] }, path, assets), () => S,
    { onMediaError: src => { const swapped = fallbackMedia(src); if (swapped) schedulePreview(); return swapped; } });
  const clipEls = new Map();
  function makeClip(id) {
    const elc = h('div', { class: 'fvs-clip', 'data-id': id });
    const c = { id, el: elc, thumb: h('div', { class: 'fvs-clip-thumb' }), trans: h('div', { class: 'fvs-clip-trans', hidden: true }),
      title: h('b'), dur: h('small'), lane: h('div', { class: 'fvs-clip-lane' }),
      edgeL: h('div', { class: 'fvs-edge start', title: t('trim-hint') }), edgeR: h('div', { class: 'fvs-edge end', title: t('roll-hint') }) };
    elc.append(c.thumb, c.trans, h('div', { class: 'fvs-clip-label' }, c.title, c.dur), c.lane, c.edgeL, c.edgeR);
    elc.addEventListener('pointerdown', e => clipPointerDown(e, id));
    elc.addEventListener('dblclick', e => { if (!e.target.closest('.fvs-hitm, .fvs-edge, .fvs-clip-lane')) { S.tab = 'scene'; toggleInspector(true); renderSide(); } });
    c.lane.addEventListener('dblclick', e => {
      if (e.target !== c.lane) return;
      const s = P.sceneById(S.p, id); if (!s) return;
      const x = (e.clientX - c.lane.getBoundingClientRect().left) / (S.zoom || 20);
      const u = P.hitUnit(S.p.tempo), base = s.t0v ?? s.t0;
      const beats = Math.round((snapT(s.t0 + x) - base) / u * 1e4) / 1e4;
      if (s.t0 + x <= s.t1) tryCommit(src => P.setHits(src, s.id, [...s.hits, beats]));
    });
    c.edgeL.addEventListener('pointerdown', e => dragStartEdge(e, id));
    c.edgeR.addEventListener('pointerdown', e => dragEndEdge(e, id));
    return c;
  }
  function renderTimeline() {
    const Z = S.zoom || 20, W = Math.ceil(S.p.length * Z) + 48;
    inner.style.width = `${W}px`;
    inner.style.height = `${lanesHeight() - 10}px`;
    durationEl.textContent = `${fmtTime(S.p.length)} · ${t('scene-count', { n: S.p.scenes.length })}`;
    rulerLabel.textContent = S.p.tempo ? t('snap-bar') : t('time');
    const seen = new Set(), rows = S.sync || [];
    thumbs.sync(S.p, JSON.stringify([P.cssBlocks(S.p), P.stageHtml(S.p), P.stageJs(S.p), S.p.meta, S.p.length]));
    S.p.scenes.forEach((s, k) => {
      seen.add(s.id);
      let c = clipEls.get(s.id);
      if (!c) { c = makeClip(s.id); clipEls.set(s.id, c); clips.append(c.el); }
      const width = Math.max(3, s.dur * Z - 2);
      Object.assign(c.el.style, { left: `${s.t0 * Z}px`, width: `${width}px` });
      c.el.classList.toggle('on', s.id === S.sel && S.selCap === null);
      c.el.classList.toggle('alt', k % 2 === 1);
      c.el.classList.toggle('tight', width < 54);
      c.el.title = `${s.title || s.id} · ${fmtTime(s.t0)}–${fmtTime(s.t1)} · ${t('scene-duration', { n: s.dur.toFixed(2) })}${s.in ? ` · ${t('scene-in')} ${s.in.toFixed(2)}s` : ''}`;
      c.title.textContent = s.title || s.id;
      c.dur.textContent = `${s.dur.toFixed(1)}s`;
      if (S.trusted && !c.thumb.firstChild) c.thumb.append(thumbs.get(s));
      const tr = s.transition;
      c.trans.hidden = !tr;
      if (tr) { c.trans.style.width = `${Math.max(6, tr.dur * Z)}px`; c.trans.title = `${t('transition')} · ${t(`tr-${tr.type}`)} · ${tr.dur.toFixed(2)}s`; }
      c.lane.replaceChildren();
      for (const { index: i, t: ht } of visibleHits(s)) {
        const r = rows.find(x => x.scene === s.id && x.hit === i);
        const cls = r ? (r.quiet ? 'quiet' : r.ok ? 'ok' : 'weak') : '';
        const on = S.selHit && S.selHit.scene === s.id && S.selHit.index === i;
        const m = h('div', { class: `fvs-hitm ${cls}${on ? ' on' : ''}`, style: { left: `${(ht - s.t0) * Z}px` },
          title: `h${i} · ${fmtTime(ht)}${r ? ` · ${t(r.quiet ? 'sync-quiet' : r.ok ? 'sync-hit' : 'sync-miss')}` : ''}\n${t('hit-hint')}` });
        m.addEventListener('pointerdown', e => dragHit(e, s.id, i, m));
        c.lane.append(m);
      }
    });
    for (const [id, c] of clipEls) if (!seen.has(id)) { c.el.remove(); clipEls.delete(id); }
    clips.querySelector('.fvs-tl-empty')?.remove();
    if (!S.p.scenes.length) clips.append(h('div', { class: 'fvs-tl-empty', text: t('scene-none-yet') }));
    head.style.left = `${S.time * Z}px`;
    renderCaptions(); renderLanes(); drawRuler(); drawWaves(); renderErrors(); renderToolbar();
  }
  function renderToolbar() {
    const s = selScene(), under = sceneUnderPlayhead();
    splitBtn.disabled = !under || typeof P.splitScene !== 'function';
    dupBtn.disabled = !s || S.selCap !== null; delBtn.disabled = !s && !S.selHit && S.selCap === null;
  }
  /* one lane per audio track: label in the rail, a draggable region with its waveform */
  let laneEls = [];
  function renderLanes() {
    const tracks = laneTracks(), Z = S.zoom || 20, dir = dirOf(path), score = scoreIndex(tracks);
    if (laneEls.length !== Math.max(1, tracks.length)) {
      if (laneEls.length) requestAnimationFrame(() => { if (!S.disposed) applyTimelineHeight(); });
      lanes.replaceChildren(); audioRail.replaceChildren(); laneEls = [];
      for (let i = 0; i < Math.max(1, tracks.length); i++) {
        const canvas = h('canvas', { class: 'fvs-lane-wave' });
        const region = h('div', { class: 'fvs-lane-region' }, canvas, h('span', { class: 'fvs-lane-name' }));
        const lane = h('div', { class: 'fvs-lane', style: { top: `${RULER_H + CAPTION_H + VIDEO_H + i * AUDIO_H}px` } }, region);
        region.addEventListener('pointerdown', e => dragTrack(e, i));
        lane.addEventListener('pointerdown', e => { if (e.target === lane) scrub(e); });
        const label = h('div', { class: 'fvs-rail-lane' }, icon('Music2'), h('span'));
        lanes.append(lane); audioRail.append(label);
        laneEls.push({ lane, region, canvas, label });
      }
    }
    laneEls.forEach((L, i) => {
      const tr = tracks[i];
      L.label.querySelector('span').textContent = tr && i !== score ? t('audio-track-n', { n: i + 1 }) : t('audio-track');
      L.label.title = tr ? tr.src : t('sync-none');
      L.region.hidden = !tr;
      L.lane.classList.toggle('empty', !tr);
      if (!tr) { L.lane.dataset.hint = t('drop-audio'); return; }
      const d = decodedNow(joinPath(dir, tr.src));
      const len = tr.dur != null ? tr.dur : d ? Math.max(0, d.duration - (tr.in || 0)) : Math.max(1, S.p.length - (tr.at || 0));
      Object.assign(L.region.style, { left: `${(tr.at || 0) * Z}px`, width: `${Math.max(4, len * Z)}px` });
      L.region.classList.toggle('muted', !!tr.mute);
      L.region.querySelector('.fvs-lane-name').textContent = tr.src.split('/').pop();
      L.region.title = `${tr.src} · ${t('audio-at')} ${(tr.at || 0).toFixed(2)}${tr.in ? ` · ${t('audio-in')} ${tr.in.toFixed(2)}` : ''}\n${t('lane-hint')}`;
    });
  }
  function canvasSize(c, w, hh) {
    const dpr = Math.min(2, window.devicePixelRatio || 1), cw = Math.min(32000, Math.ceil(w * dpr));
    c.width = cw; c.height = Math.ceil(hh * dpr); c.style.width = `${w}px`; c.style.height = `${hh}px`;
    const g = c.getContext('2d'); g.setTransform(cw / w, 0, 0, dpr, 0, 0); return g;
  }
  function css(name, fb) { return getComputedStyle(root).getPropertyValue(name).trim() || fb; }
  // The ruler is only as wide as the view and follows the scroll: a canvas as wide as the film runs past the
  // browser's canvas limit when zoomed in, and the ticks and numbers come out squeezed.
  function drawRuler() {
    const Z = S.zoom || 20, x0 = scroller.scrollLeft, W = Math.max(1, scroller.clientWidth);
    ruler.style.left = `${x0}px`;
    const g = canvasSize(ruler, W, RULER_H);
    g.clearRect(0, 0, W, RULER_H);
    const muted = css('--fv-muted', '#888'), line = css('--fv-line', '#ccc');
    g.font = `${css('--fv-caption', '11px')} ${css('--fv-mono', 'ui-monospace, monospace')}`; g.textBaseline = 'top';
    const tp = S.p.tempo, from = x0 / Z, to = (x0 + W) / Z;
    if (tp) {
      const every = [1, 2, 4, 8, 16].find(n => n * tp.bar * Z >= 34) || 32;
      const last = Math.floor((S.p.length + 1e-6) / tp.bar);
      for (let b = Math.max(0, Math.floor(from / tp.bar)); b <= Math.min(last, Math.ceil(to / tp.bar)); b++) {
        const x = b * tp.bar * Z - x0;
        g.fillStyle = b % every ? line : muted; g.fillRect(x, b % every ? 14 : 6, 1, b % every ? 10 : 18);
        if (!(b % every)) { g.fillStyle = muted; g.fillText(String(b + 1), x + 4, 4); }
        if (tp.beat * Z >= 7) for (let k = 1; k < tp.beatsPerBar; k++) { g.fillStyle = line; g.fillRect(x + k * tp.beat * Z, 19, 1, 5); }
      }
    } else {
      const step = [.1, .2, .5, 1, 2, 5, 10, 30, 60].find(n => n * Z >= 40) || 120;
      for (let i = Math.max(0, Math.floor(from / step)); i * step <= Math.min(S.p.length, to + step); i++) {
        const sec = i * step, x = sec * Z - x0;
        g.fillStyle = muted; g.fillRect(x, 6, 1, 18); g.fillText(`${+sec.toFixed(1)}s`, x + 4, 4);
      }
    }
  }
  function drawWaves() {
    const tracks = laneTracks(), Z = S.zoom || 20, dir = dirOf(path), score = scoreIndex(tracks);
    const fill = css('--fv-wave', '#7aa'), tick = css('--fv-muted', '#888');
    laneEls.forEach((L, i) => {
      const tr = tracks[i]; if (!tr) return;
      const d = decodedNow(joinPath(dir, tr.src));
      const w = Math.max(4, parseFloat(L.region.style.width) || 4), H = AUDIO_H - 10;
      const g = canvasSize(L.canvas, w, H);
      g.clearRect(0, 0, w, H);
      if (!d) return;
      g.fillStyle = fill; g.globalAlpha = tr.mute ? .3 : .75;
      const from = (tr.in || 0) * 100;
      for (let x = 0; x < w; x++) {
        const b0 = Math.floor(from + x / Z * 100), b1 = Math.max(b0 + 1, Math.floor(from + (x + 1) / Z * 100));
        let m = 0; for (let b = b0; b < b1 && b < d.peaks.length; b++) if (d.peaks[b] > m) m = d.peaks[b];
        const hh = Math.min(1, m) * (H - 4);
        g.fillRect(x, (H - hh) / 2, 1, Math.max(1, hh));
      }
      g.globalAlpha = 1;
      // accents of the score track: local maxima of the onset envelope above 1.2 (1 = the 95th percentile)
      if (analysis && i === score) {
        g.fillStyle = tick;
        const e = analysis.env.env, at = tr.at || 0;
        for (let k = 1; k < e.length - 1; k++) if (e[k] > 1.2 && e[k] >= e[k - 1] && e[k] > e[k + 1]) {
          const x = (k * analysis.env.hop + analysis.env.offset - at) * Z;
          if (x < 0 || x > w) continue;
          g.globalAlpha = Math.min(1, (e[k] - 1) / 2); g.fillRect(x, 0, 1.5, 6);
        }
        g.globalAlpha = 1;
      }
    });
  }
  function scrub(e) {
    if (e.button !== 0) return;
    const r = inner.getBoundingClientRect();
    const go = ev => seek((ev.clientX - r.left) / (S.zoom || 20));
    go(e);
    listenDrag(ev => go(ev), () => {});
  }
  ruler.addEventListener('pointerdown', scrub);
  clips.addEventListener('pointerdown', e => { if (e.target === clips) scrub(e); });

  function clipPointerDown(e, id) {
    if (e.button !== 0 || e.target.closest('.fvs-hitm, .fvs-edge')) return;
    const s0 = P.sceneById(S.p, id); if (!s0) return;
    const Z = S.zoom || 20, r = inner.getBoundingClientRect(), x0 = e.clientX;
    let dragging = false, ghost = null, marker = null, target = s0.index;
    const move = ev => {
      if (!dragging && Math.abs(ev.clientX - x0) < 5) return;
      if (!dragging) {
        dragging = true;
        ghost = h('div', { class: 'fvs-tl-ghost move', style: { width: `${s0.dur * Z}px` } });
        marker = h('div', { class: 'fvs-tl-insert' });
        inner.append(ghost, marker); timeline.classList.add('reordering');
      }
      const at = (ev.clientX - r.left) / Z, others = S.p.scenes.filter(x => x.id !== id);
      target = others.filter(x => (x.t0 + x.t1) / 2 < at).length;
      ghost.style.left = `${(at - (x0 - r.left) / Z + s0.t0) * Z}px`;
      const bx = target < others.length ? others[target].t0 : others.length ? others.at(-1).t1 : 0;
      marker.style.left = `${bx * Z}px`;
    };
    const up = ev => {
      ghost?.remove(); marker?.remove(); timeline.classList.remove('reordering');
      if (ev.type === 'pointercancel') return;
      if (!dragging) {
        const was = S.sel, s = P.sceneById(S.p, id); if (!s) return;
        S.sel = id; S.selHit = null; S.selCap = null;
        if (was === id) seek((ev.clientX - r.left) / Z);
        else if (S.time < s.t0 || S.time >= s.t1) seek(s.t0);
        renderTimeline(); renderSide();
        return;
      }
      if (target !== s0.index) { if (tryCommit(src => P.moveScene(src, id, target))) { S.sel = id; renderAll(); } }
    };
    listenDrag(move, up);
  }
  /* right edge: roll the cut with the next scene (Alt: push everything after it) */
  function dragEndEdge(e, id) {
    e.preventDefault(); e.stopPropagation();
    const s = P.sceneById(S.p, id); if (!s) return;
    const Z = S.zoom || 20, r = inner.getBoundingClientRect(), edge = e.currentTarget;
    const ghost = h('div', { class: 'fvs-tl-ghost', style: { left: `${s.t0 * Z}px`, width: `${s.dur * Z}px` } });
    inner.append(ghost); edge.classList.add('drag');
    let len = s.dur;
    const move = ev => { len = Math.max(grid(), snapT((ev.clientX - r.left) / Z) - s.t0); ghost.style.width = `${len * Z}px`; };
    const up = ev => {
      ghost.remove(); edge.classList.remove('drag');
      if (ev.type === 'pointercancel' || Math.abs(len - s.dur) < 1e-6) return;
      tryCommit(src => (ev.altKey || !S.p.scenes[s.index + 1] ? P.setSceneLength(src, s.id, len) : P.rollCut(src, s.id, len)));
    };
    listenDrag(move, up);
  }
  /* left edge: trim the scene's start (its in-point); rolls with the previous scene, Alt pulls later scenes in */
  function dragStartEdge(e, id) {
    e.preventDefault(); e.stopPropagation();
    const s = P.sceneById(S.p, id); if (!s) return;
    if (typeof P.setSceneIn !== 'function') { notify(ctx, t('trim-unsupported'), 'warn'); return; }
    const Z = S.zoom || 20, r = inner.getBoundingClientRect(), edge = e.currentTarget;
    const prev = S.p.scenes[s.index - 1], content0 = s.t0 - (s.in || 0);
    const ghost = h('div', { class: 'fvs-tl-ghost', style: { left: `${s.t0 * Z}px`, width: `${s.dur * Z}px` } });
    inner.append(ghost); edge.classList.add('drag');
    let delta = 0, ripple = false;
    const move = ev => {
      ripple = ev.altKey || !prev;
      const lo = Math.max(content0, ripple ? -Infinity : prev.t0 + grid()), hi = s.t1 - grid();
      const t0 = Math.max(lo, Math.min(hi, snapT((ev.clientX - r.left) / Z)));
      delta = t0 - s.t0;
      if (ripple) Object.assign(ghost.style, { left: `${s.t0 * Z}px`, width: `${(s.dur - delta) * Z}px` });
      else Object.assign(ghost.style, { left: `${t0 * Z}px`, width: `${(s.t1 - t0) * Z}px` });
    };
    const up = ev => {
      ghost.remove(); edge.classList.remove('drag');
      if (ev.type === 'pointercancel' || Math.abs(delta) < 1e-6) return;
      tryCommit(src => {
        let out = src;
        if (!ripple) out = P.setSceneLength(out, prev.id, prev.dur + delta);
        out = P.setSceneIn(out, s.id, Math.max(0, (s.in || 0) + delta));
        return P.setSceneLength(out, s.id, s.dur - delta);
      });
    };
    listenDrag(move, up);
  }
  function dragHit(e, id, i, m) {
    e.preventDefault(); e.stopPropagation();
    const s = P.sceneById(S.p, id); if (!s) return;
    S.sel = s.id; S.selHit = { scene: s.id, index: i }; S.selCap = null;
    timeline.querySelectorAll('.fvs-hitm.on').forEach(x => x.classList.remove('on')); m.classList.add('on');
    renderToolbar();
    const Z = S.zoom || 20, r = inner.getBoundingClientRect(), u = P.hitUnit(S.p.tempo), base = s.t0v ?? s.t0;
    let at = s.hitTimes[i], moved = false;
    const move = ev => { moved = true; at = Math.max(s.t0, Math.min(s.t1, snapT((ev.clientX - r.left) / Z))); m.style.left = `${(at - s.t0) * Z}px`; };
    const up = ev => {
      if (ev.type === 'pointercancel') { renderTimeline(); return; }
      if (!moved) { seek(s.hitTimes[i]); renderSide(); return; }
      const hits = s.hits.slice(); hits[i] = Math.round((at - base) / u * 1e4) / 1e4;
      S.selHit = null;
      tryCommit(src => P.setHits(src, s.id, hits));
    };
    listenDrag(move, up);
  }
  /* move an audio track in time */
  function dragTrack(e, i) {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    const tracks = laneTracks(), tr = tracks[i]; if (!tr) return;
    const Z = S.zoom || 20, x0 = e.clientX, region = laneEls[i].region, at0 = tr.at || 0;
    let at = at0, moved = false;
    const move = ev => { moved = moved || Math.abs(ev.clientX - x0) > 3; if (!moved) return; at = Math.max(0, snapT(at0 + (ev.clientX - x0) / Z)); region.style.left = `${at * Z}px`; };
    const up = ev => {
      if (ev.type === 'pointercancel' || !moved || Math.abs(at - at0) < 1e-6) { renderLanes(); return; }
      setTrack(tr.id, { at: Math.round(at * 1000) / 1000 || undefined });
    };
    listenDrag(move, up);
  }
  function rawTracks() {
    const m = S.p.meta, raw = Array.isArray(m.audio) ? m.audio : m.audio ? [m.audio] : [];
    return raw.map(a => (typeof a === 'string' ? { src: a } : { ...a }));
  }
  /* audioTracks() skips entries without a source, so map its ids back to positions in the raw list */
  function rawIndex(list, id) {
    const valid = list.map((a, i) => [a, i]).filter(([a]) => a && a.src);
    const k = C.audioTracks(S.p.meta).findIndex(x => x.id === id);
    return k < 0 || !valid[k] ? -1 : valid[k][1];
  }
  function setTrack(id, patch) {
    const list = rawTracks(), k = rawIndex(list, id);
    if (k < 0) return;
    const next = { ...list[k], ...patch };
    for (const key of Object.keys(next)) if (next[key] === undefined || next[key] === false) delete next[key];
    list[k] = next;
    tryCommit(src => P.setProjectMeta(src, { audio: list }));
  }
  function removeTrack(id) {
    const list = rawTracks(), k = rawIndex(list, id);
    if (k >= 0) tryCommit(src => P.setProjectMeta(src, { audio: list.filter((_, i) => i !== k) }));
  }

  /* ───────── captions: one track of cues on project time (scene edits do not move them) ───────── */
  const cues = () => S.p.captions || [];
  const sameCue = (a, b) => Math.abs(a.start - b.start) < 6e-4 && Math.abs(a.end - b.end) < 6e-4 && a.text === b.text;
  const captionErrors = () => S.p.errors.filter(e => e.captions && e.level === 'error');
  /**
   * Write the whole track; `keep` (a cue as written) stays selected. Lines the parser could not read are not in
   * `cues()`, so ordinary edits wait until they are fixed; `force` (an import, "keep the readable ones") drops them.
   */
  function commitCaptions(list, keep = null, { force = false } = {}) {
    if (!force && captionErrors().length) { notify(ctx, t('captions-blocked'), 'warn'); S.tab = 'captions'; renderSide(); return false; }
    S.selCap = null;
    if (!tryCommit(src => P.setCaptions(src, list.map(c => ({ start: c.start, end: c.end, text: c.text }))))) return false;
    // the last match: a new cue identical to an older one sorts after it
    const k = keep ? cues().findLastIndex(c => sameCue(c, keep)) : -1;
    S.selCap = k < 0 ? null : k;
    renderTimeline(); renderSide();
    return true;
  }
  function renderCaptions() {
    const Z = S.zoom || 20, list = cues();
    capLane.classList.toggle('empty', !list.length);
    capLane.dataset.hint = t('captions-lane-hint');
    capLane.replaceChildren(...list.map((c, i) => {
      const el = h('div', { class: `fvs-cap${S.selCap === i ? ' on' : ''}`, 'data-index': String(i), style: { left: `${c.start * Z}px`, width: `${Math.max(3, (c.end - c.start) * Z - 1)}px` },
        title: `${fmtTime(c.start)} – ${fmtTime(c.end)}\n${c.text}\n${t('caption-hint')}` },
      h('span', { text: c.text.replace(/\s*\n\s*/g, ' / ') }), h('i', { class: 'fvs-cap-edge start' }), h('i', { class: 'fvs-cap-edge end' }));
      el.addEventListener('pointerdown', e => capPointerDown(e, i));
      el.addEventListener('dblclick', () => editCaption(i));
      return el;
    }));
  }
  capLane.addEventListener('pointerdown', e => { if (e.target === capLane) scrub(e); });
  capLane.addEventListener('dblclick', e => { if (e.target === capLane) addCaption(snapT((e.clientX - inner.getBoundingClientRect().left) / (S.zoom || 20))); });
  /* drag a cue to move it, its ends to trim it; a click selects it */
  function capPointerDown(e, i) {
    if (e.button !== 0) return;
    const c0 = cues()[i]; if (!c0) return;
    const edge = e.target.closest('.fvs-cap-edge'), mode = edge ? (edge.classList.contains('start') ? 'start' : 'end') : 'move';
    const Z = S.zoom || 20, x0 = e.clientX, el = e.currentTarget, minDur = Math.max(1 / fps(), .1);
    if (S.selCap !== i || S.tab !== 'captions') {
      S.selCap = i; S.selHit = null; S.tab = 'captions';
      timeline.querySelectorAll('.fvs-cap.on, .fvs-clip.on, .fvs-hitm.on').forEach(x => x.classList.remove('on')); el.classList.add('on');
      renderSide(); renderToolbar();
    }
    let start = c0.start, end = c0.end, moved = false;
    const move = ev => {
      if (!moved && Math.abs(ev.clientX - x0) < 4) return;
      moved = true;
      const dx = (ev.clientX - x0) / Z;
      if (mode === 'move') { start = Math.max(0, snapT(c0.start + dx)); end = start + (c0.end - c0.start); }
      else if (mode === 'start') start = Math.max(0, Math.min(c0.end - minDur, snapT(c0.start + dx)));
      else end = Math.max(c0.start + minDur, snapT(c0.end + dx));
      Object.assign(el.style, { left: `${start * Z}px`, width: `${Math.max(3, (end - start) * Z - 1)}px` });
    };
    const up = ev => {
      if (ev.type === 'pointercancel') { renderCaptions(); return; }
      if (!moved) { if (S.time < c0.start || S.time >= c0.end) seek(c0.start); return; }
      if (Math.abs(start - c0.start) < 1e-6 && Math.abs(end - c0.end) < 1e-6) return;
      const next = { ...c0, start, end };
      commitCaptions(cues().map((c, k) => (k === i ? next : c)), next);
    };
    listenDrag(move, up);
  }
  /** A cue at `at` (the playhead by default): 2 s, or up to the next cue when that starts sooner. */
  function addCaption(at = S.time) {
    const list = cues(), start = Math.max(0, Math.min(at, Math.max(0, S.p.length - .5)));
    const next = list.filter(c => c.start > start + 1e-3).reduce((m, c) => Math.min(m, c.start), Infinity);
    const cue = { start, end: start + (next - start >= .5 ? Math.min(2, next - start) : 2), text: t('caption-new') };
    if (commitCaptions([...list, cue], cue)) editCaption(S.selCap);
  }
  function deleteCaption(i) {
    const list = cues();
    if (list[i]) commitCaptions(list.filter((_, k) => k !== i));
  }
  /** Show cue `i` in the captions tab with its text selected. */
  function editCaption(i) {
    if (i === null || !cues()[i]) return;
    S.selCap = i; S.tab = 'captions';
    renderTimeline(); renderSide();
    const key = `cap:${i}:text`, field_ = () => panel.querySelector(`[data-key="${key}"]`);
    if (nativeInspector) {
      inspectorPref = true;
      if (!inspectorHandle?.isOpen) { openInspector({ focusKey: key }); return; }
    } else if (!opts.compact && !S.inspectorOpen) { S.inspectorOpen = true; S.focus = false; layout(); }
    const ta = field_(); if (ta) { ta.focus(); ta.select(); }
  }
  async function importCaptions(file) {
    let text = '';
    try { text = await file.text(); } catch { text = ''; }
    const { cues: got, errors } = P.parseSrt(text);
    if (!got.length) { notify(ctx, t('captions-import-empty', { name: file.name }), 'warn'); return; }
    const had = cues().length;
    if (!commitCaptions(got, null, { force: true })) return;
    notify(ctx, t(had ? 'captions-replaced' : 'captions-imported', { n: got.length, m: had }));
    if (errors.length) notify(ctx, t('captions-import-skipped', { name: file.name, n: errors.length, line: errors[0].line }), 'warn');
  }
  async function exportSrt() {
    const text = P.formatSrt(cues()) + '\n', stem = path.replace(/\.fvs\.md$/i, '');
    if (!text.trim()) return;
    // never overwrite a different file: the same content is fine, anything else gets the next free name
    let out = `${stem}.srt`;
    for (let k = 2; k < 1000; k++) {
      const have = await Promise.resolve(app.readFile(out)).catch(() => null);
      if (have === null || have === undefined || have === text) break;
      out = `${stem}-${k}.srt`;
    }
    try { await app.writeFile(out, text); notify(ctx, t('captions-exported', { path: out })); }
    catch (e) { notify(ctx, String(e && e.message || e), 'warn'); }
  }

  /* ───────── editing commands ───────── */
  function splitAtPlayhead() {
    const s = sceneUnderPlayhead();
    if (!s || typeof P.splitScene !== 'function') return;
    const at = Math.round(S.time * fps()) / fps();
    if (at <= s.t0 + 1 / fps() - 1e-6 || at >= s.t1 - 1 / fps() + 1e-6) { notify(ctx, t('split-edge'), 'warn'); return; }
    const id = P.freeId(S.p, s.id);
    if (tryCommit(src => P.splitScene(src, s.id, at, id))) { S.sel = id; renderAll(); }
  }
  function duplicateSelected() {
    const s = selScene(); if (!s) return;
    const id = P.freeId(S.p, s.id);
    if (tryCommit(src => P.duplicateScene(src, s.id, id, s.title ? t('copy-title', { title: s.title }) : ''))) selectScene(id);
  }
  function deleteSelected() {
    if (S.selCap !== null) { deleteCaption(S.selCap); return; }
    if (S.selHit) {
      const { scene, index } = S.selHit; S.selHit = null;
      const s = P.sceneById(S.p, scene);
      if (s) tryCommit(src => P.setHits(src, scene, s.hits.filter((_, k) => k !== index)));
      return;
    }
    const s = selScene(); if (!s) return;
    const next = S.p.scenes[s.index + 1] || S.p.scenes[s.index - 1];
    if (tryCommit(src => P.deleteScene(src, s.id))) {
      notify(ctx, t('deleted', { id: s.title || s.id }));
      if (next) selectScene(next.id); else { S.sel = null; renderAll(); }
    }
  }
  function insertAfter() { return S.sel || (S.p.scenes.length ? S.p.scenes.at(-1).id : null); }
  function addTemplate(tpl) {
    const id = P.freeId(S.p, tpl.id);
    if (tryCommit(src => P.insertScene(src, insertAfter(), sceneFromTemplate(tpl, { id, tempo: S.p.tempo, zh: !t.en() })))) selectScene(id);
  }

  /* media: pictures and clips become scenes, sounds become audio tracks */
  const sanitize = name => name.replace(/[^\w.\-一-鿿]+/g, '-').replace(/^-+|-+$/g, '') || 'media';
  async function freeRel(folder, name, existing) {
    const dot = name.lastIndexOf('.'), stem = dot > 0 ? name.slice(0, dot) : name, ext = dot > 0 ? name.slice(dot) : '';
    for (let k = 1; k < 1000; k++) {
      const rel = `${folder}/${k === 1 ? stem : `${stem}-${k}`}${ext}`, vp = joinPath(dirOf(path), rel);
      const taken = existing ? existing.has(vp) : (await app.readBytes?.(vp).catch(() => null)) != null;
      if (!taken) return rel;
    }
    throw new Error(`no free name for ${name}`);
  }
  /** Seconds of a clip: a File being imported, or the URL of one in the vault. */
  function mediaDuration(source) {
    if (!source) return Promise.resolve(0);
    return new Promise(resolve => {
      const local = typeof source !== 'string', url = local ? URL.createObjectURL(source) : source, v = document.createElement('video');
      const done = x => { clearTimeout(timer); if (local) URL.revokeObjectURL(url); v.removeAttribute('src'); resolve(x); };
      const timer = setTimeout(() => done(0), 8000);
      v.preload = 'metadata'; v.muted = true;
      v.onloadedmetadata = () => done(Number.isFinite(v.duration) ? v.duration : 0);
      v.onerror = () => done(0);
      v.src = url;
    });
  }
  /** Put a file of the project (`rel`, relative to it) into the cut: a picture or clip becomes a scene after
   *  `after`, a sound an audio track starting at `at` seconds. The new scene's id, 'track', or null. */
  async function placeMedia(rel, kind, { after = insertAfter(), at = 0, title = rel.split('/').pop().replace(/\.[^.]+$/, ''), duration = () => 0 } = {}) {
    if (kind === 'audio') {
      const list = rawTracks(), track = { src: rel, role: list.length ? 'track' : 'score', ...(at > 0 ? { at: Math.round(at * 1000) / 1000 } : {}) };
      return tryCommit(src => P.setProjectMeta(src, { audio: [...list, track] })) ? 'track' : null;
    }
    const seconds = kind === 'video' ? await duration() : 0;
    const id = P.freeId(S.p, kind === 'video' ? 'clip' : 'picture');
    const scene = mediaScene({ id, title, src: rel, kind, seconds: seconds || 5, tempo: S.p.tempo });
    return tryCommit(src => P.insertScene(src, after, scene)) ? id : null;
  }
  /** A file from the media bin (vault path `vp`): dropped at a cut, or double-clicked to the playhead. */
  async function placeFromBin(vp, after, at) {
    const dir = dirOf(path), rel = !dir ? vp : vp.startsWith(`${dir}/`) ? vp.slice(dir.length + 1) : '', kind = KIND(rel);
    if (!['image', 'video', 'audio'].includes(kind)) { notify(ctx, t('bin-outside'), 'warn'); return; }
    const got = await placeMedia(rel, kind, { after, at, duration: () => mediaDuration(app.assetUrl?.(vp)) });
    if (got && got !== 'track') selectScene(got);
  }
  let imports = Promise.resolve();
  function importFiles(files, afterId, place = true) {
    const job = imports.then(() => importBatch(files, afterId, place));
    imports = job.catch(() => {});
    return job;
  }
  /** Copy files into the project's media/ or audio/ folder and, unless `place` is false, into the cut. */
  async function importBatch(files, afterId, place = true) {
    if (!files.length || S.disposed) return;
    let existing = null;
    try { const list = await app.listFiles?.(); existing = list ? new Set(list) : null; } catch { existing = null; }
    let after = afterId !== undefined ? afterId : insertAfter(), added = null, tracks = 0, stored = 0;
    for (const file of files) {
      const kind = KIND(file.name);
      if (!kind) { notify(ctx, t('import-skip', { name: file.name }), 'warn'); continue; }
      if (kind === 'captions') { await importCaptions(file); continue; } // the text goes into the project
      if (!app.writeBytes) { notify(ctx, t('import-unsupported'), 'warn'); continue; }
      try {
        const rel = await freeRel(kind === 'audio' ? 'audio' : 'media', sanitize(file.name), existing);
        await app.writeBytes(joinPath(dirOf(path), rel), new Uint8Array(await file.arrayBuffer()));
        existing?.add(joinPath(dirOf(path), rel));
        if (!place) { stored++; continue; }
        const got = await placeMedia(rel, kind, { after, title: file.name.replace(/\.[^.]+$/, ''), duration: () => mediaDuration(file) });
        if (got === 'track') tracks++; else if (got) { after = got; added = got; }
      } catch (e) { notify(ctx, String(e && e.message || e), 'warn'); }
    }
    if (added) selectScene(added);
    if (added || tracks || stored) notify(ctx, t('imported'));
  }
  /* files dropped on the stage or the timeline; on the timeline they land at the nearest cut */
  let dropHint = null;
  // files from the computer, or one from the media bin
  const dragged = e => { const types = [...(e.dataTransfer?.types || [])]; return types.includes(BIN_MIME) ? 'bin' : types.includes('Files') ? 'files' : null; };
  // on the editor and, while the timeline is docked, on the bottom panel that holds it; returns the unbinder
  function acceptDrops(box) {
    const endDrop = () => { box.classList.remove('dropping'); dropHint?.remove(); dropHint = null; };
    const over = e => {
      if (!dragged(e) || opts.compact) return;
      e.preventDefault(); e.dataTransfer.dropEffect = 'copy';
      box.classList.add('dropping');
      if (scroller.contains(e.target)) {
        const Z = S.zoom || 20, x = (e.clientX - inner.getBoundingClientRect().left) / Z;
        const k = S.p.scenes.filter(s => (s.t0 + s.t1) / 2 < x).length;
        if (!dropHint) { dropHint = h('div', { class: 'fvs-tl-insert' }); inner.append(dropHint); }
        dropHint.style.left = `${(k < S.p.scenes.length ? S.p.scenes[k].t0 : S.p.length) * Z}px`;
        dropHint.dataset.index = String(k);
      } else { dropHint?.remove(); dropHint = null; }
    };
    const leave = e => { if (!box.contains(e.relatedTarget)) endDrop(); };
    const drop = e => {
      const from = dragged(e);
      if (!from || opts.compact) return;
      e.preventDefault();
      const k = dropHint ? +dropHint.dataset.index : null;
      endDrop();
      const afterId = k === null ? undefined : k === 0 ? '' : S.p.scenes[k - 1].id;
      if (from === 'files') { void importFiles([...e.dataTransfer.files], afterId); return; }
      let vp = ''; try { vp = JSON.parse(e.dataTransfer.getData(BIN_MIME)).path || ''; } catch { vp = ''; }
      // a sound starts at the cut it was dropped on (on the stage: at the playhead)
      if (vp) void placeFromBin(vp, afterId, k === null ? S.time : k < S.p.scenes.length ? S.p.scenes[k].t0 : S.p.length);
    };
    box.addEventListener('dragover', over); box.addEventListener('dragleave', leave); box.addEventListener('drop', drop);
    return () => { endDrop(); box.removeEventListener('dragover', over); box.removeEventListener('dragleave', leave); box.removeEventListener('drop', drop); };
  }
  acceptDrops(root);

  /* ───────── popovers ───────── */
  function openTemplates(anchor) {
    const grid_ = h('div', { class: 'fvs-template-grid' });
    const frames = [];
    for (const tpl of SCENE_TEMPLATES) {
      const shot = h('span', { class: 'fvs-template-shot' });
      const card = h('button', { type: 'button', class: 'fvs-template', onclick: () => { handle.close(); addTemplate(tpl); } },
        shot, h('b', { text: t.en() ? tpl.name.en : tpl.name.zh }), h('small', { text: t.en() ? tpl.hint.en : tpl.hint.zh }));
      grid_.append(card);
      if (!S.trusted) continue;
      // render the template inside this project's own look (global CSS, stage layers, frame size)
      try {
        const id = P.freeId(S.p, tpl.id);
        const p2 = P.parseProject(P.insertScene(S.text, null, sceneFromTemplate(tpl, { id, tempo: S.p.tempo, zh: !t.en() })));
        const sc = P.sceneById(p2, id);
        void previewHtml({ ...p2, scenes: [sc], captions: [] }, path, assets).then(html => {
          if (!shot.isConnected) return;
          const f = h('iframe', { sandbox: 'allow-scripts', tabindex: '-1', 'aria-hidden': 'true' }); f.srcdoc = html;
          frames.push({ f, t: sc.t1 - .05 }); shot.append(f);
        });
      } catch { /* a card without a picture */ }
    }
    const ready = e => { const fr = frames.find(x => x.f.contentWindow === e.source); if (fr && e.data?.fvs === 'ready') fr.f.contentWindow.postMessage({ fvs: 'seek', t: fr.t }, '*'); };
    window.addEventListener('message', ready);
    const handle = openPopover(anchor, h('div', { class: 'fvs-templates' }, h('div', { class: 'fvs-pop-head' }, h('strong', { text: t('templates') }), h('small', { text: t('templates-hint') })), grid_),
      { label: t('templates'), className: 'fvs-templates-pop', onClose: () => window.removeEventListener('message', ready) });
    grid_.style.setProperty('--fv-ratio', String((+S.p.meta.width || 1920) / (+S.p.meta.height || 1080)));
  }
  function openSync(anchor) {
    const body = h('div', { class: 'fvs-sync-pop' }, h('div', { class: 'fvs-pop-head' }, h('strong', { text: t('sync') })));
    body.append(h('div', { class: 'fvs-legend' },
      h('span', { class: 'ok' }, h('i'), t('sync-hit')), h('span', { class: 'weak' }, h('i'), t('sync-miss')), h('span', { class: 'quiet' }, h('i'), t('sync-quiet'))));
    if (!laneTracks().length) body.append(h('p', { class: 'fvs-hint', text: t('sync-none') }));
    else if (!S.sync) body.append(h('p', { class: 'fvs-hint', text: t('sync-analyzing') }));
    else {
      const bad = S.sync.filter(r => !r.ok);
      body.append(h('p', { class: 'fvs-hint', text: bad.length ? t('sync-bad', { n: S.sync.length, bad: bad.length }) : t('sync-ok', { n: S.sync.length }) }));
      if (bad.length) {
        body.append(h('div', { class: 'fvs-sync-list' }, ...bad.slice(0, 40).map(r => h('button', { type: 'button', onclick: () => { handle.close(); S.sel = r.scene; seek(r.t); renderTimeline(); } },
          h('span', { text: fmtTime(r.t) }), h('span', { text: `${P.sceneById(S.p, r.scene)?.title || r.scene} · h${r.hit}` })))));
        body.append(h('button', { type: 'button', class: 'fvs-btn', onclick: () => { handle.close(); askFor('ai-chip-sync', TASKS.sync); } }, icon('Sparkles'), t('sync-fix')));
      }
    }
    const handle = openPopover(anchor, body, { label: t('sync') });
  }
  function openShortcuts(anchor) {
    const rows = [['key-space', t('key-space')], ['shortcut-frame', '← →'], ['shortcut-beat', '⇧ ← →'], ['shortcut-scene', '↑ ↓'], ['split', 'S'],
      ['duplicate', `${MOD}D`], ['delete', '⌫'], ['undo', `${MOD}Z`], ['redo', `⇧${MOD}Z`], ['shortcut-text', t('shortcut-dblclick')], ['captions-add', t('captions-lane-dbl')],
      ['zoom-in', '='], ['zoom-out', '-'], ['zoom-fit-hint', '⇧Z'], ['shortcut-zoom', `${MOD.replace(/\+$/, '')} + ${t('wheel-or-pinch')}`]];
    openPopover(anchor, h('div', { class: 'fvs-keys' }, h('div', { class: 'fvs-pop-head' }, h('strong', { text: t('shortcuts') })),
      h('dl', {}, ...rows.flatMap(([k, keys]) => [h('dt', { text: k === 'key-space' ? t('play') : t(k) }), h('dd', {}, h('kbd', { text: keys }))]))), { label: t('shortcuts'), align: 'end' });
  }
  function openExportMenu(anchor) {
    openMenu(anchor, [
      { icon: 'Film', label: t('export-mp4'), hint: t('export-mp4-hint'), run: () => openExportPanel(anchor) },
      { icon: 'Globe', label: t('export-html'), hint: t('export-html-hint'), run: () => exportWeb() },
      { icon: 'Captions', label: t('export-srt'), hint: t('export-srt-hint'), disabled: !cues().length, run: () => void exportSrt() },
      '-',
      { icon: 'Terminal', label: t('export-cmd'), hint: t('export-cmd-hint'), run: () => copyRenderCommand() },
    ], { label: t('export'), align: 'end' });
  }
  function openMoreMenu(anchor) {
    openMenu(anchor, [
      opts.compact && opts.showInMain ? { icon: 'Maximize2', label: t('show-in-main'), run: opts.showInMain } : null,
      !opts.view && opts.openWorkspace ? { icon: 'Clapperboard', label: t('open-workspace'), run: opts.openWorkspace } : null,
      !opts.compact && opts.openMini ? { icon: 'PictureInPicture2', label: t('mini-preview'), run: opts.openMini } : null,
      !opts.compact && opts.openFloating ? { icon: 'AppWindow', label: t('floating-workspace'), run: opts.openFloating } : null,
      { icon: 'Music2', label: t('score'), hint: t('score-hint'), run: () => askFor('ai-chip-score', TASKS.score) },
      { icon: 'Eye', label: t('ai-chip-review'), run: () => askFor('ai-chip-review', TASKS.review) },
      ...(opts.closeProject ? ['-', { icon: 'X', label: t('close-project'), run: () => void opts.closeProject() }] : []),
    ], { label: t('more'), align: 'end' });
  }
  async function exportWeb() {
    try { const out = await exportHtml(ctx, S.p, path, assets); notify(ctx, t('exported', { path: out })); }
    catch (e) { notify(ctx, String(e && e.message || e), 'warn'); }
  }
  async function copyRenderCommand() {
    let tools = null; try { tools = await ensureTools(ctx); } catch { tools = null; }
    const mp4 = path.replace(/\.fvs\.md$/i, '') + '.mp4';
    const abs = app.hostPath ? app.hostPath(path) : null;
    const cmd = `node "${(tools && (tools.cliAbs || tools.cli)) || 'fvs.mjs'}" render "${abs || path}" --out "${(app.hostPath && app.hostPath(mp4)) || mp4}"`;
    try { await navigator.clipboard.writeText(cmd); } catch { /* shown below */ }
    notify(ctx, cmd);
  }

  /* ───────── side panels: director and export ───────── */
  const flush = async () => { if (saving) await saving.catch(() => {}); await save(); return S.text === S.saved; };
  const exports = exportController(ctx, () => S, assets, t, flush);
  const director = opts.chat ? null : directorController(ctx, () => S, t, flush); // with the conversation in the Space there is no Director panel
  /* hosts without Extend View (file tab, floating window) get the same panels as a sheet over the editor */
  let inlinePanel = null;
  function openInlinePanel(kind, mount, label) {
    const same = inlinePanel?.kind === kind;
    closeInlinePanel();
    if (same) return;
    const shell = h('div', { class: 'fvs-sheet', role: 'dialog', 'aria-label': label },
      h('div', { class: 'fvs-sheet-head' }, h('strong', { text: label }), tool('X', 'close', () => closeInlinePanel())));
    const body = h('div', { class: 'fvs-sheet-body' });
    shell.append(body); root.append(shell);
    inlinePanel = { kind, shell, dispose: mount(body) };
    aiBtn.setAttribute('aria-pressed', String(kind === 'director'));
  }
  function closeInlinePanel() {
    if (!inlinePanel) return;
    inlinePanel.dispose?.(); inlinePanel.shell.remove(); inlinePanel = null;
    aiBtn.setAttribute('aria-pressed', 'false');
  }
  function openExportPanel() {
    if (opts.view?.extendView) exportHandle = opts.view.extendView.open({ id: 'fvs-export', title: t('export'), side: 'right', mount: exports.mount, onClose(reason) { exportHandle = null; sidePanelClosed(reason); } });
    else openInlinePanel('export', exports.mount, t('export'));
  }
  // Where the Space has the conversation on its right side (opts.chat), the Director is that conversation: the button
  // brings it forward, and a one-click task puts its request in the input for the person to send. Elsewhere (older
  // hosts, a notes tab, a floating window) the Director panel hands the work to a new conversation as before.
  const askFor = (key, task) => { if (opts.chat) { opts.chat.reveal(); opts.chat.prefill(t(key)); } else void handOff(ctx, S, task(), t); };
  function openAsk() {
    if (opts.chat) { opts.chat.reveal(); return; }
    if (askHandle?.isOpen) { askHandle.close(); return; }
    if (opts.view?.extendView) {
      askHandle = opts.view.extendView.open({ id: 'fvs-director', title: t('ai-title'), side: 'right', mount: director.mount, onClose(reason) { askHandle = null; aiBtn.setAttribute('aria-pressed', 'false'); sidePanelClosed(reason); } });
      aiBtn.setAttribute('aria-pressed', 'true');
    } else openInlinePanel('director', director.mount, t('ai-title'));
  }

  /* ───────── inspector content ───────── */
  const field = (label, control, hint) => h('label', { class: 'fvs-field' }, h('span', { text: label }), control, hint ? h('small', { class: 'fvs-hint', text: hint }) : null);
  const input = (key, value, onCommit, extra = {}) => {
    const x = h('input', { class: 'fvs-input', 'data-key': key, value: value ?? '', ...extra });
    x.addEventListener('change', () => onCommit(x.value));
    x.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) x.blur(); });
    return x;
  };
  const select = (key, options, value, onChange, extra = {}) => h('select', { class: 'fvs-input', 'data-key': key, onchange: e => onChange(e.target.value), ...extra },
    ...options.map(([v, label]) => h('option', { value: v, selected: String(v) === String(value) }, label)));
  const section = (title, ...kids) => h('section', { class: 'fvs-section' }, title ? h('h4', { text: title }) : null, ...kids);
  function codeArea(key, value, onApply) {
    const ta = h('textarea', { class: 'fvs-code', 'data-key': key, spellcheck: 'false', rows: Math.min(28, Math.max(6, (value || '').split('\n').length + 1)) });
    ta.value = value || '';
    const apply = () => { if (ta.value !== value) onApply(ta.value); };
    ta.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); apply(); }
      if (e.key === 'Tab' && !e.shiftKey && !e.isComposing) { e.preventDefault(); const a = ta.selectionStart; ta.setRangeText('  ', a, ta.selectionEnd, 'end'); }
    });
    ta.addEventListener('blur', apply);
    return h('div', { class: 'fvs-code-block' }, ta,
      h('div', { class: 'fvs-code-footer' }, h('span', { text: `${MOD}Enter` }),
        h('button', { type: 'button', class: 'fvs-btn', onclick: apply }, icon('Check'), t('apply-code'))));
  }
  function renderSide() {
    for (const b of tabs.children) { b.setAttribute('aria-selected', String(b.dataset.tab === S.tab)); b.tabIndex = b.dataset.tab === S.tab ? 0 : -1; }
    const focus = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.dataset.key : null;
    const scroll = panel.scrollTop;
    panel.replaceChildren(...({ scene: sceneTab, text: textTab, captions: captionsTab, code: codeTab, project: projectTab }[S.tab])());
    panel.scrollTop = scroll;
    if (focus) { const x = panel.querySelector(`[data-key="${CSS.escape(focus)}"]`); if (x) x.focus(); }
  }

  /* lengths are shown in a unit the person picks: bars, beats or seconds */
  const unitOf = v => (/bar|小节/i.test(String(v)) ? 'bar' : /beat|拍|\db$/i.test(String(v)) ? 'beat' : 'sec');
  const inUnit = (sec, unit) => { const tp = S.p.tempo; const x = unit === 'bar' ? sec / tp.bar : unit === 'beat' ? sec / tp.beat : sec; return Math.round(x * 1000) / 1000; };
  const fromUnit = (x, unit) => { const tp = S.p.tempo; return unit === 'bar' ? x * tp.bar : unit === 'beat' ? x * tp.beat : x; };
  const lengthValue = (x, unit) => (unit === 'bar' ? `${x} ${x === 1 ? 'bar' : 'bars'}` : unit === 'beat' ? `${x} ${x === 1 ? 'beat' : 'beats'}` : `${x}s`);
  function sceneTab() {
    const s = selScene();
    if (!s) return [h('div', { class: 'fvs-empty' }, icon('MousePointerClick'), h('p', { text: t('scene-none') }))];
    const tp = S.p.tempo, unit = tp ? (S.lengthUnit || unitOf(s.meta.length)) : 'sec';
    const units = tp ? [['bar', t('unit-bar')], ['beat', t('unit-beat')], ['sec', t('unit-sec')]] : [['sec', t('unit-sec')]];
    const unitSel = select('sunit', units, unit, v => { S.lengthUnit = v; renderSide(); }, { 'aria-label': t('unit') });
    const out = [];
    out.push(h('div', { class: 'fvs-scene-head' },
      h('div', {}, h('span', { class: 'fvs-scene-index', text: `${String(s.index + 1).padStart(2, '0')} / ${S.p.scenes.length}` }),
        h('span', { class: 'fvs-scene-range', text: `${fmtTime(s.t0)} – ${fmtTime(s.t1)}` })),
      input('stitle', s.title, v => tryCommit(src => P.renameScene(src, s.id, undefined, v.trim())), { class: 'fvs-input fvs-title-input', 'aria-label': t('scene-title'), placeholder: s.id })));
    const len = input('slen', inUnit(s.dur, unit), v => {
      const x = +v; if (!(x > 0)) { renderSide(); return; }
      tryCommit(src => P.setSceneMeta(src, s.id, { length: lengthValue(x, unit) }));
    }, { type: 'number', min: '0', step: unit === 'sec' ? '0.1' : '1', 'aria-label': t('scene-length') });
    const timing = [field(t('scene-length'), h('div', { class: 'fvs-unit-row' }, len, unitSel))];
    if (typeof P.setSceneIn === 'function') {
      timing.push(field(t('scene-in'), h('div', { class: 'fvs-unit-row' }, input('sin', inUnit(s.in || 0, unit), v => {
        const x = +v; if (!(x >= 0)) { renderSide(); return; }
        tryCommit(src => P.setSceneIn(src, s.id, fromUnit(x, unit)));
      }, { type: 'number', min: '0', step: unit === 'sec' ? '0.1' : '1', 'aria-label': t('scene-in') }), h('span', { class: 'fvs-unit', text: units.find(u => u[0] === unit)[1] })), t('scene-in-hint')));
    }
    timing.push(field(t('scene-hits'), input('shits', s.hits.join(', '), v => tryCommit(src => P.setHits(src, s.id, v.split(/[\s,，]+/).filter(Boolean).map(Number).filter(x => isFinite(x))))), tp ? t('scene-hits-hint') : t('scene-hits-hint-sec')));
    out.push(section(t('timing-section'), ...timing));
    if (typeof P.setTransition === 'function') {
      const types = Array.isArray(P.TRANSITIONS) ? P.TRANSITIONS : [];
      const tr = s.transition;
      const durUnit = tp ? 'beat' : 'sec';
      out.push(section(t('transition'),
        h('div', { class: 'fvs-row' },
          field(t('transition-type'), select('strans', [['', t('tr-none')], ...types.map(k => [k, t(`tr-${k}`)])], tr ? tr.type : '', v => tryCommit(src => P.setTransition(src, s.id, v || null, tr ? tr.dur : undefined)), { disabled: s.index === 0 })),
          tr ? field(`${t('transition-dur')}（${t(durUnit === 'beat' ? 'unit-beat' : 'unit-sec')}）`, input('strdur', inUnit(tr.dur, durUnit), v => { const x = +v; if (x > 0) tryCommit(src => P.setTransition(src, s.id, tr.type, fromUnit(x, durUnit))); }, { type: 'number', min: '0', step: durUnit === 'sec' ? '0.1' : '0.5' })) : null),
        s.index === 0 ? h('small', { class: 'fvs-hint', text: t('transition-first') }) : null));
    }
    const media = mediaSection(s); if (media) out.push(media);
    const timed = HT.timedElements(s.html);
    if (timed.length) {
      const setA = (tag, name, v) => tryCommit(src => P.setSceneBlock(src, s.id, 'html', HT.setAttr(P.sceneById(P.parseProject(src), s.id).html, tag, name, v === '' ? null : v)));
      const rows = [h('div', { class: 'fvs-timed head' }, h('small'), h('small', { text: t('appear') }), h('small', { text: t('disappear') }), h('small', { text: t('effect') }))];
      for (const x of timed) {
        const fx = select(`tfx:${s.id}:${x.tag}`, ['cut', 'fade', 'up', 'down', 'left', 'right', 'pop', 'type'].map(k => [k, t(`fx-${k}`)]), x.fx || 'cut', v => setA(x.tag, 'data-fx', v === 'cut' ? '' : v), { 'aria-label': t('effect'), disabled: !!x.seq && x.in === undefined });
        rows.push(h('div', { class: 'fvs-timed' },
          h('span', { class: 'lbl', title: x.label, text: x.seq !== undefined ? `${x.label} · seq` : x.label }),
          input(`tin:${s.id}:${x.tag}`, x.seq !== undefined ? x.seq : x.in ?? '', v => setA(x.tag, x.seq !== undefined ? 'data-seq' : 'data-in', v.trim()), { 'aria-label': t('appear') }),
          input(`tout:${s.id}:${x.tag}`, x.out ?? '', v => setA(x.tag, 'data-out', v.trim()), { 'aria-label': t('disappear') }),
          fx));
      }
      out.push(section(t('timed'), h('small', { class: 'fvs-hint', text: t('timed-hint') }), ...rows));
    }
    out.push(section(t('scene-actions'), h('div', { class: 'fvs-scene-actions' },
      h('button', { type: 'button', class: 'fvs-btn', disabled: s.index === 0, onclick: () => tryCommit(src => P.moveScene(src, s.id, s.index - 1)) }, icon('ArrowLeft'), t('move-up')),
      h('button', { type: 'button', class: 'fvs-btn', disabled: s.index === S.p.scenes.length - 1, onclick: () => tryCommit(src => P.moveScene(src, s.id, s.index + 1)) }, icon('ArrowRight'), t('move-down')),
      h('button', { type: 'button', class: 'fvs-btn', onclick: () => duplicateSelected() }, icon('Copy'), t('duplicate')),
      h('button', { type: 'button', class: 'fvs-btn danger', onclick: () => deleteSelected() }, icon('Trash2'), t('delete')))));
    out.push(h('details', { class: 'fvs-advanced', open: S.advancedOpen, ontoggle: e => { S.advancedOpen = e.target.open; } },
      h('summary', {}, icon('SlidersHorizontal'), t('advanced')),
      h('div', { class: 'fvs-section' },
        field(t('scene-id'), input('sid', s.id, v => { const nid = v.trim(), old = S.sel; S.sel = nid; if (!tryCommit(src => P.renameScene(src, s.id, nid, undefined))) { S.sel = old; renderSide(); } })),
        field(t('scene-class'), input('sclass', s.meta.class ?? '', v => tryCommit(src => P.setSceneMeta(src, s.id, { class: v.trim() || null })))))));
    const errs = [...S.p.errors.filter(e => e.scene === s.id), ...S.runtimeErrors.filter(e => e.scene === s.id)];
    if (errs.length) out.push(section(t('problems'), h('div', { class: 'fvs-problems' }, ...errs.map(e => h('div', { class: e.level === 'warning' ? 'w' : 'e', text: `${e.line ? `line ${e.line}: ` : ''}${e.message}` })))));
    return out;
  }
  /* pictures and video clips placed in the scene */
  function mediaSection(s) {
    const imgs = HT.images ? HT.images(s.html) : [], vids = typeof HT.videos === 'function' ? HT.videos(s.html) : [];
    if (!imgs.length && !vids.length) return null;
    const rows = [];
    const setA = (tag, name, v) => tryCommit(src => P.setSceneBlock(src, s.id, 'html', HT.setAttr(P.sceneById(P.parseProject(src), s.id).html, tag, name, v)));
    for (const v of vids) {
      const file = h('input', { type: 'file', accept: 'video/*', hidden: true, onchange: e => replaceMedia(s, v.tag, e.target.files[0], 'video') });
      rows.push(h('div', { class: 'fvs-media-row' },
        h('span', { class: 'fvs-media-icon' }, icon('Clapperboard')),
        h('div', { class: 'fvs-media-main' }, h('span', { class: 'fvs-media-name', text: v.src.split('/').pop(), title: v.src }),
          h('div', { class: 'fvs-row' },
            field(t('clip-in'), input(`vin:${s.id}:${v.tag}`, v.clipIn || 0, x => setA(v.tag, 'data-clip-in', +x > 0 ? String(+x) : null), { type: 'number', min: '0', step: '0.1' })),
            field(t('audio-gain'), input(`vg:${s.id}:${v.tag}`, v.gain || 0, x => setA(v.tag, 'data-gain', +x ? String(+x) : null), { type: 'number', step: '0.5', disabled: v.muted })),
            h('label', { class: 'fvs-check' }, h('input', { type: 'checkbox', checked: !!v.muted, onchange: e => setA(v.tag, 'muted', e.target.checked ? '' : null) }), t('clip-mute')))),
        file, h('button', { type: 'button', class: 'fvs-btn', onclick: () => file.click() }, t('replace-media'))));
    }
    for (const im of imgs) {
      const vp = joinPath(dirOf(path), im.src);
      const thumb = h('img', { alt: '', class: 'fvs-media-thumb' });
      if (!/^data:/.test(im.src)) assets.get(vp).then(u => { if (u) thumb.src = u; }); else thumb.src = im.src;
      const file = h('input', { type: 'file', accept: 'image/*', hidden: true, onchange: e => replaceMedia(s, im.tag, e.target.files[0], 'image') });
      rows.push(h('div', { class: 'fvs-media-row' }, thumb,
        h('div', { class: 'fvs-media-main' }, h('span', { class: 'fvs-media-name', text: /^data:/.test(im.src) ? t('placeholder-image') : im.src.split('/').pop(), title: /^data:/.test(im.src) ? '' : im.src })),
        file, h('button', { type: 'button', class: 'fvs-btn', onclick: () => file.click() }, t('replace-image'))));
    }
    return section(t('media'), ...rows);
  }
  async function replaceMedia(s, tag, file, kind) {
    if (!file || !app.writeBytes) return;
    try {
      const rel = await freeRel('media', sanitize(file.name), null);
      await app.writeBytes(joinPath(dirOf(path), rel), new Uint8Array(await file.arrayBuffer()));
      assets.cache.delete(joinPath(dirOf(path), rel));
      tryCommit(src => {
        let out = P.setSceneBlock(src, s.id, 'html', HT.setAttr(P.sceneById(P.parseProject(src), s.id).html, tag, 'src', rel));
        if (kind === 'video') out = P.setSceneBlock(out, s.id, 'html', HT.setAttr(P.sceneById(P.parseProject(out), s.id).html, tag, 'data-clip-in', null));
        return out;
      });
    } catch (e) { notify(ctx, String(e && e.message || e), 'warn'); }
  }

  function textTab() {
    const out = [h('div', { class: 'fvs-text-head' }, h('small', { class: 'fvs-hint', text: t('texts-hint') }),
      h('label', { class: 'fvs-check' }, h('input', { type: 'checkbox', checked: S.allTexts, onchange: e => { S.allTexts = e.target.checked; renderSide(); } }), t('all-scenes')))];
    const scenes = S.allTexts ? S.p.scenes : [selScene()].filter(Boolean);
    if (!scenes.length) return [h('div', { class: 'fvs-empty' }, icon('MousePointerClick'), h('p', { text: t('scene-none') }))];
    for (const s of scenes) {
      const runs = HT.scan(s.html).texts;
      if (S.allTexts) out.push(h('h4', {}, h('button', { type: 'button', class: 'fvs-link', onclick: () => selectScene(s.id) }, `${String(s.index + 1).padStart(2, '0')} · ${s.title || s.id}`)));
      if (!runs.length) { out.push(h('p', { class: 'fvs-hint', text: t('texts-none') })); continue; }
      const list = h('div', { class: 'fvs-list' });
      runs.forEach(run => {
        const on = S.selText && S.selText.scene === s.id && S.selText.index === run.index;
        const ta = h('textarea', { class: 'fvs-input', 'data-key': `text:${s.id}:${run.index}`, rows: Math.min(5, Math.max(1, Math.ceil(run.text.trim().length / 30))), 'aria-label': run.text.trim().slice(0, 40) });
        ta.value = run.text.trim();
        const apply = () => { if (ta.value.trim() !== run.text.trim()) tryCommit(src => P.setSceneBlock(src, s.id, 'html', HT.replaceText(P.sceneById(P.parseProject(src), s.id).html, run.index, ta.value))); };
        ta.addEventListener('change', apply);
        ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); ta.blur(); } });
        ta.addEventListener('focus', () => post({ fvs: 'outline', scene: s.id, text: run.index }));
        ta.addEventListener('blur', () => post({ fvs: 'outline', scene: s.id }));
        const item = h('div', { class: `fvs-text-item${on ? ' on' : ''}` }, ta);
        if (ctx.tangu && ctx.tangu.complete) item.append(h('div', { class: 'fvs-meta' }, h('button', { type: 'button', class: 'fvs-link', onclick: () => aiRewrite(item, s, run) }, icon('Sparkles'), t('ai-rewrite'))));
        list.append(item);
        if (on) requestAnimationFrame(() => item.scrollIntoView({ block: 'nearest' }));
      });
      out.push(list);
    }
    return out;
  }
  async function aiRewrite(item, s, run) {
    // Electron has no window.prompt; the host's modal input is ctx.app.prompt
    const how = app.prompt ? await app.prompt(t('rewrite-prompt'), t('rewrite-default')) : t('rewrite-default');
    if (how === null || how === undefined) return;
    const box = h('div', { class: 'fvs-suggest', text: '…' });
    item.append(box);
    try {
      const v = await rewrite(ctx, run.text.trim(), how || t('rewrite-default'));
      if (!v) { box.remove(); return; }
      box.replaceChildren(h('div', { text: v }), h('div', { class: 'fvs-row' },
        h('button', { type: 'button', class: 'fvs-btn primary', onclick: () => tryCommit(src => P.setSceneBlock(src, s.id, 'html', HT.replaceText(P.sceneById(P.parseProject(src), s.id).html, run.index, v))) }, t('accept')),
        h('button', { type: 'button', class: 'fvs-btn', onclick: () => box.remove() }, t('discard'))));
    } catch (e) { box.textContent = String(e && e.message || e); }
  }

  /* the captions track as a list: times, text, look; the timeline lane edits the same cues */
  function captionsTab() {
    const list = cues(), look = P.captionStyle(S.p.meta);
    const setLook = patch => {
      const next = { ...look, ...patch };
      const value = { ...(next.position !== 'bottom' ? { position: next.position } : {}), ...(next.size !== 'medium' ? { size: next.size } : {}) };
      tryCommit(src => P.setProjectMeta(src, { captions: Object.keys(value).length ? value : null }));
    };
    const seg = (key, options, value, pick) => h('div', { class: 'fvs-segmented', role: 'radiogroup', 'aria-label': t(key), 'data-key': key },
      ...options.map(([v, label]) => h('button', { type: 'button', role: 'radio', 'aria-checked': String(v === value), onclick: () => { if (v !== value) pick(v); } }, label)));
    const group = (label, control) => h('div', { class: 'fvs-field' }, h('span', { text: label }), control);
    const file = h('input', { type: 'file', accept: '.srt,.vtt', hidden: true, onchange: e => { const f = e.target.files[0]; e.target.value = ''; if (f) void importCaptions(f); } });
    const out = [
      h('div', { class: 'fvs-cap-actions' },
        h('button', { type: 'button', class: 'fvs-btn', 'data-key': 'cap-add', onclick: () => addCaption() }, icon('Plus'), t('captions-add')),
        file, h('button', { type: 'button', class: 'fvs-btn ghost', title: t('captions-import'), onclick: () => file.click() }, icon('Upload'), t('import-short')),
        h('button', { type: 'button', class: 'fvs-btn ghost', title: t('captions-export'), disabled: !list.length, onclick: () => void exportSrt() }, icon('Download'), t('export-short'))),
      h('small', { class: 'fvs-hint', text: t('captions-hint') }),
      section(t('captions-look'), h('div', { class: 'fvs-row' },
        group(t('captions-position'), seg('captions-position', [['bottom', t('captions-bottom')], ['top', t('captions-top')]], look.position, v => setLook({ position: v }))),
        group(t('captions-size'), seg('captions-size', [['small', t('captions-small')], ['medium', t('captions-medium')], ['large', t('captions-large')]], look.size, v => setLook({ size: v }))))),
    ];
    if (!list.length) out.push(h('div', { class: 'fvs-empty' }, icon('Captions'), h('p', { text: t('captions-none') })));
    const rows = list.map((c, i) => [c, i]).sort((a, b) => a[0].start - b[0].start).map(([c, i]) => {
      const put = next => commitCaptions(list.map((y, j) => (j === i ? next : y)), next);
      const time = k => input(`cap:${i}:${k}`, +c[k].toFixed(3), x => {
        const next = { ...c, [k]: +x };
        if (x === '' || !(next.start >= 0) || !(next.end > next.start)) { renderSide(); return; }
        put(next);
      }, { type: 'number', min: '0', step: '0.1', 'aria-label': t(k === 'start' ? 'caption-start' : 'caption-end') });
      const ta = h('textarea', { class: 'fvs-input', 'data-key': `cap:${i}:text`, rows: Math.min(4, Math.max(1, c.text.split('\n').length)), 'aria-label': t('caption-text') });
      ta.value = c.text;
      ta.addEventListener('change', () => { const v = ta.value.trim(); if (v !== c.text) put({ ...c, text: v }); });
      ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); ta.blur(); } });
      ta.addEventListener('focus', () => {
        if (S.selCap !== i) { S.selCap = i; renderCaptions(); renderToolbar(); }
        if (S.time < c.start || S.time >= c.end) seek(c.start);
      });
      const row = h('div', { class: `fvs-cap-item${S.selCap === i ? ' on' : ''}` },
        h('div', { class: 'fvs-cap-times' }, time('start'), h('span', { class: 'fvs-unit', text: '→' }), time('end'), h('span', { class: 'fvs-unit', text: t('unit-sec') }),
          h('button', { type: 'button', class: 'fvs-btn icon', title: t('caption-delete'), 'aria-label': t('caption-delete'), onclick: () => deleteCaption(i) }, icon('Trash2'))),
        ta);
      if (S.selCap === i) requestAnimationFrame(() => row.scrollIntoView({ block: 'nearest' }));
      return row;
    });
    if (rows.length) out.push(section(t('captions-count', { n: list.length }), h('div', { class: 'fvs-cap-list' }, ...rows)));
    const errs = S.p.errors.filter(e => e.captions), bad = captionErrors().length;
    if (errs.length) out.push(section(t('problems'),
      bad ? h('p', { class: 'fvs-hint', text: t('captions-unreadable', { n: bad }) }) : null,
      bad ? h('button', { type: 'button', class: 'fvs-btn danger', onclick: () => commitCaptions(list, null, { force: true }) }, icon('Trash2'), t('captions-keep-readable')) : null,
      h('div', { class: 'fvs-problems' }, ...errs.map(e => h('div', { class: e.level === 'warning' ? 'w' : 'e', text: `${e.line ? `line ${e.line}: ` : ''}${e.message}` })))));
    return out;
  }

  function codeTab() {
    const s = selScene();
    const seg = (key, label, disabled) => h('button', { type: 'button', role: 'radio', 'aria-checked': String(S.codeScope === key), disabled, onclick: () => { S.codeScope = key; renderSide(); } }, label);
    const out = [h('div', { class: 'fvs-segmented', role: 'radiogroup', 'aria-label': t('code-scope') },
      seg('scene', `${t('code-scene')}${s ? ` · ${s.title || s.id}` : ''}`, !s), seg('project', t('code-project'))), h('small', { class: 'fvs-hint', text: t('code-apply') })];
    if (S.codeScope === 'scene' && s) {
      out.push(field(t('code-html'), codeArea(`c:${s.id}:html`, s.html, v => tryCommit(src => P.setSceneBlock(src, s.id, 'html', v)))));
      out.push(field(t('code-css'), codeArea(`c:${s.id}:css`, s.css, v => tryCommit(src => P.setSceneBlock(src, s.id, 'css', v)))));
      out.push(field(t('code-js'), codeArea(`c:${s.id}:js`, s.js, v => tryCommit(src => P.setSceneBlock(src, s.id, 'js', v)))));
    } else {
      const blocks = P.cssBlocks(S.p);
      (blocks.length ? blocks : ['']).forEach((b, i) => out.push(field(`${t('code-global-css')}${blocks.length > 1 ? ` ${i + 1}` : ''}`, codeArea(`g:css:${i}`, b, v => tryCommit(src => P.setProjectBlock(src, 'css', v, i))))));
      out.push(field(t('code-stage-html'), codeArea('g:html', P.stageHtml(S.p), v => tryCommit(src => P.setProjectBlock(src, 'html', v)))));
      out.push(field(t('code-stage-js'), codeArea('g:js', P.stageJs(S.p), v => tryCommit(src => P.setProjectBlock(src, 'js', v)))));
    }
    return out;
  }

  function projectTab() {
    const m = S.p.meta, tp = S.p.tempo;
    const setM = patch => tryCommit(src => P.setProjectMeta(src, patch));
    const num = v => { const x = +v; return isFinite(x) && x > 0 ? x : null; };
    const out = [];
    const presets = [[1920, 1080, 'frame-landscape'], [1080, 1920, 'frame-portrait'], [1080, 1080, 'frame-square'], [1440, 1080, 'frame-classic'], [3840, 2160, 'frame-4k']];
    const known = presets.find(([w, hh]) => w === +m.width && hh === +m.height);
    out.push(section(null,
      field(t('project-title'), input('ptitle', m.title || '', v => setM({ title: v.trim() || null }))),
      h('small', { class: 'fvs-hint', text: t('project-length', { len: S.p.length.toFixed(2), n: S.p.scenes.length }) })));
    out.push(section(t('frame-section'),
      field(t('project-size'), select('psize', [...(known ? [] : [['', `${m.width} × ${m.height}`]]), ...presets.map(([w, hh, k]) => [`${w}x${hh}`, `${t(k)} · ${w} × ${hh}`])], known ? `${known[0]}x${known[1]}` : '', v => { const [w, hh] = v.split('x').map(Number); if (w) setM({ width: w, height: hh }); })),
      h('div', { class: 'fvs-row' },
        field(t('project-fps'), input('pfps', m.fps, v => num(v) && setM({ fps: num(v) }), { type: 'number', min: '1', max: '120' })),
        field(t('project-bg'), h('div', { class: 'fvs-color-row' },
          h('input', { type: 'color', 'aria-label': t('project-bg'), value: /^#[0-9a-f]{6}$/i.test(m.background || '') ? m.background : '#000000', onchange: e => setM({ background: e.target.value }) }),
          input('pbg', m.background || '', v => setM({ background: v.trim() || null }), { placeholder: '#000000' }))))));
    out.push(section(t('tempo-section'),
      h('div', { class: 'fvs-row' },
        field(t('project-bpm'), input('pbpm', tp ? tp.bpm : '', v => setM({ tempo: +v > 0 ? { bpm: +v, beatsPerBar: tp ? tp.beatsPerBar : 4 } : null }), { type: 'number', min: '20', max: '400', placeholder: t('tempo-none') })),
        field(t('project-meter'), input('pmeter', tp ? tp.beatsPerBar : 4, v => tp && +v > 0 && setM({ tempo: { bpm: tp.bpm, beatsPerBar: +v } }), { type: 'number', min: '1', max: '16', disabled: !tp }))),
      h('small', { class: 'fvs-hint', text: t('tempo-hint') })));
    // audio tracks
    const tracks = C.audioTracks(m);
    const rows = tracks.map((a, i) => h('div', { class: 'fvs-track-card' },
      h('div', { class: 'fvs-track-head' }, icon('Music2'), h('span', { class: 'fvs-media-name', text: a.src.split('/').pop(), title: a.src }),
        h('label', { class: 'fvs-check' }, h('input', { type: 'checkbox', checked: !!a.mute, onchange: e => setTrack(a.id, { mute: e.target.checked || undefined }) }), t('clip-mute')),
        h('button', { type: 'button', class: 'fvs-btn icon', title: t('audio-remove'), 'aria-label': t('audio-remove'), onclick: () => removeTrack(a.id) }, icon('Trash2'))),
      h('div', { class: 'fvs-row' },
        field(t('audio-at'), input(`au:${i}:at`, a.at || 0, v => setTrack(a.id, { at: +v || undefined }), { type: 'number', step: '0.01', min: '0' })),
        'in' in a ? field(t('audio-in'), input(`au:${i}:in`, a.in || 0, v => setTrack(a.id, { in: +v || undefined }), { type: 'number', step: '0.01', min: '0' })) : null,
        'dur' in a ? field(t('audio-dur'), input(`au:${i}:dur`, a.dur ?? '', v => setTrack(a.id, { dur: +v > 0 ? +v : undefined }), { type: 'number', step: '0.01', min: '0', placeholder: t('audio-dur-full') })) : null,
        field(t('audio-gain'), input(`au:${i}:gain`, a.gain || 0, v => setTrack(a.id, { gain: +v || undefined }), { type: 'number', step: '0.5' })))));
    const file = h('input', { type: 'file', accept: 'audio/*', multiple: true, hidden: true, onchange: e => { const files = [...e.target.files]; e.target.value = ''; void importFiles(files); } });
    out.push(section(t('project-audio'), ...(rows.length ? rows : [h('p', { class: 'fvs-hint', text: t('sync-none') })]),
      h('div', { class: 'fvs-row' }, file, h('button', { type: 'button', class: 'fvs-btn', disabled: !app.writeBytes, onclick: () => file.click() }, icon('Plus'), t('audio-add')),
        tracks.length ? h('button', { type: 'button', class: 'fvs-btn ghost', onclick: e => openSync(e.currentTarget) }, t('sync')) : null)));
    const probs = [...S.p.errors, ...S.runtimeErrors.map(e => ({ level: 'error', ...e }))];
    out.push(section(t('problems'), probs.length ? h('div', { class: 'fvs-problems' }, ...probs.map(e => h('div', { class: e.level === 'warning' ? 'w' : 'e', text: `${e.scene ? `[${e.scene}] ` : ''}${e.line ? `line ${e.line}: ` : ''}${e.message}` }))) : h('p', { class: 'fvs-hint', text: t('no-problems') })));
    return out;
  }

  function renderAll() {
    nameText.textContent = S.p.meta.title || path.split('/').pop().replace(/\.fvs\.md$/i, '');
    renderTransport(); renderTimeline(); renderSide(); fitPreview();
  }

  /* ───────── keys, layout ───────── */
  // (also bound to the bottom-panel container while the timeline is docked there: its keys do not reach root)
  function onKey(e) {
    if (e.isComposing || e.keyCode === 229) return;
    const mod = e.metaKey || e.ctrlKey, k = e.key.toLowerCase();
    if (mod && k === 's') { e.preventDefault(); commitFocusedField(); save(); return; }
    // Escape closes the panel sheet from anywhere inside it, including its text box
    if (e.key === 'Escape' && inlinePanel && inlinePanel.shell.contains(e.target)) { e.preventDefault(); closeInlinePanel(); aiBtn.focus(); return; }
    if (typing(e)) return;
    if (mod && k === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (mod && k === 'y') { e.preventDefault(); redo(); return; }
    if (mod && k === 'd') { e.preventDefault(); duplicateSelected(); return; }
    if ((mod && k === 'b') || (!mod && !e.altKey && k === 's')) { e.preventDefault(); splitAtPlayhead(); return; }
    // (an Escape we use must not also reach the host, which would close the side panel)
    if (e.key === 'Escape') { if (inlinePanel) { e.preventDefault(); closeInlinePanel(); } else if (S.focus) { e.preventDefault(); setFocus(false); } return; }
    if (e.code === 'Space') {
      if (e.target !== root && e.target.matches?.('button:focus-visible, [role=tab]:focus-visible, [role=separator]:focus-visible')) return;
      e.preventDefault(); toggle(); return;
    }
    const beat = S.p.tempo ? S.p.tempo.beat : .5, frame = 1 / fps();
    if (e.key === 'ArrowRight') { e.preventDefault(); seek(S.time + (e.shiftKey ? beat : frame)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); seek(S.time - (e.shiftKey ? beat : frame)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); stepScene(-1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); stepScene(1); }
    if (e.key === 'Home') seek(0);
    if (e.key === 'End') seek(S.p.length);
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteSelected(); }
    if (!mod && !e.altKey && (e.key === '=' || e.key === '+')) { e.preventDefault(); zoomBy(1.5); }
    if (!mod && !e.altKey && (e.key === '-' || e.key === '_')) { e.preventDefault(); zoomBy(1 / 1.5); }
    if (!mod && e.shiftKey && k === 'z') { e.preventDefault(); setZoom(0); }
  }
  root.addEventListener('keydown', onKey);
  // clicks on the timeline and the toolbar keep the keyboard on the editor (Space, arrows, ⌘Z)
  // (menus and popovers live on document.body and keep their own focus)
  const keepKeys = box => e => {
    if (e.target.closest('input,textarea,select,.fvs-inline,.fvs-sheet')) return;
    setTimeout(() => {
      const a = document.activeElement;
      if (a?.closest?.('.fvs-layer')) return;
      if (!box.contains(a) || a === document.body) box.focus({ preventScroll: true });
    });
  };
  const rootKeys = keepKeys(root);
  root.addEventListener('pointerdown', e => {
    if (reopenOnShow) { reopenOnShow = false; restoreInspector(); } // shown again without a resize
    rootKeys(e);
  });
  // The bottom panel's timeline view borrows `timeline` while it is mounted (shell = its container), else the strip shows.
  let dockShell = null, dockKeys = null, dockDrops = null;
  const undock = opts.dock?.studio({
    timeline, path,
    // the media bin's side of the link
    text: () => S.text,
    store: files => importFiles(files, undefined, false),
    place: vp => { const s = sceneUnderPlayhead(); return placeFromBin(vp, s ? s.id : '', S.time); },
    attach(shell) {
      // the panel closing takes the focused timeline with it: give the keys back to the editor, not to the page
      const a = document.activeElement, lost = !!dockShell && (!a || a === document.body || dockShell.contains(a));
      if (dockShell) { dockShell.removeEventListener('keydown', onKey); dockShell.removeEventListener('pointerdown', dockKeys); dockDrops?.(); }
      dockShell = shell; dockKeys = shell ? keepKeys(shell) : null; dockDrops = shell ? acceptDrops(shell) : null;
      if (shell) { shell.addEventListener('keydown', onKey); shell.addEventListener('pointerdown', dockKeys); }
      dockStrip.hidden = !!shell;
      if (S.disposed) return;
      if (!shell && lost) setTimeout(() => { const b = document.activeElement; if (!S.disposed && (!b || b === document.body) && root.isConnected) root.focus({ preventScroll: true }); });
      layout();
    },
  });
  // The keyboard stays with the project until the person goes elsewhere. In a Space its panels sit in the host's
  // areas, outside this element (the properties on the right, the media bin on the left), and a redraw that removes
  // the focused control drops the focus to the page: from either, no key reached the editor (2026-10-04: ⌘Z did
  // nothing after an edit in the properties or a file added from the bin, while the undo button worked).
  // `heldBox`: the panel of this project the last press or focus was in (null: somewhere else).
  let heldBox = null;
  const onPage = x => x === document.body || x === document.documentElement;
  const binOurs = () => opts.dock?.top()?.timeline === timeline; // the bin is shared: it works for the newest studio
  const boxOf = x => {
    if (!x?.closest) return null;
    for (const b of [root, side, dockShell, timeline]) if (b && b.contains(x)) return b;
    return binOurs() ? x.closest('.fvs-bin') : null;
  };
  // A press on the page itself is going elsewhere too; the focus only falls there (no event) when a redraw drops it.
  // Our menus and popovers hang on document.body: a press in one is not going elsewhere.
  const track = e => { const x = e.target; if (x?.closest && !x.closest('.fvs-layer')) heldBox = boxOf(x); };
  const onStrayKey = e => {
    const x = e.target;
    if (e.defaultPrevented || typeof e.key !== 'string' || S.disposed || root.contains(x) || dockShell?.contains(x)) return; // (those two hear their own)
    // from the page: ours while the panel that had the keyboard is still on screen (a hidden project takes no keys);
    // from one of the panels: ours, also when the editor itself is behind another tab
    const box = onPage(x) ? (heldBox?.getClientRects().length ? heldBox : null) : boxOf(x);
    if (!box) return;
    // the bin is a list of files: undo and redo only (Delete on a file must not delete a scene)
    if (box.classList.contains('fvs-bin') && !(binOurs() && (e.metaKey || e.ctrlKey) && /^[zy]$/i.test(e.key))) return;
    onKey(e);
  };
  window.addEventListener('pointerdown', track, true); window.addEventListener('focusin', track, true);
  window.addEventListener('keydown', onStrayKey);
  const ro = new ResizeObserver(() => {
    const w = root.clientWidth;
    // entering the narrow layout closes the inline inspector: there it would sit on top of the picture
    if (w < 760 && !root.classList.contains('narrow') && !nativeInspector) S.inspectorOpen = false;
    root.classList.toggle('narrow', w < 760);
    root.classList.toggle('medium', w < 1100);
    root.classList.toggle('tiny', w < 460);
    if (reopenOnShow && w > 0) { reopenOnShow = false; restoreInspector(); }
    layout();
  });
  ro.observe(root); ro.observe(viewport); ro.observe(scroller); // (the scroller: the bottom panel resizes on its own)
  layout();

  // a project made from the launchpad with an idea: the idea waits in the Director for the person to send
  void load().then(() => {
    if (!opts.idea || S.disposed || !S.p.scenes.length) return;
    // handed to the conversation once: its input keeps the text across this view's remounts, so the draft is ours no more
    if (opts.chat) { opts.chat.reveal(); opts.chat.prefill(opts.idea); opts.ideaDraft?.(''); }
    else { director.seed(opts.idea, opts.ideaDraft); openAsk(); }
  });
  raf = requestAnimationFrame(loop);
  const dispose = () => {
    commitFocusedField();
    S.disposed = true; closeLayer(); closeInlinePanel();
    thumbs.dispose(); exports.dispose(); director?.dispose(); exportHandle?.close();
    inspectorHandle?.close(); askHandle?.close();
    cancelAnimationFrame(raf);
    clearTimeout(previewTimer); clearTimeout(pendingTimer);
    if (S.text !== S.saved) save();
    if (unwatch) unwatch();
    clearInterval(poll);
    window.removeEventListener('message', onMessage);
    window.removeEventListener('pointerdown', track, true); window.removeEventListener('focusin', track, true);
    window.removeEventListener('keydown', onStrayKey);
    ro.disconnect(); cancelAnimationFrame(rulerFrame);
    undock?.(); timeline.remove();
    for (const clear of drags) clear();
    for (const a of audios) { a.el.pause(); if (a.blob) URL.revokeObjectURL(a.url); }
    root.remove();
  };
  // Workbench entity navigation waits for queued writes before mounting the next engineering file.
  dispose.flush = async () => { commitFocusedField(); await save(); return S.text === S.saved; };
  // the workspace's project picker borrows the side; it calls this when it closes without switching
  dispose.restoreSide = restoreInspector;
  return dispose;
}
