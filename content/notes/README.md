# Notes content

所有文章現在都使用這個目錄。每篇文章各自擁有一個資料夾，讓內容、封面與 metadata 可以一起保存：

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

Markdown 檔案只放對應語言的正文。`content/notes/index.ts` 集中匯入 metadata，`notes-loader.ts` 在建置時讀取三語正文；頁面、RSS、閱讀時間與 sitemap 都從同一個 content loader 讀取，新增文章時不需要修改頁面元件。

網站與測試都直接從 `content/notes/index.ts` 讀取；所有實際內容都在各自的 Markdown 檔案中，不會產生兩份公開頁面。
