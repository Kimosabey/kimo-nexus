# Résumé — what's here and which file to use

Two PDFs, one set of facts. They exist because a recruiter and an applicant-tracking
system want different documents, and trying to serve both with one file compromises
both.

## Which file do I send?

| Where | Send | Why |
|---|---|---|
| **LinkedIn, Naukri, any "upload résumé" box** | `dist/Harshan-A-M-Resume-ATS-<YYYY-MM>.pdf` | Plain single column, system fonts, no icons or cards. Maximum parse reliability. |
| **Email to a human, referral, interview follow-up** | `dist/Harshan-A-M-Resume-<YYYY-MM>.pdf` | The designed version. Same facts, reads better to a person. |
| **The website's Download button** | `../../public/resume.pdf` | Auto-generated; identical to the designed copy above. Don't edit it directly. |

Both pass the same ATS audit, so the ATS variant is the safer default when unsure —
the only thing you lose is the design.

## Sources — edit these, never the PDFs

| File | Role |
|---|---|
| `Harshan_AM_Resume_v4.md` | **Content source of truth.** Change facts here first. |
| `resume-v4.html` | Designed layout → `public/resume.pdf` + the dated designed copy. |
| `resume-v4-ats.html` | Plain ATS layout → the dated ATS copy. |
| `dist/` | Generated output. Safe to delete; rebuilt by the script. |
| `archive/` | Superseded drafts, kept for reference. Do not send. |

The two HTML files hold the same content in different layouts, so a fact change means
editing three files: the markdown and both HTML files. The build script's audit catches
most drift, because it asserts a fixed list of facts survives into each PDF.

## Rebuilding

```bash
python kimo-nexus/scripts/build-resume-pdfs.py
```

It renders both PDFs and then audits each one the way a parser would read it — name as
the first line, email and phone parseable, the five standard section headings present,
at least three employment date ranges, reading order intact, no glyph corruption, every
required fact present, and no superseded strings leaked. **It exits non-zero if any
check fails**, so a broken PDF can't be published quietly.

That audit exists because this résumé has already shipped three defects that looked
perfect on screen:

- the published PDF used a subsetted font with no usable text layer — a keyword screen
  saw a blank page;
- the decorative `HA` monogram was first in the DOM, so a parser read the candidate's
  name as **"HA"**;
- `float:right` dates painted out of document order, making the first extracted line
  **"Jan 2023 – Present"**.

## Name

The résumé carries **`Harshan A M` only** — the official name, which is what background
checks and offer letters match.

`Harshan Aiyappa` is the family-name form used on LinkedIn, GitHub, the website, and in
current employer records at Lingotran. It is deliberately **not** printed as an alias, by
preference; it still reaches a recruiter through the contact line, since both the LinkedIn
URL (`linkedin.com/in/harshan-aiyappa`) and the email carry it.

Worth knowing rather than acting on: a reference check placed under "Harshan A M" may not
resolve immediately at Lingotran, where the record is under the other form. If that ever
causes friction, adding a one-line alias under the name fixes it.

## Facts must match the live site

`src/lib/content.ts` feeds the site **and** the ⌘K → Ask assistant, which a recruiter
can query while holding this PDF. Any disagreement is the site contradicting the résumé
on demand. Tenure, location, dates, volumes, and both education entries are currently
reconciled across the markdown, both HTML files, and `content.ts`.

Tenure is **computed, not copied**: 5.5 years from Feb 2021. It was previously asserted
as `~4.5` here and `4.8` on the site, both stale and both understating the career.
