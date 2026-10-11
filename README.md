# Miki's Website

[![Verify and deploy](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml/badge.svg)](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml)

Miki 的個人網站：收錄作品、文章、研究筆記與一路整理留下的紀錄。網站保留柔和的天空藍、薄荷色與螢火蟲氛圍，並以繁體中文、英文、日文提供內容。

正式網站：[omiki0826o.github.io](https://omiki0826o.github.io/)

## 內容

- 首頁、About、Works、Notes、Timeline
- 九個作品的獨立介紹頁，以及 GitHub／Demo 連結
- StructMark `.sm` 文章、目錄、閱讀進度、相關文章與 RSS
- 深淺主題、響應式版面與低干擾的螢火蟲互動
- `/lab/`：與主站視覺和內容定位分開的實驗工具區
- `/ripmiki/`：獨立的紀念彩蛋頁

## 技術

- Next.js 16、React 19、TypeScript
- App Router、Static Export、GitHub Pages
- Vitest、Node.js native tests、Playwright
- StructMark V1.1：文章解析、AST 驗證與 HTML 渲染

## 本機開發

需求：Node.js 22 以上、npm。瀏覽器驗證另外需要 Playwright 的 Chromium 與 WebKit。

```bash
npm ci
npm run dev
```

開發伺服器預設位於 `http://localhost:3000`。

## 驗證與建置

快速品質檢查會依序執行 repository hygiene、原生迴歸測試、StructMark 完整性、作品與文章資料檢查、Vitest、TypeScript 與靜態建置：

```bash
npm run validate:fast
```

完整發布前檢查：

```bash
npx playwright install chromium webkit
npm run test:e2e
```

或一次執行：

```bash
npm run validate
```

建置結果輸出到 `out/`。預覽靜態輸出：

```bash
npm run preview
```

GitHub Actions 會在 Pull Request 與 `main` push 執行相同驗證；只有 `main` 的完整關卡通過後，才會部署 `out/` 到 GitHub Pages。

## 內容維護

| 內容 | 位置 |
| --- | --- |
| 個人資料與首頁介紹 | `content/profile.ts` |
| 作品與作品詳情 | `content/projects.ts`、`content/project-details.ts` |
| 音樂播放清單 | `content/music.ts` |
| 文章內容 | `content/notes/<slug>/{zh-TW,en,ja}.sm` |
| 文章索引資料 | `content/notes/<slug>/meta.ts` |
| 語系介面文字 | `i18n/ui.ts`、`i18n/config.ts` |
| Lab 工具登錄 | `content/lab-tools.ts` |
| 主站與 Lab 樣式 | `app/styles/site.css`、`app/styles/lab.css` |
| StructMark 核心 | `lib/structmark/core/` |

新增文章後執行：

```bash
npm run notes:sync
```

文章採用 StructMark 的受限文件格式。完整規則與維護流程見 `docs/DEVELOPMENT.sm`。

## 開發治理

本專案參考 [AI Development Governance](https://github.com/oMiki0826o/AI-Development-Governance)，並以專案內文件作為實際執行入口：

- `AGENTS.md`：本專案的協作與品質關卡
- `docs/GOVERNANCE.sm`：修改、驗證與發布規則
- `docs/DEVELOPMENT.sm`：內容與程式維護方式
- `docs/VALIDATION.sm`：實際驗證紀錄與限制
- `docs/CHANGELOG.sm`：可追溯的版本變更

文件面向網站維護者與讀者，不把未執行的測試寫成通過。完整瀏覽器驗證必須在已安裝 Playwright 瀏覽器的環境執行。

## 授權與第三方內容

網站原始碼與自製內容依 repository 授權條款使用。StructMark 核心的原始授權保留於 `lib/structmark/LICENSE`；第三方資料、字型與外部服務依各自授權及使用條款處理。
