import {describe, expect, it} from 'vitest';
import {locales} from '@/i18n/config';
import {getNote, notes} from '@/content/notes';
import {generateStaticParams} from '@/app/[locale]/notes/[slug]/page';

describe('note content', () => {
  it('keeps each note structurally complete in all three languages', () => {
    for (const note of notes) {
      expect(note.sections.length).toBeGreaterThan(0);
      for (const section of note.sections) {
        for (const locale of locales) {
          expect(section.heading[locale]).not.toHaveLength(0);
          expect(section.paragraphs[locale].length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('finds existing notes by slug', () => {
    expect(getNote('discord-bot-from-zero')?.title.en).toBe('Building a Discord Bot from scratch');
    expect(getNote('missing-note')).toBeUndefined();
  });

  it('exports a page for every locale and note', async () => {
    const params = await generateStaticParams();

    expect(params).toHaveLength(notes.length * locales.length);
    expect(params).toContainEqual({locale: 'en', slug: 'about-me'});
    expect(params).toContainEqual({locale: 'ja', slug: 'discord-bot-from-zero'});
  });
});
