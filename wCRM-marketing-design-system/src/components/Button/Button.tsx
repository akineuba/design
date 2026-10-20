import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Spinner } from '../../icons';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual weight. Use one `primary` per view.
   * - primary: solid brand red ("Create Contact", "Send invitation")
   * - secondary: navy outline ("Connection History", "Save as Draft")
   * - outline: neutral outline ("Clear all", "Cancel", "Export")
   * - ghost: text-only brand action ("Save as draft" on mobile forms)
   * - danger: outlined destructive action that sits beside a primary ("Delete" in task details)
   */
  variant?: ButtonVariant;
  /** sm 36px (toolbars), md 40px (desktop default), lg 44px (forms and mobile). */
  size?: ButtonSize;
  /** Shows a spinner, keeps the label for width stability and blocks interaction. */
  loading?: boolean;
  /** Icon rendered before the label, sized by the button. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Stretches to the parent width (mobile sticky actions, drawers). */
  fullWidth?: boolean;
}

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border font-sans ' +
  'transition-colors duration-fast ease-standard ' +
  'focus-visible:outline-none focus-visible:shadow-focus ' +
  'disabled:cursor-not-allowed aria-busy:cursor-progress';

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-brand-primary bg-brand-primary text-text-inverse hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  secondary:
    'border-accent-navy bg-surface-default text-accent-navy hover:border-accent-navy-hover hover:bg-accent-navy-subtle hover:text-accent-navy-hover',
  outline:
    'border-border-default bg-surface-default text-text-primary hover:border-border-strong hover:bg-surface-subtle',
  ghost:
    'border-transparent bg-transparent text-brand-primary hover:bg-brand-primary-subtle',
  danger:
    'border-status-danger bg-surface-default text-status-danger hover:bg-status-danger-subtle',
};

// Disabled is shared by every variant so it always reads as unavailable.
const disabledStyle =
  'disabled:border-border-default disabled:bg-surface-sunken disabled:text-text-muted disabled:hover:bg-surface-sunken';
const ghostDisabledStyle = 'disabled:border-transparent disabled:bg-transparent disabled:hover:bg-transparent';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-control-sm px-3 text-label-sm',
  md: 'h-control-md px-4 text-label',
  lg: 'h-control-lg px-4 text-label',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        // Loading keeps the variant colours; only a true `disabled` greys out.
        disabled && (variant === 'ghost' ? cn(disabledStyle, ghostDisabledStyle) : disabledStyle),
        loading && !disabled && 'disabled:opacity-100',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
          <span className="sr-only">Loading</span>
        </span>
      )}
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>
        {leadingIcon && <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">{trailingIcon}</span>}
      </span>
    </button>
  );
});
