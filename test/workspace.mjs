import assert from 'node:assert/strict';

// Navigation and layout must never rewrite a project. Test the built plugin through host interactions.
export async function checkWorkspace(page, file, shot) {
  const before = await page.evaluate(p => HOST.text(p), file);
  const button = name => page.getByRole('button', { name, exact: true });
  await page.fill('.fvs-scene-search input', '人格');
  assert.ok(await page.locator('.fvs-scene-item').count() < 20, 'search filters scene content');
  await page.locator('.fvs-scene-item[data-scene-id="cards"]').click();
  assert.equal(await page.inputValue('[data-key="sid"]'), 'cards');
  assert.match(await page.textContent('.fvs-current-scene'), /标题卡/);
  await page.fill('.fvs-scene-search input', 'nothing-matches');
  assert.equal(await page.locator('.fvs-scenes-empty').count(), 1);
  await page.fill('.fvs-scene-search input', '');
  assert.equal(await page.locator('.fvs-scene-item').count(), 20);

  await button('下一个场景').click();
  assert.notEqual(await page.inputValue('[data-key="sid"]'), 'cards');
  await button('上一个场景').click();
  assert.equal(await page.inputValue('[data-key="sid"]'), 'cards');
  const time = await page.textContent('.fvs-time');
  await button('下一帧').click();
  assert.notEqual(await page.textContent('.fvs-time'), time);
  await button('上一帧').click();
  assert.equal(await page.textContent('.fvs-time'), time);
  await button('静音').click();
  await button('开启声音').click();

  const preview = await page.locator('.fvs-view').boundingBox();
  await button('专注预览').click();
  assert.equal(await page.locator('.fvs-side').isVisible(), false);
  assert.equal(await page.locator('.fvs-storyboard').isVisible(), false);
  assert.ok((await page.locator('.fvs-view').boundingBox()).width >= preview.width);
  await page.locator('.fvs-studio').focus();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.fvs-side').isVisible(), true);
  await page.locator('[data-tab="scene"]').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-tab="text"]').getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  assert.equal(await page.locator('[data-tab="scene"]').getAttribute('aria-selected'), 'true');

  const separator = page.getByRole('separator');
  const height = Number(await separator.getAttribute('aria-valuenow'));
  await separator.focus(); await page.keyboard.press('ArrowUp');
  assert.equal(Number(await separator.getAttribute('aria-valuenow')), height + 20);
  await page.keyboard.press('ArrowDown');
  await page.locator('.fvs-zoom-controls input').fill('32');
  const clipWidth = await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width);
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.waitForFunction(() => document.querySelector('.fvs-studio').classList.contains('medium'));
  assert.equal(await page.locator('.fvs-storyboard').isVisible(), false);
  await button('显示场景列表').click();
  assert.equal(await page.locator('.fvs-storyboard').isVisible(), true, 'medium window can reopen scenes');
  assert.equal(await page.locator('.fvs-clip[data-id="cards"]').evaluate(e => e.getBoundingClientRect().width), clipWidth, 'manual zoom survives resize');
  await shot(page, '11-medium');
  await button('显示场景列表').click();

  const theme = await page.evaluate(() => document.documentElement.getAttribute('style'));
  await page.evaluate(() => document.documentElement.style.cssText = '--bg:#f4f5f6;--bg-card:#fff;--text:#232a30;--text-muted:#69757b;--border:#dce2e5;--accent:#4d8794;--ui-font-meta:12px;--radius-sm:6px');
  await page.setViewportSize({ width: 560, height: 820 });
  await page.waitForFunction(() => document.querySelector('.fvs-studio').classList.contains('narrow'));
  const bounds = await page.evaluate(() => {
    const r = document.querySelector('.fvs-studio').getBoundingClientRect();
    return [...document.querySelectorAll('.fvs-bar button,.fvs-preview-bar button,.fvs-transport button,.fvs-tl-bar button,.fvs-tabs button')]
      .filter(e => e.getClientRects().length).map(e => ({ label: e.title || e.textContent, rect: e.getBoundingClientRect().toJSON(), inside: e.getBoundingClientRect().left >= r.left && e.getBoundingClientRect().right <= r.right }));
  });
  assert.deepEqual(bounds.filter(b => !b.inside), [], 'narrow controls stay inside the workspace');
  await button('显示场景列表').click();
  await page.locator('.fvs-scene-item[data-scene-id="years"]').click();
  assert.equal(await page.locator('.fvs-storyboard').isVisible(), false, 'narrow overlay closes after selection');
  assert.equal(await page.inputValue('[data-key="sid"]'), 'years');
  const tabsBox = await page.locator('.fvs-tabs').boundingBox();
  const panelBox = await page.locator('.fvs-panel').boundingBox();
  assert.ok(panelBox.y >= tabsBox.y + tabsBox.height, 'narrow property panel sits below its tabs');
  assert.ok(panelBox.height > 80, 'narrow properties remain scrollable');
  await page.waitForFunction(() => !document.querySelector('.fvs-view iframe.fvs-pending'));
  await page.waitForTimeout(200);
  await shot(page, '12-light-narrow');
  await button('导出').click();
  assert.equal(await page.locator('.fvs-menu').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.fvs-menu').count(), 0);
  await page.evaluate(s => s === null ? document.documentElement.removeAttribute('style') : document.documentElement.setAttribute('style', s), theme);
  await page.setViewportSize({ width: 1480, height: 920 });
  // Return panels and zoom to a readable working state.
  await button('显示场景列表').click();
  await page.locator('.fvs-zoom-controls input').fill('24');
  // A cancelled pointer interaction (e.g. OS interruption) must not alter cut timing.
  await page.evaluate(() => {
    const edge = document.querySelector('.fvs-clip[data-id="years"] .edge');
    const box = edge.getBoundingClientRect();
    edge.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: box.x, clientY: box.y }));
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: box.x - 40, clientY: box.y }));
    window.dispatchEvent(new PointerEvent('pointercancel'));
    window.dispatchEvent(new PointerEvent('pointerup'));
  });
  assert.equal(await page.locator('.fvs-tl-ghost').count(), 0);
  assert.equal(await page.evaluate(p => HOST.text(p), file), before, 'navigation, resize and theme leave the file intact');
  console.log('workspace controls and responsive layouts ok');
}
