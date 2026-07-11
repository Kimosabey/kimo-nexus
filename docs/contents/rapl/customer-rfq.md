# RAPL — Customer RFQ → Quotation Platform

> Internal web app that digitizes Rangsons Aerospace's **customer RFQ → Quotation** process across
> 6 departments + Admin, with full traceability, revision history, gated approvals, and notifications —
> replacing an Excel-based workflow. **Designed and built by Harshan Aiyappa** (engineering + UI/UX).

*(Confidentiality: RAPL internal tool. No secrets; sample data only.)*

## The problem
The RFQ→Quotation process lived in Excel across many hands — things got lost, status was opaque, and
changes weren't auditable. Aerospace quoting needs traceability and sign-off discipline.

## What I built
A role-gated single-page app with a documented design system as the source of truth:
- **Canonical workflow:** 12 steps, 8 states, 4 approval gates, modelled explicitly.
- **7 roles:** BD · Engineering · CFT · SCM · Estimation · CEO/COO · Admin — navigation, actions, and
  screens are role-gated by a visibility matrix.
- **Traceability & revisions:** every RFQ carries its history; every change is auditable.
- **Analytics:** Apache ECharts dashboards for pipeline/status.
- **"Calm Enterprise" UI/UX:** light default + full dark, Geist type, aerospace-blueprint background —
  design documented (foundations, architecture, design-system, components, screens, responsive, handoff/PRD).

## Senior signals
- **UI/UX + front-end ownership** — a full design system (tokens, components, light/dark, responsive) authored before build, with a browsable visual guideline and hi-fi prototype.
- **Workflow/state modelling** — an explicit state machine (8 states, 4 gates) driving role-based actions.
- **Enterprise RBAC** — server-resolved roles; the client never trusts its own role.

## Architecture
```
React 18 + Vite + TS (client)  ──/api──▶  Node + Express + Mongoose (server)  ──▶  MongoDB
Tailwind v4 · shadcn/ui · Radix · TanStack Query/Table · React Hook Form · Zod · ECharts
```

## Status (honest)
**Design system + hi-fi prototype: complete.** App build **in progress** — server (Express + Mongoose +
seed) and client foundation (shell, theme, Enquiries List, Dashboard) wired to the API; remaining screens
being ported from the design specs.

## Résumé bullet
> Designed and built Rangsons Aerospace's **Customer RFQ→Quotation** platform (React 18 + Node/Express +
> MongoDB) — a 7-role, gated-approval workflow (12 steps / 8 states / 4 gates) with revision history,
> ECharts analytics, and a full light/dark "Calm Enterprise" design system, replacing an Excel process.

## Stack
React 18 · Vite · TypeScript · Tailwind v4 · shadcn/ui · Radix · Framer Motion · TanStack Query/Table ·
React Hook Form · Zod · Apache ECharts · Node.js · Express · Mongoose · MongoDB.
