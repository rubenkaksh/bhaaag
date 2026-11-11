import { describe, expect, it } from 'vitest';
import { easeYawOffset, zipYawTarget } from '../../src/adapters/render/cameraYaw';

const cfg = { zipYawDeg: 25, zipYawMinDiagDeg: 20, zipYawEase: 0.1 };
const D = Math.PI / 180;

describe('zip camera yaw', () => {
  it('is zero when not attached or straight ahead', () => {
    expect(zipYawTarget(false, 5, 5, cfg)).toBe(0);
    expect(zipYawTarget(true, 0.5, 5, cfg)).toBe(0);
    expect(zipYawTarget(true, 3, -5, cfg)).toBe(0);
  });
  it('turns toward the travel side on a diagonal', () => {
    expect(zipYawTarget(true, 5, 5, cfg)).toBeCloseTo(25 * D);
    expect(zipYawTarget(true, -5, 5, cfg)).toBeCloseTo(-25 * D);
  });
  it('eases out and back to exactly zero', () => {
    let y = 0;
    for (let i = 0; i < 200; i++) y = easeYawOffset(y, 25 * D, cfg);
    expect(y).toBeCloseTo(25 * D);
    for (let i = 0; i < 200; i++) y = easeYawOffset(y, 0, cfg);
    expect(y).toBe(0);
  });
});
