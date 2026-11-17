import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowDownRightIcon, ArrowUpRightIcon } from '../../icons';

export type SummaryTileColor = 'green' | 'blue' | 'amber' | 'teal' | 'red';

export interface SummaryTrend {
  /** Change in percent, e.g. -93.5. The sign sets the arrow. */
  value: number;
  /** What it is compared with: "vs September". */
  label?: ReactNode;
  /** Which direction is good news. Net pay going up is good; overdue going up is bad. */
  goodWhen?: 'up' | 'down';
}

export interface SummaryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** What and when: "Net pay — October". */
  label: ReactNode;
  value: ReactNode;
  /** Icon in the coloured tile on the left. */
  icon: ReactNode;
  /** Tile colour. Give each card in a row its own colour; keep the same metric the same colour across pages. */
  color?: SummaryTileColor;
  /** Change against the previous period. */
  trend?: SummaryTrend;
  /** Context line when there is no trend: "1 run this month". */
  hint?: ReactNode;
}

const tile: Record<SummaryTileColor, string> = {
  green: 'bg-tile-green-bg text-tile-green-fg',
  blue: 'bg-tile-blue-bg text-tile-blue-fg',
  amber: 'bg-tile-amber-bg text-tile-amber-fg',
  teal: 'bg-tile-teal-bg text-tile-teal-fg',
  red: 'bg-tile-red-bg text-tile-red-fg',
};

const pct = (n: number) => `${n > 0 ? '+' : ''}${n.toLocaleString('en-NG', { maximumFractionDigits: 1 })}%`;

/**
 * Headline figure for the top of a page or dashboard, with a coloured icon tile on the left, the value
 * large and bold, and a trend or context line. From the live product reference (payroll summary row),
 * with the icon moved to the left as requested by design. Colours are derived tokens.
 */
export function SummaryCard({ label, value, icon, color = 'blue', trend, hint, className, ...rest }: SummaryCardProps) {
  const up = trend ? trend.value >= 0 : false;
  const good = trend ? (trend.goodWhen ?? 'up') === (up ? 'up' : 'down') : false;
  return (
    <div className={cx('flex min-w-0 items-center gap-4 rounded-xl border border-line-subtle bg-surface p-5', className)} {...rest}>
      <span className={cx('inline-flex size-tile shrink-0 items-center justify-center rounded-xl', tile[color])} aria-hidden>
        <span className="size-icon">{icon}</span>
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-sans text-sm font-medium text-fg-muted">{label}</span>
        <span className="truncate font-sans text-xl font-bold text-fg-ink">{value}</span>
        {trend ? (
          <span className="flex min-w-0 items-center gap-1 font-sans text-13 text-fg-muted">
            <span className={cx('inline-flex items-center gap-0.5 font-semibold', good ? 'text-trend-up' : 'text-trend-down')}>
              <span className="size-icon-xs" aria-hidden>{up ? <ArrowUpRightIcon /> : <ArrowDownRightIcon />}</span>
              <span className="sr-only">{up ? 'Up' : 'Down'} </span>
              {pct(trend.value)}
            </span>
            {trend.label && <span className="truncate">{trend.label}</span>}
          </span>
        ) : (
          hint && <span className="truncate font-sans text-13 text-fg-muted">{hint}</span>
        )}
      </div>
    </div>
  );
}
