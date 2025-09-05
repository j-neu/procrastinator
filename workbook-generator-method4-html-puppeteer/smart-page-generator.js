const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

class SmartPageGenerator {
    constructor() {
        this.browser = null;
        this.pageHeight = 257; // A4 minus margins in mm
        this.marginBuffer = 20; // Extra safety margin
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: 'new' });
    }

    async generateWorkbookPage(contentData, outputPath) {
        if (!this.browser) await this.init();

        console.log('🧠 Smart page generation starting...');
        
        // Parse content into measurable sections
        const sections = this.parseContentSections(contentData);
        
        // Reorganize content to prevent splits
        const pages = await this.reorganizeForPages(sections);
        
        console.log(`📄 Content organized into ${pages.length} pages`);
        
        // Generate PDFs for each page
        const pdfPaths = [];
        for (let i = 0; i < pages.length; i++) {
            const pagePath = `${outputPath}-page-${i + 1}.pdf`;
            await this.generateSinglePage(pages[i], pagePath, i + 1);
            pdfPaths.push(pagePath);
        }
        
        // Merge PDFs if multiple pages
        if (pdfPaths.length > 1) {
            await this.mergePDFs(pdfPaths, outputPath);
            // Clean up individual pages
            for (const path of pdfPaths) {
                await fs.unlink(path).catch(() => {});
            }
        } else {
            // Just rename the single page
            await fs.rename(pdfPaths[0], outputPath);
        }
        
        return {
            success: true,
            pageCount: pages.length,
            outputPath
        };
    }

    parseContentSections(contentData) {
        return [
            {
                type: 'header',
                content: `
                    <h1>${contentData.title}</h1>
                    <div class="subtitle">${contentData.subtitle}</div>
                    <div class="daily-focus">
                        <strong>Focus:</strong> ${contentData.focus}<br>
                        <strong>Time:</strong> ${contentData.time}<br>
                        <strong>Exercise:</strong> ${contentData.exercise}
                    </div>
                `,
                estimatedHeight: 60
            },
            {
                type: 'morning-checkin',
                content: `
                    <div class="section">
                        <h2>Morning Check-in (2 min)</h2>
                        <ul>
                            <li>What task am I strategically delaying and why?</li>
                            <li>What's my current energy/pressure level?</li>
                            <li>How can I honor my natural work style today?</li>
                        </ul>
                        <div class="text-box">
                            <strong>Task:</strong> ________________<br>
                            <strong>Why:</strong> ________________<br>
                            <strong>Energy:</strong> ________________
                        </div>
                    </div>
                `,
                estimatedHeight: 80
            },
            {
                type: 'main-exercise-intro',
                content: `
                    <div class="section">
                        <h2>Strategic Delay Assessment (15 min)</h2>
                        <p><strong>Purpose:</strong> Understand when delay patterns serve you vs. need adjustment</p>
                    </div>
                `,
                estimatedHeight: 30
            },
            {
                type: 'step-1',
                content: `
                    <div class="section question-group">
                        <h3><span class="step-number">1</span>Recent Success Analysis (7 min)</h3>
                        <p>Think of 2 recent tasks where you delayed and achieved good results:</p>
                        
                        <div class="task-analysis">
                            <div class="text-box">
                                <strong>Task 1:</strong> ________________<br>
                                <strong>Started:</strong> ________________<br>
                                <strong>Why waited:</strong> ________________<br>
                                <strong>Quality (1-10):</strong> ___ <strong>Stress (1-10):</strong> ___
                            </div>
                            
                            <div class="text-box">
                                <strong>Task 2:</strong> ________________<br>
                                <strong>Started:</strong> ________________<br>
                                <strong>Why waited:</strong> ________________<br>
                                <strong>Quality (1-10):</strong> ___ <strong>Stress (1-10):</strong> ___
                            </div>
                        </div>
                    </div>
                `,
                estimatedHeight: 120
            },
            {
                type: 'step-2-pattern',
                content: `
                    <div class="section question-group">
                        <h3><span class="step-number">2</span>Pattern Recognition (5 min)</h3>
                        
                        <p><strong>What do your successful delays have in common?</strong></p>
                        <div class="text-box">
                            <strong>Best time:</strong> ________________<br>
                            <strong>Pressure level:</strong> ___<br>
                            <strong>Task types:</strong> ________________
                        </div>
                        
                        <p><strong>When does delay work BEST?</strong></p>
                        <div class="checkbox-group">
                            <div>☐ Complex creative projects</div>
                            <div>☐ Problem-solving tasks</div>
                            <div>☐ High-stakes presentations</div>
                            <div>☐ Other: ________________</div>
                        </div>
                    </div>
                `,
                estimatedHeight: 100
            },
            {
                type: 'step-3-challenges',
                content: `
                    <div class="section question-group">
                        <h3><span class="step-number">3</span>Challenge Areas (3 min)</h3>
                        
                        <p><strong>When delay didn't serve you well:</strong></p>
                        <div class="text-box">
                            <strong>Situation:</strong> ________________<br>
                            <strong>What went wrong:</strong> ________________<br>
                            <strong>Warning signs:</strong> ________________
                        </div>
                        
                        <p><strong>Adjust when:</strong></p>
                        <div class="checkbox-group">
                            <div>☐ Multiple deadlines</div>
                            <div>☐ Health/energy compromised</div>
                            <div>☐ External dependencies</div>
                            <div>☐ Other: ________________</div>
                        </div>
                    </div>
                `,
                estimatedHeight: 90
            },
            {
                type: 'commitment',
                content: `
                    <div class="section">
                        <h2>Commitment (2 min)</h2>
                        
                        <p><strong>Insight about optimal pressure:</strong></p>
                        <div class="text-box large"></div>
                        
                        <p><strong>Fine-tune:</strong> ________________ <strong>Today's experiment:</strong> ________________</p>
                    </div>
                `,
                estimatedHeight: 70
            },
            {
                type: 'reflection',
                content: `
                    <div class="section">
                        <h2>Evening Reflection (1 min)</h2>
                        
                        <p><strong>Energy and focus patterns noticed:</strong></p>
                        <div class="text-box"></div>
                        
                        <p><strong>How timing felt:</strong> ________________ <strong>Explore more:</strong> ________________</p>
                    </div>
                `,
                estimatedHeight: 60
            },
            {
                type: 'footer',
                content: `
                    <div class="section">
                        <h2>Tomorrow</h2>
                        <p>We'll explore natural energy patterns and strategic timing alignment.</p>
                        
                        <div class="quote">
                            <strong>Strategic Thought:</strong><br>
                            <em>"My delay isn't a flaw to fix—it's a strength to optimize."</em>
                        </div>
                    </div>
                `,
                estimatedHeight: 50
            }
        ];
    }

    async reorganizeForPages(sections) {
        const pages = [];
        let currentPage = [];
        let currentHeight = 0;
        const maxHeight = this.pageHeight - this.marginBuffer;
        
        for (const section of sections) {
            // Always keep header on first page
            if (section.type === 'header') {
                currentPage.push(section);
                currentHeight += section.estimatedHeight;
                continue;
            }
            
            // Check if adding this section would overflow
            if (currentHeight + section.estimatedHeight > maxHeight && currentPage.length > 1) {
                // Save current page and start new one
                pages.push([...currentPage]);
                currentPage = [section];
                currentHeight = section.estimatedHeight;
            } else {
                // Add to current page
                currentPage.push(section);
                currentHeight += section.estimatedHeight;
            }
        }
        
        // Add final page if it has content
        if (currentPage.length > 0) {
            pages.push(currentPage);
        }
        
        return pages;
    }

    async generateSinglePage(sections, outputPath, pageNumber) {
        const page = await this.browser.newPage();
        
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
                
                body {
                    font-family: 'Kalam', cursive;
                    font-size: 11px;
                    line-height: 1.3;
                    color: #4a5568;
                    margin: 0;
                    padding: 15mm;
                }
                
                .page {
                    max-width: 210mm;
                    margin: 0 auto;
                }
                
                /* Prevent any breaks within sections */
                .section, .question-group, .text-box {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                    margin-bottom: 8px;
                }
                
                h1 {
                    font-size: 18px;
                    color: #c77d5c;
                    text-align: center;
                    margin: 0 0 8px 0;
                }
                
                h2 {
                    font-size: 14px;
                    color: #9cae9c;
                    margin: 8px 0 4px 0;
                    border-bottom: 1px solid #9cae9c;
                }
                
                h3 {
                    font-size: 12px;
                    color: #7a8a7a;
                    margin: 6px 0 4px 0;
                }
                
                .subtitle {
                    font-size: 11px;
                    color: #718096;
                    text-align: center;
                    margin-bottom: 8px;
                    font-style: italic;
                }
                
                .daily-focus {
                    background: #f5f7f0;
                    border: 1px solid #9cae9c;
                    border-radius: 4px;
                    padding: 6px;
                    margin: 6px 0;
                    font-size: 10px;
                }
                
                .text-box {
                    border: 1px dashed #b8c5b8;
                    border-radius: 4px;
                    padding: 6px;
                    margin: 4px 0;
                    background: #faf9f6;
                    min-height: 30px;
                    break-inside: avoid !important;
                }
                
                .text-box.large {
                    min-height: 40px;
                }
                
                .checkbox-group {
                    margin: 4px 0;
                    break-inside: avoid !important;
                }
                
                .checkbox-group div {
                    margin: 2px 0;
                    font-size: 10px;
                }
                
                .step-number {
                    background: #9cae9c;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 6px;
                    font-size: 9px;
                }
                
                .task-analysis {
                    break-inside: avoid !important;
                }
                
                ul {
                    padding-left: 12px;
                    margin: 4px 0;
                }
                
                li {
                    margin: 2px 0;
                    font-size: 10px;
                }
                
                p {
                    margin: 3px 0;
                    font-size: 10px;
                }
                
                .quote {
                    background: #f5f7f0;
                    border-left: 3px solid #9cae9c;
                    padding: 6px 8px;
                    margin: 8px 0;
                    font-style: italic;
                    font-size: 10px;
                }
                
                .page-footer {
                    position: fixed;
                    bottom: 10mm;
                    right: 15mm;
                    font-size: 8px;
                    color: #b8c5b8;
                }
                
                /* Ensure everything stays together */
                * {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
            </style>
        </head>
        <body>
            <div class="page">
                ${sections.map(section => section.content).join('')}
                <div class="page-footer">
                    Day 1 - Active Procrastinator Workbook - Page ${pageNumber}
                </div>
            </div>
        </body>
        </html>
        `;
        
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
            printBackground: true
        });
        
        await page.close();
        console.log(`✅ Generated ${outputPath}`);
    }

    async mergePDFs(pdfPaths, outputPath) {
        const mergedPdf = await PDFDocument.create();
        
        for (const pdfPath of pdfPaths) {
            const pdfBytes = await fs.readFile(pdfPath);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        
        const mergedBytes = await mergedPdf.save();
        await fs.writeFile(outputPath, mergedBytes);
        console.log(`✅ Merged into ${outputPath}`);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// Test the smart generator
async function main() {
    const generator = new SmartPageGenerator();
    
    try {
        const contentData = {
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        };
        
        const result = await generator.generateWorkbookPage(
            contentData,
            'SMART-GENERATED.pdf'
        );
        
        console.log('🎉 Smart generation complete!');
        console.log(`📄 Generated ${result.pageCount} pages`);
        console.log(`📁 Output: ${result.outputPath}`);
        
        // Validate the result
        const pdfBytes = await fs.readFile(result.outputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        console.log(`✅ Final PDF: ${pdfDoc.getPageCount()} pages, ${Math.round(pdfBytes.length/1024)} KB`);
        
    } catch (error) {
        console.error('❌ Smart generation failed:', error);
    } finally {
        await generator.close();
    }
}

module.exports = SmartPageGenerator;

if (require.main === module) {
    main();
}