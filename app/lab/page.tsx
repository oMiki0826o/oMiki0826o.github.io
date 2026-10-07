import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'A small collection of experiments, tools, and things that did not need to exist.'
};

const entries = [
  {number: '01', title: 'Minecraft tools', text: '一些會慢慢長出來的計算器與小工具。', state: 'soon'},
  {number: '02', title: 'Astro compare', text: '把照片處理前後放在同一片天空下。', state: 'soon'},
  {number: '03', title: 'Small strange things', text: '沒有用途，但我想知道它能不能動。', state: 'open'}
];

export default function LabPage() {
  return <main className="lab-shell">
    <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
    <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
    <header className="lab-header"><p className="lab-kicker">Miki / LAB</p><p className="lab-mark">01</p></header>
    <section className="lab-intro"><div className="lab-film"><img src="/assets/projects/miki-website.jpg" alt="A quiet frame from the lab" /></div><div className="lab-intro-copy"><p className="lab-eyebrow">A quiet place for odd ideas</p><h1>Some works,<br /><em>some strange things.</em></h1><p className="lab-lead">這裡不一定有用，也不一定和誰有關。只是有些想法剛好被做了出來。</p></div></section>
    <section className="lab-list" aria-label="Lab projects">{entries.map((entry) => <article className={`lab-entry lab-entry-${entry.state}`} key={entry.number}><span className="lab-number">{entry.number}</span><div><h2>{entry.title}</h2><p>{entry.text}</p></div><span className="lab-state">{entry.state === 'open' ? 'in the making' : 'not yet'}</span></article>)}</section>
    <footer className="lab-footer"><span>no schedule · no dashboard · just experiments</span><span>lab / 2026</span></footer>
  </main>;
}
