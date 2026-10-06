import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {projects} from '@/content/projects';
import {notes} from '@/content/notes';
import {timeline} from '@/content/timeline';
import {localize, localizedPath} from '@/lib/content';
import {MusicPlayer} from './music-player';
import {SiteFooter} from '@/components/layout/site-footer';

function SocialIcon({name}: {name: 'github' | 'discord' | 'instagram' | 'threads'}) {
  if (name === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  if (name === 'discord') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5A14 14 0 0 1 9 5l.5 1a11 11 0 0 1 5 0l.5-1a14 14 0 0 1 4 1.5c1.6 2.4 2 5.4 1.6 8.5A12 12 0 0 1 16.7 17l-1-1.2M8.3 15.8l-1 1.2A12 12 0 0 1 3.4 15c-.4-3.1 0-6.1 1.6-8.5Z" /><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
  if (name === 'threads') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c-4.5 0-7 2.8-7 7.8 0 4.7 2.6 8.2 7.1 8.2 3.5 0 5.9-2 5.9-4.7 0-2.4-1.9-3.9-4.8-3.9-2.4 0-4.1 1.2-4.1 3.1 0 1.5 1.2 2.5 3 2.5 2.2 0 3.8-1.7 3.8-4.7 0-4.2-2.2-6.6-5.5-6.6-2.2 0-3.7 1-4.7 2.7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.6c-2.1.5-2.5-.9-2.5-.9-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.9 2.3.7.1-.5.3-.9.5-1.1-1.7-.2-3.5-.8-3.5-3.8 0-.8.3-1.5.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.7 7.7 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3-1.8 3.6-3.5 3.8.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5Z" /></svg>;
}

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
        <a href="https://github.com/omiki0826o" target="_blank" rel="noreferrer" aria-label="GitHub"><SocialIcon name="github" /></a>
        <a href="https://discord.gg/" target="_blank" rel="noreferrer" aria-label="Discord"><SocialIcon name="discord" /></a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
        <a href="https://threads.net/" target="_blank" rel="noreferrer" aria-label="Threads"><SocialIcon name="threads" /></a>
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
              <div className="project-cover">{project.title['zh-TW'].toUpperCase()}</div>
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
