/**
 * Book Cover Generator using Node.js + PDFKit
 * Method #6 from PDFrecommendations.md
 * 
 * This creates direct PDF output with programmatic positioning
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Book dimensions (6x9 inches in points, 72 DPI)
const WIDTH = 6 * 72;   // 432 points
const HEIGHT = 9 * 72;  // 648 points

// Book metadata
const BOOK_DATA = {
    title: "The Active Procrastinator",
    subtitle: "Break Free from the Pressure Addiction",
    author: "Cognitive Dismantling Series",
    tagline: "You don't need the fear. You never did.",
};

// Color palette
const COLORS = {
    black: '#000000',
    white: '#ffffff',
    red: '#e63946',
    blue: '#457b9d',
    navy: '#1d3557',
    cream: '#f1faee',
    orange: '#f4a261',
    teal: '#2a9d8f',
    purple: '#7b2cbf',
    gold: '#ffd700',
};

/**
 * Create a Swiss-style minimalist cover
 */
function createSwissCover(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 0 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // White background
        doc.rect(0, 0, WIDTH, HEIGHT).fill(COLORS.white);
        
        // Large red square
        doc.rect(0, HEIGHT * 0.3, WIDTH * 0.6, HEIGHT * 0.4).fill(COLORS.red);
        
        // Black accent line
        doc.rect(WIDTH * 0.6, HEIGHT * 0.3, 3, HEIGHT * 0.4).fill(COLORS.black);
        
        // Title
        doc.fillColor(COLORS.white)
           .fontSize(28)
           .font('Helvetica-Bold')
           .text('THE ACTIVE', WIDTH * 0.05, HEIGHT * 0.38)
           .text('PROCRASTINATOR', WIDTH * 0.05, HEIGHT * 0.48);
        
        // Subtitle
        doc.fillColor(COLORS.black)
           .fontSize(11)
           .font('Helvetica')
           .text('Break Free from the Pressure Addiction', WIDTH * 0.05, HEIGHT * 0.75);
        
        // Author
        doc.fontSize(9)
           .font('Helvetica-Bold')
           .text('COGNITIVE DISMANTLING SERIES', WIDTH * 0.05, HEIGHT * 0.9);
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

/**
 * Create a split-tone cover
 */
function createSplitToneCover(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 0 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // Top half - dark
        doc.rect(0, 0, WIDTH, HEIGHT * 0.5).fill(COLORS.navy);
        
        // Bottom half - light
        doc.rect(0, HEIGHT * 0.5, WIDTH, HEIGHT * 0.5).fill(COLORS.cream);
        
        // Diagonal accent
        doc.polygon([WIDTH * 0.7, 0], [WIDTH, 0], [WIDTH, HEIGHT * 0.3], [WIDTH * 0.7, HEIGHT * 0.3])
           .fill(COLORS.orange);
        
        // Title on dark
        doc.fillColor(COLORS.white)
           .fontSize(32)
           .font('Helvetica-Bold')
           .text('THE ACTIVE', WIDTH * 0.08, HEIGHT * 0.15)
           .text('PROCRASTINATOR', WIDTH * 0.08, HEIGHT * 0.25);
        
        // Subtitle on light
        doc.fillColor(COLORS.navy)
           .fontSize(12)
           .font('Helvetica')
           .text('Break Free from the Pressure Addiction', WIDTH * 0.08, HEIGHT * 0.58);
        
        // Tagline
        doc.fontSize(10)
           .font('Helvetica-Oblique')
           .text('"You don\'t need the fear. You never did."', WIDTH * 0.08, HEIGHT * 0.65);
        
        // Author
        doc.fillColor(COLORS.orange)
           .fontSize(9)
           .font('Helvetica-Bold')
           .text('COGNITIVE DISMANTLING SERIES', WIDTH * 0.08, HEIGHT * 0.9);
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

/**
 * Create a typographic cover with large cropped letters
 */
function createTypographicCover(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 0 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // Black background
        doc.rect(0, 0, WIDTH, HEIGHT).fill(COLORS.black);
        
        // Large cropped letters
        doc.fillColor(COLORS.white)
           .fontSize(180)
           .font('Helvetica-Bold')
           .text('A', -20, HEIGHT * 0.2);
        
        doc.fillColor(COLORS.red)
           .text('P', WIDTH * 0.4, HEIGHT * 0.45);
        
        // Title bar
        doc.rect(0, HEIGHT * 0.1, WIDTH, 40).fill(COLORS.red);
        
        // Title
        doc.fillColor(COLORS.white)
           .fontSize(14)
           .font('Helvetica-Bold')
           .text('THE ACTIVE PROCRASTINATOR', WIDTH * 0.05, HEIGHT * 0.12);
        
        // Subtitle
        doc.fontSize(10)
           .font('Helvetica')
           .text('Break Free from the Pressure Addiction', WIDTH * 0.05, HEIGHT * 0.85);
        
        // Author
        doc.fontSize(8)
           .font('Helvetica-Bold')
           .text('COGNITIVE DISMANTLING SERIES', WIDTH * 0.05, HEIGHT * 0.92);
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

/**
 * Create a gradient-style cover using rectangles
 */
function createGradientStyleCover(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 0 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // Create gradient effect with rectangles
        const steps = 50;
        for (let i = 0; i < steps; i++) {
            const y = (HEIGHT / steps) * i;
            const ratio = i / steps;
            const r = Math.floor(26 + ratio * 20);
            const g = Math.floor(26 + ratio * 40);
            const b = Math.floor(46 + ratio * 60);
            const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            doc.rect(0, y, WIDTH, HEIGHT / steps + 1).fill(color);
        }
        
        // Accent circle
        doc.circle(WIDTH * 0.5, HEIGHT * 0.45, 80).fill(COLORS.red);
        
        // Title
        doc.fillColor(COLORS.white)
           .fontSize(30)
           .font('Helvetica-Bold')
           .text('THE ACTIVE', WIDTH * 0.5, HEIGHT * 0.38, { align: 'center' })
           .text('PROCRASTINATOR', WIDTH * 0.5, HEIGHT * 0.48, { align: 'center' });
        
        // Subtitle
        doc.fontSize(11)
           .font('Helvetica')
           .text('Break Free from the Pressure Addiction', WIDTH * 0.5, HEIGHT * 0.7, { align: 'center' });
        
        // Author
        doc.fillColor(COLORS.red)
           .fontSize(9)
           .font('Helvetica-Bold')
           .text('COGNITIVE DISMANTLING SERIES', WIDTH * 0.5, HEIGHT * 0.88, { align: 'center' });
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

/**
 * Create a geometric pattern cover
 */
function createGeometricPatternCover(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 0 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // Dark background
        doc.rect(0, 0, WIDTH, HEIGHT).fill('#0f0f23');
        
        // Draw geometric pattern
        const shapes = [
            { x: 0.2, y: 0.3, size: 60, color: COLORS.teal },
            { x: 0.5, y: 0.5, size: 80, color: COLORS.red },
            { x: 0.75, y: 0.35, size: 50, color: COLORS.orange },
            { x: 0.3, y: 0.6, size: 70, color: COLORS.purple },
        ];
        
        shapes.forEach(shape => {
            doc.circle(WIDTH * shape.x, HEIGHT * shape.y, shape.size).fill(shape.color);
        });
        
        // Title box
        doc.rect(WIDTH * 0.1, HEIGHT * 0.15, WIDTH * 0.8, 100).fill('#000000aa');
        
        // Title
        doc.fillColor(COLORS.white)
           .fontSize(26)
           .font('Helvetica-Bold')
           .text('THE ACTIVE PROCRASTINATOR', WIDTH * 0.5, HEIGHT * 0.2, { align: 'center' });
        
        // Subtitle
        doc.fontSize(10)
           .font('Helvetica')
           .text('Break Free from the Pressure Addiction', WIDTH * 0.5, HEIGHT * 0.78, { align: 'center' });
        
        // Author
        doc.fillColor(COLORS.teal)
           .fontSize(9)
           .font('Helvetica-Bold')
           .text('COGNITIVE DISMANTLING SERIES', WIDTH * 0.5, HEIGHT * 0.9, { align: 'center' });
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

/**
 * Create interior page sample
 */
function createInteriorPage(outputPath) {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: [WIDTH, HEIGHT], margin: 40 });
        doc.pipe(fs.createWriteStream(outputPath));
        
        // Chapter header
        doc.fillColor(COLORS.red)
           .fontSize(12)
           .font('Helvetica-Bold')
           .text('CHAPTER 1', 40, 50);
        
        // Chapter title
        doc.fillColor(COLORS.black)
           .fontSize(24)
           .font('Helvetica-Bold')
           .text('The Worst Adrenaline Junkie\nI Have Yet to Meet', 40, 80);
        
        // Divider
        doc.rect(40, 160, 150, 2).fill(COLORS.red);
        
        // Body text
        doc.fontSize(11)
           .font('Helvetica')
           .text(
               'Perhaps I should begin by stating my credentials for writing this book. I am not a psychologist or a productivity guru. My qualifications are far more relevant. I spent twenty years of my life as a confirmed, badge-wearing Active Procrastinator.\n\n' +
               'I wasn\'t just someone who put things off. I was a "pressure performer." I was the guy who would look at a three-week deadline, laugh, and not touch the project until forty-eight hours before it was due. And I would deliver.',
               40, 180,
               { width: WIDTH - 80, align: 'justify' }
           );
        
        // Exercise box
        doc.rect(40, 380, WIDTH - 80, 150).fill('#f5f5f5');
        doc.rect(40, 380, 4, 150).fill(COLORS.red);
        
        doc.fillColor(COLORS.black)
           .fontSize(12)
           .font('Helvetica-Bold')
           .text('Exercise: The Cost of the Rush', 55, 400);
        
        doc.fontSize(9)
           .font('Helvetica-Oblique')
           .fillColor('#666666')
           .text('Note: Use a separate notebook for exercises.', 55, 420);
        
        doc.fillColor(COLORS.black)
           .fontSize(10)
           .font('Helvetica')
           .text('1. Recall the feeling of the "Rush"\n2. Now, recall the Aftermath\n3. Write down three specific "costs"', 55, 450);
        
        // Page number
        doc.fillColor('#999999')
           .fontSize(10)
           .text('— 1 —', WIDTH / 2, HEIGHT - 50, { align: 'center' });
        
        doc.end();
        console.log(`Created: ${outputPath}`);
        resolve();
    });
}

// Main function
async function main() {
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('\n=== Node.js + PDFKit Covers ===\n');
    
    await createSwissCover(path.join(outputDir, 'pdfkit-swiss-cover.pdf'));
    await createSplitToneCover(path.join(outputDir, 'pdfkit-split-tone-cover.pdf'));
    await createTypographicCover(path.join(outputDir, 'pdfkit-typographic-cover.pdf'));
    await createGradientStyleCover(path.join(outputDir, 'pdfkit-gradient-cover.pdf'));
    await createGeometricPatternCover(path.join(outputDir, 'pdfkit-geometric-cover.pdf'));
    await createInteriorPage(path.join(outputDir, 'pdfkit-interior-sample.pdf'));
    
    console.log(`\n[DONE] PDFKit covers created in: ${outputDir}\n`);
}

main().catch(console.error);
