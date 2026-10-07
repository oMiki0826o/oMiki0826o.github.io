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

  it('publishes a complete Discord Bot usage guide', () => {
    const guide = getNote('discord-bot-usage-guide');

    expect(guide?.title['zh-TW']).toBe('Discord Bot 使用教學');
    expect(guide?.sections).toHaveLength(4);
  });

  it('publishes a human-readable Module authoring guide', () => {
    const guide = getNote('discord-bot-mod-guide');

    expect(guide?.title['zh-TW']).toBe('Discord Bot Mod 撰寫教學');
    expect(guide?.sections).toHaveLength(4);
  });

  it('publishes a practical guide to the seasonal night sky', () => {
    const guide = getNote('seasonal-night-sky-guide');

    expect(guide?.title['zh-TW']).toBe('夜空入門：從北極星開始認星');
    expect(guide?.sections).toHaveLength(5);
  });

  it('publishes an anonymized introduction to spacetime and gravitational waves', () => {
    const guide = getNote('spacetime-and-gravitational-waves');

    expect(guide?.title['zh-TW']).toBe('從幾何到重力波：時空的入門筆記');
    expect(guide?.sections).toHaveLength(5);
    expect(JSON.stringify(guide)).not.toContain('政大附中');
  });

  it('publishes an anonymized note on studying ultrasonic calls', () => {
    const guide = getNote('ultrasonic-call-study-notes');

    expect(guide?.title['zh-TW']).toBe('幼鼠超音波叫聲研究紀錄與發表');
    expect(guide?.sections).toHaveLength(5);
    expect(guide?.sections[3]?.heading['zh-TW']).toBe('目前結果：叫聲結構出現差異');
    expect(JSON.stringify(guide)).not.toContain('臺師大');
  });

  it('exports a page for every locale and note', async () => {
    const params = await generateStaticParams();

    expect(params).toHaveLength(notes.length * locales.length);
    expect(params).toContainEqual({locale: 'en', slug: 'about-me'});
    expect(params).toContainEqual({locale: 'ja', slug: 'discord-bot-from-zero'});
    expect(params).toContainEqual({locale: 'zh-TW', slug: 'discord-bot-usage-guide'});
    expect(params).toContainEqual({locale: 'en', slug: 'discord-bot-mod-guide'});
    expect(params).toContainEqual({locale: 'ja', slug: 'seasonal-night-sky-guide'});
    expect(params).toContainEqual({locale: 'en', slug: 'spacetime-and-gravitational-waves'});
    expect(params).toContainEqual({locale: 'zh-TW', slug: 'ultrasonic-call-study-notes'});
  });
});
