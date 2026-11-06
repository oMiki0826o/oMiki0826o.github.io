import type {Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import {ui} from '@/i18n/ui';

export function AboutPage({locale}: {locale: Locale}) {
  return (
    <ContentPage
      locale={locale}
      eyebrow="about"
      title={localize(profile.aboutTitle, locale)}
      lead={ui[locale].pages.aboutLead}
    >
      <div className="prose about-details about-profile">
        {profile.aboutDetails[locale].map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      </div>
      <div className="tags">{profile.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
    </ContentPage>
  );
}
