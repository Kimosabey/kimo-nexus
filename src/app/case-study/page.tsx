import Link from "next/link";

export default function CaseStudyPage() {
    return (
        <div className="relative z-10 flex flex-col min-h-screen bg-background-dark text-off-white font-display selection:bg-primary selection:text-white">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-2xl">grid_view</span>
                        </div>
                        <Link href="/" className="text-white text-lg font-bold tracking-widest uppercase">Kimo Nexus | Engineer</Link>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                        <div className="flex items-center gap-9">
                            <Link className="text-silver hover:text-white text-sm font-medium transition-colors" href="/#projects">Work</Link>
                            <Link className="text-silver hover:text-white text-sm font-medium transition-colors" href="/#about">About</Link>
                            <Link className="text-silver hover:text-white text-sm font-medium transition-colors" href="/#contact">Contact</Link>
                        </div>
                        <button className="flex items-center justify-center overflow-hidden rounded-lg h-9 px-5 bg-primary hover:bg-primary/80 transition-all text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(22,22,156,0.5)]">
                            <span className="truncate">Resume</span>
                        </button>
                    </div>
                    <div className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </div>
            </nav>

            <main className="flex flex-col items-center">
                {/* Hero Section */}
                <section className="w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <div className="mb-6 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 uppercase tracking-widest">Case Study</span>
                                <span className="h-px w-8 bg-white/20"></span>
                                <span className="text-xs text-silver tracking-widest uppercase">2023 Infrastructure</span>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl mb-8 leading-[0.9]">
                                HYBRID AI <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">INFRASTRUCTURE</span>
                            </h1>
                            <div className="mt-8 border-l-2 border-primary pl-6">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-silver mb-2">The Problem</h3>
                                        <p className="text-sm text-white/60 leading-relaxed font-body">Legacy monolithic systems suffered from extreme latency peaks during high-inference loads, causing 25% request timeouts.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">The Solution</h3>
                                        <p className="text-sm text-white/60 leading-relaxed font-body">A distributed edge node architecture utilizing Rust-based microservices to localize inference and reduce round-trip times.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Hero Visual */}
                        <div className="lg:col-span-5 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20"></div>
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass-card flex items-center justify-center p-8 border border-white/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8bgV9jXgTHt6d9AciCxUMS7Wf6uByzHxtLeyA4qwKVoAj2UwyAkdJA_IGWtM-c2wFULrzx0qj71RF1X9JDtH8eySutCIdHw7zo9uQrtwI6kx102CRSPNEIxcJ54DKnQjSKFm-iKxqCQvWFfjFiaaSmbAdH3GNp93fEN2LPSn0mnZZRU-Q5dVmjS7T8pyQrslR9B2NoUixXVHhFqmzEY8IXEBvy-_qqhJLVf6Zk4YDELb5WxMdDNxR1dQ91F3-UwgYtcqTgEVPMw')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                <div className="absolute bottom-6 right-6">
                                    <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm animate-pulse">circle</span>
                                        Live System
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* System Architecture 3D Card */}
                <section className="w-full max-w-7xl px-6 py-12 lg:px-8">
                    <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-white">System Architecture</h2>
                        <span className="text-xs text-silver font-mono">FIG 1.0 - HIGH FIDELITY DIAGRAM</span>
                    </div>
                    <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-xl overflow-hidden group perspective-[1000px]">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                        <div className="relative w-full h-full glass-card rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 lg:p-12 transition-transform duration-700 hover:scale-[1.01]">
                            <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBibzbbnoTUT9wJ6hDu_Fu8hNFXMYmktQTSMMk1o3ToK_0fYpl-sfxzr3t6vtxaeznc60ilEIkIji7mYAWHBwAAnRyNWpR0SR-pxOlIUdqXZC3jcZpZ72LafGQSk84oKJuM9yS4wY5vemho9M4-sU_oPU1cUy-SP-QC2D6Dp1dAIn6_Mbcyk5gVxTPowtnFXCE4MNxThsiSreVswElfuAJXz8jrneg0e9dnoJbsKtdOQcoBFuNRhXKty7B9_a08E-b4hnL83C8eQ')" }}></div>
                            <div className="absolute top-6 left-6 px-3 py-1 rounded bg-black/50 border border-white/10 text-[10px] text-silver font-mono backdrop-blur-sm">Edge Cluster A</div>
                            <div className="absolute bottom-6 right-6 px-3 py-1 rounded bg-black/50 border border-white/10 text-[10px] text-silver font-mono backdrop-blur-sm">Central Processing Unit</div>
                        </div>
                    </div>
                </section>

                {/* Technical Stack (Bento Box) */}
                <section className="w-full max-w-7xl px-6 py-24 lg:px-8">
                    <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-wide text-white mb-2">Technical Stack</h2>
                            <p className="text-silver/60 max-w-md">Core technologies leveraged to achieve sub-millisecond latency.</p>
                        </div>
                        <div className="h-px flex-1 bg-white/10 mx-8 hidden sm:block mb-2"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Stack Items */}
                        {['Rust', 'Docker', 'AWS Lambda', 'TensorFlow', 'Redis', 'Grafana'].map((tech, i) => (
                            <div key={i} className="group relative flex flex-col items-center justify-center gap-3 rounded-lg border border-white/5 bg-charcoal p-6 hover:border-primary/50 transition-colors duration-300">
                                <div className="text-4xl text-white/80 group-hover:text-primary transition-colors material-symbols-outlined">
                                    {['terminal', 'deployed_code', 'cloud_circle', 'memory', 'dataset', 'monitoring'][i]}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-silver">{tech}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Narrative Blocks */}
                <section className="w-full max-w-7xl px-6 py-12 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-8xl font-bold text-white/5 select-none -z-10">01</div>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> The Challenge
                            </h3>
                            <p className="text-lg text-off-white/80 leading-relaxed font-body mb-6">
                                The existing Python-based monolith was struggling to handle concurrent inference requests during peak traffic windows. CPU utilization averaged 95%, leading to a cascading failure effect where timeouts would trigger automatic retries, further saturating the network.
                            </p>
                            <p className="text-lg text-off-white/80 leading-relaxed font-body">
                                Additionally, data sovereignty laws required certain user data to be processed within specific geographic regions, which the centralized architecture could not natively support without significant latency penalties.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-8xl font-bold text-white/5 select-none -z-10">02</div>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> The Execution
                            </h3>
                            <p className="text-lg text-off-white/80 leading-relaxed font-body mb-6">
                                We re-engineered the core inference engine using Rust for memory safety and zero-cost abstractions. This service was containerized and orchestrated via Kubernetes across three distinct edge regions.
                            </p>
                            <ul className="space-y-4 mt-6">
                                <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1">check_circle</span> <span className="text-off-white/80 font-body">Implemented gRPC for efficient inter-service communication.</span></li>
                                <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1">check_circle</span> <span className="text-off-white/80 font-body">Deployed custom load balancers to route traffic based on geolocation.</span></li>
                                <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-1">check_circle</span> <span className="text-off-white/80 font-body">Integrated active caching layers to serve frequent predictions instantly.</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Tilted Glass Gallery */}
                <section className="w-full overflow-hidden py-24 bg-gradient-to-b from-transparent to-black/20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-white">Interface &amp; Performance</h2>
                    </div>
                    <div className="flex justify-center gap-8 perspective-[1000px] px-6 overflow-x-auto pb-12 snap-x">
                        {[
                            { title: 'Dashboard_V1.0', bg: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh8I8L4I9eT5OJBCahFlkioWhbF_MfH3JQ_aPkkHNr9Geolx7StuMvPxeqPysqEUjeCUXHBkoVRn98D7ceg8YaqFxVNVtJ8MChyRDRhdzlwkHXsKXgQF9Qps5pVYH5EfP6Z7PW7kKlvDELSxOmGJSNGlB-1qIRM6V_zmjhPPRe2c6SdJymyI7AIznsdwr6a3Pq41o_4YqAVVSIaPa_-pGISCTlcMv_PjZsLv_sI2M911MZFTzZDZ_-QlBErLQcK94ilEsF2fpUNg')" },
                            { title: 'Node_Map_Visualization', bg: "url('https://placeholder.pics/svg/300')" },
                            { title: 'Terminal_Logs', bg: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwlTeIy-ijDgkahKkn9vi5sK1lfNxRzsAxOSRUwPOhFWLz1IjAyqnHjk3rw28P4P9tgTFHOvjRfdy8QETvl4AOG-SYfHNVZQzeLA8tBrf2bZeCGFojea6il6fyk8d_iiCxg-IcLH6AZ8VueNoVzkx_g1tw9__uomzmhkKhdNLUBtekYtu-NXP2btTxPQP62HFYJTFLgyTQ1CxAjqP0s9caopIgNH6d3QMsaghNXsEiouO855Z-vVVsiRO4q5gzmT-BLwdndBzq7A')" }
                        ].map((item, i) => (
                            <div key={i} className="glass-card w-[300px] md:w-[400px] h-[250px] md:h-[300px] shrink-0 rounded-lg p-1 border border-white/20 shadow-2xl snap-center relative overflow-hidden transform rotate-y-12 rotate-x-4 hover:rotate-0 hover:scale-[1.02] transition-transform duration-500 z-0 hover:z-10">
                                <div className="absolute top-3 left-4 text-[10px] text-silver font-mono uppercase z-20">{item.title}</div>
                                <div className="w-full h-full rounded bg-charcoal bg-cover bg-center" style={{ backgroundImage: item.bg }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Results / KPIs */}
                <section className="w-full max-w-7xl px-6 py-20 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group flex flex-col items-start p-8 rounded-xl border border-white/5 bg-gradient-to-br from-charcoal to-background-dark hover:border-primary/30 transition-all duration-500">
                            <div className="text-6xl lg:text-7xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">40<span className="text-3xl lg:text-4xl text-silver/50">%</span></div>
                            <div className="h-1 w-12 bg-primary mb-4"></div>
                            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Latency Reduction</h4>
                            <p className="text-sm text-silver/60 mt-2">Achieved by moving inference closer to the edge.</p>
                        </div>
                        <div className="group flex flex-col items-start p-8 rounded-xl border border-white/5 bg-gradient-to-br from-charcoal to-background-dark hover:border-primary/30 transition-all duration-500">
                            <div className="text-6xl lg:text-7xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">99.9<span className="text-3xl lg:text-4xl text-silver/50">%</span></div>
                            <div className="h-1 w-12 bg-primary mb-4"></div>
                            <h4 className="text-lg font-bold uppercase tracking-wider text-white">System Uptime</h4>
                            <p className="text-sm text-silver/60 mt-2">Maintained throughout the migration process.</p>
                        </div>
                        <div className="group flex flex-col items-start p-8 rounded-xl border border-white/5 bg-gradient-to-br from-charcoal to-background-dark hover:border-primary/30 transition-all duration-500">
                            <div className="text-6xl lg:text-7xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">2<span className="text-3xl lg:text-4xl text-silver/50">x</span></div>
                            <div className="h-1 w-12 bg-primary mb-4"></div>
                            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Throughput</h4>
                            <p className="text-sm text-silver/60 mt-2">Increase in requests per second handled.</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full border-t border-white/5 bg-background-dark py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-white">Kimo Nexus</span>
                        </div>
                        <div className="flex gap-8">
                            <Link className="text-xs text-silver/50 hover:text-white uppercase tracking-wider transition-colors" href="#">LinkedIn</Link>
                            <Link className="text-xs text-silver/50 hover:text-white uppercase tracking-wider transition-colors" href="#">GitHub</Link>
                            <Link className="text-xs text-silver/50 hover:text-white uppercase tracking-wider transition-colors" href="#">Twitter</Link>
                        </div>
                        <div className="text-xs text-silver/30 font-mono">
                            © 2023 ENGINEERING PORTFOLIO
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
