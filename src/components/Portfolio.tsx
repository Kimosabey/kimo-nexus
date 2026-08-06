"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/work";
import { scrollToId } from "@/lib/scroll";
import type { SiteAction } from "@/lib/assistant/prompt";
import { BackgroundFX } from "./BackgroundFX";
import { IntroLoader } from "./IntroLoader";
import { ScrollProgress } from "./ScrollProgress";
import { Rail } from "./Rail";
import { MobileNav } from "./MobileNav";
import { ProfileCard } from "./ProfileCard";
import { Footer } from "./Footer";
import { ProjectModal } from "./ProjectModal";
import { CommandPalette } from "./CommandPalette";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Experience } from "./sections/Experience";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";

export function Portfolio() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Lifted out of Work so the assistant can filter the grid.
  const [workFilter, setWorkFilter] = useState("All");
  // Both overlays lock body scroll and sit above the page, so navigation the
  // assistant proposes is staged here and runs once the palette is out of the way.
  const pendingRef = useRef<{ scroll?: string; project?: Project } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleAction = useCallback((a: SiteAction) => {
    if (a.kind === "filter_work") {
      setWorkFilter(a.value); // applies now; visible as soon as the palette closes
      pendingRef.current = { scroll: "#work" };
    } else if (a.kind === "scroll_to") {
      pendingRef.current = { scroll: `#${a.value}` };
    } else if (a.kind === "open_project") {
      const p = projects.find((x) => x.id === a.value);
      if (p) pendingRef.current = { project: p };
    }
  }, []);

  // An explicit pick (a Jump result, a citation chip) outranks whatever the
  // assistant staged — otherwise the staged nav would fire a frame later and win.
  const openProject = useCallback((p: Project) => {
    pendingRef.current = null;
    setModalProject(p);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!pending) return;
    // Next frame: the palette's scroll lock is released by then.
    requestAnimationFrame(() => {
      if (pending.project) setModalProject(pending.project);
      else if (pending.scroll) scrollToId(pending.scroll);
    });
  }, []);

  // overflow-x:clip contains the background FX horizontally WITHOUT creating a
  // scroll container (overflow:hidden would break the sticky profile card).
  return (
    <div style={{ position: "relative", minHeight: "100dvh", overflowX: "clip" }}>
      <a href="#main-content" className="kn-skip">Skip to content</a>
      <IntroLoader />
      <BackgroundFX />
      <ScrollProgress />
      <MobileNav />
      <Rail />

      <div className="kn-container">
        <ProfileCard onOpenPalette={() => setPaletteOpen(true)} onScrollTo={scrollToId} />
        <main id="main-content" tabIndex={-1} className="kn-main">
          <Hero onScrollTo={scrollToId} />
          <About />
          <Services />
          <Skills />
          <Work onOpenProject={setModalProject} filter={workFilter} onFilterChange={setWorkFilter} />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      <CommandPalette open={paletteOpen} onClose={closePalette} onOpenProject={openProject} onAction={handleAction} />
    </div>
  );
}
