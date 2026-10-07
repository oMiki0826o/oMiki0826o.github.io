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
    {heading: {'zh-TW': '現在的樣子', en: 'Where it is now', ja: '現在'}, body: {'zh-TW': '它還沒有完成，也不打算假裝完成。這個專案現在更像一份持續修正的架構筆記：每次加功能，都順便把下一次比較容易壞的地方整理掉。', en: 'It is not finished, and it does not pretend to be. The project is also a record of architectural cleanup: each new feature is an excuse to make the next failure easier to understand.', ja: 'まだ完成ではなく、完成したふりもしません。新しい機能を加えるたびに、次に壊れそうな場所を少し整理していく構成の記録でもあります。'}}
  ]
}];

export function getProjectDetail(slug: string) { return projectDetails.find((project) => project.slug === slug); }
