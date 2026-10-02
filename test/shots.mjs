// Screenshots of the Studio under the real Genesis theme tokens (base.css + skins.css + a theme language),
// in the file-tab layout and in the Space layout with native-style Extend View panels. For eyeballing:
// geometry assertions cannot tell whether it looks right (DESIGN.md §8).
//   node test/shots.mjs [--out artifacts/shots] [--genesis <Forsion-Genesis/desktop/frontend/src>] [--skin teal --bg cream]
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { serveVault } from './vault-route.mjs';
import { setCaptions } from '../src/lib/project.js';

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

const EXAMPLE = readFileSync(join(EX, 'episode-2.12.fvs.md'), 'utf8');
// the Space shots carry a captions track (the file-tab shots show the empty one)
const CAPTIONED = setCaptions(EXAMPLE, [
  { start: 9.6, end: 12.4, text: '多年来，我们只造了 Agent 的一半。' },
  { start: 12.4, end: 15.2, text: '另一半，是人。' },
  { start: 15.2, end: 19.2, text: '这一话，补完计划开始。\nThe other half begins here.' },
]);

async function open(viewport, { dark = false, locale = 'zh', text = EXAMPLE } = {}) {
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
  await page.evaluate(([p, t]) => HOST.files.set(p, t), [FILE, text]);
  for (const f of readdirSync(join(EX, 'assets'))) await put(`${DIR}/assets/${f}`, readFileSync(join(EX, 'assets', f)));
  await put(`${DIR}/audio/episode-2.12-score.mp3`, readFileSync(join(EX, 'audio/episode-2.12-score.mp3')));
  // the Space half (views, Extend View panels with the host's rules) lives in test/host/host.js: HOST.space(file)
  await page.evaluate(([file, locale]) => {
    HOST.locale = locale;
    HOST.ctx.app.listFiles = async () => [...HOST.files.keys()];
    HOST.ctx.saveData({ trusted: [file], last: file });
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
// 2. Space (the plugin's own space.json): media bin left, stage in main, properties right, timeline in the bottom panel
const RECIPE = JSON.parse(readFileSync(join(root, 'spaces/forsion-video-studio/space.json'), 'utf8')).layout;
for (const dark of [true]) {
  const { page, errors } = await open({ width: 1600, height: 960 }, { dark, text: CAPTIONED });
  await page.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await ready(page); await analysed(page); await page.waitForTimeout(1500);
  await shot(page, '07-space-dark');
  if (errors.length) console.log('page errors:', errors);
  await page.close();
}
{
  const { page, errors } = await open({ width: 1600, height: 960 }, { text: CAPTIONED });
  await page.evaluate(([p, r]) => HOST.space(p, r), [FILE, RECIPE]);
  await ready(page); await analysed(page); await page.waitForTimeout(1500);
  await shot(page, '07-space');
  await page.click('.fvs-cap:nth-child(3)'); await ready(page); await page.waitForTimeout(800);
  await shot(page, '08-space-captions');
  await page.click('.fvs-ai-action'); await shot(page, '09-space-director');
  await page.click('.fvs-export-action'); await page.click('.fvs-menu button'); await shot(page, '10-space-export');
  await page.keyboard.press('Escape');
  await page.click('.host-bottom-close'); await shot(page, '10b-space-timeline-closed');
  if (errors.length) console.log('page errors:', errors);
  await page.close();
}
// 2b. no project: the Space's launch layout (navigation, project list) and the create page, dark and in English
for (const [dark, locale] of [[true, 'zh'], [false, 'en']]) {
  const { page, errors } = await open({ width: 1600, height: 960 }, { dark, locale });
  await page.evaluate(() => HOST.ctx.saveData({ ...HOST.data, last: null }));
  await page.evaluate(r => HOST.space(null, r), RECIPE);
  await page.waitForSelector('.fvs-launch-row');
  await shot(page, `12-launch-${dark ? 'dark' : locale}`);
  await page.click('.fvs-nav [data-nav="create"]'); await page.waitForSelector('.fvs-launch-card');
  await shot(page, `13-create-${dark ? 'dark' : locale}`);
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
