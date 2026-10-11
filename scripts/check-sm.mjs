/*
 * File: check-sm.mjs
 * Modification: 2026-10-11 — 使用 StructMark V1.1 Parser 確認實際語法、章節與多語內容。
 */
import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {TextDecoder} from 'node:util';
import {pathToFileURL} from 'node:url';

const root = process.cwd();
const tsc = join(root, 'node_modules', 'typescript', 'bin', 'tsc');
const compilation = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.sm-check.json'], {stdio: 'inherit'});
if (compilation.error) throw compilation.error;
if (compilation.status !== 0) process.exit(compilation.status ?? 1);

// TypeScript 的 Bundler 解析規則允許核心使用無副檔名匯入；
// 產出的 Node ESM 則需要明確的 .js，這裡只修正暫存輸出，不改動來源。
for (const file of readdirSync(join(root, '.sm-cache/core'))) {
  if (!file.endsWith('.js')) continue;
  const output = join(root, '.sm-cache/core', file);
  const source = readFileSync(output, 'utf8');
  writeFileSync(output, source.replace(/(from\s+["']\.\/[^"']+)(["'])/g, '$1.js$2'));
}

// ── 直接載入編譯後的官方核心，不自行推測 #2 語法 ──
const {parseDocument} = await import(pathToFileURL(join(root, '.sm-cache/core/index.js')).href);
const folder = join(root, 'content', 'notes');
const locales = ['zh-TW', 'en', 'ja'];
const decoder = new TextDecoder('utf-8', {fatal: true});
let checked = 0;
const problems = [];

for (const item of readdirSync(folder, {withFileTypes: true})) {
  if (!item.isDirectory()) continue;
  const counts = [];
  for (const locale of locales) {
    const file = join(folder, item.name, `${locale}.sm`);
    try {
      const source = decoder.decode(readFileSync(file));
      if (source.includes('\r')) throw new Error('請使用 LF 換行');
      const parsed = parseDocument(source);
      const diagnosticErrors = parsed.diagnostics.filter((issue) => issue.severity === 'error');
      if (diagnosticErrors.length) {
        throw new Error(diagnosticErrors.map((issue) => `${issue.code} (${issue.position.line}:${issue.position.column}) ${issue.message}`).join('；'));
      }
      const headers = parsed.children.filter((block) => block.type === 'heading' && block.level === 2);
      const ids = new Set();
      for (const [index, block] of headers.entries()) {
        const id = block.id ?? `note-section-${index + 1}`;
        if (ids.has(id)) throw new Error(`重複章節 ID: ${id}`);
        ids.add(id);
      }
      if (!headers.length || parsed.children[0]?.type !== 'heading' || parsed.children[0].level !== 2) {
        throw new Error('第一個區塊必須為 #2 章節標題');
      }
      const positions = parsed.children.reduce((acc, node, index) => {
        if (node.type === 'heading' && node.level === 2) acc.push(index);
        return acc;
      }, []);
      for (let i = 0; i < positions.length; i++) {
        const body = parsed.children.slice(positions[i] + 1, positions[i + 1] ?? parsed.children.length);
        if (!body.some((node) => node.type !== 'commentBlock' && node.type !== 'thematicBreak')) {
          throw new Error(`第 ${i + 1} 章沒有正文`);
        }
      }
      counts.push(headers.length);
      checked++;
    } catch (error) {
      problems.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  if (counts.length === locales.length && new Set(counts).size !== 1) {
    problems.push(`${item.name}: 章節數不一致（${counts.join(' / ')}）`);
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`StructMark AST validation passed: ${checked} documents.`);
}
