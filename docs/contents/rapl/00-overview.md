# Rangsons Aerospace (RAPL) — Internal Enterprise Tools (Portfolio Reference)

> **Role:** Full-Stack Engineer with **front-end / UI-UX design ownership** · **Org:** Rangsons Aerospace (RAPL), Rangsons Group.
> I digitized paper/Excel workflows on the aerospace shop floor and back office into role-based web apps,
> owning both the engineering and the design system.

*(Confidentiality: RAPL internal tooling. No secrets included; internal form codes generalized. Company named as it's within the Rangsons Group engagement — confirm before public release if unsure.)*

## What I did (one paragraph)
Built and designed a suite of internal web applications for Rangsons Aerospace — a **Customer RFQ →
Quotation** platform, a **Manufacturing Execution System (shop-floor tracker)**, and an **IT Helpdesk &
ticketing** system — plus an **AI-hardware suitability evaluation**. Across all of them I owned the
**front-end and UI/UX**: a shared "Calm Enterprise" design language (indigo/red brand, Geist type,
full light + dark), documented design systems, hi-fi prototypes, and role-gated React front-ends, wired
to Node/Express + MongoDB back-ends.

## Projects
| Project | What | Status | Doc |
|---|---|---|---|
| **Customer RFQ Platform** | Digitizes RFQ→Quotation across 6 departments + Admin (7 roles); traceability, revision history, gated approvals, notifications | Design complete · app in progress | [customer-rfq.md](./customer-rfq.md) |
| **Manufacturing MES** | Shop-floor execution tracker: shifts, task workflow with sequence enforcement, breaks/pauses, issue tickets, analytics | Built (working flows) | [manufacturing-mes.md](./manufacturing-mes.md) |
| **IT Helpdesk** | Role-based ticketing (call-log/recert form digitized): kanban board, SLA traffic-light, command bar | Docs + prototype complete · FE/BE scaffold | [it-helpdesk.md](./it-helpdesk.md) |
| **AI-hardware evaluation** | Verdict + plain-English assessment of on-site AI hardware suitability | Evaluation delivered | *(summarized below)* |

## Cross-cutting senior signals
- **Design-system ownership** — one coherent "Calm Enterprise" brand (tokens, components, light+dark, accessibility) reused across three apps; design-guidelines + prototypes as the source of truth before code.
- **Role-based enterprise apps** — RBAC with role-gated navigation/actions/screens (7 roles on RFQ, technician/admin/department on MES, user/IT-staff/IT-admin on Helpdesk).
- **Digitizing real workflows** — replaced Excel/paper SOPs with auditable, status-glanceable systems (revision history, approval gates, audit trails).
- **Consistent stack** — React 18 + Vite + TS + Tailwind + shadcn/ui + TanStack + ECharts front-ends; Node/Express + Mongoose + MongoDB back-ends.

## AI-hardware evaluation (brief)
Produced a **verdict + plain-English** assessment of whether specific on-site AI hardware could meet the
workload (similar in spirit to the Graylinx Kafka/edge evaluation) — matching model/inference needs to
available hardware and giving a clear go/no-go with requirements.

## Stack (across the suite)
React 18 · Vite · TypeScript · Tailwind (v4) · shadcn/ui · Radix · Framer Motion · TanStack Query/Table ·
React Hook Form · Zod · Apache ECharts · Node.js · Express · Mongoose · MongoDB.
