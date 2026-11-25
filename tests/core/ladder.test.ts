// Ladder climb zones: the hillside wall climb also runs inside a world.ladders zone.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { archetype } from '../../src/content/house/archetypes';
import { emitHouse, newDraft } from '../../src/content/house/houseKit';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_EV_MANTLE, HERO_GROUNDED, HERO_HANGING, HeroState } from '../../src/core/hero';
import { InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, ladderAt } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const TOP = 5;

function makeWorld(withLadder: boolean): World {
  const w = new World();
  w.killPlaneY = -60;
  w.climb = 1;
  w.parkour = 1;
  w.solids.push(new AABB(new Vec3(-30, -2, -30), new Vec3(30, 0, 30))); // ground slab
  w.solids.push(new AABB(new Vec3(-4, 0, -4), new Vec3(4, TOP, 4))); // 8 x 8 body
  if (withLadder) {
    w.ladders.push(new AABB(new Vec3(-0.45, 0, -4.7), new Vec3(0.45, TOP, -4)));
  }
  return w;
}

function run(w: World, x: number, seconds: number) {
  const s = new HeroState();
  s.px = x;
  s.pz = -4.5;
  s.py = 0;
  s.mode = HERO_GROUNDED;
  s.grounded = 1;
  const f = new InputFrame();
  f.moveY = quantizeAxis(1); // toward +z, into the wall
  let hung = false;
  let mantled = false;
  for (let i = 0; i < Math.round(seconds * 60); i++) {
    step(s, f, w, cfg);
    if (s.mode === HERO_HANGING && s.hillClimb === 1) hung = true;
    if ((s.eventBits & HERO_EV_MANTLE) !== 0) mantled = true;
    if (mantled && s.mode === HERO_GROUNDED) break; // stop on the roof before running off it
  }
  return { s, hung, mantled };
}

describe('ladder climb zones', () => {
  it('ladderAt is inclusive and false outside', () => {
    const w = makeWorld(true);
    expect(ladderAt(w, 0, 0, -4.5)).toBe(true);
    expect(ladderAt(w, 0.45, TOP, -4)).toBe(true);
    expect(ladderAt(w, 3, 0, -4.5)).toBe(false);
  });

  it('holding the stick into the wall at the ladder base climbs onto the roof', () => {
    const { s, hung, mantled } = run(makeWorld(true), 0, 6);
    expect(hung).toBe(true);
    expect(mantled).toBe(true);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBeCloseTo(TOP, 1);
  });

  it('outside the zone the hero never leaves the ground', () => {
    const { s, hung } = run(makeWorld(true), 3, 3);
    expect(hung).toBe(false);
    expect(s.py).toBeCloseTo(0, 2);
  });

  it('a world without a ladder zone has no climb', () => {
    const { s, hung } = run(makeWorld(false), 0, 3);
    expect(hung).toBe(false);
    expect(s.py).toBeCloseTo(0, 2);
  });
});

describe('ladder content', () => {
  it('level JSON ladders load into world.ladders', () => {
    const w = loadWorldFromObject({
      version: 1,
      solids: [{ min: [-5, -1, -5], max: [5, 0, 5] }],
      ramps: [],
      anchors: [],
      spawn: [0, 0.5, 0],
      spawnYaw: 0,
      killPlaneY: -50,
      ladders: [{ min: [0, 0, 0], max: [1, 3, 1] }],
    } as never);
    expect(w.ladders.length).toBe(1);
  });

  it('emitHouse pushes one zone for a house with a ladder and none without', () => {
    const h = archetype('A1', 1, 0, 0, 0);
    const d0 = newDraft();
    emitHouse(h, d0);
    expect(d0.ladders.length).toBe(0);
    const d1 = newDraft();
    emitHouse({ ...h, ladder: 2 }, d1);
    expect(d1.ladders.length).toBe(1);
  });
});
