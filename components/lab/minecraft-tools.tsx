'use client';

import {useMemo, useState} from 'react';
import {calculatePearlCannon, createPearlSettings} from '@/lib/pearl-calculator';

export function MinecraftTools() {
  const [values, setValues] = useState({px: '0', py: '170', pz: '0', dx: '1000', dz: '1000', maxTnt: '160'});
  const invalid = Object.values(values).some((raw) => !raw.trim() || !Number.isFinite(Number(raw))) || !Number.isInteger(Number(values.maxTnt)) || Number(values.maxTnt) < 1;
  const result = useMemo(() => {if(invalid)return [];const n=Object.values(values).map(Number);return calculatePearlCannon([n[0]!,n[1]!,n[2]!],[n[3]!,n[4]!],createPearlSettings({maxCharge:n[5]!}));},[values,invalid]);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({...current, [key]: value}));
  return <section className="minecraft-tool" aria-labelledby="pearl-tool-title"><div className="tool-heading"><div><p className="lab-eyebrow">LAB / 01</p><h2 id="pearl-tool-title">Pearl cannon calculator</h2></div><span>generic FTL</span></div><p className="tool-lead">輸入砲口珍珠 XYZ、目標 XZ 與單側最大當量；方向與兩側 TNT 配置會自動推導。</p><div className="pearl-fields">{([['px', '砲口珍珠 X'], ['py', '砲口珍珠 Y'], ['pz', '砲口珍珠 Z'], ['dx', '目標點 X'], ['dz', '目標點 Z'], ['maxTnt', '單側最大當量']] as const).map(([key, label]) => <label key={key}>{label}<input inputMode="decimal" value={values[key]} aria-invalid={!values[key].trim() || !Number.isFinite(Number(values[key])) || (key === 'maxTnt' && (!Number.isInteger(Number(values[key])) || Number(values[key]) < 1))} onChange={(event) => update(key, event.target.value)} /></label>)}</div><div className="pearl-results" aria-live="polite">{result.length ? result.map((item) => <div className="pearl-result" key={`${item.rank}-${item.red}-${item.blue}`}><strong>#{String(item.rank).padStart(2, '0')}</strong><span><b>{item.direction} · {item.tick}gt</b><code>紅 {item.red} / 藍 {item.blue} TNT</code></span><em>誤差 {item.error.toFixed(2)}</em></div>) : <p>{invalid ? '請完整填寫有效數字；TNT 當量必須是大於零的整數。' : '目前找不到符合條件的配置。'}</p>}</div></section>;
}
