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
const terraces = lvl.solids.slice(FIRST);
const overlapXZ = (b: Box, x: number, z: number) =>
  x >= b.min[0] && x <= b.max[0] && z >= b.min[2] && z <= b.max[2];
const terraceTopAt = (x: number, z: number): number[] =>
  terraces.filter((t) => overlapXZ(t, x, z)).map((t) => t.max[1]);

describe('hill terraces (ADR 0005 D2)', () => {
  it('are appended after all existing solids; indices stable', () => {
    expect(lvl.solids.length).toBe(FIRST + 9);
    expect(lvl.style.slice(FIRST).every((s) => s === 0)).toBe(true);
    // generator output is the same as the committed file
    expect(JSON.stringify(lvl)).toBe(JSON.stringify(base));
    // the pre-terrace prefix is the original layout
    expect(lvl.style.slice(0, FIRST)).toEqual([0, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 3]);
    expect(lvl.anchors.length).toBe(10);
    expect(lvl.pads.length).toBe(7);
    expect(lvl.route).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('every stand or hang point over a terrace is at least 12 m above it', () => {
    const pts: number[][] = [];
    for (let i = 1; i < FIRST; i++) {
      const b = lvl.solids[i];
      if (lvl.style[i] === 2) {
        for (const x of [b.min[0], b.max[0], (b.min[0] + b.max[0]) / 2])
          for (const z of [b.min[2], b.max[2], (b.min[2] + b.max[2]) / 2]) pts.push([x, b.max[1], z]);
      }
    }
    // hanging: feet about 2 m below the anchor
    for (const a of lvl.anchors) pts.push([a.pos[0], a.pos[1] - 2, a.pos[2]]);
    let checked = 0;
    for (const [x, y, z] of pts) {
      for (const top of terraceTopAt(x, z)) {
        expect(y - top).toBeGreaterThanOrEqual(12);
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
