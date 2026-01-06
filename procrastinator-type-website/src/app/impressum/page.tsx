import Link from 'next/link'

export default function Impressum() {
  return (
    <div className="min-h-screen bg-osmo-bg text-osmo-text pt-32 pb-20">
      <div className="osmo-container max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-osmo-muted hover:text-osmo-text mb-8 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
        </Link>
        <h1 className="text-4xl font-display font-light mb-12">Impressum</h1>
        <div className="space-y-6 text-osmo-muted font-light leading-relaxed">
            <p>
                <strong>Angaben gemäß § 5 TMG</strong><br />
                JN Projects<br />
                Eulerstrasse 12<br />
                13357 Berlin<br />
                Germany
            </p>
            <p>
                <strong>Kontakt</strong><br />
                E-Mail: hello@procrastitype.com<br />
            </p>
        </div>
      </div>
    </div>
  )
}
