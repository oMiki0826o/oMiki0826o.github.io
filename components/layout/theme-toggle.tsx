'use client';

import {useEffect, useState} from 'react';
import type {Locale} from '@/i18n/config';
import {ui} from '@/i18n/ui';

export function ThemeToggle({locale}: {locale: Locale}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'), []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('miki-theme', next);
    setTheme(next);
  };
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={theme === 'dark' ? ui[locale].theme.useLight : ui[locale].theme.useDark}>{theme === 'dark' ? '☀' : '☾'}</button>;
}
