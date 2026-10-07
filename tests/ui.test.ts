import {describe, expect, it} from 'vitest';
import {locales} from '@/i18n/config';
import {ui} from '@/i18n/ui';

describe('shared UI copy', () => {
  it('provides the required shared labels in every supported locale', () => {
    for (const locale of locales) {
      expect(ui[locale].navigation.home).not.toHaveLength(0);
      expect(ui[locale].common.backHome).not.toHaveLength(0);
      expect(ui[locale].notes.more).not.toHaveLength(0);
      expect(ui[locale].notes.all).not.toHaveLength(0);
      expect(ui[locale].notes.readingTime(1)).not.toHaveLength(0);
      expect(ui[locale].player.play).not.toHaveLength(0);
      expect(ui[locale].theme.useDark).not.toHaveLength(0);
    }
  });
});
