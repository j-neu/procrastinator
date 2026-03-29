"""
Book Cover Generator using Python + Pillow (PIL)
Method #5 from PDFrecommendations.md

This creates raster-based covers with image manipulation
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

# Book dimensions at 300 DPI for print
DPI = 300
WIDTH = int(6 * DPI)   # 6 inches
HEIGHT = int(9 * DPI)  # 9 inches

# Book metadata
BOOK_DATA = {
    "title": "The Active Procrastinator",
    "subtitle": "Break Free from the Pressure Addiction",
    "author": "Cognitive Dismantling Series",
    "tagline": "You don't need the fear. You never did.",
}

def create_gradient_cover(output_path):
    """Create a cover with smooth gradient and glow effects"""
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#0a0a0a')
    draw = ImageDraw.Draw(img)
    
    # Create radial gradient
    for y in range(HEIGHT):
        for x in range(WIDTH):
            # Distance from center
            cx, cy = WIDTH * 0.5, HEIGHT * 0.5
            dist = math.sqrt((x - cx)**2 + (y - cy)**2)
            max_dist = math.sqrt(cx**2 + cy**2)
            
            # Gradient colors
            r = int(30 + 20 * (1 - dist/max_dist))
            g = int(30 + 40 * (1 - dist/max_dist))
            b = int(60 + 80 * (1 - dist/max_dist))
            draw.point((x, y), fill=(r, g, b))
    
    # Add glow effect
    glow = Image.new('RGB', (WIDTH, HEIGHT), color='#000000')
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([WIDTH*0.3, HEIGHT*0.3, WIDTH*0.7, HEIGHT*0.7], 
                       fill='#ff416c')
    glow = glow.filter(ImageFilter.GaussianBlur(radius=100))
    
    # Blend glow
    img = Image.blend(img, glow, 0.3)
    draw = ImageDraw.Draw(img)
    
    # Title
    try:
        font_large = ImageFont.truetype("arial.ttf", 100)
        font_medium = ImageFont.truetype("arial.ttf", 40)
        font_small = ImageFont.truetype("arial.ttf", 30)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
        font_small = font_large
    
    # Draw text
    draw.text((WIDTH * 0.5, HEIGHT * 0.35), "THE ACTIVE", 
              font=font_large, fill='#ffffff', anchor='mm')
    draw.text((WIDTH * 0.5, HEIGHT * 0.45), "PROCRASTINATOR", 
              font=font_large, fill='#ffffff', anchor='mm')
    draw.text((WIDTH * 0.5, HEIGHT * 0.55), "Break Free from the Pressure Addiction", 
              font=font_medium, fill='#aaaaaa', anchor='mm')
    
    # Author
    draw.text((WIDTH * 0.5, HEIGHT * 0.85), "COGNITIVE DISMANTLING SERIES", 
              font=font_small, fill='#ff416c', anchor='mm')
    
    # Save as PDF
    img.save(output_path, 'PDF', resolution=DPI)
    print(f"Created: {output_path}")

def create_noise_texture_cover(output_path):
    """Create a cover with noise texture and bold typography"""
    import random
    
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#1a1a1a')
    draw = ImageDraw.Draw(img)
    
    # Add noise texture
    for y in range(HEIGHT):
        for x in range(WIDTH):
            if random.random() < 0.3:
                noise = random.randint(0, 30)
                draw.point((x, y), fill=(noise, noise, noise))
    
    # Add color blocks
    draw.rectangle([0, HEIGHT*0.35, WIDTH, HEIGHT*0.65], fill='#e63946')
    
    # Title
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 90)
        font_medium = ImageFont.truetype("arial.ttf", 35)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
    
    draw.text((WIDTH * 0.5, HEIGHT * 0.42), "THE ACTIVE", 
              font=font_large, fill='#ffffff', anchor='mm')
    draw.text((WIDTH * 0.5, HEIGHT * 0.52), "PROCRASTINATOR", 
              font=font_large, fill='#ffffff', anchor='mm')
    
    # Subtitle
    draw.text((WIDTH * 0.5, HEIGHT * 0.72), "Break Free from the Pressure Addiction", 
              font=font_medium, fill='#888888', anchor='mm')
    
    # Author
    draw.text((WIDTH * 0.5, HEIGHT * 0.88), "COGNITIVE DISMANTLING SERIES", 
              font=font_medium, fill='#e63946', anchor='mm')
    
    img.save(output_path, 'PDF', resolution=DPI)
    print(f"Created: {output_path}")

def create_abstract_shapes_cover(output_path):
    """Create a cover with abstract painted shapes"""
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#f5f0e6')
    draw = ImageDraw.Draw(img)
    
    # Abstract shapes
    # Large blue blob
    draw.ellipse([WIDTH*0.1, HEIGHT*0.2, WIDTH*0.5, HEIGHT*0.6], 
                 fill='#2a5298')
    
    # Red accent
    draw.ellipse([WIDTH*0.4, HEIGHT*0.5, WIDTH*0.9, HEIGHT*0.9], 
                 fill='#e63946')
    
    # Yellow triangle approximation
    draw.polygon([(WIDTH*0.6, HEIGHT*0.1), 
                  (WIDTH*1.1, HEIGHT*0.4), 
                  (WIDTH*0.6, HEIGHT*0.5)], 
                 fill='#f4a261')
    
    # Title with shadow
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 80)
        font_medium = ImageFont.truetype("arial.ttf", 30)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
    
    # Shadow
    draw.text((WIDTH * 0.5 + 4, HEIGHT * 0.42 + 4), "THE ACTIVE", 
              font=font_large, fill='#00000044', anchor='mm')
    draw.text((WIDTH * 0.5 + 4, HEIGHT * 0.52 + 4), "PROCRASTINATOR", 
              font=font_large, fill='#00000044', anchor='mm')
    
    # Main text
    draw.text((WIDTH * 0.5, HEIGHT * 0.42), "THE ACTIVE", 
              font=font_large, fill='#ffffff', anchor='mm')
    draw.text((WIDTH * 0.5, HEIGHT * 0.52), "PROCRASTINATOR", 
              font=font_large, fill='#ffffff', anchor='mm')
    
    # Subtitle
    draw.text((WIDTH * 0.5, HEIGHT * 0.75), "Break Free from the Pressure Addiction", 
              font=font_medium, fill='#333333', anchor='mm')
    
    # Author
    draw.text((WIDTH * 0.5, HEIGHT * 0.88), "COGNITIVE DISMANTLING SERIES", 
              font=font_medium, fill='#1a1a1a', anchor='mm')
    
    img.save(output_path, 'PDF', resolution=DPI)
    print(f"Created: {output_path}")

def create_retro_futuristic_cover(output_path):
    """Create a retro-futuristic 80s style cover"""
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#0f0f23')
    draw = ImageDraw.Draw(img)
    
    # Grid lines
    for i in range(0, WIDTH, 40):
        draw.line([(i, 0), (i, HEIGHT)], fill='#1a1a3e', width=1)
    for i in range(0, HEIGHT, 40):
        draw.line([(0, i), (WIDTH, i)], fill='#1a1a3e', width=1)
    
    # Sun/horizon effect
    for i in range(100):
        y = HEIGHT * 0.6 - i * 3
        color_val = int(255 * (1 - i/100))
        draw.line([(0, y), (WIDTH, y)], 
                  fill=(color_val, int(color_val*0.3), int(color_val*0.5)), width=3)
    
    # Neon title
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 85)
        font_medium = ImageFont.truetype("arial.ttf", 32)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
    
    # Glow effect for title
    for offset in range(10, 0, -2):
        alpha = int(50 * (1 - offset/10))
        draw.text((WIDTH * 0.5 + offset, HEIGHT * 0.35 + offset), "THE ACTIVE", 
                  font=font_large, fill=f'#ff00ff', anchor='mm')
    
    draw.text((WIDTH * 0.5, HEIGHT * 0.35), "THE ACTIVE", 
              font=font_large, fill='#00ffff', anchor='mm')
    draw.text((WIDTH * 0.5, HEIGHT * 0.45), "PROCRASTINATOR", 
              font=font_large, fill='#ff00ff', anchor='mm')
    
    # Subtitle
    draw.text((WIDTH * 0.5, HEIGHT * 0.7), "Break Free from the Pressure Addiction", 
              font=font_medium, fill='#ffffff', anchor='mm')
    
    # Author
    draw.text((WIDTH * 0.5, HEIGHT * 0.88), "COGNITIVE DISMANTLING SERIES", 
              font=font_medium, fill='#00ffff', anchor='mm')
    
    img.save(output_path, 'PDF', resolution=DPI)
    print(f"Created: {output_path}")

def create_interior_page(output_path):
    """Create a sample interior page"""
    img = Image.new('RGB', (WIDTH, HEIGHT), color='#ffffff')
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 50)
        font_chapter = ImageFont.truetype("arialbd.ttf", 25)
        font_body = ImageFont.truetype("arial.ttf", 22)
        font_small = ImageFont.truetype("arial.ttf", 18)
    except:
        font_title = ImageFont.load_default()
        font_chapter = font_title
        font_body = font_title
        font_small = font_title
    
    # Chapter header
    draw.text((WIDTH * 0.1, HEIGHT * 0.08), "CHAPTER 1", 
              font=font_chapter, fill='#e63946')
    
    draw.text((WIDTH * 0.1, HEIGHT * 0.14), "The Worst Adrenaline Junkie", 
              font=font_title, fill='#1a1a1a')
    draw.text((WIDTH * 0.1, HEIGHT * 0.19), "I Have Yet to Meet", 
              font=font_title, fill='#1a1a1a')
    
    # Divider
    draw.rectangle([WIDTH * 0.1, HEIGHT * 0.24, WIDTH * 0.5, HEIGHT * 0.242], 
                   fill='#e63946')
    
    # Body text
    body_text = [
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
    
    y = HEIGHT * 0.3
    for line in body_text:
        draw.text((WIDTH * 0.1, y), line, font=font_body, fill='#333333')
        y += 35
    
    # Exercise box
    draw.rectangle([WIDTH * 0.1, HEIGHT * 0.6, WIDTH * 0.9, HEIGHT * 0.85], 
                   fill='#f5f5f5')
    draw.rectangle([WIDTH * 0.1, HEIGHT * 0.6, WIDTH * 0.105, HEIGHT * 0.85], 
                   fill='#e63946')
    
    draw.text((WIDTH * 0.12, HEIGHT * 0.62), "Exercise: The Cost of the Rush", 
              font=font_chapter, fill='#1a1a1a')
    draw.text((WIDTH * 0.12, HEIGHT * 0.68), "Note: Use a separate notebook for exercises.", 
              font=font_small, fill='#666666')
    
    draw.text((WIDTH * 0.12, HEIGHT * 0.74), "1. Recall the feeling of the 'Rush'", 
              font=font_body, fill='#333333')
    draw.text((WIDTH * 0.12, HEIGHT * 0.78), "2. Now, recall the Aftermath", 
              font=font_body, fill='#333333')
    draw.text((WIDTH * 0.12, HEIGHT * 0.82), "3. Write down three specific 'costs'", 
              font=font_body, fill='#333333')
    
    # Page number
    draw.text((WIDTH * 0.5, HEIGHT * 0.95), "1", 
              font=font_body, fill='#999999', anchor='mm')
    
    img.save(output_path, 'PDF', resolution=DPI)
    print(f"Created: {output_path}")

def main():
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)
    
    print("\n=== Python + Pillow Covers ===\n")
    
    create_gradient_cover(os.path.join(output_dir, "pillow-gradient-cover.pdf"))
    create_noise_texture_cover(os.path.join(output_dir, "pillow-noise-texture-cover.pdf"))
    create_abstract_shapes_cover(os.path.join(output_dir, "pillow-abstract-shapes-cover.pdf"))
    create_retro_futuristic_cover(os.path.join(output_dir, "pillow-retro-futuristic-cover.pdf"))
    create_interior_page(os.path.join(output_dir, "pillow-interior-sample.pdf"))
    
    print(f"\n[DONE] Pillow covers created in: {output_dir}\n")

if __name__ == "__main__":
    main()
