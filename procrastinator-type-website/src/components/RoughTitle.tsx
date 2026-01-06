'use client'
import { useEffect, useRef } from 'react'
import rough from 'roughjs'

interface RoughTitleProps {
  children: React.ReactNode
  className?: string
}

export default function RoughTitle({ children, className = '' }: RoughTitleProps) {
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
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const width = rect.width - 20
        const height = rect.height - 20
        
        rc.ellipse(centerX, centerY, width, height, {
          stroke: '#6366f1',
          strokeWidth: 3,
          roughness: 1.5,
          bowing: 0.8,
          fill: '#e0e7ff',
          fillStyle: 'cross-hatch',
          fillWeight: 0.3,
          hachureAngle: 30,
          hachureGap: 12
        })
      }
    }

    resizeCanvas()
    
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
      />
      <div className="relative z-10 py-8 px-6 text-center">
        {children}
      </div>
    </div>
  )
}