import Link from 'next/link'

export default function SiteFooter() {
  return (
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
        <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs font-medium uppercase tracking-widest text-osmo-muted">
          <Link className="hover:text-osmo-text transition-colors" href="/types">Types</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/blog/why-you-procrastinate">Blog</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/research">Research</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/about">About</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/workbooks">Workbooks</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/privacy">Privacy</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/terms">Terms</Link>
          <Link className="hover:text-osmo-text transition-colors" href="/impressum">Impressum</Link>
        </div>
      </div>

      {/* Ad Swap reciprocal banner. Own row, hairline-separated, right-aligned
          on desktop so it reads as a quiet footnote rather than competing with
          the nav links above it. Fixed 300x130 in the embed's own inline
          style, so the space is reserved before it loads (no CLS). */}
      <div className="osmo-container mt-12 pt-8 border-t border-osmo-border/60 flex justify-center md:justify-end">
        <iframe
          src="https://ad-swap.web.app/frame.html?site=2wCnOY3BG9CayPu0nAz2"
          style={{ border: 0, width: 300, height: 130, maxWidth: '100%' }}
          loading="lazy"
          sandbox="allow-scripts allow-popups"
          title="Ad"
        />
      </div>
    </footer>
  )
}
