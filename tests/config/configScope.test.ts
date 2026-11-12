import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { GAME_MODES } from '../../src/app/modes/mode';
import { MODE_OVERRIDES, resolveCfg } from '../../src/app/tuning';
import { tickYawOffsets } from '../../src/adapters/render/cameraYaw';

const flat = (o: object): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'object' && v !== null) {
      for (const [k2, v2] of Object.entries(v)) out[k + '.' + k2] = v2 as number;
    } else out[k] = v as number;
  }
  return out;
};

describe('config scope (global keys stay global)', () => {
  const classic = flat(resolveCfg('classic'));
  for (const mode of GAME_MODES) {
    it(mode + ': resolved cfg equals classic except documented overrides', () => {
      const cur = flat(resolveCfg(mode));
      const allowed = new Set(Object.keys(flat(MODE_OVERRIDES[mode])));
      const diff = Object.keys(classic).filter((k) => cur[k] !== classic[k] && !allowed.has(k));
      expect(diff).toEqual([]);
      expect(Object.keys(cur)).toEqual(Object.keys(classic));
    });
    it(mode + ': keeps the global side-yaw and air-steer values', () => {
      const c = resolveCfg(mode);
      expect(c.camera.sideYawDeg).toBe(DEFAULT_TUNING.camera.sideYawDeg);
      expect(c.camera.zipYawDeg).toBe(DEFAULT_TUNING.camera.zipYawDeg);
      expect(c.camera.tiltDeg).toBe(20);
      expect(c.hero.airSteer).toBe(DEFAULT_TUNING.hero.airSteer);
    });
    it(mode + ': side-yaw helper leans the view with lateral travel', () => {
      const cfg = resolveCfg(mode).camera;
      const off = { zip: 0, side: 0 };
      for (let i = 0; i < 200; i++) tickYawOffsets(off, Math.PI, 0, 0, false, false, cfg);
      expect(off.side).toBe(0);
      for (let i = 0; i < 200; i++) tickYawOffsets(off, 0, 5, 0, false, false, cfg);
      expect(off.side).toBeGreaterThan(0.2);
    });
  }

  it('the single camera tick calls the yaw helper before any per-mode branch', () => {
    const src = readFileSync('src/app/game.ts', 'utf8');
    const a = src.indexOf('function tickCamera()');
    const body = src.slice(a, src.indexOf('const hudUi = new Hud', a));
    expect(body).not.toMatch(/\breturn\b/);
    expect(body.match(/updateCamera\(/g)?.length).toBe(1);
    expect(body.indexOf('tickYawOffsets(')).toBeGreaterThan(-1);
    expect(body.indexOf('tickYawOffsets(')).toBeLessThan(body.indexOf('updateCamera('));
  });
});
