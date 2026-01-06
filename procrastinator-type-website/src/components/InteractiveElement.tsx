'use client'
import { useState, useEffect, useRef } from 'react'

interface InteractiveElementProps {
  children: React.ReactNode
  effect?: 'wiggle' | 'bounce' | 'rotate' | 'scale' | 'drift'
  trigger?: 'hover' | 'scroll' | 'click' | 'auto'
  className?: string
}

export default function InteractiveElement({
  children,
  effect = 'wiggle',
  trigger = 'hover',
  className = ''
}: InteractiveElementProps) {
  const [isActive, setIsActive] = useState(false)
  const [autoTrigger, setAutoTrigger] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setAutoTrigger(prev => !prev)
      }, 3000 + Math.random() * 2000) // Random interval between 3-5 seconds
      
      return () => clearInterval(interval)
    }
  }, [trigger])

  useEffect(() => {
    if (trigger === 'scroll') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsActive(entry.isIntersecting)
        },
        { threshold: 0.5 }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => observer.disconnect()
    }
  }, [trigger])

  const getEffectClass = () => {
    const active = trigger === 'auto' ? autoTrigger : isActive
    
    if (!active) return ''

    switch (effect) {
      case 'wiggle':
        return 'animate-wiggle'
      case 'bounce':
        return 'animate-bounce'
      case 'rotate':
        return 'animate-spin-slow'
      case 'scale':
        return 'transform scale-110'
      case 'drift':
        return 'animate-float'
      default:
        return ''
    }
  }

  const handleInteraction = () => {
    if (trigger === 'click') {
      setIsActive(prev => !prev)
    }
  }

  const getTriggerProps = () => {
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: () => setIsActive(true),
          onMouseLeave: () => setIsActive(false)
        }
      case 'click':
        return {
          onClick: handleInteraction,
          className: 'cursor-pointer'
        }
      default:
        return {}
    }
  }

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-500 ${getEffectClass()} ${className}`}
      {...getTriggerProps()}
    >
      {children}
    </div>
  )
}

// Add custom animation to globals.css
export const additionalCSS = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.animate-wiggle {
  animation: wiggle 0.5s ease-in-out infinite;
}
`