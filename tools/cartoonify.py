"""Deterministic local photo -> game texture pipeline (no AI, no network). Same input, same bytes.

Run from the repo root (Pillow and numpy only; venv outside the repo):
  ~/.cache/bhaaag-venv/bin/python -I tools/cartoonify.py --mode tile --in IMG.jpg \
      --box x0,y0,x1,y1 [--rotate DEG] --size 128 --out public/assets/textures/tin.jpg

Modes
  tile   one seamless square tile: crop (--box, optional --rotate about the box centre) -> centre
         square (or --stretch to squash the whole box) -> resize -> seamless (half-shift cosine cross-fade, or --mirror 2x2; both wrap with no seam)
  atlas  several crops (repeat --in and --box in pairs) -> each resized to (size/N) x (size/2) and
         placed side by side (facade bays, 1:2); not seamless
  card   one wide backdrop card: crop -> resize to --size x --height -> alpha mask from the sky
         (dark ridge below a bright sky) -> haze blend; written with alpha (use a .webp --out)

Common steps after the geometry: autolevel (percentile stretch) -> pull saturation by --sat ->
light median smoothing -> map every pixel to the nearest colour of tools/palette.json (fixed ~16
colours, desaturated warm) -> light edge ink (--ink, multiplies pixels on strong luminance edges)
-> optional --grey MEAN,SPREAD (luminance only, rescaled so instance tints stay readable) ->
optional --haze F (blend towards the palette hazeColor) -> save (JPEG q --quality, or WebP).
The palette keeps clear of the gold affordance, cream safe and terracotta danger colours
(tests/adapters/textureBudget.test.ts), so no tile can read as a gameplay colour.
"""

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent


def load_palette(path: Path) -> tuple[np.ndarray, np.ndarray]:
    data = json.loads(path.read_text())
    cols = np.array([[int(h[i : i + 2], 16) for i in (1, 3, 5)] for h in data["colors"]], dtype=np.float64)
    haze = np.array([int(data["hazeColor"][i : i + 2], 16) for i in (1, 3, 5)], dtype=np.float64)
    return cols, haze


def open_crop(src: str, box: str, rotate: float) -> Image.Image:
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    x0, y0, x1, y1 = (int(v) for v in box.split(","))
    if rotate:
        img = img.rotate(rotate, resample=Image.BICUBIC, center=((x0 + x1) / 2, (y0 + y1) / 2))
    return img.crop((x0, y0, x1, y1))


def square(img: Image.Image) -> Image.Image:
    w, h = img.size
    s = min(w, h)
    left, top = (w - s) // 2, (h - s) // 2
    return img.crop((left, top, left + s, top + s))


def seamless(a: np.ndarray) -> np.ndarray:
    """Cross-fade with the half-shifted copy; weight 0 at the borders so the wrap is continuous."""
    h, w = a.shape[:2]
    wy = np.sin(np.pi * (np.arange(h) + 0.5) / h) ** 2
    wx = np.sin(np.pi * (np.arange(w) + 0.5) / w) ** 2
    wgt = (wy[:, None] * wx[None, :])[..., None]
    shifted = np.roll(a, (h // 2, w // 2), axis=(0, 1))
    return a * wgt + shifted * (1 - wgt)


def flatten(a: np.ndarray, sigma: float) -> np.ndarray:
    """Divide out the slow lighting gradient (wrap-aware blur) so the seamless blend shows no cross."""
    h, w = a.shape[:2]
    big = np.tile(a, (3, 3, 1)).astype(np.uint8)
    blur = np.asarray(Image.fromarray(big).filter(ImageFilter.GaussianBlur(sigma)), dtype=np.float64)[h : 2 * h, w : 2 * w]
    return np.clip(a / np.maximum(blur, 8.0) * a.mean(axis=(0, 1)), 0, 255)


def autolevel(a: np.ndarray) -> np.ndarray:
    lo, hi = np.percentile(a, 2), np.percentile(a, 98)
    return np.clip((a - lo) / max(hi - lo, 1.0), 0, 1) * 255.0


def desaturate(a: np.ndarray, sat: float) -> np.ndarray:
    lum = (a * np.array([0.299, 0.587, 0.114])).sum(axis=2, keepdims=True)
    return lum + (a - lum) * sat


def to_palette(a: np.ndarray, pal: np.ndarray) -> np.ndarray:
    weights = np.array([2.0, 4.0, 3.0])  # lightness-weighted RGB, as tests/adapters/palette.test.ts
    d = (((a[:, :, None, :] - pal[None, None, :, :]) * weights) ** 2).sum(axis=3)
    return pal[np.argmin(d, axis=2)]


def ink(rgb: np.ndarray, strength: float) -> np.ndarray:
    lum = (rgb * np.array([0.299, 0.587, 0.114])).sum(axis=2)
    gx = np.roll(lum, -1, 1) - np.roll(lum, 1, 1)
    gy = np.roll(lum, -1, 0) - np.roll(lum, 1, 0)
    edge = np.clip(np.hypot(gx, gy) / 60.0, 0, 1)
    return rgb * (1 - strength * edge[..., None])


def grey_norm(rgb: np.ndarray, mean: float, spread: float) -> np.ndarray:
    g = (rgb * np.array([0.299, 0.587, 0.114])).sum(axis=2) / 255.0
    g = (g - g.mean()) / (g.std() + 1e-6)
    g = np.clip(mean + spread * g, 0, 1) * 255.0
    return np.repeat(g[..., None], 3, axis=2)


def style(img: Image.Image, pal: np.ndarray, args: argparse.Namespace, wrap: bool) -> np.ndarray:
    a = np.asarray(img, dtype=np.float64)
    a = desaturate(autolevel(a), args.sat)
    sm = Image.fromarray(np.clip(a + 0.5, 0, 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))
    out = to_palette(np.asarray(sm, dtype=np.float64), pal)
    out = ink(out, args.ink)
    if args.grey:
        mean, spread = (float(v) for v in args.grey.split(","))
        out = grey_norm(out, mean, spread)
    return out


def sky_alpha(img: Image.Image) -> np.ndarray:
    """Per-column ridge: the first row (from the top) that is clearly darker than the sky above."""
    lum = np.asarray(ImageOps.grayscale(img).filter(ImageFilter.GaussianBlur(3)), dtype=np.float64)
    h, w = lum.shape
    sky = np.median(lum[: max(4, h // 12)])
    hill = np.percentile(lum, 20)
    thr = sky * 0.5 + hill * 0.5
    ridge = np.zeros(w)
    for x in range(w):
        below = np.nonzero(lum[:, x] < thr)[0]
        ridge[x] = below[0] if below.size else h
    k = 9  # median-smooth the ridge so cloud shadows do not notch the silhouette
    pad = np.pad(ridge, k, mode="edge")
    ridge = np.array([np.median(pad[i : i + 2 * k + 1]) for i in range(w)])
    ys = np.arange(h)[:, None]
    return np.clip((ys - ridge[None, :] + 3) / 6.0, 0, 1)


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--mode", choices=["tile", "atlas", "card"], required=True)
    p.add_argument("--in", dest="inputs", action="append", required=True)
    p.add_argument("--box", action="append", required=True, help="x0,y0,x1,y1 in the upright photo")
    p.add_argument("--rotate", type=float, default=0.0)
    p.add_argument("--size", type=int, default=128)
    p.add_argument("--height", type=int, default=0, help="card height (px); atlas/tile use --size")
    p.add_argument("--stretch", action="store_true", help="tile: squash a non-square box to the square tile")
    p.add_argument("--mirror", action="store_true", help="tile: mirror 2x2 instead of the cross-fade (stripe tiles)")
    p.add_argument("--stripes", action="store_true", help="tile: average the rows, keep vertical ribs only")
    p.add_argument("--sat", type=float, default=0.55)
    p.add_argument("--ink", type=float, default=0.3)
    p.add_argument("--grey", default="")
    p.add_argument("--haze", type=float, default=0.0)
    p.add_argument("--quality", type=int, default=70)
    p.add_argument("--palette", default=str(ROOT / "tools/palette.json"))
    p.add_argument("--out", required=True)
    args = p.parse_args()
    pal, haze = load_palette(Path(args.palette))

    alpha = None
    if args.mode == "tile":
        img = open_crop(args.inputs[0], args.box[0], args.rotate)
        if not args.stretch:
            img = square(img)
        img = img.resize((args.size, args.size), Image.LANCZOS)
        if args.stripes:  # ribbed sheet: keep only the column profile (vertical ribs, no blotches)
            col = np.asarray(img.resize((args.size, 1), Image.BOX), dtype=np.float64)
            img = Image.fromarray(np.repeat(col, args.size, axis=0).astype(np.uint8))
        if args.mirror:
            half = img.resize((args.size // 2, args.size // 2), Image.LANCZOS)
            q = np.asarray(half, dtype=np.float64)
            top = np.concatenate([q, q[:, ::-1]], axis=1)
            img = Image.fromarray(np.concatenate([top, top[::-1]], axis=0).astype(np.uint8))
        flat = flatten(np.asarray(img, dtype=np.float64), args.size / 4)
        rgb = style(Image.fromarray(np.clip(seamless(flat) + 0.5, 0, 255).astype(np.uint8)), pal, args, True)
    elif args.mode == "atlas":
        n = len(args.box)
        if len(args.inputs) != n:
            raise SystemExit("atlas needs one --in per --box")
        bay = args.size // n
        strips = [
            open_crop(args.inputs[i], args.box[i], 0).resize((bay, args.size // 2), Image.LANCZOS)
            for i in range(n)
        ]
        row = Image.new("RGB", (bay * n, args.size // 2))
        for i, s in enumerate(strips):
            row.paste(s, (i * bay, 0))
        rgb = style(row, pal, args, False)
    else:
        img = open_crop(args.inputs[0], args.box[0], args.rotate)
        img = img.resize((args.size, args.height or args.size // 4), Image.LANCZOS)
        rgb = style(img, pal, args, False)
        alpha = sky_alpha(img)
    if args.haze > 0:
        rgb = rgb * (1 - args.haze) + haze * args.haze

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    px = np.clip(rgb + 0.5, 0, 255).astype(np.uint8)
    if out.suffix.lower() == ".webp":
        if alpha is not None:
            px = np.dstack([px, np.clip(alpha * 255 + 0.5, 0, 255).astype(np.uint8)])
        Image.fromarray(px).save(out, quality=args.quality, method=6)
    else:
        Image.fromarray(px).save(out, quality=args.quality, optimize=True, subsampling=2)
    print(f"wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
