import {expect, test} from '@playwright/test';

const topLevelRoutes = [
  '/', '/en/', '/ja/',
  '/zh-TW/about/', '/en/about/', '/ja/about/',
  '/zh-TW/projects/', '/en/projects/', '/ja/projects/',
  '/zh-TW/notes/', '/en/notes/', '/ja/notes/',
  '/zh-TW/timeline/', '/en/timeline/', '/ja/timeline/',
  '/zh-TW/notes/about-me/', '/en/notes/about-me/', '/ja/notes/discord-bot-from-zero/'
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

test('theme remains dark after a refresh', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /深色/}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('the narrow homepage has no horizontal overflow and keeps real contact links', async ({page}) => {
  await page.setViewportSize({width: 320, height: 720});
  await page.goto('/');
  const hasNoHorizontalOverflow = await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth);
  expect(hasNoHorizontalOverflow).toBe(true);
  await expect(page.getByRole('link', {name: 'Email'})).toHaveAttribute('href', 'mailto:chenmiki0925@gmail.com');
  await expect(page.getByRole('link', {name: 'Discord: miki._.0826'})).toHaveAttribute('href', 'https://discord.com/users/839381498351190036');
});
