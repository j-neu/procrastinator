import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

import { absoluteUrl, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types',
  title: 'The 7 Types of Procrastination: Which One Are You?',
  description:
    'Arousal, avoidant, decisional, passive, active, emotion-regulation and perfectionist. The research-backed guide to every procrastination pattern, with signs and what actually works for each.',
})

/**
 * The 7 types.
 *
 * `driver` / `moment` / `tell` / `research` feed the comparison table. Nothing in
 * the competitive set publishes a canonical multi-type chart (the frameworks in
 * circulation fragment at 3, 5 and 6 types), and a table is the format AI answers
 * reproduce wholesale, so this is the most liftable asset on the site. Keep the
 * cells short: they are read across a row, not as prose.
 */
const types = [
  {
    slug: 'arousal-procrastinator',
    name: 'Arousal Procrastinator',
    tagline: 'You wait until the last minute because you need the rush to feel anything.',
    text: 'You don\u2019t procrastinate because the task scares you. You procrastinate because calm work feels like death by boredom. The deadline is your engine.',
    driver: 'Craves pressure',
    moment: 'Early, while waiting for the charge',
    tell: 'Working early feels boring',
    research: 'Ferrari (1991)',
  },
  {
    slug: 'avoidant-procrastinator',
    name: 'Avoidant Procrastinator',
    tagline: 'You delay to dodge the fear of judgment, failure, or success.',
    text: 'The task triggers something uncomfortable, so your brain steers you away. You don\u2019t avoid the work. You avoid the feeling the work brings.',
    driver: 'Fear of judgment',
    moment: 'The instant the task could expose you',
    tell: 'You tidy instead of starting',
    research: 'Ferrari (1991)',
  },
  {
    slug: 'decisional-procrastinator',
    name: 'Decisional Procrastinator',
    tagline: 'You can\u2019t choose, so you choose nothing and lose both options.',
    text: 'Every decision feels like a bet with your future. Pick A and you lose B. So you stall, collect more information, and stall again.',
    driver: 'Cannot commit to a choice',
    moment: 'Before any work begins',
    tell: 'You research options for hours',
    research: 'Ferrari (1991)',
  },
  {
    slug: 'perfectionist-procrastinator',
    name: 'Perfectionist Procrastinator',
    tagline: 'Your standards are so high that starting feels pointless.',
    text: 'If it can\u2019t be flawless, why start? Because anything imperfect feels like proof you\u2019re not good enough, and not starting feels safer.',
    driver: 'Impossibly high standards',
    moment: 'At starting, then again at finishing',
    tell: 'Nothing ever feels ready to send',
    research: 'Maladaptive perfectionism',
  },
  {
    slug: 'passive-procrastinator',
    name: 'Passive Procrastinator',
    tagline: 'You don\u2019t mean to delay. It just keeps happening.',
    text: 'No strategy, no thrill, no fear story. Just disorganization, poor time perception, and a constant feeling of being behind.',
    driver: 'Disorganization, weak time sense',
    moment: 'Continuously, without deciding to',
    tell: 'The deadline surprises you',
    research: 'Chu and Choi (2005)',
  },
  {
    slug: 'active-procrastinator',
    name: 'Active Procrastinator',
    tagline: 'You delay on purpose and tell yourself it\u2019s strategy.',
    text: 'You work best under pressure, and you know it. The question is whether the delay is a choice or a story you tell after the fact.',
    driver: 'Strategic timing',
    moment: 'By choice, with the deadline mapped',
    tell: 'You delay and still deliver',
    research: 'Chu and Choi (2005)',
  },
  {
    slug: 'emotion-regulation-procrastinator',
    name: 'Emotion-Regulation Procrastinator',
    tagline: 'Your to-do list loses to your mood, every single time.',
    text: '"I don\u2019t feel like it" is your operating system. The task stays undone while you wait for a feeling that never arrives.',
    driver: 'Escaping a bad feeling now',
    moment: 'When the task triggers discomfort',
    tell: 'Quitting brings instant relief',
    research: 'Sirois and Pychyl (2013)',
  },
]

const pillarFaqs = [
  {
    question: 'Is procrastination the same for everyone?',
    answer:
      'No. Research going back to Joseph Ferrari (1991) shows distinct patterns with different psychological drivers. What fixes one type can make another type worse, which is why knowing your type matters.',
  },
  {
    question: 'Can you be more than one procrastination type?',
    answer:
      'Most people have a primary pattern and a secondary one. Arousal and active patterns overlap, and so do avoidant and perfectionist patterns. The free Procrastitype assessment identifies both.',
  },
  {
    question: 'Are these procrastination types backed by research?',
    answer:
      'Yes. The framework builds on Ferrari (1991), Chu and Choi (2005), Steel (2007), and Sirois and Pychyl (2013). The quiz uses 35 behavioral questions with research-based scoring.',
  },
]

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The 7 Types of Procrastination',
  itemListElement: types.map((type, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: type.name,
    url: absoluteUrl(`/types/${type.slug}`),
  })),
}

/**
 * Describes the 7 types as a named vocabulary, which fits the comparison table
 * better than ItemList alone. Runs alongside the ItemList above rather than
 * replacing it.
 */
const definedTermSetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'The 7 Procrastination Types',
  description:
    'A seven-type model of procrastination drawn from Ferrari (1991), Chu and Choi (2005), Steel (2007), and Sirois and Pychyl (2013).',
  url: absoluteUrl('/types'),
  hasDefinedTerm: types.map((type) => ({
    '@type': 'DefinedTerm',
    name: type.name,
    description: type.tagline,
    url: absoluteUrl(`/types/${type.slug}`),
    inDefinedTermSet: absoluteUrl('/types'),
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pillarFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function TypesPillarPage() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <SiteHeader links={[{ href: '#the-types', label: 'The 7 Types' }]} />

      <main className="pt-40 pb-20">
        <article className="osmo-container max-w-3xl">
          <div className="mb-16">
            <span className="px-3 py-1 bg-osmo-neon-green text-black text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
              Procrastination Types
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              The 7 Types of Procrastination
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              You are not lazy. You are running a specific pattern, and every pattern has a different engine. Find yours.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <p>
                Here is the sentence you have probably never heard: procrastination is not one problem. It is seven.
              </p>
              <p>
                For decades, psychologists treated it as a single failure of self-discipline. Then the research split it open. Joseph Ferrari at DePaul University showed in 1991 that some procrastinators avoid tasks out of fear while others delay for the thrill of the rush. Chu and Choi showed in 2005 that some delay is deliberate, works out fine, and is barely procrastination at all. Steel's 2007 meta-analysis in Psychological Bulletin tied it all to impulsiveness and task aversion.
              </p>
              <p>
                Put the pieces together and you get seven recognizable patterns. Each one feels different on the inside. Each one needs a different fix. Which is exactly why generic advice like "just start" works for nobody.
              </p>
            </section>

            <section id="compare">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The 7 Types at a Glance</h2>
              <p className="mb-6">
                Every type delays. What separates them is the engine underneath, the moment the delay hits, and what it costs you.
              </p>
              {/* overflow-x on the wrapper, never on the body: the page itself must
                  not scroll sideways on mobile. */}
              <div className="not-prose overflow-x-auto rounded-2xl border border-osmo-border">
                <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    The seven procrastination types compared by core driver, when the delay happens, the telltale sign, and the research behind each.
                  </caption>
                  <thead>
                    <tr className="bg-osmo-surface">
                      <th scope="col" className="p-4 font-medium text-osmo-text">Type</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Core driver</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">When it hits</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Telltale sign</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Research anchor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {types.map((type) => (
                      <tr key={type.slug} className="border-t border-osmo-border align-top">
                        <th scope="row" className="p-4 font-medium">
                          <Link
                            href={`/types/${type.slug}`}
                            className="text-osmo-neon-green hover:text-osmo-text transition-colors"
                          >
                            {type.name.replace(' Procrastinator', '')}
                          </Link>
                        </th>
                        <td className="p-4">{type.driver}</td>
                        <td className="p-4">{type.moment}</td>
                        <td className="p-4">{type.tell}</td>
                        <td className="p-4 whitespace-nowrap">{type.research}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6">
                Recognizing yourself in a row is a start. If two rows feel equally true, that is normal and the assessment below will tell you which one leads.
              </p>
            </section>

            <section id="the-types">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The 7 Procrastination Types</h2>
              <div className="space-y-8">
                {types.map((type) => (
                  <div key={type.slug} className="border-l-2 border-osmo-neon-green pl-6">
                    <h3 className="text-xl font-display font-medium text-osmo-text mb-2">
                      {type.name}
                    </h3>
                    <p className="italic text-osmo-muted mb-2">{type.tagline}</p>
                    <p className="mb-3">{type.text}</p>
                    <Link
                      href={`/types/${type.slug}`}
                      className="text-sm font-bold uppercase tracking-widest text-osmo-neon-green hover:text-osmo-text transition-colors"
                    >
                      Read the full guide
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">How the Science Classifies Procrastinators</h2>
              <p>
                Three research streams built this framework. Ferrari (1991) gave us the avoidant and arousal distinction, the oldest and most cited split in the field. Chu and Choi (2005) added the active versus passive divide, showing that some delay is intentional and even adaptive. Steel (2007) and Sirois and Pychyl (2013) added the emotional layer, showing that procrastination is often mood regulation: you delay to feel better right now, even when it costs you later.
              </p>
              <p>
                None of these types is a box. Most people carry a primary pattern and a secondary one, and the patterns overlap in predictable ways. That's why a good assessment measures all seven and reports a profile, not a verdict.
              </p>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Which One Are You?</h2>
              <p className="mb-6">
                Reading the descriptions helps. Measuring beats guessing. The free assessment takes about five minutes, uses 35 behavioral questions, and tells you your primary type, your secondary type, and how confident the result is.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 text-osmo-neon-green hover:text-osmo-text transition-colors font-bold uppercase tracking-widest text-sm"
              >
                Take the Assessment <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {pillarFaqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-medium text-osmo-text mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
