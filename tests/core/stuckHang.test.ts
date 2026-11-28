// Bug A (T352): a hero hanging on a roof edge must leave HERO_HANGING once CLIMB is held (mantle)
// or be released. Probes approach every solid and ramp face in hay-run and nagarkot-home from
// outside, at several ledge heights, and check the hang resolves.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_AIRBORNE, HERO_HANGING, HeroState } from '../../src/core/hero';
import { BTN_CLIMB, BTN_JUMP, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { AABB } from '../../src/core/math/aabb';
import type { World } from '../../src/core/world';
import { loadWorldFromObject } from '../../src/content/load';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { buildNagarkotHome } from '../../src/content/strategy/home';

const cfg = DEFAULT_TUNING;

function worlds(): Array<{ id: string; w: World }> {
  return [
    { id: 'nagarkot-home', w: loadWorldFromObject(buildNagarkotHome().level) },
    { id: 'hay-run', w: loadWorldFromObject(placeGraph(loadGraph('hay-run')).level) },
  ];
}

// Airborne hero at feetY beside face of b, moving into it; then hold CLIMB for `holdTicks`.
function hangAt(
  w: World,
  b: AABB,
  face: string,
  feetY: number,
  holdTicks: number,
): HeroState | null {
  const r = cfg.hero.radius;
  const cx = (b.min.x + b.max.x) / 2;
  const cz = (b.min.z + b.max.z) / 2;
  const s = new HeroState();
  const f = new InputFrame();
  s.mode = HERO_AIRBORNE;
  s.grounded = 0;
  s.vy = 0;
  if (face === '+x') {
    s.px = b.max.x + r + 0.02;
    s.pz = cz;
    s.vx = -2;
  } else if (face === '-x') {
    s.px = b.min.x - r - 0.02;
    s.pz = cz;
    s.vx = 2;
  } else if (face === '+z') {
    s.pz = b.max.z + r + 0.02;
    s.px = cx;
    s.vz = -2;
  } else {
    s.pz = b.min.z - r - 0.02;
    s.px = cx;
    s.vz = 2;
  }
  s.py = feetY;
  for (let i = 0; i < 120 && s.mode !== HERO_HANGING && s.dead === 0; i++) step(s, f, w, cfg);
  if (s.mode !== HERO_HANGING || s.hasLedge !== 1) return null;
  f.buttons = BTN_CLIMB;
  for (let i = 0; i < holdTicks; i++) step(s, f, w, cfg);
  return s;
}

const FACES = ['+x', '-x', '+z', '-z'];
const DTOPS = [0.6, 1.0, 1.4, 1.8, 2.2];

describe('stuck hang (T352)', () => {
  it('a real hay-run edge hang leaves HERO_HANGING after holding CLIMB for 3 s', () => {
    const w = worlds().find((x) => x.id === 'hay-run')!.w;
    let found: { solid: number; face: string; dTop: number } | null = null;
    let result: HeroState | null = null;
    for (let i = 0; i < w.solids.length && result === null; i++) {
      const b = w.solids[i];
      if (b.max.y - b.min.y < 1.5) continue;
      for (const face of FACES) {
        for (const dTop of DTOPS) {
          const s = hangAt(w, b, face, b.max.y - dTop, 180);
          if (s !== null) {
            found = { solid: i, face, dTop };
            result = s;
            break;
          }
        }
        if (result !== null) break;
      }
    }
    expect(found).not.toBeNull();
    expect(
      result?.mode,
      `hay-run solid ${found?.solid} ${found?.face} dTop ${found?.dTop}`,
    ).not.toBe(HERO_HANGING);
  });

  it('no hang on any solid or ramp face in either level stays hung after 3 s of CLIMB', () => {
    const stuck: string[] = [];
    for (const { id, w } of worlds()) {
      const boxes: Array<{ kind: string; i: number; b: AABB }> = [];
      w.solids.forEach((b, i) => boxes.push({ kind: 'solid', i, b }));
      w.ramps.forEach((r, i) => boxes.push({ kind: 'ramp', i, b: r.aabb }));
      for (const { kind, i, b } of boxes) {
        if (b.max.y - b.min.y < 1.5) continue;
        for (const face of FACES) {
          for (const dTop of DTOPS) {
            const s = hangAt(w, b, face, b.max.y - dTop, 180);
            if (s !== null && s.mode === HERO_HANGING)
              stuck.push(`${id} ${kind} ${i} ${face} dTop=${dTop} top=${b.max.y.toFixed(2)}`);
          }
        }
      }
    }
    expect(stuck).toEqual([]);
  });

  it('a wall jump from a hang pushes off the wall instead of re-hanging on it', () => {
    // Before the fix the jump went along the hanging yaw (into the wall) and the hero grabbed the
    // same ledge again: a short tap on CLIMB looked like "nothing happens" (owner, 2026-11-25).
    const rehung: string[] = [];
    let tried = 0;
    for (const { id, w } of worlds()) {
      for (let i = 0; i < w.solids.length; i++) {
        const b = w.solids[i];
        if (b.max.y - b.min.y < 1.5) continue;
        for (const face of FACES) {
          // Skip faces flush against another solid (back-to-back houses): the probe would start inside it.
          const r = cfg.hero.radius + 0.02;
          const ox =
            face === '+x' ? b.max.x + r : face === '-x' ? b.min.x - r : (b.min.x + b.max.x) / 2;
          const oz =
            face === '+z' ? b.max.z + r : face === '-z' ? b.min.z - r : (b.min.z + b.max.z) / 2;
          const oy = b.max.y - 1.4;
          const inside = (o: AABB): boolean =>
            ox > o.min.x - cfg.hero.radius &&
            ox < o.max.x + cfg.hero.radius &&
            oz > o.min.z - cfg.hero.radius &&
            oz < o.max.z + cfg.hero.radius &&
            oy + cfg.hero.height > o.min.y &&
            oy < o.max.y;
          const blocked =
            w.solids.some((o, j) => j !== i && inside(o)) || w.ramps.some((rp) => inside(rp.aabb));
          if (blocked) continue;
          const s = hangAt(w, b, face, oy, 0);
          if (s === null) continue;
          tried++;
          const nx = s.hangNx;
          const nz = s.hangNz;
          const d0 = s.px * nx + s.pz * nz;
          const f = new InputFrame();
          f.pressed = BTN_JUMP;
          f.buttons = BTN_JUMP;
          step(s, f, w, cfg);
          const idle = new InputFrame();
          let hungAgain = false;
          let landed = false;
          for (let k = 0; k < 40 && s.dead === 0; k++) {
            step(s, idle, w, cfg);
            if (s.mode === HERO_HANGING) hungAgain = true;
            if (s.grounded === 1) landed = true;
          }
          // Escaped = never hung again, and either moved off the wall or landed (a house buried
          // in the hillside: the jump lands on the slope beside it).
          const moved = s.px * nx + s.pz * nz - d0;
          if (hungAgain || (moved < 0.5 && !landed))
            rehung.push(`${id} solid ${i} ${face} moved=${moved.toFixed(2)}`);
        }
      }
    }
    expect(tried).toBeGreaterThan(20);
    expect(rehung).toEqual([]);
  });
});
