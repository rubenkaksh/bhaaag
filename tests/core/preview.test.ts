// Aim preview (fun-pass 2.1). Every row is checked against an INDEPENDENT drive of the real
// `step` (camera-aim fire, own survival loop), not against preview.ts internals.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_EV_CLING,
  HERO_GROUNDED,
  HERO_HANGING,
  HeroState,
  copyHeroState,
} from '../../src/core/hero';
import { BTN_DROP, BTN_HOOK, InputFrame } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import {
  PREVIEW_LETHAL,
  PREVIEW_NONE,
  PREVIEW_RELEASE,
  PREVIEW_SAFE,
  PreviewResult,
  previewShot,
} from '../../src/core/preview';
import { step } from '../../src/core/sim';
import { World, addAnchor, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const NAMES = ['NONE', 'SAFE', 'RELEASE', 'LETHAL'];

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function hero(x: number, y: number, z: number, vz = 0, chainT = 0): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.vz = vz;
  s.chainT = chainT;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  return s;
}

// ---- independent ground truth ----------------------------------------------------------

type Truth = {
  hooked: boolean;
  alive: boolean; // alive and settled (or hanging) when the run ends
  hangCling: boolean; // ride ended in a wall cling
  ended: boolean; // ride ended at all
  x: number;
  y: number;
  z: number;
  attachTick: number;
  endTick: number;
};

const IDLE = new InputFrame();

function press(buttons: number): InputFrame {
  const f = new InputFrame();
  f.buttons = buttons;
  f.pressed = buttons;
  return f;
}

// Fires with the CAMERA aimed at the anchor (a different input path from the preview's
// scripted hasAim), optionally pressing JUMP on `releaseTick`, then does nothing for 8+ s.
function truth(start: HeroState, w: World, anchor: number, releaseTick: number): Truth {
  const s = new HeroState();
  copyHeroState(s, start);
  const a = w.anchors[anchor];
  const dx = a.px - s.px;
  const dz = a.pz - s.pz;
  s.camYaw = Math.atan2(dx, dz);
  s.camPitch = Math.atan2(a.py - (s.py + cfg.hero.height * 0.9), Math.sqrt(dx * dx + dz * dz));
  const r: Truth = {
    hooked: false,
    alive: false,
    hangCling: false,
    ended: false,
    x: 0,
    y: 0,
    z: 0,
    attachTick: -1,
    endTick: -1,
  };
  step(s, press(BTN_HOOK), w, cfg);
  if (s.hook.anchorId !== anchor) return r;
  r.hooked = true;
  for (let t = 0; t <= 8 * cfg.fixedHz; t++) {
    if ((s.eventBits & HERO_EV_CLING) !== 0) r.hangCling = true;
    if (s.mode === HERO_ATTACHED && r.attachTick < 0) r.attachTick = t;
    if (r.attachTick >= 0 && !r.ended && s.mode !== HERO_ATTACHED) {
      r.ended = true;
      r.endTick = t;
      r.x = s.px;
      r.y = s.py;
      r.z = s.pz;
    }
    if (s.dead === 1) return r;
    if (r.ended && s.mode === HERO_HANGING) {
      r.alive = true;
      return r;
    }
    if (r.ended && s.grounded === 1 && Math.hypot(s.vx, s.vz) === 0) {
      r.alive = true;
      return r;
    }
    const jump = t + 1 === releaseTick && s.mode === HERO_ATTACHED;
    step(s, jump ? press(BTN_DROP) : IDLE, w, cfg);
  }
  return r; // cap: still moving in the air counts as not surviving
}

// ---- fixtures --------------------------------------------------------------------------

// Roof A (top y=10) the hero stands on at z=-1, facing +z. Building B across the gap.
function roofA(w: World): void {
  addSolid(w, box(-5, 0, -10, 5, 10, 0));
  w.killPlaneY = -30;
}

function safeWorld(): World {
  const w = new World();
  roofA(w);
  addSolid(w, box(-5, -10, 22, 5, 1, 40)); // long roof, 9 m below, rope lands on it
  addAnchor(w, 0, 2.5, 26);
  return w;
}

// Building B top y=4, wall face z=22. Anchor on the wall: its height decides the outcome.
function wallWorld(top: number, anchorY: number): World {
  const w = new World();
  roofA(w);
  addSolid(w, box(-6, -40, 22, 6, top, 40));
  addAnchor(w, 0, anchorY, 22);
  return w;
}

// Short, shallow rope into a tall wall with nothing below: arrival speed decides cling vs death.
function clingWorld(): World {
  const w = new World();
  roofA(w);
  addSolid(w, box(-6, -40, 11.7, 6, 40, 19.7));
  addAnchor(w, 0, 9.7, 11.7);
  return w;
}

// Short roof: the rope lands fine, then the hero skids off the far edge with no input.
function edgeWorld(): World {
  const w = new World();
  roofA(w);
  addSolid(w, box(-5, -10, 22, 5, 1, 27));
  addAnchor(w, 0, 2.5, 26);
  return w;
}

type Row = {
  name: string;
  world: () => World;
  start: () => HeroState;
  expect: number;
  prep?: (s: HeroState) => void;
};

const ROWS: Row[] = [
  { name: 'safe: lands on a long roof', world: safeWorld, start: () => hero(0, 10, -1), expect: PREVIEW_SAFE },
  {
    name: 'cling: standing, shallow wall arrival',
    world: clingWorld,
    start: () => hero(0, 10, -1),
    expect: PREVIEW_RELEASE, // cling = the player must act (plan 4.1)
  },
  {
    name: 'lethal: wall arrival kills and JUMP no longer kicks onto the roof (T303)',
    world: () => wallWorld(4, 4.5),
    start: () => hero(0, 10, -1),
    expect: PREVIEW_LETHAL,
  },
  {
    name: 'lethal: anchor too deep under the roof edge, nothing below',
    world: () => wallWorld(4, 3),
    start: () => hero(0, 10, -1),
    expect: PREVIEW_LETHAL,
  },
  {
    name: 'lethal: fast chained arrival at the shallow tall wall',
    world: clingWorld,
    start: () => hero(0, 10, -1, 10, 0.3),
    expect: PREVIEW_LETHAL,
  },
  {
    name: 'none: hook cooldown running',
    world: safeWorld,
    start: () => {
      const s = hero(0, 10, -1);
      s.hookCd = 0.1;
      return s;
    },
    expect: PREVIEW_NONE,
  },
  {
    name: 'none: rope too flat (anchor level with the hand)',
    world: () => {
      const w = new World();
      roofA(w);
      addSolid(w, box(-5, -10, 22, 5, 10, 40));
      addAnchor(w, 0, 12, 26);
      return w;
    },
    start: () => hero(0, 10, -1),
    expect: PREVIEW_NONE,
  },
];

describe('previewShot vs the real step', () => {
  it.each(ROWS)('$name', (row) => {
    const w = row.world();
    const start = row.start();
    const out = new PreviewResult();
    previewShot(start, 0, w, cfg, out);
    expect(NAMES[out.outcome], `got ${NAMES[out.outcome]}`).toBe(NAMES[row.expect]);

    const base = truth(start, w, 0, 0);
    if (row.expect === PREVIEW_NONE) {
      expect(base.hooked).toBe(false);
      return;
    }
    expect(base.hooked).toBe(true);
    // The predicted point is where the ride-to-end run really ends.
    expect(out.x).toBeCloseTo(base.x, 6);
    expect(out.y).toBeCloseTo(base.y, 6);
    expect(out.z).toBeCloseTo(base.z, 6);

    if (row.expect === PREVIEW_SAFE) {
      expect(base.alive).toBe(true);
    } else if (row.expect === PREVIEW_RELEASE) {
      if (out.releaseTick >= 0) {
        // Needs a real release: riding kills, pressing JUMP at the reported tick survives.
        expect(base.alive).toBe(false);
        expect(truth(start, w, 0, out.releaseTick).alive).toBe(true);
        expect(out.releaseFrac).toBeGreaterThan(0);
        expect(out.releaseFrac).toBeLessThan(1);
      } else {
        // Cling: riding ends hanging off the wall, no search needed.
        expect(base.hangCling).toBe(true);
        expect(base.alive).toBe(true);
      }
    } else {
      // Lethal: not just the sampled releases, EVERY possible release tick dies.
      expect(base.alive).toBe(false);
      // A DROP in the first quarter just falls back onto the launch roof (T303): not a save.
      const from = base.attachTick + 1 + Math.ceil((base.endTick - base.attachTick) / 4);
      for (let t = from; t < base.endTick; t++) {
        expect(truth(start, w, 0, t).alive, `release at tick ${t}`).toBe(false);
      }
    }
  });

  it('a landing that skids off the far edge is not judged SAFE', () => {
    const w = edgeWorld();
    const start = hero(0, 10, -1);
    const base = truth(start, w, 0, 0);
    expect(base.hooked).toBe(true);
    expect(base.alive).toBe(false); // lands on the roof, then rolls off and falls
    const out = new PreviewResult();
    previewShot(start, 0, w, cfg, out);
    expect(out.outcome).not.toBe(PREVIEW_SAFE);
    expect(out.outcome).not.toBe(PREVIEW_NONE);
    expect(out.x).toBeCloseTo(base.x, 6); // still reports the touchdown point
    expect(out.z).toBeCloseTo(base.z, 6);
  });

  it('reflects run-up speed: standing clings (RELEASE), a fast chained shot is LETHAL', () => {
    const w = clingWorld();
    const standing = new PreviewResult();
    const fast = new PreviewResult();
    previewShot(hero(0, 10, -1), 0, w, cfg, standing);
    previewShot(hero(0, 10, -1, 10, 0.3), 0, w, cfg, fast);
    expect(standing.outcome).toBe(PREVIEW_RELEASE);
    expect(fast.outcome).toBe(PREVIEW_LETHAL);
    // Same two starts through the real step agree.
    expect(truth(hero(0, 10, -1), w, 0, 0).alive).toBe(true);
    expect(truth(hero(0, 10, -1, 10, 0.3), w, 0, 0).alive).toBe(false);
  });

  it('never mutates the real state', () => {
    for (const row of ROWS) {
      const w = row.world();
      const s = row.start();
      s.eventBits = 5;
      s.hookIntentT = 0.2;
      const before = JSON.stringify(s);
      const out = new PreviewResult();
      previewShot(s, 0, w, cfg, out);
      previewShot(s, 99, w, cfg, out); // unknown anchor
      expect(JSON.stringify(s)).toBe(before);
    }
  });

  it('an unknown anchor id or a dead hero previews NONE', () => {
    const out = new PreviewResult();
    previewShot(hero(0, 10, -1), 7, safeWorld(), cfg, out);
    expect(out.outcome).toBe(PREVIEW_NONE);
    const dead = hero(0, 10, -1);
    dead.dead = 1;
    previewShot(dead, 0, safeWorld(), cfg, out);
    expect(out.outcome).toBe(PREVIEW_NONE);
    expect(HERO_AIRBORNE).toBe(1); // keep the import honest for the airborne case below
  });

  it('works for an airborne hero too (no grounded run-up)', () => {
    const w = safeWorld();
    const s = hero(0, 10, -1);
    s.grounded = 0;
    s.mode = HERO_AIRBORNE;
    const out = new PreviewResult();
    previewShot(s, 0, w, cfg, out);
    expect(out.outcome).not.toBe(PREVIEW_NONE);
  });
});

describe('previewShot time cap', () => {
  it('counts a run that has not settled by aim.previewMaxSec as not surviving', () => {
    const cfg = { ...DEFAULT_TUNING, aim: { ...DEFAULT_TUNING.aim, previewMaxSec: 0.2 } };
    const out = new PreviewResult();
    previewShot(hero(0, 10, -1), 0, safeWorld(), cfg, out);
    expect(out.outcome).toBe(PREVIEW_LETHAL);
  });
});
