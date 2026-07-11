# RAPL — IT Helpdesk & Ticketing System

> Digitizes Rangsons Aerospace's internal IT call-log / recertification register into a role-based web
> helpdesk. **Designed and scaffolded by Harshan Aiyappa** (engineering + UI/UX) — turning a Word-form
> spec into a buildable engineering package: docs → HTML design + prototype → React FE + Node/Express BE.

*(Confidentiality: RAPL internal tool; the internal form code is generalized here. No secrets included.)*

## The problem
IT support was tracked on a paper/Word call-log form — no SLA visibility, no ticket board, no role
separation between requesters and IT staff.

## What I built
- **A "Support Console" UI/UX** — command bar + collapsible icon rail, **kanban ticket board**, and an
  **SLA traffic-light** — its own layout on the shared RAPL brand (indigo/red, Geist, light + dark).
- **Roles:** User · IT Staff · IT Admin, each with a gated experience.
- **A complete engineering package:** full docs set (spec + FE/BE/Mongo build guides), a self-contained
  `design-guidelines.html` showcase, an interactive HTML/JS **prototype** (mock data, full flow), and
  React (Vite/TS/Tailwind v4) + Node/Express/Mongoose scaffolds (auth + tickets).
- **Handoff discipline:** a 100%-coverage checklist mapped to the source spec + a continuation prompt for the next engineer.

## Senior signals
- **Spec → shippable package** — converted an ambiguous Word form into a documented, prototyped, scaffolded system.
- **UI/UX ownership** — a purpose-built support-console interaction model (command bar, kanban, SLA lights), not a generic CRUD table.
- **Brand consistency** — reused the RAPL design language while giving the tool its own identity.

## Status (honest)
**Docs + design-guidelines + interactive prototype: complete.** React FE and Node/Express+Mongo BE are
**scaffolds** (shell + Login/Dashboard + auth/tickets) — remaining screens to be ported from the specs.

## Résumé bullet
> Designed and scaffolded Rangsons Aerospace's **IT Helpdesk** — a role-based ticketing system (React +
> Node/Express + MongoDB) with a bespoke "Support Console" UX (command bar, kanban board, SLA
> traffic-light), converting a paper call-log form into a fully documented, prototyped engineering package.

## Stack
React 18 · Vite · TypeScript · Tailwind v4 · Node.js · Express · Mongoose · MongoDB · JWT.
