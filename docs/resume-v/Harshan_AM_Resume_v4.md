# HARSHAN A M
**Full Stack AI Engineer  ·  On-Prem & Agentic AI  ·  RAG · NLP · Voice AI  ·  Real-Time & IoT Systems**

+91-9945472285  ·  harshan.aiyappa@gmail.com  ·  Bangalore · Mysore, India  ·  Remote
linkedin.com/in/harshan-aiyappa  ·  github.com/Kimosabey  ·  kimo-nexus.vercel.app

---

## SUMMARY

Full Stack AI Engineer with **5.5 years** shipping AI-powered, real-time, and scalable systems across
EdTech, Industrial IoT, AgriTech, and enterprise tooling for aerospace manufacturing. Depth in LLM
systems and RAG (naive → agentic), on-prem / air-gapped agentic AI (LangGraph, PydanticAI, MCP, local
LLMs), NLP, Voice AI (ASR/TTS), and data-intensive architectures (Kafka, TimescaleDB, time-series).
Strong end-to-end ownership — from UX/UI and system design through production — in JavaScript,
TypeScript, and Python.

---

## EXPERIENCE

### Lingotran · Rangsons Group · Jan 2023 – Present · Mysore
*Software Engineer — Full Stack & AI Systems*

**Core platform — EdTech AI (Lingotran)**
- Built LLM-powered AI tutor and recommendation systems (OpenAI, Gemini, Ollama) serving learners across multiple language tracks
- Designed production **RAG** pipelines (LangChain, LangGraph, Chroma) using HyDE, RAPTOR, and reranking (BGE-M3, Cohere) to lift retrieval precision over naive baselines
- Built real-time conversational AI on LiveKit + WebSockets; ASR/TTS via Whisper, Deepgram, and Kokoro TTS, with pronunciation scoring (Soundex/Levenshtein)
- Automated AI-generated learner performance reports and built gamified learning modules with real-time feedback; added dynamic CMS audio via ElevenLabs
- Instrumented LangFuse observability (prompt tracing, cost, eval); built MCP server integrations; NLP (SpaCy) across Portuguese, Spanish, and French
- Owned delivery as **Scrum Leader**; trained interns and contributed to hiring

**Selected platforms delivered across the group**
*Owned system design, engineering, and UI/UX end-to-end. Proprietary — no public repositories.*

**Graylinx — OMNYX & THERMYNX · Industrial IoT + On-Prem Agentic AI**
- Architected **OMNYX**, an on-premise air-gapped Industrial IoT platform: BACnet → Kafka → dual-DB (PostgreSQL 16 + TimescaleDB) with **zero cloud data egress**
- Owned its agentic-AI layer — Planner/Executor/Validator on a local LLM (Ollama/vLLM) with pgvector RAG and Keycloak-modelled agent authorization
- Built **THERMYNX**, the shipping HVAC vertical (FastAPI + React), turning chiller telemetry into explainable insight via 5 autonomous tool-calling agents with SSE-streamed reasoning traces
- Architected Digital-Twin FDD/RUL and RL efficiency optimization with a safe shadow → live rollout
- Stood up the on-prem stack (Docker, Keycloak, Grafana/Prometheus) and stress-tested the Kafka pipeline toward ~100× scale (~1,100 controllers) to size hardware requirements
- Designed the analytics data warehouse plus metadata-driven Airflow ETL, and authored the platform HLD/LLD specs

**Nesso — Farm-to-Fork Traceability Platform · AgriTech**
- Architected an **offline-first** traceability platform on a TypeScript monorepo (NestJS 10 + Next.js 15 + Expo, MongoDB/Redis) with SQLite-outbox offline sync and GPS polygon farm mapping
- Delivered public **QR traceability**, 12-language i18n, WCAG 2.2 AA, and 17-role RBAC across mobile, web, and QR portal (~99 screens)

**Rangsons Aerospace (RAPL) — Enterprise Tools · Full-Stack + FE/UI-UX**
- Built a 7-role **Customer RFQ → Quotation** platform with gated approvals (12 steps / 8 states / 4 gates), revision history, and ECharts reporting — React 18 + Node/Express + MongoDB
- Built a **Manufacturing Execution System** handling shift/task tracking, dynamic sequence enforcement, and lockout/orphan-task concurrency controls
- Owned front-end and UI/UX: a shared "Calm Enterprise" design system (light/dark) reused across RFQ, MES, and an IT Helpdesk console (kanban + SLA traffic-light); delivered an on-site AI-hardware suitability evaluation

**IRIS — B2B Connected Fragrance-Diffuser Platform · IoT**
- Delivered a **BLE fleet-ops platform** — React 19 admin + Expo/RN field app talking to hardware over Bluetooth, on Express/Socket.IO/MongoDB (Azure) — covering app development, multi-generation BLE device integration, and UI/UX
- Built the core loop: onboard → commission → consumption-ledger dry-out prediction → refill dispatch, with offline-capable field math
- Authored the **v1→v2 system redesign** — stateless Redis-backed Socket.IO, BullMQ worker tier, MQTT→time-series telemetry, Key Vault / OpenTelemetry / CI-CD, and offline-first sync — taking readiness from pilot to enterprise-grade

**Neural-Nexus (Nesso) — Hybrid RAG Knowledge Engine · Health**
- Built a Hybrid RAG engine over **Neo4j (graph) + PostgreSQL (relational)** with async FastAPI, parallel multi-source retrieval, and custom merge/rank scoring
- Enforced strict grounding to minimize hallucinations; SSE streaming for progressive delivery; Redis/Valkey caching for high-frequency graph queries

**Examic — AI Code Generation Platform**
- Built **CodeMint** — natural-language/PRD → code → GitHub → Vercel/Azure deploy automation; integrated OpenHands agent workflows; contributed to team formation and hiring

---

### Freelance Software Developer · Aug 2022 – Dec 2022
- Delivered full-stack applications, dashboards, and legacy-system improvements for clients end-to-end, bridging directly into the Lingotran role

### Veriteam Software Solutions · Feb 2021 – Aug 2022
*Software Engineer — Full Stack*
- Delivered 40+ production apps across CMS, CRM, and e-commerce using Java (Spring, Hibernate), JSP, JavaScript, and Python
- Integrated Stripe, Razorpay, OAuth, JWT, and RBAC; modernized legacy PHP/.NET codebases
- Mentored 250+ students and interns across full-stack development

---

## OPEN-SOURCE PROJECTS

**Nexus Swarm** · github.com/Kimosabey/nexus-swarm
Stateful multi-agent research/synthesis engine on LangGraph (Manager-Worker: Orchestrator, Researcher,
Writer, Reviewer) with Human-in-the-Loop `interrupt_before` breakpoints and PostgreSQL-checkpointed
recovery. FastAPI + Next.js 14; Pydantic V2 typed state.

**Grounded Voice Assistant** · github.com/Kimosabey/kimo-nexus · *live demo: kimo-nexus.vercel.app (⌘K → Ask)*
Retrieval-grounded assistant with voice I/O and page-level tool-calling. NDJSON token streaming from a
Next.js route handler; browser-native STT/TTS via the Web Speech API (no vendor, no per-request cost);
per-IP token bucket plus a daily budget guard; 3-model provider fallback so a retired model can't take it
down; and a deterministic no-LLM retrieval path so it degrades instead of failing. Answers are
constrained to a fixed knowledge base to prevent fabricated claims.

**DocMind AI** · github.com/Kimosabey/docmind-ai
Hybrid RAG (dense + sparse) over uploaded docs — FastAPI, ChromaDB, Llama3; multi-doc ingestion,
semantic chunking, query-time reranking.

**LiveNexus AI** · github.com/Kimosabey/live-nexus-ai
Real-time speech intelligence — WebRTC → LiveKit SFU → Faster-Whisper worker with WebRTCVAD silence
gating and adaptive model selection under CPU load; double-buffered live-transcription UI.

**InferenceHub** · github.com/Kimosabey/inference-hub
Polyglot inference gateway — Node.js (I/O, Zod validation, auth) + Python (PyTorch/Scikit-learn) over
**gRPC + Protobuf** with shared `.proto` contracts; fully containerized.

**VoiceSync AI** · github.com/Kimosabey/voicesync-ai
Privacy-first offline transcription — React → pre-signed MinIO upload → FastAPI webhook →
Faster-Whisper; fully air-gapped.

---

## SKILLS

**AI / GenAI / NLP:** LLMs (OpenAI, Claude, Gemini, Ollama, vLLM — local/on-prem), RAG (Naive → Agentic), LangChain, LangGraph, PydanticAI, CrewAI, AutoGen, HyDE, RAPTOR, Reranking (BGE-M3), MCP Server Development, Tool-Calling Agents, RAGAS, SpaCy, HuggingFace

**Voice AI:** Whisper, Faster-Whisper, Deepgram, ElevenLabs, Kokoro TTS, WebRTCVAD, LiveKit, SRT Streaming, Web Speech API

**Languages:** JavaScript, TypeScript, Python, SQL (Exposure: Java, Golang)

**Frontend:** React.js, Next.js 15, TailwindCSS, shadcn/ui, Radix, Framer Motion, Zustand, React Query, TanStack Table, ECharts (Exposure: React Native/Expo, Three.js)

**Backend & APIs:** Node.js (Express, NestJS), FastAPI, Django, REST, GraphQL, gRPC, Microservices, Modular Monolith

**Data & Streaming:** PostgreSQL, TimescaleDB, MongoDB, Redis/Valkey, Neo4j, ClickHouse, MySQL · Kafka, Airflow, WebSockets, SSE, Protocol Buffers, BACnet, MQTT, Metadata-Driven ETL, Offline-First Sync

**Vector Stores:** Chroma, pgvector (Production) · Qdrant, Weaviate, Pinecone (Familiar)

**DevOps & Cloud:** Docker, CI/CD (GitHub Actions), Turborepo/pnpm, AWS, Azure, Vercel, Kubernetes, Linux

**Observability & Auth:** Grafana, Prometheus, OpenTelemetry, LangFuse · Keycloak, JWT, OAuth, RBAC

**Core Concepts:** System Design, Distributed Systems, RAG Architecture, LLM Evaluation, Accessibility (WCAG 2.2 AA)

**Domains:** Industrial IoT / BMS, Manufacturing Execution (MES), AgriTech traceability, EdTech, Voice/Real-Time

---

## LEADERSHIP & ACTIVITIES
- Tech Lead & Organizer — 24-hour hackathon at MIT College, Mysore (problem design + mentoring)
- Trained interns across full-stack and AI/ML; led developer hiring for the Examic team

---

## EDUCATION
**MCA — Computer Applications** · NIE Institute of Technology, Mysore · 2017–2020 · 8.2 CGPA
**BCA — Computer Applications** · Vidya Vikas College, University of Mysore · 2014–2017 · 71%
