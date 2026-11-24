#!/usr/bin/env node
// Snapshot each linked repo's real language breakdown from GitHub's public API into
// src/lib/repoLanguages.json. Unauthenticated on purpose (public data, 60 req/h is plenty
// for ~25 repos). Re-run after pushing significant code to a project repo:
//   node scripts/sync-repo-languages.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const work = readFileSync(join(root, "src/lib/work.ts"), "utf8");
const repos = [...new Set([...work.matchAll(/https:\/\/github\.com\/Kimosabey\/([\w.-]+)/g)].map((m) => m[1]))];

const out = {};
for (const repo of repos) {
  const res = await fetch(`https://api.github.com/repos/Kimosabey/${repo}/languages`, { headers: { "User-Agent": "kimo-nexus-sync", Accept: "application/vnd.github+json" } });
  if (!res.ok) {
    console.error(`skip ${repo}: HTTP ${res.status}`);
    continue;
  }
  const bytes = await res.json();
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) continue;
  // Percent to one decimal; fold anything under 3% into "Other" so the bar stays legible.
  const langs = Object.entries(bytes)
    .map(([name, b]) => ({ name, pct: Math.round((b / total) * 1000) / 10 }))
    .sort((a, b) => b.pct - a.pct);
  const main = langs.filter((l) => l.pct >= 3);
  const other = Math.round((100 - main.reduce((a, l) => a + l.pct, 0)) * 10) / 10;
  out[repo] = other > 0.1 ? [...main, { name: "Other", pct: other }] : main;
  console.log(repo.padEnd(20), out[repo].map((l) => `${l.name} ${l.pct}%`).join(" · "));
}
writeFileSync(join(root, "src/lib/repoLanguages.json"), JSON.stringify({ syncedAt: new Date().toISOString().slice(0, 10), repos: out }, null, 2) + "\n");
