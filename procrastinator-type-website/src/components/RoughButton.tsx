'use client'
import { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'

interface RoughButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function RoughButton({ children, onClick, className = '' }: RoughButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rc = rough.canvas(canvas)
    const drawButton = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.scale(2, 2)
        
        const padding = 4
        const buttonRect = {
          x: padding,
          y: padding,
          width: rect.width - padding * 2,
          height: rect.height - padding * 2
        }
        
        rc.rectangle(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height, {
          stroke: '#4f46e5',
          strokeWidth: isHovered ? 3 : 2,
          roughness: 1.3,
          bowing: 0.6,
          fill: '#6366f1',
          fillStyle: 'hachure',
          fillWeight: isHovered ? 0.5 : 1,
          hachureAngle: 45,
          hachureGap: isHovered ? 12 : 6
        })
      }
    }

    drawButton()
    
    const resizeObserver = new ResizeObserver(drawButton)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [isHovered])

  return (
    <div 
      ref={containerRef} 
      className={`relative cursor-pointer transition-transform duration-200 ${isHovered ? 'scale-105' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
      />
      <div className="relative z-10 px-8 py-4 text-center">
        {children}
      </div>
    </div>
  )
}