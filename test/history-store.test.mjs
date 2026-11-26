import test from 'node:test';
import assert from 'node:assert/strict';
import { historyStore } from '../src/ui/history-store.js';

function fakeCtx({ storage = true, vaultNull = false, rejectRead = null } = {}) {
  const vault = new Map(), vaultWrites = [];
  let lib = 'A';
  const layers = { A: new Map(), B: new Map() };
  const mk = name => ({
    readText: async p => { if (lib !== name) throw new Error('Vault changed'); if (rejectRead?.(p)) throw new Error('EIO ' + p); return layers[name].has(p) ? layers[name].get(p) : null; },
    write: async (p, d) => { if (lib !== name) throw new Error('Vault changed'); layers[name].set(p, String(d)); },
  });
  const ctx = {
    app: { readFile: async p => (vault.has(p) ? vault.get(p) : null), writeFile: async (p, d) => { vault.set(p, d); vaultWrites.push(p); } },
    ...(storage ? { storage: { vault: () => (vaultNull ? null : mk(lib)) } } : {}),
  };
  return { ctx, vault, files: layers.A, layers, vaultWrites, switchTo: n => { lib = n; } };
}
const P = 'Videos/Launch/teaser.fvs.md';

test('older hosts keep the old vault layout byte for byte', async () => {
  const f = fakeCtx({ storage: false });
  const s = historyStore(f.ctx, P).bind();
  const ref = await s.writeSnapshot('abc.before.txt', 'v1');
  assert.equal(ref, 'Videos/Launch/.fvs-history/teaser.abc.before.txt');
  await s.writeRecord('{"id":"abc"}');
  assert.equal(f.vault.get('Videos/Launch/.fvs-history/teaser.director.json'), '{"id":"abc"}');
  assert.equal(await s.readSnapshot(ref), 'v1');
});

test('older hosts: a failed read still rejects (the panel skips that refresh, as before)', async () => {
  const f = fakeCtx({ storage: false });
  f.ctx.app.readFile = async () => { throw new Error('offline'); };
  await assert.rejects(historyStore(f.ctx, P).bind().readSnapshot('x'), /offline/);
});

test('with ctx.storage everything goes to the data folder, one folder per project', async () => {
  const f = fakeCtx();
  const s = historyStore(f.ctx, P).bind();
  const ref = await s.writeSnapshot('abc.before.txt', 'v1');
  assert.equal(ref, 'history/Videos/Launch/teaser.fvs.md/abc.before.txt');
  await s.writeRecord('{"id":"abc"}');
  assert.equal(f.files.get('history/Videos/Launch/teaser.fvs.md/director.json'), '{"id":"abc"}');
  assert.equal(await s.readRecord(), '{"id":"abc"}');
  assert.equal(await s.readSnapshot(ref), 'v1');
  assert.deepEqual(f.vaultWrites, []);
});

test('an old vault record and its snapshot are copied once, originals untouched', async () => {
  const f = fakeCtx();
  f.vault.set('Videos/Launch/.fvs-history/teaser.director.json', '{"id":"old","beforePath":"Videos/Launch/.fvs-history/teaser.old.before.txt"}');
  f.vault.set('Videos/Launch/.fvs-history/teaser.old.before.txt', 'old text');
  const s = historyStore(f.ctx, P).bind();
  const rec = JSON.parse(await s.readRecord());
  assert.equal(rec.id, 'old');
  assert.equal(rec.beforePath, 'history/Videos/Launch/teaser.fvs.md/old.before.txt');
  assert.equal(await s.readSnapshot(rec.beforePath), 'old text');
  assert.deepEqual(f.vaultWrites, []);
  assert.ok(f.vault.has('Videos/Launch/.fvs-history/teaser.director.json'), 'vault original stays');
  // once copied, the user may delete the vault originals: the copy stands on its own
  f.vault.clear();
  assert.equal(await s.readSnapshot(JSON.parse(await s.readRecord()).beforePath), 'old text');
});

test('no open library: refuse, never fall back to the vault', async () => {
  const f = fakeCtx({ vaultNull: true });
  assert.throws(() => historyStore(f.ctx, P).bind(), e => e.code === 'storage-wait');
  assert.deepEqual(f.vaultWrites, []);
});

test('a library switch mid-task rejects instead of writing into the other library', async () => {
  const f = fakeCtx();
  const op = historyStore(f.ctx, P).bind();
  await op.writeSnapshot('t.before.txt', 'x');
  f.switchTo('B');
  await assert.rejects(op.writeRecord('{"id":"t"}'), /Vault changed/);
  assert.equal(f.layers.B.size, 0);
});

test('a failed read is a failure, not "no record"', async () => {
  const f = fakeCtx({ rejectRead: p => p.endsWith('director.json') });
  f.vault.set('Videos/Launch/.fvs-history/teaser.director.json', '{"id":"old"}');
  await assert.rejects(historyStore(f.ctx, P).bind().readRecord(), /EIO/);
});
