/*
js/main.js

Modification():

- Changed applySiteMeta：分頁標題改讀取 site.siteTitle（網站品牌名稱）
        而非組合 name + subtitle，與 Hero 顯示用的個人名稱脫鉤
- Changed initCursorTrail() 改回 initCustomCursor()，
          對應 animation.js 的 canvas 縮圖游標方案

Description:

全站共用初始化腳本，首頁與子頁均載入此檔。
以 data-* 容器是否存在判斷應載入哪些 JSON，新增頁面無需修改本檔。
*/

const CONFIG_BASE = '/config';

document.addEventListener('DOMContentLoaded', () => {
  initFireflyField();
  initCustomCursor();
  initNavAutoHide();
  bootstrap();
});

// ── 全站初始化 ────────────────────────────────────────────
async function bootstrap() {
  const [site, links, quotes] = await Promise.all([
    fetchJSON(`${CONFIG_BASE}/site.json`),
    fetchJSON(`${CONFIG_BASE}/links.json`),
    fetchJSON(`${CONFIG_BASE}/quotes.json`),
  ]);

  if (site) {
    applySiteMeta(site);
    renderHeroText(site);
    renderFeaturedCard(site);
    renderAboutPreview(site);
    renderAboutFull(site);
    renderFooter(site);
  }

  if (links) {
    renderNav(links.nav, site?.avatar);
    renderSocial(links.social);
    renderQuickLinks(links.quickLinks);
  }

  if (quotes) renderQuote(quotes);

  await bootstrapOptionalSections();
  initScrollReveal();
}

async function bootstrapOptionalSections() {
  const tasks = [];

  if (document.querySelector('[data-player]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/music.json`).then((playlist) => {
        if (playlist?.length)
          new MusicPlayer(document.querySelector('[data-player]'), playlist);
      })
    );
  }

  if (document.querySelector('[data-project-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/projects.json`).then((data) =>
        renderGrid('[data-project-grid]', data, 'project')
      )
    );
  }

  if (document.querySelector('[data-article-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/articles.json`).then((data) =>
        renderGrid('[data-article-grid]', data, 'article')
      )
    );
  }

  if (
    document.querySelector('[data-timeline-preview]') ||
    document.querySelector('[data-timeline-full]')
  ) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/timeline.json`).then((data) => {
        renderTimelinePreview(data);
        renderTimelineFull(data);
      })
    );
  }

  await Promise.all(tasks);
}

// ── Meta ──────────────────────────────────────────────────
/*
  siteTitle 是「網站品牌名稱」（分頁標題／OG site_name 用），
  name 則是「個人名稱」（Hero 大字、頁尾署名用），兩者刻意分開：
  若共用同一個欄位，改網站名稱時 Hero 也會被迫顯示「Miki's web」，
  但 Hero 想呈現的是人名本身，不是網站品牌。
*/
function applySiteMeta(site) {
  document.title = site.siteTitle ?? site.name ?? '';

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && site.favicon) favicon.href = site.favicon;

  document.querySelectorAll('[data-hero-avatar]').forEach((el) => {
    el.src = site.avatar;
    el.alt = `${site.name} 頭像`;
  });
}

// ── Hero 文字 ─────────────────────────────────────────────
function renderHeroText(site) {
  const set = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  };
  set('[data-hero-name]',      site.name);
  set('[data-hero-subtitle]',  site.subtitle);
  set('[data-hero-signature]', site.signature);
}
