import {resolveLocale} from '@/i18n/config';
import {timeline} from '@/content/timeline';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';

export default async function TimelinePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="timeline"
      title={locale === 'ja' ? 'これまでの記録' : locale === 'en' ? 'The way here' : '一路走來'}
      lead={locale === 'ja' ? '学びながら作ってきたものの記録。' : locale === 'en' ? 'A record of learning and making along the way.' : '一路學、一邊做留下來的紀錄。'}
    >
      <div className="timeline">
        {timeline.map((item) => (
          <article className="event" key={`${item.year}-${item.title['zh-TW']}`}>
            <time>{item.year}</time>
            <h3>{localize(item.title, locale)}</h3>
            <p>{localize(item.description, locale)}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
