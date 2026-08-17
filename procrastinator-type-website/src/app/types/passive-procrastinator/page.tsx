import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RelatedTypes from '@/components/RelatedTypes'
import Byline from '@/components/Byline'
import BookLink from '@/components/BookLink'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/passive-procrastinator',
  title: 'Passive Procrastination: Why You Keep Missing Deadlines',
  description:
    'You don\u2019t plan to delay. It just happens. What passive procrastination is, how it differs from strategic delay, and how to build systems that beat it.',
  image: '/share-cards/passive.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Passive Procrastination: Why You Keep Missing Deadlines',
  description:
    'What passive procrastination is, how it differs from strategic delay, and the systems that beat it.',
  image: absoluteUrl('/share-cards/passive.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-17',
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/passive-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between passive and active procrastination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Active procrastinators delay on purpose and still deliver. Passive procrastinators delay without a plan, feel overwhelmed, and miss deadlines. Chu and Choi (2005) showed the two look similar from the outside and feel completely different inside.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is passive procrastination a lack of discipline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It is usually a planning and perception problem. People with this pattern underestimate how long tasks take, which is not a character flaw. It is a measurement error that can be fixed with better systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best system for passive procrastinators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'External structure. Break tasks into pieces, put every piece on a calendar, and make the first step of each task take under two minutes. Rely on the system, not on motivation.',
      },
    },
  ],
}

export default function PassiveProcrastinatorPage() {
  const book = getPayhipBook('passive')

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
              Passive Procrastination: <br />
              <span className="italic text-osmo-muted">You Didn't Choose This Delay. It Chose You.</span>
            </h1>

            <Byline dateModified="2026-08-17" />
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              You wake up intending to work. You really do. Then the morning evaporates, the afternoon disappears into small tasks, and at 6 PM you're surprised to be where you are, again, with the deadline closer and nothing done. You don't have a fear story or a thrill story. You just keep losing the day.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Passive Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You think in days, not hours, and "I'll do it this week" turns into "next week."</li>
                <li>You underestimate how long everything takes, by a lot.</li>
                <li>You switch between tasks constantly and finish nothing.</li>
                <li>Your workspace and your to-do list both breed chaos.</li>
                <li>You feel overwhelmed by the pile, so you avoid looking at the pile.</li>
              </ul>
              <p>
                The defining feature is that the delay is not a choice and not a strategy. It's a byproduct. No drama, no rush, no fear. Just drift, followed by panic, followed by the same drift again.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Drift</h2>
              <p>
                Chu and Choi gave this pattern its name in 2005. They split procrastinators into passive and active groups, and the split is about control. Active procrastinators delay deliberately and keep their outcomes intact. Passive procrastinators delay unintentionally, feel distressed, and suffer the consequences. Same delay. Opposite experience.
              </p>
              <p>
                If you are not sure which side of that line you are on,{' '}
                <Link
                  href="/types/compare/active-vs-passive-procrastination"
                  className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                >
                  active vs passive procrastination
                </Link>{' '}
                sets the two out side by side.
              </p>
              <p>
                Steel's 2007 meta-analysis explains the mechanics. Impulsiveness and poor self-regulation show up as time blindness: the future feels unreal, so only the present is worth responding to. Tasks without an immediate consequence get no attention, and the pile grows while you live entirely in the now.
              </p>
              <p>
                One more factor, and it's the one people don't expect: overwhelm. A chaotic list reads as a threat, and avoidance of the list is avoidance of the feeling. This is where passive procrastination borrows from the avoidant playbook, which is why the two patterns often travel together.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why "Try Harder" Fails</h2>
              <p>
                You've tried being more disciplined. Discipline is a daily decision, and you are already making hundreds of daily decisions that drain the same account. The problem is not effort. The problem is that the system runs on memory, intention and willpower, all three of which are unreliable by design.
              </p>
              <p>
                Motivation is also a dead end. You don't feel motivated, so you wait for the feeling, and the feeling waits for progress. Someone has to move first, and with this pattern it will never be the feeling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Put everything on a calendar.</strong>
                  A to-do list is a wish. A calendar is a contract. Break the task into pieces and give each piece a specific time slot. The piece, not the task.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Make the first step tiny.</strong>
                  The first step of any task should take under two minutes. Open the file. Write the heading. Momentum is a system, not a feeling.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Estimate with a baseline.</strong>
                  Whatever you think a task takes, double it and add a buffer. Your estimate is wrong, and the buffer is how you stop being wrong.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Shrink the visible pile.</strong>
                  Keep one active task visible and archive the rest. An overwhelming list feeds avoidance, and a small list feeds motion.
                </li>
              </ul>
              <p>
                This pattern doesn't need more willpower. It needs scaffolding. Build it once and the drift mostly stops.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">What is the difference between passive and active procrastination?</h3>
                  <p>
                    Active procrastinators delay on purpose and still deliver. Passive procrastinators delay without a plan, feel overwhelmed, and miss deadlines. Chu and Choi (2005) showed the two look similar from the outside and feel completely different inside.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is passive procrastination a lack of discipline?</h3>
                  <p>
                    No. It's usually a planning and perception problem. People with this pattern underestimate how long tasks take, which is not a character flaw. It's a measurement error that can be fixed with better systems.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">What is the best system for passive procrastinators?</h3>
                  <p>
                    External structure. Break tasks into pieces, put every piece on a calendar, and make the first step of each task take under two minutes. Rely on the system, not on motivation.
                  </p>
                </div>
              </div>
            </section>

            <RelatedTypes current="passive" />

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
                  <BookLink
                    href={book.url}
                    type="passive"
                    placement="type-guide"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    Get the Book &middot; &euro;5
                  </BookLink>
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
