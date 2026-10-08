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
  relatedNoteSlugs: ['discord-bot-from-zero', 'discord-bot-usage-guide', 'discord-bot-mod-guide'],
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
}];

export function getProjectDetail(slug: string) { return projectDetails.find((project) => project.slug === slug); }
