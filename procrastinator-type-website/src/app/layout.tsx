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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://procrastitype.jnprojects.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Procrastitype - Procrastination Quiz: Discover Your Type in 5 Minutes",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
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
