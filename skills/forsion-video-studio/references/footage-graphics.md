# Footage and graphics as one picture

Read from the Video Studio skill's step 5b when a shot's content suits one of these. Each is a choice for that shot,
not a quota for the film.

Four ways, each for a shot whose content suits it:
- **A · the shot inside a shape.** The clip plays inside the letters of a word (or a circle, a bar) and the shape
  opens until the shot is the frame: a black layer with white words over the clip, `mix-blend-mode: multiply`, and
  a `K` scale on that layer to ×60 with its `transform-origin` inside the thickest stroke (find it on `fvs still`).
- **B · graphics on what is in the shot.** A ring and a label that stay on the surfer, a line along the wave
  crest or the road, a number counting up next to the runner. Find the thing on `fvs frames <clip> --grid`, then
  `fvs track <clip> --at <its data-clip-in> --point <x%,y%> [--frame <width>x<height>]` prints the keyframes to
  paste and a sheet with the positions ringed: view it, and cut the path where it says *lost*. Put the clip and
  the graphics in one `.cam` wrapper so a camera move carries both.
- **C · a layout.** Two to four panels, each a positioned box with its clip inside (the project's video rule
  fills the panel), rising in or reframing on hits, words in the gaps; on a later hit one panel opens to the whole
  frame. Drive each panel's box with custom properties.
- **D · a graphic transition.** `"transition": "sweep"` (a band of the film's colour crosses and the cut happens
  under it) or `"iris"`, on a hit, at most two or three in a film.

```html
<!-- A: the shot inside the word (css: .knock { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #000; mix-blend-mode: multiply; transform-origin: 1244px 356px } .knock b { color: #fff; font-size: 640px; font-weight: 600 }) -->
<video src="media/a.webm" data-clip-in="12"></video><div class="knock" data-layout-ignore><b>热血</b></div>
<!-- B: a ring and a reading on the surfer (css: .cam { position: absolute; inset: 0 } .pin { position: absolute; left: 0; top: 0 } children placed around 0,0) -->
<div class="cam"><video src="media/surf.webm" data-clip-in="8"></video><div class="pin"><i class="ring" data-in="h1" data-fx="pop"></i><b class="read" data-in="h2" data-fx="wipe"><span class="n">0</span> km/h</b></div></div>
<!-- C: panels (css: .p { position: absolute; overflow: hidden; left: calc(var(--l) * 1px); top: calc(var(--t) * 1px); width: calc(var(--w) * 1px); height: calc(var(--h) * 1px) }) -->
<div class="p p1"><video src="media/b.webm" data-clip-in="9" data-layout-ignore></video></div><div class="p p2"><video src="media/c.webm" data-clip-in="3" data-layout-ignore></video></div>
```

```js
K('.knock', [[t0, { s: 1, o: 1 }], [hit(2), { s: 1 }], [hit(2) + .4, { s: 3 }, 'in'], [hit(2) + .6, { o: 1 }], [hit(2) + .85, { s: 60, o: 0 }, 'in']]); // A
const path = [[0, 912, 564], [0.25, 960, 532] /* … pasted from fvs track */];                                         // B
K('.pin', path.map(([d, x, y], i) => [t0 + d, { x, y }, i ? 'lin' : undefined]));
const n = $('.n'); H(t => { n.textContent = Math.round(31 * prog(t, hit(2), hit(4), 'out')); });
const col = i => ({ '--l': 64 + i * 605, '--t': 200, '--w': 581, '--h': 600 });                                      // C
K('.p1', [[t0, { ...col(0), '--t': 1100 }], [hit(0), {}], [hit(0) + .45, { '--t': 200 }, 'expo']]);
K('.p2', [[t0, { ...col(1), '--t': 1100 }], [hit(1), {}], [hit(1) + .45, { '--t': 200 }, 'expo'], [hit(3), {}], [hit(3) + .5, { '--l': 0, '--t': 0, '--w': 1920, '--h': 1080 }, 'expo']]);
```

Mark what leaves the frame bare on purpose with `data-layout-ignore` (the panels' clips, the black layer of A):
`review` then reads it as a choice, not footage that fails to fill the frame.
