"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Concept: H + A Fusion */}

            {/* Left Pillar (H) */}
            <motion.path
                d="M25 25 V75"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            />

            {/* Right Pillar (H) */}
            <motion.path
                d="M75 25 V75"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            />

            {/* The 'A' Peak Connection */}
            {/* Connects the two pillars with an ascending chevron, forming 'A' and the crossbar of 'H' simultaneously */}
            <motion.path
                d="M25 55 L50 30 L75 55"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "anticipate" }}
                style={{ stroke: "#6b7bff", filter: "drop-shadow(0 0 4px rgba(107,123,255,0.5))" }}
            />

            {/* Optional Crossbar for 'A' definition - subtle */}
            <motion.path
                d="M40 50 H60"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ stroke: "#6b7bff" }}
            />

        </svg>
    </div>
);

export default Logo;
