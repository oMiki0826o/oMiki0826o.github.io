import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {locales, resolveLocale, type Locale} from '@/i18n/config';
import {SiteChrome} from '@/components/layout/site-chrome';

type Props = Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return {
    title: locale === 'ja' ? 'Mikiの小さな世界' : locale === 'en' ? "Miki's little world" : 'Miki 的小小世界',
    alternates: {languages: {'zh-TW': '/zh-TW', en: '/en', ja: '/ja'}}
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  return <div lang={rawLocale}><SiteChrome locale={rawLocale as Locale} />{children}</div>;
}
