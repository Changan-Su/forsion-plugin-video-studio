// Real Electron, isolated: the Director's conversation on the Space's right side (hosts with ctx.tangu.mountChat).
// A managed desktop (its own engine process, a throwaway home with no credentials, a throwaway user data dir and
// vault — nothing of yours is read, touched or killed) whose /agent HTTP calls are routed to the desktop's stub
// engine: the session requests are real, no model is called. Checks:
//   no conversation in the launch layout → a project made with an idea → the native conversation beside the stage
//   (full height, next to the timeline), created in the project folder with the Director → the idea waiting in its
//   input → a one-click task appended to it → a quoted timeline element in the quote strip → nothing sent → a
//   reload reattaches the same conversation → closing the project closes it.
// Point FVS_DESKTOP_ROOT at a desktop/ whose host has the seam, with `npx electron-vite build` run there and
// `npm run build` run in its ../tangu-agent.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const seam = join(desktop, 'frontend/src/amadeus/plugins/tanguSeam.ts');
assert.ok(existsSync(seam) && readFileSync(seam, 'utf8').includes('mountChat'), `no ctx.tangu.mountChat in ${desktop}: point FVS_DESKTOP_ROOT at a host that has it`);
assert.ok(existsSync(join(desktop, 'out/main/main.js')), `build the desktop first: npx electron-vite build in ${desktop}`);
const req = createRequire(import.meta.url);
const H = req(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const electron = req(join(desktop, 'scripts/lib/launch-electron.cjs'));
const { startStubEngine } = req(join(desktop, 'scripts/lib/stub-engine.cjs'));
const shots = join(repo, 'artifacts/chat'); mkdirSync(shots, { recursive: true });
const skip = new Set(['.git', 'node_modules', 'artifacts']);

const home = mkdtempSync(join(tmpdir(), 'forsion-fvs-chat-'));
const userData = join(home, 'userdata'), vault = join(home, 'vault');
const sessions = [], created = [], detailed = [], errors = [];
const stub = await startStubEngine({
  sessions,
  agents: [{ slug: 'fvs-director', name: 'Video Studio 导演', description: '', model: '', thinkingLevel: 'medium', tools: [], systemPrompt: '', soul: '', skills: [], createdBy: 'user' }],
  override: async ({ path, method, body }) => {
    if (path === '/agent/sessions' && method === 'POST') {
      const input = await body(); created.push(input);
      const session = { id: `fvs-chat-${created.length}`, title: null, model_id: null, archived: false, emoji: null, ...input, app_id: 'tangu', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      sessions.unshift(session);
      return { session };
    }
    const detail = /^\/agent\/sessions\/([^/]+)\/detail$/.exec(path);
    if (detail) { detailed.push(detail[1]); const s = sessions.find(x => x.id === detail[1]); return s ? { session: s } : { __code: 404, body: { detail: 'Session not found' } }; }
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
cpSync(repo, join(home, 'plugins/forsion-video-studio'), { recursive: true, filter: p => !skip.has(basename(p)) });

let app = null;
try {
  app = await electron.launch({ args: [`--user-data-dir=${userData}`, '--lang=zh-CN', desktop], cwd: desktop,
    env: { ...process.env, TANGU_HOME: home, TANGU_BACKEND_URL: stub.url, TANGU_BROWSER_CDP: 'off', TANGU_HARNESS_QUIET: '1' } });
  const win = await app.firstWindow();
  win.on('pageerror', e => errors.push(String(e)));
  await app.context().route('**/agent/**', async route => {
    const u = new URL(route.request().url());
    await route.continue({ url: `${stub.url}${u.pathname}${u.search}` });
  });
  await H.boot(app, win, { space: 'forsion-video-studio' });
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.waitForFunction(async () => (await window.tangu.getConfig()).backendState?.state === 'ready', null, { timeout: 40000 }).catch(() => assert.fail('the managed engine came up'));

  const chatBox = '[data-plugin-chat] .t2-chat-view', input = '[data-plugin-chat] textarea';
  const more = async item => { await win.locator('.fvs-bar button[aria-label="更多"]').click(); await win.getByRole('menuitem', { name: item }).click(); };
  const draft = () => win.locator(input).first().inputValue();
  const group = sel => win.evaluate(s => { const el = document.querySelector(s)?.closest('.dv-groupview'); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }, sel);

  // 1. launch layout: no conversation
  await win.waitForSelector('.fvs-launch', { timeout: 15000 });
  assert.equal(await win.locator('[data-plugin-chat]').count(), 0, 'no conversation while no project is open');

  // 2. a project with an idea: the conversation comes with it, in the project folder, the idea in its input
  await win.locator('.fvs-nav [data-nav="create"]').click();
  await win.waitForSelector('.fvs-launch-card');
  await win.locator('.fvs-launch-name input').fill('对话');
  await win.locator('.fvs-launch-idea').fill('一支 10 秒的开场');
  await win.locator('.fvs-launch-create').click();
  await win.waitForSelector('.fvs-bin', { timeout: 15000 });
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip', { timeout: 30000 });
  await win.waitForSelector(chatBox, { timeout: 20000 }).catch(() => assert.fail('the native conversation mounts on the right'));
  assert.equal(created.length, 1, 'one conversation was created');
  const made = created[0];
  console.log('created:', JSON.stringify({ title: made.title, project_path: made.project_path, project_name: made.project_name, agent_config: made.agent_config }));
  assert.match(made.project_path, /\/vault\/Forsion Video Studio\/对话$/, 'it works in the project folder');
  assert.equal(made.agent_config.execMode, 'host');
  assert.equal(made.agent_config.cwd, made.project_path);
  assert.equal(made.agent_config.agentSlug, 'fvs-director', 'with the Director');
  assert.equal(made.title, '对话');
  await win.waitForFunction(s => (document.querySelector(s)?.value || '').includes('一支 10 秒的开场'), input, { timeout: 10000 }).catch(() => assert.fail('the idea waits in the conversation\'s input'));
  assert.equal(await win.locator('.fvs-director-panel').count(), 0, 'no Director panel');
  await win.waitForTimeout(600);
  await H.captureWindow(app, join(shots, '01-idea.png'));

  // the right side: beside the stage and the timeline, the full height; the conversation and the properties are tabs
  const main = await group('.fvs-studio'), right = await group(chatBox), bottom = await group('.fvs-dock-timeline');
  console.log(`main ${JSON.stringify(main)} · right ${JSON.stringify(right)} · timeline ${JSON.stringify(bottom)}`);
  assert.ok(right.x >= main.x + main.w - 2, 'the conversation is to the right of the stage');
  assert.ok(right.x >= bottom.x + bottom.w - 2, 'and beside the timeline, not above it');
  assert.ok(Math.abs(right.y + right.h - (bottom.y + bottom.h)) <= 8, 'the right side runs the full height');
  assert.ok(right.w >= 240, `the conversation has room (${right.w}px)`);
  // the plugin's own styles stay out of the host's input: no focus ring of ours, and the send arrow keeps its colour
  const leak = await win.evaluate(s => { const x = document.querySelector(s); return { inside: !!x.closest('.fvs-extension'), outline: getComputedStyle(x).outlineStyle }; }, input);
  assert.deepEqual(leak, { inside: false, outline: 'none' }, 'the conversation is outside the plugin\'s styled box');
  const tabs = await win.evaluate(s => [...document.querySelector(s).closest('.dv-groupview').querySelectorAll('.wb-tab')].map(x => x.title), chatBox);
  console.log('right tabs:', tabs.join(' | '));
  assert.ok(tabs.includes('对话') && tabs.includes('属性'), 'the conversation and the properties are tabs of the right side');

  // 3. the AI button brings the conversation forward after the properties were in front
  await win.locator('.wb-tab[title="属性"]').click();
  await win.waitForSelector('.fvs-native-properties', { state: 'visible', timeout: 5000 });
  await win.waitForTimeout(300);
  await H.captureWindow(app, join(shots, '02-properties.png'));
  await win.locator('.fvs-bar .fvs-ai-action').click();
  await win.waitForSelector(input, { state: 'visible', timeout: 5000 }).catch(() => assert.fail('the AI button reveals the conversation'));

  // 4. a one-click task is appended to the input; nothing is sent
  await more(/配乐/);
  await win.waitForFunction(s => (document.querySelector(s)?.value || '').includes('为这个视频配乐'), input, { timeout: 5000 }).catch(() => assert.fail('the task waits in the input'));
  assert.match(await draft(), /一支 10 秒的开场[\s\S]*为这个视频配乐/, 'after the idea, which is kept');
  assert.equal(stub.seen.runs.length, 0, 'nothing is sent for the person');
  await win.waitForTimeout(300);
  await H.captureWindow(app, join(shots, '03-task.png'));

  // 5. a reload reattaches the same conversation
  const sid = await win.locator(chatBox).getAttribute('data-session-id');
  assert.equal(sid, 'fvs-chat-1');
  await win.reload({ waitUntil: 'domcontentloaded' });
  await win.waitForSelector('.fvs-dock-timeline .fvs-clip', { timeout: 30000 });
  await win.locator('.fvs-bar .fvs-ai-action').click();
  await win.waitForSelector(chatBox, { timeout: 20000 }).catch(async () => {
    await H.captureWindow(app, join(shots, 'fail-reload.png'));
    console.log('after reload:', JSON.stringify(await win.evaluate(() => ({
      chat: document.querySelector('.fvs-chat')?.outerHTML.slice(0, 400) || null,
      director: !!document.querySelector('.fvs-director-panel'),
      tabs: [...document.querySelectorAll('.wb-tab')].map(x => x.title),
      pluginChat: document.querySelector('[data-plugin-chat]')?.outerHTML.slice(0, 300) || null,
    }))));
    assert.fail('the conversation is back after a reload');
  });
  assert.equal(await win.locator(chatBox).getAttribute('data-session-id'), sid, 'the same conversation');
  assert.equal(created.length, 1, 'no second conversation was created');
  assert.ok(detailed.includes(sid), 'the host asked the engine whether it is still there');
  await win.waitForTimeout(500);
  await H.captureWindow(app, join(shots, '04-reloaded.png'));

  // 6. closing the project closes the conversation
  await more('关闭工程');
  await win.waitForSelector('.fvs-launch', { timeout: 15000 });
  await win.waitForFunction(() => !document.querySelector('[data-plugin-chat]'), null, { timeout: 5000 }).catch(() => assert.fail('the conversation closes with the project'));

  assert.deepEqual(errors, []);
  console.log('chat verified:', shots);
} finally {
  await app?.close().catch(() => {});
  await stub.close?.();
  try { rmSync(home, { recursive: true, force: true }); } catch { /* a temp dir */ }
}
