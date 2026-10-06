'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ThemeToggle} from './theme-toggle';

const labels = {
  'zh-TW': {about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline'},
  en: {about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline'},
  ja: {about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline'}
} as const;

export function SiteHeader({locale}: {locale: Locale}) {
  const pathname = usePathname() ?? '';
  const copy = labels[locale];
  const suffix = pathname === '/' ? '' : pathname.replace(/^\/(zh-TW|en|ja)(?=\/|$)/, '');

  return (
    <header className="topbar">
      <Link className="wordmark" href={localizedPath(locale)}>miki.</Link>
      <nav className="topnav" aria-label={locale === 'ja' ? 'メインナビゲーション' : '主要導覽'}>
        <Link href={localizedPath(locale, '/about')}>{copy.about}</Link>
        <Link href={localizedPath(locale, '/projects')}>{copy.projects}</Link>
        <Link href={localizedPath(locale, '/notes')}>{copy.notes}</Link>
        <Link href={localizedPath(locale, '/timeline')}>{copy.timeline}</Link>
      </nav>
      <div className="header-controls"><nav className="language-links" aria-label="Language">{(['zh-TW', 'en', 'ja'] as Locale[]).map((item) => <Link className={item === locale ? 'is-current' : ''} href={localizedPath(item, suffix)} hrefLang={item} key={item}>{item === 'zh-TW' ? '中' : item === 'ja' ? '日' : 'EN'}</Link>)}</nav><ThemeToggle /></div>
    </header>
  );
}
