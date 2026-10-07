import Link from 'next/link';

export default function NotFound() {
  return <main className="lost-page"><div className="lost-stars" aria-hidden="true"><i /><i /><i /></div><p className="lost-code">404</p><h1>這裡沒有東西。</h1><p>網址可能走丟了，或這個角落還沒有被做出來。</p><Link href="/">← 回到首頁</Link><small>你找到了一個不存在的地方</small></main>;
}
