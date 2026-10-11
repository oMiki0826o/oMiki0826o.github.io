/*
 * File: index.ts
 * Modification: 2026-10-10 — V0.4 匯出語義與複雜表格驗證器。
 */
export {parseDocument} from "./parser";
export type {ParseOptions} from "./parser";
export {parseInline, normalizeMath, validateMath} from "./inline";
export type {InlineParseOptions} from "./inline";
export {readAttributes} from "./attributes";
export {renderHtml, renderInline, escapeHtml, parseDelimited} from "./html";
export type {RenderOptions} from "./html";
export type {Document, BlockNode, InlineNode, Diagnostic, SourceRange, Attributes} from "./types";

export {parseStructuredTable} from "./structured_table";
export {validateSemantics, validateWorkspace} from "./semantic";
export type {WorkspaceDocument} from "./semantic";
export {DirectiveRegistry, getDefaultDirectiveRegistry} from "./registry";
export type {DirectiveDefinition, DirectiveKind} from "./registry";
export {normalizeSource} from "./source";
export type {NormalizedSource} from "./source";
export {lexLine, lexDocument} from "./lexer";
export type {BlockToken, BlockTokenKind} from "./lexer";
export {serializeAst} from "./serialize";
export {fromMarkdown, toMarkdown, toMarkdownDetailed} from "./markdown";
export type {MarkdownExportResult} from "./markdown";
export {formatSource} from "./formatter";
export type {FormatResult} from "./formatter";
export {formatBibliography, formatCitation, parseBibTeX, parseCslJson} from "./citations";
export type {CitationEntry} from "./citations";
