// Forsion Video Studio — the plugin's UI half. This file becomes main.js: a bare setup(ctx) body.
// Registers the .fvs.md file type (the editor), the four "new project" entry points, note embeds,
// and a command the agent may call to put a project in front of the user.
import { makeT } from './i18n.js';
import { mountStudio, trust, trustList, previewHtml, assetLoader } from './studio.js';
import { h, dirOf, joinPath } from './util.js';
import { emptyTemplate } from '../lib/templates.js';
import { parseProject } from '../lib/project.js';
import { registerWorkspace } from './workspace.js';
import { EMBED_CSS } from './styles.js';
import { icon } from './icons.js';

const t = makeT(ctx);
const EXT = '.fvs.md';
const ICON = 'layout';
const app = ctx.app || {};
let workspace = null;
const exists = async p => { try { return (await app.readFile(p)) !== null; } catch { return false; } };

async function remember(path) {
  try { const d = (await ctx.loadData?.()) || {}; await ctx.saveData?.({ ...d, last: path }); } catch { /* best effort */ }
}

/** Create an empty project in `folder` and (by default) open it. */
async function createProject(folder, open = true) {
  // a name written to disk follows the interface language (新视频 / New video), like the rest of Forsion
  const base = t('default-name');
  let path = joinPath(folder || '', `${base}${EXT}`);
  for (let k = 2; await exists(path); k++) path = joinPath(folder || '', `${base} ${k}${EXT}`);
  await app.writeFile(path, emptyTemplate({ title: base, zh: !t.en() }));
  await trust(ctx, path);
  if (open && app.openFile) app.openFile(path);
  return path;
}

const registered = ctx.registerFileType({
  id: 'project',
  extensions: [EXT],
  icon: ICON,
  title: 'Video project',
  mount(el, file) {
    remember(file.filePath);
    return mountStudio(ctx, el, file.filePath, t, { openWorkspace: () => workspace?.open(file.filePath) });
  },
});

// a built-in owner of the suffix wins: then register nothing else (no duplicate "new" entries)
if (registered !== false) {
  workspace = registerWorkspace(ctx, t, { createProject, remember });
  ctx.registerFileCreator({ id: 'new-project', label: t('new-project'), icon: ICON, run: parent => createProject(parent).then(() => {}) });

  ctx.registerCommand({
    id: 'fvs-new-project',
    title: `Video Studio：${t('new-project')}`,
    keywords: 'video studio fvs 视频 工程 新建 动画 宣传片',
    run: workspace.newProject,
  });
  ctx.registerCommand({
    id: 'fvs-open-project',
    title: t.en() ? 'Video Studio: Open the last project' : 'Video Studio：打开最近的工程',
    keywords: 'video studio fvs recent 最近',
    run: async () => {
      let last = null;
      try { last = ((await ctx.loadData?.()) || {}).last; } catch { last = null; }
      if (last && (await exists(last))) workspace.open(last); else workspace.newProject();
    },
    invoke: {
      description: 'Open a Forsion Video Studio project (.fvs.md, vault-relative path) in the Video Studio editor so the user sees it. Use it after creating or editing a project for the user.',
      params: { type: 'object', properties: { path: { type: 'string', description: 'Vault-relative path of the .fvs.md file' } }, required: ['path'] },
      run: async args => {
        const p = String((args && args.path) || '').replace(/^\/+/, '');
        if (!p.toLowerCase().endsWith(EXT)) throw new Error(`not a ${EXT} file: ${p}`);
        if (!(await exists(p))) throw new Error(`no such file in the vault: ${p}`);
        workspace.open(p);
      },
    },
  });

  ctx.registerSlashItem({
    id: 'fvs-new-embed',
    label: () => t('new-project'),
    group: () => 'Video Studio',
    icon: ICON,
    keywords: 'video studio fvs 视频 工程 动画',
    run: async ({ folder }) => `![[${await createProject(folder, false)}]]`,
  });

  ctx.registerEmbedRenderer({
    id: 'fvs-embed',
    match: target => target.toLowerCase().endsWith(EXT),
    mount(el, embed) {
      let disposed = false, raf = 0, frame = null, playing = false, time = 0, start = 0, offReady = null;
      const title = h('b', { text: embed.target.split('/').pop() });
      const playBtn = h('button', { type: 'button', disabled: true, 'aria-label': t('play'), title: t('play') }, icon('Play'));
      const setPlaying = on => { playBtn.replaceChildren(icon(on ? 'Pause' : 'Play')); playBtn.setAttribute('aria-label', t(on ? 'pause' : 'play')); playBtn.title = t(on ? 'pause' : 'play'); };
      const open = h('button', { type: 'button' }, t('embed-open'));
      const box = h('div', { class: 'fvs-embed' });
      box.append(h('style', { text: EMBED_CSS }));
      box.append(h('div', { class: 'bar' }, playBtn, title, open));
      el.append(box);
      (async () => {
        let path = embed.target.replace(/^\/+/, '');
        if (!(await exists(path))) path = joinPath(dirOf(embed.pagePath || ''), embed.target);
        if (disposed || !(await exists(path))) return;
        open.onclick = () => app.openFile(path);
        const text = await app.readFile(path);
        const p = parseProject(text || '');
        title.textContent = p.meta.title || title.textContent;
        if (!(await trustList(ctx)).includes(path)) return; // untrusted scripts only run after "Run preview" in the editor
        const html = await previewHtml(p, path, assetLoader(ctx));
        if (disposed) return;
        frame = h('iframe', { sandbox: 'allow-scripts', title: p.meta.title || 'video', style: { aspectRatio: `${p.meta.width}/${p.meta.height}` } });
        frame.srcdoc = html;
        box.prepend(frame);
        const poster = p.scenes[1] ? p.scenes[1].t0 + .5 : 0;
        const post = x => frame.contentWindow && frame.contentWindow.postMessage({ fvs: 'seek', t: x }, '*');
        // every ready, not only the first: the host can move the note in the DOM (⌘J), which reloads the frame at 0
        const ready = e => {
          if (e.source !== frame.contentWindow || !e.data || e.data.fvs !== 'ready') return;
          post(playing || (time > 0 && time < p.length) ? time : poster);
          if (playing) frame.contentWindow.postMessage({ fvs: 'transport', playing }, '*');
          playBtn.disabled = false;
        };
        window.addEventListener('message', ready);
        offReady = () => window.removeEventListener('message', ready);
        const tick = () => { if (disposed || !playing) return; time = (performance.now() - start) / 1000; if (time >= p.length) { playing = false; setPlaying(false); post(poster); return; } post(time); raf = requestAnimationFrame(tick); };
        playBtn.onclick = () => { playing = !playing; setPlaying(playing); frame.contentWindow?.postMessage({ fvs: 'transport', playing }, '*'); if (playing) { start = performance.now() - (time >= p.length ? 0 : time) * 1000; tick(); } };
      })();
      return () => { disposed = true; offReady?.(); cancelAnimationFrame(raf); box.remove(); };
    },
  });
}
