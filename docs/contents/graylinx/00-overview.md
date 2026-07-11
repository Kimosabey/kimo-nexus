# Graylinx — Industrial IoT & On-Prem AI (Portfolio Reference)

> **Role:** Platform Architect / Full-Stack + AI Engineer · **Org:** Graylinx
> **Focus:** Industrial IoT operations, on-premise agentic AI, real-time telemetry, HVAC analytics.
> Source of this writeup: `D:\Harshan\graylinx-things` (OMNYX + THERMYNX are the flagships).

> ⚠️ **Confidentiality.** OMNYX and THERMYNX are Graylinx products running at a real customer facility.
> **Client names have been generalized** here (e.g. "a manufacturing facility") and all secrets — server
> IPs, Tailscale addresses, ports, DB credentials, `.env`, SQL dumps — are **excluded**, so this is
> public-safe. Confirm architecture depth with Graylinx before publishing if in doubt.

---

## What I did at Graylinx (one paragraph)
I designed and built Graylinx's **v2 platform** — an on-premise, air-gapped IoT operations platform
(**OMNYX**) and its shipping HVAC vertical (**THERMYNX**). The work spans the full stack and the full
data path: edge ingestion from **BACnet** field controllers → **Kafka** streaming → a **dual-database**
core (PostgreSQL 16 for app/source data + **TimescaleDB** for time-series telemetry) → analytics
(efficiency, anomaly, forecast) → a **Digital-Twin FDD** + **Reinforcement-Learning** optimization layer
→ an **agentic AI** framework (Planner / Executor / Validator) running entirely on a **local LLM**
(Ollama / vLLM) with **RAG** — no cloud, no data egress. React front-ends (SPA + tablet kiosk), Keycloak
auth, and a Prometheus/Grafana observability stack round it out.

## Senior signals (what this proves)
- **On-prem / air-gapped agentic AI** — local LLM (Ollama/vLLM) tool-calling agents, zero data egress. Rare, high-value skill.
- **Real-time data engineering at scale** — BACnet → Kafka → TimescaleDB, with edge + scheduled **data-quality tiers**.
- **Dual-database architecture** — separating transactional/app state (PG16) from high-volume telemetry (TimescaleDB hypertables + continuous aggregates + compression).
- **Applied ML for industry** — Digital-Twin Fault Detection & Diagnostics (FDD), Remaining-Useful-Life (RUL), RL efficiency optimization (shadow → live).
- **RAG over technical documents** — pgvector, PDF ingestion, cited answers.
- **Full lifecycle ownership** — architecture → services → UI → infra (Docker, Keycloak, Prometheus, Grafana) → stress testing → on-site deployment.

## Tech stack
| Layer | Tech |
|---|---|
| Edge / ingest | BACnet readers, Kafka producers, data-quality Tier-1 |
| Streaming | Apache Kafka (topics, schemas, WebSocket bridge) |
| Data | PostgreSQL 16 (app/source), **TimescaleDB** (telemetry hypertables, continuous aggregates, compression) |
| Backend | **FastAPI** (THERMYNX), **Fastify/Node** (OMNYX api-service), Python (ETL, brokers), APScheduler, Alembic |
| AI | Local LLM via **Ollama / vLLM** (e.g. `qwen2.5:14b`), tool-calling agents, **pgvector** RAG, Digital-Twin FDD, RL |
| Frontend | React 18 (Vite SPA + tablet kiosk), glassmorphism design system, SSE streaming |
| Auth / infra | Keycloak (incl. agent authorization), Docker Compose, Prometheus + Grafana + Alloy |
| Quality | GitHub Actions CI, pytest/smoke tests, ruff |

## Flagship case studies
- **[OMNYX — Universal IoT Operations Platform](./omnyx.md)** — the domain-agnostic on-prem core (8 modules, digital twin, RL, agentic AI).
- **[THERMYNX — AI HVAC Operations Intelligence](./thermynx.md)** — the shipping HVAC vertical: chiller telemetry → explainable, agentic insight.

## Supporting work in `graylinx-things` (breadth, not case-studied here)
Kafka telemetry evaluation & **stress testing to ~100× scale (≈1,100 DDCs)** *(per internal test
reports — re-verify the exact figure before quoting)* · **gl-pulse** platform design set (architecture,
ML-anomaly, API contract, RBAC, on-prem plan) · **gl-dwh** data-warehouse design (DDL, schema) ·
**python-etl** metadata-driven analytics ETL · edge-node configuration (Raspberry Pi / field
controllers) · hardware-suitability evaluations for multiple deployment sites (a national medical
institute, an airport, manufacturing plants). See **[supporting work](./03-supporting-work.md)**.
