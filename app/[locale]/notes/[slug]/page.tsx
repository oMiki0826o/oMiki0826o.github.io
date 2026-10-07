import {notFound} from 'next/navigation';
import Link from 'next/link';
import type {Metadata} from 'next';
import {locales, resolveLocale} from '@/i18n/config';
import {getNote, notes} from '@/content/notes/index';
import {localize, localizedPath} from '@/lib/content';
import {buildPageMetadata, siteUrl} from '@/lib/metadata';
import {ui} from '@/i18n/ui';
import {ContentPage} from '@/components/layout/content-page';
import {JsonLd} from '@/components/seo/json-ld';
import {BackToTop} from '@/components/ui/back-to-top';
import {ReadingProgress} from '@/components/ui/reading-progress';
import {estimateReadingMinutes, formatNoteDate} from '@/lib/note-metadata';

export function generateStaticParams() {
  return locales.flatMap((locale) => notes.map((note) => ({locale, slug: note.slug})));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = resolveLocale(rawLocale);
  const note = getNote(slug);
  if (!note) return {};
  return buildPageMetadata({
    locale,
    pathname: `/notes/${note.slug}`,
    title: localize(note.title, locale),
    description: localize(note.excerpt, locale)
  });
}

export default async function NotePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: rawLocale, slug} = await params;
  const locale = resolveLocale(rawLocale);
  const note = getNote(slug);
  if (!note) notFound();

  const title = localize(note.title, locale);
  const description = localize(note.excerpt, locale);
  const pathname = localizedPath(locale, `/notes/${note.slug}`);
  const relatedNotes = (note.relatedSlugs
    ? note.relatedSlugs.map((relatedSlug) => notes.find((item) => item.slug === relatedSlug)).filter((item): item is typeof note => Boolean(item))
    : notes.filter((item) => item.slug !== note.slug && item.category === note.category)
  ).slice(0, 2);
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
      {note.sections.length > 2 ? <nav className="note-toc" aria-label={ui[locale].notes.toc}><span>{ui[locale].notes.toc}</span>{note.sections.map((section, index) => <a href={`#note-section-${index + 1}`} key={section.heading['zh-TW']}>{String(index + 1).padStart(2, '0')} {localize(section.heading, locale)}</a>)}</nav> : null}
      <article className="prose note-article">
        {note.sections.map((section, index) => <section id={`note-section-${index + 1}`} key={section.heading['zh-TW']}><h2>{localize(section.heading, locale)}</h2>{section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      </article>
      {relatedNotes.length > 0 ? <aside className="related-notes" aria-label={ui[locale].notes.related}>
        <h2>{ui[locale].notes.related}</h2>
        {relatedNotes.map((item) => <Link href={localizedPath(locale, `/notes/${item.slug}`)} key={item.slug}><span>{formatNoteDate(item.date, locale)} · {item.category}</span>{localize(item.title, locale)} <b className="note-arrow" aria-hidden="true">→</b></Link>)}
      </aside> : null}
    </ContentPage>
  );
}
