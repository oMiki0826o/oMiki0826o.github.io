# Notes content

文章會逐步從 `content/notes.ts` 遷移到這個目錄。每篇文章預計使用一個資料夾，讓內容、封面與 metadata 可以一起保存：

```text
content/notes/
└── article-slug/
    ├── meta.ts
    ├── zh-TW.md
    ├── en.md
    └── ja.md
```

`meta.ts` 只放不屬於文章正文的資料：

- `slug`
- `date`
- `category`
- `tags`
- `relatedSlugs`
- `cover`

Markdown 檔案只放對應語言的正文。頁面、RSS、閱讀時間與 sitemap 都從同一個 content loader 讀取，新增文章時不需要修改頁面元件。

目前舊文章仍由 `content/notes.ts` 提供，遷移完成前不會同時產生兩份公開頁面。
