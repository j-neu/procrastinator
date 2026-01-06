import sqlite3 from 'sqlite3'
import { promisify } from 'util'

const db = new sqlite3.Database('./quiz_analytics.db')

// Promisify database methods
const dbRun = (sql: string, params?: any[]) => {
  return new Promise<void>((resolve, reject) => {
    db.run(sql, params || [], function(err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

const dbGet = (sql: string, params?: any[]) => {
  return new Promise<any>((resolve, reject) => {
    db.get(sql, params || [], function(err, row) {
      if (err) reject(err)
      else resolve(row)
    })
  })
}

const dbAll = (sql: string, params?: any[]) => {
  return new Promise<any[]>((resolve, reject) => {
    db.all(sql, params || [], function(err, rows) {
      if (err) reject(err)
      else resolve(rows || [])
    })
  })
}

export interface QuizSubmission {
  id?: number
  timestamp: string
  procrastination_type: string
  responses: string // JSON string of all answers
  user_agent?: string
  ip_address?: string
  completion_time_seconds?: number
}

export interface QuizStats {
  total_completions: number
  by_type: { [key: string]: number }
  completion_trend: { date: string, count: number }[]
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS quiz_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        procrastination_type TEXT NOT NULL,
        responses TEXT NOT NULL,
        user_agent TEXT,
        ip_address TEXT,
        completion_time_seconds INTEGER
      )
    `)

    await dbRun(`
      CREATE TABLE IF NOT EXISTS quiz_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE,
        daily_completions INTEGER DEFAULT 0
      )
    `)

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

// Insert quiz submission
export async function insertQuizSubmission(submission: Omit<QuizSubmission, 'id'>) {
  try {
    await dbRun(`
      INSERT INTO quiz_submissions 
      (procrastination_type, responses, user_agent, ip_address, completion_time_seconds)
      VALUES (?, ?, ?, ?, ?)
    `, [
      submission.procrastination_type,
      submission.responses,
      submission.user_agent || null,
      submission.ip_address || null,
      submission.completion_time_seconds || null
    ])

    // Update daily stats
    const today = new Date().toISOString().split('T')[0]
    await dbRun(`
      INSERT INTO quiz_stats (date, daily_completions) VALUES (?, 1)
      ON CONFLICT(date) DO UPDATE SET daily_completions = daily_completions + 1
    `, [today])

    return true
  } catch (error) {
    console.error('Error inserting quiz submission:', error)
    return false
  }
}

// Get quiz analytics
export async function getQuizStats(): Promise<QuizStats> {
  try {
    // Total completions
    const totalResult = await dbGet(`SELECT COUNT(*) as count FROM quiz_submissions`) as { count: number }
    const total_completions = totalResult.count

    // By type
    const typeResults = await dbAll(`
      SELECT procrastination_type, COUNT(*) as count 
      FROM quiz_submissions 
      GROUP BY procrastination_type 
      ORDER BY count DESC
    `) as { procrastination_type: string, count: number }[]

    const by_type: { [key: string]: number } = {}
    typeResults.forEach(result => {
      by_type[result.procrastination_type] = result.count
    })

    // Completion trend (last 30 days)
    const trendResults = await dbAll(`
      SELECT date, daily_completions as count
      FROM quiz_stats 
      WHERE date >= date('now', '-30 days')
      ORDER BY date ASC
    `) as { date: string, count: number }[]

    return {
      total_completions,
      by_type,
      completion_trend: trendResults
    }
  } catch (error) {
    console.error('Error getting quiz stats:', error)
    return {
      total_completions: 0,
      by_type: {},
      completion_trend: []
    }
  }
}

// Get recent submissions for admin view
export async function getRecentSubmissions(limit: number = 50) {
  try {
    return await dbAll(`
      SELECT id, timestamp, procrastination_type, completion_time_seconds
      FROM quiz_submissions 
      ORDER BY timestamp DESC 
      LIMIT ?
    `, [limit])
  } catch (error) {
    console.error('Error getting recent submissions:', error)
    return []
  }
}

// Initialize on import
initializeDatabase()