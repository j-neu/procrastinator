import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Byline from '@/components/Byline'
import BookLink from '@/components/BookLink'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

const TITLE = 'Avoidant vs Perfectionist Procrastination: Where It Blocks'
const DESCRIPTION =
  'Both patterns are built on fear, and they block at opposite ends of the work. Avoidance stops you starting; perfectionism stops you finishing. How to tell which one you have, and why the fixes are opposites.'
const PATH = '/types/compare/avoidant-vs-perfectionist-procrastination'
const DATE_MODIFIED = '2026-08-17'

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: '/share-cards/avoidance.png',
  ogType: 'article',
})

/** Feeds both the visible table and the reader. Keep cells short. */
const rows = [
  { label: 'Where the delay blocks you', avoidant: 'At the start', perfectionist: 'At the finish' },
  { label: 'What your unfinished work looks like', avoidant: 'Blank pages, unopened files', perfectionist: 'Eleven versions of page one' },
  { label: 'The fear underneath', avoidant: 'Being judged for the result', perfectionist: 'Producing something short of the standard' },
  { label: 'What the delay protects', avoidant: 'You, from the discomfort now', perfectionist: 'The work, from being seen as flawed' },
  { label: 'Reaction to "just do a rough version"', avoidant: 'Relief', perfectionist: 'Resistance' },
  { label: 'Feeling about feedback', avoidant: 'Avoid it entirely', perfectionist: 'Want it, dread it, delay asking' },
  { label: 'Relationship to the task', avoidant: 'Easy once started', perfectionist: 'Never finished once started' },
  { label: 'Research anchor', avoidant: 'Ferrari (1991)', perfectionist: 'Hewitt and Flett (1991)' },
]

const faqs = [
  {
    question: 'What is the difference between avoidant and perfectionist procrastination?',
    answer:
      'Both are fear-driven, and they block at opposite ends of the work. Avoidant procrastination stops you starting, because beginning makes the possible judgment real. Perfectionist procrastination often lets you start and then stops you finishing, because releasing the work means the standard finally gets tested. Look at what your delay leaves behind. Avoidance leaves blank pages. Perfectionism leaves drafts.',
  },
  {
    question: 'Is perfectionism the cause of procrastination?',
    answer:
      'Less often than people assume. Steel’s 2007 meta-analysis found perfectionism a weak predictor of procrastination overall, which surprised a field that had treated the link as obvious. The resolution is that perfectionism is not one thing. Concern about falling short of other people’s expectations does track with procrastination. Holding yourself to a high personal standard, on its own, mostly does not, and can go with getting more done.',
  },
  {
    question: 'Can you be both avoidant and perfectionist?',
    answer:
      'Yes, and these two overlap more than most pairs in the seven-type model, because they run on the same fuel. The common shape is a perfectionist standard that makes starting feel dangerous, which then reads as avoidance. The Procrastitype assessment reports a secondary type and a confidence level so you can see when two patterns sit close together rather than being handed one label.',
  },
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  image: absoluteUrl('/share-cards/avoidance.png'),
  datePublished: '2026-08-17',
  dateModified: DATE_MODIFIED,
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl(PATH),
  about: [
    { '@type': 'Thing', name: 'Avoidant procrastination' },
    { '@type': 'Thing', name: 'Perfectionist procrastination' },
    { '@type': 'Thing', name: 'Perfectionism' },
  ],
  citation: [
    {
      '@type': 'ScholarlyArticle',
      name: 'Compulsive procrastination: Components and social-cognitive correlates',
      author: 'Ferrari, J. R.',
      datePublished: '1991',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'Perfectionism in the self and social contexts: Conceptualization, assessment, and association with psychopathology',
      author: 'Hewitt, P. L., & Flett, G. L.',
      datePublished: '1991',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'The nature of procrastination: A meta-analytic and theoretical review of quintessential self-regulatory failure',
      author: 'Steel, P.',
      datePublished: '2007',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'Procrastination and the priority of short-term mood regulation',
      author: 'Sirois, F., & Pychyl, T.',
      datePublished: '2013',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function AvoidantVsPerfectionistPage() {
  const avoidantBook = getPayhipBook('avoidant')
  const perfectionistBook = getPayhipBook('perfectionist')

  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <SiteHeader links={[{ href: '/types', label: 'Types' }]} />

      <main className="pt-40 pb-20">
        <article className="osmo-container max-w-3xl">
          <div className="mb-16">
            <Link
              href="/types"
              className="text-xs uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors mb-6 inline-block"
            >
              ← All Procrastination Types
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              Avoidant vs Perfectionist <br />
              <span className="italic text-osmo-muted">Procrastination</span>
            </h1>

            <Byline dateModified={DATE_MODIFIED} />

            {/* Definition first, hook second. Roughly 44% of AI citations come
                from the opening third of a page, and a page that opens on a
                hook gives them nothing to lift. */}
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              Avoidant procrastination is delay driven by fear of how the finished thing will be judged, and it stops
              you at the start, because beginning is what makes the judgment possible. Perfectionist procrastination is
              delay driven by the gap between the work and your standard, and it usually lets you start and then stops
              you finishing. Same fear underneath. Opposite ends of the task.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <blockquote className="not-prose border-l-4 border-osmo-neon-green pl-6 py-2 my-2">
                <p className="text-2xl md:text-3xl font-display font-light text-osmo-text leading-snug">
                  Look at what your delay leaves behind. Avoidance leaves blank pages. Perfectionism leaves eleven
                  versions of the first one.
                </p>
              </blockquote>
              <p className="mt-8">
                Everything else about these two patterns can look identical from outside. Both people miss the
                deadline. Both are described as lazy by someone who has never asked. Both know the accusation is wrong
                and cannot explain why in a way that survives being said out loud.
              </p>
              <p>
                The evidence that separates them is sitting in your folders right now.
              </p>
            </section>

            <section id="compare">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Side by Side</h2>
              <div className="not-prose overflow-x-auto rounded-2xl border border-osmo-border">
                <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Avoidant and perfectionist procrastination compared across where the delay blocks you, the fear
                    underneath, what the delay protects, and the research behind each.
                  </caption>
                  <thead>
                    <tr className="bg-osmo-surface">
                      <th scope="col" className="p-4 font-medium text-osmo-text" />
                      <th scope="col" className="p-4 font-medium text-osmo-text">Avoidant</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Perfectionist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-t border-osmo-border align-top">
                        <th scope="row" className="p-4 font-medium text-osmo-text">{row.label}</th>
                        <td className="p-4">{row.avoidant}</td>
                        <td className="p-4">{row.perfectionist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The Test: Where Does the Work Stop?
              </h2>
              <p>
                Open the projects you have not finished and look at how far each one got.
              </p>
              <p>
                Avoidance produces nothing to look at. The file was never opened, or it was opened and closed eleven
                times without a word added. The block sits before the first sentence, because the first sentence is the
                point where the thing becomes real enough to be judged. Nothing exists yet, so nothing can be wrong
                yet, and the relief of closing the file is immediate and total.
              </p>
              <p>
                Perfectionism produces a paper trail. There is a document, and it has a first paragraph that has been
                rewritten past the point of usefulness, and it has no second paragraph. Or there is a nearly finished
                project abandoned at ninety percent, which is where flaws stop being theoretical and become countable.
                You did the work. You would not release it.
              </p>
              <p>
                A second version of the test: imagine someone tells you to do a deliberately bad version, right now, in
                twenty minutes, that nobody will read. If that instruction lands as relief, the pattern is avoidance
                and the permission is what you needed. If it lands as resistance, and some part of you objects that a
                bad version is worse than nothing, that objection is the perfectionist pattern speaking, and it is the
                thing to work on.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                How Avoidant Procrastination Feels From the Inside
              </h2>
              <p>
                There is a knot that arrives the moment you think about starting, and it goes away the moment you
                decide not to.
              </p>
              <p>
                That trade is the whole mechanism. The task predicts discomfort, avoiding the task removes the
                discomfort instantly, and instant beats important every time. You are not running from the work. Most
                of the time the work turns out to be easy once you are in it, which is the detail that makes the
                pattern so confusing to live with. You are running from the twenty seconds before.
              </p>
              <p>
                What people outside miss is that the fear does not shrink while you wait. It compounds. Every day of
                delay adds a layer of guilt on top of the original fear, so the task you avoid on Friday is heavier
                than the one you avoided on Monday, and starting costs more than it did before you started avoiding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                How Perfectionist Procrastination Feels From the Inside
              </h2>
              <p>
                You care more than almost anyone in the room, and you finish less.
              </p>
              <p>
                That contradiction is the pattern in one line. The standards are not the problem by themselves. They
                become the problem the moment an unfinished thing starts feeling safer than a finished one, because
                while the work is still in progress it could still turn out to be excellent. Releasing it collapses
                that possibility into a single result, and the result gets attached to you.
              </p>
              <p>
                So the polish never ends, and the polish feels like diligence rather than delay, which is the reason
                this pattern goes unrecognised for years. Nobody thinks they are procrastinating while working. The
                give-away is what the work is for. Editing to improve something is progress. Editing so you do not yet
                have to hand it over is avoidance wearing a good suit.
              </p>
              <p>
                There is a quieter cost too. The unfinished project follows you into everything else, taking attention
                the whole time it sits there. You are not resting during the delay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Does Perfectionism Actually Cause Procrastination?
              </h2>
              <p>
                Less than almost everyone assumes, and this is the part most articles on the subject get wrong.
              </p>
              <p>
                Steel's 2007 meta-analysis, which pooled hundreds of correlations, found perfectionism to be a weak
                predictor of procrastination. For a field that had treated the connection as self-evident, that was an
                uncomfortable result, and it is still not widely known outside the literature.
              </p>
              <p>
                The resolution most researchers point to comes from Paul Hewitt and Gordon Flett, whose 1991 model
                splits perfectionism into more than one thing. Concern about falling short of what other people expect
                behaves nothing like holding yourself to a high personal standard. The first tracks with
                procrastination. The second, on its own, often goes with getting more done, not less.
              </p>
              <p>
                What follows from that is worth sitting with. If your standards are genuinely your own, they are
                probably not what is stopping you, and lowering them is the wrong repair. If the standard is really a
                prediction about how you will be seen when you fall short of it, then the problem was never the
                standard. It was the audience you installed behind it.
              </p>
              <p>
                Sirois and Pychyl's 2013 work joins the two patterns at the root. Procrastination is short-term mood
                repair. Avoidance repairs the mood by removing the task from view. Perfectionism repairs it by keeping
                the verdict permanently pending. Different method, same purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Why the Fixes Point in Opposite Directions
              </h2>
              <p>
                Avoidance responds to reducing the cost of starting. Shrink the first step until it is too small to
                trigger anything: open the document, write the heading, sit in the chair. What you are collecting is
                evidence that beginning is survivable, and the evidence only accumulates through repetition.
              </p>
              <p>
                Perfectionism responds to the opposite move, which is reducing the cost of stopping. Decide what done
                looks like before you begin and write it down. Give the final pass a deadline measured in hours.
                Release something you are not entirely happy with and watch how little happens, then do it again.
              </p>
              <p>
                Apply the wrong one and you make things worse rather than sideways. Tiny first steps handed to a
                perfectionist become tiny opportunities to polish, and the work still never ships. A "define done and
                stop" rule handed to someone avoidant is a rule about a finish line they have not reached, and it adds
                a second thing to feel bad about.
              </p>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Which One Are You?</h2>
              <p className="mb-6">
                These two share a root, so most people recognise themselves in both columns and then pick the more
                flattering label. The free assessment measures all seven patterns, takes about five minutes, and
                reports your primary type, your secondary type, and how confident the result is.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-osmo-neon-green text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                Take the Assessment
              </Link>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                If Neither Column Fits
              </h2>
              <p>
                Both of these patterns assume fear is the engine. If the delay is about timing, or about not being able
                to choose at all, the answer is somewhere else.
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-osmo-neon-green">
                <li>
                  <Link href="/types/avoidant-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    The avoidant procrastinator guide
                  </Link>{' '}
                  goes deeper on naming the specific fear.
                </li>
                <li>
                  <Link href="/types/perfectionist-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    The perfectionist procrastinator guide
                  </Link>{' '}
                  covers shipping as a skill you can practise.
                </li>
                <li>
                  <Link href="/types/decisional-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    Decisional procrastination
                  </Link>{' '}
                  is the neighbour to check if you stall on choosing rather than on doing.
                </li>
                <li>
                  <Link href="/types/compare/active-vs-passive-procrastination" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    Active vs passive procrastination
                  </Link>{' '}
                  is the comparison to read if your delay is about timing rather than fear.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-medium text-osmo-text mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Go Deeper</h2>
              <p className="mb-6">
                Each pattern has its own book, written to take the belief underneath it apart rather than to hand you
                another system to keep up with. Five euros each.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {avoidantBook && (
                  <BookLink
                    href={avoidantBook.url}
                    type="avoidant"
                    placement="compare-page"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    The Avoidance Book
                  </BookLink>
                )}
                {perfectionistBook && (
                  <BookLink
                    href={perfectionistBook.url}
                    type="perfectionist"
                    placement="compare-page"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    The Perfectionist Book
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
