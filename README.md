<!--
README.md

Modification():

- Fixed   上一輪重寫 js/animation.js 時誤刪了 initFireflyField／
  initNavAutoHide／initScrollReveal 三個函式，只留下游標相關程式碼。
  main.js 會在頁面載入時依序同步呼叫這幾個函式，最前面的
  initFireflyField 一旦是未定義函式，會直接拋出例外並中斷同一個
  回呼裡後面所有程式碼——包含負責抓資料、渲染整個頁面的
  bootstrap()。這正是「網頁顯示不出東西」的真正原因。
  這次補回三個函式，並在 main.js 呼叫端加上 try/catch 防護
  （見 js/main.js 的 safeRun），讓裝飾性動效彼此獨立，任何一個
  未來若再度出錯都不會連帶癱瘓整頁渲染。
- Fixed   css/style.css／css/layout.css 有兩處殘留舊版
  --color-accent 變數引用（配色改版時漏改），改為與其他文字
  強調色一致的 --color-blue／--color-gold。這兩處不影響頁面能否
  顯示（CSS 引用未定義變數只會讓該行樣式被忽略），但仍一併修正。

Description:

說明 Miki's website 的目錄結構、資料維護方式與部署方法。
-->

# Miki's website

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

配色為藍／綠／橘三色系（依官方立繪背景取樣校正），並整體提亮為棉花糖
色調：每個顏色分成 vivid（圖示、邊框、按鈕背景等需要一定辨識度的裝飾
用途）與 pastel（卡片光暈、標籤底色、水晶描邊等大面積柔霧用途）兩階，
兩階都刻意保持淺色、不壓暗。連帶地，Hero 簽名、卡片連結、時間軸年份、
頁尾語錄這幾處原本直接把藍色當文字色使用的地方，改成中性深色文字——
淺色調在白色系背景上天生對比不足，繼續當文字色只有兩種結果：顏色被
迫壓暗（違背棉花糖色調的訴求），或文字淺到難以閱讀。因此把「需要
負責文字辨識度」與「可以放心保持淺色」的用途分開，兩者不互相犧牲。
所有色值集中定義在 `css/variables.css`，其餘樣式表一律引用變數，
不直接寫死色碼。

玻璃卡片（`.glass`）改用淺藍調的半透明底色，加深模糊強度，並在頂緣
加一條白色反光細線模擬玻璃邊緣的反光，讓卡片不只是「模糊」，還要
「看得出是玻璃」。

鎮樓圖（`.card--featured`）做出水晶玻璃質感：稜鏡描邊改為藍→綠→橘
→藍的四段 pastel 漸層，模擬水晶切面把白光分散成光譜的折射感；捲動
進場時會有一道白色反光掃過圖片一次；外層再疊加藍＋綠＋橘三色柔光。

游標圖片改為隨網站一起部署的本地檔案（`assets/cursor.png`，32×32），
不再連到外部圖床，直接用瀏覽器原生 `cursor: url()` 即可穩定運作——
先前試過的 JS 疊加層方案，是為了繞開「外部圖床可能設有防盜連限制、
拒絕非自家網域的請求」這個現實問題而設計的變通做法；改成本地檔案後，
請求本來就是同網域，不會被拒絕，也就不再需要那一整套 JS 邏輯。
少一層 JS 依賴，也少一種「JS 邏輯本身出錯」的風險。

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
