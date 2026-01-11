"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight,
  Cpu, Eye, Zap, Server, Brain, Database, Palette,
  Github, Linkedin, Twitter, Terminal, Code2, Globe
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { projects, Project } from "@/lib/projects";
import Lenis from 'lenis';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
  SiPostgresql, SiDocker, SiAmazonwebservices, SiTensorflow, SiPytorch, SiOpenai,
  SiFramer, SiGit, SiMongodb, SiRedis
} from 'react-icons/si';
import LogoLoop from "@/components/ui/LogoLoop";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import dynamic from 'next/dynamic';

// Lazy load Vanta for better performance
const VantaWaves = dynamic(() => import('@/components/VantaWaves'), {
  ssr: false,
  loading: () => null
});

// Toggle Vanta Waves (set to false to use current mesh gradients)
const USE_VANTA_BACKGROUND = true; // ✨ ENABLED

// --- Components ---


function Preloader() {
  const [ended, setEnded] = useState(false);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate progress without triggering React re-renders (Performance Optimization)
    const startTime = Date.now();
    const duration = 2000; // 2s duration matching branding timer

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.floor(progress)}%`;
      }

      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setEnded(true);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-lg flex flex-col items-center justify-center font-mono"
    >
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-xs text-cyan-400/80 uppercase tracking-widest">
          <span>Wave_Initialize</span>
          <span ref={progressTextRef}>0%</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400 shadow-[0_0_10px_#00d4ff]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
        <div className="text-[10px] text-cyan-300/60 pt-2 text-center">
          ESTABLISHING SECURE CONNECTION...
        </div>
      </div>
    </motion.div>
  )
}






// --- Main Page ---

const techLogos = [
  // Frontend & Frameworks
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiFramer />, title: "Framer Motion" },

  // Backend & Languages
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiPython />, title: "Python" },

  // AI & ML
  { node: <SiTensorflow />, title: "TensorFlow" },
  { node: <SiPytorch />, title: "PyTorch" },
  { node: <SiOpenai />, title: "OpenAI" },

  // Databases
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiRedis />, title: "Redis" },

  // DevOps & Cloud
  { node: <SiDocker />, title: "Docker" },
  { node: <SiAmazonwebservices />, title: "AWS" },
  { node: <SiGit />, title: "Git" },
];

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax Values
  const heroImageY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroTextY = useTransform(scrollY, [0, 1000], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVantaReady, setIsVantaReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Minimum branding time (2s)
    const brandingTimer = setTimeout(() => setMinTimeElapsed(true), 2000);

    // Fail-safe: Force load if Vanta takes too long (5s)
    const safetyTimer = setTimeout(() => setIsVantaReady(true), 5000);

    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(brandingTimer);
      clearTimeout(safetyTimer);
      lenis.destroy();
    }
  }, []);

  // Sync Loading State
  useEffect(() => {
    if (minTimeElapsed && (isVantaReady || !USE_VANTA_BACKGROUND)) {
      setIsLoading(false);
    }
  }, [minTimeElapsed, isVantaReady]);


  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03 + 3.8, duration: 0.5, ease: "easeOut" as const } // Synced with 3.5s loader + 0.3s buffer
    })
  };



  const titleText = "Architecting".split("");


  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" style={{ scaleX }} />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay filter contrast-120 brightness-100">
        <svg className="w-full h-full"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" /></svg>
      </div>

      <div
        className="fixed pointer-events-none inset-0 z-30 transition-opacity duration-300"
        style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(107, 123, 255, 0.03), transparent 80%)` }}
      />

      {/* Ambient Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* NEW HEADER: Split HUD Design */}
      <Header />

      <main className="relative z-10 flex flex-col items-center w-full bg-background-dark overflow-hidden">
        {/* Optional Vanta Waves Background */}
        {USE_VANTA_BACKGROUND ? (
          <VantaWaves onLoaded={() => setIsVantaReady(true)}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/40 to-[#0a0a0c]/90 pointer-events-none" />
          </VantaWaves>
        ) : (
          <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>
        )}

        {/* Hero - iOS FLUX STYLE */}
        <section ref={heroRef} className="min-h-[100dvh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 lg:pt-24 pb-12 md:pb-20 relative overflow-hidden">

          {/* 🔄 MESH GRADIENTS DISABLED - Uncomment entire block below to restore */}
          {/* 
          <div className="absolute inset-0 -z-10">
            Base Gradient Layer
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-[#1a0a2e] to-[#0a0a0c]" />

          Mesh Gradient Orbs - Fluid Animation
          <motion.div
            className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.2, 0.9, 1],
              background: [
                'radial-gradient(circle, rgba(107,123,255,0.6), rgba(107,123,255,0) 70%)',
                'radial-gradient(circle, rgba(184,79,255,0.6), rgba(184,79,255,0) 70%)',
                'radial-gradient(circle, rgba(107,123,255,0.6), rgba(107,123,255,0) 70%)'
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          <motion.div
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-35"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 50, -40, 0],
              scale: [1, 0.85, 1.15, 1],
              background: [
                'radial-gradient(circle, rgba(184,79,255,0.5), rgba(184,79,255,0) 70%)',
                'radial-gradient(circle, rgba(255,107,157,0.5), rgba(255,107,157,0) 70%)',
                'radial-gradient(circle, rgba(184,79,255,0.5), rgba(184,79,255,0) 70%)'
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
          />

          <motion.div
            className="absolute top-[50%] right-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
            animate={{
              x: [0, 30, -50, 0],
              y: [0, -50, 40, 0],
              scale: [1, 1.3, 0.95, 1],
              background: [
                'radial-gradient(circle, rgba(255,107,157,0.4), transparent 70%)',
                'radial-gradient(circle, rgba(255,160,107,0.4), transparent 70%)',
                'radial-gradient(circle, rgba(255,107,157,0.4), transparent 70%)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4
            }}
          />

          <motion.div
            className="absolute bottom-[30%] left-[5%] w-[450px] h-[450px] rounded-full blur-[110px] opacity-25"
            animate={{
              x: [0, 70, -40, 0],
              y: [0, 30, -60, 0],
              scale: [1, 0.9, 1.2, 1],
              background: [
                'radial-gradient(circle, rgba(107,255,230,0.3), transparent 70%)',
                'radial-gradient(circle, rgba(107,123,255,0.3), transparent 70%)',
                'radial-gradient(circle, rgba(107,255,230,0.3), transparent 70%)'
              ]
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 6
            }}
          />

          Overlay Gradient for Depth
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/20 to-[#0a0a0c]/80" />
        </div>
          */}


          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative" style={{ perspective: '1200px' }}>
            {/* Text Content - Responsive Layout */}
            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 order-2 lg:order-1 relative"
              style={{
                transformStyle: 'preserve-3d',
                y: heroTextY,
                opacity: heroOpacity
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 w-fit mx-auto lg:mx-0 backdrop-blur-xl"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></div>
                <span className="text-[10px] md:text-xs font-mono font-medium text-cyan-400/90 uppercase tracking-widest">System Online</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem] font-black tracking-tighter text-white leading-[0.95] flex flex-col uppercase break-words"
                style={{ transform: 'translateZ(30px)' }}
              >
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>Architecting</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-teal-400">Digital Minds</motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="text-sm md:text-base lg:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                style={{ transform: 'translateZ(25px)' }}
              >
                Senior Full Stack Engineer combining <span className="text-white font-medium">5 years</span> of expertise in <span className="text-white font-medium">Generative AI</span>, Voice Synthesis, and Distributed Systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mt-2 justify-center lg:justify-start"
                style={{ transform: 'translateZ(35px)' }}
              >
                <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-500 text-[#0a0a0c] font-bold rounded-full hover:from-cyan-500 hover:to-teal-600 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(0,212,255,0.6)] min-h-[48px] md:min-h-[56px] text-sm md:text-base" aria-label="Explore my work">Explore Work <ArrowDown className="w-4 h-4" /></a>
              </motion.div>
            </motion.div>

            {/* HERO IMAGE - WAVE-THEMED, CLEAN & SIMPLE */}
            <motion.div
              className="relative h-[400px] md:h-[550px] lg:h-[650px] w-full flex items-center justify-center order-1 lg:order-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.3, duration: 1.2, ease: 'easeOut' }}
              style={{ y: heroImageY, opacity: heroOpacity }}
            >
              <div className="relative w-full max-w-[450px] lg:max-w-[550px] aspect-[4/5] flex items-center justify-center">

                {/* Subtle Ocean Glow - Static */}
                <div
                  className="absolute inset-0 blur-[140px] rounded-full opacity-30"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25), transparent)'
                  }}
                />

                {/* Clean Image with Liquid Wave Fade */}
                <div
                  className="relative w-full h-full z-10"
                  style={{
                    backgroundImage: "url('/profile.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 70%, transparent 85%)',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 70%, transparent 85%)'
                  }}
                >
                  {/* Subtle Cyan Rim Light (Wave reflection) */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 204, 0.15), transparent 50%)',
                      mixBlendMode: 'screen'
                    }}
                  />
                </div>

              </div>
            </motion.div>
          </div>
        </section>


        {/* --- Tech Stack - VALIDATED & RESPONSIVE --- */}
        <section className="py-16 md:py-20 lg:py-24 border-t border-white/5 bg-black/20 backdrop-blur-sm relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
            <motion.div
              className="flex items-center justify-center gap-2 md:gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-400/50" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5 md:gap-2">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span className="hidden sm:inline">[ TECH_STACK::LOADED ]</span>
                <span className="sm:hidden">[ TECH_STACK ]</span>
              </span>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-cyan-400/50" />
            </motion.div>
          </div>
          <LogoLoop logos={techLogos} speed={40} direction="left" />
        </section>


        {/* Philosophy - VALIDATED & RESPONSIVE */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-white/5" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div>
              {/* Premium Section Header */}
              <motion.div
                className="mb-4 md:mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <motion.div
                    className="w-1 h-6 md:h-8 bg-gradient-to-b from-cyan-400 to-teal-500 origin-top"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase">
                    // SECTION_01
                  </span>
                </div>
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Forging complexity into </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">simplicity</span>
                  <span className="text-cyan-400">.</span>
                </motion.h2>
              </motion.div>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
                Senior Full Stack Engineer combining nearly 5 years of architectural depth with cutting-edge R&D in Generative AI, Voice Synthesis (TTS/ASR), and Distributed Systems.
              </p>
              <div className="flex gap-3 md:gap-4 mt-6 md:mt-8"><Terminal className="w-5 h-5 md:w-6 md:h-6 text-white/50" /><Code2 className="w-5 h-5 md:w-6 md:h-6 text-white/50" /><Cpu className="w-5 h-5 md:w-6 md:h-6 text-white/50" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {/* Animated Features Grid */}
              {/* Animated Brain (Neural Audio) */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400">
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
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400">
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
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400">
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
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 mb-4 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400">
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

        {/* Experience / Career Trajectory - VALIDATED & RESPONSIVE */}
        <section className="w-full max-w-5xl px-4 sm:px-6 md:px-12 py-16 md:py-24 lg:py-32 mx-auto" id="experience">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-mono text-xs md:text-sm tracking-widest uppercase mb-2 block">Career Trajectory</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Professional Evolution</h2>
          </div>

          <div className="space-y-8 md:space-y-12 relative">
            {/* Neural Spine Line - animated gradient */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2">
              <motion.div
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-full bg-gradient-to-b from-primary via-purple-500 to-primary box-shadow-[0_0_20px_#6b7bff]"
              />
            </div>

            {[
              {
                role: "Full Stack, AI, Hybrid Engineer",
                company: "Lingotran Pvt. Ltd.",
                period: "Jan 2023 - Present (~3 Years)",
                desc: "Driving R&D for next-generation speech interfaces. Integrating proprietary NLP/Neural Voice models. Architecting Python/Node.js microservices."
              },
              {
                role: "Full Stack Engineer",
                company: "Veriteam Software Solutions",
                period: "Feb 2021 – Jul 2022 (~1.5 Years)",
                desc: "Delivered enterprise CMS ecosystems including 'Tabedaar' and 'Zeus Biotech'. Scaled engineering capacity by 35+ academic projects and client projects."
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
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between md:justify-normal ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}
              >
                {/* Neural Node Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0a0a0c] border border-primary z-10 shadow-[0_0_15px_rgba(107,123,255,0.5)] group-hover:scale-150 transition-transform duration-500">
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Content Card with Glass/Holo effect */}
                <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Scanline */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000"></div>

                  <div className="flex flex-col mb-2">
                    <h3 className="font-display font-bold text-white text-xl tracking-tight">{job.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider">{job.company}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span className="text-white/40 text-xs font-mono">{job.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4 mt-4">{job.desc}</p>
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
              className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <ArrowDown className="w-4 h-4" />
              Download Resume
            </motion.a>
          </div>
        </section>

        {/* Projects Grid - VALIDATED & RESPONSIVE */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32" id="projects">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-2xl">
              <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 block">Portfolio</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">Selected Works</h2>
            </div>
            <div className="hidden md:block pb-2">
              <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                   // EXPLORE_CASE_STUDIES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Footer - VALIDATED & RESPONSIVE */}
        <footer className="w-full bg-[#08080a] border-t border-white/5 pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-24 relative overflow-hidden" id="contact">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[100px] bg-cyan-400/10 blur-[50px] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight">Let's create <br className="hidden md:block" /> the <span className="text-cyan-400 italic">future</span>.</h2>
            <a
              className="inline-flex min-h-[52px] md:min-h-[56px] lg:min-h-[60px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 px-6 md:px-8 lg:px-10 text-sm md:text-base font-bold text-[#0a0a0c] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(0,212,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              href="mailto:harshan.aiyappa@gmail.com"
              aria-label="Email me"
            >
              <span className="hidden sm:inline">harshan.aiyappa@gmail.com</span>
              <span className="sm:hidden">Email Me</span>
            </a>
            <div className="mt-12 md:mt-16 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 pt-6 md:pt-8 lg:pt-10 border-t border-white/5 text-gray-500 text-xs md:text-sm">
              <p className="font-mono flex flex-wrap items-center justify-center gap-2 text-center">
                © 2026 <span className="font-signature text-xl md:text-2xl text-white">Harshan Aiyappa</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
                {[{ name: "X (Twitter)", url: "https://x.com/HarshanAiyappa", icon: Twitter }, { name: "LinkedIn", url: "https://linkedin.com/in/harshan-aiyappa", icon: Linkedin }, { name: "GitHub", url: "https://github.com/Kimosabey", icon: Github }].map((social) => (
                  <a
                    key={social.name}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-2 group min-h-[48px] -m-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <social.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
                    <span className="hidden sm:inline text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main >
    </>
  );
}
