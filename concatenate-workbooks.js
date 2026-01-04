const fs = require('fs');
const path = require('path');

// Function to get all .md files from a directory and subdirectories
function getAllMarkdownFiles(dirPath) {
    const files = [];

    function scanDirectory(currentPath) {
        const items = fs.readdirSync(currentPath);

        for (const item of items) {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (item.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    }

    scanDirectory(dirPath);
    return files;
}

// Function to sort files in logical order
function sortFiles(files) {
    return files.sort((a, b) => {
        const aName = path.basename(a);
        const bName = path.basename(b);

        // Workbook introduction files first
        if (aName.includes('workbook-introduction')) return -1;
        if (bName.includes('workbook-introduction')) return 1;

        // Main workbook files next
        if (aName.includes('workbook.md') && !bName.includes('workbook.md')) return -1;
        if (bName.includes('workbook.md') && !aName.includes('workbook.md')) return 1;

        // Then day files in numerical order
        const dayRegex = /day-(\d+)\.md/;
        const aMatch = aName.match(dayRegex);
        const bMatch = bName.match(dayRegex);

        if (aMatch && bMatch) {
            return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }

        // Everything else alphabetically
        return aName.localeCompare(bName);
    });
}

// Function to concatenate files
function concatenateWorkbook(workbookPath) {
    const workbookName = path.basename(workbookPath);
    console.log(`Processing: ${workbookName}`);

    // Get all markdown files
    const files = getAllMarkdownFiles(workbookPath);
    const sortedFiles = sortFiles(files);

    console.log(`Found ${files.length} markdown files`);

    let concatenatedContent = '';

    // Add header for the complete workbook
    concatenatedContent += `# Complete ${workbookName.charAt(0).toUpperCase() + workbookName.slice(1)} Workbook\n\n`;
    concatenatedContent += `*This is the complete concatenated workbook containing all exercises and content.*\n\n`;
    concatenatedContent += `---\n\n`;

    // Process each file
    for (const filePath of sortedFiles) {
        const fileName = path.basename(filePath);
        const content = fs.readFileSync(filePath, 'utf8');

        console.log(`  Adding: ${fileName}`);

        // Add separator and file identifier
        concatenatedContent += `\n\n# ${fileName.replace('.md', '').replace(/-/g, ' ').toUpperCase()}\n\n`;
        concatenatedContent += content;
        concatenatedContent += `\n\n---\n\n`;
    }

    // Write the concatenated file
    const outputFileName = `${workbookName}-complete-workbook.md`;
    const outputPath = path.join(workbookPath, outputFileName);

    fs.writeFileSync(outputPath, concatenatedContent);
    console.log(`✅ Created: ${outputFileName}`);

    return outputPath;
}

// Main execution
function main() {
    const workbooksDir = 'procrastinator_workbooks';

    if (!fs.existsSync(workbooksDir)) {
        console.error('❌ procrastinator_workbooks directory not found');
        process.exit(1);
    }

    console.log('🚀 Starting workbook concatenation...\n');

    const workbookFolders = fs.readdirSync(workbooksDir).filter(item => {
        return fs.statSync(path.join(workbooksDir, item)).isDirectory();
    });

    const results = [];

    for (const folder of workbookFolders) {
        const workbookPath = path.join(workbooksDir, folder);
        try {
            const outputPath = concatenateWorkbook(workbookPath);
            results.push({
                folder,
                outputPath,
                success: true
            });
        } catch (error) {
            console.error(`❌ Error processing ${folder}:`, error.message);
            results.push({
                folder,
                error: error.message,
                success: false
            });
        }
        console.log(''); // Empty line between workbooks
    }

    // Summary
    console.log('📊 SUMMARY:');
    console.log('='.repeat(50));

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Successfully created: ${successful.length} workbooks`);
    successful.forEach(r => {
        console.log(`   - ${r.folder}`);
    });

    if (failed.length > 0) {
        console.log(`❌ Failed: ${failed.length} workbooks`);
        failed.forEach(r => {
            console.log(`   - ${r.folder}: ${r.error}`);
        });
    }

    console.log('\n🎉 Workbook concatenation complete!');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { concatenateWorkbook, getAllMarkdownFiles, sortFiles };