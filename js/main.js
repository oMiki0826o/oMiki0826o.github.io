/**
 * js/main.js
 *
 * Modification():
 *
 * - Changed initCustomCursor() 改為 initCursorTrail()，
 *   對應 animation.js 中移除舊游標方案後的新函式名稱
 * - Changed applySiteMeta：瀏覽器分頁標題中移除 subtitle 的前置「‧ 」
 *   裝飾符（如「‧ Student」→ 標題顯示「Miki | Student」）
 * - Removed bootstrapOptionalSections 中的 [data-skills] 分支，
 *   about.html 已移除 Skills 區塊，對應的偵測邏輯也一併刪除
 *
 * Description:
 *
 * 全站共用的初始化腳本，於 index.html 與 pages/*.html 均有載入。
 * 透過偵測頁面中是否存在對應的 data-* 容器，動態決定要載入哪些 JSON
 * 並執行哪些渲染函式，新增頁面時無需修改本檔案。
 */

const CONFIG_BASE = '/config';

document.addEventListener('DOMContentLoaded', () => {
  initFireflyField();
  initCursorTrail();  // 改為新方案：游標圖片由 CSS 管理，JS 只做拖尾粒子
  initNavAutoHide();
  bootstrap();
});

// ── 全站初始化 ────────────────────────────────────────────
/**
 * 並行載入所有頁面共用的 JSON 資料，渲染各區塊後啟動捲動動畫。
 * 在此之後才呼叫 initScrollReveal，確保所有 [data-reveal] 節點
 * 都已插入 DOM，觀察器不會漏掉尚未渲染的元素。
 */
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

  // 所有動態內容已注入 DOM，再啟動 IntersectionObserver
  initScrollReveal();
}

/**
 * 載入只在特定頁面存在的區塊。
 * 先以 querySelector 確認容器存在再發請求，避免不必要的網路流量。
 */
async function bootstrapOptionalSections() {
  const tasks = [];

  // 音樂播放器（只在 index.html 有 [data-player]）
  if (document.querySelector('[data-player]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/music.json`).then((playlist) => {
        if (playlist?.length) {
          new MusicPlayer(document.querySelector('[data-player]'), playlist);
        }
      })
    );
  }

  // 專案卡片格（首頁預覽 + projects.html 完整頁共用同一個選擇器）
  if (document.querySelector('[data-project-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/projects.json`).then((data) => {
        renderGrid('[data-project-grid]', data, 'project');
      })
    );
  }

  // 文章卡片格
  if (document.querySelector('[data-article-grid]')) {
    tasks.push(
      fetchJSON(`${CONFIG_BASE}/articles.json`).then((data) => {
        renderGrid('[data-article-grid]', data, 'article');
      })
    );
  }

  // 時間軸（首頁預覽 + timeline.html 完整頁）
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

// ── Meta 資訊 ─────────────────────────────────────────────
/**
 * 設定瀏覽器分頁標題、Favicon 與 Hero 頭像。
 *
 * subtitle 前置的「‧ 」是 Hero 區域的視覺裝飾符，
 * 在瀏覽器分頁標題中不適合出現，因此這裡以正規表達式移除。
 * 例：「‧ Student」→ 標題顯示「Miki | Student」。
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
/** 填入 Hero 區的姓名、副標與簽名文字。 */
function renderHeroText(site) {
  const nameEl      = document.querySelector('[data-hero-name]');
  const subtitleEl  = document.querySelector('[data-hero-subtitle]');
  const signatureEl = document.querySelector('[data-hero-signature]');

  if (nameEl)      nameEl.textContent      = site.name;
  if (subtitleEl)  subtitleEl.textContent  = site.subtitle;
  if (signatureEl) signatureEl.textContent = site.signature;
}
