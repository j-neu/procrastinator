/**
 * Book Cover Generator using SVG Generation
 * Method #7 from PDFrecommendations.md
 * 
 * This creates pure SVG files that can be converted to PDF
 * Using Puppeteer to render SVG to PDF
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Book dimensions (6x9 inches at 96 DPI for screen, scalable for print)
const WIDTH = 576;   // 6 inches at 96 DPI
const HEIGHT = 864;  // 9 inches at 96 DPI

// Book metadata
const BOOK_DATA = {
    title: "The Active Procrastinator",
    subtitle: "Break Free from the Pressure Addiction",
    author: "Cognitive Dismantling Series",
    tagline: "You don't need the fear. You never did.",
};

/**
 * Create Art Deco style SVG cover
 */
function createArtDecoCover() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4af37"/>
            <stop offset="50%" style="stop-color:#f4e4bc"/>
            <stop offset="100%" style="stop-color:#d4af37"/>
        </linearGradient>
        <pattern id="artDecoPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#1a1a2e"/>
            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#d4af37" stroke-width="0.5" opacity="0.3"/>
        </pattern>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="#1a1a2e"/>
    <rect width="100%" height="100%" fill="url(#artDecoPattern)"/>
    
    <!-- Art Deco sunburst -->
    <g transform="translate(${WIDTH/2}, ${HEIGHT*0.4})">
        ${Array.from({length: 24}, (_, i) => {
            const angle = (i * 15) * Math.PI / 180;
            const x1 = Math.cos(angle) * 50;
            const y1 = Math.sin(angle) * 50;
            const x2 = Math.cos(angle) * 200;
            const y2 = Math.sin(angle) * 200;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4af37" stroke-width="2" opacity="0.6"/>`;
        }).join('\n        ')}
        <circle cx="0" cy="0" r="50" fill="#1a1a2e" stroke="url(#goldGrad)" stroke-width="3"/>
    </g>
    
    <!-- Decorative lines -->
    <rect x="40" y="60" width="${WIDTH-80}" height="4" fill="url(#goldGrad)"/>
    <rect x="40" y="${HEIGHT-80}" width="${WIDTH-80}" height="4" fill="url(#goldGrad)"/>
    
    <!-- Title -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.65}" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#f4e4bc">
        THE ACTIVE
    </text>
    <text x="${WIDTH/2}" y="${HEIGHT*0.72}" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#f4e4bc">
        PROCRASTINATOR
    </text>
    
    <!-- Subtitle -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.8}" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#d4af37">
        Break Free from the Pressure Addiction
    </text>
    
    <!-- Author -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.92}" text-anchor="middle" font-family="Georgia, serif" font-size="11" letter-spacing="3" fill="#d4af37">
        COGNITIVE DISMANTLING SERIES
    </text>
</svg>`;
}

/**
 * Create Japanese minimalist SVG cover
 */
function createJapaneseMinimalistCover() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="100%" height="100%" fill="#faf8f5"/>
    
    <!-- Red circle (Japanese flag inspired) -->
    <circle cx="${WIDTH*0.5}" cy="${HEIGHT*0.35}" r="100" fill="#bc002d"/>
    
    <!-- Vertical text line (Japanese style) -->
    <line x1="${WIDTH*0.15}" y1="${HEIGHT*0.2}" x2="${WIDTH*0.15}" y2="${HEIGHT*0.7}" stroke="#1a1a1a" stroke-width="1"/>
    
    <!-- Title -->
    <text x="${WIDTH*0.5}" y="${HEIGHT*0.6}" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#1a1a1a">
        THE ACTIVE
    </text>
    <text x="${WIDTH*0.5}" y="${HEIGHT*0.67}" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#1a1a1a">
        PROCRASTINATOR
    </text>
    
    <!-- Subtitle -->
    <text x="${WIDTH*0.5}" y="${HEIGHT*0.76}" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#666666">
        Break Free from the Pressure Addiction
    </text>
    
    <!-- Author -->
    <text x="${WIDTH*0.5}" y="${HEIGHT*0.9}" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="2" fill="#bc002d">
        COGNITIVE DISMANTLING SERIES
    </text>
    
    <!-- Bottom line -->
    <line x1="${WIDTH*0.3}" y1="${HEIGHT*0.95}" x2="${WIDTH*0.7}" y2="${HEIGHT*0.95}" stroke="#1a1a1a" stroke-width="0.5"/>
</svg>`;
}

/**
 * Create psychedelic SVG cover
 */
function createPsychedelicCover() {
    const waves = [];
    for (let i = 0; i < 20; i++) {
        const y = HEIGHT * 0.2 + i * 30;
        const hue = (i * 18) % 360;
        waves.push(`<path d="M0 ${y} Q ${WIDTH*0.25} ${y-20+i*2} ${WIDTH*0.5} ${y} T ${WIDTH} ${y}" fill="none" stroke="hsl(${hue}, 80%, 50%)" stroke-width="8" opacity="0.7"/>`);
    }
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="100%" height="100%" fill="#0a0a0a"/>
    
    <!-- Psychedelic waves -->
    ${waves.join('\n    ')}
    
    <!-- Title box -->
    <rect x="${WIDTH*0.1}" y="${HEIGHT*0.05}" width="${WIDTH*0.8}" height="80" fill="#0a0a0a" opacity="0.8"/>
    
    <!-- Title -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.1}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">
        THE ACTIVE PROCRASTINATOR
    </text>
    
    <!-- Subtitle -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.88}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">
        Break Free from the Pressure Addiction
    </text>
    
    <!-- Author -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.95}" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" letter-spacing="2" fill="#ff00ff">
        COGNITIVE DISMANTLING SERIES
    </text>
</svg>`;
}

/**
 * Create blueprint style SVG cover
 */
function createBlueprintCover() {
    const gridLines = [];
    for (let i = 0; i <= 20; i++) {
        const x = i * WIDTH / 20;
        const y = i * HEIGHT / 30;
        gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="#1e3a5f" stroke-width="0.5"/>`);
        gridLines.push(`<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" stroke="#1e3a5f" stroke-width="0.5"/>`);
    }
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Blueprint background -->
    <rect width="100%" height="100%" fill="#1a4480"/>
    
    <!-- Grid -->
    ${gridLines.join('\n    ')}
    
    <!-- Technical drawing elements -->
    <circle cx="${WIDTH*0.5}" cy="${HEIGHT*0.4}" r="120" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="5,5"/>
    <circle cx="${WIDTH*0.5}" cy="${HEIGHT*0.4}" r="80" fill="none" stroke="#ffffff" stroke-width="1"/>
    <circle cx="${WIDTH*0.5}" cy="${HEIGHT*0.4}" r="40" fill="none" stroke="#ff6b35" stroke-width="2"/>
    
    <!-- Crosshairs -->
    <line x1="${WIDTH*0.5-130}" y1="${HEIGHT*0.4}" x2="${WIDTH*0.5+130}" y2="${HEIGHT*0.4}" stroke="#ffffff" stroke-width="0.5"/>
    <line x1="${WIDTH*0.5}" y1="${HEIGHT*0.4-130}" x2="${WIDTH*0.5}" y2="${HEIGHT*0.4+130}" stroke="#ffffff" stroke-width="0.5"/>
    
    <!-- Title -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.68}" text-anchor="middle" font-family="Courier New, monospace" font-size="28" font-weight="bold" fill="#ffffff">
        THE ACTIVE
    </text>
    <text x="${WIDTH/2}" y="${HEIGHT*0.75}" text-anchor="middle" font-family="Courier New, monospace" font-size="28" font-weight="bold" fill="#ffffff">
        PROCRASTINATOR
    </text>
    
    <!-- Subtitle -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.83}" text-anchor="middle" font-family="Courier New, monospace" font-size="11" fill="#a8d0e6">
        Break Free from the Pressure Addiction
    </text>
    
    <!-- Author -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.92}" text-anchor="middle" font-family="Courier New, monospace" font-size="9" fill="#ff6b35">
        COGNITIVE DISMANTLING SERIES
    </text>
    
    <!-- Corner marks -->
    <path d="M20 20 L20 50 M20 20 L50 20" stroke="#ffffff" stroke-width="2" fill="none"/>
    <path d="M${WIDTH-20} 20 L${WIDTH-20} 50 M${WIDTH-20} 20 L${WIDTH-50} 20" stroke="#ffffff" stroke-width="2" fill="none"/>
    <path d="M20 ${HEIGHT-20} L20 ${HEIGHT-50} M20 ${HEIGHT-20} L50 ${HEIGHT-20}" stroke="#ffffff" stroke-width="2" fill="none"/>
    <path d="M${WIDTH-20} ${HEIGHT-20} L${WIDTH-20} ${HEIGHT-50} M${WIDTH-20} ${HEIGHT-20} L${WIDTH-50} ${HEIGHT-20}" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>`;
}

/**
 * create watercolor style SVG cover
 */
function createWatercolorCover() {
    const blobs = [
        { cx: WIDTH*0.3, cy: HEIGHT*0.3, rx: 150, ry: 180, color: '#e63946', opacity: 0.4 },
        { cx: WIDTH*0.7, cy: HEIGHT*0.5, rx: 180, ry: 150, color: '#457b9d', opacity: 0.4 },
        { cx: WIDTH*0.5, cy: HEIGHT*0.7, rx: 160, ry: 140, color: '#f4a261', opacity: 0.4 },
        { cx: WIDTH*0.4, cy: HEIGHT*0.45, rx: 200, ry: 200, color: '#2a9d8f', opacity: 0.3 },
    ];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
        </filter>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="#faf8f5"/>
    
    <!-- Watercolor blobs -->
    ${blobs.map(b => `<ellipse cx="${b.cx}" cy="${b.cy}" rx="${b.rx}" ry="${b.ry}" fill="${b.color}" opacity="${b.opacity}" filter="url(#blur)"/>`).join('\n    ')}
    
    <!-- Title -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.4}" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#1a1a1a">
        THE ACTIVE
    </text>
    <text x="${WIDTH/2}" y="${HEIGHT*0.48}" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#1a1a1a">
        PROCRASTINATOR
    </text>
    
    <!-- Subtitle -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.58}" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#555555">
        Break Free from the Pressure Addiction
    </text>
    
    <!-- Author -->
    <text x="${WIDTH/2}" y="${HEIGHT*0.9}" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="2" fill="#1a1a1a">
        COGNITIVE DISMANTLING SERIES
    </text>
</svg>`;
}

/**
 * Create interior page SVG
 */
function createInteriorPage() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="100%" height="100%" fill="#ffffff"/>
    
    <!-- Chapter header -->
    <text x="50" y="60" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#e63946">CHAPTER 1</text>
    
    <!-- Chapter title -->
    <text x="50" y="100" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#1a1a1a">The Worst Adrenaline Junkie</text>
    <text x="50" y="130" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#1a1a1a">I Have Yet to Meet</text>
    
    <!-- Divider -->
    <rect x="50" y="150" width="200" height="2" fill="#e63946"/>
    
    <!-- Body text -->
    <text x="50" y="190" font-family="Georgia, serif" font-size="11" fill="#333333">
        <tspan x="50" dy="0">Perhaps I should begin by stating my credentials</tspan>
        <tspan x="50" dy="18">for writing this book. I am not a psychologist</tspan>
        <tspan x="50" dy="18">or a productivity guru. My qualifications are</tspan>
        <tspan x="50" dy="18">far more relevant. I spent twenty years of my</tspan>
        <tspan x="50" dy="18">life as a confirmed, badge-wearing Active</tspan>
        <tspan x="50" dy="18">Procrastinator.</tspan>
        <tspan x="50" dy="30">I wasn't just someone who put things off. I was</tspan>
        <tspan x="50" dy="18">a "pressure performer." I was the guy who would</tspan>
        <tspan x="50" dy="18">look at a three-week deadline, laugh, and not</tspan>
        <tspan x="50" dy="18">touch the project until forty-eight hours before</tspan>
        <tspan x="50" dy="18">it was due. And I would deliver.</tspan>
    </text>
    
    <!-- Exercise box -->
    <rect x="50" y="420" width="${WIDTH-100}" height="150" fill="#f5f5f5"/>
    <rect x="50" y="420" width="4" height="150" fill="#e63946"/>
    
    <text x="65" y="450" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#1a1a1a">Exercise: The Cost of the Rush</text>
    <text x="65" y="475" font-family="Georgia, serif" font-size="9" font-style="italic" fill="#666666">Note: Use a separate notebook for exercises.</text>
    
    <text x="65" y="510" font-family="Georgia, serif" font-size="10" fill="#333333">
        <tspan x="65" dy="0">1. Recall the feeling of the "Rush"</tspan>
        <tspan x="65" dy="18">2. Now, recall the Aftermath</tspan>
        <tspan x="65" dy="18">3. Write down three specific "costs"</tspan>
    </text>
    
    <!-- Page number -->
    <text x="${WIDTH/2}" y="${HEIGHT-30}" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#999999">— 1 —</text>
</svg>`;
}

/**
 * Convert SVG to PDF using Puppeteer
 */
async function svgToPdf(svgContent, outputPath, browser) {
    const page = await browser.newPage();
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; }
        body { display: flex; justify-content: center; align-items: center; }
    </style>
</head>
<body>
    ${svgContent}
</body>
</html>`;
    
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 300));
    
    await page.pdf({
        path: outputPath,
        width: '6in',
        height: '9in',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    await page.close();
}

// Main function
async function main() {
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('\n=== SVG Generation Covers ===\n');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        // Save SVG files
        const svgFiles = [
            { name: 'svg-art-deco', content: createArtDecoCover() },
            { name: 'svg-japanese', content: createJapaneseMinimalistCover() },
            { name: 'svg-psychedelic', content: createPsychedelicCover() },
            { name: 'svg-blueprint', content: createBlueprintCover() },
            { name: 'svg-watercolor', content: createWatercolorCover() },
            { name: 'svg-interior', content: createInteriorPage() },
        ];
        
        for (const file of svgFiles) {
            const svgPath = path.join(outputDir, `${file.name}.svg`);
            fs.writeFileSync(svgPath, file.content);
            console.log(`Created SVG: ${file.name}.svg`);
            
            // Convert to PDF
            const pdfPath = path.join(outputDir, `${file.name}-cover.pdf`);
            await svgToPdf(file.content, pdfPath, browser);
            console.log(`Created PDF: ${file.name}-cover.pdf`);
        }
        
        console.log(`\n[DONE] SVG covers created in: ${outputDir}\n`);
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
