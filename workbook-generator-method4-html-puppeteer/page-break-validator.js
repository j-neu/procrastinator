const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

class PageBreakValidator {
    constructor() {
        this.browser = null;
        this.validationRules = [
            {
                name: 'inline-fields-integrity',
                description: 'Inline form fields must not break across pages',
                selector: '.inline-fields',
                critical: true
            },
            {
                name: 'fillable-box-integrity', 
                description: 'Fillable text boxes must stay complete',
                selector: '.fillable-box',
                critical: true
            },
            {
                name: 'pattern-section-integrity',
                description: 'Pattern recognition sections must stay together',
                selector: '.pattern-section',
                critical: true
            },
            {
                name: 'two-column-integrity',
                description: 'Two-column layouts must not split mid-content',
                selector: '.two-column-container',
                critical: false
            },
            {
                name: 'step-section-integrity',
                description: 'Step sections with numbered circles must stay together',
                selector: '.step-section',
                critical: false
            },
            {
                name: 'commitment-box-integrity',
                description: 'Commitment boxes must not split',
                selector: '.commitment-box',
                critical: true
            }
        ];
    }

    async init() {
        console.log('🔍 Initializing Page Break Validator...');
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    async validateTemplate(templatePath, templateData, outputPath) {
        if (!this.browser) {
            await this.init();
        }

        console.log(`🔍 Validating template: ${templatePath}`);
        
        try {
            // Read and process template
            let htmlContent = await fs.readFile(templatePath, 'utf8');
            
            // Replace template variables
            for (const [key, value] of Object.entries(templateData)) {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                htmlContent = htmlContent.replace(regex, value);
            }
            
            // Create page and load content
            const page = await this.browser.newPage();
            await page.setViewport({
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2
            });
            
            await page.setContent(htmlContent, {
                waitUntil: 'networkidle0'
            });
            
            // Wait for fonts and layout
            await page.evaluate(() => document.fonts.ready);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Run validation tests
            const validationResults = await this.runValidationTests(page);
            
            // Generate PDF for final validation
            await page.pdf({
                path: outputPath,
                format: 'Letter',
                margin: {
                    top: '0.5in',
                    right: '0.5in', 
                    bottom: '0.5in',
                    left: '0.5in'
                },
                printBackground: true,
                preferCSSPageSize: false,
                scale: 1.0
            });
            
            // Validate actual PDF
            const pdfValidation = await this.validateGeneratedPDF(outputPath);
            
            await page.close();
            
            const fullResults = {
                templatePath,
                outputPath,
                timestamp: new Date().toISOString(),
                preGenerationValidation: validationResults,
                pdfValidation: pdfValidation,
                overallScore: this.calculateOverallScore(validationResults, pdfValidation),
                recommendations: this.generateRecommendations(validationResults, pdfValidation)
            };
            
            return fullResults;
            
        } catch (error) {
            console.error(`❌ Validation failed for ${templatePath}:`, error);
            return {
                templatePath,
                error: error.message,
                overallScore: 'ERROR'
            };
        }
    }

    async runValidationTests(page) {
        console.log('🧪 Running validation tests...');
        
        return await page.evaluate((validationRules) => {
            const results = {
                rulePassed: {},
                elementDetails: {},
                layoutMetrics: {},
                issues: []
            };
            
            // Calculate basic layout metrics
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const estimatedPageHeight = 11 * 96; // 11 inches at 96 DPI
            const estimatedPages = Math.ceil(documentHeight / estimatedPageHeight);
            
            results.layoutMetrics = {
                documentHeight,
                viewportHeight,
                estimatedPageHeight,
                estimatedPages,
                contentDensity: documentHeight / estimatedPages
            };
            
            // Test each validation rule
            validationRules.forEach(rule => {
                const elements = document.querySelectorAll(rule.selector);
                results.elementDetails[rule.name] = [];
                results.rulePassed[rule.name] = true;
                
                elements.forEach((element, index) => {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;
                    
                    const elementInfo = {
                        index,
                        selector: rule.selector,
                        height: rect.height,
                        top: elementTop,
                        bottom: elementBottom,
                        pagePosition: Math.floor(elementTop / estimatedPageHeight) + 1,
                        spansMultiplePages: Math.floor(elementTop / estimatedPageHeight) !== Math.floor(elementBottom / estimatedPageHeight)
                    };
                    
                    // Check if element spans multiple pages
                    if (elementInfo.spansMultiplePages) {
                        results.rulePassed[rule.name] = false;
                        results.issues.push({
                            rule: rule.name,
                            severity: rule.critical ? 'CRITICAL' : 'WARNING',
                            message: `${rule.description} - Element ${index} spans pages ${Math.floor(elementTop / estimatedPageHeight) + 1} to ${Math.floor(elementBottom / estimatedPageHeight) + 1}`,
                            element: elementInfo
                        });
                    }
                    
                    // Check for problematic element heights
                    if (rect.height > estimatedPageHeight * 0.8) {
                        results.issues.push({
                            rule: rule.name,
                            severity: 'WARNING',
                            message: `Element ${index} is very tall (${Math.round(rect.height)}px) and may cause layout issues`,
                            element: elementInfo
                        });
                    }
                    
                    // Special checks for inline-fields
                    if (rule.selector === '.inline-fields') {
                        const inlineChildren = element.querySelectorAll('span');
                        if (inlineChildren.length > 1) {
                            // Check if inline children might break
                            inlineChildren.forEach((child, childIndex) => {
                                const childRect = child.getBoundingClientRect();
                                const childTop = childRect.top + window.scrollY;
                                const childBottom = childTop + childRect.height;
                                
                                if (Math.floor(childTop / estimatedPageHeight) !== Math.floor(childBottom / estimatedPageHeight)) {
                                    results.rulePassed[rule.name] = false;
                                    results.issues.push({
                                        rule: rule.name,
                                        severity: 'CRITICAL',
                                        message: `Inline field child ${childIndex} in element ${index} spans pages`,
                                        element: {
                                            ...elementInfo,
                                            childIndex,
                                            childContent: child.textContent.trim()
                                        }
                                    });
                                }
                            });
                        }
                    }
                    
                    results.elementDetails[rule.name].push(elementInfo);
                });
                
                console.log(`${rule.name}: ${results.rulePassed[rule.name] ? 'PASS' : 'FAIL'}`);
            });
            
            // Check for text that looks broken (like "O ti l l" pattern)
            const textElements = document.querySelectorAll('strong, span, p');
            textElements.forEach((element, index) => {
                const text = element.textContent.trim();
                // Pattern to detect broken text with weird spacing
                if (text.length > 5 && /^[A-Za-z]\s+[a-z]\s*[a-z]/.test(text)) {
                    results.issues.push({
                        rule: 'broken-text-detection',
                        severity: 'CRITICAL',
                        message: `Potentially broken text detected: "${text}"`,
                        element: {
                            tagName: element.tagName,
                            index,
                            text: text
                        }
                    });
                }
            });
            
            return results;
            
        }, this.validationRules);
    }

    async validateGeneratedPDF(pdfPath) {
        console.log(`🔍 Validating generated PDF: ${pdfPath}`);
        
        try {
            const pdfBytes = await fs.readFile(pdfPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pageCount = pdfDoc.getPageCount();
            
            return {
                pageCount,
                expectedPages: 2,
                pageCountCorrect: pageCount === 2,
                fileSize: pdfBytes.length,
                fileSizeReasonable: pdfBytes.length < 10 * 1024 * 1024, // Less than 10MB
                created: true
            };
            
        } catch (error) {
            console.error('❌ PDF validation failed:', error);
            return {
                created: false,
                error: error.message
            };
        }
    }

    calculateOverallScore(preValidation, pdfValidation) {
        if (!preValidation || !pdfValidation || !pdfValidation.created) {
            return 'ERROR';
        }
        
        const criticalIssues = preValidation.issues.filter(issue => issue.severity === 'CRITICAL');
        const warningIssues = preValidation.issues.filter(issue => issue.severity === 'WARNING');
        
        // Score deduction logic
        let score = 100;
        score -= criticalIssues.length * 25; // 25 points per critical issue
        score -= warningIssues.length * 5;   // 5 points per warning
        
        if (!pdfValidation.pageCountCorrect) {
            score -= 20; // 20 points for wrong page count
        }
        
        if (!pdfValidation.fileSizeReasonable) {
            score -= 10; // 10 points for unreasonable file size
        }
        
        // Convert to grade
        if (score >= 90) return 'EXCELLENT';
        if (score >= 80) return 'GOOD';
        if (score >= 70) return 'ACCEPTABLE';
        if (score >= 60) return 'NEEDS_IMPROVEMENT';
        return 'FAIL';
    }

    generateRecommendations(preValidation, pdfValidation) {
        const recommendations = [];
        
        if (!preValidation || !pdfValidation) {
            return ['Unable to generate recommendations due to validation errors'];
        }
        
        const criticalIssues = preValidation.issues.filter(issue => issue.severity === 'CRITICAL');
        const warningIssues = preValidation.issues.filter(issue => issue.severity === 'WARNING');
        
        if (criticalIssues.length > 0) {
            recommendations.push('🚨 CRITICAL: Fix page-breaking elements before production use');
            criticalIssues.forEach(issue => {
                recommendations.push(`   - ${issue.message}`);
            });
        }
        
        if (warningIssues.length > 0) {
            recommendations.push('⚠️ WARNINGS: Consider addressing these layout issues');
            warningIssues.slice(0, 3).forEach(issue => { // Limit to first 3 warnings
                recommendations.push(`   - ${issue.message}`);
            });
        }
        
        if (!pdfValidation.pageCountCorrect) {
            recommendations.push(`📄 PAGE COUNT: Expected 2 pages, got ${pdfValidation.pageCount}. Adjust content or layout.`);
        }
        
        if (preValidation.layoutMetrics.contentDensity > 1000) {
            recommendations.push('📏 DENSITY: Content density is high. Consider reducing text or increasing spacing.');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('✅ No major issues detected. Template appears ready for production.');
        }
        
        return recommendations;
    }

    async runFullTestSuite() {
        console.log('🧪 Running full page break prevention test suite...');
        
        const testData = {
            title: 'Day 1: Comprehensive Page Break Test',
            subtitle: 'Validation Test Suite',
            focus: 'Ensure all elements render correctly without breaking',
            time: '20 minutes',
            exercise: 'Page Break Prevention Validation'
        };
        
        const tests = [
            {
                name: 'Original Template',
                templatePath: path.join(__dirname, 'active-day-1-template.html'),
                outputPath: 'test-original-template.pdf'
            },
            {
                name: 'Fixed Template',
                templatePath: path.join(__dirname, 'active-day-1-template-fixed.html'),
                outputPath: 'test-fixed-template.pdf'
            }
        ];
        
        const results = {};
        
        for (const test of tests) {
            console.log(`\n🔍 Testing: ${test.name}`);
            try {
                results[test.name] = await this.validateTemplate(
                    test.templatePath,
                    testData,
                    test.outputPath
                );
                
                console.log(`📊 ${test.name} Score: ${results[test.name].overallScore}`);
                
                if (results[test.name].recommendations) {
                    results[test.name].recommendations.forEach(rec => {
                        console.log(`   ${rec}`);
                    });
                }
                
            } catch (error) {
                console.error(`❌ ${test.name} failed:`, error.message);
                results[test.name] = { error: error.message, overallScore: 'ERROR' };
            }
        }
        
        // Generate comparison report
        const report = {
            timestamp: new Date().toISOString(),
            testResults: results,
            summary: this.generateTestSummary(results)
        };
        
        // Save detailed report
        await fs.writeFile('page-break-validation-report.json', JSON.stringify(report, null, 2));
        
        console.log('\n📊 TEST SUITE COMPLETE');
        console.log('📁 Detailed report saved to: page-break-validation-report.json');
        
        return report;
    }

    generateTestSummary(results) {
        const summary = {
            testsRun: Object.keys(results).length,
            passed: 0,
            failed: 0,
            improvements: []
        };
        
        Object.entries(results).forEach(([testName, result]) => {
            if (result.overallScore && !['ERROR', 'FAIL'].includes(result.overallScore)) {
                summary.passed++;
            } else {
                summary.failed++;
            }
        });
        
        // Compare original vs fixed if both exist
        if (results['Original Template'] && results['Fixed Template']) {
            const original = results['Original Template'];
            const fixed = results['Fixed Template'];
            
            if (fixed.overallScore !== 'ERROR' && original.overallScore === 'ERROR') {
                summary.improvements.push('Fixed template successfully generates PDF while original fails');
            }
            
            if (fixed.pdfValidation?.pageCountCorrect && !original.pdfValidation?.pageCountCorrect) {
                summary.improvements.push('Fixed template has correct page count');
            }
            
            const originalCritical = original.preGenerationValidation?.issues?.filter(i => i.severity === 'CRITICAL').length || 0;
            const fixedCritical = fixed.preGenerationValidation?.issues?.filter(i => i.severity === 'CRITICAL').length || 0;
            
            if (fixedCritical < originalCritical) {
                summary.improvements.push(`Reduced critical issues from ${originalCritical} to ${fixedCritical}`);
            }
        }
        
        return summary;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔚 Page Break Validator closed');
        }
    }
}

// Run validation if executed directly
async function main() {
    const validator = new PageBreakValidator();
    
    try {
        await validator.runFullTestSuite();
    } catch (error) {
        console.error('💥 Test suite failed:', error);
    } finally {
        await validator.close();
    }
}

module.exports = PageBreakValidator;

if (require.main === module) {
    main();
}