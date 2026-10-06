import {timeline} from '@/content/timeline';
import {resolveLocale} from '@/i18n/config';
import {localize} from '@/lib/content';

export default async function TimelinePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params; const locale = resolveLocale(rawLocale);
  return <main className="content-page"><p className="eyebrow">timeline</p><h1>一路走來</h1><ol className="timeline">{timeline.map((item) => <li key={`${item.year}-${item.title['zh-TW']}`}><time>{item.year}</time><h2>{localize(item.title, locale)}</h2><p>{localize(item.description, locale)}</p></li>)}</ol></main>;
}
