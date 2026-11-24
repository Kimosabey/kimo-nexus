# Kimo Nexus — Harshan Aiyappa's portfolio

Full-Stack AI Engineer portfolio with a grounded in-page assistant (⌘K → Ask) that answers
only from the site's own data and can drive the page: filter the work archive, open a
project, jump to a section.

Live: [kimo-nexus.vercel.app](https://kimo-nexus.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 3. Build for Production
```bash
npm run build
```

---

## ✨ Design system: "Ember" (2027 revamp)

Full rationale, personas and tokens are in [`docs/design/REVAMP_2027.md`](docs/design/REVAMP_2027.md).

- **Colour:** one signal colour, ember orange (the "on-air" light of voice AI), on warm
  near-black or warm paper. Every text pair is ≥ 4.5:1 in both themes, with a P3 boost on
  wide-gamut screens.
- **Type:** Geist (display + UI), Instrument Serif italic (one accent word per headline),
  Geist Mono (labels).
- **Layout:** mobile-first. A floating island nav, a bento About, a scroll-pinned featured
  gallery, a filterable archive index and a scroll-filled experience timeline.
- **Motion:** line-mask reveals, pinned horizontal gallery, cursor-follow previews, a context
  cursor, magnetic CTAs, marquees, a View Transitions theme wipe and a "Tuning in" first-visit
  intro. Every motion has a static fallback under `prefers-reduced-motion`.

---

## 🗂️ Repo layout

| Path | What |
|---|---|
| `src/app` | App Router: layout, global styles (design tokens), `api/ask` (assistant), `api/contact` |
| `src/components` | Shell (`IslandNav`, `IntroLoader`, `Cursor`, `SignalThread`), `sections/*`, `ui/*` primitives, `assistant/*` |
| `src/lib` | `content.ts` and `work.ts` (the only copy and data sources), `assistant/*`, `repoLanguages.json` |
| `scripts` | Asset and data scripts (see `scripts/README.md`) |
| `docs` | Design system, résumé source, archive (see `docs/README.md`) |
| `public` | Portrait, résumé PDF, share image, icons, project art |

## 🏗️ Architecture

- `src/app`: App Router pages and layouts.
- `src/components`: shell (`IslandNav`, `IntroLoader`, `Cursor`), `sections/*` and `ui/*` primitives.
- `src/lib/content.ts` / `work.ts`: the only source of copy and project data (the assistant reads these too).
- `src/lib/assistant`: grounded Ask (local answers with no key, OpenRouter model when configured).

---

## 🔧 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 | App Router, static page + API routes (`/api/ask`, `/api/contact`) |
| **Styling** | Tailwind CSS v4 | High-performance utility CSS |
| **Motion** | Framer Motion | Complex enter/exit animations |
| **Scroll** | Lenis | Smooth scrolling normalization |
| **Icons** | Lucide React | Clean, consistent SVG icons |

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details

---

## 👤 Author

**Harshan Aiyappa**  
Senior Full-Stack Engineer  
📧 [GitHub](https://github.com/Kimosabey)

---


