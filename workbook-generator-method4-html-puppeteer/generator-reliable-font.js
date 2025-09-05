const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ReliableFontGenerator {
    constructor() {
        this.browser = null;
    }

    async init() {
        console.log('🚀 Launching browser with PDF-optimized settings...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=TranslateUI',
                '--disable-extensions',
                '--no-first-run',
                '--disable-default-apps',
                '--font-render-hinting=none',
                '--disable-font-subpixel-positioning',
                '--disable-gpu-compositing',
                // Force text to be rendered as shapes for PDF reliability
                '--force-color-profile=srgb',
                '--enable-font-antialiasing'
            ]
        });
    }

    async generatePage(templateData, outputPath) {
        if (!this.browser) {
            await this.init();
        }

        try {
            console.log('📄 Generating PDF with reliable font rendering:', outputPath);
            
            const templatePath = path.join(__dirname, 'template-reliable-font.html');
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            const page = await this.browser.newPage();
            
            // Set A5 viewport with high quality
            await page.setViewport({
                width: 420,
                height: 595,
                deviceScaleFactor: 1  // Lower DPI to avoid font issues
            });
            
            // Disable JavaScript to prevent any interference
            await page.setJavaScriptEnabled(false);
            
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0',
                timeout: 15000
            });
            
            // Force font loading completion
            await page.evaluate(() => {
                return new Promise((resolve) => {
                    if (document.fonts) {
                        document.fonts.ready.then(resolve);
                    } else {
                        // Fallback for older browsers
                        setTimeout(resolve, 1000);
                    }
                });
            });
            
            // Additional wait for layout
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Add PDF-specific optimizations
            await page.addStyleTag({
                content: `
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            -webkit-font-smoothing: antialiased !important;
                            -moz-osx-font-smoothing: grayscale !important;
                        }
                        
                        /* Force text to render cleanly */
                        body, h1, h2, h3, p, li, span, strong, em {
                            font-feature-settings: normal !important;
                            text-rendering: geometricPrecision !important;
                            font-variant-ligatures: none !important;
                            font-kerning: none !important;
                        }
                    }
                `
            });

            // Generate PDF with maximum compatibility
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
                preferCSSPageSize: false,
                scale: 1.0,
                displayHeaderFooter: false,
                // Use embedded fonts for better compatibility
                omitBackground: false,
                quality: 100
            });
            
            console.log('✅ Reliable font PDF generated successfully');
            await page.close();
            
        } catch (error) {
            console.error('❌ Error generating reliable font PDF:', error);
            throw error;
        }
    }

    async verifyTextIntegrity(pdfPath) {
        try {
            const stats = await fs.stat(pdfPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`📄 PDF Size: ${sizeKB} KB`);
            
            // Read a small portion to verify it's a valid PDF
            const buffer = await fs.readFile(pdfPath);
            const header = buffer.subarray(0, 8).toString();
            
            if (header.startsWith('%PDF-')) {
                console.log('✅ PDF header is valid');
                
                // Check if the PDF contains expected text (very basic check)
                const content = buffer.toString('utf8');
                const hasExpectedText = content.includes('Day 1') && content.includes('Strategic');
                
                if (hasExpectedText) {
                    console.log('✅ PDF appears to contain expected text content');
                    return true;
                } else {
                    console.log('⚠️  PDF may have text rendering issues');
                    return false;
                }
            } else {
                console.log('❌ Invalid PDF format');
                return false;
            }
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

async function main() {
    const generator = new ReliableFontGenerator();
    
    try {
        const templateData = {
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        };
        
        const outputFile = 'day-1-reliable-font.pdf';
        console.log('🎯 Testing reliable font rendering...');
        
        await generator.generatePage(templateData, outputFile);
        
        const isValid = await generator.verifyTextIntegrity(outputFile);
        
        if (isValid) {
            console.log('');
            console.log('🎉 RELIABLE FONT WORKBOOK GENERATED!');
            console.log(`📂 Output: ${outputFile}`);
            console.log('');
            console.log('✅ Font Reliability Improvements:');
            console.log('   • System fonts (Segoe Print, Bradley Hand) instead of Google Fonts');
            console.log('   • Disabled font subpixel positioning');
            console.log('   • Optimized text rendering settings');
            console.log('   • PDF-safe font feature settings');
            console.log('   • A5 format optimized');
            console.log('   • Modular sections with proper breaks');
            console.log('');
            console.log('📋 Please check if text corruption is resolved!');
        } else {
            console.log('⚠️  PDF generated but text integrity needs manual verification');
        }
        
    } catch (error) {
        console.error('💥 Generation failed:', error);
    } finally {
        await generator.close();
    }
}

module.exports = ReliableFontGenerator;

if (require.main === module) {
    main();
}