'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export interface SiteHeaderLink {
  href: string;
  label: string;
}

interface SiteHeaderProps {
  links?: SiteHeaderLink[];
}

export default function SiteHeader({ links = [] }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-osmo-border bg-osmo-bg/80 backdrop-blur-md">
      <div className="osmo-container flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="size-3 bg-osmo-text rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <span className="font-display font-medium tracking-wide text-sm uppercase">Procrastitype</span>
        </Link>
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                className="text-xs font-medium uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors duration-300"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link href="/quiz" className="hidden md:flex items-center gap-2 group">
            <span className="text-xs font-medium uppercase tracking-widest group-hover:mr-2 transition-all duration-300">Start Assessment</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-osmo-border bg-osmo-bg/95 backdrop-blur-md animate-fadeIn">
          <div className="osmo-container py-6 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-xs font-medium uppercase tracking-widest text-osmo-muted hover:text-osmo-text transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-xs font-bold uppercase tracking-widest text-osmo-neon-green"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
