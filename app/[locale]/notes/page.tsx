import {resolveLocale} from '@/i18n/config';
import {featuredNote, notes} from '@/content/notes';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import Link from 'next/link';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({locale, pathname: '/notes', title: ui[locale].sections.notes, description: ui[locale].pages.notesLead});
}

export default async function NotesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="notes"
      title={ui[locale].sections.notes}
      lead={ui[locale].pages.notesLead}
    >
      {featuredNote ? <Link className="featured-note" href={localizedPath(locale, `/notes/${featuredNote.slug}`)}>
        <span>{featuredNote.date} · {featuredNote.category}</span>
        <h2>{localize(featuredNote.title, locale)}</h2>
        <p>{localize(featuredNote.excerpt, locale)}</p>
        <b aria-hidden="true">↗</b>
      </Link> : null}
      <div className="page-notes">
        {notes.filter((note) => note.slug !== featuredNote?.slug).map((note) => (
          <Link className="page-note" href={localizedPath(locale, `/notes/${note.slug}`)} key={note.slug}>
            <time>{note.date} · {note.category}</time>
            <h2>{localize(note.title, locale)}</h2>
            <p>{localize(note.excerpt, locale)}</p>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
