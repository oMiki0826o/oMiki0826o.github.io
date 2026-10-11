/*
 * File: notes-loader.ts
 * Modification: 2026-10-11 — 由 StructMark V1.1 AST 建立三語章節及安全 HTML。
 */
import fs from 'node:fs';
import path from 'node:path';
import type {LocalizedText, Note} from './types';
import {parseDocument, renderHtml} from '@/lib/structmark/core/index';
import type {BlockNode, Document, InlineNode} from '@/lib/structmark/core/types';

type Locale = keyof LocalizedText;
type Meta = {slug: string; date: string; category: Note['category']; title: LocalizedText; excerpt: LocalizedText; relatedSlugs?: readonly string[]};
type LocalizedSection = {heading: string; id: string; paragraphs: string[]; html: string};
type ParsedLocalizedNote = {sections: LocalizedSection[]; projectSlug: string | undefined};
const locales = ['zh-TW', 'en', 'ja'] as const satisfies readonly Locale[];

// ── 從 AST 取得純文字，供目錄及閱讀時間使用 ──
function inlineText(nodes: readonly InlineNode[]): string {
  return nodes.map((node) => {
    if ('value' in node) return node.value;
    if ('children' in node) return inlineText(node.children);
    if ('label' in node) return typeof node.label === 'string' ? node.label : inlineText(node.label);
    if ('target' in node) return node.target;
    return '';
  }).join('');
}

function textFromBlocks(nodes: readonly BlockNode[]): string[] {
  return nodes.flatMap((node): string[] => {
    if ('children' in node && Array.isArray(node.children)) {
      if (node.type === 'heading' || node.type === 'paragraph' || node.type === 'footnoteDef') return [inlineText(node.children)];
      return textFromBlocks(node.children as BlockNode[]);
    }
    if (node.type === 'codeBlock') return [node.value];
    if (node.type === 'list') return node.items.flatMap((item) => textFromBlocks(item.children));
    if (node.type === 'table') return [...node.header.flatMap(inlineText), ...node.rows.flat(1).map(inlineText)];
    return [];
  });
}

function renderBlocks(nodes: BlockNode[], metadata: Document['metadata']): string {
  const doc: Document = {type: 'document', version: '1.1', metadata, children: nodes, diagnostics: []};
  return renderHtml(doc, {math: 'katex'});
}

function parseLocalizedNote(source: string, file = '<memory>'): ParsedLocalizedNote {
  const parsed = parseDocument(source);
  const errors = parsed.diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  if (errors.length) throw new Error(`${file}: ${errors.map((d) => `${d.code} 第 ${d.position.line} 行：${d.message}`).join('; ')}`);
  const sections: LocalizedSection[] = [];
  let current: {heading: string; id: string | null; content: BlockNode[]} | null = null;
  const identifiers = new Set<string>();
  const flush = () => {
    if (!current) return;
    if (!current.content.length) throw new Error(`${file}: 章節「${current.heading}」沒有內容`);
    const id = current.id ?? `note-section-${sections.length + 1}`;
    if (identifiers.has(id)) throw new Error(`${file}: 重複章節識別碼 ${id}`);
    identifiers.add(id);
    sections.push({heading: current.heading, id, paragraphs: textFromBlocks(current.content).filter(Boolean), html: renderBlocks(current.content, parsed.metadata)});
  };
  for (const block of parsed.children) {
    if (block.type === 'heading' && block.level === 2) {
      flush();
      current = {heading: inlineText(block.children), id: block.id, content: []};
    } else if (current) {
      current.content.push(block);
    } else if (block.type !== 'thematicBreak' && block.type !== 'commentBlock') {
      throw new Error(`${file}: 第一個內容區塊必須是 #2 章節標題`);
    }
  }
  flush();
  if (!sections.length) throw new Error(`${file}: 至少需要一個 #2 章節`);
  // ── Metadata 是由 StructMark 正式 YAML Parser 取得，不以字串或正規式推測 ──
  const project = parsed.metadata.project;
  if (project !== undefined && (typeof project !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project))) {
    throw new Error(`${file}: Front Matter 的 project 必須是小寫、以連字號分隔的專案 slug`);
  }
  return {sections, projectSlug: project as string | undefined};
}

export function parseLocalizedSections(source: string, file = '<memory>'): LocalizedSection[] {
  return parseLocalizedNote(source, file).sections;
}

function loadLocale(file: string): ParsedLocalizedNote {
  return parseLocalizedNote(fs.readFileSync(file, 'utf8'), file);
}

export function loadStructMarkNote(meta: Meta): Note {
  const folder = path.join(process.cwd(), 'content', 'notes', meta.slug);
  const localized = locales.map((locale) => loadLocale(path.join(folder, `${locale}.sm`)));
  const expected = localized[0]!.sections.length;
  const expectedProject = localized[0]!.projectSlug;
  for (const [index, article] of localized.entries()) {
    if (article.sections.length !== expected) throw new Error(`${meta.slug}: zh-TW ${expected} 個章節，但 ${locales[index]} 有 ${article.sections.length} 個`);
    if (article.projectSlug !== expectedProject) throw new Error(`${meta.slug}: ${locales[index]} 的 project 與 zh-TW 不一致`);
  }
  const sections: Note['sections'] = localized[0]!.sections.map((_, sectionIndex) => ({
    heading: Object.fromEntries(locales.map((locale, index) => [locale, localized[index]!.sections[sectionIndex]!.heading])) as LocalizedText,
    paragraphs: Object.fromEntries(locales.map((locale, index) => [locale, localized[index]!.sections[sectionIndex]!.paragraphs])) as Record<Locale, string[]>,
    html: Object.fromEntries(locales.map((locale, index) => [locale, localized[index]!.sections[sectionIndex]!.html])) as Record<Locale, string>,
    ids: Object.fromEntries(locales.map((locale, index) => [locale, localized[index]!.sections[sectionIndex]!.id])) as Record<Locale, string>
  }));
  return {...meta, ...(expectedProject === undefined ? {} : {projectSlug: expectedProject}), sections};
}
