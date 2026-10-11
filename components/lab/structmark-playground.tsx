/*
 * File: structmark-playground.tsx
 * Modification: 2026-10-11 — V6.2.5 本機 .sm 匯入、診斷跳行、節流解析與可及性。
 */
'use client';

import {useEffect, useMemo, useRef, useState, type KeyboardEvent, type ChangeEvent} from 'react';
import {parseDocument, renderHtml} from '@/lib/structmark/core/index';
import {fileImportError, offsetAtPosition} from '@/lib/structmark/import-utils';

const STORAGE_KEY = 'miki-structmark-playground-v1';
const MAX_SOURCE_LENGTH = 100_000;
const TABS = ['preview', 'ast', 'diagnostics'] as const;
type Tab = typeof TABS[number];
const EXAMPLE = `---
title: StructMark 示例
lang: zh-TW
---
#1 StructMark 實際使用

這個頁面會以*[你自己開發的 Parser]解析來源，再由*[Renderer]產生 HTML。

#2 排版示例 (#example)

可混用 /[斜體]、~[刪除線]與=[標記]。

- 三語文件與標題錨點
- 安全連結：[StructMark 專案](https://github.com/oMiki0826o/StructMark)
- 內嵌程式碼：\`const ready = true\`

#2 表格

| 項目 | 狀態 |
| --- | --- |
| Lexer | 已整合 |
| Parser | 已整合 |
| HTML Renderer | 已整合 |

#2 程式碼

\`\`\`ts
const language = 'StructMark';
\`\`\`
`;

// ── 瀏覽器本機編輯與實際 Parser / Renderer ──
export function StructMarkPlayground() {
  const [source, setSource] = useState(EXAMPLE);
  const [parsedSource, setParsedSource] = useState(EXAMPLE);
  const [tab, setTab] = useState<Tab>('preview');
  const [restored, setRestored] = useState(false);
  const [importError, setImportError] = useState('');
  const [importNotice, setImportNotice] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const draft = window.localStorage.getItem(STORAGE_KEY);
      if (draft && draft.length <= MAX_SOURCE_LENGTH) {
        setSource(draft);
        setParsedSource(draft);
      }
    } catch {
      // 私密瀏覽模式可能拒絕使用 localStorage；此時仍可使用編輯器。
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setParsedSource(source), 220);
    return () => window.clearTimeout(timer);
  }, [source]);

  useEffect(() => {
    if (!restored || source.length > MAX_SOURCE_LENGTH) return;
    try { window.localStorage.setItem(STORAGE_KEY, source); } catch { /* localStorage 不可用 */ }
  }, [source, restored]);

  const result = useMemo(() => {
    if (parsedSource.length > MAX_SOURCE_LENGTH) {
      return {document: null, html: '', diagnostics: [{text: '文件超出 100,000 字元上限。', line: 1, column: 1}]};
    }
    try {
      const document = parseDocument(parsedSource);
      const html = renderHtml(document, {math: 'katex'});
      const diagnostics = document.diagnostics.map((item) => ({
        text: `${item.severity.toUpperCase()} ${item.code} 行 ${item.position.line}:${item.position.column} — ${item.message}`,
        line: item.position.line, column: item.position.column
      }));
      return {document, html, diagnostics};
    } catch (error) {
      return {document: null, html: '', diagnostics: [{text: error instanceof Error ? error.message : '未知解析錯誤', line: 1, column: 1}]};
    }
  }, [parsedSource]);

  const download = () => {
    const blob = new Blob([source], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.sm';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // ── 本機檔案只在使用者的瀏覽器解碼，不會上傳 ──
  const importFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    setImportError('');
    setImportNotice('');
    const validation = fileImportError(file.name, file.size);
    if (validation) { setImportError(validation); return; }
    try {
      const input = new TextDecoder('utf-8', {fatal: true}).decode(await file.arrayBuffer());
      if (input.length > MAX_SOURCE_LENGTH) {
        setImportError(`文件超過 ${MAX_SOURCE_LENGTH.toLocaleString()} 字元上限。`);
        return;
      }
      setSource(input);
      setParsedSource(input);
      setImportNotice(`已匯入 ${file.name}（只儲存在本機）。`);
      textareaRef.current?.focus();
    } catch {
      setImportError('無法讀取檔案，請確認是 UTF-8 編碼的 .sm 文件。');
    }
  };

  const jumpToDiagnostic = (line: number, column: number) => {
    const element = textareaRef.current;
    if (!element) return;
    const index = offsetAtPosition(source, line, column);
    element.focus();
    element.setSelectionRange(index, Math.min(index + 1, source.length));
  };

  const navigateTabs = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TABS.indexOf(tab);
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    else return;
    event.preventDefault();
    setTab(TABS[next]!);
    document.getElementById(`sm-tab-${TABS[next]}`)?.focus();
  };

  const labels: Record<Tab, string> = {
    preview: '預覽', ast: 'AST', diagnostics: `診斷 (${result.diagnostics.length})`
  };

  return <section className="sm-playground" aria-labelledby="sm-title">
    <div className="tool-heading">
      <div><p className="lab-eyebrow">LAB / 05</p><h2 id="sm-title">StructMark Playground</h2></div>
      <span>V1.1 / local</span>
    </div>
    <p className="tool-lead">輸入 .sm，查看 HTML、AST 與解析診斷。內容由正式 StructMark 核心處理；草稿僅儲存在你的瀏覽器。</p>
    <div className="sm-actions">
      <label className="sm-import-label">匯入 .sm<input type="file" accept=".sm,text/plain" onChange={(event) => void importFile(event)} aria-label="匯入本機 StructMark 文件" /></label>
      <button type="button" onClick={download}>下載 .sm</button>
      <button type="button" onClick={() => setSource(EXAMPLE)}>載入示例</button>
      <button type="button" onClick={() => {
        setSource('');
        try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* 瀏覽器限制 */ }
      }}>清空</button>
    </div>
    {importError && <p role="alert" className="sm-file-error">{importError}</p>}
    {importNotice && <p role="status" className="sm-file-notice">{importNotice}</p>}
    <div className="sm-workspace">
      <div className="sm-editor">
        <label htmlFor="sm-input">原始碼 <small>UTF-8 / StructMark</small></label>
        <textarea id="sm-input" ref={textareaRef} spellCheck={false} value={source} onChange={(event) => setSource(event.target.value)} aria-label="StructMark 來源文字" />
        <p className="sm-status" role="status" aria-live="polite">{source.length.toLocaleString()} / {MAX_SOURCE_LENGTH.toLocaleString()} 字元{source !== parsedSource ? ' · 正在解析' : ''}</p>
      </div>
      <div className="sm-output">
        <div className="sm-tabs" role="tablist" aria-label="輸出檢視" onKeyDown={navigateTabs}>
          {TABS.map((key) => <button
            key={key}
            id={`sm-tab-${key}`}
            type="button"
            role="tab"
            tabIndex={tab === key ? 0 : -1}
            aria-selected={tab === key}
            aria-controls="sm-output-panel"
            onClick={() => setTab(key)}
          >{labels[key]}</button>)}
        </div>
        <div id="sm-output-panel" className="sm-output-panel" role="tabpanel" tabIndex={0} aria-labelledby={`sm-tab-${tab}`}>
          {tab === 'preview' && <article className="sm-body sm-preview" dangerouslySetInnerHTML={{__html: result.html}} />}
          {tab === 'ast' && <pre className="sm-json">{JSON.stringify(result.document, null, 2)}</pre>}
          {tab === 'diagnostics' && <div className="sm-diagnostics">
            {result.diagnostics.length ? result.diagnostics.map((entry, index) => <button type="button" key={`${index}-${entry.text}`} onClick={() => jumpToDiagnostic(entry.line, entry.column)} title="回到原始碼的問題位置">{entry.text}</button>) : <p>沒有解析診斷。</p>}
          </div>}
        </div>
      </div>
    </div>
  </section>;
}
