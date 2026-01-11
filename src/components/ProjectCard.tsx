'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

const ProjectCard = memo(({ project, index }: { project: Project, index: number }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="group relative flex flex-col justify-end overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-cyan-400/40 transition-all duration-700 min-h-[360px] md:min-h-[450px] lg:h-[500px] will-change-transform"
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
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top opacity-95 md:opacity-90 group-hover:opacity-75 transition-opacity duration-500"
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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

            {/* PREMIUM TOOLTIP - Desktop Only */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="hidden md:block absolute top-4 right-4 z-30 pointer-events-none"
                    >
                        <div className="relative px-4 py-3 bg-[#0a0a0c]/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-[0_8px_32px_rgba(0,212,255,0.25)]">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-teal-500/10 rounded-2xl blur-md -z-10" />

                            {/* Content */}
                            <motion.div
                                className="flex flex-col gap-2"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                <motion.div
                                    className="flex items-center gap-2"
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-xs font-mono text-white font-bold">{project.techStack.length} Technologies</span>
                                </motion.div>

                                <motion.div
                                    className="text-[10px] font-mono text-gray-400"
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    {project.upcoming ? '🔨 In Development' : '✨ Production Ready'}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 p-5 md:p-6 lg:p-8 flex flex-col h-full justify-end">
                <div className="mb-auto"></div>

                <motion.div className="flex flex-col">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-2 md:mb-3 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 max-w-lg opacity-90 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
                        {project.description}
                    </p>

                    <div className="flex flex-col gap-3 md:gap-4">
                        {/* Tech Stack Chips with Stagger */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                                <motion.span
                                    key={i}
                                    className="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[10px] lg:text-xs font-mono text-gray-400 bg-white/5 border border-white/10 rounded-full whitespace-nowrap hover:border-cyan-400/50 hover:text-white transition-all"
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
                            <span className="text-[10px] md:text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                                {project.highlight}
                            </span>
                            {!project.upcoming && (
                                <motion.a
                                    href={project.repoUrl}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 md:gap-2 text-white hover:text-cyan-400 transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest min-h-[44px] md:min-h-0 -m-2 p-2 md:m-0 md:p-0"
                                    aria-label={`View ${project.title} project`}
                                    whileHover={{ x: 3 }}
                                >
                                    View <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                </motion.a>
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
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
