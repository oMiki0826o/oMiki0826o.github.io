import {resolveLocale} from '@/i18n/config';
import {timeline} from '@/content/timeline';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {ui} from '@/i18n/ui';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({locale, pathname: '/timeline', title: ui[locale].pages.timelineTitle, description: ui[locale].pages.timelineLead});
}

export default async function TimelinePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="timeline"
      title={ui[locale].pages.timelineTitle}
      lead={ui[locale].pages.timelineLead}
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
