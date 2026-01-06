'use client';

interface QuizProgressProps {
  current: number;
  total: number;
  className?: string;
}

export default function QuizProgress({ current, total, className = '' }: QuizProgressProps) {
  // Calculate percentage based on completed questions (current - 1)
  const percentage = Math.round(((current - 1) / total) * 100);

  return (
    <div className={`flex flex-col items-center mb-12 ${className}`}>
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-osmo-muted">
          Question {current.toString().padStart(2, '0')}
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-osmo-muted">
          of {total.toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="w-full max-w-sm h-1 bg-osmo-text/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-osmo-text transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="mt-4">
        <span className="text-xs font-medium text-osmo-muted uppercase tracking-wider">
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
}