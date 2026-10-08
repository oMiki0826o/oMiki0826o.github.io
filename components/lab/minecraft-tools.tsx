'use client';

import {useMemo, useState} from 'react';
import {calculatePearlCannon, defaultPearlSettings} from '@/lib/pearl-calculator';

type Result = {rank: number; totalTick: number; code: string; x: number; y: number; z: number; error: number; sideA: number; sideB: number; direction: string};
const f = 0.9899999499320984;
const oneXZ = 0.6026793588895138;
const oneY = 0.004435058914919521;
const initialY = -0.340740225070415;
const bits = (value: number) => { let rest = Math.abs(value); return [80, 40, 20, 10, 4, 3, 2, 1].map((weight) => { if (rest >= weight) { rest -= weight; return '1'; } return '0'; }).join(''); };

type Physics = {gravity: number; air: number; tntXZ: number; tntY: number; initialY: number; maxMN: number};
function calculate(px: number, py: number, pz: number, destX: number, destZ: number, ground: number, physics: Physics): Result[] {
  const dx = destX - px; const dz = destZ - pz; const direction: 'N' | 'S' | 'E' | 'W' = Math.abs(dx) >= Math.abs(dz) ? (dx > 0 ? 'E' : 'W') : (dz > 0 ? 'S' : 'N'); const dirBits = {N: '00', W: '01', E: '10', S: '11'}[direction]; const candidates: Array<{error: number; tick: number; m: number; n: number; code: string}> = [];
  for (let tick = 1; tick <= 200; tick += 1) {
    const kp = 2 * physics.tntXZ * ((physics.air - physics.air ** (tick + 1)) / (1 - physics.air)); let m: number; let n: number; let mx: number; let mz: number;
    if (direction === 'N' || direction === 'S') { m = Math.round((dx + dz) / kp); n = Math.round((dz - dx) / kp); if (direction === 'N') [m, n] = [n, m]; mx = (Math.abs(m) - Math.abs(n)) * physics.tntXZ; mz = (m + n) * physics.tntXZ; } else { m = Math.round((dx + dz) / kp); n = Math.round((dx - dz) / kp); if (direction === 'W') [m, n] = [n, m]; mx = (m + n) * physics.tntXZ; mz = (Math.abs(m) - Math.abs(n)) * physics.tntXZ; }
    if (Math.abs(m) > physics.maxMN || Math.abs(n) > physics.maxMN) continue;
    let x = px; let y = py; let z = pz; let my = Math.abs(m + n) * physics.tntY + physics.initialY;
    for (let step = 0; step < tick; step += 1) { mx *= physics.air; my = (my - physics.gravity) * physics.air; mz *= physics.air; x += mx; y += my; z += mz; }
    if (y > ground) continue;
    candidates.push({error: Math.hypot(x - destX, z - destZ), tick, m, n, code: `${bits(n).split('').reverse().join('')} ${dirBits} ${bits(m)}`});
  }
  return candidates.sort((a, b) => a.error - b.error).slice(0, 8).map((item, index) => { let x = px; let y = py; let z = pz; let mx: number; let mz: number; if (direction === 'N' || direction === 'S') { mx = (Math.abs(item.m) - Math.abs(item.n)) * physics.tntXZ; mz = (item.m + item.n) * physics.tntXZ; } else { mx = (item.m + item.n) * physics.tntXZ; mz = (Math.abs(item.m) - Math.abs(item.n)) * physics.tntXZ; } let my = Math.abs(item.m + item.n) * physics.tntY + physics.initialY; for (let step = 0; step < item.tick; step += 1) { mx *= physics.air; my = (my - physics.gravity) * physics.air; mz *= physics.air; x += mx; y += my; z += mz; } return {rank: index + 1, totalTick: item.tick + 84, code: item.code, x, y, z, error: item.error, sideA: Math.abs(item.m), sideB: Math.abs(item.n), direction}; });
}

export function MinecraftTools() {
  const [values, setValues] = useState({px: '0', py: '170', pz: '0', dx: '1000', dz: '1000', maxTnt: '160'});
  const result = useMemo(() => { const numbers = Object.values(values).map(Number); if (numbers.some((value) => !Number.isFinite(value))) return []; return calculatePearlCannon([numbers[0]!, numbers[1]!, numbers[2]!], [numbers[3]!, numbers[4]!], {...defaultPearlSettings, maxCharge: numbers[5]!}); }, [values]);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({...current, [key]: value}));
  return <section className="minecraft-tool" aria-labelledby="pearl-tool-title"><div className="tool-heading"><div><p className="lab-eyebrow">LAB / 01</p><h2 id="pearl-tool-title">Pearl cannon calculator</h2></div><span>generic FTL</span></div><p className="tool-lead">輸入砲口珍珠 XYZ、目標 XZ 與單側最大當量；方向與兩側 TNT 配置會自動推導。</p><div className="pearl-fields">{([['px', '砲口珍珠 X'], ['py', '砲口珍珠 Y'], ['pz', '砲口珍珠 Z'], ['dx', '目標點 X'], ['dz', '目標點 Z'], ['maxTnt', '單側最大當量']] as const).map(([key, label]) => <label key={key}>{label}<input inputMode="decimal" value={values[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div><div className="pearl-results" aria-live="polite">{result.length ? result.map((item) => <div className="pearl-result" key={`${item.rank}-${item.code}`}><strong>#{String(item.rank).padStart(2, '0')}</strong><span><b>{item.direction} · {item.totalTick}gt</b><code>兩側 {item.sideA} / {item.sideB} TNT</code></span><em>誤差 {item.error.toFixed(2)}</em></div>) : <p>請輸入有效數值。</p>}</div></section>;
}
