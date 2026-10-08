'use client';

import {useMemo, useState} from 'react';
import {calculatePearlCannon, defaultPearlSettings} from '@/lib/pearl-calculator';

export function MinecraftTools() {
  const [values, setValues] = useState({px: '0', py: '170', pz: '0', dx: '1000', dz: '1000', maxTnt: '160'});
  const result = useMemo(() => { const numbers = Object.values(values).map(Number); if (numbers.some((value) => !Number.isFinite(value))) return []; return calculatePearlCannon([numbers[0]!, numbers[1]!, numbers[2]!], [numbers[3]!, numbers[4]!], {...defaultPearlSettings, maxCharge: numbers[5]!}); }, [values]);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({...current, [key]: value}));
  return <section className="minecraft-tool" aria-labelledby="pearl-tool-title"><div className="tool-heading"><div><p className="lab-eyebrow">LAB / 01</p><h2 id="pearl-tool-title">Pearl cannon calculator</h2></div><span>generic FTL</span></div><p className="tool-lead">輸入砲口珍珠 XYZ、目標 XZ 與單側最大當量；方向與兩側 TNT 配置會自動推導。</p><div className="pearl-fields">{([['px', '砲口珍珠 X'], ['py', '砲口珍珠 Y'], ['pz', '砲口珍珠 Z'], ['dx', '目標點 X'], ['dz', '目標點 Z'], ['maxTnt', '單側最大當量']] as const).map(([key, label]) => <label key={key}>{label}<input inputMode="decimal" value={values[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div><div className="pearl-results" aria-live="polite">{result.length ? result.map((item) => <div className="pearl-result" key={`${item.rank}-${item.code}`}><strong>#{String(item.rank).padStart(2, '0')}</strong><span><b>{item.direction} · {item.totalTick}gt</b><code>兩側 {item.sideA} / {item.sideB} TNT</code></span><em>誤差 {item.error.toFixed(2)}</em></div>) : <p>請輸入有效數值。</p>}</div></section>;
}
