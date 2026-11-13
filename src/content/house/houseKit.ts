// House kit v2 emitters (ADR 0013 section 1.2): HouseSpec / PropSpec -> ordinary level JSON fields.
// Nothing here knows about three or the sim. A house depends on its spec only (no altitude input
// except groundY, which only places the box).
import {
  HK,
  STYLE_BALCONY,
  STYLE_BODY,
  STYLE_PARAPET,
  STYLE_PROP,
  axisIntoWall,
  balconyRails,
  deckY,
  faceRect,
  parapetHeight,
  parapetSegments,
  poleAnchor,
  round6,
  stairsAxis,
  stairsHighS,
  validateHouse,
} from './houseSpec';
import type { Face, HouseSpec, LevelJsonDraft, PropSpec, Rect } from './houseSpec';

export type { LevelJsonDraft } from './houseSpec';
export { newDraft } from './houseSpec';

function solid(out: LevelJsonDraft, r: Rect, y0: number, y1: number, style: number): void {
  out.solids.push({
    min: [round6(r.x0), round6(y0), round6(r.z0)],
    max: [round6(r.x1), round6(y1), round6(r.z1)],
  });
  out.style.push(style);
}

function ramp(
  out: LevelJsonDraft,
  r: Rect,
  y0: number,
  y1: number,
  slopeAxis: number,
  slip: number,
): void {
  out.ramps.push({
    min: [round6(r.x0), round6(y0), round6(r.z0)],
    max: [round6(r.x1), round6(y1), round6(r.z1)],
    slopeAxis,
    rise: round6(y1 - y0),
    slip,
  });
}

export function emitHouse(h: HouseSpec, out: LevelJsonDraft): void {
  validateHouse(h);
  const g = h.groundY;
  const deck = deckY(h);
  const k = HK.half;

  // Body: the walkable roof deck is its top, cut 2 m into the hill.
  solid(
    out,
    { x0: h.cx - k, x1: h.cx + k, z0: h.cz - k, z1: h.cz + k },
    g - HK.bodyBelow,
    deck,
    STYLE_BODY,
  );

  // Parapets (none on party sides or over the balcony).
  for (let f = 0; f < 4; f++) {
    const segs = parapetSegments(h, f as Face);
    const top = deck + parapetHeight(h, f as Face);
    for (let i = 0; i < segs.length; i++) {
      const r = faceRect(h, f as Face, segs[i][0], segs[i][1], k - HK.parapetThick, k);
      solid(out, r, deck, top, STYLE_PARAPET);
    }
  }

  // Balcony: deck and rails.
  if (h.balcony !== -1) {
    const b = h.balcony;
    const hw = HK.balconyW / 2;
    const top = g + HK.balconyTop;
    solid(
      out,
      faceRect(h, b, -hw, hw, k, k + HK.balconyD),
      top - HK.balconyThick,
      top,
      STYLE_BALCONY,
    );
    const rails = balconyRails(h);
    for (let i = 0; i < rails.length; i++) {
      const rr = rails[i];
      solid(out, faceRect(h, b, rr.s0, rr.s1, rr.d0, rr.d1), top, top + HK.railH, STYLE_PARAPET);
    }
  }

  // Outside stairs: one walkable ramp along the face, rising toward the wall end.
  if (h.stairs !== null) {
    const sh = stairsHighS(h);
    const r = faceRect(h, h.stairs.face, sh, sh + HK.stairRun, k, k + HK.stairW);
    ramp(out, r, g, g + HK.stairRise, stairsAxis(h.stairs.face), 0);
  }

  // Awnings: slippery single-slope ramps, high edge at the wall.
  for (let i = 0; i < h.awnings.length; i++) {
    const f = h.awnings[i];
    const hw = HK.awningW / 2;
    const r = faceRect(h, f, -hw, hw, k, k + HK.awningD);
    ramp(out, r, g + HK.awningLow, g + HK.awningHigh, axisIntoWall(f), 1);
  }

  if (h.pole) {
    out.poleAnchorIds[h.id] = out.anchors.length;
    out.anchors.push({ pos: poleAnchor(h) });
  }
}

function squareRect(p: PropSpec, size: number): Rect {
  const hs = size / 2;
  return { x0: p.x - hs, x1: p.x + hs, z0: p.z - hs, z1: p.z + hs };
}

function slab(
  r: Rect,
  top: number,
): { min: [number, number, number]; max: [number, number, number] } {
  return {
    min: [round6(r.x0), round6(top - HK.slab), round6(r.z0)],
    max: [round6(r.x1), round6(top), round6(r.z1)],
  };
}

/** Street props. Solid body under every slab; the slab itself is the cushion or tramp the sim reads. */
export function emitProp(p: PropSpec, out: LevelJsonDraft): void {
  const g = p.groundY;
  const base = g - 0.5; // sunk so a sloping street leaves no gap
  switch (p.kind) {
    case 'crate':
      solid(out, squareRect(p, HK.crate), base, g + HK.crate, STYLE_PROP);
      return;
    case 'boxPile': {
      const r = squareRect(p, HK.boxPileSize);
      solid(out, r, base, g + HK.boxPileTop, STYLE_PROP);
      out.cushions.push(slab(r, g + HK.boxPileTop));
      return;
    }
    case 'hay': {
      const r = squareRect(p, HK.haySize);
      solid(out, r, base, g + HK.hayTop, STYLE_PROP);
      out.cushions.push(slab(r, g + HK.hayTop));
      return;
    }
    case 'tramp': {
      const r = squareRect(p, HK.trampSize);
      solid(out, r, base, g + HK.trampTop, STYLE_PROP);
      out.tramps.push(slab(r, g + HK.trampTop));
      return;
    }
  }
}
