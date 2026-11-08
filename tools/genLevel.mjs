/* global process, URL, console */
// Generates content/levels/l1.json (the one Kathmandu rooftop descent).
// Plain Node ESM, no deps, deterministic. Run: node tools/genLevel.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Tunables (1 unit = 1 m, Y up, the hill descends toward -Z).
const HOPS = 7;
const SPACING = 26; // roof centre z step
const DROP = 9.5; // roof top y step
const HALF_X = 6.5; // house half width (13 m wide: room for a roof, a balcony and some run)
const HALF_Z = 4.5; // house half depth (9 m; deeper makes the rope clip the roof edge)
const ROOF_T = 0.6; // roof slab thickness
const THICK = 3; // start roof S0 only
const BALCONY_DEPTH = 1.8;
const BALCONY_DROP = 3; // balcony floor below the roof top
const ANCHOR_H = 1.6; // anchor height above the roof top
const ANCHOR_Z = 2; // anchor offset toward the previous roof from roof centre
const X_OFF = 5;
const DECOY_ROOFS = [2, 4, 6];
const TERRACE_DROP = 20; // m below the walkable roof above it (ADR 0005 D2)
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

  // Decoys: anchors on tall danger walls in front of a roof, 5 m below its top.
  for (const i of DECOY_ROOFS) {
    const cx = i % 2 === 0 ? X_OFF : -X_OFF;
    const cz = -SPACING * i;
    const top = -DROP * i;
    // a squat neighbour house, not a tower: 10 m wide, 9 m tall, 6 m deep
    add(box(cx - 5, top - 13, cz + 6, cx + 5, top - 4, cz + 12), 3);
    anchors.push({ pos: [r(cx), r(top - 5), r(cz + 6)] });
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
      -198 - 20,
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
  return {
    version: 1,
    spawn: [0, 0, 0],
    spawnYaw: 3.14159,
    killPlaneY: -95,
    solids,
    ramps: [],
    anchors,
    goal: box(-6, -75, -198, 6, -70, -186),
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
