import { describe, expect, it } from 'vitest';
import {
  formatDistance,
  newWaypointScreen,
  projectWaypoint,
  waypointTopPx,
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

describe('waypoint shiftY and waypointTopPx', () => {
  it('shiftY moves the projected y by that many pixels', () => {
    const a = projectWaypoint(newWaypointScreen(), 0, 0, -10, T, 0.1, W, H, 60, 28, 0);
    const b = projectWaypoint(newWaypointScreen(), 0, 0, -10, T, 0.1, W, H, 60, 28, 70);
    expect(b.y - a.y).toBeCloseTo(70);
    expect(b.edge).toBe(false);
  });
  it('a large shift pushes the marker to the bottom edge clamp', () => {
    const s = projectWaypoint(newWaypointScreen(), 0, 0, -10, T, 0.1, W, H, 60, 28, 400);
    expect(s.edge).toBe(true);
    expect(s.y).toBeLessThanOrEqual(H - 28 + 1e-9);
  });
  it('landscape top reproduces the original formula', () => {
    expect(waypointTopPx(844, 390, false)).toBeCloseTo(Math.max(10, 390 * 0.028) + Math.max(32, 390 * 0.054) + 8);
  });
  it('portrait top clears the pill and the two HUD rows', () => {
    const t = waypointTopPx(390, 844, true);
    expect(t).toBeGreaterThan(80);
    expect(t).toBeLessThan(844 * 0.2);
  });
});
