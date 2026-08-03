#!/usr/bin/env python3
"""Re-apply method-name fixes ("The Easy Method"/"The Easy Way"/"easyway")
across all cognitive dismantling books. Converts them to neutral phrasing
("This method"/"This way") per the Reference Policy in PRODUCTION-PIPELINE.md.

Also fixes the book title on the title page to "Breaking the Procrastination
Pattern" (handled in book-publisher/build-book.js).

Usage:
  python tools/fix_method_names.py            # all books
  python tools/fix_method_names.py --dry-run  # report only
"""

import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOKS_DIR = ROOT / "cognitive_dismantling_books"
EM = "\u2014"

# Ordered: more specific first.
REPLACEMENTS = [
    ('# Chapter 2: The Easy Method', '# Chapter 2: This Method'),
    ('# THE EASY METHOD', '# THIS METHOD'),
    ('# Chapter 32: The Easy Way to Stop', '# Chapter 32: This Way to Stop'),
    ('# THE EASY WAY TO STOP', '# THIS WAY TO STOP'),
    ('The "Easy Method"', 'This method'),
    ('the "Easy Method"', 'this method'),
    ('The Easy Method', 'This method'),
    ('the Easy Method', 'this method'),
    ('The "Easy Way"', 'This way'),
    ('The Easy Way', 'This way'),
    ('**The Easy Method**', '**This Method**'),
    ('**The Easy Way to Stop**', '**This Way to Stop**'),
    ('**The Easy Way to Decide**', '**This Way to Decide**'),
]

STRUCTURE_TITLES = {
    "avoidance": "Breaking the Procrastination Pattern (Avoidance Edition) - Structure",
    "arousal": "Breaking the Procrastination Pattern (Arousal Edition) - Structure",
    "active": "Breaking the Procrastination Pattern (Active Edition) - Structure",
    "decisional": "Breaking the Procrastination Pattern (Decisional Edition) - Structure",
    "emotion-regulation": "Breaking the Procrastination Pattern (Emotion-Regulation Edition) - Structure",
    "passive": "Breaking the Procrastination Pattern (Passive / Overwhelm Edition) - Structure",
    "perfectionist": "Breaking the Procrastination Pattern (Perfectionist Edition) - Structure",
}

OLD_TITLE = "# The Easy Way to Stop Procrastinating"
NEW_TITLE = "# Breaking the Procrastination Pattern"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    total = 0
    for folder in sorted(BOOKS_DIR.iterdir()):
        if not folder.is_dir():
            continue
        slug = folder.name.split()[0]
        for path in sorted(folder.glob("*.md")):
            text = path.read_text(encoding="utf-8")
            orig = text

            if path.name == "structure.md":
                text = text.replace(OLD_TITLE, NEW_TITLE)
            for old, new in REPLACEMENTS:
                if old in text:
                    count = text.count(old)
                    total += count
                    text = text.replace(old, new)

            if text != orig:
                flag = "DRY-RUN " if args.dry_run else ""
                print(f"{flag}{path.relative_to(ROOT)}")
                if not args.dry_run:
                    path.write_text(text, encoding="utf-8")

    print(f"total replacements: {total}")


if __name__ == "__main__":
    main()
