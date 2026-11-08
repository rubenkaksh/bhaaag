/* global process, URL, console */
// Generates content/levels/l1.json (the one Kathmandu rooftop descent).
// Plain Node ESM, no deps, deterministic. Run: node tools/genLevel.mjs
//
// Layout (docs/graphics-spec.md, docs/level-layout.md): a packed hill village. Houses are 8 x 9 m,
// their walls run 8 m (2-3 storeys) down to the hill plot they stand on; there are no foundation
// walls. The hill under the route is a staircase of flat plots (one per house), each fenced on its
// downhill edge so a hero who falls cannot walk down the village to the goal. Every plot has a
// stair up to its own house roof, so a survivable fall costs time and is never a dead end.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Tunables (1 unit = 1 m, Y up, the hill descends toward -Z).
const HOPS = 7;
const SPACING = 18; // roof centre z step: a 9 m gap between neighbouring houses
const DROP = 4; // roof top y step (roof-to-roof height difference)
const HALF_X = 4; // house half width (8 m footprint)
const HALF_Z = 4.5; // house half depth (9 m footprint)
const WALL_H = 8; // roof top down to the plot it stands on (2-3 storeys, ends on the ground)
const ROOF_T = 0.6; // roof slab thickness
const THICK = 3; // start roof S0 only
const BALCONY_DEPTH = 1.8;
const BALCONY_DROP = 3; // balcony floor below the roof top
const ANCHOR_H = 1.6; // anchor height above the roof top (the rope end meets the roof)
const ANCHOR_Z = 1; // anchor offset from the roof centre toward the previous roof
const X_OFF = 5; // houses alternate x = -5 / +5 across the lane
const DECOY_X = 12; // decoy house centre offset, on the far side of the lane from its own roof
const CURB_H = 0.4; // roof parapet: within step-up, so it never blocks a run
const CURB_T = 0.25;
const CURB_GAP = 2; // half width of the launch gap at the middle of the lane and downhill edges
const PLINTH_H = 0.8; // tank plinth: a jump-up under 1 m
const DECOY_ROOFS = [2, 4, 6];
const PLOT_HALF_X = 30; // plot (hill step) half width; past it the hill falls away (kill)
const PLOT_THICK = 4; // > DROP, so a plot's downhill face closes the step to the next plot
const GOAL_RUN = 22; // the last plot runs this far past house 7's centre (goal area)
const FENCE_H = 2.6; // over jump (1.0 m) + edge grab (1.4 m): plots never connect on foot
const FENCE_T = 0.3;
const STAIR_GAP = 0.6; // stair stands this far off the outer wall (eave brackets fit between)
const STAIR_W = 1.4;
const STAIR_RISE = 0.35; // <= hero.stepUp (0.4)
const STAIR_TOP = 1.5; // top platform depth (z) at the uphill end; the outer curb is open there
const STAIR_PAST = 2.5; // the stair starts this far downhill of the house's downhill wall

const r = (n) => Math.round(n * 1000) / 1000;
const box = (x0, y0, z0, x1, y1, z1) => ({
  min: [r(x0), r(y0), r(z0)],
  max: [r(x1), r(y1), r(z1)],
});

/** Route house i (0 = the start roof S0): centre, roof top and plot top. */
export function houseAt(i) {
  const cx = i === 0 ? 0 : i % 2 === 0 ? X_OFF : -X_OFF;
  const cz = -SPACING * i;
  const top = -DROP * i;
  return { cx, cz, top, plot: top - WALL_H };
}

export function generateLevel() {
  const solids = [];
  const style = [];
  const anchors = [];
  const pads = [];
  const add = (b, s) => {
    solids.push(b);
    style.push(s);
  };

  // Ground slab (0, far below: falling off the hill kills), start roof S0 (1).
  add(box(-60, -90, -230, 60, -89, 20), 0);
  add(box(-5, -THICK, -4, 5, 0, 4), 2);

  for (let i = 1; i <= HOPS; i++) {
    const { cx, cz, top, plot } = houseAt(i);
    // Roof slab, then the walls down to the plot the house stands on.
    add(box(cx - HALF_X, top - ROOF_T, cz - HALF_Z, cx + HALF_X, top, cz + HALF_Z), 2);
    add(box(cx - HALF_X, plot, cz - HALF_Z, cx + HALF_X, top - ROOF_T, cz + HALF_Z), 1);
    anchors.push({ pos: [r(cx), r(top + ANCHOR_H), r(cz + ANCHOR_Z)] });
    pads.push(box(cx - HALF_X + 1, top, cz - HALF_Z + 1, cx + HALF_X - 1, top, cz + HALF_Z - 1));
  }

  // Decoys: a danger-coloured house across the lane, standing on the same plot, with an anchor at
  // the same height as the real one. It is hookable; it leads nowhere.
  for (const i of DECOY_ROOFS) {
    const { cx, cz, top, plot } = houseAt(i);
    const dx = -Math.sign(cx) * DECOY_X;
    add(box(dx - 3.5, plot, cz - 4.5, dx + 3.5, top - 0.6, cz + 4.5), 3);
    anchors.push({ pos: [r(dx), r(top + ANCHOR_H), r(cz + ANCHOR_Z)] });
  }

  // Hill plots (style 0), one per house: plot i runs from midway to the house above to midway to
  // the house below. Plot 0 reaches back behind the spawn, the last plot carries the goal area.
  for (let i = 0; i <= HOPS; i++) {
    const { cz, plot } = houseAt(i);
    const zMax = i === 0 ? 30 : cz + SPACING / 2;
    const zMin = i === HOPS ? cz - GOAL_RUN : cz - SPACING / 2;
    add(box(-PLOT_HALF_X, plot - PLOT_THICK, zMin, PLOT_HALF_X, plot, zMax), 0);
  }

  // Balconies: a timber ledge on each house's lane-facing wall.
  for (let i = 1; i <= HOPS; i++) {
    const { cx, cz, top } = houseAt(i);
    const dir = cx < 0 ? 1 : -1; // toward the lane axis
    const face = cx + dir * HALF_X;
    const x0 = Math.min(face, face + dir * BALCONY_DEPTH);
    const x1 = Math.max(face, face + dir * BALCONY_DEPTH);
    add(
      box(x0, top - BALCONY_DROP - 0.3, cz - HALF_Z + 1, x1, top - BALCONY_DROP, cz + HALF_Z - 1),
      1,
    );
  }
  // Roof parapets and tank plinths (style 4). The uphill (arrival) edge stays open: the hero
  // crosses it at speed. The downhill edge is walled on its outer half only and the lane edge on
  // its uphill half only: the diagonal rope to the next house leaves over the lane-downhill corner. The outer edge is open for
  // its last STAIR_TOP metres uphill, where the rescue stair arrives.
  for (let i = 1; i <= HOPS; i++) {
    const { cx, cz, top } = houseAt(i);
    const dir = cx < 0 ? 1 : -1;
    const x0 = cx - HALF_X;
    const x1 = cx + HALF_X;
    const z0 = cz - HALF_Z;
    const z1 = cz + HALF_Z;
    const y1 = top + CURB_H;
    const outer = dir > 0 ? [x0, x0 + CURB_T] : [x1 - CURB_T, x1];
    const lane = dir > 0 ? [x1 - CURB_T, x1] : [x0, x0 + CURB_T];
    add(box(outer[0], top, z0, outer[1], y1, z1 - STAIR_TOP), 4);
    add(box(lane[0], top, cz + CURB_GAP, lane[1], y1, z1), 4);
    if (dir > 0) add(box(x0, top, z0, cx - CURB_GAP, y1, z0 + CURB_T), 4);
    else add(box(cx + CURB_GAP, top, z0, x1, y1, z0 + CURB_T), 4);
    const tx = dir > 0 ? x0 + 1.1 : x1 - 1.1;
    add(box(tx - 0.8, top, cz - 3.2, tx + 0.8, top + PLINTH_H, cz - 1.6), 4);
  }

  // Plot fences (style 1) on the downhill edge of plots 0..HOPS-1: the plots never connect on foot.
  for (let i = 0; i < HOPS; i++) {
    const { cz, plot } = houseAt(i);
    const z = cz - SPACING / 2;
    add(box(-PLOT_HALF_X, plot, z, PLOT_HALF_X, plot + FENCE_H, z + FENCE_T), 1);
  }

  // Rescue stairs (style 1): every plot has a flight up its own house's outer wall, rising uphill,
  // ending on a platform STAIR_RISE under the roof beside the open end of the outer curb.
  for (let i = 0; i <= HOPS; i++) {
    const { cx, cz, top, plot } = houseAt(i);
    const hx = i === 0 ? 5 : HALF_X; // S0 is 10 x 8 m
    const hz = i === 0 ? 4 : HALF_Z;
    const out = i === 0 ? 1 : cx < 0 ? -1 : 1; // away from the lane (S0: away from house 1)
    const face = cx + out * hx;
    const sa = face + out * STAIR_GAP;
    const sb = sa + out * STAIR_W;
    const xs0 = Math.min(sa, sb);
    const xs1 = Math.max(sa, sb);
    const zTop = cz + hz;
    const zPlat = zTop - STAIR_TOP;
    const zStart = cz - hz - STAIR_PAST;
    const platY = top - STAIR_RISE;
    const n = Math.ceil((platY - plot) / STAIR_RISE) - 1; // steps below the platform
    const rise = (platY - plot) / (n + 1);
    const tread = (zPlat - zStart) / n;
    for (let k = 0; k < n; k++) {
      add(
        box(xs0, plot, zStart + k * tread, xs1, plot + (k + 1) * rise, zStart + (k + 1) * tread),
        1,
      );
    }
    // platform: from the wall face out over the stair width, at the uphill end
    const px0 = Math.min(face, sb);
    const px1 = Math.max(face, sb);
    add(box(px0, plot, zPlat, px1, platY, zTop), 1);
  }

  const last = houseAt(HOPS);
  return {
    version: 1,
    spawn: [0, 0, 0],
    spawnYaw: 3.14159,
    killPlaneY: -95,
    solids,
    ramps: [],
    anchors,
    // The haystack: 2 m over the last plot (out of jump reach from it), entered by running off
    // roof 7's downhill edge (the leap of faith).
    goal: box(-12, last.plot + 2, last.cz - HALF_Z - 13, 6, last.top - 2, last.cz - HALF_Z - 0.5),
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
