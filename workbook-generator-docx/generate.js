const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const MarkdownIt = require('markdown-it');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak, BorderStyle, AlignmentType, Header, Footer, UnderlineType, ShadingType, TabStopType, Table, TableRow, TableCell, WidthType } = docx;

const md = new MarkdownIt({
    breaks: true // Convert \n to <br> (soft break)
});

// Osmo Theme Colors (Adapted for Print)
const COLORS = {
    bg: "F3F3F3",          // Light Grey for box backgrounds
    surface: "FFFFFF",     // White for page
    text: "111111",        // Near Black
    muted: "666666",       // Grey for secondary text
    border: "E5E5E5",      // Light border
    accent: "000000",      // Black for strong accents
    lineColor: "888888"    // Darker Grey for writing lines (Visible!)
};

async function generate() {
    console.log("Starting Workbook Design overhaul (v3)...");
    
    // 1. Find files
    const pattern = '../procrastinator_workbooks/active procrastinator/days/day-*.md';
    const files = await glob(pattern);
    
    if (files.length === 0) {
        console.error("No files found matching:", pattern);
        return;
    }

    // 2. Sort files numerically
    files.sort((a, b) => {
        const numAMatch = a.match(/day-(\d+)\.md/);
        const numBMatch = b.match(/day-(\d+)\.md/);
        const numA = numAMatch ? parseInt(numAMatch[1]) : 0;
        const numB = numBMatch ? parseInt(numBMatch[1]) : 0;
        return numA - numB;
    });

    console.log(`Found ${files.length} day files. Preparing layout...`);

    const sections = [];

    // 3. Process each file
    for (const file of files) {
        const fileName = path.basename(file);
        const dayNumMatch = fileName.match(/day-(\d+)\.md/);
        const dayNum = dayNumMatch ? dayNumMatch[1] : "?";
        
        console.log(`Processing Day ${dayNum}...`);
        
        let content = fs.readFileSync(file, 'utf-8');
        
        // --- PRE-PROCESSING CONTENT ---
        
        // 1. Force Checkboxes to be separate paragraphs
        // Replace "□" with double newline to force new paragraph, then the symbol
        content = content.replace(/□/g, '\n\n□');
        
        // 2. Fix potential clumping of "key: value" lines that might rely on soft breaks
        // (Markdown-it 'breaks: true' handles standard newlines, but let's ensure spacing around underscores)
        
        // 3. Normalize underscores
        // Ensure they are long enough for the inline processor to catch them
        
        const tokens = md.parse(content, {});
        
        // Header
        const header = new Header({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: "ACTIVE PROCRASTINATOR WORKBOOK", font: "Segoe UI", size: 16, color: COLORS.muted, allCaps: true }),
                        new TextRun({ text: `\tDAY ${dayNum}`, font: "Segoe UI", size: 16, bold: true, color: COLORS.text })
                    ],
                    tabStops: [
                        { type: TabStopType.RIGHT, position: 8300 } // Right align for A5
                    ],
                    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.border } },
                    spacing: { after: 200 }
                })
            ]
        });

        // Footer
        const footer = new Footer({
            children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            children: [docx.PageNumber.CURRENT],
                            font: "Segoe UI",
                            size: 20,
                            color: COLORS.muted
                        })
                    ],
                    border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.border } },
                    spacing: { before: 200 }
                })
            ]
        });

        const docxChildren = convertTokensToDocx(tokens);

        sections.push({
            properties: {
                page: {
                    size: {
                        width: docx.convertMillimetersToTwip(148), // A5 Width
                        height: docx.convertMillimetersToTwip(210), // A5 Height
                        orientation: docx.PageOrientation.PORTRAIT,
                    },
                    margin: {
                        top: docx.convertInchesToTwip(0.6),
                        bottom: docx.convertInchesToTwip(0.6),
                        left: docx.convertInchesToTwip(0.6),
                        right: docx.convertInchesToTwip(0.6),
                    }
                },
                headers: { default: header },
                footers: { default: footer }
            },
            children: docxChildren
        });
    }

    // 4. Create Document
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        font: "Segoe UI",
                        size: 20, // 10pt standard reading size
                        color: COLORS.text
                    },
                    paragraph: {
                        spacing: { line: 260, after: 120 } // Slightly open line spacing
                    }
                },
                heading1: {
                    run: {
                        font: "Segoe UI",
                        size: 32, // 16pt
                        bold: true,
                        color: COLORS.text
                    },
                    paragraph: {
                        spacing: { before: 400, after: 200 }
                    }
                },
                heading2: {
                    run: {
                        font: "Segoe UI",
                        size: 26, // 13pt
                        bold: true,
                        color: COLORS.text,
                        allCaps: true
                    },
                    paragraph: {
                        spacing: { before: 300, after: 150 },
                        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border } }
                    }
                },
                heading3: {
                    run: {
                        font: "Segoe UI",
                        size: 22, // 11pt
                        bold: true,
                        italics: true,
                        color: COLORS.muted
                    },
                    paragraph: {
                        spacing: { before: 200, after: 100 }
                    }
                }
            }
        },
        sections: sections
    });

    // 5. Save
    const outputPath = path.resolve(__dirname, 'active-procrastinator-workbook-design-v3.docx');
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully generated: ${outputPath}`);
}

function convertTokensToDocx(tokens) {
    const nodes = [];
    let currentParagraphChildren = [];
    let headingLevel = 0;
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (token.type === 'heading_open') {
            headingLevel = parseInt(token.tag.replace('h', ''));
        } else if (token.type === 'heading_close') {
            let level = HeadingLevel.HEADING_1;
            if (headingLevel === 2) level = HeadingLevel.HEADING_2;
            if (headingLevel >= 3) level = HeadingLevel.HEADING_3;
            
            nodes.push(new Paragraph({
                children: currentParagraphChildren,
                heading: level
            }));
            currentParagraphChildren = [];
            headingLevel = 0;

        } else if (token.type === 'paragraph_open') {
            // start
        } else if (token.type === 'paragraph_close') {
            if (currentParagraphChildren.length > 0) {
                // Check if this paragraph is a "Checkbox" paragraph (starts with checkbox)
                const isCheckbox = hasCheckbox(currentParagraphChildren);
                
                nodes.push(new Paragraph({
                    children: currentParagraphChildren,
                    spacing: isCheckbox ? { before: 100, after: 100 } : { after: 120 },
                    indent: isCheckbox ? { left: 400, hanging: 400 } : undefined // Indent checkboxes
                }));
                currentParagraphChildren = [];
            }
        
        } else if (token.type === 'inline') {
            // Check if content is just a checkbox (due to our split)
            const runs = processInlineTokensWithState(token.children);
            currentParagraphChildren.push(...runs);

        } else if (token.type === 'list_item_open') {
            // Lists are handled similarly, but we might want to ensure they look good
        } else if (token.type === 'fence') {
             // Blockquote / Write-in Box
             const text = token.content.trim();
             const lines = text.split('\n');
             
             const rows = lines.map(line => {
                 let cellContent = [];
                 if (line.includes('_')) {
                     // Replace underscores with visual lines
                     cellContent = processLineWithUnderscores(line);
                 } else {
                     cellContent = processTextWithBrackets(line);
                 }

                 return new TableRow({
                     children: [
                         new TableCell({
                             children: [new Paragraph({ children: cellContent })],
                             borders: {
                                 top: { style: BorderStyle.NONE, size: 0, color: "auto" },
                                 bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
                                 left: { style: BorderStyle.NONE, size: 0, color: "auto" },
                                 right: { style: BorderStyle.NONE, size: 0, color: "auto" },
                             },
                             shading: { fill: COLORS.bg }
                         })
                     ]
                 });
             });

             nodes.push(new Table({
                 rows: rows,
                 width: { size: 100, type: WidthType.PERCENTAGE },
                 borders: {
                     top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
                     bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
                     left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
                     right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border },
                 }
             }));
             nodes.push(new Paragraph({ text: "" })); // spacer

        } else if (token.type === 'hr') {
            nodes.push(new Paragraph({
                border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLORS.border } }, 
                spacing: { before: 240, after: 240 }
            }));
        }
    }
    return nodes;
}

function hasCheckbox(runs) {
    // Basic check if the first run contains the checkbox symbol
    if (runs.length > 0 && runs[0].text && runs[0].text.includes("☐")) {
        return true;
    }
    return false;
}

function processInlineTokensWithState(tokens) {
    const runs = [];
    let isBold = false;
    let isItalic = false;

    for (const token of tokens) {
        if (token.type === 'text') {
            const content = token.content;
            
            // 1. Handle Checkboxes (if any remained inline, though we tried to split them)
            if (content.includes('□')) {
               const parts = content.split('□');
               parts.forEach((part, idx) => {
                   if (part) runs.push(...processTextWithBrackets(part, isBold, isItalic));
                   if (idx < parts.length - 1) {
                       runs.push(new TextRun({
                           text: " ☐  ", 
                           font: "Segoe UI Symbol", 
                           size: 24
                       }));
                   }
               });
            } else {
                // Standard text processing
                runs.push(...processTextWithBrackets(content, isBold, isItalic));
            }

        } else if (token.type === 'strong_open') {
            isBold = true;
        } else if (token.type === 'strong_close') {
            isBold = false;
        } else if (token.type === 'em_open') {
            isItalic = true;
        } else if (token.type === 'em_close') {
            isItalic = false;
        } else if (token.type === 'softbreak') {
            runs.push(new TextRun({ text: "\n", break: 1 })); // FORCE line break on softbreak
        } else if (token.type === 'hardbreak') {
            runs.push(new TextRun({ text: "\n", break: 1 }));
        }
    }
    return runs;
}

// Handle (...) -> smaller text
function processTextWithBrackets(text, bold = false, italic = false) {
    // Regex to find text in parentheses
    // We want to capture the parentheses as well? Or just the content?
    // Let's capture ( content )
    const regex = /(\([^)]+\))/g;
    const parts = text.split(regex);
    const runs = [];

    parts.forEach(part => {
        if (part.match(/^(\([^)]+\))$/)) {
            // It is a bracketed section
            runs.push(new TextRun({
                text: part,
                bold: bold,
                italics: italic,
                size: 16, // Smaller (8pt)
                color: COLORS.muted // Grey
            }));
        } else {
            // It is normal text
            // Check for underscores here too!
            if (part.includes('_')) {
                runs.push(...processLineWithUnderscores(part, bold, italic));
            } else if (part) {
                runs.push(new TextRun({
                    text: part,
                    bold: bold,
                    italics: italic
                }));
            }
        }
    });
    return runs;
}

// Helper to turn "Name: ______" into "Name:    [Solid Line]"
function processLineWithUnderscores(text, bold = false, italic = false) {
    const regex = /(_+)/g;
    const parts = text.split(regex);
    const runs = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        if (part.match(/^_+$/)) {
            // It is an underscore sequence (The Line)
            const length = part.length;
            const spaces = " ".repeat(length * 2); 
            
            runs.push(new TextRun({
                text: spaces,
                underline: {
                    type: UnderlineType.SINGLE,
                    color: COLORS.lineColor 
                }
            }));
        } else {
            // Normal text
            if (part) {
                let textContent = part;
                const nextPart = parts[i+1];
                
                // If this text is immediately followed by a line, expand the whitespace
                if (nextPart && nextPart.match(/^_+$/)) {
                     if (textContent.endsWith(' ')) {
                         // Replace trailing space(s) with 3 spaces
                         textContent = textContent.trimEnd() + "   ";
                     } else if (textContent === "") {
                         // It was just empty? rare with split unless start
                     } else if (textContent.trim().endsWith(':')) {
                         // Force space after colon if missing
                         textContent = textContent + "   ";
                     }
                     // If it's just " " (which happens when token is " ______"), 
                     // trimEnd() makes it empty, then we add "   ". Result: "   ". Correct.
                }

                runs.push(new TextRun({
                    text: textContent,
                    bold: bold,
                    italics: italic
                }));
            }
        }
    }
    return runs;
}

generate().catch(err => console.error(err));

