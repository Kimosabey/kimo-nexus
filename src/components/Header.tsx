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
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">



                    {/* LEFT: Identity / Logo */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="group relative z-50">
                            <div className="w-12 h-12 flex items-center justify-center bg-black/80 rounded-2xl border border-white/10 overflow-hidden group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <SparklesCore className="absolute inset-0" particleDensity={30} particleColor="#00d4ff" />
                                <span className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors z-10 tracking-tighter">HA</span>
                            </div>
                        </Link>
                        <div className="flex flex-col justify-center min-w-[200px]">
                            <FlipWords
                                words={["Harshan Aiyappa", "AI Architect", "Full Stack Dev", "Systems Designer"]}
                                className="text-xl md:text-2xl font-signature text-white tracking-wide hover:text-cyan-400 transition-colors !px-0 cursor-pointer"
                            />
                        </div>
                    </div>


                    {/* CENTER: Desktop Nav (Hidden on Mobile) */}
                    <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* RIGHT: Actions + Mobile Toggle */}
                    <div className="flex items-center gap-4">

                        {/* Status Indicator (Desktop) */}
                        <div className="hidden lg:flex items-center">
                            <AnimatedTooltip
                                items={[
                                    {
                                        id: 1,
                                        name: "Systems Status",
                                        designation: "Ready for deployment",
                                        icon: (
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-900/10 border border-cyan-500/20 rounded-lg cursor-pointer">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                                </span>
                                                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider">ONLINE</span>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </div>


                        {/* Resume Button */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-cyan-400 transition-colors duration-300"
                        >
                            Resume
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors z-50"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
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
