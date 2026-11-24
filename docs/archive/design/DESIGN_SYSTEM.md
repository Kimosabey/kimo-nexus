# Kimo Nexus — Design System

> Single source of truth for the revamped portfolio. Editorial, calm, confident — Drake-inspired. Monochrome base + one accent, big type, generous whitespace, disciplined signature motion. Works in **light + dark**.

---

## 1. Design principles
1. **Subtract, then elevate.** Every element earns its place. No decorative noise.
2. **Type and photo do the work.** Large display headings + the personal portrait carry the page; color is restraint, not spectacle.
3. **One accent.** A single electric lime signals interactivity. Everything else is monochrome on a dark canvas.
4. **Motion with meaning.** Animation expresses cause/effect and hierarchy — never ambient jitter. Always reduced-motion safe.
5. **Both themes are first-class.** Designed as a pair; contrast verified independently.

---

## 2. Color tokens

Defined as CSS variables in `globals.css` under `@theme`, themed by a `data-theme` / `.dark` class on `<html>`, and aliased in `tailwind.config.ts` (e.g. `bg-canvas`, `text-ink`, `text-muted`, `border-hairline`, `text-accent`).

### Semantic tokens

| Token | Role | Light | Dark |
|---|---|---|---|
| `--canvas` | page background | `#F6F6F5` | `#0E0E10` |
| `--surface` | cards / raised | `#FFFFFF` | `#1A1A1D` |
| `--surface-2` | insets / wells | `#EEEFF2` | `#1C1C1F` |
| `--ink` | primary text | `#0B0B0C` | `#F1F1F1` |
| `--ink-2` | secondary text | `#3A3D44` | `#C7C9CE` |
| `--muted` | tertiary / meta | `#5B616E` | `#9A9DA4` |
| `--hairline` | borders / dividers | `#E2E4E9` | `#26262A` |
| `--accent` | interactive / CTA (electric lime) | `#65A30D` | `#B6F400` |
| `--accent-ink` | text on accent | `#FFFFFF` | `#0E1400` |
| `--accent-soft` | accent tint bg | `rgba(101,163,13,.10)` | `rgba(182,244,0,.14)` |

> **Dark is the primary theme** (matches the Drake reference); light is the adapted variant. Accent is **electric lime** (`#B6F400` dark / `#65A30D` light) — the reference uses green; we go a shade punchier/more distinctive.

**Rules**
- Body text pairs must hit **≥ 4.5:1**; large display **≥ 3:1** — verified per theme (see §8).
- Accent (electric lime) is for one headline word, links, active nav/rail, focus rings, the primary CTA, stat numbers, and small dots. Never large fills of accent.
- **Retire:** cyan/teal/purple/amber/blue accents, the `#16169c` indigo shadows, and the `cyan-400`→primary remaps. Grayscale + one electric-lime accent only.

---

## 3. Typography

Self-hosted via `next/font/google`. Display carries personality; body stays neutral and readable.

| Role | Family | Usage |
|---|---|---|
| Display | **Space Grotesk** (500/700) | H1–H2, hero name, section titles. Tight tracking `-0.02em`. |
| Body / UI | **Inter** (400/500/600) | paragraphs, labels, buttons, nav. 16px base, line-height 1.6. |
| Mono | **JetBrains Mono** (400/500) | small eyebrow labels, code, metadata. Used *sparingly* — not wall-to-wall. |

### Type scale (px / rem)
`12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 56 · 72 · 96 · 128`
- Fluid display headings via `clamp()` (e.g. hero `clamp(3rem, 9vw, 8rem)`).
- Measure: body **60–75ch** desktop, 40–60ch mobile.
- Weights convey hierarchy: display 700, section titles 500–700, body 400, labels 500.
- **Drop** the blanket uppercase + `tracking-[0.4em]` mono treatment; reserve uppercase micro-labels for eyebrows only.

---

## 4. Spacing, radius, elevation

- **Spacing scale (4/8 rhythm):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`. Section vertical padding `clamp(80px, 12vw, 160px)`.
- **Container:** `max-width: 1240px` (wide editorial), gutters `clamp(20px, 5vw, 80px)`.
- **Radius:** `--r-sm 10px`, `--r-md 16px`, `--r-lg 24px`, `--r-pill 999px`. (Retire the 3.5rem "blob" radii.)
- **Elevation:** flat by default; one soft shadow for raised cards — `--shadow-card: 0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.08)` (dark uses higher-alpha black). No neon glows.
- **Hairlines** (`1px` `--hairline`) are the primary separator, not shadows.

---

## 5. Signature motion system  ⭐ (the "modern, unique animations" layer)

Built on the existing **Framer Motion + Lenis** stack. A small set of *signature* interactions, reused consistently, gives the site a distinctive feel without chaos. **All gated on `prefers-reduced-motion` and pointer capability.**

### Motion tokens
- Durations: `--t-fast 150ms · --t 250ms · --t-slow 450ms · --t-scrub` (scroll-linked).
- Easing: enter `cubic-bezier(0.22,1,0.36,1)` (ease-out-expo), exit `cubic-bezier(0.4,0,1,1)`; springs `{stiffness 120, damping 18}` for interactive elements.
- Exit ≈ 65% of enter duration. Stagger children 40–60ms.

### The signature set
1. **Text-mask reveal** — headings rise from a clipping mask (translateY + `clip-path`) on scroll-in; hero name reveals per-word/line. Replaces the current blur-in.
2. **Magnetic CTA** — the primary button + social icons pull ~8–14px toward the cursor and scale 1.03 on hover; release springs back.
3. **Scroll-scrubbed hero** — portrait and headline parallax on scroll (reuse existing `useScroll/useTransform`), but subtler; headline optionally has a duotone→full-color grade tied to scroll.
4. **Cursor-aware work cards** — 3D tilt (reuse `3DCard` math, dialed down to ≤6°) + a sheen that tracks the cursor; image un-desaturates on hover.
5. **Pinned work gallery (optional, desktop)** — the Work section pins while cards translate horizontally (sticky + scroll), a modern editorial device.
6. **Animated theme transition** — theme toggle triggers a circular clip-path wipe from the toggle origin (View Transitions API where supported; graceful cross-fade fallback).
7. **Staggered section reveals** — every section's children fade-up + slight scale (0.98→1), staggered, via one shared `Reveal` wrapper.
8. **Marquee** — the tech/skills logo loop keeps a slow infinite marquee (reuse `LogoLoop`), pauses on hover.
9. **Scroll progress + tracing beam** — one slim top progress bar (dedupe the current double); optional left tracing beam kept subtle.

### Guardrails
- Animate `transform`/`opacity`/`clip-path` only (no width/height/top/left).
- Max 1–2 *hero* motions per viewport; the rest are micro.
- `@media (prefers-reduced-motion: reduce)` disables parallax, tilt, magnetic, marquee, theme-wipe; content appears instantly at full opacity.
- Replace the OLD *uncoordinated* noise (wavy canvas + aurora blobs + mouse spotlight + heavy grain all at once) with ONE cohesive, subtle background system (see §6) plus the waveform motif. Distinctive, not chaotic.

---

## 6. Background & texture (unique, cohesive system — subtle, not noisy)
One coordinated background signature (dark theme):
- a slow-drifting **lime-tinted radial glow** behind the hero (very low opacity);
- a faint **dot-grid** that gently parallaxes on scroll and **reacts to the cursor** (dots near the pointer brighten/scale);
- a ~3% **film-grain** overlay for a premium finish.
Plus the **waveform / equalizer** signature motif (nod to voice-AI) as a hero accent + section divider.
Keep opacity low — depth, not decoration. All drift/reactivity is `prefers-reduced-motion` gated (static fallback). Section transitions still lean on whitespace + hairlines.

---

## 7. Iconography & imagery
- Icons: **Lucide** (already used) at consistent stroke `1.5–2`. One family; retire mixed icon sets and the Material Symbols CDN font.
- Brand/tech logos: `react-icons/si` (already used) in the skills marquee.
- **No emoji as UI icons.**
- Personal photo: theme-aware grade (slightly lifted blacks in dark, higher-contrast B/W option in light); optimized responsive `next/image`.

---

## 8. Accessibility baseline
- Contrast: body ≥ 4.5:1, large ≥ 3:1, verified in **both** themes (accent-on-canvas, muted-on-canvas, ink-on-surface).
- Visible `:focus-visible` ring (2px `--accent`, 2px offset) on all interactive elements.
- Theme toggle: real `<button>`, `aria-pressed`, keyboard operable; respects and persists user choice (localStorage) and honors OS preference on first load.
- All motion honors reduced-motion; nav is keyboard-navigable; images have alt text; heading hierarchy is sequential.

---

## 9. Token → code mapping (implementation note)
- CSS vars live in `src/app/globals.css` (`@theme` + `:root` / `.dark` overrides).
- Tailwind aliases in `tailwind.config.ts`: `canvas, surface, surface-2, ink, ink-2, muted, hairline, accent, accent-soft` and font families `display, sans, mono`.
- Motion tokens exposed as JS constants in `src/lib/motion.ts` (durations/easings/variants) so components share one rhythm.
