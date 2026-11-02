import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Spinner } from './Spinner';
import { Field, controlBase, controlBorder, controlHeight, useFieldSize } from './Field';
import { SuccessIcon } from '../icons';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Green border and tick, e.g. after a policy number is verified. */
  success?: boolean;
  loading?: boolean;
  /** Icon inside the field on the left (search). */
  leadingIcon?: ReactNode;
  /** Text or icon on the right (unit, %). */
  trailing?: ReactNode;
  /** form 40px (default) or filter 34px. Defaults to the parent FieldSizeContext. */
  size?: 'form' | 'filter';
  className?: string;
}

/** Single-line text field with label, hint, error, success and loading states. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, success, loading, leadingIcon, trailing, size, required, className, ...rest },
  ref,
) {
  const ctx = useFieldSize();
  const s = size ?? ctx;
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative flex items-center">
          {leadingIcon && (
            <span className="pointer-events-none absolute left-3.5 size-icon-sm text-fg-muted" aria-hidden>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={required || undefined}
            required={required}
            className={cx(
              controlBase,
              controlHeight(s),
              controlBorder(invalid, success),
              leadingIcon && 'pl-10',
              (trailing || loading || success) && 'pr-10',
            )}
            {...rest}
          />
          <span className="absolute right-3.5 flex items-center gap-1.5 text-13 text-fg-muted">
            {loading ? <Spinner label="Checking" /> : success ? <span className="size-icon-sm text-success"><SuccessIcon /></span> : trailing}
          </span>
        </div>
      )}
    </Field>
  );
});

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  rows?: number;
}

export function Textarea({ label, hint, error, required, className, rows = 4, ...rest }: TextareaProps) {
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cx(controlBase, controlBorder(invalid), 'py-2.5 leading-[18px]')}
          {...rest}
        />
      )}
    </Field>
  );
}
