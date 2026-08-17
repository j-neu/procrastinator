'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HandDrawnIcon from '../../components/HandDrawnIcon';
import { getPayhipBook, PAYHIP_BOOKS, BOOK_PRICE_LABEL } from '../../lib/payhip-links';
import { track } from '../../lib/analytics';
import { siteUrl } from '../../lib/seo';

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

const procrastinationTypes = {
  'arousal': { title: 'Arousal Procrastinator', icon: 'lightning' },
  'avoidant': { title: 'Avoidance Procrastinator', icon: 'shield' },
  'decisional': { title: 'Decisional Procrastinator', icon: 'scales' },
  'active': { title: 'Active Procrastinator', icon: 'target' },
  'passive': { title: 'Passive Procrastinator', icon: 'cyclone' },
  'emotionRegulation': { title: 'Emotion-Regulation Procrastinator', icon: 'brain' },
  'perfectionist': { title: 'Perfectionist Procrastinator', icon: 'diamond' }
};

function WorkbooksPageContent() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // No `document.title` here: the title comes from `pageMetadata()` in
  // layout.tsx. Setting it on mount overwrote the 64-char server title with a
  // shorter one that dropped "for All 7 Types". Same bug as the homepage had.

  // Check if user came from quiz results
  const userType = searchParams.get('type') as keyof typeof procrastinationTypes;
  const fromQuiz = !!userType;

  const typeInfo = userType ? procrastinationTypes[userType] : null;
  const book = userType ? getPayhipBook(userType) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: userType || 'general',
          source: fromQuiz ? 'quiz' : 'landing'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        track('email_signup', { type: userType || 'general', source: fromQuiz ? 'quiz' : 'landing' });
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-osmo-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="mb-8">
              <HandDrawnIcon name="sparkles" size={80} className="mx-auto mb-4" />
            </div>
            
            <h1 className="text-4xl font-display font-bold text-osmo-text mb-6">
              Thanks for signing up!
            </h1>
            
            <div className="p-8 bg-osmo-surface rounded-lg border border-osmo-border mb-8">
              <p className="text-lg text-osmo-muted mb-4">
                {fromQuiz ? (
                  <>We'll notify you as soon as the <strong className="text-osmo-text">{typeInfo?.title}</strong> workbook is ready.</>
                ) : (
                  <>We'll notify you when our workbooks are available.</>
                )}
              </p>
              <p className="text-osmo-muted">
                No spam, just updates when your personalized content is ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="px-6 py-3 border border-osmo-text rounded-full font-semibold text-osmo-text transition-all duration-300 hover:bg-osmo-text hover:text-osmo-bg"
              >
                Back to Home
              </Link>
              {!fromQuiz && (
                <Link 
                  href="/quiz"
                  className="px-6 py-3 bg-osmo-neon-green border border-osmo-neon-green rounded-full font-semibold text-black transition-all duration-300 hover:opacity-90"
                >
                  Take Quiz
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  <a
                    href={bookEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('workbook_click', { type: typeKey, placement: 'workbooks-grid' })}
                    className="mt-auto inline-block text-center px-4 py-2.5 bg-osmo-neon-green border border-osmo-neon-green rounded-full font-semibold text-black text-sm transition-all duration-300 hover:opacity-90"
                  >
                    Get the Book &middot; {BOOK_PRICE_LABEL}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-osmo-surface rounded-lg border border-osmo-border mb-8">
          {fromQuiz && typeInfo ? (
            // User came from quiz results
            <div className="text-center">
              <div className="mb-6">
                <HandDrawnIcon name={typeInfo.icon} size={64} className="mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold text-osmo-text mb-4">
                  You're an <span className="text-osmo-neon-green">{typeInfo.title}</span>
                </h2>
              </div>

              {book ? (
                <>
                  <p className="text-lg text-osmo-muted mb-6">
                    Your guide to breaking the {typeInfo.title} pattern is ready. Grab the book now and start dismantling it today.
                  </p>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track('workbook_click', {
                        type: userType || 'general',
                        // `placement` matches every other workbook_click call.
                        // This one only sent `title`, so it was invisible to any
                        // report grouped by placement.
                        placement: 'workbooks-from-quiz',
                        title: book.title,
                      })
                    }
                    className="inline-block mb-4 px-8 py-3 bg-osmo-neon-green border border-osmo-neon-green rounded-full font-semibold text-black transition-all duration-300 hover:opacity-90"
                  >
                    Get the Book &middot; {BOOK_PRICE_LABEL}
                  </a>
                </>
              ) : (
                <p className="text-lg text-osmo-muted mb-6">
                  Your personalized book is currently in development. Sign up to get notified when it's ready!
                </p>
              )}
            </div>
          ) : (
            // User came from landing page
            <div className="text-center">
              <h2 className="text-2xl font-display font-bold text-osmo-text mb-4">
                Personalized Workbooks in Development
              </h2>
              
              <p className="text-lg text-osmo-muted mb-6">
                We're creating comprehensive 31-day workbooks for each procrastination type, 
                with targeted exercises and evidence-based strategies.
              </p>
              
              <div className="mb-6 p-4 bg-osmo-bg/50 rounded-lg border border-osmo-border">
                <p className="text-osmo-muted">
                  <strong className="text-osmo-text">Want the most relevant workbook?</strong> Take our assessment first to identify your specific procrastination type.
                </p>
                <Link 
                  href="/quiz"
                  className="inline-block mt-3 px-4 py-2 border border-osmo-neon-green rounded-full font-semibold text-osmo-neon-green transition-all duration-300 hover:bg-osmo-neon-green hover:text-black"
                >
                  Take the Quiz First
                </Link>
              </div>
              
              <p className="text-sm text-osmo-muted mb-8">
                Or sign up below for general updates on all workbooks.
              </p>
            </div>
          )}

          {/* Email Signup Form (only shown when there's no live book to buy) */}
          {!book && (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 bg-transparent border border-osmo-border rounded-lg text-osmo-text placeholder-osmo-muted focus:border-osmo-neon-green focus:outline-none transition-colors"
                required
              />
              
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-osmo-text border border-osmo-text rounded-full font-semibold text-osmo-bg transition-all duration-300 hover:bg-transparent hover:text-osmo-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing up...' : 'Notify Me'}
              </button>
            </div>
          </form>
          )}
        </div>

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
    </div>
  );
}

export default function WorkbooksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-osmo-bg py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-osmo-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-osmo-muted">Loading...</p>
        </div>
      </div>
    }>
      <WorkbooksPageContent />
    </Suspense>
  );
}