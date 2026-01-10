"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Concept: The Full Stack Interlock */}
            {/* Left/Bottom Bracket (Backend/Structure) - White */}
            <motion.path
                d="M30 25 V75 H60"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
            />

            {/* Right/Top Bracket (Frontend/Surface) - Primary Blue */}
            <motion.path
                d="M70 75 V25 H40"
                stroke="var(--color-primary)" /* Uses Tailwind Primary variable if defined, else fallback hex */
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
                style={{ stroke: "#6b7bff" }}
            />

            {/* Intersection Dot - The API/Fusion point */}
            <motion.circle
                cx="50" cy="50" r="0"
                fill="white"
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 5, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 300, damping: 15 }}
            />
        </svg>
    </div>
);

export default Logo;
