<!--
README.md

Modification():

- Changed 視覺風格章節：配色說明改為「實際比對流螢角色圖片後校正」的
  淺色系（奶霜白／薄荷綠／暖金），並補充鎮樓圖水晶玻璃效果、
  游標／陰影改為集中變數管理、頁尾最後更新時間改抓 GitHub API
  真實資料等本次調整內容
- Changed 標題由「Miki Website」改為「Miki's web」，與網站品牌名稱一致

Description:

說明 Miki's web 的目錄結構、資料維護方式與部署方法。
-->

# Miki's web

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

配色實際比對流螢（崩壞：星穹鐵道）角色圖片後校正為淺色系：
奶霜白 → 薄荷綠的漸層背景（圖片中占比最大的淺色區域），
飾品暖金作為全站唯一強調色（圖片中占比最小、專門點睛的顏色），
裙擺／髮尾的薄荷青用於背景螢火蟲粒子。所有色值集中定義在
`css/variables.css`，其餘樣式表一律引用變數，不直接寫死色碼。

鎮樓圖（`.card--featured`）做出水晶玻璃質感：稜鏡漸層描邊模擬
切割玻璃邊緣的光線折射，捲動進場時會有一道白色反光掃過圖片一次，
外層再疊加暖金＋薄荷雙色柔光，而非單純的模糊玻璃平面。

游標為自訂圖片（HoYoLAB 圖床），網址與互動狀態集中定義在
`--cursor-default`／`--cursor-pointer` 兩個 CSS 變數，
CSS 與 JS（縮圖後的 data URL 覆蓋）共用同一組變數，不會有兩處
定義互相打架、游標在元素邊緣快速切換造成閃動的問題。

專案／文章卡片採用左側縮圖＋右側文字的水平緊湊版式，類似 lit.link
的列表呈現方式，而非傳統「大圖在上、文字在下」的卡片網格。

音樂播放器串接 YouTube IFrame API 並掛載真實播放清單（見
`config/HOW_TO.md` 的 music.json 說明），載入後不會自動播放——
瀏覽器的自動播放政策本來就會封鎖「有聲音」的自動播放，強行開啟
只會在主控台噴錯誤且實際上仍播不出來，因此維持由使用者主動按下
播放鍵的設計。

頁尾的瀏覽量／訪客數來自 busuanzi 服務，最後更新時間改為向
GitHub API 查詢該儲存庫最新一次 commit 的真實時間（見 site.json
的 `repo` 欄位），三項數據都不是手動填寫的靜態值。

## 常見維護情境

- **換簽名／留言板文字**：編輯 `config/site.json` 的 `signature` 欄位。
- **換鎮樓圖**：編輯 `config/site.json` 的 `featuredImage`（直接放圖片網址）。
- **新增專案／文章**：在 `config/projects.json` 或 `config/articles.json` 的
  陣列中新增一筆物件即可，欄位格式參見 `config/HOW_TO.md`。
- **新增歷程節點**：在 `config/timeline.json` 新增物件；若希望出現在首頁
  預覽區，將 `highlight` 設為 `true`（首頁最多顯示 3 筆）。
- **換音樂**：編輯 `config/music.json`。若換成另一個 YouTube 播放清單，
  只需替換 `youtubeId`／`playlistId` 這兩個值；若想改回手動列出多首單曲，
  拿掉 `playlistId` 並在陣列中列出多筆物件即可，詳見 `config/HOW_TO.md`。
- **換社群連結 / Quick Links**：編輯 `config/links.json`。

## 部署

純靜態網站，直接部署於 GitHub Pages 的 repository 根目錄即可
（因內部使用 root-relative 路徑 `/css`、`/js`、`/config`，
若改為 Project Pages 子路徑部署，需同步調整相關路徑前綴）。
