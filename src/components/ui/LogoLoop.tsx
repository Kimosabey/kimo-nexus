"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedTooltip } from './AnimatedTooltip';

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
            const scrollWidth = containerRef.current.scrollWidth;
            setWidth(scrollWidth / 4);
        }
    }, [logos]);

    // Transform logos for AnimatedTooltip format
    const tooltipItems = logos.map((logo, idx) => ({
        id: idx,
        name: logo.title,
        icon: (
            <div className="text-4xl text-white/20 hover:text-cyan-400 transition-all duration-300 filter hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.8)] transform hover:scale-110">
                {logo.node}
            </div>
        )
    }));

    return (
        <div className={`relative overflow-hidden flex ${className}`} style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
                className="flex gap-12 items-center whitespace-nowrap py-20 px-4"
                animate={{
                    x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {/* Repeat tooltipItems for seamless loop */}
                {[...tooltipItems, ...tooltipItems, ...tooltipItems, ...tooltipItems].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-center min-w-[max-content]">
                        <div className="relative">
                            <AnimatedTooltip items={[{ ...item, id: idx }]} />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogoLoop;
