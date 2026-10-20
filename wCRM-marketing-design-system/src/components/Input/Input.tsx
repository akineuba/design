import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { AlertCircle } from '../../icons';
import { cn } from '../../utils/cn';

export type InputSize = 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Required for accessibility; use `hideLabel` to keep it for screen readers only. */
  label: string;
  hideLabel?: boolean;
  /** Supporting text under the field. Replaced by `error` when both are set. */
  helperText?: ReactNode;
  /** Error message. Turns the field red and sets `aria-invalid`. */
  error?: ReactNode;
  /** md 40px (desktop toolbars and search), lg 44px (forms, default). */
  size?: InputSize;
  /** Icon inside the field before the text, e.g. search. */
  leadingIcon?: ReactNode;
  /** Icon or control inside the field after the text, e.g. a clear button. */
  trailingIcon?: ReactNode;
  /** Class for the outer wrapper (label + field + message). */
  wrapperClassName?: string;
}

const fieldBase =
  'flex w-full items-center gap-2 rounded-md border bg-surface-default px-3.5 ' +
  'transition-[border-color,box-shadow] duration-fast ease-standard';

const fieldStates = {
  default:
    'border-border-default hover:border-border-strong focus-within:border-accent-navy focus-within:shadow-focus focus-within:hover:border-accent-navy',
  error:
    'border-status-danger focus-within:border-status-danger focus-within:shadow-focus-danger',
  disabled: 'cursor-not-allowed border-border-default bg-surface-sunken',
  readOnly: 'border-border-default bg-surface-subtle',
};

const sizes: Record<InputSize, string> = {
  md: 'h-control-md',
  lg: 'h-control-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hideLabel = false,
    helperText,
    error,
    size = 'lg',
    leadingIcon,
    trailingIcon,
    required,
    disabled,
    readOnly,
    id,
    className,
    wrapperClassName,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const messageId = `${inputId}-message`;
  const hasError = Boolean(error);
  const message = hasError ? error : helperText;

  const state = disabled ? 'disabled' : hasError ? 'error' : readOnly ? 'readOnly' : 'default';

  return (
    <div className={cn('flex w-full flex-col gap-2', wrapperClassName)} data-state={state}>
      <label
        htmlFor={inputId}
        className={cn('text-label font-medium text-text-primary', hideLabel && 'sr-only', disabled && 'text-text-muted')}
      >
        {label}
        {required && (
          <span className="text-brand-primary" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>

      <div className={cn(fieldBase, sizes[size], fieldStates[state])}>
        {leadingIcon && (
          <span className="inline-flex size-4 shrink-0 text-text-placeholder [&>svg]:size-4">{leadingIcon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'h-full w-full min-w-0 bg-transparent font-sans text-body text-text-primary outline-none',
            'placeholder:text-text-placeholder disabled:cursor-not-allowed disabled:text-text-muted',
            className,
          )}
          {...rest}
        />
        {hasError && !trailingIcon && <AlertCircle className="shrink-0 text-status-danger" />}
        {trailingIcon && (
          <span className="inline-flex size-4 shrink-0 text-text-secondary [&>svg]:size-4">{trailingIcon}</span>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn('text-caption', hasError ? 'text-status-danger' : 'text-text-secondary')}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
});
