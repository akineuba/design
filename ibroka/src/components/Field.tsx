import { createContext, useContext, useId, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface FieldProps {
  label?: ReactNode;
  /** Adds a red asterisk and aria-required on the control. */
  required?: boolean;
  /** Help text under the field. Replaced by `error` when both are set. */
  hint?: ReactNode;
  /** Says what's wrong and how to fix it (UI rule 31). */
  error?: ReactNode;
  className?: string;
  children: (ids: FieldIds) => ReactNode;
}

export interface FieldIds {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

/** Field size inside a parent: `form` (40px, default) or `filter` (34px, filter bars and panels). */
export const FieldSizeContext = createContext<'form' | 'filter'>('form');
export const useFieldSize = () => useContext(FieldSizeContext);

/**
 * Label above the control, ending with a colon (UI rule 28), then hint or error underneath.
 * Render-prop so any control (Input, Select, DatePicker, MoneyInput) gets the right ids.
 */
export function Field({ label, required = false, hint, error, className, children }: FieldProps) {
  const id = useId();
  const note = error ?? hint;
  const describedBy = note ? `${id}-note` : undefined;
  return (
    <div className={cx('flex min-w-0 flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-13 font-medium text-fg-strong">
          {label}
          {typeof label === 'string' && !label.endsWith(':') && ':'}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      {children({ id, describedBy, invalid: Boolean(error), required })}
      {note && (
        <p id={describedBy} className={cx('text-12', error ? 'text-danger' : 'text-fg-muted')}>
          {note}
        </p>
      )}
    </div>
  );
}

export const controlBase =
  'w-full min-w-0 rounded-md border bg-surface px-4 text-13 text-fg-strong placeholder:text-fg-placeholder transition-colors focus:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-fg-disabled [&:is(input,textarea):read-only]:bg-surface-muted';

export const controlBorder = (invalid: boolean, success = false) =>
  invalid
    ? 'border-danger focus:border-danger'
    : success
      ? 'border-success focus:border-success'
      : 'border-line-subtle hover:border-line-strong focus:border-brand';

export const controlHeight = (size: 'form' | 'filter') => (size === 'filter' ? 'h-control-sm' : 'h-control-md');
