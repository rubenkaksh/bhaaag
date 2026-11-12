import { describe, expect, it } from 'vitest';
import { easeYawOffset, zipYawTarget } from '../../src/adapters/render/cameraYaw';

const cfg = { zipYawDeg: 45, zipYawMinDiagDeg: 20, zipYawEase: 0.1 };
const D = Math.PI / 180;

describe('zip camera yaw', () => {
  it('is zero when not attached or straight ahead', () => {
    expect(zipYawTarget(false, 5, 5, cfg)).toBe(0);
    expect(zipYawTarget(true, 0.5, 5, cfg)).toBe(0);
    expect(zipYawTarget(true, 3, -5, cfg)).toBe(0);
  });
  it('turns toward the travel side on a diagonal', () => {
    expect(zipYawTarget(true, 5, 5, cfg)).toBeCloseTo(45 * D);
    expect(zipYawTarget(true, -5, 5, cfg)).toBeCloseTo(-45 * D);
  });
  it('stays set for every attached tick and never fires when detached', () => {
    for (let i = 0; i < 50; i++) expect(zipYawTarget(true, 5, 5, cfg)).toBeCloseTo(45 * D);
    expect(zipYawTarget(false, 5, 5, cfg)).toBe(0);
  });
  it('eases out and back to exactly zero', () => {
    let y = 0;
    for (let i = 0; i < 200; i++) y = easeYawOffset(y, 45 * D, cfg);
    expect(y).toBeCloseTo(45 * D);
    for (let i = 0; i < 200; i++) y = easeYawOffset(y, 0, cfg);
    expect(y).toBe(0);
  });
});
