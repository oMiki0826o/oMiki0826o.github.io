/**
 * js/render.js
 *
 * Modification():
 *
 * - Added 導覽列、社群圖示、快速連結、卡片、時間軸、技能條的渲染函式
 *
 * Description:
 *
 * 將「資料 → HTML」的轉換邏輯集中於此，main.js 與各子頁僅需呼叫
 * 對應函式並傳入容器與資料，不需重複撰寫樣板字串。
 */

/** 安全地將純文字插入 HTML，避免使用者資料中的符號破壞結構。 */
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

function renderNav(navItems, brandAvatarUrl) {
  const linksEl = document.querySelector('[data-nav-links]');
  const brandEl = document.querySelector('[data-nav-brand]');
  if (brandEl && brandAvatarUrl) {
    brandEl.innerHTML = `<img src="${escapeHTML(brandAvatarUrl)}" alt="Miki 頭像">`;
  }
  if (!linksEl || !navItems) return;
  linksEl.innerHTML = navItems
    .map((item) => `<a href="${escapeHTML(item.url)}">${escapeHTML(item.label)}</a>`)
    .join('');
}

function renderSocial(socialItems) {
  const el = document.querySelector('[data-social-row]');
  if (!el || !socialItems) return;
  el.innerHTML = socialItems
    .map(
      (item) => `
      <a class="icon-btn" href="${escapeHTML(item.url)}" target="_blank" rel="noopener" aria-label="${escapeHTML(item.label)}">
        <i class="${escapeHTML(item.icon)}"></i>
      </a>`
    )
    .join('');
}

function renderQuickLinks(links) {
  const el = document.querySelector('[data-quick-links]');
  if (!el || !links) return;
  el.innerHTML = links
    .map(
      (item) => `
      <a class="pill" href="${escapeHTML(item.url)}">
        <i class="${escapeHTML(item.icon)}"></i><span>${escapeHTML(item.label)}</span>
      </a>`
    )
    .join('');
}

function renderFeaturedCard(site) {
  const el = document.querySelector('[data-featured-card]');
  if (!el || !site) return;
  const credit = site.featuredCredit;
  el.innerHTML = `
    <img src="${escapeHTML(site.featuredImage)}" alt="鎮樓圖" loading="lazy">
    ${
      credit
        ? `<div class="card--featured__credit">${escapeHTML(credit.label)}：
           <a href="${escapeHTML(credit.url)}" target="_blank" rel="noopener">${escapeHTML(credit.name)}</a></div>`
        : ''
    }`;
}

function renderAboutPreview(site) {
  const el = document.querySelector('[data-about-preview]');
  if (!el || !site?.about) return;
  const { greeting, description, tags, readMoreUrl } = site.about;
  el.innerHTML = `
    <h2 class="card__title">${escapeHTML(greeting)}</h2>
    <p class="card__text">${escapeHTML(description)}</p>
    <div class="tag-row">
      ${tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
    </div>
    <a class="card__link" href="${escapeHTML(readMoreUrl)}">Read More <i class="fa-solid fa-arrow-right"></i></a>`;
}

function renderAboutFull(site) {
  const el = document.querySelector('[data-about-full]');
  if (!el || !site?.about) return;
  const { greeting, fullBio, tags } = site.about;
  el.innerHTML = `
    <h1 class="card__title" style="font-size:1.8rem">${escapeHTML(greeting)}</h1>
    ${(fullBio || []).map((p) => `<p class="card__text">${escapeHTML(p)}</p>`).join('')}
    <div class="tag-row">
      ${tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
    </div>`;
}

function renderMiniCard(item, type) {
  const isProject = type === 'project';
  const meta = isProject ? (item.tags || []).join(' / ') : item.date;
  return `
    <a class="glass mini-card" href="${escapeHTML(item.url)}" target="_blank" rel="noopener" data-reveal>
      <img src="${escapeHTML(item.cover)}" alt="${escapeHTML(item.title)}" loading="lazy">
      <div class="mini-card__body">
        <h3 class="mini-card__title">${escapeHTML(item.title)}</h3>
        <span class="mini-card__meta">${escapeHTML(meta)}</span>
        <p class="mini-card__desc">${escapeHTML(item.description || item.excerpt || '')}</p>
        <span class="card__link">View <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </a>`;
}

function renderGrid(selector, items, type) {
  const el = document.querySelector(selector);
  if (!el || !items) return;
  el.innerHTML = items.map((item) => renderMiniCard(item, type)).join('');
}

function renderTimelinePreview(items, limit = 3) {
  const el = document.querySelector('[data-timeline-preview]');
  if (!el || !items) return;
  const preview = items.filter((item) => item.highlight).slice(0, limit);
  el.innerHTML = preview.map((item) => timelineItemHTML(item)).join('');
}

function renderTimelineFull(items) {
  const el = document.querySelector('[data-timeline-full]');
  if (!el || !items) return;
  el.innerHTML = items.map((item) => timelineItemHTML(item)).join('');
}

function timelineItemHTML(item) {
  return `
    <li class="timeline-item" data-reveal>
      <span class="timeline-item__year">${escapeHTML(item.year)}</span>
      <h3 class="timeline-item__title">${escapeHTML(item.title)}</h3>
      <p class="timeline-item__desc">${escapeHTML(item.description)}</p>
    </li>`;
}

function renderSkills(skills) {
  const el = document.querySelector('[data-skills]');
  if (!el || !skills) return;
  el.innerHTML = skills
    .map(
      (skill) => `
      <div class="skill-bar">
        <div class="skill-bar__label"><span>${escapeHTML(skill.name)}</span><span>${skill.level}%</span></div>
        <div class="skill-bar__track"><div class="skill-bar__fill" style="--target:${skill.level}%"></div></div>
      </div>`
    )
    .join('');

  // 進場時才補滿進度條，搭配 CSS transition 做出緩入動畫。
  requestAnimationFrame(() => {
    el.querySelectorAll('.skill-bar__fill').forEach((bar) => {
      bar.style.width = bar.style.getPropertyValue('--target');
    });
  });
}

function renderFooter(site) {
  const el = document.querySelector('[data-footer]');
  if (!el || !site?.footer) return;
  const { year, owner, poweredBy, hosting } = site.footer;
  const stats = site.stats || {};
  el.innerHTML = `
    <p>${escapeHTML(year)} ${escapeHTML(owner)}</p>
    <p>Powered by ${poweredBy.map(escapeHTML).join(' / ')}</p>
    <p>${escapeHTML(hosting)}</p>
    <div class="site-footer__stats">
      <span>Views ${stats.views ?? '—'}</span>
      <span>Visitors ${stats.visitors ?? '—'}</span>
      <span>Last Updated ${escapeHTML(stats.lastUpdated ?? '')}</span>
    </div>`;
}

function renderQuote(quoteData) {
  const el = document.querySelector('[data-quote]');
  if (!el || !quoteData?.quotes?.length) return;
  const random = quoteData.quotes[Math.floor(Math.random() * quoteData.quotes.length)];
  el.textContent = `“${random}”`;
}
