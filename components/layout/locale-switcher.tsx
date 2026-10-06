'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {locales, type Locale} from '@/i18n/config';

const labels: Record<Locale, string> = {'zh-TW': '中', ja: '日'};

export function LocaleSwitcher({locale}: {locale: Locale}) {
  const pathname = usePathname() ?? '';
  const path = pathname.replace(/^\/(zh-TW|ja)(?=\/|$)/, '') || '';
  return <nav className="locale-switcher" aria-label="Language">{locales.map((item) => <Link aria-current={item === locale ? 'page' : undefined} href={`/${item}${path}`} key={item}>{labels[item]}</Link>)}</nav>;
}
