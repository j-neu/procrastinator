# 2-Page Layout Guidelines for Workbook Generation

## Overview
Each daily exercise must fit exactly 2 PDF pages with consistent formatting and proper page break handling.

## Layout Requirements

### 📏 Page Specifications
- **Page Size**: 8.5" x 11" Letter format
- **Fixed Height**: Exactly 11 inches per page (no min-height)
- **Margins**: 0.75" on all sides
- **Pages Per Day**: Exactly 2 pages (no more, no less)
- **Total Workbook**: 31 days = 62 pages per workbook

### 🚫 Page Break Rules (Critical)

#### Never Break These Elements:
1. **Text boxes** (`.fillable-box`)
2. **Fillable lines** (`.fillable-line`) 
3. **Exercise sections** (`.exercise-section`)
4. **Commitment boxes** (`.commitment-box`)
5. **Reflection sections** (`.reflection-section`)
6. **Hand-drawn borders** (`.hand-drawn-border`)
7. **Step sections** (`.step-section`)

#### CSS Implementation:
```css
.exercise-section,
.commitment-box,
.reflection-section,
.hand-drawn-border,
.step-section {
    page-break-inside: avoid;
    break-inside: avoid;
}

.fillable-box,
.fillable-line {
    page-break-inside: avoid;
    break-inside: avoid;
}
```

## Content Sizing Strategy

### Priority Handling (When Content Doesn't Fit):

#### 1. **Priority 1: Preserve Box Integrity**
- Never split fillable boxes across pages
- Never split text input areas
- Keep related form elements together

#### 2. **Priority 2: Move Complete Sections**
- If a section won't fit completely, move entire section to next page
- Maintain section cohesion and readability
- Keep step numbers with their content

#### 3. **Priority 3: Adjust White Space**
- Reduce margins between sections
- Compress vertical spacing
- Optimize padding to fit 2-page constraint

#### 4. **Priority 4: Smart Section Splitting**
- Only as last resort, split sections cleanly
- Close current box properly
- Start new box on next page with clear continuation
- Add "continued from previous page" notation if needed

### Content Distribution Guidelines

#### Page 1 Content (Recommended):
- Title and subtitle
- Daily focus box
- Morning check-in section
- Main exercise introduction
- First 1-2 steps of main exercise

#### Page 2 Content (Recommended):
- Remaining exercise steps
- Commitment section
- Evening reflection
- Tomorrow's preparation
- Courage quote

### Flexible Spacing Classes

#### CSS Variables for Adjustment:
```css
:root {
    --section-spacing: 25px;     /* Adjustable between 15-35px */
    --box-padding: 20px;         /* Adjustable between 15-25px */
    --separator-margin: 25px;    /* Adjustable between 15-35px */
}

/* Responsive spacing for content overflow */
.compact-spacing {
    --section-spacing: 15px;
    --box-padding: 15px;
    --separator-margin: 15px;
}

.standard-spacing {
    --section-spacing: 25px;
    --box-padding: 20px;
    --separator-margin: 25px;
}

.generous-spacing {
    --section-spacing: 35px;
    --box-padding: 25px;
    --separator-margin: 35px;
}
```

## Implementation Checklist

### ✅ Template Design Phase:
- [ ] Measure content height for each section
- [ ] Test with longest content day (usually Day 1 or complex exercises)
- [ ] Verify page breaks don't cut boxes
- [ ] Ensure consistent 2-page layout across all days

### ✅ Generation Phase:
- [ ] Monitor PDF page count (must be 2 per day)
- [ ] Check for orphaned text or split boxes
- [ ] Verify fillable elements remain intact
- [ ] Test print quality on physical paper

### ✅ Quality Assurance:
- [ ] Print test random days to verify spacing
- [ ] Check that text boxes are usable when printed
- [ ] Ensure no content is cut off at page edges
- [ ] Verify consistent visual hierarchy across pages

## Common Issues & Solutions

### Issue: Content Overflows to 3rd Page
**Solutions:**
1. Reduce section margins by 5-10px
2. Compress fillable box padding
3. Move last section to page 2
4. Split large exercise into sub-steps

### Issue: Content Too Short (Under 2 Pages)
**Solutions:**
1. Increase white space between sections
2. Add more fillable lines or larger text boxes
3. Include additional reflection prompts
4. Expand tomorrow's preparation section

### Issue: Text Box Split Across Pages
**Solutions:**
1. Add `page-break-inside: avoid` to parent container
2. Move entire section to next page
3. Create separate boxes for each page
4. Reduce box size to fit on single page

## Validation Process

### Automated Checks:
1. PDF page count validation (must equal 2)
2. CSS break-inside property verification
3. Content height measurement
4. Margin consistency check

### Manual Verification:
1. Visual inspection of each page break
2. Print test of sample days
3. User experience testing with physical worksheets
4. Brand consistency review

This ensures every workbook maintains professional quality with consistent 2-page daily layouts that work perfectly when printed and bound.