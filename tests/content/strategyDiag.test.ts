import { writeFileSync } from 'node:fs';
import { it } from 'vitest';
import { LANES, MOVE_NAMES, STRATEGY_SEED, attemptStrategy, roofY } from '../../src/content/strategy/gen';
import { NODE_ROAD, NODE_ROOF } from '../../src/content/strategy/graph';

it('diag', () => {
  const lines: string[] = [];
  for (let k = 0; k < 6; k++) {
    const s = attemptStrategy(STRATEGY_SEED + k);
    const counts = [0, 0, 0, 0];
    for (const e of s.edges) counts[e.move]++;
    let unreachable = 0;
    const detail: string[] = [];
    for (const n of s.nodes) {
      if (n.kind !== NODE_ROOF || s.stats.reach[n.id]) continue;
      unreachable++;
      const h = s.layout.houses[n.house];
      if (detail.length < 6) {
        const above = s.layout.rows[h.row - 1];
        let roadInfo = '';
        if (above.kind === 1) {
          const rn = s.nodes.find((q) => q.kind === NODE_ROAD && Math.abs((q.z0 + q.z1) / 2 - s.layout.roads[above.road].zc) < 1e-6)!;
          const outs = s.edges.filter((e) => e.from === rn.id).map((e) => `${MOVE_NAMES[e.move]}->${e.to}`);
          const ins = s.edges.filter((e) => e.to === rn.id).map((e) => `${MOVE_NAMES[e.move]}<-${e.from}`);
          const prev = s.layout.rows[h.row - 2].houses
            .map((i) => {
              const a = s.layout.houses[i];
              const n = s.nodes[i];
              return `#${i} L${a.lane} y${n.y.toFixed(1)} z${n.z0}..${n.z1} r${s.stats.reach[i] ? 1 : 0}`;
            })
            .join(' | ');
          roadInfo = ` road#${rn.id} y${rn.y.toFixed(1)} z${rn.z0}..${rn.z1} r${s.stats.reach[rn.id] ? 1 : 0} tramps[${s.layout.roads[above.road].tramps}] out[${outs}] in[${ins}]\n    prev: ${prev}\n   `;
        }
        const info = roadInfo + above.houses
          .map((i) => {
            const a = s.layout.houses[i];
            return `#${i} L${a.lane} h${a.h} y${roofY(a).toFixed(1)} r${s.stats.reach[i] ? 1 : 0} zip${a.zipTo} t${a.tramp ? 1 : 0}`;
          })
          .join(' | ');
        const same = s.layout.rows[h.row].houses
          .map((i) => {
            const a = s.layout.houses[i];
            return `#${i} L${a.lane} h${a.h} r${s.stats.reach[i] ? 1 : 0}`;
          })
          .join(' | ');
        detail.push(
          `  house #${n.house} row ${h.row} L${h.lane} x${LANES[h.lane]} zc ${h.zc} h ${h.h} y ${roofY(h).toFixed(1)} c${h.cushion ? 1 : 0} t${h.tramp ? 1 : 0} zip${h.zipTo}\n    above(kind ${above.kind} z ${above.z0}..${above.z1}): ${info}\n    same: ${same}`,
        );
      }
    }
    lines.push(
      `seed ${s.seed}: nodes ${s.nodes.length} edges ${s.edges.length} ` +
        MOVE_NAMES.map((n, i) => n + ' ' + counts[i]).join(', ') +
        ` dead ${s.stats.deadEnds.length} escape ${s.stats.escapePaths} goal ${s.stats.goalReached} unreachable ${unreachable}`,
    );
    lines.push(...detail);
  }
  writeFileSync(
    '/private/tmp/claude-501/-Users-rubenk-projects-sandbox-workspaces-bhagdori/6a0f4080-3781-40af-a376-126bd4ff4161/scratchpad/diag.txt',
    lines.join('\n'),
  );
});
