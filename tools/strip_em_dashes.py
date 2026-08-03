#!/usr/bin/env python3
"""Strip em dashes from the cognitive dismantling books.

Em dashes are a strong AI-writing tell (see writing_style.md). All em dashes
in these books are unspaced word-internal punctuation (parentheticals,
appositives, afterthoughts). This converts:

  - paired insertions   word—X—word  ->  word, X, word
                          (parentheses when X contains its own commas)
  - single afterthoughts word—word   ->  word, word
  - single dashes joining two independent clauses -> period
  - dashes after a closing quote  "...word"—  ->  "...word,"

Usage:
  python tools/strip_em_dashes.py                # all books
  python tools/strip_em_dashes.py --dry-run      # report only, no writes
"""

import argparse
import re
import sys
from pathlib import Path

EM = "\u2014"
ROOT = Path(__file__).resolve().parent.parent
BOOKS_DIR = ROOT / "cognitive_dismantling_books"

_VERBS = (
    "is", "are", "was", "were", "has", "have", "had", "will", "would", "can",
    "could", "should", "does", "did", "do", "felt", "feels", "feeling",
    "becomes", "became", "becoming", "comes", "came", "coming", "means",
    "meant", "works", "worked", "makes", "made", "produce", "produces",
    "produced", "exists", "existed", "knows", "knew", "knowing", "lives",
    "lived", "living", "gets", "got", "getting", "sees", "saw", "seeing",
    "wants", "wanted", "needs", "needed", "needing", "says", "said",
    "saying", "tells", "told", "telling", "takes", "took", "taking", "gives",
    "gave", "giving", "finds", "found", "finding", "starts", "started",
    "starting", "keeps", "kept", "keeping", "stops", "stopped", "stopping",
    "turns", "turned", "turning", "calls", "called", "calling", "asks",
    "asked", "asking", "shows", "showed", "showing", "looks", "looked",
    "looking", "realizes", "realized", "realising", "realizing",
)

_CONTRACTIONS = (
    "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't", "weren't",
    "won't", "wouldn't", "can't", "couldn't", "shouldn't", "haven't", "hasn't",
    "hadn't", "ain't",
)

CLAUSE_STARTER = re.compile(
    r"^([\"\'\*]*)(it|you|we|they|i|he|she|this|these|those|there|that)"
    r"(\s+\w+){0,9}\s+\b(" + "|".join(_VERBS + _CONTRACTIONS) + r")\b",
    re.IGNORECASE,
)


def fix_line(line: str) -> str:
    """Convert em dashes in one line to commas/parentheses/periods."""
    if EM not in line:
        return line

    out = []
    pos = 0
    i = 0
    dashes = [idx for idx, ch in enumerate(line) if ch == EM]
    while i < len(dashes):
        d = dashes[i]

        # Paired insertion?
        if i + 1 < len(dashes):
            d2 = dashes[i + 1]
            middle = line[d + 1:d2]
            is_pair = (
                len(middle) <= 160
                and "\n" not in middle
                and not re.search(r"[.!?;:][\s\"]", middle)
            )
            if is_pair:
                out.append(line[pos:d])
                if "," in middle or len(middle.split()) > 6:
                    out.append(" (")
                    out.append(middle.strip())
                    out.append(")")
                    # A comma after the closing paren when a new clause follows.
                    nxt = line[d2 + 1] if d2 + 1 < len(line) else " "
                    if nxt.isupper():
                        out.append(", ")
                    else:
                        nxt_word = re.match(r"\s*([a-z]+)", line[d2 + 1:])
                        if nxt_word and nxt_word.group(1) in (
                            "not", "and", "but", "you", "we", "they", "it",
                            "then", "so", "anybody", "everybody", "anyone",
                            "everyone",
                        ):
                            out.append(", ")
                        elif nxt.isalnum():
                            out.append(" ")
                else:
                    out.append(", ")
                    out.append(middle)
                    out.append(", ")
                pos = d2 + 1
                i += 2
                continue

        # Single dash.
        out.append(line[pos:d])

        if d > 0 and line[d - 1] == '"':
            # "word"—rest  ->  "word," rest   (US style: comma inside quotes)
            if out and out[-1].endswith('"'):
                out[-1] = out[-1][:-1] + '," '
            else:
                out.append(", ")
            pos = d + 1
            i += 1
            continue

        after = line[d + 1:]
        if CLAUSE_STARTER.match(after):
            out.append(". ")
            m = re.match(r"([\"\'\*]*)([a-z])", after)
            if m and m.group(2).islower():
                cap_idx = d + 1 + m.end(2) - 1
                line = line[:cap_idx] + m.group(2).upper() + line[cap_idx + 1:]
            pos = d + 1
            i += 1
            continue

        out.append(", ")
        pos = d + 1
        i += 1

    out.append(line[pos:])
    fixed = "".join(out)

    fixed = fixed.replace("(, ", "(").replace(", )", ")")
    fixed = fixed.replace(" ,", ",").replace(",,", ",")
    return fixed


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not BOOKS_DIR.exists():
        print(f"Books dir not found: {BOOKS_DIR}", file=sys.stderr)
        sys.exit(1)

    total = 0
    for folder in sorted(BOOKS_DIR.iterdir()):
        if not folder.is_dir():
            continue
        for path in sorted(folder.glob("*.md")):
            text = path.read_text(encoding="utf-8")
            if EM not in text:
                continue
            count = text.count(EM)
            total += count
            fixed = "".join(fix_line(ln) for ln in text.splitlines(keepends=True))
            new_count = fixed.count(EM)
            flag = "DRY-RUN " if args.dry_run else ""
            print(f"{flag}{path.relative_to(ROOT)}: {count} -> {new_count}")
            if not args.dry_run:
                path.write_text(fixed, encoding="utf-8")

    print(f"total em dashes: {total}")


if __name__ == "__main__":
    main()
