// Trail ride (owner 2026-11-27): the baked terrain, grade speed, falls, respawn and lives.
import { describe, expect, it } from 'vitest';
import {
  FORD_DEPTH,
  gridFor,
  groundY,
  riverZ,
  trailX,
  waterDepth,
  type TrailField,
  type TrailSpec,
} from '../../src/spikes/trail';
import { buildTrailField } from '../../src/spikes/trailGen';
import { DT, HORSE_SPIKE, createRide, neutralInput, stepRide, trailSpecFor } from '../../src/spikes';
import type { SpikeInput } from '../../src/spikes';

const inp = (o: Partial<SpikeInput>): SpikeInput => ({ ...neutralInput(), ...o });
const horseSpec = trailSpecFor(HORSE_SPIKE.ride) as TrailSpec;

describe('trail terrain', () => {
  const f = buildTrailField(horseSpec);

  it('is fixed per spike: the same spec gives the same heights', () => {
    const fresh = buildTrailField({ ...horseSpec, waves: [...horseSpec.waves] });
    expect(fresh.h).toBe(f.h); // cached by value
    expect(f.h.length).toBe((f.nx + 1) * (f.nz + 1));
    expect(Number.isFinite(f.waterY)).toBe(true);
  });

  it('keeps the trail grade under the cap and the band flat across', () => {
    let worst = 0;
    for (let z = 0; z < horseSpec.distance; z += 4) {
      const a = groundY(f, trailX(horseSpec, z), z);
      const b = groundY(f, trailX(horseSpec, z + 4), z + 4);
      worst = Math.max(worst, Math.abs(b - a) / 4);
      const cx = trailX(horseSpec, z);
      const across = Math.abs(groundY(f, cx + horseSpec.band * 0.6, z) - groundY(f, cx - horseSpec.band * 0.6, z));
      expect(across).toBeLessThan(0.6);
    }
    expect(worst).toBeLessThan(horseSpec.maxGrade + 0.03);
  });

  it('has a shallow ford on the trail and a flat camp', () => {
    const z = horseSpec.ford.z;
    const d = waterDepth(f, trailX(horseSpec, z), riverZ(horseSpec, trailX(horseSpec, z)));
    expect(d).toBeGreaterThan(FORD_DEPTH * 0.6);
    expect(d).toBeLessThan(FORD_DEPTH * 1.6);
    expect(waterDepth(f, 0, 100)).toBe(0);
    const c = groundY(f, 0, horseSpec.campZ);
    for (const [dx, dz] of [[20, 0], [-20, 0], [0, 20], [0, -20]])
      expect(Math.abs(groundY(f, dx, horseSpec.campZ + dz) - c)).toBeLessThan(0.3);
  });
});

/** A hand-made field: straight trail at x = 0, height from `h(x, z)`, the river far away unless given. */
function field(h: (x: number, z: number) => number, fordZ = 5000, waterY = -100): TrailField {
  const spec: TrailSpec = {
    ...horseSpec,
    waves: [],
    ford: { ...horseSpec.ford, z: fordZ },
  };
  const g = gridFor(spec);
  const arr = new Float32Array((g.nx + 1) * (g.nz + 1));
  for (let j = 0; j <= g.nz; j++)
    for (let i = 0; i <= g.nx; i++) arr[j * (g.nx + 1) + i] = h(g.x0 + i * g.dx, g.z0 + j * g.dz);
  return { spec, ...g, h: arr, waterY };
}

function rideOn(f: TrailField) {
  const s = createRide(HORSE_SPIKE.ride, 1, f);
  s.obstacles = [];
  s.enemies = [];
  s.spawnTimer = 1e9;
  return s;
}

describe('trail ride', () => {
  it('uphill slows the mount, downhill speeds it up', () => {
    const top = (grade: number): number => {
      const s = rideOn(field((_x, z) => grade * z));
      for (let i = 0; i < 300; i++) stepRide(s, inp({ throttle: 1 }), DT);
      return s.speed;
    };
    expect(top(0.12)).toBeLessThan(top(0) - 1);
    expect(top(-0.12)).toBeGreaterThan(top(0));
  });

  it('rides on the ground: y follows the terrain', () => {
    const s = rideOn(field((_x, z) => 0.1 * z));
    for (let i = 0; i < 120; i++) stepRide(s, inp({ throttle: 1 }), DT);
    expect(s.y).toBeCloseTo(0.1 * s.z, 0);
  });

  it('hitting the ford fast is a fall; crossing slowly is not', () => {
    // flat ground at 0, a channel at z 60 with its bed 0.45 m under the water
    const ford = (): TrailField =>
      field((x, z) => (Math.abs(z - (60 + 6 * Math.sin(x * 0.05))) < 7 ? -FORD_DEPTH : 0), 60, 0);
    const fast = rideOn(ford());
    for (let i = 0; i < 400 && fast.falls === 0; i++) stepRide(fast, inp({ throttle: 1 }), DT);
    expect(fast.falls).toBe(1);
    expect(fast.fallCause).toBe('ford');
    expect(fast.lives).toBe(HORSE_SPIKE.ride.lives - 1);

    const slow = rideOn(ford());
    for (let i = 0; i < 1500 && slow.z < 75; i++)
      stepRide(slow, inp({ throttle: slow.speed > 4 ? -1 : 0.4 }), DT);
    expect(slow.falls).toBe(0);
    expect(slow.z).toBeGreaterThan(70);
  });

  it('riding across a steep side slope throws the rider', () => {
    const s = rideOn(field((x) => 0.8 * x));
    for (let i = 0; i < 300 && s.falls === 0; i++) stepRide(s, inp({ throttle: 1 }), DT);
    expect(s.fallCause).toBe('slope');
  });

  it('a fall respawns the rider back on the trail; the last life ends the ride', () => {
    const s = rideOn(field((x) => 0.8 * x));
    let fallZ = 0;
    let respawns = 0;
    for (let i = 0; i < 60 * 60 && !s.dead; i++) {
      const before = s.falls;
      const down = s.fallT > 0;
      stepRide(s, inp({ throttle: 1 }), DT);
      if (s.falls > before) fallZ = s.z;
      if (down && s.fallT === 0) {
        respawns++;
        expect(s.z).toBeLessThan(fallZ);
        expect(Math.abs(s.x)).toBeLessThan(0.01);
      }
    }
    expect(respawns).toBe(HORSE_SPIKE.ride.lives - 1);
    expect(s.dead).toBe(true);
    expect(s.falls).toBe(HORSE_SPIKE.ride.lives);
    expect(s.lives).toBe(0);
  });
});
