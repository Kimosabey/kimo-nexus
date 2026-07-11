// Work/projects dataset — new shape lifted from the approved prototype's `P` array.
// (Kept as work.ts during the port so the legacy lib/projects.ts keeps the old page building;
//  consolidated to projects.ts at the final page swap.)

export type WorkGroup =
  | "AI · Agents"
  | "Voice · Audio"
  | "Distributed"
  | "Infra · Security"
  | "Data"
  | "Web · Product";

export type WorkAction = "repo" | "prop" | "acad";

export interface Project {
  id: string;
  title: string;
  category: string;
  group: WorkGroup;
  desc: string;
  tech: string[];
  action: WorkAction;
  url: string;
  featured: boolean;
  img: string;
  alt: string;
}

export const filters = ["All", "AI · Agents", "Voice · Audio", "Distributed", "Infra · Security", "Data", "Web · Product"] as const;

// [id, title, category, group, desc, tech[], action, url, featured]
type Row = [string, string, string, WorkGroup, string, string[], WorkAction, string, boolean];

const P: Row[] = [
  ["nexus-swarm", "Nexus Swarm", "AI / Agents", "AI · Agents", "Stateful multi-agent system on LangGraph with human-in-the-loop review for autonomous research synthesis.", ["LangGraph", "Python", "FastAPI", "Next.js"], "repo", "https://github.com/Kimosabey/nexus-swarm", true],
  ["vox-agent-neural", "VoxAgent Neural", "Real-time Transcription", "Voice · Audio", "Sub-second real-time transcription engine with an agentic control plane over WebSockets.", ["FastAPI", "Faster-Whisper", "LiveKit", "React"], "repo", "https://github.com/Kimosabey/vox-agent-neural", true],
  ["live-nexus-ai", "LiveNexus AI", "Hybrid Audio AI", "Voice · Audio", "Real-time hybrid audio platform pairing CPU inference nodes with cloud transport for global scale.", ["Next.js", "LiveKit", "Faster-Whisper", "Docker"], "repo", "https://github.com/Kimosabey/live-nexus-ai", true],
  ["edge-matrix", "EdgeMatrix", "Distributed Inference", "Distributed", "Distributed inference engine sharding large models across edge nodes with WASM kernels.", ["Bun", "WebAssembly", "TypeScript", "C++"], "repo", "https://github.com/Kimosabey/edge-matrix", true],
  ["chronicle-ledge", "ChronicleLedger", "Event Sourcing", "Distributed", "High-concurrency event-sourcing ledger holding strong consistency via Raft consensus.", ["Node.js", "CockroachDB", "NATS", "Docker"], "repo", "https://github.com/Kimosabey/chronicle-ledger", true],
  ["velocity-edge", "VelocityEdge", "High Throughput", "Distributed", "Telemetry dashboard processing 100k+ events/sec at sub-10ms latency over binary streams.", ["Next.js", "WebSockets", "Redis", "Go"], "repo", "https://github.com/Kimosabey/velocity-edge", true],
  ["data-quarantine", "DataQuarantine", "Data Pipeline", "Data", "Fault-tolerant pipeline isolating malformed records with circuit breakers and dead-letter queues.", ["TypeScript", "Kafka", "PostgreSQL", "Docker"], "repo", "https://github.com/Kimosabey/data-quarantine", true],
  ["docmind-ai", "DocMind AI", "RAG", "AI · Agents", "Retrieval-augmented generation with hybrid semantic search and neural re-ranking.", ["Python", "LangChain", "OpenAI", "Pinecone"], "repo", "https://github.com/Kimosabey/docmind-ai", false],
  ["agent-core", "Agent Core", "Agent Framework", "AI · Agents", "Autonomous agent framework implementing ReAct with tool use and persistent memory.", ["Python", "Ollama", "Chroma"], "repo", "https://github.com/Kimosabey/agent-core", false],
  ["inference-hub", "InferenceHub", "ML Ops", "AI · Agents", "Model-serving grid managing versioned deployments and A/B tests behind one inference API.", ["FastAPI", "Docker", "Kubernetes", "MLflow"], "repo", "https://github.com/Kimosabey/inference-hub", false],
  ["voicesync-ai", "VoiceSync AI", "Private / On-device", "Voice · Audio", "Offline-first transcription running Whisper locally in the client for full data privacy.", ["Electron", "Whisper.cpp", "React"], "repo", "https://github.com/Kimosabey/voicesync-ai", false],
  ["speak-flow", "SpeakFlow", "Acoustic Analysis", "Voice · Audio", "Real-time acoustic analysis scoring phonetic accuracy from live audio waveforms.", ["React", "Web Audio API", "Vite"], "repo", "https://github.com/Kimosabey/speak-flow", false],
  ["order-saga", "OrderSaga", "Saga Pattern", "Distributed", "Reference distributed saga with compensating transactions across microservices.", ["Node.js", "RabbitMQ", "PostgreSQL", "Next.js"], "repo", "https://github.com/Kimosabey/order-saga", false],
  ["ring-route", "RingRoute", "Request Routing", "Distributed", "High-concurrency router using consistent-hashing rings for stateful workloads.", ["Go (Fiber)", "Consistent Hashing", "gRPC"], "repo", "https://github.com/Kimosabey/ring-route", false],
  ["logstream-ai", "LogStream AI", "Observability", "Infra · Security", "High-volume log ingestion with automated anomaly detection and batch buffering for spikes.", ["Go", "Elasticsearch", "Kibana", "Docker"], "repo", "https://github.com/Kimosabey/logstream-ai", false],
  ["limit-guard", "LimitGuard", "Rate Limiting", "Infra · Security", "Distributed rate limiter for DDoS mitigation using token- and leaky-bucket algorithms.", ["Redis/Lua", "Node.js", "Nginx"], "repo", "https://github.com/Kimosabey/limit-guard", false],
  ["token-forge", "TokenForge", "Identity / Auth", "Infra · Security", "OIDC-compliant identity provider with MFA hooks and automated key rotation.", ["NestJS", "OIDC/OAuth2", "Redis", "Docker"], "repo", "https://github.com/Kimosabey/token-forge", false],
  ["lakehouse-pro", "Lakehouse Pro", "Big Data", "Data", "Real-time IoT lakehouse on the medallion architecture with Kafka and ClickHouse.", ["Java (Spring)", "ClickHouse", "Kafka", "Protobuf"], "repo", "https://github.com/Kimosabey/lakehouse-pro", false],
  ["spec-lens", "SpecLens", "DevTools", "Web · Product", "API-spec auditor that lints OpenAPI schemas for security and style violations.", ["TypeScript", "AST", "React", "OpenAPI"], "repo", "https://github.com/Kimosabey/spec-lens", false],
  ["tabedaar", "Tabedaar Service", "Logistics Platform", "Web · Product", "All-in-one service platform with admin, merchant, rider, and real-time order modules.", ["React", "Java", "MSSQL"], "prop", "", false],
  ["canada-bizzsp", "Canada Bizzsp", "Media App", "Web · Product", "Short-video business app ecosystem with a full content-management backend.", ["React", "React Native", "Java", "MSSQL"], "prop", "", false],
  ["zeus-biotech", "Zeus Biotech", "Enterprise CMS", "Web · Product", "Specialized CMS unifying orders, distributors, and internal workflows for biotech.", ["React", "Node.js", "MSSQL"], "prop", "", false],
  ["chit-fund-sys", "Chit Fund System", "FinTech · Legacy", "Web · Product", "Standalone ledger for chit-fund schemes with an accurate interest-calculation engine.", ["JSP/Servlets", "SQL Server", "MVC"], "prop", "", false],
  ["graphical-captcha", "Graphical Captcha Auth", "Research · MCA", "Web · Product", "Graphical-captcha authentication mechanism for high-integrity login flows.", ["C#", "ASP.NET", "MySQL"], "acad", "", false],
  ["early-reviewer-predict", "Early Reviewer Prediction", "Research · BCA", "Data", "System predicting early product reviewers to optimize marketing spend.", ["C#", "MySQL", "Data Mining"], "acad", "", false],
];

export const projects: Project[] = P.map((r) => ({
  id: r[0],
  title: r[1],
  category: r[2],
  group: r[3],
  desc: r[4],
  tech: r[5].slice(0, 4),
  action: r[6],
  url: r[7],
  featured: r[8],
  img: `/projects/${r[0]}.webp`,
  alt: `${r[1]} project thumbnail`,
})).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

export const featuredProjects = projects.filter((p) => p.featured);
