// `fvs review`: the project looked at by HyperFrames' checks (layout, contrast, readability, runtime). DOM-free.
// The page is buildHtml(mode 'hf'); these are the parts that need no browser: where to look and how to report.
import { visibleHits } from './project.js';

/** The HyperFrames CLI release `fvs review` runs (npx). Pinned: its checks and their codes change between releases. */
export const HYPERFRAMES_VERSION = '0.8.190';

/** Codes that misread a Video Studio page: the score lives in the payload, not in an <audio> element. */
const NOT_OURS = new Set(['film_silent']);
const MAX_TIMES = 60;

/**
 * Where to look: each scene's middle, and a moment after each hit on screen (what a cut or an entrance just put
 * there). Times closer than 0.2 s are one. Past MAX_TIMES the hits are thinned evenly; the middles all stay.
 */
export function reviewTimes(p) {
  const mids = p.scenes.map(s => (s.t0 + s.t1) / 2);
  const hits = p.scenes.flatMap(s => visibleHits(s).map(h => Math.min(h.t + 0.3, s.t1 - 0.05)).filter(t => t > s.t0));
  const keep = Math.max(0, MAX_TIMES - mids.length);
  const picked = hits.length <= keep ? hits : Array.from({ length: keep }, (_, i) => hits[Math.floor(i * hits.length / keep)]);
  const out = [];
  for (const t of [...mids, ...picked].sort((a, b) => a - b)) if (t >= 0 && t < p.length && !(out.length && t - out[out.length - 1] < 0.2)) out.push(+t.toFixed(3));
  return out;
}

/** Every finding of a `hyperframes check --json` report, flattened, with the section it came from. */
function flatten(report) {
  const out = [];
  for (const section of ['lint', 'runtime', 'layout', 'motion', 'contrast', 'craft']) {
    for (const f of report?.[section]?.findings || []) out.push({ ...f, section });
  }
  return out;
}

/**
 * The report by scene: [{ id, title, t0, t1, findings }] in film order, then `counts`. A finding goes to the scene on
 * screen at its time (one without a time, e.g. lint, to `film`). Info-level findings only with `all`.
 */
export function groupFindings(p, report, { all = false } = {}) {
  const film = { id: 'film', title: '', t0: 0, t1: p.length, findings: [] };
  const scenes = p.scenes.map(s => ({ id: s.id, title: s.title || '', t0: s.t0, t1: s.t1, findings: [] }));
  const counts = { error: 0, warning: 0, info: 0 };
  for (const f of flatten(report)) {
    if (NOT_OURS.has(f.code)) continue;
    const severity = f.severity === 'error' ? 'error' : f.severity === 'warning' ? 'warning' : 'info';
    counts[severity]++;
    if (severity === 'info' && !all) continue;
    const t = Number.isFinite(f.time) && f.section !== 'lint' ? f.time : null;
    const home = t == null ? film : scenes.find(s => t >= s.t0 && t < s.t1) || scenes[scenes.length - 1] || film;
    home.findings.push({ t, severity, code: f.code, section: f.section, selector: (f.selector || '').replace(/^div\.fvs-scenes > div:nth-of-type\(\d+\) > /, ''), text: f.text || '', message: f.message || '', fix: f.fixHint || '' });
  }
  for (const s of [film, ...scenes]) s.findings.sort((a, b) => (a.t ?? -1) - (b.t ?? -1));
  return { scenes: [film, ...scenes].filter(s => s.findings.length), counts };
}

/** The grouped report as text for the person or the Director. */
export function formatReview({ scenes, counts }, { times = 0 } = {}) {
  const lines = [];
  for (const s of scenes) {
    lines.push(s.id === 'film' ? 'whole film' : `${s.id}${s.title ? ` · ${s.title}` : ''} · ${s.t0.toFixed(2)}–${s.t1.toFixed(2)} s`);
    for (const f of s.findings) {
      const what = [f.selector, f.text && !f.message.includes(f.text) ? `"${f.text.slice(0, 60)}"` : ''].filter(Boolean).join(' ');
      lines.push(`  ${f.severity.padEnd(7)} ${f.t == null ? '' : `${f.t.toFixed(2)} s `}${f.code}${what ? ` · ${what}` : ''}`);
      lines.push(`          ${f.message}`);
      if (f.fix && f.severity !== 'info') lines.push(`          fix: ${f.fix}`);
    }
  }
  lines.push(`${counts.error} error(s), ${counts.warning} warning(s), ${counts.info} note(s) at ${times} moments. Advice, not a gate: a finding can be a deliberate choice (mark it, see the skill).`);
  return lines.join('\n');
}
