/**
 * js/animation.js
 *
 * Modification():
 *
 * - Added 自訂愛心游標、捲動淡入觀察器、導覽列自動隱藏、螢火蟲背景生成
 *
 * Description:
 *
 * 集中管理全站的互動動效，所有函式皆為冪等（重複呼叫不會疊加副作用），
 * 可安全地在每個頁面的入口腳本中各呼叫一次。
 */

/** 在游標位置生成跟隨的愛心圖示，作為本站的識別性視覺元素。 */
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.innerHTML =
    '<svg viewBox="0 0 32 29.6"><path d="M23.6 0c-3 0-5.8 1.6-7.6 4.2C14.2 1.6 11.4 0 8.4 0 3.8 0 0 3.8 0 8.6c0 7.6 9 12.6 16 19.6 7-7 16-12 16-19.6C32 3.8 28.2 0 23.6 0z"/></svg>';
  document.body.appendChild(dot);

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.querySelectorAll('a, button, .pill, .icon-btn, input').forEach((el) => {
    el.addEventListener('mouseenter', () => dot.classList.add('is-active'));
    el.addEventListener('mouseleave', () => dot.classList.remove('is-active'));
  });

  function tick() {
    dotX += (mouseX - dotX) * 0.22;
    dotY += (mouseY - dotY) * 0.22;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    requestAnimationFrame(tick);
  }
  tick();
}

/** 為帶有 data-reveal 屬性的元素加上捲動進場動畫。 */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/** 向下捲動時隱藏導覽列，向上捲動時重新顯示。 */
function initNavAutoHide() {
  const nav = document.querySelector('[data-site-nav]');
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY && currentY > 80;
      nav.classList.toggle('is-hidden', scrollingDown);
      lastScrollY = currentY;
    },
    { passive: true }
  );
}

/** 在背景產生緩慢飄浮的螢火蟲光點。 */
function initFireflyField(count = 22) {
  const field = document.querySelector('[data-firefly-field]');
  if (!field) return;

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'firefly';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 30}%`;
    dot.style.setProperty('--drift-x', `${Math.random() * 80 - 40}px`);
    dot.style.animationDuration = `${8 + Math.random() * 10}s`;
    dot.style.animationDelay = `${Math.random() * 10}s`;
    field.appendChild(dot);
  }
}
