# Miki Website — 維護流程

這個網站以個人介紹與 Blog 為主。版面順序是「介紹 → 最近文章 → 精選作品 → 個人音樂與圖片 → 頁尾」，文章可從 Home 與 Blog 導覽進入。歷程合併在 About，不再設獨立 Timeline / Lab 導覽。

## 更新位置

- 首頁樣式：`components/home/home-page.tsx`、`app/styles/site.css`
- 介紹：`content/profile.ts`、`app/[locale]/about/page.tsx`
- 作品：`content/projects.ts`、`content/project-details.ts`
- 文章：`content/notes/<slug>/{zh-TW,en,ja}.sm`、`meta.ts`
- Blog 內容：`content/notes/index.ts`、`content/notes-loader.ts`
- 語系：`i18n/ui.ts`、`i18n/config.ts`
- StructMark 核心：`lib/structmark/core/`（由上游同步，勿為單頁隨意改語法）

新增文章後執行 `npm run notes:sync`；變更作品執行 `npm run works:check`。

## 本機與 CI 驗證

```bash
npm ci
npm run validate:fast
npx playwright install chromium webkit
npm run test:e2e
```

`npm run validate:fast` 包含文件、Native/Vitest、TypeScript、靜態建置。E2E 對 `out/` 的靜態匯出版本執行，不只測 `next dev`。

## 分支與網站

- `main` 的 GitHub Pages 是正式網站，不在未完成驗證前合併。
- 先建立功能分支及 PR，通過 CI 後才審查。
- Vercel Git 整合可提供獨立 Preview URL，但必須先將此 repo 匯入 Vercel 並授權 GitHub；光是建立分支不會自行生成預覽網址。
- 保持 Vercel 的 Production Branch 為 `main`，其餘分支由 Vercel 視為 Preview；GitHub Pages 正式網址不變。
- 不要提交 `out/`、`.next/` 或 `data/` 協作暫存檔。
