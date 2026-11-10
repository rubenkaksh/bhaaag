// Pitched decoy roof in l1 (ADR 0002): landable but slippery. Hooking the pitched decoy (left of
// the lane, beside the first house of row 2) lands the hero on the tiles; left alone it slides off
// and ends dead or on the open hillside (no plots any more: a fallen hero restarts).
import { describe, expect, it } from 'vitest';
import levelText from '../../content/levels/l1.json?raw';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_ATTACHED, HERO_EV_LANDED, HeroState } from '../../src/core/hero';
import { AXIS_MAX, BTN_HOOK, InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { World } from '../../src/core/world';
// @ts-expect-error plain JS tool, no types
import { hillY } from '../../tools/genLevel.mjs';

const cfg = DEFAULT_TUNING;
const DEG = Math.PI / 180;

function aimAt(s: HeroState, w: World, id: number): void {
  const a = w.anchors[id];
  const dx = a.px - s.px;
  const dy = a.py - (s.py + cfg.hero.height * 0.9);
  const dz = a.pz - s.pz;
  s.camYaw = Math.atan2(dx, dz);
  s.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
}

describe('pitched decoy roof in l1', () => {
  const w = loadWorldFromJson(levelText);
  const DECOY_BODY = 17; // solids: kill slab, 8 x (roof, wall), then the two decoy bodies
  const PITCHED_ANCHOR = 3; // anchors 0-2 are the route, 3 is the pitched decoy, 4 the flat one

  it('exactly one decoy wears a slippery gable that sits on the decoy wall, anchor as its finial', () => {
    expect(w.roofs.length).toBe(1);
    const r = w.roofs[0].aabb;
    const decoy = w.solids[DECOY_BODY];
    expect(r.min.x).toBe(decoy.min.x);
    expect(r.max.x).toBe(decoy.max.x);
    expect(r.min.z).toBe(decoy.min.z);
    expect(r.max.z).toBe(decoy.max.z);
    expect(r.min.y).toBe(decoy.max.y); // eave on the wall top
    const ramp = w.ramps[w.roofs[0].rampA];
    const pitch = Math.atan(ramp.rise / (ramp.aabb.max.x - ramp.aabb.min.x)) / DEG;
    expect(pitch).toBeGreaterThan(cfg.roof.slipDeg);
    const a = w.anchors[PITCHED_ANCHOR];
    expect(a.px).toBe((r.min.x + r.max.x) / 2); // on the ridge line
    expect(a.py - r.max.y).toBeGreaterThan(0);
    expect(a.py - r.max.y).toBeLessThan(0.5);
  });

  it('the other decoy is a flat danger house: no tile roof, no ramp over it', () => {
    const flat = w.solids[DECOY_BODY + 1];
    const a = w.anchors[PITCHED_ANCHOR + 1];
    expect(a.px).toBeGreaterThan(flat.min.x);
    expect(a.px).toBeLessThan(flat.max.x);
    for (const roof of w.roofs) expect(roof.aabb.min.x).not.toBe(flat.min.x);
  });

  it('hooking the pitched decoy lands on the tiles, which shed the hero', () => {
    const id = PITCHED_ANCHOR;
    const from = w.solids[1 + 2 * 1]; // last roof of row 1, the launch point toward row 2
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

    const roof = w.roofs[0].aabb;
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
      if (leftTiles && (s.grounded === 1 || s.dead !== 0)) break;
    }
    expect(rode, 'rode the rope').toBe(true);
    expect(onTiles, 'landed on the pitched roof').toBe(true);
    expect(leftTiles, 'slid off the roof').toBe(true);
    if (s.dead === 0) {
      // Survived: standing on the open hillside, on the ramp plane.
      expect(s.grounded).toBe(1);
      expect(s.py).toBeCloseTo(hillY(s.pz), 3);
    }
  });
});
