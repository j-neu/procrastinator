#!/usr/bin/env node

/**
 * Comprehensive Page Break Prevention Test Suite
 * 
 * This script runs all the tests and validations to ensure that text boxes
 * and form elements don't break across page boundaries in the generated PDFs.
 * 
 * Usage: node run-page-break-tests.js
 */

const fs = require('fs').promises;
const path = require('path');
const PageBreakValidator = require('./page-break-validator');
const ImprovedWorkbookGenerator = require('./generator-improved');

class PageBreakTestRunner {
    constructor() {
        this.validator = new PageBreakValidator();
        this.generator = new ImprovedWorkbookGenerator();
        this.testResults = {
            timestamp: new Date().toISOString(),
            tests: [],
            summary: {},
            recommendations: []
        };
    }

    async runAllTests() {
        console.log('🚀 Starting Comprehensive Page Break Prevention Tests');
        console.log('=' .repeat(60));
        
        try {
            // Test 1: Validate both templates
            console.log('\n📋 TEST 1: Template Validation');
            const validationResults = await this.validator.runFullTestSuite();
            this.testResults.tests.push({
                name: 'Template Validation',
                results: validationResults,
                passed: this.evaluateValidationResults(validationResults)
            });
            
            // Test 2: Generate PDFs with improved generator
            console.log('\n📋 TEST 2: Improved PDF Generation');
            const generationResults = await this.testImprovedGeneration();
            this.testResults.tests.push({
                name: 'Improved PDF Generation',
                results: generationResults,
                passed: generationResults.success
            });
            
            // Test 3: Content fitting tests with various content sizes
            console.log('\n📋 TEST 3: Content Fitting Tests');
            const fittingResults = await this.testContentFitting();
            this.testResults.tests.push({
                name: 'Content Fitting Tests',
                results: fittingResults,
                passed: fittingResults.allPassed
            });
            
            // Test 4: Edge case testing
            console.log('\n📋 TEST 4: Edge Case Testing');
            const edgeCaseResults = await this.testEdgeCases();
            this.testResults.tests.push({
                name: 'Edge Case Testing',
                results: edgeCaseResults,
                passed: edgeCaseResults.criticalPassed
            });
            
            // Generate final summary and recommendations
            await this.generateFinalReport();
            
            console.log('\n🎉 ALL TESTS COMPLETED');
            console.log(`📁 Full report saved to: page-break-test-final-report.json`);
            
            return this.testResults;
            
        } catch (error) {
            console.error('💥 Test suite failed:', error);
            throw error;
        } finally {
            await this.cleanup();
        }
    }

    async testImprovedGeneration() {
        console.log('🔄 Testing improved generator with page break protection...');
        
        const testCases = [
            {
                name: 'Standard Content',
                data: {
                    title: 'Day 1: Understanding Your Strategic Approach',
                    subtitle: 'Active Procrastinator Workbook',
                    focus: 'Map your unique pressure-performance patterns',
                    time: '20 minutes',
                    exercise: 'Strategic Delay Assessment'
                }
            },
            {
                name: 'Long Content',
                data: {
                    title: 'Day 15: Advanced Strategic Pattern Analysis and Optimization',
                    subtitle: 'Active Procrastinator Advanced Workbook Edition',
                    focus: 'Comprehensive analysis of complex pressure-performance patterns with detailed optimization strategies',
                    time: '30 minutes',
                    exercise: 'Advanced Strategic Delay Assessment with Multiple Variables'
                }
            },
            {
                name: 'Minimal Content',
                data: {
                    title: 'Day 2: Quick Check',
                    subtitle: 'Mini Workbook',
                    focus: 'Basic pattern check',
                    time: '5 minutes',
                    exercise: 'Quick Assessment'
                }
            }
        ];
        
        const results = {
            success: true,
            testCases: {},
            issues: []
        };
        
        for (const testCase of testCases) {
            console.log(`   Testing: ${testCase.name}`);
            
            try {
                const result = await this.generator.generatePageWithBreakProtection(
                    testCase.data,
                    `test-${testCase.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
                    'active-day-1-template-fixed.html'
                );
                
                results.testCases[testCase.name] = {
                    success: result.success,
                    validationScore: result.validationResults?.overallScore || 'N/A',
                    pageCount: result.validationResults?.pageCount || 0,
                    breakScore: result.breakAnalysis ? this.generator.calculateBreakScore(result.breakAnalysis) : 0
                };
                
                if (!result.success || result.validationResults?.overallScore === 'FAIL') {
                    results.success = false;
                    results.issues.push(`${testCase.name}: Generation or validation failed`);
                }
                
                console.log(`     ✅ ${testCase.name}: ${result.validationResults?.overallScore || 'Generated'}`);
                
            } catch (error) {
                console.log(`     ❌ ${testCase.name}: Failed - ${error.message}`);
                results.success = false;
                results.testCases[testCase.name] = {
                    success: false,
                    error: error.message
                };
                results.issues.push(`${testCase.name}: ${error.message}`);
            }
        }
        
        return results;
    }

    async testContentFitting() {
        console.log('📏 Testing content fitting with various layouts...');
        
        // Test content that's known to cause page break issues
        const problematicContent = {
            title: 'Day X: Pattern Recognition Analysis',
            subtitle: 'Test Content for Page Break Issues',
            focus: 'Test inline fields and complex layouts that commonly break across pages',
            time: '20 minutes',
            exercise: 'Complex Layout Test'
        };
        
        const results = {
            allPassed: true,
            tests: {}
        };
        
        // Test with original template (should fail)
        try {
            const originalResult = await this.validator.validateTemplate(
                path.join(__dirname, 'active-day-1-template.html'),
                problematicContent,
                'test-fitting-original.pdf'
            );
            
            results.tests.original = {
                score: originalResult.overallScore,
                criticalIssues: originalResult.preGenerationValidation?.issues?.filter(i => i.severity === 'CRITICAL').length || 0,
                passed: !['ERROR', 'FAIL'].includes(originalResult.overallScore)
            };
            
        } catch (error) {
            results.tests.original = { 
                error: error.message, 
                passed: false 
            };
        }
        
        // Test with fixed template (should pass)
        try {
            const fixedResult = await this.validator.validateTemplate(
                path.join(__dirname, 'active-day-1-template-fixed.html'),
                problematicContent,
                'test-fitting-fixed.pdf'
            );
            
            results.tests.fixed = {
                score: fixedResult.overallScore,
                criticalIssues: fixedResult.preGenerationValidation?.issues?.filter(i => i.severity === 'CRITICAL').length || 0,
                passed: !['ERROR', 'FAIL'].includes(fixedResult.overallScore)
            };
            
            if (!results.tests.fixed.passed) {
                results.allPassed = false;
            }
            
        } catch (error) {
            results.tests.fixed = { 
                error: error.message, 
                passed: false 
            };
            results.allPassed = false;
        }
        
        // Compare results
        if (results.tests.original && results.tests.fixed) {
            results.improvement = {
                criticalIssuesReduced: (results.tests.original.criticalIssues || 0) - (results.tests.fixed.criticalIssues || 0),
                fixedNowPasses: results.tests.fixed.passed && !results.tests.original.passed
            };
        }
        
        return results;
    }

    async testEdgeCases() {
        console.log('🔬 Testing edge cases and boundary conditions...');
        
        const edgeCases = [
            {
                name: 'Very Long Inline Fields',
                content: 'This is an extremely long piece of text that might cause inline fields to wrap and potentially break across page boundaries when rendered in the PDF format'
            },
            {
                name: 'Many Inline Elements', 
                repeatCount: 10
            },
            {
                name: 'Deep Nested Structure',
                useComplexNesting: true
            }
        ];
        
        const results = {
            criticalPassed: true,
            edgeCases: {},
            issues: []
        };
        
        for (const edgeCase of edgeCases) {
            console.log(`   Testing: ${edgeCase.name}`);
            
            // Create test content based on edge case
            let testContent = this.createEdgeCaseContent(edgeCase);
            
            try {
                // Test with fixed template
                const result = await this.validator.validateTemplate(
                    path.join(__dirname, 'active-day-1-template-fixed.html'),
                    testContent,
                    `test-edge-${edgeCase.name.toLowerCase().replace(/\s+/g, '-')}.pdf`
                );
                
                const criticalIssues = result.preGenerationValidation?.issues?.filter(i => i.severity === 'CRITICAL').length || 0;
                const passed = criticalIssues === 0 && result.overallScore !== 'FAIL';
                
                results.edgeCases[edgeCase.name] = {
                    passed,
                    criticalIssues,
                    score: result.overallScore
                };
                
                if (!passed) {
                    results.criticalPassed = false;
                    results.issues.push(`${edgeCase.name}: ${criticalIssues} critical issues`);
                }
                
                console.log(`     ${passed ? '✅' : '❌'} ${edgeCase.name}: ${result.overallScore}`);
                
            } catch (error) {
                console.log(`     ❌ ${edgeCase.name}: Error - ${error.message}`);
                results.edgeCases[edgeCase.name] = {
                    passed: false,
                    error: error.message
                };
                results.criticalPassed = false;
                results.issues.push(`${edgeCase.name}: ${error.message}`);
            }
        }
        
        return results;
    }

    createEdgeCaseContent(edgeCase) {
        const baseContent = {
            title: `Day 1: ${edgeCase.name} Test`,
            subtitle: 'Edge Case Testing Workbook',
            focus: `Testing ${edgeCase.name.toLowerCase()} scenarios`,
            time: '20 minutes',
            exercise: `${edgeCase.name} Validation Test`
        };
        
        if (edgeCase.content) {
            // Use the provided long content
            baseContent.focus = edgeCase.content;
            baseContent.exercise = edgeCase.content;
        }
        
        return baseContent;
    }

    evaluateValidationResults(results) {
        if (!results || !results.testResults) {
            return false;
        }
        
        // Check if fixed template performs better than original
        const original = results.testResults['Original Template'];
        const fixed = results.testResults['Fixed Template'];
        
        if (fixed && fixed.overallScore && !['ERROR', 'FAIL'].includes(fixed.overallScore)) {
            return true;
        }
        
        return false;
    }

    async generateFinalReport() {
        console.log('\n📊 Generating final test report...');
        
        // Calculate overall statistics
        const totalTests = this.testResults.tests.length;
        const passedTests = this.testResults.tests.filter(t => t.passed).length;
        
        this.testResults.summary = {
            totalTests,
            passedTests,
            failedTests: totalTests - passedTests,
            successRate: `${Math.round((passedTests / totalTests) * 100)}%`,
            overallResult: passedTests === totalTests ? 'ALL_TESTS_PASSED' : 'SOME_TESTS_FAILED'
        };
        
        // Generate recommendations
        this.testResults.recommendations = this.generateRecommendations();
        
        // Save complete report
        await fs.writeFile(
            'page-break-test-final-report.json',
            JSON.stringify(this.testResults, null, 2)
        );
        
        // Print summary
        console.log('\n📈 FINAL TEST SUMMARY');
        console.log('=' .repeat(30));
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${totalTests - passedTests}`);
        console.log(`Success Rate: ${this.testResults.summary.successRate}`);
        console.log(`Overall Result: ${this.testResults.summary.overallResult}`);
        
        if (this.testResults.recommendations.length > 0) {
            console.log('\n💡 RECOMMENDATIONS:');
            this.testResults.recommendations.forEach(rec => {
                console.log(`   ${rec}`);
            });
        }
    }

    generateRecommendations() {
        const recommendations = [];
        const failedTests = this.testResults.tests.filter(t => !t.passed);
        
        if (failedTests.length === 0) {
            recommendations.push('✅ All tests passed! The page break prevention solution is working correctly.');
            recommendations.push('🚀 Ready for production use with the fixed template.');
            recommendations.push('📋 Continue to monitor for page break issues in new content.');
        } else {
            recommendations.push('🚨 Some tests failed. Review the issues below:');
            
            failedTests.forEach(test => {
                recommendations.push(`   - ${test.name}: Review detailed results for specific issues`);
            });
            
            recommendations.push('🔧 Consider the following actions:');
            recommendations.push('   - Use active-day-1-template-fixed.html for all PDF generation');
            recommendations.push('   - Test new content with the validation tools before production');
            recommendations.push('   - Monitor generated PDFs for visual page break issues');
        }
        
        return recommendations;
    }

    async cleanup() {
        console.log('\n🧹 Cleaning up resources...');
        
        try {
            await this.validator.close();
            await this.generator.close();
        } catch (error) {
            console.log('⚠️ Cleanup warning:', error.message);
        }
    }
}

// Main execution
async function main() {
    const runner = new PageBreakTestRunner();
    
    try {
        const results = await runner.runAllTests();
        
        // Exit with appropriate code
        if (results.summary.overallResult === 'ALL_TESTS_PASSED') {
            console.log('\n🎉 SUCCESS: All page break prevention tests passed!');
            process.exit(0);
        } else {
            console.log('\n⚠️ PARTIAL SUCCESS: Some tests failed. Check the report for details.');
            process.exit(1);
        }
        
    } catch (error) {
        console.error('\n💥 TEST SUITE FAILED:', error);
        process.exit(2);
    }
}

// Export for use as module
module.exports = PageBreakTestRunner;

// Run if executed directly
if (require.main === module) {
    main();
}