/*
 * File: minecraft-tools.tsx
 * Modification: 2026-10-11 — Clear input validation and transparent simulation results.
 */
'use client';

import {useMemo, useState} from 'react';
import {calculatePearlCannon, createPearlSettings} from '@/lib/pearl-calculator';

const fields = [
  ['px', '砲口珍珠 X'],
  ['py', '砲口珍珠 Y'],
  ['pz', '砲口珍珠 Z'],
  ['dx', '目標點 X'],
  ['dz', '目標點 Z'],
  ['maxTnt', '單側最大當量（1–160）']
] as const;

type Field = (typeof fields)[number][0];
type Inputs = Record<Field, string>;
const initialValues: Inputs = {px: '0', py: '170', pz: '0', dx: '1000', dz: '1000', maxTnt: '160'};

function validInput(key: Field, value: string): boolean {
  if (!value.trim()) return false;
  const number = Number(value);
  if (!Number.isFinite(number)) return false;
  return key !== 'maxTnt' || (Number.isSafeInteger(number) && number >= 1 && number <= 160);
}

export function MinecraftTools() {
  const [values, setValues] = useState<Inputs>(initialValues);
  const invalid = fields.some(([key]) => !validInput(key, values[key]));
  const result = useMemo(() => {
    if (invalid) return [];
    const {px, py, pz, dx, dz, maxTnt} = values;
    return calculatePearlCannon(
      [Number(px), Number(py), Number(pz)],
      [Number(dx), Number(dz)],
      createPearlSettings({maxCharge: Number(maxTnt)})
    );
  }, [values, invalid]);

  const update = (key: Field, value: string) => setValues((current) => ({...current, [key]: value}));

  return <section className="minecraft-tool" aria-labelledby="pearl-tool-title">
    <div className="tool-heading">
      <div><p className="lab-eyebrow">LAB / 01</p><h2 id="pearl-tool-title">Pearl cannon calculator</h2></div>
      <span>generic FTL</span>
    </div>
    <p className="tool-lead">輸入砲口珍珠 XYZ、目標 XZ 與單側最大 TNT 當量，搜尋通用四角幾何模型的候選配置。</p>
    <div className="pearl-fields">
      {fields.map(([key, label]) => <label key={key}>{label}
        <input
          inputMode="decimal"
          value={values[key]}
          aria-invalid={!validInput(key, values[key])}
          onChange={(event) => update(key, event.currentTarget.value)}
        />
      </label>)}
    </div>
    <div className="pearl-results" aria-live="polite">
      {result.length ? result.map((item) => <div className="pearl-result" key={`${item.tick}-${item.red}-${item.blue}`}>
        <strong>#{String(item.rank).padStart(2, '0')}</strong>
        <span><b>{item.direction} · {item.tick}gt</b><code>紅 {item.red} / 藍 {item.blue} TNT</code></span>
        <em>XZ 誤差 {item.error.toFixed(2)} · 預測 Y {item.landY.toFixed(1)}</em>
      </div>) : <p>{invalid ? '請輸入有效數字；單側當量須為 1 到 160 的整數。' : '目前找不到符合條件的配置。'}</p>}
    </div>
    <p className="pearl-disclaimer">只檢查理論 XZ 落點，尚未模擬地形、方塊碰撞或珍珠實際落地條件。請勿將這份結果視為遊戲內必然可用的配置。</p>
  </section>;
}
