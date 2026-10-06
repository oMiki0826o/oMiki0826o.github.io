import {describe, expect, it} from 'vitest';
import {getLinkHubItems, getProfile, getQuote, localize} from '@/lib/content';

describe('profile content', () => {
  it('returns English profile copy for en', () => {
    expect(getProfile('en').subtitle).toBeTruthy();
  });

  it('falls back to Chinese copy when a localized entry is unavailable', () => {
    expect(localize({'zh-TW': '中文'}, 'ja')).toBe('中文');
  });

  it('localizes link-hub labels and selects a quote deterministically', () => {
    expect(getLinkHubItems('ja')[0]?.label).toBe('プロフィール');
    expect(getQuote('en', () => 0.9)).toBe('Let curiosity lead.');
  });
});
