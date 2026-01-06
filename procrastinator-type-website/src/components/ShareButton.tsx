'use client';

import { useState } from 'react';

interface ShareButtonProps {
  resultData: {
    primaryType: string;
    typeTitle: string;
    typeDescription: string;
    confidence?: string;
    likelihood?: number;
  };
  className?: string;
}

export default function ShareButton({ resultData, className = '' }: ShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate shareable text
  const generateShareText = () => {
    const baseText = `I just discovered I'm a ${resultData.typeTitle}! ${resultData.typeDescription}`;
    const confidence = resultData.confidence ? ` (${resultData.confidence} confidence)` : '';
    const likelihood = resultData.likelihood ? ` (${resultData.likelihood}% match)` : '';

    return `${baseText}${confidence}${likelihood}

Discover your procrastination type: ${window.location.origin}/quiz`;
  };

  // Generate short share text for character-limited platforms
  const generateShortShareText = () => {
    return `I'm a ${resultData.typeTitle}! Discover your procrastination type: ${window.location.origin}/quiz`;
  };

  // Social media share URLs
  const shareUrls = {
    twitter: () => {
      const text = encodeURIComponent(generateShortShareText());
      return `https://twitter.com/intent/tweet?text=${text}`;
    },
    facebook: () => {
      const url = encodeURIComponent(`${window.location.origin}/quiz`);
      const quote = encodeURIComponent(generateShareText());
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    },
    linkedin: () => {
      const url = encodeURIComponent(`${window.location.origin}/quiz`);
      const title = encodeURIComponent(`I discovered I'm a ${resultData.typeTitle}!`);
      const summary = encodeURIComponent(resultData.typeDescription);
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    },
    reddit: () => {
      const url = encodeURIComponent(`${window.location.origin}/quiz`);
      const title = encodeURIComponent(`I discovered I'm a ${resultData.typeTitle} - What's your procrastination type?`);
      return `https://reddit.com/submit?url=${url}&title=${title}`;
    },
    whatsapp: () => {
      const text = encodeURIComponent(generateShareText());
      return `https://wa.me/?text=${text}`;
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Open share in new window
  const openShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  // Native share (for mobile)
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${resultData.typeTitle}!`,
          text: generateShareText(),
          url: `${window.location.origin}/quiz`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <>
      <button
        className={`px-6 py-3 border border-osmo-border rounded-full font-semibold text-osmo-text transition-all duration-300 hover:bg-osmo-text/10 flex items-center gap-2 ${className}`}
        onClick={() => setShowShareModal(true)}
      >
        <span className="material-symbols-outlined text-[18px]">share</span>
        Share Results
      </button>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-osmo-bg/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-500">
          <div className="bg-osmo-surface rounded-xl border border-osmo-border max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display text-osmo-text">Share Your Results</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-osmo-muted hover:text-osmo-text transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Native Share (Mobile) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={nativeShare}
                className="w-full mb-4 p-3 border border-osmo-border rounded-lg font-medium text-osmo-text hover:bg-osmo-text/5 transition-all duration-300 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px] mr-2">ios_share</span>
                Share via Device
              </button>
            )}

            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => openShare(shareUrls.twitter())}
                className="p-3 bg-osmo-text/5 hover:bg-osmo-text/10 border border-osmo-border text-osmo-text rounded-lg transition-colors flex items-center justify-center font-medium"
              >
                <span className="mr-2 opacity-70">🐦</span> Twitter
              </button>

              <button
                onClick={() => openShare(shareUrls.facebook())}
                className="p-3 bg-osmo-text/5 hover:bg-osmo-text/10 border border-osmo-border text-osmo-text rounded-lg transition-colors flex items-center justify-center font-medium"
              >
                <span className="mr-2 opacity-70">📘</span> Facebook
              </button>

              <button
                onClick={() => openShare(shareUrls.linkedin())}
                className="p-3 bg-osmo-text/5 hover:bg-osmo-text/10 border border-osmo-border text-osmo-text rounded-lg transition-colors flex items-center justify-center font-medium"
              >
                <span className="mr-2 opacity-70">💼</span> LinkedIn
              </button>

              <button
                onClick={() => openShare(shareUrls.whatsapp())}
                className="p-3 bg-osmo-text/5 hover:bg-osmo-text/10 border border-osmo-border text-osmo-text rounded-lg transition-colors flex items-center justify-center font-medium"
              >
                <span className="mr-2 opacity-70">💬</span> WhatsApp
              </button>

              <button
                onClick={() => openShare(shareUrls.reddit())}
                className="p-3 bg-osmo-text/5 hover:bg-osmo-text/10 border border-osmo-border text-osmo-text rounded-lg transition-colors flex items-center justify-center font-medium"
              >
                <span className="mr-2 opacity-70">🔗</span> Reddit
              </button>
            </div>

            {/* Copy Link */}
            <div className="border-t border-osmo-border pt-4">
              <p className="text-sm text-osmo-muted mb-3">Or copy this text to share anywhere:</p>
              <div className="bg-osmo-bg p-3 rounded-lg mb-3 border border-osmo-border">
                <p className="text-sm text-osmo-muted leading-relaxed font-mono">
                  {generateShareText()}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className={`w-full p-3 border rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${copied
                    ? 'border-green-500/50 bg-green-500/10 text-green-600'
                    : 'border-osmo-border text-osmo-text hover:bg-osmo-text/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-2">
                  {copied ? "check" : "content_copy"}
                </span>
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}