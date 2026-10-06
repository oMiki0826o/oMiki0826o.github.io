'use client';

import {useTheme} from 'next-themes';

export function ThemeToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const next = resolvedTheme === 'dark' ? 'light' : 'dark';
  return <button className="theme-toggle" type="button" aria-label="Toggle theme" onClick={() => setTheme(next)}>{resolvedTheme === 'dark' ? '☀' : '☾'}</button>;
}
