#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WS = path.join(ROOT, "kimo-portfolio-workspace");
const work = fs.readFileSync(path.join(ROOT, "kimo-nexus/src/lib/work.ts"), "utf8");
const ids = [...work.matchAll(/^\s+\["([a-z0-9-]+)",/gm)].map((m) => m[1]);
const ID_FOLDER = { "chronicle-ledge": "chronicle-ledger" };
const folders = fs
  .readdirSync(WS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !["scripts", "kimo-nexus"].includes(d.name))
  .map((d) => d.name);

const registry = fs.readFileSync(path.join(ROOT, "kimo-master-blueprint-2026/IMAGE_ASSET_GUIDE.md"), "utf8");

function folderFor(id) {
  return ID_FOLDER[id] || id;
}

const report = {
  ids,
  withBrief: [],
  withoutBrief: [],
  noAssetsDir: [],
  missingWebp: [],
  registryGap: [],
};

for (const id of ids) {
  const folder = folderFor(id);
  const brief = path.join(WS, folder, "docs/asset-brief.md");
  const assets = path.join(WS, folder, "docs/assets");
  const webp = path.join(ROOT, "kimo-nexus/public/projects", `${id}.webp`);

  if (!fs.existsSync(assets)) report.noAssetsDir.push(id);
  else if (fs.existsSync(brief)) report.withBrief.push(id);
  else report.withoutBrief.push({ id, folder });

  if (!fs.existsSync(webp)) report.missingWebp.push(id);

  const label = id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  if (!registry.includes(label) && !registry.toLowerCase().includes(id.replace(/-/g, " "))) {
    if (id === "chronicle-ledge" && registry.includes("ChronicleLedger")) continue;
    report.registryGap.push(id);
  }
}

console.log(JSON.stringify(report, null, 2));
