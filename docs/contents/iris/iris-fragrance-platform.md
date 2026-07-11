# IRIS — B2B Connected Fragrance-Diffuser Platform (IoT)

> IRIS is a **B2B IoT platform** that manages a fleet of **Bluetooth (BLE) fragrance diffusers** and the
> multi-tier sales force that sells, installs, and refills them. Business loop: **onboard a client →
> commission a device → it atomises scent on a schedule → predict when it runs dry → dispatch a refill →
> repeat.** I supported it across **system design, app development, device / fragrance-IoT (BLE)
> integration, and UI/UX** — and authored its v1→v2 architecture analysis.

*(Confidentiality: IRIS product. Proprietary BLE firmware specifics — exact UUIDs / handshake PINs / manufacturer code — are deliberately generalized here. No secrets included.)*

## What IRIS is
Physical diffusers (wall-mount, tower, table-top) are installed at customer premises; each atomises
scented oil on a programmable **schedule** at a configurable **intensity ("grade")**. Oil depletes over
time, so the field team must refill before it runs dry. IRIS digitises that whole operation:

1. **Onboard** clients + hardware (KYC + approval workflow).
2. **Control** devices in the field over **BLE** (set schedule/intensity, read oil level/battery).
3. **Predict** consumption so refills are dispatched *before* a device runs dry.
4. **Coordinate** a 5-tier sales force (tickets, field visits, scoreboards, immutable audit trail).
5. **Report** fleet health + team performance up the management chain.

**The 5-level hierarchy** (data scoped to your subtree; notifications fan *up*; scoreboards rank
subordinates): NSM → RSM → ASM → BDE → Customer, plus a global backend-ops team.

## My role
- **System design** — audited the v1 platform, catalogued 14 architecture flaws/gaps, and designed the **v2 target architecture + migration roadmap** (below).
- **App development** — the companion app + admin surfaces.
- **Device / fragrance-IoT** — BLE integration across **3 protocol generations** (V2 / V3 / gateway) with rename-proof, firmware-burned device identity (a careless rename must never downgrade a device's protocol).
- **UI/UX** — product visual language + the investor-demo experience.

## The three apps + backend
| App | Stack | Role |
|---|---|---|
| **Backend** | Express 5 · Socket.IO 4 · Mongoose 9 · MongoDB Atlas · Azure Blob · Expo Push | API + real-time + crons + business math |
| **Admin web** | React 19 · Vite · Tailwind 4 · Redux Toolkit + React Query · i18next (6 langs) | Back-office (NSM/RSM/ops) |
| **Mobile** | Expo SDK 54 · React Native · expo-router · react-native-ble-plx | Field tool — **the only surface that talks to the hardware over BLE** |
| **Presentation** | Vanilla HTML/CSS/JS · GSAP + Lenis · Netlify | Investor/demo marketing site |

## The refill economy (the clever core)
A **consumption ledger** computes oil level and next-fill date without re-reading history: a `FillEvent`
anchors "filled to X ml at time T", `ConsumptionSegment`s record each constant grade+schedule period, and
services walk the segments to project dry-out with a **10% safety buffer**; a cron notifies the chain as
thresholds approach. The mobile app carries a **client-side mirror of the exact same math** so a BDE can
compute level/timing **offline at the device**.

## The v2 architecture I designed (the senior signal)
v1 was pilot-grade (single-instance in-memory Socket.IO + in-process crons + telemetry on the request
path). I designed a **stateless, horizontally-scalable** target that keeps the good bones (the ledger,
hierarchy model, audit-first discipline) and fixes the platform:
- **Redis-backed Socket.IO** (`@socket.io/redis-adapter`) → real-time works across N replicas (emit-to-hierarchy is instance-agnostic).
- **BullMQ worker tier** → crons become single-scheduler queue jobs (no double-firing; retries/backpressure).
- **Telemetry pipeline** → devices/gateway publish via **MQTT / Azure Event Hub** → batch ingester → **time-series store**, off the interactive path.
- **Edge gateway** (Azure Front Door + WAF, TLS, rate-limit, sticky WS) · **Azure Key Vault** secrets · **OpenTelemetry** observability · **CI/CD** (GitHub Actions, gated) · **migrate-mongo** · **API versioning** · **DR** (Atlas PITR + tested runbook).
- **Offline-first sync** — WatermelonDB/SQLite queue, `NetInfo`-driven background sync, client-generated `syncId` idempotency, Last-Write-Wins on BLE timestamps.

Net effect (per my scorecard): platform readiness **5.6/10 (pilot) → 9.2/10 (enterprise)**, resolving all 14 flaws — no business-logic rewrite required.

## Senior signals
- **Full-lifecycle IoT system design** — from BLE hardware protocols to a scalable cloud target and a phased migration, grounded in a flaw analysis.
- **Real-time at scale** — the Redis/Socket.IO + queue + telemetry redesign is textbook horizontal-scaling.
- **Offline-first field software** — client/server math parity + idempotent sync for basements with no signal.
- **Cross-disciplinary** — device ↔ app ↔ cloud ↔ UI/UX.

## Status (honest)
**v1 platform: in production/pilot** (the three apps + backend are real; I contributed app-dev, BLE/device
integration, and UI/UX). **v2 architecture: designed by me (proposed roadmap)**, not yet built. **The
investor-demo presentation site is built and deployable.** The readiness scores are my assessment, not a
third-party benchmark.

## Résumé bullet
> Supported **IRIS**, a B2B BLE fragrance-diffuser fleet-ops platform (React 19 admin + Expo/RN field app
> speaking to hardware over Bluetooth + Express/Socket.IO/MongoDB on Azure) — contributed to app
> development, **multi-generation BLE device integration**, and UI/UX; authored the **v1→v2 system-design**
> (stateless Redis-Socket.IO, BullMQ workers, MQTT→time-series telemetry, offline-first sync) taking
> platform readiness from pilot to enterprise-grade, plus its GSAP/Lenis investor-demo site.

## Stack
Express 5 · Socket.IO 4 · Mongoose 9 · MongoDB Atlas · Azure (Blob, Front Door, Event Hub, Key Vault,
Cache for Redis) · React 19 · Vite · Tailwind 4 · Redux Toolkit · React Query · i18next · Expo SDK 54 ·
React Native · react-native-ble-plx · BullMQ · MQTT · OpenTelemetry · WatermelonDB/SQLite · GSAP · Lenis · Netlify.
