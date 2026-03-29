"""
Book Cover Generator using Python + ReportLab
Method #4 from PDFrecommendations.md

This creates precise, programmatic covers with vector graphics
"""

from reportlab.lib.pagesizes import inch
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import math
import os

# Book dimensions (6x9 inches)
WIDTH = 6 * inch
HEIGHT = 9 * inch

# Book metadata
BOOK_DATA = {
    "title": "The Active Procrastinator",
    "subtitle": "Break Free from the Pressure Addiction",
    "author": "Cognitive Dismantling Series",
    "tagline": "You don't need the fear. You never did.",
}

def create_geometric_cover(output_path):
    """Create a geometric, constructivist-style cover"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # Background - deep navy
    c.setFillColor(HexColor("#0a0a1a"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Geometric shapes - constructivist style
    # Large red triangle
    c.setFillColor(HexColor("#e63946"))
    path = c.beginPath()
    path.moveTo(WIDTH * 0.3, HEIGHT * 0.9)
    path.lineTo(WIDTH * 0.8, HEIGHT * 0.5)
    path.lineTo(WIDTH * 0.3, HEIGHT * 0.1)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    
    # Yellow circle
    c.setFillColor(HexColor("#f4a261"))
    c.circle(WIDTH * 0.7, HEIGHT * 0.7, 80, fill=1, stroke=0)
    
    # Blue rectangle
    c.setFillColor(HexColor("#457b9d"))
    c.rect(WIDTH * 0.1, HEIGHT * 0.3, 150, 200, fill=1, stroke=0)
    
    # White diagonal stripe
    c.setFillColor(HexColor("#f1faee"))
    path = c.beginPath()
    path.moveTo(0, HEIGHT * 0.4)
    path.lineTo(WIDTH * 0.5, HEIGHT * 0.2)
    path.lineTo(WIDTH * 0.5, HEIGHT * 0.35)
    path.lineTo(0, HEIGHT * 0.55)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    
    # Title text - bold, modern
    c.setFillColor(HexColor("#0a0a1a"))
    c.setFont("Helvetica-Bold", 32)
    c.drawString(WIDTH * 0.15, HEIGHT * 0.42, "THE ACTIVE")
    c.drawString(WIDTH * 0.15, HEIGHT * 0.36, "PROCRASTINATOR")
    
    # Subtitle
    c.setFont("Helvetica", 12)
    c.drawString(WIDTH * 0.15, HEIGHT * 0.30, "Break Free from the Pressure Addiction")
    
    # Author at bottom
    c.setFillColor(HexColor("#f1faee"))
    c.setFont("Helvetica-Bold", 10)
    c.drawString(WIDTH * 0.15, HEIGHT * 0.08, "COGNITIVE DISMANTLING SERIES")
    
    c.save()
    print(f"Created: {output_path}")

def create_minimalist_lines_cover(output_path):
    """Create a minimalist cover with precise line work"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # White background
    c.setFillColor(HexColor("#ffffff"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Horizontal lines pattern
    c.setStrokeColor(HexColor("#000000"))
    c.setLineWidth(0.5)
    for i in range(50):
        y = HEIGHT * 0.2 + i * 8
        c.line(WIDTH * 0.1, y, WIDTH * 0.9, y)
    
    # Red accent block
    c.setFillColor(HexColor("#d62828"))
    c.rect(WIDTH * 0.1, HEIGHT * 0.55, WIDTH * 0.8, 120, fill=1, stroke=0)
    
    # Title
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.62, "THE ACTIVE")
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.56, "PROCRASTINATOR")
    
    # Subtitle below block
    c.setFillColor(HexColor("#000000"))
    c.setFont("Helvetica", 11)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.45, "Break Free from the Pressure Addiction")
    
    # Tagline
    c.setFont("Helvetica-Oblique", 10)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.18, '"You don\'t need the fear. You never did."')
    
    # Author
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.08, "COGNITIVE DISMANTLING SERIES")
    
    c.save()
    print(f"Created: {output_path}")

def create_spiral_cover(output_path):
    """Create a cover with mathematical spiral pattern"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # Dark background
    c.setFillColor(HexColor("#1a1a2e"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Golden spiral
    c.setStrokeColor(HexColor("#e94560"))
    c.setLineWidth(2)
    
    # Draw fibonacci spiral approximation
    cx, cy = WIDTH * 0.5, HEIGHT * 0.55
    for i in range(200):
        angle = i * 0.15
        r = 5 + i * 1.2
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        if i == 0:
            path = c.beginPath()
            path.moveTo(x, y)
        else:
            path.lineTo(x, y)
    c.drawPath(path, fill=0, stroke=1)
    
    # Second spiral in different color
    c.setStrokeColor(HexColor("#00d9ff"))
    c.setLineWidth(1)
    for i in range(150):
        angle = i * 0.18 + math.pi
        r = 5 + i * 1.0
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        if i == 0:
            path = c.beginPath()
            path.moveTo(x, y)
        else:
            path.lineTo(x, y)
    c.drawPath(path, fill=0, stroke=1)
    
    # Title
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 30)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.88, "THE ACTIVE")
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.82, "PROCRASTINATOR")
    
    # Subtitle
    c.setFont("Helvetica", 12)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.15, "Break Free from the Pressure Addiction")
    
    # Author
    c.setFillColor(HexColor("#e94560"))
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.08, "COGNITIVE DISMANTLING SERIES")
    
    c.save()
    print(f"Created: {output_path}")

def create_bauhaus_cover(output_path):
    """Create a Bauhaus-inspired cover"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # Cream background
    c.setFillColor(HexColor("#f5f0e6"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Primary color blocks - Bauhaus style
    # Blue square
    c.setFillColor(HexColor("#0044cc"))
    c.rect(0, HEIGHT * 0.6, WIDTH * 0.5, HEIGHT * 0.4, fill=1, stroke=0)
    
    # Red circle
    c.setFillColor(HexColor("#cc0000"))
    c.circle(WIDTH * 0.75, HEIGHT * 0.75, 70, fill=1, stroke=0)
    
    # Yellow triangle
    c.setFillColor(HexColor("#ffcc00"))
    path = c.beginPath()
    path.moveTo(WIDTH * 0.5, HEIGHT * 0.6)
    path.lineTo(WIDTH, HEIGHT * 0.6)
    path.lineTo(WIDTH * 0.75, HEIGHT * 0.35)
    path.close()
    c.drawPath(path, fill=1, stroke=0)
    
    # Black bar
    c.setFillColor(HexColor("#000000"))
    c.rect(0, HEIGHT * 0.55, WIDTH, 30, fill=1, stroke=0)
    
    # Title on black bar
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 22)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.56, "THE ACTIVE PROCRASTINATOR")
    
    # Subtitle
    c.setFillColor(HexColor("#000000"))
    c.setFont("Helvetica", 14)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.45, "Break Free from")
    c.drawString(WIDTH * 0.05, HEIGHT * 0.42, "the Pressure Addiction")
    
    # Tagline
    c.setFont("Helvetica-Oblique", 11)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.15, '"You don\'t need the fear."')
    
    # Author
    c.setFont("Helvetica-Bold", 10)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.08, "COGNITIVE DISMANTLING SERIES")
    
    c.save()
    print(f"Created: {output_path}")

def create_brutalist_cover(output_path):
    """Create a brutalist design with raw typography"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # Black background
    c.setFillColor(HexColor("#000000"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Massive cropped text
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 120)
    c.drawString(-20, HEIGHT * 0.5, "ACT")
    c.drawString(-20, HEIGHT * 0.25, "IVE")
    
    # Red accent bar
    c.setFillColor(HexColor("#ff0000"))
    c.rect(0, HEIGHT * 0.42, WIDTH, 8, fill=1, stroke=0)
    
    # Full title
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 14)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.88, "THE ACTIVE PROCRASTINATOR")
    
    # Subtitle
    c.setFont("Helvetica", 10)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.85, "Break Free from the Pressure Addiction")
    
    # Tagline at bottom
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.08, '"YOU DON\'T NEED THE FEAR. YOU NEVER DID."')
    
    # Author
    c.setFont("Helvetica-Bold", 8)
    c.drawString(WIDTH * 0.05, HEIGHT * 0.04, "COGNITIVE DISMANTLING SERIES")
    
    c.save()
    print(f"Created: {output_path}")

def create_interior_page(output_path, design_name):
    """Create a sample interior page"""
    c = canvas.Canvas(output_path, pagesize=(WIDTH, HEIGHT))
    
    # White background
    c.setFillColor(HexColor("#ffffff"))
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    
    # Chapter header
    c.setFillColor(HexColor("#e94560"))
    c.setFont("Helvetica-Bold", 12)
    c.drawString(WIDTH * 0.1, HEIGHT * 0.88, "CHAPTER 1")
    
    # Chapter title
    c.setFillColor(HexColor("#000000"))
    c.setFont("Helvetica-Bold", 24)
    c.drawString(WIDTH * 0.1, HEIGHT * 0.82, "The Worst Adrenaline Junkie")
    c.drawString(WIDTH * 0.1, HEIGHT * 0.77, "I Have Yet to Meet")
    
    # Divider line
    c.setStrokeColor(HexColor("#e94560"))
    c.setLineWidth(2)
    c.line(WIDTH * 0.1, HEIGHT * 0.74, WIDTH * 0.5, HEIGHT * 0.74)
    
    # Body text
    c.setFont("Helvetica", 11)
    text_lines = [
        "Perhaps I should begin by stating my credentials",
        "for writing this book. I am not a psychologist",
        "or a productivity guru. My qualifications are",
        "far more relevant. I spent twenty years of my",
        "life as a confirmed, badge-wearing Active",
        "Procrastinator.",
        "",
        "I wasn't just someone who put things off. I was",
        'a "pressure performer." I was the guy who would',
        "look at a three-week deadline, laugh, and not",
        "touch the project until forty-eight hours before",
        "it was due. And I would deliver.",
    ]
    
    y = HEIGHT * 0.68
    for line in text_lines:
        c.drawString(WIDTH * 0.1, y, line)
        y -= 16
    
    # Exercise box
    c.setFillColor(HexColor("#f5f5f5"))
    c.rect(WIDTH * 0.1, HEIGHT * 0.15, WIDTH * 0.8, HEIGHT * 0.25, fill=1, stroke=0)
    
    # Exercise accent line
    c.setFillColor(HexColor("#e94560"))
    c.rect(WIDTH * 0.1, HEIGHT * 0.15, 4, HEIGHT * 0.25, fill=1, stroke=0)
    
    # Exercise title
    c.setFillColor(HexColor("#000000"))
    c.setFont("Helvetica-Bold", 12)
    c.drawString(WIDTH * 0.15, HEIGHT * 0.36, "Exercise: The Cost of the Rush")
    
    # Exercise note
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(HexColor("#666666"))
    c.drawString(WIDTH * 0.15, HEIGHT * 0.33, "Note: Use a separate notebook for exercises.")
    
    # Exercise content
    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#000000"))
    c.drawString(WIDTH * 0.15, HEIGHT * 0.28, "1. Recall the feeling of the 'Rush'")
    c.drawString(WIDTH * 0.15, HEIGHT * 0.25, "2. Now, recall the Aftermath")
    c.drawString(WIDTH * 0.15, HEIGHT * 0.22, "3. Write down three specific 'costs'")
    
    # Page number
    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#999999"))
    c.drawCentredString(WIDTH * 0.5, HEIGHT * 0.05, "— 1 —")
    
    c.save()
    print(f"Created: {output_path}")

def main():
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)
    
    print("\n=== Python + ReportLab Covers ===\n")
    
    # Create covers
    create_geometric_cover(os.path.join(output_dir, "reportlab-geometric-cover.pdf"))
    create_minimalist_lines_cover(os.path.join(output_dir, "reportlab-minimalist-lines-cover.pdf"))
    create_spiral_cover(os.path.join(output_dir, "reportlab-spiral-cover.pdf"))
    create_bauhaus_cover(os.path.join(output_dir, "reportlab-bauhaus-cover.pdf"))
    create_brutalist_cover(os.path.join(output_dir, "reportlab-brutalist-cover.pdf"))
    
    # Create interior sample
    create_interior_page(os.path.join(output_dir, "reportlab-interior-sample.pdf"), "default")
    
    print(f"\n✅ ReportLab covers created in: {output_dir}\n")

if __name__ == "__main__":
    main()
