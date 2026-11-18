// Climb/mantle on nagarkot-home: the level carries the flags and the sim grabs and mantles a roof edge.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_AIRBORNE, HERO_GROUNDED, HERO_HANGING, HeroState } from '../../src/core/hero';
import { BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { step } from '../../src/core/sim';

const cfg = DEFAULT_TUNING;

describe('nagarkot-home climb', () => {
  const world = loadWorldFromObject(buildNagarkotHome().level);
  it('level enables climb and parkour', () => {
    expect(world.climb).toBe(1);
    expect(world.parkour).toBe(1);
  });

  it('airborne hero at a roof edge grabs the ledge and the stick mantles onto it', () => {
    const w = loadWorldFromObject({ ...buildNagarkotHome().level });
    // Replace the level solids with one wall: roof top y=3 at z>=0, ground y=0 before it.
    w.solids.length = 0;
    w.killPlaneY = -60;
    w.solids.push(new AABB(new Vec3(-20, -2, -20), new Vec3(20, 0, 0)));
    w.solids.push(new AABB(new Vec3(-20, -2, 0), new Vec3(20, 3, 20)));
    const s = new HeroState();
    s.pz = -0.5;
    s.py = 1.5; // ledge 1.5 m above the feet: inside climb reach
    s.mode = HERO_AIRBORNE;
    s.grounded = 0;
    const f = new InputFrame();
    f.moveY = quantizeAxis(1);
    let hung = false;
    for (let i = 0; i < 90 && s.mode !== HERO_GROUNDED; i++) {
      step(s, f, w, cfg);
      if (s.mode === HERO_HANGING) hung = true;
    }
    expect(hung).toBe(true);
    expect(s.mode).toBe(HERO_GROUNDED);
    expect(s.py).toBeCloseTo(3, 2);
  });

  it('every balcony in the real level can be climbed onto its own roof', () => {
    const lv = buildNagarkotHome();
    const w = loadWorldFromObject(lv.level);
    const nodes = lv.world ? lv.world.nodes : lv.nodes; // bent world frame
    const balcs = nodes.filter((n) => n.up >= 0);
    expect(balcs.length).toBeGreaterThan(0);
    for (const b of balcs) {
      const roof = nodes[b.up];
      const cx = (b.x0 + b.x1) / 2;
      const cz = (b.z0 + b.z1) / 2;
      const rx = (roof.x0 + roof.x1) / 2;
      const rz = (roof.z0 + roof.z1) / 2;
      const alongX = Math.abs(rx - cx) > Math.abs(rz - cz);
      const dx = alongX ? Math.sign(rx - cx) : 0;
      const dz = alongX ? 0 : Math.sign(rz - cz);
      const s = new HeroState();
      // Edge of the balcony facing the roof, a radius inside, then a short hop up.
      s.px = alongX ? (dx > 0 ? b.x1 : b.x0) - dx * cfg.hero.radius : cx;
      s.pz = alongX ? cz : (dz > 0 ? b.z1 : b.z0) - dz * cfg.hero.radius;
      s.py = b.y;
      s.mode = HERO_GROUNDED;
      s.grounded = 1;
      const f = new InputFrame();
      f.moveX = quantizeAxis(dx);
      f.moveY = quantizeAxis(dz);
      let hung = false;
      const jump = new InputFrame();
      jump.moveX = f.moveX;
      jump.moveY = f.moveY;
      jump.buttons = BTN_JUMP;
      jump.pressed = BTN_JUMP;
      step(s, jump, w, cfg);
      for (let i = 0; i < 120; i++) {
        step(s, f, w, cfg);
        if (s.mode === HERO_HANGING) hung = true;
        if (s.dead === 1 || (hung && s.mode === HERO_GROUNDED)) break;
      }
      expect({ id: b.id, hung, mode: s.mode, y: Math.round(s.py * 10) / 10 }).toEqual({
        id: b.id,
        hung: true,
        mode: HERO_GROUNDED,
        y: Math.round(roof.y * 10) / 10,
      });
    }
  });
});
