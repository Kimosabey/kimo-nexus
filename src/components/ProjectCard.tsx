'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";
import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython,
    SiPostgresql, SiDocker, SiOpenai, SiReact, SiMongodb
} from 'react-icons/si';

const techIconMap: Record<string, any> = {
    "Next.js": SiNextdotjs,
    "TypeScript": SiTypescript,
    "Tailwind CSS": SiTailwindcss,
    "Node.js": SiNodedotjs,
    "Python": SiPython,
    "PostgreSQL": SiPostgresql,
    "Docker": SiDocker,
    "OpenAI": SiOpenai,
    "React": SiReact,
    "MongoDB": SiMongodb,
};

const ProjectCard = memo(({ project, index }: { project: Project, index: number }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <BackgroundGradient
            containerClassName="rounded-[40px_8px_40px_8px] group-hover:rounded-[48px_12px_48px_12px] transition-all duration-700"
            className="rounded-[40px_8px_40px_8px] group-hover:rounded-[48px_12px_48px_12px]"
        >
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="group relative flex flex-col justify-end overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-cyan-400/40 transition-all duration-700 min-h-[360px] md:min-h-[450px] lg:h-[500px] 3xl:h-[700px] will-change-transform"
                style={{
                    borderRadius: '40px 8px 40px 8px', // Liquid Leaf / Ocean Wave Shape
                }}
                whileHover={{
                    y: -8,
                    boxShadow: '0_24px_48px_rgba(0,212,255,0.2), 0_0_80px_rgba(0,212,255,0.15), 0_0_1px_rgba(255,255,255,0.2)',
                    borderRadius: '48px 12px 48px 12px' // Morphing effect on hover
                }}
            >
                {/* Animated Gradient Border */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        borderRadius: 'inherit', // Inherit from parent
                        background: 'linear-gradient(135deg, #00d4ff, #00ffcc, #14b8a6, transparent)',
                        padding: '1px',
                        WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                    }}
                />

                {/* Background Image with Parallax */}
                <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top opacity-95 md:opacity-90 group-hover:opacity-75 transition-opacity duration-500"
                            priority={index < 2}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/85 to-[#08080a]/50" />
                </div>

                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{
                        borderRadius: 'inherit',
                    }}
                />

                {/* Holographic Glow with Color Shift */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15), rgba(20,184,166,0.1), transparent)',
                        borderRadius: 'inherit',
                    }}
                    animate={{
                        background: [
                            'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.15), rgba(20,184,166,0.1), transparent)',
                            'radial-gradient(circle at 70% 70%, rgba(20,184,166,0.15), rgba(0,255,204,0.1), transparent)',
                            'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.15), rgba(20,184,166,0.1), transparent)',
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Animated Tooltip Area for Tech Icons */}
                <div className="absolute top-6 right-6 z-20 flex flex-row items-center">
                    <AnimatedTooltip
                        items={project.techStack.slice(0, 5).map((tech, i) => {
                            const Icon = techIconMap[tech] || SiReact;
                            return {
                                id: i,
                                name: tech,
                                designation: i === 0 ? "Core Tech" : "Integration",
                                icon: <Icon className="w-5 h-5 3xl:w-10 3xl:h-10 text-cyan-400" />
                            };
                        })}
                    />
                </div>

                <div className="relative z-10 p-5 md:p-6 lg:p-8 flex flex-col h-full justify-end">
                    <div className="mb-auto"></div>

                    <motion.div className="flex flex-col">
                        <h3 className="text-xl md:text-2xl lg:text-3xl 3xl:text-5xl font-display font-bold text-white mb-2 md:mb-3 3xl:mb-6 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-gray-400 text-xs md:text-sm lg:text-base 3xl:text-2xl leading-relaxed line-clamp-2 md:line-clamp-3 3xl:line-clamp-4 mb-4 md:mb-6 3xl:mb-10 max-w-lg 3xl:max-w-3xl opacity-90 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
                            {project.description}
                        </p>

                        <div className="flex flex-col gap-3 md:gap-4">
                            {/* Tech Stack Chips with Stagger */}
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {project.techStack.slice(0, 4).map((tech, i) => (
                                    <motion.span
                                        key={i}
                                        className="px-2 md:px-2.5 3xl:px-6 py-0.5 md:py-1 3xl:py-3 text-[9px] md:text-[10px] lg:text-xs 3xl:text-xl font-mono text-gray-400 bg-white/5 border border-white/10 rounded-full whitespace-nowrap hover:border-cyan-400/50 hover:text-white transition-all"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,255,0.1)' }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Action Line with Premium Animation */}
                            <motion.div
                                className="pt-3 md:pt-4 border-t border-white/10 flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0"
                                initial={{ borderColor: 'rgba(255,255,255,0.1)' }}
                                whileHover={{ borderColor: 'rgba(0,212,255,0.3)' }}
                            >
                                <span className="text-[10px] md:text-xs 3xl:text-xl font-mono text-cyan-400 font-bold uppercase tracking-widest">
                                    {project.highlight}
                                </span>
                                {!project.upcoming && (
                                    <motion.div
                                        onClick={() => window.open(project.repoUrl, "_blank")}
                                        className="flex items-center gap-1.5 md:gap-2 text-white hover:text-cyan-400 transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest min-h-[44px] md:min-h-0 -m-2 p-2 md:m-0 md:p-0 cursor-pointer z-20"
                                        aria-label={`View ${project.title} project`}
                                        whileHover={{ x: 3 }}
                                    >
                                        View <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Full Card Link - Desktop only */}
                {!project.upcoming && (
                    <a href={project.repoUrl} target="_blank" className="hidden md:block absolute inset-0 z-[5] cursor-pointer" aria-label={`View ${project.title}`} />
                )}
            </motion.article>
        </BackgroundGradient>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
