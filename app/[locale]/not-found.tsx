'use client';

import Link from 'next/link';
import {useParams} from 'next/navigation';
import {resolveLocale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';

export default function LocaleNotFound() {
  const params = useParams<{locale?: string}>();
  const locale = resolveLocale(params?.locale);
  const copy = ui[locale].notFound;
  return <main className="content-page"><p className="content-eyebrow">404</p><h1>{copy.title}</h1><p className="content-lead">{copy.lead}</p><Link className="back-link" href={localizedPath(locale)}>← {copy.back}</Link></main>;
}
