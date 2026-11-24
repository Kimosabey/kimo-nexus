# Kimo Nexus — UX Revamp Spec (section-by-section)

> Redesign spec for every section, Drake-inspired editorial layout. Read alongside `DESIGN_SYSTEM.md` (tokens/motion) and `CONTENT.md` (copy/links). ASCII wireframes are desktop unless noted.

> **Layout override (matches the actual Drake reference):** desktop uses a **persistent left profile card** (logo, grayscale portrait, email + location, social icons, primary CTA) beside the **scrolling right content**, plus a **vertical icon nav rail** on the right edge, **section label pills**, and a **rotating "MY PROJECTS" badge** scroll cue. On mobile the profile card stacks on top. Treat the individual section wireframes below as the content of the right column.

---

## Information architecture
Single-page scroll. Nav order = scroll order:

```
Nav (sticky, theme toggle)
  → 01 Hero
  → 02 About
  → 03 Services / What I Do
  → 04 Skills & Tech
  → 05 Work / Projects   (filterable)
  → 06 Experience        (timeline + résumé)
  → 07 Testimonials
  → 08 Contact / CTA
  → Footer
```

Nav links reconciled to ALL sections (today only Home/About/Projects/Contact exist while `#experience`/`#testimonials`/`#research` are unlinked). Retire the "Research" section (fold its ideas into About/Services) unless the user wants it kept.

**Global chrome:** slim scroll-progress bar (single instance), Lenis smooth scroll, one masked hero grid texture, `Reveal` stagger on every section. No wavy canvas / aurora / mouse-spotlight / grain-over-all.

---

## 01 · Hero — photo-forward, full-bleed
Big name + role, one CTA, socials, and the portrait as the dominant device.

```
┌───────────────────────────────────────────────────────────────┐
│ ● available for work                          [socials ↗]      │
│                                                                 │
│  HARSHAN AIYAPPA                    ┌───────────────────────┐   │
│  ───────────────                    │                       │   │
│  Fullstack Software Engineer        │   full-bleed graded   │   │
│  AI · R&D · Distributed Systems     │   PORTRAIT            │   │
│                                     │   (profile.webp)      │   │
│  Short 1–2 line positioning.        │                       │   │
│                                     │                       │   │
│  [ View Work → ]  [ Résumé ]        └───────────────────────┘   │
│                                                                 │
│  ~5 yrs · 40+ platforms · 250+ mentored     (scroll ⌄)          │
└───────────────────────────────────────────────────────────────┘
```
- **Layout:** 2-col on `lg` (text left, portrait right); stacked on mobile (portrait first, reduced height). Portrait is full-bleed within its panel with a theme-aware grade + soft edge mask (evolve the current radial mask, remove cyan glows).
- **Type:** name in Space Grotesk `clamp(3rem,9vw,8rem)`; role/eyebrow in mono micro-label.
- **Motion:** text-mask line reveal on load; portrait scroll-parallax + subtle scale-in; magnetic primary CTA; stat row counts up once.
- **Retire:** "ARCHITECTING / DIGITAL MINDS" HUD headline, FlipWords jargon carousel, MovingBorder button → replace with clean name + honest role + magnetic CTA.

---

## 02 · About — portrait + story + stats
```
┌───────────────────────────────────────────────────────────────┐
│ 02 / ABOUT                                                      │
│ ┌───────────────┐   Big editorial statement headline.          │
│ │  secondary    │                                               │
│ │  portrait     │   2–3 short paragraphs (de-jargonized bio).   │
│ │  (reuse photo)│                                               │
│ └───────────────┘   ┌────────┐ ┌────────┐ ┌────────┐           │
│                     │ 4.8 yrs│ │ 40+    │ │ 250+   │  stats     │
│                     └────────┘ └────────┘ └────────┘           │
└───────────────────────────────────────────────────────────────┘
```
- Reuses the photo (second appearance) as an editorial portrait.
- Stats become clean tiles (reuse `NumberTicker` count-up, un-orphaned).
- Copy rewritten to be human (see `CONTENT.md`) — drop "siphoning intelligence / neural fabrics."

---

## 03 · Services / What I Do — offering cards
```
┌───────────────────────────────────────────────────────────────┐
│ 03 / WHAT I DO                                                  │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │ ⌘ AI & Agents │ │ ⚙ Distributed │ │ ◈ Full-Stack  │          │
│ │ LangGraph,    │ │ Systems       │ │ Product       │          │
│ │ RAG, voice    │ │ Kafka, gRPC…  │ │ React/Next…   │          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
│ ┌───────────────┐  (2×2 or 3-up grid, Lucide icons)             │
│ │ 🛈 Infra/Cloud │                                              │
│ └───────────────┘                                              │
└───────────────────────────────────────────────────────────────┘
```
- 3–4 offering cards derived from real skill clusters. Hairline cards, hover lift + accent hairline, icon micro-motion. Data in `content.ts`.

---

## 04 · Skills & Tech — grid + marquee
```
┌───────────────────────────────────────────────────────────────┐
│ 04 / STACK                                                      │
│  Frontend · Backend · AI/ML · Data · DevOps  (grouped chips)    │
│  ───────────────────────────────────────────                   │
│  «  React  Next  TS  Node  Python  Docker  AWS  … »  (marquee)  │
└───────────────────────────────────────────────────────────────┘
```
- Grouped skill chips (from `CONTENT.md`) + the existing `LogoLoop` marquee (pause-on-hover). One accent on active/hover.

---

## 05 · Work / Projects — filterable editorial grid
```
┌───────────────────────────────────────────────────────────────┐
│ 05 / SELECTED WORK        [All][AI][Distributed][Infra][…]      │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │ [thumbnail]   │ │ [thumbnail]   │ │ [thumbnail]   │          │
│ │ Nexus Swarm   │ │ VoxAgent      │ │ LiveNexus AI  │          │
│ │ AI / Agents   │ │ Transcription │ │ Hybrid AI     │          │
│ │ tech · tech   │ │ tech · tech   │ │ tech · tech   │          │
│ │ GitHub ↗      │ │ GitHub ↗      │ │ 🔒 Proprietary│          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
└───────────────────────────────────────────────────────────────┘
```
- **Card redesign:** calmer than the current HUD 3D card — hairline card, thumbnail with hover un-desaturate + cursor sheen, title (Space Grotesk), category eyebrow, ≤4 tech chips, one action (GitHub ↗ / 🔒 Proprietary / 🎓 Academic).
- **Filter** by normalized category group (map the 20 ad-hoc categories → ~6 groups: AI/Agents, Voice/Audio, Distributed, Infra/Security, Data, Web/Product). Featured projects first.
- **Wire the 6 proprietary/academic projects** — already in `src/lib/work.ts`; grid images at `/projects/<id>.webp` (1280×640 WebP from `_proprietary/` / `_academic/` PNG sources). See [`IMAGE_ASSET_GUIDE.md`](../../../kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md) §8–§9.
- Optional desktop **pinned horizontal gallery** for featured items.

---

## 06 · Experience — timeline + résumé
- Reuse `Experience.tsx` + `ui/timeline.tsx`, restyled to new tokens (hairlines, accent node dots, mono dates). Prominent **Résumé ↓** button (`/resume.pdf`). Company · role · dates · 2–3 bullets each.

---

## 07 · Testimonials — peer recommendations
- Reuse `Testimonials.tsx`, restyled: quote cards on hairline surfaces, name + role + avatar/initial. Optional gentle marquee or 2-col masonry. Keep real names/quotes.

---

## 08 · Contact / CTA — clear close
```
┌───────────────────────────────────────────────────────────────┐
│               Let's build something.                            │
│               [ harshan.aiyappa@gmail.com → ]                   │
│   GitHub ↗   LinkedIn ↗   X ↗            (magnetic icons)        │
└───────────────────────────────────────────────────────────────┘
```
- Big invitation headline + email CTA (mailto/gmail compose) + reconciled social links (magnetic). Drop the HUD "Nodes_Active / System_Runtime" filler.

## Footer
- Minimal: name · role · © 2026 · built-with note · back-to-top. Reconciled links only.

---

## Responsive rules
- Breakpoints 375 / 768 / 1024 / 1440 (+ existing `xs:480`, `3xl:1920`).
- Mobile: single column; hero portrait first at reduced height; nav collapses to a compact bar + toggle; filters scroll horizontally; no pinned gallery (falls back to vertical grid).
- No horizontal overflow; tap targets ≥ 44px; `min-h-dvh` not `100vh`.

## Nav & theme toggle
- Sticky slim bar: wordmark left, section links center/right, **theme toggle** + résumé right. Active section highlighted (scroll-spy). Reuse/replace `FloatingNav`; ensure keyboard nav + `aria-current`.
- Theme toggle: animated (circular clip-path wipe / View Transitions), persisted, OS-aware default.
