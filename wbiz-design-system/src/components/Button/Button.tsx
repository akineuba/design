import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'soft' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Figma: Button 9 (primary), Button 5 (secondary), Button 04 (tertiary), Button 03 (soft), Button 6 (destructive). */
  variant?: ButtonVariant;
  /** Height: sm 34px, md 40px (default in Figma), lg 46px. */
  size?: ButtonSize;
  /** Shows a spinner, sets aria-busy and blocks clicks while keeping the label visible. */
  loading?: boolean;
  /** Icon before the label, typically a 20px Vuesax linear icon. */
  leadingIcon?: ReactNode;
  /** Icon after the label. */
  trailingIcon?: ReactNode;
  /** Square button with only an icon. Requires `aria-label`. */
  iconOnly?: boolean;
  /** Stretch to fill the parent's width. */
  fullWidth?: boolean;
}

const base =
  'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border ' +
  'font-sans text-sm font-medium transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:shadow-focus ' +
  'disabled:cursor-not-allowed aria-busy:cursor-wait';

const sizes: Record<ButtonSize, { box: string; square: string }> = {
  sm: { box: 'h-control-sm px-3', square: 'size-control-sm' },
  md: { box: 'h-control-md px-4 py-2.5', square: 'size-control-md' },
  lg: { box: 'h-control-lg px-5 py-2.5', square: 'size-control-lg' },
};

const variants: Record<ButtonVariant, string> = {
  primary: 'border-primary bg-primary text-fg-inverse shadow-xs hover:border-primary-hover hover:bg-primary-hover',
  secondary: 'border-line bg-surface text-fg hover:bg-surface-muted',
  tertiary: 'border-transparent bg-transparent text-fg-muted hover:bg-surface-muted hover:text-fg',
  soft: 'border-accent-subtle bg-accent-subtle text-accent shadow-xs hover:border-accent-muted hover:bg-accent-muted',
  destructive: 'border-error bg-surface text-error hover:bg-error-subtle',
};

// Figma shows disabled primary as a #D0D5DD fill with white text; the other variants keep their
// container and fade the label and border to the disabled colour.
const disabledStyles: Record<ButtonVariant, string> = {
  primary: 'border-surface-disabled bg-surface-disabled text-fg-inverse shadow-none',
  secondary: 'border-line-subtle bg-surface text-fg-disabled',
  tertiary: 'border-transparent bg-transparent text-fg-disabled',
  soft: 'border-surface-muted bg-surface-muted text-fg-disabled shadow-none',
  destructive: 'border-line-subtle bg-surface text-fg-disabled',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leadingIcon,
    trailingIcon,
    iconOnly = false,
    fullWidth = false,
    type = 'button',
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  // Loading keeps the variant's colours (it is a busy state, not an unavailable one).
  const isInert = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={isInert || undefined}
      aria-busy={loading || undefined}
      onClick={isInert ? (e) => e.preventDefault() : onClick}
      className={cx(
        base,
        iconOnly ? sizes[size].square : sizes[size].box,
        disabled ? disabledStyles[variant] : variants[variant],
        loading && 'pointer-events-none',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner /> : leadingIcon && <span className="inline-flex size-icon shrink-0 items-center justify-center" aria-hidden>{leadingIcon}</span>}
      {iconOnly ? (loading ? null : children) : children}
      {!iconOnly && trailingIcon && !loading && (
        <span className="inline-flex size-icon shrink-0 items-center justify-center" aria-hidden>{trailingIcon}</span>
      )}
    </button>
  );
});
