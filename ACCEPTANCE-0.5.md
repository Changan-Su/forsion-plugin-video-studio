# Video Studio 0.5.0 验收 — 2026-10-01

## 本次交付

- **界面按 Genesis 重排**（规范：仓根 `DESIGN.md` §6「媒体创作工作台（舞台 + 时间线）」，本次新增）：一条工具栏；舞台、走带、时间线自上而下；场景只在时间线上呈现一次（片段带真实缩略图）；唯一实心主按钮是「导出」；全部取 Genesis token；属性 / AI 导演 / 导出在 Space 里走原生 Extend View，文件标签页与浮窗里是右侧面板；宽 / 中 / 窄 / Mini 按容器宽度切换。
- **剪辑**：导入图片、视频、音频（按钮或拖进时间线）；播放头处分割；两端修剪（左缘 = 入点）；拖动排序；复制、删除快捷键；转场；场景模板库；每条音轨一条轨道，可拖动起点。
- **格式与运行时**：场景 `in`、`transition`、运行时接管的 `<video>`（采集逐帧对齐、预览纠偏、原声由 ffmpeg 混音）、音轨 `in` / `dur` / `mute`；卡点与 cue 只计可见拍点；SKILL.md 0.2.0。

## 已验证

1. `npm run build && npm run check`：30 项测试（格式、媒体、真 Chromium + ffmpeg 的运行时测试、i18n），示例工程逐字节往返、472 帧渲染与 AAC 音轨与改动前一致（子代理对照）。
2. `npm run test:ui`：模板插入、分割、复制 / 删除、拖动排序、修剪入点、转场、导入图片、导入视频后预览帧对齐播放头（误差 < 0.06 s）、拖动配乐、弹层焦点、专注预览、缩放、中等与窄窗口、英文。
3. `node test/shots.mjs`：加载 Genesis 真 `base.css` + 配色 + 主题语言的亮暗、文件标签页、Space + Extend、窄窗英文截图，已人工查看。
4. 真模型：gpt-5.6-luna 只读新版 SKILL.md，在临时工程上完成交叉淡化、按入点分割、插入视频场景、修剪开头；`fvs check --runtime` 无错，静帧确认视频画面与转场中点两层叠加。
5. 真 Electron（自起 dev，持 devlock，CDP 9333）：`verify:dev`（亮暗、播放、专注、1180 / 780 px 下控件不越界）、`verify:space`（12 项：Space、原生工程列表、Extend 属性 / 工程选择 / 导演、Mini 与浮窗播放、切换工程前落盘、往返清理、工程字节不变）、`verify:features`（只渲染可见缩略图、原生 Chat Box 草稿与模型选择、导出面板）。
6. Codex（gpt-6-sol high）三包评审：17 条中 16 条已修，1 条不改（长度落盘写 `2 bars` 是格式语法，不属于界面文案）。

## 证据

- `artifacts/shots/`：Genesis token 台架截图。
- `artifacts/native/`、`artifacts/space/`、`artifacts/features/`：真 Electron 截图与结果。
- 截图与媒体不进 Git；`artifacts/` 已忽略。
