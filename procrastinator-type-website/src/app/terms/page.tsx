import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text pt-32 pb-20">
      <div className="osmo-container max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-osmo-muted hover:text-osmo-text mb-8 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
        </Link>
        <h1 className="text-4xl font-display font-light mb-12">Terms of Service</h1>
        
        <div className="space-y-8 text-osmo-muted font-light leading-relaxed">
            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">1. Agreement to Terms</h2>
                <p>
                    By accessing or using Procrastitype, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">2. Educational Purposes Only</h2>
                <p>
                    The content provided on Procrastitype, including the assessment results and workbook materials, is for educational and informational purposes only. It is not intended to be a substitute for professional psychological advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">3. Intellectual Property</h2>
                <p>
                    The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Procrastitype and its licensors. The workbooks and assessment methodology are protected by copyright.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">4. Changes</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-display text-osmo-text mb-4">5. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at hello@procrastitype.com.
                </p>
            </section>
        </div>
      </div>
    </div>
  )
}
