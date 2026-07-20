#!/usr/bin/env node
/**
 * Sync PNG masters from kimo-portfolio-workspace → kimo-nexus/public/projects
 * and regenerate grid WebP thumbnails at 1280×640.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const WORKSPACE = path.join(ROOT, "kimo-portfolio-workspace");
const PROJECTS_PUBLIC = path.join(ROOT, "kimo-nexus/public/projects");

const GRID = { w: 1280, h: 640 };

const PROJECT_IDS = [
  "nexus-swarm", "vox-agent-neural", "live-nexus-ai", "edge-matrix", "chronicle-ledge",
  "velocity-edge", "data-quarantine", "route-master", "driftwatch-pro", "event-replay",
  "chrono-sync", "docmind-ai", "agent-core", "inference-hub", "voicesync-ai", "speak-flow",
  "order-saga", "ring-route", "logstream-ai", "limit-guard", "token-forge", "nexus-shield",
  "lakehouse-pro", "spec-lens", "tabedaar", "canada-bizzsp", "zeus-biotech", "chit-fund-sys",
  "graphical-captcha", "early-reviewer-predict",
];

const ID_TO_FOLDER = {
  "chronicle-ledge": "chronicle-ledger",
};

const PROP_ACAD_SOURCE = {
  tabedaar: "_proprietary/tabedaar/thumbnail.png",
  "canada-bizzsp": "_proprietary/canada-bizzsp/thumbnail.png",
  "zeus-biotech": "_proprietary/zeus-biotech/thumbnail.png",
  "chit-fund-sys": "_proprietary/chit-fund-sys/thumbnail.png",
  "graphical-captcha": "_academic/graphical-captcha/thumbnail.png",
  "early-reviewer-predict": "_academic/early-reviewer-predict/thumbnail.png",
};

const THUMB_FALLBACK = [
  "thumbnail.png", "hero_main.png", "dashboard.png", "architecture.png", "workflow.png",
];

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function workspaceAssetsDir(id) {
  const folder = ID_TO_FOLDER[id] || id;
  return path.join(WORKSPACE, folder, "docs/assets");
}

async function toGridWebp(src, dest) {
  ensureDir(path.dirname(dest));
  await sharp(src)
    .resize(GRID.w, GRID.h, { fit: "cover", position: "centre" })
    .webp({ quality: 85 })
    .withMetadata({ density: 72 })
    .toFile(dest);
}

const log = { synced: [], webps: [], skipped: [] };

for (const id of PROJECT_IDS) {
  const pubDir = path.join(PROJECTS_PUBLIC, id);
  ensureDir(pubDir);

  const assetsDir = workspaceAssetsDir(id);
  const hasWorkspace = fs.existsSync(assetsDir);

  if (hasWorkspace) {
    for (const file of fs.readdirSync(assetsDir).filter((f) => f.endsWith(".png"))) {
      const src = path.join(assetsDir, file);
      const dest = path.join(pubDir, file);
      fs.copyFileSync(src, dest);
      log.synced.push(`${id}/${file}`);
    }
  }

  let thumbSrc = null;
  for (const candidate of THUMB_FALLBACK) {
    const p = path.join(pubDir, candidate);
    if (fs.existsSync(p)) {
      thumbSrc = p;
      break;
    }
  }

  if (!thumbSrc && PROP_ACAD_SOURCE[id]) {
    thumbSrc = path.join(PROJECTS_PUBLIC, PROP_ACAD_SOURCE[id]);
  }

  if (thumbSrc) {
    const gridDest = path.join(PROJECTS_PUBLIC, `${id}.webp`);
    await toGridWebp(thumbSrc, gridDest);
    log.webps.push(`${id}.webp ← ${path.basename(thumbSrc)}`);
  } else {
    log.skipped.push(id);
  }
}

console.log(JSON.stringify(log, null, 2));
