import type {LocalizedText} from './types';

export const profile = {
  name: 'Miki',
  subtitle: {
    'zh-TW': 'Miki 的奇幻世界',
    en: "Miki's little world",
    ja: 'Miki の小さな世界'
  } satisfies LocalizedText,
  intro: {
    'zh-TW': '寫程式、做工具、摸 Minecraft，也把一路上的作品與小小紀錄留在這裡。',
    en: 'I build programs and small tools, explore Minecraft, and keep my work and little notes here.',
    ja: 'プログラムや小さな道具を作り、Minecraftを触りながら、作品と日々の記録を残しています。'
  } satisfies LocalizedText,
  signature: {
    'zh-TW': '欲買桂花同載酒，終不似，少年遊。',
    en: 'Small tools, quiet records, and a little wonder.',
    ja: '欲買桂花同載酒，終不似，少年遊。'
  } satisfies LocalizedText,
  status: {
    'zh-TW': '正在重構 Firefly Bot',
    en: 'Rebuilding Firefly Bot',
    ja: 'Firefly Bot を再構築中'
  } satisfies LocalizedText,
  avatar: '/assets/miki-avatar.jpeg',
  featuredImage: 'https://pbs.twimg.com/media/GQgH_VIbQAAViAh?format=jpg&name=large',
  featuredCaption: {
    'zh-TW': '一張喜歡的圖，放在首頁安靜地定下氣氛。',
    en: 'A favorite image, quietly setting the tone for this home.',
    ja: 'お気に入りの一枚を、ホームの空気を決める写真として静かに置いています。'
  } satisfies LocalizedText,
  aboutTitle: {
    'zh-TW': '關於我',
    en: 'About me',
    ja: '私について'
  } satisfies LocalizedText,
  about: {
    'zh-TW': [
      '喜歡把日常的小麻煩變成自動化的小程式，也喜歡從零把一個想法慢慢修到真的能用。',
      '目前主要碰 Discord Bot、Minecraft 工具、網站與各種小型自動化。這裡不是工程履歷，而是作品、文章與一路做過什麼的小空間。'
    ],
    en: [
      'I like turning everyday friction into small automated programs, then slowly refining an idea until it becomes truly useful.',
      'I mainly work on Discord Bots, Minecraft tools, websites, and small automations. This is not a résumé; it is a small place for work, notes, and the things I have made along the way.'
    ],
    ja: [
      '日常の小さな面倒を自動化するプログラムに変え、ゼロから使える形まで少しずつ仕上げるのが好きです。',
      'Discord Bot、Minecraft向けツール、Webサイト、小さな自動化を中心に作っています。ここは履歴書ではなく、作品と文章、これまでの記録を置く小さな場所です。'
    ]
  } satisfies Record<'zh-TW' | 'en' | 'ja', string[]>,
  tags: ['Discord Bot', 'Python', 'Web', 'Minecraft']
} as const;
