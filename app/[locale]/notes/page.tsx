import {resolveLocale} from '@/i18n/config';
import {featuredNote, notes} from '@/content/notes';
import {ContentPage} from '@/components/layout/content-page';
import {ui} from '@/i18n/ui';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {NotesIndex} from '@/components/notes/notes-index';

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
      <NotesIndex locale={locale} notes={notes} featuredNote={featuredNote} />
    </ContentPage>
  );
}
