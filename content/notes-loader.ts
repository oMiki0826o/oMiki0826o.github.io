import fs from 'node:fs';
import path from 'node:path';
import type {LocalizedText, Note} from './types';

type Locale = keyof LocalizedText;
type Meta = {slug: string; date: string; category: Note['category']; title: LocalizedText; excerpt: LocalizedText; relatedSlugs?: readonly string[]};
type LocalizedSections = {heading: string; paragraphs: string[]};
const locales = ['zh-TW', 'en', 'ja'] as const satisfies readonly Locale[];

function readLocalizedSections(file: string): LocalizedSections[] {
  const source = fs.readFileSync(file, 'utf8');
  return source.split(/^## /m).filter(Boolean).map((chunk) => {
    const [heading, ...body] = chunk.split('\n');
    return {heading: heading?.trim() ?? '', paragraphs: body.join('\n').split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean)};
  });
}

function readSectionsForLocale(folder: string, locale: Locale) {
  return readLocalizedSections(path.join(folder, `${locale}.md`));
}

function validateSectionCounts(slug: string, sectionsByLocale: readonly LocalizedSections[][]) {
  const expected = sectionsByLocale[0]?.length ?? 0;
  sectionsByLocale.forEach((sections, index) => {
    if (sections.length !== expected) throw new Error(`Note ${slug} has ${expected} sections in zh-TW but ${sections.length} in ${locales[index]}`);
  });
}

function mergeSections(sectionsByLocale: readonly LocalizedSections[][]): Note['sections'] {
  return sectionsByLocale[0]!.map((_, index) => ({
    heading: Object.fromEntries(locales.map((locale, localeIndex) => [locale, sectionsByLocale[localeIndex]![index]!.heading])) as LocalizedText,
    paragraphs: Object.fromEntries(locales.map((locale, localeIndex) => [locale, sectionsByLocale[localeIndex]![index]!.paragraphs])) as Record<Locale, string[]>
  }));
}

export function loadMarkdownNote(meta: Meta): Note {
  const folder = path.join(process.cwd(), 'content', 'notes', meta.slug);
  const sectionsByLocale = locales.map((locale) => readSectionsForLocale(folder, locale));
  validateSectionCounts(meta.slug, sectionsByLocale);
  return {...meta, sections: mergeSections(sectionsByLocale)};
}
