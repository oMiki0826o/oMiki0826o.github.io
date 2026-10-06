import type {Metadata} from 'next';
import {locales, type Locale} from '@/i18n/config';

export const siteUrl = 'https://omiki0826o.github.io';

type MetadataInput = {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
};

function normalizePathname(pathname = '/') {
  const normalized = `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return normalized === '/' ? '/' : normalized;
}

export function localizedUrl(locale: Locale, pathname = '/') {
  const normalized = normalizePathname(pathname);
  if (locale === 'zh-TW' && normalized === '/') return '/';
  return `/${locale}${normalized === '/' ? '/' : `${normalized}/`}`;
}

export function buildPageMetadata({locale, pathname = '/', title, description}: MetadataInput): Metadata {
  const normalized = normalizePathname(pathname);
  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(locale, normalized),
      languages: Object.fromEntries(locales.map((item) => [item, localizedUrl(item, normalized)]))
    }
  };
}
