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
      '高中牲一枚，學測沒救，嚴重百合廚、流螢控。畫畫白癡，美感炸裂，成分複雜、要素過多，在哪裡看到我都不奇怪。',
      '日文很爛，學習日文學到爆炸。喜歡寫程式、做工具，也會在 Minecraft 和一堆遊戲裡亂晃。'
    ],
    en: [
      'A high-school student, a yuri fan, and completely obsessed with Firefly. I draw terribly, but I have too many interests to look out of place anywhere.',
      'My Japanese is rough and studying it is a struggle. I like making small programs and tools, then wandering through Minecraft and far too many games.'
    ],
    ja: [
      '高校生で、百合とホタルにかなり弱いです。絵は苦手ですが、好きなものが多すぎて、どこにいても不思議ではありません。',
      '日本語はまだまだで、勉強すると頭が爆発しそうです。小さなプログラムや道具を作りつつ、Minecraftやいろいろなゲームを触っています。'
    ]
  } satisfies Record<'zh-TW' | 'en' | 'ja', string[]>,
  aboutDetails: {
    'zh-TW': [
      {heading: '稱呼', paragraphs: ['Miki。']},
      {heading: '簡介', paragraphs: ['高中牲一枚，學測沒救，嚴重百合廚、流螢控。', '畫畫白癡，美感炸裂；成分複雜、要素過多，在哪裡看到我都不奇怪。日文很爛，學習日文學到爆炸。']},
      {heading: '雷點', paragraphs: ['想不到，可能沒有吧。不要太奇怪、太智障就好，厭蠢。']},
      {heading: '動漫坑', paragraphs: ['首推《關於我轉生變成史萊姆這檔事》，萌王可愛。', '《鄰家天使》、《刀劍神域》、《Unnamed Memory》、《命運石之門》、《不時輕聲地以俄語遮羞的鄰座艾莉同學》、《這個勇者明明超 TUEEE 卻過度謹慎》、《時鐘機關之星》。']},
      {heading: '遊戲坑｜Minecraft', paragraphs: ['TMC PvP player，雜食玩家，什麼都爛。CTEC member。']},
      {heading: '遊戲坑｜Memento Mori', paragraphs: ['神祕音樂播放器遊戲。深蹲日服科迪慈懷，都該來聽歌；每日被綠隊大蟑螂打到破防。']},
      {heading: '遊戲坑｜世界計畫', paragraphs: ['普羅洗腳，日台雙修，悠閒遊玩，想到才碰。25 時是頂級團體。']},
      {heading: '遊戲坑｜原神／崩鐵／鳴潮', paragraphs: ['原神至今還沒 60 級，探索度一坨；最近懶得碰開放世界。崩鐵不是因為多好玩，是因為推在它手上。流螢好，流螢妙，流螢香香好可愛。鳴潮則是香香軟軟的師尊誰不愛。', '想不到了，想到再說。']}
    ],
    en: [
      {heading: 'Name', paragraphs: ['Miki.']},
      {heading: 'A little about me', paragraphs: ['A high-school student, a serious yuri fan, and completely obsessed with Firefly.', 'I am bad at drawing, have too many interests, and am struggling through Japanese study.']},
      {heading: 'Things I avoid', paragraphs: ['Nothing comes to mind. Just do not be weird or painfully foolish.']},
      {heading: 'Anime', paragraphs: ['My first pick is That Time I Got Reincarnated as a Slime. Rimuru is adorable.', 'Also: The Angel Next Door Spoils Me Rotten, Sword Art Online, Unnamed Memory, Steins;Gate, Alya Sometimes Hides Her Feelings in Russian, Cautious Hero, and Clockwork Planet.']},
      {heading: 'Games', paragraphs: ['Minecraft: a TMC PvP player who plays a bit of everything and is bad at all of it. CTEC member.', 'Memento Mori, Project SEKAI, Genshin Impact, Honkai: Star Rail, and Wuthering Waves. I mostly play slowly, return when I feel like it, and stay for the characters and music.']}
    ],
    ja: [
      {heading: '呼び方', paragraphs: ['Miki。']},
      {heading: '自己紹介', paragraphs: ['高校生で、百合が大好き、ホタルにもかなり弱いです。', '絵は苦手で、好きなものが多すぎます。日本語はまだまだで、勉強すると頭が爆発しそうです。']},
      {heading: '苦手なこと', paragraphs: ['思い付きません。変すぎたり、あまりに困ることをしなければ大丈夫です。']},
      {heading: 'アニメ', paragraphs: ['一番好きなのは『転生したらスライムだった件』です。リムルがかわいい。', '『お隣の天使様』『ソードアート・オンライン』『Unnamed Memory』『STEINS;GATE』『時々ボソッとロシア語でデレる隣のアーリャさん』『慎重勇者』『クロックワーク・プラネット』も好きです。']},
      {heading: 'ゲーム', paragraphs: ['MinecraftではTMCのPvPを少し遊びます。いろいろ触るけれど、全部あまり上手ではありません。CTEC member。', 'Memento Mori、プロジェクトセカイ、原神、崩壊：スターレイル、鳴潮。音楽と推しのために、のんびり遊んでいます。']}
    ]
  },
  tags: ['Discord Bot', 'Python', 'Web', 'Minecraft']
} as const;
