# Build Brief — paste this into Claude (claude.ai) to generate the revamp

> Self-contained prompt. Everything Claude needs is inline. Attach the assets listed at the bottom.
> Companion specs (deeper detail): `DESIGN_SYSTEM.md`, `DESIGN_STYLES.md`, `UX_REVAMP.md`, `COMPONENTS.md`, `CONTENT.md`.

---

## ⬇️ COPY FROM HERE ⬇️

You are the lead UI/UX designer + front-end engineer. Build a **complete, production-grade personal portfolio** for **Harshan Aiyappa — Fullstack Software Engineer (AI & R&D)**. Stack: **Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion**. Must be **10/10, zero flaws**: strict TS, accessible (WCAG AA), responsive, performant, and **distinct — not templated**.

### Art direction — "Editorial Monochrome"
Calm, confident, gallery-like. Near-monochrome base + ONE blue accent. Big editorial type, generous whitespace, a photo-forward hero. Inspiration: Drake personal-portfolio (photo-forward hero, clean section rhythm) executed with Linear/Apple/Stripe restraint. **Subtract, don't decorate.**

**Spend all boldness on ONE signature element** grounded in the subject's world (voice/speech AI R&D): a subtle **waveform / oscilloscope line** that reacts to scroll/cursor — used in the hero and as section dividers. Everything else stays quiet.

### Dual theme (light + dark) with animated toggle
Themeable via a `.dark` class on `<html>`; persist choice to localStorage; default to OS preference; no flash-of-wrong-theme. Toggle animates a circular clip-path wipe (View Transitions API, graceful fallback), reduced-motion safe.

**Color tokens** (CSS vars, flip by theme):
| token | light | dark |
|---|---|---|
| canvas | `#F6F6F8` | `#0A0A0B` |
| surface | `#FFFFFF` | `#141416` |
| ink | `#0B0B0C` | `#F1F1F1` |
| ink-2 | `#3A3D44` | `#C7C9CE` |
| muted | `#5B616E` | `#9A9DA4` |
| hairline | `#E2E4E9` | `#26262A` |
| accent | `#1D4ED8` | `#3B82F6` |
| accent-ink | `#FFFFFF` | `#0A0A0B` |

Accent = links, active nav, focus rings, ONE primary CTA, small signal dots. Never large accent fills. **No** cyan/teal/purple/amber, neon glows, or blob radii.

### Type
- Display: **Space Grotesk** (700/500) — hero name `clamp(3rem,9vw,8rem)`, tight tracking.
- Body/UI: **Inter** — 16px base, line-height 1.6, measure 60–75ch.
- Mono: **JetBrains Mono** — small eyebrow labels only.
Self-host via `next/font`. No CDN font links.

### Layout / sections (single-page scroll; nav = scroll order)
1. **Nav** — sticky, slim: wordmark, section links (scroll-spy `aria-current`), Résumé button, theme toggle. Mobile compact.
2. **Hero** — 2-col (text + full-bleed graded PORTRAIT). Eyebrow "Available for select work", name (Space Grotesk), role line, 1–2 line lead, primary CTA "View Work →" + "Résumé", stat row. Text-mask line reveal on load; portrait scroll-parallax; magnetic CTA; waveform signature.
3. **About** — secondary portrait + statement headline + 2–3 paragraphs + stat tiles (count-up).
4. **Services / What I Do** — 3–4 hairline cards (AI & Agents / Distributed Systems / Full-Stack Product / Infra & Cloud), Lucide icons.
5. **Skills & Tech** — grouped chips + a slow infinite logo marquee (pause on hover).
6. **Work / Projects** — filterable editorial grid (filter by group: All / AI·Agents / Voice·Audio / Distributed / Infra·Security / Data / Web·Product). Card: thumbnail (desaturated → color on hover, ≤6° cursor tilt), title, category eyebrow, ≤4 tech chips, one action (GitHub ↗ / 🔒 Proprietary / 🎓 Academic). Featured first.
7. **Experience** — timeline (company · role · dates · bullets) + Résumé download.
8. **Testimonials** — peer quote cards on hairline surfaces.
9. **Contact / CTA** — big "Let's build something." headline + email CTA + magnetic social icons.
10. **Footer** — minimal: name · role · © 2026 · back-to-top.

### Signature motion (Framer Motion) — disciplined, ALL reduced-motion safe
Text-mask reveals · staggered fade-ups (one shared `Reveal`) · magnetic CTA/socials · scroll-scrubbed hero · cursor-aware work-card tilt+sheen · animated theme wipe · one slim scroll-progress bar · the waveform signature. Animate transform/opacity/clip-path only. `@media (prefers-reduced-motion: reduce)` disables parallax/tilt/magnetic/wipe; content shows instantly.

### Structural device
Use signal/latency-style mono eyebrows (a small accent dot + label), NOT generic "01 / 02 / 03" — only number things that are truly sequential.

### Content (use verbatim; plain & senior — NO sci-fi jargon)
- **Name:** Harshan Aiyappa · **Role:** Fullstack Software Engineer — AI & R&D
- **Tagline:** "I build production AI, end to end."
- **Hero lead:** "I design and ship production systems across the stack — from LLM/voice pipelines and RAG to the APIs, infra, and interfaces around them. ~5 years turning hard problems into simple, reliable products."
- **Stats:** ~4.8 yrs experience · 40+ platforms delivered · 250+ engineers mentored
- **About:** intersection of product + applied AI; React/Next front, Node/Python services, R&D in TTS/ASR/NLP; architectural rigour; currently at Lingotran; MCA.
- **Skills:** Frontend (React, Next.js, TypeScript, Tailwind, Framer Motion) · Backend (Node, Express, Python, FastAPI, NestJS, Java) · AI/ML (LangChain, OpenAI API, Whisper, SpaCy, TensorFlow, PyTorch) · Data (PostgreSQL, MongoDB, MySQL, Redis, Kafka) · DevOps (Docker, AWS, Kubernetes) · also Go, GraphQL
- **Experience:** Lingotran (Fullstack, AI & R&D · Jan 2023–Present) · Veriteam (Software Engineer · Feb 2021–Aug 2022, 40+ projects) · MCA NIE-IT Mysore (2017–2020) · BCA U. Mysore (2014–2017)
- **Links (canonical — the old code had a WRONG GitHub; use these):**
  - GitHub `https://github.com/Kimosabey` (NOT "HarshanAiyappaPrabhu" — that 404s)
  - LinkedIn `https://linkedin.com/in/harshan-aiyappa`
  - X `https://x.com/HarshanAiyappa`
  - Email `harshan.aiyappa@gmail.com`

### Acceptance (10/10 checklist)
- [ ] Light + dark both polished; contrast ≥4.5:1 body / ≥3:1 large, verified per theme
- [ ] Visible `:focus-visible` rings; full keyboard nav; theme toggle is a real button with `aria-pressed`
- [ ] `prefers-reduced-motion` fully respected
- [ ] Responsive 375 / 768 / 1024 / 1440, no horizontal scroll, tap targets ≥44px
- [ ] Optimized images via `next/image`; no CDN fonts; clean TypeScript build
- [ ] One coherent system — no leftover cyberpunk/HUD styling, no dead components

## ⬆️ COPY TO HERE ⬆️

---

## 📎 Assets to attach / use
Everything lives in `kimo-nexus/public/`. **Full spec:** [`kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md`](../../../kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md) (Senior-5 sizes, color registry, visual tiers, sync commands).

- **Hero + About portrait:** `/profile.webp` (theme-aware grade — higher-contrast B/W-leaning in light, lifted-black in dark).
- **Project grid cards (`src/lib/work.ts`):** `/projects/<id>.webp` — **1280×640 WebP**, derived from each repo's `docs/assets/thumbnail.png`. Regenerate via `node kimo-nexus/scripts/sync-portfolio-assets.mjs`.
- **Per-project PNG masters:** `/projects/<id>/` — synced from `kimo-portfolio-workspace/<repo>/docs/assets/` (thumbnail, hero_main, workflow, dashboard, architecture + domain extras).
- **Color / theme briefs:** each repo's `docs/asset-brief.md` — primary/accent hex, motif, infographic vs minimal illustration tier.
- **Proprietary/academic:** grid WebPs at `/projects/<id>.webp`; PNG sources under `/projects/_proprietary/` and `/projects/_academic/`.
- **Résumé:** `/resume.pdf`.
- **Site chrome:** `/favicon.ico`, `/apple-touch-icon.png`, `/og-image.png`, `/noise.png`.

## 🔧 Fixes to carry into the build
1. GitHub link → `Kimosabey` (old `page.tsx` linked the non-existent `HarshanAiyappaPrabhu` → 404).
2. Render `<ScrollProgress>` once (old code rendered it twice: layout + page).
3. Remove dead deps if unused after rebuild: `three`, `vanta`, `@tsparticles/*`, `@radix-ui/react-tooltip`, `@studio-freight/lenis` (keep `lenis`), `motion` (keep `framer-motion`).
4. Reconcile the metadata (title/description) and `themeColor` to both themes.
