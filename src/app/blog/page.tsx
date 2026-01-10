import Link from "next/link";

export default function BlogListingPage() {
    return (
        <div className="relative z-10 flex flex-col min-h-screen bg-background-dark text-slate-100 font-display selection:bg-primary selection:text-white">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-dot-grid"></div>
            {/* Navigation */}
            <header className="relative z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <Link href="/" className="text-xl font-bold tracking-tight">DevPortfolio</Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#projects">Work</Link>
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#about">About</Link>
                        <Link className="text-sm font-medium text-white transition-colors" href="/blog">Insights</Link>
                        <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#contact">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <main className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
                        Insights on <br className="hidden md:block" /> <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Hybrid Systems</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl font-light">
                        Exploring the intersection of AI, infrastructure, and full stack engineering. A technical deep dive into scalable architectures.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Sidebar Filters (Sticky on Desktop) */}
                    <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-2">Filter By Topic</h3>
                            <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/20 border border-primary text-white text-sm font-medium transition-all group flex items-center justify-between">
                                    <span>All Insights</span>
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all group flex items-center justify-between">
                                    <span>AI / ML</span>
                                    <span className="opacity-0 group-hover:opacity-50 text-[10px]">04</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all group flex items-center justify-between">
                                    <span>Full Stack</span>
                                    <span className="opacity-0 group-hover:opacity-50 text-[10px]">12</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all group flex items-center justify-between">
                                    <span>Infrastructure</span>
                                    <span className="opacity-0 group-hover:opacity-50 text-[10px]">08</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all group flex items-center justify-between">
                                    <span>System Design</span>
                                    <span className="opacity-0 group-hover:opacity-50 text-[10px]">03</span>
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block pt-8 border-t border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-2">Subscribe</h3>
                            <p className="text-xs text-gray-400 mb-4 px-2 leading-relaxed">Get the latest engineering breakdowns directly to your inbox. No spam, just code.</p>
                            <div className="flex gap-2">
                                <input className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Email address" type="email" />
                                <button className="bg-white text-black px-3 py-2 rounded-md font-bold text-sm hover:bg-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                    {/* Main Content Area */}
                    <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Blog List (Left 2/3) */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Article 1 */}
                            <article className="glass-card rounded-lg p-5 group cursor-pointer relative overflow-hidden">
                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Infrastructure</span>
                                        <span className="text-gray-400 text-xs font-mono">OCT 14, 2023</span>
                                    </div>
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span> 8 min read
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Optimizing Latency in Distributed Ledgers</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                    A deep dive into consensus algorithms, network propagation, and reducing round-trip times in high-frequency global systems.
                                </p>
                                <div className="flex items-center text-white text-xs font-bold group-hover:translate-x-2 transition-transform duration-300">
                                    READ ARTICLE <span className="material-symbols-outlined text-[16px] ml-1">arrow_right_alt</span>
                                </div>
                            </article>
                            {/* Article 2 */}
                            <article className="glass-card rounded-lg p-5 group cursor-pointer relative overflow-hidden">
                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">AI / ML</span>
                                        <span className="text-gray-400 text-xs font-mono">SEP 28, 2023</span>
                                    </div>
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span> 12 min read
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Vector Databases: The Backbone of Modern RAG</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                    Understanding how vector embeddings work and implementing semantic search for large language model applications.
                                </p>
                                <div className="flex items-center text-white text-xs font-bold group-hover:translate-x-2 transition-transform duration-300">
                                    READ ARTICLE <span className="material-symbols-outlined text-[16px] ml-1">arrow_right_alt</span>
                                </div>
                            </article>
                            {/* Article 3 */}
                            <article className="glass-card rounded-lg p-5 group cursor-pointer relative overflow-hidden">
                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Full Stack</span>
                                        <span className="text-gray-400 text-xs font-mono">SEP 10, 2023</span>
                                    </div>
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span> 6 min read
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Server Components in React: A Paradigm Shift</h3>
                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                    Analyzing the performance benefits and complexity trade-offs of moving logic to the server edge.
                                </p>
                                <div className="flex items-center text-white text-xs font-bold group-hover:translate-x-2 transition-transform duration-300">
                                    READ ARTICLE <span className="material-symbols-outlined text-[16px] ml-1">arrow_right_alt</span>
                                </div>
                            </article>

                            <div className="pt-8 flex justify-center">
                                <button className="text-gray-400 hover:text-white text-sm font-medium border-b border-transparent hover:border-white transition-all pb-1">
                                    Load More Articles
                                </button>
                            </div>
                        </div>
                        {/* Featured Bento Box (Right 1/3) */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="tilt-container">
                                <Link href="/blog/scaling-node-microservices" className="block glass-card rounded-xl p-6 h-full flex flex-col items-start relative overflow-hidden group">
                                    {/* Background Gradient Glow */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/40 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/60 transition-colors duration-500"></div>
                                    <div className="flex justify-between items-start w-full mb-6 z-10">
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Featured Story</span>
                                        <span className="material-symbols-outlined text-white/50">star</span>
                                    </div>
                                    <div className="w-full aspect-[4/3] rounded-lg bg-surface-dark mb-6 shadow-2xl relative border border-white/10 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80 z-0"></div>
                                        <div className="absolute inset-0 p-4 opacity-40 font-mono text-[10px] text-green-400/60 leading-tight overflow-hidden select-none">
                                            const cluster = require(&apos;cluster&apos;);<br />
                                            const numCPUs = os.cpus().length;<br />
                                            if (cluster.isMaster) &#123;<br />
                                            for (let i = 0; i &lt; numCPUs; i++) &#123;<br />
                                            cluster.fork();<br />
                                            &#125;<br />
                                            &#125; else &#123;<br />
                                            http.createServer((req, res) =&gt; &#123;<br />
                                            res.writeHead(200);<br />
                                            res.end(&apos;Process &apos; + process.pid);<br />
                                            &#125;).listen(8000);<br />
                                            &#125;
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="material-symbols-outlined text-4xl text-white/80">hub</span>
                                        </div>
                                    </div>
                                    <div className="z-10 w-full">
                                        <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">Scaling Node.js Microservices</h3>
                                        <p className="text-gray-400 text-sm mb-4">Architecture deep dive into event loops and worker threads.</p>
                                        <span className="w-full bg-white text-black font-bold text-sm py-2.5 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                            Read Analysis
                                            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            {/* Small Bento Item: Popular Tags */}
                            <div className="glass-card rounded-xl p-5">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Trending Tags</h4>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 border border-white/5 hover:border-white/20 cursor-pointer transition-all">#react</span>
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 border border-white/5 hover:border-white/20 cursor-pointer transition-all">#kubernetes</span>
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 border border-white/5 hover:border-white/20 cursor-pointer transition-all">#systemdesign</span>
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 border border-white/5 hover:border-white/20 cursor-pointer transition-all">#performance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="border-t border-white/5 mt-12 bg-background-dark py-12">
                <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-400 text-sm">
                        © 2024 DevPortfolio. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">GitHub</Link>
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">Twitter</Link>
                        <Link className="text-gray-400 hover:text-white transition-colors" href="#">LinkedIn</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
