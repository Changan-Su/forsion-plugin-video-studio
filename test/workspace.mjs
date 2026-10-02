import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Editing commands on the timeline, the inspector's layout states and the narrow workspace. Every edit is undone
// before the next one, so each check starts from the original example and must leave it byte for byte.
export async function checkWorkspace(page, file, shot) {
  const before = await page.evaluate(p => HOST.text(p), file);
  const text = () => page.evaluate(p => HOST.text(p), file);
  const button = name => page.getByRole('button', { name, exact: true });
  const settle = () => page.waitForTimeout(800);
  const undoBack = async label => {
    await page.locator('.fvs-studio').focus();
    await page.keyboard.press('Control+z');
    await settle();
    assert.equal(await text(), before, `undo restores the file after ${label}`);
  };
  const clips = () => page.locator('.fvs-clip').count();
  // well inside the clip: the outer 7px are the trim handles and the bottom strip holds the hits
  const select = async id => { await page.click(`.fvs-clip[data-id="${id}"]`, { position: { x: 14, y: 24 } }); await page.waitForTimeout(150); };

  // scene navigation, frame steps and mute
  await select('cards');
  assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'cards');
  assert.match(await page.textContent('.fvs-current-scene'), /标题卡/);
  await button('下一个场景').click();
  assert.notEqual(await page.getAttribute('.fvs-clip.on', 'data-id'), 'cards');
  await button('上一个场景').click();
  assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'cards');
  const time = await page.textContent('.fvs-time');
  await button('下一帧').click();
  assert.notEqual(await page.textContent('.fvs-time'), time);
  await button('上一帧').click();
  assert.equal(await page.textContent('.fvs-time'), time);
  await button('静音').click();
  await button('开启声音').click();

  // 1. a scene from the template gallery lands after the selection and takes its look from the project
  await page.click('.fvs-tl-add');
  await page.waitForSelector('.fvs-templates-pop .fvs-template');
  await page.waitForFunction(() => document.querySelectorAll('.fvs-template-shot iframe').length >= 6, null, { timeout: 15000 });
  await shot(page, '14-templates');
  await page.click('.fvs-template:has-text("要点")');
  await settle();
  assert.equal(await clips(), 21);
  assert.match(await text(), /## list · 要点\n[\s\S]*data-each="1"/);
  assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'list');
  const order = await page.evaluate(() => [...document.querySelectorAll('.fvs-clip')].sort((a, b) => a.offsetLeft - b.offsetLeft).map(c => c.dataset.id));
  assert.equal(order[order.indexOf('cards') + 1], 'list', 'inserted right after the selected scene');
  await undoBack('a template');

  // 2. split at the playhead: two scenes, the second starts where the first stopped (its in-point)
  await select('cards');
  await page.locator('.fvs-studio').focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('Shift+ArrowRight');
  await page.keyboard.press('s');
  await settle();
  assert.equal(await clips(), 21, 'split adds a scene');
  const split = await text();
  assert.match(split, /## cards · 标题卡\n\n```fvs\n\{ "length": "1 bar"/, 'the first half ends at the playhead');
  assert.match(split, /## cards-2 · 标题卡\n\n```fvs\n\{[^}]*"in": "1 bar"/, 'the second half carries the in-point');
  await undoBack('a split');

  // 3. duplicate and delete from the keyboard
  await select('years');
  await page.locator('.fvs-studio').focus();
  await page.keyboard.press('Control+d');
  await settle();
  assert.equal(await clips(), 21);
  assert.match(await text(), /## years-2 · 多年来 副本/);
  await undoBack('a duplicate');
  await select('years');
  await page.locator('.fvs-studio').focus();
  await page.keyboard.press('Delete');
  await settle();
  assert.equal(await clips(), 19);
  assert.doesNotMatch(await text(), /## years/);
  await undoBack('a delete');

  // 4. drag a scene to a new place in the order
  const boot = await page.locator('.fvs-clip[data-id="boot"]').boundingBox();
  const cards = await page.locator('.fvs-clip[data-id="cards"]').boundingBox();
  await page.mouse.move(boot.x + boot.width / 2, boot.y + 24);
  await page.mouse.down();
  await page.mouse.move(cards.x + cards.width - 10, cards.y + 24, { steps: 10 });
  await page.waitForSelector('.fvs-tl-insert');
  await page.mouse.up();
  await settle();
  const moved = await text();
  assert.ok(moved.indexOf('## cards') < moved.indexOf('## boot'), 'boot now plays after cards');
  await undoBack('a reorder');

  // 5. trim the start of a scene: the cut moves, the scene's content stays where it was (roll + in-point)
  await page.selectOption('.fvs-tl-bar select', 'beat');
  const c = await page.locator('.fvs-clip[data-id="cards"]').boundingBox();
  const perSecond = c.width / 6.4;
  await page.mouse.move(c.x + 2, c.y + 30);
  await page.mouse.down();
  await page.mouse.move(c.x + 2 + 0.8 * perSecond, c.y + 30, { steps: 8 }); // two beats at 150 BPM
  await page.mouse.up();
  await settle();
  const trimmed = await text();
  assert.match(trimmed, /## cards · 标题卡\n\n```fvs\n\{[^}]*"in": "2 beats"/, `cards gained an in-point: ${trimmed.match(/## cards[\s\S]*?```fvs\n(.*)\n/)?.[1]}`);
  assert.match(trimmed, /## boot · 启动\n\n```fvs\n\{ "length": "10 beats"/, 'the previous scene grew by the same amount');
  await undoBack('a trim');
  await page.selectOption('.fvs-tl-bar select', 'half');

  // 6. a transition from the inspector, shown on the clip
  await select('cards');
  await page.selectOption('[data-key="strans"]', 'fade');
  await settle();
  assert.match(await text(), /## cards[\s\S]*?"transition": "fade"/);
  assert.equal(await page.locator('.fvs-clip[data-id="cards"] .fvs-clip-trans').isVisible(), true);
  await shot(page, '15-transition');
  await undoBack('a transition');

  // 7. import a picture: written next to the project, inserted as a scene after the selection
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  await select('years');
  await page.setInputFiles('.fvs-tl-tools input[type=file]', { name: 'photo.png', mimeType: 'image/png', buffer: png });
  await page.waitForFunction(() => document.querySelectorAll('.fvs-clip').length === 21, null, { timeout: 10000 });
  await settle();
  assert.ok(await page.evaluate(p => HOST.files.has(p), file.replace(/[^/]+$/, 'media/photo.png')), 'picture written under media/');
  assert.match(await text(), /## picture · photo\n[\s\S]*<img src="media\/photo.png"/);
  await undoBack('an import');

  // 7b. import a video clip: its length comes from the file, and the preview shows the frame for the playhead
  const webm = readFileSync(new URL('./fixtures/clip.webm', import.meta.url));
  await select('boot');
  await page.setInputFiles('.fvs-tl-tools input[type=file]', { name: 'clip.webm', mimeType: 'video/webm', buffer: webm });
  await page.waitForFunction(() => document.querySelectorAll('.fvs-clip').length === 21, null, { timeout: 15000 });
  await settle();
  assert.match(await text(), /## clip · clip\n\n```fvs\n\{ "length": "3s", "hits": \[0\] \}\n```\n\n```html\n<video src="media\/clip.webm" data-clip-in="0"/);
  assert.equal(await page.getAttribute('.fvs-clip.on', 'data-id'), 'clip');
  await page.locator('.fvs-studio').focus();
  for (let i = 0; i < 30; i++) await page.keyboard.press('ArrowRight'); // one second in at 30 fps
  await page.waitForFunction(() => !document.querySelector('.fvs-view iframe.fvs-pending'), null, { timeout: 15000 });
  const clock = sel => page.evaluate(sel => { const m = document.querySelector(sel).textContent.match(/(\d+):(\d+\.\d+)/); return +m[1] * 60 + +m[2]; }, sel);
  const local = (await clock('.fvs-time')) - (await clock('.fvs-scene-range'));
  // the preview is a sandboxed srcdoc frame: read its <video> through Playwright's frame access, and wait until
  // the shown clip settles on the playhead (a rebuilt preview may answer first)
  const videoTime = async () => {
    for (const f of page.frames()) {
      const v = await f.evaluate(() => { const el = document.querySelector('.fvs-scene video'); return el && el.readyState >= 2 && getComputedStyle(el.closest('.fvs-scene')).display !== 'none' ? el.currentTime : null; }).catch(() => null);
      if (v !== null) return v;
    }
    return null;
  };
  let current = null;
  for (let k = 0; k < 60; k++) { current = await videoTime(); if (current !== null && Math.abs(current - local) < .06) break; await page.waitForTimeout(250); }
  assert.ok(current !== null, 'the preview decoded the imported clip');
  assert.ok(Math.abs(current - local) < .06, `video time ${current} follows the playhead (${local} s into the clip)`);
  await shot(page, '16-video-clip');
  await undoBack('a video import');

  // 8. move the score in time by dragging its lane
  const lane = await page.locator('.fvs-lane-region').first().boundingBox();
  await page.mouse.move(lane.x + 200, lane.y + 10);
  await page.mouse.down();
  await page.mouse.move(lane.x + 260, lane.y + 10, { steps: 6 });
  await page.mouse.up();
  await settle();
  assert.match(await text(), /"src": "audio\/episode-2.12-score.mp3"[^}]*"at": [\d.]+/);
  await undoBack('moving the score');

  // 10. captions: double-click the track, type, drag, trim, delete; the preview shows them on project time
  const capLane = await page.locator('.fvs-cap-lane').boundingBox();
  assert.ok(capLane.y < (await page.locator('.fvs-tl-scenes').boundingBox()).y, 'the captions track sits above the scenes');
  assert.equal(await page.getAttribute('.fvs-cap-lane', 'data-hint'), '双击添加字幕');
  await page.mouse.dblclick(capLane.x + 300, capLane.y + capLane.height / 2);
  await page.waitForFunction(() => /^cap:\d+:text$/.test(document.activeElement?.dataset.key || ''), null, { timeout: 5000 });
  assert.equal(await page.locator('[data-tab="captions"]').getAttribute('aria-selected'), 'true', 'the captions tab opens on the new cue');
  assert.equal(await page.evaluate(() => document.activeElement.value.slice(document.activeElement.selectionStart, document.activeElement.selectionEnd)), '新字幕', 'its placeholder text is selected');
  await page.keyboard.type('第一句字幕');
  await page.keyboard.press('Enter');
  await settle();
  const cueRe = /```srt\n1\n(\d\d):(\d\d):(\d\d),(\d{3}) --> (\d\d):(\d\d):(\d\d),(\d{3})\n第一句字幕\n```\n\n## /;
  const cueAt = src => { const m = src.match(cueRe); assert.ok(m, `one cue in a srt block before the first scene:\n${src.slice(0, 600)}`); const n = m.slice(1).map(Number); return [n[0] * 3600 + n[1] * 60 + n[2] + n[3] / 1000, n[4] * 3600 + n[5] * 60 + n[6] + n[7] / 1000]; };
  const [s0, e0] = cueAt(await text());
  assert.ok(Math.abs(e0 - s0 - 2) < 1e-6, `a new cue lasts 2 s: ${s0} → ${e0}`);
  assert.equal((await text()).replace(/```srt\n[\s\S]*?```\n\n/, ''), before, 'only the captions block was added');
  // the preview shows it (the playhead went to the cue when its text field took focus)
  await page.waitForFunction(() => !document.querySelector('.fvs-view iframe.fvs-pending'), null, { timeout: 15000 });
  let shown = null;
  for (let k = 0; k < 40 && shown === null; k++) {
    for (const f of page.frames()) { const v = await f.evaluate(() => document.querySelector('.fvs-caption')?.textContent ?? null).catch(() => null); if (v !== null) shown = v; }
    if (shown === null) await page.waitForTimeout(150);
  }
  assert.equal(shown, '第一句字幕', 'the preview draws the caption');
  await shot(page, '17-captions');
  // drag it later by half a second (snap: half a beat = 0.2 s at 150 BPM, so 0.4 or 0.6)
  const cue = await page.locator('.fvs-cap').boundingBox(), pxPerSec = cue.width / 2;
  await page.mouse.move(cue.x + cue.width / 2, cue.y + cue.height / 2);
  await page.mouse.down();
  await page.mouse.move(cue.x + cue.width / 2 + .5 * pxPerSec, cue.y + cue.height / 2, { steps: 6 });
  await page.mouse.up();
  await settle();
  const [s1, e1] = cueAt(await text());
  assert.ok(s1 > s0 + .3 && s1 < s0 + .7 && Math.abs(e1 - s1 - 2) < 1e-6, `moved, same length: ${s0} → ${s1}, ${e1}`);
  // trim its end a second shorter
  const later = await page.locator('.fvs-cap').boundingBox();
  await page.mouse.move(later.x + later.width - 2, later.y + later.height / 2);
  await page.mouse.down();
  await page.mouse.move(later.x + later.width - 2 - pxPerSec, later.y + later.height / 2, { steps: 6 });
  await page.mouse.up();
  await settle();
  const [s2, e2] = cueAt(await text());
  assert.ok(Math.abs(s2 - s1) < 1e-6 && e2 < e1 - .8 && e2 > e1 - 1.2, `end trimmed: ${e1} → ${e2}`);
  // Delete removes the selected cue, and with it the block: the file is the original again
  await page.click('.fvs-cap', { position: { x: 4 + 8, y: 12 } });
  await page.locator('.fvs-studio').focus();
  await page.keyboard.press('Delete');
  await settle();
  assert.equal(await text(), before, 'deleting the last cue removes the block byte for byte');
  // an SRT import fills the track; the export menu writes the track as a .srt next to the project
  await page.setInputFiles('.fvs-tl-tools input[type=file]', { name: 'subs.srt', mimeType: 'application/x-subrip', buffer: Buffer.from('1\r\n00:00:01,000 --> 00:00:02,500\r\n你好\r\n\r\n2\r\n00:00:03,000 --> 00:00:04,000\r\nworld\r\n\r\n3\r\nno time line\r\n') });
  await page.waitForFunction(() => document.querySelectorAll('.fvs-cap').length === 2, null, { timeout: 5000 });
  await settle();
  assert.match(await text(), /```srt\n1\n00:00:01,000 --> 00:00:02,500\n你好\n\n2\n00:00:03,000 --> 00:00:04,000\nworld\n```/);
  assert.ok(await page.evaluate(() => HOST.calls.notify.some(m => /subs\.srt 里有 1 处读不懂，已跳过（第一处在第 9 行）/.test(m))), 'the skipped part is reported');
  // export: a different file of the same name is never overwritten; the same content is
  const srtPath = file.replace(/\.fvs\.md$/, '.srt'), srt2 = file.replace(/\.fvs\.md$/, '-2.srt');
  const want = '1\n00:00:01,000 --> 00:00:02,500\n你好\n\n2\n00:00:03,000 --> 00:00:04,000\nworld\n';
  await page.evaluate(p => HOST.files.set(p, 'someone else\'s subtitles'), srtPath);
  for (const expect of [srt2, srt2]) {
    await page.click('.fvs-export-action');
    await page.click('.fvs-menu button:has-text("导出字幕（SRT）")');
    await page.waitForFunction(p => HOST.text(p) !== null, expect, { timeout: 5000 });
  }
  assert.equal(await page.evaluate(p => HOST.text(p), srtPath), 'someone else\'s subtitles');
  assert.equal(await page.evaluate(p => HOST.text(p), srt2), want);
  assert.equal(await page.evaluate(p => HOST.files.has(p), file.replace(/\.fvs\.md$/, '-3.srt')), false, 'exporting the same track again reuses its file');
  await page.evaluate(ps => ps.forEach(p => HOST.files.delete(p)), [srtPath, srt2]);
  await undoBack('a captions import');
  // a block with an unreadable line: edits wait (nothing is silently dropped) until the person chooses
  const broken = before.replace('\n## warning', '\n```srt\n1\n00:00:01,000 --> 00:00:02,000\nok\n\n2\n00:00:03,000 -> 00:00:04,000\nunreadable\n```\n\n## warning');
  assert.notEqual(broken, before);
  await page.evaluate(([p, t]) => HOST.external(p, t), [file, broken]);
  await page.waitForFunction(() => document.querySelectorAll('.fvs-cap').length === 1, null, { timeout: 5000 });
  const okCue = await page.locator('.fvs-cap').boundingBox();
  await page.mouse.move(okCue.x + okCue.width / 2, okCue.y + 12);
  await page.mouse.down(); await page.mouse.move(okCue.x + okCue.width / 2 + 40, okCue.y + 12, { steps: 5 }); await page.mouse.up();
  await settle();
  assert.equal(await text(), broken, 'a drag does not rewrite a block it cannot fully read');
  assert.equal(await page.locator('[data-tab="captions"]').getAttribute('aria-selected'), 'true');
  await page.getByRole('button', { name: '只保留能读的字幕', exact: true }).click();
  await settle();
  assert.equal(await text(), before.replace('\n## warning', '\n```srt\n1\n00:00:01,000 --> 00:00:02,000\nok\n```\n\n## warning'));
  await page.evaluate(([p, t]) => HOST.external(p, t), [file, before]);
  await page.waitForFunction(() => document.querySelectorAll('.fvs-cap').length === 0, null, { timeout: 5000 });
  await settle();
  assert.equal(await text(), before);

  // 9. popovers keep their own focus and close with Escape back onto their button
  await page.click('.fvs-sync-chip');
  await page.waitForSelector('.fvs-sync-pop');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.fvs-sync-pop').count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('fvs-sync-chip')), true, 'focus returns to the chip');

  // focus preview hides the inspector and the timeline; Escape brings them back
  const preview = await page.locator('.fvs-view').boundingBox();
  await button('专注预览').click();
  assert.equal(await page.locator('.fvs-side').isVisible(), false);
  assert.equal(await page.locator('.fvs-tl').isVisible(), false);
  assert.ok((await page.locator('.fvs-view').boundingBox()).width >= preview.width);
  await page.locator('.fvs-studio').focus();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.fvs-side').isVisible(), true);
  await page.locator('[data-tab="scene"]').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-tab="text"]').getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  assert.equal(await page.locator('[data-tab="scene"]').getAttribute('aria-selected'), 'true');

  // the timeline's height and zoom
  const separator = page.getByRole('separator', { name: '调整时间线高度' });
  const height = Number(await separator.getAttribute('aria-valuenow'));
  await separator.focus(); await page.keyboard.press('ArrowUp');
  assert.equal(Number(await separator.getAttribute('aria-valuenow')), height + 20);
  await page.keyboard.press('ArrowDown');
  // the slider is logarithmic (0–1000 from half the fit to a frame per ~24 px)
  await page.locator('.fvs-zoom-controls input').fill('600');
  await page.waitForFunction(() => document.querySelector('.fvs-clip[data-id="cards"]')?.getBoundingClientRect().width > 150);
  const clipWidth = await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width);
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.waitForFunction(() => document.querySelector('.fvs-studio').classList.contains('medium'));
  assert.equal(await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width), clipWidth, 'manual zoom survives resize');
  assert.ok(await page.locator('.fvs-zoom-controls input').isVisible(), 'the zoom slider stays at medium width');
  await shot(page, '11-medium');

  // narrow: every control stays inside, the inspector becomes an overlay that the toggle opens and closes
  await page.setViewportSize({ width: 560, height: 820 });
  await page.waitForFunction(() => document.querySelector('.fvs-studio').classList.contains('narrow'));
  const bounds = await page.evaluate(() => {
    const r = document.querySelector('.fvs-studio').getBoundingClientRect();
    return [...document.querySelectorAll('.fvs-bar button,.fvs-transport button,.fvs-tl-bar button,.fvs-tl-bar select')]
      .filter(e => e.getClientRects().length).map(e => ({ label: e.title || e.textContent, inside: e.getBoundingClientRect().left >= r.left && e.getBoundingClientRect().right <= r.right + .5 }));
  });
  assert.deepEqual(bounds.filter(b => !b.inside), [], 'narrow controls stay inside the workspace');
  const toggle = button('属性面板');
  if (await page.locator('.fvs-side').isVisible()) await toggle.click();
  assert.equal(await page.locator('.fvs-side').isVisible(), false);
  await toggle.click();
  assert.equal(await page.locator('.fvs-side').isVisible(), true, 'narrow inspector opens as an overlay');
  const panelBox = await page.locator('.fvs-panel').boundingBox();
  assert.ok(panelBox.height > 80, 'narrow properties remain scrollable');
  await page.waitForFunction(() => !document.querySelector('.fvs-view iframe.fvs-pending'));
  await page.waitForTimeout(200);
  await shot(page, '12-narrow');
  await toggle.click();
  await page.setViewportSize({ width: 1480, height: 920 });
  await page.waitForFunction(() => !document.querySelector('.fvs-studio').classList.contains('medium'));
  if (!(await page.locator('.fvs-side').isVisible())) await toggle.click();
  await page.locator('.fvs-zoom-controls .fvs-btn.ghost').click();

  assert.equal(await text(), before, 'navigation, layout and undone edits leave the project byte for byte');
}
