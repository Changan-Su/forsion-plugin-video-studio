// Where an MP4 export job lives: the job record the CLI writes progress into (and its `.cancel` marker), the project
// snapshot it renders, and the per-project "latest job" index (formerly `<project folder>/.fvs-jobs/`). They belong to
// the plugin, so on a host whose plugin data folder can hand the engine a path (`ctx.storage.vault().hostPath`,
// Forsion 2026-11-26+) they go to `jobs/<project path>/` there. Otherwise (older Forsion, a remote engine, web) they
// stay in the vault exactly as before, in the same format. An index in the data folder says so (`store: 'data'`);
// one without it is a vault index. Old `.fvs-jobs/` files are only read (the last job's status), never moved or
// deleted. Each job keeps the layer that placed it (`at.layer`), so a library switch makes its writes reject instead
// of landing in the other library.
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
  /** The data layer when the engine can be handed paths in it right now, else null (vault mode). */
  async function dataLayer() {
    const L = layer();
    if (!L || typeof L.hostPath !== 'function') return null;
    return (await L.hostPath(folder)) ? L : null;
  }
  return {
    /** The latest job's index `{ id, record, store?, sessionId? }`, or null. A failed read rejects. In vault mode only
     *  the vault index counts (a leftover data-folder index must not hide a newer vault job). */
    async readIndex() {
      const L = await dataLayer();
      if (L) {
        const text = await L.readText(`${folder}/latest.json`);
        if (text != null) return JSON.parse(text);
      }
      const text = await app.readFile(legacyIndex);
      return text ? JSON.parse(text) : null;
    },
    /** `at` = the placement of this job (from `place`), so its writes stay in the layer that placed it. */
    async writeIndex(index, at) {
      const { store, ...rest } = index;
      if (store === DATA) return (at?.layer || layer()).write(`${folder}/latest.json`, JSON.stringify({ ...rest, store }));
      return app.writeFile(legacyIndex, JSON.stringify(rest)); // the vault index keeps its old shape
    },
    async read(ref, store) {
      if (store !== DATA) return app.readFile(ref);
      const L = layer();
      return L ? L.readText(ref) : null;
    },
    async write(ref, store, text, at) {
      if (store === DATA) return (at?.layer || layer()).write(ref, text);
      return app.writeFile(ref, text);
    },
    /** Where a new job goes, with the absolute paths the engine needs (null when it can't be handed one). */
    async place(id) {
      const L = await dataLayer();
      if (L) {
        const record = `${folder}/${id}.json`, snapshot = `${folder}/${id}.source.txt`;
        const [recordAbs, snapshotAbs] = [await L.hostPath(record), await L.hostPath(snapshot)];
        if (recordAbs && snapshotAbs) return { store: DATA, layer: L, record, recordAbs, snapshot, snapshotAbs };
      }
      const record = joinPath(dir, `.fvs-jobs/${id}.json`), snapshot = joinPath(dir, `.fvs-jobs/${id}.source.txt`);
      return { store: 'vault', layer: null, record, recordAbs: app.hostPath?.(record) || null, snapshot, snapshotAbs: app.hostPath?.(snapshot) || null };
    },
  };
}
