import {resolveLocale} from '@/i18n/config';
import {notes} from '@/content/notes';
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
      <div className="page-notes">
        {notes.map((note) => (
          <article className="page-note" key={note.slug}>
            <time>{note.date} · {note.category}</time>
            <h2><Link href={localizedPath(locale, `/notes/${note.slug}`)}>{localize(note.title, locale)}</Link></h2>
            <p>{localize(note.excerpt, locale)}</p>
            <Link className="text-link" href={localizedPath(locale, `/notes/${note.slug}`)}>{ui[locale].notes.more}</Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
