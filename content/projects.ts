import type {Project} from './types';

export const projects: Project[] = [
  {
    slug: 'firefly-bot',
    title: {'zh-TW': 'Firefly Bot', ja: 'Firefly Bot'},
    description: {
      'zh-TW': '整合音樂、管理、自動化與 AI 對話的 Discord Bot，持續整理模組架構與可靠性。',
      ja: '音楽、管理、自動化、AI会話をまとめたDiscord Bot。構成と信頼性を継続的に改善しています。'
    },
    tags: ['Python', 'discord.py', 'Gemini'],
    url: 'https://github.com/oMiki0826o/Discord-Bot',
    tone: 'blue'
  },
  {
    slug: 'minecraft-backup',
    title: {'zh-TW': 'Minecraft Server Backup', ja: 'Minecraft Server Backup'},
    description: {
      'zh-TW': '透過 Discord 管理 Minecraft 伺服器備份、回檔與相關維運流程。',
      ja: 'DiscordからMinecraftサーバーのバックアップ、復元、運用フローを管理するツールです。'
    },
    tags: ['Python', 'Discord', 'Minecraft'],
    url: 'https://github.com/oMiki0826o/mc-server-qb-bot-discord',
    tone: 'orange'
  },
  {
    slug: 'miki-website',
    title: {'zh-TW': "Miki's Website", ja: "Miki's Website"},
    description: {
      'zh-TW': '目前正在瀏覽的個人網站。保留 5.x 的個人感與暖螢火蟲氣氛，底層改用 Next.js。',
      ja: 'いま見ている個人サイト。5.xの個性と暖かな蛍の空気感を残し、Next.jsで再構築しています。'
    },
    tags: ['Next.js', 'TypeScript', 'CSS'],
    url: 'https://github.com/oMiki0826o/oMiki0826o.github.io',
    tone: 'green'
  }
];
