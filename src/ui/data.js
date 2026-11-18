// The plugin's saved data ({ last, folder, trusted }) when the host says it was saved but cannot be read.
// Hosts from 2026-11-17 on reject ctx.loadData() with code 'plugin-data-unreadable' (a read error, an empty file, a
// write cut off halfway, a hand edit that broke the JSON). Carrying on with {} would let the next save overwrite the
// last project, the folder and every project the person trusted. So each read-then-save here skips the save on that
// error, and the person is told once per plugin instance (again when they ask for something that needs the data).
// Nothing saved yet (null, also what older hosts return when they cannot read it) and other rejections behave as
// before. Every save re-reads first, so there is no flag to keep: the next read decides again.
import { makeT } from './i18n.js';

export const isUnreadable = e => !!e && typeof e === 'object' && e.code === 'plugin-data-unreadable';

let warned = false;
let blocked = false; // a read failed that way and none has worked since: another kind of read error then saves nothing either
const sessionTrust = new Set(); // projects trusted while the list could not be read: until the plugin reloads

function warn(ctx, key) {
  // best effort: a notice that throws must not turn "unreadable, save nothing" into a read error that saves over it
  try {
    const t = makeT(ctx), msg = key === 'trust' ? t('trust-unsaved') : t('data-unreadable');
    if (ctx.notify) ctx.notify(msg, { level: 'warning' });
    else ctx.app?.notify?.(msg);
  } catch (e) { console.warn('[fvs] notice failed', e); }
}

/**
 * The saved data ({} when nothing is saved), or null when it was saved but cannot be read: then save nothing.
 * Other read errors throw, as they did, for the caller's own catch.
 * The person is told once per plugin instance; `asked` (they did something that needs the data) tells them again,
 * `quiet` leaves the telling to the caller.
 */
export async function loadSaved(ctx, { asked = false, quiet = false } = {}) {
  let d;
  try { d = await ctx.loadData?.(); } catch (e) {
    if (!isUnreadable(e) && !blocked) throw e;
    if (!warned) console.warn(`[fvs] saved plugin data could not be read (${e?.reason}); nothing will be saved until it can`);
    if (!quiet && (asked || !warned)) warn(ctx, 'data');
    warned = blocked = true;
    return null;
  }
  blocked = false;
  return d || {};
}

/** Shared per-plugin trust list: paths whose scripts the person agreed to run. A list that cannot be read trusts
 *  nothing but what was trusted since (fail closed: the gate shows). */
export async function trustList(ctx) {
  let d;
  try { d = await loadSaved(ctx); } catch { d = {}; }
  return [...(d && Array.isArray(d.trusted) ? d.trusted : []), ...sessionTrust];
}

/** Trust `path`. Returns false when the list cannot be read: the trust then lasts until the plugin reloads and nothing
 *  is saved; `asked` (the person pressed "Run preview") tells them it will not be kept. */
export async function trust(ctx, path, { asked = false } = {}) {
  let d;
  try { d = await loadSaved(ctx, { quiet: asked }); } catch { d = {}; }
  if (!d) {
    sessionTrust.add(path);
    if (asked) warn(ctx, 'trust');
    return false;
  }
  const list = new Set(Array.isArray(d.trusted) ? d.trusted : []);
  list.add(path);
  try { await ctx.saveData?.({ ...d, trusted: [...list].slice(-500) }); } catch { /* best effort */ }
  return true;
}
