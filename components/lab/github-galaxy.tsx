/*
 * File: github-galaxy.tsx
 * Modification: 2026-10-11 — V6.3.4 星體由 Works 的同一份作品登錄表取用。
 */
import type {CSSProperties} from 'react';
import {projects} from '@/content/projects';

// ── 五個精選節點共用 Works 內容，避免重複保存名稱與 GitHub URL ──
const highlights = ['discord-bot', 'miki-website', 'structmark', 'astro-lab', 'stlab'];
const sizes = [1.15, .9, .82, .68, .52];
const colors = ['#d3a16e', '#a8c5b4', '#b6de7c', '#9ec3db', '#75857e'];
const repos = highlights.map((slug, index) => {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) throw new Error(`GitHub galaxy project missing from Works: ${slug}`);
  return {project, size: sizes[index]!, color: colors[index]!};
});

export function GithubGalaxy() {
  return <section className="github-galaxy" id="github-galaxy" aria-labelledby="galaxy-title">
    <div className="tool-heading"><div><p className="lab-eyebrow">LAB / 04</p><h2 id="galaxy-title">GitHub galaxy</h2></div><span>curated snapshot</span></div>
    <p className="tool-lead">以精選專案組成小宇宙。點選星體即可開啟 GitHub，資料採人工整理、不是即時 API。</p>
    <div className="galaxy-stage">{repos.map(({project,size,color}, index) => <a
      href={project.url} target="_blank" rel="noopener noreferrer"
      className={`galaxy-node galaxy-node-${index+1}`}
      key={project.slug}
      style={{'--node-color': color,'--node-size': `${size}rem`} as CSSProperties}
      aria-label={`${project.title['zh-TW']}，在 GitHub 開啟`}
    ><span className="galaxy-star"/><strong>{project.title['en']}</strong><small>{project.tags[0]}</small></a>)}<i className="galaxy-core" aria-hidden="true"/></div>
  </section>;
}
