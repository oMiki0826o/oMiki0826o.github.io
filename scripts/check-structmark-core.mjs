/*
 * File: check-structmark-core.mjs
 * Modification: 2026-10-11 — 確認 vendored 語言核心與明確來源清單一致。
 */
import {readFileSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
const dir = join(process.cwd(),'lib','structmark','core');
const manifest = JSON.parse(readFileSync(join(process.cwd(),'lib','structmark','core-manifest.json'),'utf8'));
if (manifest.schemaVersion !== 1 || !manifest.origin) throw new Error('StructMark manifest invalid');
const actualFiles = readdirSync(dir).filter((name) => name.endsWith('.ts')).sort();
const expectedFiles = Object.keys(manifest.files).sort();
if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) throw new Error('StructMark source file list changed; refresh with the source sync tool');
for (const name of actualFiles) {
  const actual = createHash('sha256').update(readFileSync(join(dir,name))).digest('hex');
  if (actual !== manifest.files[name]) throw new Error(`StructMark core drift: ${name}; synchronize and review before publishing`);
}
console.log(`StructMark core verified: ${actualFiles.length} source files (${manifest.languageVersion}).`);
