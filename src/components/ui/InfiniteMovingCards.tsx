import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            getDirection();
            getSpeed();
            setStart(true);
        }
    }, [direction, speed]);

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                className={cn(
                    "flex min-w-full shrink-0 gap-6 py-12 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {/* Duplicate items array for seamless infinite loop */}
                {[...items, ...items].map((item, idx) => (
                    <li
                        className="w-[280px] md:w-[450px] lg:w-[480px] relative rounded-[2.5rem] flex-shrink-0 border border-white/5 px-6 py-8 md:px-10 md:py-12 group/card transition-all duration-500 hover:border-cyan-400/30 overflow-hidden"
                        style={{
                            background: "rgba(10, 10, 12, 0.6)",
                            backdropFilter: "blur(16px)"
                        }}
                        key={`testimonial-${idx}`}
                    >
                        {/* Dynamic Rim Light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                        <blockquote>
                            <div className="relative z-30 mb-8">
                                <span className="text-4xl md:text-6xl text-cyan-400/20 font-serif absolute -top-4 -left-2 leading-none">"</span>
                                <p className="relative text-sm md:text-lg lg:text-xl leading-[1.7] text-gray-300 font-light italic text-balance">
                                    {item.quote}
                                </p>
                            </div>

                            <div className="relative z-30 mt-8 pt-8 border-t border-white/5 flex flex-row items-center gap-4">
                                <div className="h-10 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm md:text-base lg:text-lg font-bold text-white tracking-tight">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] md:text-xs font-mono font-medium text-cyan-400 uppercase tracking-widest opacity-80">
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
