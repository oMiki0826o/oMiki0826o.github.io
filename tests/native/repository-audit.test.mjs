/*
 * Filename: repository-audit.test.mjs
 * Modification: Exercise the repository audit against disposable fixtures.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const script = fileURLToPath(new URL('../../scripts/audit-repository.mjs', import.meta.url));
function runFixture(files) {
  const dir = mkdtempSync(join(tmpdir(), 'miki-audit-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      const path = join(dir, name);
      mkdirSync(join(path, '..'), {recursive: true});
      writeFileSync(path, content);
    }
    return spawnSync(process.execPath, [script, dir], {encoding: 'utf8'});
  } finally {rmSync(dir, {recursive: true, force: true});}
}
test('repository audit rejects macOS metadata files', () => {
  const result = runFixture({'src/.DS_Store': 'junk'});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /\.DS_Store/);
});
test('repository audit rejects invalid UTF-8 and CRLF', () => {
  const result = runFixture({'broken.sm': Buffer.from([0xff]), 'readme.md': 'a\r\nb'});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /invalid UTF-8/);
  assert.match(result.stderr, /CR byte/);
});
test('repository audit accepts valid nested UTF-8 text', () => {
  const result = runFixture({'docs/README.sm': '繁體中文\n'});
  assert.equal(result.status, 0, result.stderr);
});
