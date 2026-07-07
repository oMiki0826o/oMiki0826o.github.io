/*
js/main.js

Modification():

- Fixed   initCustomCursor 已隨 animation.js 的游標方案簡化而移除
        （改回純 CSS 原生 cursor: url() 搭配本地資產，見
        animation.css／variables.css），這裡移除對應的呼叫。
        這個問題原本會在呼叫未定義函式時拋出 ReferenceError，
        但上一輪已經幫這三個裝飾性初始化函式包上 safeRun，
        錯誤會被攔截並記錄在主控台，不會像更早之前那樣連帶讓
        bootstrap() 也無法執行——這正是當初加上 safeRun 的目的。
        即便如此，呼叫一個不存在的函式終究是應該修正的錯誤，
        不能只依賴防護機制掩蓋問題。
- Fixed   DOMContentLoaded 裡原本直接依序呼叫
        initFireflyField() / initCustomCursor() / initNavAutoHide()，
        三者與 bootstrap() 寫在同一個回呼、彼此同步依序執行。
        先前 animation.js 意外遺漏函式定義時，最前面那行呼叫一拋出
        ReferenceError，後面所有程式碼（包含 bootstrap()）就完全
        沒有機會執行，導致整頁只剩靜態 HTML 殼、看起來像完全沒有
        資料——這是實際發生過的真實事故，不是假設的邊界情況。
        這次幫這三個裝飾性動效函式各自包上 try/catch（見新增的
        safeRun），任何一個未來若再度出錯，都只會在主控台留下訊息，
        不會連帶癱瘓負責抓資料、渲染整頁內容的 bootstrap()。
- Added   bootstrap() 的 site／links／quotes 三大區塊各自包一層
        try/catch，任一區塊渲染失敗不會連帶讓其餘區塊也無法渲染。
- Fixed   bootstrapOptionalSections 改用 Promise.allSettled 取代
        Promise.all：後者只要其中一個任務 reject 就會讓整組 await
        直接 reject，連帶跳過 bootstrap() 最後一定要執行的
        initScrollReveal()，導致已經渲染出來的內容因為捲動淡入
        效果沒被觸發而停在 opacity:0、看起來像沒有內容一樣。
- Changed applySiteMeta：分頁標題改讀取 site.siteTitle（網站品牌名稱）
        而非組合 name + subtitle，與 Hero 顯示用的個人名稱脫鉤

Description:

全站共用初始化腳本，首頁與子頁均載入此檔。
以 data-* 容器是否存在判斷應載入哪些 JSON，新增頁面無需修改本檔。
*/

const CONFIG_BASE = '/config';

document.addEventListener('DOMContentLoaded', () => {
  // initFireflyField／initNavAutoHide 都只是裝飾性動效，任何一個
  // 實作若意外出錯，都不該連帶讓 bootstrap()（負責抓資料、渲染
  // 整個頁面）跟著無法執行；safeRun 讓彼此獨立、互不影響。
  safeRun(initFireflyField);
  safeRun(initNavAutoHide);
  bootstrap();
});

/**
 * 執行單一初始化函式，攔截並記錄同步拋出的例外，不讓錯誤往外擴散。
 * @param {() => void} fn 要執行的初始化函式
 */
function safeRun(fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[safeRun] ${fn.name} 執行時發生錯誤：`, error);
  }
}

// ── 全站初始化 ────────────────────────────────────────────
/*
  三大區塊（site／links／quotes）各自包一層 try/catch：
  例如 site.json 對應的幾個 render 函式其中一個意外出錯，
  也不該連帶讓 links.json、quotes.json 那兩塊完全沒有機會渲染。
  這跟上面 safeRun 的用意一致，只是這裡是非同步流程，
  用 try/catch 包區塊、而不是逐一包每個 render 函式，
  避免为了防禦性程式設計而讓程式碼變得瑣碎難讀。
*/
async function bootstrap() {
  const [site, links, quotes] = await Promise.all([
    fetchJSON(`${CONFIG_BASE}/site.json`),
    fetchJSON(`${CONFIG_BASE}/links.json`),
    fetchJSON(`${CONFIG_BASE}/quotes.json`),
  ]);

  if (site) {
    try {
      applySiteMeta(site);
      renderHeroText(site);
      renderFeaturedCard(site);
      renderAboutPreview(site);
      renderAboutFull(site);
      renderFooter(site);
    } catch (error) {
      console.error('[bootstrap] site 區塊渲染失敗：', error);
    }
  }

  if (links) {
    try {
      renderNav(links.nav, site?.avatar);
      renderSocial(links.social);
      renderQuickLinks(links.quickLinks);
    } catch (error) {
      console.error('[bootstrap] links 區塊渲染失敗：', error);
    }
  }

  if (quotes) {
    try {
      renderQuote(quotes);
    } catch (error) {
      console.error('[bootstrap] quotes 區塊渲染失敗：', error);
    }
  }

  await bootstrapOptionalSections();
  initScrollReveal();
}

/*
  用 Promise.allSettled 而非 Promise.all：這裡的四個任務彼此獨立
  （音樂播放器、專案、文章、歷程），只要其中一個的 fetch 或渲染
  出錯，不該讓整組 await 直接 reject——那樣會連帶跳過 bootstrap()
  裡緊接在後面、所有頁面都需要的 initScrollReveal()，導致已經
  渲染出來的內容因為捲動淡入效果沒被觸發而停在 opacity:0、
  看起來像沒有內容一樣。
*/
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

  const results = await Promise.allSettled(tasks);
  results
    .filter((result) => result.status === 'rejected')
    .forEach((result) => console.error('[bootstrapOptionalSections]', result.reason));
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
