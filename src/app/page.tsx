"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Github, Linkedin, Twitter, Terminal, Lock, Shield, BookOpen, Mail
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { projects, Project } from "@/lib/projects";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
  SiPostgresql, SiDocker, SiAmazonwebservices, SiTensorflow, SiPytorch, SiOpenai,
  SiFramer, SiGit, SiMongodb, SiRedis, SiFlask, SiMysql, SiJquery, SiChakraui
} from 'react-icons/si';
import LogoLoop from "@/components/ui/LogoLoop";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Button as MovingBorderButton } from "@/components/ui/MovingBorder";
import { HoverEffect } from "@/components/ui/CardHoverEffect";
import { FlipWords } from "@/components/ui/FlipWords";
import { SparklesCore, Sparkles } from "@/components/ui/Sparkles";
import { HeroParallax } from "@/components/ui/HeroParallax";
import NumberTicker from "@/components/ui/NumberTicker";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3DCard";
import { PinContainer } from "@/components/ui/3d-pin";
import { Carousel, Card } from "@/components/ui/AppleCardsCarousel";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";
import { Meteors } from "@/components/ui/Meteors";
import { IconHome, IconUser, IconCode, IconMessage } from "@tabler/icons-react";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import dynamic from 'next/dynamic';

// Lazy load Vanta for better performance
const VantaWaves = dynamic(() => import('@/components/VantaWaves'), {
  ssr: false,
  loading: () => null
});

// Toggle Vanta Waves (set to false to use Aceternity BackgroundBeams)
const USE_VANTA_BACKGROUND = false; // ✨ DISABLED

// --- Components ---


import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import { LoaderFour } from "@/components/ui/loader";

const loadingStates = [
  { text: "Initializing Core Neural Engine" },
  { text: "Synchronizing Data Siphons" },
  { text: "Booting Semantic Visualizer" },
  { text: "Calibrating Interface Nodes" },
  { text: "Verifying System Integrity" },
  { text: "Establishing Secure Protocol" },
  { text: "Launching Nexus Hub" },
];

function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setOpacity(0);
      } else {
        setOpacity(1);
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none inset-0 z-30 transition-opacity duration-300"
      animate={{ opacity }}
      style={{
        background: useMotionTemplate`radial-gradient(clamp(600px, 15vw, 1500px) circle at ${mouseX}px ${mouseY}px, rgba(107, 123, 255, 0.05), transparent 80%)`
      }}
    />
  );
}

function DescriptorHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
        <span className="text-cyan-400 font-mono text-xs md:text-sm 3xl:text-xl tracking-[0.5em] uppercase font-bold text-shadow-glow">
          {title}
        </span>
      </div>
      <span className="text-gray-500 font-mono text-[10px] sm:text-xs 3xl:text-base uppercase tracking-[0.3em] ml-4">
        {subtitle}
      </span>
    </div>
  );
}

function Preloader({ loading }: { loading: boolean }) {
  return (
    <LoaderFour loading={loading} />
  );
}


// --- Main Page ---

const techLogos = [
  // Frontend & Frameworks
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiFramer />, title: "Framer Motion" },
  { node: <SiChakraui />, title: "Chakra UI" },

  // Backend & Languages
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiPython />, title: "Python" },

  // AI & ML
  { node: <SiTensorflow />, title: "TensorFlow" },
  { node: <SiPytorch />, title: "PyTorch" },
  { node: <SiOpenai />, title: "OpenAI" },
  { node: <SiFlask />, title: "Flask" },

  // Databases
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiRedis />, title: "Redis" },
  { node: <SiMysql />, title: "MySQL" },

  // DevOps & Cloud
  { node: <SiDocker />, title: "Docker" },
  { node: <SiAmazonwebservices />, title: "AWS" },
  { node: <SiGit />, title: "Git" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVantaReady, setIsVantaReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroImageY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroTextY = useTransform(scrollY, [0, 1000], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const brandingTimer = setTimeout(() => setMinTimeElapsed(true), 4500);
    const safetyTimer = setTimeout(() => setIsVantaReady(true), 5000);
    return () => {
      clearTimeout(brandingTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

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
      transition: { delay: i * 0.03 + 3.8, duration: 0.5, ease: "easeOut" as const }
    })
  };

  const titleText = "Architecting".split("");

  return (
    <>
      <Preloader loading={isLoading} />
      {/* Premium Progress Bar */}
      <ScrollProgress />

      {/* Ambient Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] mix-blend-overlay filter contrast-120 brightness-100">
        <svg className="w-full h-full"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" /></svg>
      </div>

      <MouseSpotlight />

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

      {/* PROFESSIONAL FLOATING NAV - Aceternity (PRIMARY NAV) */}
      <FloatingNav
        navItems={[
          { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
          { name: "About", link: "#about", icon: <IconUser className="h-4 w-4" /> },
          { name: "Projects", link: "#projects", icon: <IconCode className="h-4 w-4" /> },
          { name: "Contact", link: "#contact", icon: <IconMessage className="h-4 w-4" /> },
        ]}
      />

      <main className="relative z-10 flex flex-col items-center w-full bg-[#050505] overflow-x-hidden">
        <WavyBackground
          className="fixed inset-0 z-0 h-full w-full pointer-events-none"
          containerClassName="fixed inset-0 z-0 h-full w-full pointer-events-none"
          colors={[
            "#3b82f6", // Electric Blue (Primary)
            "#f59e0b", // Warm Amber (Accent)
            "#1d4ed8", // Deep Blue
            "#b45309"  // Deep Amber
          ]}
          waveWidth={40}
          blur={10}
          speed="fast"
          backgroundFill="#000000"
        />

        {/* Hero - iOS FLUX STYLE */}
        <section ref={heroRef} className="min-h-[100dvh] w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 3xl:px-40 pt-32 lg:pt-24 pb-16 md:pb-24 relative overflow-hidden z-10 max-w-[2560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full max-w-screen-3xl mx-auto">
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

                <div style={{ transform: 'translateZ(30px)' }}>
                  <TextGenerateEffect
                    words="ARCHITECTING"
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-[7rem] 3xl:text-[9rem] font-black tracking-tighter text-white leading-[0.95] uppercase text-center lg:text-left"
                    duration={0.8}
                    filter={true}
                  />
                  <TextGenerateEffect
                    words="DIGITAL MINDS"
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-[7rem] 3xl:text-[9rem] font-black tracking-tighter leading-[0.95] uppercase text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-teal-400"
                    duration={0.8}
                    filter={true}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                  className="mt-6 flex flex-col items-center lg:items-start"
                >
                  <div className="text-lg md:text-2xl font-display text-gray-400 mb-6 h-auto md:h-12 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-1 md:gap-3">
                    <span className="opacity-50 font-mono text-[10px] md:text-sm tracking-widest text-[#6b7bff]">DESCRIPTOR//:</span>
                    <FlipWords words={["AI_Architect", "PoC_Master", "Full_Stack_Dev", "Systems_Designer", "Digital_Strategist"]} className="text-white font-black uppercase tracking-tight" />
                  </div>
                  <p
                    className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    Orchestrating <span className="text-white font-medium border-b border-cyan-500/30">high-performance neural fabrics</span> across the stack. Siphoning intelligence through Generative AI, Distributed Infrastructures, and Sentient Interfaces.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center lg:justify-start">
                    <MovingBorderButton
                      as="a"
                      href="#projects"
                      aria-label="View My Projects"
                      borderRadius="0.75rem"
                      className="bg-[#050505] text-white border-white/10 font-mono text-xs font-black tracking-[0.3em] px-10 py-5 hover:bg-cyan-500/10 transition-colors uppercase shadow-2xl"
                    >
                      EXPLORE_SUBSYSTEMS
                    </MovingBorderButton>
                  </div>
                </motion.div>
              </motion.div>

              {/* HERO IMAGE - WAVE-THEMED, CLEAN & SIMPLE */}
              <motion.div
                className="relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full flex items-center justify-center order-1 lg:order-2"
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

                  {/* Ultra-Soft Borderless Image Mask */}
                  <div className="relative w-full h-full pointer-events-none">
                    <div
                      className="w-full h-full relative"
                      style={{
                        backgroundImage: "url('/profile.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 80%)',
                        maskImage: 'radial-gradient(circle at center, black 15%, transparent 80%)'
                      }}
                    >
                      {/* Subtle Internal Glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-transparent opacity-40" />

                      {/* Subtle Cyan Rim Light */}
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 204, 0.2), transparent 60%)',
                          mixBlendMode: 'screen'
                        }}
                      />
                    </div>
                    {/* Outer Ambient Glow - Stronger for seamless blending */}
                    <div className="absolute inset-0 bg-cyan-400/10 blur-[120px] -z-10 rounded-full scale-110" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Content Ecosystem - Global Tracing Beam Wrap --- */}
        <TracingBeam className="px-4 md:px-12">
          <div className="relative z-10 space-y-20 md:space-y-32 pb-32 w-full max-w-screen-3xl mx-auto">

            {/* Philosophy Section - Masterpiece Specs */}
            <section className="w-full pt-12 md:pt-16" id="about">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
                      <div className="flex flex-col">
                        <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-shadow-glow">SYSTEM_CORE: ARCHITECT</span>
                        <span className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em]">Revision_4.3.0</span>
                      </div>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl 3xl:text-8xl font-black text-white leading-[0.95] uppercase mb-8">
                      Forging <br /> <span className="text-cyan-400">Chaos</span> <br /> into <span className="text-teal-400 italic">Code</span>
                    </h2>
                  </motion.div>

                  <div className="space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                    <p>
                      I operate as a <span className="text-white font-medium underline decoration-cyan-500/30 underline-offset-8">Full Stack Architect</span>, specializing in the engineering of high-performance digital neural fabrics. With 4.8+ years of runtime experience, I optimize the intersection of <span className="text-cyan-400 font-medium font-mono">React</span>, <span className="text-cyan-400 font-medium font-mono">Node.js</span>, and <span className="text-cyan-400 font-medium font-mono">Python</span>.
                    </p>
                    <p>
                      My core focus involves siphoning intelligence from complex models—utilizing <span className="text-teal-400 font-medium">TTS</span>, <span className="text-teal-400 font-medium">ASR</span>, and <span className="text-teal-400 font-medium">NLP (SpaCy)</span>—and manifesting them into low-latency, production-ready product features.
                    </p>
                    <p>
                      I believe in the philosophy of <span className="text-white font-bold italic">Architectural Rigour</span>. Over my career, I have supervised the deployment of <span className="text-white font-bold tracking-widest">40+ full-scale projects</span> and mentored over <span className="text-white font-bold tracking-widest">250+ engineering students and developers</span>, ensuring system integrity from conception to scale.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                    {[
                      { label: "EXPERIENCE_METRIC", val: "4.8 YRS", desc: "Full Stack & AI Core" },
                      { label: "SYSTEM_DELIVERY", val: "40+", desc: "Deployed Platforms" },
                    ].map((stat, i) => (
                      <div key={i} className="group/stat p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 transition-all duration-700 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" />
                        <div className="text-4xl md:text-6xl font-black text-white mb-3 relative z-10 font-display tracking-tight group-hover/stat:text-cyan-400 transition-colors">{stat.val}</div>
                        <div className="text-[11px] text-cyan-400/60 uppercase tracking-[0.4em] font-black mb-1 relative z-10 group-hover/stat:text-cyan-400 transition-colors text-shadow-glow">{stat.label}</div>
                        <div className="text-xs text-gray-500 relative z-10 italic font-light tracking-wide">{stat.desc}</div>
                        {/* Static scanline effect on hover */}
                        <div className="absolute inset-x-0 top-0 h-px bg-cyan-400/20 translate-y-[-100%] group-hover/stat:translate-y-[800%] transition-transform duration-[2000ms] ease-linear repeat-infinite pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative group lg:pl-12">
                  <div className="flex items-center justify-center w-full min-h-[25rem]">
                    <PinContainer title="/system.core" href="#projects">
                      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] md:w-[24rem] h-auto min-h-[20rem]">
                        <div className="flex flex-col justify-center h-full">
                          <Terminal className="text-blue-500 mb-6 w-12 h-12 opacity-80" strokeWidth={1} />
                          <div className="space-y-4 font-mono text-xs md:text-sm mb-8">
                            <div className="flex gap-2">
                              <span className="text-purple-400">λ</span>
                              <span className="text-gray-500 font-light italic">const</span>
                              <span className="text-white">mission</span>
                              <span className="text-blue-500">=</span>
                              <span className="text-teal-400">"Architecting Future"</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-purple-400">λ</span>
                              <span className="text-gray-500 font-light italic">type</span>
                              <span className="text-white">Stack</span>
                              <span className="text-blue-500">=</span>
                              <span className="text-amber-400">AI | Infra | Scale</span>
                            </div>
                          </div>
                          <div className="pt-6 border-t border-blue-500/10">
                            <TextGenerateEffect words="// Harmonizing machine intelligence with human-scale precision." className="text-gray-500 font-light text-xs" />
                          </div>
                        </div>
                      </div>
                    </PinContainer>
                  </div>

                  <div className="mt-32">
                    <div className="flex items-center gap-3 mb-8 px-4">
                      <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
                      <span className="text-cyan-400 font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.6em] uppercase font-black">Technical_Filaments</span>
                    </div>
                    <LogoLoop
                      logos={[
                        { node: <SiReact />, title: "React Core" },
                        { node: <SiNextdotjs />, title: "Next.js 15" },
                        { node: <SiTypescript />, title: "TypeScript" },
                        { node: <SiNodedotjs />, title: "Node.js" },
                        { node: <SiPython />, title: "Python AI" },
                        { node: <SiPostgresql />, title: "PostgreSQL" },
                        { node: <SiRedis />, title: "Redis Cache" },
                        { node: <SiDocker />, title: "Docker Container" },
                        { node: <SiAmazonwebservices />, title: "AWS Cloud" },
                        { node: <SiTailwindcss />, title: "Tailwind 4" },
                        { node: <SiMongodb />, title: "MongoDB Atlas" },
                        { node: <SiGit />, title: "Git Source" }
                      ]}
                      speed={40}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Showcase - Masterpiece Specs */}
            <section className="w-full pt-0" id="projects">
              <div className="text-center mb-24 md:mb-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-cyan-400/5 border border-cyan-400/20 mb-8"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,212,255,1)]" />
                  <span className="text-[9px] md:text-[11px] font-mono font-black text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.5em] text-shadow-glow">Proprietary_Nexus_Builds</span>
                </motion.div>
                <h2 className="text-3xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tightest uppercase leading-[0.85] md:leading-[0.75] mb-4">
                  Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-white italic">Masterpieces</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-10 md:gap-12 3xl:gap-16 max-w-screen-3xl mx-auto px-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <CardContainer className="inter-var group/card w-full">
                      <CardBody className="bg-[#050505]/40 relative group/card-body border-white/10 w-full h-auto rounded-[1.8rem] md:rounded-[3.5rem] p-5 md:p-8 border hover:border-cyan-400/50 transition-all duration-700 shadow-3xl overflow-hidden backdrop-blur-md">
                        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] pointer-events-none" />

                        <CardItem translateZ="70" className="text-2xl md:text-3xl font-black text-white mb-4 font-display relative z-10 tracking-tight">{project.title}</CardItem>
                        <CardItem as="p" translateZ="90" className="text-gray-400 text-sm md:text-base mt-4 font-light leading-relaxed uppercase tracking-tighter">{project.description}</CardItem>

                        <CardItem translateZ="140" className="w-full mt-10">
                          <div className="relative group/img overflow-hidden rounded-[1.5rem] md:rounded-[3rem] aspect-[16/11] border border-white/10 shadow-2xl flex items-center justify-center bg-[#0a0a0c]">
                            {project.image ? (
                              <>
                                <Image src={project.image} height="1200" width="1200" className="h-full w-full object-cover transition-transform duration-1000 group-hover/img:scale-110 grayscale-[50%] group-hover/img:grayscale-0" alt={project.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 flex items-end p-8">
                                  <div className="px-5 py-2 rounded-full bg-cyan-400/20 border border-cyan-400/40 backdrop-blur-md">
                                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{project.category}</span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-6 p-12 text-center relative z-10 w-full h-full justify-center">
                                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                                <div className="h-20 w-20 rounded-full bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center group-hover/img:scale-110 transition-transform duration-500">
                                  {project.isAcademic ? (
                                    <BookOpen className="text-cyan-400/40 w-10 h-10 group-hover:text-cyan-400 transition-colors" />
                                  ) : (
                                    <Shield className="text-cyan-400/40 w-10 h-10 group-hover:text-cyan-400 transition-colors" />
                                  )}
                                </div>
                                <div className="space-y-3">
                                  <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-[0.5em] font-black">
                                    {project.isAcademic ? "ACADEMIC_RESEARCH" : "PROPRIETARY_SYSTEM"}
                                  </div>
                                  <div className="px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none font-bold">
                                    {project.isAcademic ? "// Source_Code_Internal_to_Institution" : "// Access_Restricted_by_Veriteam_Node"}
                                  </div>
                                </div>
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,0,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                              </div>
                            )}
                          </div>
                        </CardItem>

                        <div className="flex flex-wrap gap-2.5 mt-10">
                          {project.techStack.slice(0, 4).map((tech, i) => (
                            <CardItem key={i} translateZ={40 + i * 15} className="px-4 py-1.5 bg-cyan-400/5 border border-cyan-400/20 rounded-xl text-[9px] font-mono font-black text-cyan-400/60 group-hover:text-cyan-400 transition-all uppercase tracking-[0.2em]">{tech}</CardItem>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5 mx-[-2rem] px-8">
                          {project.isProprietary ? (
                            <div className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.8rem] bg-white/5 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] transition-all group-hover:bg-white/[0.08] cursor-not-allowed">
                              <Lock size={16} className="opacity-40" />
                              PROPRIETARY_LICENSE
                            </div>
                          ) : project.isAcademic ? (
                            <div className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.8rem] bg-white/5 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] transition-all group-hover:bg-white/[0.08] cursor-not-allowed">
                              <BookOpen size={16} className="opacity-40" />
                              ACADEMIC_ARCHIVE
                            </div>
                          ) : (
                            <CardItem
                              translateZ={60}
                              as={Link}
                              href={project.repoUrl || '#'}
                              target="__blank"
                              className="w-full flex items-center justify-center gap-5 py-5 rounded-[1.8rem] bg-white text-black text-[10px] font-black hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(0,212,255,0.4)] transition-all uppercase tracking-[0.4em] group/link shadow-xl"
                            >
                              <Github size={18} className="group-hover/link:scale-125 transition-transform" />
                              ACCESS_PROJECT_CORE
                            </CardItem>
                          )}
                        </div>
                      </CardBody>
                    </CardContainer>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Experience Trajectory */}
            <section className="w-full py-0" id="experience">
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-cyan-400" />
                  <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase font-bold">Career_Trajectory</span>
                </div>
                <Experience />
              </div>
            </section>

            {/* Testimonials Hub */}
            <section className="w-full py-0" id="testimonials">
              <Testimonials />
            </section>

            {/* Research Lab - Currently Exploring */}
            <section className="w-full pt-16 pb-0" id="research">
              <DescriptorHeader title="SUBSYSTEM_RESEARCH: ALPHA" subtitle="Continuous_Neural_Expansion" />
              {/* Research Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-12">
                {[
                  { title: "Agentic_Orchestration", desc: "Developing multi-tool RAG pipelines and autonomous agentic collectives using LangChain." },
                  { title: "Sentient_Interfaces", desc: "Engineering high-fidelity interactions with Framer Motion and low-level WebGL shaders." },
                  { title: "Neural_Optimization", desc: "Fine-tuning localized model weights for edge-case inference and proprietary LLM hooks." },
                  { title: "Fabric_Evolution", desc: "Researching Distributed Consensus (Raft/Paxos) and elastic scaling architectures." },
                  { title: "Temporal_Audio_Flux", desc: "Manifesting sub-millisecond acoustic processing for real-time neural speech synthesis." },
                  { title: "Cloud_Native_Foundry", desc: "Forging K8s-orchestrated microservices for global, multi-region high-density delivery." },
                ].map((item, i) => (
                  <div key={i} className="p-8 3xl:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-cyan-400/30 transition-all duration-500">
                    <div className="text-cyan-400 font-mono text-[10px] 3xl:text-base mb-4 opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-black">NODE_0{i + 1}: {item.title}</div>
                    <p className="text-gray-400 text-sm md:text-base 3xl:text-xl font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final Call to Action - System Override Style */}
            {/* Final Call to Action - System Interlink Protocol */}
            <section className="w-full pt-32 pb-40 px-6 md:px-12 relative" id="contact">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent pointer-events-none opacity-40 h-[500px] bottom-0" />

              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        <span className="text-[11px] font-mono text-cyan-400 font-black tracking-[0.5em] uppercase">Ready_for_Transmission</span>
                      </div>
                      <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] 3xl:text-[14rem] font-black text-white tracking-tightest uppercase leading-[0.75]">
                        Initiate <br /> <span className="text-cyan-400 italic">Interlink</span>
                      </h2>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group shrink-0"
                    >
                      <div className="absolute inset-0 bg-cyan-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=harshan.aiyappa@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex flex-col items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-white text-black text-sm md:text-xl font-black uppercase tracking-tighter hover:bg-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,0.4)] transition-all duration-500 group-hover:rotate-[15deg]"
                      >
                        <Mail size={40} className="mb-2 hidden md:block" />
                        <span>REACH_CORE</span>
                      </a>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-20 border-t border-white/10 relative z-10">
                    {/* Column 1: Validated Logs */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-cyan-400 rounded-full" />
                        <span className="text-[10px] 3xl:text-base font-mono text-cyan-400 uppercase tracking-[0.4em] font-black">VALIDATED_LOGS</span>
                      </div>
                      <ul className="space-y-4">
                        {[
                          "Fullstack Architect (Lingotran)",
                          "Software Engineer (Veriteam)",
                          "MCA Honors (NIE IT)",
                          "System Protocol Lead"
                        ].map((log, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 0.5, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[11px] 3xl:text-sm font-mono text-gray-400 hover:opacity-100 transition-opacity flex items-center gap-3 uppercase cursor-default"
                          >
                            <span className="text-cyan-400/30 font-bold">[{i + 1}]</span>
                            // {log}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Linguistic Core */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-teal-400 rounded-full" />
                        <span className="text-[10px] 3xl:text-base font-mono text-teal-400 uppercase tracking-[0.4em] font-black">LINGUISTIC_CORE</span>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {["English", "Kannada", "Hindi", "Malayalam"].map((lang) => (
                          <div key={lang} className="px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] 3xl:text-base font-mono text-white/40 hover:text-white hover:border-teal-400/30 transition-all font-black tracking-widest uppercase cursor-default">
                            {lang}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Access Tokens */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-purple-400 rounded-full" />
                        <span className="text-[10px] 3xl:text-base font-mono text-purple-400 uppercase tracking-[0.4em] font-black">ACCESS_TOKENS</span>
                      </div>
                      <div className="flex gap-4 3xl:gap-8">
                        {[
                          { id: 1, url: "https://github.com/HarshanAiyappaPrabhu", icon: <Github size={24} className="3xl:w-10 3xl:h-10" /> },
                          { id: 2, url: "https://www.linkedin.com/in/harshan-aiyappa-prabhu/", icon: <Linkedin size={24} className="3xl:w-10 3xl:h-10" /> },
                          { id: 3, url: "https://twitter.com/HarshanAiyappa", icon: <Twitter size={24} className="3xl:w-10 3xl:h-10" /> },
                        ].map((social) => (
                          <motion.a
                            key={social.id}
                            whileHover={{ y: -5, scale: 1.1 }}
                            href={social.url}
                            target="_blank"
                            className="w-14 h-14 3xl:w-24 3xl:h-24 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-400/30 transition-all backdrop-blur-xl"
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-16 border-t border-white/5 relative z-10 w-full">
                    <div className="flex flex-col items-center lg:items-start gap-2">
                      <p className="text-[10px] 3xl:text-lg font-mono text-gray-700 tracking-[0.4em] uppercase font-bold">System_Runtime_V5.0 // Sentinel_Secure</p>
                      <p className="text-[11px] 3xl:text-lg font-mono text-white/30 tracking-widest">
                        © 2026 // <span className="text-white/60 font-black uppercase">Aiyappa_Protocol</span> // HARSHAN AM
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-cyan-400/5 rounded-xl border border-cyan-400/10">
                        <div className="w-2 h-2 3xl:w-4 3xl:h-4 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[10px] 3xl:text-lg font-mono text-cyan-400 font-black tracking-widest uppercase">Nodes_Active: 1,204,591</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div >
        </TracingBeam >
      </main >
    </>
  );
}
