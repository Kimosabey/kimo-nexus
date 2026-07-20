#!/usr/bin/env node
/**
 * Portfolio asset consistency audit
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const WORKSPACE = path.join(ROOT, "kimo-portfolio-workspace");
const NEXUS = path.join(ROOT, "kimo-nexus");
const PUBLIC = path.join(NEXUS, "public");
const PROJECTS_PUBLIC = path.join(PUBLIC, "projects");

const SENIOR5 = {
  thumbnail: { file: "thumbnail.png", w: 1280, h: 640 },
  hero_main: { file: "hero_main.png", w: 1920, h: 1080 },
  workflow: { file: "workflow.png", w: 1920, h: 1080 },
  dashboard: { file: "dashboard.png", w: 1600, h: 1000 },
  architecture: { file: "architecture.png", w: 1600, h: 1000 },
};

const GRID_WEBP = { w: 1280, h: 640 };

// Parse project IDs from work.ts
const workTs = fs.readFileSync(path.join(NEXUS, "src/lib/work.ts"), "utf8");
const projectIds = [...workTs.matchAll(/^\s+\["([a-z0-9-]+)",/gm)].map((m) => m[1]);

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
}

function listFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .map((f) => path.join(dir, f));
}

async function meta(file) {
  try {
    const m = await sharp(file).metadata();
    return { w: m.width, h: m.height, format: m.format, size: fs.statSync(file).size };
  } catch {
    return null;
  }
}

function grepImageRefs(file) {
  const text = fs.readFileSync(file, "utf8");
  const refs = [];
  const re = /!\[[^\]]*\]\(([^)]+)\)|(?:src|href)=["']([^"']+\.(?:png|webp|jpg|jpeg|gif|svg))["']|url\(['"]?([^'")]+\.(?:png|webp))['"]?\)/gi;
  let m;
  while ((m = re.exec(text))) {
    const ref = (m[1] || m[2] || m[3] || "").trim();
    if (ref && !ref.startsWith("http")) refs.push(ref);
  }
  return refs;
}

const issues = [];
const fixed = [];
const verified = [];
const warnings = [];

// 1. Site grid webp for every work.ts project
for (const id of projectIds) {
  const webp = path.join(PROJECTS_PUBLIC, `${id}.webp`);
  if (!fs.existsSync(webp)) {
    issues.push({ type: "missing_grid_webp", id, path: webp });
  } else {
    const m = await meta(webp);
    if (m && (m.w !== GRID_WEBP.w || m.h !== GRID_WEBP.h)) {
      warnings.push({ type: "grid_webp_dimensions", id, actual: `${m.w}x${m.h}`, expected: `${GRID_WEBP.w}x${GRID_WEBP.h}` });
    } else {
      verified.push(`Grid webp exists: ${id}.webp (${m?.w}x${m?.h})`);
    }
    if (m && m.size === 15562) {
      warnings.push({ type: "placeholder_webp", id, size: m.size });
    }
  }
}

// 2. Public static assets referenced in kimo-nexus src
const staticRefs = ["/profile.webp", "/noise.png", "/og-image.png", "/favicon.ico", "/favicon-32.png", "/apple-touch-icon.png"];
for (const ref of staticRefs) {
  const p = path.join(PUBLIC, ref.replace(/^\//, ""));
  if (!fs.existsSync(p)) issues.push({ type: "missing_static", ref, path: p });
  else verified.push(`Static asset: ${ref}`);
}

// 3. Workspace projects — Senior-5 + README refs
const workspaceProjects = listDirs(WORKSPACE).filter((d) => !d.startsWith(".") && d !== "scripts");
const senior5Report = {};

for (const proj of workspaceProjects) {
  const assetsDir = path.join(WORKSPACE, proj, "docs/assets");
  if (!fs.existsSync(assetsDir)) {
    if (projectIds.includes(proj)) {
      warnings.push({ type: "no_docs_assets", project: proj });
    }
    continue;
  }

  senior5Report[proj] = {};
  for (const [key, spec] of Object.entries(SENIOR5)) {
    const fp = path.join(assetsDir, spec.file);
    const exists = fs.existsSync(fp);
    senior5Report[proj][key] = exists;
    if (exists && projectIds.includes(proj)) {
      const m = await meta(fp);
      if (m && (m.w !== spec.w || m.h !== spec.h)) {
        warnings.push({
          type: "dimension_mismatch",
          project: proj,
          file: spec.file,
          actual: `${m.w}x${m.h}`,
          expected: `${spec.w}x${spec.h}`,
        });
      }
    }
    if (!exists && projectIds.includes(proj)) {
      warnings.push({ type: "missing_senior5", project: proj, asset: spec.file });
    }
  }

  // README image refs
  const readme = path.join(WORKSPACE, proj, "README.md");
  if (fs.existsSync(readme)) {
    for (const ref of grepImageRefs(readme)) {
      const resolved = path.normalize(path.join(path.dirname(readme), ref.replace(/^\.\//, "")));
      if (!fs.existsSync(resolved)) {
        issues.push({ type: "broken_readme_ref", project: proj, ref, resolved });
      }
    }
  }

  // Sync check: standard assets in public/projects/<id>/
  if (projectIds.includes(proj)) {
    const pubDir = path.join(PROJECTS_PUBLIC, proj);
    for (const spec of Object.values(SENIOR5)) {
      const src = path.join(assetsDir, spec.file);
      const dest = path.join(pubDir, spec.file);
      if (fs.existsSync(src) && !fs.existsSync(dest)) {
        issues.push({ type: "unsynced_to_public", project: proj, file: spec.file });
      }
    }
  }
}

// 4. Map work.ts id to workspace folder (handle chronicle-ledge vs chronicle-ledger)
const idToFolder = {};
for (const id of projectIds) {
  const candidates = [id, id.replace(/-ledge$/, "-ledger"), id.replace(/-ledger$/, "-ledge")];
  idToFolder[id] = candidates.find((c) => fs.existsSync(path.join(WORKSPACE, c, "docs/assets"))) || id;
}

// 5. Grid webp should derive from thumbnail when available
for (const id of projectIds) {
  const folder = idToFolder[id];
  const thumbPng = path.join(WORKSPACE, folder, "docs/assets/thumbnail.png");
  const gridWebp = path.join(PROJECTS_PUBLIC, `${id}.webp`);
  if (fs.existsSync(thumbPng) && fs.existsSync(gridWebp)) {
    // compare mtimes — warn if grid is older than master
    const srcTime = fs.statSync(thumbPng).mtimeMs;
    const dstTime = fs.statSync(gridWebp).mtimeMs;
    if (dstTime < srcTime - 1000) {
      warnings.push({ type: "stale_grid_webp", id, thumbPng });
    }
  }
}

// 6. Orphan root webps (not in work.ts)
const rootWebps = listFiles(PROJECTS_PUBLIC, ".webp");
for (const wp of rootWebps) {
  const id = path.basename(wp, ".webp");
  if (!projectIds.includes(id)) {
    warnings.push({ type: "orphan_root_webp", file: path.basename(wp) });
  }
}

console.log(JSON.stringify({ projectIds, senior5Report, issues, warnings, verified: verified.length }, null, 2));
