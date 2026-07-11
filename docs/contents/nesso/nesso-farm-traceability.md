# Nesso — Farm-to-Fork Traceability Platform (NR Group)

> An offline-first traceability ecosystem for the Indian agriculture supply chain — connecting farmers,
> field agents, operations, warehouses, logistics, and consumers with real-time data and QR-powered
> transparency. Architected by Harshan Aiyappa (continuation of the legacy FoodSign platform on a modern stack).

*(Confidentiality: NESSO · NR Group proprietary. No secrets included — the Firebase service-account key in the source repo is deliberately excluded.)*

## The problem
Horticulture / scented-flower value chains (tuberose, jasmine, marigold, rose, davana) have no reliable
link from a shelf batch back to the farmer, farm, and date. Field work happens in **low-connectivity
rural India**, in many languages — so a cloud-only, English-only app doesn't work.

## What I designed & built
A four-surface platform on a single TypeScript monorepo:
| Surface | Stack | Audience |
|---|---|---|
| **Mobile** (Android/iOS) | Expo SDK 54 · React Native · NativeWind · Zustand · TanStack Query · **SQLite + MMKV** | Field officers, agents, farmers |
| **Web dashboard** | Next.js 15 (App Router/RSC) · Tailwind · shadcn/ui · TanStack Table · Recharts · react-leaflet | Admin, ops, procurement, quality |
| **QR portal** | Next.js 15 (ISR/static) | Consumers, retailers, auditors |
| **Backend API** | **NestJS 10** (modular monolith) · MongoDB 7 · Redis 7 · BullMQ · S3 · Zod · Pino · OpenTelemetry | All clients |

Covers the full produce journey across ~19 modules: farmer onboarding, **GPS polygon farm mapping**,
crop lifecycle, activity tracking, pre-harvest, sampling/audits, procurement, GRN, batch inventory, and
**public QR traceability**.

## Senior signals
- **Offline-first architecture** — SQLite outbox + MMKV, idempotent sync that drains on reconnect; field officers work hours without network.
- **True i18n at scale** — 12 Indian/regional languages in native script across every surface, with key-parity CI checks.
- **Accessibility as a gate** — WCAG 2.2 AA (audited contrast, keyboard-reachable, reduced-motion, ≥44×44 targets) in light **and** dark.
- **RBAC + immutable audit** — 17 roles with scope filters; every admin mutation captured.
- **Monorepo discipline** — Turborepo/pnpm, shared Zod types + design-system + i18n packages, CI (lint, typecheck, unit, e2e, i18n parity, a11y, perf budgets).
- **QR privacy** — public trace page with field-level redaction; farm-to-shelf timeline target < 2s on 3G.

## Status (honest — per repo)
**Planning / foundations.** The full end-to-end build plan (architecture, DB schema of 16 collections,
17-role matrix, design system, ~99-screen inventory, 6-phase / ~12-week delivery plan) is **authored and
approved**; implementation is at Phase 0. So this is an **architecture + planning** showcase, not a
shipped product (yet).

## Metrics = design targets (not measured — don't quote as achieved)
"100K+ farmers / 1M+ records", "API p95 < 500ms", "QR LCP < 1.5s", "sync success > 99%" are **targets in
the plan**, not benchmarked results. Phrase as *"designed for"* until measured.

## Résumé bullet (safe framing)
> Architected **Nesso**, an offline-first farm-to-fork traceability platform (NestJS + Next.js 15 + Expo
> monorepo, MongoDB/Redis) with SQLite-outbox offline sync, GPS polygon farm mapping, public QR
> traceability, 12-language i18n, WCAG 2.2 AA, and 17-role RBAC — full build plan across ~99 screens and 4 surfaces.

## Stack
TypeScript · NestJS 10 · Next.js 15 · Expo/React Native · MongoDB 7 · Redis 7 · BullMQ · S3 · Zod ·
Turborepo/pnpm · react-leaflet · SQLite/MMKV · OpenTelemetry.

> Note: the resume's earlier "Nesso — Hybrid RAG (Neo4j+Postgres, health domain)" refers to a **different
> Nesso facet** (the neural-nexus knowledge engine), not this agriculture traceability platform. Keep them distinct.
