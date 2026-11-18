// Route visibility + hookability: after each hop the next route anchor must be
// SEEN from the touchdown point: the anchor itself can sit behind the hero's own roof edge,
// so the check is a clear sight line from the orbit camera to its waypoint beam
// and it must become HOOKABLE after a short walk toward it (aimReason returns
// AIM_OK from the walked spot). A hero who lands beside a post cannot hook straight
// away: the chord from the hand clips their own roof. That is a rule of the game,
// not a defect, so the walk is part of the check. The preview shot fired from the
// walked spot must also survive (not PREVIEW_NONE, not PREVIEW_LETHAL).
// The whole chain runs up front; each hop gets its own it() so a failure names it.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState } from '../../src/core/hero';
import { AIM_OK, aimReason } from '../../src/core/hook';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { PREVIEW_LETHAL, PREVIEW_NONE, PreviewResult, previewShot } from '../../src/core/preview';
import { HEAD_FRAC } from '../../src/core/sim';

const WALK_MAX = 8; // metres: furthest walk toward the anchor allowed to unblock the hook
const WALK_STEP = 0.25; // metres per probe along that walk
const BEAM_MAX = 10; // metres above the anchor where the waypoint beam must already show
const BEAM_STEP = 0.25; // metres between probed beam heights
const SIGHT_STEP = 0.25; // metres between samples along a sight line

const cfg = DEFAULT_TUNING;
const text = readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8');
const w = loadWorldFromJson(text);

/** First height above the anchor where the waypoint beam is in clear sight of the eye, or -1. */
function lowestVisibleBeam(
  ex: number,
  ey: number,
  ez: number,
  ax: number,
  ay: number,
  az: number,
): number {
  for (let up = 0; up <= BEAM_MAX; up += BEAM_STEP) {
    const dy = ay + up - ey;
    const len = Math.sqrt((ax - ex) ** 2 + dy ** 2 + (az - ez) ** 2);
    const n = Math.ceil(len / SIGHT_STEP);
    let clear = true;
    for (let k = 1; k < n && clear; k++) {
      const t = k / n;
      const px = ex + (ax - ex) * t;
      const py = ey + dy * t;
      const pz = ez + (az - ez) * t;
      for (let i = 0; i < w.solids.length; i++) {
        if (aabbContainsPoint(w.solids[i], px, py, pz)) {
          clear = false;
          break;
        }
      }
    }
    if (clear) return up;
  }
  return -1;
}

type HopResult = {
  i: number;
  reached: boolean; // false when an earlier hop stopped the chain
  seen: boolean;
  seenCode: number; // lowest beam height (m above the anchor) in clear sight, -1 when none
  walk: number; // metres walked before AIM_OK, -1 when never hookable
  outcome: number;
  x: number; // touchdown (feet) where this hop was evaluated
  y: number;
  z: number;
  px: number; // walked spot the preview fired from
  endX: number;
  endY: number;
  endZ: number;
};

function runChain(): HopResult[] {
  const results: HopResult[] = [];
  let x = w.spawn.x;
  let y = w.spawn.y;
  let z = w.spawn.z;
  const out = new PreviewResult();
  let stopped = false;
  for (let i = 0; i < w.route.length; i++) {
    const id = w.route[i];
    if (stopped) {
      results.push({
        i,
        reached: false,
        seen: false,
        seenCode: -1,
        walk: -1,
        outcome: PREVIEW_NONE,
        x,
        y,
        z,
        px: x,
        endX: x,
        endY: y,
        endZ: z,
      });
      console.log('hop ' + i + ': not reached (chain stopped at an earlier hop)');
      continue;
    }
    const a = w.anchors[id];
    const headY = y + cfg.hero.height * HEAD_FRAC;

    // 1. SEEN: the player looks from the orbit camera, not the head (the head sits below the
    // hand). Eye = cameraRig's arm for a view aimed at the anchor.
    const seenDx = a.px - x;
    const seenDz = a.pz - z;
    const seenH = Math.sqrt(seenDx * seenDx + seenDz * seenDz);
    const rigY = y + cfg.camera.height;
    const pitch = Math.atan2(a.py - rigY, seenH);
    const eyeBack = (Math.cos(pitch) * cfg.camera.dist) / seenH;
    const eyeX = x - seenDx * eyeBack;
    const eyeY = rigY - Math.sin(pitch) * cfg.camera.dist;
    const eyeZ = z - seenDz * eyeBack;
    const beamUp = lowestVisibleBeam(eyeX, eyeY, eyeZ, a.px, a.py, a.pz);
    const seen = beamUp >= 0;
    const seenCode = beamUp;

    // 2. HOOKABLE: walk toward the anchor at fixed feet height. At each probe the
    // hand sits handToFeet above the feet and the camera stays at head height; the
    // first probe returning AIM_OK is the walk. None within WALK_MAX stops the chain.
    const dx = a.px - x;
    const dz = a.pz - z;
    const hLen = Math.sqrt(dx * dx + dz * dz);
    const ux = hLen > 0 ? dx / hLen : 0;
    const uz = hLen > 0 ? dz / hLen : 0;
    let walk = -1;
    let px = x;
    let pz = z;
    for (let d = 0; d <= WALK_MAX; d += WALK_STEP) {
      const wx = x + ux * d;
      const wz = z + uz * d;
      const code = aimReason(
        w,
        cfg,
        wx,
        y + cfg.rope.handToFeet,
        wz,
        wx,
        headY,
        wz,
        a.px - wx,
        a.py - headY,
        a.pz - wz,
        cfg.rope.maxLen,
        cfg.aim.magnetDegDesktop,
      );
      if (code === AIM_OK) {
        walk = d;
        px = wx;
        pz = wz;
        break;
      }
    }
    if (walk < 0) {
      stopped = true;
      results.push({
        i,
        reached: true,
        seen,
        seenCode,
        walk,
        outcome: PREVIEW_NONE,
        x,
        y,
        z,
        px,
        endX: x,
        endY: y,
        endZ: z,
      });
      console.log(
        'hop ' +
          i +
          ': walk ' +
          walk +
          ' m, outcome not run (never hookable within ' +
          WALK_MAX +
          ' m)',
      );
      continue;
    }

    // 3. PREVIEW: fresh grounded hero at rest on the walked spot.
    const hero = new HeroState();
    hero.px = px;
    hero.py = y;
    hero.pz = pz;
    hero.yaw = w.spawnYaw;
    hero.camYaw = w.spawnYaw;
    hero.vx = 0;
    hero.vy = 0;
    hero.vz = 0;
    hero.grounded = 1;
    previewShot(hero, id, w, cfg, out);
    results.push({
      i,
      reached: true,
      seen,
      seenCode,
      walk,
      outcome: out.outcome,
      x,
      y,
      z,
      px,
      endX: out.x,
      endY: out.y,
      endZ: out.z,
    });
    console.log(
      'hop ' + i + ': beam ' + beamUp + ' m, walk ' + walk + ' m, outcome ' + out.outcome,
    );
    x = out.x;
    y = out.y;
    z = out.z;
  }
  return results;
}

const results = runChain();

describe('l1 route visibility and hookability', () => {
  for (let i = 0; i < w.route.length; i++) {
    it('hop ' + i + ': next anchor is seen, hookable after a short walk, preview survives', () => {
      const r = results[i];
      const at =
        'hop ' + i + ' at (' + r.x.toFixed(2) + ', ' + r.y.toFixed(2) + ', ' + r.z.toFixed(2) + ')';
      expect(r.reached, at + ': not reached - the chain stopped at an earlier hop').toBe(true);
      expect(
        r.seen,
        at +
          ': no clear sight line from the camera to the beam within ' +
          BEAM_MAX +
          ' m of the anchor',
      ).toBe(true);
      expect(
        r.walk,
        at +
          ': metres walked toward the anchor before AIM_OK (0..' +
          WALK_MAX +
          '), -1 = never hookable',
      ).toBeGreaterThanOrEqual(0);
      const shot =
        ', walked to (' +
        r.px.toFixed(2) +
        ', ' +
        r.z.toFixed(2) +
        '), shot ended at (' +
        r.endX.toFixed(2) +
        ', ' +
        r.endY.toFixed(2) +
        ', ' +
        r.endZ.toFixed(2) +
        ')';
      expect(
        r.outcome,
        at + ': preview outcome ' + r.outcome + ' (NONE=' + PREVIEW_NONE + ') not allowed' + shot,
      ).not.toBe(PREVIEW_NONE);
      expect(
        r.outcome,
        at +
          ': preview outcome ' +
          r.outcome +
          ' (LETHAL=' +
          PREVIEW_LETHAL +
          ') not allowed' +
          shot,
      ).not.toBe(PREVIEW_LETHAL);
    });
  }
});
