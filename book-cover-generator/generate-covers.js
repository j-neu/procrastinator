const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Book metadata
const bookData = {
    title: "The Active Procrastinator",
    subtitle: "Break Free from the Pressure Addiction",
    author: "Cognitive Dismantling Series",
    tagline: "You don't need the fear. You never did.",
    chapter1Title: "Chapter 1: The Worst Adrenaline Junkie I Have Yet to Meet",
    chapter1Excerpt: `Perhaps I should begin by stating my credentials for writing this book. I am not a psychologist or a productivity guru. My qualifications are far more relevant. I spent twenty years of my life as a confirmed, badge-wearing Active Procrastinator.

I wasn't just someone who put things off. I was a "pressure performer." I was the guy who would look at a three-week deadline, laugh, and not touch the project until forty-eight hours before it was due. And I would deliver. I would pull the all-nighter, fueled by coffee and sheer panic, and I would produce work that wasn't just acceptable—it was often brilliant.

But there was a dark side. A side I didn't talk about.

I was living in a constant cycle of coasting and crashing. The "coasting" periods—those weeks before the deadline—weren't actually relaxing. They were filled with a low-level, humming anxiety. A shadow. I knew the cliff was coming.`
};

// Design variations
const coverDesigns = [
    {
        name: 'pressure-wave',
        description: 'Abstract wave pattern representing pressure cycles',
        colors: {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#e94560',
            text: '#ffffff',
            subtle: '#0f3460'
        }
    },
    {
        name: 'clock-shatter',
        description: 'Shattered clock representing breaking free from time pressure',
        colors: {
            primary: '#0d0d0d',
            secondary: '#1a1a1a',
            accent: '#ff6b35',
            text: '#ffffff',
            subtle: '#2d2d2d'
        }
    },
    {
        name: 'calm-storm',
        description: 'Gradient from chaos to calm',
        colors: {
            primary: '#2c3e50',
            secondary: '#3498db',
            accent: '#e74c3c',
            text: '#ecf0f1',
            subtle: '#34495e'
        }
    },
    {
        name: 'minimalist-bold',
        description: 'Clean minimalist design with bold typography',
        colors: {
            primary: '#ffffff',
            secondary: '#f5f5f5',
            accent: '#000000',
            text: '#000000',
            subtle: '#e0e0e0'
        }
    },
    {
        name: 'adrenaline-drop',
        description: 'Falling drop representing adrenaline rush',
        colors: {
            primary: '#1e3c72',
            secondary: '#2a5298',
            accent: '#ff416c',
            text: '#ffffff',
            subtle: '#1e3c72'
        }
    },
    {
        name: 'geometric-escape',
        description: 'Geometric shapes breaking free from grid',
        colors: {
            primary: '#0f0f23',
            secondary: '#1a1a3e',
            accent: '#00d9ff',
            text: '#ffffff',
            subtle: '#1e1e4a'
        }
    },
    {
        name: 'typography-focus',
        description: 'Pure typography-driven design',
        colors: {
            primary: '#fafafa',
            secondary: '#f0f0f0',
            accent: '#ff3366',
            text: '#1a1a1a',
            subtle: '#e8e8e8'
        }
    },
    {
        name: 'dark-gradient',
        description: 'Moody gradient with glowing elements',
        colors: {
            primary: '#0a0a0a',
            secondary: '#1a1a2e',
            accent: '#f39c12',
            text: '#ffffff',
            subtle: '#16213e'
        }
    }
];

// Generate HTML for cover
function generateCoverHTML(design, data) {
    const { colors } = design;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Cover Preview</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600;700&family=Merriweather:wght@300;400;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background: ${colors.primary};
            color: ${colors.text};
            width: 6in;
            height: 9in;
            overflow: hidden;
            position: relative;
        }
        
        .cover {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 60px 50px;
            position: relative;
        }
        
        /* Design-specific backgrounds */
        ${generateBackgroundStyles(design, colors)}
        
        .top-section {
            position: relative;
            z-index: 2;
        }
        
        .series-badge {
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: ${colors.accent};
            font-weight: 600;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        
        .title {
            font-family: 'Georgia', serif;
            font-size: 48px;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 15px;
            letter-spacing: -1px;
        }
        
        .subtitle {
            font-size: 18px;
            font-weight: 300;
            line-height: 1.4;
            opacity: 0.85;
            max-width: 90%;
        }
        
        .middle-section {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
        }
        
        ${generateMiddleSectionStyles(design, colors)}
        
        .bottom-section {
            position: relative;
            z-index: 2;
        }
        
        .tagline {
            font-family: 'Georgia', serif;
            font-size: 14px;
            font-style: italic;
            opacity: 0.8;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid ${colors.accent}40;
        }
        
        .author {
            font-size: 14px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="cover">
        <div class="top-section">
            <div class="series-badge">Cognitive Dismantling Series</div>
            <h1 class="title">${data.title}</h1>
            <p class="subtitle">${data.subtitle}</p>
        </div>
        
        <div class="middle-section">
            ${generateMiddleContent(design, colors, data)}
        </div>
        
        <div class="bottom-section">
            <p class="tagline">"${data.tagline}"</p>
            <p class="author">${data.author}</p>
        </div>
    </div>
</body>
</html>`;
}

// Generate background styles based on design
function generateBackgroundStyles(design, colors) {
    switch(design.name) {
        case 'pressure-wave':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(ellipse at 20% 80%, ${colors.accent}20 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 20%, ${colors.secondary} 0%, transparent 50%),
                        linear-gradient(135deg, ${colors.primary} 0%, ${colors.subtle} 100%);
                    z-index: 0;
                }
                .cover::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 300px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='${encodeURIComponent(colors.accent)}' fill-opacity='0.1' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom center;
                    background-size: cover;
                    z-index: 1;
                    opacity: 0.6;
                }
            `;
        case 'clock-shatter':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 50% 50%, ${colors.secondary} 0%, ${colors.primary} 100%);
                    z-index: 0;
                }
                .cover::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 200px;
                    height: 200px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='${encodeURIComponent(colors.accent)}' stroke-width='2' opacity='0.3'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='${encodeURIComponent(colors.accent)}' stroke-width='1' opacity='0.2'/%3E%3Cline x1='100' y1='100' x2='100' y2='40' stroke='${encodeURIComponent(colors.accent)}' stroke-width='3' opacity='0.5'/%3E%3Cline x1='100' y1='100' x2='140' y2='100' stroke='${encodeURIComponent(colors.accent)}' stroke-width='2' opacity='0.4'/%3E%3C/svg%3E") no-repeat center;
                    z-index: 1;
                }
            `;
        case 'calm-storm':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, ${colors.accent}40 0%, ${colors.primary} 50%, ${colors.secondary}60 100%);
                    z-index: 0;
                }
            `;
        case 'minimalist-bold':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    right: 40px;
                    bottom: 40px;
                    border: 3px solid ${colors.accent};
                    z-index: 0;
                }
                .title {
                    font-size: 56px;
                }
            `;
        case 'adrenaline-drop':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
                    z-index: 0;
                }
                .cover::after {
                    content: '';
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 150px;
                    height: 200px;
                    background: radial-gradient(ellipse at 50% 30%, ${colors.accent}60 0%, ${colors.accent}20 40%, transparent 70%);
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    z-index: 1;
                    filter: blur(1px);
                }
            `;
        case 'geometric-escape':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        linear-gradient(45deg, transparent 48%, ${colors.accent}10 49%, ${colors.accent}10 51%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, ${colors.accent}10 49%, ${colors.accent}10 51%, transparent 52%),
                        radial-gradient(circle at 70% 60%, ${colors.accent}30 0%, transparent 30%);
                    background-size: 60px 60px, 60px 60px, 100% 100%;
                    z-index: 0;
                }
            `;
        case 'typography-focus':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 8px;
                    height: 100%;
                    background: ${colors.accent};
                    z-index: 0;
                }
                .title {
                    font-size: 64px;
                    line-height: 0.95;
                }
                .subtitle {
                    font-size: 20px;
                }
            `;
        case 'dark-gradient':
            return `
                .cover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(ellipse at 30% 20%, ${colors.accent}15 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, ${colors.secondary} 0%, transparent 50%),
                        linear-gradient(180deg, ${colors.primary} 0%, ${colors.subtle} 100%);
                    z-index: 0;
                }
            `;
        default:
            return '';
    }
}

// Generate middle section styles
function generateMiddleSectionStyles(design, colors) {
    switch(design.name) {
        case 'geometric-escape':
            return `
                .middle-section {
                    height: 150px;
                }
                .middle-content {
                    display: flex;
                    gap: 20px;
                }
                .shape {
                    width: 60px;
                    height: 60px;
                    border: 2px solid ${colors.accent}40;
                    transform: rotate(15deg);
                }
                .shape:nth-child(2) {
                    transform: rotate(-10deg) translateY(-20px);
                    border-color: ${colors.accent}60;
                }
                .shape:nth-child(3) {
                    transform: rotate(25deg) translateY(10px);
                    border-color: ${colors.accent}30;
                }
            `;
        default:
            return `
                .middle-section {
                    height: 100px;
                }
            `;
    }
}

// Generate middle content
function generateMiddleContent(design, colors, data) {
    switch(design.name) {
        case 'geometric-escape':
            return `
                <div class="middle-content">
                    <div class="shape"></div>
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>
            `;
        case 'minimalist-bold':
            return `
                <div style="font-size: 120px; font-weight: 900; opacity: 0.05; font-family: 'Georgia', serif;">AP</div>
            `;
        default:
            return '';
    }
}

// Generate HTML for interior page sample
function generateInteriorHTML(design, data) {
    const { colors } = design;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Interior Sample</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Merriweather:wght@300;400;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background: #ffffff;
            color: #1a1a1a;
            width: 6in;
            height: 9in;
            overflow: hidden;
            position: relative;
        }
        
        .page {
            width: 100%;
            height: 100%;
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
        }
        
        .header {
            border-bottom: 2px solid ${colors.accent};
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .chapter-number {
            font-family: 'Georgia', serif;
            font-size: 14px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: ${colors.accent};
            margin-bottom: 10px;
        }
        
        .chapter-title {
            font-family: 'Georgia', serif;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.3;
            color: #1a1a1a;
        }
        
        .content {
            flex: 1;
            font-size: 14px;
            line-height: 1.8;
            color: #333;
        }
        
        .content p {
            margin-bottom: 18px;
            text-align: justify;
        }
        
        .content p:first-of-type::first-letter {
            font-family: 'Georgia', serif;
            font-size: 72px;
            float: left;
            line-height: 1;
            padding-right: 10px;
            color: ${colors.accent};
        }
        
        .exercise-box {
            background: ${colors.primary}08;
            border-left: 4px solid ${colors.accent};
            padding: 20px 25px;
            margin-top: 30px;
        }
        
        .exercise-title {
            font-family: 'Georgia', serif;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 10px;
            color: ${colors.primary};
        }
        
        .exercise-note {
            font-size: 12px;
            font-style: italic;
            color: #666;
            margin-bottom: 12px;
        }
        
        .exercise-content {
            font-size: 13px;
            line-height: 1.7;
        }
        
        .exercise-content ol {
            margin-left: 20px;
        }
        
        .exercise-content li {
            margin-bottom: 8px;
        }
        
        .page-number {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: auto;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="chapter-number">${data.chapter1Title.split(':')[0]}</div>
            <h1 class="chapter-title">${data.chapter1Title.split(':')[1].trim()}</h1>
        </div>
        
        <div class="content">
            ${data.chapter1Excerpt.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
        
        <div class="exercise-box">
            <div class="exercise-title">Exercise: The Cost of the Rush</div>
            <p class="exercise-note">Note: For all exercises in this book, please do not write on the pages. Use a separate notebook or a piece of paper.</p>
            <div class="exercise-content">
                <p>Take a moment to think about the last time you "pulled it off" at the last minute. The big save. The heroic sprint.</p>
                <ol>
                    <li>Recall the feeling of the "Rush"—that moment of high-stakes focus.</li>
                    <li>Now, recall the <strong>Aftermath</strong>.</li>
                </ol>
            </div>
        </div>
        
        <div class="page-number">— 1 —</div>
    </div>
</body>
</html>`;
}

// Main function to generate all covers
async function generateAllCovers() {
    console.log('Starting cover generation...\n');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (const design of coverDesigns) {
        console.log(`Generating: ${design.name} - ${design.description}`);
        
        const page = await browser.newPage();
        
        try {
            // Generate cover
            const coverHTML = generateCoverHTML(design, bookData);
            await page.setContent(coverHTML, { waitUntil: 'domcontentloaded', timeout: 10000 });
            
            // Wait a bit for fonts to load
            await new Promise(r => setTimeout(r, 500));
            
            const coverPath = path.join(outputDir, `${design.name}-cover.pdf`);
            await page.pdf({
                path: coverPath,
                width: '6in',
                height: '9in',
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            });
            
            // Generate interior sample
            const interiorHTML = generateInteriorHTML(design, bookData);
            await page.setContent(interiorHTML, { waitUntil: 'domcontentloaded', timeout: 10000 });
            
            await new Promise(r => setTimeout(r, 500));
            
            const interiorPath = path.join(outputDir, `${design.name}-interior.pdf`);
            await page.pdf({
                path: interiorPath,
                width: '6in',
                height: '9in',
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            });
            
            console.log(`  ✓ Cover: ${design.name}-cover.pdf`);
            console.log(`  ✓ Interior: ${design.name}-interior.pdf\n`);
        } catch (error) {
            console.error(`  ✗ Error generating ${design.name}: ${error.message}\n`);
        } finally {
            await page.close();
        }
    }
    
    await browser.close();
    console.log(`\n✅ Generation complete! Output in: ${outputDir}`);
}

// Run
generateAllCovers().catch(console.error);
