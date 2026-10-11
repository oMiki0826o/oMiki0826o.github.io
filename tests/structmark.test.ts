/*
 * File: structmark.test.ts
 * Modification: 2026-10-11 — Official parser integration and untrusted HTML/URL regression cases.
 */
import {describe,expect,it} from 'vitest';
import {parseDocument,renderHtml} from '@/lib/structmark/core/index';
import {getNote,notes} from '@/content/notes/index';

describe('StructMark integration',()=>{
  it('renders real formatted notes with the official renderer',()=>{
    expect(notes).toHaveLength(7);
    const about=getNote('about-me');
    expect(about?.sections[0]?.html['zh-TW']).toContain('<p>');
    expect(about?.sections[0]?.html).not.toContain('<script');
  });
  it('uses StructMark heading and link semantics',()=>{
    const doc=parseDocument('#2 Hello (#hello)\n\n*[Bold] [safe](https://example.com)');
    expect(doc.diagnostics.filter(d=>d.severity==='error')).toHaveLength(0);
    const html=renderHtml(doc);
    expect(html).toContain('id="hello"');
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).toContain('https://example.com');
  });
  it('preserves author-assigned section anchors for the table of contents', () => {
    for (const note of notes) {
      for (const section of note.sections) {
        for (const locale of ['zh-TW', 'en', 'ja'] as const) {
          expect(section.ids[locale]).toBeTruthy();
        }
      }
    }
  });
  it('escapes script-like content and rejects dangerous URL schemes',()=>{
    const doc=parseDocument('#2 安全\n\n<script>alert(1)</script> [click](javascript:alert(1))');
    const html=renderHtml(doc);
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain('&lt;script&gt;');
  });
});
