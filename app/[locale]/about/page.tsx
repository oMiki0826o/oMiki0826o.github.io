import {resolveLocale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {pinnedTimeline} from '@/content/timeline';
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
      <section className="about-timeline" aria-label={ui[locale].sections.timeline}>
        <h2>{ui[locale].sections.timeline}</h2>
        <div className="timeline">{pinnedTimeline.map((item) => <article className="event" key={item.year + item.title['zh-TW']}><time>{item.year}</time><h3>{localize(item.title, locale)}</h3><p>{localize(item.description, locale)}</p></article>)}</div>
      </section>
      <section className="about-connect" aria-label="Links">
        <h2>{locale === 'zh-TW' ? '其他地方的我' : locale === 'ja' ? 'リンク' : 'Elsewhere'}</h2>
        <div className="about-links">
          <a href="https://github.com/oMiki0826o" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://discord.com/users/839381498351190036" target="_blank" rel="noopener noreferrer">Discord ↗</a>
          <a href="/feed.xml">RSS ↗</a>
        </div>
      </section>
    </ContentPage>
  );
}
