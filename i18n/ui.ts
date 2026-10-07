import type {Locale} from './config';

type UiCopy = {
  siteTitle: string;
  navigation: {home: string; about: string; projects: string; notes: string; timeline: string; label: string; openMenu: string; closeMenu: string; closeOverlay: string};
  common: {backHome: string; backNotes: string; more: string};
  sections: {about: string; works: string; notes: string; timeline: string};
  home: {featuredImage: string; aboutMore: string; worksMore: string; notesMore: string; timelineMore: string};
  pages: {aboutLead: string; projectsTitle: string; projectsLead: string; notesLead: string; timelineTitle: string; timelineLead: string};
  notes: {more: string; eyebrow: string};
  player: {label: string; previous: string; next: string; play: string; pause: string; progress: string; volume: string};
  theme: {useLight: string; useDark: string};
  notFound: {title: string; lead: string; back: string};
};

export const ui: Record<Locale, UiCopy> = {
  'zh-TW': {
    siteTitle: 'Miki 的奇幻世界',
    navigation: {home: '首頁', about: '關於', projects: '專案', notes: '文章', timeline: '歷程', label: '主要導覽', openMenu: '開啟選單', closeMenu: '關閉選單', closeOverlay: '關閉導覽背景'},
    common: {backHome: '回到首頁', backNotes: '回到文章', more: '查看更多 →'},
    sections: {about: '關於我', works: '專案紀錄', notes: '文章與紀錄', timeline: '一路走來'},
    home: {featuredImage: '鎮樓圖', aboutMore: '完整介紹 →', worksMore: '查看更多 →', notesMore: '查看更多 →', timelineMore: '查看完整歷程 →'},
    pages: {aboutLead: '把想法拆開、做成工具，再慢慢把它修到穩定可用。', projectsTitle: '做過的東西', projectsLead: '正在做的東西，以及一路整理成形的作品。', notesLead: '開發紀錄、踩坑筆記，以及偶爾不那麼技術的東西。', timelineTitle: '一路走來', timelineLead: '一路學、一邊做留下來的紀錄。'},
    notes: {more: '查看更多 →', eyebrow: '文章'},
    player: {label: '音樂播放器', previous: '上一首', next: '下一首', play: '播放', pause: '暫停', progress: '播放進度', volume: '音量'},
    theme: {useLight: '切換為淺色主題', useDark: '切換為深色主題'},
    notFound: {title: '找不到頁面', lead: '這裡還沒有內容。', back: '回到首頁'}
  },
  en: {
    siteTitle: "Miki's little world",
    navigation: {home: 'Home', about: 'About', projects: 'Works', notes: 'Notes', timeline: 'Timeline', label: 'Main navigation', openMenu: 'Open menu', closeMenu: 'Close menu', closeOverlay: 'Close navigation backdrop'},
    common: {backHome: 'Back home', backNotes: 'Back to notes', more: 'View more →'},
    sections: {about: 'About me', works: 'Selected works', notes: 'Notes & records', timeline: 'Along the way'},
    home: {featuredImage: 'Featured image', aboutMore: 'Read more →', worksMore: 'View more →', notesMore: 'View more →', timelineMore: 'View timeline →'},
    pages: {aboutLead: 'Making, trying, and refining things a little at a time.', projectsTitle: 'Things I made', projectsLead: 'What I am making now, and the things I have shaped along the way.', notesLead: 'Development notes, lessons learned, and occasional non-technical thoughts.', timelineTitle: 'The way here', timelineLead: 'A record of learning and making along the way.'},
    notes: {more: 'View more →', eyebrow: 'Notes'},
    player: {label: 'Music player', previous: 'Previous track', next: 'Next track', play: 'Play', pause: 'Pause', progress: 'Playback progress', volume: 'Volume'},
    theme: {useLight: 'Use light theme', useDark: 'Use dark theme'},
    notFound: {title: 'Not found', lead: 'There is nothing here yet.', back: 'Back home'}
  },
  ja: {
    siteTitle: 'Miki の小さな世界',
    navigation: {home: 'ホーム', about: '私について', projects: '作品', notes: '記事', timeline: '記録', label: 'メインナビゲーション', openMenu: 'メニューを開く', closeMenu: 'メニューを閉じる', closeOverlay: 'ナビゲーション背景を閉じる'},
    common: {backHome: 'ホームへ', backNotes: '記事一覧へ', more: 'もっと見る →'},
    sections: {about: '私について', works: '制作実績', notes: '記事と記録', timeline: 'これまでの記録'},
    home: {featuredImage: '鎮樓図', aboutMore: 'もっと見る →', worksMore: 'もっと見る →', notesMore: 'もっと見る →', timelineMore: 'すべて見る →'},
    pages: {aboutLead: '作ること、試すこと、少しずつ整えていくこと。', projectsTitle: '制作実績', projectsLead: 'いま作っているものと、これまで形にしてきたもの。', notesLead: '開発記録、つまずきのメモ、ときどき技術以外のこと。', timelineTitle: 'これまでの記録', timelineLead: '学びながら作ってきたものの記録。'},
    notes: {more: 'もっと見る →', eyebrow: '記事'},
    player: {label: '音楽プレーヤー', previous: '前の曲', next: '次の曲', play: '再生', pause: '一時停止', progress: '再生位置', volume: '音量'},
    theme: {useLight: 'ライトテーマに切り替え', useDark: 'ダークテーマに切り替え'},
    notFound: {title: 'ページが見つかりません', lead: 'ここにはまだ何もありません。', back: 'ホームへ'}
  }
};
