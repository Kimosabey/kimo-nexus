"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                "row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-200 p-6 justify-between flex flex-col space-y-4",
                "bg-white/5 border border-white/5 hover:border-cyan-400/40 hover:bg-white/10",
                "hover:shadow-[0_0_40px_-5px_rgba(0,212,255,0.3)]",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-1 transition duration-200">
                {icon}
                <div className="font-bold text-white text-lg mb-2 mt-2">
                    {title}
                </div>
                <div className="font-normal text-gray-400 text-sm leading-relaxed">
                    {description}
                </div>
            </div>
        </motion.div>
    );
};
