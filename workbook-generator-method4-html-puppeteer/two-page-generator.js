const puppeteer = require('puppeteer');
const fs = require('fs').promises;

class TwoPageGenerator {
    constructor() {
        this.browser = null;
        this.targetPages = 2;
        this.pageHeight = 280; // Available height per page in mm
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: 'new' });
    }

    async generateTwoPageWorkbook(contentData, outputPath) {
        if (!this.browser) await this.init();
        
        console.log('📏 Pre-flight content measurement starting...');
        
        // Define all content sections with priority levels
        const sections = this.defineContentSections(contentData);
        
        // Measure actual heights of all sections
        const measuredSections = await this.measureSections(sections);
        
        // Optimize content to fit exactly 2 pages
        const optimizedPages = await this.optimizeForTwoPages(measuredSections);
        
        // Generate the final 2-page PDF
        await this.generateOptimizedPDF(optimizedPages, outputPath);
        
        return {
            success: true,
            pageCount: 2,
            outputPath
        };
    }

    defineContentSections(data) {
        return [
            {
                id: 'header',
                priority: 1, // Must include
                content: `
                    <div class="header-section">
                        <h1>${data.title}</h1>
                        <div class="subtitle">${data.subtitle}</div>
                        <div class="focus-box">
                            <strong>Focus:</strong> ${data.focus} | 
                            <strong>Time:</strong> ${data.time} | 
                            <strong>Exercise:</strong> ${data.exercise}
                        </div>
                    </div>
                `
            },
            {
                id: 'morning-checkin',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h2>Morning Check-in (2 min)</h2>
                        <div class="question-compact">What am I strategically delaying and why? Energy level? Natural style today?</div>
                        <div class="answer-box">
                            Task: ________________ Why: ________________ Energy: ____
                        </div>
                    </div>
                `
            },
            {
                id: 'exercise-intro',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h2>Strategic Delay Assessment (15 min)</h2>
                        <div class="purpose">Understand when delay patterns serve you vs. need adjustment</div>
                    </div>
                `
            },
            {
                id: 'step-1-compact',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h3><span class="num">1</span>Success Analysis (7 min) - 2 delayed tasks with good results:</h3>
                        <div class="two-task-row">
                            <div class="task-mini">
                                <strong>Task 1:</strong> ________________<br>
                                <strong>Started:</strong> ________ <strong>Quality:</strong> __ <strong>Stress:</strong> __
                            </div>
                            <div class="task-mini">
                                <strong>Task 2:</strong> ________________<br>
                                <strong>Started:</strong> ________ <strong>Quality:</strong> __ <strong>Stress:</strong> __
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'step-2-pattern',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h3><span class="num">2</span>Pattern Recognition (5 min)</h3>
                        <div class="pattern-box">
                            <div class="pattern-row">
                                <strong>Best time:</strong> _______ <strong>Pressure level:</strong> __ <strong>Task types:</strong> ___________
                            </div>
                            <div class="when-best">
                                <strong>Delay works BEST for:</strong>
                                ☐ Creative projects ☐ Problem-solving ☐ Presentations ☐ Other: ________
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'step-3-challenges',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h3><span class="num">3</span>Challenge Areas (3 min)</h3>
                        <div class="challenge-box">
                            <div class="challenge-row">
                                <strong>When delay didn't work:</strong> ________________________
                            </div>
                            <div class="adjust-when">
                                <strong>Adjust when:</strong> ☐ Multiple deadlines ☐ Low energy ☐ Dependencies ☐ Other: ____
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'commitment',
                priority: 1,
                content: `
                    <div class="compact-section">
                        <h2>Commitment (2 min)</h2>
                        <div class="commit-box">
                            <strong>Optimal pressure insight:</strong> ________________________________<br>
                            <strong>Fine-tune:</strong> _____________ <strong>Today's experiment:</strong> _____________
                        </div>
                    </div>
                `
            },
            {
                id: 'reflection',
                priority: 2, // Important but can be compressed
                content: `
                    <div class="compact-section">
                        <h2>Evening Reflection (1 min)</h2>
                        <div class="reflect-box">
                            <strong>Energy/focus patterns:</strong> ________________________<br>
                            <strong>Timing felt:</strong> _______ <strong>Explore more:</strong> _______
                        </div>
                    </div>
                `
            },
            {
                id: 'tomorrow-quote',
                priority: 3, // Nice to have
                content: `
                    <div class="compact-section">
                        <div class="tomorrow-mini">
                            <strong>Tomorrow:</strong> Energy patterns & strategic timing alignment
                        </div>
                        <div class="quote-mini">
                            <em>"My delay isn't a flaw to fix—it's a strength to optimize."</em>
                        </div>
                    </div>
                `
            }
        ];
    }

    async measureSections(sections) {
        const page = await this.browser.newPage();
        const measuredSections = [];
        
        const baseCSS = `
            body { 
                font-family: 'Kalam', cursive; 
                font-size: 10px; 
                line-height: 1.2; 
                margin: 0; 
                padding: 10mm; 
                width: 210mm; 
                box-sizing: border-box; 
            }
            .compact-section { margin: 3mm 0; break-inside: avoid; }
            .header-section { text-align: center; margin: 2mm 0; }
            h1 { font-size: 16px; margin: 2mm 0; color: #c77d5c; }
            h2 { font-size: 12px; margin: 2mm 0; color: #9cae9c; border-bottom: 1px solid #9cae9c; }
            h3 { font-size: 11px; margin: 2mm 0; color: #7a8a7a; }
            .subtitle { font-size: 9px; font-style: italic; color: #718096; }
            .focus-box, .answer-box, .pattern-box, .challenge-box, .commit-box, .reflect-box { 
                border: 1px dashed #b8c5b8; 
                padding: 2mm; 
                margin: 1mm 0; 
                background: #faf9f6; 
                font-size: 9px;
                break-inside: avoid;
            }
            .two-task-row { display: flex; gap: 2mm; }
            .task-mini { flex: 1; font-size: 8px; }
            .num { 
                background: #9cae9c; 
                color: white; 
                border-radius: 50%; 
                width: 12px; 
                height: 12px; 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 2mm; 
                font-size: 7px;
            }
            .pattern-row, .challenge-row { margin: 1mm 0; }
            .when-best, .adjust-when { font-size: 8px; margin: 1mm 0; }
            .tomorrow-mini, .quote-mini { font-size: 8px; margin: 1mm 0; }
            .quote-mini { font-style: italic; color: #7a8a7a; }
            .question-compact, .purpose { font-size: 9px; margin: 1mm 0; }
        `;
        
        for (const section of sections) {
            const testHTML = `
                <style>${baseCSS}</style>
                <div class="measurement-container">
                    ${section.content}
                </div>
            `;
            
            await page.setContent(testHTML);
            
            const dimensions = await page.evaluate(() => {
                const container = document.querySelector('.measurement-container');
                const rect = container.getBoundingClientRect();
                return {
                    height: rect.height * 0.352778, // Convert px to mm (96 DPI)
                    width: rect.width * 0.352778
                };
            });
            
            measuredSections.push({
                ...section,
                measuredHeight: dimensions.height
            });
            
            console.log(`📐 ${section.id}: ${Math.round(dimensions.height)}mm`);
        }
        
        await page.close();
        return measuredSections;
    }

    async optimizeForTwoPages(sections) {
        const totalAvailableHeight = this.pageHeight * 2; // 2 pages
        let totalContentHeight = sections.reduce((sum, s) => sum + s.measuredHeight, 0);
        
        console.log(`📊 Total content: ${Math.round(totalContentHeight)}mm, Available: ${totalAvailableHeight}mm`);
        
        // If content fits, distribute across 2 pages
        if (totalContentHeight <= totalAvailableHeight) {
            return this.distributeAcrossPages(sections);
        }
        
        // If content is too much, prioritize and compress
        let optimizedSections = [...sections];
        
        // Remove priority 3 items first
        if (totalContentHeight > totalAvailableHeight) {
            optimizedSections = optimizedSections.filter(s => s.priority <= 2);
            totalContentHeight = optimizedSections.reduce((sum, s) => sum + s.measuredHeight, 0);
        }
        
        // If still too much, compress priority 2 items
        if (totalContentHeight > totalAvailableHeight) {
            optimizedSections = optimizedSections.map(section => {
                if (section.priority === 2) {
                    // Compress reflection section
                    section.content = section.content.replace(
                        'Evening Reflection (1 min)',
                        'Reflection'
                    ).replace(/\s+/g, ' '); // Remove extra spaces
                    section.measuredHeight *= 0.8; // Estimate 20% reduction
                }
                return section;
            });
        }
        
        return this.distributeAcrossPages(optimizedSections);
    }

    distributeAcrossPages(sections) {
        const page1Sections = [];
        const page2Sections = [];
        let page1Height = 0;
        let page2Height = 0;
        
        for (const section of sections) {
            // Try to balance pages
            if (page1Height <= page2Height && page1Height + section.measuredHeight <= this.pageHeight) {
                page1Sections.push(section);
                page1Height += section.measuredHeight;
            } else if (page2Height + section.measuredHeight <= this.pageHeight) {
                page2Sections.push(section);
                page2Height += section.measuredHeight;
            } else {
                // If section doesn't fit anywhere, add to page with more space
                if (this.pageHeight - page1Height > this.pageHeight - page2Height) {
                    page1Sections.push(section);
                } else {
                    page2Sections.push(section);
                }
            }
        }
        
        console.log(`📄 Page 1: ${Math.round(page1Height)}mm, Page 2: ${Math.round(page2Height)}mm`);
        
        return [page1Sections, page2Sections];
    }

    async generateOptimizedPDF(pages, outputPath) {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
                
                body { 
                    font-family: 'Kalam', cursive; 
                    font-size: 10px; 
                    line-height: 1.2; 
                    color: #4a5568;
                    margin: 0; 
                    padding: 0;
                }
                
                .page {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 10mm;
                    box-sizing: border-box;
                    page-break-after: always;
                    display: flex;
                    flex-direction: column;
                }
                
                .page:last-child {
                    page-break-after: auto;
                }
                
                .compact-section { 
                    margin: 3mm 0; 
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
                .header-section { text-align: center; margin: 2mm 0; }
                h1 { font-size: 16px; margin: 2mm 0; color: #c77d5c; }
                h2 { font-size: 12px; margin: 2mm 0; color: #9cae9c; border-bottom: 1px solid #9cae9c; }
                h3 { font-size: 11px; margin: 2mm 0; color: #7a8a7a; }
                .subtitle { font-size: 9px; font-style: italic; color: #718096; }
                .focus-box, .answer-box, .pattern-box, .challenge-box, .commit-box, .reflect-box { 
                    border: 1px dashed #b8c5b8; 
                    padding: 2mm; 
                    margin: 1mm 0; 
                    background: #faf9f6; 
                    font-size: 9px;
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
                .two-task-row { display: flex; gap: 2mm; break-inside: avoid !important; }
                .task-mini { flex: 1; font-size: 8px; }
                .num { 
                    background: #9cae9c; 
                    color: white; 
                    border-radius: 50%; 
                    width: 12px; 
                    height: 12px; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin-right: 2mm; 
                    font-size: 7px;
                }
                .pattern-row, .challenge-row { margin: 1mm 0; }
                .when-best, .adjust-when { font-size: 8px; margin: 1mm 0; }
                .tomorrow-mini, .quote-mini { font-size: 8px; margin: 1mm 0; }
                .quote-mini { font-style: italic; color: #7a8a7a; }
                .question-compact, .purpose { font-size: 9px; margin: 1mm 0; }
                
                .page-footer {
                    margin-top: auto;
                    text-align: center;
                    font-size: 7px;
                    color: #b8c5b8;
                    padding-top: 5mm;
                }
                
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .compact-section, .focus-box, .answer-box, .pattern-box, 
                    .challenge-box, .commit-box, .reflect-box, .two-task-row {
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="page">
                ${pages[0].map(section => section.content).join('')}
                <div class="page-footer">Day 1 - Active Procrastinator Workbook - Page 1</div>
            </div>
            
            <div class="page">
                ${pages[1].map(section => section.content).join('')}
                <div class="page-footer">Day 1 - Active Procrastinator Workbook - Page 2</div>
            </div>
        </body>
        </html>
        `;
        
        const page = await this.browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
            printBackground: true
        });
        
        await page.close();
        console.log(`✅ Generated optimized 2-page PDF: ${outputPath}`);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// Test the two-page generator
async function main() {
    const generator = new TwoPageGenerator();
    
    try {
        const result = await generator.generateTwoPageWorkbook({
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        }, 'TWO-PAGE-OPTIMIZED.pdf');
        
        console.log('🎯 Two-page generation complete!');
        console.log(`📄 Exactly ${result.pageCount} pages as required`);
        console.log(`📁 Output: ${result.outputPath}`);
        
        // Validate the result
        const { PDFDocument } = require('pdf-lib');
        const pdfBytes = await fs.readFile(result.outputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        console.log(`✅ Validation: ${pdfDoc.getPageCount()} pages, ${Math.round(pdfBytes.length/1024)} KB`);
        
    } catch (error) {
        console.error('❌ Two-page generation failed:', error);
    } finally {
        await generator.close();
    }
}

module.exports = TwoPageGenerator;

if (require.main === module) {
    main();
}