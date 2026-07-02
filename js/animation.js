/*
js/animation.js

Modification():

- Added   initCustomCursor：以 canvas 將外部圖片縮圖至 32px，
          轉為 data URL 後注入 <style> 覆蓋 animation.css 的 url() 基底，
          解決瀏覽器對大尺寸外部游標圖片的限制
- Removed initCursorTrail：依需求移除拖尾效果
- Changed initFireflyField 粒子顏色改為螢光青綠（--color-glow）

Description:

集中管理全站視覺動效，所有 init* 函式均為冪等，可安全地在每頁重複呼叫。

游標方案說明（雙層設計）：
  第一層：animation.css 設定外部 URL，部分瀏覽器直接生效。
  第二層：JS 非同步載入圖片，以 canvas 縮圖到 32px（符合瀏覽器游標尺寸限制），
          若取得 data URL 成功則注入 <style> 覆蓋第一層。
  兩層均不修改 cursor:none，因此不存在游標閃爍問題。
*/

const CURSOR_URL = 'https://upload-os-bbs.hoyolab.com/upload/2024/06/19/d4702c1b4bd1cf573db80b66d8c187a2_8759798806922987889.png';

// ── 自訂游標 ─────────────────────────────────────────────
/*
  流程：
  1. 建立 Image，請求外部 PNG（crossOrigin='anonymous' 請求 CORS 標頭）
  2. 載入後在 32×32 canvas 上縮圖
  3. 嘗試 toDataURL()；若 canvas 被 CORS 汙染則捨棄（保留 CSS 基底層）
  4. 成功則注入 <style id="cursor-override"> 覆蓋 animation.css 的 url()
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
      // CORS 未允許，保留 animation.css 的 url() 基底即可
      return;
    }

    // id 防止重複注入（SPA 導覽時可能重複呼叫）
    if (document.getElementById('cursor-override')) return;

    const style = document.createElement('style');
    style.id = 'cursor-override';
    style.textContent = `
      @media (pointer: fine) {
        html {
          cursor: url('${dataUrl}') 0 0, auto !important;
        }
        a, button, input, label,
        [role="button"], .pill, .icon-btn {
          cursor: url('${dataUrl}') 0 0, pointer !important;
        }
      }
    `;
    document.head.appendChild(style);
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
