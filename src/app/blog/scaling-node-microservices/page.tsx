import Link from "next/link";

export default function BlogPostPage() {
    return (
        <div className="relative z-10 flex flex-col min-h-screen bg-background-dark text-off-white font-body selection:bg-primary selection:text-white">
            {/* Film Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay bg-noise"></div>

            {/* Top Navigation */}
            <nav className="fixed top-0 w-full z-40 bg-background-dark/90 backdrop-blur-md border-b border-white/10">
                {/* Progress Bar (Static visualization) */}
                <div className="absolute top-0 left-0 h-[2px] w-full bg-[#333]">
                    <div className="h-full bg-gradient-to-r from-gray-600 via-silver to-gray-600 w-[35%] shadow-[0_0_10px_rgba(192,192,192,0.5)]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="size-6 text-white bg-primary/20 rounded flex items-center justify-center border border-primary/30 group-hover:bg-primary/40 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">terminal</span>
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">ALEX.DEV</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="font-display text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/#projects">Work</Link>
                        <Link className="font-display text-sm font-medium text-gray-400 hover:text-white transition-colors" href="/blog">Writing</Link>
                    </div>
                    <button className="font-display text-xs font-bold uppercase tracking-wider px-4 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors text-white">
                        Contact
                    </button>
                </div>
            </nav>

            <main className="relative pt-32 pb-20 min-h-screen">
                <article className="max-w-[700px] mx-auto px-6 relative z-0">
                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2 py-1 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] uppercase font-display font-bold tracking-widest">Systems Architecture</span>
                            <span className="text-gray-500 text-xs font-display uppercase tracking-widest">12 min read</span>
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white mb-6">
                            Scaling Node.js Microservices: A Retrospective
                        </h1>
                        <div className="flex items-center justify-between border-t border-b border-white/10 py-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 overflow-hidden border border-white/10">
                                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">AD</div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-display font-bold text-white">Alex Dev</span>
                                    <span className="text-xs font-display text-gray-500">Senior Staff Engineer</span>
                                </div>
                            </div>
                            <span className="text-sm font-display text-gray-400">Oct 24, 2023</span>
                        </div>
                    </header>

                    {/* Body Text */}
                    <div className="font-body text-xl leading-[1.8] text-[#d4d4d4] space-y-8">
                        <p className="first-letter:float-left first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:font-bold first-letter:mr-3 first-letter:mt-1 first-letter:text-silver first-letter:font-display mb-8">
                            When we first transitioned our monolithic payments engine to a distributed microservices architecture, the promise was infinite scalability. The reality, as it often tends to be in distributed systems, was a complex web of race conditions, eventual consistency headaches, and a latency tail that refused to be tamed.
                        </p>
                        <p>
                            This article isn&apos;t a victory lap. It&apos;s a forensic analysis of where we failed, how we refactored our core Node.js event loop handling, and the specific architectural patterns that finally allowed us to handle 50k requests per second with sub-100ms latency.
                        </p>

                        <h2 className="font-display font-bold text-3xl text-white mt-12 mb-6 tracking-tight">The Event Loop Bottleneck</h2>
                        <p>
                            Node.js is famous for its non-blocking I/O, but CPU-intensive tasks can still block the main thread. We discovered that our JSON parsing logic for large payloads was silently killing throughput.
                        </p>

                        {/* Code Block */}
                        <div className="my-10 glass-card rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                <span className="font-mono text-xs text-gray-400">legacy-processor.js</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            <div className="p-6 overflow-x-auto bg-[#0f0f13]/80">
                                <pre className="font-mono text-sm leading-relaxed text-gray-300">
                                    <code>
                                        <span className="text-gray-500 italic">// ❌ The blocking pattern that caused 200ms spikes</span>
                                        <span className="text-purple-400">const</span> <span className="text-blue-300">processLargePayload</span> <span className="text-yellow-400">=</span> <span className="text-white">(data)</span> <span className="text-yellow-400">=&gt;</span> &#123;
                                        <span className="text-purple-400">try</span> &#123;
                                        <span className="text-gray-500 italic">// JSON.parse is synchronous and blocks the event loop</span>
                                        <span className="text-purple-400">const</span> <span className="text-white">parsed</span> <span className="text-yellow-400">=</span> <span className="text-white">JSON</span>.<span className="text-blue-300">parse</span>(<span className="text-white">data</span>);
                                        <span className="text-purple-400">return</span> <span className="text-blue-300">transformData</span>(<span className="text-white">parsed</span>);
                                        &#125; <span className="text-purple-400">catch</span> (<span className="text-white">e</span>) &#123;
                                        <span className="text-purple-400">throw</span> <span className="text-purple-400">new</span> <span className="text-white">Error</span>(<span className="text-yellow-200">&apos;Invalid payload&apos;</span>);
                                        &#125;
                                        &#125;;
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <p>
                            By offloading these parsing tasks to worker threads, we freed up the main event loop to handle incoming network requests. The difference was night and day.
                        </p>

                        <h3 className="font-display font-semibold text-2xl text-white mt-10 mb-4">Architectural Refactoring</h3>
                        <p>
                            We moved from a direct synchronous communication pattern to an event-driven architecture using Kafka. This decoupled our ingestion services from our processing workers.
                        </p>

                        <figure className="my-12">
                            <div className="w-full bg-[#111] border border-white/10 rounded-lg p-8 flex items-center justify-center relative overflow-hidden group min-h-[300px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
                                <div className="text-gray-500 text-sm font-mono">[Architecture Diagram Placeholder]</div>
                                <figcaption className="absolute bottom-4 left-4 text-xs font-display text-gray-500 uppercase tracking-wider">Fig 1.1: Asynchronous Event Flow</figcaption>
                            </div>
                        </figure>

                        <p>
                            The shift to <span className="text-white font-medium border-b border-primary/50">asynchronous processing</span> meant that we could absorb massive traffic spikes without dropping connections. The trade-off, of course, was managing the complexity of idempotent consumers.
                        </p>

                        <blockquote className="border-l-2 border-primary my-10 pl-8 py-2 relative">
                            <span className="material-symbols-outlined absolute -top-4 -left-3 text-primary bg-background-dark p-1 text-2xl">format_quote</span>
                            <p className="font-display text-2xl italic font-light text-white leading-relaxed">
                                "Distributed systems are a trade-off between consistency and availability. In high-throughput payments, availability is king, but consistency is the law."
                            </p>
                        </blockquote>

                        {/* Code Block 2 */}
                        <div className="my-10 glass-card rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                <span className="font-mono text-xs text-gray-400">worker-thread.js</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-600/50"></div>
                                </div>
                            </div>
                            <div className="p-6 overflow-x-auto bg-[#0f0f13]/80">
                                <pre className="font-mono text-sm leading-relaxed text-gray-300">
                                    <code>
                                        <span className="text-purple-400">import</span> &#123; <span className="text-white">Worker</span>, <span className="text-white">isMainThread</span> &#125; <span className="text-purple-400">from</span> <span className="text-yellow-200">&apos;worker_threads&apos;</span>;

                                        <span className="text-purple-400">if</span> (<span className="text-white">isMainThread</span>) &#123;
                                        <span className="text-purple-400">const</span> <span className="text-white">worker</span> <span className="text-yellow-400">=</span> <span className="text-purple-400">new</span> <span className="text-blue-300">Worker</span>(<span className="text-white">__filename</span>);
                                        <span className="text-white">worker</span>.<span className="text-blue-300">on</span>(<span className="text-yellow-200">&apos;message&apos;</span>, (<span className="text-white">msg</span>) <span className="text-yellow-400">=&gt;</span> <span className="text-blue-300">handleResult</span>(<span className="text-white">msg</span>));
                                        &#125; <span className="text-purple-400">else</span> &#123;
                                        <span className="text-gray-500 italic">// This runs in a separate thread, unblocking the event loop</span>
                                        <span className="text-purple-400">const</span> <span className="text-white">heavyComputation</span> <span className="text-yellow-400">=</span> <span className="text-blue-300">performCPUIntensiveTask</span>();
                                        <span className="text-white">parentPort</span>.<span className="text-blue-300">postMessage</span>(<span className="text-white">heavyComputation</span>);
                                        &#125;
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <h2 className="font-display font-bold text-3xl text-white mt-12 mb-6 tracking-tight">Conclusion</h2>
                        <p>
                            Refactoring a legacy monolith while keeping the plane flying is never easy. However, by identifying the specific bottlenecks in the Node.js event loop and adopting a worker-thread model for CPU-bound tasks, we achieved our scalability goals without rewriting the entire codebase in Go or Rust.
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-display text-gray-400 hover:text-white cursor-pointer transition-colors">#NodeJS</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-display text-gray-400 hover:text-white cursor-pointer transition-colors">#Microservices</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-display text-gray-500 uppercase tracking-widest">Share this</span>
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-gray-400 hover:text-white transition-colors text-lg">link</span>
                                <span className="material-symbols-outlined text-gray-400 hover:text-white transition-colors text-lg">mail</span>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="border-t border-white/10 bg-background-dark py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="size-5 bg-white rounded-full"></div>
                        <span className="font-display font-bold text-white">ALEX.DEV</span>
                    </div>
                    <p className="text-xs font-display text-gray-600">© 2023 Alex Developer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
