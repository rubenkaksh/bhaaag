// Pitched decoy roofs in l1 (ADR 0002): landable but slippery. Hooking a pitched decoy lands the
// hero on the tiles; left alone it slides off. The outcome is a death or a landing in the house's
// own plot, whose rescue stair (tests/content/terrace.test.ts) leads back: never a dead end.
import { describe, expect, it } from 'vitest';
import levelText from '../../content/levels/l1.json?raw';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_ATTACHED, HERO_EV_LANDED, HeroState } from '../../src/core/hero';
import { AXIS_MAX, BTN_HOOK, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { World } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const DEG = Math.PI / 180;
const WALL_H = 8; // genLevel: roof top to plot

function aimAt(s: HeroState, w: World, id: number): void {
  const a = w.anchors[id];
  const dx = a.px - s.px;
  const dy = a.py - (s.py + cfg.hero.height * 0.9);
  const dz = a.pz - s.pz;
  s.camYaw = Math.atan2(dx, dz);
  s.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
}

describe('pitched decoy roofs in l1', () => {
  const w = loadWorldFromJson(levelText);
  const decoyHouse = [2, 4, 6]; // genLevel DECOY_ROOFS, anchors 7..9

  it('two decoys wear a slippery gable that sits on the decoy wall, anchor as its finial', () => {
    expect(w.roofs.length).toBe(2);
    for (let k = 0; k < w.roofs.length; k++) {
      const r = w.roofs[k].aabb;
      const decoy = w.solids[16 + k];
      expect(r.min.x).toBe(decoy.min.x);
      expect(r.max.x).toBe(decoy.max.x);
      expect(r.min.z).toBe(decoy.min.z);
      expect(r.max.z).toBe(decoy.max.z);
      expect(r.min.y).toBe(decoy.max.y); // eave on the wall top
      const ramp = w.ramps[w.roofs[k].rampA];
      const pitch = Math.atan(ramp.rise / (ramp.aabb.max.x - ramp.aabb.min.x)) / DEG;
      expect(pitch).toBeGreaterThan(cfg.roof.slipDeg);
      const a = w.anchors[7 + k];
      expect(a.px).toBe((r.min.x + r.max.x) / 2); // on the ridge line
      expect(a.py - r.max.y).toBeGreaterThan(0);
      expect(a.py - r.max.y).toBeLessThan(0.5);
    }
  });

  for (let k = 0; k < 2; k++) {
    const house = decoyHouse[k];
    it(`hooking pitched decoy ${k + 1} (house ${house}) lands on the tiles, which shed the hero`, () => {
      const id = 7 + k;
      const from = w.solids[2 * (house - 1)]; // route roof before the decoy's house
      const s = new HeroState();
      s.px = (from.min.x + from.max.x) / 2;
      s.py = from.max.y;
      s.pz = (from.min.z + from.max.z) / 2;
      s.grounded = 1;
      s.mode = 0;
      // run to 0.8 m from the downhill edge, as the route bot does
      const run = new InputFrame();
      run.moveY = AXIS_MAX;
      for (let i = 0; i < 400 && s.pz > from.min.z + 0.8; i++) {
        aimAt(s, w, id);
        step(s, run, w, cfg);
      }
      for (let i = 0; i < 20; i++) step(s, new InputFrame(), w, cfg);
      aimAt(s, w, id);
      const fire = new InputFrame();
      fire.buttons = BTN_HOOK;
      fire.pressed = BTN_HOOK;
      step(s, fire, w, cfg);
      expect(s.hook.anchorId).toBe(id);

      const roof = w.roofs[k].aabb;
      let rode = false;
      let onTiles = false;
      let leftTiles = false;
      for (let t = 0; t < 60 * 10 && s.dead === 0; t++) {
        step(s, new InputFrame(), w, cfg);
        if (s.mode === HERO_ATTACHED) rode = true;
        const over =
          s.px > roof.min.x - 0.4 &&
          s.px < roof.max.x + 0.4 &&
          s.pz > roof.min.z - 0.4 &&
          s.pz < roof.max.z + 0.4;
        if (rode && (s.eventBits & HERO_EV_LANDED) !== 0 && over && s.py >= roof.min.y) {
          onTiles = true;
        }
        if (onTiles && s.py < roof.min.y - 1) leftTiles = true;
        if (leftTiles && s.grounded === 1) break;
      }
      expect(rode, 'rode the rope').toBe(true);
      expect(onTiles, 'landed on the pitched roof').toBe(true);
      expect(leftTiles, 'slid off the roof').toBe(true);
      if (s.dead === 0) {
        // Survived: grounded in the decoy house's own plot or on its downhill fence top. Walking
        // uphill from there ends in the plot, whose rescue stair leads back to the route.
        expect(s.grounded).toBe(1);
        const plotY = roof.min.y + 0.6 - WALL_H;
        expect(s.py).toBeGreaterThanOrEqual(plotY - 1e-9);
        expect(s.py).toBeLessThanOrEqual(plotY + 2.6 + 1e-9);
        s.camYaw = 0; // forward = +z, uphill
        for (let t = 0; t < 60 * 2; t++) step(s, run, w, cfg);
        expect(s.dead).toBe(0);
        expect(s.grounded).toBe(1);
        expect(s.py).toBeCloseTo(plotY, 6);
      }
    });
  }
});
