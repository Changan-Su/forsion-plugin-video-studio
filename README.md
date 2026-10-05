# Forsion Video Studio

AI 辅助的网页动画视频编辑器。Forsion 2.12 的宣传片就是用这套工具做的，现在它是一个插件。

当前版本 **0.9.1**（更新记录见 [CHANGELOG.md](./CHANGELOG.md)），需要 Forsion 2.12.2 或更新的版本。最初从 [Forsion 的功能分支](https://github.com/Changan-Su/Forsion/tree/claude/sweet-babbage-k6qe0z/plugins/forsion-video-studio) 完整导入，源提交 `7d8573ed31783ec886f3e81604721ae8ca619a89`；初始导入提交为 `149f547`，后续在此仓库单独维护。源码、构建产物、Agent、技能、命令行、配乐工具，以及示例的图片与 MP3 均随仓库保存。

工作台按 Genesis 设计语言排布（规范见仓根 `DESIGN.md`「媒体创作工作台」一节）：顶部一条工具栏（片名、保存状态、撤销重做、AI 导演、导出），中间是按工程比例居中的舞台和走带，时间线在下方。场景只在时间线上出现一次，片段直接显示缩略图。在视频工作室 Space 里，界面全部用原生面板：没打开工程时左栏是导航、主区是启动台（照 Coding Studio），打开工程后左栏换成素材区，时间线在底部面板（只横跨素材区和编辑器），右栏从上到下是属性和「对话」两个标签，导出用右侧的 Extend View（没有 `ctx.tangu.mountChat` 的 Forsion 上，AI 导演也是 Extend View）；在文件标签页、浮窗和不支持底部面板的旧版 Forsion 里，时间线画在编辑器下方，属性等是盖在右侧的面板。窄窗口时属性栏变成浮层、按钮收成图标。

一段视频就是一份 `.fvs.md` 工程文件：每个场景是一页网页（HTML + CSS，加一点关键帧脚本），场景首尾相接地排在时间线上，时间线踩在音乐的拍子上。每个场景写着自己的**拍点**，画面在拍点上切，配乐也在拍点上给重音。

- **时间线**：片段显示同一渲染器生成的真实缩略图（只渲染看得见的片段，遵守脚本信任）；场景轨下面是「元素」轨，写了出现时间的元素（`data-in` / `data-out`、`data-seq` 与 `data-each` 的每一项）各是一个小块，画的是它真正在画面上的时段（与播放一致），点一下选中、双击改出现时间；每条音轨一条轨道并画出波形，可拖动改起点；吸附、高度可调。缩放以指针处为锚点（⌘ / Ctrl / Alt + 滚轮，或触控板双指捏合），`=` / `-` 缩放，⇧Z 适应整片，滑块从全片一直放大到逐帧。
- **手动编辑**：实时预览、播放；双击画面里的文字直接改；属性面板改场景设置（长度可选小节、拍、秒）、全部文字、代码和工程设置。撤销、重做、自动保存。
- **剪辑**：导入图片、视频、音频（按钮或拖进时间线）；在播放头处分割（S / ⌘B）；拖左边缘修剪入点、拖右边缘改长度，相邻场景让位、后面的切点不动，按住 Alt 推移后面全部；拖动片段调整顺序；⌘D 复制、Delete 删除。视频由运行时接管，预览、网页导出和 MP4 逐帧对齐并混入原声。
- **字幕轨**：时间线最上面一条字幕轨，双击添加、拖动移动、拖两端修剪；属性面板「字幕」页逐条改时间和文字、设置位置和大小。字幕是工程文件开头的一个 SRT 块（整片时间），可导入 / 导出 `.srt`，预览和网页导出都显示，MP4 默认烧录。
- **转场与模板**：八种转场（交叉淡化、经背景色、滑入、推入、擦除、缩放、模糊等）；「新场景」提供十个声明式模板，用当前工程的样式实时预览，横屏竖屏都能用。
- **交给 AI**：在视频工作室 Space 里，和内置的 **Video Studio 导演** Agent 的对话就在右栏（Forsion 自己的对话，一个工程文件夹一条会话，工作目录是工程文件夹）。在时间线上选中场景、拍点、字幕或元素，点「引用到对话」或右键，把它指给 AI 看；让它生成的图片落在工程的 `generated/` 里，素材区随即列出。它直接改这份文件，编辑器自动载入改动。「AI 导演」按钮是一个菜单：打开对话，以及六件可以交给导演的事（写一个新场景、节奏再紧一点、润色全部文案、为这个视频配乐、检查并修正卡点、看一遍成片提意见）；选一项只把请求写进输入框并提示你，回车才发出。空的配乐轨和属性的工程页里另有「让导演配乐」。文字面板里每一行都有「AI 改写」。没有 `ctx.tangu.mountChat` 的 Forsion、文件标签页和浮窗里，「AI 导演」照旧打开原生 Chat Box 面板（六件事在面板的「常用任务」里，直接交给它），显示任务前后的改动，可以恢复。
- **卡点检查**：编辑器分析配乐的重音，时间线上的拍点绿色表示落在重音上，黄色表示没有，空心表示切到安静处；「卡点检查」弹层列出偏离的拍点，可以交给 AI 修正。
- **导出**：「导出网页视频」立刻写出一个单文件 `.html`（图片和配乐内嵌，视频按相对路径引用）；「导出 MP4」打开导出面板，选择尺寸、帧率、画质、区间和声音，再由导演 Agent 在本机渲染。面板从 CLI 状态文件读取真实进度，支持取消、失败重试和预览成品。任务保存启动时的工程快照；导出过程中继续编辑不会改变这一份渲染。成功后才发布 MP4，失败不会覆盖已有成品。
- **工程文件 AI 读得懂**：它就是 Markdown，里面是 JSON、HTML、CSS、JS 代码块。格式和场景 API 写在内置技能 `forsion-video-studio` 里。

## 原生工作室 Space

插件自带 `spaces/forsion-video-studio/space.json`，在 Forsion 的「更多」里打开「视频工作室」。主区编辑器和左栏导航是固定 View（配方里的 `"pinned": true`）：打开工程后素材区作为左栏的第二个标签出现，导航的标签一直在。

- **启动布局**：左栏是导航（新建视频、我的工程、第 2.12 话示例），主区是启动台，底部收起。「我的工程」列出全部工程（片名、路径、画幅、时长），可搜索；「新建视频」一页写想法（可选）、选画幅、起名字，工程建在 `<工作文件夹>/<名字>/` 里。写了想法的，创建后想法填进 AI 导演等你发送。
- **项目布局**：打开工程后左栏原地换成素材区（工程文件夹里 `media/`、`audio/`、`assets/`、`generated/` 的缩略图，用到的标「已用」，AI 生成的带标记，可筛选；导入只复制不放进时间线，拖到时间线落在切点，双击加到播放头所在场景之后），底部开出时间线。「更多 → 关闭工程」回到启动布局。工程之间切换不动底部面板。

主区域是 Video Studio；片名可以打开 Extend View 工程选择器，原生 Extend View 属性面板随工程默认打开（不抢键盘焦点；导出或工程选择器临时占用右侧，关掉后它自动回来）。它跟着你选中的东西走：在时间线上点场景、元素、拍点、字幕，或在画面里点文字、图片，它就翻到前面；时间线左边的轨道名也是入口（字幕 → 字幕页，场景 / 元素 → 场景页，配乐 → 工程页里那条音轨的设置）。只有走带右侧的属性按钮能把它关住（关掉后点什么都不再弹出，再点一次打开；属性被对话挡在后面时，这个按钮先把它翻到前面；右栏没有对话的 Forsion 上，面板的 × 和 Esc 也算关住）；恢复默认布局、右栏收起再展开、去别的 Space 再回来，它都会自己回来，右栏被你收起时则不会被点开。支持 `ctx.tangu.mountChat` 的 Forsion 上，右栏另有一个「对话」标签：宿主自己的对话挂在插件的视图里，跟着最新停靠的工程走，换工程就换到那个工程文件夹的会话。更早的 Forsion 上，「AI 导演」在 Extend View 中挂载原生 Chat Box，复用模型和思考档位选择；导演接收实际选择的参数、场景与播放位置，每次任务记录修改前快照，面板显示场景变化，任务结束后可恢复；恢复前会检查工程是否又有新改动。关闭、切换 Space 或工程时，这些面板随主视图清理。

主工作台的「更多」菜单可以打开原生浮窗或 Mini。Mini 采用独立预览视图，保留播放、静音和场景切换，点击「完整工作台」把同一工程带回主面板。浮窗缺少 Extend View 时使用内联属性，工程选择使用内联列表；主面板的工程路径通过宿主实体参数保存。原来的 `.fvs.md` 文件标签页和笔记嵌入照常可用，文件标签页增加工作室入口。切换工程前先完成待保存写入。

默认文件名 `新视频` 和示例目录 `第 2.12 话` 固定，界面文字随语言变化，避免切语言后出现两份示例目录。

## 开始

1. 命令面板「Video Studio：打开示例 · 第 2.12 话」：打开 2.12 宣传片的工程（94 秒，20 个场景），配乐会自动下载。
2. 文件树右键「新建视频工程」、命令面板「Video Studio：新建视频工程」，或在笔记里输入 `/` 选「新建视频工程」（会把视频嵌进笔记）。
3. 第一次打开别人给的工程时，编辑器会先问你是否运行它的脚本。预览跑在隔离的 iframe 里，碰不到你的笔记库和账号，但只打开你信任的工程。

导出 MP4 和配乐在你的电脑上运行，需要：

- **MP4**：Node 18+、Chrome 或 Edge（或 `npx playwright install chromium`）、`playwright-core`（例如在智库的 `Forsion Video Studio/.fvs-tools/` 目录运行 `npm i playwright-core`）、ffmpeg。
- **配乐**：Python 3 和 `tools/music/requirements.txt` 里的包，外加 VSCO 2 CE 管弦乐采样（CC0，`python3 tools/music/fetch_samples.py` 下载）。

缺什么，导演 Agent 会先装好或者告诉你。

## 工程文件

````markdown
# 片名（随便写的说明文字，渲染时忽略）

```fvs
{ "fvs": 1, "title": "…", "width": 1920, "height": 1080, "fps": 30,
  "tempo": { "bpm": 120, "beatsPerBar": 4 }, "audio": [{ "src": "audio/score.mp3" }] }
```

```css
/* 全局样式 */
```

```srt
1
00:00:01,000 --> 00:00:03,500
字幕轨（可选）：标准 SubRip，整片时间
```

## cards · 标题卡

```fvs
{ "length": "2 bars", "hits": [0, 2, 4, 6] }
```

```html
<div data-seq="h0">            <!-- 子元素依次在第 0、1、2、3 个拍点出现 -->
  <div class="card">人格</div><div class="card">记忆</div><div class="card">技能</div><div class="card">工具</div>
</div>
```

```js
flash(hits[0], .6)            // 可选：关键帧脚本
```
````

完整说明见 [`skills/forsion-video-studio/SKILL.md`](skills/forsion-video-studio/SKILL.md)，完整示例见 [`examples/episode-2.12/episode-2.12.fvs.md`](examples/episode-2.12/episode-2.12.fvs.md)。

## 命令行

`tools/fvs.mjs` 是单个文件，不用安装：

```sh
node tools/fvs.mjs new my-video.fvs.md          # 从 EVA 标题卡模板开始
node tools/fvs.mjs info my-video.fvs.md         # 场景、时间、拍点
node tools/fvs.mjs check my-video.fvs.md --runtime
node tools/fvs.mjs sheet my-video.fvs.md        # 每个场景一帧的缩略图
node tools/fvs.mjs render my-video.fvs.md --out my-video.mp4
node tools/fvs.mjs sync my-video.fvs.md         # 拍点有没有落在配乐的重音上
node tools/fvs.mjs html my-video.fvs.md         # 单文件网页视频
node tools/fvs.mjs captions my-video.fvs.md --out my-video.srt   # 字幕轨导出为 SRT
```

## 包里有什么

```
forsion-video-studio/
├── manifest.json · main.js · icon.png      桌面插件：.fvs.md 编辑器、新建入口、笔记嵌入
├── spaces/forsion-video-studio/space.json   原生 Space：导航 / 素材区、主工作台、底部时间线和 Mini 配方
├── runtime/fvs-runtime.js                  播放运行时：预览、网页导出和渲染都用它
├── tools/fvs.mjs                           命令行
├── tools/music/                            配乐工具包（Python）
├── skills/forsion-video-studio/SKILL.md    全局技能：格式、场景 API、工作流程
├── agents/fvs-director/                    Video Studio 导演 Agent
├── examples/episode-2.12/                  示例：第 2.12 话
├── src/                                    源码（main.js、runtime、tools/fvs.mjs 由它构建）
└── test/ · check.mjs
```

## 开发

```sh
npm ci && npm run build           # src/ → main.js、runtime/fvs-runtime.js、tools/fvs.mjs
npm run check                    # 宿主契约、单元测试和完整示例 CLI 检查
npx playwright-core install chromium  # 首次运行界面测试时安装浏览器
npm run test:ui                  # Chromium：编辑、撤销、导出、分割/修剪/排序/转场/导入、窄窗口和英文
node test/i18n.test.mjs          # 界面文案中英成对、英文不含汉字
node test/shots.mjs              # 加载 Genesis 真实 token 的亮暗 / Space / 窄窗截图（人工看）
npm run install:dev              # 构建和自检后完整安装到 ~/.forsion-dev/plugins/
npm run verify:dev               # 原生主题、播放、窄窗口和工程完整性
npm run verify:space             # 真 Space / Extend / Mini / Floating / 待保存切换和生命周期
npm run verify:render            # 真实 Chromium + ffmpeg：配乐、取消、错误区间、成品保护
npm run verify:features          # 真缩略图、原生 Chat Box 草稿与模型选择、Extend 导出设置
npm run verify:features -- --live # 临时工程的真模型修改、差异/恢复，以及由导演执行的 MP4 导出
npm run verify:chat               # 隔离的真 Electron：右栏对话、会话接回、引用到对话（需要带 ctx.tangu.mountChat 的宿主）
npm run verify:skill              # 真引擎 + 真模型：导演按引用只改一处、时间写在元素上、配图落进 generated/
```

`install:dev` 只安装到开发版，并将已有插件原样备份至 `~/.forsion-dev/plugin-backups/`。安装回执位于 `artifacts/install-dev.json`；备份目录与正在扫描的插件目录分离。运行中的 dev 可以重载插件；已打开的工程标签需关闭重开，或重载 dev 窗口。示例工程和已有智库内容不被覆盖。

`npm run verify:docked` 用 Genesis 自带的隔离台架（`desktop/scripts/lib/uiux-electron.cjs`：桩引擎、临时 home 和笔记库，不碰你的 dev，也不杀进程）启动构建好的 `out/`，把本插件装进临时目录，验证启动布局与项目布局来回跳转（新建页、关闭工程、切换工程后 ⌘J 仍作数）、素材区的双击与拖放、Space 里的时间线停在原生底部面板、快捷键和缩放、⌘J 收起与展开后画面照常显示、重载后布局还在；截图写入 `artifacts/docked/`。需要支持 `ctx.viewLocations` 和 `ctx.replaceView` 的宿主：先在该检出的 `desktop/` 跑 `npx electron-vite build`，再用 `FVS_DESKTOP_ROOT` 指过去。

真 Electron 验证前按 Forsion 根目录 GUI 指引持有 devlock，再启动桌面 dev：`npm run dev -- -- --remote-debugging-port=9333`。验证脚本只连接 `localhost:5273` 的 dev 渲染页，执行播放、导航与面板操作，暂时切换原生主题并恢复，检查工程字节没有变化；不会调用真实模型。主题与布局证据写入 `artifacts/native/`，Space / Extend / Mini / Floating 证据写入 `artifacts/space/`。`verify:space` 会在示例目录中创建一份临时工程来检查立即切换前的保存，结束后清理；原工程保持不变。其他桌面 checkout 可通过 `FVS_DESKTOP_ROOT` 指定其 `desktop/` 路径。

提交改动时同时保留 `npm run build` 生成的 `main.js`、`runtime/fvs-runtime.js`、`tools/fvs.mjs`。安装版只需要现成构建产物，不需要 `node_modules`。MP4 渲染和 AI 配乐由导演 Agent 使用本机工具执行。`verify:features -- --live` 会调用模型并产生两条可见导演会话，只操作临时工程；原始示例保持不变。它验证工程修改与 MP4 导出，不代表新曲创作已验收。

模型和思考档位传递依赖宿主公开的 `ctx.tangu.chatSelection` / `startChat({ modelId, thinkingLevel })` 契约；旧宿主降级为普通提示输入。当前 dev 已同步这项宿主能力。缩略图与导出状态仍由插件自身管理，没有引入另一套 React 或独立执行服务。详细验收见 [ACCEPTANCE-0.7.md](ACCEPTANCE-0.7.md)（之前：[0.6](ACCEPTANCE-0.6.md)、[0.5](ACCEPTANCE-0.5.md)、[0.4](ACCEPTANCE-0.4.md)）。

---

## English

An AI-assisted editor for videos made of animated web pages; the Forsion 2.12 promo was made with it. A video
is one `.fvs.md` project file: scenes are web pages, they play back to back on a timeline that sits on the
music's beat grid, and each scene lists its **hits** — the picture cuts on them and the score accents them.

Edit by hand (live preview, double-click text in the picture, panels for scene settings, text, code and project),
cut like a clip editor (import pictures, video and sound, split at the playhead, trim either end, reorder by dragging,
crossfades and other transitions, ten scene templates, a captions track with SRT import and export, and a timeline
that zooms around the pointer and, in the Video Studio Space, sits in the native bottom panel; elements that carry
their own timing show up on an Elements lane under the scenes), hand work to the bundled **Video Studio Director** agent
(write scenes, score, check sync, render MP4; on a Forsion with `ctx.tangu.mountChat` the conversation sits in the right
side next to Properties, works in the project folder, and anything selected on the timeline can be quoted into it), and
export a single-file web video or an MP4. The format and
the scene API are documented in the bundled skill; `examples/episode-2.12` is a complete project.
