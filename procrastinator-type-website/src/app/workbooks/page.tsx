'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HandDrawnIcon from '../../components/HandDrawnIcon';

const procrastinationTypes = {
  'arousal': { title: 'Arousal Procrastinator', icon: 'lightning' },
  'avoidant': { title: 'Avoidant Procrastinator', icon: 'shield' },
  'decisional': { title: 'Decisional Procrastinator', icon: 'scales' },
  'active': { title: 'Active Procrastinator', icon: 'target' },
  'passive': { title: 'Passive Procrastinator', icon: 'cyclone' },
  'emotion': { title: 'Emotion-Regulation Procrastinator', icon: 'brain' },
  'perfectionist': { title: 'Perfectionist Procrastinator', icon: 'diamond' }
};

function WorkbooksPageContent() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Check if user came from quiz results
  const userType = searchParams.get('type') as keyof typeof procrastinationTypes;
  const fromQuiz = !!userType;
  
  const typeInfo = userType ? procrastinationTypes[userType] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: userType || 'general',
          source: fromQuiz ? 'quiz' : 'landing'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-warm-white py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <div className="mb-8">
              <HandDrawnIcon name="sparkles" size={80} className="mx-auto mb-4 text-terracotta" />
            </div>
            
            <h1 className="text-4xl font-bold text-charcoal mb-6">
              Thanks for signing up!
            </h1>
            
            <div className="p-8 bg-white rounded-lg border-sketch mb-8">
              <p className="text-lg text-slate mb-4">
                {fromQuiz ? (
                  <>We'll notify you as soon as the <strong>{typeInfo?.title}</strong> workbook is ready.</>
                ) : (
                  <>We'll notify you when our workbooks are available.</>
                )}
              </p>
              <p className="text-slate-light">
                No spam, just updates when your personalized content is ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="px-6 py-3 border-2 border-charcoal rounded-full font-semibold text-charcoal transition-all duration-300 hover:bg-sage/10 hover-lift cursor-sketch"
              >
                Back to Home
              </Link>
              {!fromQuiz && (
                <Link 
                  href="/quiz"
                  className="px-6 py-3 border-2 border-charcoal rounded-full font-semibold text-charcoal transition-all duration-300 hover:bg-terracotta/10 hover-lift cursor-sketch"
                >
                  Take Quiz
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Workbooks
            <span className="block text-terracotta underline-sketch">
              Coming Soon
            </span>
          </h1>
        </div>

        <div className="p-8 bg-white rounded-lg border-sketch mb-8">
          {fromQuiz && typeInfo ? (
            // User came from quiz results
            <div className="text-center">
              <div className="mb-6">
                <HandDrawnIcon name={typeInfo.icon} size={64} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  You're an <span className="text-terracotta">{typeInfo.title}</span>
                </h2>
              </div>
              
              <p className="text-lg text-slate mb-6">
                Your personalized workbook is currently in development. 
                Sign up to get notified when it's ready!
              </p>
              
              <p className="text-sm text-slate-light mb-8">
                No spam – we'll only email you when your specific workbook is available.
              </p>
            </div>
          ) : (
            // User came from landing page
            <div className="text-center">
              <h2 className="text-2xl font-bold text-charcoal mb-4">
                Personalized Workbooks in Development
              </h2>
              
              <p className="text-lg text-slate mb-6">
                We're creating comprehensive 31-day workbooks for each procrastination type, 
                with targeted exercises and evidence-based strategies.
              </p>
              
              <div className="mb-6 p-4 bg-ochre/10 rounded-lg border border-ochre/20">
                <p className="text-slate">
                  <strong>Want the most relevant workbook?</strong> Take our assessment first to identify your specific procrastination type.
                </p>
                <Link 
                  href="/quiz"
                  className="inline-block mt-3 px-4 py-2 border-2 border-ochre rounded-full font-semibold text-ochre transition-all duration-300 hover:bg-ochre/10"
                >
                  Take the Quiz First
                </Link>
              </div>
              
              <p className="text-sm text-slate-light mb-8">
                Or sign up below for general updates on all workbooks.
              </p>
            </div>
          )}

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 border-2 border-slate/30 rounded-lg font-readable text-charcoal placeholder-slate-light focus:border-terracotta focus:outline-none transition-colors"
                required
              />
              
              {error && (
                <p className="text-sm text-terracotta">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 border-2 border-charcoal rounded-full font-semibold text-charcoal transition-all duration-300 hover:bg-terracotta/10 hover-lift cursor-sketch disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing up...' : 'Notify Me'}
              </button>
            </div>
          </form>
        </div>

        {/* Back Navigation */}
        <div className="text-center">
          <Link 
            href="/"
            className="px-6 py-3 border-2 border-sage rounded-full font-semibold text-charcoal transition-all duration-300 hover:bg-sage/10 hover-lift cursor-sketch"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WorkbooksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-white py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate">Loading...</p>
        </div>
      </div>
    }>
      <WorkbooksPageContent />
    </Suspense>
  );
}