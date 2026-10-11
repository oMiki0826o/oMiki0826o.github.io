/*
 * File: release-integrity.test.mjs
 * Modification: 2026-10-11 — 版本、依賴鎖定與 PR 品質檢查。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json','utf8'));
const lock = JSON.parse(readFileSync('package-lock.json','utf8'));
const workflow = readFileSync('.github/workflows/static.yml','utf8');

test('package and lock versions and direct dependencies match', () => {
  assert.equal(pkg.version, '6.3.5');
  assert.equal(lock.version,pkg.version);
  assert.equal(lock.packages[''].version,pkg.version);
  assert.deepEqual(lock.packages[''].dependencies,pkg.dependencies);
  assert.deepEqual(lock.packages[''].devDependencies,pkg.devDependencies);
  assert.equal(pkg.dependencies['next-themes'], undefined);
  assert.equal(lock.packages['node_modules/next-themes'], undefined);
});

test('CI validates pull requests and deploys main only after checks', () => {
  assert.match(workflow,/pull_request:/);
  assert.match(workflow,/needs:\s*validate/);
  assert.match(workflow,/github\.event_name\s*!=\s*'pull_request'/);
  assert.match(workflow,/npm run validate:fast/);
  assert.match(workflow,/npm run test:e2e/);
  assert.match(workflow,/webkit/);
});
