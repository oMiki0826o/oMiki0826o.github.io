/*
 * Filename: audit-repository.mjs
 * Modification: Add dependency-free repository hygiene gate.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
const root = resolve(process.argv[2] ?? resolve(import.meta.dirname, '..'));
const excluded = new Set(['.git', 'node_modules', '.next', 'out', 'coverage', 'playwright-report', 'test-results']);
const extensions = new Set(['.md', '.sm', '.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.yml', '.yaml']);
const failures = [];
let inspected = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { walk(path); continue; }
    if (!entry.isFile()) continue;
    const name = relative(root, path);
    if (entry.name === '.DS_Store') { failures.push(`${name}: unwanted macOS metadata`); continue; }
    if (![...extensions].some(ext => entry.name.endsWith(ext))) continue;
    const buffer = readFileSync(path);
    inspected++;
    if (buffer.includes(0)) failures.push(`${name}: NUL byte`);
    if (buffer.includes(13)) failures.push(`${name}: CR byte (use LF)`);
    try { new TextDecoder('utf-8', { fatal: true }).decode(buffer); }
    catch { failures.push(`${name}: invalid UTF-8`); }
  }
}
walk(root);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Repository hygiene: ${inspected} text files checked (UTF-8, LF, NUL).`);
