import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata = pageMetadata({
  path: '/blog',
  title: 'The Procrastitype Blog',
  description:
    'Research-backed writing on procrastination: the science behind the seven types, where the published literature goes further than the label, and what actually works.',
})

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Procrastitype Blog',
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: BLOG_POSTS.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
  })),
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogIndexPage() {
  const [latest, ...older] = BLOG_POSTS

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <SiteHeader links={[{ href: '/types', label: 'Types' }]} />

      <main className="pt-40 pb-20">
        <div className="osmo-container max-w-3xl">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              The Procrastitype <br />
              <span className="italic text-osmo-muted">Blog</span>
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              Research-backed writing on procrastination: the science behind the seven types, where the
              published literature goes further than the label, and what to do about it.
            </p>
          </div>

          {latest && (
            <Link
              href={`/blog/${latest.slug}`}
              className="group block mb-16 rounded-2xl border border-osmo-border bg-osmo-surface overflow-hidden hover:border-osmo-neon-green transition-colors"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-osmo-neon-green mb-4">
                    Latest post
                  </span>
                  <time className="text-xs uppercase tracking-widest text-osmo-muted mb-2">
                    {formatDate(latest.datePublished)}
                  </time>
                  <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-4 group-hover:text-osmo-neon-green transition-colors">
                    {latest.title}
                  </h2>
                  <p className="text-osmo-muted font-light leading-relaxed mb-6">{latest.description}</p>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-osmo-text">
                    Read the post
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <img
                  src={latest.image}
                  alt=""
                  width={1080}
                  height={1080}
                  loading="lazy"
                  className="w-full h-64 md:h-full object-cover order-1 md:order-2"
                />
              </div>
            </Link>
          )}

          {older.length > 0 && (
            <div className="space-y-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-osmo-muted">More Posts</h2>
              {older.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border-l-2 border-osmo-border hover:border-osmo-neon-green pl-6 py-2 transition-colors"
                >
                  <time className="text-xs uppercase tracking-widest text-osmo-muted">
                    {formatDate(post.datePublished)}
                  </time>
                  <h3 className="text-xl font-display font-medium text-osmo-text mt-1 mb-2 group-hover:text-osmo-neon-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-osmo-muted font-light leading-relaxed">{post.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </div>
  )
}
