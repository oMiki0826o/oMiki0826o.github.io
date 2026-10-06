import Link from 'next/link';
import {resolveLocale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';

export default async function LocaleNotFound({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  const copy = ui[locale].notFound;
  return <main className="content-page"><p className="content-eyebrow">404</p><h1>{copy.title}</h1><p className="content-lead">{copy.lead}</p><Link className="back-link" href={localizedPath(locale)}>← {copy.back}</Link></main>;
}
