/* global process, URL, console */
// Generates content/levels/l1.json (the one Kathmandu rooftop descent).
// Plain Node ESM, no deps, deterministic. Run: node tools/genLevel.mjs
//
// Layout (docs/level-layout.md, redesign 2026-11-10): ONE smooth hillside, a single planar ramp
// at GRADE_DEG, with ten houses on it in a straight line down the fall line (x = 0). Houses come
// in attached rows ("clusters": 4 rows of 2 route houses, each house one step lower than the one
// above it) joined by rope hops across open hillside, plus two danger decoys beside the lane.
// Nothing else stands on the hill: no side villages, no plots, no fences. The mountains and the
// forested foothills are scenery (src/adapters/render/terrain.ts, backdrop.ts).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Tunables (1 unit = 1 m, Y up, the hill descends toward -Z).
export const GRADE_DEG = 20;
export const GRADE = Math.tan((GRADE_DEG * Math.PI) / 180); // metres of drop per metre of z
export const GROUND_Y0 = -8; // hill surface height at z = 0 (so the first roof top is y = 0)
const WALL_H = 8; // roof top above the hill surface at the house centre
// The second house of each row is a lower annex: its wall is ROW_DROP shorter, so the roof steps down
// GRADE * 7 + ROW_DROP between the attached houses. A bigger in-row step makes the rope hop between
// rows less steep (the receiving house stands higher over the launching one), which widens the strip
// of the launching roof from which the hook chord clears the roof surface (see tests/content/hillside).
export const ROW_DROP = 2.6;
const ROOF_T = 0.6; // roof slab thickness
const HALF_X = 4; // house half width (8 m footprint)
const HALF_Z = 3.5; // house half depth (7 m footprint): attached houses step down GRADE * 7 m
const CLUSTERS = [2, 2, 2, 2]; // route houses per attached row
const GAP = 13; // open hillside between rows, edge to edge
const BALCONY_DEPTH = 1.8;
const BALCONY_DROP = 3;
const ANCHOR_H = 1.6; // anchor height above the roof top (the rope end meets the roof)
const ANCHOR_Z = 1; // anchor offset from the first roof's centre toward the uphill edge
const CURB_H = 0.4; // roof parapet: within step-up, never blocks a run
const CURB_T = 0.25;
const PLINTH_H = 0.8; // tank plinth: a jump-up under 1 m
const DECOY_X = 12; // decoy house centre offset from the lane
const DECOY_ROWS = [1, 3]; // decoy beside the first house of row 1 (left) and row 3 (right)
const DECOY_PITCHED = [1]; // row 1's decoy wears a pitched tile roof (landable but slippery)
const PITCH_RISE = 2;
// Hill collider: one ramp, enclosed by invisible barrier walls (style 5, never drawn).
export const HILL_HALF_X = 34;
export const HILL_Z_MAX = 26;
export const HILL_Z_MIN = -104;
const WALL_T = 2;
const GOAL_RUN = 9; // the haystack runs this far past the last house's downhill edge

export const STYLE_HIDDEN = 5;

const r = (n) => Math.round(n * 1000) / 1000;
const box = (x0, y0, z0, x1, y1, z1) => ({
  min: [r(x0), r(y0), r(z0)],
  max: [r(x1), r(y1), r(z1)],
});

/** Hill surface height at z (the planar ramp). */
export function hillY(z) {
  return GRADE * z + GROUND_Y0;
}

/** Route houses in order, each { cx, cz, top, ground, row, k }. cz = footprint centre z. */
export function routeHouses() {
  const out = [];
  let edge = HALF_Z; // uphill edge of the first row's first house, so house 0 is centred on z = 0
  for (let row = 0; row < CLUSTERS.length; row++) {
    for (let k = 0; k < CLUSTERS[row]; k++) {
      const cz = edge - HALF_Z;
      const ground = hillY(cz);
      out.push({ cx: 0, cz, top: ground + WALL_H - (k === 0 ? 0 : ROW_DROP), ground, row, k });
      edge -= 2 * HALF_Z;
    }
    edge -= GAP;
  }
  return out;
}

export function generateLevel() {
  const solids = [];
  const style = [];
  const anchors = [];
  const pads = [];
  const roofs = [];
  const add = (b, s) => {
    solids.push(b);
    style.push(s);
  };
  const houses = routeHouses();
  const last = houses[houses.length - 1];

  // Kill slab far below (0). The hill itself is the ramp below.
  add(box(-120, -120, -260, 120, -119, 60), 0);

  // Houses: roof slab (style 2), then the wall down to the lowest hill point under the footprint
  // (style 1), so the downhill face meets the slope and the uphill face is partly buried.
  for (const h of houses) {
    const x0 = h.cx - HALF_X;
    const x1 = h.cx + HALF_X;
    const z0 = h.cz - HALF_Z;
    const z1 = h.cz + HALF_Z;
    add(box(x0, h.top - ROOF_T, z0, x1, h.top, z1), 2);
    add(box(x0, hillY(z0), z0, x1, h.top - ROOF_T, z1), 1);
    pads.push(box(x0 + 1, h.top, z0 + 1, x1 - 1, h.top, z1 - 1));
  }
  // Anchors: the first house of each row after the first (the rope target of the hop before it).
  const rowFirst = houses.filter((h) => h.k === 0 && h.row > 0);
  for (const h of rowFirst) {
    anchors.push({ pos: [r(h.cx), r(h.top + ANCHOR_H), r(h.cz + ANCHOR_Z)] });
  }

  // Decoys: a danger-coloured house beside the lane, same top and anchor height as the real
  // first house of its row. Hookable; it leads nowhere.
  for (let d = 0; d < DECOY_ROWS.length; d++) {
    const row = DECOY_ROWS[d];
    const h = houses.find((q) => q.row === row && q.k === 0);
    const dx = d === 0 ? -DECOY_X : DECOY_X;
    const x0 = dx - 3.5;
    const x1 = dx + 3.5;
    const z0 = h.cz - HALF_Z;
    const z1 = h.cz + HALF_Z;
    add(box(x0, hillY(z0), z0, x1, h.top - 0.6, z1), 3);
    if (DECOY_PITCHED.includes(row)) {
      const b = box(x0, h.top - 0.6, z0, x1, h.top - 0.6 + PITCH_RISE, z1);
      roofs.push({ ...b, ridge: 1 });
    }
    anchors.push({ pos: [r(dx), r(h.top + ANCHOR_H), r(h.cz + ANCHOR_Z)] });
  }

  // Balconies: a timber ledge on a side wall of each route house, alternating sides.
  houses.forEach((h, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const face = h.cx + dir * HALF_X;
    const xa = Math.min(face, face + dir * BALCONY_DEPTH);
    const xb = Math.max(face, face + dir * BALCONY_DEPTH);
    add(
      box(xa, h.top - BALCONY_DROP - 0.3, h.cz - HALF_Z + 1, xb, h.top - BALCONY_DROP, h.cz + HALF_Z - 1),
      1,
    );
  });

  // Roof curbs along both side edges and a tank plinth (style 4). Both ends stay open: the hero
  // arrives over the uphill edge and leaves over the downhill one.
  houses.forEach((h, i) => {
    const x0 = h.cx - HALF_X;
    const x1 = h.cx + HALF_X;
    const z0 = h.cz - HALF_Z;
    const z1 = h.cz + HALF_Z;
    const y1 = h.top + CURB_H;
    add(box(x0, h.top, z0, x0 + CURB_T, y1, z1), 4);
    add(box(x1 - CURB_T, h.top, z0, x1, y1, z1), 4);
    const tx = i % 2 === 0 ? x0 + 1.1 : x1 - 1.1;
    add(box(tx - 0.8, h.top, h.cz - 1.6, tx + 0.8, h.top + PLINTH_H, h.cz), 4);
  });

  // Invisible barrier walls (style 5) keep the hero on the collider hill: sides, back, front.
  const wallTop = 40;
  const wallBot = -120;
  add(box(-HILL_HALF_X - WALL_T, wallBot, HILL_Z_MIN - WALL_T, -HILL_HALF_X, wallTop, HILL_Z_MAX + WALL_T), STYLE_HIDDEN);
  add(box(HILL_HALF_X, wallBot, HILL_Z_MIN - WALL_T, HILL_HALF_X + WALL_T, wallTop, HILL_Z_MAX + WALL_T), STYLE_HIDDEN);
  add(box(-HILL_HALF_X, wallBot, HILL_Z_MAX, HILL_HALF_X, wallTop, HILL_Z_MAX + WALL_T), STYLE_HIDDEN);
  add(box(-HILL_HALF_X, wallBot, HILL_Z_MIN - WALL_T, HILL_HALF_X, wallTop, HILL_Z_MIN), STYLE_HIDDEN);

  const zLow = hillY(HILL_Z_MIN);
  const ramps = [
    {
      min: [-HILL_HALF_X, r(zLow), HILL_Z_MIN],
      max: [HILL_HALF_X, r(zLow), HILL_Z_MAX],
      slopeAxis: 2, // rises toward +z
      rise: r(hillY(HILL_Z_MAX) - zLow),
    },
  ];

  // Goal haystack: 2 m over the hill at its near edge (out of jump reach from the ground),
  // entered by running off the last house's downhill edge (the leap of faith).
  const zEdge = last.cz - HALF_Z;
  const goal = box(-6, hillY(zEdge) + 2, zEdge - GOAL_RUN, 6, last.top - 2, zEdge - 0.5);

  return {
    version: 1,
    spawn: [0, 0, 0],
    spawnYaw: 3.14159,
    killPlaneY: -95,
    solids,
    ramps,
    roofs,
    anchors,
    goal,
    pads,
    // anchors 0..2 are the route (first house of rows 1..3), 3..4 the decoys
    route: rowFirst.map((_, i) => i),
    style,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = fileURLToPath(new URL('../content/levels/l1.json', import.meta.url));
  const level = generateLevel();
  writeFileSync(out, JSON.stringify(level, null, 2) + '\n');
  console.log(
    `wrote ${out}: ${level.solids.length} solids, ${level.ramps.length} ramps, ${level.roofs.length} roofs, ${level.anchors.length} anchors, ${level.pads.length} pads`,
  );
}
