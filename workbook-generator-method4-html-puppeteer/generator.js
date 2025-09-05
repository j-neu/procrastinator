const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

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
            console.log('📄 Generating page:', outputPath);
            
            // Read the HTML template
            const templatePath = path.join(__dirname, 'template.html');
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            // Create a new page
            const page = await this.browser.newPage();
            
            // Set the viewport for consistent rendering
            await page.setViewport({
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2
            });
            
            // Load the HTML content
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Wait a bit for fonts to load
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generate PDF with high quality settings
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
            
            console.log('✅ PDF generated successfully');
            
            // Close the page
            await page.close();
            
        } catch (error) {
            console.error('❌ Error generating page:', error);
            throw error;
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
            title: 'Day 1: Understanding Your Fear - The Foundation',
            subtitle: 'Avoidance Procrastinator Workbook',
            focus: 'Identify the specific fears driving your avoidance patterns',
            time: '20 minutes',
            exercise: 'Fear Inventory'
        };
        
        await generator.generatePage(templateData, 'test-day-1.pdf');
        
        console.log('🎉 Test page generation complete!');
        
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