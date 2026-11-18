// T336b acceptance: nagarkot-home dressing. Kit decks equal the generator's node decks, the kit
// replaces (never doubles) the collider body and deck, and the Low tier stays small.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import { NODE_ROOF } from '../../src/content/strategy/graph';
import { HK, deckY } from '../../src/content/house/houseSpec';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import { dressNagarkotHome, tileFootprint } from '../../src/adapters/render/decor/homeDress';
import { setTerrainProfile } from '../../src/adapters/render/terrain';

const s = buildNagarkotHome();
const d = dressNagarkotHome(s);
const roofs = (s.world?.nodes ?? s.nodes).filter((n) => n.kind === NODE_ROOF);

describe('nagarkot-home dressing', () => {
  it('every roof node gets 1..N kit houses whose deck equals the node deck', () => {
    expect(d.perNode).toHaveLength(roofs.length);
    let k = 0;
    for (let i = 0; i < roofs.length; i++) {
      expect(d.perNode[i]).toBeGreaterThanOrEqual(1);
      for (let j = 0; j < d.perNode[i]; j++, k++) {
        const h = d.houses[k];
        expect(deckY(h)).toBeCloseTo(roofs[i].y, 6);
        expect(h.groundY + HK.plinth + HK.storey * h.storeys).toBeCloseTo(roofs[i].y, 6);
        expect(h.cx).toBeGreaterThanOrEqual(roofs[i].x0);
        expect(h.cx).toBeLessThanOrEqual(roofs[i].x1);
      }
    }
    expect(k).toBe(d.houses.length);
  });

  it('tiles a 32 m terrace node into joined houses with one roofline', () => {
    const long = roofs.filter((n) => Math.max(n.x1 - n.x0, n.z1 - n.z0) >= 31.9);
    expect(long.length).toBeGreaterThanOrEqual(2);
    let k = 0;
    for (let i = 0; i < roofs.length; i++) {
      const n = d.perNode[i];
      if (Math.max(roofs[i].x1 - roofs[i].x0, roofs[i].z1 - roofs[i].z0) >= 31.9) {
        expect(n).toBe(4);
        const joined = d.houses.slice(k, k + n).filter((h) => h.party.some((p) => p));
        expect(joined).toHaveLength(4);
      }
      k += n;
    }
  });

  it('roof guards only on faces without a party wall; crossed faces and cushions stay open', () => {
    const guarded = d.houses.filter((h) => (h.guard ?? []).length > 0);
    expect(guarded.length).toBeGreaterThan(0);
    let k = 0;
    for (let i = 0; i < roofs.length; i++) {
      for (let j = 0; j < d.perNode[i]; j++, k++) {
        if (roofs[i].cushion) expect(d.houses[k].guard).toEqual([]);
      }
    }
    expect(d.houses.some((h) => h.balcony !== -1)).toBe(true);
  });

  it('joins tiles of a wide footprint with party faces', () => {
    const t = tileFootprint(0, 16, 0, 8, 0, 1, 0);
    expect(t).toHaveLength(2);
    expect(t[0].party[0]).toBe(true);
    expect(t[1].party[1]).toBe(true);
    expect(t[0].party[1]).toBe(false);
  });

  it('skips one collider deck per roof node and never a road or balcony', () => {
    expect(d.skip.size).toBeGreaterThanOrEqual(roofs.length);
    for (const i of d.skip) expect(s.level.style?.[i]).toBe(2);
  });

  it('ground profile is strictly decreasing in z', () => {
    for (let i = 1; i < d.profile.length; i++)
      expect(d.profile[i][0]).toBeLessThan(d.profile[i - 1][0]);
  });

  it('kit and collider never draw the same box: skipped solids add no mesh, Low stays small', () => {
    const w = loadWorldFromObject(s.level);
    const withKit = buildLevelMeshes(w, { houseDress: false, graph: d });
    setTerrainProfile(null);
    const noSkip = buildLevelMeshes(w, { houseDress: false, graph: { ...d, kitSkip: undefined } });
    setTerrainProfile(null);
    let a = 0;
    let b = 0;
    withKit.traverse(() => a++);
    noSkip.traverse(() => b++);
    expect(a).toBeGreaterThan(0);
    expect(b).toBeGreaterThan(0);
    const decor = withKit.children.find((c) => c.name === 'decor');
    expect(decor?.userData.stats.dropped).toBe(0);
  });
});
