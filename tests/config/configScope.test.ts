import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GAME_MODES } from '../../src/app/modes/mode';
import { MODE_OVERRIDES, mergeTuning, resolveCfg } from '../../src/app/tuning';
import { tickYawOffsets } from '../../src/adapters/render/cameraYaw';

type Tree = Record<string, unknown>;

/** Paths (dotted) where a and b differ, recursively; the path stops at the first differing leaf. */
function diffPaths(a: unknown, b: unknown, path = ''): string[] {
  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const out: string[] = [];
    for (const k of keys)
      out.push(...diffPaths((a as Tree)[k], (b as Tree)[k], path ? path + '.' + k : k));
    return out;
  }
  return Object.is(a, b) ? [] : [path];
}

/** Dotted leaf paths a MODE_OVERRIDES entry touches. */
function overridePaths(o: object): Set<string> {
  const out = new Set<string>();
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'object' && v !== null) for (const k2 of Object.keys(v)) out.add(k + '.' + k2);
    else out.add(k);
  }
  return out;
}

describe('config scope (global keys stay global)', () => {
  const global = mergeTuning();

  it('the diff helper can fail: it sees a changed leaf', () => {
    const tweaked = structuredClone(global);
    tweaked.camera.sideYawDeg += 1;
    expect(diffPaths(global, tweaked)).toEqual(['camera.sideYawDeg']);
  });

  for (const mode of GAME_MODES) {
    it(mode + ': resolved cfg deep-equals the global except documented MODE_OVERRIDES', () => {
      const cur = resolveCfg(mode);
      const allowed = overridePaths(MODE_OVERRIDES[mode]);
      const undocumented = diffPaths(global, cur).filter((p) => !allowed.has(p));
      expect(undocumented).toEqual([]);
      // Every documented override really applies (no dead entries).
      for (const p of allowed) {
        const [k, k2] = p.split('.');
        const want = (MODE_OVERRIDES[mode] as unknown as Record<string, Tree>)[k][k2];
        expect((cur as unknown as Record<string, Tree>)[k][k2]).toBe(want);
      }
    });
    it(mode + ': keeps the global camera and air-steer values', () => {
      const c = resolveCfg(mode);
      const ov = overridePaths(MODE_OVERRIDES[mode]);
      if (!ov.has('camera.sideYawDeg')) expect(c.camera.sideYawDeg).toBe(global.camera.sideYawDeg);
      if (!ov.has('camera.zipYawDeg')) expect(c.camera.zipYawDeg).toBe(global.camera.zipYawDeg);
      if (!ov.has('camera.tiltDeg')) expect(c.camera.tiltDeg).toBe(global.camera.tiltDeg);
      if (!ov.has('hero.airSteer')) expect(c.hero.airSteer).toBe(global.hero.airSteer);
      expect(c.camera.tiltDeg).toBeGreaterThan(0);
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
