# Miki Website — 維護與發布

本網站保留日式極簡、淺藍與薄荷綠的視覺基調；首頁順序維持「介紹 → 音樂 → 圖片 → About → Works → Notes → Timeline」。不另外加入每日維護的狀態板。

## 日常更新

- 首頁個人資料：`content/profile.ts`
- 作品及細節：`content/projects.ts`、`content/project-details.ts`
- 文章：`content/notes/<slug>/{zh-TW,en,ja}.sm` 與 `meta.ts`
- Lab 工具導覽：`content/lab-tools.ts`
- 三語介面：`i18n/ui.ts`
- 版面樣式：`app/styles/site.css`、`app/styles/lab.css`、`app/styles/structmark.css`

新增筆記後，執行 `npm run notes:sync` 更新靜態文章登錄表。StructMark 的來源與校驗方式詳見 README。

## 本機驗證

```bash
npm ci
npm run validate:fast
npx playwright install chromium webkit
npm run test:e2e
```

`validate:fast` 包含 Node 原生測試、內容及文件檢查、Vitest、TypeScript 型別檢查和 Next.js 靜態匯出。若缺少 npm 套件，不可把單純靜態檢查當成完整建置通過。

## GitHub Pages

將修改推送到 `main`，GitHub Actions 會先執行完整驗證，再使用已驗證的 `out/` 部署。Pull request 僅驗證，不部署。靜態輸出使用 `trailingSlash` 與站內多語路由；不要手動提交 `out/`。
