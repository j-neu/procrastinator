import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata = {
  title: 'Why You Procrastinate: ACT, CBT & Cognitive Dismantling | Procrastitype',
  description: 'It is not laziness. It is an addiction to safety. Discover the psychology of cognitive dismantling and how to break the cycle.',
}

export default function WhyYouProcrastinate() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text transition-colors duration-500">
      <header className="fixed top-0 z-50 w-full border-b border-osmo-border bg-osmo-bg/80 backdrop-blur-md">
        <div className="osmo-container flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="size-3 bg-osmo-text rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <span className="font-display font-medium tracking-wide text-sm uppercase">Procrastitype</span>
          </Link>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/quiz" className="hidden md:flex items-center gap-2 group">
              <span className="text-xs font-medium uppercase tracking-widest group-hover:mr-2 transition-all duration-300">Start Assessment</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-40 pb-20">
        <article className="osmo-container max-w-3xl">
          <div className="mb-16">
            <span className="px-3 py-1 bg-osmo-neon-green text-black text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block">
              Psychology
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-light leading-tight mb-8">
              Why You Procrastinate: <br/>
              <span className="italic text-osmo-muted">It's Not Laziness. It's an Addiction to Relief.</span>
            </h1>
            <p className="text-xl text-osmo-muted font-light leading-relaxed">
              I know the feeling. The guilt, the dread, the 3 AM panic. Here is the actual science of why we do this to ourselves, and how Cognitive Dismantling can help us stop.
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-osmo-muted font-light leading-relaxed space-y-12">
            
            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">Stop Calling Yourself Lazy</h2>
              <p>
                Let's get this out of the way immediately. If you were lazy, you'd be having a good time. You'd be on the couch, watching Netflix, without a care in the world.
              </p>
              <p>
                But that's not what's happening, is it?
              </p>
              <p>
                You're watching Netflix, but your stomach is in knots. You're scrolling Twitter, but there's a voice in the back of your head screaming at you. You are exhausted from the effort of <em>not</em> doing the work.
              </p>
              <p>
                I spent years beating myself up for being "lazy" and "undisciplined." It didn't help. It just made me feel smaller, which made the tasks feel bigger. The truth is, procrastination isn't a character flaw. It's an emotional regulation problem. It's your brain trying to protect you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Mechanism: Why We Run</h2>
              <p>
                Here is what is actually happening in your brain. It's not magic, and it's not moral failure. It's a feedback loop.
              </p>
              
              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-4">The Trigger</h3>
              <p>
                You look at the Task. Maybe it's a tax return. Maybe it's a difficult email. Your brain's amygdala (the prehistoric part that looks for tigers) sees this Task and misidentifies it. It doesn't see "paperwork." It sees "Threat."
              </p>
              <p>
                Why? Because the task makes you feel something you don't want to feel. Incompetent? Bored? Scared of judgment? That's the tiger.
              </p>

              <h3 className="text-xl font-medium text-osmo-text mt-8 mb-4">The Addiction to Relief</h3>
              <p>
                So your brain hits the panic button. "Abort! Run away!" And you obey. You open Instagram. You clean the kitchen.
              </p>
              <p>
                And instantly... <em>relief</em>.
              </p>
              <p>
                That relief is the drug. Every time you avoid a task and feel that tiny hit of "phew, I don't have to deal with that right now," you are training your brain. You are teaching it: <em>When I feel fear, avoidance makes me feel better.</em>
              </p>
              <p>
                You aren't addicted to your phone. You're addicted to the safety it provides from your own uncomfortable emotions. This is what psychologists call <strong>Experiential Avoidance</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The Solution: Cognitive Dismantling</h2>
              <p>
                Willpower doesn't work here. You can't out-willpower a tiger. If your brain thinks the task will kill you (emotionally), it will fight you every step of the way. And it will win.
              </p>
              <p>
                The only way out is to prove to your brain that the tiger isn't real. We call this <strong>Cognitive Dismantling</strong>. It's a method built from ACT (Acceptance and Commitment Therapy) and CBT principles, but stripped of the clinical jargon.
              </p>
              <p>
                It's about taking apart the fear, piece by piece, until there's nothing left but a boring, neutral task.
              </p>
              <ul className="list-disc pl-5 space-y-4 marker:text-osmo-neon-green mt-6">
                <li>
                  <strong>Stop fighting the feeling.</strong> When the urge to procrastinate hits, don't white-knuckle it. Just notice it. "Oh, there's that chest-tightness again. Hello, fear."
                </li>
                <li>
                  <strong>Call its bluff.</strong> Your brain says "I can't do this." You say, "I'm having the thought that I can't do this." See the difference? Now it's just a thought, not a fact.
                </li>
                <li>
                  <strong>Do the microscopic thing.</strong> Don't try to "write the report." That's too big. Just open the document. If that's too scary, just sit in the chair. Prove to your amygdala that sitting in the chair didn't kill you.
                </li>
              </ul>
            </section>

            <section className="bg-osmo-surface p-8 rounded-2xl border border-osmo-border my-12">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">We Are Not All the Same</h2>
              <p className="mb-6">
                I used to read generic productivity advice and feel broken when it didn't work. "Eat the frog!" they said. Well, I tried to eat the frog and I just had a panic attack.
              </p>
              <p className="mb-6">
                It turns out, we procrastinate for different reasons. You have to know your enemy to defeat it.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-osmo-neon-green text-3xl shrink-0">timer</span>
                  <div>
                    <strong className="text-osmo-text block mb-1">The Arousal Type</strong>
                    <span className="text-sm">You wait until the last minute because you need the adrenaline to feel anything. Normal work feels like death by boredom.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-osmo-neon-green text-3xl shrink-0">shield</span>
                  <div>
                    <strong className="text-osmo-text block mb-1">The Avoidant Type</strong>
                    <span className="text-sm">You're terrified of the outcome. What if it's not good enough? What if people judge you? Safer to not start.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-osmo-neon-green text-3xl shrink-0">balance</span>
                  <div>
                    <strong className="text-osmo-text block mb-1">The Decisional Type</strong>
                    <span className="text-sm">You can't choose. Option A or Option B? If you choose A, you lose B. So you choose nothing and lose both.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-osmo-neon-green text-3xl shrink-0">psychology</span>
                  <div>
                    <strong className="text-osmo-text block mb-1">The Emotion-Regulator</strong>
                    <span className="text-sm">You treat your tasks like mood management. "I don't feel like it right now" is your mantra. You're waiting for a mood that never comes.</span>
                  </div>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-osmo-border">
                <p className="text-sm mb-4 italic">Sound familiar? Figuring out which one you are is the first step to actually fixing it.</p>
                <Link href="/quiz" className="inline-flex items-center gap-2 text-osmo-neon-green hover:text-osmo-text transition-colors font-bold uppercase tracking-widest text-sm">
                  Decode Your Pattern <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-osmo-text mb-6">The 30-Day Rewire</h2>
              <p>
                You can't think your way out of this. You have to act your way out. But you have to act <em>differently</em>.
              </p>
              <p>
                That's why we built these workbooks. They aren't magical. They are just a structured way to practice Cognitive Dismantling for 30 days straight.
              </p>
              <p>
                We strip away the shame. We stop relying on motivation (which is fickle). We start building a system that works even when you're tired, even when you're anxious, even when you "don't feel like it."
              </p>
              <p>
                Especially when you don't feel like it.
              </p>
              <p>
                I've been in the hole. I know how dark it gets down there, watching the days slip by while you hate yourself for wasting them. But I also know the way out. It's not a giant leap. It's just one small, dismantled step at a time.
              </p>
            </section>

            <div className="py-12 border-t border-osmo-border mt-16 text-center">
              <h3 className="text-3xl font-display font-light mb-6">Let's Get You Out of the Hole.</h3>
              <p className="text-osmo-muted mb-10 max-w-xl mx-auto">
                Take the assessment. Find out what kind of "tiger" your brain is running from. It's free, and it might just explain everything.
              </p>
              <Link href="/quiz" className="group relative inline-flex items-center justify-center overflow-hidden bg-osmo-text text-osmo-bg px-12 py-6 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-2xl">
                <span className="mr-2 text-sm uppercase tracking-widest">Start The Assessment</span>
                <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
              </Link>
            </div>

          </div>
        </article>
      </main>

      <footer className="border-t border-osmo-border bg-osmo-surface py-20">
        <div className="osmo-container flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-4 bg-osmo-text rounded-full"></div>
              <span className="font-display font-medium tracking-wide text-lg uppercase">Procrastitype</span>
            </div>
            <div className="text-xs text-osmo-muted">
              © 2026 Procrastitype. Science-backed focus optimization.
            </div>
          </div>
          <div className="flex gap-12 text-xs font-medium uppercase tracking-widest text-osmo-muted">
            <Link className="hover:text-osmo-text transition-colors" href="/blog/why-you-procrastinate">Blog</Link>
            <Link className="hover:text-osmo-text transition-colors" href="/research">Research</Link>
            <Link className="hover:text-osmo-text transition-colors" href="/privacy">Privacy</Link>
            <Link className="hover:text-osmo-text transition-colors" href="/terms">Terms</Link>
            <Link className="hover:text-osmo-text transition-colors" href="/impressum">Impressum</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
