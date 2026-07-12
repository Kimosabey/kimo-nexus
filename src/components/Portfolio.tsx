"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/work";
import { scrollToId } from "@/lib/scroll";
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

  return (
    <div style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>
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
          <Work onOpenProject={setModalProject} />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onOpenProject={(p) => setModalProject(p)} />
    </div>
  );
}
