import { readFileSync } from 'node:fs';
import { Color } from 'three';
import type { Mesh } from 'three';
import { describe, expect, it } from 'vitest';
import { RopeView } from '../../src/app/ropeView';
import { ROPE_TIE, buildRopePost } from '../../src/app/ropePost';
import { HOOK_ATTACHED, HOOK_FLYING, Hook } from '../../src/core/hook';
import { loadWorldFromJson } from '../../src/content/load';
import type { World } from '../../src/core/world';

const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);
const SEG = 24;
const TRAIL_SEG = 12;
const RAD = 6;

function attach(w: World, ox: number, oy: number, oz: number): Hook {
  const id = w.route[0];
  const a = w.anchors[id];
  const h = new Hook();
  h.state = HOOK_ATTACHED;
  h.anchorId = id;
  h.ax = a.px;
  h.ay = a.py;
  h.az = a.pz;
  h.ox = ox;
  h.oy = oy;
  h.oz = oz;
  const dx = a.px - ox;
  const dy = a.py - oy;
  const dz = a.pz - oz;
  h.len = Math.hypot(dx, dy, dz);
  h.dirX = dx / h.len;
  h.dirY = dy / h.len;
  h.dirZ = dz / h.len;
  return h;
}

function tubeOf(v: RopeView): Mesh {
  return v.group.children[1] as Mesh;
}

// Ring centre = mean of its RAD distinct side vertices.
function ringCentre(v: RopeView, ring: number): [number, number, number] {
  const p = tubeOf(v).geometry.getAttribute('position');
  let x = 0;
  let y = 0;
  let z = 0;
  for (let j = 0; j < RAD; j++) {
    const i = ring * (RAD + 1) + j;
    x += p.getX(i);
    y += p.getY(i);
    z += p.getZ(i);
  }
  return [x / RAD, y / RAD, z / RAD];
}

function distPointAabb(
  p: [number, number, number],
  b: { min: { x: number; y: number; z: number }; max: { x: number; y: number; z: number } },
): number {
  const dx = Math.max(b.min.x - p[0], 0, p[0] - b.max.x);
  const dy = Math.max(b.min.y - p[1], 0, p[1] - b.max.y);
  const dz = Math.max(b.min.z - p[2], 0, p[2] - b.max.z);
  return Math.hypot(dx, dy, dz);
}

describe('rope view (ADR 0006 section 3)', () => {
  it('writes linear-space twist colours and gold at the anchor end', () => {
    const v = new RopeView();
    const col = tubeOf(v).geometry.getAttribute('color');
    const light = new Color(0xb08850);
    const i = 1; // ring 0, side 1 -> (0 + 1) % 3 = 1 -> light
    expect(Math.abs(col.getX(i) - light.r)).toBeLessThan(1e-6);
    expect(Math.abs(col.getY(i) - light.g)).toBeLessThan(1e-6);
    expect(Math.abs(col.getZ(i) - light.b)).toBeLessThan(1e-6);
    expect(Math.abs(col.getX(i) - 0xb0 / 255)).toBeGreaterThan(0.05);
    const gold = new Color(0xffc83a);
    const g = SEG * (RAD + 1) + 2;
    expect(Math.abs(col.getX(g) - gold.r)).toBeLessThan(1e-6);
    expect(Math.abs(col.getY(g) - gold.g)).toBeLessThan(1e-6);
    expect(Math.abs(col.getZ(g) - gold.b)).toBeLessThan(1e-6);
  });

  it('trails the rope behind the hero while attached', () => {
    ROPE_TIE.set = false;
    ROPE_TIE.anchorId = -1;
    const v = new RopeView();
    const h = attach(world, 0, 2, 0);
    const hx = h.ox + h.dirX * 3;
    const hy = h.oy + h.dirY * 3;
    const hz = h.oz + h.dirZ * 3;
    v.update(h, hx, hy, hz, 20, 1 / 60);
    const e = ringCentre(v, SEG + 1 + TRAIL_SEG);
    expect(e[0]).toBeCloseTo(h.ox - 8 * h.dirX, 3);
    expect(e[1]).toBeCloseTo(h.oy - 8 * h.dirY, 3);
    expect(e[2]).toBeCloseTo(h.oz - 8 * h.dirZ, 3);
    const dot = (e[0] - hx) * h.dirX + (e[1] - hy) * h.dirY + (e[2] - hz) * h.dirZ;
    expect(dot).toBeLessThan(0);
  });

  it('collapses the trail onto the hand while flying', () => {
    const v = new RopeView();
    const h = attach(world, 0, 2, 0);
    h.state = HOOK_FLYING;
    h.flyT = 0.05;
    v.update(h, 0, 2, 0, 20, 1 / 60);
    const p = tubeOf(v).geometry.getAttribute('position');
    for (let i = (SEG + 1) * (RAD + 1); i < p.count; i++) {
      expect(Math.hypot(p.getX(i) - 0, p.getY(i) - 2, p.getZ(i) - 0)).toBeLessThan(0.05);
    }
  });

  it('ends the trail at the post tie when on the first line', () => {
    const post = buildRopePost(world);
    expect(post.children.length).toBe(1);
    const v = new RopeView();
    const h = attach(world, 0, 2, -1);
    v.update(h, h.ox, h.oy, h.oz, 20, 1 / 60);
    const e = ringCentre(v, SEG + 1 + TRAIL_SEG);
    expect(e[0]).toBeCloseTo(ROPE_TIE.x, 3);
    expect(e[1]).toBeCloseTo(ROPE_TIE.y, 3);
    expect(e[2]).toBeCloseTo(ROPE_TIE.z, 3);
    expect(ROPE_TIE.live).toBe(true);
  });

  it('keeps every ring centre 0.7 m from the camera', () => {
    const v = new RopeView();
    const h = attach(world, 0, 2, 0);
    v.update(h, 0, 2, 0, 20, 1 / 60);
    const c = ringCentre(v, 3);
    v.eye.set(c[0] + 0.3, c[1], c[2]);
    v.update(h, 0, 2, 0, 20, 1 / 60);
    for (let r = 0; r < SEG + 1 + TRAIL_SEG + 1; r++) {
      const q = ringCentre(v, r);
      expect(Math.hypot(q[0] - v.eye.x, q[1] - v.eye.y, q[2] - v.eye.z)).toBeGreaterThanOrEqual(
        0.7 - 1e-4,
      );
    }
  });

  it('has 432 tube triangles', () => {
    const v = new RopeView();
    expect(tubeOf(v).geometry.getIndex()?.count).toBe(432 * 3);
  });
});

describe('rope animation (ADR 0007 section 5)', () => {
  const midY = (v: RopeView): number => ringCentre(v, SEG / 2)[1];
  const run = (pulse: number, t: number): RopeView => {
    const v = new RopeView();
    const h = attach(world, 0, 2, 0);
    v.update(h, 0, 2, 0, 20, 0.5); // settle sag
    for (let i = 0; i < 20; i++) v.update(h, 0, 2, 0, 20, 0.5);
    if (pulse > 0) v.pulse(pulse);
    v.update(h, 0, 2, 0, 20, t);
    return v;
  };

  it('R1: pulse vibrates the middle, decays, keeps the ends fixed', () => {
    const a = run(0.12, 0.03);
    const b = run(0, 0.03);
    expect(Math.abs(midY(a) - midY(b))).toBeGreaterThan(0.01);
    expect(ringCentre(a, 0)[1]).toBeCloseTo(ringCentre(b, 0)[1], 5);
    expect(ringCentre(a, SEG)[1]).toBeCloseTo(ringCentre(b, SEG)[1], 5);
    const c = run(0.12, 1.5);
    const d = run(0, 1.5);
    expect(Math.abs(midY(c) - midY(d))).toBeLessThan(0.001);
  });

  it('R2: wheel rotation is a pure function of hook.s', () => {
    const v = new RopeView();
    const h = attach(world, 0, 2, 0);
    h.s = 3.7;
    v.update(h, 0, 2, 0, 20, 1 / 60);
    expect(v.wheel.rotation.x).toBe(-3.7 / 0.065);
    expect(v.wheel.parent).toBe(v.group.children[2]);
  });

  it('R3: sag eases between flying and taut on the first attached frame', () => {
    const sagOf = (state: number, dt: number, v: RopeView): number => {
      const h = attach(world, 0, 2, 0);
      h.state = state;
      h.flyT = 0; // flying tip already at the anchor: same chord either state
      v.update(h, 0, 2, 0, 20, dt);
      return midY(v);
    };
    const v = new RopeView();
    const flying = sagOf(HOOK_FLYING, 1 / 60, v);
    const first = sagOf(HOOK_ATTACHED, 1 / 60, v);
    const taut = sagOf(HOOK_ATTACHED, 10, v);
    expect(first).toBeGreaterThan(Math.min(flying, taut) + 1e-6);
    expect(first).toBeLessThan(Math.max(flying, taut) - 1e-6);
  });
});

describe('rope post', () => {
  const mesh = (w: World): Mesh => buildRopePost(w).children[0] as Mesh;

  it('is deterministic and within the triangle budget', () => {
    const a = mesh(world).geometry.getAttribute('position').array as Float32Array;
    const b = mesh(world).geometry.getAttribute('position').array as Float32Array;
    expect(Array.from(a)).toEqual(Array.from(b));
    expect((mesh(world).geometry.getIndex()?.count ?? 0) / 3).toBeLessThanOrEqual(1000);
  });

  it('R4/R5: shaft foot at T - 6, brackets reach the roof, tris and rings in budget', () => {
    const m = mesh(world);
    const roof = world.solids.find(
      (s, i) => world.style[i] === 2 && s.max.x >= world.spawn.x && s.min.x <= world.spawn.x,
    )!;
    const T = roof.max.y;
    const px = ROPE_TIE.x - 0.2;
    const pz = ROPE_TIE.z;
    const p = m.geometry.getAttribute('position');
    let shaftLow = Infinity;
    let low = Infinity;
    const bracketY = [T - 3.6, T - 5.6];
    const reach = [false, false];
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      if (p.getX(i) <= roof.min.x + 1e-6 && p.getX(i) > roof.min.x - 1.3 && y < T - 5)
        if (
          p.getX(i) <= roof.min.x + 1e-6 &&
          p.getX(i) > roof.min.x - 1.3 &&
          Math.abs(p.getZ(i) - pz) < 0.31 &&
          y < T - 5
        )
          low = Math.min(low, y);
      if (Math.abs(p.getX(i) - px) < 0.18 && Math.abs(p.getZ(i) - pz) < 0.18) {
        if (Math.abs(y - (T - 6)) < 0.01) shaftLow = y;
      }
      for (let k = 0; k < 2; k++) {
        if (Math.abs(p.getX(i) - roof.min.x) < 0.02 && Math.abs(y - bracketY[k]) < 0.1)
          reach[k] = true;
      }
    }
    expect(shaftLow).toBeCloseTo(T - 6, 2);
    expect(low).toBeCloseTo(T - 6.4, 2); // corbel underside
    expect(reach).toEqual([true, true]);
    const tris = (m.geometry.getIndex()?.count ?? 0) / 3;
    expect(tris).toBeLessThanOrEqual(1000);
    expect(tris).toBeGreaterThanOrEqual(40 * 8 * 2);
  });

  it('keeps 0.5 m clear of every collider except the last 1.5 m of the span', () => {
    const m = mesh(world);
    const spawnRoof = world.solids.findIndex(
      (s, i) =>
        world.style[i] === 2 &&
        world.spawn.x >= s.min.x &&
        world.spawn.x <= s.max.x &&
        world.spawn.z >= s.min.z &&
        world.spawn.z <= s.max.z,
    );
    const roof = world.solids[spawnRoof];
    const T = roof.max.y;
    const px = ROPE_TIE.x - 0.2;
    const pz = ROPE_TIE.z;
    const colliders = [...world.solids, ...world.ramps.map((r) => r.aabb)];
    const worst = (p: [number, number, number], r: number): number =>
      Math.min(...colliders.map((c) => distPointAabb(p, c))) - r;
    const pts: { p: [number, number, number]; r: number }[] = [];
    for (let y = roof.min.y; y <= T + 2.4 + 0.3; y += 0.25)
      pts.push({ p: [px, y, pz], r: y > T + 2.4 ? 0.24 : 0.2 });
    const a = world.anchors[world.route[0]];
    const L = Math.hypot(a.px - ROPE_TIE.x, a.py - ROPE_TIE.y, a.pz - ROPE_TIE.z);
    for (let s = 0; s <= L - 1.5; s += 0.25) {
      const t = s / L;
      pts.push({
        p: [
          ROPE_TIE.x + (a.px - ROPE_TIE.x) * t,
          ROPE_TIE.y + (a.py - ROPE_TIE.y) * t - 4 * L * 0.012 * t * (1 - t),
          ROPE_TIE.z + (a.pz - ROPE_TIE.z) * t,
        ],
        r: 0.06,
      });
    }
    expect(m.name).toBe('ropePost');
    for (const q of pts) expect([q, worst(q.p, q.r) >= 0.5 - 1e-6]).toEqual([q, true]);
  });
});
