/*
 * File: structmark-import.test.mjs
 * Modification: 2026-10-11 — .sm 匯入限制與行列定位的行為回歸測試。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {fileImportError, offsetAtPosition, MAX_FILE_BYTES} from '../../lib/structmark/import-utils.ts';

test('accepts only a non-empty .sm UTF-8 candidate', () => {
  assert.equal(fileImportError('notes.sm', 100), null);
  assert.equal(fileImportError('NOTE.SM', 100), null);
  assert.match(fileImportError('notes.md', 100), /\.sm/);
  assert.match(fileImportError('notes.sm', 0), /空白/);
  assert.match(fileImportError('notes.sm', MAX_FILE_BYTES + 1), /過大/);
});

test('diagnostic line and column locate text without jumping past end', () => {
  const text = '#2 標題\n第二行文字\nEnd';
  assert.equal(offsetAtPosition(text, 1, 1), 0);
  assert.equal(offsetAtPosition(text, 2, 1), text.indexOf('第二行'));
  assert.equal(offsetAtPosition(text, 2, 3), text.indexOf('第二行') + 2);
  assert.equal(offsetAtPosition(text, 99, 999), text.length);
  assert.equal(offsetAtPosition(text, -1, -1), 0);
});
