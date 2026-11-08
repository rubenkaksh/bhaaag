import { describe, expect, it } from 'vitest';
import levelText from '../../content/levels/l1.json?raw';
// @ts-expect-error plain JS tool, no types
import { generateLevel } from '../../tools/genLevel.mjs';

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

const lvl = JSON.parse(levelText) as Level;
const base = generateLevel() as Level;
const FIRST = 2 + 2 * 7 + 3; // ground, spawn roof, 7*(roof, body), 3 decoys
const terraces = lvl.solids.slice(FIRST, FIRST + 9);
const overlapXZ = (b: Box, x: number, z: number) =>
  x >= b.min[0] && x <= b.max[0] && z >= b.min[2] && z <= b.max[2];
const terraceTopAt = (x: number, z: number): number[] =>
  terraces.filter((t) => overlapXZ(t, x, z)).map((t) => t.max[1]);

describe('hill terraces (ADR 0005 D2)', () => {
  it('are appended after all existing solids; indices stable', () => {
    // terraces, then 7 balcony ledges, then 7 x 5 roof parapets and tank plinths (style 4)
    expect(lvl.solids.length).toBe(FIRST + 9 + 7 + 35);
    expect(lvl.style.slice(FIRST, FIRST + 9).every((s) => s === 0)).toBe(true);
    expect(lvl.style.slice(FIRST + 9, FIRST + 16).every((s) => s === 1)).toBe(true);
    expect(lvl.style.slice(FIRST + 16).every((s) => s === 4)).toBe(true);
    // generator output is the same as the committed file
    expect(JSON.stringify(lvl)).toBe(JSON.stringify(base));
    // the pre-terrace prefix is the original layout
    expect(lvl.style.slice(0, FIRST)).toEqual([
      0, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3,
    ]);
    expect(lvl.anchors.length).toBe(10);
    expect(lvl.pads.length).toBe(7);
    expect(lvl.route).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('every stand or hang point over a terrace is at least 11.5 m above it', () => {
    const pts: number[][] = [];
    for (let i = 1; i < FIRST; i++) {
      const b = lvl.solids[i];
      if (lvl.style[i] === 2) {
        for (const x of [b.min[0], b.max[0], (b.min[0] + b.max[0]) / 2])
          for (const z of [b.min[2], b.max[2], (b.min[2] + b.max[2]) / 2])
            pts.push([x, b.max[1], z]);
      }
    }
    // hanging: feet about 2 m below the anchor
    for (const a of lvl.anchors) pts.push([a.pos[0], a.pos[1] - 2, a.pos[2]]);
    let checked = 0;
    for (const [x, y, z] of pts) {
      for (const top of terraceTopAt(x, z)) {
        expect(y - top).toBeGreaterThanOrEqual(11.5);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(20);
  });

  it('does not touch the route, anchors or goal', () => {
    for (let i = 1; i < FIRST; i++) {
      if (lvl.style[i] === 3) continue; // decoy walls pass through the hill by design
      const b = lvl.solids[i];
      for (const t of terraces) {
        const hit = [0, 1, 2].every((k) => b.min[k] < t.max[k] && b.max[k] > t.min[k]);
        expect(hit, `solid ${i}`).toBe(false);
      }
    }
    for (const a of lvl.anchors)
      for (const t of terraces) {
        const inside = [0, 1, 2].every((k) => a.pos[k] > t.min[k] && a.pos[k] < t.max[k]);
        expect(inside).toBe(false);
      }
    for (const t of terraces) {
      const hit = [0, 1, 2].every((k) => lvl.goal.min[k] < t.max[k] && lvl.goal.max[k] > t.min[k]);
      expect(hit).toBe(false);
    }
  });
});

describe('roof parapets and plinths (style 4)', () => {
  const props = lvl.solids.filter((_, i) => lvl.style[i] === 4);

  it('never exceed a jump-up: curbs <= 0.4 m, plinths <= 1.0 m', () => {
    expect(props.length).toBe(35);
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
