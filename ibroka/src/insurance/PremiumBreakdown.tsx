import { cx } from '../lib/cx';
import { formatMoney, type Currency } from '../lib/money';

export interface PremiumBreakdownProps {
  sumInsured: number;
  /** Rate in percent: 2.5 = 2.5%. */
  rate: number;
  /** Discounts (negative) or loadings (positive) applied to the basic premium. */
  adjustments?: Array<{ label: string; amount: number }>;
  /** VAT or levy rate in percent, charged on the net premium. */
  taxRate?: number;
  /** Broker commission rate in percent of the net premium. */
  commissionRate?: number;
  currency?: Currency;
  className?: string;
}

/** How a premium is built: sum insured × rate, adjustments, tax, total, and the broker's commission. Quote and policy pages. */
export function PremiumBreakdown({ sumInsured, rate, adjustments = [], taxRate = 0, commissionRate, currency = 'NGN', className }: PremiumBreakdownProps) {
  const basic = (sumInsured * rate) / 100;
  const net = basic + adjustments.reduce((s, a) => s + a.amount, 0);
  const tax = (net * taxRate) / 100;
  const total = net + tax;
  const m = (n: number) => formatMoney(n, currency);
  const row = 'flex items-baseline justify-between gap-4 py-2 text-13';
  return (
    <dl className={cx('flex flex-col rounded-lg border border-line-subtle bg-surface px-4.5 py-2', className)}>
      <div className={row}>
        <dt className="text-fg-muted">Sum insured</dt>
        <dd className="tabular-nums text-fg-strong">{m(sumInsured)}</dd>
      </div>
      <div className={row}>
        <dt className="text-fg-muted">Rate</dt>
        <dd className="tabular-nums text-fg-strong">{rate.toLocaleString('en-NG', { maximumFractionDigits: 3 })}%</dd>
      </div>
      <div className={cx(row, 'border-t border-line-row')}>
        <dt className="font-medium text-fg-strong">Basic premium</dt>
        <dd className="tabular-nums font-medium text-fg-strong">{m(basic)}</dd>
      </div>
      {adjustments.map((a) => (
        <div key={a.label} className={row}>
          <dt className="text-fg-muted">{a.label}</dt>
          <dd className={cx('tabular-nums', a.amount < 0 ? 'text-success' : 'text-fg-strong')}>
            {a.amount < 0 ? '−' : '+'}
            {m(Math.abs(a.amount))}
          </dd>
        </div>
      ))}
      {taxRate > 0 && (
        <div className={row}>
          <dt className="text-fg-muted">VAT ({taxRate}%)</dt>
          <dd className="tabular-nums text-fg-strong">{m(tax)}</dd>
        </div>
      )}
      <div className={cx(row, 'border-t-2 border-line-subtle py-3')}>
        <dt className="text-15 font-bold text-fg-strong">Total premium</dt>
        <dd className="text-18 font-bold tabular-nums text-fg-strong">{m(total)}</dd>
      </div>
      {commissionRate !== undefined && (
        <div className={cx(row, '-mx-4.5 mb-[-8px] rounded-b-lg bg-brand-subtle px-4.5')}>
          <dt className="font-medium text-primary">Brokerage commission ({commissionRate}%)</dt>
          <dd className="tabular-nums font-semibold text-primary">{m((net * commissionRate) / 100)}</dd>
        </div>
      )}
    </dl>
  );
}
