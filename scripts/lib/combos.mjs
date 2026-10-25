// The skill's step 5b, read from a project (verify-edit-live's themes): which shots combine footage and graphics.
import { videos, scan } from '../../src/lib/html.js';

/**
 * Where the footage and the graphics are one picture (the skill's step 5b), read from the project: A the shot inside a
 * shape (mix-blend-mode / clip-path / mask in a shot's own css or html, or in a project rule whose class the shot
 * uses), B graphics on what is in the shot (a pasted `fvs track` path: [[0, x, y], [0.25, …), C a layout (two
 * pictures at once, from the motion read), D a graphic transition (iris, sweep). Scene ids per kind.
 */
export function combos(p, text, m) {
  // a declaration that does something (`clip-path: none` or `mix-blend-mode: normal` does not). ponytail: a project rule
  // counts through the classes in its selector only; `video { clip-path: … }` with no class is not seen
  const fx = /mix-blend-mode\s*:\s*(?!normal\b)|clip-path\s*:\s*(?!none\b)|mask(?:-image)?\s*:\s*(?!none\b)/;
  const head = text.slice(0, text.search(/^## /m) < 0 ? text.length : text.search(/^## /m));
  const fxClasses = new Set([...head.matchAll(/```css\n([\s\S]*?)```/g)].flatMap(b => [...b[1].matchAll(/([^{}]+)\{([^}]*)\}/g)]).filter(r => fx.test(r[2])).flatMap(r => [...r[1].matchAll(/\.([\w-]+)/g)].map(c => c[1])));
  const uses = html => scan(html).tags.flatMap(t => (t.attr('class') || '').split(/\s+/)).some(c => fxClasses.has(c));
  const sh = p.scenes.filter(s => videos(s.html).some(v => v.src));
  return {
    A: sh.filter(s => fx.test(s.css || '') || fx.test(s.html) || uses(s.html)).map(s => s.id),
    // a pasted path ([[0, x, y], [0.25, x, y] …) that drives a K: `K('.pin', path.map(…))`
    B: sh.filter(s => { const m = /(\w+)\s*=\s*\[\s*\[\s*0(?:\.0+)?\s*,\s*-?\d+\s*,\s*-?\d+\s*\]\s*,\s*\[\s*\d*\.?\d+\s*,/.exec(s.js || ''); return !!m && new RegExp(`K\\(\\s*['"][^'"]+['"]\\s*,\\s*${m[1]}\\.map\\(`).test(s.js); }).map(s => s.id),
    C: (m?.shots || []).filter(x => x.multi).map(x => x.id),
    D: p.scenes.filter(s => s.transition && ['iris', 'sweep'].includes(s.transition.type)).map(s => s.id),
  };
}
