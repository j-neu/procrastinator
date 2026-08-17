import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RelatedTypes from '@/components/RelatedTypes'
import Byline from '@/components/Byline'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/active-procrastinator',
  title: 'Active Procrastination: Strategic Delay or a Story You Tell Yourself?',
  description:
    'You delay on purpose and it works out. Or does it? What active procrastination is, when the strategy is real, and when it\u2019s a costume for avoidance.',
  image: '/share-cards/active.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Active Procrastination: Strategic Delay or a Story You Tell Yourself?',
  description:
    'What active procrastination is, when the strategy is real, and when it is a costume for avoidance.',
  image: absoluteUrl('/share-cards/active.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-17',
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/active-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is active procrastination a real strategy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chu and Choi (2005) showed that some delay is intentional and produces good outcomes. The person feels in control and delivers. That is active procrastination, and it can be a real, workable strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my delay is strategic or just procrastination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ask two questions. Do you feel in control of the timing? And does the outcome stay good when you delay? If you feel anxious and outcomes suffer, the delay is a story, not a strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can active procrastination become harmful?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The pattern sits close to arousal procrastination in the research, and the line moves. A delay that works at low stakes can stop working under real pressure, and the strategy becomes a habit you can no longer inspect.',
      },
    },
  ],
}

export default function ActiveProcrastinatorPage() {
  const book = getPayhipBook('active')

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
              Active Procrastination: <br />
              <span className="italic text-osmo-muted">Strategic Delay, or a Story You Tell Yourself?</span>
            </h1>

            <Byline dateModified="2026-08-17" />
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              You tell people you work best under pressure, and honestly, the evidence agrees. You've aced exams started the night before. You've delivered projects that began in a panic. The delay feels less like a flaw and more like a tool. So is it a problem? The honest answer: sometimes yes.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Active Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You delay on purpose, and you can usually explain why.</li>
                <li>You feel in control of the timing, not haunted by it.</li>
                <li>Your outcomes stay good enough that nobody complains.</li>
                <li>You have a strong internal sense of how much time a task needs.</li>
                <li>You genuinely enjoy the focus that a tight deadline produces.</li>
              </ul>
              <p>
                The line between this and other patterns is drawn by two things: control and results. Delaying on purpose while feeling calm and delivering well is the active pattern. Delaying and feeling anxious while the quality slips is something else wearing its clothes.
              </p>
              <p>
                That other thing has a name, and the two get mistaken for each other constantly. See{' '}
                <Link
                  href="/types/compare/active-vs-passive-procrastination"
                  className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                >
                  active vs passive procrastination
                </Link>{' '}
                for the full comparison.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Strategy</h2>
              <p>
                Chu and Choi introduced active procrastination in 2005, and it was a small revolution. Until then, procrastination was treated as pure dysfunction. Their data showed a group that delayed intentionally, felt low stress, and performed as well as non-procrastinators. The delay was not self-sabotage. It was time management with a higher heart rate.
              </p>
              <p>
                The catch comes from the type correlation research. Active procrastination overlaps heavily with arousal procrastination, where the delay is driven by stimulation-seeking, and the research puts the link around 0.6. Most people who identify with one show signs of the other. The strategy and the compulsion live close together.
              </p>
              <p>
                So the real question is not "is delay bad?" It's "who is driving: you or the rush?" When you decide the timing, you're active. When the timing decides you, you're in another pattern entirely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why the Strategy Can Fail</h2>
              <p>
                A delay that works at low stakes is a habit, and habits stop asking permission. The exam you can ace in one night becomes the thesis you can't write in one night, but the habit doesn't know the difference.
              </p>
              <p>
                There's a subtler cost too. Strategy needs inspection. The moment you stop asking "am I in control here?" the delay starts making decisions for you, and you won't notice until an outcome finally cracks. The strategy is only a strategy while you're still the one running it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Keep the strategy, audit the risk.</strong>
                  You don't need to stop delaying. You need a rule about which tasks are allowed to be delayed. Small and reversible: fine. Large and public: no.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Check in with yourself.</strong>
                  Once a week, ask: did I choose this timing, or did I discover it? If you keep discovering, the pattern has taken the wheel.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Prove you can do it early.</strong>
                  Pick one recurring task and finish it ahead of schedule, on purpose, and watch the result. You're testing whether the delay is fuel or a crutch.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Name the stakes out loud.</strong>
                  Before you delay something big, say what happens if the timing estimate is wrong. If the answer is "real damage," start now instead.
                </li>
              </ul>
              <p>
                You have a real advantage: you can deliver under pressure. The work is to make sure you deliver because you choose to, not because you were left no choice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is active procrastination a real strategy?</h3>
                  <p>
                    Chu and Choi (2005) showed that some delay is intentional and produces good outcomes. The person feels in control and delivers. That is active procrastination, and it can be a real, workable strategy.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How do I know if my delay is strategic or just procrastination?</h3>
                  <p>
                    Ask two questions. Do you feel in control of the timing? And does the outcome stay good when you delay? If you feel anxious and outcomes suffer, the delay is a story, not a strategy.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Can active procrastination become harmful?</h3>
                  <p>
                    Yes. The pattern sits close to arousal procrastination in the research, and the line moves. A delay that works at low stakes can stop working under real pressure, and the strategy becomes a habit you can no longer inspect.
                  </p>
                </div>
              </div>
            </section>

            <RelatedTypes current="active" />

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
