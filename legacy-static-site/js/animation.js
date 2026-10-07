/*
js/animation.js

Modification():

- Removed initCustomCursor 與相關的 trackMouse／CURSOR_URL／
        CURSOR_FALLBACK_SVG／INTERACTIVE_SELECTOR。游標圖片改為本地
        資產（assets/cursor.png）後，純 CSS 的 cursor: url() 就能
        穩定運作（見 animation.css），不再需要 JS 建立疊加層、
        追蹤滑鼠座標、或處理圖片載入失敗的備援邏輯——這些程式碼
        存在的理由（外部圖床的尺寸限制與可能的防盜連問題）已經
        隨著改用本地檔案而消失，繼續留著會違反「不產生未使用的
        程式碼」原則，予以刪除。
- Kept   initFireflyField／initNavAutoHide／initScrollReveal 三個
        函式不變（上一輪修復的重點就是這三個函式被誤刪，這次沒有
        再次觸碰它們）。

Description:

集中管理全站視覺動效，所有 init* 函式均為冪等，可安全地在每頁重複呼叫，
也都對「找不到目標容器」的情況做了防呆（找不到就直接 return，不拋錯）。
*/

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
