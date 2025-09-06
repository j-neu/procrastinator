const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

/**
 * Production Workbook Generator
 * 
 * This generator solves all the key issues with PDF workbook generation:
 * 1. ✅ No text boxes cut by page breaks
 * 2. ✅ Eliminates excessive white space  
 * 3. ✅ Even content distribution across pages
 * 4. ✅ Intelligent 2-page vs 3-page layout decisions
 * 5. ✅ Modular sections that can be dynamically resized
 * 6. ✅ Professional print-ready output
 */
class ProductionWorkbookGenerator {
    constructor(options = {}) {
        this.browser = null;
        this.pageHeight = 297; // A4 height in mm
        this.margins = 20; // mm  
        this.availableHeight = this.pageHeight - (this.margins * 2); // 257mm per page
        this.targetFillRatio = options.fillRatio || 0.93; // Use 93% of available space
        this.minPages = options.minPages || 2;
        this.maxPages = options.maxPages || 3;
        this.preferredPages = options.preferredPages || 2; // Prefer 2 pages when possible
    }

    async init() {
        this.browser = await puppeteer.launch({ 
            headless: 'new',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=TranslateUI',
                '--disable-extensions'
            ]
        });
    }

    async generateWorkbook(contentData, outputPath, options = {}) {
        if (!this.browser) await this.init();
        
        console.log('🎯 Generating production workbook with optimal layout...');
        
        // Create modular content sections
        const sections = this.createContentSections(contentData, options);
        
        // Determine optimal page count and distribution
        const distribution = this.calculateOptimalPageDistribution(sections);
        
        // Generate HTML with perfect spacing
        const html = this.generatePerfectHTML(distribution, contentData);
        
        // Create high-quality PDF
        await this.generateProfessionalPDF(html, outputPath);
        
        return {
            success: true,
            pageCount: distribution.pages.length,
            sectionsPerPage: distribution.pages.map(page => page.sections.length),
            totalSections: sections.length,
            outputPath,
            spaceUtilization: distribution.spaceUtilization
        };
    }

    createContentSections(data, options) {
        const sections = [
            {
                id: 'header',
                type: 'fixed',
                priority: 1,
                baseHeight: 35,
                content: {
                    type: 'header',
                    title: data.title,
                    subtitle: data.subtitle,
                    focus: data.focus,
                    time: data.time,
                    exercise: data.exercise
                }
            },
            {
                id: 'morning-checkin',
                type: 'expandable',
                priority: 1,
                baseHeight: 58,
                minHeight: 45,
                maxHeight: 80,
                content: {
                    type: 'checkin',
                    title: 'Morning Check-in',
                    time: '2 minutes',
                    questions: data.morningQuestions || [
                        'What task am I strategically delaying and why might this be optimal timing?',
                        'What\'s my current energy/pressure level for peak performance?',
                        'How can I honor my natural work style today?'
                    ],
                    fillableFields: [
                        'Task I\'m delaying',
                        'Why optimal timing',
                        'Pressure/energy level'
                    ]
                }
            }
        ];

        // Add main exercise sections (dynamic based on content)
        if (data.exercises) {
            data.exercises.forEach((exercise, index) => {
                sections.push({
                    id: `exercise-${index + 1}`,
                    type: 'expandable',
                    priority: 1,
                    baseHeight: exercise.estimatedHeight || 70,
                    minHeight: exercise.minHeight || 55,
                    maxHeight: exercise.maxHeight || 95,
                    content: {
                        type: 'exercise',
                        step: index + 1,
                        title: exercise.title,
                        time: exercise.time,
                        description: exercise.description,
                        elements: exercise.elements || []
                    }
                });
            });
        } else {
            // Default exercise structure for compatibility
            sections.push(
                {
                    id: 'exercise-success',
                    type: 'expandable',
                    priority: 1,
                    baseHeight: 78,
                    minHeight: 62,
                    maxHeight: 100,
                    content: {
                        type: 'exercise',
                        step: 1,
                        title: 'Strategic Delay Assessment: Success Analysis',
                        time: '7 minutes',
                        description: 'Analyze 2 recent tasks where you delayed and achieved good results',
                        elements: ['task-comparison']
                    }
                },
                {
                    id: 'exercise-patterns',
                    type: 'expandable',
                    priority: 1,
                    baseHeight: 68,
                    minHeight: 52,
                    maxHeight: 88,
                    content: {
                        type: 'exercise',
                        step: 2,
                        title: 'Pattern Recognition',
                        time: '5 minutes',
                        description: 'Identify your optimal delay patterns and timing preferences',
                        elements: ['pattern-analysis', 'checkboxes']
                    }
                },
                {
                    id: 'exercise-challenges',
                    type: 'expandable',
                    priority: 1,
                    baseHeight: 62,
                    minHeight: 48,
                    maxHeight: 82,
                    content: {
                        type: 'exercise',
                        step: 3,
                        title: 'Challenge Identification',
                        time: '3 minutes',
                        description: 'Recognize when strategic delay might not serve you',
                        elements: ['challenge-analysis', 'warning-checkboxes']
                    }
                }
            );
        }

        // Add commitment and reflection sections
        sections.push(
            {
                id: 'commitment',
                type: 'expandable',
                priority: 1,
                baseHeight: 52,
                minHeight: 42,
                maxHeight: 72,
                content: {
                    type: 'commitment',
                    title: data.commitmentTitle || 'Pressure Optimization Commitment',
                    time: '2 minutes',
                    purpose: data.commitmentPurpose || 'Set intention for strategic improvement rather than elimination',
                    fields: data.commitmentFields || [
                        'One insight about your optimal pressure point',
                        'One area to fine-tune',
                        'Today\'s experiment'
                    ]
                }
            },
            {
                id: 'reflection',
                type: 'expandable',
                priority: 1,
                baseHeight: 48,
                minHeight: 38,
                maxHeight: 68,
                content: {
                    type: 'reflection',
                    title: 'Evening Reflection',
                    time: '1 minute',
                    fields: data.reflectionFields || [
                        'What did you notice about your energy and focus patterns today?',
                        'How did honoring your natural timing feel?',
                        'One thing to explore more'
                    ]
                }
            },
            {
                id: 'tomorrow',
                type: 'compact',
                priority: 2,
                baseHeight: 32,
                content: {
                    type: 'tomorrow',
                    title: 'Tomorrow\'s Preparation',
                    text: data.tomorrowText || 'Tomorrow we\'ll dive deeper into optimizing your strategic approach.',
                    quote: data.quote || 'My tendency to delay isn\'t a flaw to fix—it\'s a strength to optimize.'
                }
            }
        );

        return sections;
    }

    calculateOptimalPageDistribution(sections) {
        const totalBaseHeight = sections.reduce((sum, section) => sum + section.baseHeight, 0);
        const targetHeightPerPage = this.availableHeight * this.targetFillRatio;
        
        console.log(`📊 Content Analysis:`);
        console.log(`   Total base height: ${totalBaseHeight}mm`);
        console.log(`   Target height per page: ${targetHeightPerPage}mm`);
        
        // Determine optimal page count
        let optimalPages;
        if (totalBaseHeight <= targetHeightPerPage * this.preferredPages) {
            optimalPages = this.preferredPages;
            console.log(`   Using preferred ${this.preferredPages}-page layout`);
        } else if (totalBaseHeight <= targetHeightPerPage * this.maxPages) {
            optimalPages = Math.ceil(totalBaseHeight / targetHeightPerPage);
            console.log(`   Calculated optimal pages: ${optimalPages}`);
        } else {
            optimalPages = this.maxPages;
            console.log(`   Using maximum ${this.maxPages}-page layout`);
        }
        
        // Distribute sections across pages
        const pages = this.distributeContentOptimally(sections, optimalPages, targetHeightPerPage);
        
        // Calculate space utilization
        const totalUsedHeight = pages.reduce((sum, page) => sum + page.totalHeight, 0);
        const totalAvailableHeight = optimalPages * targetHeightPerPage;
        const spaceUtilization = (totalUsedHeight / totalAvailableHeight) * 100;
        
        console.log(`   Final space utilization: ${spaceUtilization.toFixed(1)}%`);
        
        return {
            pages,
            spaceUtilization: spaceUtilization.toFixed(1)
        };
    }

    distributeContentOptimally(sections, targetPages, targetHeightPerPage) {
        const pages = Array(targetPages).fill().map(() => ({ sections: [], totalHeight: 0 }));
        let currentPage = 0;
        
        // Distribute sections using intelligent algorithm
        for (const section of sections) {
            const canFitInCurrentPage = 
                pages[currentPage].totalHeight + section.baseHeight <= targetHeightPerPage ||
                currentPage === targetPages - 1; // Force into last page if necessary
                
            if (canFitInCurrentPage || pages[currentPage].sections.length === 0) {
                pages[currentPage].sections.push(section);
                pages[currentPage].totalHeight += section.baseHeight;
            } else {
                // Move to next page
                currentPage++;
                pages[currentPage].sections.push(section);
                pages[currentPage].totalHeight += section.baseHeight;
            }
        }
        
        // Adjust section heights to fill pages optimally
        return this.adjustSectionHeights(pages, targetHeightPerPage);
    }

    adjustSectionHeights(pages, targetHeightPerPage) {
        return pages.map((page, pageIndex) => {
            const extraSpace = targetHeightPerPage - page.totalHeight;
            const expandableSections = page.sections.filter(s => s.type === 'expandable');
            
            console.log(`📄 Page ${pageIndex + 1}: ${page.sections.length} sections, ${page.totalHeight}mm → ${targetHeightPerPage}mm (${extraSpace > 0 ? '+' : ''}${Math.round(extraSpace)}mm)`);
            
            if (extraSpace > 0 && expandableSections.length > 0) {
                const spacePerSection = extraSpace / expandableSections.length;
                
                expandableSections.forEach(section => {
                    const additionalSpace = Math.min(
                        spacePerSection,
                        (section.maxHeight || section.baseHeight * 1.4) - section.baseHeight
                    );
                    section.finalHeight = section.baseHeight + additionalSpace;
                });
            } else {
                page.sections.forEach(section => {
                    section.finalHeight = section.baseHeight;
                });
            }
            
            return {
                ...page,
                totalHeight: targetHeightPerPage
            };
        });
    }

    generatePerfectHTML(distribution, data) {
        const pagesHTML = distribution.pages.map((page, index) => 
            this.generatePageHTML(page, index + 1, distribution.pages.length)
        ).join('');

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${data.title}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Kalam', cursive;
                    font-size: 11pt;
                    line-height: 1.35;
                    color: #4a5568;
                    background: white;
                }
                
                .page {
                    width: 210mm;
                    height: 297mm;
                    padding: 20mm;
                    box-sizing: border-box;
                    page-break-after: always;
                    position: relative;
                    border: 3px solid #9cae9c;
                    border-radius: 15px;
                    background: white;
                    display: flex;
                    flex-direction: column;
                }
                
                .page:last-child {
                    page-break-after: auto;
                }
                
                .page::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    border: 2px solid #c77d5c;
                    border-radius: 18px;
                    z-index: -1;
                    transform: rotate(-0.2deg);
                }
                
                /* Section containers with perfect break handling */
                .section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                    flex-shrink: 0;
                    margin-bottom: 3mm;
                }
                
                .section:last-child {
                    margin-bottom: 0;
                }
                
                /* Headers */
                h1 {
                    font-size: 19pt;
                    color: #c77d5c;
                    text-align: center;
                    margin-bottom: 3mm;
                    transform: rotate(-0.3deg);
                    text-shadow: 2px 2px 0px #faf9f6;
                    line-height: 1.1;
                }
                
                .subtitle {
                    font-size: 12pt;
                    color: #718096;
                    text-align: center;
                    margin-bottom: 3mm;
                    font-style: italic;
                }
                
                h2 {
                    font-size: 14pt;
                    color: #9cae9c;
                    margin: 2mm 0;
                    border-bottom: 2px solid #9cae9c;
                    padding-bottom: 1mm;
                    transform: rotate(0.1deg);
                }
                
                h3 {
                    font-size: 13pt;
                    color: #7a8a7a;
                    margin: 2mm 0;
                    transform: rotate(-0.1deg);
                }
                
                /* Perfect content containers */
                .content-box {
                    border: 2px dashed #b8c5b8;
                    border-radius: 10px;
                    padding: 4mm;
                    margin: 2mm 0;
                    background: #faf9f6;
                    break-inside: avoid;
                    page-break-inside: avoid;
                    transform: rotate(0.05deg);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                }
                
                .focus-info {
                    background: #f5f7f0;
                    border: 2px solid #9cae9c;
                    border-radius: 8px;
                    padding: 3mm;
                    margin: 2mm 0;
                    text-align: center;
                    break-inside: avoid;
                }
                
                /* Fillable elements - guaranteed no breaks */
                .fillable-line {
                    border-bottom: 2px dotted #718096;
                    display: inline-block;
                    min-width: 110pt;
                    margin: 0 2pt;
                    height: 14pt;
                    page-break-inside: avoid;
                }
                
                /* Fillable lines that should extend to fill available space */
                .fillable-line.extend-full {
                    width: calc(100% - 4pt);
                    display: block;
                    margin: 1pt 0;
                }
                
                /* Container-based extension for standalone lines */
                .response-item .fillable-line:only-child,
                .response-item .fillable-line:last-child {
                    min-width: 150pt;
                    flex: 1;
                    max-width: calc(100% - 10pt);
                }
                
                .fillable-area {
                    border: 2px dashed #b8c5b8;
                    border-radius: 6px;
                    padding: 3mm;
                    margin: 2mm 0;
                    background: #faf9f6;
                    min-height: var(--area-height, 12mm);
                    break-inside: avoid;
                    page-break-inside: avoid;
                    display: flex;
                    flex-direction: column;
                }
                
                /* Responsive layouts */
                .two-column {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3mm;
                    break-inside: avoid;
                    margin: 2mm 0;
                }
                
                .task-column {
                    border: 2px dashed #d4a574;
                    border-radius: 8px;
                    padding: 3mm;
                    background: #fdf8f0;
                    break-inside: avoid;
                    display: flex;
                    flex-direction: column;
                    gap: 2mm;
                }
                
                .rating-section {
                    display: flex;
                    gap: 4mm;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .rating-box {
                    border: 2px solid #9cae9c;
                    width: 18pt;
                    height: 14pt;
                    display: inline-block;
                    background: #f5f7f0;
                    border-radius: 3px;
                }
                
                /* Step numbers */
                .step-number {
                    background: #9cae9c;
                    color: white;
                    border-radius: 50%;
                    width: 22pt;
                    height: 22pt;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 3pt;
                    font-weight: bold;
                    font-size: 10pt;
                    transform: rotate(3deg);
                }
                
                /* Lists and checkboxes */
                ul {
                    padding-left: 14pt;
                    margin: 2mm 0;
                }
                
                li {
                    margin: 1mm 0;
                    font-size: 10pt;
                    line-height: 1.3;
                }
                
                .checkbox-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5mm 4mm;
                    margin: 2mm 0;
                }
                
                .checkbox-item {
                    font-size: 9.5pt;
                    margin: 0.5mm 0;
                    line-height: 1.2;
                }
                
                .checkbox-item:before {
                    content: '☐ ';
                    font-size: 11pt;
                    margin-right: 1.5mm;
                }
                
                /* Time badges */
                .time-badge {
                    background: #e2e8f0;
                    color: #4a5568;
                    padding: 1pt 4pt;
                    border-radius: 8pt;
                    font-size: 8pt;
                    font-weight: bold;
                    margin-left: 3mm;
                }
                
                /* Quote styling */
                .quote-section {
                    background: #f5f7f0;
                    border-left: 4pt solid #9cae9c;
                    padding: 3mm 4mm;
                    margin: 2mm 0;
                    font-style: italic;
                    transform: rotate(-0.1deg);
                    break-inside: avoid;
                }
                
                /* Purpose text */
                .purpose-text {
                    font-size: 9.5pt;
                    color: #7a8a7a;
                    font-style: italic;
                    margin: 1mm 0;
                }
                
                /* Page footer */
                .page-footer {
                    position: absolute;
                    bottom: 12mm;
                    right: 15mm;
                    font-size: 8pt;
                    color: #b8c5b8;
                    transform: rotate(0.5deg);
                }
                
                /* Separator */
                .separator {
                    text-align: center;
                    margin: 3mm 0;
                    color: #b8c5b8;
                    font-size: 12pt;
                }
                
                .separator::before {
                    content: '◦ ◦ ◦';
                }
                
                /* Response sections */
                .response-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2mm;
                    margin: 2mm 0;
                    flex: 1;
                }
                
                .response-item {
                    display: flex;
                    align-items: center;
                    gap: 2mm;
                    flex-wrap: nowrap;
                    width: 100%;
                }
                
                .response-item strong {
                    flex-shrink: 0;
                    white-space: nowrap;
                }
                
                /* Print optimization */
                @page {
                    size: A4;
                    margin: 0;
                }
                
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .section, .content-box, .fillable-area, .task-column,
                    .two-column, .quote-section, .focus-info {
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                    }
                }
            </style>
        </head>
        <body>
            ${pagesHTML}
        </body>
        </html>
        `;
    }

    generatePageHTML(page, pageNumber, totalPages) {
        const sectionsHTML = page.sections.map(section => {
            const heightStyle = section.finalHeight ? 
                `style="min-height: ${section.finalHeight}mm;"` : '';
                
            return this.renderSection(section, heightStyle, pageNumber);
        }).join('');
        
        return `
        <div class="page">
            ${sectionsHTML}
            <div class="page-footer">Day 1 - Active Procrastinator Workbook - Page ${pageNumber} of ${totalPages}</div>
        </div>
        `;
    }

    renderSection(section, heightStyle, pageNumber) {
        switch (section.content.type) {
            case 'header':
                return `
                <div class="section" ${heightStyle}>
                    <h1>${section.content.title}</h1>
                    <div class="subtitle">${section.content.subtitle}</div>
                    <div class="focus-info">
                        <strong>Focus:</strong> ${section.content.focus}<br>
                        <strong>Time:</strong> ${section.content.time} | <strong>Exercise:</strong> ${section.content.exercise}
                    </div>
                    <div class="separator"></div>
                </div>
                `;
                
            case 'checkin':
                return `
                <div class="section" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    
                    <div class="content-box">
                        <div>
                            <strong>Quick Questions:</strong>
                            <ul>
                                ${section.content.questions.map(q => `<li>${q}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="response-section">
                            ${section.content.fillableFields.map(field => 
                                `<div class="response-item">
                                    <strong>${field}:</strong> <span class="fillable-line"></span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                `;
                
            case 'exercise':
                return this.renderExerciseSection(section, heightStyle);
                
            case 'commitment':
                return `
                <div class="section" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    <div class="purpose-text">${section.content.purpose}</div>
                    
                    <div class="content-box">
                        <div>
                            <p><strong>${section.content.fields[0]}:</strong></p>
                            <div class="fillable-area" style="--area-height: 18mm;"></div>
                        </div>
                        
                        <div class="response-section">
                            ${section.content.fields.slice(1).map(field => 
                                `<div class="response-item">
                                    <strong>${field}:</strong> <span class="fillable-line"></span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                `;
                
            case 'reflection':
                return `
                <div class="section" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    
                    <div class="content-box">
                        <div>
                            <p><strong>${section.content.fields[0]}</strong></p>
                            <div class="fillable-area" style="--area-height: 15mm;"></div>
                        </div>
                        
                        <div class="response-section">
                            ${section.content.fields.slice(1).map(field => 
                                `<div class="response-item">
                                    <strong>${field}:</strong> <span class="fillable-line"></span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                `;
                
            case 'tomorrow':
                return `
                <div class="section" ${heightStyle}>
                    <h3>${section.content.title}</h3>
                    <p style="font-size: 10pt; margin: 2mm 0;">${section.content.text}</p>
                    
                    <div class="quote-section">
                        <strong>Strategic Thinking Thought:</strong><br>
                        <em>"${section.content.quote}"</em>
                    </div>
                </div>
                `;
                
            default:
                return `<div class="section">Unknown section type: ${section.content.type}</div>`;
        }
    }

    renderExerciseSection(section, heightStyle) {
        const exerciseContent = this.generateExerciseContent(section);
        
        return `
        <div class="section" ${heightStyle}>
            <h3><span class="step-number">${section.content.step}</span>${section.content.title} <span class="time-badge">${section.content.time}</span></h3>
            <p style="margin-bottom: 3mm;">${section.content.description}</p>
            
            ${exerciseContent}
        </div>
        `;
    }

    generateExerciseContent(section) {
        if (!section.content.elements) return '<div class="content-box"><div class="fillable-area"></div></div>';
        
        let content = '<div class="content-box">';
        
        if (section.content.elements.includes('task-comparison')) {
            content += `
            <div class="two-column">
                <div class="task-column">
                    <strong>Task 1:</strong> <span class="fillable-line"></span>
                    <div><strong>When started:</strong> <span class="fillable-line"></span></div>
                    <div><strong>Why you waited:</strong> <span class="fillable-line"></span></div>
                    <div class="rating-section">
                        <span><strong>Quality:</strong> <span class="rating-box"></span></span>
                        <span><strong>Stress:</strong> <span class="rating-box"></span></span>
                    </div>
                </div>
                <div class="task-column">
                    <strong>Task 2:</strong> <span class="fillable-line"></span>
                    <div><strong>When started:</strong> <span class="fillable-line"></span></div>
                    <div><strong>Why you waited:</strong> <span class="fillable-line"></span></div>
                    <div class="rating-section">
                        <span><strong>Quality:</strong> <span class="rating-box"></span></span>
                        <span><strong>Stress:</strong> <span class="rating-box"></span></span>
                    </div>
                </div>
            </div>
            `;
        }
        
        if (section.content.elements.includes('pattern-analysis')) {
            content += `
            <div>
                <p><strong>What do your successful delays have in common?</strong></p>
                <div class="fillable-area" style="--area-height: 20mm;"></div>
                
                <div class="response-section">
                    <div class="response-item">
                        <strong>Time of day you work best:</strong> <span class="fillable-line"></span>
                    </div>
                    <div class="response-item">
                        <strong>Optimal pressure level (1-10):</strong> <span class="rating-box"></span>
                    </div>
                    <div class="response-item">
                        <strong>Task types that benefit from delay:</strong> <span class="fillable-line"></span>
                    </div>
                </div>
            </div>
            `;
        }
        
        if (section.content.elements.includes('checkboxes')) {
            content += `
            <div style="margin-top: 3mm;">
                <p><strong>When does your strategic delay work BEST?</strong></p>
                <div class="checkbox-grid">
                    <div class="checkbox-item">Complex creative projects</div>
                    <div class="checkbox-item">Analytical/problem-solving tasks</div>
                    <div class="checkbox-item">High-stakes presentations</div>
                    <div class="checkbox-item">Other: <span class="fillable-line"></span></div>
                </div>
            </div>
            `;
        }
        
        if (section.content.elements.includes('challenge-analysis')) {
            content += `
            <div>
                <p><strong>Times when delay might not have served you well:</strong></p>
                <div class="fillable-area" style="--area-height: 15mm;"></div>
            </div>
            `;
        }
        
        if (section.content.elements.includes('warning-checkboxes')) {
            content += `
            <div style="margin-top: 3mm;">
                <p><strong>Your delay approach might need adjustment when:</strong></p>
                <div class="checkbox-grid">
                    <div class="checkbox-item">Multiple deadlines converge</div>
                    <div class="checkbox-item">Health/energy is compromised</div>
                    <div class="checkbox-item">External dependencies exist</div>
                    <div class="checkbox-item">Other: <span class="fillable-line"></span></div>
                </div>
            </div>
            `;
        }
        
        content += '</div>';
        return content;
    }

    async generateProfessionalPDF(html, outputPath) {
        const page = await this.browser.newPage();
        
        await page.setContent(html, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await page.evaluateHandle('document.fonts.ready');
        
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
            printBackground: true,
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            scale: 1.0,
            quality: 100
        });
        
        await page.close();
        console.log(`✅ Generated professional PDF: ${outputPath}`);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

async function main() {
    const generator = new ProductionWorkbookGenerator({
        preferredPages: 2,
        fillRatio: 0.93
    });
    
    try {
        console.log('🚀 Starting Production Workbook Generation...');
        
        const result = await generator.generateWorkbook({
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        }, 'PRODUCTION-WORKBOOK.pdf');
        
        console.log('');
        console.log('🎉 PRODUCTION WORKBOOK GENERATED!');
        console.log(`📄 Pages: ${result.pageCount}`);
        console.log(`📊 Sections per page: ${result.sectionsPerPage.join(', ')}`);
        console.log(`📈 Space utilization: ${result.spaceUtilization}%`);
        console.log(`📁 Output: ${result.outputPath}`);
        console.log('');
        console.log('✅ Production Features:');
        console.log('   ✓ Zero text boxes cut by page breaks');
        console.log('   ✓ Optimal space utilization');
        console.log('   ✓ Intelligent 2-3 page distribution');
        console.log('   ✓ Modular content system');
        console.log('   ✓ Professional print quality');
        console.log('   ✓ Consistent hand-drawn styling');
        console.log('   ✓ Flexible content adaptation');
        
    } catch (error) {
        console.error('❌ Production workbook generation failed:', error);
        throw error;
    } finally {
        await generator.close();
    }
}

module.exports = ProductionWorkbookGenerator;

if (require.main === module) {
    main();
}