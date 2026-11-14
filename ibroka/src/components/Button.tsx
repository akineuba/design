import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tertiary' | 'destructive' | 'destructive-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * primary = teal fill (Figma "+ Button" in teal). secondary = dark fill (Figma Export button).
   * outline = white with grey border (Figma "+ Button" outline). tertiary = no border (toolbar and icon buttons).
   * destructive = red fill (Delete). destructive-outline = red border and label (Figma red outline "+ Button").
   */
  variant?: ButtonVariant;
  /** sm 34px (filter bars), md 40px (default, Figma), lg 48px. */
  size?: ButtonSize;
  /** Shows a spinner, sets aria-busy and blocks clicks while keeping the label. */
  loading?: boolean;
  /** Icon before the label. Use an icon from `src/icons` (filled). */
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Square button with only an icon. Requires `aria-label`. */
  iconOnly?: boolean;
  fullWidth?: boolean;
}

const base =
  'relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border font-sans text-13 font-semibold transition-colors duration-150 ib-focus disabled:cursor-not-allowed aria-busy:cursor-wait';

const sizes: Record<ButtonSize, { box: string; square: string }> = {
  sm: { box: 'h-control-sm px-3', square: 'size-control-sm' },
  md: { box: 'h-control-md px-5', square: 'size-control-md' },
  lg: { box: 'h-control-lg px-6 text-15', square: 'size-control-lg' },
};

const variants: Record<ButtonVariant, string> = {
  primary: 'border-primary bg-primary text-fg-inverse hover:border-primary-hover hover:bg-primary-hover',
  secondary: 'border-secondary bg-secondary text-fg-inverse hover:border-secondary-hover hover:bg-secondary-hover',
  outline: 'border-line-strong bg-surface text-fg-muted hover:bg-surface-muted hover:text-fg',
  tertiary: 'border-transparent bg-transparent text-fg-muted hover:bg-surface-muted hover:text-fg',
  destructive: 'border-danger bg-danger text-fg-inverse hover:border-danger-hover hover:bg-danger-hover',
  'destructive-outline': 'border-danger bg-surface text-danger hover:bg-danger-subtle',
};

const disabledStyles: Record<ButtonVariant, string> = {
  primary: 'border-surface-disabled bg-surface-disabled text-fg-disabled',
  secondary: 'border-surface-disabled bg-surface-disabled text-fg-disabled',
  destructive: 'border-surface-disabled bg-surface-disabled text-fg-disabled',
  outline: 'border-line bg-surface text-fg-disabled',
  'destructive-outline': 'border-line bg-surface text-fg-disabled',
  tertiary: 'border-transparent bg-transparent text-fg-disabled',
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
  const blocked = disabled || loading;
  const icon = (node: ReactNode) => (
    <span className="inline-flex size-icon shrink-0 items-center justify-center" aria-hidden>
      {node}
    </span>
  );
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={blocked || undefined}
      aria-busy={loading || undefined}
      onClick={blocked ? (e) => e.preventDefault() : onClick}
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
      {loading ? <Spinner /> : leadingIcon && icon(leadingIcon)}
      {iconOnly ? (loading ? null : icon(children)) : children}
      {!iconOnly && trailingIcon && !loading && icon(trailingIcon)}
    </button>
  );
});
