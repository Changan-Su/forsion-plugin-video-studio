import test from 'node:test';
import assert from 'node:assert/strict';
import { jobStore, DATA } from '../src/ui/job-store.js';

function fakeCtx({ storage = true, hostPath = true, hostNull = false, vaultNull = false, rejectRead = false } = {}) {
  const vault = new Map(), files = new Map(), vaultWrites = [];
  const layer = {
    readText: async p => { if (rejectRead) throw new Error('EIO ' + p); return files.has(p) ? files.get(p) : null; },
    write: async (p, d) => { files.set(p, String(d)); },
    ...(hostPath ? { hostPath: async p => (hostNull ? null : `/home/u/.forsion/tangu/plugin-data/fvs/vaults/k/${p}`) } : {}),
  };
  const ctx = {
    app: {
      readFile: async p => (vault.has(p) ? vault.get(p) : null),
      writeFile: async (p, d) => { vault.set(p, d); vaultWrites.push(p); },
      hostPath: p => `/vault/${p}`,
    },
    ...(storage ? { storage: { vault: () => (vaultNull ? null : layer) } } : {}),
  };
  return { ctx, vault, files, vaultWrites };
}
const P = 'Videos/teaser.fvs.md';

test('older hosts keep jobs in the vault, byte for byte', async () => {
  const f = fakeCtx({ storage: false });
  const j = jobStore(f.ctx, P);
  const at = await j.place('a1');
  assert.deepEqual(at, { store: 'vault', layer: null, record: 'Videos/.fvs-jobs/a1.json', recordAbs: '/vault/Videos/.fvs-jobs/a1.json', snapshot: 'Videos/.fvs-jobs/a1.source.txt', snapshotAbs: '/vault/Videos/.fvs-jobs/a1.source.txt' });
  await j.writeIndex({ id: 'a1', record: at.record, store: at.store, sessionId: 's' }, at);
  assert.equal(f.vault.get('Videos/.fvs-jobs/teaser.latest.json'), '{"id":"a1","record":"Videos/.fvs-jobs/a1.json","sessionId":"s"}', 'the old index shape, exactly');
  assert.equal((await j.readIndex()).id, 'a1');
});

test('with a host path the job goes to the plugin data folder; the engine gets absolute paths', async () => {
  const f = fakeCtx();
  const j = jobStore(f.ctx, P);
  const at = await j.place('b2');
  assert.equal(at.store, DATA);
  assert.equal(at.record, 'jobs/Videos/teaser.fvs.md/b2.json');
  assert.equal(at.recordAbs, '/home/u/.forsion/tangu/plugin-data/fvs/vaults/k/jobs/Videos/teaser.fvs.md/b2.json');
  await j.write(at.record, at.store, '{"id":"b2"}');
  await j.write(at.record + '.cancel', at.store, 'cancel\n');
  await j.writeIndex({ id: 'b2', record: at.record, store: at.store });
  const idx = await j.readIndex();
  assert.equal(await j.read(idx.record, idx.store), '{"id":"b2"}');
  assert.ok(f.files.has('jobs/Videos/teaser.fvs.md/b2.json.cancel'));
  assert.deepEqual(f.vaultWrites, []);
});

test('no host path (remote engine): stay in the vault, and only the vault index counts', async () => {
  for (const opts of [{ hostPath: false }, { hostNull: true }]) {
    const f = fakeCtx(opts);
    f.files.set('jobs/Videos/teaser.fvs.md/latest.json', '{"id":"stale","record":"x","store":"data"}');
    f.vault.set('Videos/.fvs-jobs/teaser.latest.json', '{"id":"newer","record":"Videos/.fvs-jobs/newer.json"}');
    const j = jobStore(f.ctx, P);
    assert.equal((await j.place('c3')).store, 'vault');
    assert.equal((await j.readIndex()).id, 'newer', 'a leftover data-folder index must not hide the vault job');
  }
});

test('a job keeps the layer that placed it', async () => {
  const f = fakeCtx();
  const j = jobStore(f.ctx, P);
  const at = await j.place('e5');
  const other = new Map();
  f.ctx.storage.vault = () => ({ readText: async () => null, write: async (p, d) => { other.set(p, d); }, hostPath: async p => '/other/' + p });
  await j.write(at.record, at.store, '{}', at);
  await j.writeIndex({ id: 'e5', record: at.record, store: at.store }, at);
  assert.equal(other.size, 0, 'nothing lands in the library switched to');
  assert.ok(f.files.has(at.record));
});

test('an old vault index is still read until a new job exists', async () => {
  const f = fakeCtx();
  f.vault.set('Videos/.fvs-jobs/teaser.latest.json', '{"id":"old","record":"Videos/.fvs-jobs/old.json"}');
  f.vault.set('Videos/.fvs-jobs/old.json', '{"id":"old","status":"done"}');
  const j = jobStore(f.ctx, P);
  const idx = await j.readIndex();
  assert.equal(JSON.parse(await j.read(idx.record, idx.store)).status, 'done');
});

test('no open library: refuse, never fall back to the vault', async () => {
  const f = fakeCtx({ vaultNull: true });
  await assert.rejects(jobStore(f.ctx, P).place('d4'), e => e.code === 'storage-wait');
  assert.deepEqual(f.vaultWrites, []);
});

test('a failed read of the data folder rejects (not "no job")', async () => {
  const f = fakeCtx({ rejectRead: true });
  await assert.rejects(jobStore(f.ctx, P).readIndex(), /EIO/);
});
