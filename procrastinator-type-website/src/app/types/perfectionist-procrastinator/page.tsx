import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RelatedTypes from '@/components/RelatedTypes'
import Byline from '@/components/Byline'
import BookLink from '@/components/BookLink'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/perfectionist-procrastinator',
  title: 'Perfectionist Procrastination: When "Perfect" Blocks Everything',
  description:
    'You delay because anything less than flawless feels like failure. What perfectionist procrastination is, the science of it, and how to start anyway.',
  image: '/share-cards/perfectionist.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Perfectionist Procrastination: When "Perfect" Blocks Everything',
  description:
    'What perfectionist procrastination is, why impossible standards freeze you, and how to start anyway.',
  image: absoluteUrl('/share-cards/perfectionist.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-17',
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/perfectionist-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is perfectionist procrastination the same as having high standards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. High standards push you to finish well. Perfectionist procrastination uses impossible standards as a reason not to start. The standard is not the goal. It is the escape route.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does perfectionism cause procrastination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your work must be flawless, then any draft is a failure, and starting creates a risk of failure. Not starting produces no evidence against you, so the brain chooses the safer option.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start when nothing I make feels good enough?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Make the first version deliberately bad. A draft is material, not a verdict. You cannot edit a page you never wrote, and you cannot fix a blank screen.',
      },
    },
  ],
}

export default function PerfectionistProcrastinatorPage() {
  const book = getPayhipBook('perfectionist')

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
              Perfectionist Procrastination: <br />
              <span className="italic text-osmo-muted">"Perfect" Is the Most Expensive Word You Know</span>
            </h1>

            <Byline dateModified="2026-08-17" />
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              You've been planning this project for months. The research is done, the folder is labeled, the vision is clear. And the document is still empty, because what you imagine is flawless and what you could actually type tonight is not. So you wait for a version of you that doesn't exist yet.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Perfectionist Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You rewrite the first paragraph for an hour and never reach the second.</li>
                <li>You delay submitting anything until it feels finished, and it never does.</li>
                <li>You delete work that is merely good because it isn't great.</li>
                <li>You abandon projects close to the end, where flaws become visible.</li>
                <li>You avoid feedback because you suspect it will confirm your worst fear.</li>
              </ul>
              <p>
                Here's the contradiction that defines the pattern: you care more than anyone, and you produce less than anyone. The standards aren't the problem in themselves. They become the problem when they turn into a reason not to start.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Paralysis</h2>
              <p>
                Perfectionism shows up across the procrastination research, and Ferrari's 1991 work caught it early: the avoidant pattern is often powered by the fear of imperfect outcomes. The mechanism is simple. If your worth is tied to flawless work, then a flawed attempt is a threat to your worth. Your brain treats the draft like a predator and tells you to wait for safety.
              </p>
              <p>
                Steel's 2007 meta-analysis frames it as task aversion. The task isn't a report. It's a mirror, and you're afraid of the reflection. Every failed start feels like confirmation, so you stop starting.
              </p>
              <p>
                The overlap with avoidance is close enough that people regularly pick the wrong one.{' '}
                <Link
                  href="/types/compare/avoidant-vs-perfectionist-procrastination"
                  className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                >
                  Avoidant vs perfectionist procrastination
                </Link>{' '}
                splits them by where the work stops, and covers why the research on perfectionism as a cause is weaker
                than most articles admit.
              </p>
              <p>
                The maddening part is that perfectionism rarely produces perfection. It produces unfinished work. The best work you've ever seen was probably made by someone who shipped a version they hated, then fixed it in public. Shipping is a skill. Hiding is not.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why Waiting Until It's Ready Fails</h2>
              <p>
                "Ready" is not a state. It's a feeling, and the feeling never arrives while the work is unfinished. You are waiting for a condition that can only exist after you act, which means the waiting is permanent by design.
              </p>
              <p>
                There's a quieter cost too. The unfinished project follows you everywhere, draining attention while you do everything else. You're not relaxing during the delay. You're hiding from a mirror that follows you around.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Make it deliberately bad.</strong>
                  Write the ugly first draft. Paint the wrong color first. The goal is material, not merit. You cannot edit a blank page.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Set a "good enough" bar in advance.</strong>
                  Write down what done looks like before you start: "done is 800 words and a conclusion." Meet the bar. Stop there.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Timebox the polish.</strong>
                  Give the final pass a deadline. One hour, not one week. Perfection eats unlimited time because it has no finish line. Give it one.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Ship something and watch the world not end.</strong>
                  The fear predicts catastrophe. Reality delivers a shrug. Collect the evidence.
                </li>
              </ul>
              <p>
                Done beats perfect. Perfect has never shipped a thing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is perfectionist procrastination the same as having high standards?</h3>
                  <p>
                    No. High standards push you to finish well. Perfectionist procrastination uses impossible standards as a reason not to start. The standard is not the goal. It's the escape route.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Why does perfectionism cause procrastination?</h3>
                  <p>
                    If your work must be flawless, then any draft is a failure, and starting creates a risk of failure. Not starting produces no evidence against you, so the brain chooses the safer option.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How do I start when nothing I make feels good enough?</h3>
                  <p>
                    Make the first version deliberately bad. A draft is material, not a verdict. You cannot edit a page you never wrote, and you cannot fix a blank screen.
                  </p>
                </div>
              </div>
            </section>

            <RelatedTypes current="perfectionist" />

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
                    type="perfectionist"
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
