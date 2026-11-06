export class Vec3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}

export function scale(a: Vec3, s: number): Vec3 {
  return new Vec3(a.x * s, a.y * s, a.z * s);
}

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

// Sets out to (x, y, z).
export function set(out: Vec3, x: number, y: number, z: number): void {
  out.x = x;
  out.y = y;
  out.z = z;
}

// Copies a into out.
export function copy(out: Vec3, a: Vec3): void {
  out.x = a.x;
  out.y = a.y;
  out.z = a.z;
}

// out = a + b (alias-safe).
export function addTo(out: Vec3, a: Vec3, b: Vec3): void {
  const x = a.x + b.x;
  const y = a.y + b.y;
  const z = a.z + b.z;
  out.x = x;
  out.y = y;
  out.z = z;
}

// out = a - b (alias-safe).
export function subTo(out: Vec3, a: Vec3, b: Vec3): void {
  const x = a.x - b.x;
  const y = a.y - b.y;
  const z = a.z - b.z;
  out.x = x;
  out.y = y;
  out.z = z;
}

// out = a * s (alias-safe).
export function scaleTo(out: Vec3, a: Vec3, s: number): void {
  const x = a.x * s;
  const y = a.y * s;
  const z = a.z * s;
  out.x = x;
  out.y = y;
  out.z = z;
}

// out = a + b * s (alias-safe).
export function addScaledTo(out: Vec3, a: Vec3, b: Vec3, s: number): void {
  const x = a.x + b.x * s;
  const y = a.y + b.y * s;
  const z = a.z + b.z * s;
  out.x = x;
  out.y = y;
  out.z = z;
}

// Squared length of a.
export function lengthSq(a: Vec3): number {
  return a.x * a.x + a.y * a.y + a.z * a.z;
}

// Length of a.
export function length(a: Vec3): number {
  return Math.sqrt(lengthSq(a));
}

// out = a normalized; zero-length input gives (0, 0, 0) (alias-safe).
export function normalizeTo(out: Vec3, a: Vec3): void {
  const len = length(a);
  if (len === 0) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    return;
  }
  const inv = 1 / len;
  const x = a.x * inv;
  const y = a.y * inv;
  const z = a.z * inv;
  out.x = x;
  out.y = y;
  out.z = z;
}

// out = a x b (alias-safe: all components computed before writing).
export function crossTo(out: Vec3, a: Vec3, b: Vec3): void {
  const x = a.y * b.z - a.z * b.y;
  const y = a.z * b.x - a.x * b.z;
  const z = a.x * b.y - a.y * b.x;
  out.x = x;
  out.y = y;
  out.z = z;
}
