/*
 * File: lab-tools.test.mjs
 * Modification: 2026-10-11 — Ensure Lab navigation and routes share one registry.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {labTools, getLabTool} from '../../content/lab-tools.ts';

test('Lab registry contains five unique, resolvable tools', () => {
  const slugs = labTools.map((item) => item.slug);
  assert.deepEqual(slugs, ['pearl-cannon', 'astro-compare', 'snake', 'github-galaxy', 'structmark']);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const item of labTools) {
    assert.equal(getLabTool(item.slug), item);
    assert.equal(`/lab/${item.slug}/`, `/lab/${getLabTool(item.slug)?.slug}/`);
    assert.ok(item.title && item.description && item.detail);
  }
  assert.equal(getLabTool('not-real'), undefined);
});
