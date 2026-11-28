// Thin air (owner 2026-11-20): the footprint support let the hero stand with its centre up to a
// radius past a roof edge, drawn over the drop. At rest it is now pulled back onto the roof.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import { HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { AABB } from '../../src/core/math/aabb';
import type { World } from '../../src/core/world';
import { loadWorldFromObject } from '../../src/content/load';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { buildNagarkotHome } from '../../src/content/strategy/home';

// Roof tops with open air 2 m beyond their +x edge (nothing within a hero height below the top).
function openEdges(w: World): AABB[] {
  const out: AABB[] = [];
  for (let i = 0; i < w.solids.length; i++) {
    const b = w.solids[i];
    if (b.max.x - b.min.x < 2 || b.max.z - b.min.z < 2 || b.max.y - b.min.y < 1.5) continue;
    const zc = (b.min.z + b.max.z) / 2;
    const near = [...w.solids, ...w.ramps.map((r) => r.aabb)].some(
      (o) =>
        o !== b &&
        o.max.x > b.max.x - 0.01 &&
        o.min.x < b.max.x + 2 &&
        o.max.z > zc - 1.5 &&
        o.min.z < zc + 1.5 &&
        o.max.y > b.max.y - cfg.hero.height,
    );
    if (!near) out.push(b);
  }
  return out;
}

function standAt(w: World, b: AABB, past: number): HeroState {
  const s = new HeroState();
  s.mode = HERO_GROUNDED;
  s.grounded = 1;
  s.px = b.max.x + past; // >0: centre past the edge
  s.pz = (b.min.z + b.max.z) / 2;
  s.py = b.max.y;
  const f = new InputFrame();
  for (let i = 0; i < 60 && s.dead === 0; i++) step(s, f, w, cfg);
  return s;
}

const worlds = (): Array<[string, World]> => [
  ['nagarkot-home', loadWorldFromObject(buildNagarkotHome().level)],
  ['hay-run', loadWorldFromObject(placeGraph(loadGraph('hay-run')).level)],
];

describe('edge slip (thin air)', () => {
  it('a hero at rest with its centre past a roof edge is pulled back onto the roof within 1 s', () => {
    const floating: string[] = [];
    let n = 0;
    for (const [id, w] of worlds())
      for (const b of openEdges(w)) {
        n++;
        const s = standAt(w, b, 0.25);
        if (
          s.dead !== 0 ||
          s.grounded !== 1 ||
          Math.abs(s.py - b.max.y) > 0.01 ||
          s.px > b.max.x + 0.1
        )
          floating.push(`${id} top ${b.max.y.toFixed(2)} x ${b.max.x.toFixed(2)}`);
      }
    expect(n).toBeGreaterThanOrEqual(5);
    expect(floating).toEqual([]);
  });

  it('a hero standing just inside the edge stays on the roof', () => {
    const moved: string[] = [];
    for (const [id, w] of worlds())
      for (const b of openEdges(w)) {
        const s = standAt(w, b, -0.05);
        if (
          s.grounded !== 1 ||
          Math.abs(s.py - b.max.y) > 0.01 ||
          Math.abs(s.px - (b.max.x - 0.05)) > 0.01
        )
          moved.push(`${id} top ${b.max.y.toFixed(2)} x ${s.px.toFixed(2)} y ${s.py.toFixed(2)}`);
      }
    expect(moved).toEqual([]);
  });
});
