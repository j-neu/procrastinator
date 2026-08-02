#!/usr/bin/env python3
"""Prose lint for the cognitive dismantling books.

Three layers:
  1. Style conformance against writing_style.md (banned vocabulary/patterns).
  2. AI-tell heuristics (patterns typical of machine-written text).
  3. Statistical rhythm/readability via textstat + proselint.

Usage:
  python tools/prose_lint.py                     # lint the perfectionist book
  python tools/prose_lint.py --dir "<folder>"    # lint any book folder
  python tools/prose_lint.py --out report.md     # write a markdown report
"""

import argparse
import re
import sys
from collections import Counter
from pathlib import Path

from proselint.checks import __register__ as __PROSELINT_CHECKS__
from proselint.config import DEFAULT as PROSELINT_DEFAULT
from proselint.registry import CheckRegistry
from proselint.tools import LintFile

import textstat

DEFAULT_DIR = Path("cognitive_dismantling_books/perfectionist procrastinator")

BANNED = {
    "delve", "delve into", "tapestry", "testament", "realm", "pivotal",
    "underscore", "underscores", "underscored", "transformative",
    "moreover", "furthermore", "in addition", "it is worth noting",
    "in conclusion", "ultimately", "in summary", "additionally",
    "in today's fast-paced", "in today's fast paced",
}

AI_TELLS = [
    (r"\bnot only\b.{0,60}\bbut also\b", "not only ... but also"),
    (r"\bwhen it comes to\b", "when it comes to"),
    (r"\bat the end of the day\b", "at the end of the day"),
    (r"\bin today's\b", "in today's"),
    (r"\bnavigate the\b", "navigate the"),
    (r"\bit is important to note\b", "it is important to note"),
    (r"\bit should be noted\b", "it should be noted"),
    (r"\bin essence\b", "in essence"),
    (r"\ba testament to\b", "a testament to"),
    (r"\bthe power of\b", "the power of"),
    (r"\bunlock the\b", "unlock the"),
    (r"\bcrucial(ly)?\b", "crucial/crucially"),
    (r"\bimportantly\b", "importantly"),
]

TRANSITION_OPENERS = ("however,", "therefore,", "thus,", "in fact,", "indeed,",
                      "moreover,", "furthermore,", "consequently,")

RULE_OF_THREE = re.compile(r"\b\w+,\s+\w+,\s+and\s+\w+\b", re.IGNORECASE)

EM_DASH = "—"


def strip_markdown(text: str) -> str:
    """Roughly strip markdown so we only lint prose words."""
    text = re.sub(r"^#{1,6} .*$", "", text, flags=re.MULTILINE)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`[^`]*`", "", text)
    text = re.sub(r"^\s*[-*] ", "", text, flags=re.MULTILINE)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"^[0-9]+\.\s+", "", text, flags=re.MULTILINE)
    return text


def find_pattern(text: str, patterns, label: str):
    hits = []
    lower = text.lower()
    for line_no, line in enumerate(text.splitlines(), start=1):
        line_lower = line.lower()
        for pat, name in patterns:
            if re.search(pat, line_lower):
                hits.append((line_no, name, line.strip()[:90]))
    return hits


def banned_hits(text: str):
    hits = []
    lower = text.lower()
    for line_no, line in enumerate(text.splitlines(), start=1):
        line_lower = line.lower()
        for word in BANNED:
            if re.search(rf"\b{re.escape(word)}\b", line_lower):
                hits.append((line_no, word, line.strip()[:90]))
    return hits


def sentences(text: str):
    text = strip_markdown(text)
    parts = re.split(r"(?<=[.!?])\s+", text)
    parts = [p.strip() for p in parts if p.strip()]
    return parts


def rhythm_stats(text: str):
    sents = sentences(text)
    lengths = [len(s.split()) for s in sents]
    if not lengths:
        return 0, 0.0, 0.0
    n = len(lengths)
    avg = sum(lengths) / n
    var = sum((x - avg) ** 2 for x in lengths) / n
    std = var ** 0.5
    cv = (std / avg) if avg else 0.0
    return n, avg, cv


def lint_file(path: Path):
    raw = path.read_text(encoding="utf-8")
    prose = strip_markdown(raw)
    words = [w for w in re.split(r"\s+", prose) if w]

    banned = banned_hits(raw)
    tells = find_pattern(raw, AI_TELLS, "ai-tell")
    em_dashes = raw.count(EM_DASH)
    em_per_k = em_dashes * 1000.0 / max(len(words), 1)

    opening_counts = Counter()
    for s in sentences(raw):
        first = s.split()[0].lower().rstrip(",") + "," if s.split() else ""
        first_word = s.split()[0].lower().strip(".,!?") if s.split() else ""
        if first in TRANSITION_OPENERS:
            opening_counts[first] += 1
        elif first_word in ("however", "therefore", "thus", "in", "indeed"):
            opening_counts[first_word] += 1

    triples = RULE_OF_THREE.findall(prose)

    stats = {
        "words": len(words),
        "sents": len(sentences(raw)),
        "avg_sent": textstat.avg_sentence_length(prose),
        "flesch": textstat.flesch_reading_ease(prose),
        "fk_grade": textstat.flesch_kincaid_grade(prose),
        "syll_per_word": textstat.avg_syllables_per_word(prose),
        "reading_min": textstat.reading_time(prose, ms_per_char=14.69) / 60000.0,
    }
    _, _, cv = rhythm_stats(raw)

    proselint_checks = []
    try:
        src = LintFile(source="", content=prose)
        for res in src.lint(config=PROSELINT_DEFAULT):
            cr = res.check_result
            line, _ = res.pos
            proselint_checks.append((cr.check_path, cr.message, line))
    except Exception as exc:  # pragma: no cover
        proselint_checks = [("error", f"proselint failed: {exc}", 0)]

    return {
        "banned": banned,
        "tells": tells,
        "em_dashes": em_dashes,
        "em_per_k": em_per_k,
        "openings": opening_counts,
        "triples": len(triples),
        "stats": stats,
        "cv": cv,
        "proselint": proselint_checks,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dir", default=str(DEFAULT_DIR))
    parser.add_argument("--out", default="PROSE-LINT-REPORT.md")
    parser.add_argument("--include-structure", action="store_true",
                        help="also lint structure.md")
    args = parser.parse_args()

    folder = Path(args.dir)
    CheckRegistry().register_many(__PROSELINT_CHECKS__)
    files = sorted(folder.glob("chapter_*.md")) + sorted(folder.glob("finale*.md"))
    files += sorted(folder.glob("note-to-readers.md"))
    if args.include_structure:
        files += sorted(folder.glob("structure.md"))

    rows = []
    for f in files:
        r = lint_file(f)
        rows.append((f.name, r))

    # ---- console output ----
    print(f"{'file':<22} {'words':>6} {'banned':>6} {'tells':>5} {'em/1k':>6} "
          f"{'flesch':>7} {'CV':>5} {'triple':>6} {'prose':>5}")
    print("-" * 80)
    for name, r in rows:
        s = r["stats"]
        print(f"{name:<22} {s['words']:>6} {len(r['banned']):>6} "
              f"{len(r['tells']):>5} {r['em_per_k']:>6.1f} {s['flesch']:>7.1f} "
              f"{r['cv']:>5.2f} {r['triples']:>6} {len(r['proselint']):>5}")

    # ---- details ----
    for name, r in rows:
        if r["banned"]:
            print(f"\n== {name}: BANNED style conformance ==")
            for line_no, word, snippet in r["banned"][:20]:
                print(f"  L{line_no:<4} '{word}': {snippet}")
        if r["tells"]:
            print(f"\n== {name}: AI-tell patterns ==")
            for line_no, pat, snippet in r["tells"][:20]:
                print(f"  L{line_no:<4} [{pat}]: {snippet}")

    proselint_counter = Counter()
    for name, r in rows:
        for check in r["proselint"]:
            proselint_counter[check[0]] += 1
    if proselint_counter:
        print("\n== proselint categories (most common) ==")
        for check_id, count in proselint_counter.most_common(15):
            print(f"  {count:>4}  {check_id}")

    # ---- markdown report ----
    lines = ["# Prose Lint Report",
             "",
             f"Book: `{folder}`",
             f"Files: {len(rows)}",
             "",
             "## Rhythm & Readability",
             "",
             "| file | words | sentences | avg sent | flesch | F-K grade | syll/word | CV |",
             "|------|------:|----------:|---------:|-------:|----------:|----------:|-----:|"]
    for name, r in rows:
        s = r["stats"]
        lines.append(
            f"| {name} | {s['words']} | {s['sents']} | {s['avg_sent']:.1f} | "
            f"{s['flesch']:.1f} | {s['fk_grade']:.1f} | {s['syll_per_word']:.2f} | "
            f"{r['cv']:.2f} |")
    lines += ["",
              "## Style Conformance (banned vocabulary / patterns)",
              "",
              "| file | count | instances |",
              "|------|------:|-----------|"]
    for name, r in rows:
        if r["banned"]:
            inst = "; ".join(f"L{l}: {w}" for l, w, _ in r["banned"][:8])
            lines.append(f"| {name} | {len(r['banned'])} | {inst} |")
    if not any(r["banned"] for _, r in rows):
        lines.append("| (none) | 0 | - |")

    lines += ["",
              "## AI-Tell Patterns",
              "",
              "| file | count | instances |",
              "|------|------:|-----------|"]
    for name, r in rows:
        if r["tells"]:
            inst = "; ".join(f"L{l} [{p}]" for l, p, _ in r["tells"][:8])
            lines.append(f"| {name} | {len(r['tells'])} | {inst} |")
    if not any(r["tells"] for _, r in rows):
        lines.append("| (none) | 0 | - |")

    lines += ["",
              "## Sentence-Opener Transition Density",
              "",
              "| file | openers |",
              "|------|--------|"]
    for name, r in rows:
        if r["openings"]:
            desc = "; ".join(f"{k} x{c}" for k, c in r["openings"].most_common())
            lines.append(f"| {name} | {desc} |")

    lines += ["",
              "## Em-Dash Density (per 1000 words)",
              "",
              "| file | count | per-1k |",
              "|------|------:|-------:|"]
    for name, r in rows:
        lines.append(f"| {name} | {r['em_dashes']} | {r['em_per_k']:.1f} |")

    lines += ["",
              "## Rule-of-Three Instances",
              "",
              "| file | count |",
              "|------|------:|"]
    for name, r in rows:
        lines.append(f"| {name} | {r['triples']} |")

    Path(args.out).write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\nReport written to {args.out}")


if __name__ == "__main__":
    main()
