'use client';

import {useState} from 'react';

const entries = [
  {number: '01', title: 'Pearl cannon calculator', text: '把實際珍珠砲計算邏輯搬進瀏覽器。', detail: '輸入 84gt 珍珠位置、目標座標與地面高度，搜尋誤差最小的 TNT 配置。', state: 'open'},
  {number: '02', title: 'Astro compare', text: '把照片處理前後放在同一片天空下。', detail: '拖曳照片中間的分界線，比較原始影像與處理後的差異。', state: 'open'},
  {number: '03', title: 'Small strange things', text: '沒有用途，但我想知道它能不能動。', detail: '第一個已經可以玩的東西在下面：一條不太聰明的貪食蛇。', state: 'open'},
  {number: '04', title: 'GitHub galaxy', text: '把公開專案暫時放進同一片軌道。', detail: '每個 repository 都是一顆小星體，大小與顏色只是視覺化比喻。', state: 'open'}
];

export function LabIndex() {
  const [open, setOpen] = useState<string | null>(null);
  return <section className="lab-list" aria-label="Lab projects">{entries.map((entry) => <article className={`lab-entry lab-entry-${entry.state}${open === entry.number ? ' is-open' : ''}`} key={entry.number}>
    <button className="lab-entry-button" type="button" onClick={() => setOpen(open === entry.number ? null : entry.number)} aria-expanded={open === entry.number}>
      <span className="lab-number">{entry.number}</span><span><strong>{entry.title}</strong><small>{entry.text}</small></span><span className="lab-state">{entry.state === 'open' ? 'in the making' : 'not yet'}</span><span className="lab-toggle" aria-hidden="true">{open === entry.number ? '−' : '+'}</span>
    </button>
    {open === entry.number ? <div className="lab-entry-detail"><p>{entry.detail}</p>{entry.number === '01' ? <a href="#minecraft-tools">進入工具 →</a> : entry.number === '02' ? <a href="#astro-compare">進入比較 →</a> : entry.number === '04' ? <a href="#github-galaxy">進入星系 →</a> : entry.state === 'open' ? <a href="#snake">進入 Snake →</a> : <span>這個實驗還在筆記裡。</span>}</div> : null}
  </article>)}</section>;
}
