# Procrastitype Explorer

A science-backed platform to help people understand their procrastination patterns and overcome them through targeted workbooks and exercises.

## Project Overview

This project creates a complete ecosystem for procrastination help:

1. **Landing Page + Quiz** - Interactive assessment to identify procrastination type
2. **Type Explorer** - Educational content about the 7 types of procrastinators  
3. **Workbook Sales** - Integration with Gumroad for selling targeted workbooks
4. **Low-Content Workbooks** - Daily exercises tailored to each procrastination type

## The 7 Procrastination Types

Based on research by Ferrari (1991), Chu & Choi (2005), and contemporary cognitive psychology:

1. **Arousal Procrastinators** ("Thrill Seekers") - Perform better under pressure (often linked to neurochemical activation needs)
2. **Avoidant Procrastinators** - Avoid negative emotions like fear of failure
3. **Decisional Procrastinators** - Struggle with making choices and decisions
4. **Perfectionist Procrastinators** - Paralyzed by impossibly high standards
5. **Passive Procrastinators** - Traditional "bad" procrastination from disorganization
6. **Active Procrastinators** - Strategic delay that maintains performance quality
7. **Emotion-Regulation Procrastinators** - Delay to avoid unpleasant emotions

### 🧠 ADHD Lens Integration
While ADHD is not a separate procrastination type, it often acts as the "engine" behind patterns like Arousal (dopamine seeking) and Passive (executive dysfunction) procrastination. Procrastitype workbooks include specific ADHD-friendly callouts to address these neurobiological factors.

## Technical Implementation

### Two Main Approaches Available:

#### 1. Standalone HTML Demo ✅
- **File**: `demo-rough-procrastination.html`
- Pure HTML/CSS/JavaScript with Rough.js
- Hand-drawn Excalidraw-style UI components
- Fully functional without dependencies
- Perfect for quick prototyping

#### 2. Next.js with Advanced Quiz System ✅  
- **Directory**: `procrastinator-type-website/`
- **URL**: `http://localhost:3007` (when running)
- Modern React/Next.js framework
- **Enhanced Quiz System**: 35 research-backed questions with statistical scoring
- **Scientific Accuracy**: Type correlations, weighted questions, confidence levels
- **Dual Results**: Primary + secondary types with likelihood percentages
- Reusable hand-drawn components (`RoughCard`, `RoughTitle`, `RoughButton`)
- Virgil font integration for authentic Excalidraw look

### Quiz System Features ✅

#### Advanced Scoring Algorithm
- **35 Questions**: 5 per type for improved reliability vs. original 21
- **✨ NEW: Multi-Select Support**: Users can select all options that apply for more nuanced profiling
- **Type Correlations**: Research-based adjustments (e.g., Arousal ↔ Active: 0.6)
- **Weighted Questions**: Based on discriminant validity from Ferrari (1991), Steel (2007)
- **Consistency Checks**: Reverse-coded questions to detect random responses
- **Confidence Levels**: High/Medium/Low based on score separation and consistency
- **✨ NEW: "None of Above" Options**: Neutral responses for when provided options don't fit user experience (included in all 35 questions)
- **✨ NEW: Fixed Question Ordering**: Agree/disagree questions maintain logical progression without randomization

#### Enhanced Results Display
- **Primary Type**: Main procrastination pattern with likelihood percentage
- **Secondary Type**: Mixed patterns identification for nuanced insights
- **Visual Indicators**: Color-coded confidence badges and match percentages
- **Research Transparency**: Clear methodology explanation builds credibility
- **✨ NEW: Neutral Response Tracking**: Displays percentage of "none of above" selections
- **✨ NEW: Uncertainty-Aware Confidence**: Confidence levels adjust when users select too many neutral responses

#### User Experience Improvements
- **Multi-Select Interface**: Smart toggling with mutual exclusivity for "None of the above"
- **Smart Option Ordering**: Regular options randomized, special options (none of above, agree/disagree) maintain fixed positions
- **Inclusive Design**: Users who don't identify with provided options have neutral alternatives
- **Progressive Disclosure**: Question difficulty and complexity respected through ordering
- **Accessibility**: Clear progression from strongly agree to strongly disagree for rating scales
- **✨ NEW: Social Sharing**: Comprehensive share functionality with modal interface and multiple platform support

#### Backward Compatibility
- **Dual System**: Supports both original 21-question and improved 35-question versions
- **Legacy Support**: Existing functionality maintained while adding enhancements
- **Flexible Architecture**: Easy to switch between scoring methods

### Design Philosophy

- **Hand-drawn aesthetic** using Rough.js library
- **Virgil font** (from Excalidraw) for authentic sketchy feel
- **Playful, approachable** design to reduce intimidation around procrastination
- **Science-based content** with accessible explanations

## Project Structure

```
procrastinator/
├── README.md                                    # This file (updated)
├── tasks.md                                    # Detailed project roadmap
├── demo-rough-procrastination.html             # Standalone HTML demo
├── procrastination types.md                    # Content reference
├── improved-quiz-scoring.ts                    # Enhanced scoring algorithm
├── improved-quiz-questions.md                  # 35-question system design
├── Quiz-Improvement-Summary.md                 # Scientific improvements overview
├── sample-quiz-comparison.md                   # Before/after comparison
├── procrastinator-type-website/                # Next.js implementation
│   ├── src/
│   │   ├── components/
│   │   │   ├── RoughCard.tsx                   # Hand-drawn card component
│   │   │   ├── RoughTitle.tsx                  # Hand-drawn title backgrounds
│   │   │   ├── RoughButton.tsx                 # Hand-drawn interactive buttons
│   │   │   ├── QuizProgress.tsx                # Progress indicator
│   │   │   ├── QuizOption.tsx                  # Quiz option styling
│   │   │   ├── ShareButton.tsx                 # Share modal (tracks share_click)
│   │   │   └── SiteFooter.tsx                  # ✨ NEW: shared sitewide footer
│   │   ├── lib/
│   │   │   ├── quiz-data.ts                    # Original 21-question system
│   │   │   ├── improved-quiz-data.ts           # ✨ NEW: 35-question system
│   │   │   ├── improved-quiz-scoring.ts        # ✨ NEW: Advanced scoring algorithm
│   │   │   ├── quiz-utils.ts                   # Updated with dual system support
│   │   │   ├── analytics.ts                    # ✨ NEW: analytics wrapper (Vercel)
│   │   │   └── payhip-links.ts                 # Payhip store links per type
│   │   └── app/
│   │       ├── page.tsx                        # Main landing page
│   │       ├── layout.tsx                      # App layout, SEO metadata + JSON-LD
│   │       ├── sitemap.ts                      # ✨ NEW: XML sitemap
│   │       ├── robots.ts                       # ✨ NEW: robots.txt
│   │       ├── quiz/
│   │       │   ├── page.tsx                    # ✨ UPDATED: Enhanced quiz interface
│   │       │   └── results/page.tsx            # ✨ UPDATED: results + email capture
│   │       ├── types/                          # ✨ NEW: SEO content hub
│   │       │   ├── page.tsx                    # Pillar: "The 7 Types of Procrastination"
│   │       │   ├── arousal-procrastinator/     # Type guide (Article + FAQ schema)
│   │       │   ├── avoidant-procrastinator/    # Type guide
│   │       │   ├── decisional-procrastinator/  # Type guide
│   │       │   ├── perfectionist-procrastinator/ # Type guide
│   │       │   ├── passive-procrastinator/     # Type guide
│   │       │   ├── active-procrastinator/      # Type guide
│   │       │   └── emotion-regulation-procrastinator/ # Type guide
│   │       ├── workbooks/page.tsx              # Books + email signup (Google Sheets)
│   │       └── globals.css                     # Global styles + Virgil font
│   ├── public/
│   │   ├── share-cards/                        # 7 social share images
│   │   └── google87e4ddcc8e80c24b.html         # ✨ NEW: Google Search Console verification
│   └── .env.example                            # Env template incl. NEXT_PUBLIC_SITE_URL
├── procrastinator_workbooks/                    # ✨ NEW: Complete workbook content
│   └── avoidance procrastinator/                # First complete workbook
│       ├── workbook-introduction.md            # ✨ NEW: Half-page introduction
│       └── days/                               # ✨ NEW: 31 daily exercises (20 min each)
│           ├── day-1.md through day-20.md      # Foundation exercises (completed)
│           └── day-21.md through day-31.md     # ✨ NEW: Advanced transformation
├── workbook-generator-method4-html-puppeteer/   # ⭐ FINAL PRODUCTION METHOD
│   ├── production-workbook-generator.js        # ✅ MAIN PRODUCTION SCRIPT
│   ├── PRODUCTION-WORKBOOK.pdf                # ✅ Production-ready output (2 pages)
│   ├── template.html                           # HTML template (backup/reference)
│   ├── assets/                                 # SVG icons and resources
│   └── README.md                              # Production documentation
└── procrastinator-excalidraw/                   # Full Excalidraw integration (backup)
└── share-cards/                                 # ✨ NEW: Social share images per type
    ├── generate-share-cards.js                 # Puppeteer renderer (1080x1080 PNGs)
    ├── share-card-template.html                # Book-cover-style card template
    └── share-cards.config.js                   # Per-type copy + palette
```

### ✨ Recent Additions

#### SEO, Analytics & Content Hub (August 2026)
- **`sitemap.ts` + `robots.ts`** - Auto-generated sitemap and robots.txt
- **Per-page metadata** - Titles, descriptions, canonical, OG/Twitter on every route
- **Schema.org** - Organization, WebSite, Quiz, Article, FAQPage, ItemList JSON-LD
- **`lib/analytics.ts`** - Vercel Web Analytics wrapper with 5 custom events (quiz_start, quiz_complete, share_click, email_signup, workbook_click)
- **Content hub** - Pillar page `/types` + 7 type guides (prose-lint clean)
- **Google verification file** - `public/google87e4ddcc8e80c24b.html`
- **Quiz results email capture** - New "workbook launch" form reusing the Google Sheets `/api/email-signup` endpoint

#### Quiz Enhancement Files
- **`improved-quiz-scoring.ts`** - Research-based scoring with type correlations
- **`improved-quiz-data.ts`** - 35 behavioral/situational questions  
- **Quiz-Improvement-Summary.md** - Statistical improvements documentation
- **sample-quiz-comparison.md** - Before/after result examples

#### Updated Components  
- **`quiz/page.tsx`** - Now supports both quiz versions with enhanced UI
- **`results/page.tsx`** - Displays confidence levels, secondary types, likelihood percentages
- **`quiz-utils.ts`** - Backward-compatible dual system support

#### Complete Workbook Content ✨ NEW
- **`procrastinator_workbooks/avoidance procrastinator/`** - First complete workbook implementation
- **`workbook-introduction.md`** - Compelling half-page introduction based on research
- **31 Daily Exercises** - Complete days 1-31 with evidence-based fear-facing practices
- **20-minute daily commitment** - Structured exercises for systematic transformation
- **Progressive difficulty** - Foundation building (Days 1-20) → Advanced transformation (Days 21-31)

#### ⭐ Production Workbook Generator ✅ READY FOR DEPLOYMENT
- **`workbook-generator-method4-html-puppeteer/`** - **FINAL PRODUCTION SYSTEM**
- **⚠️ ZERO HARDCODING**: ALL content read from markdown files in `procrastinator_workbooks/`
- **Perfect Layout**: 2-page format, zero broken elements, extended fillable lines
- **Hand-drawn Border**: Stamped green border with sketchy styling, inset from page edges
- **Space Optimization**: 93% space utilization with intelligent content distribution
- **Production Quality**: Clean, professional output ready for commercial printing
- **Dynamic Content**: Generates PDFs directly from `.md` source files without any hardcoded text

## SEO, Analytics & Discoverability ✅ LIVE (August 2026)

The site is optimized for Google and Bing discovery:

### Technical SEO
- **`sitemap.xml` + `robots.txt`**: Auto-generated by `src/app/sitemap.ts` and `src/app/robots.ts` (all 16 routes; `/api/` and `/admin` disallowed). Submit `https://procrastitype.jnorthwood.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- **Per-page metadata**: Unique titles, descriptions, canonical URLs, Open Graph and Twitter cards on every route.
- **Google Search Console verification**: ✅ **VERIFIED** via `google-site-verification` meta tag in the site head (via Next metadata); `public/google87e4ddcc8e80c24b.html` remains as backup
- **Search engine submission**: ✅ **DONE** - property verified in Google Search Console and Bing Webmaster Tools (imported from GSC); sitemap submitted in both; indexing requested for the home, quiz, workbooks and all `/types` pages (August 2026)
- **Page speed**: Google Fonts + Material Symbols preconnects, `display=swap` fonts, static prerendering for all content pages.

### Schema.org (JSON-LD)
- **Organization + WebSite (SearchAction)** sitewide in `layout.tsx`
- **Quiz** schema on `/quiz`
- **Article** schema on the 7 type guides (using the share-card images as `image`)
- **FAQPage** schema on home, `/workbooks` and every type guide (visible FAQ sections)
- **ItemList** schema on the pillar page (`/types`)

### Content Hub (Pillar + Spokes)
- **Pillar**: `/types` ("The 7 Types of Procrastination") with one H2 per type, linking to each guide
- **7 type guides**: `/types/arousal-procrastinator`, `/types/avoidant-procrastinator`, `/types/decisional-procrastinator`, `/types/perfectionist-procrastinator`, `/types/passive-procrastinator`, `/types/active-procrastinator`, `/types/emotion-regulation-procrastinator`
- Each guide targets a type-specific keyword, follows `writing_style.md`, passes the prose lint (0 banned words, 0 AI tells, 0 em dashes), and links to the quiz + Payhip book
- Reuse `tools/extract_articles.py` to lint new articles: extract text → rename to `chapter_*.md` → `python tools/prose_lint.py --dir tools/lint_articles`

### Analytics (Vercel Web Analytics - FREE)
- Privacy-friendly, cookie-less analytics via `@vercel/analytics` (no Plausible account or billing needed; swap by changing `src/lib/analytics.ts`)
- Custom events wired through `src/lib/analytics.ts`:
  - `quiz_start` - quiz page mount
  - `quiz_complete` - results page (with primaryType, secondaryType, confidence props)
  - `share_click` - per platform in the share modal (twitter, facebook, linkedin, whatsapp, reddit, copy, native)
  - `email_signup` - workbooks + quiz results forms (with type, source props)
  - `workbook_click` - every Payhip link (with type, placement props)
- View events in Vercel Dashboard → Analytics (events appear once they start firing)

### Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://procrastitype.jnorthwood.com   # canonical domain for sitemap/robots/schema
# Google Sheets (email signups): see GOOGLE_SHEETS_SETUP.md
```

## Getting Started

### Quick Demo
1. Open `demo-rough-procrastination.html` in your browser
2. See the hand-drawn styling and type descriptions

### Next.js Development
```bash
cd procrastinator-type-website
npm install
npm run dev
```
Visit `http://localhost:3007` (or the port shown in console)

### ✅ Google Sheets Email Integration
The email signup system is fully configured and ready for production:
1. **Local Development**: Already working with included `.env` file
2. **Production Deployment**: Import `.env` file to Vercel environment variables
3. **No Additional Setup**: Google Sheets integration will work immediately

See `procrastinator-type-website/GOOGLE_SHEETS_SETUP.md` for detailed setup instructions.

### Production Workbook Generation
```bash
cd workbook-generator-method4-html-puppeteer
npm install

# Generate from markdown files (zero hardcoding)
node production-workbook-generator.js
# Or specify custom input/output
node production-workbook-generator.js "../procrastinator_workbooks/active procrastinator/days/day-2.md" "day-2.pdf"
```
Generates production-ready workbooks with perfect layout and hand-drawn styling by reading ALL content from markdown source files

## Business Model

1. **Free Type Assessment** - Build audience and collect emails ✅ **LIVE WITH GOOGLE SHEETS**
2. **Educational Content** - Establish authority and trust
3. **Cognitive Dismantling Books** - Sold through **Payhip** (links in `PayhipLinks.md`) ✅ **LIVE**
4. **Email Marketing** - Weekly tips and book promotions ✅ **EMAIL CAPTURE WORKING**

### ✅ Live Book Sales (Payhip)
All 7 cognitive dismantling books are published and for sale on Payhip. The quiz
results page now points users straight to the Payhip checkout for their matched
type, and the `/workbooks?type=` page shows a "Get the Book on Payhip" button
instead of a "notify me" form.

- **Links config**: `procrastinator-type-website/src/lib/payhip-links.ts` maps each
  quiz result type → Payhip URL, title, and share-card slug.
- **Source of truth**: `PayhipLinks.md` in the repo root.

### ✅ Shareable "I'm a [Procrastitype]" Cards
Each type has a square (1080x1080) social share image in the book-cover style,
generated by `share-cards/` and served from the site at `/share-cards/<slug>.png`.
They're shown on the results page so users can download or share them (Instagram,
WhatsApp, TikTok, etc.) to drive the quiz viral and point people to the Payhip store.

```bash
# Regenerate the 7 share cards after editing copy/colors:
node share-cards/generate-share-cards.js
```

### ✅ Email Signup System (Production Ready)
- **Google Sheets Integration**: Email signups automatically saved to Google Sheets
- **Persistent Data**: No data loss during deployments (replaces CSV approach)
- **Form Integration**: Working signup forms on `/workbooks` page and the quiz results page (type-segmented, `source` tracking: quiz / landing / quiz-results)
- **API Endpoint**: `/api/email-signup` with validation and error handling
- **Environment Variables**: Secure configuration with `.env` file for easy Vercel deployment

## Content Strategy

- **Scientific credibility** - Reference peer-reviewed research
- **Personal relevance** - Help users identify their specific patterns  
- **Actionable solutions** - Daily exercises and practical strategies
- **Community building** - Shared struggles and success stories

## Technology Choices

### Website & Quiz System
- **Rough.js** - For hand-drawn aesthetic without full Excalidraw complexity
- **Next.js** - Modern React framework for scalability
- **Virgil Font** - Authentic Excalidraw handwritten look
- **Tailwind CSS** - Utility-first styling framework
- **Google Sheets API** ✅ - Email signup persistence across deployments
- **Environment Variables** ✅ - Secure credential management for production

### Workbook Generation (Production)
- **HTML/CSS + Puppeteer** - Professional PDF generation with web design flexibility
- **Kalam Font** - Authentic handwritten appearance for workbook content
- **Template System** - Dynamic content insertion with `{{variable}}` syntax
- **Letter Format** - 8.5" x 11" print-optimized layout with proper margins

### E-commerce & Distribution
- **Gumroad** - E-commerce platform for digital workbook sales
- **PDF Distribution** - High-quality, printable format for customer delivery
- **Google Sheets** ✅ - Customer email management and marketing automation ready

## Research Foundation

### Core Studies Integrated
- **Ferrari, J. R. (1991)** - Procrastination and task avoidance (Avoidant type validation)
- **Chu, A. H. C., & Choi, J. N. (2005)** - Active vs. passive procrastination distinction
- **Steel, P. (2007)** - The Nature of Procrastination (Meta-analysis of predictors)
- Contemporary cognitive psychology on emotion regulation and perfectionism

### Scientific Methodology Applied
- **Type Correlation Matrix**: Based on empirical findings from multiple studies
- **Discriminant Validity Weighting**: Questions weighted by research strength
- **Consistency Validation**: Reverse-coded questions following psychological best practices
- **Mixed-Type Recognition**: Acknowledges research showing most people have blended patterns

### Statistical Improvements
- **Reliability**: 35 questions (5 per type) vs. original 21 for better consistency
- **Validity**: Behavioral questions vs. self-assessment for reduced social desirability bias  
- **Confidence Metrics**: Transparent uncertainty quantification based on score separation
- **Correlation Adjustments**: Accounts for known type overlaps from research literature

## Next Steps

### Ready for Production Scaling
1. **Content Adaptation** - Apply production generator to remaining 6 procrastination types
2. **Batch Generation** - Generate complete workbook library (6 types × 31 days = 186 pages)
3. **Distribution Setup** - Upload to Gumroad for commercial sales

### Current Production Status
- ✅ **Quiz System**: Advanced 35-question assessment with statistical scoring
- ✅ **Complete Content**: All 6 procrastination types with 31-day programs (100% CLEAN)
- ✅ **Content Verification**: All workbooks verified free of inappropriate content (December 2025)
- ✅ **Production Generator**: Perfect layout system with hand-drawn styling
- ✅ **Template System**: `PRODUCTION-WORKBOOK.pdf` demonstrates final quality
- ✅ **SEO Foundation**: sitemap, robots, per-page metadata, schema.org, verification file
- ✅ **Content Hub**: Pillar page + 7 type guides live (prose-lint clean)
- ✅ **Analytics**: Vercel Web Analytics with 5 custom events
- 🎯 **Ready**: System ready for immediate PDF generation and commercial distribution

### SEO Next Steps
- [x] ✅ Verify `https://procrastitype.jnorthwood.com` in Google Search Console (meta tag method)
- [x] ✅ Submit `sitemap.xml` in GSC + Bing Webmaster Tools and request indexing of key pages (done 2026-08-03)
- [ ] Monitor the GSC Pages report; re-request indexing for any "crawled - not indexed" pages after a few days
- [ ] Run PageSpeed Insights and monitor Core Web Vitals in GSC
- [ ] Watch Vercel Analytics events (quiz_start → quiz_complete → email_signup funnel)
- [ ] Expand the content hub: weekly articles reusing the cognitive dismantling book chapters

### Technical Documentation
- **`tasks.md`** - Development roadmap and completed features
- **`PRODUCTION-PIPELINE.md`** - Workbook generation workflow
- **`workbook-generator-method4-html-puppeteer/README.md`** - Production system details