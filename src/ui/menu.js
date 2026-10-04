// Menus and popovers for the editor chrome. They hang off document.body so a panel edge never clips them,
// consume the Genesis menu tokens, and compensate the host's body zoom (DESIGN §6 「缩放与固定定位」).
import { h } from './util.js';
import { icon } from './icons.js';

let current = null; // one floating layer at a time

export function closeLayer() { if (current) { const c = current; current = null; c.close(false); } }

/** Viewport rect → fixed position inside a zoomed body. `at` ({ x, y } in the viewport) places it at a pointer instead. */
function place(layer, anchor, align, at) {
  const r = at ? { left: at.x, right: at.x, top: at.y, bottom: at.y } : anchor.getBoundingClientRect(), z = layer.currentCSSZoom || 1;
  const w = layer.offsetWidth * z, ht = layer.offsetHeight * z, vw = window.innerWidth, vh = window.innerHeight;
  let x = align === 'end' ? r.right - w : r.left;
  x = Math.max(8, Math.min(x, vw - w - 8));
  let y = r.bottom + 6;
  if (y + ht > vh - 8 && r.top - 6 - ht > 8) y = r.top - 6 - ht;
  y = Math.max(8, Math.min(y, vh - ht - 8));
  layer.style.left = `${x / z}px`; layer.style.top = `${y / z}px`;
}

function mountLayer(anchor, layer, { align = 'start', at = null, onClose } = {}) {
  closeLayer();
  layer.classList.add('fvs-layer');
  document.body.append(layer);
  place(layer, anchor, align, at);
  anchor.setAttribute('aria-expanded', 'true');
  const outside = e => { if (!layer.contains(e.target) && !anchor.contains(e.target)) closeLayer(); };
  // a scroll that moves the anchor leaves the layer behind; one in another panel (a selection bringing its row
  // into view in the properties) is not about this layer. An anchor that was redrawn away is behind already.
  const scroll = e => { if (!layer.contains(e.target) && (!anchor.isConnected || e.target.contains?.(anchor))) closeLayer(); };
  const key = e => {
    if (e.key !== 'Escape') return;
    e.preventDefault(); e.stopPropagation();
    if (current?.layer === layer) { current = null; close(true); }
  };
  function close(refocus) {
    document.removeEventListener('pointerdown', outside, true);
    window.removeEventListener('scroll', scroll, true);
    window.removeEventListener('resize', closeLayer);
    layer.removeEventListener('keydown', key);
    anchor.setAttribute('aria-expanded', 'false');
    layer.remove();
    if (refocus && anchor.isConnected) anchor.focus();
    onClose?.();
  }
  // the opening click must not count as an outside click
  setTimeout(() => { if (current?.layer === layer) document.addEventListener('pointerdown', outside, true); });
  window.addEventListener('scroll', scroll, true);
  window.addEventListener('resize', closeLayer);
  layer.addEventListener('keydown', key);
  layer.addEventListener('focusout', e => { if (e.relatedTarget && !layer.contains(e.relatedTarget) && current?.layer === layer) { current = null; close(false); } });
  current = { layer, close };
  return { layer, close: () => { if (current?.layer === layer) { current = null; close(true); } } };
}

/**
 * items: [{ label, hint?, icon?, kbd?, checked?, disabled?, danger?, run }] | '-' | { heading }.
 * Arrow keys, Home / End, Enter and Escape; focus returns to the anchor when the menu closes.
 */
export function openMenu(anchor, items, { label = '', align = 'start', at = null } = {}) {
  const menu = h('div', { class: 'fvs-menu', role: 'menu', 'aria-label': label });
  const buttons = [];
  for (const it of items) {
    if (!it) continue;
    if (it === '-') { menu.append(h('div', { class: 'fvs-menu-sep', role: 'separator' })); continue; }
    if (it.heading) { menu.append(h('div', { class: 'fvs-menu-heading', text: it.heading })); continue; }
    const checkable = it.checked !== undefined;
    const b = h('button', { type: 'button', role: checkable ? 'menuitemradio' : 'menuitem', 'aria-checked': checkable ? String(!!it.checked) : null,
      class: it.danger ? 'danger' : null, disabled: !!it.disabled, tabindex: '-1',
      onclick: () => { handle.close(); it.run(); } },
    h('span', { class: 'fvs-menu-icon' }, it.icon ? icon(it.icon) : null),
    h('span', { class: 'fvs-menu-text' }, h('span', { text: it.label }), it.hint ? h('small', { text: it.hint }) : null),
    h('span', { class: 'fvs-menu-end' }, it.checked ? icon('Check') : it.kbd ? h('kbd', { text: it.kbd }) : null));
    buttons.push(b); menu.append(b);
  }
  menu.addEventListener('keydown', e => {
    const live = buttons.filter(b => !b.disabled);
    const i = live.indexOf(document.activeElement);
    let next = null;
    if (e.key === 'ArrowDown') next = live[(i + 1) % live.length];
    else if (e.key === 'ArrowUp') next = live[(i - 1 + live.length) % live.length];
    else if (e.key === 'Home') next = live[0];
    else if (e.key === 'End') next = live[live.length - 1];
    else if (e.key === 'Tab') { e.preventDefault(); return; }
    if (next) { e.preventDefault(); next.focus(); }
  });
  const handle = mountLayer(anchor, menu, { align, at });
  buttons.find(b => !b.disabled)?.focus();
  return handle;
}

/** A small dialog-like layer for richer content (sync details, scene templates, shortcuts). */
export function openPopover(anchor, content, { label = '', align = 'start', className = '', onClose } = {}) {
  const pop = h('div', { class: `fvs-popover ${className}`.trim(), role: 'dialog', 'aria-label': label, tabindex: '-1' }, content);
  const handle = mountLayer(anchor, pop, { align, onClose });
  (pop.querySelector('[autofocus], button, input, select, textarea, [tabindex="0"]') || pop).focus?.();
  return handle;
}
