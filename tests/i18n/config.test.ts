import {describe, expect, it} from 'vitest';
import {locales, resolveLocale} from '@/i18n/config';

describe('locale configuration', () => {
  it('supports Traditional Chinese and Japanese', () => {
    expect(locales).toEqual(['zh-TW', 'ja']);
  });

  it('falls back to zh-TW', () => {
    expect(resolveLocale('fr')).toBe('zh-TW');
  });
});
