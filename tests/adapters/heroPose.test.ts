import { describe, expect, it } from 'vitest';
import { Color, Mesh, MeshStandardMaterial, SRGBColorSpace, Vector3 } from 'three';
import type { Material, Object3D, SkinnedMesh } from 'three';
import {
  AIRBORNE,
  ATTACHED,
  CH_BODY_PITCH,
  CH_COUNT,
  CH_ELBOW_L,
  CH_HEM_PITCH,
  CH_HEM_ROLL,
  CH_SQUASH,
  CH_HIPS_Y,
  CH_SHOULDER_FLEX_R,
  CH_SPINE_PITCH,
  CLINGING,
  POSE_CLING,
  POSE_WIN,
  CH_HIP_FLEX_L,
  CH_KNEE_L,
  CH_KNEE_R,
  CH_SCARF,
  CH_SHOULDER_FLEX_L,
  CH_SWING_PITCH,
  CH_SWING_ROLL,
  DEAD,
  GROUNDED,
  HERO_GRIP_H,
  POSE_AIR,
  POSE_BRAKE,
  POSE_COUNT,
  POSE_DEAD,
  POSE_HANG,
  POSE_IDLE,
  POSE_ROLL,
  POSE_RUN,
  VAULTING,
  newHeroPoseInput,
  newHeroPoseState,
  runCadence,
  stepHeroPose,
} from '../../src/adapters/render/heroPose';
import type { HeroPoseInput, HeroPoseState } from '../../src/adapters/render/heroPose';
import { HERO_HANGING, HERO_VAULT } from '../../src/core/hero';
import {
  AE_ATTACH,
  AE_JUMP,
  AE_LAND,
  AE_MANTLE,
  AE_RELEASE,
} from '../../src/adapters/render/animEvents';
import {
  applyHeroChannels,
  HERO_COLORS,
  HeroRig,
  updateHeroRig,
} from '../../src/adapters/render/heroRig';

const DT = 1 / 60;

function run(st: HeroPoseState, inp: HeroPoseInput, seconds: number): void {
  inp.dt = DT;
  const n = Math.round(seconds / DT);
  for (let i = 0; i < n; i++) stepHeroPose(st, inp, 0);
}

function weightSum(st: HeroPoseState): number {
  let s = 0;
  for (let i = 0; i < POSE_COUNT; i++) s += st.weights[i];
  return s;
}

describe('heroPose blending', () => {
  it('first step snaps to the target pose', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    run(st, inp, DT);
    expect(st.weights[POSE_IDLE]).toBe(1);
  });

  it('converges monotonically to a new pose and keeps weights normalised', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    run(st, inp, 0.5);
    inp.state = AIRBORNE;
    inp.vy = -3;
    stepHeroPose(st, inp, 0);
    const first = st.weights[POSE_AIR];
    expect(first).toBeGreaterThan(0);
    expect(first).toBeLessThan(0.5); // blends, does not snap
    let last = first;
    for (let i = 0; i < 60; i++) {
      stepHeroPose(st, inp, 0);
      expect(st.weights[POSE_AIR]).toBeGreaterThanOrEqual(last);
      expect(weightSum(st)).toBeCloseTo(1, 9);
      last = st.weights[POSE_AIR];
    }
    expect(st.weights[POSE_AIR]).toBeGreaterThan(0.999);
    // Channels converge onto the air row.
    for (let c = 0; c < CH_COUNT; c++) {
      if (c === CH_SCARF || c === CH_HEM_PITCH || c === CH_HEM_ROLL) continue;
      expect(st.channels[c]).toBeCloseTo(st.rows[POSE_AIR * CH_COUNT + c], 2);
    }
  });

  it('selects every pose from the input', () => {
    const cases: [Partial<HeroPoseInput>, number][] = [
      [{ state: GROUNDED, speed: 0 }, POSE_IDLE],
      [{ state: GROUNDED, speed: 5 }, POSE_RUN],
      [{ state: AIRBORNE }, POSE_AIR],
      [{ state: ATTACHED }, POSE_HANG],
      [{ state: ATTACHED, brake: true }, POSE_BRAKE],
      [{ state: GROUNDED, rolling: true, speed: 6 }, POSE_ROLL],
      [{ state: DEAD }, POSE_DEAD],
    ];
    for (let i = 0; i < cases.length; i++) {
      const st = newHeroPoseState();
      const inp = Object.assign(newHeroPoseInput(), cases[i][0]);
      run(st, inp, 1);
      expect(st.active).toBe(cases[i][1]);
      expect(st.weights[cases[i][1]]).toBeGreaterThan(0.99);
    }
  });

  it('roll turns a full circle and ends upright', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.rolling = true;
    inp.speed = 6;
    run(st, inp, 0.2);
    expect(Math.abs(st.channels[CH_BODY_PITCH])).toBeGreaterThan(2.5);
    run(st, inp, 0.4);
    expect(st.channels[CH_BODY_PITCH]).toBeCloseTo(0, 3);
  });

  it('rope hang leans the body toward a hook ahead', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.state = ATTACHED;
    inp.ropeDirY = Math.cos(0.3);
    inp.ropeDirZ = Math.sin(0.3);
    run(st, inp, 1);
    expect(st.channels[CH_SWING_PITCH]).toBeGreaterThan(0.25);
  });
});

describe('heroPose run cycle', () => {
  it('phase advances with speed and stands still at zero speed', () => {
    const phaseAfter = (speed: number): number => {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.speed = speed;
      run(st, inp, 0.2);
      return st.phase;
    };
    expect(phaseAfter(0)).toBe(0);
    const slow = phaseAfter(2);
    const fast = phaseAfter(7);
    expect(slow).toBeGreaterThan(0);
    expect(fast).toBeGreaterThan(slow);
    // Exactly cadence * time (0.2 s stays inside one cycle at these speeds).
    expect(fast).toBeCloseTo(runCadence(7) * 0.2, 6);
    expect(runCadence(8)).toBeGreaterThan(runCadence(4));
  });
});

describe('heroPose dead', () => {
  it('is terminal while dead: other inputs do not move it', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.speed = 6;
    run(st, inp, 0.5);
    inp.state = DEAD;
    run(st, inp, 2.5);
    expect(st.weights[POSE_DEAD]).toBeGreaterThan(0.9999);
    const settled = Array.from(st.channels);
    inp.rolling = true;
    inp.brake = true;
    inp.speed = 12;
    inp.vy = -9;
    inp.ropeDirZ = 0.8;
    run(st, inp, 1);
    expect(st.active).toBe(POSE_DEAD);
    for (let c = 0; c < CH_COUNT; c++) expect(st.channels[c]).toBeCloseTo(settled[c], 3);
  });

  it('respawn (leaving dead) snaps straight to the live pose', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.state = DEAD;
    run(st, inp, 1);
    inp.state = GROUNDED;
    inp.speed = 0;
    run(st, inp, DT);
    expect(st.weights[POSE_IDLE]).toBe(1);
    expect(st.weights[POSE_DEAD]).toBe(0);
  });
});

describe('heroRig', () => {
  it('stays tiny: under 1500 triangles, one material per colour', () => {
    let tris = 0;
    let meshes = 0;
    const mats = new Set<Material>();
    new HeroRig().root.traverse((o) => {
      if (o instanceof Mesh) {
        meshes++;
        const g = o.geometry;
        tris += (g.index ? g.index.count : g.attributes.position.count) / 3;
        mats.add(o.material as Material);
      }
    });
    expect(tris).toBeLessThan(1500);
    if (tris > 1100) console.warn(`hero tris ${tris} above 1100 target`);
    expect(Object.keys(HERO_COLORS)).toEqual([
      'tunic',
      'trousers',
      'crimson',
      'skin',
      'hair',
      'leather',
    ]);
    // ADR 0009: one SkinnedMesh per material, not one mesh per part.
    expect(meshes).toBeLessThanOrEqual(6);
    const colours = Object.keys(HERO_COLORS).length;
    expect(colours).toBe(6);
    expect(mats.size).toBe(colours);
    // A second rig reuses the same materials.
    new HeroRig().root.traverse((o) => {
      if (o instanceof Mesh) mats.add(o.material as Material);
    });
    expect(mats.size).toBe(colours);
  });

  it('tunic never reads as skin', () => {
    const t = { h: 0, s: 0, l: 0 };
    const k = { h: 0, s: 0, l: 0 };
    new Color(HERO_COLORS.tunic).getHSL(t, SRGBColorSpace);
    new Color(HERO_COLORS.skin).getHSL(k, SRGBColorSpace);
    expect(t.s).toBeLessThanOrEqual(0.28);
    expect(k.s).toBeGreaterThanOrEqual(0.35);
    expect(Math.abs(t.l - k.l)).toBeGreaterThanOrEqual(0.2);
    let dh = Math.abs(t.h - k.h) * 360;
    if (dh > 180) dh = 360 - dh;
    expect(dh).toBeGreaterThanOrEqual(20);
    const rig = new HeroRig();
    let tunicMat: Material | null = null;
    rig.root.traverse((o) => {
      if (o instanceof Mesh) {
        const m = o.material as MeshStandardMaterial;
        if (m.color.getHexString() === HERO_COLORS.tunic.slice(1)) tunicMat = m;
      }
    });
    expect(tunicMat).not.toBeNull();
    expect((tunicMat as unknown as MeshStandardMaterial).emissiveIntensity).toBeLessThanOrEqual(
      0.12,
    );
  });

  it('hero body colours contrast with the cream pads and roofs (ADR 0009)', () => {
    const lum = (hex: string): number => {
      const c = new Color(hex); // sRGB hex -> linear working space
      return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    };
    const ratio = (a: string, b: string): number => {
      const [hi, lo] = [Math.max(lum(a), lum(b)), Math.min(lum(a), lum(b))];
      return (hi + 0.05) / (lo + 0.05);
    };
    for (const bg of ['#f1e9d2', '#d9c6aa', '#b9a68c']) {
      expect(ratio(HERO_COLORS.tunic, bg)).toBeGreaterThanOrEqual(3);
      expect(ratio(HERO_COLORS.trousers, bg)).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps the tunic off the head and gloves on both hands', () => {
    // Parts are skinned: each vertex is weighted to the joint it hung off before packing.
    const rig = new HeroRig();
    const skinned = new Map<string, Mesh>();
    rig.root.traverse((o) => {
      if (o instanceof Mesh)
        skinned.set((o.material as MeshStandardMaterial).color.getHexString(), o);
    });
    const bones = (skinned.get(HERO_COLORS.tunic.slice(1)) as SkinnedMesh).skeleton.bones;
    const used = (m: Mesh): Set<Object3D> => {
      const idx = m.geometry.getAttribute('skinIndex');
      const out = new Set<Object3D>();
      for (let i = 0; i < idx.count; i++) out.add(bones[idx.getX(i)]);
      return out;
    };
    expect(used(skinned.get(HERO_COLORS.tunic.slice(1)) as Mesh).has(rig.head)).toBe(false);
    const leather = used(skinned.get(HERO_COLORS.leather.slice(1)) as Mesh);
    expect(leather.has(rig.handL)).toBe(true);
    expect(leather.has(rig.handR)).toBe(true);
  });

  it('updateHeroRig writes the pose to the joints', () => {
    const rig = new HeroRig();
    const inp = newHeroPoseInput();
    inp.state = ATTACHED;
    inp.dt = DT;
    for (let i = 0; i < 60; i++) updateHeroRig(rig, inp);
    expect(rig.shoulderL.rotation.x).toBeLessThan(-2.5); // arms overhead
  });
});

// Hand centres in the rig root frame (origin at the feet).
const handPos = new Vector3();
function hands(rig: HeroRig): number[] {
  rig.root.updateMatrixWorld(true);
  const out: number[] = [];
  for (const h of [rig.handL, rig.handR]) {
    h.getWorldPosition(handPos);
    out.push(handPos.x, handPos.y, handPos.z);
  }
  return out;
}

function hangRig(speed: number, ropeTilt: number, yawRate: number, seconds: number): HeroRig {
  const rig = new HeroRig();
  const inp = newHeroPoseInput();
  inp.state = ATTACHED;
  inp.speed = speed;
  inp.vy = -2;
  inp.ropeDirY = Math.cos(ropeTilt);
  inp.ropeDirZ = Math.sin(ropeTilt);
  inp.dt = DT;
  const n = Math.round(seconds / DT);
  for (let i = 0; i < n; i++) {
    rig.yaw = yawRate * i * DT;
    updateHeroRig(rig, inp);
  }
  return rig;
}

describe('heroPose hang (ADR 0005 D7)', () => {
  it('both hands sit on the trolley point whatever the speed, sway and lean', () => {
    const cases: [number, number, number, number][] = [
      [0, 0, 0, 1],
      [6, 0.3, 0, 1.3],
      [14, -0.2, 0.8, 2.1],
      [20, 0.5, -1.2, 3.7],
    ];
    for (const [speed, tilt, yawRate, secs] of cases) {
      const p = hands(hangRig(speed, tilt, yawRate, secs));
      for (const v of p) expect(Number.isFinite(v)).toBe(true);
      // The grip (midpoint of the hands) is on the trolley point; swing roll
      // tilts the pair about it like a handle, so each hand stays within its
      // half-gap of the pivot.
      expect(Math.abs((p[0] + p[3]) / 2)).toBeLessThan(0.01);
      expect(Math.abs((p[1] + p[4]) / 2 - HERO_GRIP_H)).toBeLessThan(0.01);
      expect(Math.abs((p[2] + p[5]) / 2)).toBeLessThan(0.01);
      for (let h = 0; h < 2; h++) {
        const dx = p[3 * h];
        const dy = p[3 * h + 1] - HERO_GRIP_H;
        const dz = p[3 * h + 2];
        expect(Math.sqrt(dx * dx + dy * dy + dz * dz)).toBeLessThan(0.08);
      }
      expect(Math.abs(p[0] - p[3])).toBeGreaterThan(0.06); // two hands, not one
      expect(p[0]).toBeGreaterThan(p[3]); // left hand on the left
    }
  });

  it('arms are up with only a slight bend, knees tucked', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.state = ATTACHED;
    run(st, inp, 1);
    expect(st.channels[CH_SHOULDER_FLEX_L]).toBeGreaterThan(2.6);
    expect(st.channels[CH_ELBOW_L]).toBeGreaterThan(0.05);
    expect(st.channels[CH_ELBOW_L]).toBeLessThan(0.7);
    expect(st.channels[CH_KNEE_L]).toBeGreaterThan(0.8);
    expect(st.channels[CH_KNEE_R]).toBeGreaterThan(0.8);
  });

  it('sways more and trails the legs more at rope speed than at rest', () => {
    const range = (speed: number, ch: number): number => {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.state = ATTACHED;
      inp.speed = speed;
      run(st, inp, 1); // settle the spring
      let lo = Infinity;
      let hi = -Infinity;
      for (let i = 0; i < 180; i++) {
        stepHeroPose(st, inp, 0);
        lo = Math.min(lo, st.channels[ch]);
        hi = Math.max(hi, st.channels[ch]);
      }
      return hi - lo;
    };
    expect(range(0, CH_SWING_PITCH)).toBeGreaterThan(0.01); // never frozen
    expect(range(12, CH_SWING_PITCH)).toBeGreaterThan(2 * range(0, CH_SWING_PITCH));
    expect(range(12, CH_HIP_FLEX_L)).toBeGreaterThan(range(0, CH_HIP_FLEX_L));
  });

  it('leans away from a turn (roll opposes the yaw rate)', () => {
    const roll = (yawRate: number): number => {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.state = ATTACHED;
      inp.speed = 12;
      inp.dt = DT;
      for (let i = 0; i < 60; i++) stepHeroPose(st, inp, yawRate * i * DT);
      return st.channels[CH_SWING_ROLL];
    };
    expect(roll(0)).toBeCloseTo(0, 6);
    expect(roll(1)).toBeLessThan(-0.15);
    expect(roll(-1)).toBeGreaterThan(0.15);
    expect(Math.abs(roll(20))).toBeLessThanOrEqual(0.35 + 1e-9); // capped
  });

  it('streams the scarf further back at rope speed', () => {
    const scarf = (speed: number): number => {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.state = ATTACHED;
      inp.speed = speed;
      run(st, inp, 1);
      return st.channels[CH_SCARF];
    };
    expect(scarf(12)).toBeGreaterThan(scarf(1) + 0.6);
  });

  it('is deterministic: same inputs, same channels', () => {
    const a = hangRig(11, 0.2, 0.5, 2.3).pose.channels;
    const b = hangRig(11, 0.2, 0.5, 2.3).pose.channels;
    for (let c = 0; c < CH_COUNT; c++) {
      expect(Number.isFinite(a[c])).toBe(true);
      expect(a[c]).toBe(b[c]);
    }
  });
});

// ---- ADR 0007 animation layer (H1-H12) ----
function settle(inp: HeroPoseInput, seconds: number): HeroPoseState {
  const st = newHeroPoseState();
  run(st, inp, seconds);
  return st;
}

// Step n frames, with `ev` on the first frame only; returns channel traces.
function trace(
  setup: (i: HeroPoseInput) => void,
  ev: number,
  impact: number,
  ch: number,
  seconds: number,
  pre = 1,
): { st: HeroPoseState; v: number[] } {
  const inp = newHeroPoseInput();
  setup(inp);
  const st = settle(inp, pre);
  inp.events = ev;
  inp.impact = impact;
  const v: number[] = [];
  const n = Math.round(seconds / DT);
  for (let i = 0; i < n; i++) {
    stepHeroPose(st, inp, 0);
    inp.events = 0;
    v.push(st.channels[ch]);
  }
  return { st, v };
}

describe('heroPose animation layer', () => {
  it('H1 constants', () => {
    expect(CH_COUNT).toBe(25);
    expect(POSE_COUNT).toBe(9);
    expect(CLINGING).toBe(HERO_HANGING);
  });

  it('H2 idle breathing', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.dt = DT;
    const v: number[] = [];
    for (let i = 0; i < 480; i++) {
      stepHeroPose(st, inp, 0);
      v.push(st.channels[CH_SPINE_PITCH]);
    }
    const ptp = Math.max(...v) - Math.min(...v);
    expect(ptp).toBeGreaterThan(0.04);
    expect(ptp).toBeLessThan(0.07);
    const mx: number[] = [];
    for (let i = 1; i < v.length - 1; i++) if (v[i] > v[i - 1] && v[i] >= v[i + 1]) mx.push(i * DT);
    expect(mx.length).toBeGreaterThanOrEqual(2);
    expect(Math.abs(mx[1] - mx[0] - 3.57)).toBeLessThan(0.2);
  });

  it('H3 hem trails when running and follows through on stop', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.speed = 8;
    inp.dt = DT;
    let sum = 0;
    let signs = 0;
    let last = 0;
    for (let i = 0; i < 120; i++) {
      stepHeroPose(st, inp, 0);
      sum += st.channels[CH_HEM_PITCH];
      const r = st.channels[CH_HEM_ROLL];
      if (i > 30 && r * last < 0) signs++;
      last = r;
    }
    expect(sum / 120).toBeLessThan(-0.08);
    expect(signs).toBeGreaterThanOrEqual(2);
    inp.speed = 0;
    let peak = -1;
    for (let i = 0; i < 30; i++) {
      stepHeroPose(st, inp, 0);
      peak = Math.max(peak, st.channels[CH_HEM_PITCH]);
    }
    expect(peak).toBeGreaterThan(0.005);
    for (let i = 0; i < 60; i++) stepHeroPose(st, inp, 0);
    expect(Math.abs(st.channels[CH_HEM_PITCH])).toBeLessThan(0.01);
  });

  it('H4 jump overlay', () => {
    const base = trace(() => {}, 0, 0, CH_SQUASH, 0.4).v;
    const { v } = trace(() => {}, AE_JUMP, 0, CH_SQUASH, 0.4);
    expect(v[3]).toBeGreaterThanOrEqual(0.09);
    expect(v[7]).toBeLessThanOrEqual(-0.07);
    expect(Math.abs(v[16] - base[16])).toBeLessThan(1e-6);
  });

  it('H5 landing overlay scales with impact', () => {
    const base = trace(() => {}, 0, 0, CH_SQUASH, 0.6).v;
    const hard = trace(() => {}, AE_LAND, 11, CH_SQUASH, 0.6).v;
    expect(Math.max(...hard)).toBeCloseTo(0.14, 1);
    expect(Math.max(...hard) - Math.max(...base)).toBeGreaterThan(0.13);
    const hips = trace(() => {}, AE_LAND, 11, CH_HIPS_Y, 0.6).v;
    const hips0 = trace(() => {}, 0, 0, CH_HIPS_Y, 0.6).v;
    let dip = 0;
    for (let i = 0; i < hips.length; i++) dip = Math.min(dip, hips[i] - hips0[i]);
    expect(dip).toBeLessThanOrEqual(-0.2);
    const soft = trace(() => {}, AE_LAND, 2, CH_SQUASH, 0.6).v;
    for (let i = 0; i < soft.length; i++) expect(Math.abs(soft[i] - base[i])).toBeLessThan(1e-9);
  });

  it('H6b a long rope kicks the swing harder than a short one', () => {
    const kick = (ropeLen: number): number => {
      const inp = newHeroPoseInput();
      inp.state = ATTACHED;
      inp.speed = 10;
      inp.ropeLen = ropeLen;
      inp.dt = 0;
      const st = settle(inp, 0);
      const before = st.swingVel;
      inp.events = AE_ATTACH;
      stepHeroPose(st, inp, 0);
      return st.swingVel - before;
    };
    expect(kick(34)).toBeGreaterThan(kick(20));
    expect(kick(20)).toBeGreaterThan(kick(6));
  });

  it('H6 attach kicks the swing velocity', () => {
    const inp = newHeroPoseInput();
    inp.state = ATTACHED;
    inp.speed = 10;
    inp.dt = 0;
    const st = settle(inp, 0);
    const before = st.swingVel;
    inp.dt = 0;
    inp.events = AE_ATTACH;
    stepHeroPose(st, inp, 0);
    expect(st.swingVel - before).toBeCloseTo(1.2, 6);
  });

  it('H7 hook reach points the right arm at the rope', () => {
    const inp = newHeroPoseInput();
    inp.hookFlying = 1;
    inp.ropeDirY = Math.SQRT1_2;
    inp.ropeDirZ = Math.SQRT1_2;
    const st = settle(inp, 0.3);
    expect(Math.abs(st.channels[CH_SHOULDER_FLEX_R] - 2.356)).toBeLessThan(0.05);
  });

  it('H8 release overlay', () => {
    const base = trace(() => {}, 0, 0, CH_SHOULDER_FLEX_L, 0.5).v;
    const { v } = trace(() => {}, AE_RELEASE, 0, CH_SHOULDER_FLEX_L, 0.5);
    expect(v[0] - base[0]).toBeCloseTo(1.6, 1);
    expect(Math.abs(v[21] - base[21])).toBeLessThan(1e-6);
  });

  it('H9 cling state selects the cling pose', () => {
    const inp = newHeroPoseInput();
    inp.state = CLINGING;
    expect(settle(inp, 0.5).active).toBe(POSE_CLING);
  });

  it('H10 death rows', () => {
    const crumple = (cause: number): HeroPoseState => {
      const inp = newHeroPoseInput();
      inp.state = DEAD;
      inp.deadCause = cause;
      return settle(inp, 2);
    };
    const hard = crumple(3);
    expect(hard.channels[CH_HIPS_Y]).toBeCloseTo(-0.55, 2);
    expect(hard.channels[CH_BODY_PITCH]).toBeCloseTo(1.2, 2);
    const wall = crumple(2);
    expect(wall.channels[CH_HIPS_Y]).toBeCloseTo(-0.8, 2);
    expect(wall.channels[CH_BODY_PITCH]).toBeCloseTo(-1.45, 2);
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.dt = DT;
    for (let i = 0; i < 30; i++) stepHeroPose(st, inp, 0);
    inp.state = DEAD;
    for (let i = 0; i < 6; i++) stepHeroPose(st, inp, 0);
    expect(st.weights[POSE_DEAD]).toBeLessThan(0.6);
  });

  it('H11 win pose raises both arms', () => {
    const inp = newHeroPoseInput();
    inp.win = 1;
    inp.dt = DT;
    const st = newHeroPoseState();
    let l = 0;
    let r = 0;
    for (let i = 0; i < 180; i++) {
      stepHeroPose(st, inp, 0);
      if (i >= 60) {
        l += st.channels[CH_SHOULDER_FLEX_L];
        r += st.channels[CH_SHOULDER_FLEX_R];
      }
    }
    expect(st.active).toBe(POSE_WIN);
    expect(l / 120).toBeGreaterThan(2.2);
    expect(r / 120).toBeGreaterThan(2.2);
  });

  it('H12 rig squash, hem, ground contact and finite output', () => {
    const rig = new HeroRig();
    const ch = new Float64Array(CH_COUNT);
    ch[CH_SQUASH] = 0.1;
    ch[CH_HEM_PITCH] = -0.2;
    ch[CH_HEM_ROLL] = 0.1;
    applyHeroChannels(rig, ch);
    expect(rig.body.scale.x).toBeCloseTo(1.05, 9);
    expect(rig.body.scale.y).toBeCloseTo(0.9, 9);
    expect(rig.body.scale.z).toBeCloseTo(1.05, 9);
    expect(rig.yoke.rotation.x).toBeCloseTo(-0.2, 9);
    expect(rig.yoke.rotation.z).toBeCloseTo(0.1, 9);

    const setups: Partial<HeroPoseInput>[] = [
      { state: DEAD, deadCause: 3 },
      { state: DEAD, deadCause: 2 },
      { state: DEAD, deadCause: 1 },
      { win: 1 },
      { state: CLINGING },
    ];
    const p = new Vector3();
    for (const s of setups) {
      const r = new HeroRig();
      const inp = Object.assign(newHeroPoseInput(), s);
      inp.dt = DT;
      for (let i = 0; i < 180; i++) updateHeroRig(r, inp);
      r.root.updateMatrixWorld(true);
      r.root.traverse((o) => {
        if (o === r.root) return;
        o.getWorldPosition(p);
        if (o.children.length > 0 || o instanceof Mesh) {
          expect(p.y).toBeGreaterThanOrEqual(-0.05);
        }
      });
    }

    const all = AE_JUMP | AE_LAND | AE_RELEASE | AE_ATTACH | 32 | 64;
    for (const dt of [0, 0.1]) {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.dt = dt;
      inp.hookFlying = 1;
      for (let i = 0; i < 30; i++) {
        inp.events = i % 3 === 0 ? all : 0;
        inp.impact = 11;
        stepHeroPose(st, inp, 0);
        for (let c = 0; c < CH_COUNT; c++) expect(Number.isFinite(st.channels[c])).toBe(true);
      }
    }
  });
});

describe('heroPose parkour (ADR 0013)', () => {
  it('VAULTING mirrors the core mode and tucks the lead knee over time', () => {
    expect(VAULTING).toBe(HERO_VAULT);
    const base = newHeroPoseInput();
    base.state = GROUNDED;
    base.speed = 5;
    const run0 = settle(base, 0.5);
    const inp = newHeroPoseInput();
    inp.state = VAULTING;
    inp.speed = 5;
    const st = settle(inp, 0.3);
    expect(st.vaultW).toBeGreaterThan(0.9);
    expect(st.channels[CH_KNEE_L]).toBeGreaterThan(run0.channels[CH_KNEE_L]);
    expect(st.channels[CH_SPINE_PITCH]).toBeGreaterThan(0.3);
    expect(weightSum(st)).toBeCloseTo(1, 6);
  });

  it('the vault blend fades out after the vault ends', () => {
    const inp = newHeroPoseInput();
    inp.state = VAULTING;
    inp.speed = 5;
    const st = settle(inp, 0.3);
    inp.state = AIRBORNE;
    run(st, inp, 0.6);
    expect(st.vaultW).toBeLessThan(0.01);
  });

  it('sliding leans the body back and drops the hips; off the ground it does not', () => {
    const inp = newHeroPoseInput();
    inp.state = GROUNDED;
    inp.speed = 6;
    inp.sliding = true;
    const st = settle(inp, 0.4);
    expect(st.slideW).toBeGreaterThan(0.9);
    expect(st.channels[CH_BODY_PITCH]).toBeLessThan(-0.6);
    expect(st.channels[CH_HIPS_Y]).toBeLessThan(-0.3);
    inp.state = AIRBORNE;
    run(st, inp, 0.6);
    expect(st.slideW).toBeLessThan(0.01);
  });

  it('AE_MANTLE plays a climb-up: hips start well below rest and rise back', () => {
    const { v } = trace(
      (i) => {
        i.state = GROUNDED;
      },
      AE_MANTLE,
      0,
      CH_HIPS_Y,
      0.6,
    );
    const rest = v[v.length - 1];
    expect(v[0]).toBeLessThan(rest - 0.6);
    for (let i = 1; i < 18; i++) expect(v[i]).toBeGreaterThanOrEqual(v[i - 1] - 1e-9);
    expect(Math.abs(v[v.length - 1] - rest)).toBeLessThan(1e-6);
  });

  it('all channels stay finite through vault, slide and mantle', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.dt = DT;
    for (let i = 0; i < 120; i++) {
      inp.state = i < 40 ? VAULTING : GROUNDED;
      inp.sliding = i >= 60;
      inp.events = i === 41 ? AE_MANTLE : 0;
      stepHeroPose(st, inp, 0);
      for (let c = 0; c < CH_COUNT; c++) expect(Number.isFinite(st.channels[c])).toBe(true);
    }
  });
});
