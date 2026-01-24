"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 h-full w-full pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
                className
            )}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full opacity-[0.4]"
            >
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.rect
                    width="100%"
                    height="1"
                    fill="url(#gradient1)"
                    initial={{ y: -100, x: -100, rotate: 45 }}
                    animate={{
                        y: [0, 1000],
                        x: [0, 1000],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.rect
                    width="100%"
                    height="1"
                    fill="url(#gradient2)"
                    initial={{ y: -100, x: 1000, rotate: -45 }}
                    animate={{
                        y: [0, 1000],
                        x: [1000, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1,
                    }}
                />
                <motion.rect
                    width="100%"
                    height="1"
                    fill="url(#gradient1)"
                    initial={{ y: 500, x: -1000, rotate: 20 }}
                    animate={{
                        x: [-1000, 1000],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2,
                    }}
                />
            </svg>
            <div className="absolute inset-0 bg-dot-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
};
