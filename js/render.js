/**
 * js/render.js
 *
 * Modification():
 *
 * - Added   renderNav 品牌頭像、renderMiniCard 縮圖補上對應 CSS
 *   實際顯示尺寸的 width/height 屬性與 decoding="async"，避免圖片
 *   載入完成前造成版面跳動（CLS），解碼也不佔用主執行緒。
 * - Changed renderFeaturedCard：輸出結構新增 .card--featured__frame／
 *   __sheen 兩層，對應 components.css 的水晶玻璃描邊與反光掃過效果
 * - Added   updateLastUpdatedFromRepo：向 GitHub API 查詢真實最後
 *   commit 時間，取代原本寫死在 site.json 的日期字串；renderFooter
 *   會先用 fallback 日期完成首次渲染，取得真實日期後才覆寫該欄位
 * - Changed renderAboutPreview：移除 tag-row（技能標籤列），
 *   首頁 About 卡片現在只顯示問候語、描述文字與 Read More 連結
 * - Changed renderMiniCard：由「16:9 封面大圖 + 文字」改為
 *   「72×72 左側縮圖（選填）+ 右側文字」的水平緊湊版式；
 *   若無封面圖則縮圖不渲染，文字區塊自動填滿全寬
 * - Changed renderFooter：使用 busuanzi 服務取得真實瀏覽量與訪客數；
 *   在 footer DOM 建立後才動態注入 busuanzi 腳本，確保 ID 已存在
 * - Removed renderSkills：about.html 已移除 Skills 區塊，
 *   此函式已無對應的 DOM 容器，依「不產生未使用的程式碼」原則刪除
 *
 * Description:
 *
 * 將「資料 → HTML」的轉換邏輯集中於此，main.js 與各子頁僅需呼叫
 * 對應函式並傳入容器與資料，不需重複撰寫樣板字串。
 * 所有字串輸出皆先過 escapeHTML，避免資料中的符號破壞 DOM 結構。
 */

// ── 工具 ──────────────────────────────────────────────────
/**
 * 以 DOM 的 textContent 機制安全地將純文字轉為 HTML 字串。
 * 防止資料中的 <、>、& 等字元被瀏覽器解讀為標記。
 * @param {string|null|undefined} text
 * @returns {string}
 */
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

// ── 導覽列 ────────────────────────────────────────────────
/**
 * 渲染頂部導覽列的品牌頭像與頁面連結。
 * @param {Array}   navItems      links.json 中的 nav 陣列
 * @param {string}  brandAvatarUrl  site.json 的 avatar 欄位
 */
function renderNav(navItems, brandAvatarUrl) {
  const brandEl = document.querySelector('[data-nav-brand]');
  const linksEl = document.querySelector('[data-nav-links]');

  if (brandEl && brandAvatarUrl) {
    // width/height 對應 components.css 中 .site-nav__brand img 的實際
    // 顯示尺寸（34×34），避免圖片載入前導覽列版面跳動。
    brandEl.innerHTML =
      `<img src="${escapeHTML(brandAvatarUrl)}" alt="Miki 頭像" width="34" height="34" decoding="async">`;
  }

  if (!linksEl || !navItems) return;
  linksEl.innerHTML = navItems
    .map((item) => `<a href="${escapeHTML(item.url)}">${escapeHTML(item.label)}</a>`)
    .join('');
}

// ── 社群圖示 ──────────────────────────────────────────────
/** 渲染社群連結圖示列。 */
function renderSocial(socialItems) {
  const el = document.querySelector('[data-social-row]');
  if (!el || !socialItems) return;
  el.innerHTML = socialItems
    .map(
      (item) =>
        `<a class="icon-btn" href="${escapeHTML(item.url)}" target="_blank" rel="noopener"
            aria-label="${escapeHTML(item.label)}">
           <i class="${escapeHTML(item.icon)}"></i>
         </a>`
    )
    .join('');
}

// ── 快速連結 ──────────────────────────────────────────────
/** 渲染 Hero 下方的膠囊按鈕列。 */
function renderQuickLinks(links) {
  const el = document.querySelector('[data-quick-links]');
  if (!el || !links) return;
  el.innerHTML = links
    .map(
      (item) =>
        `<a class="pill" href="${escapeHTML(item.url)}">
           <i class="${escapeHTML(item.icon)}"></i>
           <span>${escapeHTML(item.label)}</span>
         </a>`
    )
    .join('');
}

// ── 鎮樓圖 ────────────────────────────────────────────────
/**
 * 渲染首頁第一張大卡片（鎮樓圖）。
 * 圖片網址與版權標示皆來自 site.json 的 featuredImage / featuredCredit 欄位。
 */
function renderFeaturedCard(site) {
  const el = document.querySelector('[data-featured-card]');
  if (!el || !site) return;
  const credit = site.featuredCredit;

  // __frame 承載稜鏡描邊漸層，__sheen 是捲動進場時掃過一次的反光層，
  // 兩者搭配 components.css 的 .card--featured 規則做出水晶玻璃質感。
  el.innerHTML =
    `<div class="card--featured__frame">
       <img src="${escapeHTML(site.featuredImage)}" alt="鎮樓圖" loading="lazy" decoding="async">
       <div class="card--featured__sheen" aria-hidden="true"></div>
     </div>` +
    (credit
      ? `<div class="card--featured__credit">${escapeHTML(credit.label)}：
           <a href="${escapeHTML(credit.url)}" target="_blank" rel="noopener">
             ${escapeHTML(credit.name)}
           </a>
         </div>`
      : '');
}

// ── About 預覽（首頁卡片）─────────────────────────────────
/**
 * 渲染首頁的 About 摘要卡片。
 *
 * 與 renderAboutFull 的差異：
 * - 只顯示 description（短版描述）而非 fullBio（長版多段）
 * - 不顯示 tag-row 技能標籤（依需求移除）
 * - 末尾有 Read More 連結指向 about.html
 *
 * description 欄位可含 \n，CSS card__text 已設 white-space:pre-line
 * 使換行符自然折行，無需轉換為 <br>。
 */
function renderAboutPreview(site) {
  const el = document.querySelector('[data-about-preview]');
  if (!el || !site?.about) return;
  const { greeting, description, readMoreUrl } = site.about;

  el.innerHTML =
    `<h2 class="card__title">${escapeHTML(greeting)}</h2>
     <p class="card__text">${escapeHTML(description)}</p>
     <a class="card__link" href="${escapeHTML(readMoreUrl)}">
       Read More <i class="fa-solid fa-arrow-right"></i>
     </a>`;
}

// ── About 完整（about.html）──────────────────────────────
/**
 * 渲染 about.html 的完整自我介紹區塊。
 * fullBio 陣列中每個字串各自渲染為一個 <p>，tags 顯示為興趣標籤膠囊。
 */
function renderAboutFull(site) {
  const el = document.querySelector('[data-about-full]');
  if (!el || !site?.about) return;
  const { greeting, fullBio, tags } = site.about;

  el.innerHTML =
    `<h1 class="card__title" style="font-size:1.8rem">${escapeHTML(greeting)}</h1>
     ${(fullBio ?? []).map((p) => `<p class="card__text">${escapeHTML(p)}</p>`).join('')}
     <div class="tag-row">
       ${(tags ?? []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
     </div>`;
}

// ── Mini Card（專案 / 文章緊湊卡片）──────────────────────
/**
 * 將單筆資料渲染為水平緊湊卡片 HTML。
 *
 * 版式設計說明：
 *   左側 72×72 縮圖（若 item.cover 為空則省略，文字區塊自動填滿全寬）
 *   右側由上到下：標題 → Meta → 描述（最多 2 行）→ View 連結
 *   整體高度約 90-100px，與 About 卡片行距比例接近。
 *
 * @param {Object} item  projects.json 或 articles.json 的單筆物件
 * @param {'project'|'article'} type  用於判斷 meta 欄位格式
 * @returns {string}  HTML 字串
 */
function renderMiniCard(item, type) {
  // 專案顯示技術標籤；文章顯示發布日期
  const meta = type === 'project'
    ? (item.tags ?? []).join(' · ')
    : (item.date ?? '');

  // 有封面圖才渲染 img；否則略過，body 區塊自動 flex:1 填滿。
  // width/height 對應 components.css 中 .mini-card__thumb 的實際
  // 顯示尺寸（72×72），避免圖片載入前卡片版面跳動。
  const thumb = item.cover
    ? `<img class="mini-card__thumb"
            src="${escapeHTML(item.cover)}"
            alt="${escapeHTML(item.title)}"
            width="72" height="72"
            loading="lazy" decoding="async">`
    : '';

  const desc = item.description ?? item.excerpt ?? '';

  return `
    <a class="glass mini-card"
       href="${escapeHTML(item.url)}"
       target="_blank" rel="noopener"
       data-reveal>
      ${thumb}
      <div class="mini-card__body">
        <h3 class="mini-card__title">${escapeHTML(item.title)}</h3>
        ${meta ? `<span class="mini-card__meta">${escapeHTML(meta)}</span>` : ''}
        ${desc ? `<p class="mini-card__desc">${escapeHTML(desc)}</p>` : ''}
        <span class="card__link">View <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </a>`;
}

/**
 * 將陣列資料渲染至指定選擇器的 card-grid 容器。
 * @param {string}  selector  CSS 選擇器，對應 [data-project-grid] 或 [data-article-grid]
 * @param {Array}   items     projects.json 或 articles.json 的資料陣列
 * @param {string}  type      傳遞給 renderMiniCard 的類型字串
 */
function renderGrid(selector, items, type) {
  const el = document.querySelector(selector);
  if (!el || !items) return;
  el.innerHTML = items.map((item) => renderMiniCard(item, type)).join('');
}

// ── 時間軸 ────────────────────────────────────────────────
/**
 * 渲染首頁時間軸預覽（只顯示有 highlight:true 的項目）。
 * @param {Array}  items  timeline.json 陣列
 * @param {number} limit  最多顯示幾筆（預設 3）
 */
function renderTimelinePreview(items, limit = 3) {
  const el = document.querySelector('[data-timeline-preview]');
  if (!el || !items) return;
  const preview = items.filter((item) => item.highlight).slice(0, limit);
  el.innerHTML = preview.map(timelineItemHTML).join('');
}

/** 渲染 timeline.html 完整時間軸（所有項目）。 */
function renderTimelineFull(items) {
  const el = document.querySelector('[data-timeline-full]');
  if (!el || !items) return;
  el.innerHTML = items.map(timelineItemHTML).join('');
}

/**
 * 將單筆時間軸資料轉為 HTML 字串。
 * @param {Object} item  timeline.json 的單筆物件
 * @returns {string}
 */
function timelineItemHTML(item) {
  return `
    <li class="timeline-item" data-reveal>
      <span class="timeline-item__year">${escapeHTML(item.year)}</span>
      <h3 class="timeline-item__title">${escapeHTML(item.title)}</h3>
      <p class="timeline-item__desc">${escapeHTML(item.description)}</p>
    </li>`;
}

// ── 每日一句 ──────────────────────────────────────────────
/**
 * 從 quotes.json 陣列中隨機取一句，顯示在 [data-quote] 元素。
 * 每次重新整理頁面都會隨機抽取。
 */
function renderQuote(quoteData) {
  const el = document.querySelector('[data-quote]');
  if (!el || !quoteData?.quotes?.length) return;
  const quotes = quoteData.quotes;
  const pick   = quotes[Math.floor(Math.random() * quotes.length)];
  el.textContent = `「${pick}」`;
}

// ── Footer 與 busuanzi 真實統計 ───────────────────────────
/**
 * 渲染頁尾版權資訊與統計數字。
 *
 * busuanzi 整合說明：
 *   busuanzi 腳本會自動搜尋 DOM 中 id 為 busuanzi_value_site_pv（瀏覽量）
 *   與 busuanzi_value_site_uv（訪客數）的元素並填入真實數字。
 *   必須先建立這兩個元素、插入 DOM，才能注入腳本，
 *   否則腳本找不到目標 ID 而無法更新。
 *   因此這裡在 innerHTML 賦值完成後才動態建立 <script> 標籤。
 */
function renderFooter(site) {
  const el = document.querySelector('[data-footer]');
  if (!el || !site?.footer) return;

  const { year, owner, poweredBy, hosting } = site.footer;
  // site.json 裡的 stats.lastUpdated 只作為「查無網路時」的備援顯示值；
  // 真正的日期由下方 updateLastUpdatedFromRepo() 向 GitHub 取得後覆寫。
  const fallbackUpdated = site.stats?.lastUpdated ?? '—';

  el.innerHTML = `
    <p>${escapeHTML(year)} ${escapeHTML(owner)}</p>
    <p>Powered by ${poweredBy.map(escapeHTML).join(' / ')}</p>
    <p>${escapeHTML(hosting)}</p>
    <div class="site-footer__stats">
      <span>
        <i class="fa-regular fa-eye"></i>
        Views <span id="busuanzi_value_site_pv">—</span>
      </span>
      <span>
        <i class="fa-regular fa-user"></i>
        Visitors <span id="busuanzi_value_site_uv">—</span>
      </span>
      <span>
        <i class="fa-regular fa-calendar-days"></i>
        <span data-last-updated>${escapeHTML(fallbackUpdated)}</span>
      </span>
    </div>`;

  // DOM 已就位，注入 busuanzi 腳本。
  // 用 id 防止多個頁面（如子頁返回首頁）重複注入。
  if (!document.getElementById('busuanzi-script')) {
    const s = document.createElement('script');
    s.id    = 'busuanzi-script';
    s.src   = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    s.async = true;
    document.body.appendChild(s);
  }

  if (site.repo) {
    updateLastUpdatedFromRepo(site.repo, el.querySelector('[data-last-updated]'));
  }
}

/**
 * 向 GitHub 公開 REST API 查詢 repo 最新一次 commit 的時間，
 * 取代 site.json 裡手動維護、容易過期的 stats.lastUpdated 字串。
 *
 * 失敗時（離線、未具名請求的 API 額度用盡等）刻意吞掉錯誤並保留
 * fallback 日期，因為「最後更新時間顯示不夠即時」不該讓整個頁尾壞掉。
 *
 * @param {string} repo  "擁有者/儲存庫名稱"，來自 site.json 的 repo 欄位
 * @param {HTMLElement|null} targetEl  要覆寫文字的 <span data-last-updated>
 */
async function updateLastUpdatedFromRepo(repo, targetEl) {
  if (!targetEl) return;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    if (!res.ok) return;
    const [latestCommit] = await res.json();
    const isoDate = latestCommit?.commit?.committer?.date;
    if (!isoDate) return;
    targetEl.textContent = isoDate.slice(0, 10); // "YYYY-MM-DDTHH:mm:ssZ" → "YYYY-MM-DD"
  } catch {
    // 網路異常或 API 額度用盡：保留頁尾已顯示的 fallback 日期即可
  }
}
