import { Question, QuizResult, typeDetails } from './quiz-data';
import { calculateImprovedQuizResult, ImprovedQuestion, ImprovedQuizResult } from './improved-quiz-scoring';

export interface UserAnswer {
  questionId: number;
  selectedOptionIndices: number[];
}

export function calculateQuizResult(answers: UserAnswer[], questions: Question[]): QuizResult {
  const scores = {
    arousal: 0,
    avoidant: 0,
    decisional: 0,
    perfectionist: 0,
    passive: 0,
    active: 0,
    emotionRegulation: 0
  };

  // Calculate total scores for each type
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && answer.selectedOptionIndices && answer.selectedOptionIndices.length > 0) {
      answer.selectedOptionIndices.forEach(index => {
        if (question.options[index]) {
          const optionScores = question.options[index].scores;
          scores.arousal += optionScores.arousal;
          scores.avoidant += optionScores.avoidant;
          scores.decisional += optionScores.decisional;
          scores.perfectionist += optionScores.perfectionist;
          scores.passive += optionScores.passive;
          scores.active += optionScores.active;
          scores.emotionRegulation += optionScores.emotionRegulation;
        }
      });
    }
  });

  // Find the primary type (highest score)
  const typeKeys = Object.keys(scores) as (keyof typeof scores)[];
  const primaryTypeKey = typeKeys.reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );

  // Convert key to match typeDetails keys
  const typeKeyMapping = {
    arousal: 'arousal',
    avoidant: 'avoidant', 
    decisional: 'decisional',
    perfectionist: 'perfectionist',
    passive: 'passive',
    active: 'active',
    emotionRegulation: 'emotionRegulation'
  };

  const primaryType = typeKeyMapping[primaryTypeKey];

  return {
    primaryType,
    scores,
    typeDetails: typeDetails[primaryType as keyof typeof typeDetails]
  };
}

export function getProgressPercentage(currentQuestion: number, totalQuestions: number): number {
  return Math.round((currentQuestion / totalQuestions) * 100);
}

export function getTypeColor(typeName: string): string {
  const colorMap: { [key: string]: string } = {
    arousal: '#e11d48',
    avoidant: '#3b82f6',
    decisional: '#059669',
    perfectionist: '#7c3aed',
    passive: '#ea580c',
    active: '#0891b2',
    emotionRegulation: '#db2777'
  };
  
  return colorMap[typeName] || '#6b7280';
}

export function getTypeIcon(typeName: string): string {
  const iconMap: { [key: string]: string } = {
    arousal: 'timer',
    avoidant: 'shield',
    decisional: 'balance',
    perfectionist: 'auto_awesome',
    passive: 'cyclone',
    active: 'crisis_alert',
    emotionRegulation: 'psychology'
  };
  
  return iconMap[typeName] || 'edit_note';
}

// New improved quiz calculation function
export function calculateImprovedQuizResultWrapper(
  answers: UserAnswer[], 
  questions: ImprovedQuestion[]
): ImprovedQuizResult {
  return calculateImprovedQuizResult(answers, questions);
}

// Convert improved result to legacy format for backward compatibility
export function convertImprovedToLegacyResult(improvedResult: ImprovedQuizResult): QuizResult {
  return {
    primaryType: improvedResult.primaryType,
    scores: improvedResult.rawScores,
    typeDetails: {
      title: improvedResult.typeDetails.title,
      description: improvedResult.typeDetails.description,
      strategies: improvedResult.typeDetails.strategies,
      strengths: improvedResult.typeDetails.strengths
    }
  };
}