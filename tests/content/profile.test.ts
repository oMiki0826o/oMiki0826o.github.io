import {describe, expect, it} from 'vitest';
import {getLinkHubItems, getProfile, getQuote, localize} from '@/lib/content';

describe('profile content', () => {
  it('returns Japanese profile copy for ja', () => {
    expect(getProfile('ja').subtitle).toBe('Mikiの小さな世界');
  });

  it('falls back to Chinese copy when a localized entry is unavailable', () => {
    expect(localize({'zh-TW': '中文'}, 'ja')).toBe('中文');
  });

  it('localizes link-hub labels and selects a quote deterministically', () => {
    expect(getLinkHubItems('ja')[0]?.label).toBe('プロフィール');
    expect(getQuote('ja', () => 0.9)).toBe('好奇心に導かれて。');
  });
});
