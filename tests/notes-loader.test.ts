/*
 * File: notes-loader.test.ts
 * Modification: 2026-10-11 — 確認 AST 章節切割、明確 ID 與程式碼區塊保護。
 */
import {describe, expect, it} from 'vitest';
import {parseLocalizedSections} from '@/content/notes-loader';

describe('StructMark notes AST', () => {
  it('preserves a custom heading ID instead of inventing a numbered anchor', () => {
    const sections = parseLocalizedSections('#2 First (#my-section)\n\nBody text.\n\n#2 Second\n\nMore text.');
    expect(sections.map((section) => section.id)).toEqual(['my-section', 'note-section-2']);
  });

  it('does not mistake a code fence heading for an actual section', () => {
    const sections = parseLocalizedSections('#2 Real\n\n```sm\n#2 Not a heading\n```');
    expect(sections).toHaveLength(1);
    expect(sections[0]?.html).toContain('#2 Not a heading');
  });

  it('rejects duplicate IDs, including collisions with generated IDs', () => {
    expect(() => parseLocalizedSections('#2 A (#note-section-2)\n\nA\n\n#2 B\n\nB')).toThrow(/重複章節識別碼/);
    expect(() => parseLocalizedSections('#2 A (#repeat)\n\nA\n\n#2 B (#repeat)\n\nB')).toThrow(/重複章節識別碼/);
  });

  it('keeps markup safe when rendering section HTML', () => {
    const sections = parseLocalizedSections('#2 Safe\n\n<script>alert(1)</script>');
    expect(sections[0]?.html).not.toContain('<script>');
    expect(sections[0]?.html).toContain('&lt;script&gt;');
  });
  it('rejects invalid front matter project slugs', () => {
    expect(() => parseLocalizedSections('---\nproject: ../invalid\n---\n#2 Title\n\nContent.')).toThrow(/project/);
  });

});
