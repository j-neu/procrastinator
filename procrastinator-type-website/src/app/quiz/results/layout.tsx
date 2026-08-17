import { pageMetadata } from '@/lib/seo'

// Results depend on quiz state held client-side, so a crawler only ever sees an
// empty shell. Indexing it would put a thin, contentless page in the index --
// hence noindex, while still following links out of it.
export const metadata = pageMetadata({
  path: '/quiz/results',
  title: 'Your Procrastination Type Results',
  description:
    'Your personalised procrastination type results, including your primary type, secondary type and confidence score.',
  noindex: true,
})

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children
}
