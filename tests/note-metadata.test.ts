import {describe, expect, it} from 'vitest';
import {estimateReadingMinutes} from '@/lib/note-metadata';
import {getNote} from '@/content/notes';

describe('note metadata', () => {
  it('always gives a populated note at least one minute of reading time', () => {
    const note = getNote('discord-bot-usage-guide');

    expect(note).toBeDefined();
    expect(estimateReadingMinutes(note!, 'zh-TW')).toBeGreaterThanOrEqual(1);
    expect(estimateReadingMinutes(note!, 'en')).toBeGreaterThanOrEqual(1);
    expect(estimateReadingMinutes(note!, 'ja')).toBeGreaterThanOrEqual(1);
  });
});
