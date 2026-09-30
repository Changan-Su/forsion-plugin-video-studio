// Install this repository's complete bundle into the development app, preserving the previous copy.
import { cp, mkdir, rename, rm, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const source = dirname(dirname(fileURLToPath(import.meta.url)));
const home = join(homedir(), '.forsion-dev');
const target = join(home, 'plugins/forsion-video-studio');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const stage = join(home, `.plugin-install/forsion-video-studio-${stamp}`);
const backup = join(home, `plugin-backups/forsion-video-studio-${stamp}`);
const excluded = new Set(['.git', 'node_modules', 'artifacts', '.DS_Store']);
await mkdir(dirname(stage), { recursive: true });
await cp(source, stage, { recursive: true, filter: p => !excluded.has(basename(p)) });
await mkdir(dirname(target), { recursive: true });
const hadPrevious = existsSync(target);
if (hadPrevious) { await mkdir(dirname(backup), { recursive: true }); await rename(target, backup); }
try { await rename(stage, target); }
catch (error) { if (hadPrevious) await rename(backup, target); await rm(stage, { recursive: true, force: true }); throw error; }
const manifest = JSON.parse(await readFile(join(target, 'manifest.json'), 'utf8'));
const receipt = { installedAt: new Date().toISOString(), source, target, backup: hadPrevious ? backup : null, version: manifest.version,
  mainSha256: createHash('sha256').update(await readFile(join(target, 'main.js'))).digest('hex') };
await mkdir(join(source, 'artifacts'), { recursive: true });
await writeFile(join(source, 'artifacts/install-dev.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(`Installed ${manifest.name} ${manifest.version} → ${target}`);
if (hadPrevious) console.log(`Previous copy → ${backup}`);
