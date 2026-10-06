import {describe, expect, it} from 'vitest';
import {locales, resolveLocale} from '@/i18n/config';

describe('locale configuration', () => {
  it('supports only Traditional Chinese and Japanese', () => {
    expect(locales).toEqual(['zh-TW', 'ja']);
  });

  it('uses zh-TW as the fallback locale', () => {
    expect(resolveLocale('fr')).toBe('zh-TW');
  });

  it.each(['zh-TW', 'ja'])('accepts %s', (locale) => {
    expect(resolveLocale(locale)).toBe(locale);
  });
});
