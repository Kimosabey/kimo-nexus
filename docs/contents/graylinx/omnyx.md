# OMNYX — Universal IoT Operations Platform (Graylinx v2)

> Real-time monitoring, predictive maintenance, and intelligent automation across industrial domains —
> running **on customer premises with no data leaving the network perimeter**. Designed and architected
> by Harshan Aiyappa as Graylinx Version 2.

*(Confidentiality: Graylinx product. Client names generalized and all credentials/IPs/dumps excluded — public-safe.)*

## The problem
Industrial sites (manufacturing, healthcare, infrastructure) need real-time equipment monitoring,
predictive maintenance and automation — but often **cannot send operational data to the cloud** (policy,
air-gap, latency, sovereignty). The legacy Graylinx stack was point-built per site and hard to extend.

## What OMNYX is
A **domain-agnostic**, on-prem IoT operations platform: eight reusable modules, a Digital-Twin FDD
engine, Reinforcement-Learning optimization, and an **Agentic AI framework** (Planner / Executor /
Validator) on a **local LLM** — all on a Kafka + dual-PostgreSQL core. HVAC is the first shipping
vertical (**THERMYNX**); the same core serves other domains without rewrites.

## Architecture (end-to-end)
```
[BACnet field controllers]
      → dal-bacnet (edge reader + DQ Tier-1 + Kafka producer)
      → Kafka (telemetry topics)
          → db-writer     → TimescaleDB (telemetry hypertables)
          → ws-bridge     → WebSocket live plant snapshot → React UI
      → api-service (Fastify REST, dual DB pool: PG16 + TimescaleDB)
      → dq-etl (Tier-2 scheduled quality jobs, Python + APScheduler)
      → twin-broker (Digital-Twin FDD + Remaining-Useful-Life)
      → rl-broker (RL agents; shadow → live)
      → agentic-ai (Planner/Executor/Validator on local LLM — Ollama/vLLM)
```
- **Dual-database by design:** PostgreSQL 16 holds `source.*`, `app.*`, `audit.*`, `embeddings.*`;
  **TimescaleDB** holds telemetry as hypertables with continuous aggregates + compression.
- **Data quality in tiers:** Tier-1 at the edge (in the BACnet reader), Tier-2 as scheduled ETL, with a
  feedback loop back to the data-access layer.
- **On-prem AI:** all reasoning runs on a local LLM server — **no cloud, no data egress, air-gap compatible.**

## Services I built (the module map)
| Service | Responsibility |
|---|---|
| `dal-bacnet` | Edge BACnet reader → data-quality Tier-1 → Kafka producer |
| `dal-replay` | Replays historical `source.ibms_readings` into Kafka (backfill / demo) |
| `api-service` | Fastify REST API over a dual DB pool (PG16 + TimescaleDB) |
| `ws-bridge` | Kafka → WebSocket live plant snapshot |
| `db-writer` | Kafka → TimescaleDB (telemetry only) |
| `dq-etl` | Tier-2 scheduled data-quality jobs (Python + APScheduler) |
| `twin-broker` | Digital-Twin FDD + RUL engine |
| `rl-broker` | RL agent registry with shadow/live modes |
| `agentic-ai` | Planner / Executor / Validator agents on a local LLM |
| `frontend` | React 18 SPA + tablet kiosk views |

**Infra I stood up:** Kafka topic init, PG + TimescaleDB migrations, **Keycloak** (realm + an agent
authorization model), **Prometheus + Alloy** log pipeline, and **Grafana** dashboards (data-quality,
Kafka, latency, twin/RL/agents), all via Docker Compose for a one-command on-prem POC.

## Senior signals
- Designed a **domain-agnostic platform** from a set of one-off site builds (reuse over rewrite).
- **Agentic AI with authorization** — agents act through Keycloak-modeled permissions, not raw access.
- **Streaming + time-series at the core**, with explicit **data-governance tiers**.
- **Shadow-mode ML rollout** (RL agents validated before they touch live setpoints) — a safety-first pattern.

## Status (as of the repo, June 2026)
Gate 1 (stack, Kafka, dual-DB, BACnet→TimescaleDB live) ✅ · Gate 2 (DQ Tier-1, alerts, alert UI,
Keycloak) ✅ · Gates 3a–4 (work orders, twin-broker, rl-broker, agentic-ai, Tier-2 DQ, full test pass +
demo) 🔲 in progress.

## Metrics to make defensible before quoting
Any "N controllers / X points / Y latency / Z% efficiency gain" should cite an internal benchmark or
stress-test report before it goes on the résumé — otherwise phrase as *"designed for"* (see the
`kimo-benchmark` skill). Known internal figure to re-verify: Kafka stress-tested toward **~1,100 DDCs (100× scale)**.

## Stack
Kafka · PostgreSQL 16 · TimescaleDB · Fastify/Node · Python (APScheduler, brokers) · Ollama/vLLM local
LLM · React 18 · Keycloak · Prometheus/Grafana/Alloy · Docker Compose · BACnet.
