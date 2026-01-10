"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoLoopProps {
    logos: { node: React.ReactNode; title: string }[];
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
    logos,
    speed = 50,
    direction = 'left',
    className = ""
}) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Calculate total width of one set of logos
            const scrollWidth = containerRef.current.scrollWidth;
            // We need enough copies to cover the screen plus buffer. 
            // For simplicity in this implementation, we'll just duplicate 4 times which is usually enough.
            setWidth(scrollWidth / 4);
        }
    }, [logos]);

    return (
        <div className={`relative overflow-hidden flex ${className}`} style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
                className="flex gap-12 items-center whitespace-nowrap py-4 px-4"
                animate={{
                    x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30, // Adjust based on speed prop if needed, but linear 30s is a good baseline for "tech flow"
                }}
            >
                {/* We repeat the logos multiple times to ensure seamless looping */}
                {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
                    <div key={idx} className="flex items-center justify-center min-w-[max-content] group relative">
                        <div className="text-4xl text-white/20 group-hover:text-primary transition-all duration-300 filter group-hover:drop-shadow-[0_0_10px_rgba(107,123,255,0.8)] transform group-hover:scale-110">
                            {logo.node}
                        </div>
                        {/* Tooltip-ish title */}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-primary whitespace-nowrap">
                            {logo.title}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogoLoop;
