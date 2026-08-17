import type { Metadata } from 'next'

/**
 * Canonical origin for the site.
 *
 * NOTE: `NEXT_PUBLIC_SITE_URL` must be set to the live domain in Vercel.
 * If it points anywhere else, every canonical, og:url and sitemap entry
 * follows it -- which is exactly how the whole site ended up canonicalising
 * to a dead domain. The fallback below is the source of truth.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://procrastitype.jnorthwood.com'

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path === '/' ? '' : path}`

type PageMetaInput = {
  /** Site-relative path, e.g. '/quiz'. Use '/' for the homepage. */
  path: string
  title: string
  description: string
  /** Site-relative image path, e.g. '/share-cards/perfectionist.png'. */
  image?: string
  /** Keep the page out of the index (results pages, admin, etc.). */
  noindex?: boolean
  /** Set for article-style pages so og:type is correct. */
  ogType?: 'website' | 'article'
}

/**
 * Build per-page metadata with a self-referencing canonical.
 *
 * Every route MUST call this (or set `alternates.canonical` itself). The root
 * layout deliberately does NOT define a canonical: metadata is merged shallowly
 * in the App Router, so a canonical set there is inherited verbatim by every
 * child route that doesn't override it.
 */
export function pageMetadata({
  path,
  title,
  description,
  image,
  noindex = false,
  ogType = 'website',
}: PageMetaInput): Metadata {
  const images = image ? [{ url: image }] : undefined

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url: path,
      title,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(images ? { images } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
