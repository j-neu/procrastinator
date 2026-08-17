import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

import { authorJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Procrastination Quiz: Discover Your Type | Procrastitype",
    template: "%s | Procrastitype",
  },
  description:
    "Take the science-backed procrastination quiz and discover which of the 7 procrastination types you are. Get personalized strategies, books and workbooks to break the pattern for good.",
  keywords: [
    "procrastination quiz",
    "procrastination types",
    "procrastinator test",
    "why do I procrastinate",
    "procrastination help",
    "cognitive dismantling",
    "active procrastination",
    "passive procrastination",
    "perfectionist procrastination",
    "avoidance procrastination",
  ],
  // NOTE: no `alternates.canonical` and no `openGraph.url` here on purpose.
  // App Router metadata merges shallowly, so anything set at the root is
  // inherited verbatim by every child route that doesn't override it -- which
  // previously made all 18 routes canonicalise to the homepage. Each route sets
  // its own via `pageMetadata()` in `@/lib/seo`.
  openGraph: {
    type: "website",
    siteName: "Procrastitype",
    title: "Procrastitype - Procrastination Quiz: Discover Your Type in 5 Minutes",
    description:
      "It's not laziness. Discover which of the 7 procrastination types you are and break the pattern for good.",
  },
  twitter: {
    card: "summary",
    title: "Procrastitype - Procrastination Quiz",
    description:
      "It's not laziness. Discover which of the 7 procrastination types you are and break the pattern for good.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use the full share-card image in rich/AI previews rather
      // than a thumbnail. Routes that need noindex set it via pageMetadata().
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "cmNEBQ-OCDzOZ_1X9ijLqQHWWXgppo9QK6kRevFjmXg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Procrastitype",
  url: siteUrl,
  logo: `${siteUrl}/window.svg`,
  description:
    "Science-backed procrastination type assessment, books and workbooks to help people understand and overcome their procrastination patterns.",
  // Confirmed with the owner on 2026-08-17: Procrastitype has no social profiles
  // yet, so there is genuinely nothing to list here. Leave it empty rather than
  // padding it with unrelated URLs -- `sameAs` means "another profile of THIS
  // entity", and a wrong entry is worse than none.
  //
  // TODO(seo): add each profile as it is created (LinkedIn, YouTube, X, Reddit,
  // Payhip). Brand mentions correlate ~3x more strongly with AI citations than
  // backlinks, so this is the highest-value field on this object once populated.
  // See tasks.md Phase 1.9.
  sameAs: [],
  // Ties the brand to the named human who writes the articles, so the
  // Organization and the Person in each article's schema resolve to one graph.
  founder: authorJsonLd,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Procrastitype",
  url: siteUrl,
  description:
    "Discover your procrastination type with a science-backed quiz, then break the pattern with targeted books and workbooks.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          No Google Fonts requests at runtime. Inter and Space Grotesk are
          self-hosted at build time by `next/font/google` above, and Material
          Symbols is a self-hosted subset declared in globals.css. That removes a
          render-blocking cross-origin stylesheet plus the preconnects to
          fonts.googleapis.com and fonts.gstatic.com that used to be needed.
        */}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-osmo-bg text-osmo-text font-sans`}
      >
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
