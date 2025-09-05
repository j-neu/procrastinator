// Canvas Drawing Functions for Hand-drawn Style
class CanvasDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.roughness = 1.5; // Controls how "wobbly" lines are
        this.seed = Math.random() * 1000; // For consistent randomness
    }

    // Generate wobbly line points
    wobblifyLine(x1, y1, x2, y2, segments = 10) {
        const points = [];
        const dx = (x2 - x1) / segments;
        const dy = (y2 - y1) / segments;
        
        for (let i = 0; i <= segments; i++) {
            const x = x1 + (dx * i);
            const y = y1 + (dy * i);
            
            // Add wobble - more in the middle, less at endpoints
            const wobbleAmount = Math.sin((i / segments) * Math.PI) * this.roughness;
            const wobbleX = x + (Math.random() - 0.5) * wobbleAmount;
            const wobbleY = y + (Math.random() - 0.5) * wobbleAmount;
            
            points.push({ x: wobbleX, y: wobbleY });
        }
        
        return points;
    }

    // Draw wobbly line
    drawWobblyLine(x1, y1, x2, y2, strokeWidth = 1, color = '#000000') {
        const points = this.wobblifyLine(x1, y1, x2, y2);
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        
        this.ctx.stroke();
    }

    // Draw wobbly rectangle border
    drawWobblyRect(x, y, width, height, strokeWidth = 2, color = '#333333') {
        // Draw each side with slight wobble
        this.drawWobblyLine(x, y, x + width, y, strokeWidth, color); // top
        this.drawWobblyLine(x + width, y, x + width, y + height, strokeWidth, color); // right
        this.drawWobblyLine(x + width, y + height, x, y + height, strokeWidth, color); // bottom
        this.drawWobblyLine(x, y + height, x, y, strokeWidth, color); // left
    }

    // Draw wobbly circle/oval
    drawWobblyCircle(centerX, centerY, radius, strokeWidth = 2, color = '#333333') {
        const segments = 32;
        const points = [];
        
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const wobble = (Math.random() - 0.5) * this.roughness;
            const r = radius + wobble;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            points.push({ x, y });
        }
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // Draw hand-drawn arrow
    drawWobblyArrow(x1, y1, x2, y2, headSize = 10, strokeWidth = 2, color = '#333333') {
        // Main line
        this.drawWobblyLine(x1, y1, x2, y2, strokeWidth, color);
        
        // Arrow head
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headAngle = Math.PI / 6; // 30 degrees
        
        const head1X = x2 - headSize * Math.cos(angle - headAngle);
        const head1Y = y2 - headSize * Math.sin(angle - headAngle);
        const head2X = x2 - headSize * Math.cos(angle + headAngle);
        const head2Y = y2 - headSize * Math.sin(angle + headAngle);
        
        this.drawWobblyLine(x2, y2, head1X, head1Y, strokeWidth, color);
        this.drawWobblyLine(x2, y2, head2X, head2Y, strokeWidth, color);
    }

    // Draw hand-drawn text with slight randomness
    drawHandDrawnText(text, x, y, fontSize = 16, color = '#333333', font = 'Arial') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}px ${font}`;
        
        // Add slight position randomness for each character
        let currentX = x;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = this.ctx.measureText(char).width;
            
            // Add slight vertical wobble
            const wobbleY = y + (Math.random() - 0.5) * 1;
            const wobbleX = currentX + (Math.random() - 0.5) * 0.5;
            
            this.ctx.fillText(char, wobbleX, wobbleY);
            currentX += charWidth;
        }
    }

    // Draw decorative border around entire page
    drawPageBorder(margin = 40, strokeWidth = 2, color = '#333333') {
        this.drawWobblyRect(
            margin, 
            margin, 
            this.canvas.width - (margin * 2), 
            this.canvas.height - (margin * 2),
            strokeWidth,
            color
        );
    }

    // Draw decorative corner elements
    drawCornerDecorations(margin = 40, size = 20) {
        const corners = [
            { x: margin, y: margin }, // top-left
            { x: this.canvas.width - margin, y: margin }, // top-right
            { x: margin, y: this.canvas.height - margin }, // bottom-left
            { x: this.canvas.width - margin, y: this.canvas.height - margin } // bottom-right
        ];
        
        corners.forEach(corner => {
            // Draw small decorative flourish at each corner
            this.drawWobblyCircle(corner.x, corner.y, 3, 1, '#666666');
            
            // Add small decorative lines
            this.drawWobblyLine(corner.x - size/2, corner.y, corner.x + size/2, corner.y, 1, '#888888');
            this.drawWobblyLine(corner.x, corner.y - size/2, corner.x, corner.y + size/2, 1, '#888888');
        });
    }

    // Draw underlined heading with hand-drawn style
    drawHandDrawnHeading(text, x, y, fontSize = 24, underline = true) {
        this.drawHandDrawnText(text, x, y, fontSize, '#2c3e50', 'Arial Black');
        
        if (underline) {
            const textWidth = this.ctx.measureText(text).width;
            this.drawWobblyLine(x, y + 5, x + textWidth, y + 5, 2, '#3498db');
        }
    }

    // Draw checkbox with wobbly lines
    drawCheckbox(x, y, size = 20, checked = false, strokeWidth = 2) {
        this.drawWobblyRect(x, y, size, size, strokeWidth, '#333333');
        
        if (checked) {
            // Draw check mark
            this.drawWobblyLine(x + size * 0.2, y + size * 0.5, x + size * 0.4, y + size * 0.7, strokeWidth, '#27ae60');
            this.drawWobblyLine(x + size * 0.4, y + size * 0.7, x + size * 0.8, y + size * 0.3, strokeWidth, '#27ae60');
        }
    }

    // Draw dotted line for writing
    drawWritingLine(x1, y1, x2, y2, dashLength = 5, color = '#cccccc') {
        const totalLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const numDashes = Math.floor(totalLength / (dashLength * 2));
        
        for (let i = 0; i < numDashes; i++) {
            const startRatio = (i * 2 * dashLength) / totalLength;
            const endRatio = ((i * 2 + 1) * dashLength) / totalLength;
            
            const startX = x1 + (x2 - x1) * startRatio;
            const startY = y1 + (y2 - y1) * startRatio;
            const endX = x1 + (x2 - x1) * endRatio;
            const endY = y1 + (y2 - y1) * endRatio;
            
            this.drawWobblyLine(startX, startY, endX, endY, 1, color);
        }
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}