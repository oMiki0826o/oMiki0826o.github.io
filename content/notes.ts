import type {Note} from './types';

export const notes: Note[] = [
  {
    slug: 'discord-bot-from-zero',
    title: {'zh-TW': '從零開始寫 Discord Bot', en: 'Building a Discord Bot from scratch', ja: 'Discord Botをゼロから作る'},
    excerpt: {
      'zh-TW': '第一次把 Bot 從想法做到真的能用時，踩過的坑與後來才懂的事情。',
      en: 'The problems and lessons from taking a first Bot from idea to something genuinely useful.',
      ja: '初めてBotをアイデアから実際に使える形まで作ったときの、つまずきと学びの記録。'
    },
    date: '2025-08-10',
    category: 'Discord',
    sections: [
      {
        heading: {'zh-TW': '從一個想法開始', en: 'Starting with an idea', ja: 'ひとつのアイデアから'},
        paragraphs: {
          'zh-TW': ['一開始只是想把 Discord 裡重複的小事做得更順一點。從指令、音樂到管理功能，每一項都讓 Bot 慢慢有了實際能幫上忙的地方。'],
          en: ['It began with a wish to make repeated little tasks in Discord smoother. Commands, music, and moderation each gave the Bot a small but practical purpose.'],
          ja: ['最初はDiscordで繰り返す小さな作業を、少しでもスムーズにしたいという思いから始まりました。コマンド、音楽、管理機能を重ねるごとに、Botは少しずつ実用的になっていきました。']
        }
      },
      {
        heading: {'zh-TW': '邊做邊整理', en: 'Building while learning', ja: '作りながら整える'},
        paragraphs: {
          'zh-TW': ['第一次把想法做成真的能用的工具，也讓我開始在意模組怎麼拆、功能怎麼維護。現在仍持續整理 Firefly Bot 的架構，讓它能慢慢長成更可靠的工具。'],
          en: ['Turning an idea into a useful tool for the first time made structure and maintenance matter. Firefly Bot is still being organized so it can grow into something more reliable.'],
          ja: ['アイデアを実際に使える道具にした最初の経験で、構成の分け方や保守のしやすさを意識するようになりました。Firefly Botは今も整理を続け、少しずつ信頼できる道具に育てています。']
        }
      }
    ]
  },
  {
    slug: 'about-me',
    title: {'zh-TW': '簡單的了解我', en: 'A little about me', ja: '私について少し'},
    excerpt: {
      'zh-TW': '最近在做什麼、喜歡什麼，以及這個網站為什麼總是在重做。',
      en: 'What I am making lately, what I enjoy, and why this website keeps being rebuilt.',
      ja: '最近作っているもの、好きなこと、そしてこのサイトを何度も作り直している理由。'
    },
    date: '2025-07-25',
    category: 'About',
    sections: [
      {
        heading: {'zh-TW': '做一些真的會用到的東西', en: 'Making things I can use', ja: '実際に使うものを作る'},
        paragraphs: {
          'zh-TW': ['我喜歡把日常裡的小麻煩整理成自動化的小程式，也喜歡把一個模糊的想法慢慢修成可以使用的工具。Discord Bot、Minecraft 工具、網站和小型自動化，是最近最常碰到的方向。'],
          en: ['I like turning everyday friction into small automated programs and refining vague ideas into useful tools. Discord Bots, Minecraft tools, websites, and small automations are the areas I work on most lately.'],
          ja: ['日常の小さな面倒を自動化するプログラムに変え、曖昧なアイデアを少しずつ使える道具に整えるのが好きです。最近はDiscord Bot、Minecraft向けツール、Webサイト、小さな自動化をよく作っています。']
        }
      },
      {
        heading: {'zh-TW': '把過程留下來', en: 'Keeping the process', ja: '過程を残す'},
        paragraphs: {
          'zh-TW': ['這個網站不是履歷表，而是把作品、文章和一路做過的事放在一起的小空間。它會一直慢慢調整，因為我也想把每次學到的事留下一點痕跡。'],
          en: ['This website is not a résumé. It is a small place for work, writing, and the things I have made along the way. It will keep changing slowly because I want to leave a trace of what I learn.'],
          ja: ['このサイトは履歴書ではありません。作品や文章、これまでに作ったものを一緒に置く小さな場所です。学んだことの痕跡を残したいので、これからも少しずつ整えていきます。']
        }
      }
    ]
  }
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
