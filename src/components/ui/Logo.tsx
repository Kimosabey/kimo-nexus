"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Concept: Clear Geometric HA Monogram */}

            {/* Letter H (White) */}
            <motion.path
                d="M20 25 V75 M45 25 V75 M20 50 H45"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Letter A (Primary Blue) */}
            <motion.path
                d="M60 75 L75 25 L90 75 M65 55 H85"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                style={{ stroke: "#6b7bff" }}
            />

            {/* Decorative Dot (Nexus point) */}
            <motion.circle
                cx="75" cy="15" r="3"
                fill="var(--color-primary)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                style={{ fill: "#6b7bff" }}
            />
        </svg>
    </div>
);

export default Logo;
