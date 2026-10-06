import {profileSchema} from './schema';

export const profile = profileSchema.parse({
  name: 'Miki',
  avatar: '/assets/miki-avatar-2026.jpg',
  subtitle: {'zh-TW': 'Miki 的奇幻世界', en: "Miki's little world", ja: 'Mikiの小さな世界'},
  signature: {'zh-TW': '欲買桂花同載酒，終不似，少年遊。', en: 'Small tools, strange ideas, and a little wonder.', ja: '小さな道具と、少し不思議なアイデア。'},
  about: {'zh-TW': '把日常的小麻煩變成自動化的小程式。', en: 'Turning everyday friction into small, useful programs.', ja: '日常の小さな面倒を、役に立つ小さなプログラムに。'},
  status: {'zh-TW': '正在重構 Firefly Bot', en: 'Rebuilding Firefly Bot', ja: 'Firefly Botを再構築中'}
});
