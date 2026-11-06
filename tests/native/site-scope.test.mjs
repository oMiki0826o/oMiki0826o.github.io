import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const path = (name) => resolve(root, name);
const text = (name) => readFileSync(path(name), 'utf8');

function gitBlobSha(name) {
  const data = readFileSync(path(name));
  return createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
}

test('removed Lab routes and assets are not shipped, while RIP remains a working route', () => {
  for (const removed of [
    'app/lab/page.tsx',
    'app/lab/[tool]/page.tsx',
    'app/styles/lab.css',
    'components/lab',
    'content/lab-tools.ts',
    'lib/pearl-calculator.ts',
    'lib/structmark/import-utils.ts'
  ]) assert.equal(existsSync(path(removed)), false, `${removed} is still present`);

  assert.equal(existsSync(path('app/ripmiki/page.tsx')), true);
  assert.equal(existsSync(path('tests/ripmiki.test.tsx')), true);
});

test('main stylesheet, music and memorial source remain byte-for-byte identical to main', () => {
  const protectedFiles = {
    'app/styles/site.css': '69f2c1a7bb14867f331ff024dd5a55fa24275843',
    'components/home/music-player.tsx': '09ff57f8cf7d1abb2f39656020056241f50639c7',
    'app/ripmiki/page.tsx': '96823a467f204ddb5015f707bec3196da1750322'
  };
  for (const [file, expectedSha] of Object.entries(protectedFiles)) {
    assert.equal(gitBlobSha(file), expectedSha, `Unexpected visual change in ${file}`);
  }
});

test('Astro migration retains homepage and navigation selectors', () => {
  const home = text('components/home/home-page.tsx');
  const header = text('components/layout/site-header.tsx');
  for (const name of ['intro', 'featured', 'section', 'projects', 'notes', 'timeline']) {
    assert.ok(home.includes('className="'+name+'"') || home.includes('className={'), 'homepage lost a section: '+name);
  }
  for (const name of ['topbar', 'wordmark', 'menu-toggle', 'site-menu', 'language-links', 'theme-toggle']) {
    assert.ok(header.includes(name) || text('components/layout/theme-toggle.tsx').includes(name), 'navigation lost: '+name);
  }
});

test('moving Lab styles retains the non-Lab detail page, 404 and timeline styles', () => {
  const layout = text('app/layout.tsx');
  const css = text('app/styles/page-extras.css');
  assert.match(layout, /\.\/styles\/page-extras\.css/);
  assert.doesNotMatch(layout, /\.\/styles\/lab\.css/);
  for (const selector of ['.lost-page', '.project-detail', '.note-toc', '.timeline-reveal']) {
    assert.ok(css.includes(selector), `Missing preserved rule ${selector}`);
  }
  assert.doesNotMatch(css, /\.lab-shell|\.pearl-fields|\.snake-game|\.astro-compare|\.github-galaxy/);
});
