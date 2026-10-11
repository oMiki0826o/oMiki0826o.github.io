# Miki's Website

![Version](https://img.shields.io/badge/version-6.3.5-blue)
[![Verify and deploy](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml/badge.svg)](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml)

[中文](#中文) | [English](#english)

## 中文

### 關於

Miki 的個人網站，收錄作品、文章、研究筆記與一路整理留下的紀錄。網站保留柔和的天空藍、薄荷色與螢火蟲氛圍，提供繁體中文、英文與日文內容。

正式網站：[omiki0826o.github.io](https://omiki0826o.github.io/)

### 功能

- 首頁、About、Works、Notes、Timeline
- 九個作品的獨立介紹頁，以及 GitHub／Demo 連結
- StructMark `.sm` 文章、目錄、閱讀進度、相關文章與 RSS
- 深淺主題、響應式版面與低干擾的螢火蟲互動
- `/lab/`：與主站視覺和內容定位分開的實驗工具區
- `/ripmiki/`：獨立的紀念彩蛋頁

### 技術

- Next.js 16、React 19、TypeScript
- App Router、Static Export、GitHub Pages
- Vitest、Node.js native tests、Playwright
- StructMark V1.1：文章解析、AST 驗證與 HTML 渲染

### 安裝

需求：Node.js 22 以上、npm。完整瀏覽器驗證另外需要 Playwright 的 Chromium 與 WebKit。

```bash
npm ci
npm run dev
```

開發伺服器預設位於 `http://localhost:3000`。

### 使用與驗證

快速品質檢查：

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

GitHub Actions 會在 Pull Request 與 `main` push 執行驗證；只有 `main` 的完整關卡通過後，才會部署 `out/` 到 GitHub Pages。

### 內容維護

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
| StructMark 語言核心 | `lib/structmark/core/` |

新增文章後執行 `npm run notes:sync`。文章採用 StructMark 的受限文件格式；完整規則與維護流程見 `docs/DEVELOPMENT.sm`。

### 開發治理

本專案參考 [AI Development Governance](https://github.com/oMiki0826o/AI-Development-Governance)。實際維護入口如下：

- `AGENTS.md`：本專案的協作與品質關卡
- `docs/GOVERNANCE.sm`：修改、驗證與發布規則
- `docs/DEVELOPMENT.sm`：內容與程式維護方式
- `docs/VALIDATION.sm`：實際驗證紀錄與限制
- `docs/CHANGELOG.sm`：可追溯的版本變更

README 與 docs 面向網站使用者及維護者，不把未執行的測試寫成通過。完整瀏覽器驗證必須在已安裝 Playwright 瀏覽器的環境執行。

### 授權

本倉庫目前未附獨立 `LICENSE` 檔案；使用或再發布前，請先依倉庫擁有者的明確授權辦理。StructMark 核心另依 `lib/structmark/LICENSE` 的原始授權條款使用。

## English

### About

Miki's personal website for projects, articles, research notes and a record of how the site has evolved. It keeps a soft sky-blue, mint and firefly atmosphere, with Traditional Chinese, English and Japanese content.

Live site: [omiki0826o.github.io](https://omiki0826o.github.io/)

### Features

- Home, About, Works, Notes and Timeline sections
- Nine projects with dedicated detail pages and GitHub or demo links
- StructMark `.sm` articles with tables of contents, reading progress, related notes and RSS
- Light and dark themes, responsive layouts and a restrained firefly interaction
- `/lab/`, an experimental area intentionally separated from the main site's visual and content system
- `/ripmiki/`, an independent memorial easter-egg page

### Technology

- Next.js 16, React 19 and TypeScript
- App Router, static export and GitHub Pages
- Vitest, native Node.js tests and Playwright
- StructMark V1.1 for article parsing, AST validation and HTML rendering

### Installation

Requirements: Node.js 22 or newer and npm. Full browser verification also requires Playwright's Chromium and WebKit browsers.

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:3000` by default.

### Usage and verification

Run the fast quality gate:

```bash
npm run validate:fast
```

Before a release, install the browsers and run the exported-site checks:

```bash
npx playwright install chromium webkit
npm run test:e2e
```

Or run both stages with:

```bash
npm run validate
```

The static export is written to `out/`. Preview it with:

```bash
npm run preview
```

GitHub Actions runs the validation on pull requests and pushes to `main`; `out/` is deployed to GitHub Pages only after the complete `main` workflow passes.

### Content maintenance

| Content | Location |
| --- | --- |
| Profile and home introduction | `content/profile.ts` |
| Projects and project details | `content/projects.ts`, `content/project-details.ts` |
| Music playlist | `content/music.ts` |
| Articles | `content/notes/<slug>/{zh-TW,en,ja}.sm` |
| Article metadata | `content/notes/<slug>/meta.ts` |
| Localized UI text | `i18n/ui.ts`, `i18n/config.ts` |
| Lab registry | `content/lab-tools.ts` |
| Main and Lab styles | `app/styles/site.css`, `app/styles/lab.css` |
| StructMark language core | `lib/structmark/core/` |

Run `npm run notes:sync` after adding an article. Articles use the supported subset of StructMark; see `docs/DEVELOPMENT.sm` for the maintenance rules.

### Development governance

This repository follows the principles of [AI Development Governance](https://github.com/oMiki0826o/AI-Development-Governance). The project-specific entry points are:

- `AGENTS.md` for collaboration and quality gates
- `docs/GOVERNANCE.sm` for change, verification and release rules
- `docs/DEVELOPMENT.sm` for content and code maintenance
- `docs/VALIDATION.sm` for recorded evidence and limitations
- `docs/CHANGELOG.sm` for traceable changes

README and docs are written for users and maintainers, not as agent command prompts. Browser acceptance must be run in an environment with the Playwright browsers installed.

### License

This repository currently does not include a standalone `LICENSE` file. Obtain explicit permission from the repository owner before using or redistributing the site. The vendored StructMark core is governed separately by `lib/structmark/LICENSE`.
