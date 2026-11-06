// ADR 0007 section 7: pure plan for a row of adjoining flat-roofed houses. No three import.
// x values are unsigned distances from the lane axis; the builder mirrors them by `side`.

export const CLUSTER_STOREY = 2.8;

export class ClusterHouse {
  x0 = 0;
  x1 = 0;
  z0 = 0;
  z1 = 0;
  storeys = 1;
  roofY = 0;
  shareIn = 0;
  shareOut = 0;
}

export class ClusterPlan {
  side = 1;
  baseY = 0;
  houses: ClusterHouse[] = [];
}

export function planCluster(
  rng: () => number,
  side: number,
  xIn: number,
  xOut: number,
  z0: number,
  z1: number,
  baseY: number,
): ClusterPlan {
  const plan = new ClusterPlan();
  plan.side = side;
  plan.baseY = baseY;
  const target = rng() < 0.5 ? 3 : 4;
  let cursor = xIn;
  let prevStoreys = 1;
  for (let k = 0; k < target; k++) {
    const w = 4.5 + 2 * rng();
    let gap = 0;
    if (k > 0) gap = rng() < 0.5 ? 0 : 1 + 2 * rng();
    const hx0 = cursor + gap;
    if (hx0 + w > xOut) break;
    const d = Math.max(1, Math.min(8 + 3 * rng(), z1 - z0 - 1.6));
    let zc = (z0 + z1) / 2 + (rng() - 0.5) * 1.2;
    zc = Math.min(z1 - 0.8 - d / 2, Math.max(z0 + 0.8 + d / 2, zc));
    const roll = Math.floor(3 * rng());
    const storeys = k === 0 ? 1 + roll : Math.min(3, Math.max(1, prevStoreys + roll - 1));
    const h = new ClusterHouse();
    h.x0 = hx0;
    h.x1 = hx0 + w;
    h.z0 = zc - d / 2;
    h.z1 = zc + d / 2;
    h.storeys = storeys;
    h.roofY = baseY + CLUSTER_STOREY * storeys;
    if (k > 0 && gap === 0) {
      h.shareIn = 1;
      plan.houses[k - 1].shareOut = 1;
    }
    plan.houses.push(h);
    cursor = h.x1;
    prevStoreys = storeys;
  }
  return plan;
}
