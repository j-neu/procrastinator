const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    const html = `
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
                padding: 12mm;
            }
            
            .page {
                page-break-after: always;
                min-height: 270mm;
            }
            
            .page:last-child {
                page-break-after: auto;
            }
            
            h1 { font-size: 20px; margin: 3mm 0; color: #c77d5c; text-align: center; }
            h2 { font-size: 14px; margin: 4mm 0 2mm 0; color: #9cae9c; border-bottom: 1px solid #9cae9c; }
            h3 { font-size: 12px; margin: 3mm 0 1mm 0; color: #7a8a7a; }
            
            .subtitle { font-size: 12px; font-style: italic; color: #718096; text-align: center; margin: 1mm 0; }
            
            .section { 
                margin: 3mm 0; 
                break-inside: avoid !important;
            }
            
            .focus-box, .answer-box, .task-box, .pattern-box, .commitment-box { 
                border: 1px dashed #b8c5b8; 
                border-radius: 4px;
                padding: 3mm; 
                margin: 2mm 0; 
                background: #faf9f6;
                break-inside: avoid !important;
            }
            
            .two-col { display: flex; gap: 3mm; }
            .col { flex: 1; }
            
            .fill-line { 
                border-bottom: 1px dotted #718096; 
                display: inline-block; 
                min-width: 100px; 
                margin: 0 1mm;
                height: 14px;
            }
            
            .num { 
                background: #9cae9c; 
                color: white; 
                border-radius: 50%; 
                width: 18px; 
                height: 18px; 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                margin-right: 2mm; 
                font-weight: bold;
                font-size: 10px;
            }
            
            ul { padding-left: 4mm; margin: 1mm 0; }
            li { margin: 1mm 0; font-size: 10px; }
            p { margin: 1mm 0; }
            
            .checkbox-grid { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 1mm 3mm;
                font-size: 10px;
            }
            
            .quote { 
                background: #f5f7f0; 
                border-left: 3px solid #9cae9c; 
                padding: 3mm; 
                margin: 3mm 0; 
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <!-- PAGE 1 -->
            <h1>Day 1: Understanding Your Strategic Approach</h1>
            <div class="subtitle">Active Procrastinator Workbook</div>
            
            <div class="focus-box">
                <strong>Focus:</strong> Map your unique pressure-performance patterns | 
                <strong>Time:</strong> 20 minutes | 
                <strong>Exercise:</strong> Strategic Delay Assessment
            </div>
            
            <div class="section">
                <h2>Morning Check-in (2 minutes)</h2>
                <ul>
                    <li>What task am I strategically delaying and why might this be optimal timing?</li>
                    <li>What's my current energy/pressure level for peak performance?</li>
                    <li>How can I honor my natural work style today?</li>
                </ul>
                
                <div class="answer-box">
                    <strong>Task I'm delaying:</strong> <span class="fill-line"></span><br>
                    <strong>Why optimal timing:</strong> <span class="fill-line"></span><br>
                    <strong>Pressure/energy level:</strong> <span class="fill-line"></span>
                </div>
            </div>
            
            <div class="section">
                <h2>Strategic Delay Assessment (15 minutes)</h2>
                <p><strong>Purpose:</strong> Understand when your delay patterns serve you vs. need adjustment</p>
                
                <h3><span class="num">1</span>Recent Success Analysis (7 minutes)</h3>
                <p>Think of 2 recent tasks where you delayed and achieved good results:</p>
                
                <div class="two-col">
                    <div class="col">
                        <div class="task-box">
                            <strong>Task 1:</strong> <span class="fill-line"></span><br>
                            <strong>When started:</strong> <span class="fill-line"></span><br>
                            <strong>Why you waited:</strong> <span class="fill-line"></span><br>
                            <strong>Quality (1-10):</strong> ___ <strong>Stress (1-10):</strong> ___
                        </div>
                    </div>
                    <div class="col">
                        <div class="task-box">
                            <strong>Task 2:</strong> <span class="fill-line"></span><br>
                            <strong>When started:</strong> <span class="fill-line"></span><br>
                            <strong>Why you waited:</strong> <span class="fill-line"></span><br>
                            <strong>Quality (1-10):</strong> ___ <strong>Stress (1-10):</strong> ___
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="page">
            <!-- PAGE 2 -->
            <div class="section">
                <h3><span class="num">2</span>Pattern Recognition (5 minutes)</h3>
                
                <p><strong>What do your most successful delays have in common?</strong></p>
                <div class="pattern-box">
                    <strong>Time of day you work best:</strong> <span class="fill-line"></span><br>
                    <strong>Optimal pressure level (1-10):</strong> ___<br>
                    <strong>Task types that benefit from delay:</strong> <span class="fill-line"></span>
                </div>
                
                <p><strong>When does your strategic delay work BEST?</strong></p>
                <div class="checkbox-grid">
                    <div>☐ Complex creative projects</div>
                    <div>☐ Analytical/problem-solving tasks</div>
                    <div>☐ High-stakes presentations</div>
                    <div>☐ Other: <span class="fill-line"></span></div>
                </div>
            </div>
            
            <div class="section">
                <h3><span class="num">3</span>Challenge Area Identification (3 minutes)</h3>
                
                <p><strong>Times when delay might not have served you well:</strong></p>
                <div class="answer-box">
                    <strong>Challenging situation:</strong> <span class="fill-line"></span><br>
                    <strong>What went wrong?</strong> <span class="fill-line"></span><br>
                    <strong>Warning signs you missed:</strong> <span class="fill-line"></span>
                </div>
                
                <p><strong>Your delay approach might need adjustment when:</strong></p>
                <div class="checkbox-grid">
                    <div>☐ Multiple deadlines converge</div>
                    <div>☐ Health/energy is compromised</div>
                    <div>☐ External dependencies exist</div>
                    <div>☐ Other: <span class="fill-line"></span></div>
                </div>
            </div>
            
            <div class="section">
                <h2>Pressure Optimization Commitment (2 minutes)</h2>
                
                <div class="commitment-box">
                    <strong>One insight about your optimal pressure point:</strong><br><br>
                    ________________________________________________________________<br><br>
                    <strong>One area to fine-tune:</strong> <span class="fill-line"></span><br>
                    <strong>Today's experiment:</strong> <span class="fill-line"></span>
                </div>
            </div>
            
            <div class="section">
                <h2>Evening Reflection (1 minute)</h2>
                
                <div class="answer-box">
                    <strong>What did you notice about your energy and focus patterns today?</strong><br><br>
                    ________________________________________________________________<br><br>
                    <strong>How did honoring your natural timing feel?</strong> <span class="fill-line"></span><br>
                    <strong>One thing to explore more:</strong> <span class="fill-line"></span>
                </div>
            </div>
            
            <div class="section">
                <h2>Tomorrow's Preparation</h2>
                <p>Tomorrow we'll dive into understanding your natural energy patterns and how they align with your strategic timing.</p>
                
                <div class="quote">
                    <strong>Strategic Thinking Thought:</strong><br>
                    <em>"My tendency to delay isn't a flaw to fix—it's a strength to optimize."</em>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    await page.pdf({
        path: 'FINAL-BALANCED.pdf',
        format: 'A4',
        margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
        printBackground: true
    });
    
    await browser.close();
    console.log('✅ Generated FINAL-BALANCED.pdf');
    
    // Check page count
    const { PDFDocument } = require('pdf-lib');
    const pdfBytes = fs.readFileSync('FINAL-BALANCED.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    console.log(`📊 Result: ${pdfDoc.getPageCount()} pages, ${Math.round(pdfBytes.length/1024)} KB`);
})();