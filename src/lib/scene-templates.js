// Scene templates for "New scene". Declarative timing only (data-in / data-fx / data-each), so every
// word is editable in the Text tab and the cuts follow the hits. Sizes use container units (cqh / cqw)
// against the scene box, so one template fits 16:9, 9:16 and square frames alike.
// Colours read the project's --ink / --accent-color when its global CSS defines them.

const FONT = "'Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,'SF Mono',Menlo,monospace";
const BASE = `container-type: size;
color: var(--ink, #f4f2ee);
font-family: ${FONT};
`;
const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="#3a4448"/><stop offset="1" stop-color="#1c2124"/></linearGradient></defs><rect width="160" height="100" fill="url(#g)"/><path d="M0 78 46 44l30 22 26-18 58 30v22H0z" fill="#56656a"/><circle cx="118" cy="30" r="10" fill="#6f8085"/></svg>');

/** Text per language; the first entry is what the template id means in the gallery. */
export const SCENE_TEMPLATES = [
  {
    id: 'title', bars: 2, seconds: 4, hits: [0, 2],
    name: { zh: '标题卡', en: 'Title card' }, hint: { zh: '小标题、大标题、一句说明', en: 'Kicker, title and one line' },
    html: L => `<div class="t-wrap">
  <p class="t-kicker" data-in="h0" data-fx="fade">${L('CHAPTER 01', 'CHAPTER 01')}</p>
  <h1 class="t-title" data-in="h0" data-fx="up">${L('一个清楚的标题', 'A clear title')}</h1>
  <p class="t-sub" data-in="h1" data-fx="fade">${L('一句说明，告诉观众接下来看什么', 'One line on what comes next')}</p>
</div>`,
    css: `${BASE}.t-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2.4cqh; padding: 0 8cqw; text-align: center; }
.t-kicker { margin: 0; font: 600 2.6cqh/1 ${MONO}; letter-spacing: .3em; opacity: .7; }
.t-title { margin: 0; font-size: 11cqh; font-weight: 800; line-height: 1.05; }
.t-sub { margin: 0; font-size: 3.6cqh; opacity: .72; }`,
  },
  {
    id: 'statement', bars: 2, seconds: 4, hits: [0],
    name: { zh: '一句话', en: 'Statement' }, hint: { zh: '一句大字，逐字打出', en: 'One big line, typed out' },
    html: L => `<p class="s-line" data-in="h0" data-fx="type" data-cps="18">${L('不止记下来，还能接着做下去。', 'Not just notes. Next steps.')}</p>`,
    css: `${BASE}.s-line { position: absolute; left: 8cqw; right: 8cqw; top: 50%; translate: 0 -50%; margin: 0; font-size: 8.5cqh; font-weight: 800; line-height: 1.2; }`,
  },
  {
    id: 'list', bars: 2, seconds: 5, hits: [0, 2],
    name: { zh: '要点', en: 'Key points' }, hint: { zh: '标题加三条，逐条出现', en: 'A heading and three points, one by one' },
    html: L => `<div class="l-wrap">
  <h2 data-in="h0" data-fx="up">${L('三件事', 'Three things')}</h2>
  <ol data-in="h1" data-each="1" data-fx="up">
    <li>${L('第一点，说清楚', 'Say it plainly')}</li>
    <li>${L('第二点，给证据', 'Show the proof')}</li>
    <li>${L('第三点，讲下一步', 'Name the next step')}</li>
  </ol>
</div>`,
    css: `${BASE}.l-wrap { position: absolute; inset: 0; display: grid; align-content: center; gap: 4cqh; padding: 0 12cqw; }
.l-wrap h2 { margin: 0; font-size: 7cqh; font-weight: 800; }
.l-wrap ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 2.6cqh; counter-reset: n; }
.l-wrap li { font-size: 4.6cqh; counter-increment: n; display: flex; gap: 2cqh; align-items: baseline; }
.l-wrap li::before { content: counter(n, decimal-leading-zero); font: 600 3cqh/1 ${MONO}; color: var(--accent-color, #7fc1cf); }`,
  },
  {
    id: 'stat', bars: 1, seconds: 3, hits: [0, 2],
    name: { zh: '数据', en: 'Big number' }, hint: { zh: '一个数字和它的意义', en: 'A number and what it means' },
    html: L => `<div class="n-wrap">
  <b data-in="h0" data-fx="pop">94%</b>
  <span data-in="h1" data-fx="fade">${L('的用户在第一周就用上了它', 'of people used it in week one')}</span>
</div>`,
    css: `${BASE}.n-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2cqh; text-align: center; padding: 0 8cqw; }
.n-wrap b { font: 800 30cqh/1 ${FONT}; color: var(--accent-color, #7fc1cf); letter-spacing: -.02em; }
.n-wrap span { font-size: 4.4cqh; opacity: .8; }`,
  },
  {
    id: 'quote', bars: 2, seconds: 5, hits: [0, 4],
    name: { zh: '引言', en: 'Quote' }, hint: { zh: '一段引用和出处', en: 'A quote and who said it' },
    html: L => `<figure class="q-wrap">
  <blockquote data-in="h0" data-fx="fade">${L('“把复杂的事，讲成一句话。”', '“Make the complicated thing one sentence.”')}</blockquote>
  <figcaption data-in="h1" data-fx="fade">${L('— 一位用户', '— A user')}</figcaption>
</figure>`,
    css: `${BASE}.q-wrap { position: absolute; inset: 0; margin: 0; display: grid; align-content: center; gap: 4cqh; padding: 0 14cqw; }
.q-wrap blockquote { margin: 0; font-size: 7cqh; font-weight: 700; line-height: 1.3; }
.q-wrap figcaption { font-size: 3.4cqh; opacity: .65; }`,
  },
  {
    id: 'compare', bars: 2, seconds: 5, hits: [0, 2],
    name: { zh: '对比', en: 'Before / after' }, hint: { zh: '左右两栏，先后出现', en: 'Two columns, one after the other' },
    html: L => `<div class="c-wrap">
  <section data-in="h0" data-fx="up"><small>${L('之前', 'Before')}</small><b>${L('手动整理三小时', 'Three hours by hand')}</b></section>
  <section class="after" data-in="h1" data-fx="up"><small>${L('之后', 'After')}</small><b>${L('一句话，三分钟', 'One sentence, three minutes')}</b></section>
</div>`,
    css: `${BASE}.c-wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3cqw; padding: 14cqh 8cqw; }
.c-wrap section { display: grid; align-content: center; gap: 2.4cqh; padding: 0 4cqw; border-radius: 2cqh; background: rgba(255,255,255,.06); }
.c-wrap .after { background: color-mix(in srgb, var(--accent-color, #7fc1cf) 22%, transparent); }
.c-wrap small { font: 600 2.6cqh/1 ${MONO}; letter-spacing: .2em; opacity: .7; }
.c-wrap b { font-size: 6cqh; line-height: 1.2; }`,
  },
  {
    id: 'image', bars: 2, seconds: 5, hits: [0, 2],
    name: { zh: '图文', en: 'Image and text' }, hint: { zh: '左图右文，在「文字」页换图', en: 'Picture left, text right; replace it under Text' },
    html: L => `<div class="i-wrap">
  <img src="${PLACEHOLDER}" alt="" data-in="h0" data-fx="fade">
  <div><h2 data-in="h0" data-fx="up">${L('配图标题', 'Picture title')}</h2><p data-in="h1" data-fx="fade">${L('一两句说明这张图。', 'A line or two about the picture.')}</p></div>
</div>`,
    css: `${BASE}.i-wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 5cqw; padding: 10cqh 8cqw; }
.i-wrap img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 1.6cqh; }
.i-wrap h2 { margin: 0 0 2cqh; font-size: 6.4cqh; font-weight: 800; }
.i-wrap p { margin: 0; font-size: 3.6cqh; line-height: 1.5; opacity: .75; }`,
  },
  {
    id: 'terminal', bars: 2, seconds: 5, hits: [0, 1, 2, 3],
    name: { zh: '终端', en: 'Terminal' }, hint: { zh: '命令逐行打出', en: 'Commands typed line by line' },
    html: L => `<div class="tm">
  <div class="tm-bar"><i></i><i></i><i></i></div>
  <p data-in="h0" data-fx="type">$ forsion video new</p>
  <p data-in="h1" data-fx="type">${L('✓ 场景已生成', '✓ Scenes written')}</p>
  <p data-in="h2" data-fx="type">${L('✓ 配乐已对齐', '✓ Score in sync')}</p>
  <p data-in="h3" data-fx="type">${L('✓ 导出完成', '✓ Exported')}</p>
</div>`,
    css: `${BASE}.tm { position: absolute; left: 14cqw; right: 14cqw; top: 18cqh; bottom: 18cqh; border-radius: 1.8cqh; background: #0d1112; box-shadow: 0 0 0 1px rgba(255,255,255,.08); padding: 0 4cqw 4cqh; }
.tm-bar { display: flex; gap: 1.2cqh; padding: 3cqh 0 4cqh; }
.tm-bar i { width: 1.8cqh; height: 1.8cqh; border-radius: 50%; background: rgba(255,255,255,.18); }
.tm p { margin: 0 0 2cqh; font: 500 4.2cqh/1.4 ${MONO}; color: #8ff0b5; white-space: pre; }`,
  },
  {
    id: 'outro', bars: 2, seconds: 4, hits: [0, 2],
    name: { zh: '片尾', en: 'End card' }, hint: { zh: '品牌名和网址', en: 'Brand name and address' },
    html: L => `<div class="o-wrap">
  <b data-in="h0" data-fx="pop">${L('你的品牌', 'Your brand')}</b>
  <span data-in="h1" data-fx="fade">example.com</span>
</div>`,
    css: `${BASE}.o-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2.4cqh; }
.o-wrap b { font-size: 12cqh; font-weight: 800; }
.o-wrap span { font: 500 3.4cqh/1 ${MONO}; letter-spacing: .14em; opacity: .7; }`,
  },
  {
    id: 'blank', bars: 1, seconds: 2, hits: [0],
    name: { zh: '空白', en: 'Blank' }, hint: { zh: '一行居中的字', en: 'One centred line' },
    html: L => `<p class="b-line" data-in="h0" data-fx="fade">${L('新场景', 'New scene')}</p>`,
    css: `${BASE}.b-line { position: absolute; inset: 0; margin: 0; display: grid; place-items: center; font-size: 9cqh; font-weight: 800; }`,
  },
];

/** The scene a template inserts: { id, title, meta, html, css } for project.js insertScene. */
export function sceneFromTemplate(tpl, { id, tempo, zh }) {
  const L = (a, b) => (zh ? a : b);
  return {
    id, title: zh ? tpl.name.zh : tpl.name.en,
    meta: { length: tempo ? `${tpl.bars} ${tpl.bars === 1 ? 'bar' : 'bars'}` : `${tpl.seconds}s`, hits: tempo ? tpl.hits : tpl.hits.map(b => b * .5) },
    html: tpl.html(L), css: tpl.css,
  };
}

/** A media scene for an imported picture or video clip (path relative to the project file). */
export function mediaScene({ id, title, src, kind, seconds, tempo }) {
  const fill = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
  src = String(src).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  title = String(title).replace(/[\u0000-\u001f]+/g, ' ').trim();
  const length = kind === 'video' || !tempo ? `${Math.round(seconds * 1000) / 1000}s` : '2 bars';
  if (kind === 'video') return { id, title, meta: { length, hits: [0] }, html: `<video src="${src}" data-clip-in="0" style="${fill}"></video>` };
  // a slow push-in keeps a still picture alive; delete the script for a static frame
  return { id, title, meta: { length, hits: [0] }, html: `<img src="${src}" alt="" style="${fill}">`, js: "K('img', [[t0, { s: 1 }], [t1, { s: 1.06 }, 'lin']])" };
}
