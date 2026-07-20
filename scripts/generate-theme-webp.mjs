import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

/** Canonical V3 registry — primary, accent, motif key (IMAGE_ASSET_GUIDE §4) */
const REGISTRY = {
  "logstream-ai": { primary: "#10B981", accent: "#334155", motif: "pipeline" },
  "voicesync-ai": { primary: "#22C55E", accent: "#64748B", motif: "waveform-shield" },
  "order-saga": { primary: "#2563EB", accent: "#FB923C", motif: "fork" },
  "limit-guard": { primary: "#DC2626", accent: "#EAB308", motif: "bucket" },
  "data-quarantine": { primary: "#F59E0B", accent: "#EF4444", motif: "funnel" },
  "chronicle-ledger": { primary: "#1D4ED8", accent: "#059669", motif: "stream" },
  "agent-core": { primary: "#B6F400", accent: "#E5E7EB", motif: "nodes" },
  "spec-lens": { primary: "#22D3EE", accent: "#1E293B", motif: "lens" },
  "inference-hub": { primary: "#4F46E5", accent: "#EC4899", motif: "grid" },
  "velocity-edge": { primary: "#EF4444", accent: "#94A3B8", motif: "streams" },
  "docmind-ai": { primary: "#7C3AED", accent: "#10B981", motif: "documents" },
  "route-master": { primary: "#14B8A6", accent: "#F59E0B", motif: "fork" },
  "live-nexus-ai": { primary: "#06B6D4", accent: "#7C3AED", motif: "hybrid" },
  "ring-route": { primary: "#3B82F6", accent: "#A855F7", motif: "ring" },
  "lakehouse-pro": { primary: "#0D9488", accent: "#D97706", motif: "layers" },
  "driftwatch-pro": { primary: "#6366F1", accent: "#F43F5E", motif: "curves" },
  "token-forge": { primary: "#2563EB", accent: "#22C55E", motif: "keyring" },
  "chrono-sync": { primary: "#0EA5E9", accent: "#334155", motif: "lattice" },
  "event-replay": { primary: "#F97316", accent: "#334155", motif: "timeline" },
  "nexus-swarm": { primary: "#8B5CF6", accent: "#06B6D4", motif: "swarm" },
  "nexus-shield": { primary: "#B6F400", accent: "#9CA3AF", motif: "shield" },
  "vox-agent-neural": { primary: "#3B82F6", accent: "#14B8A6", motif: "live-wave" },
  "speak-flow": { primary: "#B6F400", accent: "#93C5FD", motif: "waveform" },
  "edge-matrix": { primary: "#F97316", accent: "#6B7280", motif: "shard-matrix" },
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WORKSPACE = path.join(ROOT, "kimo-portfolio-workspace");
const WEBSITE_DIR = path.join(ROOT, "kimo-nexus/public/projects");
const GRID = { w: 1280, h: 640 };
const CX = 640;
const CY = 320;

function motifGroup(key, primary, accent) {
  const g = (inner) =>
    `<g transform="translate(${CX}, ${CY})" filter="url(#softShadow)">${inner}</g>`;

  switch (key) {
    case "shield":
      return g(`
        <circle r="118" fill="url(#primaryGrad)" opacity="0.95"/>
        <path d="M -42,-58 L 0,-92 L 42,-58 L 42,18 Q 0,58 -42,18 Z" fill="none" stroke="${primary}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M -80,8 Q 0,-12 80,8" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
        <circle cx="0" cy="28" r="8" fill="${primary}"/>
      `);
    case "nodes":
      return g(`
        <rect x="-140" y="-18" width="280" height="36" rx="18" fill="${accent}" opacity="0.35"/>
        <circle cx="48" cy="0" r="52" fill="url(#primaryGrad)"/>
        <circle cx="20" cy="-18" r="10" fill="${primary}"/>
        <circle cx="58" cy="-8" r="8" fill="#fff" opacity="0.9"/>
        <circle cx="72" cy="16" r="7" fill="#fff" opacity="0.75"/>
        <circle cx="36" cy="22" r="6" fill="${primary}"/>
        <line x1="20" y1="-18" x2="58" y2="-8" stroke="${accent}" stroke-width="2" opacity="0.6"/>
        <line x1="58" y1="-8" x2="72" y2="16" stroke="${accent}" stroke-width="2" opacity="0.6"/>
      `);
    case "waveform":
      return g(`
        <rect x="-150" y="-40" width="300" height="80" rx="40" fill="${accent}" opacity="0.2"/>
        <path d="M -120,0 C -80,-48 -40,48 0,0 S 80,-48 120,0" fill="none" stroke="${primary}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="-118" cy="0" r="7" fill="${accent}" opacity="0.8"/>
        <circle cx="118" cy="0" r="7" fill="${accent}" opacity="0.8"/>
      `);
    case "live-wave":
      return g(`
        <path d="M -110,12 C -70,-36 -30,36 10,12 S 70,-36 110,12" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="92" cy="-20" r="34" fill="url(#primaryGrad)"/>
        <circle cx="92" cy="-20" r="14" fill="${accent}" opacity="0.9"/>
        <path d="M 78,-20 L 106,-20 M 92,-34 L 92,-6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      `);
    case "waveform-shield":
      return g(`
        <path d="M -38,-62 L 0,-88 L 38,-62 L 38,14 Q 0,48 -38,14 Z" fill="none" stroke="${accent}" stroke-width="3" opacity="0.7"/>
        <path d="M -90,8 C -45,-28 45,-28 90,8" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="0" cy="24" r="7" fill="${primary}"/>
      `);
    case "fork":
      return g(`
        <circle cx="-56" cy="36" r="28" fill="url(#primaryGrad)"/>
        <circle cx="56" cy="36" r="28" fill="${accent}" opacity="0.85"/>
        <path d="M 0,-70 L 0,10 M 0,10 L -56,36 M 0,10 L 56,36" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `);
    case "bucket":
      return g(`
        <rect x="-70" y="-40" width="140" height="88" rx="12" fill="none" stroke="${primary}" stroke-width="4"/>
        <rect x="-70" y="8" width="140" height="40" rx="8" fill="${accent}" opacity="0.35"/>
        <circle cx="-28" cy="-12" r="10" fill="${accent}"/>
        <circle cx="0" cy="-12" r="10" fill="${accent}"/>
        <circle cx="28" cy="-12" r="10" fill="${accent}"/>
      `);
    case "funnel":
      return g(`
        <path d="M -90,-50 L 90,-50 L 48,50 L -48,50 Z" fill="none" stroke="${primary}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M 0,-20 L 0,50" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="0" cy="58" rx="34" ry="12" fill="${accent}" opacity="0.4"/>
      `);
    case "stream":
      return g(`
        <rect x="-110" y="-12" width="220" height="24" rx="12" fill="${accent}" opacity="0.25"/>
        <circle cx="-72" cy="0" r="8" fill="${primary}"/>
        <circle cx="-24" cy="0" r="8" fill="${primary}" opacity="0.85"/>
        <circle cx="24" cy="0" r="8" fill="${primary}" opacity="0.7"/>
        <circle cx="72" cy="0" r="8" fill="${accent}"/>
        <path d="M 96,-40 L 96,40" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      `);
    case "lens":
      return g(`
        <circle cx="-18" cy="-8" r="56" fill="none" stroke="${primary}" stroke-width="5"/>
        <circle cx="-18" cy="-8" r="28" fill="url(#primaryGrad)" opacity="0.5"/>
        <line x1="24" y1="26" x2="68" y2="70" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="8" cy="12" r="5" fill="${accent}"/>
        <circle cx="-30" cy="-24" r="4" fill="${accent}" opacity="0.7"/>
      `);
    case "grid":
      return g(`
        <rect x="-58" y="-58" width="48" height="48" rx="10" fill="url(#primaryGrad)"/>
        <rect x="10" y="-58" width="48" height="48" rx="10" fill="${primary}" opacity="0.7"/>
        <rect x="-58" y="10" width="48" height="48" rx="10" fill="${accent}" opacity="0.55"/>
        <rect x="10" y="10" width="48" height="48" rx="10" fill="${accent}" opacity="0.85"/>
      `);
    case "streams":
      return g(`
        <path d="M -120,-20 C -60,-50 0,10 60,-20 S 120,10 120,-20" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round"/>
        <path d="M -120,20 C -60,-10 0,50 60,20 S 120,50 120,20" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      `);
    case "documents":
      return g(`
        <rect x="-52" y="-64" width="64" height="84" rx="8" fill="${accent}" opacity="0.25"/>
        <rect x="-24" y="-48" width="64" height="84" rx="8" fill="url(#primaryGrad)"/>
        <rect x="4" y="-32" width="64" height="84" rx="8" fill="${primary}" opacity="0.55"/>
        <circle cx="56" cy="36" r="22" fill="${accent}"/>
      `);
    case "hybrid":
      return g(`
        <circle cx="-56" cy="24" r="34" fill="url(#primaryGrad)"/>
        <circle cx="56" cy="-24" r="34" fill="${accent}" opacity="0.85"/>
        <path d="M -22,8 C 0,-8 22,8 56,-24" fill="none" stroke="${primary}" stroke-width="4" stroke-linecap="round"/>
        <path d="M -56,24 C -28,0 0,16 22,8" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      `);
    case "ring":
      return g(`
        <circle r="72" fill="none" stroke="${primary}" stroke-width="5"/>
        <circle cx="0" cy="-72" r="10" fill="${accent}"/>
        <circle cx="62" cy="-36" r="10" fill="${primary}"/>
        <circle cx="62" cy="36" r="10" fill="${accent}" opacity="0.8"/>
        <circle cx="0" cy="72" r="10" fill="${primary}" opacity="0.7"/>
        <circle cx="-62" cy="36" r="10" fill="${accent}" opacity="0.8"/>
        <circle cx="-62" cy="-36" r="10" fill="${primary}" opacity="0.7"/>
      `);
    case "layers":
      return g(`
        <ellipse cx="0" cy="36" rx="92" ry="22" fill="${accent}" opacity="0.35"/>
        <ellipse cx="0" cy="8" rx="92" ry="22" fill="${primary}" opacity="0.45"/>
        <ellipse cx="0" cy="-20" rx="92" ry="22" fill="url(#primaryGrad)"/>
      `);
    case "curves":
      return g(`
        <path d="M -90,20 C -60,-40 -20,-40 10,20 S 50,80 90,20" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round"/>
        <path d="M -90,36 C -60,-10 -20,-10 10,36 S 50,82 90,36" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
      `);
    case "keyring":
      return g(`
        <circle r="58" fill="none" stroke="${primary}" stroke-width="5"/>
        <circle cx="0" cy="-58" r="14" fill="${accent}"/>
        <rect x="-18" y="-8" width="36" height="36" rx="8" fill="url(#primaryGrad)"/>
        <circle cx="0" cy="10" r="6" fill="#fff"/>
      `);
    case "lattice":
      return g(`
        <circle cx="-40" cy="-32" r="16" fill="url(#primaryGrad)"/>
        <circle cx="40" cy="-32" r="16" fill="${primary}" opacity="0.75"/>
        <circle cx="0" cy="32" r="16" fill="${accent}" opacity="0.85"/>
        <line x1="-40" y1="-32" x2="40" y2="-32" stroke="${accent}" stroke-width="3"/>
        <line x1="-40" y1="-32" x2="0" y2="32" stroke="${accent}" stroke-width="3" opacity="0.7"/>
        <line x1="40" y1="-32" x2="0" y2="32" stroke="${accent}" stroke-width="3" opacity="0.7"/>
      `);
    case "timeline":
      return g(`
        <line x1="-110" y1="0" x2="110" y2="0" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="-60" cy="0" r="8" fill="${primary}"/>
        <circle cx="0" cy="0" r="8" fill="${primary}" opacity="0.8"/>
        <circle cx="60" cy="0" r="8" fill="${primary}" opacity="0.6"/>
        <polygon points="24,-18 24,18 48,0" fill="${accent}"/>
      `);
    case "swarm":
      return g(`
        <circle cx="-48" cy="-28" r="22" fill="url(#primaryGrad)"/>
        <circle cx="48" cy="-28" r="22" fill="${accent}" opacity="0.85"/>
        <circle cx="0" cy="36" r="22" fill="${primary}" opacity="0.7"/>
        <circle cx="0" cy="0" r="18" fill="${accent}" opacity="0.55"/>
        <line x1="-48" y1="-28" x2="0" y2="0" stroke="${accent}" stroke-width="2"/>
        <line x1="48" y1="-28" x2="0" y2="0" stroke="${accent}" stroke-width="2"/>
        <line x1="0" y1="0" x2="0" y2="36" stroke="${accent}" stroke-width="2"/>
      `);
    case "shard-matrix":
      return g(`
        <rect x="-72" y="-72" width="44" height="44" rx="8" fill="url(#primaryGrad)"/>
        <rect x="-14" y="-72" width="44" height="44" rx="8" fill="${primary}" opacity="0.78"/>
        <rect x="44" y="-72" width="44" height="44" rx="8" fill="${accent}" opacity="0.85"/>
        <rect x="-72" y="-14" width="44" height="44" rx="8" fill="${accent}" opacity="0.62"/>
        <rect x="-14" y="-14" width="44" height="44" rx="8" fill="url(#primaryGrad)" opacity="0.92"/>
        <rect x="44" y="-14" width="44" height="44" rx="8" fill="${primary}" opacity="0.58"/>
        <rect x="-72" y="44" width="44" height="44" rx="8" fill="${primary}" opacity="0.48"/>
        <rect x="-14" y="44" width="44" height="44" rx="8" fill="${accent}" opacity="0.72"/>
        <rect x="44" y="44" width="44" height="44" rx="8" fill="url(#primaryGrad)" opacity="0.68"/>
        <path d="M -28,-72 L -28,88 M 30,-72 L 30,88 M -72,-28 L 88,-28 M -72,30 L 88,30" stroke="${accent}" stroke-width="1.5" opacity="0.35"/>
      `);
    case "pipeline":
    default:
      return g(`
        <rect x="-100" y="-16" width="200" height="32" rx="16" fill="${accent}" opacity="0.22"/>
        <path d="M -80,-40 L -40,40 L 0,-20 L 40,40 L 80,-40" fill="none" stroke="${primary}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="80" cy="-40" r="8" fill="${accent}"/>
      `);
  }
}

function generateSVGString(primary, accent, motif) {
  const rings = [220, 280, 340, 400]
    .map(
      (rx, i) =>
        `<ellipse cx="${CX}" cy="${CY}" rx="${rx}" ry="${rx * 0.52}" fill="none" stroke="#e6e6e4" stroke-width="1.2" opacity="${0.22 + i * 0.06}"/>`
    )
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="1280" height="640">
    <rect width="1280" height="640" fill="#f6f6f5"/>
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="46%" r="58%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#f6f6f5" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}"/>
        <stop offset="100%" stop-color="${primary}" stop-opacity="0.55"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.07"/>
      </filter>
    </defs>
    <rect width="1280" height="640" fill="url(#bgGrad)"/>
    ${rings}
    <line x1="180" y1="${CY}" x2="1100" y2="${CY}" stroke="#e6e6e4" stroke-width="1.5" stroke-dasharray="4 10" opacity="0.45"/>
    <line x1="${CX}" y1="90" x2="${CX}" y2="550" stroke="#e6e6e4" stroke-width="1.5" stroke-dasharray="4 10" opacity="0.45"/>
    ${motifGroup(motif, primary, accent)}
  </svg>`;
}

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;

async function rebuildAssets() {
  const report = { pngMasters: [], webps: [], errors: [] };
  fs.mkdirSync(WEBSITE_DIR, { recursive: true });

  const entries = Object.entries(REGISTRY).filter(([id]) => !ONLY || ONLY.includes(id));

  for (const [id, cfg] of entries) {
    const localAssetsDir = path.join(WORKSPACE, id, "docs/assets");
    fs.mkdirSync(localAssetsDir, { recursive: true });

    const localPngPath = path.join(localAssetsDir, "thumbnail.png");
    const localSvgPath = path.join(localAssetsDir, "thumbnail.svg");
    const websiteFilename = id === "chronicle-ledger" ? "chronicle-ledge.webp" : `${id}.webp`;
    const websitePath = path.join(WEBSITE_DIR, websiteFilename);

    if (fs.existsSync(localSvgPath)) fs.unlinkSync(localSvgPath);

    const svgBuffer = Buffer.from(generateSVGString(cfg.primary, cfg.accent, cfg.motif));

    try {
      const pngBuffer = await sharp(svgBuffer)
        .resize(GRID.w, GRID.h, { fit: "cover", position: "centre" })
        .png({ compressionLevel: 9 })
        .toBuffer();

      fs.writeFileSync(localPngPath, pngBuffer);
      report.pngMasters.push(path.relative(ROOT, localPngPath));

      const webpBuffer = await sharp(pngBuffer).webp({ quality: 90 }).toBuffer();
      fs.writeFileSync(websitePath, webpBuffer);
      report.webps.push(path.relative(ROOT, websitePath));
    } catch (err) {
      report.errors.push({ id, message: err.message });
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

await rebuildAssets();
