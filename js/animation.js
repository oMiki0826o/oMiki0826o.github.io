/**
 * js/animation.js
 *
 * Modification():
 *
 * - Removed initCustomCursor（SVG 愛心主游標 + cursor:none 方案）
 *           游標圖片已改由 animation.css 的 cursor:url() 原生設定，
 *           不再需要 JS 元素模擬
 * - Added   initCursorTrail：橘紅色拖尾光點效果，以多個 .cursor-trail
 *           元素依階梯延遲跟隨游標，製造如流星尾跡的視覺效果
 * - Changed initFireflyField 光點數量由 22 降至 20，顏色改為流螢橘紅配色
 *
 * Description:
 *
 * 集中管理全站視覺動效。所有公開函式（init*）均為冪等，
 * 重複呼叫不會疊加副作用，可安全地在每個頁面各呼叫一次。
 *
 * 游標方案設計說明（為何移除 cursor:none + JS 元素）：
 *   原方案在 CSS 對所有互動元素設 cursor:none，再用 JS 建立一個 SVG
 *   心形元素跟著滑鼠移動。問題出在「停在按鈕邊緣」這個瞬間：瀏覽器
 *   會在 cursor:none（body）與 cursor:pointer（button）之間快速切換，
 *   導致游標圖示瘋狂閃爍。新方案直接用 CSS cursor:url() 設定圖片，
 *   讓瀏覽器原生處理游標，JS 只負責拖尾粒子效果，閃動問題從根本消除。
 */

// ── 游標拖尾光點 ─────────────────────────────────────────
/**
 * 建立一組橘紅色漸縮光點跟隨游標，製造流星尾跡效果。
 * 僅在有精確指標裝置（滑鼠）時啟用，觸控裝置不啟動。
 *
 * 實作原理：
 *   建立 TRAIL_COUNT 個 .cursor-trail div，每個都記錄自己的位置。
 *   第 0 個直接對齊滑鼠座標，第 i 個以 lerp 插值追蹤第 i-1 個，
 *   lerp factor 越小延遲越明顯，製造出拖曳消逝的尾跡感。
 */
function initCursorTrail() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const TRAIL_COUNT = 7; // 光點數量，數字越大尾跡越長（對應記憶體用量也越高）
  const trails      = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'cursor-trail';
    // 越靠後的光點越小、越透明，製造漸淡消逝感
    const size    = Math.max(3, 10 - i * 1.1);
    const opacity = Math.max(0.06, 0.55 - i * 0.07);
    el.style.width      = `${size}px`;
    el.style.height     = `${size}px`;
    el.style.background = `rgba(232, 100, 60, ${opacity})`;
    document.body.appendChild(el);
    trails.push({ el, x: 0, y: 0 });
  }

  let mouseX = 0;
  let mouseY = 0;

  // pointermove 比 mousemove 更廣泛地支援觸控板精確移動
  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    // 第一個光點直接貼齊滑鼠
    trails[0].x = mouseX;
    trails[0].y = mouseY;

    // 後續光點用線性插值（lerp）追蹤前一個，製造延遲拖曳感
    for (let i = 1; i < trails.length; i++) {
      trails[i].x += (trails[i - 1].x - trails[i].x) * 0.28;
      trails[i].y += (trails[i - 1].y - trails[i].y) * 0.28;
    }

    trails.forEach((t) => {
      t.el.style.left = `${t.x}px`;
      t.el.style.top  = `${t.y}px`;
    });

    requestAnimationFrame(tick);
  }
  tick();
}

// ── 捲動淡入進場動畫 ─────────────────────────────────────
/**
 * 使用 IntersectionObserver 監聽帶有 [data-reveal] 屬性的元素，
 * 進入視窗後加上 .is-visible 觸發 CSS transition 淡入效果。
 * 每個元素只觸發一次後即停止觀察，節省效能。
 */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 觸發一次後停止觀察，節省效能
      });
    },
    { threshold: 0.12 } // 元素進入視窗 12% 時觸發，稍早顯示讓體驗更流暢
  );

  targets.forEach((el) => observer.observe(el));
}

// ── 導覽列自動隱藏 ───────────────────────────────────────
/**
 * 向下捲動時對 [data-site-nav] 元素加上 .is-hidden class，
 * 向上捲動時移除，讓使用者隨時能回頭使用導覽列。
 * 80px 的啟動閾值避免頁面頂部的輕微抖動誤觸發。
 */
function initNavAutoHide() {
  const nav = document.querySelector('[data-site-nav]');
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener(
    'scroll',
    () => {
      const y           = window.scrollY;
      const scrollingDown = y > lastScrollY && y > 80;
      nav.classList.toggle('is-hidden', scrollingDown);
      lastScrollY = y;
    },
    { passive: true } // passive:true 讓瀏覽器可以提前優化捲動效能
  );
}

// ── 背景螢火蟲粒子 ──────────────────────────────────────
/**
 * 在 [data-firefly-field] 容器中動態生成緩慢向上飄浮的光點。
 * 每個光點的位置、偏移量、動畫時長皆隨機，避免同步閃爍。
 *
 * @param {number} count 生成的粒子數量（預設 20）
 */
function initFireflyField(count = 20) {
  const field = document.querySelector('[data-firefly-field]');
  if (!field) return;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'firefly';
    dot.style.left   = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 40}%`;
    // X 軸漂移量正負各半，讓粒子往左右兩側飄散而不是都往同一方向
    dot.style.setProperty('--drift-x', `${Math.random() * 80 - 40}px`);
    // 時長與延遲隨機化，避免所有粒子同步閃爍看起來像 loading 動畫
    dot.style.animationDuration = `${9 + Math.random() * 10}s`;
    dot.style.animationDelay   = `${Math.random() * 12}s`;
    field.appendChild(dot);
  }
}
