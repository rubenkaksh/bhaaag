import { describe, expect, it } from 'vitest';
import { demoStreet, hillRow, homeStreet } from '../../src/content/house/demoStreet';
import { emitHouse, emitProp, newDraft } from '../../src/content/house/houseKit';
import {
  HK,
  balconyRails,
  deckY,
  expectedWindowCount,
  parapetSegments,
  shopOpenings,
  windowSlots,
} from '../../src/content/house/houseSpec';
import type { Face, HouseSpec } from '../../src/content/house/houseSpec';
import { loadWorldFromObject } from '../../src/content/load';

function mk(over: Partial<HouseSpec>): HouseSpec {
  return {
    id: 1,
    cx: 0,
    cz: 0,
    groundY: 0,
    storeys: 1,
    party: [false, false, false, false],
    balcony: -1,
    stairs: null,
    awnings: [],
    takeoff: [],
    pole: false,
    tall: [],
    ...over,
  };
}

function emit(h: HouseSpec): ReturnType<typeof newDraft> {
  const d = newDraft();
  emitHouse(h, d);
  return d;
}

describe('house kit v2 emitters (ADR 0013 s1)', () => {
  it('deck heights are exactly 3.2 and 6.0 over ground', () => {
    expect(deckY(mk({ storeys: 1 }))).toBe(3.2);
    expect(deckY(mk({ storeys: 2 }))).toBe(6.0);
    expect(deckY(mk({ storeys: 2, groundY: -10 }))).toBe(-4.0);
    const d = emit(mk({ storeys: 2, groundY: 5 }));
    expect(d.solids[0].max[1]).toBe(11);
    expect(d.solids[0].min[1]).toBe(3); // 2 m into the hill
    expect(d.solids[0].max[0] - d.solids[0].min[0]).toBe(8);
  });

  it('rejects storeys outside {1, 2} and features on party faces', () => {
    expect(() => emit(mk({ storeys: 3 as unknown as 1 }))).toThrow();
    expect(() => emit(mk({ party: [true, false, false, false], awnings: [0] }))).toThrow();
    expect(() => emit(mk({ storeys: 1, balcony: 2 }))).toThrow();
    expect(() => emit(mk({ storeys: 2, stairs: { face: 2, to: 'roof' } }))).toThrow();
    expect(() => emit(mk({ takeoff: [1], tall: [1] }))).toThrow();
  });

  it('parapets: none on party sides or over the balcony, heights only 0.45 or 1.2', () => {
    const h = mk({
      storeys: 2,
      party: [true, false, false, false],
      balcony: 2,
      takeoff: [1],
      tall: [3],
    });
    expect(parapetSegments(h, 0)).toEqual([]);
    for (const [a, b] of parapetSegments(h, 2)) {
      expect(b <= -1.7 + 1e-9 || a >= 1.7 - 1e-9).toBe(true);
    }
    const d = emit(h);
    const hs = new Set<number>();
    for (let i = 1; i < d.solids.length; i++) {
      if (d.style[i] !== 4) continue;
      const v = +(d.solids[i].max[1] - d.solids[i].min[1]).toFixed(6);
      if (v > 0.3 && d.solids[i].min[1] >= deckY(h) - 1e-6) hs.add(v);
    }
    for (const v of hs) expect([0.45, 1.2]).toContain(v);
    expect(hs.has(0.45) && hs.has(1.2)).toBe(true);
  });

  it('parapet strips never overlap each other', () => {
    const d = emit(mk({ storeys: 1, party: [false, true, false, false] }));
    const ps = d.solids.filter((_, i) => d.style[i] === 4);
    expect(ps.length).toBeGreaterThan(0);
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i];
        const b = ps[j];
        const ov =
          a.min[0] < b.max[0] - 1e-6 &&
          b.min[0] < a.max[0] - 1e-6 &&
          a.min[2] < b.max[2] - 1e-6 &&
          b.min[2] < a.max[2] - 1e-6;
        expect(ov).toBe(false);
      }
    }
  });

  it('balcony top is 2.8 below a 2-storey deck; rail 0.9 high with a 1.0 gap toward stairs', () => {
    const h = mk({ storeys: 2, balcony: 2, stairs: { face: 2, to: 'balcony' } });
    const d = emit(h);
    const deck = d.solids[d.style.indexOf(5)];
    expect(deckY(h) - deck.max[1]).toBeCloseTo(2.8, 6);
    expect(deck.max[1] - deck.min[1]).toBeCloseTo(0.2, 6);
    expect(deck.max[2] - deck.min[2]).toBeCloseTo(1.2, 6);
    expect(deck.max[0] - deck.min[0]).toBeCloseTo(3, 6);
    for (let i = 1; i < d.solids.length; i++) {
      if (d.style[i] === 4 && d.solids[i].min[1] < 4) {
        expect(d.solids[i].max[1] - d.solids[i].min[1]).toBeCloseTo(0.9, 6);
      }
    }
    const rr = balconyRails(h);
    expect(rr.find((r) => r.s0 > 0)!.d0).toBe(HK.half + 1.0);
    expect(rr.find((r) => r.s1 < 0)!.d0).toBe(HK.half);
    expect(balconyRails(mk({ storeys: 2, balcony: 2 })).find((r) => r.s0 > 0)!.d0).toBe(HK.half);
  });

  it('stairs and awnings emit ramps with the ADR slopes and slip flags', () => {
    const d = emit(
      mk({ storeys: 2, balcony: 2, stairs: { face: 2, to: 'balcony' }, awnings: [3] }),
    );
    const [stairs, awning] = d.ramps;
    expect(stairs.slip).toBe(0);
    expect(stairs.rise).toBeCloseTo(3.2, 6);
    expect(stairs.slopeAxis).toBe(0); // face +z runs -x, so the wall end is at +x
    expect(stairs.max[0] - stairs.min[0]).toBeCloseTo(4.57, 6);
    expect(stairs.max[2] - stairs.min[2]).toBeCloseTo(1, 6);
    expect(Math.atan2(3.2, 4.57) * (180 / Math.PI)).toBeCloseTo(35, 0);
    expect(awning.slip).toBe(1);
    expect(awning.rise).toBeCloseTo(0.5, 6);
    expect(awning.slopeAxis).toBe(2); // face -z: high edge at the wall, toward +z
    expect(awning.min[1]).toBeCloseTo(2.2, 6);
    expect(awning.max[1]).toBeCloseTo(2.7, 6);
    expect(Math.atan2(0.5, 1.5) * (180 / Math.PI)).toBeGreaterThan(15); // roof.slipDeg
  });

  it('vaultable tops are inside (0.4, 1.1]; the 1.2 parapet is above it', () => {
    const d = emit(mk({ storeys: 2, balcony: 2, takeoff: [3], tall: [0] }));
    const heights: number[] = [];
    for (let i = 1; i < d.solids.length; i++) {
      if (d.style[i] === 4) heights.push(d.solids[i].max[1] - d.solids[i].min[1]);
    }
    for (const hgt of heights) {
      if (hgt > 1) expect(hgt).toBeGreaterThan(1.1);
      else {
        expect(hgt).toBeGreaterThan(0.4);
        expect(hgt).toBeLessThanOrEqual(1.1);
      }
    }
    expect(heights.some((v) => v > 1.1)).toBe(true);
    const p = newDraft();
    emitProp({ kind: 'crate', x: 0, z: 0, groundY: 2, yaw: 0 }, p);
    const top = p.solids[0].max[1] - 2;
    expect(top).toBeGreaterThan(0.4);
    expect(top).toBeLessThanOrEqual(1.1);
  });

  it('windows: count equals the formula; every exposed face has one per storey', () => {
    const { houses } = demoStreet();
    for (const h of [...houses, ...homeStreet().houses, ...hillRow(3, 20)]) {
      const slots = windowSlots(h);
      expect(slots.length, 'house ' + h.id).toBe(expectedWindowCount(h));
      let n = 0;
      for (let f = 0; f < 4; f++) {
        if (h.party[f]) {
          expect(slots.some((s) => s.face === f)).toBe(false);
          continue;
        }
        for (let st = 0; st < h.storeys; st++) {
          const here = slots.filter((s) => s.face === f && s.storey === st).length;
          const shop = st === 0 && shopOpenings(h).some((o) => o.face === f) ? 1 : 0;
          expect(here + shop, `house ${h.id} face ${f} storey ${st}`).toBeGreaterThanOrEqual(1);
          n += 2;
        }
        if (h.awnings.indexOf(f as Face) >= 0) n -= 2;
        if (h.stairs !== null && h.stairs.face === f) n -= 1;
      }
      expect(slots.length).toBe(n);
    }
  });

  it('depends on the spec only: moving a house moves its solids and changes nothing else', () => {
    const a = mk({ storeys: 2, balcony: 3, awnings: [2], takeoff: [0] });
    const b = { ...a, cz: 50, groundY: -20 };
    const da = emit(a);
    const db = emit(b);
    expect(db.solids.length).toBe(da.solids.length);
    for (let i = 0; i < da.solids.length; i++) {
      expect(db.solids[i].min[0]).toBe(da.solids[i].min[0]);
      expect(db.solids[i].min[2]).toBeCloseTo(da.solids[i].min[2] + 50, 5);
      expect(db.solids[i].max[1] - db.solids[i].min[1]).toBeCloseTo(
        da.solids[i].max[1] - da.solids[i].min[1],
        5,
      );
    }
    expect(JSON.stringify(emit(a))).toBe(JSON.stringify(emit(a)));
  });

  it('storeys never follow altitude: 200 seeds, top third vs bottom third within 0.25', () => {
    let topSum = 0;
    let botSum = 0;
    let cnt = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const row = hillRow(seed, 18);
      for (let i = 0; i < 6; i++) {
        topSum += row[i].storeys;
        botSum += row[12 + i].storeys;
        cnt++;
      }
    }
    expect(Math.abs(topSum / cnt - botSum / cnt)).toBeLessThanOrEqual(0.25);
  });

  it('props: slabs sit on solids and match the sim slab convention', () => {
    for (const kind of ['boxPile', 'hay', 'tramp'] as const) {
      const d = newDraft();
      emitProp({ kind, x: 1, z: 2, groundY: 3, yaw: 0 }, d);
      const slab = (kind === 'tramp' ? d.tramps : d.cushions)[0];
      expect(slab.max[1]).toBe(d.solids[0].max[1]);
      expect(slab.max[1] - slab.min[1]).toBeCloseTo(0.02, 6);
    }
    const tops: Record<string, number> = { tramp: 0.5, hay: 0.9, boxPile: 0.8 };
    for (const kind of Object.keys(tops) as ('tramp' | 'hay' | 'boxPile')[]) {
      const d = newDraft();
      emitProp({ kind, x: 0, z: 0, groundY: 0, yaw: 0 }, d);
      expect(d.solids[0].max[1]).toBe(tops[kind]);
    }
  });

  it('the demo street loads as a parkour level and no solids overlap', () => {
    const { houses, props } = demoStreet();
    const d = newDraft();
    for (const h of houses) emitHouse(h, d);
    for (const p of props) emitProp(p, d);
    expect(d.style.length).toBe(d.solids.length);
    for (let i = 0; i < d.solids.length; i++) {
      for (let j = i + 1; j < d.solids.length; j++) {
        const a = d.solids[i];
        const b = d.solids[j];
        const ov = [0, 1, 2].every((k) => a.min[k] < b.max[k] - 1e-6 && b.min[k] < a.max[k] - 1e-6);
        expect(ov, `solids ${i} and ${j} overlap`).toBe(false);
      }
    }
    const w = loadWorldFromObject({
      version: 1,
      spawn: [0, 7, 0],
      spawnYaw: 0,
      killPlaneY: -60,
      solids: d.solids,
      ramps: d.ramps,
      anchors: d.anchors,
      style: d.style,
      lineOnly: 1,
      climb: 1,
      parkour: 1,
      tramps: d.tramps,
      cushions: d.cushions,
    });
    expect(w.solids.length).toBe(d.solids.length);
    expect(w.ramps.some((r) => r.slip === 1)).toBe(true);
    expect(w.parkour).toBe(1);
    expect(d.anchors.length).toBe(2);
  });

  it('the home street (H2): valid houses, no overlapping solids, loads as a parkour level', () => {
    const { houses, props, ground } = homeStreet();
    expect(houses.length).toBeGreaterThanOrEqual(5);
    const d = newDraft();
    for (const h of houses) emitHouse(h, d); // validateHouse inside
    for (const p of props) emitProp(p, d);
    for (let i = 0; i < d.solids.length; i++) {
      for (let j = i + 1; j < d.solids.length; j++) {
        const a = d.solids[i];
        const b = d.solids[j];
        const ov = [0, 1, 2].every((k) => a.min[k] < b.max[k] - 1e-6 && b.min[k] < a.max[k] - 1e-6);
        expect(ov, `solids ${i} and ${j} overlap`).toBe(false);
      }
    }
    // touching houses agree about their shared wall
    for (const a of houses) {
      for (const b of houses) {
        if (a.id !== b.id && a.cz === b.cz && b.cx - a.cx === 8) {
          expect(a.party[0] && b.party[1], `houses ${a.id} and ${b.id}`).toBe(true);
        }
      }
    }
    // the ground slabs stay out of the house bodies
    for (const g of ground) {
      for (const s of d.solids.slice(0, 1))
        expect(g.max[2] <= s.min[2] || g.min[2] >= s.max[2]).toBe(true);
    }
    const w = loadWorldFromObject({
      version: 1,
      spawn: [0, 7, 0],
      spawnYaw: 0,
      killPlaneY: -60,
      solids: [...d.solids, ...ground],
      ramps: d.ramps,
      anchors: d.anchors,
      style: [...d.style, ...ground.map(() => 0)],
      lineOnly: 1,
      climb: 1,
      parkour: 1,
      tramps: d.tramps,
      cushions: d.cushions,
    });
    expect(w.parkour).toBe(1);
    expect(w.cushions.length).toBe(2); // hay + box pile
    expect(w.ramps.filter((r) => r.slip === 1).length).toBe(2); // A1 and B1 awnings
  });
});
