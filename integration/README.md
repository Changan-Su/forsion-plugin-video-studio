# 宿主接线

0.4.0 插件源码与构建产物独立保存。当前 dev 的 Genesis 宿主同步了下面两项公开能力：

- `ctx.tangu.chatSelection === true`：`startChat` 接收原生 Chat Box 的 `modelId` / `thinkingLevel`，校验后覆盖 Agent 默认；已有所有权、目录与活性规则继续生效。
- `ctx.app.openFile` 的音视频分派：复用既有 `isMediaPath` 与 `openMedia`，MP4 成品进入原生 Amadeus 媒体视图。

`forsion-native-chat-selection.patch` 只包含此任务的宿主改动及参数测试，不包括同一 checkout 的其他未提交功能。以 Genesis `2bf3c443` 的开发 checkout 为参照；应用前先检查宿主是否已有同等能力。当前宿主已应用，勿重复应用。

```sh
# 在目标 Genesis 仓库中检查后应用（已有同等实现时跳过）
git apply --check /path/to/forsion-video-studio/integration/forsion-native-chat-selection.patch
git apply /path/to/forsion-video-studio/integration/forsion-native-chat-selection.patch
```

无此接线的旧宿主仍可编辑、预览和导出工程；导演输入使用普通提示适配，不显示无法传递参数的模型选择器。
