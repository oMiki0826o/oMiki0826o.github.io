import type {Metadata} from 'next';
import {SnakeGame} from '@/components/lab/snake-game';
import {LabIndex} from '@/components/lab/lab-index';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'A small collection of experiments, tools, and things that did not need to exist.'
};

export default function LabPage() {
  return <main className="lab-shell">
    <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
    <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
    <header className="lab-header"><p className="lab-kicker">Miki / LAB</p><p className="lab-mark">01</p></header>
    <section className="lab-intro"><div className="lab-film"><img src="/assets/projects/miki-website.jpg" alt="A quiet frame from the lab" /></div><div className="lab-intro-copy"><p className="lab-eyebrow">A quiet place for odd ideas</p><h1>Some works,<br /><em>some strange things.</em></h1><p className="lab-lead">這裡不一定有用，也不一定和誰有關。只是有些想法剛好被做了出來。</p></div></section>
    <LabIndex />
    <div id="snake"><SnakeGame /></div>
    <footer className="lab-footer"><span>no schedule · no dashboard · just experiments</span><span>lab / 2026</span></footer>
  </main>;
}
