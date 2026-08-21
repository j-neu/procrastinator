import type { TypeDistributionEntry } from '@/lib/quiz-stats';

/**
 * Single-series bar list: one accent hue for every bar (identity comes from
 * the row label, not from color), so no legend box. See the dataviz skill's
 * color-formula reference for why a nominal single metric works this way.
 * Percentages only, by design -- never pass or render a raw respondent count
 * here (see getQuizStats in src/lib/quiz-stats.ts).
 */
export default function TypeDistributionChart({ data }: { data: TypeDistributionEntry[] }) {
  return (
    <div className="space-y-5">
      {data.map((entry) => (
        <div key={entry.typeKey} className="flex items-center gap-4">
          <span className="w-44 shrink-0 text-sm text-osmo-text font-medium">{entry.title}</span>
          <div className="flex-1 h-2.5 rounded-[4px] bg-osmo-border overflow-hidden">
            <div
              className="h-full bg-chart-accent rounded-r-[4px]"
              style={{ width: `${entry.percentage}%` }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-sm text-osmo-muted tabular-nums">
            {entry.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}
