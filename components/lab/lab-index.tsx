/*
 * File: lab-index.tsx
 * Modification: 2026-10-11 — Reuse Lab registry instead of duplicating conditional URLs.
 */
import Link from 'next/link';
import {labTools} from '@/content/lab-tools';

export function LabIndex() {
  return <section className="lab-list" aria-label="Lab projects">
    {labTools.map((entry) => {
      const href = `/lab/${entry.slug}/`;
      return <article className="lab-entry lab-entry-open" key={entry.slug}>
        <Link className="lab-entry-button" href={href}>
          <span className="lab-number">{entry.number}</span>
          <span><strong>{entry.title}</strong><small>{entry.description}</small></span>
          <span className="lab-state">in the making</span>
          <span className="lab-toggle" aria-hidden="true">→</span>
        </Link>
        <div className="lab-entry-detail"><p>{entry.detail}</p><Link href={href}>進入實驗 →</Link></div>
      </article>;
    })}
  </section>;
}
