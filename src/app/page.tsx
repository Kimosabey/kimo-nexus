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
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
  SiPostgresql, SiDocker, SiAmazonwebservices, SiTensorflow, SiPytorch, SiOpenai,
  SiFramer, SiGit, SiMongodb, SiRedis
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
import { Carousel, Card } from "@/components/ui/AppleCardsCarousel";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
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
        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(107, 123, 255, 0.04), transparent 80%)`
      }}
    />
  );
}

function DescriptorHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
        <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.5em] uppercase font-bold text-shadow-glow">
          {title}
        </span>
      </div>
      <span className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] ml-4">
        {subtitle}
      </span>
    </div>
  );
}

function Preloader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
        >
          <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={500} loop={false} />
        </motion.div>
      )}
    </AnimatePresence>
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
    const brandingTimer = setTimeout(() => setMinTimeElapsed(true), 2500);
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
        {/* Aceternity Background Sparkles & Meteors */}
        {!USE_VANTA_BACKGROUND && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="w-full absolute inset-0 h-screen">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#00d4ff"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <Meteors number={25} />
            </div>
          </div>
        )}

        {/* Hero - iOS FLUX STYLE */}
        <section ref={heroRef} className="min-h-[100dvh] w-full flex flex-col justify-center items-center px-4 md:px-12 lg:px-24 pt-32 lg:pt-24 pb-12 md:pb-20 relative overflow-hidden">

          {/* Internal Sparkles for Title Area */}
          <div className="absolute inset-0 z-0 opacity-30">
            <SparklesCore
              id="heroSparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={50}
              className="w-full h-full"
              particleColor="#00d4ff"
            />
          </div>

          {/* Aceternity Spotlight Effect */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

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
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-[7rem] font-black tracking-tighter text-white leading-[0.95] uppercase text-center lg:text-left"
                  duration={0.8}
                  filter={true}
                />
                <TextGenerateEffect
                  words="DIGITAL MINDS"
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-[7rem] font-black tracking-tighter leading-[0.95] uppercase text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-teal-400"
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
                <div className="text-xl md:text-2xl font-display text-gray-400 mb-6 h-12 flex items-center justify-center lg:justify-start gap-3">
                  <span className="opacity-50 font-mono text-sm tracking-widest text-[#6b7bff]">DESCRIPTOR//:</span>
                  <FlipWords words={["AI_Architect", "Full_Stack_Dev", "Systems_Designer", "Digital_Strategist"]} className="text-white font-black uppercase tracking-tight" />
                </div>
                <p
                  className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  Engineering <span className="text-white font-medium border-b border-cyan-500/30">high-performance intelligence</span> across the stack. Specializing in Generative AI, Distributed Infrastructures, and Neural Interfaces.
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
        </section>

        {/* --- Content Ecosystem - Global Tracing Beam Wrap --- */}
        <TracingBeam className="px-4 md:px-12">
          <div className="relative z-10 space-y-20 md:space-y-32 pb-32 w-full">

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
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8">
                      Forging <br /> <span className="text-cyan-400">Chaos</span> <br /> into <span className="text-teal-400 italic">Code</span>
                    </h2>
                  </motion.div>

                  <div className="space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
                    <p>
                      In a world of digital entropy, I architect <span className="text-white font-medium underline decoration-cyan-500/30 underline-offset-8">deterministic intelligence</span>. My work exists at the critical junction of high-performance infrastructure and human-centric design.
                    </p>
                    <p>
                      Specializing in <span className="text-cyan-400 font-medium">Distributed Neural Fabrics</span> and <span className="text-teal-400 font-medium">Low-Latency Audio Flux</span>, I build for the 0.1% edge cases where conventional systems fail.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-12">
                    {[
                      { label: "NETWORK_UPTIME", val: "99.99%", desc: "High availability design" },
                      { label: "DATA_VELOCITY", val: "<1ms", desc: "Batch ingestion focus" },
                    ].map((stat, i) => (
                      <div key={i} className="group/stat p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">{stat.val}</div>
                        <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-1 relative z-10">{stat.label}</div>
                        <div className="text-[10px] text-gray-500 relative z-10 italic">{stat.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative group lg:pl-12">
                  <BackgroundGradient
                    containerClassName="rounded-[3rem]"
                    className="rounded-[3rem] p-[1px] bg-transparent shadow-2xl overflow-hidden"
                  >
                    <div className="relative h-full min-h-[450px] rounded-[3rem] bg-[#050505] p-10 md:p-14 flex flex-col justify-center border border-white/5">
                      <Terminal className="text-cyan-400 mb-10 w-16 h-16 opacity-80" strokeWidth={1} />
                      <div className="space-y-8 font-mono text-sm md:text-lg mb-12">
                        <div className="flex gap-4">
                          <span className="text-purple-400">λ</span>
                          <span className="text-gray-500 font-light italic">const</span>
                          <span className="text-white">mission</span>
                          <span className="text-cyan-400">=</span>
                          <span className="text-teal-400">"Architecting the Future"</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-purple-400">λ</span>
                          <span className="text-gray-500 font-light italic">type</span>
                          <span className="text-white">Stack</span>
                          <span className="text-cyan-400">=</span>
                          <span className="text-yellow-400">AI | Infra | Scale</span>
                        </div>
                      </div>
                      <div className="pt-10 border-t border-cyan-400/10">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed italic">
                           // Harmonizing machine intelligence with <br /> // human-scale architectural precision.
                        </p>
                      </div>
                    </div>
                  </BackgroundGradient>
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
                  <span className="text-[11px] font-mono font-black text-cyan-400 uppercase tracking-[0.5em] text-shadow-glow">Proprietary_Nexus_Builds</span>
                </motion.div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tightest uppercase leading-[0.75] mb-4">
                  Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-white italic">Masterpieces</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <CardContainer className="inter-var group/card w-full">
                      <CardBody className="bg-[#050505]/95 relative group/card-body border-white/10 w-full h-auto rounded-[3.5rem] p-8 border hover:border-cyan-400/50 transition-all duration-700 shadow-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] pointer-events-none" />

                        <CardItem translateZ="70" className="text-2xl md:text-3xl font-black text-white mb-4 font-display relative z-10 tracking-tight">{project.title}</CardItem>
                        <CardItem as="p" translateZ="90" className="text-gray-400 text-sm md:text-base mt-4 font-light line-clamp-2 leading-relaxed h-12 uppercase tracking-tighter">{project.description}</CardItem>

                        <CardItem translateZ="140" className="w-full mt-10">
                          <div className="relative group/img overflow-hidden rounded-[3rem] aspect-[16/11] border border-white/10 shadow-2xl">
                            <Image src={project.image} height="1200" width="1200" className="h-full w-full object-cover transition-transform duration-1000 group-hover/img:scale-110 grayscale-[50%] group-hover/img:grayscale-0" alt={project.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 flex items-end p-8">
                              <div className="px-5 py-2 rounded-full bg-cyan-400/20 border border-cyan-400/40 backdrop-blur-md">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{project.category}</span>
                              </div>
                            </div>
                          </div>
                        </CardItem>

                        <div className="flex flex-wrap gap-3 mt-10">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <CardItem key={i} translateZ={40 + i * 20} className="px-5 py-2 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] font-mono font-black text-gray-500 group-hover:text-cyan-400/80 transition-colors uppercase tracking-widest">{tech}</CardItem>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5 mx-[-2rem] px-8">
                          <CardItem
                            translateZ={50}
                            as={Link}
                            href={project.repoUrl}
                            target="__blank"
                            className="w-full flex items-center justify-center gap-4 py-4 rounded-[1.5rem] bg-white text-black text-[11px] font-black hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all uppercase tracking-[0.3em] group/link"
                          >
                            <Github size={20} className="group-hover/link:scale-125 transition-transform" />
                            ACCESS_PROJECT_CORE
                          </CardItem>
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

            {/* Final Call to Action - System Override Style */}
            <section className="w-full pt-24 pb-32 px-4" id="contact">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="w-full mb-16" particleDensity={60} particleColor="#00d4ff" minSize={0.8} maxSize={2.5}>
                    <h2 className="text-5xl md:text-9xl font-black text-white tracking-tightest uppercase leading-[0.8]">
                      Initiate <br /> <span className="text-cyan-400 italic">Interlink</span>
                    </h2>
                  </Sparkles>

                  <div className="flex flex-col items-center gap-12 mt-12">
                    <MovingBorderButton
                      as="a"
                      href="mailto:harshan.aiyappa@gmail.com"
                      duration={3000}
                      borderRadius="1rem"
                      className="bg-[#050505] border-white/10 text-white font-mono text-sm md:text-xl font-black px-8 md:px-20 py-6 md:py-8 transition-all hover:scale-105 hover:border-cyan-400/50"
                    >
                      harshan.aiyappa@gmail.com
                    </MovingBorderButton>

                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-24 border-t border-white/5 w-full justify-between mt-12">
                      <div className="text-center md:text-left space-y-2">
                        <p className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase">Built_with_Nexus_Control_Plane_V4.2</p>
                        <p className="text-xs font-mono text-white/50 tracking-widest leading-loose">
                          © 2026 // <span className="text-white font-black">AIYAPPA_PROTOCOL</span> // ENCRYPTED
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <AnimatedTooltip
                          items={[
                            { id: 1, name: "X_TERMINAL", designation: "@HarshanAiyappa", icon: <a href="https://x.com/HarshanAiyappa" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors"><Twitter size={32} strokeWidth={1.5} /></a> },
                            { id: 2, name: "LINKEDIN_NODE", designation: "Harshan Aiyappa", icon: <a href="https://linkedin.com/in/harshan-aiyappa" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors"><Linkedin size={32} strokeWidth={1.5} /></a> },
                            { id: 3, name: "GIT_SOURCE", designation: "Kimosabey", icon: <a href="https://github.com/Kimosabey" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors"><Github size={32} strokeWidth={1.5} /></a> },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </TracingBeam>
      </main>
    </>
  );
}
