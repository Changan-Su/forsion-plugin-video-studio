// Where the AI Director keeps its own files for a project: the "last task" record and the before / reverted
// snapshots (formerly `<project folder>/.fvs-history/`). They belong to the plugin, not to the user's notes, so on
// a host with a plugin data folder (`ctx.storage`, Forsion 2026-11-26+) they go to `ctx.storage.vault()` under
// `history/<project path>/` (one folder per project file). Rules:
//  · no `ctx.storage` (older Forsion, web) → the vault, exactly as before;
//  · `ctx.storage` but no open library yet (`vault()` is null) → throw `storage-wait`, never fall back to the vault
//    (the data would split in two);
//  · one operation uses one layer (`bind()`): after a library switch the stale layer rejects instead of writing
//    into the other library;
//  · old `.fvs-history/` files are copied, never moved or deleted: the first read of a project with no record in the
//    data folder copies its old record and the snapshot it points to, then works only from the copy. (Not
//    `importFromVault`: projects can live anywhere in the vault and it only accepts the work folder.)
import { dirOf, joinPath } from './util.js';

const HISTORY = 'history';
const RECORD = 'director.json';
const stemOf = path => path.split('/').pop().replace(/\.fvs\.md$/i, '');

export function historyStore(ctx, path) {
  const app = ctx.app || {};
  const legacyBase = joinPath(dirOf(path), `.fvs-history/${stemOf(path)}`);
  const stored = !!(ctx.storage && typeof ctx.storage.vault === 'function');
  const folder = `${HISTORY}/${joinPath('', path)}`;
  function layer() {
    let v = null;
    try { v = ctx.storage.vault(); } catch { v = null; }
    if (!v) throw Object.assign(new Error('The vault is not open yet'), { code: 'storage-wait' });
    return v;
  }
  /** Copy the old vault record (and the snapshot it names) into the data folder; null when there is none. */
  async function adoptLegacy(L) {
    const text = await app.readFile(legacyBase + '.director.json');
    if (text == null) return null;
    let rec = null;
    try { rec = JSON.parse(text); } catch { rec = null; }
    if (!rec || typeof rec !== 'object') return null;
    if (rec.beforePath) {
      const snap = await app.readFile(rec.beforePath);
      const name = String(rec.beforePath).split('/').pop().replace(/^.*?\.(?=[^.]+\.before\.txt$)/, '');
      const ref = `${folder}/${name || 'legacy.before.txt'}`;
      if (snap != null) await L.write(ref, snap);
      rec = { ...rec, beforePath: snap != null ? ref : null };
    }
    const next = JSON.stringify(rec);
    await L.write(`${folder}/${RECORD}`, next);
    return next;
  }
  /** Methods bound to one layer, for one operation. */
  function bind() {
    const L = stored ? layer() : null;
    return {
      stored,
      /** The last task's record as text, or null. Failed reads reject: missing is not failure. */
      async readRecord() {
        if (!L) return app.readFile(legacyBase + '.director.json');
        return (await L.readText(`${folder}/${RECORD}`)) ?? adoptLegacy(L);
      },
      async writeRecord(text) {
        if (!L) return app.writeFile(legacyBase + '.director.json', text);
        return L.write(`${folder}/${RECORD}`, text);
      },
      /** A snapshot named in a record (records in the data folder always name data-folder snapshots). */
      async readSnapshot(ref) {
        if (!ref) return null;
        return L ? L.readText(ref) : app.readFile(ref);
      },
      /** Write a snapshot named `<id>.<kind>.txt` and return the reference to keep in the record. */
      async writeSnapshot(name, text) {
        if (!L) { const p = `${legacyBase}.${name}`; await app.writeFile(p, text); return p; }
        const ref = `${folder}/${name}`;
        await L.write(ref, text);
        return ref;
      },
    };
  }
  return { stored, bind };
}
