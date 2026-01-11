'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const recommendations = [
    {
        name: "Aniruddha Bagal",
        role: "SDE @ Examic Edtech | GitHub Campus Expert",
        image: "/avatars/aniruddha.jpg",
        text: "I witnessed first-hand his ability to translate complex business requirements into scalable solutions. Harshan’s greatest strength is his mentorship; his code reviews were always insightful learning opportunities. A rare talent for foreseeing bottlenecks before they become issues."
    },
    {
        name: "Deepak Somayya Mathanda",
        role: "Digital Marketing & SEO Specialist",
        image: "/avatars/deepak.jpg",
        text: "One of the most dedicated and versatile full stack developers I’ve met. His ability to turn complex ideas into real-world applications is impressive. A natural team player who leads with empathy and mentors generously."
    },
    {
        name: "Yamini Rajkumar",
        role: "HR Specialist @ Recruitment & L&D",
        image: "/avatars/yamini.jpg",
        text: "Harshan is a talented and reliable software developer with strong problem-solving skills and a collaborative approach. Highly recommended!"
    },
    {
        name: "Raghav S",
        role: "Market Research Analyst",
        image: "/avatars/raghav.jpg",
        text: "The analytics dashboard he built reflected the kind of developer he is: thoughtful, user-centric, and impactful. He balances technical depth with clarity and simplicity. Humble, curious, and incredibly grounded."
    },
    {
        name: "Kaushik N D",
        role: "Database Developer & ETL Engineer",
        image: "/avatars/kaushik.jpg",
        text: "Exceptional full stack developer who proved invaluable to our success. His ability to architect scalable solutions and seamlessly transition between frontend and backend is remarkable. A true team player with excellent communication."
    },
    {
        name: "S Kumar Dhananjaya",
        role: "Associate SW Engineer @ Examic EdTech",
        image: "/avatars/dhananjaya.jpg",
        text: "Harshan is a rare combination of technical brilliance and a positive, solution-driven mindset. His deep expertise as a Full-Stack Developer and eagerness to take ownership made him an incredible asset to the team."
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden" id="testimonials">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-3 block">
                        // TRUST_SIGNAL
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Endorsed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Peers & Innovators</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Systems are built with code. Legacies are built with people. <br className="hidden md:block" />
                        Here represents the authentic trust earned in the trenches of development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative p-8 rounded-[32px] bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5 hover:border-cyan-400/30 transition-all group"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <p className="text-gray-300 leading-relaxed mb-8 flex-grow">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden relative">
                                        {/* Placeholder Avatar - Replace with actual images */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 opacity-20" />
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-400">
                                            {item.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm tracking-wide">{item.name}</h4>
                                        <p className="text-cyan-400 text-xs font-mono">{item.role}</p>
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
