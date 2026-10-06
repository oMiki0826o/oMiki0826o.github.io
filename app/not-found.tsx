import Link from 'next/link';

export default function NotFound() {
  return <main className="content-page"><p className="content-eyebrow">404</p><h1>找不到這個頁面</h1><p className="content-lead">網址可能已經移動，或這個頁面還沒建立。</p><Link className="back-link" href="/">← 回到首頁</Link></main>;
}
