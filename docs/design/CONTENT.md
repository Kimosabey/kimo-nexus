# Kimo Nexus — Content & Copy (single source of truth)

> All display copy + the canonical link set. `src/lib/content.ts` is generated from this. Copy is **de-jargonized** — senior and clear, not "siphoning neural fabrics." Items marked ⚠️ need the user to confirm.

---

## Identity
- **Name:** Harshan Aiyappa
- **Display / short:** Harshan A.M.
- **Role (primary):** Fullstack Software Engineer — AI & R&D
- **Role (alt / meta title):** Hybrid AI Engineer
- **Location / langs:** English · Kannada (native) · Hindi
- **Experience:** ~4.8 years

### Taglines (pick 1 primary; others as rotating/meta)
1. **"I build production AI, end to end."** *(recommended primary — plain, senior)*
2. "Full-stack engineering across AI, distributed systems, and infrastructure."
3. "From model to interface — shipped."

---

## Hero copy
- **Eyebrow:** `● Available for select work`
- **Name (H1):** Harshan Aiyappa
- **Role line:** Fullstack Software Engineer · AI · R&D
- **Lead (1–2 lines):** "I design and ship production systems across the stack — from LLM/voice pipelines and RAG to the APIs, infra, and interfaces around them. ~5 years turning hard problems into simple, reliable products."
- **Primary CTA:** `View Work →` (→ #work)
- **Secondary CTA:** `Résumé ↓` (→ /resume.pdf)
- **Stat row:** `~4.8 yrs experience` · `40+ platforms delivered` · `250+ engineers mentored`

---

## About copy
- **Eyebrow:** `02 / About`
- **Headline:** "Engineering that stays simple as it scales."
- **Body:**
  > I'm a full-stack engineer working at the intersection of product and applied AI. Day to day that means React/Next.js on the front, Node.js and Python services behind it, and R&D in speech and language tech — TTS, ASR, and NLP — turned into low-latency, production features.
  >
  > I care about architectural rigour: systems that are understandable, observable, and hold up under load. Over ~5 years I've delivered 40+ platforms end to end and mentored 250+ engineers and students.
  >
  > Currently building AI/voice platforms at Lingotran. Master's in Computer Applications (MCA).

---

## Services / What I Do (3–4 cards)
1. **AI & Agents** — LangGraph/agentic pipelines, RAG, OpenAI/LLM integration, voice (TTS/ASR), NLP. *icon: cpu/sparkles*
2. **Distributed Systems** — event-driven services, Kafka, gRPC, sagas, high-throughput data flows. *icon: network*
3. **Full-Stack Product** — React, Next.js, TypeScript, Node/FastAPI; from design system to deployment. *icon: layers*
4. **Infra & Cloud** — Docker, AWS, Kubernetes, CI/CD, observability. *icon: server*

---

## Skills & Tech (grouped)
- **Frontend:** React · Next.js · TypeScript · Tailwind · Framer Motion · Radix/shadcn
- **Backend:** Node.js · Express · Python · FastAPI · Flask · NestJS · Java (JSP/Servlets)
- **AI / ML:** LangChain · OpenAI API · Whisper (TTS/ASR) · SpaCy (NLP) · TensorFlow · PyTorch
- **Data:** PostgreSQL · MongoDB · MySQL · SQL Server · Redis · Kafka
- **DevOps / Cloud:** Docker · AWS · Kubernetes · Git · Serverless
- **Also:** Go · GraphQL · Scrum leadership

---

## Experience
- **Lingotran Pvt Ltd** — Fullstack Engineer (AI & R&D) · Jan 2023 – Present
  - AI/voice platforms: real-time TTS/ASR/NLP pipelines productionized across the stack.
- **Veriteam Software Solutions** — Software Engineer · Feb 2021 – Aug 2022
  - Delivered 40+ full-stack projects; client-facing product engineering.
- **Education:** MCA — NIE Institute of Technology, Mysore (2017–2020, 8.2 CGPA) · BCA — University of Mysore (2014–2017, 71%).

---

## Testimonials
Keep the existing real peer recommendations from `Testimonials.tsx` (names/roles/quotes unchanged) — restyle only.

---

## Contact / CTA
- **Headline:** "Let's build something."
- **Sub:** "Open to senior full-stack / AI engineering roles and select collaborations."
- **Email CTA:** harshan.aiyappa@gmail.com
- **Socials:** GitHub · LinkedIn · X (see links table)

---

## 🔗 Canonical links (single source of truth)
Current code has **conflicting** values — these are the reconciled canonical set. ⚠️ = confirm.

| Link | Canonical value | Conflicts found in code |
|---|---|---|
| GitHub | `https://github.com/Kimosabey` | `page.tsx` used `github.com/HarshanAiyappaPrabhu` (**wrong** — git remote & all repos are `Kimosabey`) |
| LinkedIn ⚠️ | `https://linkedin.com/in/harshan-aiyappa` | `page.tsx` used `/in/harshan-aiyappa-prabhu` — confirm correct slug |
| X / Twitter | `https://x.com/HarshanAiyappa` | variants: `twitter.com/harshan_aiyappa`, meta `@HarshanAiyappa` |
| Email | `harshan.aiyappa@gmail.com` | — |
| Résumé | `/resume.pdf` | present in `public/` |
| Live site | `https://kimo-nexus.vercel.app/` | — |

---

## Copy to RETIRE (off-brand HUD jargon)
"Architecting Digital Minds", "siphoning intelligence", "neural fabrics", "SYSTEM_CORE / DESCRIPTOR//:", "Nodes_Active: 1,204,591", "System_Runtime_V5.0 / Sentinel_Secure", "PROPRIETARY_LICENSE / ACCESS_PROJECT_CORE", FlipWords ("PoC_Master" etc.). Replace with the plain, senior copy above.

## SEO / metadata
- Title: `Harshan Aiyappa — Fullstack Software Engineer (AI & R&D)`
- Description: from the hero lead.
- OG image: generate `/og-image.png` (1200×630) from the graded portrait + name/role. Fix missing `/favicon.ico`, `/apple-touch-icon.png`.
