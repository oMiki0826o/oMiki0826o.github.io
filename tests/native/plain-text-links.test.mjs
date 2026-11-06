import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const sources = [
  'components/pages/project-detail.tsx',
  'components/pages/projects.tsx',
  'components/home/home-page.tsx'
];

test('all Astro work and featured image links use a plain text arrow, not emoji-style diagonal arrows', () => {
  for (const file of sources) {
    const source = readFileSync(file, 'utf8');
    assert.ok(source.includes(' →'), `Missing plain arrow in ${file}`);
    assert.doesNotMatch(source, /[\\u2197\\uFE0F]/u, `Diagonal emoji-style arrow remains in ${file}`);
  }
});
