import { InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three';
import type { Group } from 'three';
import { describe, expect, it } from 'vitest';
import { demoStreet, hillRow, homeStreet } from '../../src/content/house/demoStreet';
import { HK, windowSlots } from '../../src/content/house/houseSpec';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
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

/** Instanced meshes (by short name) that `look` adds or grows compared with the default look. */
function addedBy(g: Group, base: Group): string[] {
  const a = counts(g);
  const b = counts(base);
  return Object.keys(a).filter((k) => a[k] > (b[k] ?? 0));
}

describe("look: 'home' (H4 hay cover)", () => {
  const home = homeStreet();
  const off = buildHouseDecor(home.houses, home.props);
  const on = buildHouseDecor(home.houses, home.props, 1, { look: 'home' });
  const boxesOf = (g: Group): HouseDecorBox[] => g.userData.boxes as HouseDecorBox[];

  it('is off by default: an explicit empty option equals no option, and no cover is drawn', () => {
    const empty = buildHouseDecor(home.houses, home.props, 1, {});
    expect(JSON.stringify(empty.userData.boxes)).toBe(JSON.stringify(off.userData.boxes));
    expect(counts(empty)).toEqual(counts(off));
    expect(boxesOf(off).some((b) => b.kind === 'hayCover')).toBe(false);
  });

  it('leaves the valley-1 decor identical with the option off', () => {
    const placed = placeGraph(loadGraph('valley-1'));
    const a = buildHouseDecor(placed.houses, placed.props, 7);
    const b = buildHouseDecor(placed.houses, placed.props, 7, {});
    expect(counts(b)).toEqual(counts(a));
    expect(JSON.stringify(b.userData.boxes)).toBe(JSON.stringify(a.userData.boxes));
    expect((a.userData.boxes as HouseDecorBox[]).some((x) => x.kind === 'hayCover')).toBe(false);
  });

  it('draws a tin cap and straw bands on each hay stack only with the option on', () => {
    const hay = home.props.filter((p) => p.kind === 'hay').length;
    expect(hay).toBeGreaterThan(0);
    expect(boxesOf(on).filter((b) => b.kind === 'hayCover')).toHaveLength(hay);
    expect(counts(on).trim ?? 0).toBe((counts(off).trim ?? 0) + 3 * hay);
    expect(counts(on).crate).toBe(counts(off).crate); // body and the other props untouched
    expect((on.userData.stats as HouseDecorStats).refused).toBe(0);
  });

  it('keeps the cushion height: the cover rises at most 2 cm over the hay top', () => {
    const hay = home.props.find((p) => p.kind === 'hay')!;
    const cover = boxesOf(on).find((b) => b.kind === 'hayCover')!;
    expect(cover.max[1]).toBeLessThanOrEqual(hay.groundY + HK.hayTop + 0.02 + 1e-9);
  });

  it('hides the cover on Low: everything the look adds is a piece Low hides', () => {
    const added = addedBy(on, off);
    expect(added.length).toBeGreaterThan(0);
    for (const id of added) expect(LOW_HIDDEN_DECOR, id).toContain('decor_' + id);
  });
});
