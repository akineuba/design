import { cx } from '../lib/cx';
import { daysUntil, formatDate } from '../lib/money';

export interface ExpiryBadgeProps {
  /** Policy end date. */
  date: Date | string;
  /** Days before expiry that count as "expiring". Default 30. */
  warnDays?: number;
  /** Reference date (tests and docs). Defaults to today. */
  today?: Date;
  /** Also show the date itself on a second line. */
  showDate?: boolean;
}

/**
 * Days left on a policy, coloured by urgency: more than `warnDays` = neutral, within = amber,
 * passed = red. Replaces the bare "-28" in the live "Policies Expiring Soon" table with words.
 */
export function ExpiryBadge({ date, warnDays = 30, today, showDate }: ExpiryBadgeProps) {
  const d = daysUntil(date, today);
  const tone = d < 0 ? 'error' : d <= warnDays ? 'warning' : 'neutral';
  const text = d < 0 ? `Expired ${-d} day${d === -1 ? '' : 's'} ago` : d === 0 ? 'Expires today' : `${d} day${d === 1 ? '' : 's'} left`;
  return (
    <span className="inline-flex flex-col gap-0.5">
      <span
        className={cx(
          'inline-flex h-pill w-fit items-center rounded-full px-2.5 text-12 font-semibold tabular-nums',
          tone === 'error' && 'bg-status-error-bg text-status-error-fg',
          tone === 'warning' && 'bg-status-warning-bg text-status-warning-fg',
          tone === 'neutral' && 'bg-status-neutral-bg text-status-neutral-fg',
        )}
      >
        {text}
      </span>
      {showDate && <span className="text-11 text-fg-muted">{formatDate(date)}</span>}
    </span>
  );
}
