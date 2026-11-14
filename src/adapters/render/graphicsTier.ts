// Graphics quality tiers (docs/graphics-spec.md "Look decisions, round 2" and "Implemented tiers").
// Pure module: no three, no DOM at import time, so it runs under Node in Vitest. The scene
// (scene.ts) turns a RenderConfig into three objects; the lobby (ui/lobby.ts) lets the player pick.

export type GraphicsTier = 'low' | 'medium' | 'high';

export const GRAPHICS_TIERS: readonly GraphicsTier[] = ['low', 'medium', 'high'];

export const GRAPHICS_TIER_KEY = 'zt.graphicsTier';

/** Window event fired after the tier is saved; scene.ts listens and applies it live. */
export const GRAPHICS_TIER_EVENT = 'zt-graphics-tier';

export const TIER_INFO: Record<GraphicsTier, { label: string; desc: string }> = {
  low: { label: 'Low', desc: 'Flat sunset colours, blob shadow. Fastest.' },
  medium: { label: 'Medium', desc: 'Soft lane shadows, filmic colour. Phone default.' },
  high: { label: 'High', desc: 'Sharper shadows, extra detail. Sun glow on PCs.' },
};

export function parseTier(v: unknown): GraphicsTier | null {
  return v === 'low' || v === 'medium' || v === 'high' ? v : null;
}

export type DeviceHints = {
  coarsePointer: boolean;
  userAgent: string;
  /** navigator.hardwareConcurrency; 0 when unknown. */
  cores: number;
  /** navigator.deviceMemory in GB (Chromium only); 0 when unknown. */
  memoryGb: number;
};

/**
 * Devices with a hard "weak" signal (<= 4 cores or <= 4 GB) start on Low; everything else
 * starts on Medium, phones included (graphics overhaul D-A, 2026-11-09). iOS Safari hides
 * memory and under-reports cores, so UA sniffing is not used: scene.ts runs a frame-time
 * governor that drops an auto-chosen tier to Low if the first seconds are slow.
 */
export function defaultTierFor(h: DeviceHints): GraphicsTier {
  if (h.cores > 0 && h.cores <= 4) return 'low';
  if (h.memoryGb > 0 && h.memoryGb <= 4) return 'low';
  return 'medium';
}

export function readDeviceHints(): DeviceHints {
  const hints: DeviceHints = { coarsePointer: false, userAgent: '', cores: 0, memoryGb: 0 };
  try {
    if (typeof navigator !== 'undefined') {
      hints.userAgent = navigator.userAgent ?? '';
      hints.cores = navigator.hardwareConcurrency ?? 0;
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      hints.memoryGb = typeof mem === 'number' ? mem : 0;
    }
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      hints.coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    }
  } catch {
    // Locked-down browser: keep the defaults.
  }
  return hints;
}

export type TierStore = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

/** localStorage, or null when absent or blocked (Node, private mode, sandboxed iframes). */
export function safeStorage(): TierStore | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function urlOverride(): GraphicsTier | null {
  try {
    if (typeof location === 'undefined') return null;
    return parseTier(new URLSearchParams(location.search).get('gfx'));
  } catch {
    return null;
  }
}

/** Order: `?gfx=` URL override, then the saved choice, then the device default. Never throws. */
export function loadGraphicsTier(
  store: TierStore | null = safeStorage(),
  hints: DeviceHints = readDeviceHints(),
  override: GraphicsTier | null = urlOverride(),
): GraphicsTier {
  if (override !== null) return override;
  if (store !== null) {
    try {
      const saved = parseTier(store.getItem(GRAPHICS_TIER_KEY));
      if (saved !== null) return saved;
    } catch {
      // Blocked storage: fall through to the default.
    }
  }
  return defaultTierFor(hints);
}

/** True when the tier came from the device default (no `?gfx=` and no saved choice). */
export function isTierAuto(
  store: TierStore | null = safeStorage(),
  override: GraphicsTier | null = urlOverride(),
): boolean {
  if (override !== null) return false;
  if (store === null) return true;
  try {
    return parseTier(store.getItem(GRAPHICS_TIER_KEY)) === null;
  } catch {
    return true;
  }
}

/** Saves the choice (best effort) and tells a running scene to apply it. */
export function saveGraphicsTier(
  tier: GraphicsTier,
  store: TierStore | null = safeStorage(),
): void {
  if (store !== null) {
    try {
      store.setItem(GRAPHICS_TIER_KEY, tier);
    } catch {
      // Quota or blocked storage: the choice still applies for this session.
    }
  }
  if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
    window.dispatchEvent(new CustomEvent(GRAPHICS_TIER_EVENT, { detail: tier }));
  }
}

export type ShadowConfig = {
  mapSize: number;
  /** Half width of the orthographic shadow frustum around the focus point (m). */
  halfExtent: number;
  /** Distance from the focus point back along the sun direction to the light (m). */
  distance: number;
  far: number;
  bias: number;
  normalBias: number;
  /** PCF blur radius. */
  radius: number;
};

export type BloomConfig = { strength: number; radius: number; threshold: number };

/** Plain renderer/scene settings for one tier. scene.ts maps these onto three. */
export type RenderConfig = {
  tier: GraphicsTier;
  maxPixelRatio: number;
  toneMapping: 'none' | 'aces';
  exposure: number;
  sun: { color: string; intensity: number; dir: [number, number, number] };
  hemi: { sky: string; ground: string; intensity: number };
  fog: { color: string; near: number; far: number };
  /** null: no shadow map at all. */
  shadow: ShadowConfig | null;
  /** null: render straight to the canvas, no EffectComposer. */
  bloom: BloomConfig | null;
  /** MSAA samples on the composer target (only used with bloom). */
  composerSamples: number;
  /** Normal maps on the textured walls and roofs (High only; invisible at phone resolution). */
  normalMaps: boolean;
  /** Second cloud layer, god-ray cards and dust points (large alpha overdraw: fine pointers only). */
  atmosphere: boolean;
  /** Forest tree density 0..1. */
  forestDensity: number;
  /** Shadow casters are limited to the hero and things this close (m) to the lane centre. */
  casterReach: number;
  /** Names of decor meshes hidden on this tier (small instanced detail that costs a draw each). */
  hideDecor: readonly string[];
  /** Auto-chosen tiers above Low drop to Low when the warmed-up average frame is slower (ms). */
  governorMs: number;
};

/** A3 budgets: max pixel ratio per tier, [coarse pointer, fine pointer]. */
export const PIXEL_RATIO_CAP: Record<GraphicsTier, readonly [number, number]> = {
  low: [1, 1.5],
  medium: [1.25, 2],
  high: [1.5, 2],
};

/** Lane half-width (m) for shadow casters and detail: decor beyond it never casts. */
export const CASTER_REACH = 12;
/** Low drops these pieces: every instanced mesh is a draw call and none carries the lane. v1 rails are hidden as before; the v2 balcony rails are the separate `guard` piece, which stays (fall guard, T313). `look: 'home'` decor (houseV2) is built only from pieces listed here, so Low hides all of it; tests/adapters/houseV2.test.ts checks. */
export const LOW_HIDDEN_DECOR: readonly string[] = [
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
];
export const GOVERNOR_MS = 20;

// Must equal skyView.HAZE: the sky dome is pre-fogged towards it. Kept as a literal so this
// module stays three-free; tests/adapters/graphicsTier.test.ts checks they match.
export const FOG_HAZE = '#eaa978';

/** ADR 0009: per-tier pixel ratio cap (fill rate is the phone bottleneck). Defaults to High's. */
export function pixelRatioFor(
  devicePixelRatio: number,
  coarse: boolean,
  tier: GraphicsTier = 'high',
): number {
  return Math.min(devicePixelRatio, PIXEL_RATIO_CAP[tier][coarse ? 0 : 1]);
}

export function renderConfigFor(tier: GraphicsTier, coarse: boolean): RenderConfig {
  const maxPixelRatio = PIXEL_RATIO_CAP[tier][coarse ? 0 : 1];
  const extras = {
    normalMaps: tier === 'high',
    atmosphere: tier !== 'low' && !coarse,
    forestDensity: tier === 'low' ? 0.2 : tier === 'medium' ? 0.7 : 1,
    casterReach: CASTER_REACH,
    hideDecor: tier === 'low' ? LOW_HIDDEN_DECOR : [],
    governorMs: GOVERNOR_MS,
  };
  if (tier === 'low') {
    // Graphics overhaul P0: Low keeps no shadows and no post, but gets ACES (a material define,
    // no extra pass) so the base grade is not washed out. Fog starts further out.
    return {
      tier,
      maxPixelRatio,
      toneMapping: 'aces',
      exposure: 1.1,
      sun: { color: '#ffb469', intensity: 3.0, dir: [70, 38, -15] },
      hemi: { sky: '#ffc99c', ground: '#5b4656', intensity: 1.0 },
      fog: { color: FOG_HAZE, near: 70, far: 480 },
      shadow: null,
      bloom: null,
      composerSamples: 0,
      ...extras,
    };
  }
  // Medium/High: same horizontal key direction (lit, not backlit; ADR 0001) but a lower,
  // warmer sun (~19 degrees) for long shadows; ACES with a lift so the stock palette keeps
  // its warmth; nearer haze for depth.
  const shadow: ShadowConfig = {
    mapSize: tier === 'high' ? 2048 : 1024,
    // A smaller frustum on phones keeps texel density near the hero with the smaller map.
    halfExtent: tier === 'high' ? (coarse ? 40 : 48) : coarse ? 24 : 30,
    distance: 80,
    far: 180,
    bias: -0.001,
    normalBias: 0.08,
    radius: tier === 'high' ? 2 : 3,
  };
  return {
    tier,
    maxPixelRatio,
    toneMapping: 'aces',
    exposure: 1.2,
    sun: { color: '#ffa65c', intensity: 4.2, dir: [70, 25, -15] },
    hemi: { sky: '#ffc99c', ground: '#5e4a5c', intensity: 0.85 },
    fog: { color: FOG_HAZE, near: 65, far: 480 },
    shadow,
    // Bloom needs a composer with a HalfFloat MSAA target: fine pointers only (ADR 0009).
    bloom: tier === 'high' && !coarse ? { strength: 0.22, radius: 0.35, threshold: 0.85 } : null,
    composerSamples: tier === 'high' && !coarse ? 4 : 0,
    ...extras,
  };
}
