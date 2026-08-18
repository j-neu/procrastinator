import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Byline from '@/components/Byline'
import { BOOK_PRICE_LABEL } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

const TITLE = '6 Procrastination Tests Compared: Which Is Worth Your Time'
const DATE_MODIFIED = '2026-08-18'

export const metadata = pageMetadata({
  path: '/blog/best-procrastination-tests',
  title: '6 Procrastination Tests Compared: Which Is Worth It',
  description:
    'Procrastitype, IDR Labs, Psychology Today, Liven, Deepwrk and Freudly compared on length, types identified, cost and research basis. Verified 2026-08-17.',
  image: '/share-cards/default.png',
  ogType: 'article',
})

/**
 * Verified 2026-08-17 from each provider's own public page. A 7th test,
 * LifeHack, was dropped rather than estimated: its quiz is fully
 * client-rendered and could not be completed and timed the way the other
 * six were. See the methodology section for the full explanation. Do not
 * add it back with guessed figures.
 */
const rows = [
  {
    test: 'Procrastitype (ours)',
    questions: '35',
    time: '~5 min',
    types: '7, plus a secondary type and a confidence level',
    free: 'Yes',
    signup: 'No',
    research: 'Ferrari (1991), Chu and Choi (2005), Steel (2007)',
  },
  {
    test: 'IDR Labs',
    questions: '24',
    time: '~5 min',
    types: '7 scored dimensions',
    free: 'Yes',
    signup: 'No',
    research: 'Sirois and colleagues, Durham University',
  },
  {
    test: 'Psychology Today',
    questions: '20',
    time: '~3 min',
    types: 'Scored tendencies, not named types',
    free: 'Yes',
    signup: 'No',
    research: 'GPS, PPS, IPS and APS scales',
  },
  {
    test: 'Liven',
    questions: 'Not stated',
    time: '~3 min',
    types: '5 (Perfectionist, Dreamer, Avoider, Crisis-Maker, Overdoer)',
    free: 'Yes',
    signup: 'Not stated',
    research: 'Sapadin-style framework',
  },
  {
    test: 'Deepwrk',
    questions: '9',
    time: '2 to 3 min',
    types: '4 mechanism-based',
    free: 'Yes',
    signup: 'No',
    research: 'Mechanisms cited, no named studies',
  },
  {
    test: 'Freudly',
    questions: '53',
    time: '~10 min',
    types: 'Academic delay reasons',
    free: 'Yes',
    signup: 'No',
    research: 'PASS questionnaire',
  },
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description:
    'Six procrastination tests compared on length, types identified, cost, signup and research basis, verified 2026-08-17 from each provider’s own public page.',
  image: absoluteUrl('/share-cards/default.png'),
  datePublished: '2026-08-18',
  dateModified: DATE_MODIFIED,
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/blog/best-procrastination-tests'),
}

/**
 * Unordered on purpose: the article does not rank the tests from best to
 * worst, and an ordered list here would claim a verdict the page itself
 * refuses to give (see "Which Test to Take").
 */
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Procrastination Tests Compared',
  description:
    'Six procrastination tests compared on length, types identified, cost, and research basis. Verified 2026-08-17.',
  url: absoluteUrl('/blog/best-procrastination-tests'),
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: 6,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Procrastitype Procrastination Assessment', url: absoluteUrl('/quiz') },
    { '@type': 'ListItem', position: 2, name: 'IDR Labs Procrastination Type Test', url: 'https://www.idrlabs.com/procrastination-type/test.php' },
    { '@type': 'ListItem', position: 3, name: 'Psychology Today Procrastination Test', url: 'https://www.psychologytoday.com/us/tests/career/procrastination-test' },
    { '@type': 'ListItem', position: 4, name: 'Liven Procrastination Test', url: 'https://theliven.com/tests/procrastination-test' },
    { '@type': 'ListItem', position: 5, name: 'Deepwrk Procrastination Test', url: 'https://www.deepwrk.io/resources/procrastination-test' },
    { '@type': 'ListItem', position: 6, name: 'Freudly Academic Procrastination Scale (PASS)', url: 'https://freudly.ai/tests/academic-procrastination-scale-pass/' },
  ],
}

export default function BestProcrastinationTestsPage() {
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
              6 Procrastination Tests, <br />
              <span className="italic text-osmo-muted">Compared</span>
            </h1>

            <Byline dateModified={DATE_MODIFIED} />

            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              There are more free procrastination tests online than most people realize, and they all promise
              roughly the same five minutes and the same kind of answer. This roundup puts six of them side by
              side, including the one this site runs, on what each one actually measures and what you get back
              for your time.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                What These Tests Can (and Cannot) Tell You
              </h2>
              <p>
                Every test on this page is a self-report questionnaire, not a clinical instrument. None of them,
                including the one built for this site, has been externally validated the way a diagnostic scale
                would need to be. What they can do is give you language for a pattern you already live with, and a
                starting point for which fix to try first. What none of them can do is diagnose you, replace a
                conversation with a clinician, or account for procrastination that sits alongside something like
                depression, anxiety or ADHD.
              </p>
              <p>
                With that in view, the honest comparison is not which test is most accurate. It is which one gives
                you the most useful answer for the least cost in time and data.
              </p>
              <p>
                It also helps to know what "type" actually means across these six. Some report a single label.
                Some report scores across several dimensions and leave you to interpret them. Only one on this
                list separates a confident result from a shaky one. None of that makes the underlying pattern more
                or less real; it changes how much weight you should put on the specific label you get back.
              </p>
            </section>

            <section id="compare">
              <blockquote className="not-prose border-l-4 border-osmo-neon-green pl-6 py-2 my-2">
                <p className="text-lg md:text-xl font-display font-light text-osmo-text leading-snug">
                  Procrastitype runs one of the tests on this list. That is disclosed here and on its row below.
                  Every other entry was taken and timed on 2026-08-17, and the details come from each provider's
                  own public page.
                </p>
              </blockquote>

              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mt-10 mb-6">
                The Comparison Table
              </h2>
              <div className="not-prose overflow-x-auto rounded-2xl border border-osmo-border">
                <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Six procrastination tests compared by question count, time to complete, types identified, cost,
                    signup requirement and research basis, verified 2026-08-17.
                  </caption>
                  <thead>
                    <tr className="bg-osmo-surface">
                      <th scope="col" className="p-4 font-medium text-osmo-text">Test</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Questions</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Time</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Types identified</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Free</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Signup</th>
                      <th scope="col" className="p-4 font-medium text-osmo-text">Research basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.test} className="border-t border-osmo-border align-top">
                        <th scope="row" className="p-4 font-medium text-osmo-text whitespace-nowrap">{row.test}</th>
                        <td className="p-4 whitespace-nowrap">{row.questions}</td>
                        <td className="p-4 whitespace-nowrap">{row.time}</td>
                        <td className="p-4">{row.types}</td>
                        <td className="p-4">{row.free}</td>
                        <td className="p-4">{row.signup}</td>
                        <td className="p-4">{row.research}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm">Verified as of 2026-08-17. Figures are maintained by hand; see the methodology note below for how and when they get re-checked.</p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The Honest Differentiator
              </h2>
              <p>
                This site is not going to claim its own test is the most accurate one on the list. Nothing in the
                table above supports that, and none of these six has been through the kind of external validation
                that claim would need. What is true, and checkable in the table, is narrower and more useful:
              </p>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>
                  <strong className="text-osmo-text">It reports a secondary type.</strong> Every other test on this
                  list returns a single label or a flat set of scores. Most people are not a pure type, and the
                  research on this, including Steel's own critique of rigid typologies, agrees.
                </li>
                <li>
                  <strong className="text-osmo-text">It reports a confidence level.</strong> Procrastitype is the
                  only test here that tells you when its own result is weak, based on how far apart your top two
                  scores land and how many neutral "none of the above" answers you gave instead of being forced
                  into a box.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                The Tests, One by One
              </h2>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">Procrastitype (ours)</h3>
              <p>
                35 questions, about five minutes, and the only test here that reports both a secondary type and a
                confidence level instead of forcing a single label. It also tracks how often you pick "none of the
                above" and lowers its own stated confidence when you use that option a lot, which is a form of
                self-doubt no competing test on this list builds in.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">IDR Labs</h3>
              <p>
                One of the most recognizable free personality-test brands online, and its procrastination test
                follows the same house style as the rest of its catalog: 24 questions, about five minutes, seven
                scored dimensions credited to Sirois and colleagues at Durham University. It scores you across all
                seven rather than sorting you into one, which is honest, but the report stops at the score. There
                is no secondary-type framing and no read on how confident to be in the result.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">Psychology Today</h3>
              <p>
                Twenty questions, about three minutes, drawing on four named academic scales (the General
                Procrastination Scale, the Pure Procrastination Scale, the Irrational Procrastination Scale and the
                Adult Procrastination Scale). That gives it more citable academic pedigree per question than
                almost anything else here. What you get back is a tendency score rather than a named type, so it
                suits someone who wants the research trail more than the personality framing.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">Liven</h3>
              <p>
                Sorts you into one of five archetypes drawn from Linda Sapadin's typology: Perfectionist, Dreamer,
                Avoider, Crisis-Maker, Overdoer. Sapadin's model is popular and intuitive but comes from clinical
                observation rather than the factor analysis behind Ferrari's or Chu and Choi's work. The site does
                not publish its question count, runs about three minutes, and the result routes into Liven's own
                coaching app rather than a standalone article or book.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">Deepwrk</h3>
              <p>
                The fastest test on this list: nine questions, two to three minutes, four mechanism-based results.
                It does not name the studies behind those mechanisms, which makes the claims hard to check
                independently, but it also does not waste your time. Good for a rough read when five or ten
                minutes is more than you want to give it.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-3">Freudly</h3>
              <p>
                Runs the Academic Procrastination Scale (PASS): 53 questions, about ten minutes, by far the
                longest test here. That length buys real granularity, since PASS was built to separate the reasons
                behind academic delay rather than just measure how much of it happens. Worth the time specifically
                if your procrastination is tied to school or study work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Which Test to Take, Depending on What You Want
              </h2>
              <p>
                There is no single winner here, and a roundup that claimed one would be overstating what six
                unvalidated self-report tests can settle. Three honest recommendations instead:
              </p>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">If you want to know your type and how sure to be about it:</strong>
                  take the <Link href="/quiz" className="text-osmo-neon-green hover:text-osmo-text transition-colors">Procrastitype assessment</Link>. It is the only one that separates a confident result from a shaky one.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">If two or three minutes is genuinely all you have:</strong>
                  Deepwrk gives the fastest read of the six.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">If your procrastination is specifically about school or study work and you have ten minutes:</strong>
                  Freudly's PASS-based test is the most academically granular option here.
                </li>
              </ul>
              <p>
                A fourth path is worth naming even though it is not a recommendation: take two of them. The tests
                on this list do not agree on what a "type" is, so a Procrastitype result and an IDR Labs result
                that point at the same underlying pattern, described in different language, is a stronger signal
                than either test alone. A flat contradiction between two of them is also useful information. It
                usually means the real pattern sits between two categories, which is exactly the kind of case a
                secondary-type result is built to catch.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Methodology and Disclosure
              </h2>
              <p>
                Every figure in the table above was checked directly against each provider's own public page on
                2026-08-17. A seventh test, LifeHack's procrastination quiz, was researched for this roundup and
                deliberately left out rather than filled in with a guess. Its quiz runs entirely client-side and
                could not be completed and timed the same way the other six were, and this page's whole premise is
                that every figure in it was actually checked, not estimated. If that changes, the row goes back in
                with real numbers, not before.
              </p>
              <p>
                Procrastitype appears in this comparison because it is the test this site runs. That is stated
                plainly above the table, not buried in a footer, and the entry is held to the same standard as
                every competitor: no accuracy claim beyond what the data supports, and no schema markup implying a
                ranked "best" result. The figures here will be re-checked quarterly, next on 2026-11-17.
              </p>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">
                Take the Free Assessment
              </h2>
              <p className="mb-6">
                Five minutes, 35 questions, a primary type, a secondary type and a confidence level. If a type
                turns out to fit, each pattern also has its own {BOOK_PRICE_LABEL} book that walks through why it
                happens and what to do about it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-osmo-neon-green text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                >
                  Take the Assessment
                </Link>
                <Link
                  href="/workbooks"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-osmo-text rounded-full font-bold uppercase tracking-widest text-sm hover:bg-osmo-text hover:text-osmo-bg transition-colors"
                >
                  See All 7 Books
                </Link>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </div>
  )
}
