import type {LocalizedText} from './types';

export type ProjectDetail = {slug: string; title: LocalizedText; lead: LocalizedText; relatedNoteSlugs?: readonly string[]; sections: Array<{heading: LocalizedText; body: LocalizedText}>};

export const projectDetails: ProjectDetail[] = [{
  slug: 'discord-bot',
  title: {'zh-TW': 'Discord Bot', en: 'Discord Bot', ja: 'Discord Bot'},
  lead: {
    'zh-TW': '一個從能動開始，慢慢整理成可以繼續維護的 Discord Bot。',
    en: 'A Discord Bot that started as something that worked, then slowly became something maintainable.',
    ja: '動けば十分だったところから、少しずつ保守できる形へ整理しているDiscord Botです。'
  },
  sections: [
    {heading: {'zh-TW': '為什麼做', en: 'Why', ja: 'なぜ作ったか'}, body: {'zh-TW': '最初只是想把腦中的功能做出來：音樂、管理、自動化，還有一些不太安分的想法。功能越長越多後，真正的問題變成怎麼讓它不要互相拖垮。', en: 'It began with a few ideas: music, moderation, automation, and experiments. As the bot grew, the real problem became keeping each feature from pulling the others apart.', ja: '音楽、管理、自動化、そしていくつかの実験を形にしたかったのが始まりです。機能が増えると、互いに壊し合わずに保つことが課題になりました。'}},
    {heading: {'zh-TW': '架構整理', en: 'Architecture', ja: '構成'}, body: {'zh-TW': '把核心啟動流程、extension 載入、設定、資料庫與各個模組分開。extension.py 負責組裝，模組自己管理功能，核心不需要知道每個功能的細節。', en: 'The startup flow, extension loading, settings, database, and features are separated. The assembly layer wires things together while the core stays unaware of each module’s details.', ja: '起動処理、extensionの読み込み、設定、データベース、各機能を分けています。組み立て役が接続し、Coreは各モジュールの細部を知りません。'}},
    {heading: {'zh-TW': '遇到的問題', en: 'Problems solved', ja: '解決した問題'}, body: {'zh-TW': '音樂來源失效、SQLite 同時存取、AI 工具呼叫衝突，這些都不是加一個 if 就能永遠解決的問題。現在的做法是把錯誤邊界說清楚，再讓 provider fallback 和 logging 接住它們。', en: 'Broken music sources, SQLite contention, and conflicting AI tool calls were not one-condition fixes. The current approach makes failure boundaries explicit, then lets provider fallbacks and logging handle them.', ja: '音楽ソースの失敗、SQLiteの競合、AIツール呼び出しの衝突は、ifを一つ足して終わる問題ではありません。失敗の境界を明確にし、fallbackとloggingで受け止めています。'}},
    {heading: {'zh-TW': '現在的樣子', en: 'Where it is now', ja: '現在'}, body: {'zh-TW': '它還沒有完成，也不打算假裝完成。這個專案現在更像一份持續修正的架構筆記：每次加功能，都順便把下一次比較容易壞的地方整理掉。', en: 'It is not finished, and it does not pretend to be. The project is also a record of architectural cleanup: each new feature is an excuse to make the next failure easier to understand.', ja: 'まだ完成ではなく、完成したふりもしません。新しい機能を加えるたびに、次に壊れそうな場所を少し整理していく構成の記録でもあります。'}},
    {heading: {'zh-TW': 'Module Loader', en: 'Module Loader', ja: 'Module Loader'}, body: {'zh-TW': 'Loader 會掃描含有 extension.py 的資料夾，讀取版本、顯示名稱與依賴，再依拓樸順序載入。必要模組不可被停用，選配模組則可以依伺服器需求關閉。', en: 'The loader scans folders with extension.py, reads version, display name, and dependencies, then loads modules in topological order. Required modules cannot be disabled while optional ones can follow each server’s needs.', ja: 'Loaderはextension.pyを含むフォルダを探し、バージョン、表示名、依存関係を読み、依存順に読み込みます。必須Moduleは無効化できず、選択式の機能はサーバーごとに止められます。'}},
    {heading: {'zh-TW': '一個錯誤怎麼被接住', en: 'How a failure is contained', ja: '失敗をどこで受け止めるか'}, body: {'zh-TW': '音樂播放器斷線、AI Provider 逾時或資料庫暫時鎖定時，模組應該先在自己的 Service 處理，再把可理解的結果交給 Cog。卸載也要清理播放器、自然語言指令與工作執行緒。', en: 'When a music player disconnects, an AI provider times out, or SQLite is briefly locked, the module handles it in its Service before the Cog presents a readable result. Teardown also removes players, natural commands, and workers.', ja: '音楽Playerの切断、AI Providerのtimeout、SQLiteの一時的なlockは、まずModuleのServiceで処理し、Cogには読める結果だけを渡します。Player、自然言語コマンド、workerも終了時に片付けます。'}},
    {heading: {'zh-TW': '這個作品真正留下的東西', en: 'What the project leaves behind', ja: 'この作品に残ったもの'}, body: {'zh-TW': '功能清單會隨時間改變，但真正留下的是一套面對變更的習慣：先劃出邊界，再保存狀態，最後讓錯誤有地方可追。Firefly Bot 仍在開發中，但已經從一次性的練習變成可以持續整理的專案。', en: 'Feature lists will change, but the lasting result is a way to handle change: draw boundaries, preserve state, and leave errors somewhere traceable. Firefly Bot is still under development, yet it has become a project I can return to and improve.', ja: '機能一覧は変わりますが、残ったのは変化に向き合う習慣です。境界を決め、状態を保存し、エラーを追える場所に残す。Firefly Botは開発途中ですが、何度でも戻って整理できるプロジェクトになりました。'}},
  ]
}, {
  slug: 'miki-website',
  title: {'zh-TW': "Miki's Website", en: "Miki's Website", ja: "Miki's Website"},
  lead: {
    'zh-TW': '一個慢慢整理成形的個人網站：保留螢火蟲與留白，也讓作品與筆記有地方可以繼續長大。',
    en: 'A personal site shaped slowly over time: keeping the fireflies and quiet space while giving works and notes room to grow.',
    ja: '蛍と余白の空気を残しながら、作品と記録が少しずつ育つ場所として整えている個人サイトです。'
  },
  sections: [
    {heading: {'zh-TW': '從舊站留下來的東西', en: 'What stayed from the old site', ja: '旧サイトから残したもの'}, body: {'zh-TW': '這個網站不是從一張空白模板開始，而是從幾次重做與部署失敗裡慢慢留下來。淺藍、薄荷、暖色字與螢火蟲，都是比框架更早存在的語氣。', en: 'This site did not begin as a blank template. It grew through several rewrites and failed deployments. The pale blue, mint, warm accents, and fireflies existed before the framework.', ja: 'このサイトは空のテンプレートから始まったのではなく、何度も作り直し、失敗したデプロイを越えて残ったものです。淡い青、ミント、暖色の文字、蛍はフレームワークより先にありました。'}},
    {heading: {'zh-TW': '內容與畫面分開', en: 'Content apart from presentation', ja: '内容と画面を分ける'}, body: {'zh-TW': '作品、文章、歷程與三語文案放在各自的 content 與 i18n 資料層，頁面元件只負責把它們排成可閱讀的樣子。新增一篇文章或一個作品，不需要重新複製整頁 JSX。', en: 'Works, notes, timeline entries, and localized copy live in their content layers. Page components focus on arranging them for reading, so a new note or project does not require duplicating page JSX.', ja: '作品、記録、Timeline、三言語の文言はそれぞれのcontentとi18n層に置き、ページのコンポーネントは読みやすく並べることに集中します。'}},
    {heading: {'zh-TW': '靜態，但不是靜止', en: 'Static, not stagnant', ja: '静的でも止まってはいない'}, body: {'zh-TW': '網站以 Static Export 部署到 GitHub Pages，不依賴伺服器或資料庫。這讓它可以長期放著運作，也能在有新作品、新文章或新彩蛋時，透過一次建置留下變化。', en: 'The site is deployed as a static export on GitHub Pages, without a server or database. It can stay reliable for a long time while still changing whenever a new work, note, or small secret is built.', ja: 'GitHub PagesへStatic Exportとしてデプロイし、サーバーやデータベースに依存しません。長く安定して置きながら、新しい作品や記録、小さな仕掛けをビルドのたびに残せます。'}}
  ]
}, {
  slug: 'cipher-tool',
  title: {'zh-TW': 'CipherTool', en: 'CipherTool', ja: 'CipherTool'},
  lead: {
    'zh-TW': '把常見的密碼、編碼與文字轉換集中在一個可以直接操作的小工具裡。',
    en: 'A small hands-on tool that brings common ciphers, encodings, and text conversions together.',
    ja: 'よく使う暗号、エンコード、文字変換を一つにまとめて直接試せる小さなツールです。'
  },
  sections: [
    {heading: {'zh-TW': '從解題與學習開始', en: 'Built for learning and puzzles', ja: '学習とパズルから'}, body: {'zh-TW': 'CipherTool 不是現代密碼學函式庫，而是一個把古典密碼與文字處理放在一起練習的工具。它適合觀察 Caesar、Vigenère、Rail Fence 等方法如何改變文字，也適合處理 Base64、Morse 與進位轉換。', en: 'CipherTool is not a modern cryptography library. It is a place to practise classical ciphers and text processing, from Caesar and Vigenère to Base64, Morse, and base conversion.', ja: 'CipherToolは現代暗号ライブラリではありません。CaesarやVigenère、Rail Fence、Base64、Morse、基数変換を試しながら学ぶための道具です。'}},
    {heading: {'zh-TW': '介面與功能邊界', en: 'Interface and boundaries', ja: '画面と境界'}, body: {'zh-TW': 'Tkinter 介面會依工具類型顯示需要的模式與參數，提供執行、複製與清除。功能集中在文字輸入與轉換，不把資料上傳到外部服務；但使用者仍不應把密碼、Token 或個資交給這些古典方法保護。', en: 'The Tkinter interface shows the mode and parameters needed by each tool, with execute, copy, and clear actions. The work stays in the text tool, but passwords, tokens, and personal data should never rely on these classical methods for protection.', ja: 'Tkinterの画面はツールごとに必要なモードと引数を表示し、実行、コピー、消去を用意します。処理は文字ツール内で完結しますが、パスワードやToken、個人情報を古典的な方式で守ってはいけません。'}},
    {heading: {'zh-TW': '這個作品留下的練習', en: 'What the project practises', ja: 'この作品で練習したこと'}, body: {'zh-TW': '這個專案的價值不只在功能數量，也在於把每個轉換方法拆成可以單獨理解與測試的步驟。它是一個比大型 Bot 小很多的作品，卻很適合拿來練習輸入驗證、錯誤提示與桌面介面。', en: 'The value is not only the number of tools. Each transform is separated into a step that can be understood and tested on its own. It is much smaller than the Bot, but useful practice for input validation, error messages, and desktop UI.', ja: '価値は機能の数だけではありません。各変換を理解しやすく、個別にテストできる単位へ分けています。Botより小さい作品ですが、入力検証、エラー表示、デスクトップUIの練習になりました。'}}
  ]
},
  {slug: "astro-lab", title: {"zh-TW": "AstroLab", "en": "AstroLab", "ja": "AstroLab"},
  lead: {"zh-TW": "清楚、輕量的觀星工具", "en": "A quiet companion for stargazing", "ja": "シンプルな観測のおとも"},
  sections: [
    {heading: {"zh-TW": "想解決的問題", "en": "The problem", "ja": "何を解決するか"}, body: {"zh-TW": "在瀏覽器裡整理觀測需要查找的天體與資訊，省去在多個分散頁面之間切換。", "en": "Bring practical observing references into one place instead of juggling separate pages.", "ja": "観測に必要な情報を一か所にまとめ、複数サイトの行き来を減らします。"}},
    {heading: {"zh-TW": "設計方式", "en": "Approach", "ja": "設計"}, body: {"zh-TW": "選擇不依賴帳號與後端的靜態網站，讓基礎功能在一般瀏覽器裡也能使用。", "en": "Use a static bilingual interface without accounts or a dedicated backend.", "ja": "アカウントや専用サーバーに依存しない静的なバイリンガルサイトです。"}},
    {heading: {'zh-TW': "介面與資料", en: "Interface and data", ja: "画面とデータ"}, body: {'zh-TW': "把觀測所需的天體資料與查詢流程放進中英雙語靜態網站，減少在不同資料頁之間切換。網站不要求建立帳號；資料是否完整、是否適合當晚觀測，仍需要依目標、時間及地點判斷。", en: "The bilingual static site brings observation references and browsing together without account creation. Observing conditions and target visibility still depend on the date, place and sky.", ja: "観測用の資料と検索をバイリンガルの静的サイトにまとめました。実際の見やすさは日時、場所、空の状態によって変わります。"}},
    {heading: {'zh-TW': "接下來的整理", en: "Next improvements", ja: "今後の整理"}, body: {'zh-TW': "比起一次加入大量星表，更重要的是讓資料來源、更新方式與搜尋結果容易確認。接下來會優先檢查觀測資訊的正確性、行動裝置可讀性，以及沒有網路時能保留多少必要內容。", en: "More catalog entries are less useful than trustworthy sources and readable results. The next priorities are data provenance, mobile readability and practical offline access.", ja: "星表を増やすだけでなく、情報源と更新方法を明確にし、スマートフォンでも読みやすくします。オフラインで使える範囲も検討します。"}}
  ]},
  {slug: "stlab", title: {"zh-TW": "STLab", "en": "STLab", "ja": "STLab"},
  lead: {"zh-TW": "把日常的小麻煩變成可使用的工具", "en": "Small tools for everyday work", "ja": "日常の作業を小さな道具に"},
  sections: [
    {heading: {"zh-TW": "為什麼做", "en": "Why it exists", "ja": "目的"}, body: {"zh-TW": "課表、表格與實驗紀錄並不需要龐大的系統。把常用功能做成小工具，使用時能立即開始。", "en": "Schedules, tables, and experiment charts do not always need a large application. Small focused utilities can be faster to use.", "ja": "時間割や表、グラフには大きなアプリより目的を絞った道具が使いやすいことがあります。"}},
    {heading: {"zh-TW": "重視的原則", "en": "Principles", "ja": "方針"}, body: {"zh-TW": "功能明確、介面乾淨，優先在本機處理資料，避免不必要的登入與伺服器依賴。", "en": "A clear interface, local processing where practical, and no unnecessary sign-in steps.", "ja": "明確な機能と簡潔な画面を重視し、できるだけローカルで処理します。"}},
    {heading: {'zh-TW': "幾個小工具", en: "Small focused tools", ja: "小さなツール"}, body: {'zh-TW': "STLab 把課表、資料表格與實驗圖表拆成不同的輕量 Web App。每一個工具只處理自己的任務，打開後就能使用，避免每次都必須進入龐大的管理系統。", en: "STLab separates timetable planning, data tables and experimental charts into focused browser tools. Each tool aims to make a routine task available without a large application workflow.", ja: "時間割、表、実験グラフを小さなWebアプリとして分けています。複雑な管理画面に入らなくても、必要な機能へ直接進めます。"}},
    {heading: {'zh-TW': "資料與維護", en: "Data and maintenance", ja: "データと保守"}, body: {'zh-TW': "工具重視能在瀏覽器中操作資料，但不把「本機處理」誤稱為所有情況下都能永久保存。使用前應確認匯出、備份與瀏覽器儲存的限制，後續改善也以資料可攜性和操作清楚為優先。", en: "Browser-side processing is convenient, but local storage is not a substitute for export or backups. Data portability and clear interactions are more important than adding decorative features.", ja: "ブラウザー内の処理は便利ですが、保存とバックアップは別の課題です。今後もデータの持ち出しやすさと操作の分かりやすさを重視します。"}}
  ]},
  {slug: "cipher-tool-web", title: {"zh-TW": "CipherTool Web", "en": "CipherTool Web", "ja": "CipherTool Web"},
  lead: {"zh-TW": "把文字轉換帶進瀏覽器", "en": "Text conversions in the browser", "ja": "ブラウザーで学ぶ文字変換"},
  sections: [
    {heading: {"zh-TW": "學習用途", "en": "Made for learning", "ja": "学習向け"}, body: {"zh-TW": "將古典密碼、常用編碼與進位轉換整理成即開即用的網頁；它不是保護敏感資料的現代加密工具。", "en": "Explore classical ciphers, encodings and number bases interactively. It is not a replacement for modern encryption.", "ja": "古典暗号、エンコード、進数変換を気軽に試すための道具で、現代の暗号化の代わりではありません。"}},
    {heading: {"zh-TW": "資料處理", "en": "Handling data", "ja": "データ処理"}, body: {"zh-TW": "著重在瀏覽器本機進行轉換，不需要將輸入內容傳到外部服務。", "en": "Keep conversions local to the browser, without requiring uploads or accounts.", "ja": "アカウントやアップロードを必要とせず、ブラウザー内で変換します。"}},
    {heading: {'zh-TW': "瀏覽器裡的練習", en: "Learning in the browser", ja: "ブラウザーで試す"}, body: {'zh-TW': "將 Caesar 等古典密碼、常見文字編碼與進位轉換整理成可即時輸入、比較結果的介面。它是學習原理與處理一般文字的工具，不能代替安全的密碼管理或現代加密協定。", en: "The browser interface makes classical ciphers, encodings and number conversions easier to experiment with. It is for learning and ordinary text transformations, not secure password storage or modern cryptography.", ja: "古典暗号、文字エンコード、進数変換をブラウザーで試せます。学習用の道具であり、パスワード保護や現代暗号の代わりにはなりません。"}},
    {heading: {'zh-TW': "使用時的邊界", en: "Usage boundaries", ja: "利用時の注意"}, body: {'zh-TW': "把輸入、參數及輸出結果放在同一段流程，讓每次轉換都能看出使用的是什麼方法。遇到不支援的字元或格式時應清楚提示，避免把錯誤結果誤認為成功解碼。", en: "Inputs, parameters and results should remain easy to inspect. Unsupported characters and malformed data need explicit feedback rather than output that looks successful but is misleading.", ja: "入力、設定、結果を見比べやすくし、対応していない文字や形式は明確に知らせる方針です。"}}
  ]},
  {slug: "structmark", title: {"zh-TW": "StructMark", "en": "StructMark", "ja": "StructMark"},
  lead: {"zh-TW": "讓自己設計的語言真正用在網站上", "en": "A markup language used in practice", "ja": "自作言語を実際のサイトで使う"},
  sections: [
    {heading: {"zh-TW": "語言核心", "en": "Language core", "ja": "言語コア"}, body: {"zh-TW": "為 .sm 文件開發 Lexer、Parser、AST 與安全 HTML 輸出，讓語法有明確結構，而不是只靠正規表示式替換。", "en": "A lexer, parser, AST and safe HTML renderer turn .sm documents into structured content rather than a chain of regex replacements.", "ja": "Lexer、Parser、AST、安全なHTMLレンダラーで .sm 文書を構造化して処理します。"}},
    {heading: {"zh-TW": "本站實際用途", "en": "Used on this website", "ja": "このサイトでの利用"}, body: {"zh-TW": "Notes 的三語文章由 StructMark 解析並輸出，實際用於三語文章的解析與輸出。", "en": "This site renders its multilingual Notes through StructMark.", "ja": "サイト内の記事のレンダリングにも利用しています。"}},
    {heading: {'zh-TW': "從語法到結構", en: "From syntax to structure", ja: "構文から構造へ"}, body: {'zh-TW': "StructMark 使用 Lexer、Parser 與 AST 處理 `.sm` 文件，再由渲染器產生安全的 HTML。這樣能辨認標題、區塊與行內語義，也方便追蹤錯誤位置，而不只是一層層正規表示式替換。", en: "StructMark turns .sm files into a lexer/parser-generated AST before safe HTML rendering. This preserves heading, block and inline semantics, and makes errors easier to locate than chained regular-expression replacements.", ja: "LexerとParserからASTを作り、安全なHTMLに変換します。見出しやブロックの意味を保ち、正規表現だけでは追いにくい問題を見つけやすくします。"}},
    {heading: {'zh-TW': "真正投入使用", en: "Used by the site", ja: "サイトで使う"}, body: {'zh-TW': "網站的 Notes 由 StructMark 的正式核心解析三語文章，文章目錄與閱讀內容從結構化資料建立。接下來仍需要驗證特殊字元、程式碼區塊、可逆轉換與語法錯誤提示，不能只以能顯示文章當作解析器正確。", en: "The website's multilingual Notes use StructMark's core parser. Correct rendering alone is not enough: code blocks, escaping, reversible serialization and useful diagnostics still require tests.", ja: "このサイトの多言語記事はStructMarkで解析しています。表示だけでなく、コードブロック、エスケープ、可逆性、エラー表示も検証していきます。"}}
  ]},
  {slug: "note-block-tweaks", title: {"zh-TW": "NoteBlock Tweaks", "en": "NoteBlock Tweaks", "ja": "NoteBlock Tweaks"},
  lead: {"zh-TW": "讓 Minecraft 音階盒調音更方便", "en": "Better Minecraft noteblock tuning", "ja": "音ブロックの調律を快適に"},
  sections: [
    {heading: {"zh-TW": "操作目標", "en": "Interaction", "ja": "操作"}, body: {"zh-TW": "使用純客戶端 Fabric 模組，提供音高選擇介面與音高複製、貼上，減少逐次點擊帶來的操作負擔。", "en": "A Fabric client-side interface helps choose noteblock pitches and copy or paste values without repeated cycling.", "ja": "FabricクライアントModで音程の選択やコピー・貼り付けを扱います。"}},
    {heading: {"zh-TW": "模組邊界", "en": "Scope", "ja": "対象範囲"}, body: {"zh-TW": "專注在音階盒的互動輔助，不把它包裝成需要伺服器安裝的音樂服務。", "en": "Focused on noteblock interactions; it is not a server-side music service.", "ja": "音ブロックの操作支援に集中した、サーバー型の音楽サービスではないModです。"}},
    {heading: {'zh-TW': "調音流程", en: "Tuning workflow", ja: "調律の操作"}, body: {'zh-TW': "NoteBlock Tweaks 是 Fabric 純客戶端模組，補充音階盒的音高選擇、複製與貼上操作。重點不是替玩家作曲，而是減少反覆點擊和記錄音高時的操作成本。", en: "A Fabric client-side mod offering pitch selection, copying and pasting for Minecraft note blocks. It reduces repetitive interaction without changing the server's music logic.", ja: "FabricクライアントModとして音ブロックの音程選択、コピー、貼り付けを補助し、繰り返しの操作を減らします。"}},
    {heading: {'zh-TW': "相容性與驗證", en: "Compatibility and testing", ja: "互換性と検証"}, body: {'zh-TW': "模組需要與實際使用的 Minecraft、Fabric Loader 和相關客戶端模組版本搭配驗證。發布版本應以倉庫說明與 CI 編譯結果為準，不能把開發中測試過的版本視為全部相容。", en: "Compatibility depends on the Minecraft version, Fabric Loader and neighboring client mods. Published releases and CI artifacts are the reference, rather than assuming every version is supported.", ja: "Minecraft、Fabric Loader、周辺Modの組み合わせで検証が必要です。対応バージョンはリリース情報とCIの結果を基準にします。"}}
  ]},
  {slug: "ai-development-governance", title: {"zh-TW": "AI Development Governance", "en": "AI Development Governance", "ja": "AI Development Governance"},
  lead: {"zh-TW": "讓開發規範能真正落實", "en": "Make development standards actionable", "ja": "開発ルールを実際の作業へ"},
  sections: [
    {heading: {"zh-TW": "核心想法", "en": "Core idea", "ja": "考え方"}, body: {"zh-TW": "把程式碼品質、驗證步驟、變更追蹤與協作責任寫清楚，讓規範能融入開發流程。", "en": "Turn code quality, verification, change tracking and shared responsibility into repeatable development practices.", "ja": "品質、検証、変更追跡、共同作業の基準を日々の開発に組み込みます。"}},
    {heading: {"zh-TW": "實際使用", "en": "Practical use", "ja": "使い方"}, body: {"zh-TW": "內容面向人類開發者與 AI Coding Agent，目標是降低錯誤與維護成本，而不是堆疊無法執行的指令。", "en": "Guidance for both human contributors and AI coding agents, with an emphasis on checks that can be carried out.", "ja": "人間とAIコーディングエージェント双方が、実行可能なチェックを共有できるようにします。"}},
    {heading: {'zh-TW': "讓規範可以執行", en: "Actionable development rules", ja: "実行できる開発規則"}, body: {'zh-TW': "將分支管理、測試、程式碼審查、README 與公開檔案範圍整理成可檢查的工作流程。規則的目的不是增加表單，而是降低「修改完成卻沒有測試」或把協作草稿推上公開倉庫的風險。", en: "Branch management, tests, reviews, README checks and repository hygiene become repeatable steps. The point is to catch unverified changes and accidental publication of internal working notes.", ja: "ブランチ、テスト、レビュー、README、公開ファイルの範囲を確認できる手順にまとめます。形式を増やすより、未検証の変更や内部資料の誤公開を防ぎます。"}},
    {heading: {'zh-TW': "人與 Agent 的協作", en: "Humans and coding agents", ja: "人間とAgentの協業"}, body: {'zh-TW': "同一套規範同時面向人類開發者與 AI Coding Agent：先確定任務範圍，再建立分支、測試、檢查差異，最後才考慮合併。任何自動化都不能用「工具說成功了」取代實際驗收。", en: "The same rules apply to people and AI coding agents: scope the task, work on a branch, test and inspect the diff before any merge. Tool success is not a substitute for acceptance checks.", ja: "人間とAI Agentが同じ流れを共有し、作業範囲、分岐、検証、差分確認を重視します。ツールの成功表示だけでは完成としません。"}}
  ]},
  {slug: 'codex-workspace-web', title: {'zh-TW': 'Codex Workspace Web', en: 'Codex Workspace Web', ja: 'Codex Workspace Web'},
   lead: {'zh-TW': "供私人 VPN／區域網路使用的 Codex Web 介面，支援對話、工具事件、權限審批與手機 PWA。", en: "A private-network Codex web interface with conversations, tool events, approvals and a mobile PWA.", ja: "VPN／LAN向けのCodex Web UI。会話、ツールイベント、承認操作、モバイルPWAに対応。"},
   sections: [
    {heading: {'zh-TW': '專案定位', en: 'Purpose', ja: '目的'}, body: {'zh-TW': "供私人 VPN／區域網路使用的 Codex Web 介面，支援對話、工具事件、權限審批與手機 PWA。", en: "A private-network Codex web interface with conversations, tool events, approvals and a mobile PWA.", ja: "VPN／LAN向けのCodex Web UI。会話、ツールイベント、承認操作、モバイルPWAに対応。"}},
    {heading: {'zh-TW': "介面與執行邊界", en: "Interface and execution boundaries", ja: "画面と実行の境界"}, body: {'zh-TW': "網站是部署在私人 VPN 或受信任區域網路內的 Codex 圖形介面。前端呈現對話、工作進度與工具事件，實際指令由伺服器端 Codex CLI／App Server 執行，並限制工作區與沙盒權限。", en: "This private-network web UI displays chats, task progress and tool events while the server-side Codex CLI/App Server performs the work. Workspaces and sandbox permissions remain constrained.", ja: "VPNや信頼できるLAN向けのWeb UIです。会話とツールイベントを表示し、実行はサーバー側のCodexに任せ、作業場所と権限を制限します。"}},
    {heading: {'zh-TW': "手機與批准流程", en: "Mobile and approvals", ja: "モバイルと承認"}, body: {'zh-TW': "考量 Ubuntu 無圖形介面的使用情境，網站提供手機 PWA、歷史對話及工具操作批准。需要明確授權的指令或寫入操作必須顯示批准要求，不能因為使用網頁控制就繞過原有安全限制。", en: "The interface targets headless Ubuntu and mobile PWA use, including conversation history and explicit approval requests. Remote access must not bypass command or file-operation permissions.", ja: "GUIのないUbuntuをスマートフォンから操作するためのPWAや履歴、承認画面を用意しています。Web経由でも操作権限を省略しません。"}}
  ]
  },
  {slug: 'low-y-outpost-finder', title: {'zh-TW': 'LowYOutpostFinder', en: 'LowYOutpostFinder', ja: 'LowYOutpostFinder'},
   lead: {'zh-TW': "Minecraft Java 1.21.8 的低 Y 前哨站候選搜尋工具；搜尋結果為估算，並非已確認生成的結構。", en: "Minecraft Java 1.21.8 low-Y outpost candidate finder; results are estimates, not confirmed structures.", ja: "Minecraft Java 1.21.8向け低Y前哨基地候補検索ツール。結果は推定値です。"},
   sections: [
    {heading: {'zh-TW': '專案定位', en: 'Purpose', ja: '目的'}, body: {'zh-TW': "Minecraft Java 1.21.8 的低 Y 前哨站候選搜尋工具；搜尋結果為估算，並非已確認生成的結構。", en: "Minecraft Java 1.21.8 low-Y outpost candidate finder; results are estimates, not confirmed structures.", ja: "Minecraft Java 1.21.8向け低Y前哨基地候補検索ツール。結果は推定値です。"}},
    {heading: {'zh-TW': "候選搜尋如何運作", en: "How candidate search works", ja: "候補検索のしくみ"}, body: {'zh-TW': "利用 Minecraft Java 1.21.8 的種子與搜尋範圍取得低 Y 前哨站候選，再依水平距離排序。可選的 C11 高度估算器提供近似高度，預設搜尋結果標示為 `estimated_only`，不是世界中已生成的結構證據。", en: "The tool searches seed-derived low-Y outpost candidates for Minecraft Java 1.21.8 and sorts the collected results by horizontal distance. Its optional C11 estimator produces approximations, marked estimated_only rather than confirmed generation.", ja: "Minecraft Java 1.21.8のシードから低Yの候補を探し、距離順に整理します。C11推定器の結果は推定値で、実際に生成された建造物の証明ではありません。"}},
    {heading: {'zh-TW': "結果與限制", en: "Results and limitations", ja: "結果と限界"}, body: {'zh-TW': "工具提供 GUI／CLI、進度紀錄及 CSV 匯出。由於目前的環狀搜尋會在找到指定數量後提前停止，輸出不能保證是全世界最近的 N 個符合條件結果；若要確認真實高度與生成狀態，應另行執行世界存檔或原版伺服器驗證。", en: "GUI/CLI, progress logs and CSV export support review. Early stopping in the ring scan means the results are not guaranteed to be the globally closest N; saved-world or vanilla-server verification is needed for confirmed generation.", ja: "GUI、CLI、進行状況とCSV出力を備えています。途中で検索を終えるため、世界全体で最も近いN件とは保証できず、生成状態は別途検証が必要です。"}}
  ]
  },
  {slug: 'geyser-floating-points', title: {'zh-TW': 'GeyserFloatingPoints', en: 'GeyserFloatingPoints', ja: 'GeyserFloatingPoints'},
   lead: {'zh-TW': "Minecraft 1.21.8 的 Geyser 浮動原點座標擴充，改善遠距離顯示精度，仍需持續驗證相容性。", en: "A Geyser floating-origin extension for Minecraft 1.21.8, with compatibility still being tested.", ja: "Minecraft 1.21.8用のGeyser浮動原点拡張。互換性は検証中です。"},
   sections: [
    {heading: {'zh-TW': '專案定位', en: 'Purpose', ja: '目的'}, body: {'zh-TW': "Minecraft 1.21.8 的 Geyser 浮動原點座標擴充，改善遠距離顯示精度，仍需持續驗證相容性。", en: "A Geyser floating-origin extension for Minecraft 1.21.8, with compatibility still being tested.", ja: "Minecraft 1.21.8用のGeyser浮動原点拡張。互換性は検証中です。"}},
    {heading: {'zh-TW': "為什麼需要浮動原點", en: "Why floating origins", ja: "浮動原点が必要な理由"}, body: {'zh-TW': "在 Java 世界極遠座標，基岩版客戶端可能受浮點精度限制而出現顯示與移動問題。此擴充嘗試為不同玩家維護獨立的區塊對齊座標偏移，讓客戶端在較小的局部座標下呈現世界。", en: "At extreme Java-world coordinates, Bedrock precision limits can affect display and movement. The extension maintains player-specific, chunk-aligned offsets so the Bedrock client can work with smaller local coordinates.", ja: "Javaワールドの遠方座標で起こるBedrock側の精度問題に対し、プレイヤーごとにチャンク単位の座標オフセットを使う方式です。"}},
    {heading: {'zh-TW': "封包一致性是難點", en: "Packet consistency is the hard part", ja: "パケットの整合性"}, body: {'zh-TW': "偏移不能只修改玩家位置，還必須考慮區塊更新、方塊互動、實體和相對位移封包。此專案仍有封包覆蓋與相容性需要完整測試；任何版本都不應在未驗證前宣稱可無縫取代原版 Geyser 行為。", en: "Changing player position alone is insufficient: chunks, block interactions, entities and relative-motion packets must remain consistent. Packet coverage and runtime compatibility still need thorough testing.", ja: "プレイヤー位置だけでなく、チャンク、ブロック操作、エンティティ、相対移動の各パケットを整合させる必要があります。互換性はまだ検証段階です。"}}
  ]
  }
];

export function getProjectDetail(slug: string) { return projectDetails.find((project) => project.slug === slug); }
