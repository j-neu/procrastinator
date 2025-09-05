// Workbook Generator using Canvas + jsPDF
class WorkbookGenerator {
    constructor() {
        this.canvas = document.getElementById('workbook-canvas');
        this.drawer = new CanvasDrawer(this.canvas);
        this.generatedPages = [];
        this.currentPageData = null;
    }

    // Generate a test page to demonstrate functionality
    generateTestPage() {
        this.drawer.clear();
        
        // Page border
        this.drawer.drawPageBorder(30, 2, '#2c3e50');
        
        // Corner decorations
        this.drawer.drawCornerDecorations(30, 15);
        
        // Title
        this.drawer.drawHandDrawnHeading('Test Page - Canvas Method', 60, 80, 24, true);
        
        // Subtitle
        this.drawer.drawHandDrawnText('Demonstrating hand-drawn canvas elements', 60, 110, 16, '#666666');
        
        // Different drawing elements
        let y = 150;
        
        // Checkbox examples
        this.drawer.drawHandDrawnText('✓ Wobbly rectangles and borders:', 60, y, 14, '#333333');
        this.drawer.drawWobblyRect(300, y - 15, 150, 30, 2, '#3498db');
        y += 40;
        
        // Circle example
        this.drawer.drawHandDrawnText('✓ Hand-drawn circles:', 60, y, 14, '#333333');
        this.drawer.drawWobblyCircle(375, y - 5, 20, 2, '#e74c3c');
        y += 40;
        
        // Arrow example
        this.drawer.drawHandDrawnText('✓ Sketchy arrows:', 60, y, 14, '#333333');
        this.drawer.drawWobblyArrow(300, y - 5, 400, y - 5, 12, 2, '#27ae60');
        y += 40;
        
        // Checkbox examples
        this.drawer.drawHandDrawnText('✓ Interactive checkboxes:', 60, y, 14, '#333333');
        this.drawer.drawCheckbox(300, y - 15, 18, false, 2);
        this.drawer.drawCheckbox(330, y - 15, 18, true, 2);
        y += 40;
        
        // Writing lines
        this.drawer.drawHandDrawnText('✓ Writing lines for exercises:', 60, y, 14, '#333333');
        for (let i = 0; i < 3; i++) {
            this.drawer.drawWritingLine(60, y + 20 + (i * 25), 500, y + 20 + (i * 25), 5, '#cccccc');
        }
        y += 100;
        
        // Sample text blocks
        this.drawer.drawHandDrawnText('✓ Natural text rendering with slight randomness', 60, y, 14, '#333333');
        y += 30;
        
        const sampleText = 'This text demonstrates how individual characters are positioned with subtle';
        this.drawer.drawHandDrawnText(sampleText, 60, y, 12, '#666666');
        y += 20;
        this.drawer.drawHandDrawnText('variations to create a more authentic hand-drawn appearance.', 60, y, 12, '#666666');
        
        // Footer
        this.drawer.drawHandDrawnText('Generated with HTML Canvas + jsPDF Method 3', 60, this.canvas.height - 60, 10, '#999999');
        
        console.log('Test page generated successfully');
    }

    // Generate actual workbook page from content
    generateWorkbookPage(dayNumber = 1, title = 'Sample Exercise', content = {}) {
        this.drawer.clear();
        
        // Page setup
        const margin = 40;
        const contentWidth = this.canvas.width - (margin * 2);
        
        // Page border and decorations
        this.drawer.drawPageBorder(margin, 2, '#2c3e50');
        this.drawer.drawCornerDecorations(margin, 12);
        
        // Header
        const dayTitle = `Day ${dayNumber}`;
        this.drawer.drawHandDrawnHeading(dayTitle, margin + 10, 80, 20, false);
        this.drawer.drawHandDrawnHeading(title, margin + 10, 110, 18, true);
        
        let currentY = 150;
        
        // Morning check-in section
        this.drawer.drawHandDrawnText('🌅 Morning Check-in', margin + 10, currentY, 16, '#e67e22');
        currentY += 30;
        
        this.drawer.drawHandDrawnText('How are you feeling about today\'s challenge?', margin + 20, currentY, 12, '#333333');
        currentY += 20;
        
        // Rating scale with wobbly circles
        this.drawer.drawHandDrawnText('Energy Level:', margin + 20, currentY, 11, '#666666');
        for (let i = 1; i <= 5; i++) {
            this.drawer.drawWobblyCircle(margin + 120 + (i * 30), currentY - 5, 8, 1.5, '#3498db');
            this.drawer.drawHandDrawnText(i.toString(), margin + 117 + (i * 30), currentY + 2, 10, '#666666');
        }
        currentY += 40;
        
        // Main exercise section
        this.drawer.drawHandDrawnText('📝 Today\'s Exercise', margin + 10, currentY, 16, '#8e44ad');
        currentY += 30;
        
        // Exercise description
        const exerciseText = content.exercise || 'Write down three small fears you\'ve been avoiding and rank them from 1-3:';
        this.drawer.drawHandDrawnText(exerciseText, margin + 20, currentY, 12, '#333333');
        currentY += 30;
        
        // Exercise elements (checkboxes, writing lines, etc.)
        if (content.type === 'list') {
            for (let i = 1; i <= 3; i++) {
                this.drawer.drawHandDrawnText(`${i}.`, margin + 30, currentY, 12, '#333333');
                this.drawer.drawWritingLine(margin + 50, currentY + 5, margin + contentWidth - 20, currentY + 5, 4, '#cccccc');
                currentY += 35;
            }
        } else if (content.type === 'reflection') {
            // Multiple writing lines for reflection
            for (let i = 0; i < 5; i++) {
                this.drawer.drawWritingLine(margin + 20, currentY + (i * 25), margin + contentWidth - 20, currentY + (i * 25), 4, '#cccccc');
            }
            currentY += 140;
        }
        
        // Action step section
        this.drawer.drawHandDrawnText('🎯 Today\'s Courage Action', margin + 10, currentY, 16, '#27ae60');
        currentY += 30;
        
        this.drawer.drawHandDrawnText('One small step I will take today:', margin + 20, currentY, 12, '#333333');
        currentY += 20;
        this.drawer.drawWritingLine(margin + 20, currentY + 5, margin + contentWidth - 20, currentY + 5, 4, '#cccccc');
        currentY += 40;
        
        // Evening reflection
        this.drawer.drawHandDrawnText('🌙 Evening Reflection', margin + 10, currentY, 16, '#e74c3c');
        currentY += 30;
        
        this.drawer.drawHandDrawnText('What did I learn about myself today?', margin + 20, currentY, 12, '#333333');
        currentY += 20;
        
        for (let i = 0; i < 3; i++) {
            this.drawer.drawWritingLine(margin + 20, currentY + (i * 20), margin + contentWidth - 20, currentY + (i * 20), 4, '#cccccc');
        }
        currentY += 80;
        
        // Checkbox for completion
        this.drawer.drawCheckbox(margin + 20, currentY - 15, 16, false, 2);
        this.drawer.drawHandDrawnText('I completed today\'s exercise', margin + 45, currentY, 12, '#333333');
        
        // Footer
        this.drawer.drawHandDrawnText(`Avoidance Procrastinator Workbook - Day ${dayNumber}`, margin + 10, this.canvas.height - 50, 9, '#999999');
        this.drawer.drawHandDrawnText('© 2024 Procrastination Types Explorer', margin + 10, this.canvas.height - 35, 8, '#cccccc');
        
        // Store page data
        this.currentPageData = {
            dayNumber,
            title,
            content,
            timestamp: new Date()
        };
        
        console.log(`Generated workbook page: Day ${dayNumber} - ${title}`);
    }

    // Export current canvas to PDF
    exportToPDF() {
        try {
            // Create jsPDF instance (Letter size: 8.5" x 11" = 612 x 792 pts)
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [612, 792]
            });
            
            // Convert canvas to image data
            const canvasImageData = this.canvas.toDataURL('image/png', 1.0);
            
            // Add image to PDF (full page)
            pdf.addImage(canvasImageData, 'PNG', 0, 0, 612, 792, '', 'FAST');
            
            // Generate filename
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = this.currentPageData 
                ? `avoidance-workbook-day-${this.currentPageData.dayNumber}-${timestamp}.pdf`
                : `canvas-test-page-${timestamp}.pdf`;
            
            // Save PDF
            pdf.save(filename);
            
            console.log(`PDF exported successfully: ${filename}`);
            return filename;
            
        } catch (error) {
            console.error('PDF export failed:', error);
            alert('PDF export failed. Please check the console for details.');
            return null;
        }
    }

    // Generate multiple pages and export as single PDF
    exportMultiPagePDF(pages = []) {
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [612, 792]
            });
            
            let isFirstPage = true;
            
            for (const pageData of pages) {
                // Generate page
                this.generateWorkbookPage(pageData.dayNumber, pageData.title, pageData.content);
                
                if (!isFirstPage) {
                    pdf.addPage();
                }
                
                // Convert canvas to image and add to PDF
                const canvasImageData = this.canvas.toDataURL('image/png', 1.0);
                pdf.addImage(canvasImageData, 'PNG', 0, 0, 612, 792, '', 'FAST');
                
                isFirstPage = false;
            }
            
            // Save multi-page PDF
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `avoidance-workbook-sample-${timestamp}.pdf`;
            pdf.save(filename);
            
            console.log(`Multi-page PDF exported: ${filename}`);
            return filename;
            
        } catch (error) {
            console.error('Multi-page PDF export failed:', error);
            alert('Multi-page PDF export failed. Please check the console for details.');
            return null;
        }
    }

    // Clear canvas
    clearCanvas() {
        this.drawer.clear();
        this.currentPageData = null;
        console.log('Canvas cleared');
    }

    // Evaluate method performance and quality
    evaluateMethod() {
        const evaluation = {
            visualQuality: {
                authenticity: 'High - genuine hand-drawn wobble effect',
                consistency: 'Good - controlled randomness with seed values',
                printQuality: 'High - vector-like precision with canvas rendering'
            },
            layoutControl: {
                precision: 'Excellent - pixel-perfect positioning',
                flexibility: 'High - full programmatic control over elements',
                responsiveness: 'Good - can adapt to different canvas sizes'
            },
            performance: {
                generationSpeed: 'Fast - immediate canvas rendering',
                memoryUsage: 'Moderate - canvas and image data',
                fileSize: 'Good - optimized PNG compression in PDF'
            },
            maintenance: {
                codeComplexity: 'Moderate - custom drawing algorithms',
                extensibility: 'Excellent - modular design for new elements',
                debugging: 'Good - visual feedback on canvas'
            },
            implementation: {
                dependencies: 'Minimal - jsPDF + Canvas API (built-in)',
                browserSupport: 'Excellent - Canvas API widely supported',
                scalability: 'High - can generate many pages efficiently'
            }
        };
        
        console.log('Method 3 Evaluation:', evaluation);
        return evaluation;
    }
}

// Initialize when page loads
let generator;

window.addEventListener('DOMContentLoaded', () => {
    generator = new WorkbookGenerator();
    console.log('Canvas Workbook Generator initialized');
});

// Global functions for buttons
function generateTestPage() {
    generator.generateTestPage();
}

function generateWorkbookPage() {
    // Sample day 1 content
    const sampleContent = {
        type: 'list',
        exercise: 'List three tasks you\'ve been avoiding and rate your fear level (1-10):'
    };
    
    generator.generateWorkbookPage(1, 'Identifying Your Avoidance Patterns', sampleContent);
}

function exportToPDF() {
    generator.exportToPDF();
}

function clearCanvas() {
    generator.clearCanvas();
}

// Generate sample multi-page workbook
function generateSampleWorkbook() {
    const samplePages = [
        {
            dayNumber: 1,
            title: 'Identifying Your Avoidance Patterns',
            content: { type: 'list', exercise: 'List three tasks you\'ve been avoiding:' }
        },
        {
            dayNumber: 2,
            title: 'Understanding Your Fear Response',
            content: { type: 'reflection', exercise: 'Reflect on what happens in your body when you think about these tasks:' }
        },
        {
            dayNumber: 3,
            title: 'Small Steps Forward',
            content: { type: 'list', exercise: 'Break down one avoided task into 3 smaller steps:' }
        }
    ];
    
    generator.exportMultiPagePDF(samplePages);
}