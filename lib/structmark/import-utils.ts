/*
 * File: import-utils.ts
 * Modification: 2026-10-11 — StructMark 本機匯入尺寸、格式與診斷行列定位。
 */

// ── 檔案格式與大小限制 ──
export const MAX_FILE_BYTES = 400_000;

export function fileImportError(name: string, size: number): string | null {
  if (!/\.sm$/i.test(name)) return '請選擇副檔名為 .sm 的 StructMark 文件。';
  if (!Number.isFinite(size) || size <= 0) return '無法匯入空白文件。';
  if (size > MAX_FILE_BYTES) return '文件過大，請選擇小於 400 KB 的 .sm 檔。';
  return null;
}

// ── 用半開區間中的來源行列資訊定位編輯器 ──
export function offsetAtPosition(source: string, line: number, column: number): number {
  const lines = source.split('\n');
  const row = Math.max(0, Math.min(lines.length - 1, Number.isFinite(line) ? Math.floor(line) - 1 : 0));
  let offset = 0;
  for (let i = 0; i < row; i++) offset += lines[i]!.length + 1;
  const col = Number.isFinite(column) ? Math.max(0, Math.floor(column) - 1) : 0;
  return offset + Math.min(col, lines[row]!.length);
}
