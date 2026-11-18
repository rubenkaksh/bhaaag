import { describe, expect, it } from 'vitest';
import { padHeightBelow } from '../../src/adapters/ui/waypointMath';

type Solid = {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
};

function box(
  minX: number,
  minY: number,
  minZ: number,
  maxX: number,
  maxY: number,
  maxZ: number,
): Solid {
  return { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } };
}

describe('padHeightBelow', () => {
  const rows: Array<[string, Solid[], number, number, number, number]> = [
    // Solid directly below: its top.
    ['directly below', [box(0, 0, 0, 10, 4, 10)], 5, 20, 5, 4],
    // Two stacked solids: the higher one still at or below y.
    ['stacked', [box(0, 0, 0, 10, 4, 10), box(0, 4, 0, 10, 9, 10)], 5, 20, 5, 9],
    // Solid above y: ignored (returns y).
    ['above y', [box(0, 0, 0, 10, 30, 10)], 5, 20, 5, 20],
    // Solid off to the side: ignored (returns y).
    ['off to the side', [box(20, 0, 20, 30, 4, 30)], 5, 20, 5, 20],
    // Nothing below: returns y.
    ['nothing below', [], 5, 20, 5, 20],
  ];
  for (const [name, solids, x, y, z, expected] of rows) {
    it(name, () => {
      expect(padHeightBelow(solids, x, y, z)).toBe(expected);
    });
  }
});
