// The no-LLM path. Runs when the daily free-tier budget is gone, the provider is
// down, or no API key is configured — which, on a 50-requests/day free tier, is a
// normal Tuesday rather than an error. So it's built to actually answer, not to
// apologise: deterministic scoring over the same facts the model would have seen.

import { about, experience, site } from "@/lib/content";
import { projects, type Project } from "@/lib/work";
import type { SiteAction } from "./prompt";

export type LocalAnswer = { text: string; projectIds: string[]; action: SiteAction | null };

const STOP = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "am", "do", "does", "did", "has", "have", "had", "he",
  "she", "they", "his", "her", "their", "him", "them", "it", "its", "i", "you", "we", "me", "my", "your", "of", "in",
  "on", "at", "to", "for", "with", "and", "or", "but", "if", "then", "than", "that", "this", "these", "those", "any",
  "some", "what", "which", "who", "whom", "how", "when", "where", "why", "can", "could", "would", "should", "will",
  "shall", "may", "might", "must", "about", "from", "into", "over", "under", "there", "here", "much", "many", "know",
  "knows", "use", "used", "uses", "using", "work", "works", "worked", "working", "project", "projects", "show", "tell",
  "give", "get", "got", "make", "made", "also", "really", "ever", "just", "like", "want", "need", "please", "thanks",
]);

const tokenize = (q: string): string[] =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[-.]+|[-.]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));

/** Substring match, but only on a word boundary — so "go" doesn't match "Django". */
const hits = (haystack: string, token: string): boolean => {
  const i = haystack.indexOf(token);
  if (i === -1) return false;
  const before = i === 0 ? " " : haystack[i - 1];
  return !/[a-z0-9]/.test(before);
};

/**
 * Weights are ordered by how much each field actually narrows things down. A group
 * ("Voice · Audio") scores lowest on purpose: it's shared by every member, so it
 * says which *area* was asked about and nothing about which project answers it.
 * Left higher, it buried the flagship work under whichever minor project happened
 * to repeat the word most.
 */
function scoreProject(p: Project, tokens: string[]): number {
  const title = p.title.toLowerCase();
  const tech = p.tech.join(" ").toLowerCase();
  const category = p.category.toLowerCase();
  const group = p.group.toLowerCase();
  const desc = p.desc.toLowerCase();

  let score = 0;
  for (const t of tokens) {
    if (hits(title, t)) score += 5;
    if (hits(tech, t)) score += 4;
    if (hits(category, t)) score += 3;
    if (hits(desc, t)) score += 2;
    if (hits(group, t)) score += 1;
  }
  // This is a portfolio: among comparable matches, lead with the showcased work.
  if (score > 0 && p.featured) score += 3;
  return score;
}

/** A title or tech hit — real evidence, as opposed to a passing word in a blurb. */
const STRONG_MATCH = 4;

const list = (items: string[]): string =>
  items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * Built from structured fields rather than the About prose, which is written in
 * Harshan's own first person ("I'm a full-stack engineer…") for the page. The
 * assistant speaks *about* him, so quoting that copy makes it impersonate him.
 */
function thirdPersonSummary(): string {
  const [yrs, platforms, mentored] = about.stats;
  return `${site.name} is a ${site.role} in ${site.location.split(" · ")[0]} — around ${yrs.value} years shipping, ${platforms.value}${platforms.suffix} ${platforms.label.toLowerCase()}, ${mentored.value}${mentored.suffix} ${mentored.label.toLowerCase()}. ${about.note}`;
}

const any = (q: string, words: string[]): boolean => words.some((w) => q.includes(w));

export function localAnswer(question: string): LocalAnswer {
  const q = question.toLowerCase();
  const tokens = tokenize(question);
  const current = experience.items.find((e) => e.current);

  // Rank first: "what's his experience with Kafka?" is a Kafka question, and a
  // generic intent word must not outrank a concrete tech hit sitting right beside it.
  const ranked = projects
    .map((p) => ({ p, score: scoreProject(p, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0))
    .slice(0, 3);
  const strong = ranked.length > 0 && ranked[0].score >= STRONG_MATCH;

  // --- Intent shortcuts. These two win outright: their trigger words appear
  //     nowhere in the project data, so they can't be shadowing a real match. ---
  if (any(q, ["email", "contact", "reach", "get in touch", "hire", "available", "availability", "interview", "call"])) {
    return {
      text: `The fastest route is email — ${site.email}. He's open to senior full-stack and AI engineering roles, and the contact form at the bottom of this page reaches the same inbox.`,
      projectIds: [],
      action: { kind: "scroll_to", value: "contact" },
    };
  }

  if (any(q, ["resume", "résumé", "cv", "pdf", "download"])) {
    return { text: `His résumé is at ${site.url}${site.resume}, and the Experience section below covers the same ground.`, projectIds: [], action: { kind: "scroll_to", value: "experience" } };
  }

  // --- These two are generic enough to shadow a real match ("tell me about his
  //     Kafka work", "experience with LangGraph?"), so they only apply when the
  //     question named nothing concrete. ---
  if (!strong && any(q, ["who is", "about him", "background", "summary", "introduce", "tell me about"])) {
    return { text: thirdPersonSummary(), projectIds: [], action: { kind: "scroll_to", value: "about" } };
  }

  if (!strong && any(q, ["years", "how long", "experience", "seniority", "currently", "where does he work", "employer", "company"])) {
    const text = current
      ? `He's been shipping for about ${about.stats[0].value} years and is currently ${current.role} at ${current.org} (${current.period}). Before that: ${experience.items[1].role} at ${experience.items[1].org}.`
      : thirdPersonSummary();
    return { text, projectIds: [], action: { kind: "scroll_to", value: "experience" } };
  }

  if (ranked.length === 0) {
    return {
      text: `I don't have anything on that in his portfolio data — I only know what's on this page. For anything beyond it, email him at ${site.email}.`,
      projectIds: [],
      action: null,
    };
  }

  const top = ranked[0].p;
  const names = ranked.map((r) => r.p.title);
  const groups = Array.from(new Set(ranked.map((r) => r.p.group)));

  const text =
    ranked.length === 1
      ? `Closest match is ${top.title} — ${top.desc} Built with ${list(top.tech)}.`
      : `${list(names)} are the closest matches. ${top.title} is the strongest: ${top.desc}`;

  return {
    text,
    projectIds: ranked.map((r) => r.p.id),
    // One clear match → open it. Several in one area → filter the grid to that area.
    action: ranked.length === 1 ? { kind: "open_project", value: top.id } : groups.length === 1 ? { kind: "filter_work", value: groups[0] } : { kind: "scroll_to", value: "work" },
  };
}
