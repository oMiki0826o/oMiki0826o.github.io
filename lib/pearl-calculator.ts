/*
 * File: pearl-calculator.ts
 * Modification: 2026-10-11 — Fix zero-axis linear solve, honor flight settings, and validate inputs.
 */
export type PearlGameVersion = '1.11–1.21.1' | '1.21.2+';
export type PearlFtlMode = 'generic' | 'custom';
type Vec = [number, number, number];
type Direction = 'N' | 'S' | 'E' | 'W';

export type PearlSettings = {
  mode: PearlFtlMode;
  gameVersion: PearlGameVersion;
  maxCharge: number;
  maxTicks: number;
  maxDistance: number;
  northWestTnt: Vec;
  northEastTnt: Vec;
  southWestTnt: Vec;
  southEastTnt: Vec;
  customRedTnt: Vec;
  customBlueTnt: Vec;
  gravity: number;
  airResistance: number;
  pearlYMotionCancellation: boolean;
  pearlYPositionOriginal: number;
  pearlYPositionAdjusted: number;
};
export type PearlResult = {
  rank: number;
  tick: number;
  totalTnt: number;
  red: number;
  blue: number;
  direction: Direction;
  landX: number;
  landY: number;
  landZ: number;
  error: number;
  redCode: number[];
  blueCode: number[];
};

const defaults: PearlSettings = {
  mode: 'generic', gameVersion: '1.11–1.21.1',
  maxCharge: 160, maxTicks: 200, maxDistance: 5,
  northWestTnt: [-0.885, 170.5, -0.885],
  northEastTnt: [0.885, 170.5, -0.885],
  southWestTnt: [-0.885, 170.5, 0.885],
  southEastTnt: [0.885, 170.5, 0.885],
  customRedTnt: [0.885, 170.5, 0.885],
  customBlueTnt: [-0.885, 170.5, -0.885],
  gravity: 0.03, airResistance: 0.99,
  pearlYMotionCancellation: false,
  pearlYPositionOriginal: 170.34722638929412,
  pearlYPositionAdjusted: 170
};

export const genericFtlVersions = ['1.11–1.21.1', '1.21.2+'] as const;
export const createPearlSettings = (overrides: Partial<PearlSettings> = {}): PearlSettings => ({...defaults, ...overrides});

const finiteVec = (vector: readonly number[]) => vector.length === 3 && vector.every(Number.isFinite);

export function validatePearlSettings(settings: PearlSettings): string | null {
  if (!Number.isSafeInteger(settings.maxCharge) || settings.maxCharge < 1 || settings.maxCharge > 160) return '單側最大當量必須是 1 到 160 的整數。';
  if (!Number.isSafeInteger(settings.maxTicks) || settings.maxTicks < 1 || settings.maxTicks > 500) return '搜尋 tick 必須是介於 1 與 500 的整數。';
  if (!Number.isFinite(settings.maxDistance) || settings.maxDistance <= 0) return '最大誤差必須是有限的正數。';
  if (!Number.isFinite(settings.gravity) || settings.gravity < 0) return '重力必須是有限的非負數。';
  if (!Number.isFinite(settings.airResistance) || settings.airResistance <= 0 || settings.airResistance > 1) return '空氣阻力係數必須介於 0（不含）與 1 之間。';
  if (!genericFtlVersions.includes(settings.gameVersion)) return '不支援的 Minecraft 版本。';
  if (settings.mode !== 'generic' && settings.mode !== 'custom') return '不支援的計算模式。';
  const positions = settings.mode === 'custom'
    ? [settings.customRedTnt, settings.customBlueTnt]
    : [settings.northWestTnt, settings.northEastTnt, settings.southWestTnt, settings.southEastTnt];
  if (positions.some((vector) => !finiteVec(vector))) return 'TNT 座標必須是有限數值。';
  if (!Number.isFinite(settings.pearlYPositionOriginal) || !Number.isFinite(settings.pearlYPositionAdjusted)) return '珍珠高度必須是有限數值。';
  return null;
}

// ── 向量與運動模型 ──
const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: Vec, n: number): Vec => [a[0] * n, a[1] * n, a[2] * n];

function tntMotion(pearl: Vec, tnt: Vec): Vec {
  const adjusted: Vec = [tnt[0], tnt[1] + 0.98 * 0.0625, tnt[2]];
  const delta = sub(pearl, adjusted);
  const horizontalDistance = Math.hypot(delta[0], delta[1], delta[2]) / 8;
  const vector: Vec = [delta[0], pearl[1] + 0.85 * 0.25 - adjusted[1], delta[2]];
  const magnitude = Math.hypot(...vector);
  return magnitude > 0 ? mul(vector, (1 - horizontalDistance) / magnitude) : [0, 0, 0];
}

function direction(dx: number, dz: number): Direction {
  return Math.abs(dx) >= Math.abs(dz) ? (dx > 0 ? 'E' : 'W') : (dz > 0 ? 'S' : 'N');
}

function vectors(pearl: Vec, dir: Direction, settings: PearlSettings): [Vec, Vec] {
  if (settings.mode === 'custom') {
    // 自訂模式直接使用使用者輸入的世界座標。
    return [tntMotion(pearl, settings.customRedTnt), tntMotion(pearl, settings.customBlueTnt)];
  }
  // 通用四角模板以 (0, 170, 0) 為座標基準；跟著砲口平移，
  // 不可將世界座標 (100, 190, 500) 的珍珠與原點附近的 TNT 混合計算。
  const origin: Vec = [0, 170, 0];
  const relative = (position: Vec): Vec => add(pearl, sub(position, origin));
  const pairs: Record<Direction, [Vec, Vec]> = {
    N: [settings.southWestTnt, settings.southEastTnt],
    S: [settings.northWestTnt, settings.northEastTnt],
    E: [settings.southWestTnt, settings.northWestTnt],
    W: [settings.southEastTnt, settings.northEastTnt]
  };
  // 同側兩個來源可形成獨立的 X/Z 推力；對角線兩端則退化成同一條軸。
  const [red, blue] = pairs[dir];
  return [tntMotion(pearl, relative(red)), tntMotion(pearl, relative(blue))];
}

function advance(position: Vec, motion: Vec, settings: PearlSettings): [Vec, Vec] {
  const drag = settings.airResistance;
  const gravity = settings.gravity;
  if (settings.gameVersion === '1.11–1.21.1') {
    return [add(position, motion), [motion[0] * drag, motion[1] * drag - gravity, motion[2] * drag]];
  }
  const nextMotion: Vec = [motion[0] * drag, (motion[1] - gravity) * drag, motion[2] * drag];
  return [add(position, nextMotion), nextMotion];
}

const encode = (n: number) => {
  let rest = Math.abs(n);
  return [80, 40, 20, 10, 4, 3, 2, 1].filter((weight) => {
    if (rest < weight) return false;
    rest -= weight;
    return true;
  });
};

// ── 求解雙軸當量並驗證候選落點 ──
export function calculatePearlCannon(projected: Vec, target: [number, number], settings: PearlSettings = defaults): PearlResult[] {
  if (validatePearlSettings(settings) || !finiteVec(projected) || !target.every(Number.isFinite)) return [];
  const [targetX, targetZ] = target;
  const dx = targetX - projected[0];
  const dz = targetZ - projected[2];
  const dir = direction(dx, dz);
  const [redVector, blueVector] = vectors(projected, dir, settings);
  const determinant = redVector[2] * blueVector[0] - blueVector[2] * redVector[0];
  if (!Number.isFinite(determinant) || Math.abs(determinant) < 1e-12) return [];

  // Cramer's rule: avoid dividing by blueVector[0], which can legitimately be zero.
  const trueRed = (dz * blueVector[0] - dx * blueVector[2]) / determinant;
  const trueBlue = (dx * redVector[2] - dz * redVector[0]) / determinant;
  const results: PearlResult[] = [];
  let divider = 0;

  for (let currentTick = 1; currentTick <= settings.maxTicks; currentTick += 1) {
    divider += settings.airResistance ** (currentTick - (settings.gameVersion === '1.11–1.21.1' ? 1 : 0));
    const redBase = Math.trunc(trueRed / divider);
    const blueBase = Math.trunc(trueBlue / divider);
    for (let redAdjust = -5; redAdjust <= 5; redAdjust += 1) {
      for (let blueAdjust = -5; blueAdjust <= 5; blueAdjust += 1) {
        const red = redBase + redAdjust;
        const blue = blueBase + blueAdjust;
        if (!Number.isSafeInteger(red) || !Number.isSafeInteger(blue) || red < 0 || blue < 0 || red > settings.maxCharge || blue > settings.maxCharge) continue;
        let position: Vec = [...projected];
        if (settings.pearlYMotionCancellation) position[1] = settings.pearlYPositionAdjusted;
        let motion = add(mul(redVector, red), mul(blueVector, blue));
        if (settings.pearlYMotionCancellation) motion[1] = 0;
        for (let step = 0; step < currentTick; step += 1) [position, motion] = advance(position, motion, settings);
        const error = Math.hypot(position[0] - targetX, position[2] - targetZ);
        if (error <= settings.maxDistance) results.push({
          rank: 0, tick: currentTick, totalTnt: red + blue,
          red, blue, direction: dir, landX: position[0], landY: position[1], landZ: position[2],
          error, redCode: encode(red), blueCode: encode(blue)
        });
      }
    }
  }
  return results.sort((a, b) => a.error - b.error || a.totalTnt - b.totalTnt)
    .slice(0, 10).map((result, index) => ({...result, rank: index + 1}));
}
