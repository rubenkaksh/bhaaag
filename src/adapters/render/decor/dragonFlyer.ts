import { BufferAttribute, BufferGeometry, Mesh, MeshLambertMaterial, Vector3 } from 'three';
import type { Camera } from 'three';
import { DRAGON_B64, DRAGON_MAX, DRAGON_MIN, DRAGON_TRIS, DRAGON_VERTS } from './dragonData';

// Ambient flyer (owner decision 2026-11-15): one decimated TripoSR draft dragon, baked to a
// typed-array module (no GLB, no loader). Pure scenery: no collision, no sim, one draw call.
// Loaded lazily from scene.ts and shown only when `atmosphere` is on (Medium/High, not phones).
const TAU = Math.PI * 2;
const FWD = new Vector3();
const AHEAD = 130;
const RADIUS = 75;
const HEIGHT = -45;
const ANGULAR_SPEED = 0.12; // rad/s, one lap in ~52 s

function decode(): BufferGeometry {
  const bin = atob(DRAGON_B64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  const dv = new DataView(buf.buffer);
  const n = DRAGON_VERTS;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) {
    const a = i % 3;
    pos[i] = DRAGON_MIN[a] + (dv.getUint16(i * 2, true) / 65535) * (DRAGON_MAX[a] - DRAGON_MIN[a]);
  }
  const col = new Float32Array(n * 3);
  const co = n * 6;
  for (let i = 0; i < n * 3; i++) col[i] = buf[co + i] / 255;
  const idx = new Uint16Array(DRAGON_TRIS * 3);
  const io = n * 9;
  for (let i = 0; i < idx.length; i++) idx[i] = dv.getUint16(io + i * 2, true);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setAttribute('color', new BufferAttribute(col, 3));
  geo.setIndex(new BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  return geo;
}

/** The dragon circles the camera far off the lane, banking into the turn. Head points to -Z. */
export function buildDragonFlyer(): Mesh {
  const mesh = new Mesh(
    decode(),
    new MeshLambertMaterial({ vertexColors: true, flatShading: false }),
  );
  mesh.name = 'decor_dragon';
  mesh.frustumCulled = false;
  mesh.rotation.order = 'YXZ';
  mesh.onBeforeRender = (_r, _s, camera: Camera): void => {
    const t = performance.now() / 1000;
    const a = ANGULAR_SPEED * t;
    camera.getWorldDirection(FWD);
    FWD.y = 0;
    if (FWD.lengthSq() < 1e-6) FWD.set(0, 0, -1);
    FWD.normalize();
    mesh.position.set(
      camera.position.x + FWD.x * AHEAD + Math.cos(a) * RADIUS,
      camera.position.y + HEIGHT + 4 * Math.sin(0.5 * t),
      camera.position.z + FWD.z * AHEAD + Math.sin(a) * RADIUS,
    );
    mesh.rotation.y = Math.PI - a;
    mesh.rotation.z = 0.3 + 0.08 * Math.sin(TAU * 0.2 * t);
    mesh.rotation.x = 0.06 * Math.sin(TAU * 0.2 * t + 1);
    if (Math.floor(t) % 3 === 0 && Math.random() < 0.05) {
      const v = mesh.position.clone().project(camera as never);
      console.log(
        'DRG',
        mesh.position.toArray().map(Math.round),
        (camera as never as { position: Vector3 }).position.toArray().map(Math.round),
        v.toArray().map((x: number) => x.toFixed(2)),
      );
    }
    mesh.updateMatrixWorld();
  };
  return mesh;
}
