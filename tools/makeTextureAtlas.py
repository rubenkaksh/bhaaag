"""Turn the picked FLUX top-down ground shots into seamless 512 px tiles plus a 4x2 atlas.

Run from the repo root (pillow + numpy via uv, isolated mode):
  uv run --no-project --with pillow --with numpy python -I tools/makeTextureAtlas.py

Inputs live in art/experiments/zipline-tole/D2_ground_tiles/ (local). Outputs go to
assets-src/zipline-tole-refs/textures/ (gitignored). Seamless method: the sources are near-periodic grids, so search for the crop window whose
opposite edges already match (period alignment), then blend only a narrow band at the wrap seam.
A full-image blend was tried first and doubled the grout lines.
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "art/experiments/zipline-tole/D2_ground_tiles"
OUT = ROOT / "assets-src/zipline-tole-refs/textures"
TILE = 512
MIN_CROP = 560  # smallest crop side searched, in source pixels
BAND = 24  # seam blend half-width in output pixels
# name -> (file, extra pixels to trim off the top before the centre crop)
PICKS = {
    "terracotta_a": ("g03_s11.png", 0),
    "terracotta_b": ("g03_s12.png", 48),  # g03_s12 has a dark strip along the top
    "stone_pale": ("g04_s11.png", 0),
    "stone_warm": ("g04_s12.png", 0),
    "brick_a": ("g05_s11.png", 0),
    "brick_b": ("g05_s12.png", 0),
}


def best_crop(gray: np.ndarray, trim_top: int) -> tuple[int, int, int]:
    """Return (left, top, side) of the square window whose opposite edges match best."""
    h, w = gray.shape
    best = (1e18, 0, trim_top, min(h - trim_top, w))
    for side in range(MIN_CROP, min(h - trim_top, w) - 3, 8):
        for top in range(trim_top, h - side - 3, 8):
            for left in range(0, w - side - 3, 8):
                a = gray[top : top + side, left : left + 3]
                b = gray[top : top + side, left + side : left + side + 3]
                c = gray[top : top + 3, left : left + side]
                d = gray[top + side : top + side + 3, left : left + side]
                err = np.abs(a - b).mean() + np.abs(c - d).mean() - 0.002 * side  # prefer larger crops
                if err < best[0]:
                    best = (err, left, top, side)
    return best[1], best[2], best[3]


def edge_blend(arr: np.ndarray) -> np.ndarray:
    """Cross-fade a narrow band at the wrap seam, so residual mismatch is smoothed, not doubled."""
    n = arr.shape[0]
    out = arr.copy()
    for axis in (0, 1):
        src = np.moveaxis(out, axis, 0)
        for k in range(BAND):
            t = 0.5 * (1 - k / BAND)  # 0.5 at the seam, fading to 0 inside the band
            lo, hi = src[k].copy(), src[n - 1 - k].copy()
            mid = 0.5 * (lo + hi)
            src[k] = lo * (1 - t) + mid * t
            src[n - 1 - k] = hi * (1 - t) + mid * t
    return out


def seam_error(arr: np.ndarray) -> float:
    """Mean abs difference across the wrap seam, relative to a typical neighbouring-pixel difference."""
    a = arr.astype(np.float64)
    wrap = np.abs(a[:, 0] - a[:, -1]).mean() + np.abs(a[0, :] - a[-1, :]).mean()
    inner = np.abs(a[:, 1:] - a[:, :-1]).mean() + np.abs(a[1:, :] - a[:-1, :]).mean()
    return float(wrap / inner)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    atlas = Image.new("RGB", (4 * TILE, 2 * TILE), (0, 0, 0))
    report = {}
    for i, (name, (fname, trim)) in enumerate(PICKS.items()):
        img = Image.open(SRC / fname).convert("RGB")
        gray = np.asarray(img.convert("L"), dtype=np.float64)
        left, top, side = best_crop(gray, trim)
        img = img.crop((left, top, left + side, top + side)).resize((TILE, TILE), Image.LANCZOS)
        before = np.asarray(img, dtype=np.float64)
        after = edge_blend(before)
        tile = Image.fromarray(np.clip(after + 0.5, 0, 255).astype(np.uint8))
        tile.save(OUT / f"{name}.png", optimize=True)
        atlas.paste(tile, ((i % 4) * TILE, (i // 4) * TILE))
        report[name] = {
            "source": fname,
            "crop": [left, top, side],
            "seam_ratio_before": round(seam_error(before), 2),
            "seam_ratio_after": round(seam_error(after), 2),
            "atlas_cell": [i % 4, i // 4],
        }
    atlas.save(OUT / "atlas.png", optimize=True)
    (OUT / "atlas.json").write_text(json.dumps({"tile": TILE, "cols": 4, "rows": 2, "tiles": report}, indent=2))
    for k, v in report.items():
        print(f"{k:14s} seam ratio {v['seam_ratio_before']:5.2f} -> {v['seam_ratio_after']:5.2f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
