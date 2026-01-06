'use client';

interface QuizOptionProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  className?: string;
}

export default function QuizOption({ text, isSelected, onClick, index, className = '' }: QuizOptionProps) {
  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-300 
        border p-6 mb-3 group rounded-sm
        ${isSelected 
          ? 'bg-osmo-text/10 border-osmo-text/40' 
          : 'bg-transparent border-osmo-border hover:bg-osmo-text/5 hover:border-osmo-text/20'}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 mr-4">
          <div
            className={`
              w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300
              ${isSelected 
                ? 'border-osmo-text bg-osmo-text' 
                : 'border-osmo-border group-hover:border-osmo-text/40 bg-transparent'}
            `}
          >
            {isSelected && (
              <span className="text-osmo-bg text-xs font-bold material-symbols-outlined text-[14px]">check</span>
            )}
          </div>
        </div>
        <p
          className={`
            leading-relaxed text-sm sm:text-base transition-colors duration-300
            ${isSelected ? 'text-osmo-text font-medium' : 'text-osmo-muted group-hover:text-osmo-text'}
          `}
        >
          {text}
        </p>
      </div>
    </div>
  );
}