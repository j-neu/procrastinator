import type { TypeDistributionEntry } from '@/lib/quiz-stats';

const SLICE_FILL: Record<string, string> = {
  high: 'fill-chart-confidence-high',
  medium: 'fill-chart-confidence-medium',
  low: 'fill-chart-confidence-low',
};

const SWATCH_BG: Record<string, string> = {
  high: 'bg-chart-confidence-high',
  medium: 'bg-chart-confidence-medium',
  low: 'bg-chart-confidence-low',
};

const CX = 120;
const CY = 120;
const RADIUS = 78;
const EXPLODE = 12;

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

/**
 * Exploded pie: 3 ordinal segments (High/Medium/Low), one hue at 3
 * lightness steps -- same ramp used elsewhere for confidence, just a
 * different form. Angle fractions are computed from the actual values
 * relative to each other (not assumed to sum to exactly 100), so small
 * rounding drift in the displayed percentages never leaves a visible gap
 * or overlap in the circle.
 */
export default function ConfidencePieChart({ data }: { data: TypeDistributionEntry[] }) {
  const total = data.reduce((sum, entry) => sum + entry.percentage, 0);

  let cursor = 0;
  const slices = data.map((entry, index) => {
    const sweep = total > 0 ? (entry.percentage / total) * 360 : 0;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;

    const start = polar(startAngle, RADIUS);
    const end = polar(endAngle, RADIUS);
    const largeArc = sweep > 180 ? 1 : 0;
    const path = `M ${CX} ${CY} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;

    const mid = (startAngle + endAngle) / 2;
    const offset = polar(mid, EXPLODE);

    return { entry, path, dx: offset.x - CX, dy: offset.y - CY, index };
  });

  return (
    <div>
      <svg viewBox="0 0 240 240" className="w-full max-w-[260px] mx-auto block" role="img" aria-label="Confidence level breakdown">
        {slices.map(({ entry, path, dx, dy, index }) => (
          <g key={entry.typeKey} style={{ transform: `translate(${dx}px, ${dy}px)` }}>
            <path
              d={path}
              className={`${SLICE_FILL[entry.typeKey] ?? 'fill-chart-accent'} stroke-osmo-bg animate-pie-slice`}
              strokeWidth={3}
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${index * 120}ms` }}
            />
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6">
        {data.map((entry) => (
          <div key={entry.typeKey} className="flex items-center gap-2 text-sm">
            <span className={`size-2.5 rounded-full ${SWATCH_BG[entry.typeKey] ?? 'bg-chart-accent'}`} />
            <span className="text-osmo-text font-medium">{entry.title}</span>
            <span className="text-osmo-muted tabular-nums">{entry.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
