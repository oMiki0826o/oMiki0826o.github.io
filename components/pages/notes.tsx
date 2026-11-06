import type {Locale} from '@/i18n/config';
import type {Note} from '@/content/types';
import {ContentPage} from '@/components/layout/content-page';
import {ui} from '@/i18n/ui';
import {NotesIndex} from '@/components/notes/notes-index';

export function NotesPage({locale, notes, featuredNote}: {locale: Locale; notes: Note[]; featuredNote?: Note}) {
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
