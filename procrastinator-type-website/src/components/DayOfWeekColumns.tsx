import type { TypeDistributionEntry } from '@/lib/quiz-stats';

/**
 * Vertical column form -- deliberately a different orientation from the
 * horizontal bar lists elsewhere on the page. Flat single accent hue: day
 * order is calendar order, not a magnitude ramp, so an ordinal lightness
 * step here would misleadingly imply weekday position predicts volume
 * (see the comment on dayOfWeekDistribution in src/lib/quiz-stats.ts).
 * Scaled to the tallest column, not an absolute 0-100 axis, since these are
 * 7 roughly-even shares of ~14% each and an absolute scale would flatten
 * every column to near-invisible.
 */
export default function DayOfWeekColumns({ data }: { data: TypeDistributionEntry[] }) {
  const max = Math.max(...data.map((entry) => entry.percentage), 1);

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-4 h-36">
      {data.map((entry, index) => (
        <div key={entry.typeKey} className="flex-1 flex flex-col items-center h-full">
          <span className="text-xs text-osmo-muted tabular-nums mb-2">{entry.percentage}%</span>
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full bg-chart-accent rounded-t-[4px] animate-grow-y"
              style={{ height: `${(entry.percentage / max) * 100}%`, animationDelay: `${index * 60}ms` }}
            />
          </div>
          <span className="text-xs text-osmo-muted mt-2">{entry.title}</span>
        </div>
      ))}
    </div>
  );
}
