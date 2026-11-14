import { Color, InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three';
import type { Group } from 'three';
import { describe, expect, it } from 'vitest';
import { demoStreet, hillRow, homeStreet } from '../../src/content/house/demoStreet';
import { HK, deckY, faceRect, poleAnchor, windowSlots } from '../../src/content/house/houseSpec';
import { loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { PIECE_IDS } from '../../src/adapters/render/decor/kit';
import { LOW_HIDDEN_DECOR } from '../../src/adapters/render/graphicsTier';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';
import type { HouseDecorBox, HouseDecorStats } from '../../src/adapters/render/decor/houseV2';
import type { Face, HouseSpec, PropSpec, Rect } from '../../src/content/house/houseSpec';

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
      'decor_homeTank', // look 'home' only; v1 levels never create it
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

describe("look: 'home' (H5 tin awnings)", () => {
  const street = demoStreet();
  const awningColours = (g: Group): string[] => {
    const cornice = g.getObjectByName('decor_cornice') as InstancedMesh;
    const m = new Matrix4();
    const q = new Quaternion();
    const p = new Vector3();
    const s = new Vector3();
    const col = new Color();
    const out: string[] = [];
    for (let i = 0; i < cornice.count; i++) {
      cornice.getMatrixAt(i, m);
      m.decompose(p, q, s);
      if (new Vector3(0, 1, 0).applyQuaternion(q).y >= 0.99) continue; // not an awning
      cornice.getColorAt(i, col);
      out.push('#' + col.getHexString());
    }
    return out;
  };

  it('tints every awning one flat tin colour with the option on, and keeps the kit palette off', () => {
    const off = awningColours(buildHouseDecor(street.houses, street.props));
    const on = awningColours(buildHouseDecor(street.houses, street.props, 1, { look: 'home' }));
    expect(off.length).toBeGreaterThan(1);
    expect(on).toHaveLength(off.length);
    expect(new Set(on).size).toBe(1);
    expect(new Set(off).size).toBeGreaterThan(1);
    expect(on[0]).not.toBe(off[0]);
  });

  it('changes no instance counts (a colour, not a new piece)', () => {
    const off = buildHouseDecor(street.houses, street.props);
    const on = buildHouseDecor(street.houses, street.props, 1, { look: 'home' });
    expect(counts(on).cornice).toBe(counts(off).cornice);
  });
});

describe("look: 'home' (H6 rooftop water tanks)", () => {
  const placed = placeGraph(loadGraph('valley-1'));
  const fixtures: { name: string; houses: HouseSpec[]; props: PropSpec[]; zones: Rect[] }[] = [
    {
      name: 'valley-1',
      houses: placed.houses,
      props: placed.props,
      zones: placed.edges
        .filter((e) => e.zone !== undefined)
        .map((e) => ({
          x0: e.zone![0] - 1.5,
          x1: e.zone![0] + 1.5,
          z0: e.zone![2] - 1.5,
          z1: e.zone![2] + 1.5,
        })),
    },
    { name: 'hillRow', houses: hillRow(3, 40), props: [], zones: [] },
  ];
  const overlap = (a: Rect, b: Rect): boolean =>
    a.x0 < b.x1 && a.x1 > b.x0 && a.z0 < b.z1 && a.z1 > b.z0;
  const rectOf = (b: HouseDecorBox): Rect => ({
    x0: b.min[0],
    x1: b.max[0],
    z0: b.min[2],
    z1: b.max[2],
  });

  it('puts tanks on some 2-storey decks only, never with the option off', () => {
    let total = 0;
    for (const f of fixtures) {
      const off = buildHouseDecor(f.houses, f.props, 4);
      expect(counts(off).homeTank ?? 0, f.name).toBe(0);
      const on = buildHouseDecor(f.houses, f.props, 4, { look: 'home' });
      const tanks = (on.userData.boxes as HouseDecorBox[]).filter((b) => b.kind === 'tank');
      expect(counts(on).homeTank ?? 0, f.name).toBe(tanks.length);
      total += tanks.length;
      for (const t of tanks) {
        const h = f.houses.find((x) => x.id === t.house)!;
        expect(h.storeys).toBe(2);
        expect(t.min[1]).toBeCloseTo(deckY(h), 6);
      }
      const twoStorey = f.houses.filter((x) => x.storeys === 2).length;
      expect(tanks.length, f.name).toBeLessThan(twoStorey); // "some", not all
      expect((on.userData.stats as HouseDecorStats).refused).toBe(0);
    }
    expect(total).toBeGreaterThan(0);
  });

  it('keeps every tank off line zones, takeoff strips, run-out strips, party edges and poles', () => {
    for (const f of fixtures) {
      const on = buildHouseDecor(f.houses, f.props, 4, { look: 'home' });
      const tanks = (on.userData.boxes as HouseDecorBox[]).filter((b) => b.kind === 'tank');
      for (const t of tanks) {
        const h = f.houses.find((x) => x.id === t.house)!;
        const tr = rectOf(t);
        for (const z of f.zones) expect(overlap(tr, z), f.name + ' zone').toBe(false);
        // independent of tankKeepOut: 2.5 m strips along the edges a runner leaves by
        const k = HK.half;
        for (let fc = 0; fc < 4; fc++) {
          const run = (h.runout ?? []).some((r) => r.face === fc);
          if (!h.takeoff.includes(fc as Face) && !run && !h.party[fc]) continue;
          expect(overlap(tr, faceRect(h, fc as Face, -k, k, k - 2.5, k)), f.name + ' strip').toBe(
            false,
          );
        }
        if (h.pole) {
          const a = poleAnchor(h);
          expect(overlap(tr, { x0: a[0] - 1, x1: a[0] + 1, z0: a[2] - 1, z1: a[2] + 1 })).toBe(
            false,
          );
        }
        // inside the parapet ring
        expect(tr.x0).toBeGreaterThanOrEqual(h.cx - k + HK.parapetThick);
        expect(tr.x1).toBeLessThanOrEqual(h.cx + k - HK.parapetThick);
      }
    }
  });

  it('adds no solids: tanks are decor boxes only and the level JSON is unchanged', () => {
    const before = JSON.stringify(placed.level);
    buildHouseDecor(placed.houses, placed.props, placed.seed, { look: 'home' });
    expect(JSON.stringify(placeGraph(loadGraph('valley-1')).level)).toBe(before);
  });

  it('hides tanks on Low through the home-only mesh', () => {
    expect(LOW_HIDDEN_DECOR).toContain('decor_homeTank');
    expect(LOW_HIDDEN_DECOR).not.toContain('decor_tank'); // v1 tanks are unchanged
  });
});
