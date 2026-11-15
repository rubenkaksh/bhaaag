import { BufferAttribute, BufferGeometry } from 'three';
import { DRAGON_B64, DRAGON_MAX, DRAGON_MIN, DRAGON_TRIS, DRAGON_VERTS } from './dragonData';

// TripoSR draft dragon baked to typed arrays (no GLB, no loader). Head toward -Z, up +Y, 9 m long,
// centred on its bounding box. Import it dynamically: the data is ~100 KB gzipped.
export function decodeDragonGeometry(): BufferGeometry {
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
