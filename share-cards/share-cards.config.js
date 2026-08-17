// Share-card configuration.
//
// Produces a square (1:1) social share card per procrastination type in the
// same visual language as the book covers (Space Grotesk / Space Mono, muted
// per-type palette, paper grain, vignette, corner ticks, PROCRASTITYPE
// wordmark). The card reads: "I'm an [TYPE] Procrastinator! Take the quiz →
// https://procrastitype.jnorthwood.com/quiz" plus the exact Payhip product link
// for that book and the Payhip shop for all books.
//
// Keys here match the quiz result `primaryType` keys from the site's
// improved-quiz-scoring.ts (arousal, avoidant, decisional, perfectionist,
// passive, active, emotionRegulation).

const SERIES_NAME = "P&nbsp;R&nbsp;O&nbsp;C&nbsp;R&nbsp;A&nbsp;S&nbsp;T&nbsp;I&nbsp;T&nbsp;Y&nbsp;P&nbsp;E";
const QUIZ_URL = "procrastitype.jnorthwood.com/quiz";
const EYEBROW = "What's yours?";

// The Payhip shop that hosts all the books.
const SHOP_URL = "payhip.com/Procrastitype";

const CARDS = [
  {
    slug: "arousal",
    article: "an",
    titleLines: ["Arousal", "Procrastinator"],
    titleSize: 92,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/D9TpI",
    palette: { primary: "#b97a55", deep: "#96614a", shade: "#aa6f4e" },
  },
  {
    slug: "avoidance",
    article: "an",
    titleLines: ["Avoidance", "Procrastinator"],
    titleSize: 92,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/IYDC1",
    palette: { primary: "#8a9a82", deep: "#6f8169", shade: "#7d8d75" },
  },
  {
    slug: "decisional",
    article: "a",
    titleLines: ["Decisional", "Procrastinator"],
    titleSize: 92,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/WKSjw",
    palette: { primary: "#4f8a8a", deep: "#396b6b", shade: "#457a7a" },
  },
  {
    slug: "perfectionist",
    article: "a",
    titleLines: ["Perfectionist", "Procrastinator"],
    titleSize: 78,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/cIwO0",
    palette: { primary: "#6b7078", deep: "#4d525a", shade: "#5d626a" },
  },
  {
    slug: "passive",
    article: "a",
    titleLines: ["Passive", "Procrastinator"],
    titleSize: 92,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/eiqDR",
    palette: { primary: "#6d6a9e", deep: "#514e7d", shade: "#605d8d" },
  },
  {
    slug: "active",
    article: "an",
    titleLines: ["Active", "Procrastinator"],
    titleSize: 92,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/4aK87",
    palette: { primary: "#5b7691", deep: "#40596f", shade: "#506a82" },
  },
  {
    slug: "emotion-regulation",
    article: "an",
    titleLines: ["Emotion", "Regulation", "Procrastinator"],
    titleSize: 74,
    subtitle: "Take the 5-minute quiz.",
    bookUrl: "payhip.com/b/MBGQX",
    palette: { primary: "#8a7a99", deep: "#6b5d78", shade: "#7d6f8c" },
  },
];

// The generic fallback card, used as og:image / twitter:image on every route
// that has no type-specific card of its own (home, /quiz, /workbooks, /types,
// /blog/*, the legal pages). Landscape 1200x630 because that is the aspect
// ratio Facebook, LinkedIn, Slack and X all crop to; the square type cards are
// sized for Instagram/WhatsApp instead.
//
// `pageMetadata()` in the site's src/lib/seo.ts points at /share-cards/default.png,
// so renaming the slug means updating DEFAULT_OG_IMAGE there too.
const DEFAULT_CARD = {
  slug: "default",
  variant: "landscape",
  width: 1200,
  height: 630,
  // Brand-level card, so no "I'm a [type]" claim and no single book link.
  claim: null,
  bookUrl: null,
  eyebrow: "Free 5-min quiz",
  titleLines: ["The 7 Types", "of Procrastination"],
  titleSize: 74,
  subtitle: "Find out which one is yours, and what actually works for it.",
  // Deliberately not any single type's colour: a neutral slate reads as the
  // series rather than as one of the seven.
  palette: { primary: "#55606b", deep: "#3a434c", shade: "#4a545e" },
};

module.exports = {
  SERIES_NAME,
  QUIZ_URL,
  EYEBROW,
  SHOP_URL,
  CARDS,
  DEFAULT_CARD,
};
