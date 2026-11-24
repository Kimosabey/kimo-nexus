import type { Project } from "@/lib/work";
import data from "@/lib/repoLanguages.json";

type Lang = { name: string; pct: number };
const repos = data.repos as Record<string, Lang[]>;

/** The repo slug behind a project's GitHub URL, if any. */
export const repoSlug = (p: Project) => p.url.match(/github\.com\/Kimosabey\/([\w.-]+)/)?.[1] ?? null;

// Single-hue ramp: parrot, yellow-green, muted parrot, neutral — dominant language first.
const SHADE = ["var(--accent)", "var(--g2)", "color-mix(in srgb, var(--accent) 40%, var(--surface-2))", "color-mix(in srgb, var(--ink) 28%, var(--surface-2))"];

/**
 * Typographic project cover built from real data: title, category, repo path and the repo's
 * actual language breakdown (GitHub API snapshot, scripts/sync-repo-languages.mjs). Replaces
 * generated illustrations as the card visual — nothing here is a picture of something that
 * isn't real.
 */
export function RepoCover({ project: p, index, compact }: { project: Project; index?: number; compact?: boolean }) {
  const slug = repoSlug(p);
  const langs = (slug && repos[slug]) || [];
  return (
    <div className={compact ? "kn-cover kn-cover--compact" : "kn-cover"} aria-hidden="true">
      <div className="kn-cover-top">
        <span>{p.category}</span>
        {index !== undefined ? <span className="kn-cover-no">{String(index + 1).padStart(2, "0")}</span> : null}
      </div>
      <div className="kn-cover-title">{p.title}</div>
      {langs.length ? (
        <div className="kn-cover-langs">
          <div className="kn-cover-bar">
            {langs.map((l, i) => (
              <i key={l.name} style={{ width: `${l.pct}%`, background: l.name === "Other" ? "var(--hairline)" : SHADE[Math.min(i, SHADE.length - 1)] }} />
            ))}
          </div>
          <div className="kn-cover-legend">
            {langs
              .filter((l) => l.name !== "Other")
              .slice(0, 3)
              .map((l, i) => (
                <span key={l.name}>
                  <b style={{ background: SHADE[Math.min(i, SHADE.length - 1)] }} />
                  {l.name} <em>{Math.round(l.pct)}%</em>
                </span>
              ))}
          </div>
          {!compact && slug ? <div className="kn-cover-path">github.com/Kimosabey/{slug}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
