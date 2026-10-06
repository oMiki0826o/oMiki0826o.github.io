import type {LocalizedText} from './schema';

export type Project = {slug: string; title: LocalizedText; summary: LocalizedText; stack: string[]; href: string};

export const projects: Project[] = [
  {slug: 'firefly-bot', title: {'zh-TW': 'Firefly Bot', en: 'Firefly Bot', ja: 'Firefly Bot'}, summary: {'zh-TW': '整合音樂、管理與 AI 對話的多功能 Discord Bot。', en: 'A multi-purpose Discord bot for music, moderation, and AI chat.', ja: '音楽、管理、AI会話をまとめた多機能Discord Bot。'}, stack: ['Python', 'discord.py', 'Gemini'], href: 'https://github.com/omiki0826o'},
  {slug: 'minecraft-backup-bot', title: {'zh-TW': 'Minecraft 備份機器人', en: 'Minecraft Backup Bot', ja: 'MinecraftバックアップBot'}, summary: {'zh-TW': '自動備份 Minecraft 伺服器的 Discord 工具。', en: 'A Discord tool for automated Minecraft server backups.', ja: 'Minecraftサーバーを自動バックアップするDiscordツール。'}, stack: ['Python', 'Discord.py'], href: 'https://github.com/omiki0826o'},
  {slug: 'miki-website', title: {'zh-TW': 'Miki Website', en: 'Miki Website', ja: 'Miki Website'}, summary: {'zh-TW': '正在瀏覽的個人網站，從靜態頁面持續演進。', en: 'This evolving personal site, rebuilt from a static page.', ja: '静的サイトから進化を続ける個人サイト。'}, stack: ['Next.js', 'TypeScript', 'CSS'], href: 'https://github.com/omiki0826o'}
];
