# Miki's Website

Miki 的個人網站，部署在 GitHub Pages。

這一版以舊站 5.x 的內容順序與個人感為設計基準，但底層完整改成 Next.js App Router + TypeScript + Static Export。

## 首頁順序

1. 頭像
2. Miki / 簡介 / 銘言
3. 無外框音樂播放器
4. 鎮樓圖
5. About
6. Works
7. Notes
8. Timeline
9. Footer

設計刻意避免滿版、過多玻璃卡片與沒有資訊用途的幾何裝飾。主色使用 5.x 的天空藍，杏桃與螢火綠只作點綴；背景保留原本的淺藍／薄荷漸層與很淡的螢火蟲。

## 技術

- Next.js 16 App Router
- React 19
- TypeScript
- Static Export (`out/`)
- `zh-TW` / `en` / `ja`
- YouTube IFrame API 音樂播放器
- Vitest
- GitHub Actions + GitHub Pages

## 本機開發

```bash
npm ci
npm run dev
```

## 驗證

```bash
npm test
npm run build
npm run test:e2e
```

成功建置後輸出在 `out/`。

## 主要維護位置

```text
content/
├── profile.ts
├── music.ts
├── projects.ts
├── notes.ts
├── timeline.ts
└── quotes.ts
```

一般內容修改不需要碰 React 頁面。

## 音樂播放器

播放器 UI 與播放來源分離：

```text
content/music.ts
      ↓
MusicPlayer.tsx
      ↓
PlayerAdapter
      ↓
YouTube IFrame API
```

YouTube API 只在使用者第一次按播放後載入；不自動播放，iframe 本身不顯示在頁面上。

## 部署

推送 `main` 後，GitHub Actions 會依序執行：

1. `npm ci`
2. `npm test`
3. `npm run build`
4. `npm run test:e2e`
5. 上傳 `out/`
6. 部署 GitHub Pages
