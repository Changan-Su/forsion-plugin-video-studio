// Real Electron, isolated: the right side of the Space keeps answering. The host takes the properties away with
// every layout it rebuilds or folds (its "restore this Space's default layout" button, the right-side toggle,
// another Space and back), and none of that is the person closing them. Also: every track name and the audio
// lane lead somewhere, and what the Director can be asked is under its own button.
// A managed desktop with a throwaway home, user data dir and vault; /agent calls go to the desktop's stub engine.
//   FVS_TRACE=1      print what the plugin got back from the host (the copy under test is patched, not the repo)
//   FVS_MAIN=<file>  run another build's main.js (a negative control: the released one must fail these checks)
// Point FVS_DESKTOP_ROOT at a desktop/ whose host has ctx.tangu.mountChat, built with `npx electron-vite build`.
// A host that tells a fold from the person's close (Extend View's "layout" reason, after 2.12.2) gets two more steps
// (3c, 3d); an earlier one skips them and says so.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedScenes } from './lib/seed.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const desktop = resolve(process.env.FVS_DESKTOP_ROOT || join(repo, '../../Forsion-Genesis/desktop'));
const seam = join(desktop, 'frontend/src/amadeus/plugins/tanguSeam.ts');
assert.ok(existsSync(seam) && readFileSync(seam, 'utf8').includes('mountChat'), `no ctx.tangu.mountChat in ${desktop}: point FVS_DESKTOP_ROOT at a host that has it`);
assert.ok(existsSync(join(desktop, 'out/main/main.js')), `build the desktop first: npx electron-vite build in ${desktop}`);
const saysLayout = /ExtendViewCloseReason = [^\n]*'layout'/.test(readFileSync(join(desktop, '../lcl/engine/extendView.ts'), 'utf8'));
const req = createRequire(import.meta.url);
const H = req(join(desktop, 'scripts/lib/uiux-electron.cjs'));
const electron = req(join(desktop, 'scripts/lib/launch-electron.cjs'));
const { startStubEngine } = req(join(desktop, 'scripts/lib/stub-engine.cjs'));
const shots = join(repo, 'artifacts/reset'); mkdirSync(shots, { recursive: true });
const skip = new Set(['.git', 'node_modules', 'artifacts']);

const home = mkdtempSync(join(tmpdir(), 'forsion-fvs-reset-'));
const userData = join(home, 'userdata'), vault = join(home, 'vault');
const sessions = [], created = [], errors = [];
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
if (process.env.FVS_TRACE) {
  let js = readFileSync(join(installed, 'main.js'), 'utf8');
  // exact strings of the built file: a trace point that moved is skipped, not fatal
  const patch = (from, to) => { if (js.includes(from)) js = js.replace(from, to); else console.log(`(trace point gone: ${from.slice(0, 50)}…)`); };
  patch('const swapped = ctx2.replaceView("nav", "media");', 'const swapped = ctx2.replaceView("nav", "media"); console.log("[fvs-trace] replaceView nav>media =", swapped, "fromLaunch", fromLaunch, "initial", initial);');
  patch('async function load(next, { initial = false, idea = "" } = {}) {', 'async function load(next, { initial = false, idea = "" } = {}) {\n        console.log("[fvs-trace] load(", next, ") initial", initial, "path", path);');
  patch('ctx2.replaceView("media", "nav");', 'console.log("[fvs-trace] launch: media>nav");\n          ctx2.replaceView("media", "nav");');
  patch('inspectorHandle = null;\n            if (reason === "dismiss"', 'inspectorHandle = null;\n            console.log("[fvs-trace] properties closed:", reason, "@", Math.round(performance.now()));\n            if (reason === "dismiss"');
  patch('function mountChat(el) {', 'function mountChat(el) {\n      console.log("[fvs-trace] conversation view mounted @", Math.round(performance.now()));');
  writeFileSync(join(installed, 'main.js'), js);
}
// a third of a second of silence: an audio file for the lane
const wav = join(home, 'tone.wav');
{ const n = 8000 * .3, b = Buffer.alloc(44 + n * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40); writeFileSync(wav, b); }

let app = null;
try {
  app = await electron.launch({ args: [`--user-data-dir=${userData}`, '--lang=zh-CN', desktop], cwd: desktop,
    env: { ...process.env, TANGU_HOME: home, TANGU_BACKEND_URL: stub.url, TANGU_BROWSER_CDP: 'off', TANGU_HARNESS_QUIET: '1' } });
  const win = await app.firstWindow();
  win.on('pageerror', e => { errors.push(String(e)); console.log(`[pageerror] ${e.stack || e}`); });
  win.on('console', m => { if (m.text().includes('[fvs-trace]')) console.log(m.text()); });
  await app.context().route('**/agent/**', async route => {
    const u = new URL(route.request().url());
    await route.continue({ url: `${stub.url}${u.pathname}${u.search}` });
  });
  await H.boot(app, win, { space: 'forsion-video-studio' });
  if ((await H.activeSpace(win)) !== 'forsion-video-studio') assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'the plugin Space is on the ribbon');
  await win.waitForFunction(async () => (await window.tangu.getConfig()).backendState?.state === 'ready', null, { timeout: 40000 }).catch(() => assert.fail('the managed engine came up'));

  // who moved the keyboard, and when (FVS_TRACE): every focus() call with its callers, every focus that landed
  if (process.env.FVS_TRACE) await win.evaluate(() => {
    const name = x => `<${x.tagName?.toLowerCase()} ${String(x.className || '').slice(0, 36)}${x.dataset?.key ? ` key=${x.dataset.key}` : ''}>`;
    const focus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function (...a) { console.log('[fvs-trace] focus()', name(this), '<-', new Error().stack.split('\n').slice(2, 7).map(l => l.trim().replace(/^at /, '').split(' ')[0]).join(' < '), '@', Math.round(performance.now())); return focus.apply(this, a); };
    window.addEventListener('focusin', e => console.log('[fvs-trace] focusin', name(e.target), '@', Math.round(performance.now())), true);
  });
  const input = '[data-plugin-chat] textarea', props = '.fvs-native-properties', tl = '.fvs-dock-timeline';
  let n = 0;
  const shot = async name => { await win.waitForTimeout(350); await H.captureWindow(app, join(shots, `${String(++n).padStart(2, '0')}-${name}.png`)); };
  const step = label => console.log(`· ${label}`);
  const menu = async (button, item) => { await win.locator(button).click(); await win.getByRole('menuitem', { name: item }).click(); };
  const ask = item => menu('.fvs-bar .fvs-ai-action', item);
  const draft = () => win.locator(input).first().inputValue();
  const clip = (k = 0) => win.locator(`${tl} .fvs-clip`).nth(k).click({ position: { x: 30, y: 8 } });
  const edge = side => win.locator(`.dv-edge-${side}`).click();
  const sideOn = async () => (await win.locator('.dv-edge-right').getAttribute('aria-pressed')) === 'true';
  /** The right side's tabs. */
  const tabs = () => win.evaluate(() => { const g = [...document.querySelectorAll('.dv-groupview')].find(x => x.querySelector('.wb-tab[title="对话"], .wb-tab[title="属性"]')); return g ? [...g.querySelectorAll('.wb-tab')].map(t => t.title) : []; });
  const shown = (sel, why, ms = 6000) => win.waitForSelector(sel, { state: 'visible', timeout: ms }).catch(() => assert.fail(why));
  const gone = (sel, why, ms = 6000) => win.waitForFunction(s => !document.querySelector(s)?.getClientRects().length, sel, { timeout: ms }).catch(() => assert.fail(why));
  const both = async why => { const t = (await tabs()).sort(); assert.deepEqual(t, ['对话', '属性'].sort(), `${why}: the right side is the conversation and the properties, nothing else (${t.join(' | ') || 'nothing'})`); };
  const tab = () => win.locator(`${props} .fvs-tabs [aria-selected="true"]`).getAttribute('data-tab');
  /** Every tab of the workbench's side groups (icon tabs carry their name as a title). */
  const sideTabs = () => win.evaluate(() => [...document.querySelectorAll('.wb-tab--icon')].map(t => t.title));
  /** The person closes a side tab: its context menu. */
  const closeTab = async title => {
    await win.locator(`.wb-tab[title="${title}"]`).click({ button: 'right' });
    await win.locator('.ctx-menu button').filter({ hasText: /^\s*关闭\s*$/ }).click();
    await win.waitForFunction(t => !document.querySelector(`.wb-tab[title="${t}"]`), title, { timeout: 5000 }).catch(() => assert.fail(`the ${title} tab closed`));
  };

  step('a project: the conversation and the properties share the right side, the properties in front');
  await win.waitForSelector('.fvs-launch', { timeout: 15000 });
  await win.locator('.fvs-nav [data-nav="create"]').click();
  await win.waitForSelector('.fvs-launch-card');
  await win.locator('.fvs-launch-name input').fill('重置');
  await win.locator('.fvs-launch-create').click();
  await win.waitForSelector('.fvs-bin', { timeout: 15000 });
  await seedScenes(win, vault, '重置', `${tl} .fvs-clip`);
  await shown(props, 'the properties open with the project', 20000);
  await both('a project');
  await shot('open');

  step('1 the host\'s "restore default layout": the properties come back with it');
  await edge('reset');
  await shown(props, 'the properties are back after the layout was reset', 10000);
  await win.waitForFunction(() => document.querySelector('.wb-tab[title="对话"]'), null, { timeout: 10000 }).catch(() => assert.fail('the conversation is back after the layout was reset'));
  await both('after a reset');
  await shot('after-reset');

  step('2 behind the conversation, a click on the timeline brings the properties forward; the keys stay with the timeline');
  await ask('打开对话');
  await shown(input, 'the AI button\'s first entry opens the conversation');
  await clip(1);
  await shown(props, 'a click on a scene shows its properties');
  assert.ok(await win.evaluate(s => document.querySelector(s)?.contains(document.activeElement), tl), 'the keyboard is still on the timeline');
  await ask('打开对话'); await shown(input, 'the conversation again');
  await win.locator(`${tl} .fvs-el`).first().click();
  await shown(props, 'a click on an element shows its properties');
  assert.equal(await tab(), 'scene');
  // A double-click asks for the element's "in" time: the field has the keyboard and keeps it (the host puts its own
  // focus on the panel's first control a moment later), with the properties in front and from behind the conversation.
  const inField = () => win.evaluate(() => /^tin:/.test(document.activeElement?.dataset.key || ''));
  const editIn = async why => {
    await win.locator(`${tl} .fvs-el`).first().dblclick({ delay: 40 });
    await win.waitForFunction(() => /^tin:/.test(document.activeElement?.dataset.key || ''), null, { timeout: 5000 }).catch(async () => {
      const at = await win.evaluate(() => { const a = document.activeElement; return `keyboard on <${a?.tagName.toLowerCase()} class="${a?.className}" data-key="${a?.dataset.key || ''}">, fields: ${[...document.querySelectorAll('[data-key^="tin:"]')].map(x => x.dataset.key).join(' ') || 'none'}, selected: ${document.querySelector('.fvs-el.on')?.dataset.tag ?? 'none'}`; });
      assert.fail(`${why}: a double-click on an element puts the caret in its "in" time (${at})`);
    });
    await win.waitForTimeout(500);
    assert.ok(await inField(), `${why}: and the caret stays there`);
  };
  await editIn('the properties in front');
  await ask('打开对话'); await shown(input, 'the conversation once more');
  await editIn('from behind the conversation');
  await shown(props, 'which shows the properties');
  // a right-click keeps its menu: from behind the conversation, where a click would bring the properties forward,
  // a right-click must not (the host's focus on the panel would close the menu)
  await ask('打开对话'); await shown(input, 'the conversation in front for a right-click');
  await win.locator(`${tl} .fvs-hitm`).nth(1).click({ button: 'right' }); // (the first one is under the clip's trim handle)
  await win.waitForTimeout(500);
  assert.equal(await win.getByRole('menuitem', { name: '引用到对话' }).count(), 1, 'the menu of a right-clicked hit stays open');
  await win.keyboard.press('Escape');

  step('3 the right side folded and opened again with the host\'s toggle: both tabs are back; folded, a click does not open it');
  await edge('right');
  await clip(1); // at once: while the side is still folding, a click must not open the properties into it
  await win.waitForFunction(() => !document.querySelector('.wb-tab[title="对话"]'), null, { timeout: 5000 }).catch(() => assert.fail('the right side folded'));
  await win.waitForTimeout(700);
  assert.equal(await sideOn(), false, 'a click while the side folds leaves it folding');
  await clip(0); await win.waitForTimeout(700);
  assert.equal(await sideOn(), false, 'a click on the timeline leaves a folded side folded');
  assert.equal(await win.locator(props).count(), 0);
  await edge('right');
  await shown(props, 'the properties come back with the side');
  await both('after the side was folded and opened');
  await shot('side-reopened');

  step('3b the properties closed from their own ×: the next double-click still reaches the field; a side folded with only the conversation stays folded');
  await win.locator('.wb-extend[aria-label="属性"] .wb-extend-close').click();
  await gone(props, 'the × closes the properties');
  await win.waitForTimeout(500);
  await editIn('after the properties were closed from their ×'); // (opening them redraws the timeline between the two clicks)
  await shown(props, 'which opens them again');
  await win.locator('.wb-extend[aria-label="属性"] .wb-extend-close').click();
  await gone(props, 'closed again');
  await win.waitForTimeout(500);
  await edge('right');
  await win.waitForFunction(() => !document.querySelector('.wb-tab[title="对话"]'), null, { timeout: 5000 }).catch(() => assert.fail('the conversation-only side folded'));
  await win.waitForTimeout(500);
  await clip(1); await win.waitForTimeout(700);
  assert.equal(await sideOn(), false, 'no panel of ours went with this fold, and a click still leaves the side folded');
  await edge('right');
  await shown(props, 'the properties come back with the side');
  await both('after a conversation-only side was folded and opened');

  if (!saysLayout) step('(3c, 3d skipped: this host says "dismiss" for a fold too, and leaves its placeholder beside a view opened into an emptied side)');
  else {
    step('3c the conversation\'s tab closed, then the side folded: the host says it was a fold, and the properties are back with the side');
    await closeTab('对话');
    await win.waitForTimeout(500);
    await shown(props, 'closing the conversation\'s tab leaves the properties');
    await edge('right');
    await win.waitForFunction(() => !document.querySelector('.wb-tab[title="属性"]'), null, { timeout: 5000 }).catch(() => assert.fail('the properties-only side folded'));
    await win.waitForTimeout(500);
    await clip(1); await win.waitForTimeout(700);
    assert.equal(await sideOn(), false, 'a click leaves a folded properties-only side folded');
    await edge('right'); // the host puts back what the side held when it was last folded with real views: the conversation
    await win.waitForFunction(() => document.querySelector('.wb-tab[title="对话"]'), null, { timeout: 6000 }).catch(() => assert.fail('the side came back with the conversation'));
    await shown(props, 'folding a side that held only the properties did not turn them off: they are back with the side', 6000);
    await both('after a properties-only side was folded and opened');

    step('3d the side emptied by hand, then the conversation asked for: the host\'s "empty side" placeholder does not stay beside it');
    await win.locator('.wb-extend[aria-label="属性"] .wb-extend-close').click();
    await gone(props, 'the × closes the properties');
    await closeTab('对话');
    await win.waitForFunction(() => [...document.querySelectorAll('.wb-tab--icon')].some(t => t.title === '空侧栏'), null, { timeout: 5000 }).catch(async () => assert.fail(`an emptied side shows the host's placeholder (${(await sideTabs()).join(' | ')})`));
    await ask('打开对话');
    await shown(input, 'the conversation opens in the emptied side');
    await win.waitForTimeout(600);
    assert.ok(!(await sideTabs()).includes('空侧栏'), `the placeholder went when a view came (${(await sideTabs()).join(' | ')})`);
    await clip(1);
    await shown(props, 'and a click shows the properties beside it');
    await both('after the conversation came back to an emptied side');
    await shot('emptied-side-refilled');
  }

  step('4 folded, the AI button opens the conversation, and it stays in front');
  await edge('right');
  await win.waitForFunction(() => !document.querySelector('.wb-tab[title="对话"]'), null, { timeout: 5000 });
  await win.waitForTimeout(500);
  await ask('打开对话');
  await shown(input, 'the conversation opens from a folded side');
  await win.waitForTimeout(1200);
  assert.ok(await win.locator(input).first().isVisible(), 'the properties do not take the front from a conversation that was asked for');
  await clip(1);
  await shown(props, 'and the next thing selected shows its properties');
  await both('after the AI button opened a folded side');

  step('5 our own toggle is the person\'s word: off stays off through clicks, and a reset starts over');
  const toggle = win.locator('.fvs-preview-options button[aria-label="属性面板"]');
  await ask('打开对话'); await shown(input, 'the conversation in front of the properties');
  await toggle.click();
  await shown(props, 'behind the conversation, the properties button brings the properties forward');
  await toggle.click();
  await gone(props, 'the toggle closes the properties');
  await clip(0); await win.waitForTimeout(700);
  assert.equal(await win.locator(props).count(), 0, 'turned off, a click on the timeline does not bring them back');
  await edge('reset');
  await shown(props, 'a reset layout has the properties again', 10000);
  await both('after the toggle and a reset');

  step('6 another Space and back: no launch page on the way, the same conversation, the properties there');
  await win.evaluate(() => { window.__fvsLaunch = 0; new MutationObserver(() => { if (document.querySelector('.fvs-launch')) window.__fvsLaunch++; }).observe(document.body, { childList: true, subtree: true }); });
  assert.ok(await H.enterSpace(win, 'tangu', { timeout: 8000 }), 'left for another Space');
  await win.waitForTimeout(1200);
  assert.ok(await H.enterSpace(win, 'forsion-video-studio', { timeout: 15000 }), 'and came back');
  await shown(props, 'the properties are there after coming back', 15000);
  await win.waitForTimeout(1500);
  await both('after another Space and back');
  assert.equal(await win.evaluate(() => window.__fvsLaunch), 0, 'the launch page never showed on the way back');
  assert.equal(created.length, 1, 'one conversation all along');
  await shot('back-in-space');

  step('7 every track name leads to its tab of the properties');
  await ask('打开对话'); await shown(input, 'the conversation in front');
  await win.locator(`${tl} .fvs-rail-captions`).click();
  await shown(props, 'the captions track\'s name opens the properties'); assert.equal(await tab(), 'captions');
  await win.locator(`${tl} .fvs-rail-video`).click(); assert.equal(await tab(), 'scene');
  await win.locator(`${tl} .fvs-rail-audio .fvs-rail-lane`).first().click(); assert.equal(await tab(), 'project');
  await shown(`${props} .fvs-audio-tracks`, 'the audio track\'s name opens the audio tracks');

  step('8 the empty audio lane offers a file or the Director; a track answers a click with its settings');
  await win.locator(`${tl} [data-lane="score"]`).click();
  await win.waitForFunction(s => (document.querySelector(s)?.value || '').includes('原创配乐'), input, { timeout: 6000 }).catch(() => assert.fail('"ask for a score" writes the request into the conversation'));
  await shown(input, 'and shows the conversation');
  await shot('score-asked');
  await win.locator(input).first().fill('');
  await win.locator(`${tl} .fvs-tl-body > input[type="file"]`).setInputFiles(wav);
  await shown(`${tl} .fvs-lane-region`, 'the file is a track on the lane', 15000);
  assert.equal(await win.locator(`${tl} .fvs-lane-empty`).first().isVisible(), false, 'a lane with a track offers nothing');
  await win.locator(`${tl} .fvs-lane-region`).first().click({ position: { x: 4, y: 12 } });
  await shown(`${props} .fvs-track-card.flash`, 'a click on the track shows its card in the project tab');
  assert.equal(await tab(), 'project');
  await shot('track-clicked');

  step('9 what the Director can be asked is under its button, not under "more"; nothing is sent for the person');
  await win.locator('.fvs-bar .fvs-ai-action').click();
  const asks = await win.getByRole('menuitem').allTextContents();
  await shot('ai-menu');
  await win.keyboard.press('Escape');
  assert.deepEqual(asks.map(x => x.trim()), ['打开对话', '写一个新场景', '节奏再紧一点', '润色全部文案', '为这个视频配乐', '检查并修正卡点', '看一遍成片提意见']);
  await win.locator('.fvs-bar button[aria-label="更多"]').click();
  const more = (await win.getByRole('menuitem').allTextContents()).map(x => x.trim());
  await win.keyboard.press('Escape');
  assert.ok(more.length && !more.some(x => /配乐|成片/.test(x)), `"more" keeps the window and the project (${more.join(' | ')})`);
  await ask('看一遍成片提意见');
  await win.waitForFunction(s => (document.querySelector(s)?.value || '').includes('修改建议'), input, { timeout: 6000 }).catch(() => assert.fail('a task is written into the conversation in the person\'s words'));
  await ask('写一个新场景');
  assert.match(await draft(), /修改建议[\s\S]*写一个新场景：$/, 'a start the person finishes comes after what was there');
  assert.equal(stub.seen.runs.length, 0, 'nothing is sent for the person');
  await shot('task-written');

  assert.deepEqual(errors, [], 'no page errors');
  console.log('right side verified:', shots);
} finally {
  await app?.close().catch(() => {});
  await stub.close?.();
  try { rmSync(home, { recursive: true, force: true }); } catch { /* a temp dir */ }
}
