# config/ 設定說明

本目錄的所有 JSON 檔案控制網站的顯示內容。
修改流程：直接編輯 JSON → `git commit` → `git push`，
GitHub Pages 自動重新部署，重新整理頁面即可看到更新。

---

## site.json — 網站核心資料

控制：名稱、副標、簽名、頭像、鎮樓圖、自介、頁尾版權。

### 更換顯示名稱與副標

```json
{
  "name": "Miki",
  "subtitle": "‧ Student"
}
```

`name` 同時作用於 Hero 標題與瀏覽器分頁（顯示為 `Miki | Student`）。
副標前置的 `‧` 是視覺裝飾符，會在分頁標題中自動移除。

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
`lastUpdated` 為靜態顯示的最後更新日期。

---

## music.json — 音樂播放清單

控制：播放器的曲目清單（支援多首，可手動切換上下首）。

### 新增一首 YouTube 曲目

```json
[
  {
    "type": "youtube",
    "youtubeId": "a-eHtP43yKU",
    "title": "鐵道繁星",
    "artist": "崩壞：星穹鐵道 OST",
    "cover": ""
  }
]
```

`youtubeId` 取自 YouTube 網址 `?v=` 後的部分：
`https://youtu.be/MDcPpQHAEro?si=2Y_TzpBFzYTeJVtn` → `"youtubeId": "a-eHtP43yKU"`

### 新增第二首

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

陣列順序即播放順序，曲目播完後需手動按下一首，不會自動循環。

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
