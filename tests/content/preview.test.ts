// Aim preview on the real l1 plus the per-call cost budget (fs/console/performance live here, not in
// tests/core, which is typechecked against the core-only ES2022 lib).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { PREVIEW_LETHAL, PREVIEW_NONE, PreviewResult, previewShot } from '../../src/core/preview';
import { World, addAnchor, addSolid } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const NAMES = ['NONE', 'SAFE', 'RELEASE', 'LETHAL'];

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

function hero(x: number, y: number, z: number): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.grounded = 1;
  s.mode = HERO_GROUNDED;
  return s;
}

function roofA(w: World): void {
  addSolid(w, box(-5, 0, -10, 5, 10, 0));
  w.killPlaneY = -30;
}

describe('previewShot cost', () => {
  it('worst case (long rope, lethal, full release search) stays near the 2 ms budget', () => {
    const w = new World();
    roofA(w);
    addSolid(w, box(-6, -40, 30, 6, 40, 38));
    addAnchor(w, 0, 0, 30); // 12 m drop over 31 m: ~21 deg, wall death, nothing below
    const s = hero(0, 10, -1);
    const out = new PreviewResult();
    previewShot(s, 0, w, cfg, out); // warm up
    const times: number[] = [];
    for (let i = 0; i < 50; i++) {
      const t0 = performance.now();
      previewShot(s, 0, w, cfg, out);
      times.push(performance.now() - t0);
    }
    times.sort((a, b) => a - b);
    const worst = times[Math.floor(times.length / 2)]; // median: one scheduler hiccup under parallel load must not fail the run
    console.log(`median worst-case lethal preview: ${NAMES[out.outcome]} ${worst.toFixed(2)} ms`);
    expect(out.outcome).toBe(PREVIEW_LETHAL);
    expect(worst).toBeLessThan(25); // loose: CI machines vary, the 2 ms budget is read from the log
  });
});

describe('previewShot on the real l1', () => {
  const text = readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8');
  const w = loadWorldFromJson(text);
  const out = new PreviewResult();

  it('every route hop from a normal standing position is neither NONE nor LETHAL', () => {
    const rows: string[] = [];
    let worstMs = 0;
    let worstWhere = '';
    for (let hop = 0; hop < w.route.length; hop++) {
      const id = w.route[hop];
      const stands: [string, HeroState][] = [];
      if (hop === 0) {
        const s = hero(w.spawn.x, w.spawn.y, w.spawn.z);
        s.yaw = w.spawnYaw;
        stands.push(['spawn', s]);
      } else {
        const roof = w.solids[2 + 2 * (hop - 1)]; // the roof the previous hop lands on
        const cx = (roof.min.x + roof.max.x) / 2;
        const cz = (roof.min.z + roof.max.z) / 2;
        stands.push(['roof centre', hero(cx, roof.max.y, cz)]);
        stands.push(['3 m before edge', hero(cx, roof.max.y, roof.min.z + 3)]);
        stands.push(['launch strip', hero(cx, roof.max.y, roof.min.z + 1.5)]);
      }
      for (const [where, s] of stands) {
        let ms = 0;
        for (let i = 0; i < 20; i++) {
          const t0 = performance.now();
          previewShot(s, id, w, cfg, out);
          ms = Math.max(ms, performance.now() - t0);
        }
        if (ms > worstMs) {
          worstMs = ms;
          worstWhere = `hop ${hop + 1} ${where}`;
        }
        rows.push(
          `hop ${hop + 1} ${where.padEnd(15)} ${NAMES[out.outcome].padEnd(7)} ${ms.toFixed(2)} ms`,
        );
        expect(out.outcome, `hop ${hop + 1} ${where}\n${rows.join('\n')}`).not.toBe(PREVIEW_NONE);
        expect(out.outcome, `hop ${hop + 1} ${where}\n${rows.join('\n')}`).not.toBe(PREVIEW_LETHAL);
      }
    }
    console.log(`\n${rows.join('\n')}\nworst per-call: ${worstMs.toFixed(2)} ms (${worstWhere})\n`);
    expect(worstMs).toBeLessThan(50); // loose: the 2 ms budget is read from the log
  });

  it('every decoy anchor can be hooked (preview is not NONE) from some roof centre', () => {
    for (let id = 0; id < w.anchors.length; id++) {
      if (w.route.indexOf(id) >= 0) continue;
      let hookable = false;
      for (let r = 0; r < 7 && !hookable; r++) {
        const roof = w.solids[2 + 2 * r];
        const s = hero((roof.min.x + roof.max.x) / 2, roof.max.y, (roof.min.z + roof.max.z) / 2);
        previewShot(s, id, w, cfg, out);
        if (out.outcome !== PREVIEW_NONE) hookable = true;
      }
      expect(hookable, `decoy anchor ${id}`).toBe(true);
    }
  });
});
