'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';
import {ThemeToggle} from './theme-toggle';

export function SiteHeader({locale}: {locale: Locale}) {
  const pathname = usePathname() ?? '';
  const copy = ui[locale];
  const suffix = pathname === '/' ? '' : pathname.replace(/^\/(zh-TW|en|ja)(?=\/|$)/, '');

  return (
    <header className="topbar">
      <Link className="wordmark" href={localizedPath(locale)}>Miki</Link>
      <nav className="topnav" aria-label={copy.navigation.label}>
        <Link href={localizedPath(locale)}>{copy.navigation.home}</Link>
        <Link href={localizedPath(locale, '/about')}>{copy.navigation.about}</Link>
        <Link href={localizedPath(locale, '/projects')}>{copy.navigation.projects}</Link>
        <Link href={localizedPath(locale, '/notes')}>{copy.navigation.notes}</Link>
        <Link href={localizedPath(locale, '/timeline')}>{copy.navigation.timeline}</Link>
      </nav>
      <div className="header-controls"><nav className="language-links" aria-label="Language">{(['zh-TW', 'en', 'ja'] as Locale[]).map((item) => <Link className={item === locale ? 'is-current' : ''} href={localizedPath(item, suffix)} hrefLang={item} key={item}>{item === 'zh-TW' ? '中' : item === 'ja' ? '日' : 'EN'}</Link>)}</nav><ThemeToggle locale={locale} /></div>
    </header>
  );
}
