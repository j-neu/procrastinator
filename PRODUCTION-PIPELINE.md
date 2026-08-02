# Production Pipeline: Workbook Generation

## ⚠️ CRITICAL: ZERO HARDCODING POLICY ⚠️

**ALL WORKBOOK CONTENT MUST COME FROM MARKDOWN FILES**

The production pipeline MUST read 100% of content from `.md` files in `procrastinator_workbooks/`. NO text, questions, exercises, or content should be hardcoded in generator files.

## ⭐ Final Method: HTML/CSS + Puppeteer

After testing 4 different approaches, **Method 4 (HTML/CSS + Puppeteer)** has been selected as our production method for generating professional workbook PDFs from markdown source files.

### Why Method 4 Was Chosen

| Criteria | Method 1 (Node+Rough) | Method 2 (Python+ReportLab) | Method 3 (Canvas+jsPDF) | **Method 4 (HTML+Puppeteer)** ⭐ |
|----------|------------------------|------------------------------|-------------------------|-----------------------------------|
| **Visual Quality** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Development Speed** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Design Flexibility** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Print Quality** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Maintenance** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **Authenticity** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | **⭐⭐⭐⭐⭐** |

**Key Advantages:**
- **100% Markdown-Driven**: ALL content dynamically read from `.md` files, zero hardcoding
- **Professional PDF Quality**: Vector-based text, crisp rendering at any zoom level
- **Web Design Flexibility**: Full CSS capabilities including fonts, animations, gradients
- **Hand-drawn Authenticity**: Kalam font + CSS transformations create genuine sketch feel
- **Dynamic Content System**: Full markdown parsing and content extraction
- **Print Optimization**: Proper margins, Letter format, high-resolution output
- **Development Experience**: Familiar HTML/CSS workflow, fast iteration

## Production Workflow

### 1. Content Creation (Zero Hardcoding)
```
Markdown Source Files (.md) → Dynamic Parsing → Content Extraction → HTML Generation → PDF Export
```
**CRITICAL**: All content flows from `.md` files. No hardcoded text allowed.

### 2. File Structure
```
workbook-generator-method4-html-puppeteer/
├── generator.js          # Main generation script
├── template.html         # Master HTML/CSS template
├── content/             # Content source files
│   ├── avoidance/       # Avoidance procrastinator content
│   ├── arousal/         # Arousal procrastinator content
│   └── ...              # Other types
├── output/              # Generated PDF files
├── assets/              # Images, fonts, decorative elements
└── package.json         # Dependencies
```

### 3. Generation Process

#### Step 1: Setup
```bash
cd workbook-generator-method4-html-puppeteer
npm install puppeteer
```

#### Step 2: Content Preparation
- Source content in Markdown format (existing in `procrastinator_workbooks/`)
- Extract template variables: `{{title}}`, `{{focus}}`, `{{exercise}}`, etc.
- Organize content by procrastination type and day

#### Step 3: PDF Generation (From Markdown Files)
```bash
# Generate from specific markdown file
node production-workbook-generator.js "../procrastinator_workbooks/active procrastinator/days/day-1.md" "output.pdf"

# Generate with default day-1.md
node production-workbook-generator.js
```
**ZERO HARDCODING**: All content comes from the specified `.md` file

#### Step 4: Quality Control
- Visual inspection of generated PDFs
- Print test on physical paper
- File size optimization
- Batch generation verification

### 4. Template System Architecture

#### Master Template (`template.html`)
- **Base Layout**: 8.5" x 11" Letter format with 0.75" margins
- **2-Page Format**: Each day takes exactly 2 PDF pages (62 pages per workbook)
- **Page Break Control**: CSS rules prevent splitting of text boxes and sections
- **Hand-drawn Styling**: CSS rotations, Kalam font, layered borders
- **Print-Optimized**: White background for physical printing
- **Brand Colors**: Landing page palette (sage, terracotta, ochre, slate)
- **OpenMoji Icons**: Professional SVG icons (star, lightbulb) instead of emojis
- **Component Sections**: Morning check-in, exercises, reflections, quotes
- **Variable Placeholders**: `{{title}}`, `{{subtitle}}`, `{{focus}}`, etc.

#### Critical Layout Requirements
- **Fixed Height**: 11 inches per page (no flexible min-height)
- **Break Avoidance**: All fillable elements protected from page breaks
- **Section Integrity**: Complete sections move to next page if they don't fit
- **Consistent Spacing**: Adjustable spacing variables for content optimization

#### CSS Design System
```css
.exercise-section     # Color-coded exercise areas
.fillable-line       # Dotted lines for user input
.commitment-box      # Highlighted action areas
.courage-quote       # Inspirational content styling
.step-number         # Circular numbered steps
```

#### Content Variables
```javascript
const templateData = {
    title: "Day X: Exercise Title",
    subtitle: "Procrastination Type Workbook", 
    focus: "Today's learning objective",
    time: "20 minutes",
    exercise: "Core exercise name"
};
```

### 5. Scaling for All Workbook Types

#### Phase 1: Avoidance Procrastinator (✅ Complete)
- 31 daily exercises already created
- Template system tested and working
- Sample PDF generated and verified

#### Phase 2: Remaining 6 Types
```bash
# Generate templates for each type
node create-templates.js --type=arousal
node create-templates.js --type=perfectionist  
node create-templates.js --type=decisional
node create-templates.js --type=passive
node create-templates.js --type=active
node create-templates.js --type=emotion-regulation
```

#### Phase 3: Batch Generation
```bash
# Generate all workbooks
node generate-all.js --output=../final-workbooks/
```

### 6. Quality Assurance Pipeline

#### Automated Checks
- [ ] PDF file generation success
- [ ] **Page count validation**: Exactly 2 pages per day (62 pages per workbook)
- [ ] File size within acceptable range (< 50MB per workbook)
- [ ] Visual consistency across pages
- [ ] Print margin verification
- [ ] Text readability at standard zoom levels
- [ ] **Page break validation**: No split text boxes or sections

#### Manual Verification
- [ ] Print test on physical paper
- [ ] Visual inspection of hand-drawn styling
- [ ] Content accuracy and formatting
- [ ] **User Clarity Check**: All daily questions, terminology, and exercises clear for novice users
- [ ] **Example Quality**: All techniques include specific, concrete examples
- [ ] **Rating Scale Definitions**: All 1-10 scales include explanatory text
- [ ] Interactive element positioning
- [ ] **Fillable area integrity**: All text boxes complete and usable
- [ ] **2-page layout consistency**: Proper content distribution
- [ ] Overall professional appearance

#### Critical Layout Validation
- [ ] No text boxes cut by page breaks
- [ ] All sections maintain visual coherence
- [ ] Consistent spacing across all daily exercises
- [ ] Proper page flow from day to day
- [ ] Physical printability test with binding margins

### 7. Distribution Preparation

#### File Organization
```
final-workbooks/
├── avoidance-procrastinator-workbook.pdf      # 31-page complete workbook
├── arousal-procrastinator-workbook.pdf        # 31-page complete workbook
├── perfectionist-procrastinator-workbook.pdf  # 31-page complete workbook
├── decisional-procrastinator-workbook.pdf     # 31-page complete workbook
├── passive-procrastinator-workbook.pdf        # 31-page complete workbook
├── active-procrastinator-workbook.pdf         # 31-page complete workbook
└── emotion-regulation-workbook.pdf            # 31-page complete workbook
```

#### Gumroad Integration
- Upload PDFs to Gumroad product listings
- Create preview images from generated pages
- Set up automatic delivery systems
- Configure bundle pricing options

### 8. Maintenance & Updates

#### Content Updates
1. Edit source Markdown files in `procrastinator_workbooks/`
2. Re-run generation script for specific type
3. Replace PDF in distribution channels

#### Template Updates
1. Modify `template.html` for design changes
2. Test with sample content
3. Regenerate all workbooks if needed

#### Performance Optimization
- Monitor generation speed (currently ~2-3 seconds per page)
- Optimize CSS for faster rendering
- Consider parallel processing for batch generation

## Next Steps

### Immediate (Week 1)
- [x] ✅ Method 4 implementation complete
- [x] ✅ Test generation working
- [x] ✅ Documentation updated

### Short-term (Weeks 2-4)
- [ ] 🚨 **URGENT**: Apply clarity improvements to Avoidance Procrastinator workbook
- [ ] 🚨 **URGENT**: Apply clarity improvements to all remaining workbooks before generation
- [ ] Create content processing scripts for remaining 6 types
- [ ] Build batch generation pipeline
- [ ] Develop quality assurance automation
- [ ] Create Gumroad-ready preview materials

### Medium-term (Weeks 5-8)
- [ ] Generate all 7 complete workbooks (31 pages each)
- [ ] Conduct print testing and quality verification
- [ ] Set up distribution pipeline
- [ ] Launch first workbook sales

This production pipeline transforms our research-backed content into professional, printable workbooks that maintain the authentic hand-drawn aesthetic while ensuring commercial-quality output suitable for paying customers.

---

# Production Pipeline: Cognitive Dismantling Books (Ebook Series)

**Distinct from the Workbooks above.** These are reading-focused ebooks (Kindle/ePub) using the Cognitive Dismantling method (adapted from Allen Carr).

## 1. Core Parameters

-   **Target Audience:** Each book targets a specific procrastinator type (Avoidance, Arousal, Active, etc.).
-   **Format:** Ebook/Kindle. No write-in sections (unlike the Workbooks).
-   **Length:** 15,000 - 20,000 words per book.
-   **Structure:** ~44 Chapters + Finale (See `structure.md`).
-   **Methodology:** Cognitive Dismantling (adapting Allen Carr's "Easyway").
    -   *Logic:* It's not a habit/personality trait; it's an addiction to safety/relief.
    -   *Mechanism:* Fear -> Avoidance -> Relief -> Addiction.
    -   *Goal:* Remove the fear/brainwashing so the user *wants* to work.

## 2. Style Guidelines

-   **Tone:** Informal, authoritative, empathetic, direct.
-   **Voice:** "I have been there." (Author as a recovered addict, not a distant professor).
-   **Reference Policy:** **NEVER** mention "Allen Carr" or "Easyway" directly. Adapt the *principles*, do not copy the *brand*.
-   **Exercise Format:** Exercises are mental or require external paper.
    -   *Wrong:* "Write in the box below."
    -   *Right:* "Put this book down and write on a piece of paper."

## 3. Production Process

1.  **Select Type:** Pick one of the 7 Procrastinator Types.
2.  **Create Directory:** `cognitive_dismantling_books/[type]/`
3.  **Create Structure:** Copy `structure.md` from `avoidance procrastinator` to the new directory.
4.  **Generate Chapters:**
    -   Create one Markdown file per chapter (`chapter_01.md`, `chapter_02.md`, etc.).
    -   Use `@smoking.txt` and `@caffeine.txt` as "tonal templates" but map them to the specific procrastination type.
    -   *Example:* "Nicotine Withdrawal" -> "Distraction Withdrawal". "Just one cigarette" -> "Just one email check".
5.  **Add the AI-Style Note:** Every book must include `note-to-readers.md` as front matter. The Easyway voice deliberately repeats itself, uses ALL CAPS, asks rhetorical questions, and builds on parallel constructions ("It is not X; it is Y") — all of which are also styles some AI writing tools imitate. The note tells readers the repetition is intentional, so the book is not mistaken for machine-written.
6.  **Prose Lint:** Run `python tools/prose_lint.py --dir "cognitive_dismantling_books/[type]/"` and review the report (see Section 6). Fix genuine hits. Keep deliberate style choices. Write the triage verdict into the report.
7.  **Review:** Ensure flow is logical and tone is consistent.

## 4. Current Status

| Book Type | Status | Path | Prose Lint |
| :--- | :--- | :--- | :--- |
| **Avoidance Procrastinator** | ✅ **COMPLETE** | `cognitive_dismantling_books/avoidance procrastinator/` | ✅ **DONE** |
| **Arousal Procrastinator** | ✅ **COMPLETE** | `cognitive_dismantling_books/arousal procrastinator/` | ✅ **DONE** |
| **Active Procrastinator** | ✅ **COMPLETE** | `cognitive_dismantling_books/active procrastinator/` | ✅ **DONE** |
| **Decisional Procrastinator** | ✅ **COMPLETE** | `cognitive_dismantling_books/decisional procrastinator/` | ✅ **DONE** |
| **Emotion-Regulation** | ✅ **COMPLETE** | `cognitive_dismantling_books/emotion-regulation procrastinator/` | ✅ **DONE** |
| **Passive Procrastinator** | ✅ **COMPLETE** | `cognitive_dismantling_books/passive procrastinator/` | ✅ **DONE** |
| **Perfectionist** | ✅ **COMPLETE** | `cognitive_dismantling_books/perfectionist procrastinator/` | ✅ **DONE** (long-form test) |

## 5. Prose Lint & AI-Style Workflow (ROLLED OUT — all 7 books complete)

**Status:** Trialed on the **Perfectionist** book, then rolled out to all 6 remaining books.
All 7 books now pass with zero banned vocabulary, and each has a `note-to-readers.md` and a
per-book lint report (`PROSE-LINT-REPORT-<book>.md`). The Perfectionist book is also the
length A/B test (~37k words vs ~17-23k for the series) — the lint result applies to both
choices.

### Purpose

Two goals: (1) catch banned vocabulary and AI-typical phrasing per `writing_style.md`, and (2) verify the prose rhythm is human-like, not uniformly mechanical. We deliberately do **not** use GPTZero-style AI detectors — they are unreliable and would flag the intentional Easyway repetition.

### The three passes

| Pass | Tool | What it catches |
|------|------|-----------------|
| 1. Style conformance | `tools/prose_lint.py` | Banned words/patterns from `writing_style.md` (delve, tapestry, moreover, "in conclusion", etc.) + AI-tell phrases ("not only ... but also", "at the end of the day", "importantly") |
| 2. Prose quality | proselint (v0.16, bundled in the script) | Clichés, weasel words, redundancy, corporate-speak, paragraph-starting "But" |
| 3. Rhythm & readability | textstat (bundled) | Flesch Reading Ease, grade level, sentence-length coefficient of variation (AI text runs uniform, CV < ~0.5) |

### Running it

```bash
pip install proselint textstat
python tools/prose_lint.py --dir "cognitive_dismantling_books/perfectionist procrastinator/"   # writes PROSE-LINT-REPORT.md
```

### The triage rule

Not every hit is a fix. The Easyway voice is *supposed* to repeat, emphasize, and use parallel construction. The rule is:

- **Fix:** banned `writing_style.md` words, clichés, redundancy, weasel "very", corporate catchphrases.
- **Keep:** idiomatic "not only ... but also", "very + noun" set phrases, paragraph-starting "But", the "not honest" / "dishonest" choice when it is doing parallel work, straight quotes (handled at conversion).
- **Document:** every kept item goes in the report's triage table so the decision is reviewable.

### Baseline results (all 7 books, 2026-08-02)

- Banned vocabulary: **0 across all 7 books** (3 "Furthermore" instances found and removed in the rollout).
- Readability: Flesch 62-92, F-K grade 3-8 across books (plain, accessible).
- Sentence-length CV: 0.42-1.20 across books (healthy human variance; AI text is typically < 0.5).
- Fixed in rollout: ~70 genuine hits — banned transitions, clichés ("badge of honor",
  "in the long run", "perfect storm", "under the gun", "at the end of the day"),
  redundancy ("exact same", "exact opposite", "temporary reprieve", "natural instinct",
  "tiny bit"), weasel "very" intensifiers (~25), spelling/preferred forms ("Impostor",
  "matrices"), gender-neutral wording ("mail carrier").
- Left deliberately (documented per report): idiomatic "not only ... but also",
  "very + noun" set phrases, authorial "very successful"/"very lucky man",
  paragraph-starting "But", "suddenly" in dramatic beats, "1-10" scales (false-positive
  date-range flag), straight quotes (conversion-stage).
- Content note flagged in the passive book report: fillable underscore lines in ch10/ch30
  exercises conflict with the "no write-in sections" ebook rule — pending a decision.

### Rollout decision

**Done.** The workflow trialed cleanly on the Perfectionist book and was rolled out to the
remaining 6 books. All 7 books have: `note-to-readers.md`, a passing lint run, and a
per-book report (`PROSE-LINT-REPORT-<book>.md`). Future books follow Section 3 steps 5-6
(Add the AI-Style Note, then Prose Lint) before being marked complete.

## 6. Next Session Instructions

To start the next book:
1.  Choose a type (e.g., **Perfectionist Procrastinator**).
2.  Create folder `cognitive_dismantling_books/perfectionist procrastinator/`.
3.  Copy `structure.md` from `avoidance procrastinator`.
4.  Instruct agent: *"Create Chapter 1 for the Perfectionist Procrastinator book using the Cognitive Dismantling parameters defined in PRODUCTION-PIPELINE.md."*
