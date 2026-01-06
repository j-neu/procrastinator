import { NextResponse } from 'next/server'
import { insertQuizSubmission } from '@/lib/database'

export async function POST() {
  try {
    // Sample data to seed the database
    const sampleSubmissions = [
      {
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        procrastination_type: 'arousal',
        responses: JSON.stringify({ q1: 'a', q2: 'b', q3: 'c' }),
        user_agent: 'Mozilla/5.0 Sample',
        ip_address: '192.168.1.1',
        completion_time_seconds: 120
      },
      {
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
        procrastination_type: 'avoidant',
        responses: JSON.stringify({ q1: 'b', q2: 'a', q3: 'c' }),
        user_agent: 'Mozilla/5.0 Sample',
        ip_address: '192.168.1.2',
        completion_time_seconds: 180
      },
      {
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        procrastination_type: 'perfectionist',
        responses: JSON.stringify({ q1: 'c', q2: 'b', q3: 'a' }),
        user_agent: 'Mozilla/5.0 Sample',
        ip_address: '192.168.1.3',
        completion_time_seconds: 240
      },
      {
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        procrastination_type: 'decisional',
        responses: JSON.stringify({ q1: 'a', q2: 'c', q3: 'b' }),
        user_agent: 'Mozilla/5.0 Sample',
        ip_address: '192.168.1.4',
        completion_time_seconds: 300
      },
      {
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        procrastination_type: 'active',
        responses: JSON.stringify({ q1: 'b', q2: 'a', q3: 'a' }),
        user_agent: 'Mozilla/5.0 Sample',
        ip_address: '192.168.1.5',
        completion_time_seconds: 90
      }
    ]

    let successCount = 0
    for (const submission of sampleSubmissions) {
      const success = await insertQuizSubmission(submission)
      if (success) successCount++
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${successCount} sample submissions`
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    )
  }
}