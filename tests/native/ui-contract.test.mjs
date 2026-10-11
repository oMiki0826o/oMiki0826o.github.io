/*
 * File: ui-contract.test.mjs
 * Modification: 2026-10-11 — V6.2.5 編輯器、圖像真實性與手機版 UI 回歸契約。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source = path => readFileSync(path, 'utf8');

test('playground imports local .sm UTF-8 documents and offers clickable diagnostic locations', () => {
  const ui = source('components/lab/structmark-playground.tsx');
  assert.match(ui, /type="file"/);
  assert.match(ui, /\.sm/);
  assert.match(ui, /TextDecoder\('utf-8',\s*\{fatal:\s*true\}\)/);
  assert.match(ui, /offsetAtPosition/);
  assert.match(ui, /setSelectionRange/);
  assert.match(ui, /fileImportError/);
});

test('astro comparison never fabricates visual changes with image filters', () => {
  const css = source('app/styles/lab.css');
  const actual = source('components/lab/astro-compare.tsx');
  assert.match(actual, /original\.url/);
  assert.match(actual, /processed\.url/);
  assert.doesNotMatch(css, /\.astro-frame\s*>\s*img\s*\{\s*filter:/);
  assert.doesNotMatch(css, /\.astro-processed img\s*\{[^}]*filter:/s);
});

test('site remains legible and interactive on mobile / keyboard', () => {
  const css = source('app/styles/structmark.css');
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media\s*\(max-width:\s*740px\)/);
  assert.match(css, /\.sm-diagnostics button:focus-visible/);
});
