import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (file) => readFileSync(file, 'utf8');
const sources = [
  'components/pages/project-detail.tsx',
  'components/pages/projects.tsx',
  'components/home/home-page.tsx'
];

test('public external links use the same plain right arrow as internal links', () => {
  for (const file of sources) {
    const source = read(file);
    assert.ok(source.includes(' →'), `Missing plain arrow in ${file}`);
    assert.doesNotMatch(source, /[↗\uFE0F]/u, `Emoji-style diagonal arrow remains in ${file}`);
  }
});

test('GitHub Pages deploys the built Astro dist directory, not Next.js out', () => {
  const workflow = read('.github/workflows/static.yml');
  assert.match(workflow, /name: Upload verified static website\s+uses: actions\/upload-pages-artifact@v3\s+with:\s+path: dist/);
  assert.doesNotMatch(workflow, /path:\s*out\b/);
  assert.match(read('package.json'), /"build": "astro build"/);
});

test('public README reflects Astro stack, actual output and current Works count', () => {
  const readme = read('README.md');
  assert.match(readme, /Astro/);
  assert.match(readme, /12 (?:個|projects)/);
  assert.match(readme, /dist\//);
  assert.doesNotMatch(readme, /Next\.js 16|Next\.js 16|out\//);
});

test('Vercel builds Astro from the same locked dependencies as GitHub Actions', () => {
  const config = JSON.parse(read('vercel.json'));
  assert.equal(config.framework, 'astro');
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.buildCommand, 'npm run build');
  assert.match(config.installCommand, /^npm ci\b/);
});
