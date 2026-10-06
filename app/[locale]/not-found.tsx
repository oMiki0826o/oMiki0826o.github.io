import Link from 'next/link';

export default function LocaleNotFound() {
  return <main className="content-page"><p className="content-eyebrow">404</p><h1>Not Found</h1><p className="content-lead">這裡還沒有內容。 / ここにはまだ何もありません。</p><Link className="back-link" href="/">← Home</Link></main>;
}
