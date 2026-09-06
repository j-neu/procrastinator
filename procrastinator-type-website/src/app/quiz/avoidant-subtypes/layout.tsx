import { pageMetadata } from '@/lib/seo'

// The quiz UI is a client component and cannot export `metadata`, so it
// lives here, matching the pattern already used by /quiz and /quiz/results.
export const metadata = pageMetadata({
  path: '/quiz/avoidant-subtypes',
  title: 'Which Avoidant Procrastinator Subtype Are You?',
  description:
    'A 2-minute follow-up quiz for Avoidant Procrastinators. Find out which of 5 research-backed subtypes actually drives your delay: fear of failure, fear of success, self-handicapping, task aversiveness, or autonomy resistance.',
  image: '/share-cards/avoidance.png',
})

export default function AvoidantSubtypeQuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
