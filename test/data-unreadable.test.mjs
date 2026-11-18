// Saved plugin data ({ last, folder, trusted }) that the host says was saved but cannot be read
// (ctx.loadData() rejects with code 'plugin-data-unreadable', hosts from 2026-11-17 on): nothing may be saved over it,
// the trust gate stays closed except for what the person trusts now (for this session only), and they are told.
// Drives the built main.js the way the host does (new Function('ctx', src)); FVS_MAIN=<another main.js> runs the same
// cases against another build (a negative control). The trust gate needs a page: that part runs in Chromium against
// the mock host (test/host) and prints SKIP without playwright-core or a Chromium.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { makeT } from '../src/ui/i18n.js';
import { emptyTemplate } from '../src/lib/templates.js';
import { serveVault } from './vault-route.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const MAIN = process.env.FVS_MAIN ? resolve(process.env.FVS_MAIN) : join(here, '..', 'main.js');
const src = readFileSync(MAIN, 'utf8');
const zh = makeT({ getLocale: () => 'zh' }), en = makeT({ getLocale: () => 'en' });
const unreadable = () => Object.assign(new Error('plugin-data-unreadable'), { code: 'plugin-data-unreadable', reason: 'invalid-json' });
const settle = async () => { for (let i = 0; i < 8; i++) await new Promise(r => setTimeout(r, 0)); };

/** One plugin instance on a host without a page: what it saved, what it said, what it opened. */
function boot({ loadData = async () => null, locale = 'zh', notify = null } = {}) {
  const files = new Map(), saves = [], notes = [], opened = [], views = [];
  const reg = { creators: [], commands: [] };
  const ctx = {
    getLocale: () => locale,
    app: {
      workFolder: () => 'Forsion Video Studio',
      readFile: async p => (files.has(p) ? files.get(p) : null),
      writeFile: async (p, t) => { files.set(p, String(t)); },
      listFiles: async () => [...files.keys()],
      openFile: p => opened.push(p),
    },
    notify: notify || ((m, o) => notes.push({ m: String(m), level: o?.level })),
    loadData,
    saveData: async d => { saves.push(JSON.parse(JSON.stringify(d))); },
    registerFileType: () => true,
    registerFileCreator: d => reg.creators.push(d),
    registerCommand: d => reg.commands.push(d),
    registerSlashItem() {}, registerEmbedRenderer() {}, registerView() {}, registerListSource() {},
    openView: v => views.push(v),
  };
  new Function('ctx', src)(ctx);
  const newProject = async folder => { await reg.creators[0]?.run?.(folder); await settle(); };
  const openLast = async () => { await reg.commands.find(c => c.id === 'fvs-open-project')?.run?.(); await settle(); };
  return { files, saves, notes, opened, views, newProject, openLast };
}

test('unreadable data: a new project is created, nothing is saved, and the person is told once', async () => {
  const b = boot({ loadData: async () => { throw unreadable(); } });
  await b.newProject('Videos');
  await b.newProject('Videos');
  assert.equal([...b.files.keys()].filter(p => p.endsWith('.fvs.md')).length, 2, 'both projects were written');
  assert.deepEqual(b.saves, [], 'no saveData: the trust list, last project and folder stay as they were');
  assert.equal(b.notes.length, 1, `one notice for the plugin instance, not one per read (${JSON.stringify(b.notes)})`);
  assert.equal(b.notes[0]?.m, zh('data-unreadable'));
  assert.equal(b.notes[0]?.level, 'warning');
});

test('unreadable data: the notice reads in English with no Chinese and no path', async () => {
  const b = boot({ loadData: async () => { throw unreadable(); }, locale: 'en' });
  await b.newProject('Videos');
  assert.equal(b.notes.length, 1, JSON.stringify(b.notes));
  assert.equal(b.notes[0]?.m, en('data-unreadable'));
  assert.ok(!/[一-鿿]/.test(en('data-unreadable')) && !/[一-鿿]/.test(en('trust-unsaved')), 'English has no Chinese');
  assert.ok(zh('data-unreadable') !== 'data-unreadable' && zh('trust-unsaved') !== 'trust-unsaved', 'Chinese text exists');
  for (const s of [zh('data-unreadable'), en('data-unreadable'), zh('trust-unsaved'), en('trust-unsaved')]) assert.ok(!/\.json|\/|\\/.test(s), `no path in "${s}"`);
});

test('"Open the last project" with unreadable data opens nothing, starts nothing, and says why every time', async () => {
  const b = boot({ loadData: async () => { throw unreadable(); } });
  await b.openLast();
  await b.openLast();
  assert.deepEqual(b.views, [], 'the create page is not opened in place of the unknown last project');
  assert.deepEqual(b.opened, [], 'no project is opened');
  assert.deepEqual(b.saves, [], 'nothing is saved');
  assert.equal(b.notes.length, 2, `asked twice, told twice (${JSON.stringify(b.notes)})`);
  assert.ok(b.notes.every(n => n.m === zh('data-unreadable') && n.level === 'warning'));
  // after that, a read the person did not ask for does not repeat it
  await b.newProject('Videos');
  assert.equal(b.notes.length, 2, 'passive reads stay quiet once told');
  assert.deepEqual(b.saves, []);
});

test('unreadable data: a notice that throws does not turn into a save', async () => {
  const b = boot({ loadData: async () => { throw unreadable(); }, notify: () => { throw new Error('notify broke'); } });
  await b.newProject('Videos');
  assert.equal([...b.files.keys()].filter(p => p.endsWith('.fvs.md')).length, 1, 'the project was written');
  assert.deepEqual(b.saves, [], 'still no saveData');
});

test('unreadable, then another kind of read error: still nothing is saved until a read works', async () => {
  let n = 0;
  const b = boot({ loadData: async () => { if (n++ === 0) throw unreadable(); throw new Error('EIO'); } });
  await b.newProject('Videos');
  await b.newProject('Videos');
  assert.equal([...b.files.keys()].filter(p => p.endsWith('.fvs.md')).length, 2, 'both projects were written');
  assert.deepEqual(b.saves, [], 'no saveData after the unreadable read, whatever the next read says');
});

test('nothing saved yet (and older hosts): saving works and nothing is said', async () => {
  const b = boot({ loadData: async () => null });
  await b.newProject('Videos');
  assert.equal(b.saves.length, 1, JSON.stringify(b.saves));
  assert.deepEqual(b.saves[0].trusted, [[...b.files.keys()][0]]);
  assert.deepEqual(b.notes, []);
  await b.openLast();
  assert.deepEqual(b.views, ['studio'], 'with no last project the command shows the create page, as before');
  assert.deepEqual(b.notes, []);
});

test('readable data: trusting a new project keeps the last project, the folder and the list', async () => {
  const saved = { last: 'Films/a/a.fvs.md', folder: 'Films', trusted: ['Films/b/b.fvs.md'] };
  const b = boot({ loadData: async () => JSON.parse(JSON.stringify(saved)) });
  await b.newProject('Videos');
  const made = [...b.files.keys()][0];
  assert.deepEqual(b.saves, [{ ...saved, trusted: ['Films/b/b.fvs.md', made] }]);
  assert.deepEqual(b.notes, []);
});

test('another kind of read error behaves as before: no notice, not paused', async () => {
  const b = boot({ loadData: async () => { throw new Error('EIO'); } });
  await b.newProject('Videos');
  assert.deepEqual(b.notes, []);
  assert.equal(b.saves.length, 1);
});

// ── the trust gate in a page ──────────────────────────────────────────────────────────────────────────────────────
const require = createRequire(import.meta.url);
const pw = (() => { for (const m of ['playwright-core', 'playwright']) { try { return require(m); } catch { /* next */ } } return null; })();
let browser = null, why = pw ? '' : 'playwright-core is not installed';
if (pw) for (const opt of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
  try { browser = await pw.chromium.launch(opt); break; } catch (e) { why = `no Chromium to run (${String(e.message || e).split('\n')[0]})`; }
}
if (!browser) console.log(`SKIP trust gate tests: ${why}`);
test.after(async () => { await browser?.close(); });

const ORIGIN = 'http://fvs.test', FILE = 'Videos/demo/demo.fvs.md';
async function hostPage(loadData) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
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
  await page.evaluate(([file, text, mode]) => {
    HOST.files.set(file, text);
    window.__saves = []; window.__notes = [];
    const save = HOST.ctx.saveData;
    HOST.ctx.saveData = d => { window.__saves.push(JSON.parse(JSON.stringify(d))); return save(d); };
    HOST.ctx.notify = (m, o) => { window.__notes.push({ m: String(m), level: o && o.level }); };
    if (mode === 'unreadable') HOST.ctx.loadData = async () => { throw Object.assign(new Error('plugin-data-unreadable'), { code: 'plugin-data-unreadable', reason: 'invalid-json' }); };
    if (mode === 'null') HOST.ctx.loadData = async () => null;
  }, [FILE, emptyTemplate({ title: 'demo' }), loadData]);
  await page.evaluate(s => HOST.load(s), src);
  const state = () => page.evaluate(() => ({ saves: window.__saves, notes: window.__notes, gate: !!document.querySelector('.fvs-gate'), frame: !!document.querySelector('.fvs-view iframe') }));
  const open = async () => {
    await page.evaluate(p => HOST.open(p), FILE);
    await page.waitForFunction(() => document.querySelector('.fvs-gate') || document.querySelector('.fvs-view iframe'), null, { timeout: 15000 });
    await page.waitForTimeout(300);
  };
  return { page, errors, state, open };
}

test('trust gate, unreadable data: the gate shows, "Run preview" runs it for this session only and saves nothing', { skip: !browser && why }, async () => {
  const h = await hostPage('unreadable');
  await h.open();
  let s = await h.state();
  assert.ok(s.gate && !s.frame, 'an unreadable trust list trusts nothing: the gate shows');
  const onOpening = s.notes;
  await h.page.click('.fvs-gate button');
  await h.page.waitForSelector('.fvs-view iframe', { timeout: 15000 });
  await h.page.waitForTimeout(300);
  s = await h.state();
  assert.deepEqual(s.saves, [], 'pressing "Run preview" saves nothing over the unreadable data');
  assert.equal(onOpening.length, 1, `told once on opening (${JSON.stringify(onOpening)})`);
  assert.equal(onOpening[0]?.m, zh('data-unreadable'));
  assert.equal(s.notes.length, 2, JSON.stringify(s.notes));
  assert.equal(s.notes[1]?.m, zh('trust-unsaved'), 'and says the trust will not be kept');
  assert.equal(s.notes[1]?.level, 'warning');
  // opened again in the same session: still trusted, nothing more said, still nothing saved
  await h.open();
  s = await h.state();
  assert.ok(s.frame && !s.gate, 'trusted for the rest of this session');
  assert.equal(s.notes.length, 2, JSON.stringify(s.notes));
  assert.deepEqual(s.saves, []);
  assert.deepEqual(h.errors, []);
  await h.page.close();
});

test('trust gate, nothing saved yet: "Run preview" saves the trust and says nothing', { skip: !browser && why }, async () => {
  const h = await hostPage('null');
  await h.open();
  assert.ok((await h.state()).gate);
  await h.page.click('.fvs-gate button');
  await h.page.waitForSelector('.fvs-view iframe', { timeout: 15000 });
  await h.page.waitForTimeout(300);
  const s = await h.state();
  assert.ok(s.saves.some(d => Array.isArray(d.trusted) && d.trusted.includes(FILE)), JSON.stringify(s.saves));
  assert.deepEqual(s.notes, []);
  await h.page.close();
});
