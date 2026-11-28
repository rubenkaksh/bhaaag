// A scripted player for the spike cores: rides straight, dodges, jumps logs and shoots; at camp it
// guards the fire, cooks, eats, feeds the fire and hunts. Used by tests to prove a full run is
// winnable and by the playable spike's attract/auto mode. Pure TS, deterministic.
import { ENEMY_DEFS, type Enemy } from './enemies';
import type { RunState } from './run';
import { trailX, waterDepth } from './trail';
import { safeSteer } from './ride';
import { neutralInput, type SpikeInput } from './types';

export interface BotMem {
  tick: number;
  drawT: number;
  mode: 'guard' | 'gather' | 'hunt';
}

export function newBotMem(): BotMem {
  return { tick: 0, drawT: 0, mode: 'guard' };
}

function nearest(
  list: Enemy[],
  x: number,
  z: number,
  hostile: boolean,
  maxD: number,
): Enemy | null {
  let best: Enemy | null = null;
  let bd = maxD;
  for (const e of list) {
    if (e.dead || ENEMY_DEFS[e.kind].hostile !== hostile) continue;
    const d = Math.hypot(e.x - x, e.z - z);
    if (d < bd) {
      bd = d;
      best = e;
    }
  }
  return best;
}

/** Aim point with lead: hostiles close on the target, prey runs away from it. */
function lead(
  e: Enemy,
  tx: number,
  tz: number,
  projSpeed: number,
  out: { x: number; z: number },
): void {
  const def = ENEMY_DEFS[e.kind];
  const dx = tx - e.x;
  const dz = tz - e.z;
  const d = Math.hypot(dx, dz) || 1;
  const sgn = def.hostile ? 1 : -1;
  const t = d / projSpeed;
  out.x = e.x + (dx / d) * def.speed * sgn * t * 0.9;
  out.z = e.z + (dz / d) * def.speed * sgn * t * 0.9;
}
const _lead = { x: 0, z: 0 };

function shoot(
  run: RunState,
  mem: BotMem,
  inp: SpikeInput,
  w: { cfg: { kind: string } },
  dist: number,
): void {
  if (w.cfg.kind === 'bow') {
    // draw for about 0.75 s, release, repeat
    if (mem.drawT < 0.78) {
      inp.fire = true;
      mem.drawT += 1 / 60;
    } else {
      inp.fire = false;
      mem.drawT = 0;
    }
  } else inp.fire = dist < 80;
  void run;
}

export function botRide(run: RunState, mem: BotMem): SpikeInput {
  const r = run.ride;
  const inp = neutralInput();
  const m = r.cfg.mount;
  const cx = (z: number): number => (r.trail === null ? 0 : trailX(r.trail.spec, z));
  let targetX: number | null = null;
  let slow = false;
  // look about 1.6 s ahead (the trail packs obstacles into a narrower band than the old corridor)
  const look = Math.max(22, r.speed * 1.6 + 6);
  for (const o of r.obstacles) {
    const dz = o.z - r.z;
    if (dz < -1 || dz > look) continue;
    const reach = o.r + m.radius + 1.2;
    if (Math.abs(o.x - r.x) > reach) continue;
    if (o.kind === 'log' && m.overLogs === true) continue;
    if (o.kind === 'log' && m.jumpV >= 7) {
      if (dz < 5 && dz > 1.5) inp.jump = true;
      continue;
    }
    if (o.kind === 'ramp') continue;
    // pass on the side nearer the trail centre unless already well past the other side
    const c = cx(o.z);
    const side = Math.abs(r.x - o.x) > reach * 0.6 ? Math.sign(r.x - o.x) : Math.sign(c - o.x) || 1;
    targetX = o.x + side * reach;
    if (dz < look * 0.6 && o.kind === 'rock') slow = true;
  }
  // follow the trail centreline a little ahead when nothing is in the way
  if (targetX === null) targetX = r.trail === null ? r.x * 0.5 : cx(r.z + 6);
  let nearDz = 14;
  for (const o of r.obstacles) {
    const dz = o.z - r.z;
    if (
      dz > 0 &&
      dz < nearDz &&
      Math.abs(o.x - r.x) < o.r + m.radius + 1.5 &&
      o.kind !== 'ramp' &&
      o.kind !== 'mud'
    )
      nearDz = Math.max(3, dz);
  }
  const want = Math.atan2(targetX - r.x, nearDz);
  const lim = r.trail === null ? 1 : safeSteer(r) * 0.9;
  inp.steer = Math.max(-lim, Math.min(lim, (want - r.heading) * 4));
  inp.throttle = slow ? (r.speed > m.maxSpeed * 0.6 ? -0.4 : 0.5) : 1;
  inp.boost = !slow && r.boost > 0.4 && r.grade > -0.04;
  // ease off for the ford: brake to a safe speed before the water
  if (r.trail !== null) {
    let wetAhead = false;
    for (let d = 2; d <= 30; d += 2) if (waterDepth(r.trail, cx(r.z + d), r.z + d) > 0.05) wetAhead = true;
    if (wetAhead && r.water <= 0.05 && r.speed > m.fordSafe - 2) {
      inp.throttle = -1;
      inp.boost = false;
    }
  }
  // shoot the nearest hostile ahead or behind
  const e = nearest(r.enemies, r.x, r.z, true, 70);
  if (e !== null) {
    lead(e, r.x, r.z, r.weapon.cfg.speedMax, _lead);
    inp.aimX = _lead.x - r.x;
    inp.aimZ = _lead.z - r.z;
    shoot(run, mem, inp, r.weapon, Math.hypot(inp.aimX, inp.aimZ));
  } else {
    inp.aimZ = 1;
    mem.drawT = 0;
  }
  return inp;
}

export function botCamp(run: RunState, mem: BotMem): SpikeInput {
  const c = run.camp;
  const inp = neutralInput();
  if (c === null) return inp;
  mem.tick += 1;
  const pulse = mem.tick % 2 === 0;
  const dFire = Math.hypot(c.x, c.z);
  // Animals hold at a lit fire's edge, so they only count as a threat when the fire is out or they are close.
  const lit = c.fuel > 0;
  let threat: Enemy | null = null;
  let td = 26;
  for (const e of c.enemies) {
    const def = ENEMY_DEFS[e.kind];
    if (e.dead || !def.hostile) continue;
    const d = Math.hypot(e.x - c.x, e.z - c.z);
    // animals pinned at the fire's edge are free targets (and meat) while there is spare ammo
    if (def.fearsFire && lit && d > 9 && (d > 14 || c.weapon.mag + c.weapon.reserve <= 10))
      continue;
    if (d < td) {
      td = d;
      threat = e;
    }
  }
  const prey = nearest(c.enemies, c.x, c.z, false, 30);
  const wantsFuel = c.fuel < 30 && c.wood > 0;

  // aim and fire first
  if (threat !== null) {
    lead(threat, c.x, c.z, c.weapon.cfg.speedMax, _lead);
    inp.aimX = _lead.x - c.x;
    inp.aimZ = _lead.z - c.z;
    shoot(run, mem, inp, c.weapon, Math.hypot(inp.aimX, inp.aimZ));
  } else if (
    prey !== null &&
    c.weapon.mag + c.weapon.reserve > 25 &&
    Math.hypot(prey.x - c.x, prey.z - c.z) < 20
  ) {
    lead(prey, c.x, c.z, c.weapon.cfg.speedMax, _lead);
    inp.aimX = _lead.x - c.x;
    inp.aimZ = _lead.z - c.z;
    shoot(run, mem, inp, c.weapon, Math.hypot(inp.aimX, inp.aimZ));
  } else mem.drawT = 0;

  // health and food
  if (c.hp <= c.cfg.maxHp - 3 && c.cooked > 0 && pulse) inp.eat = true;
  else if (c.hp <= c.cfg.maxHp - 5 && c.raw > 0 && c.cooked === 0 && pulse && c.sickT <= 0)
    inp.eat = true;

  // movement
  let tx = 0;
  let tz = 0;
  let goal = 'fire';
  if (threat === null || Math.hypot(threat.x - c.x, threat.z - c.z) > 14) {
    let best: { x: number; z: number } | null = null;
    let bd = 30;
    for (const p of c.pickups) {
      if (p.kind === 'wood' && c.wood >= 3 && c.fuel > 60) continue;
      const d = Math.hypot(p.x - c.x, p.z - c.z);
      let unsafe = false;
      for (const e of c.enemies) {
        if (!e.dead && ENEMY_DEFS[e.kind].hostile && Math.hypot(e.x - p.x, e.z - p.z) < 12)
          unsafe = true;
      }
      if (unsafe) continue;
      if (d < bd) {
        bd = d;
        best = p;
      }
    }
    if (best !== null && threat === null) {
      tx = best.x;
      tz = best.z;
      goal = 'pickup';
    }
  }
  if (goal === 'fire') {
    // stand on the near side of the fire from the threat so animals hold off and zombies come to us
    if (threat !== null) {
      const ax = threat.x - c.x;
      const az = threat.z - c.z;
      const al = Math.hypot(ax, az) || 1;
      // kite away from a close melee threat
      if (al < 3.2) {
        tx = c.x - (ax / al) * 4;
        tz = c.z - (az / al) * 4;
        goal = 'kite';
      }
    }
    if (goal === 'fire') {
      tx = 1.6;
      tz = 0;
    }
  }
  const dx = tx - c.x;
  const dz = tz - c.z;
  const dl = Math.hypot(dx, dz);
  if (dl > 0.5) {
    inp.moveX = dx / dl;
    inp.moveZ = dz / dl;
  }
  // cook or refuel while at the fire
  if (dFire <= 3 && pulse && ((c.raw > 0 && !c.cooking) || wantsFuel)) inp.interact = true;
  if (!inp.interact && dFire > 3 && ((c.raw > 0 && !c.cooking) || wantsFuel) && threat === null) {
    inp.moveX = -c.x / (dFire || 1);
    inp.moveZ = -c.z / (dFire || 1);
  }
  return inp;
}

export function botInput(run: RunState, mem: BotMem): SpikeInput {
  if (run.phase === 'ride') return botRide(run, mem);
  if (run.phase === 'camp') return botCamp(run, mem);
  return neutralInput();
}
