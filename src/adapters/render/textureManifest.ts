import type { GraphicsTier } from './graphicsTier';

/**
 * Every runtime-loaded texture file under public/assets/textures and the tiers that fetch it
 * (owner decision 2026-11-15: Low 150 KB, Medium 300 KB, High 600 KB of runtime-loaded textures).
 * tests/adapters/textureBudget.test.ts sums the file sizes per tier from this list and fails on a
 * shipped file that is not listed. Add a row here when a texture starts loading; `tiers: []` means
 * shipped but never loaded.
 *
 * The six wall/roof/stone tiles (colour + normal) are fetched eagerly on every tier (the normal
 * map is only applied on High, but the file is still requested). The look 'home' files load only
 * on Medium/High through render/homeTextures.ts applyTierMaps; their normals only on High.
 */
export type TextureEntry = { file: string; tiers: readonly GraphicsTier[] };

export const TIER_BUDGET_KB: Record<GraphicsTier, number> = { low: 150, medium: 300, high: 600 };

const ALL: readonly GraphicsTier[] = ['low', 'medium', 'high'];
const RICH: readonly GraphicsTier[] = ['medium', 'high'];
const HIGH: readonly GraphicsTier[] = ['high'];

export const TEXTURE_MANIFEST: readonly TextureEntry[] = [
  { file: 'wall_brick.jpg', tiers: ALL },
  { file: 'wall_brick_n.jpg', tiers: ALL },
  { file: 'wall_plaster.jpg', tiers: ALL },
  { file: 'wall_plaster_n.jpg', tiers: ALL },
  { file: 'roof_tile.jpg', tiers: ALL },
  { file: 'roof_tile_n.jpg', tiers: ALL },
  { file: 'stone_warm.jpg', tiers: ALL },
  { file: 'stone_warm_n.jpg', tiers: ALL },
  { file: 'terracotta_a.jpg', tiers: ALL },
  { file: 'terracotta_a_n.jpg', tiers: ALL },
  { file: 'brick_a.jpg', tiers: [] },
  { file: 'brick_a_n.jpg', tiers: [] },
  { file: 'tin.jpg', tiers: RICH },
  { file: 'straw.jpg', tiers: RICH },
  { file: 'roof_home.jpg', tiers: RICH },
  { file: 'roof_clay.jpg', tiers: RICH },
  { file: 'roof_clay_128.jpg', tiers: ['low'] },
  { file: 'facade.jpg', tiers: RICH },
  { file: 'roof_home_n.jpg', tiers: HIGH },
  { file: 'facade_n.jpg', tiers: HIGH },
  { file: 'tin_n.jpg', tiers: HIGH },
  { file: 'straw_n.jpg', tiers: HIGH },
  { file: 'terrace.jpg', tiers: ['low'] },
  { file: 'terrace_hi.jpg', tiers: RICH },
  { file: 'terrace_hi_n.jpg', tiers: HIGH },
  // painted backdrop (render/backdrop.ts, built by tools/backdrop-build.mjs): lazy, per tier
  { file: 'backdrop/plate_low.webp', tiers: ['low'] },
  { file: 'backdrop/near_low.webp', tiers: ['low'] },
  { file: 'backdrop/plate_medium.webp', tiers: ['medium'] },
  { file: 'backdrop/far_medium.webp', tiers: ['medium'] },
  { file: 'backdrop/near_medium.webp', tiers: ['medium'] },
  { file: 'backdrop/plate_high.webp', tiers: ['high'] },
  { file: 'backdrop/far_high.webp', tiers: ['high'] },
  { file: 'backdrop/near_high.webp', tiers: ['high'] },
];

/** Total bytes loaded on a tier, given a size lookup (the test passes fs.statSync). */
export function tierBytes(tier: GraphicsTier, sizeOf: (file: string) => number): number {
  let t = 0;
  for (const e of TEXTURE_MANIFEST) if (e.tiers.includes(tier)) t += sizeOf(e.file);
  return t;
}
