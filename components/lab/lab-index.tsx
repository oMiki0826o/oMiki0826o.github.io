'use client';

import {useState} from 'react';

const entries = [
  {number: '01', title: 'Minecraft tools', text: '一些會慢慢長出來的計算器與小工具。', detail: '座標換算、漏斗吞吐量與箱子容量，會先從最常用的三個開始。', state: 'soon'},
  {number: '02', title: 'Astro compare', text: '把照片處理前後放在同一片天空下。', detail: '拖曳照片中間的分界線，比較原始影像與處理後的差異。', state: 'soon'},
  {number: '03', title: 'Small strange things', text: '沒有用途，但我想知道它能不能動。', detail: '第一個已經可以玩的東西在下面：一條不太聰明的貪食蛇。', state: 'open'}
];

export function LabIndex() {
  const [open, setOpen] = useState<string | null>(null);
  return <section className="lab-list" aria-label="Lab projects">{entries.map((entry) => <article className={`lab-entry lab-entry-${entry.state}${open === entry.number ? ' is-open' : ''}`} key={entry.number}>
    <button className="lab-entry-button" type="button" onClick={() => setOpen(open === entry.number ? null : entry.number)} aria-expanded={open === entry.number}>
      <span className="lab-number">{entry.number}</span><span><strong>{entry.title}</strong><small>{entry.text}</small></span><span className="lab-state">{entry.state === 'open' ? 'in the making' : 'not yet'}</span><span className="lab-toggle" aria-hidden="true">{open === entry.number ? '−' : '+'}</span>
    </button>
    {open === entry.number ? <div className="lab-entry-detail"><p>{entry.detail}</p>{entry.state === 'open' ? <a href="#snake">進入 Snake →</a> : <span>這個實驗還在筆記裡。</span>}</div> : null}
  </article>)}</section>;
}
