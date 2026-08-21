import Link from 'next/link';

import { pageMetadata } from '@/lib/seo';
import { getQuizStats } from '@/lib/quiz-stats';
import TypeDistributionChart from '@/components/TypeDistributionChart';

export const metadata = pageMetadata({
  path: '/stats',
  title: 'Procrastination Type Distribution',
  description: 'The live percentage breakdown of primary procrastination types, result confidence and common secondary patterns across everyone who has taken the Procrastitype quiz.',
});

// Re-read and regenerate periodically rather than on every request, so the
// page stays current without hitting the Google Sheets API on every visit.
export const revalidate = 300;

export default async function StatsPage() {
  const { typeDistribution, confidenceDistribution, secondaryTypeDistribution } = await getQuizStats();

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
          , their result is added here with nothing that identifies who they are. The figures
          below are the current picture across everyone who has taken it, and they shift on their
          own as more people do.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-display mb-2">Primary Type</h2>
          <p className="text-sm text-osmo-muted font-light mb-6">
            The dominant pattern the quiz identifies for each person.
          </p>
          <TypeDistributionChart data={typeDistribution} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-display mb-2">How Clear the Result Is</h2>
          <p className="text-sm text-osmo-muted font-light mb-6">
            Confidence reflects how much one type stood out in someone&apos;s answers. High means
            a single pattern was dominant; medium or low means the answers were split across two
            or three patterns, which the quiz treats as a blend rather than a single type.
          </p>
          <TypeDistributionChart data={confidenceDistribution} />
        </section>

        <section>
          <h2 className="text-2xl font-display mb-2">Most Common Second Pattern</h2>
          <p className="text-sm text-osmo-muted font-light mb-6">
            Most people show a blend of two patterns, not just one. This is how often each type
            turns up as that second pattern, across everyone who took the quiz, regardless of
            their primary type.
          </p>
          <TypeDistributionChart data={secondaryTypeDistribution} />
        </section>

        <p className="text-sm text-osmo-muted font-light leading-relaxed mt-16">
          All figures are rounded to the nearest whole percent. Read about the scoring behind
          them on the{' '}
          <Link href="/research" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
            research page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
