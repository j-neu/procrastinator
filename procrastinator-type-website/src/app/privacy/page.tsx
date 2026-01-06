import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text pt-32 pb-20">
      <div className="osmo-container max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-osmo-muted hover:text-osmo-text mb-8 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
        </Link>
        <h1 className="text-4xl font-display font-light mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-osmo-muted font-light leading-relaxed">
            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">1. Introduction</h2>
                <p>
                    At Procrastitype, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our website and take our assessment.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">2. Data We Collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Assessment Data:</strong> Your responses to the quiz questions are processed to generate your results. This processing happens primarily in your browser.</li>
                    <li><strong>Email Address:</strong> If you choose to sign up for our newsletter or save your results, we collect your email address.</li>
                    <li><strong>Usage Data:</strong> We collect anonymous usage statistics to improve our service.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">3. How We Use Your Data</h2>
                <p>
                    We use your data solely to:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Provide you with your assessment results.</li>
                    <li>Send you relevant information about your procrastination type (if you opt-in).</li>
                    <li>Improve the accuracy of our assessment model (using anonymized aggregate data).</li>
                </ul>
                <p className="mt-4">
                    We do not sell your personal data to third parties.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">4. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at hello@procrastitype.com.
                </p>
            </section>
        </div>
      </div>
    </div>
  )
}
