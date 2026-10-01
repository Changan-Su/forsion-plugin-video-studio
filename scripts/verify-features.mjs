// Native 0.4 acceptance. --live additionally sends two owned Director tasks on a disposable project.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const spaceModule='/@fs'+resolve(process.env.FVS_DESKTOP_ROOT||resolve(dirname(fileURLToPath(import.meta.url)),'../../../Forsion-Genesis/desktop'),'../lcl/engine/spaceRegistry.ts');
const live=process.argv.includes('--live'), shots='artifacts/features';await mkdir(shots,{recursive:true});
const browser=await chromium.connectOverCDP('http://127.0.0.1:9333');
const page=browser.contexts()[0].pages().find(p=>p.url()==='http://localhost:5273/');assert.ok(page);
const errors=[], runs=[];page.on('pageerror',e=>errors.push(String(e)));
page.on('request',r=>{if(r.method()==='POST'&&r.url().endsWith('/agent/runs')){const v=r.postDataJSON();runs.push({sessionId:v.session_id,modelId:v.model_id,thinking:v.agent_config?.thinkingLevel});}});
let root, original, before, probe, relative, ownSession, originalAgents;
const command=async(id,args)=>page.evaluate(async({id,args})=>{const s=(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/amadeus/plugins/pluginStore.ts')).at(-1)||'/src/amadeus/plugins/pluginStore.ts')).usePluginStore.getState();const c=s.commands.find(c=>c.pluginId==='forsion-video-studio'&&c.item.id===id);return args?c.item.invoke.run(args):c.item.run();},{id,args});
const open=async()=>{await command('fvs-open-project',{path:relative});await page.waitForFunction(()=>document.querySelector('.fvs-project-name')?.textContent==='FVS 0.4 原生验收');const gate=page.locator('.fvs-gate button');if(await gate.count())await gate.click();await page.waitForFunction(()=>!!document.querySelector('.fvs-view iframe:not(.fvs-pending)'));};
const ai=async()=>{await page.getByRole('button',{name:'AI 导演',exact:true}).click();await page.waitForSelector('.fvs-native-chatbox textarea');};
const exportPanel=async()=>{await page.getByRole('button',{name:'导出',exact:true}).click();await page.getByRole('menuitem',{name:/导出 MP4/}).click();await page.waitForSelector('.fvs-export-panel');};
const waitFile=async(path,test,timeout=240000)=>{const end=Date.now()+timeout;while(Date.now()<end){try{const v=await readFile(path,'utf8');if(test(v))return v;}catch{}await new Promise(r=>setTimeout(r,1000));}throw new Error('Timed out waiting for '+path);};
try{
  await page.reload();await page.waitForFunction(()=>!!window.amadeus);
  root=await page.evaluate(async spaceModule=>{await(await import('/src/amadeus/store/pageStore.ts')).usePageStore.getState().restoreVault();await(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts')).useApp.getState().boot();(await import(spaceModule.replace('spaceRegistry.ts','workspaceStore.ts'))).useWorkspace.getState().closeViewsOfType('plugin:forsion-video-studio:studio');await(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/amadeus/plugins/pluginStore.ts')).at(-1)||'/src/amadeus/plugins/pluginStore.ts')).usePluginStore.getState().reloadOne('forsion-video-studio',{force:true,strict:true});await(await import('/src/userSpaces.tsx')).loadUserSpaces();(await import(spaceModule)).setActiveSpace('forsion-video-studio');return(await import('/src/amadeus/store/pageStore.ts')).usePageStore.getState().vaultRoot;},spaceModule);
  original=join(root,'Forsion Video Studio/第 2.12 话/episode-2.12.fvs.md');before=await readFile(original);
  relative=`Forsion Video Studio/第 2.12 话/.features-${Date.now()}.fvs.md`;probe=join(root,relative);
  const source=before.toString().replaceAll('第 2.12 话 · 人类补完计划','FVS 0.4 原生验收');await writeFile(probe,source);await open();
  await page.locator('.fvs-zoom-controls input').fill('60');
  await page.waitForSelector('.fvs-scene-thumb[data-rendered="true"] iframe');
  const thumbCount=await page.locator('.fvs-scene-thumb iframe').count();assert.ok(thumbCount>0&&thumbCount<20, 'only visible scenes render');
  await page.waitForTimeout(600);await page.screenshot({path:join(shots,'01-thumbnails.png')});
  await ai();await page.locator('.fvs-director-panel textarea').fill('验收草稿：不发送');
  await page.getByRole('button',{name:'AI 导演',exact:true}).click();await ai();assert.equal(await page.locator('.fvs-director-panel textarea').inputValue(),'验收草稿：不发送');
  await page.locator('.fvs-director-panel .model-pill-btn').click();await page.locator('[data-pane-trigger="model"]').click();
  await page.locator('.cm-sub [title$=" · codex/gpt-5.6-luna"]').click();
  await page.locator('.fvs-director-panel .model-pill-btn').click();await page.getByRole('slider',{name:'思考档位',exact:true}).fill('2');await page.locator('.fvs-director-panel .model-pill-btn').click();
  await page.screenshot({path:join(shots,'02-native-director.png')});
  if(live){
    await page.locator('.fvs-director-panel textarea').fill('只把 cards 场景的 Markdown 标题从「标题卡」改成「原生验收标题」。保持其余字节不变，不要改文件名或配乐，不要渲染全片。使用提供的 CLI 检查修改后的工程。完成后简要说明。');
    await page.locator('.fvs-director-panel').getByRole('button',{name:'发送',exact:true}).click();
    await waitFile(probe,v=>v.includes('## cards · 原生验收标题'));
    const history=join(dirname(probe),`.fvs-history/${probe.split('/').pop().replace(/\.fvs\.md$/,'')}.director.json`);
    const record=JSON.parse(await waitFile(history,v=>!!JSON.parse(v).sessionId));ownSession=record.sessionId;
    await page.waitForFunction(async sid=>!(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts')).useApp.getState().runningBySession[sid],ownSession,{timeout:240000});
    assert.equal(runs[0]?.modelId,'codex/gpt-5.6-luna');assert.equal(runs[0]?.thinking,'low');
    await open();await ai();await page.waitForSelector('[data-director="restore"]');
    await page.screenshot({path:join(shots,'03-director-changes.png')});
    await page.locator('[data-director="restore"]').click();await waitFile(probe,v=>v===source);ownSession=null;
    await page.getByRole('button',{name:'AI 导演',exact:true}).click();
  }else await page.getByRole('button',{name:'AI 导演',exact:true}).click();
  await exportPanel();await page.locator('[data-export="scale"] [data-value="0.25"]').click();await page.locator('[data-export="fps"]').selectOption('24');await page.locator('[data-export="range"] [data-value="custom"]').click();await page.locator('[data-export="from"]').fill('8');await page.locator('[data-export="to"]').fill('10');
  await page.screenshot({path:join(shots,'04-native-export-settings.png')});
  let output;
  if(live){
    // Export has no model override and follows the bundled Agent's native defaults.
    originalAgents=await page.evaluate(async()=>{const{useApp}=await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts');const original=useApp.getState().agentDefs;useApp.setState({agentDefs:useApp.getState().agentDefs.map(a=>a.slug==='fvs-director'?{...a,model:'codex/gpt-5.6-luna',thinkingLevel:'low'}:a)});return original;});
    await page.locator('[data-export="start"]').click();
    const index=join(dirname(probe),`.fvs-jobs/${probe.split('/').pop().replace(/\.fvs\.md$/,'')}.latest.json`);
    const latest=JSON.parse(await waitFile(index,v=>!!JSON.parse(v).sessionId));ownSession=latest.sessionId;
    const jobPath=join(root,latest.record);
    const job=JSON.parse(await waitFile(jobPath,v=>['done','failed','cancelled'].includes(JSON.parse(v).status),300000));assert.equal(job.status,'done',job.error);
    output=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',job.out],{encoding:'utf8'}));const video=output.streams.find(s=>s.codec_type==='video');assert.equal(video.width,360);assert.equal(video.height,270);assert.equal(video.r_frame_rate,'24/1');assert.ok(Math.abs(+output.format.duration-2)<.15);assert.ok(output.streams.some(s=>s.codec_type==='audio'));
    await copyFile(job.out,join(shots,'native-export.mp4'));await writeFile(join(shots,'export-job.json'),JSON.stringify(job,null,2));
    await open();await exportPanel();await page.waitForFunction(()=>/导出完成/.test(document.querySelector('.fvs-export-status')?.textContent||''));
    await page.screenshot({path:join(shots,'05-native-export-complete.png')});
    await page.getByRole('button',{name:'预览成品',exact:true}).click();await page.waitForSelector('video');await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);assert.equal(await page.locator('video').evaluate(e=>e.duration),2);await page.screenshot({path:join(shots,'06-native-video-preview.png')});
    await page.waitForFunction(async sid=>!(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts')).useApp.getState().runningBySession[sid],ownSession,{timeout:180000});ownSession=null;
  }
  assert.deepEqual(await readFile(original),before);assert.deepEqual(errors,[]);
  await writeFile(join(shots,live?'live-results.json':'results.json'),JSON.stringify({live,thumbCount,runs,checks:['visible real scene previews','native Chat Box draft survives close','native model and low effort selection','Extend export settings',...(live?['real Director file edit','review and restore snapshot','real UI MP4 export with audio','persisted progress reconnect']:[]),'original project unchanged'],errors,output:output?.format},null,2));console.log(JSON.stringify({live,thumbCount,runs,errors,done:true}));
}finally{
  if(originalAgents)await page.evaluate(async agentDefs=>(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts')).useApp.setState({agentDefs}),originalAgents);
  if(ownSession)await page.evaluate(async sid=>(await import(performance.getEntriesByType('resource').map(x=>x.name).filter(x=>x.includes('/src/stores/appStore.ts')).at(-1)||'/src/stores/appStore.ts')).useApp.getState().stop(sid),ownSession).catch(()=>{});
  if(root){await command('fvs-open-example').catch(()=>{});await page.waitForFunction(()=>/2\.12/.test(document.querySelector('.fvs-project-name')?.textContent||''),null,{timeout:5000}).catch(()=>{});}
  if(probe)await rm(probe,{force:true});await browser.close();
}
