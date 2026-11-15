# Processing: image post-processing and atlas packing

Keep the generated source immutable. Process a copy with deterministic scripts.

## Helper: tools/asset_pipeline.py

Pillow only. Commands: `inspect`, `key`, `slice`, `pack`, `validate`. Confirm options with `--help`.

- Sources are immutable: no command writes to a path that resolves to one of its inputs.
- No command overwrites an existing output unless `--force` is passed.
- `pack` keeps each sprite's full canvas by default. `--trim` crops transparent margins and records `spriteSourceSize` plus a pivot recomputed against the untrimmed canvas (`--pivot X,Y`, default 0.5,0.5). Use the default for animation frames.
- `inspect` returns `visible_bbox: null` for images without an alpha channel.
- `key` is a flat-color key (largest per-channel difference). It cannot cut gradient or glowing backgrounds; use a segmentation model or manual masking for those.
- It is a starter utility, not a replacement for visual review or engine testing. Adding Python/Pillow to a repo that does not already use it needs owner approval.

## 1. Inspect and classify

Record per source: exact path, width and height, format, color mode and alpha presence, likely background type, expected crop or grid, intended output family. Make a contact sheet for review; never use it as a runtime asset.

## 2. Background removal and alpha cleanup

1. If true alpha exists, inspect the alpha channel; do not assume it is valid.
2. For a flat key background, remove it with a color-distance mask.
3. For complex backgrounds, use a segmentation/background-removal model.
4. Refine edges with controlled feathering, decontamination and hole cleanup.
5. Preserve soft glows and semi-transparent particles; do not threshold alpha to binary.
6. Inspect on light and dark checkerboards for halos, fringes, missing detail, accidental transparency.
7. Never claim a background was removed until the alpha channel has been inspected.

For VFX keep subtle low-alpha pixels and glow falloff. For hard-edged sprites remove fringe without eroding the silhouette.

## 3. Crop, trim, normalize

- Detect visible alpha/content bounds.
- Crop transparent margins only when it will not change a required common frame canvas.
- Preserve a consistent canvas for animation frames; normalize frames to a common size and anchor.
- Add configurable padding around isolated sprites; keep original source dimensions in the manifest.
- Never stretch to fit; preserve aspect ratio and pad.

## 4. Sprite-sheet slicing

Never assume a generated grid is exact.

1. Determine grid geometry from the prompt spec and inspect the image.
2. Detect cell boundaries by explicit coordinates or image analysis.
3. Verify each cell holds one intended frame.
4. Export with stable zero-padded names, e.g. `projectile_blue_000.png`.
5. Reject or flag cells with clipped content, mixed subjects, labels or neighbor bleed.
6. Keep empty cells only if intentional and recorded in metadata.
7. Make a contact sheet of extracted frames for human review.

If the grid is irregular, use manual region definitions in a config file. Do not silently guess.

## 5. Frame alignment and animation QA

Per animation check: identical frame dimensions; consistent pivot; no position jitter; no clipping at canvas edges; intended motion progression; correct loop behavior; readable silhouette at gameplay scale; no palette or lighting drift. Produce a GIF or video preview but keep PNG frames as the lossless source. Verify frame duration and total loop length.

## 6. Atlas packing

Use a deterministic packer. Requirements:

- configurable max texture size, padding and extrusion
- no sprite overlap; stable sprite IDs and names
- rotation off by default for animation frames and UI
- alpha preserved; atlas bounds validated; page count reported
- texture-size and memory estimates included

Generate: atlas PNG(s), JSON metadata, engine-specific metadata when supported, a human-readable manifest.

Neutral metadata shape (illustrative; populate from actual processed files, never guesses):

```json
{
  "atlas": "combat_vfx",
  "image": "combat_vfx.png",
  "size": [1024, 1024],
  "format": "RGBA8888",
  "padding": 2,
  "extrude": 1,
  "sprites": {
    "projectile_blue_000": {
      "frame": {"x": 0, "y": 0, "w": 64, "h": 32},
      "sourceSize": {"w": 64, "h": 32},
      "spriteSourceSize": {"x": 0, "y": 0, "w": 64, "h": 32},
      "trimmed": false,
      "pivot": {"x": 0.5, "y": 0.5},
      "sourcePivot": {"x": 0.5, "y": 0.5}
    }
  },
  "animations": {
    "explosion_orange": {
      "frames": ["explosion_orange_000", "explosion_orange_001"],
      "frameDurationMs": 80,
      "loop": false
    }
  }
}
```
