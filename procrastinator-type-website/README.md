# Procrastination Types Explorer - Next.js App

A science-backed platform to help people understand their procrastination patterns through an interactive quiz and targeted content. Built with Next.js and featuring hand-drawn Excalidraw-style design.

## ✅ Features Implemented

- **Interactive Quiz System**: 35 research-backed questions with advanced scoring
- **Hand-drawn Design**: Rough.js integration with Virgil font for authentic sketchy look
- **Type Assessment**: Identifies primary + secondary procrastination types with confidence levels
- **Email Signup Integration**: ✅ **WORKING** - Google Sheets API for persistent email collection (on `/workbooks` and the quiz results page)
- **Live Book Sales**: ✅ Quiz results link straight to the Payhip store for the matched type
- **Share Cards**: ✅ Square "I'm a [type] procrastinator!" images (book-cover style) for download/share
- **SEO Foundation**: ✅ sitemap.xml, robots.txt, per-page metadata, canonical URLs, schema.org JSON-LD (Organization, WebSite, Quiz, Article, FAQPage, ItemList)
- **Content Hub**: ✅ Pillar page `/types` + 7 type guides with Article/FAQ schema (prose-lint clean, `writing_style.md` compliant)
- **Analytics**: ✅ Vercel Web Analytics (free, cookie-less) with 5 custom events (quiz_start, quiz_complete, share_click, email_signup, workbook_click)
- **Google Search Console**: ✅ Verification meta tag in site head (`verification.google` in `layout.tsx` metadata) + backup file at `/google87e4ddcc8e80c24b.html`
- **Mobile Responsive**: Optimized for all device sizes
- **Scientific Foundation**: Based on Ferrari (1991), Chu & Choi (2005), Steel (2007) research

## Getting Started

### Prerequisites
- Node.js 18+ installed
- ✅ Google Sheets integration already configured

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3008](http://localhost:3008) (or port shown in console) with your browser.

### ✅ Google Sheets Email Signup

The email signup system is **fully configured and working**:
- All environment variables are set in `.env` file
- API endpoint `/api/email-signup` is implemented and tested
- Form integration working on `/workbooks` page
- Ready for production deployment

See `GOOGLE_SHEETS_SETUP.md` for deployment instructions.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ✅ | Google Sheets service account for email signups |
| `GOOGLE_PRIVATE_KEY` | ✅ | Service account private key |
| `GOOGLE_SHEET_ID` | ✅ | Google Sheet ID for email signups |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical domain (`https://procrastitype.jnprojects.me`) used by sitemap.xml, robots.txt and schema.org markup |

Vercel Web Analytics needs **no** environment variables and no cookie banner (cookie-less, privacy-friendly). Custom events (quiz_start, quiz_complete, share_click, email_signup, workbook_click) are sent via `src/lib/analytics.ts` and appear in Vercel Dashboard → Analytics. The wrapper is provider-swappable (e.g., Plausible later).

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # SEO metadata, JSON-LD, analytics script
│   ├── sitemap.ts                   # XML sitemap (all routes)
│   ├── robots.ts                    # robots.txt
│   ├── quiz/
│   │   ├── page.tsx                 # Quiz interface
│   │   └── results/page.tsx         # Results display + workbook email capture
│   ├── types/                       # SEO content hub
│   │   ├── page.tsx                 # Pillar: 7 types, one H2 per type
│   │   └── <type>-procrastinator/   # 7 type guides (Article + FAQ schema)
│   ├── workbooks/page.tsx           # Email signup page
│   └── api/
│       └── email-signup/route.ts    # ✅ Google Sheets API endpoint
├── components/
│   ├── RoughCard.tsx               # Hand-drawn card component
│   ├── RoughTitle.tsx              # Hand-drawn title backgrounds
│   ├── RoughButton.tsx             # Hand-drawn interactive buttons
│   ├── SiteHeader.tsx              # Site header
│   └── SiteFooter.tsx              # Shared footer with type links
└── lib/
    ├── quiz-data.ts                # Original 21-question system
    ├── improved-quiz-data.ts       # ✅ Enhanced 35-question system
    ├── improved-quiz-scoring.ts    # ✅ Advanced scoring algorithm
    ├── analytics.ts                # Vercel analytics wrapper + events
    └── payhip-links.ts             # Payhip URLs per type
```

## Key Technologies

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **Rough.js** - Hand-drawn graphics library
- **Google Sheets API** ✅ - Email persistence
- **TypeScript** - Type safety

## ✅ Deploy on Vercel

**Production Ready** - follow these steps:

1. **Import Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Click "Import" and upload the `.env` file
   - Set `NEXT_PUBLIC_SITE_URL=https://procrastitype.jnprojects.me`
   - All Google Sheets credentials will be imported automatically

2. **Deploy**:
   ```bash
   # Connect to Vercel (if not already)
   npx vercel

   # Deploy
   npx vercel --prod
   ```

3. **Verify Email Signup**:
   - Visit your deployed site `/workbooks` page
   - Test email signup form
   - ✅ Emails will automatically save to your Google Sheet

4. **Search Engine Verification** ✅ **DONE (2026-08-03)**:
   - GSC property verified via the **HTML tag** method (meta tag already in the head of every page via `layout.tsx`)
   - Sitemap submitted in Google Search Console **and** Bing Webmaster Tools (imported from GSC)
   - Indexing requested for home, quiz, workbooks and all 7 `/types` pages
   - The old HTML-file method (`/google87e4ddcc8e80c24b.html`) also works as a backup
   - Analytics events appear automatically in Vercel Dashboard → Analytics (no setup)

## Troubleshooting

- **Port conflicts**: App auto-detects available port (usually 3008 if 3000 is taken)
- **Email signup errors**: Check `GOOGLE_SHEETS_SETUP.md` for configuration
- **Build issues**: Ensure Node.js 18+ is installed
