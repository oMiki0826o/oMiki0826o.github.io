# Miki's Website

A quiet personal website and Blog for writing, projects and occasional observations.

[繁體中文](#繁體中文) | [English](#english)

## 繁體中文

這裡是 Miki 的個人網站，收錄文章、開發筆記、作品，以及一些日常紀錄。保留天空藍、薄荷色、低干擾的螢火蟲與三語內容。

正式網站：<https://omiki0826o.github.io/>

### 網站結構

- **Home**：自我介紹、最近文章、精選作品。
- **Blog**：StructMark `.sm` 文章、分類、目錄、閱讀進度、相關閱讀與 RSS。
- **Works**：專案作品、介紹、GitHub 與實際 Demo。
- **About**：簡介、興趣與過往歷程。

既有 Blog 文章路徑維持 `/zh-TW/notes/<slug>/` 等形式，確保舊連結不失效。支援繁體中文、英文與日文。

已從公開網站移除 Lab、遊戲、實驗計算器與工具頁；網站的 StructMark 文章解析器仍保留。

### 技術與部署

- Next.js 16、React 19、TypeScript，使用靜態匯出。
- GitHub Pages 部署正式網站；PR 先通過 GitHub Actions 驗證。
- Vitest、Node.js 測試與 Playwright（三種瀏覽器環境）。
- StructMark V1.1 Parser / Renderer；維護於 `lib/structmark/core/`。

Node.js 22 以上：

```bash
npm ci
npm run dev
npm run validate:fast
npx playwright install chromium webkit
npm run test:e2e
```

發佈前驗證 `npm run validate`。建置結果在 `out/`，可用 `npm run preview` 檢視靜態頁面。

### 更新文章

將 `zh-TW.sm`、`en.sm`、`ja.sm` 和 `meta.ts` 放在 `content/notes/<slug>/`，再執行：

```bash
npm run notes:sync
npm run docs:check
```

作品資料在 `content/projects.ts` 和 `content/project-details.ts`。詳細規則見 `docs/DEVELOPMENT.sm`。

## English

Miki's personal homepage and Blog for development notes, projects, and daily observations. The site preserves its soft sky-blue and mint palette, supports Traditional Chinese, English, and Japanese, and uses StructMark for articles.

Home, Blog, Works, and About are the four primary sections. The former interactive Lab has been removed. Existing `/notes/` URLs remain unchanged for compatibility.

Use Node.js 22+, `npm ci`, `npm run dev`, and `npm run validate`. GitHub Actions validates PRs and deploys the static `out/` output to GitHub Pages after changes reach `main`.

## License

The repository does not currently provide a standalone LICENSE. The bundled StructMark code has its own license at `lib/structmark/LICENSE`.
