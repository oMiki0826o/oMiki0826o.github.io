# Miki's Website

[![Build and deploy](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml/badge.svg)](https://github.com/oMiki0826o/oMiki0826o.github.io/actions/workflows/static.yml)

我的個人網站，記錄作品、開發過程、文章與一些小實驗。

網站使用 **Next.js 16、React 19、TypeScript**，以靜態匯出方式部署在 GitHub Pages。介面保留原本天空藍、薄荷綠的色調和簡單的內容順序，不刻意堆疊動畫或資訊卡片。

## 網站內容

首頁依序放置個人介紹、音樂、圖片、作品、筆記與歷程。作品有獨立頁面，筆記提供繁體中文、英文、日文三種版本。另有 `/lab/`，供放置不一定屬於個人履歷的實驗和工具。

### StructMark 在這裡的用途

網站的 `content/notes/` 已經使用 `.sm`，不只是重新命名檔案：建置時會讀入 StructMark V1.1 語言核心，解析成 AST，再以官方 HTML Renderer 產生安全內容。`/lab/structmark/` 則是同一核心的即時編輯與預覽頁面，可以查看 AST、解析診斷，以及匯出 `.sm`。

目前語言核心的來源為 [StructMark](https://github.com/oMiki0826o/StructMark)，採專案內複製的方式放在 `lib/structmark/core/`，版本為隨此專案保存的 V1.1；更新時請先比較上游變更及跑完整測試。原始授權在 `lib/structmark/LICENSE`。

## 執行方式

需 Node.js 22 或更新版本、npm，以及 Playwright 所需的瀏覽器環境。

```bash
npm ci
npm run dev
```

在本機確認功能後執行：

```bash
npm run test:native
npm run core:check
npm run works:check
python3 scripts/release_smoke.py
npx playwright install chromium webkit
npm run validate
```

`npm run build` 會產生 `out/`，並將靜態輸出內各語言 HTML 的 `lang` 改為正確值。想預覽產物可使用 `npm run preview`，並開啟 `http://localhost:4173/`。瀏覽器測試會涵蓋 Chromium、WebKit 與行動版 WebKit；請先執行 `npx playwright install chromium webkit`。

GitHub Actions 會在 pull request 與 main 分支執行驗證，只會在 main 通過全部關卡後部署 `out/`。

## 維護內容

| 想修改的內容 | 檔案位置 |
| --- | --- |
| 首頁介紹、頭像、選圖 | `content/profile.ts` |
| 專案列表與詳細介紹 | `content/projects.ts`、`content/project-details.ts`；參考 `docs/WORKS.sm` |
| 音樂播放來源 | `content/music.ts` |
| 文章 | `content/notes/<slug>/{zh-TW,en,ja}.sm` |
| 文章標題、日期、分類 | `content/notes/<slug>/meta.ts` |
| 網站三語介面 | `i18n/ui.ts` |
| 主題色、版面與響應式規則 | `app/styles/site.css`、`app/styles/lab.css`、`app/styles/structmark.css` |
| StructMark 語言核心 | `lib/structmark/core/` |

文章採用 StructMark 的 `#2` 作為主要章節標題。三個語言檔案的章節數量須一致，且自訂標題錨點會直接套用到文章。新增一篇文章後，也要執行 `npm run notes:sync` 自動更新 `content/notes/index.ts`，毋須手動管理匯入。

更完整的維護說明放在 `docs/DEVELOPMENT.sm`；更新摘要在 `docs/CHANGELOG.sm`。

## V6.3.4 改進

Works 擴充至九個真實 GitHub 專案，新增 AstroLab、STLab、CipherTool Web、StructMark、NoteBlock Tweaks、AI Development Governance。每個作品有繁中、英文、日文詳情；具有公開網站的作品另提供直接使用連結。六張新封面是本站自行設計的輕量文字 SVG 識別圖，並非專案截圖。

首頁仍只精選三個專案，完整清單依「網站與語言」「工具與開發」分組。新增 `.sm` Front Matter `project:`，讓文章能直接關聯作品；Works 與 Notes 會雙向連結，無須重複維護關聯清單。StructMark 核心透過 `npm run core:check` 檢查 SHA-256，`npm run core:sync -- <StructMark/src>` 可在人工比對後同步版本。

實作同時補齊 `npm run works:check`、相應的 Node.js 測試、三語作品路由及手機版 E2E 情境。網站原有配色、排版順序、真實圖片與其他 Lab 工具都保留。

**發布驗證限制：** 這份環境無法完成 npm 套件安裝，因此沒有 Vitest、完整 TypeScript 型別檢查、Next.js 靜態建置或 Playwright 的通過紀錄。這些是部署前的必要關卡，詳見 `docs/VALIDATION.sm`。請讓 GitHub Actions 通過後再部署。

## 注意事項

音樂播放器透過 YouTube IFrame API，影片限制、封鎖或網路問題可能影響播放，但不會阻止主站載入。天文比對工具只使用使用者在本機選取的影像，並不把濾鏡效果冒充成真實天文細節。

這個儲存庫的目標是留下一個能長期整理作品的地方；平常只需要更新內容，不必為了維護網頁而維護另一套儀表板。
