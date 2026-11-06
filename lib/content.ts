import type {Locale} from '@/i18n/config';
import type {LocalizedText} from '@/content/types';

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value['zh-TW'];
}

export function localizedPath(locale: Locale, path = ''): string {
  const suffix = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  return `/${locale}${suffix}`.replace(/\/+$/, '') + '/';
}
