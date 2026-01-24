"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
    id?: string;
    className?: string;
    background?: string;
    particleSize?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
    } = props;
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const controls = useAnimation();

    const particlesLoaded = async (container?: Container) => {
        if (container) {
            controls.start({
                opacity: 1,
                transition: {
                    duration: 1,
                },
            });
        }
    };

    const generatedId = useId();
    return (
        <motion.div animate={controls} className={cn("opacity-0", className)}>
            {init && (
                <Particles
                    id={id || generatedId}
                    className={cn("h-full w-full")}
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: background || "transparent",
                            },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },

                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: true as any,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            bounce: {
                                horizontal: {
                                    value: 1,
                                },
                                vertical: {
                                    value: 1,
                                },
                            },
                            collisions: {
                                absorb: {
                                    speed: 2,
                                },
                                bounce: {
                                    horizontal: {
                                        value: 1,
                                    },
                                    vertical: {
                                        value: 1,
                                    },
                                },
                                enable: false,
                                maxSpeed: 50,
                                mode: "bounce",
                                overlap: {
                                    enable: true,
                                    retries: 0,
                                },
                            },
                            color: {
                                value: particleColor || "#ffffff",
                            },
                            move: {
                                enable: true,
                                speed: {
                                    min: 0.1,
                                    max: 1,
                                },
                                outModes: {
                                    default: "out",
                                },
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 400,
                                    height: 400,
                                },
                                value: particleDensity || 120,
                            },
                            opacity: {
                                value: {
                                    min: 0.1,
                                    max: 1,
                                },
                                animation: {
                                    enable: true,
                                    speed: speed || 4,
                                    sync: false,
                                    startValue: "random",
                                },
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: {
                                    min: minSize || 1,
                                    max: maxSize || 3,
                                },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </motion.div>
    );
};

export const Sparkles = ({
    children,
    className,
    particleColor = "#00d4ff",
    particleDensity = 30,
    minSize = 0.4,
    maxSize = 1.5,
}: {
    children: React.ReactNode;
    className?: string;
    particleColor?: string;
    particleDensity?: number;
    minSize?: number;
    maxSize?: number;
}) => {
    return (
        <div className={cn("relative inline-block", className)}>
            <SparklesCore
                className="absolute inset-0 w-full h-full pointer-events-none"
                particleColor={particleColor}
                particleDensity={particleDensity}
                minSize={minSize}
                maxSize={maxSize}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
