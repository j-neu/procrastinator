import { pageMetadata } from '@/lib/seo'
import HomeClient from './HomeClient'

// Server wrapper: the homepage UI is a client component, and client components
// cannot export `metadata`. Keeping the shell here lets the homepage carry its
// own canonical instead of relying on one inherited from the root layout.
export const metadata = pageMetadata({
  path: '/',
  title: 'Procrastination Quiz: Discover Your Type | Procrastitype',
  description:
    'Take the science-backed procrastination quiz and discover which of the 7 procrastination types you are. Get personalized strategies, books and workbooks to break the pattern for good.',
})

export default function Page() {
  return <HomeClient />
}
