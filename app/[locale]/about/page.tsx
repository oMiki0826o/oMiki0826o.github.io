import {resolveLocale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="about"
      title={localize(profile.aboutTitle, locale)}
      lead={locale === 'ja' ? '作ること、試すこと、少しずつ整えていくこと。' : locale === 'en' ? 'Making, trying, and refining things a little at a time.' : '把想法拆開、做成工具，再慢慢把它修到穩定可用。'}
    >
      <div className="prose">
        {profile.about[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="tags">{profile.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
    </ContentPage>
  );
}
