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

import { siteUrl } from "@/lib/seo";

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
  // TODO(seo): populate with every profile that exists (LinkedIn, YouTube, X,
  // Reddit, Payhip). An empty array gives search + AI systems zero entity
  // disambiguation signals, and brand mentions correlate ~3x more strongly with
  // AI citations than backlinks. See tasks.md Phase 1.9.
  sameAs: [],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Material Symbols, subset to only the icons this site actually draws.
          Without `icon_names` Google serves every glyph in the set: 1,127,076
          bytes, which made an icon the largest contentful paint on the page and
          pushed mobile LCP to 3.1s. Subsetting takes the same font to 8,900
          bytes. The `wght,FILL` axis range is kept as-is because some icons are
          rendered with `font-light` / `font-extralight`.

          IMPORTANT: this list must contain every icon name used anywhere,
          including the ones passed through variables. A name that is missing
          renders as its literal text ("psychology") instead of a glyph. Current
          dynamic call sites: HomeClient.tsx (`{type.icon}`), ShareCard.tsx
          (`check`/`link`), ShareButton.tsx (`check`/`content_copy`),
          SiteHeader.tsx (`close`/`menu`). Keep the list sorted.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=analytics,arrow_back,arrow_forward,balance,campaign,check,close,content_copy,crisis_alert,cyclone,dark_mode,download,ios_share,light_mode,lightbulb,link,menu,north_east,psychology,share,shield,timer,verified&display=swap"
          rel="stylesheet"
        />
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
