import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Byline from '@/components/Byline'
import BookLink from '@/components/BookLink'
import { getPayhipBook, BOOK_PRICE_LABEL } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

const TITLE = 'Arousal vs Active Procrastination: Rush or Judgment?'
const DESCRIPTION =
  'Both delay until the deadline and both often deliver. Arousal procrastination is driven by appetite for the rush; active procrastination is driven by judgment about timing. How to tell which one is yours.'
const PATH = '/types/compare/arousal-vs-active-procrastination'
const DATE_MODIFIED = '2026-08-17'

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  image: '/share-cards/arousal.png',
  ogType: 'article',
})

/** Feeds both the visible table and the reader. Keep cells short. */
const rows = [
  { label: 'What drives the delay', arousal: 'Appetite for stimulation', active: 'A judgment about timing' },
  { label: 'Does calm early work feel possible?', arousal: 'No, it feels flat', active: 'Yes, just less efficient' },
  { label: 'Self-set deadlines', arousal: 'Never hold', active: 'Usually hold' },
  { label: 'During the wait', arousal: 'Restless and bored', active: 'Neutral, the task is parked' },
  { label: 'When the pressure lands', arousal: 'A physical lift', active: 'Focus sharpens' },
  { label: 'If the deadline moved a week later', arousal: 'You would wait the week', active: 'You would replan' },
  { label: 'Sense of control', arousal: 'Compulsive', active: 'Chosen' },
  { label: 'Research anchor', arousal: 'Ferrari (1991)', active: 'Chu and Choi (2005)' },
]

const faqs = [
  {
    question: 'What is the difference between arousal and active procrastination?',
    answer:
      'Arousal procrastination is delay driven by appetite for the last-minute rush. Calm early work feels flat, so you wait for the pressure that makes the task interesting. Active procrastination is delay driven by judgment. You have measured how you work, decided later produces better output, and the timing is a decision you could reverse. Both end at the same midnight. Only one of them was decided.',
  },
  {
    question: 'Can you be both an arousal and an active procrastinator?',
    answer:
      'These two overlap more than any other pair in the seven-type model, so yes, and it is common. The usual shape is a genuine judgment about timing that a taste for the rush has quietly taken over. The Procrastitype assessment reports a secondary type and a confidence level for exactly this reason.',
  },
  {
    question: 'Is it true that some people work best under pressure?',
    answer:
      'For active procrastinators there is evidence behind the claim. Chu and Choi (2005) found people who delayed deliberately performed comparably to people who did not delay at all. For arousal procrastinators the sentence is usually backwards. The pressure does not add ability. It removes the boredom that was blocking ability you already had.',
  },
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  image: absoluteUrl('/share-cards/arousal.png'),
  datePublished: '2026-08-17',
  dateModified: DATE_MODIFIED,
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl(PATH),
  about: [
    { '@type': 'Thing', name: 'Arousal procrastination' },
    { '@type': 'Thing', name: 'Active procrastination' },
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
      name: 'Rethinking procrastination: Positive effects of active procrastination behavior on attitudes and performance',
      author: 'Chu, A. H. C., & Choi, J. N.',
      datePublished: '2005',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'The nature of procrastination: A meta-analytic and theoretical review of quintessential self-regulatory failure',
      author: 'Steel, P.',
      datePublished: '2007',
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

export default function ArousalVsActivePage() {
  const arousalBook = getPayhipBook('arousal')
  const activeBook = getPayhipBook('active')

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
              Arousal vs Active <br />
              <span className="italic text-osmo-muted">Procrastination</span>
            </h1>

            <Byline dateModified={DATE_MODIFIED} />

            {/* Definition first, hook second. Roughly 44% of AI citations come
                from the opening third of a page, and a page that opens on a
                hook gives them nothing to lift. */}
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              Arousal procrastination is delay driven by appetite for the last-minute rush: calm early work feels flat,
              so you wait for the pressure that makes the task interesting. Active procrastination is delay driven by
              judgment: you have measured how you work, decided later produces better output, and the timing is a
              decision you could reverse. Both end at the same midnight. Only one of them was decided.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <blockquote className="not-prose border-l-4 border-osmo-neon-green pl-6 py-2 my-2">
                <p className="text-2xl md:text-3xl font-display font-light text-osmo-text leading-snug">
                  Ask what you do when there is no deadline at all. The active procrastinator starts. The arousal
                  procrastinator waits for one to exist.
                </p>
              </blockquote>
              <p className="mt-8">
                This is the hardest pair on the site to tell apart, and the reason is that they share a sentence. Both
                types say "I work best under pressure," both say it with evidence, and both are usually the person in
                the room who did deliver. Watching them from outside tells you almost nothing.
              </p>
              <p>
                The split is not in the behaviour. It is in what the delay is for.
              </p>
            </section>

            <section id="compare">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Side by Side</h2>
              <div className="not-prose overflow-x-auto rounded-2xl border border-osmo-border">
                <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Arousal and active procrastination compared across what drives the delay, how the wait feels,
                    whether self-set deadlines hold, and the research behind each.
                  </caption>
                  <thead>
                    <tr className="bg-osmo-surface">
                      <th scope="col" className="p-4 font-medium text-osmo-text" />
                      <th scope="col" className="p-4 font-medium text-osmo-text">Arousal</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-t border-osmo-border align-top">
                        <th scope="row" className="p-4 font-medium text-osmo-text">{row.label}</th>
                        <td className="p-4">{row.arousal}</td>
                        <td className="p-4">{row.active}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The Question That Actually Separates Them
              </h2>
              <p>
                Take away the deadline and watch what happens.
              </p>
              <p>
                Give an active procrastinator a task with no fixed date and they will pick one. The delay was a
                judgment about when the work would go best, and a judgment survives the absence of pressure. They may
                still start late by anyone else's standard. They will start.
              </p>
              <p>
                Give an arousal procrastinator the same task and it can sit for months. Without a deadline there is no
                pressure, without pressure there is no charge, and without the charge the task is unreadable. It is not
                that they decided to leave it. Nothing was ever decided. The task simply never became interesting
                enough to enter the day.
              </p>
              <p>
                A second version of the test works if every task you have does come with a date. Imagine the deadline
                moves a week later. The active procrastinator replans and starts a week later. The arousal
                procrastinator loses the week. If your answer to a delayed deadline is relief followed by another
                seven days of nothing, the rush is running the schedule.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                How Arousal Procrastination Feels From the Inside
              </h2>
              <p>
                Boredom is not a mild feeling for you. It is closer to physical discomfort.
              </p>
              <p>
                You open the document on Tuesday and something in your head goes flat. The work is not hard. You could
                describe exactly what needs doing. It just has no charge, and a task with no charge slides off you no
                matter how many times you sit down with it. So you close the file, and the day fills with things that
                do have a pulse.
              </p>
              <p>
                Then Thursday at eleven, the pressure arrives and everything changes. You can feel your heartbeat. The
                distractions stop mattering. Four hours later there is a finished piece of work and a feeling that is
                genuinely close to a high, and somewhere underneath it a small voice saying you should never have let
                it get this close again.
              </p>
              <p>
                That voice is the tell. Active procrastinators do not have it. When the delay is a decision, finishing
                brings satisfaction with nothing attached. When the delay is an appetite, finishing brings the rush and
                the promise, and the promise never holds because the appetite is still there on Monday.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                How Active Procrastination Feels From the Inside
              </h2>
              <p>
                There is no charge to wait for, because you are not waiting for anything. You are working to an
                estimate.
              </p>
              <p>
                You know roughly what the task costs, because you have measured yourself against similar work before.
                Starting on Thursday is not thrill-seeking. It is a scheduling call, made with the same part of you
                that decides when to leave for the airport. The days in between are not spent circling the task. They
                are spent on other things, and the task is parked rather than avoided.
              </p>
              <p>
                People who watch you cut it fine tend to assume you are anxious about it. Mostly you are not. The
                calmness is the strongest single signal that this is the active pattern rather than the arousal one,
                and it is the part that people who use the label loosely almost never have.
              </p>
              <p>
                The risk here is different. A delay that works at low stakes hardens into a habit, and a habit stops
                checking whether the stakes have changed. The essay you can rescue in one night is not the
                dissertation, but the pattern does not know that.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Why These Two Get Confused
              </h2>
              <p>
                Of all the pairs in the seven-type model, this is the one the assessment treats as most overlapping.
                The scoring behind{' '}
                <Link href="/quiz" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                  the Procrastitype quiz
                </Link>{' '}
                carries an arousal-to-active link of 0.6, higher than any other pairing it models. You can read what
                the assessment is built on over on the{' '}
                <Link href="/research" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                  research page
                </Link>
                .
              </p>
              <p>
                Some of that overlap is real and some of it is a story. The story is that active procrastination is the
                flattering label, so people reach for it. Saying "I made a strategic call about timing" is a better
                sentence than "I could not make myself care until it was nearly too late," and the two produce the same
                visible result often enough that nobody outside can check which one you said.
              </p>
              <p>
                The overlap also runs the other way in a way worth naming. A pattern can begin as genuine judgment and
                be colonised by the appetite later. You were right about your timing for years, the rush came along for
                the ride, and at some point the rush started choosing. Nothing about the outside changed, which is what
                makes it so easy to miss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The Research Behind the Split
              </h2>
              <p>
                Joseph Ferrari described the arousal pattern at DePaul University in 1991, working on what he called
                compulsive procrastination. The finding that mattered was that not all delay is fear-driven. Some
                people delay because they are chasing the sensation of the last-minute finish, a group the literature
                sometimes calls thrill-seekers or crisis-makers. The task is not the enemy in that pattern. The
                adrenaline is the point.
              </p>
              <p>
                Active procrastination arrived fourteen years later, when Angela Chu and Jin Nam Choi asked whether any
                delay might be intentional. Their 2005 data found a group who delayed on purpose, reported a stronger
                sense of control over their time, and performed comparably to people who did not delay at all.
              </p>
              <p>
                Steel's 2007 meta-analysis explains why the arousal version is the costly one. It ties procrastination
                to impulsiveness and to a failure of self-regulation, and impulsiveness is exactly what the arousal
                pattern is made of, pointed at stimulation rather than at any particular reward. A spreadsheet offers
                nothing to an impulsive system. A midnight deadline offers everything.
              </p>
              <p>
                Worth stating plainly: the claim that pressure improves performance is much weaker than the people who
                repeat it believe. What the pressure reliably does is make the task finally worth attending to. The
                ability was always available. The boredom was the block.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Why Mistaking One for the Other Costs You
              </h2>
              <p>
                Tell an arousal procrastinator their delay is strategic and you have ended the conversation. The
                pattern now has a respectable name and a research citation attached to it, and it will keep running
                until something expensive breaks. This is the more common direction, and it is the one the phrase
                "active procrastination" does the most damage in.
              </p>
              <p>
                Push a genuine active procrastinator onto a rigid early-start schedule and you remove the conditions
                they perform under. They will comply, produce something flat, and conclude that productivity advice is
                written for other people.
              </p>
              <p>
                The fixes point in opposite directions, which is why the diagnosis has to come first. Arousal
                procrastination is treated by borrowing external deadlines you cannot move and by proving to yourself
                that calm work is survivable. Active procrastination is treated by auditing which tasks are allowed to
                be delayed at all, and leaving the rest of the method alone.
              </p>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Which One Are You?</h2>
              <p className="mb-6">
                This is the pair people get wrong most often, and reading about it is not the same as testing it. The
                free assessment measures all seven patterns, takes about five minutes, and reports your primary type,
                your secondary type, and how confident the result is. When these two sit close together, the confidence
                score is the number to read.
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
                Both of these patterns assume you eventually deliver. If the delay ends in a missed deadline or work
                you are not happy with, you are looking at something else.
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-osmo-neon-green">
                <li>
                  <Link href="/types/arousal-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    The arousal procrastinator guide
                  </Link>{' '}
                  goes deeper on the boredom underneath the rush.
                </li>
                <li>
                  <Link href="/types/active-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    The active procrastinator guide
                  </Link>{' '}
                  covers when strategic delay stops being strategic.
                </li>
                <li>
                  <Link href="/types/compare/active-vs-passive-procrastination" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    Active vs passive procrastination
                  </Link>{' '}
                  is the comparison to read if the delay is not producing good work.
                </li>
                <li>
                  <Link href="/types/avoidant-procrastinator" className="text-osmo-neon-green hover:text-osmo-text transition-colors">
                    Avoidant procrastination
                  </Link>{' '}
                  is where a delay that looks like boredom turns out to be fear.
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
                another system to keep up with. {BOOK_PRICE_LABEL} each.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {arousalBook && (
                  <BookLink
                    href={arousalBook.url}
                    type="arousal"
                    placement="compare-page"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    The Arousal Book
                  </BookLink>
                )}
                {activeBook && (
                  <BookLink
                    href={activeBook.url}
                    type="active"
                    placement="compare-page"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                  >
                    The Active Book
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
