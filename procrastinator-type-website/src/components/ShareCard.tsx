'use client';

import { useState, useCallback } from 'react';
import { getPayhipBook, getShareCardUrl } from '../lib/payhip-links';

interface ShareCardProps {
  primaryType: string;
  className?: string;
}

export default function ShareCard({ primaryType, className = '' }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const book = getPayhipBook(primaryType);
  const cardUrl = getShareCardUrl(primaryType);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const quizUrl = `${origin}/quiz`;

  const shareText = useCallback(() => {
    const short = (book?.title ?? primaryType).replace(' Procrastinator', '');
    const article = /^[aeiou]/i.test(short) ? 'an' : 'a';
    const bookLine = book ? `\n\nRead the ${book.title} book: ${book.url}` : '';
    return `I'm ${article} ${short} procrastinator! Find out what procrastitype you are at ${quizUrl}${bookLine}`;
  }, [book, primaryType, quizUrl]);

  const handleDownload = async () => {
    if (!cardUrl) return;
    try {
      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = `procrastitype-${book?.cardSlug ?? primaryType}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const nativeShare = async () => {
    if (!cardUrl || !navigator.share) return;
    try {
      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const file = new File([blob], `procrastitype-${book?.cardSlug ?? primaryType}.png`, { type: 'image/png' });
      await navigator.share({
        title: "I'm a procrastinator!",
        text: shareText(),
        files: [file],
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!book || !cardUrl) return null;

  return (
    <div className={`p-8 border border-osmo-border ${className}`}>
      <h3 className="text-xl font-display font-light text-osmo-text mb-2 flex items-center gap-3">
        <span className="material-symbols-outlined font-light">campaign</span>
        Tell the World
      </h3>
      <p className="text-sm text-osmo-muted font-light mb-6">
        Share your procrastitype with your followers. Big or small, it's the same for all of us.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="mx-auto w-full max-w-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardUrl}
            alt={`I'm a ${book.title}`}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            disabled={busy}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-osmo-text text-osmo-bg rounded-full font-medium hover:scale-105 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="text-xs uppercase tracking-widest font-bold">Download Image</span>
          </button>

          {'share' in navigator && (
            <button
              onClick={nativeShare}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-osmo-border text-osmo-text rounded-full font-medium hover:bg-osmo-text/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              <span className="text-xs uppercase tracking-widest font-bold">Share</span>
            </button>
          )}

          <button
            onClick={copyLink}
            className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-full font-medium transition-all ${copied
              ? 'border-green-500/50 bg-green-500/10 text-green-600'
              : 'border-osmo-border text-osmo-text hover:bg-osmo-text/5'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'link'}</span>
            <span className="text-xs uppercase tracking-widest font-bold">{copied ? 'Copied!' : 'Copy Share Text'}</span>
          </button>

          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-osmo-border text-osmo-text rounded-full font-medium hover:bg-osmo-text/5 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Get the {book.title} book</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
