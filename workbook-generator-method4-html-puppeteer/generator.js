const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

class HTMLPuppeteerWorkbookGenerator {
    constructor() {
        this.browser = null;
    }

    async init() {
        console.log('🚀 Launching browser...');
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
            console.log('📄 Generating page (two-run approach):', outputPath);
            
            // Read the HTML template
            const templatePath = path.join(__dirname, 'active-day-1-template.html');
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            // Create a new page for analysis
            const page = await this.browser.newPage();
            
            // Set the viewport for consistent rendering
            await page.setViewport({
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2
            });
            
            // === RUN 1: Rough spacing analysis ===
            console.log('🔍 Run 1: Analyzing page breaks...');
            
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Wait for fonts and layout
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Detect broken inline elements across page boundaries
            const brokenElements = await this.detectBrokenElements(page);
            
            // === RUN 2: Fix broken elements ===
            if (brokenElements.length > 0) {
                console.log(`⚠️  Found ${brokenElements.length} broken elements, applying fixes...`);
                htmlContent = this.applyBreakFixes(htmlContent, brokenElements);
                
                // Reload with fixes
                await page.setContent(htmlContent, {
                    waitUntil: 'domcontentloaded',
                    timeout: 10000
                });
                
                // Wait for fonts to load again
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                console.log('✅ No broken elements detected');
            }
            
            // Add print-specific CSS
            await page.addStyleTag({
                content: `
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        .page {
                            break-after: auto;
                            page-break-after: auto;
                        }
                    }
                `
            });

            // Generate final PDF
            await page.pdf({
                path: outputPath,
                format: 'Letter', // 8.5x11 inches
                margin: {
                    top: '0.25in',
                    right: '0.25in',
                    bottom: '0.25in',
                    left: '0.25in'
                },
                printBackground: true,
                preferCSSPageSize: true,
                scale: 1.0
            });
            
            console.log('✅ PDF generated successfully with break analysis');
            
            // Close the page
            await page.close();
            
        } catch (error) {
            console.error('❌ Error generating page:', error);
            throw error;
        }
    }

    async detectBrokenElements(page) {
        // First, simulate the actual PDF page breaks by taking a screenshot and analyzing
        const tempPdfPath = 'temp-analysis.pdf';
        
        await page.pdf({
            path: tempPdfPath,
            format: 'Letter',
            margin: {
                top: '0.25in',
                right: '0.25in',
                bottom: '0.25in',
                left: '0.25in'
            },
            printBackground: true,
            preferCSSPageSize: true,
            scale: 1.0
        });
        
        // Load the PDF and check actual page count
        const pdfBytes = await fs.readFile(tempPdfPath);
        const PDFDocument = require('pdf-lib').PDFDocument;
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();
        
        // Clean up temp file
        await fs.unlink(tempPdfPath);
        
        // If we have more than 2 pages, definitely something is broken
        // Or detect elements that might be split using more accurate viewport measurements
        return await page.evaluate((actualPageCount) => {
            const brokenElements = [];
            
            // Get accurate viewport and page dimensions
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Estimate content per page based on actual PDF output
            const estimatedPageHeight = documentHeight / actualPageCount;
            
            // Check inline-fields for splitting issues
            const inlineFields = document.querySelectorAll('.inline-fields');
            inlineFields.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                const elementBottom = elementTop + rect.height;
                
                // Check if element crosses estimated page boundaries
                for (let pageNum = 1; pageNum < actualPageCount; pageNum++) {
                    const pageBreakPosition = pageNum * estimatedPageHeight;
                    
                    if (elementTop < pageBreakPosition && elementBottom > pageBreakPosition) {
                        // Additional check: see if children are actually being split
                        const spans = element.querySelectorAll('span');
                        if (spans.length > 1) {
                            brokenElements.push({
                                type: 'inline-fields',
                                index: index,
                                elementTop: elementTop,
                                elementBottom: elementBottom,
                                pageBreakAt: pageBreakPosition,
                                selector: `.inline-fields:nth-of-type(${index + 1})`,
                                childCount: spans.length
                            });
                            
                            console.log(`Detected broken inline-fields #${index} crossing page boundary at ${pageBreakPosition}px`);
                        }
                        break;
                    }
                }
            });
            
            // Also check for any elements with text that appears to be cut off
            const textElements = document.querySelectorAll('strong, span');
            textElements.forEach((element, index) => {
                const text = element.textContent.trim();
                // Look for text that seems incomplete (like "O ti l l l" from the PDF)
                if (text.length > 5 && /^[A-Za-z]\s+[a-z]\s*[a-z]/.test(text)) {
                    brokenElements.push({
                        type: 'broken-text',
                        index: index,
                        text: text,
                        element: element.outerHTML.substring(0, 100)
                    });
                    
                    console.log(`Detected broken text: "${text}"`);
                }
            });
            
            return brokenElements;
        }, pageCount);
    }

    applyBreakFixes(htmlContent, brokenElements) {
        let fixedContent = htmlContent;
        
        // For each broken element, convert inline to vertical layout
        brokenElements.forEach(element => {
            if (element.type === 'inline-fields') {
                console.log(`🔧 Fixing broken inline-fields at index ${element.index}`);
                
                // Add CSS to convert specific inline-fields to vertical when broken
                const fixCSS = `
                    .inline-fields:nth-of-type(${element.index + 1}) {
                        display: block !important;
                    }
                    .inline-fields:nth-of-type(${element.index + 1}) > span {
                        display: block !important;
                        margin: 5px 0 !important;
                    }
                `;
                
                // Insert the fix CSS before closing </style>
                fixedContent = fixedContent.replace(
                    '</style>',
                    `${fixCSS}\n        </style>`
                );
            }
        });
        
        return fixedContent;
    }

    async verifyPageCount(pdfPath, expectedPages = 2) {
        try {
            const pdfBytes = await fs.readFile(pdfPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const actualPages = pdfDoc.getPageCount();
            
            console.log(`📄 PDF Page Count: ${actualPages} (expected: ${expectedPages})`);
            
            if (actualPages === expectedPages) {
                console.log('✅ Page count is correct!');
                return true;
            } else {
                console.log(`❌ Page count mismatch! Expected ${expectedPages}, got ${actualPages}`);
                return false;
            }
        } catch (error) {
            console.error('❌ Error verifying page count:', error);
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

// Test with Day 1 content
async function main() {
    const generator = new HTMLPuppeteerWorkbookGenerator();
    
    try {
        const templateData = {
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        };
        
        await generator.generatePage(templateData, 'active-day-1.pdf');
        
        // Verify page count
        const isCorrectPageCount = await generator.verifyPageCount('active-day-1.pdf', 2);
        
        if (isCorrectPageCount) {
            console.log('🎉 Test page generation complete and verified!');
        } else {
            console.log('⚠️ Test page generation complete but page count needs adjustment');
        }
        
    } catch (error) {
        console.error('💥 Generation failed:', error);
    } finally {
        await generator.close();
    }
}

// Export for potential reuse
module.exports = HTMLPuppeteerWorkbookGenerator;

// Run if this file is executed directly
if (require.main === module) {
    main();
}