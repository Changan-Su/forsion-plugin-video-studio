// Live check of the Director as a video editor: a real standalone engine and a real model (FVS_LIVE_MODEL, default
// codex/gpt-6-luna) in an isolated home, cutting real footage the way a person asks for it in the Space's conversation
// (the session's folder is the project's; the clips are in its media/ as the media bin imports them). It never names a
// tool or an attribute and reads the result from the files, a render and `fvs review`:
//
//   montage   seven real clips (Wikimedia Commons, see scripts/lib/fetch-footage.mjs) into a ~20 s city film: most
//             clips used, each picked from inside its file, cuts on the 120 BPM grid, title and closing line, the
//             clips' own sound kept but lower; the clips looked at in several frames (`fvs frames`, or ffmpeg at a
//             rate) or at least not every shot from one offset; renders with sound, every shot filling the frame (read
//             from the render's pixels, scripts/lib/frame-fill.mjs)
//   recap     Forsion 2.13.5's feature recordings (FVS_DEMOS, default <Forsion>/outputs/release-demos-2.13.5) into a
//             ~40 s update recap: every recording used, cut down, one caption each; renders, every shot filling the frame
//   recut     an existing four-shot cut, four edits in one message: move shot 3 first, halve the last shot, a cross-fade
//             between every two shots, the closing caption in English; nothing else changes and the caption stays
//             inside the film
//   legible   captions over bright footage and one under a lower-third panel, "fix what is hard to read, keep the
//             words": afterwards `fvs review` finds no contrast or covered-text problem on them, the words are the same
//
// After each one the Director's own `review` use is recorded (not required: what is required is the result).
//
//   (cd <Genesis>/tangu-agent && npm run build)
//   FVS_ENGINE_ROOT=<Genesis>/tangu-agent node scripts/verify-edit-live.mjs [--only montage,recap,recut,legible]
// Writes artifacts/edit-live/: report.md, results.json, engine.log and <scenario>-evidence/ (过程.md, the final
// project, the review, a contact sheet and a half-size render), the layout harness-runs/archive.mjs add takes.
import assert from 'node:assert/strict';
import { spawn, execFileSync, spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createServer as netServer } from 'node:net';
import { randomUUID } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, appendFileSync, statSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseProject } from '../src/lib/project.js';
import { videos } from '../src/lib/html.js';
import { emptyTemplate } from '../src/lib/templates.js';
import { fetchFootage, FOOTAGE } from './lib/fetch-footage.mjs';
import { unfilled, FLAT_LIMIT } from './lib/frame-fill.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const engine = resolve(process.env.FVS_ENGINE_ROOT || join(repo, '../../Forsion-Genesis/tangu-agent'));
const entry = join(engine, 'dist/standalone/main.js');
assert.ok(existsSync(entry), `build the engine first: npm run build in ${engine}`);
const MODEL = process.env.FVS_LIVE_MODEL || 'codex/gpt-6-luna';
const AUTH = resolve(process.env.FVS_LIVE_AUTH || join(homedir(), '.forsion-dev/provider-auth.json'));
assert.ok(existsSync(AUTH), `no credentials at ${AUTH}: sign in to the Codex subscription in Forsion Desktop (dev), or set FVS_LIVE_AUTH`);
const onlyAt = process.argv.indexOf('--only');
const ONLY = new Set((onlyAt > 0 ? process.argv[onlyAt + 1] : 'montage,recap,recut,legible').split(','));
const DEMOS = resolve(process.env.FVS_DEMOS || join(repo, '../../outputs/release-demos-2.13.5'));
const RECAP = ['chat-branch-canvas', 'child-sessions', 'forsion-clip', 'guide-space', 'home-glyph-wallpaper', 'penzor-cloud'];
assert.ok(existsSync(join(repo, 'node_modules/playwright-core')), 'npm install in the plugin repo first (playwright-core)');
const footage = await fetchFootage(join(repo, 'artifacts/footage/city'));

const startedAt = new Date().toISOString();
const out = mkdtempSync(join(tmpdir(), 'fvs-edit-live-'));
const shared = join(out, 'forsion'), home = join(shared, 'tangu'), vault = join(out, 'vault'), work = join(vault, 'Forsion Video Studio');
const artifacts = join(repo, 'artifacts/edit-live');
rmSync(artifacts, { recursive: true, force: true }); mkdirSync(artifacts, { recursive: true });
const log = join(artifacts, 'engine.log'); writeFileSync(log, '');
for (const d of [home, work, join(out, 'workspace')]) mkdirSync(d, { recursive: true });
const bundle = join(shared, 'plugins/forsion-video-studio');
cpSync(repo, bundle, { recursive: true, filter: p => !/\/(\.git|node_modules|artifacts)(\/|$)/.test(p) });
cpSync(join(repo, 'tools'), join(work, '.fvs-tools'), { recursive: true });
const cli = join(work, '.fvs-tools/fvs.mjs');
symlinkSync(join(repo, 'node_modules'), join(vault, 'node_modules')); // the browser driver, found from the folder

/** A project folder as the editor makes it, with `clips` imported into media/. */
function projectWith(name, text, clips) {
  const dir = join(work, name), file = join(dir, `${name}.fvs.md`);
  mkdirSync(join(dir, 'media'), { recursive: true });
  for (const [from, as] of clips) cpSync(from, join(dir, 'media', as));
  writeFileSync(file, text);
  return { dir, file };
}


// prepared cuts the recut and legible scenarios start from (clips are linked in from the footage folder)
const fixture = name => readFileSync(join(repo, `test/fixtures/edit-live/${name}.fvs.md`), 'utf8');
const RECUT = fixture('recut'), LEGIBLE = fixture('legible');
const LEGIBLE_CAPTIONS = ['清晨的车站，墙上的瓷砖讲着老故事', '午后的广场，旗帜在风里', '列车进站，城市开始忙碌'];

// pixels stay local: a stub answers image requests (what is under test is the cut, not a picture model)
const images = createServer((req, res) => { req.resume(); req.on('end', () => res.writeHead(404).end()); });
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
const agentConfig = dir => ({ agentSlug: 'fvs-director', execMode: 'host', cwd: dir, approvalMode: 'full-auto' });
const session = async (title, dir) => (await api('/agent/sessions', { method: 'POST', body: JSON.stringify({ title, model_id: MODEL, project_path: dir, project_name: basename(dir), agent_config: agentConfig(dir) }) })).session.id;

/** One message in the project's conversation; tools run without asking (the folder is disposable). */
async function ask(sessionId, message, dir, timeoutMs = 1_500_000) {
  const t0 = Date.now(), ev = { tools: [], results: [], content: '', error: null };
  const { runId } = await api('/agent/runs', { method: 'POST', body: JSON.stringify({ session_id: sessionId, model_id: MODEL, message, agent_config: agentConfig(dir) }) });
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
          else if (e.type === 'tool_result') ev.results.push({ name: p.name || '?', isError: !!p.isError, result: String(p.result || '').slice(0, 800) });
          else if (e.type === 'approval_request') await api(`/agent/runs/${p.runId || runId}/approvals/${p.approvalId || p.id}`, { method: 'POST', body: JSON.stringify({ action: 'approve' }) }).catch(() => {});
          else if (e.type === 'done') { ev.content = String(p.content || ''); break outer; }
          else if (e.type === 'error') { ev.error = String(p.error || 'error'); break outer; }
        }
      }
    }
  } catch (e) { ev.error = ev.error || String(e?.message || e); } finally { clearTimeout(timer); ev.ms = Date.now() - t0; }
  return ev;
}

const CJK = /[㐀-鿿]/;
const ranReview = ev => ev.tools.some(t => /fvs\.mjs\S*"?\s+review\b/.test(t.args));
// footage looked at in several frames: `fvs frames`, or ffmpeg sampling at a rate or into a grid (in the command
// itself, not its JSON encoding)
const commandOf = t => { try { const a = JSON.parse(t.args); return typeof a.command === 'string' ? a.command : t.args; } catch { return t.args; } };
const frameLooks = ev => (ev?.tools || []).filter(t => /fvs\.mjs\S*"?[\s\\]+frames\b|ffmpeg[^\n]*(fps=|tile=|select=)/.test(commandOf(t)));
const views = ev => (ev?.tools || []).filter(t => t.name === 'view_image').length;
const near = (a, b, eps = 0.02) => Math.abs(a - b) <= eps;
const shots = p => p.scenes.filter(s => videos(s.html).some(v => v.src));
// the footage fills the frame, read from the render's pixels: not from the project and not from `fvs review`, so a
// mistake both of those miss still fails here (10-24: every clip at 854×480 in a corner, passed as "title on the shot")
function filled(key, p, legs, ev) {
  const { read, over } = unfilled(join(artifacts, `${key}-evidence/preview.mp4`), shots(p));
  legs.push(`画面铺满:${read.length - over.length}/${read.length} 个镜头(中点平坦占比 ${read.map(r => `${r.id} ${r.share}`).join(' / ')},超过 ${FLAT_LIMIT} 算没铺满)`);
  if (over.length) throw fail(`footage does not fill the frame (flat share over ${FLAT_LIMIT} at the shot's middle): ${over.map(r => `${r.id} ${r.share}`).join(', ')}`, ev);
}
const reviewOf = file => JSON.parse(execFileSync(process.execPath, [cli, 'review', file, '--json'], { cwd: dirname(file), encoding: 'utf8', maxBuffer: 64 << 20 }));

/** What every scenario leaves behind: the project, the review, a contact sheet, a half-size render when asked. */
function evidence(key, { file, dir }, ev, { render = false } = {}) {
  const at = join(artifacts, `${key}-evidence`); mkdirSync(at, { recursive: true });
  cpSync(file, join(at, basename(file)));
  const facts = {};
  const check = spawnSync(process.execPath, [cli, 'check', file, '--runtime'], { cwd: dir, encoding: 'utf8' });
  facts.check = (check.stdout + check.stderr).trim();
  const rv = spawnSync(process.execPath, [cli, 'review', file], { cwd: dir, encoding: 'utf8', maxBuffer: 64 << 20 });
  writeFileSync(join(at, 'review.txt'), rv.stdout + rv.stderr); facts.review = (rv.stdout.trim().split('\n').pop() || rv.stderr.trim()).slice(0, 300);
  spawnSync(process.execPath, [cli, 'sheet', file, '--out', join(at, 'sheet.png')], { cwd: dir, encoding: 'utf8' });
  if (render) {
    const mp4 = join(at, 'preview.mp4');
    const r = spawnSync(process.execPath, [cli, 'render', file, '--out', mp4, '--scale', '0.5', '--workers', '4'], { cwd: dir, encoding: 'utf8', maxBuffer: 64 << 20 });
    if (r.status === 0 && existsSync(mp4)) {
      const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', mp4], { encoding: 'utf8' }));
      facts.render = { seconds: +(+probe.format.duration).toFixed(2), audio: probe.streams.some(s => s.codec_type === 'audio'), mb: +(statSync(mp4).size / 1e6).toFixed(1) };
    } else facts.render = { failed: (r.stderr || r.stdout).trim().split('\n').slice(-3).join(' / ') };
  }
  const p = parseProject(readFileSync(file, 'utf8'));
  writeFileSync(join(at, '过程.md'), [
    `# ${key}`, '', `- 模型:${MODEL}`, `- 用时:${Math.round((ev?.ms || 0) / 1000)} s,工具调用 ${ev?.tools.length ?? 0} 次;自己跑了 review:${ev && ranReview(ev) ? '是' : '否'};按间隔抽帧看素材 ${frameLooks(ev).length} 次,view_image ${views(ev)} 次`,
    `- 成片:${p.scenes.length} 个场景,${p.length.toFixed(2)} s;check:${facts.check.split('\n')[0]}`, `- review:${facts.review}`,
    ...(facts.render ? [`- 半尺寸渲染:${JSON.stringify(facts.render)}`] : []), '',
    '## 场景', '', ...p.scenes.map(s => `- ${s.id}${s.title ? ` · ${s.title}` : ''} ${s.t0.toFixed(2)}–${s.t1.toFixed(2)} s${s.transition ? ` · 转场 ${s.transition.type} ${s.transition.dur}s` : ''}${videos(s.html).map(v => ` · ${v.src} 从 ${v.clipIn}s${v.gain ? ` ${v.gain} dB` : ''}${v.muted ? ' 静音' : ''}`).join('')}`),
    ...(p.captions.length ? ['', '## 字幕', '', ...p.captions.map(c => `- ${c.start.toFixed(2)}–${c.end.toFixed(2)} ${c.text}`)] : []),
    '', '## 工具调用', '', ...(ev?.tools || []).map(t => `- ${t.name} ${t.args.replace(/\s+/g, ' ').slice(0, 240)}`),
    '', '## 导演最后说', '', ...String(ev?.content || ev?.error || '').split('\n').map(l => `> ${l}`), '',
  ].join('\n'));
  return { at, facts, p };
}

const rows = [], report = [`# Video Studio Director — editing real footage (${MODEL})`, ''];
let failed = 0;
async function scenario(key, name, fn) {
  if (!ONLY.has(key)) return;
  const t0 = Date.now(), legs = [];
  let ev = null, problem = null;
  try { ev = await fn(legs); } catch (e) { problem = String(e?.message || e); ev = e?.ev || ev; }
  if (problem) failed += 1;
  const row = { key, name, ok: !problem, ms: Date.now() - t0, detail: [...legs, ...(problem ? [`没通过:${problem}`] : [])].join(' | '), toolCalls: ev?.tools.map(t => t.name) || [], output: ev?.content || ev?.error || '', evidenceDir: `${key}-evidence`, ranReview: !!(ev && ranReview(ev)) };
  rows.push(row);
  console.log(`${problem ? 'FAIL' : 'PASS'} ${key} · ${name} · ${Math.round(row.ms / 1000)}s · ${row.toolCalls.length} tool calls${problem ? `\n     ${problem}` : ''}`);
  report.push(`## ${key} — ${problem ? 'FAIL' : 'PASS'}`, '', name, '', ...legs.map(l => `- ${l}`), problem ? `\n**${problem}**` : '', '', `Evidence: ${key}-evidence/过程.md`, '');
}
const fail = (message, ev) => Object.assign(new Error(message), { ev });

try {
  for (let i = 0; i < 60 && !exited; i++) { if (await fetch(`${base}/health`).then(r => r.ok).catch(() => false)) break; await sleep(500); }
  if (exited) throw new Error(`the engine exited (${JSON.stringify(exited)})\n${readFileSync(log, 'utf8').slice(-1500)}`);
  const models = list(await api('/agent/models'), 'models');
  if (!models.some(m => m.id === MODEL)) throw new Error(`no ${MODEL} in the model list (credentials not loaded or expired)`);
  rmSync(authLink, { force: true }); // read once at start
  const agents = list(await api('/agent/agents'), 'agents');
  assert.ok(agents.some(a => a.slug === 'fvs-director'), `the bundle's agent was seeded (${agents.map(a => a.slug).join(', ')})`);
  console.log(`engine ready · ${MODEL} · ${out}`);

  await scenario('montage', '七段实拍剪成 20 秒城市短片:挑镜头、卡拍子、片名与结尾字幕、环境声压低', async legs => {
    const pr = projectWith('city', emptyTemplate({ title: '城市速写', zh: true }), FOOTAGE.map(f => [join(footage, `${f.name}.webm`), `${f.name}.webm`]));
    const ev = await ask(await session('montage', pr.dir), 'media 里是我拍的几段城市素材。帮我剪一支 20 秒左右的城市短片《城市速写》：每个镜头只用最好看的两三秒，切点落在拍子上（120 BPM），开头打片名，结尾一句字幕「每座城市都在呼吸」。素材自带的环境声保留，但小一点。先不用配乐。', pr.dir);
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const { facts, p } = evidence('montage', pr, ev, { render: true });
    const text = readFileSync(pr.file, 'utf8');
    const used = new Set(shots(p).flatMap(s => videos(s.html).map(v => v.src)));
    legs.push(`${p.scenes.length} 个场景、${p.length.toFixed(2)} s,用了 ${used.size}/7 段素材;自己跑 review:${ranReview(ev) ? '是' : '否'};review:${facts.review}`);
    if (!(p.length >= 15 && p.length <= 30)) throw fail(`length ${p.length.toFixed(2)} s is not about 20 s`, ev);
    if (used.size < 5) throw fail(`only ${used.size} of the 7 clips are in the cut`, ev);
    const beats = t => t / 0.5, off = p.scenes.filter(s => Math.abs(beats(s.t1) - Math.round(beats(s.t1))) > 0.04);
    if (off.length) throw fail(`cuts off the beat grid: ${off.map(s => `${s.id}@${s.t1.toFixed(3)}`).join(', ')}`, ev);
    const long = shots(p).filter(s => s.dur > 4.01);
    if (long.length) throw fail(`shots longer than "two or three seconds": ${long.map(s => `${s.id} ${s.dur.toFixed(2)} s`).join(', ')}`, ev);
    const clips = shots(p).flatMap(s => videos(s.html));
    if (clips.filter(v => v.clipIn > 0 || p.scenes.find(s => s.html.includes(v.src))?.in > 0).length < 3) throw fail('fewer than three shots are taken from inside their clip', ev);
    // picking: every clip looked at in several frames, or in-points that differ (ponytail: a glob credits every clip
    // and a failed call still counts; match the glob and the result if this ever passes on a lazy run)
    const looks = frameLooks(ev), looked = [...used].filter(src => looks.some(t => commandOf(t).includes(basename(src)) || commandOf(t).includes('*')));
    const ins = shots(p).flatMap(s => videos(s.html).map(v => +((v.clipIn || 0) + (s.in || 0)).toFixed(2)));
    legs.push(`挑镜头:多帧看过 ${looked.length}/${used.size} 段(按间隔抽帧 ${looks.length} 次、view_image ${views(ev)} 次);入点 ${new Set(ins).size} 种(${ins.join(' / ')} s)`);
    if (new Set(ins).size <= 1 && looked.length < used.size) throw fail(`every shot starts ${ins[0]} s into its clip and only ${looked.length} of ${used.size} clips were looked at in several frames`, ev);
    const onShot = line => shots(p).some(s => s.html.includes(line)) || p.captions.some(c => c.text.includes(line) && shots(p).some(s => c.start < s.t1 && c.end > s.t0));
    legs.push(`片名压在镜头上:${onShot('城市速写') ? '是' : '否'};结尾字幕压在镜头上:${onShot('每座城市都在呼吸') ? '是' : '否'};转场:${p.scenes.filter(s => s.transition).map(s => `${s.id} ${s.transition.type} ${s.transition.dur}s`).join('、') || '全部硬切'}`);
    if (!text.includes('城市速写') || !text.includes('每座城市都在呼吸')) throw fail('the title or the closing line is missing', ev);
    const loud = clips.filter(v => !v.muted && !(v.gain < 0));
    if (loud.length) throw fail(`clips with their sound at full level: ${loud.map(v => v.src).join(', ')}`, ev);
    if (!/^ok/.test(facts.check)) throw fail(`check: ${facts.check}`, ev);
    if (!facts.render?.audio || !near(facts.render.seconds, p.length, 0.15)) throw fail(`render: ${JSON.stringify(facts.render)}`, ev);
    legs.push(`半尺寸渲染 ${facts.render.seconds} s、有声音、${facts.render.mb} MB`);
    filled('montage', p, legs, ev);
    return ev;
  });

  await scenario('recap', 'Forsion 2.13.5 的六段功能录屏剪成 40 秒更新速览:每段截重点、配说明字幕', async legs => {
    const missing = RECAP.filter(n => !existsSync(join(DEMOS, `${n}.mp4`)));
    if (missing.length) throw new Error(`recordings missing in ${DEMOS}: ${missing.join(', ')}`);
    const pr = projectWith('recap', emptyTemplate({ title: 'Forsion 2.13.5', zh: true }), RECAP.map(n => [join(DEMOS, `${n}.mp4`), `${n}.mp4`]));
    const ev = await ask(await session('recap', pr.dir), 'media 里是 Forsion 2.13.5 几个新功能的演示录屏。剪一支 40 秒左右的更新速览：开头片名「Forsion 2.13.5」，每个功能一段，配一句说明这个功能的字幕（中文），结尾落在一句口号上。录屏都比较长，只截最能说明功能的部分。先不用配乐。', pr.dir);
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const { facts, p } = evidence('recap', pr, ev, { render: true });
    const used = new Set(shots(p).flatMap(s => videos(s.html).map(v => v.src.replace(/^media\//, '').replace(/\.mp4$/, ''))));
    legs.push(`${p.scenes.length} 个场景、${p.length.toFixed(2)} s,用了 ${used.size}/6 段录屏;自己跑 review:${ranReview(ev) ? '是' : '否'};review:${facts.review}`);
    if (!(p.length >= 25 && p.length <= 60)) throw fail(`length ${p.length.toFixed(2)} s is not about 40 s`, ev);
    const unused = RECAP.filter(n => !used.has(n));
    if (unused.length) throw fail(`recordings not in the recap: ${unused.join(', ')}`, ev);
    const total = RECAP.reduce((a, n) => a + +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(DEMOS, `${n}.mp4`)], { encoding: 'utf8' }), 0);
    if (!(p.length < total * 0.8)) throw fail(`the recordings were hardly cut (${p.length.toFixed(1)} s of ${total.toFixed(1)} s)`, ev);
    // one caption per feature: on-screen text in the shot, or a caption cue while it is on screen
    const uncaptioned = shots(p).filter(s => !CJK.test(s.html.replace(/<video[\s\S]*?(<\/video>|\/>)/g, '')) && !p.captions.some(c => c.start < s.t1 && c.end > s.t0 && CJK.test(c.text)));
    if (uncaptioned.length) throw fail(`shots without a Chinese caption: ${uncaptioned.map(s => s.id).join(', ')}`, ev);
    if (!readFileSync(pr.file, 'utf8').includes('Forsion 2.13.5')) throw fail('the title is missing', ev);
    if (!/^ok/.test(facts.check)) throw fail(`check: ${facts.check}`, ev);
    if (facts.render?.failed || !near(facts.render.seconds, p.length, 0.15)) throw fail(`render: ${JSON.stringify(facts.render)}`, ev);
    legs.push(`录屏原长 ${total.toFixed(1)} s → 成片 ${p.length.toFixed(1)} s;半尺寸渲染 ${facts.render.seconds} s、${facts.render.mb} MB`);
    filled('recap', p, legs, ev);
    return ev;
  });

  await scenario('recut', '在现成的四个镜头上一次改四处:调序、末镜减半、全部交叉淡化、片尾字幕改英文', async legs => {
    const pr = projectWith('recut', RECUT, [['madrid-street', 'madrid-street.webm'], ['haifa-train', 'haifa-train.webm'], ['iceland-waves', 'iceland-waves.webm'], ['seattle-viaduct', 'seattle-viaduct.webm']].map(([n, as]) => [join(footage, `${n}.webm`), as]));
    const before = parseProject(RECUT), clipIn = s => videos(s.html)[0]?.clipIn;
    const ev = await ask(await session('recut', pr.dir), '把第三个镜头挪到最前面；最后一个镜头剪短一半；每两个镜头之间都加交叉淡化；片尾那句字幕改成英文。', pr.dir);
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const { facts, p } = evidence('recut', pr, ev);
    const order = p.scenes.map(s => videos(s.html)[0]?.src);
    legs.push(`顺序 ${p.scenes.map(s => s.id).join(' → ')},${p.length.toFixed(2)} s;自己跑 review:${ranReview(ev) ? '是' : '否'}`);
    const want = ['media/iceland-waves.webm', 'media/madrid-street.webm', 'media/haifa-train.webm', 'media/seattle-viaduct.webm'];
    if (JSON.stringify(order) !== JSON.stringify(want)) throw fail(`shot order ${JSON.stringify(order)} ≠ ${JSON.stringify(want)}`, ev);
    const last = p.scenes[3];
    if (!near(last.dur, 2, 0.05)) throw fail(`the last shot is ${last.dur.toFixed(2)} s, not half of 4 s`, ev);
    const noFade = p.scenes.slice(1).filter(s => s.transition?.type !== 'fade');
    if (noFade.length) throw fail(`no cross-fade into: ${noFade.map(s => `${s.id}(${s.transition?.type || 'cut'})`).join(', ')}`, ev);
    for (const s of p.scenes.slice(0, 3)) { const was = before.scenes.find(b => videos(b.html)[0]?.src === videos(s.html)[0]?.src); if (clipIn(s) !== clipIn(was) || !near(s.dur, was.dur, 0.01)) throw fail(`shot ${s.id} changed (in ${clipIn(was)}→${clipIn(s)}, ${was.dur}→${s.dur.toFixed(2)} s)`, ev); }
    const cues = p.captions, end = cues[cues.length - 1];
    if (!end || CJK.test(end.text) || !/[a-z]{3}/i.test(end.text)) throw fail(`the closing caption is not English: ${JSON.stringify(end?.text)}`, ev);
    if (!(end.start < p.length && end.end <= p.length + 0.01)) throw fail(`the closing caption (${end.start}–${end.end} s) is outside the ${p.length.toFixed(2)} s film`, ev);
    if (cues[0]?.text !== '城市速写') throw fail(`the opening caption changed: ${JSON.stringify(cues[0]?.text)}`, ev);
    if (!/^ok/.test(facts.check)) throw fail(`check: ${facts.check}`, ev);
    legs.push(`末镜 ${last.dur.toFixed(2)} s、转场 ${p.scenes.slice(1).map(s => `${s.transition.type} ${s.transition.dur}s`).join(' / ')}、片尾「${end.text}」${end.start.toFixed(2)}–${end.end.toFixed(2)} s`);
    return ev;
  });

  await scenario('legible', '字幕压在亮画面上、一条被色块挡住:「看不清的地方修好,字别改」', async legs => {
    const pr = projectWith('legible', LEGIBLE, [['aveiro-station', 'aveiro-station.webm'], ['mexico-zocalo', 'mexico-zocalo.webm'], ['haifa-train', 'haifa-train.webm']].map(([n, as]) => [join(footage, `${n}.webm`), as]));
    const bad = rv => rv.scenes.flatMap(s => s.findings).filter(f => ['contrast_aa_failure', 'text_occluded'].includes(f.code) && LEGIBLE_CAPTIONS.some(c => (f.text || f.message).includes(c.slice(0, 6))));
    const was = bad(reviewOf(pr.file));
    assert.ok(was.length >= 2, `the fixture should start with legibility problems (${was.length})`);
    const ev = await ask(await session('legible', pr.dir), '这支片子里的字幕有好几处看不清，帮我看一遍修好。字幕的文字内容别改。', pr.dir);
    if (ev.error) throw fail(`the run failed: ${ev.error}`, ev);
    const { facts } = evidence('legible', pr, ev);
    const now = bad(reviewOf(pr.file)), text = readFileSync(pr.file, 'utf8');
    legs.push(`修之前 review 报 ${was.length} 条(${[...new Set(was.map(f => f.code))].join('、')}),修之后 ${now.length} 条;自己跑 review:${ranReview(ev) ? '是' : '否'}`);
    const lost = LEGIBLE_CAPTIONS.filter(c => !text.includes(c));
    if (lost.length) throw fail(`caption words changed: ${lost.join(' / ')}`, ev);
    if (now.length) throw fail(`still hard to read: ${now.map(f => `${f.code} ${f.t?.toFixed(2)}s ${(f.text || '').slice(0, 20)} ${f.message.slice(0, 40)}`).join(' / ')}`, ev);
    if (!/^ok/.test(facts.check)) throw fail(`check: ${facts.check}`, ev);
    return ev;
  });
} catch (e) {
  failed += 1;
  console.log(`FAIL setup\n     ${String(e?.message || e)}`);
  rows.push({ key: 'setup', name: 'setup', ok: false, ms: 0, detail: String(e?.message || e) });
} finally {
  rmSync(authLink, { force: true });
  if (!exited) { child.kill('SIGTERM'); await Promise.race([new Promise(r => child.once('exit', r)), sleep(5000).then(() => { if (!exited) child.kill('SIGKILL'); })]); }
  images.close();
  writeFileSync(join(artifacts, 'report.md'), report.join('\n'));
  writeFileSync(join(artifacts, 'results.json'), JSON.stringify({ model: MODEL, only: [...ONLY], startedAt, finishedAt: new Date().toISOString(), results: rows }, null, 2));
  if (!failed) rmSync(out, { recursive: true, force: true });
  console.log(`${failed ? 'live: FAILED' : 'live: ok'} · ${join(artifacts, 'report.md')}${failed ? ` · home ${out}` : ''}`);
}
process.exit(failed ? 1 : 0);
