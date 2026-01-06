'use client'
import { useState, useEffect } from 'react'
import RoughCard from '@/components/RoughCard'
import RoughTitle from '@/components/RoughTitle'

interface QuizStats {
  total_completions: number
  by_type: { [key: string]: number }
  completion_trend: { date: string, count: number }[]
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/quiz/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl" style={{fontFamily: 'Virgil, cursive, fantasy'}}>Loading analytics...</p>
      </div>
    )
  }

  const procrastinatorTypeNames: { [key: string]: string } = {
    'arousal': 'Arousal (Thrill Seekers)',
    'avoidant': 'Avoidant',
    'decisional': 'Decisional',
    'perfectionist': 'Perfectionist',
    'passive': 'Passive',
    'active': 'Active',
    'emotion-regulation': 'Emotion-Regulation'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <RoughTitle className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl font-bold text-gray-800 text-center" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
            Quiz Analytics Dashboard
          </h1>
        </RoughTitle>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <RoughCard color="#3b82f6" className="text-center transform rotate-1">
            <div className="text-4xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              {stats?.total_completions || 0}
            </div>
            <p className="text-gray-600" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              Total Quiz Completions
            </p>
          </RoughCard>

          <RoughCard color="#10b981" className="text-center transform -rotate-1">
            <div className="text-4xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              {Object.keys(stats?.by_type || {}).length}
            </div>
            <p className="text-gray-600" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              Unique Types Identified
            </p>
          </RoughCard>

          <RoughCard color="#f59e0b" className="text-center transform rotate-1">
            <div className="text-4xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              {stats?.completion_trend.reduce((sum, day) => sum + day.count, 0) || 0}
            </div>
            <p className="text-gray-600" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              Last 30 Days
            </p>
          </RoughCard>
        </div>

        {/* Results by Type */}
        <RoughCard color="#e5e7eb" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center transform rotate-0.5" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
            Results by Procrastination Type
          </h2>
          
          <div className="space-y-4">
            {Object.entries(stats?.by_type || {})
              .sort(([,a], [,b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <span className="font-semibold text-gray-800" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
                    {procrastinatorTypeNames[type] || type}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 rounded-full px-3 py-1">
                      <span className="text-indigo-800 font-bold" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
                        {count}
                      </span>
                    </div>
                    <div className="text-gray-500" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
                      {((count / (stats?.total_completions || 1)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </RoughCard>

        {/* Daily Trend */}
        {stats?.completion_trend && stats.completion_trend.length > 0 && (
          <RoughCard color="#f3f4f6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center transform -rotate-0.5" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
              Daily Completion Trend
            </h2>
            
            <div className="overflow-x-auto">
              <div className="min-w-full space-y-2">
                {stats.completion_trend.map((day) => (
                  <div key={day.date} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                    <span className="font-medium text-gray-700" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
                      {new Date(day.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center">
                      <div 
                        className="bg-indigo-500 h-4 rounded mr-2"
                        style={{ width: `${Math.max(day.count * 20, 20)}px` }}
                      />
                      <span className="text-gray-800 font-semibold" style={{fontFamily: 'Virgil, cursive, fantasy'}}>
                        {day.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RoughCard>
        )}

        <div className="text-center mt-8">
          <button 
            onClick={fetchStats}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            style={{fontFamily: 'Virgil, cursive, fantasy'}}
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}