# config/ 設定說明

本目錄的所有 JSON 檔案控制網站的顯示內容。
修改流程：直接編輯 JSON → `git commit` → `git push`，
GitHub Pages 自動重新部署，重新整理頁面即可看到更新。

---

## site.json — 網站核心資料

控制：名稱、副標、簽名、頭像、鎮樓圖、自介、頁尾版權。

### 更換網站品牌名稱、顯示名稱與副標

```json
{
  "name": "Miki",
  "siteTitle": "Miki's web",
  "subtitle": "‧ Student"
}
```

`name` 是「人」的名稱，用在 Hero 大標題、頁尾署名等會出現「我是誰」的地方。
`siteTitle` 是「網站」的品牌名稱，用在瀏覽器分頁標題與社群分享卡片的
`og:site_name`。兩者刻意分開：只想換網站的招牌文字（例如改名叫
`Miki's web`）時改 `siteTitle` 就好，不會連帶讓 Hero 也顯示成
「Miki's web」這種不像人名的字樣。

副標前置的 `‧` 是視覺裝飾符，只出現在 Hero，不會混進分頁標題。

### 更換頭像

```json
{
  "avatar": "https://cdn.discordapp.com/avatars/xxx/yyy.png"
}
```

`avatar` 同時用於 Hero 大頭貼與導覽列左側小圖，換一個 URL 即可。

### 更換鎮樓圖

```json
{
  "featuredImage": "https://example.com/banner.jpg",
  "featuredCredit": {
    "label": "Artwork",
    "name": "作者名稱",
    "url": "https://twitter.com/artist"
  }
}
```

`featuredCredit` 顯示在圖片右下角，不需要版權標示時可移除整個物件。

### 修改首頁 About 摘要

```json
{
  "about": {
    "greeting": "關於我",
    "description": "Hi, I'm Miki\n目前是一位高中牲。",
    "readMoreUrl": "/pages/about.html",
    "tags": ["Discord Bot", "Python"],
    "fullBio": [
      "段落一，顯示在 about.html。",
      "段落二，每個字串各自是一段。"
    ]
  }
}
```

`description` 是首頁摘要，支援 `\n` 換行。
`fullBio` 的每個字串各自渲染為 about.html 的一個 `<p>` 段落。
`tags` 顯示在 about.html 的興趣標籤列。

### 修改頁尾

```json
{
  "repo": "oMiki0826o/oMiki0826o.github.io",
  "stats": {
    "lastUpdated": "2026-06-30"
  },
  "footer": {
    "year": "2020-2026",
    "owner": "Miki",
    "poweredBy": ["HTML", "CSS", "JavaScript"],
    "hosting": "Hosted on GitHub Pages"
  }
}
```

瀏覽量與訪客數由 busuanzi 服務自動填入，無需手動設定。

`lastUpdated` 現在只是「查不到真實資料時」的備援顯示值：頁面載入後
會拿 `repo`（格式為 `擁有者/儲存庫名稱`）向 GitHub 公開 API 查詢這個
倉庫最新一次 commit 的時間，成功的話會直接覆蓋成真實日期；只有離線
或 GitHub API 額度用盡時才會維持顯示 `lastUpdated` 這個手動填的值。
換過儲存庫名稱、或想拿掉 `repo` 只用手動日期，都直接改這兩個欄位即可，
不需要動到任何 JS。

---

## music.json — 音樂播放清單

控制：音樂播放器要播什麼。支援兩種模式，依資料形狀自動判斷，
不需要另外設定「模式開關」。

### 模式一：單一 YouTube 播放清單（目前站上使用的模式）

```json
[
  {
    "type": "youtube",
    "youtubeId": "a-eHtP43yKU",
    "playlistId": "PLfxP_gTTvP3LCPFEeQ2vYqgYWJWhVumzN",
    "title": "Now Playing",
    "artist": "",
    "cover": "https://i.ytimg.com/vi/a-eHtP43yKU/hqdefault.jpg"
  }
]
```

只要第一筆資料帶有 `playlistId`，播放器就會直接掛載這份真實的 YouTube
播放清單：上一首／下一首呼叫的是 YouTube 自己的清單導覽，一首播完會
自動接播下一首，不需要在這份 JSON 裡逐首列出清單內容。

`title` / `artist` 只在「YouTube 資料還沒讀到」的瞬間短暫顯示，正常
情況下播放器會用 `getVideoData()` 直接讀取當下真正播放的那首歌的
標題與頻道名稱並覆蓋這兩個欄位，所以不需要手動維護成清單裡每首歌
的正確歌名——也維護不來，畢竟這份 JSON 並不知道清單裡實際有哪些歌。

`cover` 用 `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg` 這個
固定格式就能拿到該影片的縮圖，不需要另外找圖或上傳。

`youtubeId` 與 `playlistId` 都能從播放清單網址直接複製：
`https://www.youtube.com/watch?v=a-eHtP43yKU&list=PLfxP_gTTvP3LCPFEeQ2vYqgYWJWhVumzN`
→ `youtubeId` 是 `?v=` 後面那段，`playlistId` 是 `&list=` 後面那段。

### 模式二：手動列出多首單曲（沒有 playlistId 時的舊行為）

```json
[
  {
    "type": "youtube",
    "youtubeId": "XXXXXXXX",
    "title": "第一首",
    "artist": "演出者 A"
  },
  {
    "type": "youtube",
    "youtubeId": "YYYYYYYY",
    "title": "第二首",
    "artist": "演出者 B"
  }
]
```

不帶 `playlistId` 時，播放器會退回「在這份陣列裡循環」的行為：
陣列順序即播放順序，上一首／下一首在陣列內前後移動，播到最後一首
再按下一首會回到第一首。這種模式下 `title`／`artist` 就是實際顯示的
歌名，需要自行填寫正確。

---

## links.json — 所有連結

控制：導覽列連結、社群圖示列、Hero 下方膠囊快速連結。

### 新增社群圖示

```json
{
  "social": [
    {
      "type": "github",
      "label": "GitHub",
      "url": "https://github.com/yourname",
      "icon": "fa-brands fa-github"
    }
  ]
}
```

`icon` 的值來自 Font Awesome 6，格式為 `fa-brands fa-xxx` 或 `fa-solid fa-xxx`。
完整圖示列表：https://fontawesome.com/search

### 新增膠囊快速連結

```json
{
  "quickLinks": [
    {
      "label": "About",
      "url": "/pages/about.html",
      "icon": "fa-solid fa-user"
    },
    {
      "label": "上香",
      "url": "/pages/ripmiki.html",
      "icon": "fa-solid fa-fire"
    }
  ]
}
```

### 修改導覽列

```json
{
  "nav": [
    { "label": "首頁", "url": "/index.html" },
    { "label": "關於", "url": "/pages/about.html" }
  ]
}
```

---

## projects.json — 專案列表

控制：首頁專案預覽卡片 + projects.html 完整列表。

### 新增一筆專案

```json
[
  {
    "title": "Firefly Bot",
    "description": "多功能 Discord Bot，整合音樂、管理與 AI 對話功能。",
    "tags": ["Python", "Discord.py", "OpenAI"],
    "cover": "https://example.com/preview.png",
    "url": "https://github.com/yourname/firefly-bot"
  }
]
```

`cover` 顯示為左側 72×72 縮圖，設為空字串 `""` 時縮圖不顯示，文字自動填滿。
`tags` 以 ` · ` 串接顯示在卡片 meta 列。

---

## articles.json — 文章列表

控制：首頁文章預覽卡片 + articles.html 完整列表。

### 新增一篇文章

```json
[
  {
    "title": "我如何用 Python 自動化每天的煩人小事",
    "excerpt": "從需求分析到部署，記錄一個下午的自動化旅程。",
    "cover": "",
    "date": "2026-06-30",
    "url": "https://your-blog.com/article-slug"
  }
]
```

`date` 格式建議維持 `YYYY-MM-DD`，顯示於卡片 meta 列。
`excerpt` 最多顯示兩行，超出以省略號截斷。

---

## timeline.json — 歷程時間軸

控制：首頁時間軸預覽（僅限 `highlight: true`，最多 3 筆）+ timeline.html 完整頁。

### 新增一筆歷程

```json
[
  {
    "year": "2026",
    "title": "Firefly Bot 2.0 上線",
    "description": "重構架構，加入 AI 對話與模組化指令系統。",
    "highlight": true
  }
]
```

`highlight: true` → 出現在首頁預覽與 timeline.html。
`highlight: false` → 只出現在 timeline.html。

---

## quotes.json — 每日一句

控制：頁尾上方的隨機語句（每次重新整理隨機抽一句）。

### 新增語句

```json
{
  "quotes": [
    "茶是一種蔬菜湯，咖啡是一種豆漿。",
    "Keep learning. Keep creating.",
    "在這裡加入你想說的話。"
  ]
}
```

在 `quotes` 陣列末尾加入字串即可，不限數量。
