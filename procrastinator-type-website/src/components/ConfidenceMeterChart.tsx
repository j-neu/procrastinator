import type { TypeDistributionEntry } from '@/lib/quiz-stats';

const SEGMENT_COLOR: Record<string, string> = {
  high: 'bg-chart-confidence-high',
  medium: 'bg-chart-confidence-medium',
  low: 'bg-chart-confidence-low',
};

/**
 * Single segmented "meter" bar: one hue, three lightness steps (an ordinal
 * ramp, since confidence is ranked, unlike the nominal type charts). A 2px
 * surface gap separates the segments instead of a border, per the dataviz
 * skill's mark spec. The lightest step (low) sits below the categorical 3:1
 * contrast floor by design in light mode, which is why every segment ships
 * with a direct label below rather than relying on the fill alone.
 */
export default function ConfidenceMeterChart({ data }: { data: TypeDistributionEntry[] }) {
  return (
    <div>
      <div className="flex h-4 gap-[2px] rounded-[4px] overflow-hidden bg-osmo-border">
        {data.map((entry, index) => (
          <div
            key={entry.typeKey}
            className={`h-full ${SEGMENT_COLOR[entry.typeKey] ?? 'bg-chart-accent'} animate-grow-x`}
            style={{ width: `${entry.percentage}%`, animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4">
        {data.map((entry) => (
          <div key={entry.typeKey} className="flex items-center gap-2 text-sm">
            <span className={`size-2.5 rounded-full ${SEGMENT_COLOR[entry.typeKey] ?? 'bg-chart-accent'}`} />
            <span className="text-osmo-text font-medium">{entry.title}</span>
            <span className="text-osmo-muted tabular-nums">{entry.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
