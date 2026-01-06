'use client'
import { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'
import HandDrawnIcon from './HandDrawnIcon'

interface ProcrastinationTypeCardProps {
  type: string
  title: string
  description: string
  color: string
  position: 'left' | 'right' | 'center'
  index: number
  icon: string
  traits: string[]
  solution: string
  research?: string
  prevalence?: string
}

export default function ProcrastinationTypeCard({
  type,
  title,
  description,
  color,
  position,
  index,
  icon,
  traits,
  solution,
  research,
  prevalence
}: ProcrastinationTypeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rc = rough.canvas(canvas)
    
    const drawCard = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.scale(2, 2)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const margin = 12
      const width = rect.width - margin * 2
      const height = rect.height - margin * 2

      // Main card shape - slightly irregular
      const roughness = isHovered ? 2.2 : 1.8
      const bowing = isHovered ? 1.2 : 0.8

      // Create organic, asymmetric shape
      const cardPath = position === 'left' 
        ? `M${margin + 5},${margin + 8} 
           Q${margin + 25},${margin} ${width * 0.3 + margin},${margin + 3}
           L${width * 0.9 + margin},${margin + 5}
           Q${width + margin - 5},${margin + 12} ${width + margin - 2},${height * 0.2 + margin}
           L${width + margin - 8},${height * 0.8 + margin}
           Q${width + margin - 3},${height + margin - 8} ${width * 0.7 + margin},${height + margin - 3}
           L${margin + 20},${height + margin - 5}
           Q${margin + 2},${height + margin - 15} ${margin},${height * 0.6 + margin}
           Z`
        : position === 'right'
        ? `M${margin + 8},${margin + 12} 
           Q${margin + 15},${margin + 2} ${width * 0.4 + margin},${margin + 8}
           L${width * 0.85 + margin},${margin + 2}
           Q${width + margin - 8},${margin + 5} ${width + margin - 3},${height * 0.3 + margin}
           L${width + margin - 5},${height * 0.9 + margin}
           Q${width + margin - 12},${height + margin - 2} ${width * 0.6 + margin},${height + margin - 8}
           L${margin + 25},${height + margin - 3}
           Q${margin + 5},${height + margin - 12} ${margin + 3},${height * 0.7 + margin}
           Z`
        : `M${margin + 10},${margin + 6} 
           Q${margin + 30},${margin + 2} ${width * 0.5 + margin},${margin + 8}
           L${width * 0.8 + margin},${margin + 4}
           Q${width + margin - 10},${margin + 18} ${width + margin - 6},${height * 0.4 + margin}
           L${width + margin - 4},${height * 0.85 + margin}
           Q${width + margin - 15},${height + margin - 6} ${width * 0.5 + margin},${height + margin - 4}
           L${margin + 35},${height + margin - 8}
           Q${margin + 8},${height + margin - 20} ${margin + 4},${height * 0.5 + margin}
           Z`

      rc.path(cardPath, {
        fill: '#fefcfa',
        fillStyle: 'solid',
        stroke: color,
        strokeWidth: 2.5,
        roughness,
        bowing,
        fillWeight: 0.5
      })

      // Add shadow effect
      const shadowPath = cardPath.replace(/M(\d+),(\d+)/, (match, x, y) => 
        `M${parseInt(x) + 3},${parseInt(y) + 3}`
      )
      
      rc.path(shadowPath, {
        fill: color,
        fillStyle: 'hachure',
        stroke: 'none',
        hachureAngle: 45,
        hachureGap: 8,
        roughness: roughness * 0.8,
        fillWeight: 0.3
      })

      // Add decorative elements based on type
      if (type === 'arousal') {
        // Lightning bolt
        rc.path(`M${width * 0.8 + margin},${margin + 20} L${width * 0.75 + margin},${margin + 35} L${width * 0.82 + margin},${margin + 35} L${width * 0.77 + margin},${margin + 50}`, {
          stroke: '#d4a574',
          strokeWidth: 2,
          roughness: 1.5
        })
      } else if (type === 'perfectionist') {
        // Perfect circle (ironically imperfect)
        rc.circle(width * 0.85 + margin, margin + 30, 20, {
          stroke: '#c77d5c',
          strokeWidth: 1.5,
          roughness: 2.5
        })
      }
    }

    drawCard()
    
    const resizeObserver = new ResizeObserver(drawCard)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [color, position, type, isHovered])

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'mr-auto'
      case 'right':
        return 'ml-auto'
      default:
        return 'mx-auto'
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`
        relative max-w-md mb-16 cursor-pointer transition-all duration-300
        ${getPositionClasses()}
        ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'}
        ${position === 'left' ? 'stagger-1' : position === 'right' ? 'stagger-2' : 'stagger-3'}
        hover:shadow-lg
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      
      <div className="relative z-10 p-6">
        {/* Type badge */}
        <div className="inline-block mb-4">
          <span 
            className="px-3 py-1 text-sm font-semibold rounded-full border-sketch"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            Type {index + 1}
          </span>
        </div>

        {/* Icon and title */}
        <div className="flex items-center mb-4">
          <div className="mr-3">
            <HandDrawnIcon name={icon} size={48} />
          </div>
          <h3 className="text-2xl font-bold text-charcoal underline-sketch">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate mb-4 leading-relaxed text-sketch">
          {description}
        </p>

        {/* Traits */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-sage-dark mb-2 uppercase tracking-wider">
            Key Traits
          </h4>
          <ul className="text-sm text-slate-light">
            {traits.map((trait, i) => (
              <li key={i} className="mb-1 flex items-start">
                <span className="mr-2 text-ochre">→</span>
                {trait}
              </li>
            ))}
          </ul>
        </div>

        {/* Research foundation */}
        {research && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-sage/30">
            <h4 className="text-xs font-semibold text-sage-dark mb-1 uppercase tracking-wider">Research:</h4>
            <p className="text-xs text-slate">{research}</p>
          </div>
        )}

        {/* Prevalence data */}
        {prevalence && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-ochre/30">
            <h4 className="text-xs font-semibold text-ochre mb-1 uppercase tracking-wider">Prevalence:</h4>
            <p className="text-xs text-slate">{prevalence}</p>
          </div>
        )}

        {/* Solution preview */}
        <div className="mt-4 p-3 bg-white rounded-lg border-2 border-charcoal border-l-4" style={{ borderLeftColor: color }}>
          <h4 className="text-sm font-semibold text-charcoal mb-1">Evidence-Based Interventions:</h4>
          <p className="text-sm text-slate">{solution}</p>
        </div>
      </div>
    </div>
  )
}