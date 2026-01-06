'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

const procrastinationTypes = [
  {
    type: 'arousal',
    title: 'Arousal Procrastinator',
    description: 'Delays tasks to create artificial urgency. Believes they perform better under pressure.',
    icon: 'timer'
  },
  {
    type: 'avoidant', 
    title: 'Avoidant Procrastinator',
    description: 'Fear of failure or negative emotions triggers delay. Subconscious avoidance mechanism.',
    icon: 'shield'
  },
  {
    type: 'decisional',
    title: 'Decisional Procrastinator', 
    description: 'Struggles to make choices. Paralysis by analysis leads to inaction.',
    icon: 'balance'
  },
  {
    type: 'active',
    title: 'Active Procrastinator',
    description: 'Deliberate delay to optimize focus. Often high-performing but risky.',
    icon: 'crisis_alert'
  },
  {
    type: 'passive',
    title: 'Passive Procrastinator',
    description: 'Traditional procrastination due to disorganization and lack of time perception.',
    icon: 'cyclone'
  },
  {
    type: 'emotion',
    title: 'Emotion-Regulation Procrastinator',
    description: 'Delays to manage immediate mood. Prioritizes feeling good now over long-term goals.',
    icon: 'psychology'
  }
]

const faqs = [
  {
    question: "Is procrastination just laziness?",
    answer: "No. Research shows procrastination is often an emotional regulation issue or a cognitive strategy, not a lack of willpower. It's about how your brain handles stress and task-aversion."
  },
  {
    question: "Can I be more than one type?",
    answer: "Absolutely. Most people have a primary type and a secondary 'shadow' type. Our assessment identifies both to give you a complete profile."
  },
  {
    question: "Are these workbooks scientifically backed?",
    answer: "Yes, the exercises are based on Cognitive Behavioral Therapy (CBT) and Acceptance and Commitment Therapy (ACT) principles specifically adapted for procrastination patterns identified by Ferrari and others."
  },
  {
    question: "How long does the assessment take?",
    answer: "The deep-dive assessment takes about 5-7 minutes. It's designed to be thorough enough to provide meaningful psychological insights."
  }
]

const references = [
  { author: "Ferrari, J. R.", year: "1991", title: "Compulsive procrastination: Components and social-cognitive correlates.", journal: "Psychological Reports" },
  { author: "Chu, A. H. C., & Choi, J. N.", year: "2005", title: "Rethinking procrastination: Positive effects of 'active' procrastination behavior on attitudes and performance.", journal: "The Journal of Social Psychology" },
  { author: "Steel, P.", year: "2007", title: "The nature of procrastination: A meta-analytic and theoretical review of quintessential self-regulatory failure.", journal: "Psychological Bulletin" },
  { author: "Sirois, F., & Pychyl, T.", year: "2013", title: "Procrastination and the Priority of Short-Term Mood Regulation: Consequences for Future Self.", journal: "Social and Personality Psychology Compass" }
]

export default function Home() {
  const [totalCompletions, setTotalCompletions] = useState<number>(10000)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        if (data.success && data.data.total_completions > 0) {
          setTotalCompletions(data.data.total_completions)
        }
      } catch (error) {
        console.log('Could not load stats')
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-osmo-bg text-osmo-text transition-colors duration-500">
      <header className="fixed top-0 z-50 w-full border-b border-osmo-border bg-osmo-bg/80 backdrop-blur-md">
        <div className="osmo-container flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="size-3 bg-osmo-text rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <span className="font-display font-medium tracking-wide text-sm uppercase">Procrastitype</span>
          </Link>
          <nav className="hidden md:flex items-center gap-12">
            <a className="text-xs font-medium uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors duration-300" href="#problem">The Problem</a>
            <a className="text-xs font-medium uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors duration-300" href="#types">Archetypes</a>
            <a className="text-xs font-medium uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors duration-300" href="#references">Science</a>
          </nav>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/quiz" className="hidden md:flex items-center gap-2 group">
              <span className="text-xs font-medium uppercase tracking-widest group-hover:mr-2 transition-all duration-300">Start Assessment</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <button className="md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          </div>
          <div className="osmo-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="col-span-1 lg:col-span-8">
              <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
                <span className="px-3 py-1 bg-osmo-neon-green text-black text-[10px] font-bold uppercase tracking-widest rounded-full">Behavioral Analysis</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-display font-light leading-[0.85] tracking-tight mb-12 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                Decode your <br/>
                <span className="italic font-normal text-osmo-muted">procrastination.</span>
              </h1>
              <div className="flex flex-col md:flex-row gap-8 items-start opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                <p className="text-lg md:text-xl text-osmo-muted max-w-md font-light leading-relaxed">
                  It's not laziness. It's a complex psychological pattern. Identifying your type is the first step to mastering your focus.
                </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link href="/quiz" className="group relative px-8 py-4 bg-osmo-neon-green text-black rounded-full overflow-hidden hover:scale-[1.05] transition-transform duration-300 shadow-xl">
                    <span className="relative z-10 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      Start Quiz
                      <span className="material-symbols-outlined text-[18px]">north_east</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Generic Advice Doesn't Work Section */}
        <section className="py-32 bg-osmo-surface border-y border-osmo-border" id="problem">
          <div className="osmo-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-light mb-8 leading-tight">
                  Why Generic Advice <br/>
                  <span className="italic text-osmo-muted">Doesn't Work.</span>
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-osmo-text font-light leading-relaxed">
                  Most productivity advice assumes everyone's brain works the same way. Time-blocking, early starts, steady progress.
                </p>
                <p className="text-lg text-osmo-muted font-light leading-relaxed">
                  But research shows there are distinct procrastination types, each with different psychological drivers and optimal strategies. <strong>What works for one type can actually make things worse for another.</strong>
                </p>
                <div>
                  <Link href="/blog/why-you-procrastinate" className="group inline-flex items-center gap-2 text-osmo-neon-green hover:text-osmo-text transition-colors text-sm font-bold uppercase tracking-widest mt-2">
                    Read the Science
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types Section */}
        <section className="py-32" id="types">
          <div className="osmo-container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-light">The Scientific <span className="text-osmo-muted italic">Archetypes</span></h2>
              <p className="text-osmo-muted text-sm max-w-xs mt-6 md:mt-0 leading-relaxed">
                We've mapped the six primary patterns identified in behavioral research.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-osmo-border">
              {procrastinationTypes.map((type, index) => (
                <div key={type.type} className="group relative p-10 border-r border-b border-osmo-border hover:bg-osmo-surface transition-colors duration-500 min-h-[300px] flex flex-col justify-between overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-xs font-mono text-osmo-muted mb-8">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="text-2xl font-display font-medium mb-4">{type.title}</h3>
                    <p className="text-sm text-osmo-muted leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                  <div className="flex justify-end relative z-10">
                    <span className="material-symbols-outlined text-4xl font-extralight text-osmo-text/20 group-hover:text-osmo-neon-green transition-colors duration-500">{type.icon}</span>
                  </div>
                  <div className="absolute -bottom-10 -right-10 size-40 bg-osmo-neon-green/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="py-32 bg-osmo-surface border-t border-osmo-border" id="references">
          <div className="osmo-container">
            <h2 className="text-3xl font-display font-light mb-16 uppercase tracking-widest">Key Scientific References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {references.map((ref, i) => (
                <div key={i} className="border-l border-osmo-border pl-8 py-2">
                  <div className="text-sm font-medium mb-2">{ref.author} ({ref.year})</div>
                  <div className="text-sm italic text-osmo-text mb-1 underline decoration-osmo-neon-green/30">{ref.title}</div>
                  <div className="text-xs text-osmo-muted">{ref.journal}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 border-t border-osmo-border">
          <div className="osmo-container max-w-4xl">
            <h2 className="text-4xl font-display font-light mb-20 text-center">Questions? <span className="italic text-osmo-muted">We've Got Answers.</span></h2>
            <div className="space-y-12">
              {faqs.map((faq, i) => (
                <div key={i} className="group">
                  <h3 className="text-xl font-medium mb-4 flex items-center gap-4">
                    <span className="size-1.5 bg-osmo-neon-green rounded-full"></span>
                    {faq.question}
                  </h3>
                  <p className="text-osmo-muted leading-relaxed pl-5 font-light">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 relative flex items-center justify-center overflow-hidden border-t border-osmo-border">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)] opacity-20"></div>
          </div>
          <div className="relative z-10 text-center max-w-2xl px-6">
            <h2 className="text-5xl md:text-8xl font-display font-light text-osmo-text mb-8 tracking-tighter">Ready to <span className="italic text-osmo-muted">begin?</span></h2>
            <p className="text-xl text-osmo-muted mb-12 font-light">Join others decoding their focus patterns.</p>
            <Link href="/quiz" className="group relative inline-flex items-center justify-center overflow-hidden bg-osmo-text text-osmo-bg px-12 py-6 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-2xl">
              <span className="mr-2 text-sm uppercase tracking-widest">Start Free Assessment</span>
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </div>
        </section>
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