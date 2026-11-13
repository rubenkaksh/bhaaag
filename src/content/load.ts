import { z } from 'zod';
import { Vec3 } from '../core/math/vec3';
import { AABB } from '../core/math/aabb';
import { World, addSolid, addRamp, addAnchor, addRoof, addLine } from '../core/world';

// Minimal test-world JSON schema (M1). Kit/layout/level schemas (M4) build
// on this shape; for now the fixture is a flat list of boxes, ramps, anchors.

const vec3Tuple = z.tuple([z.number(), z.number(), z.number()]);

function boxMinLeMax(box: {
  min: [number, number, number];
  max: [number, number, number];
}): boolean {
  return box.min[0] <= box.max[0] && box.min[1] <= box.max[1] && box.min[2] <= box.max[2];
}

const boxSchema = z
  .object({
    min: vec3Tuple,
    max: vec3Tuple,
  })
  .refine(boxMinLeMax, { message: 'min must be <= max on every axis' });

const flag = z.number().int().min(0).max(1);

const rampSchema = z
  .object({
    min: vec3Tuple,
    max: vec3Tuple,
    slopeAxis: z.number().int().min(0).max(3),
    rise: z.number(),
    slip: flag.optional(),
  })
  .refine(boxMinLeMax, { message: 'min must be <= max on every axis' })
  .refine((ramp) => ramp.rise > 0, { message: 'rise must be > 0' });

// Pitched gable roof (ADR 0002): min.y is the eave, max.y the ridge; ridge 0 runs along x,
// 1 along z (a gable's yaw 0/180 and 90/270 are the same roof).
const roofSchema = z
  .object({
    min: vec3Tuple,
    max: vec3Tuple,
    ridge: z.number().int().min(0).max(1),
  })
  .refine(boxMinLeMax, { message: 'min must be <= max on every axis' })
  .refine((roof) => roof.max[1] > roof.min[1], { message: 'ridge must be above the eave' })
  .refine((roof) => roof.max[0] > roof.min[0] && roof.max[2] > roof.min[2], {
    message: 'footprint must have area',
  });

const anchorSchema = z.object({
  pos: vec3Tuple,
});

// Fixed zipline (ADR 0011): zone slab on the launch roof, anchor id of the far end.
const lineSchema = z.object({
  zone: boxSchema,
  anchor: z.number().int().min(0),
});

// Level extras (M4): all optional so the M1 testworld.json fixture keeps loading.
// Strategy maze fields (ADR 0011) are optional too; absent = classic rules.
const worldSchema = z
  .object({
    version: z.literal(1),
    spawn: vec3Tuple,
    spawnYaw: z.number(),
    killPlaneY: z.number(),
    solids: z.array(boxSchema),
    ramps: z.array(rampSchema),
    roofs: z.array(roofSchema).optional(),
    anchors: z.array(anchorSchema),
    goal: boxSchema.optional(),
    pads: z.array(boxSchema).optional(),
    route: z.array(z.number().int()).optional(),
    style: z.array(z.number().int()).optional(),
    lineOnly: flag.optional(),
    climb: flag.optional(),
    parkour: flag.optional(),
    lines: z.array(lineSchema).optional(),
    tramps: z.array(boxSchema).optional(),
    cushions: z.array(boxSchema).optional(),
    hazards: z.array(boxSchema).optional(),
  })
  .refine((w) => w.lines === undefined || w.lines.every((l) => l.anchor < w.anchors.length), {
    message: 'lines: anchor id out of range',
  });

export type LevelJson = z.input<typeof worldSchema>;

function describeZodError(err: z.ZodError): string {
  const parts: string[] = [];
  for (const issue of err.issues) {
    let pathStr = '(root)';
    if (issue.path.length > 0) {
      pathStr = issue.path.join('.');
    }
    parts.push(pathStr + ': ' + issue.message);
  }
  return 'invalid test world: ' + parts.join('; ');
}

function toVec3(tuple: [number, number, number]): Vec3 {
  return new Vec3(tuple[0], tuple[1], tuple[2]);
}

export function loadWorldFromJson(text: string): World {
  let obj: unknown;
  try {
    obj = JSON.parse(text);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error('invalid JSON: ' + detail, { cause: err });
  }
  return loadWorldFromObject(obj);
}

export function loadWorldFromObject(obj: unknown): World {
  const parsed = worldSchema.safeParse(obj);
  if (!parsed.success) {
    throw new Error(describeZodError(parsed.error));
  }
  const data = parsed.data;
  const w = new World();
  w.spawn = toVec3(data.spawn);
  w.spawnYaw = data.spawnYaw;
  w.killPlaneY = data.killPlaneY;
  for (let i = 0; i < data.solids.length; i++) {
    const solid = data.solids[i];
    const box = new AABB(toVec3(solid.min), toVec3(solid.max));
    addSolid(w, box);
  }
  for (let i = 0; i < data.ramps.length; i++) {
    const ramp = data.ramps[i];
    const box = new AABB(toVec3(ramp.min), toVec3(ramp.max));
    const rampId = addRamp(w, box, ramp.slopeAxis, ramp.rise);
    if (ramp.slip !== undefined) w.ramps[rampId].slip = ramp.slip;
  }
  if (data.roofs !== undefined) {
    for (let i = 0; i < data.roofs.length; i++) {
      const roof = data.roofs[i];
      addRoof(w, new AABB(toVec3(roof.min), toVec3(roof.max)), roof.ridge);
    }
  }
  for (let i = 0; i < data.anchors.length; i++) {
    const anchor = data.anchors[i];
    addAnchor(w, anchor.pos[0], anchor.pos[1], anchor.pos[2]);
  }
  if (data.goal !== undefined) {
    w.goal = new AABB(toVec3(data.goal.min), toVec3(data.goal.max));
  }
  if (data.pads !== undefined) {
    for (let i = 0; i < data.pads.length; i++) {
      const pad = data.pads[i];
      w.pads.push(new AABB(toVec3(pad.min), toVec3(pad.max)));
    }
  }
  if (data.route !== undefined) {
    for (let i = 0; i < data.route.length; i++) {
      w.route.push(data.route[i]);
    }
  }
  if (data.style !== undefined) {
    for (let i = 0; i < data.style.length; i++) {
      w.style.push(data.style[i]);
    }
  }
  if (data.lineOnly !== undefined) w.lineOnly = data.lineOnly;
  if (data.climb !== undefined) w.climb = data.climb;
  if (data.parkour !== undefined) w.parkour = data.parkour;
  if (data.lines !== undefined) {
    for (let i = 0; i < data.lines.length; i++) {
      const l = data.lines[i];
      addLine(w, new AABB(toVec3(l.zone.min), toVec3(l.zone.max)), l.anchor);
    }
  }
  pushBoxes(w.tramps, data.tramps);
  pushBoxes(w.cushions, data.cushions);
  pushBoxes(w.hazards, data.hazards);
  return w;
}

function pushBoxes(
  dst: AABB[],
  src: { min: [number, number, number]; max: [number, number, number] }[] | undefined,
): void {
  if (src === undefined) return;
  for (let i = 0; i < src.length; i++) {
    dst.push(new AABB(toVec3(src[i].min), toVec3(src[i].max)));
  }
}
