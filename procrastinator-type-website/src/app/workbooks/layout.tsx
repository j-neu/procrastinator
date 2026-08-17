import { pageMetadata } from '@/lib/seo'

// Client component, same reason as /quiz: metadata has to live in the layout.
export const metadata = pageMetadata({
  path: '/workbooks',
  title: 'Procrastination Workbooks & Books for All 7 Types',
  description:
    'Cognitive dismantling books and 31-day workbooks built for each procrastination type. Pick the one that matches your pattern instead of generic productivity advice.',
})

export default function WorkbooksLayout({ children }: { children: React.ReactNode }) {
  return children
}
