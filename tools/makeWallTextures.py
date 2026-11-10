"""Grey-scale wall and roof detail maps for the instanced decor kit (instance colours tint them).

Run from the repo root:
  uv run --no-project --with pillow --with numpy python tools/makeWallTextures.py

wall_brick  : crop of a clean brick patch of A_houses_v1/a15_s11, seamless via makeTextureAtlas helpers.
roof_tile   : crop of the front slope of C_roofs/r04_s11 (curved tile rows).
wall_plaster: procedural periodic mottle (the generated plaster areas are flat white, no detail to keep).
Outputs 256 px JPEGs to public/assets/textures/ and full-size PNGs next to the atlas tiles.
"""

import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("atlas", ROOT / "tools/makeTextureAtlas.py")
atlas = importlib.util.module_from_spec(spec)
spec.loader.exec_module(atlas)

ART = ROOT / "art/experiments/zipline-tole"
OUT_SRC = ROOT / "assets-src/zipline-tole-refs/textures"
OUT_PUB = ROOT / "public/assets/textures"
SIZE = 256


def grey_norm(img: Image.Image, mean: float, spread: float) -> Image.Image:
    """Luminance only, rescaled so instance colours stay readable (mean ~0.9, gentle contrast)."""
    g = np.asarray(img.convert("L"), dtype=np.float64) / 255.0
    g = (g - g.mean()) / (g.std() + 1e-6)
    g = np.clip(mean + spread * g, 0, 1)
    return Image.fromarray((g * 255 + 0.5).astype(np.uint8)).convert("RGB")


def seamless_from(path: Path, box: tuple[int, int, int, int], min_crop: int) -> Image.Image:
    img = Image.open(path).convert("RGB").crop(box)
    gray = np.asarray(img.convert("L"), dtype=np.float64)
    atlas.MIN_CROP = min_crop
    left, top, side = atlas.best_crop(gray, 0)
    img = img.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)
    return Image.fromarray(np.clip(atlas.edge_blend(np.asarray(img, dtype=np.float64)) + 0.5, 0, 255).astype(np.uint8))


def plaster() -> Image.Image:
    rng = np.random.default_rng(7)
    acc = np.zeros((SIZE, SIZE))
    for octave, amp in ((4, 1.0), (8, 0.6), (16, 0.35), (64, 0.18)):
        small = rng.standard_normal((octave, octave))
        # periodic upsample: tile 3x3, resize, take the middle (wraps seamlessly)
        big = np.tile(small, (3, 3))
        im = Image.fromarray(big.astype(np.float32), mode="F").resize((SIZE * 3, SIZE * 3), Image.BICUBIC)
        acc += amp * np.asarray(im)[SIZE : 2 * SIZE, SIZE : 2 * SIZE]
    acc = (acc - acc.mean()) / acc.std()
    g = np.clip(0.92 + 0.03 * acc, 0, 1)
    return Image.fromarray((g * 255 + 0.5).astype(np.uint8)).convert("RGB")


def save(name: str, img: Image.Image) -> None:
    img.save(OUT_SRC / f"{name}.png", optimize=True)
    img.resize((SIZE, SIZE), Image.LANCZOS).save(OUT_PUB / f"{name}.jpg", quality=82)
    print("wrote", name)


def main() -> None:
    OUT_SRC.mkdir(parents=True, exist_ok=True)
    OUT_PUB.mkdir(parents=True, exist_ok=True)
    brick = seamless_from(ART / "A_houses_v1/a15_s11.png", (140, 612, 430, 845), 200)
    save("wall_brick", grey_norm(brick, 0.88, 0.14))
    roof = seamless_from(ART / "C_roofs/r04_s11.png", (360, 560, 720, 770), 180)
    save("roof_tile", grey_norm(roof, 0.84, 0.13))
    save("wall_plaster", plaster())


if __name__ == "__main__":
    main()
