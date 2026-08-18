'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HandDrawnIcon from '../../components/HandDrawnIcon';
import { getPayhipBook, BOOK_PRICE_LABEL } from '../../lib/payhip-links';
import { track } from '../../lib/analytics';

const procrastinationTypes = {
  'arousal': { title: 'Arousal Procrastinator', icon: 'lightning' },
  'avoidant': { title: 'Avoidance Procrastinator', icon: 'shield' },
  'decisional': { title: 'Decisional Procrastinator', icon: 'scales' },
  'active': { title: 'Active Procrastinator', icon: 'target' },
  'passive': { title: 'Passive Procrastinator', icon: 'cyclone' },
  'emotionRegulation': { title: 'Emotion-Regulation Procrastinator', icon: 'brain' },
  'perfectionist': { title: 'Perfectionist Procrastinator', icon: 'diamond' }
};

/**
 * The only stateful part of /workbooks: the quiz-result branch (reads
 * `?type=` via useSearchParams, so it must stay client-side and inside a
 * Suspense boundary) and the email signup form. The book grid, headings and
 * FAQ markup live in the server-rendered page.tsx so crawlers and no-JS
 * visitors see real content instead of this panel's loading fallback.
 */
export default function WorkbooksPanel() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();

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
      <div className="p-8 bg-osmo-surface rounded-lg border border-osmo-border mb-8 text-center">
        <div className="mb-8">
          <HandDrawnIcon name="sparkles" size={80} className="mx-auto mb-4" />
        </div>

        <h2 className="text-2xl font-display font-bold text-osmo-text mb-6">
          Thanks for signing up!
        </h2>

        <p className="text-lg text-osmo-muted mb-4">
          {fromQuiz ? (
            <>We'll notify you as soon as the <strong className="text-osmo-text">{typeInfo?.title}</strong> workbook is ready.</>
          ) : (
            <>We'll notify you when our workbooks are available.</>
          )}
        </p>
        <p className="text-osmo-muted mb-8">
          No spam, just updates when your personalized content is ready.
        </p>

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
    );
  }

  return (
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
  );
}
