'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';

const labels = {
  'zh-TW': {about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline'},
  ja: {about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline'}
} as const;

export function SiteHeader({locale}: {locale: Locale}) {
  const pathname = usePathname() ?? '';
  const otherLocale: Locale = locale === 'zh-TW' ? 'ja' : 'zh-TW';
  const languageLabel = locale === 'zh-TW' ? '日' : '中';
  const copy = labels[locale];
  const suffix = pathname === '/' ? '' : pathname.replace(/^\/(zh-TW|ja)(?=\/|$)/, '');

  return (
    <header className="topbar">
      <Link className="wordmark" href={localizedPath(locale)}>miki.</Link>
      <nav className="topnav" aria-label={locale === 'ja' ? 'メインナビゲーション' : '主要導覽'}>
        <Link href={localizedPath(locale, '/about')}>{copy.about}</Link>
        <Link href={localizedPath(locale, '/projects')}>{copy.projects}</Link>
        <Link href={localizedPath(locale, '/notes')}>{copy.notes}</Link>
        <Link href={localizedPath(locale, '/timeline')}>{copy.timeline}</Link>
      </nav>
      <Link className="lang" href={localizedPath(otherLocale, suffix)} hrefLang={otherLocale}>
        {languageLabel}
      </Link>
    </header>
  );
}
