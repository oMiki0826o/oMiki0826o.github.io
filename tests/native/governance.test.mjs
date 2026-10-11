/*
 * Filename: governance.test.mjs
 * Modification: Verify the repository governance gates and documentation.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '../..');
test('governance documents and verification script are present', () => {
  for (const file of ['AGENTS.md', 'docs/GOVERNANCE.sm', 'scripts/audit-repository.mjs']) {
    assert.ok(existsSync(resolve(root, file)), `missing ${file}`);
  }
});
test('fast validation includes repository audit', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  assert.match(pkg.scripts['validate:fast'], /audit:repo/);
});
