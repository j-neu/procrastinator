const puppeteer = require('puppeteer');
const path = require('path');

async function generateCoverPDF() {
    console.log('🎨 Starting cover PDF generation...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set high quality settings for print
        await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 }); // 8.5x11 inches at 96 DPI

        console.log('📄 Generating front cover...');

        // Generate front cover
        const frontCoverPath = path.resolve(__dirname, 'passive-procrastinator-cover.html');
        await page.goto(`file://${frontCoverPath}`, { waitUntil: 'networkidle0' });

        const frontCoverPDF = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: {
                top: '0.25in',
                right: '0.25in',
                bottom: '0.25in',
                left: '0.25in'
            },
            preferCSSPageSize: true
        });

        // Save front cover
        require('fs').writeFileSync(
            path.resolve(__dirname, 'passive-procrastinator-front-cover.pdf'),
            frontCoverPDF
        );
        console.log('✅ Front cover saved: passive-procrastinator-front-cover.pdf');

        console.log('📄 Generating back cover...');

        // Generate back cover
        const backCoverPath = path.resolve(__dirname, 'passive-procrastinator-back-cover.html');
        await page.goto(`file://${backCoverPath}`, { waitUntil: 'networkidle0' });

        const backCoverPDF = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: {
                top: '0.25in',
                right: '0.25in',
                bottom: '0.25in',
                left: '0.25in'
            },
            preferCSSPageSize: true
        });

        // Save back cover
        require('fs').writeFileSync(
            path.resolve(__dirname, 'passive-procrastinator-back-cover.pdf'),
            backCoverPDF
        );
        console.log('✅ Back cover saved: passive-procrastinator-back-cover.pdf');

        console.log('🎯 Cover generation complete!');
        console.log('');
        console.log('📁 Generated files:');
        console.log('   • passive-procrastinator-front-cover.pdf');
        console.log('   • passive-procrastinator-back-cover.pdf');
        console.log('');
        console.log('💡 Next steps:');
        console.log('   1. Review the covers for visual quality');
        console.log('   2. Test print on physical paper');
        console.log('   3. Apply same design approach to other workbook types');

    } catch (error) {
        console.error('❌ Error generating cover PDFs:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Run the generator
generateCoverPDF().catch(console.error);