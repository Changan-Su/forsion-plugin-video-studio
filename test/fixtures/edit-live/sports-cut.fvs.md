# 热血

这是一个 Forsion Video Studio 工程文件。场景按顺序首尾相接地播放；每个场景的 `hits` 是从场景开头算起的拍点，画面的切点和配乐的重音都从这里读。用 Video Studio 打开可以直接改文字、拖时间线；也可以让 AI 按这份文件的写法继续写。

```fvs
{
  "fvs": 1,
  "title": "热血",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "tempo": { "bpm": 128, "beatsPerBar": 4 },
  "background": "#101010",
  "audio": []
}
```

```css
.fvs-stage { color: #f5f3ef; font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; --fvs-sweep: #ff3b16; }
.fvs-stage video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.fvs-scene .shade { position:absolute; inset:0; background:linear-gradient(90deg,rgba(5,7,12,.48),transparent 72%),linear-gradient(0deg,rgba(0,0,0,.38),transparent 48%); pointer-events:none; }
.fvs-scene .tag { position:absolute; left:112px; bottom:116px; margin:0; font-size:72px; line-height:1; font-weight:950; letter-spacing:.06em; color:#fff; text-shadow:0 5px 22px #000; }
.fvs-scene .title { position:absolute; left:108px; top:92px; margin:0; font-size:210px; line-height:1; font-weight:1000; letter-spacing:.04em; color:#fff; -webkit-text-stroke:3px rgba(255,61,19,.9); text-shadow:10px 12px 0 #e52e12,0 8px 32px #000; }
.fvs-scene .rule { position:absolute; left:110px; bottom:78px; width:560px; height:9px; background:#ff3b16; transform-origin:left; transform:scaleX(var(--d,0)); box-shadow:0 0 24px #ff3b16; }
.fvs-scene .closing { position:absolute; left:100px; right:90px; bottom:132px; margin:0; font-size:124px; font-weight:1000; line-height:1.08; letter-spacing:.02em; color:#fff; text-shadow:0 5px 25px #000,8px 8px 0 #f13b16; }
```

```html stage
<div data-fvs-scenes></div><div data-fvs-flash></div>
```

## hit · 滑板开场

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/skate-town.webm" data-clip-in="8.5" muted data-layout-allow-overflow></video><div class="shade"></div>
<h1 class="title" data-in="h0" data-fx="zoom" data-out="h3" data-fx-out="fade">热血</h1><i class="rule"></i>
```

```js
K('video', [[t0,{s:1.04,x:-18,br:1}],[hit(2),{s:1.13,x:18,br:1.22},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.18,x:25},'lin']]); K('.rule',[[hit(0),{'--d':0}],[hit(1),{'--d':1},'expo']]); flash(hit(2),.45)
```

## surf · 冲浪

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/surf.webm" data-clip-in="7" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="pop">破浪而上</div>
```

```js
K('video',[[t0,{s:1.08,x:-20,y:0,br:1}],[hit(2),{s:1.16,x:22,br:1.2},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:35},'lin']]); flash(hit(2),.34)
```

## dunk · 篮球

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/dunk.webm" data-clip-in="2" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="zoom">腾空一击</div>
```

```js
K('video',[[t0,{s:1.04,x:12,y:0,br:1}],[hit(2),{s:1.15,x:-12,y:-4,br:1.24},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.19,x:-25,y:-8},'lin']]); flash(hit(2),.42)
```

## skate · 街头滑板

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/skate-park.webm" data-clip-in="5" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="wipe">落地！</div>
```

```js
K('video',[[t0,{s:1.08,x:-22,y:0,br:1}],[hit(2),{s:1.17,x:20,y:0,br:1.22},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:30},'lin']]); flash(hit(2),.4)
```

## ride · 骑行

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/cycling.webm" data-clip-in="12" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="pop">全速冲刺</div>
```

```js
K('video',[[t0,{s:1.06,x:0,y:8,br:1}],[hit(2),{s:1.16,x:-22,y:-5,br:1.2},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:-32,y:-10},'lin']]); flash(hit(2),.36)
```

## kite · 风筝冲浪

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/kitesurf.webm" data-clip-in="9" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="up">迎风破浪</div>
```

```js
K('video',[[t0,{s:1.06,x:20,y:0,br:1}],[hit(2),{s:1.16,x:-15,y:12,br:1.2},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:-25,y:18},'lin']]); flash(hit(2),.36)
```

## field · 足球

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/football.webm" data-clip-in="6" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="zoom">直捣球门</div>
```

```js
K('video',[[t0,{s:1.06,x:0,y:0,br:1}],[hit(2),{s:1.17,x:18,y:-6,br:1.22},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:26,y:-8},'lin']]); flash(hit(2),.4)
```

## skate2 · 滑板腾跃

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/skate-town.webm" data-clip-in="15" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="pop">腾跃街头</div>
```

```js
K('video',[[t0,{s:1.08,x:16,y:0,br:1}],[hit(2),{s:1.18,x:-12,y:-3,br:1.23},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.22,x:-20,y:-6},'lin']]); flash(hit(2),.38)
```

## surf2 · 浪尖

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/surf.webm" data-clip-in="11" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="wipe">乘风而行</div>
```

```js
K('video',[[t0,{s:1.1,x:-20,y:0,br:1}],[hit(2),{s:1.18,x:20,y:0,br:1.2},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.22,x:32},'lin']]); flash(hit(2),.38)
```

## ride2 · 追风

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/cycling.webm" data-clip-in="18" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="pop">追风向前</div>
```

```js
K('video',[[t0,{s:1.06,x:0,y:-8,br:1}],[hit(2),{s:1.16,x:18,y:8,br:1.2},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.2,x:28,y:12},'lin']]); flash(hit(2),.36)
```

## kite2 · 腾空

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/kitesurf.webm" data-clip-in="16" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="zoom">冲破极限</div>
```

```js
K('video',[[t0,{s:1.07,x:-15,y:0,br:1}],[hit(2),{s:1.17,x:20,y:-8,br:1.22},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.21,x:28,y:-12},'lin']]); flash(hit(2),.4)
```

## surge · 终极冲刺

```fvs
{ "length": "4 beats", "hits": [0, 1, 2, 3] }
```

```html
<video src="media/skate-park.webm" data-clip-in="13" muted data-layout-allow-overflow></video><div class="tag" data-in="h1" data-fx="zoom">全力以赴</div>
```

```js
K('video',[[t0,{s:1.07,x:-15,y:0,br:1}],[hit(2),{s:1.17,x:18,y:-5,br:1.22},'step'],[hit(2)+.25,{br:1},'out'],[t1,{s:1.21,x:28,y:-9},'lin']]); flash(hit(2),.4)
```

## finale · 下一个就是你

```fvs
{ "length": "6 beats", "hits": [0, 1, 2, 3, 4, 5] }
```

```html
<video src="media/dunk.webm" data-clip-in="7" muted data-layout-allow-overflow></video><div class="shade"></div><h2 class="closing" data-in="h1" data-fx="zoom">下一个就是你</h2>
```

```js
K('video',[[t0,{s:1.05,x:0,y:0,br:1}],[hit(3),{s:1.15,x:-10,y:-6,br:1.2},'step'],[hit(3)+.25,{br:1},'out'],[t1,{s:1.19,x:-18,y:-10},'lin']]); flash(hit(1),.42)
```
