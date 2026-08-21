'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';
import ShareCard from '../../../components/ShareCard';
import { QuizResult } from '../../../lib/quiz-data';
import { ImprovedQuizResult } from '../../../lib/improved-quiz-scoring';
import { getTypeColor, getTypeIcon } from '../../../lib/quiz-utils';
import { getPayhipBook } from '../../../lib/payhip-links';
import { track } from '../../../lib/analytics';

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [improvedResult, setImprovedResult] = useState<ImprovedQuizResult | null>(null);
  const [useImprovedVersion, setUseImprovedVersion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  useEffect(() => {
    document.title = 'Your Procrastination Profile | Procrastitype';
  }, []);

  useEffect(() => {
    // Check which version was used
    const versionUsed = localStorage.getItem('useImprovedVersion');
    const isImproved = versionUsed ? JSON.parse(versionUsed) : false;
    setUseImprovedVersion(isImproved);

    // Get result from localStorage
    const savedResult = localStorage.getItem('quizResult');
    const savedImprovedResult = localStorage.getItem('improvedQuizResult');

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);

        if (isImproved && savedImprovedResult) {
          const parsedImprovedResult = JSON.parse(savedImprovedResult);
          setImprovedResult(parsedImprovedResult);

          // Track quiz completion (improved version)
          trackQuizCompletion(
            parsedImprovedResult.primaryType,
            parsedImprovedResult.secondaryType,
            parsedImprovedResult.confidenceLevel
          );
        } else {
          // Track quiz completion (original version)
          trackQuizCompletion(parsedResult.primaryType);
        }
      } catch (error) {
        console.error('Error parsing quiz result:', error);
        router.push('/quiz');
      }
    } else {
      // No result found, redirect to quiz
      router.push('/quiz');
    }
    setLoading(false);
  }, [router]);

  const trackQuizCompletion = async (primaryType: string, secondaryType?: string, confidence?: string) => {
    try {
      // Check if we've already tracked this completion
      const tracked = localStorage.getItem('quizCompletionTracked');
      if (tracked) return;

      await fetch('/api/quiz-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryType,
          secondaryType,
          confidence
        }),
      });

      // Mark as tracked to avoid duplicate tracking
      localStorage.setItem('quizCompletionTracked', 'true');

      track('quiz_complete', {
        primaryType,
        secondaryType: secondaryType ?? 'none',
        confidence: confidence ?? 'unknown',
      });
    } catch (error) {
      console.log('Could not track quiz completion:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsEmailSubmitting(true);
    setEmailError('');

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: result.primaryType,
          source: 'quiz-results',
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        track('email_signup', { type: result.primaryType, source: 'quiz-results' });
      } else {
        const data = await response.json();
        setEmailError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setEmailError('Something went wrong. Please try again.');
    }

    setIsEmailSubmitting(false);
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizResult');
    localStorage.removeItem('improvedQuizResult');
    localStorage.removeItem('useImprovedVersion');
    localStorage.removeItem('quizCompletionTracked'); // Allow tracking new completion
    router.push('/quiz');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-osmo-bg text-osmo-muted">
        <p className="text-xl font-light">Analyzing results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-osmo-bg text-osmo-muted">
        <p className="text-xl font-light">No results found. Please take the assessment first.</p>
      </div>
    );
  }

  const typeIcon = getTypeIcon(result.primaryType);

  // Get top 3 scores for secondary insights
  const sortedScores = Object.entries(result.scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text py-20 transition-colors duration-500">
      <div className="osmo-container max-w-4xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 opacity-60">
            <span className="size-1.5 bg-osmo-text rounded-full"></span>
            <span className="text-xs uppercase tracking-widest text-osmo-muted font-display">Analysis Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-light text-osmo-text mb-6">
            Your Procrastination Profile
          </h1>
        </header>

        {/* Primary Type Result */}
        <div className="bg-osmo-surface border border-osmo-border p-6 sm:p-12 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-osmo-text">
             <div className="text-9xl">{typeIcon}</div>
          </div>
          
          <div className="relative z-10 text-center">
            {useImprovedVersion && improvedResult && (
              <div className="flex justify-center items-center gap-4 mb-8">
                <span className="px-3 py-1 border border-osmo-border rounded-full text-[10px] uppercase tracking-widest text-osmo-muted">
                  {improvedResult.confidenceLevel} Confidence
                </span>
                <span className="px-3 py-1 bg-osmo-text text-osmo-bg rounded-full text-[10px] uppercase tracking-widest font-bold">
                  {improvedResult.typeDetails.likelihood}% Match
                </span>
              </div>
            )}
            
            <h2 className="text-4xl font-display font-light text-osmo-text mb-6">
              {result.typeDetails.title}
            </h2>
            <p className="text-lg text-osmo-muted font-light leading-relaxed max-w-2xl mx-auto mb-12">
              {result.typeDetails.description}
            </p>

            <div className="flex flex-col items-center gap-4">
              <ShareButton
                resultData={{
                  primaryType: result.primaryType,
                  typeTitle: result.typeDetails.title,
                  typeDescription: result.typeDetails.description,
                  confidence: useImprovedVersion && improvedResult ? improvedResult.confidenceLevel : undefined,
                  likelihood: useImprovedVersion && improvedResult ? improvedResult.typeDetails.likelihood : undefined
                }}
                className="bg-osmo-text/5 border border-osmo-border hover:bg-osmo-text/10 text-osmo-text px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-colors"
              />

              {(() => {
                const book = getPayhipBook(result.primaryType);
                if (!book) return null;
                return (
                  <div className="flex flex-col items-center gap-4">
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('workbook_click', { type: result.primaryType, placement: 'results-card' })}
                      className="bg-osmo-text text-osmo-bg px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform"
                    >
                      Get the Book
                    </a>
                    <p className="text-xs text-osmo-muted">
                      Your <span className="text-osmo-text">{book.title}</span> book is live. Deep-dive into breaking the pattern.
                    </p>
                  </div>
                );
              })()}

              <Link
                href="/stats"
                className="text-xs text-osmo-muted hover:text-osmo-text underline underline-offset-4 transition-colors"
              >
                See how common your type is
              </Link>
            </div>
          </div>
        </div>

        {/* Shareable card */}
        <ShareCard
          primaryType={result.primaryType}
          className="mb-12"
        />

        {/* Strategies & Strengths Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 sm:p-8 border border-osmo-border hover:bg-osmo-surface transition-colors duration-500">
            <h3 className="text-xl font-display font-light text-osmo-text mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined font-light">lightbulb</span>
              Strategic Interventions
            </h3>
            <ul className="space-y-4">
              {result.typeDetails.strategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-4 text-osmo-muted font-light leading-relaxed">
                  <span className="size-1.5 bg-osmo-text/30 rounded-full mt-2 shrink-0"></span>
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 border border-osmo-border hover:bg-osmo-surface transition-colors duration-500">
            <h3 className="text-xl font-display font-light text-osmo-text mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined font-light">verified</span>
              Core Strengths
            </h3>
            <ul className="space-y-4">
              {result.typeDetails.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-4 text-osmo-muted font-light leading-relaxed">
                  <span className="size-1.5 bg-osmo-text/30 rounded-full mt-2 shrink-0"></span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="p-6 sm:p-8 border border-osmo-border mb-12">
          <h3 className="text-xl font-display font-light text-osmo-text mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined font-light">analytics</span>
            Pattern Analysis
          </h3>
          <div className="space-y-6">
            {sortedScores.map(([type, score], index) => {
              const percentage = Math.round((score / Math.max(...Object.values(result.scores))) * 100);
              const roundedScore = Math.round(score * 10) / 10;
              return (
                <div key={type} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs uppercase tracking-widest text-osmo-muted group-hover:text-osmo-text transition-colors">
                      {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-xs font-mono text-osmo-text/50">{roundedScore}</span>
                  </div>
                  <div className="w-full bg-osmo-text/5 h-px group-hover:bg-osmo-text/10 transition-colors">
                    <div 
                      className="h-px bg-osmo-text transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results PDF email gate. Replaces the old "workbook is coming,
            notify me" pitch -- that asked people to wait on a 31-day product
            with no ship date, right next to a book they could already buy.
            This delivers something immediately instead. */}
        <div className="p-6 sm:p-8 border border-osmo-border mb-12 bg-osmo-surface/50">
          {emailSubmitted ? (
            <div className="text-center py-4">
              <h3 className="text-xl font-display font-light text-osmo-text mb-3">
                Your PDF is ready
              </h3>
              <p className="text-sm text-osmo-muted font-light leading-relaxed max-w-md mx-auto mb-6">
                Your {result.typeDetails.title} profile, strategies and strengths, saved as a one-page PDF.
              </p>
              {(() => {
                const book = getPayhipBook(result.primaryType);
                if (!book) return null;
                return (
                  <a
                    href={`/results-pdf/${book.cardSlug}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('results_pdf_download', { type: result.primaryType })}
                    className="inline-block px-8 py-3 bg-osmo-text border border-osmo-text rounded-full font-semibold text-osmo-bg transition-all duration-300 hover:bg-transparent hover:text-osmo-text"
                  >
                    Download Your PDF
                  </a>
                );
              })()}
            </div>
          ) : (
            <>
              <h3 className="text-xl font-display font-light text-osmo-text mb-2">
                Get Your Results as a PDF
              </h3>
              <p className="text-sm text-osmo-muted font-light leading-relaxed mb-6 max-w-lg">
                A one-page summary of your {result.typeDetails.title} profile, strategies and strengths, worth saving or printing. We'll email you occasional updates too, nothing spammy.
              </p>
              <form onSubmit={handleEmailSubmit} className="max-w-md">
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-4 py-3 bg-transparent border border-osmo-border rounded-lg text-osmo-text placeholder-osmo-muted focus:border-osmo-neon-green focus:outline-none transition-colors"
                    required
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isEmailSubmitting}
                    className="px-8 py-3 bg-osmo-text border border-osmo-text rounded-full font-semibold text-osmo-bg transition-all duration-300 hover:bg-transparent hover:text-osmo-text disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEmailSubmitting ? 'Signing up...' : 'Get My PDF'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <button
            className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors border-b border-transparent hover:border-osmo-text pb-1"
            onClick={handleRetakeQuiz}
          >
            Retake Assessment
          </button>
          
          <button
            className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors border-b border-transparent hover:border-osmo-text pb-1"
            onClick={handleBackToHome}
          >
            Return Home
          </button>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden bg-osmo-text text-osmo-bg p-8 sm:p-12 text-center group rounded-3xl">
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-light mb-4">
              Break the Cycle
            </h3>
            <p className="opacity-60 mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Download the book specifically engineered for the {result.typeDetails.title} pattern.
            </p>
            {(() => {
              const book = getPayhipBook(result.primaryType);
              if (!book) return null;
              return (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('workbook_click', { type: result.primaryType, placement: 'results-cta' })}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-osmo-bg text-osmo-text rounded-full font-medium hover:scale-105 transition-transform"
                >
                  <span className="text-xs uppercase tracking-widest font-bold">Get the Book</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              );
            })()}
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}