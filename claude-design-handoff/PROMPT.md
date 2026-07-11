# Paste this whole file into Claude (claude.ai) after uploading this folder

You are my lead UI/UX designer + senior front-end engineer. Using the **specs in `docs/`** and the **images in `assets/`** I've uploaded, build a **complete, production-grade personal portfolio** for **Harshan Aiyappa — Fullstack Software Engineer (AI & R&D)**. Stack: **Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion**. Bar: **10/10, zero flaws** — strict TS, WCAG AA, responsive, performant.

## ⭐ PRIMARY VISUAL REFERENCE (the north star)
**https://dribbble.com/shots/21965863-Drake-Personal-Portfolio-Joomla-4-Template**
Build a **faithful, personalized take on this exact design** — same structure, mood, and layout, with my content and a personal twist. Not a generic template, not a from-scratch style.

### Reference breakdown (match this)
- **Theme:** dark. Near-black charcoal page background; cards/pills a touch lighter with soft rounded corners (~20–24px) and a subtle 1px hairline border.
- **Accent:** the reference's accent is a green; **ours is a brighter ELECTRIC LIME `#B6F400`** (light `#65A30D`) — same placement as the reference: one word in each big headline, the stat numbers, the primary "HIRE ME" button, active nav, links.
- **Layout — two columns:**
  - **Left: a persistent profile card** (sticky on desktop) containing: logo/wordmark + role label, a **B/W (grayscale) portrait** with rounded corners, email + location, copyright, a row of **circular outlined social icons**, and a solid **lime** **primary CTA button** with a mail icon.
  - **Right: the scrolling main content.**
- **Signature devices (keep these — they make it distinct):**
  1. **Section label pills** — small rounded outline pills with an icon + uppercase label ("INTRODUCE", "ABOUT", "WORK", "RESUME").
  2. **Rotating circular badge** near the hero — circular text (e.g. "MY PROJECTS • MY PROJECTS •") around a downward arrow, slowly rotating; acts as a scroll cue.
  3. **Vertical icon nav rail** floating on the right edge — a rounded pill of stacked section icons (home/about/work/skills/etc.), active item highlighted lime.
  4. **Circular hamburger** button top-right; big stat blocks with **lime numbers** + small uppercase muted labels.
- **Type:** very large, bold, **rounded geometric sans** for headlines (Poppins / General Sans / Familjen Grotesk vibe — NOT a techy mono-ish face), tight leading, headline wraps 2–3 lines with one lime word. Body is muted gray, comfortable size. Small labels uppercase + letter-spaced.

## Palette (dark-first, matching the reference; also ship a light variant for the toggle)
| token | dark (primary) | light (adapted) |
|---|---|---|
| canvas | `#0E0E10` | `#F6F6F5` |
| surface (cards/pills) | `#1A1A1D` | `#FFFFFF` |
| ink (text) | `#F5F6F7` | `#0E0E10` |
| muted | `#8E9199` | `#6B6E76` |
| hairline | `#232327` | `#E6E6E4` |
| accent (electric lime) | `#B6F400` | `#65A30D` |
| accent-ink (text on accent) | `#0E1400` | `#FFFFFF` |
Accent (**electric lime**) ONLY for: one headline word, stat numbers, primary CTA, active nav/rail item, links, small dots. No other bright colors.

## Dual theme + toggle
`.dark` class on `<html>` (dark is the default/hero look); persist to localStorage; respect OS; no flash-of-wrong-theme. Toggle animates a circular clip-path wipe (View Transitions API + fallback), reduced-motion safe.

## Type (self-host via next/font, no CDN)
- Display: a **rounded geometric sans** matching the reference — **Poppins** or **General Sans** (600–700), hero `clamp(2.5rem,6.5vw,6rem)`, tight leading.
- Body/UI: **Inter** (16px, line-height 1.6).
- Labels: same sans, uppercase, letter-spaced (or JetBrains Mono for micro-labels if you prefer).
- **Icons:** modern line-icon set (**Lucide**), consistent 1.5–2px stroke — circular outlined social icons + the vertical rail icons, matching the reference. No emoji as UI icons.

## Sections (nav = scroll order; mirror the reference's flow)
Left profile card (persistent) + right content:
**Introduce/Hero** (pill + huge headline with one lime word + lead + rotating badge + lime stat blocks) → **About** (pill + big headline w/ lime phrase + story paragraphs + Résumé pill) → **Services / What I Do** (cards) → **Skills** (grouped + logo marquee) → **Work** (filterable grid; card = thumbnail grayscale→color on hover, title, category pill, ≤4 tech chips, one action: GitHub ↗ / 🔒 Proprietary / 🎓 Academic) → **Experience** (timeline + résumé) → **Testimonials** → **Contact** (headline + email + socials) → **Footer**. Right-edge **vertical icon rail** links every section (scroll-spy, active = lime).

## Motion, background & micro-interactions (make it uniquely ALIVE — beyond the reference)
The reference is fairly static; add a distinctive, cohesive motion personality on top. Everything transform/opacity/clip-path only, 60fps, and fully `prefers-reduced-motion` safe (loops/parallax/magnetic/cursor off → content instant).

**Background (unique, tasteful — one coordinated system, NOT stacked noise):**
- a slow-drifting **lime-tinted radial glow** behind the hero (very low opacity);
- a faint **dot-grid** that subtly parallaxes on scroll and **reacts to the cursor** (dots near the pointer brighten/scale);
- a ~3% **film-grain** overlay for a premium finish.
Depth, not decoration — keep opacity low.

**Signature personal motif:** a small **audio-waveform / equalizer** accent (nod to my voice/speech-AI work) — animated bars or a signal line used as a hero accent + section divider. This is the unique twist that makes it *mine*, not a template.

**Orchestrated page-load intro:** logo/name reveal → profile card fades/slides in → hero headline mask-reveals word-by-word → the "MY PROJECTS" badge starts rotating.

**Micro-interactions (everywhere):**
- Buttons: magnetic pull + press scale + icon nudge; primary CTA gets a soft lime glow on hover.
- Links: animated lime underline wipe.
- Work cards: cursor-aware 3D tilt (≤6°) + moving sheen + grayscale→color image + lift.
- Vertical nav rail: active indicator morph (shared layout), icon scale + label tooltip on hover.
- Section pills: subtle scale/glow as they scroll into view.
- Stats: count-up on reveal. Rotating badge: slow spin, nudges faster on hover.
- Social icons: magnetic + fill-on-hover. Theme toggle: clip-path wipe + sun↔moon morph.
- Reveals: staggered fade-up + heading mask reveals; Lenis smooth scroll + parallax layers; one slim scroll-progress bar.
- Optional custom cursor: a dot/ring that scales over interactive elements.

## Content (verbatim; plain & senior — NO sci-fi jargon)
- **Harshan Aiyappa** — Fullstack Software Engineer (AI & R&D). Role label under logo: "Fullstack Engineer · AI & R&D".
- Hero headline (one **lime** word): **"Say hi — I'm Harshan, I build production AI."** (or similar; keep the reference's one-accent-word device).
- Hero lead: "I design and ship production systems across the stack — LLM/voice pipelines, RAG, and the APIs, infra, and interfaces around them. ~5 years turning hard problems into simple, reliable products."
- Card contact: `harshan.aiyappa@gmail.com` · "Based in India".
- Stats (lime numbers): **~4.8+ YEARS OF EXPERIENCE** · **40+ PLATFORMS DELIVERED** · **250+ ENGINEERS MENTORED**.
- About headline (lime phrase): "Every system should stay **simple as it scales**."
- Full bio, skills, experience → `docs/CONTENT.md`.
- **Links:** GitHub `github.com/Kimosabey` · LinkedIn `linkedin.com/in/harshan-aiyappa` · X `x.com/HarshanAiyappa` · Email `harshan.aiyappa@gmail.com`.

## Assets (in the uploaded `assets/` folder)
- `assets/profile.webp` — profile-card portrait (render **grayscale**, like the reference; optimize to responsive sizes).
- `assets/projects/<id>.png` — 25 project thumbnails (names = project ids; the 6 proprietary/academic get 🔒/🎓 badges, no repo link).
- `assets/resume.pdf` — résumé.
- Generate: `favicon.ico`, `apple-touch-icon.png`, `og-image.png` (1200×630).
- Project data/categories → `docs/COMPONENTS.md` + `docs/CONTENT.md`.

## Features & scope (build all "Core"; add "Plus" where it strengthens it)
**Core**
- Dark + light theme toggle — persisted, OS-aware, no flash-of-wrong-theme
- **Mobile-first, fully responsive** 375 → 1920 (design mobile first, scale up); no horizontal scroll; tap targets ≥44px; profile card stacks on top on mobile; vertical rail collapses to a mobile nav
- Accessibility: WCAG AA, keyboard nav, visible focus, reduced-motion, aria + semantic landmarks
- Sticky nav + right-edge vertical icon rail with scroll-spy (active = lime); mobile hamburger menu
- Lenis smooth scroll + slim scroll-progress bar
- All sections: Hero / About / Services / Skills / Work / Experience / Testimonials / Contact / Footer
- Work grid with category filtering; 🔒 proprietary / 🎓 academic badges
- Résumé download; email CTA (mailto/compose) + copy-email-to-clipboard
- Magnetic social links
- SEO: full metadata, OpenGraph + Twitter cards, JSON-LD Person schema, sitemap.xml, robots.txt
- favicon.ico + apple-touch-icon + og-image (1200×630)
- Optimized images (next/image), self-hosted fonts; target Lighthouse ≥95 (Perf / A11y / Best / SEO)
- Styled 404 (not-found) page
- Orchestrated page-load intro (reduced-motion safe)
- The unique motion + background + micro-interaction system (above)

**Plus (optional, if it elevates it)**
- Contact form (name / email / message) with inline validation + toast — else keep mailto only
- Project detail modal / case-study view
- Command palette (⌘K) to jump between sections
- Back-to-top button; privacy-friendly analytics (e.g., Vercel Analytics)
- View-transition section morphs

## Responsive — mobile-first (non-negotiable)
Design mobile-first, then scale up. Breakpoints 375 / 768 / 1024 / 1440 (+ ultrawide). Mobile: single column, profile card on top (compact), rail → bottom/hamburger nav, filters scroll horizontally, fluid type via `clamp()`, responsive images. No horizontal overflow at 320px+.

## Acceptance (10/10)
- [ ] Reads as a faithful, personalized version of the reference (left card + lime accent + rail + rotating badge + section pills)
- [ ] Dark default polished; light variant works; contrast ≥4.5:1 body per theme
- [ ] Visible focus rings, full keyboard nav, real `<button>` toggle w/ `aria-pressed`
- [ ] `prefers-reduced-motion` respected; **mobile-first** responsive 375/768/1024/1440, no horizontal scroll, tap targets ≥44px
- [ ] Optimized images, no CDN fonts, clean TS build; one coherent system

Deliver the full Next.js project (or a single-file prototype first), then iterate with me.
