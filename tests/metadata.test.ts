import {describe, expect, it} from 'vitest';
import {buildPageMetadata} from '@/lib/metadata';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('page metadata', () => {
  it('keeps an English subpage canonical on its own locale and path', () => {
    const metadata = buildPageMetadata({
      locale: 'en',
      pathname: '/about',
      title: 'About',
      description: 'About Miki'
    });

    expect(metadata.alternates?.canonical).toBe('/en/about/');
    expect(metadata.alternates?.languages).toMatchObject({
      'zh-TW': '/zh-TW/about/',
      en: '/en/about/',
      ja: '/ja/about/'
    });
  });

  it('keeps a Japanese subpage canonical on its own locale and path', () => {
    const metadata = buildPageMetadata({
      locale: 'ja',
      pathname: '/notes',
      title: 'Notes',
      description: 'Miki notes'
    });

    expect(metadata.alternates?.canonical).toBe('/ja/notes/');
    expect(metadata.alternates?.languages).toMatchObject({
      'zh-TW': '/zh-TW/notes/',
      en: '/en/notes/',
      ja: '/ja/notes/'
    });
  });
});

describe('discovery routes', () => {
  it('lists every localized top-level page in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain('https://omiki0826o.github.io/');
    expect(urls).toContain('https://omiki0826o.github.io/en/projects/');
    expect(urls).toContain('https://omiki0826o.github.io/ja/timeline/');
  });

  it('allows crawlers while advertising the sitemap', () => {
    const config = robots();

    expect(config.rules).toMatchObject({userAgent: '*', allow: '/'});
    expect(config.sitemap).toBe('https://omiki0826o.github.io/sitemap.xml');
  });
});
