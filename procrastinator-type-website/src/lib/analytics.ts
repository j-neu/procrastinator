import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'quiz_start'
  | 'quiz_complete'
  | 'share_click'
  | 'email_signup'
  | 'workbook_click'
  | 'results_pdf_download';

type EventProps = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, props?: EventProps): void {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the app
  }
}
