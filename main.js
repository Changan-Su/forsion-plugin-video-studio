/* Forsion Video Studio 0.7.0 — built from src/ by build.mjs; edit the sources, not this file. */
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
    "projects-empty": "\u8FD8\u6CA1\u6709\u89C6\u9891\u5DE5\u7A0B\u3002\u65B0\u5EFA\u4E00\u4E2A\uFF0C\u6216\u6253\u5F00\u5B8C\u6574\u793A\u4F8B\u3002",
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
    "score": "\u914D\u4E50",
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
    "open-example": "\u6253\u5F00\u793A\u4F8B \xB7 \u7B2C 2.12 \u8BDD",
    "example-audio-failed": "\u793A\u4F8B\u7684\u914D\u4E50\u6CA1\u4E0B\u8F7D\u4E0B\u6765\uFF0C\u753B\u9762\u7167\u5E38\u53EF\u7528\u3002\u53EF\u4EE5\u8BA9 AI \u4ECE\u63D2\u4EF6\u76EE\u5F55\u590D\u5236 audio/episode-2.12-score.mp3\u3002",
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
    "example-folder": "\u7B2C 2.12 \u8BDD",
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
    "audio-track-n": "\u97F3\u8F68 {n}",
    "drop-audio": "\u628A\u97F3\u4E50\u6216\u97F3\u6548\u62D6\u5230\u8FD9\u91CC",
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
    "new-project-short": "\u65B0\u5EFA\u5DE5\u7A0B"
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
    "projects-empty": "No video projects yet. Create one or open the complete example.",
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
    "score": "Score",
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
    "open-example": "Open the 2.12 example",
    "example-audio-failed": "The example's score did not download; the picture works. The AI can copy audio/episode-2.12-score.mp3 from the plugin folder.",
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
    "example-folder": "Episode 2.12",
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
    "audio-track-n": "Track {n}",
    "drop-audio": "Drop music or sound here",
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
    "new-project-short": "New project"
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
      cues.push({ start, end, text: block.slice(k + 1).join("\n").trim(), line: from + k + 1 });
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
    if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, message: 'the project has no scenes yet (add a "## id \xB7 Title" section)' });
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
      const tag = { index: tags.length, name, start: i, end, attrs, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };
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
    return tags.filter((t2) => ["data-in", "data-out", "data-seq"].some((k) => t2.attr(k) !== void 0)).map((t2) => {
      const label = texts.find((x) => x.start > t2.start);
      return { tag: t2.index, name: t2.name, in: t2.attr("data-in"), out: t2.attr("data-out"), fx: t2.attr("data-fx"), seq: t2.attr("data-seq"), each: t2.attr("data-each"), label: label ? label.text.trim().slice(0, 40) : "<".concat(t2.name, ">") };
    });
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
  var runtime_src_default = '/* Forsion Video Studio 0.7.0 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\nvar FVS=(()=>{var nt=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ht=Object.prototype.hasOwnProperty;var gt=(t,e)=>{for(var i in e)nt(t,i,{get:e[i],enumerable:!0})},bt=(t,e,i,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of mt(e))!ht.call(t,o)&&o!==i&&nt(t,o,{get:()=>e[o],enumerable:!(p=pt(e,o))||p.enumerable});return t};var yt=t=>bt(nt({},"__esModule",{value:!0}),t);var Ht={};gt(Ht,{EASE:()=>V,boot:()=>It,createStage:()=>et,mount:()=>tt,prog:()=>Z,rng:()=>Q,timeExpr:()=>ot});var V={lin:t=>t,in:t=>t*t*t,out:t=>1-(1-t)**3,io:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,expo:t=>t>=1?1:1-2**(-10*t),back:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,step:t=>t<1?0:1},G=(t,e=0,i=1)=>Math.min(i,Math.max(e,t)),rt=(t,e,i)=>t+(e-t)*i,Z=(t,e,i,p="io")=>(V[p]||V.io)(G((t-e)/(i-e))),Q=t=>()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=["x","y","z","s","sx","sy","r","rx","ry"];function wt(t,e){if(e<=t[0].t)return t[0].v;for(let i=1;i<t.length;i++){let p=t[i];if(e<p.t){let o=t[i-1],h=(V[p.e]||V.io)((e-o.t)/(p.t-o.t)),l={};for(let w in p.v){let $=w in o.v?o.v[w]:p.v[w],y=p.v[w];l[w]=typeof y=="number"&&typeof $=="number"?$+(y-$)*h:h<1?$:y}return l}}return t[t.length-1].v}function $t(t,e,i){let p=t.style;if(i){let o=`translate3d(${e.x||0}px,${e.y||0}px,${e.z||0}px)`;e.rx&&(o+=` rotateX(${e.rx}deg)`),e.ry&&(o+=` rotateY(${e.ry}deg)`),e.r&&(o+=` rotate(${e.r}deg)`),(e.s??1)!==1&&(o+=` scale(${e.s})`),((e.sx??1)!==1||(e.sy??1)!==1)&&(o+=` scale(${e.sx??1},${e.sy??1})`),p.transform=o}"o"in e&&(p.opacity=e.o,p.visibility=e.o<.002?"hidden":""),("b"in e||"br"in e)&&(p.filter=`blur(${e.b||0}px) brightness(${e.br??1})`),("ct"in e||"cr"in e||"cb"in e||"cl"in e)&&(p.clipPath=`inset(${e.ct||0}% ${e.cr||0}% ${e.cb||0}% ${e.cl||0}%)`);for(let o in e)o[0]==="-"&&p.setProperty(o,e[o])}function et(t){let e=[],i=[],p=o=>typeof o=="string"?[...t.querySelectorAll(o)]:o==null?[]:o instanceof Element?[o]:[...o];return{root:t,q:p,tracks:e,hooks:i,K(o,h,l={}){let w={},$=h.map(([M,k={},L="io"])=>(w={...w,...k},{t:M,v:w,e:L}));if(!$.length)return;let y=$.some(M=>Object.keys(M.v).some(k=>xt.includes(k)));p(o).forEach((M,k)=>e.push({el:M,kf:$,hasTf:y,off:(l.stagger||0)*k}))},S(o,h,l){let w=p(o);i.push($=>{for(let y of w)y.style.display=$>=h&&$<l?"":"none"})},H(o){i.push(o)},type(o,h,l=30,w=0){p(o).forEach(($,y)=>{let M=[...$.textContent],k=h+w*y;i.push(L=>{let S=G(Math.floor((L-k)*l),0,M.length),q=M.slice(0,S).join("");$.textContent!==q&&($.textContent=q)})})},render(o){for(let h of i)h(o);for(let h of e)$t(h.el,wt(h.kf,o-h.off),h.hasTf)}}}var K=null;function kt(){if(K)return K;let t=Q(7);K=[];for(let e=0;e<4;e++){let i=document.createElement("canvas");i.width=i.height=200;let p=i.getContext("2d"),o=p.createImageData(200,200);for(let h=0;h<o.data.length;h+=4){let l=t()*255;o.data[h]=o.data[h+1]=o.data[h+2]=l,o.data[h+3]=255}p.putImageData(o,0,0),K.push(`url(${i.toDataURL()})`)}return K}function it(t,e=".grain"){let i=t.q(e),p=kt();t.H(o=>{let h=p[Math.floor(o*24)%4];for(let l of i)l.style.backgroundImage=h})}var vt=["","aborted","network error","decode error","format not supported or file missing"];function at(t,{mode:e="live",assets:i={},errors:p=[],onError:o=null}={}){let h={};for(let[s,c]of Object.entries(i||{}))typeof c=="string"&&!(c in h)&&(h[c]=s);let l=[],w=[],$=s=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(s||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let m=atob(s.slice(c[0].length).replace(/\\s+/g,"")),g=new Uint8Array(m.length);for(let I=0;I<m.length;I++)g[I]=m.charCodeAt(I);let b=URL.createObjectURL(new Blob([g],{type:c[1]||"video/mp4"}));return w.push(b),b}catch{return null}};for(let s of t)for(let c of s.el.querySelectorAll("video")){let m=c.querySelector("source[src]"),g=c.getAttribute("src")||(m?m.getAttribute("src"):"")||"";for(let I of[c,...c.querySelectorAll("source[src]")]){let n=$(I.getAttribute("src"));n&&I.setAttribute("src",n)}let b={el:c,scene:s.id,src:h[g]||g,from:s.from,to:s.to,base:s.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=b.loop,c.addEventListener("error",()=>{b.failed=!0,S(b,y(b))},!0),c.addEventListener("loadedmetadata",()=>{M(b)||S(b,k(b))}),c.addEventListener("seeked",()=>{let I=b.want;b.want=null,I!==null&&Math.abs(c.currentTime-I)>.05&&S(b,k(b))});try{c.pause(),c.load()}catch{}l.push(b)}if(!l.length)return null;function y(s){let c=s.el.error,m=c?c.code:0,g=c?` (${vt[m]||`error ${m}`}${c.message?`: ${c.message}`:""})`:"",b=m===3||m===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${s.src}" cannot be played${g}${b}`}function M(s){let c=s.el,m=c.duration,g=c.seekable;return!(Number.isFinite(m)&&m>.5&&(!g||!g.length||g.end(g.length-1)<.01))}let k=s=>`video "${s.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function L(s,c){s.want=c,s.el.currentTime=c}function S(s,c){if(!s.reported&&(s.reported=!0,p.push({scene:s.scene,message:c,line:0}),o))try{o(s.scene,s.src)}catch{}}function q(s,c){let m=s.el.duration,g=m>0&&Number.isFinite(m),b=s.clipIn+(c-s.base);return s.loop&&g&&(b=(b%m+m)%m),b<0&&(b=0),g&&b>m-.001&&(b=Math.max(0,m-.001)),b}let F=(s,c)=>c>=s.from&&c<s.to;function N(s,c){return s.chain=s.chain.then(()=>new Promise(m=>{let g=s.el;if(s.failed){m();return}let b=!1,I=null,n=null,a=()=>u(null),u=E=>{b||(b=!0,clearTimeout(f),g.removeEventListener("error",a,!0),I&&g.removeEventListener("loadedmetadata",I),n&&g.removeEventListener("seeked",n),E?(S(s,E),(g.readyState===0||++s.misses>=3)&&(s.failed=!0)):s.misses=0,m())},f=setTimeout(()=>u(s.failed||g.error?null:`video "${s.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);g.addEventListener("error",a,!0);let T=()=>{if(I=null,s.failed||g.error){u(null);return}let E=q(s,c);if(s.at===E&&!g.seeking){u(null);return}let B=!1,H=!g.requestVideoFrameCallback,C=()=>{if(!(!B||!H)){if(Math.abs(g.currentTime-E)>.05){u(k(s));return}s.at=E,u(null)}};g.requestVideoFrameCallback&&g.requestVideoFrameCallback(()=>{H=!0,C()}),n=()=>{B=!0,g.requestVideoFrameCallback?C():requestAnimationFrame(()=>requestAnimationFrame(C))},g.addEventListener("seeked",n,{once:!0}),s.at=null,L(s,E)};g.readyState>=1?T():(I=T,g.addEventListener("loadedmetadata",I,{once:!0}))})),s.chain}let d=null,r=0,v=null,O=0,j=(s,c,m)=>{let g=Math.abs(c-m),b=s.el.duration;return s.loop&&b>0&&Number.isFinite(b)?Math.min(g,b-g):g},_=s=>{try{let c=s.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},U=(s,c)=>{let m=s.el;m.paused||m.pause(),Math.abs(m.currentTime-c)>.001&&L(s,c)};function P(s){!o||s.reported||s.stall||s.el.readyState>0||(s.stall=setTimeout(()=>{s.stall=0,s.el.readyState===0&&S(s,`video "${s.src}" did not load within ${8e3/1e3} s`)},8e3))}function D(){for(let s of l)s.failed||(d!==null&&F(s,d)?U(s,q(s,d)):s.el.paused||s.el.pause())}function Y(s){let c=d===null?NaN:s-d,m=performance.now(),g=(m-r)/1e3;d=s,r=m;let b=c>0&&c<=.3,I=v===!0?b:v===null&&b&&Math.abs(c-g)<.1;for(let n of l){if(n.failed)continue;let a=n.el;if(!F(n,s)){a.paused||a.pause(),s<n.from&&n.from-s<=1&&U(n,q(n,n.from));continue}P(n);let u=q(n,s),f=a.duration,T=!n.loop&&f>0&&Number.isFinite(f)&&u>=f-.001-.001;I&&!T?a.paused?(j(n,a.currentTime,u)>.001&&L(n,u),_(n)):j(n,a.currentTime,u)>.15&&L(n,u):U(n,u)}clearTimeout(O),O=setTimeout(D,150)}return{clips:l,seek(s){if(e!=="capture"){Y(s);return}let c=[];for(let m of l)F(m,s)?c.push(m):m.el.paused||m.el.pause();return Promise.all(c.map(m=>N(m,s))).then(()=>{})},transport(s){v=!!s,v||(clearTimeout(O),D())},ready(){return Promise.all(l.map(s=>new Promise(c=>{let m=s.el;if(s.failed||m.error||m.readyState>=2){c();return}let g=()=>{clearTimeout(b),m.removeEventListener("loadeddata",g),m.removeEventListener("error",g,!0),c()},b=setTimeout(()=>{m.readyState===0&&!s.failed&&(s.failed=!0,S(s,`video "${s.src}" did not load within ${1e4/1e3} s`)),g()},1e4);m.addEventListener("loadeddata",g),m.addEventListener("error",g,!0)})))},destroy(){clearTimeout(O);for(let s of l){clearTimeout(s.stall);try{s.el.pause()}catch{}}for(let s of w)URL.revokeObjectURL(s)}}}var St=`\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\n.fvs-scenes{position:absolute;inset:0}\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\n.fvs-transition{position:absolute;inset:0}\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\n`,st={fade:t=>({b:{opacity:t}}),dip:t=>({a:{opacity:G(1-2*t)},b:{opacity:G(2*t-1)}}),"slide-left":(t,e)=>({b:{transform:`translateX(${(1-t)*e}px)`}}),"slide-up":(t,e,i)=>({b:{transform:`translateY(${(1-t)*i}px)`}}),"push-left":(t,e)=>({a:{transform:`translateX(${-t*e}px)`},b:{transform:`translateX(${(1-t)*e}px)`}}),"wipe-left":t=>({b:{clipPath:`inset(0 0 0 ${(1-t)*100}%)`}}),zoom:t=>({b:{opacity:t,transform:`scale(${1.08-.08*t})`}}),blur:t=>({b:{opacity:t,filter:`blur(${12*(1-t)}px)`}})},ct=1e-4,lt=new Set(["dip","push-left"]),Et=["opacity","transform","clipPath","filter"],Wt=Object.keys(st),Tt=/^\\s*(?:(h)(\\d+)|(end|start))?\\s*(?:([+-])?\\s*(\\d*\\.?\\d+)\\s*(b|beats?|s|secs?)?)?\\s*$/i;function ot(t,e,i,p){let o=String(t).match(Tt);if(!o||!o[1]&&!o[3]&&!o[5])throw new Error(`cannot read time "${t}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let h=e.t0;if(o[1]){let l=+o[2];if(!(l<e.hits.length))throw new Error(`"${t}": this scene has ${e.hits.length} hits (h0\\u2013h${e.hits.length-1})`);h=e.hits[l]}if(o[3]==="end"&&(h=e.t1),o[5]){let l=+o[5]*(o[4]==="-"?-1:1),w=(o[6]||"").toLowerCase();h+=l*(w.startsWith("b")?p:w.startsWith("s")?1:i)}return h}function tt(t,e,{doc:i=document,onScene:p=null,media:o="live",onMediaError:h=null}={}){let l=t,w=[],$=l.tempo,y=$?60/$.bpm:.5,M=y*($?$.beatsPerBar:4),k=$?y:1,L=i.createElement("style");L.setAttribute("data-fvs",""),L.textContent=St+`\n`+(l.css||"")+`\n`+l.scenes.filter(n=>n.css&&n.css.trim()).map(n=>`[data-scene="${n.id}"]{\n${n.css}\n}`).join(`\n`),i.head.append(L);let S=i.createElement("div");S.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(S.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),S.innerHTML=l.stage.html||"";let q=S.querySelector("[data-fvs-scenes], fvs-scenes"),F=i.createElement("div");F.className="fvs-scenes",q?q.replaceWith(F):S.prepend(F),q=F,e.append(S);let N=et(S),d=[],r={},v=l.assets||{},O=n=>v[String(n).replace(/^\\.\\//,"")]||n,j=l.scenes,_=n=>n&&n.transition&&st[n.transition.type]&&n.transition.dur>0?n.transition:null,U=j.map((n,a)=>{let u=_(j[a+1]);return u?u.dur:0}),P=[],D=[];for(let[n,a]of j.entries()){let u=i.createElement("div");u.className=`fvs-scene scene ${a.cls||""}`.trim(),u.dataset.scene=a.id,u.innerHTML=a.html||"";let f=_(j[n+1]),T=u;(_(a)||f&&lt.has(f.type))&&(T=i.createElement("div"),T.className="fvs-transition",T.append(u),D.push(T)),P.push(T),q.append(T),N.S(T===u?u:[u,T],a.t0,a.t1+U[n]);let E=typeof a.t0v=="number"?a.t0v:a.t0;r[a.id]={id:a.id,title:a.title,t0:a.t0,t1:a.t1,dur:a.t1-a.t0,t0v:E,in:typeof a.in=="number"?a.in:a.t0-E,hits:a.hits,beats:a.beats,el:u,transition:_(a)},p&&p(r[a.id])}let Y=[];j.forEach((n,a)=>{let u=_(n);u&&a>0&&Y.push({t0:n.t0,d:u.dur,fx:st[u.type],a:lt.has(u.type)?P[a-1]:null,b:P[a]})}),Y.length&&N.H(n=>{let a=Y.find(f=>n>=f.t0&&n<f.t0+f.d),u=new Map;if(a){let f=a.fx(Z(n,a.t0,a.t0+a.d,"io"),l.width,l.height);f.a&&a.a&&u.set(a.a,f.a),f.b&&u.set(a.b,f.b)}for(let f of D){let T=u.get(f);for(let E of Et)f.style[E]=T&&T[E]!==void 0?String(T[E]):""}});function s(n,a){let u=x=>typeof x=="string"?[...a.querySelectorAll(x)]:x==null?[]:x instanceof Element?[x]:[...x],f=(x,A,z)=>N.K(u(x),A,z),T=(x,A,z)=>N.S(u(x),A,z),E=x=>n.t0+x*k,B=(x,A=0)=>x<n.hits.length?n.hits[x]+A*k:NaN,H=(x,A,z)=>f(x,[[A-.01,{o:0}],[A,{o:1},"step"]],z),C=(x,A,z={y:20},R)=>f(x,[[A-.01,{o:0,...z}],[A,{o:1},"step"],[A+.18,{x:0,y:0},"out"]],R),W=(x,A,z=y/2,R)=>f(x,[[A,{o:0}],[A+z,{o:1},"out"]],R),X=(x,A,z=n.t1+(n.tail||0))=>u(x).forEach((R,J)=>J<A.length&&N.S(R,A[J],A[J+1]??z));return{t0:n.t0,t1:n.t1,dur:n.t1-n.t0,hits:n.hits||[],beat:y,bar:M,unit:k,at:E,hit:B,root:a,stage:S,$:x=>a.querySelector(x),$$:x=>[...a.querySelectorAll(x)],K:f,S:T,H:x=>N.H(x),on:x=>N.H(x),type:(x,A,z,R)=>N.type(u(x),A,z,R),cut:H,slide:C,fade:W,seq:X,flash:(x,A=.85)=>d.push([x,A]),grain:(x=".grain")=>it({q:u,H:N.H},x),prog:Z,ease:V,clamp:G,lerp:rt,rng:Q,scenes:r,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:$},width:l.width,height:l.height,fps:l.fps,length:l.length,during:x=>x.map(A=>Array.isArray(A)?A:r[A]?[r[A].t0,r[A].t1]:[0,0]),inside:(x,A)=>A.some(([z,R])=>x>=z&&x<R)}}function c(n,a,u,f){if(!n||!n.trim())return;let T=Object.keys(a);try{new Function(...T,`${n}\n//# sourceURL=fvs://${u}.js`)(...T.map(E=>a[E]))}catch(E){let B=String(E&&E.stack||"").match(new RegExp(`fvs://${u.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")}\\\\.js:(\\\\d+)`));w.push({scene:u.replace(/^scene\\//,""),message:String(E&&E.message||E),line:B&&f?f+ +B[1]-3:f||0})}}function m(n,a){let u=(f,T)=>{try{return ot(f,n,k,y)}catch(E){return w.push({scene:n.id,message:E.message,line:0,el:T.tagName}),NaN}};for(let f of n.el.querySelectorAll("[data-seq]")){let T=String(f.dataset.seq).match(/^\\s*h(\\d+)\\s*$/);if(!T){w.push({scene:n.id,message:`data-seq="${f.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let E=[...f.children],B=+T[1],H=E.map((C,W)=>n.hits[B+W]).filter(C=>C!==void 0);H.length<E.length&&w.push({scene:n.id,message:`data-seq has ${E.length} items but only ${H.length} hits from h${B}`}),a.seq(E,H,f.dataset.seqEnd?u(f.dataset.seqEnd,f):n.t1+(n.tail||0))}for(let f of n.el.querySelectorAll("[data-in], [data-out]")){let T=f.dataset.each!==void 0?+f.dataset.each*k:null,E=T!==null?[...f.children]:[f],B=f.dataset.in!==void 0?u(f.dataset.in,f):null,H=f.dataset.out!==void 0?u(f.dataset.out,f):null,C=(f.dataset.fx||"cut").toLowerCase(),W=(f.dataset.fxOut||"cut").toLowerCase(),X=+f.dataset.dist||24,x=f.dataset.dur!==void 0?+f.dataset.dur*k:y/2;E.forEach((A,z)=>{let R=B===null?null:B+(T||0)*z,J=[];if(R!==null&&!isNaN(R))if(C==="type")N.type([A],R,+f.dataset.cps||30);else if(C==="fade")J.push([R,{o:0}],[R+x,{o:1},"out"]);else if(C==="pop")J.push([R-.01,{o:0,s:.92}],[R,{o:1},"step"],[R+.25,{s:1},"back"]);else if(/^(up|down|left|right)$/.test(C)){let dt={up:{y:X},down:{y:-X},left:{x:X},right:{x:-X}}[C];J.push([R-.01,{o:0,...dt}],[R,{o:1},"step"],[R+.18,{x:0,y:0},"out"])}else J.push([R-.01,{o:0}],[R,{o:1},"step"]);H!==null&&!isNaN(H)&&(W==="fade"?(J.length||J.push([n.t0,{o:1}]),J.push([H,{o:1}],[H+x,{o:0},"in"])):N.S([A],-1e9,H)),J.length&&N.K([A],J)})}}if(j.forEach((n,a)=>{let u=r[n.id],f={...u,t0:u.t0v,dur:u.t1-u.t0v,tail:U[a]},T=s(f,u.el);m(f,T),c(n.js,T,`scene/${n.id}`,n.line)}),c(l.stage.js,s({id:"stage",t0:0,t1:l.length,hits:[],el:S},S),"stage",l.stage.line),l.captions&&l.captions.length){let n=i.createElement("div"),a=l.captionStyle||{};n.className="fvs-captions",n.dataset.position=a.position==="top"?"top":"bottom",n.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[a.size]||.045))}px`,S.append(n);let u=/<\\/?[a-z][^>]*>/gi,f="";N.H(T=>{let E=T-ct,B=l.captions.filter(C=>E>=C.t0-1e-6&&E<C.t1-1e-6&&C.text),H=B.map(C=>`${C.t0}\\0${C.text}`).join("");H!==f&&(f=H,n.replaceChildren(...B.map(C=>{let W=i.createElement("div");return W.className="fvs-caption",W.textContent=C.text.replace(u,""),W})))})}let g=[...S.querySelectorAll("[data-fvs-flash]")];g.length&&(d.sort((n,a)=>n[0]-a[0]),N.H(n=>{let a=0;for(let[u,f]of d)n>=u&&n<u+.18&&(a=Math.max(a,f*(1-(n-u)/.18)**2));for(let u of g)u.style.opacity=a}));let b=at([...j.map((n,a)=>({id:n.id,el:r[n.id].el,from:n.t0,to:n.t1+U[a],base:r[n.id].t0v})),{id:"stage",el:{querySelectorAll:n=>[...S.querySelectorAll(n)].filter(a=>!q.contains(a))},from:-1/0,to:1/0,base:0}],{mode:o,assets:l.assets,errors:w,onError:h});return{root:S,errors:w,scenes:r,seek:n=>{let a=n+ct;return N.render(a),b?b.seek(a):void 0},payload:l,videos:b,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:n=>{b&&b.transport(n)},ready:()=>b?b.ready():Promise.resolve(),destroy(){b&&b.destroy(),S.remove(),L.remove()}}}var At=t=>t.trim().replace(/^\\.\\//,"");var Lt=t=>({id:t.id,kind:"track",src:t.src,url:t.url??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!!t.mute,role:t.role}),jt=(t,e={})=>({id:t.id,kind:"video",scene:t.scene,src:t.src,url:t.url??e[At(t.src)]??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!1,loop:!!t.loop});var ut=t=>t?[...(t.audio||[]).map(Lt),...(t.media||[]).map(e=>jt(e,t.assets))]:[];var Nt=`\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\n.fvs-bar{display:flex;gap:10px;align-items:center}\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\n`,ft=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;function Mt(){let t=document.getElementById("fvs-data");return JSON.parse(t.textContent)}function Ot(t,e,i,p){let o=!1,h=0,l=0,w=()=>o?Math.min(i,h+(performance.now()-l)/1e3):h,$=y=>{let M=w();for(let k of e){let{el:L}=k,S=L.duration,q=k.loop&&S>0&&Number.isFinite(S),F=M-k.at+k.in;q&&(F=(F%S+S)%S);let N=k.dur!=null&&M>=k.at+k.dur;if(!o||M<k.at||N||F>(S||1/0)){L.paused||L.pause(),M<k.at&&L.currentTime!==k.in&&(L.currentTime=k.in);continue}let d=Math.abs(L.currentTime-F);(y||(q?Math.min(d,S-d):d)>.08)&&(L.currentTime=F),L.paused&&L.play().catch(()=>{})}};return{now:w,sync:$,get playing(){return o},play(){h>=i&&(h=0),o=!0,l=performance.now(),$(!0)},pause(){h=w(),o=!1,$()},seek(y){h=Math.max(0,Math.min(i,y)),l=performance.now(),$(!0)},tick(){o&&w()>=i?(h=i,o=!1,$(),p&&p()):o&&$()}}}function Ct(t,e,i){let p=()=>{t.root.style.transform=`scale(${e.clientWidth/i.width})`};new ResizeObserver(p).observe(e),p()}function Rt(t){let e=document.createElement("style");e.textContent=Nt,document.head.append(e);let i=document.createElement("main");i.className="fvs-app",i.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\u25B6 \\u64AD\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\u8FDB\\u5EA6"><output></output></div>\n    <ol class="fvs-chapters" aria-label="\\u7AE0\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(i),i.querySelector("h1").textContent=t.title||"";let p=i.querySelector(".fvs-frame");p.style.aspectRatio=`${t.width} / ${t.height}`,p.style.maxWidth=`calc((100vh - 200px) * ${t.width/t.height})`,p.style.margin="0 auto",p.setAttribute("aria-label",t.title||"video");let o=tt(t,p);Ct(o,p,t);let h=ut(t).filter(r=>!r.mute).map(r=>{let v=new Audio(r.url);return v.preload="auto",v.loop=!!r.loop,v.volume=Math.min(1,10**((r.gain||0)/20)),{el:v,at:r.at,in:r.in,dur:r.dur,loop:!!r.loop}}),l=i.querySelector(".fvs-play"),w=i.querySelector("input"),$=i.querySelector("output");w.max=t.length;let y=Ot(t,h,t.length),M=i.querySelector(".fvs-chapters");M.innerHTML=t.scenes.map(r=>`<li><button type="button" data-t="${r.t0}"><b>${r.t0.toFixed(1)}</b></button></li>`).join(""),[...M.querySelectorAll("button")].forEach((r,v)=>r.append(t.scenes[v].title||t.scenes[v].id));let k=[...M.querySelectorAll("button")];if(o.errors.length){let r=i.querySelector(".fvs-err");r.hidden=!1,r.textContent=o.errors.map(v=>`${v.scene}${v.line?`:${v.line}`:""} ${v.message}`).join(`\n`)}let L=()=>y.playing?y.pause():y.play();l.addEventListener("click",L),p.addEventListener("click",L),w.addEventListener("input",()=>y.seek(+w.value)),k.forEach(r=>r.addEventListener("click",()=>{y.seek(+r.dataset.t),y.playing||y.play()})),document.addEventListener("keydown",r=>{r.target.closest&&r.target.closest("input,button,textarea")||(r.code==="Space"&&(r.preventDefault(),L()),r.code==="ArrowRight"&&y.seek(y.now()+2),r.code==="ArrowLeft"&&y.seek(y.now()-2))});let S=-1,q=null,F=t.scenes.length?Math.min(t.length,t.scenes[Math.min(1,t.scenes.length-1)].t0+.8):0,N=!1,d=()=>{y.tick();let r=N||y.playing?y.now():F;y.playing&&(N=!0),y.playing!==q&&(q=y.playing,o.transport(q)),r!==S&&(o.seek(r),S=r),w.value=r,$.textContent=`${ft(r)} / ${ft(t.length)}`,l.textContent=y.playing?"\\u275A\\u275A \\u6682\\u505C":"\\u25B6 \\u64AD\\u653E",k.forEach((v,O)=>v.classList.toggle("on",r>=t.scenes[O].t0&&r<t.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{N=!0}),requestAnimationFrame(d),window.__fvs={stage:o,clock:y}}function qt(t){document.documentElement.style.background="#000",document.body.style.margin="0";let e=tt(t,document.body,{media:"capture"});e.root.style.transform="none",e.seek(0),window.__stage={w:t.width,h:t.height,dur:t.length,fps:t.fps,errors:e.errors,audio:t.audio,media:t.media||[],seek:i=>e.seek(i),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(i=>i.complete?0:i.decode().catch(()=>0)),e.ready()]))}}var Ft=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _t(t){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let e=document.createElement("div");e.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${t.width}/${t.height};width:min(100vw, calc(100vh * ${t.width/t.height}))`,document.body.append(e);let i={},p=new WeakMap,o=new WeakMap,h=new WeakMap,l=d=>{let r=[],v=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let j;j=O.nextNode();){if(!/\\S/.test(j.data)||j.parentElement&&Ft.test(j.parentElement.tagName))continue;p.set(j,r.length);let _=j.parentElement;o.has(_)||o.set(_,[]),o.get(_).push(r.length),r.push({node:j,el:_})}v.forEach((j,_)=>h.set(j,_)),i[d.id]={texts:r,imgs:v}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),$=tt(t,e,{onScene:l,onMediaError:(d,r)=>w({type:"media-error",scene:d,src:r})}),y=()=>{$.root.style.transform=`scale(${e.clientWidth/t.width})`};new ResizeObserver(y).observe(e),y();let M=0;$.seek(0);let k=document.createElement("div");k.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",e.append(k);let L=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),S=d=>{if(!d){k.style.display="none";return}let r=e.getBoundingClientRect();Object.assign(k.style,{display:"",left:`${d.x-r.left-3}px`,top:`${d.y-r.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},q=d=>{let r=d&&d.closest&&d.closest("[data-scene]");return r?r.dataset.scene:null};function F(d,r){let v=document.elementFromPoint(d.clientX,d.clientY),O=q(v);if(!O||!i[O]){w({type:"pick",scene:null,dbl:r});return}if(v.tagName==="IMG"&&h.has(v)){w({type:"pick",scene:O,img:h.get(v),rect:L(v.getBoundingClientRect()),dbl:r});return}let j=null,_=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);_&&_.startContainer.nodeType===3&&p.has(_.startContainer)&&(j=p.get(_.startContainer));for(let D=v;j===null&&D&&D!==e;D=D.parentElement)o.has(D)&&(j=o.get(D)[0]);if(j===null){w({type:"pick",scene:O,dbl:r});return}let U=i[O].texts[j],P=U.node.isConnected?(()=>{let D=document.createRange();return D.selectNodeContents(U.node),D.getBoundingClientRect()})():U.el.getBoundingClientRect();w({type:"pick",scene:O,text:j,rect:L(P.width?P:U.el.getBoundingClientRect()),dbl:r})}e.addEventListener("click",d=>F(d,!1)),e.addEventListener("dblclick",d=>{d.preventDefault(),F(d,!0)}),window.addEventListener("message",d=>{let r=d.data||{};if(r.fvs==="seek")M=r.t,$.seek(r.t);else if(r.fvs==="transport")$.transport(!!r.playing);else if(r.fvs==="outline"){let v=i[r.scene],O=v?r.img!=null?v.imgs[r.img]:r.text!=null&&v.texts[r.text]?v.texts[r.text].el:null:null;S(O&&O.isConnected&&O.getClientRects().length?L(O.getBoundingClientRect()):null)}});let N=d=>Object.fromEntries(Object.entries(i).map(([r,v])=>[r,v[d].length]));w({type:"ready",length:t.length,errors:$.errors,texts:N("texts"),imgs:N("imgs")}),window.__fvs={stage:$,seek:d=>$.seek(d)}}function It(t){let e=Mt(),i=typeof window<"u"&&window.FVS_MODE||t||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");i==="capture"?qt(e):i==="embed"?_t(e):Rt(e)}return yt(Ht);})();\n';

  // src/ui/styles.js
  var CSS2 = "\n.fvs-studio,.fvs-extension,.fvs-layer{\n --fv-text:var(--text,#1c1c1c);--fv-muted:var(--text-muted,#5f5f5d);--fv-line:var(--border,#e6e5e3);\n --fv-card:var(--bg-card,#fdfdfc);--fv-accent:var(--accent-ink,var(--accent,#1c1c1c));\n --fv-accent-soft:var(--accent-light,color-mix(in srgb,var(--fv-accent) 9%,transparent));\n --fv-fill:var(--action-fill,var(--fv-accent));--fv-on-fill:var(--on-action,var(--on-accent,#fff));\n --fv-hover:var(--overlay-light,color-mix(in srgb,var(--fv-text) 4%,transparent));\n --fv-press:var(--overlay-medium,color-mix(in srgb,var(--fv-text) 7%,transparent));\n --fv-strong:var(--overlay-strong,color-mix(in srgb,var(--fv-text) 14%,transparent));\n --fv-ok:var(--green,#4f6f52);--fv-warn:var(--warning,#806000);--fv-bad:var(--danger,#a3503f);\n --fv-wave:color-mix(in srgb,var(--fv-accent) 62%,transparent);\n --fv-caption:var(--ui-font-caption,11px);--fv-meta:var(--ui-font-meta,12px);--fv-body:var(--ui-font-body,13px);\n --fv-heading:var(--ui-font-heading,14px);--fv-title:var(--ui-font-title,16px);\n --fv-control:var(--ui-control-height,28px);--fv-r-sm:var(--radius-sm,6px);--fv-r-md:var(--radius-md,12px);--fv-r-lg:var(--radius-lg,16px);\n --fv-mono:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);--fv-ui:var(--font-ui,system-ui,-apple-system,\"PingFang SC\",sans-serif);\n --fv-shadow:var(--card-shadow,0 8px 24px rgba(0,0,0,.12));--fv-fast:var(--duration-fast,.15s);\n --fv-scrim:linear-gradient(180deg,rgba(0,0,0,.6),rgba(0,0,0,0));\n color:var(--fv-text);font:var(--fv-body)/1.45 var(--fv-ui)}\n.fvs-studio *,.fvs-extension *,.fvs-layer *{box-sizing:border-box}\n.fvs-studio [hidden],.fvs-extension [hidden],.fvs-layer [hidden]{display:none!important}\n.fvs-studio :is(button,input,select,textarea),.fvs-extension :is(button,input,select,textarea),.fvs-layer :is(button,input,select,textarea){font:inherit;color:inherit}\n.fvs-studio button,.fvs-extension button,.fvs-layer button{cursor:pointer}\n.fvs-studio svg,.fvs-extension svg,.fvs-layer svg{flex-shrink:0;display:block;pointer-events:none}\n.fvs-studio :focus-visible,.fvs-extension :focus-visible,.fvs-layer :focus-visible{outline:var(--focus-ring,1px) solid var(--fv-accent);outline-offset:1px}\n.fvs-grow{flex:1}\n.fvs-studio{position:relative;height:100%;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;outline:none;background:transparent}\n\n/* buttons: the Genesis .btn vocabulary \u2014 outlined by default, one filled primary per surface */\n.fvs-btn{height:var(--fv-control);padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--fv-r-sm);background:transparent;color:var(--fv-text);display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;font-size:var(--fv-meta);line-height:1;transition:background var(--fv-fast),border-color var(--fv-fast),color var(--fv-fast)}\n.fvs-btn:hover:not(:disabled){border-color:var(--fv-accent);color:var(--fv-accent)}\n.fvs-btn:disabled{opacity:.45;cursor:default}\n.fvs-btn svg{width:15px;height:15px}\n.fvs-btn.primary{background:var(--fv-fill);border-color:transparent;color:var(--fv-on-fill);box-shadow:var(--btn-shadow,none)}\n.fvs-btn.primary:hover:not(:disabled){background:var(--action-fill-hover,var(--fv-fill));color:var(--fv-on-fill);border-color:transparent}\n.fvs-btn.ghost,.fvs-btn.icon{border-color:transparent;color:var(--fv-muted)}\n.fvs-btn.ghost:hover:not(:disabled),.fvs-btn.icon:hover:not(:disabled){background:var(--fv-hover);border-color:transparent;color:var(--fv-text)}\n.fvs-btn.icon{width:var(--fv-control);padding:0}\n.fvs-btn.icon[aria-pressed=true],.fvs-btn[aria-expanded=true]{background:var(--fv-accent-soft);color:var(--fv-accent);border-color:transparent}\n.fvs-btn.danger{color:var(--fv-bad);border-color:color-mix(in srgb,var(--fv-bad) 35%,transparent)}\n.fvs-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--fv-bad) 8%,transparent);border-color:var(--fv-bad);color:var(--fv-bad)}\n.fvs-link{display:inline-flex;align-items:center;gap:4px;border:0;background:none;padding:0;color:var(--fv-accent);font-size:var(--fv-meta);text-align:left}\n.fvs-link svg{width:13px;height:13px}\n\n/* top bar: project, save state, history, the Director, export */\n.fvs-bar{display:flex;align-items:center;gap:12px;min-width:0;min-height:46px;padding:6px 10px 2px 16px}\n.fvs-title-group{display:flex;align-items:center;gap:10px;min-width:0}\n.fvs-project{display:inline-flex;align-items:center;gap:4px;min-width:0;max-width:min(52ch,50vw);height:30px;padding:0 6px;margin-left:-6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-heading);font-weight:600}\nbutton.fvs-project:hover{background:var(--fv-hover)}\n.fvs-project-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-project svg{width:14px;height:14px;color:var(--fv-muted)}\n.fvs-status{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:var(--fv-caption);color:var(--fv-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-status::before{content:'';flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--fv-ok)}\n.fvs-status:is([data-state=unsaved],[data-state=saving],[data-state=loading])::before{background:var(--fv-warn)}\n.fvs-status[data-state=save-failed]{color:var(--fv-bad)}\n.fvs-status[data-state=save-failed]::before{background:var(--fv-bad)}\n.fvs-bar-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}\n.fvs-history{display:flex;gap:2px;margin-right:6px}\n.fvs-ai-action svg{color:var(--fv-accent)}\n.fvs-export-action svg:last-child{width:13px;height:13px;margin-left:-2px;opacity:.75}\n\n/* stage */\n.fvs-main{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 300px;min-height:0;min-width:0}\n.fvs-studio.medium .fvs-main{grid-template-columns:minmax(0,1fr) 272px}\n:is(.fvs-studio,.fvs-dock-timeline).medium :is(.fvs-timeline-duration,.fvs-snap-control > span){display:none}\n:is(.fvs-studio,.fvs-dock-timeline).medium .fvs-zoom-controls input{width:64px}\n.fvs-studio.inspector-hidden .fvs-main{grid-template-columns:minmax(0,1fr)}\n.fvs-studio.inspector-hidden .fvs-side{display:none}\n.fvs-preview{display:grid;grid-template-rows:minmax(0,1fr) auto;min-width:0;min-height:0}\n.fvs-viewport{display:grid;place-items:center;overflow:hidden;min-height:0;min-width:0;padding:10px 20px 8px}\n.fvs-view{position:relative;min-width:0;background:#000;border-radius:var(--fv-r-sm);box-shadow:var(--fv-shadow);overflow:hidden}\n.fvs-view iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#000}\n.fvs-view iframe.fvs-pending{visibility:hidden}\n.fvs-gate{position:absolute;inset:0;z-index:4;display:grid;place-items:center;padding:20px;overflow:auto;text-align:center;background:var(--fv-card);color:var(--fv-text)}\n.fvs-gate > div{max-width:400px;display:grid;gap:10px;justify-items:center}\n.fvs-gate svg{width:22px;height:22px;color:var(--fv-warn)}\n.fvs-gate h3{margin:0;font-size:var(--fv-heading);font-weight:600}\n.fvs-gate p{margin:0 0 4px;color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.6}\n.fvs-errs{position:absolute;left:8px;right:8px;bottom:8px;z-index:3;max-height:40%;overflow:auto;padding:8px 10px;border:1px solid color-mix(in srgb,var(--fv-bad) 40%,transparent);border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-bad) 7%,var(--fv-card));color:var(--fv-bad);font:var(--fv-meta)/1.5 var(--fv-mono);white-space:pre-wrap}\n.fvs-inline{position:absolute;z-index:5;min-width:160px;display:grid;gap:4px}\n.fvs-inline textarea{width:100%;resize:none;padding:6px 8px;border:1px solid var(--fv-accent);border-radius:var(--fv-r-sm);box-shadow:0 0 0 .5px var(--fv-accent),var(--fv-shadow);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-heading);line-height:1.4;outline:none}\n.fvs-inline small{justify-self:start;padding:2px 6px;border-radius:4px;background:var(--fv-card);color:var(--fv-muted);font-size:var(--fv-caption)}\n\n/* transport: where you are on the left, playback in the middle, view options on the right */\n.fvs-transport{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;min-width:0;min-height:44px;padding:0 12px 4px 20px}\n.fvs-transport-info{display:flex;align-items:baseline;gap:10px;min-width:0}\n.fvs-current-scene{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-time{font:var(--fv-meta)/1 var(--fv-mono);font-variant-numeric:tabular-nums;color:var(--fv-muted);white-space:nowrap}\n.fvs-playback-actions{display:flex;align-items:center;gap:2px}\n.fvs-play{width:36px;height:36px;margin:0 6px;padding:0;border:0;border-radius:50%;background:var(--fv-press);color:var(--fv-text)}\n.fvs-play:hover:not(:disabled){background:var(--fv-strong);color:var(--fv-text)}\n.fvs-play svg{width:17px;height:17px}\n.fvs-play[data-playing=false] svg{margin-left:2px}\n.fvs-preview-options{display:flex;align-items:center;justify-content:flex-end;gap:2px}\n\n/* inspector: tabs are the header; the native Extend View supplies its own title and close button */\n.fvs-side{display:grid;grid-template-rows:auto minmax(0,1fr);min-height:0;min-width:0;border-left:1px solid var(--fv-line)}\n.fvs-side-top{display:flex;align-items:center;gap:4px;padding:6px 8px 4px 10px}\n.fvs-tabs{display:flex;gap:2px;flex:1;min-width:0;overflow:hidden}\n.fvs-tabs button{height:28px;padding:0 10px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}\n.fvs-tabs button:hover{background:var(--fv-hover);color:var(--fv-text)}\n.fvs-tabs button[aria-selected=true]{background:var(--fv-press);color:var(--fv-text)}\n.fvs-panel{overflow:auto;padding:10px 14px 24px;display:grid;gap:20px;align-content:start;min-width:0}\n.fvs-section{display:grid;gap:10px;min-width:0}\n.fvs-section > h4,.fvs-panel > h4{margin:0;font-size:var(--fv-meta);font-weight:600;color:var(--fv-muted)}\n.fvs-hint{margin:0;color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.55}\n.fvs-field{display:grid;gap:5px;min-width:0}\n.fvs-field > span{font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-row{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;min-width:0}\n.fvs-row > .fvs-field{flex:1;min-width:76px}\n.fvs-input{width:100%;height:var(--fv-control);min-width:0;padding:0 8px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-meta);outline:none;transition:border-color var(--fv-fast)}\n.fvs-input:focus{border-color:var(--fv-accent)}\n.fvs-input:disabled{opacity:.5}\ntextarea.fvs-input{height:auto;min-height:32px;padding:6px 8px;resize:vertical;line-height:1.5}\nselect.fvs-input{padding:0 4px}\n.fvs-check{display:inline-flex;align-items:center;gap:6px;font-size:var(--fv-meta);color:var(--fv-text);white-space:nowrap;cursor:pointer}\n.fvs-check input{margin:0;accent-color:var(--fv-accent)}\n.fvs-empty{display:grid;justify-items:center;gap:8px;padding:28px 12px;text-align:center;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-empty svg{width:20px;height:20px}\n.fvs-empty p{margin:0}\n.fvs-scene-head{display:grid;gap:4px}\n.fvs-scene-head > div{display:flex;justify-content:space-between;gap:8px;font:var(--fv-caption)/1.4 var(--fv-mono);color:var(--fv-muted)}\n.fvs-studio .fvs-title-input,.fvs-extension .fvs-title-input{height:34px;margin-left:-7px;width:calc(100% + 7px);padding:0 6px;border-color:transparent;background:transparent;font-size:var(--fv-heading);font-weight:600}\n.fvs-title-input:hover{border-color:var(--fv-line)}\n.fvs-title-input:focus{border-color:var(--fv-accent);background:var(--fv-card)}\n.fvs-unit-row{display:grid;grid-template-columns:minmax(0,1fr) 84px;gap:6px;align-items:center}\n.fvs-unit{font-size:var(--fv-meta);color:var(--fv-muted);padding-left:2px}\n.fvs-scene-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}\n.fvs-scene-actions .fvs-btn{justify-content:flex-start}\n.fvs-advanced summary{display:flex;align-items:center;gap:7px;list-style:none;cursor:pointer;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-advanced summary::-webkit-details-marker{display:none}\n.fvs-advanced summary svg{width:14px;height:14px}\n.fvs-advanced summary::after{content:'';margin-left:auto;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;rotate:-45deg;transition:rotate var(--fv-fast)}\n.fvs-advanced[open] summary::after{rotate:45deg}\n.fvs-advanced .fvs-section{margin-top:12px}\n.fvs-timed{display:grid;grid-template-columns:minmax(0,1fr) 52px 52px 70px;gap:4px;align-items:center;font-size:var(--fv-caption)}\n.fvs-timed.head small{color:var(--fv-muted)}\n.fvs-timed .fvs-input{height:26px;padding:0 5px;font-size:var(--fv-caption)}\n.fvs-timed .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-media-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center}\n.fvs-media-row > input[type=file]{display:none}\n.fvs-media-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:var(--fv-r-sm);background:var(--fv-hover);color:var(--fv-muted)}\n.fvs-media-thumb{width:40px;height:40px;object-fit:cover;border-radius:var(--fv-r-sm);background:var(--fv-hover)}\n.fvs-media-main{display:grid;gap:6px;min-width:0}\n.fvs-media-main .fvs-row{align-items:center}\n.fvs-media-name{font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}\n.fvs-track-card{display:grid;gap:8px;padding:10px;border-radius:var(--fv-r-md);background:var(--fv-hover)}\n.fvs-track-head{display:flex;align-items:center;gap:8px;min-width:0}\n.fvs-track-head svg{width:14px;height:14px;color:var(--fv-muted)}\n.fvs-track-head .fvs-media-name{flex:1}\n.fvs-color-row{display:grid;grid-template-columns:var(--fv-control) minmax(0,1fr);gap:6px}\n.fvs-color-row input[type=color]{width:var(--fv-control);height:var(--fv-control);padding:2px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card)}\n.fvs-segmented{display:flex;gap:2px;padding:2px;border-radius:var(--fv-r-sm);background:var(--fv-hover);min-width:0}\n.fvs-segmented button{flex:1;min-width:0;height:24px;padding:0 8px;border:0;border-radius:calc(var(--fv-r-sm) - 2px);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-segmented button[aria-checked=true]{background:var(--fv-card);color:var(--fv-text);box-shadow:var(--btn-shadow,0 0 0 1px var(--fv-line))}\n.fvs-segmented button:disabled{opacity:.45}\n.fvs-code-block{border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);overflow:hidden}\n.fvs-code{display:block;width:100%;min-height:150px;padding:10px;border:0;background:var(--fv-hover);color:var(--fv-text);font:var(--fv-meta)/1.6 var(--fv-mono);resize:vertical;white-space:pre;tab-size:2;outline:none}\n.fvs-code-footer{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 4px 10px;color:var(--fv-muted);font-size:var(--fv-caption)}\n.fvs-code-footer .fvs-btn{height:24px}\n.fvs-text-head{display:flex;align-items:center;gap:10px}\n.fvs-text-head .fvs-hint{flex:1}\n.fvs-list{display:grid;gap:8px}\n.fvs-text-item{display:grid;gap:6px}\n.fvs-text-item.on textarea{border-color:var(--fv-accent)}\n.fvs-cap-actions{display:flex;flex-wrap:wrap;gap:6px}\n.fvs-cap-actions > input[type=file]{display:none}\n.fvs-cap-list{display:grid;gap:12px}\n.fvs-cap-item{display:grid;gap:6px}\n.fvs-cap-times{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto auto;gap:6px;align-items:center}\n.fvs-cap-item.on textarea{border-color:var(--fv-accent)}\n.fvs-meta{display:flex;justify-content:flex-end}\n.fvs-suggest{display:grid;gap:8px;padding:8px 10px;border-radius:var(--fv-r-sm);background:var(--fv-accent-soft);font-size:var(--fv-meta)}\n.fvs-problems{display:grid;gap:4px;font:var(--fv-meta)/1.5 var(--fv-mono);overflow-wrap:anywhere}\n.fvs-problems .e{color:var(--fv-bad)} .fvs-problems .w{color:var(--fv-warn)}\n.fvs-banner{position:absolute;left:50%;top:52px;translate:-50% 0;z-index:20;display:flex;gap:10px;align-items:center;max-width:min(640px,94%);padding:10px 12px;border:1px solid color-mix(in srgb,var(--fv-warn) 45%,transparent);border-radius:var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow);font-size:var(--fv-meta)}\n\n/* timeline: a tinted band under the stage \u2014 no hairlines, the lanes carry the structure */\n.fvs-tl{display:grid;grid-template-rows:10px auto var(--fv-timeline-height,200px);min-width:0;user-select:none;-webkit-user-select:none;background:var(--fv-hover)}\n.fvs-tl-resize{cursor:row-resize;display:grid;place-items:center;touch-action:none}\n.fvs-tl-resize::after{content:'';width:32px;height:3px;border-radius:2px;background:var(--fv-strong);opacity:0;transition:opacity var(--fv-fast)}\n.fvs-tl:hover .fvs-tl-resize::after,.fvs-tl-resize:focus-visible::after{opacity:1}\n.fvs-tl-bar{display:flex;align-items:center;gap:8px;min-width:0;padding:0 10px 6px;font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-tl-tools{display:flex;align-items:center;gap:2px}\n.fvs-tl-sep{width:1px;height:16px;margin:0 6px;background:var(--fv-strong)}\n.fvs-tl-tools .fvs-tl-add,.fvs-tl-tools .fvs-tl-import{border-color:transparent;color:var(--fv-text)}\n.fvs-tl-tools .fvs-tl-add:hover:not(:disabled),.fvs-tl-tools .fvs-tl-import:hover:not(:disabled){background:var(--fv-press);border-color:transparent;color:var(--fv-text)}\n.fvs-sync-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap}\n.fvs-sync-chip:hover{color:var(--fv-text);border-color:var(--fv-accent)}\n.fvs-sync-chip i{width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}\n.fvs-sync-chip[data-state=ok] i{background:var(--fv-ok)}\n.fvs-sync-chip[data-state=warn] i{background:var(--fv-warn)}\n.fvs-timeline-duration{font:var(--fv-caption)/1 var(--fv-mono);white-space:nowrap}\n.fvs-snap-control{display:flex;align-items:center;gap:6px;white-space:nowrap}\n:is(.fvs-studio,.fvs-dock-timeline) .fvs-snap-control select{height:24px;padding:0 4px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-caption)}\n.fvs-zoom-controls{display:flex;align-items:center;gap:2px}\n.fvs-zoom-controls input{width:84px;margin:0 4px;accent-color:var(--fv-accent)}\n.fvs-zoom-controls .fvs-btn.ghost{height:24px;padding:0 8px}\n.fvs-tl-body{display:grid;grid-template-columns:76px minmax(0,1fr);min-height:0;overflow:hidden auto}\n.fvs-track-rail{display:grid;grid-template-rows:24px 32px 64px;grid-auto-rows:44px;align-content:start;font-size:var(--fv-caption);color:var(--fv-muted)}\n.fvs-rail-ruler{padding:6px 12px 0}\n.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane{display:flex;align-items:center;gap:6px;min-width:0;padding:0 10px 0 12px}\n.fvs-rail-captions svg,.fvs-rail-video svg,.fvs-rail-lane svg{width:14px;height:14px}\n.fvs-rail-captions span,.fvs-rail-video span,.fvs-rail-lane span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-rail-audio{display:contents}\n.fvs-tl-scroll{position:relative;overflow:auto hidden;min-height:0}\n.fvs-tl-inner{position:relative}\n.fvs-tl-ruler{position:absolute;left:0;top:0;cursor:ew-resize}\n.fvs-tl-scenes{position:absolute;left:0;right:0;top:56px;height:64px}\n/* the captions track sits above the picture track: what is drawn on the picture is drawn above it */\n.fvs-cap-lane{position:absolute;left:0;right:0;top:24px;height:32px}\n.fvs-cap-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:9px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}\n.fvs-cap{position:absolute;top:4px;height:24px;display:flex;align-items:center;min-width:0;padding:0 7px;overflow:hidden;border:1px solid transparent;border-radius:var(--fv-r-sm);background:var(--fv-card);box-shadow:inset 0 0 0 1px var(--fv-line);color:var(--fv-text);font-size:var(--fv-caption);cursor:grab;touch-action:none}\n.fvs-cap span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}\n.fvs-cap:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}\n.fvs-cap.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}\n.fvs-cap-edge{position:absolute;top:0;bottom:0;width:6px;cursor:col-resize}\n.fvs-cap-edge.start{left:0}\n.fvs-cap-edge.end{right:0}\n.fvs-cap-edge:hover{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}\n.fvs-tl-lanes{position:absolute;left:0;right:0;top:0}\n.fvs-clip{position:absolute;top:6px;height:52px;border:1px solid transparent;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 14%,var(--fv-card));overflow:hidden;cursor:pointer;touch-action:none}\n.fvs-clip.alt{background:color-mix(in srgb,var(--fv-accent) 8%,var(--fv-card))}\n.fvs-clip:hover{border-color:var(--fv-strong)}\n.fvs-clip.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}\n.fvs-clip.err{border-color:var(--fv-bad)}\n.fvs-clip-thumb{position:absolute;inset:0;container-type:size;pointer-events:none}\n.fvs-scene-thumb{position:absolute;inset:0;display:block;overflow:hidden}\n.fvs-scene-thumb iframe{position:absolute;left:50%;top:50%;width:max(100cqw,calc(100cqh * var(--fv-ratio,1.7778)));height:max(100cqh,calc(100cqw / var(--fv-ratio,1.7778)));translate:-50% -50%;border:0;background:#000;pointer-events:none}\n.fvs-clip-trans{position:absolute;left:0;top:0;bottom:0;z-index:1;background:linear-gradient(90deg,color-mix(in srgb,var(--fv-accent) 60%,transparent),transparent);pointer-events:none}\n.fvs-clip-label{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:baseline;gap:6px;min-width:0;padding:5px 8px 12px;pointer-events:none}\n.fvs-clip-label b{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-clip-label small{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}\n.fvs-clip:has([data-rendered]) .fvs-clip-label{background:var(--fv-scrim)}\n.fvs-clip:has([data-rendered]) .fvs-clip-label :is(b,small){color:#fff}\n.fvs-clip.tight .fvs-clip-label{padding-inline:4px}\n.fvs-clip.tight .fvs-clip-label small{display:none}\n.fvs-clip-lane{position:absolute;left:0;right:0;bottom:1px;height:16px;z-index:3}\n.fvs-hitm{position:absolute;top:2px;width:12px;height:12px;margin-left:-6px;cursor:grab;touch-action:none}\n.fvs-hitm::before{content:'';position:absolute;left:3px;top:3px;width:6px;height:6px;rotate:45deg;border-radius:1px;background:var(--fv-card);box-shadow:0 0 0 1px var(--fv-muted)}\n.fvs-hitm.ok::before{background:var(--fv-ok);box-shadow:0 0 0 1px var(--fv-card)}\n.fvs-hitm.weak::before{background:var(--fv-warn);box-shadow:0 0 0 1px var(--fv-card)}\n.fvs-hitm.quiet::before{background:var(--fv-card);box-shadow:0 0 0 1.5px var(--fv-ok)}\n.fvs-hitm.on::before{box-shadow:0 0 0 2px var(--fv-accent)}\n.fvs-edge{position:absolute;top:0;bottom:0;z-index:4;width:7px;cursor:col-resize}\n.fvs-edge.start{left:0}\n.fvs-edge.end{right:0}\n.fvs-edge:hover,.fvs-edge.drag{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}\n.fvs-clip.tight .fvs-edge{width:4px}\n.fvs-tl-head{position:absolute;top:0;bottom:0;z-index:7;width:1.5px;margin-left:-.75px;background:var(--fv-accent);pointer-events:none}\n.fvs-tl-head::before{content:'';position:absolute;left:-4.25px;top:0;width:10px;height:10px;border-radius:2px 2px 50% 50%;background:var(--fv-accent)}\n.fvs-tl-ghost{position:absolute;top:62px;height:52px;z-index:6;border:1.5px dashed var(--fv-accent);border-radius:var(--fv-r-sm);pointer-events:none}\n.fvs-tl-ghost.move{border-style:solid;background:color-mix(in srgb,var(--fv-accent) 16%,transparent)}\n.fvs-tl-insert{position:absolute;top:58px;height:60px;z-index:7;width:2px;margin-left:-1px;border-radius:1px;background:var(--fv-accent);pointer-events:none}\n.fvs-tl.reordering .fvs-clip{cursor:grabbing}\n.fvs-tl-empty{position:absolute;left:12px;top:22px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-lane{position:absolute;left:0;right:0;height:44px}\n.fvs-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:14px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}\n.fvs-lane-region{position:absolute;top:5px;height:34px;overflow:hidden;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 9%,var(--fv-card));cursor:grab;touch-action:none}\n.fvs-lane-region:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}\n.fvs-lane-region.muted{opacity:.45}\n.fvs-lane-wave{position:absolute;left:0;top:0}\n.fvs-lane-name{position:absolute;left:8px;top:3px;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;pointer-events:none}\n\n/* panels without Extend View: a sheet over the editor */\n.fvs-sheet{position:absolute;top:46px;right:8px;bottom:8px;z-index:20;width:min(380px,calc(100% - 16px));display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden;border:1px solid var(--fv-line);border-radius:var(--fv-r-lg);background:var(--fv-card);box-shadow:var(--fv-shadow)}\n.fvs-sheet-head{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 2px 16px;font-size:var(--fv-heading)}\n.fvs-sheet-head strong{font-weight:600}\n.fvs-sheet-body{min-height:0;overflow:hidden}\n\n/* focus, narrow and compact (Mini) layouts follow the container, not the window */\n.fvs-studio.focus-preview .fvs-tl,.fvs-studio.focus-preview .fvs-side{display:none}\n.fvs-studio.narrow .fvs-main{grid-template-columns:minmax(0,1fr)}\n.fvs-studio.narrow .fvs-side{position:absolute;top:0;right:0;bottom:48px;z-index:15;width:min(320px,94%);border:1px solid var(--fv-line);border-radius:var(--fv-r-md) 0 0 var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow)}\n.fvs-studio.narrow .fvs-bar{padding-left:12px;gap:8px}\n.fvs-studio.narrow :is(.fvs-status,.fvs-history,.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-current-scene,.fvs-sync-sum){display:none}\n.fvs-dock-timeline.narrow :is(.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-sync-sum){display:none}\n:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-sync-chip{width:24px;padding:0;justify-content:center}\n.fvs-studio.narrow :is(.fvs-ai-action,.fvs-export-action) span,:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-tl-add,.fvs-tl-import) span{display:none}\n.fvs-studio.narrow .fvs-transport{padding:0 8px 4px 12px}\n:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-tl-body{grid-template-columns:44px minmax(0,1fr)}\n:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane) span,:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-rail-ruler{font-size:0}\n.fvs-studio.narrow .fvs-viewport{padding:6px 10px}\n.fvs-studio.compact{grid-template-rows:auto minmax(0,1fr)}\n.fvs-studio.compact :is(.fvs-tl,.fvs-side,.fvs-history,.fvs-status,.fvs-ai-action,.fvs-export-action,.fvs-time){display:none}\n.fvs-studio.compact .fvs-preview-options > :not(:first-child){display:none}\n.fvs-studio.compact .fvs-viewport{padding:6px 8px}\n.fvs-studio.compact .fvs-bar{min-height:40px;padding:4px 6px 0 12px}\n.fvs-studio.tiny .fvs-frame-step{display:none}\n@media (prefers-reduced-motion:reduce){.fvs-studio *,.fvs-layer *{transition:none!important;animation:none!important}}\n\n/* floating layers on document.body: menus and popovers (DESIGN \xA73 \u300C\u83DC\u5355\u51E0\u4F55\u300D) */\n.fvs-layer{position:fixed;z-index:100;background:var(--fv-card);color:var(--fv-text);border:1px solid var(--fv-line);border-radius:var(--fv-r-md);box-shadow:var(--fv-shadow);animation:ui-menu-enter var(--menu-enter-duration,0s) var(--menu-enter-ease,ease-out)}\n.fvs-menu{display:grid;min-width:var(--menu-action-min,200px);max-width:var(--menu-action-max,320px);padding:var(--menu-shell-padding,4px)}\n.fvs-menu > button{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:var(--menu-item-min-height,32px);padding:4px 8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left;font-size:var(--menu-text-size,var(--fv-heading));line-height:var(--menu-line-height,20px)}\n.fvs-menu > button:hover,.fvs-menu > button:focus-visible{background:var(--menu-hover,var(--fv-press));outline:none}\n.fvs-menu > button:disabled{opacity:.45}\n.fvs-menu > button.danger{color:var(--fv-bad)}\n.fvs-menu-icon{display:grid;place-items:center;color:var(--fv-muted)}\n.fvs-menu-icon svg{width:16px;height:16px}\n.fvs-menu-text{display:grid;gap:1px;min-width:0}\n.fvs-menu-text small{color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.4}\n.fvs-menu-end{display:flex;align-items:center;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-menu-sep{height:1px;margin:4px 8px;background:var(--fv-line)}\n.fvs-menu-heading{padding:6px 8px 2px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-popover{width:max-content;max-width:min(440px,calc(100vw - 16px));max-height:min(600px,calc(100vh - 32px));overflow:auto;padding:12px;outline:none}\n.fvs-pop-head{display:grid;gap:2px;margin-bottom:10px}\n.fvs-pop-head strong{font-size:var(--fv-heading);font-weight:600}\n.fvs-pop-head small{color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-layer kbd,.fvs-studio kbd{display:inline-block;min-width:20px;padding:1px 6px;border:1px solid var(--fv-line);border-radius:4px;background:var(--fv-hover);font:var(--fv-caption)/1.5 var(--fv-mono);text-align:center;white-space:nowrap}\n.fvs-templates-pop{width:min(580px,calc(100vw - 16px));max-width:none}\n.fvs-template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px}\n.fvs-template{display:grid;gap:3px;align-content:start;padding:6px;border:1px solid transparent;border-radius:var(--fv-r-md);background:none;color:var(--fv-text);text-align:left}\n.fvs-template:hover,.fvs-template:focus-visible{background:var(--fv-hover);border-color:var(--fv-line);outline:none}\n.fvs-template-shot{position:relative;display:block;aspect-ratio:var(--fv-ratio,1.7778);max-height:180px;margin:0 auto 4px;width:100%;overflow:hidden;border-radius:var(--fv-r-sm);background:#000}\n.fvs-template-shot iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}\n.fvs-template b{font-size:var(--fv-meta);font-weight:500}\n.fvs-template small{color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.35}\n.fvs-sync-pop{display:grid;gap:10px;width:300px}\n.fvs-sync-pop .fvs-pop-head{margin:0}\n.fvs-legend{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-legend span{display:inline-flex;align-items:center;gap:7px}\n.fvs-legend i{width:7px;height:7px;rotate:45deg;border-radius:1px}\n.fvs-legend .ok i{background:var(--fv-ok)}\n.fvs-legend .weak i{background:var(--fv-warn)}\n.fvs-legend .quiet i{box-shadow:0 0 0 1.5px var(--fv-ok)}\n.fvs-sync-list{display:grid;max-height:220px;overflow:auto;margin:0 -4px}\n.fvs-sync-list button{display:flex;gap:12px;padding:5px 6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-meta);text-align:left}\n.fvs-sync-list button:hover{background:var(--fv-hover)}\n.fvs-sync-list span:first-child{color:var(--fv-muted);font-family:var(--fv-mono)}\n.fvs-sync-pop > .fvs-btn{justify-self:start}\n.fvs-keys dl{display:grid;grid-template-columns:auto auto;gap:7px 24px;margin:0;font-size:var(--fv-meta)}\n.fvs-keys dt{color:var(--fv-muted)}\n.fvs-keys dd{margin:0;text-align:right}\n\n/* native panels: properties, projects, Director, export */\n.fvs-extension{display:block;height:100%;overflow:auto}\n.fvs-native-properties{overflow:hidden}\n.fvs-native-properties .fvs-side{height:100%;border-left:0}\n.fvs-native-properties .fvs-side-close{display:none}\n/* the timeline docked in the native bottom panel (Space): it fills the panel; the panel's own sash sizes it */\n.fvs-dock-timeline{display:flex;flex-direction:column;overflow:hidden;outline:none}\n.fvs-dock-timeline > .fvs-tl{flex:1;min-height:0;grid-template-rows:auto minmax(0,1fr);background:transparent}\n.fvs-dock-timeline .fvs-tl-resize{display:none}\n.fvs-dock-timeline .fvs-tl-bar{padding-top:6px}\n.fvs-dock-empty{margin:auto;padding:16px;text-align:center}\n.fvs-dock-strip{display:flex;align-items:center;gap:8px;min-width:0;padding:4px 10px 4px 12px;background:var(--fv-hover);font-size:var(--fv-meta);color:var(--fv-muted)}\n.fvs-dock-strip svg{width:14px;height:14px}\n.fvs-dock-strip span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-dock-strip .fvs-btn{height:24px;padding:0 8px}\n.fvs-workspace-host{height:100%;min-height:0;overflow:hidden}\n.fvs-library{display:grid;gap:14px;align-content:start;max-width:620px;margin:0 auto;padding:28px 20px}\n.fvs-library-heading{display:flex;align-items:center;gap:10px}\n.fvs-library-heading svg{width:20px;height:20px;color:var(--fv-muted)}\n.fvs-library h2{margin:0;font-size:var(--fv-title);font-weight:600}\n.fvs-library > .fvs-row{align-items:center}\n.fvs-project-list{display:grid;gap:2px;margin:0 -8px}\n.fvs-project-item{display:flex;align-items:center;gap:10px;min-width:0;padding:8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left}\n.fvs-project-item:hover,.fvs-project-item:focus-visible{background:var(--fv-hover)}\n.fvs-project-item svg{color:var(--fv-muted)}\n.fvs-project-item > span{display:grid;gap:2px;min-width:0}\n.fvs-project-item strong{font-size:var(--fv-body);font-weight:500}\n.fvs-project-item small{color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-panel-shell{display:grid;grid-template-rows:minmax(0,1fr) auto;height:100%;min-height:0}\n.fvs-panel-scroll{display:grid;gap:16px;align-content:start;min-height:0;overflow:auto;padding:12px 16px 16px}\n.fvs-form-actions{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px 14px;border-top:1px solid var(--fv-line)}\n.fvs-chip-row{display:flex;flex-wrap:wrap;gap:6px}\n.fvs-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-line);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}\n.fvs-chip svg{width:13px;height:13px}\nbutton.fvs-chip{color:var(--fv-text)}\nbutton.fvs-chip:hover{border-color:var(--fv-accent);color:var(--fv-accent)}\n.fvs-phase{display:flex;align-items:center;gap:8px;color:var(--fv-muted);font-size:var(--fv-meta)}\n.fvs-phase::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}\n.fvs-phase:is([data-phase=thinking],[data-phase=speaking],[data-phase=tool],[data-phase=waiting])::before{background:var(--fv-accent)}\n.fvs-phase[data-phase=done]::before{background:var(--fv-ok)}\n.fvs-phase[data-phase=error]::before{background:var(--fv-bad)}\n.fvs-director-changes{display:grid;gap:4px}\n.fvs-director-changes details{border-radius:var(--fv-r-sm);padding:6px 8px;background:var(--fv-hover)}\n.fvs-director-changes summary{cursor:pointer;font-size:var(--fv-meta)}\n.fvs-change-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-top:8px}\n.fvs-change-columns pre{max-height:240px;margin:0;overflow:auto;padding:8px;border-radius:var(--fv-r-sm);background:var(--fv-card);font:var(--fv-caption)/1.5 var(--fv-mono);white-space:pre-wrap;word-break:break-word}\n.fvs-director-input{display:block}\n.fvs-send-row{justify-content:space-between;align-items:center;margin-top:8px}\n.fvs-native-chatbox{min-width:0}\n.fvs-native-chatbox textarea{width:100%;min-height:96px}\n.fvs-export-status{display:grid;gap:8px;padding:12px;border-radius:var(--fv-r-md);background:var(--fv-hover)}\n.fvs-export-status strong{font-size:var(--fv-meta);font-weight:600}\n.fvs-export-status progress{width:100%;height:6px;accent-color:var(--fv-accent)}\n.fvs-export-status small{color:var(--fv-muted);font:var(--fv-caption) var(--fv-mono)}\n.fvs-export-status .fvs-row{align-items:center}\n.fvs-summary{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:var(--fv-r-md);background:var(--fv-hover);font:var(--fv-meta)/1.4 var(--fv-mono);color:var(--fv-text)}\n.fvs-summary span:last-child{color:var(--fv-muted)}\n\n";
  var EMBED_CSS = "\n.fvs-embed{position:relative;overflow:hidden;border-radius:var(--radius-md,12px);background:#000;box-shadow:var(--card-shadow,none)}\n.fvs-embed iframe{display:block;width:100%;border:0;background:#000}\n.fvs-embed .bar{display:flex;gap:8px;align-items:center;padding:6px 10px;background:var(--bg-card,#fff);color:var(--text-muted,#666);font-size:var(--ui-font-meta,12px)}\n.fvs-embed .bar b{flex:1;color:var(--text,#222);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.fvs-embed button{padding:2px 8px;border:1px solid var(--overlay-strong,rgba(0,0,0,.14));border-radius:var(--radius-sm,6px);background:none;color:inherit;font:inherit;cursor:pointer}\n";

  // src/generated/cli-src.js
  var cli_src_default = '#!/usr/bin/env node\n/* Forsion Video Studio 0.7.0 \u2014 built from src/ by build.mjs; edit the sources, not this file. */\n\n// src/cli/fvs.js\nimport { readFileSync as readFileSync2, writeFileSync as writeFileSync2, mkdirSync as mkdirSync2, existsSync as existsSync2, rmSync as rmSync2, mkdtempSync as mkdtempSync2, readdirSync, statSync as statSync2 } from "node:fs";\nimport { dirname as dirname2, join as join2, resolve as resolve2, relative, basename, extname, sep, posix } from "node:path";\nimport { pathToFileURL } from "node:url";\nimport { tmpdir as tmpdir2, homedir, platform } from "node:os";\nimport { spawnSync as spawnSync2, spawn as spawn2 } from "node:child_process";\nimport { createRequire } from "node:module";\n\n// src/lib/project.js\nvar FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})(.*)$/;\nvar HEADING = /^ {0,3}(#{1,6})[ \\t]+(.*?)[ \\t]*#*[ \\t]*$/;\nvar SCENE_HEAD = /^([A-Za-z][\\w-]*)(?:\\s*(?:\xB7|\u2014|\u2013|-|:|\uFF1A|\\|)\\s*(.*))?$/;\nvar DEFAULTS = { width: 1920, height: 1080, fps: 30 };\nvar TRANSITIONS = ["fade", "dip", "slide-left", "slide-up", "push-left", "wipe-left", "zoom", "blur"];\nfunction tokenize(src) {\n  const eol = /\\r\\n/.test(src) ? "\\r\\n" : "\\n";\n  const text = src.replace(/\\r\\n/g, "\\n");\n  const lines = text.split("\\n");\n  const endsWithNl = text.endsWith("\\n");\n  if (endsWithNl) lines.pop();\n  const toks = [];\n  let buf = [], bufLine = 1;\n  const flush = () => {\n    if (buf.length) {\n      toks.push({ kind: "text", raw: buf.join(""), line: bufLine });\n      buf = [];\n    }\n  };\n  for (let i = 0; i < lines.length; i++) {\n    const nl = i < lines.length - 1 || endsWithNl ? "\\n" : "";\n    const line = lines[i];\n    const f = line.match(FENCE_OPEN);\n    if (f && !(f[2][0] === "`" && f[3].includes("`"))) {\n      flush();\n      const fence = f[2], info = f[3].trim();\n      const close = new RegExp(`^ {0,3}${fence[0] === "`" ? "`" : "~"}{${fence.length},}[ \\\\t]*$`);\n      const body = [];\n      let j = i + 1, closed = false;\n      for (; j < lines.length; j++) {\n        if (close.test(lines[j])) {\n          closed = true;\n          break;\n        }\n        body.push(lines[j]);\n      }\n      const last = closed ? j : lines.length - 1;\n      const rawLines = lines.slice(i, last + 1);\n      const rawNl = last < lines.length - 1 || endsWithNl ? "\\n" : "";\n      const [lang = "", ...tags] = info.split(/\\s+/).filter(Boolean);\n      toks.push({ kind: "fence", raw: rawLines.join("\\n") + rawNl, line: i + 1, fence, info, lang: lang.toLowerCase(), tags: tags.map((t) => t.toLowerCase()), body: body.join("\\n"), closed, indent: f[1] });\n      i = last;\n      continue;\n    }\n    const h = line.match(HEADING);\n    if (h) {\n      flush();\n      toks.push({ kind: "heading", raw: line + nl, line: i + 1, level: h[1].length, text: h[2] });\n      continue;\n    }\n    if (!buf.length) bufLine = i + 1;\n    buf.push(line + nl);\n  }\n  flush();\n  return { toks, eol };\n}\nvar UNIT = /^\\s*(-?\\d+(?:\\.\\d+)?)\\s*(bars?|beats?|b|s|sec|secs|seconds?|ms|\u5C0F\u8282|\u62CD|\u79D2)?\\s*$/i;\nfunction tempoOf(meta) {\n  const t = meta && meta.tempo;\n  if (!t || !(+t.bpm > 0)) return null;\n  const beatsPerBar = +t.beatsPerBar > 0 ? +t.beatsPerBar : 4;\n  const beat = 60 / +t.bpm;\n  return { bpm: +t.bpm, beatsPerBar, beat, bar: beat * beatsPerBar };\n}\nfunction parseLength(v, tempo) {\n  if (typeof v === "number" && isFinite(v)) return v;\n  const m = typeof v === "string" && v.match(UNIT);\n  if (!m) throw new Error(`cannot read length ${JSON.stringify(v)} (use "4 bars", "6 beats" or "2.5s")`);\n  const x = +m[1], u = (m[2] || "s").toLowerCase();\n  if (/^(bars?|\u5C0F\u8282)$/.test(u)) {\n    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);\n    return x * tempo.bar;\n  }\n  if (/^(beats?|b|\u62CD)$/.test(u)) {\n    if (!tempo) throw new Error(`"${v}" needs a tempo in the project settings`);\n    return x * tempo.beat;\n  }\n  if (u === "ms") return x / 1e3;\n  return x;\n}\nvar round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;\nvar hitUnit = (tempo) => tempo ? tempo.beat : 1;\nfunction readJSON(tok, where, errors) {\n  if (!tok.body.trim()) return {};\n  try {\n    const v = JSON.parse(tok.body);\n    if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("settings must be a JSON object");\n    return v;\n  } catch (e) {\n    errors.push({ level: "error", line: tok.line, scene: where, message: `invalid JSON in settings: ${e.message}` });\n    return null;\n  }\n}\nvar isFvs = (t) => t.kind === "fence" && (t.lang === "fvs" || t.lang === "json" && t.tags.includes("fvs"));\nvar isLang = (t, ...langs) => t.kind === "fence" && langs.includes(t.lang) && !isFvs(t);\nvar LANG = { html: ["html", "htm"], js: ["js", "javascript", "mjs"], css: ["css"], captions: ["srt", "vtt"] };\nvar CUE_TIME = /^(?:(\\d+):)?(\\d{1,2}):(\\d{1,2})(?:[.,](\\d{1,3}))?$/;\nvar cueTime = (s) => {\n  const m = String(s).trim().match(CUE_TIME);\n  return m ? +(m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + (m[4] ? +m[4].padEnd(3, "0") / 1e3 : 0) : NaN;\n};\nfunction parseSrt(text) {\n  const lines = String(text ?? "").replace(/\\r\\n?/g, "\\n").split("\\n");\n  const cues = [], errors = [];\n  for (let i = 0; i < lines.length; ) {\n    if (!lines[i].trim()) {\n      i++;\n      continue;\n    }\n    const from = i;\n    while (i < lines.length && lines[i].trim()) i++;\n    const block = lines.slice(from, i);\n    if (/^(WEBVTT|NOTE|STYLE|REGION)\\b/.test(block[0])) continue;\n    const k = block.findIndex((l) => l.includes("-->"));\n    if (k < 0) {\n      errors.push({ line: from + 1, message: \'caption without a time line ("00:00:01,000 --> 00:00:03,000")\' });\n      continue;\n    }\n    const [a, rest] = block[k].split("-->"), start = cueTime(a), end = cueTime(rest.trim().split(/\\s+/)[0]);\n    if (!Number.isFinite(start) || !Number.isFinite(end)) {\n      errors.push({ line: from + k + 1, message: `cannot read caption times "${block[k].trim()}" (use 00:00:01,000 --> 00:00:03,000)` });\n      continue;\n    }\n    if (!(end > start)) {\n      errors.push({ line: from + k + 1, message: `caption ends before it starts (${block[k].trim()})` });\n      continue;\n    }\n    cues.push({ start, end, text: block.slice(k + 1).join("\\n").trim(), line: from + k + 1 });\n  }\n  return { cues, errors };\n}\nvar srtTime = (sec) => {\n  const ms = Math.max(0, Math.round(sec * 1e3)), p = (n, w = 2) => String(n).padStart(w, "0");\n  return `${p(Math.floor(ms / 36e5))}:${p(Math.floor(ms / 6e4) % 60)}:${p(Math.floor(ms / 1e3) % 60)},${p(ms % 1e3, 3)}`;\n};\nfunction formatSrt(cues) {\n  return [...cues].sort((a, b) => a.start - b.start).map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${String(c.text ?? "").replace(/\\r\\n?/g, "\\n").replace(/\\n\\s*\\n/g, "\\n").trim()}`).join("\\n\\n");\n}\nfunction parseProject(src) {\n  const { toks, eol } = tokenize(String(src ?? ""));\n  const errors = [];\n  const p = { eol, toks, meta: { ...DEFAULTS }, metaTok: -1, rawMeta: null, css: [], stageHtml: -1, stageJs: -1, captionsTok: -1, captionsIgnored: 0, captions: [], scenes: [], errors };\n  let i = 0;\n  for (; i < toks.length; i++) {\n    const t = toks[i];\n    if (t.kind === "heading" && t.level === 2) break;\n    if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, message: "code block is never closed" });\n    if (isFvs(t)) {\n      if (p.metaTok >= 0) {\n        errors.push({ level: "warning", line: t.line, message: "second project settings block ignored" });\n        continue;\n      }\n      p.metaTok = i;\n      const m = readJSON(t, null, errors);\n      if (m) {\n        p.rawMeta = m;\n        p.meta = { ...DEFAULTS, ...m };\n      }\n    } else if (isLang(t, ...LANG.css)) p.css.push(i);\n    else if (isLang(t, ...LANG.captions)) {\n      if (p.captionsTok < 0) p.captionsTok = i;\n      else {\n        p.captionsIgnored++;\n        errors.push({ level: "warning", line: t.line, captions: true, message: "second captions block ignored (one ```srt track per project)" });\n      }\n    } else if (isLang(t, ...LANG.html) && (t.tags.includes("stage") || p.stageHtml < 0)) {\n      if (p.stageHtml < 0) p.stageHtml = i;\n    } else if (isLang(t, ...LANG.js) && (t.tags.includes("stage") || p.stageJs < 0)) {\n      if (p.stageJs < 0) p.stageJs = i;\n    }\n  }\n  if (p.metaTok < 0) errors.push({ level: "warning", line: 1, message: "no ```fvs project settings block; using 1920\\xD71080 at 30 fps" });\n  while (i < toks.length) {\n    const head = toks[i];\n    const s = { head: i, first: i, last: i, metaTok: -1, htmlTok: -1, jsTok: -1, cssTok: -1, meta: {}, title: "", id: "" };\n    const hm = head.text.match(SCENE_HEAD);\n    if (hm) {\n      s.id = hm[1];\n      s.title = (hm[2] || "").trim();\n    } else {\n      s.id = "";\n      s.title = head.text;\n      errors.push({ level: "error", line: head.line, message: `scene heading "${head.text}" must start with an id (letters, digits, - or _), e.g. "## intro \\xB7 \\u5F00\\u573A"` });\n    }\n    for (i++; i < toks.length; i++) {\n      const t = toks[i];\n      if (t.kind === "heading" && t.level <= 2) break;\n      s.last = i;\n      if (t.kind === "fence" && !t.closed) errors.push({ level: "error", line: t.line, scene: s.id, message: "code block is never closed" });\n      if (isFvs(t)) {\n        if (s.metaTok < 0) {\n          s.metaTok = i;\n          s.meta = readJSON(t, s.id, errors) || {};\n        }\n      } else if (isLang(t, ...LANG.captions)) errors.push({ level: "warning", line: t.line, scene: s.id, captions: true, message: "a captions block inside a scene is ignored; move it before the first scene" });\n      else for (const k of ["html", "js", "css"]) if (isLang(t, ...LANG[k])) {\n        if (s[`${k}Tok`] < 0) s[`${k}Tok`] = i;\n        else errors.push({ level: "warning", line: t.line, scene: s.id, message: `second \\`${k}\\` block in scene "${s.id}" is ignored` });\n      }\n    }\n    if (head.level === 1) continue;\n    p.scenes.push(s);\n  }\n  computeTimeline(p);\n  return p;\n}\nfunction inPoint(meta, tempo) {\n  if (meta.in === void 0 || meta.in === null) return 0;\n  const v = parseLength(meta.in, tempo);\n  if (!(v >= 0)) throw new Error(`"in" must not be negative, got ${JSON.stringify(meta.in)}`);\n  return v;\n}\nfunction readTransition(v, tempo) {\n  const type = typeof v === "string" ? v : v && typeof v === "object" && !Array.isArray(v) ? v.type : void 0;\n  if (typeof type !== "string") throw new Error(\'"transition" must be a type such as "fade", or { "type": "fade", "dur": "1 beat" }\');\n  if (!TRANSITIONS.includes(type)) throw new Error(`unknown transition "${type}" (use ${TRANSITIONS.join(", ")})`);\n  const raw = typeof v === "object" ? v.dur : void 0;\n  const dur = raw === void 0 || raw === null ? tempo ? tempo.beat : 0.5 : parseLength(raw, tempo);\n  if (!(dur > 0)) throw new Error(`transition "dur" must be positive, got ${JSON.stringify(raw)}`);\n  return { type, dur };\n}\nfunction computeTimeline(p) {\n  const tempo = tempoOf(p.meta);\n  p.tempo = tempo;\n  const seen = /* @__PURE__ */ new Set();\n  const body = (s, k) => s[`${k}Tok`] >= 0 ? p.toks[s[`${k}Tok`]].body : "";\n  let t = 0;\n  for (const [k, s] of p.scenes.entries()) {\n    s.index = k;\n    s.html = body(s, "html");\n    s.js = body(s, "js");\n    s.css = body(s, "css");\n    s.line = p.toks[s.head].line;\n    const metaLine2 = s.metaTok >= 0 ? p.toks[s.metaTok].line : s.line;\n    if (s.id && seen.has(s.id)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: `duplicate scene id "${s.id}"` });\n    seen.add(s.id);\n    let len = 0;\n    try {\n      if (s.meta.length === void 0) throw new Error(\'scene has no "length" (e.g. "length": "2 bars")\');\n      len = parseLength(s.meta.length, tempo);\n      if (!(len > 0)) throw new Error(`length must be positive, got ${JSON.stringify(s.meta.length)}`);\n    } catch (e) {\n      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });\n      len = len > 0 ? len : tempo ? tempo.bar : 2;\n    }\n    s.t0 = t;\n    s.dur = len;\n    s.t1 = t + len;\n    t = s.t1;\n    s.in = 0;\n    try {\n      s.in = inPoint(s.meta, tempo);\n    } catch (e) {\n      p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message.startsWith(\'"in"\') ? e.message : `"in": ${e.message}` });\n    }\n    s.t0v = s.t0 - s.in;\n    s.transition = null;\n    if (s.meta.transition !== void 0 && s.meta.transition !== null) {\n      try {\n        const tr = readTransition(s.meta.transition, tempo);\n        if (k === 0) p.errors.push({ level: "warning", line: metaLine2, scene: s.id, message: \'the first scene has nothing to transition from; its "transition" is ignored\' });\n        else s.transition = { type: tr.type, dur: Math.min(tr.dur, len) };\n      } catch (e) {\n        p.errors.push({ level: "error", line: metaLine2, scene: s.id, message: e.message });\n      }\n    }\n    const u = hitUnit(tempo);\n    const hits = Array.isArray(s.meta.hits) ? s.meta.hits : [];\n    if (s.meta.hits !== void 0 && !Array.isArray(s.meta.hits)) p.errors.push({ level: "error", line: s.line, scene: s.id, message: \'"hits" must be an array of numbers\' });\n    s.hits = hits.filter((h) => typeof h === "number" && isFinite(h));\n    if (s.hits.length !== hits.length) p.errors.push({ level: "error", line: s.line, scene: s.id, message: \'"hits" must contain numbers only\' });\n    for (let j = 1; j < s.hits.length; j++) if (s.hits[j] < s.hits[j - 1]) {\n      p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "hits are not in ascending order" });\n      break;\n    }\n    const end = s.in + len, next = p.scenes[k + 1];\n    let continued = false;\n    if (next) {\n      try {\n        continued = inPoint(next.meta, tempo) > 0 && body(next, "html") === s.html && body(next, "css") === s.css && body(next, "js") === s.js;\n      } catch {\n        continued = false;\n      }\n    }\n    s.continued = continued;\n    if (s.hits.some((h) => h < 0 || h * u > end + 1e-6 && !continued)) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: `a hit falls outside the scene (0\\u2013${round(end / u, 3)} ${tempo ? "beats" : "s"})` });\n    s.hitTimes = s.hits.map((h) => t0Round(s.t0v + h * u));\n    if (!s.html.trim() && !s.js.trim()) p.errors.push({ level: "warning", line: s.line, scene: s.id, message: "scene has no html or js block" });\n  }\n  p.length = t;\n  const m = p.meta;\n  const metaLine = p.metaTok >= 0 ? p.toks[p.metaTok].line : 1;\n  for (const k of ["width", "height", "fps"]) if (!(+m[k] > 0)) p.errors.push({ level: "error", line: metaLine, message: `"${k}" must be a positive number` });\n  checkAudio(p, metaLine);\n  readCaptions(p, metaLine);\n  if (!p.scenes.length) p.errors.push({ level: "warning", line: 1, message: \'the project has no scenes yet (add a "## id \\xB7 Title" section)\' });\n}\nfunction checkAudio(p, line) {\n  const raw = p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio];\n  raw.forEach((a, i) => {\n    if (!a || typeof a !== "object") return;\n    const name = `audio track ${i + 1}${a.src ? ` (${a.src})` : ""}`;\n    for (const [k, min] of [["in", 0], ["dur", 1e-9]]) {\n      if (a[k] === void 0 || a[k] === null) continue;\n      try {\n        const v = parseLength(a[k], p.tempo);\n        if (!(v >= min)) throw new Error(k === "in" ? "must not be negative" : "must be positive");\n      } catch (e) {\n        p.errors.push({ level: "error", line, message: `${name} "${k}": ${e.message}` });\n      }\n    }\n  });\n}\nvar CAPTION_POSITIONS = ["bottom", "top"];\nvar CAPTION_SIZES = ["small", "medium", "large"];\nfunction captionStyle(meta) {\n  const c = meta && meta.captions && typeof meta.captions === "object" ? meta.captions : {};\n  return { position: CAPTION_POSITIONS.includes(c.position) ? c.position : "bottom", size: CAPTION_SIZES.includes(c.size) ? c.size : "medium" };\n}\nfunction readCaptions(p, metaLine) {\n  const c = p.meta.captions;\n  if (c !== void 0 && c !== null && (typeof c !== "object" || Array.isArray(c) || c.position !== void 0 && !CAPTION_POSITIONS.includes(c.position) || c.size !== void 0 && !CAPTION_SIZES.includes(c.size))) {\n    p.errors.push({ level: "warning", line: metaLine, captions: true, message: `"captions" settings: use { "position": "${CAPTION_POSITIONS.join(\'" | "\')}", "size": "${CAPTION_SIZES.join(\'" | "\')}" }` });\n  }\n  if (p.captionsTok < 0) return;\n  const tok = p.toks[p.captionsTok], base = tok.line;\n  const { cues, errors } = parseSrt(tok.body);\n  for (const e of errors) p.errors.push({ level: "error", line: base + e.line, captions: true, message: e.message });\n  p.captions = cues.map((x) => ({ ...x, line: base + x.line }));\n  const late = p.scenes.length ? p.captions.find((x) => x.start >= p.length - 1e-6) : null;\n  if (late) p.errors.push({ level: "warning", line: late.line, captions: true, message: `a caption starts at ${round(late.start, 3)} s, after the end of the video (${round(p.length, 3)} s)` });\n}\nvar t0Round = (x) => Math.round(x * 1e9) / 1e9;\nvar cssBlocks = (p) => p.css.map((k) => p.toks[k].body);\nvar stageHtml = (p) => p.stageHtml >= 0 ? p.toks[p.stageHtml].body : "";\nvar stageJs = (p) => p.stageJs >= 0 ? p.toks[p.stageJs].body : "";\nvar sceneById = (p, id) => p.scenes.find((s) => s.id === id) || null;\nvar visibleHits = (s) => (s.hitTimes || []).map((t, index) => ({ index, t })).filter((h) => h.t >= s.t0 - 1e-6 && (s.continued ? h.t < s.t1 - 1e-6 : h.t <= s.t1 + 1e-6));\nfunction cueSheet(p) {\n  const tempo = p.tempo;\n  return {\n    title: p.meta.title || "",\n    bpm: tempo ? tempo.bpm : null,\n    beatsPerBar: tempo ? tempo.beatsPerBar : null,\n    length: round(p.length, 6),\n    fps: +p.meta.fps,\n    scenes: p.scenes.map((s) => {\n      const vis = visibleHits(s);\n      return {\n        id: s.id,\n        title: s.title,\n        t0: round(s.t0, 6),\n        t1: round(s.t1, 6),\n        ...tempo ? { bar: round(s.t0 / tempo.bar, 6), bars: round(s.dur / tempo.bar, 6), beat: round(s.t0 / tempo.beat, 6) } : {},\n        ...s.in ? { in: round(s.in, 6) } : {},\n        ...s.transition ? { transition: { type: s.transition.type, dur: round(s.transition.dur, 6) } } : {},\n        hits: vis.map((h) => s.hits[h.index]),\n        hitTimes: vis.map((h) => round(h.t, 6))\n      };\n    }),\n    audio: (p.meta.audio == null ? [] : Array.isArray(p.meta.audio) ? p.meta.audio : [p.meta.audio]).map((a) => typeof a === "string" ? { src: a } : a)\n  };\n}\n\n// src/lib/html.js\nvar RAW = /^(script|style|textarea|title)$/i;\nvar VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;\nvar ENT = { amp: "&", lt: "<", gt: ">", quot: \'"\', apos: "\'", nbsp: "\\xA0", mdash: "\\u2014", ndash: "\\u2013", hellip: "\\u2026", middot: "\\xB7", copy: "\\xA9", reg: "\\xAE", trade: "\\u2122", laquo: "\\xAB", raquo: "\\xBB", ldquo: "\\u201C", rdquo: "\\u201D", lsquo: "\\u2018", rsquo: "\\u2019", times: "\\xD7", larr: "\\u2190", rarr: "\\u2192", uarr: "\\u2191", darr: "\\u2193", bull: "\\u2022" };\nvar decode = (s) => s.replace(/&(#x[0-9a-f]+|#\\d+|[a-z]+);/gi, (m, k) => {\n  if (k[0] === "#") {\n    const c = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : +k.slice(1);\n    try {\n      return String.fromCodePoint(c);\n    } catch {\n      return m;\n    }\n  }\n  return ENT[k.toLowerCase()] ?? m;\n});\nfunction tagEnd(html, i) {\n  let q = null;\n  for (let k = i + 1; k < html.length; k++) {\n    const c = html[k];\n    if (q) {\n      if (c === q) q = null;\n    } else if (c === \'"\' || c === "\'") q = c;\n    else if (c === ">") return k + 1;\n  }\n  return html.length;\n}\nvar ATTR = /([^\\s"\'<>\\/=]+)(?:\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s"\'=<>`]+)))?/g;\nfunction scan(html) {\n  const texts = [], tags = [];\n  const stack = [];\n  let i = 0, textStart = 0;\n  const n = html.length;\n  const pushText = (a, b) => {\n    if (b <= a) return;\n    const raw = html.slice(a, b), text = decode(raw);\n    if (/\\S/.test(text)) texts.push({ index: texts.length, start: a, end: b, raw, text, tag: stack.length ? stack[stack.length - 1] : -1 });\n  };\n  while (i < n) {\n    if (html[i] !== "<") {\n      i++;\n      continue;\n    }\n    if (html.startsWith("<!--", i)) {\n      pushText(textStart, i);\n      const e = html.indexOf("-->", i + 4);\n      i = e < 0 ? n : e + 3;\n      textStart = i;\n      continue;\n    }\n    const m = /^<(\\/?)([A-Za-z][\\w:-]*)/.exec(html.slice(i, i + 80));\n    if (!m) {\n      if (html[i + 1] === "!" || html[i + 1] === "?") {\n        pushText(textStart, i);\n        i = tagEnd(html, i);\n        textStart = i;\n      } else i++;\n      continue;\n    }\n    pushText(textStart, i);\n    const end = tagEnd(html, i), name = m[2].toLowerCase();\n    if (m[1]) {\n      for (let k = stack.length - 1; k >= 0; k--) if (tags[stack[k]].name === name) {\n        stack.length = k;\n        break;\n      }\n      i = end;\n      textStart = i;\n      continue;\n    }\n    const body = html.slice(i + 1 + m[2].length, end - 1);\n    const attrs = [];\n    const selfClose = /\\/\\s*$/.test(body);\n    ATTR.lastIndex = 0;\n    let a;\n    while (a = ATTR.exec(body)) {\n      if (a[1] === "/") continue;\n      const off = i + 1 + m[2].length + a.index;\n      const v = a[2] ?? a[3] ?? a[4];\n      attrs.push({ name: a[1].toLowerCase(), value: v === void 0 ? "" : decode(v), start: off, end: off + a[0].length });\n    }\n    const tag = { index: tags.length, name, start: i, end, attrs, attr: (k) => (attrs.find((x) => x.name === k) || {}).value };\n    tags.push(tag);\n    i = end;\n    textStart = i;\n    if (RAW.test(name) && !selfClose) {\n      const close = html.toLowerCase().indexOf(`</${name}`, i);\n      i = close < 0 ? n : close;\n      textStart = i;\n      continue;\n    }\n    if (!VOID.test(name) && !selfClose) stack.push(tag.index);\n  }\n  pushText(textStart, n);\n  return { texts, tags };\n}\nvar num = (v, d) => {\n  const x = parseFloat(v);\n  return Number.isFinite(x) ? x : d;\n};\nfunction videos(html) {\n  const { tags } = scan(html);\n  const lower = html.toLowerCase();\n  return tags.filter((t) => t.name === "video").map((t) => {\n    const selfClosed = html[t.end - 2] === "/";\n    const close = selfClosed ? -1 : lower.indexOf("</video", t.end);\n    const end = close < 0 ? t.end : close;\n    const source = tags.find((x) => x.name === "source" && x.start >= t.end && x.start < end && x.attr("src"));\n    const has = (k) => t.attrs.some((a) => a.name === k);\n    return {\n      tag: t.index,\n      src: t.attr("src") || (source ? source.attr("src") : "") || "",\n      clipIn: Math.max(0, num(t.attr("data-clip-in"), 0)),\n      gain: num(t.attr("data-gain"), 0),\n      muted: has("muted"),\n      loop: has("loop")\n    };\n  });\n}\n\n// src/lib/compile.js\nvar ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\\/\\/|#|\\/)/i;\nvar isRelativeUrl = (u) => !!u && !ABSOLUTE.test(u.trim()) && !/^\\$\\{/.test(u) && !/^%%/.test(u);\nvar ATTR2 = /(\\s(?:src|href|poster|xlink:href)\\s*=\\s*)(["\'])([^"\']*)\\2/gi;\nvar CSS_URL = /url\\(\\s*(["\']?)([^"\')]+)\\1\\s*\\)/gi;\nfunction assetRefs(html = "", css = "") {\n  const out = /* @__PURE__ */ new Set();\n  for (const m of html.matchAll(ATTR2)) if (isRelativeUrl(m[3])) out.add(clean(m[3]));\n  for (const m of (html + "\\n" + css).matchAll(CSS_URL)) if (isRelativeUrl(m[2])) out.add(clean(m[2]));\n  return [...out];\n}\nvar clean = (u) => u.trim().replace(/^\\.\\//, "");\nvar rewriteHtml = (html, map) => html.replace(ATTR2, (m, pre, q, u) => isRelativeUrl(u) && map[clean(u)] ? `${pre}${q}${map[clean(u)]}${q}` : m);\nvar rewriteCss = (css, map) => css.replace(CSS_URL, (m, q, u) => isRelativeUrl(u) && map[clean(u)] ? `url(${q}${map[clean(u)]}${q})` : m);\nvar list = (v) => v == null ? [] : Array.isArray(v) ? v : [v];\nfunction audioTracks(meta) {\n  const tempo = tempoOf(meta);\n  const seconds = (v) => {\n    if (v === void 0 || v === null || v === "") return null;\n    try {\n      const x = parseLength(v, tempo);\n      return Number.isFinite(x) ? x : null;\n    } catch {\n      return null;\n    }\n  };\n  return list(meta.audio).map((a, i) => typeof a === "string" ? { src: a } : a).filter((a) => a && a.src).map((a, i) => {\n    const from = seconds(a.in), dur = seconds(a.dur);\n    return { id: a.id || `a${i}`, src: String(a.src), at: +a.at || 0, gain: +a.gain || 0, role: a.role || (i ? "track" : "score"), in: from > 0 ? from : 0, dur: dur > 0 ? dur : null, mute: !!a.mute };\n  });\n}\nfunction sceneMedia(p) {\n  const out = [];\n  for (const s of p.scenes) {\n    videos(s.html).forEach((v, k) => {\n      if (v.muted || !v.src) return;\n      out.push({ id: `${s.id}/video-${k}`, scene: s.id, src: v.src, at: s.t0, in: v.clipIn + s.in, dur: s.dur, gain: v.gain, loop: v.loop });\n    });\n  }\n  return out;\n}\nfunction compile(p, { resolve: resolve3 = (u) => u } = {}) {\n  const css = cssBlocks(p).join("\\n\\n");\n  const refs = /* @__PURE__ */ new Set([...assetRefs(stageHtml(p), css), ...list(p.meta.assets).map(clean)]);\n  for (const s of p.scenes) for (const r of assetRefs(s.html, s.css)) refs.add(r);\n  const audio = audioTracks(p.meta);\n  const map = {};\n  for (const r of refs) map[r] = resolve3(r);\n  const url = (src) => isRelativeUrl(src) ? map[clean(src)] ?? resolve3(clean(src)) : src;\n  const jsLine = (k) => k >= 0 ? p.toks[k].line + 1 : 0;\n  return {\n    v: 1,\n    title: p.meta.title || "",\n    lang: p.meta.lang || "zh-CN",\n    width: +p.meta.width,\n    height: +p.meta.height,\n    fps: +p.meta.fps,\n    length: p.length,\n    tempo: p.tempo ? { bpm: p.tempo.bpm, beatsPerBar: p.tempo.beatsPerBar } : null,\n    background: p.meta.background || "#000",\n    className: p.meta.class || "",\n    fonts: list(p.meta.fonts),\n    css: rewriteCss(css, map),\n    stage: { html: rewriteHtml(stageHtml(p), map), js: stageJs(p), line: jsLine(p.stageJs) },\n    scenes: p.scenes.map((s) => ({\n      id: s.id,\n      title: s.title,\n      t0: s.t0,\n      t1: s.t1,\n      t0v: s.t0v,\n      in: s.in,\n      transition: s.transition,\n      hits: s.hitTimes,\n      beats: s.hits,\n      cls: s.meta.class || "",\n      html: rewriteHtml(s.html, map),\n      css: rewriteCss(s.css, map),\n      js: s.js,\n      line: jsLine(s.jsTok),\n      htmlLine: jsLine(s.htmlTok)\n    })),\n    captions: (p.captions || []).map((c) => ({ t0: c.start, t1: c.end, text: c.text })),\n    captionStyle: captionStyle(p.meta),\n    audio: audio.map((a) => ({ ...a, url: resolve3(a.src) })),\n    media: sceneMedia(p).map((m) => ({ ...m, url: url(m.src) })),\n    assets: map\n  };\n}\nvar track = (a) => ({ id: a.id, kind: "track", src: a.src, url: a.url ?? a.src, at: +a.at || 0, in: +a.in || 0, dur: a.dur > 0 ? +a.dur : null, gain: +a.gain || 0, mute: !!a.mute, role: a.role });\nvar video = (m, assets = {}) => ({ id: m.id, kind: "video", scene: m.scene, src: m.src, url: m.url ?? assets[clean(m.src)] ?? m.src, at: +m.at || 0, in: +m.in || 0, dur: m.dur > 0 ? +m.dur : null, gain: +m.gain || 0, mute: false, loop: !!m.loop });\nfunction audioSegments(x) {\n  if (x && Array.isArray(x.toks)) return [...audioTracks(x.meta).map(track), ...sceneMedia(x).map((m) => video(m))];\n  return payloadSegments(x);\n}\nvar payloadSegments = (P) => P ? [...(P.audio || []).map(track), ...(P.media || []).map((m) => video(m, P.assets))] : [];\nvar esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;" })[c]);\nvar scriptJSON = (v) => JSON.stringify(v).replace(/</g, "\\\\u003c").replace(/\\u2028/g, "\\\\u2028").replace(/\\u2029/g, "\\\\u2029");\nfunction buildHtml(payload, runtimeSource, { mode = "player", extraHead = "" } = {}) {\n  const fonts = payload.fonts.map((u) => `<link rel="stylesheet" href="${esc(u)}">`).join("\\n");\n  const assets = payload.assets || {};\n  if ((payload.media || []).some((m) => m.url && assets[clean(m.src)] === m.url)) {\n    payload = { ...payload, media: payload.media.map((m) => m.url && assets[clean(m.src)] === m.url ? { ...m, url: null } : m) };\n  }\n  return `<!doctype html>\n<html lang="${esc(payload.lang)}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(payload.title || "Forsion Video Studio")}</title>\n<meta name="generator" content="Forsion Video Studio">\n${fonts}\n${extraHead}\n</head>\n<body>\n<script type="application/json" id="fvs-data">${scriptJSON(payload)}<\/script>\n<script>${runtimeSource.replace(/<\\/script/gi, "<\\\\/script")}<\/script>\n<script>FVS.boot(${JSON.stringify(mode)});<\/script>\n</body>\n</html>\n`;\n}\n\n// src/lib/onsets.js\nvar ONSET_SR = 22050;\nvar N = 1024;\nvar HOP = 128;\nvar BLOCK = 110;\nfunction fft(re, im) {\n  const n = re.length;\n  for (let i = 1, j = 0; i < n; i++) {\n    let bit = n >> 1;\n    for (; j & bit; bit >>= 1) j ^= bit;\n    j ^= bit;\n    if (i < j) {\n      [re[i], re[j]] = [re[j], re[i]];\n      [im[i], im[j]] = [im[j], im[i]];\n    }\n  }\n  for (let len = 2; len <= n; len <<= 1) {\n    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);\n    for (let i = 0; i < n; i += len) {\n      let cr = 1, ci = 0;\n      for (let k = 0; k < len / 2; k++) {\n        const a = i + k, b = a + len / 2;\n        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;\n        re[b] = re[a] - tr;\n        im[b] = im[a] - ti;\n        re[a] += tr;\n        im[a] += ti;\n        const nr = cr * wr - ci * wi;\n        ci = cr * wi + ci * wr;\n        cr = nr;\n      }\n    }\n  }\n}\nfunction downsample(x, sr) {\n  if (sr === ONSET_SR) return x;\n  const r = sr / ONSET_SR, out = new Float32Array(Math.floor(x.length / r));\n  for (let i = 0; i < out.length; i++) {\n    const a = Math.floor(i * r), b = Math.max(a + 1, Math.floor((i + 1) * r));\n    let s = 0;\n    for (let k = a; k < b; k++) s += x[k];\n    out[i] = s / (b - a);\n  }\n  return out;\n}\nvar MELS = 64;\nvar hz2mel = (f) => 2595 * Math.log10(1 + f / 700);\nvar mel2hz = (m) => 700 * (10 ** (m / 2595) - 1);\nvar bank = null;\nfunction melBank() {\n  if (bank) return bank;\n  const bins = N / 2 + 1, top = hz2mel(ONSET_SR / 2), pts = [];\n  for (let i = 0; i < MELS + 2; i++) pts.push(mel2hz(top * i / (MELS + 1)) / (ONSET_SR / 2) * (bins - 1));\n  bank = [];\n  for (let m = 0; m < MELS; m++) {\n    const [l, c, r] = [pts[m], pts[m + 1], pts[m + 2]], w = [];\n    for (let k = Math.floor(l); k <= Math.ceil(r) && k < bins; k++) {\n      const v = k < c ? (k - l) / Math.max(1e-9, c - l) : (r - k) / Math.max(1e-9, r - c);\n      if (v > 0) w.push([k, v]);\n    }\n    bank.push(w);\n  }\n  return bank;\n}\nfunction onsetEnvelope(mono, sr = ONSET_SR) {\n  const x = downsample(mono, sr);\n  const frames = Math.max(0, Math.floor((x.length - N) / HOP) + 1);\n  const env = new Float32Array(frames), level = new Float32Array(frames);\n  const rms = new Float32Array(Math.floor(x.length / BLOCK));\n  for (let b = 0; b < rms.length; b++) {\n    let e = 0;\n    for (let i = b * BLOCK; i < (b + 1) * BLOCK; i++) e += x[i] * x[i];\n    rms[b] = e / BLOCK;\n  }\n  const win = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));\n  const B = melBank();\n  const mel = new Float32Array(frames * MELS);\n  const re = new Float32Array(N), im = new Float32Array(N);\n  let top = -Infinity;\n  for (let f = 0; f < frames; f++) {\n    const o = f * HOP;\n    let ss = 0;\n    for (let i = 0; i < N; i++) {\n      const v = x[o + i];\n      re[i] = v * win[i];\n      im[i] = 0;\n      ss += v * v;\n    }\n    level[f] = 10 * Math.log10(ss / N + 1e-12);\n    fft(re, im);\n    for (let m = 0; m < MELS; m++) {\n      let e = 0;\n      for (const [k, w] of B[m]) e += w * (re[k] * re[k] + im[k] * im[k]);\n      const db = 10 * Math.log10(Math.max(e, 1e-10));\n      mel[f * MELS + m] = db;\n      if (db > top) top = db;\n    }\n  }\n  const floor = top - 80;\n  for (let i = 0; i < mel.length; i++) if (mel[i] < floor) mel[i] = floor;\n  for (let f = 1; f < frames; f++) {\n    let s = 0;\n    for (let m = 0; m < MELS; m++) {\n      const d = mel[f * MELS + m] - mel[(f - 1) * MELS + m];\n      if (d > 0) s += d;\n    }\n    env[f] = s / MELS;\n  }\n  const sorted = [...env].sort((a, b) => a - b);\n  const p95 = sorted[Math.floor(sorted.length * 0.95)] || 1;\n  for (let f = 0; f < frames; f++) env[f] /= p95;\n  return { env, level, rms, block: BLOCK / ONSET_SR, hop: HOP / ONSET_SR, offset: N / 2 / ONSET_SR };\n}\nvar pct = (arr, q) => {\n  const s = [...arr].sort((a, b) => a - b);\n  return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * q))] : 0;\n};\nvar hitsOf = (s) => s.hitTimes && s.t0 !== void 0 && s.t1 !== void 0 ? visibleHits(s) : (s.hitTimes || s.hits || []).map((t, index) => ({ index, t }));\nfunction syncReport(scenes, { env, rms, block, hop, offset }, { before = 0.065, after = 0.03, weak = 0.6 } = {}) {\n  const at = (t) => Math.round((t - offset) / hop);\n  const rows = [];\n  for (const s of scenes) {\n    hitsOf(s).forEach(({ index: i, t }) => {\n      const a = Math.max(0, at(t - before)), b = Math.min(env.length - 1, at(t + after));\n      let best = -1, bi = a;\n      for (let k = a; k <= b; k++) if (env[k] > best) {\n        best = env[k];\n        bi = k;\n      }\n      const la = Math.max(0, at(t - 1)), lb = Math.min(env.length, at(t + 1));\n      const local = pct(env.subarray(la, lb), 0.99) || 1;\n      const strength = best < 0 ? 0 : best / local;\n      const lvl = (p, q) => {\n        const x = rms.subarray(Math.max(0, Math.ceil(p / block)), Math.max(0, Math.floor(q / block)));\n        let s2 = 0;\n        for (const v of x) s2 += v;\n        return x.length ? 10 * Math.log10(s2 / x.length + 1e-12) : -120;\n      };\n      const drop = lvl(t, t + 0.07) - lvl(t - 0.08, t - 0.01) <= -6;\n      const off = best < 0 ? null : bi * hop + offset - t;\n      rows.push({ scene: s.id, hit: i, t, offset: off, strength: +strength.toFixed(2), quiet: drop, ok: drop || strength >= weak });\n    });\n  }\n  return rows;\n}\n\n// src/lib/templates.js\nvar FONTS = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&display=swap";\nvar HEAD = (title, zh) => `# ${title}\n\n${zh ? "\\u8FD9\\u662F\\u4E00\\u4E2A Forsion Video Studio \\u5DE5\\u7A0B\\u6587\\u4EF6\\u3002\\u573A\\u666F\\u6309\\u987A\\u5E8F\\u9996\\u5C3E\\u76F8\\u63A5\\u5730\\u64AD\\u653E\\uFF1B\\u6BCF\\u4E2A\\u573A\\u666F\\u7684 `hits` \\u662F\\u4ECE\\u573A\\u666F\\u5F00\\u5934\\u7B97\\u8D77\\u7684\\u62CD\\u70B9\\uFF0C\\u753B\\u9762\\u7684\\u5207\\u70B9\\u548C\\u914D\\u4E50\\u7684\\u91CD\\u97F3\\u90FD\\u4ECE\\u8FD9\\u91CC\\u8BFB\\u3002\\u7528 Video Studio \\u6253\\u5F00\\u53EF\\u4EE5\\u76F4\\u63A5\\u6539\\u6587\\u5B57\\u3001\\u62D6\\u65F6\\u95F4\\u7EBF\\uFF1B\\u4E5F\\u53EF\\u4EE5\\u8BA9 AI \\u6309\\u8FD9\\u4EFD\\u6587\\u4EF6\\u7684\\u5199\\u6CD5\\u7EE7\\u7EED\\u5199\\u3002" : "A Forsion Video Studio project. Scenes play back to back in document order; each scene\'s `hits` are beats from its start, and both the picture cuts and the score\'s accents read them. Open it in Video Studio to edit the text and the timeline, or ask the AI to keep writing it."}\n`;\nvar EVA_CSS = `/* Title cards in the manner of an EVA intertitle: black, heavy serif, hard cuts on the beat. */\n.fvs-eva { --ink: #f2f0ea; --red: #e3161b; --orange: #ff6a13; --green: #38ff8b; color: var(--ink); font-family: \'Noto Serif SC\', \'Songti SC\', serif; }\n.fvs-eva .card { position: absolute; inset: 0; background: #000; }\n.fvs-eva .card.inv { background: var(--ink); color: #000; }\n.fvs-eva .k { position: absolute; font-weight: 900; line-height: 1; white-space: nowrap; transform: scaleX(.8); transform-origin: 0 0; }\n.fvs-eva .k.mid { left: 0; right: 0; text-align: center; transform-origin: 50% 0; }\n.fvs-eva .e { position: absolute; font: 700 44px/1.3 \'Barlow Condensed\', sans-serif; letter-spacing: .22em; white-space: nowrap; }\n.fvs-eva .e.mid { left: 0; right: 0; text-align: center; }\n.fvs-eva .red { color: var(--red); }\n.fvs-eva .hud { position: absolute; inset: 0; background: #000; color: var(--orange); font-family: \'Barlow Condensed\', sans-serif; }\n.fvs-eva .top { position: absolute; left: 90px; right: 90px; top: 60px; height: 70px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--orange); font: 700 38px \'Barlow Condensed\', sans-serif; letter-spacing: .16em; }\n.fvs-eva .term { position: absolute; left: 90px; top: 220px; display: grid; gap: 14px; }\n.fvs-eva .term p { margin: 0; font: 500 44px/1.4 \'JetBrains Mono\', monospace; color: var(--green); white-space: pre; }\n.fvs-eva .grain { position: absolute; inset: 0; pointer-events: none; background-size: 200px 200px; opacity: .06; mix-blend-mode: screen; }`;\nfunction evaTemplate({ title = "\\u65B0\\u89C6\\u9891", zh = true } = {}) {\n  return `${HEAD(title, zh)}\n\\`\\`\\`fvs\n{\n  "fvs": 1,\n  "title": ${JSON.stringify(title)},\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "class": "fvs-eva",\n  "fonts": [${JSON.stringify(FONTS)}],\n  "audio": []\n}\n\\`\\`\\`\n\n\\`\\`\\`css\n${EVA_CSS}\n\\`\\`\\`\n\n\\`\\`\\`html stage\n<div data-fvs-scenes></div>\n<div class="grain"></div>\n<div data-fvs-flash></div>\n\\`\\`\\`\n\n\\`\\`\\`js stage\ngrain(\'.grain\')\n\\`\\`\\`\n\n## boot \\xB7 \\u542F\\u52A8\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 1, 2, 3, 4, 6] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div class="hud">\n  <div class="top"><span>FORSION VIDEO STUDIO</span><span class="red">\\u25CF REC</span></div>\n  <div class="term">\n    <p data-in="h1" data-fx="type">SCENES ........ OK</p>\n    <p data-in="h2" data-fx="type">TIMELINE ...... OK</p>\n    <p data-in="h3" data-fx="type">SCORE ......... OK</p>\n    <p data-in="h4" data-fx="type" class="red">HUMAN ......... ??</p>\n  </div>\n</div>\n\\`\\`\\`\n\n## cards \\xB7 \\u6807\\u9898\\u5361\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 2, 4, 6] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div data-seq="h0">\n  <div class="card"><span class="k" style="left:150px;top:260px;font-size:380px">\\u7B2C\\u4E00\\u8BDD</span><span class="e" style="left:160px;top:760px">EPISODE ONE</span></div>\n  <div class="card"><span class="k" style="left:1500px;top:90px;font-size:300px;writing-mode:vertical-rl;transform:scaleY(.86)">\\u5F00\\u59CB</span><span class="e" style="left:150px;top:920px">BEGIN</span></div>\n  <div class="card inv"><span class="k mid" style="top:330px;font-size:360px">\\u6539\\u6587\\u5B57</span></div>\n  <div class="card"><span class="e mid" style="top:380px;font-size:64px">EDIT THE TEXT, DRAG THE TIMELINE.</span><span class="k mid red" style="top:520px;font-size:120px">\\u7136\\u540E\\u5BFC\\u51FA\\u3002</span></div>\n</div>\n\\`\\`\\`\n\n\\`\\`\\`js\n// a flash on the first cut; everything else in this scene is declarative (data-seq)\nflash(hits[0], .6)\n\\`\\`\\`\n\n## title \\xB7 \\u7247\\u540D\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 4] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<div class="card">\n  <span class="e" style="left:160px;top:150px;font-size:60px" data-in="h0">EPISODE 01</span>\n  <span class="k" style="left:140px;top:280px;font-size:420px" data-in="h1">${title}</span>\n</div>\n\\`\\`\\`\n\n\\`\\`\\`js\nflash(hits[1], .85)\n\\`\\`\\`\n`;\n}\nfunction blankTemplate({ title = "\\u65B0\\u89C6\\u9891", zh = true } = {}) {\n  return `${HEAD(title, zh)}\n\\`\\`\\`fvs\n{\n  "fvs": 1,\n  "title": ${JSON.stringify(title)},\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "background": "#101010",\n  "audio": []\n}\n\\`\\`\\`\n\n\\`\\`\\`css\n.fvs-stage { color: #f5f3ef; font-family: \'Noto Sans SC\', \'PingFang SC\', system-ui, sans-serif; }\n.fvs-stage h1 { position: absolute; left: 160px; top: 380px; margin: 0; font-size: 150px; font-weight: 700; }\n.fvs-stage p { position: absolute; left: 164px; top: 600px; margin: 0; font-size: 48px; color: #a39d96; }\n\\`\\`\\`\n\n## intro \\xB7 \\u5F00\\u573A\n\n\\`\\`\\`fvs\n{ "length": "2 bars", "hits": [0, 2] }\n\\`\\`\\`\n\n\\`\\`\\`html\n<h1 data-in="h0" data-fx="up">${title}</h1>\n<p data-in="h1" data-fx="fade">${zh ? "\\u7B2C\\u4E00\\u53E5\\u526F\\u6807\\u9898" : "A subtitle"}</p>\n\\`\\`\\`\n`;\n}\nvar TEMPLATES = { eva: evaTemplate, blank: blankTemplate };\n\n// src/generated/runtime-src.js\nvar runtime_src_default = \'/* Forsion Video Studio 0.7.0 \\u2014 built from src/ by build.mjs; edit the sources, not this file. */\\nvar FVS=(()=>{var nt=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ht=Object.prototype.hasOwnProperty;var gt=(t,e)=>{for(var i in e)nt(t,i,{get:e[i],enumerable:!0})},bt=(t,e,i,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of mt(e))!ht.call(t,o)&&o!==i&&nt(t,o,{get:()=>e[o],enumerable:!(p=pt(e,o))||p.enumerable});return t};var yt=t=>bt(nt({},"__esModule",{value:!0}),t);var Ht={};gt(Ht,{EASE:()=>V,boot:()=>It,createStage:()=>et,mount:()=>tt,prog:()=>Z,rng:()=>Q,timeExpr:()=>ot});var V={lin:t=>t,in:t=>t*t*t,out:t=>1-(1-t)**3,io:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,expo:t=>t>=1?1:1-2**(-10*t),back:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,step:t=>t<1?0:1},G=(t,e=0,i=1)=>Math.min(i,Math.max(e,t)),rt=(t,e,i)=>t+(e-t)*i,Z=(t,e,i,p="io")=>(V[p]||V.io)(G((t-e)/(i-e))),Q=t=>()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=["x","y","z","s","sx","sy","r","rx","ry"];function wt(t,e){if(e<=t[0].t)return t[0].v;for(let i=1;i<t.length;i++){let p=t[i];if(e<p.t){let o=t[i-1],h=(V[p.e]||V.io)((e-o.t)/(p.t-o.t)),l={};for(let w in p.v){let $=w in o.v?o.v[w]:p.v[w],y=p.v[w];l[w]=typeof y=="number"&&typeof $=="number"?$+(y-$)*h:h<1?$:y}return l}}return t[t.length-1].v}function $t(t,e,i){let p=t.style;if(i){let o=`translate3d(${e.x||0}px,${e.y||0}px,${e.z||0}px)`;e.rx&&(o+=` rotateX(${e.rx}deg)`),e.ry&&(o+=` rotateY(${e.ry}deg)`),e.r&&(o+=` rotate(${e.r}deg)`),(e.s??1)!==1&&(o+=` scale(${e.s})`),((e.sx??1)!==1||(e.sy??1)!==1)&&(o+=` scale(${e.sx??1},${e.sy??1})`),p.transform=o}"o"in e&&(p.opacity=e.o,p.visibility=e.o<.002?"hidden":""),("b"in e||"br"in e)&&(p.filter=`blur(${e.b||0}px) brightness(${e.br??1})`),("ct"in e||"cr"in e||"cb"in e||"cl"in e)&&(p.clipPath=`inset(${e.ct||0}% ${e.cr||0}% ${e.cb||0}% ${e.cl||0}%)`);for(let o in e)o[0]==="-"&&p.setProperty(o,e[o])}function et(t){let e=[],i=[],p=o=>typeof o=="string"?[...t.querySelectorAll(o)]:o==null?[]:o instanceof Element?[o]:[...o];return{root:t,q:p,tracks:e,hooks:i,K(o,h,l={}){let w={},$=h.map(([M,k={},L="io"])=>(w={...w,...k},{t:M,v:w,e:L}));if(!$.length)return;let y=$.some(M=>Object.keys(M.v).some(k=>xt.includes(k)));p(o).forEach((M,k)=>e.push({el:M,kf:$,hasTf:y,off:(l.stagger||0)*k}))},S(o,h,l){let w=p(o);i.push($=>{for(let y of w)y.style.display=$>=h&&$<l?"":"none"})},H(o){i.push(o)},type(o,h,l=30,w=0){p(o).forEach(($,y)=>{let M=[...$.textContent],k=h+w*y;i.push(L=>{let S=G(Math.floor((L-k)*l),0,M.length),q=M.slice(0,S).join("");$.textContent!==q&&($.textContent=q)})})},render(o){for(let h of i)h(o);for(let h of e)$t(h.el,wt(h.kf,o-h.off),h.hasTf)}}}var K=null;function kt(){if(K)return K;let t=Q(7);K=[];for(let e=0;e<4;e++){let i=document.createElement("canvas");i.width=i.height=200;let p=i.getContext("2d"),o=p.createImageData(200,200);for(let h=0;h<o.data.length;h+=4){let l=t()*255;o.data[h]=o.data[h+1]=o.data[h+2]=l,o.data[h+3]=255}p.putImageData(o,0,0),K.push(`url(${i.toDataURL()})`)}return K}function it(t,e=".grain"){let i=t.q(e),p=kt();t.H(o=>{let h=p[Math.floor(o*24)%4];for(let l of i)l.style.backgroundImage=h})}var vt=["","aborted","network error","decode error","format not supported or file missing"];function at(t,{mode:e="live",assets:i={},errors:p=[],onError:o=null}={}){let h={};for(let[s,c]of Object.entries(i||{}))typeof c=="string"&&!(c in h)&&(h[c]=s);let l=[],w=[],$=s=>{let c=/^data:([^,;]*)[^,]*;base64,/i.exec(s||"");if(!c||typeof Blob>"u"||typeof URL>"u"||!URL.createObjectURL)return null;try{let m=atob(s.slice(c[0].length).replace(/\\\\s+/g,"")),g=new Uint8Array(m.length);for(let I=0;I<m.length;I++)g[I]=m.charCodeAt(I);let b=URL.createObjectURL(new Blob([g],{type:c[1]||"video/mp4"}));return w.push(b),b}catch{return null}};for(let s of t)for(let c of s.el.querySelectorAll("video")){let m=c.querySelector("source[src]"),g=c.getAttribute("src")||(m?m.getAttribute("src"):"")||"";for(let I of[c,...c.querySelectorAll("source[src]")]){let n=$(I.getAttribute("src"));n&&I.setAttribute("src",n)}let b={el:c,scene:s.id,src:h[g]||g,from:s.from,to:s.to,base:s.base,clipIn:Math.max(0,parseFloat(c.getAttribute("data-clip-in"))||0),loop:c.hasAttribute("loop"),at:null,want:null,chain:Promise.resolve(),failed:!1,reported:!1,misses:0,stall:0};c.muted=!0,c.playsInline=!0,c.setAttribute("playsinline",""),c.preload="auto",c.autoplay=!1,c.removeAttribute("autoplay"),c.controls=!1,c.removeAttribute("controls"),c.loop=b.loop,c.addEventListener("error",()=>{b.failed=!0,S(b,y(b))},!0),c.addEventListener("loadedmetadata",()=>{M(b)||S(b,k(b))}),c.addEventListener("seeked",()=>{let I=b.want;b.want=null,I!==null&&Math.abs(c.currentTime-I)>.05&&S(b,k(b))});try{c.pause(),c.load()}catch{}l.push(b)}if(!l.length)return null;function y(s){let c=s.el.error,m=c?c.code:0,g=c?` (${vt[m]||`error ${m}`}${c.message?`: ${c.message}`:""})`:"",b=m===3||m===4?". Check that the file exists; MP4 (H.264/AAC) needs Google Chrome or Edge (set FVS_CHROMIUM), or convert the clip to WebM (VP9)":"";return`video "${s.src}" cannot be played${g}${b}`}function M(s){let c=s.el,m=c.duration,g=c.seekable;return!(Number.isFinite(m)&&m>.5&&(!g||!g.length||g.end(g.length-1)<.01))}let k=s=>`video "${s.src}" cannot seek: its source does not allow it (an HTTP stream without range requests); load it as a file or a data URL`;function L(s,c){s.want=c,s.el.currentTime=c}function S(s,c){if(!s.reported&&(s.reported=!0,p.push({scene:s.scene,message:c,line:0}),o))try{o(s.scene,s.src)}catch{}}function q(s,c){let m=s.el.duration,g=m>0&&Number.isFinite(m),b=s.clipIn+(c-s.base);return s.loop&&g&&(b=(b%m+m)%m),b<0&&(b=0),g&&b>m-.001&&(b=Math.max(0,m-.001)),b}let F=(s,c)=>c>=s.from&&c<s.to;function N(s,c){return s.chain=s.chain.then(()=>new Promise(m=>{let g=s.el;if(s.failed){m();return}let b=!1,I=null,n=null,a=()=>u(null),u=E=>{b||(b=!0,clearTimeout(f),g.removeEventListener("error",a,!0),I&&g.removeEventListener("loadedmetadata",I),n&&g.removeEventListener("seeked",n),E?(S(s,E),(g.readyState===0||++s.misses>=3)&&(s.failed=!0)):s.misses=0,m())},f=setTimeout(()=>u(s.failed||g.error?null:`video "${s.src}" did not show its frame for ${c.toFixed(3)} s within ${2e3/1e3} s`),2e3);g.addEventListener("error",a,!0);let T=()=>{if(I=null,s.failed||g.error){u(null);return}let E=q(s,c);if(s.at===E&&!g.seeking){u(null);return}let B=!1,H=!g.requestVideoFrameCallback,C=()=>{if(!(!B||!H)){if(Math.abs(g.currentTime-E)>.05){u(k(s));return}s.at=E,u(null)}};g.requestVideoFrameCallback&&g.requestVideoFrameCallback(()=>{H=!0,C()}),n=()=>{B=!0,g.requestVideoFrameCallback?C():requestAnimationFrame(()=>requestAnimationFrame(C))},g.addEventListener("seeked",n,{once:!0}),s.at=null,L(s,E)};g.readyState>=1?T():(I=T,g.addEventListener("loadedmetadata",I,{once:!0}))})),s.chain}let d=null,r=0,v=null,O=0,j=(s,c,m)=>{let g=Math.abs(c-m),b=s.el.duration;return s.loop&&b>0&&Number.isFinite(b)?Math.min(g,b-g):g},_=s=>{try{let c=s.el.play();c&&c.catch&&c.catch(()=>{})}catch{}},U=(s,c)=>{let m=s.el;m.paused||m.pause(),Math.abs(m.currentTime-c)>.001&&L(s,c)};function P(s){!o||s.reported||s.stall||s.el.readyState>0||(s.stall=setTimeout(()=>{s.stall=0,s.el.readyState===0&&S(s,`video "${s.src}" did not load within ${8e3/1e3} s`)},8e3))}function D(){for(let s of l)s.failed||(d!==null&&F(s,d)?U(s,q(s,d)):s.el.paused||s.el.pause())}function Y(s){let c=d===null?NaN:s-d,m=performance.now(),g=(m-r)/1e3;d=s,r=m;let b=c>0&&c<=.3,I=v===!0?b:v===null&&b&&Math.abs(c-g)<.1;for(let n of l){if(n.failed)continue;let a=n.el;if(!F(n,s)){a.paused||a.pause(),s<n.from&&n.from-s<=1&&U(n,q(n,n.from));continue}P(n);let u=q(n,s),f=a.duration,T=!n.loop&&f>0&&Number.isFinite(f)&&u>=f-.001-.001;I&&!T?a.paused?(j(n,a.currentTime,u)>.001&&L(n,u),_(n)):j(n,a.currentTime,u)>.15&&L(n,u):U(n,u)}clearTimeout(O),O=setTimeout(D,150)}return{clips:l,seek(s){if(e!=="capture"){Y(s);return}let c=[];for(let m of l)F(m,s)?c.push(m):m.el.paused||m.el.pause();return Promise.all(c.map(m=>N(m,s))).then(()=>{})},transport(s){v=!!s,v||(clearTimeout(O),D())},ready(){return Promise.all(l.map(s=>new Promise(c=>{let m=s.el;if(s.failed||m.error||m.readyState>=2){c();return}let g=()=>{clearTimeout(b),m.removeEventListener("loadeddata",g),m.removeEventListener("error",g,!0),c()},b=setTimeout(()=>{m.readyState===0&&!s.failed&&(s.failed=!0,S(s,`video "${s.src}" did not load within ${1e4/1e3} s`)),g()},1e4);m.addEventListener("loadeddata",g),m.addEventListener("error",g,!0)})))},destroy(){clearTimeout(O);for(let s of l){clearTimeout(s.stall);try{s.el.pause()}catch{}}for(let s of w)URL.revokeObjectURL(s)}}}var St=`\\n.fvs-stage{position:relative;overflow:hidden;transform-origin:0 0}\\n.fvs-scenes{position:absolute;inset:0}\\n.fvs-scene{position:absolute;inset:0;overflow:hidden}\\n.fvs-transition{position:absolute;inset:0}\\n[data-fvs-flash]{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}\\n.fvs-captions{position:absolute;left:6%;right:6%;bottom:7%;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:.25em;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;font-weight:600;line-height:1.35;text-align:center}\\n.fvs-captions[data-position=top]{top:7%;bottom:auto}\\n.fvs-caption{max-width:100%;padding:.12em .5em;border-radius:.18em;background:rgba(0,0,0,.62);color:#fff;white-space:pre-line;overflow-wrap:anywhere}\\n`,st={fade:t=>({b:{opacity:t}}),dip:t=>({a:{opacity:G(1-2*t)},b:{opacity:G(2*t-1)}}),"slide-left":(t,e)=>({b:{transform:`translateX(${(1-t)*e}px)`}}),"slide-up":(t,e,i)=>({b:{transform:`translateY(${(1-t)*i}px)`}}),"push-left":(t,e)=>({a:{transform:`translateX(${-t*e}px)`},b:{transform:`translateX(${(1-t)*e}px)`}}),"wipe-left":t=>({b:{clipPath:`inset(0 0 0 ${(1-t)*100}%)`}}),zoom:t=>({b:{opacity:t,transform:`scale(${1.08-.08*t})`}}),blur:t=>({b:{opacity:t,filter:`blur(${12*(1-t)}px)`}})},ct=1e-4,lt=new Set(["dip","push-left"]),Et=["opacity","transform","clipPath","filter"],Wt=Object.keys(st),Tt=/^\\\\s*(?:(h)(\\\\d+)|(end|start))?\\\\s*(?:([+-])?\\\\s*(\\\\d*\\\\.?\\\\d+)\\\\s*(b|beats?|s|secs?)?)?\\\\s*$/i;function ot(t,e,i,p){let o=String(t).match(Tt);if(!o||!o[1]&&!o[3]&&!o[5])throw new Error(`cannot read time "${t}" (use h3, h3+0.5, 2b, 1.5s or end-1)`);let h=e.t0;if(o[1]){let l=+o[2];if(!(l<e.hits.length))throw new Error(`"${t}": this scene has ${e.hits.length} hits (h0\\\\u2013h${e.hits.length-1})`);h=e.hits[l]}if(o[3]==="end"&&(h=e.t1),o[5]){let l=+o[5]*(o[4]==="-"?-1:1),w=(o[6]||"").toLowerCase();h+=l*(w.startsWith("b")?p:w.startsWith("s")?1:i)}return h}function tt(t,e,{doc:i=document,onScene:p=null,media:o="live",onMediaError:h=null}={}){let l=t,w=[],$=l.tempo,y=$?60/$.bpm:.5,M=y*($?$.beatsPerBar:4),k=$?y:1,L=i.createElement("style");L.setAttribute("data-fvs",""),L.textContent=St+`\\n`+(l.css||"")+`\\n`+l.scenes.filter(n=>n.css&&n.css.trim()).map(n=>`[data-scene="${n.id}"]{\\n${n.css}\\n}`).join(`\\n`),i.head.append(L);let S=i.createElement("div");S.className=`fvs-stage ${l.className||""}`.trim(),Object.assign(S.style,{width:`${l.width}px`,height:`${l.height}px`,background:l.background||"#000"}),S.innerHTML=l.stage.html||"";let q=S.querySelector("[data-fvs-scenes], fvs-scenes"),F=i.createElement("div");F.className="fvs-scenes",q?q.replaceWith(F):S.prepend(F),q=F,e.append(S);let N=et(S),d=[],r={},v=l.assets||{},O=n=>v[String(n).replace(/^\\\\.\\\\//,"")]||n,j=l.scenes,_=n=>n&&n.transition&&st[n.transition.type]&&n.transition.dur>0?n.transition:null,U=j.map((n,a)=>{let u=_(j[a+1]);return u?u.dur:0}),P=[],D=[];for(let[n,a]of j.entries()){let u=i.createElement("div");u.className=`fvs-scene scene ${a.cls||""}`.trim(),u.dataset.scene=a.id,u.innerHTML=a.html||"";let f=_(j[n+1]),T=u;(_(a)||f&&lt.has(f.type))&&(T=i.createElement("div"),T.className="fvs-transition",T.append(u),D.push(T)),P.push(T),q.append(T),N.S(T===u?u:[u,T],a.t0,a.t1+U[n]);let E=typeof a.t0v=="number"?a.t0v:a.t0;r[a.id]={id:a.id,title:a.title,t0:a.t0,t1:a.t1,dur:a.t1-a.t0,t0v:E,in:typeof a.in=="number"?a.in:a.t0-E,hits:a.hits,beats:a.beats,el:u,transition:_(a)},p&&p(r[a.id])}let Y=[];j.forEach((n,a)=>{let u=_(n);u&&a>0&&Y.push({t0:n.t0,d:u.dur,fx:st[u.type],a:lt.has(u.type)?P[a-1]:null,b:P[a]})}),Y.length&&N.H(n=>{let a=Y.find(f=>n>=f.t0&&n<f.t0+f.d),u=new Map;if(a){let f=a.fx(Z(n,a.t0,a.t0+a.d,"io"),l.width,l.height);f.a&&a.a&&u.set(a.a,f.a),f.b&&u.set(a.b,f.b)}for(let f of D){let T=u.get(f);for(let E of Et)f.style[E]=T&&T[E]!==void 0?String(T[E]):""}});function s(n,a){let u=x=>typeof x=="string"?[...a.querySelectorAll(x)]:x==null?[]:x instanceof Element?[x]:[...x],f=(x,A,z)=>N.K(u(x),A,z),T=(x,A,z)=>N.S(u(x),A,z),E=x=>n.t0+x*k,B=(x,A=0)=>x<n.hits.length?n.hits[x]+A*k:NaN,H=(x,A,z)=>f(x,[[A-.01,{o:0}],[A,{o:1},"step"]],z),C=(x,A,z={y:20},R)=>f(x,[[A-.01,{o:0,...z}],[A,{o:1},"step"],[A+.18,{x:0,y:0},"out"]],R),W=(x,A,z=y/2,R)=>f(x,[[A,{o:0}],[A+z,{o:1},"out"]],R),X=(x,A,z=n.t1+(n.tail||0))=>u(x).forEach((R,J)=>J<A.length&&N.S(R,A[J],A[J+1]??z));return{t0:n.t0,t1:n.t1,dur:n.t1-n.t0,hits:n.hits||[],beat:y,bar:M,unit:k,at:E,hit:B,root:a,stage:S,$:x=>a.querySelector(x),$$:x=>[...a.querySelectorAll(x)],K:f,S:T,H:x=>N.H(x),on:x=>N.H(x),type:(x,A,z,R)=>N.type(u(x),A,z,R),cut:H,slide:C,fade:W,seq:X,flash:(x,A=.85)=>d.push([x,A]),grain:(x=".grain")=>it({q:u,H:N.H},x),prog:Z,ease:V,clamp:G,lerp:rt,rng:Q,scenes:r,flashes:d,asset:O,project:{title:l.title,width:l.width,height:l.height,fps:l.fps,length:l.length,tempo:$},width:l.width,height:l.height,fps:l.fps,length:l.length,during:x=>x.map(A=>Array.isArray(A)?A:r[A]?[r[A].t0,r[A].t1]:[0,0]),inside:(x,A)=>A.some(([z,R])=>x>=z&&x<R)}}function c(n,a,u,f){if(!n||!n.trim())return;let T=Object.keys(a);try{new Function(...T,`${n}\\n//# sourceURL=fvs://${u}.js`)(...T.map(E=>a[E]))}catch(E){let B=String(E&&E.stack||"").match(new RegExp(`fvs://${u.replace(/[.*+?^${}()|[\\\\]\\\\\\\\]/g,"\\\\\\\\$&")}\\\\\\\\.js:(\\\\\\\\d+)`));w.push({scene:u.replace(/^scene\\\\//,""),message:String(E&&E.message||E),line:B&&f?f+ +B[1]-3:f||0})}}function m(n,a){let u=(f,T)=>{try{return ot(f,n,k,y)}catch(E){return w.push({scene:n.id,message:E.message,line:0,el:T.tagName}),NaN}};for(let f of n.el.querySelectorAll("[data-seq]")){let T=String(f.dataset.seq).match(/^\\\\s*h(\\\\d+)\\\\s*$/);if(!T){w.push({scene:n.id,message:`data-seq="${f.dataset.seq}" must name the first hit, e.g. data-seq="h0"`});continue}let E=[...f.children],B=+T[1],H=E.map((C,W)=>n.hits[B+W]).filter(C=>C!==void 0);H.length<E.length&&w.push({scene:n.id,message:`data-seq has ${E.length} items but only ${H.length} hits from h${B}`}),a.seq(E,H,f.dataset.seqEnd?u(f.dataset.seqEnd,f):n.t1+(n.tail||0))}for(let f of n.el.querySelectorAll("[data-in], [data-out]")){let T=f.dataset.each!==void 0?+f.dataset.each*k:null,E=T!==null?[...f.children]:[f],B=f.dataset.in!==void 0?u(f.dataset.in,f):null,H=f.dataset.out!==void 0?u(f.dataset.out,f):null,C=(f.dataset.fx||"cut").toLowerCase(),W=(f.dataset.fxOut||"cut").toLowerCase(),X=+f.dataset.dist||24,x=f.dataset.dur!==void 0?+f.dataset.dur*k:y/2;E.forEach((A,z)=>{let R=B===null?null:B+(T||0)*z,J=[];if(R!==null&&!isNaN(R))if(C==="type")N.type([A],R,+f.dataset.cps||30);else if(C==="fade")J.push([R,{o:0}],[R+x,{o:1},"out"]);else if(C==="pop")J.push([R-.01,{o:0,s:.92}],[R,{o:1},"step"],[R+.25,{s:1},"back"]);else if(/^(up|down|left|right)$/.test(C)){let dt={up:{y:X},down:{y:-X},left:{x:X},right:{x:-X}}[C];J.push([R-.01,{o:0,...dt}],[R,{o:1},"step"],[R+.18,{x:0,y:0},"out"])}else J.push([R-.01,{o:0}],[R,{o:1},"step"]);H!==null&&!isNaN(H)&&(W==="fade"?(J.length||J.push([n.t0,{o:1}]),J.push([H,{o:1}],[H+x,{o:0},"in"])):N.S([A],-1e9,H)),J.length&&N.K([A],J)})}}if(j.forEach((n,a)=>{let u=r[n.id],f={...u,t0:u.t0v,dur:u.t1-u.t0v,tail:U[a]},T=s(f,u.el);m(f,T),c(n.js,T,`scene/${n.id}`,n.line)}),c(l.stage.js,s({id:"stage",t0:0,t1:l.length,hits:[],el:S},S),"stage",l.stage.line),l.captions&&l.captions.length){let n=i.createElement("div"),a=l.captionStyle||{};n.className="fvs-captions",n.dataset.position=a.position==="top"?"top":"bottom",n.style.fontSize=`${Math.round(Math.min(l.width,l.height)*({small:.036,large:.056}[a.size]||.045))}px`,S.append(n);let u=/<\\\\/?[a-z][^>]*>/gi,f="";N.H(T=>{let E=T-ct,B=l.captions.filter(C=>E>=C.t0-1e-6&&E<C.t1-1e-6&&C.text),H=B.map(C=>`${C.t0}\\\\0${C.text}`).join("");H!==f&&(f=H,n.replaceChildren(...B.map(C=>{let W=i.createElement("div");return W.className="fvs-caption",W.textContent=C.text.replace(u,""),W})))})}let g=[...S.querySelectorAll("[data-fvs-flash]")];g.length&&(d.sort((n,a)=>n[0]-a[0]),N.H(n=>{let a=0;for(let[u,f]of d)n>=u&&n<u+.18&&(a=Math.max(a,f*(1-(n-u)/.18)**2));for(let u of g)u.style.opacity=a}));let b=at([...j.map((n,a)=>({id:n.id,el:r[n.id].el,from:n.t0,to:n.t1+U[a],base:r[n.id].t0v})),{id:"stage",el:{querySelectorAll:n=>[...S.querySelectorAll(n)].filter(a=>!q.contains(a))},from:-1/0,to:1/0,base:0}],{mode:o,assets:l.assets,errors:w,onError:h});return{root:S,errors:w,scenes:r,seek:n=>{let a=n+ct;return N.render(a),b?b.seek(a):void 0},payload:l,videos:b,length:l.length,width:l.width,height:l.height,fps:l.fps,transport:n=>{b&&b.transport(n)},ready:()=>b?b.ready():Promise.resolve(),destroy(){b&&b.destroy(),S.remove(),L.remove()}}}var At=t=>t.trim().replace(/^\\\\.\\\\//,"");var Lt=t=>({id:t.id,kind:"track",src:t.src,url:t.url??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!!t.mute,role:t.role}),jt=(t,e={})=>({id:t.id,kind:"video",scene:t.scene,src:t.src,url:t.url??e[At(t.src)]??t.src,at:+t.at||0,in:+t.in||0,dur:t.dur>0?+t.dur:null,gain:+t.gain||0,mute:!1,loop:!!t.loop});var ut=t=>t?[...(t.audio||[]).map(Lt),...(t.media||[]).map(e=>jt(e,t.assets))]:[];var Nt=`\\nhtml,body{margin:0;background:#0b0b0b;color:#e8e6e1;font:14px/1.5 system-ui,-apple-system,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif}\\n.fvs-app{max-width:1200px;margin:0 auto;padding:24px 16px 48px;display:grid;gap:14px}\\n.fvs-app h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.02em}\\n.fvs-frame{position:relative;width:100%;overflow:hidden;background:#000;border-radius:6px;box-shadow:0 0 0 1px #262626;cursor:pointer}\\n.fvs-frame .fvs-stage{position:absolute;left:0;top:0}\\n.fvs-bar{display:flex;gap:10px;align-items:center}\\n.fvs-bar button{font:600 14px inherit;font-family:inherit;color:#0b0b0b;background:#e8e6e1;border:0;border-radius:6px;height:36px;min-width:84px;cursor:pointer}\\n.fvs-bar button:focus-visible,.fvs-bar input:focus-visible,.fvs-chapters button:focus-visible{outline:2px solid #ff6a13;outline-offset:2px}\\n.fvs-bar input{flex:1;min-width:0;accent-color:#ff6a13}\\n.fvs-bar output{font:12px ui-monospace,monospace;color:#9a948d;font-variant-numeric:tabular-nums;min-width:12ch;text-align:right}\\n.fvs-chapters{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;padding:0;list-style:none;font-size:13px;color:#9a948d}\\n.fvs-chapters button{font:inherit;color:inherit;background:none;border:0;padding:2px 0;cursor:pointer}\\n.fvs-chapters button:hover,.fvs-chapters button.on{color:#e8e6e1}\\n.fvs-chapters b{font:600 12px ui-monospace,monospace;color:#ff6a13;margin-right:6px}\\n.fvs-err{font:12px ui-monospace,monospace;color:#ff8a65;white-space:pre-wrap;margin:0}\\n.fvs-credit{font-size:12px;color:#6f6a64;margin:0}\\n`,ft=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;function Mt(){let t=document.getElementById("fvs-data");return JSON.parse(t.textContent)}function Ot(t,e,i,p){let o=!1,h=0,l=0,w=()=>o?Math.min(i,h+(performance.now()-l)/1e3):h,$=y=>{let M=w();for(let k of e){let{el:L}=k,S=L.duration,q=k.loop&&S>0&&Number.isFinite(S),F=M-k.at+k.in;q&&(F=(F%S+S)%S);let N=k.dur!=null&&M>=k.at+k.dur;if(!o||M<k.at||N||F>(S||1/0)){L.paused||L.pause(),M<k.at&&L.currentTime!==k.in&&(L.currentTime=k.in);continue}let d=Math.abs(L.currentTime-F);(y||(q?Math.min(d,S-d):d)>.08)&&(L.currentTime=F),L.paused&&L.play().catch(()=>{})}};return{now:w,sync:$,get playing(){return o},play(){h>=i&&(h=0),o=!0,l=performance.now(),$(!0)},pause(){h=w(),o=!1,$()},seek(y){h=Math.max(0,Math.min(i,y)),l=performance.now(),$(!0)},tick(){o&&w()>=i?(h=i,o=!1,$(),p&&p()):o&&$()}}}function Ct(t,e,i){let p=()=>{t.root.style.transform=`scale(${e.clientWidth/i.width})`};new ResizeObserver(p).observe(e),p()}function Rt(t){let e=document.createElement("style");e.textContent=Nt,document.head.append(e);let i=document.createElement("main");i.className="fvs-app",i.innerHTML=`<h1></h1><div class="fvs-frame" role="img"></div>\\n    <div class="fvs-bar" role="group" aria-label="Playback"><button type="button" class="fvs-play">\\\\u25B6 \\\\u64AD\\\\u653E</button><input type="range" min="0" step="0.01" value="0" aria-label="\\\\u8FDB\\\\u5EA6"><output></output></div>\\n    <ol class="fvs-chapters" aria-label="\\\\u7AE0\\\\u8282"></ol><pre class="fvs-err" hidden></pre><p class="fvs-credit">Made with Forsion Video Studio</p>`,document.body.append(i),i.querySelector("h1").textContent=t.title||"";let p=i.querySelector(".fvs-frame");p.style.aspectRatio=`${t.width} / ${t.height}`,p.style.maxWidth=`calc((100vh - 200px) * ${t.width/t.height})`,p.style.margin="0 auto",p.setAttribute("aria-label",t.title||"video");let o=tt(t,p);Ct(o,p,t);let h=ut(t).filter(r=>!r.mute).map(r=>{let v=new Audio(r.url);return v.preload="auto",v.loop=!!r.loop,v.volume=Math.min(1,10**((r.gain||0)/20)),{el:v,at:r.at,in:r.in,dur:r.dur,loop:!!r.loop}}),l=i.querySelector(".fvs-play"),w=i.querySelector("input"),$=i.querySelector("output");w.max=t.length;let y=Ot(t,h,t.length),M=i.querySelector(".fvs-chapters");M.innerHTML=t.scenes.map(r=>`<li><button type="button" data-t="${r.t0}"><b>${r.t0.toFixed(1)}</b></button></li>`).join(""),[...M.querySelectorAll("button")].forEach((r,v)=>r.append(t.scenes[v].title||t.scenes[v].id));let k=[...M.querySelectorAll("button")];if(o.errors.length){let r=i.querySelector(".fvs-err");r.hidden=!1,r.textContent=o.errors.map(v=>`${v.scene}${v.line?`:${v.line}`:""} ${v.message}`).join(`\\n`)}let L=()=>y.playing?y.pause():y.play();l.addEventListener("click",L),p.addEventListener("click",L),w.addEventListener("input",()=>y.seek(+w.value)),k.forEach(r=>r.addEventListener("click",()=>{y.seek(+r.dataset.t),y.playing||y.play()})),document.addEventListener("keydown",r=>{r.target.closest&&r.target.closest("input,button,textarea")||(r.code==="Space"&&(r.preventDefault(),L()),r.code==="ArrowRight"&&y.seek(y.now()+2),r.code==="ArrowLeft"&&y.seek(y.now()-2))});let S=-1,q=null,F=t.scenes.length?Math.min(t.length,t.scenes[Math.min(1,t.scenes.length-1)].t0+.8):0,N=!1,d=()=>{y.tick();let r=N||y.playing?y.now():F;y.playing&&(N=!0),y.playing!==q&&(q=y.playing,o.transport(q)),r!==S&&(o.seek(r),S=r),w.value=r,$.textContent=`${ft(r)} / ${ft(t.length)}`,l.textContent=y.playing?"\\\\u275A\\\\u275A \\\\u6682\\\\u505C":"\\\\u25B6 \\\\u64AD\\\\u653E",k.forEach((v,O)=>v.classList.toggle("on",r>=t.scenes[O].t0&&r<t.scenes[O].t1)),requestAnimationFrame(d)};w.addEventListener("input",()=>{N=!0}),requestAnimationFrame(d),window.__fvs={stage:o,clock:y}}function qt(t){document.documentElement.style.background="#000",document.body.style.margin="0";let e=tt(t,document.body,{media:"capture"});e.root.style.transform="none",e.seek(0),window.__stage={w:t.width,h:t.height,dur:t.length,fps:t.fps,errors:e.errors,audio:t.audio,media:t.media||[],seek:i=>e.seek(i),ready:()=>document.fonts.ready.then(()=>Promise.all([...[...document.images].map(i=>i.complete?0:i.decode().catch(()=>0)),e.ready()]))}}var Ft=/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i;function _t(t){document.documentElement.style.cssText="background:#141414;height:100%;overflow:hidden",document.body.style.cssText="margin:0;height:100%;overflow:hidden;display:grid;place-items:center";let e=document.createElement("div");e.style.cssText=`position:relative;overflow:hidden;background:#000;aspect-ratio:${t.width}/${t.height};width:min(100vw, calc(100vh * ${t.width/t.height}))`,document.body.append(e);let i={},p=new WeakMap,o=new WeakMap,h=new WeakMap,l=d=>{let r=[],v=[...d.el.querySelectorAll("img")],O=document.createTreeWalker(d.el,NodeFilter.SHOW_TEXT);for(let j;j=O.nextNode();){if(!/\\\\S/.test(j.data)||j.parentElement&&Ft.test(j.parentElement.tagName))continue;p.set(j,r.length);let _=j.parentElement;o.has(_)||o.set(_,[]),o.get(_).push(r.length),r.push({node:j,el:_})}v.forEach((j,_)=>h.set(j,_)),i[d.id]={texts:r,imgs:v}},w=d=>parent.postMessage({fvs:d.type,...d,type:void 0},"*"),$=tt(t,e,{onScene:l,onMediaError:(d,r)=>w({type:"media-error",scene:d,src:r})}),y=()=>{$.root.style.transform=`scale(${e.clientWidth/t.width})`};new ResizeObserver(y).observe(e),y();let M=0;$.seek(0);let k=document.createElement("div");k.style.cssText="position:absolute;pointer-events:none;border:2px solid #ff6a13;border-radius:3px;box-shadow:0 0 0 9999px rgba(0,0,0,.18);display:none;z-index:10",e.append(k);let L=d=>({x:d.left,y:d.top,w:d.width,h:d.height}),S=d=>{if(!d){k.style.display="none";return}let r=e.getBoundingClientRect();Object.assign(k.style,{display:"",left:`${d.x-r.left-3}px`,top:`${d.y-r.top-3}px`,width:`${d.w+6}px`,height:`${d.h+6}px`})},q=d=>{let r=d&&d.closest&&d.closest("[data-scene]");return r?r.dataset.scene:null};function F(d,r){let v=document.elementFromPoint(d.clientX,d.clientY),O=q(v);if(!O||!i[O]){w({type:"pick",scene:null,dbl:r});return}if(v.tagName==="IMG"&&h.has(v)){w({type:"pick",scene:O,img:h.get(v),rect:L(v.getBoundingClientRect()),dbl:r});return}let j=null,_=document.caretRangeFromPoint&&document.caretRangeFromPoint(d.clientX,d.clientY);_&&_.startContainer.nodeType===3&&p.has(_.startContainer)&&(j=p.get(_.startContainer));for(let D=v;j===null&&D&&D!==e;D=D.parentElement)o.has(D)&&(j=o.get(D)[0]);if(j===null){w({type:"pick",scene:O,dbl:r});return}let U=i[O].texts[j],P=U.node.isConnected?(()=>{let D=document.createRange();return D.selectNodeContents(U.node),D.getBoundingClientRect()})():U.el.getBoundingClientRect();w({type:"pick",scene:O,text:j,rect:L(P.width?P:U.el.getBoundingClientRect()),dbl:r})}e.addEventListener("click",d=>F(d,!1)),e.addEventListener("dblclick",d=>{d.preventDefault(),F(d,!0)}),window.addEventListener("message",d=>{let r=d.data||{};if(r.fvs==="seek")M=r.t,$.seek(r.t);else if(r.fvs==="transport")$.transport(!!r.playing);else if(r.fvs==="outline"){let v=i[r.scene],O=v?r.img!=null?v.imgs[r.img]:r.text!=null&&v.texts[r.text]?v.texts[r.text].el:null:null;S(O&&O.isConnected&&O.getClientRects().length?L(O.getBoundingClientRect()):null)}});let N=d=>Object.fromEntries(Object.entries(i).map(([r,v])=>[r,v[d].length]));w({type:"ready",length:t.length,errors:$.errors,texts:N("texts"),imgs:N("imgs")}),window.__fvs={stage:$,seek:d=>$.seek(d)}}function It(t){let e=Mt(),i=typeof window<"u"&&window.FVS_MODE||t||new URLSearchParams(location.search).get("mode")||(new URLSearchParams(location.search).has("capture")?"capture":"player");i==="capture"?qt(e):i==="embed"?_t(e):Rt(e)}return yt(Ht);})();\\n\';\n\n// src/cli/render.js\nimport { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync, mkdtempSync, statSync } from "node:fs";\nimport { dirname, join, resolve } from "node:path";\nimport { tmpdir } from "node:os";\nimport { spawn, spawnSync } from "node:child_process";\nvar num2 = (x) => +(+x).toFixed(6);\nfunction audioGraph(segments, from, file) {\n  const args = [], parts = [];\n  segments.forEach((a, i) => {\n    if (a.loop) args.push("-stream_loop", "-1");\n    args.push("-i", file(a));\n    const trim = a.in > 0 || a.dur != null ? `atrim=start=${num2(a.in)}${a.dur != null ? `:duration=${num2(a.dur)}` : ""},asetpts=PTS-STARTPTS,` : "";\n    const shift = a.at - from;\n    parts.push(`[${i + 1}:a]${trim}${shift < 0 ? `atrim=start=${-shift},asetpts=PTS-STARTPTS,` : ""}${shift > 0 ? `adelay=${Math.round(shift * 1e3)}:all=1,` : ""}volume=${a.gain || 0}dB[a${i}]`);\n  });\n  const mix = segments.length > 1 ? `;${segments.map((_, i) => `[a${i}]`).join("")}amix=inputs=${segments.length}:normalize=0[aout]` : "";\n  return { args, filter: parts.join(";") + mix, out: segments.length > 1 ? "[aout]" : "[a0]" };\n}\nvar hasAudio = (ff, path) => /: Audio:/.test(spawnSync(ff, ["-hide_banner", "-i", path], { encoding: "utf8" }).stderr || "");\nfunction renderJob(file) {\n  if (!file) return { write() {\n  }, cancelled: () => false };\n  const path = resolve(file), cancel = path + ".cancel";\n  let value = JSON.parse(readFileSync(path, "utf8"));\n  return {\n    write(patch) {\n      value = { ...value, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };\n      const tmp = path + ".tmp";\n      writeFileSync(tmp, JSON.stringify(value, null, 2) + "\\n");\n      renameSync(tmp, path);\n    },\n    cancelled: () => existsSync(cancel)\n  };\n}\nasync function renderVideo(ctx, flags2, api) {\n  const job = renderJob(flags2.job);\n  let browser, frames, partial, cancelTimer;\n  const checkCancel = () => {\n    if (job.cancelled()) {\n      const e = new Error("Render cancelled");\n      e.cancelled = true;\n      throw e;\n    }\n  };\n  try {\n    checkCancel();\n    job.write({ status: "preparing", progress: 0, error: null });\n    const { p, dir } = ctx, fps = Number(flags2.fps || p.meta.fps), scale = Number(flags2.scale || 1), crf = Number(flags2.crf ?? 18);\n    const from = api.timeArg(p, flags2.from) ?? 0, to = Math.min(p.length, api.timeArg(p, flags2.to) ?? p.length);\n    if (!Number.isFinite(fps) || fps < 1 || fps > 120 || !Number.isFinite(scale) || scale <= 0 || scale > 4 || !Number.isFinite(crf) || crf < 0 || crf > 51 || from < 0 || !(to > from)) throw new Error("Invalid export range, frame rate, scale or quality");\n    const out = resolve(flags2.out || ctx.path.replace(/\\.fvs\\.md$/i, "") + ".mp4");\n    if (flags2.job && existsSync(out)) throw new Error("Output already exists; choose another file");\n    const ff = api.ffmpegBin();\n    browser = await api.chromium();\n    checkCancel();\n    frames = flags2["keep-frames"] ? resolve(flags2["keep-frames"]) : mkdtempSync(join(tmpdir(), "fvs-frames-"));\n    mkdirSync(frames, { recursive: true });\n    const workers = Math.max(1, Math.min(8, Number(flags2.workers) || 3));\n    const stages = [];\n    try {\n      for (let n = 0; n < workers; n++) {\n        checkCancel();\n        stages.push(await api.openStage(ctx, browser, { captions: !flags2["no-captions"] }));\n      }\n      if (api.runtimeErrors(stages[0].st, stages[0].logs) && !flags2.force) throw new Error("Scene scripts failed");\n      const f0 = Math.round(from * fps), f1 = Math.max(f0, Math.round(to * fps) - 1), total = f1 - f0 + 1;\n      let done = 0, lastPct = -1;\n      job.write({ status: "frames", progress: 0, totalFrames: total, completedFrames: 0 });\n      await Promise.all(stages.map(async ({ pg }, k) => {\n        for (let f = f0 + k; f <= f1; f += workers) {\n          checkCancel();\n          await pg.evaluate((t) => __stage.seek(t), f / fps);\n          await pg.screenshot({ path: join(frames, `${String(f - f0).padStart(6, "0")}.png`) });\n          const pct2 = Math.floor(++done / total * 80);\n          if (pct2 !== lastPct) {\n            lastPct = pct2;\n            job.write({ progress: pct2, completedFrames: done });\n            api.log(`frames ${done}/${total}`);\n          }\n        }\n      }));\n      checkCancel();\n      await browser.close();\n      browser = null;\n      const args = ["-y", "-loglevel", "error", "-progress", "pipe:1", "-framerate", String(fps), "-i", join(frames, "%06d.png")];\n      const segments = [];\n      for (const a of flags2["no-audio"] ? [] : audioSegments(p)) {\n        if (a.mute) continue;\n        if (a.kind === "video" && !isRelativeUrl(a.src)) {\n          api.log(`skipping the sound of ${a.src} (not a project file)`);\n          continue;\n        }\n        if (!existsSync(join(dir, a.src))) throw new Error(`${a.kind === "video" ? "Video" : "Audio"} file not found: ${a.src}`);\n        if (a.kind === "video" && !hasAudio(ff, join(dir, a.src))) continue;\n        segments.push(a);\n      }\n      if (segments.length) {\n        const g = audioGraph(segments, from, (a) => join(dir, a.src));\n        args.push(...g.args, "-filter_complex", g.filter, "-map", "0:v", "-map", g.out, "-c:a", "aac", "-b:a", flags2.abr || "256k");\n      }\n      args.push("-vf", `scale=trunc(iw*${scale}/2)*2:trunc(ih*${scale}/2)*2:flags=lanczos`, "-c:v", "libx264", "-preset", flags2.preset || "medium", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", String(total / fps));\n      mkdirSync(dirname(out), { recursive: true });\n      partial = out + `.partial-${process.pid}.mp4`;\n      args.push(partial);\n      job.write({ status: "encoding", progress: 80 });\n      await new Promise((ok, fail) => {\n        const child = spawn(ff, args, { stdio: ["ignore", "pipe", "pipe"] });\n        let errors = "", pending = "", killing = false;\n        const finish = (err) => {\n          clearInterval(cancelTimer);\n          cancelTimer = null;\n          err ? fail(err) : ok();\n        };\n        child.on("error", finish);\n        child.stderr.on("data", (b) => {\n          errors = (errors + b.toString()).slice(-4e3);\n        });\n        child.stdout.on("data", (b) => {\n          pending += b.toString();\n          const lines = pending.split("\\n");\n          pending = lines.pop();\n          for (const line of lines) if (line.startsWith("out_time_us=")) {\n            const sec = Number(line.slice(12)) / 1e6;\n            job.write({ progress: Math.min(99, 80 + Math.floor(sec / (total / fps) * 19)) });\n          }\n        });\n        cancelTimer = setInterval(() => {\n          if (job.cancelled() && !killing) {\n            killing = true;\n            child.kill("SIGKILL");\n          }\n        }, 150);\n        child.on("close", (code) => {\n          if (job.cancelled()) {\n            const e = new Error("Render cancelled");\n            e.cancelled = true;\n            finish(e);\n          } else finish(code === 0 ? null : new Error(`Encoding failed: ${errors || code}`));\n        });\n      });\n      checkCancel();\n      if (flags2.job && existsSync(out)) throw new Error("Output was created by another render");\n      renameSync(partial, out);\n      partial = null;\n      job.write({ status: "done", progress: 100, bytes: statSync(out).size, duration: total / fps, output: out });\n      api.log(out);\n    } finally {\n      for (const stage of stages) rmSync(stage.tmp, { recursive: true, force: true });\n    }\n  } catch (e) {\n    job.write({ status: e.cancelled ? "cancelled" : "failed", error: String(e.message || e) });\n    throw e;\n  } finally {\n    clearInterval(cancelTimer);\n    await browser?.close().catch(() => {\n    });\n    if (partial) rmSync(partial, { force: true });\n    if (frames && !flags2["keep-frames"]) rmSync(frames, { recursive: true, force: true });\n  }\n}\n\n// src/cli/fvs.js\nvar VERSION = "0.7.0";\nvar HELP = `fvs ${VERSION} \\u2014 Forsion Video Studio\n\n  fvs new <file.fvs.md> [--template eva|blank] [--title T]   start a project\n  fvs info <file>                      scenes, times, hits (read this before editing)\n  fvs check <file> [--runtime]         parse errors; --runtime also runs every scene script in a browser\n  fvs cues <file> [--out cues.json]    the cue sheet a score is written against (JSON)\n  fvs captions <file> [--out f.srt]    the captions track as a SubRip file\n  fvs html <file> [--out f.html] [--inline]   standalone web video (player page)\n  fvs still <file> --at <t|scene[:hit]> [--out f.png] [--scale 0.5]   one frame as PNG\n  fvs sheet <file> [--scenes | --every <sec>] [--out sheet.png]       contact sheet of frames\n  fvs render <file> [--out f.mp4] [--from s] [--to s] [--scale 0.5] [--workers 3] [--crf 18]\n                    [--keep-frames dir] [--no-audio] [--no-captions] MP4 with the project\'s audio and captions\n  fvs render-job <job.json>            export with real progress and a .cancel marker\n  fvs sync <file> [--audio a.mp3]      do the hits land on accents of the score?\n\n  Times: 12.5 (seconds), scene id (its start), scene:3 (its hit 3).\n  Browser: playwright-core (npm i -g playwright-core) + Chrome/Edge, or FVS_CHROMIUM=/path/to/chrome.\n  ffmpeg: on PATH, or FFMPEG=/path/to/ffmpeg.`;\nvar argv = process.argv.slice(2);\nvar cmd = argv.shift();\nvar flags = {};\nvar pos = [];\nfor (let i = 0; i < argv.length; i++) {\n  const a = argv[i];\n  if (a.startsWith("--")) {\n    const [k, v] = a.slice(2).split("=");\n    if (v !== void 0) flags[k] = v;\n    else if (argv[i + 1] !== void 0 && !argv[i + 1].startsWith("--")) flags[k] = argv[++i];\n    else flags[k] = true;\n  } else pos.push(a);\n}\nvar die = (msg, code = 1) => {\n  const error = new Error(msg);\n  error.exitCode = code;\n  throw error;\n};\nvar log = (...a) => console.log(...a);\nfunction load(file) {\n  if (!file) die("which project? (fvs <command> <file.fvs.md>)");\n  const path = resolve2(file);\n  if (!existsSync2(path)) die(`no such file: ${path}`);\n  const text = readFileSync2(path, "utf8");\n  return { path, dir: dirname2(path), text, p: parseProject(text) };\n}\nfunction report(p, { fail = true } = {}) {\n  const errs = p.errors.filter((e) => e.level === "error"), warns = p.errors.filter((e) => e.level !== "error");\n  for (const e of [...errs, ...warns]) console.error(`${e.level === "error" ? "error" : "warn "} line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);\n  if (errs.length && fail && !flags.force) die(`${errs.length} error(s); fix them or pass --force`);\n}\nvar fileUrl = (dir, rel) => pathToFileURL(join2(dir, rel)).href;\nfunction timeArg(p, v) {\n  if (v === void 0 || v === true) return null;\n  if (/^-?\\d+(\\.\\d+)?$/.test(String(v))) return +v;\n  const [id, h] = String(v).split(":");\n  const s = sceneById(p, id);\n  if (!s) die(`no scene "${id}" (scenes: ${p.scenes.map((x) => x.id).join(", ")})`);\n  if (h === void 0) return s.t0;\n  if (!(+h < s.hitTimes.length)) die(`scene "${id}" has ${s.hitTimes.length} hits`);\n  return s.hitTimes[+h];\n}\nasync function chromium() {\n  const req = createRequire(join2(process.cwd(), "x.js"));\n  const tries = ["playwright-core", "playwright"];\n  let pw = null;\n  for (const m of tries) {\n    for (const load2 of [() => import(m), () => req(m), () => createRequire(import.meta.url)(m), () => globalRequire(m)]) {\n      try {\n        pw = await load2();\n        if (pw && (pw.chromium || pw.default && pw.default.chromium)) break;\n        pw = null;\n      } catch {\n      }\n    }\n    if (pw) break;\n  }\n  if (!pw) die("This command needs a browser driver. Install one:  npm i -g playwright-core   (or run inside a folder with playwright installed)");\n  const { chromium: C } = pw.chromium ? pw : pw.default;\n  const exe = process.env.FVS_CHROMIUM || flags.browser;\n  const attempts = [];\n  if (exe) attempts.push({ executablePath: exe });\n  attempts.push({}, { channel: "chrome" }, { channel: "msedge" }, { channel: "chromium" });\n  for (const p of knownBrowsers()) attempts.push({ executablePath: p });\n  let lastErr;\n  for (const opt of attempts) {\n    try {\n      return await C.launch({ ...opt, args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--hide-scrollbars"] });\n    } catch (e) {\n      lastErr = e;\n    }\n  }\n  die(`Could not start a Chromium-based browser (${String(lastErr && lastErr.message || lastErr).split("\\n")[0]}).\nInstall Google Chrome or Microsoft Edge, or run: npx playwright install chromium, or set FVS_CHROMIUM=/path/to/chrome`);\n}\nfunction globalRequire(m) {\n  const root = spawnSync2(platform() === "win32" ? "npm.cmd" : "npm", ["root", "-g"], { encoding: "utf8", shell: platform() === "win32" }).stdout.trim();\n  return createRequire(join2(root, "x.js"))(m);\n}\nfunction knownBrowsers() {\n  const P = platform(), h = homedir();\n  const list2 = P === "darwin" ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Chromium.app/Contents/MacOS/Chromium", `${h}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`] : P === "win32" ? [`${process.env["PROGRAMFILES"] || "C:\\\\Program Files"}\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"] || "C:\\\\Program Files (x86)"}\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe`, `${process.env.LOCALAPPDATA || ""}\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe`] : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/opt/pw-browsers/chromium/chrome-linux/chrome", "/snap/bin/chromium"];\n  return list2.filter((p) => {\n    try {\n      return existsSync2(p);\n    } catch {\n      return false;\n    }\n  });\n}\nfunction ffmpegBin() {\n  const cands = [flags.ffmpeg, process.env.FFMPEG, "ffmpeg"].filter(Boolean);\n  for (const c of cands) if (spawnSync2(c, ["-version"], { stdio: "ignore" }).status === 0) return c;\n  for (const py of ["python3", "python"]) {\n    const r = spawnSync2(py, ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"], { encoding: "utf8" });\n    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();\n  }\n  die("ffmpeg not found. Install it (macOS: brew install ffmpeg \\xB7 Windows: winget install ffmpeg \\xB7 Linux: apt install ffmpeg) or set FFMPEG=/path/to/ffmpeg");\n}\nasync function openStage(ctx, browser, { scale = 1, captions = true } = {}) {\n  const tmp = mkdtempSync2(join2(tmpdir2(), "fvs-"));\n  const payload = compile(ctx.p, { resolve: (rel) => fileUrl(ctx.dir, rel) });\n  if (!captions) payload.captions = [];\n  const html = buildHtml(payload, runtime_src_default, { mode: "capture" });\n  const page = join2(tmp, "capture.html");\n  writeFileSync2(page, html);\n  const pg = await browser.newPage({ viewport: { width: payload.width, height: payload.height }, deviceScaleFactor: scale });\n  const logs = [];\n  pg.on("pageerror", (e) => logs.push(String(e.message || e)));\n  if (flags["no-remote-fonts"]) await pg.route(/fonts\\.(googleapis|gstatic)\\.com/, (r) => r.abort());\n  await pg.route(/\\.(mp3|wav|m4a|ogg|aac|flac)(\\?|$)/i, (r) => r.abort());\n  await pg.goto(pathToFileURL(page).href);\n  const st = await pg.evaluate(async () => {\n    await Promise.race([window.__stage.ready(), new Promise((r) => setTimeout(r, 15e3))]);\n    return { w: __stage.w, h: __stage.h, dur: __stage.dur, fps: __stage.fps, errors: __stage.errors };\n  });\n  return { pg, st, tmp, payload, logs };\n}\nfunction runtimeErrors(st, logs) {\n  for (const e of st.errors) console.error(`error line ${e.line || "?"} [${e.scene}]: ${e.message}`);\n  for (const l of logs) console.error(`page error: ${l}`);\n  return st.errors.length + logs.length;\n}\nfunction missingMedia({ p, dir }) {\n  const out = [];\n  const gone = (rel) => isRelativeUrl(rel) && !existsSync2(join2(dir, rel.trim()));\n  for (const a of audioTracks(p.meta)) if (gone(a.src)) out.push({ level: "error", line: p.metaTok >= 0 ? p.toks[p.metaTok].line : 1, message: `audio file not found: ${a.src}` });\n  const inHtml = (html, line, scene) => {\n    for (const t of scan(html).tags) {\n      const refs = t.name === "video" ? [t.attr("src"), t.attr("poster")] : t.name === "source" ? [t.attr("src")] : [];\n      for (const r of refs) if (r && gone(r)) out.push({ level: "error", line, scene, message: `${t.name === "video" && r === t.attr("poster") ? "poster image" : "video file"} not found: ${r}` });\n    }\n  };\n  if (p.stageHtml >= 0) inHtml(stageHtml(p), p.toks[p.stageHtml].line, void 0);\n  for (const s of p.scenes) inHtml(s.html, s.htmlTok >= 0 ? p.toks[s.htmlTok].line : s.line, s.id);\n  return out;\n}\nvar commands = {\n  async new() {\n    const file = pos[0] || die("fvs new <file.fvs.md>");\n    const path = resolve2(file.endsWith(".fvs.md") ? file : `${file}.fvs.md`);\n    if (existsSync2(path) && !flags.force) die(`${path} exists (pass --force to overwrite)`);\n    const tpl = TEMPLATES[flags.template || "eva"] || die(`templates: ${Object.keys(TEMPLATES).join(", ")}`);\n    mkdirSync2(dirname2(path), { recursive: true });\n    writeFileSync2(path, tpl({ title: flags.title || basename(path, ".fvs.md"), zh: flags.lang !== "en" }));\n    log(path);\n  },\n  async info() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const tp = p.tempo;\n    const sec = (x) => `${+x.toFixed(3)} s`;\n    log(`${p.meta.title || "(untitled)"} \\xB7 ${p.meta.width}\\xD7${p.meta.height} @ ${p.meta.fps} fps \\xB7 ${p.length.toFixed(2)} s${tp ? ` \\xB7 ${tp.bpm} BPM ${tp.beatsPerBar}/4 (beat ${tp.beat.toFixed(3)} s, bar ${tp.bar.toFixed(3)} s)` : ""}`);\n    for (const a of audioTracks(p.meta)) log(`audio ${a.role}: ${a.src}${a.at ? ` at ${a.at}s` : ""}${a.gain ? ` ${a.gain} dB` : ""}${a.in ? ` from ${sec(a.in)} into the file` : ""}${a.dur != null ? ` for ${sec(a.dur)}` : ""}${a.mute ? " (muted)" : ""}`);\n    log("");\n    log(`${"#".padStart(3)}  ${"id".padEnd(14)} ${"start".padStart(7)} ${"end".padStart(7)}  ${"length".padEnd(10)} hits (${tp ? "beats" : "s"} from scene start \\u2192 absolute s)`);\n    if (p.scenes.some((s) => s.in)) log(`     with "in", hits count from the content start (start \\u2212 in); (h\\u2192t) = trimmed away, not on screen`);\n    for (const s of p.scenes) {\n      const shown = new Set(visibleHits(s).map((h) => h.index));\n      const hits = s.hits.map((h, i) => shown.has(i) ? `${h}\\u2192${s.hitTimes[i].toFixed(2)}` : `(${h}\\u2192${s.hitTimes[i].toFixed(2)})`).join("  ");\n      log(`${String(s.index + 1).padStart(3)}  ${s.id.padEnd(14)} ${s.t0.toFixed(2).padStart(7)} ${s.t1.toFixed(2).padStart(7)}  ${String(s.meta.length ?? "?").padEnd(10)} ${hits}${s.title ? `   # ${s.title}` : ""}`);\n      const extra = [];\n      if (s.in) extra.push(`in ${s.meta.in} (${sec(s.in)}; content starts at ${s.t0v.toFixed(2)})`);\n      if (s.transition) extra.push(`transition ${s.transition.type} ${sec(s.transition.dur)} (with ${p.scenes[s.index - 1].id} on screen underneath)`);\n      if (extra.length) log(`${" ".repeat(5)}${extra.join(" \\xB7 ")}`);\n      for (const v of videos(s.html)) log(`${" ".repeat(5)}video ${v.src || "(no src)"}${v.clipIn ? ` \\xB7 from ${sec(v.clipIn)} into the file` : ""}${v.gain ? ` \\xB7 ${v.gain} dB` : ""}${v.muted ? " \\xB7 muted" : ""}${v.loop ? " \\xB7 loop" : ""}`);\n    }\n    if (p.captions.length) log(`\ncaptions: ${p.captions.length} cues, ${Math.min(...p.captions.map((c) => c.start)).toFixed(2)}\\u2013${Math.max(...p.captions.map((c) => c.end)).toFixed(2)} s on project time (scene edits do not move them; fvs captions lists them)`);\n  },\n  async check() {\n    const ctx = load(pos[0]);\n    report(ctx.p, { fail: false });\n    let n = ctx.p.errors.filter((e) => e.level === "error").length;\n    for (const e of missingMedia(ctx)) {\n      console.error(`error line ${e.line}${e.scene ? ` [${e.scene}]` : ""}: ${e.message}`);\n      n++;\n    }\n    if (flags.runtime) {\n      const browser = await chromium();\n      const { pg, st, logs } = await openStage(ctx, browser);\n      const withVideo = ctx.p.scenes.filter((s) => videos(s.html).length);\n      for (const s of withVideo) await pg.evaluate((x) => __stage.seek(x), s.t0);\n      if (withVideo.length) st.errors = await pg.evaluate(() => __stage.errors);\n      n += runtimeErrors(st, logs);\n      await browser.close();\n    }\n    if (n) die(`${n} error(s)`);\n    log(`ok \\xB7 ${ctx.p.scenes.length} scenes \\xB7 ${ctx.p.length.toFixed(2)} s${flags.runtime ? " \\xB7 scripts ran clean" : ""}`);\n  },\n  async cues() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const out = JSON.stringify(cueSheet(p), null, 2);\n    if (flags.out) {\n      writeFileSync2(resolve2(flags.out), out + "\\n");\n      log(resolve2(flags.out));\n    } else log(out);\n  },\n  async captions() {\n    const { p } = load(pos[0]);\n    report(p, { fail: false });\n    const bad = p.errors.filter((e) => e.captions && e.level === "error").length;\n    if (bad && !flags.force) die(`${bad} caption error(s) above; the SRT would leave those cues out (fix them or pass --force)`);\n    const out = formatSrt(p.captions);\n    if (flags.out) {\n      writeFileSync2(resolve2(flags.out), out ? out + "\\n" : "");\n      log(resolve2(flags.out));\n    } else if (out) log(out);\n  },\n  async html() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const out = resolve2(flags.out || ctx.path.replace(/\\.fvs\\.md$/i, "") + ".html");\n    const outDir = dirname2(out);\n    const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4", ".ogg": "audio/ogg", ".mp4": "video/mp4", ".m4v": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };\n    const resolveUrl = (rel) => {\n      const abs = join2(ctx.dir, rel);\n      if (flags.inline && existsSync2(abs)) return `data:${mime[extname(abs).toLowerCase()] || "application/octet-stream"};base64,${readFileSync2(abs).toString("base64")}`;\n      return relative(outDir, abs).split(sep).join("/");\n    };\n    const payload = compile(ctx.p, { resolve: resolveUrl });\n    writeFileSync2(out, buildHtml(payload, runtime_src_default, { mode: "player" }));\n    log(`${out} (${(statSync2(out).size / 1024).toFixed(0)} KB)`);\n  },\n  async still() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const t = timeArg(ctx.p, flags.at) ?? 0;\n    const browser = await chromium();\n    const { pg, st, logs } = await openStage(ctx, browser, { scale: +flags.scale || 1 });\n    runtimeErrors(st, logs);\n    await pg.evaluate((x) => __stage.seek(x), t);\n    const out = resolve2(flags.out || `${ctx.path.replace(/\\.fvs\\.md$/i, "")}-${t.toFixed(2)}s.png`);\n    await pg.screenshot({ path: out });\n    await browser.close();\n    log(out);\n  },\n  async sheet() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    const p = ctx.p;\n    let times;\n    if (flags.every) {\n      const d = +flags.every;\n      times = [];\n      for (let t = 0; t < p.length; t += d) times.push(t);\n    } else times = p.scenes.map((s) => {\n      const vis = visibleHits(s);\n      return Math.max(s.t0, Math.min(s.t1 - Math.min(0.05, s.dur / 2), (vis.length ? vis[vis.length - 1].t : s.t0) + 0.5));\n    });\n    const labels = flags.every ? times.map((t) => `${t.toFixed(1)}s`) : p.scenes.map((s) => `${s.id} \\xB7 ${s.t0.toFixed(1)}s`);\n    const browser = await chromium();\n    const scale = 320 / p.meta.width;\n    const { pg, st, logs } = await openStage(ctx, browser, { scale });\n    runtimeErrors(st, logs);\n    const shots = [];\n    for (const t of times) {\n      await pg.evaluate((x) => __stage.seek(x), t);\n      shots.push((await pg.screenshot({ type: "jpeg", quality: 80 })).toString("base64"));\n    }\n    const cols = Math.min(6, Math.ceil(Math.sqrt(shots.length * 1.4)));\n    const sheet = await browser.newPage({ viewport: { width: cols * 332 + 12, height: 400 } });\n    await sheet.setContent(`<body style="margin:0;background:#111;color:#bbb;font:12px sans-serif"><div style="display:grid;grid-template-columns:repeat(${cols},320px);gap:12px;padding:12px">${shots.map((b, i) => `<figure style="margin:0"><img style="display:block;width:320px" src="data:image/jpeg;base64,${b}"><figcaption style="padding-top:4px">${labels[i]}</figcaption></figure>`).join("")}</div></body>`);\n    const out = resolve2(flags.out || `${ctx.path.replace(/\\.fvs\\.md$/i, "")}-sheet.png`);\n    await sheet.screenshot({ path: out, fullPage: true });\n    await browser.close();\n    log(out);\n  },\n  async render() {\n    const ctx = load(pos[0]);\n    report(ctx.p);\n    return renderVideo(ctx, flags, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });\n  },\n  async "render-job"() {\n    const jobPath = resolve2(pos[0] || die("render-job requires a job JSON file"));\n    const job = renderJob(jobPath);\n    try {\n      const spec = JSON.parse(readFileSync2(jobPath, "utf8"));\n      if (spec.v !== 1 || !spec.project || !spec.out || !spec.options) die("Invalid render job");\n      if (["done", "failed", "cancelled"].includes(spec.status)) {\n        log(`Job already ${spec.status}`);\n        return;\n      }\n      const ctx = load(spec.project);\n      if (spec.sourceSnapshot) {\n        ctx.text = readFileSync2(spec.sourceSnapshot, "utf8");\n        ctx.p = parseProject(ctx.text);\n      }\n      report(ctx.p);\n      return await renderVideo(ctx, { ...spec.options, out: spec.out, job: jobPath }, { timeArg, ffmpegBin, chromium, openStage, runtimeErrors, log });\n    } catch (e) {\n      job.write({ status: job.cancelled() ? "cancelled" : "failed", error: String(e.message || e) });\n      throw e;\n    }\n  },\n  async sync() {\n    const { p, dir } = load(pos[0]);\n    report(p, { fail: false });\n    const tracks = audioTracks(p.meta), track2 = tracks.find((a) => !a.mute) || tracks[0];\n    const src = flags.audio ? resolve2(flags.audio) : track2 && join2(dir, track2.src);\n    if (!src || !existsSync2(src)) die(`no audio to check against (add one to the project\'s "audio" or pass --audio)`);\n    const at = flags.audio ? 0 : track2.at || 0;\n    const ff = ffmpegBin();\n    const r = spawnSync2(ff, ["-v", "error", "-i", src, "-ac", "1", "-ar", String(ONSET_SR), "-f", "f32le", "-"], { maxBuffer: 1 << 30 });\n    if (r.status !== 0) die(`ffmpeg could not decode ${src}`);\n    const buf = r.stdout;\n    let pcm = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 4));\n    if (!flags.audio && (track2.in > 0 || track2.dur != null)) {\n      const a = Math.min(pcm.length, Math.round(track2.in * ONSET_SR));\n      pcm = pcm.subarray(a, track2.dur != null ? Math.min(pcm.length, a + Math.round(track2.dur * ONSET_SR)) : pcm.length);\n    }\n    const lead = new Float32Array(Math.round(at * ONSET_SR));\n    const mono = at > 0 ? Float32Array.from([...lead, ...pcm]) : pcm;\n    const rows = syncReport(p.scenes, onsetEnvelope(mono, ONSET_SR));\n    let bad = 0;\n    for (const x of rows) {\n      const flag = x.ok ? x.quiet ? "cut to quiet" : "" : "<< weak accent";\n      if (!x.ok) bad++;\n      if (!x.ok || flags.all) log(`${x.t.toFixed(2).padStart(7)}s  ${x.scene}:h${x.hit}  accent ${x.strength.toFixed(2)}  ${x.offset == null ? "" : `${x.offset >= 0 ? "+" : ""}${Math.round(x.offset * 1e3)} ms`}  ${flag}`);\n    }\n    log(`${rows.length} hits, ${rows.length - bad} land on an accent${bad ? `, ${bad} do not (listed above)` : ""}`);\n  }\n};\nif (!cmd || cmd === "help" || flags.help || !commands[cmd]) {\n  log(HELP);\n  process.exit(cmd && !commands[cmd] && cmd !== "help" ? 1 : 0);\n}\ncommands[cmd]().catch((e) => {\n  console.error(e && e.stack || String(e));\n  process.exitCode = e.exitCode || 1;\n});\n';

  // src/generated/music-src.js
  var music_src_default = { "README.md": '# Video Studio music toolkit\n\nScores for Forsion Video Studio projects, written in Python against the project\'s cue sheet: every\naccent goes on a time the picture cuts on. Offline and deterministic; the result is a WAV (and an MP3\nwhen ffmpeg is around) that you add to the project\'s `audio` list.\n\n## Setup (once)\n\n```sh\npip install -r requirements.txt          # numpy scipy soundfile pedalboard\npython3 fetch_samples.py                  # VSCO 2 CE orchestra samples (CC0) into ~/vsco, needs git\n```\n\n`VSCO=/path` points the sampler at samples elsewhere; `FVS_CACHE` is where it keeps its analysis cache\n(default `~/.cache/fvs/vsco`). The first run builds the cache and takes a minute or two.\n\n## Files\n\n| file | what it is |\n|---|---|\n| `cues.py` | `Cues.load(project)`: tempo, scene starts and ends, each scene\'s hits in seconds; `write_audio()` |\n| `engine.py` | the mixer (`mix`: layers, gates, dynamic curve, reverb bus, master) and sound design (`boom`, `beep`, `riser`, `alarm`\u2026) |\n| `sampler.py` | `SampleTrack`: note/chord/ramp on recorded orchestra samples, with attack compensation so stabs land on the beat |\n| `battle.py` | one style, \u51B3\u6218 II (a battle march): `band()`, `groove()`, `melody()`, `hit()`, `knock()`, `pad()`, `roll()`, `final()`, `set_tempo()` |\n| `score_template.py` | a first score for any project with a tempo: groove throughout, a stab on every hit, a final chord |\n| `score_episode_212.py` | the real score of the 2.12 example: how a finished score treats each scene |\n| `fetch_samples.py` | downloads the samples |\n\n## Workflow\n\n1. `node ../fvs.mjs info <project>` \u2014 the scenes, their bars and hits.\n2. Copy `score_template.py` next to the project (or start from `score_episode_212.py`) and write the score:\n   one section per scene, reading `C.t0(id)`, `C.t1(id)` and `C.hits(id)`. Big cuts get `hit(..., cym=True)`,\n   cuts inside a phrase get `knock()`, and a hit that falls inside running music gets a sixteenth of\n   breath before it (`master_gates=[(t - BEAT / 4, t, -8, ())]`) so it reads as a cut.\n3. `python3 score.py <project> --out <project dir>/audio/score.mp3`, then add it to the project settings:\n   `"audio": [{ "src": "audio/score.mp3", "role": "score" }]`.\n4. `node ../fvs.mjs sync <project>` \u2014 every hit should land on an accent (or on a drop to quiet).\n   Fix misses in the score, or move a picture-only hit onto the accent.\n\nKeep melodies original. A reference track can guide tempo, key, groove and balance; never its notes.\n', "battle.py": "\"\"\"\u51B3\u6218 II \u2014 a battle march in the manner of an anime-orchestral 'decisive battle' cue, on recorded samples.\n\nStyle targets measured from the user's reference (not its notes): ~150 BPM in 4/4, E minor with\ndorian/phrygian colour, straight-eighth snare accented on beat 2 and the 'and' of 4, low end hitting\n1 \xB7 2 \xB7 2& \xB7 3& \xB7 4&, and a dark, low-heavy balance (most energy at 80\u2013250 Hz).\nAll melodies and harmony here are original.\n\nBuilding blocks for scoring a picture: band() (the sampled orchestra), groove() (one bar of the march),\nmelody(), hit() (a full-orchestra stab), knock() (a lighter stab), pad(), roll(), final(), master_chain().\nbattle_full() is the piece on its own, without a picture.\n\"\"\"\nimport numpy as np\nfrom pedalboard import Reverb, LowShelfFilter, HighShelfFilter, PeakFilter, Compressor, Limiter\nfrom engine import Audio, mix, n, ns, SR\nfrom sampler import SampleTrack, orchestra\n\nBPM = 150\nBEAT = 60 / BPM\n\n\ndef set_tempo(bpm):\n    \"\"\"The march is written at 150 BPM; score another tempo by setting it first (every helper reads BEAT).\"\"\"\n    global BPM, BEAT\n    BPM, BEAT = bpm, 60 / bpm\nLOW_HITS = [0, 1, 1.5, 2.5, 3.5]           # beats where bass drum / timpani / low brass land\nSNARE = [(0, .8), (.5, .45), (1, 1.0), (1.5, .45), (2, .7), (2.5, .45), (3, .55), (3.25, .5), (3.5, .95)]\n\n# Theme A (horns + trombones, later tutti): i \u2013 VI \u2013 IV(dorian) \u2013 i | i \u2013 \u266DII \u2013 V \u2013 i\nTHEME_A = [\n    ('Em', [(0, 1.5, 'E4'), (1.5, .5, 'F#4'), (2, 1, 'G4'), (3, 1, 'B4')]),\n    ('C', [(0, 1.5, 'C5'), (1.5, .5, 'B4'), (2, 1, 'G4'), (3, 1, 'E4')]),\n    ('A', [(0, 1.5, 'C#5'), (1.5, .5, 'D5'), (2, 1, 'E5'), (3, 1, 'A4')]),\n    ('Em', [(0, 2.5, 'B4'), (3, 1 / 3, 'G4'), (3 + 1 / 3, 1 / 3, 'A4'), (3 + 2 / 3, 1 / 3, 'B4')]),\n    ('Em', [(0, 1.5, 'E5'), (1.5, .5, 'D5'), (2, 1, 'B4'), (3, 1, 'G4')]),\n    ('F', [(0, 1.5, 'A4'), (1.5, .5, 'C5'), (2, 1, 'F5'), (3, 1, 'E5')]),\n    ('B', [(0, 1.5, 'D#5'), (1.5, .5, 'C#5'), (2, 1, 'B4'), (3, 1, 'F#4')]),\n    ('Em', [(0, 3, 'E4')]),\n]\n# Theme B (trumpets, fanfare with triplet turns): III \u2013 \u266DVII \u2013 VI \u2013 V\nTHEME_B = [\n    ('G', [(0, .5, 'D5'), (.5, .25, 'D5'), (.75, .25, 'D5'), (1, 1, 'G5'), (2, 1 / 3, 'F#5'), (2 + 1 / 3, 1 / 3, 'G5'), (2 + 2 / 3, 1 / 3, 'A5'), (3, 1, 'B5')]),\n    ('D', [(0, 1.5, 'A5'), (1.5, .5, 'F#5'), (2, 1, 'D5'), (3, 1, 'A4')]),\n    ('C', [(0, .5, 'G5'), (.5, .25, 'G5'), (.75, .25, 'G5'), (1, 1, 'C6'), (2, 1 / 3, 'B5'), (2 + 1 / 3, 1 / 3, 'A5'), (2 + 2 / 3, 1 / 3, 'G5'), (3, 1, 'E5')]),\n    ('B', [(0, 2, 'F#5'), (2, 1, 'D#5'), (3, 1, 'B4')]),\n]\nCHORDS = {  # root (bass octave), triad pitch classes as intervals, brass voicing\n    'Em': ('E1', [0, 3, 7], 'E3 G3 B3 E4'), 'C': ('C2', [0, 4, 7], 'E3 G3 C4 E4'), 'A': ('A1', [0, 4, 7], 'E3 A3 C#4 E4'),\n    'F': ('F1', [0, 4, 7], 'F3 A3 C4 F4'), 'B': ('B1', [0, 4, 7], 'D#3 F#3 B3 D#4'), 'G': ('G1', [0, 4, 7], 'D3 G3 B3 D4'),\n    'D': ('D2', [0, 4, 7], 'D3 F#3 A3 D4'), 'E': ('E1', [0, 4, 7], 'E3 G#3 B3 E4'),\n}\n\n\ndef band():\n    o = orchestra()\n    T = lambda name, sus, short=None, **k: SampleTrack(name, o[sus], short=o[short] if short else None, **k)\n    P = lambda name, bank, natural=True, **k: SampleTrack(name, o[bank], pitched_=False, natural=natural, **k)\n    return dict(\n        tpt=T('trumpets', 'tpt_sus', 'tpt_stac', gain=0.9, pan=0.25, send=0.26),\n        hn=T('horns', 'hn_sus', 'hn_stac', gain=1.1, pan=-0.3, send=0.32),\n        tbn=T('trombones', 'tbn_sus', 'tbn_stac', gain=0.8, pan=0.12, send=0.26),\n        tuba=T('tuba', 'tuba_sus', 'tuba_stac', gain=0.9, pan=0.05, send=0.2),\n        vln=T('violins', 'vln_sus', 'vln_spic', gain=0.5, pan=-0.45, send=0.24),\n        trem=T('violins-trem', 'vln_trem', gain=0.7, pan=-0.35, send=0.3),\n        vla=T('violas', 'vla_sus', 'vla_spic', gain=0.7, pan=0.3, send=0.22),\n        vc=T('celli', 'vc_sus', 'vc_spic', gain=1.0, pan=0.2, send=0.18),\n        cb=T('basses', 'cb_sus', 'cb_spic', gain=1.0, pan=0.35, send=0.16),\n        timp=SampleTrack('timpani', o['timp'], natural=True, gain=1.1, send=0.22),\n        snare=P('snare', 'snare', gain=0.55, pan=-0.05, send=0.16),\n        bd=P('bass-drum', 'bd', gain=1.0, send=0.2),\n        cym=P('cymbals', 'cym', natural=False, gain=1.3, pan=0.15, send=0.22),\n        cymroll=P('cym-roll', 'cymroll', gain=0.6, send=0.25),\n        gong=P('gong', 'gong', natural=False, gain=0.9, send=0.3),\n        sfx=Audio('sfx', gain=0.6, send=0.1),\n    )\n\n\ndef _tones(chord, octave_base):\n    root, iv, _ = CHORDS[chord]\n    r = n(root) + octave_base\n    return r, [r + i for i in iv]\n\n\ndef groove(b, t0, chord, vel=100, strings=True, drums=True, low_brass=True):\n    \"\"\"One bar of the battle groove starting at t0.\"\"\"\n    root, iv, _ = CHORDS[chord]\n    r = n(root)\n    minor = iv[1] == 3\n    if strings:\n        pat = [0, 0, 12, 0, 3 if minor else 4, 0, 7, 12]\n        for i, o in enumerate(pat):\n            t = t0 + i * BEAT / 2\n            b['vc'].note(t, 0.12, r + 12 + o, vel - (0 if i in (0, 3, 5, 7) else 18))\n        for p in LOW_HITS:\n            b['cb'].note(t0 + p * BEAT, 0.12, r, vel)\n        fifth, top = r + 43, r + 48  # violins: repeated sixteenths on the fifth and the octave\n        for i in range(16):\n            b['vln'].note(t0 + i * BEAT / 4, 0.08, top if i % 4 == 2 else fifth, vel - (8 if i % 4 else 0))\n        third = r + 24 + (3 if minor else 4)\n        for i in range(4):\n            b['vla'].note(t0 + (i + .5) * BEAT, 0.1, third, vel - 10)\n    if drums:\n        for p, a in SNARE:\n            b['snare'].note(t0 + p * BEAT, 0.1, 60, int(vel * a + 10))\n        for p in LOW_HITS:\n            b['bd'].note(t0 + p * BEAT, 0.2, 60, vel + (10 if p == 0 else 0))\n            b['timp'].note(t0 + p * BEAT, 0.3, r + 24 if p != 1.5 else r + 19, vel)\n    if low_brass:\n        for p in (0, 1.5, 2.5, 3.5):\n            b['tbn'].chord(t0 + p * BEAT, 0.15, [r + 24, r + 31], vel - 5)\n            b['tuba'].note(t0 + p * BEAT, 0.15, r + 12, vel)\n\n\ndef melody(b, t0, notes, tracks, vel=110, shift=0):\n    for p, d, k in notes:\n        for tr, sh in tracks:\n            b[tr].note(t0 + p * BEAT, d * BEAT * 0.96, n(k) + sh + shift, vel)\n\n\ndef hit(b, t, chord, vel=120, dur=0.25, cym=False, gong=False):\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, dur, [k + 12 for k in ns(voic)[1:]], vel)\n    b['hn'].chord(t, dur, voic, vel)\n    b['tbn'].chord(t, dur, [r + 24, r + 31, r + 36], vel)\n    b['tuba'].note(t, dur, r + 12, vel)\n    b['vc'].chord(t, dur, [r + 12, r + 24], vel)\n    b['cb'].note(t, dur, r, vel)\n    b['vln'].chord(t, dur, [k + 12 for k in ns(voic)[1:]], vel)\n    b['timp'].note(t, 0.5, r + 24, vel)\n    b['bd'].note(t, 0.5, 60, vel)\n    if cym:\n        b['cym'].note(t, 2, 60, 127)\n    if gong:\n        b['gong'].note(t, 4, 60, 120)\n\n\ndef knock(b, t, chord, vel=112, cym=False):\n    \"\"\"A lighter accent than hit(): brass stab, timpani and bass drum, for cuts inside a phrase.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, 0.14, [k + 12 for k in ns(voic)[1:]], vel)\n    b['hn'].chord(t, 0.14, voic, vel - 6)\n    b['timp'].note(t, 0.4, r + 24, vel)\n    b['bd'].note(t, 0.3, 60, vel)\n    b['cb'].note(t, 0.14, r, vel)\n    if cym:\n        b['cym'].note(t, 2, 60, 118)\n\n\ndef pad(b, t, dur, chord, vel=100):\n    \"\"\"A held chord across the band.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['hn'].chord(t, dur, voic, vel)\n    b['tbn'].chord(t, dur, [r + 24, r + 31], vel - 4)\n    b['tuba'].note(t, dur, r + 12, vel)\n    b['vln'].chord(t, dur, [k + 12 for k in ns(voic)[1:3]], vel - 6)\n    b['vla'].chord(t, dur, ns(voic)[1:3], vel - 8)\n    b['vc'].note(t, dur, r + 12, vel)\n    b['cb'].note(t, dur, r, vel)\n\n\ndef roll(b, t0, t1, v0=40, v1=120, timp=None):\n    k = int((t1 - t0) / 0.05)\n    for i in range(k):\n        v = v0 + (v1 - v0) * i / max(1, k - 1)\n        b['snare'].note(t0 + i * 0.05, 0.05, 60, int(v))\n        if timp and i % 2 == 0:\n            b['timp'].note(t0 + i * 0.05, 0.1, timp, int(v))\n\n\ndef final(b, t, chord='E', hold=3.6):\n    \"\"\"The last chord: tutti, gong, a decaying timpani roll.\"\"\"\n    root, iv, voic = CHORDS[chord]\n    r = n(root)\n    b['tpt'].chord(t, hold, [r + 36, r + 40, r + 43, r + 48], 122)\n    b['hn'].chord(t, hold, voic, 120)\n    b['tbn'].chord(t, hold, [r + 24, r + 31, r + 36, r + 40], 122)\n    b['tuba'].chord(t, hold, [r + 12, r + 24], 122)\n    b['vln'].chord(t, hold, [r + 40, r + 43, r + 48], 118)\n    b['vla'].chord(t, hold, [r + 31, r + 36], 116)\n    b['vc'].chord(t, hold, [r + 12, r + 24], 118)\n    b['cb'].note(t, hold, r, 118)\n    b['bd'].note(t, 1, 60, 127)\n    b['cym'].note(t, 3, 60, 127)\n    b['gong'].note(t, 4, 60, 124)\n    for i in range(int(hold / 0.06)):  # timpani roll, decaying\n        b['timp'].note(t + i * 0.06, 0.1, r + 24, int(max(30, 124 - i * 2.2)))\n\n\nMIXFX = dict(reverb=Reverb(room_size=0.8, damping=0.45, wet_level=1.0, dry_level=0.0, width=1.0))\n\n\ndef master_chain():\n    # dark, low-heavy balance like the reference: warm low shelf, tamed top\n    return [LowShelfFilter(160, 2.5), PeakFilter(140, 1.5, 0.9), PeakFilter(480, -1.5, 0.8), PeakFilter(3200, -1.0, 0.8), HighShelfFilter(9000, -2.0),\n            Compressor(threshold_db=-18, ratio=2.0, attack_ms=20, release_ms=220), Limiter(threshold_db=-1.5, release_ms=150)]\n\n\ndef battle_full():\n    b = band()\n    t0 = 0.25\n    at = lambda bar, beat=0.0: t0 + (bar * 4 + beat) * BEAT\n    # bars 0\u20131: rolls and a low brass pedal swelling out of nothing\n    roll(b, at(0), at(2) - 0.02, 20, 124, timp='E3')\n    b['cymroll'].note(at(0, 1.5), 1, 60, 120)\n    b['tbn'].chord(at(0), 8 * BEAT, 'E2 B2', 110).ramp(at(0), at(2), 11, 15, 127)\n    b['tuba'].note(at(0), 8 * BEAT, 'E1', 110)\n    b['cb'].note(at(0), 8 * BEAT, 'E2', 110)\n    b['trem'].chord(at(0), 8 * BEAT, 'E4 B4', 100).ramp(at(0), at(2), 11, 20, 127)\n    # bars 2\u20133: the groove, horn call\n    hit(b, at(2), 'Em', 124, 0.3, cym=True, gong=True)\n    for bar in (2, 3):\n        groove(b, at(bar), 'Em', vel=104)\n    melody(b, at(2), THEME_A[0][1] + [(4 + p, d, k) for p, d, k in THEME_A[3][1]], [('hn', 0)], vel=108)\n    # bars 4\u201311: theme A in horns and trombones\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 4 + i\n        groove(b, at(bar), c, vel=106)\n        melody(b, at(bar), notes, [('hn', 0), ('tbn', -12)], vel=114)\n        for p in (1.5, 3.5):\n            b['tpt'].chord(at(bar, p), 0.12, [k + 12 for k in ns(CHORDS[c][2])[1:]], 104)\n        if i in (0, 4):\n            b['cym'].note(at(bar), 2, 60, 118)\n    # bars 12\u201315: theme B in the trumpets, horns hold the chords\n    for i, (c, notes) in enumerate(THEME_B):\n        bar = 12 + i\n        groove(b, at(bar), c, vel=110)\n        melody(b, at(bar), notes, [('tpt', 0)], vel=120)\n        b['hn'].chord(at(bar), 4 * BEAT * 0.97, CHORDS[c][2], 100)\n        b['vln'].chord(at(bar), 4 * BEAT * 0.97, [k + 12 for k in ns(CHORDS[c][2])[1:3]], 96)\n        if i == 0:\n            b['cym'].note(at(bar), 2, 60, 122)\n    # bar 16: drums and low strings only; bar 17: build on the dominant\n    groove(b, at(16), 'Em', vel=100, low_brass=False)\n    groove(b, at(17), 'B', vel=96, strings=False, drums=False)\n    roll(b, at(17), at(18) - 0.02, 40, 126, timp='B2')\n    b['cymroll'].note(at(16, 3.2), 1, 60, 124)\n    b['hn'].chord(at(17), 4 * BEAT, 'D#4 F#4 B4', 110).ramp(at(17), at(18), 11, 35, 127)\n    b['tbn'].chord(at(17), 4 * BEAT, 'B2 F#3 A3', 110).ramp(at(17), at(18), 11, 35, 127)\n    b['tuba'].note(at(17), 4 * BEAT, 'B1', 110)\n    b['trem'].chord(at(17), 4 * BEAT, 'D#5 A5', 100).ramp(at(17), at(18), 11, 30, 127)\n    # bars 18\u201325: theme A tutti \u2014 trumpets and horns, trombones below, violins above\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 18 + i\n        groove(b, at(bar), c, vel=116)\n        melody(b, at(bar), notes, [('tpt', 0), ('hn', 0), ('tbn', -12), ('vln', 12)], vel=124)\n        if i in (0, 2, 4, 6):\n            b['cym'].note(at(bar), 2, 60, 124)\n    # bars 26\u201327: \u266DVI \u2013 \u266DVII \u2013 I, the other half completed in E major\n    hit(b, at(26), 'C', 124, 0.35, cym=True)\n    hit(b, at(26, 1.5), 'C', 120, 0.3)\n    hit(b, at(26, 3), 'D', 126, 0.35, cym=True)\n    roll(b, at(26, 3.3), at(27) - 0.02, 70, 127)\n    final(b, at(27), 'E', hold=4.2)\n    # dynamic arc shaped like the reference: a long build from the rolls, a breath at bar 16, full at the reprise\n    curve = [(0, -15), (at(2) - 0.05, -5), (at(2), -4), (at(4), -3), (at(12), -1.8), (at(16), -3.5), (at(18) - 0.05, -1.5), (at(18), 0)]\n    return mix(list(b.values()), at(27) + 6.0, master=master_chain(), fade_out=1.8, curve=curve, **MIXFX)\n\n\ndef match_loudness(x, target_db=-13.5):\n    \"\"\"Set the average level; a limiter keeps the peaks under -1 dBFS.\"\"\"\n    from pedalboard import Pedalboard, Limiter\n    rms = 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)\n    y = x * 10 ** ((target_db - rms) / 20)\n    y = Pedalboard([Limiter(threshold_db=-1.2, release_ms=120)])(y.T.copy(), SR).T\n    return (y / max(1.0, np.abs(y).max() / 10 ** (-1 / 20))).astype(np.float32)\n", "cues.py": "\"\"\"The cue sheet of a Forsion Video Studio project: scenes, tempo and hits, in seconds.\n\n    from cues import Cues\n    c = Cues.load('path/to/video.fvs.md')      # or a JSON file written by `fvs cues`\n    c.bpm, c.beat, c.bar, c.length\n    c.t0('cards'), c.t1('cards')               # scene start and end (s)\n    c.hits('cards')                            # the scene's hits, absolute seconds\n    c.at(bar, beat=0)                          # a point on the project's bar grid (bar 0 = t 0)\n    for s in c.scenes: s['id'], s['t0'], s['t1'], s['hitTimes']\n\nThe picture cuts on these hits and the score should put its accents on the same times.\n\"\"\"\nimport json\nimport os\nimport subprocess\n\n\nclass Cues:\n    def __init__(self, data):\n        self.data = data\n        self.scenes = data['scenes']\n        self.by_id = {s['id']: s for s in self.scenes}\n        self.bpm = data.get('bpm')\n        self.beats_per_bar = data.get('beatsPerBar') or 4\n        self.beat = 60 / self.bpm if self.bpm else None\n        self.bar = self.beat * self.beats_per_bar if self.bpm else None\n        self.length = data['length']\n        self.fps = data.get('fps', 30)\n        self.audio = data.get('audio', [])\n\n    @classmethod\n    def load(cls, path):\n        \"\"\"A .fvs.md project (read through the fvs CLI next to this folder) or a cue sheet JSON.\"\"\"\n        if path.endswith('.json'):\n            return cls(json.load(open(path, encoding='utf-8')))\n        here = os.path.dirname(os.path.abspath(__file__))\n        cli = next((p for p in (os.path.join(here, '..', 'fvs.mjs'), os.environ.get('FVS_CLI', '')) if p and os.path.exists(p)), None)\n        if not cli:\n            raise FileNotFoundError('fvs.mjs not found next to the music folder; pass a cue sheet JSON from `fvs cues` instead')\n        out = subprocess.run(['node', cli, 'cues', path], capture_output=True, text=True, check=True).stdout\n        return cls(json.loads(out))\n\n    def scene(self, sid):\n        if sid not in self.by_id:\n            raise KeyError(f'no scene {sid!r}; scenes: {\", \".join(self.by_id)}')\n        return self.by_id[sid]\n\n    def t0(self, sid):\n        return self.scene(sid)['t0']\n\n    def t1(self, sid):\n        return self.scene(sid)['t1']\n\n    def hits(self, sid):\n        return list(self.scene(sid)['hitTimes'])\n\n    def at(self, bar, beat=0.0):\n        \"\"\"Seconds at a bar (and beat) of the project's grid; bar 0 starts at 0 s.\"\"\"\n        if not self.bpm:\n            raise ValueError('this project has no tempo')\n        return (bar * self.beats_per_bar + beat) * self.beat\n\n    def all_hits(self):\n        return [(s['id'], i, t) for s in self.scenes for i, t in enumerate(s['hitTimes'])]\n\n\ndef write_audio(x, path, sr=48000):\n    \"\"\"WAV next to the project, plus an MP3 when ffmpeg is around (the Studio and the player like MP3).\"\"\"\n    import soundfile as sf\n    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)\n    wav = os.path.splitext(path)[0] + '.wav'\n    sf.write(wav, x, sr, subtype='PCM_24')\n    ff = os.environ.get('FFMPEG') or 'ffmpeg'\n    mp3 = os.path.splitext(path)[0] + '.mp3'\n    try:\n        subprocess.run([ff, '-y', '-loglevel', 'error', '-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', mp3], check=True)\n        return mp3\n    except (OSError, subprocess.CalledProcessError):\n        return wav\n", "engine.py": '"""Tiny offline score renderer: timed note events \u2192 stems \u2192 mixed stereo WAV (48 kHz).\n\nTrack renders General MIDI through a SoundFont (optional: pip install tinysoundfont, SF2=/path/to/font.sf2);\nsampler.SampleTrack is the same interface on recorded orchestra samples. Audio places pre-rendered clips.\nmix() renders every layer, applies gates and a dynamic curve, shares one reverb bus and masters the result.\nSound design (booms, beeps, alarms, risers) is synthesized with numpy.\n"""\nimport os\nimport numpy as np\nfrom pedalboard import Pedalboard, Reverb, Compressor, Limiter, HighpassFilter, LowpassFilter, PeakFilter\n\nSR = 48000\nSF2 = os.environ.get(\'SF2\', os.path.expanduser(\'~/sf/GeneralUser-GS.sf2\'))\nNAMES = {\'C\': 0, \'D\': 2, \'E\': 4, \'F\': 5, \'G\': 7, \'A\': 9, \'B\': 11}\n\n\ndef n(name):\n    """\'C#4\' \u2192 61 (C4 = 60). Also accepts ints."""\n    if isinstance(name, int):\n        return name\n    pc = NAMES[name[0]]\n    i = 1\n    while i < len(name) and name[i] in \'#b\':\n        pc += 1 if name[i] == \'#\' else -1\n        i += 1\n    return 12 * (int(name[i:]) + 1) + pc\n\n\ndef ns(names):\n    return [n(x) for x in names.split()] if isinstance(names, str) else [n(x) for x in names]\n\n\nclass Track:\n    def __init__(self, name, preset, bank=0, drums=False, gain=1.0, pan=0.0, fx=None, send=0.25):\n        self.name, self.preset, self.bank, self.drums = name, preset, bank, drums\n        self.gain, self.pan, self.fx, self.send = gain, pan, fx or [], send\n        self.ev = []  # (t, order, kind, a, b)\n\n    def note(self, t, dur, key, vel=100):\n        k = n(key)\n        self.ev.append((t, 1, \'on\', k, int(max(1, min(127, vel)))))\n        self.ev.append((t + dur, 0, \'off\', k, 0))\n        return self\n\n    def chord(self, t, dur, keys, vel=100):\n        for k in (ns(keys) if isinstance(keys, str) else keys):\n            self.note(t, dur, k, vel)\n        return self\n\n    def cc(self, t, num, val):\n        self.ev.append((t, 0, \'cc\', num, int(max(0, min(127, val)))))\n        return self\n\n    def ramp(self, t0, t1, num, v0, v1, steps=24):\n        for i in range(steps + 1):\n            self.cc(t0 + (t1 - t0) * i / steps, num, v0 + (v1 - v0) * i / steps)\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        if not self.ev:\n            return out\n        import tinysoundfont  # optional: only General MIDI tracks need it\n        s = tinysoundfont.Synth(samplerate=SR)\n        sfid = s.sfload(SF2)\n        s.program_select(0, sfid, self.bank, self.preset, is_drums=self.drums)\n        pos = 0\n        for t, _, kind, a, b in sorted(self.ev, key=lambda e: (e[0], e[1])):\n            idx = min(total, max(0, int(round(t * SR))))\n            if idx > pos:\n                out[pos:idx] = np.frombuffer(s.generate(idx - pos), np.float32).reshape(-1, 2)\n                pos = idx\n            if kind == \'on\':\n                s.noteon(0, a, b)\n            elif kind == \'off\':\n                s.noteoff(0, a)\n            else:\n                s.control_change(0, a, b)\n        if pos < total:\n            out[pos:] = np.frombuffer(s.generate(total - pos), np.float32).reshape(-1, 2)\n        return out\n\n\nclass Audio:\n    """A pre-rendered stereo layer (sound design) placed on the timeline."""\n\n    def __init__(self, name, gain=1.0, pan=0.0, fx=None, send=0.2):\n        self.name, self.gain, self.pan, self.fx, self.send = name, gain, pan, fx or [], send\n        self.clips = []\n\n    def add(self, t, sig, gain=1.0):\n        self.clips.append((t, sig, gain))\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        for t, sig, g in self.clips:\n            if sig.ndim == 1:\n                sig = np.stack([sig, sig], 1)\n            i = int(t * SR)\n            if i >= total:\n                continue\n            j = min(total, i + len(sig))\n            out[i:j] += sig[: j - i] * g\n        return out\n\n\ndef _pan(x, p):\n    l, r = np.cos((p + 1) * np.pi / 4), np.sin((p + 1) * np.pi / 4)\n    return x * np.array([l, r], np.float32) * np.sqrt(2)\n\n\ndef gate_env(total, gates, name=None, ramp=0.012):\n    """Gain envelope from (t0, t1, db, keep_names) windows: EVA-style hard cuts to near silence."""\n    env = np.ones(total, np.float32)\n    r = int(ramp * SR)\n    for t0, t1, db, keep in gates:\n        if name is not None and name in keep:\n            continue\n        a, b = int(t0 * SR), min(total, int(t1 * SR))\n        g = 10 ** (db / 20)\n        seg = np.full(b - a, g, np.float32)\n        k = min(r, len(seg) // 2)\n        seg[:k] = np.linspace(1, g, k)\n        seg[len(seg) - k:] = np.linspace(g, 1, k)\n        env[a:b] = np.minimum(env[a:b], seg)\n    return env[:, None]\n\n\ndef mix(layers, length, reverb=None, master=None, target_peak_db=-1.0, fade_out=0.0, gates=(), master_gates=(), curve=()):\n    """Render layers, apply per-layer fx and gates, share one reverb bus, then master chain and peak-normalize."""\n    total = int(length * SR)\n    dry = np.zeros((total, 2), np.float32)\n    bus = np.zeros((total, 2), np.float32)\n    for L in layers:\n        x = L.render(length) * L.gain\n        if L.fx:\n            x = Pedalboard(L.fx)(x.T.copy(), SR).T\n        x = _pan(x, L.pan)\n        if gates:\n            x = x * gate_env(total, gates, L.name)\n        if os.environ.get(\'REPORT\'):\n            w = os.environ.get(\'REPORT_WIN\')  # e.g. "69.2,72" to measure one passage\n            seg = x[int(float(w.split(\',\')[0]) * SR):int(float(w.split(\',\')[1]) * SR)] if w else x\n            rms = np.sqrt((seg ** 2).mean()) + 1e-12\n            print(f\'    {L.name:14s} rms {20 * np.log10(rms):6.1f} dB  peak {20 * np.log10(np.abs(x).max() + 1e-12):6.1f} dB\')\n        dry += x\n        bus += x * L.send\n    rv = reverb or Reverb(room_size=0.82, damping=0.35, wet_level=1.0, dry_level=0.0, width=1.0)\n    wet = Pedalboard([HighpassFilter(180), rv])(bus.T.copy(), SR).T\n    out = dry + wet\n    if master_gates:\n        out = out * gate_env(total, master_gates)\n    if curve:  # dynamic arc: [(t, db), ...] interpolated before the master chain\n        ts, dbs = zip(*curve)\n        out = out * (10 ** (np.interp(np.arange(total) / SR, ts, dbs) / 20))[:, None].astype(np.float32)\n    chain = master or [Compressor(threshold_db=-18, ratio=1.8, attack_ms=15, release_ms=200), Limiter(threshold_db=-1.5, release_ms=150)]\n    out = Pedalboard(chain)(out.T.copy(), SR).T\n    if fade_out:\n        k = int(fade_out * SR)\n        out[-k:] *= np.linspace(1, 0, k)[:, None] ** 2\n    peak = np.abs(out).max() + 1e-9\n    return (out * (10 ** (target_peak_db / 20) / peak)).astype(np.float32)\n\n\n# \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 sound design \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n_rng = np.random.default_rng(2012)\n\n\ndef env_exp(nsamp, decay):\n    return np.exp(-np.arange(nsamp) / (decay * SR)).astype(np.float32)\n\n\ndef boom(dur=2.5, f0=90.0, f1=28.0, sweep=0.35, decay=0.7, drive=1.6):\n    """Cinematic sub hit: pitch-dropping sine, soft-clipped."""\n    t = np.arange(int(dur * SR)) / SR\n    f = f1 + (f0 - f1) * np.exp(-t / sweep)\n    ph = 2 * np.pi * np.cumsum(f) / SR\n    x = np.sin(ph) * np.exp(-t / decay)\n    x[: int(0.004 * SR)] *= np.linspace(0, 1, int(0.004 * SR))\n    return np.tanh(x * drive).astype(np.float32) / np.tanh(drive)\n\n\ndef noise(dur, lp=None, hp=None, decay=None):\n    x = _rng.standard_normal(int(dur * SR)).astype(np.float32)\n    fx = []\n    if hp:\n        fx.append(HighpassFilter(hp))\n    if lp:\n        fx.append(LowpassFilter(lp))\n    if fx:\n        x = Pedalboard(fx)(x[None], SR)[0]\n    if decay:\n        x *= env_exp(len(x), decay)\n    return x / (np.abs(x).max() + 1e-9)\n\n\ndef impact(dur=3.0, weight=1.0):\n    """Boom + noise crack, for hard cuts."""\n    b = boom(dur, 110, 30, 0.25, 0.9) * weight\n    c = noise(dur, lp=5000, hp=300, decay=0.08) * 0.5\n    return (b + c) / 1.3\n\n\ndef click(dur=0.05, lp=9000):\n    return noise(dur, lp=lp, hp=1500, decay=0.006)\n\n\ndef glitch(dur=0.18, seed=0):\n    r = np.random.default_rng(seed)\n    x = np.zeros(int(dur * SR), np.float32)\n    for _ in range(6):\n        a = r.integers(0, len(x) - 400)\n        ln = r.integers(120, 900)\n        f = r.choice([800, 1600, 2400, 4000, 6000])\n        seg = np.sign(np.sin(2 * np.pi * f * np.arange(ln) / SR)) * r.uniform(.3, 1)\n        x[a:a + ln] += seg[: len(x) - a].astype(np.float32)\n    return np.clip(x, -1, 1) * 0.6\n\n\ndef beep(freq=1000, dur=0.12, shape=\'sine\', attack=0.003, release=0.02):\n    t = np.arange(int(dur * SR)) / SR\n    w = np.sin(2 * np.pi * freq * t) if shape == \'sine\' else np.sign(np.sin(2 * np.pi * freq * t)) * 0.5\n    e = np.ones_like(t)\n    a, r = int(attack * SR), int(release * SR)\n    e[:a] = np.linspace(0, 1, a)\n    e[-r:] = np.linspace(1, 0, r)\n    return (w * e).astype(np.float32)\n\n\ndef alarm(dur=1.0, f1=880, f2=660, rate=4.0):\n    """Two-tone warning siren (square, band-limited)."""\n    t = np.arange(int(dur * SR)) / SR\n    f = np.where(np.floor(t * rate) % 2 == 0, f1, f2)\n    ph = 2 * np.pi * np.cumsum(f) / SR\n    x = np.sign(np.sin(ph)) * 0.5 + np.sin(ph * 2) * 0.2\n    x = Pedalboard([LowpassFilter(3200), HighpassFilter(300)])(x[None].astype(np.float32), SR)[0]\n    fade = int(0.01 * SR)\n    x[:fade] *= np.linspace(0, 1, fade)\n    x[-fade:] *= np.linspace(1, 0, fade)\n    return x\n\n\ndef riser(dur=2.0, f0=200, f1=4000, tone=True):\n    t = np.arange(int(dur * SR)) / SR\n    k = t / dur\n    nz = noise(dur, hp=400) * (k ** 2.2)\n    # sweep a resonant peak by chunks\n    out = np.zeros_like(nz)\n    chunks = 40\n    for i in range(chunks):\n        a, b = i * len(nz) // chunks, (i + 1) * len(nz) // chunks\n        fc = f0 * (f1 / f0) ** (i / chunks)\n        out[a:b] = Pedalboard([PeakFilter(fc, 14, 1.2), LowpassFilter(fc * 2)])(nz[None, a:b], SR)[0]\n    x = out / (np.abs(out).max() + 1e-9)\n    if tone:\n        f = f0 * 0.5 * (f1 / f0 / 4) ** k\n        x = x * 0.7 + np.sin(2 * np.pi * np.cumsum(f) / SR) * (k ** 2) * 0.4\n    return x.astype(np.float32)\n\n\ndef drone(dur, freq=36.7, detune=0.4, lp=400):\n    t = np.arange(int(dur * SR)) / SR\n    x = sum(np.sin(2 * np.pi * freq * m * (1 + detune * 0.001 * i) * t + i) / m for i, m in enumerate([1, 2, 3, 4]))\n    x += noise(dur, lp=lp) * 0.15\n    x = Pedalboard([LowpassFilter(lp)])(x[None].astype(np.float32), SR)[0]\n    fade = int(0.5 * SR)\n    x[:fade] *= np.linspace(0, 1, fade)\n    x[-fade:] *= np.linspace(1, 0, fade)\n    return x / (np.abs(x).max() + 1e-9)\n\n\ndef heartbeat():\n    a = boom(0.35, 70, 40, 0.05, 0.08, 2.5)\n    b = boom(0.45, 60, 36, 0.05, 0.1, 2.5) * 0.7\n    out = np.zeros(int(0.8 * SR), np.float32)\n    out[: len(a)] += a\n    k = int(0.22 * SR)\n    out[k:k + len(b)] += b\n    return out\n\n\ndef tone(freq, dur, fade=0.02):\n    t = np.arange(int(dur * SR)) / SR\n    x = np.sin(2 * np.pi * freq * t)\n    f = int(fade * SR)\n    x[:f] *= np.linspace(0, 1, f)\n    x[-f:] *= np.linspace(1, 0, f)\n    return x.astype(np.float32)\n\n\ndef reverse(x):\n    return x[::-1].copy()\n\n\ndef fade_in(x, dur):\n    k = int(dur * SR)\n    x = x.copy()\n    x[:k] *= np.linspace(0, 1, k) ** 2\n    return x\n', "fetch_samples.py": "\"\"\"Download the orchestra samples the sampler uses: VSCO 2 Community Edition (CC0, ~1.7 GB of the full set).\n\n    python3 fetch_samples.py [target]        # default: $VSCO or ~/vsco\n\nA sparse, blob-less git clone that only pulls the instruments the battle band plays. Needs git.\n\"\"\"\nimport os\nimport subprocess\nimport sys\n\nPATHS = [\n    'Brass/Trumpet/sus/', 'Brass/Trumpet/stac/', 'Brass/F Horn/sus/', 'Brass/F Horn/stac/',\n    'Brass/Tenor Trombone/sus/', 'Brass/Tenor Trombone/stac/', 'Brass/Tuba/sus/', 'Brass/Tuba/stac/',\n    'Strings/Violin Section/Spic/', 'Strings/Violin Section/susVib/', 'Strings/Violin Section/Trem/',\n    'Strings/Viola Section/spic/', 'Strings/Viola Section/susvib/', 'Strings/Cello Section/spic/', 'Strings/Cello Section/susvib/',\n    'Strings/Solo Contrabass/Spic/', 'Strings/Solo Contrabass/SusVib/', 'Percussion/Timpani/',\n    'VSCO 1 Percussion/drums/snare/', 'VSCO 1 Percussion/drums/bass/', 'VSCO 1 Percussion/varMetal/Cymbals/', 'VSCO 1 Percussion/varMetal/Gong/',\n]\n\n\ndef main():\n    target = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('VSCO', os.path.expanduser('~/vsco'))\n    if os.path.isdir(os.path.join(target, 'Brass')):\n        print(f'samples already at {target}')\n        return\n    run = lambda *a, **k: subprocess.run(list(a), check=True, **k)\n    run('git', 'clone', '--depth', '1', '--filter=blob:none', '--no-checkout', 'https://github.com/sgossner/VSCO-2-CE.git', target)\n    run('git', 'sparse-checkout', 'init', '--no-cone', cwd=target)\n    run('git', 'sparse-checkout', 'set', '--no-cone', *[f'/{p}' for p in PATHS], cwd=target)\n    run('git', 'checkout', cwd=target)\n    print(f'samples at {target}; set VSCO={target} if that is not ~/vsco')\n\n\nif __name__ == '__main__':\n    main()\n", "requirements.txt": "numpy\nscipy\nsoundfile\npedalboard\n# optional: General MIDI tracks through a SoundFont (engine.Track)\n# tinysoundfont\n", "sampler.py": "\"\"\"Sample-based orchestra from VSCO 2 Community Edition (CC0): https://github.com/sgossner/VSCO-2-CE\n\nSampleTrack mirrors engine.Track (note / chord / cc / ramp / render), so pieces can swap\nGeneral MIDI instruments for recorded ones. Pitched samples are picked by nearest pitch,\nvelocity layer and round robin, then resampled to the target pitch. Unpitched percussion is\npicked by dynamic marking. CC 11 events become a gain envelope (expression swells).\n\nEach sample starts early by its own attack time (to reach 35% of its peak), so a brass stab lands its\nbody on the beat as a drum does, instead of swelling in 50 ms late.\n\"\"\"\nimport os\nimport re\nimport glob\nimport pickle\nimport numpy as np\nimport soundfile as sf\nfrom scipy.signal import resample_poly\nfrom engine import SR, n\n\nVSCO = os.environ.get('VSCO', os.path.expanduser('~/vsco'))\nCACHE = os.environ.get('FVS_CACHE', os.path.expanduser('~/.cache/fvs/vsco'))\n_NOTE = re.compile(r'(?:^|_)([A-G]#?)(-?\\d)(?=_)')\n_PC = dict(C=0, D=2, E=4, F=5, G=7, A=9, B=11)\nDYN = ['ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff']\n\n\ndef _load(path):\n    x, sr = sf.read(path, dtype='float32', always_2d=True)\n    if x.shape[1] == 1:\n        x = np.repeat(x, 2, 1)\n    x = x[:, :2]\n    if sr != SR:\n        x = resample_poly(x, SR, sr, axis=0).astype(np.float32)\n    # trim leading silence so notes land on the beat\n    a = np.abs(x).max(1)\n    i = int(np.argmax(a > a.max() * 0.03))\n    return x[max(0, i - int(0.003 * SR)):]\n\n\ndef _midi(fn):\n    m = _NOTE.search(os.path.basename(fn))\n    pc = _PC[m.group(1)[0]] + (1 if '#' in m.group(1) else 0)\n    return 12 * (int(m.group(2)) + 2) + pc  # VSCO names middle C as C3\n\n\ndef _num(pattern, fn, default=1):\n    m = re.search(pattern, os.path.basename(fn), re.I)\n    return int(m.group(1)) if m else default\n\n\ndef _attack(x, level=0.35, cap=0.09):\n    \"\"\"Seconds from the sample's start until its 5 ms envelope reaches `level` of the peak in its first 0.4 s.\"\"\"\n    a = np.abs(x[: int(0.4 * SR)]).max(1)\n    w = int(0.005 * SR)\n    env = np.convolve(a, np.ones(w) / w, mode='same')\n    return min(cap, int(np.argmax(env >= level * env.max())) / SR)\n\n\nclass Bank:\n    \"\"\"Samples of one instrument articulation: list of (midi, layer, rr, audio).\"\"\"\n\n    def __init__(self, key, samples, release):\n        self.key, self.samples, self.release = key, samples, release\n        self.attack = {id(s[3]): _attack(s[3]) for s in samples}\n        self.layers = sorted({s[1] for s in samples})\n        self.rr = {}\n        loud = [np.sqrt((s[3][: SR // 2] ** 2).mean()) for s in samples if s[1] == self.layers[-1]]\n        self.norm = 0.12 / (np.median(loud) + 1e-9)\n\n\n_banks = {}\n\n\ndef pitched(key, folder, release=0.25, pattern='*.wav'):\n    if key in _banks:\n        return _banks[key]\n    os.makedirs(CACHE, exist_ok=True)\n    cache = os.path.join(CACHE, key + '.pkl')\n    if os.path.exists(cache):\n        with open(cache, 'rb') as f:\n            samples = pickle.load(f)\n    else:\n        samples = []\n        for fn in sorted(glob.glob(os.path.join(VSCO, folder, pattern))):\n            samples.append((_midi(fn), _num(r'_v(\\d)', fn), _num(r'_rr(\\d)', fn), _load(fn)))\n        with open(cache, 'wb') as f:\n            pickle.dump(samples, f)\n    _banks[key] = Bank(key, samples, release)\n    return _banks[key]\n\n\ndef unpitched(key, files, release=0.1):\n    \"\"\"files: {dynamic_index: [paths]} \u2014 dynamic index acts as the velocity layer.\"\"\"\n    if key in _banks:\n        return _banks[key]\n    samples = []\n    for layer, paths in files.items():\n        for i, p in enumerate(paths):\n            samples.append((60, layer, i + 1, _load(os.path.join(VSCO, p))))\n    _banks[key] = Bank(key, samples, release)\n    return _banks[key]\n\n\ndef _render_note(bank, midi, vel, dur, pitched_=True):\n    if pitched_:\n        near = min(abs(s[0] - midi) for s in bank.samples)\n        cand = [s for s in bank.samples if abs(s[0] - midi) == near]\n    else:\n        cand = bank.samples\n    layers = sorted({s[1] for s in cand})\n    li = layers[min(len(layers) - 1, int(vel / 128 * len(layers)))]\n    cand = [s for s in cand if s[1] == li]\n    k = (cand[0][0], li)\n    i = bank.rr.get(k, 0)\n    bank.rr[k] = i + 1\n    s = cand[i % len(cand)]\n    x = s[3]\n    lead = bank.attack[id(x)]\n    if pitched_ and s[0] != midi:\n        ratio = 2 ** ((midi - s[0]) / 12)\n        lead /= ratio\n        idx = np.arange(0, len(x) - 1, ratio)\n        i0 = idx.astype(int)\n        fr = (idx - i0)[:, None].astype(np.float32)\n        x = x[i0] * (1 - fr) + x[i0 + 1] * fr\n    # velocity inside a layer still shapes loudness\n    g = bank.norm * (0.35 + 0.65 * (vel / 127) ** 1.5)\n    if dur is not None:\n        L = min(len(x), int((dur + bank.release) * SR))\n        x = x[:L].copy()\n        r = min(L, int(bank.release * SR))\n        cut = max(0, L - r)\n        x[cut:] *= np.linspace(1, 0, L - cut, dtype=np.float32)[:, None] ** 2\n    return x * g, lead\n\n\nclass SampleTrack:\n    \"\"\"Drop-in for engine.Track, backed by one or more VSCO banks (e.g. sustain + staccato).\"\"\"\n\n    def __init__(self, name, bank, gain=1.0, pan=0.0, fx=None, send=0.25, short=None, short_below=0.3, pitched_=True, natural=False):\n        self.name, self.bank, self.short, self.short_below = name, bank, short, short_below\n        self.gain, self.pan, self.fx, self.send = gain, pan, fx or [], send\n        self.pitched, self.natural = pitched_, natural\n        self.notes, self.ccs = [], []\n\n    def note(self, t, dur, key, vel=100):\n        self.notes.append((t, dur, n(key) if self.pitched else 60, int(max(1, min(127, vel)))))\n        return self\n\n    def chord(self, t, dur, keys, vel=100):\n        for k in (keys.split() if isinstance(keys, str) else keys):\n            self.note(t, dur, k, vel)\n        return self\n\n    def cc(self, t, num, val):\n        if num == 11:\n            self.ccs.append((t, val / 127))\n        return self\n\n    def ramp(self, t0, t1, num, v0, v1, steps=24):\n        for i in range(steps + 1):\n            self.cc(t0 + (t1 - t0) * i / steps, num, v0 + (v1 - v0) * i / steps)\n        return self\n\n    def render(self, length):\n        total = int(length * SR)\n        out = np.zeros((total, 2), np.float32)\n        for t, dur, midi, vel in sorted(self.notes):\n            bank = self.short if (self.short is not None and dur <= self.short_below) else self.bank\n            x, lead = _render_note(bank, midi, vel, None if (self.natural or bank is self.short) else dur, self.pitched)\n            i = int((t - lead) * SR)\n            if i >= total:\n                continue\n            if i < 0:\n                x, i = x[-i:], 0\n            j = min(total, i + len(x))\n            out[i:j] += x[: j - i]\n        if self.ccs:\n            # like a MIDI channel: full expression until the first CC, then each value holds until the next\n            ts, vs = zip(*sorted(self.ccs))\n            idx = np.searchsorted(np.array(ts), np.arange(total) / SR, side='right') - 1\n            out *= np.where(idx >= 0, np.array(vs, np.float32)[np.maximum(idx, 0)], 1.0).astype(np.float32)[:, None]\n        return out\n\n\n# \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 the orchestra \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\ndef orchestra():\n    P = 'VSCO 1 Percussion'\n    snare = sorted(glob.glob(os.path.join(VSCO, P, 'drums/snare/drum1/snare1_*.wav')))\n    rel = lambda p: os.path.relpath(p, VSCO)\n    by = lambda files, tag: [rel(f) for f in files if re.search(rf'_{tag}(_|\\.|\\d)', os.path.basename(f))]\n    snare_layers = {i: by(snare, d) for i, d in enumerate(['mp', 'f', 'ff', 'fff']) if by(snare, d)}\n    bd = [f for f in sorted(glob.glob(os.path.join(VSCO, P, 'drums/bass/bdrum_*.wav'))) if not re.search('muted|roll|special', f)]\n    bd_layers = {i: by(bd, d) for i, d in enumerate(['mp', 'f', 'ff', 'fff']) if by(bd, d)}\n    cym = sorted(glob.glob(os.path.join(VSCO, P, 'varMetal/Cymbals/clash/crash_hit_*.wav')))\n    cym_layers = {0: [rel(f) for f in cym if '_ff_' in f], 1: [rel(f) for f in cym if '_fff' in f]}\n    gong = [rel(f) for f in sorted(glob.glob(os.path.join(VSCO, P, 'varMetal/Gong/gong_hit_ff*.wav')))]\n    o = dict(\n        tpt_sus=pitched('tpt-sus', 'Brass/Trumpet/sus', 0.2), tpt_stac=pitched('tpt-stac', 'Brass/Trumpet/stac', 0.1),\n        hn_sus=pitched('hn-sus', 'Brass/F Horn/sus', 0.25), hn_stac=pitched('hn-stac', 'Brass/F Horn/stac', 0.1),\n        tbn_sus=pitched('tbn-sus', 'Brass/Tenor Trombone/sus', 0.2), tbn_stac=pitched('tbn-stac', 'Brass/Tenor Trombone/stac', 0.1),\n        tuba_sus=pitched('tuba-sus', 'Brass/Tuba/sus', 0.2), tuba_stac=pitched('tuba-stac', 'Brass/Tuba/stac', 0.1),\n        vln_spic=pitched('vln-spic', 'Strings/Violin Section/Spic', 0.08), vln_sus=pitched('vln-sus', 'Strings/Violin Section/susVib', 0.3),\n        vln_trem=pitched('vln-trem', 'Strings/Violin Section/Trem', 0.3),\n        vla_spic=pitched('vla-spic', 'Strings/Viola Section/spic', 0.08), vla_sus=pitched('vla-sus', 'Strings/Viola Section/susvib', 0.3),\n        vc_spic=pitched('vc-spic', 'Strings/Cello Section/spic', 0.08), vc_sus=pitched('vc-sus', 'Strings/Cello Section/susvib', 0.3),\n        cb_spic=pitched('cb-spic', 'Strings/Solo Contrabass/Spic', 0.08), cb_sus=pitched('cb-sus', 'Strings/Solo Contrabass/SusVib', 0.3),\n        snare=unpitched('snare', snare_layers), bd=unpitched('bd', bd_layers, 0.3),\n        cym=unpitched('cym', cym_layers, 1.0), gong=unpitched('gong', {0: gong}, 2.0),\n        cymroll=unpitched('cymroll', {0: [f'{P}/varMetal/Cymbals/susp/susp_hit_softmall_roll2_cresc.wav']}, 0.5),\n        timp=timpani(),\n    )\n    for k in ('cymroll', 'gong'):  # swells: normalise by peak, not by the (quiet) first half-second\n        b = o[k]\n        b.norm = 0.35 / max(np.abs(x[3]).max() for x in b.samples)\n    return o\n\n\ndef _timp_pitch(x):\n    \"\"\"Strongest spectral peak of the hit's body in the timpani range.\"\"\"\n    seg = x[int(0.05 * SR): int(0.6 * SR)].mean(1)\n    sp = np.abs(np.fft.rfft(seg * np.hanning(len(seg))))\n    f = np.fft.rfftfreq(len(seg), 1 / SR)\n    m = (f > 70) & (f < 260)\n    return 69 + 12 * np.log2(f[m][np.argmax(sp[m])] / 440)\n\n\ndef timpani():\n    if 'timp' in _banks:\n        return _banks['timp']\n    samples = []\n    for d in range(1, 6):\n        files = sorted(glob.glob(os.path.join(VSCO, 'Percussion/Timpani', f'Timpani{d}_Hit_*.wav')))\n        if not files:\n            continue\n        loaded = [(_num(r'_v(\\d)', fn), _num(r'_rr(\\d)', fn), _load(fn)) for fn in files]\n        loud = max(loaded, key=lambda s: s[0])\n        midi = int(round(_timp_pitch(loud[2])))\n        samples += [(midi, v, rr, x) for v, rr, x in loaded]\n    _banks['timp'] = Bank('timp', samples, 0.4)\n    return _banks['timp']\n", "score_episode_212.py": "\"\"\"The score of \u7B2C 2.12 \u8BDD (examples/episode-2.12): \u51B3\u6218 II, a sampled battle march at 150 BPM, E minor \u2192 E major.\n\nA worked example of scoring against a Forsion Video Studio cue sheet. Every accent is placed on a time\nread from the project: H(scene) gives a scene's hits in seconds, SEC[scene] its start and end. Bars in\nB(bar, beat) are counted from the boot scene (the warning card before it is silent).\n\n    python3 score_episode_212.py path/to/episode-2.12.fvs.md [--out audio/episode-2.12-score.mp3]\n    node ../fvs.mjs sync path/to/episode-2.12.fvs.md        # then check the hits land on accents\n\"\"\"\nimport os\nimport sys\nfrom pedalboard import HighpassFilter\nimport battle\nfrom battle import band, groove, melody, hit, knock, pad, roll, final, THEME_A, THEME_B, CHORDS, master_chain, MIXFX, match_loudness\nfrom engine import Audio, mix, n, ns, boom, beep\nfrom cues import Cues, write_audio\n\nPROJECT = next((a for a in sys.argv[1:] if not a.startswith('--')), None)\nif not PROJECT:\n    sys.exit(__doc__)\nC = Cues.load(PROJECT)\nbattle.set_tempo(C.bpm)\nBEAT, BAR, LEN = C.beat, C.bar, C.length\nLEAD = round(C.t0('boot') / BAR)\nSEC = {s['id']: (s['t0'], s['t1']) for s in C.scenes}\n\n\ndef H(scene):\n    \"\"\"The picture's hit points in a scene, in seconds.\"\"\"\n    return C.hits(scene)\n\n\ndef B(bar, beat=0.0):\n    return C.at(bar + LEAD, beat)\n\n\ndef common_sfx():\n    \"\"\"Interface sounds: boot beeps, HUMAN.md update chirps, sub hits on the big reveals.\"\"\"\n    ui = Audio('ui', gain=0.3, send=0.15, fx=[HighpassFilter(300)])\n    for i in range(7):\n        ui.add(SEC['boot'][0] + 0.12 + i * 0.36, beep(1760 if i < 6 else 740, 0.05 if i < 6 else 0.18, shape='sine' if i < 6 else 'square'), 0.5 if i < 6 else 0.7)\n    for t in H('evolve')[1::2]:  # HUMAN.md UPDATED\n        ui.add(t, beep(2093, 0.06), 0.5)\n        ui.add(t + BEAT / 4, beep(2637, 0.06), 0.45)\n    sub = Audio('sub', gain=0.55, send=0.05)\n    for t in (SEC['question'][0], B(11, 2), SEC['finale'][0] + 2 * BAR, SEC['finale'][0] + 5 * BAR):\n        sub.add(t, boom(2.5, 100, 28, 0.35, 0.9, 1.8), 0.8)\n    return [ui, sub]\n\n\ndef score():\n    b = band()\n    # boot: a roll and a low pedal out of silence\n    roll(b, B(0), B(2) - 0.02, 12, 96, timp='E3')\n    b['tbn'].chord(B(0), 2 * BAR, 'E2 B2', 100).ramp(B(0), B(2), 11, 10, 110)\n    b['tuba'].note(B(0), 2 * BAR, 'E1', 100)\n    b['cb'].note(B(0), 2 * BAR, 'E1', 100)\n    b['trem'].chord(B(0), 2 * BAR, 'E4 B4', 90).ramp(B(0), B(2), 11, 15, 110)\n    # the seven intertitles, one stab each; the ticker gets a roll\n    cards = H('cards')\n    for i, c in enumerate(['Em', 'C', 'A', 'B', 'Em', 'C', 'D']):\n        hit(b, cards[i], c, vel=104 + i * 3, dur=0.3, cym=(i == 0))\n    roll(b, cards[7], SEC['cards'][1] - BEAT / 4, 60, 118, timp='E3')\n    # years: low and held, a timpani stroke under each line\n    b['vc'].chord(B(6), 2 * BAR, 'E2 B2', 84)\n    b['cb'].note(B(6), 2 * BAR, 'E1', 88)\n    b['hn'].chord(B(6), BAR, 'E3 G3 B3', 74).chord(B(7), BAR, 'E3 G3 C4', 78)\n    for k, t in enumerate(H('years')):\n        b['timp'].note(t, 0.3, 'E3', 100 if k == 0 else 86)\n    # half: the groove enters\n    groove(b, B(8), 'Em', vel=92, low_brass=False)\n    groove(b, B(9), 'Em', vel=98)\n    b['cym'].note(H('half')[0], 2, 60, 100)\n    # \u4EBA\u7C7B\uFF1F: F over E, gong, roll\n    hit(b, B(10), 'F', 124, 0.3, cym=True, gong=True)\n    b['cb'].note(B(10), 0.3, 'E1', 124)\n    roll(b, B(10) + 0.1, B(11) - 0.02, 50, 122, timp='E3')\n    b['cymroll'].note(B(10) + 0.05, 1, 60, 110)\n    # EPISODE card (gated to a tremolo), then the title hit and theme A\n    b['trem'].chord(B(11), 2 * BEAT, 'E5 B5', 100).ramp(B(11), B(11, 2), 11, 40, 127)\n    b['cymroll'].note(B(11) - 0.3, 1, 60, 118)\n    hit(b, B(11, 2), 'Em', 126, 0.4, cym=True, gong=True)\n    b['hn'].chord(B(11, 2), 2 * BEAT, 'E3 B3 E4', 116)\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 12 + i\n        groove(b, B(bar), c, vel=106)\n        melody(b, B(bar), notes, [('hn', 0), ('tbn', -12)], vel=114)\n        for p in (1.5, 3.5):\n            b['tpt'].chord(B(bar, p), 0.12, [k + 12 for k in ns(CHORDS[c][2])[1:]], 102)\n        if i in (0, 4):\n            b['cym'].note(B(bar), 2, 60, 116)\n    # two sides, HUMAN.md: a stab on each card; the lines inside land on the groove's low hits\n    knock(b, H('twosides')[0], 'C', 116, cym=True)\n    knock(b, H('humanmd')[0], 'A', 118, cym=True)\n    # the five questions: a stab per card (3 + 3 + 3 + 3 + 4 eighths across Em | F)\n    for t in H('asks'):\n        knock(b, t, 'Em' if t < B(17) else 'F', 116, cym=(t == H('asks')[0]))\n    # MEMORY, then HUMAN.md\n    b['cym'].note(H('memory')[0], 2, 60, 104)\n    hit(b, H('memory')[1], 'Em', 120, 0.3, cym=True)\n    # MAGI round 1: bright C, the panels approve one by one, the owner lands\n    mg = H('magi')\n    groove(b, B(20), 'C', vel=108)\n    b['cym'].note(mg[0], 2, 60, 116)\n    for i in range(3):\n        b['tpt'].chord(mg[1] + i * BEAT / 4, 0.08, 'E5 G5', 116)\n    knock(b, mg[2], 'C', 112)\n    # round 2: the clash, the handover, alarm trumpets on the dominant\n    hit(b, mg[3], 'F', 122, 0.3, cym=True)\n    b['cb'].note(mg[3], 0.3, 'E1', 122)\n    groove(b, B(21), 'B', vel=112, low_brass=False)\n    for i in range(3):\n        b['tpt'].chord(mg[4] + i * BEAT / 4, 0.08, 'F5 B5', 120)\n    knock(b, mg[5], 'B', 120)\n    groove(b, B(22), 'B', vel=114)\n    for i in range(8):\n        b['tpt'].chord(B(22, i * 0.5), 0.12, 'B4 D#5', 108 + i * 2)\n    roll(b, B(22, 2), B(23) - BEAT / 4, 60, 124)\n    # two layers: theme B; each layer's caption gets a stroke\n    for i, (c, notes) in enumerate(THEME_B):\n        bar = 23 + i\n        groove(b, B(bar), c, vel=110)\n        melody(b, B(bar), notes, [('tpt', 0)], vel=120)\n        b['hn'].chord(B(bar), BAR * 0.97, CHORDS[c][2], 100)\n        b['vln'].chord(B(bar), BAR * 0.97, [k + 12 for k in ns(CHORDS[c][2])[1:3]], 96)\n        if i in (0, 2):\n            b['cym'].note(B(bar), 2, 60, 120)\n    lh = H('layers')\n    for t, c in ((lh[6], 'D'), (lh[12], 'B')):\n        b['timp'].note(t, 0.4, n(CHORDS[c][0]) + 24, 116)\n        b['bd'].note(t, 0.3, 60, 116)\n        b['cym'].note(t, 1.5, 60, 96)\n    # collaboration evolves: theme A returns, lighter; a crash on the first quote\n    for i in range(3):\n        c, notes = THEME_A[i]\n        groove(b, B(27 + i), c, vel=100, low_brass=i > 0)\n        melody(b, B(27 + i), notes, [('hn', 0), ('vln', 12)], vel=110)\n    for t in H('evolve')[0::2]:  # a crash on each quote\n        b['cym'].note(t, 2, 60, 106)\n    for t in H('evolve')[1::2]:\n        b['timp'].note(t, 0.3, 'B3', 96)\n    # control: one hit per intertitle, then the banner on the dominant\n    ct = H('control')\n    for k, c in enumerate(['Em', 'C', 'D', 'B']):\n        hit(b, ct[k], c, 110 + k * 4, 0.25, cym=(k == 0))\n    pad(b, ct[4], BAR, 'B', 112)\n    b['cym'].note(ct[4], 2, 60, 118)\n    b['hn'].ramp(ct[4], B(32), 11, 60, 127)\n    roll(b, ct[4] + BEAT, B(32) - BEAT / 4, 50, 118, timp='B2')\n    # interface: breakdown under the two cards, then build into the montage from the field\n    it = H('interface')\n    groove(b, B(32), 'Em', vel=88, strings=False, low_brass=False)\n    groove(b, B(33), 'Em', vel=92, low_brass=False)\n    hit(b, it[0], 'Em', 118, 0.3)\n    for t in it[:2]:\n        b['timp'].note(t, 0.5, 'E3', 118)\n        b['bd'].note(t, 0.5, 60, 120)\n        b['cb'].note(t, 0.3, 'E1', 118)\n    hit(b, it[2], 'Em', 116, 0.3, cym=True)\n    b['tbn'].chord(B(34), BAR, 'E2 B2', 110).ramp(B(34), B(35), 11, 30, 127)\n    b['trem'].chord(B(34), BAR, 'E5 B5', 100).ramp(B(34), B(35), 11, 30, 127)\n    roll(b, B(34) + BEAT, B(35) - BEAT / 4, 30, 126, timp='E3')\n    b['cymroll'].note(B(34, 0.8), 1, 60, 124)\n    # montage: theme A tutti, a crash on every new screen\n    for i, (c, notes) in enumerate(THEME_A):\n        bar = 35 + i\n        groove(b, B(bar), c, vel=116)\n        melody(b, B(bar), notes, [('tpt', 0), ('hn', 0), ('tbn', -12), ('vln', 12)], vel=124)\n    mo = H('montage')\n    for k in (0, 3, 4, 5, 9, 10):\n        bar = round((mo[k] - B(35)) / BAR)\n        hit(b, mo[k], THEME_A[bar][0], 124, 0.2, cym=True)\n    # finale: a solo horn over low strings, a swell, HUMAN., \u266DVI \u2013 \u266DVII \u2013 I\n    b['vc'].chord(B(43), 2 * BAR, 'E2 B2', 64)\n    b['cb'].note(B(43), 2 * BAR, 'E1', 66)\n    b['hn'].note(B(43), 2 * BEAT, 'E4', 86).note(B(43, 2), 2 * BEAT, 'B4', 86)\n    b['timp'].note(B(44), 0.5, 'E3', 70)\n    b['hn'].chord(B(44), BAR, 'E3 G3 C4', 80).ramp(B(44), B(45), 11, 40, 120)\n    b['vln'].chord(B(44), BAR, 'E4 G4 C5', 64)\n    roll(b, B(44, 2), B(45) - BEAT / 4, 30, 112, timp='E3')\n    hit(b, B(45), 'Em', 127, 0.5, cym=True, gong=True)\n    pad(b, B(46), BAR, 'C', 104)\n    b['cym'].note(B(46), 2, 60, 104)\n    pad(b, B(47), BAR, 'D', 108)\n    b['cym'].note(B(47), 2, 60, 108)\n    b['hn'].ramp(B(47), B(48), 11, 70, 127)\n    roll(b, B(47, 2), B(48) - BEAT / 4, 50, 124, timp='D3')\n    final(b, B(48), 'E', hold=5.8)\n    # release: a quiet E major while the logo draws, a lift when it fills, then the credit\n    rl = H('release')\n    b['hn'].chord(rl[0], 2 * BAR, 'E3 G#3 B3', 78)\n    b['vln'].chord(rl[0], 2 * BAR, 'G#4 B4 E5', 70)\n    b['cb'].note(rl[0], 2 * BAR, 'E1', 80)\n    b['timp'].note(rl[0], 0.5, 'E3', 70)\n    b['tpt'].chord(rl[1], BAR, 'G#4 B4 E5', 92)\n    b['timp'].note(rl[1], 0.5, 'E3', 96)\n    b['cym'].note(rl[1], 2, 60, 88)\n    cr = H('credit')[0]\n    b['hn'].chord(cr, 1.5 * BAR, 'E3 B3 E4', 70)\n    b['cb'].note(cr, 0.3, 'E1', 90)\n    b['timp'].note(cr, 0.5, 'E2', 84)\n    gates = [(B(11), B(11, 2), -60, {'violins-trem', 'cym-roll'}),\n             (B(43), B(45), -40, {'celli', 'basses', 'horns', 'violins', 'timpani', 'snare', 'ui', 'sub'})]\n    curve = [(0, -14), (B(2), -5), (B(6) - .05, -5), (B(6), -9), (B(8), -6), (B(10), -2), (B(12), -3), (B(20), -2), (B(23), -1.5),\n             (B(27), -4), (B(30), -2), (B(32) - .05, -1), (B(32), -3), (B(32) + .3, -9), (B(34), -4), (B(35), 0), (B(43) - .05, 0), (B(43), -12), (B(44), -10), (B(45) - .05, -6), (B(45), 0), (B(46), -3), (B(48), 0), (B(52), -6)]\n    # a sixteenth of breath before the hits that land inside running music, so they read as cuts\n    breaths = [(t - BEAT / 4, t, -8, ()) for t in H('asks') + ct[1:4] + it[:1] + [mo[k] for k in (3, 4, 5, 9, 10)]]\n    return mix(list(b.values()) + common_sfx(), LEN, master=master_chain(), fade_out=2.5, gates=gates,\n               master_gates=[(B(11) + 0.01, B(11, 2) - 0.2, -10, ()), (B(43) + 0.02, B(44) - 0.1, -7, ())] + breaths, curve=curve, **MIXFX)\n\n\nif __name__ == '__main__':\n    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(os.path.dirname(os.path.abspath(PROJECT)), 'audio', 'episode-2.12-score.mp3')\n    x = match_loudness(score())\n    print(f'{write_audio(x, out)} \xB7 {len(x) / 48000:.1f} s')\n", "score_template.py": "\"\"\"A first score for any Forsion Video Studio project with a tempo: the \u51B3\u6218 II march under the whole\ntimeline, a stab on every hit, a breath before hits that land inside running music, a final chord.\n\nCopy it next to the project and make it yours: pick chords per scene, drop the groove where the picture\ngoes quiet, give the big cuts hit(..., cym=True, gong=True) and the small ones knock(). Keep melodies original.\n\n    python3 score_template.py path/to/video.fvs.md [--out audio/score.mp3]\n    node ../fvs.mjs sync path/to/video.fvs.md\n\"\"\"\nimport math\nimport os\nimport sys\nimport battle\nfrom battle import band, groove, melody, hit, knock, roll, final, THEME_A, master_chain, MIXFX, match_loudness\nfrom engine import mix\nfrom cues import Cues, write_audio\n\nPROJECT = next((a for a in sys.argv[1:] if not a.startswith('--')), None)\nif not PROJECT:\n    sys.exit(__doc__)\nC = Cues.load(PROJECT)\nif not C.bpm:\n    sys.exit('this project has no tempo; add \"tempo\": { \"bpm\": 120 } to its settings')\nbattle.set_tempo(C.bpm)\nBEAT, BAR = C.beat, C.bar\n\n\ndef chord_at(t):\n    \"\"\"Theme A's harmony, one chord per bar, looping every eight bars.\"\"\"\n    return THEME_A[int(t // BAR) % len(THEME_A)][0]\n\n\ndef score():\n    b = band()\n    last = C.scenes[-1]\n    end = last['t0']  # the last scene holds the final chord\n    first = C.scenes[0]\n    # an opening roll into the first bar line after the first scene\n    roll(b, 0, min(first['t1'], 2 * BAR) - BEAT / 4, 20, 110, timp='E3')\n    bars = math.ceil(end / BAR)\n    for k in range(bars):\n        t = k * BAR\n        if t < first['t1']:\n            continue\n        chord, notes = THEME_A[k % len(THEME_A)]\n        groove(b, t, chord, vel=104)\n        if k % 16 >= 8:  # the melody in the second half of every sixteen bars\n            melody(b, t, notes, [('hn', 0), ('tbn', -12)], vel=112)\n    breaths = []\n    for s in C.scenes:\n        for i, t in enumerate(s['hitTimes']):\n            if t >= end:\n                continue\n            if i == 0:\n                hit(b, t, chord_at(t), vel=118, dur=0.25, cym=True)\n            else:\n                knock(b, t, chord_at(t), vel=112)\n            if t > first['t1'] and (t % BAR) > 1e-6:\n                breaths.append((t - BEAT / 4, t, -8, ()))\n    final(b, end, 'E', hold=max(1.0, min(5.0, last['t1'] - end - .3)))\n    return mix(list(b.values()), C.length, master=master_chain(), fade_out=min(2.0, (last['t1'] - end) / 2), master_gates=breaths, **MIXFX)\n\n\nif __name__ == '__main__':\n    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(os.path.dirname(os.path.abspath(PROJECT)), 'audio', 'score.mp3')\n    x = match_loudness(score())\n    print(f'{write_audio(x, out)} \xB7 {len(x) / 48000:.1f} s')\n" };

  // src/ui/ai.js
  var AGENT = "fvs-director";
  var TOOLS_VERSION = "0.7.0";
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

  // node_modules/lucide/dist/esm/icons/globe.mjs
  var Globe = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }]
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

  // node_modules/lucide/dist/esm/icons/maximize-2.mjs
  var Maximize2 = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "m21 3-7 7" }],
    ["path", { d: "m3 21 7-7" }],
    ["path", { d: "M9 21H3v-6" }]
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
    PanelBottom
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
        }, onSubmit: (selection) => submit(selection) });
        chat.focus();
      } else {
        textarea = h("textarea", { class: "fvs-input", "aria-label": t2("ai-title"), placeholder: t2("ai-placeholder") });
        textarea.value = draft.text;
        textarea.oninput = () => {
          draft.text = textarea.value;
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
    return { mount, dispose() {
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
  function place(layer, anchor, align) {
    const r = anchor.getBoundingClientRect(), z = layer.currentCSSZoom || 1;
    const w = layer.offsetWidth * z, ht = layer.offsetHeight * z, vw = window.innerWidth, vh = window.innerHeight;
    let x = align === "end" ? r.right - w : r.left;
    x = Math.max(8, Math.min(x, vw - w - 8));
    let y = r.bottom + 6;
    if (y + ht > vh - 8 && r.top - 6 - ht > 8) y = r.top - 6 - ht;
    y = Math.max(8, Math.min(y, vh - ht - 8));
    layer.style.left = "".concat(x / z, "px");
    layer.style.top = "".concat(y / z, "px");
  }
  function mountLayer(anchor, layer, { align = "start", onClose } = {}) {
    closeLayer();
    layer.classList.add("fvs-layer");
    document.body.append(layer);
    place(layer, anchor, align);
    anchor.setAttribute("aria-expanded", "true");
    const outside = (e) => {
      if (!layer.contains(e.target) && !anchor.contains(e.target)) closeLayer();
    };
    const scroll = (e) => {
      if (!layer.contains(e.target)) closeLayer();
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
  function openMenu(anchor, items, { label = "", align = "start" } = {}) {
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
    const handle = mountLayer(anchor, menu, { align });
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
  var KIND = (name) => /\.(mp4|m4v|webm|mov)$/i.test(name) ? "video" : /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(name) ? "image" : /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(name) ? "audio" : /\.(srt|vtt)$/i.test(name) ? "captions" : null;
  var MOD = /Mac|iPhone|iPad/.test(globalThis.navigator?.userAgent || "") ? "\u2318" : "Ctrl+";
  var RULER_H = 24;
  var CAPTION_H = 32;
  var VIDEO_H = 64;
  var AUDIO_H = 44;
  var inspectorPref = true;
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
  function mountStudio(ctx2, el, path, t2, opts = {}) {
    const app2 = ctx2.app;
    const nativeInspector = !!opts.view?.extendView && !opts.compact;
    let inspectorHandle = null, askHandle = null, exportHandle = null;
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
    const inspectorToggle = tool("PanelRight", "toggle-properties", () => toggleInspector());
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
    view.append(errBox);
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
      h("div", { class: "fvs-tl-tools" }, splitBtn, dupBtn, delBtn, h("span", { class: "fvs-tl-sep" }), addBtn, capBtn, importBtn, fileInput),
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
    const lanes = h("div", { class: "fvs-tl-lanes" });
    const head = h("div", { class: "fvs-tl-head" });
    inner.append(ruler, capLane, clips, lanes, head);
    scroller.append(inner);
    const rulerLabel = h("span", { class: "fvs-rail-ruler" });
    const audioRail = h("div", { class: "fvs-rail-audio" });
    const trackRail = h(
      "div",
      { class: "fvs-track-rail" },
      rulerLabel,
      h("div", { class: "fvs-rail-captions" }, icon("Captions"), h("span", { text: t2("captions-track") })),
      h("div", { class: "fvs-rail-video" }, icon("Film"), h("span", { text: t2("video-track") })),
      audioRail
    );
    const resizeHandle = h("div", { class: "fvs-tl-resize", role: "separator", tabindex: "0", "aria-orientation": "horizontal", "aria-label": t2("resize-timeline"), "aria-valuemin": "150" });
    resizeHandle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const y = e.clientY, height = timelineHeight();
      listenDrag((ev) => resizeTimeline(height + y - ev.clientY), () => {
      });
    });
    resizeHandle.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      e.stopPropagation();
      resizeTimeline(timelineHeight() + (e.key === "ArrowUp" ? 20 : -20));
    });
    const tlBody = h("div", { class: "fvs-tl-body" }, trackRail, scroller);
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
      const x = Math.max(0, Math.min(scroller.clientWidth, e.clientX - scroller.getBoundingClientRect().left));
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
    const lanesHeight = () => RULER_H + CAPTION_H + VIDEO_H + AUDIO_H * Math.max(1, laneTracks().length) + 10;
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
      const open = force ?? !(nativeInspector ? inspectorHandle?.isOpen : S.inspectorOpen);
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
    function openInspector({ quiet = false, focusKey = null } = {}) {
      if (!nativeInspector || S.disposed) return;
      if (inspectorHandle?.isOpen) {
        if (focusKey) panel.querySelector('[data-key="'.concat(CSS.escape(focusKey), '"]'))?.focus();
        return;
      }
      S.focus = false;
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
            if (reason === "dismiss") inspectorPref = false;
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
      if (quiet || focusKey) {
        const target = () => focusKey ? panel.querySelector('[data-key="'.concat(CSS.escape(focusKey), '"]')) : before && before !== document.body && before.isConnected ? before : root;
        const off = () => {
          clearTimeout(timer);
          side.removeEventListener("focusin", back);
          side.removeEventListener("pointerdown", off);
        };
        const back = () => {
          off();
          const x = target();
          if (x && x !== document.activeElement) {
            x.focus({ preventScroll: true });
            if (focusKey) x.select?.();
          }
        };
        const timer = setTimeout(off, 1500);
        side.addEventListener("focusin", back);
        side.addEventListener("pointerdown", off);
      }
      layout();
    }
    function restoreInspector() {
      setTimeout(() => {
        if (!S.disposed && nativeInspector && inspectorPref && !S.focus && !inspectorHandle?.isOpen) openInspector({ quiet: true });
      });
    }
    const sidePanelClosed = (reason) => {
      if (reason === "close" || reason === "dismiss") restoreInspector();
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
      S.text = S.saved = text;
      setStatus("saved");
      reparse();
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
      S.p = parseProject(S.text);
      if (S.sel && !sceneById(S.p, S.sel)) S.sel = S.p.scenes[0] ? S.p.scenes[0].id : null;
      if (S.selCap !== null && !S.p.captions[S.selCap]) S.selCap = null;
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
      if (a && a !== document.body && (root.contains(a) || side.contains(a)) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) a.blur();
    }
    let unwatch = null, poll = 0, banner = null;
    function watch() {
      if (app2.watchFile) unwatch = app2.watchFile(path, () => external());
      else poll = setInterval(external, 2e3);
    }
    async function external() {
      if (saving) {
        try {
          await saving;
        } catch {
        }
      }
      let disk = null;
      try {
        disk = await app2.readFile(path);
      } catch {
        disk = null;
      }
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
      if (typeof next !== "string" || next === S.text) return;
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
      if (!m.scene) return;
      S.sel = m.scene;
      S.selCap = null;
      S.selHit = null;
      if (m.text != null) S.selText = { scene: m.scene, index: m.text };
      renderTimeline();
      renderToolbar();
      if (!m.dbl) root.focus({ preventScroll: true });
      if (!opts.compact && m.dbl && m.text != null && textsMatch(m.scene)) openInline(m);
      else if (!opts.compact && m.dbl && m.img != null) {
        S.tab = "scene";
        toggleInspector(true);
        renderSide();
      } else if (S.tab === "text" || S.tab === "scene") renderSide();
    }
    function openInline(m) {
      closeInline();
      const s = sceneById(S.p, m.scene);
      const run = scan(s.html).texts[m.text];
      if (!run) return;
      const vr = view.getBoundingClientRect();
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
        if (x < scroller.scrollLeft + 40 || x > scroller.scrollLeft + scroller.clientWidth - 40) scroller.scrollLeft = x - 60;
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
    async function analyse(track2) {
      const key = S.audioKey;
      const d = await decode2(joinPath(dirOf2(path), track2.src));
      if (!d || S.disposed || key !== S.audioKey) return;
      const at = track2.at || 0, from = Math.round((track2.in || 0) * d.sr);
      const to = track2.dur != null ? Math.min(d.mono.length, from + Math.round(track2.dur * d.sr)) : d.mono.length;
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
        const x = (e.clientX - c.lane.getBoundingClientRect().left) / (S.zoom || 20);
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
      head.style.left = "".concat(S.time * Z, "px");
      renderCaptions();
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
      delBtn.disabled = !s && !S.selHit && S.selCap === null;
    }
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
          const lane = h("div", { class: "fvs-lane", style: { top: "".concat(RULER_H + CAPTION_H + VIDEO_H + i * AUDIO_H, "px") } }, region);
          region.addEventListener("pointerdown", (e) => dragTrack(e, i));
          lane.addEventListener("pointerdown", (e) => {
            if (e.target === lane) scrub(e);
          });
          const label = h("div", { class: "fvs-rail-lane" }, icon("Music2"), h("span"));
          lanes.append(lane);
          audioRail.append(label);
          laneEls.push({ lane, region, canvas, label });
        }
      }
      laneEls.forEach((L, i) => {
        const tr = tracks[i];
        L.label.querySelector("span").textContent = tr && i !== score ? t2("audio-track-n", { n: i + 1 }) : t2("audio-track");
        L.label.title = tr ? tr.src : t2("sync-none");
        L.region.hidden = !tr;
        L.lane.classList.toggle("empty", !tr);
        if (!tr) {
          L.lane.dataset.hint = t2("drop-audio");
          return;
        }
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
      const r = inner.getBoundingClientRect();
      const go = (ev) => seek((ev.clientX - r.left) / (S.zoom || 20));
      go(e);
      listenDrag((ev) => go(ev), () => {
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
      const Z = S.zoom || 20, r = inner.getBoundingClientRect(), x0 = e.clientX;
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
        const at = (ev.clientX - r.left) / Z, others = S.p.scenes.filter((x) => x.id !== id);
        target = others.filter((x) => (x.t0 + x.t1) / 2 < at).length;
        ghost.style.left = "".concat((at - (x0 - r.left) / Z + s0.t0) * Z, "px");
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
          if (was === id) seek((ev.clientX - r.left) / Z);
          else if (S.time < s.t0 || S.time >= s.t1) seek(s.t0);
          renderTimeline();
          renderSide();
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
      const Z = S.zoom || 20, r = inner.getBoundingClientRect(), edge = e.currentTarget;
      const ghost = h("div", { class: "fvs-tl-ghost", style: { left: "".concat(s.t0 * Z, "px"), width: "".concat(s.dur * Z, "px") } });
      inner.append(ghost);
      edge.classList.add("drag");
      let len = s.dur;
      const move = (ev) => {
        len = Math.max(grid(), snapT((ev.clientX - r.left) / Z) - s.t0);
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
      const Z = S.zoom || 20, r = inner.getBoundingClientRect(), edge = e.currentTarget;
      const prev = S.p.scenes[s.index - 1], content0 = s.t0 - (s.in || 0);
      const ghost = h("div", { class: "fvs-tl-ghost", style: { left: "".concat(s.t0 * Z, "px"), width: "".concat(s.dur * Z, "px") } });
      inner.append(ghost);
      edge.classList.add("drag");
      let delta = 0, ripple = false;
      const move = (ev) => {
        ripple = ev.altKey || !prev;
        const lo = Math.max(content0, ripple ? -Infinity : prev.t0 + grid()), hi = s.t1 - grid();
        const t0 = Math.max(lo, Math.min(hi, snapT((ev.clientX - r.left) / Z)));
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
      root.querySelectorAll(".fvs-hitm.on").forEach((x) => x.classList.remove("on"));
      m.classList.add("on");
      renderToolbar();
      const Z = S.zoom || 20, r = inner.getBoundingClientRect(), u = hitUnit(S.p.tempo), base = s.t0v ?? s.t0;
      let at = s.hitTimes[i], moved = false;
      const move = (ev) => {
        moved = true;
        at = Math.max(s.t0, Math.min(s.t1, snapT((ev.clientX - r.left) / Z)));
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
        at = Math.max(0, snapT(at0 + (ev.clientX - x0) / Z));
        region.style.left = "".concat(at * Z, "px");
      };
      const up = (ev) => {
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
      if (e.target === capLane) addCaption(snapT((e.clientX - inner.getBoundingClientRect().left) / (S.zoom || 20)));
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
        S.tab = "captions";
        root.querySelectorAll(".fvs-cap.on, .fvs-clip.on, .fvs-hitm.on").forEach((x) => x.classList.remove("on"));
        el2.classList.add("on");
        renderSide();
        renderToolbar();
      }
      let start = c0.start, end = c0.end, moved = false;
      const move = (ev) => {
        if (!moved && Math.abs(ev.clientX - x0) < 4) return;
        moved = true;
        const dx = (ev.clientX - x0) / Z;
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
      const key = "cap:".concat(i, ":text"), field_ = () => panel.querySelector('[data-key="'.concat(key, '"]'));
      if (nativeInspector) {
        inspectorPref = true;
        if (!inspectorHandle?.isOpen) {
          openInspector({ focusKey: key });
          return;
        }
      } else if (!opts.compact && !S.inspectorOpen) {
        S.inspectorOpen = true;
        S.focus = false;
        layout();
      }
      const ta = field_();
      if (ta) {
        ta.focus();
        ta.select();
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
        const taken = existing ? existing.has(vp) : await app2.readBytes?.(vp).catch(() => null) != null;
        if (!taken) return rel;
      }
      throw new Error("no free name for ".concat(name));
    }
    function mediaDuration(file) {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file), v = document.createElement("video");
        const done = (x) => {
          clearTimeout(timer);
          URL.revokeObjectURL(url);
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
    let imports = Promise.resolve();
    function importFiles(files, afterId) {
      const job = imports.then(() => importBatch(files, afterId));
      imports = job.catch(() => {
      });
      return job;
    }
    async function importBatch(files, afterId) {
      if (!files.length || S.disposed) return;
      let existing = null;
      try {
        const list2 = await app2.listFiles?.();
        existing = list2 ? new Set(list2) : null;
      } catch {
        existing = null;
      }
      let after = afterId !== void 0 ? afterId : insertAfter(), added = null, tracks = 0;
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
          const rel = await freeRel(kind === "audio" ? "audio" : "media", sanitize(file.name), existing);
          await app2.writeBytes(joinPath(dirOf2(path), rel), new Uint8Array(await file.arrayBuffer()));
          existing?.add(joinPath(dirOf2(path), rel));
          if (kind === "audio") {
            const list2 = rawTracks();
            if (tryCommit((src) => setProjectMeta(src, { audio: [...list2, { src: rel, role: list2.length ? "track" : "score" }] }))) tracks++;
            continue;
          }
          const seconds = kind === "video" ? await mediaDuration(file) : 0;
          const id = freeId(S.p, kind === "video" ? "clip" : "picture");
          const scene = mediaScene({ id, title: file.name.replace(/\.[^.]+$/, ""), src: rel, kind, seconds: seconds || 5, tempo: S.p.tempo });
          if (tryCommit((src) => insertScene(src, after, scene))) {
            after = id;
            added = id;
          }
        } catch (e) {
          notify(ctx2, String(e && e.message || e), "warn");
        }
      }
      if (added) selectScene(added);
      if (added || tracks) notify(ctx2, t2("imported"));
    }
    let dropHint = null;
    const hasFiles = (e) => [...e.dataTransfer?.types || []].includes("Files");
    root.addEventListener("dragover", (e) => {
      if (!hasFiles(e) || opts.compact) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      root.classList.add("dropping");
      if (scroller.contains(e.target)) {
        const Z = S.zoom || 20, x = (e.clientX - inner.getBoundingClientRect().left) / Z;
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
    });
    const endDrop = () => {
      root.classList.remove("dropping");
      dropHint?.remove();
      dropHint = null;
    };
    root.addEventListener("dragleave", (e) => {
      if (!root.contains(e.relatedTarget)) endDrop();
    });
    root.addEventListener("drop", (e) => {
      if (!hasFiles(e) || opts.compact) return;
      e.preventDefault();
      const k = dropHint ? +dropHint.dataset.index : null;
      endDrop();
      const afterId = k === null ? void 0 : k === 0 ? "" : S.p.scenes[k - 1].id;
      void importFiles([...e.dataTransfer.files], afterId);
    });
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
            void handOff(ctx2, S, TASKS.sync(), t2);
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
        { icon: "Music2", label: t2("score"), hint: t2("score-hint"), run: () => void handOff(ctx2, S, TASKS.score(), t2) },
        { icon: "Eye", label: t2("ai-chip-review"), run: () => void handOff(ctx2, S, TASKS.review(), t2) }
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
    const director = directorController(ctx2, () => S, t2, flush);
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
    function openAsk() {
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
      if (!s) return [h("div", { class: "fvs-empty" }, icon("MousePointerClick"), h("p", { text: t2("scene-none") }))];
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
          rows.push(h(
            "div",
            { class: "fvs-timed" },
            h("span", { class: "lbl", title: x.label, text: x.seq !== void 0 ? "".concat(x.label, " \xB7 seq") : x.label }),
            input("tin:".concat(s.id, ":").concat(x.tag), x.seq !== void 0 ? x.seq : x.in ?? "", (v) => setA(x.tag, x.seq !== void 0 ? "data-seq" : "data-in", v.trim()), { "aria-label": t2("appear") }),
            input("tout:".concat(s.id, ":").concat(x.tag), x.out ?? "", (v) => setA(x.tag, "data-out", v.trim()), { "aria-label": t2("disappear") }),
            fx
          ));
        }
        out.push(section(t2("timed"), h("small", { class: "fvs-hint", text: t2("timed-hint") }), ...rows));
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
        const rel = await freeRel("media", sanitize(file.name), null);
        await app2.writeBytes(joinPath(dirOf2(path), rel), new Uint8Array(await file.arrayBuffer()));
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
      if (!scenes.length) return [h("div", { class: "fvs-empty" }, icon("MousePointerClick"), h("p", { text: t2("scene-none") }))];
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
        { class: "fvs-track-card" },
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
      out.push(section(
        t2("project-audio"),
        ...rows.length ? rows : [h("p", { class: "fvs-hint", text: t2("sync-none") })],
        h(
          "div",
          { class: "fvs-row" },
          file,
          h("button", { type: "button", class: "fvs-btn", disabled: !app2.writeBytes, onclick: () => file.click() }, icon("Plus"), t2("audio-add")),
          tracks.length ? h("button", { type: "button", class: "fvs-btn ghost", onclick: (e) => openSync(e.currentTarget) }, t2("sync")) : null
        )
      ));
      const probs = [...S.p.errors, ...S.runtimeErrors.map((e) => ({ level: "error", ...e }))];
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
    let dockShell = null, dockKeys = null;
    const undock = opts.dock?.studio({
      timeline,
      attach(shell) {
        if (dockShell) {
          dockShell.removeEventListener("keydown", onKey);
          dockShell.removeEventListener("pointerdown", dockKeys);
        }
        dockShell = shell;
        dockKeys = shell ? keepKeys(shell) : null;
        if (shell) {
          shell.addEventListener("keydown", onKey);
          shell.addEventListener("pointerdown", dockKeys);
        }
        dockStrip.hidden = !!shell;
        if (!S.disposed) layout();
      }
    });
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
    load();
    raf = requestAnimationFrame(loop);
    const dispose = () => {
      commitFocusedField();
      S.disposed = true;
      closeLayer();
      closeInlinePanel();
      thumbs.dispose();
      exports.dispose();
      director.dispose();
      exportHandle?.close();
      inspectorHandle?.close();
      askHandle?.close();
      cancelAnimationFrame(raf);
      clearTimeout(previewTimer);
      clearTimeout(pendingTimer);
      if (S.text !== S.saved) save();
      if (unwatch) unwatch();
      clearInterval(poll);
      window.removeEventListener("message", onMessage);
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
  var FONTS = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&display=swap";
  var HEAD = (title, zh) => "# ".concat(title, "\n\n").concat(zh ? "\u8FD9\u662F\u4E00\u4E2A Forsion Video Studio \u5DE5\u7A0B\u6587\u4EF6\u3002\u573A\u666F\u6309\u987A\u5E8F\u9996\u5C3E\u76F8\u63A5\u5730\u64AD\u653E\uFF1B\u6BCF\u4E2A\u573A\u666F\u7684 `hits` \u662F\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u62CD\u70B9\uFF0C\u753B\u9762\u7684\u5207\u70B9\u548C\u914D\u4E50\u7684\u91CD\u97F3\u90FD\u4ECE\u8FD9\u91CC\u8BFB\u3002\u7528 Video Studio \u6253\u5F00\u53EF\u4EE5\u76F4\u63A5\u6539\u6587\u5B57\u3001\u62D6\u65F6\u95F4\u7EBF\uFF1B\u4E5F\u53EF\u4EE5\u8BA9 AI \u6309\u8FD9\u4EFD\u6587\u4EF6\u7684\u5199\u6CD5\u7EE7\u7EED\u5199\u3002" : "A Forsion Video Studio project. Scenes play back to back in document order; each scene's `hits` are beats from its start, and both the picture cuts and the score's accents read them. Open it in Video Studio to edit the text and the timeline, or ask the AI to keep writing it.", "\n");
  var EVA_CSS = "/* Title cards in the manner of an EVA intertitle: black, heavy serif, hard cuts on the beat. */\n.fvs-eva { --ink: #f2f0ea; --red: #e3161b; --orange: #ff6a13; --green: #38ff8b; color: var(--ink); font-family: 'Noto Serif SC', 'Songti SC', serif; }\n.fvs-eva .card { position: absolute; inset: 0; background: #000; }\n.fvs-eva .card.inv { background: var(--ink); color: #000; }\n.fvs-eva .k { position: absolute; font-weight: 900; line-height: 1; white-space: nowrap; transform: scaleX(.8); transform-origin: 0 0; }\n.fvs-eva .k.mid { left: 0; right: 0; text-align: center; transform-origin: 50% 0; }\n.fvs-eva .e { position: absolute; font: 700 44px/1.3 'Barlow Condensed', sans-serif; letter-spacing: .22em; white-space: nowrap; }\n.fvs-eva .e.mid { left: 0; right: 0; text-align: center; }\n.fvs-eva .red { color: var(--red); }\n.fvs-eva .hud { position: absolute; inset: 0; background: #000; color: var(--orange); font-family: 'Barlow Condensed', sans-serif; }\n.fvs-eva .top { position: absolute; left: 90px; right: 90px; top: 60px; height: 70px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--orange); font: 700 38px 'Barlow Condensed', sans-serif; letter-spacing: .16em; }\n.fvs-eva .term { position: absolute; left: 90px; top: 220px; display: grid; gap: 14px; }\n.fvs-eva .term p { margin: 0; font: 500 44px/1.4 'JetBrains Mono', monospace; color: var(--green); white-space: pre; }\n.fvs-eva .grain { position: absolute; inset: 0; pointer-events: none; background-size: 200px 200px; opacity: .06; mix-blend-mode: screen; }";
  function evaTemplate({ title = "\u65B0\u89C6\u9891", zh = true } = {}) {
    return "".concat(HEAD(title, zh), '\n```fvs\n{\n  "fvs": 1,\n  "title": ').concat(JSON.stringify(title), ',\n  "width": 1920,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 120, "beatsPerBar": 4 },\n  "class": "fvs-eva",\n  "fonts": [').concat(JSON.stringify(FONTS), '],\n  "audio": []\n}\n```\n\n```css\n').concat(EVA_CSS, '\n```\n\n```html stage\n<div data-fvs-scenes></div>\n<div class="grain"></div>\n<div data-fvs-flash></div>\n```\n\n```js stage\ngrain(\'.grain\')\n```\n\n## boot \xB7 \u542F\u52A8\n\n```fvs\n{ "length": "2 bars", "hits": [0, 1, 2, 3, 4, 6] }\n```\n\n```html\n<div class="hud">\n  <div class="top"><span>FORSION VIDEO STUDIO</span><span class="red">\u25CF REC</span></div>\n  <div class="term">\n    <p data-in="h1" data-fx="type">SCENES ........ OK</p>\n    <p data-in="h2" data-fx="type">TIMELINE ...... OK</p>\n    <p data-in="h3" data-fx="type">SCORE ......... OK</p>\n    <p data-in="h4" data-fx="type" class="red">HUMAN ......... ??</p>\n  </div>\n</div>\n```\n\n## cards \xB7 \u6807\u9898\u5361\n\n```fvs\n{ "length": "2 bars", "hits": [0, 2, 4, 6] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="card"><span class="k" style="left:150px;top:260px;font-size:380px">\u7B2C\u4E00\u8BDD</span><span class="e" style="left:160px;top:760px">EPISODE ONE</span></div>\n  <div class="card"><span class="k" style="left:1500px;top:90px;font-size:300px;writing-mode:vertical-rl;transform:scaleY(.86)">\u5F00\u59CB</span><span class="e" style="left:150px;top:920px">BEGIN</span></div>\n  <div class="card inv"><span class="k mid" style="top:330px;font-size:360px">\u6539\u6587\u5B57</span></div>\n  <div class="card"><span class="e mid" style="top:380px;font-size:64px">EDIT THE TEXT, DRAG THE TIMELINE.</span><span class="k mid red" style="top:520px;font-size:120px">\u7136\u540E\u5BFC\u51FA\u3002</span></div>\n</div>\n```\n\n```js\n// a flash on the first cut; everything else in this scene is declarative (data-seq)\nflash(hits[0], .6)\n```\n\n## title \xB7 \u7247\u540D\n\n```fvs\n{ "length": "2 bars", "hits": [0, 4] }\n```\n\n```html\n<div class="card">\n  <span class="e" style="left:160px;top:150px;font-size:60px" data-in="h0">EPISODE 01</span>\n  <span class="k" style="left:140px;top:280px;font-size:420px" data-in="h1">').concat(title, "</span>\n</div>\n```\n\n```js\nflash(hits[1], .85)\n```\n");
  }

  // src/generated/example-src.js
  var example_src_default = { "text": '# \u7B2C 2.12 \u8BDD \xB7 \u4EBA\u7C7B\u8865\u5B8C\u8BA1\u5212\n\nForsion 2.12 \u7684\u5BA3\u4F20\u7247\uFF0C\u4E5F\u662F Forsion Video Studio \u7684\u793A\u4F8B\u5DE5\u7A0B\u3002EVA \u98CE\u683C\u7684\u81F4\u656C\uFF0C4:3\uFF0C150 BPM\uFF0C\u914D\u4E50\u662F\u539F\u521B\u7684\u300C\u51B3\u6218 II\u300D\u3002\n\n- \u573A\u666F\u6309\u987A\u5E8F\u9996\u5C3E\u76F8\u63A5\u5730\u64AD\u653E\uFF1B\u6BCF\u4E2A\u573A\u666F\u7684 `hits` \u662F\u4ECE\u573A\u666F\u5F00\u5934\u7B97\u8D77\u7684\u62CD\u70B9\u3002\u753B\u9762\u7684\u5207\u70B9\u4ECE\u8FD9\u91CC\u8BFB\uFF0C\u914D\u4E50\u7684\u91CD\u97F3\u4E5F\u6309\u540C\u4E00\u4EFD\u8868\u5199\uFF08`fvs cues` \u5BFC\u51FA\uFF09\u3002\n- \u7EAF\u6587\u5B57\u7684\u5361\u7247\u7528 `data-seq` / `data-in` \u58F0\u660E\uFF0C\u4E0D\u7528\u5199\u4EE3\u7801\uFF1B\u590D\u6742\u7684\u573A\u666F\u5199\u5728 `js` \u5757\u91CC\uFF0C\u80FD\u7528\u7684\u51FD\u6570\u89C1\u6280\u80FD\u8BF4\u660E\u3002\n- \u7D20\u6750\uFF1A`assets/` \u91CC\u662F\u4E09\u4E2A Agent \u7684\u5934\u50CF\uFF0C`audio/` \u91CC\u662F\u914D\u4E50\u3002\n\n```fvs\n{\n  "fvs": 1,\n  "title": "\u7B2C 2.12 \u8BDD \xB7 \u4EBA\u7C7B\u8865\u5B8C\u8BA1\u5212",\n  "lang": "zh-CN",\n  "width": 1440,\n  "height": 1080,\n  "fps": 30,\n  "tempo": { "bpm": 150, "beatsPerBar": 4 },\n  "class": "stage sb fb",\n  "background": "#000",\n  "fonts": ["https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@500;700;900&display=swap"],\n  "audio": [{ "src": "audio/episode-2.12-score.mp3", "role": "score" }]\n}\n```\n\n```css\n/* palette and type (from the promo\'s shared sheet) */\n:root {\n  --bg: #0e0d0c;\n  --panel: #171514;\n  --fg: #efebe7;\n  --muted: #a1968e;\n  --line: #2c2826;\n  --accent: #c9957a;\n\n  /* Study A \xB7 brand warm */\n  --a-paper: #f3ebe1;\n  --a-ink: #201915;\n  --a-copper: #bd866c;\n  --a-copper-soft: #debcaa;\n  --a-cream: #fbf2e9;\n  --a-muted: #8b7c70;\n  /* Study B \xB7 EVA homage */\n  --b-black: #000000;\n  --b-white: #f2f0ea;\n  --b-red: #e3161b;\n  --b-orange: #ff6a13;\n  --b-green: #38ff8b;\n  /* Study C \xB7 product cinema */\n  --c-stage: #0c0c0e;\n  --c-ui-bg: #f7f7f6;\n  --c-ui-card: #ffffff;\n  --c-ui-line: #e2e2e0;\n  --c-ui-text: #171717;\n  --c-ui-muted: #8a8a8a;\n  --c-ui-accent: #262626;\n  --c-gold: #a88427;\n\n  --f-display: \'Noto Serif SC\', \'Songti SC\', serif;\n  --f-body: \'Noto Sans SC\', \'Inter\', \'PingFang SC\', system-ui, sans-serif;\n  --f-ui: \'Inter\', \'Noto Sans SC\', system-ui, sans-serif;\n  --f-latin-serif: \'Instrument Serif\', \'Times New Roman\', serif;\n  --f-cond: \'Barlow Condensed\', \'Arial Narrow\', sans-serif;\n  --f-mono: \'JetBrains Mono\', ui-monospace, \'SFMono-Regular\', monospace;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 stage base \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.stage { position: absolute; left: 0; top: 0; transform-origin: 0 0; overflow: hidden; }\n.stage * { box-sizing: border-box; }\n.stage p, .stage h2, .stage h4, .stage ul { margin: 0; padding: 0; }\n.stage li { list-style: none; }\n.abs { position: absolute; }\n.grain { position: absolute; inset: 0; pointer-events: none; background-size: 200px 200px; }\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 B \xB7 \u7B2C 2.12 \u8BDD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.sb { width: 1440px; height: 1080px; background: var(--b-black); color: var(--b-white); font-family: var(--f-display); }\n.sb-card { position: absolute; inset: 0; background: var(--b-black); }\n.sb .k { position: absolute; font-weight: 900; line-height: 1; color: var(--b-white); white-space: nowrap; }\n.sb .e { position: absolute; font: 600 52px/1 var(--f-display); letter-spacing: .08em; color: var(--b-white); white-space: nowrap; }\n.sb-c1 .k { left: 110px; top: 250px; font-size: 340px; transform: scaleX(.8); transform-origin: 0 0; }\n.sb-c1 .e { left: 760px; top: 650px; }\n.sb-c2 .k { left: 1010px; top: 70px; font-size: 300px; writing-mode: vertical-rl; transform: scaleY(.86); transform-origin: 0 0; }\n.sb-c2 .e { left: 110px; top: 900px; }\n.sb-c3 .k { left: 0; right: 0; top: 330px; text-align: center; font-size: 380px; transform: scaleX(.78); }\n.sb-c3 .e { left: 0; right: 0; top: 190px; text-align: center; font-size: 46px; }\n.sb-c4 .k { left: 110px; top: 540px; font-size: 360px; transform: scaleX(.8); transform-origin: 0 0; }\n.sb-c4 .e { left: 118px; top: 420px; font-size: 48px; }\n.sb-c5 { background: var(--b-white); }\n.sb-c5 .k { left: 104px; top: 220px; font-size: 380px; color: var(--b-black); transform: scaleX(.8); transform-origin: 0 0; }\n.sb-c5 .q { position: absolute; left: 720px; top: 220px; font: 900 380px/1 var(--f-display); color: var(--b-red); transform: scaleX(.8); transform-origin: 0 0; }\n.sb-c5 .e { left: 112px; top: 760px; font: 700 64px/1 var(--f-cond); letter-spacing: .22em; color: var(--b-red); }\n.sb-hud { position: absolute; inset: 0; background: var(--b-black); color: var(--b-orange); font-family: var(--f-cond); }\n.sb-hex { position: absolute; inset: 0; opacity: .75; }\n.sb-top { position: absolute; left: 70px; right: 70px; top: 46px; height: 58px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--b-orange); font: 700 30px var(--f-cond); letter-spacing: .16em; }\n.sb-top .live { color: var(--b-red); }\n.sb-box { position: absolute; border: 2px solid rgba(255, 106, 19, .75); background: rgba(0, 0, 0, .78); }\n.sb-box .lbl { position: absolute; left: 16px; top: 10px; font: 700 22px var(--f-cond); letter-spacing: .18em; color: var(--b-orange); }\n.sb-term { left: 70px; top: 140px; width: 690px; height: 250px; padding: 50px 22px 0; }\n.sb-term p { font: 500 21px/1.62 var(--f-mono); color: var(--b-green); white-space: pre; min-height: 1.62em; }\n.sb-sync { left: 790px; top: 140px; width: 580px; height: 250px; }\n.sb-sync .num { position: absolute; left: 22px; top: 44px; font: 700 112px/1 var(--f-mono); color: var(--b-white); font-variant-numeric: tabular-nums; }\n.sb-sync .num small { font-size: 52px; color: var(--b-orange); margin-left: 6px; }\n.sb-sync canvas { position: absolute; left: 0; bottom: 8px; width: 576px; height: 80px; }\n.sb-warn { left: 70px; top: 420px; width: 1300px; height: 240px; border: none; background: var(--b-black); }\n.sb-warn::before, .sb-warn::after { content: \'\'; position: absolute; left: 0; right: 0; height: 24px; background: repeating-linear-gradient(-45deg, var(--b-red) 0 18px, var(--b-black) 18px 36px); }\n.sb-warn::before { top: 0; } .sb-warn::after { bottom: 0; }\n.sb-warn .wait, .sb-warn .go { position: absolute; inset: 24px 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }\n.sb-warn .wait { font: 700 64px var(--f-cond); letter-spacing: .2em; color: var(--b-orange); }\n.sb-warn .go .en { font: 700 76px/1 var(--f-cond); letter-spacing: .08em; color: var(--b-red); }\n.sb-warn .go .zh { font: 900 64px/1 var(--f-display); color: var(--b-white); letter-spacing: .06em; }\n.sb-magi { position: absolute; top: 700px; width: 414px; height: 320px; }\n.sb-magi .name { position: absolute; left: 18px; top: 12px; font: 700 42px var(--f-cond); letter-spacing: .12em; color: var(--b-orange); }\n.sb-magi .role { position: absolute; left: 20px; top: 62px; font: 500 20px var(--f-body); color: rgba(255, 106, 19, .8); letter-spacing: .1em; }\n.sb-magi img { position: absolute; left: 18px; top: 110px; width: 184px; height: 184px; border-radius: 50%; filter: grayscale(1) contrast(1.25); border: 2px solid rgba(255, 106, 19, .6); }\n.sb-magi .st { position: absolute; left: 220px; top: 128px; width: 176px; height: 152px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }\n.sb-magi .ok { border: 2px solid var(--b-green); color: var(--b-green); }\n.sb-magi .hand { border: 2px solid var(--b-red); background: var(--b-red); color: var(--b-black); }\n.sb-magi .st b { font: 900 58px/1 var(--f-display); }\n.sb-magi .st i { font: 700 20px var(--f-cond); letter-spacing: .16em; font-style: normal; }\n.sb-t0 { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; }\n.sb-t0 p { font: 700 44px/1 var(--f-display); letter-spacing: .08em; }\n.sb-t0 p + p { font-size: 64px; letter-spacing: .04em; }\n.sb-title .no { position: absolute; left: 112px; top: 112px; font: 900 76px/1 var(--f-display); transform: scaleX(.86); transform-origin: 0 0; white-space: nowrap; }\n.sb-title .big1 { position: absolute; left: 96px; top: 222px; font: 900 350px/1 var(--f-display); transform: scaleX(.8); transform-origin: 0 0; white-space: nowrap; }\n.sb-title .big2 { position: absolute; left: 100px; top: 578px; font: 900 250px/1 var(--f-display); transform: scaleX(.74); transform-origin: 0 0; white-space: nowrap; }\n.sb-title .en { position: absolute; right: 110px; top: 876px; text-align: right; font: 700 34px/1.45 var(--f-display); letter-spacing: .06em; }\n.sb-title .en span { font-size: 48px; }\n.sb-title .brand { position: absolute; left: 114px; top: 982px; font: 600 26px var(--f-cond); letter-spacing: .6em; color: #8c8c8c; }\n.sb-scan { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.28) 2px 3px); }\n.sb-vig { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.6) 100%); }\n.sb .grain { opacity: .1; mix-blend-mode: screen; }\n.sb-flash { position: absolute; inset: 0; background: var(--b-white); pointer-events: none; opacity: 0; }\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 film stage (1440 \xD7 1080) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.fb { width: 1440px; height: 1080px; background: var(--b-black); }\n.fb .fb-hexbg { position: absolute; inset: 0; }\n/* Forsion stands where NERV would: the red tree as the watermark behind the HUD, and as the mark on its bars */\n.fb .fb-mark { position: absolute; right: -150px; top: 130px; width: 780px; height: 922px; fill: rgba(227, 22, 27, .075); }\n.fb .orgmark { width: 30px; height: 36px; fill: var(--b-red); margin-right: 16px; vertical-align: -6px; flex: none; }\n.fb .top > span:first-of-type, .fb .sb-top > span:first-of-type { display: inline-flex; align-items: center; }\n.fb .scene, .fb .fb-card, .fb .fb-layer { position: absolute; inset: 0; overflow: hidden; }\n.fb .solid { background: var(--b-black); }\n.fb .inv { background: var(--b-white); }\n.fb .fk { position: absolute; font: 900 100px/1 var(--f-display); color: var(--b-white); white-space: nowrap; transform: scaleX(.8); transform-origin: 0 0; }\n.fb .fk.mid { left: 0; right: 0; text-align: center; transform-origin: 50% 0; }\n.fb .fk.right { text-align: right; transform-origin: 100% 0; }\n.fb .fk.vert { writing-mode: vertical-rl; transform: scaleY(.86); }\n.fb .fe { position: absolute; font: 700 44px/1.35 var(--f-display); letter-spacing: .05em; color: var(--b-white); white-space: nowrap; }\n.fb .fe.mid { left: 0; right: 0; text-align: center; }\n.fb .inv .fk, .fb .inv .fe { color: var(--b-black); }\n.fb .red { color: var(--b-red) !important; }\n.fb .org { color: var(--b-orange) !important; }\n.fb .dim { color: #8c8c8c !important; }\n.fb .cond { font-family: var(--f-cond); font-weight: 700; letter-spacing: .2em; }\n.fb .mono { font-family: var(--f-mono); }\n.fb .sub { position: absolute; left: 0; right: 0; text-align: center; font: 900 54px/1.3 var(--f-display); color: var(--b-white); text-shadow: 0 0 8px #000, 3px 3px 0 #000, -2px -2px 0 #000; }\n.fb .sub small { display: block; font: 700 34px/1.4 var(--f-display); color: #cfcfcf; letter-spacing: .03em; }\n.fb .hud { color: var(--b-orange); font-family: var(--f-cond); }\n.fb .panel { position: absolute; border: 2px solid rgba(255, 106, 19, .75); background: rgba(0, 0, 0, .8); }\n.fb .panel > .lbl { position: absolute; left: 16px; top: 10px; font: 700 22px var(--f-cond); letter-spacing: .18em; color: var(--b-orange); }\n.fb .top { position: absolute; left: 70px; right: 70px; top: 46px; height: 58px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--b-orange); font: 700 30px var(--f-cond); letter-spacing: .16em; color: var(--b-orange); }\n.fb .top .alt { color: var(--b-red); }\n\n/* photosensitivity warning */\n.fb .warn { position: absolute; left: 170px; right: 170px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; gap: 24px; }\n.fb .warn hr { border: 0; height: 2px; width: 120px; background: var(--b-red); margin: 0; }\n.fb .warn h2 { font: 900 76px/1.1 var(--f-display); color: var(--b-white); }\n.fb .warn .en { font: 600 30px var(--f-cond); letter-spacing: .3em; color: #a8a8a8; }\n.fb .warn p { font: 500 31px/1.75 var(--f-body); color: #dcdcdc; }\n.fb .warn p.small { font: 400 21px/1.6 var(--f-ui); color: #8e8e8e; }\n\n/* boot */\n.fb-boot { background: var(--b-black); }\n.fb-bootlines { position: absolute; left: 110px; top: 200px; display: grid; gap: 10px; }\n.fb-bootlines p { font: 500 34px/1.4 var(--f-mono); color: var(--b-green); white-space: pre; min-height: 1.4em; }\n.fb-bootlines p.bad { color: var(--b-red); }\n.fb-bootmark { position: absolute; right: 60px; bottom: -40px; font: 700 420px/1 var(--f-cond); color: transparent; -webkit-text-stroke: 2px rgba(56, 255, 139, .18); }\n\n/* half: agent vs human */\n.fb .sysbox { top: 140px; width: 610px; height: 600px; padding: 90px 30px 0; display: grid; align-content: start; gap: 22px; }\n.fb .sysbox h3 { position: absolute; left: 28px; top: 20px; margin: 0; font: 700 64px/1 var(--f-cond); letter-spacing: .12em; }\n.fb .sysrow { display: grid; grid-template-columns: 170px 1fr 70px; align-items: center; gap: 16px; font: 700 30px var(--f-cond); letter-spacing: .12em; color: var(--b-white); }\n.fb .sysrow i { display: block; height: 22px; border: 2px solid rgba(56, 255, 139, .5); position: relative; }\n.fb .sysrow i::after { content: \'\'; position: absolute; inset: 2px; right: calc(2px + (1 - var(--f, 0)) * (100% - 4px)); background: var(--b-green); }\n.fb .sysrow b { color: var(--b-green); text-align: right; }\n.fb .sysbox.human { border-color: var(--b-red); }\n.fb .sysbox.human h3 { color: var(--b-red); }\n.fb .sysbox.human .sysrow i { border-color: rgba(227, 22, 27, .45); }\n.fb .sysbox.human .sysrow b { color: var(--b-red); }\n.fb .nodata { position: absolute; left: 0; right: 0; top: 270px; text-align: center; font: 700 110px/1 var(--f-cond); letter-spacing: .1em; color: var(--b-red); }\n.fb .link { position: absolute; left: 70px; right: 70px; top: 766px; height: 44px; border: 2px dashed rgba(227, 22, 27, .8); display: flex; align-items: center; justify-content: center; font: 700 28px var(--f-cond); letter-spacing: .3em; color: var(--b-red); }\n\n/* HUMAN.md */\n.fb .hm-title { position: absolute; left: 0; right: 0; top: 230px; text-align: center; font: 700 180px/1 var(--f-mono); color: var(--b-white); letter-spacing: -.02em; white-space: pre; min-height: 1em; }\n.fb .hm-sub { position: absolute; left: 0; right: 0; top: 452px; text-align: center; font: 700 44px var(--f-cond); letter-spacing: .4em; color: var(--b-orange); }\n.fb .hm-q { position: absolute; left: 0; right: 0; top: 540px; text-align: center; font: 900 92px/1 var(--f-display); color: var(--b-white); }\n.fb .hm-term { left: 250px; top: 720px; width: 940px; height: 270px; padding: 54px 26px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 30px; }\n.fb .hm-term p { font: 500 28px/1.6 var(--f-mono); color: var(--b-green); white-space: pre; min-height: 1.6em; }\n\n/* memory vs HUMAN.md */\n.fb .half-l, .fb .half-r { position: absolute; top: 0; bottom: 0; width: 720px; }\n.fb .half-l { left: 0; background: #101010; }\n.fb .half-r { left: 720px; background: var(--b-black); box-shadow: inset 0 0 0 3px var(--b-orange); }\n.fb .half-l .fe, .fb .half-r .fe { font-family: var(--f-cond); font-size: 96px; letter-spacing: .08em; }\n\n/* layers */\n.fb .gauge { position: absolute; left: 70px; top: 140px; width: 130px; height: 860px; border: 2px solid rgba(255, 106, 19, .6); }\n.fb .gauge span { position: absolute; left: 12px; font: 700 20px/1.2 var(--f-cond); letter-spacing: .12em; color: var(--b-orange); }\n.fb .gauge i { position: absolute; left: 0; right: 0; height: 2px; background: rgba(255, 106, 19, .35); }\n.fb .gauge .mark { position: absolute; left: -2px; right: -2px; height: 90px; border: 3px solid var(--b-red); background: rgba(227, 22, 27, .2); }\n.fb .layer { position: absolute; left: 240px; top: 140px; width: 1130px; height: 860px; }\n.fb .layer .head { position: absolute; left: 0; top: 0; font: 700 40px var(--f-cond); letter-spacing: .16em; color: var(--b-orange); }\n.fb .layer .file { position: absolute; left: 0; top: 56px; font: 700 34px var(--f-mono); color: var(--b-white); }\n.fb .idcard { left: 0; top: 130px; width: 330px; height: 470px; }\n.fb .idcard img { position: absolute; left: 40px; top: 60px; width: 250px; height: 250px; border-radius: 50%; filter: grayscale(1) contrast(1.25); border: 2px solid rgba(255, 106, 19, .6); }\n.fb .idcard .big { position: absolute; left: 0; right: 0; text-align: center; font: 700 52px/1.1 var(--f-cond); letter-spacing: .1em; color: var(--b-white); }\n.fb .idcard .small { position: absolute; left: 0; right: 0; text-align: center; font: 500 24px/1.3 var(--f-body); color: var(--b-orange); letter-spacing: .1em; }\n.fb .rules { position: absolute; left: 380px; top: 150px; right: 0; display: grid; gap: 26px; }\n.fb .rules p { font: 900 44px/1.25 var(--f-display); color: var(--b-white); white-space: nowrap; }\n.fb .rules p::before { content: \'\u25B6\'; color: var(--b-orange); font-size: 30px; margin-right: 18px; vertical-align: 6px; }\n.fb .layer .cap { position: absolute; left: 0; right: 0; top: 700px; font: 900 76px/1 var(--f-display); color: var(--b-white); }\n.fb .layer .cap small { display: block; margin-top: 14px; font: 700 28px var(--f-cond); letter-spacing: .3em; color: var(--b-orange); }\n\n/* evolve */\n.fb .ev-sync { left: 560px; top: 140px; width: 810px; height: 520px; }\n.fb .ev-sync .num { position: absolute; left: 30px; top: 70px; font: 700 220px/1 var(--f-mono); color: var(--b-white); font-variant-numeric: tabular-nums; }\n.fb .ev-sync .num small { font-size: 90px; color: var(--b-orange); margin-left: 8px; }\n.fb .ev-sync canvas { position: absolute; left: 0; bottom: 10px; width: 806px; height: 170px; }\n.fb .ev-log { left: 70px; top: 140px; width: 460px; height: 520px; padding: 60px 20px 0; display: grid; align-content: start; gap: 16px; }\n.fb .ev-log p { font: 500 24px/1.4 var(--f-mono); color: var(--b-green); white-space: nowrap; }\n.fb .ev-log p b { color: var(--b-orange); font-weight: 700; margin-right: 12px; }\n.fb .stamp { position: absolute; left: 70px; top: 690px; padding: 10px 22px; border: 3px solid var(--b-orange); font: 700 40px var(--f-cond); letter-spacing: .2em; color: var(--b-orange); }\n.fb .final-ctl { position: absolute; left: 70px; right: 70px; top: 330px; height: 420px; background: var(--b-black); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }\n.fb .final-ctl::before, .fb .final-ctl::after { content: \'\'; position: absolute; left: 0; right: 0; height: 22px; background: repeating-linear-gradient(-45deg, var(--b-orange) 0 18px, var(--b-black) 18px 36px); }\n.fb .final-ctl::before { top: 0; } .fb .final-ctl::after { bottom: 0; }\n.fb .final-ctl .zh { font: 900 120px/1 var(--f-display); color: var(--b-white); }\n.fb .final-ctl .en { font: 700 48px/1 var(--f-cond); letter-spacing: .24em; color: var(--b-orange); }\n.fb .final-ctl .four { font: 700 34px var(--f-cond); letter-spacing: .3em; color: #8c8c8c; }\n\n/* MAGI: the waiting state */\n.fb .sb-magi .wait { border: 2px solid var(--b-orange); color: var(--b-orange); }\n\n/* interface field */\n.fb .field { position: absolute; inset: 0; }\n\n/* montage */\n.fb .files { position: absolute; left: 70px; right: 70px; top: 140px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }\n.fb .files .panel { position: relative; height: 560px; }\n.fb .files img, .fb .files .noimg { position: absolute; left: 22px; right: 22px; top: 70px; aspect-ratio: 1; width: calc(100% - 44px); border-radius: 50%; filter: grayscale(1) contrast(1.2); border: 2px solid rgba(255, 106, 19, .6); }\n.fb .files .noimg { display: flex; align-items: center; justify-content: center; font: 700 110px var(--f-cond); color: rgba(255, 106, 19, .8); filter: none; }\n.fb .files .nm { position: absolute; left: 0; right: 0; top: 320px; text-align: center; font: 700 42px var(--f-cond); letter-spacing: .12em; color: var(--b-white); }\n.fb .files .rl { position: absolute; left: 0; right: 0; top: 374px; text-align: center; font: 500 22px var(--f-body); color: var(--b-orange); }\n.fb .files .tabs { position: absolute; left: 14px; right: 14px; top: 430px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }\n.fb .files .tabs span { font: 500 18px/1 var(--f-body); color: rgba(255, 255, 255, .6); border: 1px solid rgba(255, 106, 19, .45); padding: 7px 0; text-align: center; }\n.fb .files .tabs span.on { background: var(--b-orange); color: var(--b-black); font-weight: 700; }\n.fb .skills { left: 70px; top: 140px; width: 1300px; height: 880px; padding: 70px 30px 0; }\n.fb .skills .ops { display: flex; gap: 10px; margin-bottom: 26px; }\n.fb .skills .ops span { font: 700 26px var(--f-body); padding: 8px 18px; border: 2px solid rgba(255, 106, 19, .6); color: var(--b-orange); }\n.fb .skills .ops span.on { background: var(--b-orange); color: var(--b-black); }\n.fb .skills .row { display: grid; grid-template-columns: 80px 1fr 220px; align-items: center; font: 500 36px/2.05 var(--f-mono); color: var(--b-white); border-bottom: 1px solid rgba(255, 106, 19, .25); }\n.fb .skills .row b { font: 700 24px var(--f-cond); letter-spacing: .2em; color: var(--b-green); text-align: right; }\n.fb .skills .row b.off { color: #777; }\n.fb .skills .row i { font: 700 22px var(--f-cond); color: var(--b-orange); font-style: normal; }\n.fb .graph { position: absolute; left: 0; top: 0; width: 1440px; height: 1080px; }\n.fb .graph path { fill: none; stroke: var(--b-orange); stroke-width: 3; stroke-dasharray: 1; stroke-dashoffset: var(--d, 1); }\n.fb .node-a { position: absolute; left: 150px; width: 170px; height: 170px; border-radius: 50%; filter: grayscale(1) contrast(1.2); border: 3px solid var(--b-orange); }\n.fb .node-s { position: absolute; left: 930px; width: 440px; height: 76px; border: 2px solid var(--b-orange); background: var(--b-black); font: 500 30px/72px var(--f-mono); color: var(--b-white); padding-left: 20px; }\n.fb .chat { left: 70px; top: 200px; width: 560px; height: 520px; border-style: dashed; padding: 70px 26px 0; }\n.fb .chat .bub { font: 500 28px/1.55 var(--f-body); color: var(--b-white); background: rgba(255, 255, 255, .08); padding: 16px 20px; margin-bottom: 18px; }\n.fb .chat .bub.me { background: rgba(255, 106, 19, .18); margin-left: 80px; }\n.fb .note { left: 760px; top: 170px; width: 610px; height: 620px; background: #0b0b0b; padding: 70px 30px 0; border-color: var(--b-green); }\n.fb .note .lbl { color: var(--b-green) !important; }\n.fb .note h4 { margin: 0 0 18px; font: 900 44px/1.2 var(--f-display); color: var(--b-white); }\n.fb .note .ln { height: 14px; background: rgba(255, 255, 255, .22); margin: 12px 0; }\n.fb .note .todo { font: 500 26px/1.6 var(--f-body); color: var(--b-white); }\n.fb .note .todo::before { content: \'\u2610 \'; color: var(--b-green); }\n.fb .note table { width: 100%; border-collapse: collapse; margin-top: 16px; font: 500 22px var(--f-mono); color: var(--b-white); }\n.fb .note td { border: 1px solid rgba(56, 255, 139, .45); padding: 6px 10px; }\n.fb .arrow { position: absolute; left: 640px; top: 430px; font: 700 90px var(--f-cond); color: var(--b-orange); }\n.fb .slots { position: absolute; left: 70px; right: 70px; top: 170px; display: grid; gap: 22px; }\n.fb .slot { position: relative; height: 150px; border: 2px solid rgba(255, 106, 19, .7); display: flex; align-items: center; padding: 0 40px; font: 700 88px var(--f-cond); letter-spacing: .1em; color: var(--b-white); background: rgba(0, 0, 0, .8); }\n.fb .slot b { margin-left: auto; font-size: 32px; letter-spacing: .25em; color: var(--b-green); }\n.fb .slot.ctx { height: 90px; font-size: 44px; color: var(--b-orange); }\n.fb .device { position: absolute; border: 3px solid var(--b-orange); background: rgba(0, 0, 0, .85); }\n.fb .device.pc { left: 130px; top: 240px; width: 700px; height: 440px; }\n.fb .device.pc::after { content: \'\'; position: absolute; left: -60px; right: -60px; bottom: -40px; height: 24px; border: 3px solid var(--b-orange); border-top: 0; }\n.fb .device.ph { left: 1050px; top: 250px; width: 230px; height: 440px; border-radius: 30px; }\n.fb .device p { position: absolute; left: 0; right: 0; text-align: center; font: 700 30px/1.3 var(--f-cond); letter-spacing: .15em; color: var(--b-orange); }\n.fb .device .scr { position: absolute; inset: 30px; display: grid; align-content: start; gap: 10px; }\n.fb .device .scr i { display: block; height: 16px; background: rgba(56, 255, 139, .35); }\n.fb .wire { position: absolute; left: 830px; top: 450px; width: 220px; height: 4px; background: repeating-linear-gradient(90deg, var(--b-orange) 0 16px, transparent 16px 28px); background-position-x: calc(var(--p, 0) * 280px); }\n\n/* release: the special edition logo, then the credit */\n.fb .emblem { position: absolute; left: 540px; top: 110px; width: 360px; height: 426px; overflow: visible; }\n.fb .emblem .fs-line { stroke-dasharray: 1; stroke-dashoffset: var(--d, 1); }\n.fb .relt { position: absolute; left: 0; right: 0; top: 640px; display: flex; flex-direction: column; align-items: center; gap: 18px; }\n.fb .relt .nm { font: 700 64px/1 var(--f-cond); letter-spacing: .3em; padding-left: .3em; color: var(--b-white); }\n.fb .relt .zh { font: 900 66px/1 var(--f-display); color: var(--b-white); }\n.fb .relt .url { font: 500 28px var(--f-mono); color: #8c8c8c; }\n.fb .credit { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; }\n.fb .credit .by { font: 600 30px var(--f-cond); letter-spacing: .6em; padding-left: .6em; color: #8c8c8c; }\n.fb .credit .st { font: 700 84px/1 var(--f-cond); letter-spacing: .18em; padding-left: .18em; color: var(--b-white); }\n.fb .credit hr { width: 90px; height: 2px; border: 0; background: var(--b-red); margin: 10px 0 0; }\n```\n\n```html stage\n<canvas class="fb-hexbg" width="1440" height="1080"></canvas>\n<svg class="fb-mark" viewBox="190 110 630 745" aria-hidden="true"><path d="M 351.75 194.02 C 350.54 192.44 350.51 190.75 351.62 188.97 A 2.32 2.23 -4.1 0 1 352.18 188.35 Q 352.45 188.14 377.03 170.33 Q 378.81 169.04 380.94 170.66 A 1.56 1.37 2.7 0 1 381.25 170.96 L 457.27 270.65 A 1.10 1.09 36.3 0 0 459.17 270.36 Q 488.11 189.64 508.46 132.09 C 509.66 128.70 511.09 127.48 514.58 128.66 Q 525.38 132.31 537.42 136.64 C 540.07 137.59 540.80 138.98 539.79 141.83 C 521.49 193.83 502.53 245.51 483.80 297.56 Q 482.68 300.66 484.29 302.73 Q 505.89 330.31 532.05 363.38 A 1.19 1.19 0.0 0 0 533.80 363.52 Q 534.34 363.02 535.34 361.84 Q 627.38 253.56 660.04 215.04 Q 678.56 193.20 685.40 185.40 Q 687.33 183.20 690.21 184.21 A 2.71 2.63 72.5 0 1 690.95 184.61 Q 707.19 197.49 711.84 201.05 Q 715.05 203.50 712.51 206.54 Q 662.78 265.87 661.72 266.73 C 660.84 267.46 659.22 269.62 658.86 270.69 A 1.52 1.51 9.2 0 0 660.30 272.68 Q 709.32 272.68 772.51 272.17 Q 776.38 272.13 776.36 275.70 Q 776.30 286.38 776.27 299.94 Q 776.26 302.63 773.50 302.66 Q 747.38 302.92 635.01 302.74 A 2.13 2.13 0.0 0 0 633.33 303.56 Q 586.76 363.64 576.45 376.72 Q 575.70 377.67 575.76 378.36 A 1.82 1.78 -2.1 0 0 577.56 380.00 Q 655.56 380.14 794.54 380.05 Q 798.66 380.05 798.67 383.78 Q 798.78 424.81 798.64 449.48 Q 798.63 451.75 795.88 452.50 A 1.21 1.08 -48.3 0 1 795.62 452.53 Q 675.18 452.52 576.49 452.55 C 573.01 452.55 572.16 453.97 572.16 457.39 Q 572.16 533.97 572.17 536.25 C 572.18 541.20 575.34 540.71 579.58 540.71 Q 704.78 540.66 751.42 540.80 C 754.22 540.80 755.95 541.53 755.99 544.50 Q 756.26 569.28 755.97 601.50 C 755.93 605.42 753.69 605.66 750.20 605.65 Q 674.11 605.47 575.94 605.68 Q 572.11 605.69 572.09 609.50 C 571.84 658.94 574.71 709.90 582.89 760.66 Q 586.77 784.77 593.78 804.72 Q 598.40 817.89 606.39 828.98 C 607.88 831.05 608.78 833.10 606.45 834.40 A 2.48 2.46 -61.0 0 1 605.12 834.79 L 464.88 834.73 A 0.91 0.79 -30.5 0 1 464.56 834.67 C 461.92 833.56 462.41 831.38 463.85 829.19 Q 471.41 817.68 475.57 803.81 C 478.89 792.75 481.68 780.44 483.44 769.18 Q 489.67 729.42 491.88 694.24 Q 495.65 634.21 495.25 574.00 C 495.21 568.29 494.67 563.43 489.98 559.95 Q 446.96 528.05 404.86 497.12 Q 399.01 492.82 392.18 495.15 Q 347.42 510.44 303.99 524.82 C 287.18 530.38 271.49 536.15 255.47 540.97 Q 253.29 541.63 251.75 539.77 A 1.65 1.62 17.8 0 1 251.47 539.24 Q 247.56 526.18 243.84 513.43 Q 242.95 510.37 245.26 508.76 A 1.08 0.98 16.6 0 1 245.57 508.61 Q 274.09 499.79 365.02 471.31 Q 366.75 470.77 367.33 469.60 A 2.40 2.40 0.0 0 0 366.47 466.51 C 315.32 433.70 274.89 409.24 212.01 371.24 Q 210.33 370.22 210.63 367.29 A 1.53 1.41 -29.6 0 1 210.82 366.70 Q 215.00 359.72 224.25 343.59 C 225.71 341.05 227.12 340.14 229.83 341.42 Q 231.65 342.28 238.85 346.65 Q 274.91 368.52 330.50 402.04 A 1.34 1.33 -63.4 0 0 332.42 401.40 Q 332.93 400.18 332.45 397.89 Q 327.93 376.01 314.75 306.22 C 314.11 302.81 315.15 301.13 318.52 300.32 Q 325.88 298.53 340.79 294.43 Q 345.49 293.13 346.43 297.91 Q 360.63 370.27 371.39 423.31 Q 371.72 424.94 373.88 426.38 Q 394.04 439.77 491.39 505.78 C 492.92 506.81 494.58 506.38 495.20 504.47 A 1.60 1.41 57.3 0 0 495.27 504.01 Q 495.38 416.33 495.13 391.20 Q 495.08 386.11 492.58 379.29 A 4.36 4.22 -76.7 0 0 491.77 377.93 Q 488.96 374.71 479.85 362.65 Q 419.13 282.27 351.75 194.02 Z"/></svg>\n<div data-fvs-scenes></div>\n<div class="sb-scan"></div><div class="sb-vig"></div><div class="grain"></div><div class="sb-flash" data-fvs-flash></div>\n```\n\n```js stage\n// film grain, then the backdrops: hexes for the system check and MAGI only; elsewhere the Forsion tree\ngrain(\'.grain\')\nconst hex = $(\'.fb-hexbg\'), hg = hex.getContext(\'2d\'), hr = rng(12), R = 36\nfor (let row = 0, y = 0; y < 1120; row++, y += R * 1.5) for (let x = (row % 2) * R * .866; x < 1480; x += R * 1.732) {\n  hg.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + Math.PI / 6; hg.lineTo(x + R * .94 * Math.cos(a), y + R * .94 * Math.sin(a)) } hg.closePath()\n  if (hr() > .965) { hg.fillStyle = \'rgba(227,22,27,.3)\'; hg.fill() }\n  hg.strokeStyle = \'rgba(255,106,19,.14)\'; hg.lineWidth = 1.5; hg.stroke()\n}\nconst HEX = during([\'half\', \'magi\'])\nconst MARK = during([\'humanmd\', \'layers\', \'evolve\', [scenes.control.hits[4], scenes.control.t1], \'montage\'])\nconst mark = $(\'.fb-mark\')\nH(t => { hex.style.display = inside(t, HEX) ? \'\' : \'none\'; mark.style.display = inside(t, MARK) ? \'\' : \'none\' })\n// Forsion stands where NERV would: the red tree also marks every HUD title bar\nconst TREE = mark.querySelector(\'path\').getAttribute(\'d\')\nfor (const el of $$(\'.top > span:first-child, .sb-top > span:first-child\')) el.insertAdjacentHTML(\'afterbegin\', `<svg class="orgmark" viewBox="190 110 630 745" aria-hidden="true"><path d="${TREE}"/></svg>`)\n// projector weave: cards jitter, HUDs flicker\nconst cards = $$(\'.fb-card\'), huds = $$(\'.hud\'), wr = rng(3), weave = [...Array(240)].map(() => [wr() * 2.4 - 1.2, wr() * 2.4 - 1.2, wr()])\nH(t => { const [jx, jy, f] = weave[Math.floor(t * 24) % 240]; for (const c of cards) c.style.translate = `${jx}px ${jy}px`; for (const h of huds) h.style.filter = `brightness(${.94 + f * .12})` })\n```\n\n## warning \xB7 \u8B66\u544A\n\n```fvs\n{ "length": "3 bars", "class": "solid" }\n```\n\n```html\n<div class="warn">\n  <hr><h2>\u5149\u654F\u6027\u766B\u75EB\u8B66\u544A</h2><span class="en">PHOTOSENSITIVE SEIZURE WARNING</span>\n  <p>\u672C\u7247\u5305\u542B\u5FEB\u901F\u5207\u6362\u7684\u753B\u9762\u3001\u95EA\u5149\u4E0E\u5F3A\u70C8\u7684\u660E\u6697\u5BF9\u6BD4\u3002\u6781\u5C11\u6570\u89C2\u4F17\u5728\u89C2\u770B\u6B64\u7C7B\u753B\u9762\u65F6\uFF0C\u53EF\u80FD\u51FA\u73B0\u5149\u654F\u6027\u766B\u75EB\u53D1\u4F5C\u6216\u5176\u4ED6\u4E0D\u9002\u3002</p>\n  <p>\u89C2\u770B\u65F6\u8BF7\u4FDD\u6301\u5BA4\u5185\u660E\u4EAE\uFF0C\u5E76\u4E0E\u5C4F\u5E55\u4FDD\u6301\u9002\u5F53\u8DDD\u79BB\u3002\u5982\u51FA\u73B0\u5934\u6655\u3001\u89C6\u89C9\u5F02\u5E38\u3001\u62BD\u6410\u6216\u5176\u4ED6\u4E0D\u9002\uFF0C\u8BF7\u7ACB\u5373\u505C\u6B62\u89C2\u770B\u5E76\u54A8\u8BE2\u533B\u751F\u3002</p>\n  <p class="small">This film contains flashing lights and rapidly changing images that may trigger seizures in people with photosensitive epilepsy. Watch in a well-lit room at a comfortable distance, and stop immediately if you feel unwell.</p>\n</div>\n```\n\n```js\nK(\'.warn\', [[t0 + .15, { o: 0 }], [t0 + .6, { o: 1 }], [t1 - .6, { o: 1 }], [t1 - .1, { o: 0 }]])\n```\n\n## boot \xB7 \u542F\u52A8\n\n```fvs\n{ "length": "2 bars", "class": "fb-boot" }\n```\n\n```html\n<div class="fb-bootlines">\n  <p>FORSION SYSTEM 2.12</p>\n  <p>AGENT HARNESS ........ OK</p>\n  <p>SOUL ................. OK</p>\n  <p>MEMORY ............... OK</p>\n  <p>SKILLS ............... OK</p>\n  <p>TOOLS \xB7 TEAMS ........ OK</p>\n  <p class="bad">HUMAN ................ ??</p>\n</div>\n<div class="fb-bootmark">2.12</div>\n```\n\n```js\ntype(\'.fb-bootlines p\', t0 + 0.12, 80, 0.36)\nconst bad = $(\'.bad\')\nH(t => { bad.style.opacity = t > t0 + 2.45 && Math.floor(t * 6) % 2 ? .25 : 1 })\n```\n\n## cards \xB7 \u6807\u9898\u5361\n\n```fvs\n{ "length": "4 bars", "hits": [0, 2, 4, 6, 8, 10, 12, 14] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:250px;font-size:340px">\u4EBA\u683C</span><span class="fe" style="left:760px;top:650px">SOUL</span></div>\n  <div class="fb-card solid"><span class="fk vert" style="left:1010px;top:70px;font-size:300px">\u8BB0\u5FC6</span><span class="fe" style="left:110px;top:900px">MEMORY</span></div>\n  <div class="fb-card solid"><span class="fe mid" style="top:190px;font-size:46px">SKILLS</span><span class="fk mid" style="top:330px;font-size:380px">\u6280\u80FD</span></div>\n  <div class="fb-card solid"><span class="fk right" style="right:110px;top:180px;font-size:320px">\u5DE5\u5177</span><span class="fe" style="left:118px;top:820px">TOOLS</span></div>\n  <div class="fb-card solid"><span class="fe" style="left:118px;top:420px;font-size:48px">HARNESS</span><span class="fk" style="left:110px;top:540px;font-size:360px">\u8FDB\u5316</span></div>\n  <div class="fb-card inv"><span class="fk mid" style="top:260px;font-size:360px">\u56E2\u961F</span><span class="fe mid" style="top:760px">TEAMS</span></div>\n  <div class="fb-card solid"><span class="fe" style="right:110px;top:120px;font-size:48px;text-align:right">PROJECTS</span><span class="fk" style="left:110px;top:560px;font-size:360px">\u9879\u76EE</span></div>\n  <div class="fb-card solid ticker">\n    <span class="fk" style="left:120px;top:250px;font-size:64px">\u66F4\u5F3A\u7684\u6A21\u578B</span>\n    <span class="fk" style="left:120px;top:370px;font-size:64px">\u66F4\u957F\u7684\u4E0A\u4E0B\u6587</span>\n    <span class="fk" style="left:120px;top:490px;font-size:64px">\u66F4\u4E30\u5BCC\u7684 Skills</span>\n    <span class="fk" style="left:120px;top:610px;font-size:64px">\u66F4\u5B8C\u5584\u7684 Memory</span>\n    <span class="fk" style="left:120px;top:730px;font-size:64px">\u66F4\u590D\u6742\u7684 Harness</span>\n  </div>\n</div>\n```\n\n```js\nflash(hits[0], .6)\ncut(\'.ticker .fk\', hits[7], { stagger: beat / 4 })\n```\n\n## years \xB7 \u591A\u5E74\u6765\n\n```fvs\n{ "length": "2 bars", "hits": [0, 2, 4, 6] }\n```\n\n```html\n<div class="fb-card solid">\n  <span class="fk" style="left:110px;top:200px;font-size:210px" data-in="h0">\u591A\u5E74\u6765\uFF0C</span>\n  <span class="fk" style="left:112px;top:470px;font-size:130px" data-in="h1">\u6211\u4EEC\u4E00\u76F4\u5728\u5EFA\u9020</span>\n  <span class="fk" style="left:112px;top:640px;font-size:130px" data-in="h2">\u66F4\u597D\u7684 Agent\u3002</span>\n  <span class="fe" style="right:110px;top:900px;font-size:34px" data-in="h3">FOR YEARS, WE HAVE BEEN BUILDING BETTER AGENTS.</span>\n</div>\n```\n\n## half \xB7 \u4E00\u534A\n\n```fvs\n{ "length": "2 bars", "hits": [0, 3], "class": "hud" }\n```\n\n```html\n<div class="top"><span>HUMAN\u2013AGENT SYSTEM / \u7CFB\u7EDF\u6784\u6210</span><span class="alt">\u25CF CHECK</span></div>\n<div class="panel sysbox" style="left:70px"><h3 class="org">AGENT</h3>\n  <div class="sysrow"><span>SOUL</span><i></i><b>OK</b></div>\n  <div class="sysrow"><span>MEMORY</span><i></i><b>OK</b></div>\n  <div class="sysrow"><span>SKILLS</span><i></i><b>OK</b></div>\n  <div class="sysrow"><span>TOOLS</span><i></i><b>OK</b></div>\n  <div class="sysrow"><span>HARNESS</span><i></i><b>OK</b></div>\n  <div class="sysrow"><span>TEAMS</span><i></i><b>OK</b></div>\n</div>\n<div class="panel sysbox human" style="left:760px"><h3>HUMAN</h3>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="sysrow"><span>\u2014\u2014</span><i style="--f:0"></i><b>\u2014</b></div>\n  <div class="nodata">NO DATA</div>\n</div>\n<div class="link">INTERFACE \u25B8 UNDEFINED / \u534F\u4F5C\u65B9\u5F0F\uFF1A\u672A\u5B9A\u4E49</div>\n<p class="sub" style="top:850px" data-in="h1">The Agent was only half the system.<small>Agent\uFF0C\u53EA\u662F\u7CFB\u7EDF\u7684\u4E00\u534A\u3002</small></p>\n```\n\n```js\n// the Agent\'s gauges fill a sixteenth apart; the human side blinks NO DATA\nK(\'.sysbox:not(.human) .sysrow i\', [[t0 + beat / 4, { \'--f\': 0 }], [t0 + beat + beat / 4, { \'--f\': 1 }, \'out\']], { stagger: beat / 4 })\nconst nod = $(\'.nodata\')\nH(t => { nod.style.opacity = Math.floor(t * 4) % 2 ? .2 : 1 })\nflash(t0, .5)\n```\n\n## question \xB7 \u4EBA\u7C7B\uFF1F\n\n```fvs\n{ "length": "1 bar", "hits": [0] }\n```\n\n```html\n<div class="fb-card inv"><span class="fk" style="left:104px;top:220px;font-size:380px;color:#000">\u4EBA\u7C7B</span><span class="fk red" style="left:720px;top:220px;font-size:380px">\uFF1F</span><span class="fe red" style="left:112px;top:760px;font:700 64px/1 var(--f-cond);letter-spacing:.22em">HUMAN \u2014 UNDEFINED</span></div>\n```\n\n```js\nflash(t0, .9)\n```\n\n## title \xB7 \u7247\u540D\n\n```fvs\n{ "length": "2 bars", "hits": [0, 2] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fe mid" style="top:430px;font-size:44px">EPISODE 2.12</span><span class="fe mid" style="top:500px;font-size:64px">COMPLETE THE OTHER HALF.</span></div>\n  <div class="fb-card solid">\n    <span class="fk" style="left:112px;top:112px;font-size:76px">\u7B2C 2.12 \u8BDD</span>\n    <span class="fk" style="left:96px;top:222px;font-size:350px">\u4EBA\u7C7B</span>\n    <span class="fk" style="left:100px;top:578px;font-size:250px;transform:scaleX(.74)">\u8865\u5B8C\u8BA1\u5212</span>\n    <span class="fe" style="right:110px;top:876px;font-size:34px;text-align:right">EPISODE 2.12<br><span style="font-size:48px">COMPLETE THE OTHER HALF.</span></span>\n    <span class="fe" style="left:114px;top:982px;font:600 26px var(--f-cond);letter-spacing:.6em;color:#8c8c8c">FORSION</span>\n  </div>\n</div>\n```\n\n```js\nflash(hits[1], .85)\n```\n\n## twosides \xB7 \u4E24\u9762\n\n```fvs\n{ "length": "1 bar", "hits": [0, 1.5, 2.5] }\n```\n\n```html\n<div class="fb-card solid">\n  <span class="fk" style="left:110px;top:220px;font-size:240px" data-in="h0">\u4F46\u534F\u4F5C\uFF0C</span>\n  <span class="fk" style="left:110px;top:520px;font-size:240px" data-in="h1">\u6709\u4E24\u9762\u3002</span>\n  <span class="fe" style="right:110px;top:890px" data-in="h2">BUT COLLABORATION HAS TWO SIDES.</span>\n</div>\n```\n\n## humanmd \xB7 HUMAN.md\n\n```fvs\n{ "length": "2 bars", "hits": [0, 1.5, 2.5, 3.5], "class": "hud" }\n```\n\n```html\n<p class="hm-title">HUMAN.md</p>\n<p class="hm-sub">THE HUMAN HARNESS</p>\n<p class="hm-q">\u6211\u4EEC\u5E94\u8BE5\u600E\u6837\u4E00\u8D77\u5DE5\u4F5C\uFF1F</p>\n<div class="panel hm-term"><span class="lbl">HUMAN.md \xB7 \u7ED3\u6784</span><p>## \u6211\u4F1A\u600E\u6837\u8C03\u6574</p><p>## \u9700\u8981\u4F60\u6765\u51B3\u5B9A</p><p>## \u9700\u8981\u4F60\u8865\u5145</p><p>## \u53EF\u9009\u5B66\u4E60</p></div>\n```\n\n```js\ntype(\'.hm-title\', t0 + .05, 22)\ncut(\'.hm-sub\', hits[1])\nslide(\'.hm-q\', hits[2], { y: 14 })\ncut(\'.hm-term\', hits[3])\ntype(\'.hm-term p\', hits[3] + beat / 4, 40, beat / 2)\nflash(t0, .5)\n```\n\n## asks \xB7 \u95EE\u9898\n\n```fvs\n{ "length": "2 bars", "hits": [0, 1.5, 3, 4.5, 6] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:260px;font-size:110px">\u4EC0\u4E48\u4E8B\u60C5\uFF0C</span><span class="fk" style="left:110px;top:420px;font-size:150px">Agent \u5E94\u8BE5\u81EA\u5DF1\u5224\u65AD\uFF1F</span></div>\n  <div class="fb-card solid"><span class="fk right" style="right:110px;top:140px;font-size:110px">\u4EC0\u4E48\u4E8B\u60C5\uFF0C</span><span class="fk" style="left:110px;top:420px;font-size:230px">\u9700\u8981</span><span class="fk" style="left:110px;top:680px;font-size:230px">\u4EBA\u7C7B\u786E\u8BA4\uFF1F</span></div>\n  <div class="fb-card inv"><span class="fk vert" style="left:1060px;top:90px;font-size:200px">\u4EBA\u7C7B\uFF0C</span><span class="fk" style="left:110px;top:620px;font-size:130px">\u5E94\u8BE5\u8865\u5145\u54EA\u4E9B\u4FE1\u606F\uFF1F</span></div>\n  <div class="fb-card solid"><span class="fk mid" style="top:220px;font-size:130px">\u600E\u6837\u6C9F\u901A\uFF0C</span><span class="fk mid" style="top:470px;font-size:170px">\u624D\u80FD\u51CF\u5C11\u53CD\u590D\uFF1F</span></div>\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:180px;font-size:180px">\u53CC\u65B9\uFF0C</span><span class="fk" style="left:110px;top:460px;font-size:300px">\u5982\u4F55\u5206\u5DE5\uFF1F</span></div>\n</div>\n```\n\n## memory \xB7 MEMORY \u4E0E HUMAN.md\n\n```fvs\n{ "length": "2 bars", "hits": [0, 4], "class": "solid" }\n```\n\n```html\n<div class="half-l"><span class="fe dim" style="left:80px;top:270px">MEMORY</span><span class="fk" style="left:80px;top:420px;font-size:92px;color:#bdbdbd">\u6211\u77E5\u9053</span><span class="fk" style="left:80px;top:540px;font-size:92px;color:#bdbdbd">\u4F60\u4EC0\u4E48\u3002</span></div>\n<div class="half-r"><span class="fe org mono" style="left:70px;top:270px;font-family:var(--f-mono)">HUMAN.md</span><span class="fk" style="left:70px;top:420px;font-size:92px">\u6211\u4EEC\u600E\u6837</span><span class="fk" style="left:70px;top:540px;font-size:92px">\u5408\u4F5C\u5F97\u66F4\u597D\u3002</span></div>\n```\n\n```js\ncut(\'.half-r\', hits[1])\nK(\'.half-l\', [[hits[1], { o: 1 }], [hits[1] + .3, { o: .35 }]])\nflash(hits[1], .7)\n```\n\n## magi \xB7 MAGI \u5BA1\u8BAE\n\n```fvs\n{ "length": "3 bars", "hits": [0, 1, 2, 4, 5, 6], "class": "hud" }\n```\n\n```html\n<div class="sb-top"><span>MAGI \xB7 \u534F\u4F5C\u5BA1\u8BAE / DELIBERATION</span><span class="live">\u25CF HUMAN.md</span></div>\n<div class="sb-box sb-term r1"><span class="lbl">\u63D0\u6848 01 \xB7 PROPOSAL</span><p>\u6309\u94AE\u5706\u89D2 8px \u2192 10px</p><p>\u7C7B\u522B\uFF1A\u6280\u672F\u5B9E\u73B0</p><p>\u89C4\u5219\uFF1A\u6280\u672F\u5B9E\u73B0\u53EF\u4EE5\u81EA\u4E3B\u9009\u62E9</p></div>\n<div class="sb-box sb-term r2"><span class="lbl">\u63D0\u6848 02 \xB7 PROPOSAL</span><p>\u8C03\u6574\u5B9A\u4EF7\u65B9\u6848</p><p>\u7C7B\u522B\uFF1A\u4EA7\u54C1\u51B3\u7B56</p><p>\u89C4\u5219\uFF1A\u4EA7\u54C1\u51B3\u7B56\u5FC5\u987B\u8BA9\u6211\u786E\u8BA4</p></div>\n<div class="sb-box sb-sync"><span class="lbl">\u5224\u65AD\u5F52\u5C5E \xB7 OWNER</span><div class="num own1" style="color:var(--b-green)">AGENT</div><div class="num own2" style="color:var(--b-red)">HUMAN</div></div>\n<div class="sb-box sb-warn"><div class="go g1" style="--c:var(--b-green)"><span class="en" style="color:var(--b-green)">APPROVED \xB7 AUTONOMOUS</span><span class="zh">\u6280\u672F\u5B9E\u73B0 \xB7 Agent \u81EA\u4E3B\u5224\u65AD</span></div><div class="go g2"><span class="en">HUMAN CONFIRMATION REQUIRED</span><span class="zh">\u9700\u8981\u4EBA\u7C7B\u786E\u8BA4 \xB7 \u4EA7\u54C1\u51B3\u7B56</span></div></div>\n<div class="sb-box sb-magi" style="left:70px"><span class="name">ARIA \xB7 1</span><span class="role">\u60C5\u611F \xB7 \u8868\u8FBE</span><img src="assets/aria.jpg" alt=""><div class="st wait"><b>\u5BA1\u8BAE</b><i>VOTING</i></div><div class="st ok"><b>\u627F\u8BA4</b><i>APPROVE</i></div><div class="st hand"><b>\u79FB\u4EA4</b><i>TO HUMAN</i></div></div>\n<div class="sb-box sb-magi" style="left:513px"><span class="name">RECITA \xB7 2</span><span class="role">\u8BC1\u636E \xB7 \u53EF\u884C\u6027</span><img src="assets/recita.jpg" alt=""><div class="st wait"><b>\u5BA1\u8BAE</b><i>VOTING</i></div><div class="st ok"><b>\u627F\u8BA4</b><i>APPROVE</i></div><div class="st hand"><b>\u79FB\u4EA4</b><i>TO HUMAN</i></div></div>\n<div class="sb-box sb-magi" style="left:956px"><span class="name">ARIOSO \xB7 3</span><span class="role">\u76EE\u6807 \xB7 \u53D6\u820D</span><img src="assets/arioso.jpg" alt=""><div class="st wait"><b>\u5BA1\u8BAE</b><i>VOTING</i></div><div class="st ok"><b>\u627F\u8BA4</b><i>APPROVE</i></div><div class="st hand"><b>\u79FB\u4EA4</b><i>TO HUMAN</i></div></div>\n```\n\n```js\n// two proposals: the first stays with the Agent, the second goes to the human\nconst R2 = hits[3]\nS(\'.r1, .own1, .g1\', 0, R2)\nS(\'.r2, .own2, .g2\', R2, 999)\ntype(\'.r1 p\', t0 + .1, 50, .2)\ntype(\'.r2 p\', R2 + .1, 50, .2)\nK(\'.sb-sync .num\', [[hits[2] - .01, { o: 0 }], [hits[2], { o: 1 }, \'step\'], [R2, { o: 0 }, \'step\'], [hits[5] - .01, { o: 0 }], [hits[5], { o: 1 }, \'step\']])\nconst g1 = $(\'.g1\'), g2 = $(\'.g2\')\nH(t => { g1.style.opacity = t < hits[2] ? 0 : 1; g2.style.opacity = t < hits[5] ? 0 : (Math.floor((t - hits[5]) * 6) % 2 ? .3 : 1) })\n$$(\'.sb-magi\').forEach((el, i) => {\n  const ok = hits[1] + i * beat / 4, hand = hits[4] + i * beat / 4\n  S(el.querySelector(\'.wait\'), 0, ok)\n  S(el.querySelector(\'.ok\'), ok, hand)\n  S(el.querySelector(\'.hand\'), hand, 999)\n})\nflash(t0, .5); flash(R2, .5)\n```\n\n## layers \xB7 \u53CC\u5C42\u534F\u4F5C\n\n```fvs\n{ "length": "4 bars", "hits": [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14], "class": "hud" }\n```\n\n```html\n<div class="top"><span>HUMAN.md \xB7 \u53CC\u5C42\u534F\u4F5C / TWO LAYERS</span><span class="alt">\u25CF HUMAN HARNESS</span></div>\n<div class="gauge"><span style="top:14px">DEPTH</span><i style="top:300px"></i><span style="top:190px">01<br>AGENT</span><i style="top:560px"></i><span style="top:450px">02<br>PROJECT</span><div class="mark"></div></div>\n<div class="l1"><div class="layer"><span class="head">LAYER 01 \xB7 AGENT-LEVEL</span><span class="file">HUMAN.md</span>\n  <div class="panel idcard"><img src="assets/arioso.jpg" alt=""><span class="big" style="top:330px">ARIOSO</span><span class="small" style="top:392px">\u957F\u671F\u534F\u4F5C \xB7 LONG-TERM</span></div>\n  <div class="rules"><p>\u4E0D\u8981\u9891\u7E41\u8BE2\u95EE\u5B9E\u73B0\u7EC6\u8282</p><p>\u4EA7\u54C1\u51B3\u7B56\u5FC5\u987B\u8BA9\u6211\u786E\u8BA4</p><p>\u6280\u672F\u5B9E\u73B0\u53EF\u4EE5\u81EA\u4E3B\u9009\u62E9</p><p>\u6C47\u62A5\u65F6\u5148\u7ED9\u7ED3\u8BBA</p><p>\u4E0D\u786E\u5B9A\u65F6\u8BF4\u660E\u98CE\u9669\uFF0C\u522B\u505C\u4E0B</p></div>\n  <div class="cap">\u957F\u671F\u7684\u4EBA\u673A\u5173\u7CFB<small>AGENT LAYER \xB7 \u968F\u957F\u671F\u534F\u4F5C\u9010\u6E10\u79EF\u7D2F</small></div></div></div>\n<div class="l2"><div class="layer"><span class="head">LAYER 02 \xB7 PROJECT-LEVEL</span><span class="file">.tangu/HUMAN.md</span>\n  <div class="panel idcard"><span class="small" style="top:70px">PROJECT</span><span class="big" style="top:160px;font-size:64px">FORSION<br>2.12</span><span class="small" style="top:392px">\u672C\u9879\u76EE \xB7 THIS PROJECT</span></div>\n  <div class="rules"><p>\u5F53\u524D\u7248\u672C\u4F18\u5148\u4FDD\u8BC1 macOS</p><p>\u53D1\u5E03\u524D\u9700\u8981\u771F\u4EBA\u89C6\u89C9\u9A8C\u6536</p><p>\u67B6\u6784\u4FEE\u6539\u9700\u8981\u5148\u8BA8\u8BBA</p><p>\u67D0\u4E9B\u9886\u57DF\u7531 Human \u6700\u7EC8\u5224\u65AD</p></div>\n  <div class="cap">\u5177\u4F53\u9879\u76EE\u4E2D\u7684\u5DE5\u4F5C\u65B9\u5F0F<small>PROJECT LAYER \xB7 \u53EA\u5C5E\u4E8E\u5F53\u524D\u9879\u76EE</small></div></div></div>\n```\n\n```js\nconst L2 = hits[7]\nS(\'.l1\', 0, L2); S(\'.l2\', L2, 999)\nslide(\'.l1 .rules p\', hits[1], { x: -20 }, { stagger: beat })\nslide(\'.l2 .rules p\', hits[8], { x: -20 }, { stagger: beat })\ncut(\'.l1 .cap\', hits[6])\ncut(\'.l2 .cap\', hits[12])\nK(\'.gauge .mark\', [[L2, { y: 150 }], [L2 + beat, { y: 410 }, \'out\']])\nflash(t0, .5); flash(L2, .6)\n```\n\n## evolve \xB7 \u534F\u4F5C\u8FDB\u5316\n\n```fvs\n{ "length": "3 bars", "hits": [0, 1, 4, 5, 8, 9], "class": "hud" }\n```\n\n```html\n<div class="top"><span>HUMAN.md \xB7 \u534F\u4F5C\u8FDB\u5316 / EVOLUTION</span><span class="alt">\u25CF LEARNING</span></div>\n<div class="panel ev-log"><span class="lbl">\u4FEE\u6539\u5386\u53F2 \xB7 HISTORY</span><p><b>v09</b>\u5B9E\u73B0\u7EC6\u8282 \u2192 \u4E0D\u518D\u9010\u9879\u8BE2\u95EE</p><p><b>v10</b>\u6C47\u62A5 \u2192 \u5148\u7ED9\u7ED3\u8BBA</p><p><b>v11</b>UI \u65B9\u6848 \u2192 \u5148\u505A\u51FA\u6765\u518D\u9009</p></div>\n<div class="panel ev-sync"><span class="lbl">\u4EBA\u673A\u540C\u6B65\u7387 \xB7 SYNC RATIO</span><div class="num"><span class="n">41.3</span><small>%</small></div><canvas width="1612" height="340"></canvas></div>\n<div class="stamp">HUMAN.md UPDATED</div>\n<p class="sub q" style="top:840px">\u300C\u8FD9\u79CD\u4E8B\u60C5\u4EE5\u540E\u4E0D\u7528\u518D\u95EE\u6211\u3002\u300D</p>\n<p class="sub q" style="top:840px">\u300C\u4EE5\u540E\u8FD9\u79CD\u62A5\u544A\u5148\u7ED9\u7ED3\u8BBA\u3002\u300D</p>\n<p class="sub q" style="top:840px">\u300CUI \u65B9\u6848\u5148\u505A\u51FA\u6765\u8BA9\u6211\u9009\uFF0C\u4E0D\u8981\u4E00\u76F4\u8BA8\u8BBA\u3002\u300D</p>\n```\n\n```js\n// each quote (even hits) is answered by a HUMAN.md update on the next hit\nconst UPD = [hits[1], hits[3], hits[5]]\nconst SYNC = [41.3, 67.2, 84.6, 99.8]\n$$(\'.sub.q\').forEach((el, i) => S(el, hits[2 * i], hits[2 * i + 2] ?? t1))\n$$(\'.ev-log p\').forEach((el, i) => cut(el, UPD[i]))\nconst stamp = $(\'.stamp\')\nH(t => { let o = 0; for (const u of UPD) { const k = t - u; if (k >= 0 && k < .8) o = Math.floor(k * 8) % 2 ? .35 : 1 } stamp.style.opacity = o })\nconst evn = $(\'.n\')\nH(t => {\n  let v = SYNC[0]\n  for (let i = 0; i < 3; i++) v += (SYNC[i + 1] - SYNC[i]) * prog(t, UPD[i], UPD[i] + 1, \'out\')\n  evn.textContent = v.toFixed(1)\n})\nconst wave = $(\'canvas\'), wg = wave.getContext(\'2d\')\nH(t => {\n  if (t < t0 - .1 || t > t1 + .1) return\n  const W = wave.width, Hh = wave.height, sync = (parseFloat(evn.textContent) - 41.3) / (99.8 - 41.3), ph = 2.8 * (1 - sync)\n  wg.clearRect(0, 0, W, Hh)\n  wg.strokeStyle = \'rgba(255,106,19,.25)\'; wg.lineWidth = 2\n  for (let x = 0; x < W; x += 64) { wg.beginPath(); wg.moveTo(x, 0); wg.lineTo(x, Hh); wg.stroke() }\n  const line = (c, off) => { wg.strokeStyle = c; wg.lineWidth = 7; wg.beginPath(); for (let x = 0; x <= W; x += 8) { const y = Hh / 2 + Math.sin(x / 90 + t * 6 + off) * Hh * .34; x ? wg.lineTo(x, y) : wg.moveTo(x, y) } wg.stroke() }\n  line(\'#ff6a13\', 0); line(\'#38ff8b\', ph)\n})\nflash(t0, .5)\n```\n\n## control \xB7 \u63A7\u5236\u6743\n\n```fvs\n{ "length": "2 bars", "hits": [0, 1, 2, 3, 4] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:250px;font-size:320px">\u53EF\u67E5\u770B</span><span class="fe" style="left:118px;top:660px">VIEW</span></div>\n  <div class="fb-card solid"><span class="fk vert" style="left:1070px;top:80px;font-size:290px">\u53EF\u7F16\u8F91</span><span class="fe" style="left:110px;top:880px">EDIT</span></div>\n  <div class="fb-card solid"><span class="fe mid" style="top:220px;font-size:46px">HISTORY</span><span class="fk mid" style="top:320px;font-size:340px">\u53EF\u8FFD\u8E2A</span></div>\n  <div class="fb-card inv"><span class="fk right" style="right:110px;top:260px;font-size:320px">\u53EF\u64A4\u9500</span><span class="fe" style="left:118px;top:820px">UNDO</span></div>\n  <div class="fb-layer hud">\n    <div class="top"><span>HUMAN.md \xB7 \u63A7\u5236\u6743 / CONTROL</span><span class="alt">\u25CF HUMAN</span></div>\n    <div class="final-ctl"><span class="four">\u53EF\u67E5\u770B \xB7 \u53EF\u7F16\u8F91 \xB7 \u53EF\u8FFD\u8E2A \xB7 \u53EF\u64A4\u9500</span><span class="zh">\u6700\u7EC8\u63A7\u5236\u6743\uFF0C\u5C5E\u4E8E\u4EBA\u7C7B</span><span class="en">HUMAN HAS FINAL CONTROL</span></div>\n  </div>\n</div>\n```\n\n```js\nflash(hits[0], .5); flash(hits[4], .6)\n```\n\n## interface \xB7 Interface\n\n```fvs\n{ "length": "3 bars", "hits": [0, 4, 8] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:230px;font-size:260px">\u4E0D\u662F AI</span><span class="fk" style="left:110px;top:540px;font-size:260px">\u8BAD\u7EC3\u4EBA\u7C7B\u3002</span></div>\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:230px;font-size:220px">\u4E5F\u4E0D\u662F\u4EBA\u7C7B</span><span class="fk" style="left:110px;top:520px;font-size:260px">\u8BAD\u7EC3 AI\u3002</span></div>\n  <div class="fb-card solid field-card"><canvas class="field" width="1440" height="1080"></canvas>\n    <span class="fe org cond" style="left:0;right:0;text-align:center;top:150px;font-size:40px;letter-spacing:.4em">INTERFACE FIELD</span>\n    <span class="fk mid" style="top:340px;font-size:140px">\u800C\u662F\uFF0C\u5171\u540C\u4F18\u5316</span><span class="fk mid" style="top:530px;font-size:132px">\u5F7C\u6B64\u4E4B\u95F4\u7684 Interface\u3002</span></div>\n</div>\n```\n\n```js\n// octagonal field rings expanding from the centre, like an AT field\nconst fc = $(\'canvas.field\'), fg = fc.getContext(\'2d\'), f0 = hits[2]\nH(t => {\n  if (t < f0 || t > t1) return\n  fg.clearRect(0, 0, 1440, 1080)\n  for (let k = 0; k < 9; k++) {\n    const r = ((t - f0) * 420 + k * 130) % 1170 + 20, a = Math.max(0, 1 - r / 1170)\n    fg.strokeStyle = `rgba(255,106,19,${a * .85})`; fg.lineWidth = 8\n    fg.beginPath()\n    for (let i = 0; i <= 8; i++) { const ang = Math.PI / 8 + i * Math.PI / 4; const x = 720 + r * Math.cos(ang), y = 540 + r * Math.sin(ang) * .92; i ? fg.lineTo(x, y) : fg.moveTo(x, y) }\n    fg.stroke()\n  }\n})\nflash(hits[2], .8)\n```\n\n## montage \xB7 \u7CFB\u7EDF\n\n```fvs\n{ "length": "8 bars", "hits": [0, 2, 4, 8, 12, 16, 17, 18, 20, 24, 28] }\n```\n\n```html\n<div class="fb-layer hud mo-space">\n  <div class="top"><span>AGENT SPACE / \u4EBA\u5458\u6863\u6848</span><span>PERSONNEL FILES</span></div>\n  <div class="files">\n    <div class="panel"><img src="assets/arioso.jpg" alt=""><span class="nm">ARIOSO</span><span class="rl">\u76EE\u6807 \xB7 \u53D6\u820D</span><div class="tabs"><span>\u4EBA\u683C</span><span>\u6280\u80FD</span><span>MCP</span><span class="on">\u534F\u4F5C</span><span>\u6210\u957F</span><span>\u65E5\u7A0B</span></div></div>\n    <div class="panel"><img src="assets/aria.jpg" alt=""><span class="nm">ARIA</span><span class="rl">\u60C5\u611F \xB7 \u8868\u8FBE</span><div class="tabs"><span>\u4EBA\u683C</span><span>\u6280\u80FD</span><span>MCP</span><span class="on">\u534F\u4F5C</span><span>\u6210\u957F</span><span>\u65E5\u7A0B</span></div></div>\n    <div class="panel"><img src="assets/recita.jpg" alt=""><span class="nm">RECITA</span><span class="rl">\u8BC1\u636E \xB7 \u53EF\u884C\u6027</span><div class="tabs"><span>\u4EBA\u683C</span><span>\u6280\u80FD</span><span>MCP</span><span class="on">\u534F\u4F5C</span><span>\u6210\u957F</span><span>\u65E5\u7A0B</span></div></div>\n    <div class="panel"><div class="noimg">C</div><span class="nm">CODING</span><span class="rl">\u4EE3\u7801 \xB7 \u5B9E\u73B0</span><div class="tabs"><span>\u4EBA\u683C</span><span>\u6280\u80FD</span><span>MCP</span><span class="on">\u534F\u4F5C</span><span>\u6210\u957F</span><span>\u65E5\u7A0B</span></div></div>\n    <div class="panel"><div class="noimg">M</div><span class="nm">MUSE</span><span class="rl">\u4E3B\u52A8 \xB7 \u8DDF\u8FDB</span><div class="tabs"><span>\u4EBA\u683C</span><span>\u6280\u80FD</span><span>MCP</span><span class="on">\u534F\u4F5C</span><span>\u6210\u957F</span><span>\u65E5\u7A0B</span></div></div>\n  </div>\n  <p class="sub s1" style="top:760px">Agent \u4E0D\u518D\u53EA\u662F\u4E00\u4E2A Prompt\u3002</p><p class="sub s2" style="top:760px">\u800C\u662F\u5728 Forsion \u4E2D\u957F\u671F\u5B58\u5728\u7684\u6570\u5B57\u534F\u4F5C\u8005\u3002</p>\n</div>\n<div class="fb-layer hud mo-skills">\n  <div class="top"><span>GLOBAL SKILLS / \u80FD\u529B\u8D44\u4EA7</span><span>15 SKILLS</span></div>\n  <div class="panel skills"><span class="lbl">SKILLS \xB7 \u5168\u5C40</span><div class="ops"><span>\u67E5\u770B</span><span>\u641C\u7D22</span><span>\u5BFC\u5165</span><span>\u65B0\u5EFA</span><span>\u7F16\u8F91</span><span>\u590D\u5236</span><span>\u505C\u7528</span></div>\n    <div class="row"><i>01</i><span>amadeus-note-format</span><b>ENABLED</b></div>\n    <div class="row"><i>02</i><span>web-research</span><b>ENABLED</b></div>\n    <div class="row"><i>03</i><span>document-writing-cn</span><b>ENABLED</b></div>\n    <div class="row"><i>04</i><span>data-analysis-python</span><b>ENABLED</b></div>\n    <div class="row"><i>05</i><span>code-review</span><b>ENABLED</b></div>\n    <div class="row"><i>06</i><span>self-brainstorm</span><b>ENABLED</b></div>\n    <div class="row"><i>07</i><span>automation-suggest</span><b class="off">DISABLED</b></div>\n    <div class="row"><i>08</i><span>skill-creator</span><b>ENABLED</b></div>\n  </div>\n</div>\n<div class="fb-layer hud mo-shared">\n  <div class="top"><span>SHARED SKILLS / AGENT \xD7 SKILLS</span><span>\u5171\u4EAB \xB7 \u501F\u7528</span></div>\n  <svg class="graph" viewBox="0 0 1440 1080" aria-hidden="true"></svg>\n  <img class="node-a" src="assets/arioso.jpg" alt="" style="top:220px"><img class="node-a" src="assets/aria.jpg" alt="" style="top:450px"><img class="node-a" src="assets/recita.jpg" alt="" style="top:680px">\n  <div class="node-s" style="top:180px">web-research</div><div class="node-s" style="top:320px">document-writing-cn</div><div class="node-s" style="top:460px">code-review</div><div class="node-s" style="top:600px">data-analysis-python</div><div class="node-s" style="top:740px">self-brainstorm</div>\n  <p class="sub" style="top:900px">\u80FD\u529B\uFF0C\u4E0D\u518D\u7ED1\u5B9A\u67D0\u4E00\u4E2A Agent\u3002</p>\n</div>\n<div class="fb-layer hud mo-am">\n  <div class="top"><span>TANGU \u2192 AMADEUS / \u5BF9\u8BDD \u2192 \u6210\u679C</span><span>KNOWLEDGE</span></div>\n  <div class="panel chat"><span class="lbl">CONVERSATION \xB7 \u4E34\u65F6</span><div class="bub me">\u628A\u4ECA\u5929\u7684\u53D1\u5E03\u7ED3\u8BBA\u6574\u7406\u4E00\u4E0B\u3002</div><div class="bub">\u7ED3\u8BBA\uFF1AHUMAN.md \u53CC\u5C42\u534F\u4F5C\u8BF4\u660E\u4E0A\u7EBF\uFF1BSkills \u53EF\u5171\u4EAB\uFF1B\u65B0\u6A21\u578B\u63A5\u5165\u3002\u5DF2\u5199\u5165\u7B14\u8BB0\u3002</div></div>\n  <div class="arrow">\u25B6\u25B6</div>\n  <div class="panel note"><span class="lbl">AMADEUS \xB7 NOTE</span><h4>Forsion 2.12 \u53D1\u5E03\u7EAA\u8981</h4><div class="ln" style="width:92%"></div><div class="ln" style="width:78%"></div>\n    <p class="todo">\u53D1\u5E03\u524D\u771F\u4EBA\u89C6\u89C9\u9A8C\u6536</p><p class="todo">\u66F4\u65B0 HUMAN.md \u793A\u4F8B</p>\n    <table><tr><td>\u6A21\u5757</td><td>\u8D1F\u8D23\u4EBA</td><td>\u72B6\u6001</td></tr><tr><td>HUMAN.md</td><td>Arioso</td><td>\u5B8C\u6210</td></tr><tr><td>Skills</td><td>Recita</td><td>\u9A8C\u6536</td></tr></table></div>\n  <p class="sub" style="top:830px">Conversation is temporary. Work should remain.<small>\u5BF9\u8BDD\u4F1A\u8FC7\u53BB\uFF0C\u6210\u679C\u5E94\u5F53\u7559\u4E0B\u3002</small></p>\n</div>\n<div class="fb-layer hud mo-models">\n  <div class="top"><span>INTELLIGENCE LAYER / \u667A\u80FD\u5C42</span><span>MODELS</span></div>\n  <div class="slots"><div class="slot">GPT-6 SOL<b>ONLINE</b></div><div class="slot">GPT-6 LUNA<b>ONLINE</b></div><div class="slot">CLAUDE OPUS 5.5<b>ONLINE</b></div><div class="slot ctx">CONTEXT \xB7 \u66F4\u7075\u6D3B\u7684\u4E0A\u4E0B\u6587\u7BA1\u7406</div></div>\n  <p class="sub" style="top:880px">Bring the intelligence you want.</p>\n</div>\n<div class="fb-layer hud mo-dev">\n  <div class="top"><span>REMOTE \xB7 MOBILE / \u591A\u8BBE\u5907</span><span class="alt">\u25CF LINKED</span></div>\n  <div class="device pc"><div class="scr"><i style="width:80%"></i><i style="width:60%"></i><i style="width:72%"></i><i style="width:40%"></i></div><p style="top:470px">WORKSTATION \xB7 \u9879\u76EE \xB7 \u6587\u4EF6 \xB7 \u5DE5\u5177</p></div>\n  <div class="wire"></div>\n  <div class="device ph"><div class="scr"><i style="width:90%"></i><i style="width:70%"></i></div><p style="top:470px">MOBILE</p></div>\n  <p class="sub" style="top:840px">\u534F\u4F5C\uFF0C\u4E0D\u88AB\u4E00\u53F0\u8BBE\u5907\u9650\u5236\u3002</p>\n</div>\n```\n\n```js\n// six panels; hits: 0 space \xB7 1 s1 \xB7 2 s2 \xB7 3 skills \xB7 4 shared \xB7 5 amadeus \xB7 6 arrow \xB7 7 note \xB7 8 sub \xB7 9 models \xB7 10 devices\nseq(\'.fb-layer\', [hits[0], hits[3], hits[4], hits[5], hits[9], hits[10]])\nslide(\'.mo-space .files .panel\', hits[0], { y: 30 }, { stagger: beat / 4 })\nS(\'.mo-space .s1\', hits[1], hits[2]); S(\'.mo-space .s2\', hits[2], 999)\ncut(\'.mo-skills .row\', hits[3], { stagger: .05 })\nconst opEls = $$(\'.mo-skills .ops span\')\nH(t => { const i = Math.floor((t - hits[3]) / (beat / 2)) - 1; opEls.forEach((el, k) => el.classList.toggle(\'on\', k === i)) })\n// shared skills: every Agent reaches the skills it borrows\nconst sy = [220, 450, 680], ky = [180, 320, 460, 600, 740]\nconst EDGES = [[0, 0], [0, 1], [0, 3], [1, 1], [1, 2], [1, 4], [2, 0], [2, 2], [2, 3], [2, 4]]\n$(\'.mo-shared .graph\').innerHTML = EDGES.map(([a, s]) => `<path pathLength="1" d="M320 ${sy[a] + 85} C 620 ${sy[a] + 85}, 640 ${ky[s] + 38}, 930 ${ky[s] + 38}"/>`).join(\'\')\nK(\'.mo-shared .graph path\', [[hits[4] + beat / 4, { \'--d\': 1 }], [hits[4] + beat * 1.5, { \'--d\': 0 }, \'out\']], { stagger: beat / 8 })\nslide(\'.mo-am .arrow\', hits[6], { x: -30 })\nK(\'.mo-am .note\', [[hits[6] - .01, { o: 0, x: -60 }], [hits[6], { o: .4 }, \'step\'], [hits[7], { o: 1, x: 0 }, \'out\']])\ncut(\'.mo-am .note > *:not(.lbl)\', hits[7], { stagger: beat / 4 })\nK(\'.mo-am .chat\', [[hits[7], { o: 1 }], [hits[8], { o: .3 }]])\ncut(\'.mo-am .sub\', hits[8])\nslide(\'.mo-models .slot\', hits[9], { x: -40 }, { stagger: beat / 2 })\nK(\'.mo-dev .wire\', [[hits[10], { \'--p\': 0 }], [t1, { \'--p\': 4 }, \'lin\']])\nfor (const k of [0, 3, 4, 5, 9, 10]) flash(hits[k], .45)\n```\n\n## finale \xB7 \u8865\u5B8C\n\n```fvs\n{ "length": "9 bars", "hits": [0, 4, 8, 12, 16, 20] }\n```\n\n```html\n<div data-seq="h0">\n  <div class="fb-card solid"><span class="fe mid" style="top:430px;font-size:48px;font-family:var(--f-display)">For years, we have been building better Agents.</span><span class="fe mid" style="top:520px;font-size:42px;color:#9a9a9a">\u591A\u5E74\u6765\uFF0C\u6211\u4EEC\u4E00\u76F4\u5728\u5EFA\u9020\u66F4\u597D\u7684 Agent\u3002</span></div>\n  <div class="fb-card solid"><span class="fe mid" style="top:430px;font-size:48px">Forsion 2.12 begins working on the other half.</span><span class="fe mid" style="top:520px;font-size:42px;color:#9a9a9a">Forsion 2.12\uFF0C\u5F00\u59CB\u8865\u5B8C\u53E6\u4E00\u534A\u3002</span></div>\n  <div class="fb-card solid"><span class="fk" style="left:112px;top:120px;font-size:90px">\u4EBA\u7C7B</span><span class="fe mid red" style="top:360px;font:900 250px/1 var(--f-display);letter-spacing:.02em">HUMAN.</span></div>\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:230px;font-size:220px">\u4E0D\u662F\u8BA9\u4EBA\u7C7B</span><span class="fk" style="left:110px;top:520px;font-size:260px">\u9002\u5E94 AI\u3002</span></div>\n  <div class="fb-card solid"><span class="fk" style="left:110px;top:230px;font-size:190px">\u800C\u662F\u8BA9\u4EBA\u4E0E AI\uFF0C</span><span class="fk" style="left:110px;top:500px;font-size:240px">\u5B66\u4F1A\u5F7C\u6B64\u9002\u5E94\u3002</span></div>\n  <div class="fb-card solid">\n    <span class="fk" style="left:112px;top:112px;font-size:76px">\u7B2C 2.12 \u8BDD</span>\n    <span class="fk" style="left:96px;top:222px;font-size:350px">\u4EBA\u7C7B</span>\n    <span class="fk" style="left:100px;top:578px;font-size:250px;transform:scaleX(.74)">\u8865\u5B8C\u8BA1\u5212</span>\n    <span class="fe" style="right:110px;top:876px;font-size:34px;text-align:right">EPISODE 2.12<br><span style="font-size:48px">COMPLETE THE OTHER HALF.</span></span>\n    <span class="fe" style="left:114px;top:982px;font:600 26px var(--f-cond);letter-spacing:.6em;color:#8c8c8c">FORSION</span>\n  </div>\n</div>\n```\n\n```js\nflash(hits[2], .9); flash(hits[5], .9)\n```\n\n## release \xB7 \u53D1\u5E03\n\n```fvs\n{ "length": "2 bars", "hits": [0, 4, 5], "class": "solid" }\n```\n\n```html\n<svg class="emblem" viewBox="190 110 630 745" aria-hidden="true"><path class="fs-line" d="M 351.75 194.02 C 350.54 192.44 350.51 190.75 351.62 188.97 A 2.32 2.23 -4.1 0 1 352.18 188.35 Q 352.45 188.14 377.03 170.33 Q 378.81 169.04 380.94 170.66 A 1.56 1.37 2.7 0 1 381.25 170.96 L 457.27 270.65 A 1.10 1.09 36.3 0 0 459.17 270.36 Q 488.11 189.64 508.46 132.09 C 509.66 128.70 511.09 127.48 514.58 128.66 Q 525.38 132.31 537.42 136.64 C 540.07 137.59 540.80 138.98 539.79 141.83 C 521.49 193.83 502.53 245.51 483.80 297.56 Q 482.68 300.66 484.29 302.73 Q 505.89 330.31 532.05 363.38 A 1.19 1.19 0.0 0 0 533.80 363.52 Q 534.34 363.02 535.34 361.84 Q 627.38 253.56 660.04 215.04 Q 678.56 193.20 685.40 185.40 Q 687.33 183.20 690.21 184.21 A 2.71 2.63 72.5 0 1 690.95 184.61 Q 707.19 197.49 711.84 201.05 Q 715.05 203.50 712.51 206.54 Q 662.78 265.87 661.72 266.73 C 660.84 267.46 659.22 269.62 658.86 270.69 A 1.52 1.51 9.2 0 0 660.30 272.68 Q 709.32 272.68 772.51 272.17 Q 776.38 272.13 776.36 275.70 Q 776.30 286.38 776.27 299.94 Q 776.26 302.63 773.50 302.66 Q 747.38 302.92 635.01 302.74 A 2.13 2.13 0.0 0 0 633.33 303.56 Q 586.76 363.64 576.45 376.72 Q 575.70 377.67 575.76 378.36 A 1.82 1.78 -2.1 0 0 577.56 380.00 Q 655.56 380.14 794.54 380.05 Q 798.66 380.05 798.67 383.78 Q 798.78 424.81 798.64 449.48 Q 798.63 451.75 795.88 452.50 A 1.21 1.08 -48.3 0 1 795.62 452.53 Q 675.18 452.52 576.49 452.55 C 573.01 452.55 572.16 453.97 572.16 457.39 Q 572.16 533.97 572.17 536.25 C 572.18 541.20 575.34 540.71 579.58 540.71 Q 704.78 540.66 751.42 540.80 C 754.22 540.80 755.95 541.53 755.99 544.50 Q 756.26 569.28 755.97 601.50 C 755.93 605.42 753.69 605.66 750.20 605.65 Q 674.11 605.47 575.94 605.68 Q 572.11 605.69 572.09 609.50 C 571.84 658.94 574.71 709.90 582.89 760.66 Q 586.77 784.77 593.78 804.72 Q 598.40 817.89 606.39 828.98 C 607.88 831.05 608.78 833.10 606.45 834.40 A 2.48 2.46 -61.0 0 1 605.12 834.79 L 464.88 834.73 A 0.91 0.79 -30.5 0 1 464.56 834.67 C 461.92 833.56 462.41 831.38 463.85 829.19 Q 471.41 817.68 475.57 803.81 C 478.89 792.75 481.68 780.44 483.44 769.18 Q 489.67 729.42 491.88 694.24 Q 495.65 634.21 495.25 574.00 C 495.21 568.29 494.67 563.43 489.98 559.95 Q 446.96 528.05 404.86 497.12 Q 399.01 492.82 392.18 495.15 Q 347.42 510.44 303.99 524.82 C 287.18 530.38 271.49 536.15 255.47 540.97 Q 253.29 541.63 251.75 539.77 A 1.65 1.62 17.8 0 1 251.47 539.24 Q 247.56 526.18 243.84 513.43 Q 242.95 510.37 245.26 508.76 A 1.08 0.98 16.6 0 1 245.57 508.61 Q 274.09 499.79 365.02 471.31 Q 366.75 470.77 367.33 469.60 A 2.40 2.40 0.0 0 0 366.47 466.51 C 315.32 433.70 274.89 409.24 212.01 371.24 Q 210.33 370.22 210.63 367.29 A 1.53 1.41 -29.6 0 1 210.82 366.70 Q 215.00 359.72 224.25 343.59 C 225.71 341.05 227.12 340.14 229.83 341.42 Q 231.65 342.28 238.85 346.65 Q 274.91 368.52 330.50 402.04 A 1.34 1.33 -63.4 0 0 332.42 401.40 Q 332.93 400.18 332.45 397.89 Q 327.93 376.01 314.75 306.22 C 314.11 302.81 315.15 301.13 318.52 300.32 Q 325.88 298.53 340.79 294.43 Q 345.49 293.13 346.43 297.91 Q 360.63 370.27 371.39 423.31 Q 371.72 424.94 373.88 426.38 Q 394.04 439.77 491.39 505.78 C 492.92 506.81 494.58 506.38 495.20 504.47 A 1.60 1.41 57.3 0 0 495.27 504.01 Q 495.38 416.33 495.13 391.20 Q 495.08 386.11 492.58 379.29 A 4.36 4.22 -76.7 0 0 491.77 377.93 Q 488.96 374.71 479.85 362.65 Q 419.13 282.27 351.75 194.02 Z" fill="none" stroke="#e3161b" stroke-width="3" pathLength="1"/>\n  <path class="fs-fill" d="M 351.75 194.02 C 350.54 192.44 350.51 190.75 351.62 188.97 A 2.32 2.23 -4.1 0 1 352.18 188.35 Q 352.45 188.14 377.03 170.33 Q 378.81 169.04 380.94 170.66 A 1.56 1.37 2.7 0 1 381.25 170.96 L 457.27 270.65 A 1.10 1.09 36.3 0 0 459.17 270.36 Q 488.11 189.64 508.46 132.09 C 509.66 128.70 511.09 127.48 514.58 128.66 Q 525.38 132.31 537.42 136.64 C 540.07 137.59 540.80 138.98 539.79 141.83 C 521.49 193.83 502.53 245.51 483.80 297.56 Q 482.68 300.66 484.29 302.73 Q 505.89 330.31 532.05 363.38 A 1.19 1.19 0.0 0 0 533.80 363.52 Q 534.34 363.02 535.34 361.84 Q 627.38 253.56 660.04 215.04 Q 678.56 193.20 685.40 185.40 Q 687.33 183.20 690.21 184.21 A 2.71 2.63 72.5 0 1 690.95 184.61 Q 707.19 197.49 711.84 201.05 Q 715.05 203.50 712.51 206.54 Q 662.78 265.87 661.72 266.73 C 660.84 267.46 659.22 269.62 658.86 270.69 A 1.52 1.51 9.2 0 0 660.30 272.68 Q 709.32 272.68 772.51 272.17 Q 776.38 272.13 776.36 275.70 Q 776.30 286.38 776.27 299.94 Q 776.26 302.63 773.50 302.66 Q 747.38 302.92 635.01 302.74 A 2.13 2.13 0.0 0 0 633.33 303.56 Q 586.76 363.64 576.45 376.72 Q 575.70 377.67 575.76 378.36 A 1.82 1.78 -2.1 0 0 577.56 380.00 Q 655.56 380.14 794.54 380.05 Q 798.66 380.05 798.67 383.78 Q 798.78 424.81 798.64 449.48 Q 798.63 451.75 795.88 452.50 A 1.21 1.08 -48.3 0 1 795.62 452.53 Q 675.18 452.52 576.49 452.55 C 573.01 452.55 572.16 453.97 572.16 457.39 Q 572.16 533.97 572.17 536.25 C 572.18 541.20 575.34 540.71 579.58 540.71 Q 704.78 540.66 751.42 540.80 C 754.22 540.80 755.95 541.53 755.99 544.50 Q 756.26 569.28 755.97 601.50 C 755.93 605.42 753.69 605.66 750.20 605.65 Q 674.11 605.47 575.94 605.68 Q 572.11 605.69 572.09 609.50 C 571.84 658.94 574.71 709.90 582.89 760.66 Q 586.77 784.77 593.78 804.72 Q 598.40 817.89 606.39 828.98 C 607.88 831.05 608.78 833.10 606.45 834.40 A 2.48 2.46 -61.0 0 1 605.12 834.79 L 464.88 834.73 A 0.91 0.79 -30.5 0 1 464.56 834.67 C 461.92 833.56 462.41 831.38 463.85 829.19 Q 471.41 817.68 475.57 803.81 C 478.89 792.75 481.68 780.44 483.44 769.18 Q 489.67 729.42 491.88 694.24 Q 495.65 634.21 495.25 574.00 C 495.21 568.29 494.67 563.43 489.98 559.95 Q 446.96 528.05 404.86 497.12 Q 399.01 492.82 392.18 495.15 Q 347.42 510.44 303.99 524.82 C 287.18 530.38 271.49 536.15 255.47 540.97 Q 253.29 541.63 251.75 539.77 A 1.65 1.62 17.8 0 1 251.47 539.24 Q 247.56 526.18 243.84 513.43 Q 242.95 510.37 245.26 508.76 A 1.08 0.98 16.6 0 1 245.57 508.61 Q 274.09 499.79 365.02 471.31 Q 366.75 470.77 367.33 469.60 A 2.40 2.40 0.0 0 0 366.47 466.51 C 315.32 433.70 274.89 409.24 212.01 371.24 Q 210.33 370.22 210.63 367.29 A 1.53 1.41 -29.6 0 1 210.82 366.70 Q 215.00 359.72 224.25 343.59 C 225.71 341.05 227.12 340.14 229.83 341.42 Q 231.65 342.28 238.85 346.65 Q 274.91 368.52 330.50 402.04 A 1.34 1.33 -63.4 0 0 332.42 401.40 Q 332.93 400.18 332.45 397.89 Q 327.93 376.01 314.75 306.22 C 314.11 302.81 315.15 301.13 318.52 300.32 Q 325.88 298.53 340.79 294.43 Q 345.49 293.13 346.43 297.91 Q 360.63 370.27 371.39 423.31 Q 371.72 424.94 373.88 426.38 Q 394.04 439.77 491.39 505.78 C 492.92 506.81 494.58 506.38 495.20 504.47 A 1.60 1.41 57.3 0 0 495.27 504.01 Q 495.38 416.33 495.13 391.20 Q 495.08 386.11 492.58 379.29 A 4.36 4.22 -76.7 0 0 491.77 377.93 Q 488.96 374.71 479.85 362.65 Q 419.13 282.27 351.75 194.02 Z" fill="#e3161b"/></svg>\n<div class="relt"><span class="nm">FORSION 2.12</span><span class="zh">\u73B0\u5DF2\u53D1\u5E03</span><span class="url">forsion.net</span></div>\n```\n\n```js\n// the special edition logo: the tree in the film\'s red, drawn, then filled on the hit\nK(\'.fs-line\', [[t0 + .1, { \'--d\': 1 }], [hits[1] - .3, { \'--d\': 0 }, \'out\']])\ncut(\'.fs-fill\', hits[1])\nslide(\'.relt\', hits[2], { y: 12 })\nflash(hits[1], .45)\n```\n\n## credit \xB7 \u51FA\u54C1\n\n```fvs\n{ "length": "2 bars", "hits": [0], "class": "solid" }\n```\n\n```html\n<div class="credit"><span class="by">MADE BY</span><span class="st">FORSION VIDEO STUDIO</span><hr></div>\n```\n\n```js\nK(\'.credit\', [[t0, { o: 0 }], [t0 + .4, { o: 1 }], [t1 - 1.2, { o: 1 }], [t1 - .2, { o: 0 }]])\n```\n', "assets": { "assets/aria.jpg": "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", "assets/arioso.jpg": "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", "assets/recita.jpg": "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" }, "audio": "audio/episode-2.12-score.mp3", "audioUrl": "https://raw.githubusercontent.com/Changan-Su/Forsion/main/plugins/forsion-video-studio/examples/episode-2.12/audio/episode-2.12-score.mp3" };

  // src/ui/workspace.js
  function registerWorkspace(ctx2, t2, { createProject: createProject2, exampleProject, remember: remember2 }) {
    const app2 = ctx2.app || {}, listeners = /* @__PURE__ */ new Set(), mounts = /* @__PURE__ */ new Set();
    let selected = null, paths = [], generation = 0;
    const emit = () => listeners.forEach((fn) => fn());
    const valid = (path) => typeof path === "string" && path.toLowerCase().endsWith(".fvs.md");
    const listed = (path) => valid(path) && !path.split("/").some((part) => part.startsWith("."));
    const titles = /* @__PURE__ */ new Map();
    const stemOf = (p) => p.split("/").pop().replace(/\.fvs\.md$/i, "");
    const rows = (query) => paths.map((p) => ({ key: p, title: titles.get(p) || stemOf(p), hint: p.slice(0, p.lastIndexOf("/")), icon: "layout" })).filter((r) => "".concat(r.title, " ").concat(r.key).toLocaleLowerCase().includes((query || "").toLocaleLowerCase()));
    async function readTitles(list2) {
      let changed = false;
      for (const p of list2) {
        if (titles.has(p)) continue;
        let title = "";
        try {
          const text = await app2.readFile(p);
          title = text && parseProject(text).meta.title || "";
        } catch {
          title = "";
        }
        titles.set(p, String(title).trim());
        changed = true;
      }
      if (changed) emit();
    }
    async function refresh() {
      if (selected) titles.delete(selected);
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
    const newProject = safe(async () => open(await createProject2(app2.workFolder?.() || "Forsion Video Studio", false)));
    const example = safe(async () => open(await exampleProject(false)));
    function library(el, onOpen, empty = false) {
      const shell = h("div", { class: "fvs-extension fvs-library" }, h("style", { text: CSS2 }));
      const search = h("input", { class: "fvs-input", type: "search", placeholder: t2("project-search"), "aria-label": t2("project-search") });
      const list2 = h("div", { class: "fvs-project-list" });
      const render = () => {
        list2.replaceChildren();
        for (const row of rows(search.value)) list2.append(h(
          "button",
          { class: "fvs-project-item", "data-project-path": row.key, onclick: () => onOpen(row.key) },
          icon("FileVideo"),
          h("span", {}, h("strong", { text: row.title }), h("small", { text: row.key }))
        ));
        if (!list2.children.length) list2.append(h("p", { class: "fvs-hint", text: t2("projects-empty") }));
      };
      search.oninput = render;
      shell.append(
        h("div", { class: "fvs-library-heading" }, icon("Film"), h("h2", { text: t2(empty ? "workspace-welcome" : "projects") })),
        h("p", { class: "fvs-hint", text: t2("workspace-intro") }),
        h(
          "div",
          { class: "fvs-row" },
          h("button", { class: "fvs-btn primary", onclick: newProject }, icon("Plus"), t2("new-project")),
          h("button", { class: "fvs-btn", onclick: example }, t2("open-example"))
        ),
        search,
        list2
      );
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
      let studio = null, host = null;
      const link = () => {
        host?.show(studio ? studio.timeline : null);
        studio?.attach(host ? host.shell : null);
      };
      return {
        studio(client) {
          studio?.attach(null);
          studio = client;
          link();
          return () => {
            if (studio !== client) return;
            studio = null;
            client.attach(null);
            host?.show(null);
          };
        },
        host(panel) {
          host = panel;
          link();
          return () => {
            if (host !== panel) return;
            host = null;
            studio?.attach(null);
          };
        }
      };
    })();
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
      const docked = !compact && view.surface !== "floating" && view.getParams?.().timeline === "bottom" && !!ctx2.viewLocations?.includes("bottom");
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
            });
          },
          onClose(reason) {
            if (!switching && (reason === "close" || reason === "dismiss")) disposeContent?.restoreSide?.();
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
      async function show(next) {
        if (!valid(next)) return false;
        if (next === path) return true;
        const gen = ++request;
        if (await app2.readFile(next).catch(() => null) === null || disposed || gen !== request) return false;
        if (await disposeContent?.flush?.() === false || disposed || gen !== request) return false;
        view.extendView?.close();
        disposeContent?.();
        holder.replaceChildren();
        path = next;
        if (!compact) {
          selected = next;
          remember2(next);
          emit();
        }
        if (view.getParams?.().filePath !== next) view.setParams?.({ filePath: next });
        disposeContent = mountStudio(ctx2, holder, next, t2, {
          view,
          compact,
          chooseProject: picker,
          openWorkspace: () => open(next),
          dock: docked ? dock : null,
          showTimeline: () => ctx2.openView?.("timeline", { location: "bottom" }),
          showInMain: () => {
            view.setParams?.({ filePath: next });
            view.showInMainPanel?.();
          },
          openMini: ctx2.openMiniPanel ? () => ctx2.openMiniPanel("preview", { title: t2("mini-preview"), params: { filePath: next }, mainViewId: "studio", mainViewParams: { filePath: next } }) : null,
          openFloating: ctx2.openFloatingPanel ? () => ctx2.openFloatingPanel("studio", { title: t2("app"), params: { filePath: next }, width: 1120, height: 820, minWidth: 480, minHeight: 580 }) : null
        });
        return true;
      }
      const record = { show, compact };
      mounts.add(record);
      const unsubscribe = view.onParamsChanged?.((params) => {
        if (valid(params.filePath)) void show(params.filePath);
      });
      (async () => {
        let last = null;
        try {
          last = (await ctx2.loadData?.())?.last;
        } catch {
        }
        if (disposed || path) return;
        const initial = view.getParams?.().filePath || selected || last;
        if (valid(initial)) await show(initial);
        if (!disposed && !path) disposeContent = library(holder, show, true);
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
    ctx2.registerView?.({ id: "studio", title: t2("app"), workspaceSource: "projects", singleton: true, mount: (el, view) => mountWorkspace(el, view) });
    ctx2.registerView?.({ id: "preview", title: t2("mini-preview"), singleton: true, mount: (el, view) => mountWorkspace(el, view, true) });
    ctx2.registerView?.({ id: "timeline", title: t2("timeline"), singleton: true, mount: (el) => mountTimeline(el) });
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
      actions: [{ id: "new", label: t2("new-project-short"), primary: true, run: newProject }, { id: "example", label: t2("open-example"), run: example }, { id: "refresh", label: t2("refresh-projects"), run: refresh }]
    });
    ctx2.registerCommand({ id: "fvs-open-studio", title: t2("open-workspace"), keywords: "video studio space \u89C6\u9891\u5DE5\u4F5C\u5BA4 \u7A7A\u95F4", run: () => ctx2.openView?.("studio") });
    return { open, newProject, example };
  }

  // src/ui/plugin.js
  var t = makeT(ctx);
  var EXT = ".fvs.md";
  var ICON = "layout";
  var app = ctx.app || {};
  var workspace = null;
  var workFolder = () => app.workFolder ? app.workFolder() : "Forsion Video Studio";
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
    const base = "\u65B0\u89C6\u9891";
    let path = joinPath(folder || "", "".concat(base).concat(EXT));
    for (let k = 2; await exists(path); k++) path = joinPath(folder || "", "".concat(base, " ").concat(k).concat(EXT));
    await app.writeFile(path, evaTemplate({ title: base, zh: !t.en() }));
    await trust(ctx, path);
    if (open && app.openFile) app.openFile(path);
    return path;
  }
  async function openExample(open = true) {
    const dir = "".concat(workFolder(), "/\u7B2C 2.12 \u8BDD");
    const file = "".concat(dir, "/episode-2.12").concat(EXT);
    try {
      if (!await exists(file)) {
        for (const [rel, b642] of Object.entries(example_src_default.assets)) {
          if (app.writeBytes) await app.writeBytes("".concat(dir, "/").concat(rel), Uint8Array.from(atob(b642), (c) => c.charCodeAt(0)));
        }
        await app.writeFile(file, example_src_default.text);
      }
      await trust(ctx, file);
      if (open && app.openFile) app.openFile(file);
      const audio = "".concat(dir, "/").concat(example_src_default.audio);
      if (app.writeBytes && !await exists(audio)) {
        fetch(example_src_default.audioUrl).then((r) => r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))).then((buf) => app.writeBytes(audio, new Uint8Array(buf))).catch(() => notify(ctx, t("example-audio-failed"), "warn"));
      }
      return file;
    } catch (e) {
      notify(ctx, String(e && e.message || e), "warn");
    }
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
    workspace = registerWorkspace(ctx, t, { createProject, exampleProject: openExample, remember });
    ctx.registerFileCreator({ id: "new-project", label: t("new-project"), icon: ICON, run: (parent) => createProject(parent).then(() => {
    }) });
    ctx.registerCommand({
      id: "fvs-new-project",
      title: "Video Studio\uFF1A".concat(t("new-project")),
      keywords: "video studio fvs \u89C6\u9891 \u5DE5\u7A0B \u65B0\u5EFA \u52A8\u753B \u5BA3\u4F20\u7247",
      run: workspace.newProject
    });
    ctx.registerCommand({
      id: "fvs-open-example",
      title: "Video Studio\uFF1A".concat(t("open-example")),
      keywords: "video studio fvs example \u793A\u4F8B 2.12 eva \u8865\u5B8C",
      run: workspace.example
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
