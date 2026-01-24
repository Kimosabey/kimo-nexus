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
                    "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-[#0a0a0c]/70 backdrop-blur-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-6 py-3 items-center justify-between space-x-8",
                    className
                )}
            >
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group hover:border-cyan-400/50 transition-all cursor-pointer">
                        <span className="text-xs font-bold text-white tracking-widest">HA</span>
                    </div>
                    <div className="h-4 w-px bg-white/20 hidden md:block" />
                    <div className="flex items-center space-x-6">
                        {navItems.map((navItem: any, idx: number) => (
                            <Link
                                key={`link=${idx}`}
                                href={navItem.link}
                                className={cn(
                                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-cyan-400 hover:text-neutral-500 transition-colors"
                                )}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <button className="border text-xs font-bold uppercase tracking-widest relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
                    <span>Resume</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
