import { pageMetadata } from '@/lib/seo'

// The quiz UI is a client component and cannot export `metadata`, so it lives
// here. Without this the route inherited the homepage title verbatim and the
// two pages competed for the same query.
export const metadata = pageMetadata({
  path: '/quiz',
  title: 'Free Procrastination Quiz: 35 Questions, 5 Minutes',
  description:
    'Answer 35 behavioural questions and find out which of the 7 procrastination types fits you, with a confidence score and your secondary type. Free, no signup.',
})

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
