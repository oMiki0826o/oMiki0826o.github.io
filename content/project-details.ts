import type {LocalizedText} from './types';

export type ProjectDetail = {slug: string; title: LocalizedText; lead: LocalizedText; sections: Array<{heading: LocalizedText; body: LocalizedText}>};

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
}];

export function getProjectDetail(slug: string) { return projectDetails.find((project) => project.slug === slug); }
