"""Derive tangent-space normal maps (<name>_n.jpg) from the colour tiles in public/assets/textures.

Run from the repo root:
  uv run --no-project --with pillow --with numpy python -I tools/makeNormalMaps.py
Luminance is treated as height; Sobel gradients with wrap-around keep the tiles seamless. No AI
generation involved, so no extra licence line is needed (the colour tiles keep theirs).
"""

from pathlib import Path

import numpy as np
from PIL import Image

DIR = Path(__file__).resolve().parent.parent / "public/assets/textures"
NAMES = ["roof_tile", "wall_brick", "wall_plaster", "brick_a", "stone_warm", "terracotta_a"]
STRENGTH = 2.5

for name in NAMES:
    img = Image.open(DIR / f"{name}.jpg").convert("L")
    h = np.asarray(img, dtype=np.float32) / 255.0
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * 0.5
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * 0.5
    n = np.dstack([-dx * STRENGTH, dy * STRENGTH, np.ones_like(h)])
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    out = ((n * 0.5 + 0.5) * 255).astype(np.uint8)
    Image.fromarray(out).save(DIR / f"{name}_n.jpg", quality=80)
    print(name)
