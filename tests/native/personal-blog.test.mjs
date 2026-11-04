import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const read = file => readFileSync(file, 'utf8');

test('personal site has four primary navigation links', () => {
  const header = read('components/layout/site-header.tsx');
  assert.match(header, /desktop-navigation/);
  assert.match(header, /'\/notes'/);
  assert.match(header, /'\/projects'/);
  assert.match(header, /'\/about'/);
  assert.doesNotMatch(header, /'\/timeline'/);
});

test('Lab is removed without deleting the Blog StructMark parser', () => {
  for (const path of ['app/lab/page.tsx','app/lab/[tool]/page.tsx','content/lab-tools.ts','app/styles/lab.css','lib/pearl-calculator.ts']) {
    assert.equal(existsSync(path), false, path);
  }
  assert.equal(existsSync('lib/structmark/core/parser.ts'), true);
  assert.equal(existsSync('content/notes/about-me/zh-TW.sm'), true);
  assert.doesNotMatch(read('app/layout.tsx'), /lab\.css/);
});

test('blog remains the center of the homepage', () => {
  const home = read('components/home/home-page.tsx');
  assert.match(home, /className="home-post-list"/);
  assert.match(home, /className="home-work-list"/);
  assert.ok(home.indexOf('home-post-list') < home.indexOf('home-work-list'));
  assert.doesNotMatch(home, /\/lab\//);
});
