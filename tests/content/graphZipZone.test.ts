// Regression: hooking from anywhere in a zipline's launch zone must ride off the roof, not cling
// to the front parapet (owner report 2026-11-13, diagonal ziplines).
import { describe, expect, it } from 'vitest';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_ATTACHED, HeroState } from '../../src/core/hero';
import { BTN_HOOK, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';

describe('valley-1 zip zones', () => {
  it('every start in every zone ends the ride standing, not clinging', () => {
    const p = placeGraph(loadGraph('valley-1'));
    const w = loadWorldFromObject(p.level);
    const bad: string[] = [];
    (p.level.lines ?? []).forEach((ln, li) => {
      const a = p.level.anchors[ln.anchor].pos;
      const z = ln.zone;
      for (let fx = 0; fx <= 4; fx++) {
        for (let fz = 0; fz <= 4; fz++) {
          const s = new HeroState();
          s.px = z.min[0] + ((z.max[0] - z.min[0]) * fx) / 4;
          s.pz = z.min[2] + ((z.max[2] - z.min[2]) * fz) / 4;
          s.py = z.min[1];
          s.grounded = 1;
          s.camYaw = Math.atan2(a[0] - s.px, a[2] - s.pz);
          s.yaw = s.camYaw;
          let hooked = false;
          for (let i = 0; i < 900; i++) {
            const f = new InputFrame();
            if (i === 5) {
              f.pressed |= BTN_HOOK;
              f.buttons |= BTN_HOOK;
            }
            step(s, f, w, DEFAULT_TUNING);
            if (s.mode === HERO_ATTACHED) hooked = true;
          }
          if (!hooked || s.dead !== 0 || s.grounded !== 1) bad.push(`L${li} (${fx},${fz}) mode${s.mode}`);
        }
      }
    });
    expect(bad).toEqual([]);
  });
});
