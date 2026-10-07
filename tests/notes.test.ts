import {describe, expect, it} from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {locales} from '@/i18n/config';
import {getNote, notes} from '@/content/notes/index';
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

  it('keeps the same section count across every translation', () => {
    for (const note of notes) {
      expect(note.sections.map((section) => section.heading.en)).toHaveLength(note.sections.length);
    }
  });

  it('stores every note as an independent multilingual content entry', () => {
    const notesRoot = path.join(process.cwd(), 'content', 'notes');

    for (const note of notes) {
      const folder = path.join(notesRoot, note.slug);
      expect(fs.existsSync(path.join(folder, 'meta.ts'))).toBe(true);
      for (const locale of locales) {
        expect(fs.existsSync(path.join(folder, `${locale}.md`))).toBe(true);
      }
    }
  });

  it('finds existing notes by slug', () => {
    expect(getNote('discord-bot-from-zero')?.title.en).toBe('How Firefly Bot grew');
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

  it('keeps the two night-sky notes together under Astronomy', () => {
    expect(getNote('seasonal-night-sky-guide')?.category).toBe('Astronomy');
    expect(getNote('spacetime-and-gravitational-waves')?.category).toBe('Astronomy');
  });

  it('keeps editorial related reading links in note metadata', () => {
    expect(getNote('discord-bot-usage-guide')?.relatedSlugs).toEqual([
      'discord-bot-mod-guide',
      'discord-bot-from-zero'
    ]);
  });

  it('does not leave related reading links pointing at missing notes', () => {
    const slugs = new Set(notes.map((note) => note.slug));
    for (const note of notes) {
      for (const relatedSlug of note.relatedSlugs ?? []) {
        expect(slugs.has(relatedSlug), `${note.slug} references ${relatedSlug}`).toBe(true);
      }
    }
  });

  it('publishes the research presentation without editor-facing disclaimers', () => {
    const guide = getNote('ultrasonic-call-study-notes');

    expect(guide?.title['zh-TW']).toBe('幼鼠超音波叫聲研究紀錄與發表');
    expect(guide?.excerpt['zh-TW']).not.toContain('已隱去');
    expect(guide?.sections).toHaveLength(5);
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
