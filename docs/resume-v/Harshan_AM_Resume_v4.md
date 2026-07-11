# HARSHAN A M
**Full Stack AI Engineer  ·  On-Prem & Agentic AI  ·  RAG · NLP · Voice AI  ·  Real-Time & IoT Systems**

+91-9945472285  ·  harshan.aiyappa@gmail.com  ·  Bangalore, India
linkedin.com/in/harshan-aiyappa  ·  github.com/Kimosabey  ·  kimo-nexus.vercel.app

---

## SUMMARY

Full Stack AI Engineer (~4.5 yrs) shipping AI-powered, real-time, and scalable systems across **EdTech,
Industrial IoT, Aerospace, and AgriTech**. Depth in LLM systems and **RAG (naive → agentic)**, on-prem /
air-gapped **agentic AI** (LangGraph, PydanticAI, MCP, local LLMs), NLP, Voice AI (ASR/TTS), and
data-intensive architectures (Kafka, TimescaleDB, time-series). Strong end-to-end ownership — from UX/UI
and system design through production — in JavaScript, TypeScript, and Python.

---

## EXPERIENCE

### Lingotran · Rangsons Group · Jan 2023 – Present · Mysore
*Software Engineer — Full Stack & AI Systems*

**Core platform — EdTech AI (Lingotran)**
- Built LLM-powered AI tutor & recommendation systems (OpenAI, Gemini, Ollama) serving learners across multiple language tracks
- Designed production **RAG** pipelines (LangChain, LangGraph, Chroma) with advanced techniques — HyDE, RAPTOR, reranking (BGE-M3, Cohere) — improving retrieval precision over naive baselines
- Built real-time conversational AI (LiveKit + WebSockets) with sub-second response; ASR/TTS via Whisper, Deepgram, Kokoro TTS; pronunciation scoring (Soundex/Levenshtein)
- Integrated LangFuse observability (prompt tracing, cost, eval); developed MCP server integrations; NLP (SpaCy) across PT/ES/FR
- Owned delivery as **Scrum Leader**; trained interns; contributed to hiring

> Across the Rangsons Group I delivered several **cross-product platforms** (below), owning system design,
> engineering, and UI/UX end-to-end.

**Graylinx — OMNYX & THERMYNX · Industrial IoT + On-Prem Agentic AI** *(Platform Architect)*
- Designed & architected **OMNYX**, an on-premise, air-gapped Industrial IoT platform — **BACnet → Kafka → dual-DB (PostgreSQL 16 + TimescaleDB)** with **zero cloud data egress** and an agentic-AI layer (Planner/Executor/Validator) on a **local LLM** (Ollama/vLLM) + pgvector RAG
- Built **THERMYNX**, the shipping HVAC vertical: FastAPI + React turning chiller telemetry into explainable insight via **5 autonomous tool-calling agents** (SSE-streamed reasoning); architected Digital-Twin FDD/RUL and RL efficiency optimization with shadow → live rollout
- Stood up the on-prem stack (Docker, Keycloak, Grafana/Prometheus), **stress-tested Kafka toward ~100× scale (~1,100 controllers)**, and designed the analytics data warehouse + metadata-driven Airflow ETL

**Nesso — Farm-to-Fork Traceability Platform · AgriTech** *(Architect)*
- Architected an **offline-first** traceability platform on a TypeScript monorepo (**NestJS 10 + Next.js 15 + Expo**, MongoDB/Redis) — SQLite-outbox offline sync, GPS polygon farm mapping, public **QR traceability**, **12-language** i18n, WCAG 2.2 AA, and **17-role RBAC** across mobile, web, and QR portal (~99 screens)

**Rangsons Aerospace (RAPL) — Enterprise Tools · Full-Stack + FE/UI-UX**
- Designed & built a 7-role **Customer RFQ → Quotation** platform (gated approvals: 12 steps/8 states/4 gates, revision history, ECharts) and a **Manufacturing Execution System** (shift/task tracking, dynamic sequence enforcement, lockout/orphan-task concurrency controls) — React 18 + Node/Express + MongoDB
- Owned **front-end & UI/UX** — a shared "Calm Enterprise" design system (light/dark) reused across RFQ, MES, and an **IT Helpdesk** ticketing console (kanban + SLA traffic-light); delivered an on-site AI-hardware suitability evaluation

**IRIS — B2B Connected Fragrance-Diffuser Platform (IoT)** *(System Design · App · BLE Device · UI/UX)*
- Supported a **BLE fragrance-diffuser fleet-ops platform** (React 19 admin + Expo/RN field app speaking to hardware over Bluetooth + Express/Socket.IO/MongoDB on Azure) — app development, **multi-generation BLE device integration**, and UI/UX; core loop: onboard → commission → consumption-ledger dry-out prediction → refill dispatch (offline-capable field math)
- Authored the **v1→v2 system redesign** — stateless **Redis-backed Socket.IO**, **BullMQ** worker tier, **MQTT→time-series** telemetry pipeline, Key Vault / OpenTelemetry / CI-CD, and offline-first sync — taking platform readiness from pilot to enterprise-grade; also built its GSAP/Lenis investor-demo site

**Neural-Nexus (Nesso) — Hybrid RAG Knowledge Engine · Health**
- Built a Hybrid RAG engine combining **Neo4j (graph) + PostgreSQL (relational)** with LLMs — async FastAPI, parallel multi-source retrieval with custom merge/rank scoring, SSE streaming, strict grounding to minimize hallucinations, Redis/Valkey caching

**Examic — AI Code Generation Platform**
- Built **CodeMint** — natural-language/PRD → code → GitHub → Vercel/Azure deploy automation; integrated OpenHands agent workflows; contributed to team formation & hiring

---

### Freelance Software Developer · Aug 2022 – Dec 2022
- Delivered full-stack applications, dashboards, and legacy-system improvements for clients end-to-end

### Veriteam Software Solutions · Feb 2021 – Jul 2022
*Software Engineer — Full Stack*
- Delivered 45+ production apps across CMS, CRM, and e-commerce using Java (Spring, Hibernate), JSP, JavaScript, Python
- Integrated Stripe, Razorpay, OAuth, JWT, RBAC; modernized legacy PHP/.NET codebases
- Mentored 250+ students and interns across full-stack development

---

## OPEN-SOURCE PROJECTS

**Nexus Swarm** · github.com/Kimosabey/nexus-swarm
Stateful multi-agent research/synthesis engine on LangGraph (Manager-Worker: Orchestrator, Researcher, Writer, Reviewer) with Human-in-the-Loop `interrupt_before` breakpoints and PostgreSQL-checkpointed recovery. FastAPI + Next.js 14; Pydantic V2 typed state.

**DocMind AI** · github.com/Kimosabey/docmind-ai
Hybrid RAG (dense + sparse) over uploaded docs — FastAPI, ChromaDB, Llama3; multi-doc ingestion, semantic chunking, query-time reranking.

**LiveNexus AI** · github.com/Kimosabey/live-nexus-ai
Real-time speech intelligence — WebRTC → LiveKit SFU → Faster-Whisper worker with WebRTCVAD silence gating and adaptive model selection; double-buffered live-transcription UI. *(Latency/percentage claims to be benchmarked before quoting.)*

**InferenceHub** · github.com/Kimosabey/inference-hub
Polyglot inference gateway — Node.js (I/O, Zod validation, auth) + Python (PyTorch/Scikit-learn) over **gRPC + Protobuf** with shared `.proto` contracts; fully containerized.

**VoiceSync AI** · github.com/Kimosabey/voicesync-ai
Privacy-first offline transcription — React → pre-signed MinIO upload → FastAPI webhook → Faster-Whisper; fully air-gapped.

---

## SKILLS

**Languages:** JavaScript, TypeScript, Python, SQL (Exposure: Java, Golang)

**Frontend:** React.js, Next.js 15, TailwindCSS, shadcn/ui, Radix, Framer Motion, Redux, Zustand, React Query, TanStack Table, ECharts (Exposure: React Native/Expo, Three.js)

**Backend & APIs:** Node.js (Express, NestJS), FastAPI, Django, REST, GraphQL, gRPC, Microservices, Modular Monolith

**AI / GenAI / NLP:** LLMs (OpenAI, Claude, Gemini, Ollama, vLLM — local/on-prem), RAG (Naive → Agentic), LangChain, LangGraph, CrewAI, AutoGen, PydanticAI, HuggingFace, SpaCy, HyDE, RAPTOR, Reranking (BGE-M3), MCP Server Development, RAGAS, Tool-Calling Agents

**Voice AI:** Whisper, Faster-Whisper, Deepgram, ElevenLabs, Kokoro TTS, WebRTCVAD, LiveKit, SRT Streaming

**Vector Stores:** Chroma, pgvector (Production) · Qdrant, Weaviate, Pinecone (Familiar)

**Databases:** PostgreSQL, TimescaleDB, MongoDB, MySQL, Redis, Valkey, Neo4j, ClickHouse, Firebase, Prisma ORM

**Streaming & Data:** Kafka, Zookeeper, Airflow, WebSockets, SSE, Protocol Buffers, BACnet, Real-time & Metadata-Driven ETL, Offline-First Sync

**DevOps & Cloud:** Docker, CI/CD (GitHub Actions), Turborepo/pnpm, AWS, Azure, Vercel, Netlify, Kubernetes, Linux

**Observability & Auth:** Grafana, Prometheus, OpenTelemetry, LangFuse · Keycloak, JWT, OAuth, RBAC

**Domains:** Industrial IoT / BMS, Manufacturing Execution (MES), AgriTech traceability, EdTech, Voice/Real-Time

**Core Concepts:** System Design, Distributed Systems, RAG Architecture, LLM Evaluation, Accessibility (WCAG 2.2 AA)

---

## LEADERSHIP & ACTIVITIES
- Tech Lead & Organizer — 24-hour hackathon at MIT College, Mysore (problem design + mentoring)
- Trained interns across full-stack and AI/ML; led developer hiring for the Examic team

---

## EDUCATION
**MCA — NIE College, Mysore** · 2020
**BCA — Vidya Vikas College, Mysore** · 2017
