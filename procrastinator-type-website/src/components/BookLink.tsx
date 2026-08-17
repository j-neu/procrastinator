'use client'

import { track } from '@/lib/analytics'

/**
 * Payhip link that reports a `workbook_click`.
 *
 * The 7 type guides are server components, so their Payhip links are plain
 * anchors and fire nothing. Only the quiz results and /workbooks pages are
 * client components and therefore the only Payhip links currently tracked,
 * which leaves a hole in the funnel. This is the smallest client boundary that
 * closes it, and the type guides can adopt it without becoming client pages.
 */
export default function BookLink({
  href,
  type,
  placement,
  children,
  className,
}: {
  href: string
  /** Quiz result type key, e.g. 'active'. Matches other workbook_click calls. */
  type: string
  /** Where on the site the click happened, e.g. 'compare-page'. */
  placement: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('workbook_click', { type, placement })}
      className={className}
    >
      {children}
    </a>
  )
}
