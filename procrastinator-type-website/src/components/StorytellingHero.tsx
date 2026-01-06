'use client'
import { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'
import Link from 'next/link'
import SvgIcon from './SvgIcon'

export default function StorytellingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rc = rough.canvas(canvas)
    
    const drawHero = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.scale(2, 2)
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw decorative elements with static positioning
      
      // Floating thought bubbles
      const bubbles = [
        { x: rect.width * 0.1, y: rect.height * 0.2, size: 40 },
        { x: rect.width * 0.85, y: rect.height * 0.15, size: 25 },
        { x: rect.width * 0.75, y: rect.height * 0.7, size: 30 },
        { x: rect.width * 0.15, y: rect.height * 0.8, size: 35 }
      ]

      bubbles.forEach((bubble, i) => {
        rc.circle(bubble.x, bubble.y, bubble.size, {
          stroke: i % 2 === 0 ? '#9cae9c' : '#d4a574',
          strokeWidth: 1.5,
          fill: '#fefcfa',
          fillStyle: 'solid',
          roughness: 2 + i * 0.3,
          bowing: 1 + i * 0.2
        })

        // Add smaller bubble tails
        const tailX = bubble.x - bubble.size * 0.3
        const tailY = bubble.y + bubble.size * 0.4
        rc.circle(tailX, tailY, bubble.size * 0.3, {
          stroke: i % 2 === 0 ? '#9cae9c' : '#d4a574',
          strokeWidth: 1,
          fill: '#fefcfa',
          fillStyle: 'solid',
          roughness: 2.5
        })
        
        rc.circle(tailX - bubble.size * 0.2, tailY + bubble.size * 0.2, bubble.size * 0.15, {
          stroke: i % 2 === 0 ? '#9cae9c' : '#d4a574',
          strokeWidth: 1,
          fill: '#fefcfa',
          fillStyle: 'solid',
          roughness: 3
        })
      })

      // Draw squiggly lines connecting elements
      rc.path(`M50,${rect.height * 0.3} Q${rect.width * 0.3},${rect.height * 0.25} ${rect.width * 0.6},${rect.height * 0.35}`, {
        stroke: '#c77d5c',
        strokeWidth: 2,
        roughness: 2.5,
        bowing: 2
      })

      rc.path(`M${rect.width * 0.7},${rect.height * 0.6} Q${rect.width * 0.5},${rect.height * 0.75} ${rect.width * 0.2},${rect.height * 0.65}`, {
        stroke: '#9cae9c',
        strokeWidth: 1.5,
        roughness: 2,
        bowing: 1.5
      })

      // Add some doodled stars and shapes
      const stars = [
        { x: rect.width * 0.2, y: rect.height * 0.1 },
        { x: rect.width * 0.9, y: rect.height * 0.3 },
        { x: rect.width * 0.8, y: rect.height * 0.9 },
        { x: rect.width * 0.05, y: rect.height * 0.6 }
      ]

      stars.forEach((star, i) => {
        rc.path(`M${star.x},${star.y - 8} L${star.x + 3},${star.y - 2} L${star.x + 8},${star.y} L${star.x + 3},${star.y + 2} L${star.x},${star.y + 8} L${star.x - 3},${star.y + 2} L${star.x - 8},${star.y} L${star.x - 3},${star.y - 2} Z`, {
          stroke: '#d4a574',
          strokeWidth: 1.5,
          fill: '#ochre-light',
          fillStyle: 'hachure',
          hachureAngle: 45 + i * 30,
          hachureGap: 4,
          roughness: 2.5
        })
      })
    }

    drawHero()
    
    const resizeObserver = new ResizeObserver(drawHero)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-block mb-8">
          <span className="px-4 py-2 bg-charcoal text-warm-white text-sm font-semibold rounded-full border-sketch">
            Science-Backed • Personalized • Proven
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-charcoal mb-4 leading-none">
            <span className="block mb-2">
              Stop
            </span>
            <span className="block text-terracotta underline-sketch">
              Procrastinating
            </span>
            <span className="block mt-4 text-4xl md:text-6xl text-slate">
              Start Living
            </span>
          </h1>
        </div>

        {/* Value proposition description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-slate leading-relaxed mb-6">
            Find out which of the <em className="text-terracotta font-semibold underline-sketch">6 research-backed procrastination types</em> you are.
          </p>
          <p className="text-lg text-slate-light">
            Get personalized strategies that actually work for your specific psychological patterns,
            not generic advice that assumes everyone's brain works the same way.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <Link 
            href="/quiz" 
            className="
              group relative px-8 py-4 text-charcoal border-2 border-charcoal font-semibold 
              rounded-full transition-all duration-300 cursor-sketch hover:bg-terracotta/10
            "
          >
            Discover Your Type
          </Link>
          
          <Link 
            href="#story" 
            className="
              group px-6 py-3 text-charcoal font-medium border-2 
              border-sage rounded-full transition-all duration-300
            "
          >
            Learn More
          </Link>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-light">
          <div className="flex items-center">
            <SvgIcon name="target" size={24} className="mr-2 text-sage" />
            <span className="text-sm">6 unique types</span>
          </div>
          <div className="flex items-center">
            <SvgIcon name="brain" size={24} className="mr-2 text-ochre" />
            <span className="text-sm">Research-backed</span>
          </div>
          <div className="flex items-center">
            <SvgIcon name="sparkles" size={24} className="mr-2 text-terracotta" />
            <span className="text-sm">Personalized strategies</span>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sage rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}