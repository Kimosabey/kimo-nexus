# Graylinx — Supporting Work (Breadth)

> Beyond the two flagships ([OMNYX](./omnyx.md), [THERMYNX](./thermynx.md)), these show the data-engineering,
> platform-design, and evaluation depth behind the platform. Client names generalized; no secrets.

## Kafka telemetry evaluation & stress testing
Ran a full evaluation of whether **Kafka** could serve as the telemetry backbone — including on
resource-constrained **edge controllers** — and stress-tested the *real* stack at increasing scale.
- Built a scenario ladder from a basic real stream up to **massive scale (~100×, ≈1,100 field
  controllers/DDCs)** and to the absolute hardware limit *(re-verify exact figures against the internal
  test reports before quoting on a résumé)*.
- Produced a decision dossier: verdict, hardware requirements, and an edge-vs-central recommendation.
- **Senior signal:** capacity planning and evidence-based architecture decisions, not guesswork.

## Data warehouse design (`gl-dwh`)
Designed the analytics **data warehouse** — DDL, normalized/dimensional schema, and a reproducible
Postgres bring-up (`docker-compose` + schema + seed).
- Separated transactional state from analytical/reporting models.
- **Senior signal:** modeling for OLAP/reporting distinct from operational OLTP.

## Metadata-driven analytics ETL (`python-etl` / gl_analytics_etl)
Built the **Python ETL** that feeds analytics — an end-to-end **ingestion → transformation → operational**
pipeline driven by **metadata** (config-defined sources/targets rather than hand-coded per table), with
data-cleaning and outlier handling.
- Orchestrated via **Airflow** DAGs.
- **Senior signal:** DRY, config-driven pipelines that scale to new equipment/sites without new code.

## Platform design set (`gl-pulse`)
Authored the platform's design corpus (~19 specs): system **architecture**, simulation plan, **Kafka
topics/schema**, transactional + **data-warehouse** DB designs, **ML anomaly** plan, **agent/LLM spec**,
**API contract**, **security & RBAC**, testing strategy, and the **on-premise** deployment plan.
- **Senior signal:** HLD/LLD-first, contract-first, security-by-design — architecture before code.

## Edge & deployment engineering
- **Edge-node configuration** for field gateways (Raspberry Pi / controllers), **BACnet** integration,
  and RCA work (e.g. BACnet read-property no-response diagnosis).
- **Hardware-suitability evaluations** for multiple real deployment sites (a national medical institute,
  an airport, manufacturing plants) — matching workload to on-prem hardware.
- **Senior signal:** owns the physical/edge reality, not just the cloud abstraction.

## Also in the workspace
Agentic LLM & RAG architecture handbook · on-prem LLM platform design · Langfuse self-host (LLM
observability) · legacy Graylinx BE/FE reference · simulation tooling. *(Design/reference material —
not case-studied here.)*
