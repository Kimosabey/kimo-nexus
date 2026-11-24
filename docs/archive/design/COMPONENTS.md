# Kimo Nexus — Component Inventory & Specs

> Verdict for every existing file (keep / redesign / remove) + specs for what we build. Based on the codebase map. Goal: a lean, composed component tree replacing the single-file `page.tsx`.

---

## 1. Verdicts — existing files

### `src/components/` (top-level)
| File | Verdict | Notes |
|---|---|---|
| `SmoothScroll.tsx` | **KEEP** | Lenis wrapper, working. Reuse as-is. |
| `Experience.tsx` | **REDESIGN** | Keep data/structure; restyle to new tokens; extract data to `content.ts`. |
| `Testimonials.tsx` | **REDESIGN** | Keep real quotes; restyle cards to hairline surfaces. |
| `VantaWaves.tsx` | **REMOVE** | Disabled (`USE_VANTA_BACKGROUND=false`); drags in `three`/`vanta`. |
| `Header.tsx` | **REMOVE** | Orphaned (site uses FloatingNav). Replaced by new `Nav`. |
| `ProjectCard.tsx` | **REMOVE** | Orphaned; replaced by new `WorkCard`. |

### `src/components/ui/`
| File | Verdict | Notes |
|---|---|---|
| `3DCard.tsx` | **KEEP (tune)** | Reuse tilt math for `WorkCard`, dial to ≤6°. |
| `LogoLoop.tsx` | **KEEP** | Skills marquee; pause-on-hover. |
| `timeline.tsx` | **KEEP (restyle)** | Backs Experience. |
| `TracingBeam.tsx` | **KEEP (subtle)** | Optional left beam; tone down. |
| `ScrollProgress.tsx` | **KEEP (dedupe)** | Single instance only (currently rendered twice). |
| `NumberTicker.tsx` | **KEEP (un-orphan)** | Use for About/hero stats. |
| `TextGenerateEffect.tsx` | **REPLACE** | Swap blur-in for text-mask reveal (`Reveal`/`SplitText`). |
| `FlipWords.tsx` | **REMOVE** | Jargon carousel; off-brand. |
| `MovingBorder.tsx` | **REMOVE** | Replaced by magnetic `Button`. |
| `FloatingNav.tsx` | **REDESIGN → `Nav`** | Rebuild as sticky bar w/ all sections + theme toggle + scroll-spy. |
| `FollowCursor.tsx` | **OPTIONAL** | Keep only if it reads premium in both themes; else remove. |
| `wavy-background.tsx` | **REMOVE** | Ambient noise; also used by loader (swap loader bg). |
| `Sparkles.tsx` | **REMOVE** | Only used by orphaned Header; drops `@tsparticles`. |
| `AppleCardsCarousel.tsx`, `AuroraBackground.tsx`, `BackgroundBeams.tsx`, `BackgroundGradient.tsx`, `BentoGrid.tsx`, `CardHoverEffect.tsx`, `HeroParallax.tsx`, `InfiniteMovingCards.tsx`, `Logo.tsx`, `Meteors.tsx`, `MultiStepLoader.tsx`, `Spotlight.tsx`, `tooltip.tsx`, `3d-pin.tsx` | **REMOVE** | Orphaned/unused (3d-pin only in old About terminal card, which is cut). |
| `AnimatedTooltip.tsx` | **KEEP (if used)** | Keep only if referenced by kept components (LogoLoop/Experience); else remove. |
| `loader.tsx` (`LoaderFour`) | **REDESIGN** | Keep signature draw; replace `WavyBackground` bg with plain canvas + theme-aware. |

### `src/components/demos/` + `ui/*-demo.tsx`
| — | **REMOVE ALL** | Dev scaffolding, none imported. |

### `src/lib` / hooks
| File | Verdict | Notes |
|---|---|---|
| `lib/work.ts` | **KEEP (current)** | Project grid dataset — `img: /projects/<id>.webp` (1280×640). Proprietary/academic IDs included. Legacy `lib/projects.ts` removed at page swap. |
| `lib/utils.ts` (`cn`) | **KEEP** | Used everywhere. |
| `hooks/useOutsideClick.ts` | **REMOVE** | Only for orphaned carousel. |

**Dependencies to drop** (after prune, if fully unused): `three`, `vanta`, `@tsparticles/*`, `@radix-ui/react-tooltip`, `@studio-freight/lenis` (dup of `lenis`), `motion` (unused; keep `framer-motion`).

---

## 2. New / rebuilt components

### Primitives (`src/components/ui/`)
- **`Button.tsx`** — variants `primary | ghost | link`; magnetic pull on `hover:hover` pointers; `:focus-visible` ring; sizes sm/md/lg.
- **`Reveal.tsx`** — scroll-in wrapper: fade-up + scale 0.98→1, staggered via `delay`/`index`; reduced-motion → instant. One shared primitive for every section.
- **`SplitText.tsx`** (or extend Reveal) — text-mask line/word reveal for headings.
- **`Eyebrow.tsx`** — mono micro-label (`03 / WHAT I DO`) used by all section headers.
- **`ThemeToggle.tsx`** — animated light/dark switch (clip-path wipe / View Transitions), `aria-pressed`, persisted.
- **`Chip.tsx`** — tech/skill/filter pill; states default/active/hover.
- **`SectionHeader.tsx`** — eyebrow + display title + optional lead; consistent rhythm.

### Layout / providers
- **`app/providers.tsx`** — `ThemeProvider` (class strategy; `next-themes` or lightweight custom) wrapping the app.
- **`components/Nav.tsx`** — sticky bar: wordmark, section links (scroll-spy `aria-current`), résumé, `ThemeToggle`; mobile compact.
- **`components/Footer.tsx`** — minimal footer.

### Sections (`src/components/sections/`)
`Hero.tsx · About.tsx · Services.tsx · Skills.tsx · Work.tsx · Experience.tsx (reuse) · Testimonials.tsx (reuse) · Contact.tsx` — each consumes `src/lib/content.ts`, wrapped in `Reveal`, using primitives above. `page.tsx` becomes a thin composition of these.

### Work card (`sections/Work.tsx` internal or `ui/WorkCard.tsx`)
- Props: `project: Project`. Hairline surface; thumbnail (`next/image`) with hover un-desaturate + cursor sheen + ≤6° tilt; title (display), category eyebrow, ≤4 tech `Chip`s; one action by type: repo → `GitHub ↗`, `isProprietary` → `🔒 Proprietary`, `isAcademic` → `🎓 Academic`. Fallback tile when no image.

---

## 3. Data & motion modules
- **`src/lib/content.ts`** — typed content config (hero, about, services, skills groups, socials, contact) sourced from `CONTENT.md`; components read from here (no hardcoded copy).
- **`src/lib/motion.ts`** — shared durations/easings/variants (per `DESIGN_SYSTEM.md §5`) so all animation shares one rhythm.

---

## 4. Resulting tree (target)
```
app/
  layout.tsx        (fonts, providers, SmoothScroll, Nav, ScrollProgress×1)
  providers.tsx     (ThemeProvider)
  page.tsx          (thin: <Hero/><About/><Services/>…<Contact/><Footer/>)
components/
  Nav.tsx  Footer.tsx  SmoothScroll.tsx
  sections/ Hero About Services Skills Work Experience Testimonials Contact
  ui/ Button Reveal SplitText Eyebrow ThemeToggle Chip SectionHeader
      3DCard LogoLoop timeline TracingBeam ScrollProgress NumberTicker loader
lib/ content.ts  motion.ts  work.ts  utils.ts
```
Net effect: ~20 files removed, ~12 focused files added, one coherent system.
