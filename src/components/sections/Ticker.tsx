import { skills } from "@/lib/content";
import { Marquee } from "../ui/Marquee";

/** Full-bleed stack ticker between the hero and About. */
export function Ticker() {
  return (
    <div className="kn-ticker" role="region" aria-label="Technologies I work with">
      <Marquee duration={48}>
        {skills.marquee.map((t) => (
          <span key={t} className="kn-ticker-item">
            {t}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
