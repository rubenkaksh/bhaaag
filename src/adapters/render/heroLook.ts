// One source of truth for how the Bhaaag hero looks, shared by the zipline game (heroRig.ts) and the
// hunting spikes (src/spikes/view). Pure data, no three import. Reference: the GPT hero images of
// 2026-11-27 (docs/spikes/hero-look.md). Owner decisions 2026-11-27: D1(b) dark hemp tunic in the
// zipline game (ADR 0009 contrast), oat tunic only for the riders; D2 beanie in both; D3 clay
// vertex shading allowed, High-tier hero cap 3,000 triangles (Low stays under 1,500).

export type HeroPalette = {
  tunic: string;
  trousers: string;
  crimson: string;
  skin: string;
  hair: string;
  leather: string;
};

/** Zipline game: tunic stays dark so the hero reads on cream pads and roofs (ADR 0009, 3:1). */
export const HERO_HEMP: HeroPalette = {
  tunic: '#4b4636', // dark warm hemp, relative luminance about 0.06
  trousers: '#2a2f3b',
  crimson: '#dc2b34', // saturated, never terracotta (colour language)
  skin: '#c08560',
  hair: '#1f1a17',
  leather: '#6b4a2f',
};

/** Hunting spikes: the oat tunic and brick red of the reference images. */
export const HERO_OAT: HeroPalette = {
  tunic: '#d7c9a6',
  trousers: '#2a2f3b',
  crimson: '#bf4538',
  skin: '#c08560',
  hair: '#1f1a17',
  leather: '#6b4a2f',
};

export type HeroLook = {
  palette: HeroPalette;
  /** beanie = charcoal knit with rolled brim, helmet = cream open helmet with pushed-up goggles. */
  hat: 'beanie' | 'helmet' | 'none';
  /** none, quiver on the back (bow rider) or crossed bandolier straps (rifle rider). */
  gear: 'none' | 'quiver' | 'bandolier';
  /** 0 = Low/Medium segment counts, 1 = High (smoother head, tyres, extra hair clumps). */
  detail: 0 | 1;
  /** Baked top-to-bottom and under-sash vertex shading, 0 = flat colour .. 1 = full clay look. */
  clay: number;
};

export const DEFAULT_HERO_LOOK: HeroLook = {
  palette: HERO_HEMP,
  hat: 'beanie',
  gear: 'none',
  detail: 0,
  clay: 0.6,
};

export function heroLook(o: Partial<HeroLook> = {}): HeroLook {
  return { ...DEFAULT_HERO_LOOK, ...o };
}

/** Look for a hunting-spike rider. */
export function riderLook(gear: 'quiver' | 'bandolier', detail: 0 | 1 = 0): HeroLook {
  return heroLook({
    palette: HERO_OAT,
    hat: gear === 'quiver' ? 'beanie' : 'helmet',
    gear,
    detail,
  });
}
