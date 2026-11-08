/* global process, URL, console */
// Generates content/levels/l1.json (the one Kathmandu rooftop descent).
// Plain Node ESM, no deps, deterministic. Run: node tools/genLevel.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Tunables (1 unit = 1 m, Y up, the hill descends toward -Z).
const HOPS = 7;
const SPACING = 20; // roof centre z step
const DROP = 7; // roof top y step
const HALF_X = 6.5; // house half width (13 m wide: room for a roof, a balcony and some run)
const HALF_Z = 5; // house half depth (10 m); landing spot is 5 m from the launch edge
const ROOF_T = 0.6; // roof slab thickness
const THICK = 3; // start roof S0 only
const BALCONY_DEPTH = 1.8;
const BALCONY_DROP = 3; // balcony floor below the roof top
const ANCHOR_H = 1.6; // anchor height above the roof top
const ANCHOR_Z = 1; // anchor offset from the roof centre toward the previous roof (landing spot is 6 m from the launch edge)
const X_OFF = 5;
const DECOY_X = 7; // decoy house centre offset, opposite side of the lane from its roof
const CURB_H = 0.4; // roof parapet: within step-up, so it never blocks a run
const CURB_T = 0.25;
const CURB_GAP = 2; // half width of the launch gap at the middle of the lane and downhill edges
const PLINTH_H = 0.8; // tank plinth: a jump-up under 1 m
const DECOY_ROOFS = [2, 4, 6];
const TERRACE_DROP = 12; // m below the walkable roof above it (ADR 0005 D2)
const TERRACE_HALF_X = 30;
const TERRACE_THICK = 4;

const r = (n) => Math.round(n * 1000) / 1000;
const box = (x0, y0, z0, x1, y1, z1) => ({
  min: [r(x0), r(y0), r(z0)],
  max: [r(x1), r(y1), r(z1)],
});

export function generateLevel() {
  const solids = [];
  const style = [];
  const anchors = [];
  const pads = [];
  const add = (b, s) => {
    solids.push(b);
    style.push(s);
  };

  // Ground slab (0), start roof S0 (2).
  add(box(-60, -90, -230, 60, -89, 20), 0);
  add(box(-5, -THICK, -4, 5, 0, 4), 2);

  for (let i = 1; i <= HOPS; i++) {
    const cx = i % 2 === 0 ? X_OFF : -X_OFF;
    const cz = -SPACING * i;
    const top = -DROP * i;
    // Roof slab, then the walls down to the hill terrace (a house built into the slope).
    add(box(cx - HALF_X, top - ROOF_T, cz - HALF_Z, cx + HALF_X, top, cz + HALF_Z), 2);
    add(
      box(cx - HALF_X, top - TERRACE_DROP, cz - HALF_Z, cx + HALF_X, top - ROOF_T, cz + HALF_Z),
      1,
    );
    anchors.push({ pos: [r(cx), r(top + ANCHOR_H), r(cz + ANCHOR_Z)] });
    pads.push(box(cx - HALF_X + 1, top, cz - HALF_Z + 1, cx + HALF_X - 1, top, cz + HALF_Z - 1));
  }

  // Decoys: a danger-coloured mirror house across the lane, grounded on its hill terrace, with an
  // anchor at the same height as the real one. It is hookable; landing on it kills.
  for (const i of DECOY_ROOFS) {
    const cx = i % 2 === 0 ? X_OFF : -X_OFF;
    const cz = -SPACING * i;
    const top = -DROP * i;
    const dx = -Math.sign(cx) * DECOY_X;
    add(box(dx - 3.5, top - TERRACE_DROP, cz - 5, dx + 3.5, top - 0.6, cz + 5), 3);
    anchors.push({ pos: [r(dx), r(top + ANCHOR_H), r(cz + ANCHOR_Z)] });
  }

  // Hill terraces (ADR 0005 D2), appended last so existing indices never move.
  for (let i = 0; i <= HOPS; i++) {
    const cz = -SPACING * i;
    const top = -DROP * i - TERRACE_DROP;
    const zMax = i === 0 ? 30 : cz + 13;
    add(box(-TERRACE_HALF_X, top - TERRACE_THICK, cz - 13, TERRACE_HALF_X, top, zMax), 0);
  }
  const goalTop = -DROP * HOPS - TERRACE_DROP;
  add(
    box(
      -TERRACE_HALF_X,
      goalTop - TERRACE_THICK,
      -SPACING * HOPS - 38,
      TERRACE_HALF_X,
      goalTop,
      -SPACING * HOPS - 13,
    ),
    0,
  );

  // Balconies (appended after everything else): a timber ledge on each house's lane-facing wall.
  for (let i = 1; i <= HOPS; i++) {
    const cx = i % 2 === 0 ? X_OFF : -X_OFF;
    const cz = -SPACING * i;
    const top = -DROP * i;
    const dir = cx < 0 ? 1 : -1; // toward the lane axis
    const face = cx + dir * HALF_X;
    const x0 = Math.min(face, face + dir * BALCONY_DEPTH);
    const x1 = Math.max(face, face + dir * BALCONY_DEPTH);
    add(
      box(x0, top - BALCONY_DROP - 0.3, cz - HALF_Z + 1, x1, top - BALCONY_DROP, cz + HALF_Z - 1),
      1,
    );
  }
  // Roof parapets and tank plinths (style 4), appended last. The uphill (arrival) edge stays open:
  // the hero crosses it at speed, so it carries no solid. The downhill edge is walled on its outer half only and the
  // lane edge has a gap in the middle, so the rope and the launch line stay clear.
  for (let i = 1; i <= HOPS; i++) {
    const cx = i % 2 === 0 ? X_OFF : -X_OFF;
    const cz = -SPACING * i;
    const top = -DROP * i;
    const dir = cx < 0 ? 1 : -1;
    const x0 = cx - HALF_X;
    const x1 = cx + HALF_X;
    const z0 = cz - HALF_Z;
    const z1 = cz + HALF_Z;
    const y1 = top + CURB_H;
    const outer = dir > 0 ? [x0, x0 + CURB_T] : [x1 - CURB_T, x1];
    const lane = dir > 0 ? [x1 - CURB_T, x1] : [x0, x0 + CURB_T];
    add(box(outer[0], top, z0, outer[1], y1, z1), 4);
    add(box(lane[0], top, z0, lane[1], y1, cz - CURB_GAP), 4);
    add(box(lane[0], top, cz + CURB_GAP, lane[1], y1, z1), 4);
    // downhill edge: only the outer half is walled; the lane half is the launch strip (the rope
    // heads that way)
    if (dir > 0) add(box(x0, top, z0, cx - CURB_GAP, y1, z0 + CURB_T), 4);
    else add(box(cx + CURB_GAP, top, z0, x1, y1, z0 + CURB_T), 4);
    const tx = dir > 0 ? x0 + 1.1 : x1 - 1.1;
    add(box(tx - 0.8, top, cz - 3.2, tx + 0.8, top + PLINTH_H, cz - 1.6), 4);
  }
  return {
    version: 1,
    spawn: [0, 0, 0],
    spawnYaw: 3.14159,
    killPlaneY: -95,
    solids,
    ramps: [],
    anchors,
    goal: box(
      -12,
      -DROP * HOPS - 8.5,
      -SPACING * HOPS - 19,
      6,
      -DROP * HOPS - 3.5,
      -SPACING * HOPS - 6,
    ),
    pads,
    route: [0, 1, 2, 3, 4, 5, 6],
    style,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = fileURLToPath(new URL('../content/levels/l1.json', import.meta.url));
  const level = generateLevel();
  writeFileSync(out, JSON.stringify(level, null, 2) + '\n');
  console.log(
    `wrote ${out}: ${level.solids.length} solids, ${level.anchors.length} anchors, ${level.pads.length} pads`,
  );
}
