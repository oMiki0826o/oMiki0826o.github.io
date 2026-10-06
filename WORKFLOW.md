# Miki's Website — 維護工作流

最後更新：2026-10-07

## 設計基準

目前首頁以 V5「柔和日系 5.x」版本為基準。

固定原則：

- 首頁閱讀順序維持：頭像 → 簡介／銘言 → 音樂 → 鎮樓圖 → About → Works → Notes → Timeline。
- 內容最大寬度約 720–820px，不做滿版作品集。
- 5.x 淺藍／薄荷背景是主體。
- 天空藍是主色；杏桃與螢火綠只作少量點綴。
- 螢火蟲很淡，不搶內容。
- 頭像不加裝飾外圈。
- 音樂播放器置中、無卡片外框。
- 不加入沒有資訊用途的 blob、圓圈、浮動幾何圖形。
- 英文使用較圓潤的 Nunito；中文／日文標題使用 Zen Maru Gothic；銘言使用 Klee One。

## 修改流程

1. 日常內容優先修改 `content/`。
2. 版面修改在 `components/`。
3. 全站視覺修改在 `app/globals.css`。
4. 執行 `npm test`。
5. 執行 `npm run build`。
6. 確認 `out/` 有 `/`, `/zh-TW/`, `/ja/` 與內容頁。
7. 推送 `main` 讓 GitHub Actions 部署。

## 不要重新引入的設計

- 滿版 dashboard / SaaS landing page。
- 每個區塊都套玻璃卡片。
- 大量漸層 blob 或意義不明的裝飾物。
- 純黑高對比科技風。
- GitHub README 式工程師作品集版面。
