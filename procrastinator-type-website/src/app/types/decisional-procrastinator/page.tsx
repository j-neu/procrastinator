import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/decisional-procrastinator',
  title: 'Decisional Procrastination: When Choosing Feels Impossible',
  description:
    'You stall on the choice, not the work. What decisional procrastination is, why decision paralysis happens, and how to decide faster.',
  image: '/share-cards/decisional.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Decisional Procrastination: When Choosing Feels Impossible',
  description:
    'What decisional procrastination is, why the paralysis happens, and how to make decisions faster.',
  image: absoluteUrl('/share-cards/decisional.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-03',
  author: { '@type': 'Organization', name: 'Procrastitype' },
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/decisional-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is decisional procrastination just indecisiveness?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Indecisiveness is the trait. Decisional procrastination is what it becomes when the stakes feel high: you delay the whole task because it starts with a choice you refuse to make.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do small decisions feel impossible for decisional procrastinators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because the pattern is about the feeling of choosing, not the size of the choice. If the wrong pick feels like it could reflect on you, even a small menu choice can freeze you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make decisions without agonizing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set a deadline for the decision itself, limit the information you collect, and treat every choice as reversible unless it really is not. Most decisions can be undone.',
      },
    },
  ],
}

export default function DecisionalProcrastinatorPage() {
  const book = getPayhipBook('decisional')

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
              Decisional Procrastination: <br />
              <span className="italic text-osmo-muted">You're Not Stuck on the Work. You're Stuck on the Choice.</span>
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              The project is clear. The deadline is clear. The only unclear thing is which direction to take, so you keep gathering information, asking for opinions, waiting for a sign. The task never starts because the first step is a decision, and decisions feel like bets you can't afford to lose.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Decisional Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You start tasks only after the plan is perfect, and the plan is never perfect.</li>
                <li>You ask five people for opinions and feel more lost after each one.</li>
                <li>You keep researching long after you have enough information to act.</li>
                <li>You feel physical dread at the phrase "your call."</li>
                <li>You wait so long that the decision gets made for you, and you secretly feel relieved.</li>
              </ul>
              <p>
                The work isn't hard. That's the infuriating part. The work is a chain of choices, and you are a person who would rather not choose at all than choose wrong.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Paralysis</h2>
              <p>
                Decisional procrastination shows up in the same research stream as the other types, and Ferrari's work in 1991 treated it as a third pillar alongside arousal and avoidance. It connects to low confidence and to a belief that every choice is a referendum on you. Pick A, and if A is wrong, that's evidence. Not picking at all produces no evidence, and no evidence feels safer.
              </p>
              <p>
                Steel's 2007 meta-analysis adds the mechanical layer. The brain weighs immediate relief against delayed outcomes, and indecision offers instant relief from the discomfort of choosing. You feel the relief right now. You feel the cost later, as a deadline or an opportunity that quietly died.
              </p>
              <p>
                Perfectionism sneaks in here too. If you believe the perfect path exists, then deciding early feels like gambling, and gathering more data feels like responsibility. But there is no perfect path. There are only paths, and the time you spend hunting for the exception is the most expensive choice of all.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why Waiting for Certainty Fails</h2>
              <p>
                Certainty never comes. More information usually creates new options, and new options create new doubts. You think you're being careful. The pattern is using care as a disguise for delay.
              </p>
              <p>
                There's also the hidden cost nobody tallies: the energy you spend re-deciding the same question for days. That energy was never free. It just bills you in attention instead of money.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Decide when you'll decide.</strong>
                  Give the decision a deadline: "I will choose on Thursday at 10 AM." A decision about the decision breaks the endless loop and makes the choice a scheduled event instead of a hovering threat.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Cap your research.</strong>
                  Decide in advance how much information is enough. Two sources. One week. When the cap hits, you choose, no matter how unsure you feel.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Ask what a good-enough choice looks like.</strong>
                  Not the best choice. The choice you could defend in five minutes. If you can defend it, it's made.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Treat decisions as reversible.</strong>
                  Most choices can be changed, corrected, or abandoned. State the reversal cost out loud. If it's a few hours of work, the bet is cheap.
                </li>
              </ul>
              <p>
                Speed beats perfect. A decent decision made now beats a perfect decision made never.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is decisional procrastination just indecisiveness?</h3>
                  <p>
                    Indecisiveness is the trait. Decisional procrastination is what it becomes when the stakes feel high: you delay the whole task because it starts with a choice you refuse to make.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Why do small decisions feel impossible too?</h3>
                  <p>
                    Because the pattern is about the feeling of choosing, not the size of the choice. If the wrong pick feels like it could reflect on you, even a small menu choice can freeze you.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How do I make decisions without agonizing?</h3>
                  <p>
                    Set a deadline for the decision itself, limit the information you collect, and treat every choice as reversible unless it really is not. Most decisions can be undone.
                  </p>
                </div>
              </div>
            </section>

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
