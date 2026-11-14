import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { formatDate, type Currency } from '../lib/money';
import { AgricIcon, AviationIcon, FireIcon, HealthIcon, InsuranceIcon, MotorIcon } from '../icons';
import { RecordStatus, type KnownStatus } from '../components/StatusPill';
import { ExpiryBadge } from './ExpiryBadge';
import { MoneyDisplay } from './Money';

export type PolicyClass = 'motor' | 'health' | 'agric' | 'aviation' | 'fire' | 'other';

export interface PolicyCardProps {
  policyNo: string;
  client: string;
  /** Class of business label: "Agric Insurance", "All Risk". */
  type: string;
  policyClass?: PolicyClass;
  insurer: string;
  premium: number;
  currency?: Currency;
  start: Date | string;
  end: Date | string;
  status: KnownStatus;
  /** ⋯ ActionMenu. */
  actions?: ReactNode;
  onOpen?: () => void;
  selected?: boolean;
  today?: Date;
}

const classIcon: Record<PolicyClass, ReactNode> = {
  motor: <MotorIcon />,
  health: <HealthIcon />,
  agric: <AgricIcon />,
  aviation: <AviationIcon />,
  fire: <FireIcon />,
  other: <InsuranceIcon />,
};

/** One policy in the grid view (the list/grid toggle in Figma has no grid design; this fills it). */
export function PolicyCard({ policyNo, client, type, policyClass = 'other', insurer, premium, currency, start, end, status, actions, onOpen, selected, today }: PolicyCardProps) {
  return (
    <article className={cx('flex min-w-0 flex-col gap-4 rounded-xl bg-surface p-4.5 shadow-card ring-2 transition-shadow', selected ? 'ring-brand' : 'ring-transparent hover:shadow-pop')}>
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex size-tile shrink-0 items-center justify-center rounded-lg bg-tile-teal-bg text-tile-teal-fg" aria-hidden>
            <span className="size-icon">{classIcon[policyClass]}</span>
          </span>
          <div className="flex min-w-0 flex-col">
            <h3 className="truncate text-15 font-semibold text-fg-strong">
              {onOpen ? (
                <button type="button" onClick={onOpen} className="rounded text-left hover:underline ib-focus">
                  {client}
                </button>
              ) : (
                client
              )}
            </h3>
            <p className="truncate text-12 text-fg-muted">
              {type} · {policyNo}
            </p>
          </div>
        </div>
        {actions}
      </header>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-13">
        <div className="flex min-w-0 flex-col">
          <dt className="text-11 uppercase tracking-wide text-fg-muted">Premium</dt>
          <dd className="truncate font-semibold text-fg-strong">
            <MoneyDisplay amount={premium} currency={currency} />
          </dd>
        </div>
        <div className="flex min-w-0 flex-col">
          <dt className="text-11 uppercase tracking-wide text-fg-muted">Insurer</dt>
          <dd className="truncate text-fg-strong">{insurer}</dd>
        </div>
        <div className="col-span-2 flex min-w-0 flex-col">
          <dt className="text-11 uppercase tracking-wide text-fg-muted">Period</dt>
          <dd className="truncate text-fg-strong">
            {formatDate(start)} – {formatDate(end)}
          </dd>
        </div>
      </dl>
      <footer className="flex items-center justify-between gap-2 border-t border-line-row pt-3">
        <RecordStatus status={status} />
        <ExpiryBadge date={end} today={today} />
      </footer>
    </article>
  );
}
