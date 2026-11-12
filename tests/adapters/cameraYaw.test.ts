import { describe, expect, it } from 'vitest';
import { chaseRigYaw, easeSideYaw, easeYawOffset, sideYawTarget, zipYawTarget } from '../../src/adapters/render/cameraYaw';

const cfg = { zipYawDeg: 45, zipYawMinDiagDeg: 20, zipYawEase: 0.1,
  sideYawDeg: 14,
  sideYawSpeed: 5,
  sideYawEase: 0.1,
};
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

describe('side camera yaw (T300)', () => {
  it('leans toward the side of travel, saturates, and is zero at rest', () => {
    expect(sideYawTarget(0, cfg)).toBe(0);
    expect(sideYawTarget(2.5, cfg)).toBeCloseTo(7 * D);
    expect(sideYawTarget(-2.5, cfg)).toBeCloseTo(-7 * D);
    expect(sideYawTarget(50, cfg)).toBeCloseTo(14 * D);
    expect(sideYawTarget(-50, cfg)).toBeCloseTo(-14 * D);
  });
  it('eases out toward the side and returns to exactly zero when movement stops', () => {
    let y = 0;
    for (let i = 0; i < 200; i++) y = easeSideYaw(y, sideYawTarget(5, cfg), cfg);
    expect(y).toBeCloseTo(14 * D);
    for (let i = 0; i < 200; i++) y = easeSideYaw(y, sideYawTarget(0, cfg), cfg);
    expect(y).toBe(0);
  });
});

describe('chase rig yaw', () => {
  const look = (r: number) => [Math.sin(r), -Math.cos(r)];
  const c = 3.14159; // chase spawnYaw: hero travels (sin c, cos c) = -z
  it('front POV looks against the hero travel direction', () => {
    const [lx, lz] = look(chaseRigYaw(c, 1));
    expect(lx * Math.sin(c) + lz * Math.cos(c)).toBeCloseTo(-1, 4);
  });
  it('behind view looks along the hero travel direction', () => {
    const [lx, lz] = look(chaseRigYaw(c, 0));
    expect(lx * Math.sin(c) + lz * Math.cos(c)).toBeCloseTo(1, 4);
  });
  it('frontPov 0 is the classic behind rig, r = PI - c, for any sim yaw', () => {
    for (const y of [0, 1, 3.14159, -2.2]) expect(chaseRigYaw(y, 0)).toBeCloseTo(Math.PI - y, 10);
  });
  it('behind view: stick-up (hero travel) is away from the camera, screen right = hero right', () => {
    const r = chaseRigYaw(c, 0);
    const right = [Math.cos(r), Math.sin(r)]; // rig screen-right in (x, z)
    const heroRight = [Math.cos(c), -Math.sin(c)]; // sim right of forward (sin c, cos c)
    // moveX is negated in game.ts (mirror), so screen right is the negated sim right vector
    expect(right[0] * heroRight[0] + right[1] * heroRight[1]).toBeCloseTo(-1, 4);
    expect(chaseRigYaw(c, 0.49)).toBeCloseTo(Math.PI - c, 10);
  });
});
