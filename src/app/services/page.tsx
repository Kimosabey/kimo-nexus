import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="relative z-10 flex flex-col min-h-screen w-full bg-background-dark text-slate-100 font-display selection:bg-white selection:text-black">
            {/* Services Header */}
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 md:px-12 backdrop-blur-md sticky top-0 z-50 bg-background-dark/80">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold tracking-tighter">
                        MK
                    </div>
                    <div className="hidden md:block w-px h-4 bg-white/20 mx-2"></div>
                    <span className="hidden md:block text-sm text-gray-400 font-medium tracking-wide">FULL STACK HYBRID ENGINEER</span>
                </Link>
                <nav className="hidden md:flex flex-1 justify-end gap-8 items-center">
                    <div className="flex items-center gap-6 mr-4">
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#about">About</Link>
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#skills">Skills</Link>
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#projects">Projects</Link>
                        <Link className="text-sm font-medium text-white transition-colors" href="/services">Services</Link>
                    </div>
                    <Link className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all text-white flex items-center gap-2 group" href="/#contact">
                        <span>Contact</span>
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </Link>
                </nav>
                <button className="md:hidden text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>
            <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Hero Section */}
                <div className="w-full max-w-7xl flex flex-col items-center text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-neutral-300 tracking-wider uppercase mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Available for Q3 2024
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white max-w-4xl">
                        Tailored Engineering Solutions
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed font-body">
                        Scalable architecture and full-stack expertise for the modern enterprise. Precision-crafted code for mission-critical systems.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start relative">
                    {/* Card 1: Consulting */}
                    <div className="glass-card flex flex-col p-8 rounded-xl h-full transition-all duration-300 group">
                        <div className="mb-6">
                            <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-widest mb-4">Consulting</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">$250</span>
                                <span className="text-neutral-500 text-lg font-medium">/hr</span>
                            </div>
                            <p className="text-neutral-500 text-sm mt-2 font-body">Perfect for strategic audits and technical leadership guidance.</p>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
                        <ul className="flex-1 flex flex-col gap-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Strategic Architecture Audits</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>In-depth Code Reviews</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Tech Stack Selection</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Security Compliance</span>
                            </li>
                        </ul>
                        <button className="w-full rounded-lg h-12 border border-white/20 text-white font-bold text-sm tracking-wide bg-transparent hover:bg-white/10 transition-all">
                            Get Started
                        </button>
                    </div>

                    {/* Card 2: Hybrid System Dev (Highlighted) */}
                    <div className="glass-card bg-neutral-900/60 flex flex-col p-8 rounded-xl h-full border-white/20 relative transform lg:-translate-y-4 z-10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                Hybrid Systems
                                <span className="material-symbols-outlined text-[16px] text-white">bolt</span>
                            </h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">$12k</span>
                                <span className="text-neutral-400 text-lg font-medium">/mo</span>
                            </div>
                            <p className="text-neutral-400 text-sm mt-2 font-body">End-to-end product engineering on a retainer basis.</p>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
                        <ul className="flex-1 flex flex-col gap-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-white font-medium font-body">
                                <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                                <span>Full-Stack Development (React/Node/Go)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-medium font-body">
                                <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                                <span>CI/CD Pipeline Automation</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-medium font-body">
                                <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                                <span>Cloud Infrastructure (AWS/GCP)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-medium font-body">
                                <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                                <span>Performance Optimization</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white font-medium font-body">
                                <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                                <span>Weekly Progress Sprints</span>
                            </li>
                        </ul>
                        <button className="w-full rounded-lg h-12 bg-white text-black font-bold text-sm tracking-wide shadow-lg shadow-white/10 hover:shadow-white/20 border border-transparent hover:scale-[1.02] transition-all">
                            Get Started
                        </button>
                    </div>

                    {/* Card 3: Enterprise */}
                    <div className="glass-card flex flex-col p-8 rounded-xl h-full transition-all duration-300 group">
                        <div className="mb-6">
                            <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-widest mb-4">Enterprise</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Custom</span>
                            </div>
                            <p className="text-neutral-500 text-sm mt-2 font-body">High-availability system design for large-scale operations.</p>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
                        <ul className="flex-1 flex flex-col gap-4 mb-8">
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Legacy System Migration</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Microservices Architecture</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Team Leadership & Mentoring</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300 font-body">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">check_circle</span>
                                <span>Enterprise Security & Auth</span>
                            </li>
                        </ul>
                        <button className="w-full rounded-lg h-12 border border-white/20 text-white font-bold text-sm tracking-wide bg-transparent hover:bg-white/10 transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full max-w-3xl mt-24 md:mt-32">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-neutral-500 font-body">Common questions about the engagement process.</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {/* FAQ Item 1 */}
                        <details className="group bg-transparent">
                            <summary className="flex cursor-pointer items-center justify-between border-b border-white/10 py-4 pr-4 transition-colors group-hover:border-white/30 list-none">
                                <span className="text-neutral-200 font-medium text-lg font-display">Do you work with existing teams?</span>
                                <span className="material-symbols-outlined text-neutral-500 transition-transform group-open:rotate-180 group-open:text-white">expand_more</span>
                            </summary>
                            <div className="pt-4 pb-6 text-neutral-400 font-body leading-relaxed text-sm">
                                Absolutely. I seamlessly integrate with existing engineering teams to provide senior-level guidance, hands-on development, and architectural oversight. My goal is to elevate the team&apos;s output without disrupting current workflows.
                            </div>
                        </details>
                        {/* FAQ Item 2 */}
                        <details className="group bg-transparent">
                            <summary className="flex cursor-pointer items-center justify-between border-b border-white/10 py-4 pr-4 transition-colors group-hover:border-white/30 list-none">
                                <span className="text-neutral-200 font-medium text-lg font-display">What is your primary tech stack?</span>
                                <span className="material-symbols-outlined text-neutral-500 transition-transform group-open:rotate-180 group-open:text-white">expand_more</span>
                            </summary>
                            <div className="pt-4 pb-6 text-neutral-400 font-body leading-relaxed text-sm">
                                I specialize in a modern hybrid stack. On the frontend, I primarily use React, Next.js, and TypeScript. For backend services, I leverage Node.js, Go, or Python depending on performance requirements, typically deployed on AWS or Google Cloud via Kubernetes or serverless architecture.
                            </div>
                        </details>
                        {/* FAQ Item 3 */}
                        <details className="group bg-transparent">
                            <summary className="flex cursor-pointer items-center justify-between border-b border-white/10 py-4 pr-4 transition-colors group-hover:border-white/30 list-none">
                                <span className="text-neutral-200 font-medium text-lg font-display">How do you handle IP rights?</span>
                                <span className="material-symbols-outlined text-neutral-500 transition-transform group-open:rotate-180 group-open:text-white">expand_more</span>
                            </summary>
                            <div className="pt-4 pb-6 text-neutral-400 font-body leading-relaxed text-sm">
                                Intellectual Property rights are fully transferred to the client upon payment. I operate under a standard Work For Hire agreement, ensuring you own 100% of the code, documentation, and infrastructure configurations produced during our engagement.
                            </div>
                        </details>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 mt-12 bg-background-dark py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-400 text-sm">
                        © 2024 MK Systems. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">Twitter</Link>
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">LinkedIn</Link>
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
