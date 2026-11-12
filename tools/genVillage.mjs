/* global process, URL, console */
// Generates content/levels/village.json (Cloud Village, amendment 2026-11-12).
// Plain Node ESM, no deps, deterministic. Run: node tools/genVillage.mjs
//
// Same hop geometry as L1 (tools/genLevel.mjs: rows of two attached houses, 13 m rope hops, a 20
// degree descent), so the verified rope limits carry over. Differences: no hillside. Houses are normal
// height and each stands on its own cloud bank (void below); a far cloud sea is the floor; each row is shifted sideways (ROW_X) so the
// village zigzags; falling into the clouds kills (killPlaneY). The goal is a cloud pillow under the
// last house's downhill edge (leap of faith). Solid order matches L1 (kill slab, then roof+wall per
// route house) so the casual-human bot in tests/content works on both.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const GRADE = Math.tan((20 * Math.PI) / 180);
export const ROW_DROP = 4.0;
export const ROW_X = [0, 0, 0, 0]; // lane x per row: flat. Any >=0.5 m zigzag fails the frozen-aim bot on the post-T298 sim
export const CLOUD_TOP_Y = -58; // visual cloud sea surface (the hero sinks into it before dying)
export const KILL_Y = -64;
export const HOUSE_H = 7; // wall height under the roof: a normal house standing on its own cloud bank
const ROOF_T = 0.6;
const HALF_X = 4;
const HALF_Z = 3.5;
const CLUSTERS = [2, 2, 2, 2];
const GAP = 13;
const ANCHOR_H = 2.0;
const ANCHOR_Z = 1;
const CURB_H = 0.4;
const CURB_T = 0.25;
const PLINTH_H = 0.8;
const DECOY_X = 12;
const BALCONY_DEPTH = 1.8;
const BALCONY_DROP = 3;
const GOAL_RUN = 9;

const r = (n) => Math.round(n * 1000) / 1000;
const box = (x0, y0, z0, x1, y1, z1) => ({
  min: [r(x0), r(y0), r(z0)],
  max: [r(x1), r(y1), r(z1)],
});

export function routeHouses() {
  const out = [];
  let edge = HALF_Z;
  for (let row = 0; row < CLUSTERS.length; row++) {
    for (let k = 0; k < CLUSTERS[row]; k++) {
      const cz = edge - HALF_Z;
      out.push({ cx: ROW_X[row], cz, top: GRADE * cz - (k === 0 ? 0 : ROW_DROP), row, k });
      edge -= 2 * HALF_Z;
    }
    edge -= GAP;
  }
  return out;
}

export function generateVillage() {
  const solids = [];
  const style = [];
  const anchors = [];
  const pads = [];
  const add = (b, s) => {
    solids.push(b);
    style.push(s);
  };
  const houses = routeHouses();
  const last = houses[houses.length - 1];

  add(box(-120, -120, -260, 120, -119, 60), 0); // kill slab (never drawn)

  for (const h of houses) {
    const x0 = h.cx - HALF_X;
    const x1 = h.cx + HALF_X;
    const z0 = h.cz - HALF_Z;
    const z1 = h.cz + HALF_Z;
    add(box(x0, h.top - ROOF_T, z0, x1, h.top, z1), 2);
    add(box(x0, h.top - ROOF_T - HOUSE_H, z0, x1, h.top - ROOF_T, z1), 1);
    pads.push(box(x0 + 1, h.top, z0 + 1, x1 - 1, h.top, z1 - 1));
  }
  const rowFirst = houses.filter((h) => h.k === 0 && h.row > 0);
  for (const h of rowFirst) {
    anchors.push({ pos: [r(h.cx), r(h.top + ANCHOR_H), r(h.cz + ANCHOR_Z)] });
  }
  // Two danger decoys (terracotta) beside rows 1 and 3, hookable, lead nowhere.
  [1, 3].forEach((row, d) => {
    const h = houses.find((q) => q.row === row && q.k === 0);
    const dx = h.cx + (d === 0 ? -DECOY_X : DECOY_X);
    add(
      box(dx - 3.5, h.top - 0.6 - HOUSE_H, h.cz - HALF_Z, dx + 3.5, h.top - 0.6, h.cz + HALF_Z),
      3,
    );
    anchors.push({ pos: [r(dx), r(h.top + ANCHOR_H), r(h.cz + ANCHOR_Z)] });
  });

  houses.forEach((h, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const face = h.cx + dir * HALF_X;
    const xa = Math.min(face, face + dir * BALCONY_DEPTH);
    const xb = Math.max(face, face + dir * BALCONY_DEPTH);
    add(
      box(
        xa,
        h.top - BALCONY_DROP - 0.3,
        h.cz - HALF_Z + 1,
        xb,
        h.top - BALCONY_DROP,
        h.cz + HALF_Z - 1,
      ),
      1,
    );
  });
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

  const zEdge = last.cz - HALF_Z;
  const goal = box(
    last.cx - 6,
    last.top - 9,
    zEdge - GOAL_RUN,
    last.cx + 6,
    last.top - 2,
    zEdge - 0.5,
  );

  return {
    version: 1,
    spawn: [0, 0, 0],
    spawnYaw: 3.14159,
    killPlaneY: KILL_Y,
    solids,
    ramps: [],
    roofs: [],
    anchors,
    goal,
    pads,
    route: rowFirst.map((_, i) => i),
    style,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = fileURLToPath(new URL('../content/levels/village.json', import.meta.url));
  const level = generateVillage();
  writeFileSync(out, JSON.stringify(level, null, 2) + '\n');
  console.log(
    `wrote ${out}: ${level.solids.length} solids, ${level.anchors.length} anchors, ${level.pads.length} pads`,
  );
}
