import { describe, expect, it } from 'vitest';
import {
  formatDistance,
  newWaypointScreen,
  projectWaypoint,
} from '../../src/adapters/ui/waypointMath';

const T = Math.tan((60 * Math.PI) / 360);
const W = 1000;
const H = 500;
const P = (vx: number, vy: number, vz: number) =>
  projectWaypoint(newWaypointScreen(), vx, vy, vz, T, 0.1, W, H, 60, 28);

describe('waypoint projection', () => {
  it('centres a target straight ahead', () => {
    const s = P(0, 0, -10);
    expect(s.edge).toBe(false);
    expect(s.x).toBeCloseTo(500);
    expect(s.y).toBeCloseTo(250);
  });
  it('keeps an on-screen target unclamped', () => {
    const s = P(2, 1, -10);
    expect(s.edge).toBe(false);
    expect(s.x).toBeGreaterThan(500);
    expect(s.y).toBeLessThan(250);
  });
  it('clamps an off-screen target to the right edge', () => {
    const s = P(50, 0, -10);
    expect(s.edge).toBe(true);
    expect(s.x).toBeCloseTo(W - 28);
    expect(s.y).toBeCloseTo(250);
    expect(s.angle).toBeCloseTo(0);
  });
  it('never goes above the top inset', () => {
    const s = P(0, 80, -10);
    expect(s.edge).toBe(true);
    expect(s.y).toBeGreaterThanOrEqual(60);
  });
  it('mirrors and clamps a target behind the camera', () => {
    const s = P(3, 0, 5);
    expect(s.edge).toBe(true);
    expect(s.x).toBeLessThan(500); // right-behind points left
    expect(s.x).toBeGreaterThanOrEqual(28);
    const d = P(0, 0, 5);
    expect(d.edge).toBe(true);
    expect(Number.isFinite(d.x + d.y)).toBe(true);
  });
  it('rounds distance to whole metres', () => {
    expect(formatDistance(119.6)).toBe('120 m');
    expect(formatDistance(3.4)).toBe('3 m');
  });
});
