// Single source of truth for all site copy + links, lifted verbatim from the approved
// prototype (Portfolio.dc.html). De-jargonized set. Components read from here — no hardcoded copy.

export const site = {
  name: "Harshan Aiyappa",
  role: "Full-Stack Software Engineer · AI & R&D",
  title: "Harshan Aiyappa — Full-Stack Software Engineer (AI & R&D)",
  description:
    "I design and ship production systems across the stack — from LLM and voice pipelines to the APIs, infrastructure, and interfaces around them. ~5 years turning hard problems into simple, reliable products.",
  ogDescription: "I build production AI, end to end.",
  tagline: "I build production AI, end to end.",
  url: "https://kimo-nexus.vercel.app",
  email: "harshan.aiyappa@gmail.com", // personal contact (canonical)
  location: "Mysore, India · Remote",
  resume: "/resume.pdf",
  photo: "/profile.webp",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Kimosabey" },
  { label: "LinkedIn", href: "https://linkedin.com/in/harshan-aiyappa" },
  { label: "X", href: "https://x.com/HarshanAiyappa" },
] as const;

export const hero = {
  eyebrow: "Full-Stack Software Engineer — AI & R&D",
  // Per-line mask reveal; the token {accent} is rendered in the accent color.
  lines: ["I build", "production {accent:AI},", "end to end."],
  lead:
    "I design and ship production systems across the stack — from LLM and voice pipelines to the APIs, infrastructure, and interfaces around them. ~5 years turning hard problems into simple, reliable products.",
  primaryCta: { label: "View Work", href: "#work" },
  stats: [
    { value: 4.8, dec: 1, suffix: "", label: "Years experience" },
    { value: 40, dec: 0, suffix: "+", label: "Platforms delivered" },
    { value: 250, dec: 0, suffix: "+", label: "Engineers mentored" },
  ],
} as const;

export const about = {
  eyebrow: "About",
  headline: ["Engineering that stays", "simple as it {accent:scales}."],
  paragraphs: [
    "I'm a full-stack engineer working at the intersection of product and applied AI. Day to day that means React/Next.js on the front, Node.js and Python services behind it, and R&D in speech and language tech — TTS, ASR, and NLP — turned into low-latency, production features.",
    "I care about architectural rigor: systems that are understandable, observable, and hold up under load. Over ~5 years I've delivered 40+ platforms end to end and mentored 250+ engineers and students.",
  ],
  note: "Currently building AI/voice platforms at Lingotran. Master's in Computer Applications (MCA).",
  stats: [
    { value: 4.8, dec: 1, suffix: "", label: "Years shipping" },
    { value: 40, dec: 0, suffix: "+", label: "Platforms" },
    { value: 250, dec: 0, suffix: "+", label: "Mentored" },
  ],
} as const;

export const services = {
  eyebrow: "What I do",
  headline: ["Four things, done", "to a production standard."],
  items: [
    { icon: "cpu", title: "AI & Agents", desc: "LangGraph and agentic pipelines, RAG, LLM integration, and voice (TTS/ASR) and NLP built for production." },
    { icon: "network", title: "Distributed Systems", desc: "Event-driven services, Kafka, gRPC, sagas, and high-throughput data flows that stay consistent under load." },
    { icon: "layers", title: "Full-Stack Product", desc: "React, Next.js, TypeScript with Node/FastAPI behind — from design system to deployed product." },
    { icon: "server", title: "Infra & Cloud", desc: "Docker, AWS, Kubernetes, CI/CD, and the observability that keeps it all honest in production." },
  ],
} as const;

export const skills = {
  eyebrow: "Stack",
  headline: "Tools I reach for.",
  groups: [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Radix / shadcn"] },
    { label: "Backend", items: ["Node.js", "Express", "Python", "FastAPI", "Flask", "NestJS", "Java"] },
    { label: "AI / ML", items: ["LangChain", "OpenAI API", "Whisper", "SpaCy", "TensorFlow", "PyTorch"] },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Kafka", "SQL Server"] },
    { label: "DevOps / Cloud", items: ["Docker", "AWS", "Kubernetes", "Git", "Serverless", "Go · GraphQL"] },
  ],
  marquee: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "LangChain", "OpenAI", "Whisper", "Kafka", "Docker", "AWS", "Kubernetes", "PostgreSQL", "Redis", "Go", "gRPC", "TensorFlow"],
} as const;

export const experience = {
  eyebrow: "Experience",
  headline: "The path so far.",
  items: [
    { role: "Full-Stack Software Engineer — AI & R&D", org: "Lingotran Pvt Ltd", period: "Jan 2023 — Present", current: true, desc: "Build and ship AI/voice platforms end to end — real-time TTS/ASR/NLP pipelines, agentic RAG, and the APIs and dashboards around them. Design resilient services for high-throughput data and guide junior engineers on architecture." },
    { role: "Software Engineer", org: "Veriteam Software Solutions", period: "Feb 2021 — Aug 2022", current: false, desc: "Delivered 40+ full-stack products for clients, including the Tabedaar logistics platform and Zeus Biotech — Next.js web, React Native mobile, Node.js API, and MSSQL with layered RBAC. Owned delivery lifecycles and mentored 250+ students and engineers." },
    { role: "MCA — Computer Applications", org: "NIE Institute of Technology, Mysore", period: "2017 — 2020", current: false, desc: "Master's, 8.2 CGPA. Focus on algorithms, distributed systems, and concurrency." },
    { role: "BCA — Computer Applications", org: "University of Mysore", period: "2014 — 2017", current: false, desc: "Bachelor's, 71%. Foundations in computational logic, databases, and the software lifecycle." },
  ],
} as const;

export const testimonials = {
  eyebrow: "Peers",
  headline: ["Endorsed by the people", "I've built with."],
  items: [
    { name: "Aniruddha Bagal", role: "SDE @ Examic EdTech · GitHub Campus Expert", quote: "He translates complex business requirements into scalable solutions. His greatest strength is mentorship — code reviews were always learning opportunities, and he foresees bottlenecks before they become issues." },
    { name: "S Kumar Dhananjaya", role: "Associate SW Engineer @ Examic EdTech", quote: "A rare combination of technical brilliance and a positive, solution-driven mindset. His depth as a full-stack developer and eagerness to take ownership made him an incredible asset to the team." },
    { name: "Kaushik N D", role: "Database Developer & ETL Engineer", quote: "Exceptional full-stack developer who proved invaluable to our success. He architects scalable solutions and moves seamlessly between frontend and backend. A true team player with excellent communication." },
    { name: "Deepak Somayya Mathanda", role: "Digital Marketing & SEO Specialist", quote: "One of the most dedicated and versatile full-stack developers I've met. He turns complex ideas into real-world applications, and leads with empathy while mentoring generously." },
    { name: "Raghav S", role: "Market Research Analyst", quote: "The analytics dashboard he built reflected the kind of developer he is: thoughtful, user-centric, and impactful. He balances technical depth with clarity and simplicity." },
    { name: "Yamini Rajkumar", role: "HR Specialist · Recruitment & L&D", quote: "A talented and reliable software developer with strong problem-solving skills and a collaborative approach. Highly recommended." },
  ],
} as const;

export const contact = {
  headline: ["Let's build", "something{accent:.}"],
  sub: "Open to senior full-stack / AI engineering roles and select collaborations. The fastest way to reach me is email.",
  email: site.email,
} as const;

export const footer = {
  builtWith: "Built with Next.js · Tailwind · Framer Motion",
} as const;

// Copy for the in-page assistant (⌘K → Ask). Grounded strictly in the data above,
// so the wording promises nothing the assistant can't deliver.
export const assistant = {
  tabs: { jump: "Jump", ask: "Ask" },
  placeholder: "Ask about the work, the stack, the experience…",
  intro: "Ask anything about his work. Answers come from this page's own data — if it isn't here, it says so.",
  suggestions: [
    "What's his experience with Kafka?",
    "Show me his voice and audio work",
    "What has he built with LangGraph?",
    "Is he a fit for a senior AI engineering role?",
  ],
  micHint: "Dictation uses your browser's built-in speech service.",
  micDenied: "Microphone blocked — allow access in your browser, or just type.",
  micError: "Dictation didn't catch that. Try again, or type.",
  listening: "Listening…",
  thinking: "Thinking…",
  send: "Send question",
  clear: "Clear conversation",
  networkError: "Couldn't reach the assistant. Check your connection and try again.",
  freeLabel: "cost $0",
  localLabel: "local mode",
} as const;

// Section nav order (rail + mobile menu + scroll-spy).
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Peers" },
  { id: "contact", label: "Contact" },
] as const;
