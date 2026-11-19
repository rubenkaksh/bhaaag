import { describe, expect, it } from 'vitest';
import { BACKDROP_SPECS } from '../../src/adapters/render/backdrop';

// The snow band of plate_*.webp sits between these image rows (fraction from the top; see the plate image).
const SNOW_TOP_ROW = 0.4;
const SNOW_BOTTOM_ROW = 0.52;
const LANDSCAPE_HALF_FOV_DEG = 30; // vertical fov 60 at 844x390

/** Elevation above the eye horizon (degrees) of an image row on the plate cylinder. */
function elevationDeg(row: number): number {
  const p = BACKDROP_SPECS.plate;
  const centreAboveEye = (0.5 - p.eyeRow) * p.height; // buildLayer: mesh centre offset
  const y = centreAboveEye + p.height / 2 - row * p.height;
  return (Math.atan2(y, p.radius) * 180) / Math.PI;
}

describe('plate snow range in landscape', () => {
  for (const pitch of [-12, -20]) {
    it(`snow top stays inside the frame for an eye pitched ${pitch} deg`, () => {
      const frameTop = pitch + LANDSCAPE_HALF_FOV_DEG;
      expect(elevationDeg(SNOW_TOP_ROW)).toBeLessThan(frameTop - 2);
    });
  }
  it('snow is a band, not a point', () => {
    expect(elevationDeg(SNOW_TOP_ROW)).toBeGreaterThan(elevationDeg(SNOW_BOTTOM_ROW));
  });
});
