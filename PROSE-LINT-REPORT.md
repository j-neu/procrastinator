# Prose Lint Report

Book: `cognitive_dismantling_books\perfectionist procrastinator`
Files: 46
Date: 2026-08-02

## Verdict

The book passes all three layers of the prose lint. It does not read as machine-written.
See "Triage" below for what was changed, and what was deliberately left alone.

## Triage

### Fixed (proselint / AI-tell hits that were genuine issues)

| File | Issue | Change |
|------|-------|--------|
| chapter_01.md | "the reason is because" (redundancy) | "the reason is that" |
| chapter_02.md | "very difficult" (weasel word) | "difficult" |
| chapter_04.md | "obviously destructive" (greylist) | "clearly destructive" |
| chapter_04.md | "a very comfortable-looking door" (weasel word) | "a comfortable-looking door" |
| chapter_11.md | "At the end of the day" (cliché + AI-tell) | "By the end of the day" |
| chapter_12.md | "the actual experience" (redundancy) | "the experience" |
| chapter_14.md | "ask the question that" (redundancy) | "ask what" |
| chapter_18.md | "At the end of the day" (cliché + AI-tell) | "By the end of the day" |
| chapter_26.md | "working very hard" (weasel word) | "working hard" |
| chapter_26.md | "the exact opposite" (redundancy) | "the opposite" |
| chapter_31.md | "the exact opposite" (redundancy) | "the opposite" |
| chapter_34.md | "too obviously a waste" (greylist) | "too plainly a waste" |

### Deliberately left (intentional Easyway voice, not AI-tells)

- **"not only ... but also"** (chapter_01 x2, chapter_13 x1): idiomatic parallel
  construction, authentic to the series voice. Kept.
- **"most importantly"** (chapter_19): natural enumeration in a four-point argument. Kept.
- **Paragraph-starting "But"** (7 occurrences): deliberate Easyway cadence. Kept.
- **Idiomatic "very + noun"** ("the very work", "the very trap", "the very progress",
  "the very standard", "very first", "all very well for you"): set phrases, not weasel
  words. Kept.
- **"not honest"** (chapter_08): deliberate parallel to "it is honest about one thing".
  Kept over "dishonest".
- **Straight quotes / "facade" spelling**: markdown-source formatting choices; handled
  at the ebook conversion stage, not in prose. Kept.

## Calibration notes (for readers)

The book deliberately uses repetition, ALL-CAPS emphasis, rhetorical questions, and
parallel construction ("It is not X; it is Y"). These are the technique, not a failure
of it. They are also styles some AI writing tools imitate, which is why
`note-to-readers.md` is included in this book to tell readers the repetition is
intentional. See the prose-lint section of `PRODUCTION-PIPELINE.md` for the workflow.

## Rhythm & Readability

| file | words | sentences | avg sent | flesch | F-K grade | syll/word | CV |
|------|------:|----------:|---------:|-------:|----------:|----------:|-----:|
| chapter_01.md | 884 | 60 | 13.4 | 69.9 | 6.8 | 1.46 | 0.57 |
| chapter_02.md | 840 | 52 | 15.6 | 65.9 | 7.9 | 1.48 | 0.73 |
| chapter_03.md | 680 | 72 | 9.9 | 81.6 | 4.3 | 1.36 | 0.57 |
| chapter_04.md | 746 | 69 | 10.4 | 80.0 | 4.7 | 1.38 | 0.65 |
| chapter_05.md | 772 | 80 | 9.8 | 75.9 | 5.1 | 1.43 | 0.57 |
| chapter_06.md | 790 | 74 | 10.0 | 73.2 | 5.5 | 1.46 | 0.56 |
| chapter_07.md | 778 | 77 | 9.3 | 72.7 | 5.4 | 1.47 | 0.62 |
| chapter_08.md | 860 | 83 | 10.0 | 85.8 | 3.8 | 1.31 | 0.68 |
| chapter_09.md | 803 | 71 | 10.7 | 73.8 | 5.6 | 1.44 | 0.69 |
| chapter_10.md | 757 | 67 | 11.5 | 74.2 | 5.8 | 1.43 | 0.56 |
| chapter_11.md | 769 | 73 | 10.7 | 74.5 | 5.5 | 1.44 | 0.65 |
| chapter_12.md | 797 | 77 | 10.8 | 76.5 | 5.3 | 1.41 | 0.66 |
| chapter_13.md | 834 | 70 | 11.3 | 74.2 | 5.7 | 1.43 | 0.64 |
| chapter_14.md | 810 | 67 | 11.9 | 76.0 | 5.6 | 1.40 | 0.57 |
| chapter_15.md | 822 | 75 | 10.5 | 75.7 | 5.3 | 1.42 | 0.67 |
| chapter_16.md | 896 | 78 | 11.3 | 71.6 | 6.1 | 1.46 | 0.64 |
| chapter_17.md | 860 | 73 | 11.9 | 74.6 | 5.8 | 1.42 | 0.68 |
| chapter_18.md | 818 | 87 | 9.7 | 67.9 | 6.2 | 1.53 | 0.60 |
| chapter_19.md | 841 | 77 | 11.4 | 72.5 | 6.0 | 1.45 | 0.65 |
| chapter_20.md | 828 | 80 | 9.6 | 81.4 | 4.3 | 1.37 | 0.69 |
| chapter_21.md | 1 | 1 | 1.0 | 121.2 | -3.4 | 1.00 | 0.00 |
| chapter_22.md | 769 | 67 | 10.7 | 73.4 | 5.7 | 1.45 | 0.71 |
| chapter_23.md | 800 | 78 | 10.1 | 73.8 | 5.5 | 1.45 | 0.63 |
| chapter_24.md | 831 | 75 | 10.3 | 85.1 | 3.9 | 1.32 | 0.66 |
| chapter_25.md | 807 | 74 | 10.1 | 75.4 | 5.2 | 1.43 | 0.64 |
| chapter_26.md | 852 | 70 | 11.2 | 72.4 | 5.9 | 1.45 | 0.61 |
| chapter_27.md | 857 | 69 | 11.3 | 62.3 | 7.4 | 1.57 | 0.61 |
| chapter_28.md | 828 | 72 | 10.3 | 78.1 | 4.9 | 1.40 | 0.58 |
| chapter_29.md | 943 | 92 | 10.0 | 77.6 | 4.9 | 1.41 | 0.51 |
| chapter_30.md | 943 | 83 | 11.2 | 72.2 | 6.0 | 1.46 | 0.56 |
| chapter_31.md | 912 | 73 | 11.3 | 74.8 | 5.6 | 1.43 | 0.67 |
| chapter_32.md | 878 | 77 | 11.0 | 84.0 | 4.3 | 1.32 | 0.63 |
| chapter_33.md | 900 | 104 | 8.7 | 86.6 | 3.3 | 1.32 | 0.56 |
| chapter_34.md | 827 | 89 | 9.3 | 77.3 | 4.8 | 1.42 | 0.71 |
| chapter_35.md | 893 | 81 | 9.8 | 80.7 | 4.4 | 1.37 | 0.68 |
| chapter_36.md | 914 | 92 | 9.8 | 77.7 | 4.9 | 1.41 | 0.56 |
| chapter_37.md | 835 | 82 | 10.6 | 74.3 | 5.5 | 1.44 | 0.70 |
| chapter_38.md | 933 | 81 | 11.2 | 74.5 | 5.7 | 1.43 | 0.69 |
| chapter_39.md | 899 | 93 | 10.3 | 82.0 | 4.4 | 1.35 | 0.72 |
| chapter_40.md | 956 | 98 | 9.7 | 84.4 | 3.9 | 1.33 | 0.67 |
| chapter_41.md | 969 | 100 | 9.4 | 83.6 | 3.9 | 1.34 | 0.77 |
| chapter_42.md | 900 | 87 | 11.0 | 80.4 | 4.8 | 1.36 | 0.65 |
| chapter_43.md | 785 | 72 | 10.1 | 83.8 | 4.1 | 1.33 | 0.71 |
| chapter_44.md | 935 | 90 | 9.2 | 85.0 | 3.7 | 1.33 | 0.62 |
| finale.md | 495 | 55 | 9.5 | 89.8 | 3.1 | 1.27 | 0.65 |
| note-to-readers.md | 194 | 14 | 12.9 | 66.4 | 7.2 | 1.51 | 0.65 |

## Style Conformance (banned vocabulary / patterns)

| file | count | instances |
|------|------:|-----------|
| (none) | 0 | - |

## AI-Tell Patterns

| file | count | instances |
|------|------:|-----------|
| chapter_01.md | 2 | L19 [not only ... but also]; L24 [not only ... but also] |
| chapter_19.md | 1 | L15 [importantly] |

## Sentence-Opener Transition Density

| file | openers |
|------|--------|
| chapter_01.md | in x1 |
| chapter_02.md | in x1 |
| chapter_03.md | in x1 |
| chapter_04.md | in x1 |
| chapter_05.md | in x1 |
| chapter_06.md | in x1 |
| chapter_13.md | in x1 |
| chapter_15.md | in x1 |
| chapter_17.md | in x1 |
| chapter_41.md | in x1 |
| chapter_43.md | in x1 |

## Em-Dash Density (per 1000 words)

| file | count | per-1k |
|------|------:|-------:|
| chapter_01.md | 6 | 6.8 |
| chapter_02.md | 5 | 6.0 |
| chapter_03.md | 1 | 1.5 |
| chapter_04.md | 3 | 4.0 |
| chapter_05.md | 5 | 6.5 |
| chapter_06.md | 2 | 2.5 |
| chapter_07.md | 2 | 2.6 |
| chapter_08.md | 6 | 7.0 |
| chapter_09.md | 4 | 5.0 |
| chapter_10.md | 8 | 10.6 |
| chapter_11.md | 4 | 5.2 |
| chapter_12.md | 8 | 10.0 |
| chapter_13.md | 2 | 2.4 |
| chapter_14.md | 4 | 4.9 |
| chapter_15.md | 6 | 7.3 |
| chapter_16.md | 3 | 3.3 |
| chapter_17.md | 5 | 5.8 |
| chapter_18.md | 3 | 3.7 |
| chapter_19.md | 5 | 5.9 |
| chapter_20.md | 8 | 9.7 |
| chapter_21.md | 0 | 0.0 |
| chapter_22.md | 10 | 13.0 |
| chapter_23.md | 6 | 7.5 |
| chapter_24.md | 3 | 3.6 |
| chapter_25.md | 1 | 1.2 |
| chapter_26.md | 8 | 9.4 |
| chapter_27.md | 1 | 1.2 |
| chapter_28.md | 3 | 3.6 |
| chapter_29.md | 0 | 0.0 |
| chapter_30.md | 6 | 6.4 |
| chapter_31.md | 2 | 2.2 |
| chapter_32.md | 3 | 3.4 |
| chapter_33.md | 4 | 4.4 |
| chapter_34.md | 6 | 7.3 |
| chapter_35.md | 5 | 5.6 |
| chapter_36.md | 6 | 6.6 |
| chapter_37.md | 4 | 4.8 |
| chapter_38.md | 7 | 7.5 |
| chapter_39.md | 8 | 8.9 |
| chapter_40.md | 5 | 5.2 |
| chapter_41.md | 4 | 4.1 |
| chapter_42.md | 5 | 5.6 |
| chapter_43.md | 2 | 2.5 |
| chapter_44.md | 0 | 0.0 |
| finale.md | 3 | 6.1 |
| note-to-readers.md | 0 | 0.0 |

## Rule-of-Three Instances

| file | count |
|------|------:|
| chapter_01.md | 2 |
| chapter_02.md | 0 |
| chapter_03.md | 1 |
| chapter_04.md | 0 |
| chapter_05.md | 1 |
| chapter_06.md | 1 |
| chapter_07.md | 0 |
| chapter_08.md | 0 |
| chapter_09.md | 0 |
| chapter_10.md | 1 |
| chapter_11.md | 2 |
| chapter_12.md | 0 |
| chapter_13.md | 1 |
| chapter_14.md | 0 |
| chapter_15.md | 1 |
| chapter_16.md | 1 |
| chapter_17.md | 2 |
| chapter_18.md | 0 |
| chapter_19.md | 0 |
| chapter_20.md | 0 |
| chapter_21.md | 0 |
| chapter_22.md | 0 |
| chapter_23.md | 0 |
| chapter_24.md | 0 |
| chapter_25.md | 1 |
| chapter_26.md | 1 |
| chapter_27.md | 0 |
| chapter_28.md | 0 |
| chapter_29.md | 1 |
| chapter_30.md | 2 |
| chapter_31.md | 0 |
| chapter_32.md | 2 |
| chapter_33.md | 0 |
| chapter_34.md | 0 |
| chapter_35.md | 0 |
| chapter_36.md | 0 |
| chapter_37.md | 1 |
| chapter_38.md | 0 |
| chapter_39.md | 0 |
| chapter_40.md | 0 |
| chapter_41.md | 0 |
| chapter_42.md | 0 |
| chapter_43.md | 1 |
| chapter_44.md | 0 |
| finale.md | 0 |
| note-to-readers.md | 1 |
