<!--
README.md

Modification():

- Fixed   檔頭誤用 Python 風格 """ 註解，Markdown 無此語法會被直接
  渲染為可見文字，改用 Markdown 慣例的 HTML 註解 <!-- -->
- Removed 「config/*.json 支援 JSONC 註解」章節：
  JSON 已改為標準格式（零註解），維護說明改置於 config/HOW_TO.md
- Changed 目錄結構移除 skills.json（未使用資料已刪除）
- Changed 視覺風格描述更新為流螢少女型態配色，並修正已過時的
  「游標拖曳愛心」「大圖在上卡片版式」等敘述

Description:

說明 Miki 個人網站的目錄結構、資料維護方式與部署方法。
-->

# Miki Website

Miki 的個人介紹網站，部署於 GitHub Pages（`https://omiki0826o.github.io/`）。
整站採「資料與畫面分離」設計，所有可變內容皆放在 `config/*.json`，
新增或修改內容時**完全不需要碰 HTML / CSS**。

## 目錄結構

```
.
├── index.html              # 首頁
├── pages/
│   ├── about.html          # 關於（完整自介）
│   ├── projects.html       # 專案總覽
│   ├── articles.html       # 文章總覽
│   ├── timeline.html       # 完整歷程時間軸
│   └── ripmiki.html        # 「上香」彩蛋頁（獨立樣式，不依賴共用資源）
├── css/
│   ├── reset.css           # 瀏覽器預設樣式重置
│   ├── variables.css       # 顏色／字體／間距等設計 Token
│   ├── layout.css          # 版面骨架
│   ├── components.css      # 元件外觀（卡片、按鈕、播放器…）
│   ├── animation.css       # 動效（捲動顯現、自訂游標、螢火蟲背景）
│   └── style.css           # 樣式總入口（@import 上述檔案）
├── js/
│   ├── loader.js           # 共用 fetchJSON 工具
│   ├── render.js            # 資料 → HTML 的渲染函式
│   ├── player.js            # YouTube IFrame API 音樂播放器
│   ├── animation.js         # 游標、捲動觀察器、導覽列隱藏、螢火蟲
│   └── main.js               # 入口腳本：載入 JSON 並串接渲染
├── config/                  # ★ 主要維護入口 ★
│   ├── HOW_TO.md            # 各 JSON 欄位的詳細說明與範例
│   ├── site.json            # 姓名、簽名、頭像、鎮樓圖、自介、Footer
│   ├── links.json           # 導覽列、社群 icon、Quick Links
│   ├── music.json           # 播放清單（YouTube 影片 ID）
│   ├── projects.json        # 專案卡片
│   ├── articles.json        # 文章卡片
│   ├── timeline.json        # 歷程節點（highlight: true 會出現在首頁預覽）
│   └── quotes.json          # Footer 每日一句，重新整理隨機抽一句
└── assets/                  # 放置自有圖片（若不使用外部圖床）
```

## 修改內容的第一步：看 config/HOW_TO.md

`config/HOW_TO.md` 針對每一個 JSON 檔案，用範例說明它控制網站的
哪個部分、格式該怎麼寫。日常維護（換簽名、換圖、加專案、加文章、
加歷程節點）都在 `config/` 目錄內完成，改完存檔、`git push` 即可，
GitHub Pages 會自動重新部署。

## 視覺風格

流螢（崩壞：星穹鐵道）少女型態配色：洋裝純白 → 髮絲灰銀的冷調
漸層背景，搭配領巾亮橘作為全站唯一強調色，螢光髮尾的青綠色用於
背景螢火蟲粒子。游標為自訂圖片（HoYoLAB 圖床），不含拖尾效果。

專案／文章卡片採用左側縮圖＋右側文字的水平緊湊版式，類似 lit.link
的列表呈現方式，而非傳統「大圖在上、文字在下」的卡片網格。

音樂播放器串接 YouTube IFrame API，載入後不會自動播放，
需使用者按下播放鍵才會出聲。

## 常見維護情境

- **換簽名／留言板文字**：編輯 `config/site.json` 的 `signature` 欄位。
- **換鎮樓圖**：編輯 `config/site.json` 的 `featuredImage`（直接放圖片網址）。
- **新增專案／文章**：在 `config/projects.json` 或 `config/articles.json` 的
  陣列中新增一筆物件即可，欄位格式參見 `config/HOW_TO.md`。
- **新增歷程節點**：在 `config/timeline.json` 新增物件；若希望出現在首頁
  預覽區，將 `highlight` 設為 `true`（首頁最多顯示 3 筆）。
- **換音樂**：編輯 `config/music.json`，可放多首歌曲，播放器會自動支援
  上一首／下一首。
- **換社群連結 / Quick Links**：編輯 `config/links.json`。

## 部署

純靜態網站，直接部署於 GitHub Pages 的 repository 根目錄即可
（因內部使用 root-relative 路徑 `/css`、`/js`、`/config`，
若改為 Project Pages 子路徑部署，需同步調整相關路徑前綴）。
