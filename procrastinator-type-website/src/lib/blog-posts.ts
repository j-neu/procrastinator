// Registry of blog posts for the /blog index page.
//
// Each post's own metadata and JSON-LD stay defined in its own
// src/app/blog/<slug>/page.tsx -- this file is only the list the index page
// renders from, so add an entry here whenever a new post ships. Keep newest
// first; the index page treats BLOG_POSTS[0] as the featured post.

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  // Site-relative image path. Falls back to the default share card for
  // posts that don't have their own (matches DEFAULT_OG_IMAGE in lib/seo.ts).
  image: string;
  datePublished: string;
  dateModified: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'avoidant-procrastination-subtypes',
    title: 'Not All Avoidant Procrastinators Delay the Same Way',
    description:
      'Fifty-four percent of Procrastitype quiz takers land on Avoidant. Five separate, research-backed patterns explain why one label cannot cover all of them.',
    image: '/share-cards/avoidance.png',
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
  },
  {
    slug: 'best-procrastination-tests',
    title: '6 Procrastination Tests Compared: Which Is Worth Your Time',
    description:
      'Procrastitype, IDR Labs, Psychology Today, Liven, Deepwrk and Freudly compared on length, types identified, cost and research basis. Verified 2026-08-17.',
    image: '/share-cards/default.png',
    datePublished: '2026-08-18',
    dateModified: '2026-08-18',
  },
  {
    slug: 'why-you-procrastinate',
    title: 'Why You Procrastinate: ACT, CBT & Cognitive Dismantling',
    description:
      'It is not laziness. It is an addiction to safety. The psychology of cognitive dismantling and how to break the cycle.',
    image: '/share-cards/default.png',
    datePublished: '2026-08-03',
    dateModified: '2026-08-03',
  },
];
