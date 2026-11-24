"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Lock } from "lucide-react";
import { projects, featuredProjects, filters, type Project } from "@/lib/work";
import { scrollToId } from "@/lib/scroll";
import { ease } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { ProjectThumb } from "../ui/ProjectThumb";
import { RepoCover } from "../ui/RepoCover";
import { FINE_POINTER, useMedia } from "../ui/useMedia";

const GALLERY = featuredProjects.slice(0, 6);
const ARCHIVE_PREVIEW = 12;
const pad = (n: number) => String(n).padStart(2, "0");

/** Pinning needs room and a precise pointer; touch and reduced-motion get a native snap strip. */
function useCanPin() {
  const reduce = useReducedMotion();
  return useMedia(`(min-width: 1024px) and ${FINE_POINTER}`) && !reduce;
}

function GalleryCard({ p, i, onOpen, wide }: { p: Project; i: number; onOpen: (p: Project) => void; wide?: boolean }) {
  return (
    <button type="button" className="kn-gcard" onClick={() => onOpen(p)} data-cursor="Open" style={wide ? { flex: "0 0 clamp(380px, 38vw, 580px)" } : undefined} aria-label={`${p.title} — ${p.category}. Open details`}>
      <div className="kn-gcard-media">
        <RepoCover project={p} index={i} />
      </div>
      <div className="kn-gcard-body">
        <h3>{p.title}</h3>
        <span className="kn-gcard-no">{pad(i + 1)}</span>
        <p>{p.desc}</p>
        <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {p.tech.slice(0, 3).map((t) => (
            <span key={t} className="kn-chip">{t}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ArchiveCard({ wide }: { wide?: boolean }) {
  return (
    <button
      type="button"
      className="kn-gcard"
      onClick={() => scrollToId("#archive")}
      data-cursor="Archive"
      style={{ ...(wide ? { flex: "0 0 clamp(300px, 26vw, 400px)" } : {}), justifyContent: "space-between", padding: 28, background: "var(--surface-2)" }}
    >
      <span className="kn-label">Archive</span>
      <span>
        <span style={{ display: "block", fontFamily: "var(--fd)", fontWeight: 500, fontSize: "clamp(56px,6vw,96px)", lineHeight: 1, letterSpacing: "-.05em" }}>
          {projects.length}
          <span className="kn-accent kn-serif" style={{ fontSize: ".5em", marginLeft: 6 }}>projects</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, color: "var(--muted)", fontSize: 14 }}>
          Browse the full index <ArrowDown size={15} strokeWidth={1.8} />
        </span>
      </span>
    </button>
  );
}

function PinnedGallery({ onOpen }: { onOpen: (p: Project) => void }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDist(Math.max(0, track.scrollWidth - track.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);

  return (
    <div ref={pinRef} className="kn-gallery-pin" style={{ height: `calc(100dvh + ${dist}px)` }}>
      <div className="kn-gallery-sticky">
        <div className="kn-wrap">
          <div className="kn-gallery-head">
            <span className="kn-label">Featured · {GALLERY.length} of {featuredProjects.length}</span>
            <div className="kn-gallery-progress" aria-hidden="true">
              <motion.span style={{ scaleX: smooth }} />
            </div>
          </div>
          <motion.div ref={trackRef} className="kn-gallery-track" style={{ x }}>
            {GALLERY.map((p, i) => (
              <GalleryCard key={p.id} p={p} i={i} onOpen={onOpen} wide />
            ))}
            <ArchiveCard wide />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StripGallery({ onOpen }: { onOpen: (p: Project) => void }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const page = (dir: number) => {
    const el = stripRef.current;
    const card = el?.querySelector<HTMLElement>(".kn-gcard");
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 14), behavior: "smooth" });
  };
  return (
    <div className="kn-wrap">
      <div className="kn-gallery-head">
        <span className="kn-label">Featured · {GALLERY.length} of {featuredProjects.length}</span>
        <div className="kn-strip-nav">
          <button type="button" className="kn-strip-btn" aria-label="Previous project" onClick={() => page(-1)}>
            <ArrowLeft size={18} strokeWidth={1.8} />
          </button>
          <button type="button" className="kn-strip-btn" aria-label="Next project" onClick={() => page(1)}>
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      <div ref={stripRef} className="kn-gallery-strip" data-hidescroll>
        {GALLERY.map((p, i) => (
          <GalleryCard key={p.id} p={p} i={i} onOpen={onOpen} />
        ))}
        <ArchiveCard />
      </div>
    </div>
  );
}

function ActionIcon({ p }: { p: Project }) {
  if (p.action === "repo") return <ArrowUpRight size={18} strokeWidth={1.8} aria-label="Open source" />;
  if (p.action === "prop") return <Lock size={16} strokeWidth={1.8} aria-label="Proprietary" />;
  return <BookOpen size={16} strokeWidth={1.8} aria-label="Academic" />;
}

/** Dense, scannable index for the interviewer persona; cursor preview on fine pointers. */
function Archive({ onOpen, filter, onFilterChange }: { onOpen: (p: Project) => void; filter: string; onFilterChange: (f: string) => void }) {
  const reduce = useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<Project | null>(null);
  const fine = useMedia(FINE_POINTER);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28 });
  const sy = useSpring(my, { stiffness: 260, damping: 28 });

  const filtered = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.group === filter)), [filter]);
  const counts = useMemo(() => Object.fromEntries(filters.map((f) => [f, f === "All" ? projects.length : projects.filter((p) => p.group === f).length])), []);
  const visible = showAll || filter !== "All" ? filtered : filtered.slice(0, ARCHIVE_PREVIEW);
  const preview = fine && !reduce;

  return (
    <div id="archive" className="kn-archive kn-wrap" style={{ scrollMarginTop: 100 }}>
      <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 22 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--fd)", fontWeight: 500, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-.04em" }}>
          The <span className="kn-serif kn-accent">archive</span>
        </h3>
        <span className="kn-label" aria-live="polite">
          {visible.length} of {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </Reveal>

      <Reveal>
        <div className="kn-filters" data-hidescroll role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} type="button" className="kn-filter" data-active={filter === f} aria-pressed={filter === f} onClick={() => onFilterChange(f)}>
              {f}
              <sup>{counts[f]}</sup>
            </button>
          ))}
        </div>
      </Reveal>

      <ul
        className="kn-rows"
        onPointerEnter={(e) => {
          if (!preview) return;
          sx.jump(e.clientX + 32);
          sy.jump(e.clientY - 110);
          mx.jump(e.clientX + 32);
          my.jump(e.clientY - 110);
        }}
        onPointerMove={(e) => {
          if (!preview) return;
          mx.set(e.clientX + 32);
          my.set(e.clientY - 110);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {visible.map((p, i) => (
          <li key={p.id} className="kn-row" onPointerEnter={() => preview && setHovered(p)}>
            <button type="button" className="kn-row-btn" onClick={() => onOpen(p)} data-cursor={preview ? undefined : "View"}>
              <span className="kn-row-no">{pad(i + 1)}</span>
              <span className="kn-row-title">{p.title}</span>
              <span className="kn-row-cat">{p.category}</span>
              <span className="kn-row-stack">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="kn-chip">{t}</span>
                ))}
              </span>
              <span className="kn-row-end" style={{ justifyContent: "flex-end" }}>
                <ActionIcon p={p} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 24 }}>No projects in this category.</p> : null}

      {filter === "All" && filtered.length > ARCHIVE_PREVIEW ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button type="button" className="kn-btn kn-btn--ghost" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
            {showAll ? "Show fewer" : `Show all ${filtered.length}`}
          </button>
        </div>
      ) : null}

      {preview ? (
        <motion.div
          className="kn-preview"
          aria-hidden="true"
          style={{ x: sx, y: sy }}
          initial={false}
          animate={hovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -2 }}
          transition={{ duration: 0.3, ease: ease.out }}
        >
          <AnimatePresence initial={false}>
            {hovered ? (
              <motion.div key={hovered.id} style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {hovered.action === "repo" ? <RepoCover project={hovered} compact /> : <ProjectThumb project={hovered} sizes="320px" grayscale={false} />}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}

// Filter state lives in Portfolio so the assistant can drive it too.
export function Work({ onOpenProject, filter, onFilterChange }: { onOpenProject: (p: Project) => void; filter: string; onFilterChange: (f: string) => void }) {
  const canPin = useCanPin();
  return (
    <section id="work" className="kn-sec" aria-labelledby="work-title" style={{ paddingBottom: "clamp(80px, 9vw, 140px)" }}>
      <div className="kn-wrap">
        <SectionHead
          id="work"
          label="Selected work"
          lines={["Things I've {accent:shipped}."]}
          sub="Open-source systems I've designed and built end to end, plus client and research work under NDA. Open any project for the stack and the repo."
        />
      </div>
      {canPin ? <PinnedGallery onOpen={onOpenProject} /> : <StripGallery onOpen={onOpenProject} />}
      <Archive onOpen={onOpenProject} filter={filter} onFilterChange={onFilterChange} />
    </section>
  );
}
