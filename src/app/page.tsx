"use client";
import Link from "next/link";
import { ArrowDown, ArrowRight, Cpu, Eye, Zap, Server, Brain, Database, Palette, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-glass-border bg-background-dark/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold tracking-tighter">
              MK
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20 mx-2"></div>
            <span className="hidden md:block text-sm text-gray-400 font-medium tracking-wide">FULL STACK HYBRID ENGINEER</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <a className="text-sm text-gray-400 hover:text-white transition-colors" href="#about">About</a>
              <a className="text-sm text-gray-400 hover:text-white transition-colors" href="#skills">Skills</a>
              <a className="text-sm text-gray-400 hover:text-white transition-colors" href="#experience">Experience</a>
            </div>
            <a className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all text-white flex items-center gap-2 group" href="#contact">
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

          <motion.div
            className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col gap-6 z-10 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">Available for Architecture</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-glow">
                Full Stack Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">& AI Innovator</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed font-light">
                Highly driven Full Stack Software Engineer with 4+ years of hands-on experience, crafting scalable web applications using React, Node.js, and Python. Pioneering R&D in AI and speech technologies (TTS, ASR, NLP).
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <a href="#projects" className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all hover:scale-105 flex items-center gap-2">
                  View Projects
                  <ArrowDown className="w-5 h-5" />
                </a>
                <a href="#contact" className="px-8 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all hover:scale-105">
                  Get In Touch
                </a>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">4+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Years Exp</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">35+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Projects Led</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">200+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Students Mentored</span>
                </div>
              </div>
            </motion.div>

            <div className="relative h-[500px] w-full flex items-end justify-center order-1 lg:order-2 group">
              {/* Photo Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-20"></div>
              <div className="absolute bottom-0 w-[80%] h-[80%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full blur-2xl opacity-20 z-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              {/* Main Image with "Cutout" feel */}
              <div
                className="relative z-10 w-full h-full max-w-[400px] grayscale contrast-125 bg-cover bg-top bg-no-repeat rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                style={{ backgroundImage: "url('/profile.webp')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Philosophy Section (About) */}
        <section className="w-full max-w-7xl px-6 py-24" id="about">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Engineering Philosophy</h2>
              <p className="text-gray-400">Blending rigorous engineering with stealth aesthetics.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl text-white/20">fingerprint</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-xl flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI & Speech Tech</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Pioneering R&D in AI tools and speech algorithms including TTS, ASR, and NLP with SpaCy. Advanced prompt engineering to enhance voice capabilities and data intelligence.
              </p>
            </div>
            {/* Card 2 */}
            <div className="glass-card p-8 rounded-xl flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Stealth Design</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Minimalist aesthetics that hide complex functionality. The interface recedes, allowing the user&apos;s intent to take center stage without distraction.
              </p>
            </div>
            {/* Card 3 */}
            <div className="glass-card p-8 rounded-xl flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Performance First</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Optimized for speed, latency, and resource efficiency. Every millisecond counts when processing real-time inference at the edge.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section (Bento Grid) */}
        <section className="w-full max-w-7xl px-6 py-24 bg-gradient-to-b from-transparent to-background-dark" id="skills">
          <h2 className="text-3xl font-bold text-white mb-8 px-2">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Large Featured Skill */}
            <div className="md:col-span-2 md:row-span-2 glass-card rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Server className="w-6 h-6 text-white" />
                  <span className="text-xs font-bold text-white/40 border border-white/20 px-2 py-1 rounded">CORE</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Full Stack Development</h3>
                <p className="text-gray-400 text-sm mb-6">Expert in React.js, Next.js, Node.js, Python, and TypeScript. Building scalable web applications with modern UI frameworks and RESTful APIs.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-black/50 border border-white/20 text-gray-300">React.js</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-black/50 border border-white/20 text-gray-300">Node.js</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-black/50 border border-white/20 text-gray-300">Python</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-black/50 border border-white/20 text-gray-300">PostgreSQL</span>
                </div>
              </div>
              <div className="mt-8 h-32 w-full bg-dot-grid opacity-30 rounded border border-white/5 relative overflow-hidden">
                {/* Abstract visualization line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary shadow-[0_0_10px_#16169c]"></div>
                <div className="absolute top-1/2 left-[30%] w-2 h-2 bg-white rounded-full -translate-y-1/2 shadow-[0_0_15px_white]"></div>
              </div>
            </div>
            {/* Skill Box */}
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between group hover:border-white/30 transition-colors">
              <Brain className="w-8 h-8 text-white mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <div>
                <h4 className="text-lg font-bold text-white">AI & NLP</h4>
                <p className="text-xs text-gray-500 mt-1">TTS, ASR, NLP (SpaCy), Prompt Engineering</p>
              </div>
            </div>
            {/* Skill Box */}
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between group hover:border-white/30 transition-colors">
              <Database className="w-8 h-8 text-white mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <div>
                <h4 className="text-lg font-bold text-white">Data & APIs</h4>
                <p className="text-xs text-gray-500 mt-1">PostgreSQL, MongoDB, REST APIs, Redux Toolkit</p>
              </div>
            </div>
            {/* Skill Box Wide */}
            <div className="md:col-span-2 glass-card rounded-xl p-6 flex flex-row items-center justify-between group hover:border-white/30 transition-colors">
              <div className="flex flex-col justify-center h-full">
                <h4 className="text-lg font-bold text-white">UI/UX & Data Viz</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Tailwind, MUI, Shadcn, ApexCharts, Echarts, D3.js</p>
              </div>
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-white/20 animate-[spin_10s_linear_infinite] flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full max-w-7xl px-6 py-24" id="projects">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Selected Works</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
          <div className="flex flex-col gap-12">
            {/* Project 1 */}
            <article className="group relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0c]">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
                <div className="p-8 md:p-12 z-20 flex flex-col justify-center relative">
                  <span className="text-primary font-mono text-xs tracking-widest mb-2">01 — FINTECH</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary/90 transition-colors">Nexus Trading Terminal</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    A high-frequency trading dashboard with real-time WebSocket data visualization. Processed 50k+ events/second with sub-10ms UI latency.
                  </p>
                  <ul className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 font-mono">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>React</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>WebSockets</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>D3.js</li>
                  </ul>
                  <Link className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all" href="/case-study">
                    View Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div
                  className="h-full min-h-[300px] w-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  data-alt="Abstract dark data visualization dashboard interface with graphs and charts"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkSoOx6cIWb-0rGYM9nHLabaeK47UftIX3gX4PEiEH96U34_vysEy2a7bLSKfJdA46SzYgjRIJNyQJRLci01cOw8D_B3CAVCMqYVF_P-MTWMmE2AgaodrY7w80Ak_u_gssZJNOxcttfjOkTj86FzwXtTYxQzodCtPAPpeoS697ok23RTmhGh69Ij4r9aSFhZMrbUQ5oi4V8z8XV51-1azi-msjwWhBX3gApnykpsoC_4Y_3YDJR2jNSTjJF0Ahsu9rI0RIARMkIw')" }}
                >
                </div>
              </div>
            </article>
            {/* Project 2 */}
            <article className="group relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0c]">
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10 pointer-events-none hidden md:block"></div>
              {/* Mobile gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none md:hidden"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
                <div
                  className="h-full min-h-[300px] w-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out order-2 md:order-1"
                  data-alt="Futuristic AI interface concept showing neural network nodes"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDc7snuKQiaNB8vfwkxXIJ4iyfRhBYMnRwlGrbQqJZSDvaIlKucXGHQuzEukoMe0oXmn5FI_-VnQ1irGJ2DKPRfg_Pyr4gfG_SvsFq88yuY23PHeF_qI30rx5tNnjdJlGxdYq3cdkAHCNpTs5FKNg2aFp9I5PWakQwJ5VLZqJhf5yNqpDlxDq6Ky1g3z36J6XlGIO4B8Z1y0q2atCu8RI-6RrVQ_qwKtTOif6QyB0i9yojcZr_7hmIaaOwC1QRszTesfhxaurbkUA')" }}
                >
                </div>
                <div className="p-8 md:p-12 z-20 flex flex-col justify-center relative order-1 md:order-2 text-left md:text-right">
                  <span className="text-primary font-mono text-xs tracking-widest mb-2">02 — AI SAAS</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary/90 transition-colors">Cognition Flow</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed ml-auto max-w-lg">
                    Enterprise-grade LLM orchestration platform. Allows users to build visual chains of thought for complex reasoning tasks. Reduced prompt engineering time by 60%.
                  </p>
                  <ul className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 font-mono justify-start md:justify-end">
                    <li className="flex items-center gap-2 md:flex-row-reverse"><span className="w-1 h-1 bg-primary rounded-full"></span>Python</li>
                    <li className="flex items-center gap-2 md:flex-row-reverse"><span className="w-1 h-1 bg-primary rounded-full"></span>LangChain</li>
                    <li className="flex items-center gap-2 md:flex-row-reverse"><span className="w-1 h-1 bg-primary rounded-full"></span>Next.js</li>
                  </ul>
                  <Link className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all justify-start md:justify-end" href="/blog">
                    View Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="w-full max-w-3xl px-6 py-24" id="experience">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">Career Trajectory</h2>
          <div className="relative pl-8 border-l border-white/10 space-y-12">
            {/* Role 1 */}
            <div className="relative">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-black"></span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Software Engineer – Full Stack</h3>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">Jan 2023 — Present</span>
              </div>
              <p className="text-primary text-sm font-medium mb-2">Lingotran Pvt. Ltd.</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Spearheaded full-stack development with React.js, Node.js, and Python. Pioneered R&D in AI tools and speech technologies (TTS, ASR, NLP). Led frontend development with responsive UIs and data dashboards. Served as Scrum Leader, mentoring junior engineers.
              </p>
            </div>
            {/* Role 2 */}
            <div className="relative">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-gray-600 ring-4 ring-black"></span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Software Engineer – Full Stack</h3>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">Feb 2021 — Jul 2022</span>
              </div>
              <p className="text-gray-300 text-sm font-medium mb-2">Veriteam Software Solutions</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Developed full-stack applications using MVC architecture, Node.js, Express.js, Python, Next.js, and React. Engineered multiple CMS platforms including Admin & Merchant dashboards. Mentored 200+ students and guided 35+ academic projects.
              </p>
            </div>
            {/* Role 3 */}
            <div className="relative">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-gray-800 ring-4 ring-black"></span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Education</h3>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">2017 — 2020</span>
              </div>
              <p className="text-gray-300 text-sm font-medium mb-2">Master of Computer Applications (MCA)</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                The NIE College, Mysore | 8.2 CGPA. Specialized in software engineering, web technologies, and system design.
              </p>
            </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer className="w-full bg-[#08080a] border-t border-white/5 pt-20 pb-10" id="contact">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let&apos;s build something <br /> impossible.</h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">
              Currently accepting select projects for Q3. If you have an engineering challenge that requires precision and scale, reach out.
            </p>
            <a className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary/90" href="mailto:harshan.aiyappa@gmail.com">
              harshan.aiyappa@gmail.com
            </a>
            <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-gray-500 text-sm">
              <p>© 2024 MK Systems. All rights reserved.</p>
              <div className="flex gap-6">
                <Link className="hover:text-white transition-colors flex items-center gap-2" href="https://twitter.com/harshan_aiyappa" target="_blank">
                  <Twitter className="w-4 h-4" /> Twitter
                </Link>
                <Link className="hover:text-white transition-colors flex items-center gap-2" href="https://linkedin.com/in/harshan-aiyappa" target="_blank">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Link>
                <Link className="hover:text-white transition-colors flex items-center gap-2" href="https://github.com/Kimosabey" target="_blank">
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
