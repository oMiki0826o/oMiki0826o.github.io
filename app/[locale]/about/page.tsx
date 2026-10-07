import {resolveLocale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {ui} from '@/i18n/ui';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({locale, pathname: '/about', title: localize(profile.aboutTitle, locale), description: ui[locale].pages.aboutLead});
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
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
