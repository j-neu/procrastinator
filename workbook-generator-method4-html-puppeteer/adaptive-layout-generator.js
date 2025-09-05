const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class AdaptiveLayoutGenerator {
    constructor() {
        this.browser = null;
        this.targetPages = 2; // Can be 2 or 3
        this.pageHeight = 297; // A4 height in mm
        this.margins = 20; // mm
        this.availableHeight = this.pageHeight - (this.margins * 2); // 257mm per page
        this.targetFillRatio = 0.92; // Use 92% of available space
    }

    async init() {
        this.browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    async generateAdaptiveWorkbook(contentData, outputPath) {
        if (!this.browser) await this.init();
        
        console.log('🎯 Generating adaptive layout workbook...');
        
        // Get modular content sections
        const sections = this.createModularSections(contentData);
        
        // Calculate optimal distribution across pages
        const pageDistribution = await this.calculateOptimalDistribution(sections);
        
        // Generate adaptive HTML with dynamic spacing
        const html = this.generateAdaptiveHTML(pageDistribution, contentData);
        
        // Create PDF with optimal settings
        await this.generateAdaptivePDF(html, outputPath);
        
        return {
            success: true,
            pageCount: pageDistribution.length,
            outputPath,
            sectionsPerPage: pageDistribution.map(page => page.length)
        };
    }

    createModularSections(data) {
        return [
            {
                id: 'header',
                type: 'compact',
                priority: 1,
                estimatedHeight: 35, // mm
                content: {
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
                estimatedHeight: 65,
                minHeight: 50,
                maxHeight: 80,
                content: {
                    title: 'Morning Check-in',
                    time: '2 minutes',
                    questions: [
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
            },
            {
                id: 'exercise-intro',
                type: 'compact',
                priority: 1,
                estimatedHeight: 25,
                content: {
                    title: 'Strategic Delay Assessment',
                    time: '15 minutes',
                    purpose: 'Understand when your delay patterns serve you vs. when they might need adjustment'
                }
            },
            {
                id: 'success-analysis',
                type: 'expandable',
                priority: 1,
                estimatedHeight: 80,
                minHeight: 65,
                maxHeight: 100,
                content: {
                    title: 'Recent Success Analysis',
                    time: '7 minutes',
                    description: 'Think of 2 recent tasks where you delayed and achieved good results:',
                    tasks: ['Task 1', 'Task 2'],
                    fields: ['When started', 'Why you waited', 'Quality (1-10)', 'Stress (1-10)']
                }
            },
            {
                id: 'pattern-recognition',
                type: 'expandable',
                priority: 1,
                estimatedHeight: 75,
                minHeight: 60,
                maxHeight: 90,
                content: {
                    title: 'Pattern Recognition',
                    time: '5 minutes',
                    questions: [
                        'What do your most successful delays have in common?',
                        'Time of day you work best',
                        'Optimal pressure level (1-10)',
                        'Task types that benefit from delay'
                    ],
                    checkboxes: [
                        'Complex creative projects',
                        'Analytical/problem-solving tasks',
                        'High-stakes presentations'
                    ]
                }
            },
            {
                id: 'challenge-identification',
                type: 'expandable',
                priority: 1,
                estimatedHeight: 70,
                minHeight: 55,
                maxHeight: 85,
                content: {
                    title: 'Challenge Area Identification',
                    time: '3 minutes',
                    questions: [
                        'Times when delay might not have served you well',
                        'Warning signs you might have missed'
                    ],
                    checkboxes: [
                        'Multiple deadlines converge',
                        'Health/energy is compromised',
                        'External dependencies exist'
                    ]
                }
            },
            {
                id: 'commitment',
                type: 'expandable',
                priority: 1,
                estimatedHeight: 55,
                minHeight: 45,
                maxHeight: 70,
                content: {
                    title: 'Pressure Optimization Commitment',
                    time: '2 minutes',
                    purpose: 'Set intention for strategic improvement rather than elimination',
                    fields: [
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
                estimatedHeight: 50,
                minHeight: 40,
                maxHeight: 65,
                content: {
                    title: 'Evening Reflection',
                    time: '1 minute',
                    fields: [
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
                estimatedHeight: 30,
                content: {
                    title: 'Tomorrow\'s Preparation',
                    text: 'Tomorrow we\'ll dive into understanding your natural energy patterns and how they align with your strategic timing.',
                    quote: 'My tendency to delay isn\'t a flaw to fix—it\'s a strength to optimize.'
                }
            }
        ];
    }

    async calculateOptimalDistribution(sections) {
        const totalEstimatedHeight = sections.reduce((sum, section) => sum + section.estimatedHeight, 0);
        const targetPagesNeeded = Math.ceil(totalEstimatedHeight / (this.availableHeight * this.targetFillRatio));
        
        // Adjust target pages based on content volume
        this.targetPages = Math.max(2, Math.min(3, targetPagesNeeded));
        
        const targetHeightPerPage = this.availableHeight * this.targetFillRatio;
        
        console.log(`📊 Distribution Analysis:`);
        console.log(`   Total content height: ${totalEstimatedHeight}mm`);
        console.log(`   Target pages: ${this.targetPages}`);
        console.log(`   Target height per page: ${targetHeightPerPage}mm`);
        
        return this.distributeContentAcrossPages(sections, targetHeightPerPage);
    }

    distributeContentAcrossPages(sections, targetHeightPerPage) {
        const pages = [];
        let currentPage = [];
        let currentPageHeight = 0;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const wouldExceed = currentPageHeight + section.estimatedHeight > targetHeightPerPage;
            const isLastPage = pages.length === this.targetPages - 1;
            
            if (wouldExceed && currentPage.length > 0 && !isLastPage) {
                // Current page is full, start new page
                pages.push(currentPage);
                currentPage = [section];
                currentPageHeight = section.estimatedHeight;
            } else {
                // Add to current page
                currentPage.push(section);
                currentPageHeight += section.estimatedHeight;
            }
        }
        
        // Add the last page
        if (currentPage.length > 0) {
            pages.push(currentPage);
        }
        
        // Adjust section heights to fill pages optimally
        return this.adjustSectionHeights(pages, targetHeightPerPage);
    }

    adjustSectionHeights(pages, targetHeightPerPage) {
        return pages.map((page, pageIndex) => {
            const currentPageHeight = page.reduce((sum, section) => sum + section.estimatedHeight, 0);
            const extraSpace = targetHeightPerPage - currentPageHeight;
            
            console.log(`📄 Page ${pageIndex + 1}: ${page.length} sections, ${currentPageHeight}mm → ${targetHeightPerPage}mm (${extraSpace > 0 ? '+' : ''}${Math.round(extraSpace)}mm)`);
            
            if (extraSpace > 0) {
                // Distribute extra space among expandable sections
                const expandableSections = page.filter(s => s.type === 'expandable');
                if (expandableSections.length > 0) {
                    const extraSpacePerSection = extraSpace / expandableSections.length;
                    expandableSections.forEach(section => {
                        const newHeight = Math.min(
                            section.maxHeight || section.estimatedHeight * 1.5,
                            section.estimatedHeight + extraSpacePerSection
                        );
                        section.adjustedHeight = newHeight;
                    });
                }
            }
            
            return page;
        });
    }

    generateAdaptiveHTML(pageDistribution, data) {
        const pageHTML = pageDistribution.map((page, pageIndex) => 
            this.generatePageHTML(page, pageIndex + 1, pageDistribution.length)
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
                    line-height: 1.4;
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
                
                /* Section Types */
                .section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                    margin-bottom: 5mm;
                }
                
                .section-compact {
                    padding: 3mm 0;
                }
                
                .section-expandable {
                    padding: 4mm 0;
                }
                
                /* Headers */
                h1 {
                    font-size: 20pt;
                    color: #c77d5c;
                    text-align: center;
                    margin-bottom: 3mm;
                    transform: rotate(-0.3deg);
                    text-shadow: 2px 2px 0px #faf9f6;
                    line-height: 1.2;
                }
                
                .subtitle {
                    font-size: 12pt;
                    color: #718096;
                    text-align: center;
                    margin-bottom: 4mm;
                    font-style: italic;
                }
                
                h2 {
                    font-size: 14pt;
                    color: #9cae9c;
                    margin: 3mm 0;
                    border-bottom: 2px solid #9cae9c;
                    padding-bottom: 1mm;
                    transform: rotate(0.1deg);
                }
                
                h3 {
                    font-size: 12pt;
                    color: #7a8a7a;
                    margin: 2mm 0;
                    transform: rotate(-0.1deg);
                }
                
                /* Content Containers */
                .content-box {
                    border: 2px dashed #b8c5b8;
                    border-radius: 10px;
                    padding: 4mm;
                    margin: 3mm 0;
                    background: #faf9f6;
                    break-inside: avoid;
                    page-break-inside: avoid;
                    position: relative;
                    transform: rotate(0.1deg);
                }
                
                .focus-info {
                    background: #f5f7f0;
                    border: 2px solid #9cae9c;
                    border-radius: 8px;
                    padding: 3mm;
                    margin: 3mm 0;
                    text-align: center;
                    break-inside: avoid;
                }
                
                /* Fillable Elements */
                .fillable-line {
                    border-bottom: 2px dotted #718096;
                    display: inline-block;
                    min-width: 120pt;
                    margin: 0 2pt;
                    height: 16pt;
                    page-break-inside: avoid;
                }
                
                .fillable-area {
                    border: 2px dashed #b8c5b8;
                    border-radius: 8px;
                    padding: 4mm;
                    margin: 3mm 0;
                    background: #faf9f6;
                    min-height: var(--fill-height, 15mm);
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .fillable-area.large {
                    min-height: 25mm;
                }
                
                .fillable-area.small {
                    min-height: 10mm;
                }
                
                /* Two-column layout for tasks */
                .two-column {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4mm;
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .task-column {
                    border: 2px dashed #d4a574;
                    border-radius: 8px;
                    padding: 3mm;
                    background: #fdf8f0;
                    break-inside: avoid;
                }
                
                /* Rating boxes */
                .rating-section {
                    display: flex;
                    gap: 8mm;
                    margin: 2mm 0;
                    align-items: center;
                }
                
                .rating-box {
                    border: 2px solid #9cae9c;
                    width: 20pt;
                    height: 16pt;
                    display: inline-block;
                    background: #f5f7f0;
                    border-radius: 3px;
                }
                
                /* Step numbers */
                .step-number {
                    background: #9cae9c;
                    color: white;
                    border-radius: 50%;
                    width: 24pt;
                    height: 24pt;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 4pt;
                    font-weight: bold;
                    font-size: 10pt;
                    transform: rotate(3deg);
                }
                
                /* Lists and checkboxes */
                ul {
                    padding-left: 16pt;
                    margin: 2mm 0;
                }
                
                li {
                    margin: 1mm 0;
                    font-size: 10pt;
                }
                
                .checkbox-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2mm 6mm;
                    margin: 3mm 0;
                }
                
                .checkbox-item {
                    font-size: 10pt;
                    margin: 1mm 0;
                }
                
                .checkbox-item:before {
                    content: '☐ ';
                    font-size: 12pt;
                    margin-right: 2mm;
                }
                
                /* Time badges */
                .time-badge {
                    background: #e2e8f0;
                    color: #4a5568;
                    padding: 1pt 4pt;
                    border-radius: 8pt;
                    font-size: 9pt;
                    font-weight: bold;
                    margin-left: 3mm;
                }
                
                /* Quote styling */
                .quote-section {
                    background: #f5f7f0;
                    border-left: 4pt solid #9cae9c;
                    padding: 4mm 6mm;
                    margin: 4mm 0;
                    font-style: italic;
                    transform: rotate(-0.15deg);
                    break-inside: avoid;
                }
                
                /* Purpose text */
                .purpose-text {
                    font-size: 10pt;
                    color: #7a8a7a;
                    font-style: italic;
                    margin: 2mm 0;
                }
                
                /* Page footer */
                .page-footer {
                    position: absolute;
                    bottom: 12mm;
                    right: 15mm;
                    font-size: 9pt;
                    color: #b8c5b8;
                    transform: rotate(1deg);
                }
                
                /* Separator */
                .separator {
                    text-align: center;
                    margin: 4mm 0;
                    color: #b8c5b8;
                    font-size: 14pt;
                }
                
                .separator::before {
                    content: '◦ ◦ ◦';
                    transform: rotate(0.1deg);
                }
                
                /* Print settings */
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
            ${pageHTML}
        </body>
        </html>
        `;
    }

    generatePageHTML(sections, pageNumber, totalPages) {
        const sectionsHTML = sections.map(section => this.generateSectionHTML(section)).join('');
        
        return `
        <div class="page">
            ${sectionsHTML}
            <div class="page-footer">Day 1 - Active Procrastinator Workbook - Page ${pageNumber} of ${totalPages}</div>
        </div>
        `;
    }

    generateSectionHTML(section) {
        const heightStyle = section.adjustedHeight ? 
            `style="min-height: ${section.adjustedHeight}mm;"` : '';
            
        switch (section.id) {
            case 'header':
                return `
                <div class="section section-compact">
                    <h1>${section.content.title}</h1>
                    <div class="subtitle">${section.content.subtitle}</div>
                    <div class="focus-info">
                        <strong>Focus:</strong> ${section.content.focus}<br>
                        <strong>Time:</strong> ${section.content.time} | 
                        <strong>Exercise:</strong> ${section.content.exercise}
                    </div>
                    <div class="separator"></div>
                </div>
                `;
                
            case 'morning-checkin':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    
                    <div class="content-box">
                        <strong>Quick Questions:</strong>
                        <ul>
                            ${section.content.questions.map(q => `<li>${q}</li>`).join('')}
                        </ul>
                        
                        <div style="margin-top: 4mm;">
                            ${section.content.fillableFields.map(field => 
                                `<div style="margin: 2mm 0;">
                                    <strong>${field}:</strong> <span class="fillable-line"></span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="separator"></div>
                </div>
                `;
                
            case 'exercise-intro':
                return `
                <div class="section section-compact">
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    <div class="purpose-text">${section.content.purpose}</div>
                </div>
                `;
                
            case 'success-analysis':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h3><span class="step-number">1</span>${section.content.title} <span class="time-badge">${section.content.time}</span></h3>
                    <p>${section.content.description}</p>
                    
                    <div class="two-column">
                        ${section.content.tasks.map(task => `
                            <div class="task-column">
                                <strong>${task}:</strong> <span class="fillable-line"></span><br>
                                ${section.content.fields.map(field => `
                                    <div style="margin: 2mm 0; font-size: 9pt;">
                                        <strong>${field}:</strong> 
                                        ${field.includes('(1-10)') ? 
                                            '<span class="rating-box"></span>' : 
                                            '<span class="fillable-line"></span>'}
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
                `;
                
            case 'pattern-recognition':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h3><span class="step-number">2</span>${section.content.title} <span class="time-badge">${section.content.time}</span></h3>
                    
                    <div class="content-box">
                        <p><strong>${section.content.questions[0]}</strong></p>
                        <div class="fillable-area large"></div>
                        
                        ${section.content.questions.slice(1).map(question => `
                            <div style="margin: 3mm 0;">
                                <strong>${question}:</strong> 
                                ${question.includes('(1-10)') ? 
                                    '<span class="rating-box"></span>' : 
                                    '<span class="fillable-line"></span>'}
                            </div>
                        `).join('')}
                        
                        <p style="margin-top: 4mm;"><strong>When does your strategic delay work BEST?</strong></p>
                        <div class="checkbox-grid">
                            ${section.content.checkboxes.map(item => 
                                `<div class="checkbox-item">${item}</div>`
                            ).join('')}
                            <div class="checkbox-item">Other: <span class="fillable-line"></span></div>
                        </div>
                    </div>
                </div>
                `;
                
            case 'challenge-identification':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h3><span class="step-number">3</span>${section.content.title} <span class="time-badge">${section.content.time}</span></h3>
                    
                    <div class="content-box">
                        ${section.content.questions.map(question => `
                            <p><strong>${question}:</strong></p>
                            <div class="fillable-area"></div>
                        `).join('')}
                        
                        <p><strong>Your delay approach might need adjustment when:</strong></p>
                        <div class="checkbox-grid">
                            ${section.content.checkboxes.map(item => 
                                `<div class="checkbox-item">${item}</div>`
                            ).join('')}
                            <div class="checkbox-item">Other: <span class="fillable-line"></span></div>
                        </div>
                    </div>
                </div>
                `;
                
            case 'commitment':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    <div class="purpose-text">${section.content.purpose}</div>
                    
                    <div class="content-box">
                        ${section.content.fields.map((field, index) => 
                            index === 0 ? 
                                `<p><strong>${field}:</strong></p><div class="fillable-area large"></div>` :
                                `<div style="margin: 3mm 0;"><strong>${field}:</strong> <span class="fillable-line"></span></div>`
                        ).join('')}
                    </div>
                </div>
                `;
                
            case 'reflection':
                return `
                <div class="section section-expandable" ${heightStyle}>
                    <h2>${section.content.title} <span class="time-badge">${section.content.time}</span></h2>
                    
                    <div class="content-box">
                        <p><strong>${section.content.fields[0]}</strong></p>
                        <div class="fillable-area large"></div>
                        
                        ${section.content.fields.slice(1).map(field => `
                            <div style="margin: 3mm 0;">
                                <strong>${field}:</strong> <span class="fillable-line"></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                `;
                
            case 'tomorrow':
                return `
                <div class="section section-compact" ${heightStyle}>
                    <h3>${section.content.title}</h3>
                    <p style="font-size: 10pt; margin: 2mm 0;">${section.content.text}</p>
                    
                    <div class="quote-section">
                        <strong>Strategic Thinking Thought:</strong><br>
                        <em>"${section.content.quote}"</em>
                    </div>
                </div>
                `;
                
            default:
                return `<div class="section">Unknown section: ${section.id}</div>`;
        }
    }

    async generateAdaptivePDF(html, outputPath) {
        const page = await this.browser.newPage();
        
        // Ensure optimal PDF generation settings
        await page.setContent(html, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        // Wait for font loading
        await page.evaluateHandle('document.fonts.ready');
        
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: {
                top: '0mm',
                right: '0mm', 
                bottom: '0mm',
                left: '0mm'
            },
            printBackground: true,
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            scale: 1.0
        });
        
        await page.close();
        console.log(`✅ Generated adaptive PDF: ${outputPath}`);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

async function main() {
    const generator = new AdaptiveLayoutGenerator();
    
    try {
        console.log('🚀 Starting Adaptive Layout Generation...');
        
        const result = await generator.generateAdaptiveWorkbook({
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        }, 'ADAPTIVE-LAYOUT.pdf');
        
        console.log('');
        console.log('🎉 ADAPTIVE LAYOUT GENERATED!');
        console.log(`📄 Pages: ${result.pageCount}`);
        console.log(`📊 Sections per page: ${result.sectionsPerPage.join(', ')}`);
        console.log(`📁 Output: ${result.outputPath}`);
        console.log('');
        console.log('✅ Key Features:');
        console.log('   • Intelligent page break handling');
        console.log('   • Dynamic section height adjustment');
        console.log('   • Optimal space utilization');
        console.log('   • No fillable elements cut by page breaks');
        console.log('   • Even content distribution across pages');
        
    } catch (error) {
        console.error('❌ Adaptive layout generation failed:', error);
        throw error;
    } finally {
        await generator.close();
    }
}

module.exports = AdaptiveLayoutGenerator;

if (require.main === module) {
    main();
}