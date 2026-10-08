export type PearlDirection = 'N' | 'S' | 'E' | 'W';
export type PearlFtlMode = 'generic' | 'custom';
export type PearlGameVersion = '1.11–1.21.1' | '1.21.2+';
export type PearlSettings = {gravity: number; airResistance: number; tntXZ: number; tntY: number; initialY: number; maxCharge: number; groundY: number};
export type PearlResult = {rank: number; totalTick: number; direction: PearlDirection; sideA: number; sideB: number; code: string; landX: number; landY: number; landZ: number; error: number};

const weights = [80, 40, 20, 10, 4, 3, 2, 1];
const toBits = (value: number) => { let rest = Math.abs(value); return weights.map((weight) => { if (rest >= weight) { rest -= weight; return '1'; } return '0'; }).join(''); };

export const defaultPearlSettings: PearlSettings = {gravity: 0.03, airResistance: 0.9899999499320984, tntXZ: 0.6026793588895138, tntY: 0.004435058914919521, initialY: -0.340740225070415, maxCharge: 160, groundY: 128};

export const genericFtlVersions: readonly PearlGameVersion[] = ['1.11–1.21.1', '1.21.2+'];

export function createPearlSettings(overrides: Partial<PearlSettings> = {}): PearlSettings {
  return {...defaultPearlSettings, ...overrides};
}

export function validatePearlSettings(settings: PearlSettings): string | null {
  if (settings.maxCharge <= 0 || !Number.isFinite(settings.maxCharge)) return '單側最大當量必須大於 0。';
  if (settings.airResistance <= 0 || settings.airResistance >= 1) return '空氣阻力必須介於 0 與 1 之間。';
  if (settings.groundY >= 1000 || !Number.isFinite(settings.groundY)) return '地面高度不是有效數值。';
  return null;
}

export function calculatePearlCannon(projected: [number, number, number], target: [number, number], settings: PearlSettings = defaultPearlSettings): PearlResult[] {
  if (validatePearlSettings(settings)) return [];
  const [px, py, pz] = projected; const [targetX, targetZ] = target; const dx = targetX - px; const dz = targetZ - pz; const direction: PearlDirection = Math.abs(dx) >= Math.abs(dz) ? (dx > 0 ? 'E' : 'W') : (dz > 0 ? 'S' : 'N'); const directionBits = {N: '00', W: '01', E: '10', S: '11'}[direction]; const candidates: Array<{error: number; tick: number; m: number; n: number; code: string; x: number; y: number; z: number}> = [];
  for (let tick = 1; tick <= 200; tick += 1) { const kp = 2 * settings.tntXZ * ((settings.airResistance - settings.airResistance ** (tick + 1)) / (1 - settings.airResistance)); let m: number; let n: number; let mx: number; let mz: number; if (direction === 'N' || direction === 'S') { m = Math.round((dx + dz) / kp); n = Math.round((dz - dx) / kp); if (direction === 'N') [m, n] = [n, m]; mx = (Math.abs(m) - Math.abs(n)) * settings.tntXZ; mz = (m + n) * settings.tntXZ; } else { m = Math.round((dx + dz) / kp); n = Math.round((dx - dz) / kp); if (direction === 'W') [m, n] = [n, m]; mx = (m + n) * settings.tntXZ; mz = (Math.abs(m) - Math.abs(n)) * settings.tntXZ; } if (Math.abs(m) > settings.maxCharge || Math.abs(n) > settings.maxCharge) continue; let x = px; let y = py; let z = pz; let my = Math.abs(m + n) * settings.tntY + settings.initialY; for (let step = 0; step < tick; step += 1) { mx *= settings.airResistance; my = (my - settings.gravity) * settings.airResistance; mz *= settings.airResistance; x += mx; y += my; z += mz; } if (y > settings.groundY) continue; candidates.push({error: Math.hypot(x - targetX, z - targetZ), tick, m, n, x, y, z, code: `${toBits(n).split('').reverse().join('')} ${directionBits} ${toBits(m)}`}); }
  return candidates.sort((a, b) => a.error - b.error).slice(0, 10).map((item, index) => ({rank: index + 1, totalTick: item.tick + 84, direction, sideA: Math.abs(item.m), sideB: Math.abs(item.n), code: item.code, landX: item.x, landY: item.y, landZ: item.z, error: item.error}));
}
