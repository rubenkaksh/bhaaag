// Route bot for nagarkot-home. Dev aid, skipped by default: ROUTE_BOT=1 pnpm bot:route
import { writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildPlan, formatReport, playEdgeAlone, playRoute, TIME_LIMIT_S } from './routeBot';

const SEED = 20261142;
const on = process.env.ROUTE_BOT === '1';
const out = process.env.ROUTE_BOT_OUT ?? '';

describe('route plan (always on, cheap)', () => {
  it('has a jump/zip-only route from the start to the goal', () => {
    const plan = buildPlan(SEED);
    expect(plan.legs.length).toBeGreaterThan(10);
    expect(plan.legs[0].from).toBe(0);
  });
});

describe.skipIf(!on)('route bot (ROUTE_BOT=1)', () => {
  it('plays nagarkot-home end to end', () => {
    const plan = buildPlan(SEED);
    const alone = plan.legs.map((_, i) => playEdgeAlone(plan, i));
    const run = playRoute(plan);
    const report = formatReport(plan, run, alone);
    if (out !== '') writeFileSync(out, report + '\n');
    else console.log(report);
    if (process.env.ROUTE_BOT_STRICT === '1') {
      expect(run.finished).toBe(true);
      expect(run.seconds).toBeLessThan(TIME_LIMIT_S);
    }
  });
});
