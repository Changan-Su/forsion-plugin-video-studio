// Where an MP4 export job lives: the job record the CLI writes progress into (and its `.cancel` marker), the project
// snapshot it renders, and the per-project "latest job" index (formerly `<project folder>/.fvs-jobs/`). They belong to
// the plugin, so on a host whose plugin data folder can hand the engine a path (`ctx.storage.vault().hostPath`,
// Forsion 2026-11-26+) they go to `jobs/<project path>/` there. Otherwise (older Forsion, a remote engine, web) they
// stay in the vault exactly as before. Each index says which store its record is in (`store: 'data'`); an index
// without it is an old vault one. Old `.fvs-jobs/` files are only read (the last job's status), never moved or deleted.
import { dirOf, joinPath } from './util.js';

export const DATA = 'data';
const stemOf = path => path.split('/').pop().replace(/\.fvs\.md$/i, '');

export function jobStore(ctx, path) {
  const app = ctx.app || {};
  const dir = dirOf(path);
  const legacyIndex = joinPath(dir, `.fvs-jobs/${stemOf(path)}.latest.json`);
  const folder = `jobs/${joinPath('', path)}`;
  /** null = no plugin data folder; throws `storage-wait` while no library is open (never fall back to the vault). */
  function layer() {
    const s = ctx.storage;
    if (!s || typeof s.vault !== 'function') return null;
    let v = null;
    try { v = s.vault(); } catch { v = null; }
    if (!v) throw Object.assign(new Error('The vault is not open yet'), { code: 'storage-wait' });
    return v;
  }
  return {
    /** The latest job's index `{ id, record, store?, sessionId? }`, or null. A failed read rejects. */
    async readIndex() {
      const L = layer();
      if (L) {
        const text = await L.readText(`${folder}/latest.json`);
        if (text != null) return JSON.parse(text);
      }
      const text = await app.readFile(legacyIndex);
      return text ? JSON.parse(text) : null;
    },
    async writeIndex(index) {
      if (index.store === DATA) return layer().write(`${folder}/latest.json`, JSON.stringify(index));
      return app.writeFile(legacyIndex, JSON.stringify(index));
    },
    async read(ref, store) {
      if (store !== DATA) return app.readFile(ref);
      const L = layer();
      return L ? L.readText(ref) : null;
    },
    async write(ref, store, text) {
      if (store === DATA) return layer().write(ref, text);
      return app.writeFile(ref, text);
    },
    /** Where a new job goes, with the absolute paths the engine needs (null when it can't be handed one). */
    async place(id) {
      const L = layer();
      if (L && typeof L.hostPath === 'function') {
        const record = `${folder}/${id}.json`, snapshot = `${folder}/${id}.source.txt`;
        const [recordAbs, snapshotAbs] = [await L.hostPath(record), await L.hostPath(snapshot)];
        if (recordAbs && snapshotAbs) return { store: DATA, record, recordAbs, snapshot, snapshotAbs };
      }
      const record = joinPath(dir, `.fvs-jobs/${id}.json`), snapshot = joinPath(dir, `.fvs-jobs/${id}.source.txt`);
      return { store: 'vault', record, recordAbs: app.hostPath?.(record) || null, snapshot, snapshotAbs: app.hostPath?.(snapshot) || null };
    },
  };
}
