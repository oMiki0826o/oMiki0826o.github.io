import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('homepage pins four different existing Notes for a balanced 2x2 desktop grid', () => {
  const notes = read('content/notes/index.ts');
  const value = notes.match(/export const pinnedNoteSlugs = \[([\s\S]*?)\] as const;/)?.[1];
  assert.ok(value, 'Pinned note definitions missing');
  const slugs = [...value.matchAll(/'([a-z0-9-]+)'/g)].map((entry) => entry[1]);
  assert.equal(slugs.length, 4, 'Homepage must show four pinned articles');
  assert.equal(new Set(slugs).size, 4, 'Pinned articles must be unique');
  for (const slug of slugs) {
    assert.ok(notes.includes(`from './${slug}/meta'`), `Missing pinned article: ${slug}`);
  }
});

test('Works images display without cropping real screenshots and GitHub preview cards', () => {
  const css = read('app/styles/page-extras.css');
  assert.match(css, /\.project-cover\s*\{[^}]*aspect-ratio:\s*2\s*\/\s*1\s*;/s);
  assert.match(css, /\.project-cover img\s*\{[^}]*object-fit:\s*contain\s*;/s);
  assert.match(css, /\.project-detail-cover\s*\{[^}]*object-fit:\s*contain\s*;/s);
});
