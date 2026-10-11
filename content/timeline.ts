import type {TimelineItem} from './types';

export const timeline: TimelineItem[] = [
  {
    pinned: true,
    year: '2026',
    title: {'zh-TW': 'AstroLab 與 STLab', en: 'AstroLab and STLab', ja: 'AstroLabとSTLab'},
    description: {
      'zh-TW': '把觀星資料與日常小工具整理成可以直接打開使用的靜態 Web App。',
      en: 'Turned astronomy notes and small everyday utilities into static Web Apps that open directly in a browser.',
      ja: '天体資料と日常の小さな道具を、ブラウザーで直接使える静的Web Appに整理。'
    }
  },
  {
    pinned: true,
    year: '2026',
    title: {'zh-TW': 'CipherTool Web', en: 'CipherTool Web', ja: 'CipherTool Web'},
    description: {
      'zh-TW': '把原本的桌面文字工具改成不用登入、資料留在瀏覽器裡的版本。',
      en: 'Reworked a desktop text utility into a browser-first version that needs no account and keeps data local.',
      ja: 'デスクトップの文字ツールを、登録不要でデータをブラウザー内に保つ形へ作り直しました。'
    }
  },
  {
    pinned: true,
    year: '2026',
    title: {'zh-TW': 'StructMark', en: 'StructMark', ja: 'StructMark'},
    description: {
      'zh-TW': '開始整理自己的標記語言、解析器與文件工具，讓文章內容也能由同一套核心處理。',
      en: 'Started shaping a small markup language, parser, and document tools so the notes can use the same core.',
      ja: '小さなマークアップ言語とParser、文書ツールを整理し、記事も同じCoreで扱えるようにしました。'
    }
  },
  {
    pinned: true,
    year: '2026',
    title: {'zh-TW': "Miki's website", en: "Miki's website", ja: "Miki's website"},
    description: {
      'zh-TW': '個人網站正式上線，之後從傳統靜態頁面逐步遷移到 Next.js。',
      en: 'My personal site went live, then gradually moved from traditional static pages to Next.js.',
      ja: '個人サイトを公開し、その後従来の静的ページからNext.jsへ段階的に移行。'
    }
  },
  {
    year: '2026',
    title: {'zh-TW': 'Firefly Bot 2.0', en: 'Firefly Bot 2.0', ja: 'Firefly Bot 2.0'},
    description: {
      'zh-TW': '重新整理 Bot 架構與 AI 對話流程。',
      en: 'Reworked the Bot architecture and AI chat flow.',
      ja: 'Botの構成とAI会話フローを再整理。'
    }
  },
  {
    pinned: true,
    year: '2025',
    title: {'zh-TW': '開始開發 Discord Bot', en: 'Started building Discord Bots', ja: 'Discord Botの開発を開始'},
    description: {
      'zh-TW': '從 discord.py 開始，把腦中的想法變成真的工具。',
      en: 'Started with discord.py and turned ideas into practical tools.',
      ja: 'discord.pyから始め、アイデアを実際に使えるツールへ。'
    }
  },
  {
    pinned: true,
    year: '2024',
    title: {'zh-TW': '開始學 Python', en: 'Started learning Python', ja: 'Pythonの学習を開始'},
    description: {
      'zh-TW': '從基礎語法開始，第一次真正踏進程式開發。',
      en: 'Started with the basics and took my first real steps into programming.',
      ja: '基礎文法からPythonを学び始め、プログラミングの世界へ。'
    }
  }
];

export const pinnedTimeline = timeline.filter((item) => item.pinned);
