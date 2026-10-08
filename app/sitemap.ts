import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/config';
import {localizedUrl, siteUrl} from '@/lib/metadata';
import {notes} from '@/content/notes/index';
import {projects} from '@/content/projects';

export const dynamic = 'force-static';

const paths = ['/', '/about', '/projects', '/notes', '/timeline'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...paths.map((pathname) => ({
      url: new URL(localizedUrl(locale, pathname), siteUrl).toString(),
      changeFrequency: 'monthly' as const,
      priority: pathname === '/' ? 1 : 0.7
    })),
    ...notes.map((note) => ({
      url: new URL(localizedUrl(locale, `/notes/${note.slug}`), siteUrl).toString(),
      changeFrequency: 'yearly' as const,
      priority: 0.6
    })),
    ...projects.map((project) => ({
      url: new URL(localizedUrl(locale, `/projects/${project.slug}`), siteUrl).toString(),
      changeFrequency: 'yearly' as const,
      priority: 0.7
    }))
  ]);
}
