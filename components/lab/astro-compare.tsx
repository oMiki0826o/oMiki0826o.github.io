/*
 * File: astro-compare.tsx
 * Modification: 2026-10-11 — Compare two actual local uploaded photographs; do not fake astrophotography.
 */
'use client';
import {useEffect, useState} from 'react';

type ImageAsset = {url: string; name: string} | null;
const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);
const ACCEPT = [...ALLOWED_IMAGE_TYPES].join(',');

export function AstroCompare() {
  const [split,setSplit] = useState(50);
  const [original,setOriginal] = useState<ImageAsset>(null);
  const [processed,setProcessed] = useState<ImageAsset>(null);
  const [error, setError] = useState('');
  useEffect(() => () => {if(original) URL.revokeObjectURL(original.url);},[original]);
  useEffect(() => () => {if(processed) URL.revokeObjectURL(processed.url);},[processed]);
  const onFile = (file:File | undefined, update:(value:ImageAsset)=>void) => {
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setError('請選擇 JPEG、PNG、WebP、AVIF 或 GIF 圖片。');
      return;
    }
    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      setError('圖片必須大於 0 KB，且小於 25 MB。');
      return;
    }
    setError('');
    update({url:URL.createObjectURL(file),name:file.name});
  };
  return <section className="astro-compare" id="astro-compare" aria-labelledby="astro-title">
    <div className="tool-heading"><div><p className="lab-eyebrow">LAB / 02</p><h2 id="astro-title">Astro compare</h2></div><span>local images</span></div>
    <p className="tool-lead">選擇同一張照片的處理前、處理後影像，拖曳分界線比較差異。照片只在你的瀏覽器中顯示，不會上傳伺服器。</p>
    <div className="astro-file-controls">
      <label>原始影像 <input type="file" accept={ACCEPT} onChange={(e)=>onFile(e.target.files?.[0],setOriginal)}/></label>
      <label>處理後影像 <input type="file" accept={ACCEPT} onChange={(e)=>onFile(e.target.files?.[0],setProcessed)}/></label>
    </div>
    {error && <p className="astro-error" role="alert">{error}</p>}
    {original && processed ? <>
      <div className="astro-frame astro-real-images" role="img" aria-label={`比較 ${original.name} 與 ${processed.name}`}>
        <img src={original.url} alt="" onError={() => setError('原始圖片無法解碼，請選擇其他圖片。')}/>
        <div className="astro-processed" style={{clipPath:`inset(0 0 0 ${split}%)`}}><img src={processed.url} alt="" onError={() => setError('處理後圖片無法解碼，請選擇其他圖片。')} /></div>
        <span className="astro-divider" style={{left:`${split}%`}} aria-hidden="true" />
      </div>
      <label className="astro-slider">比較位置 <input type="range" min="0" max="100" value={split} aria-label="原始與處理後影像的比較位置" onChange={(e)=>setSplit(Number(e.target.value))}/></label>
    </> : <div className="astro-empty">選擇兩張圖片後，便能開始比較。</div>}
    <p className="astro-caption"><span>原始{original ? `：${original.name}` : ''}</span><span>{split}%</span><span>處理後{processed ? `：${processed.name}` : ''}</span></p>
  </section>;
}
