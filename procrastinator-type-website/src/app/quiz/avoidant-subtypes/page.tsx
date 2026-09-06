'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QuizProgress from '@/components/QuizProgress';
import QuizOption from '@/components/QuizOption';
import { avoidantSubtypeQuestions } from '@/lib/avoidant-subtype-quiz-data';
import {
  calculateAvoidantSubtypeResult,
  AVOIDANT_SUBTYPE_DETAILS,
  AvoidantSubtypeOption,
  AvoidantSubtypeQuestion,
  AvoidantSubtypeResult,
} from '@/lib/avoidant-subtype-scoring';
import { track } from '@/lib/analytics';
import { siteUrl } from '@/lib/seo';

const quizJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Avoidant Procrastinator Subtype Quiz',
  description:
    'A short follow-up quiz that identifies which of 5 research-backed avoidant procrastination subtypes fits you: fear of failure, fear of success, self-handicapping, task aversiveness, or autonomy resistance.',
  url: `${siteUrl}/quiz/avoidant-subtypes`,
  about: 'Avoidant procrastination',
  isAccessibleForFree: true,
};

type RandomizedOption = AvoidantSubtypeOption & { originalIndex: number };
type RandomizedQuestion = Omit<AvoidantSubtypeQuestion, 'options'> & { options: RandomizedOption[] };

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffles each question's answer options so the subtype an option maps to
// isn't always in the same position, while keeping "None of these" fixed at
// the end. Original indices are preserved so scoring still matches against
// the unshuffled question data.
function createRandomizedQuestions(questions: AvoidantSubtypeQuestion[]): RandomizedQuestion[] {
  return questions.map((question) => {
    const optionsWithIndices: RandomizedOption[] = question.options.map((option, index) => ({
      ...option,
      originalIndex: index,
    }));

    const noneOfAboveOptions = optionsWithIndices.filter((opt) => opt.isNoneOfAbove);
    const regularOptions = optionsWithIndices.filter((opt) => !opt.isNoneOfAbove);

    return {
      ...question,
      options: [...shuffleArray(regularOptions), ...noneOfAboveOptions],
    };
  });
}

export default function AvoidantSubtypeQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selectedOptionIndices: number[] }[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [result, setResult] = useState<AvoidantSubtypeResult | null>(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState<RandomizedQuestion[]>([]);

  const [email, setEmail] = useState('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setRandomizedQuestions(createRandomizedQuestions(avoidantSubtypeQuestions));
    track('avoidant_subtype_quiz_start');
  }, []);

  if (randomizedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-osmo-bg text-osmo-muted transition-colors duration-500">
        <p className="text-xl font-light">Preparing quiz...</p>
      </div>
    );
  }

  const questions = randomizedQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    const option = currentQuestion.options[optionIndex];

    if (option.isNoneOfAbove) {
      setSelectedOptions(selectedOptions.includes(optionIndex) ? [] : [optionIndex]);
      return;
    }

    const withoutNone = selectedOptions.filter((i) => !currentQuestion.options[i].isNoneOfAbove);
    setSelectedOptions(
      withoutNone.includes(optionIndex)
        ? withoutNone.filter((i) => i !== optionIndex)
        : [...withoutNone, optionIndex]
    );
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    // Map shuffled-position indices back to the original option order so
    // scoring (which reads against the unshuffled question data) still lines up.
    const originalOptionIndices = selectedOptions.map(
      (index) => currentQuestion.options[index].originalIndex
    );

    const updatedAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selectedOptionIndices: originalOptionIndices },
    ];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const finalResult = calculateAvoidantSubtypeResult(updatedAnswers, avoidantSubtypeQuestions);
      setResult(finalResult);
      track('avoidant_subtype_quiz_complete', { subtype: finalResult.primarySubtype });

      fetch('/api/quiz-completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryType: 'avoidant', subtype: finalResult.primarySubtype }),
      }).catch(() => {
        // Tracking must never break the results view.
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setAnswers(answers.slice(0, -1));
    setSelectedOptions([]);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'avoidant',
          subtype: result.primarySubtype,
          source: 'avoidant-subtype-quiz',
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        track('email_signup', { type: 'avoidant', source: 'avoidant-subtype-quiz' });
      } else {
        const data = await response.json();
        setEmailError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setEmailError('Something went wrong. Please try again.');
    }

    setIsEmailSubmitting(false);
  };

  if (result) {
    const details = AVOIDANT_SUBTYPE_DETAILS[result.primarySubtype];

    return (
      <div className="min-h-screen bg-osmo-bg text-osmo-text py-20 transition-colors duration-500">
        <div className="osmo-container max-w-3xl">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 opacity-60">
              <span className="size-1.5 bg-osmo-text rounded-full"></span>
              <span className="text-xs uppercase tracking-widest text-osmo-muted font-display">Subtype Identified</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-light text-osmo-text mb-6">
              {details.title}
            </h1>
            <p className="text-lg text-osmo-muted font-light leading-relaxed max-w-2xl mx-auto">
              {details.description}
            </p>
          </header>

          <div className="p-6 sm:p-8 border border-osmo-border mb-12">
            <h3 className="text-xl font-display font-light text-osmo-text mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined font-light">lightbulb</span>
              Where to Start
            </h3>
            <ul className="space-y-4">
              {details.strategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-4 text-osmo-muted font-light leading-relaxed">
                  <span className="size-1.5 bg-osmo-text/30 rounded-full mt-2 shrink-0"></span>
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 border border-osmo-border mb-12">
            <h3 className="text-xl font-display font-light text-osmo-text mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined font-light">analytics</span>
              Your Breakdown
            </h3>
            <div className="space-y-6">
              {result.breakdown.map(({ subtype, score, percentage }) => (
                <div key={subtype} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs uppercase tracking-widest text-osmo-muted group-hover:text-osmo-text transition-colors">
                      {AVOIDANT_SUBTYPE_DETAILS[subtype].title}
                    </span>
                    <span className="text-xs font-mono text-osmo-text/50">{score}</span>
                  </div>
                  <div className="w-full bg-osmo-text/5 h-px group-hover:bg-osmo-text/10 transition-colors">
                    <div
                      className="h-px bg-osmo-text transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 border border-osmo-border mb-12 bg-osmo-surface/50">
            {emailSubmitted ? (
              <div className="text-center py-4">
                <h3 className="text-xl font-display font-light text-osmo-text mb-3">You&apos;re on the list</h3>
                <p className="text-sm text-osmo-muted font-light leading-relaxed max-w-md mx-auto">
                  We&apos;ll email you the moment the updated Avoidant Procrastinator book, with a subtype breakdown, is ready.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-display font-light text-osmo-text mb-2">
                  We&apos;re Updating the Avoidant Procrastinator Book
                </h3>
                <p className="text-sm text-osmo-muted font-light leading-relaxed mb-6 max-w-lg">
                  The next edition covers all 5 subtypes directly, including yours. Leave your email and we&apos;ll tell you the moment it ships.
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
                    {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                    <button
                      type="submit"
                      disabled={isEmailSubmitting}
                      className="px-8 py-3 bg-osmo-text border border-osmo-text rounded-full font-semibold text-osmo-bg transition-all duration-300 hover:bg-transparent hover:text-osmo-text disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isEmailSubmitting ? 'Signing up...' : 'Notify Me'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              href="/quiz/results"
              className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors border-b border-transparent hover:border-osmo-text pb-1"
            >
              Back to Your Results
            </Link>
            <Link
              href="/blog/avoidant-procrastination-subtypes"
              className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors border-b border-transparent hover:border-osmo-text pb-1"
            >
              Read the Full Breakdown
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text py-20 transition-colors duration-500">
      <div className="osmo-container max-w-3xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 opacity-60">
            <span className="size-1.5 bg-osmo-text rounded-full"></span>
            <span className="text-xs uppercase tracking-widest text-osmo-muted font-display">Avoidant Follow-Up</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-light text-osmo-text mb-6">
            Which Subtype Are You?
          </h1>
          <p className="text-osmo-muted font-light leading-relaxed max-w-xl mx-auto">
            Avoidant procrastination isn&apos;t one thing. Select all that apply to find out which of the 5 patterns actually drives yours.
          </p>
        </header>

        <QuizProgress
          current={currentQuestionIndex + 1}
          total={questions.length}
          className="mb-16"
        />

        <div className="mb-12">
          <h2 className="text-2xl font-display font-light text-osmo-text mb-8 leading-relaxed text-center">
            {currentQuestion.text}
          </h2>

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                text={option.text}
                isSelected={selectedOptions.includes(index)}
                onClick={() => handleOptionSelect(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-osmo-border">
          <button
            className={`
              text-xs uppercase tracking-widest font-medium text-osmo-muted hover:text-osmo-text transition-colors
              ${currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : ''}
            `}
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>

          <button
            className={`
              group flex items-center gap-2 px-8 py-3 bg-osmo-text text-osmo-bg rounded-full font-medium transition-all duration-300
              ${selectedOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-lg'}
            `}
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
          >
            <span className="text-xs uppercase tracking-widest font-bold">
              {isLastQuestion ? 'See My Subtype' : 'Next'}
            </span>
            {!isLastQuestion && (
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            )}
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-[10px] uppercase tracking-widest text-osmo-muted">
            2-Minute Follow-Up · Private &amp; Confidential
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
    </div>
  );
}
