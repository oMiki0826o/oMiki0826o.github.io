import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {projects} from '@/content/projects';
import {notes} from '@/content/notes';
import {timeline} from '@/content/timeline';
import {localize, localizedPath} from '@/lib/content';
import {MusicPlayer} from './music-player';
import {SiteFooter} from '@/components/layout/site-footer';

export function HomePage({locale}: {locale: Locale}) {
  const aboutParagraphs = profile.about[locale];

  return (
    <main>
      <section className="intro">
        <img className="avatar" src={profile.avatar} alt="Miki" width="104" height="104" fetchPriority="high" />
        <h1>{profile.name}</h1>
        <p className="subtitle">{localize(profile.subtitle, locale)}</p>
        <p className="aboutline">{localize(profile.intro, locale)}</p>
        <p className="quote">{localize(profile.signature, locale)}</p>
      </section>

      <MusicPlayer locale={locale} />

      <nav className="social-row" aria-label="Contact links">
        <a href="https://github.com/omiki0826o" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github" /></a>
        <a href="https://discord.gg/" target="_blank" rel="noreferrer" aria-label="Discord"><i className="fa-brands fa-discord" /></a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
        <a href="https://threads.net/" target="_blank" rel="noreferrer" aria-label="Threads"><i className="fa-brands fa-threads" /></a>
      </nav>

      <figure className="featured">
        <a className="featured-image" href="https://twitter.com" target="_blank" rel="noreferrer"><img src={profile.featuredImage} alt="鎮樓圖" loading="lazy" /></a>
        <figcaption className="featured-caption">
          <strong>{locale === 'ja' ? '鎮樓圖' : locale === 'en' ? 'Featured image' : '鎮樓圖'}</strong>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter ↗</a>
        </figcaption>
      </figure>

      <section className="section" id="about">
        <header className="section-head">
          <h2>About</h2>
          <small>{localize(profile.aboutTitle, locale)}</small>
        </header>
        <div className="about-grid">
          <div className="about-copy">
            <h3>{localize(profile.aboutTitle, locale)}</h3>
            {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="tags">
              {profile.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
            <Link className="text-link" href={localizedPath(locale, '/about')}>{locale === 'ja' ? 'もっと見る →' : '完整介紹 →'}</Link>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <header className="section-head">
          <h2>Works</h2>
          <small>{locale === 'ja' ? '制作実績' : '專案紀錄'}</small>
        </header>
        <div className="projects">
          {projects.map((project) => (
            <a className={`project project-${project.tone}`} href={project.url} target="_blank" rel="noreferrer" key={project.slug}>
              <div className="project-cover"><span>{project.title['zh-TW'].toUpperCase()}</span></div>
              <div className="project-body">
                <small>{project.tags.join(' / ')}</small>
                <h3>{localize(project.title, locale)}</h3>
                <p>{localize(project.description, locale)}</p>
              </div>
            </a>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/projects')}>{locale === 'ja' ? 'もっと見る →' : locale === 'en' ? 'View more →' : '查看更多 →'}</Link>
      </section>

      <section className="section" id="notes">
        <header className="section-head">
          <h2>Notes</h2>
          <small>{locale === 'ja' ? '記事と記録' : '文章與紀錄'}</small>
        </header>
        <div className="notes">
          {notes.map((note) => (
            <article className="note" key={note.slug}>
              <time>{note.date} · {note.category}</time>
              <h3>{localize(note.title, locale)}</h3>
              <p>{localize(note.excerpt, locale)}</p>
            </article>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/notes')}>{locale === 'ja' ? 'もっと見る →' : locale === 'en' ? 'View more →' : '查看更多 →'}</Link>
      </section>

      <section className="section" id="timeline">
        <header className="section-head">
          <h2>Timeline</h2>
          <small>{locale === 'ja' ? 'これまでの記録' : '一路走來'}</small>
        </header>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="event" key={`${item.year}-${item.title['zh-TW']}`}>
              <time>{item.year}</time>
              <h3>{localize(item.title, locale)}</h3>
              <p>{localize(item.description, locale)}</p>
            </article>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/timeline')}>{locale === 'ja' ? 'すべて見る →' : locale === 'en' ? 'View timeline →' : '查看完整歷程 →'}</Link>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
