'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizProgress from '../../components/QuizProgress';
import QuizOption from '../../components/QuizOption';
import { quizQuestions, Question } from '../../lib/quiz-data';
import { improvedQuizQuestions } from '../../lib/improved-quiz-data';
import { calculateQuizResult, UserAnswer, calculateImprovedQuizResultWrapper, convertImprovedToLegacyResult } from '../../lib/quiz-utils';
import { ImprovedQuestion } from '../../lib/improved-quiz-scoring';

// Shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create randomized questions with original indices preserved
// Respects fixedOrder flag for certain question types
function createRandomizedQuestions(questions: Question[] | ImprovedQuestion[]) {
  return questions.map(question => {
    const shouldFixOrder = 'fixedOrder' in question && question.fixedOrder;

    // For questions with fixed order, don't shuffle
    if (shouldFixOrder) {
      return {
        ...question,
        options: question.options.map((option, index) => ({
          ...option,
          originalIndex: index
        }))
      };
    }

    // For standard questions, shuffle all options except "none of the above"
    const optionsWithIndices = question.options.map((option, index) => ({
      ...option,
      originalIndex: index
    }));

    // Separate "none of the above" options
    const noneOfAboveOptions = optionsWithIndices.filter(opt =>
      'isNoneOfAbove' in opt && opt.isNoneOfAbove
    );
    const regularOptions = optionsWithIndices.filter(opt =>
      !('isNoneOfAbove' in opt && opt.isNoneOfAbove)
    );

    // Shuffle regular options, keep "none of the above" at the end
    const shuffledRegular = shuffleArray(regularOptions);
    const finalOptions = [...shuffledRegular, ...noneOfAboveOptions];

    return {
      ...question,
      options: finalOptions
    };
  });
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState<(Question | ImprovedQuestion)[]>([]);
  const [useImprovedVersion, setUseImprovedVersion] = useState(true);
  const router = useRouter();

  // Initialize randomized questions once when component mounts
  useEffect(() => {
    const questionsToUse = useImprovedVersion ? improvedQuizQuestions : quizQuestions;
    setRandomizedQuestions(createRandomizedQuestions(questionsToUse));
  }, [useImprovedVersion]);

  // Don't render until questions are randomized
  if (randomizedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-osmo-bg text-osmo-muted transition-colors duration-500">
        <p className="text-xl font-light">
          Preparing assessment...
        </p>
      </div>
    );
  }

  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === randomizedQuestions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];
    const isNoneOfAbove = 'isNoneOfAbove' in selectedOption && selectedOption.isNoneOfAbove;

    if (isNoneOfAbove) {
      // If "None of the above" is selected, it should be the only selection
      // If it's already selected, deselect it (toggle)
      // If it's not selected, select it and clear others
      if (selectedOptions.includes(optionIndex)) {
        setSelectedOptions(selectedOptions.filter(i => i !== optionIndex));
      } else {
        setSelectedOptions([optionIndex]);
      }
    } else {
      // If a regular option is selected
      // First, remove any "None of the above" options from selection
      let newSelection = selectedOptions.filter(i => {
        const opt = currentQuestion.options[i];
        return !('isNoneOfAbove' in opt && opt.isNoneOfAbove);
      });

      // Toggle the selected option
      if (newSelection.includes(optionIndex)) {
        newSelection = newSelection.filter(i => i !== optionIndex);
      } else {
        newSelection = [...newSelection, optionIndex];
      }
      setSelectedOptions(newSelection);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    // Map back to original option indices for scoring
    const originalOptionIndices = selectedOptions.map(index => {
      const selectedRandomizedOption = currentQuestion.options[index];
      return (selectedRandomizedOption as any).originalIndex;
    });

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndices: originalOptionIndices
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate results using appropriate system
      let result;
      if (useImprovedVersion) {
        const improvedResult = calculateImprovedQuizResultWrapper(updatedAnswers, improvedQuizQuestions);
        // Store improved result with additional data
        localStorage.setItem('improvedQuizResult', JSON.stringify(improvedResult));
        // Also store legacy format for backward compatibility
        result = convertImprovedToLegacyResult(improvedResult);
      } else {
        // Legacy system doesn't support multi-select well, pick the first option
        // Or adapt legacy calculation (which we updated in quiz-utils.ts)
        result = calculateQuizResult(updatedAnswers, quizQuestions);
      }
      
      // Store result in localStorage for the results page
      localStorage.setItem('quizResult', JSON.stringify(result));
      localStorage.setItem('useImprovedVersion', JSON.stringify(useImprovedVersion));
      router.push('/quiz/results');
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Remove the last answer
      setAnswers(answers.slice(0, -1));
      // Reset selected option
      setSelectedOptions([]);
    }
  };

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text py-20 transition-colors duration-500">
      <div className="osmo-container max-w-3xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 opacity-60">
            <span className="size-1.5 bg-osmo-text rounded-full"></span>
            <span className="text-xs uppercase tracking-widest text-osmo-muted font-display">Pattern Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-light text-osmo-text mb-6">
            Assessment
          </h1>
          <p className="text-osmo-muted font-light leading-relaxed max-w-xl mx-auto">
            Select all that apply to discover your unique procrastination patterns.
          </p>
        </header>

        <QuizProgress 
          current={currentQuestionIndex + 1} 
          total={randomizedQuestions.length}
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
              {isLastQuestion ? 'Complete Analysis' : 'Next'}
            </span>
            {!isLastQuestion && (
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            )}
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-[10px] uppercase tracking-widest text-osmo-muted">
            Private & Confidential Analysis
          </p>
        </div>
      </div>
    </div>
  );
}