import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {locales, resolveLocale, type Locale} from '@/i18n/config';
import {profile} from '@/content/profile';
import {localize} from '@/lib/content';
import {buildPageMetadata} from '@/lib/metadata';
import {PageShell} from '@/components/layout/page-shell';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({
    locale,
    title: locale === 'ja' ? 'Miki の小さな世界' : locale === 'en' ? "Miki's little world" : 'Miki 的奇幻世界',
    description: localize(profile.intro, locale)
  });
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  return <PageShell locale={locale}>{children}</PageShell>;
}
