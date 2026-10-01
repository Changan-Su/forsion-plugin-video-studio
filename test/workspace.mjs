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
  await page.locator('.fvs-zoom-controls input').fill('32');
  await page.waitForFunction(() => document.querySelector('.fvs-clip[data-id="cards"]')?.getBoundingClientRect().width > 150);
  const clipWidth = await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width);
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.waitForFunction(() => document.querySelector('.fvs-studio').classList.contains('medium'));
  assert.equal(await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width), clipWidth, 'manual zoom survives resize');
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
