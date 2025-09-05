// Avoidance Procrastinator Workbook Content Data
const avoidanceContent = {
    day1: {
        dayNumber: 1,
        title: 'Understanding Your Fear - The Foundation',
        focus: 'Identify the specific fears driving your avoidance patterns',
        timeCommitment: '20 minutes',
        coreExercise: 'Fear Inventory',
        
        morningCheckin: {
            questions: [
                'What am I avoiding today and what fear is driving it?',
                'What is one small step I can take toward a feared task?',
                'How can I show myself compassion around this challenge?'
            ],
            fields: [
                'Fear I\'m experiencing today:',
                'Avoided task:',
                'One small step:'
            ]
        },
        
        mainExercise: {
            purpose: 'Map the specific fears that fuel your procrastination patterns',
            steps: [
                {
                    title: 'Identify Your Current Avoidance (5 minutes)',
                    instruction: 'Think about tasks you\'ve been putting off. List 3-5 specific items:',
                    type: 'numbered_list',
                    count: 5
                },
                {
                    title: 'Dig Deeper Into the Fears (10 minutes)',
                    instruction: 'For each avoided task, complete this framework:',
                    type: 'fear_analysis',
                    count: 2
                }
            ]
        },
        
        commitmentSection: {
            title: 'Single Small Step Commitment (2 minutes)',
            purpose: 'Build momentum with minimal action',
            fields: [
                'My commitment for today:',
                'When I will do it:',
                'How I expect to feel before:'
            ]
        },
        
        eveningReflection: {
            questions: [
                'Did you complete your small step? Yes / No',
                'How did you actually feel during/after?',
                'What did you learn about your fear today?'
            ]
        },
        
        courageThought: 'Every fear I name loses some of its power over me. I am building awareness, not judgment.'
    },
    
    day2: {
        dayNumber: 2,
        title: 'Emotion-Avoidance Connection Tracking',
        focus: 'Notice how emotions trigger your avoidance behaviors',
        timeCommitment: '20 minutes',
        coreExercise: 'Emotion-Behavior Mapping',
        
        morningCheckin: {
            questions: [
                'What emotions am I trying to avoid today?',
                'How does my body feel when I think about difficult tasks?',
                'What would self-compassion look like today?'
            ]
        },
        
        mainExercise: {
            purpose: 'Track the connection between emotions and avoidance behaviors',
            type: 'emotion_tracking',
            timeSlots: ['Morning (9-12pm)', 'Afternoon (12-5pm)', 'Evening (5-9pm)']
        }
    },
    
    day3: {
        dayNumber: 3,
        title: 'Micro-Courage Building',
        focus: 'Take the smallest possible step toward a feared task',
        timeCommitment: '20 minutes',
        coreExercise: 'The 2-Minute Rule in Action',
        
        mainExercise: {
            purpose: 'Build courage through micro-actions',
            type: 'micro_steps',
            instruction: 'Break down one avoided task into impossibly small steps'
        }
    }
};

// Function to generate realistic workbook page with actual content
function generateAvoidanceWorkbookPage(dayNumber) {
    const dayData = avoidanceContent[`day${dayNumber}`];
    if (!dayData) {
        console.error(`No content found for day ${dayNumber}`);
        return;
    }
    
    generator.drawer.clear();
    
    // Page setup
    const margin = 35;
    const contentWidth = generator.canvas.width - (margin * 2);
    
    // Page border and decorations
    generator.drawer.drawPageBorder(margin, 2, '#2c3e50');
    generator.drawer.drawCornerDecorations(margin, 10);
    
    // Header section
    generator.drawer.drawHandDrawnHeading(`Day ${dayData.dayNumber}`, margin + 15, 70, 22, false);
    generator.drawer.drawHandDrawnHeading(dayData.title, margin + 15, 95, 16, true);
    
    // Focus and time commitment
    let currentY = 125;
    generator.drawer.drawHandDrawnText(`Focus: ${dayData.focus}`, margin + 15, currentY, 11, '#666666');
    currentY += 15;
    generator.drawer.drawHandDrawnText(`Time: ${dayData.timeCommitment}`, margin + 15, currentY, 11, '#666666');
    currentY += 25;
    
    // Morning check-in section
    generator.drawer.drawHandDrawnText('🌅 Morning Check-in', margin + 15, currentY, 14, '#e67e22');
    currentY += 25;
    
    if (dayData.morningCheckin.questions) {
        dayData.morningCheckin.questions.forEach((question, index) => {
            generator.drawer.drawHandDrawnText(`• ${question}`, margin + 25, currentY, 11, '#333333');
            currentY += 18;
        });
        currentY += 10;
    }
    
    // Morning check-in fields
    if (dayData.morningCheckin.fields) {
        dayData.morningCheckin.fields.forEach(field => {
            generator.drawer.drawHandDrawnText(field, margin + 25, currentY, 10, '#666666');
            generator.drawer.drawWritingLine(margin + 25, currentY + 8, margin + contentWidth - 20, currentY + 8, 4, '#cccccc');
            currentY += 25;
        });
    }
    
    currentY += 15;
    
    // Main exercise section
    generator.drawer.drawHandDrawnText('📝 Main Exercise', margin + 15, currentY, 14, '#8e44ad');
    currentY += 20;
    generator.drawer.drawHandDrawnText(dayData.coreExercise, margin + 25, currentY, 12, '#8e44ad');
    currentY += 25;
    
    if (dayData.mainExercise.purpose) {
        generator.drawer.drawHandDrawnText(`Purpose: ${dayData.mainExercise.purpose}`, margin + 25, currentY, 10, '#666666');
        currentY += 20;
    }
    
    // Exercise steps based on type
    if (dayData.mainExercise.steps) {
        dayData.mainExercise.steps.forEach(step => {
            generator.drawer.drawHandDrawnText(step.title, margin + 25, currentY, 11, '#333333');
            currentY += 18;
            generator.drawer.drawHandDrawnText(step.instruction, margin + 35, currentY, 10, '#666666');
            currentY += 20;
            
            if (step.type === 'numbered_list') {
                for (let i = 1; i <= step.count; i++) {
                    generator.drawer.drawHandDrawnText(`${i}.`, margin + 40, currentY, 10, '#333333');
                    generator.drawer.drawWritingLine(margin + 55, currentY + 3, margin + contentWidth - 20, currentY + 3, 4, '#cccccc');
                    currentY += 20;
                }
            } else if (step.type === 'fear_analysis') {
                for (let i = 0; i < step.count; i++) {
                    generator.drawer.drawHandDrawnText('Task:', margin + 40, currentY, 10, '#333333');
                    generator.drawer.drawWritingLine(margin + 70, currentY + 3, margin + contentWidth - 20, currentY + 3, 4, '#cccccc');
                    currentY += 18;
                    
                    generator.drawer.drawHandDrawnText('What am I afraid might happen?', margin + 40, currentY, 9, '#666666');
                    currentY += 15;
                    for (let j = 0; j < 2; j++) {
                        generator.drawer.drawHandDrawnText('•', margin + 50, currentY, 9, '#666666');
                        generator.drawer.drawWritingLine(margin + 60, currentY + 3, margin + contentWidth - 20, currentY + 3, 3, '#cccccc');
                        currentY += 15;
                    }
                    
                    generator.drawer.drawHandDrawnText('Likelihood (1-10):', margin + 40, currentY, 9, '#666666');
                    generator.drawer.drawWobblyRect(margin + 120, currentY - 8, 30, 15, 1, '#cccccc');
                    currentY += 25;
                }
            }
            currentY += 15;
        });
    }
    
    // Commitment section
    if (dayData.commitmentSection) {
        generator.drawer.drawHandDrawnText('🎯 ' + dayData.commitmentSection.title, margin + 15, currentY, 13, '#27ae60');
        currentY += 20;
        generator.drawer.drawHandDrawnText(dayData.commitmentSection.purpose, margin + 25, currentY, 10, '#666666');
        currentY += 20;
        
        dayData.commitmentSection.fields.forEach(field => {
            generator.drawer.drawHandDrawnText(field, margin + 25, currentY, 10, '#333333');
            generator.drawer.drawWritingLine(margin + 25, currentY + 8, margin + contentWidth - 20, currentY + 8, 4, '#cccccc');
            currentY += 22;
        });
        currentY += 15;
    }
    
    // Evening reflection
    if (dayData.eveningReflection) {
        generator.drawer.drawHandDrawnText('🌙 Evening Reflection', margin + 15, currentY, 13, '#e74c3c');
        currentY += 25;
        
        dayData.eveningReflection.questions.forEach(question => {
            generator.drawer.drawHandDrawnText(question, margin + 25, currentY, 10, '#333333');
            generator.drawer.drawWritingLine(margin + 25, currentY + 8, margin + contentWidth - 20, currentY + 8, 4, '#cccccc');
            currentY += 22;
        });
        currentY += 10;
    }
    
    // Completion checkbox
    generator.drawer.drawCheckbox(margin + 25, currentY - 8, 14, false, 2);
    generator.drawer.drawHandDrawnText('I completed today\'s exercise', margin + 45, currentY, 10, '#333333');
    
    // Courage thought (if space allows)
    if (dayData.courageThought && currentY < generator.canvas.height - 80) {
        currentY = generator.canvas.height - 65;
        generator.drawer.drawHandDrawnText('💪 ' + dayData.courageThought, margin + 15, currentY, 9, '#8e44ad');
    }
    
    // Footer
    generator.drawer.drawHandDrawnText(`Avoidance Procrastinator Workbook - Day ${dayData.dayNumber}`, margin + 15, generator.canvas.height - 40, 8, '#999999');
    generator.drawer.drawHandDrawnText('© 2024 Procrastination Types Explorer', margin + 15, generator.canvas.height - 28, 7, '#cccccc');
    
    console.log(`Generated realistic Day ${dayNumber} page with actual workbook content`);
}

// Add button to generate realistic workbook pages
function generateRealisticWorkbook() {
    // Generate pages for days 1-3 with real content
    const pages = [1, 2, 3];
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [612, 792]
        });
        
        let isFirstPage = true;
        
        for (const dayNumber of pages) {
            generateAvoidanceWorkbookPage(dayNumber);
            
            if (!isFirstPage) {
                pdf.addPage();
            }
            
            // Convert canvas to image and add to PDF
            const canvasImageData = generator.canvas.toDataURL('image/png', 1.0);
            pdf.addImage(canvasImageData, 'PNG', 0, 0, 612, 792, '', 'FAST');
            
            isFirstPage = false;
        }
        
        // Save PDF with realistic content
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `avoidance-workbook-realistic-${timestamp}.pdf`;
        pdf.save(filename);
        
        console.log(`Realistic workbook PDF exported: ${filename}`);
        return filename;
        
    } catch (error) {
        console.error('Realistic workbook export failed:', error);
        return null;
    }
}