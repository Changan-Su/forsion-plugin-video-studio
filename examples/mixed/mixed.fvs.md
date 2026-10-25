# 实拍 × 动画：四种结合

A 画面装进字里，B 图形跟着画面里的东西，C 版式化的画面，D 图形完成转场（技能「Cut footage」第 5b 步）。素材不在仓库里：
`node scripts/lib/fetch-footage.mjs sports examples/mixed/media` 取回 Wikimedia Commons 的运动素材（署名在 media/CREDITS.md）。

```fvs
{
  "fvs": 1,
  "title": "实拍 × 动画",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "background": "#0b0b0b",
  "audio": []
}
```

```css
.fvs-stage { color: #f5f3ef; font-family: 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif; }
.fvs-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fvs-stage .mark { position: absolute; left: 64px; top: 52px; margin: 0; z-index: 5; padding: 8px 18px; font-size: 30px; font-weight: 600; letter-spacing: .08em; color: #111; background: #ff5a1f; }
.fvs-stage { --fvs-sweep: #ff5a1f; }
```

## a · 片名

```fvs
{ "length": "8 beats", "hits": [0, 2, 4, 6] }
```

```html
<video src="media/skate-park.webm" data-clip-in="12" muted></video>
<div class="knock" data-layout-ignore><b>热血</b></div>
<p class="mark" data-in="h3">A · 画面装进字里</p>
```

```css
.knock { --ox: 1244px; --oy: 356px; /* inside the top stroke of 血, measured on a still */ position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #000; mix-blend-mode: multiply; transform-origin: var(--ox, 50%) var(--oy, 50%); }
.knock b { font-size: 640px; font-weight: 600; line-height: 1; color: #fff; letter-spacing: -.04em; }
```

```js
K('video', [[t0, { s: 1 }], [t1, { s: 1.08 }, 'lin']]);
// the footage plays inside the letters, then the letters grow until the shot is the whole frame
K('.knock', [[t0, { s: 1.12, o: 1 }], [hit(2), { s: 1 }, 'out'], [hit(2) + .4, { s: 3 }, 'in'], [hit(2) + .6, { o: 1 }], [hit(2) + .85, { s: 60, o: 0 }, 'in']]);
```

## b · 跟拍

```fvs
{ "length": "10 beats", "hits": [0, 1, 2, 6, 8] }
```

```html
<div class="cam">
  <video src="media/surf.webm" data-clip-in="8" muted></video>
  <svg class="crest" viewBox="0 0 1920 1080" preserveAspectRatio="none"><path d="M-20 498 C 420 486, 860 508, 1300 494 S 1760 486, 1940 498"/></svg>
  <div class="pin">
    <i class="ring" data-in="h1" data-fx="pop"></i>
    <i class="lead"></i>
    <div class="read" data-in="h2" data-fx="wipe"><small>SURFER 01 · 速度</small><b><span class="kmh">0</span><em>km/h</em></b></div>
  </div>
</div>
<p class="mark" data-in="h0">B · 图形跟着画面里的东西</p>
```

```css
.cam { position: absolute; inset: 0; }
.crest { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.crest path { fill: none; stroke: #ff5a1f; stroke-width: 5; stroke-dasharray: 2100; stroke-dashoffset: calc((1 - var(--d, 0)) * 2100); }
.pin { position: absolute; left: 0; top: 0; }
.ring { position: absolute; left: -64px; top: -84px; width: 128px; height: 150px; border: 4px solid #ff5a1f; border-radius: 50%; box-sizing: border-box; }
.lead { position: absolute; left: 44px; top: -70px; width: 190px; height: 4px; background: #ff5a1f; transform-origin: left center; rotate: -38deg; scale: var(--d, 0) 1; }
.read { position: absolute; left: 196px; top: -300px; display: grid; gap: 4px; text-shadow: 0 2px 18px rgba(0,0,0,.55); }
.read small { white-space: nowrap; font-size: 28px; font-weight: 600; letter-spacing: .12em; color: #ffd6c4; }
.read b { font-size: 120px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
.read em { font-style: normal; font-size: 40px; margin-left: 12px; }
```

```js
K('.cam', [[t0, { s: 1 }], [t1, { s: 1.06 }, 'lin']]);
// the surfer, every 0.25 s: fvs track media/surf.webm --at 8 --to 13 --point 50,50
const path = [[0, 912, 564], [0.25, 960, 532], [0.5, 992, 536], [0.75, 984, 548], [1, 972, 552], [1.25, 976, 552], [1.5, 992, 560], [1.75, 1008, 576], [2, 1012, 572], [2.25, 1016, 572], [2.5, 1020, 568], [2.75, 1036, 568], [3, 1064, 568], [3.25, 1084, 564], [3.5, 1096, 556], [3.75, 1040, 552], [4, 972, 536], [4.25, 952, 532], [4.5, 936, 532], [4.75, 908, 524]];
K('.pin', path.map(([d, x, y], i) => [t0 + d, { x, y }, i ? 'lin' : undefined]));
K('.crest', [[hit(0), { '--d': 0 }], [hit(0) + 3 * beat, { '--d': 1 }, 'expo']]);
K('.lead', [[hit(1) + .1, { '--d': 0 }], [hit(1) + .1 + beat, { '--d': 1 }, 'expo']]);
const kmh = $('.kmh');
H(t => { kmh.textContent = Math.round(31 * prog(t, hit(2), hit(4), 'out')); });
```

## c · 版式

```fvs
{ "length": "12 beats", "hits": [0, 1, 2, 4, 8] }
```

```html
<div class="p p1"><video src="media/skate-town.webm" data-clip-in="9" muted data-layout-ignore></video></div>
<div class="p p3"><video src="media/cycling.webm" data-clip-in="14" muted data-layout-ignore></video></div>
<div class="p p2"><video src="media/dunk.webm" data-clip-in="3" muted data-layout-ignore></video></div>
<p class="w w1" data-in="h0+0.25" data-fx="wipe">起跳</p>
<p class="w w2" data-in="h1+0.25" data-fx="wipe">暴扣</p>
<p class="w w3" data-in="h2+0.25" data-fx="wipe">冲刺</p>
<h2 class="big" data-in="h4+0.35" data-fx="zoom">全力以赴</h2>
<p class="mark" data-in="h0">C · 版式化的画面</p>
```

```css
& { background: #141414; }
.p { position: absolute; overflow: hidden; left: calc(var(--l) * 1px); top: calc(var(--t) * 1px); width: calc(var(--w) * 1px); height: calc(var(--h) * 1px); }
.p2 { z-index: 2; }
.w { position: absolute; top: 836px; margin: 0; width: 581px; font-size: 84px; font-weight: 600; letter-spacing: .06em; }
.w1 { left: 64px; } .w2 { left: 669px; } .w3 { left: 1274px; }
.big { position: absolute; left: 0; right: 0; top: 380px; z-index: 3; margin: 0; text-align: center; font-size: 240px; font-weight: 600; letter-spacing: .04em; text-shadow: 0 6px 40px rgba(0,0,0,.6); }
```

```js
// three columns rise in on the first three hits; on hit 4 the middle one opens to the whole frame
const col = i => ({ '--l': 64 + i * 605, '--t': 200, '--w': 581, '--h': 600 });
const rise = (sel, i, at) => K(sel, [[t0, { ...col(i), '--t': 1100 }], [at, { '--t': 1100 }], [at + .45, { '--t': 200 }, 'expo']]);
rise('.p1', 0, hit(0));
rise('.p3', 2, hit(2));
K('.p2', [[t0, { ...col(1), '--t': 1100 }], [hit(1), { '--t': 1100 }], [hit(1) + .45, { '--t': 200 }, 'expo'], [hit(4), {}], [hit(4) + .5, { '--l': 0, '--t': 0, '--w': 1920, '--h': 1080 }, 'expo']]);
K('.p video', [[t0, { s: 1 }], [t1, { s: 1.1 }, 'lin']]);
```

## d1 · 骑行

```fvs
{ "length": "6 beats", "hits": [0, 2, 4] }
```

```html
<video src="media/cycling.webm" data-clip-in="17" muted></video>
<p class="mark" data-in="h0">D · 图形完成转场</p>
```

```js
K('video', [[t0, { s: 1.02 }], [t1, { s: 1.12 }, 'in']]);
```

## d2 · 风筝冲浪

```fvs
{ "length": "6 beats", "hits": [0, 2, 4], "transition": { "type": "sweep", "dur": "2 beats" } }
```

```html
<video src="media/kitesurf.webm" data-clip-in="10" muted></video>
<p class="mark">D · 图形完成转场</p>
```

```js
K('video', [[t0, { s: 1.1 }], [t1, { s: 1.02 }, 'out']]);
```

## d3 · 收尾

```fvs
{ "length": "8 beats", "hits": [0, 2, 4, 6], "transition": { "type": "iris", "dur": "1 beat" } }
```

```html
<video src="media/football.webm" data-clip-in="6" muted></video>
<h2 class="end" data-in="h2" data-fx="zoom">下一个就是你</h2>
<p class="mark">D · 图形完成转场</p>
```

```css
.end { position: absolute; left: 0; right: 0; bottom: 150px; margin: 0; text-align: center; font-size: 150px; font-weight: 600; letter-spacing: .06em; text-shadow: 0 6px 40px rgba(0,0,0,.6); }
```

```js
K('video', [[t0, { s: 1.15 }], [t1, { s: 1.04 }, 'out']]);
```
