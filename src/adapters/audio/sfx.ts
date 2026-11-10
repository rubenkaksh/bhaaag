// Procedural SFX via the plain browser Web Audio API. No dependencies, no
// audio files: every sound is an oscillator (plus an optional white-noise
// burst) shaped by its own gain envelope, summed into one shared master gain.
//
// Per-sound nodes are created, started and stopped inside the play methods
// and are never stored on the instance. Only the context, the master gain and
// the shared noise buffer survive across calls.

const MASTER_GAIN = 0.8;
const NOISE_SECONDS = 0.25;
const TAIL = 0.02;
const FLOOR = 0.0001;

const FIRE_DURATION = 0.09;
const FIRE_START_HZ = 900;
const FIRE_END_HZ = 300;
const FIRE_GAIN = 0.25;
const FIRE_TICK_DURATION = 0.02;
const FIRE_TICK_GAIN = 0.12;

const ATTACH_DURATION = 0.12;
const ATTACH_START_HZ = 180;
const ATTACH_END_HZ = 90;
const ATTACH_LOWPASS_HZ = 1200;
const ATTACH_GAIN = 0.35;
const ATTACH_NOISE_DURATION = 0.03;
const ATTACH_NOISE_GAIN = 0.2;

const LAND_DURATION_BASE = 0.12;
const LAND_DURATION_PER_AMP = 0.14;
const LAND_GAIN_BASE = 0.2;
const LAND_GAIN_PER_AMP = 0.5;
const LAND_START_HZ = 110;
const LAND_END_HZ = 45;

const DIE_DURATION = 0.35;
const DIE_START_HZ = 220;
const DIE_END_HZ = 50;
const DIE_LOWPASS_HZ = 800;
const DIE_GAIN = 0.4;

type PlayFn = (ctx: AudioContext, master: GainNode, now: number) => void;

function createNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const frames = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function envelope(gain: GainNode, peak: number, now: number, duration: number): void {
  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(FLOOR, now + duration);
}

function tone(
  ctx: AudioContext,
  master: AudioNode,
  type: OscillatorType,
  startHz: number,
  endHz: number,
  now: number,
  duration: number,
  peak: number,
  filterHz: number | null,
): void {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(startHz, now);
  osc.frequency.exponentialRampToValueAtTime(endHz, now + duration);

  let head: AudioNode = osc;
  if (filterHz !== null) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterHz;
    osc.connect(filter);
    head = filter;
  }

  const gain = ctx.createGain();
  envelope(gain, peak, now, duration);
  head.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + duration + TAIL);
}

function noiseBurst(
  ctx: AudioContext,
  master: AudioNode,
  buffer: AudioBuffer,
  now: number,
  duration: number,
  peak: number,
): void {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  envelope(gain, peak, now, duration);
  src.connect(gain);
  gain.connect(master);
  src.start(now);
  src.stop(now + duration + TAIL);
}

export class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;

  unlock(): void {
    if (this.ctx !== null) {
      void this.ctx.resume().catch(() => undefined);
      return;
    }
    try {
      const Ctx = window.AudioContext;
      if (typeof Ctx !== 'function') return;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = MASTER_GAIN;
      master.connect(ctx.destination);
      const noise = createNoise(ctx, NOISE_SECONDS);
      this.ctx = ctx;
      this.master = master;
      this.noise = noise;
      void ctx.resume().catch(() => undefined);
    } catch {
      // No usable Web Audio here; every play method stays a no-op.
      this.ctx = null;
      this.master = null;
      this.noise = null;
    }
  }

  fire(): void {
    const noise = this.noise;
    this.run((ctx, master, now) => {
      tone(ctx, master, 'sine', FIRE_START_HZ, FIRE_END_HZ, now, FIRE_DURATION, FIRE_GAIN, null);
      if (noise !== null) {
        noiseBurst(ctx, master, noise, now, FIRE_TICK_DURATION, FIRE_TICK_GAIN);
      }
    });
  }

  attach(): void {
    const noise = this.noise;
    this.run((ctx, master, now) => {
      tone(
        ctx,
        master,
        'square',
        ATTACH_START_HZ,
        ATTACH_END_HZ,
        now,
        ATTACH_DURATION,
        ATTACH_GAIN,
        ATTACH_LOWPASS_HZ,
      );
      if (noise !== null) {
        noiseBurst(ctx, master, noise, now, ATTACH_NOISE_DURATION, ATTACH_NOISE_GAIN);
      }
    });
  }

  land(amp: number): void {
    const a = Math.min(1, Math.max(0, Number.isFinite(amp) ? amp : 0));
    const duration = LAND_DURATION_BASE + LAND_DURATION_PER_AMP * a;
    const peak = LAND_GAIN_BASE + LAND_GAIN_PER_AMP * a;
    this.run((ctx, master, now) => {
      tone(ctx, master, 'sine', LAND_START_HZ, LAND_END_HZ, now, duration, peak, null);
    });
  }

  die(): void {
    this.run((ctx, master, now) => {
      tone(
        ctx,
        master,
        'sawtooth',
        DIE_START_HZ,
        DIE_END_HZ,
        now,
        DIE_DURATION,
        DIE_GAIN,
        DIE_LOWPASS_HZ,
      );
    });
  }

  /** Chase: low rushing wind whose loudness follows how close the dragon is (k 0..1). */
  wind(k: number): void {
    const noise = this.noise;
    const a = Math.min(1, Math.max(0, Number.isFinite(k) ? k : 0));
    if (noise === null || a <= 0.02) return;
    this.run((ctx, master, now) => {
      noiseBurst(ctx, master, noise, now, 0.2, 0.05 + 0.25 * a);
    });
  }

  /** Chase: the dragon's roar when the gap is about to close. */
  roar(): void {
    this.run((ctx, master, now) => {
      tone(ctx, master, 'sawtooth', 120, 38, now, 0.9, 0.45, 500);
      tone(ctx, master, 'square', 70, 30, now, 1.1, 0.25, 300);
    });
  }

  dispose(): void {
    const ctx = this.ctx;
    this.ctx = null;
    this.master = null;
    this.noise = null;
    if (ctx === null) return;
    try {
      void ctx.close().catch(() => undefined);
    } catch {
      // Already closed or closing; nothing left to release.
    }
  }

  private run(play: PlayFn): void {
    const ctx = this.ctx;
    const master = this.master;
    if (ctx === null || master === null) return;
    if (ctx.state === 'closed') return;
    try {
      play(ctx, master, ctx.currentTime);
    } catch {
      // A context that died mid-flight must never break gameplay.
    }
  }
}
