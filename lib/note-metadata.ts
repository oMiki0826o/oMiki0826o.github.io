import type {Note} from '@/content/types';
import type {Locale} from '@/i18n/config';

export function estimateReadingMinutes(note: Note, locale: Locale) {
  const text = note.sections.flatMap((section) => [section.heading[locale], ...section.paragraphs[locale]]).join(' ');
  const charactersPerMinute = locale === 'en' ? 900 : 450;
  return Math.max(1, Math.ceil(text.length / charactersPerMinute));
}

export function formatNoteDate(date: string, locale: Locale) {
  const language = locale === 'zh-TW' ? 'zh-TW' : locale === 'ja' ? 'ja-JP' : 'en-US';
  return new Intl.DateTimeFormat(language, {year: 'numeric', month: 'short', day: 'numeric'}).format(new Date(`${date}T00:00:00Z`));
}
