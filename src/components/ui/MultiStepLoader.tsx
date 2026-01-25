"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CheckIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn("w-6 h-6 text-cyan-500/50", className)}
        >
            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
};

const CheckFilledIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn("w-6 h-6 text-cyan-400", className)}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
};

type Step = {
    text: string;
};

const LoaderCore = ({
    loadingStates,
    value = 0,
}: {
    loadingStates: Step[];
    value?: number;
}) => {
    return (
        <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, gradient is 0.2

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: opacity, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "flex gap-2 text-left mb-4 font-mono font-bold uppercase tracking-widest text-sm",
                            index === value ? "text-cyan-400" : "text-white/20"
                        )}
                    >
                        <div className="w-8 flex justify-center items-center">
                            {index > value && (
                                <span className="text-white/10">[ ]</span>
                            )}
                            {index <= value && (
                                <span className={cn(index === value ? "text-cyan-400" : "text-cyan-500/50")}>
                                    [x]
                                </span>
                            )}
                        </div>
                        <span className={cn(
                            index === value && "text-shadow-glow"
                        )}>
                            {loadingState.text}
                            {index === value && <span className="animate-pulse">_</span>}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
    loadingStates,
    loading,
    duration = 2000,
    loop = true,
}: {
    loadingStates: Step[];
    loading?: boolean;
    duration?: number;
    loop?: boolean;
}) => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            return;
        }
        const timeout = setTimeout(() => {
            setCurrentState((prev) =>
                loop
                    ? prev === loadingStates.length - 1
                        ? 0
                        : prev + 1
                    : Math.min(prev + 1, loadingStates.length - 1)
            );
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentState, loading, loop, loadingStates.length, duration]);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full fixed inset-0 z-[10000] flex items-center justify-center bg-[#000000]"
                >
                    <div className="h-96 relative">
                        <LoaderCore value={currentState} loadingStates={loadingStates} />
                    </div>

                    <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_0%,white)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
