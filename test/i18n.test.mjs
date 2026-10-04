// Every UI string key used in src/ui exists in both languages, and English never falls back to Chinese.
// `translate` falls back silently (en → zh → key), so a missing English entry renders Chinese without an error.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const ui = join(dirname(fileURLToPath(import.meta.url)), '../src/ui');
const mod = await import('data:text/javascript,' + encodeURIComponent(readFileSync(join(ui, 'i18n.js'), 'utf8')));
const zh = mod.makeT({ getLocale: () => 'zh' }), en = mod.makeT({ getLocale: () => 'en' });

const used = new Set();
for (const f of readdirSync(ui).filter(f => f.endsWith('.js'))) {
  const src = readFileSync(join(ui, f), 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-z0-9-]+)'\s*[,)]/g)) used.add(m[1]);
  // keys built from a fixed prefix: t(`tr-${type}`), t(`tab-${k}`) …
  for (const m of src.matchAll(/\bt\(`([a-z0-9-]+)-\$\{/g)) used.add(`${m[1]}-*`);
}
const missing = [], chinese = [];
for (const k of used) {
  if (k.endsWith('-*')) continue;
  if (zh(k) === k) missing.push(`zh:${k}`);
  if (en(k) === k) missing.push(`en:${k}`);
  else if (/[一-鿿]/.test(en(k))) chinese.push(k);
}
const prefixed = { 'tr-': ['none', 'fade', 'dip', 'slide-left', 'slide-up', 'push-left', 'wipe-left', 'zoom', 'blur'], 'tab-': ['scene', 'text', 'captions', 'code', 'project'],
  'fx-': ['cut', 'fade', 'up', 'down', 'left', 'right', 'pop', 'type'], 'snap-': ['bar', 'beat', 'half', 'quarter', 'off'],
  'director-': ['added', 'removed', 'changed', 'waiting', 'idle', 'thinking', 'speaking', 'tool', 'done', 'error'],
  'export-status-': ['queued', 'preparing', 'frames', 'encoding', 'done', 'failed', 'cancelled'],
  'bin-filter-': ['all', 'image', 'video', 'audio', 'unused', 'ai'] };
for (const [pre, keys] of Object.entries(prefixed)) for (const k of keys) {
  if (zh(pre + k) === pre + k) missing.push(`zh:${pre}${k}`);
  if (en(pre + k) === pre + k) missing.push(`en:${pre}${k}`);
}
assert.deepEqual(missing, [], 'every UI key has zh and en text');
assert.deepEqual(chinese, [], 'English strings contain no Chinese');
console.log(`i18n ok: ${used.size} keys`);
