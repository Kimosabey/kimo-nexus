"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WavyBackground } from "./wavy-background";

export const LoaderFour = ({
    loading = true,
    onComplete,
}: {
    loading?: boolean;
    onComplete?: () => void;
}) => {
    const [textState, setTextState] = useState("INITIALIZING");

    useEffect(() => {
        if (!loading) return;

        const texts = [
            "INITIALIZING",
            "LOADING_ASSETS",
            "ESTABLISHING_UPLINK",
            "SYSTEM_READY"
        ];

        // This is a simple sequence
        const interval = setInterval(() => {
            setTextState(current => {
                const idx = texts.indexOf(current);
                return texts[(idx + 1) % texts.length];
            });
        }, 800);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#000000]"
                >
                    <WavyBackground
                        className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-50"
                        containerClassName="absolute inset-0 z-0 h-full w-full pointer-events-none"
                        colors={[
                            "#3b82f6", // Electric Blue
                            "#f59e0b", // Warm Amber
                            "#1d4ed8",
                            "#b45309"
                        ]}
                        waveWidth={40}
                        blur={10}
                        speed="fast"
                        backgroundFill="#000000"
                    />
                    <div className="relative z-10 flex flex-col items-center" style={{ perspective: "1200px" }}>
                        <motion.div
                            initial={{ rotateX: 70, y: 100, opacity: 0, filter: "blur(20px)" }}
                            animate={{ rotateX: 0, y: 0, opacity: 1, filter: "blur(0px) drop-shadow(0 0 15px rgba(34,211,238,0.4))" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-[90vw] md:w-[600px] lg:w-[800px]"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <svg
                                viewBox="0 0 700 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full text-cyan-400"
                            >
                                {/* --- HARSHAN --- */}
                                {/* H */}
                                <motion.path
                                    d="M20,20 L20,80 M20,50 L50,50 M50,20 L50,80"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                                {/* A */}
                                <motion.path
                                    d="M70,80 L85,20 L100,80 M75,60 L95,60"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                                />
                                {/* R */}
                                <motion.path
                                    d="M120,80 L120,20 L140,20 C155,20 155,50 140,50 L120,50 L145,80"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                                />
                                {/* S */}
                                <motion.path
                                    d="M185,25 C160,15 155,45 175,50 C195,55 190,85 165,75"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                                />
                                {/* H */}
                                <motion.path
                                    d="M200,20 L200,80 M200,50 L230,50 M230,20 L230,80"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                                />
                                {/* A */}
                                <motion.path
                                    d="M250,80 L265,20 L280,80 M255,60 L275,60"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.0 }}
                                />
                                {/* N */}
                                <motion.path
                                    d="M300,80 L300,20 L320,80 L320,20"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
                                />

                                {/* --- AIYAPPA --- */}
                                {/* A */}
                                <motion.path
                                    d="M360,80 L375,20 L390,80 M365,60 L385,60" // Start x=360
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.4 }}
                                />
                                {/* I */}
                                <motion.path
                                    d="M410,20 L410,80" // Start x=410
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.6 }}
                                />
                                {/* Y */}
                                <motion.path
                                    d="M430,20 L445,50 L460,20 M445,50 L445,80" // Start x=430
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 1.8 }}
                                />
                                {/* A */}
                                <motion.path
                                    d="M480,80 L495,20 L510,80 M485,60 L505,60" // Start x=480
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 2.0 }}
                                />
                                {/* P */}
                                <motion.path
                                    d="M530,80 L530,20 L550,20 C560,20 560,50 550,50 L530,50" // Start x=530
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
                                />
                                {/* P */}
                                <motion.path
                                    d="M580,80 L580,20 L600,20 C610,20 610,50 600,50 L580,50" // Start x=580
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 2.4 }}
                                />
                                {/* A */}
                                <motion.path
                                    d="M630,80 L645,20 L660,80 M635,60 L655,60" // Start x=630
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 2.6 }}
                                />
                            </svg>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20, rotateX: 45 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                            className="mt-8 flex items-center gap-2"
                        >
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full animate-pulse" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={textState}
                                    initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    exit={{ opacity: 0, filter: "blur(5px)", y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-mono text-amber-500 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase text-center whitespace-nowrap min-w-[200px]"
                                >
                                    {textState}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence >
    );
};
