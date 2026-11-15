# Game Asset Production & Integration

A reusable workflow for turning generated or painted art into engine-ready asset packages.

Read `SKILL.md` first; it links to `references/` (generation, processing, validation, delivery, one file per engine). `tools/asset_pipeline.py` (Pillow) supports inspect, key, slice, pack and validate; it never overwrites sources or existing outputs without `--force`. Confirm options with `--help`.

This is a generic, cross-project skill. Bhaaag-specific constraints live in the brief (`docs/briefs/`), not here.
