// The graph's cushion model: a nagarkot-home cushion is a small pad, not the whole roof, so a landing
// only counts when it is on the pad (or soft anyway). Regression: edge 4 -> 7 of seed 20261142 was
// accepted although the real landing was 2.7 m past the lip and the pad is 14-19 m in (hard landing).
import { describe, expect, it } from 'vitest';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import {
  NODE_ROAD,
  jumpOk,
  onPad,
  padSpan,
  type MazeNode,
  type Rel,
} from '../../src/content/strategy/graph';

function node(over: Partial<MazeNode>): MazeNode {
  return {
    id: 0,
    kind: 0,
    house: 0,
    x0: 8,
    x1: 16,
    z0: -38,
    z1: -30,
    y: 0,
    cushion: false,
    tramps: [],
    zipTo: -1,
    zipX: 10,
    up: -1,
    balc: -1,
    ...over,
  };
}

describe('graph cushion pad model', () => {
  const a = node({ id: 0, y: 11.9 });
  const rel: Rel = { gap: 7, downhill: true, lateral: false };

  it('rejects a deep terrace whose small pad is out of flight reach (the old 4 -> 7)', () => {
    const b = node({
      id: 1,
      z0: -77,
      z1: -45,
      y: 0,
      cushion: true,
      pad: { x0: 9.5, x1: 14.5, z0: -63.5, z1: -58.5 },
    });
    expect(jumpOk(a, b, rel)).toBe(false);
    // The same node with a whole-surface cushion (frozen levels) is still accepted.
    expect(jumpOk(a, { ...b, pad: undefined }, rel)).toBe(true);
  });

  it('accepts a pad inside the landing reach and refuses one past it', () => {
    // roof 8 m deep (z -45..-37), pad 1.5..6.5 m past the near lip: a 4 m landing is on it
    const near = node({
      id: 1,
      z0: -45,
      z1: -37,
      y: 0,
      cushion: true,
      pad: { x0: 9.5, x1: 14.5, z0: -43, z1: -38.5 },
    });
    const span = padSpan(a, near, rel);
    expect(span).not.toBeNull();
    expect(onPad(span!, 4)).toBe(true);
    expect(onPad(span!, 0.5)).toBe(false);
  });

  it('every cushion jump/tramp edge of the shipped level lands on its pad or softly', () => {
    const lv = buildNagarkotHome();
    const pads = lv.nodes.filter((n) => n.cushion && n.pad !== undefined && n.kind !== NODE_ROAD);
    expect(pads.length).toBeGreaterThan(0);
    for (const n of pads) {
      const p = n.pad!;
      // the pad stays on the roof it belongs to
      expect(p.x0).toBeGreaterThanOrEqual(n.x0);
      expect(p.x1).toBeLessThanOrEqual(n.x1);
      expect(p.z0).toBeGreaterThanOrEqual(n.z0);
      expect(p.z1).toBeLessThanOrEqual(n.z1);
    }
  });
});
