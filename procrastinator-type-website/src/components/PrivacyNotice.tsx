'use client'
import { useState, useEffect } from 'react'
import RoughCard from './RoughCard'

export default function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('privacy-accepted')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptPrivacy = () => {
    localStorage.setItem('privacy-accepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <RoughCard color="#f3f4f6" className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-gray-700 text-sm leading-relaxed" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              We collect anonymous quiz responses and basic analytics to improve our assessment and provide you with better insights. 
              No personal information is stored. By continuing, you agree to this data collection.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={acceptPrivacy}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm"
              style={{fontFamily: 'Virgil, cursive, fantasy'}}
            >
              Accept
            </button>
            <button
              onClick={acceptPrivacy}
              className="text-gray-600 px-4 py-2 rounded-lg font-semibold hover:text-gray-800 transition-colors text-sm"
              style={{fontFamily: 'Virgil, cursive, fantasy'}}
            >
              Dismiss
            </button>
          </div>
        </div>
      </RoughCard>
    </div>
  )
}