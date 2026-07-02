/*
js/main.js

Modification():

- Changed initCursorTrail() 改回 initCustomCursor()，
          對應 animation.js 的 canvas 縮圖游標方案
- Changed applySiteMeta：分頁標題移除 subtitle 前置的 ‧ 裝飾符

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
  subtitle 前置的「‧ 」是 Hero 視覺裝飾符，
  在瀏覽器分頁標題中不適合出現，以正規表達式移除。
  例：「‧ Student」→ 標題「Miki | Student」。
*/
function applySiteMeta(site) {
  const cleanSubtitle = (site.subtitle ?? '').replace(/^[‧·\s]+/, '').trim();
  document.title = `${site.name} | ${cleanSubtitle}`;

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
