import type {Note} from './types';

export const notes: Note[] = [
  {
    slug: 'discord-bot-from-zero',
    title: {'zh-TW': '從零開始寫 Discord Bot', ja: 'Discord Botをゼロから作る'},
    excerpt: {
      'zh-TW': '第一次把 Bot 從想法做到真的能用時，踩過的坑與後來才懂的事情。',
      ja: '初めてBotをアイデアから実際に使える形まで作ったときの、つまずきと学びの記録。'
    },
    date: '2025-08-10',
    category: 'Discord'
  },
  {
    slug: 'about-me',
    title: {'zh-TW': '簡單的了解我', ja: '私について少し'},
    excerpt: {
      'zh-TW': '最近在做什麼、喜歡什麼，以及這個網站為什麼總是在重做。',
      ja: '最近作っているもの、好きなこと、そしてこのサイトを何度も作り直している理由。'
    },
    date: '2025-07-25',
    category: 'About'
  }
];
