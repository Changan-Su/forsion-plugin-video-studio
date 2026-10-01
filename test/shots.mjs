// Screenshots of the Studio under the real Genesis theme tokens (base.css + skins.css + a theme language),
// in the file-tab layout and in the Space layout with native-style Extend View panels. For eyeballing:
// geometry assertions cannot tell whether it looks right (DESIGN.md §8).
//   node test/shots.mjs [--out artifacts/shots] [--genesis <Forsion-Genesis/desktop/frontend/src>] [--skin teal --bg cream]
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { serveVault } from './vault-route.mjs';

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const out = resolve(arg('out', join(root, 'artifacts/shots')));
const genesis = resolve(arg('genesis', join(root, '../../Forsion-Genesis/desktop/frontend/src')));
const skin = arg('skin', 'teal'), bg = arg('bg', 'cream');
if (!existsSync(join(genesis, 'styles/base.css'))) throw new Error(`Genesis styles not found under ${genesis} (pass --genesis)`);
mkdirSync(out, { recursive: true });
const require = createRequire(join(root, 'x.js'));
const { chromium } = require('playwright-core');

const ORIGIN = 'http://fvs.test', EX = join(root, 'examples/episode-2.12'), DIR = 'Videos/第 2.12 话', FILE = `${DIR}/episode-2.12.fvs.md`;
const css = ['styles/base.css', 'theme/skins.css', 'theme/themes/lovable/theme.css'].map(f => readFileSync(join(genesis, f), 'utf8')).join('\n');

const browser = await chromium.launch();
const shot = async (page, name) => { await page.waitForTimeout(500); await page.screenshot({ path: join(out, `${name}.png`) }); console.log(`${name}.png`); };

async function open(viewport, { dark = false, locale = 'zh' } = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.route(`${ORIGIN}/**`, async r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/host.html' || u.pathname === '/host.js') return r.fulfill({ path: join(here, 'host', u.pathname.slice(1)) });
    if (u.pathname.startsWith('/vault/')) return serveVault(page, r, decodeURIComponent(u.pathname.slice(7)));
    return r.fulfill({ status: 404 });
  });
  await page.goto(`${ORIGIN}/host.html`);
  await page.addStyleTag({ content: css });
  await page.evaluate(([dark, skin, bg]) => {
    const h = document.documentElement;
    Object.assign(h.dataset, { theme: 'lovable', skin, bg, mode: dark ? 'dark' : 'light' });
    h.classList.toggle('dark', dark);
    document.body.style.background = 'var(--bg)';
  }, [dark, skin, bg]);
  const put = async (p, bytes) => page.evaluate(([q, b]) => HOST.files.set(q, new Uint8Array(b)), [p, Array.from(bytes)]);
  await page.evaluate(([p, t]) => HOST.files.set(p, t), [FILE, readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8')]);
  for (const f of readdirSync(join(EX, 'assets'))) await put(`${DIR}/assets/${f}`, readFileSync(join(EX, 'assets', f)));
  await put(`${DIR}/audio/episode-2.12-score.mp3`, readFileSync(join(EX, 'audio/episode-2.12-score.mp3')));
  // the Space half of the host: views, a list source and Extend View panels drawn like Genesis draws them
  await page.evaluate(([file, locale]) => {
    HOST.locale = locale;
    const c = HOST.ctx, views = {};
    c.app.listFiles = async () => [...HOST.files.keys()];
    c.registerView = d => { views[d.id] = d; };
    c.registerListSource = () => {};
    c.openView = () => {};
    c.saveData({ trusted: [file], last: file });
    HOST.space = () => {
      document.getElementById('view').style.display = 'none';
      const shell = document.createElement('div');
      shell.style.cssText = 'position:fixed;inset:0;display:grid;grid-template-columns:220px minmax(0,1fr) auto;gap:6px;padding:6px;background:var(--bg)';
      shell.innerHTML = '<nav style="border-radius:var(--radius-lg);background:var(--sidebar-bg,var(--bg));padding:14px;font:13px var(--font-ui);color:var(--text-muted)">视频工程</nav><main style="position:relative;border-radius:var(--radius-lg);background:var(--bg-card);box-shadow:var(--card-shadow);overflow:hidden"></main><aside style="display:none;width:340px;border-radius:var(--radius-lg);background:var(--bg-card);box-shadow:var(--card-shadow);overflow:hidden;grid-template-rows:auto minmax(0,1fr)"></aside>';
      document.body.append(shell);
      const main = shell.querySelector('main'), side = shell.querySelector('aside');
      let current = null;
      const extendView = {
        open(o) {
          current?.close();
          side.style.display = 'grid'; side.replaceChildren();
          const head = document.createElement('div');
          head.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:10px 12px 6px 16px;font:600 14px var(--font-ui);color:var(--text)';
          head.innerHTML = `<span>${o.title}</span><button style="border:0;background:none;color:var(--text-muted);font-size:16px">×</button>`;
          const body = document.createElement('div'); body.style.cssText = 'min-height:0;overflow:hidden';
          side.append(head, body);
          const handle = { isOpen: true, close() { if (!handle.isOpen) return; handle.isOpen = false; dispose?.(); side.style.display = 'none'; side.replaceChildren(); current = null; o.onClose?.(); } };
          head.querySelector('button').onclick = () => handle.close();
          const dispose = o.mount(body, handle);
          current = handle;
          return handle;
        },
        close() { current?.close(); },
      };
      let params = { filePath: file };
      views.studio.mount(main, { extendView, getParams: () => params, setParams: p => { params = { ...params, ...p }; }, onParamsChanged: () => () => {}, showInMainPanel() {} });
    };
  }, [FILE, locale]);
  await page.evaluate(src => HOST.load(src), readFileSync(join(root, 'main.js'), 'utf8'));
  return { page, errors };
}
const ready = page => page.waitForFunction(() => { const f = document.querySelector('.fvs-view iframe'); return f && !document.querySelector('.fvs-view iframe.fvs-pending'); }, null, { timeout: 20000 });
const analysed = page => page.waitForFunction(() => /\d/.test(document.querySelector('.fvs-sync-sum')?.textContent || ''), null, { timeout: 30000 }).catch(() => {});

// 1. file tab: inline inspector, light and dark
for (const dark of [false, true]) {
  const { page, errors } = await open({ width: 1480, height: 920 }, { dark });
  await page.evaluate(p => HOST.open(p), FILE);
  await ready(page); await analysed(page);
  await page.waitForTimeout(1500);
  await shot(page, `01-file-${dark ? 'dark' : 'light'}`);
  if (!dark) {
    await page.click('.fvs-tl-add'); await page.waitForTimeout(1800); await shot(page, '02-templates');
    await page.keyboard.press('Escape');
    await page.click('.fvs-sync-chip'); await shot(page, '03-sync');
    await page.keyboard.press('Escape');
    await page.click('.fvs-export-action'); await shot(page, '04-export-menu');
    await page.keyboard.press('Escape');
    await page.click('[data-tab="project"]'); await shot(page, '05-project-tab');
    await page.click('.fvs-ai-action'); await shot(page, '06-director-sheet');
  }
  if (errors.length) console.log('page errors:', errors);
  await page.close();
}
// 2. Space: native-style panels
{
  const { page, errors } = await open({ width: 1600, height: 960 });
  await page.evaluate(() => HOST.space());
  await ready(page); await analysed(page); await page.waitForTimeout(1500);
  await shot(page, '07-space');
  await page.click('[aria-label="属性面板"]'); await shot(page, '08-space-properties');
  await page.click('.fvs-ai-action'); await shot(page, '09-space-director');
  await page.click('.fvs-export-action'); await page.click('.fvs-menu button'); await shot(page, '10-space-export');
  if (errors.length) console.log('page errors:', errors);
  await page.close();
}
// 3. narrow floating window and English
{
  const { page } = await open({ width: 700, height: 860 }, { locale: 'en' });
  await page.evaluate(p => HOST.open(p), FILE);
  await ready(page); await page.waitForTimeout(1500);
  await shot(page, '11-narrow-en');
  await page.close();
}
await browser.close();
