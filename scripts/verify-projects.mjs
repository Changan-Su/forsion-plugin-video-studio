// Real Electron, isolated: managing projects. A new project goes in the folder typed on the create page and starts
// with no scenes; the launchpad's rows and the in-project picker rename a project (through its open editor when it
// has one: unsaved work stays) and move it to the host's recycle bin: its own folder when nothing else lives there,
// only its file otherwise. The open project closes first and is not written back.
// A managed desktop with a throwaway home, user data dir and vault; /agent calls go to the desktop's stub engine.
// Point FVS_DESKTOP_ROOT at a desktop/ built with `npx electron-vite build`. A host without ctx.app.trash (2.12.2
// and before) has no "Delete": the steps that need it are skipped, and said so.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
assert.ok(existsSync(join(desktop, 'out/main/main.js')), `build the desktop first: npx electron-vite build in ${desktop}`);
const canTrash = /\btrash\?\(path: string\): Promise<void>/.test(readFileSync(join(desktop, 'frontend/src/amadeus/plugins/types.ts'), 'utf8'));
const req = createRequire(import.meta.url);
const H = req(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const electron = req(join(desktop, 'scripts/lib/launch-electron.cjs'));
const { startStubEngine } = req(join(desktop, 'scripts/lib/stub-engine.cjs'));
const shots = join(repo, 'artifacts/projects'); mkdirSync(shots, { recursive: true });
const skip = new Set(['.git', 'node_modules', 'artifacts']);

const home = mkdtempSync(join(tmpdir(), 'forsion-fvs-projects-'));
const userData = join(home, 'userdata'), vault = join(home, 'vault');
const sessions = [], errors = [];
const stub = await startStubEngine({
  sessions,
  agents: [{ slug: 'fvs-director', name: 'Video Studio 导演', description: '', model: '', thinkingLevel: 'medium', tools: [], systemPrompt: '', soul: '', skills: [], createdBy: 'user' }],
  override: async ({ path, method, body }) => {
    if (path === '/agent/sessions' && method === 'POST') {
      const input = await body();
      const session = { id: `fvs-chat-${sessions.length + 1}`, title: null, model_id: null, archived: false, emoji: null, ...input, app_id: 'tangu', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      sessions.unshift(session);
      return { session };
    }
    const detail = /^\/agent\/sessions\/([^/]+)\/detail$/.exec(path);
    if (detail) { const s = sessions.find(x => x.id === detail[1]); return s ? { session: s } : { __code: 404, body: { detail: 'Session not found' } }; }
    const config = /^\/agent\/sessions\/([^/]+)\/config$/.exec(path);
    if (config && method === 'GET') return { agent_config: sessions.find(x => x.id === config[1])?.agent_config || {} };
    if (path === '/agent/special/config') return { config: { muse: { enabled: false }, historian: { enabled: false } } };
  },
});
for (const dir of [userData, `${userData}-dev`, vault, join(home, 'workspace')]) mkdirSync(dir, { recursive: true });
for (const dir of [userData, `${userData}-dev`]) {
  writeFileSync(join(dir, 'amadeus-config.dev.json'), JSON.stringify({ lastVault: vault, localVault: vault }));
  writeFileSync(join(dir, 'tangu-desktop-config.json'), JSON.stringify({
    mode: 'managed', backendUrl: stub.url, token: 'e2e', cloudUrl: 'http://127.0.0.1:9',
    sandbox: 'none', browserEnabled: false, defaultWorkspaceDir: join(home, 'workspace'), modelId: 'm1', unitHostEnabled: false,
  }));
}
const installed = join(home, 'plugins/forsion-video-studio');
cpSync(repo, installed, { recursive: true, filter: p => !skip.has(basename(p)) });
if (process.env.FVS_MAIN) { cpSync(resolve(process.env.FVS_MAIN), join(installed, 'main.js')); console.log(`running ${process.env.FVS_MAIN} as main.js`); }

let app = null;
try {
  app = await electron.launch({ args: [`--user-data-dir=${userData}`, '--lang=zh-CN', desktop], cwd: desktop,
    env: { ...process.env, TANGU_HOME: home, TANGU_BACKEND_URL: stub.url, TANGU_BROWSER_CDP: 'off', TANGU_HARNESS_QUIET: '1' } });
  const win = await app.firstWindow();
  win.on('pageerror', e => { errors.push(String(e)); console.log(`[pageerror] ${e.stack || e}`); });
  await app.context().route('**/agent/**', async route => {
    const u = new URL(route.request().url());
    await route.continue({ url: `${stub.url}${u.pathname}${u.search}` });
  });
  await H.boot(app, win, { space: 'forsion-video-studio' });
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.waitForFunction(async () => (await window.tangu.getConfig()).backendState?.state === 'ready', null, { timeout: 40000 }).catch(() => assert.fail('the managed engine came up'));

  const tl = '.fvs-dock-timeline';
  let n = 0;
  const shot = async name => { await win.waitForTimeout(350); await H.captureWindow(app, join(shots, `${String(++n).padStart(2, '0')}-${name}.png`)); };
  const step = label => console.log(`· ${label}`);
  const until = async (fn, why, ms = 8000) => { for (const end = Date.now() + ms; Date.now() < end;) { if (fn()) return; await win.waitForTimeout(100); } assert.fail(why); };
  const text = file => (existsSync(file) ? readFileSync(file, 'utf8') : '');
  const row = name => win.locator('.fvs-launch-row').filter({ hasText: name });
  const rowMenu = async name => { await row(name).hover(); await row(name).locator('.fvs-launch-more').click(); return (await win.getByRole('menuitem').allTextContents()).map(x => x.trim()); };
  /** The create page with a name. `offered`: the folder typed last time, which the page fills in a moment after it
   *  shows (waited for: typing before it lands would be overwritten). `folder`: what to type there; '' clears it
   *  (the default folder), undefined keeps what the page offers. */
  const create = async (name, { folder, offered } = {}) => {
    await win.locator('.fvs-nav [data-nav="create"]').click();
    await win.waitForSelector('.fvs-launch-card');
    if (offered !== undefined) await win.waitForFunction(v => document.querySelector('.fvs-launch-folder input')?.value === v, offered, { timeout: 5000 })
      .catch(() => assert.fail(`the folder typed last time is offered again (${offered})`));
    await win.locator('.fvs-launch-name input').fill(name);
    if (folder !== undefined) await win.locator('.fvs-launch-folder input').fill(folder);
  };
  /** The launchpad has the window to itself: no project panels left on the right (the host's empty-side placeholder
   *  included) or at the bottom. */
  const alone = async why => {
    await win.waitForFunction(() => document.querySelector('.dv-edge-right')?.getAttribute('aria-pressed') !== 'true' && !document.querySelector('.dv-edge-bottom.is-on'), null, { timeout: 5000 })
      .catch(async () => assert.fail(`${why}: the right side and the timeline closed with the project (right ${await win.locator('.dv-edge-right').getAttribute('aria-pressed')}, text there: ${await win.getByText('这个侧栏是空的').count()})`));
  };
  const closeProject = async () => {
    await win.locator('.fvs-bar button[aria-label="更多"]').click();
    await win.getByRole('menuitem', { name: '关闭工程' }).click();
    await win.waitForSelector('.fvs-launch', { timeout: 10000 });
  };
  const answer = async value => {
    await win.waitForSelector('.dialog-input', { timeout: 5000 }).catch(() => assert.fail('the host asks for the new name'));
    assert.equal(await win.locator('.dialog .dialog-title').innerText(), '工程名称');
    await win.locator('.dialog-input').fill(value);
    await win.keyboard.press('Enter');
  };

  step('1 the create page: the project goes in the folder that was typed, and starts with no scenes');
  await win.waitForSelector('.fvs-launch', { timeout: 15000 });
  await create('片头', { folder: '视频/2026' });
  assert.match(await win.locator('.fvs-launch-note').first().innerText(), /视频\/2026\/片头\//, 'the page says where it goes');
  await shot('create');
  await win.locator('.fvs-launch-create').click();
  await win.waitForSelector('.fvs-bin', { timeout: 15000 });
  const made = join(vault, '视频/2026/片头/片头.fvs.md');
  assert.ok(existsSync(made), `the project is at ${made}`);
  assert.ok(!/^## /m.test(text(made)), 'a new project has no scenes');
  await win.waitForSelector('.fvs-studio .fvs-blank:not([hidden])', { timeout: 30000 }).catch(() => assert.fail('an empty project shows how to start'));
  assert.equal(await win.locator(`${tl} .fvs-clip`).count(), 0);
  assert.equal(await win.locator('.fvs-bar .fvs-export-action').isDisabled(), true, 'nothing to export yet');
  await win.waitForSelector('#tangu-splash', { state: 'detached', timeout: 15000 }).catch(() => {});
  await win.waitForTimeout(1200);
  await shot('empty-project');

  step('2 the stage\'s "New scene" adds the first scene');
  await win.locator('.fvs-studio .fvs-blank [data-blank="scene"]').click();
  await shot('templates');
  await win.locator('.fvs-template').first().click();
  await win.waitForSelector(`${tl} .fvs-clip`, { timeout: 10000 }).catch(() => assert.fail('the first scene is on the timeline'));
  assert.equal(await win.locator('.fvs-studio .fvs-blank').isHidden(), true);

  step('3 rename the open project from the picker: its editor makes the change, with the scene it had not saved yet');
  await win.locator(`${tl} .fvs-tl-add`).click();
  await win.locator('.fvs-template').nth(1).click(); // (an edit the editor is still holding)
  await win.locator('.fvs-studio .fvs-project').click();
  const pick = win.locator('.fvs-library .fvs-project-item').filter({ hasText: '片头' });
  await pick.waitFor({ timeout: 8000 });
  // through the row's "⋯" here, through a right click in step 4: the two ways in
  await pick.hover();
  await win.locator('.fvs-library .fvs-project-row').filter({ hasText: '片头' }).locator('.fvs-launch-more').click();
  const actions = (await win.getByRole('menuitem').allTextContents()).map(x => x.trim());
  assert.deepEqual(actions, canTrash ? ['重命名…', '在文件夹中显示', '删除'] : ['重命名…', '在文件夹中显示'], `a project's menu (${actions.join(' | ')})`);
  await shot('picker-menu');
  await win.getByRole('menuitem', { name: '重命名…' }).click();
  await shot('rename-dialog');
  await answer('片头 v2');
  await until(() => /"title": "片头 v2"/.test(text(made)) && (text(made).match(/^## /gm) || []).length === 2, `the new title and both scenes are in the file:\n${text(made).slice(0, 600)}`);
  await win.waitForTimeout(1000); // (a later save must not put the old title back)
  assert.match(text(made), /"title": "片头 v2"/);
  assert.equal(await win.locator('.fvs-studio .fvs-project-name').innerText(), '片头 v2', 'the editor shows the new name');

  if (!canTrash) console.log('· (this host has no ctx.app.trash: no "Delete", the recycle-bin steps are skipped)');
  else {
    step('4 delete the open project from the picker: it closes, and its folder is in the recycle bin');
    mkdirSync(join(dirname(made), 'media'), { recursive: true });
    writeFileSync(join(dirname(made), 'media/shot.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'));
    await win.waitForTimeout(2200); // (the host's file list is cached for a moment)
    if (!(await pick.isVisible().catch(() => false))) await win.locator('.fvs-studio .fvs-project').click();
    await win.locator('.fvs-library .fvs-project-item').filter({ hasText: '片头 v2' }).click({ button: 'right' });
    await win.getByRole('menuitem', { name: '删除' }).click();
    await win.waitForSelector('.fvs-launch', { timeout: 10000 }).catch(() => assert.fail('deleting the open project goes back to the launchpad'));
    await until(() => !existsSync(dirname(made)), `the project's folder left the library (${dirname(made)})`);
    // the host moves the folder first and writes the bin's index after it: wait for the entry, not for the move
    const index = () => { try { return JSON.parse(text(join(vault, '.trash/.meta.json')) || '{}'); } catch { return {}; } };
    const entry = () => Object.entries(index()).find(([, v]) => v.original === '视频/2026/片头');
    await until(entry, `the recycle bin has it, with where it was: ${JSON.stringify(index())}`);
    const binned = entry();
    assert.deepEqual(readdirSync(join(vault, '.trash', binned[0])).filter(x => !x.startsWith('.')).sort(), ['media', '片头.fvs.md'], 'the whole folder went, media and all');
    assert.match(text(join(vault, '.trash', binned[0], '片头.fvs.md')), /"title": "片头 v2"/, 'what went is the latest text');
    await win.waitForTimeout(1500);
    assert.ok(!existsSync(made), 'nothing wrote it back');
    assert.equal(await row('片头').count(), 0, 'the list forgot it');
    await alone('after deleting the open project');
    await shot('after-delete');

    step('5 a project that shares its folder: only its file goes, and the person is told');
    await create('共享', { offered: '视频/2026' });
    await win.locator('.fvs-launch-create').click();
    await win.waitForSelector('.fvs-bin', { timeout: 15000 });
    const shared = join(vault, '视频/2026/共享/共享.fvs.md');
    assert.ok(existsSync(shared), `the project is at ${shared}`);
    writeFileSync(join(dirname(shared), '随手记.md'), '# 随手记\n\n别的东西。\n');
    await closeProject();
    await alone('after closing a project');
    await row('共享').waitFor({ timeout: 8000 });
    await win.waitForTimeout(2500); // (the note has to reach the host's index)
    assert.deepEqual(await rowMenu('共享'), ['重命名…', '在文件夹中显示', '删除']);
    await shot('row-menu');
    await win.getByRole('menuitem', { name: '删除' }).click();
    await until(() => !existsSync(shared), 'the project file left the library');
    assert.ok(existsSync(join(dirname(shared), '随手记.md')), 'the other file of that folder stays');
    await row('共享').waitFor({ state: 'detached', timeout: 5000 });
    await win.getByText(/只把「共享」的工程文件移到了回收站/).first().waitFor({ timeout: 5000 }).catch(() => assert.fail('the person is told that only the file went'));
    await shot('file-only');
  }

  step('6 the location left empty is the default folder again; rename a closed project from its row');
  await create('草稿', { offered: '视频/2026', folder: '' });
  assert.match(await win.locator('.fvs-launch-note').first().innerText(), /Forsion Video Studio\/草稿\//, 'the page says where it goes');
  await win.locator('.fvs-launch-create').click();
  await win.waitForSelector('.fvs-bin', { timeout: 15000 });
  const draft = join(vault, 'Forsion Video Studio/草稿/草稿.fvs.md');
  assert.ok(existsSync(draft), `the project is at ${draft}`);
  await closeProject();
  await alone('after closing a project');
  await row('草稿').waitFor({ timeout: 8000 });
  await rowMenu('草稿');
  await win.getByRole('menuitem', { name: '重命名…' }).click();
  await answer('成稿');
  await until(() => /"title": "成稿"/.test(text(draft)), 'a closed project is renamed in its file');
  await row('成稿').waitFor({ timeout: 5000 }).catch(() => assert.fail('the row shows the new name'));
  await shot('renamed-row');

  // (Not here: the same actions on the host's own Workspace list. No default layout shows the plugin's list source,
  // so there is nothing to click in a fresh window; test/studio.e2e.mjs checks what the list source hands the host.)

  assert.deepEqual(errors, [], 'no page errors');
  console.log('projects verified:', shots);
} catch (e) {
  // what the window looked like when it failed
  const win = await app?.firstWindow().catch(() => null);
  if (win) {
    await H.captureWindow(app, join(shots, '99-failed.png')).catch(() => {});
    console.log('at failure:', await win.evaluate(() => ({
      space: localStorage.getItem('forsion_tangu_active_space'),
      main: [...document.querySelectorAll('.fvs-launch, .fvs-studio')].map(x => x.className),
      rows: [...document.querySelectorAll('.fvs-launch-row, .fvs-project-item')].map(x => x.dataset.projectPath).slice(0, 8),
      dialog: document.querySelector('.dialog-title')?.textContent || null,
    })).catch(err => String(err)));
  }
  throw e;
} finally {
  await app?.close().catch(() => {});
  await stub.close?.();
  try { rmSync(home, { recursive: true, force: true }); } catch { /* a temp dir */ }
}
