import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {notes} from '@/content/notes/index';
import {pinnedProjects} from '@/content/projects';
import {localize, localizedPath} from '@/lib/content';
import {estimateReadingMinutes, formatNoteDate} from '@/lib/note-metadata';
import {MusicPlayer} from './music-player';
import {SiteFooter} from '@/components/layout/site-footer';

const copy = {
  'zh-TW': {
    eyebrow: 'WELCOME TO MY LITTLE CORNER',
    greeting: '你好，這裡是 Miki。',
    exploreBlog: '讀讀文章',
    exploreAbout: '關於我',
    latest: '最近寫下的文字',
    latestLead: '開發紀錄、研究筆記，還有一些生活中的小發現。',
    readMore: '全部文章',
    selected: '正在做的作品',
    selectedLead: '一些持續練習、慢慢完成的事情。',
    allWorks: '更多作品',
    listening: '一些喜歡的聲音',
    listeningLead: '一首歌，留在這個小角落。'
  },
  en: {
    eyebrow: 'WELCOME TO MY LITTLE CORNER',
    greeting: 'Hello, I’m Miki.',
    exploreBlog: 'Read the blog',
    exploreAbout: 'About me',
    latest: 'Recent writing',
    latestLead: 'Development notes, research, and little observations along the way.',
    readMore: 'All posts',
    selected: 'Selected works',
    selectedLead: 'Things I’m learning, building, and refining over time.',
    allWorks: 'More works',
    listening: 'A little soundtrack',
    listeningLead: 'One song for this small corner of the internet.'
  },
  ja: {
    eyebrow: 'WELCOME TO MY LITTLE CORNER',
    greeting: 'こんにちは、Miki です。',
    exploreBlog: '記事を読む',
    exploreAbout: '私について',
    latest: '最近書いたこと',
    latestLead: '開発記録、調べたこと、日々の小さな発見。',
    readMore: 'すべての記事',
    selected: '制作したもの',
    selectedLead: '少しずつ学びながら作り続けているもの。',
    allWorks: 'もっと見る',
    listening: '小さなサウンドトラック',
    listeningLead: 'この小さな場所に、一曲を。'
  }
} satisfies Record<Locale, Record<string, string>>;

export function HomePage({locale}: {locale: Locale}) {
  const labels = copy[locale];
  const recent = notes.slice(0, 4);
  const works = pinnedProjects.slice(0, 3);
  return (
    <main className="home-blog">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="home-eyebrow">{labels.eyebrow}</p>
        <div className="home-introduction">
          <img className="home-portrait" src={profile.avatar} alt="" width="112" height="112" fetchPriority="high" />
          <div className="home-introduction-copy">
            <h1 id="home-title">{labels.greeting}</h1>
            <p className="home-subtitle">{localize(profile.subtitle, locale)}</p>
            <p className="home-description">{localize(profile.intro, locale)}</p>
            <blockquote className="home-quote">{localize(profile.signature, locale)}</blockquote>
            <div className="home-actions">
              <Link className="home-primary-link" href={localizedPath(locale, '/notes')}>{labels.exploreBlog} <span aria-hidden="true">↗</span></Link>
              <Link className="home-secondary-link" href={localizedPath(locale, '/about')}>{labels.exploreAbout} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-blog-title">
        <header className="home-section-head">
          <div><p className="home-section-kicker">01 / BLOG</p><h2 id="home-blog-title">Blog <span>{labels.latest}</span></h2><p>{labels.latestLead}</p></div>
          <Link className="home-section-more" href={localizedPath(locale, '/notes')}>{labels.readMore} ↗</Link>
        </header>
        <div className="home-post-list">
          {recent.map((note) => (
            <article className="home-post" key={note.slug}>
              <Link href={localizedPath(locale, `/notes/${note.slug}`)}>
                <div className="home-post-meta"><time dateTime={note.date}>{formatNoteDate(note.date, locale)}</time><span>{note.category}</span><span>{estimateReadingMinutes(note, locale)} min</span></div>
                <h3>{localize(note.title, locale)} <span aria-hidden="true">↗</span></h3>
                <p>{localize(note.excerpt, locale)}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-works-title">
        <header className="home-section-head">
          <div><p className="home-section-kicker">02 / WORKS</p><h2 id="home-works-title">Works <span>{labels.selected}</span></h2><p>{labels.selectedLead}</p></div>
          <Link className="home-section-more" href={localizedPath(locale, '/projects')}>{labels.allWorks} ↗</Link>
        </header>
        <div className="home-work-list">
          {works.map((project) => (
            <article className="home-work" key={project.slug}>
              <Link href={localizedPath(locale, `/projects/${project.slug}`)}>
                <img src={project.image} alt="" width="150" height="90" loading="lazy" />
                <div><span className="home-work-tags">{project.tags.slice(0, 3).join(' · ')}</span><h3>{localize(project.title, locale)}</h3><p>{localize(project.description, locale)}</p></div>
                <span className="home-work-arrow" aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-personal" aria-label={labels.listening}>
        <figure className="home-featured">
          <img src={profile.featuredImage} alt={localize(profile.featuredCaption, locale)} loading="lazy" />
          <figcaption><span>{localize(profile.featuredCaption, locale)}</span><a href={profile.featuredSource} target="_blank" rel="noopener noreferrer">Source ↗</a></figcaption>
        </figure>
        <div className="home-listening"><p className="home-section-kicker">03 / NOW PLAYING</p><h2>{labels.listening}</h2><p>{labels.listeningLead}</p><MusicPlayer locale={locale} /></div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
