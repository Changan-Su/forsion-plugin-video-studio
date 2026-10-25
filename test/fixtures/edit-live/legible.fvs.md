# 一天

```fvs
{
  "fvs": 1,
  "title": "一天",
  "width": 1280,
  "height": 720,
  "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 },
  "background": "#000",
  "fonts": ["https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap"],
  "audio": []
}
```

```css
.fvs-stage { font-family: 'Noto Sans SC', sans-serif; }
.fvs-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fvs-stage .cap { position: absolute; left: 80px; right: 80px; bottom: 70px; margin: 0; font-size: 34px; color: #f4f1ea; text-align: center; }
.fvs-stage .place { position: absolute; left: 0; right: 0; bottom: 56px; height: 96px; background: #c8102e; }
.fvs-stage .place b { position: absolute; right: 80px; top: 26px; font-size: 30px; color: #fff; }
```

## station · 车站

```fvs
{ "length": "4s", "hits": [0] }
```

```html
<video src="media/aveiro-station.webm" data-clip-in="8" muted></video>
<p class="cap" data-in="h0">清晨的车站，墙上的瓷砖讲着老故事</p>
```

## plaza · 广场

```fvs
{ "length": "4s", "hits": [0] }
```

```html
<video src="media/mexico-zocalo.webm" muted></video>
<p class="cap" data-in="h0">午后的广场，旗帜在风里</p>
<div class="place" data-in="h0"><b>墨西哥城</b></div>
```

## train · 列车

```fvs
{ "length": "4s", "hits": [0] }
```

```html
<video src="media/haifa-train.webm" data-clip-in="10" muted></video>
<p class="cap" data-in="h0">列车进站，城市开始忙碌</p>
```
