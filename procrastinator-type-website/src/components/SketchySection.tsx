'use client'
import { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'

interface SketchySectionProps {
  children: React.ReactNode
  variant?: 'paper' | 'note' | 'doodle' | 'margin'
  color?: string
  className?: string
  animate?: boolean
}

export default function SketchySection({ 
  children, 
  variant = 'paper', 
  color = '#9cae9c', 
  className = '',
  animate = false 
}: SketchySectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rc = rough.canvas(canvas)
    
    const drawSketchy = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.scale(2, 2)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const margin = 20
      const width = rect.width - margin * 2
      const height = rect.height - margin * 2

      switch (variant) {
        case 'paper':
          // Paper with torn edges
          rc.path(`M${margin},${margin + 5} 
                   Q${margin + 10},${margin} ${margin + 20},${margin + 3}
                   L${width - 20},${margin + 2}
                   Q${width - 10},${margin + 1} ${width},${margin + 8}
                   L${width + margin - 3},${height - 15}
                   Q${width + margin},${height - 5} ${width + margin - 8},${height + margin}
                   L${margin + 15},${height + margin - 2}
                   Q${margin + 5},${height + margin + 1} ${margin},${height - 10}
                   Z`, {
            fill: '#fefcfa',
            fillStyle: 'solid',
            stroke: color,
            strokeWidth: 1.5,
            roughness: 1.8,
            bowing: 2
          })
          break

        case 'note':
          // Notebook paper with lines
          rc.rectangle(margin, margin, width, height, {
            fill: '#f7f5f3',
            fillStyle: 'solid',
            stroke: color,
            strokeWidth: 2,
            roughness: 1.2
          })
          // Draw lines
          for (let i = margin + 40; i < height + margin; i += 25) {
            rc.line(margin + 15, i, width + margin - 15, i, {
              stroke: '#e2e8f0',
              strokeWidth: 1,
              roughness: 0.8
            })
          }
          // Red margin line
          rc.line(margin + 60, margin + 10, margin + 60, height + margin - 10, {
            stroke: '#f56565',
            strokeWidth: 2,
            roughness: 1.5
          })
          break

        case 'doodle':
          // Doodled border with decorations
          rc.rectangle(margin, margin, width, height, {
            stroke: color,
            strokeWidth: 2,
            roughness: 2.5,
            bowing: 1.5
          })
          // Add some doodles in corners
          rc.circle(margin + 20, margin + 20, 15, {
            stroke: '#d4a574',
            strokeWidth: 1.5,
            roughness: 2
          })
          rc.circle(width + margin - 20, height + margin - 20, 18, {
            stroke: '#c77d5c',
            strokeWidth: 1.5,
            roughness: 2.2
          })
          break

        case 'margin':
          // Side margin decoration
          rc.line(margin, margin, margin, height + margin, {
            stroke: color,
            strokeWidth: 3,
            roughness: 1.8
          })
          // Add some margin doodles
          for (let i = 0; i < 3; i++) {
            const y = margin + 50 + i * 60
            rc.circle(margin - 8, y, 8, {
              stroke: '#d4a574',
              strokeWidth: 1.5,
              roughness: 2.5,
              fill: '#ochre-light'
            })
          }
          break
      }
    }

    drawSketchy()
    
    const resizeObserver = new ResizeObserver(drawSketchy)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [variant, color])

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className} ${animate && isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  )
}