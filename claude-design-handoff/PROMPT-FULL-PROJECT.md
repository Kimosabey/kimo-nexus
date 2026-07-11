# Prompt for Claude design — when the WHOLE project is uploaded/linked

> Use this version if you've uploaded or linked the entire `kimo-nexus` repo (not just the assets folder). Paste everything between the markers.

## ⬇️ COPY FROM HERE ⬇️

I've uploaded/linked my full **Next.js portfolio project `kimo-nexus`** (App Router, TypeScript, Tailwind v4, Framer Motion, Lenis). **Revamp its UI/UX end-to-end, in place**, to a **10/10, zero-flaw** production standard — strict TS, WCAG AA, mobile-first responsive, performant, and **distinct, not templated**.

**Read these in the repo first — they are the source of truth:**
`docs/design/DESIGN_SYSTEM.md`, `docs/design/DESIGN_STYLES.md`, `docs/design/UX_REVAMP.md`, `docs/design/COMPONENTS.md`, `docs/design/CONTENT.md`, and `docs/design/BUILD_BRIEF.md`. Follow them. Key direction summarized below.

### North star (aesthetic)
Build a faithful, personalized take on this Dribbble reference:
**https://dribbble.com/shots/21965863-Drake-Personal-Portfolio-Joomla-4-Template**
Dark-first, a **persistent left profile card** (logo, grayscale portrait, email + location, social icons, primary CTA) beside scrolling right content, a **right-edge vertical icon nav rail**, a **rotating "MY PROJECTS" badge**, and **section label pills**. The reference is green; **our accent is ELECTRIC LIME `#B6F400`** (light `#65A30D`) — used only for one headline word, stat numbers, the primary CTA, active nav/rail, links, small dots.

### Palette (dark primary + light variant; themeable via `.dark` on <html>)
canvas `#0E0E10`/`#F6F6F5` · surface `#1A1A1D`/`#FFFFFF` · ink `#F5F6F7`/`#0E0E10` · muted `#8E9199`/`#6B6E76` · hairline `#232327`/`#E6E6E4` · accent `#B6F400`/`#65A30D` · accent-ink `#0E1400`/`#FFFFFF`. Dual-theme toggle: persisted, OS-aware, no flash-of-wrong-theme, animated clip-path wipe (View Transitions + fallback), reduced-motion safe.

### Type & icons (self-host via next/font, no CDN)
Display = rounded geometric sans (Poppins / General Sans vibe), Body = Inter, micro-labels mono/uppercase. Icons = **Lucide** (consistent 1.5–2px stroke); circular outlined socials + rail icons. No emoji as UI icons.

### Sections (nav = scroll order; left card persistent)
Hero → About → Services/What I Do → Skills → Work (filterable grid; card = grayscale→color thumbnail + ≤6° tilt, title, category pill, ≤4 tech chips, one action: GitHub ↗ / 🔒 Proprietary / 🎓 Academic) → Experience (timeline + résumé) → Testimonials → Contact → Footer.

### Unique motion + background + micro-interactions (beyond the reference)
One cohesive, subtle background system: slow **lime-tinted radial glow** behind the hero + faint **cursor-reactive dot-grid** (parallax on scroll) + ~3% grain. Signature personal motif: an **audio-waveform/equalizer** accent (nod to my voice/speech-AI work) in the hero + as section dividers. Orchestrated page-load intro. Micro-interactions everywhere: magnetic CTA/socials, lime underline wipe on links, cursor-aware card tilt+sheen, morphing active-rail indicator, stat count-up, mask/stagger reveals, Lenis smooth scroll + slim scroll-progress. transform/opacity/clip-path only; fully `prefers-reduced-motion` safe.

### Features (build all Core; add Plus if it elevates)
Core: dual-theme toggle · mobile-first responsive 375→1920 (no h-scroll, ≥44px targets; profile card stacks on mobile, rail → hamburger) · a11y (keyboard, focus, aria, reduced-motion) · scroll-spy nav · Work filtering + proprietary/academic badges · résumé download · email CTA + copy-to-clipboard · SEO (metadata, OG/Twitter, JSON-LD Person, sitemap.xml, robots.txt) · favicon + apple-touch-icon + og-image (1200×630) · optimized images + self-hosted fonts (Lighthouse ≥95) · styled 404 · orchestrated intro. Plus (optional): contact form w/ validation, project detail modal, ⌘K palette, back-to-top, analytics.

### Content & links (from `docs/design/CONTENT.md` — use verbatim)
Harshan Aiyappa · Fullstack Software Engineer (AI & R&D) · ~4.8 yrs · 40+ platforms · 250+ mentored. GitHub `github.com/Kimosabey` · LinkedIn `linkedin.com/in/harshan-aiyappa` · X `x.com/HarshanAiyappa` · Email `harshan.aiyappa@gmail.com`.

### Assets (already in the repo)
- `public/profile.webp` — profile-card portrait (render **grayscale**, optimize to responsive sizes).
- `public/projects/<id>/thumbnail.png` — 19 project thumbnails, wired from `src/lib/projects.ts`; plus 6 in `public/projects/_proprietary/*` and `public/projects/_academic/*` (badge these, wire them in).
- `public/resume.pdf`. Generate favicon.ico, apple-touch-icon.png, og-image.png.

### Rework the existing code (don't leave the old system behind)
- Split the monolithic `src/app/page.tsx` into `src/components/sections/*` driven by a content config; keep `SmoothScroll` (Lenis), `Experience`, `Testimonials`, `timeline`, `LogoLoop`.
- **Remove** dead/orphaned files: `Header.tsx`, `ProjectCard.tsx`, `VantaWaves.tsx`, and unused UI (`AppleCardsCarousel`, `AuroraBackground`, `BackgroundBeams`, `BentoGrid`, `CardHoverEffect`, `HeroParallax`, `InfiniteMovingCards`, `Logo`, `Meteors`, `MultiStepLoader`, `Spotlight`, `tooltip`, `Sparkles`, all `demos/*` + `*-demo.tsx`), plus dead deps (`three`, `vanta`, `@tsparticles/*`, `@radix-ui/react-tooltip`, dup `@studio-freight/lenis`, unused `motion`).
- **Fixes:** GitHub link → `Kimosabey` (the current contact section 404s on `HarshanAiyappaPrabhu`); render `<ScrollProgress>` once (it's currently duplicated in layout + page); remove the hard-coded `className="dark"` in favor of the theme provider.
- Retire all cyberpunk/HUD styling, sci-fi jargon copy, cyan/teal/purple/amber accents, and the noisy background stack.

Deliver the revamped Next.js project with `npm run build` passing clean (no type/lint errors). Show me the result and iterate.

## ⬆️ COPY TO HERE ⬆️
