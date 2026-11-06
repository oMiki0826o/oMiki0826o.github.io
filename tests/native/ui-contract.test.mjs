/*
 * File: ui-contract.test.mjs
 * Modification: 2026-10-11 — V6.2.5 編輯器、圖像真實性與手機版 UI 回歸契約。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source = path => readFileSync(path, 'utf8');

test('site remains legible and interactive on mobile / keyboard', () => {
  const css = source('app/styles/structmark.css');
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media\s*\(max-width:\s*740px\)/);
  assert.match(css, /\.sm-diagnostics button:focus-visible/);
});
