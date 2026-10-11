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
  '/lab/', '/lab/pearl-cannon/', '/lab/astro-compare/', '/lab/snake/', '/lab/github-galaxy/', '/lab/structmark/'
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


test('StructMark editor parses an actual document and exports an AST', async ({page}) => {
  await page.goto('/lab/structmark/');
  await page.getByRole('textbox', {name: 'StructMark 來源文字'}).fill('#1 Hello\n\n*[test]');
  await expect(page.locator('.sm-preview h1')).toHaveText('Hello');
  await expect(page.locator('.sm-preview strong')).toHaveText('test');
  await page.getByRole('tab', {name: 'AST'}).click();
  await expect(page.locator('.sm-json')).toContainText('heading');
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

test('StructMark editor supports keyboard tab navigation', async ({page}) => {
  await page.goto('/lab/structmark/');
  const preview = page.getByRole('tab', {name: '預覽'});
  await preview.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', {name: 'AST'})).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.sm-json')).toContainText('document');
});

test('the snake controls do not capture keyboard events from the rest of the page', async ({page}) => {
  await page.goto('/lab/snake/');
  const preventedOnWindow = await page.evaluate(() => {
    const event = new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true, cancelable: true});
    window.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(preventedOnWindow).toBe(false);
  await page.locator('.snake-game').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.snake-status')).toContainText('保持移動');
});

test('astro compare rejects unsupported image formats', async ({page}) => {
  await page.goto('/lab/astro-compare/');
  await page.locator('.astro-file-controls input').first().setInputFiles({
    name: 'unsupported.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>')
  });
  await expect(page.locator('.astro-error')).toContainText('JPEG');
});

test('StructMark editor imports a local UTF-8 .sm document', async ({page}) => {
  await page.goto('/lab/structmark/');
  await page.getByLabel('匯入本機 StructMark 文件').setInputFiles({
    name: 'local.sm',
    mimeType: 'text/plain',
    buffer: Buffer.from('#1 Local\n\n*[strong]', 'utf8')
  });
  await expect(page.getByRole('textbox', {name: 'StructMark 來源文字'})).toHaveValue('#1 Local\n\n*[strong]');
  await expect(page.locator('.sm-preview strong')).toHaveText('strong');
});

test('StructMark editor rejects unsupported file extensions', async ({page}) => {
  await page.goto('/lab/structmark/');
  await page.getByLabel('匯入本機 StructMark 文件').setInputFiles({
    name: 'notes.md', mimeType: 'text/plain', buffer: Buffer.from('#1 Invalid', 'utf8')
  });
  await expect(page.locator('.sm-file-error')).toContainText('.sm');
});

test('music player shows an error when YouTube API cannot load', async ({page}) => {
  await page.route('**/iframe_api', route => route.abort());
  await page.goto('/');
  await page.locator('#play').click();
  await expect(page.locator('.player-error')).toBeVisible({timeout: 20_000});
});

// ── V6.3.4：Works 新作品、三語詳情與真實站外連結 ──
test('Works lists all nine projects with readable groups and source links', async ({page}) => {
  await page.goto('/zh-TW/projects/');
  await expect(page.locator('.page-project')).toHaveCount(9);
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
    await expect(page.locator('.page-project')).toHaveCount(9);
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
test('pearl cannon shows actual calculated candidates and validates single-side charges', async ({page}) => {
  await page.goto('/lab/pearl-cannon/');
  await expect(page.locator('.pearl-result')).not.toHaveCount(0);
  await expect(page.locator('.pearl-result em').first()).toContainText('預測 Y');
  await expect(page.locator('.pearl-disclaimer')).toContainText('尚未模擬地形');
  await page.getByLabel('單側最大當量（1–160）').fill('161');
  await expect(page.getByText('請輸入有效數字；單側當量須為 1 到 160 的整數。')).toBeVisible();
});
