import fs from 'node:fs';
import path from 'node:path';
import type {Note, LocalizedText} from './types';

type Meta = {slug: string; date: string; category: Note['category']; title: LocalizedText; excerpt: LocalizedText; relatedSlugs?: readonly string[]};
function readSections(file: string, locale: keyof LocalizedText) {
  const source = fs.readFileSync(file, 'utf8');
  return source.split(/^## /m).filter(Boolean).map((chunk) => { const [heading, ...body] = chunk.split('\n'); return {heading: {[locale]: heading.trim()} as LocalizedText, paragraphs: {[locale]: body.join('\n').split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean)} as Record<keyof LocalizedText, string[]>}; });
}
export function loadMarkdownNote(meta: Meta): Note {
  const folder = path.join(process.cwd(), 'content', 'notes', meta.slug);
  const sectionsByLocale = (['zh-TW', 'en', 'ja'] as const).map((locale) => readSections(path.join(folder, `${locale}.md`), locale));
  const sectionCount = sectionsByLocale[0].length;
  for (const [index, sections] of sectionsByLocale.entries()) {
    if (sections.length !== sectionCount) {
      const locale = (['zh-TW', 'en', 'ja'] as const)[index];
      throw new Error(`Note ${meta.slug} has ${sectionCount} sections in zh-TW but ${sections.length} in ${locale}`);
    }
  }
  return {slug: meta.slug, title: meta.title, excerpt: meta.excerpt, date: meta.date, category: meta.category, relatedSlugs: meta.relatedSlugs, sections: sectionsByLocale[0].map((_, index) => ({heading: Object.fromEntries((['zh-TW', 'en', 'ja'] as const).map((locale, localeIndex) => [locale, sectionsByLocale[localeIndex]![index]!.heading[locale]])) as LocalizedText, paragraphs: Object.fromEntries((['zh-TW', 'en', 'ja'] as const).map((locale, localeIndex) => [locale, sectionsByLocale[localeIndex]![index]!.paragraphs[locale]])) as Record<'zh-TW' | 'en' | 'ja', string[]>}))};
}
