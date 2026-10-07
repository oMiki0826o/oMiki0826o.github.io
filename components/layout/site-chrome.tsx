import Link from 'next/link';
import type {Locale} from '@/i18n/config';
import {LocaleSwitcher} from './locale-switcher';
import {ThemeToggle} from './theme-toggle';

export function SiteChrome({locale}: {locale: Locale}) {
  return <header className="site-chrome">
    <Link className="wordmark" href={`/${locale}`} aria-label="Miki home">miki</Link>
    <div className="nav-controls"><LocaleSwitcher locale={locale} /><ThemeToggle locale={locale} /></div>
  </header>;
}
