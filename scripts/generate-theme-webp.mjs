import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const REGISTRY = {
  "logstream-ai": "#be185d",
  "voicesync-ai": "#4d7c0f",
  "order-saga": "#b45309",
  "limit-guard": "#be185d",
  "data-quarantine": "#b45309",
  "chronicle-ledger": "#4d7c0f",
  "agent-core": "#B6F400",
  "spec-lens": "#0369a1",
  "inference-hub": "#0369a1",
  "velocity-edge": "#be185d",
  "docmind-ai": "#7c3aed",
  "route-master": "#B6F400",
  "live-nexus-ai": "#0369a1",
  "ring-route": "#0369a1",
  "lakehouse-pro": "#7c3aed",
  "driftwatch-pro": "#7c3aed",
  "token-forge": "#7c3aed",
  "chrono-sync": "#4d7c0f",
  "event-replay": "#4d7c0f",
  "nexus-swarm": "#B6F400",
  "nexus-shield": "#B6F400",
  "vox-agent-neural": "#B6F400",
  "speak-flow": "#B6F400",
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WORKSPACE = path.join(ROOT, "kimo-portfolio-workspace");
const WEBSITE_DIR = path.join(ROOT, "kimo-nexus/public/projects");

const GRID = { w: 1280, h: 640 };

function generateSVGString(accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="1280" height="640">
    <rect width="1280" height="640" fill="#f6f6f5" />
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#f6f6f5" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.4" />
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.06" />
      </filter>
    </defs>
    <rect width="1280" height="640" fill="url(#bgGrad)" />
    <g filter="url(#softShadow)">
      <circle cx="640" cy="320" r="140" fill="url(#primaryGrad)" />
      <path d="M 560,260 C 610,200 670,200 720,260 C 770,320 710,400 640,400 C 570,400 510,320 560,260 Z"
            fill="none"
            stroke="#ffffff"
            stroke-width="6"
            stroke-linecap="round"
            opacity="0.9" />
      <circle cx="640" cy="400" r="16" fill="${accentColor}" />
      <circle cx="560" cy="260" r="12" fill="#ffffff" />
      <circle cx="720" cy="260" r="12" fill="#ffffff" opacity="0.7" />
    </g>
    <line x1="200" y1="320" x2="1080" y2="320" stroke="#e6e6e4" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.5" />
    <line x1="640" y1="120" x2="640" y2="520" stroke="#e6e6e4" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.5" />
  </svg>`;
}

async function rebuildAssets() {
  const report = { cleanedSvg: [], pngMasters: [], webps: [], errors: [] };

  fs.mkdirSync(WEBSITE_DIR, { recursive: true });

  for (const [id, color] of Object.entries(REGISTRY)) {
    const localAssetsDir = path.join(WORKSPACE, id, "docs/assets");
    fs.mkdirSync(localAssetsDir, { recursive: true });

    const localPngPath = path.join(localAssetsDir, "thumbnail.png");
    const localSvgPath = path.join(localAssetsDir, "thumbnail.svg");
    const websiteFilename = id === "chronicle-ledger" ? "chronicle-ledge.webp" : `${id}.webp`;
    const websitePath = path.join(WEBSITE_DIR, websiteFilename);

    if (fs.existsSync(localSvgPath)) {
      fs.unlinkSync(localSvgPath);
      report.cleanedSvg.push(path.relative(ROOT, localSvgPath));
    }

    const svgBuffer = Buffer.from(generateSVGString(color));

    try {
      const pngBuffer = await sharp(svgBuffer)
        .resize(GRID.w, GRID.h, { fit: "cover", position: "centre" })
        .png({ compressionLevel: 9 })
        .toBuffer();

      fs.writeFileSync(localPngPath, pngBuffer);
      report.pngMasters.push(path.relative(ROOT, localPngPath));

      const webpBuffer = await sharp(svgBuffer)
        .resize(GRID.w, GRID.h, { fit: "cover", position: "centre" })
        .webp({ quality: 90 })
        .toBuffer();

      fs.writeFileSync(websitePath, webpBuffer);
      report.webps.push(path.relative(ROOT, websitePath));
    } catch (err) {
      report.errors.push({ id, message: err.message });
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

await rebuildAssets();
