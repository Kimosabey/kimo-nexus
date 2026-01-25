'use client';

import { motion } from 'framer-motion';

const recommendations = [
    {
        name: "Aniruddha Bagal",
        title: "SDE @ Examic Edtech | GitHub Campus Expert",
        quote: "I witnessed first-hand his ability to translate complex business requirements into scalable solutions. Harshan's greatest strength is his mentorship; his code reviews were always insightful learning opportunities. A rare talent for foreseeing bottlenecks before they become issues."
    },
    {
        name: "Deepak Somayya Mathanda",
        title: "Digital Marketing & SEO Specialist",
        quote: "One of the most dedicated and versatile full stack developers I've met. His ability to turn complex ideas into real-world applications is impressive. A natural team player who leads with empathy and mentors generously."
    },
    {
        name: "Yamini Rajkumar",
        title: "HR Specialist @ Recruitment & L&D",
        quote: "Harshan is a talented and reliable software developer with strong problem-solving skills and a collaborative approach. Highly recommended!"
    },
    {
        name: "Raghav S",
        title: "Market Research Analyst",
        quote: "The analytics dashboard he built reflected the kind of developer he is: thoughtful, user-centric, and impactful. He balances technical depth with clarity and simplicity. Humble, curious, and incredibly grounded."
    },
    {
        name: "Kaushik N D",
        title: "Database Developer & ETL Engineer",
        quote: "Exceptional full stack developer who proved invaluable to our success. His ability to architect scalable solutions and seamlessly transition between frontend and backend is remarkable. A true team player with excellent communication."
    },
    {
        name: "S Kumar Dhananjaya",
        title: "Associate SW Engineer @ Examic EdTech",
        quote: "Harshan is a rare combination of technical brilliance and a positive, solution-driven mindset. His deep expertise as a Full-Stack Developer and eagerness to take ownership made him an incredible asset to the team."
    }
];

function TestimonialCard({ item, index }: { item: typeof recommendations[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-full rounded-[2rem] md:rounded-[2.5rem] border border-white/5 p-6 md:p-10 transition-all duration-500 hover:border-cyan-400/30 overflow-hidden"
            style={{
                background: "rgba(10, 10, 12, 0.4)",
                backdropFilter: "blur(16px)"
            }}
        >
            {/* Dynamic Rim Light */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <span className="text-4xl md:text-6xl text-cyan-400/20 font-serif leading-none select-none">"</span>
                    <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-300 font-light italic mt-2">
                        {item.quote}
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="h-10 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full shrink-0" />
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-sm md:text-base font-bold text-white tracking-tight truncate">
                            {item.name}
                        </span>
                        <span className="text-[10px] md:text-xs font-mono font-medium text-cyan-400 uppercase tracking-widest opacity-80 truncate">
                            {item.title}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Testimonials() {
    return (
        <section className="relative w-full" id="testimonials">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-2 mb-12 md:mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
                        <div className="flex flex-col">
                            <span className="text-cyan-400 font-mono text-[9px] md:text-xs tracking-[0.5em] uppercase font-bold text-shadow-glow">SYSTEM_CORE: VALIDATION</span>
                            <span className="text-gray-500 font-mono text-[8px] uppercase tracking-[0.3em]">Revision_4.3.5</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mt-4 mb-4">
                        Endorsed by <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 italic">Industry Peers</span>
                    </h2>
                    <p className="text-gray-400/80 max-w-2xl text-sm md:text-lg font-light leading-relaxed">
                        Authentic trust earned through architectural rigour and seamless collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {recommendations.map((item, i) => (
                        <TestimonialCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
