'use client';

import {useMemo, useState} from 'react';

type Result = {rank: number; totalTick: number; code: string; x: number; y: number; z: number; error: number};
const f = 0.9899999499320984;
const oneXZ = 0.6026793588895138;
const oneY = 0.004435058914919521;
const initialY = -0.340740225070415;
const bits = (value: number) => { let rest = Math.abs(value); return [80, 40, 20, 10, 4, 3, 2, 1].map((weight) => { if (rest >= weight) { rest -= weight; return '1'; } return '0'; }).join(''); };

type Physics = {gravity: number; air: number; tntXZ: number; tntY: number; initialY: number; maxMN: number};
function calculate(px: number, py: number, pz: number, destX: number, destZ: number, ground: number, physics: Physics): Result[] {
  const dx = destX - px; const dz = destZ - pz; const direction = Math.abs(dx) >= Math.abs(dz) ? (dx > 0 ? 'E' : 'W') : (dz > 0 ? 'S' : 'N'); const dirBits = {N: '00', W: '01', E: '10', S: '11'}[direction]; const candidates: Array<{error: number; tick: number; m: number; n: number; code: string}> = [];
  for (let tick = 1; tick <= 200; tick += 1) {
    const kp = 2 * physics.tntXZ * ((physics.air - physics.air ** (tick + 1)) / (1 - physics.air)); let m: number; let n: number; let mx: number; let mz: number;
    if (direction === 'N' || direction === 'S') { m = Math.round((dx + dz) / kp); n = Math.round((dz - dx) / kp); if (direction === 'N') [m, n] = [n, m]; mx = (Math.abs(m) - Math.abs(n)) * physics.tntXZ; mz = (m + n) * physics.tntXZ; } else { m = Math.round((dx + dz) / kp); n = Math.round((dx - dz) / kp); if (direction === 'W') [m, n] = [n, m]; mx = (m + n) * physics.tntXZ; mz = (Math.abs(m) - Math.abs(n)) * physics.tntXZ; }
    if (Math.abs(m) > physics.maxMN || Math.abs(n) > physics.maxMN) continue;
    let x = px; let y = py; let z = pz; let my = Math.abs(m + n) * physics.tntY + physics.initialY;
    for (let step = 0; step < tick; step += 1) { mx *= physics.air; my = (my - physics.gravity) * physics.air; mz *= physics.air; x += mx; y += my; z += mz; }
    if (y > ground) continue;
    candidates.push({error: Math.hypot(x - destX, z - destZ), tick, m, n, code: `${bits(n).split('').reverse().join('')} ${dirBits} ${bits(m)}`});
  }
  return candidates.sort((a, b) => a.error - b.error).slice(0, 8).map((item, index) => { let x = px; let y = py; let z = pz; let mx: number; let mz: number; if (direction === 'N' || direction === 'S') { mx = (Math.abs(item.m) - Math.abs(item.n)) * physics.tntXZ; mz = (item.m + item.n) * physics.tntXZ; } else { mx = (item.m + item.n) * physics.tntXZ; mz = (Math.abs(item.m) - Math.abs(item.n)) * physics.tntXZ; } let my = Math.abs(item.m + item.n) * physics.tntY + physics.initialY; for (let step = 0; step < item.tick; step += 1) { mx *= physics.air; my = (my - physics.gravity) * physics.air; mz *= physics.air; x += mx; y += my; z += mz; } return {rank: index + 1, totalTick: item.tick + 84, code: item.code, x, y, z, error: item.error}; });
}

export function MinecraftTools() {
  const [values, setValues] = useState({px: '0', py: '170', pz: '0', dx: '1000', dz: '1000', ground: '128', gravity: '0.03', air: '0.99', tntXZ: String(oneXZ), tntY: String(oneY), initialY: String(initialY), maxMN: '160'});
  const result = useMemo(() => { const numbers = Object.values(values).map(Number); if (numbers.some((value) => !Number.isFinite(value))) return []; return calculate(numbers[0]!, numbers[1]!, numbers[2]!, numbers[3]!, numbers[4]!, numbers[5]!, {gravity: numbers[6]!, air: numbers[7]!, tntXZ: numbers[8]!, tntY: numbers[9]!, initialY: numbers[10]!, maxMN: numbers[11]!}); }, [values]);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({...current, [key]: value}));
  return <section className="minecraft-tool" aria-labelledby="pearl-tool-title"><div className="tool-heading"><div><p className="lab-eyebrow">LAB / 01</p><h2 id="pearl-tool-title">Pearl cannon calculator</h2></div><span>generic / 1.8–1.21</span></div><p className="tool-lead">通用版珍珠砲搜尋器。先填入 84gt 座標，再依你的版本或測量結果調整物理參數。</p><div className="pearl-fields">{([['px', '珍珠 X'], ['py', '珍珠 Y'], ['pz', '珍珠 Z'], ['dx', '目標 X'], ['dz', '目標 Z'], ['ground', '地面高度']] as const).map(([key, label]) => <label key={key}>{label}<input inputMode="decimal" value={values[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div><details className="pearl-settings"><summary>FTL / 物理設定</summary><div className="pearl-fields">{([['gravity', '重力'], ['air', '空氣阻力'], ['tntXZ', 'TNT XZ 動量'], ['tntY', 'TNT Y 動量'], ['initialY', '珍珠初始 Y'], ['maxMN', '搜尋上限']] as const).map(([key, label]) => <label key={key}>{label}<input inputMode="decimal" value={values[key]} onChange={(event) => update(key, event.target.value)} /></label>)}</div></details><div className="pearl-results" aria-live="polite">{result.length ? result.map((item) => <div className="pearl-result" key={`${item.rank}-${item.code}`}><strong>#{String(item.rank).padStart(2, '0')}</strong><span><b>{item.totalTick}gt</b><code>{item.code}</code></span><em>誤差 {item.error.toFixed(2)}</em></div>) : <p>請輸入有效數值。</p>}</div></section>;
}
