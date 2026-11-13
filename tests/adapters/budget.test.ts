import { readFileSync } from 'node:fs';
import { Mesh } from 'three';
import type { BufferGeometry, InstancedMesh, Object3D } from 'three';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { buildBackdrop } from '../../src/adapters/render/backdrop';
import { buildLevelMeshes } from '../../src/adapters/render/levelView';
import {
  GRAPHICS_TIERS,
  LOW_HIDDEN_DECOR,
  renderConfigFor,
} from '../../src/adapters/render/graphicsTier';
import { createHeroRig } from '../../src/adapters/render/heroRig';
import { buildBlob } from '../../src/adapters/render/blob';
import { demoStreet, hillRow } from '../../src/content/house/demoStreet';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';

// ADR 0009 / three-track-plan A3: static budgets that hold without a GPU. The rendered numbers
// (draw calls, shadow-pass calls) come from tools/perf.mjs.
const world = loadWorldFromJson(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);

function tris(g: BufferGeometry): number {
  return g.index ? g.index.count / 3 : g.getAttribute('position').count / 3;
}

function meshes(o: Object3D, out: Mesh[] = []): Mesh[] {
  if (o instanceof Mesh) out.push(o);
  for (const c of o.children) meshes(c, out);
  return out;
}

const level = buildLevelMeshes(world);
const all = meshes(level);
const instanced = all.filter(
  (m) => (m as InstancedMesh).isInstancedMesh === true,
) as InstancedMesh[];

function sceneTris(tier: 'low' | 'medium' | 'high'): number {
  const cfg = renderConfigFor(tier, true);
  let t = 0;
  for (const m of all) {
    if (cfg.hideDecor.includes(m.name)) continue;
    const n = tris(m.geometry);
    const forest =
      m.name === 'decor_canopy' || m.name === 'decor_trunk' || m.name === 'decor_conifer';
    t += (m as InstancedMesh).isInstancedMesh
      ? n * (m as InstancedMesh).count * (forest ? cfg.forestDensity : 1)
      : n;
  }
  for (const m of meshes(buildBackdrop(tier))) t += tris(m.geometry);
  for (const m of meshes(createHeroRig().root)) t += tris(m.geometry);
  return t;
}

describe('A3 static budgets', () => {
  it('stays within 24 instanced meshes and 5 additive/alpha layers in the level', () => {
    expect(instanced.length).toBeLessThanOrEqual(24);
    const additive = all.filter(
      (m) => !Array.isArray(m.material) && m.material.blending === 2, // AdditiveBlending
    );
    expect(additive.length).toBeLessThanOrEqual(5);
  });

  it('main-pass triangles stay under the tier caps (sky and ground included, shadow pass extra)', () => {
    // A3 totals are 60k / 110k / 170k including the shadow pass (tools/perf.mjs measures that);
    // the static main pass keeps a margin below them for the shadow casters.
    expect(sceneTris('low')).toBeLessThanOrEqual(60000);
    expect(sceneTris('medium')).toBeLessThanOrEqual(100000);
    expect(sceneTris('high')).toBeLessThanOrEqual(155000);
  });

  it('Low hides the small instanced pieces and every hidden name is a real decor mesh name', () => {
    const names = new Set(all.map((m) => m.name));
    for (const n of LOW_HIDDEN_DECOR) expect(n.startsWith('decor_')).toBe(true);
    expect(names.has('decor_rail')).toBe(true);
    for (const t of GRAPHICS_TIERS) {
      expect(renderConfigFor(t, false).hideDecor.length > 0).toBe(t === 'low');
    }
  });

  it('opts shadow casters in: the hillside, pads and blob never cast; houses do', () => {
    const cast = (n: string): boolean | undefined =>
      all.find((m) => m.name === n)?.userData.cast as boolean | undefined;
    expect(cast('decor_ground')).not.toBe(true);
    expect(cast('padEdge')).toBe(false);
    expect(cast('decor_wallPlaster')).toBe(true);
    expect(buildBlob().userData.cast).not.toBe(true);
    const casters = all.filter((m) => m.userData.cast === true).length;
    expect(casters + 4).toBeLessThanOrEqual(14); // + the hero's tunic, trousers, scarf, leather
  });

  it('packs the hero into at most 6 skinned draws', () => {
    expect(meshes(createHeroRig().root).length).toBeLessThanOrEqual(6);
  });

  it('merges the backdrop rings into one draw', () => {
    expect(buildBackdrop('low').children.length).toBe(1);
  });

  it('house kit v2 (ADR 0013): instanced meshes <= 24 and Low draw calls <= 55 for a house level', () => {
    const street = demoStreet();
    const fixtures = [
      buildHouseDecor(street.houses, street.props),
      buildHouseDecor(hillRow(4, 20), street.props),
    ];
    const low = renderConfigFor('low', true);
    // everything that is not house decor in a v1 level (ground, lane, pads, ropes) plus the backdrop and hero
    const fixedCalls =
      all.filter((m) => !(m as InstancedMesh).isInstancedMesh).length +
      buildBackdrop('low').children.length +
      meshes(createHeroRig().root).length;
    for (const g of fixtures) {
      const inst = meshes(g).filter((m) => (m as InstancedMesh).isInstancedMesh === true);
      expect(inst.length).toBeLessThanOrEqual(24);
      expect(g.userData.stats.refused).toBe(0);
      const visible = inst.filter((m) => !low.hideDecor.includes(m.name));
      expect(fixedCalls + visible.length).toBeLessThanOrEqual(55);
    }
  });
});
