# THERMYNX — AI HVAC Operations Intelligence (Graylinx)

> AI-powered HVAC analytics that turns raw chiller telemetry into **explainable, actionable
> intelligence** via a **locally-hosted LLM**. The shipping HVAC vertical of OMNYX, deployed at a
> large manufacturing facility.

*(Confidentiality: Graylinx product on a live customer site. Client name generalized; excludes the Tailscale IPs, ports, DB passwords, and data dictionaries in the source repo.)*

## The problem
A plant runs multiple chillers emitting thousands of telemetry points. Operators get raw numbers, not
answers: *why* is Chiller 1 inefficient today, *what* is anomalous, *what* will it cost. THERMYNX makes
the data explain itself — in plain language, with the reasoning shown — **without sending plant data to
the cloud.**

## What I built
A full-stack analytics + agentic-AI app over the live chiller data:
- **FastAPI** backend (versioned `api/v1`, a pure-logic `domain/` layer, `analytics/`, `db/`, an Ollama
  streaming `llm/` client, and versioned HVAC `prompts/`).
- **React (Vite)** front-end with a glassmorphism design system (`GlassCard`, `KpiCard`, `StatusPulse`)
  and **SSE streaming** so LLM answers render token-by-token.
- **Local LLM** (Ollama, `qwen2.5:14b`) — reads chiller data (read-only), never egresses it.
- **pgvector RAG** over equipment PDFs with citations.

## Feature surface (page by page)
| Page | What it does |
|---|---|
| **Dashboard** | Live KPI cards (kW/TR, load, temps) across all equipment; DB + LLM health pulse |
| **AI Analyzer** | Pick equipment + time range → chart → ask anything → markdown answer streams in |
| **Efficiency** | kW/TR band analysis vs design benchmark; per-chiller loss-driver cards |
| **Anomalies** | Real-time **z-score** scan across equipment; scan-now |
| **AI Agents** | **5 autonomous agents** using a **tool-calling LLM** with a live reasoning trace |
| Forecast · Compare · Cost · Maintenance · Reports · RAG | Phase 2–4 intelligence + document Q&A |

**Agent example (Investigator):** given "why is Chiller 1 underperforming?", the agent autonomously calls
`compute_efficiency` → `detect_anomalies` → `compare_equipment`, then streams a final, cited report —
you watch the tool calls happen in real time.

## Architecture highlights
- **Domain-driven backend:** `domain/` is pure logic (equipment catalog, efficiency bands) with **no
  I/O** — testable and portable; analytics and LLM sit on top.
- **Explainability first:** every AI answer is grounded in computed analytics (efficiency bands, z-score
  anomalies), not free-form generation — the agent *shows its tools*.
- **Read-only over the plant DB** (MySQL) with its own Postgres+Redis app state; **Tailscale** links the
  services on-site.
- **Engineering hygiene:** GitHub Actions CI, smoke tests (must pass before tagging), Alembic
  migrations, ruff, `docker-compose` for stateful deps, a Makefile, and a RUNBOOK.

## Senior signals
- **Agentic, tool-calling AI on a local model** — real autonomy (multi-step tool use + live trace), fully on-prem.
- **Explainable analytics** — kW/TR band vs design benchmark and z-score anomaly detection feed the LLM, so answers are defensible, not hallucinated.
- **Production-shaped POC** — versioned API, pure-logic domain layer, CI + smoke gates, migrations, runbook.
- **Real deployment** on live industrial equipment (not a toy dataset).

## Status (per repo)
POC active — Phases 0–2 ✅ (foundation, live AI Analyzer, efficiency/anomalies/forecast/compare), Phase 3
partial (5 AI Agents ✅; maintenance/cost/reports/memory ⬜), Phase 4 RAG ⬜, Phase 5 hardening (auth,
TLS, monitoring, backups) ⏸ post-POC.

## Metrics to make defensible before quoting
Numbers like "kW/TR improvement", "anomaly precision", or "operator time saved" need a measured baseline
before résumé use — otherwise frame as *"designed for"* (`kimo-benchmark`).

## Stack
FastAPI · Python 3.11 · React 18 (Vite) · Ollama (`qwen2.5:14b`) · PostgreSQL + **pgvector** · Redis ·
MySQL (read-only source) · SSE streaming · Alembic · GitHub Actions · Docker Compose · Tailscale.
