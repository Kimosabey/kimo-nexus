import { testimonials } from "@/lib/content";
import { SectionHead } from "../ui/SectionHead";
import { Marquee } from "../ui/Marquee";

type T = (typeof testimonials.items)[number];

function Quote({ t }: { t: T }) {
  return (
    <figure className="kn-quote">
      <blockquote>{t.quote}</blockquote>
      <figcaption>
        <span className="kn-quote-av" aria-hidden="true">{t.name[0]}</span>
        <span style={{ minWidth: 0 }}>
          <span className="kn-quote-name">{t.name}</span>
          <span className="kn-quote-role">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Two counter-scrolling rows; each row holds all quotes so the loop never shows a gap. */
export function Testimonials() {
  const items = testimonials.items;
  const reversed = [...items].reverse();
  return (
    <section id="testimonials" className="kn-sec" aria-labelledby="testimonials-title">
      <div className="kn-wrap">
        <SectionHead id="testimonials" label={testimonials.eyebrow} lines={testimonials.headline} />
      </div>
      <div className="kn-peers kn-marquee-host">
        <Marquee duration={70}>
          {items.map((t) => (
            <Quote key={t.name} t={t} />
          ))}
        </Marquee>
        {/* The second row repeats the same quotes for motion only — hidden from assistive tech. */}
        <div aria-hidden="true">
          <Marquee duration={80} reverse>
            {reversed.map((t) => (
              <Quote key={t.name} t={t} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
