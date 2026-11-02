import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { currencySymbol, formatMoney, formatMoneyShort, type Currency } from '../lib/money';
import { Field, controlBase, controlBorder, controlHeight, useFieldSize } from '../components/Field';

export interface MoneyDisplayProps {
  amount: number;
  currency?: Currency;
  /** full ₦3,000,000.00 (tables, documents) or short ₦3M (summary cards, charts). */
  format?: 'full' | 'short';
  /** Colour negatives red and positives green (balances, net figures). Off for plain amounts. */
  signed?: boolean;
  className?: string;
}

/** Amount with currency symbol, tabular figures, negatives in red (UI rule 23). Always right-align in tables. */
export function MoneyDisplay({ amount, currency = 'NGN', format = 'full', signed = false, className }: MoneyDisplayProps) {
  const text = format === 'short' ? formatMoneyShort(amount, currency) : formatMoney(amount, currency);
  return (
    <span
      title={format === 'short' ? formatMoney(amount, currency) : undefined}
      className={cx('tabular-nums', amount < 0 ? 'text-danger' : signed && amount > 0 ? 'text-success' : undefined, className)}
    >
      {text}
    </span>
  );
}

export interface MoneyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  value: number | null;
  onChange: (v: number | null) => void;
  currency?: Currency;
  size?: 'form' | 'filter';
}

const parse = (s: string): number | null => {
  const clean = s.replace(/[^\d.-]/g, '');
  if (clean === '' || clean === '-' || clean === '.') return null;
  const n = Number(clean);
  return Number.isFinite(n) ? n : null;
};
const show = (n: number | null) => (n === null ? '' : n.toLocaleString('en-NG', { maximumFractionDigits: 2 }));

/** Amount field: currency prefix, thousands separators on blur, raw digits while typing. Sum insured, premium, claim amount. */
export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { label, hint, error, value, onChange, currency = 'NGN', size, required, className, onBlur, onFocus, ...rest },
  ref,
) {
  const ctx = useFieldSize();
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-13 font-medium text-fg-muted" aria-hidden>
            {currencySymbol(currency)}
          </span>
          <input
            ref={ref}
            id={id}
            inputMode="decimal"
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            required={required}
            value={draft ?? show(value)}
            onFocus={(e) => {
              setDraft(value === null ? '' : String(value));
              onFocus?.(e);
            }}
            onChange={(e) => {
              setDraft(e.target.value);
              onChange(parse(e.target.value));
            }}
            onBlur={(e) => {
              setDraft(null);
              onBlur?.(e);
            }}
            className={cx(controlBase, controlHeight(size ?? ctx), controlBorder(invalid), 'pl-8 text-right tabular-nums')}
            {...rest}
          />
        </div>
      )}
    </Field>
  );
});
