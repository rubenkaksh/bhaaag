import { describe, expect, it } from 'vitest';
import { trailX, waterDepth } from '../../src/spikes/trail';
import {
  BIKE_SPIKE,
  BOW,
  DT,
  HORSE_SPIKE,
  RIFLE,
  createCamp,
  createRide,
  createRun,
  createWeapon,
  neutralInput,
  spawnEnemy,
  stepCamp,
  stepEnemy,
  stepProjectiles,
  stepRide,
  stepRun,
  stepWeapon,
  type Projectile,
  type RunState,
  type SpikeInput,
} from '../../src/spikes';

const inp = (o: Partial<SpikeInput>): SpikeInput => ({ ...neutralInput(), ...o });

describe('weapons', () => {
  it('bow: a full draw hits harder and flies faster than a quick tap', () => {
    const shoot = (holdSeconds: number): Projectile => {
      const w = createWeapon(BOW, 5);
      const out: Projectile[] = [];
      for (let t = 0; t < holdSeconds; t += DT) stepWeapon(w, true, false, DT, 0, 0, 0, 1, out);
      stepWeapon(w, false, false, DT, 0, 0, 0, 1, out);
      return out[0];
    };
    const full = shoot(0.8);
    const quick = shoot(0.2);
    expect(full.damage).toBeCloseTo(3);
    expect(quick.damage).toBeLessThan(full.damage);
    expect(Math.hypot(quick.vx, quick.vz)).toBeLessThan(Math.hypot(full.vx, full.vz));
  });

  it('bow is silent, rifle is loud', () => {
    const w = createWeapon(RIFLE, 8);
    const out: Projectile[] = [];
    expect(stepWeapon(w, true, false, DT, 0, 0, 0, 1, out)).toBe(RIFLE.noiseRadius);
    const b = createWeapon(BOW, 5);
    for (let i = 0; i < 60; i++) stepWeapon(b, true, false, DT, 0, 0, 0, 1, out);
    expect(stepWeapon(b, false, false, DT, 0, 0, 0, 1, out)).toBe(0);
  });

  it('rifle: empty mag auto-reloads from reserve and takes reloadTime', () => {
    const w = createWeapon(RIFLE, 8);
    const out: Projectile[] = [];
    for (let i = 0; i < 600 && w.mag > 0; i++) stepWeapon(w, true, false, DT, 0, 0, 0, 1, out);
    expect(w.mag).toBe(0);
    stepWeapon(w, false, false, DT, 0, 0, 0, 1, out);
    expect(w.reloadLeft).toBeGreaterThan(0);
    for (let i = 0; i < Math.ceil(RIFLE.reloadTime / DT) + 2; i++)
      stepWeapon(w, false, false, DT, 0, 0, 0, 1, out);
    expect(w.mag).toBe(RIFLE.magSize);
    expect(w.reserve).toBe(0);
  });

  it('a 140 m/s round does not tunnel through a wolf, and pierces one enemy', () => {
    const e1 = spawnEnemy(1, 'wolf', 0, 10);
    const e2 = spawnEnemy(2, 'wolf', 0, 12);
    e1.hp = 1;
    e2.hp = 1;
    const p: Projectile = {
      x: 0,
      z: 0,
      vx: 0,
      vz: 140,
      damage: 2,
      life: 1,
      pierceLeft: 1,
      alive: true,
    };
    const list = [p];
    const kills = [] as number[];
    for (let i = 0; i < 20; i++)
      for (const k of stepProjectiles(list, [e1, e2], DT, [])) kills.push(k.id);
    expect(kills).toEqual([1, 2]);
  });
});

describe('enemies', () => {
  it('animals hold at the edge of a lit fire; zombies walk through', () => {
    const fire = { x: 0, z: 0, r: 7 };
    const wolf = spawnEnemy(1, 'wolf', 20, 0);
    const zombie = spawnEnemy(2, 'zombie', 20, 0);
    for (let i = 0; i < 600; i++) {
      stepEnemy(wolf, 0, 0, fire, DT);
      stepEnemy(zombie, 0, 0, fire, DT);
    }
    expect(Math.hypot(wolf.x, wolf.z)).toBeGreaterThanOrEqual(7 - 0.2);
    expect(Math.hypot(zombie.x, zombie.z)).toBeLessThan(1);
  });

  it('unlit fire does not stop animals', () => {
    const wolf = spawnEnemy(1, 'wolf', 20, 0);
    let dmg = 0;
    for (let i = 0; i < 600; i++) dmg += stepEnemy(wolf, 0, 0, null, DT);
    expect(dmg).toBeGreaterThan(0);
  });

  it('prey flees from the player', () => {
    const deer = spawnEnemy(1, 'deer', 5, 0);
    for (let i = 0; i < 60; i++) stepEnemy(deer, 0, 0, null, DT);
    expect(deer.x).toBeGreaterThan(10);
  });
});

describe('ride', () => {
  const run = (cfg = HORSE_SPIKE.ride, seed = 1) => createRide(cfg, seed);

  it('accelerates to max speed and boost lifts the cap', () => {
    const s = run();
    s.obstacles = [];
    for (let i = 0; i < 600; i++) stepRide(s, inp({ throttle: 1 }), DT);
    expect(s.speed).toBeCloseTo(s.cfg.mount.maxSpeed, 1);
    s.boost = 1;
    for (let i = 0; i < 300; i++) stepRide(s, inp({ throttle: 1, boost: true }), DT);
    expect(s.speed).toBeGreaterThan(s.cfg.mount.maxSpeed);
    expect(s.boost).toBeLessThan(1);
  });

  it('bike drifts wider than the horse for the same steering', () => {
    const lateral = (cfg: typeof HORSE_SPIKE.ride): number => {
      const s = run(cfg);
      s.obstacles = [];
      s.speed = 12;
      s.vz = 12;
      s.heading = 0;
      for (let i = 0; i < 30; i++) stepRide(s, inp({ throttle: 1, steer: 1 }), DT);
      // slip = how far velocity direction lags the heading
      return Math.abs(Math.atan2(s.vx, s.vz) - s.heading);
    };
    expect(lateral(BIKE_SPIKE.ride)).toBeGreaterThan(lateral(HORSE_SPIKE.ride));
  });

  it('a log hurts unless you jump it', () => {
    const attempt = (jump: boolean): number => {
      const s = run();
      s.enemies = [];
      s.spawnTimer = 1e9;
      s.obstacles = [{ kind: 'log', x: 0, z: 12, r: 1.4, h: 0.8 }];
      s.speed = 12;
      s.vz = 12;
      for (let i = 0; i < 150; i++)
        stepRide(s, inp({ throttle: 1, jump: jump && Math.abs(s.z - 9) < 1.5 }), DT);
      return s.hp;
    };
    expect(attempt(false)).toBeLessThan(HORSE_SPIKE.ride.hp);
    expect(attempt(true)).toBe(HORSE_SPIKE.ride.hp);
  });

  it('a ramp launches the bike', () => {
    const s = run(BIKE_SPIKE.ride);
    s.enemies = [];
    s.spawnTimer = 1e9;
    s.obstacles = [{ kind: 'ramp', x: 0, z: 20, r: 2.2, h: 0 }];
    s.speed = 20;
    s.vz = 20;
    let maxY = 0;
    for (let i = 0; i < 120; i++) {
      stepRide(s, inp({ throttle: 1 }), DT);
      maxY = Math.max(maxY, s.y);
    }
    expect(maxY).toBeGreaterThan(1);
  });

  it('bike tramples a zombie at speed; horse takes the hit', () => {
    const hit = (cfg: typeof HORSE_SPIKE.ride): { hp: number; kills: number } => {
      const s = run(cfg);
      s.obstacles = [];
      s.spawnTimer = 1e9;
      s.speed = 12;
      s.vz = 12;
      s.enemies = [spawnEnemy(1, 'zombie', 0, 6)];
      for (let i = 0; i < 60; i++) stepRide(s, inp({ throttle: 1 }), DT);
      return { hp: s.hp, kills: s.kills };
    };
    expect(hit(BIKE_SPIKE.ride)).toEqual({ hp: BIKE_SPIKE.ride.hp, kills: 1 });
    expect(hit(HORSE_SPIKE.ride).hp).toBeLessThan(HORSE_SPIKE.ride.hp);
  });

  it('arrows kill a wolf while riding', () => {
    const s = run();
    s.obstacles = [];
    s.spawnTimer = 1e9;
    s.enemies = [spawnEnemy(1, 'wolf', 0, 30)];
    s.enemies[0].hp = 3;
    for (let i = 0; i < 60; i++) stepRide(s, inp({ aimZ: 1, fire: true }), DT);
    for (let i = 0; i < 60; i++) stepRide(s, inp({ aimZ: 1, fire: false }), DT);
    expect(s.kills).toBe(1);
  });
});

describe('camp', () => {
  const mk = (spike = HORSE_SPIKE) =>
    createCamp(spike.camp, 7, createWeapon(spike.ride.weapon, 20), 6);

  it('cook then eat: raw meat becomes a bigger heal plus regen', () => {
    const s = mk();
    s.raw = 1;
    s.x = 1;
    stepCamp(s, inp({ interact: true }), DT);
    stepCamp(s, inp({}), DT);
    expect(s.cooking).toBe(true);
    for (let i = 0; i < 5 * 60; i++) stepCamp(s, inp({}), DT);
    expect(s.cooked).toBe(1);
    const before = s.hp;
    stepCamp(s, inp({ eat: true }), DT);
    expect(s.hp).toBeGreaterThanOrEqual(Math.min(s.cfg.maxHp, before + s.cfg.cookedHeal) - 1e-6);
    expect(s.regenT).toBeGreaterThan(0);
  });

  it('raw meat heals less and blocks regen', () => {
    const s = mk();
    s.raw = 1;
    s.regenT = 5;
    stepCamp(s, inp({ eat: true }), DT);
    expect(s.sickT).toBeGreaterThan(0);
    const hp = s.hp;
    for (let i = 0; i < 60; i++) stepCamp(s, inp({}), DT);
    expect(s.hp).toBeLessThanOrEqual(hp + 1e-6);
  });

  it('fire burns down and wood relights it', () => {
    const s = mk();
    s.fuel = 1;
    s.wood = 1;
    for (let i = 0; i < 90; i++) stepCamp(s, inp({}), DT);
    expect(s.fuel).toBe(0);
    stepCamp(s, inp({ interact: true }), DT);
    expect(s.fuel).toBeGreaterThan(30);
    expect(s.wood).toBe(0);
  });

  it('walking over wood and dropped meat picks it up', () => {
    const s = mk();
    s.enemies = [];
    s.waveTimer = 1e9;
    s.pickups = [
      { kind: 'wood', x: s.x + 0.5, z: s.z, amount: 1 },
      { kind: 'meat', x: s.x, z: s.z + 0.5, amount: 2 },
    ];
    const w = s.wood;
    stepCamp(s, inp({}), DT);
    expect(s.wood).toBe(w + 1);
    expect(s.raw).toBe(2);
  });

  it('waves escalate and a rifle shot speeds the next one up', () => {
    const quiet = mk(BIKE_SPIKE);
    const loud = mk(BIKE_SPIKE);
    loud.heat = 1;
    quiet.waveTimer = 10;
    loud.waveTimer = 10;
    for (let i = 0; i < 6 * 60; i++) {
      stepCamp(quiet, inp({}), DT);
      stepCamp(loud, inp({}), DT);
    }
    expect(loud.waveLevel).toBeGreaterThan(quiet.waveLevel);
    const sizes: number[] = [];
    for (let l = 0; l < 6; l++)
      sizes.push(Math.round(quiet.cfg.waveBase + l * quiet.cfg.waveGrowth));
    expect(sizes[5]).toBeGreaterThan(sizes[0] * 2);
  });

  it('standing still in the dark with the fire out loses; dawn arrives otherwise', () => {
    const s = mk();
    s.fuel = 0;
    s.wood = 0;
    s.pickups = [];
    for (let i = 0; i < 240 * 60 && s.result === 'playing'; i++) stepCamp(s, inp({}), DT);
    expect(s.result).toBe('dead');
    const calm = createCamp(
      { ...HORSE_SPIKE.camp, nightLength: 5, firstWave: 100, bloodMoonAt: 2 },
      3,
      createWeapon(BOW, 5),
      10,
    );
    for (let i = 0; i < 6 * 60; i++) stepCamp(calm, inp({}), DT);
    expect(calm.result).toBe('dawn');
  });
});

describe('full run', () => {
  const play = (run: RunState, maxTicks: number): void => {
    for (let i = 0; i < maxTicks && run.phase === 'ride'; i++) {
      const r = run.ride;
      // Bot: ride straight, jump logs, sidestep rocks. Good enough to prove the loop can finish.
      let steer = 0;
      let jump = false;
      for (const o of r.obstacles) {
        const dz = o.z - r.z;
        if (dz > 0 && dz < 10) {
          if (o.kind === 'log' && dz < 5) jump = true;
          if (o.kind === 'rock') steer = o.x > r.x ? -1 : 1;
        }
      }
      const tx = r.trail === null ? 0 : trailX(r.trail.spec, r.z + 6);
      steer += (Math.atan2(tx - r.x, 10) - r.heading) * 3;
      const wet = r.trail !== null && waterDepth(r.trail, tx, r.z + 12) > 0.05 && r.water <= 0.05;
      stepRun(
        run,
        inp({ throttle: wet && r.speed > 5 ? -1 : 1, steer: Math.max(-1, Math.min(1, steer)), jump, aimZ: 1 }),
        DT,
      );
    }
  };

  it('same seed, same outcome', () => {
    const a = createRun(HORSE_SPIKE, 42);
    const b = createRun(HORSE_SPIKE, 42);
    play(a, 4000);
    play(b, 4000);
    expect([a.phase, a.ride.z, a.ride.hp, a.tick]).toEqual([b.phase, b.ride.z, b.ride.hp, b.tick]);
  });

  it('ride hands over to camp with hp, weapon and ammo', () => {
    const run = createRun(HORSE_SPIKE, 5);
    run.ride.obstacles = [];
    run.ride.spawnTimer = 1e9;
    play(run, 6000);
    expect(run.phase).toBe('camp');
    expect(run.camp?.weapon).toBe(run.ride.weapon);
    expect(run.camp?.hp).toBe(run.ride.hp);
  });

  it('a camp night runs to dawn or death and then stops', () => {
    const run = createRun(BIKE_SPIKE, 9);
    run.ride.obstacles = [];
    run.ride.spawnTimer = 1e9;
    play(run, 8000);
    expect(run.phase).toBe('camp');
    for (let i = 0; i < 300 * 60 && (run.phase as string) === 'camp'; i++)
      stepRun(run, neutralInput(), DT);
    expect(['dawn', 'dead']).toContain(run.phase);
    const tick = run.tick;
    stepRun(run, neutralInput(), DT);
    expect(run.tick).toBe(tick);
  });
});
