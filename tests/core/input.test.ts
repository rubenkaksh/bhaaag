import { describe, expect, it } from 'vitest';
import {
  AXIS_MAX,
  BTN_ACTION,
  BTN_AIM,
  BTN_DROP,
  BTN_HOOK,
  BTN_JUMP,
  BTN_REEL,
  BTN_RESTART,
  TURN_UNITS,
  clearInputFrame,
  copyInputFrame,
  dequantizeAxis,
  dequantizeTurn,
  hasButton,
  newInputFrame,
  quantizeAxis,
  quantizeTurn,
  wasPressed,
} from '../../src/core/input';

describe('input quantization', () => {
  it('axis round-trip error is below 1/AXIS_MAX', () => {
    for (let i = -20; i <= 20; i++) {
      const v = i / 20;
      const back = dequantizeAxis(quantizeAxis(v));
      expect(Math.abs(back - v)).toBeLessThan(1 / AXIS_MAX);
    }
  });

  it('turn round-trip error is below 2*pi/4096', () => {
    const limit = (Math.PI * 2) / TURN_UNITS;
    for (let i = -8; i <= 8; i++) {
      const r = (i * Math.PI) / 8;
      const back = dequantizeTurn(quantizeTurn(r));
      expect(Math.abs(back - r)).toBeLessThan(limit);
    }
  });

  it('quantizeTurn returns an integer in turn units', () => {
    for (let i = -8; i <= 8; i++) {
      const r = (i * Math.PI) / 8;
      expect(Number.isInteger(quantizeTurn(r))).toBe(true);
    }
  });

  it('clamps the axis at +1 and -1', () => {
    expect(quantizeAxis(1)).toBe(AXIS_MAX);
    expect(quantizeAxis(1.5)).toBe(AXIS_MAX);
    expect(quantizeAxis(100)).toBe(AXIS_MAX);
    expect(quantizeAxis(-1)).toBe(-AXIS_MAX);
    expect(quantizeAxis(-1.5)).toBe(-AXIS_MAX);
    expect(quantizeAxis(-100)).toBe(-AXIS_MAX);
    expect(quantizeAxis(0)).toBe(0);
    expect(dequantizeAxis(AXIS_MAX)).toBe(1);
    expect(dequantizeAxis(-AXIS_MAX)).toBe(-1);
  });
});

describe('input button flags', () => {
  it('flags are distinct powers of two', () => {
    const flags = [BTN_JUMP, BTN_HOOK, BTN_DROP, BTN_REEL, BTN_RESTART, BTN_AIM, BTN_ACTION];
    for (let i = 0; i < flags.length; i++) {
      const v = flags[i];
      expect(v).toBeGreaterThan(0);
      expect(v & (v - 1)).toBe(0);
      for (let j = i + 1; j < flags.length; j++) {
        expect(v & flags[j]).toBe(0);
      }
    }
  });

  it('hasButton reports held buttons', () => {
    const f = newInputFrame();
    f.buttons = BTN_JUMP | BTN_HOOK;
    expect(hasButton(f, BTN_JUMP)).toBe(true);
    expect(hasButton(f, BTN_HOOK)).toBe(true);
    expect(hasButton(f, BTN_DROP)).toBe(false);
    expect(hasButton(f, BTN_REEL)).toBe(false);
  });

  it('wasPressed reports only this tick edges', () => {
    const f = newInputFrame();
    f.buttons = BTN_JUMP | BTN_REEL; // held, not newly pressed
    f.pressed = BTN_REEL; // edge this tick
    expect(wasPressed(f, BTN_REEL)).toBe(true);
    expect(wasPressed(f, BTN_JUMP)).toBe(false);
    expect(wasPressed(f, BTN_DROP)).toBe(false);
  });
});

describe('input frame lifecycle', () => {
  it('newInputFrame is all zero', () => {
    const f = newInputFrame();
    expect(f.moveX).toBe(0);
    expect(f.moveY).toBe(0);
    expect(f.lookYaw).toBe(0);
    expect(f.lookPitch).toBe(0);
    expect(f.aimYaw).toBe(0);
    expect(f.aimPitch).toBe(0);
    expect(f.hasAim).toBe(0);
    expect(f.buttons).toBe(0);
    expect(f.pressed).toBe(0);
  });

  it('copyInputFrame is a deep value copy', () => {
    const src = newInputFrame();
    src.moveX = 1234;
    src.moveY = -5678;
    src.lookYaw = 10;
    src.lookPitch = -20;
    src.aimYaw = 30;
    src.aimPitch = -40;
    src.hasAim = 1;
    src.buttons = BTN_JUMP | BTN_ACTION;
    src.pressed = BTN_AIM;

    const dst = newInputFrame();
    copyInputFrame(dst, src);

    expect(dst.moveX).toBe(1234);
    expect(dst.moveY).toBe(-5678);
    expect(dst.lookYaw).toBe(10);
    expect(dst.lookPitch).toBe(-20);
    expect(dst.aimYaw).toBe(30);
    expect(dst.aimPitch).toBe(-40);
    expect(dst.hasAim).toBe(1);
    expect(dst.buttons).toBe(BTN_JUMP | BTN_ACTION);
    expect(dst.pressed).toBe(BTN_AIM);

    src.moveX = 0;
    src.buttons = 0;
    src.hasAim = 0;
    expect(dst.moveX).toBe(1234);
    expect(dst.buttons).toBe(BTN_JUMP | BTN_ACTION);
    expect(dst.hasAim).toBe(1);
  });

  it('clearInputFrame zeroes every field', () => {
    const f = newInputFrame();
    f.moveX = 1;
    f.moveY = 2;
    f.lookYaw = 3;
    f.lookPitch = 4;
    f.aimYaw = 5;
    f.aimPitch = 6;
    f.hasAim = 1;
    f.buttons = BTN_RESTART;
    f.pressed = BTN_DROP;
    clearInputFrame(f);
    expect(f.moveX).toBe(0);
    expect(f.moveY).toBe(0);
    expect(f.lookYaw).toBe(0);
    expect(f.lookPitch).toBe(0);
    expect(f.aimYaw).toBe(0);
    expect(f.aimPitch).toBe(0);
    expect(f.hasAim).toBe(0);
    expect(f.buttons).toBe(0);
    expect(f.pressed).toBe(0);
  });
});
