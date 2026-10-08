'use client';
import {useState} from 'react';

export function AstroCompare() {
  const [split, setSplit] = useState(52);
  return <section className="astro-compare" id="astro-compare" aria-labelledby="astro-title">
    <div className="tool-heading"><div><p className="lab-eyebrow">LAB / 02</p><h2 id="astro-title">Astro compare</h2></div><span>visual prototype</span></div>
    <div className="astro-frame"><img src="/assets/projects/miki-website.jpg" alt="影像處理比較示意" /><div className="astro-processed" style={{clipPath: `inset(0 0 0 ${split}%)`}}><img src="/assets/projects/miki-website.jpg" alt="" /></div><span className="astro-divider" style={{left: `${split}%`}} aria-hidden="true" /></div>
    <label className="astro-slider">比較位置<input type="range" min="8" max="92" value={split} onChange={(event) => setSplit(Number(event.target.value))} /></label>
    <p className="astro-caption"><span>原始示意</span><span>拉動中間的線，觀察處理差異</span><span>處理示意</span></p>
  </section>;
}
