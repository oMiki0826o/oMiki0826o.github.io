# Miki's Website — 個人網站與 Blog 設計準則

更新：2026-11-04

## 核心定位

這是一個純粹的 **Personal Homepage + Blog + Selected Works**。首頁讓讀者認識 Miki，接著閱讀文章、了解作品。不把網站作為工具箱、管理後台、實驗平台或 GitHub README 的複製品。

## 資訊架構

| 導覽 | 角色 |
| --- | --- |
| Home | 個人介紹、最新文章、精選作品、少量音樂及影像 |
| Blog | 可閱讀、可分類的三語文章；沿用既有 /notes/ URLs |
| Works | 作品展示、GitHub、實際 Demo、相關文章 |
| About | 個人介紹、興趣、發展歷程與公開連結 |

獨立 Timeline 頁面已收斂到 About。Lab 和工具路由已移除，不能再把工具功能重新加回主站，除非先重新討論定位。

## 視覺方向

- 日系簡約與個人空間感；不做通用 SaaS 登陸頁。
- 延續柔和天空藍、薄荷色、暖螢火蟲與窄欄留白。
- 圖片使用原始、可確認來源的實際素材；不使用裝飾性生成圖代替作品。
- 文章是主角：優先閱讀性、字級、行距、留白與清楚的日期和分類。
- 手機 320px 起無橫向溢出；重視鍵盤操作及 reduced-motion 偏好。
- 不要讓過度動畫、數字儀表板或多層卡片干擾閱讀。

## 內容管理

- 部落格文章使用 StructMark `.sm` 與原有 HTML Parser，不將未受信任的內容直接插入 DOM。
- 文章語系為 zh-TW、en、ja，三份文章需保持章節相容。
- 原文章路徑 `/zh-TW/notes/<slug>/` 等持續保留，以維護既有外部連結。
- Works 專案資料以 `content/projects.ts` 與 `content/project-details.ts` 為單一來源。
- 外部連結必須指向真正存在的專案、Demo 與來源；無法驗證時不使用 placeholder。

## 技術與部署

- 本階段採用 Next.js 靜態匯出、React、TypeScript 和 GitHub Pages；框架遷移應另行測試，不能同時改動網站定位與內容。
- GitHub Actions 在 PR 上執行快速驗證、靜態建置及 Chromium / WebKit / 行動版 WebKit。
- GitHub Pages 的正式發布仍只使用 main。
- 分支線上預覽需將 GitHub 儲存庫連接 Vercel Git 整合。非 main 分支推送後，Vercel 才會提供獨立 Preview Deployment。沒有實際連線／成功部署時，不可宣稱已有網址。

## 維護原則

必要變更才新增元件、JS 和依賴；完成一項內容型功能就一起維護 E2E、SEO、README。協作與暫存記錄放在 gitignore 的 `data/` 下，不放進公開網站。
