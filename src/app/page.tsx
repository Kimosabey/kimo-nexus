"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight,
  Cpu, Eye, Zap, Server, Brain, Database, Palette,
  Github, Linkedin, Twitter, Terminal, Code2, Globe
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import { projects, Project } from "@/lib/projects";

// --- Components ---

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Tilt State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 400], [5, -5]); // Reverse axis for natural tilt
  const rotateY = useTransform(x, [0, 600], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0c] transition-all duration-200 ease-out min-h-[24rem] md:min-h-auto ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* 3D Content Container */}
      <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 pointer-events-none" />

      {/* Dynamic Cursor Spotlight Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(107, 123, 255, 0.08), transparent 40%)`
        }}
      />

      {/* Background Image (Infographic) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-30 group-hover:blur-[2px] transition-all"
        style={{ backgroundImage: `url('${project.image}')` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/95 to-background-dark/40 z-10" />

      {/* Content - Pushed forward in 3D */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between transform transition-transform duration-200" style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}>
        <div>
          <div className="flex justify-between items-start">
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono text-primary mb-4 shadow-sm">
              {project.category}
            </span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              <a href={project.repoUrl} target="_blank" className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"><Github className="w-4 h-4" /></a>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
        </div>

        <div>
          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none text-sm md:text-base leading-relaxed font-light">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech: string) => (
              <span key={tech} className="text-xs font-mono text-gray-400 px-2 py-1 border border-white/10 rounded bg-black/40 backdrop-blur-sm">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs font-mono text-gray-500 px-2 py-1">+{project.techStack.length - 4}</span>
            )}
          </div>
          <div className="mt-6 flex items-center gap-2 text-white font-medium text-sm group/btn cursor-pointer">
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mobile-show">View Code</span>
          </div>
        </div>
      </div>

      {/* Floating Flow Tooltip - follows cursor */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute pointer-events-none z-50 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(107,123,255,0.4)] backdrop-blur-md border border-white/20 whitespace-nowrap hidden md:block"
            style={{
              left: mousePos.x,
              top: mousePos.y - 40,
              x: "-50%"
            }}
          >
            {project.highlight}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border Beam Effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1.5px circle at ${mousePos.x}px ${mousePos.y}px, rgba(107, 123, 255, 0.8) 0%, transparent 100%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: '1.5rem',
        }}
      >
        <div className="w-full h-full bg-transparent rounded-3xl" />
      </div>
    </motion.article>
  );
}

// --- Main Page ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.5, ease: "easeOut" }
    })
  };



  const titleText = "Architecting".split("");


  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" style={{ scaleX }} />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay filter contrast-120 brightness-100">
        <svg className="w-full h-full"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" /></svg>
      </div>

      <div
        className="fixed pointer-events-none inset-0 z-30 transition-opacity duration-300"
        style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(107, 123, 255, 0.03), transparent 80%)` }}
      />

      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="pointer-events-auto flex items-center gap-2 p-1.5 pr-2 bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-primary/10"
        >
          {/* Logo / Home */}
          <a href="#" className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full text-white font-bold font-mono tracking-tighter shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            HA
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 mx-2">
            {[
              { name: 'Projects', href: '#projects' },
              { name: 'About', href: '#about' },
              { name: 'Experience', href: '#experience' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all hover:bg-white/5 rounded-full relative group"
              >
                {item.name}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </a>
            ))}
          </div>

          <div className="w-px h-6 bg-white/10 mx-1 hidden md:block"></div>

          {/* Action Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-bold transition-all hover:bg-gray-100 flex items-center gap-2"
            href="#contact"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </nav>

      <main className="relative z-10 flex flex-col items-center w-full bg-background-dark">
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        {/* Hero */}
        <section ref={heroRef} className="min-h-screen w-full flex items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <motion.div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
                <div className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></div>
                <span className="text-xs font-mono font-medium text-green-400/80 uppercase tracking-widest">System Online</span>
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] flex flex-col">
                <div className="flex overflow-hidden">
                  {titleText.map((char, i) => (
                    <motion.span custom={i} variants={textVariants} initial="hidden" animate="visible" key={i}>
                      {char}
                    </motion.span>
                  ))}
                </div>
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary-dark">
                  Digital Minds
                </motion.span>
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-lg text-gray-400 max-w-xl leading-relaxed font-light border-l-2 border-primary/50 pl-6">
                Senior Full Stack Engineer combining <span className="text-white font-medium">nearly 5 years</span> of architectural depth with cutting-edge R&D in <span className="text-white font-medium">Generative AI</span>, Voice Synthesis, and Distributed Systems.
              </motion.p>
              <div className="flex flex-wrap gap-4 mt-2">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-3 shadow-[0_0_40px_-10px_rgba(107,123,255,0.5)]">Explore Work <ArrowDown className="w-5 h-5 animate-bounce" /></motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com/Kimosabey" target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md"><Github className="w-5 h-5" /> GitHub Profile</motion.a>
              </div>
            </div>
            <motion.div className="relative h-[500px] w-full flex items-center justify-center order-1 lg:order-2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="relative w-[400px] h-[500px] group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-3xl blur-[80px] opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-out z-10" style={{ backgroundImage: "url('/profile.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full"><p className="font-mono text-xs text-primary mb-1">CURRENTLY BUILDING</p><p className="text-white font-bold text-xl">Next-Gen AI Agents</p></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Philosophy */}
        <section className="w-full max-w-7xl px-6 py-32 border-t border-white/5" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Forging complexity into <span className="text-gray-500">simplicity</span>.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Senior Full Stack Engineer combining nearly 5 years of architectural depth with cutting-edge R&D in Generative AI, Voice Synthesis (TTS/ASR), and Distributed Systems.
              </p>
              <div className="flex gap-4 mt-8"><Terminal className="w-6 h-6 text-white/50" /><Code2 className="w-6 h-6 text-white/50" /><Cpu className="w-6 h-6 text-white/50" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Animated Features Grid */}
              {/* Animated Brain (Neural Audio) */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
                    />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                      d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Neural Audio</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Architecting next-gen TTS & ASR pipelines.</p>
              </div>

              {/* Animated Server (Scalable Systems) */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <motion.line x1="6" y1="6" x2="6.01" y2="6" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                    <motion.line x1="6" y1="18" x2="6.01" y2="18" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Scalable Systems</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Building fault-tolerant React/Node architectures.</p>
              </div>

              {/* Animated Zap (Data Intelligence) */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <motion.polygon
                      initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
                      whileInView={{ pathLength: 1, fill: "currentColor" }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Data Intelligence</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Crafting high-performance insight dashboards.</p>
              </div>

              {/* Animated Eye (Tech Leadership) */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    />
                    <motion.circle
                      cx="12" cy="12" r="3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Tech Leadership</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Driving agile velocity & engineering mentorship.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience / Career Trajectory - MODERNIZED */}
        <section className="w-full max-w-4xl px-6 py-20 mx-auto" id="experience">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Career Trajectory</span>
            <h2 className="text-4xl font-bold text-white">Professional Evolution</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              {
                role: "Product Engineer (Full Stack & AI)",
                company: "Lingotran Pvt. Ltd.",
                period: "Jan 2023 - Present (~3 Years)",
                desc: "Driving R&D for next-generation speech interfaces, integrating proprietary NLP and Neural Voice models. Architecting Python/Node.js microservices and leading sprint delivery as Scrum Lead."
              },
              {
                role: "Full Stack Engineer",
                company: "Veriteam Software Solutions",
                period: "Feb 2021 – Jul 2022 (~1.5 Years)",
                desc: "Delivered enterprise CMS ecosystems including 'Tabedaar' (Admin/Merchant Dashboards) and 'Zeus Biotech' (Order Management). Built standalone FinTech solutions for Chit Funds and scaled engineering capacity by creating 35+ academic projects."
              },
              {
                role: "Master of Computer Applications",
                company: "The NIE College, Mysore",
                period: "2017 - 2020",
                desc: "Specialized in Advanced Algorithms and Distributed Computing. Graduated with Distinction (8.2 CGPA)."
              }
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0a0a0c] shadowshrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary transition-colors">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white text-lg">{job.role}</h3>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{job.period}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-400 mb-4">{job.company}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{job.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
            >
              <ArrowDown className="w-4 h-4" />
              Download Resume
            </motion.a>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full max-w-[1400px] px-6 py-32" id="projects">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div><span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Portfolio</span><h2 className="text-4xl md:text-6xl font-bold text-white">Selected Works</h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#08080a] border-t border-white/5 pt-32 pb-12 relative overflow-hidden" id="contact">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[100px] bg-primary/10 blur-[50px] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Let's create <br /> the <span className="text-primary italic">future</span>.</h2>
            <a className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_white]" href="mailto:harshan.aiyappa@gmail.com">harshan.aiyappa@gmail.com</a>
            <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-gray-500 text-sm">
              <p className="font-mono">© 2026 Harshan Aiyappa.</p>
              <div className="flex gap-8">
                {[{ name: "Twitter", url: "https://twitter.com/harshan_aiyappa", icon: Twitter }, { name: "LinkedIn", url: "https://linkedin.com/in/harshan-aiyappa", icon: Linkedin }, { name: "GitHub", url: "https://github.com/Kimosabey", icon: Github }].map((social) => (
                  <a key={social.name} className="hover:text-white transition-colors flex items-center gap-2 group" href={social.url} target="_blank"><social.icon className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> {social.name}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
