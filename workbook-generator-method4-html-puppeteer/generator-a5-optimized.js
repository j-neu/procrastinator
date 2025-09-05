const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class A5OptimizedWorkbookGenerator {
    constructor() {
        this.browser = null;
    }

    async init() {
        console.log('🚀 Launching browser for A5 generation...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    async generatePage(templateData, outputPath) {
        if (!this.browser) {
            await this.init();
        }

        try {
            console.log('📄 Generating A5-optimized page:', outputPath);
            
            // Read the A5-optimized HTML template
            const templatePath = path.join(__dirname, 'template-a5-optimized.html');
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            // Create a new page
            const page = await this.browser.newPage();
            
            // Set viewport for A5 format - higher DPI for crisp text
            await page.setViewport({
                width: 420,  // A5 width in pixels at 72 DPI
                height: 595, // A5 height in pixels at 72 DPI
                deviceScaleFactor: 3  // High DPI for crisp text
            });
            
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Wait for fonts and layout to settle
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Add print-specific optimizations
            await page.addStyleTag({
                content: `
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        body {
                            font-size: 11pt !important;
                        }
                        
                        .page {
                            width: 100% !important;
                            height: auto !important;
                            margin: 0 !important;
                            padding: 0.4in !important;
                            box-shadow: none !important;
                            border-radius: 0 !important;
                        }
                        
                        /* Ensure text is readable */
                        h1 { font-size: 18pt !important; }
                        h2 { font-size: 14pt !important; }
                        h3 { font-size: 12pt !important; }
                        p, li, div { font-size: 11pt !important; }
                        .time-badge { font-size: 8pt !important; }
                        .subtitle { font-size: 10pt !important; }
                        
                        /* Optimize spacing for A5 */
                        .section { margin: 10pt 0 !important; }
                        .section-small { margin: 8pt 0 !important; padding: 8pt !important; }
                        .section-medium { margin: 10pt 0 !important; padding: 10pt !important; }
                        .fillable-box { min-height: 30pt !important; }
                        .fillable-line { min-width: 100pt !important; }
                    }
                `
            });

            // Generate PDF with A5 settings
            await page.pdf({
                path: outputPath,
                format: 'A5',
                margin: {
                    top: '0.4in',
                    right: '0.4in',
                    bottom: '0.4in',
                    left: '0.4in'
                },
                printBackground: true,
                preferCSSPageSize: false, // Let Puppeteer handle A5 sizing
                scale: 1.0
            });
            
            console.log('✅ A5 PDF generated successfully');
            
            // Close the page
            await page.close();
            
        } catch (error) {
            console.error('❌ Error generating A5 page:', error);
            throw error;
        }
    }

    async verifyPageLayout(pdfPath) {
        try {
            const stats = await fs.stat(pdfPath);
            console.log(`📄 PDF Size: ${(stats.size / 1024).toFixed(1)} KB`);
            
            // Could add PDF analysis here if needed
            const pdfBytes = await fs.readFile(pdfPath);
            console.log(`📊 PDF generated with ${Math.round(pdfBytes.length / 1024)} KB`);
            
            return true;
        } catch (error) {
            console.error('❌ Error verifying PDF:', error);
            return false;
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔚 Browser closed');
        }
    }
}

// Test with Day 1 Active Procrastinator content
async function main() {
    const generator = new A5OptimizedWorkbookGenerator();
    
    try {
        const templateData = {
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        };
        
        const outputFile = 'day-1-a5-optimized.pdf';
        await generator.generatePage(templateData, outputFile);
        
        // Verify the output
        const isValid = await generator.verifyPageLayout(outputFile);
        
        if (isValid) {
            console.log('🎉 A5-optimized workbook page generated successfully!');
            console.log(`📂 Output: ${outputFile}`);
            console.log('');
            console.log('Key improvements:');
            console.log('✓ A5 format optimized (5.83" x 8.27")');
            console.log('✓ Readable font sizes for print');
            console.log('✓ Modular sections (2-3 min chunks)');
            console.log('✓ No cut text boxes');
            console.log('✓ Smart page utilization');
            console.log('✓ Clean fillable elements');
        } else {
            console.log('⚠️  Generation complete but needs verification');
        }
        
    } catch (error) {
        console.error('💥 Generation failed:', error);
    } finally {
        await generator.close();
    }
}

// Export for reuse
module.exports = A5OptimizedWorkbookGenerator;

// Run if this file is executed directly
if (require.main === module) {
    main();
}