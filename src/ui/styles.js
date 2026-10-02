// The editing chrome consumes Genesis tokens (DESIGN.md §2–§5); only the video canvas keeps its own palette.
// Fallbacks derive from the text colour so the chrome stays legible in hosts that ship few tokens.
// Fixed colours appear only on the artwork: the stage's black letterbox and the scrim that keeps clip labels
// readable over a poster frame. Never style scrollbars here (DESIGN §6 「滚动条」).
export const CSS = `
.fvs-studio,.fvs-extension,.fvs-layer{
 --fv-text:var(--text,#1c1c1c);--fv-muted:var(--text-muted,#5f5f5d);--fv-line:var(--border,#e6e5e3);
 --fv-card:var(--bg-card,#fdfdfc);--fv-accent:var(--accent-ink,var(--accent,#1c1c1c));
 --fv-accent-soft:var(--accent-light,color-mix(in srgb,var(--fv-accent) 9%,transparent));
 --fv-fill:var(--action-fill,var(--fv-accent));--fv-on-fill:var(--on-action,var(--on-accent,#fff));
 --fv-hover:var(--overlay-light,color-mix(in srgb,var(--fv-text) 4%,transparent));
 --fv-press:var(--overlay-medium,color-mix(in srgb,var(--fv-text) 7%,transparent));
 --fv-strong:var(--overlay-strong,color-mix(in srgb,var(--fv-text) 14%,transparent));
 --fv-ok:var(--green,#4f6f52);--fv-warn:var(--warning,#806000);--fv-bad:var(--danger,#a3503f);
 --fv-wave:color-mix(in srgb,var(--fv-accent) 62%,transparent);
 --fv-caption:var(--ui-font-caption,11px);--fv-meta:var(--ui-font-meta,12px);--fv-body:var(--ui-font-body,13px);
 --fv-heading:var(--ui-font-heading,14px);--fv-title:var(--ui-font-title,16px);
 --fv-control:var(--ui-control-height,28px);--fv-r-sm:var(--radius-sm,6px);--fv-r-md:var(--radius-md,12px);--fv-r-lg:var(--radius-lg,16px);
 --fv-mono:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);--fv-ui:var(--font-ui,system-ui,-apple-system,"PingFang SC",sans-serif);
 --fv-shadow:var(--card-shadow,0 8px 24px rgba(0,0,0,.12));--fv-fast:var(--duration-fast,.15s);
 --fv-scrim:linear-gradient(180deg,rgba(0,0,0,.6),rgba(0,0,0,0));
 color:var(--fv-text);font:var(--fv-body)/1.45 var(--fv-ui)}
.fvs-studio *,.fvs-extension *,.fvs-layer *{box-sizing:border-box}
.fvs-studio [hidden],.fvs-extension [hidden],.fvs-layer [hidden]{display:none!important}
.fvs-studio :is(button,input,select,textarea),.fvs-extension :is(button,input,select,textarea),.fvs-layer :is(button,input,select,textarea){font:inherit;color:inherit}
.fvs-studio button,.fvs-extension button,.fvs-layer button{cursor:pointer}
.fvs-studio svg,.fvs-extension svg,.fvs-layer svg{flex-shrink:0;display:block;pointer-events:none}
.fvs-studio :focus-visible,.fvs-extension :focus-visible,.fvs-layer :focus-visible{outline:var(--focus-ring,1px) solid var(--fv-accent);outline-offset:1px}
.fvs-grow{flex:1}
.fvs-studio{position:relative;height:100%;min-height:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;outline:none;background:transparent}

/* buttons: the Genesis .btn vocabulary — outlined by default, one filled primary per surface */
.fvs-btn{height:var(--fv-control);padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--fv-r-sm);background:transparent;color:var(--fv-text);display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;font-size:var(--fv-meta);line-height:1;transition:background var(--fv-fast),border-color var(--fv-fast),color var(--fv-fast)}
.fvs-btn:hover:not(:disabled){border-color:var(--fv-accent);color:var(--fv-accent)}
.fvs-btn:disabled{opacity:.45;cursor:default}
.fvs-btn svg{width:15px;height:15px}
.fvs-btn.primary{background:var(--fv-fill);border-color:transparent;color:var(--fv-on-fill);box-shadow:var(--btn-shadow,none)}
.fvs-btn.primary:hover:not(:disabled){background:var(--action-fill-hover,var(--fv-fill));color:var(--fv-on-fill);border-color:transparent}
.fvs-btn.ghost,.fvs-btn.icon{border-color:transparent;color:var(--fv-muted)}
.fvs-btn.ghost:hover:not(:disabled),.fvs-btn.icon:hover:not(:disabled){background:var(--fv-hover);border-color:transparent;color:var(--fv-text)}
.fvs-btn.icon{width:var(--fv-control);padding:0}
.fvs-btn.icon[aria-pressed=true],.fvs-btn[aria-expanded=true]{background:var(--fv-accent-soft);color:var(--fv-accent);border-color:transparent}
.fvs-btn.danger{color:var(--fv-bad);border-color:color-mix(in srgb,var(--fv-bad) 35%,transparent)}
.fvs-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--fv-bad) 8%,transparent);border-color:var(--fv-bad);color:var(--fv-bad)}
.fvs-link{display:inline-flex;align-items:center;gap:4px;border:0;background:none;padding:0;color:var(--fv-accent);font-size:var(--fv-meta);text-align:left}
.fvs-link svg{width:13px;height:13px}

/* top bar: project, save state, history, the Director, export */
.fvs-bar{display:flex;align-items:center;gap:12px;min-width:0;min-height:46px;padding:6px 10px 2px 16px}
.fvs-title-group{display:flex;align-items:center;gap:10px;min-width:0}
.fvs-project{display:inline-flex;align-items:center;gap:4px;min-width:0;max-width:min(52ch,50vw);height:30px;padding:0 6px;margin-left:-6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-heading);font-weight:600}
button.fvs-project:hover{background:var(--fv-hover)}
.fvs-project-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-project svg{width:14px;height:14px;color:var(--fv-muted)}
.fvs-status{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:var(--fv-caption);color:var(--fv-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-status::before{content:'';flex-shrink:0;width:6px;height:6px;border-radius:50%;background:var(--fv-ok)}
.fvs-status:is([data-state=unsaved],[data-state=saving],[data-state=loading])::before{background:var(--fv-warn)}
.fvs-status[data-state=save-failed]{color:var(--fv-bad)}
.fvs-status[data-state=save-failed]::before{background:var(--fv-bad)}
.fvs-bar-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}
.fvs-history{display:flex;gap:2px;margin-right:6px}
.fvs-ai-action svg{color:var(--fv-accent)}
.fvs-export-action svg:last-child{width:13px;height:13px;margin-left:-2px;opacity:.75}

/* stage */
.fvs-main{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 300px;min-height:0;min-width:0}
.fvs-studio.medium .fvs-main{grid-template-columns:minmax(0,1fr) 272px}
:is(.fvs-studio,.fvs-dock-timeline).medium :is(.fvs-timeline-duration,.fvs-snap-control > span){display:none}
:is(.fvs-studio,.fvs-dock-timeline).medium .fvs-zoom-controls input{width:64px}
.fvs-studio.inspector-hidden .fvs-main{grid-template-columns:minmax(0,1fr)}
.fvs-studio.inspector-hidden .fvs-side{display:none}
.fvs-preview{display:grid;grid-template-rows:minmax(0,1fr) auto;min-width:0;min-height:0}
.fvs-viewport{display:grid;place-items:center;overflow:hidden;min-height:0;min-width:0;padding:10px 20px 8px}
.fvs-view{position:relative;min-width:0;background:#000;border-radius:var(--fv-r-sm);box-shadow:var(--fv-shadow);overflow:hidden}
.fvs-view iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#000}
.fvs-view iframe.fvs-pending{visibility:hidden}
.fvs-gate{position:absolute;inset:0;z-index:4;display:grid;place-items:center;padding:20px;overflow:auto;text-align:center;background:var(--fv-card);color:var(--fv-text)}
.fvs-gate > div{max-width:400px;display:grid;gap:10px;justify-items:center}
.fvs-gate svg{width:22px;height:22px;color:var(--fv-warn)}
.fvs-gate h3{margin:0;font-size:var(--fv-heading);font-weight:600}
.fvs-gate p{margin:0 0 4px;color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.6}
.fvs-errs{position:absolute;left:8px;right:8px;bottom:8px;z-index:3;max-height:40%;overflow:auto;padding:8px 10px;border:1px solid color-mix(in srgb,var(--fv-bad) 40%,transparent);border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-bad) 7%,var(--fv-card));color:var(--fv-bad);font:var(--fv-meta)/1.5 var(--fv-mono);white-space:pre-wrap}
.fvs-inline{position:absolute;z-index:5;min-width:160px;display:grid;gap:4px}
.fvs-inline textarea{width:100%;resize:none;padding:6px 8px;border:1px solid var(--fv-accent);border-radius:var(--fv-r-sm);box-shadow:0 0 0 .5px var(--fv-accent),var(--fv-shadow);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-heading);line-height:1.4;outline:none}
.fvs-inline small{justify-self:start;padding:2px 6px;border-radius:4px;background:var(--fv-card);color:var(--fv-muted);font-size:var(--fv-caption)}

/* transport: where you are on the left, playback in the middle, view options on the right */
.fvs-transport{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;min-width:0;min-height:44px;padding:0 12px 4px 20px}
.fvs-transport-info{display:flex;align-items:baseline;gap:10px;min-width:0}
.fvs-current-scene{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-time{font:var(--fv-meta)/1 var(--fv-mono);font-variant-numeric:tabular-nums;color:var(--fv-muted);white-space:nowrap}
.fvs-playback-actions{display:flex;align-items:center;gap:2px}
.fvs-play{width:36px;height:36px;margin:0 6px;padding:0;border:0;border-radius:50%;background:var(--fv-press);color:var(--fv-text)}
.fvs-play:hover:not(:disabled){background:var(--fv-strong);color:var(--fv-text)}
.fvs-play svg{width:17px;height:17px}
.fvs-play[data-playing=false] svg{margin-left:2px}
.fvs-preview-options{display:flex;align-items:center;justify-content:flex-end;gap:2px}

/* inspector: tabs are the header; the native Extend View supplies its own title and close button */
.fvs-side{display:grid;grid-template-rows:auto minmax(0,1fr);min-height:0;min-width:0;border-left:1px solid var(--fv-line)}
.fvs-side-top{display:flex;align-items:center;gap:4px;padding:6px 8px 4px 10px}
.fvs-tabs{display:flex;gap:2px;flex:1;min-width:0;overflow:hidden}
.fvs-tabs button{height:28px;padding:0 10px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}
.fvs-tabs button:hover{background:var(--fv-hover);color:var(--fv-text)}
.fvs-tabs button[aria-selected=true]{background:var(--fv-press);color:var(--fv-text)}
.fvs-panel{overflow:auto;padding:10px 14px 24px;display:grid;gap:20px;align-content:start;min-width:0}
.fvs-section{display:grid;gap:10px;min-width:0}
.fvs-section > h4,.fvs-panel > h4{margin:0;font-size:var(--fv-meta);font-weight:600;color:var(--fv-muted)}
.fvs-hint{margin:0;color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.55}
.fvs-field{display:grid;gap:5px;min-width:0}
.fvs-field > span{font-size:var(--fv-meta);color:var(--fv-muted)}
.fvs-row{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;min-width:0}
.fvs-row > .fvs-field{flex:1;min-width:76px}
.fvs-input{width:100%;height:var(--fv-control);min-width:0;padding:0 8px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-meta);outline:none;transition:border-color var(--fv-fast)}
.fvs-input:focus{border-color:var(--fv-accent)}
.fvs-input:disabled{opacity:.5}
textarea.fvs-input{height:auto;min-height:32px;padding:6px 8px;resize:vertical;line-height:1.5}
select.fvs-input{padding:0 4px}
.fvs-check{display:inline-flex;align-items:center;gap:6px;font-size:var(--fv-meta);color:var(--fv-text);white-space:nowrap;cursor:pointer}
.fvs-check input{margin:0;accent-color:var(--fv-accent)}
.fvs-empty{display:grid;justify-items:center;gap:8px;padding:28px 12px;text-align:center;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-empty svg{width:20px;height:20px}
.fvs-empty p{margin:0}
.fvs-scene-head{display:grid;gap:4px}
.fvs-scene-head > div{display:flex;justify-content:space-between;gap:8px;font:var(--fv-caption)/1.4 var(--fv-mono);color:var(--fv-muted)}
.fvs-studio .fvs-title-input,.fvs-extension .fvs-title-input{height:34px;margin-left:-7px;width:calc(100% + 7px);padding:0 6px;border-color:transparent;background:transparent;font-size:var(--fv-heading);font-weight:600}
.fvs-title-input:hover{border-color:var(--fv-line)}
.fvs-title-input:focus{border-color:var(--fv-accent);background:var(--fv-card)}
.fvs-unit-row{display:grid;grid-template-columns:minmax(0,1fr) 84px;gap:6px;align-items:center}
.fvs-unit{font-size:var(--fv-meta);color:var(--fv-muted);padding-left:2px}
.fvs-scene-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.fvs-scene-actions .fvs-btn{justify-content:flex-start}
.fvs-advanced summary{display:flex;align-items:center;gap:7px;list-style:none;cursor:pointer;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-advanced summary::-webkit-details-marker{display:none}
.fvs-advanced summary svg{width:14px;height:14px}
.fvs-advanced summary::after{content:'';margin-left:auto;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;rotate:-45deg;transition:rotate var(--fv-fast)}
.fvs-advanced[open] summary::after{rotate:45deg}
.fvs-advanced .fvs-section{margin-top:12px}
.fvs-timed{display:grid;grid-template-columns:minmax(0,1fr) 52px 52px 70px;gap:4px;align-items:center;font-size:var(--fv-caption)}
.fvs-timed.head small{color:var(--fv-muted)}
.fvs-timed .fvs-input{height:26px;padding:0 5px;font-size:var(--fv-caption)}
.fvs-timed .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-media-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center}
.fvs-media-row > input[type=file]{display:none}
.fvs-media-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:var(--fv-r-sm);background:var(--fv-hover);color:var(--fv-muted)}
.fvs-media-thumb{width:40px;height:40px;object-fit:cover;border-radius:var(--fv-r-sm);background:var(--fv-hover)}
.fvs-media-main{display:grid;gap:6px;min-width:0}
.fvs-media-main .fvs-row{align-items:center}
.fvs-media-name{font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.fvs-track-card{display:grid;gap:8px;padding:10px;border-radius:var(--fv-r-md);background:var(--fv-hover)}
.fvs-track-head{display:flex;align-items:center;gap:8px;min-width:0}
.fvs-track-head svg{width:14px;height:14px;color:var(--fv-muted)}
.fvs-track-head .fvs-media-name{flex:1}
.fvs-color-row{display:grid;grid-template-columns:var(--fv-control) minmax(0,1fr);gap:6px}
.fvs-color-row input[type=color]{width:var(--fv-control);height:var(--fv-control);padding:2px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card)}
.fvs-segmented{display:flex;gap:2px;padding:2px;border-radius:var(--fv-r-sm);background:var(--fv-hover);min-width:0}
.fvs-segmented button{flex:1;min-width:0;height:24px;padding:0 8px;border:0;border-radius:calc(var(--fv-r-sm) - 2px);background:none;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-segmented button[aria-checked=true]{background:var(--fv-card);color:var(--fv-text);box-shadow:var(--btn-shadow,0 0 0 1px var(--fv-line))}
.fvs-segmented button:disabled{opacity:.45}
.fvs-code-block{border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);overflow:hidden}
.fvs-code{display:block;width:100%;min-height:150px;padding:10px;border:0;background:var(--fv-hover);color:var(--fv-text);font:var(--fv-meta)/1.6 var(--fv-mono);resize:vertical;white-space:pre;tab-size:2;outline:none}
.fvs-code-footer{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 4px 10px;color:var(--fv-muted);font-size:var(--fv-caption)}
.fvs-code-footer .fvs-btn{height:24px}
.fvs-text-head{display:flex;align-items:center;gap:10px}
.fvs-text-head .fvs-hint{flex:1}
.fvs-list{display:grid;gap:8px}
.fvs-text-item{display:grid;gap:6px}
.fvs-text-item.on textarea{border-color:var(--fv-accent)}
.fvs-cap-actions{display:flex;flex-wrap:wrap;gap:6px}
.fvs-cap-actions > input[type=file]{display:none}
.fvs-cap-list{display:grid;gap:12px}
.fvs-cap-item{display:grid;gap:6px}
.fvs-cap-times{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto auto;gap:6px;align-items:center}
.fvs-cap-item.on textarea{border-color:var(--fv-accent)}
.fvs-meta{display:flex;justify-content:flex-end}
.fvs-suggest{display:grid;gap:8px;padding:8px 10px;border-radius:var(--fv-r-sm);background:var(--fv-accent-soft);font-size:var(--fv-meta)}
.fvs-problems{display:grid;gap:4px;font:var(--fv-meta)/1.5 var(--fv-mono);overflow-wrap:anywhere}
.fvs-problems .e{color:var(--fv-bad)} .fvs-problems .w{color:var(--fv-warn)}
.fvs-banner{position:absolute;left:50%;top:52px;translate:-50% 0;z-index:20;display:flex;gap:10px;align-items:center;max-width:min(640px,94%);padding:10px 12px;border:1px solid color-mix(in srgb,var(--fv-warn) 45%,transparent);border-radius:var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow);font-size:var(--fv-meta)}

/* timeline: a tinted band under the stage — no hairlines, the lanes carry the structure */
.fvs-tl{display:grid;grid-template-rows:10px auto var(--fv-timeline-height,200px);min-width:0;user-select:none;-webkit-user-select:none;background:var(--fv-hover)}
.fvs-tl-resize{cursor:row-resize;display:grid;place-items:center;touch-action:none}
.fvs-tl-resize::after{content:'';width:32px;height:3px;border-radius:2px;background:var(--fv-strong);opacity:0;transition:opacity var(--fv-fast)}
.fvs-tl:hover .fvs-tl-resize::after,.fvs-tl-resize:focus-visible::after{opacity:1}
.fvs-tl-bar{display:flex;align-items:center;gap:8px;min-width:0;padding:0 10px 6px;font-size:var(--fv-meta);color:var(--fv-muted)}
.fvs-tl-tools{display:flex;align-items:center;gap:2px}
.fvs-tl-sep{width:1px;height:16px;margin:0 6px;background:var(--fv-strong)}
.fvs-tl-tools .fvs-tl-add,.fvs-tl-tools .fvs-tl-import{border-color:transparent;color:var(--fv-text)}
.fvs-tl-tools .fvs-tl-add:hover:not(:disabled),.fvs-tl-tools .fvs-tl-import:hover:not(:disabled){background:var(--fv-press);border-color:transparent;color:var(--fv-text)}
.fvs-sync-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-strong);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap}
.fvs-sync-chip:hover{color:var(--fv-text);border-color:var(--fv-accent)}
.fvs-sync-chip i{width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}
.fvs-sync-chip[data-state=ok] i{background:var(--fv-ok)}
.fvs-sync-chip[data-state=warn] i{background:var(--fv-warn)}
.fvs-timeline-duration{font:var(--fv-caption)/1 var(--fv-mono);white-space:nowrap}
.fvs-snap-control{display:flex;align-items:center;gap:6px;white-space:nowrap}
:is(.fvs-studio,.fvs-dock-timeline) .fvs-snap-control select{height:24px;padding:0 4px;border:1px solid var(--fv-line);border-radius:var(--fv-r-sm);background:var(--fv-card);color:var(--fv-text);font-size:var(--fv-caption)}
.fvs-zoom-controls{display:flex;align-items:center;gap:2px}
.fvs-zoom-controls input{width:84px;margin:0 4px;accent-color:var(--fv-accent)}
.fvs-zoom-controls .fvs-btn.ghost{height:24px;padding:0 8px}
.fvs-tl-body{display:grid;grid-template-columns:76px minmax(0,1fr);min-height:0;overflow:hidden auto}
.fvs-track-rail{display:grid;grid-template-rows:24px 32px 64px;grid-auto-rows:44px;align-content:start;font-size:var(--fv-caption);color:var(--fv-muted)}
.fvs-rail-ruler{padding:6px 12px 0}
.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane{display:flex;align-items:center;gap:6px;min-width:0;padding:0 10px 0 12px}
.fvs-rail-captions svg,.fvs-rail-video svg,.fvs-rail-lane svg{width:14px;height:14px}
.fvs-rail-captions span,.fvs-rail-video span,.fvs-rail-lane span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-rail-audio{display:contents}
.fvs-tl-scroll{position:relative;overflow:auto hidden;min-height:0}
.fvs-tl-inner{position:relative}
.fvs-tl-ruler{position:absolute;left:0;top:0;cursor:ew-resize}
.fvs-tl-scenes{position:absolute;left:0;right:0;top:56px;height:64px}
/* the captions track sits above the picture track: what is drawn on the picture is drawn above it */
.fvs-cap-lane{position:absolute;left:0;right:0;top:24px;height:32px}
.fvs-cap-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:9px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}
.fvs-cap{position:absolute;top:4px;height:24px;display:flex;align-items:center;min-width:0;padding:0 7px;overflow:hidden;border:1px solid transparent;border-radius:var(--fv-r-sm);background:var(--fv-card);box-shadow:inset 0 0 0 1px var(--fv-line);color:var(--fv-text);font-size:var(--fv-caption);cursor:grab;touch-action:none}
.fvs-cap span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}
.fvs-cap:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}
.fvs-cap.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}
.fvs-cap-edge{position:absolute;top:0;bottom:0;width:6px;cursor:col-resize}
.fvs-cap-edge.start{left:0}
.fvs-cap-edge.end{right:0}
.fvs-cap-edge:hover{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}
.fvs-tl-lanes{position:absolute;left:0;right:0;top:0}
.fvs-clip{position:absolute;top:6px;height:52px;border:1px solid transparent;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 14%,var(--fv-card));overflow:hidden;cursor:pointer;touch-action:none}
.fvs-clip.alt{background:color-mix(in srgb,var(--fv-accent) 8%,var(--fv-card))}
.fvs-clip:hover{border-color:var(--fv-strong)}
.fvs-clip.on{border-color:var(--fv-accent);box-shadow:0 0 0 .5px var(--fv-accent)}
.fvs-clip.err{border-color:var(--fv-bad)}
.fvs-clip-thumb{position:absolute;inset:0;container-type:size;pointer-events:none}
.fvs-scene-thumb{position:absolute;inset:0;display:block;overflow:hidden}
.fvs-scene-thumb iframe{position:absolute;left:50%;top:50%;width:max(100cqw,calc(100cqh * var(--fv-ratio,1.7778)));height:max(100cqh,calc(100cqw / var(--fv-ratio,1.7778)));translate:-50% -50%;border:0;background:#000;pointer-events:none}
.fvs-clip-trans{position:absolute;left:0;top:0;bottom:0;z-index:1;background:linear-gradient(90deg,color-mix(in srgb,var(--fv-accent) 60%,transparent),transparent);pointer-events:none}
.fvs-clip-label{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:baseline;gap:6px;min-width:0;padding:5px 8px 12px;pointer-events:none}
.fvs-clip-label b{min-width:0;font-size:var(--fv-meta);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-clip-label small{font:var(--fv-caption)/1 var(--fv-mono);color:var(--fv-muted);white-space:nowrap}
.fvs-clip:has([data-rendered]) .fvs-clip-label{background:var(--fv-scrim)}
.fvs-clip:has([data-rendered]) .fvs-clip-label :is(b,small){color:#fff}
.fvs-clip.tight .fvs-clip-label{padding-inline:4px}
.fvs-clip.tight .fvs-clip-label small{display:none}
.fvs-clip-lane{position:absolute;left:0;right:0;bottom:1px;height:16px;z-index:3}
.fvs-hitm{position:absolute;top:2px;width:12px;height:12px;margin-left:-6px;cursor:grab;touch-action:none}
.fvs-hitm::before{content:'';position:absolute;left:3px;top:3px;width:6px;height:6px;rotate:45deg;border-radius:1px;background:var(--fv-card);box-shadow:0 0 0 1px var(--fv-muted)}
.fvs-hitm.ok::before{background:var(--fv-ok);box-shadow:0 0 0 1px var(--fv-card)}
.fvs-hitm.weak::before{background:var(--fv-warn);box-shadow:0 0 0 1px var(--fv-card)}
.fvs-hitm.quiet::before{background:var(--fv-card);box-shadow:0 0 0 1.5px var(--fv-ok)}
.fvs-hitm.on::before{box-shadow:0 0 0 2px var(--fv-accent)}
.fvs-edge{position:absolute;top:0;bottom:0;z-index:4;width:7px;cursor:col-resize}
.fvs-edge.start{left:0}
.fvs-edge.end{right:0}
.fvs-edge:hover,.fvs-edge.drag{background:color-mix(in srgb,var(--fv-accent) 45%,transparent)}
.fvs-clip.tight .fvs-edge{width:4px}
.fvs-tl-head{position:absolute;top:0;bottom:0;z-index:7;width:1.5px;margin-left:-.75px;background:var(--fv-accent);pointer-events:none}
.fvs-tl-head::before{content:'';position:absolute;left:-4.25px;top:0;width:10px;height:10px;border-radius:2px 2px 50% 50%;background:var(--fv-accent)}
.fvs-tl-ghost{position:absolute;top:62px;height:52px;z-index:6;border:1.5px dashed var(--fv-accent);border-radius:var(--fv-r-sm);pointer-events:none}
.fvs-tl-ghost.move{border-style:solid;background:color-mix(in srgb,var(--fv-accent) 16%,transparent)}
.fvs-tl-insert{position:absolute;top:58px;height:60px;z-index:7;width:2px;margin-left:-1px;border-radius:1px;background:var(--fv-accent);pointer-events:none}
.fvs-tl.reordering .fvs-clip{cursor:grabbing}
.fvs-tl-empty{position:absolute;left:12px;top:22px;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-lane{position:absolute;left:0;right:0;height:44px}
.fvs-lane.empty::after{content:attr(data-hint);position:absolute;left:12px;top:14px;color:var(--fv-muted);font-size:var(--fv-caption);pointer-events:none;white-space:nowrap}
.fvs-lane-region{position:absolute;top:5px;height:34px;overflow:hidden;border-radius:var(--fv-r-sm);background:color-mix(in srgb,var(--fv-accent) 9%,var(--fv-card));cursor:grab;touch-action:none}
.fvs-lane-region:hover{box-shadow:inset 0 0 0 1px var(--fv-strong)}
.fvs-lane-region.muted{opacity:.45}
.fvs-lane-wave{position:absolute;left:0;top:0}
.fvs-lane-name{position:absolute;left:8px;top:3px;color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;pointer-events:none}

/* panels without Extend View: a sheet over the editor */
.fvs-sheet{position:absolute;top:46px;right:8px;bottom:8px;z-index:20;width:min(380px,calc(100% - 16px));display:grid;grid-template-rows:auto minmax(0,1fr);overflow:hidden;border:1px solid var(--fv-line);border-radius:var(--fv-r-lg);background:var(--fv-card);box-shadow:var(--fv-shadow)}
.fvs-sheet-head{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 2px 16px;font-size:var(--fv-heading)}
.fvs-sheet-head strong{font-weight:600}
.fvs-sheet-body{min-height:0;overflow:hidden}

/* focus, narrow and compact (Mini) layouts follow the container, not the window */
.fvs-studio.focus-preview .fvs-tl,.fvs-studio.focus-preview .fvs-side,.fvs-studio.focus-preview .fvs-dock-strip{display:none}
.fvs-studio.narrow .fvs-main{grid-template-columns:minmax(0,1fr)}
.fvs-studio.narrow .fvs-side{position:absolute;top:0;right:0;bottom:48px;z-index:15;width:min(320px,94%);border:1px solid var(--fv-line);border-radius:var(--fv-r-md) 0 0 var(--fv-r-md);background:var(--fv-card);box-shadow:var(--fv-shadow)}
.fvs-studio.narrow .fvs-bar{padding-left:12px;gap:8px}
.fvs-studio.narrow :is(.fvs-status,.fvs-history,.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-current-scene,.fvs-sync-sum){display:none}
.fvs-dock-timeline.narrow :is(.fvs-timeline-duration,.fvs-snap-control span,.fvs-zoom-controls input,.fvs-sync-sum){display:none}
:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-sync-chip{width:24px;padding:0;justify-content:center}
.fvs-studio.narrow :is(.fvs-ai-action,.fvs-export-action) span,:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-tl-add,.fvs-tl-import) span{display:none}
.fvs-studio.narrow .fvs-transport{padding:0 8px 4px 12px}
:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-tl-body{grid-template-columns:44px minmax(0,1fr)}
:is(.fvs-studio,.fvs-dock-timeline).narrow :is(.fvs-rail-captions,.fvs-rail-video,.fvs-rail-lane) span,:is(.fvs-studio,.fvs-dock-timeline).narrow .fvs-rail-ruler{font-size:0}
.fvs-studio.narrow .fvs-viewport{padding:6px 10px}
.fvs-studio.compact{grid-template-rows:auto minmax(0,1fr)}
.fvs-studio.compact :is(.fvs-tl,.fvs-side,.fvs-history,.fvs-status,.fvs-ai-action,.fvs-export-action,.fvs-time){display:none}
.fvs-studio.compact .fvs-preview-options > :not(:first-child){display:none}
.fvs-studio.compact .fvs-viewport{padding:6px 8px}
.fvs-studio.compact .fvs-bar{min-height:40px;padding:4px 6px 0 12px}
.fvs-studio.tiny .fvs-frame-step{display:none}
@media (prefers-reduced-motion:reduce){.fvs-studio *,.fvs-layer *{transition:none!important;animation:none!important}}

/* floating layers on document.body: menus and popovers (DESIGN §3 「菜单几何」) */
.fvs-layer{position:fixed;z-index:100;background:var(--fv-card);color:var(--fv-text);border:1px solid var(--fv-line);border-radius:var(--fv-r-md);box-shadow:var(--fv-shadow);animation:ui-menu-enter var(--menu-enter-duration,0s) var(--menu-enter-ease,ease-out)}
.fvs-menu{display:grid;min-width:var(--menu-action-min,200px);max-width:var(--menu-action-max,320px);padding:var(--menu-shell-padding,4px)}
.fvs-menu > button{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:var(--menu-item-min-height,32px);padding:4px 8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left;font-size:var(--menu-text-size,var(--fv-heading));line-height:var(--menu-line-height,20px)}
.fvs-menu > button:hover,.fvs-menu > button:focus-visible{background:var(--menu-hover,var(--fv-press));outline:none}
.fvs-menu > button:disabled{opacity:.45}
.fvs-menu > button.danger{color:var(--fv-bad)}
.fvs-menu-icon{display:grid;place-items:center;color:var(--fv-muted)}
.fvs-menu-icon svg{width:16px;height:16px}
.fvs-menu-text{display:grid;gap:1px;min-width:0}
.fvs-menu-text small{color:var(--fv-muted);font-size:var(--fv-meta);line-height:1.4}
.fvs-menu-end{display:flex;align-items:center;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-menu-sep{height:1px;margin:4px 8px;background:var(--fv-line)}
.fvs-menu-heading{padding:6px 8px 2px;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-popover{width:max-content;max-width:min(440px,calc(100vw - 16px));max-height:min(600px,calc(100vh - 32px));overflow:auto;padding:12px;outline:none}
.fvs-pop-head{display:grid;gap:2px;margin-bottom:10px}
.fvs-pop-head strong{font-size:var(--fv-heading);font-weight:600}
.fvs-pop-head small{color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-layer kbd,.fvs-studio kbd{display:inline-block;min-width:20px;padding:1px 6px;border:1px solid var(--fv-line);border-radius:4px;background:var(--fv-hover);font:var(--fv-caption)/1.5 var(--fv-mono);text-align:center;white-space:nowrap}
.fvs-templates-pop{width:min(580px,calc(100vw - 16px));max-width:none}
.fvs-template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px}
.fvs-template{display:grid;gap:3px;align-content:start;padding:6px;border:1px solid transparent;border-radius:var(--fv-r-md);background:none;color:var(--fv-text);text-align:left}
.fvs-template:hover,.fvs-template:focus-visible{background:var(--fv-hover);border-color:var(--fv-line);outline:none}
.fvs-template-shot{position:relative;display:block;aspect-ratio:var(--fv-ratio,1.7778);max-height:180px;margin:0 auto 4px;width:100%;overflow:hidden;border-radius:var(--fv-r-sm);background:#000}
.fvs-template-shot iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}
.fvs-template b{font-size:var(--fv-meta);font-weight:500}
.fvs-template small{color:var(--fv-muted);font-size:var(--fv-caption);line-height:1.35}
.fvs-sync-pop{display:grid;gap:10px;width:300px}
.fvs-sync-pop .fvs-pop-head{margin:0}
.fvs-legend{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-legend span{display:inline-flex;align-items:center;gap:7px}
.fvs-legend i{width:7px;height:7px;rotate:45deg;border-radius:1px}
.fvs-legend .ok i{background:var(--fv-ok)}
.fvs-legend .weak i{background:var(--fv-warn)}
.fvs-legend .quiet i{box-shadow:0 0 0 1.5px var(--fv-ok)}
.fvs-sync-list{display:grid;max-height:220px;overflow:auto;margin:0 -4px}
.fvs-sync-list button{display:flex;gap:12px;padding:5px 6px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);font-size:var(--fv-meta);text-align:left}
.fvs-sync-list button:hover{background:var(--fv-hover)}
.fvs-sync-list span:first-child{color:var(--fv-muted);font-family:var(--fv-mono)}
.fvs-sync-pop > .fvs-btn{justify-self:start}
.fvs-keys dl{display:grid;grid-template-columns:auto auto;gap:7px 24px;margin:0;font-size:var(--fv-meta)}
.fvs-keys dt{color:var(--fv-muted)}
.fvs-keys dd{margin:0;text-align:right}

/* native panels: properties, projects, Director, export */
.fvs-extension{display:block;height:100%;overflow:auto}
.fvs-native-properties{overflow:hidden}
.fvs-native-properties .fvs-side{height:100%;border-left:0}
.fvs-native-properties .fvs-side-close{display:none}
/* the timeline docked in the native bottom panel (Space): it fills the panel; the panel's own sash sizes it */
.fvs-dock-timeline{display:flex;flex-direction:column;overflow:hidden;outline:none}
.fvs-dock-timeline > .fvs-tl{flex:1;min-height:0;grid-template-rows:auto minmax(0,1fr);background:transparent}
.fvs-dock-timeline .fvs-tl-resize{display:none}
.fvs-dock-timeline .fvs-tl-bar{padding-top:6px}
.fvs-dock-empty{margin:auto;padding:16px;text-align:center}
.fvs-dock-strip{display:flex;align-items:center;gap:8px;min-width:0;padding:4px 10px 4px 12px;background:var(--fv-hover);font-size:var(--fv-meta);color:var(--fv-muted)}
.fvs-dock-strip svg{width:14px;height:14px}
.fvs-dock-strip span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-dock-strip .fvs-btn{height:24px;padding:0 8px}
.fvs-workspace-host{height:100%;min-height:0;overflow:hidden}
.fvs-library{display:grid;gap:14px;align-content:start;max-width:620px;margin:0 auto;padding:28px 20px}
.fvs-library-heading{display:flex;align-items:center;gap:10px}
.fvs-library-heading svg{width:20px;height:20px;color:var(--fv-muted)}
.fvs-library h2{margin:0;font-size:var(--fv-title);font-weight:600}
.fvs-library > .fvs-row{align-items:center}
.fvs-project-list{display:grid;gap:2px;margin:0 -8px}
.fvs-project-item{display:flex;align-items:center;gap:10px;min-width:0;padding:8px;border:0;border-radius:var(--fv-r-sm);background:none;color:var(--fv-text);text-align:left}
.fvs-project-item:hover,.fvs-project-item:focus-visible{background:var(--fv-hover)}
.fvs-project-item svg{color:var(--fv-muted)}
.fvs-project-item > span{display:grid;gap:2px;min-width:0}
.fvs-project-item strong{font-size:var(--fv-body);font-weight:500}
.fvs-project-item small{color:var(--fv-muted);font-size:var(--fv-caption);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-panel-shell{display:grid;grid-template-rows:minmax(0,1fr) auto;height:100%;min-height:0}
.fvs-panel-scroll{display:grid;gap:16px;align-content:start;min-height:0;overflow:auto;padding:12px 16px 16px}
.fvs-form-actions{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px 14px;border-top:1px solid var(--fv-line)}
.fvs-chip-row{display:flex;flex-wrap:wrap;gap:6px}
.fvs-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid var(--fv-line);border-radius:var(--radius-pill,999px);background:transparent;color:var(--fv-muted);font-size:var(--fv-meta);white-space:nowrap}
.fvs-chip svg{width:13px;height:13px}
button.fvs-chip{color:var(--fv-text)}
button.fvs-chip:hover{border-color:var(--fv-accent);color:var(--fv-accent)}
.fvs-phase{display:flex;align-items:center;gap:8px;color:var(--fv-muted);font-size:var(--fv-meta)}
.fvs-phase::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--fv-muted)}
.fvs-phase:is([data-phase=thinking],[data-phase=speaking],[data-phase=tool],[data-phase=waiting])::before{background:var(--fv-accent)}
.fvs-phase[data-phase=done]::before{background:var(--fv-ok)}
.fvs-phase[data-phase=error]::before{background:var(--fv-bad)}
.fvs-director-changes{display:grid;gap:4px}
.fvs-director-changes details{border-radius:var(--fv-r-sm);padding:6px 8px;background:var(--fv-hover)}
.fvs-director-changes summary{cursor:pointer;font-size:var(--fv-meta)}
.fvs-change-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-top:8px}
.fvs-change-columns pre{max-height:240px;margin:0;overflow:auto;padding:8px;border-radius:var(--fv-r-sm);background:var(--fv-card);font:var(--fv-caption)/1.5 var(--fv-mono);white-space:pre-wrap;word-break:break-word}
.fvs-director-input{display:block}
.fvs-send-row{justify-content:space-between;align-items:center;margin-top:8px}
.fvs-native-chatbox{min-width:0}
.fvs-native-chatbox textarea{width:100%;min-height:96px}
.fvs-export-status{display:grid;gap:8px;padding:12px;border-radius:var(--fv-r-md);background:var(--fv-hover)}
.fvs-export-status strong{font-size:var(--fv-meta);font-weight:600}
.fvs-export-status progress{width:100%;height:6px;accent-color:var(--fv-accent)}
.fvs-export-status small{color:var(--fv-muted);font:var(--fv-caption) var(--fv-mono)}
.fvs-export-status .fvs-row{align-items:center}
.fvs-summary{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:var(--fv-r-md);background:var(--fv-hover);font:var(--fv-meta)/1.4 var(--fv-mono);color:var(--fv-text)}
.fvs-summary span:last-child{color:var(--fv-muted)}

`;

/** Note embeds carry only their own rules (a page may hold many of them). */
export const EMBED_CSS = `
.fvs-embed{position:relative;overflow:hidden;border-radius:var(--radius-md,12px);background:#000;box-shadow:var(--card-shadow,none)}
.fvs-embed iframe{display:block;width:100%;border:0;background:#000}
.fvs-embed .bar{display:flex;gap:8px;align-items:center;padding:6px 10px;background:var(--bg-card,#fff);color:var(--text-muted,#666);font-size:var(--ui-font-meta,12px)}
.fvs-embed .bar b{flex:1;color:var(--text,#222);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fvs-embed button{padding:2px 8px;border:1px solid var(--overlay-strong,rgba(0,0,0,.14));border-radius:var(--radius-sm,6px);background:none;color:inherit;font:inherit;cursor:pointer}
`;

export function injectCss() {
  if (typeof document === 'undefined' || document.querySelector('style[data-fvs-studio]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-fvs-studio', ''); style.textContent = CSS; document.head.append(style);
}
