const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

class ImprovedWorkbookGenerator {
    constructor() {
        this.browser = null;
        this.testResults = {
            pageBreakTests: [],
            contentFittingTests: [],
            validationErrors: []
        };
    }

    async init() {
        console.log('🚀 Launching browser with enhanced page break handling...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
    }

    async generatePageWithBreakProtection(templateData, outputPath, templateName = 'active-day-1-template-fixed.html') {
        if (!this.browser) {
            await this.init();
        }

        try {
            console.log('📄 Generating page with enhanced break protection:', outputPath);
            
            // Read the fixed HTML template
            const templatePath = path.join(__dirname, templateName);
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            // Create a new page with optimized settings
            const page = await this.browser.newPage();
            
            // Set the viewport for consistent rendering
            await page.setViewport({
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2
            });
            
            // Load content and wait for fonts
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Wait for fonts to load properly
            await page.evaluate(() => {
                return document.fonts.ready;
            });
            
            // Additional wait for layout stabilization
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Run comprehensive page break analysis
            const breakAnalysis = await this.runPageBreakAnalysis(page);
            console.log('🔍 Page break analysis:', breakAnalysis);
            
            // Add enhanced print CSS for final generation
            await page.addStyleTag({
                content: `
                    @media print {
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        /* Force break avoidance on critical elements */
                        .inline-fields,
                        .pattern-section,
                        .pattern-recognition-box,
                        .two-column-container,
                        .step-section,
                        .exercise-section,
                        .commitment-box,
                        .reflection-section {
                            break-inside: avoid !important;
                            page-break-inside: avoid !important;
                            overflow: visible !important;
                        }
                        
                        /* Enhanced orphan/widow control */
                        p, div, span {
                            orphans: 3 !important;
                            widows: 3 !important;
                        }
                        
                        /* Ensure inline elements don't break */
                        .inline-fields > * {
                            break-inside: avoid !important;
                            page-break-inside: avoid !important;
                            white-space: nowrap !important;
                        }
                    }
                `
            });

            // Generate final PDF with optimized settings
            await page.pdf({
                path: outputPath,
                format: 'Letter', // 8.5x11 inches
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in'
                },
                printBackground: true,
                preferCSSPageSize: false, // Use our format instead
                scale: 1.0,
                displayHeaderFooter: false,
                tagged: false // Disable accessibility tags that can cause layout issues
            });
            
            console.log('✅ PDF generated successfully with break protection');
            
            // Run post-generation validation
            const validationResults = await this.validatePDF(outputPath, breakAnalysis);
            
            // Close the page
            await page.close();
            
            return {
                success: true,
                breakAnalysis,
                validationResults,
                outputPath
            };
            
        } catch (error) {
            console.error('❌ Error generating page:', error);
            throw error;
        }
    }

    async runPageBreakAnalysis(page) {
        console.log('🔍 Running comprehensive page break analysis...');
        
        return await page.evaluate(() => {
            const analysis = {
                potentialBreaks: [],
                criticalElements: [],
                layoutMetrics: {}
            };
            
            // Get page dimensions
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            analysis.layoutMetrics = {
                documentHeight,
                viewportHeight,
                estimatedPages: Math.ceil(documentHeight / (11 * 96)) // 11 inches * 96 DPI
            };
            
            // Check all critical elements that shouldn't break
            const criticalSelectors = [
                '.inline-fields',
                '.pattern-section',
                '.pattern-recognition-box',
                '.two-column-container',
                '.step-section',
                '.exercise-section .fillable-box',
                '.commitment-box',
                '.reflection-section'
            ];
            
            criticalSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    const rect = element.getBoundingClientRect();
                    const elementInfo = {
                        selector,
                        index,
                        height: rect.height,
                        top: rect.top + window.scrollY,
                        bottom: rect.top + window.scrollY + rect.height,
                        hasInlineChildren: element.querySelector('.fillable-line, .rating-line') !== null,
                        childCount: element.children.length
                    };
                    
                    // Check if element is unusually tall (might cause problems)
                    if (rect.height > 500) {
                        analysis.potentialBreaks.push({
                            ...elementInfo,
                            issue: 'Element too tall for single page',
                            severity: 'high'
                        });
                    }
                    
                    // Check if element has complex inline content
                    if (elementInfo.hasInlineChildren && rect.height > 100) {
                        analysis.potentialBreaks.push({
                            ...elementInfo,
                            issue: 'Complex inline content at risk',
                            severity: 'medium'
                        });
                    }
                    
                    analysis.criticalElements.push(elementInfo);
                });
            });
            
            // Check for problematic text patterns
            const textElements = document.querySelectorAll('strong, span');
            textElements.forEach((element, index) => {
                const text = element.textContent.trim();
                // Look for text that might be breaking (like "O ti l l" pattern from image)
                if (text.length > 3 && /^[A-Za-z]\s+[a-z]\s*[a-z]/.test(text)) {
                    analysis.potentialBreaks.push({
                        selector: element.tagName + ':nth-child(' + index + ')',
                        issue: 'Potentially broken text: "' + text + '"',
                        severity: 'high',
                        text: text
                    });
                }
            });
            
            return analysis;
        });
    }

    async validatePDF(pdfPath, breakAnalysis) {
        console.log('🔍 Validating PDF structure and content...');
        
        try {
            const pdfBytes = await fs.readFile(pdfPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pageCount = pdfDoc.getPageCount();
            
            const validation = {
                pageCount,
                expectedPages: 2,
                pageCountCorrect: pageCount === 2,
                fileSize: pdfBytes.length,
                fileSizeOK: pdfBytes.length < 50 * 1024 * 1024, // Less than 50MB
                breakAnalysisScore: this.calculateBreakScore(breakAnalysis)
            };
            
            // Add specific validations
            validation.issues = [];
            
            if (!validation.pageCountCorrect) {
                validation.issues.push({
                    type: 'page_count',
                    message: `Expected 2 pages, got ${pageCount}`,
                    severity: 'high'
                });
            }
            
            if (!validation.fileSizeOK) {
                validation.issues.push({
                    type: 'file_size',
                    message: `File size too large: ${Math.round(validation.fileSize / 1024 / 1024)}MB`,
                    severity: 'medium'
                });
            }
            
            if (validation.breakAnalysisScore < 0.8) {
                validation.issues.push({
                    type: 'break_analysis',
                    message: `Page break analysis score low: ${validation.breakAnalysisScore.toFixed(2)}`,
                    severity: 'medium'
                });
            }
            
            // Overall validation score
            validation.overallScore = validation.pageCountCorrect && 
                                    validation.fileSizeOK && 
                                    validation.breakAnalysisScore > 0.7 ? 'PASS' : 'FAIL';
            
            console.log(`📊 PDF Validation: ${validation.overallScore}`);
            console.log(`   Pages: ${validation.pageCount}/${validation.expectedPages}`);
            console.log(`   Size: ${Math.round(validation.fileSize / 1024)}KB`);
            console.log(`   Break Score: ${validation.breakAnalysisScore.toFixed(2)}`);
            
            return validation;
            
        } catch (error) {
            console.error('❌ Error validating PDF:', error);
            return {
                overallScore: 'ERROR',
                error: error.message
            };
        }
    }

    calculateBreakScore(breakAnalysis) {
        if (!breakAnalysis || !breakAnalysis.potentialBreaks) {
            return 1.0; // No analysis available, assume OK
        }
        
        let score = 1.0;
        
        // Deduct points for each potential break issue
        breakAnalysis.potentialBreaks.forEach(issue => {
            switch (issue.severity) {
                case 'high':
                    score -= 0.3;
                    break;
                case 'medium':
                    score -= 0.1;
                    break;
                case 'low':
                    score -= 0.05;
                    break;
            }
        });
        
        return Math.max(0, score);
    }

    async runComprehensiveTests() {
        console.log('🧪 Running comprehensive page break prevention tests...');
        
        const testTemplateData = {
            title: 'Day 1: Test Content with Potential Break Issues',
            subtitle: 'Page Break Prevention Test Suite',
            focus: 'Validate that all form elements stay together across page boundaries',
            time: '20 minutes',
            exercise: 'Comprehensive Break Prevention Test'
        };
        
        try {
            // Test with the fixed template
            const fixedResults = await this.generatePageWithBreakProtection(
                testTemplateData, 
                'test-fixed-breaks.pdf',
                'active-day-1-template-fixed.html'
            );
            
            // Test with the original template for comparison
            let originalResults;
            try {
                originalResults = await this.generatePageWithBreakProtection(
                    testTemplateData,
                    'test-original-breaks.pdf',
                    'active-day-1-template.html'
                );
            } catch (error) {
                console.log('⚠️ Original template test failed (expected):', error.message);
                originalResults = { success: false, error: error.message };
            }
            
            // Generate test report
            const testReport = {
                timestamp: new Date().toISOString(),
                fixedTemplate: fixedResults,
                originalTemplate: originalResults,
                improvements: this.calculateImprovements(fixedResults, originalResults)
            };
            
            // Save test report
            await fs.writeFile('page-break-test-report.json', JSON.stringify(testReport, null, 2));
            
            console.log('📊 Test Results Summary:');
            console.log(`   Fixed Template Score: ${fixedResults.validationResults?.overallScore || 'N/A'}`);
            console.log(`   Original Template Score: ${originalResults.validationResults?.overallScore || 'FAILED'}`);
            
            return testReport;
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            throw error;
        }
    }

    calculateImprovements(fixedResults, originalResults) {
        const improvements = {
            pageCountImproved: false,
            breakScoreImproved: false,
            fileSizeImproved: false,
            overallImprovement: false
        };
        
        if (fixedResults.validationResults && originalResults.validationResults) {
            const fixed = fixedResults.validationResults;
            const original = originalResults.validationResults;
            
            improvements.pageCountImproved = fixed.pageCountCorrect && !original.pageCountCorrect;
            improvements.breakScoreImproved = fixed.breakAnalysisScore > original.breakAnalysisScore;
            improvements.fileSizeImproved = fixed.fileSize < original.fileSize;
            improvements.overallImprovement = fixed.overallScore === 'PASS' && original.overallScore !== 'PASS';
        }
        
        return improvements;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔚 Browser closed');
        }
    }
}

// Test the improved generator
async function main() {
    const generator = new ImprovedWorkbookGenerator();
    
    try {
        // Run comprehensive tests
        const testReport = await generator.runComprehensiveTests();
        
        // Generate the actual working version
        const templateData = {
            title: 'Day 1: Understanding Your Strategic Approach',
            subtitle: 'Active Procrastinator Workbook',
            focus: 'Map your unique pressure-performance patterns',
            time: '20 minutes',
            exercise: 'Strategic Delay Assessment'
        };
        
        const productionResult = await generator.generatePageWithBreakProtection(
            templateData, 
            'active-day-1-FIXED.pdf',
            'active-day-1-template-fixed.html'
        );
        
        console.log('🎉 Production PDF generated successfully!');
        console.log('📁 Check these files:');
        console.log('   - active-day-1-FIXED.pdf (production version)');
        console.log('   - test-fixed-breaks.pdf (test with fixed template)');
        console.log('   - test-original-breaks.pdf (test with original template)');
        console.log('   - page-break-test-report.json (detailed test results)');
        
    } catch (error) {
        console.error('💥 Generation failed:', error);
    } finally {
        await generator.close();
    }
}

// Export for potential reuse
module.exports = ImprovedWorkbookGenerator;

// Run if this file is executed directly
if (require.main === module) {
    main();
}