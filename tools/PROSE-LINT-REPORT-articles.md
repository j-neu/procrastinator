# Prose Lint Report

Book: `tools\lint_articles`
Files: 8

## Rhythm & Readability

| file | words | sentences | avg sent | flesch | F-K grade | syll/word | CV |
|------|------:|----------:|---------:|-------:|----------:|----------:|-----:|
| chapter_01.md | 1004 | 73 | 11.0 | 61.3 | 7.5 | 1.59 | 1.05 |
| chapter_02.md | 985 | 80 | 10.4 | 61.1 | 7.3 | 1.60 | 1.07 |
| chapter_03.md | 1016 | 80 | 10.7 | 69.5 | 6.2 | 1.50 | 0.96 |
| chapter_04.md | 940 | 65 | 11.9 | 56.9 | 8.3 | 1.63 | 1.05 |
| chapter_05.md | 960 | 77 | 10.7 | 58.5 | 7.7 | 1.63 | 1.05 |
| chapter_06.md | 856 | 44 | 11.3 | 51.3 | 8.9 | 1.70 | 0.78 |
| chapter_07.md | 975 | 78 | 11.0 | 58.2 | 7.9 | 1.63 | 1.08 |
| chapter_08.md | 913 | 75 | 10.4 | 59.4 | 7.5 | 1.62 | 1.07 |

## Style Conformance (banned vocabulary / patterns)

| file | count | instances |
|------|------:|-----------|
| (none) | 0 | - |

## AI-Tell Patterns

| file | count | instances |
|------|------:|-----------|
| (none) | 0 | - |

## Sentence-Opener Transition Density

| file | openers |
|------|--------|

## Em-Dash Density (per 1000 words)

| file | count | per-1k |
|------|------:|-------:|
| chapter_01.md | 0 | 0.0 |
| chapter_02.md | 0 | 0.0 |
| chapter_03.md | 0 | 0.0 |
| chapter_04.md | 0 | 0.0 |
| chapter_05.md | 0 | 0.0 |
| chapter_06.md | 0 | 0.0 |
| chapter_07.md | 0 | 0.0 |
| chapter_08.md | 0 | 0.0 |

## Rule-of-Three Instances

| file | count |
|------|------:|
| chapter_01.md | 0 |
| chapter_02.md | 0 |
| chapter_03.md | 0 |
| chapter_04.md | 0 |
| chapter_05.md | 0 |
| chapter_06.md | 0 |
| chapter_07.md | 0 |
| chapter_08.md | 0 |

## Triage Verdict (2026-08-03)

- Banned vocabulary / AI tells / em dashes: 0 across all 8 pages.
- Rule-of-three: 4 genuine hits fixed (rewards/apps/promises, real/instant/expensive, memory/intention/willpower x2).
- Clichés: "crystal clear" removed (pillar page).
- Kept deliberately (documented): straight double quotes in headings and inline quotes (typography.symbols.curly_quotes, 15 hits) - consistent with the site's existing blog style; quotes are not banned by writing_style.md.
- Readability: Flesch 51-70, F-K grade ~6-9, sentence-length CV 0.78-1.08 (healthy human variance).
