'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';
import { QuizResult } from '../../../lib/quiz-data';
import { ImprovedQuizResult } from '../../../lib/improved-quiz-scoring';
import { getTypeColor, getTypeIcon } from '../../../lib/quiz-utils';

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [improvedResult, setImprovedResult] = useState<ImprovedQuizResult | null>(null);
  const [useImprovedVersion, setUseImprovedVersion] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    } catch (error) {
      console.log('Could not track quiz completion:', error);
    }
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
        <div className="bg-osmo-surface border border-osmo-border p-12 mb-12 relative overflow-hidden group">
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

            <div className="flex justify-center">
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
            </div>
          </div>
        </div>

        {/* Strategies & Strengths Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 border border-osmo-border hover:bg-osmo-surface transition-colors duration-500">
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

          <div className="p-8 border border-osmo-border hover:bg-osmo-surface transition-colors duration-500">
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
        <div className="p-8 border border-osmo-border mb-12">
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
        <div className="relative overflow-hidden bg-osmo-text text-osmo-bg p-12 text-center group rounded-3xl">
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-light mb-4">
              Break the Cycle
            </h3>
            <p className="opacity-60 mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Download the 31-day workbook specifically engineered for the {result.typeDetails.title} pattern.
            </p>
            <Link 
              href={`/workbooks?type=${result.primaryType}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-osmo-bg text-osmo-text rounded-full font-medium hover:scale-105 transition-transform"
            >
              <span className="text-xs uppercase tracking-widest font-bold">Get Workbook</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}