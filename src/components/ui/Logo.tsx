"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Left Bar */}
            <motion.path
                d="M30 20 L30 80"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-white"
            />
            {/* Right Bar - Split for 'A' suggestion or just style */}
            <motion.path
                d="M70 20 L70 80"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-white"
            />
            {/* Crossbar - The Nexus Connection */}
            <motion.path
                d="M30 50 L50 40 L70 50"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "anticipate" }}
                className="text-primary drop-shadow-[0_0_8px_rgba(107,123,255,0.8)]"
            />
            {/* Central Node */}
            <motion.circle
                cx="50" cy="40" r="4"
                fill="currentColor"
                className="text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
            />
        </svg>
    </div>
);

export default Logo;
