import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';
import { TrendDownIcon, TrendUpIcon } from '../icons';

export type TileColor = 'teal' | 'green' | 'purple' | 'blue' | 'amber' | 'red' | 'ink';

export interface SummaryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** What and when, uppercase in the card: "Income — Oct 2026" (UI rule 40). */
  label: ReactNode;
  /** Bold value. Shorten money with formatMoneyShort: ₦256.3K. */
  value: ReactNode;
  icon: ReactNode;
  /** Icon colour. Keep the same metric the same colour on every page. */
  color?: TileColor;
  /** Change against the previous period. `goodWhen: 'down'` for claims, expenses and expiries. */
  trend?: { value: number; label?: string; goodWhen?: 'up' | 'down' };
  /** Context line when there's no trend: "44 clients · 99% over 30 days". */
  hint?: ReactNode;
}

const tile: Record<TileColor, string> = {
  teal: 'bg-tile-teal-bg text-tile-teal-fg',
  green: 'bg-tile-green-bg text-tile-green-fg',
  purple: 'bg-tile-purple-bg text-tile-purple-fg',
  blue: 'bg-tile-blue-bg text-tile-blue-fg',
  amber: 'bg-tile-amber-bg text-tile-amber-fg',
  red: 'bg-tile-red-bg text-tile-red-fg',
  ink: 'bg-tile-ink-bg text-tile-ink-fg',
};

/**
 * Headline figure. Figma: white, 20px radius, 18px padding, icon on the left, uppercase label (11, muted),
 * value Bold 20. The icon sits in a tinted tile (derived) so the coloured icons pass contrast.
 */
export function SummaryCard({ label, value, icon, color = 'teal', trend, hint, className, ...rest }: SummaryCardProps) {
  const up = trend ? trend.value >= 0 : false;
  const good = trend ? (trend.goodWhen ?? 'up') === (up ? 'up' : 'down') : false;
  return (
    <div className={cx('flex min-w-0 items-center gap-3.5 rounded-xl bg-surface p-4.5 shadow-card', className)} {...rest}>
      <span className={cx('inline-flex size-tile shrink-0 items-center justify-center rounded-lg', tile[color])} aria-hidden>
        <span className="size-icon">{icon}</span>
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-11 font-medium uppercase tracking-wide text-fg-muted">{label}</span>
        <span className="truncate text-20 font-bold tabular-nums text-fg-strong">{value}</span>
        {trend ? (
          <span className="flex min-w-0 items-center gap-1 text-12 text-fg-muted">
            <span className={cx('inline-flex items-center gap-0.5 font-semibold', good ? 'text-success' : 'text-danger')}>
              <span className="size-3.5" aria-hidden>
                {up ? <TrendUpIcon /> : <TrendDownIcon />}
              </span>
              <span className="sr-only">{up ? 'Up' : 'Down'} </span>
              {`${up ? '+' : ''}${trend.value.toLocaleString('en-NG', { maximumFractionDigits: 1 })}%`}
            </span>
            {trend.label && <span className="truncate">{trend.label}</span>}
          </span>
        ) : (
          hint && <span className="truncate text-12 text-fg-muted">{hint}</span>
        )}
      </div>
    </div>
  );
}
