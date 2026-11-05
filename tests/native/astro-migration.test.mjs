import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const read = (file) => readFileSync(file, 'utf8');

test('Astro owns the route manifest while preserving homepage and RIP', () => {
  for (const file of [
    'astro.config.mjs', 'src/layouts/BaseLayout.astro',
    'src/pages/index.astro', 'src/pages/[locale]/[...path].astro',
    'src/pages/ripmiki/index.astro', 'src/pages/feed.xml.ts',
    'src/pages/robots.txt.ts', 'src/pages/sitemap.xml.ts'
  ]) assert.ok(existsSync(file), `missing ${file}`);
  const packageInfo = JSON.parse(read('package.json'));
  assert.ok(packageInfo.dependencies.astro);
  assert.match(packageInfo.scripts.build, /astro build/);
  assert.doesNotMatch(packageInfo.scripts.build, /next build/);
});

test('Astro layout carries over original visual CSS without resetting fonts', () => {
  const layout = read('src/layouts/BaseLayout.astro');
  for (const css of ['site.css', 'page-extras.css', 'structmark.css']) {
    assert.ok(layout.includes(css), `Astro layout missing ${css}`);
  }
  assert.ok(layout.includes('Klee+One'));
  assert.ok(layout.includes('Zen+Maru+Gothic'));
  assert.ok(layout.includes('SiteHeader'));
  assert.ok(layout.includes('Fireflies'));
  assert.ok(read('app/styles/site.css').includes('--bg-a: #eef5fb'));
});

test('Astro keeps original music and RIP interactivity', () => {
  const home = read('src/pages/index.astro');
  const rip = read('src/pages/ripmiki/index.astro');
  assert.match(home, /HomePage/);
  assert.match(home, /client:load/);
  assert.match(rip, /RipMiki/);
  assert.match(rip, /client:load/);
  assert.ok(read('components/home/music-player.tsx').includes('createYouTubeAdapter'));
});

test('Works uses real repository imagery rather than generated illustration cards', () => {
  const projectSource = read('content/projects.ts');
  assert.match(projectSource, /raw\.githubusercontent\.com/);
  assert.match(projectSource, /opengraph\.githubassets\.com/);
  assert.match(projectSource, /codex-workspace-web/);
  assert.match(projectSource, /low-y-outpost-finder/);
});
