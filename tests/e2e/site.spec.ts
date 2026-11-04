import {expect, test} from '@playwright/test';

const publicRoutes = [
  '/', '/zh-TW/', '/en/', '/ja/',
  '/zh-TW/about/', '/en/about/', '/ja/about/',
  '/zh-TW/projects/', '/en/projects/', '/ja/projects/',
  '/zh-TW/notes/', '/en/notes/', '/ja/notes/',
  '/zh-TW/projects/discord-bot/', '/en/projects/structmark/',
  '/zh-TW/notes/about-me/', '/en/notes/seasonal-night-sky-guide/',
  '/ja/notes/ultrasonic-call-study-notes/', '/feed.xml', '/sitemap.xml'
];

test('every primary route and existing Blog article loads from the static export', async ({page}) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
  }
});

test('desktop navigation is focused on the four personal-site sections', async ({page}) => {
  await page.setViewportSize({width: 1180, height: 840});
  await page.goto('/');
  const navigation = page.locator('.desktop-navigation');
  await expect(navigation).toBeVisible();
  await expect(navigation.locator('a')).toHaveCount(4);
  await expect(navigation.getByRole('link', {name: 'Blog'})).toHaveAttribute('href', '/zh-TW/notes/');
  await expect(navigation.getByRole('link', {name: '作品'})).toHaveAttribute('href', '/zh-TW/projects/');
  await expect(page.locator('a[href^="/lab"]')).toHaveCount(0);
});

test('mobile navigation opens and closes without horizontal overflow', async ({page}) => {
  await page.setViewportSize({width: 320, height: 740});
  await page.goto('/');
  await expect(page.getByRole('button', {name: '開啟選單'})).toBeVisible();
  await page.getByRole('button', {name: '開啟選單'}).click();
  await expect(page.locator('.site-menu a')).toHaveCount(4);
  await page.keyboard.press('Escape');
  await expect(page.locator('.site-menu')).toHaveCount(0);
  const overflow = await page.locator('html').evaluate(el => el.scrollWidth > el.clientWidth);
  expect(overflow).toBe(false);
});

test('home shows recent writing before selected works', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.home-post')).toHaveCount(4);
  await expect(page.locator('.home-work')).toHaveCount(3);
  const posts = await page.locator('#home-blog-title').boundingBox();
  const works = await page.locator('#home-works-title').boundingBox();
  expect(posts && works && posts.y < works.y).toBe(true);
});

test('language switch preserves Blog and works paths', async ({page}) => {
  await page.goto('/en/notes/');
  await expect(page.getByRole('link', {name: '日'})).toHaveAttribute('href', '/ja/notes/');
  await expect(page.getByRole('link', {name: '中'})).toHaveAttribute('href', '/zh-TW/notes/');
});

test('Blog category filtering remains usable', async ({page}) => {
  await page.goto('/zh-TW/notes/');
  await page.getByRole('button', {name: 'Astronomy'}).click();
  await expect(page.getByRole('heading', {name: '夜空入門：從北極星開始認星'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Discord Bot 使用教學'})).toHaveCount(0);
  await page.getByRole('button', {name: '全部'}).click();
  await expect(page.getByRole('heading', {name: 'Discord Bot 使用教學'})).toBeVisible();
});

test('articles retain translated html language, TOC and reading controls', async ({page}) => {
  for (const locale of ['zh-TW','en','ja']) {
    await page.goto(`/${locale}/notes/about-me/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
  }
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  await expect(page.locator('.reading-progress')).toBeVisible();
  const first = page.locator('.note-toc a').first();
  const anchor = await first.getAttribute('href');
  expect(anchor).toMatch(/^#.+/);
  await expect(page.locator('.note-article section').first()).toHaveAttribute('id', decodeURIComponent(anchor!.slice(1)));
});

test('theme preference survives a page reload', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /深色/}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('works still list nine actual repositories and preserve details', async ({page}) => {
  await page.goto('/zh-TW/projects/');
  await expect(page.locator('.page-project')).toHaveCount(9);
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  await expect(page.locator('.note-project-related a')).toHaveAttribute('href', '/zh-TW/projects/discord-bot/');
});

test('Lab and Timeline no longer have public pages', async ({page}) => {
  for (const url of ['/lab/', '/lab/snake/', '/zh-TW/timeline/']) {
    const response = await page.goto(url);
    expect(response?.status(), url).toBe(404);
  }
});

test('Blog is legible on small phones', async ({page}) => {
  for (const width of [320, 375, 390, 430]) {
    await page.setViewportSize({width, height: 740});
    await page.goto('/zh-TW/notes/');
    const overflow = await page.locator('html').evaluate(el => el.scrollWidth > el.clientWidth);
    expect(overflow, `width=${width}`).toBe(false);
  }
});

test('music can show failures clearly without breaking the Blog', async ({page}) => {
  await page.route('**/iframe_api', route => route.abort());
  await page.goto('/');
  await page.locator('#play').click();
  await expect(page.locator('.player-error')).toBeVisible({timeout: 20_000});
});

test('reduced motion keeps article content visible', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  await expect(page.locator('.note-article')).toBeVisible();
});
