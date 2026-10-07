'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import type {Locale} from '@/i18n/config';
import {localizedPath} from '@/lib/content';
import {ui} from '@/i18n/ui';
import {ThemeToggle} from './theme-toggle';

export function SiteHeader({locale}: {locale: Locale}) {
  const pathname = usePathname() ?? '';
  const copy = ui[locale];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const suffix = pathname === '/' ? '' : pathname.replace(/^\/(zh-TW|en|ja)(?=\/|$)/, '');
  const navigation = [
    {href: localizedPath(locale), label: copy.navigation.home},
    {href: localizedPath(locale, '/about'), label: copy.navigation.about},
    {href: localizedPath(locale, '/projects'), label: copy.navigation.projects},
    {href: localizedPath(locale, '/notes'), label: copy.navigation.notes},
    {href: localizedPath(locale, '/timeline'), label: copy.navigation.timeline}
  ];

  return (
    <header className="topbar">
      <button className="menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="site-menu" aria-label={isMenuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu}>
        <span /><span /><span />
      </button>
      <Link className="wordmark" href={localizedPath(locale)}>Miki</Link>
      <div className="header-controls"><nav className="language-links" aria-label="Language">{(['zh-TW', 'en', 'ja'] as Locale[]).map((item) => <Link className={item === locale ? 'is-current' : ''} href={localizedPath(item, suffix)} hrefLang={item} key={item}>{item === 'zh-TW' ? '中' : item === 'ja' ? '日' : 'EN'}</Link>)}</nav><ThemeToggle locale={locale} /></div>
      {isMenuOpen ? <nav className="site-menu" id="site-menu" aria-label={copy.navigation.label}>{navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>)}</nav> : null}
    </header>
  );
}
