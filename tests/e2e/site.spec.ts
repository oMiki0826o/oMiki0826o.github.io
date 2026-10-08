import {expect, test} from '@playwright/test';

const topLevelRoutes = [
  '/', '/en/', '/ja/',
  '/zh-TW/about/', '/en/about/', '/ja/about/',
  '/zh-TW/projects/', '/en/projects/', '/ja/projects/',
  '/zh-TW/notes/', '/en/notes/', '/ja/notes/',
  '/zh-TW/timeline/', '/en/timeline/', '/ja/timeline/',
  '/zh-TW/notes/about-me/', '/en/notes/about-me/', '/ja/notes/discord-bot-from-zero/',
  '/zh-TW/notes/discord-bot-usage-guide/', '/en/notes/discord-bot-mod-guide/',
  '/zh-TW/notes/seasonal-night-sky-guide/', '/en/notes/spacetime-and-gravitational-waves/',
  '/ja/notes/ultrasonic-call-study-notes/'
];

test('all public locale and note routes load from the exported site', async ({page}) => {
  for (const path of topLevelRoutes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
  }
});

test('language navigation preserves the current page path', async ({page}) => {
  await page.goto('/en/projects/');
  await expect(page.getByRole('link', {name: '日'})).toHaveAttribute('href', '/ja/projects/');
  await expect(page.getByRole('link', {name: '中'})).toHaveAttribute('href', '/zh-TW/projects/');
});

test('the navigation drawer identifies, and can close, the current page', async ({page}) => {
  await page.goto('/zh-TW/about/');
  await page.getByRole('button', {name: '開啟選單'}).click();
  await expect(page.getByRole('link', {name: '關於'})).toHaveAttribute('aria-current', 'page');
  await page.keyboard.press('Escape');
  await expect(page.locator('.site-menu')).toHaveCount(0);

  await page.getByRole('button', {name: '開啟選單'}).click();
  await page.locator('.menu-scrim').click({position: {x: 4, y: 4}});
  await expect(page.locator('.site-menu')).toHaveCount(0);
});

test('article tools are readable and reduced motion never hides content', async ({page}) => {
  await page.setViewportSize({width: 390, height: 360});
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  await expect(page.locator('.reading-progress')).toBeVisible();
  await expect(page.locator('.note-article')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.getByRole('button', {name: '回到頁面頂端'})).toBeVisible();
});

test('notes filters keep the reading list quiet and usable', async ({page}) => {
  await page.goto('/zh-TW/notes/');
  await page.getByRole('button', {name: 'Astronomy'}).click();
  await expect(page.getByRole('heading', {name: '夜空入門：從北極星開始認星'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Discord Bot 使用教學'})).toHaveCount(0);
  await page.getByRole('button', {name: '全部'}).click();
  await expect(page.getByRole('heading', {name: 'Discord Bot 使用教學'})).toBeVisible();
});

test('theme remains dark after a refresh', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /深色/}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('the narrow homepage has no horizontal overflow and keeps real contact links', async ({page}) => {
  await page.setViewportSize({width: 320, height: 720});
  await page.goto('/');
  await expect(page.getByRole('button', {name: '開啟選單'})).toBeVisible();
  await page.getByRole('button', {name: '開啟選單'}).click();
  await expect(page.getByRole('link', {name: '關於'})).toHaveAttribute('href', '/zh-TW/about/');
  const hasNoHorizontalOverflow = await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth);
  expect(hasNoHorizontalOverflow).toBe(true);
  await expect(page.getByRole('link', {name: 'Email'})).toHaveAttribute('href', 'mailto:chenmiki0925@gmail.com');
  await expect(page.getByRole('link', {name: 'Discord: miki._.0826'})).toHaveAttribute('href', 'https://discord.com/users/839381498351190036');
});

test('the home project preview balances the pinned projects on desktop', async ({page}) => {
  await page.setViewportSize({width: 1180, height: 800});
  await page.goto('/');
  const cards = page.locator('.projects .project');
  await expect(cards).toHaveCount(3);
  const boxes = await Promise.all([0, 1, 2].map((index) => cards.nth(index).boundingBox()));
  for (const box of boxes) expect(box?.width).toBeGreaterThan(200);
  expect(boxes[1]?.x).toBeGreaterThan((boxes[0]?.x ?? 0) + (boxes[0]?.width ?? 0));
  expect(boxes[2]?.x).toBeGreaterThan((boxes[1]?.x ?? 0) + (boxes[1]?.width ?? 0));
});

test('the memorial easter egg keeps its standalone layout and click tribute', async ({page}) => {
  await page.goto('/ripmiki/');
  await expect(page.locator('.grave-layout')).toBeVisible();
  await expect(page.locator('.reading-progress')).toHaveCount(0);
  await expect(page.locator('.fireflies')).toHaveCount(0);
  await page.mouse.click(120, 180);
  await expect(page.locator('.rip-flower')).toHaveCount(1);
});
