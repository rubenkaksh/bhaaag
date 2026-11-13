#!/usr/bin/env python3
"""
Small, deterministic 2D game-asset pipeline.
Requires: Pillow (pip install Pillow)

Commands:
  inspect INPUT
  key INPUT OUTPUT --color "#RRGGBB" [--tolerance 35] [--softness 12] [--force]
  slice INPUT OUTPUT_DIR --columns N --rows N [--frames N] [--prefix sprite] [--force]
  pack INPUT_DIR OUTPUT_PNG OUTPUT_JSON [--max-size 2048] [--padding 2] [--extrude 1]
       [--trim] [--pivot X,Y] [--force]
  validate ATLAS_PNG ATLAS_JSON

Safety rules enforced by the tool:
  * Sources are immutable: no command writes to a path that resolves to one of its inputs.
  * No command overwrites an existing output unless --force is given.
  * `pack` keeps each sprite's full canvas by default. Pass --trim to crop transparent
    margins; trimmed sprites record spriteSourceSize and a pivot recomputed against the
    untrimmed canvas, so animation frames keep a common anchor.

This is a starter utility, not a replacement for visual review or engine testing.
"""

from __future__ import annotations
import argparse
import json
import math
import re
import sys
from pathlib import Path
from PIL import Image, ImageChops

SUPPORTED = {".png", ".webp", ".tif", ".tiff"}


def parse_color(value: str):
    value = value.lstrip("#")
    if not re.fullmatch(r"[0-9a-fA-F]{6}", value):
        raise argparse.ArgumentTypeError("Color must be #RRGGBB")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def parse_pivot(value: str):
    try:
        x, y = (float(v) for v in value.split(","))
    except ValueError:
        raise argparse.ArgumentTypeError("Pivot must be X,Y (fractions of the source canvas)")
    return x, y


def guard_output(out: Path, inputs, force: bool):
    """Refuse to clobber a source or (without --force) any existing file."""
    resolved = out.resolve()
    for src in inputs:
        if resolved == Path(src).resolve():
            raise SystemExit(f"Refusing to write {out}: it is an input (sources are immutable).")
    if out.exists() and not force:
        raise SystemExit(f"Refusing to overwrite existing {out}; pass --force to replace it.")


def inspect_image(path: Path):
    with Image.open(path) as im:
        has_alpha = "A" in im.getbands()
        # Without an alpha channel there is no "visible" region; getbbox() would
        # report non-black pixels, which is misleading. Report null instead.
        bbox = im.getchannel("A").getbbox() if has_alpha else None
        return {
            "file": str(path),
            "format": im.format,
            "mode": im.mode,
            "size": list(im.size),
            "has_alpha_channel": has_alpha,
            "visible_bbox": list(bbox) if bbox else None,
        }


def cmd_inspect(args):
    paths = [args.input] if args.input.is_file() else sorted(
        p for p in args.input.rglob("*") if p.suffix.lower() in SUPPORTED)
    print(json.dumps([inspect_image(p) for p in paths], indent=2))


def cmd_key(args):
    guard_output(args.output, [args.input], args.force)
    with Image.open(args.input) as src:
        im = src.convert("RGBA")
    r, g, b, a = im.split()
    kr, kg, kb = args.color
    # Flat-colour key using the largest per-channel difference (Chebyshev distance).
    d = ImageChops.lighter(
        ImageChops.lighter(
            ImageChops.difference(r, Image.new("L", im.size, kr)),
            ImageChops.difference(g, Image.new("L", im.size, kg))),
        ImageChops.difference(b, Image.new("L", im.size, kb)))
    tol, soft = args.tolerance, max(1, args.softness)
    lut = [0 if v <= tol else 255 if v >= tol + soft else round(255 * (v - tol) / soft)
           for v in range(256)]
    mask = d.point(lut)
    im.putalpha(ImageChops.multiply(a, mask))
    im.save(args.output)
    print(json.dumps(inspect_image(args.output), indent=2))


def cmd_slice(args):
    with Image.open(args.input) as src:
        im = src.convert("RGBA")
    cols, rows = args.columns, args.rows
    if im.width % cols or im.height % rows:
        raise SystemExit(f"Image {im.size} is not evenly divisible by {cols}x{rows}; supply manual crops instead.")
    cw, ch = im.width // cols, im.height // rows
    count = args.frames if args.frames is not None else cols * rows
    if count > cols * rows:
        raise SystemExit("--frames cannot exceed rows * columns")
    names = [f"{args.prefix}_{i:03d}.png" for i in range(count)]
    for n in names:
        guard_output(args.output_dir / n, [args.input], args.force)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    outputs = []
    for i, name in enumerate(names):
        row, col = divmod(i, cols)
        im.crop((col * cw, row * ch, (col + 1) * cw, (row + 1) * ch)).save(args.output_dir / name)
        outputs.append({"name": name, "frame": [0, 0, cw, ch]})
    print(json.dumps({"frame_size": [cw, ch], "frames": outputs}, indent=2))


def load_sprite(path: Path, trim: bool):
    with Image.open(path) as src:
        im = src.convert("RGBA")
    sw, sh = im.size
    box = (0, 0, sw, sh)
    if trim:
        bbox = im.getchannel("A").getbbox()
        if not bbox:
            raise ValueError(f"{path.name} is fully transparent")
        box = bbox
        im = im.crop(bbox)
    return im, (sw, sh), box


def extruded(im: Image.Image, n: int) -> Image.Image:
    """Return im with its edge pixels (including corners) repeated n px outward."""
    w, h = im.size
    out = Image.new("RGBA", (w + 2 * n, h + 2 * n), (0, 0, 0, 0))
    out.paste(im, (n, n))
    out.paste(im.crop((0, 0, w, 1)).resize((w, n)), (n, 0))
    out.paste(im.crop((0, h - 1, w, h)).resize((w, n)), (n, n + h))
    out.paste(im.crop((0, 0, 1, h)).resize((n, h)), (0, n))
    out.paste(im.crop((w - 1, 0, w, h)).resize((n, h)), (n + w, n))
    for cx, cy, px in ((0, 0, (0, 0)), (n + w, 0, (w - 1, 0)),
                       (0, n + h, (0, h - 1)), (n + w, n + h, (w - 1, h - 1))):
        out.paste(Image.new("RGBA", (n, n), im.getpixel(px)), (cx, cy))
    return out


def cmd_pack(args):
    files = sorted(p for p in args.input_dir.iterdir() if p.suffix.lower() in SUPPORTED)
    if not files:
        raise SystemExit("No supported image files found.")
    guard_output(args.output_png, files, args.force)
    guard_output(args.output_json, files, args.force)
    items = []
    for p in files:
        im, src_size, box = load_sprite(p, args.trim)
        items.append({"path": p, "image": im, "source_size": src_size, "box": box})
    # Deterministic shelf packing, sorted by descending height then filename.
    items.sort(key=lambda x: (-x["image"].height, x["path"].name))
    max_size, pad = args.max_size, args.padding
    x = y = shelf_h = 0
    placements = []
    for item in items:
        im = item["image"]
        w, h = im.width + 2 * pad, im.height + 2 * pad
        if w > max_size or h > max_size:
            raise SystemExit(f"{item['path'].name} exceeds max atlas size.")
        if x + w > max_size:
            x, y, shelf_h = 0, y + shelf_h, 0
        if y + h > max_size:
            raise SystemExit("Sprites exceed one atlas page. Split the input into multiple atlas groups.")
        placements.append((item, x + pad, y + pad))
        x += w
        shelf_h = max(shelf_h, h)
    used_w = max(px + item["image"].width + pad for item, px, py in placements)
    used_h = max(py + item["image"].height + pad for item, px, py in placements)
    aw = min(max_size, 2 ** math.ceil(math.log2(max(1, used_w))))
    ah = min(max_size, 2 ** math.ceil(math.log2(max(1, used_h))))
    atlas = Image.new("RGBA", (aw, ah), (0, 0, 0, 0))
    n = min(args.extrude, pad)
    sprites = {}
    for item, px, py in placements:
        im = item["image"]
        if n > 0:
            atlas.alpha_composite(extruded(im, n), (px - n, py - n))
        else:
            atlas.alpha_composite(im, (px, py))
        name = item["path"].stem
        if name in sprites:
            raise SystemExit(f"Duplicate sprite ID: {name}")
        sw, sh = item["source_size"]
        bx0, by0, bx1, by1 = item["box"]
        # Pivot is defined on the untrimmed source canvas; convert it to the packed rect.
        pvx, pvy = args.pivot
        sprites[name] = {
            "frame": {"x": px, "y": py, "w": im.width, "h": im.height},
            "sourceSize": {"w": sw, "h": sh},
            "spriteSourceSize": {"x": bx0, "y": by0, "w": bx1 - bx0, "h": by1 - by0},
            "trimmed": args.trim,
            "pivot": {"x": (pvx * sw - bx0) / im.width, "y": (pvy * sh - by0) / im.height},
            "sourcePivot": {"x": pvx, "y": pvy},
        }
    atlas.save(args.output_png)
    metadata = {
        "atlas": args.output_png.stem,
        "image": args.output_png.name,
        "size": [aw, ah],
        "format": "RGBA8888",
        "padding": pad,
        "extrude": n,
        "sprites": sprites,
        "animations": {},
    }
    args.output_json.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    print(json.dumps({"atlas": str(args.output_png), "metadata": str(args.output_json),
                      "size": [aw, ah], "sprite_count": len(sprites), "trimmed": args.trim}, indent=2))


def cmd_validate(args):
    with Image.open(args.atlas_png) as src:
        atlas_size = src.size
        atlas_mode = src.mode
    data = json.loads(args.atlas_json.read_text(encoding="utf-8"))
    sprites = data.get("sprites", {})
    errors = []
    ran = ["decode", "size-matches-image", "bounds", "overlap", "padding",
           "animation-frames-exist", "animation-frame-size", "animation-pivot"]
    skipped = ["visual checks (halos, seams, readability)", "engine import / playback",
               "extrusion pixel content"]
    if "size" in data and list(data["size"]) != list(atlas_size):
        errors.append(f"metadata size {data['size']} != image size {list(atlas_size)}")
    if "A" not in atlas_mode and atlas_mode != "P":
        errors.append(f"atlas has no alpha channel (mode {atlas_mode})")
    rects = {}
    for name, s in sprites.items():
        f = s.get("frame", {})
        x, y, w, h = (f.get(k, -1) for k in ("x", "y", "w", "h"))
        if min(x, y) < 0 or min(w, h) <= 0 or x + w > atlas_size[0] or y + h > atlas_size[1]:
            errors.append(f"{name}: frame outside atlas bounds")
            continue
        rects[name] = (x, y, w, h)
    pad = int(data.get("padding", 0))
    names = sorted(rects)
    for i, a in enumerate(names):
        ax, ay, aw_, ah_ = rects[a]
        for b in names[i + 1:]:
            bx, by, bw, bh = rects[b]
            gap_x = max(bx - (ax + aw_), ax - (bx + bw))
            gap_y = max(by - (ay + ah_), ay - (by + bh))
            gap = max(gap_x, gap_y)  # separation along the axis that separates them
            if gap < 0:
                errors.append(f"{a} and {b}: frames overlap")
            elif gap < pad:
                errors.append(f"{a} and {b}: gap {gap}px is below declared padding {pad}px")
    for name, anim in data.get("animations", {}).items():
        frames = anim.get("frames", [])
        sizes, pivots = set(), set()
        for fr in frames:
            if fr not in sprites:
                errors.append(f"{name}: missing frame {fr}")
                continue
            ss = sprites[fr].get("sourceSize", {})
            sizes.add((ss.get("w"), ss.get("h")))
            pv = sprites[fr].get("sourcePivot", sprites[fr].get("pivot", {}))
            pivots.add((pv.get("x"), pv.get("y")))
        if len(sizes) > 1:
            errors.append(f"{name}: frames have different source canvas sizes {sorted(map(str, sizes))}")
        if len(pivots) > 1:
            errors.append(f"{name}: frames have different pivots {sorted(map(str, pivots))}")
    report = {
        "atlas_size": list(atlas_size),
        "sprite_count": len(sprites),
        "animation_count": len(data.get("animations", {})),
        "checks_run": ran,
        "checks_not_run": skipped,
        "errors": errors,
        "status": "PASS (automated checks only; not engine-verified)" if not errors else "FAIL",
    }
    print(json.dumps(report, indent=2))
    if errors:
        sys.exit(1)


def build_parser():
    p = argparse.ArgumentParser(description="Game asset processing starter pipeline")
    sub = p.add_subparsers(required=True)
    q = sub.add_parser("inspect")
    q.add_argument("input", type=Path)
    q.set_defaults(func=cmd_inspect)
    q = sub.add_parser("key")
    q.add_argument("input", type=Path)
    q.add_argument("output", type=Path)
    q.add_argument("--color", type=parse_color, required=True)
    q.add_argument("--tolerance", type=int, default=35)
    q.add_argument("--softness", type=int, default=12)
    q.add_argument("--force", action="store_true", help="overwrite an existing output file")
    q.set_defaults(func=cmd_key)
    q = sub.add_parser("slice")
    q.add_argument("input", type=Path)
    q.add_argument("output_dir", type=Path)
    q.add_argument("--columns", type=int, required=True)
    q.add_argument("--rows", type=int, required=True)
    q.add_argument("--frames", type=int)
    q.add_argument("--prefix", default="sprite")
    q.add_argument("--force", action="store_true", help="overwrite existing output files")
    q.set_defaults(func=cmd_slice)
    q = sub.add_parser("pack")
    q.add_argument("input_dir", type=Path)
    q.add_argument("output_png", type=Path)
    q.add_argument("output_json", type=Path)
    q.add_argument("--max-size", type=int, default=2048)
    q.add_argument("--padding", type=int, default=2)
    q.add_argument("--extrude", type=int, default=1)
    q.add_argument("--trim", action="store_true",
                   help="crop transparent margins (default keeps full canvas so frames share an anchor)")
    q.add_argument("--pivot", type=parse_pivot, default=(0.5, 0.5),
                   help="pivot as X,Y fractions of the untrimmed source canvas (default 0.5,0.5)")
    q.add_argument("--force", action="store_true", help="overwrite existing outputs")
    q.set_defaults(func=cmd_pack)
    q = sub.add_parser("validate")
    q.add_argument("atlas_png", type=Path)
    q.add_argument("atlas_json", type=Path)
    q.set_defaults(func=cmd_validate)
    return p


if __name__ == "__main__":
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)
