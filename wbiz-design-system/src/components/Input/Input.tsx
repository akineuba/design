import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldLabelClass } from '../../utils/field-label';
import { Spinner } from '../Spinner';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label. Figma: Inter Medium 12/18, fg-muted, 4px above the field. */
  label?: ReactNode;
  /** Helper text under the field. Replaced by `error` when both are set. */
  hint?: ReactNode;
  /** Error message. Turns the border and message red and sets aria-invalid. */
  error?: ReactNode;
  /** Success message. Turns the border green. */
  success?: ReactNode;
  /** Height: sm 34px, md 40px (default in Figma), lg 46px. */
  size?: InputSize;
  /** Icon inside the field, before the value. */
  leadingIcon?: ReactNode;
  /** Icon inside the field, after the value (e.g. calendar on date fields). */
  trailingIcon?: ReactNode;
  /** Shows a spinner in the trailing slot, e.g. while validating or looking up a record. */
  loading?: boolean;
  /** Class for the outer wrapper (label + field + message). */
  wrapperClassName?: string;
}

const heights: Record<InputSize, string> = {
  sm: 'h-control-sm px-3',
  md: 'h-control-md px-4',
  lg: 'h-control-lg px-4',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    error,
    success,
    size = 'md',
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    readOnly,
    required,
    className,
    wrapperClassName,
    ...rest
  },
  ref,
) {
  const labelClass = useFieldLabelClass();
  const autoId = useId();
  const inputId = id ?? `wbiz-input-${autoId}`;
  const messageId = `${inputId}-message`;
  const invalid = Boolean(error);
  const message = error ?? success ?? hint;

  const fieldState = disabled
    ? 'border-line-subtle bg-surface-muted'
    : invalid
      ? 'border-error bg-surface focus-within:shadow-focus-error'
      : success
        ? 'border-success bg-surface focus-within:shadow-focus'
        : readOnly
          ? 'border-line-subtle bg-surface-muted'
          : 'border-line bg-surface hover:border-line-strong focus-within:border-primary focus-within:shadow-focus';

  return (
    <div className={cx('flex w-full flex-col gap-1', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && (
            <span className="ml-0.5 text-error" aria-hidden>
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cx(
          'flex w-full min-w-0 items-center gap-2 rounded-lg border transition-[border-color,box-shadow] duration-150',
          heights[size],
          fieldState,
        )}
      >
        {leadingIcon && (
          <span className="inline-flex size-icon shrink-0 items-center justify-center text-fg-muted" aria-hidden>
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? messageId : undefined}
          aria-busy={loading || undefined}
          className={cx(
            'h-full min-w-0 flex-1 bg-transparent font-sans text-sm text-fg-strong outline-none',
            'placeholder:text-fg-placeholder disabled:cursor-not-allowed disabled:text-fg-disabled',
            className,
          )}
          {...rest}
        />
        {loading ? (
          <Spinner className="text-fg-muted" />
        ) : (
          trailingIcon && (
            <span className="inline-flex size-icon shrink-0 items-center justify-center text-fg-muted" aria-hidden>
              {trailingIcon}
            </span>
          )
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={cx('font-sans text-sm', invalid ? 'text-error' : success ? 'text-success-strong' : 'text-fg-muted')}
        >
          {message}
        </p>
      )}
    </div>
  );
});
