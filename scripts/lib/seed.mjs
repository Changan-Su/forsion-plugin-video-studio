// For the real-Electron rigs. They need scenes to work with, and a new project has none (0.10.0). Once the create
// page has made the file, they write the "eva" starter over it, keeping its title and frame, and wait for the editor
// to take the change from the disk: the same way an edit by the Director, or by another editor, arrives.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { evaTemplate } from '../../src/lib/templates.js';
import { parseProject, setProjectMeta } from '../../src/lib/project.js';

const find = (dir, name) => { for (const e of readdirSync(dir)) { const p = join(dir, e); if (e === name) return p; if (statSync(p).isDirectory()) { const q = find(p, name); if (q) return q; } } return null; };

/** What a new project shows before it has a scene; then the starter's three scenes in `vault`'s `<name>.fvs.md`. */
export async function seedScenes(win, vault, name, clip = '.fvs-clip') {
  await win.waitForSelector('.fvs-studio .fvs-blank:not([hidden])', { timeout: 30000 }).catch(() => assert.fail('a new project is empty: its stage says how to start'));
  assert.equal(await win.locator(clip).count(), 0, 'a new project has no scenes');
  const file = find(vault, `${name}.fvs.md`);
  assert.ok(file, `the create page made ${name}.fvs.md`);
  const made = parseProject(readFileSync(file, 'utf8'));
  assert.equal(made.scenes.length, 0, 'nothing ready-made in the file');
  writeFileSync(file, setProjectMeta(evaTemplate({ title: made.meta.title }), { width: made.meta.width, height: made.meta.height }));
  await win.waitForSelector(clip, { timeout: 30000 }).catch(() => assert.fail('the editor takes scenes written to its file from outside'));
  return file;
}
