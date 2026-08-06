#!/usr/bin/env python
"""
Build both résumé PDFs from their HTML sources, then audit each the way an ATS
would read it.

  python kimo-nexus/scripts/build-resume-pdfs.py

Outputs
  public/resume.pdf                                  designed — linked from the site
  docs/resume-v/dist/Harshan-A-M-Resume-<YYYY-MM>.pdf      named copy for sharing
  docs/resume-v/dist/Harshan-A-M-Resume-ATS-<YYYY-MM>.pdf  for LinkedIn / Naukri / ATS

Why a script and not a browser "Download PDF": the audit. Chromium prints happily
even when the result is unparseable, and this résumé has already hit three such
defects — a subsetted font with no text layer, a decorative monogram becoming the
first line (so a parser read the name as "HA"), and float:right dates painting out
of order (so the first line became "Jan 2023 – Present"). The checks below fail the
build on all three rather than shipping a PDF that looks fine and screens out.

Requires: pip install playwright pypdf && python -m playwright install chromium
"""
from __future__ import annotations

import re
import shutil
import sys
from datetime import date
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
    from pypdf import PdfReader
except ImportError:
    sys.exit("missing deps: pip install playwright pypdf && python -m playwright install chromium")

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "docs" / "resume-v" / "dist"
STAMP = date.today().strftime("%Y-%m")

# (label, html source, primary output, extra named copies)
JOBS = [
    ("designed", ROOT / "docs/resume-v/resume-v4.html", ROOT / "public/resume.pdf",
     [DIST / f"Harshan-A-M-Resume-{STAMP}.pdf"]),
    ("ats", ROOT / "docs/resume-v/resume-v4-ats.html", DIST / f"Harshan-A-M-Resume-ATS-{STAMP}.pdf",
     []),
]

# Facts that must survive into the text layer. Kept in step with
# Harshan_AM_Resume_v4.md, which is the content source for both HTML files.
FACTS = [
    # Official name only, by preference — the family-name form is not asserted here
    # because it appears in the PDF solely inside the LinkedIn and email addresses.
    "Harshan A M", "5.5 years", "Bangalore", "Mysore",
    "Lingotran", "Veriteam", "Freelance",
    "Graylinx", "OMNYX", "THERMYNX",
    "Vidya Vikas College, University of Mysore", "NIE Institute of Technology",
    "40+ production app", "LangGraph", "TimescaleDB",
]

# Strings that must NEVER reach a recruiter: superseded facts, working notes, and
# UI chrome that belongs to the HTML page rather than the document.
LEAKS = ["benchmarked before quoting", "~4.5", "45+", "Download PDF", "Theme"]

SECTIONS = ["SUMMARY", "EXPERIENCE", "SKILLS", "EDUCATION", "PROJECTS"]


def audit(path: Path) -> list[str]:
    """Return a list of failure descriptions; empty means ATS-ready."""
    reader = PdfReader(str(path))
    raw = "\n".join((p.extract_text() or "") for p in reader.pages)
    # Collapse newlines too, not just spaces: a phrase that wraps across a line
    # ("Vidya Vikas College, University of / Mysore") is normal typesetting, and
    # real parsers normalise all whitespace before matching. Line-based checks
    # below deliberately use `raw` instead.
    flat = re.sub(r"\s+", " ", raw)
    low = flat.lower()
    fails: list[str] = []

    # A text layer this thin means the fonts were subsetted without a usable
    # ToUnicode map — a keyword screen would see a blank page.
    if len(raw) < 2500:
        fails.append(f"text layer too thin ({len(raw)} chars) — likely unparseable")

    # Parsers take the first line as the candidate name.
    first = next((ln.strip() for ln in raw.splitlines() if ln.strip()), "")
    if "harshan a m" not in first.lower():
        fails.append(f"first line is {first!r}, expected the name")

    if not re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", flat):
        fails.append("no parseable email")
    if not re.search(r"\+?91[\s-]?\d{5}[\s-]?\d{5}", flat):
        fails.append("no parseable phone")

    for s in SECTIONS:
        if s.lower() not in low:
            fails.append(f"missing section heading {s}")

    ranges = re.findall(
        r"(?i)(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*\d{4}\s*[–\-—]\s*"
        r"(?:present|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*\d{4})",
        flat,
    )
    if len(ranges) < 3:
        fails.append(f"only {len(ranges)} employment date ranges found, expected >= 3")

    # Multi-column or floated layouts interleave and scramble this order.
    order = [low.find("summary"), low.find("experience"), low.find("education")]
    if not (all(i > 0 for i in order) and order == sorted(order)):
        fails.append(f"reading order scrambled: {order}")

    if re.search(r"[�\x00-\x08]", raw):
        fails.append("glyph corruption in text layer")

    missing = [f for f in FACTS if f.lower() not in low]
    if missing:
        fails.append(f"facts missing: {missing}")

    leaked = [l for l in LEAKS if l.lower() in low]
    if leaked:
        fails.append(f"leaked strings: {leaked}")

    return fails


def main() -> int:
    DIST.mkdir(parents=True, exist_ok=True)
    failed = False

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for label, src, dest, copies in JOBS:
            if not src.exists():
                sys.exit(f"missing source: {src}")
            page = browser.new_page()
            page.goto(src.as_uri())
            page.wait_for_load_state("networkidle")
            # The designed variant pulls webfonts; printing before they settle
            # silently falls back to system fonts and changes the whole layout.
            page.evaluate("() => document.fonts.ready")
            page.pdf(path=str(dest), prefer_css_page_size=True, print_background=True)
            page.close()

            reader = PdfReader(str(dest))
            fails = audit(dest)
            status = "ATS-READY" if not fails else "FAILED"
            print(f"\n{label:<9} {dest.relative_to(ROOT)}")
            print(f"          {len(reader.pages)} pages · {dest.stat().st_size:,} bytes · {status}")
            for f in fails:
                print(f"          - {f}")
            failed |= bool(fails)

            for c in copies:
                shutil.copy2(dest, c)
                print(f"          copy -> {c.relative_to(ROOT)}")

        browser.close()

    print("\n" + ("one or more PDFs failed the audit" if failed else "all PDFs built and audited clean"))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
