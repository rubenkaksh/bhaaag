// Hill plots of the packed village (docs/level-layout.md, docs/graphics-spec.md). This replaced
// the ADR 0005 D2 terrace test on 2026-11-08: the old terraces sat 12 m under every roof so any
// fall killed; now houses stand on their own plot with 6-9 m walls, a fall into a house's own plot
// is survivable, and the guarantees become: a fence stops a fallen hero from walking down the
// village, every plot has a stair back up to its roof (never a dead end), and a fall into a plot
// further down the hill is still lethal.
import { describe, expect, it } from 'vitest';
import levelText from '../../content/levels/l1.json?raw';
// @ts-expect-error plain JS tool, no types
import { generateLevel } from '../../tools/genLevel.mjs';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { AXIS_MAX, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';

interface Box {
  min: number[];
  max: number[];
}
interface Level {
  solids: Box[];
  style: number[];
  anchors: { pos: number[] }[];
  pads: Box[];
  route: number[];
  goal: Box;
}

const cfg = DEFAULT_TUNING;
const lvl = JSON.parse(levelText) as Level;
const base = generateLevel() as Level;
const HOUSES = 7;
const FIRST = 2 + 2 * HOUSES + 3; // ground, spawn roof, 7 x (roof, wall), 3 decoys
const PLOTS = FIRST; // 8 plots: one per house incl. S0
const BALCONIES = PLOTS + HOUSES + 1;
const PROPS = BALCONIES + HOUSES; // 7 x 4 parapets and tank plinths (style 4)
const FENCES = PROPS + 4 * HOUSES;
const STAIRS = FENCES + HOUSES;
const plots = lvl.solids.slice(PLOTS, PLOTS + HOUSES + 1);
const roofOf = (i: number): Box => (i === 0 ? lvl.solids[1] : lvl.solids[2 * i]);
const inXZ = (b: Box, x: number, z: number) =>
  x >= b.min[0] && x <= b.max[0] && z >= b.min[2] && z <= b.max[2];
const overlaps = (a: Box, b: Box) =>
  [0, 1, 2].every((k) => a.min[k] < b.max[k] && a.max[k] > b.min[k]);

describe('hill plots of the packed village', () => {
  it('keep the solid order the tests index by; the file matches the generator', () => {
    expect(JSON.stringify(lvl)).toBe(JSON.stringify(base));
    expect(lvl.style.slice(0, FIRST)).toEqual([
      0, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3,
    ]);
    expect(lvl.style.slice(PLOTS, BALCONIES).every((s) => s === 0)).toBe(true);
    expect(lvl.style.slice(BALCONIES, PROPS).every((s) => s === 1)).toBe(true);
    expect(lvl.style.slice(PROPS, FENCES).every((s) => s === 4)).toBe(true);
    expect(lvl.style.slice(FENCES).every((s) => s === 1)).toBe(true);
    expect(lvl.solids.length).toBeGreaterThan(STAIRS + HOUSES);
    expect(lvl.anchors.length).toBe(10);
    expect(lvl.pads.length).toBe(7);
    expect(lvl.route).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('every house wall is 6-9 m (2-3 storeys) and ends on the plot it stands on', () => {
    for (let i = 1; i <= HOUSES; i++) {
      const wall = lvl.solids[2 * i + 1];
      const h = roofOf(i).max[1] - wall.min[1];
      expect(h, `house ${i}`).toBeGreaterThanOrEqual(6);
      expect(h, `house ${i}`).toBeLessThanOrEqual(9);
      const cx = (wall.min[0] + wall.max[0]) / 2;
      const cz = (wall.min[2] + wall.max[2]) / 2;
      const under = plots.filter((p) => inXZ(p, cx, cz)).map((p) => p.max[1]);
      expect(under, `house ${i}`).toContain(wall.min[1]);
    }
  });

  it('a run off a roof that clears its own fence drops at least 11.5 m (lethal)', () => {
    // walking off a roof lands in the house's own plot (survivable, the stair brings the hero back);
    // a fast run clears the fence into the next plot down, and that fall kills
    for (let i = 0; i < HOUSES; i++) {
      const drop = roofOf(i).max[1] - plots[i + 1].max[1];
      expect(drop, `house ${i}`).toBeGreaterThanOrEqual(11.5);
      expect(roofOf(i).max[1] - plots[i].max[1], `house ${i}`).toBeLessThanOrEqual(9);
    }
  });

  it('plots never touch the route, the anchors or the goal', () => {
    for (let i = 1; i < FIRST; i++) {
      if (lvl.style[i] === 3) continue; // decoy walls stand on the plots too
      for (const t of plots) expect(overlaps(lvl.solids[i], t), `solid ${i}`).toBe(false);
    }
    for (const a of lvl.anchors)
      for (const t of plots) {
        const inside = [0, 1, 2].every((k) => a.pos[k] > t.min[k] && a.pos[k] < t.max[k]);
        expect(inside).toBe(false);
      }
    for (const t of plots) expect(overlaps(lvl.goal, t)).toBe(false);
  });

  it('a fence over jump plus edge-grab reach closes every plot on its downhill edge', () => {
    const reach =
      (cfg.hero.jump * cfg.hero.jump) / (2 * cfg.physics.g) + cfg.landing.edgeGrabBelowMax;
    for (let i = 0; i < HOUSES; i++) {
      const f = lvl.solids[FENCES + i];
      const p = plots[i];
      expect(f.min[1], `fence ${i}`).toBe(p.max[1]);
      expect(f.max[1] - f.min[1], `fence ${i}`).toBeGreaterThan(reach);
      expect(f.min[0]).toBeLessThanOrEqual(p.min[0]);
      expect(f.max[0]).toBeGreaterThanOrEqual(p.max[0]);
      expect(f.min[2], `fence ${i}`).toBe(p.min[2]);
      // the plot below is lower by more than a jump: no climbing back up either
      expect(p.max[1] - plots[i + 1].max[1]).toBeGreaterThan(reach);
    }
  });

  // Never a dead end: a hero dropped at the foot of each plot's stair walks up it and onto the roof.
  for (let i = 0; i <= HOUSES; i++) {
    it(`plot ${i}: the stair climbs back onto roof ${i}`, () => {
      const w = loadWorldFromJson(levelText);
      const roof = roofOf(i);
      const p = plots[i];
      const stairs = lvl.solids
        .slice(STAIRS)
        .filter(
          (b) =>
            b.min[1] === p.max[1] && b.min[0] >= roof.min[0] - 3 && b.max[0] <= roof.max[0] + 3,
        );
      expect(stairs.length).toBeGreaterThan(5);
      const first = stairs.reduce((a, b) => (b.min[2] < a.min[2] ? b : a));
      const s = new HeroState();
      s.px = (first.min[0] + first.max[0]) / 2;
      s.py = p.max[1];
      s.pz = first.min[2] - 1;
      s.grounded = 1;
      const rx = (roof.min[0] + roof.max[0]) / 2;
      const rz = roof.max[2] - 0.75;
      let onRoof = false;
      for (let t = 0; t < 60 * 20 && s.dead === 0 && !onRoof; t++) {
        const f = new InputFrame();
        f.moveY = AXIS_MAX;
        // up the flight toward +z, then across the platform onto the roof
        const tx = s.pz < rz - 0.2 ? s.px : rx;
        s.camYaw = Math.atan2(tx - s.px, rz + 0.5 - s.pz);
        if (s.pz >= rz - 0.2) s.camYaw = Math.atan2(rx - s.px, 0.001);
        step(s, f, w, cfg);
        onRoof =
          s.mode === HERO_GROUNDED &&
          Math.abs(s.py - roof.max[1]) < 0.01 &&
          s.px > roof.min[0] + 0.5 &&
          s.px < roof.max[0] - 0.5;
      }
      expect(s.dead, `plot ${i}: died, cause ${s.deadCause}`).toBe(0);
      expect(
        onRoof,
        `plot ${i}: stuck at (${s.px.toFixed(2)}, ${s.py.toFixed(2)}, ${s.pz.toFixed(2)})`,
      ).toBe(true);
    });
  }
});

describe('roof parapets and plinths (style 4)', () => {
  const props = lvl.solids.filter((_, i) => lvl.style[i] === 4);

  it('never exceed a jump-up: curbs <= 0.4 m, plinths <= 1.0 m', () => {
    expect(props.length).toBe(28);
    for (const b of props) {
      const h = b.max[1] - b.min[1];
      expect(h).toBeLessThanOrEqual(1.0);
      expect(h <= 0.4 + 1e-9 || h >= 0.7).toBe(true);
    }
  });

  it('keep every plinth 3 m clear of the arrival chord of its hop', () => {
    // hop i lands on house i from anchor i-1's side; the chord runs prev hero -> this anchor
    const roofs = lvl.solids.map((b, i) => ({ b, i })).filter((r) => lvl.style[r.i] === 2);
    for (let hop = 0; hop < 7; hop++) {
      const a = lvl.anchors[hop].pos;
      const prev = roofs[hop].b; // previous roof (S0 for hop 0)
      const p0 = [(prev.min[0] + prev.max[0]) / 2, (prev.min[2] + prev.max[2]) / 2];
      for (const b of props) {
        if (b.max[1] - b.min[1] < 0.7) continue;
        const cx = (b.min[0] + b.max[0]) / 2;
        const cz = (b.min[2] + b.max[2]) / 2;
        const dx = a[0] - p0[0];
        const dz = a[2] - p0[1];
        const t = Math.max(
          0,
          Math.min(1, ((cx - p0[0]) * dx + (cz - p0[1]) * dz) / (dx * dx + dz * dz)),
        );
        const d = Math.hypot(cx - (p0[0] + t * dx), cz - (p0[1] + t * dz));
        expect(d, `hop ${hop + 1}`).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
