#!/usr/bin/env python3
"""
Workbook Generator using ReportLab + SVG imports
Creates hand-drawn style workbooks from markdown content
"""

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, 
    Table, TableStyle, Frame, PageTemplate, BaseDocTemplate
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import Color, black, white, HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Rect, String, Circle, Line
from reportlab.graphics import renderPDF
from reportlab.platypus.flowables import Flowable
import os
import re
from datetime import datetime
try:
    from svglib.svglib import renderSVG
    from reportlab.graphics import renderPDF
except ImportError:
    # SVG support optional for now
    renderSVG = None


class HandDrawnStyle:
    """Hand-drawn visual styling configuration"""
    
    # Colors (Excalidraw-inspired palette)
    COLORS = {
        'primary': HexColor('#1e1e1e'),      # Dark text
        'secondary': HexColor('#6c757d'),     # Gray text  
        'accent': HexColor('#4dabf7'),        # Blue accent
        'success': HexColor('#51cf66'),       # Green
        'warning': HexColor('#ffd43b'),       # Yellow
        'border': HexColor('#dee2e6'),        # Light gray borders
        'background': HexColor('#ffffff'),     # White background
        'light_fill': HexColor('#f8f9fa'),    # Very light gray
    }
    
    # Fonts (Virgil-inspired, using available fonts)
    FONTS = {
        'heading': 'Helvetica-Bold',
        'body': 'Helvetica', 
        'handwritten': 'Times-Italic',  # Closest to handwritten look
        'monospace': 'Courier',
    }
    
    # Sizes
    FONT_SIZES = {
        'title': 24,
        'heading1': 20,
        'heading2': 16,
        'heading3': 14,
        'body': 11,
        'small': 9,
        'tiny': 8,
    }


class SVGDecoration(Flowable):
    """Flowable to render SVG decorative elements"""
    
    def __init__(self, svg_path, width=None, height=None, scale=1.0):
        Flowable.__init__(self)
        self.svg_path = svg_path
        self.scale = scale
        
        if renderSVG and os.path.exists(svg_path):
            self.drawing = renderSVG(svg_path)
            self.width = width or (self.drawing.width * scale)
            self.height = height or (self.drawing.height * scale)
        else:
            # Fallback if SVG not available
            self.drawing = None
            self.width = width or 100
            self.height = height or 20
    
    def draw(self):
        """Render the SVG decoration"""
        if self.drawing:
            # Scale the drawing
            self.drawing.scale(self.scale, self.scale)
            # Render to canvas
            renderPDF.draw(self.drawing, self.canv, 0, 0)
        else:
            # Fallback drawing
            canvas = self.canv
            canvas.setStrokeColor(HandDrawnStyle.COLORS['border'])
            canvas.setLineWidth(1)
            canvas.line(0, self.height/2, self.width, self.height/2)


class HandDrawnBorder(Flowable):
    """Creates hand-drawn style borders using simple line variations"""
    
    def __init__(self, width, height, border_type='simple'):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.border_type = border_type
        
    def draw(self):
        """Draw the hand-drawn border"""
        canvas = self.canv
        
        if self.border_type == 'simple':
            self._draw_simple_border(canvas)
        elif self.border_type == 'dashed':
            self._draw_dashed_border(canvas)
        elif self.border_type == 'decorative':
            self._draw_decorative_border(canvas)
    
    def _draw_simple_border(self, canvas):
        """Draw a simple wobbly border"""
        canvas.setStrokeColor(HandDrawnStyle.COLORS['border'])
        canvas.setLineWidth(1.5)
        
        # Draw rectangle border
        canvas.rect(2, 2, self.width - 4, self.height - 4, fill=0, stroke=1)
    
    def _draw_dashed_border(self, canvas):
        """Draw a dashed border"""
        canvas.setStrokeColor(HandDrawnStyle.COLORS['border'])
        canvas.setLineWidth(1)
        canvas.setDash([3, 2])
        
        canvas.rect(2, 2, self.width - 4, self.height - 4)
        canvas.setDash()  # Reset dash
    
    def _draw_decorative_border(self, canvas):
        """Draw a decorative border with corner elements"""
        self._draw_simple_border(canvas)
        
        # Add corner decorations
        canvas.setFillColor(HandDrawnStyle.COLORS['accent'])
        corner_size = 4
        
        # Top-left corner
        canvas.circle(corner_size, self.height - corner_size, corner_size/2, fill=1)
        # Top-right corner
        canvas.circle(self.width - corner_size, self.height - corner_size, corner_size/2, fill=1)
        # Bottom-left corner  
        canvas.circle(corner_size, corner_size, corner_size/2, fill=1)
        # Bottom-right corner
        canvas.circle(self.width - corner_size, corner_size, corner_size/2, fill=1)


class WorkbookCanvas(canvas.Canvas):
    """Custom canvas with hand-drawn styling"""
    
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.page_num = 0
    
    def showPage(self):
        """Override to add page styling"""
        self.page_num += 1
        self._draw_page_decorations()
        canvas.Canvas.showPage(self)
    
    def _draw_page_decorations(self):
        """Add hand-drawn page decorations"""
        # Page number in bottom right
        self.setFont(HandDrawnStyle.FONTS['body'], HandDrawnStyle.FONT_SIZES['small'])
        self.setFillColor(HandDrawnStyle.COLORS['secondary'])
        
        page_width, page_height = letter
        self.drawRightString(page_width - 0.5*inch, 0.5*inch, str(self.page_num))
        
        # Optional: Add decorative elements
        self._draw_page_border()
    
    def _draw_page_border(self):
        """Add subtle page border"""
        page_width, page_height = letter
        margin = 0.3*inch
        
        self.setStrokeColor(HandDrawnStyle.COLORS['border'])
        self.setLineWidth(0.5)
        
        # Very subtle border around the entire page
        self.rect(margin, margin, page_width - 2*margin, page_height - 2*margin)


class WorkbookGenerator:
    """Main workbook generator class"""
    
    def __init__(self, output_dir="output"):
        self.output_dir = output_dir
        self.styles = self._create_styles()
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
    
    def _create_styles(self):
        """Create paragraph styles for different content types"""
        styles = getSampleStyleSheet()
        
        # Title style
        styles.add(ParagraphStyle(
            name='WorkbookTitle',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['heading'],
            fontSize=HandDrawnStyle.FONT_SIZES['title'],
            textColor=HandDrawnStyle.COLORS['primary'],
            spaceAfter=24,
            alignment=TA_CENTER,
        ))
        
        # Heading styles
        styles.add(ParagraphStyle(
            name='WorkbookHeading1',
            parent=styles['Normal'], 
            fontName=HandDrawnStyle.FONTS['heading'],
            fontSize=HandDrawnStyle.FONT_SIZES['heading1'],
            textColor=HandDrawnStyle.COLORS['primary'],
            spaceBefore=18,
            spaceAfter=12,
            leftIndent=0,
        ))
        
        styles.add(ParagraphStyle(
            name='WorkbookHeading2',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['heading'], 
            fontSize=HandDrawnStyle.FONT_SIZES['heading2'],
            textColor=HandDrawnStyle.COLORS['accent'],
            spaceBefore=14,
            spaceAfter=8,
            leftIndent=0,
        ))
        
        styles.add(ParagraphStyle(
            name='WorkbookHeading3',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['body'],
            fontSize=HandDrawnStyle.FONT_SIZES['heading3'],
            textColor=HandDrawnStyle.COLORS['primary'],
            spaceBefore=12,
            spaceAfter=6,
            leftIndent=0,
        ))
        
        # Body text style
        styles.add(ParagraphStyle(
            name='WorkbookBody',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['body'],
            fontSize=HandDrawnStyle.FONT_SIZES['body'],
            textColor=HandDrawnStyle.COLORS['primary'],
            spaceBefore=6,
            spaceAfter=6,
            alignment=TA_JUSTIFY,
            leftIndent=0,
            rightIndent=0,
        ))
        
        # Fillable line style
        styles.add(ParagraphStyle(
            name='WorkbookFillable',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['body'],
            fontSize=HandDrawnStyle.FONT_SIZES['body'],
            textColor=HandDrawnStyle.COLORS['primary'],
            spaceBefore=8,
            spaceAfter=8,
            borderWidth=0,
            borderColor=HandDrawnStyle.COLORS['border'],
        ))
        
        # Emphasis style
        styles.add(ParagraphStyle(
            name='WorkbookEmphasis',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['handwritten'],
            fontSize=HandDrawnStyle.FONT_SIZES['body'],
            textColor=HandDrawnStyle.COLORS['accent'],
            spaceBefore=6,
            spaceAfter=6,
            alignment=TA_CENTER,
        ))
        
        # Code/monospace style
        styles.add(ParagraphStyle(
            name='WorkbookCode',
            parent=styles['Normal'],
            fontName=HandDrawnStyle.FONTS['monospace'],
            fontSize=HandDrawnStyle.FONT_SIZES['small'],
            textColor=HandDrawnStyle.COLORS['secondary'],
            backColor=HandDrawnStyle.COLORS['light_fill'],
            spaceBefore=6,
            spaceAfter=6,
            leftIndent=12,
            rightIndent=12,
        ))
        
        return styles
    
    def parse_markdown_content(self, markdown_text):
        """Parse markdown content into reportlab elements"""
        story = []
        lines = markdown_text.split('\n')
        i = 0
        
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                story.append(Spacer(1, 6))
                i += 1
                continue
            
            # Handle headings
            if line.startswith('# '):
                text = line[2:].strip()
                story.append(Paragraph(text, self.styles['WorkbookTitle']))
            elif line.startswith('## '):
                text = line[3:].strip()
                story.append(Paragraph(text, self.styles['WorkbookHeading1']))
            elif line.startswith('### '):
                text = line[4:].strip()
                story.append(Paragraph(text, self.styles['WorkbookHeading2']))
            elif line.startswith('#### '):
                text = line[5:].strip()
                story.append(Paragraph(text, self.styles['WorkbookHeading3']))
            
            # Handle emphasis/bold text
            elif line.startswith('**') and line.endswith('**'):
                text = line[2:-2]
                story.append(Paragraph(f'<b>{text}</b>', self.styles['WorkbookEmphasis']))
            elif '*' in line:
                # Replace markdown emphasis with HTML
                text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line)
                text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
                story.append(Paragraph(text, self.styles['WorkbookBody']))
            
            # Handle fillable lines (_____ patterns)
            elif '____' in line:
                text = line.replace('____________________', '________________________________')
                story.append(Paragraph(text, self.styles['WorkbookFillable']))
            
            # Handle code blocks
            elif line.startswith('```'):
                i += 1
                code_lines = []
                while i < len(lines) and not lines[i].strip().startswith('```'):
                    code_lines.append(lines[i])
                    i += 1
                code_text = '\n'.join(code_lines)
                story.append(Paragraph(f'<pre>{code_text}</pre>', self.styles['WorkbookCode']))
            
            # Handle lists
            elif line.startswith('- '):
                text = line[2:].strip()
                story.append(Paragraph(f'• {text}', self.styles['WorkbookBody']))
            elif re.match(r'^\d+\. ', line):
                text = re.sub(r'^\d+\. ', '', line)
                story.append(Paragraph(f'1. {text}', self.styles['WorkbookBody']))
            
            # Handle horizontal rules
            elif line.startswith('---'):
                story.append(Spacer(1, 12))
                # Try to use SVG divider first, fallback to simple border
                svg_path = os.path.join(os.path.dirname(__file__), 'svg_elements', 'section_divider.svg')
                if os.path.exists(svg_path):
                    story.append(SVGDecoration(svg_path, width=6*inch, scale=0.5))
                else:
                    story.append(HandDrawnBorder(6*inch, 2, 'simple'))
                story.append(Spacer(1, 12))
            
            # Regular paragraph
            else:
                story.append(Paragraph(line, self.styles['WorkbookBody']))
            
            i += 1
        
        return story
    
    def generate_workbook_page(self, content, output_filename):
        """Generate a single workbook page from markdown content"""
        doc = SimpleDocTemplate(
            os.path.join(self.output_dir, output_filename),
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch,
            canvasmaker=WorkbookCanvas
        )
        
        # Parse content
        story = self.parse_markdown_content(content)
        
        # Add border around entire page content
        bordered_story = []
        
        # Top decorative border
        svg_path = os.path.join(os.path.dirname(__file__), 'svg_elements', 'section_divider.svg')
        if os.path.exists(svg_path):
            bordered_story.append(SVGDecoration(svg_path, width=7*inch, scale=0.6))
        else:
            bordered_story.append(HandDrawnBorder(7*inch, 0.1*inch, 'decorative'))
        
        bordered_story.extend(story)
        bordered_story.append(Spacer(1, 12))
        
        # Bottom decorative border
        if os.path.exists(svg_path):
            bordered_story.append(SVGDecoration(svg_path, width=7*inch, scale=0.6))
        else:
            bordered_story.append(HandDrawnBorder(7*inch, 0.1*inch, 'decorative'))
        
        # Build PDF
        doc.build(bordered_story)
        
        print(f"Generated: {output_filename}")
    
    def generate_full_workbook(self, content_dir, workbook_title="Procrastination Workbook"):
        """Generate complete workbook from directory of markdown files"""
        # Implementation for full workbook generation
        pass


def main():
    """Test the workbook generator"""
    generator = WorkbookGenerator("test_output")
    
    # Test with sample content
    test_content = """
# Day 1: Understanding Your Fear - The Foundation

**Today's Focus:** Identify the specific fears driving your avoidance patterns
**Time Commitment:** 20 minutes
**Core Exercise:** Fear Inventory

---

## Morning Check-in (2 minutes)

**Daily Questions:**
- What am I avoiding today and what fear is driving it?
- What is one small step I can take toward a feared task?
- How can I show myself compassion around this challenge?

*Write your responses here:*
```
Fear I'm experiencing today: ____________________

Avoided task: ____________________

One small step: ____________________
```

---

## Main Exercise: Fear Inventory (15 minutes)

**Purpose:** Map the specific fears that fuel your procrastination patterns

### Step 1: Identify Your Current Avoidance (5 minutes)
Think about tasks you've been putting off. List 3-5 specific items:

1. ____________________
2. ____________________
3. ____________________
4. ____________________
5. ____________________

### Step 2: Dig Deeper Into the Fears (10 minutes)
For each avoided task, complete this framework:

**Task:** ____________________
**What specifically am I afraid might happen?**
- ____________________
- ____________________

**What would this mean about me if it happened?**
- ____________________

**How likely is this fear to actually occur? (1-10 scale)** ____

---

## Single Small Step Commitment (2 minutes)

**Purpose:** Build momentum with minimal action

Choose ONE tiny action (5 minutes or less) toward a feared task:

**My commitment for today:** ____________________

**When I will do it:** ____________________

**How I expect to feel before:** ____________________

---

## Evening Reflection (1 minute)

**Did you complete your small step?** Yes / No

**How did you actually feel during/after?** ____________________

**What did you learn about your fear today?** ____________________

---

## Tomorrow's Preparation
Tomorrow we'll start tracking how your emotions connect to your avoidance patterns. Keep your fear inventory handy as a reference.

**Courage Building Thought:**
*"Every fear I name loses some of its power over me. I am building awareness, not judgment."*
"""
    
    generator.generate_workbook_page(test_content, "test_day_1.pdf")
    print("Test page generated successfully!")


if __name__ == "__main__":
    main()