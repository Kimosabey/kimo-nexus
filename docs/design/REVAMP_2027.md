# Kimo Nexus — 2027 Revamp ("Ember")

> Supersedes the Drake-template layout in `UX_REVAMP.md` (kept for history). Tokens and motion
> rules here override `DESIGN_SYSTEM.md` where they disagree. Copy still comes only from
> `src/lib/content.ts` / `src/lib/work.ts`. No new claims were added for the redesign.

## Why revamp

The 2025 build is clean but reads as a template: sticky profile card on the left, icon rail on the
right, hero, then the same card grid section after section. Once a reviewer has seen two Awwwards
"developer portfolio" templates, they have seen this one. What it lacks:

- **No hierarchy between sections.** Services, Skills, Work and Testimonials all use the same
  bordered card, so nothing feels more important than anything else.
- **The best feature is hidden.** A grounded AI assistant that can drive the page sits behind
  a ⌘K search icon. For a *Full-Stack AI Engineer* that should be the first thing a visitor
  touches.
- **The sidebar takes 334px of width** on every scroll position, which squeezes the work, the
  part that matters most.
- **The loader delays LCP by about 1.5s** on first visit, for a monogram, and replays it on every session.

## Persona panel

The work was split across two groups of personas: the people who **build** the page and the
people who **use** it. Each one has a brief and a veto.

### Build-side personas (reference board in brackets)

| Persona | Owns | Calls made |
|---|---|---|
| **Art director** (Awwwards, Godly, CSS Design Awards) | Identity, type, colour | Grotesk + italic serif pairing (Geist / Instrument Serif / Geist Mono). New palette, "Ember" (see Tokens). A giant outlined wordmark closes the page. |
| **Motion designer** (Codrops, Awwwards SOTD) | Signature motion, rhythm | Five signatures only: line-mask headline reveal, scroll-pinned horizontal gallery, cursor-following preview on the archive list, scroll-linked timeline fill, magnetic CTAs. Everything else is a 0.7s fade-up. A custom cursor on fine pointers only. |
| **UX / IA strategist** (Mobbin, One Page Love) | Flow, scan path, nav | Drop the sidebar. One floating "island" nav carries the monogram + scroll-progress ring, section links, Ask and the theme switch. Featured work moves up to straight after About. The 10-second scan has to answer: who, what, proof, how to contact. |
| **Layout / product designer** (BentoGrids, Land-book, Dribbble, Behance) | Section composition | About becomes a bento (statement, portrait, stats, "now", local time, résumé, education). Services become an editorial numbered index. Work splits into a featured *gallery* plus a dense *archive* table. Each section gets a distinct shape. |
| **Content strategist** | Copy, proof | No new claims. Every number and role comes from `content.ts`. Italic serif marks the one word per headline that carries meaning. |
| **Accessibility specialist** | WCAG 2.2 AA | Body contrast ≥ 4.5:1 in both themes. Every motion gated by `prefers-reduced-motion`, with marquee, pin, cursor and magnetic all off. The custom cursor never hides the system cursor for keyboard or touch users. Marquee duplicates are `aria-hidden`. Focus rings stay visible. Skip link kept. |
| **Performance engineer** | Core Web Vitals | Loader rebuilt as a short first-visit intro: about 1.6s, once per session, skippable, and it never paints on repeat visits, under reduced motion or with JS off. The page renders underneath it. Dot-grid canvas removed (main-thread rAF on every scroll) in favour of CSS gradients + grain. Animate transform/opacity/clip-path only. No WebGL, no new runtime deps. |

### User-side personas (who the page must convince)

| Persona | Arrives from | Needs in < 30s | Where the page answers it |
|---|---|---|---|
| **Hiring manager, AI/platform team** | LinkedIn / referral, desktop | Seniority, AI-in-production proof, current role | Hero line + stats, Ask bar ("Is he a fit for a senior AI role?"), featured gallery |
| **Staff engineer / interviewer** | Résumé link | Depth: repos, architecture, real stacks | Archive table (stack per row, GitHub link), project modal |
| **Recruiter** | Search / ATS | Title, location, availability, résumé | Hero meta row (role · location · live local time · availability), résumé in nav + bento |
| **Founder / client** | Referral, mobile | Can he ship end to end? How to reach him | Services index, peers marquee, contact close |
| **Peer engineer on mobile** | X / GitHub profile | Fast load, readable, no jank | No loader, no pinning on touch, single column, 44px targets |

## Information architecture

```
Island nav (fixed, centred): [HA ◔progress] Work · About · Experience · Contact   [✦ Ask ⌘K] [◐]
  01 Hero        — meta row · headline · lead · Ask bar · CTAs · portrait card · stats
     Marquee     — stack ticker (full-bleed)
  02 About       — bento grid
  03 Work        — featured gallery (pinned horizontal on desktop) + filterable archive table
  04 Services    — numbered editorial index
  05 Stack       — grouped skills
  06 Experience  — sticky title + scroll-filled timeline
  07 Peers       — two-row testimonial marquee
  08 Contact     — giant CTA + form
     Footer      — outlined wordmark, local time, socials, back to top
```

Work moves ahead of Services because the user personas came for proof, not a service menu.

## Tokens

### Colour: "Ember"

Picked for this person specifically. Voice and real-time AI is the strongest proven work,
and ember orange is the on-air light, the colour that means "live signal". It also breaks
from the blue, purple and neon-green that nearly every AI-engineer portfolio uses (the old
lime included). The neutrals are warm, paper in light mode and off-white ink in dark mode, so
the page reads editorial and human rather than terminal-cold.

| Token | Light | Dark | Contrast vs canvas (light / dark) |
|---|---|---|---|
| canvas | `#f4f1ea` | `#0b0b0d` | — |
| surface | `#fffdf8` | `#141417` | — |
| ink | `#141210` | `#f2efe9` | 16.6 / 17.1 |
| ink-2 | `#3a3631` | `#c8c4bc` | 10.6 / 11.3 |
| muted | `#67625a` | `#8f8b84` | 5.4 / 5.8 |
| accent (ember) | `#c2410c` | `#ff5a1f` (P3 `1 .38 .13`) | 4.6 / 6.3 |
| accent-ink on accent | `#ffffff` | `#160700` | 5.2 / 6.3 |
| danger | `#c5262e` | `#ff6b6b` | 5.0 / 7.1 |

The accent marks the italic word, links, focus, the primary CTA and live dots. The hero glow
pairs ember with a faint violet so the dark canvas has depth without a second UI colour.

### Type, shape, glass

- **Type:** Geist (display + body), Instrument Serif italic (one accent word per headline),
  Geist Mono (labels). Hero `clamp(3rem, min(7.4vw, 13vh), 8.2rem)`, section `clamp(2.2rem, 5.2vw, 4.6rem)`.
- **Shape:** 28px panel radius and 999px pills. Surfaces use a 1px hairline plus an inner
  highlight in place of a drop shadow.
- **Glass:** only the island nav, the Ask bar and the hero chip use `backdrop-filter`.
- **Mobile-first:** base styles are single-column phone layouts, and `min-width` breakpoints
  add tablet (720/900) and desktop (1024/1100). Pinning, the cursor and hover previews switch
  on only for `(min-width:1024px) and (hover:hover) and (pointer:fine)`.

### States
- **Intro, "Tuning in":** an ember oscilloscope trace settles from noise into a clean sine
  while a 000→100 counter runs and the name rises. Then the panel lifts and the hero headline reveals.
- **Skeletons:** image wells shimmer until the image paints (with a bounded iteration count),
  and the Ask answer shows skeleton lines until the first token.

## Motion system

| Signature | Where | Reduced-motion fallback |
|---|---|---|
| Line-mask reveal | Hero + section headings | Text shown at rest |
| Pinned horizontal gallery | Featured work, ≥ 1024px + fine pointer | Native horizontal snap strip |
| Cursor-follow preview | Archive rows, fine pointer | None (rows are self-sufficient) |
| Scroll-filled timeline | Experience | Line drawn fully |
| Magnetic CTAs + custom cursor | Buttons, cards | Off |
| Marquees | Stack ticker, peers | Static wrap / grid |

Easing `cubic-bezier(.22,1,.36,1)` for enter. Stagger 60–90ms. Only `transform`, `opacity` and
`clip-path` are animated.

## Acceptance checks

- `npm run lint` and `npm run build` pass.
- No horizontal overflow at 390px and 1440px, in either theme.
- No console errors. The Ask flow still works from the hero bar (it opens the palette in Ask
  mode with the question asked).
- Reduced-motion: no pinning, no marquee movement, no custom cursor, no intro.
- Content: every figure traces to `profile/resume.pdf`; every project card matches its repo's
  code (audit 2026-11-24). Years of experience are computed from 2021-02-01 at build time,
  floored to the half-year.
- E2E suite (43 checks: nav, palette, Ask, archive, gallery, modal, theme, form, mobile,
  reduced motion, axe WCAG 2.2 AA in both themes): all pass.
