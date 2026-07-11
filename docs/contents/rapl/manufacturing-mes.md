# RAPL — Manufacturing Execution System (Shop-Floor Tracker)

> A Manufacturing Execution System that maps physical aerospace manufacturing into a strict digital
> workflow — accurate time tracking (with pauses/breaks), sequence-enforced task execution, real-time
> management visibility, and structured handling of production blockers. **Built by Harshan Aiyappa** (full-stack + FE/UI-UX).

*(Confidentiality: RAPL internal tool. No secrets included.)*

## The problem
Shop-floor work needs to be tracked accurately (who did what, when, for how long, including breaks),
executed **in the right sequence**, and unblocked fast when issues arise — without paper.

## What I built
A role-based MES with two operating surfaces:

**Technician (shop floor) loop**
1. **Start Shift** → backend records shift start.
2. **Select Part** → app loads that part's **workflow state** (the required task sequence).
3. **Task execution:** start the next available task → `ActivityLog` (`in-progress`); pause/resume via a
   breaks panel (`pauseAndStartBreak` / `resumeActivity`); report blockers as `IssueTickets`; finish → log closed with end time.
4. **End Shift** → if a task is active, `endShiftWithPause` intelligently pauses it to resume next shift.

**Administrator (oversight)**
- Real-time dashboard, technician-activity monitoring, part-lifecycle tracking, issue management, and
  process analytics (activity times, bottlenecks); plus master-data management (users, parts, task
  definitions, sections, issue types).

## Data-integrity & concurrency controls (the senior signal)
- **Lockouts** — a technician can't start a new task while one is in progress.
- **Sequence enforcement** — the backend computes the "true next task" dynamically so steps can't be skipped.
- **Orphan-task prevention** — can't end a shift while on an active break (must finish it first).

## Architecture
```
React + Vite + Tailwind (RAPL-fe)  ──/api──▶  Node + Express (RAPL)  ──Mongoose──▶  MongoDB
Modules: auth (JWT) · master-data · shifts · activity · workflow · issue-tickets · reports
```

## Status (honest)
**Built** — the analysis is derived from working front-end + back-end codebases; the core technician and
admin flows are implemented. *(Any throughput/uptime figure needs a benchmark before quoting.)*

## Résumé bullet
> Built a **Manufacturing Execution System** for aerospace shop-floor tracking (React + Node/Express +
> MongoDB): shift/activity time-tracking with pause-resume, **dynamic task-sequence enforcement**, issue
> ticketing, and admin analytics — with lockout/orphan-task concurrency controls for data integrity.

## Stack
React · Vite · Tailwind · React Router · Node.js · Express · Mongoose · MongoDB · JWT.
