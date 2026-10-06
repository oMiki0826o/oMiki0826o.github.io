import {resolveLocale} from '@/i18n/config';
import {HomePage} from '@/components/home/home-page';

export default async function LocaleHome({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return <HomePage locale={locale} />;
}
