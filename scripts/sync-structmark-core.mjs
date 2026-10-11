/*
 * File: sync-structmark-core.mjs
 * Modification: 2026-10-11 — 從明確提供的原始碼目錄更新核心並重建 SHA-256 清單。
 */
import {readFileSync, readdirSync, copyFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, join} from 'node:path';
const srcArg = process.argv[2];
if (!srcArg) {
  console.error('Usage: node scripts/sync-structmark-core.mjs <path-to-StructMark-src-directory>');
  process.exit(2);
}
const source = resolve(srcArg);
const target = join(process.cwd(),'lib','structmark','core');
const files = readdirSync(source).filter((name) => name.endsWith('.ts')).sort();
if (!files.includes('index.ts') || !files.includes('parser.ts') || !files.includes('html.ts')) throw new Error('This does not look like StructMark/src');
// Explicitly refuse implicit removal and arbitrary nested paths during a sync.
const old = JSON.parse(readFileSync('lib/structmark/core-manifest.json','utf8'));
const expected = Object.keys(old.files).sort();
if (JSON.stringify(files) !== JSON.stringify(expected)) throw new Error('Upstream file set changed: review differences before updating core');
for(const name of files) copyFileSync(join(source,name),join(target,name));
const hashes = Object.fromEntries(files.map((name)=>[name,createHash('sha256').update(readFileSync(join(target,name))).digest('hex')]));
writeFileSync('lib/structmark/core-manifest.json',JSON.stringify({...old,origin:`Local StructMark/src: ${source}`,files:hashes},null,2)+'\n');
console.log(`Synced ${files.length} StructMark source files; run npm run core:check, npm run docs:check, and full tests.`);
