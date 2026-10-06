import type {LocalizedText} from './schema';

export const timeline: Array<{year: string; title: LocalizedText; description: LocalizedText}> = [
  {year: '2026', title: {'zh-TW': "Miki's website", en: "Miki's website", ja: 'Mikiのウェブサイト'}, description: {'zh-TW': '個人網站正式上線。', en: 'My personal site went live.', ja: '個人サイトを公開。'}},
  {year: '2026', title: {'zh-TW': 'Firefly Bot 2.0', en: 'Firefly Bot 2.0', ja: 'Firefly Bot 2.0'}, description: {'zh-TW': '重新整理架構並加入 AI 對話。', en: 'Reworked the architecture and added AI chat.', ja: '構成を見直し、AI会話を追加。'}},
  {year: '2025', title: {'zh-TW': '開始開發 Discord Bot', en: 'Started building Discord bots', ja: 'Discord Botの開発を開始'}, description: {'zh-TW': '從 discord.py 開始，把想法做成工具。', en: 'Started turning ideas into tools with discord.py.', ja: 'discord.pyでアイデアをツールにし始めた。'}}
];
