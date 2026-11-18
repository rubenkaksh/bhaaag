import { describe, expect, it } from 'vitest';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import { buildHomePathGraph } from '../../src/app/homeAssets';
import { PATH_CAM_CFG, PathCam, leadHeading, wrapAngle } from '../../src/content/graph/pathCamera';
import type { PathCamCfg, PathGraph } from '../../src/content/graph/pathCamera';

const DEG = Math.PI / 180;
const cfg: PathCamCfg = { ...PATH_CAM_CFG, lookahead: 40, nodeReach: 40 };

// L route in sim yaw: down -z (heading 180) to a corner node at z=-60, then +x (heading 90).
function lRoute(): PathGraph {
  return {
    start: 1,
    nodes: [
      { id: 1, x: 0, z: 0, exits: [2], from: -1 },
      { id: 2, x: 0, z: -30, exits: [3], from: 1 },
      { id: 3, x: 0, z: -60, exits: [4], from: 2 },
      { id: 4, x: 30, z: -60, exits: [5], from: 3 },
      { id: 5, x: 60, z: -60, exits: [], from: 4 },
    ],
  };
}

describe('leadHeading', () => {
  it('is off at lookahead 0', () => {
    expect(leadHeading(lRoute(), 0, -10, PATH_CAM_CFG)).toBeNull();
  });
  it('faces straight down well before the corner', () => {
    expect(leadHeading(lRoute(), 0, -5, cfg)).toBeCloseTo(Math.PI, 5);
  });
  it('turns toward +x before the corner, monotonically, with no flips', () => {
    const lead = (z: number): number => leadHeading(lRoute(), 0, z, cfg, z > -30 ? 1 : 2) as number;
    let prev = lead(-10);
    for (let z = -10.2; z >= -60; z -= 0.2) {
      const h = lead(z);
      expect(h).toBeLessThanOrEqual(prev + 1e-9);
      expect(Math.abs(wrapAngle(h - prev))).toBeLessThan(3 * DEG);
      prev = h;
    }
    // 20 m before the corner it already leans well off straight down
    expect(leadHeading(lRoute(), 0, -40, cfg) as number).toBeLessThan(150 * DEG);
  });
  it('at and after the corner it faces +x', () => {
    expect(leadHeading(lRoute(), 0, -60, cfg)).toBeCloseTo(90 * DEG, 5);
    expect(leadHeading(lRoute(), 20, -60, cfg)).toBeCloseTo(90 * DEG, 5);
  });
  it('is null when the route ends under the hero or no node is near', () => {
    expect(leadHeading(lRoute(), 60, -60, cfg)).toBeNull();
    expect(leadHeading(lRoute(), 500, 500, { ...cfg, nodeReach: 14 })).toBeNull();
  });
});

describe('PathCam with lookahead', () => {
  it('walks the L: heading turns at no more than turnRate, shortest way, ends facing +x', () => {
    const cam = new PathCam(lRoute(), cfg);
    cam.reset(0, 0, Math.PI);
    expect(cam.heading).toBeCloseTo(Math.PI, 5);
    let prev = cam.heading;
    let x = 0;
    let z = 0;
    for (let i = 0; i < 60 * 12; i++) {
      if (z > -60) z = Math.max(-60, z - 11 / 60);
      else x = Math.min(60, x + 11 / 60);
      const h = cam.update(1 / 60, x, z);
      expect(Math.abs(wrapAngle(h - prev))).toBeLessThanOrEqual(cfg.turnRate / 60 + 1e-9);
      prev = h;
    }
    expect(prev).toBeCloseTo(90 * DEG, 2);
  });
  it('shortest-angle blend across the +-PI seam', () => {
    // route heading 170 -> -170 degrees (a 20 degree turn through PI, not 340)
    const a = 170 * DEG;
    const b = -170 * DEG;
    const pg: PathGraph = {
      start: 1,
      nodes: [
        { id: 1, x: 0, z: 0, exits: [2], from: -1 },
        { id: 2, x: Math.sin(a) * 30, z: Math.cos(a) * 30, exits: [3], from: 1 },
        {
          id: 3,
          x: Math.sin(a) * 30 + Math.sin(b) * 30,
          z: Math.cos(a) * 30 + Math.cos(b) * 30,
          exits: [],
          from: 2,
        },
      ],
    };
    const cam = new PathCam(pg, { ...cfg, lookahead: 20 });
    cam.reset(0, 0, a);
    const p2 = pg.nodes[1];
    const h = cam.update(1 / 60, p2.x, p2.z);
    expect(Math.abs(wrapAngle(h - a))).toBeLessThan(2 * DEG);
  });
  it('manual look-drag still pauses it until the next landing', () => {
    const cam = new PathCam(lRoute(), cfg);
    cam.reset(0, 0, Math.PI);
    const h0 = cam.update(1 / 60, 0, -40, true);
    expect(cam.update(1 / 60, 0, -50)).toBe(h0);
    cam.landed(0, -50);
    expect(cam.paused).toBe(false);
  });
});

describe('nagarkot-home corner', () => {
  it('the view leans toward the L road before the hero lands on it', () => {
    const s = buildNagarkotHome();
    const pg = buildHomePathGraph(s);
    const road = pg.nodes.find(
      (n) => n.hx === 32 && n.exits.some((id) => (pg.nodes[id]?.x ?? 0) > 40),
    );
    expect(road).toBeDefined();
    const r = road as NonNullable<typeof road>;
    // On the house row just before the road, with the road 12-13 m below.
    const before = leadHeading(pg, 0, r.z + 13, cfg) as number;
    const onRoad = leadHeading(pg, 20, r.z, cfg) as number;
    expect(Math.abs(wrapAngle(before - Math.PI))).toBeGreaterThan(20 * DEG); // already off straight-down
    expect(Math.abs(wrapAngle(onRoad - 90 * DEG))).toBeLessThan(25 * DEG); // facing the new descent (+x)
    // far up the street it still faces down the hill
    expect(Math.abs(wrapAngle((leadHeading(pg, 0, -34, cfg) as number) - Math.PI))).toBeLessThan(
      12 * DEG,
    );
  });
});
