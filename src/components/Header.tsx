'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { AnimatedTooltip } from '@/components/ui/AnimatedTooltip';
import { FlipWords } from '@/components/ui/FlipWords';
import { Sparkles, SparklesCore } from '@/components/ui/Sparkles';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Scroll detection for adaptive glass effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Philosophy', href: '#about' }, // Reusing section
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'py-3 md:py-4 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
                    : 'py-6 md:py-8 bg-transparent border-b border-transparent'
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="max-w-[95%] xl:max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* LEFT: Identity / Logo */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="group relative z-50">
                            <div className="w-11 h-11 flex items-center justify-center bg-black/90 rounded-xl border border-white/10 overflow-hidden group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all duration-500">
                                <SparklesCore className="absolute inset-0" particleDensity={40} particleColor="#00d4ff" />
                                <span className="font-display font-black text-xl text-white group-hover:text-cyan-400 transition-colors z-10 tracking-tightest">HA</span>
                            </div>
                            <div className="absolute -inset-2 bg-cyan-400/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Link>

                        <div className="flex flex-col">
                            <FlipWords
                                words={["Harshan Aiyappa", "AI//Architect", "FullStack//Scale", "Systems//Designer"]}
                                className="text-sm md:text-lg font-mono font-black text-white/50 tracking-[0.2em] uppercase !px-0 bg-transparent"
                            />
                            <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mt-1" />
                        </div>
                    </div>

                    {/* CENTER: Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-3xl relative group/nav">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-[0.8rem] transition-all relative"
                            >
                                {link.name}
                            </a>
                        ))}
                        {/* Interactive highlights */}
                        <div className="absolute inset-y-1.5 left-1.5 w-1 bg-cyan-400 rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                    </nav>

                    {/* RIGHT: Status & Resume */}
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </div>
                            <span className="text-[9px] font-mono text-cyan-400/80 font-black tracking-[0.3em] uppercase">Status: Live_Nexus</span>
                        </div>

                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="hidden md:flex items-center justify-center h-11 px-8 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-500"
                        >
                            Payload//Resume
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/[0.05] rounded-xl border border-white/10 text-white hover:text-cyan-400 transition-all z-50"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE FULLSCREEN MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#0a0a0c]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="text-3xl font-display font-bold text-white hover:text-cyan-400 transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-6"
                        >
                            <a href="https://github.com/Kimosabey" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-cyan-400 hover:text-black transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/harshan-aiyappa" target="_blank" className="p-3 bg-white/5 rounded-full text-white hover:bg-cyan-400 hover:text-black transition-all">
                                <Linkedin size={20} />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
