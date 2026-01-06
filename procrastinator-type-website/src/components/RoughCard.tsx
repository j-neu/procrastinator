'use client'
import { useEffect, useRef } from 'react'
import rough from 'roughjs'

interface RoughCardProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function RoughCard({ children, color = '#000000', className = '' }: RoughCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rc = rough.canvas(canvas)
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(2, 2)
        
        rc.rectangle(8, 8, rect.width - 16, rect.height - 16, {
          stroke: color,
          strokeWidth: 2,
          roughness: 1.2,
          bowing: 0.5,
          fill: '#ffffff',
          fillStyle: 'solid',
          fillWeight: 0.5,
          hachureAngle: 45,
          hachureGap: 8
        })
      }
    }

    resizeCanvas()
    
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [color])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  )
}