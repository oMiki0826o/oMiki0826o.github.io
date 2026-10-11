/*
 * File: v634-works.test.mjs
 * Modification: 2026-10-11 — Works V6.3.5 發布契約與專案／文章連結回歸。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const expected = ['discord-bot','miki-website','cipher-tool','astro-lab','stlab','cipher-tool-web','structmark','note-block-tweaks','ai-development-governance'];

test('Works lists nine verified public projects and an individual page for each', () => {
  const projects = read('content/projects.ts');
  const details = read('content/project-details.ts');
  for(const slug of expected) {
    assert.match(projects, new RegExp(`slug: ['"]${slug}['"]`), `${slug} listing missing`);
    assert.match(details, new RegExp(`slug: ['"]${slug}['"]`), `${slug} detail missing`);
  }
  assert.match(projects,/pinnedProjectSlugs = \['discord-bot', 'structmark', 'astro-lab', 'stlab'\]/);
  assert.match(projects,/demoUrl:/);
  assert.match(read('app/[locale]/projects/[slug]/page.tsx'), /summary\.demoUrl/);
});

test('all six new projects have local original minimalist SVG covers, not fake screenshots', () => {
  for(const slug of expected.slice(3)) {
    assert.ok(existsSync(`public/assets/projects/${slug}.svg`), `${slug} cover missing`);
    const cover = read(`public/assets/projects/${slug}.svg`);
    assert.match(cover, /<svg/);
    assert.match(cover, /<text/);
  }
});

test('Notes relate to Works by StructMark front matter instead of manual duplicate mappings', () => {
  assert.match(read('content/notes-loader.ts'), /projectSlug/);
  assert.match(read('content/notes-loader.ts'), /parsed\.metadata/);
  assert.match(read('content/notes/index.ts'), /getNotesForProject/);
  assert.match(read('app/[locale]/projects/[slug]/page.tsx'), /getNotesForProject/);
  for(const slug of ['discord-bot-from-zero','discord-bot-mod-guide','discord-bot-usage-guide']) {
    for(const locale of ['zh-TW','en','ja']) {
      assert.match(read(`content/notes/${slug}/${locale}.sm`), /^---\nproject: discord-bot\n---/);
    }
  }
});

test('Release version and vendored parser checksum validation are integrated', () => {
  const pkg=JSON.parse(read('package.json'));
  const lock=JSON.parse(read('package-lock.json'));
  assert.equal(pkg.version, '6.3.5');
  assert.equal(lock.version, '6.3.5');
  assert.equal(lock.packages[''].version, '6.3.5');
  assert.match(pkg.scripts['validate:fast'],/core:check/);
  assert.ok(existsSync('lib/structmark/core-manifest.json'));
  assert.ok(existsSync('scripts/check-structmark-core.mjs'));
});
