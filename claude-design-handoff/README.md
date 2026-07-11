# Claude Design Handoff — kimo-nexus revamp

A self-contained folder to hand to Claude (claude.ai) to build the portfolio revamp.

## What's inside
```
claude-design-handoff/
├─ PROMPT.md          ← paste this whole file into Claude
├─ README.md          ← you're reading it
├─ docs/              ← the design spec (source of truth)
│   ├─ DESIGN_SYSTEM.md   tokens, type, spacing, motion
│   ├─ DESIGN_STYLES.md   visual style / moodboard / do-don't
│   ├─ UX_REVAMP.md       IA + section-by-section wireframes
│   ├─ COMPONENTS.md      keep/redesign/remove + component specs
│   └─ CONTENT.md         bio, copy, canonical links
└─ assets/
    ├─ profile.webp       hero + about portrait
    ├─ resume.pdf         résumé download
    └─ projects/          25 project thumbnails (named by project id)
```

## How to use
1. In claude.ai, start a new chat (or a Project).
2. **Upload this whole folder** — drag `PROMPT.md`, the `docs/` files, and the `assets/` images into the message (or add them to the Project's knowledge).
3. Paste the contents of **`PROMPT.md`** as your message.
4. Let Claude build; iterate from there.

> Tip: if the upload is too large at once, upload `assets/profile.webp` + `PROMPT.md` + the 5 `docs/*.md` first, then add project thumbnails as needed.

## Notes
- **Primary visual reference (north star):** https://dribbble.com/shots/21965863-Drake-Personal-Portfolio-Joomla-4-Template — the revamp's look/feel/layout should be inspired by this shot. The `docs/` are the structural + content spec; the Dribbble drives the aesthetic. (`PROMPT.md` says this explicitly.)
- Canonical GitHub is **Kimosabey** (the old site linked a non-existent `HarshanAiyappaPrabhu` that 404s — do not reuse it).
- Thumbnails are `.png`-named but JPEG-encoded — fine for `next/image`.
- Target: faithful take on the reference · dual light/dark · photo-forward hero · one signature (waveform) · 10/10 accessible.
