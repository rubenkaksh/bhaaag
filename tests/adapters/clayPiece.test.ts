import { describe, expect, it } from 'vitest';
import { DecorKit, HOME_CLAY_PIECE } from '../../src/adapters/render/decor/kit';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';
import { TEXTURE_MANIFEST } from '../../src/adapters/render/textureManifest';
import { demoStreet, hillRow } from '../../src/content/house/demoStreet';

describe('clay roof tile piece', () => {
  it('is its own mesh in look home, with clay maps per tier', () => {
    const kit = new DecorKit(10, true);
    const clay = kit.meshes[HOME_CLAY_PIECE];
    expect(clay.name).toBe('decor_homeClay');
    expect(clay.userData.tierMaps.low.map).toBe('roof_clay_128');
    expect(clay.userData.tierMaps.rich.map).toBe('roof_clay');
    expect(clay.userData.tierMaps.hideOnLow).toBeUndefined();
  });

  it("leaves the shared 'roof' piece on roof_home", () => {
    const kit = new DecorKit(10, true);
    expect(kit.meshes.roof.name).toBe('decor_homeRoof');
    expect(kit.meshes.roof.userData.tierMaps.rich.map).toBe('roof_home');
    expect(kit.meshes.roof).not.toBe(kit.meshes[HOME_CLAY_PIECE]);
  });

  it('default look has no clay mesh or tier maps', () => {
    const kit = new DecorKit(10, false);
    expect(kit.meshes[HOME_CLAY_PIECE].name).toBe('decor_planter');
    expect(kit.meshes[HOME_CLAY_PIECE].userData.tierMaps).toBeUndefined();
  });

  it('eave skirts land on the clay mesh, not on roof', () => {
    const street = demoStreet();
    const g = buildHouseDecor(
      hillRow(4, 20).map((h, i) => ({
        ...h,
        eave: i < 2,
        roof: i === 3 ? ('gable' as const) : h.roof,
      })),
      street.props,
      1,
      { look: 'home' },
    );
    const byName = (n: string) =>
      g.children.find((m) => m.name === n) as { count: number } | undefined;
    expect(byName('decor_homeClay')?.count ?? 0).toBeGreaterThan(0);
    const kinds = (g.userData.boxes as { kind: string }[]).map((b) => b.kind);
    expect(kinds).toContain('eave');
    expect(kinds).toContain('gable');
    expect(byName('decor_homeRoof')).toBeUndefined();
  });

  it('manifest: clay on Medium/High, 128 px on Low only', () => {
    const t = (f: string) => TEXTURE_MANIFEST.find((m) => m.file === f)?.tiers;
    expect(t('roof_clay.jpg')).toEqual(['medium', 'high']);
    expect(t('roof_clay_128.jpg')).toEqual(['low']);
  });
});
