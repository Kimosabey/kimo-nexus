export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-32 relative z-10">

      {/* SECTION 1: HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center w-full max-w-6xl relative">
        <div className="grid-pattern absolute inset-0 -z-10" />

        {/* Placeholder for Photo/Glow */}
        <div className="w-64 h-64 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-12 relative group">
          <div className="absolute inset-0 rounded-full blur-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="text-neutral-600 uppercase tracking-widest text-sm">Portrait Placeholder</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            I design & build <br />
            Hybrid AI Systems.
          </span>
        </h1>

        <p className="text-xl text-[var(--color-slate)] max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Senior Full Stack Engineer. Specializing in high-performance, stealth-mode applications.
        </p>
      </section>

      {/* SECTION 2: SKILLS (Placeholder) */}
      <section className="w-full max-w-6xl py-20">
        <h2 className="text-3xl font-bold mb-12 text-[var(--color-chrome)]">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stitch AI will provide the Bento Box layout here */}
          <div className="glass-card h-64 rounded-2xl p-6 flex items-center justify-center border border-neutral-800">
            <span className="text-neutral-500">Skills Bento Grid Placeholder</span>
          </div>
          <div className="glass-card h-64 md:col-span-2 rounded-2xl p-6 flex items-center justify-center border border-neutral-800">
            <span className="text-neutral-500">Core Technologies</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROJECTS (Placeholder) */}
      <section className="w-full max-w-6xl py-20">
        <h2 className="text-3xl font-bold mb-12 text-[var(--color-chrome)]">Selected Works</h2>
        <div className="space-y-8">
          {/* Stitch AI will provide the Glass Cards here */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card w-full h-96 rounded-2xl p-8 transition-all duration-500 hover:scale-[1.01] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-2xl font-bold mb-2">Project {i}</h3>
              <p className="text-[var(--color-slate)]">Stealth Mode • AI Architecture</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center pb-20">
        <h2 className="text-5xl font-bold mb-8 text-center text-[var(--color-ghost)]">
          Ready to go dark?
        </h2>
        <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300">
          Initiate Protocol
        </button>
      </section>

    </main>
  );
}
