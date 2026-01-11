'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experience = [
    {
        type: 'work',
        role: "Senior Full Stack Engineer",
        company: "TechFlow Systems",
        period: "2023 - Present",
        description: "Architecting distributed AI systems using Next.js and Python. Reduced cloud costs by 40% via serverless optimization.",
        skills: ["Next.js", "AWS", "Python", "System Design"]
    },
    {
        type: 'work',
        role: "Full Stack Developer",
        company: "Nexus Creative",
        period: "2021 - 2023",
        description: "Led the frontend migration to React 18. Implemented real-time collaboration features for 50k+ users.",
        skills: ["React", "TypeScript", "WebSocket", "Redis"]
    },
    {
        type: 'education',
        role: "B.Tech in Computer Science",
        company: "University of Technology",
        period: "2017 - 2021",
        description: "Specialized in Artificial Intelligence and Distributed Systems. Graduated with Honors.",
        skills: ["AI/ML", "Algorithms", "Data Structures"]
    }
];

export default function Experience() {
    return (
        <section className="py-24 md:py-32 relative" id="experience">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 block">Trajectory</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">Career <br /> Timeline</h2>
                    </div>
                    <div className="h-px bg-white/10 flex-grow ml-8 hidden md:block" />
                </motion.div>

                <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 md:space-y-16">
                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-400 box-content border-4 border-[#0a0a0c] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`p-2 rounded-lg bg-white/5 text-cyan-400 ${item.type === 'education' ? 'text-teal-400' : ''}`}>
                                            {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                                        </span>
                                        <span className="font-mono text-xs text-gray-500 flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            {item.period}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                                        {item.role}
                                    </h3>
                                    <div className="text-base text-gray-400 font-medium mb-4">{item.company}</div>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-4">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.skills.map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-cyan-400/80 border border-white/5">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
