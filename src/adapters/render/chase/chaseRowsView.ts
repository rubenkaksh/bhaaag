// Draws the live rows of the endless world. When a slot is rewritten (version/epoch change) the
// whole group is rebuilt from a small local-frame World (buildRowsWorld) with the unchanged
// buildLevelMeshes pipeline, then shifted into place by (0, GRADE*dz, dz).
import { Group, Mesh } from 'three';
import type { Material } from 'three';
import { World } from '../../../core/world';
import { GRADE } from '../../../core/chase/rows';
import { ChaseWorld, buildRowsWorld } from '../../../core/chase/chaseWorld';
import { buildLevelMeshes, updateLevelView } from '../levelView';

function disposeGroup(g: Group): void {
  g.traverse((o) => {
    const m = o as Mesh;
    if (m.isMesh !== true) return;
    m.geometry.dispose();
    const mat = m.material as Material | Material[];
    for (const mm of Array.isArray(mat) ? mat : [mat]) mm.dispose();
  });
}

export class ChaseRowsView {
  readonly root = new Group();
  private level: Group | null = null;
  private lastEpoch = -1;
  private readonly mini = new World();
  /** Milliseconds the last rebuild took (reported under ?debug). */
  lastRebuildMs = 0;
  rebuilds = 0;

  constructor(private readonly onRebuilt: () => void) {
    this.root.name = 'chase_rows';
  }

  /** Rebuilds when the world epoch changed. Returns true when it did. */
  sync(cw: ChaseWorld): boolean {
    if (cw.epoch === this.lastEpoch) return false;
    this.lastEpoch = cw.epoch;
    const t0 = performance.now();
    if (this.level !== null) {
      this.root.remove(this.level);
      disposeGroup(this.level);
    }
    const dz = buildRowsWorld(cw, this.mini);
    const lv = buildLevelMeshes(this.mini, { scenery: false });
    this.level = lv;
    this.root.add(lv);
    this.root.position.set(0, GRADE * dz, dz);
    this.root.updateMatrixWorld(true);
    this.onRebuilt();
    this.lastRebuildMs = performance.now() - t0;
    this.rebuilds++;
    return true;
  }

  /** Forces the next sync() to rebuild (a new world may reuse an old epoch number). */
  invalidate(): void {
    this.lastEpoch = -1;
  }

  update(nowSec: number, nextRouteIndex: number): void {
    if (this.level !== null) updateLevelView(this.level, nowSec, nextRouteIndex);
  }

  dispose(): void {
    if (this.level !== null) {
      this.root.remove(this.level);
      disposeGroup(this.level);
      this.level = null;
    }
  }
}
