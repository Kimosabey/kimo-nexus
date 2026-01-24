"use client";
import { Briefcase, GraduationCap } from 'lucide-react';
import { Timeline } from './ui/timeline';
import { AnimatedTooltip } from './ui/AnimatedTooltip';

const experienceData = [
    {
        type: 'work',
        role: "Senior Full Stack & AI Engineer",
        company: "Lingotran Pvt. Ltd.",
        period: "Jan 2023 - Present",
        description: "Spearheading R&D for voice-first platforms (TTS/ASR) and LangChain-powered AI assistants. Architecting scalable microservices using Python & Node.js while leading core feature delivery.",
        skills: ["Hybrid AI", "LangChain", "Next.js", "Python", "TTS/ASR"],
        year: "2023 - Present"
    },
    {
        type: 'work',
        role: "Full Stack Engineer",
        company: "Veriteam Software Solutions",
        period: "Feb 2021 - Jul 2022",
        description: "Architected scalable platforms including 'Tabedaar' (Hyperlocal Multi-vendor E-commerce & Delivery) and 'Zeus Biotech' (Enterprise CMS with RBAC). Oversaw delivery of 35+ projects while mentoring 200+ developers.",
        skills: ["React", "Node.js", "RBAC", "PostgreSQL", "Architecture"],
        year: "2021 - 2022"
    },
    {
        type: 'education',
        role: "Master of Computer Applications",
        company: "The NIE College, Mysore",
        period: "2017 - 2020",
        description: "Specialized in Advanced Algorithms and Distributed Computing. Awarded Distinction (8.2 CGPA).",
        skills: ["Distributed Systems", "AI/ML", "Algorithms"],
        year: "2017 - 2020"
    }
];

export default function Experience() {
    const timelineData = experienceData.map((item) => ({
        title: item.year,
        content: (
            <div className="group/exp relative p-5 md:p-8 rounded-[2rem] bg-[#0a0a0c]/60 border border-white/5 hover:border-cyan-500/20 transition-all duration-700 overflow-hidden backdrop-blur-xl mb-8 shadow-2xl">
                {/* Dynamic Ambient Glow */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/5 blur-[120px] group-hover/exp:bg-cyan-500/10 transition-colors duration-700 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="relative w-16 h-16 flex items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-cyan-400 group-hover/exp:scale-105 group-hover/exp:border-cyan-400/50 transition-all duration-500">
                            {item.type === 'work' ? <Briefcase size={28} strokeWidth={1.5} /> : <GraduationCap size={28} strokeWidth={1.5} />}
                            <div className="absolute inset-0 bg-cyan-400/20 blur-2xl opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="font-mono text-[9px] text-cyan-400/90 bg-cyan-400/10 px-3 py-0.5 rounded-full border border-cyan-400/20 tracking-widest uppercase">
                                {item.period}
                            </span>
                            <h3 className="text-xl md:text-3xl font-bold text-white font-display tracking-tight leading-tight">
                                {item.role}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-[1rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl group-hover/exp:border-white/10 transition-colors self-start md:self-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
                        <span className="text-base text-gray-200 font-semibold tracking-tight">{item.company}</span>
                    </div>
                </div>

                <div className="relative mb-8">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-30" />
                    <p className="text-gray-400 text-sm md:text-lg lg:text-xl leading-[1.6] max-w-4xl pl-6 font-light italic">
                        "{item.description}"
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10">
                    {item.skills.map((skill, i) => (
                        <div key={i} className="group/skill relative">
                            <div className="absolute inset-0 bg-cyan-400/15 blur-xl opacity-0 group-hover/skill:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] md:text-[13px] font-mono font-bold text-gray-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-xl flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20 group-hover/skill:bg-cyan-400 transition-colors" />
                                {skill}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }));

    return (
        <section id="experience" className="bg-[#050505] py-20 border-t border-white/5">
            <Timeline data={timelineData} />
        </section>
    );
}
