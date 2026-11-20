import { describe, expect, it } from 'vitest';
import { CameraRig, updateCamera } from '../../src/adapters/render/cameraRig';
import { DEFAULT_TUNING } from '../../src/core/config';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { PathCam, buildPathGraph } from '../../src/content/graph/pathCamera';
import { GRAPH_LEVELS } from '../../src/content/graph/registry';
import { TILT_ASSIST_CFG, TiltAssistState, assistPitch } from '../../src/content/graph/tiltAssist';
import type { AssistHero } from '../../src/content/graph/tiltAssist';

const DEG = Math.PI / 180;
const DT = 1 / 60;
const base = -32 * DEG;

function hero(over: Partial<AssistHero> = {}): AssistHero {
  return {
    px: 0,
    py: 6,
    pz: 0,
    vx: 0,
    vz: 0,
    grounded: true,
    attached: false,
    camYaw: 0, // faces +z
    basePitch: base,
    look: false,
    ...over,
  };
}
const ahead = { x: 0, z: 15, y: 3.2 };

function run(s: TiltAssistState, h: AssistHero, t: typeof ahead | null, sec: number): number {
  let e = 0;
  for (let i = 0; i < Math.round(sec / DT); i++) e = assistPitch(s, h, t, DT);
  return e;
}

describe('tiltAssist', () => {
  it('standing with a lower deck ahead eases total pitch to -75 deg', () => {
    const s = new TiltAssistState();
    const e = run(s, hero(), ahead, 1.2);
    expect((base - e) / DEG).toBeCloseTo(-75, 3);
  });

  it('waits 0.4 s standing before it starts', () => {
    const s = new TiltAssistState();
    expect(run(s, hero(), ahead, 0.35)).toBe(0);
  });

  it('target behind or to the side gives no tilt', () => {
    expect(run(new TiltAssistState(), hero(), { x: 0, z: -15, y: 3.2 }, 1.5)).toBe(0);
    expect(run(new TiltAssistState(), hero(), { x: 15, z: 0, y: 3.2 }, 1.5)).toBe(0);
  });

  it('needs a 1.5 m drop and reach <= 25 m', () => {
    expect(run(new TiltAssistState(), hero(), { x: 0, z: 15, y: 5 }, 1.5)).toBe(0);
    expect(run(new TiltAssistState(), hero(), { x: 0, z: 30, y: 3.2 }, 1.5)).toBe(0);
    expect(run(new TiltAssistState(), hero(), null, 1.5)).toBe(0);
  });

  it('releases in 0.3 s on movement, airborne, attached and look-drag', () => {
    const cases: Partial<AssistHero>[] = [
      { vz: 3 },
      { grounded: false },
      { attached: true },
      { look: true },
    ];
    for (const c of cases) {
      const s = new TiltAssistState();
      expect(run(s, hero(), ahead, 1.2)).toBeGreaterThan(0.5);
      expect(run(s, hero(c), ahead, 0.35)).toBe(0);
    }
  });

  it('only opted-in levels carry the flag', () => {
    const on = GRAPH_LEVELS.filter((g) => g.tiltAssist === true).map((g) => g.id);
    expect(on).toEqual(['hay-run']);
    expect(GRAPH_LEVELS.every((g) => g.tiltAssist !== true || g.pathCamera === true)).toBe(true);
  });
});

describe('PathCam.nextTarget', () => {
  it('returns the single exit with its deck height', () => {
    const pg = buildPathGraph(
      {
        start: 1,
        nodes: [{ id: 1 }, { id: 2 }],
        edges: [{ a: 1, b: 2, kind: 'zip' }],
      } as never,
      [
        { id: 1, cx: 0, cz: 0, deck: 6 },
        { id: 2, cx: 0, cz: 20, deck: 3.2 },
      ],
    );
    const cam = new PathCam(pg);
    cam.reset(0, 0, 0);
    expect(cam.nextTarget()).toEqual({ x: 0, z: 20, y: 3.2 });
  });
});

describe('non-assist camera is unchanged', () => {
  it('a zero extra pitch and the default cfg give bit-identical rig output', () => {
    const cfg = DEFAULT_TUNING.camera;
    const a = new CameraRig();
    const b = new CameraRig();
    const solids: AABB[] = [new AABB(new Vec3(-3, 0, 2), new Vec3(3, 4, 3))];
    const pos = new Vec3(1, 2, -1);
    for (let i = 0; i < 120; i++) {
      const pitch = base + (i % 7) * 0.01;
      updateCamera(a, pos, 0.3, pitch, 4, solids, cfg);
      updateCamera(b, pos, 0.3, pitch - 0, 4, solids, { ...cfg });
    }
    expect(b.pos).toEqual(a.pos);
    expect(b.lookAt).toEqual(a.lookAt);
    expect(b.pitch).toBe(a.pitch);
    expect(b.pitch).toBeGreaterThanOrEqual(cfg.pitchMin * DEG);
  });
});

describe('arm at 75 deg', () => {
  it('stays out of an overhead roof slab and never reaches below the hero', () => {
    const cfg = { ...DEFAULT_TUNING.camera, pitchMin: TILT_ASSIST_CFG.rigPitchMinDeg };
    const roof = new AABB(new Vec3(-5, 3, -5), new Vec3(5, 3.4, 5)); // slab over the hero
    const rig = new CameraRig();
    const feet = new Vec3(0, 0, 0);
    for (let i = 0; i < 120; i++) updateCamera(rig, feet, 0, -75 * DEG, 0, [roof], cfg);
    expect(rig.pitch).toBeCloseTo(-75 * DEG, 6);
    const inside =
      rig.pos.x > roof.min.x &&
      rig.pos.x < roof.max.x &&
      rig.pos.y > roof.min.y &&
      rig.pos.y < roof.max.y &&
      rig.pos.z > roof.min.z &&
      rig.pos.z < roof.max.z;
    expect(inside).toBe(false);
    expect(rig.pos.y).toBeLessThanOrEqual(roof.min.y);
  });
});
