import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

import { AUTHOR, absoluteUrl, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/about',
  title: 'About Jonathan Northwood',
  description:
    'Who writes Procrastitype, and why. Self-taught, not clinically trained: the method here came out of quitting a run of stubborn personal habits, then turning the same approach on procrastination.',
})

/**
 * Person schema for the author page.
 *
 * `mainEntity` rather than a bare `Person` node: this page is *about* him, which
 * is what makes it a credible target for the `author` links on the 8 articles.
 * Claims experience only. No degree, licence or clinical training appears here or
 * anywhere else, because none exists.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: AUTHOR.name,
    url: AUTHOR.url,
    description: AUTHOR.summary,
    knowsAbout: [
      'Procrastination',
      'Habit change',
      'Addiction recovery',
      'Behavioral psychology',
    ],
    sameAs: [AUTHOR.homepage],
  },
  url: absoluteUrl('/about'),
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <SiteHeader links={[{ href: '/types', label: 'The 7 Types' }]} />

      <main className="pt-40 pb-20">
        <article className="osmo-container max-w-3xl">
          <div className="mb-16">
            <span className="px-3 py-1 bg-osmo-neon-green text-black text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
              About
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              Who writes this, and why
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              {AUTHOR.summary}
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The short version
              </h2>
              <p>
                I am not a psychologist. I have no clinical training and no letters after my name. What I have is a
                list of things that had me and no longer do: coffee, smoking, alcohol, the phone that used to eat my
                evenings, and a couple I will keep to myself.
              </p>
              <p>
                Not one of those came off through willpower. I tried willpower for years. Willpower is a fight you
                have to keep winning, and you only have to lose once.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                What actually worked
              </h2>
              <p>
                Two things, and they fit together.
              </p>
              <p>
                The first was a method that goes after the wanting instead of the doing. Rather than white-knuckling
                past a craving, you take apart the belief underneath it until the thing stops looking like a reward
                and starts looking like what it is. Once that lands, there is nothing left to resist. You are not
                giving something up. You are putting down something that was never paying you.
              </p>
              <p>
                The second was the identity shift James Clear describes in <em>Atomic Habits</em>. You do not quit
                smoking by refusing cigarettes. You quit by becoming someone who does not smoke, and then behaving
                accordingly. The behaviour follows the identity, not the reverse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Why procrastination
              </h2>
              <p>
                Somewhere around the fourth habit I noticed I was running the same loop on my own work. Something
                uncomfortable comes up, I reach for relief, relief arrives, and the discomfort comes back slightly
                worse. That is the shape of an addiction, and procrastination fits it exactly. The substance is just
                avoidance.
              </p>
              <p>
                So I turned the same method on it. That is what Procrastitype is: the approach that got me off five
                things, applied to the one that does not look like an addiction because everybody has it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                What this is not
              </h2>
              <p>
                None of it is therapy, and none of it is a diagnosis. The assessment is a self-report questionnaire
                rather than a clinical instrument, and it has not been externally validated. If your procrastination
                is tangled up with depression, anxiety or ADHD, a professional will help you in ways a quiz cannot.
              </p>
              <p>
                Where the writing leans on research, the research is named on the page and listed in full on the{' '}
                <Link href="/research" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                  research page
                </Link>
                . Ferrari, Chu and Choi, Steel, Sirois and Pychyl did the science. I applied it. Those are different
                jobs and I try not to blur them.
              </p>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Start where I did
              </h2>
              <p className="mb-6">
                Work out which pattern you are running. It takes about five minutes and costs nothing.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 text-osmo-neon-green hover:text-osmo-text transition-colors font-bold uppercase tracking-widest text-sm"
              >
                Take the Assessment{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </section>

            <section>
              <p className="text-sm">
                Elsewhere:{' '}
                <a
                  href={AUTHOR.homepage}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                >
                  jnorthwood.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </div>
  )
}
