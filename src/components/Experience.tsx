"use client";
import { Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { Timeline } from './ui/timeline';
import { AnimatedTooltip } from './ui/AnimatedTooltip';

const experienceData = [
    {
        type: 'work',
        role: "Fullstack Architect (AI Systems & R&D)",
        company: "Lingotran Private Limited",
        period: "Jan 2023 - Present",
        description: "Orchestrating high-fidelity neural interfaces and autonomous AI agents. Successfully prototyped and deployed the 'Nexus Intelligence' suite including voice-based learning modules (TTS + ASR), agentic RAG pipelines, and sentient analytics dashboards. Designing resilient micro-architectures to stabilize high-throughput data streams while providing architectural guidance to junior developers.",
        skills: ["Neural AI", "LangChain Hub", "FastAPI Core", "Chakra UI", "Data Siphoning", "Scrum Master"],
        year: "2023 - Present"
    },
    {
        type: 'work',
        role: "Full Stack Software Engineer",
        company: "Veriteam Software Solutions Pvt. Ltd.",
        period: "Feb 2021 - Aug 2022",
        description: "Engineered and siphoned data for 40+ full-stack digital environments. Key manifests include the 'Tabedaar' Hyperlocal Node and the 'Zeus' Enterprise Core with multi-layered RBAC. Directed the development lifecycle for 40+ proprietary builds while mentoring 250+ students and engineering developers in modern MVC principles.",
        skills: ["React Core", "Node.js Engine", "Python Core", "Flask", "PostgreSQL", "JSP Legacy", "System Mentorship"],
        year: "2021 - 2022"
    },
    {
        type: 'education',
        role: "Master of Computer Applications (MCA)",
        company: "NIE Institute of Technology, Mysore",
        period: "2017 - 2020",
        description: "Deep-layer research into Advanced Algorithmic Patterns and Distributed Compute Fabrics. Graduated with honors (8.2 Grade). Focus on system determinism in high-concurrency environments.",
        skills: ["Dist. Compute", "Neural Logic", "Architecture"],
        year: "2017 - 2020"
    },
    {
        type: 'education',
        role: "Bachelor of Computer Applications (BCA)",
        company: "University of Mysore (Computer Science)",
        period: "Jun 2014 - Jul 2017",
        description: "Foundational protocols in computational logic, database normalization, and systematic software development lifecycles. Graduated with 71%.",
        skills: ["Logic Foundation", "Data Layers", "Core Dev"],
        year: "2014 - 2017"
    }
];

export default function Experience() {
    const timelineData = experienceData.map((item) => ({
        title: item.year,
        content: (
            <div className="group/exp relative p-5 md:p-8 rounded-[2rem] bg-[#0a0a0c]/40 border border-white/5 hover:border-cyan-500/20 transition-all duration-700 overflow-hidden backdrop-blur-md mb-8 shadow-2xl">
                {/* Dynamic Ambient Glow */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/5 blur-[120px] group-hover/exp:bg-cyan-500/10 transition-colors duration-700 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="relative w-16 h-16 flex items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-cyan-400 group-hover/exp:scale-105 group-hover/exp:border-cyan-400/50 group-hover/exp:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-500">
                            {item.type === 'work' ? <Briefcase size={28} strokeWidth={1.5} /> : <GraduationCap size={28} strokeWidth={1.5} />}
                            <div className="absolute inset-0 bg-cyan-400/20 blur-2xl opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                        <div className="space-y-1">
                            <span className="font-mono text-[10px] text-cyan-400/90 bg-cyan-400/5 px-3 py-1 rounded-full border border-cyan-400/20 tracking-[0.2em] uppercase font-bold">
                                {item.period}
                            </span>
                            <h3 className="text-lg md:text-3xl font-black text-white font-display uppercase tracking-tight leading-tight group-hover/exp:text-cyan-400 transition-colors">
                                {item.role}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-[1.2rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl group-hover/exp:border-cyan-400/30 transition-all self-start md:self-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.8)] animate-pulse" />
                        <span className="text-base md:text-lg text-gray-200 font-bold tracking-tight font-display uppercase">{item.company}</span>
                    </div>
                </div>

                <div className="relative mb-10 group/desc">
                    <div className="absolute -left-4 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-20 group-hover/desc:opacity-60 transition-opacity" />
                    <p className="text-gray-400 text-sm md:text-lg lg:text-xl leading-[1.7] max-w-4xl font-light italic tracking-wide group-hover/exp:text-gray-200 transition-colors">
                        "{item.description}"
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10">
                    {item.skills.map((skill, i) => (
                        <div key={i} className="group/skill relative">
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover/skill:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative px-6 py-2.5 bg-black/40 border border-white/5 rounded-2xl text-[10px] md:text-[12px] font-mono font-black text-gray-400 group-hover:text-cyan-400 group-hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-xl flex items-center gap-3 uppercase tracking-widest">
                                <Code2 size={12} className="text-cyan-400/40 group-hover/skill:text-cyan-400" />
                                {skill}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }));

    return (
        <section id="experience" className="w-full relative z-10 py-20 border-t border-white/5">
            <Timeline data={timelineData} />
        </section>
    );
}
