import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  PARK_Y,
  anchorBase,
  buildChaseWorld,
  padBase,
  slotOf,
  solidBase,
} from '../../src/core/chase/chaseWorld';
import { FIXED_ROWS, SLOT_SOLIDS, STYLE_HIDDEN } from '../../src/core/chase/rows';

type L1 = {
  solids: { min: number[]; max: number[] }[];
  style: number[];
  anchors: { pos: number[] }[];
  pads: { min: number[]; max: number[] }[];
  roofs: { min: number[]; max: number[]; ridge: number }[];
};
const l1 = JSON.parse(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
) as L1;

const key = (st: number, a: ArrayLike<number>): string =>
  `${st}|` + Array.from(a, (v) => (Math.round(v * 1000) / 1000 + 0).toFixed(3)).join(',');

describe('chase rows vs l1.json', () => {
  it('rows 0-3 of any seed equal the L1 houses: boxes, styles, pads, anchors, decoy roof', () => {
    for (const seed of [1, 424242]) {
      const cw = buildChaseWorld(seed, DEFAULT_TUNING);
      const w = cw.world;
      const got: string[] = [];
      const pads: string[] = [];
      const anchors: string[] = [];
      for (let r = 0; r < FIXED_ROWS; r++) {
        const s = slotOf(cw, r);
        for (let i = 0; i < SLOT_SOLIDS; i++) {
          const b = w.solids[solidBase(s) + i];
          const st = w.style[solidBase(s) + i];
          if (b.min.y <= PARK_Y + 1 || st === STYLE_HIDDEN) continue;
          got.push(key(st, [b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z]));
        }
        for (let i = 0; i < 3; i++) {
          const b = w.pads[padBase(s) + i];
          if (b.min.y > PARK_Y + 1)
            pads.push(key(0, [b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z]));
        }
        for (let i = 0; i < 2; i++) {
          const a = w.anchors[anchorBase(s) + i];
          if (a.py > PARK_Y + 1) anchors.push(key(0, [a.px, a.py, a.pz]));
        }
      }
      const want: string[] = [];
      for (let i = 0; i < l1.solids.length; i++) {
        const st = l1.style[i];
        if (st === STYLE_HIDDEN || st === 0) continue; // barrier walls and the kill slab are not rows
        want.push(key(st, [...l1.solids[i].min, ...l1.solids[i].max]));
      }
      expect(got.sort()).toEqual(want.sort());
      expect(pads.sort()).toEqual(l1.pads.map((p) => key(0, [...p.min, ...p.max])).sort());
      expect(anchors.sort()).toEqual(l1.anchors.map((a) => key(0, a.pos)).sort());
      // the pitched decoy roof of row 1
      const roof = w.roofs[slotOf(cw, 1)].aabb;
      expect(key(0, [roof.min.x, roof.min.y, roof.min.z, roof.max.x, roof.max.y, roof.max.z])).toBe(
        key(0, [...l1.roofs[0].min, ...l1.roofs[0].max]),
      );
    }
  });
});
