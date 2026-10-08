import Link from 'next/link';

const entries = [
  {number: '01', title: 'Pearl cannon calculator', text: '把實際珍珠砲計算邏輯搬進瀏覽器。', detail: '輸入 84gt 珍珠位置、目標座標與地面高度，搜尋誤差最小的 TNT 配置。', state: 'open'},
  {number: '02', title: 'Astro compare', text: '把照片處理前後放在同一片天空下。', detail: '拖曳照片中間的分界線，比較原始影像與處理後的差異。', state: 'open'},
  {number: '03', title: 'Small strange things', text: '沒有用途，但我想知道它能不能動。', detail: '第一個已經可以玩的東西在下面：一條不太聰明的貪食蛇。', state: 'open'},
  {number: '04', title: 'GitHub galaxy', text: '把公開專案暫時放進同一片軌道。', detail: '每個 repository 都是一顆小星體，大小與顏色只是視覺化比喻。', state: 'open'}
];

export function LabIndex() {
  return <section className="lab-list" aria-label="Lab projects">{entries.map((entry) => <article className={`lab-entry lab-entry-${entry.state}`} key={entry.number}>
    <Link className="lab-entry-button" href={entry.number === '01' ? '/lab/pearl-cannon/' : entry.number === '02' ? '/lab/astro-compare/' : entry.number === '04' ? '/lab/github-galaxy/' : '/lab/snake/'}>
      <span className="lab-number">{entry.number}</span><span><strong>{entry.title}</strong><small>{entry.text}</small></span><span className="lab-state">{entry.state === 'open' ? 'in the making' : 'not yet'}</span><span className="lab-toggle" aria-hidden="true">→</span>
    </Link>
    <div className="lab-entry-detail"><p>{entry.detail}</p><Link href={entry.number === '01' ? '/lab/pearl-cannon/' : entry.number === '02' ? '/lab/astro-compare/' : entry.number === '04' ? '/lab/github-galaxy/' : '/lab/snake/'}>進入實驗 →</Link></div>
  </article>)}</section>;
}
