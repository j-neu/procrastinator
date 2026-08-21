import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface TypeDistributionEntry {
  typeKey: string;
  title: string;
  percentage: number;
}

// Canonical display names, matching the /types pillar (src/app/types/page.tsx),
// not the Payhip book titles in payhip-links.ts (which say "Avoidance
// Procrastinator" for this same type -- a pre-existing inconsistency in the
// product copy that this page should not inherit).
const TYPE_LABELS: Record<string, string> = {
  arousal: 'Arousal Procrastinator',
  avoidant: 'Avoidant Procrastinator',
  decisional: 'Decisional Procrastinator',
  perfectionist: 'Perfectionist Procrastinator',
  passive: 'Passive Procrastinator',
  active: 'Active Procrastinator',
  emotionRegulation: 'Emotion-Regulation Procrastinator',
};

const TYPE_KEYS = Object.keys(TYPE_LABELS);

/**
 * Percentage breakdown of primary quiz result types, read from the
 * "Quiz Completions" sheet that /api/quiz-completion writes to on every
 * quiz finish (no PII, see that route). Returns percentages only, rounded
 * to whole numbers, sorted descending -- callers must never derive or
 * display the underlying respondent count from this (see /stats page).
 */
export async function getQuizTypeDistribution(): Promise<TypeDistributionEntry[]> {
  const counts: Record<string, number> = Object.fromEntries(TYPE_KEYS.map((key) => [key, 0]));
  let total = 0;

  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheets credentials');
    }

    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['Quiz Completions'];
    if (sheet) {
      const rows = await sheet.getRows();
      for (const row of rows) {
        const type = row.get('Primary Type');
        if (type && Object.prototype.hasOwnProperty.call(counts, type)) {
          counts[type] += 1;
          total += 1;
        }
      }
    }
  } catch (error) {
    console.error('Error reading quiz completion stats:', error);
  }

  return TYPE_KEYS.map((typeKey) => ({
    typeKey,
    title: TYPE_LABELS[typeKey],
    percentage: total > 0 ? Math.round((counts[typeKey] / total) * 100) : 0,
  })).sort((a, b) => b.percentage - a.percentage);
}
