import Link from 'next/link';
import {locales, type Locale} from '@/i18n/config';

const labels: Record<Locale, string> = {'zh-TW': '中', en: 'EN', ja: '日'};

export function LocaleSwitcher({locale, path = ''}: {locale: Locale; path?: string}) {
  return <nav className="locale-switcher" aria-label="Language">{locales.map((item) => <Link aria-current={item === locale ? 'page' : undefined} href={`/${item}${path}`} key={item}>{labels[item]}</Link>)}</nav>;
}
