import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProject } from '../src/lib/project.js';
import { compile, buildHtml } from '../src/lib/compile.js';
import { reviewTimes, groupFindings, formatReview } from '../src/lib/review.js';

const DOC = `# R

\`\`\`fvs
{ "fvs": 1, "width": 1280, "height": 720, "fps": 30, "tempo": { "bpm": 120, "beatsPerBar": 4 } }
\`\`\`

## a · 一

\`\`\`fvs
{ "length": "2 bars", "hits": [0, 2, 2.2] }
\`\`\`

\`\`\`html
<p>a</p>
\`\`\`

## b · 二

\`\`\`fvs
{ "length": "1 bar", "hits": [1] }
\`\`\`

\`\`\`html
<p>b</p>
\`\`\`
`;

test('review looks at each scene\'s middle and just after its hits, 0.2 s apart at least', () => {
  const p = parseProject(DOC); // a: 0–4 s, hits 0, 1, 1.1 · b: 4–6 s, hit 4.5
  assert.deepEqual(reviewTimes(p), [0.3, 1.3, 2, 4.8, 5]);
});

test('findings land in the scene on screen at their time; lint goes to the film; film_silent and info are left out', () => {
  const p = parseProject(DOC);
  const hf = {
    lint: { findings: [{ code: 'some_lint', severity: 'warning', message: 'm' }] },
    layout: { findings: [{ code: 'text_occluded', severity: 'error', time: 4.8, selector: 'div.fvs-scenes > div:nth-of-type(2) > p', message: 'hidden' }, { code: 'x', severity: 'info', time: 1 }] },
    craft: { findings: [{ code: 'film_silent', severity: 'warning', time: 0 }, { code: 'line_unread', severity: 'warning', time: 0.3, text: 'a', message: '"a" is short' }] },
  };
  const g = groupFindings(p, hf);
  assert.deepEqual(g.scenes.map(s => [s.id, s.findings.map(f => f.code)]), [['film', ['some_lint']], ['a', ['line_unread']], ['b', ['text_occluded']]]);
  assert.equal(g.scenes[2].findings[0].selector, 'p');
  assert.deepEqual(g.counts, { error: 1, warning: 2, info: 1 });
  assert.equal(groupFindings(p, hf, { all: true }).scenes.find(s => s.id === 'a').findings.length, 2);
  assert.match(formatReview(g, { times: 5 }), /^b · 二 · 4\.00–6\.00 s\n {2}error {3}4\.80 s text_occluded · p$/m);
});

test('the hf page: a sized root and a timed host without GSAP timelines, the runtime from a file, the capture boot', () => {
  const html = buildHtml(compile(parseProject(DOC)), 'RUNTIME_INLINE', { mode: 'hf', runtimeUrl: 'fvs-runtime.js' });
  assert.match(html, /<div id="fvs-hf-root" data-composition-id="fvs" data-width="1280" data-height="720" data-fps="30" data-start="0" data-duration="6" data-no-timeline/);
  assert.match(html, /<div id="fvs-hf-host" data-composition-id="fvs-stage" data-track-index="0" data-start="0" data-duration="6" data-no-timeline/);
  assert.match(html, /<script src="fvs-runtime.js"><\/script>/);
  assert.ok(!html.includes('RUNTIME_INLINE'));
  assert.match(html, /FVS\.boot\("capture"\)/);
  assert.match(html, /registerFrameSource\(\{element:host,ready:s\.ready\(\),render:t=>s\.seek\(t\)\}\)/);
});
