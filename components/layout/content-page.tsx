import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {SiteFooter} from './site-footer';

export function ContentPage({
  locale,
  eyebrow,
  title,
  lead,
  children
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <main className="content-page">
      <Link className="back-link" href={localizedPath(locale)}>← {locale === 'ja' ? 'ホームへ' : '回到首頁'}</Link>
      <p className="content-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="content-lead">{lead}</p>
      {children}
      <SiteFooter locale={locale} />
    </main>
  );
}
