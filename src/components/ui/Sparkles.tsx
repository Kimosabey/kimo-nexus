"use client";
import React from "react";
import { useId } from "react";

export const SparklesCore = (props: {
    id?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    className?: string;
    particleColor?: string;
}) => {
    const {
        id,
        background,
        minSize,
        maxSize,
        particleDensity,
        className,
        particleColor,
    } = props;
    const generatedId = useId();
    const effectId = id || generatedId;

    return (
        <svg className={className}>
            <defs>
                <filter id={`blurFilter-${effectId}`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                </filter>
                <radialGradient id={`glowGradient-${effectId}`}>
                    <stop offset="0%" stopColor={particleColor || "#00d4ff"} stopOpacity="1" />
                    <stop offset="100%" stopColor={particleColor || "#00d4ff"} stopOpacity="0" />
                </radialGradient>
            </defs>
            <g filter={`url(#blurFilter-${effectId})`}>
                {[...Array(particleDensity || 50)].map((_, index) => {
                    const size = Math.random() * ((maxSize || 2) - (minSize || 0.5)) + (minSize || 0.5);
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const delay = Math.random() * 2;
                    const duration = Math.random() * 2 + 2;

                    return (
                        <circle
                            key={index}
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r={size}
                            fill={`url(#glowGradient-${effectId})`}
                            opacity="0"
                        >
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur={`${duration}s`}
                                begin={`${delay}s`}
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values={`${y}%;${y - 5}%;${y}%`}
                                dur={`${duration}s`}
                                begin={`${delay}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    );
                })}
            </g>
        </svg>
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
        <div className={`relative inline-block ${className}`}>
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
