#!/usr/bin/env node
/**
 * PNG-to-WebP portfolio sync — AI model masters → site grid assets.
 * Source: kimo-portfolio-workspace/<project>/docs/assets/thumbnail.png
 * Target: kimo-nexus/public/projects/<id>.webp (1280×640 WebP)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const WORKSPACE = path.join(ROOT, "kimo-portfolio-workspace");
const WEBSITE_DIR = path.join(ROOT, "kimo-nexus/public/projects");
const GRID = { w: 1280, h: 640 };

const REGISTRY = [
  "logstream-ai", "voicesync-ai", "order-saga", "limit-guard", "data-quarantine",
  "chronicle-ledger", "agent-core", "spec-lens", "inference-hub", "velocity-edge",
  "docmind-ai", "route-master", "live-nexus-ai", "ring-route", "lakehouse-pro",
  "driftwatch-pro", "token-forge", "chrono-sync", "event-replay", "nexus-swarm",
  "nexus-shield", "vox-agent-neural", "speak-flow", "edge-matrix",
];

async function syncAssets() {
  if (!fs.existsSync(WEBSITE_DIR)) {
    fs.mkdirSync(WEBSITE_DIR, { recursive: true });
  }

  const report = { compiled: [], missing: [], svgRemoved: [], errors: [] };

  for (const id of REGISTRY) {
    const assetsDir = path.join(WORKSPACE, id, "docs/assets");
    const localPngPath = path.join(assetsDir, "thumbnail.png");
    const localSvgPath = path.join(assetsDir, "thumbnail.svg");
    const websiteFilename = id === "chronicle-ledger" ? "chronicle-ledge.webp" : `${id}.webp`;
    const websitePath = path.join(WEBSITE_DIR, websiteFilename);

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    if (fs.existsSync(localSvgPath)) {
      fs.unlinkSync(localSvgPath);
      report.svgRemoved.push(`${id}/docs/assets/thumbnail.svg`);
      console.log(`Removed legacy SVG: ${id}/docs/assets/thumbnail.svg`);
    }

    if (fs.existsSync(localPngPath)) {
      try {
        await sharp(localPngPath)
          .resize(GRID.w, GRID.h, { fit: "cover", position: "centre" })
          .webp({ quality: 95 })
          .toFile(websitePath);
        report.compiled.push(websiteFilename);
        console.log(`Compiled Master PNG -> WebP: kimo-nexus/public/projects/${websiteFilename}`);
      } catch (err) {
        report.errors.push({ id, message: err.message });
        console.error(`Error converting ${id}: ${err.message}`);
      }
    } else {
      report.missing.push(id);
      console.log(`Missing master PNG for ${id} at ${id}/docs/assets/thumbnail.png`);
    }
  }

  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length || report.missing.length) process.exit(1);
}

syncAssets();
