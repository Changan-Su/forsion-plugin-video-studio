# Review defects

Three mistakes a written scene makes, for scripts/verify-review.mjs: a headline too long for its line runs into the
line under it, that line is dark grey on the dark stage, and a panel drawn later covers it. A second scene puts a
caption over a video clip, which has to be looked at with the clip on screen. A third leaves its clip at a
quarter of the frame in a corner, which HyperFrames does not look for and `fvs review` has to. A fourth places its
clip on the whole frame from inside a zero-height `overflow: hidden` wrapper that is not positioned: the wrapper does
not clip it, so it fills the frame and must not be reported.

```fvs
{
  "fvs": 1,
  "title": "Review defects",
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
.fvs-stage h1 { position: absolute; left: 160px; top: 380px; margin: 0; font-size: 150px; font-weight: 700; }
.fvs-stage p { position: absolute; left: 164px; top: 600px; margin: 0; font-size: 48px; color: #222; }
.fvs-stage .panel { position: absolute; left: 150px; top: 560px; width: 900px; height: 200px; background: #101010; }
.fvs-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fvs-stage video.thumb { inset: auto; left: 0; top: 0; width: 854px; height: 480px; }
.fvs-stage .pin { overflow: hidden; height: 0; }
.fvs-stage .caption { position: absolute; left: 160px; bottom: 120px; font-size: 64px; color: #fff; }
```

## intro · 开场

```fvs
{ "length": "2 bars", "hits": [0, 2] }
```

```html
<h1 data-in="h0" data-fx="up">A headline the writer made far too long for one line</h1>
<p data-in="h1" data-fx="fade">A subtitle nobody can read</p>
<div class="panel" data-in="h1"></div>
```

## clip · 素材

```fvs
{ "length": "3s", "hits": [0] }
```

```html
<video src="media/clip.webm"></video>
<div class="caption" data-in="h0">A caption over the footage</div>
```

## corner · 角落

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<video class="thumb" src="media/clip.webm"></video>
```

## pinned · 穿出

```fvs
{ "length": "2s", "hits": [0] }
```

```html
<div class="pin"><video src="media/clip.webm"></video></div>
```
