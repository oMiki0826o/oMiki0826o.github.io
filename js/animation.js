/*
js/animation.js

Modification():

- Fixed   上一輪重寫游標邏輯時，誤把整個檔案內容整份取代成只剩
        游標相關程式碼，遺漏了原本同樣定義在這個檔案裡的
        initFireflyField／initNavAutoHide／initScrollReveal 三個
        函式。main.js 會在 DOMContentLoaded 時依序同步呼叫
        initFireflyField() → initCustomCursor() → initNavAutoHide()
        → bootstrap()，其中排最前面的 initFireflyField 變成未定義
        函式，呼叫當下立刻拋出 ReferenceError；由於這四行寫在同一個
        回呼函式裡、彼此是同步依序執行，前面一行拋出例外就會讓
        「同一個回呼裡排在後面的所有程式碼」都沒有機會執行，
        包含負責抓資料、渲染整個頁面內容的 bootstrap()。
        這就是「網頁顯示不出東西」的真正原因：不是資料抓取失敗，
        而是連開始抓資料的那一步都還沒執行到就已經中斷。
        這次補回三個函式，並在 main.js 那端加上一層防護（見該檔
        Modification 說明），避免同一類問題未來重演時再次癱瘓全頁。
- Kept   initCustomCursor 維持上一版「跟隨滑鼠的圖片疊加層」方案

Description:

集中管理全站視覺動效，所有 init* 函式均為冪等，可安全地在每頁重複呼叫，
也都對「找不到目標容器」的情況做了防呆（找不到就直接 return，不拋錯）。
*/

const CURSOR_URL = 'https://upload-os-bbs.hoyolab.com/upload/2024/06/19/d4702c1b4bd1cf573db80b66d8c187a2_8759798806922987889.png';

// 外部圖床失效時的備援游標：直接寫成資料網址的 SVG，不發出任何網路
// 請求，一定能顯示。造型是一顆呼應「螢」主題的簡單光點，顏色取自
// variables.css 的金橘與薄荷青，即使退回備援也維持一致的視覺語彙。
const CURSOR_FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="7" fill="#e49825"/>
      <circle cx="18" cy="18" r="13" fill="none" stroke="#28bd8c" stroke-width="2" opacity="0.55"/>
    </svg>
  `);

// 判斷「滑鼠是否移到某個可互動元素上」共用的選擇器，
// 疊加層放大／發光的回饋範圍要跟實際可點擊的元素範圍一致。
const INTERACTIVE_SELECTOR = 'a, button, input, label, [role="button"], .pill, .icon-btn';

// ── 螢火蟲粒子背景 ────────────────────────────────────────
/**
 * 在 [data-firefly-field] 容器內產生一批 .firefly 元素。
 * 每顆粒子的起始位置、動畫延遲、時長、飄移距離都隨機決定，
 * 讓整體效果自然、不規律，而不是機械式的整齊排列；
 * 實際的顏色、發光、飄移動畫皆交給 animation.css 的
 * .firefly／@keyframes firefly-drift 定義，這裡只負責產生元素
 * 與決定每顆的隨機參數。
 */
function initFireflyField() {
  const field = document.querySelector('[data-firefly-field]');
  if (!field || field.children.length > 0) return; // 找不到容器或已初始化過

  const FIREFLY_COUNT = 22;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const firefly = document.createElement('span');
    firefly.className = 'firefly';

    const leftPercent = Math.random() * 100;                    // 0% ~ 100%
    const delay       = (Math.random() * 8).toFixed(2);         // 0s ~ 8s
    const duration    = (6 + Math.random() * 6).toFixed(2);     // 6s ~ 12s
    const driftX      = Math.round((Math.random() - 0.5) * 120); // -60px ~ 60px

    firefly.style.left              = `${leftPercent}%`;
    firefly.style.bottom            = '0';
    firefly.style.animationDelay    = `${delay}s`;
    firefly.style.animationDuration = `${duration}s`;
    firefly.style.setProperty('--drift-x', `${driftX}px`);

    fragment.appendChild(firefly);
  }

  field.appendChild(fragment);
}

// ── 導覽列捲動自動隱藏 ────────────────────────────────────
/**
 * 向下捲動且超過門檻距離時隱藏導覽列，向上捲動或回到接近頂部時顯示。
 * 用 requestAnimationFrame 節流 scroll 事件，避免每個像素的捲動
 * 都觸發一次樣式讀寫而掉幀。
 */
function initNavAutoHide() {
  const nav = document.querySelector('[data-site-nav]');
  if (!nav) return;

  const HIDE_THRESHOLD = 80; // 低於這個捲動距離一律顯示，避免在頂部附近閃爍
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateVisibility = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= HIDE_THRESHOLD || currentScrollY < lastScrollY) {
      nav.classList.remove('is-hidden'); // 回到頂部附近，或正在向上捲動
    } else {
      nav.classList.add('is-hidden');    // 向下捲動且已超過門檻
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateVisibility);
  });
}

// ── 捲動淡入 ──────────────────────────────────────────────
/**
 * 對所有 [data-reveal] 元素套用「進入可視範圍即淡入」效果，一次性揭露：
 * 進場後立即取消觀察，之後往回捲動不會讓內容反覆消失又出現。
 *
 * 呼叫時機很重要：main.js 的 bootstrap() 會在動態內容（專案卡片、
 * 文章卡片等同樣帶有 data-reveal 的元素）都渲染完成後才呼叫這個
 * 函式，確保這裡查詢得到的是「渲染後的完整清單」，而不是只有
 * 首次載入 HTML 時就存在的靜態元素。
 */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

// ── 自訂游標（跟隨滑鼠的圖片疊加層）───────────────────────
/*
  原生 CSS cursor: url() 對這張素材不可靠：瀏覽器對「原生游標圖片」
  通常有嚴格的尺寸上限（多數超過 128px 見方就整個忽略，退回預設
  箭頭），而想用 canvas 縮圖又需要圖床開放跨來源像素讀取（CORS），
  一般圖床預設不會給這個權限。這裡改用一般 <img> 顯示圖片（單純
  顯示圖片不需要 CORS），尺寸交給 CSS 控制，徹底繞開這兩個限制。

  為了不重新做出「游標在按鈕邊緣閃動」的舊問題：
    a. 只有圖片真的載入成功後，才把原生游標設為 none（一次性
       加上 class，不隨 hover 狀態切換）
    b. 疊加層永遠 pointer-events: none，不影響任何元素的真實
       hover／click 判定
    c. 「靠近可互動元素放大」用委派監聽切換一個 class 完成，
       不去動 cursor 屬性本身，避免兩種游標定義互相搶用

  疊加層位置改用 CSS 變數（--cursor-x／--cursor-y）驅動 transform：
  JS 只負責每一幀更新兩個數值，實際的 transform 定義留在 CSS，
  職責分離也避免每一幀都要重新組字串。
*/
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (document.querySelector('.custom-cursor')) return; // 避免重複初始化

  // 外層只負責定位，內層 __img 只負責大小與 hover 回饋，
  // 兩者職責分開才不會有兩個地方同時改寫 transform 而互相覆蓋。
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-cursor';

  const img = document.createElement('img');
  img.className = 'custom-cursor__img';
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  wrapper.appendChild(img);

  // 圖片真正載入成功後才隱藏原生游標並開始追蹤滑鼠；
  // 在這之前使用者會持續看到瀏覽器預設箭頭，不會有「疊加層已經
  // 蓋住原生游標、但圖片還沒出現」的空窗期或破圖畫面。
  img.onload = () => {
    document.body.appendChild(wrapper);
    document.documentElement.classList.add('custom-cursor-active');
    trackMouse(wrapper);
  };

  // 外部圖床若失效（斷線、圖片被移除等），改用內嵌 SVG 備援圖示
  // ——SVG 直接寫在程式碼裡，不依賴任何網路請求，一定能顯示。
  // 只失敗一次就切換備援，避免無限重試造成 onerror 迴圈。
  img.onerror = () => {
    if (img.dataset.usedFallback) return;
    img.dataset.usedFallback = 'true';
    img.src = CURSOR_FALLBACK_SVG;
  };

  img.src = CURSOR_URL;
}

/** 疊加層掛載成功後才開始的滑鼠追蹤邏輯，抽成獨立函式避免 initCustomCursor 過長。 */
function trackMouse(wrapper) {
  let rafId = null;

  const applyPosition = (x, y) => {
    wrapper.style.setProperty('--cursor-x', `${x}px`);
    wrapper.style.setProperty('--cursor-y', `${y}px`);
    rafId = null;
  };

  window.addEventListener('mousemove', (event) => {
    wrapper.classList.add('is-active');
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => applyPosition(event.clientX, event.clientY));
  });

  // 滑鼠離開視窗（例如移到瀏覽器工具列）時淡出，
  // 避免疊加層停在畫面邊緣看起來像卡住。
  document.addEventListener('mouseleave', () => wrapper.classList.remove('is-active'));
  document.addEventListener('mouseenter', () => wrapper.classList.add('is-active'));

  // 用委派監聽（掛在 document 上）判斷目前是否位於可互動元素，
  // 不需要對每個按鈕各自綁定事件，新增的按鈕也會自動適用。
  document.addEventListener('mouseover', (event) => {
    const isInteractive = Boolean(event.target.closest(INTERACTIVE_SELECTOR));
    wrapper.classList.toggle('is-interactive', isInteractive);
  });
}
