#!/usr/bin/env node
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEXUS = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(NEXUS, "../kimo-portfolio-workspace");
const PUBLIC = path.join(NEXUS, "public");

const workTs = fs.readFileSync(path.join(NEXUS, "src/lib/work.ts"), "utf8");
const repos = workTs
  .split("\n")
  .filter((line) => /^\s+\["[a-z0-9-]+"/.test(line) && line.includes('"repo"'))
  .map((line) => line.match(/^\s+\["([a-z0-9-]+)"/)[1]);

const BUILT = [
  "logstream-ai", "voicesync-ai", "order-saga", "limit-guard", "data-quarantine",
  "chronicle-ledger", "agent-core", "spec-lens", "inference-hub", "velocity-edge",
  "docmind-ai", "route-master", "live-nexus-ai", "ring-route", "lakehouse-pro",
  "driftwatch-pro", "token-forge", "chrono-sync", "event-replay", "nexus-swarm",
  "nexus-shield", "vox-agent-neural", "speak-flow",
];

const SITE_IMAGES = [
  "profile.webp", "og-image.png", "noise.png", "favicon-32.png", "apple-touch-icon.png",
];

const broken = [];

for (const file of SITE_IMAGES) {
  const p = path.join(PUBLIC, file);
  if (!fs.existsSync(p)) broken.push({ type: "missing_site", file });
  else {
    try {
      await sharp(p).metadata();
    } catch {
      broken.push({ type: "corrupt_site", file });
    }
  }
}

for (const id of repos) {
  const webp = path.join(PUBLIC, "projects", `${id}.webp`);
  if (!fs.existsSync(webp)) broken.push({ type: "missing_repo_webp", id });
  else {
    const m = await sharp(webp).metadata();
    if (m.width !== 1280 || m.height !== 640) {
      broken.push({ type: "bad_webp_dims", id, actual: `${m.w}x${m.h}` });
    }
  }
}

for (const id of BUILT) {
  const png = path.join(WORKSPACE, id, "docs/assets/thumbnail.png");
  if (!fs.existsSync(png)) broken.push({ type: "missing_png_master", id });
  else {
    const m = await sharp(png).metadata();
    if (m.width !== 1280 || m.height !== 640) {
      broken.push({ type: "bad_png_dims", id, actual: `${m.width}x${m.height}` });
    }
  }
}

console.log(
  JSON.stringify(
    {
      repoProjects: repos.length,
      builtPngMasters: BUILT.length,
      siteImages: SITE_IMAGES.length,
      broken,
      ok: broken.length === 0,
    },
    null,
    2,
  ),
);

process.exit(broken.length ? 1 : 0);
