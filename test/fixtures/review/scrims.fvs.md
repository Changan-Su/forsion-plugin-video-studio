# Review scrims

For scripts/verify-review.mjs, apart from defects.fvs.md (HyperFrames measures contrast at five of the moments it is
given, so more scenes there would move them): a bare shot under the title's dark scrim, copied there with no words
to hold up (reported as scrim_without_text), with a thin dark rule across it (not a scrim); then the same scrim
behind a title, which is what a scrim is for (not reported).

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
