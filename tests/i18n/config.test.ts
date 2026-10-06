import {describe, expect, it} from 'vitest';
import {resolveLocale} from '@/i18n/config';

describe('locale configuration', () => {
  it('uses zh-TW as the fallback locale', () => {
    expect(resolveLocale('fr')).toBe('zh-TW');
  });

  it.each(['zh-TW', 'en', 'ja'])('accepts %s', (locale) => {
    expect(resolveLocale(locale)).toBe(locale);
  });
});
