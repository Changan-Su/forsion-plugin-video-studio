// Live check of the Director's skill: a real standalone engine and a real model in an isolated home, working in a
// disposable project's folder the way the editor's conversation does (the session's folder is the project's, no
// hand-off message, the bundle's own agent and skill). It asks what a person would ask, without naming a tool or an
// attribute, and reads the result from the files:
//
//   quote     an element quoted from the timeline, "fade this in, half a beat later": only that element changes
//   element   "add a small line at the end of the title scene": the new element carries its own data-in (it is on
//             the timeline's Elements lane), it is not animated from a script
//   picture   "make a background picture for the title cards and put it in": the image tool is used, the file is in
//             generated/ (what the media bin lists) and the scene references it
//
// The model is the host live harness's (the Codex subscription: FVS_LIVE_MODEL, default codex/gpt-5.6-luna; the
// credentials file is linked in for the engine to read and unlinked once it has). Pixels come from a local stub
// (an OpenAI-compatible /images/generations that answers with a small PNG): a real image model costs the person's
// cloud credits, and what is under test is what the agent does around the picture.
//
//   (cd <Genesis>/tangu-agent && npm run build)
//   FVS_ENGINE_ROOT=<Genesis>/tangu-agent node scripts/verify-skill-live.mjs [--only quote,element,picture]
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createServer as netServer } from 'node:net';
import { randomUUID } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync, appendFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const engine = resolve(process.env.FVS_ENGINE_ROOT || join(repo, '../../Forsion-Genesis/tangu-agent'));
const entry = join(engine, 'dist/standalone/main.js');
assert.ok(existsSync(entry), `build the engine first: npm run build in ${engine}`);
const MODEL = process.env.FVS_LIVE_MODEL || 'codex/gpt-5.6-luna';
const AUTH = resolve(process.env.FVS_LIVE_AUTH || join(homedir(), '.forsion-dev/provider-auth.json'));
assert.ok(existsSync(AUTH), `no credentials at ${AUTH}: sign in to the Codex subscription in Forsion Desktop (dev), or set FVS_LIVE_AUTH`);
const onlyAt = process.argv.indexOf('--only');
const ONLY = new Set((onlyAt > 0 ? process.argv[onlyAt + 1] : 'quote,element,picture').split(','));

const out = mkdtempSync(join(tmpdir(), 'fvs-skill-live-'));
const shared = join(out, 'forsion'), home = join(shared, 'tangu'), vault = join(out, 'vault');
const work = join(vault, 'Forsion Video Studio'), project = join(work, 'demo'), file = join(project, 'demo.fvs.md');
const artifacts = join(repo, 'artifacts/skill-live'); mkdirSync(artifacts, { recursive: true });
const log = join(artifacts, 'engine.log'); writeFileSync(log, '');
for (const d of [home, project, join(out, 'workspace')]) mkdirSync(d, { recursive: true });
// the bundle as an install would have it (the engine reads its skill in place and seeds its agent), and the tools
// where the editor puts them for a conversation
const bundle = join(shared, 'plugins/forsion-video-studio');
cpSync(repo, bundle, { recursive: true, filter: p => !/\/(\.git|node_modules|artifacts)(\/|$)/.test(p) });
cpSync(join(repo, 'tools'), join(work, '.fvs-tools'), { recursive: true });
const cli = join(work, '.fvs-tools/fvs.mjs');
// The command line finds its browser driver from the folder it runs in. Without this the Director does what its
// skill says when the driver is missing: `npm i -g playwright-core`, on the machine running this check (it did,
// 2026-10-04). The plugin's own copy, one level above the project, keeps the check from installing anything.
assert.ok(existsSync(join(repo, 'node_modules/playwright-core')), 'npm install in the plugin repo first (playwright-core)');
symlinkSync(join(repo, 'node_modules'), join(vault, 'node_modules'));
const fvs = (...args) => execFileSync(process.execPath, [cli, ...args], { cwd: project, encoding: 'utf8' });
fvs('new', file, '--template', 'eva', '--title', 'Demo');

// A PNG that looks like a picture. A flat colour does not: the Director looks at the frames it made, called it a
// placeholder, asked again, and then drew its own SVG instead (2026-10-04, second run).
function png(w, h, pixel) {
  const crc = buf => { let c, x = ~0; for (const v of buf) { c = (x ^ v) & 255; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1; x = (x >>> 8) ^ c; } return ~x >>> 0; };
  const chunk = (type, data) => { const body = Buffer.concat([Buffer.from(type), data]), len = Buffer.alloc(4), sum = Buffer.alloc(4); len.writeUInt32BE(data.length); sum.writeUInt32BE(crc(body)); return Buffer.concat([len, body, sum]); };
  const head = Buffer.alloc(13); head.writeUInt32BE(w, 0); head.writeUInt32BE(h, 4); head[8] = 8; head[9] = 2;
  const rows = Buffer.alloc(h * (1 + w * 3));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) rows.set(pixel(x, y), y * (1 + w * 3) + 1 + x * 3);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', head), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
}
// charcoal that lightens along the diagonal, a vermilion band across it, a thin pale line beside the band
const PICTURE = png(640, 360, (x, y) => {
  const d = (x + y * 1.6) / (640 + 360 * 1.6), shade = 16 + Math.round(46 * d);
  return Math.abs(d - .56) < .085 ? [212, 62, 36] : Math.abs(d - .68) < .008 ? [226, 218, 200] : [shade, shade, shade + 8];
}).toString('base64');
const imageAsks = [];
const images = createServer((req, res) => {
  let body = '';
  req.on('data', d => { body += d; });
  req.on('end', () => {
    if (!req.url.endsWith('/images/generations')) { res.writeHead(404).end(); return; }
    try { imageAsks.push(JSON.parse(body)); } catch { imageAsks.push({}); }
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ data: [{ b64_json: PICTURE }] }));
  });
});
await new Promise(r => images.listen(0, '127.0.0.1', r));
const providers = join(out, 'providers.json');
writeFileSync(providers, JSON.stringify([{ providerId: 'fvsstub', baseUrl: `http://127.0.0.1:${images.address().port}/v1`, imageModelIds: ['fvsstub-image'] }]));

const TOKEN = randomUUID();
const port = await new Promise(r => { const s = netServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => r(p)); }); });
const base = `http://127.0.0.1:${port}`;
const authLink = join(shared, 'provider-auth.json');
symlinkSync(AUTH, authLink);
const child = spawn(process.execPath, [entry, '--port', String(port), '--host', '127.0.0.1', '--data-dir', join(home, 'state.db'), '--sandbox', 'auto', '--cloud-url', 'http://127.0.0.1:9', '--token', TOKEN, '--providers-file', providers], {
  env: { ...process.env, TANGU_HOME: home, TANGU_DEFAULT_WORKSPACE: join(out, 'workspace'), TANGU_BROWSER_CDP: 'off', TANGU_BROWSER_EXTENSION: '0', FORSION_DESKTOP_CONFIG: join(out, 'no-desktop-config.json'), FORSION_AMADEUS_VAULT: vault },
  stdio: ['ignore', 'pipe', 'pipe'],
});
child.stdout.on('data', d => appendFileSync(log, d)); child.stderr.on('data', d => appendFileSync(log, d));
let exited = null; child.once('exit', (code, signal) => { exited = { code, signal }; });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const api = async (path, init = {}) => {
  const r = await fetch(base + path, { ...init, headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const text = await r.text(); let body; try { body = JSON.parse(text); } catch { body = text; }
  if (!r.ok) throw new Error(`${init.method || 'GET'} ${path} → ${r.status} ${String(typeof body === 'string' ? body : JSON.stringify(body)).slice(0, 300)}`);
  return body;
};
const list = (v, k) => (Array.isArray(v) ? v : v?.[k] || []);

/** One message in the project's conversation; tools run without asking (the folder is disposable). */
async function ask(sessionId, message, timeoutMs = 600_000) {
  const t0 = Date.now(), ev = { tools: [], results: [], content: '', error: null };
  const { runId } = await api('/agent/runs', { method: 'POST', body: JSON.stringify({ session_id: sessionId, model_id: MODEL, message, agent_config: { agentSlug: 'fvs-director', execMode: 'host', cwd: project, approvalMode: 'full-auto' } }) });
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}/agent/runs/${runId}/events`, { headers: { Authorization: `Bearer ${TOKEN}` }, signal: ac.signal });
    let buf = '';
    outer: for await (const part of res.body) {
      buf += Buffer.from(part).toString('utf8');
      for (let i; (i = buf.indexOf('\n\n')) >= 0;) {
        const frame = buf.slice(0, i); buf = buf.slice(i + 2);
        for (const line of frame.split('\n')) {
          if (!line.startsWith('data:')) continue;
          let e; try { e = JSON.parse(line.slice(5).trim()); } catch { continue; }
          const p = e.payload || {};
          if (e.type === 'tool_call') ev.tools.push({ name: p.name || '?', args: typeof p.arguments === 'string' ? p.arguments : JSON.stringify(p.arguments || {}) });
          else if (e.type === 'tool_result') ev.results.push({ name: p.name || '?', isError: !!p.isError, result: String(p.result || '').slice(0, 600) });
          else if (e.type === 'approval_request') await api(`/agent/runs/${p.runId || runId}/approvals/${p.approvalId || p.id}`, { method: 'POST', body: JSON.stringify({ action: 'approve' }) }).catch(() => {});
          else if (e.type === 'done') { ev.content = String(p.content || ''); break outer; }
          else if (e.type === 'error') { ev.error = String(p.error || 'error'); break outer; }
        }
      }
    }
  } catch (e) { ev.error = ev.error || String(e?.message || e); } finally { clearTimeout(timer); ev.seconds = Math.round((Date.now() - t0) / 1000); }
  return ev;
}
const session = async title => (await api('/agent/sessions', { method: 'POST', body: JSON.stringify({ title, model_id: MODEL, project_path: project, project_name: 'demo', agent_config: { agentSlug: 'fvs-director', execMode: 'host', cwd: project, approvalMode: 'full-auto' } }) })).session.id;
const used = (ev, name, re) => ev.tools.some(t => t.name === name && (!re || re.test(t.args)));
const lines = text => text.split('\n');
/** Lines of `after` that are not in `before`, and the other way round. */
const changed = (before, after) => { const a = new Set(lines(before)), b = new Set(lines(after)); return { added: lines(after).filter(l => !a.has(l)), removed: lines(before).filter(l => !b.has(l)) }; };
const sceneBlock = (text, id) => { const m = text.match(new RegExp(`^## ${id}\\b[\\s\\S]*?(?=^## |(?![\\s\\S]))`, 'm')); return m ? m[0] : ''; };

const report = [`# Video Studio Director — live (${MODEL})`, ''], results = [];
let failed = 0;
async function scenario(key, title, fn) {
  if (!ONLY.has(key)) return;
  const before = readFileSync(file, 'utf8');
  let ev = null, problem = null;
  try { ev = await fn(before); } catch (e) { problem = String(e?.message || e); ev = e?.ev || ev; }
  const after = readFileSync(file, 'utf8');
  if (problem) failed += 1;
  console.log(`${problem ? 'FAIL' : 'PASS'} ${key} · ${title}${ev ? ` · ${ev.seconds}s · ${ev.tools.length} tool calls` : ''}${problem ? `\n     ${problem}` : ''}${ev?.note ? `\n     ${ev.note}` : ''}`);
  results.push({ key, pass: !problem, problem, seconds: ev?.seconds, tools: ev?.tools.map(t => t.name) });
  const d = changed(before, after);
  report.push(`## ${key} — ${problem ? 'FAIL' : 'PASS'}`, '', title, '', problem ? `**${problem}**\n` : '', ev?.note ? `${ev.note}\n` : '',
    `Tools: ${ev ? ev.tools.map(t => t.name).join(' → ') || '(none)' : '(no run)'}`, '',
    '```diff', ...d.removed.map(l => `- ${l}`), ...d.added.map(l => `+ ${l}`), '```', '',
    'The Director said:', '', ...(ev?.content || ev?.error || '').split('\n').map(l => `> ${l}`), '');
}
const fail = (message, ev) => Object.assign(new Error(message), { ev });

try {
  for (let i = 0; i < 60 && !exited; i++) { if (await fetch(`${base}/health`).then(r => r.ok).catch(() => false)) break; await sleep(500); }
  if (exited) throw new Error(`the engine exited (${JSON.stringify(exited)})\n${readFileSync(log, 'utf8').slice(-1500)}`);
  const models = list(await api('/agent/models'), 'models');
  if (!models.some(m => m.id === MODEL)) throw new Error(`no ${MODEL} in the model list (credentials not loaded or expired)`);
  rmSync(authLink, { force: true }); // read once at start
  const agents = list(await api('/agent/agents'), 'agents'), skills = list(await api('/agent/skills'), 'skills');
  assert.ok(agents.some(a => a.slug === 'fvs-director'), `the bundle's agent was seeded (${agents.map(a => a.slug).join(', ')})`);
  assert.ok(skills.some(s => (s.name || s.slug) === 'forsion-video-studio'), `the bundle's skill is listed (${skills.map(s => s.name || s.slug).join(', ')})`);
  console.log(`engine ready · ${MODEL} · project ${file}`);

  await scenario('quote', 'An element quoted from the timeline: fade it in, half a beat later', async before => {
    const boot = sceneBlock(before, 'boot');
    const tag = boot.match(/<p data-in="h1"[^>]*>/)?.[0];
    assert.ok(tag, 'the template has the element this scenario quotes');
    const text = boot.slice(boot.indexOf(tag) + tag.length).match(/^[^<]+/)[0].trim();
    // what the editor's "Quote in chat" puts above the message (studio.js reference())
    const quote = ['demo.fvs.md › ## boot · 启动 › 0.50–4.00s', tag, text].map(l => `> ${l}`).join('\n');
    const ev = await ask(await session('quote'), `${quote}\n\n这一行改成淡入，再晚半拍出现。`);
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const after = readFileSync(file, 'utf8'), d = changed(before, after);
    if (!used(ev, 'use_skill', /forsion-video-studio/)) throw fail('the skill was not loaded', ev);
    if (!d.added.length) throw fail('the file did not change', ev);
    const line = d.added.find(l => l.includes(text));
    if (!line) throw fail(`the quoted element is not among the changed lines: ${JSON.stringify(d.added)}`, ev);
    if (!/data-in="h1\s*\+\s*0?\.5"/.test(line) || !/data-fx="fade"/.test(line)) throw fail(`the element should enter at h1+0.5 with a fade: ${line.trim()}`, ev);
    if (d.added.length !== 1 || d.removed.length !== 1) throw fail(`only that element should change (+${d.added.length} −${d.removed.length}): ${JSON.stringify(d)}`, ev);
    fvs('check', file);
    return ev;
  });

  await scenario('element', 'A new line in a scene: its timing is on the element (it is on the Elements lane)', async before => {
    const ev = await ask(await session('element'), '在「片名」那一场的最后加一行小字「2026」，比别的内容晚一拍出现。');
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const after = readFileSync(file, 'utf8'), d = changed(before, after);
    const line = d.added.find(l => l.includes('2026') && /<[a-z]/.test(l));
    if (!line) throw fail(`no new element with the text: ${JSON.stringify(d.added)}`, ev);
    if (!/data-(in|seq)=/.test(line) && !/data-(in|seq)=/.test(sceneBlock(after, 'title').split('2026')[0].split('\n').slice(-2).join('\n'))) throw fail(`the new element has no declarative timing: ${line.trim()}`, ev);
    if (d.added.some(l => /\b(K|S|cut|fade|slide)\(/.test(l))) throw fail(`it was animated from a script: ${JSON.stringify(d.added)}`, ev);
    if (!sceneBlock(after, 'title').includes('2026')) throw fail('the line is not in the title scene', ev);
    fvs('check', file);
    return ev;
  });

  await scenario('picture', 'A picture for a scene: generated into generated/, referenced from the scene', async before => {
    const ev = await ask(await session('picture'), '给「标题卡」那一场做一张背景图，放进画面里。');
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    if (!used(ev, 'generate_image')) throw fail('the image tool was not used', ev);
    const made = existsSync(join(project, 'generated')) ? readdirSync(join(project, 'generated')).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f)) : [];
    if (!made.some(f => !f.endsWith('.svg'))) throw fail('the image tool left nothing in generated/', ev);
    const after = readFileSync(file, 'utf8'), cards = sceneBlock(after, 'cards');
    // What has to hold: the picture the scene shows is a file in generated/ (what the media bin lists). Usually
    // the tool's own; a picture the Director draws there itself when the tool's result is unusable counts too,
    // and the report says which it was.
    const ref = made.find(f => cards.includes(`generated/${f}`));
    if (!ref) throw fail(`the scene does not reference a file in generated/ (${made.join(', ')}): ${JSON.stringify(changed(before, after).added)}`, ev);
    fvs('check', file);
    ev.note = `Picture in the scene: generated/${ref}${ref.endsWith('.svg') ? ' — drawn by the Director, not the image tool\'s file' : ''}`;
    return ev;
  });
} catch (e) {
  failed += 1;
  console.log(`FAIL setup\n     ${String(e?.message || e)}`);
} finally {
  rmSync(authLink, { force: true });
  child.kill('SIGTERM');
  images.close();
  report.push('', `Image requests to the stub: ${JSON.stringify(imageAsks.map(a => ({ size: a.size, prompt: String(a.prompt || '').slice(0, 160) })))}`);
  writeFileSync(join(artifacts, 'report.md'), report.join('\n'));
  writeFileSync(join(artifacts, 'results.json'), JSON.stringify({ model: MODEL, results }, null, 2));
  try { cpSync(file, join(artifacts, 'demo.fvs.md')); } catch { /* no project */ }
  console.log(`${failed ? 'live: FAILED' : 'live: ok'} · ${join(artifacts, 'report.md')} · home ${out}`);
}
process.exit(failed ? 1 : 0);
