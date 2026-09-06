// Scoring for the short avoidant-subtype follow-up quiz.
// Based on the 5 mechanisms covered in /blog/avoidant-procrastination-subtypes:
// Solomon & Rothblum (1984), Berglas & Jones (1978), Ferrari (1991),
// Steel (2007), and Uzun Özer, Demir & Ferrari (2009).

export type AvoidantSubtype =
  | 'fearOfFailure'
  | 'fearOfSuccess'
  | 'selfHandicapping'
  | 'taskAversiveness'
  | 'autonomyResistance';

export interface AvoidantSubtypeOption {
  text: string;
  subtype: AvoidantSubtype | null;
  isNoneOfAbove?: boolean;
}

export interface AvoidantSubtypeQuestion {
  id: number;
  text: string;
  options: AvoidantSubtypeOption[];
}

export interface AvoidantSubtypeResult {
  primarySubtype: AvoidantSubtype;
  scores: Record<AvoidantSubtype, number>;
  breakdown: { subtype: AvoidantSubtype; score: number; percentage: number }[];
  noneOfAboveCount: number;
}

const SUBTYPE_ORDER: AvoidantSubtype[] = [
  'fearOfFailure',
  'fearOfSuccess',
  'selfHandicapping',
  'taskAversiveness',
  'autonomyResistance',
];

export function calculateAvoidantSubtypeResult(
  answers: { questionId: number; selectedOptionIndices: number[] }[],
  questions: AvoidantSubtypeQuestion[]
): AvoidantSubtypeResult {
  const scores: Record<AvoidantSubtype, number> = {
    fearOfFailure: 0,
    fearOfSuccess: 0,
    selfHandicapping: 0,
    taskAversiveness: 0,
    autonomyResistance: 0,
  };
  let noneOfAboveCount = 0;

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    answer.selectedOptionIndices.forEach((index) => {
      const option = question.options[index];
      if (!option) return;

      if (option.isNoneOfAbove) {
        noneOfAboveCount++;
        return;
      }

      if (option.subtype) {
        scores[option.subtype] += 1;
      }
    });
  });

  const sorted = [...SUBTYPE_ORDER].sort((a, b) => scores[b] - scores[a]);
  const primarySubtype = sorted[0];
  const totalScore = SUBTYPE_ORDER.reduce((sum, key) => sum + scores[key], 0);

  const breakdown = sorted.map((subtype) => ({
    subtype,
    score: scores[subtype],
    percentage: totalScore > 0 ? Math.round((scores[subtype] / totalScore) * 100) : 0,
  }));

  return { primarySubtype, scores, breakdown, noneOfAboveCount };
}

export const AVOIDANT_SUBTYPE_DETAILS: Record<
  AvoidantSubtype,
  { title: string; description: string; strategies: string[] }
> = {
  fearOfFailure: {
    title: 'Fear of Failure',
    description:
      "You delay finishing because an unfinished task can't be judged yet. Once it's done, it can be measured against a standard, and some part of you would rather not find out where it lands.",
    strategies: [
      'Lower the stakes on purpose before you start. Call it a rough draft, not a final answer.',
      'Separate the verdict on the work from the verdict on you. One weak result is not a diagnosis.',
      'Name the actual cost of a mediocre attempt in specific terms, out loud, instead of leaving it as general dread.',
    ],
  },
  fearOfSuccess: {
    title: 'Fear of Success',
    description:
      'You hesitate less at failing and more at succeeding well, because doing this one thing well raises what people expect from you next time. The delay protects the lower bar, not your ego.',
    strategies: [
      'Name the expectation you are actually afraid of. Most of the time nobody has stated it; you supplied it yourself.',
      'Decide in advance that doing this well once does not obligate you to repeat it forever.',
      'Watch for the moment you quietly weaken a strong draft right before finishing it. That is the tell.',
    ],
  },
  selfHandicapping: {
    title: 'Self-Handicapping',
    description:
      'You delay in a way that manufactures a ready excuse. If the result is weak, the delay itself explains why, so the outcome never has to reflect on your actual ability.',
    strategies: [
      'Catch yourself building the excuse before the task even starts, and call it an excuse, not a reason.',
      'Finish something early once, with no excuse available, and notice what the anxiety about it actually does.',
      'Ask who the excuse is really for. Usually it is for you, not for anyone watching.',
    ],
  },
  taskAversiveness: {
    title: 'Task Aversiveness',
    description:
      "The delay isn't about being judged at all. The task itself is boring, effortful, or unpleasant, and you're avoiding the feeling of doing it, not the outcome of having done it.",
    strategies: [
      'Shrink the task to the smallest unpleasant chunk instead of trying to want the whole thing.',
      'Pair the task with something that makes the discomfort more tolerable, not with motivation you do not feel.',
      'Stop waiting to feel like doing it first. The feeling usually shows up after you start, not before.',
    ],
  },
  autonomyResistance: {
    title: 'Autonomy Resistance',
    description:
      "You delay tasks that feel imposed on you by someone else's schedule or priorities, even ones you would happily do on your own terms.",
    strategies: [
      'Rewrite the task in your own words, on your own timeline, before you touch it.',
      'Find the one piece of it you would actually choose, and start there instead of at the imposed beginning.',
      "If the deadline really is someone else's, decide once whether you agree with it, instead of relitigating that every time you sit down.",
    ],
  },
};
