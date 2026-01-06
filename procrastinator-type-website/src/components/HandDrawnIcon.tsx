'use client'

interface HandDrawnIconProps {
  name: string
  className?: string
  size?: number
}

export default function HandDrawnIcon({ name, className = "", size = 24 }: HandDrawnIconProps) {
  const iconMap: Record<string, string> = {
    'lightning': '/beedii/high-voltage.svg',
    'shield': '/beedii/crown.svg', // Using crown as a protective symbol
    'scales': '/beedii/search.svg', // Using search as analysis/decision symbol
    'target': '/beedii/star.svg', // Using star as achievement/target symbol
    'cyclone': '/beedii/confused-face.svg', // Using confused face for chaotic/passive state
    'brain': '/beedii/squinting-face.svg', // Using squinting face for mental effort
    'microscope': '/beedii/search.svg', // Research/analysis
    'chart': '/beedii/star.svg', // Achievement/progress
    'gem': '/beedii/gem.svg', // Value/precious
    'heart': '/beedii/red-heart.svg', // Emotion/care
    'sun': '/beedii/sun.svg', // Energy/brightness
    'tree': '/beedii/tree.svg', // Growth/nature
    'tent': '/beedii/tent.svg', // Shelter/protection
    'crown': '/beedii/crown.svg', // Excellence/achievement
    'confetti': '/beedii/confetti.svg', // Celebration
    'camera': '/beedii/camera.svg', // Capture/record
    'knife': '/beedii/kitchen-knife.svg', // Precision/cutting through
    'voltage': '/beedii/high-voltage.svg', // Energy/power
    'tired': '/beedii/tired-face.svg', // Exhaustion
    'smile': '/beedii/smiling-face.svg', // Happiness
    'frown': '/beedii/frowning-face.svg', // Sadness
    'neutral': '/beedii/neutral-face.svg', // Neutral emotion
    'beaming': '/beedii/beaming-face.svg', // Joy
    'angry': '/beedii/angry-face.svg', // Frustration
    'confused': '/beedii/confused-face.svg', // Uncertainty
    'relieved': '/beedii/releived-face.svg', // Relief
    'shock': '/beedii/shock.svg', // Surprise
    'weary': '/beedii/weary-face.svg', // Exhaustion
  }

  const iconPath = iconMap[name]
  
  if (!iconPath) {
    console.warn(`HandDrawnIcon: No icon found for name "${name}"`)
    return <div className={`inline-block ${className}`} style={{ width: size, height: size }} />
  }

  return (
    <img 
      src={iconPath} 
      alt={`${name} icon`}
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    />
  )
}