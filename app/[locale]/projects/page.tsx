/*
 * File: page.tsx
 * Modification: 2026-10-11 — V6.3.4 Works 依作品類型分組、三語導覽與實際 Demo 連結。
 */
import {resolveLocale} from '@/i18n/config';
import type {LocalizedText, Project} from '@/content/types';
import {projects} from '@/content/projects';
import {localize, localizedPath} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {ui} from '@/i18n/ui';
import Link from 'next/link';

const groups: ReadonlyArray<{kind: Project['category']; heading: LocalizedText; description: LocalizedText}> = [
  {kind: 'web', heading: {'zh-TW': '網站與語言', en: 'Web & languages', ja: 'Webと言語'}, description: {'zh-TW': '能直接打開使用的小工具，以及讓內容真正運作的語言。', en: 'Useful browser tools and the language that powers this site.', ja: 'ブラウザーで使える道具と、サイトを支える言語。'}},
  {kind: 'tools', heading: {'zh-TW': '工具與開發', en: 'Tools & development', ja: 'ツールと開発'}, description: {'zh-TW': '機器人、Minecraft 模組、桌面程式與開發實務。', en: 'Bots, Minecraft mods, desktop tools and development practices.', ja: 'Bot、Minecraft Mod、デスクトップツールと開発手法。'}}
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({locale, pathname: '/projects', title: ui[locale].pages.projectsTitle, description: ui[locale].pages.projectsLead});
}

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  const links = {'zh-TW': {detail: '了解作品',demo: '開啟網站',source:'原始碼'}, en: {detail: 'Explore',demo:'Live site',source:'Source'}, ja: {detail: '詳しく見る',demo:'サイトへ',source:'ソース'}}[locale];
  return (
    <ContentPage locale={locale} eyebrow="works" title={ui[locale].pages.projectsTitle} lead={ui[locale].pages.projectsLead}>
      <p className="works-count">{projects.length} WORKS / MIKI</p>
      {groups.map((group) => {
        const entries = projects.filter((project) => project.category === group.kind);
        return <section className="works-group" key={group.kind} aria-labelledby={`works-${group.kind}`}>
          <header className="works-group-header"><div><h2 id={`works-${group.kind}`}>{localize(group.heading,locale)}</h2><p>{localize(group.description,locale)}</p></div><span>{String(entries.length).padStart(2, '0')}</span></header>
          <div className="page-projects">
            {entries.map((project) => (
              <article className={`page-project page-project-${project.tone}`} key={project.slug}>
                <Link className="page-project-cover" href={localizedPath(locale, `/projects/${project.slug}`)} aria-label={`${localize(project.title, locale)} — ${links.detail}`}>
                  <img src={project.image} alt="" loading="lazy" decoding="async" width="1000" height="600" />
                </Link>
                <div className="page-project-text">
                  <small>{project.tags.join(' · ')}</small>
                  <h3><Link href={localizedPath(locale, `/projects/${project.slug}`)}>{localize(project.title, locale)}</Link></h3>
                  <p>{localize(project.description, locale)}</p>
                  <div className="page-project-actions">
                    <Link className="project-action-primary" href={localizedPath(locale, `/projects/${project.slug}`)}>{links.detail} →</Link>
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{links.demo} ↗</a>}
                    <a href={project.url} target="_blank" rel="noopener noreferrer">{links.source} ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>;
      })}
    </ContentPage>
  );
}
