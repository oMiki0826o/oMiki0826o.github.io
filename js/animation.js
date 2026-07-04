/*
js/animation.js

Modification():

- Changed initCustomCursor 不再組字串注入整份 <style>（原本會把
        animation.css 已定義過的選擇器清單複製一份到 JS 裡）。
        改為只呼叫 setProperty 覆寫 --cursor-default／--cursor-pointer
        這兩個 CSS 變數本身；animation.css 的選擇器早已引用同一組變數，
        因此瀏覽器會自動套用到所有相關元素，不需要在 JS 端重複列一次。
        規則來源永遠只有 variables.css 這一份，日後調整選擇器範圍
        只需要改 animation.css，不會有兩處清單漏改不同步的風險。
- Removed initCursorTrail：依需求移除拖尾效果
- Changed initFireflyField 粒子顏色改為薄荷青（--color-glow）

Description:

集中管理全站視覺動效，所有 init* 函式均為冪等，可安全地在每頁重複呼叫。

游標方案說明（雙層設計）：
  第一層：variables.css 設定外部 URL，頁面一載入就直接生效。
  第二層：JS 非同步載入同一張圖片，以 canvas 縮圖到 32px
          （符合多數瀏覽器對自訂游標圖片的尺寸限制），
          取得 data URL 後覆寫同一組 CSS 變數。
  兩層都只是換 cursor 屬性的圖片來源，從未切換到 cursor:none 再切回來，
  所以不會有「游標在元素邊緣快速切換造成閃動」的問題。
*/

const CURSOR_URL = 'https://upload-os-bbs.hoyolab.com/upload/2024/06/19/d4702c1b4bd1cf573db80b66d8c187a2_8759798806922987889.png';

// ── 自訂游標 ─────────────────────────────────────────────
/*
  流程：
  1. 建立 Image，請求外部 PNG（crossOrigin='anonymous' 請求 CORS 標頭）
  2. 載入後在 32×32 canvas 上縮圖
  3. 嘗試 toDataURL()；若 canvas 被 CORS 汙染則捨棄（保留 CSS 基底層網址）
  4. 成功則直接覆寫 --cursor-default／--cursor-pointer 兩個 CSS 變數
*/
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const SIZE = 32;
  const img  = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = SIZE;
    canvas.height = SIZE;
    canvas.getContext('2d').drawImage(img, 0, 0, SIZE, SIZE);

    let dataUrl;
    try {
      dataUrl = canvas.toDataURL('image/png');
    } catch {
      // CORS 未允許，保留 variables.css 的外部 URL 基底即可
      return;
    }

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--cursor-default', `url('${dataUrl}') 0 0, auto`);
    rootStyle.setProperty('--cursor-pointer', `url('${dataUrl}') 0 0, pointer`);
  };

  img.src = CURSOR_URL;
}

// ── 捲動淡入 ─────────────────────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.10 }
  );

  targets.forEach((el) => observer.observe(el));
}

// ── 導覽列自動隱藏 ───────────────────────────────────────
function initNavAutoHide() {
  const nav = document.querySelector('[data-site-nav]');
  if (!nav) return;

  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      nav.classList.toggle('is-hidden', y > lastY && y > 80);
      lastY = y;
    },
    { passive: true }
  );
}

// ── 螢火蟲粒子 ───────────────────────────────────────────
/*
  生成緩慢上飄的螢光青綠光點（對應流螢髮尾螢光色）。
  各粒子的位置、偏移量、動畫時長隨機化，避免同步閃爍。
*/
function initFireflyField(count = 20) {
  const field = document.querySelector('[data-firefly-field]');
  if (!field) return;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'firefly';
    dot.style.left   = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 40}%`;
    dot.style.setProperty('--drift-x', `${Math.random() * 80 - 40}px`);
    dot.style.animationDuration = `${9 + Math.random() * 10}s`;
    dot.style.animationDelay   = `${Math.random() * 12}s`;
    field.appendChild(dot);
  }
}
