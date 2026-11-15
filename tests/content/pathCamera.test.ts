import { describe, expect, it } from 'vitest';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import {
  PATH_CAM_CFG,
  PathCam,
  approachHeading,
  bearing,
  buildPathGraph,
  exitHeadings,
  forkHold,
  forkNodes,
  meanAngle,
  wrapAngle,
} from '../../src/content/graph/pathCamera';
import type { PathGraph } from '../../src/content/graph/pathCamera';
import { parseGraph } from '../../src/content/graph/format';

const DEG = Math.PI / 180;

// Hand model: 1 -> 2 (straight on, -z), 2 forks to 3 (left-ish) and 4 (right-ish); 5 is a U-turn off 3.
function model(): PathGraph {
  return {
    start: 1,
    nodes: [
      { id: 1, x: 0, z: 0, exits: [2], from: -1 },
      { id: 2, x: 0, z: -20, exits: [3, 4], from: 1 },
      { id: 3, x: -10, z: -30, exits: [5], from: 2 },
      { id: 4, x: 10, z: -30, exits: [], from: 2 },
      { id: 5, x: -10, z: -10, exits: [], from: 3 },
    ],
  };
}

describe('pathCamera', () => {
  it('turns at 60 deg/s, not faster', () => {
    const cam = new PathCam(model());
    cam.reset(0, 0, Math.PI); // facing -z, leg 1->2 heading is PI
    cam.target = Math.PI - 90 * DEG;
    for (let i = 0; i < 60; i++) cam.update(1 / 60, 0, 0);
    expect(Math.abs(wrapAngle(cam.heading - Math.PI))).toBeGreaterThan(55 * DEG);
    expect(Math.abs(wrapAngle(cam.heading - Math.PI))).toBeLessThan(60.01 * DEG);
  });

  it('snaps instantly on a U-turn (> 135 deg)', () => {
    const cam = new PathCam(model());
    cam.reset(0, 0, Math.PI);
    cam.landed(-10, -30); // node 3 -> exit 5 runs back up +z, 90-ish deg... compute real change
    const before = cam.heading;
    cam.update(1 / 60, -10, -30);
    const change = Math.abs(wrapAngle(cam.target - before));
    if (change > PATH_CAM_CFG.snapAngle) expect(cam.heading).toBe(cam.target);
    // Force a clear U-turn.
    cam.heading = 0;
    cam.target = 170 * DEG;
    cam.update(1 / 60, -10, -30);
    expect(cam.heading).toBeCloseTo(170 * DEG, 9);
  });

  it('re-aims on landing only', () => {
    const cam = new PathCam(model());
    cam.reset(0, 0, 0);
    const t = cam.target;
    cam.update(1 / 60, -9, -29); // moved next to node 3 in the air, no landing
    expect(cam.target).toBe(t);
    cam.landed(-9, -29);
    expect(cam.node).toBe(3);
  });

  it('fork: holds the approach heading, commits past commitOn, hysteresis on commitOff', () => {
    const pg = model();
    const cam = new PathCam(pg);
    cam.reset(0, 0, 0);
    cam.landed(0, -20);
    expect(cam.fork).toBe(2);
    const hold = cam.target;
    expect(hold).toBeCloseTo(Math.PI, 9); // arrived travelling -z
    cam.update(1 / 60, 3, -20 - 1); // 3.2 m from node... lateral toward node 4
    expect(cam.committed).toBe(4);
    const t4 = cam.target;
    expect(t4).toBeCloseTo(bearing(0, -20, 10, -30), 9);
    cam.update(1 / 60, 0.5, -20 - 1.6); // between off (1.5) and on (2.5): stays committed
    expect(cam.committed).toBe(4);
    cam.update(1 / 60, 0.2, -20.5); // inside commitOff: uncommit, hold again
    expect(cam.committed).toBe(-1);
    expect(cam.target).toBeCloseTo(hold, 9);
  });

  it('player look pauses auto-aim until the next landing', () => {
    const cam = new PathCam(model());
    cam.reset(0, 0, 0);
    cam.heading = 1;
    cam.update(1 / 60, 0, 0, true);
    expect(cam.heading).toBe(1);
    cam.update(1 / 60, 0, 0, false);
    expect(cam.heading).toBe(1);
    cam.landed(0, 0);
    cam.update(1 / 60, 0, 0);
    expect(cam.heading).not.toBe(1);
  });

  it('fork midpoint fallback when an exit is beyond 75 deg', () => {
    const pg: PathGraph = {
      start: 1,
      nodes: [
        { id: 1, x: 0, z: 0, exits: [2], from: -1 },
        { id: 2, x: 0, z: -10, exits: [3, 4], from: 1 },
        { id: 3, x: -9.85, z: -8.26, exits: [], from: 2 }, // 100 deg off the approach
        { id: 4, x: -8.66, z: -5, exits: [], from: 2 }, // 120 deg off the approach
      ],
    };
    const n = pg.nodes[1];
    const ex = exitHeadings(pg, n);
    expect(forkHold(pg, n)).toBeCloseTo(meanAngle(ex), 9);
    for (const h of ex)
      expect(Math.abs(wrapAngle(h - forkHold(pg, n)))).toBeLessThanOrEqual(75 * DEG);
  });

  it('node heading override beats the route tangent', () => {
    const pg = model();
    pg.nodes[0].heading = 30 * DEG;
    const cam = new PathCam(pg);
    cam.reset(0, 0, 0);
    expect(cam.heading).toBeCloseTo(30 * DEG, 9);
  });

  it('graph file accepts an optional heading and rejects junk', () => {
    const g = loadGraph('home-street');
    const withH = JSON.parse(JSON.stringify(g));
    withH.nodes[0].heading = 90;
    expect(parseGraph(withH).nodes[0].heading).toBe(90);
    withH.nodes[0].heading = 'x';
    expect(() => parseGraph(withH)).toThrow();
  });

  it('home-street: every fork exit is within +-75 deg of the held heading', () => {
    const g = loadGraph('home-street');
    const pg = buildPathGraph(g, placeGraph(g).houses);
    const forks = forkNodes(pg);
    expect(forks.length).toBeGreaterThan(0);
    for (const n of forks) {
      const hold = forkHold(pg, n);
      for (const h of exitHeadings(pg, n)) {
        expect(Math.abs(wrapAngle(h - hold))).toBeLessThanOrEqual(75 * DEG + 1e-9);
      }
    }
    // Info: raw approach vs exits (the midpoint fallback is used only when this exceeds 75 deg).
    for (const n of forks) {
      const a = approachHeading(pg, n);
      const worst = Math.max(...exitHeadings(pg, n).map((h) => Math.abs(wrapAngle(h - a))));
      console.log('fork node', n.id, 'worst exit vs approach (deg)', Math.round(worst / DEG));
    }
  });
});
