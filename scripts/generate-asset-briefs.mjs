#!/usr/bin/env node
/**
 * Generate or refresh docs/asset-brief.md for all 23 built portfolio projects.
 * Canonical path: kimo-portfolio-workspace/<folder>/docs/asset-brief.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WS = path.join(ROOT, "kimo-portfolio-workspace");

const REQUIRED =
  "Minimal SaaS illustration, light theme, off-white background (#f6f6f5), vector graphic, soft depth, zero text, zero logos, zero UI chrome";

/** @type {Record<string, { folder?: string, title: string, primary: string, accent: string, tier: "minimal" | "infographic", motif: string, domain: string, thumbnailMotif: string, status?: Record<string, string> }>} */
const PROJECTS = {
  "logstream-ai": {
    title: "LogStream AI",
    primary: "#10B981",
    accent: "#334155",
    tier: "infographic",
    motif: "High-volume log ingestion with automated anomaly detection and batch buffering for spikes.",
    domain: "observability log pipeline",
    thumbnailMotif:
      "Emerald log stream funneling into an anomaly spike graph — pipeline nodes and soft metric curves, no labels.",
  },
  "voicesync-ai": {
    title: "VoiceSync AI",
    primary: "#22C55E",
    accent: "#64748B",
    tier: "infographic",
    motif: "Offline-first on-device Whisper transcription with a privacy shield motif.",
    domain: "private on-device speech",
    thumbnailMotif:
      "Green waveform contained inside a subtle privacy shield — local device chip hint, no labels.",
  },
  "order-saga": {
    title: "OrderSaga",
    primary: "#2563EB",
    accent: "#FB923C",
    tier: "infographic",
    motif: "Distributed saga with compensating transaction steps across microservices.",
    domain: "saga orchestration",
    thumbnailMotif:
      "Blue orchestration path with orange compensating rollback arrows between service nodes, no labels.",
  },
  "limit-guard": {
    title: "LimitGuard",
    primary: "#DC2626",
    accent: "#EAB308",
    tier: "infographic",
    motif: "Distributed rate limiting using token-bucket and leaky-bucket gates for DDoS mitigation.",
    domain: "rate limiting",
    thumbnailMotif:
      "Atomic token-bucket gates with red limit bars and yellow token fill levels — traffic flow arrows, no labels.",
  },
  "data-quarantine": {
    title: "DataQuarantine",
    primary: "#F59E0B",
    accent: "#EF4444",
    tier: "infographic",
    motif: "Fault-tolerant pipeline isolating malformed records via circuit breakers and dead-letter queues.",
    domain: "data pipeline resilience",
    thumbnailMotif:
      "Amber pipeline splitting bad records into a red quarantine funnel — DLQ vault shape, no labels.",
  },
  "chronicle-ledger": {
    folder: "chronicle-ledger",
    title: "ChronicleLedger",
    primary: "#1D4ED8",
    accent: "#059669",
    tier: "infographic",
    motif: "Event-sourced CQRS ledger with append-only event log and strong consistency.",
    domain: "event sourcing",
    thumbnailMotif:
      "Blue append-only event stream feeding a green projection store — CQRS split, no labels.",
  },
  "agent-core": {
    title: "Agent Core",
    primary: "#B6F400",
    accent: "#E5E7EB",
    tier: "minimal",
    motif:
      "Autonomous agent architecture — horizontal compute bands, neural-node constellation with thin connectors (ReAct + tool use).",
    domain: "agent framework",
    thumbnailMotif:
      "Lime neural-node constellation center-right with subtle gray compute bands and open left negative space.",
    status: {
      thumbnail: "✅ Legacy labeled diagram (1024²) — regen to minimal tier queued",
      hero_main: "✅ Shipped (minimal tier)",
      workflow: "⏳ Not generated",
      dashboard: "⏳ Not generated",
      architecture: "✅ Also architecture_diagram.png, react_flow_diagram.png",
    },
  },
  "spec-lens": {
    title: "SpecLens",
    primary: "#22D3EE",
    accent: "#1E293B",
    tier: "infographic",
    motif: "OpenAPI spec auditor — magnifying glass over schema graph with lint violation highlights.",
    domain: "API spec auditing",
    thumbnailMotif:
      "Cyan magnifying glass over a navy OpenAPI node graph — security lint glow, no labels.",
  },
  "inference-hub": {
    title: "InferenceHub",
    primary: "#4F46E5",
    accent: "#EC4899",
    tier: "infographic",
    motif: "Model-serving grid with versioned deployments and A/B test traffic split.",
    domain: "ML model serving",
    thumbnailMotif:
      "Indigo model-serving grid with pink A/B traffic fork — deployment pods, no labels.",
  },
  "velocity-edge": {
    title: "VelocityEdge",
    primary: "#EF4444",
    accent: "#94A3B8",
    tier: "infographic",
    motif: "High-throughput telemetry streams at 100k+ events/sec over binary WebSocket feeds.",
    domain: "high-throughput telemetry",
    thumbnailMotif:
      "Red high-velocity event streams with gray binary packet lanes — speed motion blur, no labels.",
  },
  "docmind-ai": {
    title: "DocMind AI",
    primary: "#7C3AED",
    accent: "#10B981",
    tier: "infographic",
    motif: "RAG retrieval pipeline with hybrid semantic search and neural re-ranking.",
    domain: "retrieval-augmented generation",
    thumbnailMotif:
      "Purple document stack flowing into green vector retrieval nodes — RAG pipeline, no labels.",
  },
  "route-master": {
    title: "RouteMaster",
    primary: "#14B8A6",
    accent: "#F59E0B",
    tier: "infographic",
    motif: "Cost-optimized LLM router — prompt complexity scoring routes to cheapest capable model.",
    domain: "AI cost routing",
    thumbnailMotif:
      "Teal routing fork splitting toward cheap vs capable model lanes with amber cost accent, no labels.",
    status: {
      thumbnail: "✅ Shipped",
      hero_main: "✅ Shipped",
      workflow: "✅ Shipped",
      dashboard: "✅ Shipped",
      architecture: "✅ Shipped",
    },
  },
  "live-nexus-ai": {
    title: "LiveNexus AI",
    primary: "#06B6D4",
    accent: "#7C3AED",
    tier: "infographic",
    motif: "Hybrid real-time audio — CPU edge inference nodes paired with cloud transport scale.",
    domain: "hybrid audio AI",
    thumbnailMotif:
      "Cyan edge nodes linked to purple cloud audio transport — hybrid mesh, no labels.",
  },
  "ring-route": {
    title: "RingRoute",
    primary: "#3B82F6",
    accent: "#A855F7",
    tier: "infographic",
    motif: "Consistent-hashing ring router for stateful high-concurrency workloads.",
    domain: "consistent hashing",
    thumbnailMotif:
      "Blue consistent-hash ring with purple vnode markers and request arrows, no labels.",
  },
  "lakehouse-pro": {
    title: "Lakehouse Pro",
    primary: "#0D9488",
    accent: "#D97706",
    tier: "infographic",
    motif: "Real-time IoT lakehouse on medallion architecture — Kafka ingest to ClickHouse.",
    domain: "medallion lakehouse",
    thumbnailMotif:
      "Teal bronze/silver/gold medallion layers with amber Kafka stream into column store, no labels.",
  },
  "driftwatch-pro": {
    title: "DriftWatch Pro",
    primary: "#6366F1",
    accent: "#F43F5E",
    tier: "infographic",
    motif: "Two-sample KS-test and PSI drift detection with baseline vs live distribution curves.",
    domain: "MLOps drift detection",
    thumbnailMotif:
      "Indigo baseline vs rose drifted bell curves overlapping — drift band hint, no labels.",
    status: {
      thumbnail: "✅ Shipped",
      hero_main: "✅ Shipped",
      workflow: "✅ Shipped",
      dashboard: "✅ Shipped",
      architecture: "✅ Shipped",
    },
  },
  "token-forge": {
    title: "TokenForge",
    primary: "#2563EB",
    accent: "#22C55E",
    tier: "infographic",
    motif: "OIDC identity provider with MFA hooks and automated key rotation.",
    domain: "OIDC identity",
    thumbnailMotif:
      "Blue OIDC token flow with green rotating key ring — identity gate, no labels.",
  },
  "chrono-sync": {
    title: "ChronoSync",
    primary: "#0EA5E9",
    accent: "#334155",
    tier: "infographic",
    motif: "Vector clocks for distributed causal ordering — happens-before and concurrent events.",
    domain: "vector clocks",
    thumbnailMotif:
      "Sky-blue vector clock lattice with slate concurrent-event highlights, no labels.",
    status: {
      thumbnail: "✅ Shipped",
      hero_main: "✅ Shipped",
      workflow: "✅ Shipped",
      dashboard: "✅ Shipped",
      architecture: "✅ Shipped",
    },
  },
  "event-replay": {
    title: "EventReplay",
    primary: "#F97316",
    accent: "#334155",
    tier: "infographic",
    motif: "Deterministic event replay reconstructing state with time-travel to any sequence.",
    domain: "event replay",
    thumbnailMotif:
      "Orange event timeline with slate replay scrubber arrow rewinding into derived state, no labels.",
    status: {
      thumbnail: "✅ Shipped",
      hero_main: "✅ Shipped",
      workflow: "✅ Shipped",
      dashboard: "✅ Shipped",
      architecture: "✅ Shipped",
    },
  },
  "nexus-swarm": {
    title: "Nexus Swarm",
    primary: "#8B5CF6",
    accent: "#06B6D4",
    tier: "infographic",
    motif: "Stateful multi-agent LangGraph system with human-in-the-loop research synthesis.",
    domain: "multi-agent orchestration",
    thumbnailMotif:
      "Violet LangGraph agent nodes with cyan orchestration edges — swarm graph, no labels.",
  },
  "nexus-shield": {
    title: "Nexus Shield",
    primary: "#B6F400",
    accent: "#9CA3AF",
    tier: "minimal",
    motif:
      "AI security gateway — outline shield with curved circuit pattern passing through (PII masking before models).",
    domain: "AI security gateway",
    thumbnailMotif:
      "Lime outline shield left-of-center with gray circuit traces flowing through and continuing right.",
    status: {
      thumbnail: "✅ Shipped",
      hero_main: "✅ Legacy (1024² dark — regen to minimal tier queued)",
      workflow: "⏳ Not generated",
      dashboard: "⏳ Not generated",
      architecture: "✅ Legacy infographic; also architecture_hybrid.png",
    },
  },
  "vox-agent-neural": {
    title: "VoxAgent Neural",
    primary: "#3B82F6",
    accent: "#14B8A6",
    tier: "infographic",
    motif: "Sub-second real-time transcription with agentic WebSocket control plane.",
    domain: "real-time transcription",
    thumbnailMotif:
      "Blue live audio waveform into teal WebSocket stream nodes — sub-second latency feel, no labels.",
  },
  "speak-flow": {
    title: "SpeakFlow",
    primary: "#B6F400",
    accent: "#93C5FD",
    tier: "minimal",
    motif:
      "Real-time acoustic analysis — organic horizontal waveform with mesh gradient and minimal I/O accents.",
    domain: "acoustic analysis",
    thumbnailMotif:
      "Lime organic waveform across center with faint blue-gray mesh gradient; geometric I/O accents at ends.",
    status: {
      thumbnail: "✅ Legacy labeled diagram (1024²) — regen to minimal tier queued",
      hero_main: "✅ Shipped (minimal tier)",
      workflow: "⏳ Not generated",
      dashboard: "⏳ Not generated",
      architecture: "✅ Also waveform.png, feedback.png",
    },
  },
};

function renderBrief(id, cfg) {
  const folder = cfg.folder || id;
  const tierLabel =
    cfg.tier === "minimal"
      ? "Minimal illustration (Senior-5 thumbnails/heroes — no text, no logos, no UI chrome)"
      : "Infographic (labeled Senior-5) — grid thumbnail uses Minimal illustration tier";
  const bgNote =
    cfg.tier === "minimal"
      ? "Off-white `#f6f6f5` for minimal assets · `#F5F5F4` if labeled infographic diagrams are added"
      : "Off-white `#f6f6f5` (grid thumbnail) · Light `#F5F5F4` (labeled infographic assets)";

  const defaultStatus = {
    thumbnail: "✅ Legacy (1024²) — V3 light regen queued",
    hero_main: "✅ Legacy (1024²) — V3 light regen queued",
    workflow: "✅ Legacy (1024²) — V3 light regen queued",
    dashboard: "✅ Legacy (1024²) — V3 light regen queued",
    architecture: "✅ Legacy (1024²) — V3 light regen queued",
  };
  const status = { ...defaultStatus, ...(cfg.status || {}) };

  const statusTable = `| Asset | File | Size | Status |
|---|---|---|---|
| Thumbnail | \`docs/assets/thumbnail.png\` | 1280×640 | ${status.thumbnail} |
| Hero | \`docs/assets/hero_main.png\` | 1920×1080 | ${status.hero_main} |
| Workflow | \`docs/assets/workflow.png\` | 1920×1080 | ${status.workflow} |
| Dashboard | \`docs/assets/dashboard.png\` | 1600×1000 | ${status.dashboard} |
| Architecture | \`docs/assets/architecture.png\` | 1600×1000 | ${status.architecture} |`;

  const infographicBlock =
    cfg.tier === "infographic"
      ? `
### Infographic prompt seed (workflow / dashboard / architecture)

Modern premium ${cfg.domain} infographic, light background \`#F5F5F4\`, **${cfg.primary}** primary + **${cfg.accent}** accent, Inter font, rounded cards, soft shadows, Stripe/Linear aesthetic, sharp **{W}×{H}** PNG. Show: ${cfg.motif} Exact labels only — no placeholder text.
`
      : `
### Infographic prompt seed (architecture — if labeled)

Modern premium ${cfg.domain} infographic, light background \`#F5F5F4\`, **${cfg.primary}** primary + **${cfg.accent}** accent, Inter font, rounded cards, soft shadows. Exact labels only — no placeholder text.
`;

  return `# Asset Brief — ${cfg.title}

**Primary color signature:** \`${cfg.primary}\` · **Accent:** \`${cfg.accent}\`
**Visual tier:** ${tierLabel}
**Domain motif:** ${cfg.motif}
**Background:** ${bgNote}

Save each to \`docs/assets/<name>.png\`. Site sync: \`node kimo-nexus/scripts/sync-portfolio-assets.mjs\`.
Grid WebP: \`kimo-nexus/public/projects/${id === "chronicle-ledger" ? "chronicle-ledge" : id}.webp\` (1280×640).

${statusTable}

### Thumbnail prompt (required — grid + README)

${REQUIRED}. **${cfg.primary}** primary + **${cfg.accent}** accent. ${cfg.thumbnailMotif}

### Hero / minimal illustration prompt

${REQUIRED}. **${cfg.primary}** primary + **${cfg.accent}** accent. ${cfg.thumbnailMotif} Spacious composition, Stripe/Linear aesthetic.
${infographicBlock}`;
}

const written = [];
for (const [id, cfg] of Object.entries(PROJECTS)) {
  const folder = cfg.folder || id;
  const dir = path.join(WS, folder, "docs");
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "asset-brief.md");
  fs.writeFileSync(out, renderBrief(id, cfg), "utf8");
  written.push(out);
}

console.log(JSON.stringify({ count: written.length, files: written }, null, 2));
