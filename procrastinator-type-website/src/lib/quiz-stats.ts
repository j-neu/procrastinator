import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface TypeDistributionEntry {
  typeKey: string;
  title: string;
  percentage: number;
}

export interface QuizStats {
  /** Primary-type breakdown, percentage of all completions, sorted descending. */
  typeDistribution: TypeDistributionEntry[];
  /**
   * Confidence-level breakdown, percentage of completions that have a
   * confidence value (the original 21-question quiz doesn't compute one).
   * Fixed high/medium/low order -- confidence is ordinal, so it is not
   * sorted by percentage.
   */
  confidenceDistribution: TypeDistributionEntry[];
  /**
   * How often each type appears as anyone's SECONDARY type, pooled across
   * all primary types (not sliced per primary type). A per-primary-type
   * breakdown was considered and rejected: 5 of the 7 types currently have
   * single-digit completion counts, too sparse to publish a "most common
   * pairing" for without it reading as noise dressed up as data. Pooling
   * across all primaries keeps the sample size honest.
   */
  secondaryTypeDistribution: TypeDistributionEntry[];
  /**
   * Share of completions by day of week (UTC, matching how Timestamp is
   * written), Sunday first. Fixed calendar order, not sorted by value --
   * unlike confidence this isn't a severity ramp, so it renders as a flat
   * single-hue column chart rather than an ordinal lightness ramp (a ramp
   * keyed to calendar position would misleadingly imply weekday order
   * predicts volume, which the data doesn't support: Thursday is the
   * lowest day, not an end-of-week extreme).
   */
  dayOfWeekDistribution: TypeDistributionEntry[];
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

const CONFIDENCE_LABELS: [key: string, label: string][] = [
  ['high', 'High'],
  ['medium', 'Medium'],
  ['low', 'Low'],
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function emptyTypeCounts(): Record<string, number> {
  return Object.fromEntries(TYPE_KEYS.map((key) => [key, 0]));
}

function toPercentageEntries(
  counts: Record<string, number>,
  labels: Record<string, string>,
  total: number,
  keyOrder: string[],
  sort: boolean,
): TypeDistributionEntry[] {
  const entries = keyOrder.map((key) => ({
    typeKey: key,
    title: labels[key],
    percentage: total > 0 ? Math.round((counts[key] / total) * 100) : 0,
  }));
  return sort ? entries.sort((a, b) => b.percentage - a.percentage) : entries;
}

/**
 * Reads the "Quiz Completions" sheet once (written by /api/quiz-completion
 * on every quiz finish, no PII) and returns three percentage-only
 * breakdowns. Callers must never derive or display the underlying
 * respondent count from any of these -- see /stats page.
 */
export async function getQuizStats(): Promise<QuizStats> {
  const typeCounts = emptyTypeCounts();
  const confidenceCounts: Record<string, number> = { high: 0, medium: 0, low: 0 };
  const secondaryCounts = emptyTypeCounts();
  const dayCounts = new Array(7).fill(0);
  let typeTotal = 0;
  let confidenceTotal = 0;
  let secondaryTotal = 0;
  let dayTotal = 0;

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
        const primary = row.get('Primary Type');
        const secondary = row.get('Secondary Type');
        const confidence = row.get('Confidence');
        const timestamp = row.get('Timestamp');

        if (primary && Object.prototype.hasOwnProperty.call(typeCounts, primary)) {
          typeCounts[primary] += 1;
          typeTotal += 1;
        }
        if (confidence && Object.prototype.hasOwnProperty.call(confidenceCounts, confidence)) {
          confidenceCounts[confidence] += 1;
          confidenceTotal += 1;
        }
        if (secondary && Object.prototype.hasOwnProperty.call(secondaryCounts, secondary)) {
          secondaryCounts[secondary] += 1;
          secondaryTotal += 1;
        }
        if (timestamp) {
          const parsed = new Date(timestamp);
          if (!Number.isNaN(parsed.getTime())) {
            dayCounts[parsed.getUTCDay()] += 1;
            dayTotal += 1;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading quiz completion stats:', error);
  }

  return {
    typeDistribution: toPercentageEntries(typeCounts, TYPE_LABELS, typeTotal, TYPE_KEYS, true),
    confidenceDistribution: CONFIDENCE_LABELS.map(([key, label]) => ({
      typeKey: key,
      title: label,
      percentage: confidenceTotal > 0 ? Math.round((confidenceCounts[key] / confidenceTotal) * 100) : 0,
    })),
    secondaryTypeDistribution: toPercentageEntries(secondaryCounts, TYPE_LABELS, secondaryTotal, TYPE_KEYS, true),
    dayOfWeekDistribution: DAY_LABELS.map((label, index) => ({
      typeKey: String(index),
      title: label,
      percentage: dayTotal > 0 ? Math.round((dayCounts[index] / dayTotal) * 100) : 0,
    })),
  };
}
