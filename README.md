# Procrastination Types Explorer

A science-backed platform to help people understand their procrastination patterns and overcome them through targeted workbooks and exercises.

## Project Overview

This project creates a complete ecosystem for procrastination help:

1. **Landing Page + Quiz** - Interactive assessment to identify procrastination type
2. **Type Explorer** - Educational content about the 7 types of procrastinators  
3. **Workbook Sales** - Integration with Gumroad for selling targeted workbooks
4. **Low-Content Workbooks** - Daily exercises tailored to each procrastination type

## The 7 Procrastination Types

Based on research by Ferrari (1991), Chu & Choi (2005), and contemporary cognitive psychology:

1. **Arousal Procrastinators** ("Thrill Seekers") - Perform better under pressure
2. **Avoidant Procrastinators** - Avoid negative emotions like fear of failure
3. **Decisional Procrastinators** - Struggle with making choices and decisions
4. **Perfectionist Procrastinators** - Paralyzed by impossibly high standards
5. **Passive Procrastinators** - Traditional "bad" procrastination from disorganization
6. **Active Procrastinators** - Strategic delay that maintains performance quality
7. **Emotion-Regulation Procrastinators** - Delay to avoid unpleasant emotions

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
- **Type Correlations**: Research-based adjustments (e.g., Arousal ↔ Active: 0.6)
- **Weighted Questions**: Based on discriminant validity from Ferrari (1991), Steel (2007)
- **Consistency Checks**: Reverse-coded questions to detect random responses
- **Confidence Levels**: High/Medium/Low based on score separation and consistency

#### Enhanced Results Display
- **Primary Type**: Main procrastination pattern with likelihood percentage
- **Secondary Type**: Mixed patterns identification for nuanced insights  
- **Visual Indicators**: Color-coded confidence badges and match percentages
- **Research Transparency**: Clear methodology explanation builds credibility

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
│   │   │   └── QuizOption.tsx                  # Quiz option styling
│   │   ├── lib/
│   │   │   ├── quiz-data.ts                    # Original 21-question system
│   │   │   ├── improved-quiz-data.ts           # ✨ NEW: 35-question system
│   │   │   ├── improved-quiz-scoring.ts        # ✨ NEW: Advanced scoring algorithm
│   │   │   └── quiz-utils.ts                   # Updated with dual system support
│   │   └── app/
│   │       ├── page.tsx                        # Main landing page
│   │       ├── layout.tsx                      # App layout with fonts
│   │       ├── quiz/
│   │       │   ├── page.tsx                    # ✨ UPDATED: Enhanced quiz interface
│   │       │   └── results/page.tsx            # ✨ UPDATED: Advanced results display
│   │       └── globals.css                     # Global styles + Virgil font
└── procrastinator-excalidraw/                   # Full Excalidraw integration (backup)
```

### ✨ Recent Additions

#### Quiz Enhancement Files
- **`improved-quiz-scoring.ts`** - Research-based scoring with type correlations
- **`improved-quiz-data.ts`** - 35 behavioral/situational questions  
- **Quiz-Improvement-Summary.md** - Statistical improvements documentation
- **sample-quiz-comparison.md** - Before/after result examples

#### Updated Components  
- **`quiz/page.tsx`** - Now supports both quiz versions with enhanced UI
- **`results/page.tsx`** - Displays confidence levels, secondary types, likelihood percentages
- **`quiz-utils.ts`** - Backward-compatible dual system support

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
Visit `http://localhost:3007`

## Business Model

1. **Free Type Assessment** - Build audience and collect emails
2. **Educational Content** - Establish authority and trust
3. **Targeted Workbooks** - Sell through Gumroad ($9-19 each)
4. **Email Marketing** - Weekly tips and workbook promotions

## Content Strategy

- **Scientific credibility** - Reference peer-reviewed research
- **Personal relevance** - Help users identify their specific patterns  
- **Actionable solutions** - Daily exercises and practical strategies
- **Community building** - Shared struggles and success stories

## Technology Choices

- **Rough.js** - For hand-drawn aesthetic without full Excalidraw complexity
- **Next.js** - Modern React framework for scalability
- **Virgil Font** - Authentic Excalidraw handwritten look
- **Gumroad** - E-commerce for digital workbook sales
- **Tailwind CSS** - Utility-first styling framework

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

See `tasks.md` for detailed development roadmap and feature specifications.