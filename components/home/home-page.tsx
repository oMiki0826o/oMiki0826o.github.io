import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {pinnedProjects} from '@/content/projects';
import {pinnedNotes} from '@/content/notes/index';
import {pinnedTimeline} from '@/content/timeline';
import {localize, localizedPath} from '@/lib/content';
import {MusicPlayer} from './music-player';
import {SiteFooter} from '@/components/layout/site-footer';
import {SocialIcon} from '@/components/ui/social-icons';
import {ui} from '@/i18n/ui';
import {ScrollReveal} from '@/components/ui/scroll-reveal';
import {TypewriterText} from '@/components/ui/typewriter-text';

export function HomePage({locale}: {locale: Locale}) {
  const aboutParagraphs = profile.about[locale];
  const copy = ui[locale];
  const latestNotes = pinnedNotes;

  return (
    <main>
      <section className="intro">
        <img className="avatar" src={profile.avatar} alt="Miki" width="104" height="104" fetchPriority="high" />
        <h1>{profile.name}</h1>
        <p className="subtitle"><TypewriterText text={localize(profile.subtitle, locale)} /></p>
        <p className="aboutline">{localize(profile.intro, locale)}</p>
        <p className="quote">{localize(profile.signature, locale)}</p>
      </section>

      <ScrollReveal><MusicPlayer locale={locale} /></ScrollReveal>

      <nav className="social-row" aria-label="Contact links">
        <a href="https://github.com/omiki0826o" target="_blank" rel="noreferrer" aria-label="GitHub"><SocialIcon name="github" /></a>
        <a href="https://discord.com/users/839381498351190036" target="_blank" rel="noreferrer" aria-label="Discord: miki._.0826"><SocialIcon name="discord" /></a>
        <a href="mailto:chenmiki0925@gmail.com" aria-label="Email"><SocialIcon name="email" /></a>
      </nav>

      <ScrollReveal><figure className="featured">
        <a className="featured-image" href="https://twitter.com" target="_blank" rel="noreferrer"><img src={profile.featuredImage} alt="鎮樓圖" loading="lazy" /></a>
        <figcaption className="featured-caption">
          <strong>{copy.home.featuredImage}</strong>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter →</a>
        </figcaption>
      </figure></ScrollReveal>

      <ScrollReveal><section className="section" id="about">
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
            <Link className="text-link" href={localizedPath(locale, '/about')}>{copy.home.aboutMore}</Link>
          </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="section" id="projects">
        <header className="section-head">
          <h2>Works</h2>
          <small>{copy.sections.works}</small>
        </header>
        <div className="projects">
          {pinnedProjects.map((project) => (
            <Link className={`project project-${project.tone}`} href={localizedPath(locale, `/projects/${project.slug}`)} key={project.slug}>
              <div className="project-cover"><img src={project.image} alt={localize(project.title, locale)} loading="lazy" /></div>
              <div className="project-body">
                <small>{project.tags.join(' / ')}</small>
                <h3>{localize(project.title, locale)}</h3>
                <p>{localize(project.description, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/projects')}>{copy.home.worksMore}</Link>
      </section></ScrollReveal>

      <ScrollReveal><section className="section" id="notes">
        <header className="section-head">
          <h2>Notes</h2>
          <small>{copy.sections.notes}</small>
        </header>
        <div className="notes">
          {latestNotes.map((note) => (
            <Link className="note" href={localizedPath(locale, `/notes/${note.slug}`)} key={note.slug}>
              <time dateTime={note.date}>{note.date} · {note.category}</time>
              <h3>{localize(note.title, locale)}</h3>
              <p>{localize(note.excerpt, locale)}</p>
            </Link>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/notes')}>{copy.home.notesMore}</Link>
      </section></ScrollReveal>

      <ScrollReveal><section className="section" id="timeline">
        <header className="section-head">
          <h2>Timeline</h2>
          <small>{copy.sections.timeline}</small>
        </header>
        <div className="timeline">
          {pinnedTimeline.map((item) => (
            <article className="event timeline-reveal" key={`${item.year}-${item.title['zh-TW']}`}>
              <time>{item.year}</time>
              <h3>{localize(item.title, locale)}</h3>
              <p>{localize(item.description, locale)}</p>
            </article>
          ))}
        </div>
        <Link className="more-button" href={localizedPath(locale, '/timeline')}>{copy.home.timelineMore}</Link>
      </section></ScrollReveal>

      <SiteFooter locale={locale} />
    </main>
  );
}
