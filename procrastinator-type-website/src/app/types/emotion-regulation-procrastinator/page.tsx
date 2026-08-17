import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RelatedTypes from '@/components/RelatedTypes'
import Byline from '@/components/Byline'
import { getPayhipBook } from '@/lib/payhip-links'
import { absoluteUrl, authorJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/types/emotion-regulation-procrastinator',
  title: 'Emotion-Regulation Procrastination: When Mood Runs Your To-Do List',
  description:
    'You don\u2019t do the task because you don\u2019t feel like it, and the feeling never comes. What emotion-regulation procrastination is and how to work with it.',
  image: '/share-cards/emotion-regulation.png',
  ogType: 'article',
})

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Emotion-Regulation Procrastination: When Mood Runs Your To-Do List',
  description:
    'What emotion-regulation procrastination is, why the feeling never comes, and how to work with it.',
  image: absoluteUrl('/share-cards/emotion-regulation.png'),
  datePublished: '2026-08-03',
  dateModified: '2026-08-17',
  author: authorJsonLd,
  publisher: { '@type': 'Organization', name: 'Procrastitype' },
  mainEntityOfPage: absoluteUrl('/types/emotion-regulation-procrastinator'),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is emotion-regulation procrastination just bad mood management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is mood management that is working exactly as designed. You avoid the task, the unpleasant feeling drops, and the brain learns to repeat the loop. The strategy works in the moment. It bills you later.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from avoidant procrastination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avoidant procrastination runs on specific fears like failure or judgment. Emotion-regulation procrastination runs on any uncomfortable feeling, including plain boredom or tiredness. The two overlap heavily in the research.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I work when I genuinely don\u2019t feel like it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stop waiting for the feeling and shrink the task instead. Commit to two minutes, not two hours. The feeling usually shows up after action, not before it.',
      },
    },
  ],
}

export default function EmotionRegulationProcrastinatorPage() {
  const book = getPayhipBook('emotionRegulation')

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
              Emotion-Regulation Procrastination: <br />
              <span className="italic text-osmo-muted">"I Don't Feel Like It" Is Your Operating System</span>
            </h1>

            <Byline dateModified="2026-08-17" />
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              The task is important. You know it's important. You agreed it's important, out loud, to another human. And still you don't do it, because right now, at this exact moment, you don't feel like it. So you wait for the mood to arrive. It never does.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Emotion-Regulation Procrastination Looks Like</h2>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green">
                <li>Your schedule bends to your mood, and your mood has a strong veto.</li>
                <li>You've missed deadlines on tasks that didn't feel hard, just unappealing.</li>
                <li>You start a task, hit the first unpleasant feeling, and stop.</li>
                <li>You're convinced you can only work in certain states: calm, fresh, inspired.</li>
                <li>You feel guilty about the delay, and the guilt makes you feel even less like working.</li>
              </ul>
              <p>
                The tell is in the phrasing. Other patterns say "I'm scared" or "I need pressure." This one says "I don't feel like it," as if the feeling were a requirement for the task to exist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Psychology Behind the Mood Veto</h2>
              <p>
                This is the most modern layer of the research. Sirois and Pychyl showed in 2013 that procrastination is often emotion regulation: you choose the task that fixes your mood now, not the task that serves your future. You don't want the report. You want the relief of not feeling the report. The relief is real, instant, expensive.
              </p>
              <p>
                The mechanism is called experiential avoidance. Unpleasant feelings are treated as emergencies, and the task that triggers them gets abandoned for anything that doesn't. The phone, the kitchen, the tidying of a drawer you forgot existed. None of it matters. All of it is painless.
              </p>
              <p>
                Here is the loop that keeps it alive: the avoidance works, so the brain records it as a success. Next time the feeling appears, the brain reaches for the same escape faster. The mood veto gets stronger with every victory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Why Waiting for the Feeling Fails</h2>
              <p>
                The feeling you're waiting for is a myth. Motivation follows action. It doesn't precede it. The writer who feels inspired on schedule was usually writing before the inspiration arrived, and the inspiration arrived to find them already working.
              </p>
              <p>
                Waiting also compounds the problem. Every hour of delay adds guilt to the pile, and guilt is an unpleasant feeling, and unpleasant feelings trigger the avoidance all over again. You're not resting while you wait. You're rehearsing the loop.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">What Actually Works</h2>
              <ul className="space-y-6">
                <li>
                  <strong className="text-osmo-text block mb-1">Separate the feeling from the decision.</strong>
                  You don't have to want to work. You only have to decide to work. The feeling is information, not instructions.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Shrink the commitment.</strong>
                  Two minutes. That's the whole goal. Open the file and work for the length of a song. The mood veto has no power over two minutes.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Do the task that fits the mood.</strong>
                  Tired? Do the mechanical part. Fired up? Do the creative part. The task list doesn't care which order you honor it in.
                </li>
                <li>
                  <strong className="text-osmo-text block mb-1">Notice the relief scam.</strong>
                  When you avoid and feel that instant lift, name it: "there's the relief." Recognition is the beginning of the break.
                </li>
              </ul>
              <p>
                You don't need to become a person who loves every task. You need to become a person who works regardless of the mood, and that is a skill, not a personality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">Is emotion-regulation procrastination just bad mood management?</h3>
                  <p>
                    It's mood management that is working exactly as designed. You avoid the task, the unpleasant feeling drops, and the brain learns to repeat the loop. The strategy works in the moment. It bills you later.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How is this different from avoidant procrastination?</h3>
                  <p>
                    Avoidant procrastination runs on specific fears like failure or judgment. Emotion-regulation procrastination runs on any uncomfortable feeling, including plain boredom or tiredness. The two overlap heavily in the research.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-osmo-text mb-2">How do I work when I genuinely don't feel like it?</h3>
                  <p>
                    Stop waiting for the feeling and shrink the task instead. Commit to two minutes, not two hours. The feeling usually shows up after action, not before it.
                  </p>
                </div>
              </div>
            </section>

            <RelatedTypes current="emotion-regulation" />

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
