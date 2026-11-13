import { InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three';
import type { Group } from 'three';
import { describe, expect, it } from 'vitest';
import { demoStreet, hillRow } from '../../src/content/house/demoStreet';
import { windowSlots } from '../../src/content/house/houseSpec';
import { PIECE_IDS } from '../../src/adapters/render/decor/kit';
import { LOW_HIDDEN_DECOR } from '../../src/adapters/render/graphicsTier';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';
import type { HouseDecorBox, HouseDecorStats } from '../../src/adapters/render/decor/houseV2';
import type { PropSpec } from '../../src/content/house/houseSpec';

function counts(g: Group): Record<string, number> {
  const out: Record<string, number> = {};
  g.traverse((o) => {
    if (o instanceof InstancedMesh) out[o.name.replace('decor_', '')] = o.count;
  });
  return out;
}

const street = demoStreet();
const demo = buildHouseDecor(street.houses, street.props);
const stats = demo.userData.stats as HouseDecorStats;

describe('houseV2 renderer (ADR 0013 s1.4)', () => {
  it('draws the demo street with nothing refused and at most 24 instanced meshes', () => {
    expect(stats.refused).toBe(0);
    const c = counts(demo);
    expect(Object.keys(c).length).toBeLessThanOrEqual(24);
    expect(PIECE_IDS.length).toBeLessThanOrEqual(24);
    for (const id of [
      'wallPlaster',
      'wallBrick',
      'window',
      'parapet',
      'deck',
      'guard',
      'cornice',
      'stair',
      'crate',
    ]) {
      expect(c[id] ?? 0, id).toBeGreaterThan(0);
    }
  });

  it('draws one window per slot (plus shop openings and balcony doors) and 16 treads per flight', () => {
    let slots = 0;
    let flights = 0;
    for (const h of street.houses) {
      slots += windowSlots(h).length;
      if (h.stairs !== null) flights++;
    }
    expect(stats.windows).toBe(slots);
    const c = counts(demo);
    expect(c.window).toBe(slots + stats.shops + stats.doors);
    expect(c.stair).toBe(16 * flights);
  });

  it('draws every prop kind: crate 1, box pile 2, hay 1, tramp 2 crate instances', () => {
    expect(counts(demo).crate).toBe(1 + 2 + 1 + 2);
    const boxes = demo.userData.boxes as HouseDecorBox[];
    for (const k of [
      'crate',
      'boxPile',
      'hay',
      'tramp',
      'awning',
      'balcony',
      'pole',
      'shop',
      'door',
    ]) {
      expect(
        boxes.some((b) => b.kind === k),
        k,
      ).toBe(true);
    }
  });

  it('draws awnings tilted (pitched about their own axis), not flat', () => {
    const cornice = demo.getObjectByName('decor_cornice') as InstancedMesh;
    const m = new Matrix4();
    const q = new Quaternion();
    const p = new Vector3();
    const s = new Vector3();
    let tilted = 0;
    for (let i = 0; i < cornice.count; i++) {
      cornice.getMatrixAt(i, m);
      m.decompose(p, q, s);
      const up = new Vector3(0, 1, 0).applyQuaternion(q);
      if (up.y < 0.99) tilted++;
    }
    expect(tilted).toBe(street.houses.reduce((n, h) => n + h.awnings.length, 0));
  });

  it('stays visible on Low: parapets, decks, stairs and crates are never hidden', () => {
    for (const id of ['parapet', 'deck', 'stair', 'crate', 'wallPlaster']) {
      expect(LOW_HIDDEN_DECOR).not.toContain('decor_' + id);
    }
  });

  it('is deterministic and independent of the seed for geometry counts', () => {
    const again = buildHouseDecor(street.houses, street.props);
    expect(JSON.stringify(again.userData.boxes)).toBe(JSON.stringify(demo.userData.boxes));
  });

  it('a 20-house fixture with props refuses nothing', () => {
    const houses = hillRow(11, 20);
    const props: PropSpec[] = [];
    for (let i = 0; i < 12; i++) {
      const kinds = ['crate', 'boxPile', 'hay', 'tramp'] as const;
      props.push({ kind: kinds[i % 4], x: i * 3, z: -9 - i, groundY: -i, yaw: 0 });
    }
    const g = buildHouseDecor(houses, props, 5);
    const st = g.userData.stats as HouseDecorStats;
    expect(st.refused).toBe(0);
    expect(st.houses).toBe(20);
    // the 90 % margin the v1 budget test uses
    const caps = { window: 500, shutter: 120, parapet: 120, deck: 56, guard: 340, cornice: 100 };
    const c = counts(g);
    for (const [id, cap] of Object.entries(caps))
      expect(c[id] ?? 0, id).toBeLessThanOrEqual(0.9 * cap);
  });
});

describe('Low tier hidden pieces (review M4)', () => {
  it('v1 Low output is unchanged: v1 rails stay hidden, v2 balcony rails (guard) stay visible', () => {
    expect(LOW_HIDDEN_DECOR).toEqual([
      'decor_rail',
      'decor_canopy',
      'decor_bracket',
      'decor_pot',
      'decor_planter',
      'decor_shutter',
      'decor_flag',
      'decor_trim',
      'decor_strings',
      'decor_birds',
    ]);
    expect(LOW_HIDDEN_DECOR).not.toContain('decor_guard');
    expect(counts(demo).guard ?? 0).toBeGreaterThan(0);
  });
});
