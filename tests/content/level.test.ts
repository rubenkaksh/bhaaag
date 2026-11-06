import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_ATTACHED, HeroState } from '../../src/core/hero';
import { AXIS_MAX, BTN_HOOK, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { World } from '../../src/core/world';
import { loadWorldFromJson } from '../../src/content/load';
// @ts-expect-error plain JS tool, no types
import { generateLevel } from '../../tools/genLevel.mjs';

const cfg = DEFAULT_TUNING;
const FILE = new URL('../../content/levels/l1.json', import.meta.url);
const text = readFileSync(FILE, 'utf8');

function frame(buttons: number, pressed: number): InputFrame {
  const f = new InputFrame();
  f.buttons = buttons;
  f.pressed = pressed;
  return f;
}
const IDLE = new InputFrame();

function aimAt(s: HeroState, w: World, id: number): void {
  const a = w.anchors[id];
  const dx = a.px - s.px;
  const dy = a.py - (s.py + cfg.hero.height * 0.9);
  const dz = a.pz - s.pz;
  s.camYaw = Math.atan2(dx, dz);
  s.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
}

describe('level l1', () => {
  it('loads with the expected shape', () => {
    const w = loadWorldFromJson(text);
    expect(w.anchors.length).toBe(10);
    expect(w.route.length).toBe(7);
    expect(w.pads.length).toBe(7);
    expect(w.style.length).toBe(w.solids.length);
    const s0 = w.solids[1];
    expect(w.spawn.y).toBe(s0.max.y);
    expect(w.spawn.x).toBeGreaterThan(s0.min.x);
    expect(w.spawn.x).toBeLessThan(s0.max.x);
    expect(w.spawn.z).toBeGreaterThan(s0.min.z);
    expect(w.spawn.z).toBeLessThan(s0.max.z);
  });

  it('generator is deterministic and matches the file on disk', () => {
    expect(generateLevel()).toEqual(generateLevel());
    expect(generateLevel()).toEqual(JSON.parse(text));
  });

  it('a scripted bot hooks all 7 hops and reaches roof 7 alive', () => {
    const w = loadWorldFromJson(text);
    const s = new HeroState();
    s.px = w.spawn.x;
    s.py = w.spawn.y;
    s.pz = w.spawn.z;
    s.grounded = 1;
    s.mode = 0;
    for (let hop = 0; hop < w.route.length; hop++) {
      const id = w.route[hop];
      for (let i = 0; i < 20; i++) step(s, IDLE, w, cfg); // settle
      // Sprint to within 0.8 m of the far edge of the current roof, then aim and fire.
      const here = hop === 0 ? w.solids[1] : w.solids[2 + 2 * (hop - 1)];
      aimAt(s, w, id);
      const run = new InputFrame();
      run.moveY = AXIS_MAX;
      for (let i = 0; i < 400 && s.pz > here.min.z + 0.8; i++) {
        aimAt(s, w, id);
        step(s, run, w, cfg);
      }
      for (let i = 0; i < 20; i++) step(s, IDLE, w, cfg);
      aimAt(s, w, id);
      step(s, frame(0, BTN_HOOK), w, cfg);
      expect(s.hook.anchorId, 'hop ' + (hop + 1) + ' hooked').toBe(id);
      let ticks = 0;
      let rode = false;
      while (s.dead === 0 && ticks < 1500) {
        step(s, IDLE, w, cfg);
        ticks++;
        rode = rode || s.mode === HERO_ATTACHED;
        if (rode && s.mode !== HERO_ATTACHED && s.grounded === 1) break;
      }
      expect(rode, 'hop ' + (hop + 1) + ' rode the rope').toBe(true);
      expect(s.dead, 'hop ' + (hop + 1) + ' survived (cause ' + s.deadCause + ')').toBe(0);
      const a = w.anchors[id];
      const roof = w.solids[2 + 2 * hop];
      const info = `hop ${hop + 1} mode ${s.mode} pos ${s.px.toFixed(1)},${s.py.toFixed(1)},${s.pz.toFixed(1)} ticks ${ticks}`;
      expect(s.grounded, info).toBe(1);
      expect(s.py).toBeCloseTo(roof.max.y, 3);
      expect(Math.abs(s.pz - a.pz)).toBeLessThan(6);
      expect(s.pz).toBeLessThan(roof.max.z);
      expect(s.pz).toBeGreaterThan(roof.min.z);
    }
  });
});
