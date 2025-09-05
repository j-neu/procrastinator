#!/usr/bin/env python3
"""
Generate workbook pages from markdown content
"""

import os
import sys
from workbook_generator import WorkbookGenerator

def generate_avoidance_workbook():
    """Generate the Avoidance Procrastinator Workbook"""
    
    # Paths
    workbook_dir = os.path.join('..', 'procrastinator_workbooks', 'avoidance procrastinator')
    output_dir = 'avoidance_procrastinator_workbook'
    
    if not os.path.exists(workbook_dir):
        print(f"Error: Workbook directory not found: {workbook_dir}")
        return False
    
    generator = WorkbookGenerator(output_dir)
    
    # Generate introduction
    intro_path = os.path.join(workbook_dir, 'workbook-introduction.md')
    if os.path.exists(intro_path):
        with open(intro_path, 'r', encoding='utf-8') as f:
            content = f.read()
        generator.generate_workbook_page(content, 'introduction.pdf')
        print("Generated: introduction.pdf")
    
    # Generate day pages
    days_dir = os.path.join(workbook_dir, 'days')
    if os.path.exists(days_dir):
        for day_file in sorted(os.listdir(days_dir)):
            if day_file.endswith('.md'):
                day_path = os.path.join(days_dir, day_file)
                with open(day_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract day number from filename
                day_name = day_file.replace('.md', '')
                output_name = f"{day_name}.pdf"
                
                generator.generate_workbook_page(content, output_name)
                print(f"Generated: {output_name}")
    
    print(f"\nComplete workbook generated in: {output_dir}")
    return True

def generate_sample_pages():
    """Generate a few sample pages for testing"""
    
    workbook_dir = os.path.join('..', 'procrastinator_workbooks', 'avoidance procrastinator')
    output_dir = 'sample_pages'
    
    if not os.path.exists(workbook_dir):
        print(f"Error: Workbook directory not found: {workbook_dir}")
        return False
    
    generator = WorkbookGenerator(output_dir)
    
    # Sample pages to generate
    sample_files = [
        ('workbook-introduction.md', 'sample_introduction.pdf'),
        ('days/day-1.md', 'sample_day_1.pdf'),
        ('days/day-15.md', 'sample_day_15.pdf'),
        ('days/day-31.md', 'sample_day_31.pdf')
    ]
    
    for source_file, output_name in sample_files:
        source_path = os.path.join(workbook_dir, source_file)
        if os.path.exists(source_path):
            with open(source_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            generator.generate_workbook_page(content, output_name)
            print(f"Generated sample: {output_name}")
        else:
            print(f"Skipped (not found): {source_file}")
    
    print(f"\nSample pages generated in: {output_dir}")
    return True

def main():
    """Main function"""
    if len(sys.argv) > 1 and sys.argv[1] == 'full':
        print("Generating complete Avoidance Procrastinator Workbook...")
        generate_avoidance_workbook()
    else:
        print("Generating sample pages for testing...")
        generate_sample_pages()
        print("\nTo generate the complete workbook, run: python generate_workbook.py full")

if __name__ == "__main__":
    main()