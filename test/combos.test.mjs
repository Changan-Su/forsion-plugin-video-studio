import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseProject } from '../src/lib/project.js';
import { combos, combosLine } from '../src/lib/combos.js';

const head = '```fvs\n{ "fvs": 1, "width": 1920, "height": 1080, "fps": 30 }\n```\n\n';
const scene = (id, { html = '<video src="media/a.webm"></video>', css = '', js = '', fvs = '{ "length": 2 }' } = {}) =>
  `## ${id} · ${id}\n\n\`\`\`fvs\n${fvs}\n\`\`\`\n\n\`\`\`html\n${html}\n\`\`\`\n\n${css ? `\`\`\`css\n${css}\n\`\`\`\n\n` : ''}${js ? `\`\`\`js\n${js}\n\`\`\`\n\n` : ''}`;
const read = text => combos(parseProject(text), text);

test('the example film uses all four ways, each where it is', () => {
  const text = readFileSync(new URL('../examples/mixed/mixed.fvs.md', import.meta.url), 'utf8');
  assert.deepEqual(read(text), { A: ['a'], B: ['b'], C: ['c'], D: ['d2', 'd3'] });
  assert.match(combosLine(parseProject(text), text), /A ×1 \(a\) · B ×1 \(b\) · C ×1 \(c\) · D ×2 \(d2, d3\)/);
});

test('what only looks like a way does not count', () => {
  // a no-op shape, a path that drives nothing, one clip, a fade
  const text = head + scene('s', { css: 'video { clip-path: none; mix-blend-mode: normal }', js: 'const unused = [[0, 100, 100], [0.25, 200, 200]];', fvs: '{ "length": 2, "transition": "fade" }' });
  assert.deepEqual(read(text), { A: [], B: [], C: [], D: [] });
  assert.match(combosLine(parseProject(text), text), /: none\./);
});

test('a class rule in single quotes, a whole-second path that drives a K, two clips', () => {
  const css = '```css\n.cut { clip-path: circle(40%) }\n```\n\n';
  const text = head + css + scene('a', { html: "<video class='cut' src='media/a.webm'></video>" }) +
    scene('b', { js: "const unused = [[0, 1, 1], [1, 2, 2]];\nconst p = [[0, 10, 10], [1, 20, 20]];\nK('.pin', p.map(([d, x, y]) => [t0 + d, { x, y }]));" }) +
    scene('c', { html: '<video src="media/a.webm"></video><video src="media/b.webm"></video>' });
  assert.deepEqual(read(text), { A: ['a'], B: ['b'], C: ['c'], D: [] });
});

test('a film without footage prints no line', () => {
  const text = head + scene('t', { html: '<h1>title</h1>' });
  assert.equal(combosLine(parseProject(text), text), '');
});
