# Miki's Website — 重構規劃、修改規範、目前狀態與參考

最後更新：2026-10-07  
專案：`oMiki0826o/oMiki0826o.github.io`  
目前視覺基準：**V5「柔和日系 5.x」**  
目前技術基準：**Next.js App Router + TypeScript + Static Export**

> **現行實作優先說明（2026-10-07）**：此文件保留重構歷史供參考；若後續段落與現況矛盾，以下狀態優先：網站正式支援 `zh-TW`／`en`／`ja`、`package-lock.json` 與 `npm ci`、per-page canonical／hreflang、sitemap、robots、Person／WebSite／Article JSON-LD、三語 Notes detail、真實 5:3 作品封面、GitHub／Discord／Email 真實聯絡入口，以及 exported-site E2E。首頁**不**渲染即時 status；V5 視覺與首頁順序維持 Freeze。

---

## 1. 文件定位

本文件是網站後續修改時的主要依據，用來固定目前已確認的方向，避免之後因為重構、參考其他網站或新增功能，又把網站改回不符合需求的樣子。

設計決策優先順序：

1. 使用者最新明確要求。
2. V5「柔和日系 5.x」已確認方向。
3. 本文件。
4. 5.x 舊站仍值得保留的內容與視覺語言。
5. 外部網站只作局部參考，不直接複製。

---

## 2. 專案目標

網站定位不是工程師履歷頁、SaaS Landing Page、GitHub Profile 延伸，也不是 Linktree。

定位是：

> **Personal Homepage + Project Showcase + Notes + Timeline**

核心感受：

- 柔和。
- 日系。
- 有個人空間感。
- 不滿版。
- 不過度玻璃化。
- 有暖螢火蟲。
- 有鎮樓圖。
- 有歌曲。
- 有個人簡介與銘言。
- 有專案。
- 有文章／紀錄。
- 有歷程。
- 技術底層現代化、可維護。

---

## 3. 歷史版本與現在的基準

### 3.1 5.10

目前主要視覺與內容節奏來源。

已確認 commit：

```text
2f45cfafec47f424e7d88fc32481abb216d60659
```

要保留：

- 頭像 → 簡介 → 銘言 → 音樂 → 鎮樓圖 → 後續內容的順序。
- 淺藍／薄荷背景。
- 天空藍、杏桃、螢火綠。
- 暖螢火蟲。
- 個人網站感。
- 鎮樓圖。
- 音樂播放器。
- Projects / Articles / Timeline 同時存在。

不保留：

- 舊 HTML / CSS / JS runtime renderer。
- `config/*.json` runtime fetch。
- 舊 DOM rendering 邏輯。
- placeholder 與過時連結。

### 3.2 6.0

Next.js 遷移後的技術來源。

已確認 commit：

```text
a723790ca8f722f64903fa2c6adfdb1b7dbc8ecc
```

保留：

- Next.js App Router。
- TypeScript。
- Static Export。
- `zh-TW` / `ja`。
- Content modules。
- Vitest。
- GitHub Actions。
- GitHub Pages。

不保留：

- Link Hub 型首頁。
- 過度簡化 About。
- 大量文字統一變成灰色 `muted`。
- 內容比 5.x 更少的方向。

### 3.3 V5「柔和日系 5.x」

這是現在真正的設計母版。

概念：

```text
5.x 的內容順序與個人感
+
日系作品集的留白與排版
+
Next.js 的技術底座
```

後續不得因為找到新的參考網站，就任意重新換 palette、首頁順序或整體版型。

---

## 4. 外部參考規則

### 日系作品集參考圖

使用者提供的日系 Portfolio 截圖是目前主要外部版面參考。

只參考：

- 中央窄版內容。
- 大量留白。
- 柔和主色。
- Works / About 清楚分區。
- 英文字體較圓。
- 小卡片整齊。
- 圖片與文字比例克制。

不照抄：

- 對方插畫。
- 完整配色。
- 元件外型。
- 版權內容。

### YuYue71

```text
https://github.com/YuYue71/YuYue71.github.io
```

只參考音樂播放器底層：

- playlist data 與 UI 分離。
- 狀態集中管理。
- 播放／暫停／音量／進度由同一控制層管理。

**不是視覺參考。**

### kimi.ing

```text
https://kimi.ing/
```

只作音樂互動與 provider 思路參考。

**不是視覺參考。**

### qilin / mygo.tw

```text
https://chilin.mygo.tw/
https://github.com/qilin102223/mygo.tw
```

目前不列為正式設計基準。

若後續可可靠分析，可研究內容編排與 Blog / Portfolio 混合方式，但不能因此推翻 V5。

---

## 5. 首頁固定順序

目前已確認：

```text
Navigation
↓
頭像
↓
Miki
↓
簡介
↓
銘言
↓
目前狀態
↓
歌曲
↓
鎮樓圖
↓
About
↓
Works
↓
Notes
↓
Timeline
↓
Footer
```

這個順序是核心設計，不隨意更換。

理由：

- 先讓訪客知道「這是誰的網站」。
- 再用音樂與鎮樓圖建立氣氛。
- 最後進正式內容。
- 不讓訪客一進首頁就看到 Project Grid。
- 延續 5.x 原本的個人首頁節奏。

---

## 6. 視覺規範

關鍵字：

```text
柔和
乾淨
日系
個人網站
暖螢火蟲
淺藍
薄荷
低飽和
有留白
小尺度
```

禁止方向：

```text
SaaS
Dashboard
Cyberpunk
GitHub README
工程師履歷模板
滿版 Portfolio
AI Landing Page
大量 glass cards
大量 blob
大量無用途幾何圖形
```

---

## 7. 寬度與留白

目前全站主容器：

```css
.page {
  width: min(100% - 28px, 820px);
}
```

Section：

```css
.section {
  width: min(100%, 720px);
}
```

鎮樓圖：

```css
.featured {
  width: min(100%, 700px);
}
```

音樂：

```css
.music {
  width: min(100%, 500px);
}
```

原則：

- 不做滿版。
- 除非有非常明確需求，不把主要內容拉到 1000px 以上。
- 桌面版必須保留左右呼吸空間。
- 手機版維持至少 10px 以上安全邊距。

---

## 8. 色彩規範

### 背景

```css
--bg-a: #eef5fb;
--bg-b: #e7f5f1;
--bg-c: #dcefe6;
```

### 主色：天空藍

```css
--blue: #5fa4dd;
--blue-soft: #b1d4f1;
```

主要使用：

- `Miki`。
- Section 英文標題。
- 主要連結。
- 播放進度。
- Note title。
- Timeline 結構。

### 點綴：杏桃

```css
--orange: #efb26c;
--orange-soft: #f4d1b3;
```

只用在：

- Play。
- 日期。
- metadata。
- 小面積點綴。

### 點綴：螢火綠

```css
--green: #b6de7c;
--green-soft: #d5eab8;
```

只用在：

- 螢火蟲。
- Status。
- Volume。
- 少量第三層點綴。

### 文字

不使用純黑：

```css
--text: #39515a;
--text-strong: #314851;
--muted: #71858b;
--faint: #9badb1;
```

原則：

- 文字以藍灰為主。
- 顏色要看得到，但不要每行都不同色。
- 不把整頁又做成全部 `muted`。

---

## 9. 字體規範

### 英文

```text
Nunito
```

用途：

- Miki。
- About / Works / Notes / Timeline。
- Button。
- Metadata。
- 日期。

原因：

- 圓。
- 柔。
- 比 Inter / monospace 更不像工程模板。

### 中文／日文標題

```text
Zen Maru Gothic
```

### 正文

```text
Noto Sans TC
```

### 銘言

```text
Klee One
```

Klee One 只作少量手寫感，不全站套用。

---

## 10. 頭像規範

目前正式頭像：

```text
/public/assets/miki-avatar.jpeg
```

來源：使用者於 2026-10-07 在對話中提供的新圖片。

首頁：

```css
width: 104px;
height: 104px;
border-radius: 50%;
object-fit: cover;
```

明確禁止：

- 外圈。
- outline。
- glow ring。
- 背景大圓。
- blob。
- 不具資訊用途的裝飾。

同一圖片目前也用作 favicon。

---

## 11. 音樂播放器規範

### UI

必須：

- 置中。
- 無卡片框。
- 無玻璃背景。
- 不顯示 YouTube iframe。
- 只有歌名、歌手、控制、進度、音量。

目前：

```text
使一顆心免於哀傷
Robin / HOYO-MiX
YouTube ID: MDcPpQHAEro
```

### 架構

```text
content/music.ts
      ↓
components/home/music-player.tsx
      ↓
PlayerAdapter
      ↓
lib/player/youtube.ts
      ↓
YouTube IFrame API
```

### Provider 原則

- 初始頁面不載 YouTube API。
- 第一次按播放才 lazy load。
- 不 autoplay。
- iframe 隱藏。
- UI 不依賴 YouTube DOM。
- 未來可以擴充其他 provider。

### 目前限制

目前 playlist 只有一首歌。

所以現階段：

```text
Previous = restart
Next     = restart
```

未來新增多首必須完整實作 track lifecycle，不能只改 UI index。

---

## 12. 鎮樓圖規範

目前：

```text
https://pbs.twimg.com/media/GQgH_VIbQAAViAh?format=jpg&name=large
```

首頁位置：

```text
歌曲之後
About 之前
```

原則：

- 不滿版。
- 不當 full-screen hero。
- 不大量疊字。
- 不套複雜 glass frame。
- 可有小圓角與很輕陰影。
- 圖本身就是內容。

---

## 13. About 規範

首頁：

```text
照片
+
兩段簡介
+
Tags
+
完整介紹 →
```

不要加入：

- Skills 百分比。
- Progress bar。
- 履歷技能表。
- 能力星等。
- 不必要個資。

About 要像「介紹自己」，不是 Resume。

---

## 14. Works 規範

目前首頁核心專案：

```text
Firefly Bot
Miki's Website
```

正式 repo：

```text
https://github.com/oMiki0826o/Discord-Bot
https://github.com/oMiki0826o/oMiki0826o.github.io
```

目前 cover 為柔和處理的實際專案畫面。

後續建議換成：

- 真實截圖。
- 專案 logo。
- 與作品直接相關的圖片。

不要加入：

- Stars。
- Forks。
- Contribution graph。
- Repository metrics dashboard。

---

## 15. Notes 規範

目前：

```text
從零開始寫 Discord Bot
簡單的了解我
```

現況只有 metadata / excerpt，沒有文章 detail。

後續建議：

```text
/notes/[slug]
```

內容可採 MDX。

不應同時維護兩套重複 metadata。

---

## 16. Timeline 規範

目前：

```text
2026 — Miki's website
2026 — Firefly Bot 2.0
2025 — 開始開發 Discord Bot
2024 — 開始學 Python
```

維持：

- 直式。
- 窄版。
- 小節點。
- 低調。
- 不做大型橫向動畫。
- 不做資料視覺化 dashboard。

若未來項目變多，首頁只留最近幾筆，完整頁顯示全部。

---

## 17. Navigation 規範

桌面：

```text
miki.        About   Works   Notes   Timeline        日
```

手機：

- 中間導覽隱藏。
- 保留 `miki.`。
- 保留語言切換。
- 內容未增加前不需要 hamburger。

---

## 18. 響應式規範

最低：

```text
320px
```

必檢查：

```text
320 × 568
375 × 812
390 × 844
430 × 932
1280 × 720
1440 × 900
1920 × 1080
```

手機要求：

- 無 horizontal scroll。
- Miki 不亂換行。
- 音樂控制不擠壓。
- Projects 單欄。
- About 單欄。
- Caption 正常換行。
- 連結可點擊範圍足夠。

iOS Safari 是正式驗證目標。

---

## 19. 目前專案架構

```text
app/
├── [locale]/
│   ├── about/
│   ├── projects/
│   ├── notes/
│   ├── timeline/
│   ├── layout.tsx
│   └── page.tsx
├── globals.css
├── layout.tsx
├── page.tsx
└── ripmiki/

components/
├── home/
│   ├── home-page.tsx
│   └── music-player.tsx
├── layout/
│   ├── content-page.tsx
│   ├── page-shell.tsx
│   ├── site-footer.tsx
│   └── site-header.tsx
└── ui/
    └── fireflies.tsx

content/
├── music.ts
├── notes.ts
├── profile.ts
├── projects.ts
├── quotes.ts
├── timeline.ts
└── types.ts

i18n/
└── config.ts

lib/
├── content.ts
└── player/
    ├── types.ts
    └── youtube.ts

public/
└── assets/
    └── miki-avatar.jpeg

tests/
├── components/
├── content/
└── i18n/
```

---

## 20. 程式修改規範

### 職責

內容：

```text
content/
```

頁面：

```text
app/
```

UI：

```text
components/
```

Player provider：

```text
lib/player/
```

i18n：

```text
i18n/
```

禁止為了改文案，把大量文字 hard-code 回 `page.tsx`。

### TypeScript

- 保持 `strict: true`。
- 避免 `any`。
- 外部 API 定義最小必要型別。
- UI 與 provider 使用 interface 溝通。
- locale 使用 `Locale` 型別。

### Error handling

禁止靜默吞錯：

```ts
try {
  ...
} catch {
}
```

播放器失敗至少要反映成：

```text
PlayerState = error
```

### 註解

只解釋：

- 為什麼。
- 邊界。
- 特殊決策。

區段格式：

```ts
// ── Player lifecycle ──
```

CSS：

```css
/* ── Music player ── */
```

---

## 21. CSS 修改規範

優先使用現有 token：

```text
--bg-a
--bg-b
--bg-c
--blue
--blue-soft
--orange
--orange-soft
--green
--green-soft
--text
--text-strong
--muted
--faint
--line
```

不要每做一個 section 就加一套新顏色。

動畫只接受：

- 很淡的螢火蟲。
- Fade。
- 1–3px Hover。
- 小幅位移。

不要：

- 3D tilt。
- 大型 parallax。
- 跟滑鼠走的大光圈。
- 滿版粒子。
- 旋轉 blob。

必須尊重：

```css
@media (prefers-reduced-motion: reduce)
```

---

## 22. 內容修改位置

```text
換頭像          → content/profile.ts + public/assets/
換鎮樓圖        → content/profile.ts
換歌            → content/music.ts
新增 Project    → content/projects.ts
新增 Note       → content/notes.ts
新增 Timeline   → content/timeline.ts
改 Footer Quote → content/quotes.ts
```

一般內容修改不應修改 React 結構。

---

## 23. i18n 規範

目前：

```text
zh-TW
en
ja
```

預設：

```text
zh-TW
```

要求：

- 繁中必填。
- 英文與日文同步補。
- 路由必須可 static export。

目前主要 URL：

```text
/
/zh-TW
/en
/ja
/zh-TW/about
/en/about
/ja/about
/zh-TW/projects
/en/projects
/ja/projects
/zh-TW/notes
/en/notes
/ja/notes
/zh-TW/timeline
/en/timeline
/ja/timeline
```

---

## 24. SEO 規範

目前已有：

- title。
- description。
- favicon。
- Open Graph。
- Twitter Card。

目前 favicon：

```text
/assets/miki-avatar.jpeg
```

OG image 使用鎮樓圖。

下一階段補：

- per-page metadata。
- canonical。
- hreflang。
- Person JSON-LD。
- sitemap。
- robots。
- 未來文章的 Article metadata。

---

## 25. 測試與部署

本機：

```bash
npm install
npm test
npm run build
```

Static Export：

```text
out/
```

目前 GitHub Actions：

```text
Checkout
↓
Node 22
↓
npm install
↓
npm test
↓
npm run build
↓
Upload out/
↓
GitHub Pages
```

workflow：

```text
.github/workflows/static.yml
```

---

## 26. package-lock 規劃

目前專案沒有固定 `package-lock.json`。

正式 release 前建議：

```bash
npm install
git add package-lock.json
```

之後 CI 改為：

```bash
npm ci
```

原因：

- dependency 可重現。
- 本機與 CI 一致。
- 避免未來套件解析結果改變。

---

## 27. 目前狀態

### 已完成

```text
[完成] Next.js App Router
[完成] TypeScript
[完成] Static Export 設定
[完成] V5 首頁
[完成] 5.x 首頁閱讀順序
[完成] 新頭像 /assets/miki-avatar.jpeg
[完成] favicon 新頭像
[完成] zh-TW / ja
[完成] About
[完成] Projects
[完成] Notes
[完成] Timeline
[完成] 暖螢火蟲
[完成] 置中無框 Player UI
[完成] YouTube PlayerAdapter
[完成] YouTube API lazy load
[完成] 不 autoplay
[完成] 基礎 SEO metadata
[完成] GitHub Pages workflow
[完成] Vitest 基礎結構
```

### 尚未完整驗證

```text
[待驗證] npm install
[待驗證] npm test
[待驗證] npm run build
[待驗證] out/ static export
[待驗證] GitHub Pages production deploy
[待驗證] iOS Safari
[待驗證] 320px
[待驗證] 日文實際閱讀品質
```

目前產出環境無法可靠完成 npm registry 安裝，因此不能把 build / tests 標記成已通過。

### 尚未完成

```text
[待做] package-lock.json
[待做] Project 真實 cover
[待做] Note 文章 detail
[待做] MDX / 文章系統
[待做] 多首歌曲
[待做] per-page SEO
[待做] canonical / hreflang
[待做] JSON-LD
[待做] E2E
[待做] 真實社群連結整理
```

---

## 28. 已知限制

### 音樂 Previous / Next

目前只有一首，因此兩者暫時都是 restart。

若新增 playlist，要重建 adapter lifecycle。

### Notes

現在只有標題、摘要、日期，沒有真正文章頁。

### Works cover

現在是文字色塊 placeholder，尚未換成專案實圖。

### CI

現在使用 `npm install`，原因是沒有 lockfile。正式發布後應改 `npm ci`。

### Google Fonts

目前依賴 Google Fonts。

載入失敗時會 fallback，不影響功能，但視覺會有差。

---

## 29. 下一階段規劃

### Phase 1：Build 驗證

```text
npm install
npm test
npm run build
```

修完所有 TypeScript / React / Static Export / Vitest 問題。

完成後加入 lockfile。

### Phase 2：視覺 QA

只調：

- spacing。
- font-size。
- line-height。
- 圖片 crop。
- 卡片比例。
- 手機 RWD。

此階段禁止重新換風格。

### Phase 3：真實內容

替換：

- Project cover。
- 社群 URL。
- Note 真正內容。
- Featured caption。
- Timeline 文案。

### Phase 4：Notes detail

建立：

```text
/notes/[slug]
```

可使用 MDX。

### Phase 5：SEO

補：

- page metadata。
- canonical。
- alternate languages。
- JSON-LD。
- sitemap。
- robots。

### Phase 6：播放器多曲

新增：

- 真正 previous / next。
- track lifecycle。
- provider destroy / recreate。
- ended 行為。

視覺仍維持 V5 無框播放器。

---

## 30. 修改前檢查

每次修改前確認：

```text
這是在解決真實問題嗎？
會不會重新變成工程師模板？
會不會增加沒有資訊用途的裝飾？
會不會破壞 5.x 順序？
會不會讓首頁變滿？
會不會讓顏色變花？
這個內容是不是應該改在 content/？
會不會破壞 Static Export？
會不會破壞 zh-TW / ja？
```

---

## 31. 修改完成檢查

程式：

```bash
npm test
npm run build
```

人工：

```text
首頁順序正確
頭像正確
播放器置中
鎮樓圖正常
About 正常
Works 正常
Notes 正常
Timeline 正常
繁中正常
日文正常
320px 無橫向溢出
圖片無破圖
外部連結正確
favicon 正確
OG metadata 正確
```

---

## 32. 核心不可破壞規則

```text
1. V5 是目前視覺母版。
2. 5.x 首頁順序不得任意改。
3. Next.js 架構保留。
4. 不回退到舊式 runtime renderer。
5. 不做滿版。
6. 不做 SaaS / Dashboard。
7. 不加意義不明 blob。
8. 不給頭像加裝飾圈。
9. 音樂播放器保持置中、無框。
10. 天空藍是主色。
11. 杏桃與螢火綠只做點綴。
12. 螢火蟲必須很淡。
13. 英文字體保持圓潤。
14. 內容優先修改 content/。
15. 修改後必須 test + build。
```

本文件應隨重大設計與架構決策同步更新。
