import type {Locale} from '@/i18n/config';
import Link from '@/components/ui/astro-link';
import type {Note} from '@/content/types';
import {projects} from '@/content/projects';
import {localize, localizedPath} from '@/lib/content';
import {siteUrl} from '@/lib/metadata';
import {ui} from '@/i18n/ui';
import {ContentPage} from '@/components/layout/content-page';
import {JsonLd} from '@/components/seo/json-ld';
import {BackToTop} from '@/components/ui/back-to-top';
import {ReadingProgress} from '@/components/ui/reading-progress';
import {estimateReadingMinutes, formatNoteDate} from '@/lib/note-metadata';

export function NoteDetailPage({locale, slug, notes}: {locale: Locale; slug: string; notes: Note[]}) {
  const note = notes.find((item) => item.slug === slug);
  if (!note) return null;
  const title = localize(note.title, locale);
  const description = localize(note.excerpt, locale);
  const pathname = localizedPath(locale, `/notes/${note.slug}`);
  const relatedNotes = (note.relatedSlugs
    ? note.relatedSlugs.map((relatedSlug) => notes.find((item) => item.slug === relatedSlug)).filter((item): item is typeof note => Boolean(item))
    : notes.filter((item) => item.slug !== note.slug && item.category === note.category)
  ).slice(0, 2);
  const relatedProject = note.projectSlug ? projects.find((project) => project.slug === note.projectSlug) : undefined;
  const metadata = `${formatNoteDate(note.date, locale)} · ${note.category} · ${ui[locale].notes.readingTime(estimateReadingMinutes(note, locale))}`;
  return (
    <ContentPage locale={locale} backHref={localizedPath(locale, '/notes')} backLabel={ui[locale].common.backNotes} eyebrow={metadata} title={title} lead={description} fixedChildren={<><ReadingProgress /><BackToTop label={ui[locale].common.backTop} /></>}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        datePublished: note.date,
        inLanguage: locale,
        mainEntityOfPage: new URL(pathname, siteUrl).toString(),
        author: {'@type': 'Person', name: 'Miki'}
      }} />
      {note.sections.length > 2 ? <nav className="note-toc" aria-label={ui[locale].notes.toc}><span>{ui[locale].notes.toc}</span>{note.sections.map((section, index) => <a href={`#${encodeURIComponent(section.ids[locale])}`} key={section.heading['zh-TW']}>{String(index + 1).padStart(2, '0')} {localize(section.heading, locale)}</a>)}</nav> : null}
      <article className="prose note-article">
        {note.sections.map((section, index) => <section id={section.ids[locale]} key={section.heading['zh-TW']}><h2>{localize(section.heading, locale)}</h2><div className="sm-body" dangerouslySetInnerHTML={{__html: section.html[locale]}} /></section>)}
      </article>
      {relatedProject && <aside className="note-project-related" aria-label={ui[locale].notes.project}>
        <span>{ui[locale].notes.project}</span>
        <Link href={localizedPath(locale, `/projects/${relatedProject.slug}`)}>{localize(relatedProject.title, locale)} →</Link>
      </aside>}
      {relatedNotes.length > 0 ? <aside className="related-notes" aria-label={ui[locale].notes.related}>
        <h2>{ui[locale].notes.related}</h2>
        {relatedNotes.map((item) => <Link href={localizedPath(locale, `/notes/${item.slug}`)} key={item.slug}><span>{formatNoteDate(item.date, locale)} · {item.category}</span>{localize(item.title, locale)} <b className="note-arrow" aria-hidden="true">→</b></Link>)}
      </aside> : null}
    </ContentPage>
  );
}
