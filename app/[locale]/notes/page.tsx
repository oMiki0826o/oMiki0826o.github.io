import {resolveLocale} from '@/i18n/config';
import {notes} from '@/content/notes';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';

export default async function NotesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="notes"
      title={locale === 'ja' ? '記事と記録' : '文章與紀錄'}
      lead={locale === 'ja' ? '開発記録、つまずきのメモ、ときどき技術以外のこと。' : '開發紀錄、踩坑筆記，以及偶爾不那麼技術的東西。'}
    >
      <div className="page-notes">
        {notes.map((note) => (
          <article className="page-note" key={note.slug}>
            <time>{note.date} · {note.category}</time>
            <h2>{localize(note.title, locale)}</h2>
            <p>{localize(note.excerpt, locale)}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
