/*
 * File: pearl-calculator.test.mjs
 * Modification: 2026-10-11 — Regression tests for singular-axis configurations and user settings.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {calculatePearlCannon, createPearlSettings, validatePearlSettings} from '../../lib/pearl-calculator.ts';

const custom = createPearlSettings({
  mode: 'custom', customRedTnt: [-1, 170, 0], customBlueTnt: [0, 170, -1],
  maxCharge: 1, maxTicks: 2, maxDistance: 1e9
});

test('independent X and Z blast vectors work even if the blue X component is zero', () => {
  const solutions = calculatePearlCannon([0, 170.3, 0], [0.2, 0.2], custom);
  assert.ok(solutions.length > 0, 'a valid pair of orthogonal TNT sources should have solutions');
  assert.ok(solutions.every((item) => Number.isFinite(item.error) && Number.isFinite(item.landX)));
});

test('gravity and air resistance controls are honored by the flight simulation', () => {
  const base = calculatePearlCannon([0, 170.3, 0], [0.2, 0.2], custom);
  const altered = calculatePearlCannon([0, 170.3, 0], [0.2, 0.2], {...custom, gravity: 0.09, airResistance: 0.8});
  const flight = base.find((r) => r.tick === 2 && r.red === 1 && r.blue === 1);
  const other = altered.find((r) => r.tick === 2 && r.red === 1 && r.blue === 1);
  assert.ok(flight && other);
  assert.notEqual(flight.landY, other.landY);
  assert.notEqual(flight.landX, other.landX);
});

test('nonfinite or fractional simulation settings are invalid', () => {
  for (const settings of [
    {maxTicks: NaN}, {maxTicks: 1.5}, {maxDistance: Infinity}, {maxCharge: 161},
    {gravity: NaN}, {airResistance: 0}, {airResistance: 1.5}, {maxCharge: 2.5}
  ]) {
    assert.notEqual(validatePearlSettings(createPearlSettings(settings)), null, JSON.stringify(settings));
  }
  assert.deepEqual(calculatePearlCannon([NaN, 170, 0], [0, 1], custom), []);
});


test('generic TNT pairs span two axes in each cardinal direction', () => {
  const settings = createPearlSettings({maxCharge: 2, maxTicks: 2, maxDistance: 1e9});
  for (const target of [[4, 2], [-4, -2], [2, 4], [-2, -4]]) {
    const solutions = calculatePearlCannon([0, 170, 0], target, settings);
    assert.ok(solutions.length > 0, `generic blast pair collapsed for ${target}`);
    assert.ok(solutions.every((item) => Number.isFinite(item.landZ)));
  }
});

test('generic TNT geometry moves together with the pearl coordinates', () => {
  const settings = createPearlSettings({maxCharge: 2, maxTicks: 2, maxDistance: 1e9});
  const origin = calculatePearlCannon([0, 170, 0], [4, 2], settings);
  const moved = calculatePearlCannon([100, 190, 500], [104, 502], settings);
  assert.ok(origin.length > 0 && moved.length > 0);
  const a = origin[0]; const b = moved[0];
  assert.deepEqual([b.red, b.blue, b.tick], [a.red, a.blue, a.tick]);
  assert.ok(Math.abs((b.landX - a.landX) - 100) < 1e-8);
  assert.ok(Math.abs((b.landY - a.landY) - 20) < 1e-8);
  assert.ok(Math.abs((b.landZ - a.landZ) - 500) < 1e-8);
});
