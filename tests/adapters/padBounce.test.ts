import { describe, expect, it } from 'vitest';
import { Group, Mesh } from 'three';
import {
  PAD_SQUASH_SEC,
  PadBounce,
  cushionUnder,
  padScaleXZ,
  padScaleY,
} from '../../src/adapters/render/padBounce';
import {
  GROUNDED,
  CH_SQUASH,
  newHeroPoseInput,
  newHeroPoseState,
  stepHeroPose,
} from '../../src/adapters/render/heroPose';
import { AE_CUSHION, AE_LAND } from '../../src/adapters/render/animEvents';

describe('padScaleY', () => {
  it('rests at 1 before, after and at zero amplitude', () => {
    expect(padScaleY(0, 1)).toBe(1);
    expect(padScaleY(PAD_SQUASH_SEC, 1)).toBe(1);
    expect(padScaleY(0.2, 0)).toBeCloseTo(1, 9);
  });
  it('compresses fast, then rebounds past rest and settles', () => {
    expect(padScaleY(0.09, 1)).toBeLessThan(0.5);
    let max = 0;
    for (let t = 0.1; t < PAD_SQUASH_SEC; t += 0.01) max = Math.max(max, padScaleY(t, 1));
    expect(max).toBeGreaterThan(1.005);
    expect(padScaleXZ(0.5)).toBeGreaterThan(1);
  });
});

describe('cushionUnder', () => {
  const pad = { min: { x: 0, y: 5, z: 0 }, max: { x: 5, y: 5.02, z: 5 } };
  it('finds the slab under the feet', () => {
    expect(cushionUnder([pad], 2, 2, 5.02, 0.1)).toBe(0);
    expect(cushionUnder([pad], 9, 2, 5.02, 0.1)).toBe(-1);
    expect(cushionUnder([pad], 2, 2, 9, 0.1)).toBe(-1);
  });
});

describe('PadBounce', () => {
  it('squashes the triggered pad mesh and restores it', () => {
    const root = new Group();
    const m = new Mesh();
    m.userData.padSlab = { index: 0, cx: 2, cz: 2, base: 5 };
    root.add(m);
    const pb = new PadBounce(root);
    pb.trigger(0, 1);
    pb.update(0.09);
    expect(m.scale.y).toBeLessThan(0.5);
    pb.update(PAD_SQUASH_SEC);
    expect(m.scale.y).toBe(1);
    expect(m.position.y).toBe(0);
    pb.trigger(-1, 1); // no pad: ignored
  });
});

describe('cushion landing pose', () => {
  it('absorbs deeply even from a tiny fall', () => {
    const run = (ev: number): number => {
      const st = newHeroPoseState();
      const inp = newHeroPoseInput();
      inp.state = GROUNDED;
      inp.dt = 1 / 60;
      inp.events = ev;
      inp.impact = 0.5;
      let peak = 0;
      for (let i = 0; i < 20; i++) {
        stepHeroPose(st, inp, 0);
        inp.events = 0;
        peak = Math.max(peak, st.channels[CH_SQUASH]);
      }
      return peak;
    };
    expect(run(AE_LAND | AE_CUSHION)).toBeGreaterThan(run(AE_LAND) + 0.05);
  });
});
