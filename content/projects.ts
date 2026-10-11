import type {Project} from './types';

export const projects: Project[] = [
  {
    slug: 'discord-bot',
    title: {'zh-TW': 'Firefly Bot', en: 'Firefly Bot', ja: 'Firefly Bot'},
    description: {
      'zh-TW': '整合音樂、管理、自動化與 AI 對話的 Discord Bot，持續整理模組架構與可靠性。',
      en: 'A Discord Bot for music, moderation, automation, and AI chat, with a continuing focus on modularity and reliability.',
      ja: '音楽、管理、自動化、AI会話をまとめたDiscord Bot。構成と信頼性を継続的に改善しています。'
    },
    tags: ['Python', 'discord.py', 'Gemini'],
    url: 'https://github.com/oMiki0826o/Discord-Bot',
    image: '/assets/projects/firefly-bot.jpg',
    imageSource: 'https://github.com/oMiki0826o/Discord-Bot',
    tone: 'blue',
    category: 'tools'
  },
  {
    slug: 'miki-website',
    title: {'zh-TW': "Miki's Website", en: "Miki's Website", ja: "Miki's Website"},
    description: {
      'zh-TW': '目前正在瀏覽的個人網站。保留 5.x 的個人感與暖螢火蟲氣氛，底層改用 Next.js。',
      en: 'The personal site you are viewing: retaining the 5.x warmth and fireflies on a Next.js foundation.',
      ja: 'いま見ている個人サイト。5.xの個性と暖かな蛍の空気感を残し、Next.jsで再構築しています。'
    },
    tags: ['Next.js', 'TypeScript', 'CSS'],
    url: 'https://github.com/oMiki0826o/oMiki0826o.github.io',
    image: '/assets/projects/miki-website.jpg',
    imageSource: 'https://omiki0826o.github.io/',
    tone: 'green',
    category: 'web',
    demoUrl: 'https://omiki0826o.github.io/'
  },
  {
    slug: 'cipher-tool',
    title: {'zh-TW': 'CipherTool', en: 'CipherTool', ja: 'CipherTool'},
    description: {
      'zh-TW': '用 Python 與 Tkinter 製作的文字工具，整理古典密碼、編碼、進位與文字轉換。',
      en: 'A Python and Tkinter text tool for classical ciphers, encodings, base conversion, and text transforms.',
      ja: 'PythonとTkinterで作った文字ツール。古典暗号、エンコード、基数変換、文字変換をまとめています。'
    },
    tags: ['Python', 'Tkinter', 'Text tools'],
    url: 'https://github.com/oMiki0826o/CipherTool',
    image: '/assets/projects/cipher-tool.png',
    imageSource: 'https://github.com/oMiki0826o/CipherTool',
    tone: 'orange',
    category: 'tools'
  },
  {
    slug: "astro-lab",
    title: {"zh-TW": "AstroLab", "en": "AstroLab", "ja": "AstroLab"},
    description: {"zh-TW": "雙語靜態觀星工具，將星體查找、觀測資訊與簡潔介面集中在瀏覽器中。", "en": "A bilingual browser-based astronomy companion for discovering targets and planning observations.", "ja": "星空の天体情報や観測の手がかりをまとめた、日英対応の静的ツールです。"},
    tags: ["TypeScript", "Astronomy", "Web"],
    url: "https://github.com/oMiki0826o/AstroLab",
    image: "/assets/projects/astro-lab.svg",
    imageSource: "https://github.com/oMiki0826o/AstroLab",
    tone: "blue",
    category: "web",
    demoUrl: "https://omiki0826o.github.io/AstroLab/",
  },
  {
    slug: "stlab",
    title: {"zh-TW": "STLab", "en": "STLab", "ja": "STLab"},
    description: {"zh-TW": "把課表、資料表格與實驗圖表整理成一組免後端的小工具，著重本機處理與實用性。", "en": "Small, privacy-minded web tools for schedules, tables, and experimental charts.", "ja": "時間割、表、実験グラフをブラウザー上で扱う、プライバシー重視の小さな道具箱です。"},
    tags: ["JavaScript", "Utilities", "Privacy"],
    url: "https://github.com/oMiki0826o/STLab",
    image: "/assets/projects/stlab.svg",
    imageSource: "https://github.com/oMiki0826o/STLab",
    tone: "green",
    category: "web",
    demoUrl: "https://omiki0826o.github.io/STLab/",
  },
  {
    slug: "cipher-tool-web",
    title: {"zh-TW": "CipherTool Web", "en": "CipherTool Web", "ja": "CipherTool Web"},
    description: {"zh-TW": "不用登入、無須上傳資料的瀏覽器文字工具，用來學習古典密碼、編碼及進位轉換。", "en": "A local-first browser toolkit for classical ciphers, encodings, and numeral-base conversions.", "ja": "登録・アップロード不要で古典暗号、エンコード、進数変換を試せるWebツールです。"},
    tags: ["TypeScript", "Cipher", "Offline-first"],
    url: "https://github.com/oMiki0826o/CipherTool-Web",
    image: "/assets/projects/cipher-tool-web.svg",
    imageSource: "https://github.com/oMiki0826o/CipherTool-Web",
    tone: "orange",
    category: "web",
    demoUrl: "https://omiki0826o.github.io/CipherTool-Web/",
  },
  {
    slug: "structmark",
    title: {"zh-TW": "StructMark", "en": "StructMark", "ja": "StructMark"},
    description: {"zh-TW": "自主設計的 .sm 結構化標記語言，具有 Lexer、Parser、AST 與安全的 HTML 渲染器；本站的 Notes 也使用它。", "en": "A structured .sm markup language with a lexer, parser, AST and safe HTML renderer—also powering this site’s notes.", "ja": "Lexer、Parser、AST、安全なHTML出力を備えた独自の .sm マークアップ言語。サイトの記事にも使用。"},
    tags: ["TypeScript", ".sm", "Parser"],
    url: "https://github.com/oMiki0826o/StructMark",
    image: "/assets/projects/structmark.svg",
    imageSource: "https://github.com/oMiki0826o/StructMark",
    tone: "blue",
    category: "web",
    demoUrl: "https://omiki0826o.github.io/StructMark/",
  },
  {
    slug: "note-block-tweaks",
    title: {"zh-TW": "NoteBlock Tweaks", "en": "NoteBlock Tweaks", "ja": "NoteBlock Tweaks"},
    description: {"zh-TW": "Fabric 客戶端音階盒輔助模組，提供音高介面、複製與貼上音高等操作。", "en": "A Fabric client-side noteblock utility with pitch selection, copy, and paste controls.", "ja": "音ブロックの音程選択やコピー・貼り付けを扱うFabricクライアントModです。"},
    tags: ["Java", "Fabric", "Minecraft"],
    url: "https://github.com/oMiki0826o/NoteBlockTweaks",
    image: "/assets/projects/note-block-tweaks.svg",
    imageSource: "https://github.com/oMiki0826o/NoteBlockTweaks",
    tone: "green",
    category: "tools",
  },
  {
    slug: "ai-development-governance",
    title: {"zh-TW": "AI Development Governance", "en": "AI Development Governance", "ja": "AI Development Governance"},
    description: {"zh-TW": "供 AI Coding Agent 與人類協作者共用的開發規範與驗證流程，重視可讀性、測試及變更紀錄。", "en": "A governance toolkit for AI coding agents and human contributors, focused on reviews, tests, and traceable changes.", "ja": "AIコーディングエージェントと人間の共同開発向けに、検証と変更履歴を整理した開発ルール集です。"},
    tags: ["Python", "Quality", "Developer Tools"],
    url: "https://github.com/oMiki0826o/AI-Development-Governance",
    image: "/assets/projects/ai-development-governance.svg",
    imageSource: "https://github.com/oMiki0826o/AI-Development-Governance",
    tone: "orange",
    category: "tools",
  }
];

export const pinnedProjectSlugs = ['discord-bot', 'structmark', 'astro-lab'] as const;
export const pinnedProjects = pinnedProjectSlugs.map((slug) => {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Pinned project not found: ${slug}`);
  return project;
});
