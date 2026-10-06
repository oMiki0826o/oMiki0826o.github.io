import {resolveLocale} from '@/i18n/config';
import {notes} from '@/content/notes';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import Link from 'next/link';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';

export default async function NotesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="notes"
      title={ui[locale].sections.notes}
      lead={locale === 'ja' ? '開発記録、つまずきのメモ、ときどき技術以外のこと。' : locale === 'en' ? 'Development notes, lessons learned, and occasional non-technical thoughts.' : '開發紀錄、踩坑筆記，以及偶爾不那麼技術的東西。'}
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
