import {describe, expect, it} from 'vitest';
import {buildPageMetadata} from '@/lib/metadata';

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
