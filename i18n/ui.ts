import type {Locale} from './config';

type UiCopy = {
  navigation: {home: string; about: string; projects: string; notes: string; timeline: string; label: string};
  common: {backHome: string; backNotes: string; more: string};
  sections: {about: string; works: string; notes: string; timeline: string};
  notes: {more: string; eyebrow: string};
  player: {label: string; previous: string; next: string; play: string; pause: string; progress: string; volume: string};
  theme: {useLight: string; useDark: string};
  notFound: {title: string; lead: string; back: string};
};

export const ui: Record<Locale, UiCopy> = {
  'zh-TW': {
    navigation: {home: '首頁', about: '關於', projects: '專案', notes: '文章', timeline: '歷程', label: '主要導覽'},
    common: {backHome: '回到首頁', backNotes: '回到文章', more: '查看更多 →'},
    sections: {about: '關於我', works: '專案紀錄', notes: '文章與紀錄', timeline: '一路走來'},
    notes: {more: '查看更多 →', eyebrow: '文章'},
    player: {label: '音樂播放器', previous: '上一首', next: '下一首', play: '播放', pause: '暫停', progress: '播放進度', volume: '音量'},
    theme: {useLight: '切換為淺色主題', useDark: '切換為深色主題'},
    notFound: {title: '找不到頁面', lead: '這裡還沒有內容。', back: '回到首頁'}
  },
  en: {
    navigation: {home: 'Home', about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline', label: 'Main navigation'},
    common: {backHome: 'Back home', backNotes: 'Back to notes', more: 'View more →'},
    sections: {about: 'About me', works: 'Selected works', notes: 'Notes & records', timeline: 'Along the way'},
    notes: {more: 'View more →', eyebrow: 'Notes'},
    player: {label: 'Music player', previous: 'Previous track', next: 'Next track', play: 'Play', pause: 'Pause', progress: 'Playback progress', volume: 'Volume'},
    theme: {useLight: 'Use light theme', useDark: 'Use dark theme'},
    notFound: {title: 'Not found', lead: 'There is nothing here yet.', back: 'Back home'}
  },
  ja: {
    navigation: {home: 'ホーム', about: '私について', projects: '作品', notes: '記事', timeline: '記録', label: 'メインナビゲーション'},
    common: {backHome: 'ホームへ', backNotes: '記事一覧へ', more: 'もっと見る →'},
    sections: {about: '私について', works: '制作実績', notes: '記事と記録', timeline: 'これまでの記録'},
    notes: {more: 'もっと見る →', eyebrow: '記事'},
    player: {label: '音楽プレーヤー', previous: '前の曲', next: '次の曲', play: '再生', pause: '一時停止', progress: '再生位置', volume: '音量'},
    theme: {useLight: 'ライトテーマに切り替え', useDark: 'ダークテーマに切り替え'},
    notFound: {title: 'ページが見つかりません', lead: 'ここにはまだ何もありません。', back: 'ホームへ'}
  }
};
