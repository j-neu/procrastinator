import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getPayhipBook } from '@/lib/payhip-links'

export const metadata = {
  title: 'Avoidant Procrastination: The Fear Behind the Delay',
  description:
    'You don\u2019t avoid the task. You avoid the feeling it triggers. What avoidant procrastination is, the science of it, and how to break the fear loop.',
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Avoidant Procrastination: The Fear Behind the Delay',
  description:
    'What avoidant procrastination is, the fear loop that drives it, and what actually works.',
  image: 'https://procrastitype.jnprojects.me/share-cards/avoidance.png',
  datePublished: '2026-08-03',
  dateModified: '2026-08-03',
  author: { '@type': 'Organization', name: 'Procrastitype' },
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: 'https://procrastitype.jnprojects.me/types/avoidant-procrastinator',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is avoidant procrastination the same as laziness?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Laziness means you do not care. Avoidant procrastination means you care so much that the fear of the outcome paralyses you. The avoidance is a protection mechanism, not a lack of motivation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do avoidant procrastinators also delay fun things?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because the trigger is not the task. It is the feeling the task might bring, like the fear that even a hobby you love could turn out badly. If the risk of disappointment exists, avoidance can kick in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the first step to breaking the avoidance loop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Name the fear out loud and separate it from the task. Then do one microscopic version of the task, so small it feels silly. Your brain learns that the task is not the danger.',
      },
    },
  ],
}

export default function AvoidantProcrastinatorPage() {
  const book = getPayhipBook('avoidant')

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
              Avoidant Procrastination: <br />
              <span className="italic text-osmo-muted">You're Not Avoiding the Task. You're Avoiding the Fear.</span>
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              The email is written in your head. You've drafted it twenty times. You know exactly what to say. And yet you haven't sent it, because sending it means it exists, and existing means it can be judged. So you refresh your inbox instead, and hate yourself a little more.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Avoidant Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>You delay tasks where the outcome is uncertain and the result could reflect on you.</li>
                <li>You feel a knot in your stomach the moment you think about starting.</li>
                <li>You wait for a day when you feel "ready," and that day never comes.</li>
                <li>You've abandoned projects late in the process, close to done, when they got real.</li>
                <li>Other people call you lazy and you know they're wrong, but you can't explain why.</li>
              </ul>
              <p>
                The pain isn't the work. The work is usually easy once you start. The pain is the moment before, and the relief you feel the second you decide not to start. That relief is the reward that keeps the loop spinning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Avoidance</h2>
              <p>
                Joseph Ferrari documented this pattern in 1991 and called it avoidant procrastination. It's tied to anxiety, low self-esteem, and perfectionism. The delay protects you from a possible bad outcome: failure, judgment, or even the strangest one, success and its new expectations.
              </p>
              <p>
                Sirois and Pychyl brought the modern layer in 2013. Procrastination is mood regulation. You don't run from the task. You run from the discomfort the task predicts. The avoidance works instantly, and that's exactly why it's so hard to quit. Nothing beats avoidance at making you feel better in the moment. The bill just arrives later.
              </p>
              <p>
                The cruel part: the fear doesn't shrink while you avoid. It grows. Every day of delay adds guilt to the fear, and now the task feels even bigger. You're not waiting for the fear to pass. You're feeding it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why "Just Do It" Fails</h2>
              <p>
                "Just do it" assumes the problem is a lack of action. Your problem is a surplus of fear. When you force yourself through the fear, you do the task, but the experience is so unpleasant that your brain double-downs: that thing is dangerous, see how bad it felt.
              </p>
              <p>
                The other failure mode is waiting for confidence. Confidence doesn't arrive before action. It arrives after it. Waiting for the feeling is a way of waiting forever.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Name the specific fear.</strong>
                  Not "I'm scared of this project." The real one. "I'm scared my boss will think I'm incompetent." Write it down. A named fear is a thing you can examine. A nameless one owns you.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Do a microscopic version.</strong>
                  Don't write the report. Open the document. If even that is scary, sit in the chair. Your brain only learns the task isn't dangerous through tiny, repeated proof.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Separate the fear from the fact.</strong>
                  "I'm having the thought that this will go badly" is not the same as "this will go badly." Say the first version out loud and feel the difference.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Schedule the discomfort.</strong>
                  Pick a time each day for the scary task, twenty minutes, and keep that appointment even when you don't want to. The goal isn't completion. The goal is proof that you can sit with the feeling.
                </li>
              </ul>
              <p>
                Avoidance is a safety habit, and safety habits die the same way all habits die: replaced by a better one, repeated until it feels normal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is avoidant procrastination the same as laziness?</h3>
                  <p>
                    No. Laziness means you don't care. Avoidant procrastination means you care so much that the fear of the outcome paralyzes you. The avoidance is a protection mechanism, not a lack of motivation.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Why do avoidant procrastinators also delay things they enjoy?</h3>
                  <p>
                    Because the trigger is not the task. It's the feeling the task might bring, including the fear that even something you love could turn out badly. If disappointment is possible, avoidance can kick in.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">What is the first step to breaking the avoidance loop?</h3>
                  <p>
                    Name the fear out loud and separate it from the task. Then do one microscopic version of the task, so small it feels silly. Your brain learns that the task is not the danger.
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
