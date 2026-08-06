# ⚠️ SUPERSEDED — DO NOT SEND

> **Use `Harshan_AM_Resume_v4.md` instead.** This draft is kept only for reference. It contains facts
> that are now known to be wrong: `~4.5 yrs` (actual: 5.5), `45+` apps (actual: 40+), `Veriteam …– Jul
> 2022` (actual: Aug 2022), `NIE College` / `Vidya Vikas College, Mysore` (missing the university and
> grades), and unbenchmarked latency claims ("sub-200ms", "drops 70% of silence packets") that must not
> be quoted without a benchmark. It also lacks the RAPL and IRIS platforms entirely.

---

# HARSHAN A M
**Full Stack AI Engineer  ·  LLM Systems  ·  RAG Pipelines  ·  NLP  ·  Voice AI  ·  Real-Time Systems**

+91-9945472285  ·  harshan.aiyappa@gmail.com  ·  Bangalore, India
linkedin.com/in/harshan-aiyappa  ·  github.com/Kimosabey  ·  kimo-nexus.vercel.app

---

## SUMMARY

Full Stack AI Engineer with ~4.5 years of experience building AI-powered, real-time, and scalable applications across EdTech and industrial domains. Expertise in LLM systems, RAG pipelines (Naive → Agentic), NLP (SpaCy), voice AI (ASR/TTS), agentic frameworks (LangGraph, CrewAI, AutoGen), and data-intensive architectures. Strong track record of end-to-end ownership — from UX prototyping to production deployment — using JavaScript, TypeScript, and Python.

---

## EXPERIENCE

### Lingotran (Rangsons Group) · Jan 2023 – Present · Mysore
*Software Engineer — Full Stack & AI Systems*

**AI / GenAI / NLP**
- Built LLM-powered AI tutor and recommendation systems using OpenAI, Gemini, and Ollama, supporting thousands of learners across multiple language tracks
- Designed and implemented production-grade RAG pipelines using LangChain, LangGraph, and Chroma, measurably improving context retrieval accuracy over naive baseline systems
- Applied advanced RAG techniques including HyDE, RAPTOR, and reranking (BGE-M3, Cohere) to improve retrieval precision in production workflows
- Developed AI-generated learner performance reports, significantly reducing manual reporting effort through automation
- Implemented NLP systems using SpaCy for tokenization, grammar analysis, and sentence-level correctness validation across Portuguese, Spanish, and French
- Integrated LangFuse for observability — enabling prompt tracing, cost monitoring, and evaluation across all AI workflows
- Built AI-driven CMS features with dynamic audio generation using ElevenLabs
- Developed MCP server integrations enabling AI agents to interface with internal platform tools

**Voice & Real-Time Systems**
- Built real-time conversational AI systems using LiveKit and WebSockets, achieving sub-second end-to-end response latency
- Developed ASR/TTS pipelines using Whisper, Deepgram, Kokoro TTS, and SRT streaming workflows
- Implemented speech evaluation and pronunciation scoring using Soundex and Levenshtein algorithms

**Full Stack & Platform**
- Designed and developed core platform using React, Next.js, and Node.js supporting real-time multi-language learning workflows
- Developed REST and GraphQL APIs enabling scalable communication across services
- Designed gamified learning modules and interactive activity builders with real-time feedback loops
- Deployed systems using Docker, GitHub Actions CI/CD, Azure, and Vercel

**Leadership & Ownership**
- Acted as Scrum Leader — sprint planning, delivery coordination, and cross-team execution
- Took end-to-end ownership of AI systems from architecture through production deployment
- Trained interns across full-stack and AI/ML technologies; contributed to Examic team hiring

---

### Graylinx — OMNYX & THERMYNX · Industrial IoT & On-Prem Agentic AI · (Cross-product)
*Platform Architect — On-Prem IoT, Data Engineering & Agentic AI*
- Designed and architected **OMNYX**, an on-premise, air-gapped Industrial IoT operations platform (real-time monitoring, predictive maintenance, agentic automation) with **zero cloud data egress**
- Built the end-to-end telemetry path — **BACnet** field controllers → **Kafka** → a dual-database core (**PostgreSQL 16** + **TimescaleDB** hypertables/continuous aggregates) — with edge and scheduled data-quality tiers and **Airflow** ETL
- Engineered an **agentic AI** framework (Planner/Executor/Validator) on a **local LLM** (Ollama/vLLM) with **pgvector RAG** and Keycloak-modeled agent authorization — no data leaves the site
- Delivered **THERMYNX**, the shipping HVAC vertical at a live manufacturing plant: FastAPI + React app turning chiller telemetry into explainable insight via **5 autonomous tool-calling agents** (efficiency, z-score anomaly, forecast, compare, RAG) with SSE-streamed reasoning traces
- Implemented **Digital-Twin FDD** (fault detection + Remaining-Useful-Life) and **Reinforcement-Learning** efficiency optimization with a safe shadow → live rollout
- Stood up the on-prem stack (Docker Compose, Keycloak, Grafana/Prometheus) and **stress-tested the Kafka pipeline to ~100× scale (~1,100 controllers)** to define on-prem hardware requirements
- Designed the analytics data warehouse (schema/DDL) and a metadata-driven Python ETL, plus platform HLD/LLD specs (architecture, ML-anomaly, API contract, security/RBAC, on-prem plan)

---

### Nesso — Hybrid RAG Knowledge Engine · (Cross-product, Lingotran)
- Designed and built a Hybrid RAG system combining Neo4j (graph) and PostgreSQL (relational) with LLMs to deliver context-aware, grounded responses across a health knowledge domain
- Engineered a fully async FastAPI backend with a parallel multi-source retrieval pipeline — simultaneously fetching from graph and relational layers, combined using custom scoring logic to merge and rank results across sources
- Implemented SSE (Server-Sent Events) streaming for real-time progressive response delivery
- Architected strict grounding mechanisms to minimize hallucinations, making the system reliable for production-grade usage
- Integrated Redis/Valkey caching for high-frequency graph query results, reducing response latency

---

### Examic — AI Code Generation Platform · (Cross-product, Lingotran)
- Built CodeMint, an AI system generating deployable applications from natural language prompts and PRDs
- Designed end-to-end pipeline: prompt → code generation → GitHub → Vercel/Azure deployment automation
- Integrated OpenHands for agent-based development workflows; contributed to team formation and developer hiring

---

### Freelance Software Developer · Aug 2022 – Dec 2022
- Built and delivered full-stack applications, dashboards, and legacy system improvements for clients end-to-end

---

### Veriteam Software Solutions · Feb 2021 – Jul 2022
*Software Engineer — Full Stack*
- Delivered 45+ production-grade applications across CMS, CRM, and e-commerce platforms using Java (Spring, Hibernate), JSP, JavaScript, and Python
- Integrated Stripe, Razorpay, OAuth, JWT, and RBAC authentication systems; modernized legacy PHP and .NET codebases
- Mentored 250+ students and interns across full-stack development

---

## PROJECTS

**Nexus Swarm** · github.com/Kimosabey/nexus-swarm
Stateful multi-agent research and synthesis engine on LangGraph using a Manager-Worker pattern with four specialized agents — Orchestrator, Researcher (real-time web via DuckDuckGo), Writer, and Reviewer. Implements Human-in-the-Loop (HITL) via LangGraph interrupt_before breakpoints for rigorous validation before report generation. State persistence via LangGraph checkpointer with PostgreSQL backend enabling mission recovery. FastAPI backend bridging the Python engine with a Next.js 14 frontend. Type-safe cognitive state via Pydantic V2.

**DocMind AI** · github.com/Kimosabey/docmind-ai
Hybrid RAG system combining dense and sparse retrieval over user-uploaded documents. Built on FastAPI, ChromaDB, and Llama3 with multi-document ingestion, semantic chunking, and query-time reranking for high-precision context delivery.

**LiveNexus AI** · github.com/Kimosabey/live-nexus-ai
Real-time speech intelligence platform achieving sub-200ms transcription latency on standard CPU hardware. Pipeline: WebRTC client → LiveKit SFU → Python worker running Faster-Whisper with WebRTCVAD gating that drops 70% of silence packets. Built adaptive model selection — automatically switches to a lighter Whisper model under high CPU load. Double-buffer UI rendering eliminates stutter during live transcription.

**InferenceHub** · github.com/Kimosabey/inference-hub
High-performance AI inference gateway implementing a polyglot microservices architecture — Node.js handles high-concurrency I/O, validation (Zod), and auth while Python executes ML inference (PyTorch/Scikit-learn). Uses gRPC with Protocol Buffers for significantly smaller payloads and faster serialization compared to REST/JSON. Strict API contracts via shared .proto definitions eliminate schema drift. Fully containerized with Docker Compose.

**VoiceSync AI** · github.com/Kimosabey/voicesync-ai
Privacy-first offline audio transcription pipeline. Flow: React UI → pre-signed MinIO URL (secure upload) → FastAPI webhook → Faster-Whisper worker → stored transcript. Fully air-gapped — no audio data leaves the infrastructure. Designed for privacy-sensitive environments.

---

## SKILLS

**Languages:** JavaScript, TypeScript, Python, SQL (Exposure: Java, Golang)

**Frontend:** React.js, Next.js, TailwindCSS, Redux, Zustand, React Query (Exposure: React Native, Three.js, Expo)

**Backend & APIs:** Node.js (Express, NestJS), FastAPI, Django, REST APIs, GraphQL, Microservices

**AI / GenAI / NLP:** LLMs (OpenAI, Claude, Gemini, Ollama, vLLM — local/on-prem), RAG (Naive → Agentic), LangChain, LangGraph, CrewAI, AutoGen, HuggingFace, SpaCy, Prompt Engineering, HyDE, RAPTOR, Reranking, BGE-M3, MCP Server Development, RAGAS, Tool-Calling Agents, Digital-Twin FDD, Reinforcement Learning

**Voice AI:** Whisper, Faster-Whisper, Deepgram, ElevenLabs, Kokoro TTS, WebRTCVAD, LiveKit, SRT Streaming

**Vector Stores:** Chroma, pgvector (Production)  ·  Qdrant, Weaviate, Pinecone (Familiar)

**Databases:** PostgreSQL, TimescaleDB, MongoDB, MySQL, Redis, Valkey, Neo4j, ClickHouse, Firebase, Prisma ORM

**Streaming & Pipelines:** Kafka, Zookeeper, Airflow, WebSockets, SSE, gRPC, Protocol Buffers, BACnet, Real-time Pipelines, Metadata-Driven ETL

**DevOps & Cloud:** Docker, CI/CD (GitHub Actions), AWS, Azure, Kubernetes, Linux

**Observability:** Grafana, Prometheus, Datadog, LangFuse

**Tools:** Git, Postman, Zod, JWT, Keycloak, Clerk, Figma, Jest

**Core Concepts:** System Design, Distributed Systems, RAG Architecture, LLM Evaluation, DBMS, OS, Computer Networks

---

## LEADERSHIP & ACTIVITIES

- Tech Lead and Organizer for a 24-hour hackathon at MIT College, Mysore — designed problem statements and mentored participants
- Trained interns across full-stack and AI/ML technologies; led developer hiring for Examic team

---

## EDUCATION

**MCA — NIE College, Mysore** · 2020
**BCA — Vidya Vikas College, Mysore** · 2017