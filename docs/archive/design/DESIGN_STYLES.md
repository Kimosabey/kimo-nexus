# Kimo Nexus — Design Styles & Visual Direction

> The aesthetic brief: the chosen style, its DNA, references, and the alternatives considered. Read before `DESIGN_SYSTEM.md` (the style made concrete in tokens).

---

## Chosen style — "Dark Editorial, Lime Accent" (a personalized Drake)
A faithful, personalized take on the **Drake reference**: a **dark charcoal canvas**, oversized rounded-geometric headlines, a single **electric-lime** accent (the reference is green; we go punchier), a **persistent left profile card** (grayscale portrait + contact + CTA) beside scrolling content, plus the reference's signature devices (rotating badge, vertical icon rail, pill labels). Confident and modern — not templated.

**Style keywords:** dark · lime-accent · profile-card · rounded-geometric type · photo-forward · pill-labels · vertical-rail · rotating-badge · spacious · dual-theme.

**Reference DNA**
- **Drake portfolio (primary):** photo-forward hero (portrait + big heading + contact), clean section rhythm (About → Resume → Services → Skills → Portfolio → Testimonials → Contact), card-based work grid, generous whitespace.
- **Linear:** hairline borders, restrained accent, crisp dark mode, subtle depth.
- **Apple / Stripe:** big type, honest copy, product-grade polish, tasteful scroll motion.

---

## Style DNA (how it looks, concretely)
| Dimension | Direction |
|---|---|
| **Layout** | Two columns: a **persistent left profile card** + scrolling right content, with a **vertical icon nav rail** on the right edge. Rounded cards/pills, hairline borders, big margins. |
| **Type** | Rounded geometric sans display (Poppins / General Sans vibe) at large sizes, Inter body 16–18px, uppercase letter-spaced micro-labels. Headlines wrap 2–3 lines with one lime word. |
| **Color** | Dark charcoal base + **one electric-lime** accent used sparingly (headline word, stat numbers, CTA, active nav). No other bright colors. |
| **Icons** | Modern line icons (**Lucide**), consistent 1.5–2px stroke; circular outlined social icons + rail icons, as in the reference. No emoji as UI icons. |
| **Surface** | Flat + hairline borders. One soft shadow for raised cards. Rounded but restrained radii (10–24px), not blobby. |
| **Texture** | One subtle device only: a masked hero grid (or 3% grain) — never both, never full-bleed noise. |
| **Imagery** | The personal portrait, theme-graded (higher-contrast B/W-leaning in light; lifted-black graded in dark). Project thumbnails desaturated at rest, color on hover. **Asset colors** follow per-project signatures in [`IMAGE_ASSET_GUIDE.md`](../../../kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md) — distinct primaries per project; Lime `#B6F400` cluster for Nexus Shield / Agent Core / SpeakFlow. |
| **Motion** | Editorial and quiet: text-mask reveals, staggered fade-ups, magnetic CTAs, cursor-aware tilt, animated theme wipe. Signature, not busy. |
| **Voice** | Plain, senior, specific. No sci-fi HUD jargon. |

---

## Component styling language
- **Cards (work / services):** `--surface` fill, `1px --hairline` border, `--r-md/lg` radius, `--shadow-card` on hover + accent hairline; content left-aligned, eyebrow → title → meta.
- **Buttons:** `primary` = solid ink/accent with `--accent-ink` text + magnetic pull; `ghost` = hairline; `link` = underline-on-hover accent. `:focus-visible` accent ring.
- **Chips:** pill, hairline, mono/label text; `active` = accent-soft bg + accent text.
- **Eyebrows:** mono, uppercase, `--muted`, small (`02 / About`), often with a short accent tick.
- **Section headers:** eyebrow + display title + optional lead, consistent top rhythm.
- **Dividers:** hairlines, not shadows or gradients.

---

## Do / Don't
**Do**
- Lead with type and the portrait; let whitespace breathe.
- Use the accent like punctuation — links, one CTA, active state, focus.
- Keep both themes equally polished; test contrast independently.
- Make motion express hierarchy; keep it reduced-motion-safe.

**Don't**
- Reintroduce cyan/teal/purple/amber, neon glows, or blob radii.
- Stack ambient effects (wavy canvas + aurora + spotlight + grain).
- Write HUD jargon or fake telemetry ("Nodes_Active", "SYSTEM_CORE").
- Rely on hover-only affordances or remove focus rings.
- Use emoji as structural icons.

---

## Alternatives considered (and why not)
1. **Keep the "Cyberpunk Neural HUD"** (current) — high energy but reads templated, noisy, and dates fast; competing accents hurt hierarchy and contrast. *Rejected.*
2. **Pure light Swiss/brutalist** (closest to the light Drake demo) — clean, but loses the premium depth and the dark-mode identity the user wants. *Folded in as the light theme, not the whole system.*
3. **Glassmorphism-heavy** — trendy but muddies contrast in light mode and fights the editorial calm. *Rejected; a single restrained glass surface at most.*

**Outcome:** Editorial Monochrome + dual theme = distinctive, senior, durable, and a clean stage for the work and the portrait.

---

## Theme character
- **Dark (primary — matches the reference):** charcoal canvas, off-white type, electric-lime accent (`#B6F400`). Cinematic, premium.
- **Light (adapted):** warm off-white, ink-black type, deeper lime accent (`#65A30D`) for contrast.
- The animated theme toggle (clip-path wipe) is a signature micro-moment.
- *Accent hue is not final — see the theme-color options being decided with the client.*
