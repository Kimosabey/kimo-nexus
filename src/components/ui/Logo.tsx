"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Left Pillar (H) */}
            <motion.rect
                x="20" y="20" width="12" height="60" rx="2"
                fill="currentColor"
                className="text-white"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
            />

            {/* Right Pillar (H/A) */}
            <motion.rect
                x="68" y="20" width="12" height="60" rx="2"
                fill="currentColor"
                className="text-white"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
            />

            {/* The Neural Pulse (Audio Waveform representation) */}
            <motion.path
                d="M 32 50 L 42 35 L 58 65 L 68 50"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                className="text-primary"
                style={{ filter: "url(#glow)" }}
            />

            {/* Optional: Digital Dot/Node */}
            <motion.circle
                cx="50" cy="50" r="0"
                fill="currentColor"
                className="text-white mix-blend-overlay"
                animate={{ r: [0, 15, 0], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
        </svg>
    </div>
);

export default Logo;
