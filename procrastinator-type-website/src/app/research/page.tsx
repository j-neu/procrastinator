import Link from 'next/link'

export default function Research() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text pt-32 pb-20">
      <div className="osmo-container max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-osmo-muted hover:text-osmo-text mb-8 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-display font-light mb-12">Scientific Foundation</h1>
        
        <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-display mb-6">Overview</h2>
                <p className="text-osmo-muted font-light leading-relaxed text-lg">
                    The Procrastitype assessment is built on three decades of psychological research into self-regulation failure, task aversion, and temporal motivation theory. Unlike simple personality quizzes, our model integrates findings from multiple validated constructs to identify not just <em>that</em> you procrastinate, but <em>why</em>.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6">Key References</h2>
                <div className="space-y-8">
                    <div className="border-l-2 border-osmo-neon-green pl-6 py-1">
                        <h3 className="font-medium text-lg">Ferrari, J. R. (1991)</h3>
                        <p className="text-osmo-text italic mb-2">Compulsive procrastination: Components and social-cognitive correlates</p>
                        <p className="text-sm text-osmo-muted">Journal of Social Behavior and Personality</p>
                        <p className="mt-2 text-osmo-muted font-light">Establishes the distinction between arousal (thrill-seeking) and avoidant (fear-based) procrastination types.</p>
                    </div>

                    <div className="border-l-2 border-osmo-neon-green pl-6 py-1">
                        <h3 className="font-medium text-lg">Chu, A. H. C., & Choi, J. N. (2005)</h3>
                        <p className="text-osmo-text italic mb-2">Rethinking procrastination: Positive effects of "active" procrastination behavior</p>
                        <p className="text-sm text-osmo-muted">The Journal of Social Psychology</p>
                        <p className="mt-2 text-osmo-muted font-light">Introduced the concept of "active procrastination" - a strategic delay that can lead to positive outcomes, distinguishing it from passive procrastination.</p>
                    </div>

                    <div className="border-l-2 border-osmo-neon-green pl-6 py-1">
                        <h3 className="font-medium text-lg">Steel, P. (2007)</h3>
                        <p className="text-osmo-text italic mb-2">The nature of procrastination: A meta-analytic and theoretical review</p>
                        <p className="text-sm text-osmo-muted">Psychological Bulletin</p>
                        <p className="mt-2 text-osmo-muted font-light">The definitive meta-analysis establishing the "Temporal Motivation Theory" and correlating procrastination with impulsiveness and self-efficacy.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-display mb-6">Our Methodology</h2>
                <p className="text-osmo-muted font-light leading-relaxed mb-4">
                    Our assessment uses 35 behavioral and situational questions to map your responses against six primary procrastination archetypes. We use a weighted scoring algorithm that accounts for:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-osmo-muted font-light">
                    <li>Discriminant validity (how well a question separates different types)</li>
                    <li>Type correlations (how different types overlap, e.g., Arousal and Active)</li>
                    <li>Consistency checking (identifying random response patterns)</li>
                </ul>
            </section>
        </div>
      </div>
    </div>
  )
}
