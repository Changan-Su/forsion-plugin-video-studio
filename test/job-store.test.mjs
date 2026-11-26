import test from 'node:test';
import assert from 'node:assert/strict';
import { jobStore, DATA } from '../src/ui/job-store.js';

function fakeCtx({ storage = true, hostPath = true, vaultNull = false, rejectRead = false } = {}) {
  const vault = new Map(), files = new Map(), vaultWrites = [];
  const layer = {
    readText: async p => { if (rejectRead) throw new Error('EIO ' + p); return files.has(p) ? files.get(p) : null; },
    write: async (p, d) => { files.set(p, String(d)); },
    ...(hostPath ? { hostPath: async p => `/home/u/.forsion/tangu/plugin-data/fvs/vaults/k/${p}` } : {}),
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
  assert.deepEqual(at, { store: 'vault', record: 'Videos/.fvs-jobs/a1.json', recordAbs: '/vault/Videos/.fvs-jobs/a1.json', snapshot: 'Videos/.fvs-jobs/a1.source.txt', snapshotAbs: '/vault/Videos/.fvs-jobs/a1.source.txt' });
  await j.writeIndex({ id: 'a1', record: at.record, store: at.store });
  assert.ok(f.vault.has('Videos/.fvs-jobs/teaser.latest.json'));
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

test('no host path (remote engine): stay in the vault', async () => {
  const f = fakeCtx({ hostPath: false });
  assert.equal((await jobStore(f.ctx, P).place('c3')).store, 'vault');
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
