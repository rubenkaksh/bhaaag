import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  AIM_BLOCKED,
  AIM_NONE,
  AIM_OK,
  AIM_OUT_OF_RANGE,
  AIM_TOO_CLOSE,
  AIM_TOO_FLAT,
  AIM_TOO_STEEP,
  AIM_UPHILL,
  AimResult,
  HOOK_AT_END,
  HOOK_ATTACHED,
  HOOK_FLYING,
  HOOK_IDLE,
  NO_ANCHOR,
  aimReason,
  hookFire,
  hookRelease,
  hookStep,
  hookTrolleyPos,
  newHook,
  pickAnchor,
  pickAnchorAssisted,
  resetHook,
  type Hook,
} from '../../src/core/hook';
import { AABB } from '../../src/core/math/aabb';
import { Vec3, length, normalizeTo } from '../../src/core/math/vec3';
import { World, addAnchor, addSolid } from '../../src/core/world';

const DEG2RAD = Math.PI / 180;
const ROPE = DEFAULT_TUNING.rope;
const DT = 1 / DEFAULT_TUNING.fixedHz;
const HAND = { x: 0, y: 10, z: 0 };
const HOP_LEN = 20;
const HOP_SLOPE = 22;

// Point on a sphere around the hand: bearing turns about +Y from +Z, slope dips below the
// horizontal. Mirrors the chord model in hook.ts.
function chordPoint(
  bearingDeg: number,
  slopeDeg: number,
  len: number,
): { x: number; y: number; z: number } {
  const b = bearingDeg * DEG2RAD;
  const s = slopeDeg * DEG2RAD;
  return {
    x: HAND.x + Math.sin(b) * Math.cos(s) * len,
    y: HAND.y - Math.sin(s) * len,
    z: HAND.z + Math.cos(b) * Math.cos(s) * len,
  };
}

// Aim ray from the hand through that direction.
function rayDir(bearingDeg: number, slopeDeg: number): { x: number; y: number; z: number } {
  const p = chordPoint(bearingDeg, slopeDeg, 1);
  return { x: p.x - HAND.x, y: p.y - HAND.y, z: p.z - HAND.z };
}

// World with one valid anchor straight ahead (+z) on the default 20 m / 22 degree hop.
function hopWorld(): World {
  const w = new World();
  const p = chordPoint(0, HOP_SLOPE, HOP_LEN);
  addAnchor(w, p.x, p.y, p.z);
  return w;
}

function addAt(w: World, bearingDeg: number, slopeDeg: number, len: number): number {
  const p = chordPoint(bearingDeg, slopeDeg, len);
  return addAnchor(w, p.x, p.y, p.z);
}

function pick(
  w: World,
  bearingDeg: number,
  slopeDeg: number,
  out: AimResult,
  maxLen = ROPE.maxLen,
  magnetDeg = DEFAULT_TUNING.aim.magnetDegDesktop,
  cam = HAND,
): void {
  const d = rayDir(bearingDeg, slopeDeg);
  pickAnchor(
    w,
    DEFAULT_TUNING,
    HAND.x,
    HAND.y,
    HAND.z,
    cam.x,
    cam.y,
    cam.z,
    d.x,
    d.y,
    d.z,
    maxLen,
    magnetDeg,
    out,
  );
}

// Fire and ride at 60 Hz until AT_END (or the tick cap), sampling speeds on the way.
function ride(
  w: World,
  opts: {
    speedAlong?: number;
    brakeAt?: (tick: number) => boolean;
    cap?: number;
    anchorId?: number;
  } = {},
): {
  ticks: number;
  time: number;
  arrivalV: number;
  state: number;
  s: number;
  minV: number;
  maxV: number;
  h: Hook;
} {
  const h = newHook();
  const ok = hookFire(
    h,
    opts.anchorId ?? 0,
    HAND.x,
    HAND.y,
    HAND.z,
    w,
    DEFAULT_TUNING,
    opts.speedAlong ?? 0,
  );
  expect(ok).toBe(true);
  const cap = opts.cap ?? 5000;
  let ticks = 0;
  let minV = Infinity;
  let maxV = -Infinity;
  while (h.state !== HOOK_AT_END && ticks < cap) {
    ticks++;
    hookStep(h, DT, w, DEFAULT_TUNING, opts.brakeAt !== undefined && opts.brakeAt(ticks));
    if (h.v < minV) minV = h.v;
    if (h.v > maxV) maxV = h.v;
  }
  return { ticks, time: ticks * DT, arrivalV: h.v, state: h.state, s: h.s, minV, maxV, h };
}

describe('newHook / resetHook / hookFire', () => {
  it('starts and returns to idle with no anchor', () => {
    const h = newHook();
    expect([h.state, h.anchorId, h.len, h.s, h.v, h.flyT]).toEqual([
      HOOK_IDLE,
      NO_ANCHOR,
      0,
      0,
      0,
      0,
    ]);
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, hopWorld(), DEFAULT_TUNING, 0);
    expect(h.state).toBe(HOOK_FLYING);
    resetHook(h);
    expect([h.state, h.anchorId, h.ax, h.ay, h.az, h.len, h.s, h.v, h.flyT, h.handToFeet]).toEqual([
      HOOK_IDLE,
      NO_ANCHOR,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  });

  it('rejects an out-of-range anchor id and stays idle', () => {
    const w = hopWorld();
    const h = newHook();
    expect(hookFire(h, 5, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0)).toBe(false);
    expect(h.state).toBe(HOOK_IDLE);
    expect(hookFire(h, -1, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0)).toBe(false);
    expect(h.state).toBe(HOOK_IDLE);
  });

  it('caches the chord and seeds v0 from launchSpeed or the run-up speed', () => {
    const w = hopWorld();
    const h = newHook();
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0);
    expect(h.len).toBeCloseTo(HOP_LEN, 9);
    expect(h.anchorId).toBe(0);
    expect(h.ax).toBe(w.anchors[0].px);
    expect(h.slopeSin).toBeCloseTo(Math.sin(HOP_SLOPE * DEG2RAD), 12);
    expect(h.v).toBe(ROPE.launchSpeed); // 6 beats a standing start
    expect(h.flyT).toBeCloseTo(HOP_LEN / ROPE.hookSpeed, 12);
    expect(h.handToFeet).toBe(ROPE.handToFeet);

    const runner = newHook();
    hookFire(runner, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 9); // chain-window carry wins
    expect(runner.v).toBe(9);

    const fast = newHook();
    hookFire(fast, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, ROPE.terminal + 10);
    expect(fast.v).toBe(ROPE.terminal); // v0 never exceeds the rope ceiling
    const backwards = newHook();
    hookFire(backwards, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, -5);
    expect(backwards.v).toBe(ROPE.launchSpeed);
  });
});

describe('pickAnchor', () => {
  it('chooses the smallest angle to the aim ray', () => {
    const w = new World();
    addAt(w, 0, HOP_SLOPE, HOP_LEN); // id 0
    addAt(w, 8, HOP_SLOPE, HOP_LEN); // id 1
    const out = new AimResult();

    // Aim 6 degrees right of anchor 0: anchor 1 is 1.85 degrees off, anchor 0 is 5.56.
    pick(w, 6, HOP_SLOPE, out, ROPE.maxLen, 10);
    expect(out.anchorId).toBe(1);
    expect(out.angleDeg).toBeGreaterThan(1.5);
    expect(out.angleDeg).toBeLessThan(2.2);
    expect(out.dist).toBeCloseTo(HOP_LEN, 9);

    pick(w, 2, HOP_SLOPE, out, ROPE.maxLen, 10);
    expect(out.anchorId).toBe(0);
    expect(out.angleDeg).toBeGreaterThan(1.5);
    expect(out.angleDeg).toBeLessThan(2.2);
  });

  it('rejects anchors outside [minLen, maxLen] and honours an explicit maxLen', () => {
    const w = new World();
    addAt(w, 0, HOP_SLOPE, 40);
    const out = new AimResult();
    pick(w, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(NO_ANCHOR); // 40 > rope.maxLen 35
    expect(out.dist).toBe(0);
    pick(w, 0, HOP_SLOPE, out, 45); // a caller-widened reach picks it up
    expect(out.anchorId).toBe(0);
    expect(out.dist).toBeCloseTo(40, 9);

    const close = new World();
    addAt(close, 0, HOP_SLOPE, 3);
    pick(close, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(NO_ANCHOR); // 3 < rope.minLen 4
  });

  it('rejects too steep, too flat and uphill chords, accepts in-band ones', () => {
    const out = new AimResult();

    const steep = new World();
    addAt(steep, 0, 60, HOP_LEN);
    pick(steep, 0, 60, out);
    expect(out.anchorId).toBe(NO_ANCHOR); // 60 > maxSlopeDeg 55

    const steepOk = new World();
    addAt(steepOk, 0, 50, HOP_LEN);
    pick(steepOk, 0, 50, out);
    expect(out.anchorId).toBe(0);

    const flat = new World();
    addAt(flat, 0, 5, HOP_LEN);
    pick(flat, 0, 5, out);
    expect(out.anchorId).toBe(NO_ANCHOR); // 5 < minSlopeDeg 10

    const flatOk = new World();
    addAt(flatOk, 0, 12, HOP_LEN);
    pick(flatOk, 0, 12, out);
    expect(out.anchorId).toBe(0);

    const up = new World();
    addAt(up, 0, -20, HOP_LEN);
    pick(up, 0, -20, out);
    expect(out.anchorId).toBe(NO_ANCHOR); // can't zip uphill
  });

  it('rejects a chord blocked by a solid, keeps a clear one', () => {
    const w = hopWorld();
    const out = new AimResult();
    pick(w, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(0);

    // Wall across the chord midpoint: at z = 9.27 the chord is y = 6.28, x = 0.
    addSolid(w, new AABB(new Vec3(-1, 4, 8.5), new Vec3(1, 8, 10)));
    pick(w, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(NO_ANCHOR);

    // The same wall slid aside leaves the chord clear.
    const aside = new World();
    addAt(aside, 0, HOP_SLOPE, HOP_LEN);
    addSolid(aside, new AABB(new Vec3(5, 4, 8.5), new Vec3(7, 8, 10)));
    pick(aside, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(0);

    // An anchor on a surface is not "blocked by its own wall" (end trim).
    const mounted = new World();
    // Face at the anchor's own z (~18.54): the anchor sits ON the wall, not inside it.
    addSolid(mounted, new AABB(new Vec3(-2, 0, 18.54), new Vec3(2, 8, 20)));
    addAt(mounted, 0, HOP_SLOPE, HOP_LEN);
    pick(mounted, 0, HOP_SLOPE, out);
    expect(out.anchorId).toBe(0);
  });

  it('rejects anchors outside the magnet cone and a degenerate ray', () => {
    const w = new World();
    addAt(w, 10, HOP_SLOPE, HOP_LEN);
    const out = new AimResult();
    // 9.27 degrees off versus the 4 degree desktop cone.
    pick(w, 0, HOP_SLOPE, out, ROPE.maxLen, DEFAULT_TUNING.aim.magnetDegDesktop);
    expect(out.anchorId).toBe(NO_ANCHOR);
    pick(w, 0, HOP_SLOPE, out, ROPE.maxLen, 15);
    expect(out.anchorId).toBe(0);

    // Nothing behind the camera is eligible.
    const back = new World();
    addAt(back, 180, HOP_SLOPE, HOP_LEN);
    pick(back, 0, HOP_SLOPE, out, ROPE.maxLen, 60);
    expect(out.anchorId).toBe(NO_ANCHOR);

    // Zero-length aim ray.
    pickAnchor(
      w,
      DEFAULT_TUNING,
      HAND.x,
      HAND.y,
      HAND.z,
      HAND.x,
      HAND.y,
      HAND.z,
      0,
      0,
      0,
      ROPE.maxLen,
      15,
      out,
    );
    expect(out.anchorId).toBe(NO_ANCHOR);
    expect(out.dist).toBe(0);
    expect(out.angleDeg).toBe(0);
  });

  it('rays from the camera, not from the hand', () => {
    const w = hopWorld();
    const out = new AimResult();
    // Camera 20 m back: aiming where the hand would aim puts the anchor 11 degrees off.
    const cam = { x: 0, y: 10, z: -20 };
    pick(w, 0, HOP_SLOPE, out, ROPE.maxLen, 4, cam);
    expect(out.anchorId).toBe(NO_ANCHOR);
    pick(w, 0, HOP_SLOPE, out, ROPE.maxLen, 15, cam);
    expect(out.anchorId).toBe(0);
    expect(out.dist).toBeCloseTo(HOP_LEN, 9); // range is still measured from the hand
  });
});

describe('hookStep slide physics (§4.2)', () => {
  it('a 20 m hop at 22 degrees reaches the end in 2.1-2.5 s at 11-16 m/s (6 m/s run-up start)', () => {
    // The ADR 0001 band assumed a 6 m/s start; a standing start (launchSpeed 3) is slower,
    // a run-up seeds the rope from the chord-projected run speed.
    const r = ride(hopWorld(), { speedAlong: 6 });
    expect(r.state).toBe(HOOK_AT_END);
    expect(r.time).toBeGreaterThanOrEqual(2.1);
    expect(r.time).toBeLessThanOrEqual(2.5);
    expect(r.arrivalV).toBeGreaterThanOrEqual(11);
    expect(r.arrivalV).toBeLessThanOrEqual(16);
    expect(r.s).toBeCloseTo(HOP_LEN - ROPE.trolleyStop, 12);
    expect(r.maxV).toBeLessThanOrEqual(ROPE.terminal);
    expect(r.minV).toBeGreaterThanOrEqual(0);
  });

  it('flies for len / hookSpeed ticks before attaching, without moving the hero', () => {
    const w = hopWorld();
    const h = newHook();
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0);
    // flyT = 20 / 320 s = 4 ticks at 60 Hz (5 if float error leaves a sliver).
    for (let i = 0; i < 2; i++) hookStep(h, DT, w, DEFAULT_TUNING, false);
    expect(h.state).toBe(HOOK_FLYING);
    expect(h.s).toBe(0);
    let ticks = 2;
    while (h.state === HOOK_FLYING && ticks < 20) {
      hookStep(h, DT, w, DEFAULT_TUNING, false);
      ticks++;
    }
    expect(ticks).toBeGreaterThanOrEqual(4);
    expect(ticks).toBeLessThanOrEqual(5);
    expect(h.state).toBe(HOOK_ATTACHED);
    expect(h.s).toBe(0); // the attach tick does not integrate
    hookStep(h, DT, w, DEFAULT_TUNING, false);
    expect(h.s).toBeGreaterThan(0);
  });

  it('a 30 m shot attaches within 0.1 s', () => {
    const w = new World();
    addAt(w, 0, HOP_SLOPE, 30);
    const h = newHook();
    expect(hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0)).toBe(true);
    expect(h.len).toBeCloseTo(30, 9);
    let ticks = 0;
    while (h.state === HOOK_FLYING && ticks < 60) {
      hookStep(h, DT, w, DEFAULT_TUNING, false);
      ticks++;
    }
    expect(h.state).toBe(HOOK_ATTACHED);
    expect(ticks * DT).toBeLessThanOrEqual(0.1 + 1e-9);
  });

  it('hand-brake lowers the arrival speed', () => {
    const free = ride(hopWorld());
    const braked = ride(hopWorld(), { brakeAt: (t) => t >= 60 && t < 120 });
    expect(braked.state).toBe(HOOK_AT_END);
    expect(braked.arrivalV).toBeLessThan(free.arrivalV);
    expect(braked.arrivalV).toBeGreaterThan(0);
    expect(braked.ticks).toBeGreaterThan(free.ticks);
  });

  it('brake never pushes v below zero; the trolley just stalls', () => {
    const w = hopWorld();
    const r = ride(w, { brakeAt: () => true, cap: 600 });
    expect(r.state).toBe(HOOK_ATTACHED); // brakeDecel beats gravity at 22 degrees
    expect(r.minV).toBe(0);
    expect(r.h.v).toBe(0);
    const stalledAt = r.h.s;
    for (let i = 0; i < 60; i++) hookStep(r.h, DT, w, DEFAULT_TUNING, true);
    expect(r.h.v).toBe(0);
    expect(r.h.s).toBe(stalledAt);
  });

  it('speed is capped at rope.terminal', () => {
    const w = new World();
    addAt(w, 0, ROPE.maxSlopeDeg, ROPE.maxLen);
    const r = ride(w, { speedAlong: ROPE.terminal + 10 });
    expect(r.maxV).toBe(ROPE.terminal);
    expect(r.h.v).toBeLessThanOrEqual(ROPE.terminal);
    expect(r.state).toBe(HOOK_AT_END);
  });

  it('stops at len - trolleyStop and ignores steps after AT_END', () => {
    const w = hopWorld();
    const r = ride(w);
    const s = r.h.s;
    const v = r.h.v;
    for (let i = 0; i < 30; i++) hookStep(r.h, DT, w, DEFAULT_TUNING, false);
    expect([r.h.state, r.h.s, r.h.v]).toEqual([HOOK_AT_END, s, v]);
    expect(hookStep(r.h, DT, w, DEFAULT_TUNING, true)).toBe(HOOK_AT_END);
    expect(hookStep(newHook(), DT, w, DEFAULT_TUNING, false)).toBe(HOOK_IDLE);
  });

  it('hookTrolleyPos is the chord point at s, lowered by handToFeet', () => {
    const w = hopWorld();
    const h = newHook();
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0);
    const pos = new Vec3(1, 1, 1);
    hookTrolleyPos(h, pos);
    expect([pos.x, pos.y, pos.z]).toEqual([HAND.x, HAND.y - ROPE.handToFeet, HAND.z]);

    for (let i = 0; i < 90; i++) hookStep(h, DT, w, DEFAULT_TUNING, false);
    hookTrolleyPos(h, pos);
    const chordY = HAND.y + h.dirY * h.s;
    expect(pos.x).toBe(HAND.x + h.dirX * h.s);
    expect(pos.y).toBe(chordY - ROPE.handToFeet);
    expect(pos.z).toBe(HAND.z + h.dirZ * h.s);

    resetHook(h);
    hookTrolleyPos(h, pos);
    expect([pos.x, pos.y, pos.z]).toEqual([0, 0, 0]);
  });
});

describe('hookRelease', () => {
  it('velocity vector equals chord direction times v', () => {
    const w = hopWorld();
    const h = newHook();
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0);
    for (let i = 0; i < 90; i++) hookStep(h, DT, w, DEFAULT_TUNING, false);
    expect(h.state).toBe(HOOK_ATTACHED);
    const dx = h.dirX;
    const dy = h.dirY;
    const dz = h.dirZ;
    const v = h.v;
    const out = new Vec3(1, 2, 3);
    hookRelease(h, out);
    expect([out.x, out.y, out.z]).toEqual([dx * v, dy * v, dz * v]);
    const unit = new Vec3(0, 0, 0);
    normalizeTo(unit, out);
    expect(unit.x).toBeCloseTo(dx, 12);
    expect(unit.y).toBeCloseTo(dy, 12);
    expect(unit.z).toBeCloseTo(dz, 12);
    expect(length(out)).toBeCloseTo(v, 12);
    expect(out.y).toBeLessThan(0); // downhill
    expect(out.z).toBeGreaterThan(0); // toward the anchor
  });

  it('goes back to idle', () => {
    const w = hopWorld();
    const r = ride(w);
    const out = new Vec3(0, 0, 0);
    hookRelease(r.h, out);
    expect([r.h.state, r.h.anchorId, r.h.len, r.h.s, r.h.v, r.h.flyT]).toEqual([
      HOOK_IDLE,
      NO_ANCHOR,
      0,
      0,
      0,
      0,
    ]);
    expect(length(out)).toBeCloseTo(r.arrivalV, 12); // arrival speed handed over
  });

  it('releasing while still flying gives zero velocity', () => {
    const w = hopWorld();
    const h = newHook();
    hookFire(h, 0, HAND.x, HAND.y, HAND.z, w, DEFAULT_TUNING, 0);
    hookStep(h, DT, w, DEFAULT_TUNING, false);
    expect(h.state).toBe(HOOK_FLYING);
    const out = new Vec3(9, 9, 9);
    hookRelease(h, out);
    expect([out.x, out.y, out.z]).toEqual([0, 0, 0]);
    expect(h.state).toBe(HOOK_IDLE);
  });
});

describe('determinism', () => {
  it('two identical runs agree end to end', () => {
    const brakeAt = (t: number): boolean => t >= 70 && t < 110;
    const a = ride(hopWorld(), { brakeAt, speedAlong: 4 });
    const b = ride(hopWorld(), { brakeAt, speedAlong: 4 });
    expect([a.ticks, a.arrivalV, a.s, a.state, a.time]).toEqual([
      b.ticks,
      b.arrivalV,
      b.s,
      b.state,
      b.time,
    ]);
    const pa = new Vec3(0, 0, 0);
    const pb = new Vec3(0, 0, 0);
    hookTrolleyPos(a.h, pa);
    hookTrolleyPos(b.h, pb);
    expect([pa.x, pa.y, pa.z]).toEqual([pb.x, pb.y, pb.z]);
    const va = new Vec3(0, 0, 0);
    const vb = new Vec3(0, 0, 0);
    hookRelease(a.h, va);
    hookRelease(b.h, vb);
    expect([va.x, va.y, va.z]).toEqual([vb.x, vb.y, vb.z]);
  });

  it('a fixed number of steps reproduces exactly', () => {
    for (const ticks of [12, 45, 100]) {
      const h1 = newHook();
      const h2 = newHook();
      const w1 = hopWorld();
      const w2 = hopWorld();
      hookFire(h1, 0, HAND.x, HAND.y, HAND.z, w1, DEFAULT_TUNING, 2);
      hookFire(h2, 0, HAND.x, HAND.y, HAND.z, w2, DEFAULT_TUNING, 2);
      for (let i = 0; i < ticks; i++) {
        hookStep(h1, DT, w1, DEFAULT_TUNING, i > 30);
        hookStep(h2, DT, w2, DEFAULT_TUNING, i > 30);
      }
      expect([h1.state, h1.s, h1.v, h1.flyT, h1.len]).toEqual([
        h2.state,
        h2.s,
        h2.v,
        h2.flyT,
        h2.len,
      ]);
    }
  });

  it('picking is stable and order-independent for equal angles', () => {
    const out1 = new AimResult();
    const out2 = new AimResult();
    const w = new World();
    addAt(w, 0, HOP_SLOPE, HOP_LEN);
    addAt(w, 8, HOP_SLOPE, HOP_LEN);
    addAt(w, -4, HOP_SLOPE, HOP_LEN);
    for (let run = 0; run < 3; run++) {
      pick(w, 1, HOP_SLOPE, out2, ROPE.maxLen, 12);
      pick(w, 1, HOP_SLOPE, out1, ROPE.maxLen, 12);
      expect([out1.anchorId, out1.dist, out1.angleDeg]).toEqual([
        out2.anchorId,
        out2.dist,
        out2.angleDeg,
      ]);
    }
    expect(out1.anchorId).toBe(0); // 1 degree off beats 4 and 8
  });
});

describe('aimReason', () => {
  // aimReason verdict + pickAnchor's pick for the identical inputs.
  function verdict(
    w: World,
    bearingDeg: number,
    slopeDeg: number,
    magnetDeg = DEFAULT_TUNING.aim.magnetDegDesktop,
  ): [number, number] {
    const d = rayDir(bearingDeg, slopeDeg);
    const reason = aimReason(
      w,
      DEFAULT_TUNING,
      HAND.x,
      HAND.y,
      HAND.z,
      HAND.x,
      HAND.y,
      HAND.z,
      d.x,
      d.y,
      d.z,
      ROPE.maxLen,
      magnetDeg,
    );
    const out = new AimResult();
    pickAnchor(
      w,
      DEFAULT_TUNING,
      HAND.x,
      HAND.y,
      HAND.z,
      HAND.x,
      HAND.y,
      HAND.z,
      d.x,
      d.y,
      d.z,
      ROPE.maxLen,
      magnetDeg,
      out,
    );
    return [reason, out.anchorId];
  }

  it('AIM_NONE when the only anchor is outside the cone (pickAnchor agrees)', () => {
    expect(verdict(hopWorld(), 30, HOP_SLOPE)).toEqual([AIM_NONE, NO_ANCHOR]);
  });

  it('AIM_TOO_CLOSE below rope.minLen (pickAnchor agrees)', () => {
    const w = new World();
    addAt(w, 0, HOP_SLOPE, ROPE.minLen - 1);
    expect(verdict(w, 0, HOP_SLOPE)).toEqual([AIM_TOO_CLOSE, NO_ANCHOR]);
  });

  it('AIM_OUT_OF_RANGE beyond maxLen (pickAnchor agrees)', () => {
    const w = new World();
    addAt(w, 0, HOP_SLOPE, ROPE.maxLen + 5);
    expect(verdict(w, 0, HOP_SLOPE)).toEqual([AIM_OUT_OF_RANGE, NO_ANCHOR]);
  });

  it('AIM_UPHILL for an anchor above the hand (pickAnchor agrees)', () => {
    const w = new World();
    addAt(w, 0, -20, HOP_LEN);
    expect(verdict(w, 0, -20)).toEqual([AIM_UPHILL, NO_ANCHOR]);
  });

  it('AIM_TOO_FLAT below rope.minSlopeDeg (pickAnchor agrees)', () => {
    const w = new World();
    addAt(w, 0, ROPE.minSlopeDeg - 5, HOP_LEN);
    expect(verdict(w, 0, ROPE.minSlopeDeg - 5)).toEqual([AIM_TOO_FLAT, NO_ANCHOR]);
  });

  it('AIM_TOO_STEEP above rope.maxSlopeDeg (pickAnchor agrees)', () => {
    const w = new World();
    addAt(w, 0, ROPE.maxSlopeDeg + 5, HOP_LEN);
    expect(verdict(w, 0, ROPE.maxSlopeDeg + 5)).toEqual([AIM_TOO_STEEP, NO_ANCHOR]);
  });

  it('AIM_BLOCKED when a solid sits across the chord (pickAnchor agrees)', () => {
    const w = hopWorld();
    expect(verdict(w, 0, HOP_SLOPE)).toEqual([AIM_OK, 0]);
    addSolid(w, new AABB(new Vec3(-1, 4, 8.5), new Vec3(1, 8, 10)));
    expect(verdict(w, 0, HOP_SLOPE)).toEqual([AIM_BLOCKED, NO_ANCHOR]);
  });

  it('AIM_OK when the anchor is valid (pickAnchor finds it)', () => {
    expect(verdict(hopWorld(), 0, HOP_SLOPE)).toEqual([AIM_OK, 0]);
  });

  it('route anchors get the wider cone, off-route ones do not', () => {
    const w = new World();
    const id = addAt(w, 12, HOP_SLOPE, HOP_LEN); // ~11 degrees off the ray
    const magnet = DEFAULT_TUNING.aim.magnetDegDesktop; // 4 < 11
    const d = rayDir(0, HOP_SLOPE);
    const call = (world: World): number =>
      aimReason(
        world,
        DEFAULT_TUNING,
        HAND.x,
        HAND.y,
        HAND.z,
        HAND.x,
        HAND.y,
        HAND.z,
        d.x,
        d.y,
        d.z,
        ROPE.maxLen,
        magnet,
      );
    expect(call(w)).toBe(AIM_NONE); // off the route: outside the 4 degree cone
    w.route.push(id);
    expect(call(w)).toBe(AIM_OK); // on the route: routeAssistDeg 16 covers it
    w.route.length = 0;
    expect(call(w)).toBe(AIM_NONE);
  });
});

describe('route assist split', () => {
  // Early route entries keep the 16 degree routeAssistDeg cone; the rest drop to the 6
  // degree routeAssistLateDeg cone. magnetDeg 2 so neither route cone is the magnet cone.
  const cfg = {
    ...DEFAULT_TUNING,
    aim: { ...DEFAULT_TUNING.aim, routeAssistLateDeg: 6, routeAssistDeg: 16 },
  };
  const MAGNET = 2;

  function assisted(w: World, bearingDeg: number): AimResult {
    const d = rayDir(bearingDeg, HOP_SLOPE);
    const out = new AimResult();
    pickAnchorAssisted(
      w,
      cfg,
      HAND.x,
      HAND.y,
      HAND.z,
      HAND.x,
      HAND.y,
      HAND.z,
      d.x,
      d.y,
      d.z,
      ROPE.maxLen,
      MAGNET,
      out,
    );
    return out;
  }

  function reason(w: World, bearingDeg: number): number {
    const d = rayDir(bearingDeg, HOP_SLOPE);
    return aimReason(
      w,
      cfg,
      HAND.x,
      HAND.y,
      HAND.z,
      HAND.x,
      HAND.y,
      HAND.z,
      d.x,
      d.y,
      d.z,
      ROPE.maxLen,
      MAGNET,
    );
  }

  it('picks a route index 0 anchor aimed 12 degrees off (early cone)', () => {
    const w = new World();
    const id = addAt(w, 12, HOP_SLOPE, HOP_LEN); // ~11 degrees off a bearing 0 ray
    w.route.push(id); // index 0 < routeAssistEarlyHops 2
    expect(assisted(w, 0).anchorId).toBe(id);
    expect(reason(w, 0)).toBe(AIM_OK);
  });

  it('skips a route index 2 anchor aimed 12 degrees off (late cone)', () => {
    const w = new World();
    addAt(w, 60, HOP_SLOPE, HOP_LEN); // id 0, early decoy: far outside the 16 degree cone
    addAt(w, -60, HOP_SLOPE, HOP_LEN); // id 1, early decoy
    const target = addAt(w, 12, HOP_SLOPE, HOP_LEN); // id 2, ~11 degrees off a bearing 0 ray
    w.route.push(0, 1, target);
    expect(assisted(w, 0).anchorId).toBe(NO_ANCHOR);
    expect(reason(w, 0)).toBe(AIM_NONE);
    expect(target).toBe(2); // sanity: the target really sits at route index 2
  });

  it('picks the same index 2 anchor at 4 degrees off (late cone, magnet 2 does not)', () => {
    const w = new World();
    addAt(w, 60, HOP_SLOPE, HOP_LEN); // id 0
    addAt(w, -60, HOP_SLOPE, HOP_LEN); // id 1
    const target = addAt(w, 12, HOP_SLOPE, HOP_LEN); // id 2
    w.route.push(0, 1, target);
    const hit = assisted(w, 8); // 4 degrees of bearing off the anchor at 12, ~3.7 of angle: inside routeAssistLateDeg 6, outside magnet 2
    expect(hit.anchorId).toBe(target);
    expect(hit.angleDeg).toBeGreaterThan(3);
    expect(hit.angleDeg).toBeLessThan(4);
    expect(reason(w, 8)).toBe(AIM_OK);
  });

  it('does not pick a non-route anchor aimed 12 degrees off', () => {
    const w = new World();
    addAt(w, 12, HOP_SLOPE, HOP_LEN); // ~11 degrees off: outside magnet 2, never on the route
    expect(assisted(w, 0).anchorId).toBe(NO_ANCHOR);
    expect(reason(w, 0)).toBe(AIM_NONE);
  });
});
