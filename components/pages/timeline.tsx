import type {Locale} from '@/i18n/config';
import {timeline} from '@/content/timeline';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import {ui} from '@/i18n/ui';

export function TimelinePage({locale}: {locale: Locale}) {
  return (
    <ContentPage
      locale={locale}
      eyebrow="timeline"
      title={ui[locale].pages.timelineTitle}
      lead={ui[locale].pages.timelineLead}
    >
      <div className="timeline">
        {timeline.map((item) => (
          <article className="event timeline-reveal" key={`${item.year}-${item.title['zh-TW']}`}>
            <time>{item.year}</time>
            <h3>{localize(item.title, locale)}</h3>
            <p>{localize(item.description, locale)}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
