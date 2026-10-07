# Miki's Website — 工作流與目前基準

最後更新：2026-10-07

## 目前基準

- 視覺：V5 柔和日系個人網站；淺藍、薄荷、低調螢火蟲與窄版留白維持不變。
- 首頁順序：導覽、頭像、Miki／簡介／銘言、音樂、鎮樓圖、About、Works、Notes、Timeline、Footer。
- 語言：繁體中文、英文、日文；語言切換保留目前頁面。
- 主題：淺色／深色；偏好儲存在瀏覽器本機。
- 聯絡：只顯示真實 GitHub、Discord 個人頁與 Email，不保留平台首頁或空白邀請連結。
- 內容：Notes 已有可靜態輸出的三語文章頁；Works 使用公開專案／現有網站的本地 5:3 真實封面。

## 本機工作流

```bash
npm ci
npm test
npm run build
npm run test:e2e
```

`npm run build` 會輸出至 `out/`。E2E 只對 `out/` 的靜態版本驗證，不依賴 `next dev`。

## 部署工作流

推送 `main` 後，GitHub Actions 會依序執行：

1. `npm ci`
2. `npm test`
3. `npm run build`
4. `npm run test:e2e`
5. 上傳 `out/`
6. 部署 GitHub Pages

工作流程定義在 [`.github/workflows/static.yml`](../.github/workflows/static.yml)。

## 維護位置

| 需求 | 位置 |
| --- | --- |
| 首頁與內容頁 | `app/[locale]/` |
| 內容資料 | `content/` |
| 共用 UI／導覽 | `components/`、`i18n/ui.ts` |
| metadata、SEO | `lib/metadata.ts`、`app/sitemap.ts`、`app/robots.ts` |
| 圖片與游標 | `public/assets/` |
| 視覺規範 | `PROJECT_GUIDE.md` |
