# Video Studio 0.4.0 验收 — 2026-09-30

## 本次交付

- 真实分镜缩略预览：使用主预览的工程编译器与隔离运行时，按可见范围加载；可悬停播放，遵守信任闸门和减少动态效果设置。场景筛选恢复后仍保持工程顺序。
- 原生 MP4 导出 Extend View：尺寸、帧率、画质、区间、配乐；导出冻结当前工程源码，CLI 写入真实状态与进度，可取消、失败重试和打开成品。临时帧、浏览器与编码文件随失败/取消清理；成功后才发布最终 MP4，不覆盖已有输出。
- 原生 AI 导演 Chat Box：模型和思考档位随提交进入会话，关闭面板保留草稿；记录任务前快照，按场景和工程公共层显示改动；任务结束可恢复，恢复前防止覆盖后来的修改。
- 独立插件仓库保存完整工程、源码、构建产物、安装/验收脚本，以及 [宿主接线](integration/README.md)。宿主的其他工作区改动未纳入此插件的提交。

## 已验证

1. `npm run build` / `npm run check`：12 项单元测试、注册契约、Space/Mini 与 20 场景 / 94.4 秒完整工程通过。
2. `npm run test:ui`：编辑、保存、撤销、场景搜索、时间线、播放、响应布局、中英与深浅色回归通过。
3. 真 Electron `verify:dev` 与 `verify:space`：原生 Space 工程列表、Extend 属性/项目/导演、Mini 与浮窗真实播放、同工程重开、待保存切换、生命周期清理，共 12 项 Space 检查，无页面异常；原工程字节保持不变。
4. `verify:render` 使用真实 Chromium 和 ffmpeg：720×540 / 24 fps / 9.6 秒区间（容器时长 9.625 秒）含音轨 MP4；真实帧/编码进度、中途取消、错误区间、已有成品保护全部通过。实际抽帧复核标题画面。
5. `verify:features -- --live` 操作临时工程：原生 Chat Box 的 `codex/gpt-5.6-luna` + `low` 实际进入两次 run 请求。导演修改 cards 标题，原生面板读到差异，并恢复任务前字节；导出面板发起的导演任务实际执行 CLI，生成 360×270 / 24 fps / 2.000 秒 / H.264 + AAC MP4，48/48 帧、187558 字节，重新打开面板读取 `done` / 100%。示例工程保持原样。
6. 点击成品入口后进入原生 Amadeus 媒体视图，实际 `amadeus-asset://v/` 视频读取时长 2 秒、readyState 4。
7. 宿主参数、Chat Box / 文档契约和媒体路径测试 113 项通过，桌面 TypeScript 检查通过；Tangu 真模型 live:harness 的 chat / tool 均通过（2/2）。

本次未验证新配乐创作或所有分辨率/编码器组合；配乐创作沿用已有导演与本机工具链。

## 证据与复跑

- `artifacts/features/live-results.json`、`export-job.json`、`native-export.mp4`：真实导演与导出证据。
- `artifacts/features/results.json`：最终无模型原生界面检查。
- `artifacts/render/results.json`、`verified-frame.png`：真实 CLI 导出与取消等结果。
- `artifacts/native/`、`artifacts/space/`：原生深浅、窄窗口、Extend、Mini 和浮窗截图。
- `artifacts/install-dev.json`：dev 安装与备份回执。截图与媒体证据不纳入源码 Git；保存在本地 artifacts 中。

真 Electron 脚本仅连接 dev 的 `localhost:5273` / CDP 9333，需先按根目录 GUI 指引取得 devlock。`--live` 会产生可见导演会话，使用临时工程进行修改与恢复，最后清理该临时 `.fvs.md`；导出成品和私有任务记录保留供检查。模型与工具命令通过宿主原有权限流程执行。
