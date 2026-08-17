import Link from 'next/link'

import { AUTHOR } from '@/lib/seo'

/**
 * Visible author credit for the articles.
 *
 * The `Person` schema in each article's JSON-LD is not enough on its own:
 * Google's own guidance is that authorship should be visible to readers, and
 * markup that claims an author the page never shows is a weaker signal than one
 * that matches what is on screen. This keeps the two in sync, both sourced from
 * `AUTHOR` in lib/seo.ts.
 *
 * `dateModified` is passed in rather than derived so it always matches the value
 * in the page's JSON-LD.
 */
export default function Byline({ dateModified }: { dateModified: string }) {
  const shown = new Date(dateModified).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <p className="text-sm text-osmo-muted mb-8">
      By{' '}
      {/* Internal link now that AUTHOR.url is the on-site /about page. Not
          target="_blank": that was correct while it pointed off-site, and is
          hostile for a same-site link. */}
      <Link
        href="/about"
        rel="author"
        className="text-osmo-text underline hover:text-osmo-neon-green transition-colors"
      >
        {AUTHOR.name}
      </Link>
      {'  '}
      <span aria-hidden="true"> · </span>
      <span>
        Updated <time dateTime={dateModified}>{shown}</time>
      </span>
    </p>
  )
}
