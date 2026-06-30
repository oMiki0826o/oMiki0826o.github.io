/**
 * js/main.js
 *
 * Modification():
 *
 * - Added 全站初始化邏輯：載入 JSON、渲染各區塊、啟動互動動效
 *
 * Description:
 *
 * 單一入口腳本，於 index.html 與 pages/*.html 共用。透過偵測頁面中
 * 是否存在對應的 data-* 容器，決定要載入並渲染哪些區塊，
 * 新增頁面時無需修改本檔案。
 */

const CONFIG_BASE = '/config';

document.addEventListener('DOMContentLoaded', () => {
  initFireflyField();
  initCustomCursor();
  initNavAutoHide();
  bootstrap();
});

async function bootstrap() {
  const [site, links, quotes] = await Promise.all([
    fetchJSON(`${CONFIG_BASE}/site.json`),
    fetchJSON(`${CONFIG_BASE}/links.json`),
    fetchJSON(`${CONFIG_BASE}/quotes.json`),
  ]);

  if (site) {
    applySiteMeta(site);
    renderFeaturedCard(site);
    renderAboutPreview(site);
    renderAboutFull(site);
    renderFooter(site);
    renderHeroText(site);
  }

  if (links) {
    renderNav(links.nav, site?.avatar);
    renderSocial(links.social);
    renderQuickLinks(links.quickLinks);
  }

  if (quotes) {
    renderQuote(quotes);
  }

  await bootstrapOptionalSections();

  // 等所有區塊渲染完成、data-reveal 節點都已存在 DOM 後才啟動觀察器。
  initScrollReveal();
}

/** 載入並渲染只在特定頁面才存在的區塊，避免不必要的請求。 */
async function bootstrapOptionalSections() {
  const tasks = [];

  if (document.querySelector('[data-player]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/music.json`).then((playlist) => {
        if (playlist?.length) {
          new MusicPlayer(document.querySelector('[data-player]'), playlist);
        }
      })
    );
  }

  if (document.querySelector('[data-project-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/projects.json`).then((data) => {
        renderGrid('[data-project-grid]', data, 'project');
      })
    );
  }

  if (document.querySelector('[data-article-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/articles.json`).then((data) => {
        renderGrid('[data-article-grid]', data, 'article');
      })
    );
  }

  if (document.querySelector('[data-timeline-preview]') || document.querySelector('[data-timeline-full]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/timeline.json`).then((data) => {
        renderTimelinePreview(data);
        renderTimelineFull(data);
      })
    );
  }

  if (document.querySelector('[data-skills]')) {
    tasks.push(fetchJSON(`${CONFIG_BASE}/skills.json`).then(renderSkills));
  }

  await Promise.all(tasks);
}

/** 套用網站標題、Favicon 等全站 meta 資訊。 */
function applySiteMeta(site) {
  document.title = `${site.name} | ${site.subtitle}`;

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && site.favicon) favicon.href = site.favicon;

  const avatarEls = document.querySelectorAll('[data-hero-avatar]');
  avatarEls.forEach((el) => {
    el.src = site.avatar;
    el.alt = `${site.name} 頭像`;
  });
}

/** 渲染 Hero 區塊中的姓名、副標與簽名/留言板文字。 */
function renderHeroText(site) {
  const nameEl = document.querySelector('[data-hero-name]');
  const subtitleEl = document.querySelector('[data-hero-subtitle]');
  const signatureEl = document.querySelector('[data-hero-signature]');

  if (nameEl) nameEl.textContent = site.name;
  if (subtitleEl) subtitleEl.textContent = site.subtitle;
  if (signatureEl) signatureEl.textContent = site.signature;
}
