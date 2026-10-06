import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/config';
import {localizedUrl, siteUrl} from '@/lib/metadata';

const paths = ['/', '/about', '/projects', '/notes', '/timeline'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => paths.map((pathname) => ({
    url: new URL(localizedUrl(locale, pathname), siteUrl).toString(),
    changeFrequency: 'monthly' as const,
    priority: pathname === '/' ? 1 : 0.7
  })));
}
