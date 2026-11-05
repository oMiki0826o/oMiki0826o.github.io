import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = file => readFileSync(file, 'utf8');

test('Astro hydrated components never import the filesystem-backed note registry', () => {
  const browserIslands = [
    'components/home/home-page.tsx',
    'components/pages/notes.tsx',
    'components/pages/project-detail.tsx',
    'components/pages/note-detail.tsx'
  ];
  for (const path of browserIslands) {
    const src = read(path);
    assert.doesNotMatch(src, /from ['"]@\/content\/notes\/index['"]/, `${path} includes server-only node:fs through notes registry`);
  }
  const serverNotes = read('content/notes-loader.ts');
  assert.match(serverNotes, /node:fs/);
  assert.match(read('src/pages/index.astro'), /pinnedNotes/);
});

test('Astro homepage has server-rendered content and interactive islands can hydrate independently', () => {
  const route = read('src/pages/index.astro');
  assert.match(route, /<HomePage client:load/);
  assert.match(read('components/home/home-page.tsx'), /export function HomePage/);
});
