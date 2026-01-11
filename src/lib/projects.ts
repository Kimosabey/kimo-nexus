export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    repoUrl: string;
    demoUrl?: string;
    image: string;
    featured?: boolean;
    highlight: string;
    upcoming?: boolean;
};

export const projects: Project[] = [
    // --- Active Projects ---
    {
        id: "token-forge",
        title: "TokenForge",
        category: "Identity / Sec",
        description: "Enterprise-grade distributed authentication system. Implements secure session management with Redis, RBAC with TypeORM, and JWT rotation strategies.",
        techStack: ["NestJS", "PostgreSQL", "Redis", "TypeORM", "Docker"],
        repoUrl: "https://github.com/Kimosabey/token-forge",
        image: "/projects/token-forge.png",
        highlight: "Auth: Distributed Sessions",
    },
    {
        id: "chronicle-ledge",
        title: "ChronicleLedger",
        category: "Distributed Systems",
        description: "Production-grade event sourcing ledger handling high-concurrency financial transactions with strict consistency (CP). Built with CockroachDB and Raft consensus.",
        techStack: ["Node.js", "CockroachDB", "NATS JetStream", "Event Sourcing", "Docker"],
        repoUrl: "https://github.com/Kimosabey/chronicle-ledge",
        image: "/projects/chronicle-ledge.png",
        featured: true,
        highlight: "Process: Raft Consensus",
    },
    {
        id: "velocity-edge",
        title: "VelocityEdge",
        category: "High Performance",
        description: "High-throughput real-time dashboard capable of processing 100k+ events/sec. Optimized for sub-10ms latency using WebSockets and binary protocols.",
        techStack: ["Next.js", "WebSockets", "D3.js", "Redis", "Go"],
        repoUrl: "https://github.com/Kimosabey/velocity-edge",
        image: "/projects/velocity-edge.png",
        featured: true,
        highlight: "Speed: 100k Events/Sec",
    },
    {
        id: "data-quarantine",
        title: "DataQuarantine",
        category: "Data Engineering",
        description: "Fault-tolerant data pipeline that isolates malformed records. Features circuit breakers, dead letter queues, and automated replay mechanisms.",
        techStack: ["TypeScript", "Kafka", "PostgreSQL", "Prometheus", "Docker"],
        repoUrl: "https://github.com/Kimosabey/data-quarantine",
        image: "/projects/data-quarantine.png",
        featured: true,
        highlight: "Pattern: Circuit Breaker",
    },
    {
        id: "docmind-ai",
        title: "DocMind AI",
        category: "AI / RAG",
        description: "Advanced RAG (Retrieval-Augmented Generation) system for querying complex documentation. Uses hybrid search and semantic reranking.",
        techStack: ["Python", "LangChain", "OpenAI", "Pinecone", "Next.js"],
        repoUrl: "https://github.com/Kimosabey/docmind-ai",
        image: "/projects/docmind-ai.png",
        highlight: "Flow: Hybrid Search",
    },
    {
        id: "agent-core",
        title: "Agent Core",
        category: "AI / Agents",
        description: "Autonomous local AI agent framework implementing the ReAct pattern. Capable of tool use, memory management, and multi-step reasoning.",
        techStack: ["Python", "Ollama", "Chromadb", "Local LLMs"],
        repoUrl: "https://github.com/Kimosabey/agent-core",
        image: "/projects/agent-core.png",
        highlight: "Model: ReAct Pattern",
    },
    {
        id: "speak-flow",
        title: "SpeakFlow",
        category: "Voice Tech",
        description: "Real-time pronunciation feedback tool. Visualizes voice waveforms and provides phonetic accuracy scoring using browser Audio APIs.",
        techStack: ["React", "Web Audio API", "Framer Motion", "Vite"],
        repoUrl: "https://github.com/Kimosabey/speak-flow",
        image: "/projects/speak-flow.png",
        highlight: "Audio: Real-time FFT",
    },
    {
        id: "voicesync-ai",
        title: "VoiceSync AI",
        category: "Privacy / AI",
        description: "Secure, offline-first audio transcription platform. Runs Whisper models locally in the browser/electron for 100% privacy.",
        techStack: ["Electron", "Whisper.cpp", "React", "Local First"],
        repoUrl: "https://github.com/Kimosabey/voicesync-ai",
        image: "/projects/voicesync-ai.png",
        highlight: "Privacy: 100% Local Inference",
    },
    {
        id: "logstream-ai",
        title: "LogStream AI",
        category: "Observability",
        description: "High-volume log ingestion service with anomaly detection. Uses buffering and batch processing to handle traffic spikes.",
        techStack: ["Go", "Elasticsearch", "Kibana", "Docker"],
        repoUrl: "https://github.com/Kimosabey/logstream-ai",
        image: "/projects/logstream-ai.png",
        highlight: "Ingest: Batch Buffering",
    },
    {
        id: "limit-guard",
        title: "LimitGuard",
        category: "Security / Infra",
        description: "Distributed rate limiting service providing DDoS protection. Implements Token Bucket and Leaky Bucket algorithms.",
        techStack: ["Redis/Lua", "Node.js", "Nginx", "System Design"],
        repoUrl: "https://github.com/Kimosabey/limit-guard",
        image: "/projects/limit-guard.png",
        highlight: "Algo: Token Bucket",
    },
    {
        id: "spec-lens",
        title: "SpecLens",
        category: "DevTools",
        description: "Automated API specification analysis tool. Lints OpenAPI/Swagger files for security risks and style guide violations.",
        techStack: ["TypeScript", "AST", "React", "OpenAPI"],
        repoUrl: "https://github.com/Kimosabey/spec-lens",
        image: "/projects/spec-lens.png",
        highlight: "Parse: AST Analysis",
    },
    {
        id: "inference-hub",
        title: "InferenceHub",
        category: "ML Ops",
        description: "Centralized model serving platform. Manages model versioning, A/B testing, and exposes a unified inference API.",
        techStack: ["FastAPI", "Docker", "Kubernetes", "MLflow"],
        repoUrl: "https://github.com/Kimosabey/inference-hub",
        image: "/projects/inference-hub.png",
        highlight: "Deploy: A/B Testing",
    },
    {
        id: "kimo-nexus",
        title: "KimoNexus",
        category: "Portfolio",
        description: "The modern portfolio you are looking at. Built with Next.js 16, Tailwind 4, and Framer Motion for high-performance animations.",
        techStack: ["Next.js 16", "Tailwind 4", "Framer Motion", "React 19"],
        repoUrl: "https://github.com/Kimosabey/kimo-nexus",
        image: "/profile.webp",
        highlight: "UI: Framer Motion",
    },
    // --- Upcoming Projects (The Lab) ---
    {
        id: "telemetry-lakehouse",
        title: "TelemetryLakehouse",
        category: "Big Data / Java",
        description: "Enterprise-scale data ingestion pipeline built with Spring Boot. Streams millions of events to ClickHouse for real-time analytics.",
        techStack: ["Java (Spring)", "ClickHouse", "Kafka", "Protobuf"],
        repoUrl: "https://github.com/Kimosabey/telemetry-lakehouse",
        image: "/projects/telemetry-lakehouse.png",
        highlight: "Data: High Throughput",
        upcoming: true
    },
    {
        id: "ring-route",
        title: "RingRoute",
        category: "Distributed / Go",
        description: "High-concurrency request router using Consistent Hashing rings. Ensures zero-rebalancing node failures for stateful workloads.",
        techStack: ["Go (Fiber)", "Consistent Hashing", "gRPC"],
        repoUrl: "https://github.com/Kimosabey/ring-route",
        image: "/projects/ring-route.png",
        highlight: "Algo: Consistent Hash",
        upcoming: true
    },
];
