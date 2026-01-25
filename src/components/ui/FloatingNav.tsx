"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-[95vw] md:min-w-[70vw] lg:min-w-fit 3xl:min-w-[50vw] fixed top-4 md:top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-[#0a0a0c]/80 backdrop-blur-xl shadow-2xl z-[5000] px-3 md:px-6 3xl:px-12 py-2 md:py-3 3xl:py-6 items-center justify-between gap-2 md:space-x-8",
                    className
                )}
            >
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group hover:border-cyan-400/50 transition-colors">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-cyan-400 transition-colors">
                            <path d="M25 20V80M25 50H50M75 20L60 80M90 80L75 20" stroke="currentColor" strokeWidth="12" strokeLinecap="square" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="h-4 w-px bg-white/20 hidden md:block" />
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {navItems.map((navItem: any, idx: number) => (
                            <Link
                                key={`link=${idx}`}
                                href={navItem.link}
                                className={cn(
                                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-cyan-400 hover:text-neutral-500 transition-colors"
                                )}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block text-[12px] md:text-sm font-medium">{navItem.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <Link
                    href="/resume.pdf"
                    target="_blank"
                    className="border text-[11px] sm:text-xs font-bold uppercase tracking-widest relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-white/10 transition-colors shrink-0 flex items-center justify-center"
                >
                    <span className="relative z-10">Resume</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
                </Link>
            </motion.div>
        </AnimatePresence >
    );
};
