// Payhip store links for the cognitive dismantling books, keyed by the
// quiz result type key (see improved-quiz-scoring.ts). Each type maps to a
// Payhip product slug whose URL lives in the repo root at PayhipLinks.md.
//
// The quiz result `primaryType` is one of: arousal, avoidant, decisional,
// perfectionist, passive, active, emotionRegulation.

export interface PayhipBook {
  slug: string;
  title: string;
  url: string;
  // Filename (minus .png) of the square social share card served from
  // /share-cards/. See the share-cards generator at the repo root.
  cardSlug: string;
  // Muted background palette, mirroring book-covers/covers.config.js so the
  // shareable images match the printed covers.
  palette: {
    primary: string;
    deep: string;
    shade: string;
  };
}

export const PAYHIP_BASE_URL = 'https://payhip.com';

/**
 * The storefront listing all 7 books. Also hardcoded in
 * share-cards/share-cards.config.js; this is the single source of truth for
 * anything rendered by the site.
 */
export const PAYHIP_STORE_URL = 'https://payhip.com/Procrastitype';

/**
 * Price per book, maintained by hand.
 *
 * Payhip product pages return 403 to crawlers and the store does not appear in
 * search for the brand, so the figure cannot be verified externally and the
 * on-site display is the only machine-readable copy of it. Update here and it
 * propagates to every CTA.
 */
export const BOOK_PRICE_EUR = 5;
export const BOOK_PRICE_LABEL = `€${BOOK_PRICE_EUR}`;

export const PAYHIP_BOOKS: Record<string, PayhipBook> = {
  arousal: {
    slug: 'arousal',
    title: 'Arousal Procrastinator',
    url: 'https://payhip.com/b/D9TpI',
    cardSlug: 'arousal',
    palette: { primary: '#b97a55', deep: '#96614a', shade: '#aa6f4e' },
  },
  avoidant: {
    slug: 'avoidance',
    title: 'Avoidance Procrastinator',
    url: 'https://payhip.com/b/IYDC1',
    cardSlug: 'avoidance',
    palette: { primary: '#8a9a82', deep: '#6f8169', shade: '#7d8d75' },
  },
  decisional: {
    slug: 'decisional',
    title: 'Decisional Procrastinator',
    url: 'https://payhip.com/b/WKSjw',
    cardSlug: 'decisional',
    palette: { primary: '#4f8a8a', deep: '#396b6b', shade: '#457a7a' },
  },
  perfectionist: {
    slug: 'perfectionist',
    title: 'Perfectionist Procrastinator',
    url: 'https://payhip.com/b/cIwO0',
    cardSlug: 'perfectionist',
    palette: { primary: '#6b7078', deep: '#4d525a', shade: '#5d626a' },
  },
  passive: {
    slug: 'passive',
    title: 'Passive Procrastinator',
    url: 'https://payhip.com/b/eiqDR',
    cardSlug: 'passive',
    palette: { primary: '#6d6a9e', deep: '#514e7d', shade: '#605d8d' },
  },
  active: {
    slug: 'active',
    title: 'Active Procrastinator',
    url: 'https://payhip.com/b/4aK87',
    cardSlug: 'active',
    palette: { primary: '#5b7691', deep: '#40596f', shade: '#506a82' },
  },
  emotionRegulation: {
    slug: 'emotion-regulation',
    title: 'Emotion-Regulation Procrastinator',
    url: 'https://payhip.com/b/MBGQX',
    cardSlug: 'emotion-regulation',
    palette: { primary: '#8a7a99', deep: '#6b5d78', shade: '#7d6f8c' },
  },
};

export function getPayhipBook(typeKey: string): PayhipBook | undefined {
  return PAYHIP_BOOKS[typeKey];
}

// URL of the square social share card served as a static asset.
export function getShareCardUrl(typeKey: string): string | undefined {
  const book = PAYHIP_BOOKS[typeKey];
  return book ? `/share-cards/${book.cardSlug}.png` : undefined;
}
