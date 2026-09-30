// The editing chrome consumes Genesis tokens; the video canvas keeps the project's own palette.
export const CSS = `
.fvs-studio{
 --fv-bg:var(--bg,#151515);--fv-card:var(--bg-card,#1e1e1e);--fv-text:var(--text,#ececec);--fv-muted:var(--text-muted,#9a9a9a);--fv-line:var(--border,#333);--fv-accent:var(--accent,#4d8794);
 --fv-ok:#35b37e;--fv-warn:#b77c21;--fv-bad:#d85349;--fv-hit:#ed9747;--fv-timeline-height:224px;
 --fv-caption:var(--ui-font-caption,11px);--fv-meta:var(--ui-font-meta,12px);--fv-body:var(--ui-font-body,13px);--fv-heading:var(--ui-font-heading,14px);
 --fv-radius:var(--radius-sm,6px);--fv-mono:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);
 position:relative;height:100%;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;background:var(--fv-bg);color:var(--fv-text);font:var(--fv-body)/1.45 var(--font-ui,system-ui,-apple-system,"Segoe UI","PingFang SC",sans-serif);overflow:hidden}
.fvs-studio *{box-sizing:border-box}
.fvs-studio [hidden]{display:none!important}
.fvs-studio button,.fvs-studio input,.fvs-studio select,.fvs-studio textarea{font:inherit;color:inherit}
.fvs-studio button{cursor:pointer}
.fvs-studio svg{flex-shrink:0;display:block;pointer-events:none}
.fvs-studio :focus-visible{outline:2px solid var(--fv-accent);outline-offset:2px}
.fvs-studio input:focus-visible,.fvs-studio textarea:focus-visible{outline:1px solid var(--fv-accent);outline-offset:0;border-color:var(--fv-accent)}
.fvs-grow{flex:1}
.fvs-bar{display:flex;align-items:center;gap:14px;padding:10px 16px;border-bottom:1px solid var(--fv-line);min-width:0;min-height:60px;background:var(--fv-card)}
.fvs-project-brand{display:flex;align-items:center;gap:10px;min-width:0}
.fvs-brand-mark{display:grid;place-items:center;width:32px;height:32px;background:color-mix(in srgb,var(--fv-accent) 10%,transparent);color:var(--fv-accent);border-radius:var(--fv-radius)}
.fvs-brand-mark svg{width:19px;height:19px}
.fvs-project-heading{display:grid;gap:1px;min-width:0}
.fvs-app-name{font-size:var(--fv-caption);color:var(--fv-muted)}
.fvs-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;max-width:36ch}
.fvs-status{display:flex;align-items:center;gap:5px;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap}
.fvs-status::before{content:'';height:5px;width:5px;border-radius:50%;background:var(--fv-ok)}
.fvs-status[data-state=unsaved]::before,.fvs-status[data-state=saving]::before{background:var(--fv-warn)}
.fvs-status[data-state=save-failed]::before{background:var(--fv-bad)}
.fvs-history,.fvs-header-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}
.fvs-history{padding-right:12px;border-right:1px solid var(--fv-line)}
.fvs-btn{height:var(--ui-control-height,28px);padding:0 10px;border-radius:var(--fv-radius);border:1px solid var(--fv-line);background:var(--fv-card);display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;font-size:var(--fv-meta)!important}
.fvs-btn:hover{background:color-mix(in srgb,var(--fv-text) 5%,var(--fv-card));border-color:color-mix(in srgb,var(--fv-text) 20%,var(--fv-line))}
.fvs-btn:active:not([disabled]){background:color-mix(in srgb,var(--fv-text) 10%,var(--fv-card))}
.fvs-btn[disabled]{opacity:.35;cursor:default}
.fvs-btn.primary{background:var(--fv-accent);border-color:var(--fv-accent);color:var(--accent-text,#fff)}
.fvs-btn.primary:hover{filter:brightness(.94)}
.fvs-btn.icon{width:28px;padding:0;border-color:transparent;background:transparent}
.fvs-btn.icon:hover{background:color-mix(in srgb,var(--fv-text) 7%,transparent)}
.fvs-btn.icon[aria-pressed=true]{color:var(--fv-accent);background:color-mix(in srgb,var(--fv-accent) 9%,transparent)}
.fvs-ai-action{color:var(--fv-accent)!important;border-color:transparent;background:transparent}
.fvs-score-action{border-color:transparent;background:transparent}
.fvs-main{position:relative;display:grid;grid-template-columns:208px minmax(0,1fr) 292px;min-height:0;min-width:0}
.fvs-storyboard{display:grid;grid-template-rows:auto auto minmax(0,1fr);min-height:0;border-right:1px solid var(--fv-line);background:var(--fv-card)}
.fvs-story-heading,.fvs-side-heading{display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;font-size:var(--fv-meta)}
.fvs-story-heading strong,.fvs-side-heading strong{font-weight:600}
.fvs-scene-count{color:var(--fv-muted);font:var(--fv-caption)/1 var(--fv-mono);flex:1}
.fvs-scene-search{position:relative;margin:0 10px 10px}
.fvs-scene-search svg{position:absolute;left:8px;top:8px;color:var(--fv-muted);width:14px;height:14px}
.fvs-scene-search .fvs-input{padding-left:29px;background:var(--fv-bg)}
.fvs-scene-list{overflow:auto;padding:0 6px 8px;scrollbar-width:thin;scrollbar-color:var(--fv-line) transparent}
.fvs-scene-item{display:flex;align-items:center;gap:9px;width:100%;padding:9px 7px;text-align:left;background:transparent;border:1px solid transparent;border-radius:var(--fv-radius);margin:1px 0}
.fvs-scene-item:hover{background:color-mix(in srgb,var(--fv-text) 4%,transparent)}
.fvs-scene-item.on{background:color-mix(in srgb,var(--fv-accent) 8%,transparent);border-color:color-mix(in srgb,var(--fv-accent) 22%,transparent)}
.fvs-scene-thumb{flex-shrink:0;width:48px;height:36px;display:grid;place-items:center;overflow:hidden;border-radius:3px;background:color-mix(in srgb,var(--fv-accent) 10%,var(--fv-bg));border:1px solid var(--fv-line);color:var(--fv-muted);text-align:center;padding:3px}
.fvs-scene-thumb span{font-size:var(--fv-caption);line-height:1.1;max-height:25px;overflow:hidden;word-break:break-all}
.fvs-scene-thumb img{width:100%;height:100%;object-fit:cover}
.fvs-scene-info{display:grid;gap:4px;min-width:0}
.fvs-scene-title{font-size:var(--fv-meta);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-weight:500}
.fvs-scene-meta{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}
.fvs-scenes-empty{padding:14px 8px}
.fvs-preview{display:grid;grid-template-rows:42px minmax(0,1fr) 48px;min-width:0;min-height:0}
.fvs-preview-bar{display:flex;align-items:center;gap:8px;padding:0 12px;border-bottom:1px solid var(--fv-line);min-width:0}
.fvs-area-label{font-size:var(--fv-meta);font-weight:500;white-space:nowrap}
.fvs-current-scene{font-size:var(--fv-caption);color:var(--fv-muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-left:4px}
.fvs-format{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}
.fvs-viewport{display:grid;place-items:center;overflow:hidden;min-height:0;min-width:0;padding:24px;background:color-mix(in srgb,var(--fv-text) 4%,var(--fv-bg))}
.fvs-view{position:relative;min-width:0;background:#101010;outline:1px solid color-mix(in srgb,var(--fv-text) 15%,transparent);box-shadow:var(--card-shadow,none);overflow:hidden}
.fvs-view iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#141414}
.fvs-view iframe.fvs-pending{visibility:hidden}
.fvs-transport{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;padding:0 16px;border-top:1px solid var(--fv-line);min-width:0}
.fvs-time{font:var(--fv-caption)/1 var(--fv-mono);font-variant-numeric:tabular-nums;color:var(--fv-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-playback-actions,.fvs-preview-options{display:flex;align-items:center;gap:5px}
.fvs-preview-options{justify-content:flex-end}
.fvs-play{min-width:76px;height:30px;background:var(--fv-text);border-color:var(--fv-text);color:var(--fv-bg)!important}
.fvs-play:hover{background:var(--fv-text);border-color:var(--fv-text);opacity:.88}
.fvs-gate{position:absolute;inset:0;display:grid;place-items:center;background:#111;color:#ddd;padding:20px;text-align:center;overflow:auto}
.fvs-gate > div{max-width:420px;display:grid;gap:12px;justify-items:center}
.fvs-gate h3{margin:0;font-size:var(--fv-heading)}
.fvs-gate p{margin:0;color:#aaa;font-size:var(--fv-meta)}
.fvs-errs{position:absolute;left:8px;right:8px;bottom:8px;max-height:40%;overflow:auto;background:rgba(40,10,10,.92);color:#ffb4a8;border:1px solid #7a2d2d;border-radius:var(--fv-radius);padding:8px 10px;font:var(--fv-meta)/1.5 var(--fv-mono);white-space:pre-wrap}
.fvs-inline{position:absolute;z-index:5;min-width:160px;display:grid;gap:4px}
.fvs-inline textarea{width:100%;resize:none;border:2px solid var(--fv-hit);border-radius:var(--fv-radius);background:#0d0d0d;color:#fff;padding:6px 8px;font-size:var(--fv-heading);line-height:1.4;box-shadow:var(--card-shadow,none)}
.fvs-inline small{color:#bbb;text-shadow:0 1px 2px #000}
.fvs-side{border-left:1px solid var(--fv-line);background:var(--fv-card);display:grid;grid-template-rows:42px 36px minmax(0,1fr);min-height:0;min-width:0}
.fvs-side-heading{justify-content:space-between;border-bottom:1px solid var(--fv-line)}
.fvs-inspector-selection{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted)}
.fvs-tabs{display:flex;border-bottom:1px solid var(--fv-line);padding:0 8px;gap:4px}
.fvs-tabs button{flex:1;height:36px;border:0;background:none;color:var(--fv-muted);border-bottom:2px solid transparent;font-size:var(--fv-meta)}
.fvs-tabs button[aria-selected=true]{color:var(--fv-accent);border-bottom-color:var(--fv-accent);font-weight:500}
.fvs-panel{overflow:auto;padding:14px;display:grid;gap:16px;align-content:start;scrollbar-width:thin;scrollbar-color:var(--fv-line) transparent}
.fvs-panel h4{margin:0;font-size:var(--fv-meta);font-weight:600;color:var(--fv-muted);display:flex;align-items:center;gap:8px}
.fvs-panel .fvs-hint,.fvs-hint{margin:0;color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.6}
.fvs-section{display:grid;gap:12px}
.fvs-section + .fvs-section{padding-top:16px;border-top:1px solid var(--fv-line)}
.fvs-scene-summary{display:grid;gap:4px;margin-bottom:2px}
.fvs-scene-summary strong{font-size:var(--fv-heading);font-weight:600;overflow-wrap:anywhere}
.fvs-scene-summary span{font:var(--fv-caption)/1.5 var(--fv-mono);color:var(--fv-muted)}
.fvs-advanced{border-block:1px solid var(--fv-line);padding:10px 0}
.fvs-advanced summary{display:flex;align-items:center;gap:7px;cursor:pointer;color:var(--fv-muted);font-size:var(--fv-meta);list-style:none}
.fvs-advanced summary::after{content:'›';margin-left:auto;transform:rotate(0deg)}
.fvs-advanced[open] summary::after{transform:rotate(90deg)}
.fvs-advanced .fvs-section{margin-top:12px}
.fvs-field{display:grid;gap:6px;min-width:0}
.fvs-field > span{font-size:var(--fv-meta);color:var(--fv-muted)}
.fvs-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.fvs-row > .fvs-field{flex:1;min-width:90px}
.fvs-input{width:100%;height:30px;min-width:0;border:1px solid var(--fv-line);border-radius:var(--fv-radius);background:var(--fv-bg);padding:0 9px;font-size:var(--fv-meta)!important}
textarea.fvs-input{height:auto;min-height:32px;padding:7px 9px;resize:vertical;line-height:1.5}
.fvs-scene-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.fvs-scene-actions .fvs-btn{justify-content:flex-start;padding-inline:8px}
.fvs-delete-scene{justify-self:start;color:var(--fv-bad)!important;border:0;background:transparent;padding-left:0}
.fvs-code-block{border:1px solid var(--fv-line);border-radius:var(--fv-radius);overflow:hidden}
.fvs-code{width:100%;min-height:160px;border:0;background:var(--fv-bg);padding:10px;font:var(--fv-meta)/1.6 var(--fv-mono)!important;resize:vertical;white-space:pre;tab-size:2;display:block}
.fvs-code-footer{display:flex;align-items:center;justify-content:space-between;padding:5px 8px;border-top:1px solid var(--fv-line);color:var(--fv-muted);font-size:var(--fv-caption)}
.fvs-list{display:grid;gap:8px}
.fvs-text-item{display:grid;gap:6px;padding:8px;border-radius:var(--fv-radius);border:1px solid var(--fv-line);background:var(--fv-bg)}
.fvs-text-item:hover,.fvs-text-item.on{border-color:color-mix(in srgb,var(--fv-accent) 35%,var(--fv-line))}
.fvs-text-item .fvs-meta{display:flex;gap:6px;align-items:center;font-size:var(--fv-caption);color:var(--fv-muted)}
.fvs-text-item .fvs-meta .fvs-grow{flex:1}
.fvs-link{border:0;background:none;color:var(--fv-accent)!important;padding:0;font-size:var(--fv-meta)!important;text-align:left}
.fvs-suggest{border:1px dashed var(--fv-accent);border-radius:var(--fv-radius);padding:8px;display:grid;gap:8px}
.fvs-timed{display:grid;grid-template-columns:minmax(0,1fr) 54px 54px 64px;gap:4px;align-items:center;font-size:var(--fv-caption)}
.fvs-timed .fvs-input{height:26px;padding:0 5px}
.fvs-timed .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-problems{display:grid;gap:4px;font:var(--fv-meta)/1.5 var(--fv-mono);overflow-wrap:anywhere}
.fvs-problems .e{color:var(--fv-bad)} .fvs-problems .w{color:var(--fv-warn)}
.fvs-banner{position:absolute;left:50%;top:68px;transform:translateX(-50%);z-index:20;background:var(--fv-card);border:1px solid var(--fv-line);border-radius:var(--radius-md,12px);padding:10px 12px;display:flex;gap:10px;align-items:center;box-shadow:var(--card-shadow,none);max-width:min(640px,94%)}
.fvs-pop{position:absolute;z-index:30;background:var(--fv-card);border:1px solid var(--fv-line);border-radius:var(--radius-md,12px);padding:14px;box-shadow:var(--card-shadow,none);display:grid;gap:12px;width:min(460px,calc(100% - 16px));max-height:calc(100% - 80px);overflow:auto}
.fvs-pop h3{margin:0;font-size:var(--fv-heading)}
.fvs-pop textarea{min-height:90px}
.fvs-chips{display:flex;flex-wrap:wrap;gap:6px}
.fvs-chips button{border:1px solid var(--fv-line);background:none;border-radius:var(--fv-radius);padding:5px 8px;font-size:var(--fv-meta)}
.fvs-chips button:hover{border-color:var(--fv-accent)}
.fvs-menu{position:absolute;z-index:30;background:var(--fv-card);border:1px solid var(--fv-line);border-radius:var(--radius-md,12px);padding:5px;box-shadow:var(--card-shadow,none);display:grid;min-width:240px;max-width:calc(100% - 16px)}
.fvs-menu button{display:grid;text-align:left;border:0;background:none;padding:8px 10px;border-radius:var(--fv-radius);gap:3px;font-size:var(--fv-meta)}
.fvs-menu button:hover,.fvs-menu button:focus-visible{background:var(--menu-hover,var(--fv-bg))}
.fvs-menu small{color:var(--fv-muted);font-size:var(--fv-caption)}
/* The track rail remains fixed while both scene and audio lanes scroll together. */
.fvs-tl{background:var(--fv-card);display:grid;grid-template-rows:6px 40px var(--fv-timeline-height) 26px;min-width:0;user-select:none}
.fvs-tl-resize{cursor:row-resize;border-top:1px solid var(--fv-line);display:grid;place-items:center;touch-action:none}
.fvs-tl-resize::after{content:'';width:28px;height:2px;border-radius:2px;background:var(--fv-line)}
.fvs-tl-resize:hover::after{background:var(--fv-accent)}
.fvs-tl-bar{display:flex;gap:8px;align-items:center;padding:0 14px;font-size:var(--fv-meta);color:var(--fv-muted);border-bottom:1px solid var(--fv-line);min-width:0}
.fvs-tl-bar > svg{color:var(--fv-accent);width:14px}
.fvs-tl-bar strong{color:var(--fv-text);font-weight:500;white-space:nowrap}
.fvs-timeline-duration{font:var(--fv-caption)/1 var(--fv-mono);white-space:nowrap}
.fvs-snap-control,.fvs-zoom-controls{display:flex;gap:5px;align-items:center;white-space:nowrap}
.fvs-tl-bar select{height:25px;border:1px solid var(--fv-line);border-radius:var(--fv-radius);background:var(--fv-bg);font-size:var(--fv-caption)}
.fvs-tl-bar .fvs-btn{height:26px;padding:0 8px}
.fvs-zoom-controls input{width:70px;height:16px;accent-color:var(--fv-accent)}
.fvs-sync-button{background:transparent;border:0;padding:3px 6px;font-size:var(--fv-caption)!important;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:220px}
.fvs-sync-button:hover{background:var(--fv-bg);border-radius:var(--fv-radius)}
.fvs-tl-body{display:grid;grid-template-columns:100px minmax(0,1fr);min-height:0}
.fvs-track-rail{display:grid;grid-template-rows:28px 78px minmax(0,1fr);border-right:1px solid var(--fv-line);background:var(--fv-card);font-size:var(--fv-caption)}
.fvs-track-ruler{color:var(--fv-muted);padding:6px 12px}
.fvs-track-label{display:flex;align-items:center;gap:6px;padding:0 12px;border-top:1px solid var(--fv-line)}
.fvs-track-label svg{color:var(--fv-accent);width:14px}
.fvs-track-label.audio{align-items:flex-start;padding-top:20px;color:var(--fv-muted)}
.fvs-tl-scroll{position:relative;overflow-x:auto;overflow-y:hidden;min-height:0;height:100%;scrollbar-width:thin;scrollbar-color:var(--fv-line) transparent;background:var(--fv-bg)}
.fvs-tl-inner{position:relative;height:100%}
.fvs-tl-inner::after{content:'';position:absolute;top:106px;left:0;right:0;border-top:1px solid var(--fv-line);pointer-events:none}
.fvs-tl canvas{position:absolute;left:0;display:block}
.fvs-tl-ruler{top:0;height:22px;cursor:ew-resize}
.fvs-tl-scenes{position:absolute;left:0;top:28px;height:70px;right:0}
.fvs-clip{position:absolute;top:0;height:70px;border-radius:var(--fv-radius);background:color-mix(in srgb,var(--fv-accent) 10%,var(--fv-card));border:1px solid color-mix(in srgb,var(--fv-accent) 26%,var(--fv-line));cursor:pointer;overflow:visible}
.fvs-clip.alt{background:color-mix(in srgb,var(--fv-accent) 6%,var(--fv-card))}
.fvs-clip.on{border-color:var(--fv-accent);box-shadow:inset 0 0 0 1px var(--fv-accent);background:color-mix(in srgb,var(--fv-accent) 16%,var(--fv-card))}
.fvs-clip.err{border-color:var(--fv-bad)}
.fvs-clip .nm{position:absolute;left:8px;top:7px;right:10px;display:grid;gap:4px;overflow:hidden;pointer-events:none}
.fvs-clip .nm b{font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
.fvs-clip .nm small{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}
.fvs-clip .lane{position:absolute;left:0;right:0;bottom:3px;height:18px}
.fvs-clip .edge{position:absolute;right:-1px;top:0;bottom:0;width:8px;cursor:col-resize;border-radius:0 var(--fv-radius) var(--fv-radius) 0;z-index:2}
.fvs-clip .edge:hover,.fvs-clip .edge.drag{background:color-mix(in srgb,var(--fv-accent) 40%,transparent)}
.fvs-hitm{position:absolute;top:1px;width:12px;height:16px;margin-left:-6px;cursor:grab;z-index:1;touch-action:none}
.fvs-hitm::before{content:'';position:absolute;left:3px;top:4px;width:7px;height:7px;transform:rotate(45deg);background:var(--fv-hit);border-radius:1px}
.fvs-hitm.ok::before{background:var(--fv-ok)} .fvs-hitm.weak::before{background:var(--fv-warn)} .fvs-hitm.quiet::before{background:#8aa4ff}
.fvs-hitm.on::before{box-shadow:0 0 0 2px var(--fv-text)}
.fvs-tl-audio{top:112px;height:58px;cursor:ew-resize}
.fvs-tl-head{position:absolute;top:0;bottom:0;width:1px;background:var(--fv-hit);pointer-events:none;z-index:4}
.fvs-tl-head::before{content:'';position:absolute;left:-4px;top:0;border:5px solid transparent;border-top-color:var(--fv-hit)}
.fvs-tl-ghost{position:absolute;top:28px;height:70px;border:2px dashed var(--fv-accent);border-radius:var(--fv-radius);pointer-events:none;z-index:3}
.fvs-tl-empty{position:absolute;left:10px;top:30px;color:var(--fv-muted)}
.fvs-tl-footer{display:flex;justify-content:space-between;gap:10px;padding:5px 14px;border-top:1px solid var(--fv-line);color:var(--fv-muted);font-size:var(--fv-caption);line-height:1;white-space:nowrap;overflow:hidden}
/* View-sized responsive layouts also work in a side panel or a floating window. */
.fvs-studio.medium .fvs-main{grid-template-columns:208px minmax(0,1fr) 272px}
.fvs-studio.scenes-hidden .fvs-main{grid-template-columns:minmax(0,1fr) 292px}
.fvs-studio.scenes-hidden .fvs-storyboard{display:none}
.fvs-studio.inspector-hidden .fvs-main{grid-template-columns:208px minmax(0,1fr)}
.fvs-studio.inspector-hidden .fvs-side{display:none}
.fvs-studio.scenes-hidden.inspector-hidden .fvs-main{grid-template-columns:minmax(0,1fr)}
.fvs-studio.narrow .fvs-main{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(160px,1fr) minmax(0,.65fr)}
.fvs-studio.narrow .fvs-storyboard{position:absolute;inset:42px auto 0 0;width:208px;z-index:8;box-shadow:var(--card-shadow,0 2px 12px #0002)}
.fvs-studio.narrow .fvs-side{border-left:0;border-top:1px solid var(--fv-line);grid-template-rows:36px minmax(0,1fr)}
.fvs-studio.narrow .fvs-side-heading{display:none}
.fvs-studio.narrow.inspector-hidden .fvs-main{grid-template-rows:minmax(0,1fr)}
.fvs-studio.narrow .fvs-bar{gap:8px;padding:8px 10px;min-height:54px}
.fvs-studio.narrow .fvs-status,.fvs-studio.narrow .fvs-history,.fvs-studio.narrow .fvs-score-action{display:none}
.fvs-studio.narrow .fvs-ai-action span,.fvs-studio.narrow .fvs-brand-mark{display:none}
.fvs-studio.narrow .fvs-viewport{padding:12px}
.fvs-studio.narrow .fvs-format,.fvs-studio.narrow .fvs-preview-options .fvs-btn:not(:last-child){display:none}
.fvs-studio.narrow .fvs-preview-bar{padding:0 8px;gap:5px}
.fvs-studio.narrow .fvs-transport{padding:0 8px;grid-template-columns:minmax(0,1fr) auto 28px;gap:4px}
.fvs-studio.narrow .fvs-time{font-size:var(--fv-caption)}
.fvs-studio.narrow .fvs-timeline-duration,.fvs-studio.narrow .fvs-zoom-controls input,.fvs-studio.narrow .fvs-sync-button,.fvs-studio.narrow .fvs-tl-footer span:last-child{display:none}
.fvs-studio.narrow .fvs-tl-body{grid-template-columns:72px minmax(0,1fr)}
.fvs-studio.narrow .fvs-tl-bar{padding:0 10px;gap:5px}
.fvs-studio.narrow .fvs-track-label{padding-inline:8px;gap:4px}
.fvs-studio.narrow .fvs-track-label svg{display:none}
.fvs-studio.focus-preview .fvs-main{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr)}
.fvs-studio.focus-preview .fvs-storyboard,.fvs-studio.focus-preview .fvs-side{display:none}
@media(prefers-reduced-motion:reduce){.fvs-studio *{transition:none!important}}
/* note embeds */
.fvs-embed{position:relative;border:1px solid var(--border,#333);border-radius:var(--radius-md,12px);overflow:hidden;background:#111}
.fvs-embed iframe{display:block;width:100%;border:0;aspect-ratio:16/9;background:#111}
.fvs-embed .bar{display:flex;gap:8px;align-items:center;padding:6px 10px;font-size:var(--ui-font-meta,12px);color:var(--text-muted,#999);background:var(--bg-card,#1b1b1b)}
.fvs-embed .bar b{color:var(--text,#eee);font-weight:600;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-embed button{font:inherit;border:1px solid var(--border,#333);background:none;color:inherit;border-radius:var(--radius-sm,6px);padding:2px 8px;cursor:pointer}
`;

export function injectCss() {
  if (typeof document === 'undefined' || document.querySelector('style[data-fvs-studio]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-fvs-studio', ''); style.textContent = CSS; document.head.append(style);
}
