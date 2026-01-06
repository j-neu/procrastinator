import { NextRequest, NextResponse } from 'next/server'
import { insertQuizSubmission } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { procrastination_type, responses, completion_time_seconds } = body

    // Validation
    if (!procrastination_type || !responses) {
      return NextResponse.json(
        { error: 'Missing required fields: procrastination_type and responses' },
        { status: 400 }
      )
    }

    // Get client info
    const user_agent = request.headers.get('user-agent')
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'

    // Insert submission
    const submission = {
      timestamp: new Date().toISOString(),
      procrastination_type,
      responses: JSON.stringify(responses),
      user_agent: user_agent || undefined,
      ip_address: ip_address || undefined,
      completion_time_seconds
    }

    const success = await insertQuizSubmission(submission)

    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Quiz submission recorded successfully' 
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to record submission' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Quiz submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}