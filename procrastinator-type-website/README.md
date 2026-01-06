# Procrastination Types Explorer - Next.js App

A science-backed platform to help people understand their procrastination patterns through an interactive quiz and targeted content. Built with Next.js and featuring hand-drawn Excalidraw-style design.

## ✅ Features Implemented

- **Interactive Quiz System**: 35 research-backed questions with advanced scoring
- **Hand-drawn Design**: Rough.js integration with Virgil font for authentic sketchy look
- **Type Assessment**: Identifies primary + secondary procrastination types with confidence levels
- **Email Signup Integration**: ✅ **WORKING** - Google Sheets API for persistent email collection
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

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page
│   ├── quiz/
│   │   ├── page.tsx                 # Quiz interface
│   │   └── results/page.tsx         # Results display
│   ├── workbooks/page.tsx           # Email signup page
│   └── api/
│       └── email-signup/route.ts    # ✅ Google Sheets API endpoint
├── components/
│   ├── RoughCard.tsx               # Hand-drawn card component
│   ├── RoughTitle.tsx              # Hand-drawn title backgrounds
│   └── RoughButton.tsx             # Hand-drawn interactive buttons
└── lib/
    ├── quiz-data.ts                # Original 21-question system
    ├── improved-quiz-data.ts       # ✅ Enhanced 35-question system
    ├── improved-quiz-scoring.ts    # ✅ Advanced scoring algorithm
    └── quiz-utils.ts               # Quiz utilities
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

## Troubleshooting

- **Port conflicts**: App auto-detects available port (usually 3008 if 3000 is taken)
- **Email signup errors**: Check `GOOGLE_SHEETS_SETUP.md` for configuration
- **Build issues**: Ensure Node.js 18+ is installed
