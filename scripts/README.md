# Portfolio scripts

> The site's project covers are built from **real data** (`sync-repo-languages.mjs`). The repo PNGs
> below are AI-generated illustrations (see each repo's `docs/asset-brief.md`), so they're
> used as README art only, never as proof-of-work screenshots.

## Asset scripts

Sync PNG masters from workspace repos to the site and regenerate grid WebP thumbnails.

**Canonical spec:** [`kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md`](../../kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md) — formats, Senior-5 sizes, color registry, visual tiers.

## Commands

```bash
node kimo-nexus/scripts/generate-asset-briefs.mjs   # refresh docs/asset-brief.md for all 23 built projects
node kimo-nexus/scripts/sync-portfolio-assets.mjs   # copy PNGs + rebuild <id>.webp @ 1280×640
node kimo-nexus/scripts/audit-portfolio-assets.mjs  # missing/broken assets, dimension drift
node kimo-nexus/scripts/doc-audit.mjs               # brief coverage vs work.ts + registry
node kimo-nexus/scripts/sync-repo-languages.mjs     # snapshot real GitHub language %s → src/lib/repoLanguages.json (project covers)
```

## Conventions

| Artifact | Path | Notes |
|---|---|---|
| PNG masters | `kimo-portfolio-workspace/<repo>/docs/assets/` | Lossless; never WebP in repos |
| Per-project brief | `docs/asset-brief.md` | Primary/accent hex, motif, tier, status |
| Grid thumbnail | `kimo-nexus/public/projects/<id>.webp` | 1280×640 WebP from `thumbnail.png` |
| Project folder | `kimo-nexus/public/projects/<id>/` | Full PNG set + extras |

**Site ID ↔ folder:** `chronicle-ledge` uses workspace folder `chronicle-ledger`.
