"""
README.md

Modification():

- Added 專案說明文件

Description:

說明 Miki 個人網站的目錄結構、JSON 資料維護方式與部署方法。
"""

# Miki Website

Miki 的個人介紹網站，部署於 GitHub Pages（`https://omiki0826o.github.io/`）。
整站採「資料與畫面分離」設計，所有可變內容皆放在 `config/*.json`，
新增或修改內容時**完全不需要碰 HTML / CSS**。

## 目錄結構

```
.
├── index.html              # 首頁
├── pages/
│   ├── about.html          # 關於（完整自介 + 技能）
│   ├── projects.html       # 專案總覽
│   ├── articles.html       # 文章總覽
│   └── timeline.html       # 完整歷程時間軸
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
│   ├── player.js            # 自製音樂播放器
│   ├── animation.js         # 游標、捲動觀察器、導覽列隱藏、螢火蟲
│   └── main.js               # 入口腳本：載入 JSON 並串接渲染
├── config/                  # ★ 主要維護入口 ★
│   ├── site.json            # 姓名、簽名、頭像、鎮樓圖、自介、Footer
│   ├── links.json           # 導覽列、社群 icon、Quick Links
│   ├── music.json           # 播放清單
│   ├── projects.json        # 專案卡片
│   ├── articles.json        # 文章卡片
│   ├── timeline.json        # 歷程節點（highlight: true 會出現在首頁預覽）
│   ├── skills.json          # 技能條（顯示於 about.html）
│   └── quotes.json          # Footer 每日一句，重新整理隨機抽一句
└── assets/                  # 放置自有圖片（若不使用外部圖床）
```

## 常見維護情境

- **換簽名／留言板文字**：編輯 `config/site.json` 的 `signature` 欄位。
- **換鎮樓圖**：編輯 `config/site.json` 的 `featuredImage`（直接放圖片網址）。
- **新增專案／文章**：在 `config/projects.json` 或 `config/articles.json` 的
  陣列中新增一筆物件即可，欄位格式可參考既有資料。
- **新增歷程節點**：在 `config/timeline.json` 新增物件；若希望出現在首頁
  預覽區，將 `highlight` 設為 `true`（首頁最多顯示 3 筆）。
- **換音樂**：編輯 `config/music.json`，可放多首歌曲，播放器會自動支援
  上一首／下一首。
- **換社群連結 / Quick Links**：編輯 `config/links.json`。

## 部署

純靜態網站，直接部署於 GitHub Pages 的 repository 根目錄即可
（因內部使用 root-relative 路徑 `/css`、`/js`、`/config`，
若改為 Project Pages 子路徑部署，需同步調整相關路徑前綴）。
