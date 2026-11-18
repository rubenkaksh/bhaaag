// nagarkot-home: rope.legHazardKill (owner order 2026-11-18) and rigid road-slab ground.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import type { Tuning } from '../../src/core/config';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  DEAD_HAZARD,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_GROUNDED,
  HeroState,
} from '../../src/core/hero';
import { BTN_HOOK, InputFrame } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';
import { World, addSolid } from '../../src/core/world';

const IDLE = new InputFrame();
const fire = new InputFrame();
fire.buttons = BTN_HOOK;
fire.pressed = BTN_HOOK;

const world = loadWorldFromObject(buildNagarkotHome().level);
const base = DEFAULT_TUNING; // equals tuning.json (tests/config/tuning.test.ts); classic has no mode overrides
const withFlag = (v: number): Tuning => ({ ...base, rope: { ...base.rope, legHazardKill: v } });

// Stand on fixed line i, fire, ride with no input until the rope is left or the hero dies.
function ride(cfg: Tuning, i: number): { dead: number; cause: number; onRope: boolean } {
  const z = world.lines[i].zone;
  const s = new HeroState();
  s.px = (z.min.x + z.max.x) / 2;
  s.pz = (z.min.z + z.max.z) / 2;
  s.py = z.max.y;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  step(s, fire, world, cfg);
  let attached = false;
  let onRope = false;
  for (let t = 0; t < 1200 && s.dead === 0; t++) {
    const was = s.mode;
    step(s, IDLE, world, cfg);
    if (s.mode === HERO_ATTACHED) attached = true;
    if ((s.dead as number) === 1 && was === HERO_ATTACHED) onRope = true;
    if (attached && s.mode !== HERO_ATTACHED) break;
  }
  return { dead: s.dead, cause: s.deadCause, onRope };
}

describe('rope.legHazardKill', () => {
  it('ships switched off (tuning.json and DEFAULT_TUNING agree)', () => {
    expect(base.rope.legHazardKill).toBe(0);
    expect(DEFAULT_TUNING.rope.legHazardKill).toBe(0);
  });

  it('flag on: some nagarkot-home lines kill the hero by hazard while on the rope', () => {
    const killed = world.lines.map((_, i) => ride(withFlag(1), i)).filter((r) => r.onRope);
    expect(killed.length).toBeGreaterThan(0);
    for (const r of killed) expect(r.cause).toBe(DEAD_HAZARD);
  });

  it('flag off: no line kills the hero while on the rope', () => {
    for (let i = 0; i < world.lines.length; i++) {
      const r = ride(withFlag(0), i);
      expect(r.onRope, 'line ' + i).toBe(false);
    }
  });

  it('flag off: a hero NOT on the rope still dies in a hazard', () => {
    const w = new World();
    addSolid(w, new AABB(new Vec3(-5, -1, -5), new Vec3(5, 0, 5)));
    w.hazards.push(new AABB(new Vec3(10, -6, -5), new Vec3(20, 0, 5)));
    w.killPlaneY = -50;
    const s = new HeroState();
    s.px = 15;
    s.py = 3;
    s.pz = 0;
    s.mode = HERO_AIRBORNE;
    for (let t = 0; t < 120 && s.dead === 0; t++) step(s, IDLE, w, withFlag(0));
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(DEAD_HAZARD);
  });
});

describe('nagarkot-home road slabs are rigid', () => {
  const slabs: number[] = [];
  world.style.forEach((st, i) => {
    if (st === 0) slabs.push(i);
  });

  it('has road slabs', () => expect(slabs.length).toBeGreaterThan(0));

  it('landing never sinks below the top and always grounds', () => {
    for (const i of slabs) {
      const b = world.solids[i];
      for (const fx of [0.25, 0.5, 0.75])
        for (const fz of [0.25, 0.5, 0.75])
          for (const h of [0.1, 1, 2.5])
            for (const [vx, vz] of [[0, 0], [2, 0], [0, -3]]) {
              const s = new HeroState();
              s.px = b.min.x + (b.max.x - b.min.x) * fx;
              s.pz = b.min.z + (b.max.z - b.min.z) * fz;
              s.py = b.max.y + h;
              s.vx = vx;
              s.vz = vz;
              s.mode = HERO_AIRBORNE;
              let minY = Infinity;
              for (let t = 0; t < 90 && s.dead === 0; t++) {
                step(s, IDLE, world, base);
                if (s.grounded === 1) minY = Math.min(minY, s.py);
              }
              const tag = `slab ${i} fx${fx} fz${fz} h${h} v${vx},${vz}`;
              expect(s.dead, tag).toBe(0);
              expect(s.grounded, tag).toBe(1);
              expect(minY, tag).toBeGreaterThanOrEqual(b.max.y - 0.01);
              expect(s.py, tag).toBeCloseTo(b.max.y, 1);
            }
    }
  });
});
