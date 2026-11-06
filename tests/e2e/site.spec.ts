import {expect, test} from '@playwright/test';

const topLevelRoutes = [
  '/', '/en/', '/ja/',
  '/zh-TW/about/', '/en/about/', '/ja/about/',
  '/zh-TW/projects/', '/en/projects/', '/ja/projects/',
  '/zh-TW/projects/discord-bot/', '/en/projects/cipher-tool/', '/ja/projects/miki-website/',
  '/zh-TW/projects/structmark/', '/en/projects/astro-lab/', '/ja/projects/stlab/',
  '/zh-TW/projects/cipher-tool-web/', '/en/projects/note-block-tweaks/', '/ja/projects/ai-development-governance/',
  '/zh-TW/notes/', '/en/notes/', '/ja/notes/',
  '/zh-TW/timeline/', '/en/timeline/', '/ja/timeline/',
  '/zh-TW/notes/about-me/', '/en/notes/about-me/', '/ja/notes/discord-bot-from-zero/',
  '/zh-TW/notes/discord-bot-usage-guide/', '/en/notes/discord-bot-mod-guide/',
  '/zh-TW/notes/seasonal-night-sky-guide/', '/en/notes/spacetime-and-gravitational-waves/',
  '/ja/notes/ultrasonic-call-study-notes/',

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
  await expect(cards).toHaveCount(4);
  const boxes = await Promise.all([0, 1, 2].map((index) => cards.nth(index).boundingBox()));
  for (const box of boxes) expect(box?.width).toBeGreaterThan(200);
  expect(new Set(boxes.map((box) => `${box?.x}:${box?.y}:${box?.width}:${box?.height}`)).size).toBe(3);
});

test('the memorial easter egg keeps its standalone layout and click tribute', async ({page}) => {
  await page.goto('/ripmiki/');
  await expect(page.locator('.grave-layout')).toBeVisible();
  await expect(page.locator('.reading-progress')).toHaveCount(0);
  await expect(page.locator('.fireflies')).toHaveCount(0);
  await page.mouse.click(120, 180);
  await expect(page.locator('.rip-flower')).toHaveCount(1);
});


test('every localized exported HTML has the correct language', async ({page}) => {
  for (const locale of ['zh-TW', 'en', 'ja']) {
    await page.goto(`/${locale}/notes/about-me/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
  }
});

test('article contents links resolve to the section shown on the page', async ({page}) => {
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  const contents = page.locator('.note-toc a');
  const first = contents.first();
  const anchor = await first.getAttribute('href');
  expect(anchor).toMatch(/^#.+/);
  const id = decodeURIComponent(anchor!.slice(1));
  await expect(page.locator('.note-article section').first()).toHaveAttribute('id', id);
});

test('music player shows an error when YouTube API cannot load', async ({page}) => {
  await page.route('**/iframe_api', route => route.abort());
  await page.goto('/');
  await page.locator('#play').click();
  await expect(page.locator('.player-error')).toBeVisible({timeout: 20_000});
});

// ── V6.3.4：Works 新作品、三語詳情與真實站外連結 ──
test('Works lists all projects with readable groups and source links', async ({page}) => {
  await page.goto('/zh-TW/projects/');
  await expect(page.locator('.page-project')).toHaveCount(12);
  await expect(page.getByRole('heading', {name: '網站與語言'})).toBeVisible();
  await expect(page.getByRole('heading', {name: '工具與開發'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'StructMark'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'AstroLab'})).toBeVisible();
  const links = page.locator('.page-project-actions a[target="_blank"]');
  expect(await links.count()).toBeGreaterThan(5);
  for (const link of await links.all()) await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('Works remains within the viewport on narrow phones', async ({page}) => {
  for (const width of [320,375,390,430]) {
    await page.setViewportSize({width,height:740});
    await page.goto('/zh-TW/projects/');
    await expect(page.locator('.page-project')).toHaveCount(12);
    const overflowing = await page.locator('html').evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(overflowing, `width=${width}`).toBe(false);
  }
});

test('StructMark note front matter links the related work in both directions', async ({page}) => {
  await page.goto('/zh-TW/notes/discord-bot-usage-guide/');
  await expect(page.locator('.note-project-related a')).toHaveAttribute('href', '/zh-TW/projects/discord-bot/');
  await page.goto('/zh-TW/projects/discord-bot/');
  await expect(page.getByRole('link',{name:/Discord Bot 使用教學/})).toBeVisible();
});

// ── V6.3.5：修正後珍珠砲的結果與誠實的誤差說明 ──

test('Works screenshot images are not cropped on desktop or mobile', async ({page}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto('/zh-TW/projects/');
    const covers = page.locator('.works-group .page-project-cover img');
    await expect(covers).toHaveCount(12);
    await expect.poll(async () => covers.first().evaluate((img) => getComputedStyle(img).objectFit)).toBe('contain');
    const noOverflow = await page.locator('html').evaluate((el) => el.scrollWidth <= el.clientWidth);
    expect(noOverflow).toBe(true);
  }
});

test('Astro mobile homepage stays visible after browser hydration', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  await expect(page.locator('main .intro h1')).toHaveText('Miki');
  await expect(page.locator('main .intro')).toBeVisible();
  await expect(page.locator('.projects .project')).toHaveCount(4);
  await expect(page.locator('.notes .note')).toHaveCount(4);
  const islands = page.locator('astro-island');
  await expect.poll(async () => islands.evaluateAll((nodes) => nodes.filter((node) => node.hasAttribute('ssr')).length)).toBe(0);
  await expect(page.locator('main .intro')).toBeVisible();
  expect(errors, 'No client hydration errors').toEqual([]);
});
