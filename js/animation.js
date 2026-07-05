/*
js/animation.js

Modification():

- Removed initCustomCursor 原本的 canvas 縮圖方案：實際測試後確認
        兩個假設都成立而導致完全失效——
          1. 來源圖片尺寸遠超過瀏覽器對「原生 cursor 圖片」的上限
             （多數瀏覽器超過 128px 見方就整個忽略，退回預設箭頭）
          2. 圖床沒有開放跨來源像素讀取（CORS），canvas 讀取後的
             圖片會被判定為「受污染」，toDataURL() 直接丟出例外
        兩者疊加的結果是：換游標這個動作在瀏覽器端完全沒有作用，
        卻不會產生任何看得見的錯誤，因此問題會一直像沒被修好一樣。
- Added   initCustomCursor 改為「JS 建立跟隨滑鼠的圖片疊加層」：
        用一般 <img> 顯示圖片（顯示圖片本身不需要 CORS，CORS
        只限制「用程式讀回像素資料」這件事），尺寸交給 CSS
        width/height 控制，徹底繞開上述兩個限制，且不依賴圖床
        是否設定 CORS 標頭。
- Kept   避免重新製造「游標在按鈕邊緣閃動」舊問題的三個設計重點：
          a. 只有疊加層確定建立成功後，才把原生游標設為 none
             （一次性加上 class，不隨 hover 狀態切換）
          b. 疊加層永遠 pointer-events: none，不影響任何元素的
             真實 hover／click 判定
          c. 「靠近可互動元素放大」用委派監聽切換一個 class 完成，
             不去動 cursor 屬性本身，避免兩種游標定義互相搶用

Description:

集中管理全站視覺動效，所有 init* 函式均為冪等，可安全地在每頁重複呼叫。
*/

const CURSOR_URL = 'https://upload-os-bbs.hoyolab.com/upload/2024/06/19/d4702c1b4bd1cf573db80b66d8c187a2_8759798806922987889.png';

// 判斷「滑鼠是否移到某個可互動元素上」共用的選擇器，
// 疊加層放大／發光的回饋範圍要跟實際可點擊的元素範圍一致。
const INTERACTIVE_SELECTOR = 'a, button, input, label, [role="button"], .pill, .icon-btn';

// ── 自訂游標（跟隨滑鼠的圖片疊加層）───────────────────────
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (document.querySelector('.custom-cursor')) return; // 避免重複初始化

  // 外層只負責定位（transform: translate3d 由 mousemove 更新），
  // 內層 __img 只負責大小與 hover 回饋，兩者職責分開才不會有
  // 兩個地方同時改寫 transform 而互相覆蓋的問題。
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-cursor';

  const img = document.createElement('img');
  img.className = 'custom-cursor__img';
  img.src = CURSOR_URL;
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');

  wrapper.appendChild(img);
  document.body.appendChild(wrapper);

  // 疊加層確定掛載成功，才隱藏原生游標；
  // 前面任何一步若因為某些環境限制而失敗，這行不會執行到，
  // 使用者仍會看到瀏覽器預設箭頭，不會兩頭落空。
  document.documentElement.classList.add('custom-cursor-active');

  let latestX = window.innerWidth  / 2;
  let latestY = window.innerHeight / 2;
  let rafId   = null;

  const applyPosition = () => {
    wrapper.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`;
    rafId = null;
  };

  window.addEventListener('mousemove', (event) => {
    latestX = event.clientX;
    latestY = event.clientY;
    wrapper.classList.add('is-active');
    if (rafId === null) rafId = requestAnimationFrame(applyPosition);
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
