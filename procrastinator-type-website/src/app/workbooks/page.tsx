import { Suspense } from 'react';
import Link from 'next/link';
import SiteFooter from '../../components/SiteFooter';
import BookLink from '../../components/BookLink';
import { PAYHIP_BOOKS, BOOK_PRICE_LABEL } from '../../lib/payhip-links';
import WorkbooksPanel from './WorkbooksPanel';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which procrastination workbook should I get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Take the free procrastination assessment first. It identifies your primary procrastination type (arousal, avoidance, decisional, passive, active, emotion-regulation or perfectionist) so you get the workbook built for your specific pattern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the procrastination books available now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All 7 cognitive dismantling books are live on Payhip and linked directly from your quiz results page.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 31-day procrastination workbook?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A structured 31-day program of 20-minute daily exercises, grounded in CBT and ACT principles, tailored to each procrastination type. Workbooks are in development; sign up with your email to get notified when yours launches.',
      },
    },
  ],
};

// This is now a server component: the book grid, headings and FAQ markup
// render into the initial HTML, so crawlers and no-JS visitors see the
// actual page instead of the client-only loading spinner this used to ship.
// Only the `?type=` quiz branch and the email form need client state; both
// live in WorkbooksPanel, wrapped in Suspense because useSearchParams
// requires it.
export default function WorkbooksPage() {
  return (
    <div className="min-h-screen bg-osmo-bg py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-osmo-text mb-6">
            Books & Workbooks
          </h1>
          <p className="text-lg text-osmo-muted font-light max-w-2xl mx-auto leading-relaxed">
            All seven cognitive dismantling books are live on Payhip. The 31-day workbooks for each type are in development, and you can sign up below to be notified.
          </p>
        </div>

        {/* All cognitive dismantling books */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-osmo-text mb-4 text-center">
            The Cognitive Dismantling Books
          </h2>
          <p className="text-center text-osmo-muted font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Seven books, one for each procrastination pattern. Each one walks you through the cognitive dismantling method to break the fear loop for good. {BOOK_PRICE_LABEL} each.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(PAYHIP_BOOKS).map(([typeKey, bookEntry]) => (
              <div key={typeKey} className="bg-osmo-surface rounded-lg border border-osmo-border overflow-hidden flex flex-col">
                <img
                  src={`/share-cards/${bookEntry.cardSlug}.png`}
                  alt={`${bookEntry.title} book cover`}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <h3 className="font-display font-bold text-osmo-text">{bookEntry.title}</h3>
                  <BookLink
                    href={bookEntry.url}
                    type={typeKey}
                    placement="workbooks-grid"
                    className="mt-auto inline-block text-center px-4 py-2.5 bg-osmo-neon-green border border-osmo-neon-green rounded-full font-semibold text-black text-sm transition-all duration-300 hover:opacity-90"
                  >
                    Get the Book &middot; {BOOK_PRICE_LABEL}
                  </BookLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="p-8 bg-osmo-surface rounded-lg border border-osmo-border mb-8 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-2 border-osmo-neon-green border-t-transparent rounded-full" />
            </div>
          }
        >
          <WorkbooksPanel />
        </Suspense>

        {/* Back Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="px-6 py-3 border border-osmo-border rounded-full font-semibold text-osmo-text transition-all duration-300 hover:bg-osmo-surface"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteFooter />
    </div>
  );
}
