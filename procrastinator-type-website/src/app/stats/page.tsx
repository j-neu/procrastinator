import Link from 'next/link';

import { pageMetadata } from '@/lib/seo';
import { getQuizTypeDistribution } from '@/lib/quiz-stats';
import TypeDistributionChart from '@/components/TypeDistributionChart';

export const metadata = pageMetadata({
  path: '/stats',
  title: 'Procrastination Type Distribution',
  description: 'The live percentage breakdown of primary procrastination types across everyone who has taken the Procrastitype quiz, updated automatically as more people take it.',
});

// Re-read and regenerate periodically rather than on every request, so the
// page stays current without hitting the Google Sheets API on every visit.
export const revalidate = 300;

export default async function StatsPage() {
  const distribution = await getQuizTypeDistribution();

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text pt-32 pb-20">
      <div className="osmo-container max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-osmo-muted hover:text-osmo-text mb-8 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-light mb-6">
          Procrastination Type Distribution
        </h1>
        <p className="text-osmo-muted font-light leading-relaxed text-lg mb-12">
          Every time someone completes the{' '}
          <Link href="/quiz" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
            Procrastitype quiz
          </Link>
          , their primary type is added here with nothing that identifies who they are. The chart
          below is the current breakdown across everyone who has taken it, and it shifts on its
          own as more people do.
        </p>

        <TypeDistributionChart data={distribution} />

        <p className="text-sm text-osmo-muted font-light leading-relaxed mt-12">
          Figures are the share of primary-type results, rounded to the nearest whole percent.
          Read about the scoring behind them on the{' '}
          <Link href="/research" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
            research page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
