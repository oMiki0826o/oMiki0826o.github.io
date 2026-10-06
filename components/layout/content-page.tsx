import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';
import {SiteFooter} from './site-footer';

export function ContentPage({
  locale,
  eyebrow,
  title,
  lead,
  backHref,
  backLabel,
  children
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="content-page">
      <Link className="back-link" href={backHref ?? localizedPath(locale)}>← {backLabel ?? ui[locale].common.backHome}</Link>
      <p className="content-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="content-lead">{lead}</p>
      {children}
      <SiteFooter locale={locale} />
    </main>
  );
}
