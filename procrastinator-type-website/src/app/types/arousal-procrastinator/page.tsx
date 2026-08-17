import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RelatedTypes from '@/components/RelatedTypes'
import Byline from '@/components/Byline'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/arousal-procrastinator',
  title: 'Arousal Procrastination: Signs, Science & How to Break It',
  description:
    'You wait until the last minute because calm work feels boring. Here is what arousal procrastination is, why the adrenaline is a trap, and what actually works.',
  image: '/share-cards/arousal.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Arousal Procrastination: Signs, Science & How to Break It',
  description:
    'What arousal procrastination is, why the last-minute rush is a trap, and what actually works.',
  image: absoluteUrl('/share-cards/arousal.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-17',
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/arousal-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is arousal procrastination the same as active procrastination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Active procrastinators delay on purpose and feel in control. Arousal procrastinators delay because they are chasing stimulation and usually feel out of control. The two overlap in the research, but the experience is different.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do arousal procrastinators perform better under pressure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often they perform well in a crisis, but that is survival, not skill. The pressure finally forces focus. The work was always possible; the boredom just blocked it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I stop needing the last-minute rush?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notice when you delay out of boredom instead of for a real reason, then run small experiments: finish one small task early and watch what happens. The rush is a habit, and habits can be broken.',
      },
    },
  ],
}

export default function ArousalProcrastinatorPage() {
  const book = getPayhipBook('arousal')

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <SiteHeader links={[{ href: '/types', label: 'Types' }]} />

      <main className="pt-40 pb-20">
        <article className="osmo-container max-w-3xl">
          <div className="mb-16">
            <Link href="/types" className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors mb-6 inline-block">
              ← All Procrastination Types
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              Arousal Procrastination: <br />
              <span className="italic text-osmo-muted">You're Not Lazy, You're Bored</span>
            </h1>

            <Byline dateModified="2026-08-17" />
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              You know the feeling. The report is due Friday, you open the document on Tuesday, and your brain switches off. So you close it. And you'll do it Thursday night, at 11 PM, with a heartbeat you can feel in your ears. And you'll do it well. Maybe better than you would have on Tuesday.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Arousal Procrastination Looks Like</h2>
              <p>You'll recognize yourself in most of these:</p>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You start big tasks only when the deadline is close enough to hurt.</li>
                <li>Calm, steady work feels wrong, like coasting in a car with no engine.</li>
                <li>You've said "I work best under pressure" so often you believe it.</li>
                <li>Deadlines you set for yourself never work, because you know you can move them.</li>
                <li>You feel a physical lift when the pressure finally arrives.</li>
              </ul>
              <p>
                Here's what it is not: laziness. Lazy people don't feel this. You are exhausted by the effort of not working, and electrified by the danger of working too late. That's not apathy. That's a pattern with a pulse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Rush</h2>
              <p>
                Psychologists call this arousal procrastination, and the label comes from Joseph Ferrari, who studied it at DePaul University in the early 1990s. Ferrari found that some procrastinators don't delay out of fear. They delay because they chase the rush of the last-minute finish. The task isn't the enemy. The adrenaline is the point.
              </p>
              <p>
                Steel's 2007 meta-analysis in Psychological Bulletin backs it up. Procrastination is impulsive behavior, and for this type, the impulse points toward stimulation. A spreadsheet gives you nothing. A midnight deadline gives you everything.
              </p>
              <p>
                The pattern this gets mistaken for is active procrastination, where the delay is a decision about
                timing rather than a hunt for the charge.{' '}
                <Link
                  href="/types/compare/arousal-vs-active-procrastination"
                  className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                >
                  Arousal vs active procrastination
                </Link>{' '}
                sets the two out side by side, along with the question that separates them.
              </p>
              <p>
                But here is the catch, and it matters. You don't perform better because of the pressure. You perform better in spite of it, because the pressure finally outweighs the boredom. The ability was always there. The crisis just let it out.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why Willpower Won't Fix It</h2>
              <p>
                You've tried starting earlier. You've tried rewards, apps, promises. None of it sticks, because you're asking yourself to do something that feels pointless. Your brain reads "task, no pressure" as "task, no payoff." Willpower becomes a fight against your own biology, and your biology has more stamina than you do.
              </p>
              <p>
                There's a second reason. You still believe the story that you're a pressure person. As long as the rush feels like fuel, you will keep reaching for it. The story has to go before the behavior can.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Name the rush.</strong>
                  Call the adrenaline what it is: a stimulant your brain sells you to make boredom bearable. You don't need it. You've just been buying it for years.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Use deadlines you can't move.</strong>
                  A deadline you set yourself is a promise you can break. A deadline a client, a boss, or a friend expects is a wall. When you need pressure, borrow someone else's.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Do the boring thing first, on purpose.</strong>
                  Finish one small task at a normal pace, before any deadline exists. Notice that nothing bad happens. Your brain needs proof that calm work is safe.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Build a new reward.</strong>
                  After finishing early, register the feeling of being done without the panic. It's quieter than the rush. It's also cheaper.
                </li>
              </ul>
              <p>
                None of this requires becoming a different person. It requires seeing the rush for what it is and letting it starve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is arousal procrastination the same as active procrastination?</h3>
                  <p>
                    No. Active procrastinators delay on purpose and feel in control. Arousal procrastinators delay because they're chasing stimulation and usually feel out of control. The two overlap in the research, but the experience is different.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Do arousal procrastinators perform better under pressure?</h3>
                  <p>
                    Often they perform well in a crisis, but that is survival, not skill. The pressure finally forces focus. The work was always possible. The boredom just blocked it.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How do I stop needing the last-minute rush?</h3>
                  <p>
                    Notice when you delay out of boredom instead of for a real reason, then run small experiments. Finish one small task early and watch what happens. The rush is a habit, and habits can be broken.
                  </p>
                </div>
              </div>
            </section>

            <RelatedTypes current="arousal" />

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Know Your Pattern for Certain</h2>
              <p className="mb-6">
                If any of this felt personal, take the free assessment. It measures all seven types, not just this one, and it will show your full profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-osmo-neon-green text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                >
                  Take the Assessment
                </Link>
                {book && (
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    Get the Book
                  </a>
                )}
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
