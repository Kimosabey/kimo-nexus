// The assistant's entire world. Derived from the same modules the page renders
// from (content.ts / work.ts) — never a second copy of the copy. Edit the site,
// and the assistant's knowledge changes with it.

import { about, experience, services, site, skills } from "@/lib/content";
import { projects } from "@/lib/work";

/** Section ids the assistant is allowed to scroll to (mirrors `sections`). */
export const SECTION_IDS = ["hero", "about", "services", "skills", "work", "experience", "testimonials", "contact"] as const;

/** Project ids + work groups, for validating a model-proposed action. */
export const PROJECT_IDS: string[] = projects.map((p) => p.id);
export const WORK_GROUPS: string[] = Array.from(new Set(projects.map((p) => p.group)));

/**
 * Compact, token-frugal context block. Kept terse deliberately: the whole thing
 * ships on every request, and the free-tier budget is 50 requests/day — so every
 * token spent on prose formatting is a token not spent on the answer.
 */
export function buildKnowledge(): string {
  const projectLines = projects
    .map((p) => `- [${p.id}] ${p.title} (${p.group}) — ${p.desc} Tech: ${p.tech.join(", ")}.${p.url ? ` Repo: ${p.url}` : " Client work, no public repo."}`)
    .join("\n");

  const skillLines = skills.groups.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n");

  const expLines = experience.items.map((e) => `- ${e.role} @ ${e.org} (${e.period})${e.current ? " [current]" : ""} — ${e.desc}`).join("\n");

  const serviceLines = services.items.map((s) => `- ${s.title}: ${s.desc}`).join("\n");

  return [
    `# ${site.name} — ${site.role}`,
    `Location: ${site.location}. Contact: ${site.email}. Résumé: ${site.url}${site.resume}`,
    ``,
    `## Summary`,
    about.paragraphs.join(" "),
    about.note,
    ``,
    `## Focus areas`,
    serviceLines,
    ``,
    `## Stack`,
    skillLines,
    ``,
    `## Experience & education`,
    expLines,
    ``,
    `## Projects (${projects.length}) — the id in [brackets] is what you pass to open_project`,
    projectLines,
    ``,
    `## Work groups (for filter_work)`,
    WORK_GROUPS.join(" | "),
  ].join("\n");
}
