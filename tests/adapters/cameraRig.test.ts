import { describe, expect, it } from 'vitest';
import { CameraRig, updateCamera } from '../../src/adapters/render/cameraRig';
import { DEFAULT_TUNING } from '../../src/core/config';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';

const cfg = DEFAULT_TUNING.camera;
const hero = new Vec3(0, 0, 0);
const none: AABB[] = [];

function run(rig: CameraRig, boxes: AABB[], speed: number, ticks: number): void {
  for (let i = 0; i < ticks; i++) updateCamera(rig, hero, 0, 0, speed, boxes, cfg);
}

describe('cameraRig', () => {
  it('open space gives the full arm', () => {
    const rig = new CameraRig();
    run(rig, none, 0, 200);
    expect(rig.arm).toBeCloseTo(Math.hypot(cfg.dist, 0), 1);
    const dx = rig.pos.x - rig.lookAt.x;
    const dy = rig.pos.y - rig.lookAt.y;
    const dz = rig.pos.z - rig.lookAt.z;
    expect(Math.hypot(dx, dy, dz)).toBeGreaterThan(cfg.dist * 0.95);
  });

  it('a wall behind the hero pulls the camera in and never contains it', () => {
    const wall = new AABB(new Vec3(-10, -5, 1), new Vec3(10, 10, 2));
    const rig = new CameraRig();
    for (let i = 0; i < 100; i++) {
      updateCamera(rig, hero, 0, 0, 0, [wall], cfg);
      const inside =
        rig.pos.x > wall.min.x &&
        rig.pos.x < wall.max.x &&
        rig.pos.y > wall.min.y &&
        rig.pos.y < wall.max.y &&
        rig.pos.z > wall.min.z &&
        rig.pos.z < wall.max.z;
      expect(inside).toBe(false);
    }
    expect(rig.pos.z).toBeLessThanOrEqual(1);
    expect(rig.arm).toBeLessThan(cfg.dist);
  });

  it('snaps in instantly and eases out slowly', () => {
    const wall = new AABB(new Vec3(-10, -5, 1), new Vec3(10, 10, 2));
    const rig = new CameraRig();
    run(rig, none, 0, 50);
    run(rig, [wall], 0, 1);
    const pulled = rig.arm;
    expect(pulled).toBeLessThan(cfg.dist * 0.5);
    run(rig, none, 0, 1);
    expect(rig.arm).toBeGreaterThan(pulled);
    expect(rig.arm).toBeLessThan(cfg.dist * 0.5);
  });

  it('smoothing converges to the hero', () => {
    const rig = new CameraRig();
    run(rig, none, 0, 1);
    hero.x = 10;
    run(rig, none, 0, 200);
    expect(rig.focus.x).toBeCloseTo(10, 3);
    hero.x = 0;
  });

  it('is deterministic', () => {
    const a = new CameraRig();
    const b = new CameraRig();
    for (let i = 0; i < 50; i++) {
      updateCamera(a, hero, i * 0.05, 0.1, 5, none, cfg);
      updateCamera(b, hero, i * 0.05, 0.1, 5, none, cfg);
    }
    expect(a.pos).toEqual(b.pos);
    expect(a.fov).toBe(b.fov);
  });

  it('rig.yaw equals the input yaw after one update (no smoothing)', () => {
    const rig = new CameraRig();
    updateCamera(rig, hero, 1.2, 0.3, 0, none, cfg);
    expect(rig.yaw).toBe(1.2);
    expect(rig.pitch).toBe(0.3);
    // Second tick: yaw must track the input exactly, not ease towards it.
    updateCamera(rig, hero, -0.7, -0.2, 0, none, cfg);
    expect(rig.yaw).toBe(-0.7);
    expect(rig.pitch).toBe(-0.2);
  });

  it('arm does not collapse to 0 at a wall corner', () => {
    // Box beside the hero, touching the capsule start: t=0 hit not into the sweep.
    const box = new AABB(new Vec3(-5, -5, -10), new Vec3(-0.15, 10, 10));
    const rig = new CameraRig();
    for (let i = 0; i < 60; i++) updateCamera(rig, hero, 0, 0, 0, [box], cfg);
    expect(rig.arm).toBeGreaterThan(cfg.dist * 0.3);
  });

  it('fov grows with speed and clamps', () => {
    const slow = new CameraRig();
    const mid = new CameraRig();
    const fast = new CameraRig();
    run(slow, none, 0, 300);
    run(mid, none, cfg.fovSpeed * 0.5, 300);
    run(fast, none, cfg.fovSpeed * 100, 300);
    expect(slow.fov).toBeCloseTo(cfg.fov, 3);
    expect(mid.fov).toBeGreaterThan(slow.fov);
    expect(mid.fov).toBeLessThan(fast.fov);
    expect(fast.fov).toBeCloseTo(cfg.fovMax, 3);
  });
});
