/* Forsion Video Studio 0.10.1 — built from src/ by build.mjs; edit the sources, not this file. */
(() => {
  // src/ui/i18n.js
  var ZH = {
    "export-intro": "\u7531 AI \u5BFC\u6F14\u5728\u672C\u673A\u6E32\u67D3\u3002\u79BB\u5F00\u9762\u677F\u4E5F\u4F1A\u7EE7\u7EED\uFF0C\u56DE\u6765\u53EF\u4EE5\u770B\u8FDB\u5EA6\u3002",
    "export-original": "\u5DE5\u7A0B\u539F\u5C3A\u5BF8",
    "export-size": "\u8F93\u51FA\u5C3A\u5BF8",
    "export-quality": "\u753B\u8D28\u4E0E\u4F53\u79EF",
    "export-quality-high": "\u9AD8\u753B\u8D28",
    "export-quality-balanced": "\u5747\u8861",
    "export-quality-small": "\u8F83\u5C0F\u6587\u4EF6",
    "export-from": "\u5F00\u59CB\uFF08\u79D2\uFF09",
    "export-to": "\u7ED3\u675F\uFF08\u79D2\uFF09",
    "export-audio": "\u5305\u542B\u914D\u4E50",
    "export-selected": "\u4EC5\u5BFC\u51FA\u9009\u4E2D\u573A\u666F",
    "export-start": "\u5F00\u59CB\u5BFC\u51FA",
    "export-progress": "\u5BFC\u51FA\u8FDB\u5EA6",
    "export-cancel": "\u53D6\u6D88\u5BFC\u51FA",
    "export-retry": "\u91CD\u65B0\u5BFC\u51FA",
    "export-preview": "\u9884\u89C8\u6210\u54C1",
    "export-save-first": "\u5DE5\u7A0B\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5148\u5B8C\u6210\u4FDD\u5B58\u3002",
    "export-invalid": "\u8BF7\u5148\u8FD0\u884C\u53EF\u4FE1\u5DE5\u7A0B\u9884\u89C8\uFF0C\u5E76\u4FEE\u590D\u5DE5\u7A0B\u9519\u8BEF\u3002",
    "export-host-only": "MP4 \u5BFC\u51FA\u9700\u8981\u5728\u672C\u673A\u667A\u5E93\u4E2D\u8FD0\u884C\u3002",
    "export-range-invalid": "\u8BF7\u8BBE\u7F6E\u5DE5\u7A0B\u8303\u56F4\u5185\u7684\u6709\u6548\u5BFC\u51FA\u533A\u95F4\u3002",
    "export-agent-ended": "\u5BFC\u6F14\u4EFB\u52A1\u5DF2\u7ED3\u675F\uFF0C\u4F46\u6E32\u67D3\u5C1A\u672A\u5F00\u59CB\u3002\u8BF7\u68C0\u67E5\u4F1A\u8BDD\u540E\u91CD\u8BD5\u3002",
    "export-status-queued": "\u7B49\u5F85\u5BFC\u6F14\u5F00\u59CB\u6E32\u67D3",
    "export-status-preparing": "\u68C0\u67E5\u8FD0\u884C\u73AF\u5883",
    "export-status-frames": "\u6E32\u67D3\u753B\u9762",
    "export-status-encoding": "\u7F16\u7801\u89C6\u9891\u4E0E\u914D\u4E50",
    "export-status-done": "\u5BFC\u51FA\u5B8C\u6210",
    "export-status-failed": "\u5BFC\u51FA\u5931\u8D25",
    "export-status-cancelled": "\u5BFC\u51FA\u5DF2\u53D6\u6D88",
    "director-intro": "\u5411\u5BFC\u6F14\u63CF\u8FF0\u4FEE\u6539\u76EE\u6807\uFF1B\u9009\u4E2D\u573A\u666F\u4E0E\u64AD\u653E\u4F4D\u7F6E\u4F1A\u4E00\u5E76\u53D1\u9001\u3002",
    "director-waiting": "\u7B49\u5F85\u5BFC\u6F14\u5F00\u59CB",
    "director-idle": "\u5BFC\u6F14\u5F53\u524D\u672A\u8FD0\u884C",
    "director-thinking": "\u5BFC\u6F14\u6B63\u5728\u601D\u8003",
    "director-speaking": "\u5BFC\u6F14\u6B63\u5728\u56DE\u590D",
    "director-tool": "\u5BFC\u6F14\u6B63\u5728\u5904\u7406\u5DE5\u7A0B",
    "director-done": "\u5BFC\u6F14\u4EFB\u52A1\u5DF2\u5B8C\u6210",
    "director-error": "\u5BFC\u6F14\u4EFB\u52A1\u51FA\u73B0\u9519\u8BEF",
    "director-changes": "\u5DE5\u7A0B\u6539\u52A8\uFF08{n}\uFF09",
    "director-added": "\u65B0\u589E",
    "director-removed": "\u79FB\u9664",
    "director-changed": "\u4FEE\u6539",
    "director-restore": "\u6062\u590D\u5230\u8FD9\u6B21\u4EFB\u52A1\u4E4B\u524D",
    "director-stale": "\u5DE5\u7A0B\u6709\u65B0\u7684\u4FEE\u6539\uFF0C\u8BF7\u5237\u65B0\u540E\u518D\u67E5\u770B\u548C\u6062\u590D\u3002",
    "director-no-snapshot": "\u627E\u4E0D\u5230\u8FD9\u6B21\u4EFB\u52A1\u7684\u5DE5\u7A0B\u5FEB\u7167\u3002",
    "app": "Video Studio",
    "projects": "\u89C6\u9891\u5DE5\u7A0B",
    "project-search": "\u641C\u7D22\u5DE5\u7A0B\u2026",
    "choose-project": "\u5207\u6362\u89C6\u9891\u5DE5\u7A0B",
    "workspace-welcome": "\u89C6\u9891\u5DE5\u4F5C\u5BA4",
    "workspace-intro": "\u6253\u5F00\u5DE5\u7A0B\uFF0C\u526A\u8F91\u573A\u666F\u3001\u6587\u5B57\u4E0E\u97F3\u4E50\u3002",
    "projects-empty": "\u8FD8\u6CA1\u6709\u89C6\u9891\u5DE5\u7A0B\u3002\u65B0\u5EFA\u4E00\u4E2A\u5F00\u59CB\u3002",
    "refresh-projects": "\u5237\u65B0\u5DE5\u7A0B",
    "open-workspace": "\u6253\u5F00\u89C6\u9891\u5DE5\u4F5C\u5BA4",
    "show-in-main": "\u5B8C\u6574\u5DE5\u4F5C\u53F0",
    "mini-preview": "Mini \u89C6\u9891\u9884\u89C8",
    "floating-workspace": "\u72EC\u7ACB\u7A97\u53E3",
    "loading": "\u6B63\u5728\u6253\u5F00\u5DE5\u7A0B\u2026",
    "cannot-read": "\u8BFB\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\uFF1A{path}",
    "no-vault": "\u5148\u6253\u5F00\u4E00\u4E2A\u667A\u5E93\uFF0C\u518D\u6253\u5F00\u89C6\u9891\u5DE5\u7A0B\u3002",
    "play": "\u64AD\u653E",
    "pause": "\u6682\u505C",
    "undo": "\u64A4\u9500",
    "redo": "\u91CD\u505A",
    "saved": "\u5DF2\u4FDD\u5B58",
    "saving": "\u4FDD\u5B58\u4E2D\u2026",
    "unsaved": "\u672A\u4FDD\u5B58",
    "save-failed": "\u4FDD\u5B58\u5931\u8D25\uFF1A{msg}",
    "ask-ai": "AI \u5BFC\u6F14",
    "export": "\u5BFC\u51FA",
    "more": "\u66F4\u591A",
    "export-html": "\u5BFC\u51FA\u7F51\u9875\u89C6\u9891",
    "export-html-hint": "\u5355\u4E2A .html\uFF0C\u53CC\u51FB\u5C31\u80FD\u64AD\u653E",
    "export-mp4": "\u5BFC\u51FA MP4",
    "export-mp4-hint": "\u7531 AI \u5BFC\u6F14\u5728\u672C\u673A\u6E32\u67D3",
    "export-cmd": "\u590D\u5236\u6E32\u67D3\u547D\u4EE4",
    "export-cmd-hint": "\u81EA\u5DF1\u5728\u7EC8\u7AEF\u91CC\u6E32\u67D3",
    "exported": "\u5DF2\u5BFC\u51FA\uFF1A{path}",
    "tab-scene": "\u573A\u666F",
    "tab-text": "\u6587\u5B57",
    "tab-captions": "\u5B57\u5E55",
    "tab-code": "\u4EE3\u7801",
    "tab-project": "\u5DE5\u7A0B",
    "captions-track": "\u5B57\u5E55",
    "captions-add": "\u6DFB\u52A0\u5B57\u5E55",
    "captions-lane-hint": "\u53CC\u51FB\u6DFB\u52A0\u5B57\u5E55",
    "captions-lane-dbl": "\u53CC\u51FB\u5B57\u5E55\u8F68",
    "caption-new": "\u65B0\u5B57\u5E55",
    "caption-hint": "\u62D6\u52A8\u79FB\u52A8\uFF0C\u62D6\u4E24\u7AEF\u4FEE\u526A\uFF0C\u53CC\u51FB\u7F16\u8F91\u6587\u5B57",
    "caption-start": "\u5F00\u59CB\uFF08\u79D2\uFF09",
    "caption-end": "\u7ED3\u675F\uFF08\u79D2\uFF09",
    "caption-text": "\u5B57\u5E55\u6587\u5B57",
    "caption-delete": "\u5220\u9664\u5B57\u5E55",
    "captions-count": "{n} \u6761\u5B57\u5E55",
    "captions-none": "\u8FD8\u6CA1\u6709\u5B57\u5E55\u3002\u53CC\u51FB\u65F6\u95F4\u7EBF\u4E0A\u7684\u5B57\u5E55\u8F68\uFF0C\u6216\u5728\u64AD\u653E\u5934\u5904\u6DFB\u52A0\u3002",
    "captions-hint": "\u5B57\u5E55\u6309\u6574\u7247\u65F6\u95F4\u663E\u793A\uFF1A\u6539\u573A\u666F\u957F\u5EA6\u6216\u987A\u5E8F\u4E0D\u4F1A\u79FB\u52A8\u5B57\u5E55\u3002\u6309 Shift+Enter \u6362\u884C\u3002",
    "captions-import": "\u5BFC\u5165 SRT \u5B57\u5E55\u6587\u4EF6",
    "captions-export": "\u5BFC\u51FA\u4E3A SRT \u5B57\u5E55\u6587\u4EF6",
    "import-short": "\u5BFC\u5165",
    "export-short": "\u5BFC\u51FA",
    "captions-look": "\u6837\u5F0F",
    "captions-position": "\u4F4D\u7F6E",
    "captions-bottom": "\u5E95\u90E8",
    "captions-top": "\u9876\u90E8",
    "captions-size": "\u5927\u5C0F",
    "captions-small": "\u5C0F",
    "captions-medium": "\u4E2D",
    "captions-large": "\u5927",
    "captions-imported": "\u5DF2\u5BFC\u5165 {n} \u6761\u5B57\u5E55",
    "captions-replaced": "\u5DF2\u5BFC\u5165 {n} \u6761\u5B57\u5E55\uFF0C\u66FF\u6362\u4E86\u539F\u6709\u7684 {m} \u6761\uFF08\u53EF\u64A4\u9500\uFF09",
    "captions-import-empty": "{name} \u91CC\u6CA1\u6709\u53EF\u8BFB\u7684\u5B57\u5E55",
    "captions-exported": "\u5B57\u5E55\u5DF2\u5BFC\u51FA\uFF1A{path}",
    "captions-import-skipped": "{name} \u91CC\u6709 {n} \u5904\u8BFB\u4E0D\u61C2\uFF0C\u5DF2\u8DF3\u8FC7\uFF08\u7B2C\u4E00\u5904\u5728\u7B2C {line} \u884C\uFF09",
    "captions-blocked": "\u5B57\u5E55\u5757\u91CC\u6709\u8BFB\u4E0D\u61C2\u7684\u5185\u5BB9\u3002\u4E3A\u4E86\u4E0D\u628A\u5B83\u4EEC\u5F04\u4E22\uFF0C\u5148\u4FEE\u6B63\uFF0C\u6216\u5728\u300C\u5B57\u5E55\u300D\u9875\u9009\u62E9\u53EA\u4FDD\u7559\u80FD\u8BFB\u7684\u5B57\u5E55\u3002",
    "captions-unreadable": "\u5DE5\u7A0B\u91CC\u7684\u5B57\u5E55\u5757\u6709 {n} \u5904\u8BFB\u4E0D\u61C2\uFF08\u4E0B\u9762\u5217\u51FA\u4F4D\u7F6E\uFF09\uFF0C\u8FD9\u4E9B\u884C\u4E0D\u4F1A\u663E\u793A\u3002\u5148\u4FEE\u6B63\u5B83\u4EEC\uFF0C\u6216\u8005\u53EA\u4FDD\u7559\u80FD\u8BFB\u7684\u5B57\u5E55\u3002",
    "captions-keep-readable": "\u53EA\u4FDD\u7559\u80FD\u8BFB\u7684\u5B57\u5E55",
    "export-srt": "\u5BFC\u51FA\u5B57\u5E55\uFF08SRT\uFF09",
    "export-srt-hint": "\u5B57\u5E55\u6587\u4EF6\uFF0C\u53EF\u4E0A\u4F20\u5230\u89C6\u9891\u5E73\u53F0",
    "export-captions": "\u70E7\u5F55\u5B57\u5E55",
    "trust-title": "\u8FD9\u4E2A\u5DE5\u7A0B\u5E26\u6709\u811A\u672C",
    "trust-body": "\u573A\u666F\u91CC\u7684 js \u4F1A\u5728\u9884\u89C8\u91CC\u8FD0\u884C\uFF08\u9884\u89C8\u662F\u9694\u79BB\u7684\uFF0C\u78B0\u4E0D\u5230\u4F60\u7684\u667A\u5E93\u548C\u8D26\u53F7\uFF09\u3002\u53EA\u6253\u5F00\u4F60\u4FE1\u4EFB\u7684\u5DE5\u7A0B\u3002",
    "trust-run": "\u8FD0\u884C\u9884\u89C8",
    "scene-none": "\u5728\u65F6\u95F4\u7EBF\u4E0A\u70B9\u4E00\u4E2A\u573A\u666F\u3002",
    "scene-id": "\u573A\u666F id",
    "scene-title": "\u6807\u9898",
    "scene-length": "\u957F\u5EA6",
    "scene-class": "\u6837\u5F0F\u7C7B",
    "scene-hits": "\u62CD\u70B9",
    "scene-hits-hint": "\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u62CD\u6570\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002\u753B\u9762\u5207\u70B9\u548C\u914D\u4E50\u91CD\u97F3\u90FD\u8BFB\u8FD9\u5F20\u8868\u3002",
    "scene-hits-hint-sec": "\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u79D2\u6570\uFF0C\u7528\u9017\u53F7\u5206\u9694\u3002",
    "length-hint": "\u4F8B\u5982 2 bars\u30016 beats\u30012.5s",
    "move-up": "\u524D\u79FB",
    "move-down": "\u540E\u79FB",
    "duplicate": "\u590D\u5236\u573A\u666F",
    "delete": "\u5220\u9664\u573A\u666F",
    "add-scene": "\u65B0\u573A\u666F",
    "deleted": "\u5DF2\u5220\u9664\u300C{id}\u300D\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002",
    "timed": "\u5143\u7D20\u51FA\u73B0\u65F6\u95F4",
    "timed-hint": "data-in \u5199 h3 \u8868\u793A\u5728\u7B2C 3 \u4E2A\u62CD\u70B9\u51FA\u73B0\uFF0Ch3+0.5 \u8868\u793A\u518D\u665A\u534A\u62CD\u3002",
    "appear": "\u51FA\u73B0",
    "disappear": "\u6D88\u5931",
    "effect": "\u6548\u679C",
    "elements-track": "\u5143\u7D20",
    "elements-lane-hint": "\u8BBE\u4E86\u51FA\u73B0\u65F6\u95F4\u7684\u5143\u7D20\u6392\u5728\u8FD9\u91CC\uFF1B\u7531\u811A\u672C\u9A71\u52A8\u7684\u4E0D\u5728\u5176\u4E2D",
    "element-hint": "\u70B9\u51FB\u9009\u4E2D\uFF0C\u53CC\u51FB\u6539\u51FA\u73B0\u65F6\u95F4\uFF0C\u53F3\u952E\u5F15\u7528\u5230\u5BF9\u8BDD",
    "quote-to-chat": "\u5F15\u7528\u5230\u5BF9\u8BDD",
    "texts": "\u753B\u9762\u6587\u5B57",
    "texts-hint": "\u53CC\u51FB\u753B\u9762\u91CC\u7684\u6587\u5B57\u4E5F\u80FD\u76F4\u63A5\u6539\u3002",
    "texts-none": "\u8FD9\u4E2A\u573A\u666F\u7684\u6587\u5B57\u90FD\u7531\u811A\u672C\u751F\u6210\uFF0C\u5230\u300C\u4EE3\u7801\u300D\u91CC\u6539\u3002",
    "all-scenes": "\u5168\u90E8\u573A\u666F",
    "images": "\u56FE\u7247",
    "replace-image": "\u6362\u56FE",
    "ai-rewrite": "AI \u6539\u5199",
    "accept": "\u91C7\u7528",
    "discard": "\u653E\u5F03",
    "rewrite-prompt": "\u600E\u4E48\u6539\uFF1F",
    "rewrite-default": "\u66F4\u77ED\u3001\u66F4\u6709\u529B\uFF0C\u4FDD\u6301\u539F\u6765\u7684\u8BED\u8A00",
    "code-scene": "\u573A\u666F\u4EE3\u7801",
    "code-project": "\u5168\u5C40",
    "code-apply": "\u5E94\u7528\uFF08\u2318/Ctrl+Enter\uFF09",
    "code-html": "\u753B\u9762 HTML",
    "code-css": "\u6837\u5F0F CSS",
    "code-js": "\u811A\u672C JS",
    "code-stage-html": "\u5E38\u9A7B\u56FE\u5C42 HTML",
    "code-stage-js": "\u5168\u5C40\u811A\u672C JS",
    "code-global-css": "\u5168\u5C40\u6837\u5F0F CSS",
    "project-title": "\u7247\u540D",
    "project-size": "\u753B\u5E45",
    "project-fps": "\u5E27\u7387",
    "project-bpm": "\u901F\u5EA6\uFF08BPM\uFF09",
    "project-meter": "\u6BCF\u5C0F\u8282\u62CD\u6570",
    "project-bg": "\u80CC\u666F\u8272",
    "project-audio": "\u97F3\u8F68",
    "audio-add": "\u6DFB\u52A0\u97F3\u9891\u2026",
    "audio-at": "\u8D77\u70B9\uFF08\u79D2\uFF09",
    "audio-gain": "\u97F3\u91CF\uFF08dB\uFF09",
    "audio-remove": "\u79FB\u9664",
    "project-length": "\u603B\u957F {len} \u79D2 \xB7 {n} \u4E2A\u573A\u666F",
    "problems": "\u95EE\u9898",
    "no-problems": "\u6CA1\u6709\u95EE\u9898\u3002",
    "sync": "\u5361\u70B9\u68C0\u67E5",
    "sync-none": "\u5DE5\u7A0B\u91CC\u8FD8\u6CA1\u6709\u97F3\u8F68\u3002",
    "sync-ok": "{n} \u4E2A\u62CD\u70B9\u5168\u90E8\u843D\u5728\u97F3\u4E50\u91CD\u97F3\u4E0A\u3002",
    "sync-bad": "{n} \u4E2A\u62CD\u70B9\u91CC\u6709 {bad} \u4E2A\u6CA1\u6709\u843D\u5728\u91CD\u97F3\u4E0A\uFF1A",
    "sync-fix": "\u8BA9 AI \u4FEE\u6B63",
    "sync-analyzing": "\u6B63\u5728\u5206\u6790\u97F3\u4E50\u2026",
    "snap": "\u5438\u9644",
    "snap-bar": "\u5C0F\u8282",
    "snap-beat": "\u62CD",
    "snap-half": "\u534A\u62CD",
    "snap-quarter": "1/4 \u62CD",
    "snap-off": "\u5173",
    "zoom-in": "\u653E\u5927",
    "zoom-out": "\u7F29\u5C0F",
    "zoom-fit": "\u9002\u5E94",
    "zoom-fit-hint": "\u7F29\u653E\u5230\u6574\u7247\u53EF\u89C1",
    "shortcut-zoom": "\u5728\u6307\u9488\u5904\u7F29\u653E",
    "wheel-or-pinch": "\u6EDA\u8F6E / \u53CC\u6307\u634F\u5408",
    "timeline-docked": "\u65F6\u95F4\u7EBF\u5728\u5E95\u90E8\u9762\u677F\uFF0C\u9762\u677F\u5DF2\u6536\u8D77",
    "timeline-show": "\u663E\u793A\u65F6\u95F4\u7EBF",
    "timeline-no-project": "\u5728\u89C6\u9891\u5DE5\u4F5C\u5BA4\u91CC\u6253\u5F00\u4E00\u4E2A\u5DE5\u7A0B\uFF0C\u8FD9\u91CC\u5C31\u663E\u793A\u5B83\u7684\u65F6\u95F4\u7EBF\u3002",
    "roll-hint": "\u62D6\u52A8\u53F3\u8FB9\u7F18\u6539\u573A\u666F\u957F\u5EA6\uFF1A\u4E0B\u4E00\u573A\u666F\u8BA9\u4F4D\uFF0C\u540E\u9762\u7684\u5207\u70B9\u4E0D\u52A8\u3002\u6309\u4F4F Alt \u5219\u540E\u9762\u6574\u4F53\u79FB\u52A8\u3002",
    "hit-hint": "\u62D6\u52A8\u79FB\u52A8\u62CD\u70B9\uFF1B\u53CC\u51FB\u7A7A\u767D\u5904\u6DFB\u52A0\uFF1B\u9009\u4E2D\u540E\u6309 Delete \u5220\u9664\u3002",
    "external": "AI \u6216\u5176\u4ED6\u7F16\u8F91\u5668\u6539\u4E86\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u5DF2\u8F7D\u5165\u3002\u53EF\u4EE5\u64A4\u9500\u3002",
    "conflict": "\u6587\u4EF6\u5728\u522B\u5904\u88AB\u6539\u4E86\uFF0C\u800C\u4F60\u8FD9\u91CC\u8FD8\u6709\u6CA1\u4FDD\u5B58\u7684\u6539\u52A8\u3002",
    "conflict-load": "\u8F7D\u5165\u6587\u4EF6\u91CC\u7684\u7248\u672C",
    "conflict-keep": "\u4FDD\u7559\u6211\u7684\u7248\u672C",
    "ai-title": "AI \u5BFC\u6F14",
    "ai-placeholder": "\u60F3\u8BA9 AI \u505A\u4EC0\u4E48\uFF1F\u6BD4\u5982\uFF1A\u5728\u300C\u6807\u9898\u5361\u300D\u540E\u9762\u52A0\u4E00\u4E2A\u8BB2 Skills \u7684\u573A\u666F\uFF0C\u56DB\u62CD\u4E00\u5207\u3002",
    "ai-send": "\u53D1\u9001",
    "ai-no-host": "\u8FD9\u91CC\u6CA1\u6709 Tangu\uFF0C\u63D0\u793A\u8BCD\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF0C\u7C98\u8D34\u7ED9\u4EFB\u610F Agent \u5373\u53EF\u3002",
    "ai-chip-scene": "\u5199\u4E00\u4E2A\u65B0\u573A\u666F",
    "ai-chip-pace": "\u8282\u594F\u518D\u7D27\u4E00\u70B9",
    "ai-chip-copy": "\u6DA6\u8272\u5168\u90E8\u6587\u6848",
    "ai-chip-score": "\u4E3A\u8FD9\u4E2A\u89C6\u9891\u914D\u4E50",
    "ai-chip-sync": "\u68C0\u67E5\u5E76\u4FEE\u6B63\u5361\u70B9",
    "ai-chip-review": "\u770B\u4E00\u904D\u6210\u7247\u63D0\u610F\u89C1",
    "ai-started": "\u5DF2\u4EA4\u7ED9 Video Studio \u5BFC\u6F14\u3002\u5B83\u6539\u5B8C\u6587\u4EF6\uFF0C\u7F16\u8F91\u5668\u4F1A\u81EA\u52A8\u8F7D\u5165\u3002",
    "errors-runtime": "\u811A\u672C\u51FA\u9519",
    "new-project": "\u65B0\u5EFA\u89C6\u9891\u5DE5\u7A0B",
    "embed-open": "\u5728 Video Studio \u4E2D\u6253\u5F00",
    "time": "\u65F6\u95F4",
    "scene-count": "{n} \u4E2A\u573A\u666F",
    "preview": "\u9884\u89C8",
    "properties": "\u5C5E\u6027",
    "timeline": "\u65F6\u95F4\u7EBF",
    "video-track": "\u573A\u666F",
    "audio-track": "\u914D\u4E50",
    "previous-scene": "\u4E0A\u4E00\u4E2A\u573A\u666F",
    "next-scene": "\u4E0B\u4E00\u4E2A\u573A\u666F",
    "frame-back": "\u4E0A\u4E00\u5E27",
    "frame-forward": "\u4E0B\u4E00\u5E27",
    "focus-preview": "\u4E13\u6CE8\u9884\u89C8",
    "exit-focus": "\u8FD4\u56DE\u7F16\u8F91",
    "toggle-properties": "\u5C5E\u6027\u9762\u677F",
    "mute": "\u9759\u97F3",
    "unmute": "\u5F00\u542F\u58F0\u97F3",
    "timing-section": "\u8282\u594F\u4E0E\u62CD\u70B9",
    "advanced": "\u9AD8\u7EA7\u8BBE\u7F6E",
    "scene-actions": "\u573A\u666F\u64CD\u4F5C",
    "sync-short": "{bad} / {n} \u4E2A\u62CD\u70B9\u5F85\u68C0\u67E5",
    "sync-short-ok": "{n} \u4E2A\u62CD\u70B9\u5DF2\u5BF9\u9F50",
    "resize-timeline": "\u8C03\u6574\u65F6\u95F4\u7EBF\u9AD8\u5EA6",
    "apply-code": "\u5E94\u7528",
    "scene-duration": "{n} \u79D2",
    "zoom-level": "\u65F6\u95F4\u7EBF\u7F29\u653E",
    "audio-source": "\u97F3\u9891\u6587\u4EF6",
    "close": "\u5173\u95ED",
    "split": "\u5728\u64AD\u653E\u5934\u5904\u5206\u5272",
    "import-media": "\u5BFC\u5165\u7D20\u6750",
    "shortcuts": "\u952E\u76D8\u5FEB\u6377\u952E",
    "trim-hint": "\u62D6\u52A8\u5DE6\u8FB9\u7F18\u4FEE\u526A\u5F00\u5934\uFF1A\u4E0A\u4E00\u573A\u666F\u8BA9\u4F4D\uFF0C\u540E\u9762\u7684\u5207\u70B9\u4E0D\u52A8\u3002\u6309\u4F4F Alt \u5219\u540E\u9762\u6574\u4F53\u524D\u79FB\u3002",
    "trim-unsupported": "\u8FD9\u4E2A\u7248\u672C\u8FD8\u4E0D\u80FD\u4FEE\u526A\u573A\u666F\u5F00\u5934\u3002",
    "scene-in": "\u5165\u70B9",
    "scene-in-hint": "\u573A\u666F\u5185\u5BB9\u4ECE\u54EA\u91CC\u5F00\u59CB\u64AD\u653E\u3002\u5206\u5272\u6216\u4FEE\u526A\u5F00\u5934\u65F6\u4F1A\u81EA\u52A8\u8BBE\u7F6E\u3002",
    "transition": "\u8F6C\u573A",
    "transition-type": "\u7C7B\u578B",
    "transition-dur": "\u65F6\u957F",
    "transition-first": "\u7B2C\u4E00\u4E2A\u573A\u666F\u524D\u9762\u6CA1\u6709\u753B\u9762\uFF0C\u4E0D\u80FD\u52A0\u8F6C\u573A\u3002",
    "tr-none": "\u65E0\uFF08\u786C\u5207\uFF09",
    "tr-fade": "\u4EA4\u53C9\u6DE1\u5316",
    "tr-dip": "\u7ECF\u80CC\u666F\u8272",
    "tr-slide-left": "\u4ECE\u53F3\u6ED1\u5165",
    "tr-slide-up": "\u4ECE\u4E0B\u6ED1\u5165",
    "tr-push-left": "\u5411\u5DE6\u63A8\u5165",
    "tr-wipe-left": "\u64E6\u9664",
    "tr-zoom": "\u7F29\u653E",
    "tr-blur": "\u6A21\u7CCA",
    "sync-hit": "\u843D\u5728\u91CD\u97F3\u4E0A",
    "sync-miss": "\u6CA1\u6709\u843D\u5728\u91CD\u97F3\u4E0A",
    "sync-quiet": "\u5207\u5230\u5B89\u9759\u5904",
    "scene-none-yet": "\u8FD8\u6CA1\u6709\u573A\u666F\u3002\u70B9\u300C\u65B0\u573A\u666F\u300D\uFF0C\u6216\u628A\u56FE\u7247\u3001\u89C6\u9891\u62D6\u5230\u8FD9\u91CC\u3002",
    "blank-title": "\u8FD8\u6CA1\u6709\u573A\u666F",
    "blank-body": "\u52A0\u4E00\u4E2A\u573A\u666F\u3001\u5BFC\u5165\u7D20\u6750\uFF0C\u6216\u8005\u628A\u60F3\u6CD5\u4EA4\u7ED9 AI \u5BFC\u6F14\u3002",
    "audio-track-n": "\u97F3\u8F68 {n}",
    "drop-audio": "\u6216\u628A\u97F3\u4E50\u3001\u97F3\u6548\u62D6\u5230\u8FD9\u91CC",
    "score-ask": "\u8BA9\u5BFC\u6F14\u914D\u4E50",
    "rail-hint": "\u5728\u5C5E\u6027\u91CC\u6253\u5F00\u300C{tab}\u300D",
    "lane-hint": "\u62D6\u52A8\u53EF\u4EE5\u79FB\u52A8\u8D77\u70B9",
    "audio-in": "\u5165\u70B9\uFF08\u79D2\uFF09",
    "audio-dur": "\u65F6\u957F\uFF08\u79D2\uFF09",
    "audio-dur-full": "\u5230\u7ED3\u5C3E",
    "split-edge": "\u64AD\u653E\u5934\u79BB\u573A\u666F\u8FB9\u7F18\u592A\u8FD1\uFF0C\u6362\u4E2A\u4F4D\u7F6E\u518D\u5206\u5272\u3002",
    "copy-title": "{title} \u526F\u672C",
    "import-unsupported": "\u5F53\u524D\u5BBF\u4E3B\u4E0D\u80FD\u5199\u5165\u6587\u4EF6\uFF0C\u65E0\u6CD5\u5BFC\u5165\u7D20\u6750\u3002",
    "import-skip": "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B\uFF1A{name}",
    "imported": "\u7D20\u6750\u5DF2\u5BFC\u5165\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002",
    "templates": "\u65B0\u573A\u666F",
    "templates-hint": "\u9009\u4E00\u4E2A\u7248\u5F0F\uFF0C\u6587\u5B57\u4E4B\u540E\u90FD\u80FD\u6539\u3002",
    "key-space": "\u7A7A\u683C",
    "shortcut-frame": "\u9010\u5E27\u79FB\u52A8",
    "shortcut-beat": "\u6309\u62CD\u79FB\u52A8",
    "shortcut-scene": "\u4E0A\u4E00\u4E2A / \u4E0B\u4E00\u4E2A\u573A\u666F",
    "shortcut-text": "\u6539\u753B\u9762\u91CC\u7684\u6587\u5B57",
    "shortcut-dblclick": "\u53CC\u51FB",
    "score-hint": "\u7531 AI \u5BFC\u6F14\u6309\u62CD\u70B9\u5199\u539F\u521B\u914D\u4E50",
    "frame-at": "\u7B2C {n} \u5E27",
    "inline-hint": "\u56DE\u8F66\u786E\u8BA4 \xB7 Esc \u53D6\u6D88",
    "unit": "\u5355\u4F4D",
    "unit-bar": "\u5C0F\u8282",
    "unit-beat": "\u62CD",
    "unit-sec": "\u79D2",
    "media": "\u7D20\u6750",
    "clip-in": "\u5165\u70B9\uFF08\u79D2\uFF09",
    "clip-mute": "\u9759\u97F3",
    "replace-media": "\u66FF\u6362",
    "placeholder-image": "\u5360\u4F4D\u56FE",
    "code-scope": "\u4EE3\u7801\u8303\u56F4",
    "frame-section": "\u753B\u9762",
    "frame-landscape": "\u6A2A\u5C4F 16:9",
    "frame-portrait": "\u7AD6\u5C4F 9:16",
    "frame-square": "\u65B9\u5F62 1:1",
    "frame-classic": "4:3",
    "frame-4k": "4K 16:9",
    "tempo-section": "\u8282\u594F",
    "tempo-none": "\u4E0D\u6309\u62CD\u5B50",
    "tempo-hint": "\u8BBE\u4E86\u901F\u5EA6\uFF0C\u957F\u5EA6\u548C\u62CD\u70B9\u5C31\u6309\u5C0F\u8282\u548C\u62CD\u8BA1\u7B97\uFF0C\u753B\u9762\u5207\u70B9\u4E0E\u914D\u4E50\u91CD\u97F3\u5BF9\u9F50\u3002",
    "fx-cut": "\u76F4\u63A5\u51FA\u73B0",
    "fx-fade": "\u6DE1\u5165",
    "fx-up": "\u4E0A\u6D6E",
    "fx-down": "\u4E0B\u843D",
    "fx-left": "\u4ECE\u53F3\u8FDB\u5165",
    "fx-right": "\u4ECE\u5DE6\u8FDB\u5165",
    "fx-pop": "\u5F39\u51FA",
    "fx-type": "\u6253\u5B57",
    "export-range": "\u533A\u95F4",
    "export-range-all": "\u5168\u7247",
    "export-range-scene": "\u5F53\u524D\u573A\u666F",
    "export-range-custom": "\u81EA\u5B9A\u4E49",
    "director-context": "\u4F1A\u968F\u8BF7\u6C42\u4E00\u8D77\u53D1\u9001",
    "director-quick": "\u5E38\u7528\u4EFB\u52A1",
    "ai-send-hint": "\u2318/Ctrl + Enter \u53D1\u9001",
    "new-project-short": "\u65B0\u5EFA\u5DE5\u7A0B",
    "new-video": "\u65B0\u5EFA\u89C6\u9891",
    "launch-projects": "\u6211\u7684\u5DE5\u7A0B",
    "nav-create": "\u521B\u5EFA",
    "close-project": "\u5173\u95ED\u5DE5\u7A0B",
    "bin": "\u7D20\u6750",
    "bin-no-project": "\u6253\u5F00\u4E00\u4E2A\u5DE5\u7A0B\u540E\uFF0C\u8FD9\u91CC\u663E\u793A\u5B83\u7684\u7D20\u6750\u3002",
    "chat": "\u5BF9\u8BDD",
    "chat-no-project": "\u6253\u5F00\u4E00\u4E2A\u5DE5\u7A0B\u540E\uFF0C\u5728\u8FD9\u91CC\u548C AI \u5BFC\u6F14\u5BF9\u8BDD\u3002",
    "chat-open": "\u6253\u5F00\u5BF9\u8BDD",
    "chat-task-ready": "\u5DF2\u5199\u8FDB\u53F3\u4FA7\u5BF9\u8BDD\u7684\u8F93\u5165\u6846\uFF0C\u56DE\u8F66\u4EA4\u7ED9\u5BFC\u6F14\u3002",
    "ai-ask-score": "\u4E3A\u8FD9\u4E2A\u89C6\u9891\u5199\u4E00\u6BB5\u539F\u521B\u914D\u4E50\uFF1A\u91CD\u97F3\u843D\u5728\u5404\u573A\u666F\u7684\u62CD\u70B9\u4E0A\uFF0C\u5199\u5B8C\u52A0\u8FDB\u5DE5\u7A0B\uFF0C\u518D\u505A\u4E00\u6B21\u5361\u70B9\u68C0\u67E5\u3002",
    "ai-ask-sync": "\u68C0\u67E5\u753B\u9762\u5207\u70B9\u6709\u6CA1\u6709\u843D\u5728\u914D\u4E50\u7684\u91CD\u97F3\u4E0A\uFF0C\u628A\u6CA1\u5BF9\u4E0A\u7684\u4FEE\u597D\uFF0C\u5E76\u544A\u8BC9\u6211\u6539\u4E86\u4EC0\u4E48\u3002",
    "ai-ask-review": "\u770B\u4E00\u904D\u6210\u7247\uFF08\u62BD\u5E27\u770B\u753B\u9762\uFF09\uFF0C\u7ED9\u6211\u4E00\u4EFD\u5177\u4F53\u7684\u4FEE\u6539\u5EFA\u8BAE\uFF1B\u6211\u540C\u610F\u4E4B\u524D\u5148\u4E0D\u8981\u6539\u3002",
    "launch-projects-sub": "\u63A5\u7740\u526A\u8F91\u5DF2\u6709\u7684\u5DE5\u7A0B\uFF0C\u6216\u4ECE\u4E00\u4E2A\u65B0\u60F3\u6CD5\u5F00\u59CB\u3002",
    "launch-count": "\u540D\u79F0 \xB7 {n}",
    "launch-col-meta": "\u753B\u5E45 \xB7 \u65F6\u957F",
    "launch-empty": "\u8FD8\u6CA1\u6709\u89C6\u9891\u5DE5\u7A0B",
    "launch-empty-hint": "\u70B9\u300C\u65B0\u5EFA\u89C6\u9891\u300D\u5F00\u59CB\u3002",
    "launch-no-match": "\u6CA1\u6709\u5339\u914D\u7684\u5DE5\u7A0B",
    "launch-back": "\u8FD4\u56DE\u5DE5\u7A0B",
    "launch-create-title": "\u505A\u4E00\u652F\u65B0\u89C6\u9891",
    "launch-create-sub": "\u8D77\u4E2A\u540D\u5B57\u3001\u9009\u597D\u753B\u5E45\uFF0C\u60F3\u6CD5\u53EF\u4EE5\u5148\u4EA4\u7ED9 AI \u5BFC\u6F14\u3002",
    "launch-idea": "\u4F60\u60F3\u505A\u4EC0\u4E48\uFF1F",
    "optional": "\u53EF\u9009",
    "launch-idea-placeholder": "\u6BD4\u5982\uFF1A\u4E00\u652F 30 \u79D2\u7684\u65B0\u54C1\u5BA3\u4F20\u7247\uFF0C\u8282\u594F\u660E\u5FEB\uFF0C\u6700\u540E\u505C\u5728 Logo \u4E0A\u3002",
    "launch-frame": "\u753B\u5E45",
    "launch-name": "\u5DE5\u7A0B\u540D\u79F0",
    "launch-create": "\u521B\u5EFA\u5DE5\u7A0B",
    "launch-where": "\u5DE5\u7A0B\u548C\u5B83\u7684\u7D20\u6750\u90FD\u653E\u5728 {path}/ \u91CC\u3002",
    "launch-folder": "\u4FDD\u5B58\u4F4D\u7F6E",
    "launch-folder-hint": "\u7B14\u8BB0\u5E93\u91CC\u7684\u6587\u4EF6\u5939\uFF0C\u7559\u7A7A\u7528\u9ED8\u8BA4\u4F4D\u7F6E",
    "launch-folder-invalid": "\u4FDD\u5B58\u4F4D\u7F6E\u8981\u5199\u7B14\u8BB0\u5E93\u91CC\u7684\u6587\u4EF6\u5939\uFF0C\u6BD4\u5982 \u89C6\u9891/2026\u3002",
    "project-rename": "\u91CD\u547D\u540D\u2026",
    "project-rename-title": "\u5DE5\u7A0B\u540D\u79F0",
    "project-delete": "\u5220\u9664",
    "project-deleted-file": "\u53EA\u628A\u300C{name}\u300D\u7684\u5DE5\u7A0B\u6587\u4EF6\u79FB\u5230\u4E86\u56DE\u6536\u7AD9\uFF1A\u5B83\u6240\u5728\u7684\u6587\u4EF6\u5939\u91CC\u8FD8\u6709\u522B\u7684\u6587\u4EF6\uFF0C\u6CA1\u6709\u52A8\u3002",
    "project-delete-failed": "\u6CA1\u80FD\u5220\u9664\u300C{name}\u300D\u3002",
    "launch-idea-note": "\u5199\u4E86\u60F3\u6CD5\u7684\u8BDD\uFF0C\u521B\u5EFA\u540E\u4F1A\u586B\u8FDB AI \u5BFC\u6F14\uFF0C\u7531\u4F60\u786E\u8BA4\u540E\u518D\u53D1\u9001\u3002",
    "launch-name-invalid": '\u540D\u79F0\u4E0D\u80FD\u4EE5\u70B9\u5F00\u5934\u6216\u7ED3\u5C3E\uFF0C\u4E5F\u4E0D\u80FD\u5305\u542B / \\ : * ? " < > |',
    "launch-name-taken": "\u5DF2\u7ECF\u6709\u540C\u540D\u7684\u6587\u4EF6\u5939\u4E86\uFF0C\u6362\u4E2A\u540D\u5B57\u5427\u3002",
    "launch-no-library": "\u7B14\u8BB0\u5E93\u8FD8\u6CA1\u6253\u5F00\uFF0C\u5DE5\u7A0B\u6CA1\u6709\u5730\u65B9\u5B58\u653E\u3002\u5148\u5728\u7B14\u8BB0\u91CC\u6253\u5F00\u4E00\u4E2A\u5E93\uFF0C\u518D\u56DE\u6765\u65B0\u5EFA\u3002",
    "default-name": "\u65B0\u89C6\u9891",
    "bin-import": "\u5BFC\u5165",
    "bin-import-hint": "\u590D\u5236\u5230\u5DE5\u7A0B\u7684\u7D20\u6750\u6587\u4EF6\u5939\uFF0C\u4E0D\u653E\u8FDB\u65F6\u95F4\u7EBF",
    "bin-empty": "\u628A\u56FE\u7247\u3001\u89C6\u9891\u6216\u97F3\u9891\u62D6\u5230\u8FD9\u91CC\uFF0C\u6216\u70B9\u300C\u5BFC\u5165\u300D\u3002",
    "bin-used": "\u5DF2\u7528",
    "bin-hint": "\u53CC\u51FB\uFF1A\u52A0\u5230\u64AD\u653E\u5934\u6240\u5728\u573A\u666F\u4E4B\u540E\uFF1B\u62D6\u5230\u65F6\u95F4\u7EBF\uFF1A\u653E\u5728\u5207\u70B9",
    "bin-outside": "\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u5728\u5F53\u524D\u5DE5\u7A0B\u7684\u6587\u4EF6\u5939\u91CC\u3002",
    "bin-filter": "\u7B5B\u9009\u7D20\u6750",
    "bin-filter-all": "\u5168\u90E8",
    "bin-filter-image": "\u56FE\u7247",
    "bin-filter-video": "\u89C6\u9891",
    "bin-filter-audio": "\u58F0\u97F3",
    "bin-filter-unused": "\u672A\u4F7F\u7528",
    "bin-filter-ai": "AI \u751F\u6210",
    "bin-filter-none": "\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u7684\u7D20\u6750\u3002",
    "bin-ai": "AI",
    "bin-place": "\u653E\u5230\u64AD\u653E\u5934\u4E4B\u540E",
    "bin-reveal": "\u5728\u6587\u4EF6\u5939\u4E2D\u663E\u793A",
    "bin-delete": "\u5220\u9664",
    "bin-delete-used": "\u573A\u666F\u91CC\u8FD8\u5728\u7528"
  };
  var EN = {
    "export-intro": "The AI Director renders it on this computer. It keeps going if you leave; come back to check progress.",
    "export-original": "Original size",
    "export-size": "Output size",
    "export-quality": "Quality and size",
    "export-quality-high": "High quality",
    "export-quality-balanced": "Balanced",
    "export-quality-small": "Smaller file",
    "export-from": "Start (seconds)",
    "export-to": "End (seconds)",
    "export-audio": "Include audio",
    "export-selected": "Selected scene only",
    "export-start": "Start export",
    "export-progress": "Export progress",
    "export-cancel": "Cancel export",
    "export-retry": "Export again",
    "export-preview": "Preview video",
    "export-save-first": "Save the project before exporting.",
    "export-invalid": "Run the trusted preview and fix project errors first.",
    "export-host-only": "MP4 export needs a local vault on this computer.",
    "export-range-invalid": "Choose a valid range within the project.",
    "export-agent-ended": "The Director ended before rendering started. Check the session and retry.",
    "export-status-queued": "Waiting for the Director",
    "export-status-preparing": "Checking the environment",
    "export-status-frames": "Rendering frames",
    "export-status-encoding": "Encoding video and audio",
    "export-status-done": "Export complete",
    "export-status-failed": "Export failed",
    "export-status-cancelled": "Export cancelled",
    "director-intro": "Describe the change. Your selected scene and playhead position are included.",
    "director-waiting": "Waiting for the Director",
    "director-idle": "The Director is not running",
    "director-thinking": "The Director is thinking",
    "director-speaking": "The Director is replying",
    "director-tool": "The Director is working on the project",
    "director-done": "Director task complete",
    "director-error": "Director task failed",
    "director-changes": "Project changes ({n})",
    "director-added": "Added",
    "director-removed": "Removed",
    "director-changed": "Changed",
    "director-restore": "Restore before this task",
    "director-stale": "The project has newer changes. Refresh before reviewing or restoring.",
    "director-no-snapshot": "The project snapshot is unavailable.",
    "app": "Video Studio",
    "projects": "Video projects",
    "project-search": "Search projects\u2026",
    "choose-project": "Switch video project",
    "workspace-welcome": "Video Studio",
    "workspace-intro": "Open a project to edit scenes, text and music.",
    "projects-empty": "No video projects yet. Create one to start.",
    "refresh-projects": "Refresh projects",
    "open-workspace": "Open Video Studio",
    "show-in-main": "Full workspace",
    "mini-preview": "Mini video preview",
    "floating-workspace": "Detached window",
    "loading": "Opening the project\u2026",
    "cannot-read": "Cannot read {path}",
    "no-vault": "Open a vault first, then open the video project.",
    "play": "Play",
    "pause": "Pause",
    "undo": "Undo",
    "redo": "Redo",
    "saved": "Saved",
    "saving": "Saving\u2026",
    "unsaved": "Unsaved",
    "save-failed": "Save failed: {msg}",
    "ask-ai": "AI Director",
    "export": "Export",
    "more": "More",
    "export-html": "Export web video",
    "export-html-hint": "One .html file that plays on its own",
    "export-mp4": "Export MP4",
    "export-mp4-hint": "Rendered on this computer by the AI Director",
    "export-cmd": "Copy render command",
    "export-cmd-hint": "Render it yourself in a terminal",
    "exported": "Exported: {path}",
    "tab-scene": "Scene",
    "tab-text": "Text",
    "tab-captions": "Captions",
    "tab-code": "Code",
    "tab-project": "Project",
    "captions-track": "Captions",
    "captions-add": "Add caption",
    "captions-lane-hint": "Double-click to add a caption",
    "captions-lane-dbl": "Double-click the captions track",
    "caption-new": "New caption",
    "caption-hint": "Drag to move, drag an end to trim, double-click to edit the text",
    "caption-start": "Start (s)",
    "caption-end": "End (s)",
    "caption-text": "Caption text",
    "caption-delete": "Delete caption",
    "captions-count": "{n} captions",
    "captions-none": "No captions yet. Double-click the captions track, or add one at the playhead.",
    "captions-hint": "Captions use the video's own clock: changing a scene's length or order does not move them. Shift+Enter starts a new line.",
    "captions-import": "Import an SRT subtitle file",
    "captions-export": "Export as an SRT subtitle file",
    "import-short": "Import",
    "export-short": "Export",
    "captions-look": "Style",
    "captions-position": "Position",
    "captions-bottom": "Bottom",
    "captions-top": "Top",
    "captions-size": "Size",
    "captions-small": "Small",
    "captions-medium": "Medium",
    "captions-large": "Large",
    "captions-imported": "Imported {n} captions",
    "captions-replaced": "Imported {n} captions, replacing the {m} there were (undo to restore)",
    "captions-import-empty": "No captions found in {name}",
    "captions-exported": "Captions exported: {path}",
    "captions-import-skipped": "{n} parts of {name} could not be read and were skipped (the first at line {line})",
    "captions-blocked": "The captions block has lines that cannot be read. So they are not lost, fix them first, or choose to keep only the readable captions on the Captions tab.",
    "captions-unreadable": "The project's captions block has {n} parts that cannot be read (listed below); they are not shown. Fix them, or keep only the readable captions.",
    "captions-keep-readable": "Keep only the readable captions",
    "export-srt": "Export captions (SRT)",
    "export-srt-hint": "A subtitle file for video platforms",
    "export-captions": "Burn in captions",
    "trust-title": "This project runs scripts",
    "trust-body": "Scene scripts run in the preview (the preview is isolated from your vault and account). Only open projects you trust.",
    "trust-run": "Run preview",
    "scene-none": "Click a scene on the timeline.",
    "scene-id": "Scene id",
    "scene-title": "Title",
    "scene-length": "Length",
    "scene-class": "Class",
    "scene-hits": "Hits",
    "scene-hits-hint": "Beats from the scene start, comma separated. The picture cuts and the score accents both read this list.",
    "scene-hits-hint-sec": "Seconds from the scene start, comma separated.",
    "length-hint": "e.g. 2 bars, 6 beats, 2.5s",
    "move-up": "Earlier",
    "move-down": "Later",
    "duplicate": "Duplicate scene",
    "delete": "Delete scene",
    "add-scene": "New scene",
    "deleted": 'Deleted "{id}". You can undo it.',
    "timed": "Element timing",
    "timed-hint": 'data-in="h3" appears on hit 3; h3+0.5 half a beat later.',
    "appear": "In",
    "disappear": "Out",
    "effect": "Effect",
    "elements-track": "Elements",
    "elements-lane-hint": "Elements with an entrance time line up here; script-driven ones are not listed",
    "element-hint": "Click to select, double-click to edit its in time, right-click to quote it in chat",
    "quote-to-chat": "Quote in chat",
    "texts": "On-screen text",
    "texts-hint": "Double-click text in the picture to edit it in place.",
    "texts-none": "This scene's text comes from its script; edit it under Code.",
    "all-scenes": "All scenes",
    "images": "Images",
    "replace-image": "Replace",
    "ai-rewrite": "AI rewrite",
    "accept": "Use",
    "discard": "Discard",
    "rewrite-prompt": "How should it change?",
    "rewrite-default": "Shorter and punchier, in the same language",
    "code-scene": "Scene code",
    "code-project": "Global",
    "code-apply": "Apply (\u2318/Ctrl+Enter)",
    "code-html": "Picture HTML",
    "code-css": "Style CSS",
    "code-js": "Script JS",
    "code-stage-html": "Stage layers HTML",
    "code-stage-js": "Global script JS",
    "code-global-css": "Global CSS",
    "project-title": "Title",
    "project-size": "Frame",
    "project-fps": "Frame rate",
    "project-bpm": "Tempo (BPM)",
    "project-meter": "Beats per bar",
    "project-bg": "Background",
    "project-audio": "Audio",
    "audio-add": "Add audio\u2026",
    "audio-at": "Starts at (s)",
    "audio-gain": "Gain (dB)",
    "audio-remove": "Remove",
    "project-length": "{len} s \xB7 {n} scenes",
    "problems": "Problems",
    "no-problems": "No problems.",
    "sync": "Sync check",
    "sync-none": "The project has no audio yet.",
    "sync-ok": "All {n} hits land on accents of the music.",
    "sync-bad": "{bad} of {n} hits miss the accents:",
    "sync-fix": "Have the AI fix it",
    "sync-analyzing": "Analysing the music\u2026",
    "snap": "Snap",
    "snap-bar": "Bar",
    "snap-beat": "Beat",
    "snap-half": "\xBD beat",
    "snap-quarter": "\xBC beat",
    "snap-off": "Off",
    "zoom-in": "Zoom in",
    "zoom-out": "Zoom out",
    "zoom-fit": "Fit",
    "zoom-fit-hint": "Fit the whole film",
    "shortcut-zoom": "Zoom at the pointer",
    "wheel-or-pinch": "wheel / pinch",
    "timeline-docked": "The timeline is in the bottom panel, which is closed",
    "timeline-show": "Show timeline",
    "timeline-no-project": "Open a project in Video Studio to see its timeline here.",
    "roll-hint": "Drag the right edge to change the length: the next scene gives way and later cuts stay put. Hold Alt to push everything after it.",
    "hit-hint": "Drag to move a hit, double-click empty space to add one, Delete removes the selected one.",
    "external": "The AI or another editor changed this file; loaded. You can undo it.",
    "conflict": "The file changed elsewhere while you have unsaved edits here.",
    "conflict-load": "Load the file's version",
    "conflict-keep": "Keep mine",
    "ai-title": "AI Director",
    "ai-placeholder": 'What should the AI do? For example: after "cards", add a scene about Skills that cuts every four beats.',
    "ai-send": "Send",
    "ai-no-host": "Tangu is not available here; the prompt is on your clipboard for any agent.",
    "ai-chip-scene": "Write a new scene",
    "ai-chip-pace": "Tighten the pacing",
    "ai-chip-copy": "Polish all the copy",
    "ai-chip-score": "Score this video",
    "ai-chip-sync": "Check and fix the sync",
    "ai-chip-review": "Review the cut",
    "ai-started": "Handed to the Video Studio Director. The editor reloads the file when it is done.",
    "errors-runtime": "Script errors",
    "new-project": "New video project",
    "embed-open": "Open in Video Studio",
    "time": "Time",
    "scene-count": "{n} scenes",
    "preview": "Preview",
    "properties": "Properties",
    "timeline": "Timeline",
    "video-track": "Scenes",
    "audio-track": "Score",
    "previous-scene": "Previous scene",
    "next-scene": "Next scene",
    "frame-back": "Previous frame",
    "frame-forward": "Next frame",
    "focus-preview": "Focus preview",
    "exit-focus": "Back to editing",
    "toggle-properties": "Properties",
    "mute": "Mute",
    "unmute": "Unmute",
    "timing-section": "Timing and hits",
    "advanced": "Advanced settings",
    "scene-actions": "Scene actions",
    "sync-short": "{bad} / {n} hits to check",
    "sync-short-ok": "{n} hits aligned",
    "resize-timeline": "Resize timeline",
    "apply-code": "Apply",
    "scene-duration": "{n} s",
    "zoom-level": "Timeline zoom",
    "audio-source": "Audio file",
    "close": "Close",
    "split": "Split at playhead",
    "import-media": "Import media",
    "shortcuts": "Keyboard shortcuts",
    "trim-hint": "Drag the left edge to trim the start: the previous scene gives way and later cuts stay put. Hold Alt to pull everything after it.",
    "trim-unsupported": "Trimming the start of a scene is not available in this version.",
    "scene-in": "In point",
    "scene-in-hint": "Where the scene's content starts playing. Splitting or trimming the start sets it.",
    "transition": "Transition",
    "transition-type": "Type",
    "transition-dur": "Length",
    "transition-first": "The first scene has nothing before it to transition from.",
    "tr-none": "None (cut)",
    "tr-fade": "Crossfade",
    "tr-dip": "Dip to background",
    "tr-slide-left": "Slide in from right",
    "tr-slide-up": "Slide in from below",
    "tr-push-left": "Push left",
    "tr-wipe-left": "Wipe",
    "tr-zoom": "Zoom",
    "tr-blur": "Blur",
    "sync-hit": "On an accent",
    "sync-miss": "Misses the accents",
    "sync-quiet": "Cut to quiet",
    "scene-none-yet": "No scenes yet. Use New scene, or drop pictures and videos here.",
    "blank-title": "No scenes yet",
    "blank-body": "Add a scene, import media, or hand your idea to the AI Director.",
    "audio-track-n": "Track {n}",
    "drop-audio": "or drop music or sound here",
    "score-ask": "Ask for a score",
    "rail-hint": 'Open "{tab}" in the properties',
    "lane-hint": "Drag to move it in time",
    "audio-in": "In (s)",
    "audio-dur": "Length (s)",
    "audio-dur-full": "To the end",
    "split-edge": "The playhead is too close to the scene's edge to split there.",
    "copy-title": "{title} copy",
    "import-unsupported": "This host cannot write files, so media cannot be imported.",
    "import-skip": "Unsupported file type: {name}",
    "imported": "Media imported. You can undo it.",
    "templates": "New scene",
    "templates-hint": "Pick a layout; every word can be changed afterwards.",
    "key-space": "Space",
    "shortcut-frame": "Step one frame",
    "shortcut-beat": "Step one beat",
    "shortcut-scene": "Previous / next scene",
    "shortcut-text": "Edit on-screen text",
    "shortcut-dblclick": "Double-click",
    "score-hint": "The AI Director writes an original score on the hits",
    "frame-at": "Frame {n}",
    "inline-hint": "Enter to apply \xB7 Esc to cancel",
    "unit": "Unit",
    "unit-bar": "bars",
    "unit-beat": "beats",
    "unit-sec": "seconds",
    "media": "Media",
    "clip-in": "In (s)",
    "clip-mute": "Mute",
    "replace-media": "Replace",
    "placeholder-image": "Placeholder",
    "code-scope": "Code scope",
    "frame-section": "Frame",
    "frame-landscape": "Landscape 16:9",
    "frame-portrait": "Portrait 9:16",
    "frame-square": "Square 1:1",
    "frame-classic": "4:3",
    "frame-4k": "4K 16:9",
    "tempo-section": "Tempo",
    "tempo-none": "No beat grid",
    "tempo-hint": "With a tempo, lengths and hits count in bars and beats, so cuts line up with the music.",
    "fx-cut": "Cut",
    "fx-fade": "Fade",
    "fx-up": "Rise",
    "fx-down": "Drop",
    "fx-left": "From right",
    "fx-right": "From left",
    "fx-pop": "Pop",
    "fx-type": "Type",
    "export-range": "Range",
    "export-range-all": "Whole video",
    "export-range-scene": "Selected scene",
    "export-range-custom": "Custom",
    "director-context": "Sent with your request",
    "director-quick": "Quick tasks",
    "ai-send-hint": "\u2318/Ctrl + Enter to send",
    "new-project-short": "New project",
    "new-video": "New video",
    "launch-projects": "My projects",
    "nav-create": "Create",
    "close-project": "Close project",
    "bin": "Media",
    "bin-no-project": "Open a project to see its media here.",
    "chat": "Chat",
    "chat-no-project": "Open a project to talk to the AI Director here.",
    "chat-open": "Open the conversation",
    "chat-task-ready": "Written into the conversation on the right. Press Enter to send it to the Director.",
    "ai-ask-score": "Compose an original score for this video: put its accents on the scenes\u2019 hits, add it to the project, then run the sync check.",
    "ai-ask-sync": "Check that the cuts land on the music\u2019s accents, fix the ones that miss, and tell me what you changed.",
    "ai-ask-review": "Review the cut (look at a contact sheet) and give me a short list of concrete improvements. Do not change anything until I agree.",
    "launch-projects-sub": "Pick up a project where you left off, or start from a new idea.",
    "launch-count": "Name \xB7 {n}",
    "launch-col-meta": "Frame \xB7 length",
    "launch-empty": "No video projects yet",
    "launch-empty-hint": "Choose New video to start.",
    "launch-no-match": "No matching projects",
    "launch-back": "Back to projects",
    "launch-create-title": "Make a new video",
    "launch-create-sub": "Give it a name and a frame. Your idea can go to the AI Director first.",
    "launch-idea": "What do you want to make?",
    "optional": "Optional",
    "launch-idea-placeholder": "For example: a 30-second launch video with a brisk pace that ends on the logo.",
    "launch-frame": "Frame",
    "launch-name": "Project name",
    "launch-create": "Create project",
    "launch-where": "The project and its media go in {path}/.",
    "launch-folder": "Location",
    "launch-folder-hint": "A folder in your library. Leave empty for the default",
    "launch-folder-invalid": "The location is a folder in your library, such as Videos/2026.",
    "project-rename": "Rename\u2026",
    "project-rename-title": "Project name",
    "project-delete": "Delete",
    "project-deleted-file": "Only the project file of \u201C{name}\u201D went to the recycle bin: its folder holds other files, which were left alone.",
    "project-delete-failed": "Could not delete \u201C{name}\u201D.",
    "launch-idea-note": "If you describe an idea, it goes into the AI Director for you to review and send.",
    "launch-name-invalid": "Names can't start or end with a dot, or contain / \\ : * ? \" < > |",
    "launch-name-taken": "A folder with this name already exists. Try another name.",
    "launch-no-library": "No library is open, so there is nowhere to save the project. Open a library in Notes, then come back.",
    "default-name": "New video",
    "bin-import": "Import",
    "bin-import-hint": "Copies files into the project's media folder without adding them to the timeline",
    "bin-empty": "Drop pictures, clips or sounds here, or click Import.",
    "bin-used": "Used",
    "bin-hint": "Double-click: add after the scene at the playhead. Drag to the timeline: place at a cut.",
    "bin-outside": "This file isn't in the open project's folder.",
    "bin-filter": "Filter media",
    "bin-filter-all": "All",
    "bin-filter-image": "Pictures",
    "bin-filter-video": "Clips",
    "bin-filter-audio": "Sounds",
    "bin-filter-unused": "Unused",
    "bin-filter-ai": "AI-generated",
    "bin-filter-none": "No media matches this filter.",
    "bin-ai": "AI",
    "bin-place": "Add after the playhead",
    "bin-reveal": "Show in folder",
    "bin-delete": "Delete",
    "bin-delete-used": "Still used by a scene"
  };
  function makeT(ctx2) {
    const en = () => String(ctx2.getLocale && ctx2.getLocale() || "zh").startsWith("en");
    const t2 = (k, vars = {}) => {
      const s = (en() ? EN : ZH)[k] ?? ZH[k] ?? k;
      return s.replace(/\{(\w+)\}/g, (m, key) => key in vars ? String(vars[key]) : m);
    };
    t2.en = en;
    return t2;
  }

  // src/lib/project.js
  var FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})(.*)$/;
  var HEADING = /^ {0,3}(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/;
  var SCENE_HEAD = /^([A-Za-z][\w-]*)(?:\s*(?:·|—|–|-|:|：|\|)\s*(.*))?$/;
  var ID_RE = /^[A-Za-z][\w-]*$/;
  var DEFAULTS = { width: 1920, height: 1080, fps: 30 };
  var TRANSITIONS = ["fade", "dip", "slide-left", "slide-up", "push-left", "wipe-left", "zoom", "blur"];
  function tokenize(src) {
    const eol = /\r\n/.test(src) ? "\r\n" : "\n";
    const text = src.replace(/\r\n/g, "\n");
    const lines = text.split("\n");
    const endsWithNl = text.endsWith("\n");
    if (endsWithNl) lines.pop();
    const toks = [];
    let buf = [], bufLine = 1;
    const flush = () => {
      if (buf.length) {
        toks.push({ kind: "text", raw: buf.join(""), line: bufLine });
        buf = [];
      }
    };
    for (let i = 0; i < lines.length; i++) {
      const nl = i < lines.length - 1 || endsWithNl ? "\n" : "";
      const line = lines[i];
      const f = line.match(FENCE_OPEN);
      if (f && !(f[2][0] === "`" && f[3].includes("`"))) {
        flush();
        const fence2 = f[2], info = f[3].trim();
        const close = new RegExp("^ {0,3}".concat(fence2[0] === "`" ? "`" : "~", "{").concat(fence2.length, ",}[ \\t]*$"));
        const body = [];
        let j = i + 1, closed = false;
        for (; j < lines.length; j++) {
          if (close.test(lines[j])) {
            closed = true;
            break;
          }
          body.push(lines[j]);
        }
        const last = closed ? j : lines.length - 1;
        const rawLines = lines.slice(i, last + 1);
        const rawNl = last < lines.length - 1 || endsWithNl ? "\n" : "";
        const [lang = "", ...tags] = info.split(/\s+/).filter(Boolean);
        toks.push({ kind: "fence", raw: rawLines.join("\n") + rawNl, line: i + 1, fence: fence2, info, lang: lang.toLowerCase(), tags: tags.map((t2) => t2.toLowerCase()), body: body.join("\n"), closed, indent: f[1] });
        i = last;
        continue;
      }
      const h2 = line.match(HEADING);
      if (h2) {
        flush();
        toks.push({ kind: "heading", raw: line + nl, line: i + 1, level: h2[1].length, text: h2[2] });
        continue;
      }
      if (!buf.length) bufLine = i + 1;
      buf.push(line + nl);
    }
    flush();
    return { toks, eol };
  }
  function fenceRaw(tok) {
    let fence2 = tok.fence || "```";
    const ch = fence2[0];
    const runs = tok.body.match(new RegExp("^ {0,3}\\".concat(ch, "{3,}"), "gm")) || [];
    const longest = Math.max(0, ...runs.map((r) => r.trim().length));
    if (longest >= fence2.length) fence2 = ch.repeat(longest + 1);
    const info = tok.info ? tok.info : "";
    return "".concat(fence2).concat(info, "\n").concat(tok.body ? tok.body + "\n" : "").concat(fence2, "\n");
  }
  function serializeTokens(toks, eol = "\n") {
    let out = "";
    for (const t2 of toks) {
      let raw = t2.raw;
      if (t2.dirty) raw = t2.kind === "fence" ? fenceRaw(t2) : t2.kind === "heading" ? "".concat("#".repeat(t2.level), " ").concat(t2.text, "\n") : raw;
      if (out && !out.endsWith("\n")) out += "\n";
      out += raw;
    }
    return eol === "\n" ? out : out.replace(/\n/g, eol);
  }
  var UNIT = /^\s*(-?\d+(?:\.\d+)?)\s*(bars?|beats?|b|s|sec|secs|seconds?|ms|小节|拍|秒)?\s*$/i;
  function tempoOf(meta) {
    const t2 = meta && meta.tempo;
    if (!t2 || !(+t2.bpm > 0)) return null;
    const beatsPerBar = +t2.beatsPerBar > 0 ? +t2.beatsPerBar : 4;
    const beat = 60 / +t2.bpm;
    return { bpm: +t2.bpm, beatsPerBar, beat, bar: beat * beatsPerBar };
  }
  function parseLength(v, tempo) {
    if (typeof v === "number" && isFinite(v)) return v;
    const m = typeof v === "string" && v.match(UNIT);
    if (!m) throw new Error("cannot read length ".concat(JSON.stringify(v), ' (use "4 bars", "6 beats" or "2.5s")'));
    const x = +m[1], u = (m[2] || "s").toLowerCase();
    if (/^(bars?|小节)$/.test(u)) {
      if (!tempo) throw new Error('"'.concat(v, '" needs a tempo in the project settings'));
      return x * tempo.bar;
    }
    if (/^(beats?|b|拍)$/.test(u)) {
      if (!tempo) throw new Error('"'.concat(v, '" needs a tempo in the project settings'));
      return x * tempo.beat;
    }
    if (u === "ms") return x / 1e3;
    return x;
  }
  var round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;
  function formatLength(sec, tempo) {
    if (!tempo) return "".concat(round(sec, 3), "s");
    const beats = round(sec / tempo.beat, 4);
    const bars = beats / tempo.beatsPerBar;
    if (Math.abs(bars - Math.round(bars)) < 1e-6) return "".concat(Math.round(bars), " ").concat(Math.round(bars) === 1 ? "bar" : "bars");
    return "".concat(beats, " ").concat(beats === 1 ? "beat" : "beats");
  }
  var hitUnit = (tempo) => tempo ? tempo.beat : 1;
  function readJSON(tok, where, errors) {
    if (!tok.body.trim()) return {};
    try {
      const v = JSON.parse(tok.body);
      if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("settings must be a JSON object");
      return v;
    } catch (e) {
      errors.push({ level: "error", line: tok.line, scene: where, message: "invalid JSON in settings: ".concat(e.message) });
      return null;
    }
  }
  var isFvs = (t2) => t2.kind === "fence" && (t2.lang === "fvs" || t2.lang === "json" && t2.tags.includes("fvs"));
  var isLang = (t2, ...langs) => t2.kind === "fence" && langs.includes(t2.lang) && !isFvs(t2);
  var LANG = { html: ["html", "htm"], js: ["js", "javascript", "mjs"], css: ["css"], captions: ["srt", "vtt"] };
  var CUE_TIME = /^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/;
  var cueTime = (s) => {
    const m = String(s).trim().match(CUE_TIME);
    return m ? +(m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + (m[4] ? +m[4].padEnd(3, "0") / 1e3 : 0) : NaN;
  };
  function parseSrt(text) {
    const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
    const cues = [], errors = [];
    for (let i = 0; i < lines.length; ) {
      if (!lines[i].trim()) {
        i++;
        continue;
      }
      const from = i;
      while (i < lines.length && lines[i].trim()) i++;
      const block = lines.slice(from, i);
      if (/^(WEBVTT|NOTE|STYLE|REGION)\b/.test(block[0])) continue;
      const k = block.findIndex((l) => l.includes("-->"));
      if (k < 0) {
        errors.push({ line: from + 1, message: 'caption without a time line ("00:00:01,000 --> 00:00:03,000")' });
        continue;
      }
      const [a, rest] = block[k].split("-->"), start = cueTime(a), end = cueTime(rest.trim().split(/\s+/)[0]);
      if (!Number.isFinite(start) || !Number.isFinite(end)) {
        errors.push({ line: from + k + 1, message: 'cannot read caption times "'.concat(block[k].trim(), '" (use 00:00:01,000 --> 00:00:03,000)') });
        continue;
      }
      if (!(end > start)) {
        errors.push({ line: from + k + 1, message: "caption ends before it starts (".concat(block[k].trim(), ")") });
        continue;
      }
      cues.push({ start, end, text: block.slice(k + 1).join("\n").trim(), line: from + k + 1, raw: block[k].trim() });
    }
    return { cues, errors };
  }
  var srtTime = (sec) => {
    const ms = Math.max(0, Math.round(sec * 1e3)), p = (n, w = 2) => String(n).padStart(w, "0");
    return "".concat(p(Math.floor(ms / 36e5)), ":").concat(p(Math.floor(ms / 6e4) % 60), ":").concat(p(Math.floor(ms / 1e3) % 60), ",").concat(p(ms % 1e3, 3));
  };
  function formatSrt(cues) {
    return [...cues].sort((a, b) => a.start - b.start).map((c, i) => "".concat(i + 1, "\n").concat(srtTime(c.start), " --> ").concat(srtTime(c.end), "\n").concat(String(c.text ?? "").replace(/\r\n?/g, "\n").replace(/\n\s*\n/g, "\n").trim())).join("\n\n");
  }
  function parseProject(src) {
    const { toks, eol } = tokenize(String(src ?? ""));
    const errors = [];
    const p = { eol, toks, meta: { ...DEFAULTS }, metaTok: -1, rawMeta: null, css: [], stageHtml: -1, stageJs: -1, captionsTok: -1, captionsIgnored: 0, captions: [], scenes: [], errors };
    let i = 0;
    for (; i < toks.length; i++) {
      const t2 = toks[i];
      if (t2.kind === "heading" && t2.level === 2) break;
      if (t2.kind === "fence" && !t2.closed) errors.push({ level: "error", line: t2.line, message: "code block is never closed" });
      if (isFvs(t2)) {
        if (p.metaTok >= 0) {
          errors.push({ level: "warning", line: t2.line, message: "second project settings block ignored" });
          continue;
        }
        p.metaTok = i;
        const m = readJSON(t2, null, errors);
        if (m) {
          p.rawMeta = m;
          p.meta = { ...DEFAULTS, ...m };
        }
      } else if (isLang(t2, ...LANG.css)) p.css.push(i);
      else if (isLang(t2, ...LANG.captions)) {
        if (p.captionsTok < 0) p.captionsTok = i;
        else {
          p.captionsIgnored++;
          errors.push({ level: "warning", line: t2.line, captions: true, message: "second captions block ignored (one ```srt track per project)" });
        }
      } else if (isLang(t2, ...LANG.html) && (t2.tags.includes("stage") || p.stageHtml < 0)) {
        if (p.stageHtml < 0) p.stageHtml = i;
      } else if (isLang(t2, ...LANG.js) && (t2.tags.includes("stage") || p.stageJs < 0)) {
        if (p.stageJs < 0) p.stageJs = i;
      }
    }
    if (p.metaTok < 0) errors.push({ level: "warning", line: 1, message: "no ```fvs project settings block; using 1920\xD71080 at 30 fps" });
    while (i < toks.length) {
      const head = toks[i];
      const s = { head: i, first: i, last: i, metaTok: -1, htmlTok: -1, jsTok: -1, cssTok: -1, meta: {}, title: "", id: "" };
      const hm = head.text.match(SCENE_HEAD);
      if (hm) {
        s.id = hm[1];
        s.title = (hm[2] || "").trim();
      } else {
        s.id = "";
        s.title = head.text;
        errors.push({ level: "error", line: head.line, message: 'scene heading "'.concat(head.text, '" must start with an id (letters, digits, - or _), e.g. "## intro \xB7 \u5F00\u573A"') });
      }
      for (i++; i < toks.length; i++) {
        const t2 = toks[i];
        if (t2.kind === "heading" && t2.level <= 2) break;
        s.last = i;
        if (t2.kind === "fence" && !t2.closed) errors.push({ level: "error", line: t2.line, scene: s.id, message: "code block is never closed" });
        if (isFvs(t2)) {
          if (s.metaTok < 0) {
            s.metaTok = i;
            s.meta = readJSON(t2, s.id, errors) || {};
          }
        } else if (isLang(t2, ...LANG.captions)) errors.push({ level: "warning", line: t2.line, scene: s.id, captions: true, message: "a captions block inside a scene is ignored; move it before the first scene" });
        else for (const k of ["html", "js", "css"]) if (isLang(t2, ...LANG[k])) {
          if (s["".concat(k, "Tok")] < 0) s["".concat(k, "Tok")] = i;
          else errors.push({ level: "warning", line: t2.line, scene: s.id, message: "second `".concat(k, '` block in scene "').concat(s.id, '" is ignored') });
        }
      }
      if (head.level === 1) continue;
      p.scenes.push(s);
    }
    computeTimeline(p);
    return p;
  }
  function inPoint(meta, tempo) {
    if (meta.in === void 0 || meta.in === null) return 0;
    const v = parseLength(meta.in, tempo);
    if (!(v >= 0)) throw new Error('"in" must not be negative, got '.concat(JSON.stringify(meta.in)));
    return v;
  }
  function readTransition(v, tempo) {
    const type = typeof v === "string" ? v : v && typeof v === "object" && !Array.isArray(v) ? v.type : void 0;
    if (typeof type !== "string") throw new Error('"transition" must be a type such as "fade", or { "type": "fade", "dur": "1 beat" }');
    if (!TRANSITIONS.includes(type)) throw new Error('unknown transition "'.concat(type, '" (use ').concat(TRANSITIONS.join(", "), ")"));
    const raw = typeof v === "object" ? v.dur : void 0;
    const dur = raw === void 0 || raw === null ? tempo ? tempo.beat : 0.5 : parseLength(raw, tempo);
    if (!(dur > 0)) throw new Error('transition "dur" must be positive, got '.concat(JSON.stringify(raw)));
    return { type, dur };
  }
  function computeTimeline(p) {
    const tempo = tempoOf(p.meta);
    p.tempo = tempo;
    const seen = /* @__PURE__ */ new Set();
    const body = (s, k) => s["".concat(k, "Tok")] >= 0 ? p.toks[s["".concat(k, "Tok")]].body : "";
    let t2 = 0;
    for (const [k, s] of p.scenes.entries()) {
      s.index = k;
      s.html = body(s, "html");
      s.js = body(s, "js");
      s.css = body(s, "css");
      s.line = p.toks[s.head].line;
      const metaLine2 = s.metaTok >= 0 ? p.toks[s.metaTok].line : s.line;
      if (s.id && seen.has(s.id)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: 'duplicate scene id "'.concat(s.id, '"') });
      seen.add(s.id);
      let len = 0;
      try {
        if (s.meta.length === void 0) throw new Error('scene has no "length" (e.g. "length": "2 bars")');
        len = parseLength(s.meta.length, tempo);
        if (!(len > 0)) throw new Error("length must be positive, got ".concat(JSON.stringify(s.meta.length)));
      } catch (e) {
        p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });
        len = len > 0 ? len : tempo ? tempo.bar : 2;
      }
      s.t0 = t2;
      s.dur = len;
      s.t1 = t2 + len;
      t2 = s.t1;
      s.in = 0;
      try {
        s.in = inPoint(s.meta, tempo);
      } catch (e) {
        p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message.startsWith('"in"') ? e.message : '"in": '.concat(e.message) });
      }
      s.t0v = s.t0 - s.in;
      s.transition = null;
      if (s.meta.transition !== void 0 && s.meta.transition !== null) {
        try {
          const tr = readTransition(s.meta.transition, tempo);
          if (k === 0) p.errors.push({ level: "warning", line: metaLine2, scene: s.id, message: 'the first scene has nothing to transition from; its "transition" is ignored' });
          else s.transition = { type: tr.type, dur: Math.min(tr.dur, len) };
        } catch (e) {
          p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });
        }
      }
      const u = hitUnit(tempo);
      const hits = Array.isArray(s.meta.hits) ? s.meta.hits : [];
      if (s.meta.hits !== void 0 && !Array.isArray(s.meta.hits)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: '"hits" must be an array of numbers' });
      s.hits = hits.filter((h2) => typeof h2 === "number" && isFinite(h2));
      if (s.hits.length !== hits.length) p.errors.push({ level: "error", line: s.line, scene: s.id, message: '"hits" must contain numbers only' });
      for (let j = 1; j < s.hits.length; j++) if (s.hits[j] < s.hits[j - 1]) {
        p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "hits are not in ascending order" });
        break;
      }
      const end = s.in + len, next = p.scenes[k + 1];
      let continued = false;
      if (next) {
        try {
          continued = inPoint(next.meta, tempo) > 0 && body(next, "html") === s.html && body(next, "css") === s.css && body(next, "js") === s.js;
        } catch {
          continued = false;
        }
      }
      s.continued = continued;
      if (s.hits.some((h2) => h2 < 0 || h2 * u > end + 1e-6 && !continued)) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "a hit falls outside the scene (0\u2013".concat(round(end / u, 3), " ").concat(tempo ? "beats" : "s", ")") });
      s.hitTimes = s.hits.map((h2) => t0Round(s.t0v + h2 * u));
      if (!s.html.trim() && !s.js.trim()) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "scene has no html or js block" });
    }
    p.length = t2;
    const m = p.meta;
    const metaLine = p.metaTok >= 0 ? p.toks[p.metaTok].line : 1;
    for (const k of ["width", "height", "fps"]) if (!(+m[k] > 0)) p.errors.push({ level: "error", line: metaLine, message: '"'.concat(k, '" must be a positive number') });
    checkAudio(p, metaLine);
    readCaptions(p, metaLine);
    if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, code: "no-scenes", message: 'the project has no scenes yet (add a "## id \xB7 Title" section)' });
  }
  function checkAudio(p, line) {
    const raw = p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio];
    raw.forEach((a, i) => {
      if (!a || typeof a !== "object") return;
      const name = "audio track ".concat(i + 1).concat(a.src ? " (".concat(a.src, ")") : "");
      for (const [k, min] of [["in", 0], ["dur", 1e-9]]) {
        if (a[k] === void 0 || a[k] === null) continue;
        try {
          const v = parseLength(a[k], p.tempo);
          if (!(v >= min)) throw new Error(k === "in" ? "must not be negative" : "must be positive");
        } catch (e) {
          p.errors.push({ level: "error", line, message: "".concat(name, ' "').concat(k, '": ').concat(e.message) });
        }
      }
    });
  }
  var CAPTION_POSITIONS = ["bottom", "top"];
  var CAPTION_SIZES = ["small", "medium", "large"];
  function captionStyle(meta) {
    const c = meta && meta.captions && typeof meta.captions === "object" ? meta.captions : {};
    return { position: CAPTION_POSITIONS.includes(c.position) ? c.position : "bottom", size: CAPTION_SIZES.includes(c.size) ? c.size : "medium" };
  }
  function readCaptions(p, metaLine) {
    const c = p.meta.captions;
    if (c !== void 0 && c !== null && (typeof c !== "object" || Array.isArray(c) || c.position !== void 0 && !CAPTION_POSITIONS.includes(c.position) || c.size !== void 0 && !CAPTION_SIZES.includes(c.size))) {
      p.errors.push({ level: "warning", line: metaLine, captions: true, message: '"captions" settings: use { "position": "'.concat(CAPTION_POSITIONS.join('" | "'), '", "size": "').concat(CAPTION_SIZES.join('" | "'), '" }') });
    }
    if (p.captionsTok < 0) return;
    const tok = p.toks[p.captionsTok], base = tok.line;
    const { cues, errors } = parseSrt(tok.body);
    for (const e of errors) p.errors.push({ level: "error", line: base + e.line, captions: true, message: e.message });
    p.captions = cues.map((x) => ({ ...x, line: base + x.line }));
    const late = p.scenes.length ? p.captions.find((x) => x.start >= p.length - 1e-6) : null;
    if (late) p.errors.push({ level: "warning", line: late.line, captions: true, message: "a caption starts at ".concat(round(late.start, 3), " s, after the end of the video (").concat(round(p.length, 3), " s)") });
  }
  var t0Round = (x) => Math.round(x * 1e9) / 1e9;
  var cssBlocks = (p) => p.css.map((k) => p.toks[k].body);
  var stageHtml = (p) => p.stageHtml >= 0 ? p.toks[p.stageHtml].body : "";
  var stageJs = (p) => p.stageJs >= 0 ? p.toks[p.stageJs].body : "";
  var sceneById = (p, id) => p.scenes.find((s) => s.id === id) || null;
  var visibleHits = (s) => (s.hitTimes || []).map((t2, index) => ({ index, t: t2 })).filter((h2) => h2.t >= s.t0 - 1e-6 && (s.continued ? h2.t < s.t1 - 1e-6 : h2.t <= s.t1 + 1e-6));
  function formatJSON(v, width = 88, indent = "") {
    const one = oneLine(v);
    if (one.length + indent.length <= width || v === null || typeof v !== "object") return one;
    const ind = indent + "  ";
    if (Array.isArray(v)) return "[\n".concat(v.map((x) => ind + formatJSON(x, width, ind)).join(",\n"), "\n").concat(indent, "]");
    return "{\n".concat(Object.entries(v).filter(([, x]) => x !== void 0).map(([k, x]) => "".concat(ind).concat(JSON.stringify(k), ": ").concat(formatJSON(x, width, ind))).join(",\n"), "\n").concat(indent, "}");
  }
  function oneLine(v) {
    if (Array.isArray(v)) return "[".concat(v.map(oneLine).join(", "), "]");
    if (v && typeof v === "object") {
      const e = Object.entries(v).filter(([, x]) => x !== void 0);
      return e.length ? "{ ".concat(e.map(([k, x]) => "".concat(JSON.stringify(k), ": ").concat(oneLine(x))).join(", "), " }") : "{}";
    }
    return JSON.stringify(v);
  }
  function edit(src, fn) {
    const p = parseProject(src);
    fn(p);
    return serializeTokens(p.toks, p.eol);
  }
  var fence = (info, body) => ({ kind: "fence", info, lang: info.split(/\s+/)[0], tags: info.split(/\s+/).slice(1), body, fence: "```", dirty: true, raw: "", closed: true });
  var textTok = (raw) => ({ kind: "text", raw });
  function merge(obj, patch) {
    const out = { ...obj };
    for (const [k, v] of Object.entries(patch)) {
      if (v === void 0 || v === null) delete out[k];
      else out[k] = v;
    }
    return out;
  }
  function need(p, id) {
    const s = sceneById(p, id);
    if (!s) throw new Error('no scene "'.concat(id, '"'));
    return s;
  }
  function setProjectMeta(src, patch) {
    return edit(src, (p) => {
      const next = merge(p.rawMeta || {}, patch);
      if (p.metaTok >= 0) Object.assign(p.toks[p.metaTok], { body: formatJSON(next, 60), dirty: true });
      else {
        let at = 0;
        while (at < p.toks.length && p.toks[at].kind !== "fence" && !(p.toks[at].kind === "heading" && p.toks[at].level === 2)) at++;
        p.toks.splice(at, 0, fence("fvs", formatJSON(next, 60)), textTok("\n"));
      }
    });
  }
  function setProjectBlock(src, which, body, index = 0) {
    return edit(src, (p) => {
      const k = which === "css" ? p.css[index] ?? -1 : which === "html" ? p.stageHtml : p.stageJs;
      if (k >= 0) {
        Object.assign(p.toks[k], { body, dirty: true });
        return;
      }
      const info = which === "css" ? "css" : "".concat(which, " stage");
      let at = p.scenes.length ? p.scenes[0].first : p.toks.length;
      p.toks.splice(at, 0, fence(info, body), textTok("\n"));
    });
  }
  function setCaptions(src, cues) {
    const ms = (x) => Math.round(x * 1e3);
    for (const c of cues) if (!(Number.isFinite(c.start) && Number.isFinite(c.end) && ms(c.start) >= 0 && ms(c.end) > ms(c.start))) throw new Error("caption times must satisfy 0 \u2264 start < end (in whole milliseconds), got ".concat(c.start, " \u2192 ").concat(c.end));
    const body = formatSrt(cues);
    return edit(src, (p) => {
      const k = p.captionsTok;
      if (k >= 0) {
        if (body || p.captionsIgnored) {
          Object.assign(p.toks[k], { body, info: "srt", lang: "srt", tags: [], dirty: true });
          return;
        }
        const next = p.toks[k + 1];
        p.toks.splice(k, next && next.kind === "text" && next.raw === "\n" ? 2 : 1);
        return;
      }
      if (!body) return;
      const at = p.scenes.length ? p.scenes[0].first : p.toks.length;
      const before = serializeTokens(p.toks.slice(0, at));
      p.toks.splice(at, 0, ...before && !/\n\n$/.test(before) ? [textTok("\n")] : [], fence("srt", body), textTok("\n"));
    });
  }
  function setSceneMeta(src, id, patch) {
    return edit(src, (p) => {
      const s = need(p, id);
      const next = merge(s.meta, patch);
      if (s.metaTok >= 0) Object.assign(p.toks[s.metaTok], { body: formatJSON(next), dirty: true });
      else p.toks.splice(s.head + 1, 0, textTok("\n"), fence("fvs", formatJSON(next)));
    });
  }
  function setSceneBlock(src, id, kind, body) {
    return edit(src, (p) => {
      const s = need(p, id);
      const k = s["".concat(kind, "Tok")];
      if (k >= 0) {
        Object.assign(p.toks[k], { body, dirty: true });
        return;
      }
      const after = kind === "html" ? [s.metaTok] : kind === "css" ? [s.htmlTok, s.metaTok] : [s.cssTok, s.htmlTok, s.metaTok];
      const at = (after.find((x) => x >= 0) ?? s.head) + 1;
      p.toks.splice(at, 0, textTok("\n"), fence(kind, body));
    });
  }
  function renameScene(src, id, nextId, title) {
    if (nextId !== void 0 && !ID_RE.test(nextId)) throw new Error('scene id "'.concat(nextId, '" must start with a letter and use letters, digits, - or _'));
    return edit(src, (p) => {
      const s = need(p, id);
      if (nextId && nextId !== id && sceneById(p, nextId)) throw new Error('scene id "'.concat(nextId, '" is taken'));
      const h2 = p.toks[s.head];
      const t2 = title === void 0 ? s.title : title;
      Object.assign(h2, { text: "".concat(nextId || id).concat(t2 ? " \xB7 ".concat(t2) : ""), level: 2, dirty: true });
    });
  }
  function sceneSection({ id, title = "", meta = {}, html = "", css = "", js = "" }) {
    if (!ID_RE.test(id)) throw new Error('scene id "'.concat(id, '" must start with a letter and use letters, digits, - or _'));
    let out = "## ".concat(id).concat(title ? " \xB7 ".concat(title) : "", "\n\n```fvs\n").concat(formatJSON(meta), "\n```\n");
    if (html) out += "\n```html\n".concat(html.replace(/\n$/, ""), "\n```\n");
    if (css) out += "\n```css\n".concat(css.replace(/\n$/, ""), "\n```\n");
    if (js) out += "\n```js\n".concat(js.replace(/\n$/, ""), "\n```\n");
    return out;
  }
  function insertScene(src, afterId, scene) {
    return edit(src, (p) => {
      if (sceneById(p, scene.id)) throw new Error('scene id "'.concat(scene.id, '" is taken'));
      const tok = textTok(sceneSection(scene));
      let at;
      if (afterId === "") at = p.scenes.length ? p.scenes[0].first : p.toks.length;
      else if (afterId == null) at = p.scenes.length ? p.scenes[p.scenes.length - 1].last + 1 : p.toks.length;
      else at = need(p, afterId).last + 1;
      const before = serializeTokens(p.toks.slice(0, at));
      const lead = before && !/\n\n$/.test(before) ? "\n" : "";
      p.toks.splice(at, 0, textTok(lead + tok.raw + (at < p.toks.length ? "\n" : "")));
    });
  }
  function deleteScene(src, id) {
    return edit(src, (p) => {
      const s = need(p, id);
      p.toks.splice(s.first, s.last - s.first + 1);
    });
  }
  function moveScene(src, id, to) {
    return edit(src, (p) => {
      const s = need(p, id);
      const n = p.scenes.length;
      to = Math.max(0, Math.min(n - 1, to));
      if (to === s.index) return;
      let chunk = p.toks.slice(s.first, s.last + 1);
      const rest = p.scenes.filter((x) => x !== s);
      const tail = chunk[chunk.length - 1];
      const raw = tail.dirty ? serializeTokens([tail]) : tail.raw;
      if (!/\n\n$/.test(raw)) chunk = [...chunk, textTok(raw.endsWith("\n") ? "\n" : "\n\n")];
      p.toks.splice(s.first, s.last - s.first + 1);
      const shift = (x) => x > s.last ? x - (s.last - s.first + 1) : x;
      const at = to >= rest.length ? shift(rest[rest.length - 1].last) + 1 : shift(rest[to].first);
      p.toks.splice(at, 0, ...chunk);
    });
  }
  function duplicateScene(src, id, nextId, title) {
    const p = parseProject(src);
    const s = need(p, id);
    const t2 = typeof title === "string" ? title : s.title ? "".concat(s.title, "\uFF08\u526F\u672C\uFF09") : "";
    return insertScene(src, id, { id: nextId, title: t2, meta: s.meta, html: s.html, css: s.css, js: s.js });
  }
  function freeId(p, base = "scene") {
    const ids = new Set(p.scenes.map((s) => s.id));
    base = (base.match(/[A-Za-z][\w-]*/) || ["scene"])[0];
    if (!ids.has(base)) return base;
    for (let k = 2; ; k++) if (!ids.has("".concat(base, "-").concat(k))) return "".concat(base, "-").concat(k);
  }
  function setSceneLength(src, id, sec) {
    const p = parseProject(src);
    return setSceneMeta(src, id, { length: formatLength(Math.max(1e-3, sec), p.tempo) });
  }
  function rollCut(src, id, sec) {
    const p = parseProject(src);
    const s = need(p, id);
    const next = p.scenes[s.index + 1];
    if (!next) return setSceneLength(src, id, sec);
    const total = s.dur + next.dur;
    const a = Math.max(1e-3, Math.min(total - 1e-3, sec));
    let out = setSceneMeta(src, id, { length: formatLength(a, p.tempo) });
    out = setSceneMeta(out, next.id, { length: formatLength(total - a, p.tempo) });
    let moved = a - s.dur;
    if (next.in > 0) {
      const nextIn = next.in + moved;
      out = setSceneIn(out, next.id, Math.max(0, nextIn));
      moved = Math.min(0, nextIn);
    }
    const u = hitUnit(p.tempo), shift = moved / u;
    if (next.hits.length && shift) out = setSceneMeta(out, next.id, { hits: next.hits.map((h2) => round(h2 - shift, 4)).filter((h2) => h2 >= 0) });
    return out;
  }
  function lengthSetting(sec, tempo) {
    const v = formatLength(sec, tempo);
    return parseLength(v, tempo) > 1e-9 ? v : null;
  }
  function placeKey(meta, key, value, after = "length") {
    if (value === null || value === void 0) return merge(meta, { [key]: null });
    if (key in meta || !(after in meta)) return merge(meta, { [key]: value });
    const out = {};
    for (const [k, v] of Object.entries(meta)) {
      out[k] = v;
      if (k === after) out[key] = value;
    }
    return out;
  }
  function setSceneIn(src, id, sec) {
    if (typeof sec !== "number" || !Number.isFinite(sec)) throw new Error("in-point must be a number of seconds, got ".concat(JSON.stringify(sec)));
    return edit(src, (p) => {
      const s = need(p, id);
      const next = placeKey(s.meta, "in", lengthSetting(Math.max(0, sec), p.tempo));
      if (s.metaTok >= 0) Object.assign(p.toks[s.metaTok], { body: formatJSON(next), dirty: true });
      else p.toks.splice(s.head + 1, 0, textTok("\n"), fence("fvs", formatJSON(next)));
    });
  }
  function setTransition(src, id, type, dur) {
    if (type === null || type === void 0) return setSceneMeta(src, id, { transition: null });
    if (!TRANSITIONS.includes(type)) throw new Error('unknown transition "'.concat(type, '" (use ').concat(TRANSITIONS.join(", "), ")"));
    if (dur === void 0 || dur === null) return setSceneMeta(src, id, { transition: type });
    if (typeof dur !== "number" || !(dur > 0)) throw new Error("transition duration must be a positive number of seconds, got ".concat(JSON.stringify(dur)));
    const p = parseProject(src);
    return setSceneMeta(src, id, { transition: { type, dur: formatLength(dur, p.tempo) } });
  }
  function splitScene(src, id, atSec, newId) {
    const p = parseProject(src);
    const s = need(p, id);
    if (newId === void 0 || newId === null || newId === "") newId = freeId(p, id);
    if (!ID_RE.test(newId)) throw new Error('scene id "'.concat(newId, '" must start with a letter and use letters, digits, - or _'));
    if (sceneById(p, newId)) throw new Error('scene id "'.concat(newId, '" is taken'));
    const frame = 1 / (+p.meta.fps > 0 ? +p.meta.fps : DEFAULTS.fps);
    const lo = s.t0 + frame, hi = s.t1 - frame, f3 = (x) => round(x, 3);
    if (typeof atSec !== "number" || !Number.isFinite(atSec) || atSec < lo - 1e-6 || atSec > hi + 1e-6) {
      throw new Error(hi < lo ? 'scene "'.concat(id, '" is too short to split (').concat(f3(s.dur), " s)") : 'cannot split scene "'.concat(id, '" at ').concat(typeof atSec === "number" ? f3(atSec) : atSec, " s: pick a time between ").concat(f3(lo), " and ").concat(f3(hi), " s (at least one frame from either edge)"));
    }
    const tempo = p.tempo;
    const first = formatLength(atSec - s.t0, tempo), len = parseLength(first, tempo);
    if (!(len > 0 && len < s.dur)) throw new Error('cannot split scene "'.concat(id, '" at ').concat(f3(atSec), " s: too close to an edge"));
    const second = formatLength(s.dur - len, tempo);
    const nextIn = lengthSetting(s.in + len, tempo);
    let meta = {};
    for (const [k, v] of Object.entries(s.meta)) if (k !== "transition" && k !== "in") meta[k] = k === "length" ? second : v;
    if (!("length" in meta)) meta = { length: second, ...meta };
    meta = placeKey(meta, "in", nextIn);
    const out = setSceneMeta(src, id, { length: first });
    return insertScene(out, id, { id: newId, title: s.title, meta, html: s.html, css: s.css, js: s.js });
  }
  function setHits(src, id, hits) {
    const clean2 = [...new Set(hits.map((h2) => round(h2, 4)))].sort((a, b) => a - b);
    return setSceneMeta(src, id, { hits: clean2 });
  }

  // src/lib/html.js
  var RAW = /^(script|style|textarea|title)$/i;
  var VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  var ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\xA0", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", middot: "\xB7", copy: "\xA9", reg: "\xAE", trade: "\u2122", laquo: "\xAB", raquo: "\xBB", ldquo: "\u201C", rdquo: "\u201D", lsquo: "\u2018", rsquo: "\u2019", times: "\xD7", larr: "\u2190", rarr: "\u2192", uarr: "\u2191", darr: "\u2193", bull: "\u2022" };
  var decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, k) => {
    if (k[0] === "#") {
      const c = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : +k.slice(1);
      try {
        return String.fromCodePoint(c);
      } catch {
        return m;
      }
    }
    return ENT[k.toLowerCase()] ?? m;
  });
  var escapeText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  function tagEnd(html, i) {
    let q2 = null;
    for (let k = i + 1; k < html.length; k++) {
      const c = html[k];
      if (q2) {
        if (c === q2) q2 = null;
      } else if (c === '"' || c === "'") q2 = c;
      else if (c === ">") return k + 1;
    }
    return html.length;
  }
  var ATTR = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  function scan(html) {
    const texts = [], tags = [];
    const stack = [];
    let i = 0, textStart = 0;
    const n = html.length;
    const pushText = (a, b) => {
      if (b <= a) return;
      const raw = html.slice(a, b), text = decode(raw);
      if (/\S/.test(text)) texts.push({ index: texts.length, start: a, end: b, raw, text, tag: stack.length ? stack[stack.length - 1] : -1 });
    };
    while (i < n) {
      if (html[i] !== "<") {
        i++;
        continue;
      }
      if (html.startsWith("<!--", i)) {
        pushText(textStart, i);
        const e = html.indexOf("-->", i + 4);
        i = e < 0 ? n : e + 3;
        textStart = i;
        continue;
      }
      const m = /^<(\/?)([A-Za-z][\w:-]*)/.exec(html.slice(i, i + 80));
      if (!m) {
        if (html[i + 1] === "!" || html[i + 1] === "?") {
          pushText(textStart, i);
          i = tagEnd(html, i);
          textStart = i;
        } else i++;
        continue;
      }
      pushText(textStart, i);
      const end = tagEnd(html, i), name = m[2].toLowerCase();
      if (m[1]) {
        for (let k = stack.length - 1; k >= 0; k--) if (tags[stack[k]].name === name) {
          stack.length = k;
          break;
        }
        i = end;
        textStart = i;
        continue;
      }
      const body = html.slice(i + 1 + m[2].length, end - 1);
      const attrs = [];
      const selfClose = /\/\s*$/.test(body);
      ATTR.lastIndex = 0;
      let a;
      while (a = ATTR.exec(body)) {
        if (a[1] === "/") continue;
        const off = i + 1 + m[2].length + a.index;
        const v = a[2] ?? a[3] ?? a[4];
        attrs.push({ name: a[1].toLowerCase(), value: v === void 0 ? "" : decode(v), start: off, end: off + a[0].length });
      }
      const tag = { index: tags.length, name, start: i, end, attrs, parent: stack.length ? stack[stack.length - 1] : -1, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };
      tags.push(tag);
      i = end;
      textStart = i;
      if (RAW.test(name) && !selfClose) {
        const close = html.toLowerCase().indexOf("</".concat(name), i);
        i = close < 0 ? n : close;
        textStart = i;
        continue;
      }
      if (!VOID.test(name) && !selfClose) stack.push(tag.index);
    }
    pushText(textStart, n);
    return { texts, tags };
  }
  function replaceText(html, index, value) {
    const t2 = scan(html).texts[index];
    if (!t2) throw new Error("no text #".concat(index));
    const lead = t2.raw.match(/^\s*/)[0], trail = t2.raw.match(/\s*$/)[0];
    return html.slice(0, t2.start) + lead + escapeText(String(value).trim()) + trail + html.slice(t2.end);
  }
  function setAttr(html, index, name, value) {
    const tag = scan(html).tags[index];
    if (!tag) throw new Error("no tag #".concat(index));
    const a = tag.attrs.find((x) => x.name === name.toLowerCase());
    if (value === null || value === void 0) {
      if (!a) return html;
      let s = a.start;
      while (s > tag.start && /\s/.test(html[s - 1])) s--;
      return html.slice(0, s) + html.slice(a.end);
    }
    const piece = "".concat(name, '="').concat(escapeAttr(value), '"');
    if (a) return html.slice(0, a.start) + piece + html.slice(a.end);
    let at = tag.end - 1;
    if (html[at - 1] === "/") at--;
    while (at > tag.start && /\s/.test(html[at - 1])) at--;
    return html.slice(0, at) + " " + piece + html.slice(at);
  }
  var images = (html) => scan(html).tags.filter((t2) => t2.name === "img").map((t2) => ({ tag: t2.index, src: t2.attr("src") || "" }));
  var num = (v, d) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : d;
  };
  function videos(html) {
    const { tags } = scan(html);
    const lower = html.toLowerCase();
    return tags.filter((t2) => t2.name === "video").map((t2) => {
      const selfClosed = html[t2.end - 2] === "/";
      const close = selfClosed ? -1 : lower.indexOf("</video", t2.end);
      const end = close < 0 ? t2.end : close;
      const source = tags.find((x) => x.name === "source" && x.start >= t2.end && x.start < end && x.attr("src"));
      const has = (k) => t2.attrs.some((a) => a.name === k);
      return {
        tag: t2.index,
        src: t2.attr("src") || (source ? source.attr("src") : "") || "",
        clipIn: Math.max(0, num(t2.attr("data-clip-in"), 0)),
        gain: num(t2.attr("data-gain"), 0),
        muted: has("muted"),
        loop: has("loop")
      };
    });
  }
  function timedElements(html) {
    const { texts, tags } = scan(html);
    const within = (i, root) => {
      for (; i >= 0; i = tags[i].parent) if (i === root) return true;
      return false;
    };
    const named = (t2) => {
      const x = texts.find((r) => r.start > t2.start && within(r.tag, t2.index)), text = x ? x.text.trim() : "", src = t2.attr("src");
      return { tag: t2.index, name: t2.name, text, label: text ? text.slice(0, 40).trim() : src ? src.split("/").pop() : "<".concat(t2.name, ">") };
    };
    return tags.filter((t2) => ["data-in", "data-out", "data-seq"].some((k) => t2.attr(k) !== void 0)).map((t2) => ({
      ...named(t2),
      in: t2.attr("data-in"),
      out: t2.attr("data-out"),
      fx: t2.attr("data-fx"),
      seq: t2.attr("data-seq"),
      each: t2.attr("data-each"),
      fxOut: t2.attr("data-fx-out"),
      dur: t2.attr("data-dur"),
      seqEnd: t2.attr("data-seq-end"),
      // the children a data-seq or a data-each times one by one
      ...t2.attr("data-seq") !== void 0 || t2.attr("data-each") !== void 0 ? { items: tags.filter((c) => c.parent === t2.index).map(named) } : {}
    }));
  }
  function timedSpans(html, sc, at, { unit, beat }) {
    const { tags } = scan(html);
    const win = /* @__PURE__ */ new Map(), blocks = /* @__PURE__ */ new Map();
    const limit = (tag, a, b) => {
      const w = win.get(tag);
      win.set(tag, w ? [Math.max(w[0], a), Math.min(w[1], b)] : [a, b]);
    };
    const block = (c, more) => blocks.set(c.tag, { ...blocks.get(c.tag), ...c, ...more });
    for (const x of timedElements(html)) {
      let error = "";
      const read = (expr) => {
        if (expr === void 0) return null;
        try {
          return at(expr);
        } catch (e) {
          error = String(e && e.message || e);
          return null;
        }
      };
      if (x.seq !== void 0) {
        const m = String(x.seq).match(/^\s*h(\d+)\s*$/);
        if (!m) block(x, { error: 'data-seq="'.concat(x.seq, '" must name the first hit, e.g. data-seq="h0"') });
        else {
          const times = x.items.map((_, i) => sc.hits[+m[1] + i]).filter((v) => v !== void 0), end = read(x.seqEnd) ?? sc.t1;
          x.items.forEach((c, i) => {
            if (i < times.length) limit(c.tag, times[i], times[i + 1] ?? end);
            block(c, { of: x, n: i + 1, ...i < times.length ? {} : { error: "data-seq has ".concat(x.items.length, " items but only ").concat(times.length, " hits from h").concat(+m[1]) } });
          });
          error = "";
        }
      }
      if (x.in === void 0 && x.out === void 0) continue;
      const tin = read(x.in), tout = read(x.out), step = +x.each * unit;
      const gone = tout === null ? Infinity : tout + (String(x.fxOut || "").toLowerCase() === "fade" ? x.dur !== void 0 ? +x.dur * unit : beat / 2 : 0);
      if (x.each !== void 0 && tin !== null && Number.isFinite(step)) x.items.forEach((c, i) => {
        limit(c.tag, tin + step * i, gone);
        block(c, { of: x, n: i + 1 });
      });
      else limit(x.tag, tin ?? -Infinity, gone);
      if (error || x.seq === void 0 && !(x.each !== void 0 && tin !== null && Number.isFinite(step))) block(x, error ? { error } : {});
    }
    const out = [];
    for (const e of blocks.values()) {
      let a = sc.s0, b = sc.t1;
      for (let k = e.tag; k >= 0; k = tags[k].parent) {
        const w = win.get(k);
        if (w) {
          a = Math.max(a, w[0]);
          b = Math.min(b, w[1]);
        }
      }
      if (b > a + 1e-6) out.push({ ...e, a, b });
    }
    return out.sort((p, q2) => p.tag - q2.tag);
  }

  // src/lib/compile.js
  var ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i;
  var isRelativeUrl = (u) => !!u && !ABSOLUTE.test(u.trim()) && !/^\$\{/.test(u) && !/^%%/.test(u);
  var ATTR2 = /(\s(?:src|href|poster|xlink:href)\s*=\s*)(["'])([^"']*)\2/gi;
  var CSS_URL = /url\(\s*(["']?)([^"')]+)\1\s*\)/gi;
  function assetRefs(html = "", css = "") {
    const out = /* @__PURE__ */ new Set();
    for (const m of html.matchAll(ATTR2)) if (isRelativeUrl(m[3])) out.add(clean(m[3]));
    for (const m of (html + "\n" + css).matchAll(CSS_URL)) if (isRelativeUrl(m[2])) out.add(clean(m[2]));
    return [...out];
  }
  var clean = (u) => u.trim().replace(/^\.\//, "");
  var rewriteHtml = (html, map) => html.replace(ATTR2, (m, pre, q2, u) => isRelativeUrl(u) && map[clean(u)] ? "".concat(pre).concat(q2).concat(map[clean(u)]).concat(q2) : m);
  var rewriteCss = (css, map) => css.replace(CSS_URL, (m, q2, u) => isRelativeUrl(u) && map[clean(u)] ? "url(".concat(q2).concat(map[clean(u)]).concat(q2, ")") : m);
  var list = (v) => v == null ? [] : Array.isArray(v) ? v : [v];
  function audioTracks(meta) {
    const tempo = tempoOf(meta);
    const seconds = (v) => {
      if (v === void 0 || v === null || v === "") return null;
      try {
        const x = parseLength(v, tempo);
        return Number.isFinite(x) ? x : null;
      } catch {
        return null;
      }
    };
    return list(meta.audio).map((a, i) => typeof a === "string" ? { src: a } : a).filter((a) => a && a.src).map((a, i) => {
      const from = seconds(a.in), dur = seconds(a.dur);
      return { id: a.id || "a".concat(i), src: String(a.src), at: +a.at || 0, gain: +a.gain || 0, role: a.role || (i ? "track" : "score"), in: from > 0 ? from : 0, dur: dur > 0 ? dur : null, mute: !!a.mute };
    });
  }
  function sceneMedia(p) {
    const out = [];
    for (const s of p.scenes) {
      videos(s.html).forEach((v, k) => {
        if (v.muted || !v.src) return;
        out.push({ id: "".concat(s.id, "/video-").concat(k), scene: s.id, src: v.src, at: s.t0, in: v.clipIn + s.in, dur: s.dur, gain: v.gain, loop: v.loop });
      });
    }
    return out;
  }
  function compile(p, { resolve = (u) => u } = {}) {
    const css = cssBlocks(p).join("\n\n");
    const refs = /* @__PURE__ */ new Set([...assetRefs(stageHtml(p), css), ...list(p.meta.assets).map(clean)]);
    for (const s of p.scenes) for (const r of assetRefs(s.html, s.css)) refs.add(r);
    const audio = audioTracks(p.meta);
    const map = {};
    for (const r of refs) map[r] = resolve(r);
    const url = (src) => isRelativeUrl(src) ? map[clean(src)] ?? resolve(clean(src)) : src;
    const jsLine = (k) => k >= 0 ? p.toks[k].line + 1 : 0;
    return {
      v: 1,
      title: p.meta.title || "",
      lang: p.meta.lang || "zh-CN",
      width: +p.meta.width,
      height: +p.meta.height,
      fps: +p.meta.fps,
      length: p.length,
      tempo: p.tempo ? { bpm: p.tempo.bpm, beatsPerBar: p.tempo.beatsPerBar } : null,
      background: p.meta.background || "#000",
      className: p.meta.class || "",
      fonts: list(p.meta.fonts),
      css: rewriteCss(css, map),
      stage: { html: rewriteHtml(stageHtml(p), map), js: stageJs(p), line: jsLine(p.stageJs) },
      scenes: p.scenes.map((s) => ({
        id: s.id,
        title: s.title,
        t0: s.t0,
        t1: s.t1,
        t0v: s.t0v,
        in: s.in,
        transition: s.transition,
        hits: s.hitTimes,
        beats: s.hits,
        cls: s.meta.class || "",
        html: rewriteHtml(s.html, map),
        css: rewriteCss(s.css, map),
        js: s.js,
        line: jsLine(s.jsTok),
        htmlLine: jsLine(s.htmlTok)
      })),
      captions: (p.captions || []).map((c) => ({ t0: c.start, t1: c.end, text: c.text })),
      captionStyle: captionStyle(p.meta),
      audio: audio.map((a) => ({ ...a, url: resolve(a.src) })),
      media: sceneMedia(p).map((m) => ({ ...m, url: url(m.src) })),
      assets: map
    };
  }
  var track = (a) => ({ id: a.id, kind: "track", src: a.src, url: a.url ?? a.src, at: +a.at || 0, in: +a.in || 0, dur: a.dur > 0 ? +a.dur : null, gain: +a.gain || 0, mute: !!a.mute, role: a.role });
  var video = (m, assets = {}) => ({ id: m.id, kind: "video", scene: m.scene, src: m.src, url: m.url ?? assets[clean(m.src)] ?? m.src, at: +m.at || 0, in: +m.in || 0, dur: m.dur > 0 ? +m.dur : null, gain: +m.gain || 0, mute: false, loop: !!m.loop });
  function audioSegments(x) {
    if (x && Array.isArray(x.toks)) return [...audioTracks(x.meta).map(track), ...sceneMedia(x).map((m) => video(m))];
    return payloadSegments(x);
  }
  var payloadSegments = (P) => P ? [...(P.audio || []).map(track), ...(P.media || []).map((m) => video(m, P.assets))] : [];
  var esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var scriptJSON = (v) => JSON.stringify(v).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  function buildHtml(payload, runtimeSource, { mode = "player", extraHead = "" } = {}) {
    const fonts = payload.fonts.map((u) => '<link rel="stylesheet" href="'.concat(esc(u), '">')).join("\n");
    const assets = payload.assets || {};
    if ((payload.media || []).some((m) => m.url && assets[clean(m.src)] === m.url)) {
      payload = { ...payload, media: payload.media.map((m) => m.url && assets[clean(m.src)] === m.url ? { ...m, url: null } : m) };
    }
    return '<!doctype html>\n<html lang="'.concat(esc(payload.lang), '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>').concat(esc(payload.title || "Forsion Video Studio"), '</title>\n<meta name="generator" content="Forsion Video Studio">\n').concat(fonts, "\n").concat(extraHead, '\n</head>\n<body>\n<script type="application/json" id="fvs-data">').concat(scriptJSON(payload), "<\/script>\n<script>").concat(runtimeSource.replace(/<\/script/gi, "<\\/script"), "<\/script>\n<script>FVS.boot(").concat(JSON.stringify(mode), ");<\/script>\n</body>\n</html>\n");
  }

  // src/lib/onsets.js
  var ONSET_SR = 22050;
  var N = 1024;
  var HOP = 128;
  var BLOCK = 110;
  function fft(re, im) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) {
        [re[i], re[j]] = [re[j], re[i]];
        [im[i], im[j]] = [im[j], im[i]];
      }
    }
    for (let len = 2; len <= n; len <<= 1) {
      const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < n; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const a = i + k, b = a + len / 2;
          const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
          re[b] = re[a] - tr;
          im[b] = im[a] - ti;
          re[a] += tr;
          im[a] += ti;
          const nr = cr * wr - ci * wi;
          ci = cr * wi + ci * wr;
          cr = nr;
        }
      }
    }
  }
  function downsample(x, sr) {
    if (sr === ONSET_SR) return x;
    const r = sr / ONSET_SR, out = new Float32Array(Math.floor(x.length / r));
    for (let i = 0; i < out.length; i++) {
      const a = Math.floor(i * r), b = Math.max(a + 1, Math.floor((i + 1) * r));
      let s = 0;
      for (let k = a; k < b; k++) s += x[k];
      out[i] = s / (b - a);
    }
    return out;
  }
  var MELS = 64;
  var hz2mel = (f) => 2595 * Math.log10(1 + f / 700);
  var mel2hz = (m) => 700 * (10 ** (m / 2595) - 1);
  var bank = null;
  function melBank() {
    if (bank) return bank;
    const bins = N / 2 + 1, top = hz2mel(ONSET_SR / 2), pts = [];
    for (let i = 0; i < MELS + 2; i++) pts.push(mel2hz(top * i / (MELS + 1)) / (ONSET_SR / 2) * (bins - 1));
    bank = [];
    for (let m = 0; m < MELS; m++) {
      const [l, c, r] = [pts[m], pts[m + 1], pts[m + 2]], w = [];
      for (let k = Math.floor(l); k <= Math.ceil(r) && k < bins; k++) {
        const v = k < c ? (k - l) / Math.max(1e-9, c - l) : (r - k) / Math.max(1e-9, r - c);
        if (v > 0) w.push([k, v]);
      }
      bank.push(w);
    }
    return bank;
  }
  function onsetEnvelope(mono, sr = ONSET_SR) {
    const x = downsample(mono, sr);
    const frames = Math.max(0, Math.floor((x.length - N) / HOP) + 1);
    const env = new Float32Array(frames), level = new Float32Array(frames);
    const rms = new Float32Array(Math.floor(x.length / BLOCK));
    for (let b = 0; b < rms.length; b++) {
      let e = 0;
      for (let i = b * BLOCK; i < (b + 1) * BLOCK; i++) e += x[i] * x[i];
      rms[b] = e / BLOCK;
    }
    const win = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));
    const B = melBank();
    const mel = new Float32Array(frames * MELS);
    const re = new Float32Array(N), im = new Float32Array(N);
    let top = -Infinity;
    for (let f = 0; f < frames; f++) {
      const o = f * HOP;
      let ss = 0;
      for (let i = 0; i < N; i++) {
        const v = x[o + i];
        re[i] = v * win[i];
        im[i] = 0;
        ss += v * v;
      }
      level[f] = 10 * Math.log10(ss / N + 1e-12);
      fft(re, im);
      for (let m = 0; m < MELS; m++) {
        let e = 0;
        for (const [k, w] of B[m]) e += w * (re[k] * re[k] + im[k] * im[k]);
        const db = 10 * Math.log10(Math.max(e, 1e-10));
        mel[f * MELS + m] = db;
        if (db > top) top = db;
      }
    }
    const floor = top - 80;
    for (let i = 0; i < mel.length; i++) if (mel[i] < floor) mel[i] = floor;
    for (let f = 1; f < frames; f++) {
      let s = 0;
      for (let m = 0; m < MELS; m++) {
        const d = mel[f * MELS + m] - mel[(f - 1) * MELS + m];
        if (d > 0) s += d;
      }
      env[f] = s / MELS;
    }
    const sorted = [...env].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)] || 1;
    for (let f = 0; f < frames; f++) env[f] /= p95;
    return { env, level, rms, block: BLOCK / ONSET_SR, hop: HOP / ONSET_SR, offset: N / 2 / ONSET_SR };
  }
  var pct = (arr, q2) => {
    const s = [...arr].sort((a, b) => a - b);
    return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * q2))] : 0;
  };
  var hitsOf = (s) => s.hitTimes && s.t0 !== void 0 && s.t1 !== void 0 ? visibleHits(s) : (s.hitTimes || s.hits || []).map((t2, index) => ({ index, t: t2 }));
  function syncReport(scenes, { env, rms, block, hop, offset }, { before = 0.065, after = 0.03, weak = 0.6 } = {}) {
    const at = (t2) => Math.round((t2 - offset) / hop);
    const rows = [];
    for (const s of scenes) {
      hitsOf(s).forEach(({ index: i, t: t2 }) => {
        const a = Math.max(0, at(t2 - before)), b = Math.min(env.length - 1, at(t2 + after));
        let best = -1, bi = a;
        for (let k = a; k <= b; k++) if (env[k] > best) {
          best = env[k];
          bi = k;
        }
        const la = Math.max(0, at(t2 - 1)), lb = Math.min(env.length, at(t2 + 1));
        const local = pct(env.subarray(la, lb), 0.99) || 1;
        const strength = best < 0 ? 0 : best / local;
        const lvl = (p, q2) => {
          const x = rms.subarray(Math.max(0, Math.ceil(p / block)), Math.max(0, Math.floor(q2 / block)));
          let s2 = 0;
          for (const v of x) s2 += v;
          return x.length ? 10 * Math.log10(s2 / x.length + 1e-12) : -120;
        };
        const drop = lvl(t2, t2 + 0.07) - lvl(t2 - 0.08, t2 - 0.01) <= -6;
        const off = best < 0 ? null : bi * hop + offset - t2;
        rows.push({ scene: s.id, hit: i, t: t2, offset: off, strength: +strength.toFixed(2), quiet: drop, ok: drop || strength >= weak });
      });
    }
    return rows;
  }

  // src/lib/scene-templates.js
  var FONT = "'Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif";
  var MONO = "'JetBrains Mono',ui-monospace,'SF Mono',Menlo,monospace";
  var BASE = "container-type: size;\ncolor: var(--ink, #f4f2ee);\nfont-family: ".concat(FONT, ";\n");
  var PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="#3a4448"/><stop offset="1" stop-color="#1c2124"/></linearGradient></defs><rect width="160" height="100" fill="url(#g)"/><path d="M0 78 46 44l30 22 26-18 58 30v22H0z" fill="#56656a"/><circle cx="118" cy="30" r="10" fill="#6f8085"/></svg>');
  var SCENE_TEMPLATES = [
    {
      id: "title",
      bars: 2,
      seconds: 4,
      hits: [0, 2],
      name: { zh: "\u6807\u9898\u5361", en: "Title card" },
      hint: { zh: "\u5C0F\u6807\u9898\u3001\u5927\u6807\u9898\u3001\u4E00\u53E5\u8BF4\u660E", en: "Kicker, title and one line" },
      html: (L) => '<div class="t-wrap">\n  <p class="t-kicker" data-in="h0" data-fx="fade">'.concat(L("CHAPTER 01", "CHAPTER 01"), '</p>\n  <h1 class="t-title" data-in="h0" data-fx="up">').concat(L("\u4E00\u4E2A\u6E05\u695A\u7684\u6807\u9898", "A clear title"), '</h1>\n  <p class="t-sub" data-in="h1" data-fx="fade">').concat(L("\u4E00\u53E5\u8BF4\u660E\uFF0C\u544A\u8BC9\u89C2\u4F17\u63A5\u4E0B\u6765\u770B\u4EC0\u4E48", "One line on what comes next"), "</p>\n</div>"),
      css: "".concat(BASE, ".t-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2.4cqh; padding: 0 8cqw; text-align: center; }\n.t-kicker { margin: 0; font: 600 2.6cqh/1 ").concat(MONO, "; letter-spacing: .3em; opacity: .7; }\n.t-title { margin: 0; font-size: 11cqh; font-weight: 800; line-height: 1.05; }\n.t-sub { margin: 0; font-size: 3.6cqh; opacity: .72; }")
    },
    {
      id: "statement",
      bars: 2,
      seconds: 4,
      hits: [0],
      name: { zh: "\u4E00\u53E5\u8BDD", en: "Statement" },
      hint: { zh: "\u4E00\u53E5\u5927\u5B57\uFF0C\u9010\u5B57\u6253\u51FA", en: "One big line, typed out" },
      html: (L) => '<p class="s-line" data-in="h0" data-fx="type" data-cps="18">'.concat(L("\u4E0D\u6B62\u8BB0\u4E0B\u6765\uFF0C\u8FD8\u80FD\u63A5\u7740\u505A\u4E0B\u53BB\u3002", "Not just notes. Next steps."), "</p>"),
      css: "".concat(BASE, ".s-line { position: absolute; left: 8cqw; right: 8cqw; top: 50%; translate: 0 -50%; margin: 0; font-size: 8.5cqh; font-weight: 800; line-height: 1.2; }")
    },
    {
      id: "list",
      bars: 2,
      seconds: 5,
      hits: [0, 2],
      name: { zh: "\u8981\u70B9", en: "Key points" },
      hint: { zh: "\u6807\u9898\u52A0\u4E09\u6761\uFF0C\u9010\u6761\u51FA\u73B0", en: "A heading and three points, one by one" },
      html: (L) => '<div class="l-wrap">\n  <h2 data-in="h0" data-fx="up">'.concat(L("\u4E09\u4EF6\u4E8B", "Three things"), '</h2>\n  <ol data-in="h1" data-each="1" data-fx="up">\n    <li>').concat(L("\u7B2C\u4E00\u70B9\uFF0C\u8BF4\u6E05\u695A", "Say it plainly"), "</li>\n    <li>").concat(L("\u7B2C\u4E8C\u70B9\uFF0C\u7ED9\u8BC1\u636E", "Show the proof"), "</li>\n    <li>").concat(L("\u7B2C\u4E09\u70B9\uFF0C\u8BB2\u4E0B\u4E00\u6B65", "Name the next step"), "</li>\n  </ol>\n</div>"),
      css: "".concat(BASE, ".l-wrap { position: absolute; inset: 0; display: grid; align-content: center; gap: 4cqh; padding: 0 12cqw; }\n.l-wrap h2 { margin: 0; font-size: 7cqh; font-weight: 800; }\n.l-wrap ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 2.6cqh; counter-reset: n; }\n.l-wrap li { font-size: 4.6cqh; counter-increment: n; display: flex; gap: 2cqh; align-items: baseline; }\n.l-wrap li::before { content: counter(n, decimal-leading-zero); font: 600 3cqh/1 ").concat(MONO, "; color: var(--accent-color, #7fc1cf); }")
    },
    {
      id: "stat",
      bars: 1,
      seconds: 3,
      hits: [0, 2],
      name: { zh: "\u6570\u636E", en: "Big number" },
      hint: { zh: "\u4E00\u4E2A\u6570\u5B57\u548C\u5B83\u7684\u610F\u4E49", en: "A number and what it means" },
      html: (L) => '<div class="n-wrap">\n  <b data-in="h0" data-fx="pop">94%</b>\n  <span data-in="h1" data-fx="fade">'.concat(L("\u7684\u7528\u6237\u5728\u7B2C\u4E00\u5468\u5C31\u7528\u4E0A\u4E86\u5B83", "of people used it in week one"), "</span>\n</div>"),
      css: "".concat(BASE, ".n-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2cqh; text-align: center; padding: 0 8cqw; }\n.n-wrap b { font: 800 30cqh/1 ").concat(FONT, "; color: var(--accent-color, #7fc1cf); letter-spacing: -.02em; }\n.n-wrap span { font-size: 4.4cqh; opacity: .8; }")
    },
    {
      id: "quote",
      bars: 2,
      seconds: 5,
      hits: [0, 4],
      name: { zh: "\u5F15\u8A00", en: "Quote" },
      hint: { zh: "\u4E00\u6BB5\u5F15\u7528\u548C\u51FA\u5904", en: "A quote and who said it" },
      html: (L) => '<figure class="q-wrap">\n  <blockquote data-in="h0" data-fx="fade">'.concat(L("\u201C\u628A\u590D\u6742\u7684\u4E8B\uFF0C\u8BB2\u6210\u4E00\u53E5\u8BDD\u3002\u201D", "\u201CMake the complicated thing one sentence.\u201D"), '</blockquote>\n  <figcaption data-in="h1" data-fx="fade">').concat(L("\u2014 \u4E00\u4F4D\u7528\u6237", "\u2014 A user"), "</figcaption>\n</figure>"),
      css: "".concat(BASE, ".q-wrap { position: absolute; inset: 0; margin: 0; display: grid; align-content: center; gap: 4cqh; padding: 0 14cqw; }\n.q-wrap blockquote { margin: 0; font-size: 7cqh; font-weight: 700; line-height: 1.3; }\n.q-wrap figcaption { font-size: 3.4cqh; opacity: .65; }")
    },
    {
      id: "compare",
      bars: 2,
      seconds: 5,
      hits: [0, 2],
      name: { zh: "\u5BF9\u6BD4", en: "Before / after" },
      hint: { zh: "\u5DE6\u53F3\u4E24\u680F\uFF0C\u5148\u540E\u51FA\u73B0", en: "Two columns, one after the other" },
      html: (L) => '<div class="c-wrap">\n  <section data-in="h0" data-fx="up"><small>'.concat(L("\u4E4B\u524D", "Before"), "</small><b>").concat(L("\u624B\u52A8\u6574\u7406\u4E09\u5C0F\u65F6", "Three hours by hand"), '</b></section>\n  <section class="after" data-in="h1" data-fx="up"><small>').concat(L("\u4E4B\u540E", "After"), "</small><b>").concat(L("\u4E00\u53E5\u8BDD\uFF0C\u4E09\u5206\u949F", "One sentence, three minutes"), "</b></section>\n</div>"),
      css: "".concat(BASE, ".c-wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3cqw; padding: 14cqh 8cqw; }\n.c-wrap section { display: grid; align-content: center; gap: 2.4cqh; padding: 0 4cqw; border-radius: 2cqh; background: rgba(255,255,255,.06); }\n.c-wrap .after { background: color-mix(in srgb, var(--accent-color, #7fc1cf) 22%, transparent); }\n.c-wrap small { font: 600 2.6cqh/1 ").concat(MONO, "; letter-spacing: .2em; opacity: .7; }\n.c-wrap b { font-size: 6cqh; line-height: 1.2; }")
    },
    {
      id: "image",
      bars: 2,
      seconds: 5,
      hits: [0, 2],
      name: { zh: "\u56FE\u6587", en: "Image and text" },
      hint: { zh: "\u5DE6\u56FE\u53F3\u6587\uFF0C\u5728\u300C\u6587\u5B57\u300D\u9875\u6362\u56FE", en: "Picture left, text right; replace it under Text" },
      html: (L) => '<div class="i-wrap">\n  <img src="'.concat(PLACEHOLDER, '" alt="" data-in="h0" data-fx="fade">\n  <div><h2 data-in="h0" data-fx="up">').concat(L("\u914D\u56FE\u6807\u9898", "Picture title"), '</h2><p data-in="h1" data-fx="fade">').concat(L("\u4E00\u4E24\u53E5\u8BF4\u660E\u8FD9\u5F20\u56FE\u3002", "A line or two about the picture."), "</p></div>\n</div>"),
      css: "".concat(BASE, ".i-wrap { position: absolute; inset: 0; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 5cqw; padding: 10cqh 8cqw; }\n.i-wrap img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 1.6cqh; }\n.i-wrap h2 { margin: 0 0 2cqh; font-size: 6.4cqh; font-weight: 800; }\n.i-wrap p { margin: 0; font-size: 3.6cqh; line-height: 1.5; opacity: .75; }")
    },
    {
      id: "terminal",
      bars: 2,
      seconds: 5,
      hits: [0, 1, 2, 3],
      name: { zh: "\u7EC8\u7AEF", en: "Terminal" },
      hint: { zh: "\u547D\u4EE4\u9010\u884C\u6253\u51FA", en: "Commands typed line by line" },
      html: (L) => '<div class="tm">\n  <div class="tm-bar"><i></i><i></i><i></i></div>\n  <p data-in="h0" data-fx="type">$ forsion video new</p>\n  <p data-in="h1" data-fx="type">'.concat(L("\u2713 \u573A\u666F\u5DF2\u751F\u6210", "\u2713 Scenes written"), '</p>\n  <p data-in="h2" data-fx="type">').concat(L("\u2713 \u914D\u4E50\u5DF2\u5BF9\u9F50", "\u2713 Score in sync"), '</p>\n  <p data-in="h3" data-fx="type">').concat(L("\u2713 \u5BFC\u51FA\u5B8C\u6210", "\u2713 Exported"), "</p>\n</div>"),
      css: "".concat(BASE, ".tm { position: absolute; left: 14cqw; right: 14cqw; top: 18cqh; bottom: 18cqh; border-radius: 1.8cqh; background: #0d1112; box-shadow: 0 0 0 1px rgba(255,255,255,.08); padding: 0 4cqw 4cqh; }\n.tm-bar { display: flex; gap: 1.2cqh; padding: 3cqh 0 4cqh; }\n.tm-bar i { width: 1.8cqh; height: 1.8cqh; border-radius: 50%; background: rgba(255,255,255,.18); }\n.tm p { margin: 0 0 2cqh; font: 500 4.2cqh/1.4 ").concat(MONO, "; color: #8ff0b5; white-space: pre; }")
    },
    {
      id: "outro",
      bars: 2,
      seconds: 4,
      hits: [0, 2],
      name: { zh: "\u7247\u5C3E", en: "End card" },
      hint: { zh: "\u54C1\u724C\u540D\u548C\u7F51\u5740", en: "Brand name and address" },
      html: (L) => '<div class="o-wrap">\n  <b data-in="h0" data-fx="pop">'.concat(L("\u4F60\u7684\u54C1\u724C", "Your brand"), '</b>\n  <span data-in="h1" data-fx="fade">example.com</span>\n</div>'),
      css: "".concat(BASE, ".o-wrap { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 2.4cqh; }\n.o-wrap b { font-size: 12cqh; font-weight: 800; }\n.o-wrap span { font: 500 3.4cqh/1 ").concat(MONO, "; letter-spacing: .14em; opacity: .7; }")
    },
    {
      id: "blank",
      bars: 1,
      seconds: 2,
      hits: [0],
      name: { zh: "\u7A7A\u767D", en: "Blank" },
      hint: { zh: "\u4E00\u884C\u5C45\u4E2D\u7684\u5B57", en: "One centred line" },
      html: (L) => '<p class="b-line" data-in="h0" data-fx="fade">'.concat(L("\u65B0\u573A\u666F", "New scene"), "</p>"),
      css: "".concat(BASE, ".b-line { position: absolute; inset: 0; margin: 0; display: grid; place-items: center; font-size: 9cqh; font-weight: 800; }")
    }
  ];
  function sceneFromTemplate(tpl, { id, tempo, zh }) {
    const L = (a, b) => zh ? a : b;
    return {
      id,
      title: zh ? tpl.name.zh : tpl.name.en,
      meta: { length: tempo ? "".concat(tpl.bars, " ").concat(tpl.bars === 1 ? "bar" : "bars") : "".concat(tpl.seconds, "s"), hits: tempo ? tpl.hits : tpl.hits.map((b) => b * 0.5) },
      html: tpl.html(L),
      css: tpl.css
    };
  }
  function mediaScene({ id, title, src, kind, seconds, tempo }) {
    const fill = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
    src = String(src).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    title = String(title).replace(/[\u0000-\u001f]+/g, " ").trim();
    const length = kind === "video" || !tempo ? "".concat(Math.round(seconds * 1e3) / 1e3, "s") : "2 bars";
    if (kind === "video") return { id, title, meta: { length, hits: [0] }, html: '<video src="'.concat(src, '" data-clip-in="0" style="').concat(fill, '"></video>') };
    return { id, title, meta: { length, hits: [0] }, html: '<img src="'.concat(src, '" alt="" style="').concat(fill, '">'), js: "K('img', [[t0, { s: 1 }], [t1, { s: 1.06 }, 'lin']])" };
  }

  // src/generated/runtime-src.js
  var runtime_src_default = '/* Forsion Video Studio 0.10.1 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\nvar FVS=(()=>{var nt=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ht=Object.prototype.hasOwnProperty;var gt=(t,e)=>{for(var i in e)nt(t,i,{get:e[i],enumerable:!0})},bt=(t,e,i,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of mt(e))!ht.call(t,o)&&o!==i&&nt(t,o,{get:()=>e[o],enumerable:!(p=pt(e,o))||p.enumerable});return t};var yt=t=>bt(nt({},"__esModule",{value:!0}),t);var Ht={};gt(Ht,{EASE:()=>V,boot:()=>It,createStage:()=>et,mount:()=>tt,prog:()=>Z,rng:()=>Q,timeExpr:()=>ot});var V={lin:t=>t,in:t=>t*t*t,out:t=>1-(1-t)**3,io:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,expo:t=>t>=1?1:1-2**(-10*t),back:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,step:t=>t<1?0:1},G=(t,e=0,i=1)=>Math.min(i,Math.max(e,t)),rt=(t,e,i)=>t+(e-t)*i,Z=(t,e,i,p="io")=>(V[p]||V.io)(G((t-e)/(i-e))),Q=t=>()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=["x","y","z","s","sx","sy","r","rx","ry"];function wt(t,e){if(e<=t[0].t)return t[0].v;for(let i=1;i<t.length;i++){let p=t[i];if(e<p.t){let o=t[i-1],h=(V[p.e]||V.io)((e-o.t)/(p.t-o.t)),l={};for(let w in p.v){let $=w in o.v?o.v[w]:p.v[w],y=p.v[w];l[w]=typeof y=="number"&&typeof $=="number"?$+(y-$)*h:h<1?$:y}return l}}return t[t.length-1].v}function $t(t,e,i){let p=t.style;if(i){let o=`translate3d(${e.x||0}px,${e.y||0}px,${e.z||0}px)`;e.rx&&(o+=` rotateX(${e.rx}deg)`),e.ry&&(o+=` rotateY(${e.ry}deg)`),e.r&&(o+=` rotate(${e.r}deg)`),(e.s??1)!==1&&(o+=` scale(${e.s})`),((e.sx??1)!==1||(e.sy??1)!==1)&&(o+=` scale(${e.sx??1},${e.sy??1})`),p.transform=o}"o"in e&&(p.opacity=e.o,p.visibility=e.o<.002?"hidden":""),("b"in e||"br"in e)&&(p.filter=`blur(${e.b||0}px) brightness(${e.br??1})`),("ct"in e||"cr"in e||"cb"in e||"cl"in e)&&(p.clipPath=`inset(${e.ct||0}% ${e.cr||0}% ${e.cb||0}% ${e.cl||0}%)`);for(let o in e)o[0]==="-"&&p.setProperty(o,e[o])}function et(t){let e=[],i=[],p=o=>typeof o=="string"?[...t.querySelectorAll(o)]:o==null?[]:o instanceof Element?[o]:[...o];return{root:t,q:p,tracks:e,hooks:i,K(o,h,l={}){let w={},$=h.map(([j,k={},L="io"])=>(w={...w,...k},{t:j,v:w,e:L}));if(!$.length)return;let y=$.some(j=>Object.keys(j.v).some(k=>xt.includes(k)));p(o).forEach((j,k)=>e.push({el:j,kf:$,hasTf:y,off:(l.stagger||0)*k}))},S(o,h,l){let w=p(o);i.push($=>{for(let y of w)y.style.display=$>=h&&$<l?"":"none"})},H(o){i.push(o)},type(o,h,l=30,w=0){p(o).forEach(($,y)=>{let j=[...$.textContent],k=h+w*y;i.push(L=>{let S=G(Math.floor((L-k)*l),0,j.length),R=j.slice(0,S).join("");$.textContent!==R&&($.textContent=R)})})},render(o){for(let h of i)h(o);for(let h of e)$t(h.el,wt(h.kf,o-h.off),h.hasTf)}}}var K=null;function kt(){if(K)return K;let t=Q(7);K=[];for(let e=0;e<4;e++){let i=document.createElement("canvas");i.width=i.height=200;let p=i.getContext("2d"),o=p.createImageData(200,200);for(let h=0;h<o.data.length;h+=4){let l=t()*255;o.data[h]=o.data[h+1]=o.data[h+2]=l,o.data[h+3]=255}p.putImageData(o,0,0),K.push(`url(${i.toDataURL()})`)}return K}function it(t,e=".grain"){let i=t.q(e),p=kt();t.H(o=>{let h=p[Math.floor(o*24)%4];for(let l of i)l.style.backgroundImage=h})}var vt=["","aborted","network error","decode error","format not supported or file missing"];function at(t,{mode:e="live",assets:i={},errors:p=[],onError:o=null}={}){let h={};for(let[s,c]of Object.entries(i||{}))typeof c=="string"&&!(c in h)&&(h[c]=s);let l=[],w=[],$=s=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(s||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let m=atob(s.slice(c[0].length).replace(/\\s+/g,"")),g=new Uint8Array(m.length);for(let I=0;I<m.length;I++)g[I]=m.charCodeAt(I);let b=URL.createObjectURL(new Blob([g],{type:c[1]||"video/mp4"}));return w.push(b),b}catch{return null}};for(let s of t)for(let c of s.el.querySelectorAll("video")){let m=c.querySelector("source[src]"),g=c.getAttribute("src")||(m?m.getAttribute("src"):"")||"";for(let I of[c,...c.querySelectorAll("source[src]")]){let n=$(I.getAttribute("src"));n&&I.setAttribute("src",n)}let b={el:c,scene:s.id,src:h[g]||g,from:s.from,to:s.to,base:s.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=b.loop,c.addEventListener("error",()=>{b.failed=!0,S(b,y(b))},!0),c.addEventListener("loadedmetadata",()=>{j(b)||S(b,k(b))}),c.addEventListener("seeked",()=>{let I=b.want;b.want=null,I!==null&&Math.abs(c.currentTime-I)>.05&&S(b,k(b))});try{c.pause(),c.load()}catch{}l.push(b)}if(!l.length)return null;function y(s){let c=s.el.error,m=c?c.code:0,g=c?` (${vt[m]||`error ${m}`}${c.message?`: ${c.message}`:""})`:"",b=m===3||m===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${s.src}" cannot be played${g}${b}`}function j(s){let c=s.el,m=c.duration,g=c.seekable;return!(Number.isFinite(m)&&m>.5&&(!g||!g.length||g.end(g.length-1)<.01))}let k=s=>`video "${s.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function L(s,c){s.want=c,s.el.currentTime=c}function S(s,c){if(!s.reported&&(s.reported=!0,p.push({scene:s.scene,message:c,line:0}),o))try{o(s.scene,s.src)}catch{}}function R(s,c){let m=s.el.duration,g=m>0&&Number.isFinite(m),b=s.clipIn+(c-s.base);return s.loop&&g&&(b=(b%m+m)%m),b<0&&(b=0),g&&b>m-.001&&(b=Math.max(0,m-.001)),b}let F=(s,c)=>c>=s.from&&c<s.to;function N(s,c){return s.chain=s.chain.then(()=>new Promise(m=>{let g=s.el;if(s.failed){m();return}let b=!1,I=null,n=null,a=()=>u(null),u=E=>{b||(b=!0,clearTimeout(f),g.removeEventListener("error",a,!0),I&&g.removeEventListener("loadedmetadata",I),n&&g.removeEventListener("seeked",n),E?(S(s,E),(g.readyState===0||++s.misses>=3)&&(s.failed=!0)):s.misses=0,m())},f=setTimeout(()=>u(s.failed||g.error?null:`video "${s.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);g.addEventListener("error",a,!0);let T=()=>{if(I=null,s.failed||g.error){u(null);return}let E=R(s,c);if(s.at===E&&!g.seeking){u(null);return}let B=!1,H=!g.requestVideoFrameCallback,C=()=>{if(!(!B||!H)){if(Math.abs(g.currentTime-E)>.05){u(k(s));return}s.at=E,u(null)}};g.requestVideoFrameCallback&&g.requestVideoFrameCallback(()=>{H=!0,C()}),n=()=>{B=!0,g.requestVideoFrameCallback?C():requestAnimationFrame(()=>requestAnimationFrame(C))},g.addEventListener("seeked",n,{once:!0}),s.at=null,L(s,E)};g.readyState>=1?T():(I=T,g.addEventListener("loadedmetadata",I,{once:!0}))})),s.chain}let d=null,r=0,v=null,O=0,M=(s,c,m)=>{let g=Math.abs(c-m),b=s.el.duration;return s.loop&&b>0&&Number.isFinite(b)?Math.min(g,b-g):g},_=s=>{try{let c=s.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},U=(s,c)=>{let m=s.el;m.paused||m.pause(),Math.abs(m.currentTime-c)>.001&&L(s,c)};function P(s){!o||s.reported||s.stall||s.el.readyState>0||(s.stall=setTimeout(()=>{s.stall=0,s.el.readyState===0&&S(s,`video "${s.src}" did not load within ${8e3/1e3} s`)},8e3))}function D(){for(let s of l)s.failed||(d!==null&&F(s,d)?U(s,R(s,d)):s.el.paused||s.el.pause())}function Y(s){let c=d===null?NaN:s-d,m=performance.now(),g=(m-r)/1e3;d=s,r=m;let b=c>0&&c<=.3,I=v===!0?b:v===null&&b&&Math.abs(c-g)<.1;for(let n of l){if(n.failed)continue;let a=n.el;if(!F(n,s)){a.paused||a.pause(),s<n.from&&n.from-s<=1&&U(n,R(n,n.from));continue}P(n);let u=R(n,s),f=a.duration,T=!n.loop&&f>0&&Number.isFinite(f)&&u>=f-.001-.001;I&&!T?a.paused?(M(n,a.currentTime,u)>.001&&L(n,u),_(n)):M(n,a.currentTime,u)>.15&&L(n,u):U(n,u)}clearTimeout(O),O=setTimeout(D,150)}return{clips:l,seek(s){if(e!=="capture"){Y(s);return}let c=[];for(let m of l)F(m,s)?c.push(m):m.el.paused||m.el.pause();return Promise.all(c.map(m=>N(m,s))).then(()=>{})},transport(s){v=!!s,v||(clearTimeout(O),D())},ready(){return Promise.all(l.map(s=>new Promise(c=>{let m=s.el;if(s.failed||m.error||m.readyState>=2){c();return}let g=()=>{clearTimeout(b),m.removeEventListener("loadeddata",g),m.removeEventListener("error",g,!0),c()},b=setTimeout(()=>{m.readyState===0&&!s.failed&&(s.failed=!0,S(s,`video "${s.src}" did not load within ${1e4/1e3} s`)),g()},1e4);m.addEventListener("loadeddata",g),m.addEventListener("error",g,!0)})))},destroy(){clearTimeout(O);for(let s of l){clearTimeout(s.stall);try{s.el.pause()}catch{}}for(let s of w)URL.revokeObjectURL(s)}}}var St=`\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\n.fvs-scenes{position:absolute;inset:0}\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\n.fvs-transition{position:absolute;inset:0}\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\n`,st={fade:t=>({b:{opacity:t}}),dip:t=>({a:{opacity:G(1-2*t)},b:{opacity:G(2*t-1)}}),"slide-left":(t,e)=>({b:{transform:`translateX(${(1-t)*e}px)`}}),"slide-up":(t,e,i)=>({b:{transform:`translateY(${(1-t)*i}px)`}}),"push-left":(t,e)=>({a:{transform:`translateX(${-t*e}px)`},b:{transform:`translateX(${(1-t)*e}px)`}}),"wipe-left":t=>({b:{clipPath:`inset(0 0 0 ${(1-t)*100}%)`}}),zoom:t=>({b:{opacity:t,transform:`scale(${1.08-.08*t})`}}),blur:t=>({b:{opacity:t,filter:`blur(${12*(1-t)}px)`}})},ct=1e-4,lt=new Set(["dip","push-left"]),Et=["opacity","transform","clipPath","filter"],Wt=Object.keys(st),Tt=/^\\s*(?:(h)(\\d+)|(end|start))?\\s*(?:([+-])?\\s*(\\d*\\.?\\d+)\\s*(b|beats?|s|secs?)?)?\\s*$/i;function ot(t,e,i,p){let o=String(t).match(Tt);if(!o||!o[1]&&!o[3]&&!o[5])throw new Error(`cannot read time "${t}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let h=e.t0;if(o[1]){let l=+o[2];if(!(l<e.hits.length))throw new Error(`"${t}": this scene has ${e.hits.length} hits (h0\\u2013h${e.hits.length-1})`);h=e.hits[l]}if(o[3]==="end"&&(h=e.t1),o[5]){let l=+o[5]*(o[4]==="-"?-1:1),w=(o[6]||"").toLowerCase();h+=l*(w.startsWith("b")?p:w.startsWith("s")?1:i)}return h}function tt(t,e,{doc:i=document,onScene:p=null,media:o="live",onMediaError:h=null}={}){let l=t,w=[],$=l.tempo,y=$?60/$.bpm:.5,j=y*($?$.beatsPerBar:4),k=$?y:1,L=i.createElement("style");L.setAttribute("data-fvs",""),L.textContent=St+`\n`+(l.css||"")+`\n`+l.scenes.filter(n=>n.css&&n.css.trim()).map(n=>`[data-scene="${n.id}"]{\n${n.css}\n}`).join(`\n`),i.head.append(L);let S=i.createElement("div");S.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(S.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),S.innerHTML=l.stage.html||"";let R=S.querySelector("[data-fvs-scenes], fvs-scenes"),F=i.createElement("div");F.className="fvs-scenes",R?R.replaceWith(F):S.prepend(F),R=F,e.append(S);let N=et(S),d=[],r={},v=l.assets||{},O=n=>v[String(n).replace(/^\\.\\//,"")]||n,M=l.scenes,_=n=>n&&n.transition&&st[n.transition.type]&&n.transition.dur>0?n.transition:null,U=M.map((n,a)=>{let u=_(M[a+1]);return u?u.dur:0}),P=[],D=[];for(let[n,a]of M.entries()){let u=i.createElement("div");u.className=`fvs-scene scene ${a.cls||""}`.trim(),u.dataset.scene=a.id,u.innerHTML=a.html||"";let f=_(M[n+1]),T=u;(_(a)||f&&lt.has(f.type))&&(T=i.createElement("div"),T.className="fvs-transition",T.append(u),D.push(T)),P.push(T),R.append(T),N.S(T===u?u:[u,T],a.t0,a.t1+U[n]);let E=typeof a.t0v=="number"?a.t0v:a.t0;r[a.id]={id:a.id,title:a.title,t0:a.t0,t1:a.t1,dur:a.t1-a.t0,t0v:E,in:typeof a.in=="number"?a.in:a.t0-E,hits:a.hits,beats:a.beats,el:u,transition:_(a)},p&&p(r[a.id])}let Y=[];M.forEach((n,a)=>{let u=_(n);u&&a>0&&Y.push({t0:n.t0,d:u.dur,fx:st[u.type],a:lt.has(u.type)?P[a-1]:null,b:P[a]})}),Y.length&&N.H(n=>{let a=Y.find(f=>n>=f.t0&&n<f.t0+f.d),u=new Map;if(a){let f=a.fx(Z(n,a.t0,a.t0+a.d,"io"),l.width,l.height);f.a&&a.a&&u.set(a.a,f.a),f.b&&u.set(a.b,f.b)}for(let f of D){let T=u.get(f);for(let E of Et)f.style[E]=T&&T[E]!==void 0?String(T[E]):""}});function s(n,a){let u=x=>typeof x=="string"?[...a.querySelectorAll(x)]:x==null?[]:x instanceof Element?[x]:[...x],f=(x,A,z)=>N.K(u(x),A,z),T=(x,A,z)=>N.S(u(x),A,z),E=x=>n.t0+x*k,B=(x,A=0)=>x<n.hits.length?n.hits[x]+A*k:NaN,H=(x,A,z)=>f(x,[[A-.01,{o:0}],[A,{o:1},"step"]],z),C=(x,A,z={y:20},q)=>f(x,[[A-.01,{o:0,...z}],[A,{o:1},"step"],[A+.18,{x:0,y:0},"out"]],q),W=(x,A,z=y/2,q)=>f(x,[[A,{o:0}],[A+z,{o:1},"out"]],q),X=(x,A,z=n.t1+(n.tail||0))=>u(x).forEach((q,J)=>J<A.length&&N.S(q,A[J],A[J+1]??z));return{t0:n.t0,t1:n.t1,dur:n.t1-n.t0,hits:n.hits||[],beat:y,bar:j,unit:k,at:E,hit:B,root:a,stage:S,$:x=>a.querySelector(x),$$:x=>[...a.querySelectorAll(x)],K:f,S:T,H:x=>N.H(x),on:x=>N.H(x),type:(x,A,z,q)=>N.type(u(x),A,z,q),cut:H,slide:C,fade:W,seq:X,flash:(x,A=.85)=>d.push([x,A]),grain:(x=".grain")=>it({q:u,H:N.H},x),prog:Z,ease:V,clamp:G,lerp:rt,rng:Q,scenes:r,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:$},width:l.width,height:l.height,fps:l.fps,length:l.length,during:x=>x.map(A=>Array.isArray(A)?A:r[A]?[r[A].t0,r[A].t1]:[0,0]),inside:(x,A)=>A.some(([z,q])=>x>=z&&x<q)}}function c(n,a,u,f){if(!n||!n.trim())return;let T=Object.keys(a);try{new Function(...T,`${n}\n//# sourceURL=fvs://${u}.js`)(...T.map(E=>a[E]))}catch(E){let B=String(E&&E.stack||"").match(new RegExp(`fvs://${u.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")}\\\\.js:(\\\\d+)`));w.push({scene:u.replace(/^scene\\//,""),message:String(E&&E.message||E),line:B&&f?f+ +B[1]-3:f||0})}}function m(n,a){let u=(f,T)=>{try{return ot(f,n,k,y)}catch(E){return w.push({scene:n.id,message:E.message,line:0,el:T.tagName}),NaN}};for(let f of n.el.querySelectorAll("[data-seq]")){let T=String(f.dataset.seq).match(/^\\s*h(\\d+)\\s*$/);if(!T){w.push({scene:n.id,message:`data-seq="${f.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let E=[...f.children],B=+T[1],H=E.map((C,W)=>n.hits[B+W]).filter(C=>C!==void 0);H.length<E.length&&w.push({scene:n.id,message:`data-seq has ${E.length} items but only ${H.length} hits from h${B}`}),a.seq(E,H,f.dataset.seqEnd?u(f.dataset.seqEnd,f):n.t1+(n.tail||0))}for(let f of n.el.querySelectorAll("[data-in], [data-out]")){let T=f.dataset.each!==void 0?+f.dataset.each*k:null,E=T!==null?[...f.children]:[f],B=f.dataset.in!==void 0?u(f.dataset.in,f):null,H=f.dataset.out!==void 0?u(f.dataset.out,f):null,C=(f.dataset.fx||"cut").toLowerCase(),W=(f.dataset.fxOut||"cut").toLowerCase(),X=+f.dataset.dist||24,x=f.dataset.dur!==void 0?+f.dataset.dur*k:y/2;E.forEach((A,z)=>{let q=B===null?null:B+(T||0)*z,J=[];if(q!==null&&!isNaN(q))if(C==="type")N.type([A],q,+f.dataset.cps||30);else if(C==="fade")J.push([q,{o:0}],[q+x,{o:1},"out"]);else if(C==="pop")J.push([q-.01,{o:0,s:.92}],[q,{o:1},"step"],[q+.25,{s:1},"back"]);else if(/^(up|down|left|right)$/.test(C)){let dt={up:{y:X},down:{y:-X},left:{x:X},right:{x:-X}}[C];J.push([q-.01,{o:0,...dt}],[q,{o:1},"step"],[q+.18,{x:0,y:0},"out"])}else J.push([q-.01,{o:0}],[q,{o:1},"step"]);H!==null&&!isNaN(H)&&(W==="fade"?(J.length||J.push([n.t0,{o:1}]),J.push([H,{o:1}],[H+x,{o:0},"in"])):N.S([A],-1e9,H)),J.length&&N.K([A],J)})}}if(M.forEach((n,a)=>{let u=r[n.id],f={...u,t0:u.t0v,dur:u.t1-u.t0v,tail:U[a]},T=s(f,u.el);m(f,T),c(n.js,T,`scene/${n.id}`,n.line)}),c(l.stage.js,s({id:"stage",t0:0,t1:l.length,hits:[],el:S},S),"stage",l.stage.line),l.captions&&l.captions.length){let n=i.createElement("div"),a=l.captionStyle||{};n.className="fvs-captions",n.dataset.position=a.position==="top"?"top":"bottom",n.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[a.size]||.045))}px`,S.append(n);let u=/<\\/?[a-z][^>]*>/gi,f="";N.H(T=>{let E=T-ct,B=l.captions.filter(C=>E>=C.t0-1e-6&&E<C.t1-1e-6&&C.text),H=B.map(C=>`${C.t0}\\0${C.text}`).join("");H!==f&&(f=H,n.replaceChildren(...B.map(C=>{let W=i.createElement("div");return W.className="fvs-caption",W.textContent=C.text.replace(u,""),W})))})}let g=[...S.querySelectorAll("[data-fvs-flash]")];g.length&&(d.sort((n,a)=>n[0]-a[0]),N.H(n=>{let a=0;for(let[u,f]of d)n>=u&&n<u+.18&&(a=Math.max(a,f*(1-(n-u)/.18)**2));for(let u of g)u.style.opacity=a}));let b=at([...M.map((n,a)=>({id:n.id,el:r[n.id].el,from:n.t0,to:n.t1+U[a],base:r[n.id].t0v})),{id:"stage",el:{querySelectorAll:n=>[...S.querySelectorAll(n)].filter(a=>!R.contains(a))},from:-1/0,to:1/0,base:0}],{mode:o,assets:l.assets,errors:w,onError:h});return{root:S,errors:w,scenes:r,seek:n=>{let a=n+ct;return N.render(a),b?b.seek(a):void 0},payload:l,videos:b,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:n=>{b&&b.transport(n)},ready:()=>b?b.ready():Promise.resolve(),destroy(){b&&b.destroy(),S.remove(),L.remove()}}}var At=t=>t.trim().replace(/^\\.\\//,"");var Lt=t=>({id:t.id,kind:"track",src:t.src,url:t.url??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!!t.mute,role:t.role}),Mt=(t,e={})=>({id:t.id,kind:"video",scene:t.scene,src:t.src,url:t.url??e[At(t.src)]??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!1,loop:!!t.loop});var ut=t=>t?[...(t.audio||[]).map(Lt),...(t.media||[]).map(e=>Mt(e,t.assets))]:[];var Nt=`\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\n.fvs-bar{display:flex;gap:10px;align-items:center}\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\n`,ft=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;function jt(){let t=document.getElementById("fvs-data");return JSON.parse(t.textContent)}function Ot(t,e,i,p){let o=!1,h=0,l=0,w=()=>o?Math.min(i,h+(performance.now()-l)/1e3):h,$=y=>{let j=w();for(let k of e){let{el:L}=k,S=L.duration,R=k.loop&&S>0&&Number.isFinite(S),F=j-k.at+k.in;R&&(F=(F%S+S)%S);let N=k.dur!=null&&j>=k.at+k.dur;if(!o||j<k.at||N||F>(S||1/0)){L.paused||L.pause(),j<k.at&&L.currentTime!==k.in&&(L.currentTime=k.in);continue}let d=Math.abs(L.currentTime-F);(y||(R?Math.min(d,S-d):d)>.08)&&(L.currentTime=F),L.paused&&L.play().catch(()=>{})}};return{now:w,sync:$,get playing(){return o},play(){h>=i&&(h=0),o=!0,l=performance.now(),$(!0)},pause(){h=w(),o=!1,$()},seek(y){h=Math.max(0,Math.min(i,y)),l=performance.now(),$(!0)},tick(){o&&w()>=i?(h=i,o=!1,$(),p&&p()):o&&$()}}}function Ct(t,e,i){let p=()=>{t.root.style.transform=`scale(${e.clientWidth/i.width})`};new ResizeObserver(p).observe(e),p()}function qt(t){let e=document.createElement("style");e.textContent=Nt,document.head.append(e);let i=document.createElement("main");i.className="fvs-app",i.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\u25B6 \\u64AD\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\u8FDB\\u5EA6"><output></output></div>\n    <ol class="fvs-chapters" aria-label="\\u7AE0\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(i),i.querySelector("h1").textContent=t.title||"";let p=i.querySelector(".fvs-frame");p.style.aspectRatio=`${t.width} / ${t.height}`,p.style.maxWidth=`calc((100vh - 200px) * ${t.width/t.height})`,p.style.margin="0 auto",p.setAttribute("aria-label",t.title||"video");let o=tt(t,p);Ct(o,p,t);let h=ut(t).filter(r=>!r.mute).map(r=>{let v=new Audio(r.url);return v.preload="auto",v.loop=!!r.loop,v.volume=Math.min(1,10**((r.gain||0)/20)),{el:v,at:r.at,in:r.in,dur:r.dur,loop:!!r.loop}}),l=i.querySelector(".fvs-play"),w=i.querySelector("input"),$=i.querySelector("output");w.max=t.length;let y=Ot(t,h,t.length),j=i.querySelector(".fvs-chapters");j.innerHTML=t.scenes.map(r=>`<li><button type="button" data-t="${r.t0}"><b>${r.t0.toFixed(1)}</b></button></li>`).join(""),[...j.querySelectorAll("button")].forEach((r,v)=>r.append(t.scenes[v].title||t.scenes[v].id));let k=[...j.querySelectorAll("button")];if(o.errors.length){let r=i.querySelector(".fvs-err");r.hidden=!1,r.textContent=o.errors.map(v=>`${v.scene}${v.line?`:${v.line}`:""} ${v.message}`).join(`\n`)}let L=()=>y.playing?y.pause():y.play();l.addEventListener("click",L),p.addEventListener("click",L),w.addEventListener("input",()=>y.seek(+w.value)),k.forEach(r=>r.addEventListener("click",()=>{y.seek(+r.dataset.t),y.playing||y.play()})),document.addEventListener("keydown",r=>{r.target.closest&&r.target.closest("input,button,textarea")||(r.code==="Space"&&(r.preventDefault(),L()),r.code==="ArrowRight"&&y.seek(y.now()+2),r.code==="ArrowLeft"&&y.seek(y.now()-2))});let S=-1,R=null,F=t.scenes.length?Math.min(t.length,t.scenes[Math.min(1,t.scenes.length-1)].t0+.8):0,N=!1,d=()=>{y.tick();let r=N||y.playing?y.now():F;y.playing&&(N=!0),y.playing!==R&&(R=y.playing,o.transport(R)),r!==S&&(o.seek(r),S=r),w.value=r,$.textContent=`${ft(r)} / ${ft(t.length)}`,l.textContent=y.playing?"\\u275A\\u275A \\u6682\\u505C":"\\u25B6 \\u64AD\\u653E",k.forEach((v,O)=>v.classList.toggle("on",r>=t.scenes[O].t0&&r<t.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{N=!0}),requestAnimationFrame(d),window.__fvs={stage:o,clock:y}}function Rt(t){document.documentElement.style.background="#000",document.body.style.margin="0";let e=tt(t,document.body,{media:"capture"});e.root.style.transform="none",e.seek(0),window.__stage={w:t.width,h:t.height,dur:t.length,fps:t.fps,errors:e.errors,audio:t.audio,media:t.media||[],seek:i=>e.seek(i),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(i=>i.complete?0:i.decode().catch(()=>0)),e.ready()]))}}var Ft=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _t(t){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let e=document.createElement("div");e.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${t.width}/${t.height};width:min(100vw, calc(100vh * ${t.width/t.height}))`,document.body.append(e);let i={},p=new WeakMap,o=new WeakMap,h=new WeakMap,l=d=>{let r=[],v=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let M;M=O.nextNode();){if(!/\\S/.test(M.data)||M.parentElement&&Ft.test(M.parentElement.tagName))continue;p.set(M,r.length);let _=M.parentElement;o.has(_)||o.set(_,[]),o.get(_).push(r.length),r.push({node:M,el:_})}v.forEach((M,_)=>h.set(M,_)),i[d.id]={texts:r,imgs:v}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),$=tt(t,e,{onScene:l,onMediaError:(d,r)=>w({type:"media-error",scene:d,src:r})}),y=()=>{$.root.style.transform=`scale(${e.clientWidth/t.width})`};new ResizeObserver(y).observe(e),y();let j=0;$.seek(0);let k=document.createElement("div");k.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",e.append(k);let L=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),S=d=>{if(!d){k.style.display="none";return}let r=e.getBoundingClientRect();Object.assign(k.style,{display:"",left:`${d.x-r.left-3}px`,top:`${d.y-r.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},R=d=>{let r=d&&d.closest&&d.closest("[data-scene]");return r?r.dataset.scene:null};function F(d,r){let v=document.elementFromPoint(d.clientX,d.clientY),O=R(v);if(!O||!i[O]){w({type:"pick",scene:null,dbl:r});return}if(v.tagName==="IMG"&&h.has(v)){w({type:"pick",scene:O,img:h.get(v),rect:L(v.getBoundingClientRect()),dbl:r});return}let M=null,_=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);_&&_.startContainer.nodeType===3&&p.has(_.startContainer)&&(M=p.get(_.startContainer));for(let D=v;M===null&&D&&D!==e;D=D.parentElement)o.has(D)&&(M=o.get(D)[0]);if(M===null){w({type:"pick",scene:O,dbl:r});return}let U=i[O].texts[M],P=U.node.isConnected?(()=>{let D=document.createRange();return D.selectNodeContents(U.node),D.getBoundingClientRect()})():U.el.getBoundingClientRect();w({type:"pick",scene:O,text:M,rect:L(P.width?P:U.el.getBoundingClientRect()),dbl:r})}e.addEventListener("click",d=>F(d,!1)),e.addEventListener("dblclick",d=>{d.preventDefault(),F(d,!0)}),window.addEventListener("message",d=>{let r=d.data||{};if(r.fvs==="seek")j=r.t,$.seek(r.t);else if(r.fvs==="transport")$.transport(!!r.playing);else if(r.fvs==="outline"){let v=i[r.scene],O=v?r.img!=null?v.imgs[r.img]:r.text!=null&&v.texts[r.text]?v.texts[r.text].el:null:null;S(O&&O.isConnected&&O.getClientRects().length?L(O.getBoundingClientRect()):null)}});let N=d=>Object.fromEntries(Object.entries(i).map(([r,v])=>[r,v[d].length]));w({type:"ready",length:t.length,errors:$.errors,texts:N("texts"),imgs:N("imgs")}),window.__fvs={stage:$,seek:d=>$.seek(d)}}function It(t){let e=jt(),i=typeof window<"u"&&window.FVS_MODE||t||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");i==="capture"?Rt(e):i==="embed"?_t(e):qt(e)}return yt(Ht);})();\n';

  // src/runtime/engine.js
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // src/runtime/player.js
  var TRANSITION = {
    fade: (p) => ({ b: { opacity: p } }),
    dip: (p) => ({ a: { opacity: clamp(1 - 2 * p) }, b: { opacity: clamp(2 * p - 1) } }),
    // through the stage background
    "slide-left": (p, W) => ({ b: { transform: "translateX(".concat((1 - p) * W, "px)") } }),
    "slide-up": (p, W, H) => ({ b: { transform: "translateY(".concat((1 - p) * H, "px)") } }),
    "push-left": (p, W) => ({ a: { transform: "translateX(".concat(-p * W, "px)") }, b: { transform: "translateX(".concat((1 - p) * W, "px)") } }),
    "wipe-left": (p) => ({ b: { clipPath: "inset(0 0 0 ".concat((1 - p) * 100, "%)") } }),
    // revealed from the right edge, the edge travelling left
    zoom: (p) => ({ b: { opacity: p, transform: "scale(".concat(1.08 - 0.08 * p, ")") } }),
    blur: (p) => ({ b: { opacity: p, filter: "blur(".concat(12 * (1 - p), "px)") } })
  };
  var TRANSITION_TYPES = Object.keys(TRANSITION);
  var TIME = /^\s*(?:(h)(\d+)|(end|start))?\s*(?:([+-])?\s*(\d*\.?\d+)\s*(b|beats?|s|secs?)?)?\s*$/i;
  function timeExpr(expr, sc, unit, beat) {
    const m = String(expr).match(TIME);
    if (!m || !m[1] && !m[3] && !m[5]) throw new Error('cannot read time "'.concat(expr, '" (use h3, h3+0.5, 2b, 1.5s or end-1)'));
    let t2 = sc.t0;
    if (m[1]) {
      const i = +m[2];
      if (!(i < sc.hits.length)) throw new Error('"'.concat(expr, '": this scene has ').concat(sc.hits.length, " hits (h0\u2013h").concat(sc.hits.length - 1, ")"));
      t2 = sc.hits[i];
    }
    if (m[3] === "end") t2 = sc.t1;
    if (m[5]) {
      const x = +m[5] * (m[4] === "-" ? -1 : 1), u = (m[6] || "").toLowerCase();
      t2 += x * (u.startsWith("b") ? beat : u.startsWith("s") ? 1 : unit);
    }
    return t2;
  }

  // src/ui/styles.js
  var CSS2 = "\n.fvs-studio,.fvs-extension,.fvs-layer{\n --fv-text:var(--text,#1c1c1c);--fv-muted:var(--text-muted,#5f5f5d);--fv-line:var(--border,#e6e5e3);\n --fv-card:var(--bg-card,#fdfdfc);--fv-accent:var(--accent-ink,var(--accent,#1c1c1c));\n --fv-accent-soft:var(--accent-light,color-mix(in srgb,var(--fv-accent) 9%,transparent));\n --fv-fill:var(--action-fill,var(--fv-accent));--fv-on-fill:var(--on-action,var(--on-accent,#fff));\n --fv-hover:var(--overlay-light,color-mix(in srgb,var(--fv-text) 4%,transparent));\n --fv-press:var(--overlay-medium,color-mix(in srgb,var(--fv-text) 7%,transparent));\n --fv-strong:var(--overlay-strong,color-mix(in srgb,var(--fv-text) 14%,transparent));\n --fv-ok:var(--green,#4f6f52);--fv-warn:var(--warning,#806000);--fv-bad:var(--danger,#a3503f);\n --fv-wave:color-mix(in srgb,var(--fv-accent) 62%,transparent);\n --fv-caption:var(--ui-font-caption,11px);--fv-meta:var(--ui-font-meta,12px);--fv-body:var(--ui-font-body,13px);\n --fv-heading:var(--ui-font-heading,14px);--fv-title:var(--ui-font-title,16px);\n --fv-control:var(--ui-control-height,28px);--fv-r-sm:var(--radius-sm,6px);--fv-r-md:var(--radius-md,12px);--fv-r-lg:var(--radius-lg,16px);\n --fv-mono:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);--fv-ui:var(--font-ui,system-ui,-apple-system,\"PingFang SC\",sans-serif);\n --fv-shadow:var(--card-shadow,0 8px 24px rgba(0,0,0,.12));--fv-fast:var(--duration-fast,.15s);\n --fv-scrim:linear-gradient(180deg,rgba(0,0,0,.8) 0,rgba(0,0,0,.7) 60%,rgba(0,0,0,0));\n color:var(--fv-text);font:var(--fv-body)/1.45 var(--fv-ui)}\n.fvs-studio *,.fvs-extension *,.fvs-layer *{box-sizing:border-box}\n.fvs-studio [hidden],.fvs-extension [hidden],.fvs-layer [hidden]{display:none!important}\n.fvs-studio :is(button,input,select,textarea),.fvs-extension :is(button,input,select,textarea),.fvs-layer :is(button,input,select,textarea){font:inherit;color:inherit}\n.fvs-studio button,.fvs-extension button,.fvs-layer button{cursor:pointer}\n.fvs-studio svg,.fvs-extension svg,.fvs-layer svg{flex-shrink:0;display:block;pointer-events:none}\n.fvs-studio :focus-visible,.fvs-extension :focus-visible,.fvs-layer :focus-visible{outline:var(--focus-ring,1px) solid var(--fv-accent);outline-offset:1px}\n.fvs-grow{flex:1}\n.fvs-studio{position:relative;height:100%;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;outline:none;background:transparent}\n\n/* buttons: the Genesis .btn vocabulary \u2014 outlined by default, one filled primary per surface */\n.fvs-btn{height:var(--fv-control);padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--fv-r-sm);background:transparent;color:var(--fv-text);display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;font-size:var(--fv-meta);line-height:1;transition:background var(--fv-fast),border-color var(--fv-fast),color var(--fv-fast)}\n.fvs-btn:hover:not(:disabled){border-color:var(--fv-accent);color:var(--fv-accent)}\n.fvs-btn:disabled{opacity:.45;cursor:default}\n.fvs-btn svg{width:15px;height:15px}\n.fvs-btn.primary{background:var(--fv-fill);border-color:transparent;color:var(--fv-on-fill);box-shadow:var(--btn-shadow,none)}\n.fvs-btn.primary:hover:not(:disabled){background:var(--action-fill-hover,var(--fv-fill));color:var(--fv-on-fill);border-color:transparent}\n.fvs-btn.ghost,.fvs-btn.icon{border-color:transparent;color:var(--fv-muted)}\n.fvs-btn.ghost:hover:not(:disabled),.fvs-btn.icon:hover:not(:disabled){background:var(--fv-hover);border-color:transparent;color:var(--fv-text)}\n.fvs-btn.icon{width:var(--fv-control);padding:0}\n.fvs-btn.icon[aria-pressed=true],.fvs-btn[aria-expanded=true]{background:var(--fv-accent-soft);color:var(--fv-accent);border-color:transparent}\n.fvs-btn.danger{color:var(--fv-bad);border-color:color-mix(in srgb,var(--fv-bad) 35%,transparent)}\n.fvs-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--fv-bad) 8%,transparent);border-color:var(--fv-bad);color:var(--fv-bad)}\n.fvs-link{display:inline-flex;align-items:center;gap:4px;border:0;background:none;padding:0;color:var(--fv-accent);font-size:var(--fv-meta);text-align:left}\n.fvs-link svg{width:13px;height:13px}\n\n/* top bar: project, save state, history, the Director, export */\n.fvs-bar{display:flex;align-items:center;gap:12px;min-width:0;min-height:46px;padding:6px 10px 2px 16px}\n.fvs-title-group{display:flex;align-items:center;gap:10px;min-width:0}\n.fvs-project{display:inline-flex;align-items:center;gap:4px;min-width:0;max-width:min(52ch,50vw);height:30px;padding:0 6px;margin-left:-6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-heading);font-weight:600}\nbutton.fvs-project:hover{background:var(--fv-hover)}\n.fvs-project-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-project svg{width:14px;height:14px;color:var(--fv-muted)}\n.fvs-status{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:var(--fv-caption);color:var(--fv-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-status::before{content:'';flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--fv-ok)}\n.fvs-status:is([data-state=unsaved],[data-state=saving],[data-state=loading])::before{background:var(--fv-warn)}\n.fvs-status[data-state=save-failed]{color:var(--fv-bad)}\n.fvs-status[data-state=save-failed]::before{background:var(--fv-bad)}\n.fvs-bar-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}\n.fvs-history{display:flex;gap:2px;margin-right:6px}\n.fvs-ai-action svg{color:var(--fv-accent)}\n.fvs-export-action svg:last-child,.fvs-ai-action[aria-haspopup] svg:last-child{width:13px;height:13px;margin-left:-2px;opacity:.75}\n.fvs-ai-action[aria-haspopup] svg:last-child{color:inherit}\n\n/* stage */\n.fvs-main{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 300px;min-height:0;min-width:0}\n.fvs-studio.medium .fvs-main{grid-template-columns:minmax(0,1fr) 272px}\n:is(.fvs-studio,.fvs-dock-timeline).medium :is(.fvs-timeline-duration,.fvs-snap-control > span){display:none}\n:is(.fvs-studio,.fvs-dock-timeline).medium .fvs-zoom-controls input{width:64px}\n.fvs-studio.inspector-hidden .fvs-main{grid-template-columns:minmax(0,1fr)}\n.fvs-studio.inspector-hidden .fvs-side{display:none}\n.fvs-preview{display:grid;grid-template-rows:minmax(0,1fr) auto;min-width:0;min-height:0}\n.fvs-viewport{display:grid;place-items:center;overflow:hidden;min-height:0;min-width:0;padding:10px 20px 8px}\n.fvs-view{position:relative;min-width:0;background:#000;border-radius:var(--fv-r-sm);box-shadow:var(--fv-shadow);overflow:hidden}\n.fvs-view iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#000}\n.fvs-view iframe.fvs-pending{visibility:hidden}\n.fvs-gate,.fvs-blank{position:absolute;inset:0;z-index:4;display:grid;place-items:center;padding:20px;overflow:auto;text-align:center;background:var(--fv-card);color:var(--fv-text)}\n.fvs-blank{z-index:3}\n.fvs-blank[hidden]{display:none}\n.fvs-gate > div,.fvs-blank > div{max-width:400px;display:grid;gap:10px;justify-items:center}\n.fvs-gate svg{width:22px;height:22px;color:var(--fv-warn)}\n.fvs-blank > div > svg{width:22px;height:22px;color:var(--fv-muted)}\n.fvs-gate h3,.fvs-blank h3{margin:0;font-size:var(--fv-heading);font-weight:600}\n.fvs-gate p,.fvs-blank p{margin:0 0 4px;color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.6}\n.fvs-blank-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}\n.fvs-errs{position:absolute;left:8px;right:8px;bottom:8px;z-index:3;max-height:40%;overflow:auto;padding:8px 10px;border:1px solid color-mix(in srgb,var(--fv-bad) 40%,transparent);border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-bad) 7%,var(--fv-card));color:var(--fv-bad);font:var(--fv-meta)/1.5 var(--fv-mono);white-space:pre-wrap}\n.fvs-inline{position:absolute;z-index:5;min-width:160px;display:grid;gap:4px}\n.fvs-inline textarea{width:100%;resize:none;padding:6px 8px;border:1px solid var(--fv-accent);border-radius:var(--fv-r-sm);box-shadow:0 0 0 .5px var(--fv-accent),var(--fv-shadow);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-heading);line-height:1.4;outline:none}\n.fvs-inline small{justify-self:start;padding:2px 6px;border-radius:4px;background:var(--fv-card);color:var(--fv-muted);font-size:var(--fv-caption)}\n\n/* transport: where you are on the left, playback in the middle, view options on the right */\n.fvs-transport{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;min-width:0;min-height:44px;padding:0 12px 4px 20px}\n.fvs-transport-info{display:flex;align-items:baseline;gap:10px;min-width:0}\n.fvs-current-scene{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-time{font:var(--fv-meta)/1 var(--fv-mono);font-variant-numeric:tabular-nums;color:var(--fv-muted);white-space:nowrap}\n.fvs-playback-actions{display:flex;align-items:center;gap:2px}\n.fvs-play{width:36px;height:36px;margin:0 6px;padding:0;border:0;border-radius:50%;background:var(--fv-press);color:var(--fv-text)}\n.fvs-play:hover:not(:disabled){background:var(--fv-strong);color:var(--fv-text)}\n.fvs-play svg{width:17px;height:17px}\n.fvs-play[data-playing=false] svg{margin-left:2px}\n.fvs-preview-options{display:flex;align-items:center;justify-content:flex-end;gap:2px}\n\n/* inspector: tabs are the header; the native Extend View supplies its own title and close button */\n.fvs-side{display:grid;grid-template-rows:auto minmax(0,1fr);min-height:0;min-width:0;border-left:1px solid var(--fv-line)}\n.fvs-side-top{display:flex;align-items:center;gap:4px;padding:6px 8px 4px 10px}\n.fvs-tabs{display:flex;gap:2px;flex:1;min-width:0;overflow:hidden}\n.fvs-tabs button{height:28px;padding:0 10px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}\n.fvs-tabs button:hover{background:var(--fv-hover);color:var(--fv-text)}\n.fvs-tabs button[aria-selected=true]{background:var(--fv-press);color:var(--fv-text)}\n.fvs-panel{overflow:auto;padding:10px 14px 24px;display:grid;gap:20px;align-content:start;min-width:0}\n.fvs-section{display:grid;gap:10px;min-width:0}\n.fvs-section > h4,.fvs-panel > h4{margin:0;font-size:var(--fv-meta);font-weight:600;color:var(--fv-muted)}\n.fvs-hint{margin:0;color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.55}\n.fvs-field{display:grid;gap:5px;min-width:0}\n.fvs-field > span{font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-row{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;min-width:0}\n.fvs-row > .fvs-field{flex:1;min-width:76px}\n.fvs-input{width:100%;height:var(--fv-control);min-width:0;padding:0 8px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-meta);outline:none;transition:border-color var(--fv-fast)}\n.fvs-input:focus{border-color:var(--fv-accent)}\n.fvs-input:disabled{opacity:.5}\ntextarea.fvs-input{height:auto;min-height:32px;padding:6px 8px;resize:vertical;line-height:1.5}\nselect.fvs-input{padding:0 4px}\n.fvs-check{display:inline-flex;align-items:center;gap:6px;font-size:var(--fv-meta);color:var(--fv-text);white-space:nowrap;cursor:pointer}\n.fvs-check input{margin:0;accent-color:var(--fv-accent)}\n.fvs-empty{display:grid;justify-items:center;gap:8px;padding:28px 12px;text-align:center;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-empty svg{width:20px;height:20px}\n.fvs-empty p{margin:0}\n.fvs-scene-head{display:grid;gap:4px}\n.fvs-scene-head > div{display:flex;justify-content:space-between;gap:8px;font:var(--fv-caption)/1.4 var(--fv-mono);color:var(--fv-muted)}\n.fvs-studio .fvs-title-input,.fvs-extension .fvs-title-input{height:34px;margin-left:-7px;width:calc(100% + 7px);padding:0 6px;border-color:transparent;background:transparent;font-size:var(--fv-heading);font-weight:600}\n.fvs-title-input:hover{border-color:var(--fv-line)}\n.fvs-title-input:focus{border-color:var(--fv-accent);background:var(--fv-card)}\n.fvs-unit-row{display:grid;grid-template-columns:minmax(0,1fr) 84px;gap:6px;align-items:center}\n.fvs-unit{font-size:var(--fv-meta);color:var(--fv-muted);padding-left:2px}\n.fvs-scene-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}\n.fvs-scene-actions .fvs-btn{justify-content:flex-start}\n.fvs-advanced summary{display:flex;align-items:center;gap:7px;list-style:none;cursor:pointer;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-advanced summary::-webkit-details-marker{display:none}\n.fvs-advanced summary svg{width:14px;height:14px}\n.fvs-advanced summary::after{content:'';margin-left:auto;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;rotate:-45deg;transition:rotate var(--fv-fast)}\n.fvs-advanced[open] summary::after{rotate:45deg}\n.fvs-advanced .fvs-section{margin-top:12px}\n.fvs-timed{display:grid;grid-template-columns:minmax(0,1fr) 52px 52px 70px;gap:4px;align-items:center;font-size:var(--fv-caption)}\n.fvs-timed.head small{color:var(--fv-muted)}\n.fvs-timed .fvs-input{height:26px;padding:0 5px;font-size:var(--fv-caption)}\n.fvs-timed .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-timed.on .lbl{color:var(--fv-accent);font-weight:500}\n.fvs-media-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center}\n.fvs-media-row > input[type=file]{display:none}\n.fvs-media-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:var(--fv-r-sm);background:var(--fv-hover);color:var(--fv-muted)}\n.fvs-media-thumb{width:40px;height:40px;object-fit:cover;border-radius:var(--fv-r-sm);background:var(--fv-hover)}\n.fvs-media-main{display:grid;gap:6px;min-width:0}\n.fvs-media-main .fvs-row{align-items:center}\n.fvs-media-name{font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}\n.fvs-track-card{display:grid;gap:8px;padding:10px;border-radius:var(--fv-r-md);background:var(--fv-hover)}\n@keyframes fvs-flash{from{background:var(--fv-accent-soft);box-shadow:inset 0 0 0 1px var(--fv-accent)}}\n.fvs-track-card.flash{animation:fvs-flash 1.4s ease-out}\n.fvs-track-head{display:flex;align-items:center;gap:8px;min-width:0}\n.fvs-track-head svg{width:14px;height:14px;color:var(--fv-muted)}\n.fvs-track-head .fvs-media-name{flex:1}\n.fvs-color-row{display:grid;grid-template-columns:var(--fv-control) minmax(0,1fr);gap:6px}\n.fvs-color-row input[type=color]{width:var(--fv-control);height:var(--fv-control);padding:2px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card)}\n.fvs-segmented{display:flex;gap:2px;padding:2px;border-radius:var(--fv-r-sm);background:var(--fv-hover);min-width:0}\n.fvs-segmented button{flex:1;min-width:0;height:24px;padding:0 8px;border:0;border-radius:calc(var(--fv-r-sm) - 2px);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-segmented button[aria-checked=true]{background:var(--fv-card);color:var(--fv-text);box-shadow:var(--btn-shadow,0 0 0 1px var(--fv-line))}\n.fvs-segmented button:disabled{opacity:.45}\n.fvs-code-block{border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);overflow:hidden}\n.fvs-code{display:block;width:100%;min-height:150px;padding:10px;border:0;background:var(--fv-hover);color:var(--fv-text);font:var(--fv-meta)/1.6 var(--fv-mono);resize:vertical;white-space:pre;tab-size:2;outline:none}\n.fvs-code-footer{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 4px 10px;color:var(--fv-muted);font-size:var(--fv-caption)}\n.fvs-code-footer .fvs-btn{height:24px}\n.fvs-text-head{display:flex;align-items:center;gap:10px}\n.fvs-text-head .fvs-hint{flex:1}\n.fvs-list{display:grid;gap:8px}\n.fvs-text-item{display:grid;gap:6px}\n.fvs-text-item.on textarea{border-color:var(--fv-accent)}\n.fvs-cap-actions{display:flex;flex-wrap:wrap;gap:6px}\n.fvs-cap-actions > input[type=file]{display:none}\n.fvs-cap-list{display:grid;gap:12px}\n.fvs-cap-item{display:grid;gap:6px}\n.fvs-cap-times{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto auto;gap:6px;align-items:center}\n.fvs-cap-item.on textarea{border-color:var(--fv-accent)}\n.fvs-meta{display:flex;justify-content:flex-end}\n.fvs-suggest{display:grid;gap:8px;padding:8px 10px;border-radius:var(--fv-r-sm);background:var(--fv-accent-soft);font-size:var(--fv-meta)}\n.fvs-problems{display:grid;gap:4px;font:var(--fv-meta)/1.5 var(--fv-mono);overflow-wrap:anywhere}\n.fvs-problems .e{color:var(--fv-bad)} .fvs-problems .w{color:var(--fv-warn)}\n.fvs-banner{position:absolute;left:50%;top:52px;translate:-50% 0;z-index:20;display:flex;gap:10px;align-items:center;max-width:min(640px,94%);padding:10px 12px;border:1px solid color-mix(in srgb,var(--fv-warn) 45%,transparent);border-radius:var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow);font-size:var(--fv-meta)}\n\n/* timeline: a tinted band under the stage \u2014 no hairlines, the lanes carry the structure */\n.fvs-tl{display:grid;grid-template-rows:10px auto var(--fv-timeline-height,200px);min-width:0;user-select:none;-webkit-user-select:none;background:var(--fv-hover)}\n.fvs-tl-resize{cursor:row-resize;display:grid;place-items:center;touch-action:none}\n.fvs-tl-resize::after{content:'';width:32px;height:3px;border-radius:2px;background:var(--fv-strong);opacity:0;transition:opacity var(--fv-fast)}\n.fvs-tl:hover .fvs-tl-resize::after,.fvs-tl-resize:focus-visible::after{opacity:1}\n.fvs-tl-bar{display:flex;align-items:center;gap:8px;min-width:0;padding:0 10px 6px;font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-tl-tools{display:flex;align-items:center;gap:2px}\n.fvs-tl-sep{width:1px;height:16px;margin:0 6px;background:var(--fv-strong)}\n.fvs-tl-tools .fvs-tl-add,.fvs-tl-tools .fvs-tl-import{border-color:transparent;color:var(--fv-text)}\n.fvs-tl-tools .fvs-tl-add:hover:not(:disabled),.fvs-tl-tools .fvs-tl-import:hover:not(:disabled){background:var(--fv-press);border-color:transparent;color:var(--fv-text)}\n.fvs-sync-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap}\n.fvs-sync-chip:hover{color:var(--fv-text);border-color:var(--fv-accent)}\n.fvs-sync-chip i{width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}\n.fvs-sync-chip[data-state=ok] i{background:var(--fv-ok)}\n.fvs-sync-chip[data-state=warn] i{background:var(--fv-warn)}\n.fvs-timeline-duration{font:var(--fv-caption)/1 var(--fv-mono);white-space:nowrap}\n.fvs-snap-control{display:flex;align-items:center;gap:6px;white-space:nowrap}\n:is(.fvs-studio,.fvs-dock-timeline) .fvs-snap-control select{height:24px;padding:0 4px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-caption)}\n.fvs-zoom-controls{display:flex;align-items:center;gap:2px}\n.fvs-zoom-controls input{width:84px;margin:0 4px;accent-color:var(--fv-accent)}\n.fvs-zoom-controls .fvs-btn.ghost{height:24px;padding:0 8px}\n.fvs-tl-body{display:grid;grid-template-columns:minmax(76px,max-content) minmax(0,1fr);min-height:0;overflow:hidden auto}\n.fvs-track-rail{display:grid;grid-template-rows:24px 32px 64px 46px;grid-auto-rows:44px;align-content:start;font-size:var(--fv-caption);color:var(--fv-muted)}\n.fvs-rail-ruler{padding:6px 12px 0}\n.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane{display:flex;align-items:center;gap:6px;min-width:0;padding:0 10px 0 12px}\n.fvs-rail-captions svg,.fvs-rail-video svg,.fvs-rail-lane svg{width:14px;height:14px}\n.fvs-rail-captions span,.fvs-rail-video span,.fvs-rail-lane span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-rail-audio{display:contents}\n/* a track's name is a button: it opens the tab of the properties where its things are edited */\nbutton:is(.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane){border:0;background:transparent;text-align:left;transition:color var(--fv-fast)}\nbutton:is(.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane):hover{color:var(--fv-text)}\n.fvs-tl-scroll{position:relative;overflow:auto hidden;min-height:0}\n.fvs-tl-inner{position:relative}\n.fvs-tl-ruler{position:absolute;left:0;top:0;cursor:ew-resize}\n.fvs-tl-scenes{position:absolute;left:0;right:0;top:56px;height:64px}\n/* the captions track sits above the picture track: what is drawn on the picture is drawn above it */\n.fvs-cap-lane{position:absolute;left:0;right:0;top:24px;height:32px}\n.fvs-cap-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:9px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}\n.fvs-cap{position:absolute;top:4px;height:24px;display:flex;align-items:center;min-width:0;padding:0 7px;overflow:hidden;border:1px solid transparent;border-radius:var(--fv-r-sm);background:var(--fv-card);box-shadow:inset 0 0 0 1px var(--fv-line);color:var(--fv-text);font-size:var(--fv-caption);cursor:grab;touch-action:none}\n.fvs-cap span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}\n.fvs-cap:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}\n.fvs-cap.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}\n.fvs-cap-edge{position:absolute;top:0;bottom:0;width:6px;cursor:col-resize}\n.fvs-cap-edge.start{left:0}\n.fvs-cap-edge.end{right:0}\n.fvs-cap-edge:hover{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}\n.fvs-tl-lanes{position:absolute;left:0;right:0;top:0}\n/* what is inside the scenes sits under them: three rows of blocks */\n.fvs-el-lane{position:absolute;left:0;right:0;top:120px;height:46px}\n.fvs-el-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:15px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}\n.fvs-el{position:absolute;height:13px;display:flex;align-items:center;min-width:0;padding:0 4px 0 6px;overflow:hidden;border-radius:3px;background:color-mix(in srgb,var(--fv-text) 12%,var(--fv-card));box-shadow:inset 2px 0 0 var(--fv-muted);color:var(--fv-text);font-size:var(--fv-caption);line-height:13px;cursor:pointer}\n.fvs-el span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}\n.fvs-el:hover{background:color-mix(in srgb,var(--fv-text) 20%,var(--fv-card))}\n.fvs-el.on{background:color-mix(in srgb,var(--fv-accent) 26%,var(--fv-card));box-shadow:inset 2px 0 0 var(--fv-accent),0 0 0 1px var(--fv-accent)}\n.fvs-el.err{box-shadow:inset 2px 0 0 var(--fv-bad),0 0 0 1px var(--fv-bad)}\n.fvs-clip{position:absolute;top:6px;height:52px;border:1px solid transparent;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 14%,var(--fv-card));overflow:hidden;cursor:pointer;touch-action:none}\n.fvs-clip.alt{background:color-mix(in srgb,var(--fv-accent) 8%,var(--fv-card))}\n.fvs-clip:hover{border-color:var(--fv-strong)}\n.fvs-clip.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}\n.fvs-clip.err{border-color:var(--fv-bad)}\n.fvs-clip-thumb{position:absolute;inset:0;container-type:size;pointer-events:none}\n.fvs-scene-thumb{position:absolute;inset:0;display:block;overflow:hidden}\n.fvs-scene-thumb iframe{position:absolute;left:50%;top:50%;width:max(100cqw,calc(100cqh * var(--fv-ratio,1.7778)));height:max(100cqh,calc(100cqw / var(--fv-ratio,1.7778)));translate:-50% -50%;border:0;background:#000;pointer-events:none}\n.fvs-clip-trans{position:absolute;left:0;top:0;bottom:0;z-index:1;background:linear-gradient(90deg,color-mix(in srgb,var(--fv-accent) 60%,transparent),transparent);pointer-events:none}\n.fvs-clip-label{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:baseline;gap:6px;min-width:0;padding:5px 8px 12px;pointer-events:none}\n.fvs-clip-label b{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-clip-label small{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}\n.fvs-clip:has([data-rendered]) .fvs-clip-label{background:var(--fv-scrim)}\n.fvs-clip:has([data-rendered]) .fvs-clip-label :is(b,small){color:#fff}\n.fvs-clip.tight .fvs-clip-label{padding-inline:4px}\n.fvs-clip.tight .fvs-clip-label small{display:none}\n.fvs-clip-lane{position:absolute;left:0;right:0;bottom:1px;height:16px;z-index:3}\n.fvs-hitm{position:absolute;top:2px;width:12px;height:12px;margin-left:-6px;cursor:grab;touch-action:none}\n.fvs-hitm::before{content:'';position:absolute;left:3px;top:3px;width:6px;height:6px;rotate:45deg;border-radius:1px;background:var(--fv-card);box-shadow:0 0 0 1px var(--fv-muted)}\n.fvs-hitm.ok::before{background:var(--fv-ok);box-shadow:0 0 0 1px var(--fv-card)}\n.fvs-hitm.weak::before{background:var(--fv-warn);box-shadow:0 0 0 1px var(--fv-card)}\n.fvs-hitm.quiet::before{background:var(--fv-card);box-shadow:0 0 0 1.5px var(--fv-ok)}\n.fvs-hitm.on::before{box-shadow:0 0 0 2px var(--fv-accent)}\n.fvs-edge{position:absolute;top:0;bottom:0;z-index:4;width:7px;cursor:col-resize}\n.fvs-edge.start{left:0}\n.fvs-edge.end{right:0}\n.fvs-edge:hover,.fvs-edge.drag{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}\n.fvs-clip.tight .fvs-edge{width:4px}\n.fvs-tl-head{position:absolute;top:0;bottom:0;z-index:7;width:1.5px;margin-left:-.75px;background:var(--fv-accent);pointer-events:none}\n.fvs-tl-head::before{content:'';position:absolute;left:-4.25px;top:0;width:10px;height:10px;border-radius:2px 2px 50% 50%;background:var(--fv-accent)}\n.fvs-tl-ghost{position:absolute;top:62px;height:52px;z-index:6;border:1.5px dashed var(--fv-accent);border-radius:var(--fv-r-sm);pointer-events:none}\n.fvs-tl-ghost.move{border-style:solid;background:color-mix(in srgb,var(--fv-accent) 16%,transparent)}\n.fvs-tl-insert{position:absolute;top:58px;height:60px;z-index:7;width:2px;margin-left:-1px;border-radius:1px;background:var(--fv-accent);pointer-events:none}\n.fvs-tl.reordering .fvs-clip{cursor:grabbing}\n.fvs-tl-empty{position:absolute;left:12px;top:22px;white-space:nowrap;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-lane{position:absolute;left:0;right:0;height:44px}\n/* an empty lane says what to do with it; outside its two buttons a press still moves the playhead */\n.fvs-lane-empty{display:none;position:sticky;left:8px;width:max-content;height:100%;align-items:center;gap:2px;pointer-events:none}\n.fvs-lane.empty .fvs-lane-empty{display:flex}\n.fvs-lane-empty .fvs-btn{height:24px;padding:0 8px;font-size:var(--fv-caption);pointer-events:auto}\n.fvs-lane-empty .fvs-btn svg{width:13px;height:13px}\n.fvs-lane-hint{margin-left:6px;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap}\n.fvs-lane-region{position:absolute;top:5px;height:34px;overflow:hidden;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 9%,var(--fv-card));cursor:grab;touch-action:none}\n.fvs-lane-region:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}\n.fvs-lane-region.muted{opacity:.45}\n.fvs-lane-wave{position:absolute;left:0;top:0}\n.fvs-lane-name{position:absolute;left:8px;top:3px;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;pointer-events:none}\n\n/* panels without Extend View: a sheet over the editor */\n.fvs-sheet{position:absolute;top:46px;right:8px;bottom:8px;z-index:20;width:min(380px,calc(100% - 16px));display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden;border:1px solid var(--fv-line);border-radius:var(--fv-r-lg);background:var(--fv-card);box-shadow:var(--fv-shadow)}\n.fvs-sheet-head{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 2px 16px;font-size:var(--fv-heading)}\n.fvs-sheet-head strong{font-weight:600}\n.fvs-sheet-body{min-height:0;overflow:hidden}\n\n/* focus, narrow and compact (Mini) layouts follow the container, not the window */\n.fvs-studio.focus-preview .fvs-tl,.fvs-studio.focus-preview .fvs-side,.fvs-studio.focus-preview .fvs-dock-strip{display:none}\n.fvs-studio.narrow .fvs-main{grid-template-columns:minmax(0,1fr)}\n.fvs-studio.narrow .fvs-side{position:absolute;top:0;right:0;bottom:48px;z-index:15;width:min(320px,94%);border:1px solid var(--fv-line);border-radius:var(--fv-r-md) 0 0 var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow)}\n.fvs-studio.narrow .fvs-bar{padding-left:12px;gap:8px}\n.fvs-studio.narrow :is(.fvs-status,.fvs-history,.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-current-scene,.fvs-sync-sum){display:none}\n.fvs-dock-timeline.narrow :is(.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-sync-sum){display:none}\n:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-sync-chip{width:24px;padding:0;justify-content:center}\n.fvs-studio.narrow :is(.fvs-ai-action,.fvs-export-action) span,:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-tl-add,.fvs-tl-import) span{display:none}\n.fvs-studio.narrow .fvs-transport{padding:0 8px 4px 12px}\n:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-tl-body{grid-template-columns:44px minmax(0,1fr)}\n:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane) span,:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-rail-ruler{font-size:0}\n:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-lane-hint{display:none}\n.fvs-studio.narrow .fvs-viewport{padding:6px 10px}\n.fvs-studio.compact{grid-template-rows:auto minmax(0,1fr)}\n.fvs-studio.compact :is(.fvs-tl,.fvs-side,.fvs-history,.fvs-status,.fvs-ai-action,.fvs-export-action,.fvs-time){display:none}\n.fvs-studio.compact .fvs-preview-options > :not(:first-child){display:none}\n.fvs-studio.compact .fvs-viewport{padding:6px 8px}\n.fvs-studio.compact .fvs-bar{min-height:40px;padding:4px 6px 0 12px}\n.fvs-studio.tiny .fvs-frame-step{display:none}\n@media (prefers-reduced-motion:reduce){.fvs-studio *,.fvs-layer *{transition:none!important;animation:none!important}}\n\n/* floating layers on document.body: menus and popovers (DESIGN \xA73 \u300C\u83DC\u5355\u51E0\u4F55\u300D) */\n.fvs-layer{position:fixed;z-index:100;background:var(--fv-card);color:var(--fv-text);border:1px solid var(--fv-line);border-radius:var(--fv-r-md);box-shadow:var(--fv-shadow);animation:ui-menu-enter var(--menu-enter-duration,0s) var(--menu-enter-ease,ease-out)}\n.fvs-menu{display:grid;min-width:var(--menu-action-min,200px);max-width:var(--menu-action-max,320px);padding:var(--menu-shell-padding,4px)}\n.fvs-menu > button{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:var(--menu-item-min-height,32px);padding:4px 8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left;font-size:var(--menu-text-size,var(--fv-heading));line-height:var(--menu-line-height,20px)}\n.fvs-menu > button:hover,.fvs-menu > button:focus-visible{background:var(--menu-hover,var(--fv-press));outline:none}\n.fvs-menu > button:disabled{opacity:.45}\n.fvs-menu > button.danger{color:var(--fv-bad)}\n.fvs-menu-icon{display:grid;place-items:center;color:var(--fv-muted)}\n.fvs-menu-icon svg{width:16px;height:16px}\n.fvs-menu-text{display:grid;gap:1px;min-width:0}\n.fvs-menu-text small{color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.4}\n.fvs-menu-end{display:flex;align-items:center;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-menu-sep{height:1px;margin:4px 8px;background:var(--fv-line)}\n.fvs-menu-heading{padding:6px 8px 2px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-popover{width:max-content;max-width:min(440px,calc(100vw - 16px));max-height:min(600px,calc(100vh - 32px));overflow:auto;padding:12px;outline:none}\n.fvs-pop-head{display:grid;gap:2px;margin-bottom:10px}\n.fvs-pop-head strong{font-size:var(--fv-heading);font-weight:600}\n.fvs-pop-head small{color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-layer kbd,.fvs-studio kbd{display:inline-block;min-width:20px;padding:1px 6px;border:1px solid var(--fv-line);border-radius:4px;background:var(--fv-hover);font:var(--fv-caption)/1.5 var(--fv-mono);text-align:center;white-space:nowrap}\n.fvs-templates-pop{width:min(580px,calc(100vw - 16px));max-width:none}\n.fvs-template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px}\n.fvs-template{display:grid;gap:3px;align-content:start;padding:6px;border:1px solid transparent;border-radius:var(--fv-r-md);background:none;color:var(--fv-text);text-align:left}\n.fvs-template:hover,.fvs-template:focus-visible{background:var(--fv-hover);border-color:var(--fv-line);outline:none}\n.fvs-template-shot{position:relative;display:block;aspect-ratio:var(--fv-ratio,1.7778);max-height:180px;margin:0 auto 4px;width:100%;overflow:hidden;border-radius:var(--fv-r-sm);background:#000}\n.fvs-template-shot iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}\n.fvs-template b{font-size:var(--fv-meta);font-weight:500}\n.fvs-template small{color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.35}\n.fvs-sync-pop{display:grid;gap:10px;width:300px}\n.fvs-sync-pop .fvs-pop-head{margin:0}\n.fvs-legend{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-legend span{display:inline-flex;align-items:center;gap:7px}\n.fvs-legend i{width:7px;height:7px;rotate:45deg;border-radius:1px}\n.fvs-legend .ok i{background:var(--fv-ok)}\n.fvs-legend .weak i{background:var(--fv-warn)}\n.fvs-legend .quiet i{box-shadow:0 0 0 1.5px var(--fv-ok)}\n.fvs-sync-list{display:grid;max-height:220px;overflow:auto;margin:0 -4px}\n.fvs-sync-list button{display:flex;gap:12px;padding:5px 6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-meta);text-align:left}\n.fvs-sync-list button:hover{background:var(--fv-hover)}\n.fvs-sync-list span:first-child{color:var(--fv-muted);font-family:var(--fv-mono)}\n.fvs-sync-pop > .fvs-btn{justify-self:start}\n.fvs-keys dl{display:grid;grid-template-columns:auto auto;gap:7px 24px;margin:0;font-size:var(--fv-meta)}\n.fvs-keys dt{color:var(--fv-muted)}\n.fvs-keys dd{margin:0;text-align:right}\n\n/* native panels: properties, projects, Director, export */\n.fvs-extension{display:block;height:100%;overflow:auto}\n.fvs-native-properties{overflow:hidden}\n.fvs-native-properties .fvs-side{height:100%;border-left:0}\n.fvs-native-properties .fvs-side-close{display:none}\n/* the timeline docked in the native bottom panel (Space): it fills the panel; the panel's own sash sizes it */\n.fvs-dock-timeline{display:flex;flex-direction:column;overflow:hidden;outline:none}\n.fvs-dock-timeline > .fvs-tl{flex:1;min-height:0;grid-template-rows:auto minmax(0,1fr);background:transparent}\n.fvs-dock-timeline .fvs-tl-resize{display:none}\n.fvs-dock-timeline .fvs-tl-bar{padding-top:6px}\n.fvs-dock-empty{margin:auto;padding:16px;text-align:center}\n.fvs-chat{display:flex;flex-direction:column;height:100%;overflow:hidden}\n.fvs-chat-empty{display:flex}\n.fvs-chat-empty[hidden],.fvs-chat-body:empty{display:none}\n.fvs-chat-body{flex:1;min-height:0}\n.fvs-dock-strip{display:flex;align-items:center;gap:8px;min-width:0;padding:4px 10px 4px 12px;background:var(--fv-hover);font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-dock-strip svg{width:14px;height:14px}\n.fvs-dock-strip span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-dock-strip .fvs-btn{height:24px;padding:0 8px}\n.fvs-workspace-host{height:100%;min-height:0;overflow:hidden}\n.fvs-library{display:grid;gap:14px;align-content:start;max-width:620px;margin:0 auto;padding:28px 20px}\n.fvs-library-heading{display:flex;align-items:center;gap:10px}\n.fvs-library-heading svg{width:20px;height:20px;color:var(--fv-muted)}\n.fvs-library h2{margin:0;font-size:var(--fv-title);font-weight:600}\n.fvs-library > .fvs-row{align-items:center}\n.fvs-library.bare{gap:10px;padding:12px 12px 16px}\n.fvs-library.bare > .fvs-row{padding-top:10px;border-top:1px solid var(--fv-line)}\n.fvs-project-list{display:grid;gap:2px;margin:0 -8px}\n.fvs-project-item{display:flex;align-items:center;gap:10px;min-width:0;padding:8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left}\n.fvs-project-item:hover,.fvs-project-item:focus-visible{background:var(--fv-hover)}\n.fvs-project-item svg{color:var(--fv-muted)}\n.fvs-project-item > span{display:grid;gap:2px;min-width:0}\n.fvs-project-item strong{font-size:var(--fv-body);font-weight:500}\n.fvs-project-item small{color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-project-row{position:relative;display:grid}\n.fvs-project-row > .fvs-project-item{padding-right:40px}\n.fvs-project-row > .fvs-launch-more{position:absolute;right:6px;top:50%;margin-top:-14px}\n.fvs-project-row:hover > .fvs-launch-more{opacity:1}\n.fvs-project-row:hover > .fvs-project-item{background:var(--fv-hover)}\n.fvs-panel-shell{display:grid;grid-template-rows:minmax(0,1fr) auto;height:100%;min-height:0}\n.fvs-panel-scroll{display:grid;gap:16px;align-content:start;min-height:0;overflow:auto;padding:12px 16px 16px}\n.fvs-form-actions{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px 14px;border-top:1px solid var(--fv-line)}\n.fvs-chip-row{display:flex;flex-wrap:wrap;gap:6px}\n.fvs-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-line);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}\n.fvs-chip svg{width:13px;height:13px}\nbutton.fvs-chip{color:var(--fv-text)}\nbutton.fvs-chip:hover{border-color:var(--fv-accent);color:var(--fv-accent)}\n.fvs-phase{display:flex;align-items:center;gap:8px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-phase::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}\n.fvs-phase:is([data-phase=thinking],[data-phase=speaking],[data-phase=tool],[data-phase=waiting])::before{background:var(--fv-accent)}\n.fvs-phase[data-phase=done]::before{background:var(--fv-ok)}\n.fvs-phase[data-phase=error]::before{background:var(--fv-bad)}\n.fvs-director-changes{display:grid;gap:4px}\n.fvs-director-changes details{border-radius:var(--fv-r-sm);padding:6px 8px;background:var(--fv-hover)}\n.fvs-director-changes summary{cursor:pointer;font-size:var(--fv-meta)}\n.fvs-change-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-top:8px}\n.fvs-change-columns pre{max-height:240px;margin:0;overflow:auto;padding:8px;border-radius:var(--fv-r-sm);background:var(--fv-card);font:var(--fv-caption)/1.5 var(--fv-mono);white-space:pre-wrap;word-break:break-word}\n.fvs-director-input{display:block}\n.fvs-send-row{justify-content:space-between;align-items:center;margin-top:8px}\n.fvs-native-chatbox{min-width:0}\n.fvs-native-chatbox textarea{width:100%;min-height:96px}\n.fvs-export-status{display:grid;gap:8px;padding:12px;border-radius:var(--fv-r-md);background:var(--fv-hover)}\n.fvs-export-status strong{font-size:var(--fv-meta);font-weight:600}\n.fvs-export-status progress{width:100%;height:6px;accent-color:var(--fv-accent)}\n.fvs-export-status small{color:var(--fv-muted);font:var(--fv-caption) var(--fv-mono)}\n.fvs-export-status .fvs-row{align-items:center}\n.fvs-summary{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:var(--fv-r-md);background:var(--fv-hover);font:var(--fv-meta)/1.4 var(--fv-mono);color:var(--fv-text)}\n.fvs-summary span:last-child{color:var(--fv-muted)}\n\n/* the Space's left side: the launch navigation (as Coding Studio's) while no project is open, then the media bin */\n.fvs-nav{display:flex;flex-direction:column;gap:20px;padding:16px 10px}\n.fvs-nav-brand{display:flex;align-items:center;gap:10px;min-height:36px;padding:0 10px 12px;border-bottom:1px solid var(--fv-line);font-size:var(--fv-heading)}\n.fvs-nav-brand strong{font-weight:600}\n.fvs-nav-mark{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:var(--fv-r-sm);background:var(--sel-fill,var(--fv-accent-soft));color:var(--fv-accent)}\n.fvs-nav-section{display:flex;flex-direction:column;gap:2px}\n.fvs-nav-heading{padding:3px 10px 8px;color:var(--text-faint,var(--fv-muted));font-size:var(--fv-caption);font-weight:550;letter-spacing:.04em;text-transform:uppercase}\n.fvs-nav-item{display:flex;align-items:center;gap:10px;width:100%;min-height:35px;padding:7px 10px;border:0;border-radius:var(--fv-r-sm);background:transparent;color:var(--fv-muted);text-align:left;font-size:var(--fv-meta);transition:background var(--fv-fast),color var(--fv-fast)}\n.fvs-nav-item:hover{background:var(--fv-hover);color:var(--fv-text)}\n.fvs-nav-item[aria-current=page]{background:var(--sel-fill,var(--fv-accent-soft));color:var(--fv-accent);font-weight:550}\n.fvs-bin{display:flex;flex-direction:column;overflow:hidden;transition:background var(--fv-fast)}\n.fvs-bin.dropping{background:var(--sel-fill,var(--fv-accent-soft))}\n.fvs-bin-head{display:flex;align-items:center;gap:8px;padding:12px 10px 8px 14px;font-size:var(--fv-heading)}\n.fvs-bin-head strong{font-weight:600}\n.fvs-bin-head .fvs-btn{height:26px;padding:0 8px;font-size:var(--fv-meta)}\n.fvs-bin-tools{display:flex;align-items:center;gap:8px;padding:0 14px 6px 8px;color:var(--fv-muted);font-size:var(--fv-caption)}\n.fvs-bin-tools .fvs-btn{height:24px;padding:0 6px;gap:5px;font-size:var(--fv-meta)}\n.fvs-bin-tools .fvs-btn svg{width:13px;height:13px}\n.fvs-bin-tools .fvs-btn[aria-pressed=true]{background:var(--fv-accent-soft);color:var(--fv-accent)}\n.fvs-bin-count{font-variant-numeric:tabular-nums}\n.fvs-bin-empty{margin:0;padding:8px 14px}\n.fvs-bin-grid{flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:4px;align-content:start;padding:2px 8px 14px}\n.fvs-bin-item{position:relative;display:grid;gap:6px;min-width:0;padding:6px;border:1px solid transparent;border-radius:var(--fv-r-md);background:transparent;color:var(--fv-text);text-align:left;cursor:grab}\n.fvs-bin-item:hover{background:var(--fv-hover)}\n.fvs-bin-item:active{cursor:grabbing}\n.fvs-bin-thumb{display:flex;align-items:center;justify-content:center;aspect-ratio:16/10;overflow:hidden;border-radius:var(--fv-r-sm);background:var(--fv-press);color:var(--fv-muted)}\n.fvs-bin-thumb :is(img,video){width:100%;height:100%;object-fit:cover;pointer-events:none}\n.fvs-bin-thumb svg{width:20px;height:20px}\n.fvs-bin-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--fv-caption);color:var(--fv-muted)}\n/* on top of the picture: a fixed dark chip, the theme cannot promise contrast there (as clip titles) */\n.fvs-bin-used,.fvs-bin-ai{position:absolute;top:10px;left:10px;padding:1px 6px;border-radius:var(--radius-pill,999px);background:rgba(0,0,0,.6);color:#fff;font-size:var(--fv-caption);line-height:1.4}\n.fvs-bin-ai{left:auto;right:10px}\n\n\n/* the launchpad: Coding Studio's project list and create page, in the plugin's own tokens */\n.fvs-launch{container-type:inline-size;color:var(--fv-text)}\n.fvs-launch-inner{max-width:1160px;margin:0 auto;padding:28px 30px 40px}\n.fvs-launch h1{margin:7px 0 0;font-size:var(--ui-font-display,22px);line-height:var(--ui-line-display,1.3);font-weight:600;letter-spacing:-.025em}\n.fvs-launch-header{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin:10px 0 30px}\n.fvs-launch-header p,.fvs-launch-create-head p{margin:7px 0 0;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-launch-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}\n.fvs-launch-actions .fvs-btn,.fvs-launch-create{height:35px;padding:0 13px}\n.fvs-launch-toolbar{display:flex;align-items:center;justify-content:flex-end;gap:11px;margin-bottom:17px}\n.fvs-launch-search{flex:1;max-width:300px;min-width:120px;display:flex;align-items:center;gap:7px;padding:0 10px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--text-faint,var(--fv-muted))}\n.fvs-launch-search:focus-within{border-color:var(--fv-accent)}\n.fvs-launch-search input{flex:1;min-width:0;padding:9px 0;border:0;outline:none;background:transparent;color:var(--fv-text);font-size:var(--fv-meta)}\n.fvs-launch-toolbar > .fvs-btn{width:35px;height:35px;border:1px solid var(--fv-line)}\n.fvs-launch-head,.fvs-launch-row{display:grid;grid-template-columns:42px minmax(0,1fr) minmax(130px,180px) 28px;align-items:center;column-gap:15px}\n.fvs-launch-head{min-height:34px;padding:0 12px 7px;border-bottom:1px solid var(--fv-line);color:var(--text-faint,var(--fv-muted));font-size:var(--fv-meta)}\n.fvs-launch-row{min-height:75px;padding:0 12px;border-bottom:1px solid var(--fv-line);transition:background var(--fv-fast)}\n.fvs-launch-row:hover,.fvs-launch-row:focus-within{background:var(--fv-hover)}\n/* the row opens the project; the button beside it has its menu (the two share the list's columns) */\n.fvs-launch-open{grid-column:1 / 4;display:grid;grid-template-columns:subgrid;align-items:center;min-height:75px;padding:12px 0;border:0;background:transparent;color:var(--fv-text);text-align:left}\n.fvs-launch-more{width:28px;height:28px;opacity:0;transition:opacity var(--fv-fast)}\n.fvs-launch-row:hover .fvs-launch-more,.fvs-launch-more:focus-visible,.fvs-launch-more[aria-expanded=true]{opacity:1}\n@media (hover:none){.fvs-launch-more{opacity:1}}\n.fvs-launch-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:var(--fv-r-sm);background:var(--sel-fill,var(--fv-accent-soft));color:var(--fv-accent)}\n.fvs-launch-info,.fvs-launch-meta{display:flex;flex-direction:column;gap:4px;min-width:0}\n.fvs-launch-info strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--fv-body);font-weight:550}\n.fvs-launch-info small,.fvs-launch-meta small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--fv-muted);font-size:var(--fv-caption)}\n.fvs-launch-meta{font-size:var(--fv-meta);font-variant-numeric:tabular-nums}\n.fvs-launch-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:300px;padding:35px;text-align:center;color:var(--text-faint,var(--fv-muted))}\n.fvs-launch-empty strong{color:var(--fv-text);font-size:var(--fv-heading);font-weight:550}\n.fvs-launch-empty p{max-width:320px;margin:0;font-size:var(--fv-caption);line-height:1.7}\n.fvs-launch-create-page{max-width:860px;margin:0 auto}\n.fvs-launch-back{display:inline-flex;align-items:center;gap:7px;margin:0 0 24px;padding:6px 0;border:0;background:transparent;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-launch-back:hover{color:var(--fv-text)}\n.fvs-launch-create-head{margin:18px 0 27px;text-align:center}\n.fvs-launch-card{display:grid;gap:18px;padding:18px 20px 20px;border:1px solid transparent;border-radius:var(--fv-r-lg);background:var(--fv-card);box-shadow:var(--fv-shadow)}\n.fvs-launch-label{display:grid;gap:6px;font-size:var(--fv-body);font-weight:550}\n.fvs-launch-label small,.fvs-launch-field small{margin-left:6px;color:var(--text-faint,var(--fv-muted));font-size:var(--fv-caption);font-weight:400}\n.fvs-launch-card .fvs-launch-idea{min-height:100px;padding:8px 10px;resize:none;font-size:var(--fv-body);font-weight:400;line-height:1.7}\n.fvs-launch-idea::placeholder,.fvs-launch-search input::placeholder{color:var(--text-faint,var(--fv-muted));opacity:1}\n.fvs-launch-field{display:grid;gap:8px;min-width:0;color:var(--fv-muted);font-size:var(--fv-caption)}\n.fvs-launch-aspects{display:flex;flex-wrap:wrap;gap:6px}\n.fvs-launch-aspect{position:relative;display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 11px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);color:var(--fv-muted);font-size:var(--fv-meta);cursor:pointer;transition:background var(--fv-fast),color var(--fv-fast)}\n.fvs-launch-aspect:hover{background:var(--fv-hover);color:var(--fv-text)}\n.fvs-launch-aspect input{position:absolute;inset:0;margin:0;opacity:0;pointer-events:none}\n.fvs-launch-aspect:has(input:checked){border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent);background:var(--sel-fill,var(--fv-accent-soft));color:var(--fv-accent)}\n.fvs-launch-aspect:has(input:focus-visible){outline:var(--focus-ring,1px) solid var(--fv-accent);outline-offset:2px}\n.fvs-launch-frame{display:inline-block;height:12px;border:1.5px solid currentColor;border-radius:2px}\n.fvs-launch-submit{display:flex;align-items:flex-end;gap:10px}\n.fvs-launch-name,.fvs-launch-folder{flex:1}\n.fvs-launch-name input,.fvs-launch-folder input{height:35px}\n.fvs-launch-card .fvs-input:focus-visible{outline:none;box-shadow:0 0 0 .5px var(--fv-accent)}\n.fvs-launch-card .fvs-input[aria-invalid=true]{border-color:var(--fv-bad);box-shadow:0 0 0 .5px var(--fv-bad)}\n.fvs-launch-error{margin:-8px 0 0;color:var(--fv-bad);font-size:var(--fv-caption)}\n.fvs-launch-note{margin:10px 2px 0;color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.6;overflow-wrap:anywhere}\n.fvs-launch-note + .fvs-launch-note{margin-top:2px}\n@container (max-width: 760px){\n  .fvs-launch-inner{padding:24px 24px 32px}\n  .fvs-launch-header{flex-direction:column;align-items:flex-start;gap:18px}\n  .fvs-launch-search{max-width:none}\n  .fvs-launch-head,.fvs-launch-row{grid-template-columns:42px minmax(0,1fr) minmax(100px,132px) 28px;column-gap:10px}\n}\n@container (max-width: 490px){\n  .fvs-launch-inner{padding:20px 16px 28px}\n  .fvs-launch-actions{width:100%}\n  .fvs-launch-actions .fvs-btn{flex:1;justify-content:center}\n  .fvs-launch-head span:last-child,.fvs-launch-meta{display:none}\n  .fvs-launch-head,.fvs-launch-row{grid-template-columns:40px minmax(0,1fr) 28px}\n  .fvs-launch-open{grid-column:1 / 3}\n  .fvs-launch-submit{flex-direction:column;align-items:stretch}\n}\n@media (prefers-reduced-motion: reduce){.fvs-nav-item,.fvs-bin,.fvs-launch-row,.fvs-launch-arrow,.fvs-launch-aspect{transition:none}}\n";
  var EMBED_CSS = "\n.fvs-embed{position:relative;overflow:hidden;border-radius:var(--radius-md,12px);background:#000;box-shadow:var(--card-shadow,none)}\n.fvs-embed iframe{display:block;width:100%;border:0;background:#000}\n.fvs-embed .bar{display:flex;gap:8px;align-items:center;padding:6px 10px;background:var(--bg-card,#fff);color:var(--text-muted,#666);font-size:var(--ui-font-meta,12px)}\n.fvs-embed .bar b{flex:1;color:var(--text,#222);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-embed button{padding:2px 8px;border:1px solid var(--overlay-strong,rgba(0,0,0,.14));border-radius:var(--radius-sm,6px);background:none;color:inherit;font:inherit;cursor:pointer}\n";

  // src/generated/cli-src.js
  var cli_src_default = '#!/usr/bin/env node\n/* Forsion Video Studio 0.10.1 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\n\n// src/cli/fvs.js\nimport { readFileSync as readFileSync2, writeFileSync as writeFileSync2, mkdirSync as mkdirSync2, existsSync as existsSync2, rmSync as rmSync2, mkdtempSync as mkdtempSync2, readdirSync, statSync as statSync2 } from "node:fs";\nimport { dirname as dirname2, join as join2, resolve as resolve2, relative, basename, extname, sep, posix } from "node:path";\nimport { pathToFileURL } from "node:url";\nimport { tmpdir as tmpdir2, homedir, platform } from "node:os";\nimport { spawnSync as spawnSync2, spawn as spawn2 } from "node:child_process";\nimport { createRequire } from "node:module";\n\n// src/lib/project.js\nvar FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})(.*)$/;\nvar HEADING = /^ {0,3}(#{1,6})[ \\t]+(.*?)[ \\t]*#*[ \\t]*$/;\nvar SCENE_HEAD = /^([A-Za-z][\\w-]*)(?:\\s*(?:\xB7|\u2014|\u2013|-|:|\uFF1A|\\|)\\s*(.*))?$/;\nvar DEFAULTS = { width: 1920, height: 1080, fps: 30 };\nvar TRANSITIONS = ["fade", "dip", "slide-left", "slide-up", "push-left", "wipe-left", "zoom", "blur"];\nfunction tokenize(src) {\n  const eol = /\\r\\n/.test(src) ? "\\r\\n" : "\\n";\n  const text = src.replace(/\\r\\n/g, "\\n");\n  const lines = text.split("\\n");\n  const endsWithNl = text.endsWith("\\n");\n  if (endsWithNl) lines.pop();\n  const toks = [];\n  let buf = [], bufLine = 1;\n  const flush = () => {\n    if (buf.length) {\n      toks.push({ kind: "text", raw: buf.join(""), line: bufLine });\n      buf = [];\n    }\n  };\n  for (let i = 0; i < lines.length; i++) {\n    const nl = i < lines.length - 1 || endsWithNl ? "\\n" : "";\n    const line = lines[i];\n    const f = line.match(FENCE_OPEN);\n    if (f && !(f[2][0] === "`" && f[3].includes("`"))) {\n      flush();\n      const fence = f[2], info = f[3].trim();\n      const close = new RegExp(`^ {0,3}${fence[0] === "`" ? "`" : "~"}{${fence.length},}[ \\\\t]*$`);\n      const body = [];\n      let j = i + 1, closed = false;\n      for (; j < lines.length; j++) {\n        if (close.test(lines[j])) {\n          closed = true;\n          break;\n        }\n        body.push(lines[j]);\n      }\n      const last = closed ? j : lines.length - 1;\n      const rawLines = lines.slice(i, last + 1);\n      const rawNl = last < lines.length - 1 || endsWithNl ? "\\n" : "";\n      const [lang = "", ...tags] = info.split(/\\s+/).filter(Boolean);\n      toks.push({ kind: "fence", raw: rawLines.join("\\n") + rawNl, line: i + 1, fence, info, lang: lang.toLowerCase(), tags: tags.map((t) => t.toLowerCase()), body: body.join("\\n"), closed, indent: f[1] });\n      i = last;\n      continue;\n    }\n    const h = line.match(HEADING);\n    if (h) {\n      flush();\n      toks.push({ kind: "heading", raw: line + nl, line: i + 1, level: h[1].length, text: h[2] });\n      continue;\n    }\n    if (!buf.length) bufLine = i + 1;\n    buf.push(line + nl);\n  }\n  flush();\n  return { toks, eol };\n}\nvar UNIT = /^\\s*(-?\\d+(?:\\.\\d+)?)\\s*(bars?|beats?|b|s|sec|secs|seconds?|ms|\u5C0F\u8282|\u62CD|\u79D2)?\\s*$/i;\nfunction tempoOf(meta) {\n  const t = meta && meta.tempo;\n  if (!t || !(+t.bpm > 0)) return null;\n  const beatsPerBar = +t.beatsPerBar > 0 ? +t.beatsPerBar : 4;\n  const beat = 60 / +t.bpm;\n  return { bpm: +t.bpm, beatsPerBar, beat, bar: beat * beatsPerBar };\n}\nfunction parseLength(v, tempo) {\n  if (typeof v === "number" && isFinite(v)) return v;\n  const m = typeof v === "string" && v.match(UNIT);\n  if (!m) throw new Error(`cannot read length ${JSON.stringify(v)} (use "4 bars", "6 beats" or "2.5s")`);\n  const x = +m[1], u = (m[2] || "s").toLowerCase();\n  if (/^(bars?|\u5C0F\u8282)$/.test(u)) {\n    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);\n    return x * tempo.bar;\n  }\n  if (/^(beats?|b|\u62CD)$/.test(u)) {\n    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);\n    return x * tempo.beat;\n  }\n  if (u === "ms") return x / 1e3;\n  return x;\n}\nvar round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;\nvar hitUnit = (tempo) => tempo ? tempo.beat : 1;\nfunction readJSON(tok, where, errors) {\n  if (!tok.body.trim()) return {};\n  try {\n    const v = JSON.parse(tok.body);\n    if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("settings must be a JSON object");\n    return v;\n  } catch (e) {\n    errors.push({ level: "error", line: tok.line, scene: where, message: `invalid JSON in settings: ${e.message}` });\n    return null;\n  }\n}\nvar isFvs = (t) => t.kind === "fence" && (t.lang === "fvs" || t.lang === "json" && t.tags.includes("fvs"));\nvar isLang = (t, ...langs) => t.kind === "fence" && langs.includes(t.lang) && !isFvs(t);\nvar LANG = { html: ["html", "htm"], js: ["js", "javascript", "mjs"], css: ["css"], captions: ["srt", "vtt"] };\nvar CUE_TIME = /^(?:(\\d+):)?(\\d{1,2}):(\\d{1,2})(?:[.,](\\d{1,3}))?$/;\nvar cueTime = (s) => {\n  const m = String(s).trim().match(CUE_TIME);\n  return m ? +(m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + (m[4] ? +m[4].padEnd(3, "0") / 1e3 : 0) : NaN;\n};\nfunction parseSrt(text) {\n  const lines = String(text ?? "").replace(/\\r\\n?/g, "\\n").split("\\n");\n  const cues = [], errors = [];\n  for (let i = 0; i < lines.length; ) {\n    if (!lines[i].trim()) {\n      i++;\n      continue;\n    }\n    const from = i;\n    while (i < lines.length && lines[i].trim()) i++;\n    const block = lines.slice(from, i);\n    if (/^(WEBVTT|NOTE|STYLE|REGION)\\b/.test(block[0])) continue;\n    const k = block.findIndex((l) => l.includes("-->"));\n    if (k < 0) {\n      errors.push({ line: from + 1, message: \'caption without a time line ("00:00:01,000 --> 00:00:03,000")\' });\n      continue;\n    }\n    const [a, rest] = block[k].split("-->"), start = cueTime(a), end = cueTime(rest.trim().split(/\\s+/)[0]);\n    if (!Number.isFinite(start) || !Number.isFinite(end)) {\n      errors.push({ line: from + k + 1, message: `cannot read caption times "${block[k].trim()}" (use 00:00:01,000 --> 00:00:03,000)` });\n      continue;\n    }\n    if (!(end > start)) {\n      errors.push({ line: from + k + 1, message: `caption ends before it starts (${block[k].trim()})` });\n      continue;\n    }\n    cues.push({ start, end, text: block.slice(k + 1).join("\\n").trim(), line: from + k + 1, raw: block[k].trim() });\n  }\n  return { cues, errors };\n}\nvar srtTime = (sec) => {\n  const ms = Math.max(0, Math.round(sec * 1e3)), p = (n, w = 2) => String(n).padStart(w, "0");\n  return `${p(Math.floor(ms / 36e5))}:${p(Math.floor(ms / 6e4) % 60)}:${p(Math.floor(ms / 1e3) % 60)},${p(ms % 1e3, 3)}`;\n};\nfunction formatSrt(cues) {\n  return [...cues].sort((a, b) => a.start - b.start).map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${String(c.text ?? "").replace(/\\r\\n?/g, "\\n").replace(/\\n\\s*\\n/g, "\\n").trim()}`).join("\\n\\n");\n}\nfunction parseProject(src) {\n  const { toks, eol } = tokenize(String(src ?? ""));\n  const errors = [];\n  const p = { eol, toks, meta: { ...DEFAULTS }, metaTok: -1, rawMeta: null, css: [], stageHtml: -1, stageJs: -1, captionsTok: -1, captionsIgnored: 0, captions: [], scenes: [], errors };\n  let i = 0;\n  for (; i < toks.length; i++) {\n    const t = toks[i];\n    if (t.kind === "heading" && t.level === 2) break;\n    if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, message: "code block is never closed" });\n    if (isFvs(t)) {\n      if (p.metaTok >= 0) {\n        errors.push({ level: "warning", line: t.line, message: "second project settings block ignored" });\n        continue;\n      }\n      p.metaTok = i;\n      const m = readJSON(t, null, errors);\n      if (m) {\n        p.rawMeta = m;\n        p.meta = { ...DEFAULTS, ...m };\n      }\n    } else if (isLang(t, ...LANG.css)) p.css.push(i);\n    else if (isLang(t, ...LANG.captions)) {\n      if (p.captionsTok < 0) p.captionsTok = i;\n      else {\n        p.captionsIgnored++;\n        errors.push({ level: "warning", line: t.line, captions: true, message: "second captions block ignored (one ```srt track per project)" });\n      }\n    } else if (isLang(t, ...LANG.html) && (t.tags.includes("stage") || p.stageHtml < 0)) {\n      if (p.stageHtml < 0) p.stageHtml = i;\n    } else if (isLang(t, ...LANG.js) && (t.tags.includes("stage") || p.stageJs < 0)) {\n      if (p.stageJs < 0) p.stageJs = i;\n    }\n  }\n  if (p.metaTok < 0) errors.push({ level: "warning", line: 1, message: "no ```fvs project settings block; using 1920\\xD71080 at 30 fps" });\n  while (i < toks.length) {\n    const head = toks[i];\n    const s = { head: i, first: i, last: i, metaTok: -1, htmlTok: -1, jsTok: -1, cssTok: -1, meta: {}, title: "", id: "" };\n    const hm = head.text.match(SCENE_HEAD);\n    if (hm) {\n      s.id = hm[1];\n      s.title = (hm[2] || "").trim();\n    } else {\n      s.id = "";\n      s.title = head.text;\n      errors.push({ level: "error", line: head.line, message: `scene heading "${head.text}" must start with an id (letters, digits, - or _), e.g. "## intro \\xB7 \\u5F00\\u573A"` });\n    }\n    for (i++; i < toks.length; i++) {\n      const t = toks[i];\n      if (t.kind === "heading" && t.level <= 2) break;\n      s.last = i;\n      if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, scene: s.id, message: "code block is never closed" });\n      if (isFvs(t)) {\n        if (s.metaTok < 0) {\n          s.metaTok = i;\n          s.meta = readJSON(t, s.id, errors) || {};\n        }\n      } else if (isLang(t, ...LANG.captions)) errors.push({ level: "warning", line: t.line, scene: s.id, captions: true, message: "a captions block inside a scene is ignored; move it before the first scene" });\n      else for (const k of ["html", "js", "css"]) if (isLang(t, ...LANG[k])) {\n        if (s[`${k}Tok`] < 0) s[`${k}Tok`] = i;\n        else errors.push({ level: "warning", line: t.line, scene: s.id, message: `second \\`${k}\\` block in scene "${s.id}" is ignored` });\n      }\n    }\n    if (head.level === 1) continue;\n    p.scenes.push(s);\n  }\n  computeTimeline(p);\n  return p;\n}\nfunction inPoint(meta, tempo) {\n  if (meta.in === void 0 || meta.in === null) return 0;\n  const v = parseLength(meta.in, tempo);\n  if (!(v >= 0)) throw new Error(`"in" must not be negative, got ${JSON.stringify(meta.in)}`);\n  return v;\n}\nfunction readTransition(v, tempo) {\n  const type = typeof v === "string" ? v : v && typeof v === "object" && !Array.isArray(v) ? v.type : void 0;\n  if (typeof type !== "string") throw new Error(\'"transition" must be a type such as "fade", or { "type": "fade", "dur": "1 beat" }\');\n  if (!TRANSITIONS.includes(type)) throw new Error(`unknown transition "${type}" (use ${TRANSITIONS.join(", ")})`);\n  const raw = typeof v === "object" ? v.dur : void 0;\n  const dur = raw === void 0 || raw === null ? tempo ? tempo.beat : 0.5 : parseLength(raw, tempo);\n  if (!(dur > 0)) throw new Error(`transition "dur" must be positive, got ${JSON.stringify(raw)}`);\n  return { type, dur };\n}\nfunction computeTimeline(p) {\n  const tempo = tempoOf(p.meta);\n  p.tempo = tempo;\n  const seen = /* @__PURE__ */ new Set();\n  const body = (s, k) => s[`${k}Tok`] >= 0 ? p.toks[s[`${k}Tok`]].body : "";\n  let t = 0;\n  for (const [k, s] of p.scenes.entries()) {\n    s.index = k;\n    s.html = body(s, "html");\n    s.js = body(s, "js");\n    s.css = body(s, "css");\n    s.line = p.toks[s.head].line;\n    const metaLine2 = s.metaTok >= 0 ? p.toks[s.metaTok].line : s.line;\n    if (s.id && seen.has(s.id)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: `duplicate scene id "${s.id}"` });\n    seen.add(s.id);\n    let len = 0;\n    try {\n      if (s.meta.length === void 0) throw new Error(\'scene has no "length" (e.g. "length": "2 bars")\');\n      len = parseLength(s.meta.length, tempo);\n      if (!(len > 0)) throw new Error(`length must be positive, got ${JSON.stringify(s.meta.length)}`);\n    } catch (e) {\n      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });\n      len = len > 0 ? len : tempo ? tempo.bar : 2;\n    }\n    s.t0 = t;\n    s.dur = len;\n    s.t1 = t + len;\n    t = s.t1;\n    s.in = 0;\n    try {\n      s.in = inPoint(s.meta, tempo);\n    } catch (e) {\n      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message.startsWith(\'"in"\') ? e.message : `"in": ${e.message}` });\n    }\n    s.t0v = s.t0 - s.in;\n    s.transition = null;\n    if (s.meta.transition !== void 0 && s.meta.transition !== null) {\n      try {\n        const tr = readTransition(s.meta.transition, tempo);\n        if (k === 0) p.errors.push({ level: "warning", line: metaLine2, scene: s.id, message: \'the first scene has nothing to transition from; its "transition" is ignored\' });\n        else s.transition = { type: tr.type, dur: Math.min(tr.dur, len) };\n      } catch (e) {\n        p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });\n      }\n    }\n    const u = hitUnit(tempo);\n    const hits = Array.isArray(s.meta.hits) ? s.meta.hits : [];\n    if (s.meta.hits !== void 0 && !Array.isArray(s.meta.hits)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: \'"hits" must be an array of numbers\' });\n    s.hits = hits.filter((h) => typeof h === "number" && isFinite(h));\n    if (s.hits.length !== hits.length) p.errors.push({ level: "error", line: s.line, scene: s.id, message: \'"hits" must contain numbers only\' });\n    for (let j = 1; j < s.hits.length; j++) if (s.hits[j] < s.hits[j - 1]) {\n      p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "hits are not in ascending order" });\n      break;\n    }\n    const end = s.in + len, next = p.scenes[k + 1];\n    let continued = false;\n    if (next) {\n      try {\n        continued = inPoint(next.meta, tempo) > 0 && body(next, "html") === s.html && body(next, "css") === s.css && body(next, "js") === s.js;\n      } catch {\n        continued = false;\n      }\n    }\n    s.continued = continued;\n    if (s.hits.some((h) => h < 0 || h * u > end + 1e-6 && !continued)) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: `a hit falls outside the scene (0\\u2013${round(end / u, 3)} ${tempo ? "beats" : "s"})` });\n    s.hitTimes = s.hits.map((h) => t0Round(s.t0v + h * u));\n    if (!s.html.trim() && !s.js.trim()) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "scene has no html or js block" });\n  }\n  p.length = t;\n  const m = p.meta;\n  const metaLine = p.metaTok >= 0 ? p.toks[p.metaTok].line : 1;\n  for (const k of ["width", "height", "fps"]) if (!(+m[k] > 0)) p.errors.push({ level: "error", line: metaLine, message: `"${k}" must be a positive number` });\n  checkAudio(p, metaLine);\n  readCaptions(p, metaLine);\n  if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, code: "no-scenes", message: \'the project has no scenes yet (add a "## id \\xB7 Title" section)\' });\n}\nfunction checkAudio(p, line) {\n  const raw = p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio];\n  raw.forEach((a, i) => {\n    if (!a || typeof a !== "object") return;\n    const name = `audio track ${i + 1}${a.src ? ` (${a.src})` : ""}`;\n    for (const [k, min] of [["in", 0], ["dur", 1e-9]]) {\n      if (a[k] === void 0 || a[k] === null) continue;\n      try {\n        const v = parseLength(a[k], p.tempo);\n        if (!(v >= min)) throw new Error(k === "in" ? "must not be negative" : "must be positive");\n      } catch (e) {\n        p.errors.push({ level: "error", line, message: `${name} "${k}": ${e.message}` });\n      }\n    }\n  });\n}\nvar CAPTION_POSITIONS = ["bottom", "top"];\nvar CAPTION_SIZES = ["small", "medium", "large"];\nfunction captionStyle(meta) {\n  const c = meta && meta.captions && typeof meta.captions === "object" ? meta.captions : {};\n  return { position: CAPTION_POSITIONS.includes(c.position) ? c.position : "bottom", size: CAPTION_SIZES.includes(c.size) ? c.size : "medium" };\n}\nfunction readCaptions(p, metaLine) {\n  const c = p.meta.captions;\n  if (c !== void 0 && c !== null && (typeof c !== "object" || Array.isArray(c) || c.position !== void 0 && !CAPTION_POSITIONS.includes(c.position) || c.size !== void 0 && !CAPTION_SIZES.includes(c.size))) {\n    p.errors.push({ level: "warning", line: metaLine, captions: true, message: `"captions" settings: use { "position": "${CAPTION_POSITIONS.join(\'" | "\')}", "size": "${CAPTION_SIZES.join(\'" | "\')}" }` });\n  }\n  if (p.captionsTok < 0) return;\n  const tok = p.toks[p.captionsTok], base = tok.line;\n  const { cues, errors } = parseSrt(tok.body);\n  for (const e of errors) p.errors.push({ level: "error", line: base + e.line, captions: true, message: e.message });\n  p.captions = cues.map((x) => ({ ...x, line: base + x.line }));\n  const late = p.scenes.length ? p.captions.find((x) => x.start >= p.length - 1e-6) : null;\n  if (late) p.errors.push({ level: "warning", line: late.line, captions: true, message: `a caption starts at ${round(late.start, 3)} s, after the end of the video (${round(p.length, 3)} s)` });\n}\nvar t0Round = (x) => Math.round(x * 1e9) / 1e9;\nvar cssBlocks = (p) => p.css.map((k) => p.toks[k].body);\nvar stageHtml = (p) => p.stageHtml >= 0 ? p.toks[p.stageHtml].body : "";\nvar stageJs = (p) => p.stageJs >= 0 ? p.toks[p.stageJs].body : "";\nvar sceneById = (p, id) => p.scenes.find((s) => s.id === id) || null;\nvar visibleHits = (s) => (s.hitTimes || []).map((t, index) => ({ index, t })).filter((h) => h.t >= s.t0 - 1e-6 && (s.continued ? h.t < s.t1 - 1e-6 : h.t <= s.t1 + 1e-6));\nfunction cueSheet(p) {\n  const tempo = p.tempo;\n  return {\n    title: p.meta.title || "",\n    bpm: tempo ? tempo.bpm : null,\n    beatsPerBar: tempo ? tempo.beatsPerBar : null,\n    length: round(p.length, 6),\n    fps: +p.meta.fps,\n    scenes: p.scenes.map((s) => {\n      const vis = visibleHits(s);\n      return {\n        id: s.id,\n        title: s.title,\n        t0: round(s.t0, 6),\n        t1: round(s.t1, 6),\n        ...tempo ? { bar: round(s.t0 / tempo.bar, 6), bars: round(s.dur / tempo.bar, 6), beat: round(s.t0 / tempo.beat, 6) } : {},\n        ...s.in ? { in: round(s.in, 6) } : {},\n        ...s.transition ? { transition: { type: s.transition.type, dur: round(s.transition.dur, 6) } } : {},\n        hits: vis.map((h) => s.hits[h.index]),\n        hitTimes: vis.map((h) => round(h.t, 6))\n      };\n    }),\n    audio: (p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio]).map((a) => typeof a === "string" ? { src: a } : a)\n  };\n}\n\n// src/lib/html.js\nvar RAW = /^(script|style|textarea|title)$/i;\nvar VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;\nvar ENT = { amp: "&", lt: "<", gt: ">", quot: \'"\', apos: "\'", nbsp: "\\xA0", mdash: "\\u2014", ndash: "\\u2013", hellip: "\\u2026", middot: "\\xB7", copy: "\\xA9", reg: "\\xAE", trade: "\\u2122", laquo: "\\xAB", raquo: "\\xBB", ldquo: "\\u201C", rdquo: "\\u201D", lsquo: "\\u2018", rsquo: "\\u2019", times: "\\xD7", larr: "\\u2190", rarr: "\\u2192", uarr: "\\u2191", darr: "\\u2193", bull: "\\u2022" };\nvar decode = (s) => s.replace(/&(#x[0-9a-f]+|#\\d+|[a-z]+);/gi, (m, k) => {\n  if (k[0] === "#") {\n    const c = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : +k.slice(1);\n    try {\n      return String.fromCodePoint(c);\n    } catch {\n      return m;\n    }\n  }\n  return ENT[k.toLowerCase()] ?? m;\n});\nfunction tagEnd(html, i) {\n  let q = null;\n  for (let k = i + 1; k < html.length; k++) {\n    const c = html[k];\n    if (q) {\n      if (c === q) q = null;\n    } else if (c === \'"\' || c === "\'") q = c;\n    else if (c === ">") return k + 1;\n  }\n  return html.length;\n}\nvar ATTR = /([^\\s"\'<>\\/=]+)(?:\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s"\'=<>`]+)))?/g;\nfunction scan(html) {\n  const texts = [], tags = [];\n  const stack = [];\n  let i = 0, textStart = 0;\n  const n = html.length;\n  const pushText = (a, b) => {\n    if (b <= a) return;\n    const raw = html.slice(a, b), text = decode(raw);\n    if (/\\S/.test(text)) texts.push({ index: texts.length, start: a, end: b, raw, text, tag: stack.length ? stack[stack.length - 1] : -1 });\n  };\n  while (i < n) {\n    if (html[i] !== "<") {\n      i++;\n      continue;\n    }\n    if (html.startsWith("<!--", i)) {\n      pushText(textStart, i);\n      const e = html.indexOf("-->", i + 4);\n      i = e < 0 ? n : e + 3;\n      textStart = i;\n      continue;\n    }\n    const m = /^<(\\/?)([A-Za-z][\\w:-]*)/.exec(html.slice(i, i + 80));\n    if (!m) {\n      if (html[i + 1] === "!" || html[i + 1] === "?") {\n        pushText(textStart, i);\n        i = tagEnd(html, i);\n        textStart = i;\n      } else i++;\n      continue;\n    }\n    pushText(textStart, i);\n    const end = tagEnd(html, i), name = m[2].toLowerCase();\n    if (m[1]) {\n      for (let k = stack.length - 1; k >= 0; k--) if (tags[stack[k]].name === name) {\n        stack.length = k;\n        break;\n      }\n      i = end;\n      textStart = i;\n      continue;\n    }\n    const body = html.slice(i + 1 + m[2].length, end - 1);\n    const attrs = [];\n    const selfClose = /\\/\\s*$/.test(body);\n    ATTR.lastIndex = 0;\n    let a;\n    while (a = ATTR.exec(body)) {\n      if (a[1] === "/") continue;\n      const off = i + 1 + m[2].length + a.index;\n      const v = a[2] ?? a[3] ?? a[4];\n      attrs.push({ name: a[1].toLowerCase(), value: v === void 0 ? "" : decode(v), start: off, end: off + a[0].length });\n    }\n    const tag = { index: tags.length, name, start: i, end, attrs, parent: stack.length ? stack[stack.length - 1] : -1, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };\n    tags.push(tag);\n    i = end;\n    textStart = i;\n    if (RAW.test(name) && !selfClose) {\n      const close = html.toLowerCase().indexOf(`</${name}`, i);\n      i = close < 0 ? n : close;\n      textStart = i;\n      continue;\n    }\n    if (!VOID.test(name) && !selfClose) stack.push(tag.index);\n  }\n  pushText(textStart, n);\n  return { texts, tags };\n}\nvar num = (v, d) => {\n  const x = parseFloat(v);\n  return Number.isFinite(x) ? x : d;\n};\nfunction videos(html) {\n  const { tags } = scan(html);\n  const lower = html.toLowerCase();\n  return tags.filter((t) => t.name === "video").map((t) => {\n    const selfClosed = html[t.end - 2] === "/";\n    const close = selfClosed ? -1 : lower.indexOf("</video", t.end);\n    const end = close < 0 ? t.end : close;\n    const source = tags.find((x) => x.name === "source" && x.start >= t.end && x.start < end && x.attr("src"));\n    const has = (k) => t.attrs.some((a) => a.name === k);\n    return {\n      tag: t.index,\n      src: t.attr("src") || (source ? source.attr("src") : "") || "",\n      clipIn: Math.max(0, num(t.attr("data-clip-in"), 0)),\n      gain: num(t.attr("data-gain"), 0),\n      muted: has("muted"),\n      loop: has("loop")\n    };\n  });\n}\n\n// src/lib/compile.js\nvar ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\\/\\/|#|\\/)/i;\nvar isRelativeUrl = (u) => !!u && !ABSOLUTE.test(u.trim()) && !/^\\$\\{/.test(u) && !/^%%/.test(u);\nvar ATTR2 = /(\\s(?:src|href|poster|xlink:href)\\s*=\\s*)(["\'])([^"\']*)\\2/gi;\nvar CSS_URL = /url\\(\\s*(["\']?)([^"\')]+)\\1\\s*\\)/gi;\nfunction assetRefs(html = "", css = "") {\n  const out = /* @__PURE__ */ new Set();\n  for (const m of html.matchAll(ATTR2)) if (isRelativeUrl(m[3])) out.add(clean(m[3]));\n  for (const m of (html + "\\n" + css).matchAll(CSS_URL)) if (isRelativeUrl(m[2])) out.add(clean(m[2]));\n  return [...out];\n}\nvar clean = (u) => u.trim().replace(/^\\.\\//, "");\nvar rewriteHtml = (html, map) => html.replace(ATTR2, (m, pre, q, u) => isRelativeUrl(u) && map[clean(u)] ? `${pre}${q}${map[clean(u)]}${q}` : m);\nvar rewriteCss = (css, map) => css.replace(CSS_URL, (m, q, u) => isRelativeUrl(u) && map[clean(u)] ? `url(${q}${map[clean(u)]}${q})` : m);\nvar list = (v) => v == null ? [] : Array.isArray(v) ? v : [v];\nfunction audioTracks(meta) {\n  const tempo = tempoOf(meta);\n  const seconds = (v) => {\n    if (v === void 0 || v === null || v === "") return null;\n    try {\n      const x = parseLength(v, tempo);\n      return Number.isFinite(x) ? x : null;\n    } catch {\n      return null;\n    }\n  };\n  return list(meta.audio).map((a, i) => typeof a === "string" ? { src: a } : a).filter((a) => a && a.src).map((a, i) => {\n    const from = seconds(a.in), dur = seconds(a.dur);\n    return { id: a.id || `a${i}`, src: String(a.src), at: +a.at || 0, gain: +a.gain || 0, role: a.role || (i ? "track" : "score"), in: from > 0 ? from : 0, dur: dur > 0 ? dur : null, mute: !!a.mute };\n  });\n}\nfunction sceneMedia(p) {\n  const out = [];\n  for (const s of p.scenes) {\n    videos(s.html).forEach((v, k) => {\n      if (v.muted || !v.src) return;\n      out.push({ id: `${s.id}/video-${k}`, scene: s.id, src: v.src, at: s.t0, in: v.clipIn + s.in, dur: s.dur, gain: v.gain, loop: v.loop });\n    });\n  }\n  return out;\n}\nfunction compile(p, { resolve: resolve3 = (u) => u } = {}) {\n  const css = cssBlocks(p).join("\\n\\n");\n  const refs = /* @__PURE__ */ new Set([...assetRefs(stageHtml(p), css), ...list(p.meta.assets).map(clean)]);\n  for (const s of p.scenes) for (const r of assetRefs(s.html, s.css)) refs.add(r);\n  const audio = audioTracks(p.meta);\n  const map = {};\n  for (const r of refs) map[r] = resolve3(r);\n  const url = (src) => isRelativeUrl(src) ? map[clean(src)] ?? resolve3(clean(src)) : src;\n  const jsLine = (k) => k >= 0 ? p.toks[k].line + 1 : 0;\n  return {\n    v: 1,\n    title: p.meta.title || "",\n    lang: p.meta.lang || "zh-CN",\n    width: +p.meta.width,\n    height: +p.meta.height,\n    fps: +p.meta.fps,\n    length: p.length,\n    tempo: p.tempo ? { bpm: p.tempo.bpm, beatsPerBar: p.tempo.beatsPerBar } : null,\n    background: p.meta.background || "#000",\n    className: p.meta.class || "",\n    fonts: list(p.meta.fonts),\n    css: rewriteCss(css, map),\n    stage: { html: rewriteHtml(stageHtml(p), map), js: stageJs(p), line: jsLine(p.stageJs) },\n    scenes: p.scenes.map((s) => ({\n      id: s.id,\n      title: s.title,\n      t0: s.t0,\n      t1: s.t1,\n      t0v: s.t0v,\n      in: s.in,\n      transition: s.transition,\n      hits: s.hitTimes,\n      beats: s.hits,\n      cls: s.meta.class || "",\n      html: rewriteHtml(s.html, map),\n      css: rewriteCss(s.css, map),\n      js: s.js,\n      line: jsLine(s.jsTok),\n      htmlLine: jsLine(s.htmlTok)\n    })),\n    captions: (p.captions || []).map((c) => ({ t0: c.start, t1: c.end, text: c.text })),\n    captionStyle: captionStyle(p.meta),\n    audio: audio.map((a) => ({ ...a, url: resolve3(a.src) })),\n    media: sceneMedia(p).map((m) => ({ ...m, url: url(m.src) })),\n    assets: map\n  };\n}\nvar track = (a) => ({ id: a.id, kind: "track", src: a.src, url: a.url ?? a.src, at: +a.at || 0, in: +a.in || 0, dur: a.dur > 0 ? +a.dur : null, gain: +a.gain || 0, mute: !!a.mute, role: a.role });\nvar video = (m, assets = {}) => ({ id: m.id, kind: "video", scene: m.scene, src: m.src, url: m.url ?? assets[clean(m.src)] ?? m.src, at: +m.at || 0, in: +m.in || 0, dur: m.dur > 0 ? +m.dur : null, gain: +m.gain || 0, mute: false, loop: !!m.loop });\nfunction audioSegments(x) {\n  if (x && Array.isArray(x.toks)) return [...audioTracks(x.meta).map(track), ...sceneMedia(x).map((m) => video(m))];\n  return payloadSegments(x);\n}\nvar payloadSegments = (P) => P ? [...(P.audio || []).map(track), ...(P.media || []).map((m) => video(m, P.assets))] : [];\nvar esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;" })[c]);\nvar scriptJSON = (v) => JSON.stringify(v).replace(/</g, "\\\\u003c").replace(/\\u2028/g, "\\\\u2028").replace(/\\u2029/g, "\\\\u2029");\nfunction buildHtml(payload, runtimeSource, { mode = "player", extraHead = "" } = {}) {\n  const fonts = payload.fonts.map((u) => `<link rel="stylesheet" href="${esc(u)}">`).join("\\n");\n  const assets = payload.assets || {};\n  if ((payload.media || []).some((m) => m.url && assets[clean(m.src)] === m.url)) {\n    payload = { ...payload, media: payload.media.map((m) => m.url && assets[clean(m.src)] === m.url ? { ...m, url: null } : m) };\n  }\n  return `<!doctype html>\n<html lang="${esc(payload.lang)}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(payload.title || "Forsion Video Studio")}</title>\n<meta name="generator" content="Forsion Video Studio">\n${fonts}\n${extraHead}\n</head>\n<body>\n<script type="application/json" id="fvs-data">${scriptJSON(payload)}<\/script>\n<script>${runtimeSource.replace(/<\\/script/gi, "<\\\\/script")}<\/script>\n<script>FVS.boot(${JSON.stringify(mode)});<\/script>\n</body>\n</html>\n`;\n}\n\n// src/lib/onsets.js\nvar ONSET_SR = 22050;\nvar N = 1024;\nvar HOP = 128;\nvar BLOCK = 110;\nfunction fft(re, im) {\n  const n = re.length;\n  for (let i = 1, j = 0; i < n; i++) {\n    let bit = n >> 1;\n    for (; j & bit; bit >>= 1) j ^= bit;\n    j ^= bit;\n    if (i < j) {\n      [re[i], re[j]] = [re[j], re[i]];\n      [im[i], im[j]] = [im[j], im[i]];\n    }\n  }\n  for (let len = 2; len <= n; len <<= 1) {\n    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);\n    for (let i = 0; i < n; i += len) {\n      let cr = 1, ci = 0;\n      for (let k = 0; k < len / 2; k++) {\n        const a = i + k, b = a + len / 2;\n        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;\n        re[b] = re[a] - tr;\n        im[b] = im[a] - ti;\n        re[a] += tr;\n        im[a] += ti;\n        const nr = cr * wr - ci * wi;\n        ci = cr * wi + ci * wr;\n        cr = nr;\n      }\n    }\n  }\n}\nfunction downsample(x, sr) {\n  if (sr === ONSET_SR) return x;\n  const r = sr / ONSET_SR, out = new Float32Array(Math.floor(x.length / r));\n  for (let i = 0; i < out.length; i++) {\n    const a = Math.floor(i * r), b = Math.max(a + 1, Math.floor((i + 1) * r));\n    let s = 0;\n    for (let k = a; k < b; k++) s += x[k];\n    out[i] = s / (b - a);\n  }\n  return out;\n}\nvar MELS = 64;\nvar hz2mel = (f) => 2595 * Math.log10(1 + f / 700);\nvar mel2hz = (m) => 700 * (10 ** (m / 2595) - 1);\nvar bank = null;\nfunction melBank() {\n  if (bank) return bank;\n  const bins = N / 2 + 1, top = hz2mel(ONSET_SR / 2), pts = [];\n  for (let i = 0; i < MELS + 2; i++) pts.push(mel2hz(top * i / (MELS + 1)) / (ONSET_SR / 2) * (bins - 1));\n  bank = [];\n  for (let m = 0; m < MELS; m++) {\n    const [l, c, r] = [pts[m], pts[m + 1], pts[m + 2]], w = [];\n    for (let k = Math.floor(l); k <= Math.ceil(r) && k < bins; k++) {\n      const v = k < c ? (k - l) / Math.max(1e-9, c - l) : (r - k) / Math.max(1e-9, r - c);\n      if (v > 0) w.push([k, v]);\n    }\n    bank.push(w);\n  }\n  return bank;\n}\nfunction onsetEnvelope(mono, sr = ONSET_SR) {\n  const x = downsample(mono, sr);\n  const frames = Math.max(0, Math.floor((x.length - N) / HOP) + 1);\n  const env = new Float32Array(frames), level = new Float32Array(frames);\n  const rms = new Float32Array(Math.floor(x.length / BLOCK));\n  for (let b = 0; b < rms.length; b++) {\n    let e = 0;\n    for (let i = b * BLOCK; i < (b + 1) * BLOCK; i++) e += x[i] * x[i];\n    rms[b] = e / BLOCK;\n  }\n  const win = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));\n  const B = melBank();\n  const mel = new Float32Array(frames * MELS);\n  const re = new Float32Array(N), im = new Float32Array(N);\n  let top = -Infinity;\n  for (let f = 0; f < frames; f++) {\n    const o = f * HOP;\n    let ss = 0;\n    for (let i = 0; i < N; i++) {\n      const v = x[o + i];\n      re[i] = v * win[i];\n      im[i] = 0;\n      ss += v * v;\n    }\n    level[f] = 10 * Math.log10(ss / N + 1e-12);\n    fft(re, im);\n    for (let m = 0; m < MELS; m++) {\n      let e = 0;\n      for (const [k, w] of B[m]) e += w * (re[k] * re[k] + im[k] * im[k]);\n      const db = 10 * Math.log10(Math.max(e, 1e-10));\n      mel[f * MELS + m] = db;\n      if (db > top) top = db;\n    }\n  }\n  const floor = top - 80;\n  for (let i = 0; i < mel.length; i++) if (mel[i] < floor) mel[i] = floor;\n  for (let f = 1; f < frames; f++) {\n    let s = 0;\n    for (let m = 0; m < MELS; m++) {\n      const d = mel[f * MELS + m] - mel[(f - 1) * MELS + m];\n      if (d > 0) s += d;\n    }\n    env[f] = s / MELS;\n  }\n  const sorted = [...env].sort((a, b) => a - b);\n  const p95 = sorted[Math.floor(sorted.length * 0.95)] || 1;\n  for (let f = 0; f < frames; f++) env[f] /= p95;\n  return { env, level, rms, block: BLOCK / ONSET_SR, hop: HOP / ONSET_SR, offset: N / 2 / ONSET_SR };\n}\nvar pct = (arr, q) => {\n  const s = [...arr].sort((a, b) => a - b);\n  return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * q))] : 0;\n};\nvar hitsOf = (s) => s.hitTimes && s.t0 !== void 0 && s.t1 !== void 0 ? visibleHits(s) : (s.hitTimes || s.hits || []).map((t, index) => ({ index, t }));\nfunction syncReport(scenes, { env, rms, block, hop, offset }, { before = 0.065, after = 0.03, weak = 0.6 } = {}) {\n  const at = (t) => Math.round((t - offset) / hop);\n  const rows = [];\n  for (const s of scenes) {\n    hitsOf(s).forEach(({ index: i, t }) => {\n      const a = Math.max(0, at(t - before)), b = Math.min(env.length - 1, at(t + after));\n      let best = -1, bi = a;\n      for (let k = a; k <= b; k++) if (env[k] > best) {\n        best = env[k];\n        bi = k;\n      }\n      const la = Math.max(0, at(t - 1)), lb = Math.min(env.length, at(t + 1));\n      const local = pct(env.subarray(la, lb), 0.99) || 1;\n      const strength = best < 0 ? 0 : best / local;\n      const lvl = (p, q) => {\n        const x = rms.subarray(Math.max(0, Math.ceil(p / block)), Math.max(0, Math.floor(q / block)));\n        let s2 = 0;\n        for (const v of x) s2 += v;\n        return x.length ? 10 * Math.log10(s2 / x.length + 1e-12) : -120;\n      };\n      const drop = lvl(t, t + 0.07) - lvl(t - 0.08, t - 0.01) <= -6;\n      const off = best < 0 ? null : bi * hop + offset - t;\n      rows.push({ scene: s.id, hit: i, t, offset: off, strength: +strength.toFixed(2), quiet: drop, ok: drop || strength >= weak });\n    });\n  }\n  return rows;\n}\n\n// src/lib/templates.js\nvar FONTS = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&display=swap";\nvar HEAD = (title, zh) => `# ${title}\n\n${zh ? "\\u8FD9\\u662F\\u4E00\\u4E2A Forsion Video Studio \\u5DE5\\u7A0B\\u6587\\u4EF6\\u3002\\u573A\\u666F\\u6309\\u987A\\u5E8F\\u9996\\u5C3E\\u76F8\\u63A5\\u5730\\u64AD\\u653E\\uFF1B\\u6BCF\\u4E2A\\u573A\\u666F\\u7684 `hits` \\u662F\\u4ECE\\u573A\\u666F\\u5F00\\u5934\\u7B97\\u8D77\\u7684\\u62CD\\u70B9\\uFF0C\\u753B\\u9762\\u7684\\u5207\\u70B9\\u548C\\u914D\\u4E50\\u7684\\u91CD\\u97F3\\u90FD\\u4ECE\\u8FD9\\u91CC\\u8BFB\\u3002\\u7528 Video Studio \\u6253\\u5F00\\u53EF\\u4EE5\\u76F4\\u63A5\\u6539\\u6587\\u5B57\\u3001\\u62D6\\u65F6\\u95F4\\u7EBF\\uFF1B\\u4E5F\\u53EF\\u4EE5\\u8BA9 AI \\u6309\\u8FD9\\u4EFD\\u6587\\u4EF6\\u7684\\u5199\\u6CD5\\u7EE7\\u7EED\\u5199\\u3002" : "A Forsion Video Studio project. Scenes play back to back in document order; each scene\'s `hits` are beats from its start, and both the picture cuts and the score\'s accents read them. Open it in Video Studio to edit the text and the timeline, or ask the AI to keep writing it."}\n`;\nvar EVA_CSS = `/* Title cards in the manner of an EVA intertitle: black, heavy serif, hard cuts on the beat. */\n.fvs-eva { --ink: #f2f0ea; --red: #e3161b; --orange: #ff6a13; --green: #38ff8b; color: var(--ink); font-family: \'Noto Serif SC\', \'Songti SC\', serif; }\n.fvs-eva .card { position: absolute; inset: 0; background: #000; }\n.fvs-eva .card.inv { background: var(--ink); color: #000; }\n.fvs-eva .k { position: absolute; font-weight: 900; line-height: 1; white-space: nowrap; transform: scaleX(.8); transform-origin: 0 0; }\n.fvs-eva .k.mid { left: 0; right: 0; text-align: center; transform-origin: 50% 0; }\n.fvs-eva .e { position: absolute; font: 700 44px/1.3 \'Barlow Condensed\', sans-serif; letter-spacing: .22em; white-space: nowrap; }\n.fvs-eva .e.mid { left: 0; right: 0; text-align: center; }\n.fvs-eva .red { color: var(--red); }\n.fvs-eva .hud { position: absolute; inset: 0; background: #000; color: var(--orange); font-family: \'Barlow Condensed\', sans-serif; }\n.fvs-eva .top { position: absolute; left: 90px; right: 90px; top: 60px; height: 70px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--orange); font: 700 38px \'Barlow Condensed\', sans-serif; letter-spacing: .16em; }\n.fvs-eva .term { position: absolute; left: 90px; top: 220px; display: grid; gap: 14px; }\n.fvs-eva .term p { margin: 0; font: 500 44px/1.4 \'JetBrains Mono\', monospace; color: var(--green); white-space: pre; }\n.fvs-eva .grain { position: absolute; inset: 0; pointer-events: none; background-size: 200px 200px; opacity: .06; mix-blend-mode: screen; }`;\nfunction evaTemplate({ title = "\\u65B0\\u89C6\\u9891", zh = true } = {}) {\n  return `${HEAD(title, zh)}\n\\`\\`\\`fvs\n{\n  "fvs": 1,\n  "title": ${JSON.stringify(title)},\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "class": "fvs-eva",\n  "fonts": [${JSON.stringify(FONTS)}],\n  "audio": []\n}\n\\`\\`\\`\n\n\\`\\`\\`css\n${EVA_CSS}\n\\`\\`\\`\n\n\\`\\`\\`html stage\n<div data-fvs-scenes></div>\n<div class="grain"></div>\n<div data-fvs-flash></div>\n\\`\\`\\`\n\n\\`\\`\\`js stage\ngrain(\'.grain\')\n\\`\\`\\`\n\n## boot \\xB7 \\u542F\\u52A8\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 1, 2, 3, 4, 6] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div class="hud">\n  <div class="top"><span>FORSION VIDEO STUDIO</span><span class="red">\\u25CF REC</span></div>\n  <div class="term">\n    <p data-in="h1" data-fx="type">SCENES ........ OK</p>\n    <p data-in="h2" data-fx="type">TIMELINE ...... OK</p>\n    <p data-in="h3" data-fx="type">SCORE ......... OK</p>\n    <p data-in="h4" data-fx="type" class="red">HUMAN ......... ??</p>\n  </div>\n</div>\n\\`\\`\\`\n\n## cards \\xB7 \\u6807\\u9898\\u5361\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 2, 4, 6] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div data-seq="h0">\n  <div class="card"><span class="k" style="left:150px;top:260px;font-size:380px">\\u7B2C\\u4E00\\u8BDD</span><span class="e" style="left:160px;top:760px">EPISODE ONE</span></div>\n  <div class="card"><span class="k" style="left:1500px;top:90px;font-size:300px;writing-mode:vertical-rl;transform:scaleY(.86)">\\u5F00\\u59CB</span><span class="e" style="left:150px;top:920px">BEGIN</span></div>\n  <div class="card inv"><span class="k mid" style="top:330px;font-size:360px">\\u6539\\u6587\\u5B57</span></div>\n  <div class="card"><span class="e mid" style="top:380px;font-size:64px">EDIT THE TEXT, DRAG THE TIMELINE.</span><span class="k mid red" style="top:520px;font-size:120px">\\u7136\\u540E\\u5BFC\\u51FA\\u3002</span></div>\n</div>\n\\`\\`\\`\n\n\\`\\`\\`js\n// a flash on the first cut; everything else in this scene is declarative (data-seq)\nflash(hits[0], .6)\n\\`\\`\\`\n\n## title \\xB7 \\u7247\\u540D\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 4] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div class="card">\n  <span class="e" style="left:160px;top:150px;font-size:60px" data-in="h0">EPISODE 01</span>\n  <span class="k" style="left:140px;top:280px;font-size:420px" data-in="h1">${title}</span>\n</div>\n\\`\\`\\`\n\n\\`\\`\\`js\nflash(hits[1], .85)\n\\`\\`\\`\n`;\n}\nfunction blankTemplate({ title = "\\u65B0\\u89C6\\u9891", zh = true } = {}) {\n  return `${HEAD(title, zh)}\n\\`\\`\\`fvs\n{\n  "fvs": 1,\n  "title": ${JSON.stringify(title)},\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "background": "#101010",\n  "audio": []\n}\n\\`\\`\\`\n\n\\`\\`\\`css\n.fvs-stage { color: #f5f3ef; font-family: \'Noto Sans SC\', \'PingFang SC\', system-ui, sans-serif; }\n.fvs-stage h1 { position: absolute; left: 160px; top: 380px; margin: 0; font-size: 150px; font-weight: 700; }\n.fvs-stage p { position: absolute; left: 164px; top: 600px; margin: 0; font-size: 48px; color: #a39d96; }\n\\`\\`\\`\n\n## intro \\xB7 \\u5F00\\u573A\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 2] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<h1 data-in="h0" data-fx="up">${title}</h1>\n<p data-in="h1" data-fx="fade">${zh ? "\\u7B2C\\u4E00\\u53E5\\u526F\\u6807\\u9898" : "A subtitle"}</p>\n\\`\\`\\`\n`;\n}\nvar TEMPLATES = { eva: evaTemplate, blank: blankTemplate };\n\n// src/generated/runtime-src.js\nvar runtime_src_default = \'/* Forsion Video Studio 0.10.1 \\u2014 built from src/ by build.mjs; edit the sources, not this file. */\\nvar FVS=(()=>{var nt=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ht=Object.prototype.hasOwnProperty;var gt=(t,e)=>{for(var i in e)nt(t,i,{get:e[i],enumerable:!0})},bt=(t,e,i,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of mt(e))!ht.call(t,o)&&o!==i&&nt(t,o,{get:()=>e[o],enumerable:!(p=pt(e,o))||p.enumerable});return t};var yt=t=>bt(nt({},"__esModule",{value:!0}),t);var Ht={};gt(Ht,{EASE:()=>V,boot:()=>It,createStage:()=>et,mount:()=>tt,prog:()=>Z,rng:()=>Q,timeExpr:()=>ot});var V={lin:t=>t,in:t=>t*t*t,out:t=>1-(1-t)**3,io:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,expo:t=>t>=1?1:1-2**(-10*t),back:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,step:t=>t<1?0:1},G=(t,e=0,i=1)=>Math.min(i,Math.max(e,t)),rt=(t,e,i)=>t+(e-t)*i,Z=(t,e,i,p="io")=>(V[p]||V.io)(G((t-e)/(i-e))),Q=t=>()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=["x","y","z","s","sx","sy","r","rx","ry"];function wt(t,e){if(e<=t[0].t)return t[0].v;for(let i=1;i<t.length;i++){let p=t[i];if(e<p.t){let o=t[i-1],h=(V[p.e]||V.io)((e-o.t)/(p.t-o.t)),l={};for(let w in p.v){let $=w in o.v?o.v[w]:p.v[w],y=p.v[w];l[w]=typeof y=="number"&&typeof $=="number"?$+(y-$)*h:h<1?$:y}return l}}return t[t.length-1].v}function $t(t,e,i){let p=t.style;if(i){let o=`translate3d(${e.x||0}px,${e.y||0}px,${e.z||0}px)`;e.rx&&(o+=` rotateX(${e.rx}deg)`),e.ry&&(o+=` rotateY(${e.ry}deg)`),e.r&&(o+=` rotate(${e.r}deg)`),(e.s??1)!==1&&(o+=` scale(${e.s})`),((e.sx??1)!==1||(e.sy??1)!==1)&&(o+=` scale(${e.sx??1},${e.sy??1})`),p.transform=o}"o"in e&&(p.opacity=e.o,p.visibility=e.o<.002?"hidden":""),("b"in e||"br"in e)&&(p.filter=`blur(${e.b||0}px) brightness(${e.br??1})`),("ct"in e||"cr"in e||"cb"in e||"cl"in e)&&(p.clipPath=`inset(${e.ct||0}% ${e.cr||0}% ${e.cb||0}% ${e.cl||0}%)`);for(let o in e)o[0]==="-"&&p.setProperty(o,e[o])}function et(t){let e=[],i=[],p=o=>typeof o=="string"?[...t.querySelectorAll(o)]:o==null?[]:o instanceof Element?[o]:[...o];return{root:t,q:p,tracks:e,hooks:i,K(o,h,l={}){let w={},$=h.map(([j,k={},L="io"])=>(w={...w,...k},{t:j,v:w,e:L}));if(!$.length)return;let y=$.some(j=>Object.keys(j.v).some(k=>xt.includes(k)));p(o).forEach((j,k)=>e.push({el:j,kf:$,hasTf:y,off:(l.stagger||0)*k}))},S(o,h,l){let w=p(o);i.push($=>{for(let y of w)y.style.display=$>=h&&$<l?"":"none"})},H(o){i.push(o)},type(o,h,l=30,w=0){p(o).forEach(($,y)=>{let j=[...$.textContent],k=h+w*y;i.push(L=>{let S=G(Math.floor((L-k)*l),0,j.length),R=j.slice(0,S).join("");$.textContent!==R&&($.textContent=R)})})},render(o){for(let h of i)h(o);for(let h of e)$t(h.el,wt(h.kf,o-h.off),h.hasTf)}}}var K=null;function kt(){if(K)return K;let t=Q(7);K=[];for(let e=0;e<4;e++){let i=document.createElement("canvas");i.width=i.height=200;let p=i.getContext("2d"),o=p.createImageData(200,200);for(let h=0;h<o.data.length;h+=4){let l=t()*255;o.data[h]=o.data[h+1]=o.data[h+2]=l,o.data[h+3]=255}p.putImageData(o,0,0),K.push(`url(${i.toDataURL()})`)}return K}function it(t,e=".grain"){let i=t.q(e),p=kt();t.H(o=>{let h=p[Math.floor(o*24)%4];for(let l of i)l.style.backgroundImage=h})}var vt=["","aborted","network error","decode error","format not supported or file missing"];function at(t,{mode:e="live",assets:i={},errors:p=[],onError:o=null}={}){let h={};for(let[s,c]of Object.entries(i||{}))typeof c=="string"&&!(c in h)&&(h[c]=s);let l=[],w=[],$=s=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(s||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let m=atob(s.slice(c[0].length).replace(/\\\\s+/g,"")),g=new Uint8Array(m.length);for(let I=0;I<m.length;I++)g[I]=m.charCodeAt(I);let b=URL.createObjectURL(new Blob([g],{type:c[1]||"video/mp4"}));return w.push(b),b}catch{return null}};for(let s of t)for(let c of s.el.querySelectorAll("video")){let m=c.querySelector("source[src]"),g=c.getAttribute("src")||(m?m.getAttribute("src"):"")||"";for(let I of[c,...c.querySelectorAll("source[src]")]){let n=$(I.getAttribute("src"));n&&I.setAttribute("src",n)}let b={el:c,scene:s.id,src:h[g]||g,from:s.from,to:s.to,base:s.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=b.loop,c.addEventListener("error",()=>{b.failed=!0,S(b,y(b))},!0),c.addEventListener("loadedmetadata",()=>{j(b)||S(b,k(b))}),c.addEventListener("seeked",()=>{let I=b.want;b.want=null,I!==null&&Math.abs(c.currentTime-I)>.05&&S(b,k(b))});try{c.pause(),c.load()}catch{}l.push(b)}if(!l.length)return null;function y(s){let c=s.el.error,m=c?c.code:0,g=c?` (${vt[m]||`error ${m}`}${c.message?`: ${c.message}`:""})`:"",b=m===3||m===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${s.src}" cannot be played${g}${b}`}function j(s){let c=s.el,m=c.duration,g=c.seekable;return!(Number.isFinite(m)&&m>.5&&(!g||!g.length||g.end(g.length-1)<.01))}let k=s=>`video "${s.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function L(s,c){s.want=c,s.el.currentTime=c}function S(s,c){if(!s.reported&&(s.reported=!0,p.push({scene:s.scene,message:c,line:0}),o))try{o(s.scene,s.src)}catch{}}function R(s,c){let m=s.el.duration,g=m>0&&Number.isFinite(m),b=s.clipIn+(c-s.base);return s.loop&&g&&(b=(b%m+m)%m),b<0&&(b=0),g&&b>m-.001&&(b=Math.max(0,m-.001)),b}let F=(s,c)=>c>=s.from&&c<s.to;function N(s,c){return s.chain=s.chain.then(()=>new Promise(m=>{let g=s.el;if(s.failed){m();return}let b=!1,I=null,n=null,a=()=>u(null),u=E=>{b||(b=!0,clearTimeout(f),g.removeEventListener("error",a,!0),I&&g.removeEventListener("loadedmetadata",I),n&&g.removeEventListener("seeked",n),E?(S(s,E),(g.readyState===0||++s.misses>=3)&&(s.failed=!0)):s.misses=0,m())},f=setTimeout(()=>u(s.failed||g.error?null:`video "${s.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);g.addEventListener("error",a,!0);let T=()=>{if(I=null,s.failed||g.error){u(null);return}let E=R(s,c);if(s.at===E&&!g.seeking){u(null);return}let B=!1,H=!g.requestVideoFrameCallback,C=()=>{if(!(!B||!H)){if(Math.abs(g.currentTime-E)>.05){u(k(s));return}s.at=E,u(null)}};g.requestVideoFrameCallback&&g.requestVideoFrameCallback(()=>{H=!0,C()}),n=()=>{B=!0,g.requestVideoFrameCallback?C():requestAnimationFrame(()=>requestAnimationFrame(C))},g.addEventListener("seeked",n,{once:!0}),s.at=null,L(s,E)};g.readyState>=1?T():(I=T,g.addEventListener("loadedmetadata",I,{once:!0}))})),s.chain}let d=null,r=0,v=null,O=0,M=(s,c,m)=>{let g=Math.abs(c-m),b=s.el.duration;return s.loop&&b>0&&Number.isFinite(b)?Math.min(g,b-g):g},_=s=>{try{let c=s.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},U=(s,c)=>{let m=s.el;m.paused||m.pause(),Math.abs(m.currentTime-c)>.001&&L(s,c)};function P(s){!o||s.reported||s.stall||s.el.readyState>0||(s.stall=setTimeout(()=>{s.stall=0,s.el.readyState===0&&S(s,`video "${s.src}" did not load within ${8e3/1e3} s`)},8e3))}function D(){for(let s of l)s.failed||(d!==null&&F(s,d)?U(s,R(s,d)):s.el.paused||s.el.pause())}function Y(s){let c=d===null?NaN:s-d,m=performance.now(),g=(m-r)/1e3;d=s,r=m;let b=c>0&&c<=.3,I=v===!0?b:v===null&&b&&Math.abs(c-g)<.1;for(let n of l){if(n.failed)continue;let a=n.el;if(!F(n,s)){a.paused||a.pause(),s<n.from&&n.from-s<=1&&U(n,R(n,n.from));continue}P(n);let u=R(n,s),f=a.duration,T=!n.loop&&f>0&&Number.isFinite(f)&&u>=f-.001-.001;I&&!T?a.paused?(M(n,a.currentTime,u)>.001&&L(n,u),_(n)):M(n,a.currentTime,u)>.15&&L(n,u):U(n,u)}clearTimeout(O),O=setTimeout(D,150)}return{clips:l,seek(s){if(e!=="capture"){Y(s);return}let c=[];for(let m of l)F(m,s)?c.push(m):m.el.paused||m.el.pause();return Promise.all(c.map(m=>N(m,s))).then(()=>{})},transport(s){v=!!s,v||(clearTimeout(O),D())},ready(){return Promise.all(l.map(s=>new Promise(c=>{let m=s.el;if(s.failed||m.error||m.readyState>=2){c();return}let g=()=>{clearTimeout(b),m.removeEventListener("loadeddata",g),m.removeEventListener("error",g,!0),c()},b=setTimeout(()=>{m.readyState===0&&!s.failed&&(s.failed=!0,S(s,`video "${s.src}" did not load within ${1e4/1e3} s`)),g()},1e4);m.addEventListener("loadeddata",g),m.addEventListener("error",g,!0)})))},destroy(){clearTimeout(O);for(let s of l){clearTimeout(s.stall);try{s.el.pause()}catch{}}for(let s of w)URL.revokeObjectURL(s)}}}var St=`\\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\\n.fvs-scenes{position:absolute;inset:0}\\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\\n.fvs-transition{position:absolute;inset:0}\\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\\n`,st={fade:t=>({b:{opacity:t}}),dip:t=>({a:{opacity:G(1-2*t)},b:{opacity:G(2*t-1)}}),"slide-left":(t,e)=>({b:{transform:`translateX(${(1-t)*e}px)`}}),"slide-up":(t,e,i)=>({b:{transform:`translateY(${(1-t)*i}px)`}}),"push-left":(t,e)=>({a:{transform:`translateX(${-t*e}px)`},b:{transform:`translateX(${(1-t)*e}px)`}}),"wipe-left":t=>({b:{clipPath:`inset(0 0 0 ${(1-t)*100}%)`}}),zoom:t=>({b:{opacity:t,transform:`scale(${1.08-.08*t})`}}),blur:t=>({b:{opacity:t,filter:`blur(${12*(1-t)}px)`}})},ct=1e-4,lt=new Set(["dip","push-left"]),Et=["opacity","transform","clipPath","filter"],Wt=Object.keys(st),Tt=/^\\\\s*(?:(h)(\\\\d+)|(end|start))?\\\\s*(?:([+-])?\\\\s*(\\\\d*\\\\.?\\\\d+)\\\\s*(b|beats?|s|secs?)?)?\\\\s*$/i;function ot(t,e,i,p){let o=String(t).match(Tt);if(!o||!o[1]&&!o[3]&&!o[5])throw new Error(`cannot read time "${t}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let h=e.t0;if(o[1]){let l=+o[2];if(!(l<e.hits.length))throw new Error(`"${t}": this scene has ${e.hits.length} hits (h0\\\\u2013h${e.hits.length-1})`);h=e.hits[l]}if(o[3]==="end"&&(h=e.t1),o[5]){let l=+o[5]*(o[4]==="-"?-1:1),w=(o[6]||"").toLowerCase();h+=l*(w.startsWith("b")?p:w.startsWith("s")?1:i)}return h}function tt(t,e,{doc:i=document,onScene:p=null,media:o="live",onMediaError:h=null}={}){let l=t,w=[],$=l.tempo,y=$?60/$.bpm:.5,j=y*($?$.beatsPerBar:4),k=$?y:1,L=i.createElement("style");L.setAttribute("data-fvs",""),L.textContent=St+`\\n`+(l.css||"")+`\\n`+l.scenes.filter(n=>n.css&&n.css.trim()).map(n=>`[data-scene="${n.id}"]{\\n${n.css}\\n}`).join(`\\n`),i.head.append(L);let S=i.createElement("div");S.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(S.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),S.innerHTML=l.stage.html||"";let R=S.querySelector("[data-fvs-scenes], fvs-scenes"),F=i.createElement("div");F.className="fvs-scenes",R?R.replaceWith(F):S.prepend(F),R=F,e.append(S);let N=et(S),d=[],r={},v=l.assets||{},O=n=>v[String(n).replace(/^\\\\.\\\\//,"")]||n,M=l.scenes,_=n=>n&&n.transition&&st[n.transition.type]&&n.transition.dur>0?n.transition:null,U=M.map((n,a)=>{let u=_(M[a+1]);return u?u.dur:0}),P=[],D=[];for(let[n,a]of M.entries()){let u=i.createElement("div");u.className=`fvs-scene scene ${a.cls||""}`.trim(),u.dataset.scene=a.id,u.innerHTML=a.html||"";let f=_(M[n+1]),T=u;(_(a)||f&&lt.has(f.type))&&(T=i.createElement("div"),T.className="fvs-transition",T.append(u),D.push(T)),P.push(T),R.append(T),N.S(T===u?u:[u,T],a.t0,a.t1+U[n]);let E=typeof a.t0v=="number"?a.t0v:a.t0;r[a.id]={id:a.id,title:a.title,t0:a.t0,t1:a.t1,dur:a.t1-a.t0,t0v:E,in:typeof a.in=="number"?a.in:a.t0-E,hits:a.hits,beats:a.beats,el:u,transition:_(a)},p&&p(r[a.id])}let Y=[];M.forEach((n,a)=>{let u=_(n);u&&a>0&&Y.push({t0:n.t0,d:u.dur,fx:st[u.type],a:lt.has(u.type)?P[a-1]:null,b:P[a]})}),Y.length&&N.H(n=>{let a=Y.find(f=>n>=f.t0&&n<f.t0+f.d),u=new Map;if(a){let f=a.fx(Z(n,a.t0,a.t0+a.d,"io"),l.width,l.height);f.a&&a.a&&u.set(a.a,f.a),f.b&&u.set(a.b,f.b)}for(let f of D){let T=u.get(f);for(let E of Et)f.style[E]=T&&T[E]!==void 0?String(T[E]):""}});function s(n,a){let u=x=>typeof x=="string"?[...a.querySelectorAll(x)]:x==null?[]:x instanceof Element?[x]:[...x],f=(x,A,z)=>N.K(u(x),A,z),T=(x,A,z)=>N.S(u(x),A,z),E=x=>n.t0+x*k,B=(x,A=0)=>x<n.hits.length?n.hits[x]+A*k:NaN,H=(x,A,z)=>f(x,[[A-.01,{o:0}],[A,{o:1},"step"]],z),C=(x,A,z={y:20},q)=>f(x,[[A-.01,{o:0,...z}],[A,{o:1},"step"],[A+.18,{x:0,y:0},"out"]],q),W=(x,A,z=y/2,q)=>f(x,[[A,{o:0}],[A+z,{o:1},"out"]],q),X=(x,A,z=n.t1+(n.tail||0))=>u(x).forEach((q,J)=>J<A.length&&N.S(q,A[J],A[J+1]??z));return{t0:n.t0,t1:n.t1,dur:n.t1-n.t0,hits:n.hits||[],beat:y,bar:j,unit:k,at:E,hit:B,root:a,stage:S,$:x=>a.querySelector(x),$$:x=>[...a.querySelectorAll(x)],K:f,S:T,H:x=>N.H(x),on:x=>N.H(x),type:(x,A,z,q)=>N.type(u(x),A,z,q),cut:H,slide:C,fade:W,seq:X,flash:(x,A=.85)=>d.push([x,A]),grain:(x=".grain")=>it({q:u,H:N.H},x),prog:Z,ease:V,clamp:G,lerp:rt,rng:Q,scenes:r,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:$},width:l.width,height:l.height,fps:l.fps,length:l.length,during:x=>x.map(A=>Array.isArray(A)?A:r[A]?[r[A].t0,r[A].t1]:[0,0]),inside:(x,A)=>A.some(([z,q])=>x>=z&&x<q)}}function c(n,a,u,f){if(!n||!n.trim())return;let T=Object.keys(a);try{new Function(...T,`${n}\\n//# sourceURL=fvs://${u}.js`)(...T.map(E=>a[E]))}catch(E){let B=String(E&&E.stack||"").match(new RegExp(`fvs://${u.replace(/[.*+?^${}()|[\\\\]\\\\\\\\]/g,"\\\\\\\\$&")}\\\\\\\\.js:(\\\\\\\\d+)`));w.push({scene:u.replace(/^scene\\\\//,""),message:String(E&&E.message||E),line:B&&f?f+ +B[1]-3:f||0})}}function m(n,a){let u=(f,T)=>{try{return ot(f,n,k,y)}catch(E){return w.push({scene:n.id,message:E.message,line:0,el:T.tagName}),NaN}};for(let f of n.el.querySelectorAll("[data-seq]")){let T=String(f.dataset.seq).match(/^\\\\s*h(\\\\d+)\\\\s*$/);if(!T){w.push({scene:n.id,message:`data-seq="${f.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let E=[...f.children],B=+T[1],H=E.map((C,W)=>n.hits[B+W]).filter(C=>C!==void 0);H.length<E.length&&w.push({scene:n.id,message:`data-seq has ${E.length} items but only ${H.length} hits from h${B}`}),a.seq(E,H,f.dataset.seqEnd?u(f.dataset.seqEnd,f):n.t1+(n.tail||0))}for(let f of n.el.querySelectorAll("[data-in], [data-out]")){let T=f.dataset.each!==void 0?+f.dataset.each*k:null,E=T!==null?[...f.children]:[f],B=f.dataset.in!==void 0?u(f.dataset.in,f):null,H=f.dataset.out!==void 0?u(f.dataset.out,f):null,C=(f.dataset.fx||"cut").toLowerCase(),W=(f.dataset.fxOut||"cut").toLowerCase(),X=+f.dataset.dist||24,x=f.dataset.dur!==void 0?+f.dataset.dur*k:y/2;E.forEach((A,z)=>{let q=B===null?null:B+(T||0)*z,J=[];if(q!==null&&!isNaN(q))if(C==="type")N.type([A],q,+f.dataset.cps||30);else if(C==="fade")J.push([q,{o:0}],[q+x,{o:1},"out"]);else if(C==="pop")J.push([q-.01,{o:0,s:.92}],[q,{o:1},"step"],[q+.25,{s:1},"back"]);else if(/^(up|down|left|right)$/.test(C)){let dt={up:{y:X},down:{y:-X},left:{x:X},right:{x:-X}}[C];J.push([q-.01,{o:0,...dt}],[q,{o:1},"step"],[q+.18,{x:0,y:0},"out"])}else J.push([q-.01,{o:0}],[q,{o:1},"step"]);H!==null&&!isNaN(H)&&(W==="fade"?(J.length||J.push([n.t0,{o:1}]),J.push([H,{o:1}],[H+x,{o:0},"in"])):N.S([A],-1e9,H)),J.length&&N.K([A],J)})}}if(M.forEach((n,a)=>{let u=r[n.id],f={...u,t0:u.t0v,dur:u.t1-u.t0v,tail:U[a]},T=s(f,u.el);m(f,T),c(n.js,T,`scene/${n.id}`,n.line)}),c(l.stage.js,s({id:"stage",t0:0,t1:l.length,hits:[],el:S},S),"stage",l.stage.line),l.captions&&l.captions.length){let n=i.createElement("div"),a=l.captionStyle||{};n.className="fvs-captions",n.dataset.position=a.position==="top"?"top":"bottom",n.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[a.size]||.045))}px`,S.append(n);let u=/<\\\\/?[a-z][^>]*>/gi,f="";N.H(T=>{let E=T-ct,B=l.captions.filter(C=>E>=C.t0-1e-6&&E<C.t1-1e-6&&C.text),H=B.map(C=>`${C.t0}\\\\0${C.text}`).join("");H!==f&&(f=H,n.replaceChildren(...B.map(C=>{let W=i.createElement("div");return W.className="fvs-caption",W.textContent=C.text.replace(u,""),W})))})}let g=[...S.querySelectorAll("[data-fvs-flash]")];g.length&&(d.sort((n,a)=>n[0]-a[0]),N.H(n=>{let a=0;for(let[u,f]of d)n>=u&&n<u+.18&&(a=Math.max(a,f*(1-(n-u)/.18)**2));for(let u of g)u.style.opacity=a}));let b=at([...M.map((n,a)=>({id:n.id,el:r[n.id].el,from:n.t0,to:n.t1+U[a],base:r[n.id].t0v})),{id:"stage",el:{querySelectorAll:n=>[...S.querySelectorAll(n)].filter(a=>!R.contains(a))},from:-1/0,to:1/0,base:0}],{mode:o,assets:l.assets,errors:w,onError:h});return{root:S,errors:w,scenes:r,seek:n=>{let a=n+ct;return N.render(a),b?b.seek(a):void 0},payload:l,videos:b,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:n=>{b&&b.transport(n)},ready:()=>b?b.ready():Promise.resolve(),destroy(){b&&b.destroy(),S.remove(),L.remove()}}}var At=t=>t.trim().replace(/^\\\\.\\\\//,"");var Lt=t=>({id:t.id,kind:"track",src:t.src,url:t.url??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!!t.mute,role:t.role}),Mt=(t,e={})=>({id:t.id,kind:"video",scene:t.scene,src:t.src,url:t.url??e[At(t.src)]??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!1,loop:!!t.loop});var ut=t=>t?[...(t.audio||[]).map(Lt),...(t.media||[]).map(e=>Mt(e,t.assets))]:[];var Nt=`\\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\\n.fvs-bar{display:flex;gap:10px;align-items:center}\\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\\n`,ft=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;function jt(){let t=document.getElementById("fvs-data");return JSON.parse(t.textContent)}function Ot(t,e,i,p){let o=!1,h=0,l=0,w=()=>o?Math.min(i,h+(performance.now()-l)/1e3):h,$=y=>{let j=w();for(let k of e){let{el:L}=k,S=L.duration,R=k.loop&&S>0&&Number.isFinite(S),F=j-k.at+k.in;R&&(F=(F%S+S)%S);let N=k.dur!=null&&j>=k.at+k.dur;if(!o||j<k.at||N||F>(S||1/0)){L.paused||L.pause(),j<k.at&&L.currentTime!==k.in&&(L.currentTime=k.in);continue}let d=Math.abs(L.currentTime-F);(y||(R?Math.min(d,S-d):d)>.08)&&(L.currentTime=F),L.paused&&L.play().catch(()=>{})}};return{now:w,sync:$,get playing(){return o},play(){h>=i&&(h=0),o=!0,l=performance.now(),$(!0)},pause(){h=w(),o=!1,$()},seek(y){h=Math.max(0,Math.min(i,y)),l=performance.now(),$(!0)},tick(){o&&w()>=i?(h=i,o=!1,$(),p&&p()):o&&$()}}}function Ct(t,e,i){let p=()=>{t.root.style.transform=`scale(${e.clientWidth/i.width})`};new ResizeObserver(p).observe(e),p()}function qt(t){let e=document.createElement("style");e.textContent=Nt,document.head.append(e);let i=document.createElement("main");i.className="fvs-app",i.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\\\u25B6 \\\\u64AD\\\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\\\u8FDB\\\\u5EA6"><output></output></div>\\n    <ol class="fvs-chapters" aria-label="\\\\u7AE0\\\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(i),i.querySelector("h1").textContent=t.title||"";let p=i.querySelector(".fvs-frame");p.style.aspectRatio=`${t.width} / ${t.height}`,p.style.maxWidth=`calc((100vh - 200px) * ${t.width/t.height})`,p.style.margin="0 auto",p.setAttribute("aria-label",t.title||"video");let o=tt(t,p);Ct(o,p,t);let h=ut(t).filter(r=>!r.mute).map(r=>{let v=new Audio(r.url);return v.preload="auto",v.loop=!!r.loop,v.volume=Math.min(1,10**((r.gain||0)/20)),{el:v,at:r.at,in:r.in,dur:r.dur,loop:!!r.loop}}),l=i.querySelector(".fvs-play"),w=i.querySelector("input"),$=i.querySelector("output");w.max=t.length;let y=Ot(t,h,t.length),j=i.querySelector(".fvs-chapters");j.innerHTML=t.scenes.map(r=>`<li><button type="button" data-t="${r.t0}"><b>${r.t0.toFixed(1)}</b></button></li>`).join(""),[...j.querySelectorAll("button")].forEach((r,v)=>r.append(t.scenes[v].title||t.scenes[v].id));let k=[...j.querySelectorAll("button")];if(o.errors.length){let r=i.querySelector(".fvs-err");r.hidden=!1,r.textContent=o.errors.map(v=>`${v.scene}${v.line?`:${v.line}`:""} ${v.message}`).join(`\\n`)}let L=()=>y.playing?y.pause():y.play();l.addEventListener("click",L),p.addEventListener("click",L),w.addEventListener("input",()=>y.seek(+w.value)),k.forEach(r=>r.addEventListener("click",()=>{y.seek(+r.dataset.t),y.playing||y.play()})),document.addEventListener("keydown",r=>{r.target.closest&&r.target.closest("input,button,textarea")||(r.code==="Space"&&(r.preventDefault(),L()),r.code==="ArrowRight"&&y.seek(y.now()+2),r.code==="ArrowLeft"&&y.seek(y.now()-2))});let S=-1,R=null,F=t.scenes.length?Math.min(t.length,t.scenes[Math.min(1,t.scenes.length-1)].t0+.8):0,N=!1,d=()=>{y.tick();let r=N||y.playing?y.now():F;y.playing&&(N=!0),y.playing!==R&&(R=y.playing,o.transport(R)),r!==S&&(o.seek(r),S=r),w.value=r,$.textContent=`${ft(r)} / ${ft(t.length)}`,l.textContent=y.playing?"\\\\u275A\\\\u275A \\\\u6682\\\\u505C":"\\\\u25B6 \\\\u64AD\\\\u653E",k.forEach((v,O)=>v.classList.toggle("on",r>=t.scenes[O].t0&&r<t.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{N=!0}),requestAnimationFrame(d),window.__fvs={stage:o,clock:y}}function Rt(t){document.documentElement.style.background="#000",document.body.style.margin="0";let e=tt(t,document.body,{media:"capture"});e.root.style.transform="none",e.seek(0),window.__stage={w:t.width,h:t.height,dur:t.length,fps:t.fps,errors:e.errors,audio:t.audio,media:t.media||[],seek:i=>e.seek(i),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(i=>i.complete?0:i.decode().catch(()=>0)),e.ready()]))}}var Ft=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _t(t){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let e=document.createElement("div");e.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${t.width}/${t.height};width:min(100vw, calc(100vh * ${t.width/t.height}))`,document.body.append(e);let i={},p=new WeakMap,o=new WeakMap,h=new WeakMap,l=d=>{let r=[],v=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let M;M=O.nextNode();){if(!/\\\\S/.test(M.data)||M.parentElement&&Ft.test(M.parentElement.tagName))continue;p.set(M,r.length);let _=M.parentElement;o.has(_)||o.set(_,[]),o.get(_).push(r.length),r.push({node:M,el:_})}v.forEach((M,_)=>h.set(M,_)),i[d.id]={texts:r,imgs:v}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),$=tt(t,e,{onScene:l,onMediaError:(d,r)=>w({type:"media-error",scene:d,src:r})}),y=()=>{$.root.style.transform=`scale(${e.clientWidth/t.width})`};new ResizeObserver(y).observe(e),y();let j=0;$.seek(0);let k=document.createElement("div");k.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",e.append(k);let L=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),S=d=>{if(!d){k.style.display="none";return}let r=e.getBoundingClientRect();Object.assign(k.style,{display:"",left:`${d.x-r.left-3}px`,top:`${d.y-r.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},R=d=>{let r=d&&d.closest&&d.closest("[data-scene]");return r?r.dataset.scene:null};function F(d,r){let v=document.elementFromPoint(d.clientX,d.clientY),O=R(v);if(!O||!i[O]){w({type:"pick",scene:null,dbl:r});return}if(v.tagName==="IMG"&&h.has(v)){w({type:"pick",scene:O,img:h.get(v),rect:L(v.getBoundingClientRect()),dbl:r});return}let M=null,_=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);_&&_.startContainer.nodeType===3&&p.has(_.startContainer)&&(M=p.get(_.startContainer));for(let D=v;M===null&&D&&D!==e;D=D.parentElement)o.has(D)&&(M=o.get(D)[0]);if(M===null){w({type:"pick",scene:O,dbl:r});return}let U=i[O].texts[M],P=U.node.isConnected?(()=>{let D=document.createRange();return D.selectNodeContents(U.node),D.getBoundingClientRect()})():U.el.getBoundingClientRect();w({type:"pick",scene:O,text:M,rect:L(P.width?P:U.el.getBoundingClientRect()),dbl:r})}e.addEventListener("click",d=>F(d,!1)),e.addEventListener("dblclick",d=>{d.preventDefault(),F(d,!0)}),window.addEventListener("message",d=>{let r=d.data||{};if(r.fvs==="seek")j=r.t,$.seek(r.t);else if(r.fvs==="transport")$.transport(!!r.playing);else if(r.fvs==="outline"){let v=i[r.scene],O=v?r.img!=null?v.imgs[r.img]:r.text!=null&&v.texts[r.text]?v.texts[r.text].el:null:null;S(O&&O.isConnected&&O.getClientRects().length?L(O.getBoundingClientRect()):null)}});let N=d=>Object.fromEntries(Object.entries(i).map(([r,v])=>[r,v[d].length]));w({type:"ready",length:t.length,errors:$.errors,texts:N("texts"),imgs:N("imgs")}),window.__fvs={stage:$,seek:d=>$.seek(d)}}function It(t){let e=jt(),i=typeof window<"u"&&window.FVS_MODE||t||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");i==="capture"?Rt(e):i==="embed"?_t(e):qt(e)}return yt(Ht);})();\\n\';\n\n// src/cli/render.js\nimport { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync, mkdtempSync, statSync } from "node:fs";\nimport { dirname, join, resolve } from "node:path";\nimport { tmpdir } from "node:os";\nimport { spawn, spawnSync } from "node:child_process";\nvar num2 = (x) => +(+x).toFixed(6);\nfunction audioGraph(segments, from, file) {\n  const args = [], parts = [];\n  segments.forEach((a, i) => {\n    if (a.loop) args.push("-stream_loop", "-1");\n    args.push("-i", file(a));\n    const trim = a.in > 0 || a.dur != null ? `atrim=start=${num2(a.in)}${a.dur != null ? `:duration=${num2(a.dur)}` : ""},asetpts=PTS-STARTPTS,` : "";\n    const shift = a.at - from;\n    parts.push(`[${i + 1}:a]${trim}${shift < 0 ? `atrim=start=${-shift},asetpts=PTS-STARTPTS,` : ""}${shift > 0 ? `adelay=${Math.round(shift * 1e3)}:all=1,` : ""}volume=${a.gain || 0}dB[a${i}]`);\n  });\n  const mix = segments.length > 1 ? `;${segments.map((_, i) => `[a${i}]`).join("")}amix=inputs=${segments.length}:normalize=0[aout]` : "";\n  return { args, filter: parts.join(";") + mix, out: segments.length > 1 ? "[aout]" : "[a0]" };\n}\nvar hasAudio = (ff, path) => /: Audio:/.test(spawnSync(ff, ["-hide_banner", "-i", path], { encoding: "utf8" }).stderr || "");\nfunction renderJob(file) {\n  if (!file) return { write() {\n  }, cancelled: () => false };\n  const path = resolve(file), cancel = path + ".cancel";\n  let value = JSON.parse(readFileSync(path, "utf8"));\n  return {\n    write(patch) {\n      value = { ...value, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };\n      const tmp = path + ".tmp";\n      writeFileSync(tmp, JSON.stringify(value, null, 2) + "\\n");\n      renameSync(tmp, path);\n    },\n    cancelled: () => existsSync(cancel)\n  };\n}\nasync function renderVideo(ctx, flags2, api) {\n  const job = renderJob(flags2.job);\n  let browser, frames, partial, cancelTimer;\n  const checkCancel = () => {\n    if (job.cancelled()) {\n      const e = new Error("Render cancelled");\n      e.cancelled = true;\n      throw e;\n    }\n  };\n  try {\n    checkCancel();\n    job.write({ status: "preparing", progress: 0, error: null });\n    const { p, dir } = ctx, fps = Number(flags2.fps || p.meta.fps), scale = Number(flags2.scale || 1), crf = Number(flags2.crf ?? 18);\n    const from = api.timeArg(p, flags2.from) ?? 0, to = Math.min(p.length, api.timeArg(p, flags2.to) ?? p.length);\n    if (!Number.isFinite(fps) || fps < 1 || fps > 120 || !Number.isFinite(scale) || scale <= 0 || scale > 4 || !Number.isFinite(crf) || crf < 0 || crf > 51 || from < 0 || !(to > from)) throw new Error("Invalid export range, frame rate, scale or quality");\n    const out = resolve(flags2.out || ctx.path.replace(/\\.fvs\\.md$/i, "") + ".mp4");\n    if (flags2.job && existsSync(out)) throw new Error("Output already exists; choose another file");\n    const ff = api.ffmpegBin();\n    browser = await api.chromium();\n    checkCancel();\n    frames = flags2["keep-frames"] ? resolve(flags2["keep-frames"]) : mkdtempSync(join(tmpdir(), "fvs-frames-"));\n    mkdirSync(frames, { recursive: true });\n    const workers = Math.max(1, Math.min(8, Number(flags2.workers) || 3));\n    const stages = [];\n    try {\n      for (let n = 0; n < workers; n++) {\n        checkCancel();\n        stages.push(await api.openStage(ctx, browser, { captions: !flags2["no-captions"] }));\n      }\n      if (api.runtimeErrors(stages[0].st, stages[0].logs) && !flags2.force) throw new Error("Scene scripts failed");\n      const f0 = Math.round(from * fps), f1 = Math.max(f0, Math.round(to * fps) - 1), total = f1 - f0 + 1;\n      let done = 0, lastPct = -1;\n      job.write({ status: "frames", progress: 0, totalFrames: total, completedFrames: 0 });\n      await Promise.all(stages.map(async ({ pg }, k) => {\n        for (let f = f0 + k; f <= f1; f += workers) {\n          checkCancel();\n          await pg.evaluate((t) => __stage.seek(t), f / fps);\n          await pg.screenshot({ path: join(frames, `${String(f - f0).padStart(6, "0")}.png`) });\n          const pct2 = Math.floor(++done / total * 80);\n          if (pct2 !== lastPct) {\n            lastPct = pct2;\n            job.write({ progress: pct2, completedFrames: done });\n            api.log(`frames ${done}/${total}`);\n          }\n        }\n      }));\n      checkCancel();\n      await browser.close();\n      browser = null;\n      const args = ["-y", "-loglevel", "error", "-progress", "pipe:1", "-framerate", String(fps), "-i", join(frames, "%06d.png")];\n      const segments = [];\n      for (const a of flags2["no-audio"] ? [] : audioSegments(p)) {\n        if (a.mute) continue;\n        if (a.kind === "video" && !isRelativeUrl(a.src)) {\n          api.log(`skipping the sound of ${a.src} (not a project file)`);\n          continue;\n        }\n        if (!existsSync(join(dir, a.src))) throw new Error(`${a.kind === "video" ? "Video" : "Audio"} file not found: ${a.src}`);\n        if (a.kind === "video" && !hasAudio(ff, join(dir, a.src))) continue;\n        segments.push(a);\n      }\n      if (segments.length) {\n        const g = audioGraph(segments, from, (a) => join(dir, a.src));\n        args.push(...g.args, "-filter_complex", g.filter, "-map", "0:v", "-map", g.out, "-c:a", "aac", "-b:a", flags2.abr || "256k");\n      }\n      args.push("-vf", `scale=trunc(iw*${scale}/2)*2:trunc(ih*${scale}/2)*2:flags=lanczos`, "-c:v", "libx264", "-preset", flags2.preset || "medium", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", String(total / fps));\n      mkdirSync(dirname(out), { recursive: true });\n      partial = out + `.partial-${process.pid}.mp4`;\n      args.push(partial);\n      job.write({ status: "encoding", progress: 80 });\n      await new Promise((ok, fail) => {\n        const child = spawn(ff, args, { stdio: ["ignore", "pipe", "pipe"] });\n        let errors = "", pending = "", killing = false;\n        const finish = (err) => {\n          clearInterval(cancelTimer);\n          cancelTimer = null;\n          err ? fail(err) : ok();\n        };\n        child.on("error", finish);\n        child.stderr.on("data", (b) => {\n          errors = (errors + b.toString()).slice(-4e3);\n        });\n        child.stdout.on("data", (b) => {\n          pending += b.toString();\n          const lines = pending.split("\\n");\n          pending = lines.pop();\n          for (const line of lines) if (line.startsWith("out_time_us=")) {\n            const sec = Number(line.slice(12)) / 1e6;\n            job.write({ progress: Math.min(99, 80 + Math.floor(sec / (total / fps) * 19)) });\n          }\n        });\n        cancelTimer = setInterval(() => {\n          if (job.cancelled() && !killing) {\n            killing = true;\n            child.kill("SIGKILL");\n          }\n        }, 150);\n        child.on("close", (code) => {\n          if (job.cancelled()) {\n            const e = new Error("Render cancelled");\n            e.cancelled = true;\n            finish(e);\n          } else finish(code === 0 ? null : new Error(`Encoding failed: ${errors || code}`));\n        });\n      });\n      checkCancel();\n      if (flags2.job && existsSync(out)) throw new Error("Output was created by another render");\n      renameSync(partial, out);\n      partial = null;\n      job.write({ status: "done", progress: 100, bytes: statSync(out).size, duration: total / fps, output: out });\n      api.log(out);\n    } finally {\n      for (const stage of stages) rmSync(stage.tmp, { recursive: true, force: true });\n    }\n  } catch (e) {\n    job.write({ status: e.cancelled ? "cancelled" : "failed", error: String(e.message || e) });\n    throw e;\n  } finally {\n    clearInterval(cancelTimer);\n    await browser?.close().catch(() => {\n    });\n    if (partial) rmSync(partial, { force: true });\n    if (frames && !flags2["keep-frames"]) rmSync(frames, { recursive: true, force: true });\n  }\n}\n\n// src/cli/fvs.js\nvar VERSION = "0.7.0";\nvar HELP = `fvs ${VERSION} \\u2014 Forsion Video Studio\n\n  fvs new <file.fvs.md> [--template eva|blank] [--title T]   start a project\n  fvs info <file>                      scenes, times, hits (read this before editing)\n  fvs check <file> [--runtime]         parse errors; --runtime also runs every scene script in a browser\n  fvs cues <file> [--out cues.json]    the cue sheet a score is written against (JSON)\n  fvs captions <file> [--out f.srt]    the captions track as a SubRip file\n  fvs html <file> [--out f.html] [--inline]   standalone web video (player page)\n  fvs still <file> --at <t|scene[:hit]> [--out f.png] [--scale 0.5]   one frame as PNG\n  fvs sheet <file> [--scenes | --every <sec>] [--out sheet.png]       contact sheet of frames\n  fvs render <file> [--out f.mp4] [--from s] [--to s] [--scale 0.5] [--workers 3] [--crf 18]\n                    [--keep-frames dir] [--no-audio] [--no-captions] MP4 with the project\'s audio and captions\n  fvs render-job <job.json>            export with real progress and a .cancel marker\n  fvs sync <file> [--audio a.mp3]      do the hits land on accents of the score?\n\n  Times: 12.5 (seconds), scene id (its start), scene:3 (its hit 3).\n  Browser: playwright-core (npm i -g playwright-core) + Chrome/Edge, or FVS_CHROMIUM=/path/to/chrome.\n  ffmpeg: on PATH, or FFMPEG=/path/to/ffmpeg.`;\nvar argv = process.argv.slice(2);\nvar cmd = argv.shift();\nvar flags = {};\nvar pos = [];\nfor (let i = 0; i < argv.length; i++) {\n  const a = argv[i];\n  if (a.startsWith("--")) {\n    const [k, v] = a.slice(2).split("=");\n    if (v !== void 0) flags[k] = v;\n    else if (argv[i + 1] !== void 0 && !argv[i + 1].startsWith("--")) flags[k] = argv[++i];\n    else flags[k] = true;\n  } else pos.push(a);\n}\nvar die = (msg, code = 1) => {\n  const error = new Error(msg);\n  error.exitCode = code;\n  throw error;\n};\nvar log = (...a) => console.log(...a);\nfunction load(file) {\n  if (!file) die("which project? (fvs <command> <file.fvs.md>)");\n  const path = resolve2(file);\n  if (!existsSync2(path)) die(`no such file: ${path}`);\n  const text = readFileSync2(path, "utf8");\n  return { path, dir: dirname2(path), text, p: parseProject(text) };\n}\nfunction report(p, { fail = true } = {}) {\n  const errs = p.errors.filter((e) => e.level === "error"), warns = p.errors.filter((e) => e.level !== "error");\n  for (const e of [...errs, ...warns]) console.error(`${e.level === "error" ? "error" : "warn "} line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);\n  if (errs.length && fail && !flags.force) die(`${errs.length} error(s); fix them or pass --force`);\n}\nvar fileUrl = (dir, rel) => pathToFileURL(join2(dir, rel)).href;\nfunction timeArg(p, v) {\n  if (v === void 0 || v === true) return null;\n  if (/^-?\\d+(\\.\\d+)?$/.test(String(v))) return +v;\n  const [id, h] = String(v).split(":");\n  const s = sceneById(p, id);\n  if (!s) die(`no scene "${id}" (scenes: ${p.scenes.map((x) => x.id).join(", ")})`);\n  if (h === void 0) return s.t0;\n  if (!(+h < s.hitTimes.length)) die(`scene "${id}" has ${s.hitTimes.length} hits`);\n  return s.hitTimes[+h];\n}\nasync function chromium() {\n  const req = createRequire(join2(process.cwd(), "x.js"));\n  const tries = ["playwright-core", "playwright"];\n  let pw = null;\n  for (const m of tries) {\n    for (const load2 of [() => import(m), () => req(m), () => createRequire(import.meta.url)(m), () => globalRequire(m)]) {\n      try {\n        pw = await load2();\n        if (pw && (pw.chromium || pw.default && pw.default.chromium)) break;\n        pw = null;\n      } catch {\n      }\n    }\n    if (pw) break;\n  }\n  if (!pw) die("This command needs a browser driver. Install one:  npm i -g playwright-core   (or run inside a folder with playwright installed)");\n  const { chromium: C } = pw.chromium ? pw : pw.default;\n  const exe = process.env.FVS_CHROMIUM || flags.browser;\n  const attempts = [];\n  if (exe) attempts.push({ executablePath: exe });\n  attempts.push({}, { channel: "chrome" }, { channel: "msedge" }, { channel: "chromium" });\n  for (const p of knownBrowsers()) attempts.push({ executablePath: p });\n  let lastErr;\n  for (const opt of attempts) {\n    try {\n      return await C.launch({ ...opt, args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--hide-scrollbars"] });\n    } catch (e) {\n      lastErr = e;\n    }\n  }\n  die(`Could not start a Chromium-based browser (${String(lastErr && lastErr.message || lastErr).split("\\n")[0]}).\nInstall Google Chrome or Microsoft Edge, or run: npx playwright install chromium, or set FVS_CHROMIUM=/path/to/chrome`);\n}\nfunction globalRequire(m) {\n  const root = spawnSync2(platform() === "win32" ? "npm.cmd" : "npm", ["root", "-g"], { encoding: "utf8", shell: platform() === "win32" }).stdout.trim();\n  return createRequire(join2(root, "x.js"))(m);\n}\nfunction knownBrowsers() {\n  const P = platform(), h = homedir();\n  const list2 = P === "darwin" ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Chromium.app/Contents/MacOS/Chromium", `${h}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`] : P === "win32" ? [`${process.env["PROGRAMFILES"] || "C:\\\\Program Files"}\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"] || "C:\\\\Program Files (x86)"}\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe`, `${process.env.LOCALAPPDATA || ""}\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe`] : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/opt/pw-browsers/chromium/chrome-linux/chrome", "/snap/bin/chromium"];\n  return list2.filter((p) => {\n    try {\n      return existsSync2(p);\n    } catch {\n      return false;\n    }\n  });\n}\nfunction ffmpegBin() {\n  const cands = [flags.ffmpeg, process.env.FFMPEG, "ffmpeg"].filter(Boolean);\n  for (const c of cands) if (spawnSync2(c, ["-version"], { stdio: "ignore" }).status === 0) return c;\n  for (const py of ["python3", "python"]) {\n    const r = spawnSync2(py, ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"], { encoding: "utf8" });\n    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();\n  }\n  die("ffmpeg not found. Install it (macOS: brew install ffmpeg \\xB7 Windows: winget install ffmpeg \\xB7 Linux: apt install ffmpeg) or set FFMPEG=/path/to/ffmpeg");\n}\nasync function openStage(ctx, browser, { scale = 1, captions = true } = {}) {\n  const tmp = mkdtempSync2(join2(tmpdir2(), "fvs-"));\n  const payload = compile(ctx.p, { resolve: (rel) => fileUrl(ctx.dir, rel) });\n  if (!captions) payload.captions = [];\n  const html = buildHtml(payload, runtime_src_default, { mode: "capture" });\n  const page = join2(tmp, "capture.html");\n  writeFileSync2(page, html);\n  const pg = await browser.newPage({ viewport: { width: payload.width, height: payload.height }, deviceScaleFactor: scale });\n  const logs = [];\n  pg.on("pageerror", (e) => logs.push(String(e.message || e)));\n  if (flags["no-remote-fonts"]) await pg.route(/fonts\\.(googleapis|gstatic)\\.com/, (r) => r.abort());\n  await pg.route(/\\.(mp3|wav|m4a|ogg|aac|flac)(\\?|$)/i, (r) => r.abort());\n  await pg.goto(pathToFileURL(page).href);\n  const st = await pg.evaluate(async () => {\n    await Promise.race([window.__stage.ready(), new Promise((r) => setTimeout(r, 15e3))]);\n    return { w: __stage.w, h: __stage.h, dur: __stage.dur, fps: __stage.fps, errors: __stage.errors };\n  });\n  return { pg, st, tmp, payload, logs };\n}\nfunction runtimeErrors(st, logs) {\n  for (const e of st.errors) console.error(`error line ${e.line || "?"} [${e.scene}]: ${e.message}`);\n  for (const l of logs) console.error(`page error: ${l}`);\n  return st.errors.length + logs.length;\n}\nfunction missingMedia({ p, dir }) {\n  const out = [];\n  const gone = (rel) => isRelativeUrl(rel) && !existsSync2(join2(dir, rel.trim()));\n  for (const a of audioTracks(p.meta)) if (gone(a.src)) out.push({ level: "error", line: p.metaTok >= 0 ? p.toks[p.metaTok].line : 1, message: `audio file not found: ${a.src}` });\n  const inHtml = (html, line, scene) => {\n    for (const t of scan(html).tags) {\n      const refs = t.name === "video" ? [t.attr("src"), t.attr("poster")] : t.name === "source" ? [t.attr("src")] : [];\n      for (const r of refs) if (r && gone(r)) out.push({ level: "error", line, scene, message: `${t.name === "video" && r === t.attr("poster") ? "poster image" : "video file"} not found: ${r}` });\n    }\n  };\n  if (p.stageHtml >= 0) inHtml(stageHtml(p), p.toks[p.stageHtml].line, void 0);\n  for (const s of p.scenes) inHtml(s.html, s.htmlTok >= 0 ? p.toks[s.htmlTok].line : s.line, s.id);\n  return out;\n}\nvar commands = {\n  async new() {\n    const file = pos[0] || die("fvs new <file.fvs.md>");\n    const path = resolve2(file.endsWith(".fvs.md") ? file : `${file}.fvs.md`);\n    if (existsSync2(path) && !flags.force) die(`${path} exists (pass --force to overwrite)`);\n    const tpl = TEMPLATES[flags.template || "eva"] || die(`templates: ${Object.keys(TEMPLATES).join(", ")}`);\n    mkdirSync2(dirname2(path), { recursive: true });\n    writeFileSync2(path, tpl({ title: flags.title || basename(path, ".fvs.md"), zh: flags.lang !== "en" }));\n    log(path);\n  },\n  async info() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const tp = p.tempo;\n    const sec = (x) => `${+x.toFixed(3)} s`;\n    log(`${p.meta.title || "(untitled)"} \\xB7 ${p.meta.width}\\xD7${p.meta.height} @ ${p.meta.fps} fps \\xB7 ${p.length.toFixed(2)} s${tp ? ` \\xB7 ${tp.bpm} BPM ${tp.beatsPerBar}/4 (beat ${tp.beat.toFixed(3)} s, bar ${tp.bar.toFixed(3)} s)` : ""}`);\n    for (const a of audioTracks(p.meta)) log(`audio ${a.role}: ${a.src}${a.at ? ` at ${a.at}s` : ""}${a.gain ? ` ${a.gain} dB` : ""}${a.in ? ` from ${sec(a.in)} into the file` : ""}${a.dur != null ? ` for ${sec(a.dur)}` : ""}${a.mute ? " (muted)" : ""}`);\n    log("");\n    log(`${"#".padStart(3)}  ${"id".padEnd(14)} ${"start".padStart(7)} ${"end".padStart(7)}  ${"length".padEnd(10)} hits (${tp ? "beats" : "s"} from scene start \\u2192 absolute s)`);\n    if (p.scenes.some((s) => s.in)) log(`     with "in", hits count from the content start (start \\u2212 in); (h\\u2192t) = trimmed away, not on screen`);\n    for (const s of p.scenes) {\n      const shown = new Set(visibleHits(s).map((h) => h.index));\n      const hits = s.hits.map((h, i) => shown.has(i) ? `${h}\\u2192${s.hitTimes[i].toFixed(2)}` : `(${h}\\u2192${s.hitTimes[i].toFixed(2)})`).join("  ");\n      log(`${String(s.index + 1).padStart(3)}  ${s.id.padEnd(14)} ${s.t0.toFixed(2).padStart(7)} ${s.t1.toFixed(2).padStart(7)}  ${String(s.meta.length ?? "?").padEnd(10)} ${hits}${s.title ? `   # ${s.title}` : ""}`);\n      const extra = [];\n      if (s.in) extra.push(`in ${s.meta.in} (${sec(s.in)}; content starts at ${s.t0v.toFixed(2)})`);\n      if (s.transition) extra.push(`transition ${s.transition.type} ${sec(s.transition.dur)} (with ${p.scenes[s.index - 1].id} on screen underneath)`);\n      if (extra.length) log(`${" ".repeat(5)}${extra.join(" \\xB7 ")}`);\n      for (const v of videos(s.html)) log(`${" ".repeat(5)}video ${v.src || "(no src)"}${v.clipIn ? ` \\xB7 from ${sec(v.clipIn)} into the file` : ""}${v.gain ? ` \\xB7 ${v.gain} dB` : ""}${v.muted ? " \\xB7 muted" : ""}${v.loop ? " \\xB7 loop" : ""}`);\n    }\n    if (p.captions.length) log(`\ncaptions: ${p.captions.length} cues, ${Math.min(...p.captions.map((c) => c.start)).toFixed(2)}\\u2013${Math.max(...p.captions.map((c) => c.end)).toFixed(2)} s on project time (scene edits do not move them; fvs captions lists them)`);\n  },\n  async check() {\n    const ctx = load(pos[0]);\n    report(ctx.p, { fail: false });\n    let n = ctx.p.errors.filter((e) => e.level === "error").length;\n    for (const e of missingMedia(ctx)) {\n      console.error(`error line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);\n      n++;\n    }\n    if (flags.runtime) {\n      const browser = await chromium();\n      const { pg, st, logs } = await openStage(ctx, browser);\n      const withVideo = ctx.p.scenes.filter((s) => videos(s.html).length);\n      for (const s of withVideo) await pg.evaluate((x) => __stage.seek(x), s.t0);\n      if (withVideo.length) st.errors = await pg.evaluate(() => __stage.errors);\n      n += runtimeErrors(st, logs);\n      await browser.close();\n    }\n    if (n) die(`${n} error(s)`);\n    log(`ok \\xB7 ${ctx.p.scenes.length} scenes \\xB7 ${ctx.p.length.toFixed(2)} s${flags.runtime ? " \\xB7 scripts ran clean" : ""}`);\n  },\n  async cues() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const out = JSON.stringify(cueSheet(p), null, 2);\n    if (flags.out) {\n      writeFileSync2(resolve2(flags.out), out + "\\n");\n      log(resolve2(flags.out));\n    } else log(out);\n  },\n  async captions() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const bad = p.errors.filter((e) => e.captions && e.level === "error").length;\n    if (bad && !flags.force) die(`${bad} caption error(s) above; the SRT would leave those cues out (fix them or pass --force)`);\n    const out = formatSrt(p.captions);\n    if (flags.out) {\n      writeFileSync2(resolve2(flags.out), out ? out + "\\n" : "");\n      log(resolve2(flags.out));\n    } else if (out) log(out);\n  },\n  async html() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const out = resolve2(flags.out || ctx.path.replace(/\\.fvs\\.md$/i, "") + ".html");\n    const outDir = dirname2(out);\n    const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4", ".ogg": "audio/ogg", ".mp4": "video/mp4", ".m4v": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };\n    const resolveUrl = (rel) => {\n      const abs = join2(ctx.dir, rel);\n      if (flags.inline && existsSync2(abs)) return `data:${mime[extname(abs).toLowerCase()] || "application/octet-stream"};base64,${readFileSync2(abs).toString("base64")}`;\n      return relative(outDir, abs).split(sep).join("/");\n    };\n    const payload = compile(ctx.p, { resolve: resolveUrl });\n    writeFileSync2(out, buildHtml(payload, runtime_src_default, { mode: "player" }));\n    log(`${out} (${(statSync2(out).size / 1024).toFixed(0)} KB)`);\n  },\n  async still() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const t = timeArg(ctx.p, flags.at) ?? 0;\n    const browser = await chromium();\n    const { pg, st, logs } = await openStage(ctx, browser, { scale: +flags.scale || 1 });\n    runtimeErrors(st, logs);\n    await pg.evaluate((x) => __stage.seek(x), t);\n    const out = resolve2(flags.out || `${ctx.path.replace(/\\.fvs\\.md$/i, "")}-${t.toFixed(2)}s.png`);\n    await pg.screenshot({ path: out });\n    await browser.close();\n    log(out);\n  },\n  async sheet() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const p = ctx.p;\n    let times;\n    if (flags.every) {\n      const d = +flags.every;\n      times = [];\n      for (let t = 0; t < p.length; t += d) times.push(t);\n    } else times = p.scenes.map((s) => {\n      const vis = visibleHits(s);\n      return Math.max(s.t0, Math.min(s.t1 - Math.min(0.05, s.dur / 2), (vis.length ? vis[vis.length - 1].t : s.t0) + 0.5));\n    });\n    const labels = flags.every ? times.map((t) => `${t.toFixed(1)}s`) : p.scenes.map((s) => `${s.id} \\xB7 ${s.t0.toFixed(1)}s`);\n    const browser = await chromium();\n    const scale = 320 / p.meta.width;\n    const { pg, st, logs } = await openStage(ctx, browser, { scale });\n    runtimeErrors(st, logs);\n    const shots = [];\n    for (const t of times) {\n      await pg.evaluate((x) => __stage.seek(x), t);\n      shots.push((await pg.screenshot({ type: "jpeg", quality: 80 })).toString("base64"));\n    }\n    const cols = Math.min(6, Math.ceil(Math.sqrt(shots.length * 1.4)));\n    const sheet = await browser.newPage({ viewport: { width: cols * 332 + 12, height: 400 } });\n    await sheet.setContent(`<body style="margin:0;background:#111;color:#bbb;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},320px);gap:12px;padding:12px">${shots.map((b, i) => `<figure style="margin:0"><img style="display:block;width:320px" src="data:image/jpeg;base64,${b}"><figcaption style="padding-top:4px">${labels[i]}</figcaption></figure>`).join("")}</div></body>`);\n    const out = resolve2(flags.out || `${ctx.path.replace(/\\.fvs\\.md$/i, "")}-sheet.png`);\n    await sheet.screenshot({ path: out, fullPage: true });\n    await browser.close();\n    log(out);\n  },\n  async render() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    return renderVideo(ctx, flags, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });\n  },\n  async "render-job"() {\n    const jobPath = resolve2(pos[0] || die("render-job requires a job JSON file"));\n    const job = renderJob(jobPath);\n    try {\n      const spec = JSON.parse(readFileSync2(jobPath, "utf8"));\n      if (spec.v !== 1 || !spec.project || !spec.out || !spec.options) die("Invalid render job");\n      if (["done", "failed", "cancelled"].includes(spec.status)) {\n        log(`Job already ${spec.status}`);\n        return;\n      }\n      const ctx = load(spec.project);\n      if (spec.sourceSnapshot) {\n        ctx.text = readFileSync2(spec.sourceSnapshot, "utf8");\n        ctx.p = parseProject(ctx.text);\n      }\n      report(ctx.p);\n      return await renderVideo(ctx, { ...spec.options, out: spec.out, job: jobPath }, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });\n    } catch (e) {\n      job.write({ status: job.cancelled() ? "cancelled" : "failed", error: String(e.message || e) });\n      throw e;\n    }\n  },\n  async sync() {\n    const { p, dir } = load(pos[0]);\n    report(p, { fail: false });\n    const tracks = audioTracks(p.meta), track2 = tracks.find((a) => !a.mute) || tracks[0];\n    const src = flags.audio ? resolve2(flags.audio) : track2 && join2(dir, track2.src);\n    if (!src || !existsSync2(src)) die(`no audio to check against (add one to the project\'s "audio" or pass --audio)`);\n    const at = flags.audio ? 0 : track2.at || 0;\n    const ff = ffmpegBin();\n    const r = spawnSync2(ff, ["-v", "error", "-i", src, "-ac", "1", "-ar", String(ONSET_SR), "-f", "f32le", "-"], { maxBuffer: 1 << 30 });\n    if (r.status !== 0) die(`ffmpeg could not decode ${src}`);\n    const buf = r.stdout;\n    let pcm = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4));\n    if (!flags.audio && (track2.in > 0 || track2.dur != null)) {\n      const a = Math.min(pcm.length, Math.round(track2.in * ONSET_SR));\n      pcm = pcm.subarray(a, track2.dur != null ? Math.min(pcm.length, a + Math.round(track2.dur * ONSET_SR)) : pcm.length);\n    }\n    const lead = new Float32Array(Math.round(at * ONSET_SR));\n    const mono = at > 0 ? Float32Array.from([...lead, ...pcm]) : pcm;\n    const rows = syncReport(p.scenes, onsetEnvelope(mono, ONSET_SR));\n    let bad = 0;\n    for (const x of rows) {\n      const flag = x.ok ? x.quiet ? "cut to quiet" : "" : "<< weak accent";\n      if (!x.ok) bad++;\n      if (!x.ok || flags.all) log(`${x.t.toFixed(2).padStart(7)}s  ${x.scene}:h${x.hit}  accent ${x.strength.toFixed(2)}  ${x.offset == null ? "" : `${x.offset >= 0 ? "+" : ""}${Math.round(x.offset * 1e3)} ms`}  ${flag}`);\n    }\n    log(`${rows.length} hits, ${rows.length - bad} land on an accent${bad ? `, ${bad} do not (listed above)` : ""}`);\n  }\n};\nif (!cmd || cmd === "help" || flags.help || !commands[cmd]) {\n  log(HELP);\n  process.exit(cmd && !commands[cmd] && cmd !== "help" ? 1 : 0);\n}\ncommands[cmd]().catch((e) => {\n  console.error(e && e.stack || String(e));\n  process.exitCode = e.exitCode || 1;\n});\n';

  // src/generated/music-src.js
  var music_src_default = { "README.md": '# Video Studio music toolkit\n\nScores for Forsion Video Studio projects, written in Python against the project\'s cue sheet: every\naccent goes on a time the picture cuts on. Offline and deterministic; the result is a WAV (and an MP3\nwhen ffmpeg is around) that you add to the project\'s `audio` list.\n\n## Setup (once)\n\n```sh\npip install -r requirements.txt          # numpy scipy soundfile pedalboard\npython3 fetch_samples.py                  # VSCO 2 CE orchestra samples (CC0) into ~/vsco, needs git\n```\n\n`VSCO=/path` points the sampler at samples elsewhere; `FVS_CACHE` is where it keeps its analysis cache\n(default `~/.cache/fvs/vsco`). The first run builds the cache and takes a minute or two.\n\n## Files\n\n| file | what it is |\n|---|---|\n| `cues.py` | `Cues.load(project)`: tempo, scene starts and ends, each scene\'s hits in seconds; `write_audio()` |\n| `engine.py` | the mixer (`mix`: layers, gates, dynamic curve, reverb bus, master) and sound design (`boom`, `beep`, `riser`, `alarm`\u2026) |\n| `sampler.py` | `SampleTrack`: note/chord/ramp on recorded orchestra samples, with attack compensation so stabs land on the beat |\n| `battle.py` | one style, \u51B3\u6218 II (a battle march): `band()`, `groove()`, `melody()`, `hit()`, `knock()`, `pad()`, `roll()`, `final()`, `set_tempo()` |\n| `score_template.py` | a first score for any project with a tempo: groove throughout, a stab on every hit, a final chord |\n| `score_episode_212.py` | the real score of the 2.12 example: how a finished score treats each scene |\n| `fetch_samples.py` | downloads the samples |\n\n## Workflow\n\n1. `node ../fvs.mjs info <project>` \u2014 the scenes, their bars and hits.\n2. Copy `score_template.py` next to the project (or start from `score_episode_212.py`) and write the score:\n   one section per scene, reading `C.t0(id)`, `C.t1(id)` and `C.hits(id)`. Big cuts get `hit(..., cym=True)`,\n   cuts inside a phrase get `knock()`, and a hit that falls inside running music gets a sixteenth of\n   breath before it (`master_gates=[(t - BEAT / 4, t, -8, ())]`) so it reads as a cut.\n3. `python3 score.py <project> --out <project dir>/audio/score.mp3`, then add it to the project settings:\n   `"audio": [{ "src": "audio/score.mp3", "role": "score" }]`.\n4. `node ../fvs.mjs sync <project>` \u2014 every hit should land on an accent (or on a drop to quiet).\n   Fix misses in the score, or move a picture-only hit onto the accent.\n\nKeep melodies original. A reference track can guide tempo, key, groove and balance; never its notes.\n', "battle.py": "\"\"\"\u51B3\u6218 II \u2014 a battle march in the manner of an anime-orchestral 'decisive battle' cue, on recorded samples.\n\nStyle targets measured from the user's reference (not its notes): ~150 BPM in 4/4, E minor with\ndorian/phrygian colour, straight-eighth snare accented on beat 2 and the 'and' of 4, low end hitting\n1 \xB7 2 \xB7 2& \xB7 3& \xB7 4&, and a dark, low-heavy balance (most energy at 80\u2013250 Hz).\nAll melodies and harmony here are original.\n\nBuilding blocks for scoring a picture: band() (the sampled orchestra), groove() (one bar of the march),\nmelody(), hit() (a full-orchestra stab), knock() (a lighter stab), pad(), roll(), final(), master_chain().\nbattle_full() is the piece on its own, without a picture.\n\"\"\"\nimport numpy as np\nfrom pedalboard import Reverb, LowShelfFilter, HighShelfFilter, PeakFilter, Compressor, Limiter\nfrom engine import Audio, mix, n, ns, SR\nfrom sampler import SampleTrack, orchestra\n\nBPM = 150\nBEAT = 60 / BPM\n\n\ndef set_tempo(bpm):\n    \"\"\"The march is written at 150 BPM; score another tempo by setting it first (every helper reads BEAT).\"\"\"\n    global BPM, BEAT\n    BPM, BEAT = bpm, 60 / bpm\nLOW_HITS = [0, 1, 1.5, 2.5, 3.5]           # beats where bass drum / timpani / low brass land\nSNARE = [(0, .8), (.5, .45), (1, 1.0), (1.5, .45), (2, .7), (2.5, .45), (3, .55), (3.25, .5), (3.5, .95)]\n\n# Theme A (horns + trombones, later tutti): i \u2013 VI \u2013 IV(dorian) \u2013 i | i \u2013 \u266DII \u2013 V \u2013 i\nTHEME_A = [\n    ('Em', [(0, 1.5, 'E4'), (1.5, .5, 'F#4'), (2, 1, 'G4'), (3, 1, 'B4')]),\n    ('C', [(0, 1.5, 'C5'), (1.5, .5, 'B4'), (2, 1, 'G4'), (3, 1, 'E4')]),\n    ('A', [(0, 1.5, 'C#5'), (1.5, .5, 'D5'), (2, 1, 'E5'), (3, 1, 'A4')]),\n    ('Em', [(0, 2.5, 'B4'), (3, 1 / 3, 'G4'), (3 + 1 / 3, 1 / 3, 'A4'), (3 + 2 / 3, 1 / 3, 'B4')]),\n    ('Em', [(0, 1.5, 'E5'), (1.5, .5, 'D5'), (2, 1, 'B4'), (3, 1, 'G4')]),\n    ('F', [(0, 1.5, 'A4'), (1.5, .5, 'C5'), (2, 1, 'F5'), (3, 1, 'E5')]),\n    ('B', [(0, 1.5, 'D#5'), (1.5, .5, 'C#5'), (2, 1, 'B4'), (3, 1, 'F#4')]),\n    ('Em', [(0, 3, 'E4')]),\n]\n# Theme B (trumpets, fanfare with triplet turns): III \u2013 \u266DVII \u2013 VI \u2013 V\nTHEME_B = [\n    ('G', [(0, .5, 'D5'), (.5, .25, 'D5'), (.75, .25, 'D5'), (1, 1, 'G5'), (2, 1 / 3, 'F#5'), (2 + 1 / 3, 1 / 3, 'G5'), (2 + 2 / 3, 1 / 3, 'A5'), (3, 1, 'B5')]),\n    ('D', [(0, 1.5, 'A5'), (1.5, .5, 'F#5'), (2, 1, 'D5'), (3, 1, 'A4')]),\n    ('C', [(0, .5, 'G5'), (.5, .25, 'G5'), (.75, .25, 'G5'), (1, 1, 'C6'), (2, 1 / 3, 'B5'), (2 + 1 / 3, 1 / 3, 'A5'), (2 + 2 / 3, 1 / 3, 'G5'), (3, 1, 'E5')]),\n    ('B', [(0, 2, 'F#5'), (2, 1, 'D#5'), (3, 1, 'B4')]),\n]\nCHORDS = {  # root (bass octave), triad pitch classes as intervals, brass voicing\n    'Em': ('E1', [0, 3, 7], 'E3 G3 B3 E4'), 'C': ('C2', [0, 4, 7], 'E3 G3 C4 E4'), 'A': ('A1', [0, 4, 7], 'E3 A3 C#4 E4'),\n    'F': ('F1', [0, 4, 7], 'F3 A3 C4 F4'), 'B': ('B1', [0, 4, 7], 'D#3 F#3 B3 D#4'), 'G': ('G1', [0, 4, 7], 'D3 G3 B3 D4'),\n    'D': ('D2', [0, 4, 7], 'D3 F#3 A3 D4'), 'E': ('E1', [0, 4, 7], 'E3 G#3 B3 E4'),\n}\n\n\ndef band():\n    o = orchestra()\n    T = lambda name, sus, short=None, **k: SampleTrack(name, o[sus], short=o[short] if short else None, **k)\n    P = lambda name, bank, natural=True, **k: SampleTrack(name, o[bank], pitched_=False, natural=natural, **k)\n    return dict(\n        tpt=T('trumpets', 'tpt_sus', 'tpt_stac', gain=0.9, pan=0.25, send=0.26),\n        hn=T('horns', 'hn_sus', 'hn_stac', gain=1.1, pan=-0.3, send=0.32),\n        tbn=T('trombones', 'tbn_sus', 'tbn_stac', gain=0.8, pan=0.12, send=0.26),\n        tuba=T('tuba', 'tuba_sus', 'tuba_stac', gain=0.9, pan=0.05, send=0.2),\n        vln=T('violins', 'vln_sus', 'vln_spic', gain=0.5, pan=-0.45, send=0.24),\n        trem=T('violins-trem', 'vln_trem', gain=0.7, pan=-0.35, send=0.3),\n        vla=T('violas', 'vla_sus', 'vla_spic', gain=0.7, pan=0.3, send=0.22),\n        vc=T('celli', 'vc_sus', 'vc_spic', gain=1.0, pan=0.2, send=0.18),\n        cb=T('basses', 'cb_sus', 'cb_spic', gain=1.0, pan=0.35, send=0.16),\n        timp=SampleTrack('timpani', o['timp'], natural=True, gain=1.1, send=0.22),\n        snare=P('snare', 'snare', gain=0.55, pan=-0.05, send=0.16),\n        bd=P('bass-drum', 'bd', gain=1.0, send=0.2),\n        cym=P('cymbals', 'cym', natural=False, gain=1.3, pan=0.15, send=0.22),\n        cymroll=P('cym-roll', 'cymroll', gain=0.6, send=0.25),\n        gong=P('gong', 'gong', natural=False, gain=0.9, send=0.3),\n        sfx=Audio('sfx', gain=0.6, send=0.1),\n    )\n\n\ndef _tones(chord, octave_base):\n    root, iv, _ = CHORDS[chord]\n    r = n(root) + octave_base\n    return r, [r + i for i in iv]\n\n\ndef groove(b, t0, chord, vel=100, strings=True, drums=True, low_brass=True):\n    \"\"\"One bar of the battle groove starting at t0.\"\"\"\n    root, iv, _ = CHORDS[chord]\n    r = n(root)\n    minor = iv[1] == 3\n    if strings:\n        pat = [0, 0, 12, 0, 3 if minor else 4, 0, 7, 12]\n        for i, o in enumerate(pat):\n            t = t0 + i * BEAT / 2\n            b['vc'].note(t, 0.12, r + 12 + o, vel - (0 if i in (0, 3, 5, 7) else 18))\n        for p in LOW_HITS:\n            b['cb'].note(t0 + p * BEAT, 0.12, r, vel)\n        fifth, top = r + 43, r + 48  # violins: repeated sixteenths on the fifth and the octave\n        for i in range(16):\n            b['vln'].note(t0 + i * BEAT / 4, 0.08, top if i % 4 == 2 else fifth, vel - (8 if i % 4 else 0))\n        third = r + 24 + (3 if minor else 4)\n        for i in range(4):\n            b['vla'].note(t0 + (i + .5) * BEAT, 0.1, third, vel - 10)\n    if drums:\n        for p, a in SNARE:\n            b['snare'].note(t0 + p * BEAT, 0.1, 60, int(vel * a + 10))\n        for p in LOW_HITS:\n            b['bd'].note(t0 + p * BEAT, 0.2, 60, vel + (10 if p == 0 else 0))\n            b['timp'].note(t0 + p * BEAT, 0.3, r + 24 if p != 1.5 else r + 19, vel)\n    if low_brass:\n        for p in (0, 1.5, 2.5, 3.5):\n            b['tbn'].chord(t0 + p * BEAT, 0.15, [r + 24, r + 31], vel - 5)\n            b['tuba'].note(t0 + p * BEAT, 0.15, r + 12, vel)\n\n\ndef melody(b, t0, notes, tracks, vel=110, shift=0):\n    for p, d, k in notes:\n        for tr, sh in tracks:\n            b[tr].note(t0 + p * BEAT, d * BEAT * 0.96, n(k) + sh + shift, vel)\n\n\ndef hit(b, t, chord, vel=120, dur=0.25, cym=False, gong=False):\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, dur, [k + 12 for k in ns(voic)[1:]], vel)\n    b['hn'].chord(t, dur, voic, vel)\n    b['tbn'].chord(t, dur, [r + 24, r + 31, r + 36], vel)\n    b['tuba'].note(t, dur, r + 12, vel)\n    b['vc'].chord(t, dur, [r + 12, r + 24], vel)\n    b['cb'].note(t, dur, r, vel)\n    b['vln'].chord(t, dur, [k + 12 for k in ns(voic)[1:]], vel)\n    b['timp'].note(t, 0.5, r + 24, vel)\n    b['bd'].note(t, 0.5, 60, vel)\n    if cym:\n        b['cym'].note(t, 2, 60, 127)\n    if gong:\n        b['gong'].note(t, 4, 60, 120)\n\n\ndef knock(b, t, chord, vel=112, cym=False):\n    \"\"\"A lighter accent than hit(): brass stab, timpani and bass drum, for cuts inside a phrase.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, 0.14, [k + 12 for k in ns(voic)[1:]], vel)\n    b['hn'].chord(t, 0.14, voic, vel - 6)\n    b['timp'].note(t, 0.4, r + 24, vel)\n    b['bd'].note(t, 0.3, 60, vel)\n    b['cb'].note(t, 0.14, r, vel)\n    if cym:\n        b['cym'].note(t, 2, 60, 118)\n\n\ndef pad(b, t, dur, chord, vel=100):\n    \"\"\"A held chord across the band.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['hn'].chord(t, dur, voic, vel)\n    b['tbn'].chord(t, dur, [r + 24, r + 31], vel - 4)\n    b['tuba'].note(t, dur, r + 12, vel)\n    b['vln'].chord(t, dur, [k + 12 for k in ns(voic)[1:3]], vel - 6)\n    b['vla'].chord(t, dur, ns(voic)[1:3], vel - 8)\n    b['vc'].note(t, dur, r + 12, vel)\n    b['cb'].note(t, dur, r, vel)\n\n\ndef roll(b, t0, t1, v0=40, v1=120, timp=None):\n    k = int((t1 - t0) / 0.05)\n    for i in range(k):\n        v = v0 + (v1 - v0) * i / max(1, k - 1)\n        b['snare'].note(t0 + i * 0.05, 0.05, 60, int(v))\n        if timp and i % 2 == 0:\n            b['timp'].note(t0 + i * 0.05, 0.1, timp, int(v))\n\n\ndef final(b, t, chord='E', hold=3.6):\n    \"\"\"The last chord: tutti, gong, a decaying timpani roll.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, hold, [r + 36, r + 40, r + 43, r + 48], 122)\n    b['hn'].chord(t, hold, voic, 120)\n    b['tbn'].chord(t, hold, [r + 24, r + 31, r + 36, r + 40], 122)\n    b['tuba'].chord(t, hold, [r + 12, r + 24], 122)\n    b['vln'].chord(t, hold, [r + 40, r + 43, r + 48], 118)\n    b['vla'].chord(t, hold, [r + 31, r + 36], 116)\n    b['vc'].chord(t, hold, [r + 12, r + 24], 118)\n    b['cb'].note(t, hold, r, 118)\n    b['bd'].note(t, 1, 60, 127)\n    b['cym'].note(t, 3, 60, 127)\n    b['gong'].note(t, 4, 60, 124)\n    for i in range(int(hold / 0.06)):  # timpani roll, decaying\n        b['timp'].note(t + i * 0.06, 0.1, r + 24, int(max(30, 124 - i * 2.2)))\n\n\nMIXFX = dict(reverb=Reverb(room_size=0.8, damping=0.45, wet_level=1.0, dry_level=0.0, width=1.0))\n\n\ndef master_chain():\n    # dark, low-heavy balance like the reference: warm low shelf, tamed top\n    return [LowShelfFilter(160, 2.5), PeakFilter(140, 1.5, 0.9), PeakFilter(480, -1.5, 0.8), PeakFilter(3200, -1.0, 0.8), HighShelfFilter(9000, -2.0),\n            Compressor(threshold_db=-18, ratio=2.0, attack_ms=20, release_ms=220), Limiter(threshold_db=-1.5, release_ms=150)]\n\n\ndef battle_full():\n    b = band()\n    t0 = 0.25\n    at = lambda bar, beat=0.0: t0 + (bar * 4 + beat) * BEAT\n    # bars 0\u20131: rolls and a low brass pedal swelling out of nothing\n    roll(b, at(0), at(2) - 0.02, 20, 124, timp='E3')\n    b['cymroll'].note(at(0, 1.5), 1, 60, 120)\n    b['tbn'].chord(at(0), 8 * BEAT, 'E2 B2', 110).ramp(at(0), at(2), 11, 15, 127)\n    b['tuba'].note(at(0), 8 * BEAT, 'E1', 110)\n    b['cb'].note(at(0), 8 * BEAT, 'E2', 110)\n    b['trem'].chord(at(0), 8 * BEAT, 'E4 B4', 100).ramp(at(0), at(2), 11, 20, 127)\n    # bars 2\u20133: the groove, horn call\n    hit(b, at(2), 'Em', 124, 0.3, cym=True, gong=True)\n    for bar in (2, 3):\n        groove(b, at(bar), 'Em', vel=104)\n    melody(b, at(2), THEME_A[0][1] + [(4 + p, d, k) for p, d, k in THEME_A[3][1]], [('hn', 0)], vel=108)\n    # bars 4\u201311: theme A in horns and trombones\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 4 + i\n        groove(b, at(bar), c, vel=106)\n        melody(b, at(bar), notes, [('hn', 0), ('tbn', -12)], vel=114)\n        for p in (1.5, 3.5):\n            b['tpt'].chord(at(bar, p), 0.12, [k + 12 for k in ns(CHORDS[c][2])[1:]], 104)\n        if i in (0, 4):\n            b['cym'].note(at(bar), 2, 60, 118)\n    # bars 12\u201315: theme B in the trumpets, horns hold the chords\n    for i, (c, notes) in enumerate(THEME_B):\n        bar = 12 + i\n        groove(b, at(bar), c, vel=110)\n        melody(b, at(bar), notes, [('tpt', 0)], vel=120)\n        b['hn'].chord(at(bar), 4 * BEAT * 0.97, CHORDS[c][2], 100)\n        b['vln'].chord(at(bar), 4 * BEAT * 0.97, [k + 12 for k in ns(CHORDS[c][2])[1:3]], 96)\n        if i == 0:\n            b['cym'].note(at(bar), 2, 60, 122)\n    # bar 16: drums and low strings only; bar 17: build on the dominant\n    groove(b, at(16), 'Em', vel=100, low_brass=False)\n    groove(b, at(17), 'B', vel=96, strings=False, drums=False)\n    roll(b, at(17), at(18) - 0.02, 40, 126, timp='B2')\n    b['cymroll'].note(at(16, 3.2), 1, 60, 124)\n    b['hn'].chord(at(17), 4 * BEAT, 'D#4 F#4 B4', 110).ramp(at(17), at(18), 11, 35, 127)\n    b['tbn'].chord(at(17), 4 * BEAT, 'B2 F#3 A3', 110).ramp(at(17), at(18), 11, 35, 127)\n    b['tuba'].note(at(17), 4 * BEAT, 'B1', 110)\n    b['trem'].chord(at(17), 4 * BEAT, 'D#5 A5', 100).ramp(at(17), at(18), 11, 30, 127)\n    # bars 18\u201325: theme A tutti \u2014 trumpets and horns, trombones below, violins above\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 18 + i\n        groove(b, at(bar), c, vel=116)\n        melody(b, at(bar), notes, [('tpt', 0), ('hn', 0), ('tbn', -12), ('vln', 12)], vel=124)\n        if i in (0, 2, 4, 6):\n            b['cym'].note(at(bar), 2, 60, 124)\n    # bars 26\u201327: \u266DVI \u2013 \u266DVII \u2013 I, the other half completed in E major\n    hit(b, at(26), 'C', 124, 0.35, cym=True)\n    hit(b, at(26, 1.5), 'C', 120, 0.3)\n    hit(b, at(26, 3), 'D', 126, 0.35, cym=True)\n    roll(b, at(26, 3.3), at(27) - 0.02, 70, 127)\n    final(b, at(27), 'E', hold=4.2)\n    # dynamic arc shaped like the reference: a long build from the rolls, a breath at bar 16, full at the reprise\n    curve = [(0, -15), (at(2) - 0.05, -5), (at(2), -4), (at(4), -3), (at(12), -1.8), (at(16), -3.5), (at(18) - 0.05, -1.5), (at(18), 0)]\n    return mix(list(b.values()), at(27) + 6.0, master=master_chain(), fade_out=1.8, curve=curve, **MIXFX)\n\n\ndef match_loudness(x, target_db=-13.5):\n    \"\"\"Set the average level; a limiter keeps the peaks under -1 dBFS.\"\"\"\n    from pedalboard import Pedalboard, Limiter\n    rms = 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)\n    y = x * 10 ** ((target_db - rms) / 20)\n    y = Pedalboard([Limiter(threshold_db=-1.2, release_ms=120)])(y.T.copy(), SR).T\n    return (y / max(1.0, np.abs(y).max() / 10 ** (-1 / 20))).astype(np.float32)\n", "cues.py": "\"\"\"The cue sheet of a Forsion Video Studio project: scenes, tempo and hits, in seconds.\n\n    from cues import Cues\n    c = Cues.load('path/to/video.fvs.md')      # or a JSON file written by `fvs cues`\n    c.bpm, c.beat, c.bar, c.length\n    c.t0('cards'), c.t1('cards')               # scene start and end (s)\n    c.hits('cards')                            # the scene's hits, absolute seconds\n    c.at(bar, beat=0)                          # a point on the project's bar grid (bar 0 = t 0)\n    for s in c.scenes: s['id'], s['t0'], s['t1'], s['hitTimes']\n\nThe picture cuts on these hits and the score should put its accents on the same times.\n\"\"\"\nimport json\nimport os\nimport subprocess\n\n\nclass Cues:\n    def __init__(self, data):\n        self.data = data\n        self.scenes = data['scenes']\n        self.by_id = {s['id']: s for s in self.scenes}\n        self.bpm = data.get('bpm')\n        self.beats_per_bar = data.get('beatsPerBar') or 4\n        self.beat = 60 / self.bpm if self.bpm else None\n        self.bar = self.beat * self.beats_per_bar if self.bpm else None\n        self.length = data['length']\n        self.fps = data.get('fps', 30)\n        self.audio = data.get('audio', [])\n\n    @classmethod\n    def load(cls, path):\n        \"\"\"A .fvs.md project (read through the fvs CLI next to this folder) or a cue sheet JSON.\"\"\"\n        if path.endswith('.json'):\n            return cls(json.load(open(path, encoding='utf-8')))\n        here = os.path.dirname(os.path.abspath(__file__))\n        cli = next((p for p in (os.path.join(here, '..', 'fvs.mjs'), os.environ.get('FVS_CLI', '')) if p and os.path.exists(p)), None)\n        if not cli:\n            raise FileNotFoundError('fvs.mjs not found next to the music folder; pass a cue sheet JSON from `fvs cues` instead')\n        out = subprocess.run(['node', cli, 'cues', path], capture_output=True, text=True, check=True).stdout\n        return cls(json.loads(out))\n\n    def scene(self, sid):\n        if sid not in self.by_id:\n            raise KeyError(f'no scene {sid!r}; scenes: {\", \".join(self.by_id)}')\n        return self.by_id[sid]\n\n    def t0(self, sid):\n        return self.scene(sid)['t0']\n\n    def t1(self, sid):\n        return self.scene(sid)['t1']\n\n    def hits(self, sid):\n        return list(self.scene(sid)['hitTimes'])\n\n    def at(self, bar, beat=0.0):\n        \"\"\"Seconds at a bar (and beat) of the project's grid; bar 0 starts at 0 s.\"\"\"\n        if not self.bpm:\n            raise ValueError('this project has no tempo')\n        return (bar * self.beats_per_bar + beat) * self.beat\n\n    def all_hits(self):\n        return [(s['id'], i, t) for s in self.scenes for i, t in enumerate(s['hitTimes'])]\n\n\ndef write_audio(x, path, sr=48000):\n    \"\"\"WAV next to the project, plus an MP3 when ffmpeg is around (the Studio and the player like MP3).\"\"\"\n    import soundfile as sf\n    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)\n    wav = os.path.splitext(path)[0] + '.wav'\n    sf.write(wav, x, sr, subtype='PCM_24')\n    ff = os.environ.get('FFMPEG') or 'ffmpeg'\n    mp3 = os.path.splitext(path)[0] + '.mp3'\n    try:\n        subprocess.run([ff, '-y', '-loglevel', 'error', '-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', mp3], check=True)\n        return mp3\n    except (OSError, subprocess.CalledProcessError):\n        return wav\n", "engine.py": '"""Tiny offline score renderer: timed note events \u2192 stems \u2192 mixed stereo WAV (48 kHz).\n\nTrack renders General MIDI through a SoundFont (optional: pip install tinysoundfont, SF2=/path/to/font.sf2);\nsampler.SampleTrack is the same interface on recorded orchestra samples. Audio places pre-rendered clips.\nmix() renders every layer, applies gates and a dynamic curve, shares one reverb bus and masters the result.\nSound design (booms, beeps, alarms, risers) is synthesized with numpy.\n"""\nimport os\nimport numpy as np\nfrom pedalboard import Pedalboard, Reverb, Compressor, Limiter, HighpassFilter, LowpassFilter, PeakFilter\n\nSR = 48000\nSF2 = os.environ.get(\'SF2\', os.path.expanduser(\'~/sf/GeneralUser-GS.sf2\'))\nNAMES = {\'C\': 0, \'D\': 2, \'E\': 4, \'F\': 5, \'G\': 7, \'A\': 9, \'B\': 11}\n\n\ndef n(name):\n    """\'C#4\' \u2192 61 (C4 = 60). Also accepts ints."""\n    if isinstance(name, int):\n        return name\n    pc = NAMES[name[0]]\n    i = 1\n    while i < len(name) and name[i] in \'#b\':\n        pc += 1 if name[i] == \'#\' else -1\n        i += 1\n    return 12 * (int(name[i:]) + 1) + pc\n\n\ndef ns(names):\n    return [n(x) for x in names.split()] if isinstance(names, str) else [n(x) for x in names]\n\n\nclass Track:\n    def __init__(self, name, preset, bank=0, drums=False, gain=1.0, pan=0.0, fx=None, send=0.25):\n        self.name, self.preset, self.bank, self.drums = name, preset, bank, drums\n        self.gain, self.pan, self.fx, self.send = gain, pan, fx or [], send\n        self.ev = []  # (t, order, kind, a, b)\n\n    def note(self, t, dur, key, vel=100):\n        k = n(key)\n        self.ev.append((t, 1, \'on\', k, int(max(1, min(127, vel)))))\n        self.ev.append((t + dur, 0, \'off\', k, 0))\n        return self\n\n    def chord(self, t, dur, keys, vel=100):\n        for k in (ns(keys) if isinstance(keys, str) else keys):\n            self.note(t, dur, k, vel)\n        return self\n\n    def cc(self, t, num, val):\n        self.ev.append((t, 0, \'cc\', num, int(max(0, min(127, val)))))\n        return self\n\n    def ramp(self, t0, t1, num, v0, v1, steps=24):\n        for i in range(steps + 1):\n            self.cc(t0 + (t1 - t0) * i / steps, num, v0 + (v1 - v0) * i / steps)\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        if not self.ev:\n            return out\n        import tinysoundfont  # optional: only General MIDI tracks need it\n        s = tinysoundfont.Synth(samplerate=SR)\n        sfid = s.sfload(SF2)\n        s.program_select(0, sfid, self.bank, self.preset, is_drums=self.drums)\n        pos = 0\n        for t, _, kind, a, b in sorted(self.ev, key=lambda e: (e[0], e[1])):\n            idx = min(total, max(0, int(round(t * SR))))\n            if idx > pos:\n                out[pos:idx] = np.frombuffer(s.generate(idx - pos), np.float32).reshape(-1, 2)\n                pos = idx\n            if kind == \'on\':\n                s.noteon(0, a, b)\n            elif kind == \'off\':\n                s.noteoff(0, a)\n            else:\n                s.control_change(0, a, b)\n        if pos < total:\n            out[pos:] = np.frombuffer(s.generate(total - pos), np.float32).reshape(-1, 2)\n        return out\n\n\nclass Audio:\n    """A pre-rendered stereo layer (sound design) placed on the timeline."""\n\n    def __init__(self, name, gain=1.0, pan=0.0, fx=None, send=0.2):\n        self.name, self.gain, self.pan, self.fx, self.send = name, gain, pan, fx or [], send\n        self.clips = []\n\n    def add(self, t, sig, gain=1.0):\n        self.clips.append((t, sig, gain))\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        for t, sig, g in self.clips:\n            if sig.ndim == 1:\n                sig = np.stack([sig, sig], 1)\n            i = int(t * SR)\n            if i >= total:\n                continue\n            j = min(total, i + len(sig))\n            out[i:j] += sig[: j - i] * g\n        return out\n\n\ndef _pan(x, p):\n    l, r = np.cos((p + 1) * np.pi / 4), np.sin((p + 1) * np.pi / 4)\n    return x * np.array([l, r], np.float32) * np.sqrt(2)\n\n\ndef gate_env(total, gates, name=None, ramp=0.012):\n    """Gain envelope from (t0, t1, db, keep_names) windows: EVA-style hard cuts to near silence."""\n    env = np.ones(total, np.float32)\n    r = int(ramp * SR)\n    for t0, t1, db, keep in gates:\n        if name is not None and name in keep:\n            continue\n        a, b = int(t0 * SR), min(total, int(t1 * SR))\n        g = 10 ** (db / 20)\n        seg = np.full(b - a, g, np.float32)\n        k = min(r, len(seg) // 2)\n        seg[:k] = np.linspace(1, g, k)\n        seg[len(seg) - k:] = np.linspace(g, 1, k)\n        env[a:b] = np.minimum(env[a:b], seg)\n    return env[:, None]\n\n\ndef mix(layers, length, reverb=None, master=None, target_peak_db=-1.0, fade_out=0.0, gates=(), master_gates=(), curve=()):\n    """Render layers, apply per-layer fx and gates, share one reverb bus, then master chain and peak-normalize."""\n    total = int(length * SR)\n    dry = np.zeros((total, 2), np.float32)\n    bus = np.zeros((total, 2), np.float32)\n    for L in layers:\n        x = L.render(length) * L.gain\n        if L.fx:\n            x = Pedalboard(L.fx)(x.T.copy(), SR).T\n        x = _pan(x, L.pan)\n        if gates:\n            x = x * gate_env(total, gates, L.name)\n        if os.environ.get(\'REPORT\'):\n            w = os.environ.get(\'REPORT_WIN\')  # e.g. "69.2,72" to measure one passage\n            seg = x[int(float(w.split(\',\')[0]) * SR):int(float(w.split(\',\')[1]) * SR)] if w else x\n            rms = np.sqrt((seg ** 2).mean()) + 1e-12\n            print(f\'    {L.name:14s} rms {20 * np.log10(rms):6.1f} dB  peak {20 * np.log10(np.abs(x).max() + 1e-12):6.1f} dB\')\n        dry += x\n        bus += x * L.send\n    rv = reverb or Reverb(room_size=0.82, damping=0.35, wet_level=1.0, dry_level=0.0, width=1.0)\n    wet = Pedalboard([HighpassFilter(180), rv])(bus.T.copy(), SR).T\n    out = dry + wet\n    if master_gates:\n        out = out * gate_env(total, master_gates)\n    if curve:  # dynamic arc: [(t, db), ...] interpolated before the master chain\n        ts, dbs = zip(*curve)\n        out = out * (10 ** (np.interp(np.arange(total) / SR, ts, dbs) / 20))[:, None].astype(np.float32)\n    chain = master or [Compressor(threshold_db=-18, ratio=1.8, attack_ms=15, release_ms=200), Limiter(threshold_db=-1.5, release_ms=150)]\n    out = Pedalboard(chain)(out.T.copy(), SR).T\n    if fade_out:\n        k = int(fade_out * SR)\n        out[-k:] *= np.linspace(1, 0, k)[:, None] ** 2\n    peak = np.abs(out).max() + 1e-9\n    return (out * (10 ** (target_peak_db / 20) / peak)).astype(np.float32)\n\n\n# \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 sound design \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n_rng = np.random.default_rng(2012)\n\n\ndef env_exp(nsamp, decay):\n    return np.exp(-np.arange(nsamp) / (decay * SR)).astype(np.float32)\n\n\ndef boom(dur=2.5, f0=90.0, f1=28.0, sweep=0.35, decay=0.7, drive=1.6):\n    """Cinematic sub hit: pitch-dropping sine, soft-clipped."""\n    t = np.arange(int(dur * SR)) / SR\n    f = f1 + (f0 - f1) * np.exp(-t / sweep)\n    ph = 2 * np.pi * np.cumsum(f) / SR\n    x = np.sin(ph) * np.exp(-t / decay)\n    x[: int(0.004 * SR)] *= np.linspace(0, 1, int(0.004 * SR))\n    return np.tanh(x * drive).astype(np.float32) / np.tanh(drive)\n\n\ndef noise(dur, lp=None, hp=None, decay=None):\n    x = _rng.standard_normal(int(dur * SR)).astype(np.float32)\n    fx = []\n    if hp:\n        fx.append(HighpassFilter(hp))\n    if lp:\n        fx.append(LowpassFilter(lp))\n    if fx:\n        x = Pedalboard(fx)(x[None], SR)[0]\n    if decay:\n        x *= env_exp(len(x), decay)\n    return x / (np.abs(x).max() + 1e-9)\n\n\ndef impact(dur=3.0, weight=1.0):\n    """Boom + noise crack, for hard cuts."""\n    b = boom(dur, 110, 30, 0.25, 0.9) * weight\n    c = noise(dur, lp=5000, hp=300, decay=0.08) * 0.5\n    return (b + c) / 1.3\n\n\ndef click(dur=0.05, lp=9000):\n    return noise(dur, lp=lp, hp=1500, decay=0.006)\n\n\ndef glitch(dur=0.18, seed=0):\n    r = np.random.default_rng(seed)\n    x = np.zeros(int(dur * SR), np.float32)\n    for _ in range(6):\n        a = r.integers(0, len(x) - 400)\n        ln = r.integers(120, 900)\n        f = r.choice([800, 1600, 2400, 4000, 6000])\n        seg = np.sign(np.sin(2 * np.pi * f * np.arange(ln) / SR)) * r.uniform(.3, 1)\n        x[a:a + ln] += seg[: len(x) - a].astype(np.float32)\n    return np.clip(x, -1, 1) * 0.6\n\n\ndef beep(freq=1000, dur=0.12, shape=\'sine\', attack=0.003, release=0.02):\n    t = np.arange(int(dur * SR)) / SR\n    w = np.sin(2 * np.pi * freq * t) if shape == \'sine\' else np.sign(np.sin(2 * np.pi * freq * t)) * 0.5\n    e = np.ones_like(t)\n    a, r = int(attack * SR), int(release * SR)\n    e[:a] = np.linspace(0, 1, a)\n    e[-r:] = np.linspace(1, 0, r)\n    return (w * e).astype(np.float32)\n\n\ndef alarm(dur=1.0, f1=880, f2=660, rate=4.0):\n    """Two-tone warning siren (square, band-limited)."""\n    t = np.arange(int(dur * SR)) / SR\n    f = np.where(np.floor(t * rate) % 2 == 0, f1, f2)\n    ph = 2 * np.pi * np.cumsum(f) / SR\n    x = np.sign(np.sin(ph)) * 0.5 + np.sin(ph * 2) * 0.2\n    x = Pedalboard([LowpassFilter(3200), HighpassFilter(300)])(x[None].astype(np.float32), SR)[0]\n    fade = int(0.01 * SR)\n    x[:fade] *= np.linspace(0, 1, fade)\n    x[-fade:] *= np.linspace(1, 0, fade)\n    return x\n\n\ndef riser(dur=2.0, f0=200, f1=4000, tone=True):\n    t = np.arange(int(dur * SR)) / SR\n    k = t / dur\n    nz = noise(dur, hp=400) * (k ** 2.2)\n    # sweep a resonant peak by chunks\n    out = np.zeros_like(nz)\n    chunks = 40\n    for i in range(chunks):\n        a, b = i * len(nz) // chunks, (i + 1) * len(nz) // chunks\n        fc = f0 * (f1 / f0) ** (i / chunks)\n        out[a:b] = Pedalboard([PeakFilter(fc, 14, 1.2), LowpassFilter(fc * 2)])(nz[None, a:b], SR)[0]\n    x = out / (np.abs(out).max() + 1e-9)\n    if tone:\n        f = f0 * 0.5 * (f1 / f0 / 4) ** k\n        x = x * 0.7 + np.sin(2 * np.pi * np.cumsum(f) / SR) * (k ** 2) * 0.4\n    return x.astype(np.float32)\n\n\ndef drone(dur, freq=36.7, detune=0.4, lp=400):\n    t = np.arange(int(dur * SR)) / SR\n    x = sum(np.sin(2 * np.pi * freq * m * (1 + detune * 0.001 * i) * t + i) / m for i, m in enumerate([1, 2, 3, 4]))\n    x += noise(dur, lp=lp) * 0.15\n    x = Pedalboard([LowpassFilter(lp)])(x[None].astype(np.float32), SR)[0]\n    fade = int(0.5 * SR)\n    x[:fade] *= np.linspace(0, 1, fade)\n    x[-fade:] *= np.linspace(1, 0, fade)\n    return x / (np.abs(x).max() + 1e-9)\n\n\ndef heartbeat():\n    a = boom(0.35, 70, 40, 0.05, 0.08, 2.5)\n    b = boom(0.45, 60, 36, 0.05, 0.1, 2.5) * 0.7\n    out = np.zeros(int(0.8 * SR), np.float32)\n    out[: len(a)] += a\n    k = int(0.22 * SR)\n    out[k:k + len(b)] += b\n    return out\n\n\ndef tone(freq, dur, fade=0.02):\n    t = np.arange(int(dur * SR)) / SR\n    x = np.sin(2 * np.pi * freq * t)\n    f = int(fade * SR)\n    x[:f] *= np.linspace(0, 1, f)\n    x[-f:] *= np.linspace(1, 0, f)\n    return x.astype(np.float32)\n\n\ndef reverse(x):\n    return x[::-1].copy()\n\n\ndef fade_in(x, dur):\n    k = int(dur * SR)\n    x = x.copy()\n    x[:k] *= np.linspace(0, 1, k) ** 2\n    return x\n', "fetch_samples.py": "\"\"\"Download the orchestra samples the sampler uses: VSCO 2 Community Edition (CC0, ~1.7 GB of the full set).\n\n    python3 fetch_samples.py [target]        # default: $VSCO or ~/vsco\n\nA sparse, blob-less git clone that only pulls the instruments the battle band plays. Needs git.\n\"\"\"\nimport os\nimport subprocess\nimport sys\n\nPATHS = [\n    'Brass/Trumpet/sus/', 'Brass/Trumpet/stac/', 'Brass/F Horn/sus/', 'Brass/F Horn/stac/',\n    'Brass/Tenor Trombone/sus/', 'Brass/Tenor Trombone/stac/', 'Brass/Tuba/sus/', 'Brass/Tuba/stac/',\n    'Strings/Violin Section/Spic/', 'Strings/Violin Section/susVib/', 'Strings/Violin Section/Trem/',\n    'Strings/Viola Section/spic/', 'Strings/Viola Section/susvib/', 'Strings/Cello Section/spic/', 'Strings/Cello Section/susvib/',\n    'Strings/Solo Contrabass/Spic/', 'Strings/Solo Contrabass/SusVib/', 'Percussion/Timpani/',\n    'VSCO 1 Percussion/drums/snare/', 'VSCO 1 Percussion/drums/bass/', 'VSCO 1 Percussion/varMetal/Cymbals/', 'VSCO 1 Percussion/varMetal/Gong/',\n]\n\n\ndef main():\n    target = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('VSCO', os.path.expanduser('~/vsco'))\n    if os.path.isdir(os.path.join(target, 'Brass')):\n        print(f'samples already at {target}')\n        return\n    run = lambda *a, **k: subprocess.run(list(a), check=True, **k)\n    run('git', 'clone', '--depth', '1', '--filter=blob:none', '--no-checkout', 'https://github.com/sgossner/VSCO-2-CE.git', target)\n    run('git', 'sparse-checkout', 'init', '--no-cone', cwd=target)\n    run('git', 'sparse-checkout', 'set', '--no-cone', *[f'/{p}' for p in PATHS], cwd=target)\n    run('git', 'checkout', cwd=target)\n    print(f'samples at {target}; set VSCO={target} if that is not ~/vsco')\n\n\nif __name__ == '__main__':\n    main()\n", "requirements.txt": "numpy\nscipy\nsoundfile\npedalboard\n# optional: General MIDI tracks through a SoundFont (engine.Track)\n# tinysoundfont\n", "sampler.py": "\"\"\"Sample-based orchestra from VSCO 2 Community Edition (CC0): https://github.com/sgossner/VSCO-2-CE\n\nSampleTrack mirrors engine.Track (note / chord / cc / ramp / render), so pieces can swap\nGeneral MIDI instruments for recorded ones. Pitched samples are picked by nearest pitch,\nvelocity layer and round robin, then resampled to the target pitch. Unpitched percussion is\npicked by dynamic marking. CC 11 events become a gain envelope (expression swells).\n\nEach sample starts early by its own attack time (to reach 35% of its peak), so a brass stab lands its\nbody on the beat as a drum does, instead of swelling in 50 ms late.\n\"\"\"\nimport os\nimport re\nimport glob\nimport pickle\nimport numpy as np\nimport soundfile as sf\nfrom scipy.signal import resample_poly\nfrom engine import SR, n\n\nVSCO = os.environ.get('VSCO', os.path.expanduser('~/vsco'))\nCACHE = os.environ.get('FVS_CACHE', os.path.expanduser('~/.cache/fvs/vsco'))\n_NOTE = re.compile(r'(?:^|_)([A-G]#?)(-?\\d)(?=_)')\n_PC = dict(C=0, D=2, E=4, F=5, G=7, A=9, B=11)\nDYN = ['ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff']\n\n\ndef _load(path):\n    x, sr = sf.read(path, dtype='float32', always_2d=True)\n    if x.shape[1] == 1:\n        x = np.repeat(x, 2, 1)\n    x = x[:, :2]\n    if sr != SR:\n        x = resample_poly(x, SR, sr, axis=0).astype(np.float32)\n    # trim leading silence so notes land on the beat\n    a = np.abs(x).max(1)\n    i = int(np.argmax(a > a.max() * 0.03))\n    return x[max(0, i - int(0.003 * SR)):]\n\n\ndef _midi(fn):\n    m = _NOTE.search(os.path.basename(fn))\n    pc = _PC[m.group(1)[0]] + (1 if '#' in m.group(1) else 0)\n    return 12 * (int(m.group(2)) + 2) + pc  # VSCO names middle C as C3\n\n\ndef _num(pattern, fn, default=1):\n    m = re.search(pattern, os.path.basename(fn), re.I)\n    return int(m.group(1)) if m else default\n\n\ndef _attack(x, level=0.35, cap=0.09):\n    \"\"\"Seconds from the sample's start until its 5 ms envelope reaches `level` of the peak in its first 0.4 s.\"\"\"\n    a = np.abs(x[: int(0.4 * SR)]).max(1)\n    w = int(0.005 * SR)\n    env = np.convolve(a, np.ones(w) / w, mode='same')\n    return min(cap, int(np.argmax(env >= level * env.max())) / SR)\n\n\nclass Bank:\n    \"\"\"Samples of one instrument articulation: list of (midi, layer, rr, audio).\"\"\"\n\n    def __init__(self, key, samples, release):\n        self.key, self.samples, self.release = key, samples, release\n        self.attack = {id(s[3]): _attack(s[3]) for s in samples}\n        self.layers = sorted({s[1] for s in samples})\n        self.rr = {}\n        loud = [np.sqrt((s[3][: SR // 2] ** 2).mean()) for s in samples if s[1] == self.layers[-1]]\n        self.norm = 0.12 / (np.median(loud) + 1e-9)\n\n\n_banks = {}\n\n\ndef pitched(key, folder, release=0.25, pattern='*.wav'):\n    if key in _banks:\n        return _banks[key]\n    os.makedirs(CACHE, exist_ok=True)\n    cache = os.path.join(CACHE, key + '.pkl')\n    if os.path.exists(cache):\n        with open(cache, 'rb') as f:\n            samples = pickle.load(f)\n    else:\n        samples = []\n        for fn in sorted(glob.glob(os.path.join(VSCO, folder, pattern))):\n            samples.append((_midi(fn), _num(r'_v(\\d)', fn), _num(r'_rr(\\d)', fn), _load(fn)))\n        with open(cache, 'wb') as f:\n            pickle.dump(samples, f)\n    _banks[key] = Bank(key, samples, release)\n    return _banks[key]\n\n\ndef unpitched(key, files, release=0.1):\n    \"\"\"files: {dynamic_index: [paths]} \u2014 dynamic index acts as the velocity layer.\"\"\"\n    if key in _banks:\n        return _banks[key]\n    samples = []\n    for layer, paths in files.items():\n        for i, p in enumerate(paths):\n            samples.append((60, layer, i + 1, _load(os.path.join(VSCO, p))))\n    _banks[key] = Bank(key, samples, release)\n    return _banks[key]\n\n\ndef _render_note(bank, midi, vel, dur, pitched_=True):\n    if pitched_:\n        near = min(abs(s[0] - midi) for s in bank.samples)\n        cand = [s for s in bank.samples if abs(s[0] - midi) == near]\n    else:\n        cand = bank.samples\n    layers = sorted({s[1] for s in cand})\n    li = layers[min(len(layers) - 1, int(vel / 128 * len(layers)))]\n    cand = [s for s in cand if s[1] == li]\n    k = (cand[0][0], li)\n    i = bank.rr.get(k, 0)\n    bank.rr[k] = i + 1\n    s = cand[i % len(cand)]\n    x = s[3]\n    lead = bank.attack[id(x)]\n    if pitched_ and s[0] != midi:\n        ratio = 2 ** ((midi - s[0]) / 12)\n        lead /= ratio\n        idx = np.arange(0, len(x) - 1, ratio)\n        i0 = idx.astype(int)\n        fr = (idx - i0)[:, None].astype(np.float32)\n        x = x[i0] * (1 - fr) + x[i0 + 1] * fr\n    # velocity inside a layer still shapes loudness\n    g = bank.norm * (0.35 + 0.65 * (vel / 127) ** 1.5)\n    if dur is not None:\n        L = min(len(x), int((dur + bank.release) * SR))\n        x = x[:L].copy()\n        r = min(L, int(bank.release * SR))\n        cut = max(0, L - r)\n        x[cut:] *= np.linspace(1, 0, L - cut, dtype=np.float32)[:, None] ** 2\n    return x * g, lead\n\n\nclass SampleTrack:\n    \"\"\"Drop-in for engine.Track, backed by one or more VSCO banks (e.g. sustain + staccato).\"\"\"\n\n    def __init__(self, name, bank, gain=1.0, pan=0.0, fx=None, send=0.25, short=None, short_below=0.3, pitched_=True, natural=False):\n        self.name, self.bank, self.short, self.short_below = name, bank, short, short_below\n        self.gain, self.pan, self.fx, self.send = gain, pan, fx or [], send\n        self.pitched, self.natural = pitched_, natural\n        self.notes, self.ccs = [], []\n\n    def note(self, t, dur, key, vel=100):\n        self.notes.append((t, dur, n(key) if self.pitched else 60, int(max(1, min(127, vel)))))\n        return self\n\n    def chord(self, t, dur, keys, vel=100):\n        for k in (keys.split() if isinstance(keys, str) else keys):\n            self.note(t, dur, k, vel)\n        return self\n\n    def cc(self, t, num, val):\n        if num == 11:\n            self.ccs.append((t, val / 127))\n        return self\n\n    def ramp(self, t0, t1, num, v0, v1, steps=24):\n        for i in range(steps + 1):\n            self.cc(t0 + (t1 - t0) * i / steps, num, v0 + (v1 - v0) * i / steps)\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        for t, dur, midi, vel in sorted(self.notes):\n            bank = self.short if (self.short is not None and dur <= self.short_below) else self.bank\n            x, lead = _render_note(bank, midi, vel, None if (self.natural or bank is self.short) else dur, self.pitched)\n            i = int((t - lead) * SR)\n            if i >= total:\n                continue\n            if i < 0:\n                x, i = x[-i:], 0\n            j = min(total, i + len(x))\n            out[i:j] += x[: j - i]\n        if self.ccs:\n            # like a MIDI channel: full expression until the first CC, then each value holds until the next\n            ts, vs = zip(*sorted(self.ccs))\n            idx = np.searchsorted(np.array(ts), np.arange(total) / SR, side='right') - 1\n            out *= np.where(idx >= 0, np.array(vs, np.float32)[np.maximum(idx, 0)], 1.0).astype(np.float32)[:, None]\n        return out\n\n\n# \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 the orchestra \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ndef orchestra():\n    P = 'VSCO 1 Percussion'\n    snare = sorted(glob.glob(os.path.join(VSCO, P, 'drums/snare/drum1/snare1_*.wav')))\n    rel = lambda p: os.path.relpath(p, VSCO)\n    by = lambda files, tag: [rel(f) for f in files if re.search(rf'_{tag}(_|\\.|\\d)', os.path.basename(f))]\n    snare_layers = {i: by(snare, d) for i, d in enumerate(['mp', 'f', 'ff', 'fff']) if by(snare, d)}\n    bd = [f for f in sorted(glob.glob(os.path.join(VSCO, P, 'drums/bass/bdrum_*.wav'))) if not re.search('muted|roll|special', f)]\n    bd_layers = {i: by(bd, d) for i, d in enumerate(['mp', 'f', 'ff', 'fff']) if by(bd, d)}\n    cym = sorted(glob.glob(os.path.join(VSCO, P, 'varMetal/Cymbals/clash/crash_hit_*.wav')))\n    cym_layers = {0: [rel(f) for f in cym if '_ff_' in f], 1: [rel(f) for f in cym if '_fff' in f]}\n    gong = [rel(f) for f in sorted(glob.glob(os.path.join(VSCO, P, 'varMetal/Gong/gong_hit_ff*.wav')))]\n    o = dict(\n        tpt_sus=pitched('tpt-sus', 'Brass/Trumpet/sus', 0.2), tpt_stac=pitched('tpt-stac', 'Brass/Trumpet/stac', 0.1),\n        hn_sus=pitched('hn-sus', 'Brass/F Horn/sus', 0.25), hn_stac=pitched('hn-stac', 'Brass/F Horn/stac', 0.1),\n        tbn_sus=pitched('tbn-sus', 'Brass/Tenor Trombone/sus', 0.2), tbn_stac=pitched('tbn-stac', 'Brass/Tenor Trombone/stac', 0.1),\n        tuba_sus=pitched('tuba-sus', 'Brass/Tuba/sus', 0.2), tuba_stac=pitched('tuba-stac', 'Brass/Tuba/stac', 0.1),\n        vln_spic=pitched('vln-spic', 'Strings/Violin Section/Spic', 0.08), vln_sus=pitched('vln-sus', 'Strings/Violin Section/susVib', 0.3),\n        vln_trem=pitched('vln-trem', 'Strings/Violin Section/Trem', 0.3),\n        vla_spic=pitched('vla-spic', 'Strings/Viola Section/spic', 0.08), vla_sus=pitched('vla-sus', 'Strings/Viola Section/susvib', 0.3),\n        vc_spic=pitched('vc-spic', 'Strings/Cello Section/spic', 0.08), vc_sus=pitched('vc-sus', 'Strings/Cello Section/susvib', 0.3),\n        cb_spic=pitched('cb-spic', 'Strings/Solo Contrabass/Spic', 0.08), cb_sus=pitched('cb-sus', 'Strings/Solo Contrabass/SusVib', 0.3),\n        snare=unpitched('snare', snare_layers), bd=unpitched('bd', bd_layers, 0.3),\n        cym=unpitched('cym', cym_layers, 1.0), gong=unpitched('gong', {0: gong}, 2.0),\n        cymroll=unpitched('cymroll', {0: [f'{P}/varMetal/Cymbals/susp/susp_hit_softmall_roll2_cresc.wav']}, 0.5),\n        timp=timpani(),\n    )\n    for k in ('cymroll', 'gong'):  # swells: normalise by peak, not by the (quiet) first half-second\n        b = o[k]\n        b.norm = 0.35 / max(np.abs(x[3]).max() for x in b.samples)\n    return o\n\n\ndef _timp_pitch(x):\n    \"\"\"Strongest spectral peak of the hit's body in the timpani range.\"\"\"\n    seg = x[int(0.05 * SR): int(0.6 * SR)].mean(1)\n    sp = np.abs(np.fft.rfft(seg * np.hanning(len(seg))))\n    f = np.fft.rfftfreq(len(seg), 1 / SR)\n    m = (f > 70) & (f < 260)\n    return 69 + 12 * np.log2(f[m][np.argmax(sp[m])] / 440)\n\n\ndef timpani():\n    if 'timp' in _banks:\n        return _banks['timp']\n    samples = []\n    for d in range(1, 6):\n        files = sorted(glob.glob(os.path.join(VSCO, 'Percussion/Timpani', f'Timpani{d}_Hit_*.wav')))\n        if not files:\n            continue\n        loaded = [(_num(r'_v(\\d)', fn), _num(r'_rr(\\d)', fn), _load(fn)) for fn in files]\n        loud = max(loaded, key=lambda s: s[0])\n        midi = int(round(_timp_pitch(loud[2])))\n        samples += [(midi, v, rr, x) for v, rr, x in loaded]\n    _banks['timp'] = Bank('timp', samples, 0.4)\n    return _banks['timp']\n", "score_episode_212.py": "\"\"\"The score of \u7B2C 2.12 \u8BDD (examples/episode-2.12): \u51B3\u6218 II, a sampled battle march at 150 BPM, E minor \u2192 E major.\n\nA worked example of scoring against a Forsion Video Studio cue sheet. Every accent is placed on a time\nread from the project: H(scene) gives a scene's hits in seconds, SEC[scene] its start and end. Bars in\nB(bar, beat) are counted from the boot scene (the warning card before it is silent).\n\n    python3 score_episode_212.py path/to/episode-2.12.fvs.md [--out audio/episode-2.12-score.mp3]\n    node ../fvs.mjs sync path/to/episode-2.12.fvs.md        # then check the hits land on accents\n\"\"\"\nimport os\nimport sys\nfrom pedalboard import HighpassFilter\nimport battle\nfrom battle import band, groove, melody, hit, knock, pad, roll, final, THEME_A, THEME_B, CHORDS, master_chain, MIXFX, match_loudness\nfrom engine import Audio, mix, n, ns, boom, beep\nfrom cues import Cues, write_audio\n\nPROJECT = next((a for a in sys.argv[1:] if not a.startswith('--')), None)\nif not PROJECT:\n    sys.exit(__doc__)\nC = Cues.load(PROJECT)\nbattle.set_tempo(C.bpm)\nBEAT, BAR, LEN = C.beat, C.bar, C.length\nLEAD = round(C.t0('boot') / BAR)\nSEC = {s['id']: (s['t0'], s['t1']) for s in C.scenes}\n\n\ndef H(scene):\n    \"\"\"The picture's hit points in a scene, in seconds.\"\"\"\n    return C.hits(scene)\n\n\ndef B(bar, beat=0.0):\n    return C.at(bar + LEAD, beat)\n\n\ndef common_sfx():\n    \"\"\"Interface sounds: boot beeps, HUMAN.md update chirps, sub hits on the big reveals.\"\"\"\n    ui = Audio('ui', gain=0.3, send=0.15, fx=[HighpassFilter(300)])\n    for i in range(7):\n        ui.add(SEC['boot'][0] + 0.12 + i * 0.36, beep(1760 if i < 6 else 740, 0.05 if i < 6 else 0.18, shape='sine' if i < 6 else 'square'), 0.5 if i < 6 else 0.7)\n    for t in H('evolve')[1::2]:  # HUMAN.md UPDATED\n        ui.add(t, beep(2093, 0.06), 0.5)\n        ui.add(t + BEAT / 4, beep(2637, 0.06), 0.45)\n    sub = Audio('sub', gain=0.55, send=0.05)\n    for t in (SEC['question'][0], B(11, 2), SEC['finale'][0] + 2 * BAR, SEC['finale'][0] + 5 * BAR):\n        sub.add(t, boom(2.5, 100, 28, 0.35, 0.9, 1.8), 0.8)\n    return [ui, sub]\n\n\ndef score():\n    b = band()\n    # boot: a roll and a low pedal out of silence\n    roll(b, B(0), B(2) - 0.02, 12, 96, timp='E3')\n    b['tbn'].chord(B(0), 2 * BAR, 'E2 B2', 100).ramp(B(0), B(2), 11, 10, 110)\n    b['tuba'].note(B(0), 2 * BAR, 'E1', 100)\n    b['cb'].note(B(0), 2 * BAR, 'E1', 100)\n    b['trem'].chord(B(0), 2 * BAR, 'E4 B4', 90).ramp(B(0), B(2), 11, 15, 110)\n    # the seven intertitles, one stab each; the ticker gets a roll\n    cards = H('cards')\n    for i, c in enumerate(['Em', 'C', 'A', 'B', 'Em', 'C', 'D']):\n        hit(b, cards[i], c, vel=104 + i * 3, dur=0.3, cym=(i == 0))\n    roll(b, cards[7], SEC['cards'][1] - BEAT / 4, 60, 118, timp='E3')\n    # years: low and held, a timpani stroke under each line\n    b['vc'].chord(B(6), 2 * BAR, 'E2 B2', 84)\n    b['cb'].note(B(6), 2 * BAR, 'E1', 88)\n    b['hn'].chord(B(6), BAR, 'E3 G3 B3', 74).chord(B(7), BAR, 'E3 G3 C4', 78)\n    for k, t in enumerate(H('years')):\n        b['timp'].note(t, 0.3, 'E3', 100 if k == 0 else 86)\n    # half: the groove enters\n    groove(b, B(8), 'Em', vel=92, low_brass=False)\n    groove(b, B(9), 'Em', vel=98)\n    b['cym'].note(H('half')[0], 2, 60, 100)\n    # \u4EBA\u7C7B\uFF1F: F over E, gong, roll\n    hit(b, B(10), 'F', 124, 0.3, cym=True, gong=True)\n    b['cb'].note(B(10), 0.3, 'E1', 124)\n    roll(b, B(10) + 0.1, B(11) - 0.02, 50, 122, timp='E3')\n    b['cymroll'].note(B(10) + 0.05, 1, 60, 110)\n    # EPISODE card (gated to a tremolo), then the title hit and theme A\n    b['trem'].chord(B(11), 2 * BEAT, 'E5 B5', 100).ramp(B(11), B(11, 2), 11, 40, 127)\n    b['cymroll'].note(B(11) - 0.3, 1, 60, 118)\n    hit(b, B(11, 2), 'Em', 126, 0.4, cym=True, gong=True)\n    b['hn'].chord(B(11, 2), 2 * BEAT, 'E3 B3 E4', 116)\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 12 + i\n        groove(b, B(bar), c, vel=106)\n        melody(b, B(bar), notes, [('hn', 0), ('tbn', -12)], vel=114)\n        for p in (1.5, 3.5):\n            b['tpt'].chord(B(bar, p), 0.12, [k + 12 for k in ns(CHORDS[c][2])[1:]], 102)\n        if i in (0, 4):\n            b['cym'].note(B(bar), 2, 60, 116)\n    # two sides, HUMAN.md: a stab on each card; the lines inside land on the groove's low hits\n    knock(b, H('twosides')[0], 'C', 116, cym=True)\n    knock(b, H('humanmd')[0], 'A', 118, cym=True)\n    # the five questions: a stab per card (3 + 3 + 3 + 3 + 4 eighths across Em | F)\n    for t in H('asks'):\n        knock(b, t, 'Em' if t < B(17) else 'F', 116, cym=(t == H('asks')[0]))\n    # MEMORY, then HUMAN.md\n    b['cym'].note(H('memory')[0], 2, 60, 104)\n    hit(b, H('memory')[1], 'Em', 120, 0.3, cym=True)\n    # MAGI round 1: bright C, the panels approve one by one, the owner lands\n    mg = H('magi')\n    groove(b, B(20), 'C', vel=108)\n    b['cym'].note(mg[0], 2, 60, 116)\n    for i in range(3):\n        b['tpt'].chord(mg[1] + i * BEAT / 4, 0.08, 'E5 G5', 116)\n    knock(b, mg[2], 'C', 112)\n    # round 2: the clash, the handover, alarm trumpets on the dominant\n    hit(b, mg[3], 'F', 122, 0.3, cym=True)\n    b['cb'].note(mg[3], 0.3, 'E1', 122)\n    groove(b, B(21), 'B', vel=112, low_brass=False)\n    for i in range(3):\n        b['tpt'].chord(mg[4] + i * BEAT / 4, 0.08, 'F5 B5', 120)\n    knock(b, mg[5], 'B', 120)\n    groove(b, B(22), 'B', vel=114)\n    for i in range(8):\n        b['tpt'].chord(B(22, i * 0.5), 0.12, 'B4 D#5', 108 + i * 2)\n    roll(b, B(22, 2), B(23) - BEAT / 4, 60, 124)\n    # two layers: theme B; each layer's caption gets a stroke\n    for i, (c, notes) in enumerate(THEME_B):\n        bar = 23 + i\n        groove(b, B(bar), c, vel=110)\n        melody(b, B(bar), notes, [('tpt', 0)], vel=120)\n        b['hn'].chord(B(bar), BAR * 0.97, CHORDS[c][2], 100)\n        b['vln'].chord(B(bar), BAR * 0.97, [k + 12 for k in ns(CHORDS[c][2])[1:3]], 96)\n        if i in (0, 2):\n            b['cym'].note(B(bar), 2, 60, 120)\n    lh = H('layers')\n    for t, c in ((lh[6], 'D'), (lh[12], 'B')):\n        b['timp'].note(t, 0.4, n(CHORDS[c][0]) + 24, 116)\n        b['bd'].note(t, 0.3, 60, 116)\n        b['cym'].note(t, 1.5, 60, 96)\n    # collaboration evolves: theme A returns, lighter; a crash on the first quote\n    for i in range(3):\n        c, notes = THEME_A[i]\n        groove(b, B(27 + i), c, vel=100, low_brass=i > 0)\n        melody(b, B(27 + i), notes, [('hn', 0), ('vln', 12)], vel=110)\n    for t in H('evolve')[0::2]:  # a crash on each quote\n        b['cym'].note(t, 2, 60, 106)\n    for t in H('evolve')[1::2]:\n        b['timp'].note(t, 0.3, 'B3', 96)\n    # control: one hit per intertitle, then the banner on the dominant\n    ct = H('control')\n    for k, c in enumerate(['Em', 'C', 'D', 'B']):\n        hit(b, ct[k], c, 110 + k * 4, 0.25, cym=(k == 0))\n    pad(b, ct[4], BAR, 'B', 112)\n    b['cym'].note(ct[4], 2, 60, 118)\n    b['hn'].ramp(ct[4], B(32), 11, 60, 127)\n    roll(b, ct[4] + BEAT, B(32) - BEAT / 4, 50, 118, timp='B2')\n    # interface: breakdown under the two cards, then build into the montage from the field\n    it = H('interface')\n    groove(b, B(32), 'Em', vel=88, strings=False, low_brass=False)\n    groove(b, B(33), 'Em', vel=92, low_brass=False)\n    hit(b, it[0], 'Em', 118, 0.3)\n    for t in it[:2]:\n        b['timp'].note(t, 0.5, 'E3', 118)\n        b['bd'].note(t, 0.5, 60, 120)\n        b['cb'].note(t, 0.3, 'E1', 118)\n    hit(b, it[2], 'Em', 116, 0.3, cym=True)\n    b['tbn'].chord(B(34), BAR, 'E2 B2', 110).ramp(B(34), B(35), 11, 30, 127)\n    b['trem'].chord(B(34), BAR, 'E5 B5', 100).ramp(B(34), B(35), 11, 30, 127)\n    roll(b, B(34) + BEAT, B(35) - BEAT / 4, 30, 126, timp='E3')\n    b['cymroll'].note(B(34, 0.8), 1, 60, 124)\n    # montage: theme A tutti, a crash on every new screen\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 35 + i\n        groove(b, B(bar), c, vel=116)\n        melody(b, B(bar), notes, [('tpt', 0), ('hn', 0), ('tbn', -12), ('vln', 12)], vel=124)\n    mo = H('montage')\n    for k in (0, 3, 4, 5, 9, 10):\n        bar = round((mo[k] - B(35)) / BAR)\n        hit(b, mo[k], THEME_A[bar][0], 124, 0.2, cym=True)\n    # finale: a solo horn over low strings, a swell, HUMAN., \u266DVI \u2013 \u266DVII \u2013 I\n    b['vc'].chord(B(43), 2 * BAR, 'E2 B2', 64)\n    b['cb'].note(B(43), 2 * BAR, 'E1', 66)\n    b['hn'].note(B(43), 2 * BEAT, 'E4', 86).note(B(43, 2), 2 * BEAT, 'B4', 86)\n    b['timp'].note(B(44), 0.5, 'E3', 70)\n    b['hn'].chord(B(44), BAR, 'E3 G3 C4', 80).ramp(B(44), B(45), 11, 40, 120)\n    b['vln'].chord(B(44), BAR, 'E4 G4 C5', 64)\n    roll(b, B(44, 2), B(45) - BEAT / 4, 30, 112, timp='E3')\n    hit(b, B(45), 'Em', 127, 0.5, cym=True, gong=True)\n    pad(b, B(46), BAR, 'C', 104)\n    b['cym'].note(B(46), 2, 60, 104)\n    pad(b, B(47), BAR, 'D', 108)\n    b['cym'].note(B(47), 2, 60, 108)\n    b['hn'].ramp(B(47), B(48), 11, 70, 127)\n    roll(b, B(47, 2), B(48) - BEAT / 4, 50, 124, timp='D3')\n    final(b, B(48), 'E', hold=5.8)\n    # release: a quiet E major while the logo draws, a lift when it fills, then the credit\n    rl = H('release')\n    b['hn'].chord(rl[0], 2 * BAR, 'E3 G#3 B3', 78)\n    b['vln'].chord(rl[0], 2 * BAR, 'G#4 B4 E5', 70)\n    b['cb'].note(rl[0], 2 * BAR, 'E1', 80)\n    b['timp'].note(rl[0], 0.5, 'E3', 70)\n    b['tpt'].chord(rl[1], BAR, 'G#4 B4 E5', 92)\n    b['timp'].note(rl[1], 0.5, 'E3', 96)\n    b['cym'].note(rl[1], 2, 60, 88)\n    cr = H('credit')[0]\n    b['hn'].chord(cr, 1.5 * BAR, 'E3 B3 E4', 70)\n    b['cb'].note(cr, 0.3, 'E1', 90)\n    b['timp'].note(cr, 0.5, 'E2', 84)\n    gates = [(B(11), B(11, 2), -60, {'violins-trem', 'cym-roll'}),\n             (B(43), B(45), -40, {'celli', 'basses', 'horns', 'violins', 'timpani', 'snare', 'ui', 'sub'})]\n    curve = [(0, -14), (B(2), -5), (B(6) - .05, -5), (B(6), -9), (B(8), -6), (B(10), -2), (B(12), -3), (B(20), -2), (B(23), -1.5),\n             (B(27), -4), (B(30), -2), (B(32) - .05, -1), (B(32), -3), (B(32) + .3, -9), (B(34), -4), (B(35), 0), (B(43) - .05, 0), (B(43), -12), (B(44), -10), (B(45) - .05, -6), (B(45), 0), (B(46), -3), (B(48), 0), (B(52), -6)]\n    # a sixteenth of breath before the hits that land inside running music, so they read as cuts\n    breaths = [(t - BEAT / 4, t, -8, ()) for t in H('asks') + ct[1:4] + it[:1] + [mo[k] for k in (3, 4, 5, 9, 10)]]\n    return mix(list(b.values()) + common_sfx(), LEN, master=master_chain(), fade_out=2.5, gates=gates,\n               master_gates=[(B(11) + 0.01, B(11, 2) - 0.2, -10, ()), (B(43) + 0.02, B(44) - 0.1, -7, ())] + breaths, curve=curve, **MIXFX)\n\n\nif __name__ == '__main__':\n    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(os.path.dirname(os.path.abspath(PROJECT)), 'audio', 'episode-2.12-score.mp3')\n    x = match_loudness(score())\n    print(f'{write_audio(x, out)} \xB7 {len(x) / 48000:.1f} s')\n", "score_template.py": "\"\"\"A first score for any Forsion Video Studio project with a tempo: the \u51B3\u6218 II march under the whole\ntimeline, a stab on every hit, a breath before hits that land inside running music, a final chord.\n\nCopy it next to the project and make it yours: pick chords per scene, drop the groove where the picture\ngoes quiet, give the big cuts hit(..., cym=True, gong=True) and the small ones knock(). Keep melodies original.\n\n    python3 score_template.py path/to/video.fvs.md [--out audio/score.mp3]\n    node ../fvs.mjs sync path/to/video.fvs.md\n\"\"\"\nimport math\nimport os\nimport sys\nimport battle\nfrom battle import band, groove, melody, hit, knock, roll, final, THEME_A, master_chain, MIXFX, match_loudness\nfrom engine import mix\nfrom cues import Cues, write_audio\n\nPROJECT = next((a for a in sys.argv[1:] if not a.startswith('--')), None)\nif not PROJECT:\n    sys.exit(__doc__)\nC = Cues.load(PROJECT)\nif not C.bpm:\n    sys.exit('this project has no tempo; add \"tempo\": { \"bpm\": 120 } to its settings')\nbattle.set_tempo(C.bpm)\nBEAT, BAR = C.beat, C.bar\n\n\ndef chord_at(t):\n    \"\"\"Theme A's harmony, one chord per bar, looping every eight bars.\"\"\"\n    return THEME_A[int(t // BAR) % len(THEME_A)][0]\n\n\ndef score():\n    b = band()\n    last = C.scenes[-1]\n    end = last['t0']  # the last scene holds the final chord\n    first = C.scenes[0]\n    # an opening roll into the first bar line after the first scene\n    roll(b, 0, min(first['t1'], 2 * BAR) - BEAT / 4, 20, 110, timp='E3')\n    bars = math.ceil(end / BAR)\n    for k in range(bars):\n        t = k * BAR\n        if t < first['t1']:\n            continue\n        chord, notes = THEME_A[k % len(THEME_A)]\n        groove(b, t, chord, vel=104)\n        if k % 16 >= 8:  # the melody in the second half of every sixteen bars\n            melody(b, t, notes, [('hn', 0), ('tbn', -12)], vel=112)\n    breaths = []\n    for s in C.scenes:\n        for i, t in enumerate(s['hitTimes']):\n            if t >= end:\n                continue\n            if i == 0:\n                hit(b, t, chord_at(t), vel=118, dur=0.25, cym=True)\n            else:\n                knock(b, t, chord_at(t), vel=112)\n            if t > first['t1'] and (t % BAR) > 1e-6:\n                breaths.append((t - BEAT / 4, t, -8, ()))\n    final(b, end, 'E', hold=max(1.0, min(5.0, last['t1'] - end - .3)))\n    return mix(list(b.values()), C.length, master=master_chain(), fade_out=min(2.0, (last['t1'] - end) / 2), master_gates=breaths, **MIXFX)\n\n\nif __name__ == '__main__':\n    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(os.path.dirname(os.path.abspath(PROJECT)), 'audio', 'score.mp3')\n    x = match_loudness(score())\n    print(f'{write_audio(x, out)} \xB7 {len(x) / 48000:.1f} s')\n" };

  // src/ui/ai.js
  var AGENT = "fvs-director";
  var TOOLS_VERSION = "0.10.1";
  var dirOf = (p) => p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
  async function ensureTools(ctx2) {
    const app2 = ctx2.app || {};
    const base = "".concat(app2.workFolder ? app2.workFolder() : "Forsion Video Studio", "/.fvs-tools");
    const stamp = "".concat(base, "/VERSION");
    let have = null;
    try {
      have = await app2.readFile(stamp);
    } catch {
      have = null;
    }
    if ((have || "").trim() !== TOOLS_VERSION) {
      await app2.writeFile("".concat(base, "/fvs.mjs"), cli_src_default);
      for (const [name, src] of Object.entries(music_src_default)) await app2.writeFile("".concat(base, "/music/").concat(name), src);
      await app2.writeFile(stamp, TOOLS_VERSION + "\n");
    }
    const abs = (p) => app2.hostPath ? app2.hostPath(p) : null;
    return { cli: "".concat(base, "/fvs.mjs"), music: "".concat(base, "/music"), cliAbs: abs("".concat(base, "/fvs.mjs")), musicAbs: abs("".concat(base, "/music")) };
  }
  var q = (s) => JSON.stringify(s);
  function contextBlock(ctx2, s, tools) {
    const app2 = ctx2.app || {};
    const abs = app2.hostPath ? app2.hostPath(s.path) : null;
    const sel = s.sel ? s.p.scenes.find((x) => x.id === s.sel) : null;
    const lines = [
      "You are working on a Forsion Video Studio project (a web-animation video written as a .fvs.md file).",
      "Project file: ".concat(abs ? q(abs) : q(s.path)).concat(abs ? " (vault path ".concat(q(s.path), ")") : " (vault-relative path)", "."),
      "The user has it open in the Video Studio editor, which reloads the file whenever it changes on disk. Edit the file in place; keep everything you do not need to change byte for byte.",
      'Load the skill "forsion-video-studio" first if you have not read it in this conversation: it defines the file format, the scene API and the workflow.'
    ];
    if (tools) {
      const cli = tools.cliAbs || tools.cli;
      lines.push("Command line: node ".concat(q(cli), ' <command> <project> (run "node ').concat(q(cli), ' help"). Start with "info" to see the scenes, times and hits; "check --runtime" after editing; "sheet" or "still" to look at frames.'));
      lines.push("Music toolkit (Python): ".concat(q(tools.musicAbs || tools.music), " (see its README.md)."));
    }
    if (sel) lines.push('The user has scene "'.concat(sel.id, '"').concat(sel.title ? " (".concat(sel.title, ")") : "", " selected (").concat(sel.t0.toFixed(2), "\u2013").concat(sel.t1.toFixed(2), " s)."));
    lines.push("Playhead: ".concat(s.time.toFixed(2), " s of ").concat(s.p.length.toFixed(2), " s."));
    return lines.join("\n");
  }
  var TASKS = {
    ask: (text) => "Task from the user (their words):\n".concat(text, "\n\nDo it in the project file. When you are done, run the check, look at a contact sheet of the scenes you changed, and tell the user in their language what changed."),
    score: () => 'Task: compose an original score for this video and add it to the project.\n1. Export the cue sheet (the "cues" command) and read the scenes, tempo and hits.\n2. Write a score script with the music toolkit that puts accents on the hits (stingers on the big cuts, breaths before hits that fall inside running music), render it to WAV/MP3 next to the project (for example audio/score.mp3) and add it to the project settings "audio" list.\n3. Run the "sync" command and fix hits that miss an accent.\nNever copy an existing melody. Tell the user what you made and how to change it.',
    render: (out) => "Task: render this project to MP4 at ".concat(q(out), ' with the "render" command (use --workers 3). If the browser driver or ffmpeg is missing, install or locate it (see the skill) and say what you did. When it is done, check a few frames of the MP4 and report the file path, length and size.'),
    sync: () => 'Task: check that the picture cuts land on the music. Run the "sync" command. For each hit that misses an accent, decide whether the hit or the music should move: nudge the hit to the accent when it is a picture-only cut, or suggest a score change. Edit the file, re-run the sync check, and report what you changed.',
    review: () => 'Task: review the cut. Make a contact sheet with the "sheet" command, look at it, read the project, and give the user a short list of concrete improvements (pacing, legibility, text, sync). Do not edit anything until the user agrees.'
  };
  async function handOff(ctx2, s, task, t2, options = {}) {
    let tools = null;
    try {
      tools = await ensureTools(ctx2);
    } catch {
      tools = null;
    }
    const prompt = "".concat(contextBlock(ctx2, s, tools), "\n\n").concat(task);
    const folder = dirOf(s.path) || void 0;
    if (ctx2.tangu && ctx2.tangu.startChat) {
      const r = await ctx2.tangu.startChat({ agent: AGENT, prompt, send: true, folder, ...ctx2.tangu.chatSelection ? { modelId: options.modelId, thinkingLevel: options.thinkingLevel } : {} });
      if (r && r.ok) {
        options.onStarted?.(r);
        notify(ctx2, t2("ai-started"));
        return true;
      }
      if (r && !r.ok) notify(ctx2, String(r.error || "failed"), "warn");
    }
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
    }
    notify(ctx2, t2("ai-no-host"));
    return false;
  }
  async function rewrite(ctx2, text, how, signal) {
    if (!(ctx2.tangu && ctx2.tangu.complete)) return null;
    const r = await ctx2.tangu.complete({
      prompt: "Rewrite this on-screen text for a video: ".concat(how, ". It is shown large on screen, so keep it short. Reply with the new text only, no quotes, no explanation."),
      selection: text,
      signal
    });
    return r && typeof r.text === "string" ? r.text.trim().replace(/^["“「]|["”」]$/g, "") : null;
  }
  function notify(ctx2, msg, level = "info") {
    if (ctx2.notify) ctx2.notify(msg, { level });
    else if (ctx2.app && ctx2.app.notify) ctx2.app.notify(msg);
  }

  // src/ui/util.js
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === void 0 || v === null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) if (c !== null && c !== void 0 && c !== false) el.append(c instanceof Node ? c : String(c));
    return el;
  }
  var dirOf2 = (p) => p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
  function joinPath(dir, rel) {
    const out = [];
    for (const part of "".concat(dir, "/").concat(rel).split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") out.pop();
      else out.push(part);
    }
    return out.join("/");
  }
  var MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml", avif: "image/avif", mp3: "audio/mpeg", wav: "audio/wav", m4a: "audio/mp4", ogg: "audio/ogg", flac: "audio/flac", woff2: "font/woff2", woff: "font/woff", ttf: "font/ttf", otf: "font/otf", mp4: "video/mp4", webm: "video/webm" };
  var mimeOf = (p) => MIME[(p.split(".").pop() || "").toLowerCase()] || "application/octet-stream";
  function b64(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 32768));
    return btoa(s);
  }
  function randomId() {
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = [...bytes].map((n) => n.toString(16).padStart(2, "0")).join("");
    return "".concat(hex.slice(0, 8), "-").concat(hex.slice(8, 12), "-").concat(hex.slice(12, 16), "-").concat(hex.slice(16, 20), "-").concat(hex.slice(20));
  }

  // src/ui/exporter.js
  async function exportHtml(ctx2, p, path, assets) {
    const dir = dirOf2(path);
    const probe = compile(p);
    const refs = [...Object.keys(probe.assets), ...probe.audio.map((a) => a.src)];
    const inline = !!(ctx2.app && ctx2.app.readBytes);
    if (inline) await Promise.all(refs.map((rel) => assets.get(joinPath(dir, rel))));
    const resolve = (rel) => {
      const u = inline ? assets.cache.get(joinPath(dir, rel)) : null;
      return u && u.startsWith("data:") ? u : rel;
    };
    const html = buildHtml(compile(p, { resolve }), runtime_src_default, { mode: "player" });
    const out = path.replace(/\.fvs\.md$/i, "") + ".html";
    await ctx2.app.writeFile(out, html);
    return out;
  }

  // src/ui/thumbnails.js
  var MAX = 24;
  function sceneThumbnails(scrollRoot, htmlFor, state, { onMediaError } = {}) {
    const records = /* @__PURE__ */ new Map(), queue = /* @__PURE__ */ new Set();
    let disposed = false, active = 0, shared = "";
    const poster = (s) => s.t0 + Math.min(s.dur * 0.5, Math.max(0.8, s.dur * 0.3));
    const seek = (r, time) => r.frame?.contentWindow?.postMessage({ fvs: "seek", t: time }, "*");
    const stop = (r) => {
      queue.delete(r);
      if (r.frame) {
        r.frame.remove();
        r.frame = null;
        active--;
      }
      r.ready = false;
      delete r.el.dataset.rendered;
      r.gen++;
    };
    async function start(r) {
      if (disposed || r.frame || !state().trusted) return;
      const gen = ++r.gen;
      active++;
      let html = null;
      try {
        html = await htmlFor(r.scene);
      } catch {
        html = null;
      }
      if (disposed || gen !== r.gen || !html || !r.visible || !r.el.isConnected) {
        active--;
        pump();
        return;
      }
      r.frame = h("iframe", { sandbox: "allow-scripts", title: r.scene.title || r.scene.id, tabindex: "-1", "aria-hidden": "true" });
      r.frame.srcdoc = html;
      r.el.append(r.frame);
    }
    function pump() {
      for (const r of [...queue]) {
        if (active >= MAX) break;
        queue.delete(r);
        void start(r);
      }
    }
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const r = records.get(e.target.dataset.scene);
        if (!r) continue;
        r.visible = e.isIntersecting;
        if (r.visible) {
          if (!r.frame) queue.add(r);
        } else stop(r);
      }
      pump();
    }, { root: scrollRoot, rootMargin: "0px 160px" });
    const message = (e) => {
      const m = e.data || {};
      if (m.fvs !== "ready" && m.fvs !== "media-error") return;
      for (const r of records.values()) if (r.frame?.contentWindow === e.source) {
        if (m.fvs === "ready") {
          r.ready = true;
          r.el.dataset.rendered = "true";
          seek(r, poster(r.scene));
        } else if (m.src && onMediaError?.(m.src)) {
          stop(r);
          if (r.visible) queue.add(r);
          pump();
        }
        break;
      }
    };
    window.addEventListener("message", message);
    const sceneSig = (s) => JSON.stringify([s.html, s.css, s.js, s.meta, s.t0, s.dur, s.in || 0]);
    return {
      /** Re-render only what changed. `globals` is everything every scene shares (css, stage, settings). */
      sync(p, globals) {
        const wipe = globals !== shared;
        shared = globals;
        const ids = new Set(p.scenes.map((s) => s.id));
        for (const [id, r] of records) if (!ids.has(id)) {
          stop(r);
          observer.unobserve(r.el);
          records.delete(id);
        }
        for (const s of p.scenes) {
          const r = records.get(s.id);
          if (!r) continue;
          const sig = sceneSig(s);
          r.scene = s;
          if (wipe || sig !== r.sig) {
            r.sig = sig;
            stop(r);
            if (r.visible) queue.add(r);
          }
        }
        pump();
      },
      get(scene) {
        const old = records.get(scene.id);
        if (old) return old.el;
        const el = h("span", { class: "fvs-scene-thumb", "data-scene": scene.id, "aria-hidden": "true" });
        const r = { el, scene, sig: sceneSig(scene), gen: 0, frame: null, visible: false, ready: false };
        records.set(scene.id, r);
        observer.observe(el);
        return el;
      },
      refresh() {
        for (const r of records.values()) if (r.visible && !r.frame) queue.add(r);
        pump();
      },
      dispose() {
        disposed = true;
        observer.disconnect();
        window.removeEventListener("message", message);
        for (const r of records.values()) stop(r);
        records.clear();
      }
    };
  }

  // src/ui/export-panel.js
  var clock = (t2) => "".concat(Math.floor(t2 / 60), ":").concat((t2 % 60).toFixed(2).padStart(5, "0"));
  function exportController(ctx2, state, assets, t2, flush) {
    const app2 = ctx2.app, path = state().path, dir = dirOf2(path);
    const stem = path.split("/").pop().replace(/\.fvs\.md$/i, "");
    const index = joinPath(dir, ".fvs-jobs/".concat(stem, ".latest.json"));
    const listeners = /* @__PURE__ */ new Set();
    let job = null, disposed = false, reading = false, starting = false;
    const emit = () => listeners.forEach((fn) => fn());
    const active = () => job && !["done", "failed", "cancelled"].includes(job.status);
    async function refresh() {
      if (reading || disposed) return;
      reading = true;
      try {
        const latest = JSON.parse(await app2.readFile(index) || "null");
        if (latest?.record) {
          const next = JSON.parse(await app2.readFile(latest.record) || "null");
          if (next?.id === latest.id) job = { ...next, sessionId: latest.sessionId || next.sessionId };
        }
        if (job?.sessionId && job.status === "queued") {
          const status = ctx2.tangu?.agentStatus?.(job.sessionId);
          if (status?.phase === "error" || status?.phase === "done") {
            const fresh = JSON.parse(await app2.readFile(job.record) || "null");
            if (fresh?.status === "queued") {
              job = { ...job, status: "failed", error: t2("export-agent-ended") };
              await app2.writeFile(job.record, JSON.stringify(job));
            } else if (fresh) job = { ...fresh, sessionId: job.sessionId };
          }
        }
        emit();
      } catch {
      } finally {
        reading = false;
      }
    }
    const timer = setInterval(refresh, 1e3);
    void refresh();
    async function cancel() {
      if (!active()) return;
      await app2.writeFile(job.record + ".cancel", "cancel\n");
      if (job.status === "queued") {
        job = { ...job, status: "cancelled" };
        await app2.writeFile(job.record, JSON.stringify(job));
      }
      emit();
    }
    async function start(options) {
      if (starting || active()) return;
      starting = true;
      try {
        if (!await flush()) throw new Error(t2("export-save-first"));
        const s = state();
        if (!s.trusted || s.p.errors.some((e) => e.level === "error")) throw new Error(t2("export-invalid"));
        if (!app2.hostPath?.(path)) throw new Error(t2("export-host-only"));
        const from = Math.max(0, Number(options.from)), to = Math.min(s.p.length, Number(options.to));
        if (!Number.isFinite(from) || !Number.isFinite(to) || Number(options.from) < -1e-3 || Number(options.to) > s.p.length + 1e-3 || to <= from) throw new Error(t2("export-range-invalid"));
        options = { ...options, from, to };
        const id = randomId(), record = joinPath(dir, ".fvs-jobs/".concat(id, ".json"));
        const out = joinPath(dir, "".concat(stem, "-").concat(Date.now(), ".mp4"));
        const snapshot = joinPath(dir, ".fvs-jobs/".concat(id, ".source.txt"));
        await app2.writeFile(snapshot, s.text);
        const tools = await ensureTools(ctx2);
        job = { v: 1, id, status: "queued", progress: 0, record, outPath: out, project: app2.hostPath(path), sourceSnapshot: app2.hostPath(snapshot), out: app2.hostPath(out), options, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        await app2.writeFile(record, JSON.stringify(job, null, 2));
        await app2.writeFile(index, JSON.stringify({ id, record }));
        emit();
        const quote = (value) => "'" + String(value).replaceAll("'", "'\\''") + "'";
        const command = "node ".concat(quote(tools.cliAbs || tools.cli), " render-job ").concat(quote(app2.hostPath(record)));
        const task = "Task: execute this Video Studio export job.\nRun this exact command in the project directory:\n".concat(command, '\nThe CLI performs environment checks and writes real status/progress to the job JSON. It honours the adjacent .cancel file. Do not edit the project or job options. If dependencies are missing, locate or install the browser driver/ffmpeg, then rerun the command only if the job is still active (otherwise create a fresh retry from the UI). If you cannot run it, write status="failed" and a short error into ').concat(JSON.stringify(app2.hostPath(record)), ", preserving other fields. After success, verify the MP4 duration and a few frames and report its path. Never claim success unless the job JSON status is done.");
        const ok = await handOff(ctx2, s, task, t2, { onStarted(r) {
          job.sessionId = r.sessionId;
        } });
        if (!ok) {
          job.status = "failed";
          job.error = t2("ai-no-host");
        }
        await app2.writeFile(index, JSON.stringify({ id, record, sessionId: job.sessionId }));
        if (!ok) await app2.writeFile(record, JSON.stringify(job, null, 2));
        await refresh();
        emit();
      } finally {
        starting = false;
      }
    }
    function mount(body) {
      const s = state();
      const root = h("section", { class: "fvs-extension fvs-export-panel" }, h("style", { text: CSS2 }));
      const field = (key, control) => h("div", { class: "fvs-field" }, h("span", { text: t2(key) }), control);
      function segmented(key, hook, options, value) {
        const group = h("div", { class: "fvs-segmented", role: "radiogroup", "aria-label": t2(key), "data-export": hook });
        group.value = String(value);
        const paint = () => {
          for (const b of group.children) b.setAttribute("aria-checked", String(b.dataset.value === group.value));
        };
        for (const [v, label] of options) group.append(h("button", { type: "button", role: "radio", "data-value": String(v), onclick: () => {
          group.value = String(v);
          paint();
          edited = true;
          render();
        } }, label));
        group.set = (v) => {
          group.value = String(v);
          paint();
        };
        paint();
        return group;
      }
      const W = +s.p.meta.width, H = +s.p.meta.height, even = (x) => Math.floor(x / 2) * 2;
      const scale = segmented("export-size", "scale", [[1, "".concat(W, " \xD7 ").concat(H)], [0.5, "".concat(even(W / 2), " \xD7 ").concat(even(H / 2))], [0.25, "".concat(even(W / 4), " \xD7 ").concat(even(H / 4))]], 1);
      const fps = h("select", { class: "fvs-input", "data-export": "fps" }, ...[s.p.meta.fps, ...[24, 30, 60].filter((v) => v !== s.p.meta.fps)].map((v) => h("option", { value: v, text: "".concat(v, " fps") })));
      const quality = segmented("export-quality", "crf", [[18, t2("export-quality-high")], [23, t2("export-quality-balanced")], [28, t2("export-quality-small")]], 18);
      const range = segmented("export-range", "range", [["all", t2("export-range-all")], ["scene", t2("export-range-scene")], ["custom", t2("export-range-custom")]], "all");
      const from = h("input", { class: "fvs-input", "data-export": "from", type: "number", min: 0, max: s.p.length, step: 0.01, value: 0, "aria-label": t2("export-from") });
      const to = h("input", { class: "fvs-input", "data-export": "to", type: "number", min: 0, max: s.p.length, step: 0.01, value: +s.p.length.toFixed(3), "aria-label": t2("export-to") });
      const custom = h("div", { class: "fvs-row" }, field("export-from", from), field("export-to", to));
      const audio = h("input", { type: "checkbox", checked: true, "data-export": "audio" });
      const captions = h("input", { type: "checkbox", checked: true, "data-export": "captions" });
      const captionsRow = h("label", { class: "fvs-check" }, captions, t2("export-captions"));
      const summary = h("div", { class: "fvs-summary" }, h("span"), h("span"));
      const status = h("div", { class: "fvs-export-status", role: "status", "aria-live": "polite", hidden: true });
      const message = h("p", { class: "fvs-hint", role: "alert" });
      const applyRange = () => {
        const sc = state().p.scenes.find((x) => x.id === state().sel);
        if (range.value === "all") {
          from.value = 0;
          to.value = +state().p.length.toFixed(3);
        }
        if (range.value === "scene" && sc) {
          from.value = +sc.t0.toFixed(3);
          to.value = +sc.t1.toFixed(3);
        }
      };
      const go = h("button", { type: "button", class: "fvs-btn primary", "data-export": "start", onclick: async () => {
        go.disabled = true;
        message.textContent = "";
        try {
          applyRange();
          await start({ scale: +scale.value, fps: +fps.value, crf: +quality.value, from: +from.value, to: +to.value, workers: 3, "no-audio": !audio.checked, ...captions.checked ? {} : { "no-captions": true } });
        } catch (e) {
          message.textContent = String(e.message || e);
        } finally {
          if (!disposed) go.disabled = !!active();
        }
      } }, t2("export-start"));
      let hydrated = false, edited = false;
      const render = () => {
        if (job?.options && !hydrated) {
          if (!edited) {
            const o = job.options;
            scale.set(o.scale);
            fps.value = o.fps;
            quality.set(o.crf);
            from.value = +Number(o.from).toFixed(3);
            to.value = +Number(o.to).toFixed(3);
            audio.checked = !o["no-audio"];
            captions.checked = !o["no-captions"];
            range.set(Math.abs(o.from) < 1e-3 && Math.abs(o.to - state().p.length) < 1e-3 ? "all" : "custom");
          }
          hydrated = true;
        }
        const sc = state().p.scenes.find((x) => x.id === state().sel);
        range.querySelector('[data-value="scene"]').disabled = !sc;
        if (range.value === "scene" && !sc) range.set("all");
        applyRange();
        custom.hidden = range.value !== "custom";
        captionsRow.hidden = !(state().p.captions || []).length;
        const k = +scale.value;
        summary.children[0].textContent = "".concat(even(W * k), " \xD7 ").concat(even(H * k), " \xB7 ").concat(fps.value, " fps");
        summary.children[1].textContent = "".concat(clock(Math.max(0, +to.value - +from.value)));
        go.disabled = !!active();
        status.replaceChildren();
        status.hidden = !job;
        if (!job) return;
        status.append(
          h("strong", { text: t2("export-status-".concat(job.status)) }),
          h("progress", { max: 100, value: job.progress || 0, "aria-label": t2("export-progress") }),
          h("small", { text: "".concat(job.progress || 0, "%").concat(job.completedFrames ? " \xB7 ".concat(job.completedFrames, "/").concat(job.totalFrames) : "") })
        );
        if (job.error) status.append(h("p", { class: "fvs-hint", text: job.error }));
        const actions = h("div", { class: "fvs-row" });
        if (active()) actions.append(h("button", { type: "button", class: "fvs-btn", "data-export": "cancel", onclick: cancel }, t2("export-cancel")));
        if (job.status === "failed" || job.status === "cancelled") actions.append(h("button", { type: "button", class: "fvs-btn", "data-export": "retry", onclick: async () => {
          try {
            await start(job.options);
          } catch (e) {
            message.textContent = String(e.message || e);
          }
        } }, t2("export-retry")));
        if (job.status === "done") {
          status.append(h("small", { text: "".concat(job.outPath.split("/").pop(), " \xB7 ").concat((job.bytes / 1048576).toFixed(1), " MB"), title: job.outPath }));
          actions.append(h("button", { type: "button", class: "fvs-btn", onclick: () => app2.openFile(job.outPath) }, t2("export-preview")));
        }
        if (actions.children.length) status.append(actions);
      };
      const web = h("button", { type: "button", class: "fvs-btn", onclick: async () => {
        message.textContent = "";
        try {
          if (!await flush()) throw new Error(t2("export-save-first"));
          const out = await exportHtml(ctx2, state().p, path, assets);
          ctx2.notify?.(t2("exported", { path: out }));
        } catch (e) {
          message.textContent = String(e.message || e);
        }
      } }, t2("export-html"));
      root.append(h(
        "div",
        { class: "fvs-panel-shell" },
        h(
          "div",
          { class: "fvs-panel-scroll" },
          h("p", { class: "fvs-hint", text: t2("export-intro") }),
          field("export-size", scale),
          field("project-fps", fps),
          field("export-quality", quality),
          field("export-range", range),
          custom,
          h("label", { class: "fvs-check" }, audio, t2("export-audio")),
          captionsRow,
          summary,
          status,
          message
        ),
        h("div", { class: "fvs-form-actions", "data-hook": "form-actions" }, go, web)
      ));
      for (const control of [fps, from, to, audio, captions]) control.addEventListener("input", () => {
        edited = true;
        render();
      });
      listeners.add(render);
      body.append(root);
      render();
      return () => {
        listeners.delete(render);
        root.remove();
      };
    }
    return { mount, refresh, dispose() {
      disposed = true;
      clearInterval(timer);
      listeners.clear();
    } };
  }

  // node_modules/lucide/dist/esm/defaultAttributes.mjs
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/lucide/dist/esm/createElement.mjs
  var createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children?.length) {
      children.forEach((child) => {
        const childElement = createSVGElement(child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement = (iconNode, customAttrs = {}) => {
    const tag = "svg";
    const attrs = {
      ...defaultAttributes,
      ...customAttrs
    };
    return createSVGElement([tag, attrs, iconNode]);
  };

  // node_modules/lucide/dist/esm/icons/app-window.mjs
  var AppWindow = [
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
    ["path", { d: "M10 4v4" }],
    ["path", { d: "M2 8h20" }],
    ["path", { d: "M6 4v4" }]
  ];

  // node_modules/lucide/dist/esm/icons/arrow-down.mjs
  var ArrowDown = [
    ["path", { d: "M12 5v14" }],
    ["path", { d: "m19 12-7 7-7-7" }]
  ];

  // node_modules/lucide/dist/esm/icons/arrow-left.mjs
  var ArrowLeft = [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }]
  ];

  // node_modules/lucide/dist/esm/icons/arrow-right.mjs
  var ArrowRight = [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "m12 5 7 7-7 7" }]
  ];

  // node_modules/lucide/dist/esm/icons/arrow-up.mjs
  var ArrowUp = [
    ["path", { d: "m5 12 7-7 7 7" }],
    ["path", { d: "M12 19V5" }]
  ];

  // node_modules/lucide/dist/esm/icons/captions.mjs
  var Captions = [
    ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2" }],
    ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4" }]
  ];

  // node_modules/lucide/dist/esm/icons/check.mjs
  var Check = [["path", { d: "M20 6 9 17l-5-5" }]];

  // node_modules/lucide/dist/esm/icons/chevron-down.mjs
  var ChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];

  // node_modules/lucide/dist/esm/icons/chevron-right.mjs
  var ChevronRight = [["path", { d: "m9 18 6-6-6-6" }]];

  // node_modules/lucide/dist/esm/icons/chevron-left.mjs
  var ChevronLeft = [["path", { d: "m15 18-6-6 6-6" }]];

  // node_modules/lucide/dist/esm/icons/clapperboard.mjs
  var Clapperboard = [
    ["path", { d: "m12.296 3.464 3.02 3.956" }],
    ["path", { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" }],
    ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
    ["path", { d: "m6.18 5.276 3.1 3.899" }]
  ];

  // node_modules/lucide/dist/esm/icons/copy.mjs
  var Copy = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ];

  // node_modules/lucide/dist/esm/icons/download.mjs
  var Download = [
    ["path", { d: "M12 15V3" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { d: "m7 10 5 5 5-5" }]
  ];

  // node_modules/lucide/dist/esm/icons/ellipsis.mjs
  var Ellipsis = [
    ["circle", { cx: "12", cy: "12", r: "1" }],
    ["circle", { cx: "19", cy: "12", r: "1" }],
    ["circle", { cx: "5", cy: "12", r: "1" }]
  ];

  // node_modules/lucide/dist/esm/icons/eye.mjs
  var Eye = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ];

  // node_modules/lucide/dist/esm/icons/file-play.mjs
  var FilePlay = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
    [
      "path",
      {
        d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"
      }
    ]
  ];

  // node_modules/lucide/dist/esm/icons/film.mjs
  var Film = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 3v18" }],
    ["path", { d: "M3 7.5h4" }],
    ["path", { d: "M3 12h18" }],
    ["path", { d: "M3 16.5h4" }],
    ["path", { d: "M17 3v18" }],
    ["path", { d: "M17 7.5h4" }],
    ["path", { d: "M17 16.5h4" }]
  ];

  // node_modules/lucide/dist/esm/icons/folder-open.mjs
  var FolderOpen = [
    [
      "path",
      {
        d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      }
    ]
  ];

  // node_modules/lucide/dist/esm/icons/globe.mjs
  var Globe = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }]
  ];

  // node_modules/lucide/dist/esm/icons/image.mjs
  var Image = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
  ];

  // node_modules/lucide/dist/esm/icons/keyboard.mjs
  var Keyboard = [
    ["path", { d: "M10 8h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M14 8h.01" }],
    ["path", { d: "M16 12h.01" }],
    ["path", { d: "M18 8h.01" }],
    ["path", { d: "M6 8h.01" }],
    ["path", { d: "M7 16h10" }],
    ["path", { d: "M8 12h.01" }],
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }]
  ];

  // node_modules/lucide/dist/esm/icons/layers.mjs
  var Layers = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
      }
    ],
    ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }],
    ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }]
  ];

  // node_modules/lucide/dist/esm/icons/layout-grid.mjs
  var LayoutGrid = [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }]
  ];

  // node_modules/lucide/dist/esm/icons/list-filter.mjs
  var ListFilter = [
    ["path", { d: "M2 5h20" }],
    ["path", { d: "M6 12h12" }],
    ["path", { d: "M9 19h6" }]
  ];

  // node_modules/lucide/dist/esm/icons/maximize-2.mjs
  var Maximize2 = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "m21 3-7 7" }],
    ["path", { d: "m3 21 7-7" }],
    ["path", { d: "M9 21H3v-6" }]
  ];

  // node_modules/lucide/dist/esm/icons/message-square-quote.mjs
  var MessageSquareQuote = [
    ["path", { d: "M14 14a2 2 0 0 0 2-2V8h-2" }],
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
      }
    ],
    ["path", { d: "M8 14a2 2 0 0 0 2-2V8H8" }]
  ];

  // node_modules/lucide/dist/esm/icons/minimize-2.mjs
  var Minimize2 = [
    ["path", { d: "m14 10 7-7" }],
    ["path", { d: "M20 10h-6V4" }],
    ["path", { d: "m3 21 7-7" }],
    ["path", { d: "M4 14h6v6" }]
  ];

  // node_modules/lucide/dist/esm/icons/minus.mjs
  var Minus = [["path", { d: "M5 12h14" }]];

  // node_modules/lucide/dist/esm/icons/mouse-pointer-click.mjs
  var MousePointerClick = [
    ["path", { d: "M14 4.1 12 6" }],
    ["path", { d: "m5.1 8-2.9-.8" }],
    ["path", { d: "m6 12-1.9 2" }],
    ["path", { d: "M7.2 2.2 8 5.1" }],
    [
      "path",
      {
        d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
      }
    ]
  ];

  // node_modules/lucide/dist/esm/icons/music-2.mjs
  var Music2 = [
    ["circle", { cx: "8", cy: "18", r: "4" }],
    ["path", { d: "M12 18V2l7 4" }]
  ];

  // node_modules/lucide/dist/esm/icons/panel-bottom.mjs
  var PanelBottom = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 15h18" }]
  ];

  // node_modules/lucide/dist/esm/icons/panel-left.mjs
  var PanelLeft = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }]
  ];

  // node_modules/lucide/dist/esm/icons/panel-right.mjs
  var PanelRight = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M15 3v18" }]
  ];

  // node_modules/lucide/dist/esm/icons/pause.mjs
  var Pause = [
    ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1" }],
    ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1" }]
  ];

  // node_modules/lucide/dist/esm/icons/pencil.mjs
  var Pencil = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { d: "m15 5 4 4" }]
  ];

  // node_modules/lucide/dist/esm/icons/picture-in-picture-2.mjs
  var PictureInPicture2 = [
    ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }],
    ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2" }]
  ];

  // node_modules/lucide/dist/esm/icons/play.mjs
  var Play = [
    [
      "path",
      { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }
    ]
  ];

  // node_modules/lucide/dist/esm/icons/plus.mjs
  var Plus = [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "M12 5v14" }]
  ];

  // node_modules/lucide/dist/esm/icons/redo-2.mjs
  var Redo2 = [
    ["path", { d: "m15 14 5-5-5-5" }],
    ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" }]
  ];

  // node_modules/lucide/dist/esm/icons/refresh-cw.mjs
  var RefreshCw = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
    ["path", { d: "M21 3v5h-5" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
    ["path", { d: "M8 16H3v5" }]
  ];

  // node_modules/lucide/dist/esm/icons/scissors.mjs
  var Scissors = [
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M8.12 8.12 12 12" }],
    ["path", { d: "M20 4 8.12 15.88" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["path", { d: "M14.8 14.8 20 20" }]
  ];

  // node_modules/lucide/dist/esm/icons/search.mjs
  var Search = [
    ["path", { d: "m21 21-4.34-4.34" }],
    ["circle", { cx: "11", cy: "11", r: "8" }]
  ];

  // node_modules/lucide/dist/esm/icons/shield-alert.mjs
  var ShieldAlert = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M12 8v4" }],
    ["path", { d: "M12 16h.01" }]
  ];

  // node_modules/lucide/dist/esm/icons/skip-back.mjs
  var SkipBack = [
    [
      "path",
      {
        d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
      }
    ],
    ["path", { d: "M3 20V4" }]
  ];

  // node_modules/lucide/dist/esm/icons/skip-forward.mjs
  var SkipForward = [
    ["path", { d: "M21 4v16" }],
    [
      "path",
      { d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" }
    ]
  ];

  // node_modules/lucide/dist/esm/icons/sliders-horizontal.mjs
  var SlidersHorizontal = [
    ["path", { d: "M10 5H3" }],
    ["path", { d: "M12 19H3" }],
    ["path", { d: "M14 3v4" }],
    ["path", { d: "M16 17v4" }],
    ["path", { d: "M21 12h-9" }],
    ["path", { d: "M21 19h-5" }],
    ["path", { d: "M21 5h-7" }],
    ["path", { d: "M8 10v4" }],
    ["path", { d: "M8 12H3" }]
  ];

  // node_modules/lucide/dist/esm/icons/sparkles.mjs
  var Sparkles = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
      }
    ],
    ["path", { d: "M20 2v4" }],
    ["path", { d: "M22 4h-4" }],
    ["circle", { cx: "4", cy: "20", r: "2" }]
  ];

  // node_modules/lucide/dist/esm/icons/terminal.mjs
  var Terminal = [
    ["path", { d: "M12 19h8" }],
    ["path", { d: "m4 17 6-6-6-6" }]
  ];

  // node_modules/lucide/dist/esm/icons/trash.mjs
  var Trash = [
    ["path", { d: "M10 11v6" }],
    ["path", { d: "M14 11v6" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];

  // node_modules/lucide/dist/esm/icons/undo-2.mjs
  var Undo2 = [
    ["path", { d: "M9 14 4 9l5-5" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" }]
  ];

  // node_modules/lucide/dist/esm/icons/upload.mjs
  var Upload = [
    ["path", { d: "M12 3v12" }],
    ["path", { d: "m17 8-5-5-5 5" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
  ];

  // node_modules/lucide/dist/esm/icons/volume-2.mjs
  var Volume2 = [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    ["path", { d: "M16 9a5 5 0 0 1 0 6" }],
    ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728" }]
  ];

  // node_modules/lucide/dist/esm/icons/volume-x.mjs
  var VolumeX = [
    [
      "path",
      {
        d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"
      }
    ],
    ["path", { d: "m16.5 14.5 5-5" }],
    ["path", { d: "m16.5 9.5 5 5" }]
  ];

  // node_modules/lucide/dist/esm/icons/x.mjs
  var X = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ];

  // node_modules/lucide/dist/esm/icons/zoom-in.mjs
  var ZoomIn = [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
    ["line", { x1: "11", x2: "11", y1: "8", y2: "14" }],
    ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
  ];

  // node_modules/lucide/dist/esm/icons/zoom-out.mjs
  var ZoomOut = [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
    ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
  ];

  // src/ui/icons.js
  var glyphs = {
    FileVideo: FilePlay,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Undo2,
    Redo2,
    PanelLeft,
    PanelRight,
    Maximize2,
    Minimize2,
    Music2,
    Sparkles,
    Download,
    ChevronDown,
    Plus,
    Minus,
    Search,
    Volume2,
    VolumeX,
    Scissors,
    Copy,
    Trash2: Trash,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Check,
    SlidersHorizontal,
    Film,
    ChevronLeft,
    ChevronRight,
    X,
    MoreHorizontal: Ellipsis,
    Upload,
    Keyboard,
    Globe,
    Terminal,
    Clapperboard,
    PictureInPicture2,
    AppWindow,
    Eye,
    ShieldAlert,
    MousePointerClick,
    Captions,
    ZoomIn,
    ZoomOut,
    PanelBottom,
    LayoutGrid,
    RefreshCw,
    Image,
    ListFilter,
    FolderOpen,
    Pencil,
    Layers,
    MessageSquareQuote
  };
  var icon = (name) => createElement(glyphs[name], {
    width: 16,
    height: 16,
    "stroke-width": 1.7,
    "aria-hidden": "true",
    focusable: "false"
  });

  // src/ui/director-panel.js
  var clock2 = (t2) => "".concat(Math.floor(t2 / 60), ":").concat((t2 % 60).toFixed(2).padStart(5, "0"));
  function sceneChanges(before, after) {
    const a = parseProject(before), b = parseProject(after), changes = [];
    const left = new Map(a.scenes.map((s) => [s.id, s])), right = new Map(b.scenes.map((s) => [s.id, s]));
    const source = (s) => s ? JSON.stringify([s.title, s.meta, s.html, s.css, s.js]) : "";
    for (const id of /* @__PURE__ */ new Set([...left.keys(), ...right.keys()])) {
      const x = left.get(id), y = right.get(id);
      if (source(x) !== source(y)) changes.push({ id, title: y?.title || x?.title || id, kind: !x ? "added" : !y ? "removed" : "changed", before: source(x), after: source(y) });
    }
    const project = (p) => JSON.stringify({ meta: p.meta, order: p.scenes.map((s) => s.id), css: cssBlocks(p), html: stageHtml(p), js: stageJs(p) }, null, 2);
    if (project(a) !== project(b)) changes.push({ id: "project", title: "", kind: "changed", before: project(a), after: project(b) });
    if (before !== after && !changes.length) changes.push({ id: "source", title: "", kind: "changed", before, after });
    return changes;
  }
  function directorController(ctx2, state, t2, flush) {
    const app2 = ctx2.app, path = state().path;
    const base = joinPath(dirOf2(path), ".fvs-history/".concat(path.split("/").pop().replace(/\.fvs\.md$/i, "")));
    const record = base + ".director.json";
    let task = null, before = "", after = "", disposed = false, reading = false, submitting = false;
    let draft = { text: "", thinkingLevel: "medium" };
    let follow = null;
    const listeners = /* @__PURE__ */ new Set(), emit = () => listeners.forEach((fn) => fn());
    async function refresh() {
      if (reading || disposed) return;
      reading = true;
      try {
        const data = JSON.parse(await app2.readFile(record) || "null");
        if (data) {
          task = data;
          before = await app2.readFile(task.beforePath) || "";
          after = await app2.readFile(path) || "";
          task.phase = task.sessionId ? ctx2.tangu?.agentStatus?.(task.sessionId)?.phase || "idle" : "waiting";
          task.changes = sceneChanges(before, after);
          emit();
        }
      } catch {
      } finally {
        reading = false;
      }
    }
    const timer = setInterval(refresh, 1e3);
    void refresh();
    async function submit(selection, specific) {
      if (submitting || !selection.text.trim()) return false;
      submitting = true;
      try {
        if (!await flush()) throw new Error(t2("export-save-first"));
        const snapshot = state().text, id = randomId(), beforePath = base + ".".concat(id, ".before.txt");
        await app2.writeFile(beforePath, snapshot);
        const next = { id, beforePath, phase: "waiting", scene: state().sel, time: state().time, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        const ok = await handOff(ctx2, state(), specific || TASKS.ask(selection.text.trim()), t2, { ...selection, onStarted(r) {
          next.sessionId = r.sessionId;
        } });
        if (!ok) return false;
        await app2.writeFile(record, JSON.stringify(next));
        task = next;
        before = snapshot;
        draft.text = "";
        follow?.("");
        follow = null;
        emit();
        return true;
      } catch (e) {
        ctx2.notify?.(String(e.message || e), { level: "warning" });
        return false;
      } finally {
        submitting = false;
      }
    }
    function mount(body) {
      const root = h("section", { class: "fvs-extension fvs-director-panel" }, h("style", { text: CSS2 }));
      const phase = h("div", { class: "fvs-phase", role: "status", "aria-live": "polite" });
      const changes = h("div", { class: "fvs-director-changes" });
      const input = h("div", { class: "fvs-native-chatbox" });
      const context = h("div", { class: "fvs-chip-row", "aria-label": t2("director-context") });
      let shown = "";
      const paintContext = () => {
        const s = state(), scene = s.p.scenes.find((x) => x.id === s.sel);
        const key = "".concat(scene ? "".concat(scene.index, "|").concat(scene.title || scene.id) : "", "|").concat(clock2(s.time));
        if (key === shown) return;
        shown = key;
        context.replaceChildren(
          scene ? h("span", { class: "fvs-chip", title: t2("director-context") }, icon("Film"), "".concat(String(scene.index + 1).padStart(2, "0"), " \xB7 ").concat(scene.title || scene.id)) : "",
          h("span", { class: "fvs-chip", title: t2("director-context") }, icon("Play"), clock2(s.time))
        );
      };
      paintContext();
      const contextTimer = setInterval(paintContext, 400);
      let chat, textarea;
      const render = () => {
        phase.dataset.phase = task ? task.phase : "none";
        phase.textContent = task ? t2("director-".concat(task.phase)) : t2("director-intro");
        changes.replaceChildren();
        if (!task?.changes?.length) return;
        changes.append(h("h4", { text: t2("director-changes", { n: task.changes.length }) }));
        for (const row of task.changes) changes.append(h(
          "details",
          {},
          h("summary", { text: "".concat(row.title || row.id, " \xB7 ").concat(t2("director-" + row.kind)) }),
          h("div", { class: "fvs-change-columns" }, h("pre", { text: row.before.slice(0, 8e3) || "\u2014" }), h("pre", { text: row.after.slice(0, 8e3) || "\u2014" }))
        ));
        const reviewed = after;
        changes.append(h("button", { type: "button", class: "fvs-btn", "data-director": "restore", disabled: !["idle", "done", "error"].includes(task.phase), onclick: async () => {
          try {
            if (!await flush() || await app2.readFile(path) !== reviewed) throw new Error(t2("director-stale"));
            const snapshot = await app2.readFile(task.beforePath);
            if (snapshot === null) throw new Error(t2("director-no-snapshot"));
            await app2.writeFile(base + ".".concat(randomId(), ".reverted.txt"), reviewed);
            await app2.writeFile(path, snapshot);
            await refresh();
          } catch (e) {
            ctx2.notify?.(String(e.message || e), { level: "warning" });
          }
        } }, icon("Undo2"), t2("director-restore")));
      };
      const chips = [["ai-chip-scene"], ["ai-chip-pace"], ["ai-chip-copy"], ["ai-chip-score", TASKS.score], ["ai-chip-sync", TASKS.sync], ["ai-chip-review", TASKS.review]];
      const choose = (key, taskFn) => {
        if (taskFn) void submit({ ...draft, text: t2(key) }, taskFn());
        else {
          draft.text = t2(key) + (t2.en() ? ": " : "\uFF1A");
          follow?.(draft.text);
          if (chat) {
            chat.update({ value: draft.text });
            chat.focus();
          } else {
            textarea.value = draft.text;
            textarea.focus();
          }
        }
      };
      root.append(h(
        "div",
        { class: "fvs-panel-shell" },
        h(
          "div",
          { class: "fvs-panel-scroll" },
          context,
          phase,
          h("div", { class: "fvs-section" }, h("h4", { text: t2("director-quick") }), h("div", { class: "fvs-chip-row" }, ...chips.map(([key, fn]) => h("button", { type: "button", class: "fvs-chip", onclick: () => choose(key, fn) }, t2(key))))),
          changes
        ),
        h("div", { class: "fvs-form-actions fvs-director-input" }, input)
      ));
      body.append(root);
      if (ctx2.ui?.mountChatBox && ctx2.tangu?.chatSelection) {
        chat = ctx2.ui.mountChatBox(input, { ...draft, value: draft.text, agentSlug: AGENT, placeholder: t2("ai-placeholder"), label: t2("ai-title"), submitLabel: t2("ai-send"), submitOn: "modifier-enter", onChange(value) {
          draft = { ...value };
          follow?.(draft.text);
        }, onSubmit: (selection) => submit(selection) });
        chat.focus();
      } else {
        textarea = h("textarea", { class: "fvs-input", "aria-label": t2("ai-title"), placeholder: t2("ai-placeholder") });
        textarea.value = draft.text;
        textarea.oninput = () => {
          draft.text = textarea.value;
          follow?.(draft.text);
        };
        const send = async () => {
          if (await submit({ ...draft, text: textarea.value })) textarea.value = "";
        };
        textarea.onkeydown = (e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            void send();
          }
        };
        input.append(textarea, h("div", { class: "fvs-row fvs-send-row" }, h("small", { class: "fvs-hint", text: t2("ai-send-hint") }), h("button", { type: "button", class: "fvs-btn primary", onclick: send }, t2("ai-send"))));
        textarea.focus();
      }
      listeners.add(render);
      render();
      void refresh();
      return () => {
        clearInterval(contextTimer);
        listeners.delete(render);
        chat?.dispose();
        root.remove();
      };
    }
    const seed = (text, onDraft) => {
      draft = { ...draft, text: String(text) };
      follow = onDraft || null;
    };
    return { mount, seed, dispose() {
      disposed = true;
      clearInterval(timer);
      listeners.clear();
    } };
  }

  // src/ui/menu.js
  var current = null;
  function closeLayer() {
    if (current) {
      const c = current;
      current = null;
      c.close(false);
    }
  }
  function place(layer, anchor, align, at) {
    const r = at ? { left: at.x, right: at.x, top: at.y, bottom: at.y } : anchor.getBoundingClientRect(), z = layer.currentCSSZoom || 1;
    const w = layer.offsetWidth * z, ht = layer.offsetHeight * z, vw = window.innerWidth, vh = window.innerHeight;
    let x = align === "end" ? r.right - w : r.left;
    x = Math.max(8, Math.min(x, vw - w - 8));
    let y = r.bottom + 6;
    if (y + ht > vh - 8 && r.top - 6 - ht > 8) y = r.top - 6 - ht;
    y = Math.max(8, Math.min(y, vh - ht - 8));
    layer.style.left = "".concat(x / z, "px");
    layer.style.top = "".concat(y / z, "px");
  }
  function mountLayer(anchor, layer, { align = "start", at = null, onClose } = {}) {
    closeLayer();
    layer.classList.add("fvs-layer");
    document.body.append(layer);
    place(layer, anchor, align, at);
    anchor.setAttribute("aria-expanded", "true");
    const outside = (e) => {
      if (!layer.contains(e.target) && !anchor.contains(e.target)) closeLayer();
    };
    const scroll = (e) => {
      if (!layer.contains(e.target) && (!anchor.isConnected || e.target.contains?.(anchor))) closeLayer();
    };
    const key = (e) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      if (current?.layer === layer) {
        current = null;
        close(true);
      }
    };
    function close(refocus) {
      document.removeEventListener("pointerdown", outside, true);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", closeLayer);
      layer.removeEventListener("keydown", key);
      anchor.setAttribute("aria-expanded", "false");
      layer.remove();
      if (refocus && anchor.isConnected) anchor.focus();
      onClose?.();
    }
    setTimeout(() => {
      if (current?.layer === layer) document.addEventListener("pointerdown", outside, true);
    });
    window.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", closeLayer);
    layer.addEventListener("keydown", key);
    layer.addEventListener("focusout", (e) => {
      if (e.relatedTarget && !layer.contains(e.relatedTarget) && current?.layer === layer) {
        current = null;
        close(false);
      }
    });
    current = { layer, close };
    return { layer, close: () => {
      if (current?.layer === layer) {
        current = null;
        close(true);
      }
    } };
  }
  function openMenu(anchor, items, { label = "", align = "start", at = null } = {}) {
    const menu = h("div", { class: "fvs-menu", role: "menu", "aria-label": label });
    const buttons = [];
    for (const it of items) {
      if (!it) continue;
      if (it === "-") {
        menu.append(h("div", { class: "fvs-menu-sep", role: "separator" }));
        continue;
      }
      if (it.heading) {
        menu.append(h("div", { class: "fvs-menu-heading", text: it.heading }));
        continue;
      }
      const checkable = it.checked !== void 0;
      const b = h(
        "button",
        {
          type: "button",
          role: checkable ? "menuitemradio" : "menuitem",
          "aria-checked": checkable ? String(!!it.checked) : null,
          class: it.danger ? "danger" : null,
          disabled: !!it.disabled,
          tabindex: "-1",
          onclick: () => {
            handle.close();
            it.run();
          }
        },
        h("span", { class: "fvs-menu-icon" }, it.icon ? icon(it.icon) : null),
        h("span", { class: "fvs-menu-text" }, h("span", { text: it.label }), it.hint ? h("small", { text: it.hint }) : null),
        h("span", { class: "fvs-menu-end" }, it.checked ? icon("Check") : it.kbd ? h("kbd", { text: it.kbd }) : null)
      );
      buttons.push(b);
      menu.append(b);
    }
    menu.addEventListener("keydown", (e) => {
      const live = buttons.filter((b) => !b.disabled);
      const i = live.indexOf(document.activeElement);
      let next = null;
      if (e.key === "ArrowDown") next = live[(i + 1) % live.length];
      else if (e.key === "ArrowUp") next = live[(i - 1 + live.length) % live.length];
      else if (e.key === "Home") next = live[0];
      else if (e.key === "End") next = live[live.length - 1];
      else if (e.key === "Tab") {
        e.preventDefault();
        return;
      }
      if (next) {
        e.preventDefault();
        next.focus();
      }
    });
    const handle = mountLayer(anchor, menu, { align, at });
    buttons.find((b) => !b.disabled)?.focus();
    return handle;
  }
  function openPopover(anchor, content, { label = "", align = "start", className = "", onClose } = {}) {
    const pop = h("div", { class: "fvs-popover ".concat(className).trim(), role: "dialog", "aria-label": label, tabindex: "-1" }, content);
    const handle = mountLayer(anchor, pop, { align, onClose });
    (pop.querySelector('[autofocus], button, input, select, textarea, [tabindex="0"]') || pop).focus?.();
    return handle;
  }

  // src/ui/studio.js
  var fmtTime = (t2) => "".concat(Math.floor(t2 / 60), ":").concat((t2 % 60).toFixed(2).padStart(5, "0"));
  var typing = (e) => {
    const x = e.target;
    return x && (x.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(x.tagName));
  };
  var STREAM = /\.(mp4|m4v|webm|mov|ogv)$/i;
  var BIN_MIME = "application/x-fvs-media";
  var KIND = (name) => /\.(mp4|m4v|webm|mov)$/i.test(name) ? "video" : /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(name) ? "image" : /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(name) ? "audio" : /\.(srt|vtt)$/i.test(name) ? "captions" : null;
  var MOD = /Mac|iPhone|iPad/.test(globalThis.navigator?.userAgent || "") ? "\u2318" : "Ctrl+";
  var RULER_H = 24;
  var CAPTION_H = 32;
  var VIDEO_H = 64;
  var ELEM_H = 46;
  var AUDIO_H = 44;
  var ELEM_ROWS = 3;
  var ELEM_ROW_H = 14;
  async function trustList(ctx2) {
    try {
      const d = await ctx2.loadData?.() || {};
      return Array.isArray(d.trusted) ? d.trusted : [];
    } catch {
      return [];
    }
  }
  async function trust(ctx2, path) {
    let d = {};
    try {
      d = await ctx2.loadData?.() || {};
    } catch {
      d = {};
    }
    const list2 = new Set(Array.isArray(d.trusted) ? d.trusted : []);
    list2.add(path);
    try {
      await ctx2.saveData?.({ ...d, trusted: [...list2].slice(-500) });
    } catch {
    }
  }
  function assetLoader(ctx2) {
    const cache = /* @__PURE__ */ new Map(), inline = /* @__PURE__ */ new Set();
    const dataUrl = async (vp) => {
      if (!ctx2.app.readBytes) return null;
      const b = await ctx2.app.readBytes(vp);
      return b ? "data:".concat(mimeOf(vp), ";base64,").concat(b64(b instanceof Uint8Array ? b : new Uint8Array(b))) : null;
    };
    return {
      cache,
      async get(vp) {
        if (cache.has(vp)) return cache.get(vp);
        let url = null;
        if (STREAM.test(vp) && !inline.has(vp) && ctx2.app.assetUrl) {
          try {
            url = ctx2.app.assetUrl(vp);
          } catch {
            url = null;
          }
        }
        if (!url) {
          try {
            url = await dataUrl(vp);
          } catch {
            url = null;
          }
        }
        if (!url && ctx2.app.assetUrl) {
          try {
            url = ctx2.app.assetUrl(vp);
          } catch {
            url = null;
          }
        }
        cache.set(vp, url);
        return url;
      },
      fallback(vp) {
        if (inline.has(vp)) return false;
        inline.add(vp);
        cache.delete(vp);
        return true;
      }
    };
  }
  async function previewHtml(p, path, assets, mode = "embed") {
    const dir = dirOf2(path);
    const probe = compile(p);
    await Promise.all(Object.keys(probe.assets).map((rel) => assets.get(joinPath(dir, rel))));
    const payload = compile(p, { resolve: (rel) => assets.cache.get(joinPath(dir, rel)) || rel });
    payload.audio = [];
    if (payload.media) payload.media = [];
    return buildHtml(payload, runtime_src_default, { mode });
  }
  function soundSegments(p) {
    if (typeof audioSegments === "function") return audioSegments(p);
    return audioTracks(p.meta).map((a) => ({ ...a, kind: "track", in: 0, dur: null, mute: false }));
  }
  var visibleHits2 = (s) => typeof visibleHits === "function" ? visibleHits(s) : s.hitTimes.map((t2, index) => ({ index, t: t2 }));
  var OPEN = /* @__PURE__ */ new Map();
  var editorsOf = (path) => [...OPEN.get(path) || []];
  function mountStudio(ctx2, el, path, t2, opts = {}) {
    const app2 = ctx2.app;
    const nativeInspector = !!opts.view?.extendView && !opts.compact;
    let inspectorHandle = null, askHandle = null, exportHandle = null;
    let inspectorPref = true;
    let sideFolded = false;
    let sideSettling = 0;
    const sideShown = () => !sideSettling && (!sideFolded || !!opts.chat?.shown());
    const S = {
      path,
      text: "",
      saved: "",
      p: parseProject(""),
      time: 0,
      playing: false,
      sel: null,
      selText: null,
      selHit: null,
      selCap: null,
      selEl: null,
      tab: "scene",
      codeScope: "scene",
      allTexts: false,
      zoom: 0,
      snap: "half",
      undo: [],
      redo: [],
      trusted: false,
      gen: 0,
      runtimeErrors: [],
      counts: null,
      sync: null,
      audioKey: "",
      disposed: false,
      status: "saved",
      focus: false,
      inspectorOpen: false,
      muted: false,
      zoomFit: true,
      timelineHeight: 0,
      advancedOpen: false,
      lengthUnit: null
    };
    const assets = assetLoader(ctx2);
    const root = h("div", { class: "fvs-studio", tabindex: "-1" });
    root.classList.toggle("compact", !!opts.compact);
    root.append(h("style", { text: CSS2 }));
    el.append(root);
    const tool = (glyph, key, fn, { cls = "icon", kbd = "", label = true } = {}) => {
      const name = t2(key) + (kbd ? " (".concat(kbd, ")") : "");
      return h(
        "button",
        { type: "button", class: "fvs-btn ".concat(cls), title: name, "aria-label": t2(key), onclick: fn },
        icon(glyph),
        cls.includes("icon") || !label ? null : h("span", { text: t2(key) })
      );
    };
    const nameText = h("span", { class: "fvs-project-name" });
    const nameEl = opts.chooseProject ? h("button", { type: "button", class: "fvs-project", title: t2("choose-project"), "aria-haspopup": "dialog", onclick: () => opts.chooseProject() }, nameText, icon("ChevronDown")) : h("span", { class: "fvs-project", title: path }, nameText);
    const statusEl = h("span", { class: "fvs-status", role: "status" });
    const undoBtn = tool("Undo2", "undo", () => undo(), { kbd: "".concat(MOD, "Z") });
    const redoBtn = tool("Redo2", "redo", () => redo(), { kbd: "\u21E7".concat(MOD, "Z") });
    const aiBtn = tool("Sparkles", "ask-ai", () => openAsk(), { cls: "fvs-ai-action" });
    if (opts.chat) {
      aiBtn.setAttribute("aria-haspopup", "menu");
      aiBtn.append(icon("ChevronDown"));
    }
    const exportBtn = tool("Download", "export", (e) => openExportMenu(e.currentTarget), { cls: "primary fvs-export-action" });
    exportBtn.setAttribute("aria-haspopup", "menu");
    exportBtn.append(icon("ChevronDown"));
    const moreBtn = tool("MoreHorizontal", "more", (e) => openMoreMenu(e.currentTarget));
    moreBtn.setAttribute("aria-haspopup", "menu");
    root.append(h(
      "header",
      { class: "fvs-bar" },
      h("div", { class: "fvs-title-group" }, nameEl, statusEl),
      h("span", { class: "fvs-grow" }),
      h("div", { class: "fvs-bar-actions" }, h("div", { class: "fvs-history" }, undoBtn, redoBtn), aiBtn, exportBtn, moreBtn)
    ));
    const view = h("div", { class: "fvs-view" });
    const viewport = h("div", { class: "fvs-viewport" }, view);
    const sceneNow = h("span", { class: "fvs-current-scene" });
    const timeEl = h("span", { class: "fvs-time", "aria-live": "off" });
    const playBtn = h("button", { type: "button", class: "fvs-btn fvs-play", onclick: () => toggle() });
    const prevBtn = tool("SkipBack", "previous-scene", () => stepScene(-1), { kbd: "\u2191" });
    const nextBtn = tool("SkipForward", "next-scene", () => stepScene(1), { kbd: "\u2193" });
    const frameBack = tool("ChevronLeft", "frame-back", () => seek(S.time - 1 / fps()), { kbd: "\u2190" });
    const frameFwd = tool("ChevronRight", "frame-forward", () => seek(S.time + 1 / fps()), { kbd: "\u2192" });
    frameBack.classList.add("fvs-frame-step");
    frameFwd.classList.add("fvs-frame-step");
    const muteBtn = tool("Volume2", "mute", () => {
      S.muted = !S.muted;
      applyVolumes();
      renderTransport();
    });
    const focusBtn = tool("Maximize2", "focus-preview", () => setFocus(!S.focus));
    const inspectorToggle = tool(nativeInspector ? "SlidersHorizontal" : "PanelRight", "toggle-properties", () => toggleInspector());
    const preview = h(
      "section",
      { class: "fvs-preview", "aria-label": t2("preview") },
      viewport,
      h(
        "div",
        { class: "fvs-transport" },
        h("div", { class: "fvs-transport-info" }, sceneNow, timeEl),
        h("div", { class: "fvs-playback-actions" }, prevBtn, frameBack, playBtn, frameFwd, nextBtn),
        h("div", { class: "fvs-preview-options" }, muteBtn, focusBtn, inspectorToggle)
      )
    );
    const errBox = h("div", { class: "fvs-errs", hidden: true, role: "status" });
    const blank = h("div", { class: "fvs-blank", hidden: true }, h(
      "div",
      {},
      icon("Clapperboard"),
      h("h3", { text: t2("blank-title") }),
      h("p", { text: t2("blank-body") }),
      h(
        "div",
        { class: "fvs-blank-actions" },
        h("button", { type: "button", class: "fvs-btn", "data-blank": "scene", "aria-haspopup": "dialog", onclick: (e) => openTemplates(e.currentTarget) }, icon("Plus"), h("span", { text: t2("add-scene") })),
        h("button", { type: "button", class: "fvs-btn", "data-blank": "import", onclick: () => fileInput.click() }, icon("Upload"), h("span", { text: t2("import-media") })),
        h("button", { type: "button", class: "fvs-btn", "data-blank": "ai", onclick: () => opts.chat ? askFor("scene") : openAsk() }, icon("Sparkles"), h("span", { text: t2("ask-ai") }))
      )
    ));
    view.append(errBox, blank);
    const tabs = h("div", { class: "fvs-tabs", role: "tablist", "aria-label": t2("properties") });
    const panel = h("div", { class: "fvs-panel", role: "tabpanel" });
    for (const k of ["scene", "text", "captions", "code", "project"]) {
      tabs.append(h("button", { type: "button", role: "tab", "data-tab": k, "aria-selected": String(S.tab === k), onclick: () => {
        S.tab = k;
        renderSide();
      } }, t2("tab-".concat(k))));
    }
    tabs.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      e.stopPropagation();
      const buttons = [...tabs.children], i = buttons.indexOf(document.activeElement);
      const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].click();
      buttons[next].focus();
    });
    const sideClose = tool("X", "close", () => {
      S.inspectorOpen = false;
      layout();
    });
    sideClose.classList.add("fvs-side-close");
    const side = h("aside", { class: "fvs-side", "aria-label": t2("properties") }, h("div", { class: "fvs-side-top" }, tabs, sideClose), panel);
    root.append(h("div", { class: "fvs-main" }, preview, side));
    const snapSel = h(
      "select",
      { "aria-label": t2("snap"), onchange: (e) => {
        S.snap = e.target.value;
      } },
      ...["bar", "beat", "half", "quarter", "off"].map((k) => h("option", { value: k, selected: S.snap === k }, t2("snap-".concat(k))))
    );
    const ZOOM_STEPS = 1e3;
    const zoomInput = h("input", {
      type: "range",
      min: "0",
      max: String(ZOOM_STEPS),
      step: "1",
      "aria-label": t2("zoom-level"),
      oninput: (e) => {
        const [lo, hi] = zoomRange();
        setZoom(lo * Math.pow(hi / lo, +e.target.value / ZOOM_STEPS));
      }
    });
    const syncButton = h("button", { type: "button", class: "fvs-sync-chip", hidden: true, "aria-haspopup": "dialog", title: t2("sync"), onclick: (e) => openSync(e.currentTarget) }, h("i"), h("span", { class: "fvs-sync-sum" }));
    const splitBtn = tool("Scissors", "split", () => splitAtPlayhead(), { kbd: "S" });
    const dupBtn = tool("Copy", "duplicate", () => duplicateSelected(), { kbd: "".concat(MOD, "D") });
    const delBtn = tool("Trash2", "delete", () => deleteSelected(), { kbd: "\u232B" });
    const quoteBtn = opts.chat ? tool("MessageSquareQuote", "quote-to-chat", () => quoteSelection()) : null;
    const addBtn = tool("Plus", "add-scene", (e) => openTemplates(e.currentTarget), { cls: "fvs-tl-add" });
    addBtn.setAttribute("aria-haspopup", "dialog");
    const fileInput = h("input", { type: "file", multiple: true, accept: "image/*,video/*,audio/*,.srt,.vtt", hidden: true, onchange: (e) => {
      const files = [...e.target.files];
      e.target.value = "";
      void importFiles(files);
    } });
    const capBtn = tool("Captions", "captions-add", () => addCaption());
    const importBtn = tool("Upload", "import-media", () => fileInput.click(), { cls: "fvs-tl-import" });
    const keysBtn = tool("Keyboard", "shortcuts", (e) => openShortcuts(e.currentTarget));
    const durationEl = h("span", { class: "fvs-timeline-duration" });
    const tlBar = h(
      "div",
      { class: "fvs-tl-bar", role: "toolbar", "aria-label": t2("timeline") },
      h("div", { class: "fvs-tl-tools" }, splitBtn, dupBtn, delBtn, quoteBtn, h("span", { class: "fvs-tl-sep" }), addBtn, capBtn, importBtn, fileInput),
      syncButton,
      durationEl,
      h("span", { class: "fvs-grow" }),
      h("label", { class: "fvs-snap-control" }, h("span", { text: t2("snap") }), snapSel),
      h(
        "div",
        { class: "fvs-zoom-controls" },
        tool("ZoomOut", "zoom-out", () => zoomBy(1 / 1.5), { kbd: "-" }),
        zoomInput,
        tool("ZoomIn", "zoom-in", () => zoomBy(1.5), { kbd: "=" }),
        h("button", { type: "button", class: "fvs-btn ghost", title: "".concat(t2("zoom-fit-hint"), " (\u21E7Z)"), onclick: () => setZoom(0) }, t2("zoom-fit"))
      ),
      keysBtn
    );
    const scroller = h("div", { class: "fvs-tl-scroll" });
    const inner = h("div", { class: "fvs-tl-inner" });
    const ruler = h("canvas", { class: "fvs-tl-ruler" });
    const capLane = h("div", { class: "fvs-cap-lane" });
    const clips = h("div", { class: "fvs-tl-scenes" });
    const elLane = h("div", { class: "fvs-el-lane" });
    const lanes = h("div", { class: "fvs-tl-lanes" });
    const head = h("div", { class: "fvs-tl-head" });
    inner.append(ruler, capLane, clips, elLane, lanes, head);
    scroller.append(inner);
    const cz = () => inner.currentCSSZoom || 1;
    const timeAt = (e) => (e.clientX - inner.getBoundingClientRect().left) / cz() / (S.zoom || 20);
    const rulerLabel = h("span", { class: "fvs-rail-ruler" });
    const audioRail = h("div", { class: "fvs-rail-audio" });
    const railName = (cls, glyph, key, tab) => h("button", { type: "button", class: cls, title: t2("rail-hint", { tab: t2("tab-".concat(tab)) }), onclick: () => openTab(tab) }, icon(glyph), h("span", { text: t2(key) }));
    const trackRail = h(
      "div",
      { class: "fvs-track-rail" },
      rulerLabel,
      railName("fvs-rail-captions", "Captions", "captions-track", "captions"),
      railName("fvs-rail-video", "Film", "video-track", "scene"),
      railName("fvs-rail-lane", "Layers", "elements-track", "scene"),
      audioRail
    );
    const audioInput = h("input", { type: "file", accept: "audio/*", multiple: true, hidden: true, onchange: (e) => {
      const files = [...e.target.files];
      e.target.value = "";
      void importFiles(files);
    } });
    const resizeHandle = h("div", { class: "fvs-tl-resize", role: "separator", tabindex: "0", "aria-orientation": "horizontal", "aria-label": t2("resize-timeline"), "aria-valuemin": "150" });
    resizeHandle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const y = e.clientY, height = timelineHeight();
      listenDrag((ev) => resizeTimeline(height + (y - ev.clientY) / cz()), () => {
      });
    });
    resizeHandle.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      e.stopPropagation();
      resizeTimeline(timelineHeight() + (e.key === "ArrowUp" ? 20 : -20));
    });
    const tlBody = h("div", { class: "fvs-tl-body" }, trackRail, scroller, audioInput);
    const timeline = h("section", { class: "fvs-tl", "aria-label": t2("timeline") }, resizeHandle, tlBar, tlBody);
    const dockStrip = h(
      "div",
      { class: "fvs-dock-strip", hidden: true },
      icon("PanelBottom"),
      h("span", { text: t2("timeline-docked") }),
      h("button", { type: "button", class: "fvs-btn ghost", onclick: () => opts.showTimeline?.() }, t2("timeline-show"))
    );
    root.append(opts.dock ? dockStrip : timeline);
    tlBody.addEventListener("wheel", (e) => {
      if (!(e.ctrlKey || e.metaKey || e.altKey)) return;
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const x = Math.max(0, Math.min(scroller.clientWidth, (e.clientX - scroller.getBoundingClientRect().left) / cz()));
      zoomBy(Math.exp(-dy * (Math.abs(dy) < 30 ? 0.01 : 25e-4)), x);
    }, { passive: false });
    let rulerFrame = 0;
    scroller.addEventListener("scroll", () => {
      cancelAnimationFrame(rulerFrame);
      rulerFrame = requestAnimationFrame(drawRuler);
    });
    let current2 = null, pending = null, pendingTimer = 0, inline = null;
    const drags = /* @__PURE__ */ new Set();
    const fps = () => +S.p.meta.fps || 30;
    function listenDrag(move, end) {
      const clear = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        drags.delete(clear);
      };
      const up = (e) => {
        clear();
        if (!S.disposed) end(e);
      };
      drags.add(clear);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    }
    const lanesHeight = () => RULER_H + CAPTION_H + VIDEO_H + ELEM_H + AUDIO_H * Math.max(1, laneTracks().length) + 10;
    const timelineHeight = () => S.timelineHeight || lanesHeight();
    function resizeTimeline(height) {
      S.timelineHeight = Math.max(150, Math.min(Math.max(150, root.clientHeight * 0.6), height));
      applyTimelineHeight();
    }
    function applyTimelineHeight() {
      const hgt = timelineHeight();
      root.style.setProperty("--fv-timeline-height", "".concat(hgt, "px"));
      resizeHandle.setAttribute("aria-valuenow", String(Math.round(hgt)));
      fitPreview();
    }
    function setFocus(on) {
      S.focus = on;
      if (on) {
        inspectorHandle?.close();
        closeLayer();
      } else restoreInspector();
      layout();
    }
    function toggleInspector(force) {
      const open = force ?? !(nativeInspector ? inspectorHandle?.isOpen && side.isConnected : S.inspectorOpen);
      if (nativeInspector) {
        inspectorPref = open;
        if (open) openInspector();
        else inspectorHandle?.close();
        return;
      }
      S.inspectorOpen = open;
      if (open) S.focus = false;
      layout();
    }
    let reopenOnShow = false;
    let endRedirect = null;
    const SIDE_SETTLES_MS = 300;
    function dismissed(then) {
      if (!opts.chat?.shown()) {
        then?.();
        return true;
      }
      clearTimeout(sideSettling);
      sideSettling = setTimeout(() => {
        sideSettling = 0;
        if (S.disposed) return;
        if (opts.chat.shown()) then?.();
        else sideFolded = true;
      }, SIDE_SETTLES_MS);
      return false;
    }
    function taken() {
      sideFolded = true;
      clearTimeout(sideSettling);
      sideSettling = setTimeout(() => {
        sideSettling = 0;
      }, SIDE_SETTLES_MS);
    }
    const sideLost = () => {
      if (!inspectorHandle?.isOpen && !askHandle?.isOpen && !exportHandle?.isOpen) sideFolded = true;
    };
    function openInspector({ quiet = false, focusKey = null } = {}) {
      if (!nativeInspector || S.disposed) return;
      const had = !!inspectorHandle?.isOpen;
      if (had && side.isConnected) {
        const x = focusKey && panel.querySelector('[data-key="'.concat(CSS.escape(focusKey), '"]'));
        if (x) {
          x.focus();
          x.select?.();
        }
        return;
      }
      if (!had) S.focus = false;
      const before = document.activeElement;
      try {
        inspectorHandle = opts.view.extendView.open({
          id: "fvs-properties",
          title: t2("properties"),
          side: "right",
          mount(body) {
            const shell = h("div", { class: "fvs-extension fvs-native-properties" }, h("style", { text: CSS2 }), side);
            body.append(shell);
            return () => shell.remove();
          },
          onClose(reason) {
            inspectorHandle = null;
            if (reason === "layout") taken();
            else if (reason === "dismiss" && dismissed()) inspectorPref = false;
            if (reason === "owner") reopenOnShow = inspectorPref;
            if (!S.disposed) {
              root.querySelector(".fvs-main").append(side);
              layout();
            }
          }
        });
      } catch {
        reopenOnShow = inspectorPref;
        return;
      }
      sideFolded = false;
      clearTimeout(sideSettling);
      sideSettling = 0;
      if (quiet || focusKey) {
        endRedirect?.();
        const target = () => focusKey ? panel.querySelector('[data-key="'.concat(CSS.escape(focusKey), '"]')) : before && before !== document.body && before.isConnected ? before : root;
        let mine = false;
        const go = () => {
          const x = target();
          if (x && x !== document.activeElement) {
            mine = true;
            x.focus({ preventScroll: true });
            mine = false;
            if (focusKey) x.select?.();
          }
        };
        const off = () => {
          clearTimeout(timer);
          side.removeEventListener("focusin", back);
          side.removeEventListener("pointerdown", off);
          if (endRedirect === off) endRedirect = null;
        };
        const back = () => {
          if (mine) return;
          off();
          go();
        };
        const timer = setTimeout(off, 1500);
        side.addEventListener("focusin", back);
        side.addEventListener("pointerdown", off);
        endRedirect = off;
        if (had && focusKey) {
          let n = 30;
          const wait = () => {
            if (S.disposed || endRedirect !== off) return;
            if (side.isConnected) go();
            else if (n--) requestAnimationFrame(wait);
          };
          wait();
        }
      }
      if (!had) layout();
    }
    const wantsProperties = () => !S.disposed && nativeInspector && inspectorPref && !S.focus && !askHandle?.isOpen && !exportHandle?.isOpen && sideShown();
    function restoreInspector(wait = 0) {
      setTimeout(() => {
        if (wantsProperties() && !inspectorHandle?.isOpen) openInspector({ quiet: true });
      }, wait);
    }
    const showProperties = () => {
      if (wantsProperties()) openInspector({ quiet: true });
    };
    const sidePanelClosed = (reason) => {
      if (reason === "close") restoreInspector();
      else if (reason === "layout") taken();
      else if (reason === "dismiss") dismissed(restoreInspector);
      else if (reason === "owner") reopenOnShow = inspectorPref;
    };
    function layout() {
      const inspectorShown = nativeInspector ? !!inspectorHandle?.isOpen : S.inspectorOpen;
      root.classList.toggle("inspector-hidden", nativeInspector || !S.inspectorOpen || !!opts.compact);
      root.classList.toggle("focus-preview", S.focus);
      inspectorToggle.setAttribute("aria-pressed", String(inspectorShown && !S.focus));
      focusBtn.replaceChildren(icon(S.focus ? "Minimize2" : "Maximize2"));
      focusBtn.title = t2(S.focus ? "exit-focus" : "focus-preview");
      focusBtn.setAttribute("aria-label", focusBtn.title);
      focusBtn.setAttribute("aria-pressed", String(S.focus));
      requestAnimationFrame(() => {
        if (S.disposed) return;
        fitPreview();
        S.zoomFit ? setZoom(0) : renderTimeline();
      });
    }
    function fitPreview() {
      const style = getComputedStyle(viewport);
      const w = Math.max(1, viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
      const height = Math.max(1, viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom));
      const ratio = (+S.p.meta.width || 1920) / (+S.p.meta.height || 1080);
      const width = Math.min(w, height * ratio);
      view.style.width = "".concat(width, "px");
      view.style.height = "".concat(width / ratio, "px");
    }
    const selScene = () => S.sel ? sceneById(S.p, S.sel) : null;
    const sceneUnderPlayhead = () => S.p.scenes.find((s) => S.time >= s.t0 && S.time < s.t1) || S.p.scenes.at(-1) || null;
    function selectScene(id, { seekTo = true, reveal = true } = {}) {
      const s = sceneById(S.p, id);
      if (!s) return;
      S.sel = id;
      S.selHit = null;
      S.selText = null;
      S.selCap = null;
      S.selEl = null;
      if (seekTo) seek(s.t0);
      renderTimeline();
      renderSide();
      renderToolbar();
      if (reveal) {
        const x = s.t0 * S.zoom;
        if (x < scroller.scrollLeft || x + Math.min(s.dur * S.zoom, 140) > scroller.scrollLeft + scroller.clientWidth) scroller.scrollLeft = Math.max(0, x - 30);
      }
    }
    function stepScene(direction) {
      const cur = sceneUnderPlayhead();
      if (!cur) return;
      const next = S.p.scenes[Math.max(0, Math.min(S.p.scenes.length - 1, cur.index + direction))];
      selectScene(next.id);
    }
    async function load() {
      setStatus("loading");
      let text = null;
      try {
        text = await app2.readFile(path);
      } catch {
        text = null;
      }
      if (S.disposed) return;
      if (text === null) {
        const noVault = app2.vaultRoot && !app2.vaultRoot();
        view.append(h("div", { class: "fvs-gate" }, h("div", {}, h("p", { text: noVault ? t2("no-vault") : t2("cannot-read", { path }) }))));
        statusEl.textContent = "";
        return;
      }
      S.trusted = opts.trusted || (await trustList(ctx2)).includes(path);
      if (S.disposed) return;
      S.text = S.saved = text;
      setStatus("saved");
      reparse();
      if (!OPEN.has(path)) OPEN.set(path, /* @__PURE__ */ new Set());
      OPEN.get(path).add(editor);
      S.time = Math.min(S.p.length, S.p.scenes[1] ? S.p.scenes[1].t0 + 0.5 : 0);
      S.sel = sceneUnderPlayhead()?.id || null;
      if (!nativeInspector && !opts.compact && root.clientWidth >= 1100) S.inspectorOpen = true;
      applyTimelineHeight();
      layout();
      renderAll();
      if (nativeInspector && inspectorPref) openInspector({ quiet: true });
      requestAnimationFrame(() => setZoom(0));
      if (S.trusted) buildPreview();
      else showGate();
      loadAudio();
      watch();
    }
    function reparse() {
      const faces = (scene) => {
        const s = S.p && sceneById(S.p, scene);
        if (!s) return null;
        const tags = scan(s.html).tags;
        return { names: tags.map((k) => k.name).join(" "), all: timedOf(s).map((x) => ({ tag: x.tag, open: s.html.slice(tags[x.tag].start, tags[x.tag].end), text: x.text })) };
      };
      const el2 = S.selEl, before = el2 && faces(el2.scene), was = before && before.all.find((f) => f.tag === el2.tag);
      S.p = parseProject(S.text);
      if (S.sel && !sceneById(S.p, S.sel)) S.sel = S.p.scenes[0] ? S.p.scenes[0].id : null;
      if (S.selCap !== null && !S.p.captions[S.selCap]) S.selCap = null;
      if (el2) {
        const now2 = was && faces(el2.scene), same = now2 ? now2.all.filter((f) => f.open === was.open && f.text === was.text) : [], at = now2 && now2.all.find((f) => f.tag === el2.tag);
        S.selEl = same.length === 1 ? { scene: el2.scene, tag: same[0].tag } : at && now2.names === before.names && (at.open === was.open || at.text === was.text) ? el2 : null;
      }
    }
    let saveTimer = 0, saving = null, writes = Promise.resolve();
    function setStatus(k, vars) {
      S.status = k;
      statusEl.textContent = t2(k, vars);
      statusEl.dataset.state = k;
      statusEl.title = t2(k, vars);
    }
    function scheduleSave() {
      setStatus("unsaved");
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, 600);
    }
    function save() {
      clearTimeout(saveTimer);
      const job = writes.then(writeNow);
      writes = job.catch(() => {
      });
      saving = job;
      job.finally(() => {
        if (saving === job) saving = null;
      }).catch(() => {
      });
      return job;
    }
    async function writeNow() {
      if (S.released) return;
      if (S.text === S.saved) {
        if (S.status !== "loading" && !S.disposed) setStatus("saved");
        return;
      }
      const text = S.text;
      setStatus("saving");
      try {
        await app2.writeFile(path, text);
        S.saved = text;
        if (!S.disposed) setStatus(S.text === S.saved ? "saved" : "unsaved");
      } catch (e) {
        if (!S.disposed) setStatus("save-failed", { msg: e && e.message || e });
      }
    }
    function commitFocusedField() {
      const a = document.activeElement;
      if (a && a !== document.body && (root.contains(a) || side.contains(a) || timeline.contains(a)) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) a.blur();
    }
    const editor = {
      alive: () => !S.disposed,
      dirty: () => S.text !== S.saved,
      retitle(title) {
        tryCommit((src) => setProjectMeta(src, { title }));
        return save();
      },
      /** The file is going to the recycle bin: after its last save, this editor writes nothing more. */
      async release() {
        commitFocusedField();
        await save().catch(() => {
        });
        S.released = true;
      },
      /** It did not go after all: the editor writes again, starting with what it still holds. */
      resume() {
        S.released = false;
        if (S.text !== S.saved) void save();
      }
    };
    let unwatch = null, poll = 0, banner = null;
    function watch() {
      unwatch = app2.watchFile?.(path, () => external()) || null;
      poll = setInterval(external, 2e3);
    }
    async function external() {
      if (saving) {
        try {
          await saving;
        } catch {
        }
      }
      const saved = S.saved, held = S.text;
      let disk = null;
      try {
        disk = await app2.readFile(path);
      } catch {
        disk = null;
      }
      if (saving || S.saved !== saved || S.text !== held) return;
      if (S.disposed || disk === null || disk === S.saved || disk === S.text) {
        if (disk === S.text) S.saved = disk;
        return;
      }
      if (S.text === S.saved) {
        S.undo.push(S.text);
        S.redo = [];
        S.text = S.saved = disk;
        afterChange(false);
        notify(ctx2, t2("external"));
      } else showConflict(disk);
    }
    function showConflict(disk) {
      if (banner) banner.remove();
      banner = h(
        "div",
        { class: "fvs-banner", role: "alert" },
        h("span", { text: t2("conflict") }),
        h("button", { type: "button", class: "fvs-btn", onclick: () => {
          banner.remove();
          banner = null;
          S.undo.push(S.text);
          S.text = S.saved = disk;
          afterChange(false);
        } }, t2("conflict-load")),
        h("button", { type: "button", class: "fvs-btn primary", onclick: () => {
          banner.remove();
          banner = null;
          S.saved = disk;
          save();
        } }, t2("conflict-keep"))
      );
      root.append(banner);
    }
    function commit(next) {
      if (S.disposed || typeof next !== "string" || next === S.text) return;
      S.undo.push(S.text);
      if (S.undo.length > 200) S.undo.shift();
      S.redo = [];
      S.text = next;
      afterChange(true);
    }
    function tryCommit(fn) {
      try {
        commit(fn(S.text));
        return true;
      } catch (e) {
        notify(ctx2, String(e && e.message || e), "warn");
        return false;
      }
    }
    function afterChange(save_) {
      reparse();
      if (save_) scheduleSave();
      else setStatus(S.text === S.saved ? "saved" : "unsaved");
      renderAll();
      schedulePreview();
      const key = JSON.stringify(soundSegments(S.p));
      if (key !== S.audioKey) loadAudio();
      else computeSync();
    }
    function undo() {
      if (!S.undo.length) return;
      S.redo.push(S.text);
      S.text = S.undo.pop();
      afterChange(true);
    }
    function redo() {
      if (!S.redo.length) return;
      S.undo.push(S.text);
      S.text = S.redo.pop();
      afterChange(true);
    }
    function showGate() {
      view.querySelectorAll(".fvs-gate").forEach((x) => x.remove());
      view.append(h("div", { class: "fvs-gate" }, h(
        "div",
        {},
        icon("ShieldAlert"),
        h("h3", { text: t2("trust-title") }),
        h("p", { text: t2("trust-body") }),
        h("button", { type: "button", class: "fvs-btn primary", onclick: async () => {
          S.trusted = true;
          await trust(ctx2, path);
          view.querySelectorAll(".fvs-gate").forEach((x) => x.remove());
          renderTimeline();
          thumbs.refresh();
          buildPreview();
        } }, t2("trust-run"))
      )));
    }
    let previewTimer = 0;
    function schedulePreview() {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(buildPreview, 220);
    }
    async function buildPreview() {
      if (!S.trusted || S.disposed) return;
      const gen = ++S.gen;
      const html = await previewHtml(S.p, path, assets);
      if (gen !== S.gen || S.disposed) return;
      if (pending) pending.remove();
      pending = h("iframe", { sandbox: "allow-scripts", title: t2("app"), class: current2 ? "fvs-pending" : "" });
      pending.srcdoc = html;
      view.prepend(pending);
      clearTimeout(pendingTimer);
      pendingTimer = setTimeout(() => swap({ errors: [{ scene: "", message: "preview did not start (see the console)" }] }), 1e4);
    }
    function swap(m) {
      clearTimeout(pendingTimer);
      if (!pending) return;
      if (current2) current2.remove();
      current2 = pending;
      pending = null;
      current2.classList.remove("fvs-pending");
      S.runtimeErrors = (Array.isArray(m.errors) ? m.errors : []).slice(0, 50).filter((x) => x && typeof x === "object").map((x) => ({ scene: String(x.scene ?? ""), line: Number.isFinite(+x.line) ? +x.line : 0, message: String(x.message ?? "") }));
      const counts = (v) => v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).filter(([, n]) => Number.isInteger(n))) : null;
      S.counts = counts(m.texts) ? { texts: counts(m.texts), imgs: counts(m.imgs) || {} } : null;
      lastPosted = -1;
      post({ fvs: "seek", t: S.time });
      post({ fvs: "transport", playing: S.playing });
      renderErrors();
      if (S.tab === "project") renderSide();
    }
    let lastPosted = -1;
    const post = (m) => {
      if (current2 && current2.contentWindow) current2.contentWindow.postMessage(m, "*");
    };
    function onMessage(e) {
      const m = e.data || {};
      if (pending && e.source === pending.contentWindow && m.fvs === "ready") return swap(m);
      if (!current2 || e.source !== current2.contentWindow) return;
      if (m.fvs === "ready") {
        lastPosted = -1;
        post({ fvs: "seek", t: S.time });
        post({ fvs: "transport", playing: S.playing });
        return;
      }
      if (m.fvs === "pick") onPick(m);
      if (m.fvs === "media-error" && fallbackMedia(m.src)) schedulePreview();
    }
    window.addEventListener("message", onMessage);
    function renderErrors() {
      const errs = S.runtimeErrors;
      errBox.hidden = !errs.length;
      errBox.textContent = errs.length ? "".concat(t2("errors-runtime"), "\n").concat(errs.map((x) => "".concat(x.scene ? "[".concat(x.scene, "]") : "").concat(x.line ? " line ".concat(x.line) : "", " ").concat(x.message)).join("\n")) : "";
      for (const c of clipEls.values()) c.el.classList.toggle("err", errs.some((x) => x.scene === c.id) || S.p.errors.some((x) => x.level === "error" && x.scene === c.id));
    }
    function textsMatch(id) {
      const s = sceneById(S.p, id);
      return s && S.counts && S.counts.texts[id] === scan(s.html).texts.length;
    }
    function onPick(m) {
      const edit2 = !opts.compact && !!m.scene && m.dbl && m.text != null && textsMatch(m.scene);
      if (!edit2) root.focus({ preventScroll: true });
      if (!m.scene) return;
      S.sel = m.scene;
      S.selCap = null;
      S.selHit = null;
      S.selEl = null;
      if (m.text != null) S.selText = { scene: m.scene, index: m.text };
      renderTimeline();
      renderToolbar();
      if (edit2) openInline(m);
      else if (!opts.compact && m.dbl && m.img != null) {
        S.tab = "scene";
        toggleInspector(true);
        renderSide();
      } else {
        if (S.tab === "text" || S.tab === "scene") renderSide();
        if (m.text != null || m.img != null) showProperties();
      }
    }
    function openInline(m) {
      closeInline();
      const s = sceneById(S.p, m.scene);
      const run = scan(s.html).texts[m.text];
      if (!run) return;
      const vr = { width: view.clientWidth, height: view.clientHeight };
      const ta = h("textarea", { rows: Math.min(6, Math.max(1, Math.ceil(run.text.trim().length / 28))), "aria-label": t2("texts") });
      ta.value = run.text.trim();
      const box = h("div", { class: "fvs-inline", style: { left: "".concat(Math.max(4, Math.min(m.rect.x, vr.width - 260)), "px"), top: "".concat(Math.max(4, Math.min(m.rect.y + m.rect.h + 6, vr.height - 90)), "px"), width: "".concat(Math.max(220, Math.min(m.rect.w, 520)), "px") } }, ta, h("small", { text: t2("inline-hint") }));
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        const v = ta.value;
        closeInline();
        if (ok && v.trim() !== run.text.trim()) tryCommit((x) => setSceneBlock(x, m.scene, "html", replaceText(sceneById(parseProject(x), m.scene).html, m.text, v)));
        root.focus();
      };
      ta.addEventListener("keydown", (e) => {
        if (e.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          finish(true);
        }
        if (e.key === "Escape") {
          e.preventDefault();
          finish(false);
        }
      });
      ta.addEventListener("blur", () => finish(true));
      view.append(box);
      inline = box;
      ta.focus();
      ta.select();
    }
    function closeInline() {
      if (inline) {
        const x = inline;
        inline = null;
        x.remove();
      }
    }
    let audios = [];
    let clockBase = 0, clockStart = 0;
    const now = () => S.playing ? Math.min(S.p.length, clockBase + (performance.now() - clockStart) / 1e3) : S.time;
    function applyVolumes() {
      for (const a of audios) a.el.muted = S.muted || a.mute;
    }
    function syncAudio(force) {
      for (const a of audios) {
        const local = S.time - a.at;
        const end = a.dur != null ? a.dur : a.el.duration ? a.el.duration - a.in : Infinity;
        if (!S.playing || local < 0 || local >= end) {
          if (!a.el.paused) a.el.pause();
          continue;
        }
        const want = a.in + local;
        if (force || Math.abs(a.el.currentTime - want) > 0.08) a.el.currentTime = want;
        if (a.el.paused) a.el.play().catch(() => {
        });
      }
    }
    function toggle() {
      if (S.playing) {
        S.time = now();
        S.playing = false;
        syncAudio();
      } else {
        if (S.time >= S.p.length - 0.01) S.time = 0;
        S.playing = true;
        clockBase = S.time;
        clockStart = performance.now();
        syncAudio(true);
      }
      post({ fvs: "transport", playing: S.playing });
      renderTransport();
    }
    function seek(x) {
      S.time = Math.max(0, Math.min(S.p.length, x));
      clockBase = S.time;
      clockStart = performance.now();
      syncAudio(true);
      renderTransport();
    }
    function renderTransport() {
      if (playBtn.dataset.playing !== String(S.playing)) {
        playBtn.replaceChildren(icon(S.playing ? "Pause" : "Play"));
        playBtn.dataset.playing = String(S.playing);
        playBtn.setAttribute("aria-label", t2(S.playing ? "pause" : "play"));
        playBtn.title = "".concat(t2(S.playing ? "pause" : "play"), " (").concat(t2("key-space"), ")");
      }
      timeEl.textContent = "".concat(fmtTime(S.time), " / ").concat(fmtTime(S.p.length));
      timeEl.title = t2("frame-at", { n: Math.round(S.time * fps()) });
      undoBtn.disabled = !S.undo.length;
      redoBtn.disabled = !S.redo.length;
      const scene = sceneUnderPlayhead();
      sceneNow.textContent = scene ? "".concat(String(scene.index + 1).padStart(2, "0"), " \xB7 ").concat(scene.title || scene.id) : "";
      prevBtn.disabled = !scene || scene.index === 0;
      nextBtn.disabled = !scene || scene.index === S.p.scenes.length - 1;
      if (muteBtn.dataset.muted !== String(S.muted)) {
        muteBtn.replaceChildren(icon(S.muted ? "VolumeX" : "Volume2"));
        muteBtn.title = t2(S.muted ? "unmute" : "mute");
        muteBtn.setAttribute("aria-label", muteBtn.title);
        muteBtn.setAttribute("aria-pressed", String(S.muted));
        muteBtn.dataset.muted = String(S.muted);
      }
    }
    let raf = 0;
    function loop() {
      if (S.disposed) return;
      if (S.playing) {
        S.time = now();
        if (S.time >= S.p.length) {
          S.playing = false;
          syncAudio();
          post({ fvs: "transport", playing: false });
        } else syncAudio(false);
        renderTransport();
        const x = S.time * S.zoom;
        if (!drags.size && (x < scroller.scrollLeft + 40 || x > scroller.scrollLeft + scroller.clientWidth - 40)) scroller.scrollLeft = x - 60;
      }
      if (S.time !== lastPosted) {
        post({ fvs: "seek", t: S.time });
        lastPosted = S.time;
        head.style.left = "".concat(S.time * S.zoom, "px");
      }
      raf = requestAnimationFrame(loop);
    }
    const decoded = /* @__PURE__ */ new Map(), ready = /* @__PURE__ */ new Map();
    const laneTracks = () => soundSegments(S.p).filter((a) => a.kind !== "video");
    const scoreIndex = (tracks) => Math.max(0, tracks.findIndex((a) => a.role === "score"));
    const decodedNow = (vp) => ready.get(vp) || null;
    function decode2(vp) {
      if (decoded.has(vp)) return decoded.get(vp);
      const job = (async () => {
        let bytes = null;
        if (app2.readBytes) bytes = await app2.readBytes(vp).catch(() => null);
        if (!bytes && app2.assetUrl) bytes = new Uint8Array(await (await fetch(app2.assetUrl(vp))).arrayBuffer());
        if (!bytes) return null;
        const Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        const ac = new Ctx(1, 22050, 22050);
        const buf = await ac.decodeAudioData(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
        const sr = buf.sampleRate, mono = new Float32Array(buf.length);
        for (let c = 0; c < buf.numberOfChannels; c++) {
          const d = buf.getChannelData(c);
          for (let i = 0; i < d.length; i++) mono[i] += d[i] / buf.numberOfChannels;
        }
        const bins = Math.ceil(mono.length / sr * 100), peaks = new Float32Array(bins), per = sr / 100;
        for (let b = 0; b < bins; b++) {
          let m = 0;
          const a = Math.floor(b * per), e = Math.min(mono.length, Math.floor((b + 1) * per));
          for (let i = a; i < e; i++) {
            const v = Math.abs(mono[i]);
            if (v > m) m = v;
          }
          peaks[b] = m;
        }
        const result = { mono, sr, peaks, duration: mono.length / sr };
        ready.set(vp, result);
        return result;
      })().catch(() => null);
      decoded.set(vp, job);
      return job;
    }
    let analysis = null;
    let audioGen = 0;
    async function loadAudio() {
      const gen = ++audioGen;
      const segments = soundSegments(S.p);
      S.audioKey = JSON.stringify(segments);
      for (const a of audios) {
        a.el.pause();
        if (a.blob) URL.revokeObjectURL(a.url);
      }
      audios = [];
      analysis = null;
      S.sync = null;
      const dir = dirOf2(path);
      for (const seg of segments) {
        const vp = joinPath(dir, seg.src);
        let url = null, blob = false;
        try {
          url = app2.assetUrl ? app2.assetUrl(vp) : null;
        } catch {
          url = null;
        }
        if (!url && app2.readBytes) {
          const b = await app2.readBytes(vp).catch(() => null);
          if (S.disposed || gen !== audioGen) return;
          if (b) {
            url = URL.createObjectURL(new Blob([b], { type: mimeOf(vp) }));
            blob = true;
          }
        }
        if (!url) continue;
        const a = new Audio(url);
        a.preload = "auto";
        a.volume = Math.min(1, 10 ** ((seg.gain || 0) / 20));
        audios.push({ el: a, at: seg.at || 0, in: seg.in || 0, dur: seg.dur ?? null, mute: !!seg.mute, url, blob, vp });
      }
      applyVolumes();
      renderLanes();
      drawWaves();
      const tracks = laneTracks();
      for (const tr of tracks) void decode2(joinPath(dir, tr.src)).then(() => {
        if (!S.disposed) {
          renderLanes();
          drawWaves();
        }
      });
      if (tracks.length) analyse(tracks[scoreIndex(tracks)]);
      else computeSync();
    }
    async function analyse(track3) {
      const key = S.audioKey;
      const d = await decode2(joinPath(dirOf2(path), track3.src));
      if (!d || S.disposed || key !== S.audioKey) return;
      const at = track3.at || 0, from = Math.round((track3.in || 0) * d.sr);
      const to = track3.dur != null ? Math.min(d.mono.length, from + Math.round(track3.dur * d.sr)) : d.mono.length;
      const off = Math.max(0, Math.round(at * d.sr));
      const mono = new Float32Array(off + Math.max(0, to - from));
      mono.set(d.mono.subarray(from, to), off);
      analysis = { env: onsetEnvelope(mono, d.sr) };
      computeSync();
      drawWaves();
      renderTimeline();
    }
    function computeSync() {
      S.sync = analysis ? syncReport(S.p.scenes, analysis.env) : null;
      const sum = syncButton.querySelector(".fvs-sync-sum");
      syncButton.hidden = !laneTracks().length;
      if (!S.sync) {
        sum.textContent = laneTracks().length ? t2("sync-analyzing") : "";
        syncButton.dataset.state = "pending";
        return;
      }
      const bad = S.sync.filter((r) => !r.ok).length;
      sum.textContent = t2(bad ? "sync-short" : "sync-short-ok", { n: S.sync.length, bad });
      syncButton.dataset.state = bad ? "warn" : "ok";
    }
    const grid = () => {
      const tp = S.p.tempo;
      if (!tp) return S.snap === "off" ? 1 / fps() : { bar: 1, beat: 0.5, half: 0.25, quarter: 0.1 }[S.snap] || 0.1;
      return { bar: tp.bar, beat: tp.beat, half: tp.beat / 2, quarter: tp.beat / 4, off: 1 / fps() }[S.snap];
    };
    const snapT = (x) => {
      const g = grid();
      return Math.round(x / g) * g;
    };
    const fitZoom = () => Math.max(2, (scroller.clientWidth - 24) / Math.max(1, S.p.length));
    const zoomRange = () => {
      const fit = fitZoom();
      return [fit / 2, Math.max(400, fps() * 24, fit)];
    };
    const zoomBy = (f, at) => setZoom((S.zoom || fitZoom()) * f, at);
    function setZoom(z, at) {
      const [lo, hi] = zoomRange(), old = S.zoom || fitZoom(), w = scroller.clientWidth;
      const headX = S.time * old - scroller.scrollLeft;
      const x = at ?? (headX >= 0 && headX <= w ? headX : w / 2);
      const tx = (scroller.scrollLeft + x) / old;
      S.zoomFit = !(z > 0);
      S.zoom = z > 0 ? Math.min(hi, Math.max(lo, z)) : fitZoom();
      zoomInput.value = String(Math.round(Math.log(S.zoom / lo) / Math.log(hi / lo) * ZOOM_STEPS));
      renderTimeline();
      scroller.scrollLeft = Math.max(0, tx * S.zoom - x);
      drawRuler();
    }
    function fallbackMedia(src) {
      if (typeof src !== "string" || !S.p.scenes.some((s) => (typeof videos === "function" ? videos(s.html) : []).some((v) => v.src === src))) return false;
      return assets.fallback(joinPath(dirOf2(path), src));
    }
    const thumbs = sceneThumbnails(
      scroller,
      (scene) => previewHtml({ ...S.p, scenes: [scene], captions: [] }, path, assets),
      () => S,
      { onMediaError: (src) => {
        const swapped = fallbackMedia(src);
        if (swapped) schedulePreview();
        return swapped;
      } }
    );
    const clipEls = /* @__PURE__ */ new Map();
    function makeClip(id) {
      const elc = h("div", { class: "fvs-clip", "data-id": id });
      const c = {
        id,
        el: elc,
        thumb: h("div", { class: "fvs-clip-thumb" }),
        trans: h("div", { class: "fvs-clip-trans", hidden: true }),
        title: h("b"),
        dur: h("small"),
        lane: h("div", { class: "fvs-clip-lane" }),
        edgeL: h("div", { class: "fvs-edge start", title: t2("trim-hint") }),
        edgeR: h("div", { class: "fvs-edge end", title: t2("roll-hint") })
      };
      elc.append(c.thumb, c.trans, h("div", { class: "fvs-clip-label" }, c.title, c.dur), c.lane, c.edgeL, c.edgeR);
      elc.addEventListener("pointerdown", (e) => clipPointerDown(e, id));
      elc.addEventListener("dblclick", (e) => {
        if (!e.target.closest(".fvs-hitm, .fvs-edge, .fvs-clip-lane")) {
          S.tab = "scene";
          toggleInspector(true);
          renderSide();
        }
      });
      c.lane.addEventListener("dblclick", (e) => {
        if (e.target !== c.lane) return;
        const s = sceneById(S.p, id);
        if (!s) return;
        const x = (e.clientX - c.lane.getBoundingClientRect().left) / cz() / (S.zoom || 20);
        const u = hitUnit(S.p.tempo), base = s.t0v ?? s.t0;
        const beats = Math.round((snapT(s.t0 + x) - base) / u * 1e4) / 1e4;
        if (s.t0 + x <= s.t1) tryCommit((src) => setHits(src, s.id, [...s.hits, beats]));
      });
      c.edgeL.addEventListener("pointerdown", (e) => dragStartEdge(e, id));
      c.edgeR.addEventListener("pointerdown", (e) => dragEndEdge(e, id));
      return c;
    }
    function renderTimeline() {
      const Z = S.zoom || 20, W = Math.ceil(S.p.length * Z) + 48;
      inner.style.width = "".concat(W, "px");
      inner.style.height = "".concat(lanesHeight() - 10, "px");
      durationEl.textContent = "".concat(fmtTime(S.p.length), " \xB7 ").concat(t2("scene-count", { n: S.p.scenes.length }));
      rulerLabel.textContent = S.p.tempo ? t2("snap-bar") : t2("time");
      const seen = /* @__PURE__ */ new Set(), rows = S.sync || [];
      thumbs.sync(S.p, JSON.stringify([cssBlocks(S.p), stageHtml(S.p), stageJs(S.p), S.p.meta, S.p.length]));
      S.p.scenes.forEach((s, k) => {
        seen.add(s.id);
        let c = clipEls.get(s.id);
        if (!c) {
          c = makeClip(s.id);
          clipEls.set(s.id, c);
          clips.append(c.el);
        }
        const width = Math.max(3, s.dur * Z - 2);
        Object.assign(c.el.style, { left: "".concat(s.t0 * Z, "px"), width: "".concat(width, "px") });
        c.el.classList.toggle("on", s.id === S.sel && S.selCap === null);
        c.el.classList.toggle("alt", k % 2 === 1);
        c.el.classList.toggle("tight", width < 54);
        c.el.title = "".concat(s.title || s.id, " \xB7 ").concat(fmtTime(s.t0), "\u2013").concat(fmtTime(s.t1), " \xB7 ").concat(t2("scene-duration", { n: s.dur.toFixed(2) })).concat(s.in ? " \xB7 ".concat(t2("scene-in"), " ").concat(s.in.toFixed(2), "s") : "");
        c.title.textContent = s.title || s.id;
        c.dur.textContent = "".concat(s.dur.toFixed(1), "s");
        if (S.trusted && !c.thumb.firstChild) c.thumb.append(thumbs.get(s));
        const tr = s.transition;
        c.trans.hidden = !tr;
        if (tr) {
          c.trans.style.width = "".concat(Math.max(6, tr.dur * Z), "px");
          c.trans.title = "".concat(t2("transition"), " \xB7 ").concat(t2("tr-".concat(tr.type)), " \xB7 ").concat(tr.dur.toFixed(2), "s");
        }
        c.lane.replaceChildren();
        for (const { index: i, t: ht } of visibleHits2(s)) {
          const r = rows.find((x) => x.scene === s.id && x.hit === i);
          const cls = r ? r.quiet ? "quiet" : r.ok ? "ok" : "weak" : "";
          const on = S.selHit && S.selHit.scene === s.id && S.selHit.index === i;
          const m = h("div", {
            class: "fvs-hitm ".concat(cls).concat(on ? " on" : ""),
            "data-hit": String(i),
            style: { left: "".concat((ht - s.t0) * Z, "px") },
            title: "h".concat(i, " \xB7 ").concat(fmtTime(ht)).concat(r ? " \xB7 ".concat(t2(r.quiet ? "sync-quiet" : r.ok ? "sync-hit" : "sync-miss")) : "", "\n").concat(t2("hit-hint"))
          });
          m.addEventListener("pointerdown", (e) => dragHit(e, s.id, i, m));
          c.lane.append(m);
        }
      });
      for (const [id, c] of clipEls) if (!seen.has(id)) {
        c.el.remove();
        clipEls.delete(id);
      }
      clips.querySelector(".fvs-tl-empty")?.remove();
      if (!S.p.scenes.length) clips.append(h("div", { class: "fvs-tl-empty", text: t2("scene-none-yet") }));
      blank.hidden = !S.text || S.p.scenes.length > 0;
      exportBtn.disabled = !S.p.scenes.length;
      head.style.left = "".concat(S.time * Z, "px");
      renderCaptions();
      renderElements();
      renderLanes();
      drawRuler();
      drawWaves();
      renderErrors();
      renderToolbar();
    }
    function renderToolbar() {
      const s = selScene(), under = sceneUnderPlayhead();
      splitBtn.disabled = !under || typeof splitScene !== "function";
      dupBtn.disabled = !s || S.selCap !== null;
      delBtn.disabled = !!S.selEl || !s && !S.selHit && S.selCap === null;
      if (quoteBtn) quoteBtn.disabled = !s && S.selCap === null;
    }
    function timedOf(s) {
      const unit = hitUnit(S.p.tempo), beat = S.p.tempo ? S.p.tempo.beat : 0.5;
      const content = { t0: s.t0v ?? s.t0, t1: s.t1, hits: s.hitTimes };
      const list2 = timedSpans(s.html, { s0: s.t0, t1: s.t1, hits: s.hitTimes }, (expr) => timeExpr(expr, content, unit, beat), { unit, beat });
      const ends = [], last = [];
      for (const x of [...list2].sort((p, q2) => p.a - q2.a)) {
        let r = ends.findIndex((e) => e <= x.a + 1e-6);
        if (r < 0 && ends.length < ELEM_ROWS) r = ends.length;
        if (r < 0) {
          r = last.reduce((best, y, i) => y.a < last[best].a ? i : best, 0);
          if (last[r].b > x.a) last[r].shown = x.a;
        }
        ends[r] = x.b;
        last[r] = x;
        x.row = r;
      }
      return list2;
    }
    function renderElements() {
      const Z = S.zoom || 20, out = [];
      for (const s of S.p.scenes) for (const x of timedOf(s)) {
        const on = S.selEl && S.selEl.scene === s.id && S.selEl.tag === x.tag;
        out.push(h("div", {
          class: "fvs-el".concat(on ? " on" : "").concat(x.error ? " err" : ""),
          "data-scene": s.id,
          "data-tag": String(x.tag),
          style: { left: "".concat(x.a * Z, "px"), width: "".concat(Math.max(4, ((x.shown ?? x.b) - x.a) * Z - 1), "px"), top: "".concat(2 + x.row * ELEM_ROW_H, "px") },
          title: x.error ? "".concat(x.label, "\n").concat(x.error) : "".concat(x.label, "\n<").concat(x.name, "> \xB7 ").concat(fmtTime(x.a), " \u2013 ").concat(fmtTime(x.b), "\n").concat(t2("element-hint"))
        }, h("span", { text: x.label })));
      }
      elLane.classList.toggle("empty", !out.length);
      elLane.dataset.hint = t2("elements-lane-hint");
      elLane.replaceChildren(...out);
    }
    function markOn(el2, scene) {
      timeline.querySelectorAll(".fvs-el.on, .fvs-cap.on, .fvs-hitm.on, .fvs-clip.on").forEach((n) => n.classList.remove("on"));
      el2?.classList.add("on");
      if (scene) clipEls.get(scene)?.el.classList.add("on");
    }
    function selectElement(scene, tag) {
      const s = sceneById(S.p, scene), x = s && timedOf(s).find((e) => e.tag === tag);
      if (!x) return null;
      S.sel = scene;
      S.selEl = { scene, tag };
      S.selHit = null;
      S.selCap = null;
      S.tab = "scene";
      markOn(elLane.querySelector('[data-scene="'.concat(CSS.escape(scene), '"][data-tag="').concat(tag, '"]')), scene);
      if (S.time < x.a || S.time >= x.b) seek(Math.min(x.a + 0.5, (x.a + x.b) / 2));
      renderSide();
      renderToolbar();
      return x;
    }
    elLane.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const el2 = e.target.closest(".fvs-el");
      if (el2) {
        selectElement(el2.dataset.scene, +el2.dataset.tag);
        showProperties();
      } else scrub(e);
    });
    elLane.addEventListener("dblclick", (e) => {
      const el2 = e.target.closest(".fvs-el"), x = el2 && selectElement(el2.dataset.scene, +el2.dataset.tag);
      if (x) focusField("tin:".concat(el2.dataset.scene, ":").concat((x.of || x).tag));
    });
    function reference() {
      const file = path.split("/").pop(), span = (a, b) => "".concat(a.toFixed(2), "\u2013").concat(b.toFixed(2), "s");
      if (S.selCap !== null) {
        const c = cues()[S.selCap];
        return c ? "".concat(file, " \u203A ").concat(S.p.toks[S.p.captionsTok]?.lang || "srt", " \u203A ").concat(c.raw || "".concat(srtTime(c.start), " --> ").concat(srtTime(c.end)), "\n").concat(c.text) : null;
      }
      const s = selScene();
      if (!s) return null;
      const scene = "".concat(file, " \u203A ## ").concat(s.id).concat(s.title ? " \xB7 ".concat(s.title) : "");
      if (S.selHit && s.hitTimes[S.selHit.index] !== void 0) return "".concat(scene, " \u203A h").concat(S.selHit.index, " = ").concat(s.hitTimes[S.selHit.index].toFixed(2), "s");
      const x = S.selEl && timedOf(s).find((e) => e.tag === S.selEl.tag);
      if (!x) return "".concat(scene, " \u203A ").concat(span(s.t0, s.t1));
      const tags = scan(s.html).tags, written = (k) => s.html.slice(tags[k].start, tags[k].end);
      const where = x.of ? "".concat(written(x.of.tag), " \u203A ").concat(x.n, "/").concat(x.of.items.length, " \u203A ").concat(written(x.tag)) : written(x.tag);
      return ["".concat(scene, " \u203A ").concat(span(x.a, x.b)), where, x.text.length > 120 ? "".concat(x.text.slice(0, 120), "\u2026") : x.text].filter(Boolean).join("\n");
    }
    function quoteSelection() {
      const text = opts.chat && reference();
      if (text) {
        opts.chat.reveal();
        opts.chat.quote(text);
      }
    }
    inner.addEventListener("contextmenu", (e) => {
      if (!opts.chat) return;
      const el2 = e.target.closest(".fvs-el, .fvs-hitm, .fvs-cap, .fvs-clip");
      if (!el2) return;
      e.preventDefault();
      if (el2.matches(".fvs-el")) selectElement(el2.dataset.scene, +el2.dataset.tag);
      else if (el2.matches(".fvs-hitm")) {
        const id = el2.closest(".fvs-clip").dataset.id;
        S.sel = id;
        S.selHit = { scene: id, index: +el2.dataset.hit };
        S.selCap = null;
        S.selEl = null;
        markOn(el2, id);
        renderSide();
        renderToolbar();
      } else if (el2.matches(".fvs-cap")) {
        S.selCap = +el2.dataset.index;
        S.selHit = null;
        S.selEl = null;
        S.tab = "captions";
        markOn(el2);
        renderSide();
        renderToolbar();
      } else selectScene(el2.dataset.id, { seekTo: false, reveal: false });
      openMenu(el2, [{ label: t2("quote-to-chat"), icon: "MessageSquareQuote", run: quoteSelection }], { label: t2("timeline"), at: { x: e.clientX, y: e.clientY } });
    });
    let laneEls = [];
    function renderLanes() {
      const tracks = laneTracks(), Z = S.zoom || 20, dir = dirOf2(path), score = scoreIndex(tracks);
      if (laneEls.length !== Math.max(1, tracks.length)) {
        if (laneEls.length) requestAnimationFrame(() => {
          if (!S.disposed) applyTimelineHeight();
        });
        lanes.replaceChildren();
        audioRail.replaceChildren();
        laneEls = [];
        for (let i = 0; i < Math.max(1, tracks.length); i++) {
          const canvas = h("canvas", { class: "fvs-lane-wave" });
          const region = h("div", { class: "fvs-lane-region" }, canvas, h("span", { class: "fvs-lane-name" }));
          const empty = h(
            "div",
            { class: "fvs-lane-empty" },
            h("button", { type: "button", class: "fvs-btn ghost", "data-lane": "add", disabled: !app2.writeBytes, onclick: () => audioInput.click() }, icon("Plus"), h("span", { text: t2("audio-add") })),
            h("button", { type: "button", class: "fvs-btn ghost", "data-lane": "score", title: t2("score-hint"), onclick: () => askFor("score") }, icon("Sparkles"), h("span", { text: t2("score-ask") })),
            h("span", { class: "fvs-lane-hint", text: t2("drop-audio") })
          );
          const lane = h("div", { class: "fvs-lane", style: { top: "".concat(RULER_H + CAPTION_H + VIDEO_H + ELEM_H + i * AUDIO_H, "px") } }, region, empty);
          region.addEventListener("pointerdown", (e) => dragTrack(e, i));
          lane.addEventListener("pointerdown", (e) => {
            if (e.target === lane) scrub(e);
          });
          const label = h("button", { type: "button", class: "fvs-rail-lane", onclick: () => showAudio(laneTracks()[i]?.id, true) }, icon("Music2"), h("span"));
          lanes.append(lane);
          audioRail.append(label);
          laneEls.push({ lane, region, canvas, label });
        }
      }
      laneEls.forEach((L, i) => {
        const tr = tracks[i];
        L.label.querySelector("span").textContent = tr && i !== score ? t2("audio-track-n", { n: i + 1 }) : t2("audio-track");
        L.label.title = "".concat(tr ? tr.src : t2("sync-none"), "\n").concat(t2("rail-hint", { tab: t2("tab-project") }));
        L.region.hidden = !tr;
        L.lane.classList.toggle("empty", !tr);
        if (!tr) return;
        const d = decodedNow(joinPath(dir, tr.src));
        const len = tr.dur != null ? tr.dur : d ? Math.max(0, d.duration - (tr.in || 0)) : Math.max(1, S.p.length - (tr.at || 0));
        Object.assign(L.region.style, { left: "".concat((tr.at || 0) * Z, "px"), width: "".concat(Math.max(4, len * Z), "px") });
        L.region.classList.toggle("muted", !!tr.mute);
        L.region.querySelector(".fvs-lane-name").textContent = tr.src.split("/").pop();
        L.region.title = "".concat(tr.src, " \xB7 ").concat(t2("audio-at"), " ").concat((tr.at || 0).toFixed(2)).concat(tr.in ? " \xB7 ".concat(t2("audio-in"), " ").concat(tr.in.toFixed(2)) : "", "\n").concat(t2("lane-hint"));
      });
    }
    function canvasSize(c, w, hh) {
      const dpr = Math.min(2, window.devicePixelRatio || 1), cw = Math.min(32e3, Math.ceil(w * dpr));
      c.width = cw;
      c.height = Math.ceil(hh * dpr);
      c.style.width = "".concat(w, "px");
      c.style.height = "".concat(hh, "px");
      const g = c.getContext("2d");
      g.setTransform(cw / w, 0, 0, dpr, 0, 0);
      return g;
    }
    function css(name, fb) {
      return getComputedStyle(root).getPropertyValue(name).trim() || fb;
    }
    function drawRuler() {
      const Z = S.zoom || 20, x0 = scroller.scrollLeft, W = Math.max(1, scroller.clientWidth);
      ruler.style.left = "".concat(x0, "px");
      const g = canvasSize(ruler, W, RULER_H);
      g.clearRect(0, 0, W, RULER_H);
      const muted = css("--fv-muted", "#888"), line = css("--fv-line", "#ccc");
      g.font = "".concat(css("--fv-caption", "11px"), " ").concat(css("--fv-mono", "ui-monospace, monospace"));
      g.textBaseline = "top";
      const tp = S.p.tempo, from = x0 / Z, to = (x0 + W) / Z;
      if (tp) {
        const every = [1, 2, 4, 8, 16].find((n) => n * tp.bar * Z >= 34) || 32;
        const last = Math.floor((S.p.length + 1e-6) / tp.bar);
        for (let b = Math.max(0, Math.floor(from / tp.bar)); b <= Math.min(last, Math.ceil(to / tp.bar)); b++) {
          const x = b * tp.bar * Z - x0;
          g.fillStyle = b % every ? line : muted;
          g.fillRect(x, b % every ? 14 : 6, 1, b % every ? 10 : 18);
          if (!(b % every)) {
            g.fillStyle = muted;
            g.fillText(String(b + 1), x + 4, 4);
          }
          if (tp.beat * Z >= 7) for (let k = 1; k < tp.beatsPerBar; k++) {
            g.fillStyle = line;
            g.fillRect(x + k * tp.beat * Z, 19, 1, 5);
          }
        }
      } else {
        const step = [0.1, 0.2, 0.5, 1, 2, 5, 10, 30, 60].find((n) => n * Z >= 40) || 120;
        for (let i = Math.max(0, Math.floor(from / step)); i * step <= Math.min(S.p.length, to + step); i++) {
          const sec = i * step, x = sec * Z - x0;
          g.fillStyle = muted;
          g.fillRect(x, 6, 1, 18);
          g.fillText("".concat(+sec.toFixed(1), "s"), x + 4, 4);
        }
      }
    }
    function drawWaves() {
      const tracks = laneTracks(), Z = S.zoom || 20, dir = dirOf2(path), score = scoreIndex(tracks);
      const fill = css("--fv-wave", "#7aa"), tick = css("--fv-muted", "#888");
      laneEls.forEach((L, i) => {
        const tr = tracks[i];
        if (!tr) return;
        const d = decodedNow(joinPath(dir, tr.src));
        const w = Math.max(4, parseFloat(L.region.style.width) || 4), H = AUDIO_H - 10;
        const g = canvasSize(L.canvas, w, H);
        g.clearRect(0, 0, w, H);
        if (!d) return;
        g.fillStyle = fill;
        g.globalAlpha = tr.mute ? 0.3 : 0.75;
        const from = (tr.in || 0) * 100;
        for (let x = 0; x < w; x++) {
          const b0 = Math.floor(from + x / Z * 100), b1 = Math.max(b0 + 1, Math.floor(from + (x + 1) / Z * 100));
          let m = 0;
          for (let b = b0; b < b1 && b < d.peaks.length; b++) if (d.peaks[b] > m) m = d.peaks[b];
          const hh = Math.min(1, m) * (H - 4);
          g.fillRect(x, (H - hh) / 2, 1, Math.max(1, hh));
        }
        g.globalAlpha = 1;
        if (analysis && i === score) {
          g.fillStyle = tick;
          const e = analysis.env.env, at = tr.at || 0;
          for (let k = 1; k < e.length - 1; k++) if (e[k] > 1.2 && e[k] >= e[k - 1] && e[k] > e[k + 1]) {
            const x = (k * analysis.env.hop + analysis.env.offset - at) * Z;
            if (x < 0 || x > w) continue;
            g.globalAlpha = Math.min(1, (e[k] - 1) / 2);
            g.fillRect(x, 0, 1.5, 6);
          }
          g.globalAlpha = 1;
        }
      });
    }
    function scrub(e) {
      if (e.button !== 0) return;
      seek(timeAt(e));
      listenDrag((ev) => seek(timeAt(ev)), () => {
      });
    }
    ruler.addEventListener("pointerdown", scrub);
    clips.addEventListener("pointerdown", (e) => {
      if (e.target === clips) scrub(e);
    });
    function clipPointerDown(e, id) {
      if (e.button !== 0 || e.target.closest(".fvs-hitm, .fvs-edge")) return;
      const s0 = sceneById(S.p, id);
      if (!s0) return;
      const Z = S.zoom || 20, x0 = e.clientX, at0 = timeAt(e);
      let dragging = false, ghost = null, marker = null, target = s0.index;
      const move = (ev) => {
        if (!dragging && Math.abs(ev.clientX - x0) < 5) return;
        if (!dragging) {
          dragging = true;
          ghost = h("div", { class: "fvs-tl-ghost move", style: { width: "".concat(s0.dur * Z, "px") } });
          marker = h("div", { class: "fvs-tl-insert" });
          inner.append(ghost, marker);
          timeline.classList.add("reordering");
        }
        const at = timeAt(ev), others = S.p.scenes.filter((x) => x.id !== id);
        target = others.filter((x) => (x.t0 + x.t1) / 2 < at).length;
        ghost.style.left = "".concat((at - at0 + s0.t0) * Z, "px");
        const bx = target < others.length ? others[target].t0 : others.length ? others.at(-1).t1 : 0;
        marker.style.left = "".concat(bx * Z, "px");
      };
      const up = (ev) => {
        ghost?.remove();
        marker?.remove();
        timeline.classList.remove("reordering");
        if (ev.type === "pointercancel") return;
        if (!dragging) {
          const was = S.sel, s = sceneById(S.p, id);
          if (!s) return;
          S.sel = id;
          S.selHit = null;
          S.selCap = null;
          S.selEl = null;
          if (was === id) seek(timeAt(ev));
          else if (S.time < s.t0 || S.time >= s.t1) seek(s.t0);
          renderTimeline();
          renderSide();
          showProperties();
          return;
        }
        if (target !== s0.index) {
          if (tryCommit((src) => moveScene(src, id, target))) {
            S.sel = id;
            renderAll();
          }
        }
      };
      listenDrag(move, up);
    }
    function dragEndEdge(e, id) {
      e.preventDefault();
      e.stopPropagation();
      const s = sceneById(S.p, id);
      if (!s) return;
      const Z = S.zoom || 20, edge = e.currentTarget;
      const ghost = h("div", { class: "fvs-tl-ghost", style: { left: "".concat(s.t0 * Z, "px"), width: "".concat(s.dur * Z, "px") } });
      inner.append(ghost);
      edge.classList.add("drag");
      let len = s.dur;
      const move = (ev) => {
        len = Math.max(grid(), snapT(timeAt(ev)) - s.t0);
        ghost.style.width = "".concat(len * Z, "px");
      };
      const up = (ev) => {
        ghost.remove();
        edge.classList.remove("drag");
        if (ev.type === "pointercancel" || Math.abs(len - s.dur) < 1e-6) return;
        tryCommit((src) => ev.altKey || !S.p.scenes[s.index + 1] ? setSceneLength(src, s.id, len) : rollCut(src, s.id, len));
      };
      listenDrag(move, up);
    }
    function dragStartEdge(e, id) {
      e.preventDefault();
      e.stopPropagation();
      const s = sceneById(S.p, id);
      if (!s) return;
      if (typeof setSceneIn !== "function") {
        notify(ctx2, t2("trim-unsupported"), "warn");
        return;
      }
      const Z = S.zoom || 20, edge = e.currentTarget;
      const prev = S.p.scenes[s.index - 1], content0 = s.t0 - (s.in || 0);
      const ghost = h("div", { class: "fvs-tl-ghost", style: { left: "".concat(s.t0 * Z, "px"), width: "".concat(s.dur * Z, "px") } });
      inner.append(ghost);
      edge.classList.add("drag");
      let delta = 0, ripple = false;
      const move = (ev) => {
        ripple = ev.altKey || !prev;
        const lo = Math.max(content0, ripple ? -Infinity : prev.t0 + grid()), hi = s.t1 - grid();
        const t0 = Math.max(lo, Math.min(hi, snapT(timeAt(ev))));
        delta = t0 - s.t0;
        if (ripple) Object.assign(ghost.style, { left: "".concat(s.t0 * Z, "px"), width: "".concat((s.dur - delta) * Z, "px") });
        else Object.assign(ghost.style, { left: "".concat(t0 * Z, "px"), width: "".concat((s.t1 - t0) * Z, "px") });
      };
      const up = (ev) => {
        ghost.remove();
        edge.classList.remove("drag");
        if (ev.type === "pointercancel" || Math.abs(delta) < 1e-6) return;
        tryCommit((src) => {
          let out = src;
          if (!ripple) out = setSceneLength(out, prev.id, prev.dur + delta);
          out = setSceneIn(out, s.id, Math.max(0, (s.in || 0) + delta));
          return setSceneLength(out, s.id, s.dur - delta);
        });
      };
      listenDrag(move, up);
    }
    function dragHit(e, id, i, m) {
      e.preventDefault();
      e.stopPropagation();
      const s = sceneById(S.p, id);
      if (!s) return;
      S.sel = s.id;
      S.selHit = { scene: s.id, index: i };
      S.selCap = null;
      S.selEl = null;
      timeline.querySelectorAll(".fvs-hitm.on, .fvs-el.on").forEach((x) => x.classList.remove("on"));
      m.classList.add("on");
      renderToolbar();
      const Z = S.zoom || 20, u = hitUnit(S.p.tempo), base = s.t0v ?? s.t0;
      let at = s.hitTimes[i], moved = false;
      const move = (ev) => {
        moved = true;
        at = Math.max(s.t0, Math.min(s.t1, snapT(timeAt(ev))));
        m.style.left = "".concat((at - s.t0) * Z, "px");
      };
      const up = (ev) => {
        if (ev.type === "pointercancel") {
          renderTimeline();
          return;
        }
        if (!moved) {
          seek(s.hitTimes[i]);
          renderSide();
          if (e.button === 0) showProperties();
          return;
        }
        const hits = s.hits.slice();
        hits[i] = Math.round((at - base) / u * 1e4) / 1e4;
        S.selHit = null;
        tryCommit((src) => setHits(src, s.id, hits));
      };
      listenDrag(move, up);
    }
    function dragTrack(e, i) {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const tracks = laneTracks(), tr = tracks[i];
      if (!tr) return;
      const Z = S.zoom || 20, x0 = e.clientX, region = laneEls[i].region, at0 = tr.at || 0;
      let at = at0, moved = false;
      const move = (ev) => {
        moved = moved || Math.abs(ev.clientX - x0) > 3;
        if (!moved) return;
        at = Math.max(0, snapT(at0 + (ev.clientX - x0) / cz() / Z));
        region.style.left = "".concat(at * Z, "px");
      };
      const up = (ev) => {
        if (ev.type !== "pointercancel" && !moved) showAudio(tr.id);
        if (ev.type === "pointercancel" || !moved || Math.abs(at - at0) < 1e-6) {
          renderLanes();
          return;
        }
        setTrack(tr.id, { at: Math.round(at * 1e3) / 1e3 || void 0 });
      };
      listenDrag(move, up);
    }
    function rawTracks() {
      const m = S.p.meta, raw = Array.isArray(m.audio) ? m.audio : m.audio ? [m.audio] : [];
      return raw.map((a) => typeof a === "string" ? { src: a } : { ...a });
    }
    function rawIndex(list2, id) {
      const valid = list2.map((a, i) => [a, i]).filter(([a]) => a && a.src);
      const k = audioTracks(S.p.meta).findIndex((x) => x.id === id);
      return k < 0 || !valid[k] ? -1 : valid[k][1];
    }
    function setTrack(id, patch) {
      const list2 = rawTracks(), k = rawIndex(list2, id);
      if (k < 0) return;
      const next = { ...list2[k], ...patch };
      for (const key of Object.keys(next)) if (next[key] === void 0 || next[key] === false) delete next[key];
      list2[k] = next;
      tryCommit((src) => setProjectMeta(src, { audio: list2 }));
    }
    function removeTrack(id) {
      const list2 = rawTracks(), k = rawIndex(list2, id);
      if (k >= 0) tryCommit((src) => setProjectMeta(src, { audio: list2.filter((_, i) => i !== k) }));
    }
    const cues = () => S.p.captions || [];
    const sameCue = (a, b) => Math.abs(a.start - b.start) < 6e-4 && Math.abs(a.end - b.end) < 6e-4 && a.text === b.text;
    const captionErrors = () => S.p.errors.filter((e) => e.captions && e.level === "error");
    function commitCaptions(list2, keep = null, { force = false } = {}) {
      if (!force && captionErrors().length) {
        notify(ctx2, t2("captions-blocked"), "warn");
        S.tab = "captions";
        renderSide();
        return false;
      }
      S.selCap = null;
      if (!tryCommit((src) => setCaptions(src, list2.map((c) => ({ start: c.start, end: c.end, text: c.text }))))) return false;
      const k = keep ? cues().findLastIndex((c) => sameCue(c, keep)) : -1;
      S.selCap = k < 0 ? null : k;
      renderTimeline();
      renderSide();
      return true;
    }
    function renderCaptions() {
      const Z = S.zoom || 20, list2 = cues();
      capLane.classList.toggle("empty", !list2.length);
      capLane.dataset.hint = t2("captions-lane-hint");
      capLane.replaceChildren(...list2.map((c, i) => {
        const el2 = h(
          "div",
          {
            class: "fvs-cap".concat(S.selCap === i ? " on" : ""),
            "data-index": String(i),
            style: { left: "".concat(c.start * Z, "px"), width: "".concat(Math.max(3, (c.end - c.start) * Z - 1), "px") },
            title: "".concat(fmtTime(c.start), " \u2013 ").concat(fmtTime(c.end), "\n").concat(c.text, "\n").concat(t2("caption-hint"))
          },
          h("span", { text: c.text.replace(/\s*\n\s*/g, " / ") }),
          h("i", { class: "fvs-cap-edge start" }),
          h("i", { class: "fvs-cap-edge end" })
        );
        el2.addEventListener("pointerdown", (e) => capPointerDown(e, i));
        el2.addEventListener("dblclick", () => editCaption(i));
        return el2;
      }));
    }
    capLane.addEventListener("pointerdown", (e) => {
      if (e.target === capLane) scrub(e);
    });
    capLane.addEventListener("dblclick", (e) => {
      if (e.target === capLane) addCaption(snapT(timeAt(e)));
    });
    function capPointerDown(e, i) {
      if (e.button !== 0) return;
      const c0 = cues()[i];
      if (!c0) return;
      const edge = e.target.closest(".fvs-cap-edge"), mode = edge ? edge.classList.contains("start") ? "start" : "end" : "move";
      const Z = S.zoom || 20, x0 = e.clientX, el2 = e.currentTarget, minDur = Math.max(1 / fps(), 0.1);
      if (S.selCap !== i || S.tab !== "captions") {
        S.selCap = i;
        S.selHit = null;
        S.selEl = null;
        S.tab = "captions";
        timeline.querySelectorAll(".fvs-cap.on, .fvs-clip.on, .fvs-hitm.on, .fvs-el.on").forEach((x) => x.classList.remove("on"));
        el2.classList.add("on");
        renderSide();
        renderToolbar();
      }
      let start = c0.start, end = c0.end, moved = false;
      const move = (ev) => {
        if (!moved && Math.abs(ev.clientX - x0) < 4) return;
        moved = true;
        const dx = (ev.clientX - x0) / cz() / Z;
        if (mode === "move") {
          start = Math.max(0, snapT(c0.start + dx));
          end = start + (c0.end - c0.start);
        } else if (mode === "start") start = Math.max(0, Math.min(c0.end - minDur, snapT(c0.start + dx)));
        else end = Math.max(c0.start + minDur, snapT(c0.end + dx));
        Object.assign(el2.style, { left: "".concat(start * Z, "px"), width: "".concat(Math.max(3, (end - start) * Z - 1), "px") });
      };
      const up = (ev) => {
        if (ev.type === "pointercancel") {
          renderCaptions();
          return;
        }
        if (!moved) {
          if (S.time < c0.start || S.time >= c0.end) seek(c0.start);
          showProperties();
          return;
        }
        if (Math.abs(start - c0.start) < 1e-6 && Math.abs(end - c0.end) < 1e-6) return;
        const next = { ...c0, start, end };
        commitCaptions(cues().map((c, k) => k === i ? next : c), next);
      };
      listenDrag(move, up);
    }
    function addCaption(at = S.time) {
      const list2 = cues(), start = Math.max(0, Math.min(at, Math.max(0, S.p.length - 0.5)));
      const next = list2.filter((c) => c.start > start + 1e-3).reduce((m, c) => Math.min(m, c.start), Infinity);
      const cue = { start, end: start + (next - start >= 0.5 ? Math.min(2, next - start) : 2), text: t2("caption-new") };
      if (commitCaptions([...list2, cue], cue)) editCaption(S.selCap);
    }
    function deleteCaption(i) {
      const list2 = cues();
      if (list2[i]) commitCaptions(list2.filter((_, k) => k !== i));
    }
    function editCaption(i) {
      if (i === null || !cues()[i]) return;
      S.selCap = i;
      S.tab = "captions";
      renderTimeline();
      renderSide();
      focusField("cap:".concat(i, ":text"));
    }
    function openTab(k) {
      S.tab = k;
      renderSide();
      if (nativeInspector) {
        inspectorPref = true;
        openInspector({ quiet: true });
      } else if (!opts.compact && !S.inspectorOpen) {
        S.inspectorOpen = true;
        S.focus = false;
        layout();
      }
    }
    function showAudio(id, open = false) {
      if (open) openTab("project");
      else {
        S.tab = "project";
        renderSide();
        showProperties();
      }
      let n = 30;
      const mark = () => {
        if (S.disposed || S.tab !== "project") return;
        if (!side.isConnected) {
          if (n--) requestAnimationFrame(mark);
          return;
        }
        const card = id == null ? null : panel.querySelector('.fvs-track-card[data-track="'.concat(CSS.escape(String(id)), '"]'));
        (card || panel.querySelector(".fvs-audio-tracks"))?.scrollIntoView({ block: "nearest" });
        if (card) {
          card.classList.remove("flash");
          void card.offsetWidth;
          card.classList.add("flash");
        }
      };
      mark();
    }
    function focusField(key) {
      if (nativeInspector) {
        inspectorPref = true;
        openInspector({ focusKey: key });
        return;
      }
      if (!opts.compact && !S.inspectorOpen) {
        S.inspectorOpen = true;
        S.focus = false;
        layout();
      }
      const field_ = panel.querySelector('[data-key="'.concat(CSS.escape(key), '"]'));
      if (field_) {
        field_.focus();
        field_.select?.();
      }
    }
    async function importCaptions(file) {
      let text = "";
      try {
        text = await file.text();
      } catch {
        text = "";
      }
      const { cues: got, errors } = parseSrt(text);
      if (!got.length) {
        notify(ctx2, t2("captions-import-empty", { name: file.name }), "warn");
        return;
      }
      const had = cues().length;
      if (!commitCaptions(got, null, { force: true })) return;
      notify(ctx2, t2(had ? "captions-replaced" : "captions-imported", { n: got.length, m: had }));
      if (errors.length) notify(ctx2, t2("captions-import-skipped", { name: file.name, n: errors.length, line: errors[0].line }), "warn");
    }
    async function exportSrt() {
      const text = formatSrt(cues()) + "\n", stem = path.replace(/\.fvs\.md$/i, "");
      if (!text.trim()) return;
      let out = "".concat(stem, ".srt");
      for (let k = 2; k < 1e3; k++) {
        const have = await Promise.resolve(app2.readFile(out)).catch(() => null);
        if (have === null || have === void 0 || have === text) break;
        out = "".concat(stem, "-").concat(k, ".srt");
      }
      try {
        await app2.writeFile(out, text);
        notify(ctx2, t2("captions-exported", { path: out }));
      } catch (e) {
        notify(ctx2, String(e && e.message || e), "warn");
      }
    }
    function splitAtPlayhead() {
      const s = sceneUnderPlayhead();
      if (!s || typeof splitScene !== "function") return;
      const at = Math.round(S.time * fps()) / fps();
      if (at <= s.t0 + 1 / fps() - 1e-6 || at >= s.t1 - 1 / fps() + 1e-6) {
        notify(ctx2, t2("split-edge"), "warn");
        return;
      }
      const id = freeId(S.p, s.id);
      if (tryCommit((src) => splitScene(src, s.id, at, id))) {
        S.sel = id;
        renderAll();
      }
    }
    function duplicateSelected() {
      const s = selScene();
      if (!s) return;
      const id = freeId(S.p, s.id);
      if (tryCommit((src) => duplicateScene(src, s.id, id, s.title ? t2("copy-title", { title: s.title }) : ""))) selectScene(id);
    }
    function deleteSelected() {
      if (S.selCap !== null) {
        deleteCaption(S.selCap);
        return;
      }
      if (S.selHit) {
        const { scene, index } = S.selHit;
        S.selHit = null;
        const s2 = sceneById(S.p, scene);
        if (s2) tryCommit((src) => setHits(src, scene, s2.hits.filter((_, k) => k !== index)));
        return;
      }
      if (S.selEl) return;
      const s = selScene();
      if (!s) return;
      const next = S.p.scenes[s.index + 1] || S.p.scenes[s.index - 1];
      if (tryCommit((src) => deleteScene(src, s.id))) {
        notify(ctx2, t2("deleted", { id: s.title || s.id }));
        if (next) selectScene(next.id);
        else {
          S.sel = null;
          renderAll();
        }
      }
    }
    function insertAfter() {
      return S.sel || (S.p.scenes.length ? S.p.scenes.at(-1).id : null);
    }
    function addTemplate(tpl) {
      const id = freeId(S.p, tpl.id);
      if (tryCommit((src) => insertScene(src, insertAfter(), sceneFromTemplate(tpl, { id, tempo: S.p.tempo, zh: !t2.en() })))) selectScene(id);
    }
    const sanitize = (name) => name.replace(/[^\w.\-一-鿿]+/g, "-").replace(/^-+|-+$/g, "") || "media";
    async function freeRel(folder, name, existing) {
      const dot = name.lastIndexOf("."), stem = dot > 0 ? name.slice(0, dot) : name, ext = dot > 0 ? name.slice(dot) : "";
      for (let k = 1; k < 1e3; k++) {
        const rel = "".concat(folder, "/").concat(k === 1 ? stem : "".concat(stem, "-").concat(k)).concat(ext), vp = joinPath(dirOf2(path), rel);
        const taken2 = existing ? existing.has(vp) : await app2.readBytes?.(vp).catch(() => null) != null;
        if (!taken2) return rel;
      }
      throw new Error("no free name for ".concat(name));
    }
    function mediaDuration(source) {
      if (!source) return Promise.resolve(0);
      return new Promise((resolve) => {
        const local = typeof source !== "string", url = local ? URL.createObjectURL(source) : source, v = document.createElement("video");
        const done = (x) => {
          clearTimeout(timer);
          if (local) URL.revokeObjectURL(url);
          v.removeAttribute("src");
          resolve(x);
        };
        const timer = setTimeout(() => done(0), 8e3);
        v.preload = "metadata";
        v.muted = true;
        v.onloadedmetadata = () => done(Number.isFinite(v.duration) ? v.duration : 0);
        v.onerror = () => done(0);
        v.src = url;
      });
    }
    async function placeMedia(rel, kind, { after = insertAfter(), at = 0, title = rel.split("/").pop().replace(/\.[^.]+$/, ""), duration = () => 0 } = {}) {
      if (S.disposed) return null;
      if (kind === "audio") {
        const list2 = rawTracks(), track3 = { src: rel, role: list2.length ? "track" : "score", ...at > 0 ? { at: Math.round(at * 1e3) / 1e3 } : {} };
        return tryCommit((src) => setProjectMeta(src, { audio: [...list2, track3] })) ? "track" : null;
      }
      const seconds = kind === "video" ? await duration() : 0;
      if (S.disposed) return null;
      const id = freeId(S.p, kind === "video" ? "clip" : "picture");
      const scene = mediaScene({ id, title, src: rel, kind, seconds: seconds || 5, tempo: S.p.tempo });
      return tryCommit((src) => insertScene(src, after, scene)) ? id : null;
    }
    async function placeFromBin(vp, after, at) {
      const dir = dirOf2(path), rel = !dir ? vp : vp.startsWith("".concat(dir, "/")) ? vp.slice(dir.length + 1) : "", kind = KIND(rel);
      if (!["image", "video", "audio"].includes(kind)) {
        notify(ctx2, t2("bin-outside"), "warn");
        return;
      }
      const got = await placeMedia(rel, kind, { after, at, duration: () => mediaDuration(app2.assetUrl?.(vp)) });
      if (got && got !== "track") selectScene(got);
    }
    let imports = Promise.resolve();
    function importFiles(files, afterId, place2 = true) {
      const job = imports.then(() => importBatch(files, afterId, place2));
      imports = job.catch(() => {
      });
      return job;
    }
    async function importBatch(files, afterId, place2 = true) {
      if (!files.length || S.disposed) return;
      const listed = async () => {
        try {
          const list2 = await app2.listFiles?.();
          return list2 ? new Set(list2) : null;
        } catch {
          return null;
        }
      };
      let existing = await listed();
      let after = afterId !== void 0 ? afterId : insertAfter(), added = null, tracks = 0, stored = 0;
      for (const file of files) {
        const kind = KIND(file.name);
        if (!kind) {
          notify(ctx2, t2("import-skip", { name: file.name }), "warn");
          continue;
        }
        if (kind === "captions") {
          await importCaptions(file);
          continue;
        }
        if (!app2.writeBytes) {
          notify(ctx2, t2("import-unsupported"), "warn");
          continue;
        }
        try {
          const bytes = new Uint8Array(await file.arrayBuffer());
          if (S.disposed) existing = await listed();
          const rel = await freeRel(kind === "audio" ? "audio" : "media", sanitize(file.name), existing);
          await app2.writeBytes(joinPath(dirOf2(path), rel), bytes);
          existing?.add(joinPath(dirOf2(path), rel));
          if (!place2 || S.disposed) {
            stored++;
            continue;
          }
          const got = await placeMedia(rel, kind, { after, title: file.name.replace(/\.[^.]+$/, ""), duration: () => mediaDuration(file) });
          if (got === "track") tracks++;
          else if (got) {
            after = got;
            added = got;
          }
        } catch (e) {
          notify(ctx2, String(e && e.message || e), "warn");
        }
      }
      if (added) selectScene(added);
      if (added || tracks || stored) notify(ctx2, t2("imported"));
    }
    let dropHint = null;
    const dragged = (e) => {
      const types = [...e.dataTransfer?.types || []];
      return types.includes(BIN_MIME) ? "bin" : types.includes("Files") ? "files" : null;
    };
    function acceptDrops(box) {
      const endDrop = () => {
        box.classList.remove("dropping");
        dropHint?.remove();
        dropHint = null;
      };
      const over = (e) => {
        if (!dragged(e) || opts.compact) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        box.classList.add("dropping");
        if (scroller.contains(e.target)) {
          const Z = S.zoom || 20, x = timeAt(e);
          const k = S.p.scenes.filter((s) => (s.t0 + s.t1) / 2 < x).length;
          if (!dropHint) {
            dropHint = h("div", { class: "fvs-tl-insert" });
            inner.append(dropHint);
          }
          dropHint.style.left = "".concat((k < S.p.scenes.length ? S.p.scenes[k].t0 : S.p.length) * Z, "px");
          dropHint.dataset.index = String(k);
        } else {
          dropHint?.remove();
          dropHint = null;
        }
      };
      const leave = (e) => {
        if (!box.contains(e.relatedTarget)) endDrop();
      };
      const drop = (e) => {
        const from = dragged(e);
        if (!from || opts.compact) return;
        e.preventDefault();
        const k = dropHint ? +dropHint.dataset.index : null;
        endDrop();
        const afterId = k === null ? void 0 : k === 0 ? "" : S.p.scenes[k - 1].id;
        if (from === "files") {
          void importFiles([...e.dataTransfer.files], afterId);
          return;
        }
        let vp = "";
        try {
          vp = JSON.parse(e.dataTransfer.getData(BIN_MIME)).path || "";
        } catch {
          vp = "";
        }
        if (vp) void placeFromBin(vp, afterId, k === null ? S.time : k < S.p.scenes.length ? S.p.scenes[k].t0 : S.p.length);
      };
      box.addEventListener("dragover", over);
      box.addEventListener("dragleave", leave);
      box.addEventListener("drop", drop);
      return () => {
        endDrop();
        box.removeEventListener("dragover", over);
        box.removeEventListener("dragleave", leave);
        box.removeEventListener("drop", drop);
      };
    }
    acceptDrops(root);
    function openTemplates(anchor) {
      const grid_ = h("div", { class: "fvs-template-grid" });
      const frames = [];
      for (const tpl of SCENE_TEMPLATES) {
        const shot = h("span", { class: "fvs-template-shot" });
        const card = h(
          "button",
          { type: "button", class: "fvs-template", onclick: () => {
            handle.close();
            addTemplate(tpl);
          } },
          shot,
          h("b", { text: t2.en() ? tpl.name.en : tpl.name.zh }),
          h("small", { text: t2.en() ? tpl.hint.en : tpl.hint.zh })
        );
        grid_.append(card);
        if (!S.trusted) continue;
        try {
          const id = freeId(S.p, tpl.id);
          const p2 = parseProject(insertScene(S.text, null, sceneFromTemplate(tpl, { id, tempo: S.p.tempo, zh: !t2.en() })));
          const sc = sceneById(p2, id);
          void previewHtml({ ...p2, scenes: [sc], captions: [] }, path, assets).then((html) => {
            if (!shot.isConnected) return;
            const f = h("iframe", { sandbox: "allow-scripts", tabindex: "-1", "aria-hidden": "true" });
            f.srcdoc = html;
            frames.push({ f, t: sc.t1 - 0.05 });
            shot.append(f);
          });
        } catch {
        }
      }
      const ready2 = (e) => {
        const fr = frames.find((x) => x.f.contentWindow === e.source);
        if (fr && e.data?.fvs === "ready") fr.f.contentWindow.postMessage({ fvs: "seek", t: fr.t }, "*");
      };
      window.addEventListener("message", ready2);
      const handle = openPopover(
        anchor,
        h("div", { class: "fvs-templates" }, h("div", { class: "fvs-pop-head" }, h("strong", { text: t2("templates") }), h("small", { text: t2("templates-hint") })), grid_),
        { label: t2("templates"), className: "fvs-templates-pop", onClose: () => window.removeEventListener("message", ready2) }
      );
      grid_.style.setProperty("--fv-ratio", String((+S.p.meta.width || 1920) / (+S.p.meta.height || 1080)));
    }
    function openSync(anchor) {
      const body = h("div", { class: "fvs-sync-pop" }, h("div", { class: "fvs-pop-head" }, h("strong", { text: t2("sync") })));
      body.append(h(
        "div",
        { class: "fvs-legend" },
        h("span", { class: "ok" }, h("i"), t2("sync-hit")),
        h("span", { class: "weak" }, h("i"), t2("sync-miss")),
        h("span", { class: "quiet" }, h("i"), t2("sync-quiet"))
      ));
      if (!laneTracks().length) body.append(h("p", { class: "fvs-hint", text: t2("sync-none") }));
      else if (!S.sync) body.append(h("p", { class: "fvs-hint", text: t2("sync-analyzing") }));
      else {
        const bad = S.sync.filter((r) => !r.ok);
        body.append(h("p", { class: "fvs-hint", text: bad.length ? t2("sync-bad", { n: S.sync.length, bad: bad.length }) : t2("sync-ok", { n: S.sync.length }) }));
        if (bad.length) {
          body.append(h("div", { class: "fvs-sync-list" }, ...bad.slice(0, 40).map((r) => h(
            "button",
            { type: "button", onclick: () => {
              handle.close();
              S.sel = r.scene;
              seek(r.t);
              renderTimeline();
            } },
            h("span", { text: fmtTime(r.t) }),
            h("span", { text: "".concat(sceneById(S.p, r.scene)?.title || r.scene, " \xB7 h").concat(r.hit) })
          ))));
          body.append(h("button", { type: "button", class: "fvs-btn", onclick: () => {
            handle.close();
            askFor("sync");
          } }, icon("Sparkles"), t2("sync-fix")));
        }
      }
      const handle = openPopover(anchor, body, { label: t2("sync") });
    }
    function openShortcuts(anchor) {
      const rows = [
        ["key-space", t2("key-space")],
        ["shortcut-frame", "\u2190 \u2192"],
        ["shortcut-beat", "\u21E7 \u2190 \u2192"],
        ["shortcut-scene", "\u2191 \u2193"],
        ["split", "S"],
        ["duplicate", "".concat(MOD, "D")],
        ["delete", "\u232B"],
        ["undo", "".concat(MOD, "Z")],
        ["redo", "\u21E7".concat(MOD, "Z")],
        ["shortcut-text", t2("shortcut-dblclick")],
        ["captions-add", t2("captions-lane-dbl")],
        ["zoom-in", "="],
        ["zoom-out", "-"],
        ["zoom-fit-hint", "\u21E7Z"],
        ["shortcut-zoom", "".concat(MOD.replace(/\+$/, ""), " + ").concat(t2("wheel-or-pinch"))]
      ];
      openPopover(anchor, h(
        "div",
        { class: "fvs-keys" },
        h("div", { class: "fvs-pop-head" }, h("strong", { text: t2("shortcuts") })),
        h("dl", {}, ...rows.flatMap(([k, keys]) => [h("dt", { text: k === "key-space" ? t2("play") : t2(k) }), h("dd", {}, h("kbd", { text: keys }))]))
      ), { label: t2("shortcuts"), align: "end" });
    }
    function openExportMenu(anchor) {
      openMenu(anchor, [
        { icon: "Film", label: t2("export-mp4"), hint: t2("export-mp4-hint"), run: () => openExportPanel(anchor) },
        { icon: "Globe", label: t2("export-html"), hint: t2("export-html-hint"), run: () => exportWeb() },
        { icon: "Captions", label: t2("export-srt"), hint: t2("export-srt-hint"), disabled: !cues().length, run: () => void exportSrt() },
        "-",
        { icon: "Terminal", label: t2("export-cmd"), hint: t2("export-cmd-hint"), run: () => copyRenderCommand() }
      ], { label: t2("export"), align: "end" });
    }
    function openMoreMenu(anchor) {
      openMenu(anchor, [
        opts.compact && opts.showInMain ? { icon: "Maximize2", label: t2("show-in-main"), run: opts.showInMain } : null,
        !opts.view && opts.openWorkspace ? { icon: "Clapperboard", label: t2("open-workspace"), run: opts.openWorkspace } : null,
        !opts.compact && opts.openMini ? { icon: "PictureInPicture2", label: t2("mini-preview"), run: opts.openMini } : null,
        !opts.compact && opts.openFloating ? { icon: "AppWindow", label: t2("floating-workspace"), run: opts.openFloating } : null,
        ...opts.closeProject ? ["-", { icon: "X", label: t2("close-project"), run: () => void opts.closeProject() }] : []
      ], { label: t2("more"), align: "end" });
    }
    async function exportWeb() {
      try {
        const out = await exportHtml(ctx2, S.p, path, assets);
        notify(ctx2, t2("exported", { path: out }));
      } catch (e) {
        notify(ctx2, String(e && e.message || e), "warn");
      }
    }
    async function copyRenderCommand() {
      let tools = null;
      try {
        tools = await ensureTools(ctx2);
      } catch {
        tools = null;
      }
      const mp4 = path.replace(/\.fvs\.md$/i, "") + ".mp4";
      const abs = app2.hostPath ? app2.hostPath(path) : null;
      const cmd = 'node "'.concat(tools && (tools.cliAbs || tools.cli) || "fvs.mjs", '" render "').concat(abs || path, '" --out "').concat(app2.hostPath && app2.hostPath(mp4) || mp4, '"');
      try {
        await navigator.clipboard.writeText(cmd);
      } catch {
      }
      notify(ctx2, cmd);
    }
    const flush = async () => {
      if (saving) await saving.catch(() => {
      });
      await save();
      return S.text === S.saved;
    };
    const exports = exportController(ctx2, () => S, assets, t2, flush);
    const director = opts.chat ? null : directorController(ctx2, () => S, t2, flush);
    let inlinePanel = null;
    function openInlinePanel(kind, mount, label) {
      const same = inlinePanel?.kind === kind;
      closeInlinePanel();
      if (same) return;
      const shell = h(
        "div",
        { class: "fvs-sheet", role: "dialog", "aria-label": label },
        h("div", { class: "fvs-sheet-head" }, h("strong", { text: label }), tool("X", "close", () => closeInlinePanel()))
      );
      const body = h("div", { class: "fvs-sheet-body" });
      shell.append(body);
      root.append(shell);
      inlinePanel = { kind, shell, dispose: mount(body) };
      aiBtn.setAttribute("aria-pressed", String(kind === "director"));
    }
    function closeInlinePanel() {
      if (!inlinePanel) return;
      inlinePanel.dispose?.();
      inlinePanel.shell.remove();
      inlinePanel = null;
      aiBtn.setAttribute("aria-pressed", "false");
    }
    function openExportPanel() {
      if (opts.view?.extendView) exportHandle = opts.view.extendView.open({ id: "fvs-export", title: t2("export"), side: "right", mount: exports.mount, onClose(reason) {
        exportHandle = null;
        sidePanelClosed(reason);
      } });
      else openInlinePanel("export", exports.mount, t2("export"));
    }
    const ASKS = { scene: null, pace: null, copy: null, score: TASKS.score, sync: TASKS.sync, review: TASKS.review };
    const ASK_ICONS = { scene: "Film", pace: "Scissors", copy: "Pencil", score: "Music2", sync: "Check", review: "Eye" };
    function askFor(kind) {
      if (!opts.chat) {
        void handOff(ctx2, S, ASKS[kind](), t2);
        return;
      }
      opts.chat.reveal();
      opts.chat.prefill(ASKS[kind] ? t2("ai-ask-".concat(kind)) : t2("ai-chip-".concat(kind)) + (t2.en() ? ": " : "\uFF1A"));
      notify(ctx2, t2("chat-task-ready"));
    }
    function openAsk() {
      if (opts.chat) {
        openMenu(aiBtn, [
          { icon: "MessageSquareQuote", label: t2("chat-open"), run: () => opts.chat.reveal() },
          "-",
          { heading: t2("director-quick") },
          ...Object.keys(ASKS).map((kind) => ({ icon: ASK_ICONS[kind], label: t2("ai-chip-".concat(kind)), run: () => askFor(kind) }))
        ], { label: t2("ask-ai"), align: "end" });
        return;
      }
      if (askHandle?.isOpen) {
        askHandle.close();
        return;
      }
      if (opts.view?.extendView) {
        askHandle = opts.view.extendView.open({ id: "fvs-director", title: t2("ai-title"), side: "right", mount: director.mount, onClose(reason) {
          askHandle = null;
          aiBtn.setAttribute("aria-pressed", "false");
          sidePanelClosed(reason);
        } });
        aiBtn.setAttribute("aria-pressed", "true");
      } else openInlinePanel("director", director.mount, t2("ai-title"));
    }
    const field = (label, control, hint) => h("label", { class: "fvs-field" }, h("span", { text: label }), control, hint ? h("small", { class: "fvs-hint", text: hint }) : null);
    const input = (key, value, onCommit, extra = {}) => {
      const x = h("input", { class: "fvs-input", "data-key": key, value: value ?? "", ...extra });
      x.addEventListener("change", () => onCommit(x.value));
      x.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229) x.blur();
      });
      return x;
    };
    const select = (key, options, value, onChange, extra = {}) => h(
      "select",
      { class: "fvs-input", "data-key": key, onchange: (e) => onChange(e.target.value), ...extra },
      ...options.map(([v, label]) => h("option", { value: v, selected: String(v) === String(value) }, label))
    );
    const section = (title, ...kids) => h("section", { class: "fvs-section" }, title ? h("h4", { text: title }) : null, ...kids);
    function codeArea(key, value, onApply) {
      const ta = h("textarea", { class: "fvs-code", "data-key": key, spellcheck: "false", rows: Math.min(28, Math.max(6, (value || "").split("\n").length + 1)) });
      ta.value = value || "";
      const apply = () => {
        if (ta.value !== value) onApply(ta.value);
      };
      ta.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
          e.preventDefault();
          apply();
        }
        if (e.key === "Tab" && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          const a = ta.selectionStart;
          ta.setRangeText("  ", a, ta.selectionEnd, "end");
        }
      });
      ta.addEventListener("blur", apply);
      return h(
        "div",
        { class: "fvs-code-block" },
        ta,
        h(
          "div",
          { class: "fvs-code-footer" },
          h("span", { text: "".concat(MOD, "Enter") }),
          h("button", { type: "button", class: "fvs-btn", onclick: apply }, icon("Check"), t2("apply-code"))
        )
      );
    }
    function renderSide() {
      for (const b of tabs.children) {
        b.setAttribute("aria-selected", String(b.dataset.tab === S.tab));
        b.tabIndex = b.dataset.tab === S.tab ? 0 : -1;
      }
      const focus = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.dataset.key : null;
      const scroll = panel.scrollTop;
      panel.replaceChildren(...{ scene: sceneTab, text: textTab, captions: captionsTab, code: codeTab, project: projectTab }[S.tab]());
      panel.scrollTop = scroll;
      if (focus) {
        const x = panel.querySelector('[data-key="'.concat(CSS.escape(focus), '"]'));
        if (x) x.focus();
      }
    }
    const unitOf = (v) => /bar|小节/i.test(String(v)) ? "bar" : /beat|拍|\db$/i.test(String(v)) ? "beat" : "sec";
    const inUnit = (sec, unit) => {
      const tp = S.p.tempo;
      const x = unit === "bar" ? sec / tp.bar : unit === "beat" ? sec / tp.beat : sec;
      return Math.round(x * 1e3) / 1e3;
    };
    const fromUnit = (x, unit) => {
      const tp = S.p.tempo;
      return unit === "bar" ? x * tp.bar : unit === "beat" ? x * tp.beat : x;
    };
    const lengthValue = (x, unit) => unit === "bar" ? "".concat(x, " ").concat(x === 1 ? "bar" : "bars") : unit === "beat" ? "".concat(x, " ").concat(x === 1 ? "beat" : "beats") : "".concat(x, "s");
    function sceneTab() {
      const s = selScene();
      if (!s) return [h("div", { class: "fvs-empty" }, icon("MousePointerClick"), h("p", { text: t2(S.p.scenes.length ? "scene-none" : "blank-title") }))];
      const tp = S.p.tempo, unit = tp ? S.lengthUnit || unitOf(s.meta.length) : "sec";
      const units = tp ? [["bar", t2("unit-bar")], ["beat", t2("unit-beat")], ["sec", t2("unit-sec")]] : [["sec", t2("unit-sec")]];
      const unitSel = select("sunit", units, unit, (v) => {
        S.lengthUnit = v;
        renderSide();
      }, { "aria-label": t2("unit") });
      const out = [];
      out.push(h(
        "div",
        { class: "fvs-scene-head" },
        h(
          "div",
          {},
          h("span", { class: "fvs-scene-index", text: "".concat(String(s.index + 1).padStart(2, "0"), " / ").concat(S.p.scenes.length) }),
          h("span", { class: "fvs-scene-range", text: "".concat(fmtTime(s.t0), " \u2013 ").concat(fmtTime(s.t1)) })
        ),
        input("stitle", s.title, (v) => tryCommit((src) => renameScene(src, s.id, void 0, v.trim())), { class: "fvs-input fvs-title-input", "aria-label": t2("scene-title"), placeholder: s.id })
      ));
      const len = input("slen", inUnit(s.dur, unit), (v) => {
        const x = +v;
        if (!(x > 0)) {
          renderSide();
          return;
        }
        tryCommit((src) => setSceneMeta(src, s.id, { length: lengthValue(x, unit) }));
      }, { type: "number", min: "0", step: unit === "sec" ? "0.1" : "1", "aria-label": t2("scene-length") });
      const timing = [field(t2("scene-length"), h("div", { class: "fvs-unit-row" }, len, unitSel))];
      if (typeof setSceneIn === "function") {
        timing.push(field(t2("scene-in"), h("div", { class: "fvs-unit-row" }, input("sin", inUnit(s.in || 0, unit), (v) => {
          const x = +v;
          if (!(x >= 0)) {
            renderSide();
            return;
          }
          tryCommit((src) => setSceneIn(src, s.id, fromUnit(x, unit)));
        }, { type: "number", min: "0", step: unit === "sec" ? "0.1" : "1", "aria-label": t2("scene-in") }), h("span", { class: "fvs-unit", text: units.find((u) => u[0] === unit)[1] })), t2("scene-in-hint")));
      }
      timing.push(field(t2("scene-hits"), input("shits", s.hits.join(", "), (v) => tryCommit((src) => setHits(src, s.id, v.split(/[\s,，]+/).filter(Boolean).map(Number).filter((x) => isFinite(x))))), tp ? t2("scene-hits-hint") : t2("scene-hits-hint-sec")));
      out.push(section(t2("timing-section"), ...timing));
      if (typeof setTransition === "function") {
        const types = Array.isArray(TRANSITIONS) ? TRANSITIONS : [];
        const tr = s.transition;
        const durUnit = tp ? "beat" : "sec";
        out.push(section(
          t2("transition"),
          h(
            "div",
            { class: "fvs-row" },
            field(t2("transition-type"), select("strans", [["", t2("tr-none")], ...types.map((k) => [k, t2("tr-".concat(k))])], tr ? tr.type : "", (v) => tryCommit((src) => setTransition(src, s.id, v || null, tr ? tr.dur : void 0)), { disabled: s.index === 0 })),
            tr ? field("".concat(t2("transition-dur"), "\uFF08").concat(t2(durUnit === "beat" ? "unit-beat" : "unit-sec"), "\uFF09"), input("strdur", inUnit(tr.dur, durUnit), (v) => {
              const x = +v;
              if (x > 0) tryCommit((src) => setTransition(src, s.id, tr.type, fromUnit(x, durUnit)));
            }, { type: "number", min: "0", step: durUnit === "sec" ? "0.1" : "0.5" })) : null
          ),
          s.index === 0 ? h("small", { class: "fvs-hint", text: t2("transition-first") }) : null
        ));
      }
      const media = mediaSection(s);
      if (media) out.push(media);
      const timed = timedElements(s.html);
      if (timed.length) {
        const setA = (tag, name, v) => tryCommit((src) => setSceneBlock(src, s.id, "html", setAttr(sceneById(parseProject(src), s.id).html, tag, name, v === "" ? null : v)));
        const rows = [h("div", { class: "fvs-timed head" }, h("small"), h("small", { text: t2("appear") }), h("small", { text: t2("disappear") }), h("small", { text: t2("effect") }))];
        for (const x of timed) {
          const fx = select("tfx:".concat(s.id, ":").concat(x.tag), ["cut", "fade", "up", "down", "left", "right", "pop", "type"].map((k) => [k, t2("fx-".concat(k))]), x.fx || "cut", (v) => setA(x.tag, "data-fx", v === "cut" ? "" : v), { "aria-label": t2("effect"), disabled: !!x.seq && x.in === void 0 });
          const on = S.selEl && S.selEl.scene === s.id && (S.selEl.tag === x.tag || (x.items || []).some((c) => c.tag === S.selEl.tag));
          rows.push(h(
            "div",
            { class: "fvs-timed".concat(on ? " on" : "") },
            h("span", { class: "lbl", title: x.label, text: x.seq !== void 0 ? "".concat(x.label, " \xB7 seq") : x.label }),
            input("tin:".concat(s.id, ":").concat(x.tag), x.seq !== void 0 ? x.seq : x.in ?? "", (v) => setA(x.tag, x.seq !== void 0 ? "data-seq" : "data-in", v.trim()), { "aria-label": t2("appear") }),
            input("tout:".concat(s.id, ":").concat(x.tag), x.out ?? "", (v) => setA(x.tag, "data-out", v.trim()), { "aria-label": t2("disappear") }),
            fx
          ));
        }
        out.push(section(t2("timed"), h("small", { class: "fvs-hint", text: t2("timed-hint") }), ...rows));
        const sel = rows.find((r) => r.classList.contains("on"));
        if (sel) requestAnimationFrame(() => sel.scrollIntoView({ block: "nearest" }));
      }
      out.push(section(t2("scene-actions"), h(
        "div",
        { class: "fvs-scene-actions" },
        h("button", { type: "button", class: "fvs-btn", disabled: s.index === 0, onclick: () => tryCommit((src) => moveScene(src, s.id, s.index - 1)) }, icon("ArrowLeft"), t2("move-up")),
        h("button", { type: "button", class: "fvs-btn", disabled: s.index === S.p.scenes.length - 1, onclick: () => tryCommit((src) => moveScene(src, s.id, s.index + 1)) }, icon("ArrowRight"), t2("move-down")),
        h("button", { type: "button", class: "fvs-btn", onclick: () => duplicateSelected() }, icon("Copy"), t2("duplicate")),
        h("button", { type: "button", class: "fvs-btn danger", onclick: () => deleteSelected() }, icon("Trash2"), t2("delete"))
      )));
      out.push(h(
        "details",
        { class: "fvs-advanced", open: S.advancedOpen, ontoggle: (e) => {
          S.advancedOpen = e.target.open;
        } },
        h("summary", {}, icon("SlidersHorizontal"), t2("advanced")),
        h(
          "div",
          { class: "fvs-section" },
          field(t2("scene-id"), input("sid", s.id, (v) => {
            const nid = v.trim(), old = S.sel;
            S.sel = nid;
            if (!tryCommit((src) => renameScene(src, s.id, nid, void 0))) {
              S.sel = old;
              renderSide();
            }
          })),
          field(t2("scene-class"), input("sclass", s.meta.class ?? "", (v) => tryCommit((src) => setSceneMeta(src, s.id, { class: v.trim() || null }))))
        )
      ));
      const errs = [...S.p.errors.filter((e) => e.scene === s.id), ...S.runtimeErrors.filter((e) => e.scene === s.id)];
      if (errs.length) out.push(section(t2("problems"), h("div", { class: "fvs-problems" }, ...errs.map((e) => h("div", { class: e.level === "warning" ? "w" : "e", text: "".concat(e.line ? "line ".concat(e.line, ": ") : "").concat(e.message) })))));
      return out;
    }
    function mediaSection(s) {
      const imgs = images ? images(s.html) : [], vids = typeof videos === "function" ? videos(s.html) : [];
      if (!imgs.length && !vids.length) return null;
      const rows = [];
      const setA = (tag, name, v) => tryCommit((src) => setSceneBlock(src, s.id, "html", setAttr(sceneById(parseProject(src), s.id).html, tag, name, v)));
      for (const v of vids) {
        const file = h("input", { type: "file", accept: "video/*", hidden: true, onchange: (e) => replaceMedia(s, v.tag, e.target.files[0], "video") });
        rows.push(h(
          "div",
          { class: "fvs-media-row" },
          h("span", { class: "fvs-media-icon" }, icon("Clapperboard")),
          h(
            "div",
            { class: "fvs-media-main" },
            h("span", { class: "fvs-media-name", text: v.src.split("/").pop(), title: v.src }),
            h(
              "div",
              { class: "fvs-row" },
              field(t2("clip-in"), input("vin:".concat(s.id, ":").concat(v.tag), v.clipIn || 0, (x) => setA(v.tag, "data-clip-in", +x > 0 ? String(+x) : null), { type: "number", min: "0", step: "0.1" })),
              field(t2("audio-gain"), input("vg:".concat(s.id, ":").concat(v.tag), v.gain || 0, (x) => setA(v.tag, "data-gain", +x ? String(+x) : null), { type: "number", step: "0.5", disabled: v.muted })),
              h("label", { class: "fvs-check" }, h("input", { type: "checkbox", checked: !!v.muted, onchange: (e) => setA(v.tag, "muted", e.target.checked ? "" : null) }), t2("clip-mute"))
            )
          ),
          file,
          h("button", { type: "button", class: "fvs-btn", onclick: () => file.click() }, t2("replace-media"))
        ));
      }
      for (const im of imgs) {
        const vp = joinPath(dirOf2(path), im.src);
        const thumb = h("img", { alt: "", class: "fvs-media-thumb" });
        if (!/^data:/.test(im.src)) assets.get(vp).then((u) => {
          if (u) thumb.src = u;
        });
        else thumb.src = im.src;
        const file = h("input", { type: "file", accept: "image/*", hidden: true, onchange: (e) => replaceMedia(s, im.tag, e.target.files[0], "image") });
        rows.push(h(
          "div",
          { class: "fvs-media-row" },
          thumb,
          h("div", { class: "fvs-media-main" }, h("span", { class: "fvs-media-name", text: /^data:/.test(im.src) ? t2("placeholder-image") : im.src.split("/").pop(), title: /^data:/.test(im.src) ? "" : im.src })),
          file,
          h("button", { type: "button", class: "fvs-btn", onclick: () => file.click() }, t2("replace-image"))
        ));
      }
      return section(t2("media"), ...rows);
    }
    async function replaceMedia(s, tag, file, kind) {
      if (!file || !app2.writeBytes) return;
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const rel = await freeRel("media", sanitize(file.name), null);
        await app2.writeBytes(joinPath(dirOf2(path), rel), bytes);
        assets.cache.delete(joinPath(dirOf2(path), rel));
        tryCommit((src) => {
          let out = setSceneBlock(src, s.id, "html", setAttr(sceneById(parseProject(src), s.id).html, tag, "src", rel));
          if (kind === "video") out = setSceneBlock(out, s.id, "html", setAttr(sceneById(parseProject(out), s.id).html, tag, "data-clip-in", null));
          return out;
        });
      } catch (e) {
        notify(ctx2, String(e && e.message || e), "warn");
      }
    }
    function textTab() {
      const out = [h(
        "div",
        { class: "fvs-text-head" },
        h("small", { class: "fvs-hint", text: t2("texts-hint") }),
        h("label", { class: "fvs-check" }, h("input", { type: "checkbox", checked: S.allTexts, onchange: (e) => {
          S.allTexts = e.target.checked;
          renderSide();
        } }), t2("all-scenes"))
      )];
      const scenes = S.allTexts ? S.p.scenes : [selScene()].filter(Boolean);
      if (!scenes.length) return [h("div", { class: "fvs-empty" }, icon("MousePointerClick"), h("p", { text: t2(S.p.scenes.length ? "scene-none" : "blank-title") }))];
      for (const s of scenes) {
        const runs = scan(s.html).texts;
        if (S.allTexts) out.push(h("h4", {}, h("button", { type: "button", class: "fvs-link", onclick: () => selectScene(s.id) }, "".concat(String(s.index + 1).padStart(2, "0"), " \xB7 ").concat(s.title || s.id))));
        if (!runs.length) {
          out.push(h("p", { class: "fvs-hint", text: t2("texts-none") }));
          continue;
        }
        const list2 = h("div", { class: "fvs-list" });
        runs.forEach((run) => {
          const on = S.selText && S.selText.scene === s.id && S.selText.index === run.index;
          const ta = h("textarea", { class: "fvs-input", "data-key": "text:".concat(s.id, ":").concat(run.index), rows: Math.min(5, Math.max(1, Math.ceil(run.text.trim().length / 30))), "aria-label": run.text.trim().slice(0, 40) });
          ta.value = run.text.trim();
          const apply = () => {
            if (ta.value.trim() !== run.text.trim()) tryCommit((src) => setSceneBlock(src, s.id, "html", replaceText(sceneById(parseProject(src), s.id).html, run.index, ta.value)));
          };
          ta.addEventListener("change", apply);
          ta.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.keyCode !== 229) {
              e.preventDefault();
              ta.blur();
            }
          });
          ta.addEventListener("focus", () => post({ fvs: "outline", scene: s.id, text: run.index }));
          ta.addEventListener("blur", () => post({ fvs: "outline", scene: s.id }));
          const item = h("div", { class: "fvs-text-item".concat(on ? " on" : "") }, ta);
          if (ctx2.tangu && ctx2.tangu.complete) item.append(h("div", { class: "fvs-meta" }, h("button", { type: "button", class: "fvs-link", onclick: () => aiRewrite(item, s, run) }, icon("Sparkles"), t2("ai-rewrite"))));
          list2.append(item);
          if (on) requestAnimationFrame(() => item.scrollIntoView({ block: "nearest" }));
        });
        out.push(list2);
      }
      return out;
    }
    async function aiRewrite(item, s, run) {
      const how = app2.prompt ? await app2.prompt(t2("rewrite-prompt"), t2("rewrite-default")) : t2("rewrite-default");
      if (how === null || how === void 0) return;
      const box = h("div", { class: "fvs-suggest", text: "\u2026" });
      item.append(box);
      try {
        const v = await rewrite(ctx2, run.text.trim(), how || t2("rewrite-default"));
        if (!v) {
          box.remove();
          return;
        }
        box.replaceChildren(h("div", { text: v }), h(
          "div",
          { class: "fvs-row" },
          h("button", { type: "button", class: "fvs-btn primary", onclick: () => tryCommit((src) => setSceneBlock(src, s.id, "html", replaceText(sceneById(parseProject(src), s.id).html, run.index, v))) }, t2("accept")),
          h("button", { type: "button", class: "fvs-btn", onclick: () => box.remove() }, t2("discard"))
        ));
      } catch (e) {
        box.textContent = String(e && e.message || e);
      }
    }
    function captionsTab() {
      const list2 = cues(), look = captionStyle(S.p.meta);
      const setLook = (patch) => {
        const next = { ...look, ...patch };
        const value = { ...next.position !== "bottom" ? { position: next.position } : {}, ...next.size !== "medium" ? { size: next.size } : {} };
        tryCommit((src) => setProjectMeta(src, { captions: Object.keys(value).length ? value : null }));
      };
      const seg = (key, options, value, pick) => h(
        "div",
        { class: "fvs-segmented", role: "radiogroup", "aria-label": t2(key), "data-key": key },
        ...options.map(([v, label]) => h("button", { type: "button", role: "radio", "aria-checked": String(v === value), onclick: () => {
          if (v !== value) pick(v);
        } }, label))
      );
      const group = (label, control) => h("div", { class: "fvs-field" }, h("span", { text: label }), control);
      const file = h("input", { type: "file", accept: ".srt,.vtt", hidden: true, onchange: (e) => {
        const f = e.target.files[0];
        e.target.value = "";
        if (f) void importCaptions(f);
      } });
      const out = [
        h(
          "div",
          { class: "fvs-cap-actions" },
          h("button", { type: "button", class: "fvs-btn", "data-key": "cap-add", onclick: () => addCaption() }, icon("Plus"), t2("captions-add")),
          file,
          h("button", { type: "button", class: "fvs-btn ghost", title: t2("captions-import"), onclick: () => file.click() }, icon("Upload"), t2("import-short")),
          h("button", { type: "button", class: "fvs-btn ghost", title: t2("captions-export"), disabled: !list2.length, onclick: () => void exportSrt() }, icon("Download"), t2("export-short"))
        ),
        h("small", { class: "fvs-hint", text: t2("captions-hint") }),
        section(t2("captions-look"), h(
          "div",
          { class: "fvs-row" },
          group(t2("captions-position"), seg("captions-position", [["bottom", t2("captions-bottom")], ["top", t2("captions-top")]], look.position, (v) => setLook({ position: v }))),
          group(t2("captions-size"), seg("captions-size", [["small", t2("captions-small")], ["medium", t2("captions-medium")], ["large", t2("captions-large")]], look.size, (v) => setLook({ size: v })))
        ))
      ];
      if (!list2.length) out.push(h("div", { class: "fvs-empty" }, icon("Captions"), h("p", { text: t2("captions-none") })));
      const rows = list2.map((c, i) => [c, i]).sort((a, b) => a[0].start - b[0].start).map(([c, i]) => {
        const put = (next) => commitCaptions(list2.map((y, j) => j === i ? next : y), next);
        const time = (k) => input("cap:".concat(i, ":").concat(k), +c[k].toFixed(3), (x) => {
          const next = { ...c, [k]: +x };
          if (x === "" || !(next.start >= 0) || !(next.end > next.start)) {
            renderSide();
            return;
          }
          put(next);
        }, { type: "number", min: "0", step: "0.1", "aria-label": t2(k === "start" ? "caption-start" : "caption-end") });
        const ta = h("textarea", { class: "fvs-input", "data-key": "cap:".concat(i, ":text"), rows: Math.min(4, Math.max(1, c.text.split("\n").length)), "aria-label": t2("caption-text") });
        ta.value = c.text;
        ta.addEventListener("change", () => {
          const v = ta.value.trim();
          if (v !== c.text) put({ ...c, text: v });
        });
        ta.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.keyCode !== 229) {
            e.preventDefault();
            ta.blur();
          }
        });
        ta.addEventListener("focus", () => {
          if (S.selCap !== i) {
            S.selCap = i;
            renderCaptions();
            renderToolbar();
          }
          if (S.time < c.start || S.time >= c.end) seek(c.start);
        });
        const row = h(
          "div",
          { class: "fvs-cap-item".concat(S.selCap === i ? " on" : "") },
          h(
            "div",
            { class: "fvs-cap-times" },
            time("start"),
            h("span", { class: "fvs-unit", text: "\u2192" }),
            time("end"),
            h("span", { class: "fvs-unit", text: t2("unit-sec") }),
            h("button", { type: "button", class: "fvs-btn icon", title: t2("caption-delete"), "aria-label": t2("caption-delete"), onclick: () => deleteCaption(i) }, icon("Trash2"))
          ),
          ta
        );
        if (S.selCap === i) requestAnimationFrame(() => row.scrollIntoView({ block: "nearest" }));
        return row;
      });
      if (rows.length) out.push(section(t2("captions-count", { n: list2.length }), h("div", { class: "fvs-cap-list" }, ...rows)));
      const errs = S.p.errors.filter((e) => e.captions), bad = captionErrors().length;
      if (errs.length) out.push(section(
        t2("problems"),
        bad ? h("p", { class: "fvs-hint", text: t2("captions-unreadable", { n: bad }) }) : null,
        bad ? h("button", { type: "button", class: "fvs-btn danger", onclick: () => commitCaptions(list2, null, { force: true }) }, icon("Trash2"), t2("captions-keep-readable")) : null,
        h("div", { class: "fvs-problems" }, ...errs.map((e) => h("div", { class: e.level === "warning" ? "w" : "e", text: "".concat(e.line ? "line ".concat(e.line, ": ") : "").concat(e.message) })))
      ));
      return out;
    }
    function codeTab() {
      const s = selScene();
      const seg = (key, label, disabled) => h("button", { type: "button", role: "radio", "aria-checked": String(S.codeScope === key), disabled, onclick: () => {
        S.codeScope = key;
        renderSide();
      } }, label);
      const out = [h(
        "div",
        { class: "fvs-segmented", role: "radiogroup", "aria-label": t2("code-scope") },
        seg("scene", "".concat(t2("code-scene")).concat(s ? " \xB7 ".concat(s.title || s.id) : ""), !s),
        seg("project", t2("code-project"))
      ), h("small", { class: "fvs-hint", text: t2("code-apply") })];
      if (S.codeScope === "scene" && s) {
        out.push(field(t2("code-html"), codeArea("c:".concat(s.id, ":html"), s.html, (v) => tryCommit((src) => setSceneBlock(src, s.id, "html", v)))));
        out.push(field(t2("code-css"), codeArea("c:".concat(s.id, ":css"), s.css, (v) => tryCommit((src) => setSceneBlock(src, s.id, "css", v)))));
        out.push(field(t2("code-js"), codeArea("c:".concat(s.id, ":js"), s.js, (v) => tryCommit((src) => setSceneBlock(src, s.id, "js", v)))));
      } else {
        const blocks = cssBlocks(S.p);
        (blocks.length ? blocks : [""]).forEach((b, i) => out.push(field("".concat(t2("code-global-css")).concat(blocks.length > 1 ? " ".concat(i + 1) : ""), codeArea("g:css:".concat(i), b, (v) => tryCommit((src) => setProjectBlock(src, "css", v, i))))));
        out.push(field(t2("code-stage-html"), codeArea("g:html", stageHtml(S.p), (v) => tryCommit((src) => setProjectBlock(src, "html", v)))));
        out.push(field(t2("code-stage-js"), codeArea("g:js", stageJs(S.p), (v) => tryCommit((src) => setProjectBlock(src, "js", v)))));
      }
      return out;
    }
    function projectTab() {
      const m = S.p.meta, tp = S.p.tempo;
      const setM = (patch) => tryCommit((src) => setProjectMeta(src, patch));
      const num2 = (v) => {
        const x = +v;
        return isFinite(x) && x > 0 ? x : null;
      };
      const out = [];
      const presets = [[1920, 1080, "frame-landscape"], [1080, 1920, "frame-portrait"], [1080, 1080, "frame-square"], [1440, 1080, "frame-classic"], [3840, 2160, "frame-4k"]];
      const known = presets.find(([w, hh]) => w === +m.width && hh === +m.height);
      out.push(section(
        null,
        field(t2("project-title"), input("ptitle", m.title || "", (v) => setM({ title: v.trim() || null }))),
        h("small", { class: "fvs-hint", text: t2("project-length", { len: S.p.length.toFixed(2), n: S.p.scenes.length }) })
      ));
      out.push(section(
        t2("frame-section"),
        field(t2("project-size"), select("psize", [...known ? [] : [["", "".concat(m.width, " \xD7 ").concat(m.height)]], ...presets.map(([w, hh, k]) => ["".concat(w, "x").concat(hh), "".concat(t2(k), " \xB7 ").concat(w, " \xD7 ").concat(hh)])], known ? "".concat(known[0], "x").concat(known[1]) : "", (v) => {
          const [w, hh] = v.split("x").map(Number);
          if (w) setM({ width: w, height: hh });
        })),
        h(
          "div",
          { class: "fvs-row" },
          field(t2("project-fps"), input("pfps", m.fps, (v) => num2(v) && setM({ fps: num2(v) }), { type: "number", min: "1", max: "120" })),
          field(t2("project-bg"), h(
            "div",
            { class: "fvs-color-row" },
            h("input", { type: "color", "aria-label": t2("project-bg"), value: /^#[0-9a-f]{6}$/i.test(m.background || "") ? m.background : "#000000", onchange: (e) => setM({ background: e.target.value }) }),
            input("pbg", m.background || "", (v) => setM({ background: v.trim() || null }), { placeholder: "#000000" })
          ))
        )
      ));
      out.push(section(
        t2("tempo-section"),
        h(
          "div",
          { class: "fvs-row" },
          field(t2("project-bpm"), input("pbpm", tp ? tp.bpm : "", (v) => setM({ tempo: +v > 0 ? { bpm: +v, beatsPerBar: tp ? tp.beatsPerBar : 4 } : null }), { type: "number", min: "20", max: "400", placeholder: t2("tempo-none") })),
          field(t2("project-meter"), input("pmeter", tp ? tp.beatsPerBar : 4, (v) => tp && +v > 0 && setM({ tempo: { bpm: tp.bpm, beatsPerBar: +v } }), { type: "number", min: "1", max: "16", disabled: !tp }))
        ),
        h("small", { class: "fvs-hint", text: t2("tempo-hint") })
      ));
      const tracks = audioTracks(m);
      const rows = tracks.map((a, i) => h(
        "div",
        { class: "fvs-track-card", "data-track": String(a.id) },
        h(
          "div",
          { class: "fvs-track-head" },
          icon("Music2"),
          h("span", { class: "fvs-media-name", text: a.src.split("/").pop(), title: a.src }),
          h("label", { class: "fvs-check" }, h("input", { type: "checkbox", checked: !!a.mute, onchange: (e) => setTrack(a.id, { mute: e.target.checked || void 0 }) }), t2("clip-mute")),
          h("button", { type: "button", class: "fvs-btn icon", title: t2("audio-remove"), "aria-label": t2("audio-remove"), onclick: () => removeTrack(a.id) }, icon("Trash2"))
        ),
        h(
          "div",
          { class: "fvs-row" },
          field(t2("audio-at"), input("au:".concat(i, ":at"), a.at || 0, (v) => setTrack(a.id, { at: +v || void 0 }), { type: "number", step: "0.01", min: "0" })),
          "in" in a ? field(t2("audio-in"), input("au:".concat(i, ":in"), a.in || 0, (v) => setTrack(a.id, { in: +v || void 0 }), { type: "number", step: "0.01", min: "0" })) : null,
          "dur" in a ? field(t2("audio-dur"), input("au:".concat(i, ":dur"), a.dur ?? "", (v) => setTrack(a.id, { dur: +v > 0 ? +v : void 0 }), { type: "number", step: "0.01", min: "0", placeholder: t2("audio-dur-full") })) : null,
          field(t2("audio-gain"), input("au:".concat(i, ":gain"), a.gain || 0, (v) => setTrack(a.id, { gain: +v || void 0 }), { type: "number", step: "0.5" }))
        )
      ));
      const file = h("input", { type: "file", accept: "audio/*", multiple: true, hidden: true, onchange: (e) => {
        const files = [...e.target.files];
        e.target.value = "";
        void importFiles(files);
      } });
      const audio = section(
        t2("project-audio"),
        ...rows.length ? rows : [h("p", { class: "fvs-hint", text: t2("sync-none") })],
        h(
          "div",
          { class: "fvs-row" },
          file,
          h("button", { type: "button", class: "fvs-btn", disabled: !app2.writeBytes, onclick: () => file.click() }, icon("Plus"), t2("audio-add")),
          h("button", { type: "button", class: "fvs-btn ghost", title: t2("score-hint"), onclick: () => askFor("score") }, icon("Sparkles"), t2("score-ask")),
          tracks.length ? h("button", { type: "button", class: "fvs-btn ghost", onclick: (e) => openSync(e.currentTarget) }, t2("sync")) : null
        )
      );
      audio.classList.add("fvs-audio-tracks");
      out.push(audio);
      const probs = [...S.p.errors.filter((e) => e.code !== "no-scenes"), ...S.runtimeErrors.map((e) => ({ level: "error", ...e }))];
      out.push(section(t2("problems"), probs.length ? h("div", { class: "fvs-problems" }, ...probs.map((e) => h("div", { class: e.level === "warning" ? "w" : "e", text: "".concat(e.scene ? "[".concat(e.scene, "] ") : "").concat(e.line ? "line ".concat(e.line, ": ") : "").concat(e.message) }))) : h("p", { class: "fvs-hint", text: t2("no-problems") })));
      return out;
    }
    function renderAll() {
      nameText.textContent = S.p.meta.title || path.split("/").pop().replace(/\.fvs\.md$/i, "");
      renderTransport();
      renderTimeline();
      renderSide();
      fitPreview();
    }
    function onKey(e) {
      if (e.isComposing || e.keyCode === 229) return;
      const mod = e.metaKey || e.ctrlKey, k = e.key.toLowerCase();
      if (mod && k === "s") {
        e.preventDefault();
        commitFocusedField();
        save();
        return;
      }
      if (e.key === "Escape" && inlinePanel && inlinePanel.shell.contains(e.target)) {
        e.preventDefault();
        closeInlinePanel();
        aiBtn.focus();
        return;
      }
      if (typing(e)) return;
      if (mod && k === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
        return;
      }
      if (mod && k === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if (mod && k === "d") {
        e.preventDefault();
        duplicateSelected();
        return;
      }
      if (mod && k === "b" || !mod && !e.altKey && k === "s") {
        e.preventDefault();
        splitAtPlayhead();
        return;
      }
      if (e.key === "Escape") {
        if (inlinePanel) {
          e.preventDefault();
          closeInlinePanel();
        } else if (S.focus) {
          e.preventDefault();
          setFocus(false);
        }
        return;
      }
      if (e.code === "Space") {
        if (e.target !== root && e.target.matches?.("button:focus-visible, [role=tab]:focus-visible, [role=separator]:focus-visible")) return;
        e.preventDefault();
        toggle();
        return;
      }
      const beat = S.p.tempo ? S.p.tempo.beat : 0.5, frame = 1 / fps();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        seek(S.time + (e.shiftKey ? beat : frame));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        seek(S.time - (e.shiftKey ? beat : frame));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        stepScene(-1);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        stepScene(1);
      }
      if (e.key === "Home") seek(0);
      if (e.key === "End") seek(S.p.length);
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteSelected();
      }
      if (!mod && !e.altKey && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        zoomBy(1.5);
      }
      if (!mod && !e.altKey && (e.key === "-" || e.key === "_")) {
        e.preventDefault();
        zoomBy(1 / 1.5);
      }
      if (!mod && e.shiftKey && k === "z") {
        e.preventDefault();
        setZoom(0);
      }
    }
    root.addEventListener("keydown", onKey);
    const keepKeys = (box) => (e) => {
      if (e.target.closest("input,textarea,select,.fvs-inline,.fvs-sheet")) return;
      setTimeout(() => {
        const a = document.activeElement;
        if (a?.closest?.(".fvs-layer")) return;
        if (!box.contains(a) || a === document.body) box.focus({ preventScroll: true });
      });
    };
    const rootKeys = keepKeys(root);
    root.addEventListener("pointerdown", (e) => {
      if (reopenOnShow) {
        reopenOnShow = false;
        restoreInspector();
      }
      rootKeys(e);
    });
    let dockShell = null, dockKeys = null, dockDrops = null;
    const undock = opts.dock?.studio({
      timeline,
      path,
      // the media bin's side of the link
      text: () => S.text,
      store: (files) => importFiles(files, void 0, false),
      place: (vp) => {
        const s = sceneUnderPlayhead();
        return placeFromBin(vp, s ? s.id : "", S.time);
      },
      // the conversation's side of it: the right side is showing again, and the properties belong beside it
      restoreSide: restoreInspector,
      sideLost,
      attach(shell) {
        const a = document.activeElement, lost = !!dockShell && (!a || a === document.body || dockShell.contains(a));
        if (dockShell) {
          dockShell.removeEventListener("keydown", onKey);
          dockShell.removeEventListener("pointerdown", dockKeys);
          dockDrops?.();
        }
        dockShell = shell;
        dockKeys = shell ? keepKeys(shell) : null;
        dockDrops = shell ? acceptDrops(shell) : null;
        if (shell) {
          shell.addEventListener("keydown", onKey);
          shell.addEventListener("pointerdown", dockKeys);
        }
        dockStrip.hidden = !!shell;
        if (S.disposed) return;
        if (!shell && lost) setTimeout(() => {
          const b = document.activeElement;
          if (!S.disposed && (!b || b === document.body) && root.isConnected) root.focus({ preventScroll: true });
        });
        layout();
      }
    });
    let heldBox = null;
    const onPage = (x) => x === document.body || x === document.documentElement;
    const binOurs = () => opts.dock?.top()?.timeline === timeline;
    const boxOf = (x) => {
      if (!x?.closest) return null;
      for (const b of [root, side, dockShell, timeline]) if (b && b.contains(x)) return b;
      return binOurs() ? x.closest(".fvs-bin") : null;
    };
    const track2 = (e) => {
      const x = e.target;
      if (x?.closest && !x.closest(".fvs-layer")) heldBox = boxOf(x);
    };
    const onStrayKey = (e) => {
      const x = e.target;
      if (e.defaultPrevented || typeof e.key !== "string" || S.disposed || root.contains(x) || dockShell?.contains(x)) return;
      const box = onPage(x) ? heldBox?.getClientRects().length ? heldBox : null : boxOf(x);
      if (!box) return;
      if (box.classList.contains("fvs-bin") && !(binOurs() && (e.metaKey || e.ctrlKey) && /^[zy]$/i.test(e.key))) return;
      onKey(e);
    };
    window.addEventListener("pointerdown", track2, true);
    window.addEventListener("focusin", track2, true);
    window.addEventListener("keydown", onStrayKey);
    const ro = new ResizeObserver(() => {
      const w = root.clientWidth;
      if (w < 760 && !root.classList.contains("narrow") && !nativeInspector) S.inspectorOpen = false;
      root.classList.toggle("narrow", w < 760);
      root.classList.toggle("medium", w < 1100);
      root.classList.toggle("tiny", w < 460);
      if (reopenOnShow && w > 0) {
        reopenOnShow = false;
        restoreInspector();
      }
      layout();
    });
    ro.observe(root);
    ro.observe(viewport);
    ro.observe(scroller);
    layout();
    void load().then(() => {
      if (!opts.idea || S.disposed || !S.text) return;
      if (opts.chat) {
        opts.chat.reveal();
        opts.chat.prefill(opts.idea);
        opts.ideaDraft?.("");
      } else {
        director.seed(opts.idea, opts.ideaDraft);
        openAsk();
      }
    });
    raf = requestAnimationFrame(loop);
    const dispose = () => {
      commitFocusedField();
      S.disposed = true;
      closeLayer();
      closeInlinePanel();
      thumbs.dispose();
      exports.dispose();
      director?.dispose();
      exportHandle?.close();
      inspectorHandle?.close();
      askHandle?.close();
      cancelAnimationFrame(raf);
      clearTimeout(previewTimer);
      clearTimeout(pendingTimer);
      Promise.resolve(S.text !== S.saved ? save() : saving).catch(() => {
      }).finally(() => OPEN.get(path)?.delete(editor));
      if (unwatch) unwatch();
      clearInterval(poll);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("pointerdown", track2, true);
      window.removeEventListener("focusin", track2, true);
      window.removeEventListener("keydown", onStrayKey);
      ro.disconnect();
      cancelAnimationFrame(rulerFrame);
      undock?.();
      timeline.remove();
      for (const clear of drags) clear();
      for (const a of audios) {
        a.el.pause();
        if (a.blob) URL.revokeObjectURL(a.url);
      }
      root.remove();
    };
    dispose.flush = async () => {
      commitFocusedField();
      await save();
      return S.text === S.saved;
    };
    dispose.restoreSide = restoreInspector;
    return dispose;
  }

  // src/lib/templates.js
  var HEAD = (title, zh) => "# ".concat(title, "\n\n").concat(zh ? "\u8FD9\u662F\u4E00\u4E2A Forsion Video Studio \u5DE5\u7A0B\u6587\u4EF6\u3002\u573A\u666F\u6309\u987A\u5E8F\u9996\u5C3E\u76F8\u63A5\u5730\u64AD\u653E\uFF1B\u6BCF\u4E2A\u573A\u666F\u7684 `hits` \u662F\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u62CD\u70B9\uFF0C\u753B\u9762\u7684\u5207\u70B9\u548C\u914D\u4E50\u7684\u91CD\u97F3\u90FD\u4ECE\u8FD9\u91CC\u8BFB\u3002\u7528 Video Studio \u6253\u5F00\u53EF\u4EE5\u76F4\u63A5\u6539\u6587\u5B57\u3001\u62D6\u65F6\u95F4\u7EBF\uFF1B\u4E5F\u53EF\u4EE5\u8BA9 AI \u6309\u8FD9\u4EFD\u6587\u4EF6\u7684\u5199\u6CD5\u7EE7\u7EED\u5199\u3002" : "A Forsion Video Studio project. Scenes play back to back in document order; each scene's `hits` are beats from its start, and both the picture cuts and the score's accents read them. Open it in Video Studio to edit the text and the timeline, or ask the AI to keep writing it.", "\n");
  function emptyTemplate({ title = "\u65B0\u89C6\u9891", zh = true } = {}) {
    return "".concat(HEAD(title, zh), '\n```fvs\n{\n  "fvs": 1,\n  "title": ').concat(JSON.stringify(title), ',\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "background": "#101010",\n  "audio": []\n}\n```\n\n```css\n.fvs-stage { color: #f5f3ef; font-family: \'Noto Sans SC\', \'PingFang SC\', system-ui, sans-serif; }\n```\n');
  }

  // src/ui/workspace.js
  var ASPECTS = [[1920, 1080, "frame-landscape"], [1080, 1920, "frame-portrait"], [1080, 1080, "frame-square"], [1440, 1080, "frame-classic"]];
  var badName = (name) => /[\/\\:*?"<>|\u0000-\u001f]/.test(name) || /^\.|\.$/.test(name);
  var mmss = (s) => "".concat(Math.floor(s / 60), ":").concat(String(Math.floor(s % 60)).padStart(2, "0"));
  var folderPath = (text) => {
    const typed = text.trim().replace(/\\/g, "/");
    if (!typed) return "";
    if (/^(\/|~|[A-Za-z]:)/.test(typed)) return null;
    const parts = typed.split("/").map((x) => x.trim()).filter(Boolean);
    return parts.length && !parts.some(badName) ? parts.join("/") : null;
  };
  function registerWorkspace(ctx2, t2, { createProject: createProject2, remember: remember2 }) {
    const app2 = ctx2.app || {}, listeners = /* @__PURE__ */ new Set(), mounts = /* @__PURE__ */ new Set();
    let selected = null, paths = [], generation = 0, loaded = false;
    async function libraryReady(ms = 15e3) {
      if (typeof app2.vaultRoot !== "function") return true;
      if (typeof ctx2.replaceView !== "function") return !!app2.vaultRoot();
      for (const end = Date.now() + ms; !app2.vaultRoot() && Date.now() < end; ) await new Promise((r) => setTimeout(r, 150));
      return !!app2.vaultRoot();
    }
    const emit = () => listeners.forEach((fn) => fn());
    const valid = (path) => typeof path === "string" && path.toLowerCase().endsWith(".fvs.md");
    const listed = (path) => valid(path) && !path.split("/").some((part) => part.startsWith("."));
    const titles = /* @__PURE__ */ new Map();
    const stemOf = (p) => p.split("/").pop().replace(/\.fvs\.md$/i, "");
    const rows = (query) => paths.map((p) => {
      const m = titles.get(p) || {};
      return { key: p, title: m.title || stemOf(p), hint: p.slice(0, p.lastIndexOf("/")), icon: "layout", frame: m.frame || "", length: m.length || "" };
    }).filter((r) => "".concat(r.title, " ").concat(r.key).toLocaleLowerCase().includes((query || "").toLocaleLowerCase()));
    async function readTitles(list2) {
      let changed = false;
      for (const p of list2) {
        if (titles.has(p)) continue;
        let m = {};
        try {
          const text = await app2.readFile(p), q2 = text ? parseProject(text) : null;
          if (q2) m = { title: String(q2.meta.title || "").trim(), frame: q2.meta.width && q2.meta.height ? "".concat(q2.meta.width, " \xD7 ").concat(q2.meta.height) : "", length: mmss(q2.length || 0) };
        } catch {
          m = {};
        }
        titles.set(p, m);
        changed = true;
      }
      if (changed) emit();
    }
    async function refresh() {
      if (selected) titles.delete(selected);
      await libraryReady();
      const gen = ++generation, root = app2.vaultRoot?.();
      let found = [];
      try {
        found = await app2.listFiles?.() || [];
      } catch {
      }
      if (gen !== generation || root !== app2.vaultRoot?.()) return;
      const next = [...new Set(found.filter(listed))].sort((a, b) => a.localeCompare(b)), active = selected;
      if (active && !next.includes(active) && await app2.readFile(active).catch(() => null) !== null) next.push(active);
      if (gen !== generation || root !== app2.vaultRoot?.()) return;
      paths = next;
      loaded = true;
      emit();
      void readTitles(next);
    }
    function open(path) {
      if (!valid(path)) return;
      titles.delete(path);
      selected = path;
      remember2(path);
      emit();
      for (const mount of mounts) if (!mount.compact) mount.show(path);
      if (ctx2.openView) ctx2.openView("studio");
      else app2.openFile?.(path);
      void refresh();
    }
    const safe = (fn) => async () => {
      try {
        await fn();
      } catch (e) {
        ctx2.notify?.(String(e.message || e), { level: "warning" });
      }
    };
    const nameOf = (path) => titles.get(path)?.title || stemOf(path);
    const renameProject = (path) => safe(async () => {
      const was = nameOf(path), title = (await app2.prompt(t2("project-rename-title"), was))?.trim();
      if (!title || title === was) return;
      const editor = () => {
        const live = editorsOf(path).filter((e) => e.alive());
        return live.find((e) => e.dirty()) || live[0];
      };
      let one = editor();
      if (!one) {
        const text = await app2.readFile(path);
        if (text === null) throw new Error(t2("cannot-read", { path }));
        one = editor();
        if (!one) await app2.writeFile(path, setProjectMeta(text, { title }));
      }
      if (one) await one.retitle(title);
      titles.set(path, { ...titles.get(path), title });
      emit();
    })();
    const outputOf = (stem) => new RegExp("^".concat(stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "(-\\d+)?\\.(html|mp4|srt|vtt)$"), "i");
    const deleteProject = (path) => safe(async () => {
      const dir = dirOf2(path), name = nameOf(path), mine = outputOf(stemOf(path));
      const held = editorsOf(path);
      await Promise.all(held.map((e) => e.release()));
      let own = false;
      try {
        for (const m of [...mounts]) if (m.path() === path) await m.leave();
        if ([...mounts].some((m) => m.path() === path)) throw new Error(t2("project-delete-failed", { name }));
        let all = null;
        try {
          all = [...await app2.listFiles(), ...await app2.listPages?.() || []];
        } catch {
          all = null;
        }
        const rest = all?.includes(path) ? all.filter((q2) => q2 !== path && q2.startsWith("".concat(dir, "/"))).map((q2) => q2.slice(dir.length + 1)) : null;
        own = !!dir && !!rest && rest.every((rel) => /^(media|audio|assets|generated)\//.test(rel) || mine.test(rel));
        await app2.trash(own ? dir : path);
        if (await app2.readFile(path).catch(() => null) !== null) throw new Error(t2("project-delete-failed", { name }));
      } catch (e) {
        for (const x of held) x.resume();
        throw e;
      }
      if (selected === path) selected = null;
      titles.delete(path);
      paths = paths.filter((q2) => q2 !== path);
      emit();
      try {
        if ((await ctx2.loadData?.() || {}).last === path) await remember2(null);
      } catch {
      }
      if (!own && dir) ctx2.notify?.(t2("project-deleted-file", { name }));
      void refresh();
    })();
    const projectActions = (path) => [
      app2.prompt ? { id: "rename", icon: "Pencil", label: t2("project-rename"), run: () => void renameProject(path) } : null,
      app2.reveal ? { id: "reveal", icon: "FolderOpen", label: t2("bin-reveal"), run: () => app2.reveal(path) } : null,
      app2.trash ? { id: "delete", icon: "Trash2", label: t2("project-delete"), danger: true, run: () => void deleteProject(path) } : null
    ].filter(Boolean);
    const projectMenu = (anchor, path, at) => {
      const items = projectActions(path);
      if (items.length) openMenu(anchor, items.map((x) => x.id === "delete" ? ["-", x] : [x]).flat(), { label: nameOf(path), at, align: at ? "start" : "end" });
    };
    const newProject = () => go("create");
    const nav = { page: "projects" };
    let pendingIdea = null;
    async function go(page) {
      nav.page = page;
      emit();
      const here = [...mounts].filter((m) => m.launcher);
      for (const m of here) void m.leave();
      if (!here.length) {
        selected = null;
        await remember2(null);
        ctx2.openView?.("studio");
      }
    }
    function launchpad(el, onOpen) {
      const inner = h("div", { class: "fvs-launch-inner" });
      const shell = h("div", { class: "fvs-extension fvs-launch" }, h("style", { text: CSS2 }), inner);
      el.append(shell);
      let page = null, stop = null;
      const paint = () => {
        if (page === nav.page) return;
        const turned = page !== null;
        page = nav.page;
        stop?.();
        inner.replaceChildren();
        stop = (page === "create" ? createPage : projectsPage)(inner, onOpen);
        if (turned) (inner.querySelector("textarea") || inner.querySelector("input"))?.focus({ preventScroll: true });
      };
      listeners.add(paint);
      paint();
      return () => {
        listeners.delete(paint);
        stop?.();
        shell.remove();
      };
    }
    function projectsPage(box, onOpen) {
      const search = h("input", { type: "search", placeholder: t2("project-search"), "aria-label": t2("project-search") });
      const count = h("span"), list2 = h("div", { class: "fvs-launch-list" });
      const head = h("div", { class: "fvs-launch-head" }, h("span"), count, h("span", { text: t2("launch-col-meta") }));
      const render = () => {
        const found = rows(search.value);
        count.textContent = t2("launch-count", { n: found.length });
        head.hidden = !found.length;
        list2.replaceChildren(...found.map((r) => h(
          "div",
          {
            class: "fvs-launch-row",
            "data-project-path": r.key,
            oncontextmenu: (e) => {
              e.preventDefault();
              projectMenu(e.currentTarget, r.key, { x: e.clientX, y: e.clientY });
            }
          },
          h(
            "button",
            { type: "button", class: "fvs-launch-open", onclick: () => onOpen(r.key) },
            h("span", { class: "fvs-launch-icon" }, icon("FileVideo")),
            h("span", { class: "fvs-launch-info" }, h("strong", { text: r.title }), h("small", { text: r.key })),
            h("span", { class: "fvs-launch-meta" }, h("span", { text: r.frame }), h("small", { text: r.length }))
          ),
          projectActions(r.key).length ? h("button", {
            type: "button",
            class: "fvs-btn icon fvs-launch-more",
            title: t2("more"),
            "aria-label": t2("more"),
            "aria-haspopup": "menu",
            onclick: (e) => projectMenu(e.currentTarget, r.key)
          }, icon("MoreHorizontal")) : null
        )));
        if (!found.length && (loaded || search.value)) list2.append(h("div", { class: "fvs-launch-empty" }, h("strong", { text: t2(search.value ? "launch-no-match" : "launch-empty") }), search.value ? null : h("p", { text: t2("launch-empty-hint") })));
      };
      search.oninput = render;
      box.append(
        h(
          "header",
          { class: "fvs-launch-header" },
          h("div", {}, h("h1", { text: t2("launch-projects") }), h("p", { text: t2("launch-projects-sub") })),
          h(
            "div",
            { class: "fvs-launch-actions" },
            h("button", { type: "button", class: "fvs-btn primary", "data-launch": "new", onclick: () => void go("create") }, icon("Plus"), h("span", { text: t2("new-video") }))
          )
        ),
        h(
          "div",
          { class: "fvs-launch-toolbar" },
          h("label", { class: "fvs-launch-search" }, icon("Search"), search),
          h("button", { type: "button", class: "fvs-btn icon", title: t2("refresh-projects"), "aria-label": t2("refresh-projects"), onclick: () => void refresh() }, icon("RefreshCw"))
        ),
        head,
        list2
      );
      listeners.add(render);
      render();
      void refresh();
      return () => listeners.delete(render);
    }
    function createPage(box, onOpen) {
      const fallback = app2.workFolder?.() || "Forsion Video Studio";
      const inUse = (list2, folder, name2) => list2.some((p) => p.toLowerCase().startsWith("".concat(folder, "/").concat(name2, "/").toLowerCase()));
      const freeName = (list2, folder) => {
        const base = t2("default-name");
        let name2 = base;
        for (let k = 2; inUse(list2, folder, name2); k++) name2 = "".concat(base, " ").concat(k);
        return name2;
      };
      let busy = false;
      const idea = h("textarea", { class: "fvs-input fvs-launch-idea", rows: "4", placeholder: t2("launch-idea-placeholder"), "aria-label": t2("launch-idea") });
      const aspects = ASPECTS.map(([w, hh, key], i) => h(
        "label",
        { class: "fvs-launch-aspect" },
        h("input", { type: "radio", name: "fvs-aspect", value: String(i), checked: i === 0 }),
        h("span", { class: "fvs-launch-frame", style: { aspectRatio: "".concat(w, " / ").concat(hh) } }),
        h("span", { text: t2(key) })
      ));
      const name = h("input", { class: "fvs-input", "aria-label": t2("launch-name"), placeholder: freeName(paths, fallback), maxlength: "80", autocomplete: "off", spellcheck: "false" });
      const place2 = h("input", { class: "fvs-input", "aria-label": t2("launch-folder"), placeholder: fallback, maxlength: "200", autocomplete: "off", spellcheck: "false" });
      const folderNow = () => {
        const typed = folderPath(place2.value);
        return typed === "" ? fallback : typed;
      };
      const error = h("p", { class: "fvs-launch-error", role: "alert", hidden: true });
      const where = h("p", { class: "fvs-launch-note" });
      const submit = h("button", { type: "submit", class: "fvs-btn primary fvs-launch-create" }, icon("ArrowRight"), h("span", { text: t2("launch-create") }));
      const paintWhere = () => {
        const folder = folderNow();
        if (folder) name.placeholder = freeName(paths, folder);
        where.textContent = folder ? t2("launch-where", { path: "".concat(folder, "/").concat(name.value.trim() || name.placeholder) }) : t2("launch-folder-invalid");
      };
      const fail = (message, field = name) => {
        error.textContent = message;
        error.hidden = false;
        field.setAttribute("aria-invalid", "true");
        field.focus();
      };
      name.oninput = place2.oninput = () => {
        error.hidden = true;
        name.removeAttribute("aria-invalid");
        place2.removeAttribute("aria-invalid");
        paintWhere();
      };
      const form = h(
        "form",
        { class: "fvs-launch-card", novalidate: true, onsubmit: (e) => {
          e.preventDefault();
          void create();
        } },
        h("label", { class: "fvs-launch-label" }, h("span", {}, t2("launch-idea"), h("small", { text: t2("optional") })), idea),
        h("div", { class: "fvs-launch-field" }, h("span", { text: t2("launch-frame") }), h("div", { class: "fvs-launch-aspects", role: "radiogroup", "aria-label": t2("launch-frame") }, ...aspects)),
        h(
          "div",
          { class: "fvs-launch-submit" },
          h("label", { class: "fvs-launch-field fvs-launch-name" }, h("span", { text: t2("launch-name") }), name),
          h("label", { class: "fvs-launch-field fvs-launch-folder" }, h("span", {}, t2("launch-folder"), h("small", { text: t2("launch-folder-hint") })), place2),
          submit
        ),
        error
      );
      async function create() {
        if (busy) return;
        const typed = name.value.trim(), folder = folderNow();
        if (typed && badName(typed)) return fail(t2("launch-name-invalid"));
        if (!folder) return fail(t2("launch-folder-invalid"), place2);
        busy = true;
        submit.disabled = true;
        try {
          if (!await libraryReady(5e3)) return fail(t2("launch-no-library"));
          let list2 = paths;
          try {
            list2 = await app2.listFiles?.() || paths;
          } catch {
          }
          if (typed && inUse(list2, folder, typed)) return fail(t2("launch-name-taken"));
          const title = typed || freeName(list2, folder);
          const [width, height] = ASPECTS[+form.querySelector('input[name="fvs-aspect"]:checked').value];
          const path = joinPath(folder, "".concat(title, "/").concat(title, ".fvs.md"));
          await app2.writeFile(path, setProjectMeta(emptyTemplate({ title, zh: !t2.en() }), { width, height }));
          await trust(ctx2, path);
          try {
            await ctx2.saveData?.({ ...await ctx2.loadData?.() || {}, folder: folder === fallback ? null : folder });
          } catch {
          }
          nav.page = "projects";
          void refresh();
          await onOpen(path, idea.value.trim());
        } catch (e) {
          fail(String(e?.message || e));
        } finally {
          busy = false;
          submit.disabled = false;
        }
      }
      void (async () => {
        let last = "";
        try {
          last = (await ctx2.loadData?.())?.folder || "";
        } catch {
          last = "";
        }
        if (last && !place2.value && folderPath(last)) {
          place2.value = last;
          paintWhere();
        }
      })();
      paintWhere();
      box.append(h(
        "div",
        { class: "fvs-launch-create-page" },
        h("button", { type: "button", class: "fvs-launch-back", onclick: () => void go("projects") }, icon("ArrowLeft"), h("span", { text: t2("launch-back") })),
        h("header", { class: "fvs-launch-create-head" }, h("h1", { text: t2("launch-create-title") }), h("p", { text: t2("launch-create-sub") })),
        form,
        where,
        h("p", { class: "fvs-launch-note", text: t2("launch-idea-note") })
      ));
      return () => {
      };
    }
    function library(el, onOpen, empty = false, bare = false) {
      const shell = h("div", { class: "fvs-extension fvs-library".concat(bare ? " bare" : "") }, h("style", { text: CSS2 }));
      const search = h("input", { class: "fvs-input", type: "search", placeholder: t2("project-search"), "aria-label": t2("project-search") });
      const list2 = h("div", { class: "fvs-project-list" });
      const render = () => {
        list2.replaceChildren();
        for (const row of rows(search.value)) list2.append(h(
          "div",
          { class: "fvs-project-row" },
          h(
            "button",
            {
              class: "fvs-project-item",
              "data-project-path": row.key,
              onclick: () => onOpen(row.key),
              oncontextmenu: (e) => {
                e.preventDefault();
                projectMenu(e.currentTarget, row.key, { x: e.clientX, y: e.clientY });
              }
            },
            icon("FileVideo"),
            h("span", {}, h("strong", { text: row.title }), h("small", { text: row.key }))
          ),
          projectActions(row.key).length ? h("button", {
            type: "button",
            class: "fvs-btn icon fvs-launch-more",
            title: t2("more"),
            "aria-label": t2("more"),
            "aria-haspopup": "menu",
            onclick: (e) => projectMenu(e.currentTarget, row.key)
          }, icon("MoreHorizontal")) : null
        ));
        if (!list2.children.length) list2.append(h("p", { class: "fvs-hint", text: t2("projects-empty") }));
      };
      search.oninput = render;
      if (!bare) shell.append(
        h("div", { class: "fvs-library-heading" }, icon("Film"), h("h2", { text: t2(empty ? "workspace-welcome" : "projects") })),
        h("p", { class: "fvs-hint", text: t2("workspace-intro") })
      );
      const actions = h("div", { class: "fvs-row" }, h("button", { class: "fvs-btn".concat(bare ? "" : " primary"), onclick: newProject }, icon("Plus"), t2("new-project")));
      shell.append(...bare ? [search, list2, actions] : [actions, search, list2]);
      el.append(shell);
      listeners.add(render);
      render();
      void refresh();
      return () => {
        listeners.delete(render);
        shell.remove();
      };
    }
    const dock = /* @__PURE__ */ (() => {
      const studios = [], watchers = /* @__PURE__ */ new Set();
      let host = null;
      const top = () => studios.at(-1) ?? null;
      const link = () => {
        const s = top();
        host?.show(s ? s.timeline : null);
        s?.attach(host ? host.shell : null);
        watchers.forEach((fn) => fn());
      };
      return {
        top,
        size: () => studios.length,
        watch(fn) {
          watchers.add(fn);
          return () => watchers.delete(fn);
        },
        studio(client) {
          top()?.attach(null);
          studios.push(client);
          link();
          return () => {
            const i = studios.indexOf(client);
            if (i < 0) return;
            const owned = i === studios.length - 1;
            studios.splice(i, 1);
            if (owned) {
              client.attach(null);
              link();
            }
          };
        },
        host(panel) {
          host = panel;
          link();
          return () => {
            if (host !== panel) return;
            host = null;
            top()?.attach(null);
          };
        }
      };
    })();
    const canChat = typeof ctx2.tangu?.mountChat === "function";
    const CHAT_LINGER_MS = 2e3;
    const SIDE_OPENS_MS = 300;
    const chatFolder = (path) => canChat && dirOf2(path) || null;
    const chat = /* @__PURE__ */ (() => {
      let handle = null, bound = null, waiting = [];
      let views = 0, asked = -Infinity;
      const send = (method, text, folder) => {
        if (!text) return;
        if (handle && bound === folder) handle[method](text);
        else waiting.push([method, text, folder]);
      };
      const reveal = () => {
        asked = performance.now();
        return ctx2.openView?.("chat", { location: "right" });
      };
      return {
        reveal,
        shown: () => views > 0,
        /** What one editor gets: its words go to its own project's conversation, never to the one that follows it.
         *  `shown`: the conversation's view is mounted, so the right side is showing (collapsed, the host unmounts it). */
        of: (folder) => ({ reveal, shown: () => views > 0, quote: (text) => send("quote", text, folder), prefill: (text) => send("prefill", text, folder) }),
        // text that was waiting for another project's conversation goes with the switch
        bind(next, folder = null) {
          handle = next;
          bound = next ? folder : null;
          if (next) {
            for (const [method, text, to] of waiting.splice(0)) if (to === folder) next[method](text);
          }
        },
        /** A view that goes takes only its own conversation with it (two can overlap while the host rebuilds a layout). */
        release(mine) {
          if (mine && handle === mine) {
            handle = null;
            bound = null;
          }
        },
        /** A conversation view mounts. `asked()`: one of our buttons called for it a moment ago (else the host brought
         *  the side back). `gone()`: how many are left. */
        view() {
          views++;
          return { asked: () => performance.now() - asked < 1500, gone: () => --views };
        }
      };
    })();
    function mountChat(el) {
      const empty = h("div", { class: "fvs-extension fvs-chat-empty" }, h("style", { text: CSS2 }), h("p", { class: "fvs-hint fvs-dock-empty", text: t2("chat-no-project") }));
      const body = h("div", { class: "fvs-chat-body" });
      const shell = h("div", { class: "fvs-chat" }, empty, body);
      el.append(shell);
      let folder = null, handle = null, gone = 0;
      const show = (next, path) => {
        if (next === folder) return;
        folder = next;
        chat.release(handle);
        handle?.dispose();
        handle = next ? ctx2.tangu.mountChat(body, { agent: AGENT, folder: next, title: titles.get(path)?.title || stemOf(path) }) : null;
        if (next) ensureTools(ctx2).catch(() => {
        });
        empty.hidden = !!handle;
        if (handle) chat.bind(handle, next);
      };
      const sync = () => {
        clearTimeout(gone);
        const studio = dock.top();
        if (!studio) {
          gone = setTimeout(() => {
            if (!dock.top()) show(null);
          }, CHAT_LINGER_MS);
          return;
        }
        show(chatFolder(studio.path), studio.path);
      };
      const off = dock.watch(sync);
      sync();
      const seen = chat.view(), back = setTimeout(() => {
        if (!seen.asked()) dock.top()?.restoreSide?.();
      }, SIDE_OPENS_MS);
      return () => {
        clearTimeout(back);
        clearTimeout(gone);
        off();
        if (!seen.gone()) dock.top()?.sideLost?.();
        chat.release(handle);
        handle?.dispose();
        shell.remove();
      };
    }
    function mountTimeline(el) {
      const empty = h("p", { class: "fvs-hint fvs-dock-empty", text: t2("timeline-no-project") });
      const shell = h("div", { class: "fvs-extension fvs-dock-timeline", tabindex: "-1" }, h("style", { text: CSS2 }), empty);
      el.append(shell);
      const ro = new ResizeObserver(() => {
        const w = shell.clientWidth;
        shell.classList.toggle("narrow", w > 0 && w < 760);
        shell.classList.toggle("medium", w > 0 && w < 1100);
      });
      ro.observe(shell);
      const off = dock.host({ shell, show(timeline) {
        shell.querySelector(":scope > .fvs-tl")?.remove();
        if (timeline) shell.append(timeline);
        empty.hidden = !!timeline;
      } });
      return () => {
        off();
        ro.disconnect();
        shell.remove();
      };
    }
    function mountWorkspace(el, view = {}, compact = false) {
      let disposed = false, disposeContent = null, path = null, request = 0;
      let opening = null;
      const docked = !compact && view.surface !== "floating" && !!ctx2.viewLocations?.includes("bottom");
      const jump = docked && typeof ctx2.replaceView === "function";
      const launcher = !compact && view.surface !== "floating";
      const holder = h("div", { class: "fvs-workspace-host" });
      el.append(holder);
      const picker = async () => {
        let switching = false;
        if (view.extendView) view.extendView.open({
          id: "fvs-projects",
          title: t2("projects"),
          side: "left",
          mount(body, handle) {
            return library(body, (p) => {
              switching = p !== path;
              handle.close();
              void show(p).then((done) => {
                if (switching && !done) disposeContent?.restoreSide?.();
              });
            }, false, true);
          },
          // ("layout": the host folded the left side or rebuilt the layout under the picker; the right side's rest is the same)
          onClose(reason) {
            if (!switching && (reason === "close" || reason === "dismiss" || reason === "layout")) disposeContent?.restoreSide?.();
          }
        });
        else {
          if (await disposeContent?.flush?.() === false || disposed) return;
          disposeContent?.();
          holder.replaceChildren();
          path = null;
          disposeContent = library(holder, show);
        }
      };
      function show(next, how) {
        if (!valid(next)) return Promise.resolve(false);
        if (next === path) return Promise.resolve(true);
        const mine = opening = load(next, how).finally(() => {
          if (opening === mine) opening = null;
        });
        return mine;
      }
      async function load(next, { initial = false, idea = "" } = {}) {
        const gen = ++request;
        if (await app2.readFile(next).catch(() => null) === null || disposed || gen !== request) return false;
        if (await disposeContent?.flush?.() === false || disposed || gen !== request) return false;
        view.extendView?.close();
        disposeContent?.();
        holder.replaceChildren();
        const fromLaunch = !path;
        path = next;
        if (!compact) {
          selected = next;
          remember2(next);
          emit();
        }
        if (view.getParams?.().filePath !== next) view.setParams?.({ filePath: next });
        if (idea) pendingIdea = { path: next, text: idea };
        disposeContent = mountStudio(ctx2, holder, next, t2, {
          view,
          compact,
          chooseProject: picker,
          openWorkspace: () => open(next),
          idea: !compact && pendingIdea?.path === next ? pendingIdea.text : "",
          ideaDraft: (text) => {
            if (pendingIdea?.path === next) pendingIdea = text ? { path: next, text } : null;
          },
          closeProject: launcher ? closeProject : null,
          dock: docked ? dock : null,
          showTimeline: () => ctx2.openView?.("timeline", { location: "bottom" }),
          chat: docked && chatFolder(next) ? chat.of(chatFolder(next)) : null,
          showInMain: () => {
            view.setParams?.({ filePath: next });
            view.showInMainPanel?.();
          },
          openMini: ctx2.openMiniPanel ? () => ctx2.openMiniPanel("preview", { title: t2("mini-preview"), params: { filePath: next }, mainViewId: "studio", mainViewParams: { filePath: next } }) : null,
          openFloating: ctx2.openFloatingPanel ? () => ctx2.openFloatingPanel("studio", { title: t2("app"), params: { filePath: next }, width: 1120, height: 820, minWidth: 480, minHeight: 580 }) : null
        });
        if (jump) {
          const swapped = ctx2.replaceView("nav", "media");
          if (swapped || fromLaunch && !initial) {
            if (chatFolder(next)) chat.reveal();
            ctx2.openView?.("timeline", { location: "bottom" });
          }
        }
        return true;
      }
      async function closeProject() {
        if (!path) return;
        const gen = ++request, closing = path;
        if (await disposeContent?.flush?.() === false || disposed || gen !== request) return;
        await remember2(null);
        if (disposed || gen !== request) return;
        if (selected === closing) selected = null;
        view.setParams?.({ filePath: "" });
        view.extendView?.close();
        disposeContent?.();
        holder.replaceChildren();
        path = null;
        emit();
        launch();
      }
      function leaveSide() {
        let leave = null, done = false;
        const go2 = () => {
          if (done) return;
          done = true;
          if (!path && !dock.size()) ctx2.closeView?.("chat");
          leave?.close();
        };
        try {
          leave = view.extendView?.open({ id: "fvs-leave", title: t2("properties"), side: "right", mount: () => {
            queueMicrotask(go2);
          } }) ?? null;
        } catch {
          leave = null;
        }
        if (leave) setTimeout(go2, 400);
        else go2();
      }
      function launch() {
        if (jump && !dock.size()) {
          ctx2.replaceView("media", "nav");
          ctx2.closeView?.("timeline");
          if (canChat) {
            if (chat.shown()) leaveSide();
            else ctx2.closeView?.("chat");
          }
        }
        disposeContent = launcher ? launchpad(holder, (p, idea) => show(p, { idea })) : library(holder, show, true);
      }
      const record = { show, compact, launcher, leave: closeProject, path: () => path };
      mounts.add(record);
      let starting = true;
      const restored = view.getParams?.().filePath;
      const unsubscribe = view.onParamsChanged?.((params) => {
        if (valid(params.filePath)) void show(params.filePath, { initial: starting && params.filePath === restored });
      });
      (async () => {
        let last = null;
        try {
          last = (await ctx2.loadData?.())?.last;
        } catch {
        }
        const initial = () => view.getParams?.().filePath || selected || last;
        if (valid(initial())) await libraryReady();
        if (!disposed && !path && valid(initial())) await show(initial(), { initial: true });
        while (opening && !disposed) await opening.catch(() => {
        });
        starting = false;
        if (!disposed && !path) launch();
      })();
      return () => {
        disposed = true;
        request++;
        mounts.delete(record);
        unsubscribe?.();
        view.extendView?.close();
        disposeContent?.();
        holder.remove();
      };
    }
    function mountNav(el) {
      const item = (page, glyph, key, run) => h("button", { type: "button", class: "fvs-nav-item", "data-nav": page, onclick: run }, icon(glyph), h("span", { text: t2(key) }));
      const pages = [item("create", "Plus", "new-video", () => void go("create")), item("projects", "LayoutGrid", "launch-projects", () => void go("projects"))];
      const shell = h(
        "nav",
        { class: "fvs-extension fvs-nav", "aria-label": t2("workspace-welcome") },
        h("style", { text: CSS2 }),
        h("div", { class: "fvs-nav-brand" }, h("span", { class: "fvs-nav-mark" }, icon("Clapperboard")), h("strong", { text: t2("workspace-welcome") })),
        h("div", { class: "fvs-nav-section" }, h("span", { class: "fvs-nav-heading", text: t2("nav-create") }), ...pages)
      );
      const paint = () => {
        for (const b of pages) if (!selected && b.dataset.nav === nav.page) b.setAttribute("aria-current", "page");
        else b.removeAttribute("aria-current");
      };
      el.append(shell);
      listeners.add(paint);
      paint();
      return () => {
        listeners.delete(paint);
        shell.remove();
      };
    }
    function mountBin(el) {
      const input = h("input", { type: "file", multiple: true, hidden: true, accept: "image/*,video/*,audio/*" });
      const importBtn = h("button", { type: "button", class: "fvs-btn ghost", "data-bin": "import", title: t2("bin-import-hint"), onclick: () => input.click() }, icon("Upload"), h("span", { text: t2("bin-import") }));
      const FILTERS = ["all", "image", "video", "audio", "-", "unused", "ai"];
      let filter = "all";
      const filterName = h("span"), count = h("span", { class: "fvs-bin-count" });
      const filterBtn = h("button", {
        type: "button",
        class: "fvs-btn ghost",
        "data-bin": "filter",
        "aria-haspopup": "menu",
        title: t2("bin-filter"),
        onclick: () => openMenu(filterBtn, FILTERS.map((f) => f === "-" ? f : { label: t2("bin-filter-".concat(f)), checked: filter === f, run: () => {
          filter = f;
          show();
        } }), { label: t2("bin-filter") })
      }, icon("ListFilter"), filterName, icon("ChevronDown"));
      const grid = h("div", { class: "fvs-bin-grid" }), empty = h("p", { class: "fvs-hint fvs-bin-empty" });
      const shell = h(
        "div",
        { class: "fvs-extension fvs-bin" },
        h("style", { text: CSS2 }),
        h("div", { class: "fvs-bin-head" }, h("strong", { text: t2("bin") }), h("span", { class: "fvs-grow" }), importBtn),
        h("div", { class: "fvs-bin-tools" }, filterBtn, h("span", { class: "fvs-grow" }), count),
        input,
        empty,
        grid
      );
      el.append(shell);
      let studio = null, items = [], gen = 0, disposed = false, shown = null;
      const store = async (files) => {
        if (studio && files.length) {
          await studio.store(files);
          void scan2();
        }
      };
      input.onchange = () => {
        const files = [...input.files];
        input.value = "";
        void store(files);
      };
      const fromDisk = (e) => !!studio && [...e.dataTransfer?.types || []].includes("Files");
      shell.addEventListener("dragover", (e) => {
        if (!fromDisk(e)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        shell.classList.add("dropping");
      });
      shell.addEventListener("dragleave", (e) => {
        if (!shell.contains(e.relatedTarget)) shell.classList.remove("dropping");
      });
      shell.addEventListener("drop", (e) => {
        shell.classList.remove("dropping");
        if (!fromDisk(e)) return;
        e.preventDefault();
        void store([...e.dataTransfer.files]);
      });
      async function scan2() {
        const g = ++gen;
        studio = dock.top();
        let all = [];
        if (studio) try {
          all = await app2.listFiles?.() || [];
        } catch {
          all = [];
        }
        if (g !== gen || disposed) return;
        const dir = studio ? dirOf2(studio.path) : "";
        items = all.map((p) => ({ path: p, rel: !dir ? p : p.startsWith("".concat(dir, "/")) ? p.slice(dir.length + 1) : "" })).filter((x) => /^(media|audio|assets|generated)\//.test(x.rel) && !x.rel.split("/").some((part) => part.startsWith(".")) && ["image", "video", "audio"].includes(KIND(x.rel))).sort((a, b) => a.rel.localeCompare(b.rel));
        const key = "".concat(studio?.path, "\n").concat(items.map((x) => x.path).join("\n"));
        if (key === shown) badges();
        else {
          shown = key;
          paint();
        }
      }
      const inScene = (x) => !!(studio?.text() ?? seen)?.includes(x.rel);
      const menu = (anchor, x) => openMenu(anchor, [
        { label: t2("bin-place"), icon: "Plus", run: () => void studio?.place(x.path) },
        app2.reveal ? { label: t2("bin-reveal"), icon: "FolderOpen", run: () => app2.reveal(x.path) } : null,
        ...app2.trash ? ["-", {
          label: t2("bin-delete"),
          icon: "Trash2",
          danger: true,
          disabled: inScene(x),
          hint: inScene(x) ? t2("bin-delete-used") : "",
          run: safe(async () => {
            if (inScene(x)) {
              ctx2.notify?.(t2("bin-delete-used"));
              return;
            }
            await app2.trash(x.path);
            void scan2();
          })
        }] : []
      ], { label: x.rel });
      function tile(x) {
        const kind = KIND(x.rel), url = app2.assetUrl?.(x.path), thumb = h("span", { class: "fvs-bin-thumb" });
        if (url && kind === "image") thumb.append(h("img", { src: url, alt: "", loading: "lazy", draggable: "false" }));
        else if (url && kind === "video") thumb.append(h("video", { src: "".concat(url, "#t=0.1"), preload: "metadata", muted: true, playsinline: true, tabindex: "-1" }));
        else thumb.append(icon(kind === "audio" ? "Music2" : "Film"));
        const ai = x.rel.startsWith("generated/");
        return h(
          "button",
          {
            type: "button",
            class: "fvs-bin-item",
            draggable: "true",
            "data-rel": x.rel,
            "data-kind": kind,
            "data-ai": ai ? "" : null,
            title: "".concat(x.rel, "\n").concat(t2("bin-hint")),
            ondragstart: (e) => {
              e.dataTransfer.setData(BIN_MIME, JSON.stringify({ path: x.path }));
              e.dataTransfer.effectAllowed = "copy";
            },
            ondblclick: () => void studio?.place(x.path),
            onclick: (e) => {
              if (e.detail === 0) void studio?.place(x.path);
            },
            // Enter or Space
            oncontextmenu: (e) => {
              e.preventDefault();
              menu(e.currentTarget, x);
            }
          },
          thumb,
          h("span", { class: "fvs-bin-name", text: x.rel.split("/").pop() }),
          h("span", { class: "fvs-bin-used", text: t2("bin-used"), hidden: true }),
          ai ? h("span", { class: "fvs-bin-ai", text: t2("bin-ai") }) : null
        );
      }
      function show() {
        let on = 0;
        for (const b of grid.children) {
          const match = filter === "all" || (filter === "unused" ? b.querySelector(".fvs-bin-used").hidden : filter === "ai" ? "ai" in b.dataset : b.dataset.kind === filter);
          b.hidden = !match;
          if (match) on++;
        }
        filterName.textContent = t2("bin-filter-".concat(filter));
        filterBtn.setAttribute("aria-pressed", String(filter !== "all"));
        count.textContent = items.length ? filter === "all" ? String(items.length) : "".concat(on, " / ").concat(items.length) : "";
        empty.textContent = !studio ? t2("bin-no-project") : !items.length ? t2("bin-empty") : on ? "" : t2("bin-filter-none");
        empty.hidden = !empty.textContent;
      }
      let seen = null;
      const badges = () => {
        seen = studio?.text() ?? null;
        for (const b of grid.children) b.querySelector(".fvs-bin-used").hidden = !seen?.includes(b.dataset.rel);
        show();
      };
      function paint() {
        importBtn.disabled = filterBtn.disabled = !studio;
        grid.replaceChildren(...items.map(tile));
        badges();
      }
      const timer = setInterval(() => {
        if (studio && studio.text() !== seen) badges();
      }, 1e3);
      const poll = setInterval(() => {
        if (shell.isConnected) void scan2();
      }, 6e3);
      const off = dock.watch(() => void scan2());
      void scan2();
      return () => {
        disposed = true;
        clearInterval(timer);
        clearInterval(poll);
        off();
        closeLayer();
        shell.remove();
      };
    }
    ctx2.registerView?.({ id: "studio", title: t2("app"), icon: "embed", workspaceSource: "projects", singleton: true, mount: (el, view) => mountWorkspace(el, view) });
    ctx2.registerView?.({ id: "preview", title: t2("mini-preview"), icon: "embed", singleton: true, mount: (el, view) => mountWorkspace(el, view, true) });
    ctx2.registerView?.({ id: "timeline", title: t2("timeline"), icon: "layout", singleton: true, mount: (el) => mountTimeline(el) });
    ctx2.registerView?.({ id: "nav", title: t2("workspace-welcome"), icon: "list-view", singleton: true, mount: (el) => mountNav(el) });
    ctx2.registerView?.({ id: "media", title: t2("bin"), icon: "image", singleton: true, mount: (el) => mountBin(el) });
    if (canChat) ctx2.registerView?.({ id: "chat", title: t2("chat"), icon: "quote", singleton: true, mount: (el) => mountChat(el) });
    ctx2.registerListSource?.({
      id: "projects",
      title: t2("projects"),
      items: (filter) => rows(filter?.query),
      search: true,
      activeKey: () => selected,
      subscribe(fn) {
        listeners.add(fn);
        void refresh();
        const poll = setInterval(refresh, 8e3);
        return () => {
          listeners.delete(fn);
          clearInterval(poll);
        };
      },
      open: (row) => open(row.key),
      itemMenu: (row) => projectActions(row.key).map(({ id, label, danger, run }) => ({ id, label, danger, run })),
      actions: [{ id: "new", label: t2("new-project-short"), primary: true, run: newProject }, { id: "refresh", label: t2("refresh-projects"), run: refresh }]
    });
    ctx2.registerCommand({ id: "fvs-open-studio", title: t2("open-workspace"), keywords: "video studio space \u89C6\u9891\u5DE5\u4F5C\u5BA4 \u7A7A\u95F4", run: () => ctx2.openView?.("studio") });
    return { open, newProject };
  }

  // src/ui/plugin.js
  var t = makeT(ctx);
  var EXT = ".fvs.md";
  var ICON = "layout";
  var app = ctx.app || {};
  var workspace = null;
  var exists = async (p) => {
    try {
      return await app.readFile(p) !== null;
    } catch {
      return false;
    }
  };
  async function remember(path) {
    try {
      const d = await ctx.loadData?.() || {};
      await ctx.saveData?.({ ...d, last: path });
    } catch {
    }
  }
  async function createProject(folder, open = true) {
    const base = t("default-name");
    let path = joinPath(folder || "", "".concat(base).concat(EXT));
    for (let k = 2; await exists(path); k++) path = joinPath(folder || "", "".concat(base, " ").concat(k).concat(EXT));
    await app.writeFile(path, emptyTemplate({ title: base, zh: !t.en() }));
    await trust(ctx, path);
    if (open && app.openFile) app.openFile(path);
    return path;
  }
  var registered = ctx.registerFileType({
    id: "project",
    extensions: [EXT],
    icon: ICON,
    title: "Video project",
    mount(el, file) {
      remember(file.filePath);
      return mountStudio(ctx, el, file.filePath, t, { openWorkspace: () => workspace?.open(file.filePath) });
    }
  });
  if (registered !== false) {
    workspace = registerWorkspace(ctx, t, { createProject, remember });
    ctx.registerFileCreator({ id: "new-project", label: t("new-project"), icon: ICON, run: (parent) => createProject(parent).then(() => {
    }) });
    ctx.registerCommand({
      id: "fvs-new-project",
      title: "Video Studio\uFF1A".concat(t("new-project")),
      keywords: "video studio fvs \u89C6\u9891 \u5DE5\u7A0B \u65B0\u5EFA \u52A8\u753B \u5BA3\u4F20\u7247",
      run: workspace.newProject
    });
    ctx.registerCommand({
      id: "fvs-open-project",
      title: t.en() ? "Video Studio: Open the last project" : "Video Studio\uFF1A\u6253\u5F00\u6700\u8FD1\u7684\u5DE5\u7A0B",
      keywords: "video studio fvs recent \u6700\u8FD1",
      run: async () => {
        let last = null;
        try {
          last = (await ctx.loadData?.() || {}).last;
        } catch {
          last = null;
        }
        if (last && await exists(last)) workspace.open(last);
        else workspace.newProject();
      },
      invoke: {
        description: "Open a Forsion Video Studio project (.fvs.md, vault-relative path) in the Video Studio editor so the user sees it. Use it after creating or editing a project for the user.",
        params: { type: "object", properties: { path: { type: "string", description: "Vault-relative path of the .fvs.md file" } }, required: ["path"] },
        run: async (args) => {
          const p = String(args && args.path || "").replace(/^\/+/, "");
          if (!p.toLowerCase().endsWith(EXT)) throw new Error("not a ".concat(EXT, " file: ").concat(p));
          if (!await exists(p)) throw new Error("no such file in the vault: ".concat(p));
          workspace.open(p);
        }
      }
    });
    ctx.registerSlashItem({
      id: "fvs-new-embed",
      label: () => t("new-project"),
      group: () => "Video Studio",
      icon: ICON,
      keywords: "video studio fvs \u89C6\u9891 \u5DE5\u7A0B \u52A8\u753B",
      run: async ({ folder }) => "![[".concat(await createProject(folder, false), "]]")
    });
    ctx.registerEmbedRenderer({
      id: "fvs-embed",
      match: (target) => target.toLowerCase().endsWith(EXT),
      mount(el, embed) {
        let disposed = false, raf = 0, frame = null, playing = false, time = 0, start = 0, offReady = null;
        const title = h("b", { text: embed.target.split("/").pop() });
        const playBtn = h("button", { type: "button", disabled: true, "aria-label": t("play"), title: t("play") }, icon("Play"));
        const setPlaying = (on) => {
          playBtn.replaceChildren(icon(on ? "Pause" : "Play"));
          playBtn.setAttribute("aria-label", t(on ? "pause" : "play"));
          playBtn.title = t(on ? "pause" : "play");
        };
        const open = h("button", { type: "button" }, t("embed-open"));
        const box = h("div", { class: "fvs-embed" });
        box.append(h("style", { text: EMBED_CSS }));
        box.append(h("div", { class: "bar" }, playBtn, title, open));
        el.append(box);
        (async () => {
          let path = embed.target.replace(/^\/+/, "");
          if (!await exists(path)) path = joinPath(dirOf2(embed.pagePath || ""), embed.target);
          if (disposed || !await exists(path)) return;
          open.onclick = () => app.openFile(path);
          const text = await app.readFile(path);
          const p = parseProject(text || "");
          title.textContent = p.meta.title || title.textContent;
          if (!(await trustList(ctx)).includes(path)) return;
          const html = await previewHtml(p, path, assetLoader(ctx));
          if (disposed) return;
          frame = h("iframe", { sandbox: "allow-scripts", title: p.meta.title || "video", style: { aspectRatio: "".concat(p.meta.width, "/").concat(p.meta.height) } });
          frame.srcdoc = html;
          box.prepend(frame);
          const poster = p.scenes[1] ? p.scenes[1].t0 + 0.5 : 0;
          const post = (x) => frame.contentWindow && frame.contentWindow.postMessage({ fvs: "seek", t: x }, "*");
          const ready = (e) => {
            if (e.source !== frame.contentWindow || !e.data || e.data.fvs !== "ready") return;
            post(playing || time > 0 && time < p.length ? time : poster);
            if (playing) frame.contentWindow.postMessage({ fvs: "transport", playing }, "*");
            playBtn.disabled = false;
          };
          window.addEventListener("message", ready);
          offReady = () => window.removeEventListener("message", ready);
          const tick = () => {
            if (disposed || !playing) return;
            time = (performance.now() - start) / 1e3;
            if (time >= p.length) {
              playing = false;
              setPlaying(false);
              post(poster);
              return;
            }
            post(time);
            raf = requestAnimationFrame(tick);
          };
          playBtn.onclick = () => {
            playing = !playing;
            setPlaying(playing);
            frame.contentWindow?.postMessage({ fvs: "transport", playing }, "*");
            if (playing) {
              start = performance.now() - (time >= p.length ? 0 : time) * 1e3;
              tick();
            }
          };
        })();
        return () => {
          disposed = true;
          offReady?.();
          cancelAnimationFrame(raf);
          box.remove();
        };
      }
    });
  }
})();
