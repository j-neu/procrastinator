import Link from 'next/link'

/**
 * Spoke-to-spoke links between the 7 type guides.
 *
 * The guides all linked up to the /types pillar but never across to each other,
 * which left them as dead ends for both readers and crawlers. Pairings are not
 * arbitrary: they follow the correlation matrix in
 * `lib/improved-quiz-scoring.ts` (arousal/active 0.6, avoidant/perfectionist
 * 0.4, emotionRegulation/avoidant 0.4, decisional/perfectionist 0.3,
 * decisional/avoidant 0.3, passive/avoidant 0.2), so the "often confused with"
 * claim matches what the scoring model actually treats as overlapping.
 *
 * Where a type has only one meaningful correlation, the second entry is an
 * honest contrast rather than an invented overlap.
 */

export type TypeSlug =
  | 'arousal'
  | 'active'
  | 'avoidant'
  | 'perfectionist'
  | 'decisional'
  | 'passive'
  | 'emotion-regulation'

const LABELS: Record<TypeSlug, string> = {
  arousal: 'Arousal Procrastination',
  active: 'Active Procrastination',
  avoidant: 'Avoidant Procrastination',
  perfectionist: 'Perfectionist Procrastination',
  decisional: 'Decisional Procrastination',
  passive: 'Passive Procrastination',
  'emotion-regulation': 'Emotion-Regulation Procrastination',
}

const HREFS: Record<TypeSlug, string> = {
  arousal: '/types/arousal-procrastinator',
  active: '/types/active-procrastinator',
  avoidant: '/types/avoidant-procrastinator',
  perfectionist: '/types/perfectionist-procrastinator',
  decisional: '/types/decisional-procrastinator',
  passive: '/types/passive-procrastinator',
  'emotion-regulation': '/types/emotion-regulation-procrastinator',
}

const RELATED: Record<TypeSlug, { slug: TypeSlug; why: string }[]> = {
  arousal: [
    {
      slug: 'active',
      why: 'Both wait for the deadline. The difference is whether the delay was a decision or a craving.',
    },
    {
      slug: 'passive',
      why: 'Both end in a scramble. One chased the pressure, the other never saw it coming.',
    },
  ],
  active: [
    {
      slug: 'arousal',
      why: 'The strongest overlap in the research. Strategy and a hunger for adrenaline look identical from outside.',
    },
    {
      slug: 'passive',
      why: 'If the plan keeps failing, the strategy may be a story you tell afterwards.',
    },
  ],
  avoidant: [
    {
      slug: 'perfectionist',
      why: 'Both are fear in different clothes. One fears the verdict, the other fears the standard.',
    },
    {
      slug: 'emotion-regulation',
      why: 'Escaping a feeling is the shared engine. Here the feeling is mood rather than fear.',
    },
    {
      slug: 'decisional',
      why: 'When the feared thing is choosing wrong, avoidance shows up as endless deliberation.',
    },
  ],
  perfectionist: [
    {
      slug: 'avoidant',
      why: 'Impossible standards and fear of failure are close relatives in the research.',
    },
    {
      slug: 'decisional',
      why: 'When every option has to be the best one, choosing becomes impossible.',
    },
  ],
  decisional: [
    {
      slug: 'perfectionist',
      why: 'Needing the right answer and needing the perfect answer are nearly the same trap.',
    },
    {
      slug: 'avoidant',
      why: 'If deciding feels dangerous, not deciding is avoidance with a respectable name.',
    },
  ],
  passive: [
    {
      slug: 'avoidant',
      why: 'Disorganisation and avoidance tangle together more often than either one looks.',
    },
    {
      slug: 'active',
      why: 'The test of strategic delay is whether the outcome actually holds up.',
    },
  ],
  'emotion-regulation': [
    {
      slug: 'avoidant',
      why: 'Both delay to escape a feeling. Fear is one feeling among many.',
    },
    {
      slug: 'passive',
      why: 'Low mood and weak systems produce the same missed deadline.',
    },
  ],
}

export default function RelatedTypes({ current }: { current: TypeSlug }) {
  const related = RELATED[current]

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
        Often Confused With
      </h2>
      <p className="mb-6">
        These patterns overlap. If the description above only half fit, the type
        you are looking for is probably one of these.
      </p>
      <ul className="space-y-4 list-none pl-0">
        {related.map(({ slug, why }) => (
          <li
            key={slug}
            className="bg-osmo-surface p-6 rounded-2xl border border-osmo-border"
          >
            <Link
              href={HREFS[slug]}
              className="font-medium text-osmo-text hover:text-osmo-neon-green transition-colors"
            >
              {LABELS[slug]}
            </Link>
            <p className="mt-2 text-osmo-muted">{why}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href="/types"
          className="text-osmo-text underline hover:text-osmo-neon-green transition-colors"
        >
          Compare all seven types
        </Link>
      </p>
    </section>
  )
}
