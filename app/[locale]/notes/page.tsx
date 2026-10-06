import {resolveLocale, type Locale} from '@/i18n/config';

const copy: Record<Locale, {title: string; lead: string; entries: Array<{tag: string; title: string; body: string}>}> = {
  'zh-TW': {title: '寫下來的東西', lead: '開發紀錄、踩坑筆記與偶爾不那麼技術的想法。', entries: [{tag: '2025 · Discord', title: '從零開始寫 Discord Bot', body: '紀錄第一次開發 Discord Bot 的踩坑筆記。'}, {tag: '2025 · about', title: '簡單的了解我', body: '關於我的基本介紹與興趣分享。'}]},
  en: {title: 'Things I wrote down', lead: 'Development notes, lessons learned, and thoughts that are not always technical.', entries: [{tag: '2025 · Discord', title: 'Building a Discord Bot from scratch', body: 'Notes from my first Discord Bot build.'}, {tag: '2025 · about', title: 'A little about me', body: 'A brief introduction to my interests and work.'}]},
  ja: {title: '書き留めたこと', lead: '開発記録、つまずきのメモ、ときどき技術以外の考え。', entries: [{tag: '2025 · Discord', title: 'Discord Botをゼロから作る', body: '初めてのDiscord Bot開発で得たメモ。'}, {tag: '2025 · about', title: '私について少し', body: '興味や活動についての短い紹介。'}]}
};

export default async function NotesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const text = copy[resolveLocale(rawLocale)];
  return <main className="content-page"><p className="eyebrow">notes</p><h1>{text.title}</h1><p className="lead">{text.lead}</p><div className="project-list">{text.entries.map((entry) => <article className="project-card" key={entry.title}><p>{entry.tag}</p><h2>{entry.title}</h2><p>{entry.body}</p></article>)}</div></main>;
}
