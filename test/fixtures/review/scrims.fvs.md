# Review scrims

For scripts/verify-review.mjs, apart from defects.fvs.md (HyperFrames measures contrast at five of the moments it is
given, so more scenes there would move them): a bare shot under the title's dark scrim, copied there with no words
to hold up (reported as scrim_without_text), with a thin dark rule across it (not a scrim); then the same scrim
behind a title, which is what a scrim is for (not reported), and behind a title typed in after the middle of its
scene, empty when the scene is looked at (not reported: the words are in the source). Two scrims made other ways
are reported: a black fill at 60 % opacity, and a gradient on a wrapper's ::after.

```fvs
{
  "fvs": 1,
  "title": "Review scrims",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "background": "#101010",
  "audio": []
}
```

```css
.fvs-stage { color: #f5f3ef; font-family: system-ui, sans-serif; }
.fvs-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fvs-stage .shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.62), transparent 58%); }
.fvs-stage .rule { position: absolute; left: 0; top: 540px; width: 100%; height: 6px; background: linear-gradient(90deg, #000, transparent); }
.fvs-stage .title { position: absolute; left: 160px; bottom: 120px; font-size: 96px; color: #fff; }
.fvs-stage .dim { position: absolute; inset: 0; background: #000; opacity: .6; }
.fvs-stage .frame { position: absolute; inset: 0; }
.fvs-stage .frame::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent, rgba(0,0,0,.65)); }
```

## bare · 空镜

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<video src="media/clip.webm"></video>
<div class="shade"></div>
<div class="rule"></div>
```

## titled · 片名

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<video src="media/clip.webm"></video>
<div class="shade"></div>
<div class="title" data-in="h0">A title over the shot</div>
```

## typed · 打字

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<video src="media/clip.webm"></video>
<div class="shade"></div>
<div class="title" data-in="1.5s" data-fx="type">Typed in late</div>
```

## dimmed · 压暗

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<video src="media/clip.webm"></video>
<div class="dim"></div>
```

## pseudo · 伪元素

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<div class="frame"><video src="media/clip.webm"></video></div>
```
