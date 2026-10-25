// fvs — the Forsion Video Studio command line. Single file, no install needed except for `render`,
// `still`, `sheet` and `check --runtime` (a Chromium through playwright-core) and ffmpeg (render, sync).
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, mkdtempSync, readdirSync, statSync, copyFileSync, symlinkSync, lstatSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve, relative, basename, extname, sep, posix } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir, homedir, platform } from 'node:os';
import { spawnSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { parseProject, cueSheet, sceneById, formatLength, visibleHits, stageHtml, formatSrt } from '../lib/project.js';
import { compile, buildHtml, audioTracks, isRelativeUrl } from '../lib/compile.js';
import { scan, videos } from '../lib/html.js';
import { onsetEnvelope, syncReport, ONSET_SR } from '../lib/onsets.js';
import { TEMPLATES } from '../lib/templates.js';
import RUNTIME from '../generated/runtime-src.js';
import { renderVideo, renderJob } from './render.js';
import { HYPERFRAMES_VERSION, reviewTimes, groupFindings, formatReview, footageTimes, footageOnScreen, footageFindings, scrimsOnScreen, scrimFindings } from '../lib/review.js';

const VERSION = '0.7.0';
const HELP = `fvs ${VERSION} — Forsion Video Studio

  fvs new <file.fvs.md> [--template eva|blank] [--title T]   start a project
  fvs info <file>                      scenes, times, hits (read this before editing)
  fvs check <file> [--runtime]         parse errors; --runtime also runs every scene script in a browser
  fvs review <file> [--at t,t…] [--all] [--json]   what the frames look like: text hidden, overlapping, off frame,
                                       low contrast, too short to read (HyperFrames checks, via npx; advice, not a gate)
  fvs cues <file> [--out cues.json]    the cue sheet a score is written against (JSON)
  fvs captions <file> [--out f.srt]    the captions track as a SubRip file
  fvs html <file> [--out f.html] [--inline]   standalone web video (player page)
  fvs still <file> --at <t|scene[:hit]> [--out f.png] [--scale 0.5]   one frame as PNG
  fvs sheet <file> [--scenes | --every <sec>] [--out sheet.png]       contact sheet of frames
  fvs frames <media…> [--every 2] [--from s] [--to s] [--out dir]    a contact sheet per footage file, each
                                       frame labelled with its time in the file (pick in-points from it)
  fvs render <file> [--out f.mp4] [--from s] [--to s] [--scale 0.5] [--workers 3] [--crf 18]
                    [--keep-frames dir] [--no-audio] [--no-captions] MP4 with the project's audio and captions
  fvs render-job <job.json>            export with real progress and a .cancel marker
  fvs sync <file> [--audio a.mp3]      do the hits land on accents of the score?

  Times: 12.5 (seconds), scene id (its start), scene:3 (its hit 3).
  Browser: playwright-core (npm i -g playwright-core) + Chrome/Edge, or FVS_CHROMIUM=/path/to/chrome.
  ffmpeg: on PATH, or FFMPEG=/path/to/ffmpeg.`;

/* ───────── args ───────── */
const argv = process.argv.slice(2);
const cmd = argv.shift();
const flags = {}, pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    const [k, v] = a.slice(2).split('=');
    if (v !== undefined) flags[k] = v;
    else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) flags[k] = argv[++i];
    else flags[k] = true;
  } else pos.push(a);
}
const die = (msg, code = 1) => { const error = new Error(msg); error.exitCode = code; throw error; };
const log = (...a) => console.log(...a);

function load(file) {
  if (!file) die('which project? (fvs <command> <file.fvs.md>)');
  const path = resolve(file);
  if (!existsSync(path)) die(`no such file: ${path}`);
  const text = readFileSync(path, 'utf8');
  return { path, dir: dirname(path), text, p: parseProject(text) };
}
function report(p, { fail = true } = {}) {
  const errs = p.errors.filter(e => e.level === 'error'), warns = p.errors.filter(e => e.level !== 'error');
  for (const e of [...errs, ...warns]) console.error(`${e.level === 'error' ? 'error' : 'warn '} line ${e.line}${e.scene ? ` [${e.scene}]` : ''}: ${e.message}`);
  if (errs.length && fail && !flags.force) die(`${errs.length} error(s); fix them or pass --force`);
}
const fileUrl = (dir, rel) => pathToFileURL(join(dir, rel)).href;

/** A time on the command line: seconds, a scene id, or scene:hit. */
function timeArg(p, v) {
  if (v === undefined || v === true) return null;
  if (/^-?\d+(\.\d+)?$/.test(String(v))) return +v;
  const [id, h] = String(v).split(':');
  const s = sceneById(p, id);
  if (!s) die(`no scene "${id}" (scenes: ${p.scenes.map(x => x.id).join(', ')})`);
  if (h === undefined) return s.t0;
  if (!(+h < s.hitTimes.length)) die(`scene "${id}" has ${s.hitTimes.length} hits`);
  return s.hitTimes[+h];
}

/* ───────── browser & ffmpeg ───────── */
/** A launched Chromium; `need` false: null instead of exiting when there is no driver or no browser. */
async function chromium({ need = true } = {}) {
  const req = createRequire(join(process.cwd(), 'x.js'));
  const tries = ['playwright-core', 'playwright'];
  let pw = null;
  for (const m of tries) {
    for (const load of [() => import(m), () => req(m), () => createRequire(import.meta.url)(m), () => globalRequire(m)]) {
      try { pw = await load(); if (pw && (pw.chromium || (pw.default && pw.default.chromium))) break; pw = null; } catch { /* next */ }
    }
    if (pw) break;
  }
  if (!pw) { if (!need) return null; die('This command needs a browser driver. Install one:  npm i -g playwright-core   (or run inside a folder with playwright installed)'); }
  const { chromium: C } = pw.chromium ? pw : pw.default;
  const exe = process.env.FVS_CHROMIUM || flags.browser;
  const attempts = [];
  if (exe) attempts.push({ executablePath: exe });
  attempts.push({}, { channel: 'chrome' }, { channel: 'msedge' }, { channel: 'chromium' });
  for (const p of knownBrowsers()) attempts.push({ executablePath: p });
  let lastErr;
  for (const opt of attempts) {
    try { return await C.launch({ ...opt, args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--hide-scrollbars'] }); } catch (e) { lastErr = e; }
  }
  if (!need) return null;
  die(`Could not start a Chromium-based browser (${String(lastErr && lastErr.message || lastErr).split('\n')[0]}).\nInstall Google Chrome or Microsoft Edge, or run: npx playwright install chromium, or set FVS_CHROMIUM=/path/to/chrome`);
}
function globalRequire(m) {
  const root = spawnSync(platform() === 'win32' ? 'npm.cmd' : 'npm', ['root', '-g'], { encoding: 'utf8', shell: platform() === 'win32' }).stdout.trim();
  return createRequire(join(root, 'x.js'))(m);
}
function knownBrowsers() {
  const P = platform(), h = homedir();
  const list = P === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium', `${h}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`]
    : P === 'win32'
      ? [`${process.env['PROGRAMFILES'] || 'C:\\Program Files'}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)'}\\Microsoft\\Edge\\Application\\msedge.exe`, `${process.env.LOCALAPPDATA || ''}\\Google\\Chrome\\Application\\chrome.exe`]
      : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/opt/pw-browsers/chromium/chrome-linux/chrome', '/snap/bin/chromium'];
  return list.filter(p => { try { return existsSync(p); } catch { return false; } });
}
function ffmpegBin() {
  const cands = [flags.ffmpeg, process.env.FFMPEG, 'ffmpeg'].filter(Boolean);
  for (const c of cands) if (spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0) return c;
  for (const py of ['python3', 'python']) {
    const r = spawnSync(py, ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  die('ffmpeg not found. Install it (macOS: brew install ffmpeg · Windows: winget install ffmpeg · Linux: apt install ffmpeg) or set FFMPEG=/path/to/ffmpeg');
}

/** Frames (base64 JPEG, 320 px wide) laid out with their labels as one PNG. */
async function contactSheet(browser, shots, labels, out) {
  const cols = Math.min(6, Math.ceil(Math.sqrt(shots.length * 1.4)));
  const sheet = await browser.newPage({ viewport: { width: cols * 332 + 12, height: 400 } });
  await sheet.setContent(`<body style="margin:0;background:#111;color:#bbb;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},320px);gap:12px;padding:12px">${shots.map((b, i) => `<figure style="margin:0"><img style="display:block;width:320px" src="data:image/jpeg;base64,${b}"><figcaption style="padding-top:4px">${labels[i]}</figcaption></figure>`).join('')}</div></body>`);
  await sheet.screenshot({ path: out, fullPage: true });
  await sheet.close();
}

/** Open the project's capture page: the stage at 1:1, window.__stage.seek(t). */
async function openStage(ctx, browser, { scale = 1, captions = true } = {}) {
  const tmp = mkdtempSync(join(tmpdir(), 'fvs-'));
  const payload = compile(ctx.p, { resolve: rel => fileUrl(ctx.dir, rel) });
  if (!captions) payload.captions = [];
  const html = buildHtml(payload, RUNTIME, { mode: 'capture' });
  const page = join(tmp, 'capture.html');
  writeFileSync(page, html);
  const pg = await browser.newPage({ viewport: { width: payload.width, height: payload.height }, deviceScaleFactor: scale });
  const logs = [];
  pg.on('pageerror', e => logs.push(String(e.message || e)));
  if (flags['no-remote-fonts']) await pg.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await pg.route(/\.(mp3|wav|m4a|ogg|aac|flac)(\?|$)/i, r => r.abort());
  await pg.goto(pathToFileURL(page).href);
  const st = await pg.evaluate(async () => { await Promise.race([window.__stage.ready(), new Promise(r => setTimeout(r, 15000))]); return { w: __stage.w, h: __stage.h, dur: __stage.dur, fps: __stage.fps, errors: __stage.errors }; });
  return { pg, st, tmp, payload, logs };
}
function runtimeErrors(st, logs) {
  for (const e of st.errors) console.error(`error line ${e.line || '?'} [${e.scene}]: ${e.message}`);
  for (const l of logs) console.error(`page error: ${l}`);
  return st.errors.length + logs.length;
}

/** Audio and video files the project names that are not on disk (project-relative paths only). */
function missingMedia({ p, dir }) {
  const out = [];
  const gone = rel => isRelativeUrl(rel) && !existsSync(join(dir, rel.trim()));
  for (const a of audioTracks(p.meta)) if (gone(a.src)) out.push({ level: 'error', line: p.metaTok >= 0 ? p.toks[p.metaTok].line : 1, message: `audio file not found: ${a.src}` });
  const inHtml = (html, line, scene) => {
    for (const t of scan(html).tags) {
      const refs = t.name === 'video' ? [t.attr('src'), t.attr('poster')] : t.name === 'source' ? [t.attr('src')] : [];
      for (const r of refs) if (r && gone(r)) out.push({ level: 'error', line, scene, message: `${t.name === 'video' && r === t.attr('poster') ? 'poster image' : 'video file'} not found: ${r}` });
    }
  };
  if (p.stageHtml >= 0) inHtml(stageHtml(p), p.toks[p.stageHtml].line, undefined);
  for (const s of p.scenes) inHtml(s.html, s.htmlTok >= 0 ? p.toks[s.htmlTok].line : s.line, s.id);
  return out;
}

/**
 * What HyperFrames does not look for, in our own capture page seeked to each time: footage that does not fill the
 * frame, and a dark scrim on a shot with no words.
 */
async function footageCheck(ctx, times) {
  if (!times.length) return [];
  const browser = await chromium({ need: false });
  if (!browser) { console.error('warn  footage not checked (filling the frame, scrims on shots without words): that needs playwright-core and a Chromium, like `sheet`'); return []; }
  let stage = null;
  try {
    stage = await openStage(ctx, browser, { scale: 0.25, captions: false });
    const named = Object.fromEntries(Object.entries(stage.payload.assets).map(([rel, url]) => [url, rel])); // page url → the project's path
    const seen = [], scrims = [];
    for (const t of times) {
      await stage.pg.evaluate(x => __stage.seek(x), t);
      const m = await stage.pg.evaluate(footageOnScreen, ctx.p.meta.width);
      if (m) seen.push({ ...m, t, shots: m.shots.map(s => ({ ...s, src: named[s.src] || s.src })) });
      for (const s of await stage.pg.evaluate(scrimsOnScreen)) scrims.push({ ...s, t });
    }
    return [...footageFindings(seen), ...scrimFindings(scrims)];
  } catch (e) { // an extra look, not a reason to lose HyperFrames' report
    console.error(`warn  footage not checked (filling the frame, scrims on shots without words): ${String(e?.message || e).split('\n')[0]}`);
    return [];
  } finally {
    await browser.close();
    if (stage) rmSync(stage.tmp, { recursive: true, force: true });
  }
}

/* ───────── commands ───────── */
const commands = {
  async new() {
    const file = pos[0] || die('fvs new <file.fvs.md>');
    const path = resolve(file.endsWith('.fvs.md') ? file : `${file}.fvs.md`);
    if (existsSync(path) && !flags.force) die(`${path} exists (pass --force to overwrite)`);
    const tpl = TEMPLATES[flags.template || 'eva'] || die(`templates: ${Object.keys(TEMPLATES).join(', ')}`);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, tpl({ title: flags.title || basename(path, '.fvs.md'), zh: flags.lang !== 'en' }));
    log(path);
  },

  async info() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const tp = p.tempo;
    const sec = x => `${+x.toFixed(3)} s`;
    log(`${p.meta.title || '(untitled)'} · ${p.meta.width}×${p.meta.height} @ ${p.meta.fps} fps · ${p.length.toFixed(2)} s${tp ? ` · ${tp.bpm} BPM ${tp.beatsPerBar}/4 (beat ${tp.beat.toFixed(3)} s, bar ${tp.bar.toFixed(3)} s)` : ''}`);
    for (const a of audioTracks(p.meta)) log(`audio ${a.role}: ${a.src}${a.at ? ` at ${a.at}s` : ''}${a.gain ? ` ${a.gain} dB` : ''}${a.in ? ` from ${sec(a.in)} into the file` : ''}${a.dur != null ? ` for ${sec(a.dur)}` : ''}${a.mute ? ' (muted)' : ''}`);
    log('');
    log(`${'#'.padStart(3)}  ${'id'.padEnd(14)} ${'start'.padStart(7)} ${'end'.padStart(7)}  ${'length'.padEnd(10)} hits (${tp ? 'beats' : 's'} from scene start → absolute s)`);
    if (p.scenes.some(s => s.in)) log(`     with "in", hits count from the content start (start − in); (h→t) = trimmed away, not on screen`);
    for (const s of p.scenes) {
      const shown = new Set(visibleHits(s).map(h => h.index));
      const hits = s.hits.map((h, i) => (shown.has(i) ? `${h}→${s.hitTimes[i].toFixed(2)}` : `(${h}→${s.hitTimes[i].toFixed(2)})`)).join('  ');
      log(`${String(s.index + 1).padStart(3)}  ${s.id.padEnd(14)} ${s.t0.toFixed(2).padStart(7)} ${s.t1.toFixed(2).padStart(7)}  ${String(s.meta.length ?? '?').padEnd(10)} ${hits}${s.title ? `   # ${s.title}` : ''}`);
      const extra = [];
      if (s.in) extra.push(`in ${s.meta.in} (${sec(s.in)}; content starts at ${s.t0v.toFixed(2)})`);
      if (s.transition) extra.push(`transition ${s.transition.type} ${sec(s.transition.dur)} (with ${p.scenes[s.index - 1].id} on screen underneath)`);
      if (extra.length) log(`${' '.repeat(5)}${extra.join(' · ')}`);
      for (const v of videos(s.html)) log(`${' '.repeat(5)}video ${v.src || '(no src)'}${v.clipIn ? ` · from ${sec(v.clipIn)} into the file` : ''}${v.gain ? ` · ${v.gain} dB` : ''}${v.muted ? ' · muted' : ''}${v.loop ? ' · loop' : ''}`);
    }
    if (p.captions.length) log(`\ncaptions: ${p.captions.length} cues, ${Math.min(...p.captions.map(c => c.start)).toFixed(2)}–${Math.max(...p.captions.map(c => c.end)).toFixed(2)} s on project time (scene edits do not move them; fvs captions lists them)`);
  },

  async check() {
    const ctx = load(pos[0]);
    report(ctx.p, { fail: false });
    let n = ctx.p.errors.filter(e => e.level === 'error').length;
    for (const e of missingMedia(ctx)) { console.error(`error line ${e.line}${e.scene ? ` [${e.scene}]` : ''}: ${e.message}`); n++; }
    if (flags.runtime) {
      const browser = await chromium();
      const { pg, st, logs } = await openStage(ctx, browser);
      // let every scene with footage show a frame: clips that cannot be played are reported
      const withVideo = ctx.p.scenes.filter(s => videos(s.html).length);
      for (const s of withVideo) await pg.evaluate(x => __stage.seek(x), s.t0);
      if (withVideo.length) st.errors = await pg.evaluate(() => __stage.errors);
      n += runtimeErrors(st, logs);
      await browser.close();
    }
    if (n) die(`${n} error(s)`);
    log(`ok · ${ctx.p.scenes.length} scenes · ${ctx.p.length.toFixed(2)} s${flags.runtime ? ' · scripts ran clean' : ''}`);
  },

  async review() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const { p, dir } = ctx;
    const times = flags.at ? String(flags.at).split(',').map(v => timeArg(p, v.trim())).filter(t => t != null && t >= 0 && t < p.length) : reviewTimes(p);
    if (!times.length) die('nothing to look at (no scenes, or --at is outside the film)');
    const tmp = mkdtempSync(join(tmpdir(), 'fvs-review-'));
    try {
      // HyperFrames serves the folder over http (file:// is refused), so the project's assets go next to the page:
      // top-level folders linked (a junction on Windows needs no rights), loose top-level files copied. Paths outside
      // the project, and the names the page itself uses, are left out. Nothing is ever written through a link.
      const payload = compile(p);
      const outside = [], linked = new Set(), OWN = new Set(['index.html', 'fvs-runtime.js', '.hyperframes']);
      for (const ref of Object.keys(payload.assets)) {
        const rel = ref.replace(/\\/g, '/'), parts = rel.split('/'), top = parts[0];
        if (parts.includes('..') || /^[a-z]:$/i.test(top) || !top || OWN.has(top)) { outside.push(ref); continue; }
        const from = join(dir, top), to = join(tmp, top);
        if (linked.has(top) || !existsSync(from)) continue;
        linked.add(top);
        const folder = statSync(from).isDirectory();
        if (folder && parts.length > 1) symlinkSync(from, to, 'junction');
        else if (!folder && parts.length === 1) copyFileSync(from, to);
      }
      writeFileSync(join(tmp, 'fvs-runtime.js'), RUNTIME, { flag: 'wx' });
      writeFileSync(join(tmp, 'index.html'), buildHtml(payload, RUNTIME, { mode: 'hf', runtimeUrl: 'fvs-runtime.js' }), { flag: 'wx' });
      // npx's own script run by this node, no shell (no quoting to get wrong on Windows); FVS_HYPERFRAMES = the path of
      // a hyperframes CLI script already on this machine, run the same way, instead of npx
      const own = process.env.FVS_HYPERFRAMES;
      const npxCli = [join(dirname(process.execPath), 'node_modules/npm/bin/npx-cli.js'), join(dirname(process.execPath), '../lib/node_modules/npm/bin/npx-cli.js')].find(f => existsSync(f));
      const args = [...(own ? [own] : npxCli ? [npxCli, '--yes', `hyperframes@${HYPERFRAMES_VERSION}`] : ['--yes', `hyperframes@${HYPERFRAMES_VERSION}`]), 'check', tmp, '--json', '--at', times.join(',')];
      if (!own && !npxCli && platform() === 'win32') die('npx was not found next to this Node; set FVS_HYPERFRAMES to the hyperframes CLI script');
      const r = spawnSync(own || npxCli ? process.execPath : 'npx', args, { encoding: 'utf8', maxBuffer: 256 << 20, env: { ...process.env, DO_NOT_TRACK: '1', HYPERFRAMES_NO_TELEMETRY: '1' } });
      let hf = null;
      try { hf = JSON.parse(r.stdout); } catch { /* below */ }
      // a report has its sections; {ok:false, error} is HyperFrames failing to look (no Chrome, a crash), not a clean film
      if (!hf || hf.error || !['lint', 'layout'].every(k => hf[k])) die(`HyperFrames did not run (${hf?.error || (r.error ? r.error.message : `exit ${r.status}`)}). It needs Node with npx and, the first time, the network (~330 MB: the package and a Chrome).\n${String(r.stderr || '').trim().split('\n').slice(-6).join('\n')}`);
      if (hf.browserSkipped) console.error('warn  HyperFrames looked at the page source only (its lint stopped the browser pass); the findings below are not about frames');
      const footage = await footageCheck(ctx, flags.at ? times : footageTimes(p));
      const grouped = groupFindings(p, { ...hf, footage: { findings: footage } }, { all: !!flags.all });
      if (outside.length) console.error(`warn  not reviewed with their assets (outside the project folder): ${outside.join(', ')}`);
      if (flags.json) log(JSON.stringify({ hyperframes: HYPERFRAMES_VERSION, times, ...grouped }, null, 2));
      else log(formatReview(grouped, { times: times.length }));
    } finally {
      // the links go first, on their own: removing the folder must never reach into the project's media
      for (const name of readdirSync(tmp)) { const at = join(tmp, name); try { if (lstatSync(at).isSymbolicLink()) unlinkSync(at); } catch { /* removed below */ } }
      rmSync(tmp, { recursive: true, force: true });
    }
  },

  async cues() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const out = JSON.stringify(cueSheet(p), null, 2);
    if (flags.out) { writeFileSync(resolve(flags.out), out + '\n'); log(resolve(flags.out)); } else log(out);
  },

  async captions() {
    const { p } = load(pos[0]);
    report(p, { fail: false });
    const bad = p.errors.filter(e => e.captions && e.level === 'error').length;
    if (bad && !flags.force) die(`${bad} caption error(s) above; the SRT would leave those cues out (fix them or pass --force)`);
    const out = formatSrt(p.captions);
    if (flags.out) { writeFileSync(resolve(flags.out), out ? out + '\n' : ''); log(resolve(flags.out)); } else if (out) log(out);
  },

  async html() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const out = resolve(flags.out || ctx.path.replace(/\.fvs\.md$/i, '') + '.html');
    const outDir = dirname(out);
    const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
    const resolveUrl = rel => {
      const abs = join(ctx.dir, rel);
      if (flags.inline && existsSync(abs)) return `data:${mime[extname(abs).toLowerCase()] || 'application/octet-stream'};base64,${readFileSync(abs).toString('base64')}`;
      return relative(outDir, abs).split(sep).join('/');
    };
    const payload = compile(ctx.p, { resolve: resolveUrl });
    writeFileSync(out, buildHtml(payload, RUNTIME, { mode: 'player' }));
    log(`${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
  },

  async still() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const t = timeArg(ctx.p, flags.at) ?? 0;
    const browser = await chromium();
    const { pg, st, logs } = await openStage(ctx, browser, { scale: +flags.scale || 1 });
    runtimeErrors(st, logs);
    await pg.evaluate(x => __stage.seek(x), t);
    const out = resolve(flags.out || `${ctx.path.replace(/\.fvs\.md$/i, '')}-${t.toFixed(2)}s.png`);
    await pg.screenshot({ path: out });
    await browser.close();
    log(out);
  },

  async sheet() {
    const ctx = load(pos[0]);
    report(ctx.p);
    const p = ctx.p;
    let times;
    if (flags.every) { const d = +flags.every; times = []; for (let t = 0; t < p.length; t += d) times.push(t); }
    else times = p.scenes.map(s => { const vis = visibleHits(s); return Math.max(s.t0, Math.min(s.t1 - Math.min(.05, s.dur / 2), (vis.length ? vis[vis.length - 1].t : s.t0) + .5)); });
    const labels = flags.every ? times.map(t => `${t.toFixed(1)}s`) : p.scenes.map(s => `${s.id} · ${s.t0.toFixed(1)}s`);
    const browser = await chromium();
    const scale = 320 / p.meta.width;
    const { pg, st, logs } = await openStage(ctx, browser, { scale });
    runtimeErrors(st, logs);
    const shots = [];
    for (const t of times) { await pg.evaluate(x => __stage.seek(x), t); shots.push((await pg.screenshot({ type: 'jpeg', quality: 80 })).toString('base64')); }
    const out = resolve(flags.out || `${ctx.path.replace(/\.fvs\.md$/i, '')}-sheet.png`);
    await contactSheet(browser, shots, labels, out);
    await browser.close();
    log(out);
  },

  async frames() {
    if (!pos.length) die('which footage? (fvs frames <media…> [--every 2])');
    const ff = ffmpegBin(), every = flags.every === undefined ? 2 : +flags.every, dir = resolve(flags.out || join(tmpdir(), 'fvs-frames'));
    if (!(every > 0)) die('--every takes a number of seconds above 0');
    mkdirSync(dir, { recursive: true });
    const browser = await chromium();
    try {
      for (const file of pos) {
        const src = resolve(file);
        if (!existsSync(src)) die(`no such file: ${src}`);
        const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(spawnSync(ff, ['-hide_banner', '-i', src], { encoding: 'utf8' }).stderr || '');
        const length = m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : +flags.to;
        if (!(length > 0)) die(`ffmpeg reads no duration from ${src}; pass --to <seconds>`);
        const from = flags.from === undefined ? 0 : +flags.from, to = Math.min(length, flags.to === undefined ? length : +flags.to);
        if (!(from >= 0 && to > from)) die(`nothing to show between ${flags.from ?? 0} and ${flags.to ?? 'the end'} s of ${basename(src)} (${length.toFixed(1)} s long)`);
        const step = (to - from) / every > 24 ? Math.ceil((to - from) / 12) / 2 : every; // ponytail: at most ~24 frames a sheet, on half seconds; look closer with --from/--to
        const times = [], shots = [];
        for (let t = from; t < to - 0.04 || !shots.length && t < to + step; t += step) {
          const r = spawnSync(ff, ['-v', 'error', '-ss', String(+t.toFixed(2)), '-i', src, '-frames:v', '1', '-vf', 'scale=320:-2', '-q:v', '4', '-f', 'image2pipe', '-c:v', 'mjpeg', '-'], { maxBuffer: 16 << 20 });
          if (r.status === 0 && r.stdout.length) { times.push(+t.toFixed(2)); shots.push(r.stdout.toString('base64')); } // none past the last picture (the sound can run longer)
        }
        if (!shots.length) die(`ffmpeg could not read a frame of ${src} between ${from} and ${to} s`);
        const out = join(dir, `${basename(src).replace(/\./g, '-')}-frames.png`);
        await contactSheet(browser, shots, times.map(t => `${basename(src)} · ${t} s`), out);
        log(`${out}\n  ${basename(src)} · ${length.toFixed(1)} s · a frame every ${+step.toFixed(2)} s at: ${times.join(' ')}`);
      }
    } finally { await browser.close(); }
  },

  async render() {
    const ctx = load(pos[0]); report(ctx.p);
    return renderVideo(ctx, flags, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });
  },
  async 'render-job'() {
    const jobPath = resolve(pos[0] || die('render-job requires a job JSON file'));
    const job = renderJob(jobPath);
    try {
      const spec = JSON.parse(readFileSync(jobPath, 'utf8'));
      if (spec.v !== 1 || !spec.project || !spec.out || !spec.options) die('Invalid render job');
      if (['done', 'failed', 'cancelled'].includes(spec.status)) { log(`Job already ${spec.status}`); return; }
      const ctx = load(spec.project);
      if (spec.sourceSnapshot) { ctx.text = readFileSync(spec.sourceSnapshot, 'utf8'); ctx.p = parseProject(ctx.text); }
      report(ctx.p);
      return await renderVideo(ctx, { ...spec.options, out: spec.out, job: jobPath }, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });
    } catch (e) { job.write({ status: job.cancelled() ? 'cancelled' : 'failed', error: String(e.message || e) }); throw e; }
  },

  async sync() {
    const { p, dir } = load(pos[0]);
    report(p, { fail: false });
    // the score: the first track that is not muted (its in / dur trim applies)
    const tracks = audioTracks(p.meta), track = tracks.find(a => !a.mute) || tracks[0];
    const src = flags.audio ? resolve(flags.audio) : track && join(dir, track.src);
    if (!src || !existsSync(src)) die('no audio to check against (add one to the project\'s "audio" or pass --audio)');
    const at = flags.audio ? 0 : track.at || 0;
    const ff = ffmpegBin();
    const r = spawnSync(ff, ['-v', 'error', '-i', src, '-ac', '1', '-ar', String(ONSET_SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 30 });
    if (r.status !== 0) die(`ffmpeg could not decode ${src}`);
    const buf = r.stdout;
    let pcm = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4));
    if (!flags.audio && (track.in > 0 || track.dur != null)) {
      const a = Math.min(pcm.length, Math.round(track.in * ONSET_SR));
      pcm = pcm.subarray(a, track.dur != null ? Math.min(pcm.length, a + Math.round(track.dur * ONSET_SR)) : pcm.length);
    }
    const lead = new Float32Array(Math.round(at * ONSET_SR));
    const mono = at > 0 ? Float32Array.from([...lead, ...pcm]) : pcm;
    const rows = syncReport(p.scenes, onsetEnvelope(mono, ONSET_SR));
    let bad = 0;
    for (const x of rows) {
      const flag = x.ok ? (x.quiet ? 'cut to quiet' : '') : '<< weak accent';
      if (!x.ok) bad++;
      if (!x.ok || flags.all) log(`${x.t.toFixed(2).padStart(7)}s  ${x.scene}:h${x.hit}  accent ${x.strength.toFixed(2)}  ${x.offset == null ? '' : `${x.offset >= 0 ? '+' : ''}${Math.round(x.offset * 1000)} ms`}  ${flag}`);
    }
    log(`${rows.length} hits, ${rows.length - bad} land on an accent${bad ? `, ${bad} do not (listed above)` : ''}`);
  },
};

if (!cmd || cmd === 'help' || flags.help || !commands[cmd]) { log(HELP); process.exit(cmd && !commands[cmd] && cmd !== 'help' ? 1 : 0); }
commands[cmd]().catch(e => { console.error(e && e.stack || String(e)); process.exitCode = e.exitCode || 1; });
