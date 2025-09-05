const puppeteer = require('puppeteer');
const fs = require('fs').promises;

class SpaceOptimizedGenerator {
    constructor() {
        this.browser = null;
        this.targetPages = 2;
        this.pageHeight = 280; // Available height per page in mm
        this.targetDensity = 0.85; // Target 85% page fill
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: 'new' });
    }

    async generateOptimizedWorkbook(contentData, outputPath) {
        if (!this.browser) await this.init();
        
        console.log('🎯 Generating space-optimized 2-page workbook...');
        
        // Get full-density content that fills pages properly
        const fullContent = this.getFullContentSections(contentData);
        
        // Measure and optimize for proper space usage
        const optimizedPages = await this.optimizeSpaceUsage(fullContent);
        
        // Generate the space-efficient PDF
        await this.generateSpaceEfficientPDF(optimizedPages, outputPath);
        
        return {
            success: true,
            pageCount: 2,
            outputPath
        };
    }

    getFullContentSections(data) {
        return [
            {
                id: 'header',
                content: `
                    <div class="header-section">
                        <h1>${data.title}</h1>
                        <div class="subtitle">${data.subtitle}</div>
                        <div class="focus-box">
                            <div class="focus-row">
                                <strong>Today's Focus:</strong> ${data.focus}
                            </div>
                            <div class="focus-row">
                                <strong>Time Commitment:</strong> ${data.time} | 
                                <strong>Core Exercise:</strong> ${data.exercise}
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'morning-checkin',
                content: `
                    <div class="section">
                        <h2>Morning Check-in (2 minutes)</h2>
                        
                        <div class="questions">
                            <strong>Daily Questions:</strong>
                            <ul>
                                <li>What task am I strategically delaying and why might this be optimal timing?</li>
                                <li>What's my current energy/pressure level for peak performance?</li>
                                <li>How can I honor my natural work style today?</li>
                            </ul>
                        </div>
                        
                        <div class="response-area">
                            <div class="response-box">
                                <strong>Task I'm delaying:</strong> <span class="fill-line"></span><br><br>
                                <strong>Why optimal timing:</strong> <span class="fill-line"></span><br><br>
                                <strong>Pressure/energy level:</strong> <span class="fill-line"></span>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'main-exercise',
                content: `
                    <div class="section">
                        <h2>Main Exercise: Strategic Delay Assessment (15 minutes)</h2>
                        
                        <div class="exercise-purpose">
                            <strong>Purpose:</strong> Understand when your delay patterns serve you vs. when they might need adjustment
                        </div>
                        
                        <div class="step-section">
                            <h3><span class="step-num">1</span>Recent Success Analysis (7 minutes)</h3>
                            <p>Think of 2 recent tasks where you delayed and achieved good results:</p>
                            
                            <div class="task-comparison">
                                <div class="task-column">
                                    <div class="task-box">
                                        <strong>Task 1:</strong> <span class="fill-line"></span><br>
                                        <strong>When started:</strong> <span class="fill-line"></span><br>
                                        <strong>Why you waited:</strong> <span class="fill-line"></span><br><br>
                                        <div class="rating-row">
                                            <strong>Quality (1-10):</strong> <span class="rating-box"></span>
                                            <strong>Stress (1-10):</strong> <span class="rating-box"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="task-column">
                                    <div class="task-box">
                                        <strong>Task 2:</strong> <span class="fill-line"></span><br>
                                        <strong>When started:</strong> <span class="fill-line"></span><br>
                                        <strong>Why you waited:</strong> <span class="fill-line"></span><br><br>
                                        <div class="rating-row">
                                            <strong>Quality (1-10):</strong> <span class="rating-box"></span>
                                            <strong>Stress (1-10):</strong> <span class="rating-box"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'pattern-recognition',
                content: `
                    <div class="section">
                        <div class="step-section">
                            <h3><span class="step-num">2</span>Pattern Recognition (5 minutes)</h3>
                            
                            <div class="pattern-analysis">
                                <p><strong>What do your most successful delays have in common?</strong></p>
                                <div class="pattern-box">
                                    <div class="pattern-row">
                                        <strong>Time of day you work best:</strong> <span class="fill-line"></span>
                                    </div>
                                    <div class="pattern-row">
                                        <strong>Optimal pressure level (1-10):</strong> <span class="rating-box"></span>
                                    </div>
                                    <div class="pattern-row">
                                        <strong>Task types that benefit from delay:</strong> <span class="fill-line"></span>
                                    </div>
                                </div>
                                
                                <p><strong>When does your strategic delay work BEST?</strong></p>
                                <div class="checkbox-section">
                                    <div class="checkbox-grid">
                                        <div class="checkbox-item">☐ Complex creative projects</div>
                                        <div class="checkbox-item">☐ Analytical/problem-solving tasks</div>
                                        <div class="checkbox-item">☐ High-stakes presentations</div>
                                        <div class="checkbox-item">☐ Other: <span class="fill-line-short"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'challenges',
                content: `
                    <div class="section">
                        <div class="step-section">
                            <h3><span class="step-num">3</span>Challenge Area Identification (3 minutes)</h3>
                            
                            <div class="challenge-analysis">
                                <p><strong>Times when delay might not have served you well:</strong></p>
                                <div class="challenge-box">
                                    <div class="challenge-row">
                                        <strong>Challenging situation:</strong> <span class="fill-line"></span>
                                    </div>
                                    <div class="challenge-row">
                                        <strong>What went wrong?</strong> <span class="fill-line"></span>
                                    </div>
                                    <div class="challenge-row">
                                        <strong>Warning signs you missed:</strong> <span class="fill-line"></span>
                                    </div>
                                </div>
                                
                                <p><strong>Your delay approach might need adjustment when:</strong></p>
                                <div class="checkbox-section">
                                    <div class="checkbox-grid">
                                        <div class="checkbox-item">☐ Multiple deadlines converge</div>
                                        <div class="checkbox-item">☐ Health/energy is compromised</div>
                                        <div class="checkbox-item">☐ External dependencies exist</div>
                                        <div class="checkbox-item">☐ Other: <span class="fill-line-short"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'commitment',
                content: `
                    <div class="section">
                        <h2>Pressure Optimization Commitment (2 minutes)</h2>
                        
                        <div class="commitment-purpose">
                            <strong>Purpose:</strong> Set intention for strategic improvement rather than elimination
                        </div>
                        
                        <div class="commitment-area">
                            <div class="insight-section">
                                <p><strong>One insight about your optimal pressure point:</strong></p>
                                <div class="large-response-box"></div>
                            </div>
                            
                            <div class="action-section">
                                <div class="action-row">
                                    <strong>One area to fine-tune:</strong> <span class="fill-line"></span>
                                </div>
                                <div class="action-row">
                                    <strong>Today's experiment:</strong> <span class="fill-line"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'reflection',
                content: `
                    <div class="section">
                        <h2>Evening Reflection (1 minute)</h2>
                        
                        <div class="reflection-area">
                            <div class="reflection-question">
                                <p><strong>What did you notice about your energy and focus patterns today?</strong></p>
                                <div class="large-response-box"></div>
                            </div>
                            
                            <div class="reflection-insights">
                                <div class="insight-row">
                                    <strong>How did honoring your natural timing feel?</strong> <span class="fill-line"></span>
                                </div>
                                <div class="insight-row">
                                    <strong>One thing to explore more:</strong> <span class="fill-line"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                priority: 1
            },
            {
                id: 'tomorrow',
                content: `
                    <div class="section">
                        <h2>Tomorrow's Preparation</h2>
                        <p>Tomorrow we'll dive into understanding your natural energy patterns and how they align with your strategic timing.</p>
                        
                        <div class="quote-section">
                            <div class="strategic-quote">
                                <strong>Strategic Thinking Thought:</strong><br>
                                <em>"My tendency to delay isn't a flaw to fix—it's a strength to optimize."</em>
                            </div>
                        </div>
                    </div>
                `,
                priority: 2
            }
        ];
    }

    async optimizeSpaceUsage(sections) {
        // Distribute content more evenly across 2 pages to eliminate white space
        const page1Sections = [];
        const page2Sections = [];
        
        // More strategic distribution based on content flow
        // Page 1: Header, Morning Check-in, Main Exercise start
        page1Sections.push(sections[0]); // header
        page1Sections.push(sections[1]); // morning-checkin
        page1Sections.push(sections[2]); // main-exercise (step 1)
        
        // Page 2: Pattern recognition, Challenges, Commitment, Reflection, Tomorrow
        page2Sections.push(sections[3]); // pattern-recognition
        page2Sections.push(sections[4]); // challenges
        page2Sections.push(sections[5]); // commitment
        page2Sections.push(sections[6]); // reflection
        page2Sections.push(sections[7]); // tomorrow
        
        console.log('📄 Optimized distribution: Page 1 (3 sections), Page 2 (5 sections)');
        
        return [page1Sections, page2Sections];
    }

    async generateSpaceEfficientPDF(pages, outputPath) {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
                
                body { 
                    font-family: 'Kalam', cursive; 
                    font-size: 12px; 
                    line-height: 1.4; 
                    color: #4a5568;
                    margin: 0; 
                    padding: 0;
                }
                
                .page {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 15mm;
                    box-sizing: border-box;
                    page-break-after: always;
                }
                
                .page:last-child {
                    page-break-after: auto;
                }
                
                /* Compact but readable sections */
                .section { 
                    margin: 8mm 0; 
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
                
                .header-section { text-align: center; margin: 4mm 0; }
                
                h1 { 
                    font-size: 22px; 
                    margin: 3mm 0; 
                    color: #c77d5c; 
                    text-shadow: 2px 2px 0px #faf9f6;
                    transform: rotate(-0.3deg);
                }
                
                h2 { 
                    font-size: 16px; 
                    margin: 5mm 0 3mm 0; 
                    color: #9cae9c; 
                    border-bottom: 2px solid #9cae9c;
                    transform: rotate(0.2deg);
                }
                
                h3 { 
                    font-size: 14px; 
                    margin: 4mm 0 2mm 0; 
                    color: #7a8a7a;
                    transform: rotate(-0.1deg);
                }
                
                .subtitle { 
                    font-size: 14px; 
                    font-style: italic; 
                    color: #718096; 
                    margin: 2mm 0;
                }
                
                /* Functional form elements */
                .focus-box, .response-box, .task-box, .pattern-box, 
                .challenge-box, .large-response-box { 
                    border: 2px dashed #b8c5b8; 
                    border-radius: 8px;
                    padding: 4mm; 
                    margin: 3mm 0; 
                    background: #faf9f6;
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                    transform: rotate(0.1deg);
                }
                
                .focus-row, .pattern-row, .challenge-row, .action-row, .insight-row { 
                    margin: 2mm 0; 
                }
                
                /* Two-column layout for tasks */
                .task-comparison { 
                    display: flex; 
                    gap: 4mm; 
                    break-inside: avoid !important;
                }
                .task-column { flex: 1; }
                
                /* Fill lines and boxes */
                .fill-line { 
                    border-bottom: 2px dotted #718096; 
                    display: inline-block; 
                    min-width: 150px; 
                    margin: 0 2mm;
                    height: 18px;
                }
                
                .fill-line-short { 
                    border-bottom: 2px dotted #718096; 
                    display: inline-block; 
                    min-width: 80px; 
                    margin: 0 2mm;
                    height: 18px;
                }
                
                .rating-box { 
                    border: 2px solid #9cae9c; 
                    display: inline-block; 
                    width: 25px; 
                    height: 20px; 
                    margin: 0 2mm;
                    background: #f5f7f0;
                }
                
                .rating-row { 
                    display: flex; 
                    gap: 8mm; 
                    align-items: center; 
                    margin: 2mm 0;
                }
                
                /* Step numbers */
                .step-num { 
                    background: #9cae9c; 
                    color: white; 
                    border-radius: 50%; 
                    width: 24px; 
                    height: 24px; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin-right: 3mm; 
                    font-weight: bold;
                    transform: rotate(5deg);
                }
                
                /* Checkbox sections */
                .checkbox-section { margin: 3mm 0; }
                .checkbox-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 2mm 4mm;
                }
                .checkbox-item { 
                    font-size: 11px; 
                    margin: 1mm 0; 
                }
                
                /* Lists */
                ul { 
                    padding-left: 5mm; 
                    margin: 2mm 0; 
                }
                li { 
                    margin: 1mm 0; 
                    font-size: 11px;
                }
                
                p { 
                    margin: 2mm 0; 
                    font-size: 12px;
                }
                
                /* Large response areas */
                .large-response-box { 
                    min-height: 25mm;
                }
                
                /* Quote styling */
                .strategic-quote { 
                    background: #f5f7f0; 
                    border-left: 4px solid #9cae9c; 
                    padding: 4mm 5mm; 
                    margin: 4mm 0; 
                    font-style: italic;
                    transform: rotate(-0.1deg);
                }
                
                /* Purpose and intro text */
                .exercise-purpose, .commitment-purpose { 
                    font-size: 11px; 
                    color: #7a8a7a; 
                    margin: 2mm 0;
                    font-style: italic;
                }
                
                .questions { margin: 3mm 0; }
                
                /* Page footer */
                .page-footer {
                    position: fixed;
                    bottom: 10mm;
                    right: 15mm;
                    font-size: 10px;
                    color: #b8c5b8;
                    transform: rotate(1deg);
                }
                
                /* Ensure no breaks within critical elements */
                .step-section, .response-area, .commitment-area, .reflection-area,
                .pattern-analysis, .challenge-analysis, .task-comparison {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
                
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .section, .focus-box, .response-box, .task-box, .pattern-box, 
                    .challenge-box, .large-response-box, .step-section, .task-comparison {
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
            printBackground: true,
            preferCSSPageSize: false
        });
        
        await page.close();
        console.log(`✅ Generated space-optimized PDF: ${outputPath}`);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// Generate the space-optimized version
async function main() {
    const generator = new SpaceOptimizedGenerator();
    
    try {
        const result = await generator.generateOptimizedWorkbook({
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        }, 'SPACE-OPTIMIZED.pdf');
        
        console.log('🎯 Space-optimized generation complete!');
        console.log(`📄 Generated ${result.pageCount} pages with proper space usage`);
        console.log(`📁 Output: ${result.outputPath}`);
        
        // Validate the result
        const { PDFDocument } = require('pdf-lib');
        const pdfBytes = await fs.readFile(result.outputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        console.log(`✅ Final: ${pdfDoc.getPageCount()} pages, ${Math.round(pdfBytes.length/1024)} KB`);
        
    } catch (error) {
        console.error('❌ Space optimization failed:', error);
    } finally {
        await generator.close();
    }
}

module.exports = SpaceOptimizedGenerator;

if (require.main === module) {
    main();
}